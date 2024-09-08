<template>
  <div class="chatroom-text">
    <el-container>
      <el-header>
        <div>
          <el-button type="text" plain @click="$router.push('/story')">&lt; 返回</el-button>
          <div>[ 學號: {{ username }} ]</div>
        </div>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <el-main>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :xl="24">
              <div class="my-story">
                <el-card style="background-color: #fdf6ec">
                  <div slot="header">
                    <span>故事標題: <b>{{ myStoryTitle }}</b></span>
                  </div>
                  <div ref="myStory" class="story-content">
                    <div v-if="myStory" class="text item" v-html="myStory" />
                    <div v-else class="text item">
                      <el-skeleton :rows="6" />
                    </div>
                    <audio id="tts-audio" ref="audio" controls style="display: none" src="https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=apple" />
                  </div>
                  <div class="scroll-hint">
                    <p>Swipe to scroll</p>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :xl="24">
              <div class="my-room grid-content bg-purple-light">
                <div class="my-chat bg-purple-dark">
                  <el-card class="box-card">
                    <div ref="chatBox" class="chat-message-list">
                      <div v-for="(item, index) in historyItems" :key="index" class="chat-message" :class="`${item.role === 'user'? 'user': 'model'}-role`">
                        <div class="message-avatar">
                          <img v-if="item.role !== 'user'" src="https://webzz-production.s3-ap-northeast-1.amazonaws.com/users/avatars/F42B1Z9EV4WEFLY7GGYY.png">
                          <img v-else src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                        </div>
                        <div class="message-content">{{ item.content | replacedText }}</div>
                        <!-- <div class="message-time">00:03:41</div> -->
                      </div>
                    </div>
                    <div class="form-container">
                      <hr>
                      <div class="chat-bottom">
                        <div class="bottom-row">
                          <div class="leave">
                            <el-button type="danger" plain @click="exitChat">離開對話</el-button>
                          </div>
                          <div class="send-input">
                            <input v-model="form.prompt" class="el-input__inner" type="text" placeholder="輸入對話" @keyup.enter="onSubmit">
                          </div>
                          <div class="send-btn">
                            <el-button type="primary" plain @click="onSubmit">送出</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initGpt, sendMessage } from '@/api/chatGpt'
import { getOne, triggerPlay, triggerOpen } from '@/api/story'
import { Loading } from 'element-ui'

