<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">小维后台管理系统</a>
        <a class="site-navbar__brand-mini" href="javascript:;">NN</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu class="site-navbar__menu" mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        <!-- v-if="isAuth('sys:pwd:update')" -->
        <!-- <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item> -->

        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img :src="headImg" :alt="nickname" />
              {{ nickname }}
              <span class="el-icon-sugar"></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goSetUpPage()">账号设置</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push({ name: 'theme' })">主题设置</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 内置弹窗, 新增 / 修改 -->
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="500px" append-to-body>
      <h3>is show time</h3>

      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" :loading="dialogInfo.loading" @click="bindInfoSub">确认</el-button>
      </span>
    </el-dialog>
  </nav>
</template>

<script>
import { clearLoginInfo } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      headImgLocal: require('@/assets/img/avatar.gif'),

      dialogInfo: {
        title: '绑定用户信息',
        visible: false,
        loading: false,
      },
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    navbarLayoutType: {
      get() {
        return this.$store.state.common.navbarLayoutType
      },
    },
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold
      },
      set(val) {
        this.$store.commit('common/updateSidebarFold', val)
      },
    },
    mainTabs: {
      get() {
        return this.$store.state.common.mainTabs
      },
      set(val) {
        this.$store.commit('common/updateMainTabs', val)
      },
    },
    nickname: {
      get() {
        if (this.userInfo.nickname && this.userInfo.nickname !== '') {
          return this.userInfo.nickname
        } else {
          return this.userInfo.username
        }
      },
    },
    headImg: {
      get() {
        if (this.userInfo.headUrl && this.userInfo.headUrl !== '') {
          return this.userInfo.headUrl
        } else {
          return this.userInfo.headImgLocal
        }
      },
    },
  },
  methods: {
    //绑定信息
    bindInfoSub() {},

    goSetUpPage() {
      this.$router.push({ name: 'settings' })
    },
    // 退出
    logoutHandle() {
      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData(),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              clearLoginInfo() //全部清理干净
              // this.$cookie.delete('picData')
              this.$router.push({ name: 'login' })
            }
          })
        })
        .catch(() => {})
    },
  },
}
</script>
