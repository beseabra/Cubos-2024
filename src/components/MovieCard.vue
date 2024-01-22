<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <div
      :elevation="hover ? 12 : 2"
      class="movie-card"
      outlined
      style="position: relative"
    >
      <router-link :to="`/movie/${movie.id}`">
        <div style="position: relative">
          <v-img>
            <img
              :src="podtPath"
              :alt="movie.title"
              @error="handleImageError"
              style="width: 100%; object-fit: cover"
            />
            <div
              class="card-title-container"
              :class="{
                hovered: hover,
                'card-title-container': isDarkTheme,
                'card-title-light': !isDarkTheme,
              }"
              :style="{ height: hover ? '100px' : '80px' }"
            >
              <v-card-title>
                <div class="subtitle" style="font-size: 18px">
                  {{ truncatedTitle }}
                </div>
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

            <div v-if="hover && isDesktop" class="body-2 progress-overlay">
              <v-progress-circular
                :value="Math.round(movie.vote_average * 10)"
                :size="116"
                :width="12"
                color="lime"
                class="progress-circle"
              >
                <div class="inner-circle">
                  <div class="percentage-text">
                    {{ Math.round(movie.vote_average * 10) }}%
                  </div>
                </div>
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
    isDesktop() {
      return window.innerWidth >= 1024;
    },
    truncatedTitle() {
      const maxWords = 3;
      const words = this.movie.title.split(" ");
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
      }
      return this.movie.title;
    },
    isDarkTheme() {
      return this.$vuetify.theme.dark;
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
.movie-card {
  max-width: 270px;
  max-height: 500px;
  width: 100%;
  overflow: hidden;
}
.card-title-container {
  transition: transform 0.3s;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem 0.5rem 1;
}
.card-title-light {
  transition: transform 0.3s;
  background: linear-gradient(
    to bottom,
    rgba(143, 137, 137, 0.6),
    rgba(196, 186, 186, 0.9) 100%
  );
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem 0.5rem 1;
}

.progress-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.progress-circle {
  position: relative;
}

.percentage-text {
  font-size: 20px;
  color: rgb(208, 255, 0);
}

.inner-circle {
  width: 91px;
  height: 91px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
