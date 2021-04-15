import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Vant from 'vant'
import 'vant/lib/index.css'
import CreateAxios from './axios'

/* eslint-disable no-new */
new CreateAxios(store)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(Vant)
app.mount('#app')

export default app
