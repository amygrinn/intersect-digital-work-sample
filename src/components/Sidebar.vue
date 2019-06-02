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
  z-index: 100;
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
  z-index: 100;
  transition: transform 300ms ease-out;
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
});
</script>