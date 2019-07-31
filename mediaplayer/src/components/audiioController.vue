<template lang="pug">
    #audioController
        audio(
        id="audioPlayer",
        ref="audio",
        @canplay="getDuration",
        @timeupdate="updateTime",
        @loadstart= "load",
        @error="error",
        :loop="isLoop"
        )
            source(:src="currentSong",
            type="audio/mpeg")

        #musicRangeBox(@click="changePlayingTime")
            div(
                id="musicRangeBox_range",
            )

        #controller

          #controller_upLayer
            div {{currentTimer}}
            div {{totalTimer}}

          #controller_downLayer
            #controller_left
              #songImg
                img(:src="songImgSrc")
              #artistDate
                #artistDate_songName {{songName}}
                #artistDate_artist {{artist}}

            #controller_center
                img(
                src="@/assets/images/shuffleButton.svg",
                @click="toShuffleSonglist"
                :style="isShuffle?'filter: invert(1);':''"
                )

                img(
                id="preSongButton",
                src="@/assets/images/preButton.svg",
                @click="toPreSong"
                )

                #playerButton
                    img(
                        v-if="isPaused",
                        src="@/assets/images/playButton.svg",
                        @click="toPlaying"
                        )
                    img(
                        v-else,
                        src="@/assets/images/pauseButton.svg",
                        @click="toPlaying"
                        )
                
                img(
                id="nextSongButton",
                src="@/assets/images/nextButton.svg",
                @click="toNexSong"
                )

                img(
                src="@/assets/images/repeatButton.svg",
                @click="toRepeatSong",
                :style="isLoop?'filter: invert(1);':''"
                )

            #controller_right
                #volumeButton
                    img(
                    src="@/assets/images/volumeUpButton.svg",
                    @click="changeVoiceStatus",
                    :style="isMute?'filter: invert(1);':''"
                    )    
                #volumeBar(@click="changeVolume")
                    div(
                      id="volumeBar-active"
                    )

        #panel
</template>

