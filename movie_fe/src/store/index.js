import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    user: null,
    token: null,
    userdata: null,
    movies: null,
    comments: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    getNowPlaying(state) {
      if (state.movies) {
        // 특정 영화 가져오기
        const targets = [385687, 447365, 497828, 502356, 603692]
        return state.movies.filter(movie => targets.includes(movie.movie_id))
      }
      return
    },
    getMoviesByIds: (state) => {
      return (movieIds) => {
        if (state.movies) {
          return state.movies.filter(movie => movieIds.includes(movie.movie_id));
        }
        return [];
      }
    },
    getMovies(state) {
      if (state.movies) {
        return state.movies
      }
      return
    },
    getMovieById: (state) => (movie_id) => {
      return state.movies.find(movie => movie.movie_id === movie_id);
    },
    getCommentsByMovieId: (state) => (movieId) => {
      return state.comments.filter(comment => comment.movie === movieId);
    },
  },
  mutations: {
    SAVE_TOKEN(state, token){
      state.token = token
      //router.push({name: 'main'}) 
      //store/index.js $router 접근불가 -> import 해야 함
      console.log('토큰받음')
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          const user = res.data.pk
          state.user = user
          axios({
            method: 'get',
            url: `${API_URL}/api/v1/users/${user}`,
          })
          .then((res) => {
            state.userdata = res.data
            if (res.data.nickname) {
              router.push({name: 'main'}) 
            } else {
              router.push({name: 'profile', params: { id: state.user } })
            }
          })
          .catch((err) => {
            console.log(err)
            alert('Broken User Data')
          })
          // const user = res.data;
          // console.log(user)
          // state.user = user.pk;
          
        })
        .catch((err) => {
          console.log(err)
        })
    },
    LOGOUT(state) {
      state.token = null
      state.user = null
      state.userdata = null
      state.comments = null
      state.movies = null
      router.replace({name: 'main'})
    },
    GET_MOVIE(state) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`
      })
        .then((res) => {
          console.log(res)
          state.movies = res.data
          axios({
            method: 'get',
            url: `${API_URL}/movies/genres`
          })
          .then((res) => {
            console.log(res);
            const genres = res.data;
          
            state.movies.forEach((movie) => {
              movie.genre_ids = movie.genre_ids.map((genreId) => {
                const genre = genres.find((genre) => genre.id === genreId);
                return genre ? genre.name.replace(/"/g, "") : null;
              });
            });
          })
            .catch((err) => {
              console.log(err)
              alert('영화 데이터 조작 실패')
            })
          })
      .catch((err) => {
        console.log(err)
        alert('영화 불러오기 실패')
      })
    },
    GET_COMMENT(state) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/comment`
      })
      .then((res) => {
        console.log(res)
        state.comments = res.data
        
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/users/nickname`
        })
        .then((res) => {
          console.log(res);
          const nicknames = res.data;
          console.log('nickname')
          console.log(nicknames)
          
          state.comments.forEach((comment) => {
            const user = nicknames.find((u) => u.id === comment.user);
            comment.user = user.nickname ? user.nickname : null;
          });
        })
          .catch((err) => {
            console.log(err)
            alert('유저 데이터 조작 실패')
          })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // UPDATE_STARSCORE(state, datas) {
    //   return
    // }
  },
  actions: {
    signUp(context, payload){
      console.log('payload')
      console.log(payload)
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      const email = payload.useremail
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, 
          email,
          password1, 
          password2,
        }
      })
      .then((res) => {
        console.log('a')
        console.log(res)
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch((err) => {
        console.log('b')
        console.log(err.response)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios ({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((res) => {
        console.log('토큰받기')
        context.commit('SAVE_TOKEN', res.data.key)

        
      })
      .catch((err) => {
        alert('아이디와 비밀번호를 정확히 입력해주세요')
        console.log(err)
      })
    },
    LogOut(context) {
      context.commit('LOGOUT')
    },
    submitComment({ state, commit }, payload){
      const content = payload.content
      const star_score = payload.star_score
      const movie = payload.movie
      const user = state.user
      console.log(content, star_score, movie, user)

      axios({
        method: 'post',
        url: `${API_URL}/movies/comment`,
        data: {
          content,
          star_score,
          movie,
          user,
        }
      })
      .then(response => {
        // 댓글 작성 성공 후 처리할 내용
        console.log('댓글 작성 성공:', response.data);
        // 페이지 리로드 또는 다른 작업 수행
        commit('GET_COMMENT')
        
      })
      .catch(error => {
        // 댓글 작성 실패 시 처리할 내용
        console.error('댓글 작성 실패:', error.response);
      });
    },
    deleteComment({ state, commit }, id){
      const comment_id = id
      console.log(comment_id,id)
      axios({
        method: 'delete',
        url: `${API_URL}/movies/comment/${comment_id}`,
        headers: {
          Authorization: `Token ${state.token}`,
        },
      })
      .then(response => {
        console.log(response.data)
        commit('GET_COMMENT')
      })
      .catch(error => {
        console.error(error.response)
      })
    },
    cal_starScore({ getters, commit }, movie_id) {
      console.log('cal 로그')
      console.log(movie_id)
      const comments = getters.getCommentsByMovieId(movie_id)
      console.log(comments)

      let averageStarScore = 0

      if (comments.length === 0) {
        // averageStarScore = 0 // 해당 영화의 comment가 없을 경우 0을 반환
        console.log('무', averageStarScore)
      } else {
        const totalStarScore = comments.reduce((sum, comment) => sum + comment.star_score, 0);
        console.log('총점: ',totalStarScore)
        averageStarScore = (totalStarScore / comments.length).toFixed(1)
        averageStarScore = parseFloat(averageStarScore)
        console.log('평점: ', averageStarScore)
      }
      
      // commit('UPDATE_STARSCORE', [averageStarScore, movie_id])
      // return averageStarScore; // 평균 star_score 반환
      axios({
        method: 'get',
        url: `${API_URL}/movies/${movie_id}`,
        // data: {
        //   star_score: parseInt(averageStarScore)
        // },
      })
      .then((response) => {
        console.log('점수 영화 조회', response.data)

        axios({
          method: 'patch',
          url: `${API_URL}/movies/${movie_id}`,
          data: {
            movie_id: movie_id,
            star_score: averageStarScore,
            genre_ids: response.data.genre_ids,
            overview: response.data.overview,
            poster_path: response.data.poster_path,
            title: response.data.title
          }
        })
        .then((res) => {
          console.log('점수 업데이트?', res.data)
          commit('GET_MOVIE')
        })
        .catch((err) => {
          console.log('점수 업데이트 실패',err)
        })
      })
      .catch((error) => {
        console.error('점수 업데이트 실패',error)
      })
    },
  },
  modules: {
  }
})


