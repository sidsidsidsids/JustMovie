<template>
  <div>
    {{ comments }}
    <div class="commentBlock"
    v-for="comment in comments"
    :key="comment.comment_id">
        <MiniPoster
        :movieid="comment.movie_id"
        />
    </div>
  </div>
</template>

<script>
import MiniPoster from '@/components/MiniPoster'

export default {
    components: {
        MiniPoster
    },
    computed: {
        comments() {
            return this.$store.state.comments.slice().reverse()
        }
    }
}
</script>

<style>

</style>