<script>
export default {
  props: {
    currentAudioDetail: Object
  },
  data() {
    return {
      origSonglist: [],
      shufflecurrentSonglist: [],
      isPaused: true,
      isShuffle: false,
      isChangeSong: false,
      isLoop: true,
      isResize: false,
      isMute: false,
      isReset: false,
      audioPlayer: "",
      currentTime: 0,
      duration: 0,
      screenWidth: 0,
      songIndex: 0,
      songTimer: "",
      songSrc: "",
      voiceVolume: 0
    };
  },
  mounted() {
    let vm = this;
    this.audioPlayer = document.getElementById("audioPlayer");
    this.voiceVolume = this.audioPlayer.volume;
    window.onresize = () => {
      this.isResize = true;
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
  watch: {
    currentSong() {},
    currentTime() {
      this.duration = this.audioPlayer.duration;
      //   this.audioPlayer.currentTime = this.currentTime;
      let width =
        this.currentTime > 0
          ? `${this.currentTime * (this.totalWidth / this.duration)}px `
          : 0;
      document.getElementById("musicRangeBox_range").style.width = width;

      if (this.audioPlayer.ended) {
        clearInterval(this.songTimer);
        if (!this.isLoop) {
          this.toNexSong();
        }
      }
    },
    isShuffle() {
      this.songSrc = this.currentSonglist[this.songIndex].songSrc;
      this.audioPlayer.src = this.songSrc;
      this.audioPlayer.currentTime = 0;
      this.currentTime = 0;
      this.audioPlayer.play();
      this.isPaused = this.audioPlayer.paused;
      // console.log(this.songSrc);
    },
    voiceVolume() {
      this.getVolumeLength();
    }
  },
  computed: {
    currentSonglist() {
      this.origSonglist = this.$store.state.songList;
      // console.log('currentSongList')
      // console.log(this.isShuffle)
      let songlist;
      if (this.isShuffle) {
        if (this.isReset) {
          songlist = this.origSonglist;
          this.isShuffle = false
        } else {
          songlist = this.shufflecurrentSonglist;
        }
        this.songIndex = 0;
      } else {
        songlist = this.origSonglist;
      }
      // console.log(songlist)
      return songlist;
    },
    currentSong() {
      // console.log("computued",this.isReset);
      let vm = this;
      function changeSong(song) {
        vm.audioPlayer.src = song;
        vm.audioPlayer.currentTime = 0;
        vm.currentTime = 0;
        vm.audioPlayer.play();
        vm.isPaused = vm.audioPlayer.paused;
      }

      if (this.$store.state.isChangeFromList) {
        if (this.isReset) {
          // console.log(this.currentSonglist[this.songIndex].songSrc)
          let song = this.currentSonglist[this.songIndex].songSrc;
          changeSong(song);
          return song;
        }
        this.$store.state.songList.filter((song, index) => {
          if (song.songName === this.currentAudioDetail.songName) {
            this.songIndex = index;
          }
        });
        let song = this.currentAudioDetail.songSrc;
        changeSong(song);
        return song;
      }

      if (this.isChangeSong) {
        let song = this.currentSonglist[this.songIndex].songSrc;
        changeSong(song);
      } else {
        this.songSrc = this.currentSonglist[this.songIndex].songSrc;
      }
      this.$store.commit(
        "getCurrentSong",
        this.currentSonglist[this.songIndex]
      );
      this.isChangeSong = false;
      this.$emit("getCurrentSongDetail", this.currentSonglist[this.songIndex]);
      return this.songSrc;
    },
    songName() {
      return this.currentSonglist[this.songIndex].songName;
    },
    artist() {
      return this.currentSonglist[this.songIndex].artist;
    },
    songImgSrc() {
      this.$emit(
        "changImage",
        this.currentSonglist[this.songIndex].artistImgSrc
      );
      return this.currentSonglist[this.songIndex].songImgSrc;
    },
    totalWidth() {
      let width;
      if (this.isResize) {
        width = this.screenWidth;
      } else {
        width = document.body.clientWidth;
      }
      return width;
    },
    currentTimer() {
      let minute = Math.floor(this.currentTime / 60);
      let second = Math.floor(this.currentTime - minute * 60);

      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      return `${minute} : ${second}`;
    },
    totalTimer() {
      if (isNaN(this.duration)) {
        return `00 : 00`;
      }
      let minute = Math.floor(this.duration / 60);
      let second = Math.floor(this.duration - minute * 60);

      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      return `${minute} : ${second}`;
    }
  },
  methods: {
    getDuration() {
      //   console.log(this.audioPlayer.duration); //此时可以获取到duration
      this.duration = this.audioPlayer.duration;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime; //获取audio当前播放时间
    },
    toPlaying(resetAudio) {
      let vm = this;
      if (resetAudio === "reset") {
        this.isReset = true;
        this.songIndex = 0;
        this.audioPlayer.play();
        return;
      } else {
        this.isReset = false;
        return;
      }
      this.isPaused ? this.audioPlayer.play() : this.audioPlayer.pause();
      this.isPaused = this.audioPlayer.paused;

      // let map = [
      //   "src",
      //   "currentSrc",
      //   "networkState",
      //   "readyState",
      //   "preload",
      //   "buffered",
      //   "played",
      //   "seekable",
      //   "seeking",
      //   "currentTime",
      //   "startTime",
      //   "duration",
      //   "paused",
      //   "defaultPlaybackRate",
      //   "playbackRate",
      //   "ended",
      //   "autoplay",
      //   "loop",
      //   "controls",
      //   "volume",
      //   "muted"
      // ];
      // setInterval(function() {
      //   let str = "";
      //   for (var i = 0, j = map.length; i < j; i++) {
      //     str += map[i] + " : " + vm.audioPlayer[map[i]] + "<br>\n";
      //   }
      //   document.getElementById("panel").innerHTML = str;
      // }, 1000);
    },
    toPreSong() {
      this.$store.commit("setIsChangeFromList", false);
      //   console.log("index", this.songIndex);
      if (this.songIndex === 0) {
        this.isChangeSong = false;
        return;
      }
      this.isChangeSong = true;
      this.songIndex--;
    },
    toNexSong() {
      this.$store.commit("setIsChangeFromList", false);
      if (this.currentSonglist.length - 1 === this.songIndex) {
        this.isChangeSong = false;
        return;
      }
      this.isChangeSong = true;
      this.songIndex++;
    },
    toShuffleSonglist() {
      this.$store.commit("setIsChangeFromList", false);
      this.isReset = false;
      this.isShuffle = !this.isShuffle;
      if (this.isShuffle) {
        let songlist = JSON.parse(JSON.stringify(this.origSonglist));
        let store = [];
        for (let x = 0, maxLength = songlist.length; x < maxLength; x++) {
          let index = Math.floor(Math.random() * maxLength);
          for (let y = 0; y < maxLength; y++) {
            store[index] = songlist[index];
            songlist[index] = songlist[y];
            songlist[y] = store[index];
          }
        }
        this.shufflecurrentSonglist = songlist;
      }
    },
    toRepeatSong() {
      this.isLoop = !this.isLoop;
    },
    changePlayingTime(e) {
      this.currentTime = this.duration * (e.offsetX / this.totalWidth);
      this.audioPlayer.currentTime = this.currentTime;
    },
    changeVolume(e) {
      this.voiceVolume = 1 * (e.offsetX / 100);
      this.audioPlayer.volume = this.voiceVolume;
    },
    changeVoiceStatus() {
      this.isMute = !this.isMute;
      if (this.isMute) {
        this.audioPlayer.volume = 0;
        document.getElementById("volumeBar-active").style.width = `0px`;
      } else {
        this.audioPlayer.volume = this.voiceVolume;
        this.getVolumeLength();
      }
    },
    getVolumeLength() {
      let width = this.voiceVolume > 0 ? `${this.voiceVolume * 100}px` : 0;
      document.getElementById("volumeBar-active").style.width = width;
    },
    load() {
      // console.log("load");
    },
    error() {
      // console.log("error");
    }
  }
};
</script>

<style lang="scss" src="@/assets/styles/style.scss"></style>
<style scoped>
</style>
