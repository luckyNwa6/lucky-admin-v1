<template>
  <div style="padding: 20px">
    <el-card>
      <div slot="header"><span>avue-crud进阶</span></div>
      <CrudWell />
    </el-card>
    <el-divider></el-divider>
    <el-card>
      <div slot="header"><span>avue-crud表格</span></div>
      <avue-crud
        :option="option"
        :table-loading="loading"
        :page="page"
        :data="data"
        :before-open="beforeOpen"
        :cell-class-name="cellStyle"
        v-model="form"
        :search.sync="search"
        ref="crud"
        @row-click="setCurrentRow"
        @row-update="rowUpdate"
        @row-save="rowSave"
        @search-change="searchChange"
        @search-reset="searchReset"
        @selection-change="selectionChange"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="onLoad(page)"
        @on-load="onLoad"
      >
        <template slot="userId" slot-scope="{ row }">
          <p v-if="row.userId % 2 == 0" style="color: red">{{ row.userId }}</p>
          <p v-else>{{ row.userId }}</p>
        </template>
      </avue-crud>
    </el-card>
    <el-divider></el-divider>
    <el-card>
      <div slot="header"><span>avue-form表单</span></div>
      <el-button @click="modClick" style="margin-bottom: 20px">切换模式</el-button>
      <el-button @click="checkForm">表单校验</el-button>
      <el-button @click="saveFrom">保存表单</el-button>
      <ServeInfo ref="serveInfo" :params="params" :data.sync="infoObj['serveInfo']" :columns="getColumn('serveInfo')" />
    </el-card>
    <el-divider></el-divider>
    <div style="display: flex; align-items: center">
      <el-select
        v-model="elValue"
        filterable
        remote
        size="small"
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loadingSel"
      >
        <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <MySelect placeholder="请输入" v-model="keyword" style="margin-left: 20px" />
    </div>
  </div>
</template>

