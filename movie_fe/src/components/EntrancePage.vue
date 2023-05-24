<template>
  <div id='entrance'>
    <img id='ent_logo' src="../assets/logo3.png" alt="JUSTMOVIE"
    @click='gotoMain' style="cursor: pointer">
  </div>
</template>

<script>

export default {
  
  methods: {
    gotoMain() {
        this.$router.push({ name: 'main' })
    }
  }
}
</script>

<style>
#entrance {
  position: absolute;
  top:00px;
  left:-100px;
  background-color: rgba(25,22,31,1);
  /* background-color: bisque; */
  width: 2000px;
  height: 1000px;
  /* margin-top : -9%;
  margin-left: -15.5%; */
  /* display: flex; */
  justify-content: center;
  align-content: center;
}

#ent_logo {
  /* max-width: 100%; */
  z-index: 1;
  position:absolute;
  margin: auto;
  left: auto;
  top: 500px;

}

#mainBtn {
    position: absolute;
    margin: auto;
    z-index: 1;
    left: auto;
    top: 500px;
}
</style>
