import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { ParseData } from 'parser.js';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const parsedData = ParseData(data);

  console.log(parsedData);

  return (
    <div>React Panel</div>
  );
};
