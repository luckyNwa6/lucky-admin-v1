<template>
  <div class="home">
    <Stars />
    <div style="z-index: 1; position: relative">
      <div class="container-header">
        <ul class="nowTime">
          <li class="time3"></li>
          <li></li>
        </ul>
        <div class="location">
          <button class="signOut" @click="goHome">主页</button>
          <button class="signOut" @click="exitLogin">退出</button>
        </div>
        <h3>大数据共享展板</h3>
      </div>
      <div class="container-content">
        <div class="top">
          <div class="count-base">
            <div class="com-count-title">图元总量构成</div>
            <div class="com-screen-content">
              <pie-chart style="width: 100%; height: 300px" :data="chartData" />
            </div>
            <div v-html="corner"></div>
          </div>
          <div class="count-resource q1">
            <div class="com-count-title">图元总量统计</div>
            <div class="com-screen-content2">
              <ul class="use-data">
                <li v-for="i in chart2Head" :key="i.id">
                  <p class="data-count">{{ i.sum }}</p>
                  <span class="data-name">{{ i.tip }}</span>
                </li>
              </ul>
              <div class="com-screen-content">
                <Chart2 style="margin-top: 10px; width: 100%; height: 240px" :data="chartData2" />
              </div>
              <div v-html="corner"></div>
            </div>
          </div>
          <div class="count-resource q2">
            <div class="com-count-title">令牌库统计</div>

            <div class="com-screen-content">
              <ul class="use-data">
                <li v-for="i in chart2Head" :key="i.id">
                  <p class="data-count">{{ i.sum }}</p>
                  <span class="data-name">{{ i.tip }}</span>
                </li>
              </ul>
              <Chart2 style="margin-top: 10px; width: 100%; height: 240px" :data="chartData3" />
            </div>
            <div v-html="corner"></div>
          </div>
        </div>

        <div class="mid">
          <div class="count-share w1">
            <div class="com-count-title">图元共享次数</div>
            <div class="com-screen-content">
              <div class="topRec_List">
                <dl>
                  <dd>图元名称</dd>
                  <dd>调用方</dd>
                  <dd>调用时间</dd>
                </dl>
                <div class="maquee">
                  <ul>
                    <li v-for="i in shareList" :key="i.id">
                      <div>{{ i.picName }}</div>
                      <div>{{ i.callPerson }}</div>
                      <div>{{ i.callTime }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-html="corner"></div>
          </div>
          <div class="count-share w2">
            <div class="com-count-title">图元共享次数</div>
            <div class="com-screen-content">
              <EChartsChart :option="option5" style="width: 100%; height: 300px" />
            </div>
            <div v-html="corner"></div>
          </div>
        </div>

        <div class="bottom">
          <div class="count-topic e1">
            <div class="com-count-title">接口统计</div>
            <div class="com-screen-content">
              <Chart6 style="width: 100%; height: 300px" :data="chartData6" />
            </div>
            <div v-html="corner"></div>
          </div>
          <div class="count-topic e2">
            <div class="com-count-title">接口共享次数</div>
            <div class="com-screen-content">
              <EChartsChart :option="option7" style="width: 100%; height: 300px" />
            </div>
            <div v-html="corner"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '@/components/Stars.vue'
import PieChart from '@/components/echarts/PieChart.vue'
import Chart2 from '@/components/echarts/Chart2.vue'
import Chart6 from '@/components/echarts/Chart6.vue'
import { option5 } from '@/components/echarts/option5.js' //要抛出default才能直接拿值，不然需要{}
import { option7 } from '@/components/echarts/option7.js'
import EChartsChart from '@/components/echarts/EChartsChart.vue'
import { getNowFormatDateM } from '@/utils/date.js'
import { data1, data2, data4, data6, chart2Head } from '@/assets/js/tempData.js'
export default {
  components: { Stars, PieChart, Chart2, Chart6, EChartsChart },
  data() {
    return {
      timer: null, //定时器用的
      shareList: [], //共享的数据列表可以滚动的
      option1: {},
      chartData: [],
      chartData2: {},
      chartData3: {},
      option5: {},
      chart2Head: {},
      chartData6: {},
      option7: {},
      corner: `<span class="left-top"></span>
            <span class="right-top"></span>
            <span class="left-bottom"></span>
            <span class="right-bottom"></span>`,
    }
  },
  methods: {
    //自动滚动
    autoScroll(obj) {
      $(obj)
        .find('ul')
        .animate(
          {
            marginTop: '-39px',
          },
          500,
          function () {
            $(this).css({ marginTop: '0px' }).find('li:first').appendTo(this)
          }
        )
    },
    // 获取当前时间
    getNowFormatDate() {
      const { currentDate, HMS, time } = getNowFormatDateM()
      $('.nowTime li:nth-child(1)').html(HMS) //时分秒
      $('.nowTime li:nth-child(2)').html(currentDate) //年月日星期
      setTimeout(() => {
        this.getNowFormatDate()
      }, 1000) //每隔1秒重新调用一次该函数
    },
    goHome() {
      this.$router.push('/home')
    },
    exitLogin() {
      this.$router.push('/')
    },
  },
  created() {
    this.shareList = data4
    this.chartData = data1
    this.chartData2 = data2
    this.chartData3 = data2
    this.option5 = option5
    this.option7 = option7
    this.chartData6 = data6
    this.chart2Head = chart2Head
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.getNowFormatDate()
    this.timer = setInterval(() => {
      //只要定时器不被清除或组件不被销毁，autoScroll 函数将会一直运行下去，每隔 2 秒钟执行一次滚动动画
      this.autoScroll('.maquee')
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer) //清除定时器
  },
}
</script>

<style scoped>
@import '@/assets/css/bigData.css';
</style>
