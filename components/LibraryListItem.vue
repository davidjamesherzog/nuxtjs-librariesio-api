<template>
  <div>
    <div>
      <nuxt-link
        :to="{
          name: 'platform-name',
          params: {
            platform: searchResult.platform,
            name: searchResult.name
          }
        }"
        >{{ searchResult.name }}</nuxt-link
      >
    </div>
    <div class="text-color">{{ searchResult.description }}</div>
    <div>
      Latest release {{ searchResult.latest_stable_release_number }} - Stars
      {{ searchResult.stars }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchResult: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.text-color {
  color: black;
}
</style>
