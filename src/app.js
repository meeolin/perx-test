import Vue from 'vue';
import Vuetify from 'vuetify';
import '@babel/polyfill';

import store from './vuex/store';
import './scss/index.scss';

import AppLayout from './theme/Layout.vue';

Vue.use(Vuetify);
const app = new Vue({
  store,
  ...AppLayout,
});

export { app };
