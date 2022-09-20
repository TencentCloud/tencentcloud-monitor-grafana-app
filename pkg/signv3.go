package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/TencentCloud/tencentcloud-monitor-grafana-app/pkg/common"
	"strings"
	"time"
)

func sha256hex(s string) string {
	b := sha256.Sum256([]byte(s))
	return hex.EncodeToString(b[:])
}

func hmacsha256(s, key string) string {
	hashed := hmac.New(sha256.New, []byte(key))
	hashed.Write([]byte(s))
	return string(hashed.Sum(nil))
}

type signOpts struct {
	Host      string            `json:"Host"`
	Service   string            `json:"Service"`
	Version   string            `json:"Version"`
	Action    string            `json:"Action"`
	Region    string            `json:"Region"`
	Timestamp int64             `json:"Timestamp"`
	Method    string            `json:"Method"`
	Uri       string            `json:"Uri"`
	Query     string            `json:"Query"`
	Body      string            `json:"Body"`
	Headers   map[string]string `json:"Headers"`
	Token     string            `json:"-"`
}

func signV3(opts signOpts, apiOpts common.ApiOpts) string {
	secretId := apiOpts.SecretId
	secretKey := apiOpts.SecretKey
	host := opts.Host
	algorithm := "TC3-HMAC-SHA256"
	service := opts.Service
	version := opts.Version
	action := opts.Action
	region := opts.Region

	var timestamp int64 = opts.Timestamp
	if opts.Timestamp == 0 {
		timestamp = time.Now().Unix()
	}

	// step 1: build canonical request string
	httpRequestMethod := opts.Method
	canonicalURI := opts.Uri
	canonicalQueryString := opts.Query
	canonicalHeaders := ""

	var canonicalHeadersMap []string

	contentHeaders := ""
	hostHeaders := ""
	for k, v := range opts.Headers {
		headerKey := strings.ToLower(k)
		if headerKey == "content-type" {
			contentHeaders = headerKey + ":" + v + "\n"
		}
		if headerKey == "host" {
			hostHeaders = headerKey + ":" + v + "\n"
		}
	}

	canonicalHeadersMap = append(canonicalHeadersMap, contentHeaders, hostHeaders)

	canonicalHeaders = strings.Join(canonicalHeadersMap, "")
	signedHeaders := "content-type;host"
	payload := opts.Body
	hashedRequestPayload := sha256hex(payload)
	canonicalRequest := fmt.Sprintf("%s\n%s\n%s\n%s\n%s\n%s",
		httpRequestMethod,
		canonicalURI,
		canonicalQueryString,
		canonicalHeaders,
		signedHeaders,
		hashedRequestPayload)

	// step 2: build string to sign
	date := time.Unix(timestamp, 0).UTC().Format("2006-01-02")
	credentialScope := fmt.Sprintf("%s/%s/tc3_request", date, service)
	hashedCanonicalRequest := sha256hex(canonicalRequest)
	string2sign := fmt.Sprintf("%s\n%d\n%s\n%s",
		algorithm,
		timestamp,
		credentialScope,
		hashedCanonicalRequest)

	// step 3: sign string
	secretDate := hmacsha256(date, "TC3"+secretKey)
	secretService := hmacsha256(service, secretDate)
	secretSigning := hmacsha256("tc3_request", secretService)
	signature := hex.EncodeToString([]byte(hmacsha256(string2sign, secretSigning)))

	// step 4: build authorization
	authorization := fmt.Sprintf("%s Credential=%s/%s, SignedHeaders=%s, Signature=%s",
		algorithm,
		secretId,
		credentialScope,
		signedHeaders,
		signature)

	curl := fmt.Sprintf(`curl -X POST https://%s\
 -H "Authorization: %s"\
 -H "Content-Type: %s"\
 -H "Host: %s" -H "X-TC-Action: %s"\
 -H "X-TC-Timestamp: %d"\
 -H "X-TC-Version: %s"\
 -H "X-TC-Region: %s"\
 -H "X-TC-Token: %s"\
 -d '%s'`, host, authorization, opts.Headers["content-type"],
		host, action, timestamp, version, region, opts.Token, payload)

	logger.Debug("v3 string to curl: \n", curl+"\n")

	return authorization
}
