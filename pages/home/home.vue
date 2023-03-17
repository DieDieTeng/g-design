<template>
  <view class="home page">
    <div class="head">
      <div class="box">
        <image
          class="icon"
          src="../../static/icon-search.png"
          mode="aspectFit"
        ></image>
        <input
          class="search"
          type="text"
          v-model="search"
          placeholder="搜索..."
        />
      </div>
      <image
        class="icon"
        src="../../static/icon-map.png"
        mode="aspectFit"
      ></image>
      <image
        class="icon"
        src="../../static/icon-message.png"
        mode="aspectFit"
      ></image>
    </div>

    <div class="filter">
      <div
        :class="['tab', { active: type == 'distance' }]"
        @click="filter('distance')"
      >
        距离
        <div class="icon"></div>
      </div>
      <div
        :class="['tab', { active: type == 'price' }]"
        @click="filter('price')"
      >
        租金
        <div class="icon"></div>
      </div>
      <div :class="['tab', { active: type == 'time' }]" @click="filter('time')">
        最新
        <div class="icon"></div>
      </div>
    </div>

    <div class="wrapper">
      <div class="item" v-for="item in list" :key="item.id">
        <image class="img" :src="item.data.img" mode="widthFix"></image>
        <div class="info">
          <div class="title">
            {{ item.data.title }}
          </div>
          <div class="">
            <span class="label">{{ item.data.label }} </span>
            <span class="distance"> {{ item.data.distance }} km 内</span>
          </div>
          <div class="address">
            {{ item.data.address }}
            <span class="type">{{ item.data.type }}</span>
          </div>
          <div class="price">
            {{ item.data.price }}
            <span class="unit">元/{{ item.data.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPop" class="popup" @click.stop="toggle">
      <div v-if="type === 'distance'" class="content">
        <div class="title">距离选择</div>
        <div class="li" @click.stop="change(0)">由近到远</div>
        <div class="li" @click.stop="change(1)">由远到近</div>
      </div>
      <div v-if="type === 'price'" class="content">
        <div class="title">租金</div>
        <div class="li" @click.stop="change(0)">由低到高</div>
        <div class="li" @click.stop="change(1)">由高到低</div>
      </div>
      <div v-if="type === 'time'" class="content">
        <div class="title">最新</div>
        <div class="li" @click.stop="change(0)">由近到远</div>
        <div class="li" @click.stop="change(1)">由远到近</div>
      </div>
    </div>
  </view>
</template>
<script>
import mixins from '../../mixins/mixins'

import { repeat, labels, prices, units, distance } from '../../mock/list'
export default {
  mixins: [mixins],
  data() {
    return {
      distance: distance,
      showPop: false,
      list: [],
      search: '',
      type: ''
    }
  },
  onLoad() {
    this.list = repeat(40)
    this.conbind()
  },
  methods: {
    filter(str) {
      this.type = str
      this.toggle()
    },
    change(type) {
      if (type) {
        this.list.sort((a, b) => b.data[this.type] - a.data[this.type])
      } else {
        this.list.sort((a, b) => a.data[this.type] - b.data[this.type])
      }
      this.toggle()
    },
    toggle() {
      if (this.showPop) {
        this.type = ''
      }
      this.showPop = !this.showPop
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  .head {
    display: flex;
    align-items: center;
    height: 80rpx;
    padding: 0 20rpx;

    .icon {
      height: 40rpx;
      width: 40rpx;
      margin-left: 20rpx;
    }

    .box {
      display: flex;
      align-items: center;
      flex: 1;
      height: 70rpx;
      background-color: #eee;
      border-radius: 8rpx;

      .search {
        margin-left: 20rpx;
      }
    }
  }

  .filter {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 80rpx;
    padding: 0 20rpx;
    background-color: #fff;

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 30rpx;
        height: 30rpx;
        margin-left: 6rpx;
        background-image: url(./../static/icon-arrow-down.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.25s ease-in-out;
      }
      &.active {
        font-weight: bold;
        .icon {
          transform: rotate(180deg);
        }
      }
    }
  }

  .wrapper {
    padding: 0 20rpx;
    .item {
      display: flex;
      justify-items: flex-start;
      padding-bottom: 30rpx;
      padding-top: 30rpx;
      border-bottom: 1rpx solid #eee;

      .img {
        width: 250rpx;
        border-radius: 6rpx;
      }

      .info {
        width: 460rpx;
        padding-left: 20rpx;
        .title {
          display: flex;
          align-items: center;
          font-weight: bold;
          margin-bottom: 6rpx;
        }
        .label {
          font-size: 20rpx;
          color: #fff;
          font-weight: normal;
          background-color: #fa3e3e;
          border-radius: 8rpx;
          padding: 2rpx 4rpx;
          margin-right: 8rpx;
        }

        .distance {
          font-size: 20rpx;
        }

        .address {
          font-size: 20rpx;
          margin-bottom: 6rpx;
          margin-top: 6rpx;

          .type {
            margin-left: 6rpx;
          }
        }

        .price {
          font-size: 32rpx;
          color: #fa3e3e;
          margin-bottom: 6rpx;

          .unit {
            font-size: 24rpx;
          }
        }
      }

      &:last-child {
        border-bottom: 0 none;
      }
    }
  }

  .popup {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 9;
    display: flex;
    align-items: flex-end;

    .content {
      width: 100%;
      padding: 40rpx 30rpx 70px;
      background-color: #fff;
      border-top-right-radius: 30rpx;
      border-top-left-radius: 30rpx;

      .title {
        font-size: 26rpx;
        text-align: center;
        font-weight: bold;
        color: #1a1a1a;
        margin-bottom: 30rpx;
      }
      .li {
        font-size: 26rpx;
        text-align: center;
        margin-top: 20rpx;
        padding-bottom: 10rpx;
      }
    }
  }
}
.page {
  max-width: 450px;
}
</style>
