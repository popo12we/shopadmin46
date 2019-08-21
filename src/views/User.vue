<template>
  <div class="user">
    <!-- input框和添加按钮 -->
    <div class="search">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button icon="el-icon-search"></el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <!-- {{scope}} -->
          <el-switch v-model="scope.row.mg_state" active-color="green" inactive-color="red"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // input框数据
      input: '',
      // 表格数据
      tableData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    async getTableData () {
      let res = await this.axios.get('users', {
        params: {
          pagenum: 1,
          pagesize: 2
        }
      })
      let {
        data: {
          data: { users }
        },
        status
      } = res
      if (status === 200) {
        this.tableData = users
      }
      console.log(this.tableData)
    }
  },
  created () {
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.search{
  margin:10px 0
}
.el-input {
  width: 30%;
}
</style>
