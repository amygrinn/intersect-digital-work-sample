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
    <h1>{{video.snippet.localized.title}}</h1>
    <div class="statistics">
      <h4>{{video.statistics.viewCount}} views</h4>
      <h4>Likes: {{video.statistics.likeCount}}</h4>
      <h4>Dislikes: {{video.statistics.dislikeCount}}</h4>
    </div>
    <p>{{video.snippet.localized.description}}</p>
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
  }

  .statistics h4 {
    margin: 8px;
    border-radius: 8px;
    padding: 8px;
    background-color: $secondary;
    font-family: 'Montserrat', sans-serif;
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
        const { data: { items: [video]}} =
          await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
              id,
              part: 'snippet,statistics',
              key: 'AIzaSyCf7-i07F-yVYR02mKM_LN9HxvIuXbJA_g',
            },
        });

        this.video = video;

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
