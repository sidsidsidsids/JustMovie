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
        <br>
        <button class="comment-button1" id="adjustBtn"
        @click="editComment(comment)">
        수정
        </button>
    </div>
    </div>
    <Modal v-model="showModal" v-if="showModal && comment.comment_id === editingCommentId" 
        title="코멘트 수정" 
        wrapper-class="modal-wrapper"
        class='model-footer'>
          <div class="row">
            <p><strong> 코멘트 수정 창 </strong></p>
            <p>글 내용 </p>
            <input type="text" 
            v-model="modifyContent"><br>
            <p><font-awesome-icon icon="star" class="star"/> </p>
            <input type="number" 
            id="starScore" 
            v-model="modifyStarscore" 
            min="0" max="5" required>
            <br>
          </div>
          <button type="button" @click="modifyComment(comment.comment_id)" id="submitButton">
            {{ '제출' }}
          </button>
        </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import MiniPoster from '@/components/MiniPoster'
import EditPage from '@/components/EditPage'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'profilePage',
  components: {
    Modal: VueModal,
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
      showModal: false,
      movies: null,
      myComments: null,
      editingCommentId: null,
      modifyContent: null,
      modifyStarscore: null,
    }
  },
  computed: {
    ...mapGetters(['getMovieById']),
    userdata() {
      return this.$store.state.userdata
    },
    
    
    },
  created() {
    if (this.$route.params.id !== this.$store.state.user) {
      alert('유효하지 않은 접근')
      this.$router.push({ name: 'main' })
    }
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
    },
    editComment(comment) {
      const commentId = comment.comment_id
      console.log('edit')
      this.editingCommentId = commentId
      this.modifyContent = comment.content
      this.modifyStarscore = comment.star_score
      console.log('editDATA', this.comment)
      this.showModal = true
      return
    },
    modifyComment(id) {
      // const data = {
      //   comment_id: id,
      //   content: this.comment.content,
      //   star_score: this.comment.star_score,
      // }
      console.log(this.movie)
      console.log(this.comment)
      axios({
        method: 'put',
        url: `${API_URL}/movies/comment/${id}`,
        data: {
          comment_id: id,
          user: this.user,
          movie: this.movie.movie_id,
          content: this.modifyContent,
          star_score: this.modifyStarscore
        },
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then((response) => {
        // 업데이트 응답을 처리합니다.
        console.log('댓글 데이터가 업데이트되었습니다:', response.data);

        // 모달을 닫고 필요한 작업을 수행합니다.
        this.showModal = false
        this.editingCommentId= null
        this.comment = {
          content: null,
          star_score: 0,
        }
        this.$store.commit('GET_COMMENT')
      })
      .catch((error) => {
        // 에러 응답을 처리합니다.
        console.error('댓글 데이터 업데이트 중 오류가 발생했습니다:', error);
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    const isLogin = this.$store.getters.isLogin
    
    if (isLogin) {
      if (!this.$store.state.userdata.nickname) {
        alert('닉네임을 입력해야 이용할 수 있습니다.');
        // next(false); // 이동을 막습니다.
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

