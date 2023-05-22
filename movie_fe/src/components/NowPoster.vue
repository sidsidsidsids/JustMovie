<template>
    <div id="now_playing_card" 
    :style="{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`}">
      <h4>{{ movie.title }}</h4>
      <img 
      :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
      alt="no image"
      id="poster"
      @click="gotoDetail(movie.movie_id)">
      <p>{{ truncateOverview(movie.overview, 180) }}</p>
    </div>
</template>

<script>
export default {
  props: ['movie'],
  methods:{
    gotoDetail(movie_id) {
      console.log('디테일로가요')
      this.$router.push({ name: 'detail', params: { movie_id } })
    },
    truncateOverview(overview, maxLength) {
      if (overview.length > maxLength) {
        return overview.slice(0, maxLength) + '...';
      }
      return overview;
    }
  }
}
</script>

<style>
#now_box {
  display: flex;
}
#now_playing_card {
  width: 780px;
  height: 432px;
  color: white;
  border-radius: 15px;
  margin : 10px;
}
#poster {
  border-radius: 15px;
  cursor: pointer;
}

</style>