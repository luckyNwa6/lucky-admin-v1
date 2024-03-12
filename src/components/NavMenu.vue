<!--右侧菜单-->
<template>
  <el-aside>
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
      <div v-for="item in lists" :key="item.id">
        <template v-if="item.isFlag">
          <el-menu-item :index="item.index">
            <i :class="item.ic"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="item.index">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              {{ item.name }}
            </template>
            <el-menu-item :index="itema.index" v-for="itema in item.children" :key="itema.id">
              {{ itema.name }}
            </el-menu-item>
          </el-submenu>
        </template>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          id: 0,
          index: '/index',
          ic: 'el-icon-s-flag',
          name: '首页',
          isFlag: 1,
          children: '',
        },
        {
          id: 1,
          index: '/pic',
          ic: 'el-icon-s-custom',
          name: '图片管理',
          isFlag: false,
          children: [
            // {
            //   index: "/oss",
            //   name: "cos桶服务",
            // },
            {
              index: '/picServe',
              name: '云服务',
            },
            // {
            //   index: '/testServe',
            //   name: '测试服务',
            // },
          ],
        },
      ],
    }
  },
}
</script>
