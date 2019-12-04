<template>
  <div>{{TableName}}</div>
</template>

<script>
export default {
  data: function () {
    return {
      TableName: ''
    }
  },
  watch: {
    TableName: {
      deep: true,
      function (value) {
        console.log(value)
      }
    }
  },
  updated: function () {
    this.TableName = this.$router.params
  },
  mounted: function () {
    console.log(this)
  }
}
</script>

<style>
</style>
