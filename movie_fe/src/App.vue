<template>
  <!-- <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <button v-if="isLogin" @click="logout">Logout</button>
      <router-link v-else to="/login">Login</router-link> |
      <router-link v-if="isLogin" :to="{ name: 'profile', params: { user_id: $store.state.user } }">Profile</router-link> 
    </nav>
    
    <router-view/>
  </div> -->
  <div id="app">
    <nav>
      <div class="nav-items">
        <div class="logo-container">
          <router-link to="/">
            <img src="./assets/logo2.png" alt="Logo" class="logo" />
          </router-link>
        </div>
        <div class="button-container">
          <router-link v-if="isLogin" :to="{ name: 'profile', params: { user_id: $store.state.user } }">My Account</router-link>
          <router-link v-else to="/login">로그인</router-link>
          <button v-if="isLogin" class="logout-button" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="sidebar">
        <h6 style='color:rgba(117, 114, 121, 1); margin-left: 50px'>MENU</h6>
        
        <div class="sidebar-item">
          <i class="fa fa-home"></i>
          <router-link to="/">Home</router-link>
        </div>
        <div class="sidebar-item">
          <router-link to="/">Community</router-link>
        </div>
        <div class="sidebar-item">
          <div class="search-container">
            <span class="search-text" @click="search">Search</span>
            <input ref="searchInput" 
            type="text" 
            v-model="searchQuery" 
            class="search-input" 
            list="movie-options" />
            <datalist id="movie-options">
              <option v-for="movie in movies" :value="movie.title" :key="movie.id">
                {{movie.title}}
              </option>
            </datalist>
          </div>
        </div>
        <div class="sidebar-item">
          <router-link to="/">Settings</router-link>
        </div>
        <div class="sidebar-item">
          <router-link to="/">Help</router-link>
        </div>
        <div class="sidebar-item">
          <router-link to="/">Exit</router-link>
        </div>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      searchQuery: null,
    }
  },
  methods: {
    logout() {
      console.log('logout')
      this.$store.dispatch('LogOut')
    },
    search() {
      return
    }

  },
  computed: {
    // user() {
    //   return this.$store.state.user
    // },
    isLogin() {
      return this.$store.getters.isLogin
    },
    movies() {
      if (this.$store.state.movies) {
          return this.$store.state.movies
        }
      return null
    }
  },
  created() {
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
body {
  margin: 0;
  padding: 0;
}

.search-container {
  display: flex;
  flex-direction: column; /* 세로 방향으로 아이템 정렬 */
  align-items: flex-start;
}

.search-input {
  background-color: rgba(25, 22, 31, 1);
  color:aliceblue;
  border: none;
  border-bottom: 1px solid rgba(68, 65, 72, 1);
  padding: 5px;
  margin-right: 10px;
  margin-top: 5px; /* 검색어 입력창 위쪽 여백 추가 */

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}

nav {
  background-color: rgba(25, 22, 31, 1);
  padding: 20px;
  margin: 0px;
}

.content-wrapper {
  display: flex;
}

.sidebar {
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgba(25, 22, 31, 1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  padding: 10px;
}

.main-content {
  flex: 1;
  padding: 0px;
  margin: 0px
}


.sidebar-item {
  /* margin-top: 15px; */
  margin-bottom: 30px;
  margin-left: 50px;
  align-self: flex-start; /* 좌측 정렬로 변경 */
}

.sidebar-item a {
  color: rgba(117, 115, 120, 1); /* 텍스트 색상을 하얀색으로 변경 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 볼드체 스타일 적용 */
}

.nav-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 30px;
}

.nav-wrapper {
  margin-top: 30px;
}

.logout-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  color: inherit;
  text-decoration: underline;
}

.search-text {
  cursor: pointer;
  color: rgba(117, 115, 120, 1);
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 볼드체 스타일 적용 */
  margin-bottom: 5px; /* Search 텍스트 아래 여백 추가 */

}
</style>
