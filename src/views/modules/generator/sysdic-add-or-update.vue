<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="字典名称" prop="dataType">
        <el-input v-model="dataForm.dataType" placeholder="请输入英文字典名称"></el-input>
      </el-form-item>
      <el-form-item label="Label" prop="label">
        <el-input v-model="dataForm.label" placeholder="请输入label名称"></el-input>
      </el-form-item>
      <el-form-item label="Value" prop="value">
        <el-input v-model="dataForm.value" placeholder="请输入value值"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        dataType: '',
        label: '',
        value: '',
        remark: '',
      },
      dataRule: {
        dataType: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
        label: [{ required: true, message: 'key不能为空', trigger: 'blur' }],
        value: [{ required: true, message: 'value不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/sysdic/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.dataType = data.sysDic.dataType
              this.dataForm.label = data.sysDic.label
              this.dataForm.value = data.sysDic.value
              this.dataForm.remark = data.sysDic.remark
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/sysdic/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              dataType: this.dataForm.dataType,
              label: this.dataForm.label,
              value: this.dataForm.value,
              remark: this.dataForm.remark,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                },
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
  },
}
</script>
