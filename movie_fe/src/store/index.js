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
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SAVE_TOKEN(state, token){
      state.token = token
      //router.push({name: 'main'}) 
      //store/index.js $router 접근불가 -> import 해야 함
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          console.log(res)
          const user = res.data;
          if (user.first_name) {
            router.push({name: 'main'}) 
          } else {
            router.push({name: 'profile'})
            
          }
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
        console.log(res)
        context.commit('SAVE_TOKEN', res.data.key)

        
      })
      .catch((err) => {
        console.log(err)
      })

      console.log(username, password)
    },
  },
  modules: {
  }
})
