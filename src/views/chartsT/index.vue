<template>
  <div>
    <el-row :gutter="20" style="margin: 0">
      <el-col :span="17">
        <el-card>
          <div id="lucky_chart" style="min-height: 400px"></div>
        </el-card>
        <el-button @click="resetChart">重置图表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ResizeMixins from '@/views/common/mixins-resize.js'
import { demoCharts1, demoCharts2 } from '@/views/common/echartsOpt.js'
export default {
  mixins: [ResizeMixins],
  data() {
    return {
      myChart: null,
      xLabel: ['7:00', '7:20', '7:40', '8:00', '8:20', '8:40', '9:00', '9:20', '9:40', '10:00'], //x轴数据
      dataValue: [120, 500, 300, 700, 50, 80, 150, 200, 300, 400, 600, 500], // 浓度数据，范围0到1000
      dataValue1: [20.5, 22.0, 25.0, 19.0, 21.5, 24.0, 23.5, 22.5, 20.0, 19.5, 25.0, 24.5], // 温度数据，范围0到100
      dataValue2: [5.0, 7.0, 6.5, 5.5, 6.0, 6.8, 7.2, 6.0, 5.5, 6.5, 7.0, 6.8], // 浊度或pH数据，假设为pH值，范围0到14

      dataYaLi: [7.5, 5.0, 7.0, 6.5, 5.5, 6.0, 6.8, 7.2, 6.0, 5.5], //压力

      xLabel2: ['8:00', '8:20', '8:40', '9:00'], //x轴数据
      dataYaLi2: [4.5, 5.4, 7.2, 6.5, 5.5],
    }
  },
  mounted() {
    this.demo2()
  },

  methods: {
    demo2() {
      this.myChart = this.$echarts.init(document.getElementById('lucky_chart'))

      let optionMain = demoCharts2('', true, this.xLabel, this.dataYaLi, this.$echarts)
      let that = this
      // 监听点击事件
      this.myChart.on('click', function (params) {
        if (params.componentType === 'series') {
          console.log('点击的值:', params.data)
          that.isMainData = !that.isMainData
          if (that.isMainData) {
            that.updateChart(that.xLabel, that.dataYaLi)
          } else {
            that.updateChart(that.xLabel2, that.dataYaLi2)
          }
        }
      })
      this.myChart.setOption(optionMain)
    },
    updateChart(xLabel, dataYaLi) {
      let option = demoCharts2('', true, xLabel, dataYaLi, this.$echarts)
      this.myChart.setOption(option)
    },
    resetChart() {
      this.isMainData = true
      this.updateChart(this.xLabel, this.dataYaLi)
    },
    demo1() {
      let option = demoCharts1('', true, this.xLabel, this.dataValue, this.$echarts, this.dataValue1, this.dataValue2)
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
