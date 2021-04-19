<template>
  <div v-if="searchResults">
    <div
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      class="box"
    >
      <library-list-item :search-result="searchResult" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LibraryListItem from './LibraryListItem.vue';

export default {
  components: { LibraryListItem },
  computed: {
    ...mapState('libraries', ['searchResults'])
  }
};
</script>

<style></style>
