<!--面包屑-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in lists" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
    }
  },
  watch: {
    $route(to, from) {
      this.lists = to.matched
    },
  },
  mounted() {
    this.lists = this.$route.matched
  },
}
</script>

<style></style>
