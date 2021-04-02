//+build mage

package main

import (
	"fmt"
	// mage:import
	build "github.com/grafana/grafana-plugin-sdk-go/build"
)

// Hello prints a message (shows that you can define custom Mage targets).
func Hello() {
	fmt.Println("hello plugin developer!")
	build.SetBeforeBuildCallback(func(cfg build.Config) (build.Config, error) {
		return cfg, nil
	})
}

// Default configures the default target.
var Default = build.BuildAll
