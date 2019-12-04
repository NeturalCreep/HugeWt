<template>
  <el-container class="AllBox">
    <el-header class="Header">
      <!-- <img src="../assets/CCCP.png" /> -->
      数据库管理系统
      <span class="Glg">注销</span>
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
              @open="handleOpen"
              @close="handleClose"
              :router="true"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据</span>
                </template>

                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item
                    v-for="(value, key) in Databases"
                    :key="key"
                    :index="`/Table/${value.Database}`"
                  >{{value.Database}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>设置</span>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="Main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      Databases: [1, 2, 3],
      Msg: '2333'
    }
  },
  mounted: function () {
    console.log(this)
    this.$ajax({
      method: 'post',
      url: 'http://localhost:8081/Query',
      data: { token: localStorage.getItem('token'), cmd: 'show databases' },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {
      console.log(response)
      this.Databases = response.data.DATA
    })
  },
  methods: {
    handleWord (key) {
      return 'Table/' + key
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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
    color: red;
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
    color: red;
  }
  .Main {
    background: white;
  }
}
</style>
