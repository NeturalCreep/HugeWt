<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm mid"
  >
    <div class="photo">
      <div class="content"></div>
    </div>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" ref="userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" ref="passWord" autocomplete="off"></el-input>
    </el-form-item>
    <el-button type="success" @click="Login('ruleForm')">登录</el-button>
    <el-button type="info">设置</el-button>
  </el-form>
</template>

<script>
const axios = require('axios')
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        token: localStorage.getItem('token')
      },
      rules: {
        username: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    Login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://localhost:8081/Login',
            data: this.ruleForm,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).then(response => {
            console.log(response)
            if (response.data.result) {
              localStorage.setItem('token', response.data.token)
              this.$router.push({ name: 'Main' })
              this.$message({
                message: '登录成功！',
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less'>
.mid {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 25px;
  padding-top: 70px;
  border-radius: 25px;
  label {
    text-align: center;
  }
  .photo {
    width: 104px;
    height: 104px;
    position: absolute;
    top: -50px;
    background: white;
    border-radius: 50%;
    left: 50%;
    padding: 4px;
    transform: translate(-50%);
    .content {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: url('../assets/photo.jpg');
      background-size: 100%;
    }
  }
}
</style>
