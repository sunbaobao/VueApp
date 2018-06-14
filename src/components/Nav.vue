<template>
  <el-aside width="auto"  style="background-color: #545c64;" >
    <!--<el-container>-->
      <!--sdsd-->
    <!--</el-container>-->

    <el-scrollbar style="height: 100%">
      <transition name="el-zoom-in-top">
      <div @click="isCollapse=!isCollapse" class="menu-btn">
        <i v-if="!isCollapse" class="el-icon-caret-left"></i>
        <i v-else class="el-icon-caret-right"></i>

      </div>
      </transition>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :router="isRouter"
      :unique-opened="isRouter">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">本地测试</template>
          <el-menu-item index="/router1">router1</el-menu-item>
          <el-menu-item index="/router2">router2</el-menu-item>
          <el-menu-item index="/">main</el-menu-item>
          <el-menu-item index="/store">store</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>百度人脸识别</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/faceDetect">人脸检测与属性分析</el-menu-item>
          <el-menu-item index="/router2">router2</el-menu-item>
          <!--<el-menu-item index="/">main</el-menu-item>-->
          <el-menu-item index="/store">store</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
  export default {
    name: "Nav",
    data(){
      return {
        isCollapse: false,
        isRouter:true,
        navMenuIcon:'el-icon-back',
        openIndex:'1'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /*min-height: 400px;*/
  }
  .menu-btn{
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    background: #5e6375;
    /*padding-right: 20px;*/
    border-right: solid 1px #e6e6e6;
  }
</style>
