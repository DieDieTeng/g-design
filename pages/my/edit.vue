<template>
  <div class="edit page">
    <div class="wrapper">
      <div
        class="item"
        v-for="item in list"
        @click="modifyItem(item.id)"
        :key="item.id"
      >
        <image class="img" :src="item.data.img" mode="widthFix"></image>
        <div class="info">
          <div class="title">
            <div>{{ item.data.title }}</div>
          </div>
          <div class="title">
            <div class="label">{{ item.data.label }}</div>
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

    <div v-if="showPop" class="popup" @click.stop="close">
      <div class="content" @click.stop="null">
        <image class="img" :src="current.data.img" mode="widthFic"></image>

        <div class="tips">房源描述</div>
        <div>
          <input type="text" v-model="title" placeholder="请输入标题" />
        </div>

        <div class="tips">请选择标签</div>
        <div class="labels">
          <div
            :class="['label', { active: currentLabel === label }]"
            v-for="(label, i) in labels"
            @click.stop="checkLabel(label)"
            :key="i"
          >
            {{ label }}
          </div>
        </div>

        <div class="tips">价格修改</div>
        <div>
          <input type="text" v-model="price" placeholder="请输入出租价格" />
        </div>

        <div class="btn-save" @click.stop="save">确认修改</div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../../mixins/mixins'

import { repeat, labels, prices, units } from '../../mock/list'
export default {
  mixins: [mixins],
  data() {
    return {
      labels: labels,
      prices: prices,
      units: units,
      list: [],
      showPop: false,
      current: null,
      title: '',
      prices: 0,
      currentLabel: ''
    }
  },
  onLoad() {
    this.list = repeat(20)

    this.conbind()
    // console.log(uni.getStorageSync('modifiedList'), 12)
  },
  methods: {
    save() {
      const modifiedList = uni.getStorageSync('modifiedList') || []

      const obj = {
        id: this.current.id,
        data: {
          ...this.current.data,
          label: this.currentLabel,
          title: this.title,
          price: this.price
        }
      }

      let isExist = modifiedList.some((el) => el.id === obj.id)
      if (isExist) {
        modifiedList.forEach((el, i) => {
          el.id === obj.id && modifiedList.splice(i, 1, obj)
        })
      } else {
        modifiedList.push(obj)
      }

      modifiedList.sort((a, b) => a.id - b.id)

      modifiedList.forEach((el, i) => {
        this.list[el.id] = el
      })

      uni.setStorageSync('modifiedList', modifiedList)

      this.close()

      uni.showToast({
        icon: 'none',
        title: '保存成功'
      })
    },
    modifyItem(id) {
      this.showPop = true

      this.current = this.list[id]
      this.currentLabel = this.list[id].data.label
      this.price = this.list[id].data.price
      this.title = this.list[id].data.title 

      console.log(id, this.list[id])
    },
    checkLabel(str) {
      this.currentLabel = str
    },
    close() {
      this.current = null
      this.currentLabel = ''
      this.price = 0
      this.title = 0

      this.showPop = false
    }
  }
}
</script>
<style lang="scss" scoped>
.edit {
  padding: 10rpx 30rpx 30rpx;

  .wrapper {
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

          .label {
            font-size: 20rpx;
            color: #fff;
            font-weight: normal;
            background-color: #fa3e3e;
            border-radius: 8rpx;
            padding: 4rpx;
            margin-right: 8rpx;
          }
        }

        .address {
          font-size: 20rpx;
          margin-bottom: 6rpx;

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
      padding: 40rpx 30rpx;
      background-color: #fff;
      border-top-right-radius: 30rpx;
      border-top-left-radius: 30rpx;

      .img {
        width: 100%;
      }

      .tips {
        font-size: 26rpx;
        margin: 20rpx 0;
      }

      .labels {
        display: flex;
        align-items: center;
        margin-top: 20rpx;

        .label {
          // color: #fff;
          font-size: 20rpx;
          margin-right: 20rpx;
          padding: 8rpx 20rpx;
          background-color: #fdfffe;
          border-radius: 8rpx;
          word-break: keep-all;
          white-space: nowrap;
          border: 1rpx solid #f1f1f1;

          &.active {
            color: #fff;
            background-color: #fa3e3e;
          }
        }
      }

      .btn-save {
        width: 120rpx;
        text-align: center;
        color: #fff;
        padding: 10rpx 30rpx;
        background-color: #6a8fd2;
        border-radius: 30rpx;
        display: block;
        margin: 50rpx auto 0;
      }
    }
  }
}

input {
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
}
</style>
