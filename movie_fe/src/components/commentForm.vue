<template>
  <form @submit.prevent="submitComment" class="comment-form">
    <div>
      <label for="content"></label>
      <div class="comment-input">
        <textarea id="content" v-model="content" required></textarea>
        <div class='value-input'>
       
      <div style="display:flex; align-items:center; justify-content:center; margin:0px;">
      
      <label for="starScore"><font-awesome-icon icon="star" class="star-icon" /> </label>
      <span>별점 </span>
      <input type="number" id="starScore" v-model="starScore" min="0" max="5" required>

      </div>
       <button type="submit" class="comment-button">댓글 입력</button>
      </div>
      </div>
      <div>
    </div>
    </div>
    
  </form>
</template>

<script>
export default {
  data() {
    return {
      content: null,
      starScore: 0,
    };
  },
  methods: {
    submitComment() {
      const payload = {
        content: this.content,
        star_score: this.starScore,
        movie: this.$route.params.movie_id,
      }
      this.content = null
      this.$store.dispatch('submitComment', payload)

    //   // API 호출을 통해 댓글 작성
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/movies/comment`,
    //     data: commentData
    //   })
    //     .then(response => {
    //       // 댓글 작성 성공 후 처리할 내용
    //       console.log('댓글 작성 성공:', response.data);
    //       // 페이지 리로드 또는 다른 작업 수행
    //     })
    //     .catch(error => {
    //       // 댓글 작성 실패 시 처리할 내용
    //       console.error('댓글 작성 실패:', error.response);
    //     });
    },
  },
};
</script>

<style scoped>
.value-input{
  display: inline-block;
}
.comment-form {
  margin-top: 20px;
  color: #ffffff;

}

.comment-form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

.comment-input {
  display: flex;
  align-items:flex-start;
}

textarea {
  height: 70px;
  flex-grow: 1;
  padding: 10px;
  border: none;
  background-color: rgba(51, 51, 51, 0.5);
  color: #ffffff;
  border-radius: 3.5px;
  font-family: Arial, Helvetica, sans-serif;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: white;
  color: rgba(51, 51, 51, 1);
  border: none;
  border-radius: 3.5px;
  cursor: pointer;
  height: 63px;
}

input[type="number"] {
  width: 30px;
  padding: 5px;
  background-color: rgba(51, 51, 51, 0);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
}

.star-icon {
  margin-right: 5px;
  color: rgba(246, 158, 0, 1);
}
.comment-button{
  background-color: white;
  border: none;
  border-radius: 4px;
  color: rgba(25, 22, 31, 1);
  font-weight: bold;
}
</style>