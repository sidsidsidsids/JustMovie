<template>
<div id="app">
  <div id="edit">
    <img src="../assets/logo4.png" alt="" style="margin-top: 30px; margin-bottom: 40px;">
    <div>
      <form @submit.prevent="login">
        <label for="nickname">닉네임</label>
        <input type="text" id="nickname" v-model="userdata.nickname" placeholder="닉네임을 입력하세요(필수)" class="input-field"><br>

        <label for="useremail">이메일</label>
        <input type="email" id="useremail" v-model="userdata.email" placeholder="이메일을 입력하세요" class="input-field" readonly><br>

        <input 
        type="submit" 
        value="제출" 
        class="login-botton" 
        :disabled="!userdata.nickname.trim()"
        @click="modifyData">
      </form>
      <br>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'EditPage',
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
  },
  methods: {
    modifyData() {
      console.log('제출')
      // const token = this.$store.state.token
      


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
        alert('설정 완료')
        this.$router.push({ name: 'main' })
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
/* #edit {
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
  margin-top: -150px;
} */
</style>