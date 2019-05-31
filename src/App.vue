<template>
  <div id="container">
    <arrow right @click="navigateRight">{{ nextTrailer.label }}</arrow>
    <arrow left @click="navigateLeft">{{ previousTrailer.label }}</arrow>
    <div>
      <svg class="header" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect class="header-background" x="0" y="0"/>
        <path d="M0,0 q50,0 100,0 Z">
          <animate
            attributeName="d"
            to="M0,0 Q50,80 100,0 Z"
            fill="freeze"
            dur="200ms"/>
          <animate
            ref="slide-right-header-animation"
            attributeName="d"
            begin="js"
            dur="600ms"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            values="
              M0,0 Q50,80 100,0 Z;
              M0,0 Q0,80 100,0 Z;
              M0,0 Q50,80 100,0 Z
            "/>
          <animate
            ref="slide-left-header-animation"
            attributeName="d"
            begin="js"
            dur="600ms"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            values="
              M0,0 Q50,80 100,0 Z;
              M0,0 Q100,80 100,0 Z;
              M0,0 Q50,80 100,0 Z
            "/>
        </path>
      </svg>
      <h1 class="header header-txt drop-in" @click="gotoHome">Work Sample</h1>
    </div>
    <div id="app-router-view">
      <transition :name="transitionName" mode="out-in">
        <router-view :key="$route.params.id"></router-view>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  margin: 0;
  background-color: $primary;
}

#container {
  width: 100%;
  height: 100%;
}

.header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 25vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 5vh;
  z-index: 90;
  pointer-events: none;
}

.header-background {
  fill: $primary;
  stroke: none;
  width: 100px;
  height: 40px;
}

.header-txt {
  height: 60px;
  margin-bottom: 0;
  cursor: pointer;
  pointer-events: auto;
  margin-top: 10px;
  color: $primary;
}

path {
  fill: $accent-light;
}

.drop-in {
  animation: _drop-in .5s;
}

.slide-left-enter-active, .slide-right-enter-active {
  transition: all 0.2s ease-in;
}

.slide-left-leave-active, .slide-right-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter, .slide-left-leave-to,
.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
}

.slide-left-enter, .slide-right-leave-to {
  transform: translateX(-25%);
}

.slide-left-leave-to, .slide-right-enter {
  transform: translateX(25%);
}

#app-router-view {
  margin: 140px;
}

@media #{$phablet} {
  .header-txt {
    font-size: 24px;
  }

  #app-router-view {
    margin-left: 16px;
    margin-right: 16px;
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

import Arrow from './components/Arrow.vue';

import { Trailer, trailers } from './trailers';

export default Vue.extend({
  components: {
    Arrow,
  },
  data: () => ({
    trailerIndex: 0,
    trailers,
    transitionName: '',
  }),
  computed: {
    nextTrailer(): Trailer {
      return this.trailers[(this.trailerIndex + 1) % this.trailers.length];
    },
    previousTrailer(): Trailer {
      return this.trailers[(this.trailers.length + this.trailerIndex - 1) % this.trailers.length];
    },
  },
  created() {
    if (this.$route.params.id) {
      this.setTrailerIndex(this.$route.params.id);
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/');
    },
    navigateLeft() {
      this.transitionName = 'slide-left';
      const anim = this.$refs['slide-left-header-animation'] as any;
      if (anim) {
        anim.beginElement();
      }
      this.$router.push('/movie-trailer/' + this.previousTrailer.id);
    },
    navigateRight() {
      this.transitionName = 'slide-right';
      const anim = this.$refs['slide-right-header-animation'] as any;
      if (anim) {
        anim.beginElement();
      }
      this.$router.push('/movie-trailer/' + this.nextTrailer.id);
    },
    setTrailerIndex(id: string) {
      const trailerIndex = this.trailers.findIndex((trailer) => trailer.id === id);
      if (trailerIndex >= 0) {
        this.trailerIndex = trailerIndex;
      }
    },
  },
  watch: {
    '$route.params.id'(id) {
      this.setTrailerIndex(id);
    },
  },
});

</script>
