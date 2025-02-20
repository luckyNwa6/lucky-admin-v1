<template>
  <div class="login-container">
    <div class="login-card">
      <!-- 登录方式切换 -->
      <div class="login-type">
        <span :class="{ active: loginType === 'account' }" @click="loginType = 'account'">账号登录</span>
        <span :class="{ active: loginType === 'phone' }" @click="changeLoginType">手机号登录</span>
      </div>

      <!-- 账号登录表单 -->
      <el-form v-if="loginType === 'account'" class="login-form" :model="form" ref="loginForm" :rules="rules">
        <el-form-item label="账号" prop="acc">
          <el-input v-model="form.acc" prefix-icon="el-icon-user" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password />
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="remember">记住密码</el-checkbox>
          <!-- <el-link type="primary" :underline="false">忘记密码</el-link> -->
        </div>

        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form>

      <!-- 手机号登录表单 -->
      <el-form v-else class="login-form">
        <el-form-item label="手机号">
          <el-input v-model="phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="验证码">
          <div class="sms-code">
            <el-input v-model="smsCode" placeholder="请输入验证码" />
            <el-button class="get-code">获取验证码</el-button>
          </div>
        </el-form-item>

        <el-button type="primary" class="login-btn">登录</el-button>
      </el-form>

      <!-- 其他登录方式 -->
      <div class="other-login">
        <el-divider>选择其他登录方式</el-divider>
        <!-- 这里可以添加图标按钮 -->
      </div>

      <div @click="goQQ" style="width: 45px;height:45px;text-align: center;margin: 0 auto;">
        <el-image :src="require('@/assets/img/qq_one.png')" fit="contain"></el-image>
      </div>
      <div class="copyright">
        <p style="letter-spacing: 1px; font-family: 楷体;color:#000">
          Copyright © 2023 图床后台管理系统 |
          <a href="https://beian.miit.gov.cn/" style="text-decoration: none;color: #000;">
            <span style="padding: 2px">
              <img src="https://imgs.luckynwa.top/blog/gonganbeian.png" style="height: 13px; margin-left: 1px" />
              <span style=" margin-left: 3px">闽ICP备 2023003457号-1</span>
            </span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getQQ, reqLogin } from '@/api/login'
export default {
  data() {
    return {
      loginType: 'account',
      remember: false,
      phone: '',
      smsCode: '',
      form: {
        acc: 'admin',
        pwd: 'Nwa741',
      },
      rules: {
        acc: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '账号长度必须为 1-15 位',
            trigger: 'blur',
          },
        ],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.remember) {
            // 如果用户选择了记住密码，则存储账号和密码
            this.$cookie.set('acc', this.form.acc)
            this.$cookie.set('pwd', this.form.pwd)
          } else {
            // 如果用户未选择记住密码，则清除存储的账号和密码
            this.$cookie.delete('acc')
            this.$cookie.delete('pwd')
          }
          let data = {
            username: this.form.acc,
            password: this.form.pwd,
            captcha: '',
            openCaptcha: false,
            uuid: '',
          }
          reqLogin(data).then(res => {
            console.log('🚀 ~ reqLogin ~ res:', res)
            //session会话级，关闭浏览器，token就没了，1登录，开2窗口
            //会出现还需要登录的情况
            // sessionStorage.setItem("token", res.luckyToken);
            //cookie，浏览器关闭也能保持登录状态
            if (res.data.code === 0) {
              // console.log('🚀 ~ reqLogin ~ res:', res)
              this.$cookie.set('token', res.data.token)

              this.successMsg(res.data.msg)
              this.$router.replace({ name: 'home' })
            } else {
              this.failMsg(res.data.msg)
              this.yzmm = this.$options.methods.showCode()
              this.$router.push({ name: 'login' })
            }
          })
        }
      })
    },

    //获取qq的跳转链接
    goQQ() {
      console.log('1111111')
      getQQ().then(res => {
        // console.log('🚀 ~ getQQ ~ res:', res)
        // console.log('请求新的URL去验证第三方的QQ！！！')
        window.location.href = res.data
      })
    },
    changeLoginType() {
      this.$modal.msgWarning('暂不支持手机号登录！')
    },
    loadStoredCredentials() {
      // 从 localStorage 中读取账号和密码
      const acc = this.$cookie.get('acc')
      const pwd = this.$cookie.get('pwd')

      if (acc && pwd) {
        this.form.acc = acc
        this.form.pwd = pwd
        this.remember = true // 自动勾选记住密码
      }
    },
  },

  mounted() {
    this.loadStoredCredentials()
    // 获取完整的查询字符串，例如："?data=42514014FF964FE30D2B24E69E3CA6DB"
    let queryString = window.location.href.split('?')[1]
    // console.log('url?后面的值是:' + queryString)
    // 解析查询字符串为对象
    let token = new URLSearchParams(queryString).get('data')

    let queryString2 = window.location.href.split('&')[1]
    let openId = new URLSearchParams(queryString2).get('openid')
    // console.log('🚀 ~ mounted ~ openId:', openId)

    if (token !== '' && token !== null && openId !== '' && openId !== null) {
      this.$cookie.set('token', token)
      console.log('开始获取个人信息！')
      this.$router.replace({ name: 'home' })
    }
  },
}
</script>

<style scoped>
.login-container {
  padding: 0;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: flex-end; /* 将子元素对齐到右侧 */
  /* align-items: center; 垂直居中 */
  background-image: url(~@/assets/img/login_lucky.jpg);
  background-size: 100% 100%;
}

.login-card {
  width: 37.5%;
  padding: 20px;
  /* background: #000; */
}

.login-type {
  margin-top: 90px;
  text-align: center;
  margin-bottom: 24px;
}

.login-type span {
  margin: 0 20px;
  cursor: pointer;
  color: #000;
  font-size: 24px;
  font-weight: 600;
}

.login-type span.active {
  color: #409eff;
  font-weight: bold;
}

.login-form {
  margin-top: 20px;
  padding: 40px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
}

.sms-code {
  display: flex;
  gap: 10px;
}

.get-code {
  flex-shrink: 0;
}

.other-login {
  padding: 20px 40px 20px;
}

.copyright {
  margin-top: 140px;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
