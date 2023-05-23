<template>
<div id="app"
:style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${r_movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
  <div id="logIn">
    <img src="../assets/logo4.png" alt="" style="margin-top: 30px; margin-bottom: 40px;">
    <div class="form-container">
      <form @submit.prevent="login">
        <label for="username"></label>
        <input type="text" id="username" v-model="username" placeholder="아이디를 입력하세요" class="input-field"><br>

        <label for="password"></label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" class="input-field"><br>

        <input type="submit" value="로그인" class="login-button">
      </form>
      <br>
      <p>JUSTMOVIE 회원이 아니신가요? 여기서 <button @click="gotoCreate" class="signup-button">회원가입</button>.</p>
    </div>
  </div>
</div>
</template>
<script src="https://cdn.jsdelivr.net/lodash/4.17.15/lodash.min.js"></script>
<script>
import _ from 'lodash'
export default {
  name: 'LoginPage',
  data() {
    return {
      username: null,
      password: null,
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
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username,
        password
      }

      this.$store.dispatch('login', payload)
    },
    gotoCreate() {
      this.$router.push({ name: 'create' })
    }
  }
}
</script>

<style>
/* #app {

} */

#logIn {
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

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.input-field::placeholder {
  color: rgba(140, 140, 140, 1); /* 원하는 색상으로 변경 */
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 4px;
  color: rgba(25, 22, 31, 1);
  font-weight: bold;
  cursor: pointer;
}

.signup-button {
  /* padding: 8px 16px; */
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  padding: 0px;
}

</style>