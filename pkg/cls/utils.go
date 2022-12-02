package cls

import (
	"encoding/json"
	"fmt"
	"github.com/TencentCloud/tencentcloud-monitor-grafana-app/pkg/common"
	"strings"
)

func Stringify(v interface{}) string {
	str, err := json.Marshal(v)
	if err != nil {
		return err.Error()
	} else {
		return string(str)
	}
}

func StringifyAll(args ...interface{}) []string {
	var info []string
	for arg := range args {
		info = append(info, Stringify(arg))
	}
	return info
}

func GetRequestClient() string {
	return strings.Replace(fmt.Sprint("GF_", common.GrafanaVersion, "_BE_PL_CLS_", common.PluginVersion), ".", "_", -1)
}
