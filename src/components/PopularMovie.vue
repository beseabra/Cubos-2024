<template>
  <div style="margin: 1rem">
    <v-row>
      <v-col
        v-for="movie in paginatedMovies"
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
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        :items-per-page="10"
        class="mt-5"
        @input="changePage"
      ></v-pagination>
    </div>
  </div>
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
    page: 1,
  }),
  computed: {
    paginatedMovies() {
      const startIndex = (this.page - 1) * 10;
      const endIndex = startIndex + 10;
      return this.movies.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.movies.length / 10);
    },
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
  },
  async mounted() {
    await this.fetchGenres();
    await this.fetchPopularMovies();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await this.$http.get(
          "/genre/movie/list?language=pt",
          {}
        );
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchPopularMovies() {
      try {
        const response = await this.$http.get("/movie/popular");
        this.movies = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    changePage() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped></style>
