package main

import (
	"fmt"
	"testing"
)

func TestSignerV2(t *testing.T) {
	signOpts := signOpts{
		Host:      "vpc.api.qcloud.com",
		Service:   "",
		Version:   "2018-10-01",
		Action:    "DescribeVpcPeeringConnections",
		Region:    "ap-guangzhou",
		Timestamp: 0,
		Method:    "POST",
		Uri:       "/v2/index.php",
		Query:     "",
		Body:      "{\"limit\":[0, 1],\"offset\":0}",
		Headers:   nil,
	}
	apiOpts := apiOpts{
		SecretId:  "",
		SecretKey: "",
	}

	res := signV2(signOpts, apiOpts)
	fmt.Println(res)
}
