import Vue from 'vue';

// would normally do this as an environment config value
const apiKey = 'e354bb54683ab4d827ebdf285d87aff3';

const state = () => ({
  searchResults: [],
  currentLibrary: {},
  currentDependencies: []
});

const getters = {};

const mutations = {
  setSearchResults(state, results) {
    Vue.set(state, 'searchResults', results);
  },
  setCurrentLibrary(state, result) {
    Vue.set(state, 'currentLibrary', result);
  },
  setCurrentDependencies(state, results) {
    Vue.set(state, 'currentDependencies', results);
  }
};

const actions = {
  async search({ commit }, value) {
    const results = await this.$axios.$get(
      `/search?q=${value}&api_key=${apiKey}`
    );
    commit('setSearchResults', results);
    return results;
  },
  async getLibrary({ commit }, library) {
    const result = await this.$axios.$get(
      `/${library.platform}/${library.name}?api_key=${apiKey}`
    );
    commit('setCurrentLibrary', result);
    return result;
  },
  async getDependencies({ commit }, library) {
    const results = await this.$axios.$get(
      `/${library.platform}/${library.name}/${library.version}/dependencies?api_key=${apiKey}`
    );
    commit('setCurrentDependencies', results);
    return results;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
