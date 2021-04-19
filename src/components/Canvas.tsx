import React, { useEffect } from 'react';
import  SlopeGraph from './RenderGraph.js';
import '../css/styles.css';

// import Chart from 'chart.heatmap.js';
export const Canvas = props => {

  useEffect(() => {
    const id = props.panelId;
    const chart = new SlopeGraph('Chart_' + id);

    // data, ctrl, header1, header2
    chart.renderGraph(props.data, props.options.leftHeader, props.options.rightHeader, props.options.hoverColor);

  });



  return (
      <div id={'Chart_' + props.panelId} style={{ height: props.height, width: props.width }}></div>
  );
};
