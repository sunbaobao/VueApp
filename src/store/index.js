import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: 0,
    captcha: ""
  },
  mutations: {
    increment(state) {
      state.count++
    },
    reduce(state) {
      state.count -= 1;
    },
    initCaptcha(state, p) {
      state.captcha = p.src;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
    initCaptcha({commit}){
      this.$http.get('/common/captcha').then(response => {
        // get body data
        commit.initCaptcha({
          src:response
        })
      }, response => {
        // error callback
      });
    }
  },
});
