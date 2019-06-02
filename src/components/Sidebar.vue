<template>
<div>
  <div @click="sidebarHidden = !sidebarHidden">
    <menu-icon
      :sidebarHidden="sidebarHidden"
    ></menu-icon>
  </div>
  <div
    class="sidebar"
    :class="sidebarHidden ? 'sidebar-hidden' : 'sidebar-shown'">
    <div
      class="video"
      v-for="video in videos"
      :key="video.id"
      @click="gotoVideo(video.id)">
      <img
        :src="video.thumbnail.url"
        :height="video.thumbnail.height"
        :width="video.thumbnail.width">
      <p>{{video.title}}</p>
    </div>
  </div>

  <div
    class="overlay"
    v-if="!sidebarHidden"
    @click="sidebarHidden = true">
  </div>
</div>
</template>

<style lang="scss" scoped>

.menu-icon {
  position: fixed;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  z-index: 2;
  cursor: pointer;
}

.menu-icon line {
  stroke: black;
  stroke-width: 12px;
  stroke-linecap: round;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: white;
  width: 300px;
  z-index: 4;
  transition: transform 300ms ease-out;
  padding-top: 50px;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}

.sidebar img, .sidebar p {
  cursor: pointer;
}

.sidebar-hidden {
  transform: translateX(-300px);
}

.sidebar-shown {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  left: 300px;
  top: 0;
  width: calc(100vw - 300px);
  height: 100vh;
  z-index: 3
}

.video {
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
}

.video p {
  margin-left: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
}

</style>


<script lang="ts">
import Vue from 'vue';

import MenuIcon from './MenuIcon.vue';

export default Vue.extend({
  components: {
    MenuIcon,
  },
  data: () => ({
    sidebarHidden: true,
  }),
  computed: {
    videos() { return this.$store.state.videos; },
  },
  methods: {
    gotoVideo(id: string) {
      this.$router.push(`/movie-trailer/${id}`);
    },
  },
});
</script>