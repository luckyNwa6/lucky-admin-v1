export const option5 = {
  backgroundColor: '', // 背景颜色
  xAxis: {
    axisTick: {
      show: false, // 是否显示刻度
    },
    splitLine: {
      show: false, // 是否显示分割线
    },
    splitArea: {
      show: false, // 是否显示分割区域
    },
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月'], // X轴数据
    axisLabel: {
      formatter: function (value) {
        // 格式化X轴标签
        var ret = '' // 拼接加\n返回的类目项
        var maxLength = 1 // 每项显示文字个数
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
      interval: 0, // X轴标签显示间隔
      fontSize: 14, // 字体大小
      fontWeight: 100, // 字体粗细
      textStyle: {
        color: '#9faeb5', // 字体颜色
      },
    },
    axisLine: {
      lineStyle: {
        color: '#4d4d4d', // 坐标轴线颜色
      },
    },
  },
  yAxis: {
    axisTick: {
      show: false, // 是否显示刻度
    },
    splitLine: {
      show: false, // 是否显示分割线
    },
    splitArea: {
      show: false, // 是否显示分割区域
    },

    axisLabel: {
      textStyle: {
        color: '#9faeb5', // 字体颜色
        fontSize: 16, // 字体大小
      },
    },
    axisLine: {
      lineStyle: {
        color: '#4d4d4d', // 坐标轴线颜色
      },
    },
  },
  tooltip: {
    trigger: 'axis', // 提示框的触发类型
    transitionDuration: 0, // 提示框浮层动画的时间
    backgroundColor: 'rgba(83,93,105,0.8)', // 提示框背景颜色
    borderColor: '#535b69', // 提示框边框颜色
    borderRadius: 8, // 提示框圆角
    borderWidth: 2, // 提示框边框宽度
    padding: [5, 10], // 提示框内边距
    formatter: function (params, ticket, callback) {
      // 格式化提示框内容
      var res = ''
      for (var i = 0, l = params.length; i < l; i++) {
        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>'
      }
      return res
    },
    axisPointer: {
      type: 'line', // 指示器类型
      lineStyle: {
        type: 'dashed', // 指示线样式
        color: '#ffff00', // 指示线颜色
      },
    },
  },
  series: [
    {
      name: '共享次数', // 系列名称
      type: 'bar', // 图表类型
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00d386', // 渐变起始颜色
              },
              {
                offset: 1,
                color: '#0076fc', // 渐变结束颜色
              },
            ],
            globalCoord: false, // 是否使用全局坐标系
          },
          barBorderRadius: 15, // 柱状图圆角
        },
      },
      label: {
        normal: {
          show: true, // 是否显示标签
          position: 'top', // 标签位置
          textStyle: {
            color: '#ffc72b', // 标签字体颜色
            fontSize: 10, // 标签字体大小
          },
        },
      },
      data: [1243, 2315, 1164, 3021, 3521, 4121, 2001, 1983, 1432], // Y轴数据
      barWidth: 16, // 柱状图宽度
    },
    {
      name: '折线', // 系列名称
      type: 'line', // 图表类型
      itemStyle: {
        /*设置折线颜色*/
        normal: {
          /* color:'#c4cddc'*/
        },
      },
      data: [1243, 2315, 1164, 3021, 3521, 4121, 2001, 1983, 1432], // Y轴数据
    },
  ],
}
