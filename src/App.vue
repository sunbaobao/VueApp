<template>
  <div id="app">
    <el-container style="height:100vh">
      <el-header style="text-align: right; font-size: 12px">
        <h1>ELEMENT-UI</h1>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="signOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-if="user">{{user.username}}</span>
      </el-header>
      <el-container>
        <Nav></Nav>
        <el-main style="padding: 0;">
          <el-scrollbar>
            <el-main>
              <router-view />
            </el-main>
          </el-scrollbar>
        </el-main>
      </el-container>
      <login-dialog></login-dialog>
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import loginDialog from "./components/loginDialog";
import store from "./store";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { Nav, loginDialog },
  computed: {
    // user() {
    //   return this.$store.state.user
    // },
    ...mapState({
      user: state => state.user,
      token: state => state.Authorization
    })
  },
  methods: {
    handleCommand(command) {
      if (command === "signOut") {
        this.axios.post("/server/user/sign/out").then(res => {
          localStorage.removeItem("Authorization");
          this.$store.commit("updateUser", null);
          this.$message(res.data.meta.message);
          this.$router.go("/");
        });
      }
    }
  },
  mounted() {
    if (!this.user && this.token) {
      console.log(this.token);
      this.axios
        .get("/server/user/info")
        .then(res => {
          console.log(res.data.data);
          store.commit("updateUser", res.data.data);
        })
        .catch(err => {});
    }
  }
}
</script>

<style>
h1 {
  float: left;
  font-size: 30px;
  color: #ffffff;
  line-height: 60px;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  min-height: 100%;
}

body {
  min-height: 100vh;
}

body,
h1 {
  padding: 0;
  margin: 0;
}

.el-header {
  background-color: #545c64;
  color: #ffffff;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-dropdown {
  color: #ffffff;
}

.el-container {
  height: calc(100% - 60px);
}
</style>
