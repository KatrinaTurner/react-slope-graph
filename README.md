# Grafana Panel Plugin Template

<!-- 
[![CircleCI](https://circleci.com/gh/grafana/simple-react-panel.svg?style=svg)](https://circleci.com/gh/grafana/simple-react-panel)
[![David Dependency Status](https://david-dm.org/grafana/simple-react-panel.svg)](https://david-dm.org/grafana/simple-react-panel)
[![David Dev Dependency Status](https://david-dm.org/grafana/simple-react-panel/dev-status.svg)](https://david-dm.org/grafana/simple-react-panel/?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/grafana/simple-react-panel/badge.svg)](https://snyk.io/test/github/grafana/simple-react-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/1dee2585eb412f913cbb/maintainability)](https://codeclimate.com/github/grafana/simple-react-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1dee2585eb412f913cbb/test_coverage)](https://codeclimate.com/github/grafana/simple-react-panel/test_coverage) -->

This plugin was built off a template for building React Grafana Panel Plugins.

## What is the Slope Graph Plugin?
Slope Graphs are good to use for comparing the change in a single data set between two points in time or the relationship between two data sets.  This plugin takes in data that is grouped by two parameters and sorts the pairs by the value.  It will display the pairs with highest values and draw lines to show the pairs.  The line colors are scaled by the values.

## To use
1. Install dependencies
```BASH
yarn install
```
2. Build plugin in production mode
```BASH
yarn build
```

## Options
- Number of lines to display:  Data will be sorted by the value and the top N lines will be drawn, as specified here. This number MUST be less than the number of pairs returned by the query
- Left Header: The text to display above the left column and in the tooltip.
- Right Header: The text to display above the right column and in the tooltip.
- Header color: The color of the left and right header
- Color palette: The color palette of the drawn lines
- Invert color palette: This inverts the chosen color spectrum
- Hover color: The color to highlight the line when hovering over it.

