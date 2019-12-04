<template>
  <div>{{TableName==undefined?'加载中':TableName._route.params.id}}</div>
</template>

<script>
export default {
  data: function () {
    return {
      TableName: undefined
    }
  },

  mounted: function () {
    // this.TableName = this.$router.$route.params.id
    this.TableName = this.$router.app
    console.log(this.$router.app)
    console.log(this)
  },
  updated: function () {
    // this.$ajax({
    //   method: 'post',
    //   url: 'http://localhost:8081/Query',
    //   data: {
    //     token: localStorage.getItem('token'),
    //     cmd: 'Select * from ' + this.TableName
    //   },
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // }).then(response => {
    //   this.Databases = response.data.DATA
    // })
  }
}
</script>

<style>
</style>
