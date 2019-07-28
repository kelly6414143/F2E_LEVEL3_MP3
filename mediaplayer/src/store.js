import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList:[
      {
        artist: "林俊傑",
        songName: "Until The Day",
        songSrc: require("@/assets/musics/untilTheDay.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength:'04:35',
        status: 'pause'
      },
      {
        artist: "張杰",
        songName: "他不懂",
        songSrc: require("@/assets/musics/heUnderstood.mp3"),
        songImgSrc: require("@/assets/images/JasonChang.jpg"),
        songLength:'03:52',
        status: 'pause'
      },
      {
        artist: "曾之喬",
        songName: "猜猜看",
        songSrc: require("@/assets/musics/guessIt.mp3"),
        songImgSrc: require("@/assets/images/JoanneTseng.jpg"),
        songLength:'04:14',
        status: 'pause'
      },
      {
        artist: "Westlife .feat DianaRoss",
        songName: "When You Tell Me That You Love Me",
        songSrc: require("@/assets/musics/When You Tell Me That You Love Me.mp3"),
        songImgSrc: require("@/assets/images/Westlife .feat DianaRoss.jpg"),
        songLength:'04:00',
        status: 'pause'
      }
    ],
    currentSongDetail:''
  },
  mutations: {
    getCurrentSong(state,param){
      state.currentSongDetail = param
    }
  },
  actions: {

  }
})
