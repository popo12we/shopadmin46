<template>
  <div class="categroy">
     <el-table
    :data="categroyList"
    style="width: 100%;margin-bottom: 20px;"
    default-expand-all>
    <el-table-column
      prop="cat_name"
      label="分类名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="cat_deleted"
      label="是否有效"
      sortable
      width="180">
      <template v-slot="{row}">
        {{row.cat_deleted==false?"是":"否"}}
      </template>
    </el-table-column>
    <el-table-column
      prop="cat_level"
      label="排序">
    </el-table-column>
      <el-table-column
      label="操作">
       <template>
          <el-button type="primary" plain circle icon="el-icon-edit" size="small"></el-button>
          <el-button type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
        </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      categroyList: [],
      pagenum: 1,
      pagesize: 10
    }
  },
  methods: {
    async getCategroyList () {
      let res = await this.axios.get('categories', {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      console.log(res)
      this.categroyList = res.data.data
    }
  },
  created () {
    this.getCategroyList()
  }
}
</script>

<style lang="less" scoped>
</style>
