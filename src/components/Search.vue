<template>
<div>
  <div
    v-if="searching"
    class="overlay"
    @click="searching = !searching">
  </div>
  <div
    class="search-container"
    :class="searching ? 'searching' : ''"
    >
    <div v-if="searching">
      <input
        autofocus
        ref="search-input"
        class="search-input"
        type="text"
        placeholder="Search..."
        v-model="search">
    </div>
    <img @click="searching = !searching" src="@/assets/search.svg">
  </div>
  <div v-if="searching" class="search-results">
    <div
      v-for="video in searchResults"
      :key="video.id"
      @click="gotoVideo(video.id)">
      <h4>{{video.title}}</h4>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.search-container {
  position: fixed;
  display: flex;
  align-items: center;
  top: 12px;
  right: 12px;
  z-index: 3;
}

img {
  width: 32px;
  height: 32px;
}

.search-input {
  border: none;
  z-index: 4;
  margin: 8px;
}

.searching {
  background-color: white;
  border-radius: 8px;
  border: 1px solid black;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  background-color: rgba(0,0,0,.8);
}

.search-results {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 4;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
}

@media #{$phablet} {
  .search-container {
    padding-left: 16px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

import { Video } from '../store';

export default Vue.extend({
  data: () => ({
    searching: false,
    search: '',
  }),
  computed: {
    searchResults() {
      return Object.values(this.$store.state.videos)
        .filter((video: any) => video.title.toUpperCase().indexOf(this.search.toUpperCase()) >= 0);
    },
  },
  methods: {
    gotoVideo(id: string) {
      this.searching = false;
      this.search = '';
      this.$router.push(`/movie-trailer/${id}`);
    },
  },
});
</script>