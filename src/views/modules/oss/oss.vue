<template>
  <div class="mod-oss">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button type="primary" @click="configHandle()">云存储配置</el-button>
        <el-button type="primary" @click="uploadHandle()">上传文件</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button type="success" @click="loadMinIO">下载MinIO测试</el-button>
        <el-button type="primary" @click="syncYun()" :disabled="btnYunDis">同步文件夹和图片</el-button>
        <el-button type="primary" @click="openEditDialog()">大文件上传</el-button>
        <!-- <el-button type="primary" @click="syncYunFolder()">同步文件夹</el-button>
        <el-button type="primary" @click="syncYunPic()">同步图片</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="80" label="ID"></el-table-column>
      <el-table-column prop="url" header-align="center" align="center" label="URL地址"></el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" width="180" label="创建时间"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 云存储配置 -->
    <config v-if="configVisible" ref="config"></config>
    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
  </div>
</template>

<script>
import Config from './oss-config'
import Upload from './oss-upload'
import { base64ToFile } from '@/utils/toolLucky.js'
import { loadMinIOFile } from '@/api/oss/index'
export default {
  data() {
    return {
      dataForm: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      btnYunDis: false,
      dataListSelections: [],
      configVisible: false,
      uploadVisible: false,
    }
  },
  components: {
    Config,
    Upload,
  },
  activated() {
    this.getDataList()
  },
  methods: {
    /**
     * 打开上传页面
     * @param {*} row
     */
    openEditDialog() {
      // $router.push({ path: '/model-upload' });
      const newRoute = this.$router.resolve({ path: '/uploadL' }) //新页面
      window.open(newRoute.href, '_blank')
    },

    //同步云
    syncYun() {
      this.syncYunFolder()
    },
    //同步文件夹
    syncYunFolder() {
      this.btnYunDis = true
      this.$http({
        url: this.$http.adornUrl('/bedFolder/syncYunFolder'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.successMsg(data.msg)
          this.syncYunPic() //同步完文件夹再去同步图片
        } else {
          this.failMsg(data.msg)
          this.btnYunDis = false
        }
      })
    },
    //同步图片
    syncYunPic() {
      this.$http({
        url: this.$http.adornUrl('/bedPic/syncYunPic'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.successMsg(data.msg)
        } else {
          this.failMsg(data.msg)
        }
        this.btnYunDis = false
      })
    },
    //下载MinIO测试
    loadMinIO() {
      //请求那返回类型改blob即可
      loadMinIOFile('http://120.26.80.35:9000/lucky/20240813/ef21f720e16f44bda5836d622b4e21c9.png').then(res => {
        if (res.data.code === 200) {
          base64ToFile(res.data.data, '测试MINIO图片下载.png')
          //下面是后端返回正常json
          // const binaryString = window.atob(res.data.data) // 将 base64 编码的二进制数据转换为二进制字符串
          // const bytes = new Uint8Array(binaryString.length)
          // for (let i = 0; i < binaryString.length; i++) {
          //   bytes[i] = binaryString.charCodeAt(i)
          // }
          // const fileBlob = new Blob([bytes], { type: 'image/png' })
          // const fileUrl = window.URL.createObjectURL(fileBlob)
          // const downloadLink = document.createElement('a')
          // downloadLink.href = fileUrl
          // downloadLink.download = 'filename.png'
          // downloadLink.click()
          // URL.revokeObjectURL(fileUrl)
          //下面是后端直接返回二进制流，并且请求接口那要加responseType: "blob"
          // // 创建Blob对象和临时URL
          // const fileBlob = new Blob([res], { type: 'image/png' })
          // const fileUrl = window.URL.createObjectURL(fileBlob)
          // // 创建下载链接
          // const downloadLink = document.createElement('a')
          // downloadLink.href = fileUrl
          // downloadLink.download = 'filename.png' // 设置下载的文件名
          // // 模拟点击下载链接
          // downloadLink.click()
          // // 清理临时URL
          // URL.revokeObjectURL(fileUrl)
        } else {
          console.log('SSS')
          console.log(res.data.msg)
          this.failMsg(res.data.msg)
        }
      })
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sys/oss/list'),
        method: 'get',
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 云存储配置
    configHandle() {
      this.configVisible = true
      this.$nextTick(() => {
        this.$refs.config.init()
      })
    },
    // 上传文件
    uploadHandle() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.upload.init()
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id
          })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/oss/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                },
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
        .catch(() => {})
    },
  },
}
</script>
