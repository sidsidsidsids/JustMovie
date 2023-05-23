<template>
<div id="app" class="background-container"
:style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${r_movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
  <div id="edit">
    <img src="../assets/logo4.png" alt="" style="margin-top: 30px; margin-bottom: 40px;">
    <div class="form-container">
      <form @submit.prevent="login">
        <label for="nickname"></label>
        <input type="text" id="nickname" v-model="userdata.nickname" placeholder="닉네임을 입력하세요(필수)" class="input-field"><br>

        <label for="useremail"></label>
        <input type="email" id="useremail" v-model="userdata.email" placeholder="이메일을 입력하세요" class="input-field"><br>

        <input 
        type="submit" 
        value="제출" 
        class="login-button" 
        :disabled="!userdata.nickname.trim()"
        @click="modifyData">
      </form>
      <br>
    </div>
  </div>
</div>
</template>

<script src="https://cdn.jsdelivr.net/lodash/4.17.15/lodash.min.js"></script>
<script>
import _ from 'lodash'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'LoginPage',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    userdata() {
      return this.$store.state.userdata
    },
    r_movie() {
      const movies = this.$store.getters.getMovies
      const s_movie = _.shuffle(movies)[0]
      return s_movie
    }
  },
  methods: {
    modifyData() {
      console.log('제출')
      // const token = this.$store.state.token
  
      const data = {
        nickname: this.userdata.nickname,
        email: this.userdata.email
      };


      console.log('유저데이터아이디있나요')
      // 사용자 데이터를 업데이트하는 API 엔드포인트가 있다고 가정합니다.
      // const endpoint = `${API_URL}/api/v1/users/${this.userdata.id}`;

      axios({
        method: 'patch',
        url: `${API_URL}/api/v1/users/${this.$store.state.user}`,
        data: {
          // username: this.userdata.username,
          nickname: this.userdata.nickname,
          email: this.userdata.email,
          profile_img: null,
        },
        // headers: {
        //   Authorization: `Token ${token}`,
        // },
      })
      .then((response) => {
        // 업데이트 응답을 처리합니다.
        console.log('사용자 데이터가 업데이트되었습니다:', response.data);
        this.$router.push({ name: 'profile' })
      })
      .catch((error) => {
        // 에러 응답을 처리합니다.
        console.error('사용자 데이터 업데이트 중 오류가 발생했습니다:', error);
      });
    },
  }
}
</script>

<style>
#edit {
  position: absolute;
  width: 400px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 20px;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: -150px; /* 로그인 창의 높이의 절반만큼 위로 이동합니다 */
}
</style>