package cls

import (
	"encoding/json"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	clsAPI "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/cls/v20201016"
	"regexp"
	"time"
)

func jsonParse(jsonStr string) (result map[string]interface{}) {
	err := json.Unmarshal([]byte(jsonStr), &result)
	if err != nil {
		log.DefaultLogger.Error("jsonParse error", "jsonStr", jsonStr)
	}
	return
}

func TransferAnalysisRecordsToFrame(list []map[string]interface{}, Columns []clsAPI.Column, framaName string, fieldName string) []*data.Frame {

	frame := data.NewFrame(framaName)
	if len(list) == 0 {
		return []*data.Frame{frame}
	}

	for _, col := range Columns {
		newFieldName := *col.Name
		if len(fieldName) > 0 {
			newFieldName = fieldName
		}
		colType := GetFieldTypeByPrestoType(*col.Type)

		switch colType {
		case data.FieldTypeInt64:
			{
				//  由于是将用 map进行 JSON 解析，故这里用 float64
				var m []float64
				for _, v := range list {
					m = append(m, v[*col.Name].(float64))
				}
				frame.Fields = append(frame.Fields, data.NewField(newFieldName, nil, m))
			}
		case data.FieldTypeFloat64:
			{
				var m []float64
				for _, v := range list {
					m = append(m, v[*col.Name].(float64))
				}
				frame.Fields = append(frame.Fields, data.NewField(newFieldName, nil, m))
			}

		case data.FieldTypeTime:
			{
				var m []time.Time
				for _, v := range list {
					t, err := time.Parse(time.RFC3339, v[*col.Name].(string))
					if err != nil {
						m = append(m, time.Now())
					}
					m = append(m, t)
				}
				frame.Fields = append(frame.Fields, data.NewField(newFieldName, nil, m))
			}

			//  其他类型默认当字符串类型处理
		default:
			fallthrough
		case data.FieldTypeString:
			{
				var m []string
				for _, v := range list {
					m = append(m, v[*col.Name].(string))
				}
				frame.Fields = append(frame.Fields, data.NewField(newFieldName, nil, m))
			}
		}
	}
	return []*data.Frame{frame}
}

func GetLog(logInfos []*clsAPI.LogInfo, refId string) []*data.Frame {
	frame := data.NewFrame(refId)
	var timeValues []time.Time
	var logValues []string

	for _, v := range logInfos {
		timeValues = append(timeValues, time.Unix(*v.Time/1e3, *v.Time%1e3))
		logValues = append(logValues, *v.LogJson)

	}
	frame.Fields = append(frame.Fields, data.NewField("Time", nil, timeValues))
	frame.Fields = append(frame.Fields, data.NewField("Log", nil, logValues))
	return []*data.Frame{frame}
}

type PrestoAndFieldType struct {
	prestoTypeRegex string
	fieldType       data.FieldType
}

/** Presto类型与FieldType转化表
 * @doc https://iwiki.woa.com/pages/viewpage.action?pageId=905584985 */
var PrestoAndFieldTypeMap = []PrestoAndFieldType{
	/** 时间类型分为两类，包含日期和不包含日期 */
	{
		prestoTypeRegex: "timestamp with time zone$",
		fieldType:       data.FieldTypeTime,
	},

	{
		prestoTypeRegex: "timestamp$|^date$|^datetime$",
		fieldType:       data.FieldTypeTime,
		// processor: moment,
	},
	{
		prestoTypeRegex: "time$",
		fieldType:       data.FieldTypeTime,
		// processor: null,
	},
	/** 数字类型。整数、浮点数、定点数 */

	{
		prestoTypeRegex: "tinyint$|^samllint$|^integer$|^bigint$|^long$",
		fieldType:       data.FieldTypeInt64,
		// processor: Number,
	},
	{
		prestoTypeRegex: "real$|^double$|^decimal$",
		fieldType:       data.FieldTypeInt64,
		// processor: Number,
	},
	/** 字符串。字符串和单字符 */
	{
		prestoTypeRegex: "varchar$|^char$|^text$|^keyword$",
		fieldType:       data.FieldTypeString,
		// processor: String,
	},
	{
		prestoTypeRegex: "boolean$",
		fieldType:       data.FieldTypeBool,
		// processor: Boolean,
	},

	/** 未定情况，做简单降级方案 */
	{
		prestoTypeRegex: "uuid$",
		fieldType:       data.FieldTypeString,
		// processor: String,
	},
	{
		prestoTypeRegex: "ipaddress$",
		fieldType:       data.FieldTypeString,
		// processor: String,
	},
	{
		prestoTypeRegex: "array\\(.*\\)",
		fieldType:       data.FieldTypeUnknown,
		// processor: Array.from,
	},
	{
		prestoTypeRegex: "json$",
		fieldType:       data.FieldTypeUnknown,
		// processor: JSON.parse,
	},
	{
		prestoTypeRegex: "map\\(.*\\)", // "map\([\w\s,]+,[\w\s,]+\)",
		fieldType:       data.FieldTypeUnknown,
		// processor: (i) => i,
	},
	{
		prestoTypeRegex: "varbinary$",
		fieldType:       data.FieldTypeUnknown,
		// processor: Array.from,
	},
	{
		prestoTypeRegex: "interval$",
		fieldType:       data.FieldTypeUnknown,
		// processor: String,
	},
	{
		prestoTypeRegex: "row$",
		fieldType:       data.FieldTypeUnknown,
		// processor: String,
	},
}

func GetFieldTypeByPrestoType(prestoType string) data.FieldType {
	for _, item := range PrestoAndFieldTypeMap {
		matched, _ := regexp.Match(item.prestoTypeRegex, []byte(prestoType))
		if matched == true {
			return item.fieldType
		}
	}
	return data.FieldTypeUnknown
}
