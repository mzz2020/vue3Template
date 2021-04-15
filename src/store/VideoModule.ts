import { StoreOptions } from 'vuex'
import { VideoStateProps, VideoListProps } from '../hooks/useStores'
import { ArrayToobject } from '../hooks/useUtility'

const videoModule: StoreOptions<VideoStateProps> = {
  state: {
    swipeItemIndexOne: 0,
    swipeItemIndexTwo: 0,
    videoList: { data: {}, isLoaded: false }
  },
  mutations: {
    setSwipeItemIndexOne (state, index: number) {
      state.swipeItemIndexOne = index
    },
    setSwipeItemIndexTwo (state, index: number) {
      state.swipeItemIndexTwo = index
    },
    setVideos (state, list: Array<VideoListProps>) {
      state.videoList.data = ArrayToobject(list)
    },
    setVideo (state, item: VideoListProps) {
      state.videoList.data[item._id] = item
    }
  },
  getters: {
    getSwipeItemIndexOne: state => state.swipeItemIndexOne,
    getSwipeItemIndexTwo: state => state.swipeItemIndexTwo,
    getVideos: state => state.videoList.data,
    getVideo: state => (id: string) => state.videoList.data[id]
  },
  actions: {
  }
}

export default videoModule
