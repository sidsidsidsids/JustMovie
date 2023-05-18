<template>
  <div>
    <span>Im HOME</span>
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
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {

  }
}
</script>

<style>

</style>