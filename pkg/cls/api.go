package cls

import (
	"context"
	pluginCommon "github.com/TencentCloud/tencentcloud-monitor-grafana-app/pkg/common"
	clsAPI "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/cls/v20201016"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	"golang.org/x/time/rate"
)

var cpf = profile.NewClientProfile()
var intranetCpf = profile.NewClientProfile()

func init() {
	intranetCpf.HttpProfile.RootDomain = "internal.tencentcloudapi.com"
}

var limiter = rate.NewLimiter(10, 10)

func SearchLog(ctx context.Context, param *clsAPI.SearchLogRequest, region string, opts pluginCommon.ApiOpts) (response *clsAPI.SearchLogResponse, err error) {

	_ = limiter.Wait(ctx)

	credential := common.NewTokenCredential(opts.SecretId, opts.SecretKey, opts.Token)
	var client *clsAPI.Client
	client, err = clsAPI.NewClient(credential, region, cpf)
	if err != nil {
		return
	}
	if opts.Intranet {
		client, _ = clsAPI.NewClient(credential, region, intranetCpf)
	}
	injectRequestClientHeader(client)

	// 实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
	request := clsAPI.NewSearchLogRequest()

	request.TopicId = param.TopicId
	request.From = param.From
	request.To = param.To
	request.Query = param.Query
	request.Context = param.Context
	request.UseNewAnalysis = param.UseNewAnalysis

	// 通过 client 对象调用想要访问的接口，需要传入请求对象
	response, err = client.SearchLog(request)
	//log.DefaultLogger.Info("SearchLog response line58", "response", *response) //  此行有时打印不出来，需要考虑是否是响应太大了
	return
}

// 统计插件用户量
func injectRequestClientHeader(client *clsAPI.Client) {
	client.WithRequestClient(GetRequestClient())
}
