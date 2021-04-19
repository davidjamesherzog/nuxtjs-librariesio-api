<template>
  <div class="page">
    <!-- Should break this into components but for the sake of time will leave here -->
    <div v-if="currentLibrary">
      <h2 class="is-size-2 bold">
        {{ currentLibrary.name }}
      </h2>
      <div>Release {{ currentLibrary.latest_release_number }}</div>
      <div>Release {{ currentLibrary.description }}</div>

      <h5 class="is-size-5 bold">Keywords</h5>
      <div>{{ currentLibrary.licenses }}</div>

      <h5 class="is-size-5 bold">License</h5>
      <div>{{ currentLibrary.keywords }}</div>

      <h5 class="is-size-5 bold">Dependencies</h5>
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Name">Name</abbr></th>
            <th><abbr title="Version">Version</abbr></th>
          </tr>
        </thead>
        <tbody v-if="currentDependencies">
          <tr
            v-for="dependency in currentDependencies.dependencies"
            :key="dependency.latest"
          >
            <td>
              <nuxt-link
                :to="{
                  name: 'platform-name',
                  params: {
                    platform: dependency.platform,
                    name: dependency.name
                  }
                }"
                >{{ dependency.name }}</nuxt-link
              >
            </td>
            <td>{{ dependency.latest }}</td>
          </tr>
        </tbody>
      </table>

      <h5 class="is-size-5 bold">Releases</h5>
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Version">Version</abbr></th>
            <th><abbr title="Date">Date</abbr></th>
          </tr>
        </thead>
        <tbody v-if="versions">
          <tr v-for="version in versions" :key="version.number">
            <td>{{ version.number }}</td>
            <td>{{ version.published_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  async fetch() {
    const library = await this.getLibrary({
      platform: this.$route.params.platform,
      name: this.$route.params.name
    });
    await this.getDependencies({
      platform: library.platform,
      name: library.name,
      version: library.latest_release_number
    });
  },
  computed: {
    ...mapState('libraries', ['currentLibrary', 'currentDependencies']),
    versions() {
      if (!this.currentLibrary.versions) {
        return [];
      }
      const tempVersions = [...this.currentLibrary.versions];
      return tempVersions.reverse();
    }
  },
  methods: {
    ...mapActions('libraries', ['getLibrary', 'getDependencies'])
  }
};
</script>

<style>
.bold {
  font-weight: bold;
}
</style>
