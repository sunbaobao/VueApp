<template>
  <div id="app">
    <el-container >

      <el-header style="text-align: right; font-size: 12px">
        <h1>ELEMENT-UI</h1>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container>
        <Nav></Nav>
        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  name: 'App',
  components: {Nav}
}
</script>

<style>
  h1{
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
}
body,h1{
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: rgb(84, 92, 100);
  color: #ffffff;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-dropdown{
  color: #ffffff;
}
</style>
