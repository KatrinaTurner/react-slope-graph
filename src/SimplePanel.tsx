import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { ParseData } from 'parser.js';
import { Canvas } from 'components/Canvas';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, id }) => {
  let graph_options = {
    ...options
  }

  // new stuff
//   let state = {
//       data: [],
//       activeName: null
//   }
  // ----

  var parsedData = {};
  try {
    parsedData = ParseData(data, graph_options.numLines);

    console.log(parsedData);
    console.log(graph_options);
  } catch (error) {
      console.error("Parsing error : ", error);
  }
 
  return <Canvas height={height} width={width} panelId={id} options={graph_options} data={parsedData} />;

};