<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// import { dashboard_bar_chart } from '@/api/dashboard/dashboard_reset'
import { getUserGroupOne } from '@/api/message'
import { Loading } from 'element-ui'

// const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    color: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '180px'
    },
    data62: {
      type: Array,
      default: () => []
    },
    data64: {
      type: Array,
      default: () => []
    },
    onBarClick: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      data: [],
      chart: null,
      obj: {},
      labelList: []
    }
  },
  watch: {
    data62: {
      handler(newVal) { this.initData() }
    },
    data64: {
      handler(newVal) { this.initData() }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    async initData() {
      const loadingInstance = Loading.service({ fullscreen: true })

      let result = []
      if (this.className === '62') result = this.data62
      if (this.className === '64') result = this.data64
      this.labelList = []
      this.data = []
      result.forEach((item) => {
        this.labelList.push(item.user_no.slice(-2))
        this.data.push(item.count)
      })
      this.initChart()
      loadingInstance.close()
    },
    dashboardBarChart() {
      // const params = {
      //   threadId: this.threadId,
      //   userId: this.userId
      // }
      this.initChart() // 獲取數據後初始化圖表
    },
    initChart() {
      if (this.chart) {
        this.chart.off('click') // 先移除已存在的點擊監聽器
      }

      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.on('click', params => {
        this.setSelectedState(params)
      })

      // 設置圖表選項
      // const option = {
      //   xAxis: {
      //     max: 'dataMax'
      //   },
      //   yAxis: {
      //     type: 'category',
      //     // data: this.labelList,
      //     data: ['A', 'B', 'C', 'D', 'E'],
      //     inverse: true,
      //     animationDuration: 300,
      //     animationDurationUpdate: 300,
      //     max: 26 // 只顯示最大的3個bar
      //   },
      //   series: [
      //     {
      //       realtimeSort: true,
      //       name: `${this.className[0]}年${this.className[1]}班`,
      //       type: 'bar',
      //       data: this.data,
      //       label: {
      //         show: true,
      //         position: 'right',
      //         valueAnimation: true
      //       }
      //     }
      //   ],
      //   legend: {
      //     show: true
      //   },
      //   animationDuration: 0,
      //   animationDurationUpdate: 3000,
      //   animationEasing: 'linear',
      //   animationEasingUpdate: 'linear'
      // }

      console.log('L146', this.color)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
            itemStyle: {
              color: this.color ? '#f6a512' : '#2ec6c9' // 替換為你想要的顏色代碼
            }
          }
        ]
      }

      // 自訂義
      option.series[0].name = `${this.className[0]}年${this.className[1]}班`
      option.series[0].data = this.data
      option.xAxis[0].data = this.labelList

      // 將選項應用於圖表
      this.chart.setOption(option)

      // 開始數據更新循環
      this.startDataUpdate()
    },
    async run() {
      if (!this.chart) return
      // 更新數據
      // for (let i = 0; i < this.data.length; ++i) {
      //   if (Math.random() > 0.9) {
      //     this.data[i] += Math.round(Math.random() * 2000)
      //   } else {
      //     this.data[i] += Math.round(Math.random() * 200)
      //   }
      // }
      const result = await getUserGroupOne(this.className)
      this.data = []
      result.data.forEach((item) => {
        this.labelList.push(item.user_no.slice(-2))
        this.data.push(item.total)
      })

      // 更新圖表數據
      this.chart.setOption({
        series: [
          {
            type: 'bar',
            data: this.data
          }
        ]
      })
    },
    startDataUpdate() {
      // 初始執行
      // this.run()
      // 設置定時器以每隔3秒更新數據
      // setInterval(this.run, animationDuration)
    },
    setSelectedState(params) {
      const result = `${params.seriesName} + ${params.name}`.replace(/\D/g, '')
      this.onBarClick(result)
    }
  }
}
</script>
