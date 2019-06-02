<template>
<div>
  <svg class="header" viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect class="header-background" x="0" y="0"/>
    <path d="M0,0 q50,0 100,0 Z">
      <animate
        attributeName="d"
        to="M0,0 Q50,200 100,0 Z"
        fill="freeze"
        dur="200ms"/>
      <animate
        ref="slide-right"
        attributeName="d"
        begin="js"
        dur="600ms"
        calcMode="spline"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        values="
          M0,0 Q50,200 100,0 Z;
          M0,0 Q0,200 100,0 Z;
          M0,0 Q50,200 100,0 Z
        "/>
      <animate
        ref="slide-left"
        attributeName="d"
        begin="js"
        dur="600ms"
        calcMode="spline"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        values="
          M0,0 Q50,200 100,0 Z;
          M0,0 Q100,200 100,0 Z;
          M0,0 Q50,200 100,0 Z
        "/>
    </path>
  </svg>
  <h1>{{title}}</h1>
</div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  pointer-events: none;
}

.header-background {
  fill: $primary;
  stroke: none;
  width: 100px;
  height: 40px;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 5vh;
  color: $primary;
  position: fixed;
  height: 60px;
  margin: 0;
  top: 0;
  width: 100vw;
  text-align: center;
  animation: _drop-in .5s;
}

path {
  fill: $accent-light;
}

@media #{$phablet} {
  h1 {
    font-size: 24px;
    top: 10px;
  }
  .header-background {
    height: 70px;
  }
}

@keyframes _drop-in {
  0% {
    transform: translate(-50%, -25vh);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>


<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['title'],
  methods: {
    slideRight() {
      (this.$refs['slide-right'] as any).beginElement();
    },
    slideLeft() {
      (this.$refs['slide-left'] as any).beginElement();
    },
  },
});
</script>
