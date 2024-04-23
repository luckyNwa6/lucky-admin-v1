<template>
<div>
  <el-row :gutter="20" style="margin: 0 ;">
    <el-col :span="17">
      <el-card>
        <div id="lucky_chart" style="min-height: 400px"></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row style="width:100%;">
    <img style="max-width:100%; max-height:100%;" src="@/assets/imgs/11.png" alt="">
  </el-row>
</div>
</template>

<script>
import {
  deepClone
} from '@/views/common'
import {
  echartOptions
} from '@/views/common/dataZoom.js'
import ResizeMixins from '@/views/common/mixins-resize.js'
export default {
  mixins: [ResizeMixins],
  data() {
    return {
      chartLine: null,
      myChart: null,
      chartPie: null,
      chartScatter: null,
    }
  },
  mounted() {
    this.initLuckyChart()
  },

  methods: {
    initLuckyChart() {
      let dataZoom = deepClone(echartOptions.dataZoom)

      let xLabel = ['8:05', '8:10', '8:15', '8:25', '8:30', '8:35', '8:40', '8:45', '8:55', '9:00', '9:05', '9:10'] //x轴数据
      let dataValue = [120, 130, 140, 135, 134, 115, 156, 115, 112, 215, 134, 142] //y轴数据1
      let dataValue1 = [1.0, 3.0, 2.0, 1.0, 3, 1, 2, 3.2, 4.5, 5.0, 4.3, 3] //y轴数据2
      let dataValue2 = [3, 6, 7, 15, 8, 5, 2, 5, 4, 2, 10, 3] //y轴数据3

      let colors = ['#a5c5d4', '#91CC75', '#EE6666'] //颜色
      let option = {
        dataZoom: dataZoom,
        color: colors,
        tooltip: {
          //悬浮放上面的提示
          trigger: 'axis', //坐标轴触发
          axisPointer: {
            type: 'line', //直线指示器
          },
        },
        grid: {
          right: '20%', //echarts离容器左侧的距离
        },
        toolbox: {
          //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          feature: {
            dataView: {
              show: true,
              readOnly: false
            }, //数据视图
            restore: {
              show: true
            }, //重置
            saveAsImage: {
              show: true
            }, //下载
          },
        },
        legend: {
          //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
          data: ['浊度', 'PH', '水温'], //就是图表上面正中间那3，点击某个某个就能隐藏
        },
        xAxis: [{
          type: 'category', //类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据
          boundaryGap: false, //false从0开始,最少x会放0位置
          axisTick: {
            show: false,
            //坐标轴刻度|和数据是对齐的，加上这个
            alignWithLabel: false,
          },
          // prettier-ignore
          data: xLabel, //x轴数据
        }, ],
        yAxis: [
          //直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
          {
            type: 'value', //适用于连续数据
            name: '浊度（ntu）', //坐标轴名称
            position: 'left', //左边
            alignTicks: true, //开启该配置项自动对齐刻度
            min: 0, //初始
            max: 1000, //结束值
            interval: 200, //间距   如果没这3，会自适应数据
            axisLine: {
              show: false, //y轴|  是否显示
              lineStyle: {
                color: colors[0], //颜色
              },
            },
            splitLine: {
              //隐藏纵轴的横线
              show: true, //展示
              lineStyle: {
                color: '#DCDFE6 ', //虚线颜色
                type: 'dashed', //虚线
              },
            },
            axisLabel: {
              //纵轴文字,就是0 200 400 600 800 1000
              show: true,
              formatter: '{value} ',
            },
          },
          {
            type: 'value', //适用于连续数据
            name: 'PH',
            position: 'right', //右边
            alignTicks: true, //开启该配置项自动对齐刻度
            min: 0, //初始
            max: 14, //结束值
            interval: 3, //间距   如果没这3，会自适应数据
            splitLine: {
              show: false, //y轴|  是否显示
              lineStyle: {
                color: '#1160a0',
                type: 'solid', //实体线
              },
            },
            axisLine: {
              //纵轴文字,就是0 3 6 9 12 14
              show: false,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: '{value} ',
            },
          },
          {
            type: 'value',
            name: '水温（°C）',
            show: true, // 添加该配置来隐藏水温纵轴
            position: 'right',
            alignTicks: true,
            min: 0,
            max: 100,
            interval: 20,
            offset: 80, //向右偏移80
            axisLine: {
              show: false, //y轴|  是否显示
              lineStyle: {
                color: colors[2],
              },
            },
            splitLine: {
              //隐藏纵轴的横线
              show: false,
              lineStyle: {
                color: '#DCDFE6 ',
                type: 'dashed',
              },
            },
            axisLabel: {
              //纵轴文字
              formatter: '{value} ',
            },
          },
        ],
        series: [
          //数据
          {
            name: '浊度',
            type: 'line', //折线
            symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
            smooth: true, //是否平滑
            color: '',
            areaStyle: {
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [{
                      offset: 0,
                      color: '#bed4e5',
                    },
                    {
                      offset: 0.6,
                      color: '#aac8d9',
                    },
                    {
                      offset: 1,
                      color: '#9dbec9',
                    },
                  ],
                  false
                ),
              },
            },
            data: dataValue,
          },
          {
            name: 'PH',
            type: 'line',
            yAxisIndex: 1, //默认是0就左边那个y轴，1是右边第一个
            data: dataValue1,
          },
          {
            name: '水温',
            type: 'bar',
            labelLayout: {
              hideOverlap: true,
            },

            barMaxWidth: 10, //粗细
            yAxisIndex: 2,
            color: '#FFAF14 ',
            label: {
              show: false, // 显示标签
              position: 'top', // 标签位置
              formatter: '{c}℃', // 添加单位“℃”，{c}表示数值
              color: '#FFAF14', // 标签颜色
              fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 标签字体
              fontSize: 10, // 标签字体大小
              distance: 5,
            },
            data: dataValue2,
          },
        ],
      }

      let myChart = this.$echarts.init(document.getElementById('lucky_chart'))
      this.myChart = myChart
      myChart.on('legendselectchanged', function (params) {
        console.log(params) // 可以打印看下参数
        let selected = []
        for (let key in params.selected) {
          if (params.selected[key]) {
            selected.push(key)
          }
        }

        if (selected.length < 1) {
          myChart.dispatchAction({
            type: 'legendSelect',
            name: params.name,
          })
        }
      })
      myChart.setOption(option)
    },
    onResize() {
      this.myChart && this.myChart.resize()
      // this.$refs.swiper1 && this.$refs.swiper1.resize();
    },
  },
}
</script>
