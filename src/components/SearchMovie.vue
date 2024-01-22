<template>
  <v-row style="padding-left: 50px; padding-right: 50px; margin-top: 10px">
    <v-col
      v-for="movie in searchResults"
      :key="movie.id"
      cols="6"
      sm="5"
      md="4"
      lg="3"
      xl="2"
    >
      <MovieCard :movie="movie" :genres="genres" />
    </v-col>
  </v-row>
</template>
<script>
import MovieCard from "./MovieCard.vue";

export default {
  name: "SearchMovies",
  components: {
    MovieCard,
  },
  props: {
    searchResults: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    genres: [],
    page: 1,
  }),
  computed: {
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
  },
  async mounted() {
    await this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await this.$http.get("/genre/movie/list?language=pt");
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.transparent-card {
  background: rgba(0, 0, 0, 0.5);
}
.transparent-card-light {
  background: rgba(255, 255, 255, 0.5);
}
</style>
