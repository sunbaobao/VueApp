import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  // strict: true,
  state: {
    count: 0,
    captcha: "",
    obj: {
      message: "信息"
    },
    bdToken: ''
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
    },
    updateMessage(state, message) {
      state.obj.message = message
    },
    updateToken(state, token) {
      state.bdToken = token
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
    initCaptcha({commit}) {
      this.$http.get('/common/captcha').then(response => {
        // get body data
        commit.initCaptcha({
          src: response
        })
      }, response => {
        // error callback
      });
    },
    getBdToken(context) {
      this.axios.get("/bdApi").then(res => {
        context.commit("updateToken", res.token);

      }).catch(error => {
        console.log(error);
      });
    }
  },
  getters: {
    Token: state => {
      this.axios.post("/bdApiP/", {
        image: ""
      })
    }
  }
});
