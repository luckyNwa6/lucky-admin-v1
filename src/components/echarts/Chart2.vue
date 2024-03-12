<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'MyChart',
  props: {
    data: {
      type: Object, // 数据类型为数组
      required: true, // 必须传递
    },
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      var data = this.data
      var uploadCnt = []
      var updateCnt = []
      var viewCnt = []

      if (data.uploadData != null) {
        for (var i = 0; i < data.uploadData.length; i++) {
          uploadCnt.push(data.uploadData[i].count)
        }
      }
      if (data.updateData != null) {
        for (var i = 0; i < data.updateData.length; i++) {
          updateCnt.push(data.updateData[i].count)
        }
      }

      if (data.viewData != null) {
        for (var i = 0; i < data.viewData.length; i++) {
          viewCnt.push(data.viewData[i].count)
        }
      }
      const chart = this.$echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var res = ''
            for (var i = 0, l = params.length; i < l; i++) {
              res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>'
            }
            return res
          },
          transitionDuration: 0,
          backgroundColor: 'rgba(83,93,105,0.8)',
          borderColor: '#535b69',
          borderRadius: 8,
          borderWidth: 2,
          padding: [5, 10],
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed',
              color: '#ffff00',
            },
          },
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 10,
          top: '16',
          right: '10',
          data: ['数据总量', '共享次数', '更新量'],
          textStyle: {
            fontSize: 14,
            color: '#a0a8b9',
          },
        },
        grid: {
          top: '46',
          left: '13%',
          right: '10',
          containLabel: false,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              fontSize: 14,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#a0a8b9',
              },
            },
            axisTick: {
              show: false,
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            offset: 10,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#a0a8b9',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#2b3646',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '图元总量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)',
                  },
                ]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: '#1cc840',
              },
            },
            data: uploadCnt,
          },
          {
            name: '共享次数',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)',
                  },
                ]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: '#eb5690',
              },
            },
            data: viewCnt,
          },
          {
            name: '更新量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)',
                  },
                ]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: '#43bbfb',
              },
            },
            data: updateCnt,
          },
        ],
      }
      chart.setOption(option)
    },
  },
}
</script>

<style scoped></style>
