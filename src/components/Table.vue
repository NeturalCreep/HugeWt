
<template>
  <div>
    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <div v-for="(value,key,index) in SelectRow" :key=" index">
        <h5>{{key}}:</h5>
        <el-input placeholder="请输入内容" v-model="SelectRow[key]"></el-input>
      </div>
      <el-button type="primary" @click="UpdateData">保存</el-button>
    </el-drawer>
    <el-table :data="DATA" @row-dblclick="TableClick" stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              v-for="(value,key,index) in DATA[0]"
              :key=" index"
              :prop="key"
              :label="key"
            >
              <div>
                <span>{{ props.row[key] }}</span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-for="(value,key,index) in DATA[0]" :key=" index" :prop="key" :label="key"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      ChangRow: {},
      SelectRow: {},
      DATA: [],
      drawer: false,
      direction: 'rtl'
    }
  },
  created: function () {
    console.log('---------------TableVie 创建前--------------')
    this.$router.events.$emit('setTableView', this)
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.extend(this.SelectRow, this.ChangRow)
          console.log(this.SelectRow)
        })
        .catch(_ => {})
    },
    extend (obj1, obj2) {
      for (var obj in obj2) {
        obj1[obj] = obj2[obj]
      }

      return obj1
    },
    clone (obj) {
      let temp = null
      if (obj instanceof Array) {
        temp = obj.concat()
      } else if (obj instanceof Function) {
        // 函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
        temp = obj
      } else {
        temp = {}
        for (let item in obj) {
          let val = obj[item]
          temp[item] = typeof val === 'object' ? this.clone(val) : val // 这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
        }
      }
      return temp
    },
    TableClick (row, column, event) {
      console.log(row)
      this.SelectRow = row
      this.ChangRow = this.clone(row)
      console.log(this.SelectRow)
      console.log(this.ChangRow)
      this.drawer = true
    },
    // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
    UpdateData () {
      var Command =
        'UPDATE ' +
        this.$router.app._route.params.DATABASE +
        '.' +
        this.$router.app._route.params.TABLENAME +
        ' SET '
      for (var key in this.SelectRow) {
        Command += key + ' = "' + this.SelectRow[key] + '",'
      }
      Command = Command.slice(0, Command.length - 1)
      Command += ' WHERE '
      for (var chehck in this.ChangRow) {
        Command += chehck + ' = "' + this.ChangRow[chehck] + '" and '
      }
      Command = Command.slice(0, Command.length - 4)
      console.log(Command)
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd: Command
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        console.log(datares)
        if (datares.data.result) {
          this.$message({
            message: '更新成功!',
            type: 'success'
          })
          this.drawer = false
        } else {
          this.$message({
            message: '更新失败!',
            type: 'error'
          })
        }
      })
    },
    Update: function (path) {
      console.log('路由路径发生了改变：')
      console.log(path)

      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd:
            'select * from ' +
            path.params.DATABASE +
            '.' +
            path.params.TABLENAME
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        if (datares.data.result) {
          this.DATA = datares.data.DATA
          this.$message({
            message: '查询成功!',
            type: 'success'
          })
        } else {
          this.DATA = []
          console.log(datares)
          this.$message({
            message: '查询失败:' + datares.data.error,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 30%;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
