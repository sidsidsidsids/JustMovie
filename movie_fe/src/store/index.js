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
    }
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
          console.log(res)
          const user = res.data.pk
          state.user = user
          console.log(user)
          axios({
            method: 'get',
            url: `${API_URL}/api/v1/users/${user}`,
          })
          .then((res) => {
            console.log(res)
            state.userdata = res.data
            if (res.data.nickname) {
              router.push({name: 'main'}) 
            } else {
              router.push({name: 'profile', params: { user_id: res.data.id } })
            }
          })
          .else((err) => {
            console.log(err)
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
        console.log(err)
      })

      console.log(username, password)
    },
    LogOut(context) {
      context.commit('LOGOUT')
    }
  },
  modules: {
  }
})
