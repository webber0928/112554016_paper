<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <span v-if="token==='admin-token'">老師介面</span>
      <span v-else>學號: {{ username }}</span>
      <el-button v-if="token==='admin-token'" type="text" class="button" @click="go(nulll, 'created')">建立新的故事</el-button>
    </div>
    <el-row :gutter="20">
      <el-col v-for="item in items" :key="item.id" :sm="12" :md="12" style="margin-top: 15px;">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <el-switch
                v-if="token==='admin-token'"
                v-model="item.isVisible"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="開啟"
                inactive-text="隱藏"
                style="float: right"
                @change="switchStory(item.id, item.isVisible)"
              />
              <span>單元: <b>{{ item.ranking }}</b></span>
              <p>文章標題: <b>{{ item.title }}</b></p>
              單字卡:
              <div v-if="token==='admin-token'" style="height: 85px;overflow: auto;">
                <el-tag v-for="word in item.words" :key="word" type="info" effect="plain" size="mini">{{ word }}</el-tag>
              </div>
              <div class="bottom clearfix" style="text-align: center;margin-top: 10px;">
                <el-button type="text" class="button" @click="go(item.id, 'story')">進入</el-button>
                <el-button v-if="token==='admin-token'" type="text" class="button" @click="go(item.id, 'edit')">修改</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getList, updateOne } from '@/api/story'

export default {
  name: 'Study',
  data() {
    return {
      items: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'name', 'username', 'token'
    ])
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getList()
        loadingInstance.close()
        // this.items = result.data.items
        this.items = result.data.items.filter((item) => {
          return item.isVisible || this.token === 'admin-token'
        })
      } catch (error) {
        this.$message(error)
      }
    },
    async go(id, type) {
      try {
        switch (type) {
          case 'edit':
            this.$router.push('/story/edit/' + id)
            break
          case 'created':
            this.$router.push('/story/create/')
            break
          default:
            this.$router.push('/story/' + id)
            break
        }
      } catch (error) {
        this.$message(error)
      }
    },
    async switchStory(id, isVisible) {
      this.items.map((item) => {
        if (item.id === id) {
          item.isVisible = !!isVisible
        }
        return item
      })
      await updateOne(id, { isVisible: !!isVisible })
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