export default {
  name: 'Chatroom',
  filters: {
    replacedText(value) {
      console.log(value)
      return value.replace(/\((.*?)\)/g, '').replace(/\s+/g, ' ').trim()
    }
  },
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
      myStoryTitle: null,
      wordObj: {},
      selectWords: '',
      promptPart: '',
      windowHeight: window.innerHeight,
      keyboardHeight: 0,
      isComposing: false
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  mounted() {
    this.$refs.myStory.addEventListener('copy', (event) => {
      event.preventDefault()
      alert(`不可以壞壞`)
    })

    // 使用事件委托监听动态生成的按钮点击事件
    this.$refs.myStory.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.handleClick(event.target.textContent)
      }
    })

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  created() {
    this.initGptData(this.$route.params.id)
  },
  methods: {
    handleResize() {
      const currentHeight = window.innerHeight
      if (currentHeight < this.windowHeight) {
        this.keyboardHeight = this.windowHeight - currentHeight
      } else {
        this.keyboardHeight = 0
      }
      this.windowHeight = currentHeight
    },
    scrollToBottom() {
      const chatBox = this.$refs.chatBox
      setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 150)
    },
    async initGptData(id) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getOne(id)
        loadingInstance.close()
        this.itemObj = result.data
        this.myStoryTitle = result.data.title
        this.promptPart = result.data.prompt_part
        this.myStory = this.textFormat(result.data.content, result.data.words || [])

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
        const result = await initGpt({
          message: initData,
          username: this.username,
          storyId: this.$route.params.id,
          promptPart: this.promptPart
        })
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
    textFormat(text, words) {
      words = words.sort((a, b) => a.length - b.length)
      words.forEach(word => {
        const key = word.split(' ')[0]
        const value = word.split(' ')[1]
        this.wordObj[key] = value
        const newRegex = new RegExp(' ' + key, 'g')
        text = text.replace(newRegex, ` <button class='el-button el-button--text' @click="handleClick"><span>${key}</span></button>`)
      })
      text = text.replace(/\n/g, '<br>')
      return text
    },
    async onSubmit() {
      const content = this.form.prompt
      if (!content) return
      this.historyItems.push({
        role: 'user',
        content: content
      })
      this.scrollToBottom()
      try {
        this.$message({
          type: 'info',
          message: '訊息已發送'
        })
        this.form.prompt = ''
        const historyItems = [this.initData].concat(this.historyItems)
        const result = await sendMessage({
          messages: historyItems,
          username: this.username,
          storyId: this.$route.params.id
        })
        const content = result.data.choices[0].message.content

        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: content
        })
        this.scrollToBottom()
      } catch (error) {
        this.$message(error)
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleClick(key) {
      this.selectWords = key
      this.$alert(`
        <h2>${key}: ${this.wordObj[key]}</h2>
        <button id="playButton">播放</button>
        `, '單字卡', {
        dangerouslyUseHTMLString: true,
        callback: () => {
          document.getElementById('playButton').removeEventListener('click', this.playClick)
        }
      })

      triggerOpen({
        word: key,
        user_no: this.username,
        story_id: this.$route.params.id
      })

      this.$nextTick(() => {
        document.getElementById('playButton').addEventListener('click', this.playClick)
      })
    },
    playClick() {
      const audio = this.$refs.audio
      audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${this.selectWords}`
      console.log(audio.src)
      audio.playbackRate = 0.8
      audio.volume = 1
      audio.play()
      triggerPlay({
        word: this.selectWords,
        user_no: this.username,
        story_id: this.$route.params.id
      })
    },
    exitChat() {

    }
  }
}
</script>

<style lang="scss" scoped>

.chatroom-text ::v-deep {
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;
  .my-story {
    line-height: 180%;
    .el-card__header {
      line-height: 100%;
    }
    .el-card__body {
      max-height: 300px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 8px; /* 滾動條寬度 */
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5); /* 滾動條顏色 */
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1); /* 滾動條背景 */
      }
    }
  }
  .my-room {
    .chat-message {
      position: relative;
      margin: 7px 0px;
      padding-left: 48px;
      width: 100%;

      &.user-role {
        text-align: right;
        padding-left: 0;
        padding-right: 48px;
        .message-content {
          border: 1px solid #ecf5ff;
          background-color: #ecf5ff;
        }
        .message-avatar {
          right: 0;
        }
      }
      .message-avatar {
        position: absolute;
        top: 0px;
        border: 1px solid transparent;
        left: 0;

        img {
          width: 42px;
          height: 42px;
          background-size: cover;
          border-radius: 60px;
          box-shadow: 0 1px 2px 1px rgba(220, 220, 220, 1);
        }
      }
      .message-content {
        border: 1px solid #e8f3f7;
        background-color: #e8f3f7;
        padding: 5px 9px;
        min-width: 20px;
        max-width: 90%;
        margin-top: 5px;
        text-align: left;
        white-space: break-spaces;
        display: inline-block;
        border-radius: 15px;
      }
    }
    .chat-bottom {
      display: table;
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      .bottom-row {
        display: table-row;
        width: 100%;
        height: 100%;
        .leave, .send-btn {
          display: table-cell;
          height: 100%;
          max-width: 65px;
          padding: 0 3px 0 0;
          &.send-btn {
            padding: 0 0 0 3px;
          }
          button {
            width: 100%;
          }
        }
        .send-input {
          display: table-cell;
          height: 100%;
        }
      }
    }
  }
}

// .el-card {
//   min-width: 100%;
//   height: 100%;
//   margin: auto;
//   position: relative;

//   .el-card__body {
//     height: 100%;
//   }
// }

// .container {
//   // padding-bottom: 80px;
//   overflow: auto;
//   height: 100%;
// }

// .form-container {
//   background: #fff;
//   margin-top: 15px;
//   border-top: 2px solid rgb(127, 127, 127, 0.5);
// }

// #form,
// .history-item {
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   padding: 16px 0;
// }
// .form-container {
//   width: 100%;
//   position: absolute;
//   bottom: 0;
//   margin: auto;
//   left: 0px;
//   padding: 5px 15px;
// }

// // #file {
// //   flex-grow: 0;
// // }

// // #prompt {
// //   margin: 4px;
// //   padding: 2px;
// //   width: 100%;
// // }

// button {
//   margin: 0 14px;
//   // width: 90px;
// }

// .name {
//   flex-shrink: 0;
//   font-size: 80%;
//   margin: 16px 16px 16px 0;
//   opacity: 0.5;
//   text-align: right;
//   width: 50px;
// }

// blockquote {
//   margin: 0;
// }

// .history-item {
//   padding: 0 8px 0 0;
// }

// .history-item.model-role {
//   background: rgba(127, 127, 127, 0.1);
// }

// .history-item > blockquote {
//   flex-grow: 1;
//   margin: 0;
// }
// blockquote {
//   white-space: break-spaces;
// }

// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
// .el-col {
//   border-radius: 4px;
// }
// .bg-purple-dark {
//   background: #99a9bf;
//   min-height: 36px;
//   height: 50%;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
// .my-chat {
//   // border-radius: 4px;
//   min-height: 36px;
//   // height: calc(100dvh - 60px);
//   padding: 20px;
// }
// .row-bg {
//   padding: 10px 0;
//   background-color: #f9fafc;
// }
// .my-story {
//   height: calc(100dvh - 60px);
//   padding: 20px 20px 20px 20px;
// }
// .my-scaffolding {
//   height: calc(50vh - 130px);
//   padding: 0 20px 20px 20px;
// }

// .text.item {
//   height: 100%;
//   // padding-bottom: 50px;
//   overflow: auto;
//   text-align: justify;
//   // white-space: break-spaces;
// }
// .chatroom-text ::v-deep {
//   -webkit-user-select:none;
//   -moz-user-select:none;
//   -o-user-select:none;
//   user-select:none;
//   .el-card .el-card__body {
//     height: 300px;
//     overflow: auto;
//     // padding-bottom: 100px;
//   }
// }

// .bg-purple {
//     background: #d3dce6;
//   }
//   .bg-purple-light {
//     background: #e5e9f2;
//   }
//   .grid-content {
//     border-radius: 4px;
//     min-height: 36px;
//   }

</style>
