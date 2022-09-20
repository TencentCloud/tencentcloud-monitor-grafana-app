//go:build mage
// +build mage

package main

import (
	"encoding/json"
	"io/ioutil"

	"fmt"
	// mage:import
	build "github.com/grafana/grafana-plugin-sdk-go/build"
	"github.com/magefile/mage/sh"
)

// Hello prints a message (shows that you can define custom Mage targets).
func Hello() {
	fmt.Println("hello plugin developer!")
	build.SetBeforeBuildCallback(func(cfg build.Config) (build.Config, error) {
		return cfg, nil
	})
}

func getValueFromJSON(fpath string, key string) (string, error) {
	byteValue, err := ioutil.ReadFile(fpath)
	if err != nil {
		return "", err
	}

	var result map[string]interface{}
	err = json.Unmarshal(byteValue, &result)
	if err != nil {
		return "", err
	}
	executable := result[key]
	name, ok := executable.(string)
	if !ok || name == "" {
		return "", fmt.Errorf("plugin.json is missing: %s", key)
	}
	return name, nil
}

func init() {
	//  执行应用补丁命令，以更改 reqcli 字段
	if err := sh.Run("git", "apply", "tencentcloud-sdk-go.patch"); err != nil {
		panic(err)
	}
	pluginVersion, err := getValueFromJSON("package.json", "version")
	if err != nil || len(pluginVersion) == 0 {
		fmt.Println("build failed: get pluginVersion error", err)
	}
	fmt.Println("build pkg version: ", pluginVersion)
	build.SetBeforeBuildCallback(func(cfg build.Config) (build.Config, error) {
		cfg.CustomVars = map[string]string{
			"common.PluginVersion": pluginVersion,
		}

		return cfg, nil
	})
}

// Default configures the default target.
var Default = build.BuildAll
