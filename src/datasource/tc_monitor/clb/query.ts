import coreModule from 'grafana/app/core/core_module';
import { get, chain } from 'lodash';
import { LOADBALANCEFieldsDescriptor, templateQueryIdMap, namespace } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.LOADBALANCEFieldsDescriptor = LOADBALANCEFieldsDescriptor;
      $scope.serversList = [];
    };
    $scope.onFieldChange = (field) => {
      $scope.onRefresh();
    };
    $scope.onInstanceChange = (n, o) => {
      $scope.target.listener = '';
      $scope.target.servers = '';
      $scope.target.serverPort = '';
    };
    $scope.getVariableId = (data, type) => {
      let variableData = data;
      const service = GetServiceFromNamespace(namespace);
      // console.log({namespace, service});
      variableData = $scope.datasource.getServiceFn(service, 'getVariable')(variableData);
      if (!variableData) {
        return '';
      }
      try {
        variableData = JSON.parse(variableData)[templateQueryIdMap[type]];
      } catch (error) {
        // console.log();
      }
      return variableData;
    };
    $scope.getExtraDropdown = async (target) => {
      const { instance } = $scope.target;
      const service = GetServiceFromNamespace(namespace);
      const instanceId = $scope.getVariableId(instance, 'instance');
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const rs = await $scope.datasource.getServiceFn(service, 'getListenerList')({ region, instanceId });
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[templateQueryIdMap.listener];
        return {
          text: o[templateQueryIdMap.listener],
          value: JSON.stringify(o),
        };
      });
      return result;
    };
    $scope.getServersDropdown = async (target) => {
      const { instance, listener } = $scope.target;
      const service = GetServiceFromNamespace(namespace);
      const instanceId = $scope.getVariableId(instance, 'instance');
      const listenerId = $scope.getVariableId(listener, 'listener');
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const serversList = await $scope.datasource.getServiceFn(
        service,
        'getServerList'
      )({ region, instanceId, listenerId });
      $scope.serversList = serversList;
      const res = chain(serversList)
        .map((item) => {
          item._InstanceAliasValue = get(item, 'PrivateIpAddresses.0');
          return {
            text: get(item, 'PrivateIpAddresses.0'),
            value: JSON.stringify(item),
          };
        })
        .uniqBy('text')
        .value();
      return res;
    };
    $scope.getServerPortDropdown = async (target) => {
      const { servers } = $scope.target;
      let serverPortList: any[] = [];
      try {
        const serversSource = JSON.parse(servers);
        serverPortList = chain($scope.serversList)
          .filter((item) => get(serversSource, 'PrivateIpAddresses.0') === get(item, 'PrivateIpAddresses.0'))
          .map((item) => {
            item._InstanceAliasValue = get(item, 'Port');
            return {
              text: `${get(item, 'Port')}`,
              value: JSON.stringify(item),
            };
          })
          .value();
      } catch (error) {}
      return serverPortList;
    };

    $scope.init();
  }
}

const template = `
<div>
  <div class="tc-sub-params" ng-if="showDetail">
    <label class="gf-form-label tc-info-label">
      Functions are queried by following params.
      <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/214/30685">Click here to get API doc.</a>
    </label>
    <div class="gf-form-inline" ng-repeat="field in LOADBALANCEFieldsDescriptor">
      <div class="gf-form">
        <label class="gf-form-label width-14">
          {{ field.key }}
          <info-popover mode="right-normal">
            {{ field.cnDescriptor }}
            <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
          </info-popover>
        </label>
        <input
          ng-if="field.type === 'inputNumber'"
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
        <multi-condition
          ng-if="field.type === 'inputNumberMulti'"
          type="'inputNumber'"
          max-cond="5"
          value="target.queries.Filters[field.key]"
          maxNum="field.max"
          minNum="field.min"
          on-change="onChange()"
        ></multi-condition>
        <multi-condition
          ng-if="field.type === 'inputMulti'"
          type="'input'"
          value="target.queries[field.key]"
          on-change="onChange()"
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
      <gf-form-dropdown model="target.listener" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target)"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
<div class="gf-form-inline" ng-if="target.listener && namespace !== '${namespace}'">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">Servers</label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.servers" allow-custom="true" lookup-text="true" get-options="getServersDropdown(target)"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
<div class="gf-form-inline" ng-if="target.servers && namespace !== '${namespace}'">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">ServerPort</label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.serverPort" allow-custom="true" lookup-text="true" get-options="getServerPortDropdown(target)"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
`;

export function sQuery() {
  return {
    template: template,
    controller: QueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      namespace: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      getDropdownOptions: '&',
      onChange: '&',
      onRefresh: '&',
      dims: '=',
    },
    link: (scope, element, attrs) => {
      scope.$watch('target.instance', (newValue, oldValue) => {
        scope.onInstanceChange?.(newValue, oldValue);
      });
    },
  };
}
coreModule.directive('clbQuery', sQuery);
