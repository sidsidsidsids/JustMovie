<template>
  <div id="posters">
    <div class="poster-container">
      <img
        :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
        alt="no image"
        id="m_poster"
        @click="gotoDetail(movie.movie_id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    }
  },
  props: ['movie'],
   computed: {
    
  },
  methods: {
    gotoDetail(movie_id) {
      console.log('디테일로 가요');
      this.$router.push({ name: 'detail', params: { movie_id } });
    },
  },
}
</script>

<style>
/* #poster_box {
  display:flex;
  width:1920px;
} */
#posters{
  margin: 8px;
}

.poster-container {
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
}

#m_poster{
  border-radius: 12px;
  cursor: pointer;
}
#m_poster:hover {
  transform: scale(1.1);
  transition: transform .1s;
}
</style>