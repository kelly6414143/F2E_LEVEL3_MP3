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
      this.mainImageSrc = value;
    },
    getCurrentSongDetail(value) {
      this.currentSongDetail = value;
    },
    getSongFromList(value) {
      this.mainImageSrc = value.artistImgSrc;
      this.currentAudioDetail = value;
      this.$refs.audioController.toPlaying('chosen');
    },
    toPlaylist(value) {
      this.mainImageSrc = this.$store.state.songList[0].artistImgSrc
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
  #informationPanel {
    background-color: #4b3434;
    display: flex;
    height: calc(100vh - 115px);
    overflow: hidden;
    #imageSize {
      align-self: center;
      width: 40%;
      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
    #audioList {
      width: 60%;
    }
  }
}
</style>
