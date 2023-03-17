<template>
  <div class="my page">
    <div class="user">
      <image
        class="ava"
        src="../../static/user-ava.jpg"
        mode="aspectFit"
      ></image>
      <div class="nickname">{{ nickName }}</div>
    </div>

    <div class="menu">
      <div class="li" @click="toList">
        <div class="left">
          <div class="icon icon01"></div>
          <div class="label">我的房源</div>
        </div>
        <div class="icon"></div>
      </div>
      <!-- <div class="li" @click="null">
        <div class="left">
          <div class="icon icon02"></div>
          <div class="label">我的标签</div>
        </div>
        <div class="icon"></div>
      </div> -->
      <div class="li" @click="null">
        <div class="left">
          <div class="icon icon03"></div>
          <div class="label">联系客服</div>
        </div>
        <div class="icon"></div>
      </div>
      <div class="li">
        <div class="left">
          <div class="icon icon04"></div>
          <div class="label">设置</div>
        </div>
        <div class="icon"></div>
      </div>
    </div>

    <div class="logout" @click="clear">退出登录</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.bk.user.isLogin,
      nickName: (state) => state.bk.user.nickName
    })
  },
  onLoad() {
    if (!this.isLogin) {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }

    if (!this.nickname) {
      this.randomNickname()
    }
  },
  methods: {
    toList() {
      uni.navigateTo({
        url: '/pages/my/edit'
      })
    },
    randomNickname() {
      let str = 'GD9527' + (Math.random() + '').substring(4, 10)
      this.$store.commit('bk/user/nickNameChange', str)
    },
    clear() {
      uni.removeStorageSync('isLogin')
      this.$store.commit('bk/user/isLoginChange', false)
      uni.reLaunch({
        url: '/pages/home/home'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my {
  max-width: 450px;
  height: 100%;
  font-size: 28rpx;
  color: #111;

  .user {
    display: flex;
    align-items: center;
    padding: 30rpx;

    .ava {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
    }

    .nickname {
      color: #1a1a1a;
      font-size: 30rpx;
      padding-left: 30rpx;
    }
  }

  .menu {
    padding: 20rpx 30rpx;
    margin: 30rpx;
    border-radius: 20rpx;
    border: 1rpx solid #f1f1f1;

    .li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 30rpx;
      padding-top: 30rpx;
      border-bottom: 1rpx solid #f1f1f1;

      .icon {
        width: 36rpx;
        height: 36rpx;
        background-image: url('./static/icon-right.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      .left {
        display: flex;
        align-items: center;

        .label {
          padding-left: 30rpx;
        }

        .icon {
          background-image: url('./static/icon-back.png');
        }

        .icon01 {
          background-image: url('./static/icon-house.png');
        }
        .icon02 {
          background-image: url('./static/icon-tags.png');
        }
        .icon03 {
          background-image: url('./static/icon-service.png');
        }
        .icon04 {
          background-image: url('./static/icon-setting.png');
        }
      }

      &:last-child {
        border-bottom: 0 none;
        padding-bottom: 30rpx;
      }
    }
  }

  .logout {
    width: 100%;
    position: absolute;
    bottom: 50rpx;
    font-size: 24rpx;
    color: #999;
    text-align: center;
    text-decoration: underline;
  }
}
</style>
