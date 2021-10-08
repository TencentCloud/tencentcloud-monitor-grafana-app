package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/cos-go-sdk-v5/debug"
)

func newResourceHandler(ds *cloudMonitorDatasource) backend.CallResourceHandler {
	mux := http.NewServeMux()

	// register route
	mux.HandleFunc("/tc_cos_list", ds.CosApi)

	return httpadapter.New(mux)
}

func (ds *cloudMonitorDatasource) CosApi(rw http.ResponseWriter, req *http.Request) {
	regions := req.URL.Query()["region"]

	baseURL := "http://service.cos.myqcloud.com"
	if len(regions) > 0 {
		// cos.<Region>.myqcloud.com
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
		panic(err)
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
