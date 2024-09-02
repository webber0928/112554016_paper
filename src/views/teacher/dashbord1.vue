<template>
  <div class="dashboard-container">
    <div class="dashboard-text">學號: {{ username }}</div>
    <el-row :gutter="20">
      <!-- <Chart1 /> -->
      <Chart1
        v-for="item in items"
        :key="item.id"
        :item="item"
        :class-name="item.group"
      />
    </el-row>
  </div>
</template>

<script>
// import { Chart1 } from '@/components'
import Chart1 from '@/components/Chart1.vue'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getUserGroup, getInfo } from '@/api/message'

export default {
  name: 'Dashboard',
  components: {
    Chart1
  },
  data() {
    return {
      items: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  created() {
    this.initData(this.$route.params.id)
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        // const result1 = await getInfo()
        const result = await getUserGroup()
        // result.data.foeEach((item, idx) => {
        //   if (item.group === 'teacher') delete result.data[idx]
        // })
        loadingInstance.close()
        this.items = result.data.filter(item => item.group !== 'teacher')
      } catch (error) {
        this.$message(error)
      }
    },
    async go(id) {
      try {
        this.$router.push('/teacher/user/' + id)
      } catch (error) {
        this.$message(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
