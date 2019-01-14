import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    userEdit: null,
    isEditOpened: false,
    isConfirmOpened: false,
  },
  actions,
  getters,
  mutations,
});
