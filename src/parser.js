import { TimeRange, dateTime, dateTimeParse, DisplayProcessor, Field, getDisplayProcessor, display } from '@grafana/data';

export function ParseData(data, numPairs) {
  console.log('react data:');
  console.log(data);

  const valueField = data.series
    .map(series => series.fields.find(field => field.type === 'number'));
    // .map(field => field?.values.get(field.values.length - 1));

  let values = [];
  
  valueField[0].values.buffer.map(value => {
        values.push([value, valueField[0].display(value)]);
      })

  //const valuesBuffer = valueField[0].values.buffer;
  console.log("values");
  console.log(values);


  // series[0].fields[x].values.buffer gives data now.
  // x = 0: left column terms, 1: right column terms, 2: value
  var extractedData = data.series[0].fields;
  var transformedData = [];

  for (var i = 0; i < extractedData[0].values.buffer.length; i++) {
    
    var row = [extractedData[0].values.buffer[i], extractedData[1].values.buffer[i], values[i][0], values[i][1] ];
    transformedData.push(row);
  }
  console.log('transformed data');
  console.log(transformedData);

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
  // line thickness relative to top_values

  // set colors by value as well.
  let alpha = 0.6;
  let color_palette = [
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

  let max_value = topPairs[0][2];

  for (var i = 0; i < topPairs.length; i++) {
    let color_scale = Math.ceil((topPairs[i][2] / max_value) * 10);
    if (color_scale > 0) {
      color_scale--;
    }
    topPairs[i].coords[0].color = color_palette[color_scale];

    // add label0/label1 to coords
    topPairs[i].coords[0].label0 = topPairs[i][0];
    topPairs[i].coords[0].label1 = topPairs[i][1];

    // add readable value
    let value = topPairs[i].coords[0].value; // / 1000;
    

    // var volume = value;
    // if (value < 1000) {
    //   volume = Math.round(value * 10) / 10 + ' KB';
    // } else {
    //   value = value / 1000;
    //   if (value < 1000) {
    //     volume = Math.round(value * 10) / 10 + ' MB';
    //   } else {
    //     value = value / 1000;
    //     if (value < 1000) {
    //       volume = Math.round(value * 10) / 10 + ' GB';
    //     } else {
    //       value = value / 1000;
    //       if (value < 1000) {
    //         volume = Math.round(value * 10) / 10 + ' TB';
    //       } else {
    //         volume = Math.round(value * 10) / 10 + ' PB';
    //       }
    //     }
    //   }
    // }
  }

  console.log(topPairs);

  let objToReturn = {
    leftKeys: leftKeys,
    rightKeys: rightKeys,
    topPairs: topPairs,
  };

  return objToReturn;
}
