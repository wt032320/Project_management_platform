<template>
  <div class="maincontent">
    <div class="head">
      <div class="head-portrait">
      </div>
      <div class="infomation" >
        <span class="nickname">{{nickname}}</span>
        <span class="sign">{{sign}}</span>
        <span class="area">{{area}}</span>
        <span class="footprint">{{company}}</span>
      </div>
      <div class="about">
        <el-button type="warning" class="focus" size="small">我的关注</el-button>
        <el-button type="success" class="message" size="small" @click="router.push('/project/prefect')">更新信息</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";

import { _profile } from '../../api/profile/profile';
import router from '../../router/index';
import { IUserinfo } from '../../typings/index'

/**
 * @description: 用户信息接口
 * @param {*}
 * @return {*}
 */

export default defineComponent({
  name: 'Profile',
  components: {},
  setup() {
    let userInfo: IUserinfo = reactive({
      nickname: '请设置用户昵称',
      company: '未知公司',
      sign: '暂未填写',
      area: '位置地区'
    })

    /**
     * @description: 获取用户信息
     * @param {*} userid
     * @return {*}
     */
    async function getuserInfo(userid: string) {
      await _profile(userid).then((res) => {
        if (res.msg === undefined) {
          return
        } else if(res.msg.area === '' && res.msg.sign !== '') {
          userInfo.area = '未知地区'
          userInfo.nickname = res.msg.nickname
          userInfo.company = res.msg.company
          userInfo.sign = res.msg.sign
        } else if(res.msg.sign === '' && res.msg.area !== '') {
          userInfo.sign = "暂未填写"
          userInfo.nickname = res.msg.nickname
          userInfo.company = res.msg.company
          userInfo.area = res.msg.area
        } else if(res.msg.sign === '' && res.msg.area === '') {
          userInfo.sign = '暂未填写'
          userInfo.area = '未知地区'
          userInfo.company = res.msg.company
          userInfo.nickname = res.msg.nickname
        } else {
          userInfo.nickname = res.msg.nickname
          userInfo.company = res.msg.company
          userInfo.sign = res.msg.sign
          userInfo.area = res.msg.area
        }
      })
    }

    onMounted(() => {
      const id = localStorage.getItem('userid')
      getuserInfo(id)
    })

    const userInfos = toRefs(userInfo)

    return {
      ...userInfos,
      router
    }
  }
})
</script>

<style lang="scss" scoped>
  .maincontent {
    width: 87%;
    height: 100%;
    background-color: pink;
    .head {
      width: 90%;
      height: 28%;
      background-color: #fff;
      margin: 2rem auto 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .head-portrait {
        width: 8rem;
        height: 8rem;
        margin-left: 1.5rem;
        border-radius: 50%;
        background-color: blue;
      }
      .infomation {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: -28rem;
        font-weight: 700;
        .nickname {
          font-size: 1.5rem;
          margin-bottom: 0.4rem;
        }
        .sign {
          color: blueviolet;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .area {
          font-size: 0.8rem;
          color: gray;
          margin-bottom: 0.3rem;
        }
        .footprint {
          font-size: 0.8rem;
          color: gray;
        }
      }
      .about {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: 2rem;
        .focus {
          margin-bottom: 0.5rem;
          width: 9rem;
        }
        .message {
          margin-left: 0rem;
          width: 9rem;
        }
      }
    }
  }
</style>
