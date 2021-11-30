package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/TencentCloud/tencentcloud-monitor-grafana-app/pkg/cam"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
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
		CheckHealthHandler:  ds,
		CallResourceHandler: newResourceHandler(ds),
	}
}

var _ backend.CheckHealthHandler = (*cloudMonitorDatasource)(nil)

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

type apiOpts struct {
	SecretId  string `json:"secretId"`
	SecretKey string `json:"secretKey"`
	Token     string
	Intranet  bool
}

func getInsSetting(instanceSettings backend.DataSourceInstanceSettings) (opts apiOpts) {

	jsonData := map[string]interface{}{}
	_ = json.Unmarshal(instanceSettings.JSONData, &jsonData)

	opts = apiOpts{
		SecretId:  jsonData["secretId"].(string),
		SecretKey: instanceSettings.DecryptedSecureJSONData["secretKey"],
	}

	if useRoleData, ok := jsonData["useRole"]; ok {
		if useRole, ok := useRoleData.(bool); ok && useRole {
			client := cam.NewCredential(os.Getenv("ROLE"))
			id, key, token, err := client.GetSecret()
			if err == nil {
				logger.Debug("using eks credentials id: " + id)
				logger.Debug("using eks credentials key: " + key)
				logger.Debug("using eks credentials token: " + token)
				opts.SecretId = id
				opts.SecretKey = key
				opts.Token = token
			}
		}
	}

	if intranet, ok := jsonData["intranet"]; ok {
		if isIntranet, ok := intranet.(bool); ok {
			opts.Intranet = isIntranet
		}
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
