<template>
  <div>
    <h1>mock</h1>
    <el-button type="primary" @click="send">发起请求</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import { userList } from '@/api/user'
export default {
  methods: {
    send() {
      // axios.get('https://localhost:8081/user/list').then((res) => {
      //   console.log('res', res)
      // })
      // this.request({
      //   url: '/user/list',
      //   method: 'get',
      // }).then((res) => {
      //   console.log('res的值是', res)
      // })
      userList({}).then((res) => {
        console.log('res的值是', res)
      })
    },
  },
}
</script>

<style>
</style>