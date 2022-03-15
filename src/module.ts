import { AppPlugin } from '@grafana/data';
import { MonitorAppConfigCtrl } from './components/config';

export const plugin = new AppPlugin();

plugin.setComponentsFromLegacyExports({
  ConfigCtrl: MonitorAppConfigCtrl,
});

// 当前React技术方案的Config页面，无法复刻 appEditCtrl.setPostUpdateHook 逻辑。
// import { ConfigPage } from './components/ConfigPage';
// plugin.addConfigPage({
//   title: 'Config',
//   id: 'config',
//   body: ConfigPage,
// });
