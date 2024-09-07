import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import { setup } from '@storybook/vue3';
import ImageEditor from 'tui-image-editor';
 
setup((app) => {
  app.component('image-editor', ImageEditor);
});
