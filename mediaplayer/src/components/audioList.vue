<template lang="pug">
    #audioList
        #songListPanel  
          #songPlaylist_img
            #songPlaylist_img_size
              img(:src="currentPlaylistImg")
          #songPlaylist_info
            #songPlaylist_info_date 2019
            #songPlaylist_info_name love song
            #songPlaylist_info_playbutton
              button play
          #likeIcon
            img(src="@/assets/images/emptyHeart.svg") 
        #songListTable
          table(id="audioList_table")
              tr(id="listTitle")
                  th
                  th 
                  th title
                  th length
                  th
              tr(
                  v-for="(songDetail,index) in songlist",
                  :key="index",
                  @click="changeSongFromList(songDetail)"
              )
                  td  
                      img(
                          src="@/assets/images/musicNote.svg",
                          v-show="songDetail.status === 'playing'")
                  td {{index+1}}
                  td {{songDetail.songName}}
                  td {{songDetail.songLength}}
                  td 
                      img(src="@/assets/images/emptyHeart.svg")  

</template>

<script>
export default {
  props: {
    currentSongDetail: Object
  },
  data() {
    return {
      currentPlaylistImg: "",
      songlist: this.$store.state.songList,
      song: "",
      isChangeFromList: false
      // currentSong: this.$store.state.currentSongDetail
    };
  },
  watch: {
    currentSong() {
      this.songlist.map(song => {
        if (song.songName === this.currentSong.songName) {
          this.currentPlaylistImg = song.songImgSrc;
          // console.log(this.currentPlaylistImg);
          song.status = "playing";
          return song;
        } else {
          song.status = "paused";
          return song;
        }
      });
    }
  },
  computed: {
    // songlist() {
    //   return this.currentSongDetail
    // },
    currentSong() {
      this.isChangeFromList = this.$store.state.isChangeFromList
      if (!this.isChangeFromList) {
        // console.log(this.currentSongDetail);
        this.song = this.currentSongDetail;
      }
      return this.song;
    }
  },
  methods: {
    changeSongFromList(songDetail) {
      this.$store.commit('setIsChangeFromList',true)
      // console.log("songdetail", songDetail);
      this.song = songDetail;
      this.$emit("getSongFromList", songDetail);
    }
  }
};
</script>

<style scoped>
</style>
