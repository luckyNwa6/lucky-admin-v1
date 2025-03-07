<!--参数模板弹框
https://element.eleme.cn/2.13/#/zh-CN/component/dialog
-->
<template>
  <el-dialog
    :title="title"
    width="50%"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :before-close="handleClose"
    append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="文件夹名称" prop="folderName">
        <el-input v-model="form.folderName"></el-input>
      </el-form-item>

      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.createTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="handleClose(0)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateAddInfo } from '@/api/bed/folder/index.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      // 防止重复提交
      loading: true,
      // 表单
      form: {
        id: null,
        folderName: '',
        createTime: '',
        remark: '',
        userId: 1,
        status: '1',
        parentId: 1,
        createdBy: 'luckyNwa',
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' },
        ],
      },
      nowOptStatus: '',
    }
  },
  mounted() {},
  methods: {
    //关闭弹框
    handleClose(flag) {
      this.$emit('dialog-closed', flag)
    },
    init(o) {
      // console.log('开始初始化弹框里的数据-----', o)
      this.$nextTick(() => {
        if (Object.keys(o).length === 0) {
          console.log('执行新增')
          this.nowOptStatus = 'add'
          this.$refs.form.clearValidate()
          this.$refs.form.resetFields()
        } else {
          this.nowOptStatus = 'update'
          console.log('执行修改')
          this.form = o
        }
      })
    },
    submitForm() {
      updateAddInfo(this.form).then(res => {
        console.log('🚀 ~ updateAddInfo ~ res:', res)
        if (res.data.code === 200) {
          this.handleClose(1)
          if (this.nowOptStatus === 'update') this.successMsg('文件夹信息修改成功！')
          if (this.nowOptStatus === 'add') this.successMsg('文件夹信息新增成功！')
        }
      })
    },
  },
}
</script>
<style lang="scss"></style>
