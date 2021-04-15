<template>
  <div class="Home">
    Home ...
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  background-color: black;
}
.video {
  &-tabbar {
    background-color: transparent;
    &__colorWhite {
      color: @white ;
    }
    &__drak {
      .video-tabbar_item,
      .van-tabbar-item--active {
        color: @white !important;
      }
    }
    &__light {
      .van-tabbar-item--active {
        color: @black;
      }
    }
    .van-tabbar-item--active {
      font-weight: bold;
      background-color: transparent;
      color: @gray;
      .video-tabbar_item-liveTime,
      i {
        color: @blue-link;
      }
    }
    &_item {
      font-size: @fontSize16;
      &_icon {
        font-size: @fontSize32;
      }
      &-liveTime {
        font-size: @fontSize12 !important;
        transform: translateY(-7px);
      }
    }
  }
}
</style>
