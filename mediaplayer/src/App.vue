<template lang="pug">
  #app
    #informationPanel
      #imageSize
        img(
          :src="mainImageSrc",
          )
      audio-list(
        id="audioList",
        :currentSongDetail="currentSongDetail",
        @getSongFromList="getSongFromList",
        @toPlaylist="toPlaylist"
      )

    audio-controller(
      ref="audioController",
      :currentAudioDetail = "currentAudioDetail",
      @changImage="changImage",
      @getCurrentSongDetail="getCurrentSongDetail"
    )
</template>

<script>
import audioController from "./components/audiioController";
import audioList from "./components/audioList";
import { setTimeout } from "timers";

export default {
  name: "app",
  components: {
    "audio-controller": audioController,
    "audio-list": audioList
  },
  data() {
    return {
      mainImageSrc: "",
      // resetAudio: false,
      currentSongDetail: {},
      currentAudioDetail: {}
    };
  },
  methods: {
    changImage(value) {
    if( this.isGetSonglist){
      return
    }
      if (document.getElementById("imageSize")) {
        document.getElementById("imageSize").classList.add("transition-left");
        setTimeout(() => {
          this.mainImageSrc = value;
          document
            .getElementById("imageSize")
            .classList.remove("transition-left");
        }, 1000);
      } else {
        this.mainImageSrc = value;
      }
    },
    getCurrentSongDetail(value) {
      this.isGetSonglist = false
      this.currentSongDetail = value;
    },
    getSongFromList(value) {
      this.isGetSonglist = true
      // document.getElementById('imageSize').style.transition = `2s`
      document.getElementById("imageSize").classList.add("transition-left");
      setTimeout(() => {
        this.mainImageSrc = value.artistImgSrc;
        this.currentAudioDetail = value;
        document
          .getElementById("imageSize")
          .classList.remove("transition-left");
      }, 1000);
      this.$refs.audioController.toPlaying("chosen");
    },
    toPlaylist(value) {
      document.getElementById("imageSize").classList.add("transition-left");
      setTimeout(() => {
        this.mainImageSrc = this.$store.state.songList[0].artistImgSrc;
        document
          .getElementById("imageSize")
          .classList.remove("transition-left");
      }, 1000);

      this.$refs.audioController.toPlaying(value);
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  overflow: hidden;
  position: relative;
  #informationPanel {
    background-color: #4b3434;
    display: flex;
    height: calc(100vh - 115px);
    overflow: hidden;
    #imageSize {
      align-self: center;
      width: 40%;
      transition: 5s;
      transform-style: preserve-3d;
      transform-origin: top left;
      // transform: rotateY(0deg);
      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
    .transition-left {
      transform: rotateY(360deg);
    }
    #audioList {
      width: 60%;
    }
  }
}
</style>
