import React, { FormEvent, PureComponent } from 'react';
import { LegacyForms, InlineFieldRow, InlineField, Input, Switch, Select, Alert } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps, SelectableValue } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from '../types';
import { SERVICES } from '../tc_monitor';
import { t, setLanguage, Language } from '../../locale';
import { Region, RegionOptions } from '../../regin';
const { SecretFormField } = LegacyForms;

type Props = DataSourcePluginOptionsEditorProps<MyDataSourceOptions, MySecureJsonData>;

interface State {
  monitorFilter: string;
  isClsAlertVisiable: boolean;
}

export class ConfigEditor extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      monitorFilter: '',
      isClsAlertVisiable: false,
    };
    setLanguage(props.options.jsonData.language || Language.Chinese);
  }

  patchJsonData = (kv: Record<string, any>) => {
    const { onOptionsChange, options } = this.props;
    if (kv) {
      const jsonData = {
        ...options.jsonData,
        ...kv,
      };
      onOptionsChange({ ...options, jsonData });
    }
  };

  onJsonDataChange = (event: FormEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const targetName = event?.currentTarget?.name;
    const targetValue = (event?.currentTarget?.value || '').trim();
    if (targetName) {
      const jsonData = {
        ...options.jsonData,
        [targetName]: targetValue,
      };
      onOptionsChange({ ...options, jsonData });
    }
  };

  // Secure field (only sent to the backend)
  onSecureJsonChange = (event: FormEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const targetName = event?.currentTarget?.name;
    const targetValue = (event?.currentTarget?.value || '').trim();
    if (targetName) {
      onOptionsChange({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          [targetName]: targetValue,
        },
      });
    }
  };

  onResetSecureJson = (key: string) => {
    const { onOptionsChange, options } = this.props;
    if (key) {
      onOptionsChange({
        ...options,
        secureJsonFields: {
          ...options.secureJsonFields,
          [key]: false,
        },
        secureJsonData: {
          ...options.secureJsonData,
          [key]: '',
        },
      });
    }
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields, secureJsonData } = options;
    return (
      <>
        <div>
          <h3 className="page-heading">Security Credentials</h3>
          <div
            className="card-item"
            style={{
              position: 'relative',
              marginTop: '16px',
              padding: '16px',
              WebkitBoxFlex: 1,
              flexGrow: 1,
              borderTop: '3px solid rgb(50, 115, 217)',
            }}
          >
            <div>
              <h4>Initialize Tencent Cloud Monitor Grafana App</h4>
              <p>
                To initialize the App and connect it to your Tencent Cloud service you will need a SecretId and a
                SecretKey for you Tencent Cloud account.
                <br />
                <b>SecretId</b> is used to identify the identity of the API caller.
                <br />
                <b>SecretKey</b> is used to encrypt the signature and validate the signature of the server-side.
              </p>
            </div>
            <div>
              <h5>User Permission</h5>
              <p>
                If you are using a
                <a
                  className="highlight-word"
                  href="https://intl.cloud.tencent.com/document/product/598/13674"
                  target="_blank"
                  style={{ margin: '0 4px' }}
                >
                  sub-user
                </a>
                account, you should at least own read permission to the cloud products you wish to monitor.
              </p>
              <a className="highlight-word" href="https://console.cloud.tencent.com/cam/capi" target="_blank">
                Generate a new Tencent Cloud API key
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <InlineFieldRow>
            <InlineField label="SecretId" labelWidth={20} required={true}>
              <Input
                width={50}
                required={true}
                value={jsonData.secretId}
                name="secretId"
                onChange={this.onJsonDataChange}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <SecretFormField
              label="SecretKey"
              labelWidth={10}
              inputWidth={25}
              type="password"
              name="secretKey"
              value={secureJsonData?.secretKey || ''}
              isConfigured={secureJsonFields?.secretKey}
              onChange={this.onSecureJsonChange}
              onReset={() => {
                this.onResetSecureJson('secretKey');
              }}
            />
          </InlineFieldRow>
          <InlineFieldRow style={{ marginTop: '10px' }}>
            <InlineField label={t('language')} labelWidth={20}>
              <Select
                value={jsonData.language || Language.Chinese}
                className="width-10"
                options={[
                  { value: Language.English, label: 'English' },
                  { value: Language.Chinese, label: '简体中文' },
                ]}
                onChange={(option: SelectableValue<Language>) => {
                  setLanguage(option.value);
                  this.patchJsonData({
                    language: option.value,
                  });
                }}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow style={{ marginTop: '10px' }}>
            <InlineField label={t('enable_intranet_API_mode')} labelWidth={20}>
              <InlineSwitch
                value={jsonData.intranet}
                onChange={(e) => {
                  // onIntranetChange
                  this.patchJsonData({
                    intranet: e.currentTarget.checked,
                  });
                }}
              />
            </InlineField>
          </InlineFieldRow>
        </div>

        {this.renderRUMConfig()}
        {this.renderAPMConfig()}
        {this.renderRegionConfig()}
        {/* {this.renderLogServiceConfig()} */}
        {this.renderMonitorConfig()}
      </>
    );
  }

  renderRUMConfig() {
    const { options } = this.props;
    const { jsonData } = options;
    return (
      <div style={{ marginTop: 30 }}>
        <h3 className="page-heading">Real User Monitoring</h3>
        <InlineFieldRow>
          <InlineField labelWidth={40} label={t('RUM')}>
            <InlineSwitch
              value={jsonData.RUMServiceEnabled}
              onChange={(e) => {
                this.patchJsonData({
                  RUMServiceEnabled: e.currentTarget.checked,
                });
              }}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }

  renderAPMConfig() {
    const { options } = this.props;
    const { jsonData } = options;
    return (
      <div style={{ marginTop: 30 }}>
        <h3 className="page-heading">APM Monitoring</h3>
        <InlineFieldRow>
          <InlineField labelWidth={40} label={t('APM')}>
            <InlineSwitch
              value={jsonData.APMServiceEnabled}
              onChange={(e) => {
                this.patchJsonData({
                  APMServiceEnabled: e.currentTarget.checked,
                });
              }}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }

  renderLogServiceConfig() {
    const { options } = this.props;
    const { jsonData } = options;
    const { isClsAlertVisiable } = this.state;
    return (
      <div style={{ marginTop: 30 }}>
        <h3 className="page-heading">Log Service</h3>
        <InlineFieldRow>
          <InlineField labelWidth={40} label={t('CLS')}>
            <InlineSwitch
              value={jsonData.logServiceEnabled}
              onChange={(e) => {
                const logServiceEnabled = e.currentTarget.checked;
                this.patchJsonData({
                  logServiceEnabled,
                });
                if (logServiceEnabled)
                  this.setState({
                    isClsAlertVisiable: true,
                  });
              }}
            />
          </InlineField>
        </InlineFieldRow>
        {isClsAlertVisiable && <Alert severity="info" title="如果是第一次开启 CLS 数据源，请保存后重启 Grafana" />}
      </div>
    );
  }

  renderMonitorConfig() {
    const { options } = this.props;
    const { jsonData } = options;
    const { monitorFilter } = this.state;
    // 使用 product 表示云监控业务下的云产品
    const filteredProducts = SERVICES.filter((item) => item.label.toLowerCase().includes(monitorFilter.toLowerCase()));
    return (
      <div style={{ marginTop: 30 }}>
        <h3 className="page-heading">Monitor Services</h3>
        <InlineFieldRow style={{ marginBottom: 10 }}>
          <InlineField>
            <Input
              placeholder="Input keyword to filter..."
              width={40}
              value={monitorFilter}
              onChange={(e) => {
                this.setState({
                  monitorFilter: e.currentTarget.value,
                });
              }}
            />
          </InlineField>
          <InlineField label="Select All" style={{ marginLeft: 20 }}>
            <InlineSwitch
              value={filteredProducts.every((product) => jsonData[product.service])}
              onChange={(e) => {
                const toChecked = e.currentTarget.checked;
                const allCheckObject = {};
                filteredProducts.forEach((product) => {
                  allCheckObject[product.service] = toChecked;
                });
                this.patchJsonData(allCheckObject);
              }}
            />
          </InlineField>
        </InlineFieldRow>
        {filteredProducts.map((product) => {
          return (
            <InlineFieldRow key={product.service}>
              <InlineField
                labelWidth={55}
                label={product.label}
                tooltip={
                  <a target="_blank" href={product.href}>
                    {`Click here for more information of ${product.label}.`}
                  </a>
                }
              >
                <InlineSwitch
                  value={Boolean(jsonData[product.service])}
                  onChange={(e) => {
                    this.patchJsonData({
                      [product.service]: e.currentTarget.checked,
                    });
                  }}
                />
              </InlineField>
            </InlineFieldRow>
          );
        })}
      </div>
    );
  }

  renderRegionConfig() {
    const { options } = this.props;
    const { jsonData } = options;
    if (!jsonData.APMServiceEnabled) {
      return null;
    }
    return (
      <div style={{ marginTop: 30 }}>
        <h3 className="page-heading">Region</h3>
        <InlineFieldRow>
          <InlineField labelWidth={20} label={t('region')}>
            <Select
              value={jsonData.defaultRegion || Region.Guangzhou}
              className="width-10"
              options={RegionOptions.map((item) => ({ value: item, label: t(item) }))}
              onChange={(option: SelectableValue<Region>) => {
                this.patchJsonData({
                  defaultRegion: option.value,
                });
              }}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }
}

// @grafana/ui 7.3.6版本不含 InlineSwitch 组件，这里打个补丁。提升最小支持版本后，可移除
function InlineSwitch(props) {
  return (
    <div
      style={{
        padding: '0px 8px',
        height: 32,
        display: 'inline-flex',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
        // background: '#F4F5F5',
        border: '1px solid rgba(204, 204, 220, 0.15)',
        borderRadius: 2,
      }}
    >
      <Switch {...props} />
    </div>
  );
}
