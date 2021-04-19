import { TimeRange, dateTime, dateTimeParse, DisplayProcessor, Field, getDisplayProcessor, display } from '@grafana/data';

/**
 * 
 * @param data - the data returned from Grafana panel query
 * @param numPairs - the number of lines to display, this is set in the options tab
 * @returns parsed data for RenderGraph.js to use to render slope graph
 */

export function parseData(data, numPairs) {

  // Find the number field and use for values. 
  const valueField = data.series
    .map(series => series.fields.find(field => field.type === 'number'));
  let values = [];
  valueField[0].values.buffer.map(value => {
        values.push([value, valueField[0].display(value)]);
      })

  // series[0].fields[x].values.buffer gives data
  // x = 0: left column terms, 1: right column terms
  var extractedData = data.series[0].fields;
  var transformedData = [];

  for (var i = 0; i < extractedData[0].values.buffer.length; i++) {
    
    var row = [extractedData[0].values.buffer[i], extractedData[1].values.buffer[i], values[i][0], values[i][1] ];
    transformedData.push(row);
  }

  let sortedPairs = transformedData.sort((a, b) => b[2] - a[2]);

  // topPairs is set by editor.  Default is 10.
  let topPairs = sortedPairs.slice(0, Math.min(numPairs, sortedPairs.length));

  // MAKE KEYS
  let leftKeys = [];
  let leftEncoding = [];
  let counter = 0;
  for (var i in topPairs) {
    let newKey = topPairs[i][0];
    let added = false;
    topPairs[i].coords = [{ x: 0, value: topPairs[i][2], displayValue: topPairs[i][3] }, { x: 1 }];
    for (var j in leftKeys) {
      if (leftKeys[j] == newKey) {
        added = true;
        leftEncoding.push(parseInt(j));
        topPairs[i].coords[0].y = parseInt(j);
        break;
      }
    }
    if (!added) {
      leftKeys.push(newKey);
      leftEncoding.push(counter);
      topPairs[i].coords[0].y = counter;
      counter++;
    }
  }

  let rightKeys = [];
  let rightEncoding = [];
  counter = 0;
  for (var i in topPairs) {
    let newKey = topPairs[i][1];
    let added = false;
    for (var j in rightKeys) {
      if (rightKeys[j] == newKey) {
        added = true;
        rightEncoding.push(parseInt(j));
        topPairs[i].coords[1].y = parseInt(j);
        break;
      }
    }
    if (!added) {
      rightKeys.push(newKey);
      rightEncoding.push(counter);
      topPairs[i].coords[1].y = counter;
      counter++;
    }
  }

  // tick marks at leftKeys & rightKeys,
  // line y values at leftEncoding & rightEncoding
  // line thickness relative to top values

  // set colors by value as well.
  let alpha = 0.6;
  let colorPalette = [
    'rgba(196, 199, 254, ' + alpha + ')',
    'rgba(171, 176, 253, ' + alpha + ')',
    'rgba(146, 152, 248, ' + alpha + ')',
    'rgba(122, 130, 246, ' + alpha + ')',
    'rgba(106, 115, 245, ' + alpha + ')',
    'rgba(85, 95, 244, ' + alpha + ')',
    'rgba(56, 67, 241, ' + alpha + ')',
    'rgba(23, 36, 238, ' + alpha + ')',
    'rgba(2, 14, 202, ' + alpha + ')',
    'rgba(3, 12, 158, ' + alpha + ')',
  ];

  let maxValue = topPairs[0][2];

  for (var i = 0; i < topPairs.length; i++) {
    let colorScale = Math.ceil((topPairs[i][2] / maxValue) * 10);
    if (colorScale > 0) {
      colorScale--;
    }
    topPairs[i].coords[0].color = colorPalette[colorScale];

    // add label0/label1 to coords
    topPairs[i].coords[0].label0 = topPairs[i][0];
    topPairs[i].coords[0].label1 = topPairs[i][1];

    // add value
    let value = topPairs[i].coords[0].value; // / 1000;
    
  }

  let objToReturn = {
    leftKeys: leftKeys,
    rightKeys: rightKeys,
    topPairs: topPairs,
  };

  return objToReturn;
}
