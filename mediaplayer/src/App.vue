<template lang="pug">
  #app
    audio-controller
</template>

<script>
import audioController from "./components/audiioController";

export default {
  name: "app",
  components: {
    "audio-controller": audioController
  }
  // data() {
  //   return {
  //     audioPlayer: "",
  //     isPaused: true,
  //     isChangeSong: false,
  //     isShuffle: false,
  //     isLoop: true,
  //     currentTime: 0,
  //     duration: 0,
  //     songIndex: 0,
  //     songTimer: "",
  //     songSrc: "",
  //     origSonglist: [
  //       "/musics/untilTheDay.mp3",
  //       "/musics/heUnderstood.mp3",
  //       "/musics/guessIt.mp3"
  //     ],
  //     shufflecurrentSonglist: [],
  //   };
  // },
  // mounted() {
  //   let vm = this;
  //   this.audioPlayer = document.getElementById("audioPlayer");
  // },
  // watch: {
  //   currentSong() {
  //     //监听正在播放的歌曲改变\
  //     // console.log(this.audioPlayer);
  //     // console.log(this.audioPlayer.duration); //此时duration为NaN
  //   },
  //   currentTime() {
  //     this.duration = this.audioPlayer.duration;

  //     let width =
  //       this.currentTime > 0
  //         ? `${this.currentTime * (500 / this.duration)}px `
  //         : 0;
  //     document.getElementById("musicRangeBox_range").style.width = width;

  //     if (this.audioPlayer.ended) {
  //       console.log(start)
  //       clearInterval(this.songTimer);
  //       if(!this.isLoop){
  //         this.toNexSong()
  //       }
  //     }
  //   }
  // },
  // computed: {
  //   currentSong() {
  //     if (this.isChangeSong) {
  //       let song = this.currentSonglist[this.songIndex];
  //       this.audioPlayer.src = song;
  //       this.audioPlayer.currentTime = 0;
  //       this.currentTime = 0;
  //       this.audioPlayer.play();
  //       this.isPaused = this.audioPlayer.paused;
  //     } else {
  //       this.songSrc = this.currentSonglist[this.songIndex];
  //     }
  //     return this.songSrc;
  //   },
  //   currentSonglist() {
  //     let songlist;
  //     if (this.isShuffle) {
  //       songlist = this.shufflecurrentSonglist;
  //       this.songIndex = 0;
  //     } else {
  //       songlist = this.origSonglist;
  //     }
  //     return songlist;
  //   }
  // },
  // methods: {
  //   getDuration() {
  //     console.log(this.audioPlayer.duration); //此时可以获取到duration
  //     this.duration = this.audioPlayer.duration;
  //   },
  //   updateTime(e) {
  //     this.currentTime = e.target.currentTime; //获取audio当前播放时间
  //   },
  //   toPlaying() {
  //     let vm = this;
  //     this.isPaused ? this.audioPlayer.play() : this.audioPlayer.pause();
  //     this.isPaused = this.audioPlayer.paused;

  //     // this.songTimer = setInterval(() => {
  //     //   this.currentTime = vm.audioPlayer.currentTime;
  //     // }, 1000);

  //     // let map = [
  //     //   "src",
  //     //   "currentSrc",
  //     //   "networkState",
  //     //   "readyState",
  //     //   "preload",
  //     //   "buffered",
  //     //   "played",
  //     //   "seekable",
  //     //   "seeking",
  //     //   "currentTime",
  //     //   "startTime",
  //     //   "duration",
  //     //   "paused",
  //     //   "defaultPlaybackRate",
  //     //   "playbackRate",
  //     //   "ended",
  //     //   "autoplay",
  //     //   "loop",
  //     //   "controls",
  //     //   "volume",
  //     //   "muted"
  //     // ];
  //     // setInterval(function() {
  //     //   let str = "";
  //     //   for (var i = 0, j = map.length; i < j; i++) {
  //     //     str += map[i] + " : " + vm.audioPlayer[map[i]] + "<br>\n";
  //     //   }
  //     //   document.getElementById("panel").innerHTML = str;
  //     // }, 1000);
  //   },
  //   toPreSong() {
  //     console.log("index", this.songIndex);
  //     if (this.songIndex === 0) {
  //       this.isChangeSong = false;
  //       return;
  //     }
  //     this.isChangeSong = true;
  //     this.songIndex--;
  //   },
  //   toNexSong() {
  //     if (this.currentSonglist.length - 1 === this.songIndex) {
  //       this.isChangeSong = false;
  //       return;
  //     }
  //     this.isChangeSong = true;
  //     this.songIndex++;
  //   },
  //   toShuffleSonglist() {
  //     this.isShuffle = !this.isShuffle;
  //     if (this.isShuffle) {
  //       let songlist = JSON.parse(JSON.stringify(this.origSonglist));
  //       let store = [];
  //       for (let x = 0, maxLength = songlist.length; x < maxLength; x++) {
  //         let index = Math.floor(Math.random() * maxLength);
  //         console.log(index);
  //         for (let y = 0; y < maxLength; y++) {
  //           store[index] = songlist[index];
  //           songlist[index] = songlist[y];
  //           songlist[y] = store[index];
  //         }
  //       }
  //       this.shufflecurrentSonglist = songlist;
  //     }
  //   },
  //   toRepeatSong() {
  //     this.isLoop = !this.isLoop;
  //   },
  //   load() {
  //     console.log("load");
  //   },
  //   error() {
  //     console.log("error");
  //   }
  // }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
