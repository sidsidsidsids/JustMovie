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
          <router-link to="/home">
            <img src="./assets/logo2.png" alt="Logo" class="logo" />
          </router-link>
        </div>
        <div class="button-container">
          <router-link v-if="isLogin" :to="{ name: 'profile', params: { id: $store.state.user } }" class="logbutton">My Account</router-link>
          <router-link v-else to="/create" class="logbutton">Sign Up</router-link>
          <router-link v-if="!isLogin" to="/login" class="logbutton" style="margin-right: 30px;">Login</router-link>
          <button v-if="isLogin" class="logbutton" style="margin-right: 30px;" @click="logout">Logout</button>
          
        </div>
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="sidebar">
        <h6 style='color:rgba(117, 114, 121, 1); margin-left: 50px'>MENU</h6>
        
        <div class="sidebar-item">
          
          <router-link to="/home"><font-awesome-icon icon="house" /> Home</router-link>
        </div>
        <div class="sidebar-item">
          
          <router-link to="/community"><font-awesome-icon icon="users" /> Community</router-link>
        </div>
        <div class="sidebar-item">
          <div class="search-container">
          
            <span class="search-text" @click="search"><font-awesome-icon icon="magnifying-glass" /> Search
              
            </span>
            <input ref="searchInput" 
            type="text" 
            v-model="searchQuery" 
            class="search-input" 
            list="movie-options"
            @keyup.enter="search" />
            <datalist id="movie-options">
              <option v-for="movie in movies" :value="movie.title" :key="movie.id">
                {{movie.title}}
              </option>
            </datalist>
          </div>
        </div>
        <div class="sidebar-item">
            
          <router-link to="/settings"><font-awesome-icon icon="screwdriver-wrench" /> Settings</router-link>
        </div>
        <div class="sidebar-item">
          <router-link to="/help"><font-awesome-icon icon="circle-info" />  Help</router-link>
        </div>
        <div class="sidebar-item-exit">
          <router-link to="/">
            <span @click="logout">
              <font-awesome-icon icon="right-from-bracket" />  Exit
            </span>
          </router-link>
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
      const foundMovie = this.movies.find(movie => movie.title === this.searchQuery);
      if (foundMovie) {
        // 일치하는 영화가 있는 경우 해당 영화의 movie_id를 파라미터로 가지고 특정 route로 이동
        this.$router.push({ name: 'detail', params: { movie_id: foundMovie.movie_id } });
      } else {
        // 일치하는 영화가 없는 경우 메시지 표시
        alert('정확한 영화 제목을 입력해주세요.');
      }
    },
    checkUser() {
      console.log('CHECKUSER')
      console.log(this.$store.state.user)
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
    this.checkUser()
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
  background-color: rgba(68, 65, 72, 0.5);
  color:aliceblue;
  border: none;
  border-bottom: 1px solid rgba(68, 65, 72, 1);
  padding: 5px;
  margin-right: 10px;
  margin-top: 5px; /* 검색어 입력창 위쪽 여백 추가 */
  border-radius: 3.5px;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(25, 22, 31, 1);
  min-height: 100vh;
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

.sidebar-item a:hover,
.sidebar-item a.router-link-active {
  color: #FFFFFF; /* 마우스를 올렸을 때 및 현재 활성화된 링크의 글자 색상 변경 */
}
.sidebar-item-exit {
  /* margin-top: 15px; */
  margin-bottom: 30px;
  margin-left: 50px;
  align-self: flex-start; /* 좌측 정렬로 변경 */
}

.sidebar-item-exit a {
  color: rgba(117, 115, 120, 1); /* 텍스트 색상을 하얀색으로 변경 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 볼드체 스타일 적용 */
}

.sidebar-item-exit a:hover {
  color: #FFFFFF; /* 마우스를 올렸을 때 및 현재 활성화된 링크의 글자 색상 변경 */
}

.search-text:hover {
  color: #FFFFFF
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

.logbutton {
  background: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: inherit;
  color: rgba(117, 115, 120, 1);
  text-decoration: none;
}


.logbutton:hover {
  color: #FFFFFF; /* 마우스를 올렸을 때 및 현재 활성화된 링크의 글자 색상 변경 */
  text-decoration: underline; /* 밑줄 제거 */
  font-weight: bold; /* 볼드체 스타일 적용 */
}
.search-text {
  cursor: pointer;
  color: rgba(117, 115, 120, 1);
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 볼드체 스타일 적용 */
  margin-bottom: 5px; /* Search 텍스트 아래 여백 추가 */

}
</style>
