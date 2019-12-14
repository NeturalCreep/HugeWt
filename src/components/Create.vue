<template>
  <div class="Create">
    <el-steps :active="parseInt(active)" align-center>
      <el-step title="步骤1" description="设置新数据表所属数据库"></el-step>
      <el-step title="步骤2" description="设置新数据表的表名"></el-step>
      <el-step title="步骤3" description="创建数据表的格式"></el-step>
      <el-step title="步骤4" description="完成创建数据表"></el-step>
    </el-steps>
    <template>
      <el-tabs v-model="active" tab-position="left" style="height: 200px;">
        <el-tab-pane name="1" label="设置新数据表所属数据库">
          <div class="flex">
            <h3>请选择数据库：</h3>
            <el-select v-model="BaseValue" placeholder="请选择">
              <el-option
                v-for=" (item,index) in $store.state.AllDataBase"
                :key="index"
                :label="item.Database"
                :value="index"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="active='2'">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane class="pad-20" name="2" label="设置新数据表的表名">
          <label>请输入表名：</label>
          <el-input placeholder="请输入名称。。。" class="halfinput" v-model="TableName" clearable></el-input>
          <el-button type="primary" @click="active='3'">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane name="3" label="创建表的格式" class="pad-20">
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="主键" prop="mKey">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.mKey" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="列名" prop="Name"></el-table-column>
              <el-table-column label="类型" prop="Type"></el-table-column>
              <el-table-column align="right">
                <template slot="header">
                  <el-button type="success" @click="dialogFormVisible = true">添加新列</el-button>
                  <el-button type="success" @click="active ='4'">下一步</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="EditCol(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="DelCol(scope.$index, scope.row)"
                  >Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane name="4" label="完成表的创建">
          <span>
            CREATE TABLE `{{TableName}}`
            (
          </span>
          <span v-for="(item,index) in tableData" :key="index">`{{item.Name}}`&nbsp;{{item.Type}}</span>
          <span>)</span>
          <el-button size="mini" @click="Commit()">提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </template>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <label>列名</label>
        <el-input placeholder="请输入内容" type="text" class="halfinput" v-model="ColName" clearable></el-input>
        <label>数据类型</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for=" (item,index) in DataType" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-checkbox
          v-model="MainKey"
          :disabled="MainKey?false:HasMainKey"
          style="margin:10px;display:block"
        >是否主键</el-checkbox>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewCol">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      BaseValue: 0,
      value: 0,
      TableName: '',
      active: '1',
      ColName: '',
      HasMainKey: false,
      MainKey: false,
      dialogFormVisible: false,
      tableData: [],
      HandleType: 0,
      DataType: [
        'TINYINT',
        'SMALLINT',
        'MEDIUMINT',
        'INTEGER',
        'BIGINT',
        'FLOAT',
        'DOUBLE',
        'DECIMAL',
        'DATE',
        'TIME',
        'YEAR',
        'DATETIME',
        'TIMESTAMP',
        'CHAR',
        'VARCHAR',
        'TINYBLOB',
        'TINYTEXT',
        'BLOB',
        'TEXT',
        'MEDIUMBLOB',
        'MEDIUMTEXT',
        'LONGBLOB',
        'LONGTEXT'
      ],
      EditeIndex: 0
    }
  },
  mounted: function () {},
  methods: {
    Commit () {
      let Command = 'CREATE TABLE `' + this.TableName + '` ('
      for (let index = 0; index < this.tableData.length; index++) {
        let element = this.tableData[index]
        Command += '`' + element.Name + '` ' + element.Type
        if (element.mKey) {
          Command += ' PRIMARY KEY'
        }
        Command += ','
      }
      console.log(this.$store.state)
      Command = Command.slice(0, Command.length - 1)
      Command += ')'
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8081/Query',
        data: {
          token: localStorage.getItem('token'),
          cmd:
            'use ' +
            this.$store.state.AllDataBase[this.BaseValue].Database +
            ';' +
            Command
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(datares => {
        this.$message({
          message: '创建成功!',
          type: 'success'
        })
      })
    },
    addNewCol () {
      if (this.HandleType === 0) {
        this.tableData.push({
          Name: this.ColName,
          Type: this.DataType[this.value],
          mKey: this.MainKey
        })
        console.log('添加数据')
        console.log(this.tableData)
      } else {
        console.log(this.tableData[this.EditeIndex].Name)
        console.log('修改数据')
        this.tableData[this.EditeIndex].Name = this.ColName
        this.tableData[this.EditeIndex].Type = this.DataType[this.value]
        this.HandleType = 0
        if (this.tableData[this.EditeIndex].mKey) {
          this.HasMainKey = this.MainKey
          console.log('取消主键')
        }
        this.tableData[this.EditeIndex].mKey = this.MainKey
      }
      if (!this.HasMainKey) {
        this.HasMainKey = this.MainKey
      }
      console.log(this.HasMainKey)
      this.ColName = ''
      this.MainKey = false
      this.value = 0
      this.dialogFormVisible = false
    },
    EditCol (index, row) {
      this.EditeIndex = index
      this.HandleType = 1
      this.dialogFormVisible = true
      console.log(index)
      this.ColName = row.Name
      this.MainKey = row.mKey
      this.value = this.DataType.indexOf(row.Type)
    },
    DelCol (index, row) {
      if (row.mKey) {
        this.HasMainKey = false
      }
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang='less'>
.halfinput {
  width: 50% !important;
}
.pad-20 {
  padding: 20px;
}
</style>
