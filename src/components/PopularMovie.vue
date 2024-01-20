<template>
  <v-row style="padding-left: 50px; padding-right: 50px">
    <v-col
      v-for="movie in movies"
      :key="movie.id"
      cols="12"
      sm="5"
      md="4"
      lg="3"
    >
      <MovieCard :movie="movie" :genres="genres" />
    </v-col>
  </v-row>
</template>
<script>
import MovieCard from "./MovieCard.vue";
export default {
  name: "PopularMovie",
  components: {
    MovieCard,
  },
  data: () => ({
    movies: [],
    genres: [],
  }),
  async mounted() {
    this.fetchGenres();
    try {
      const response = await this.$http.get("/movie/popular");
      this.movies = response.data.results;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await this.$http.get("/genre/movie/list");
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
