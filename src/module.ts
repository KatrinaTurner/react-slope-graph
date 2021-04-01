import { FieldConfigProperty, PanelPlugin } from '@grafana/data';
import { SlopeGraphOptions } from './types';
import { SlopeGraphPanel } from './SlopeGraphPanel';
import { standardOptionsCompat } from 'grafana-plugin-support';

const buildStandardOptions = (): any => {
  const options = [FieldConfigProperty.Unit, FieldConfigProperty.Color];
  return standardOptionsCompat(options);
};

export const plugin = new PanelPlugin<SlopeGraphOptions>(SlopeGraphPanel)
  .useFieldConfig({
    useCustomConfig: builder => {
      builder
        .addSelect({
          path: 'colorPalette',
          name: 'Color palette',
          settings: {
            options: colorPalettes,
          },
          defaultValue: 'interpolateSpectral',
        })
        .addBooleanSwitch({
          path: 'invertPalette',
          name: 'Invert color palette',
          defaultValue: false,
        });
    },
    standardOptions: buildStandardOptions(),
  })
  .setPanelOptions(builder => {
    return builder
      .addNumberInput({
        path: 'numLines',
        name: 'Number of Lines to Display',
        defaultValue: 10,
      })
      .addTextInput({
        path: 'leftHeader',
        name: 'Left Column Header',
        defaultValue: 'Left Title',
      })
      .addTextInput({
        path: 'rightHeader',
        name: 'Right Column Header',
        defaultValue: 'Right Title',
      })
      .addColorPicker({
        path: 'hoverColor',
        name: 'Hover color',
        defaultValue: 'red'
      });
  });

const colorPalettes = [
  // Diverging
  { label: 'Spectral', value: 'interpolateSpectral' },
  { label: 'RdYlGn', value: 'interpolateRdYlGn' },

  // Sequential
  { label: 'Blues', value: 'interpolateBlues' },
  { label: 'Greens', value: 'interpolateGreens' },
  { label: 'Greys', value: 'interpolateGreys' },
  { label: 'Oranges', value: 'interpolateOranges' },
  { label: 'Purples', value: 'interpolatePurples' },
  { label: 'Reds', value: 'interpolateReds' },
  { label: 'BuGn', value: 'interpolateBuGn' },
  { label: 'BuPu', value: 'interpolateBuPu' },
  { label: 'GnBu', value: 'interpolateGnBu' },
  { label: 'OrRd', value: 'interpolateOrRd' },
  { label: 'PuBuGn', value: 'interpolatePuBuGn' },
  { label: 'PuBu', value: 'interpolatePuBu' },
  { label: 'PuRd', value: 'interpolatePuRd' },
  { label: 'RdPu', value: 'interpolateRdPu' },
  { label: 'YlGnBu', value: 'interpolateYlGnBu' },
  { label: 'YlGn', value: 'interpolateYlGn' },
  { label: 'YlOrBr', value: 'interpolateYlOrBr' },
  { label: 'YlOrRd', value: 'interpolateYlOrRd' },
];
