import coreModule from 'grafana/app/core/core_module';
import { ECMBLOCKSTORAGEFilterFieldsDescriptor, queryEditorName, namespace, templateQueryIdMap } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

const ExtraFields = [
  // {
  //   label: 'nodeid',
  //   field: 'NodeId',
  //   action: 'DescribeInstanceNodeInfo',
  // },
  {
    label: 'diskId',
    field: 'diskId',
  },
];
export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.ECMBLOCKSTORAGEFilterFieldsDescriptor = ECMBLOCKSTORAGEFilterFieldsDescriptor;
      $scope.ExtraFields = ExtraFields;
      $scope.namespace = namespace;
    };

    // $scope.getInstanceId = () => {
    //   let { instance } = $scope.target;
    //   const service = GetServiceFromNamespace($scope.namespace);
    //   instance = $scope.datasource.getServiceFn(service, 'getVariable')(instance);
    //   if (!instance) {
    //     return '';
    //   }
    //   try {
    //     instance = JSON.parse(instance)[templateQueryIdMap.instance];
    //   } catch (error) {
    //     console.log();
    //   }
    //   return instance;
    // };
    $scope.getExtraFields = () => {
      return ExtraFields.filter((item) => item.field in ($scope.dims ?? {}) || item.label in ($scope.dims ?? {}));
    };
    $scope.getExtraDropdown = (target, action) => {
      let { instance } = target;
      const service = GetServiceFromNamespace($scope.namespace);
      instance = $scope.datasource.getServiceFn(service, 'getVariable')(instance);
      try {
        instance = JSON.parse(instance);
        const { DataDisks: dataDisks } = instance;
        return dataDisks.map((o) => {
          o._InstanceAliasValue = o[templateQueryIdMap.diskId];
          return {
            text: o[templateQueryIdMap.diskId],
            value: JSON.stringify(o),
          };
        });
      } catch (error) {
        // console.log('instance error', instance);
        const payload: any = {
          InstanceId: instance,
        };
        const rs = $scope.datasource.getServiceFn(service, 'getDiskList')({ payload });
        const result = rs.map((o) => {
          return {
            text: o[templateQueryIdMap.diskId],
            value: JSON.stringify(o),
          };
        });
        return result;
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
      <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/product/248/50388">Click here to get API doc.</a>
    </label>
    <div class="gf-form-inline" ng-repeat="field in ECMBLOCKSTORAGEFilterFieldsDescriptor">
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

<!-- 起始区域 目的区域等 -->
  <div>
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="false" get-options="getExtraDropdown(target)"
            on-change="onRefresh()" css-class="min-width-10">
          </gf-form-dropdown>
        </div>
      </div>
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
coreModule.directive(queryEditorName, sQuery);
