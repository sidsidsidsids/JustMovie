<template>
  <div id='detailPage'
  :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
    
    <!-- 영화 정보 -->
    <div v-if="movie" id='movieDetail'>
      <p id='title'><b>{{ movie.title }}</b></p>
      <img 
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
        alt="no image">
      <br><br>
      <span v-for="genre in movie.genre_ids" :key="genre"><strong>{{ genre }} &nbsp;</strong></span>
      <br>
      <p id='overview'>{{ movie.overview }}</p>
      <p>영화 평점 : {{movie.vote_average}} / 10&nbsp;&nbsp;
      코멘트 점수 : {{ movie.star_score }} / 5</p>  
    </div>
    <!-- 영화 정보 끝 -->

    <!-- 댓글 정보 -->
    <div id='commentDetail' v-if="comments">
      <div id="commentbox" 
      v-for="comment in comments" 
      :key="comment.comment_id"
      >
        <h4>{{ comment.user }}</h4> 
        <p>" {{ comment.content }} "</p>
        <p>{{ comment.star_score }}점</p>

        <span>
          <button id="adjustBtn" v-if="comment.user === nickname"
          @click="editComment(comment)">
          수정
          </button>
          
        <Modal v-model="showModal" v-if="showModal && comment.comment_id === editingCommentId" 
        title="코멘트 수정" 
        wrapper-class="modal-wrapper"
        class='model-footer'>
          <div class="row">
            <p><strong> 코멘트 수정 창 </strong></p>
            <p>글 내용 </p>
            <input type="text" 
            v-model="modifyContent"><br>
            <p>별점 </p>
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
          <button id="deleteBtn" v-if="comment.user === nickname"
          @click="deleteComment(comment.comment_id)">
          삭제
          </button>
        </span>
        <br>
        <!-- <hr> -->
      </div>
      <br>
      <commentForm />
    </div>
    <!-- 댓글 정보 끝 -->
    <!-- 비로그인시 -->
    <div v-else>
      <p>로그인 후 댓글 조회 가능</p>
      <p>로그인 후 코멘트 가능</p>
    </div>
  </div>
</template>

<script>
import commentForm from '@/components/commentForm'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'detailPage',
  components:{
    commentForm,
    Modal: VueModal
  },
  data() {
    return {
      showModal: false,
      editingCommentId: null,
      comment: {
        content: null,
        star_score: 0,
      },
      modifyContent: null,
      modifyStarscore: 0,
    }
  },
  created() {
    console.log('STATE검사')
    console.log(this.$store.state.movies)
    console.log(this.comments)
    this.$store.dispatch('cal_starScore',this.movie.movie_id)
  },
  mounted() {
  },
  computed: {
    movie() {
      const movieID = this.$route.params.movie_id
      console.log(movieID)
      console.log(this.$store.getters.getMovieById(movieID))
      return this.$store.getters.getMovieById(movieID)
    },
    comments() {
      const movieID = this.$route.params.movie_id
      return this.$store.getters.getCommentsByMovieId(movieID)
    },
    user() {
      return this.$store.state.user
    },
    nickname() {
      return this.$store.state.userdata.nickname
    },
    token() {
      return this.$store.state.token
    }
  },
  methods: {
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
    deleteComment(id) {
      console.log('delete')

      this.$store.dispatch('deleteComment', id)
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
    // cal_starScore() {
    //   this.$store.dispatch('cal_starScore', this.movie.movie_id)
    // }
  },
  

}
</script>

<style>
#commentbox {
  /* background-color:rgba(68, 65, 72, 0.1); */
  border-bottom:1px solid rgba(68, 65, 72, 0.8);

}
#detailPage {
  color: aliceblue;
  /* background-color:  rgba(25, 22, 31, 1); */
  display: flex;
}
#movieDetail {
   margin-left: 8px;
}
#title {
  font-size: 30px;
}
#overview {
  width:666px;
}
#commentDetail {
  margin-left: 10px;
}
</style>