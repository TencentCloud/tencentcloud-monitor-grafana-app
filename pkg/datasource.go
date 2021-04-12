package main

import (
	"context"
	"encoding/json"
	"net/http"
	"sync"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

var logger = log.New()

// newDatasource returns datasource.ServeOpts.
func newDatasource() datasource.ServeOpts {
	// creates a instance manager for your plugin. The function passed
	// into `NewInstanceManger` is called when the instance is created
	// for the first time or when a datasource configuration changed.
	im := datasource.NewInstanceManager(newDataSourceInstance)
	ds := &cloudMonitorDatasource{
		im: im,
	}

	return datasource.ServeOpts{
		QueryDataHandler:   ds,
		CheckHealthHandler: ds,
	}
}

var _ backend.CheckHealthHandler = (*cloudMonitorDatasource)(nil)
var _ backend.QueryDataHandler = (*cloudMonitorDatasource)(nil)

type cloudMonitorDatasource struct {
	// The instance manager can help with lifecycle management
	// of datasource instances in plugins. It's not a requirements
	// but a best practice that we recommend that you follow.
	im instancemgmt.InstanceManager
}

func (td *cloudMonitorDatasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "ok",
	}, nil
}

func (td *cloudMonitorDatasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	response := backend.NewQueryDataResponse()

	//b, _ := json.Marshal(req.PluginContext.DataSourceInstanceSettings)

	//logger.Info("===> app settings: " + string(b))

	apiOpts := getInsSetting(*req.PluginContext.DataSourceInstanceSettings)
	var wg sync.WaitGroup
	for _, query := range req.Queries {
		wg.Add(1)
		go func(q backend.DataQuery) {
			response.Responses[q.RefID] = td.query(ctx, q, apiOpts)
			wg.Done()
		}(query)
	}
	wg.Wait()
	return response, nil
}

type queryModel struct {
	Query signOpts `json:"Query"`
	// 解析使用字段
	Format string `json:"format,omitempty"`
	RefId  string `json:"refId"`
	Signer string `json:"signer"`
}

func (td *cloudMonitorDatasource) query(ctx context.Context, query backend.DataQuery, apiOpts apiOpts) backend.DataResponse {
	// Unmarshal the json into our queryModel
	dataRes := backend.DataResponse{}

	var model queryModel
	dataRes.Error = json.Unmarshal(query.JSON, &model)

	b, _ := json.Marshal(model.Query)
	c, _ := json.Marshal(model)

	if model.Query.Action == "DescribeVpcPeeringConnections" {
		logger.Info("===> origin model: " + string(query.JSON))
		logger.Info("===> mashed model: " + string(c))
		logger.Info("===> mashaled model query: " + string(b))
	}

	if dataRes.Error != nil {
		return dataRes
	}

	var signed interface{}
	logger.Info("===> Signer: " + model.Signer)
	if model.Signer == "v2" {
		signed = signV2(model.Query, apiOpts)
	} else {
		signed = signV3(model.Query, apiOpts)
	}

	frame := data.NewFrame(query.RefID)
	frame.Meta = &data.FrameMeta{
		Custom: signed,
	}
	dataRes.Frames = []*data.Frame{frame}

	return dataRes
}

type apiOpts struct {
	SecretId  string `json:"secretId"`
	SecretKey string `json:"secretKey"`
}

func getInsSetting(instanceSettings backend.DataSourceInstanceSettings) (opts apiOpts) {

	jsonData := map[string]interface{}{}
	_ = json.Unmarshal(instanceSettings.JSONData, &jsonData)

	opts = apiOpts{
		SecretId:  jsonData["secretId"].(string),
		SecretKey: instanceSettings.DecryptedSecureJSONData["secretKey"],
	}
	if opts.SecretId == "" {
		mp := map[string]interface{}{}
		err := json.Unmarshal(instanceSettings.JSONData, &mp)
		if err != nil {
			return
		}
		opts.SecretId = mp["secretId"].(string)
		opts.SecretKey = mp["secretKey"].(string)

	}
	return
}

type instanceSettings struct {
	httpClient *http.Client
}

func newDataSourceInstance(setting backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	return &instanceSettings{
		httpClient: &http.Client{},
	}, nil
}
