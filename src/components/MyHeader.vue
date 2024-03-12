<!--头部页面 欢迎 ...  包含头像-->
<template>
  <div style="display: flex; justify-content: space-between">
    <div style="font-size: 23px; color: white; font-weight: 700; font-family: '宋体'; margin-top: 17px">
      <h3>
        <span style="letter-spacing: 3px">欢迎</span>
        :
        <span
          style="
            letter-spacing: 3px;
            background-image: linear-gradient(to right, #000000, #b16fc3);
            -webkit-background-clip: text;
            color: transparent;
          "
        >
          {{ nickname }}
        </span>
      </h3>
    </div>
    <div>
      <HeadPortrait></HeadPortrait>
    </div>
  </div>
</template>

<script>
import HeadPortrait from '@/components/HeadPortrait.vue'
export default {
  mounted() {
    var obj = JSON.parse(this.$cookie.get('picData'))
    if (obj.nickname && obj.nickname !== '') {
      this.nickname = obj.nickname
    }
  },
  components: { HeadPortrait },
  name: 'MyHeader',
  data() {
    return {
      nickname: 'lucky友人A',
    }
  },
}
</script>
