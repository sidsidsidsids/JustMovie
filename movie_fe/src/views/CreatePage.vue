<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="signUp">
      <label for="username">아이디 : </label>
      <input type="text" id="username" v-model="username"><br>
      
      <label for="useremail">이메일 : </label>
      <input type="email" id="useremail" v-model="useremail"><br>

      <label for="password1"> 비밀번호 : </label>
      <input type="password" id="password1" v-model="password1"><br>

      <label for="password2"> 비밀번호 확인 : </label>
      <input type="password" id="password2" v-model="password2"><br>

      <!-- <label for="profile_img">프로필 이미지: </label>
      <input type="file" id="profile_img" accept=".jpg, .png" @change="handleFileUpload"><br> -->

      
      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreatePage',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      useremail: null,
      // profile_img: null,
    }
  },
  methods: {
    signUp(){
      const username = this.username
      const useremail = this.useremail
      const password1 = this.password1
      const password2 = this.password2
      // const profile_img = this.profile_img

      const payload = {
        username, useremail, password1, password2 // profile_img
      }

      this.$store.dispatch('signUp', payload)
    },
    // handleFileUpload(event) {
    //   // 파일 업로드 처리
    //   const file = event.target.files[0];
    //   this.profile_img = file;
    // },
  }


}
</script>

<style>

</style>