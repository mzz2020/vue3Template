import { StoreOptions } from 'vuex'
import { GlobalDataProps, RegisterParamsProps, UsersProps, UserProps } from '../hooks/useStores'
// import { ArrayToobject } from '../hooks/useUtility'

const userModule: StoreOptions<GlobalDataProps & UsersProps> = {
  state: {
    user: {
      isLogin: false
    }
  },
  mutations: {
    setLogin (state, login: boolean) {
      state.user.isLogin = login
    },
    setUser (state, user: UserProps) {
      state.user = { ...state.user, ...user }
      if (user.mobilePhone && user._id) {
        state.user.isLogin = true
      }
    }
  },
  getters: {
    getLogin: state => state.user.isLogin,
    getUser: state => state.user
  },
  actions: {
    async fetchAddUser ({ commit, getters }, params: RegisterParamsProps) {
      const { addUser } = getters.getHttps
      const { data } = await addUser(params)
      if (data) {
        if (data.status) {
          const { token, result } = data
          if (token && result) {
            commit('setToken', token)
            commit('setUser', result)
          }
        } else {
          commit('setError', { status: true, message: data.message })
        }
        return data
      } else {
        commit('setError', { status: true, message: '注册失败' })
      }
    },
    async fetchVerificationUser ({ commit, getters }) {
      const { verificationUser } = getters.getHttps
      const { data } = await verificationUser()
      if (data) {
        return data
      } else {
        commit('setLoginOut')
      }
    },
    async fetchLoginUser ({ commit, getters }, params) {
      const { Login } = getters.getHttps
      const { data } = await Login(params)
      if (data) {
        if (data.status) {
          const { token, result } = data
          if (token && result) {
            commit('setToken', token)
            commit('setUser', result)
          }
        } else {
          commit('setError', { status: true, message: data.message })
        }
        return data
      } else {
        commit('setError', { status: true, message: '登陆失败' })
      }
    }
  }
}

export default userModule
