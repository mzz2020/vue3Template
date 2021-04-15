<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { ErrorProps } from './hooks/useStores'

export default defineComponent({
  name: 'App',
  setup () {
    const { getters } = useStore()
    const error = computed<ErrorProps>(() => getters.getError)
    watch(() => error.value.status, () => {
      const { status, message, type = 'fail', duration = 2000 } = error.value
      if (!status) {
        Toast.clear()
      } else if (status && message) {
        Toast({ message, type, duration })
      } else if (status && !message) {
        Toast({ type, duration })
      }
    })
  }
})
</script>

<style lang="less">
html, body, #app {
  #initWHPM();
  font-size: 16px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
