<template lang="pug">
  #app
    #informationPanel
      #imageSize
        img(:src="mainImageSrc")
    audio-controller(@changImage="changImage")
</template>

<script>
import audioController from "./components/audiioController";

export default {
  name: "app",
  components: {
    "audio-controller": audioController
  },
  data() {
    return {
      mainImageSrc: ""
    };
  },
  methods: {
    changImage(value) {
      this.mainImageSrc = value;
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
  #informationPanel {
    align-items: center;
    display: flex;
    height: calc(100vh - 120px);
    #imageSize {
      width: 500px;
      margin: 0 auto;
      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
  }
}
</style>
