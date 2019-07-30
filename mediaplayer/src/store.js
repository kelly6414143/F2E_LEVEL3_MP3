import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "Until The Day",
        songSrc: require("@/assets/musics/untilTheDay.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '04:35',
        status: 'pause'
      },
      {
        artist: "張杰",
        artistImgSrc: require("@/assets/images/portrait_JasonChang.jpg"),
        songName: "他不懂",
        songSrc: require("@/assets/musics/heUnderstood.mp3"),
        songImgSrc: require("@/assets/images/JasonChang.jpg"),
        songLength: '03:52',
        status: 'pause'
      },
      {
        artist: "曾之喬",
        artistImgSrc: require("@/assets/images/portrait_JoanneTseng.jpg"),
        songName: "猜猜看",
        songSrc: require("@/assets/musics/guessIt.mp3"),
        songImgSrc: require("@/assets/images/JoanneTseng.jpg"),
        songLength: '04:14',
        status: 'pause'
      },
      {
        artist: "Westlife .feat DianaRoss",
        artistImgSrc: require("@/assets/images/portrait_Westlife.jpg"),
        songName: "When You Tell Me That You Love Me",
        songSrc: require("@/assets/musics/When You Tell Me That You Love Me.mp3"),
        songImgSrc: require("@/assets/images/Westlife .feat DianaRoss.jpg"),
        songLength: '04:00',
        status: 'pause'
      },
      {
        artist: "徐佳瑩",
        artistImgSrc: require("@/assets/images/portrait_Lala.jpg"),
        songName: "不要再孤單",
        songSrc: require("@/assets/musics/no lonely again.mp3"),
        songImgSrc: require("@/assets/images/no lonely again.jpg"),
        songLength: '03:39',
        status: 'pause'
      },
      {
        artist: "汪蘇瀧",
        artistImgSrc: require("@/assets/images/portrait_WangSulong.jpg"),
        songName: "耿",
        songSrc: require("@/assets/musics/耿.mp3"),
        songImgSrc: require("@/assets/images/耿.jpg"),
        songLength: '04:30',
        status: 'pause'
      },
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "黑夜問白天",
        songSrc: require("@/assets/musics/53 Dawns.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '04:52',
        status: 'pause'
      },
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "身為風帆",
        songSrc: require("@/assets/musics/Destiny.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '03:57',
        status: 'pause'
      },
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "偉大的渺小",
        songSrc: require("@/assets/musics/Little Big Us.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '04:37',
        status: 'pause'
      },
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "小瓶子",
        songSrc: require("@/assets/musics/Message In A Bottle.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '04:12',
        status: 'pause'
      },
      {
        artist: "林俊傑",
        artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
        songName: "剪雲者",
        songSrc: require("@/assets/musics/Paper Clouds.mp3"),
        songImgSrc: require("@/assets/images/JJLin.jpg"),
        songLength: '03:35',
        status: 'pause'
      },
    ],
    currentSongDetail: {
      artist: "林俊傑",
      artistImgSrc: require("@/assets/images/portrait_JJLin.jpg"),
      songName: "Until The Day",
      songSrc: require("@/assets/musics/untilTheDay.mp3"),
      songImgSrc: require("@/assets/images/JJLin.jpg"),
      songLength: '04:35',
      status: 'pause'
    },
    isChangeFromList:false
  },
  mutations: {
    getCurrentSong(state, param) {
      state.currentSongDetail = param
    },
    setIsChangeFromList(state,param){
      state.isChangeFromList = param
    }
  },
  actions: {

  }
})
