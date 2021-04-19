<template>
  <div class="page">
    <div>
      <h3 class="title">nuxtjs-librariesio-api</h3>
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="searchValue"
            class="input"
            type="text"
            placeholder="Find a library"
          />
        </div>
        <div class="control">
          <a class="button is-info" @click="searchLibraries">Search</a>
        </div>
      </div>
      <library-list />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LibraryList from '~/components/LibraryList.vue';

export default {
  components: { LibraryList },
  data() {
    return {
      searchValue: ''
    };
  },
  methods: {
    ...mapActions('libraries', ['search']),
    async searchLibraries() {
      await this.search(this.searchValue);
    }
  }
};
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
