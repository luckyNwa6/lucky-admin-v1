<template>
  <div>
    <avue-form ref="form" v-model="baseInfoObj" :option="baseInfoOption"></avue-form>
  </div>
</template>

<script>
export default {
  props: { data: { type: Object, default: () => {} }, params: { type: Object, default: () => {} } },
  data() {
    return {
      cityTypeList: [
        { label: '北京', dataValue: '0' },
        { label: '杭州', dataValue: '1' },
        { label: '上海', dataValue: '2' },
      ],
    }
  },
  methods: {
    //表单校验
    async validateFn() {
      return new Promise(async (resolve, reject) => {
        // this.$refs.form.validate(valid => {
        //   if (valid) {
        //     resolve(true)
        //   } else {
        //     reject(false)
        //   }
        // })
        await this.$refs.form.validate((valid, done, msg) => {
          console.log('表单校验结果:', valid)
          if (valid) resolve({ isPass: true, code: 200 })
          if (!valid) resolve({ isPass: false, code: 400, msg: msg })
          done()
        })
      })
    },
  },
  computed: {
    //表单渲染的真正数据,这边修改data里的数据-->通过this.$set(this.data,"属性名","需要的赋值"),修改data数据
    baseInfoObj: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      },
    },
    //配置,控制表单是否是详情模式
    config() {
      return {
        detail: false,
        ...this.params,
      }
    },
    baseInfoOption() {
      return {
        labelWidth: 120,
        detail: this.config.detail,
        emptyBtn: false,
        submitBtn: false,
        menuBtn: false,
        span: 6,
        column: [
          {
            label: '姓名',
            prop: 'name',
            rules: [
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '年龄',
            prop: 'age',
            placeholder: '  ',
            rules: [],
          },
          {
            label: '昵称',
            prop: 'nickName',
            maxlength: 10,
            showWordLimit: true,
            prepend: 'lucky_',
            placeholder: '只能输入数字、字母、下划线而且下划线只能在中间,最多10',
            rules: [
              { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
              {
                pattern: /^(?!_)[a-zA-Z0-9]*[a-zA-Z0-9_]*[a-zA-Z0-9](?<!_)$/,
                message: '只能输入数字、字母、下划线而且下划线只能在中间',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '身份证',
            prop: 'idCard',
            disabled: true,
            rules: [],
          },
          {
            label: 'QQ',
            prop: 'qq',
            disabled: true,
            rules: [],
          },
          {
            label: '城市',
            prop: 'city',
            clearable: false,
            type: 'select', //默认是input
            dicData: this.cityTypeList,
            props: {
              //默认是label和value,不是则需要改
              label: 'label',
              value: 'dataValue',
            },

            rules: [],
          },
          {
            label: '区域',
            prop: 'area',
            disabled: true,
            display: ['1'].includes(this.baseInfoObj.city),
          },
          {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            span: 24,
          },
        ],
      }
    },
  },
}
</script>

<style></style>
