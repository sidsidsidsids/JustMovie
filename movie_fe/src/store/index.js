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
      state.comments = null
      router.push({name: 'main'})
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
      })
      .catch((err) => {
        console.log(err)
      })
    }
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
    deleteComment({ commit }, id){
      const comment_id = id
      console.log(comment_id,id)
      axios({
        method: 'delete',
        url: `${API_URL}/movies/comment/${comment_id}`
      })
      .then(response => {
        console.log(response.data)
        commit('GET_COMMENT')
      })
      .catch(error => {
        console.error(error.response)
      })
    }
  },
  modules: {
  }
})


