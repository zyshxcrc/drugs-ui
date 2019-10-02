<template>
  <div class="main-layout">
    <div class="main-left">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="1-1" @click="open('componyList')">公司列表</el-menu-item>
          <el-menu-item index="1-2" @click="open('drugsList')">药品列表</el-menu-item>
          <el-menu-item index="1-3" @click="open('receiverList')">使用人列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="open('inventory')">
          <i class="el-icon-menu"></i>
          <span slot="title">库存列表</span>
        </el-menu-item>
        <el-menu-item index="3" @click="open('warehouse')">
          <i class="el-icon-document"></i>
          <span slot="title">入库列表</span>
        </el-menu-item>
        <el-menu-item index="4" @click="open('outOfStock')">
          <i class="el-icon-setting"></i>
          <span slot="title">出库列表</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-right">
      <div class="main-top"></div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'main-layout',
    data(){
      return {
        isCollapse: false
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      open(item){
        this.$router.push(item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main-layout{
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    .main-left{
      height: 100%;
      width: 201px;
      .el-menu-vertical-demo{
        height: 100%;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        /*width: 200px;*/
        min-height: 400px;
      }
    }
    .main-right{
      height: 100%;
      width: calc(100% - 201px);
      .main-top{
        height: 80px;
      }
      .main{
        height: calc(100% - 80px);
      }
    }
  }
</style>
