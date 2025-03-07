<!-- 大文件ZIP、视频等自定义上传 -->
<template>
  <div>
    <el-card style="width: 95%; margin: 0 auto; padding: 0px 5px; margin-bottom: 15px; margin-top: 15px">
      <p style="font-weight: 600;font-size:20px;margin-bottom:20px;">导入资源</p>
      <p style="font-weight: 600;font-size:14px;">上传目标路径: MinIO桶</p>
      <p style="font-size:14px; margin-bottom: 20px; margin-top: 20px">支持以下类型和格式的资源导入</p>

      <el-table :data="tableData" border style="width: 35%">
        <el-table-column prop="typeL" label="类型" align="center">
          <template slot-scope="scope">
            <span style="font-weight: 600">格式</span>
          </template>
        </el-table-column>
        <el-table-column prop="2DL" align="center">
          <template slot="header" slot-scope="scope">
            <span>
              二维地图
              <el-tooltip placement="top" effect="light" class="item">
                <div slot="content">
                  <img :src="image2d" />
                </div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span style="font-weight: 600">png</span>
          </template>
        </el-table-column>
        <el-table-column prop="DYL" align="center">
          <template slot="header" slot-scope="scope">
            <span>
              点云
              <el-tooltip placement="top" effect="light" class="item">
                <div slot="content">
                  <img :src="imageDY" />
                </div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span style="font-weight: 600">pnts</span>
          </template>
        </el-table-column>
        <el-table-column prop="QXL" align="center">
          <template slot="header" slot-scope="scope">
            <span>
              倾斜模型
              <el-tooltip placement="top" effect="light" class="item">
                <div slot="content">
                  <img :src="imageQX" />
                </div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span style="font-weight: 600">b3dm</span>
          </template>
        </el-table-column>
        <el-table-column prop="QJL" align="center">
          <template slot="header" slot-scope="scope">
            <span>全景照片</span>
          </template>
          <template slot-scope="scope">
            <span style="font-weight: 600">jpeg &nbsp; jpg</span>
          </template>
        </el-table-column>
      </el-table>

      <div style="font-size: 14px;height:20px">
        <p style="margin-top: 20px;">
          除了全景照片可以直接上传文件（格式：jpg, jpeg）以外，其余类型的文件请将单个模型按照对应格式的文件结构压缩成为zip包（小于
          30GB）后，再进行上传。
        </p>
      </div>
    </el-card>
    <el-card style="width: 95%; margin: 0 auto; padding: 0px 5px; height: 520px; overflow: auto">
      <el-dropdown style="margin-bottom: 4px" @command="openEditDialog">
        <el-button type="primary" :disabled="btDisable">
          导入
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="QX" :disabled="btDisable">倾斜模型</el-dropdown-item>
          <el-dropdown-item command="DY" :disabled="btDisable">点云</el-dropdown-item>
          <el-dropdown-item command="2D" :disabled="btDisable">二维地图</el-dropdown-item>
          <el-dropdown-item command="QJ" :disabled="btDisable">全景照片</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-upload
        ref="uploadRef"
        :action="addApi"
        :headers="headers"
        :file-list="fileList"
        :show-file-list="false"
        :on-change="handleChange"
        :auto-upload="false"
        v-show="false"
        multiple
      ></el-upload>
      <div style="margin-bottom: 20px;margin-top: 15px;">
        <span style="color: #ff9900; margin-left: 5px">
          <i class="el-icon-warning"></i>
          上传过程中请勿关闭浏览器或退出当前页面！
        </span>
      </div>
      <el-table
        :data="tableFileData"
        :border="true"
        style="margin-bottom: 20px;"
        :highlight-current-row="true"
        :loading="loading"
        height="290px"
        ref="tableRef"
      >
        <el-table-column prop="file_name" label="文件名称" width="380" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="上传进度" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.showProgress">
              <el-progress
                :percentage="scope.row.uploadProgress"
                :color="customColorMethod(scope.row.uploadProgress, scope.row.state)"
              ></el-progress>
            </div>
            <div v-else-if="scope.row.showProgress === 0 && scope.row.file_tip === ''">
              <span></span>
            </div>
            <div v-else>
              <span>{{ scope.row.file_tip }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="上传状态" width="180" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getFileUploadOptionLabel(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="model_type" label="模型类型" width="180" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getModelTypeLabel(scope.row.model_type) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="danger" v-if="!scope.row.showDel" @click.stop="handleDelete(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button type="primary" @click="btDis" :disabled="btDisable">{{ uploadBtnName }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import JSZip from 'jszip'
import axios from 'axios'
import _ from 'lodash'
import optionData from '@/utils/option-data'
import image2d from '@/assets/img/image2d.png'
import imageDY from '@/assets/img/imageDY.png'
import imageQX from '@/assets/img/imageQX.png'
export default {
  data() {
    return {
      tableFileData: [
        // {
        //   file_name: '文件名称2.zip',
        //   showProgress: 1,
        //   uploadProgress: 20,
        //   state: 2,
        //   model_type: null,
        // },
        // {
        //   file_name: '文件名称3.zip',
        //   showProgress: 1,
        //   uploadProgress: 20,
        //   state: 0,
        //   model_type: null,
        // },
        // {
        //   file_name: '文件名称1.zip',
        //   showProgress: 1,
        //   uploadProgress: 100,
        //   state: 1,
        //   model_type: null,
        // },
        // {
        //   file_name: '文件名称1.zip',
        //   showProgress: 0,
        //   state: 3,
        //   model_type: null,
        // },
        // {
        //   file_name: '文件名称1.zip',
        //   showProgress: 0,
        //   file_tip: '不支持的文件结构，请按照上传模型的结构要求上传文件。',
        //   state: 4,
        //   model_type: null,
        // },
      ],
      fileUploadOption: [
        {
          value: 3,
          label: '待上传',
        },
        {
          value: 2,
          label: '正在上传',
        },
        {
          value: 1,
          label: '上传成功',
        },
        {
          value: 0,
          label: '上传失败',
        },
        {
          value: 4,
          label: '',
        },
      ],
      tableData: [
        {
          typeL: '格式',
          QXL: 'zip',
          DYL: 'zip',
          '2DL': 'zip',
          QJL: 'jpeg,jpg',
        },
      ],
      modelTypeOption: optionData.modelTypeOption,
      loading: false,
      uploadBtnName: '上传',
      image2d,
      imageDY,
      imageQX,
      btDisable: false,
      //由于是手动上传就不需要这2个了
      addApi: '',
      headers: { 'X-Auth-Token': 'LUCKY' },
      fileList: [],
      typeModel: null,
      fileSize: 30, //30GB
      fileTypeQJ: ['jpeg', 'jpg', 'png', 'mp4'], //全景照片
      fileType3: ['zip'], //倾斜、点云、二维都是zip格式
      config: {
        headers: {
          Token: this.$cookie.get('token'),
        },
      },
    }
  },
  methods: {
    //点击上传
    async btDis() {
      try {
        const res = await this.uploadFile()
        console.log('🚀 ~上传全部完毕，失败还能继续上传的列表：', this.fileList)
        // 所有文件上传完成
        this.btDisable = false
        this.uploadBtnName = '上传'
      } catch (error) {
        this.btDisable = false
        this.uploadBtnName = '上传'
      }
    },
    //手动上传
    async uploadFile() {
      // debugger;
      console.log('🚀 ~ 手动上传时候uploadFile ~ fileList:', this.fileList)
      if (!this.fileList.length) {
        this.failMsg('请先导入模型！')
        return
      }
      this.btDisable = true
      this.uploadBtnName = '正在上传'
      let arr = _.cloneDeep(this.fileList)
      console.log('🚀 ~ uploadFile ~ arr:', arr)
      let flagPro = false //防止进度条上传成功还99
      for (let i = 0; i < arr.length; i++) {
        flagPro = false
        const file = arr[i]
        console.log('🚀 ~ uploadFile ~ file:', file)
        // 使用FormData上传
        const formData = new FormData()
        formData.append('file', file.raw, file.name)
        const index = this.tableFileData.findIndex(obj => obj.file_name === file.name) //在列表中删除提示那种没上传到服务器
        this.tableFileData[index].state = 2
        this.tableFileData[index].showProgress = 1
        this.tableFileData[index].uploadProgress = 0 //进度条
        try {
          const response = await axios.post(
            // import.meta.env.VITE_APP_BASE_API + `/achievement/api/v1/model/${userStore.userData.workspace_id}/uploadFile/${file.modelType}`,
            this.$http.adornUrl('/sys/oss/upload'),
            formData,
            {
              ...this.config,
              onUploadProgress: progressEvent => {
                // 计算进度百分比
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                // console.log(`Upload Progress: ${percentCompleted}%`);
                if (percentCompleted === 100 && !flagPro) {
                  console.log('这是前端的100进度条改99等后端返回0才100')
                  this.tableFileData[index].uploadProgress = 99
                } else if (flagPro) {
                  this.tableFileData[index].uploadProgress = 100
                } else {
                  this.tableFileData[index].uploadProgress = percentCompleted //更新实时进度条
                }
              },
            }
          )

          if (response.data.code === 200) {
            console.log('文件上传成功', response.data)
            flagPro = true
            this.tableFileData[index].state = 1 //状态改成功
            this.tableFileData[index].showDel = 1 //禁用删除
            const index2 = this.fileList.findIndex(obj => obj.name === file.name) //文件列表删除，这样下次上传就没有它了
            // console.log('🚀 ~ 上传成功删除索引:', index2);
            if (index2 !== -1) {
              this.fileList.splice(index2, 1)
            }
            console.log('后端返回0了，进度条该100了')
            this.tableFileData[index].uploadProgress = 100 //进度条拉满
            console.log('🚀 ~ uploadFile ~ this.tableFileData[index].uploadProgress:', this.tableFileData[index].uploadProgress)
          } else if (response.data.code === -1) {
            flagPro = false
            this.tableFileData[index].uploadProgress = 99
            console.log('上传失败了，后端说的')
            this.tableFileData[index].state = 0 //状态改失败
          }
        } catch (error) {
          this.tableFileData[index].state = 0 //状态改失败
          this.tableFileData[index].uploadProgress = 99
          flagPro = false
          this.failMsg(`网络异常，文件上传失败！`)
          console.error('文件上传失败', error)
        }
      }
    },

    // 由于是手动上传就不走其他的生命周期了
    async handleChange(file, updatedFileList) {
      console.log('=====================触发了handleChange的生命周期开始！！！')
      file.modelType = this.typeModel
      const nameA = file.name
        .split('.')
        .slice(0, -1)
        .join('.')
      // console.log(nameA);
      if (nameA.length > 30) {
        this.failMsg(`文件名过长，请限制30字内!`)
        return
      }
      const isLt = file.size / 1024 / 1024 / 1024 < this.fileSize
      if (!isLt) {
        this.failMsg(`上传文件大小不能超过 ${this.fileSize} GB!`)
        return false
      }

      const ob1 = this.fileList.find(obj => obj.name === file.name)
      const ob2 = this.tableFileData.find(obj => obj.file_name === file.name)
      if (ob1 || ob2) {
        this.failMsg(`文件已在列表中!`)
        return
      }
      let fileExtension = ''
      if (file.name.lastIndexOf('.') > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        console.log('🚀 ~文件扩展后缀是:', fileExtension)
      }
      this.isTypeOk = (this.typeModel === 'QJ' ? this.fileTypeQJ : this.fileType3).some(type => {
        if (fileExtension && fileExtension.toUpperCase().indexOf(type.toUpperCase()) > -1) return true
        return false
      })
      console.log('🚀 ~ handleChange ~ file:', file)
      if (this.typeModel !== 'QJ') {
        console.log('继续验证zip')
        try {
          const res = await this.unzipAndReadFiles(file)
          console.log('🚀 ~ handleChange ~ 解压回调:', res)
          this.isTypeOk = res
        } catch (error) {
          console.log('捕获到的异常:', error)
          this.isTypeOk = false //捕获里面的异常
        }
      }

      if (!this.isTypeOk) {
        //格式有问题,加入列表中，不加入上传列表
        console.log('格式有问题,加入列表中，不加入上传列表')
        // console.log(file.name)
        this.tableFileData.push({
          file_name: file.name,
          showProgress: 0,
          file_tip: '不支持的文件结构，请按照上传模型的结构要求上传文件。',
          state: 4,
          model_type: this.typeModel,
        })
      } else {
        this.fileList.push(file)
        this.tableFileData.push({
          file_name: file.name,
          showProgress: 0,
          state: 3,
          uploadProgress: 0,
          model_type: this.typeModel,
        })
        console.log('通过格式验证')
        console.log('🚀 ~ handleChange ~ updatedFileList:', updatedFileList)
        console.log('🚀 ~ handleChange ~ 要上传的文件列表:', this.fileList)
      }

      console.log('=====================触发了handleChange的生命周期结束！！！')
    },
    //打开选项菜单赋值并清空
    openEditDialog(type) {
      console.log('当前要上传的类型是：', type)
      this.typeModel = type //这里必须赋值，下面才知道类型
      console.log('打开了选中文件框')
      this.$refs.uploadRef.$el.querySelector('input').value = ''
      this.$refs.uploadRef.$el.querySelector('input').click() //触发点击选择文件框
    },
    //删除
    handleDelete(row) {
      console.log('🚀 ~当前行的数据:', row)
      const index = this.tableFileData.findIndex(obj => obj.file_name === row.file_name) //在列表中删除提示那种没上传到服务器
      console.log('🚀 ~ handleDelete ~ this.tableFileData:', this.tableFileData)
      console.log('🚀 ~ tableFileData ~ index:', index)
      const index2 = this.fileList.findIndex(obj => obj.name === row.file_name) //文件列表删除
      console.log('🚀 ~ handleDelete ~ this.tableFileData:', this.tableFileData)
      console.log('🚀 ~ fileList ~ index2:', index2)
      if (index !== -1) {
        this.tableFileData.splice(index, 1)
      }
      if (index2 !== -1) {
        this.fileList.splice(index2, 1)
      }
      this.$refs.uploadRef.$el.querySelector('input').value = ''
      this.successMsg('删除成功')
    },
    //解压文件、校验规则
    unzipAndReadFiles(file) {
      return new Promise((resolve, reject) => {
        // console.log(file)
        let modelType = file.modelType
        file = file.raw
        const reader = new FileReader()
        let tempBoolean = false //用来存是否满足条件
        let tempSum = 0 //临时长度
        try {
          reader.onload = e => {
            const zipData = e.target.result // 获取ZIP文件的内容
            // 使用JSZip解压缩ZIP文件
            JSZip.loadAsync(zipData)
              .then(zip => {
                console.log(zip)
                // 处理解压缩后的内容
                zip.forEach((relativePath, zipEntry) => {
                  // console.log('🚀 ~ zip.forEach ~ zipEntry:', zipEntry);
                  // console.log('🚀 ~ zip.forEach ~ relativePath:', relativePath)
                  if (modelType === 'DY' && this.pathMatchesRuleDY(relativePath)) {
                    tempSum++
                    // console.log('🚀 ~ zip.forEach ~ relativePath:', relativePath);
                    // console.log('DY满足压缩格式！！！！！！');
                    // console.log('🚀 ~ zip.forEach ~ Object.keys(zip.files).length:', Object.keys(zip.files).length);
                    // console.log('🚀 ~ zip.forEach ~ tempSum:', tempSum);
                    if (Object.keys(zip.files).length == tempSum) {
                      //同时满足正则
                      tempBoolean = true
                    }
                  } else if (modelType === 'QX' && this.pathMatchesRuleQX(relativePath)) {
                    tempSum++
                    console.log('QX满足压缩格式！！！')
                    if (Object.keys(zip.files).length == tempSum) {
                      //同时满足正则
                      tempBoolean = true
                    }
                  } else if (modelType === '2D' && this.pathMatchesRule2D(relativePath)) {
                    console.log('有xyz.png格式！！！')
                    tempBoolean = true
                  }
                  // if (!zipEntry.dir) {
                  //   // 如果是文件而不是目录
                  //   zipEntry.async('string').then(fileContent => {
                  //     // 处理文件内容
                  //     console.log(`文件名：${zipEntry.name}`);
                  //     // console.log(`文件内容：${fileContent}`);
                  //   });
                  // }
                })
                console.log('当前', tempBoolean)
                resolve(tempBoolean) // 解压缩完成，将Promise标记为成功，并传递isTypeOk的值
              })
              .catch(error => {
                console.log('这是解压时候遇到的异常')
                reject(error) // 将Promise标记为失败，并传递错误信息
              })
          }

          reader.readAsArrayBuffer(file) // 以ArrayBuffer格式读取文件内容
        } catch (error) {
          console.log('这里是解压外层捕获的异常')
          reject(error) // 将Promise标记为失败，并传递错误信息
        }
      })
    },
    //进度条百分比颜色
    customColorMethod(percentage, state) {
      if (percentage < 100 && state) {
        return '#409eff'
      } else if (percentage <= 100 && !state) {
        return '#ff3b30'
      } else if (percentage === 100) {
        return '#4bd863'
      }
    },
    //类似字典用法
    getFileUploadOptionLabel(state) {
      const option = this.fileUploadOption.find(item => item.value === state)
      return option ? option.label : ''
    },
    getModelTypeLabel(modelType) {
      const option = this.modelTypeOption.find(item => item.value === modelType)
      return option ? option.label : ''
    },
    //校验正则
    pathMatchesRuleDY(path) {
      // 根目录下第一个文件名为 "tileset.json"
      const pathRegex = /^[^/]+\/tileset\.json/
      // 其他文件必须是 .json 或 .pnts 后缀
      const fileRegex = /\.json$|\.pnts$/i
      // 路径以 / 结尾
      const trailingSlashRegex = /\/$/
      return pathRegex.test(path) || fileRegex.test(path) || trailingSlashRegex.test(path)
    },
    //校验正则
    pathMatchesRuleQX(path) {
      // 根目录下第一个文件名为 "tileset.json"
      const pathRegex = /^[^/]+\/tileset\.json/
      // 其他文件必须是 .json 或 .b3dm后缀
      const fileRegex = /\.json$|\.b3dm$/i
      // 路径以 / 结尾
      const trailingSlashRegex = /\/$/
      return pathRegex.test(path) || fileRegex.test(path) || trailingSlashRegex.test(path)
    },
    //校验正则
    pathMatchesRule2D(path) {
      //2D规则
      const regex = /^[^/]+\/\d+\/\d+\/\d+\.png$/
      return regex.test(path)
    },
  },
}
</script>

<style scoped></style>
