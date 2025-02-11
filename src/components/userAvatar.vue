<template>
  <div style="margin:25px">
    <div class="user-info-head" @click="editCropper()">
      <img v-bind:src="options.img" title="点击上传头像" style="width: 70px; height: 70px; border-radius: 50%; " />
    </div>
    <el-button type="primary" size="small" plain @click="editCropper()">更新头像</el-button>
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body @opened="modalOpened" @close="closeDialog()">
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()"></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { VueCropper } from 'vue-cropper'
import { uploadPic } from '@/api/bed/pic'

export default {
  components: { VueCropper },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: store.getters.userInfo.headUrl, //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      },
      previews: {},
      originalFileName: '', // 保存原始文件名
    }
  },

  methods: {
    // 编辑头像
    editCropper() {
      this.open = true
    },
    // 打开弹出层结束时的回调
    modalOpened() {
      this.visible = true
    },
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf('image/') === -1) {
        this.$modal.msgError('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
      } else {
        const reader = new FileReader()
        // 保存文件名和扩展名
        this.originalFileName = file.name // 获取原始文件名

        reader.readAsDataURL(file)
        reader.onload = () => {
          this.options.img = reader.result
        }
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob(data => {
        console.log('上传的data的值----', data)
        const formData = new FormData()

        // 如果 originalFileName 为空，则使用当前时间戳作为文件名
        if (!this.originalFileName) {
          const timestamp = new Date().getTime()
          this.originalFileName = `'scale'-${timestamp}.jpg`
        }

        // 将单个文件包装成数组
        const fileArray = [new File([data], this.originalFileName, { type: data.type })]
        // 添加文件数组
        for (let i = 0; i < fileArray.length; i++) {
          formData.append('file', fileArray[i])
        }
        // 添加path参数
        formData.append('path', 'adminPic')

        // 打印FormData内容以确认数据已正确添加
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value)
        // }
        uploadPic(formData).then(resp => {
          console.log('🚀 ~ uploadPic ~ resp:', resp)
          this.open = false
          // this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
          this.options.img = resp.data.url
          // this.$set(this.options, 'img', resp.data.url)
          this.$emit('changeHeadUrl', resp.data.url)

          // store.commit('SET_AVATAR', resp.data)
          // this.$modal.msgSuccess('修改成功')
          this.visible = false
        })
      })
    },
    // 实时预览
    realTime(data) {
      // console.log('触发了实时预览')
      this.previews = data
    },
    // 取消截图，关闭对话框
    closeDialog() {
      console.log('取消截图，关闭对话框')
      // this.options.img = store.getters.userInfo.headUrl
    },
  },
}
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 70px;
  width: 70px;
  margin-right: 20px;
}

// .user-info-head:hover:after {
//   content: '+';
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   color: #eee;
//   background: rgba(0, 0, 0, 0.5);
//   font-size: 24px;
//   font-style: normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   cursor: pointer;
//   line-height: 70px;
//   border-radius: 50%;
//   text-align: center;
// }

.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
