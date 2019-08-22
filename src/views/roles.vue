<template>
  <div class="roles">
    <!-- 添加角色按钮 -->
    <el-button type="success" plain @click="showeditDialogVisible">添加角色</el-button>

    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column type="expand">
        <template v-slot:default="{ row }">
          <el-row v-for="l1 in row.children" :key="l1.id">
            <el-col :span="4">
              <el-tag closable type="success">{{l1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="l2 in l1.children" :key="l2.id">
                <el-col :span="4">
                  <el-tag closable>{{l2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="info"
                    v-for="l3 in l2.children"
                    :key="l3.id"
                  >{{l3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">

          <el-button
            round
            icon="el-icon-edit"
            size="mini"
            type="success"
            plain
            @click="showTreeDialog"
          >分配角色</el-button>

      </el-table-column>
    </el-table>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="editDialogVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" size="medium " prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="addForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 树形结构 -->
    <el-dialog title="分配权限" :visible.sync="treeDialogVisible">
      <el-tree
        :data="rightList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
    </el-dialog>
  </div>
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
  margin: 0 7px 7px 0;
}
</style>

<script>
export default {
  data () {
    return {
      // 所有角色的数据
      tableData: [],
      // 添加角色显示
      editDialogVisible: false,
      // 添加角色对话框数据
      addForm: {
        username: '',
        desc: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入正确的描述', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      // 树形图对话框是否显示
      treeDialogVisible: false,
      // 权限数据
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
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
    },

    // 点击按钮显示添加角色对话框
    showeditDialogVisible () {
      this.editDialogVisible = true
    },

    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          let res = await this.axios.post('roles', {
            roleName: this.addForm.username,
            roleDesc: this.addForm.desc
          })
          let {
            data: {
              meta: { status }
            }
          } = res
          console.log(status)
          if (status === 201) {
            this.editDialogVisible = false
            this.getRolesData()
          }
        }
      })
    },

    // 显示出树形图对话框
    async showTreeDialog () {
      this.treeDialogVisible = true
      const { data: { meta, data } } = await this.axios.get('rights/tree')
      if (meta.status === 200) {
        this.rightList = data
        console.log(this.rightList)
      }
    },

    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes () {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
    }
  },

  created () {
    this.getRolesData()
  }
}
</script>
