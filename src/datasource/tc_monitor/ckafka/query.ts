import coreModule from 'grafana/app/core/core_module';
import { CKAFKAQueryDescriptor, templateQueryIdMap } from './query_def';

const ExtraFields = [
  {
    label: 'ConsumerGroup',
    field: 'consumerGroup',
  },
  {
    label: 'TopicId',
    field: 'topicId',
  },
  {
    label: 'Partition',
    field: 'partition',
  },
];

export class CKAFKAQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.CKAFKAQueryDescriptor = CKAFKAQueryDescriptor;
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        default:
          return [];
      }
    };
    $scope.onInstanceChange = () => {
      $scope.target.consumerGroup = '';
      $scope.target.topicId = '';
      $scope.target.topicName = '';
      $scope.target.partition = '';
    };
    $scope.getExtraFields = () => {
      return ExtraFields.filter((item) => item.field in ($scope.dims ?? {}));
    };

    $scope.getInstanceId = () => {
      let { instance } = $scope.target;
      instance = $scope.datasource.getServiceFn('ckafka', 'getVariable')(instance);
      if (Array.isArray(instance)) instance = instance[0];
      if (!instance) {
        return '';
      }
      try {
        instance = JSON.parse(instance).InstanceId;
      } catch (error) {
        // console.log();
      }
      return instance;
    };

    $scope.getExtraDropdown = async (target, field) => {
      const InstanceId = $scope.getInstanceId();
      const fetcher = $scope.datasource.getServiceFn('ckafka', 'getConsumerGroups');
      const region = $scope.datasource.getServiceFn('ckafka', 'getVariable')(target.region);
      const res = await fetcher(region, { InstanceId, groupname: target.consumerGroup, topicid: target.topicId });

      const { TopicList, GroupList, PartitionList } = res;
      const data = {
        GroupList: GroupList.map((group) => {
          group._InstanceAliasValue = group.GroupName;
          return {
            text: group.GroupName,
            value: JSON.stringify(group),
          };
        }),
        TopicList: TopicList.map((topic) => {
          topic._InstanceAliasValue = topic[templateQueryIdMap.topicId];
          return {
            text: topic[templateQueryIdMap.topicId],
            value: JSON.stringify(topic), // 为了获取多维度的值，这里完全可以使用JSON.stringify()将整个对象放进去
          };
        }),
        PartitionList: PartitionList.map((par) => {
          par._InstanceAliasValue = par[templateQueryIdMap.partition];
          return {
            text: String(par[templateQueryIdMap.partition]),
            value: JSON.stringify(par),
          };
        }),
      };

      switch (field) {
        case 'consumerGroup':
          return data.GroupList;
        case 'topicId':
          return data.TopicList;
        case 'partition':
          return data.PartitionList;
      }
    };

    $scope.init();
  }
}

const template = `
<div>
<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
    Functions are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/583/18582">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in CKAFKAQueryDescriptor">
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

<!-- 主题，消费分组，分区 -->
  <div ng-if="target.instance">
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target, extra.field)"
            on-change="onRefresh()" css-class="min-width-10">
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
    controller: CKAFKAQueryCtrl,
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
      instance: '=',
    },
    link: (scope, element, attrs) => {
      scope.$watch('target.instance', (newValue, oldValue) => {
        scope.onInstanceChange?.();
      });
    },
  };
}
coreModule.directive('ckafkaQuery', scfQuery);
