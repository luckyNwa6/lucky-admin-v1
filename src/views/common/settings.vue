<template>
  <div class="user-info">
    <el-row>
      <el-col :span="4" class="sidebar">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span @click="$router.push('/home')" style="cursor: pointer;">返回</span>
        </div>
        <div style="display: flex">
          <div><img :src="userInfoL.headUrl" alt="Avatar" style="height: 50px;width:50px; border-radius: 50%; margin: 15px;" /></div>
          <div>
            <p style="font-weight:600;font-size:15px">{{ userInfoL.nickname }}</p>
            <p style="font-size:11px">{{ userInfoL.roleName }}</p>
          </div>
        </div>
        <el-menu default-active="1" class="el-menu-vertical-demo" style="height: calc(100vh - 160px);" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-user"></i>
            个人信息
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            偏好设置
          </el-menu-item>
          <el-menu-item index="3">
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
            <div style="margin:25px">
              <img :src="userInfoL.headUrl" alt="Avatar" style="width: 70px; height: 70px; border-radius: 50%; margin-right: 20px;" />
              <el-button type="primary" size="small" plain>更新头像</el-button>
            </div>
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
              <el-button type="primary" @click="updateInfo">更新信息</el-button>
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
                <span style="font-weight:600;font-size:15px">账户密码</span>
                <p>当前密码强度：强</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">密保手机</span>
                <p>已经绑定手机：138....7290</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
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
            <el-divider></el-divider>
            <el-row>
              <el-col :span="18">
                <span style="font-weight:600;font-size:15px">备用邮箱</span>
                <p>已绑定邮箱：1656....@qq.com</p>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('sys:pwd:update')" @click.native="updatePasswordHandle()">
                  修改
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdatePassword from '@/views/main-navbar-update-password'
export default {
  components: {
    UpdatePassword,
  },
  data() {
    return {
      userInfoL: {
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
      updatePassowrdVisible: false,
    }
  },
  mounted() {
    console.log('当前信息数据---', this.userInfo)
    this.userInfoL = this.userInfo
  },
  methods: {
    // 修改密码
    updatePasswordHandle() {
      this.updatePassowrdVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init()
      })
    },
    handleSelect(key) {
      this.activeMenuItem = key
    },
    updateInfo() {
      // Handle form submission or API call to update user info
      console.log('Updating user info:', this.userInfoL)
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 在这里处理分页逻辑
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
