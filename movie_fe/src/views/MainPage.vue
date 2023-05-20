<template>
  <div id="main">
    <span>,</span>
    <h2>On Screen</h2>
    <div id="now_box">
      <NowPoster
      v-for="nowplay in nowplaying"
      :key="nowplay.movie_id"
      :movie="nowplay" />
    </div>
    <h2>Popular Movies</h2>
    <div id="poster_box">
      <MoviePoster
      v-for="movie in shuffledMovie"
      :key="movie.movie_id"
      :movie="movie"
      />
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/lodash/4.17.15/lodash.min.js"></script>
<script>
import NowPoster from '@/components/NowPoster'
import MoviePoster from '@/components/MoviePoster'
import _ from 'lodash'

export default {
  name: 'mainPage',
  components: {
    NowPoster,
    MoviePoster
  },
  data() {
    return{

    }
  },
  created() {
    this.getMovies()
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    user() {
      return this.$store.state.user
    },
    nowplaying() {
      const now_movies = this.$store.getters.getNowPlaying
      const now_movie = _.shuffle(now_movies)
      return [now_movie[0], now_movie[1]]
    },
    shuffledMovie() {
      const movies = this.$store.getters.getMovies
      const s_movies = _.shuffle(movies)
      return s_movies
    }
  },
  methods: {
    getMovies() {
      if (this.$store.state.movies) {
        console.log('yesmovie')
        return
      }
      console.log('영화받으러간다')
      this.$store.commit('GET_MOVIE')
    }

  }
}
</script>

<style>
#main {
  background-color: rgba(25, 22, 31, 1);
  color:aliceblue;
}
#now_box {
  display:flex;
}
#poster_box {
  display:flex;
  width:1600px;
}
</style>