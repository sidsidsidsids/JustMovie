<template>
  <div id="community">
    <div class="commentBlock"
    v-for="comment in comments"
    :key="comment.comment_id"
    :style="{ backgroundImage: `linear-gradient( rgba(25, 22, 31, 0.9), 
  rgba(25, 22, 31, 0.9) ), url(https://image.tmdb.org/t/p/original${getMovieById(comment.movie).backdrop_path})`,
  backgroundSize: 'contain, 50%',
  backdropFilter: 'blur(100px)'}"
  @click="gotoDetail(comment.movie)">
        <MiniPoster
        :movie="getMovieById(comment.movie)"
        />
        <p>" {{ comment.content }} "</p>
        <p> &nbsp; <font-awesome-icon icon="star" class="star" /> {{ comment.star_score }}</p>
        
        <p class="right"> &nbsp; {{ comment.user }}</p>
    </div>
  </div>
</template>

<script>
import MiniPoster from '@/components/MiniPoster'
import { mapGetters } from 'vuex'
export default {
    components: {
        MiniPoster
    },
    computed: {
        ...mapGetters(['getMovieById']),
        comments() {
           
            return this.$store.state.comments.slice().reverse()
        }
    },
    methods: {
        gotoDetail(movie_id) {
            console.log('디테일로 가요');
            this.$router.push({ name: 'detail', params: { movie_id } });
        },
    }
}
</script>

<style>
#community {
    background-color: rgba(25, 22, 31, 1);;
    margin-top: -10px;
}
.commentBlock {
    display: flex;
    background-color: rgba(25, 22, 31, 0.8);
    border: 2px solid rgba(68, 65, 72, 0.8);
    color: aliceblue;
    border-radius: 10px;
    margin: 10px;
    align-items: center;
    cursor: pointer;
}
/* .commentBlock:hover{
    transform: rotate(3600deg);
    transition: transform 6s
} */
.right {
    margin-left:auto;
    margin-right: 10px;
}

.star {
    color: rgba(246, 158, 0, 1);
}
</style>