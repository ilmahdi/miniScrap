import { createStore } from 'vuex';
import { fetchData } from '@/services/api';

export default createStore({
  state: {
    fetchedData: null,
  },
  mutations: {
    setFetchedData(state, data) {
      state.fetchedData = data;
    },
  },
  actions: {
    async fetchDataFromBackend({ commit }) {
        const data = await fetchData('data');

        commit('setFetchedData', data);

    },
  },
  getters: {
    getFetchedData: (state) => state.fetchedData,
  },
});