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
                        v-if="!isPaused",
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
                #volumnButton
                    img(
                    src="@/assets/images/volumeUpButton.svg",
                    )    
                #volumnBar
                    span(id="volumnBar-active")

        #panel
</template>

<script>
export default {
  data() {
    return {
      origSonglist: [
        "/musics/untilTheDay.mp3",
        "/musics/heUnderstood.mp3",
        "/musics/guessIt.mp3",
        "/musics/When You Tell Me That You Love Me.mp3"
      ],
      shufflecurrentSonglist: [],
      isPaused: true,
      isShuffle: false,
      isChangeSong: false,
      isLoop: true,
      isResize: false,
      audioPlayer: "",
      currentTime: 0,
      duration: 0,
      screenWidth: 0,
      songIndex: 0,
      songTimer: "",
      songSrc: ""
    };
  },
  mounted() {
    let vm = this;
    this.audioPlayer = document.getElementById("audioPlayer");
    window.onresize = () => {
      this.isResize = true;
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
    // this.totalWidth = document.body.clientWidth
  },
  watch: {
    currentSong() {
      //监听正在播放的歌曲改变\
      //   console.log(this.audioPlayer);
      //   console.log('watch',this.audioPlayer.duration); //此时duration为NaN
    },
    currentTime() {
      this.duration = this.audioPlayer.duration;
    //   this.audioPlayer.currentTime = this.currentTime;
      let width =
        this.currentTime > 0
          ? `${this.currentTime * (this.totalWidth / this.duration)}px `
          : 0;
      document.getElementById("musicRangeBox_range").style.width = width;

      if (this.audioPlayer.ended) {
        console.log("start");
        clearInterval(this.songTimer);
        if (!this.isLoop) {
          this.toNexSong();
        }
      }
    },
    isShuffle() {
      this.songSrc = this.currentSonglist[this.songIndex];
      this.audioPlayer.src = this.songSrc;
      this.audioPlayer.currentTime = 0;
      this.currentTime = 0;
      this.audioPlayer.play();
      this.isPaused = this.audioPlayer.paused;
    }
  },
  computed: {
    currentSonglist() {
      let songlist;
      if (this.isShuffle) {
        console.log("shuffle");
        songlist = this.shufflecurrentSonglist;
        this.songIndex = 0;
      } else {
        songlist = this.origSonglist;
      }
      //   console.log('computed',songlist);
      return songlist;
    },
    currentSong() {
      if (this.isChangeSong) {
        let song = this.currentSonglist[this.songIndex];
        this.audioPlayer.src = song;
        this.audioPlayer.currentTime = 0;
        this.currentTime = 0;
        this.audioPlayer.play();
        this.isPaused = this.audioPlayer.paused;
      } else {
        this.songSrc = this.currentSonglist[this.songIndex];
      }
      return this.songSrc;
    },
    totalWidth() {
      let width;
      if (this.isResize) {
        width = this.screenWidth;
      } else {
        width = document.body.clientWidth;
      }
      return width;
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
    toPlaying() {
      let vm = this;
      this.isPaused ? this.audioPlayer.play() : this.audioPlayer.pause();
      this.isPaused = this.audioPlayer.paused;

      let map = [
        "src",
        "currentSrc",
        "networkState",
        "readyState",
        "preload",
        "buffered",
        "played",
        "seekable",
        "seeking",
        "currentTime",
        "startTime",
        "duration",
        "paused",
        "defaultPlaybackRate",
        "playbackRate",
        "ended",
        "autoplay",
        "loop",
        "controls",
        "volume",
        "muted"
      ];
      setInterval(function() {
        let str = "";
        for (var i = 0, j = map.length; i < j; i++) {
          str += map[i] + " : " + vm.audioPlayer[map[i]] + "<br>\n";
        }
        document.getElementById("panel").innerHTML = str;
      }, 1000);
    },
    toPreSong() {
      //   console.log("index", this.songIndex);
      if (this.songIndex === 0) {
        this.isChangeSong = false;
        return;
      }
      this.isChangeSong = true;
      this.songIndex--;
    },
    toNexSong() {
      if (this.currentSonglist.length - 1 === this.songIndex) {
        this.isChangeSong = false;
        return;
      }
      this.isChangeSong = true;
      this.songIndex++;
    },
    toShuffleSonglist() {
      this.isShuffle = !this.isShuffle;
      if (this.isShuffle) {
        let songlist = JSON.parse(JSON.stringify(this.origSonglist));
        let store = [];
        for (let x = 0, maxLength = songlist.length; x < maxLength; x++) {
          let index = Math.floor(Math.random() * maxLength);
          //   console.log(index);
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
      console.log(this.currentTime);
    },
    load() {
      console.log("load");
    },
    error() {
      console.log("error");
    }
  }
};
</script>

<style lang="scss" src="@/assets/styles/style.scss"></style>
<style scoped>
</style>
