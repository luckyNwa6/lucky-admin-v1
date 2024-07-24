<template>
  <div class="green-content">
    <div class="head">
      <p class="title">智慧绿化灌溉平台</p>
    </div>
    <div class="lcr-content">
      <div class="left">
        <div class="left-top"><p class="left-top-title">环境监测数据</p></div>
        <div class="left-time">
          <div style="display: flex; align-items: center">
            <img src="@/assets/screen/时间图标.png" class="conT" />
            <span class="dateD">2024 年 07 月 12 日</span>
            <span class="dateW">星期六</span>
            <span class="dateN">13:45:23</span>
          </div>
          <div style="margin-top: -13px"><img src="@/assets/screen/环境监测数据装饰线.png" class="dateLine" /></div>
        </div>
        <div class="left-weather">
          <div>
            <div style="text-align: center">
              <span class="temperature-v">30</span>
              <span class="temperature-c">℃</span>
            </div>
            <div><img src="@/assets/screen/实时天气.png" /></div>
            <div class="real-time-weather">实时天气</div>
          </div>
          <div>
            <div style="display: flex">
              <div class="box" style="margin: 0 24px 24px">
                <div><img src="@/assets/screen/天气图标.png" /></div>
                <div>
                  <div class="item-title">天气</div>
                  <div class="item-con1 item-po">多云转晴</div>
                </div>
              </div>
              <div class="box">
                <img src="@/assets/screen/湿度图标.png" />
                <div>
                  <div class="item-title">湿度</div>
                  <div class="item-con2 item-po">50%</div>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <div class="box" style="margin: 0 24px 24px">
                <img src="@/assets/screen/温度图标.png" />
                <div>
                  <div class="item-title">温度</div>
                  <div class="item-po">
                    <span class="item-con2" style="line-height: 19px">27</span>
                    <span class="item-con3">℃</span>
                    <span class="item-con2" style="line-height: 19px">-30</span>
                    <span class="item-con3">℃</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <img src="@/assets/screen/风力图标.png" />
                <div>
                  <div class="item-title">风力</div>
                  <div class="item-po">
                    <span class="item-con1" style="line-height: 20px">南风</span>
                    <span class="item-con4">3-4</span>
                    <span class="item-con1" style="line-height: 20px">级</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-top" style="margin-top: 15px"><p class="left-top-title">设备统计</p></div>
        <div class="left-device">
          <div><img class="statistics-img1" src="@/assets/screen/设备统计0.png" /></div>
          <img class="statistics-img2" src="@/assets/screen/设备统计2.png" />
          <div style="display: flex; position: absolute; left: 0px; top: 5px">
            <div class="device-line" style="margin-left: 10px; margin-top: 12px"></div>
            <div class="device-title" style="margin-left: 18px; margin-top: 10px">设备总数</div>
          </div>
          <div style="display: flex; position: absolute; right: 0px; top: 5px">
            <div class="device-title" style="margin-right: 18px; margin-top: 10px">在线设备</div>
            <div class="device-line" style="margin-right: 10px; margin-top: 12px"></div>
          </div>
          <div style="display: flex; position: absolute; left: 0px; top: 125px">
            <div class="device-line" style="margin-left: 10px; margin-top: 2px"></div>
            <div class="device-title" style="margin-left: 18px">告警设备</div>
          </div>
          <div style="display: flex; position: absolute; right: 0px; top: 125px">
            <div class="device-title" style="margin-right: 18px">离线设备</div>
            <div class="device-line" style="margin-right: 10px; margin-top: 2px"></div>
          </div>

          <div style="position: absolute; left: 30px; top: 45px">
            <span class="device-col-value">738</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 370px; top: 45px">
            <span class="device-col-value">637</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 30px; top: 155px">
            <span class="device-col-value">15</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 370px; top: 155px">
            <span class="device-col-value">50</span>
            <span class="device-col-num">台</span>
          </div>
          <el-progress style="position: absolute; left: 172px; top: 31px" :show-text="false" type="circle" :percentage="percentage" :define-back-color="pink"></el-progress>
          <div class="device-percent">
            <span class="device-percent-num">{{ percentageShow }}</span>
            <span class="device-percent-company">%</span>
          </div>
          <div class="device-online-title">设备在线率</div>
        </div>
        <div class="left-top" style="margin-top: 25px"><p class="left-top-title">通知公告</p></div>
        <div class="left-notice"></div>
      </div>
      <div class="center">中间</div>
      <div class="right">右边</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 88,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    }
  },
  computed: {
    percentageShow() {
      return this.percentage
    },
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'PangMenZhengDao';
  src: url('@/assets/fonts/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf') format('opentype');
}

