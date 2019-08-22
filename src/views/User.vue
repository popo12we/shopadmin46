<template>
  <div class="user">
    <!-- input框和添加按钮 -->
    <div class="search">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button icon="el-icon-search" @click="search"></el-button>
      <el-button type="success" plain @click="addDialogVisible = true">添加用户</el-button>
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
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->

          <!-- 修改编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            size="mini"
            @click="edituserDialogShow(scope.row)"
          ></el-button>
          <!--  -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" size="medium " prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="addForm.telphone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户模态框 -->
    <el-dialog title="修改用户" :visible.sync="editUserDialogVisible">
      <el-form :model="editUserForm" :rules="editUserrules" ref="editUserForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" size="medium " prop="username">
          <el-input v-model="editUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUserForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // input框数据
      input: '',
      // 表格数据
      tableData: [],
      // 添加用户对话框
      addDialogVisible: false,
      // 修改用户对话框
      editUserDialogVisible: false,
      // 分页数据
      // 表格总数据条数
      total: 0,
      // 每页显示条数
      pagesize: 2,
      // 分页当前页
      pagenum: 1,

      // 添加用户对话框数据
      addForm: {
        username: '',
        password: '',
        telephone: '',
        email: ''
      },
      // 添加用户对话框效验规则
      rules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },

      editUserForm: {
        // 用户id
        uId: '',
        username: '',
        email: '',
        telephone: ''
      },
      editUserrules: {},
      formLabelWidth: '100px'
    }
  },
  methods: {
    // 拿表格数据的方法
    async getTableData (query) {
      let res = await this.axios.get('users', {
        params: {
          query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      let {
        data: {
          data: { users, total }
        },
        status
      } = res
      if (status === 200) {
        this.tableData = users
        this.total = total
      }
    },
    // 查询搜索的方法
    search () {
      this.getTableData(this.input)
    },
    // 添加用户时展示对话框的方法
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证通过了发送ajax
          let res = await this.axios.post('users', {
            username: this.addForm.username,
            password: this.addForm.password,
            mpbile: this.addForm.telephone,
            email: this.addForm.email
          })
          let { status } = res
          if (status === 200) {
            this.addDialogVisible = false
            this.getTableData()
          }
        }
      })
    },
    // 分页每页展示多少条
    handleSizeChange (val) {
      this.pagesize = val
      this.getTableData()
    },
    // 切换分页页码
    handleCurrentChange (val) {
      this.pagenum = val
      this.getTableData()
    },
    // 展示用户修改框
    async edituserDialogShow (row) {
      this.editUserDialogVisible = true

      let res = await this.axios.get(`users/${row.id}`)
      console.log(res)
      let {
        data: {
          data: { id, username, mobile, email },
          meta: { status }
        }
      } = res
      if (status === 200) {
        // 回显数据
        this.editUserForm.uid = id
        this.editUserForm.username = username
        this.editUserForm.telephone = mobile
        this.editUserForm.email = email
      }
    },

    // 点击确定修改用户
    async submitEditUserForm () {
      // console.log(this.editUserForm.uid)
      let res = await this.axios.put(`users/${this.editUserForm.uid}`, {
        mobile: this.editUserForm.telephone,
        email: this.editUserForm.email

      })
      console.log(res)
      let {
        data: {
          meta: { status }
        }
      } = res
      // this.editUserDialogVisible = false;
      if (status === 200) {
        this.editUserDialogVisible = false
        this.getTableData()
      }
    }
  },
  created () {
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.search {
  margin: 10px 0;
}
.el-input {
  width: 30%;
}
.el-form-item__content .el-input {
  width: 100%;
}
</style>
