<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column type="expand">
      <template v-slot:default="{ row }">
        <el-row v-for="l1 in row.children" :key="l1.id">
          <el-col :span="4">
            <el-tag closable type="success">{{l1.authName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-row v-for="l2 in l1.children"  :key="l2.id">
              <el-col :span="4">
                <el-tag closable>{{l2.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-tag closable type="info" v-for="l3 in l2.children"  :key="l3.id">{{l3.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="角色名称" prop="roleName"></el-table-column>
    <el-table-column label="描述" prop="roleDesc"></el-table-column>
    <el-table-column label="操作" prop="desc"></el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-tag {
  margin:0 7px 7px 0;
}
</style>

<script>
export default {
  data () {
    return {
      // 所有角色的数据
      tableData: []
    }
  },

  methods: {
    // 获取所有角色的数据
    async getRolesData () {
      let res = await this.axios.get('roles')
      let {
        data: {
          data,
          meta: { status }
        }
      } = res
      if (status === 200) {
        this.tableData = data
        console.log(this.tableData)
      }
    }
  },

  created () {
    this.getRolesData()
  }
}
</script>
