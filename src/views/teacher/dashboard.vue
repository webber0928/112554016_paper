<template>
  <div class="dashboard-container">
    <el-row type="flex" class="row-bg">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <div class="time-line" style="">
            <div class="block">
              <el-timeline :reverse="true">
                <el-timeline-item
                  v-for="(item, index) in dateLine"
                  :key="index"
                  :timestamp="`${String(item.execute_date).match(/(\d{4})(\d{2})(\d{2})/).slice(1).join('-')}`"
                  placement="top"
                  :color="index === 0 ? '#0bbd87' : '' || $route.query.date && $route.query.date.replace(/-/g, '') == String(item.execute_date) ? '#409EFF' : '' "
                >
                  <router-link :to="`?date=${String(item.execute_date).match(/(\d{4})(\d{2})(\d{2})/).slice(1).join('-')}`">
                    <p>
                      第{{ index + 1 }}次使用<br>
                      共有{{ item.total_records }}筆紀錄
                    </p>
                  </router-link>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="dashboard-text">
          <!-- <el-form ref="form" :model="form">
            <el-form-item label="">
              <el-col class="line" :span="1" style="padding-left: 0px;font-weight: bold;">日期</el-col>
              <el-col :span="4">
                <el-select v-model="form.region">
                  <el-option :label="today" :value="today" />
                </el-select>
              </el-col>
              <el-col class="line" :span="1" style="padding-left: 7px;font-weight: bold;">班級</el-col>
              <el-col :span="4">
                <el-select v-model="form.group">
                  <el-option
                    v-for="(item, index) in items"
                    :key="index"
                    :label="`${item.group[0]}年${item.group[1]}班`"
                    :value="item.group"
                  />
                </el-select>
              </el-col>
              <el-col class="line" :span="1" style="padding-left: 7px;font-weight: bold;">姓名</el-col>
              <el-col :span="4">
                <el-select v-model="form.nameNo">
                  <el-option
                    v-for="item in allInfo"
                    :key="item.user_no"
                    :label="`${item.user_no} (${item.count}次數)`"
                    :value="item.user_no"
                  />
                </el-select>
              </el-col>
            </el-form-item>
          </el-form> -->
        </div>

        <el-row :gutter="20">
          <el-col v-for="item in items" :key="item.id" :span="24/items.length">
            {{ item.group[0] }}年{{ item.group[1] }}班

            <Chart1
              :data62="group62"
              :data64="group64"
              :item="item"
              :class-name="item.group"
              :on-bar-click="handleBarClick"
              :color="false"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-for="item in items" :key="item.id" :span="24/items.length">
            星星數量

            <Chart1
              :data62="group62start"
              :data64="group64start"
              :item="item"
              :class-name="item.group"
              :on-bar-click="handleBarClick"
              :color="true"
            />
          </el-col>
        </el-row>

        <div style="margin-top: 15px;">
          <p>聊天內容</p>
          <div>
            <template v-for="item in group62">
              <el-tag
                v-if="item.count"
                :key="item.id"
                :type="selectUser[0]&& selectUser[0].User.user_no === item.user_no? '' : 'info'"
                style="margin-right: 15px;margin-bottom: 15px;font-family:monospace !important;cursor: pointer;"
                @click="selectUserFunc(item.user_no)"
              >
                {{ item.user_no }}
              </el-tag>
            </template>
          </div>
          <hr v-if="group64.length && group62.length" style="margin-top: -7px;">
          <div v-if="group64.length">
            <template v-for="item in group64">
              <el-tag
                v-if="item.count"
                :key="item.id"
                :type="selectUser[0]&& selectUser[0].User.user_no === item.user_no? '' : 'info'"
                style="margin-right: 15px;margin-bottom: 15px;font-family:monospace !important;cursor: pointer;"
                @click="selectUserFunc(item.user_no)"
              >
                {{ item.user_no }}
              </el-tag>
            </template>
          </div>
          <div v-if="selectUser.length">
            總共花費：{{ Math.floor((new Date(selectUser[selectUser.length-1].createdAt) - new Date(selectUser[0].createdAt)) / (1000 * 60)) }}分鐘<br>
            獲得⭐: {{
              selectUser.reduce((result, item) => {
                if (item.isBot) {
                  if (item.message.content.indexOf('⭐') > -1) {
                    result.push(item.message.content)
                  }
                }
                return result
              }, []).length
            }}<br>
            例外：{{
              selectUser.reduce((result, item) => {
                if (item.isBot) {
                  if (item.message.content.indexOf('(例外)') > -1) {
                    result.push(item.message.content)
                  }
                }
                return result
              }, []).length
            }}<br>
          </div>
          <el-table
            :data="selectUser"
            border
            style="width: 100%"
            :row-class-name="rowClassName"
            size="mini"
          >
            <el-table-column
              label="日期"
              width="100"
            >
              <template slot-scope="scope">
                {{ String(scope.row.execute_date).match(/(\d{4})(\d{2})(\d{2})/).slice(1).join('/') }}
              </template>
            </el-table-column>
            <el-table-column
              label="時間"
              width="100"
            >
              <template slot-scope="scope">
                {{ new Date(scope.row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
              </template>
            </el-table-column>
            <el-table-column
              label="角色"
              width="50"
            >
              <template slot-scope="scope">
                <b>{{ scope.row.type === 'assistant'? 'Bot': scope.row.User.user_no }}</b>
              </template>
            </el-table-column>
            <el-table-column
              label="學習單"
              width="160"
            >
              <template slot-scope="scope">
                {{ scope.row.Story.ranking }}. {{ scope.row.Story.title }}
              </template>
            </el-table-column>
            <el-table-column
              label="對話"
            >
              <template slot-scope="scope">
                {{ scope.row.message.content }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { Chart1 } from '@/components'
import Chart1 from '@/components/Chart1.vue'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getUserGroup, getInfo, dateLine, messageList, messageTrigger } from '@/api/message'
const now = new Date()

export default {
  name: 'Dashboard',
  components: {
    Chart1
  },
  data() {
    return {
      items: [],
      allInfo: [],
      listLoading: false,
      today: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
      form: {
        region: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
        group: '',
        nameNo: ''
      },

      // 時間線
      dateLine: [],
      messageListResult: [],
      selectUser: [],
      group62: [],
      group64: [],
      group62start: [],
      group64start: []
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  watch: {
    '$route.query.date'(newDate, oldDate) {
      // 當 date 參數變更時，重新拉取資料
      this.initData()
    }
  },
  mounted() {
    this.initData(this.$route.params.id)
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getUserGroup()
        const getAllInfo = await getInfo({ date: this.$route.query.date })
        const dateLineResult = await dateLine()
        const messageListResult = await messageList({ date: this.$route.query.date })

        // console.log('result', result.data)
        // console.log('getAllInfo', getAllInfo.data)
        // console.log('dateLineResult', dateLineResult.data)
        // console.log('messageListResult', messageListResult.data)
        this.dateLine = dateLineResult.data
        if (!this.$route.query.date) {
          this.$router.push({
            query: { date: String(this.dateLine[this.dateLine.length - 1].execute_date).match(/(\d{4})(\d{2})(\d{2})/).slice(1).join('-') }
          })
        }
        this.messageListResult = messageListResult.data
        loadingInstance.close()
        this.items = result.data.filter(item => item.group !== 'teacher')

        this.group62 = []
        this.group64 = []
        this.group62start = []
        this.group64start = []
        this.selectUser = []
        this.allInfo = getAllInfo.data.map(item => {
          // console.log('L267', item)
          const userMessageList = this.messageListResult.filter((im) => item.user_no === im.User.user_no)
          console.log('L269', userMessageList)
          const startItem = JSON.parse(JSON.stringify(item))
          startItem.count = userMessageList.reduce((result, it) => {
            if (it.isBot && it.message.content.indexOf('⭐') > -1) {
              result.push(it.message.content)
            }
            return result
          }, []).length

          if (item.user_no.indexOf('62') > -1) {
            this.group62.push(item)
            this.group62start.push(startItem)
          }
          if (item.user_no.indexOf('64') > -1) {
            this.group64.push(item)
            this.group64start.push(startItem)
          }
          return item
        })
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
    },
    selectUserFunc(user_no) {
      this.selectUser = this.messageListResult.filter((item) => user_no === item.User.user_no)
    },
    rowClassName({ row }) {
      return row.isBot ? '' : 'user-row'
    },
    handleBarClick(user_no) {
      console.log('Bar clicked:', user_no)
      this.selectUserFunc(user_no)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container ::v-deep {
  padding-top: 15px;
  padding-bottom: 15px;
  table.el-table__body {
    .el-table__row.user-row {
      background: #fffcdd;
    }
  }
}
</style>
