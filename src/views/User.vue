<template>
  <div class="user">
    <div class="topnav">
      <h1>电商后台管理系统</h1>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="1-1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="2-1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>
      </el-submenu>
        <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-menu"></i>选项1
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  height: 100%;
}
.topnav {
  height: 60px;
  background-color: #b3c1cd;
  h1 {
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
}
.menu {
  width: 200px;
  height: 100%;
}
</style>
