<template>
    <form @submit.prevent="submitComment">
    <div>
      <label for="content">댓글 내용:</label>
      <textarea id="content" v-model="content" required></textarea>
    </div>
    <div>
      <label for="starScore">별점:</label>
      <input type="number" id="starScore" v-model="starScore" min="0" max="5" required>
    </div>
    <button type="submit">댓글 작성</button>
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

<style>

</style>