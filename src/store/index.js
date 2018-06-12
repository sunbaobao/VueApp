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
      //this 指的是store
      //console.log(this);
      return new Promise((resolve, reject) => {
        Vue.axios.get("/bdApi").then(res => {
          context.commit("updateToken", res.data);
         // console.log("res", res.data);
          resolve(res.data);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
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
