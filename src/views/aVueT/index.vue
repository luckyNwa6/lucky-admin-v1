<!--  -->
<template>
  <div class="content">
    <avue-crud
      ref="crud"
      key="videoEquipment-avue"
      :data="table_list"
      :option="option"
      :table-loading="showLoading"
      :page.sync="page"
      :search.sync="param"
      @search-change="searchChange"
      @size-change="sizeChange"
      @current-change="currentChange"
    >

      <template slot="timeRangeSearch" slot-scope="{size}">
        <el-date-picker
          v-model="param.timeRange"
          :type="timeType"
          :size="size"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :clearable="false"
          :picker-options="pickerOptions"
        />
      </template>
      <template slot="searchMenu" slot-scope="{ size }">
        <el-button :size="size" type="primary" class="ml-10" @click="onExport">导出</el-button>
        <el-upload
          style="display: inline-block; margin-left:10px"
          :show-file-list="false"
          action
          :http-request="uploadFile"
          :before-upload="beforeFileUpload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        >
          <el-button :size="size" type="primary" plain :loading="import_loading">导入</el-button>
        </el-upload>
        <a href="#" style="margin-left:10px;color:#0094FF;text-decoration:underline" @click="importTemplate">导入模板</a>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { CURDMIXIN } from '@/utils/curd-mixin'
import { exportFile, fmtTime } from '@/utils/index'
import apis from '@/api/thirdData'

