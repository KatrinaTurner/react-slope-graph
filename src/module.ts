import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
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
});
