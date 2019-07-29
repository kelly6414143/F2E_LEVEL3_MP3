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
                  :key="index"
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
  data() {
    return {
      currentPlaylistImg:''
    };
  },
  watch: {
    currentSong() {
      this.songlist.map(song => {
        if (song.songName === this.currentSong.songName) {
          this.currentPlaylistImg = song.songImgSrc
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
    songlist() {
      return this.$store.state.songList;
    },
    currentSong() {
      return this.$store.state.currentSongDetail;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
