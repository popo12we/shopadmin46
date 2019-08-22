<template>
  <div class="index">
    <div class="topnav">
      <h1 class="title">电商后台管理系统</h1>
      <div class="logout">
        欢迎你，xxx
        <a @click="open2" href="javascript:;">退出</a>
      </div>
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
            <el-menu-item index="/index/roles">
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
    // 点左侧谁高亮
    handleSelect (key, keyPath) {
      this.activeIndex = keyPath[1]
    },
    // 点击退出出现模态框
    open2 () {
      this.$confirm('确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
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
  position: relative;
  h1 {
    text-align: center;
    line-height: 60px;
    color: #fff;
    width: 50%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .logout {
    float: right;
    margin-top: 25px;
  }
}
.menu {
  width: 200px;
  height: 100%;
}
.el-main{
      padding:25px;
      background-color: #eaeef1;
}
</style>
