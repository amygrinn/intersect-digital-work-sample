<template>
<div class="menu-icon-container" :class="sidebarHidden ? '' : 'slide-right'">
  <svg
    viewBox="0 0 100 100">
    <line x1="10" x2="90" y1="20" y2="20">
      <animate
        class="show-sidebar"
        attributeName="x1"
        from="10"
        to="30"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="show-sidebar"
        attributeName="x2"
        from="90"
        to="60"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="show-sidebar"
        attributeName="y1"
        from="20"
        to="50"
        dur="300ms"
        begin="js"
        fill="freeze"/>

      <animate
        class="hide-sidebar"
        attributeName="x1"
        from="30"
        to="10"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="hide-sidebar"
        attributeName="x2"
        from="60"
        to="90"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="hide-sidebar"
        attributeName="y1"
        from="50"
        to="20"
        dur="300ms"
        begin="js"
        fill="freeze"/>
    </line>

    <line x1="10" x2="90" y1="50" y2="50">
      <animate
        class="show-sidebar"
        attributeName="x1"
        from="10"
        to="30"
        dur="300ms"
        begin="js"
        fill="freeze"/>

      <animate
        class="hide-sidebar"
        attributeName="x1"
        from="30"
        to="10"
        dur="300ms"
        begin="js"
        fill="freeze"/>
    </line>

    <line x1="10" x2="90" y1="80" y2="80">
      <animate
        class="show-sidebar"
        attributeName="x1"
        from="10"
        to="30"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="show-sidebar"
        attributeName="x2"
        from="90"
        to="60"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="show-sidebar"
        attributeName="y1"
        from="80"
        to="50"
        dur="300ms"
        begin="js"
        fill="freeze"/>
        
      <animate
        class="hide-sidebar"
        attributeName="x1"
        from="30"
        to="10"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="hide-sidebar"
        attributeName="x2"
        from="60"
        to="90"
        dur="300ms"
        begin="js"
        fill="freeze"/>
      <animate
        class="hide-sidebar"
        attributeName="y1"
        from="50"
        to="80"
        dur="300ms"
        begin="js"
        fill="freeze"/>
    </line>
  </svg>
</div>
</template>

<style lang="scss" scoped>

.menu-icon-container {
  position: fixed;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  z-index: 101;
  cursor: pointer;
  transition: left 300ms ease-in-out;
}

.slide-right {
  left: 256px;
}

line {
  stroke: black;
  stroke-width: 8px;
  stroke-linecap: round;
}
</style>


<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['sidebarHidden'],
  methods: {
    animate(className: string) {
      if (this.$el) {
        Array.from(this.$el.getElementsByClassName(className))
          .forEach((el: any) => el.beginElement());
      }
    },
  },
  mounted() {
    if (this.sidebarHidden) {
      this.animate('hide-sidebar');
    } else {
      this.animate('show-sidebar');
    }
  },
  watch: {
    sidebarHidden(sidebarHidden) {
      if (sidebarHidden) {
        this.animate('hide-sidebar');
      } else {
        this.animate('show-sidebar');
      }
    },
  },
});
</script>
