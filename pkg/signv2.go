package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/rand"
	"sort"
	"strconv"
	"strings"
	"time"
)

func signV2(opts signOpts, apiOpts apiOpts) signerV2Result {

	data := map[string]interface{}{}
	_ = json.Unmarshal([]byte(opts.Body), &data)

	opt := signerV2Opt{
		SecretId:  apiOpts.SecretId,
		SecretKey: apiOpts.SecretKey,
		Data:      data,
		Action:    opts.Action,
		Host:      opts.Host,
		Region:    opts.Region,
		Version:   opts.Version,
	}

	res := newSignerV2(opt).generateQueryString()

	b, _ := json.Marshal(res)
	logger.Info("===> here: " + string(b))

	return res
}

type signerV2Opt struct {
	Path            string `json:"-"`
	Method          string `json:"-"`
	Action          string
	SecretId        string
	SecretKey       string `json:"-"`
	Timestamp       int64
	Region          string
	Version         string `json:"-"`
	SignatureMethod string
	Nonce           int64
	Host            string                 `json:"-"`
	Data            map[string]interface{} `json:"-"`
}

type signerV2 struct {
	opt    signerV2Opt
	params map[string]interface{}
}

type signerV2Result struct {
	Querystring map[string]interface{}
	Path        string
}

func newSignerV2(defaults signerV2Opt) *signerV2 {
	ins := &signerV2{opt: signerV2Opt{
		Path:   "/v2/index.php",
		Method: "POST",
	}}

	if defaults.Path != "" {
		ins.opt.Path = defaults.Path
	}
	if defaults.Method != "" {
		ins.opt.Method = defaults.Method
	}

	ins.opt.Action = defaults.Action
	ins.opt.SecretId = defaults.SecretId
	ins.opt.Region = defaults.Region
	ins.opt.Timestamp = time.Now().Unix()
	ins.opt.SignatureMethod = "HmacSHA256"
	ins.opt.Nonce = rand.Int63n(65535)
	ins.opt.Host = defaults.Host
	ins.opt.SecretKey = defaults.SecretKey
	ins.opt.Version = defaults.Version

	b, _ := json.Marshal(ins.opt)

	params := map[string]interface{}{}
	_ = json.Unmarshal(b, &params)

	params["Timestamp"] = strconv.Itoa(int(ins.opt.Timestamp))

	for k, v := range defaults.Data {
		params[k] = v
	}
	ins.params = params

	return ins
}

func (s *signerV2) generateQueryString() signerV2Result {
	s.params["Signature"] = s.generateSignature()
	return signerV2Result{
		Querystring: s.params,
		Path:        s.opt.Path,
	}
}

func (s *signerV2) generateSignature() string {
	params := s.params

	keys := []string{}
	for k, v := range params {
		if slice, ok := v.([]interface{}); ok {
			for i := range slice {
				keys = append(keys, k+"."+strconv.Itoa(i))
			}
		} else {
			keys = append(keys, k)
		}
	}

	sort.Strings(keys)
	querySlice := []string{}

	for _, key := range keys {
		val, ok := params[key]
		if !ok {
			paths := strings.Split(key, ".")
			if len(paths) != 2 {
				continue
			}
			parent, ok := params[paths[0]]
			if ok {
				parentSlice, ok := parent.([]interface{})
				if !ok {
					continue
				}
				index, err := strconv.Atoi(paths[1])
				if err != nil {
					continue
				}
				child := parentSlice[index]
				if !ok {
					continue
				}
				val = child
			}
		}

		strVal := fmt.Sprintf("%v", val)

		if strings.HasPrefix(key, "_") == false {
			key = strings.Replace(key, "_", ".", -1)
		}

		querySlice = append(querySlice, key+"="+strVal)

	}

	queryStr := s.opt.Method + s.opt.Host + s.opt.Path + "?" +
		strings.Join(querySlice, "&")

	logger.Info("===> v2 string to be signed: " + queryStr)

	return s.sign(queryStr)
}

func (s *signerV2) sign(queryStr string) string {
	hashed := hmacsha256(queryStr, s.opt.SecretKey)
	encoded := base64.StdEncoding.EncodeToString([]byte(hashed))
	return encoded
}
