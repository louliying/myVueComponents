// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import configRouter from './route-config';
import CXComponents from '../src/main.js';
import App from './App';

Vue.use(VueRouter);
Vue.use(CXComponents);

const router = new VueRouter(configRouter);

const vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
