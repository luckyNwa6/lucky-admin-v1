<!--home页面右上的头像页-->
<template>
  <div class="navbar">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="headImg" />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/home">
          <el-dropdown-item class="btnExit">首页</el-dropdown-item>
        </router-link>

        <el-dropdown-item @click.native="openDialog" v-if="statusNew">
          <span style="display: block">新增文件夹</span>
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">
          <span style="display: block" class="btnExit">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--下面是弹框-->
    <el-dialog :visible.sync="dialogVisible" title="修改信息" width="30%">
      <el-form label-width="100px">
        <el-form-item label="授权码密码">
          <el-input v-model="authCode" show-password placeholder="正确即可创建文件夹"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateStatus } from '@/api/loginIdp'
import { addFolder } from '@/api/login'
export default {
  name: 'HeadPortrait',
  mounted() {
    this.pidData = JSON.parse(this.$cookie.get('picData'))
    if (this.pidData.headUrl && this.pidData.headUrl !== '') {
      this.headImg = this.pidData.headUrl
    }
    if (this.pidData.status && this.pidData.status === 2) {
      this.statusNew = true
    }
  },
  data() {
    return {
      headImg: require('@/assets/imgs/1.gif'),
      dialogVisible: false,
      authCode: '',
      pidData: {},
      statusNew: false, //默认是隐藏新建文件夹的
    }
  },
  methods: {
    // 提交授权码才拥有自己的文件夹
    submitForm() {
      console.log('点击了授权码提交按钮!')
      var params2 = {
        userId: this.pidData.userId,
        authCode: this.authCode,
      }
      // 需要再去授权服务器将状态改为1
      updateStatus(params2).then((res) => {
        if (res.code === 0) {
          var params = {
            userId: this.pidData.userId,
            folderName: this.pidData.openId,
            parentId: 1,
            createdBy: this.pidData.username,
            status: '1',
            remark: '',
          }
          //去授权服务器先认证一下,只有我给的认证码正确才能去创建文件夹
          addFolder(params).then((res) => {
            if (res.code === 0) {
              this.successMsg('文件夹新增' + res.msg)
              this.dialogVisible = false
              this.statusNew = false
            }
          })
        } else {
          this.failMsg(res.msg)
        }
      })
    },

    // 基本信息框
    openDialog() {
      this.dialogVisible = true
    },
    // 关闭对话框
    closeDialog() {
      this.dialogVisible = false
    },

    //退出
    logout() {
      // sessionStorage.removeItem('token')
      this.$cookie.delete('picToken')
      this.$cookie.delete('picData')
      this.$router.push('/login')
    },
  },
}
</script>
<style scoped>
.navbar {
  widows: 199px;
  height: 60px;
  margin-top: 10px;
}
img {
  width: 55px;
  border-radius: 12px;
}
a {
  text-decoration: none;
}
</style>
