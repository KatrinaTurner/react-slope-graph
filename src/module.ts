import {
  FieldConfigProperty,
  PanelPlugin,
} from '@grafana/data';
import { SlopeGraphOptions } from './types';
import { SlopeGraphPanel } from './SlopeGraphPanel';
import { standardOptionsCompat } from 'grafana-plugin-support';

const buildStandardOptions = (): any => {
  const options = [FieldConfigProperty.Unit, FieldConfigProperty.Color];
  return standardOptionsCompat(options);
};

export const plugin = new PanelPlugin<SlopeGraphOptions>(SlopeGraphPanel)
.useFieldConfig({
  useCustomConfig: (builder) => {
    builder
      .addSelect({
        path: 'colorPalette',
        name: 'Color palette',
        // settings: {
        //   options: buildColorPaletteOptions(),
        // },
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
    });
});
