<template>
  <div class="chatroom-container">
    <div class="chatroom-text">
      <link
        href="https://unpkg.com/nes.css@latest/css/nes.min.css"
        rel="stylesheet"
      />
      <link href="https://zpix.vercel.app/app.css" rel="stylesheet" />
      <el-container>
        <el-header>
          <div>
            <el-button type="text" plain @click="$router.push('/dashboard')">返回</el-button>
          </div>
          學號: {{ username }}
        </el-header>
        <el-row>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-row>
                <el-col :span="24">
                  <div class="bg-purple-dark my-story">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>故事標題: <b>{{ myStoryTitle }}</b></span>
                      </div>
                      <div class="text item" v-if="myStory">
                        {{ myStory }}
                      </div>
                      <!-- <div class="text item" v-else> -->
                        <!-- <el-skeleton :rows="6" /> -->
                      <!-- </div> -->
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="my-chat bg-purple-dark">
              <el-card class="box-card" ref="chatBox">
                <div class="container">
                  <div v-for="(item, index) in historyItems" :key="index" class="history-item" :class="`${item.role === 'user'? 'user': 'model'}-role`">
                    <div class="name">{{ item.role === 'user'? '你': '小夥伴' }}</div>
                    <blockquote>{{ item.content | replacedText }}</blockquote>
                  </div>
                </div>
                <div class="form-container">
                  <form id="form">
                    <div class="el-input">
                      <input v-model="form.prompt" class="el-input__inner" type="text" @keyup.enter="onSubmit" />
                    </div>
                    <el-button type="primary" @click="onSubmit">送出</el-button>
                  </form>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initGpt2, sendMessage } from '@/api/chatGpt'
import { getOne } from '@/api/story'
import { Loading } from 'element-ui'

export default {
  name: 'Chatroom',
  data() {
    return {
      items: '',
      itemObj: '',
      story: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        prompt: ''
      },
      historyItems: [],
      initData: [],
      myStory: null,
      myStoryTitle: null
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  filters: {
    replacedText(value) {
      console.log('L98', value)
      return value.replace(/\((.*?)\)/g, '')
    }
  },
  created() {
    this.initGptData(this.$route.params.id)
  },
  methods: {
    scrollToBottom() {
      // 使用 $refs 来获取 div 元素的引用
      const chatBox = this.$refs.chatBox
      // 设置 scrollTop 属性为 chatBox 元素的 scrollHeight，将其滚动到最底部
      chatBox.scrollTop = chatBox.scrollHeight
    },
    async initGptData(id) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getOne(id)
        loadingInstance.close()
        this.itemObj = result.data
        this.myStoryTitle = result.data.title
        this.myStory = result.data.content

        this.initData = {
          role: 'assistant',
          content: result.data.content
        }
        this.initGptData2(this.initData)
      } catch (error) {
        this.$message(error)
      }
    },
    async initGptData2(initData) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await initGpt2(initData)
        loadingInstance.close()
        this.story = result.data
        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: result.data.choices[0].message.content
        })
        this.$message({
          type: 'success',
          message: '學生已登入成功！'
        })
      } catch (error) {
        this.$message(error)
      }
    },
    async onSubmit() {
      const content = this.form.prompt
      if (!content) return
      this.historyItems.push({
        role: 'user',
        content: content
      })
      try {
        this.$message({
          type: 'info',
          message: '訊息已發送'
        })
        this.form.prompt = ''
        const historyItems = [this.initData].concat(this.historyItems)
        const result = await sendMessage(historyItems)
        const content = result.data.choices[0].message.content
        this.scrollToBottom()

        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: content
        })
      } catch (error) {
        this.$message(error)
      }
      // this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  font-family: ZpixReviewLocal, ZpixReviewOnline, sans-serif;
}

.el-card {
  min-width: 460px;
  height: 100%;
  margin: auto;
  position: relative;

  .el-card__body {
    height: 100%;
  }
}

.container {
  // padding-bottom: 80px;
  overflow: auto;
}

.form-container {
  background: #fff;
  margin-top: 15px;
  border-top: 2px solid rgb(127, 127, 127, 0.5);
}

#form,
.history-item {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
.form-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: auto;
  left: 0px;
  padding: 5px 15px;
}

// #file {
//   flex-grow: 0;
// }

// #prompt {
//   margin: 4px;
//   padding: 2px;
//   width: 100%;
// }

button {
  margin: 0 14px;
  // width: 90px;
}

.name {
  flex-shrink: 0;
  font-size: 80%;
  margin: 16px 16px 16px 0;
  opacity: 0.5;
  text-align: right;
  width: 50px;
}

blockquote {
  margin: 0;
}

.history-item {
  padding: 0 8px 0 0;
}

.history-item.model-role {
  background: rgba(127, 127, 127, 0.1);
}

.history-item > blockquote {
  flex-grow: 1;
  margin: 0;
}
blockquote {
  white-space: break-spaces;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
  min-height: 36px;
  height: 50%;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.my-chat {
  // border-radius: 4px;
  min-height: 36px;
  height: calc(100vh - 80px);
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.my-story {
  height: calc(100vh - 80px);
  padding: 20px 20px 20px 20px;
}
.my-scaffolding {
  height: calc(50vh - 130px);
  padding: 0 20px 20px 20px;
}

.text.item {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  text-align: justify;
  white-space: break-spaces;
}
.chatroom-text ::v-deep {
  .el-card .el-card__body {
    height: 100%;
    overflow: auto;
    padding-bottom: 100px;
  }

}

</style>