import React from 'react';
import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { InlineLabel, useStyles, InlineFieldRow } from '@grafana/ui';

/**
 * Horizontal section for editor components.
 *
 * @alpha
 */
export const SegmentSection = ({
  label,
  htmlFor,
  children,
  fill,
}: {
  // Name of the section
  label: string;
  // htmlFor for the label
  htmlFor?: string;
  // List of components in the section
  children: React.ReactNode;
  // Fill the space at the end
  fill?: boolean;
}) => {
  const styles = useStyles(getStyles);
  return (
    <InlineFieldRow>
      <InlineLabel htmlFor={htmlFor} width={12} className={styles.label}>
        {label}
      </InlineLabel>
      {children}
      {fill && (
        <div className={styles.fill}>
          <InlineLabel> </InlineLabel>
        </div>
      )}
    </InlineFieldRow>
  );
};

const getStyles = (theme: GrafanaTheme) => ({
  label: css`
    color: #33a2e5;
  `,
  fill: css`
    flex-grow: 1;
    margin-bottom: ${theme.spacing.inlineFormMargin};
  `,
});
