import Vue from 'vue';
import Router from 'vue-router';
import MovieTrailer from './views/MovieTrailer.vue';
import { trailers } from './trailers';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/movie-trailer/${trailers[0].id}`,
    },
    {
      path: '/movie-trailer/:id',
      name: 'movie-trailer',
      component: MovieTrailer,
    },
  ],
});
