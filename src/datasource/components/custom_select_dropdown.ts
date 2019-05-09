import angular from 'angular';
import * as _ from 'lodash';
import coreModule from 'grafana/app/core/core_module';

export class CustomSelectDropdownCtrl {
  dropdownVisible: any;
  highlightIndex: any;
  linkText: any;
  oldVariableText: any;
  selectOptions: any;
  options: any;
  value: any;
  search: any;
  multiple: boolean | undefined;
  selectedValues: any;
  variable: any;

  hide: any;
  onChange: any;

  /** @ngInject */
  constructor() { }

  show() {
    this.oldVariableText = _.get(this.value, 'text', '');
    this.highlightIndex = -1;

    this.selectOptions = _.cloneDeep(this.options);
    _.map(this.selectOptions, option => {
      const selectedValue = _.get(this.value, 'value');
      if (!selectedValue) {
        option.selected = false;
      } else if (_.isArray(selectedValue)) {
        option.selected = _.indexOf(selectedValue, option.value) !== -1 ? true : false;
      } else {
        option.selected = selectedValue === option.value;
      }
    });

    this.selectedValues = _.filter(this.selectOptions, { selected: true });

    this.search = {
      query: '',
      options: this.selectOptions.slice(0, Math.min(this.selectOptions.length, 1000)),
    };

    this.dropdownVisible = true;
  }

  updateLinkText() {
    this.linkText = _.get(this.value, 'text', '');
  }

  clearSelections() {
    _.each(this.selectOptions, option => {
      option.selected = false;
    });

    this.selectionsChanged(false);
  }

  keyDown(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
    if (evt.keyCode === 40) {
      this.moveHighlight(1);
    }
    if (evt.keyCode === 38) {
      this.moveHighlight(-1);
    }
    if (evt.keyCode === 13) {
      if (this.search.options.length === 0) {
        this.commitChanges();
      } else {
        this.selectValue(this.search.options[this.highlightIndex], {}, true, false);
      }
    }
    if (evt.keyCode === 32) {
      this.selectValue(this.search.options[this.highlightIndex], {}, false, false);
    }
  }

  moveHighlight(direction) {
    this.highlightIndex = (this.highlightIndex + direction) % this.search.options.length;
  }

  selectValue(option, event, commitChange?, excludeOthers?) {
    if (!option) {
      return;
    }
    option.selected = this.multiple ? !option.selected : true;

    commitChange = commitChange || false;
    excludeOthers = excludeOthers || false;

    const setAllExceptCurrentTo = newValue => {
      _.each(this.selectOptions, other => {
        if (option !== other) {
          other.selected = newValue;
        }
      });
    };

    // commit action (enter key), should not deselect it
    if (commitChange) {
      option.selected = true;
    }

    if (excludeOthers) {
      setAllExceptCurrentTo(false);
      commitChange = true;
    } else if (!this.multiple) {
      setAllExceptCurrentTo(false);
      commitChange = true;
    } else if (event.ctrlKey || event.metaKey || event.shiftKey) {
      commitChange = true;
      setAllExceptCurrentTo(false);
    }

    this.selectionsChanged(commitChange);
  }

  selectionsChanged(commitChange) {
    this.selectedValues = _.filter(this.selectOptions, { selected: true });
    this.value.value = _.map(this.selectedValues, 'value');
    this.value.text = _.map(this.selectedValues, 'text').join(' + ');
    if (!this.multiple) {
      this.value.value = _.get(this.selectedValues, '0.value', '');
    }

    if (commitChange) {
      this.commitChanges();
    }
  }

  commitChanges() {
    this.dropdownVisible = false;

    this.updateLinkText();

    if (this.value.text !== this.oldVariableText) {
      this.onChange({ value: this.value });
    }
  }

  queryChanged() {
    this.highlightIndex = -1;
    this.search.options = _.filter(this.selectOptions, option => {
      return option.text.toLowerCase().indexOf(this.search.query.toLowerCase()) !== -1;
    });

    this.search.options = this.search.options.slice(0, Math.min(this.search.options.length, 1000));
  }


  init() {
    if (_.isEmpty(this.value)) {
      this.value = { text: '', value: !!this.multiple ? [] : '' };
    }
    this.updateLinkText();
  }
}

/** @ngInject */
export function customSelectDropdown($compile, $window, $timeout, $rootScope) {
  return {
    restrict: 'E',
    scope: { options: '=', multiple: '=', value: '=', onChange: '&' },
    templateUrl: 'public/plugins/tencentcloud-monitor-grafana-app/datasource/partials/custom_select_dropdown.html',
    controller: 'CustomSelectDropdownCtrl',
    controllerAs: 'vm',
    bindToController: true,
    link: (scope, elem) => {
      const bodyEl = angular.element($window.document.body);
      const linkEl = elem.find('.variable-value-link');
      const inputEl = elem.find('input');

      function openDropdown() {
        inputEl.css('width', Math.max(linkEl.width(), 136) + 'px');

        inputEl.show();
        linkEl.hide();

        inputEl.focus();
        $timeout(
          () => {
            bodyEl.on('click', bodyOnClick);
          },
          0,
          false
        );
      }

      function switchToLink() {
        inputEl.hide();
        linkEl.show();
        bodyEl.off('click', bodyOnClick);
      }

      function bodyOnClick(e) {
        if (elem.has(e.target).length === 0) {
          scope.$apply(() => {
            scope.vm.commitChanges();
          });
        }
      }

      scope.$watch('vm.dropdownVisible', newValue => {
        if (newValue) {
          openDropdown();
        } else {
          switchToLink();
        }
      });

      scope.vm.init();
    },
  };
}

coreModule.controller('CustomSelectDropdownCtrl', CustomSelectDropdownCtrl);
coreModule.directive('customSelectDropdown', customSelectDropdown);
