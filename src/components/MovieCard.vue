<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <div
      :elevation="hover ? 12 : 2"
      max-width="270"
      max-height="340"
      class="mx-auto"
      outlined
      style="position: relative"
    >
      <router-link :to="`/movie/${movie.id}`">
        <div style="position: relative">
          <v-img max-height="550">
            <img
              :src="podtPath"
              :alt="movie.title"
              @error="handleImageError"
              style="width: 100%; object-fit: cover"
            />
            <div
              class="card-title-container"
              :class="{ hovered: hover }"
              :style="{ height: hover ? '100px' : '80px' }"
            >
              <v-card-title>
                <div class="headline">{{ movie.title }}</div>
              </v-card-title>
              <v-card-text>
                <div class="body-2" :style="{ opacity: hover ? 1 : 0 }">
                  {{
                    movie.genre_ids
                      ? movie.genre_ids
                          .map((genreId, index) =>
                            genretypeName(genreId, index)
                          )
                          .join(", ")
                      : ""
                  }}
                </div>
              </v-card-text>
            </div>

            <div v-if="hover" class="body-2 progress-overlay">
              <v-progress-circular
                :value="Math.round(movie.vote_average * 10)"
                :size="116"
                :width="12"
                color="lime"
                style="
                  position: absolute;

                  transform: translate(120%, -300%);
                "
              >
                <div class="percentage-text">
                  {{ Math.round(movie.vote_average * 10) }}%
                </div>
                <div class="inner-circle"></div>
              </v-progress-circular>
            </div>
          </v-img>
        </div>
      </router-link>
    </div>
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
      return "https://image.tmdb.org/t/p/w300" + this.movie.poster_path;
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
    handleImageError(event) {
      event.target.src = require("@/assets/cinema.jpg");
    },
  },
};
</script>

<style scoped>
.card-container {
  overflow: hidden;
}

.card-title-container {
  transition: transform 0.3s;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  );
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem 0.5rem 1;
}

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
