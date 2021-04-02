import coreModule from 'grafana/app/core/core_module';
import _ from 'lodash';
import { isVariable } from '../../common/constants';
import { LBPUBLICFieldsDescriptor, LBPUBLICListenerAliasList } from './query_def';

export class LBPublicQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.listenerAliasList = _.map(LBPUBLICListenerAliasList, (item) => ({ text: `As ${item}`, value: item }));
    $scope.init = () => {
      $scope.LBPUBLICFieldsDescriptor = LBPUBLICFieldsDescriptor;
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

    $scope.getInstanceId = () => {
      let { instance } = $scope.target;
      instance = $scope.datasource.getServiceFn('lbPublic', 'getVariable')(instance);
      if (!instance) return '';
      try {
        return JSON.parse(instance).LoadBalancerId;
      } catch (e) {
        return instance;
      }
    };

    $scope.getListeners = async () => {
      const InstanceId = $scope.getInstanceId();

      console.log(InstanceId, 'Instance');

      const fetcher = $scope.datasource.getServiceFn('lbPublic', 'getListeners');
      const region = $scope.datasource.getServiceFn('lbPublic', 'getVariable')($scope.target.region);
      const data = await fetcher(region, InstanceId);

      const listenerAlias = $scope.target.listenerAlias;

      const listeners: any[] = [];
      _.forEach(data, (item) => {
        const listenerAliasValue = _.get(item, listenerAlias);
        if (listenerAliasValue) {
          if (['string', 'number'].includes(typeof listenerAliasValue)) {
            item._listenerAliasValue = listenerAliasValue;
            listeners.push({ text: listenerAliasValue, value: JSON.stringify(item) });
          } else if (_.isArray(listenerAliasValue)) {
            _.forEach(listenerAliasValue, (subItem) => {
              item._listenerAliasValue = subItem;
              listeners.push({ text: subItem, value: JSON.stringify(item) });
            });
          }
        }
      });
      // console.log({listeners});
      return listeners;
    };

    $scope.onListenerAliasChange = () => {
      // 仅当 instance 字段不是模板变量时，执行以下操作
      const value = $scope.target.listener;
      if (!isVariable(value)) {
        $scope.target.listener = '';
        $scope.onRefresh();
      }
    };

    $scope.init();
  }
}

const template = `
<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
    Instances are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/214/30685">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in LBPUBLICFieldsDescriptor">
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
        css-class="min-width-10">
      </gf-form-dropdown>
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

<!--Listener维度部分-->
<div class="gf-form-inline" ng-if="target.instance">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">
      Listeners
      <info-popover mode="right-normal">
        可不选择监听器，这时通过实例维度查询监控数据
      </info-popover>
    </label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <select class="gf-form-input min-width-8" ng-change="onListenerAliasChange()" ng-model="target.listenerAlias"
        ng-options="f.value as f.text for f in listenerAliasList"></select>
    </div>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.listener" allow-custom="true" lookup-text="true" get-options="getListeners()"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
`;

export function lbPublicQuery() {
  return {
    template: template,
    controller: LBPublicQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      onChange: '&',
      onRefresh: '&',
    },
  };
}

coreModule.directive('clbQuery', lbPublicQuery);
