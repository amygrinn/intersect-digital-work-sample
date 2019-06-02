<template>
  <div id="container">
    <title-header ref="title-header" title="Work Sample"></title-header>
    <arrow right @click="navigateRight">{{ nextTrailer.label }}</arrow>
    <arrow left @click="navigateLeft">{{ previousTrailer.label }}</arrow>
    <div id="app-router-view">
      <transition :name="transitionName" mode="out-in">
        <router-view :key="$route.params.id"></router-view>
      </transition>
    </div>
    <sidebar></sidebar>
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
  #app-router-view {
    margin-left: 16px;
    margin-right: 16px;
  }
}

</style>

<script lang="ts">
import Vue from 'vue';

import Arrow from './components/Arrow.vue';
import Sidebar from './components/Sidebar.vue';
import TitleHeader from './components/TitleHeader.vue';

import { Trailer, trailers } from './trailers';

export default Vue.extend({
  components: {
    Arrow,
    Sidebar,
    TitleHeader,
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
      (this.$refs['title-header'] as any).slideLeft();
      this.transitionName = 'slide-left';
      this.$router.push('/movie-trailer/' + this.previousTrailer.id);
    },
    navigateRight() {
      (this.$refs['title-header'] as any).slideRight();
      this.transitionName = 'slide-right';
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
