package cls

import (
	"context"
	pluginCommon "github.com/TencentCloud/tencentcloud-monitor-grafana-app/pkg/common"
	clsAPI "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/cls/v20201016"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
)

const (
	MaxQueryDataConcurrentGoroutines = 20 // 每个TopicId拥有一个容量为20的并发池
)

// TopicId为key, 并发池为value
var topicIdGoroutinesMap = make(map[string]chan int)

func Query(ctx context.Context, logServiceParams pluginCommon.LogServiceParams, query backend.DataQuery, opts pluginCommon.ApiOpts) backend.DataResponse {
	topicId := logServiceParams.TopicId
	if topicIdGoroutinesMap[topicId] == nil {
		topicIdGoroutinesMap[topicId] = make(chan int, MaxQueryDataConcurrentGoroutines)
	}
	queryDataGoroutines := topicIdGoroutinesMap[topicId]
	queryDataGoroutines <- 1
	resp := QueryLog(ctx, logServiceParams, query, opts)
	<-queryDataGoroutines
	return resp
}

func QueryLog(ctx context.Context, logServiceParams pluginCommon.LogServiceParams, query backend.DataQuery, opts pluginCommon.ApiOpts) backend.DataResponse {
	//log.DefaultLogger.Info("Query called", "request", query)

	dataRes := backend.DataResponse{}

	requestParam := clsAPI.SearchLogRequest{
		TopicId:        common.StringPtr(logServiceParams.TopicId),
		From:           common.Int64Ptr(query.TimeRange.From.UnixNano() / 1e6),
		To:             common.Int64Ptr(query.TimeRange.To.UnixNano() / 1e6),
		Query:          common.StringPtr(logServiceParams.Query),
		UseNewAnalysis: common.BoolPtr(true),
	}
	searchLogResponse, searchLogErr := SearchLog(ctx, &requestParam, logServiceParams.Region, opts)

	log.DefaultLogger.Info("CLS_SEARCHLOG_SUCCESS", Stringify(query), searchLogResponse.Response.RequestId) //云 api 不保存入参
	if searchLogErr != nil {
		log.DefaultLogger.Error("CLS_SEARCHLOG_ERROR", Stringify(query), Stringify(searchLogErr))
		dataRes.Error = searchLogErr
		return dataRes
	}
	searchLogResult := *searchLogResponse.Response

	if *searchLogResult.Analysis {
		var logItems []map[string]interface{}
		for _, v := range searchLogResult.AnalysisRecords {
			logItems = append(logItems, jsonParse(*v))
		}
		var colNames []clsAPI.Column
		for _, col := range searchLogResult.Columns {
			colNames = append(colNames, *col)
		}
		dataRes.Frames = TransferAnalysisRecordsToFrame(logItems, colNames, "", "")
	}

	//log.DefaultLogger.Info("Query call ended", "result", Stringify(dataRes))
	return dataRes
}

//  todo: 先留着，未来补上
// CheckHealth handles health checks sent from Grafana to the plugin.
// The main use case for these health checks is the test button on the
// datasource configuration page which allows users to verify that
// a datasource is working as expected.
//func (td *ClsDatasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
//	camOpts, _, err := GetInsSetting(*req.PluginContext.DataSourceInstanceSettings)
//	if err != nil {
//		return &backend.CheckHealthResult{
//			Status:  backend.HealthStatusError,
//			Message: err.Error(),
//		}, nil
//	}
//
//	_, err = SearchLog(ctx, &clsAPI.SearchLogRequest{
//		//TopicId: common.StringPtr(jsonData.TopicId), //todo: xxx
//		TopicId: common.StringPtr(string('t')),
//		From:    common.Int64Ptr(time.Now().AddDate(0, 0, -1).UnixNano() / 1e6),
//		To:      common.Int64Ptr(time.Now().UnixNano() / 1e6),
//		Query:   common.StringPtr(""),
//		Limit:   common.Int64Ptr(1),
//	}, string('t'), camOpts)
//
//	var status = backend.HealthStatusOk
//	var message = "CheckHealth Success"
//	if _, ok := err.(*errors.TencentCloudSDKError); ok {
//		status = backend.HealthStatusError
//		message = fmt.Sprintf("An API error has returned: %s", err)
//	}
//	return &backend.CheckHealthResult{
//		Status:  status,
//		Message: message,
//	}, nil
//}
