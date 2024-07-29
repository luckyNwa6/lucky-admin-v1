// 智慧绿化灌溉平台配置开始......
//配置1
export const greenOpt = (xData, yData, echarts) => {
  return {
    grid: {
      left: '1%',
      right: '1%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      data: xData,
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: '#ccedf4',
        },
      },
      axisLabel: {
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#92ACB4',
        lineHeight: 12,
        fontWeight: 400,
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
    },
    yAxis: {
      name: 'm³',
      nameGap: 25,
      nameTextStyle: {
        align: 'right', // 设置文本右对齐
        padding: [0, 8, 0, 0], // 设置文本右对齐
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#92ACB4',
        lineHeight: 12,
        fontWeight: 400,
      },
      type: 'value',
      axisTick: { show: false },
      axisLine: {
        show: false, lineStyle: {
          fontFamily: 'SourceHanSansSC-Regular',
          fontSize: 12,
          color: '#92ACB4',
          lineHeight: 12,
          fontWeight: 400,
        }
      },
      splitLine: { show: true, lineStyle: { color: '#355961', type: 'dashed' } },

    },
    series: [
      {
        name: 'm³',
        type: 'line',
        symbol: 'none',
        smooth: true,
        yAxisIndex: 0,
        color: '#74E6FF',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(116,230,255,0.35)',
                },
                // {
                //   offset: 0.6,
                //   color: '#d6f4fa',
                // },
                {
                  offset: 1,
                  color: 'rgba(116,230,255,0.00)',
                },
              ],
              false
            ),
          },
        },
        data: yData,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: { width: 3 },
      },
    ],
  };
};
//配置2
export const greenPieOpt = (percentage, echarts) => {
  let data = {
    value: [percentage],
  };
  return {
    title: {
      // text: data.value[0] + '%',//标题不能分开设置样式，采用自定义
      // textStyle: {
      //   color: '#FFCB67',
      //   fontSize: 35
      // },
      subtext: '设备在线率',
      subtextStyle: {
        color: 'rgba(223, 255, 255, 0.8)',
        fontSize: 14
      },
      itemGap: 30,
      left: 'center',
      top: 'center'//控制文本
    },

    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        left: '38%', // 调整文本位置，使其不重叠
        style: {
          text: percentage,
          fill: '#ffcb67',
          fontSize: 35,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '48%',
        left: "center",
        left: '58%', // 调整文本位置，使其不重叠
        style: {
          text: '%',
          fill: '#ffcb67',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      }
    ],
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      show: false,      // 隐藏刻度线
      startAngle: 110
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    polar: [
      {
        center: ['50%', '53%'], //中心点位置
        radius: '145%' //图形大小
      }
    ],
    series: [
      {
        type: 'bar',
        z: 10,
        data: data.value,
        showBackground: false,
        backgroundStyle: {
          color: 'blue',
          borderWidth: 10,
          width: 100
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 5, //大的占比环
        itemStyle: {
          normal: {
            // opacity: 1,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 255, 255, 0)'
              },
              {
                offset: percentage / 100,
                color: 'rgba(255, 255, 255, 1)'
              }
            ]),
            // shadowBlur: 5,
            // shadowColor: '#FFCC1F'
          }
        }
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['72%', '76%'],
        center: ['50%', '53%'], // 将内层细圆环往上移动10px
        startAngle: 90,
        hoverAnimation: false,
        clockWise: true,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [//右上到左下渐变
              {
                offset: 0,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.25,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.5,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 0.75,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(14, 195, 220, 0.08)'
              }
            ])
          }
        },
        tooltip: {
          show: false
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  }
};

// 绿色大屏配置结束......
