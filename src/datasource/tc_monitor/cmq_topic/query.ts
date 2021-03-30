import coreModule from 'grafana/app/core/core_module';
import { InstanceQueryDescriptor } from './query_def';

const ExtraFields = [
  {
    label: 'Subscription(订阅)',
    field: 'subscriptionId',
  },
];

export class CmqTopicQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.InstanceQueryDescriptor = InstanceQueryDescriptor;
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        default:
          return [];
      }
    };

    // 各个实例下的订阅，由于不想每次都重复发请求，所以这里做了一层缓存，数据结构为{ [instanceId]: {   } }
    $scope.cacheMap = {};

    $scope.getExtraFields = () => {
      return ExtraFields.filter((item) => item.field in ($scope.dims ?? {}));
    };

    $scope.getTopicName = () => {
      let { instance } = $scope.target;
      instance = $scope.datasource.getServiceFn('cmqTopic', 'getVariable')(instance);
      if (!instance) {
        return '';
      }
      try {
        instance = JSON.parse(instance).TopicName;
      } catch (error) {
        console.log();
      }
      return instance;
    };

    $scope.onExtraFieldChange = (field) => {
      $scope.onRefresh();
    };

    $scope.getExtraDropdown = async (target, field) => {
      if (field === 'subscriptionId') {
        const TopicName = $scope.getTopicName();
        let data = $scope.cacheMap[TopicName];

        if (!data) {
          const region = $scope.datasource.getServiceFn('cmqTopic', 'getVariable')(target.region);
          const fetcher = $scope.datasource.getServiceFn('cmqTopic', 'fetchAllSubscription');
          data = await fetcher(region, { TopicName });
        }

        // 缓存
        $scope.cacheMap[TopicName] = data;
        return data;
      }
      return [];
    };

    $scope.init();
  }
}

const template = `
<div>
<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
    Functions are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/406/42637">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in InstanceQueryDescriptor">
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

<!-- 主题的ui -->
  <div ng-if="target.instance">
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="true" get-options="getExtraDropdown(target, extra.field)"
            on-change="onExtraFieldChange(extra.field)" css-class="min-width-10">
          </gf-form-dropdown>
        </div>
      </div>
    </div>
  </div>

  </div>
`;

export function scfQuery() {
  return {
    template: template,
    controller: CmqTopicQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      getDropdownOptions: '&',
      onChange: '&',
      onRefresh: '&',
      dims: '=',
    },
  };
}
coreModule.directive('cmqTopicQuery', scfQuery);
