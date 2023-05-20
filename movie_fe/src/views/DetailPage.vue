<template>
  <div id='detailPage'
  :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
    <div v-if="movie" id='movieDetail'>
      <p id='title'><b>{{ movie.title }}</b></p>
      <img 
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
        alt="no image">
      <br>
      <span v-for="genre in movie.genre_ids" :key="genre"><strong>{{ genre }} &nbsp;</strong></span>
      <br>
      <p id='overview'>{{ movie.overview }}</p>
      <p>영화 평점 : {{movie.vote_average}} &nbsp;&nbsp;
      코멘트 점수 : {{ movie.star_score !== null ? movie.star_score : '0.0' }}</p>  
    </div>
    
    <div id='commentDetail'>

    </div>
  </div>
</template>

<script>
export default {
  name: 'detailPage',
  data() {
    return {
      // movie: null,
    }
  },
  created() {
    // this.test()
  
  },
  computed: {
    movie() {
      const movieID = this.$route.params.movie_id
      console.log(movieID)
      return this.$store.getters.getMovieById(movieID)
    }
  },
  methods: {
    // test() {
    //   const movieID = this.$route.params.movie_id
    //   console.log(movieID)
    //   const Movie = this.$store.getters.getMovieById(movieID)
    //   this.movie = Movie
    //   console.log('complete')
    // }
  }

}
</script>

<style>
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
</style>