import React, { useEffect } from 'react';

// import Chart from 'chart.heatmap.js';
export const Canvas = props => {

  useEffect(() => {
    console.log('rendering');
    const chartDiv = document.getElementById('Chart_' + props.panelId);
    console.log(chartDiv)
  });
  return (
    <div>
      <canvas id={'Chart_' + props.panelId} style={{ height: props.height, width: props.width }}></canvas>
    </div>
  );
};
