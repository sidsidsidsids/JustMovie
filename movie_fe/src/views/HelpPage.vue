<template>
  <div id="Help"
  :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${r_movie.backdrop_path})`,
  backgroundSize: 'cover',
  backdropFilter: 'blur(100px)'}">
    <!-- <div ref="canvas"></div> -->
    
    <div id="helpbox">
    <p style="color:white; font-size:40px;">도움이 필요하신가요?</p>
    <input type="text" id="username" v-model="username" placeholder="이름을 입력하세요" class="input-field2"><br>
    <input type="text" id="email" v-model="email" placeholder="이메일을 입력하세요" class="input-field2"><br>
    <textarea id="message" v-model="message" placeholder="문의 내용을 입력하세요" class="input-field2" style="height:200px; font-family: 'Arial', sans-serif; resize: none;"></textarea><br> <!-- 수정된 부분 -->
    <input type="submit" value="문의하기" class="help-button" @click="ready">
 
    </div>
  </div>
</template>

<script>
// import * as THREE from 'three';
import _ from 'lodash'
export default {
  methods: {
    ready() {
      alert('접수되었습니다.')
    }
  },
  computed: {
    r_movie() {
      const movies = this.$store.getters.getMovies
      const s_movie = _.shuffle(movies)[0]
      return s_movie
    }
  },
};
</script>

<style>
#Help{
    display: flex;
    justify-content: center;
    min-height: 100vh;
}
#helpbox{
  color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 500px;
 

}
.input-field2 {
  width: 480px;
  padding: 10px;
  background-color: rgba(51,51,51,0.5);
  color: white;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  }
.help-button {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 4px;
  color: rgba(25, 22, 31, 1);
  font-weight: bold;
  cursor: pointer;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>