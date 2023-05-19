<template>
  <div id='profile'>
  <!-- 모달 부분 -->
    <div class="row">
      <div class="col text-center pt-2">
        <button
          id="changeButton"
          type="button"
          @click="
            showModal = true
            enableClose = false
          "
        >
          프로필 수정
        </button>
      </div>
    </div>
    <Modal v-model="showModal" 
    :title="enableClose ? 'Closable modal' : 'Unclosable modal'" 
    :enable-close="enableClose"
    wrapper-class="modal-wrapper"
    class='model-footer'>
      <div class="row">
        <p><strong> 프로필 수정 창 </strong></p>
        <p>닉네임 </p>
        <input type="text" v-model="userdata.nickname"><br>
        <p>이메일 </p>
        <input type="email" v-model="userdata.email">
        <p>이미지 </p>
        <input type="file" 
        accept=".jpg, .png, .jpeg"
        @change="imageChange"><br>
        <div v-if="!enableClose" class="col">
          <div class="alert alert-warning mt-1" role="alert">
            <p class="mb-1"><strong>WARNING: </strong></p>
            <p>Nickname이 존재해야 합니다</p>
            <br>
          </div>
        </div>
        <div v-else class="col">
          <p>해당 창 밖을 클릭하여 나갈 수 있습니다</p>
          <p>재수정을 원하시면 버튼을 누른 후 다시 수정 후 제출하세요</p>
        </div>
      </div>
      <!-- <button
        type="button"
        @click="enableClose = !enableClose"
        id="outBtn"
      > -->
      <button type="button" @click="enableClose = !enableClose; modifyData()" id="submitButton" :disabled="!userdata.nickname.trim()">
        {{ enableClose ? '재수정하기' : '제출하기' }}
      </button>
        <!-- :style="['btn btn-secondary', 
        enableClose ? 'btn-danger' : 'btn-success']" -->
        <!-- {{ enableClose ? 'Disable' : 'Enable' }} closing
      </button> -->
    </Modal>
  <!-- 모달 부분 끝 -->
    <div>
      <p>{{ userdata.nickname }}</p>
      <p>{{ userdata.email }}</p>
      <img :src="userdata.profile_img" alt="invalid">
      <br>
      <button @click="tmpTest">데이터 검사기</button>
    </div>
  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  components: {
    Modal: VueModal
  },
  data() {
    return {
      showModal: false,
      enableClose: false,
      // userNickname: null,
      // userEmail: null,
    }
  },
  computed: {
    userdata() {
      return this.$store.state.userdata
    }
    
    },
  mounted() {
    if (!this.userdata.nickname) {
      this.showModal= true
    }
  },
  methods:{
    tmpTest(){
      console.log('state상태보기')
      console.log(this.$store.state.user)
      console.log(this.$store.state.token)
      console.log(this.$store.state.userdata)
      console.log('aaa')
      console.log(this.userdata)
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/users/`,
        // headers: {
        //   Authorization: `Token ${token}`,
        // },
      })
    .then((res) => {
      const userdata = res.data
      console.log('bottom of it')
      console.log(userdata)
      // this.userNickname = userdata.first_name
      // this.userEmail = userdata.email
      
    })
    .catch((err) => {
      console.log(err)
    })
    },



    modifyData() {
      console.log('제출')
      // const token = this.$store.state.token
  
      const data = {
        nickname: this.userdata.nickname,
        email: this.userdata.email
      };

      // 이미지가 있는 경우에만 프로필 이미지 추가
      if (this.userdata.profile_img) {
        data.profile_img = this.userdata.profile_img;
      }

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
          profile_img: this.userdata.profile_img,
        },
        // headers: {
        //   Authorization: `Token ${token}`,
        // },
      })
      .then((response) => {
        // 업데이트 응답을 처리합니다.
        console.log('사용자 데이터가 업데이트되었습니다:', response.data);

        // 모달을 닫고 필요한 작업을 수행합니다.
        this.showModal = false;
      })
      .catch((error) => {
        // 에러 응답을 처리합니다.
        console.error('사용자 데이터 업데이트 중 오류가 발생했습니다:', error);
      });
    },
    imageChange() {
      const file = event.target.files[0]
      this.userdata.profile_img = file
    }
  }
};
</script>

<style>
#profile {
  background-color: rgba(25, 22, 31, 1);
  color:aliceblue;
}
#changeButton{
  background-color: greenyellow;
}
.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}
.modal-wrapper {
  display: flex;
  align-items: center;
}
.modal-wrapper .vm {
  top: auto;
}
#outBtn {
  background-color: grey;
  color: #e5e5e5;
}
</style>