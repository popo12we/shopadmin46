<template>
  <div class="index">
    <div class="topnav">
      <h1>电商后台管理系统</h1>
    </div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#abcdef"
          :default-active="activeIndex"
          @select="handleSelect"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/index/user">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>权限列表
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
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = keyPath[1]
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  height: 100%;
}
.el-container {
  height: 100%;
}
/deep/ .el-aside {
  overflow: hidden;
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
