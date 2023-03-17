<template>
  <div class="login page">
    <div class="back" @click="backPress">
      <div class="close"></div>
      <div class="txt">返回</div>
    </div>

    <div class="wrapper">
      <!-- <image class="logo" :src="logo" mode="widthFix"></image> -->

      <div class="line">
        <div class="icon icon-phone"></div>
        <input
          class="input"
          type="number"
          v-model="phone"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="line">
        <div class="icon icon-psd"></div>
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="请输入密码"
        />
      </div>

      <button class="btn-login" @click="loginHandler">登录</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

import { login } from '../../server/apis'
export default {
  computed: {
    ...mapState({
      isLogin: (state) => state.bk.user.isLogin
    })
  },
  data() {
    return {
      logo: 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1991876732.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00',
      phone: '',
      password: '',
      disabled: false
    }
  },
  methods: {
    ...mapMutations(['isLoginChange']),
    async loginHandler() {
      if (this.disabled) {
        uni.showToast({
          icon: 'none',
          title: '请勿点击过快！'
        })
        return
      }

      if (!this.phone) {
        uni.showToast({
          icon: 'none',
          title: '请输入手机号码！'
        })
        return
      }

      if (!this.password) {
        uni.showToast({
          icon: 'none',
          title: '请输入登陆密码！'
        })
        return
      }

      const resData = await login({
        phone: this.phone,
        password: this.password
      })

      if (resData.code === 200) {
        // 登录成功
        this.$store.commit('bk/user/isLoginChange', true)
      } else {
        // 登录失败
        uni.showToast({
          icon: 'none',
          title: resData.errMsg

        })
      }

      uni.reLaunch({
        url: '/pages/home/home'
      })

      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    },
    backPress() {
      uni.reLaunch({
        url: '/pages/home/home'
      })
    }
  },
  onBackPress() {
    if (!this.isLogin) {
      this.backPress()
    }
    return true
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .wrapper {
    width: 100%;

    .logo {
      width: 300rpx;
      display: block;
      margin: 0 auto 40rpx;
      opacity: 0.7;
    }

    .line {
      width: 86%;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border: 1rpx solid #999;
      margin-left: 7%;
      margin-bottom: 40rpx;
      border-radius: 44rpx;

      .input {
        flex: 1;
      }
      .icon {
        width: 40rpx;
        height: 40rpx;
        margin: 0 20rpx;
        background-image: url(./static/icon-back.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }

      .icon-phone {
        background-image: url(./static/icon-user.png);
      }
      .icon-psd {
        background-image: url(./static/icon-psd.png);
      }
    }

    .btn-login {
      width: 86%;
      height: 88rpx;
      border: 1rpx solid #999;
      margin-left: 7%;
      margin-top: 120rpx;
      border-radius: 44rpx;
    }
  }

  .back {
    position: absolute;
    top: 40rpx;
    left: 40rpx;
    display: flex;
    align-items: center;

    font-size: 26rpx;
    color: #999;

    .close {
      width: 38rpx;
      height: 38rpx;
      background-image: url(./static/icon-back.png);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
</style>