<script>
import MySelect from '@/components/MySelect.vue'
import ServeInfo from '@/components/ServeInfo.vue'
import { serveInfoData } from '@/components/columnConfig.js'
import CrudWell from '@/components/CrudWell.vue'
import { userNameList, getOpenCityList } from '@/api/user/index'
export default {
  components: {
    MySelect,
    ServeInfo,
    CrudWell,
  },
  data() {
    return {
      options: [],
      elValue: {},
      loadingSel: false,
      keyword: '',

      params: {
        detail: false,
      },
      infoObj: {
        serveInfo: JSON.parse(JSON.stringify(serveInfoData)),
      },
      resData: {
        name: 'lucky小维',
        age: 26,
        idCard: '110101199001010001',
        nickName: 'lucky_NWA',
        qq: '1656213092',
        city: '1',
        area: '萧山区',
        remark:
          '如果你已经检查并排除了上述可能性，但问题依旧存在，考虑创建一个新的项目并逐步迁移现有代码，以此来确定是否是项目配置的问题。另外，也可以查阅 VSCode 和相关插件的官方文档或社区论坛，寻找更多针对性的帮助',
      },

      //表格相关
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 10,
      },
      data: [],
      loading: false,
      form: {},
      search: {},
      selectionList: [],
      currentRow: {},
      queryStr: '{}',

      cityTypeList: [
        { label: '北京', dataValue: '0' },
        { label: '杭州', dataValue: '1' },
        { label: '上海', dataValue: '2' },
      ],
    }
  },

  mounted() {
    this.init()
    let { type: typeName = '', id = '' } = this.$route.query //es6语法
    console.log('🚀 ~ mounted ~ id:', id)
    console.log('🚀 ~ activated ~ typeName:', typeName)
    this.infoObj.serveInfo = this.handleLeftFixName(this.resData)
  },
  methods: {
    init() {
      getOpenCityList('').then((res) => {
        console.log('当前res的值:', res)
        if (Array.isArray(res)) {
          this.options = res.slice(0, 16)
        } else {
          console.error('Received data is not an array.')
        }
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loadingSel = true
        setTimeout(() => {
          getOpenCityList(query).then((res) => {
            console.log(res)
            this.options = res.data.filter((item) => {
              return item.name.indexOf(query) > -1
            })
          })
          this.loadingSel = false
        }, 200)
      } else {
        this.options = []
      }
    },
    modClick() {
      this.params.detail = !this.params.detail
    },
    checkForm() {
      let { isPass: formCheckRes = false } = this.$refs.serveInfo.validateFn()
      console.log('🚀 ~ checkForm ~ formCheckRes:', formCheckRes)
    },

    handleLeftFixName(obj) {
      const part = obj.nickName.split('_') // 修正为 split
      obj.nickName = part.slice(1).join('_')
      return obj
    },
    saveFrom() {
      console.log('🚀 ~ saveFrom ~ this.infoObj:', this.infoObj.serveInfo) //前面还需处理一下昵称前缀,这里是没有的
    },
    //下面是表格的
    onLoad(page = {}, params = {}) {
      //接口请求数据
      userNameList({ ...params, limit: page.pageSize, total: page.total, page: page.currentPage })
        .then((res) => {
          console.log('当前返回的list是', res)
          if (res.code === 0) {
            this.data = res.data.list
            this.page.total = res.data.totalCount
          }
        })
        .catch((err) => {
          console.log('ERR异常', err)
        })
    },

    cellStyle({ row, columnIndx }) {
      return ''
    },
    beforeOpen(done, type) {
      if (['add', 'view'].includes(type)) {
        console.log('🚀 ~ beforeOpen ~ type:', type)
      }
      done()
    },
    rowUpdate(row, index, loading, done) {
      loading()
      done()
    },
    rowSave(row, loading, done) {
      loading()
      done()
    },
    setCurrentRow(row, event, column) {
      let index = row.$index
      let val = [this.data[index]]
      this.$refs.crud.toggleSelection(val)
    },
    searchChange(params, done) {
      console.log('params', params)
      this.query = { ...params }
      this.queryStr = JSON.stringify(params)
      this.page.currentPage = 1
      this.onLoad(this.page, params)
      done()
    },
    searchReset() {
      this.query = {}
      this.queryStr = '{}'
      this.page = {
        pageSize: 10,
        currentPage: 1,
        total: 10,
      }
      this.onLoad(this.page)
    },
    selectionChange(list = []) {
      this.selectionList = [...list]
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.crud && this.$refs.crud.toggleSelection()
    },
    currentChange(currentPage = 1) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize = 10) {
      this.page.pageSize = pageSize
    },
  },
  computed: {
    getColumn() {
      return (name = '') => {
        if (['serveInfo'].includes(name)) {
          return this.serveColumns
        }
      }
    },
    option() {
      return {
        size: 'mini', //设置按键大小
        border: true, //边框线
        // dialogDrag: true,//它带的弹框设置拖拽移动
        align: 'center', //表格内容居中,默认居左
        // menuAlign: 'center', //操作栏内容居中,默认居中
        searchLabelWidth: 100, //搜索的文本宽度
        searchGutter: 5, //搜索框之间的间距

        // menu: false, //默认true有操作栏
        addBtn: false, //表格左上方的新增按钮true则展示
        viewBtn: true, //操作里的查看按钮,默认隐藏
        // delBtn: false, //操作里的删除按钮,默认展示
        // editBtn: false, //操作里的编辑按钮,默认展示

        emptyBtnText: '重置', //默认清空-搜索的文本
        addBtnText: '新增', //默认新增-新增按钮的文本
        columnBtn: false, //列隐藏的按键,表格右上角
        searchShowBtn: false, //搜索隐藏的按键
        gridBtn: false, //直接讲表格换了样式column未定义

        searchIcon: true, //启用展开和搜索search
        searchIndex: 3, //默认展示2个搜索条件
        selection: true, //是否可以选择
        span: 24,
        searchSpan: 6, //搜索框宽占比

        // excelBtn: false,
        // filterBtn: false,

        column: [
          {
            label: 'id',
            prop: 'userId',
            slot: true, //插槽
          },
          { label: '昵称', prop: 'nickname', search: true },
          { label: '账号', prop: 'username', search: true },
          { label: '年龄', prop: 'age' },
          { label: '邮箱', prop: 'email' },
          { label: '手机号', prop: 'mobile', search: true },
          { label: '创建时间', prop: 'createTime', search: true },
          {
            label: '备注',
            prop: 'remark',
            search: true, //搜索
            overHidden: true, //字数多悬浮查看
          },
        ],
      }
    },

    serveColumns() {
      return [
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
          display: ['1'].includes(this.infoObj.serveInfo.city),
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'textarea',
          span: 24,
        },
      ]
    },
  },
}
</script>
