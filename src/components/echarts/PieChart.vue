<template>
  <!-- 组件模板 -->
  <div ref="pieChart" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    // 父组件传递的数据和颜色列表
    data: {
      type: Array, // 数据类型为数组
      required: true, // 必须传递
    },
    colorList: {
      type: Array, // 数据类型为数组
      required: false, // 可以不传递，使用默认值
      default: function () {
        return ['#8fc31f', '#f35833', '#00ccff', '#ffcc00', '#f5e965', '#a74faf', '#ff9668', 'pink']
      }, // 默认颜色列表
    },
  },
  mounted() {
    // 初始化echarts实例，将基于refs获取到的DOM节点传入
    this.pieChart = this.$echarts.init(this.$refs.pieChart)

    // 使用指定的配置项和数据显示图表
    this.pieChart.setOption({
      tooltip: {
        // 鼠标悬浮时的提示框
        trigger: 'item', // 触发类型，即当鼠标悬浮在数据项上时显示提示框
        formatter: '{a} <br/>{b} : {c} ({d}%)', // 提示框内容，包括系列名、数据项名称和百分比
      },
      color: this.colorList, // 指定颜色列表
      series: [
        // 系列列表，此处只有一个数据项
        {
          name: '图元总量构成', // 数据项名称
          type: 'pie', // 图表类型为饼图
          radius: '40%', // 饼图半径
          center: ['50%', '50%'], // 饼图中心点
          data: this.data, // 数据项，包含value和name两个属性
          itemStyle: {
            // 图形样式
            emphasis: {
              // 高亮时的样式
              shadowBlur: 10, // 阴影模糊度
              shadowOffsetX: 0, // 阴影水平偏移量
              shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色，使用rgba格式
            },
          },
          label: {
            // 标签设置
            show: true, // 显示标签
            formatter: '{b} : {c} ({d}%)', // 标签内容，包括数据项名称、数值和百分比
            fontSize: 14, // 标签字号
            textStyle: {
              // 标签字体样式
              color: 'auto', // 自适应字体颜色
            },
          },
          labelLine: { show: true }, // 标签线条设置
        },
      ],
    })
  },
  beforeDestroy() {
    // 销毁echarts实例
    this.pieChart.dispose()
  },
}
</script>
