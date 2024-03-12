<template>
  <div ref="chart6" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'MyChart6',
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
      var areaNameS = []
      if (data.uploadData) {
        for (var i = 0; i < data.uploadData.length; i++) {
          uploadCnt.push(data.uploadData[i].count)
          areaNameS.push(data.uploadData[i].areaName)
        }
      }
      if (data.updateData) {
        for (var i = 0; i < data.updateData.length; i++) {
          updateCnt.push(data.updateData[i].count)
        }
      }
      if (data.viewData) {
        for (var i = 0; i < data.viewData.length; i++) {
          viewCnt.push(data.viewData[i].count)
        }
      }

      const chart6 = this.$echarts.init(this.$refs.chart6)
      const option = {
        tooltip: {
          // 提示框组件
          trigger: 'axis', // 触发类型，鼠标移动到数据项上时显示提示
          transitionDuration: 0, // 提示框浮层的移动动画过渡时间，单位毫秒（默认为200）
          backgroundColor: 'rgba(83,93,105,0.8)', // 提示框浮层的背景颜色
          borderColor: '#535b69', // 提示框浮层的边框颜色
          borderRadius: 8, // 提示框浮层的圆角半径
          borderWidth: 2, // 提示框浮层的边框线宽
          padding: [5, 10], // 提示框浮层内边距
          formatter: function (params, ticket, callback) {
            // 格式化提示框浮层内容的回调函数
            var res = ''
            for (var i = 0, l = params.length; i < l; i++) {
              res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>'
            }
            return res
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed',
              color: '#ffff00',
            },
          },
        },
        grid: {
          // 图表的网格位置
          top: '40', // 网格距离容器顶部的距离
          left: '30', // 网格距离容器左侧的距离
          right: '10', // 网格距离容器右侧的距离
          bottom: '40', // 网格距离容器底部的距离
          textStyle: {
            color: '#fff', // 网格中的文字颜色
          },
        },
        legend: {
          // 图例组件
          right: '24', // 图例组件距离容器右侧的距离
          top: '24', // 图例组件距离容器顶部的距离
          itemWidth: 8, // 图例标记的图形宽度
          itemHeight: 12, // 图例标记的图形高度
          textStyle: {
            color: '#fff', // 图例中的文字颜色
            fontSize: 14, // 图例中的文字字号
          },
          data: ['资源总量'], // 图例的数据项名称
        },
        calculable: true, // 是否可计算拖拽重计算
        xAxis: [
          {
            // X轴设置
            type: 'category', // 坐标轴类型为类目型
            axisTick: {
              show: false, // 不显示坐标轴刻度线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
              lineStyle: {
                color: '#868c96', // 坐标轴线的颜色
              },
            },
            axisLabel: {
              interval: 0, // 强制显示所有类目
              fontSize: 14, // 坐标轴标签的字号大小
              formatter: function (value) {
                var ret = '' // 拼接加\n返回的类目项
                var maxLength = 2 // 每项显示文字个数
                var valLength = value.length // X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = '' // 每次截取的字符串
                    var start = i * maxLength // 开始截取的位置
                    var end = start + maxLength // 结束截取的位置
                    temp = value.substring(start, end) + '\n'
                    ret += temp // 凭借最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              },
            },
            splitArea: {
              show: false, // 不显示分隔区域
            },
            data: areaNameS, // X轴的数据项
            splitLine: {
              show: false, // 不显示分隔线
            },
          },
        ],
        yAxis: [
          {
            // Y轴设置
            type: 'value', // 坐标轴类型为数值型
            offset: -14, // Y轴相对于默认位置的偏移量
            splitLine: {
              show: false, // 不显示分隔线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
              lineStyle: {
                color: '#868c96', // 坐标轴线的颜色
              },
            },
            axisTick: {
              show: false, // 不显示坐标轴刻度线
            },
            axisLabel: {
              interval: 0, // 强制显示所有标签
              fontSize: 14, // 坐标轴标签的字号大小
            },
            splitArea: {
              show: false, // 不显示分隔区域
            },
          },
        ],
        series: [
          {
            // 第一个系列（柱状图）
            name: '资源总量', // 系列名称
            type: 'bar', // 图表类型为柱状图
            barGap: '10%', // 柱间距离
            itemStyle: {
              // 图形样式
              normal: {
                color: '#4a4df0', // 图形颜色
              },
            },
            label: {
              normal: {
                show: true, // 显示标签（柱状图顶部的数据值）
                position: 'top', // 标签的位置
                textStyle: {
                  color: '#ffc72b', // 标签的文字颜色
                  fontSize: 10, // 标签的文字字号大小
                },
              },
            },
            data: uploadCnt, // 数据项
            barWidth: 14, // 柱状图的宽度
          },
          {
            // 第二个系列（折线图）
            name: '折线', // 系列名称
            type: 'line', // 图表类型为折线图
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                color: '#c7b198', // 折线的颜色
              },
            },
            data: [5421, 6512, 4621, 2842, 6427, 4422, 1020, 1421, 1776, 2428], // 数据项
          },
        ],
      }
      chart6.setOption(option)
    },
  },
}
</script>

<style scoped></style>
