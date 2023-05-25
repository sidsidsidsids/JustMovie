<template>
  <div id='detailPage'
  :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
    
    <!-- 영화 정보 -->
     <div v-if="movie" id="movieDetail">
      <div class="movie-info">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="no image"
        style="margin: 80px 100px 100px 150px;">
      </div>
      <div class="movie-details">
        <div class="dtail">
        
        <p id="title" style="font-size: 35px; margin-top:80px; text-align:left;"><b>{{ movie.title }}</b></p>
        
        <div id="genres" style="text-align:left; margin-top:7px;"><span style="margin-bottom: 4px; margin-top: 0px;"><font-awesome-icon icon="star" class="star" /> {{ movie.star_score }}</span> | <span>TMDB 평점: {{ movie.vote_average }}</span> | <span v-for="genre in movie.genre_ids" :key="genre"><span>{{ genre }} </span></span></div>
        <br>
        <p id="overview" style="text-align:left; margin-top:18px; margin-bottom:18px;">{{ movie.overview }}</p>
        </div>
        
    <!-- 댓글 정보 -->
    <commentForm />
    <div id='commentDetail' v-if="comments">
      <div id="commentbox" v-for="comment in comments" :key="comment.comment_id">
        <p style="font-weight:bold; display:flex; justify-content: flex-start;">{{ comment.user }}</p>
        <p style="display:flex; justify-content: flex-start;"> <font-awesome-icon icon="star" class="star"/> {{ comment.star_score }}</p>
        <div style="margin-top:10px; display: flex; justify-content: space-between; align-items: center;">
        <p style="margin-top:0px; display:flex; justify-content: flex-start;">" {{ comment.content }} "</p>


        <div style="margin-left:auto; align-items:flex-start; min-width: 80px;">
          <button class="comment-button1" id="adjustBtn" v-if="comment.user === nickname"
          @click="editComment(comment)">
          수정
          </button>
          
          <button class="comment-button1" id="deleteBtn" v-if="comment.user === nickname"
          @click="deleteComment(comment.comment_id)">
          삭제
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
        <br>
        <!-- <hr> -->
      </div>
      <br>
      
    </div>
    <!-- 댓글 정보 끝 -->
      </div>
    </div>

    <!-- 영화 정보 끝 -->

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
// import { mapActions } from 'vuex';

const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'detailPage',
  components:{
    commentForm,
    Modal: VueModal
  },
  data() {
    return {
      // movie: null,
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
    this.$store.commit('get_movie_by_id', { movie_id:this.$route.params.movie_id });
    this.$store.commit('get_comment_by_id',{ movie_id:this.$route.params.movie_id })
    this.$store.dispatch('cal_starScore',this.movie.movie_id)
  },
  mounted() {
  },
  computed: {
    movie() {
      // const movieID = ;
      // console.log('ID: ', movieID)
     
      return this.$store.state.smovie
    },
    comments() {
      // const movieID = this.$route.params.movie_id
      // return this.$store.getters.getCommentsByMovieId(movieID)

      return this.$store.state.scomment.slice().reverse()
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
  watch: {
    comments(){
      this.$store.dispatch('cal_starScore',this.movie.movie_id)
      this.$store.commit('get_movie_by_id', { movie_id:this.$route.params.movie_id });
      this.movie = this.$store.state.smovie
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
        this.$store.commit('get_comment_by_id',{ movie_id:this.$route.params.movie_id })
        this.$store.dispatch('cal_starScore',this.movie.movie_id)
      })
      .catch((error) => {
        // 에러 응답을 처리합니다.
        console.error('댓글 데이터 업데이트 중 오류가 발생했습니다:', error);
      });
    },
  //   redirectTo() {
  //   window.location.href = '/';
  // },
    // ...mapActions(['get_movie_by_id']),
    // async setMovieData() {
    //   const movieId = this.$route.params.movie_id // 영화 ID 또는 원하는 값으로 설정
    //   await this.get_movie_by_id({ movie_id: movieId });
    //   this.movie = this.$store.getters.getMovieById(movieId);
    // },
    // cal_starScore() {
    //   this.$store.dispatch('cal_starScore', this.movie.movie_id)
    // }
  },
  

}
</script>

<style>
#commentDetail {
  margin-top: 20px; /* 영화 정보와의 간격을 조정 */
}

#commentbox {
  /* background-color: rgba(68, 65, 72, 0.1); */
  border-bottom: 1px solid rgba(68, 65, 72, 0.8);
  display: flex;
  flex-direction: column;
}


.commentbox-content {
  display: flex;
  justify-content: space-between;

}

.commentbox-buttons button {
  margin-right: 10px;
}

#detailPage {
  color: aliceblue;
  /* background-color: rgba(25, 22, 31, 1); */
  display: flex;
  flex-direction: column; /* 컨텐츠를 세로로 배치 */
}

#movieDetail {
  width: 1450px;
  margin-left: 0px;
  display: flex;
  flex-wrap: wrap; /* 포스터와 영화 정보를 한 줄로 표시하고 넘치는 경우 자동으로 다음 줄로 이동 */
  justify-content: center; /* 가운데 정렬 */
}

/* .movie-info {
  margin-right: 10px;
} */

.movie-details {
  flex: 1;
  margin-bottom: 20px; /* 댓글과의 간격 조정 */
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단 정렬 */
}

.movie-details p {
  
  margin-bottom: 0px;
}

.genres {
  display: flex;
}

.comment-button1{
  border: none;
  background: none;
  padding-left: 3px;
  cursor: pointer;
  color: rgba(255,255,255,0.6); /* 텍스트 색상 설정 */
  text-decoration: underline; /* 텍스트에 밑줄 추가 */
}

.star {
    color: rgba(246, 158, 0, 1);
}

</style>
