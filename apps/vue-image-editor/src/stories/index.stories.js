import TuiImageEditor  from '../index.js';

export default {
  title: 'ImageEditor',
};

const options = {
  includeUI: {
    loadImage: {
      path: 'img/sampleImage2.png',
      name: 'sampleImage2',
    },
    initMenu: 'filter',
    uiSize: {
      width: '1000px',
      height: '700px',
    },
  },
  cssMaxWidth: 700,
  cssMaxHeight: 500,
};

export const IncludeUI = () => {
  return {
    components: {
      TuiImageEditor,
    },
    template: '<TuiImageEditor :includeUi="props.includeUI" :options="{...props}">test</TuiImageEditor>',
    created() {
      this.props = { ...options };
    },
  };
};
