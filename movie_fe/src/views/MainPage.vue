<template>
  <div id="main">
    <h2>On Screen</h2>
    <div id="now_box">
      <NowPoster
        v-for="nowplay in nowplaying"
        :key="nowplay.movie_id"
        :movie="nowplay"
      />
    </div>
    <h2>Popular Movies</h2>
    <div id="poster_box">
      <div class="carousel">
        <div class="carousel-arrow left" @click="slide(-1)" style="z-index: 1;">
          &lt;
        </div>
        <div class="carousel-inner" ref="carouselInner">
          <div class="carousel-wrapper">
            <MoviePoster
              v-for="movie in scoreMovie"
              :key="movie.movie_id"
              :movie="movie"
              class="carousel-item"
            />
          </div>
        </div>
        <div class="carousel-arrow right" @click="slide(1)">
          &gt;
        </div>
      </div>
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
    return {
      currentIndex: 0,
      itemWidth: 200,
      numVisibleItems: 8,
      numItems: 0,
      wrapperWidth: 0,
      autoSlideInterval: null // 추가: 자동 슬라이드를 위한 인터벌 변수

    }
  },
  created() {
    
    this.getComments()
  },
  mounted() {
    this.getMovies()
    this.calculateCarousel()
    this.startAutoSlide() // 추가: 컴포넌트 마운트 후 자동 슬라이드 시작
  },
  destroyed() {
    this.stopAutoSlide() // 추가: 컴포넌트 언마운트 시 자동 슬라이드 중지
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
    // shuffledMovie() {
    //   const movies = this.$store.getters.getMovies
    //   const s_movies = _.shuffle(movies)
    //   return s_movies
    // },
    scoreMovie() {
      const movies = this.$store.getters.getMovies
      const sortedMovies = _.orderBy(movies, ['star_score'], ['desc']);
      return sortedMovies
    }
  },
  methods: {
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.slide(1) // 오른쪽으로 한 개씩 슬라이드
      }, 5000) // 3초마다 슬라이드
    },

    stopAutoSlide() {
      clearInterval(this.autoSlideInterval)
    },
    getMovies() {
      this.$store.commit('GET_MOVIE')
    },
    getComments() {
      if (this.$store.state.comments) {
        return
      }
      this.$store.commit('GET_COMMENT')
    },
    calculateCarousel() {
      const carouselInner = this.$refs.carouselInner;
      const carouselWrapper = carouselInner.querySelector('.carousel-wrapper');
      this.wrapperWidth = carouselWrapper.offsetWidth;
      this.numItems = carouselWrapper.childElementCount;
    },
    slide(direction) {
      const carouselInner = this.$refs.carouselInner;
      const maxOffset = this.wrapperWidth - (this.numVisibleItems * this.itemWidth);
      const newOffset = carouselInner.scrollLeft + (direction * this.itemWidth * 3);
      carouselInner.scrollLeft = Math.max(0, Math.min(maxOffset, newOffset));
    }
  }
}
</script>

<style>
#main {
  background-color: rgba(25, 22, 31, 1);
  color: aliceblue;
  margin-top: -20px;
}

#now_box {
  display: flex;
}

#poster_box {
  display: flex;
  width: 1600px;
}

.carousel {
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}

.carousel-inner {
  display: flex;
  transition: transform 0.3s ease;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.carousel-wrapper {
  display: flex;
}

.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.carousel-arrow.left {
  left: 0;
}

.carousel-arrow.right {
  right: 0;
}

</style>