<!--home页面的结构-->
<template>
  <div id="module">
    <el-header style="background-image: linear-gradient(to right, #320e4c87, #a6c1ee); padding-bottom: 75px !important">
      <MyHeader></MyHeader>
    </el-header>
    <el-container>
      <NavMenu />
      <el-container>
        <el-header>
          <Breadcrumb />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'
import NavMenu from '@/components/NavMenu.vue'
import Breadcrumb from '@/components/BreadCrumb.vue'

export default {
  components: {
    NavMenu,
    Breadcrumb,
    MyHeader,
  },
}
</script>
