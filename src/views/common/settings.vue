<template>
  <div class="user-info">
    <el-row>
      <el-col :span="4" class="sidebar">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span @click="$router.push('/home')" style="cursor: pointer;">返回</span>
        </div>
        <div style="display: flex">
          <div>
            <el-avatar :src="userInfo.headUrl" alt="Avatar" style=" margin: 15px;"></el-avatar>
          </div>
          <div>
            <p style="font-weight:600;font-size:15px">{{ userInfo.nickname }}</p>
            <p style="font-size:11px">{{ userInfo.roleName }}</p>
          </div>
        </div>
        <el-menu default-active="1" class="el-menu-vertical-demo" style="height: calc(100vh - 160px);" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-user"></i>
            个人信息
          </el-menu-item>
          <el-menu-item index="2" v-if="isAuth('setting:love')">
            <i class="el-icon-setting"></i>
            偏好设置
          </el-menu-item>
          <el-menu-item index="3" v-if="isAuth('setting:safeLog')">
            <i class="el-icon-tickets"></i>
            安全日志
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-star-off"></i>
            账户管理
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="20" class="main-content">
        <h2>
          {{ activeMenuItem === '1' ? '个人信息' : activeMenuItem === '2' ? '偏好设置' : activeMenuItem === '3' ? '安全日志' : '账户管理' }}
        </h2>
        <div v-if="activeMenuItem === '1'">
          <!-- 个人信息 -->
          <div>
            <div style="font-weight:600;">
              头像
            </div>
            <UploadUserAvatar :user="userInfo" @changeHeadUrl="changeHeadUrl" />
          </div>

          <el-form ref="userInfoForm" :model="userInfoL" label-width="80px">
            <el-form-item label="昵称">
              <el-input v-model="userInfoL.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfoL.email"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="userInfoL.mobile"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="userInfoL.remark" :rows="5" maxlength="100" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateInfo" :loading="updateLoading">更新信息</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="activeMenuItem === '2'">
          <!-- 偏好设置 -->
          <div style="padding:20px">
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">账户密码</span>
                <p>其他用户的消息将以站内信的形式通知</p>
              </el-col>
              <el-col :span="2">
                <el-switch v-model="accountPassword"></el-switch>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">系统消息</span>
                <p>系统消息将以站内信的形式通知</p>
              </el-col>
              <el-col :span="2">
                <el-switch v-model="systemMessages"></el-switch>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">代办任务</span>
                <p>代办任务将以站内信的形式通知</p>
              </el-col>

              <el-col :span="2">
                <el-switch v-model="pendingTasks"></el-switch>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-else-if="activeMenuItem === '3'">
          <!-- 安全日志 -->
          <div style="padding:20px">
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
              <el-table-column prop="detail" label="详情" width="180"></el-table-column>
              <el-table-column prop="ipAddress" label="IP 地址" width="180"></el-table-column>
              <el-table-column prop="location" label="地点" width="240"></el-table-column>
              <el-table-column prop="os" label="操作系统" width="120"></el-table-column>
              <el-table-column prop="browser" label="浏览器类型" width="120"></el-table-column>
              <el-table-column prop="time" label="时间" width="200"></el-table-column>
            </el-table>

            <el-pagination
              style="text-align: right;"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :total="totalItems"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </div>
        <div v-else-if="activeMenuItem === '4'">
          <!-- 账号管理 -->
          <div style="padding:20px">
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">登录账号</span>
                <p>当前账号：{{ userInfoL.username }}</p>
              </el-col>
              <el-col :span="2">
                <el-button @click.native="updateAccHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">账户密码</span>
                <p>当前密码强度：**</p>
              </el-col>
              <el-col :span="2">
                <el-button @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <!-- <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">密保手机</span>
                <p>已经绑定手机：{{ userInfoL.mobile }}</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->
            <!-- <el-row  >
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">密保问题</span>
                <p>未设置密保问题，密保问题可有效保护账号安全</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->
            <!-- <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">备用邮箱</span>
                <p>已绑定邮箱：{{ userInfoL.email }}</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePasswordVisible" ref="updatePassword"></update-password>
    <!-- 内置弹窗 -->
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="500px" append-to-body>
      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="sub" label-width="80px">
        <el-form-item label="新账号" prop="usernameN">
          <el-input v-model="dataForm.usernameN" placeholder="请输入好记忆的新账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.visible = false">取消</el-button>
        <el-button type="primary" :loading="dialogInfo.loading" @click="sub">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import UpdatePassword from '@/views/main-navbar-update-password'

