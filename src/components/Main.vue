<template>
  <el-container class="AllBox">
    <el-header class="Header">
      <!-- <img src="../assets/CCCP.png" /> -->
      数据库管理系统
      <span class="Glg" @click="Logout">注销</span>
    </el-header>
    <el-container class="Sider">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <h5>数据库操作</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              :router="true"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">操作</template>
                  <el-menu-item index="/Query">创建查询</el-menu-item>
                  <el-menu-item index="/Create">创建表格</el-menu-item>
                </el-menu-item-group>

                <!-- :index="`/Table/${value.Database}`" -->
                <el-menu-item-group>
                  <template slot="title">数据表</template>
                  <el-submenu :index="`1-${key}`" v-for="(value, key) in Databases" :key="key">
                    <template slot="title">
                      <span>{{value.TABLENAME.Database}}</span>
                    </template>
                    <template v-for="(data, dkey) in value.DATA">
                      <el-menu-item
                        :index="`/Table/${value.TABLENAME.Database}/${data[value.TABLENAME.Database]}`"
                        :key="dkey"
                      >{{data[value.TABLENAME.Database]}}</el-menu-item>
                    </template>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>设置</span>
                </template>
                <el-menu-item index="/Users">用户</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="Main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="$router.app._route.params.DATABASE !== undefined"
          >{{$router.app._route.params.DATABASE}}</el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="$router.app._route.params.TABLENAME!==undefined"
          >{{$router.app._route.params.TABLENAME}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$router.app._route.path==='/Users'">用户</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      DatabasesName: [],
      Databases: []
    }
  },
  methods: {
    Logout: () => {
      localStorage.removeItem('token')
      console.log('LogOut!')
    }
  },
  mounted: function () {
    this.$ajax({
      method: 'post',
      url: 'http://localhost:8081/Query',
      data: { token: localStorage.getItem('token'), cmd: 'show databases' },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {
      this.DatabasesName = response.data.DATA
      this.$store.commit('SetDataBase', this.DatabasesName)
      for (var i = 0; i < this.DatabasesName.length; i++) {
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8081/Query',
          data: {
            token: localStorage.getItem('token'),
            cmd:
              'select table_name as ' +
              this.DatabasesName[i].Database +
              " from information_schema.tables where table_schema ='" +
              this.DatabasesName[i].Database +
              "'"
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(datares => {
          if (datares.data.DATA !== null) {
            for (var keyname in datares.data.DATA[0]) {
              for (var index = 0; index < this.DatabasesName.length; index++) {
                if (this.DatabasesName[index].Database === keyname) {
                  this.Databases.push({
                    TABLENAME: this.DatabasesName[index],
                    DATA: datares.data.DATA
                  })
                }
              }
            }
          }
        })
      }
    })
  }
}
</script>

<style lang='less'>
.AllBox {
  height: 100%;
  .Header {
    background: grey;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    img {
      height: 50px;
      margin-top: 5px;
      float: left;
    }
    span {
      float: right;
      width: 180px;
    }
  }
  .Sider {
    background: #545c64;
  }
  .Main {
    background: white;
  }
}
</style>
