import { SelectableValue } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';

export function getStringVariableNameOptions(): SelectableValue<string>[] {
  const variables = getTemplateSrv()
    .getVariables()
    .filter((item) => ['adhoc', 'datasource', 'interval', 'interval'].indexOf(item.type) === -1);
  const notMultiVariables = variables.filter((item) => !(item as any)?.multi);
  return notMultiVariables.map((item) => {
    const refValue = `\$\{${item.name}\}`;
    return { value: refValue, label: refValue };
  });
}
