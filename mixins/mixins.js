import { repeat } from '../mock/list'

export default {
  methods: {
    conbind() {
      const modifiedList = uni.getStorageSync('modifiedList') || ''
      if (modifiedList) {
        modifiedList.forEach((el) => {
          if (el.id < this.list.length) {
            this.list[el.id] = el
          }
        })
      }
    }
  },
  // onReachBottom() {
  //   if (this.list.length < 100) {
  //     this.list = this.list.concat(repeat(8))

  //     this.list.forEach((el, i) => {
  //       this.list.splice(i, 1, {
  //         ...el,
  //         id: i
  //       })
  //     })

  //     this.conbind()
  //   } else {
  //     uni.showToast({
  //       icon: 'none',
  //       title: '没有更多了！'
  //     })
  //   }
  // }
}
