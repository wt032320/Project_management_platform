<template>
  <div class="message-box">
    <h4>短信验证码</h4>
    <div class="message-body">
      <p>短信已发送至您的手机,请输入短信验证码</p>
      <el-input maxlength="6" v-model="captcha"></el-input>
    </div>

    <div class="message-footer">
      <el-button type="success" @click="resend" class="message-input">{{resendName}}</el-button>
      <el-button type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from "vue";
import { ElMessage } from "element-plus";
import { type } from 'os';

interface ICaptcha {
  captcha: string;
  resendName: any;
}
export default defineComponent({
  name: "MessageForm",
  components: {},
  setup() {
    const data: ICaptcha = reactive({
      captcha: '',
      resendName: "重新发送"
    })

    const refData = toRefs(data)

    function resend() {
      return new Promise((res) => {
        data.captcha = ''
        ElMessage.warning({
          message: "短信已重新发送",
          type: "warning"
        })
        res()
      })
      .then(() => {
        data.resendName = 60
        const counter = setInterval(() => {
          data.resendName = data.resendName - 1
          if (data.resendName === 0) {
            data.resendName = "重新发送"
            clearInterval(counter)
          }
        }, 1000)
      })
    }

    return {
      ...refData,
      resend
    }
  }
})
</script>

<style lang="scss">
  .message-box {
    h4 {
      padding-bottom: 2rem;
    }
    p {
        font-size: 1rem;
        padding-bottom: 2rem;
      }
    .message-body {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .message-input {
        width: 10rem;
      }
    }
    .message-footer {
      width: 100%;
      display: flex;
      justify-content: space-around;
      button {
        margin: 1rem;
      }
    }
  }
</style>