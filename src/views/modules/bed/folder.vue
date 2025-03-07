<template>
  <div>
    <el-input
      v-model="findContent"
      placeholder="请输入文件夹名称"
      style="width: 222px; margin-right: 12px; margin-bottom: 12px"
      clearable
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="addFolder">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column align="center" prop="id" label="ID" width="180"></el-table-column>
      <el-table-column align="center" prop="folderName" label="文件夹名称" width="180"></el-table-column>
      <!-- <el-table-column prop="parentId" label="父ID" sortable width="180"></el-table-column> -->
      <!-- <el-table-column prop="userId" label="用户ID" sortable width="180"></el-table-column> -->
      <el-table-column align="center" prop="createdBy" label="创建人" width="180"></el-table-column>
      <el-table-column align="center" label="状态" width="180">
        <template slot-scope="scope">
          {{ getStatusLabel(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateRow(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="delRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <FolderDialog ref="FolderCon" :dialogVisible.sync="luckyDialog.visible" :title="luckyDialog.title" @dialog-closed="dialogClose" />
  </div>
</template>

<script>
import { getFolderList, deleteFolder } from '@/api/bed/folder/index.js'

import FolderDialog from './folderDialog.vue'
export default {
  components: { FolderDialog },
  data() {
    return {
      tableData: [],
      folderTypeList: [],
      findContent: '', //搜索框内容
      luckyDialog: {
        visible: false,
        title: '',
      },
    }
  },
  methods: {
    //获取列表数据
    getFolderData() {
      let obj = {
        folderName: this.findContent,
        userId: 1,
        type: 'tree',
      }
      getFolderList(obj).then(res => {
        console.log('🚀 ~ 获取到的树形列表:', res.data.data)
        this.tableData = res.data.data
      })
    },
    // 根据 status 值获取对应的中文标签
    getStatusLabel(statusValue) {
      const matchingOption = this.folderTypeList.find(option => option.value == statusValue)
      return matchingOption ? matchingOption.label : ''
    },

    search() {
      this.getFolderData()
    },
    updateRow(obj) {
      console.log('🚀 ~ updateRow ~ obj:', obj)
      this.luckyDialog.title = '修改'
      this.luckyDialog.visible = true
      this.$refs.FolderCon.init(obj)
    },
    addFolder() {
      this.luckyDialog.title = '新增'
      this.luckyDialog.visible = true
      this.$refs.FolderCon.init({})
    },
    delRow(obj) {
      console.log('删除的数据值', obj)
      this.$confirm('此操作将永久删除该文件夹信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteFolder([obj.id]).then(res => {
            console.log('🚀 ~ updateAddInfo ~ res:', res)
            if (res.data.code === 200) {
              this.successMsg('文件夹信息删除成功！')
              this.getFolderData()
            } else {
              this.failMsg('文件夹信息删除失败！')
            }
          })
        })
        .catch(() => {})
    },

    dialogClose(flag) {
      this.luckyDialog.visible = false
      if (flag) this.getFolderData()
    },
  },
  mounted() {
    this.getFolderData()
  },
  async created() {
    let { folderTypeList, stateTypeList } = await this.getDic('folderTypeList,stateTypeList').catch(() => {})
    this.folderTypeList = [...folderTypeList]
    console.log('🚀 ~ getDicData ~ sexTypeList:', this.folderTypeList)
    // console.log('🚀 ~ getDicData ~ stateTypeList:', stateTypeList)
  },
}
</script>

<style lang="sass" scoped></style>
