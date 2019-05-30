<template>
  <div v-if="video" class="movie-trailer-container">
    <div class="video-player">
      <iframe
        class="video"
        type="text/html"
        :src="`http://www.youtube.com/embed/${$route.params.id}?enablejsapi=1`"
        frameborder="0">
      </iframe>
    </div>
    <h1>{{video.localized.title}}</h1>
    <p>{{video.localized.description}}</p>
  </div>
  <div v-else>
    <h1>Movie Trailer not Found</h1>
    <p>{{error}}</p>
  </div>
</template>

<style lang="scss" scoped>

  .movie-trailer-container {
    padding: 12px;
  }

  .video-player {
    width: 100%;
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

  @media only screen and (orientation: landscape) {
    .video-player {
      width: 50%;
      margin: auto;
    }
  }

</style>


<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  data: () => ({
    video: undefined,
    error: '',
  }),
  created() {
    this.loadVideo(this.$route.params.id);
  },
  methods: {
    async loadVideo(id: string) {
      this.video = undefined;

      try {
        const { data: { items: [{snippet}]}} =
          await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
              id,
              part: 'snippet',
              key: 'AIzaSyCf7-i07F-yVYR02mKM_LN9HxvIuXbJA_g',
            },
        });

        this.video = snippet;

      } catch (err) {
        this.error = err;
      }
    },
  },
  watch: {
    '$route.params.id'(to, from) {
      this.loadVideo(to);
    },
  },
});
</script>
