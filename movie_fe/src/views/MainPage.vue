<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data() {
    return{

    }
  },
  created() {
    this.checkNewbie()
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    checkNewbie() {
      if (this.isLogin) {
        console.log(this)
        console.log(this.user)
      }

    }
  }
}
</script>

<style>

</style>