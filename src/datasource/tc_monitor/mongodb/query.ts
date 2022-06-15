import coreModule from 'grafana/app/core/core_module';
import { map, get, find, times } from 'lodash';
import { MONGODBFieldsDescriptor, templateQueryIdMap } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

export class MongoDBQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.MONGODBFieldsDescriptor = MONGODBFieldsDescriptor;
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

    $scope.onInstanceChange = (n, o) => {
      if (n === o) {
        return;
      }
      $scope.target.replica = '';
      $scope.target.node = '';
    };

    $scope.getVariableId = (data, type) => {
      let variableData = data;
      const service = GetServiceFromNamespace('QCE/CMONGO');

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

    $scope.getExtraDropdown = async (target, type) => {
      const { instance, replica } = $scope.target;
      const service = GetServiceFromNamespace('QCE/CMONGO');
      const instanceId = $scope.getVariableId(instance, 'instance');
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const [res] = await $scope.datasource.getServiceFn(service, 'getInstances')(region, {
        InstanceIds: [instanceId],
      });
      if (type === 'replica') {
        return map(get(res, 'ReplicaSets', []), (item) => {
          item._InstanceAliasValue = item.ReplicaSetId;
          return { text: item.ReplicaSetId, value: JSON.stringify(item) };
        });
      }
      if (type === 'node' && replica !== '') {
        const replicaId = $scope.getVariableId(replica, 'replica');
        const targetReplica = find(get(res, 'ReplicaSets', []), { ReplicaSetId: replicaId });
        const options = times(targetReplica.SecondaryNum, (index) => {
          const nodeId = `${targetReplica.ReplicaSetId}-node-slave${index}`;
          return {
            text: nodeId,
            value: JSON.stringify({ NodeId: nodeId, _InstanceAliasValue: `${targetReplica.ReplicaSetId} - ${nodeId}` }),
          };
        });
        return [
          {
            text: `${targetReplica.ReplicaSetId}-node-primary`,
            value: JSON.stringify({
              NodeId: `${targetReplica.ReplicaSetId}-node-primary`,
              _InstanceAliasValue: `${targetReplica.ReplicaSetId} - ${`${targetReplica.ReplicaSetId}-node-primary`}`,
            }),
          },
          ...options,
        ];
      }
      return [];
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
  <div class="gf-form-inline" ng-repeat="field in MONGODBFieldsDescriptor">
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

<div class="gf-form-inline" ng-if="target.instance">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">
      Replica
    </label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.replica" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target, 'replica')"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>

<div class="gf-form-inline" ng-if="target.replica">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">
      Node
    </label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.node" allow-custom="true" lookup-text="true" get-options="getExtraDropdown(target, 'node')"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>
`;

export function mongodbQuery() {
  return {
    template: template,
    controller: MongoDBQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      onRefresh: '&',
      onChange: '&',
    },
    link: (scope, element, attrs) => {
      scope.$watch('target.instance', (newValue, oldValue) => {
        scope.onInstanceChange?.(newValue, oldValue);
      });
    },
  };
}

coreModule.directive('mongodbQuery', mongodbQuery);
