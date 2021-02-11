import React, { useEffect } from 'react';
import  SvgHandler from './RenderGraph.js';

// import Chart from 'chart.heatmap.js';
export const Canvas = props => {

  useEffect(() => {
    console.log('rendering');
    const id = props.panelId;
    // const chartDiv = document.getElementById('Chart_' + id);
    const chart = new SvgHandler('Chart_' + id);
    console.log(chart);

    // data, ctrl, header1, header2
    chart.renderGraph(props.data, props.height, props.width, props.options.leftHeader, props.options.rightHeader);

  });



  return (
      <div id={'Chart_' + props.panelId} style={{ height: props.height, width: props.width }}></div>
  );
};
