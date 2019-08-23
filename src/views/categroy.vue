<template>
  <div class="categroy">
    <!-- 表格 -->
    <el-table :data="categroyList" style="width: 100%;margin-bottom: 20px;" default-expand-all>
      <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" sortable width="180">
        <template v-slot="{row}">{{row.cat_deleted==false?"是":"否"}}</template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" plain circle icon="el-icon-edit" size="small"></el-button>
          <el-button type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categroyList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  methods: {
    async getCategroyList () {
      let res = await this.axios.get('categories', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      console.log(res.data.data)
      this.categroyList = res.data.data.result
      this.total = res.data.data.total
    },

    // 分页方法
    handleSizeChange (val) {
      this.pagesize = val
      this.getCategroyList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getCategroyList()
    }
  },
  created () {
    this.getCategroyList()
  }
}
</script>

<style lang="less" scoped>
</style>
