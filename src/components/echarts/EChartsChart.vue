<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: 'EChartsChart',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 在mounted钩子函数中初始化图表
      this.chart = this.$echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    },
  },
  beforeDestroy() {
    // 在组件销毁前销毁图表实例，释放资源
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
}
</script>
