import coreModule from 'grafana/app/core/core_module';
import { map } from 'lodash';
import { RedisMemFieldsDescriptor, templateQueryIdMap, NodeType, namespace } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

export class RedisMemQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.RedisMemFieldsDescriptor = RedisMemFieldsDescriptor;
    };

    $scope.clearExtrasAlias = () => {
      $scope.target.rnodeid = '';
      $scope.target.pnodeid = '';
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        default:
          return [];
      }
    };

    $scope.getVariableId = (data, type) => {
      let variableData = data;
      const service = GetServiceFromNamespace(namespace);

      variableData = $scope.datasource.getServiceFn(service, 'getVariable')(variableData);
      if (!variableData) {
        return '';
      }
      try {
        variableData = JSON.parse(variableData)[templateQueryIdMap[type]];
      } catch (error) {}
      return variableData;
    };

    $scope.getExtraDropdown = async (target, nodetype) => {
      const { instance } = $scope.target;
      const service = GetServiceFromNamespace(namespace);
      const instanceId = $scope.getVariableId(instance, 'instance');
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const rs = await $scope.datasource.getServiceFn(service, 'getInstanceNodeInfo')({ region, instanceId });

      const ndoeTypeIndex = NodeType.indexOf(nodetype);
      return ndoeTypeIndex === -1 ? [] : map(rs[ndoeTypeIndex], (item) => ({ text: item.NodeId, value: item.NodeId }));
    };

    $scope.init();
  }
}

const template = `
<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
    Instances are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/240/35769">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in RedisMemFieldsDescriptor">
    <div class="gf-form">
      <label class="gf-form-label width-14">
        {{ field.key }}
        <info-popover mode="right-normal">
          {{ field.cnDescriptor }}
          <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
        </info-popover>
      </label>
      <input
        ng-if="field.type === 'inputnumber'"
        style="margin-right:2px"
        type="number"
        ng-model="target.queries[field.key]"
        ng-change="onChange()"
        class="gf-form-input width-10"
        ng-min="field.min"
        ng-max="field.max"
      />
      <input
        ng-if="field.type === 'input'"
        style="margin-right:2px"
        type="text"
        ng-model="target.queries[field.key]"
        ng-change="onChange()"
        class="gf-form-input width-10"
      />
      <gf-form-dropdown
        ng-if="field.type === 'dropdown'"
        model="target.queries[field.key]"
        allow-custom="true"
        lookup-text="true"
        get-options="getDropdown(field.key)"
        on-change="onChange()"
        css-class="min-width-10"
      ></gf-form-dropdown>
      <multi-condition
        ng-if="field.type === 'inputmulti'"
        type="'input'"
        value="target.queries[field.key]"
        on-change="onChange()"
      ></multi-condition>
      <multi-condition
        ng-if="field.type === 'dropdownmulti'"
        type="'dropdown'"
        value="target.queries[field.key]"
        on-change="onChange()"
        get-options="getDropdown(field.key)"
      ></multi-condition>
      <custom-select-dropdown
        ng-if="field.type === 'select'"
        value="target.queries[field.key]"
        options="field.list"
        multiple="field.multiple || false"
        on-change="onChange()"
      ></custom-select-dropdown>
    </div>
  </div>

</div>

<div class="gf-form-inline" ng-if="target.instance && dims.rnodeid">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">
      RedisNode
    </label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.rnodeid" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target, 'Redis')"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
<div class="gf-form-inline" ng-if="target.instance && dims.pnodeid">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">
      ProxyNode
    </label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.pnodeid" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target, 'Proxy')"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
`;

export function redisMemQuery() {
  return {
    template: template,
    controller: RedisMemQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      onChange: '&',
      onRefresh: '&',
      dims: '=',
    },
    link: (scope, element, attrs) => {
      scope.$watch('target.instance', () => {
        scope.clearExtrasAlias?.();
      });
      scope.$watch('target.metricName', () => {
        scope.clearExtrasAlias?.();
      });
    },
  };
}

coreModule.directive('redisMemQuery', redisMemQuery);
