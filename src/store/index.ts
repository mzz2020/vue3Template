import { createStore } from 'vuex'
import videoModule from './VideoModule'
import userModule from './userModule'
import { ErrorProps, GlobalAllProps, ObjectAnyProp } from '../hooks/useStores'

export default createStore<GlobalAllProps>({
  state: {
    user: { isLogin: false },
    videoList: { data: {}, isLoaded: false },
    token: localStorage.getItem('token') || '',
    error: { status: false }
  },
  mutations: {
    // 修改https值
    setHttps (state, https: ObjectAnyProp<any>) {
      state.https = { ...https }
    },
    // 更新token
    setToken (state, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setLoginOut (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
    },
    // 设置error
    setError (state, params: ErrorProps) {
      state.error = { ...params }
    }
  },
  getters: {
    getHttps: state => state.https,
    getToken: state => state.token,
    getError: state => state.error
  },
  actions: {
  },
  modules: {
    videoModule,
    userModule
  }
})
