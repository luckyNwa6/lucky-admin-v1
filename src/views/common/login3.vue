<template>
  <div class="login-container">
    <!-- 背景图 -->
    <div class="background-image"></div>

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="企业Logo" class="logo" />
      </div>

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>

        <div class="form-footer">
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>
      </el-form>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      © 2023 企业名称 版权所有
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rememberPassword: false,
      loading: false,
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 这里替换为实际的登录接口调用
          setTimeout(() => {
            this.loading = false
            this.$router.push('/dashboard')
          }, 2000)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-4.0.3') center/cover no-repeat;
    filter: blur(5px);
    z-index: 1;
  }

  .login-form {
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2;
    position: relative;

    .logo-container {
      text-align: center;
      margin-bottom: 30px;

      .logo {
        width: 180px;
        height: auto;
      }
    }

    .form-content {
      /deep/ .el-input__inner {
        height: 45px;
        line-height: 45px;
      }

      .login-btn {
        width: 100%;
        height: 45px;
        font-size: 16px;
        letter-spacing: 2px;
      }
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  }

  .copyright {
    position: absolute;
    bottom: 20px;
    color: #fff;
    font-size: 14px;
    z-index: 2;
  }
}

@media screen and (max-width: 768px) {
  .login-form {
    width: 90% !important;
    padding: 20px !important;
  }
}
</style>
