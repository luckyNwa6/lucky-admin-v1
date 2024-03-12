<template>
  <div class="body">
    <div class="wp animsition">
      <div class="boardLogin">
        <a class="logo">
          <!-- <img src="images/loginLogo.png" /> -->
        </a>
        <form>
          <div class="inpGroup">
            <span class="loginIco1"></span>
            <input type="text" name="" placeholder="请输入您的用户名" />
          </div>

          <div class="inpGroup">
            <span class="loginIco2"></span>
            <input type="password" name="" placeholder="请输入您的密码" />
          </div>

          <button class="submit" @click="login" v-preventReClick>登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/bigData')
    },
  },
  mounted() {},
}
</script>
<style scoped>
.body {
  background: url(@/assets/imgs/loginBg.jpg);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
</style>
