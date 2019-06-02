import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import trailers from './trailers';

import axios from 'axios';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: { width: number, height: number, url: string };
  statistics: {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
  };
}

export default new Vuex.Store<{ videos: { [id: string]: Video } }>({
  state: {
    videos: {},
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
  },
  actions: {
    async getVideos({ commit }) {
      const { data: { items }} =
        await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            id: trailers.join(','),
            part: 'snippet,statistics',
            key: 'AIzaSyCf7-i07F-yVYR02mKM_LN9HxvIuXbJA_g',
          },
      });

      const result: { [id: string]: Video} = {};

      items.forEach((video: any) => {
        result[video.id] = {
          id: video.id,
          title: video.snippet.localized.title,
          description: video.snippet.localized.description,
          thumbnail: video.snippet.thumbnails.default,
          statistics: {
            viewCount: video.statistics.viewCount,
            likeCount: video.statistics.likeCount,
            dislikeCount: video.statistics.dislikeCount,
          },
        };
      });

      commit('setVideos', result);
    },
  },
});
