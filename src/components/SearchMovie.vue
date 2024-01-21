<template>
  <v-row style="padding-left: 50px; padding-right: 50px">
    <v-col
      v-for="movie in searchResults"
      :key="movie.id"
      cols="12"
      sm="5"
      md="4"
      lg="3"
    >
      <MovieCard :movie="movie" />
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
  methods: {},
};
</script>

<style scoped></style>
