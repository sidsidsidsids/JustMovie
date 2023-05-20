<template>
  <div id='logIn'>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <label for="username">아이디 : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password">패스워드 : </label>
      <input type="password" id="password" v-model="password"><br>

      <input type="submit" value="logIn">
    </form>
    <br>
    <button @click="gotoCreate">회원 가입</button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return{
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }

      this.$store.dispatch('login', payload)
    },
    gotoCreate() {
      this.$router.push({name : 'create'})
    }
  }

}
</script>

<style>
#logIn {
  position: absolute;
  width:84.3%;
  height:auto;
  background-color: rgba(25, 22, 31, 1);
  color:aliceblue;
}
</style>