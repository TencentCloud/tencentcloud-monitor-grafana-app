import React from 'react';
import { Seg } from './Seg';
import { toSelectableValue } from '../common/toSelectableValue';

const DEFAULT_POLICY = 'default';

interface Props {
  onChange: (policy: string | undefined, measurement: string | undefined) => void;
  policy: string | undefined;
  measurement: string | undefined;
  getPolicyOptions: () => Promise<string[]>;
  getMeasurementOptions: (filter: string) => Promise<string[]>;
}

export const FromSection = ({
  policy,
  measurement,
  onChange,
  getPolicyOptions,
  getMeasurementOptions,
}: Props): JSX.Element => {
  const handlePolicyLoadOptions = async () => {
    const allPolicies = await getPolicyOptions();
    // if `default` does not exist in the list of policies, we add it
    const allPoliciesWithDefault = allPolicies.some((p) => p === 'default')
      ? allPolicies
      : [DEFAULT_POLICY, ...allPolicies];

    return allPoliciesWithDefault.map(toSelectableValue);
  };

  const handleMeasurementLoadOptions = async (filter: string) => {
    const allMeasurements = await getMeasurementOptions(filter);
    return allMeasurements.map(toSelectableValue);
  };

  return (
    <>
      <Seg
        allowCustomValue
        value={policy ?? 'using default policy'}
        loadOptions={handlePolicyLoadOptions}
        onChange={(v) => {
          onChange(v.value, measurement);
        }}
      />
      <Seg
        allowCustomValue
        value={measurement ?? 'select measurement'}
        loadOptions={handleMeasurementLoadOptions}
        filterByLoadOptions
        onChange={(v) => {
          onChange(policy, v.value);
        }}
      />
    </>
  );
};
