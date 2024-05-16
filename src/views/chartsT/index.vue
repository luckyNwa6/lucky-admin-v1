<template>
  <div>
    <el-row :gutter="20" style="margin: 0">
      <el-col :span="17">
        <el-card>
          <div id="lucky_chart" style="min-height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deepClone } from '@/views/common'
import { echartOptions } from '@/views/common/dataZoom.js'
import ResizeMixins from '@/views/common/mixins-resize.js'
import { demoCharts1 } from '@/views/common/echartsOpt.js'
export default {
  mixins: [ResizeMixins],
  data() {
    return {
      myChart: null,
      xLabel: ['8:05', '8:10', '8:15', '8:25', '8:30', '8:35', '8:40', '8:45', '8:55', '9:00', '9:05', '9:10'], //x轴数据
      dataValue: [21, 993, 999991, 121, 0, 0, 0, 0, 0, 0, 0, 0], //y轴数据1
      dataValue1: [1.0, 999.0, 2.0, 1.0, 3, 1, 2, 3.2, 4.5, 5.0, 4.3, 3], //y轴数据2
      dataValue2: [93, 6, 7, 15, 8, 5, 2, 5, 4, 2, 10, 3], //y轴数据3
    }
  },
  mounted() {
    this.demo1()
  },

  methods: {
    demo2() {},
    demo1() {
      let tooltip = {
        trigger: 'axis',
      }
      let dataZoom = deepClone(echartOptions.dataZoom)
      let option = demoCharts1(tooltip, true, this.xLabel, this.dataValue, this.$echarts, this.dataValue1, this.dataValue2)
      this.myChart = this.$echarts.init(document.getElementById('lucky_chart'))
      //最少留下一个图例
      var that = this
      this.myChart.on('legendselectchanged', function (params) {
        console.log(params) // 可以打印看下参数
        let selected = []
        for (let key in params.selected) {
          if (params.selected[key]) {
            selected.push(key)
          }
        }
        if (selected.length < 1) {
          that.myChart.dispatchAction({
            type: 'legendSelect',
            name: params.name,
          })
        }
      })
      this.myChart.setOption(option)
    },
    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()
      // this.$refs.swiper1 && this.$refs.swiper1.resize();
    },
  },
}
</script>
