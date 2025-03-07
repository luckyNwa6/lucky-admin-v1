<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span>
              <i class="el-icon-monitor"></i>
              基本信息
            </span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">Redis版本</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.redis_version }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">运行模式</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.redis_mode == 'standalone' ? '单机' : '集群' }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">端口</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.tcp_port }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">客户端数</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.connected_clients }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">运行时间(天)</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.uptime_in_days }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">使用内存</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.used_memory_human }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">使用CPU</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ parseFloat(cache.info.used_cpu_user_children).toFixed(2) }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">内存配置</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.maxmemory_human }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">AOF是否开启</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.aof_enabled == '0' ? '否' : '是' }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">RDB是否成功</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">{{ cache.info.rdb_last_bgsave_status }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">Key数量</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.dbSize">{{ cache.dbSize }}</div>
                  </td>
                  <td class="el-table__cell is-leaf"><div class="cell">网络入口/出口</div></td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.instantaneous_input_kbps }}kps/{{ cache.info.instantaneous_output_kbps }}kps
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header">
            <span>
              <i class="el-icon-pie-chart"></i>
              命令统计
            </span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div slot="header">
            <span>
              <i class="el-icon-odometer"></i>
              内存信息
            </span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="usedmemory" style="height: 420px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCache } from '@/api/sys'
import echarts from 'echarts'
export default {
  name: 'Cache',
  data() {
    return {
      // 统计命令信息
      commandstats: null,
      // 使用内存
      usedmemory: null,
      // cache信息
      cache: [],
    }
  },
  created() {
    this.getList()
    this.openLoading()
  },
  methods: {
    /** 查缓存询信息 */
    getList() {
      getCache().then(response => {
        this.cache = response.data
        this.$modal.closeLoading()
        this.commandstats = echarts.init(this.$refs.commandstats, 'macarons')

        this.commandstats.setOption({
          // 配置提示框（tooltip）的显示样式和内容格式
          tooltip: {
            // 触发方式为点击图表中的项目
            trigger: 'item',
            // 格式化提示框内容，其中 {a} 是系列名称，{b} 是数据项名称，{c} 是数值，{d} 是百分比
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              // 系列名称，用于提示框显示
              name: '命令',
              // 图表类型为饼图
              type: 'pie',
              // 设置玫瑰图类型为半径模式
              roseType: 'radius',
              // 设置饼图的内外半径，分别为图表宽度的15%到95%
              radius: [15, 95],
              // 设置饼图的中心位置，分别为水平50%和垂直38%
              center: ['50%', '38%'],
              // 数据源，从响应对象中获取命令统计信息
              data: response.data.commandStats,
              // 动画缓动效果，使用三次贝塞尔曲线
              animationEasing: 'cubicInOut',
              // 动画持续时间，单位为毫秒
              animationDuration: 1100,
            },
          ],
        })
        this.usedmemory = echarts.init(this.$refs.usedmemory, 'macarons')
        this.usedmemory.setOption({
          tooltip: {
            formatter: '{b} <br/>{a} : ' + this.cache.info.used_memory_human,
          },
          series: [
            {
              name: '峰值',
              type: 'gauge',
              min: 0,
              max: 1000,
              detail: {
                formatter: this.cache.info.used_memory_human,
              },
              data: [
                {
                  value: parseFloat(this.cache.info.used_memory_human),
                  name: '内存消耗',
                },
              ],
            },
          ],
        })
        window.addEventListener('resize', () => {
          this.commandstats.resize()
          this.usedmemory.resize()
        })
      })
    },
    // 打开加载层
    openLoading() {
      this.$modal.loading('正在加载缓存监控数据，请稍候！')
    },
  },
}
</script>

<style scoped>
.card-box {
  margin-bottom: 10px;
}
</style>
