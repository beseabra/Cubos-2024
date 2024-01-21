<template>
  <v-col>
    <v-row
      style="margin-left: 100px; margin-right: 100px; margin-top: 10px"
      :class="{
        'transparent-card': isDarkTheme,
        'transparent-card-light': !isDarkTheme,
      }"
    >
      <v-col
        v-for="movie in paginatedMovies"
        :key="movie.id"
        cols="12"
        sm="5"
        md="4"
        lg="3"
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
      ></v-pagination>
    </div>
  </v-col>
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
        const response = await this.$http.get("/genre/movie/list");
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
