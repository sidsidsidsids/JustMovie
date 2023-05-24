<template>
  <div id='profile'>
    <div class="row">
      <div class="col text-center pt-2">
        <EditPage />
        <!-- <button
          id="changeButton"
          type="button"
          @click="
            gotoEdit
          "
        >
          프로필 수정
        </button> -->
      </div>
    </div>
    <div id="commentMovieList">
      <div class="commentBlock"
    v-for="comment in myComments"
    :key="comment.comment_id"
    :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${getMovieById(comment.movie).backdrop_path})`,
  backgroundSize: 'contain, 50%',
  backdropFilter: 'blur(100px)'}"
  @click="gotoDetail(comment.movie)">
        <MiniPoster
        :movie="getMovieById(comment.movie)"
        />
        <p>" {{ comment.content }} "</p>
        <p> &nbsp; <font-awesome-icon icon="star" class="star" style="color: rgba(246, 158, 0, 1)"/> {{ comment.star_score }}</p>
        
        <p class="right"> &nbsp; {{ comment.user }}</p>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import MiniPoster from '@/components/MiniPoster'
import EditPage from '@/components/EditPage'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'profilePage',
  components: {
    // Modal: VueModal,
    MiniPoster,
    EditPage
    // carousel
  },
  data() {
    return {
      // showModal: false,
      // enableClose: false,
      // userNickname: null,
      // userEmail: null,
      movies: null,
      myComments: null,
    }
  },
  computed: {
    ...mapGetters(['getMovieById']),
    userdata() {
      return this.$store.state.userdata
    },
    
    
    },
  created() {
    this.searchUserComment() 
  },

  methods:{
    gotoDetail(movie_id) {
      this.$router.push({ name: 'detail', params: { movie_id } });
      },
    searchUserComment(){
      const userNickname = this.$store.state.userdata.nickname
      const UserComments = this.$store.getters.getCommentsByUserNickname(userNickname).slice().reverse()
      this.myComments = UserComments
    },

    modifyData() {
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

      })
      .catch((error) => {
        // 에러 응답을 처리합니다.
        alert(error)
      });
    },
    // imageChange() {
    //   const file = event.target.files[0]
    //   this.userdata.profile_img = file
    // },
    gotoEdit() {
      this.$router.push({ name: 'edit'})
    }
  },
  beforeRouteLeave(to, from, next) {
    const isLogin = this.$store.getters.isLogin
    
    if (isLogin) {
      if (!this.userdata.nickname) {
        alert('닉네임을 입력해야 이용할 수 있습니다.');
        next(false); // 이동을 막습니다.
      } else {
        next(); // 이동을 허용합니다.
      }
    }
    else {
      next()
    }
  },
};
</script>

<style>
#profile {
  background-color: rgba(25, 22, 31, 1);
  color:aliceblue;
}
/* #changeButton{
  background-color: greenyellow;
} */
#commentMovieList {
  margin-top: -450px;
}

.commentBlock {
    display: flex;
    background-color: rgba(25, 22, 31, 0.8);
    border: 2px solid rgba(68, 65, 72, 0.8);
    color: aliceblue;
    border-radius: 10px;
    margin: 10px;
    align-items: center;
    cursor: pointer;
}

.row {
  height:auto;
}




</style>