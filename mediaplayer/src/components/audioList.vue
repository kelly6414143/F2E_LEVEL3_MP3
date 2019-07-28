<template lang="pug">
    #audioList

        #songListPanel loveSong

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
    return {};
  },
  watch: {
    currentSong() {
      this.songlist.map(song => {
        if (song.songName === this.currentSong.songName) {
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
