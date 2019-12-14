<template>
  <div class="Users">
    <el-dialog title="添加用户" class="AddUserDialog" :visible.sync="dialogVisible">
      <div class="SmartFlex">
        <h4>用户名:</h4>
        <el-input placeholder="请输入内容" v-model="USERNAME" clearable></el-input>
      </div>
      <div class="SmartFlex">
        <h4>密码:</h4>
        <el-input placeholder="请输入密码" v-model="PASSWORD" show-password></el-input>
      </div>
      <el-button type="success" @click="AddUser">添加用户</el-button>
    </el-dialog>
    <el-button type="success" @click="dialogVisible = true" class="addUser">添加用户</el-button>

    <template>
      <el-table :data="Users" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item class="info" label="用户是否可以重命名和修改表结构">
                <span>{{ props.row.Alter_priv |YN}}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以修改或删除存储函数及函数">
                <span>{{props.row.Alter_routine_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以创建新的数据库和表">
                <span>{{props.row.Create_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以创建临时表">
                <span>{{props.row.Create_tmp_table_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以创建视图">
                <span>{{props.row.Create_view_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以创建表空间">
                <span>{{props.row.Create_tablespace_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以执行CREATE">
                <span>{{props.row.Create_user_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以通过DELETE命令删除现有数据">
                <span>{{props.row.Delete_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以删除现有数据库和表">
                <span>{{props.row.Drop_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户能否创建、修改和删除事件">
                <span>{{props.row.Event_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以执行存储过程">
                <span>{{props.row.Execute_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以执行SELECT INTO OUTFILE和LOAD DATA">
                <span>{{props.row.File_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以将已经授予给该用户自己的权限再授予其他用户">
                <span>{{props.row.Grant_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以创建和删除表索引">
                <span>{{props.row.Index_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以通过INSERT命令插入数据">
                <span>{{props.row.Insert_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以锁定表格">
                <span>{{props.row.Lock_tables_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以执行刷新和重新加载MySQL所用各种内部缓存的特定命令">
                <span>{{props.row.Reload_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否显示连接进程和中断连接进程">
                <span>{{props.row.References_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以检查Masters和Slaves">
                <span>{{props.row.Repl_client_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否拥有Slave里的特殊权限">
                <span>{{props.row.Repl_slave_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以通过SELECT命令选择数据">
                <span>{{props.row.Select_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以查看服务器上所有数据库的名字，包括用户拥有足够访问权限的数据库">
                <span>{{props.row.Show_db_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以列出视图">
                <span>{{props.row.Show_view_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否显示连接进程和中断连接进程">
                <span>{{props.row.Shutdown_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以执行某些强大的管理功能">
                <span>{{props.row.Super_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户能否创建和删除触发器">
                <span>{{props.row.Trigger_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户是否可以通过UPDATE命令修改现有数据">
                <span>{{props.row.Update_priv|YN }}</span>
              </el-form-item>
              <el-form-item class="info" label="用户密码是否过期">
                <span>{{props.row.password_expired|YN }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="User" label="用户名" width="180"></el-table-column>
        <el-table-column prop="Host" label="服务器" width="180"></el-table-column>

        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.account_locked"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="N"
              @change="EnableUser(scope)"
              inactive-value="Y"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="Edit" @click="Change(scope)">编辑</el-button>
            <template>
              <el-popconfirm ref="Del" @onConfirm="Delete(scope.row)" title="这是一段内容确定删除吗？">
                <el-button slot="reference" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      visible: false,
      Users: [],
      USERNAME: '',
      PASSWORD: '',
      dialogVisible: false,
      SelectRow: undefined,
      GetDATA: false,
      defaultProps: {
        label: 'Name'
      },
      UserData: [],
      User: {
        Alter_priv: '用户是否可以重命名和修改表结构',
        Alter_routine_priv: '用户是否可以修改或删除存储函数及函数',
        Create_priv: '用户是否可以创建新的数据库和表',
        Create_tmp_table_priv: '用户是否可以创建临时表',
        Create_view_priv: '用户是否可以创建视图',
        Create_tablespace_priv: '用户是否可以创建表空间',
        Create_user_priv: '用户是否可以执行CREATE',
        Create_routine_priv: '用户是否可以更改或放弃存储过程和函数',
        Delete_priv: '用户是否可以通过DELETE命令删除现有数据',
        Drop_priv: '用户是否可以删除现有数据库和表',
        Event_priv: '用户能否创建、修改和删除事件',
        Execute_priv: '用户是否可以执行存储过程',
        File_priv: '用户是否可以执行SELECT INTO OUTFILE和LOAD DATA',
        Grant_priv: '用户是否可以将已经授予给该用户自己的权限再授予其他用户',
        Index_priv: '用户是否可以创建和删除表索引',
        Insert_priv: '用户是否可以通过INSERT命令插入数据',
        Lock_tables_priv: '用户是否可以锁定表格',
        Reload_priv:
          '用户是否可以执行刷新和重新加载MySQL所用各种内部缓存的特定命令',
        References_priv: '用户是否显示连接进程和中断连接进程',
        Repl_client_priv: '用户是否可以检查Masters和Slaves',
        Repl_slave_priv: '用户是否拥有Slave里的特殊权限',
        Select_priv: '用户是否可以通过SELECT命令选择数据',
        Show_db_priv:
          '用户是否可以查看服务器上所有数据库的名字，包括用户拥有足够访问权限的数据库',
        Show_view_priv: '用户是否可以列出视图',
        Shutdown_priv: '用户是否可以关闭MySQL服务器',
        Super_priv: '用户是否可以执行某些强大的管理功能',
        Trigger_priv: '用户能否创建和删除触发器',
        Update_priv: '用户是否可以通过UPDATE命令修改现有数据',
        password_expired: '用户密码是否过期',
        Process_priv: '用户是否可以通过SHOWPROCESSLIST命令查看其他用户的进程'
      },
      CheckList: []
    }
  },
  updated: function () {
    if (!this.GetDATA) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd: 'select * from mysql.user'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        this.Users = datares.data.DATA
        this.GetDATA = true
      })
    }
  },
  mounted: function () {},
  filters: {
    YN: function (value) {
      return value === 'Y' ? '√' : '×'
    }
  },
  methods: {
    AddUser () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd:
            'create user ' +
            this.USERNAME +
            '@"localhost" identified by "' +
            this.PASSWORD +
            '";'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        if (datares.data.result) {
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
          this.dialogVisible = false
          this.GetDATA = false
          this.$forceUpdate()
        }
      })
    },
    Delete (data) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd: 'drop user ' + data.User + '@"' + data.Host + '";'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        if (datares.data.result) {
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
          for (let index = 0; index < this.Users.length; index++) {
            let element = this.Users[index]
            if (element.User === data.User) {
              this.Users.splice(index, 1)
            }
          }
        }
      })
    },
    EnableUser (scope, event) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd:
            'UPDATE mysql.User SET account_locked ="' +
            scope.row.account_locked +
            '" WHERE User ="' +
            scope.row.User +
            '"'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        if (datares.data.result) {
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
        }
      })
    },
    Change (scope) {
      console.log(scope)
      this.UserData = scope.row
      this.dialogVisible = true
      this.CheckList = []
      var arr = []
      var num = 0
      for (let i in scope.row) {
        let o = {}
        if (this.User[i] === undefined) {
          continue
        }
        o['Name'] = this.User[i]
        o['Index'] = num
        o['Origin'] = i
        o['YN'] = scope.row[i]
        if (scope.row[i] === 'Y') {
          this.CheckList.push(num)
        }
        arr.push(o)
        num++
      }
      this.SelectRow = arr
      console.log(this.SelectRow)
    },
    UpdateUser () {
      var Command = 'UPDATE mysql.User SET '
      let Checked = this.$refs.tree.getCheckedNodes()
      for (var key = 0; key < this.SelectRow.length; key++) {
        if (Checked.indexOf(this.SelectRow[key]) !== -1) {
          Command += this.SelectRow[key].Origin + ' = "Y",'
          this.UserData[this.SelectRow[key].Origin] = 'Y'
        } else {
          Command += this.SelectRow[key].Origin + ' = "N",'
          this.UserData[this.SelectRow[key].Origin] = 'N'
        }
      }
      Command = Command.slice(0, Command.length - 1)
      Command += " Where User ='" + this.UserData.User + "'"
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd: Command
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        this.dialogVisible = false
        if (datares.data.result) {
          for (var key = 0; key < this.SelectRow.length; key++) {
            if (Checked.indexOf(this.SelectRow[key]) !== -1) {
              this.UserData[this.SelectRow[key].Origin] = 'Y'
            } else {
              this.UserData[this.SelectRow[key].Origin] = 'N'
            }
          }
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='less'>
.Users {
  .info {
    label {
      width: 70%;
      font-weight: bold;
    }
    span {
      font-weight: bold;
    }
  }
  .Edit {
    margin-left: 25px;
  }
  .addUser {
    float: left;
    margin-left: 20px;
    margin-top: 10px;
  }
  .AddUserDialog {
    ::after {
      clear: both;
      content: '';
      display: block;
    }
    button {
      margin-top: 15px;
    }
    .SmartFlex {
      h4 {
        text-align: left;
      }
    }
  }
}
</style>
