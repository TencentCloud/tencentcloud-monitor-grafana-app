package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/cos-go-sdk-v5/debug"
)

type SignResultV3 struct {
	Authorization string `json:"authorization"`
	Token         string `json:"token"`

	Host     string `json:"host"`
	Intranet bool   `json:"intranet"`
}

type SignResultV2 struct {
	Query map[string]interface{} `json:"querystring"`

	Host     string `json:"host"`
	Path     string `json:"path"`
	Intranet bool   `json:"intranet"`
}

func newResourceHandler(ds *cloudMonitorDatasource) backend.CallResourceHandler {
	mux := http.NewServeMux()

	// register route
	mux.HandleFunc("/tc_cos_list", ds.CosApi)
	mux.HandleFunc("/sign_v3", ds.SignApi(true))
	mux.HandleFunc("/sign_v2", ds.SignApi(false))

	return httpadapter.New(mux)
}

func (ds *cloudMonitorDatasource) SignApi(isV3 bool) func(rw http.ResponseWriter, req *http.Request) {
	return func(rw http.ResponseWriter, req *http.Request) {
		if res, err := ds.getSigned(isV3, req); err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			_, _ = rw.Write([]byte(err.Error()))
			return
		} else {
			data, err := json.Marshal(res)
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				_, _ = rw.Write([]byte(err.Error()))
				return
			}
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusOK)
			_, _ = rw.Write(data)
		}
	}
}

func (ds *cloudMonitorDatasource) getSigned(isV3 bool, req *http.Request) (interface{}, error) {
	var query signOpts
	body, err := io.ReadAll(req.Body)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(body, &query)
	if err != nil {
		return nil, err
	}
	datasourceInstanceSettings := httpadapter.PluginConfigFromContext(req.Context()).DataSourceInstanceSettings
	apiOpts := getInsSetting(*datasourceInstanceSettings)
	shouldUseIntranet := false
	if apiOpts.Intranet && isV3 && !strings.Contains(query.Host, "fsi") {
		// use internal host
		shouldUseIntranet = true
		slice := strings.Split(query.Host, "tencentcloudapi.com")
		query.Host = slice[0] + "internal.tencentcloudapi.com"
		logger.Debug("using internal host: " + query.Host)
		for k := range query.Headers {
			if strings.ToLower(k) == "host" {
				query.Headers[k] = query.Host
			}
		}
	}
	if !isV3 {
		signed := signV2(query, apiOpts)
		return &SignResultV2{
			Query:    signed.Querystring,
			Path:     signed.Path,
			Host:     query.Host,
			Intranet: shouldUseIntranet,
		}, nil
	}

	signed := signV3(query, apiOpts)
	return &SignResultV3{
		Authorization: signed,
		Token:         apiOpts.Token,
		Host:          query.Host,
		Intranet:      shouldUseIntranet,
	}, nil
}

func (ds *cloudMonitorDatasource) CosApi(rw http.ResponseWriter, req *http.Request) {
	regions := req.URL.Query()["region"]

	baseURL := "https://service.cos.myqcloud.com"
	if len(regions) > 0 {
		// cos.<Region>.myqcloud.com
		// TODO: support intranet
		baseURL = fmt.Sprintf("http://cos.%s.myqcloud.com", regions[0])
	}

	su, _ := url.Parse(baseURL)
	b := &cos.BaseURL{ServiceURL: su}

	datasourceInstanceSettings := httpadapter.PluginConfigFromContext(req.Context()).DataSourceInstanceSettings

	apiOpts := getInsSetting(*datasourceInstanceSettings)

	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  apiOpts.SecretId,
			SecretKey: apiOpts.SecretKey,
			Transport: &debug.DebugRequestTransport{
				RequestHeader:  true,
				RequestBody:    true,
				ResponseHeader: true,
				ResponseBody:   true,
			},
		},
	})

	s, _, err := c.Service.Get(context.Background())
	if err != nil {
		rw.WriteHeader(http.StatusBadGateway)
		rw.Write([]byte(err.Error()))
		return
	}
	data, error := json.Marshal(s)
	if error != nil {
		rw.Write([]byte(err.Error()))
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	rw.Write(data)
}
