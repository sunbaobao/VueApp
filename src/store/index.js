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
    bdToken: '',
    token: '',
    dialogFormVisible: false,
    Authorization: localStorage.getItem('Authorization') || '',
    user: null
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
    },
    changeLogin(state, arg) {
      // console.log("login");
      state.dialogFormVisible = arg;
    },
    changeAuth(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    updateUser(state, user) {
      state.user = user;
    },
    deleteAuth(state) {
      localStorage.removeItem("Authorization");
      state.Authorization = null;
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
        Vue.axios.post("/server/api/getToken", {tokenName: "bdToken"}).then(res => {
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
