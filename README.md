# Grafana Slope Graph Panel
## What a Slope Graph?
Slope Graphs are good to use for comparing the change in a single data set between two points in time or the relationship between two data sets.  This plugin is for the latter, showing the relationship between two data sets.

## Query
This plugin takes in data that is grouped by two parameters and sorts the pairs by the value.  It will display the pairs with highest values and draw lines to show the pairs.  The line colors are scaled by the values.
The Query should return two sets of labels for the two y-axis and a number field to sort the pairs by.

## Custom Options
- **Number of lines to display:**  Data will be sorted by the value and the top N lines will be drawn, as specified here. **This number MUST be less than the number of pairs returned by the query**
- **Left Header:** The text to display above the left column and in the tooltip.
- **Right Header:** The text to display above the right column and in the tooltip.
- **Header color:** The color of the left and right header
- **Color palette:** The color palette of the drawn lines
- **Invert color palette:** This inverts the chosen color spectrum
- **Hover color:** The color to highlight the line when hovering over it.

# Grafana Panel Plugin Template
This plugin was built off a template for building React Grafana Panel Plugins.

## License
This plugin is licensed under the [Apache 2.0 License](LICENSE).
