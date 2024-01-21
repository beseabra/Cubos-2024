<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mx-auto"
      max-width="270"
      outlined
    >
      <router-link :to="`/movie/${movie.id}`">
        <v-img :src="podtPath" max-height="250px">
          <div v-if="hover" class="body-2">
            <v-progress-circular
              :value="Math.round(movie.vote_average * 10)"
              :size="116"
              :width="12"
              color="lime"
            >
              <div class="percentage-text">
                {{ Math.round(movie.vote_average * 10) }}%
              </div>
              <div class="inner-circle"></div>
            </v-progress-circular>
          </div>
        </v-img>
      </router-link>
      <v-card-title>
        <div class="headline">{{ movie.title }}</div>
      </v-card-title>
      <v-card-subtitle>
        <div class="body-2">{{ movie.release_date }}</div>
      </v-card-subtitle>
      <v-card-text>
        <div class="body-2">
          {{
            movie.genre_ids
              ? movie.genre_ids
                  .map((genreId, index) => genretypeName(genreId, index))
                  .join(", ")
              : ""
          }}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      required: true,
    },
    genres: {
      required: false,
    },
  },
  computed: {
    podtPath() {
      return "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    },
  },
  methods: {
    genretypeName(genreId) {
      if (Array.isArray(this.genres)) {
        for (const item of this.genres) {
          if (item.id === genreId) {
            return item.name;
          }
        }
      }
      return "";
    },
  },
};
</script>

<style scoped>
.percentage-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: rgb(208, 255, 0);
}
.inner-circle {
  width: 91px;
  height: 91px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
