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
    chart.renderGraph(props.data, props.height, props.width, null, null);

  });



  return (
      <div id={'Chart_' + props.panelId} style={{ height: props.height, width: props.width }}></div>
  );
};


/*
const renderGraph = (parsedData, header1, header2, panelHeight, panelWidth) => {

        if (!parsedData) {
            return;
        }

        let top_10_pairs = parsedData.topPairs;
        let source_orgs = parsedData.srcOrgs;
        let dest_orgs = parsedData.destOrgs;
        // let alpha = parsedData.alpha;
        // let color_palette = parsedData.color_palette;
        // let min_value = top_10_pairs[top_10_pairs.length - 1][2]
        // let max_value = top_10_pairs[0][2]

        // set the dimensions and margins of the graph
        var margin = { top: 50, right: 400, bottom: 25, left: 400 },
            width = panelWidth - margin.left - margin.right,
            height = panelHeight - margin.top - margin.bottom;



        // append the svg object to the body of the page
        var svg = d3.select('Chart_' + props.panelId)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // function to wrap text!
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }

        // Add X scale
        var x = d3.scaleLinear()
            .domain([0, 1])
            .range([0, width])


        // y scales
        var yl = d3.scaleLinear()
            .domain([0, source_orgs.length - 1])
            .range([0, height])

        var yr = d3.scaleLinear()
            .domain([0, dest_orgs.length - 1])
            .range([0, height])


        // Add Y axes
        var leftAxis = d3.axisLeft(yl)
            .tickSize(5)
            .ticks(source_orgs.length)
            .tickFormat((d) => {
                return source_orgs[d]
            })

        var rightAxis = d3.axisRight(yr)
            .tickSize(5)
            .ticks(dest_orgs.length)
            .tickFormat((d) => {
                return dest_orgs[d]
            })

        svg.append("g").call(leftAxis)
            .attr("class", "axis")
            .attr("margin", 10)
            .selectAll(".tick text")
            .call(wrap, margin.left - 50)
            .attr("transform", "translate(" + -10 + ",0)")

        svg.append("g")
            .attr("transform", "translate(" + width + ",0)")
            .call(rightAxis)
            .attr("class", "axis")
            .selectAll(".tick text")
            .call(wrap, margin.right - 50)
            .attr("transform", "translate(" + 10 + ",0)")



        // scale for width of lines
        var w = d3.scaleLinear()
            .domain([top_10_pairs[top_10_pairs.length - 1][2], top_10_pairs[0][2]])
            .range([3, 15])

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // Add the lines
        for (var i in top_10_pairs) {
            var value = top_10_pairs[i][2];

            svg.append("path")
                .datum(top_10_pairs[i].coords)
                .attr("fill", "none")
                .attr("stroke", function (d) { return d[0].color })
                //() => {
                //     var alpha = 0.7; // w(top_10_pairs[i][2]) / 5;
                //     var color = "rgba(51, 102, 255," + alpha + ")";
                //     return color;
                // })
                .attr("stroke-width", 8) // w(top_10_pairs[i][2]))
                .attr("d", d3.line()
                    .x(function (d) { return x(d.x) })
                    .y(function (d) {
                        if (d.x == 0) {
                            return yl(d.y)
                        } else {
                            return yr(d.y)
                        }
                    }))
                .on("mouseover", function (d) {
                    d3.select(this).attr("stroke", "orange")
                        .attr("class", "path-hover");
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(() => {                    // takes in value in BYTES and converts to appropriate MB,GB, etc
                        var value = d[0].value
                        value = value / 1000;
                        var volume = value;
                        if (value < 1000) {
                            volume = (Math.round(value * 10) / 10) + " KB";
                        } else {
                            value = value / 1000;
                            if (value < 1000) {
                                volume = (Math.round(value * 10) / 10) + " MB"
                            } else {
                                value = value / 1000;
                                if (value < 1000) {
                                    volume = (Math.round(value * 10) / 10) + " GB"
                                } else {
                                    value = value / 1000;
                                    if (value < 1000) {
                                        volume = (Math.round(value * 10) / 10) + " TB"
                                    } else {
                                        volume = (Math.round(value * 10) / 10) + " PB"
                                    }
                                }
                            }
                        }
                        var text = "<p><b>Source:</b> " + d[0].source + "</p><p><b>Destination:</b> " + d[0].dest + "</p><p><b>Volume:</b> " + volume;
                        return text;
                    })
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    d3.select(this).attr("stroke", () => {
                        return d[0].color;
                    })
                })
        }

        // Add axis labels
        svg.append("text")
            .attr("class", "header-text")
            .attr("transform", "translate(" + -(margin.left / 2) + "," + -(margin.top / 2) + ")")  // above left axis
            .attr("text-anchor", "center")
            .text(header1);

        svg.append("text")
            .attr("class", "header-text")
            .attr("transform", "translate(" + (width + margin.right / 5) + "," + -(margin.top / 2) + ")")  // above right axis
            .attr("text-anchor", "center")
            .text(header2);

    }


const render_chart =(chartDiv)=>{
  const graph_options = props.options;
  const header1 = graph_options.leftHeader;
  const header2 = graph_options.rightHeader;
  const height = props.height;
  const width = props.width;
  const data = props.data;

  renderGraph(data, header1, header2, height, width);

  */