import React, { PureComponent } from 'react';
import { AppPluginMeta, PluginConfigPageProps } from '@grafana/data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GlobalSettings {}

type Props = PluginConfigPageProps<AppPluginMeta<GlobalSettings>>;

interface State {
  isEnabled: boolean;
}

/** 未启用
 * 当前React技术方案的Config页面，无法复刻 appEditCtrl.setPostUpdateHook 逻辑。
 */
export class ConfigPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isEnabled: false,
    };
  }

  componentDidMount(): void {
    this.setState(() => ({
      isEnabled: Boolean(this.props.plugin.meta?.enabled),
    }));
  }

  render() {
    return <div />;
  }
}
