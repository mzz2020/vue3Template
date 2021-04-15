import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Store } from 'vuex'
import { APIS, BASEURL } from '../apis/index'
import { GlobalDataProps } from '../hooks/useStores'
import { ApiProp, HttpsProp, HttpFnProp, methodType, ObjectString, ObjectAny } from '../hooks/useCommon'

export default class CreateAxios {
  store: Store<GlobalDataProps>
  time: Date
  constructor (store: Store<GlobalDataProps>) {
    this.store = store
    this.time = new Date()
    this.init()
  }

  private instance: AxiosInstance = axios.create()

  private https: HttpsProp<AxiosRequestConfig> = {}

  private initHttpFn: HttpFnProp<AxiosRequestConfig> = async (params = {}, isFromData = false, config = {}, url: string, method: methodType) => {
    const instance = this.instance
    const nParams = this.initParams(params, isFromData)
    instance.defaults.baseURL = config.baseURL || BASEURL
    instance.defaults.timeout = config.timeout || 1000
    instance.defaults.headers.token = this.store.getters.getToken
    this.interceptorsRequest(instance)
    this.interceptorsResponse(instance)
    return await this.initResponse(instance, config, nParams, url, method)
  }

  private initParams (params: ObjectString, isFromData: boolean) {
    if (Object.keys(params).length > 0 && isFromData) {
      const nFromData = new FormData()
      Object.keys(params).forEach((results: string) => {
        nFromData.append(results, params[results])
      })
      return nFromData
    } else {
      return params
    }
  }

  private initResponse = async (instance: AxiosInstance, config: AxiosRequestConfig, nParams: ObjectString | ObjectAny, url: string, method: methodType) => {
    let response: ObjectAny = {}
    if (['post', 'put', 'patch'].includes(method)) {
      try {
        response = await instance({ method, url, data: nParams, ...config })
      } catch (error) {
        response = Promise.reject(error)
      }
    } else if (['get', 'delete'].includes(method)) {
      try {
        config.params = nParams
        response = await instance({ method, url, ...config })
      } catch (error) {
        response = Promise.reject(error)
      }
    }
    return response
  }

  private interceptorsRequest (instance: AxiosInstance) {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      instance.defaults.headers.token = this.store.getters.token
      this.store.commit('setError', { status: true, message: '', type: 'loading', duration: 0 })
      return config
    }, error => {
      return Promise.reject(error)
    })
  }

  private interceptorsResponse (instance: AxiosInstance) {
    instance.interceptors.response.use((config: AxiosResponse) => {
      this.store.commit('setError', { status: false, message: '' })
      return config
    }, error => {
      this.store.commit('setError', { status: false, message: '' })
      if (error && error.response) {
        const eMsg = error.response.data
        this.store.commit('setError', { status: true, message: eMsg })
      } else {
        this.store.commit('setError', { status: true, message: '系统错误' })
      }
      return Promise.reject(error)
    })
  }

  private init () {
    if (APIS.length > 0) {
      APIS.map((item: ApiProp) => {
        this.https[item.name] = (params = {}, isFromData = false, config = {}) => this.initHttpFn(params, isFromData, config, item.url, item.method)
      })
      this.store.commit('setHttps', this.https)
    }
  }
}
