<template>
<div id="apppppp" class="background-container"
:style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${r_movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
  <div id='join' class="transparent-box">
    <img src="../assets/logo4.png" alt="" style="margin-top: 30px; margin-bottom: 40px;">
    <div class="form-container">
    <form @submit.prevent="signUp">
      <label for="username"></label>
      <input type="text" id="username" v-model="username" placeholder="아이디" class="input-field"><br>
      
      <label for="useremail"></label>
      <input type="email" id="useremail" v-model="useremail" placeholder="이메일" class="input-field"><br>

      <label for="password1"></label>
      <input type="password" id="password1" v-model="password1" placeholder="비밀번호" class="input-field"><br>

      <label for="password2"></label>
      <input type="password" id="password2" v-model="password2" placeholder="비밀번호 확인" class="input-field"><br>

      <!-- <label for="profile_img">프로필 이미지: </label>
      <input type="file" id="profile_img" accept=".jpg, .png" @change="handleFileUpload"><br> -->

      
      <input type="submit" value="다음" class="signup-botton">
      <p>이미 계정이 있습니까? 여기서 <button @click="gotoLogin" class="login-button1">로그인</button>.</p>

    </form>
    </div>
  </div>
</div>
</template>
<script src="https://cdn.jsdelivr.net/lodash/4.17.15/lodash.min.js"></script>
<script>
import _ from 'lodash'
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
  computed: {
    r_movie() {
      const movies = this.$store.getters.getMovies
      const s_movie = _.shuffle(movies)[0]
      return s_movie
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
    gotoLogin() {
      this.$router.push({ name: 'login' })
    }
    // handleFileUpload(event) {
    //   // 파일 업로드 처리
    //   const file = event.target.files[0];
    //   this.profile_img = file;
    // },
  }


}
</script>

<style>
.background-container {
  position: relative;
  min-height: 100vh; /* 최소한의 높이 설정 */
}
#join {
  position: absolute;
  width: 400px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 20px;
  border-radius: 4px;
  left: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  top: 50%; /* 이 부분 삭제 */
  transform: translate(-50%, -50%); /* 이 부분 삭제 */
  text-align: center;
  margin-top: -150px; /* 로그인 창의 높이의 절반만큼 위로 이동합니다 */
}

.input-field {
  width: 350px;
  padding: 10px;
  background-color: rgba(51,51,51,0.5);
  color: white;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
}

.signup-botton {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 4px;
  color: rgba(25, 22, 31, 1);
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
}
.login-button1{
    /* padding: 8px 16px; */
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  padding: 0px;
}
/* .form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
} */


</style>