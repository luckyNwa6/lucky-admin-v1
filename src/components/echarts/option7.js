export const option7 = {
  color: [
    '#ff2600',
    '#ffc000',
    '#00ad4e',
    '#0073c2',
    '#165868',
    '#e76f00',
    '#316194',
    '#723761',
    '#00b2f1',
    '#4d6022',
    '#4b83bf',
    '#f9c813',
    '#0176c0',
  ], // 柱状图颜色列表
  tooltip: {
    // 鼠标悬浮时的提示框配置
    trigger: 'axis', // 触发类型为坐标轴
    transitionDuration: 0, // 提示框动画过渡时间
    backgroundColor: 'rgba(83,93,105,0.8)', // 提示框背景颜色
    borderColor: '#535b69', // 提示框边框颜色
    borderRadius: 8, // 提示框圆角半径
    borderWidth: 2, // 提示框边框宽度
    padding: [5, 10], // 提示框内边距
    formatter: function (params, ticket, callback) {
      // 提示框内容格式化函数
      var res = ''
      for (var i = 0, l = params.length; i < l; i++) {
        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>' // 拼接系列名称和对应的数值
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
  toolbox: {
    show: true, // 显示工具栏
    feature: {
      mark: {
        show: true,
      },
    },
  },
  grid: {
    borderWidth: 0, // 网格边框宽度
    top: '40', // 上边距
    left: '30', // 左边距
    right: '10', // 右边距
    bottom: '40', // 下边距
    textStyle: {
      color: '#fff', // 文字颜色
    },
  },
  xAxis: [
    {
      type: 'category', // 类目轴
      axisTick: {
        show: false, // 不显示刻度线
      },
      axisLine: {
        show: false, // 不显示轴线
        lineStyle: {
          color: '#868c96', // 轴线颜色
        },
      },
      axisLabel: {
        interval: 0, // 强制显示所有类目
        fontSize: 14, // 字体大小
        formatter: function (value) {
          var ret = '' // 拼接加\n返回的类目项
          var maxLength = 2 // 每项显示文字个数
          var valLength = value.length // X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
          if (rowN > 1) {
            // 如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = '' // 每次截取的字符串
              var start = i * maxLength // 开始截取的位置
              var end = start + maxLength // 结束截取的位置
              // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
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
        show: false,
      },
      data: ['电力部门', '水利部门', '海外部门', '物联网', '消防部门', '平台研发', '其他'], // X轴数据
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value', // 数值轴
      offset: -14, // 偏移量
      splitLine: {
        show: false, // 不显示分隔线
      },
      axisLine: {
        show: false, // 不显示轴线
        lineStyle: {
          color: '#868c96', // 轴线颜色
        },
      },
      axisTick: {
        show: false, // 不显示刻度线
      },
      axisLabel: {
        interval: 0, // 强制显示所有标签
        fontSize: 14, // 字体大小
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '共享次数', // 系列名称
      type: 'bar', // 柱状图
      data: [2912, 3991, 4621, 3941, 3313, 6631, 5543, 4463, 6541, 3381], // 数据
      itemStyle: {
        normal: {
          color: function (params) {
            // 柱状图颜色
            var colorList = [
              '#ff2600',
              '#ffc000',
              '#00ad4e',
              '#0073c2',
              '#165868',
              '#e76f00',
              '#316194',
              '#723761',
              '#00b2f1',
              '#4d6022',
              '#4b83bf',
              '#f9c813',
              '#0176c0',
            ]
            return colorList[params.dataIndex]
          },
        },
      },
      barWidth: 14, // 柱状图宽度
      label: {
        normal: {
          show: true, // 显示标签
          position: 'top', // 标签位置
          textStyle: {
            color: '#ffc72b', // 标签文字颜色
            fontSize: 10, // 标签文字大小
          },
        },
      },
    },
    {
      name: '折线', // 系列名称
      type: 'line', // 折线图
      itemStyle: {
        normal: {
          color: '#d3d5fd', // 折线颜色
        },
      },
      data: [2912, 3991, 4621, 3941, 3313, 6631, 5543, 4463, 6541, 3381], // 数据
    },
  ],
}
