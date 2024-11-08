<template>
  <div>
    <avue-form ref="crud2" :option="option2" v-model="form2"></avue-form>
    <el-button @click="handle">a</el-button>
    <el-divider></el-divider>
    <div>
      <el-select
        v-model="elValue"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
    </div>
    <el-divider></el-divider>

    <MySelect placeholder="请输入" v-model="keyword" @change="handleSearch" />
  </div>
</template>

<script>
import request from 'axios'

import MySelect from '@/components/MySelect.vue'

export default {
  components: {
    MySelect,
  },
  data() {
    return {
      keyword: '',
      options: [],
      elValue: { name: '浙江省', code: '330000' },
      list: [],
      loading: false,
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
      form2: {},
      option2: {
        addBtn: false,
        addRowBtn: true,
        cellBtn: true,
        menuWidth: 250,
        column: [
          {
            label: '省份单选',
            prop: 'pri',
            type: 'select',
            remote: true,
            props: {
              label: 'name',
              value: 'code',
            },
            dicUrl: `https://cli.avuejs.com/api/area/getProvince?id={{key}}`,
            rules: [
              {
                required: true,
                message: '请选择省份',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
    }
  },

  mounted() {
    // this.list = this.states.map((item) => {
    //   return { value: `value:${item}`, label: `label:${item}` }
    // })
    // setTimeout(() => {
    //   this.updateUrlDic()
    // }, 50)
    // this.updateUrlDic()
    this.init()
  },
  methods: {
    handleSearch() {},
    init() {
      request.get(`https://cli.avuejs.com/api/area/getProvince?id=''`).then((res) => {
        console.log(res)
        this.options = res.data.slice(0, 6)
        this.options.push({
          name: '浙江省',
          code: '330000',
        })
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          request.get(`https://cli.avuejs.com/api/area/getProvince?id=${query}`).then((res) => {
            console.log(res)
            this.options = res.data.filter((item) => {
              return item.name.indexOf(query) > -1
            })
          })

          this.loading = false
          // this.options = this.list.filter((item) => {
          //   return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          // })
        }, 200)
      } else {
        this.options = []
      }
    },
    updateOption() {
      var column = this.findObject(this.option2.column, 'pri')
      column.type = 'select'
      column.dicData = [
        {
          label: '下拉框字典1',
          value: 1,
        },
        {
          label: '下拉框字典0',
          value: 2,
        },
      ]
    },
    handle() {
      this.updateOption()
    },
    updateUrlDic() {
      // 确保组件完全渲染
      var form = this.$refs.crud2
      this.$message.success('先设置本地字典1s后请求url')
      form.updateDic('pri', [
        {
          name: '字典1',
          code: 1,
        },
        {
          name: '字典0',
          code: 2,
        },
      ])
      // setTimeout(() => {
      //   form.updateDic('select')
      // }, 1000)
    },
  },
}
</script>