import UploadUserAvatar from '@/components/userAvatar'

import { updateAcc } from '@/api/user'

export default {
  components: {
    UpdatePassword,
    UploadUserAvatar,
  },
  data() {
    return {
      userInfoL: {
        userId: null,
        nickname: '',
        email: '',
        mobile: '',
        remark: '',
        headUrl: '',
      },

      accountPassword: true,
      systemMessages: true,
      pendingTasks: true,
      activeMenuItem: '1',
      tableData: [
        {
          detail: '账户登录',
          ipAddress: '133.23.235.230',
          location: '中国河南省信阳市',
          os: 'macOS',
          browser: 'Chrome',
          time: '2025-02-08 16:11:51',
        },
        {
          detail: '绑定了手机号码',
          ipAddress: '84.76.127.161',
          location: '中国广东省深圳市',
          os: 'Windows',
          browser: 'Firefox',
          time: '2025-02-07 16:11:51',
        },
      ],
      totalItems: 2,
      currentPage: 1,
      pageSize: 10,
      updatePasswordVisible: false,

      dialogInfo: {
        title: '修改',
        visible: false,
        loading: false,
      },
      dataForm: {
        usernameN: '',
      },
      updateLoading: false,
    }
  },
  created() {
    if (Array.isArray(this.userInfo)) {
      //正常是对象，为空则是数组
      this.$router.push('/login')
    }
  },
  mounted() {
    this.userInfoL = JSON.parse(JSON.stringify(this.userInfo))
  },
  methods: {
    ...mapActions('user', ['UpdateUserInfo']),

    changeHeadUrl(url) {
      this.userInfoL.headUrl = url
      this.updateInfo()
    },
    // 修改密码
    updatePasswordHandle() {
      this.updatePasswordVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassword.init()
      })
    },
    handleSelect(key) {
      this.activeMenuItem = key
    },
    updateInfo() {
      if (!this.userInfoL.nickname.trim()) {
        this.$modal.msgWarning('昵称不能为空！')
        return
      }
      if (this.isEqualLucky(this.userInfo, this.userInfoL)) {
        this.$modal.msgWarning('请修改信息再保存！')
        return
      }

      this.updateLoading = true

      this.UpdateUserInfo(this.userInfoL).then(res => {
        if (res === 0) {
          // this.$store.commit('user/SET_USERINFO', this.userInfoL)//这样直接改不符合vuex的规范
          this.successMsg('信息修改成功！')
          this.userInfoL = JSON.parse(JSON.stringify(this.userInfo))
        }
        this.updateLoading = false
      })
      // console.log('Updating user info:', this.userInfoL)
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 在这里处理分页逻辑
    },

    updateAccHandle() {
      // 打开表单，并设置初始化
      this.dialogInfo.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    sub() {
      if (this.dataForm.usernameN === 'admin') {
        this.$modal.msgWarning('超级管理员不可修改！')
        return
      }
      if (this.userInfo.username === this.dataForm.usernameN) {
        this.$modal.msgWarning('与原用户名相同,请修改！')
        return
      }
      this.dialogInfo.loading = true
      updateAcc({ ...this.userInfoL, usernameN: this.dataForm.usernameN }).then(res => {
        console.log('🚀 ~ updateAcc ~ res:', res)
        if (res.data.code === 0) {
          this.$modal.msgSuccess(res.data.msg)
          this.userInfoL.username = this.dataForm.usernameN
          this.$store.commit('user/SET_USERINFO', this.userInfoL)
        } else {
          this.$modal.msgError(res.data.msg)
        }
        this.dialogInfo.loading = false
        this.dialogInfo.visible = false
      })
    },
    //处理数据 l比较大的数组对象  b小的数组对象  比较b是否存在l中,值完全等于b中则返回true
    isEqualLucky(l, b) {
      for (let key in l) {
        if (!b.hasOwnProperty(key)) return false // property not found in b
        if (typeof l[key] !== typeof b[key]) return false // types are different
        if ((Array.isArray(l[key]) && Array.isArray(b[key])) || (typeof l[key] !== 'object' && typeof b[key] !== 'object')) {
          if (!Array.isArray(l[key]) && !Array.isArray(b[key]) && l[key] !== b[key]) return false // simple values are different
        } else {
          if (!this.isEqualLucky(l[key], b[key])) return false // recursion for nested objects
        }
      }
      return true
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>

<style scoped>
.user-info {
  padding: 0;
  margin: 0;
}

.sidebar {
  padding: 20px;
  height: 100vh;
}

.main-content {
  padding: 30px;
}
</style>