export default {
  name: 'MeterReadingData',
  components: {},
  mixins: [CURDMIXIN],
  data() {
    return {
      showLoading: false,
      import_loading: false,
      export_loading: false,
      down_loading: false,
      screen: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0, // 分页总数
      table_list: [],
      statusOptions: [
        { label: '开', value: 0 },
        { label: '关', value: 1 }
      ],
      timeList: [
        { label: '日', value: 1 },
        { label: '月', value: 2 }
      ],
      param: {
        deviceId:'',
        type: 1,
        timeRange: []
      },
      pickDate: '',
      pickerOptions: {
        onPick: this.getPickDate,
        disabledDate: this.disabledDate // 限制时间跨度30天
      }
    }
  },
  computed: {
    timeType() {
      return this.param.type === 1 ? 'daterange' : 'monthrange'
    },
    option() {
      return {
        // 32 + 20 + 50 + 77 + 61 + 45 = 245
        height: 'calc(100vh - 290px)',
        header: false,
        index: false,
        delBtn: false,
        editBtn: false,
        addBtn: false,
        // searchBtn: false,
        viewBtn: false,
        selection: false,
        columnBtn: false,
        refreshBtn: false,
        // height: 590,
        menuWidth: 300,
        searchMenuSpan: 8,
        searchMenuPosition: 'left',
        searchMenuLable: 'auto',
        searchBtnText: '查询',
        emptyBtn: false,
        indexLabel: '序号',
        labelWidth: '100',
        searchLabelWidth: '100',
        dialogWidth: '600',
        gutter: 10,
        menu: false,
        column: [
          {
            label: '设备编号',
            prop: 'deviceId',
            overHidden: true,
            searchLabel: '',
            search:true,
            searchPlaceholder: '设备编号',
            searchSpan: 3,
            searchLabelWidth: '0',
                    change: ({ column, value }) => {
          // 在这里处理输入框变化事件
          // 可以将输入框的值保存到组件的 data 中，用于查询
          this.param.deviceId = value;
        }
          },
          {
            label: '设备名称',
            prop: 'deviceName',
            overHidden: true
          },
          {
            label: '流量/m³',
            prop: 'flow',
            overHidden: true
          },
          {
            label: '海拔水位/m',
            prop: 'elevationLevel',
            overHidden: true
          },
          {
            label: '地表水位/m',
            prop: 'surfaceLevel',
            overHidden: true
          },
          {
            label: '采集时间',
            prop: 'dataTime',
            overHidden: true
          },
          {
            label: '日期类型',
            prop: 'type',
            hide: true,
            searchSpan: 2,
            search: true,
            searchPlaceholder: '日期类型',
            searchLabel: '',
            searchLabelWidth: '0',
            type: 'select',
            searchClearable: false,
            dicData: this.timeList,
            change: ({ column, value }) => {
              const end = new Date()
              const start = new Date()
              if (value === 1) {
                start.setDate(1)
              }
              this.param.timeRange = [start, end]
            }
          },
          {
            label: '时间范围',
            prop: 'timeRange',
            hide: true,
            searchLabel: '',
            searchLabelWidth: '0',
            search: true,
            searchSpan: 5
          }
        ]
      }
    }
  },
  created() {
    this.param.timeRange = this.initDayTime()

    // this.getTableList()
    this.searchChange()
  },
  methods: {
    initDayTime() {
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      return [start, end]
    },
    getPickDate(pick) {
      this.pickDate = pick
    },
    disabledDate(date) {
      const { minDate, maxDate } = this.pickDate
      if (minDate && !maxDate) {
        if (minDate.getMonth() !== date.getMonth() || minDate.getFullYear() !== date.getFullYear()) {
          return true
        }
        // const diff = Math.abs(minDate.valueOf() - date.valueOf())
        // if (diff > 1000 * 60 * 60 * 24 * 30) {
        //   return true
        // }
      }
    },
    async searchChange(params, done) {
      this.$set(this.screen, 'pageNum', 1)

      const temp = this.param.type === 1 ? 'yyyy-MM-dd' : 'yyyy-MM'
      const tr = this.param.timeRange || []
      this.screen.startTime = tr?.length ? fmtTime(tr[0], temp) : ''
      this.screen.endTime = tr?.length ? fmtTime(tr[1], temp) : ''
      Object.assign(this.screen, this.param)
      delete this.screen.timeRange
      delete this.screen.$type
      await this.getTableList()
      if (done) done()
    },
    // 获取列表数据
    async getTableList() {
      this.showLoading = true
      try {
        const res = await apis.page(this.screen)
        // const res = await apis.page()
        console.log('res: ', res)
        this.table_list = res.success ? res.data.records : []
        this.total = res.success ? res.data.total : 0
        if (!res.success) {
          this.$message.error(res.message || '获取数据失败，请稍后重试')
        }
      } catch (err) {
        console.log('---获取列表数据err---', err)
      }
      this.showLoading = false
    },
    getFileType(fileName) {
      var startIndex = fileName.lastIndexOf('.')
      if (startIndex !== -1) {
        return fileName.substring(startIndex + 1, fileName.length).toLowerCase()
      } else {
        return ''
      }
    },
    // 文件格式&大小校验
    beforeFileUpload(file) {
      const sizeLimit = file.size / 1024 / 1024 < 10
      const type = this.getFileType(file.name)
      // , 'txt', 'pdf'
      const isAllow = ['xls', 'xlsx'].includes(type)
      if (!sizeLimit) {
        this.$message.error('上传文件大小不能超过 10MB!')
      } else if (!isAllow) {
        this.$message.error('上传文件类型需要为excel,文件后缀名.xlsx或.xls!')
      }
      return sizeLimit && isAllow
    },
    // 导入
    async uploadFile(fileObj) {
      this.import_loading = true
      try {
        const formData = new FormData()
        formData.append('file', fileObj.file)
        // const res = await apis.import(formData)
        // if (res.success) {
        //   this.$message.success(res.message)
        //   this.searchReset()
        // } else {
        //   this.$message.error(res.message)
        // }
      } catch (err) {
        console.log(err)
      }
      this.import_loading = false
    },
    // 导出
    async onExport() {
      // todo 限制30天？
      this.export_loading = true
      try {
        const temp = this.param.type === 1 ? 'yyyy-MM-dd' : 'yyyy-MM'
        const tr = this.param?.timeRange || []
        // const res = await apis.export({
        //   queryType: this.param.type,
        //   startTime: tr?.length ? fmtTime(tr[0], temp) : '',
        //   endTime: tr?.length ? fmtTime(tr[1], temp) : ''
        // })

        // if (res.message) {
        //   this.$message.error(res.message)
        // } else {
        //   const blob = new Blob([res])
        //   const fileName = '三方数据.xls'
        //   exportFile({
        //     fileName: fileName,
        //     blob: blob
        //   })
        // }
      } catch (err) {
        console.log(err)
      }
      this.export_loading = false
    },
    async importTemplate() {
      try {
        this.down_loading = true
        // const res = await apis.exportTemplate()
        // if (res.message) {
        //   this.$message.error(res.message)
        // } else {
        //   const blob = new Blob([res])
        //   const fileName = '三方数据导入模板.xls'
        //   exportFile({
        //     fileName: fileName,
        //     blob: blob
        //   })
        // }
      } catch (err) {
        console.log(err)
      }
      this.down_loading = false
    }
  }
}
</script>

<style  scoped>
.avue-crud {
  height: 100%;
}
.content {
  padding: 16px;
  background: #fff;
  height: 100%;
  overflow: auto;


}
.mr-10 {
    margin-right: vh(10);
  }
</style>
