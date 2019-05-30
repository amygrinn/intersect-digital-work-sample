import Vue from 'vue';
import Router from 'vue-router';
import MovieTrailer from './views/MovieTrailer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/movie-trailer/rocketman',
    },
    {
      path: '/movie-trailer/:name',
      name: 'movie-trailer',
      component: MovieTrailer,
    },
  ],
});
