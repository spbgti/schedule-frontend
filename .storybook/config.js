import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

const vuetifyOptions = { }

const vuetifyConfig = new Vuetify({
	theme: {
		dark: false
	}
})

Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(vuetifyOptions)
})

addDecorator(() => ({
  vuetify: vuetifyConfig,
  // all of vuetify components requires v-app root tag
  template: '<v-app><story/></v-app>',
}));

configure(require.context('../stories', true, /\.stories\.js$/), module);
