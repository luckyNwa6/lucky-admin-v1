<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="input-container">
      <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
        <el-input v-model="phoneNumber" placeholder="请输入手机号码" @keyup.enter.native="queryLocation">
          <template #append>
            <el-button icon="el-icon-search" @click="queryLocation"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="cards-container">
      <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="14">
        <el-scrollbar style="height: 100%;">
          <el-card v-for="(item, index) in results" :key="index" class="card-item">
            <div slot="header">
              <span>归属地 {{ index + 1 }}</span>
            </div>
            <div>{{ item.location }}</div>
            <div>{{ item.carrier }}</div>
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      results: [],
    }
  },
  methods: {
    queryLocation() {
      if (this.phoneNumber.length !== 11) {
        this.$message.error('请输入有效的手机号码')
        return
      }
      // 这里模拟请求归属地数据
      // 实际应用中应替换为真实的API调用
      this.results = [
        { location: '北京市', carrier: '中国移动' },
        { location: '上海市', carrier: '中国联通' },
        // 更多模拟数据...
      ]
    },
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-container {
  margin-bottom: 20px;
}

.cards-container {
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.el-scrollbar {
  max-height: 50vh; /* 根据需要调整 */
}

.card-item {
  margin-bottom: 10px;
}
</style>
