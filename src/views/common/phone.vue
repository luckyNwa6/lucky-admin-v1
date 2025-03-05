<template>
  <div class="container">
    <!-- 输入区域 -->
    <div class="input-section">
      <el-row type="flex" justify="center">
        <el-col :xs="23" :sm="20" :md="16" :lg="12" :xl="10">
          <div class="input-wrapper">
            <el-input
              v-model="phoneNumber"
              placeholder="请输入11位手机号码"
              clearable
              @keyup.enter.native="queryLocation"
              @clear="clearData"
              class="custom-input"
            >
              <template slot="prepend">
                <i class="el-icon-mobile-phone"></i>
              </template>
              <template slot="append">
                <el-button type="primary" icon="el-icon-search" :loading="loading" @click="queryLocation">查询</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 结果展示区域 -->
    <div class="result-section">
      <el-row type="flex" justify="center">
        <el-col :xs="23" :sm="22" :md="20" :lg="18" :xl="16">
          <el-card class="scroll-container" v-if="results.length">
            <div class="card-grid">
              <el-card v-for="(item, index) in results" :key="index" class="result-card" shadow="hover">
                <div class="card-content">
                  <div class="card-header">
                    <i class="el-icon-location-outline"></i>
                    <span class="card-title">归属地 {{ index + 1 }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">地区：</span>
                    <span class="value highlight">{{ item.location }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">运营商：</span>
                    <span class="value carrier">{{ item.carrier }}</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-card>
          <el-empty v-else description="暂无数据" class="scroll-container"></el-empty>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      results: [],
      loading: false,
    }
  },
  methods: {
    clearData() {
      this.results = []
    },
    queryLocation() {
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        this.$message.error('请输入有效的手机号码')
        return
      }

      this.loading = true
      // 模拟异步请求
      setTimeout(() => {
        this.results = Array(10)
          .fill()
          .map((_, i) => ({
            location: ['北京市', '上海市', '广州市', '深圳市'][i % 4],
            carrier: ['中国移动', '中国联通', '中国电信'][i % 3],
          }))
        this.loading = false
      }, 800)
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.input-section {
  padding: 30px 0;
  .input-wrapper {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
  }
}

.custom-input {
  /deep/ .el-input-group__prepend {
    background: #fff;
    padding: 0 15px;
    i {
      font-size: 20px;
      color: #409eff;
    }
  }
  /deep/ .el-input__inner {
    height: 50px;
    font-size: 16px;
    border-left: none;
    border-right: none;
    &:focus {
      border-color: #dcdfe6;
    }
  }
}

.result-section {
  flex: 1;
  padding-bottom: 20px;
}

.scroll-container {
  height: calc(100vh - 150px);
  overflow: auto;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  padding: 20px;
}

.result-card {
  border-radius: 8px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
  }

  .card-content {
    padding: 15px;

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;

      i {
        font-size: 20px;
        color: #409eff;
        margin-right: 10px;
      }

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
    }

    .info-item {
      margin: 8px 0;
      display: flex;
      align-items: center;

      .label {
        color: #666;
        min-width: 60px;
      }

      .value {
        &.highlight {
          color: #409eff;
          font-weight: 500;
        }
        &.carrier {
          color: #67c23a;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .scroll-container {
    height: calc(100vh - 140px);
  }

  .card-grid {
    grid-template-columns: 1fr;
    padding: 10px;
  }

  .custom-input /deep/ .el-input__inner {
    height: 45px;
    font-size: 14px;
  }
}

/* 设置整个页面的滚动条宽度 */
html {
  overflow: auto; /* 确保页面有滚动条 */
  scrollbar-width: thin; /* Firefox专用 */
}

/* WebKit浏览器滚动条整体宽度 */
::-webkit-scrollbar {
  width: 12px; /* 垂直滚动条的宽度 */
  height: 12px; /* 水平滚动条的高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

/* 滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 滚动条两端的按钮 */
::-webkit-scrollbar-button {
  display: none;
}

/* 滚动条角落（两个滚动条交叉的地方） */
::-webkit-scrollbar-corner {
  background-color: transparent;
}

/* Firefox专用样式 */
* {
  scrollbar-width: thin; /* 可以是auto, thin, 或 none */
  scrollbar-color: #888 #f1f1f1; /* 滑块颜色 轨道颜色 */
}
</style>