.green-content {
  margin: 0;
  padding: 0;
  background-color: #072830;
  position: relative;
  height: 100vh;
}
.head {
  position: absolute;
  width: 100%;
  height: 298px;
  background: #072830 url(@/assets/screen/头部.png) no-repeat center center;
  .title {
    font-family: PangMenZhengDao;
    font-size: 40px;
    color: #ffffff;
    letter-spacing: 4px;
    text-align: center;
    text-shadow: 0 0 8px #15dfdf;
    font-weight: 400;
    padding-top: 23px;
  }
}

.lcr-content {
  display: flex;
  width: 100%;
  justify-content: left;
}
.left,
.center,
.right {
  z-index: 10;
}
.left {
  .left-top {
    margin-top: 128px;
    margin-left: 32px;
    background: url(@/assets/screen/小标题.png);
    width: 466px;
    height: 38px;

    .left-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }

  .left-time {
    padding-top: 24px;
    .conT {
      margin-left: 32px;
    }
    .dateD,
    .dateW,
    .dateN {
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: #ffcb67;
      letter-spacing: 0;
      line-height: 12px;
      font-weight: 400;
    }
    .dateD {
      margin-left: 6px;
    }
    .dateN {
    }
    .dateLine {
      margin-left: 60px;
    }
  }
  .left-weather {
    display: flex;
    margin-left: 57px;
    margin-top: 33px;
    .temperature-v {
      font-family: DIN-Bold;
      font-size: 20px;
      color: #ffcb6c;
      letter-spacing: 0;
      text-align: justify;
      line-height: 24px;
      font-weight: 700;
    }
    .temperature-c {
      font-family: Helvetica;
      font-size: 16px;
      color: #ffcb6c;
      letter-spacing: 0;
      text-align: justify;
      line-height: 24px;
      font-weight: 400;
    }
    .real-time-weather {
      text-align: center;
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 1px;
      text-align: center;
      font-weight: 400;
      margin-top: -22px;
    }
    .box {
      width: 130px;
      height: 55.83px;
      display: flex;
      align-items: center;
      // background-image: linear-gradient(139deg, rgba(81, 197, 233, 0) 3%, rgba(43, 125, 143, 0.21) 100%);
      background-image: url(@/assets/screen/小卡片背景.png);
      .item-title {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: rgba(223, 255, 255, 0.8);
        letter-spacing: 1px;
        text-align: justify;
        font-weight: 400;
        margin-left: 10px;
      }
      .item-con1 {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 600;
      }
      .item-con2 {
        font-family: DIN-Bold;
        font-size: 16px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 700;
      }
      .item-con3 {
        font-family: Helvetica;
        font-size: 12px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        line-height: 19px;
        font-weight: 400;
      }
      .item-con4 {
        font-family: DIN-Bold;
        font-size: 14px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        line-height: 20px;
        font-weight: 700;
      }
      .item-po {
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
  .left-device {
    margin-left: 32px;
    margin-top: 25px;
    position: relative;
    .statistics-img2 {
      position: absolute;
      top: 15px;
      right: 155px;
    }
    .device-title {
      font-family: SourceHanSansSC-Regular;
      font-size: 16px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 1.14px;
      text-align: justify;
      font-weight: 400;
    }
    .device-line {
      background: #2cffed;
      width: 1px;
      height: 12px;
    }
    .device-col-value {
      font-family: DIN-Bold;
      font-size: 18px;
      color: #ffcb67;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 700;
    }
    .device-col-num {
      font-family: SourceHanSansSC-Regular;
      font-size: 12px;
      color: rgba(223, 255, 255, 0.6);
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
      margin-left: 5px;
    }
    .device-online-title {
      position: absolute;
      left: 202px;
      top: 109px;
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }

    .device-percent {
      position: absolute;
      left: 212px;
      top: 62px;
      .device-percent-num {
        font-family: DIN-Bold;
        font-size: 35px;
        color: #ffcb67;
        letter-spacing: 0;
        text-align: justify;
        line-height: 43px;
        font-weight: 700;
      }
      .device-percent-company {
        font-family: DIN-Bold;
        font-size: 16px;
        color: #ffcb67;
        letter-spacing: 0;
        text-align: justify;
        line-height: 43px;
        font-weight: 700;
      }
    }
  }
}
</style>
<style scoped>
:deep(.el-progress-bar__inner) {
  background-color: unset;
  background-image: linear-gradient(to right, #270b74, #5cfcf6);
}
/deep/ .el-progress-circle__track {
  stroke: rgba(240, 242, 245, 0.303);
}

/deep/ .el-progress--circle .el-progress__text {
  font-size: 16px !important;
  color: #fff !important;
}
</style>
