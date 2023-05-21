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
      <p>영화 평점 : {{movie.vote_average}} &nbsp;&nbsp;
      코멘트 점수 : {{ movie.star_score !== null ? movie.star_score : '0.0' }}</p>  
    </div>
    <!-- 영화 정보 끝 -->

    <!-- 댓글 정보 -->
    <div id='commentDetail'>
      <div id="commentbox" v-for="comment in comments" :key="comment.comment_id">
        <h4>닉네임(임시PK): {{ comment.user }}</h4> 
        <p>" {{ comment.content }} "</p>
        <p>{{ comment.star_score }}점</p>

        <span>
          <button id="adjustBtn" v-if="comment.user === user"
          @click="editComment(comment.comment_id)">
          수정
          </button>
          
          <button id="deleteBtn" v-if="comment.user === user"
          @click="deleteComment(comment.comment_id)">
          삭제
          </button>
        </span>
        <!-- <hr> -->
      </div>
      <br>
      <commentForm />
    </div>
    <!-- 댓글 정보 끝 -->
  </div>
</template>

<script>
import commentForm from '@/components/commentForm'

export default {
  name: 'detailPage',
  components:{
    commentForm
  },
  data() {
    return {
      // movie: null,
    }
  },
  created() {
    console.log('STATE검사')
    console.log(this.$store.state.movies)
    console.log(this.comments)
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
    }
  },
  methods: {
    editComment() {
      console.log('edit')
      return
    },
    deleteComment(id) {
      console.log('delete')

      this.$store.dispatch('deleteComment', id)
      return
    }
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