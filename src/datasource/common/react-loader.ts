import coreModule from 'grafana/app/core/core_module';
import React from 'react';
import ReactDOM from 'react-dom';

const genController = (component) =>
  class Controller {
    _$scope: any;
    _$element: any;

    /** @ngInject */
    constructor($scope, $element) {
      this._$scope = $scope;
      this._$element = $element;
    }

    $onInit() {
      // extract porps
      const props = Object.entries(this._$scope).reduce((acc, [key, value]) => {
        if (!key.startsWith('$')) {
          if (typeof value === 'function') {
            acc[key] = (...args) => value({ _query: args.length === 1 ? args[0] : args });
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {} as any);

      // wating dom mounted
      setTimeout(() => {
        ReactDOM.render(React.createElement(component, props), this._$element[0]);
      });
    }
  };

export function loadReactComponent(
  RectCompo: React.ComponentType,
  componentName: string,
  propTypes: Record<string, string>
) {
  coreModule.directive(componentName, () => ({
    template: `<div class="${componentName}"></div>`,
    controller: genController(RectCompo),
    restrict: 'E',
    scope: propTypes,
    replace: true,
  }));
}
