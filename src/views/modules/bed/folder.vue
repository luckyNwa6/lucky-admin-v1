<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="ID" sortable width="180"></el-table-column>
      <el-table-column prop="folderName" label="文件夹名称" width="180"></el-table-column>
      <!-- <el-table-column prop="parentId" label="父ID" sortable width="180"></el-table-column> -->
      <!-- <el-table-column prop="userId" label="用户ID" sortable width="180"></el-table-column> -->

      <el-table-column prop="createdBy" label="创建人" width="180"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          {{ getStatusLabel(scope.row.status) }}
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getFolderList } from '@/api/bed/folder/index.js'
export default {
  data() {
    return {
      tableData: [],
      folderTypeList: [],
    }
  },
  methods: {
    //获取列表数据
    getFolderData() {
      let obj = {
        folderName: '',
        userId: 1,
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
