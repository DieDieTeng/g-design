import { createStore } from 'vuex'

import user from './modules/user'

const bk = {
  namespaced: true,
  modules: {
    user
  }
}

const store = createStore({
  modules: {
    bk
  }
})

export default store
