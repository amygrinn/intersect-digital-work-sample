<template>
  <div v-if="video" class="movie-trailer-container">
    <div class="video-player">
      <iframe
        class="video"
        type="text/html"
        :src="`https://www.youtube.com/embed/${$route.params.id}?enablejsapi=1`"
        frameborder="0">
      </iframe>
    </div>
    <h1>{{video.title}}</h1>
    <div class="statistics">
      <div class="statistic">
        <h4>{{video.statistics.viewCount | numeric}} views</h4>
      </div>
      <div class="statistic">
        <img :src="require('@/assets/thumbs-up.svg')">
        <h4>{{video.statistics.likeCount | numeric}}</h4>
      </div>
      <div class="statistic">
        <img :src="require('@/assets/thumbs-down.svg')">
        <h4>{{video.statistics.dislikeCount | numeric}}</h4>
      </div>
    </div>
    <p>{{video.description}}</p>
  </div>
</template>

<style lang="scss" scoped>

  .movie-trailer-container {
    width: 50%;
    margin: auto;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Montserrat', sans-serif;
  }

  .video-player {
    position: relative;
  }

  .video-player::before {
    content: "";
  	display: block;
    padding-top: 56.25%;
  }

  .video-player iframe {
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .statistics {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  
  .statistic {
    display: flex;
    border-radius: 8px;
    padding: 8px;
    background-color: $accent;
    margin: 8px;
  }

  .statistic img {
    padding-right: 8px;
  }

  .statistic h4 {
    margin: 2px;
    font-family: 'Montserrat', sans-serif;
    color: white;
  }

  @media #{$phablet} {
    .movie-trailer-container {
      width: 100%;
    }
  }

</style>


<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  filters: {
    numeric(n: number): string {
      return (+n).toLocaleString();
    },
  },
  computed: {
    video() {
      return this.$store.state.videos[this.$route.params.id];
    },
  },
});
</script>
