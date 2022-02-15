import { Cascader } from '@grafana/ui';
import { loadReactComponent } from '../../common/react-loader';

loadReactComponent(Cascader, 'gfCascader', {
  separator: '@?',
  placeholder: '@?',
  options: '<',
  changeOnSelect: '<?',
  onSelect: '&',
  width: '@?',
  initialValue: '@?',
  allowCustomValue: '<?',
  formatCreateLabel: '&?',
  displayAllSelectedLevels: '<?',
});
