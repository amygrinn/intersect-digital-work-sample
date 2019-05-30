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

import { google, youtube_v3 } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCf7-i07F-yVYR02mKM_LN9HxvIuXbJA_g',
});

declare module 'vue/types/vue' {
  interface Vue {
    video?: youtube_v3.Schema$VideoSnippet;
  }
}

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
        const result = await youtube.videos.list({ id, part: 'snippet' });

        if (
          result
          && result.data
          && result.data.items
          && result.data.items[0]
          && result.data.items[0].snippet
        ) {
          this.video = result.data.items[0].snippet as any;
        }
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
