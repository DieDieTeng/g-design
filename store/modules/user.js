export default {
  namespaced: true,
  state: {
    isLogin: uni.getStorageSync('isLogin') | false,
    nickName: uni.getStorageSync('nickName') | ''
  },
  mutations: {
    isLoginChange(state, payload) {
      state.isLogin = payload
      uni.setStorageSync('isLogin', true)
    },
    nickNameChange(state, payload) {
      state.nickName = payload
      uni.setStorageSync('nickName', payload)
    }
  },
  actions: {}
}
