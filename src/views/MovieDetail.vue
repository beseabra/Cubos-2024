<template>
  <div>
    <v-container>
      <v-row
        :class="{
          'transparent-card': isDarkTheme,
          'transparent-card-light': !isDarkTheme,
        }"
      >
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <router-link :to="`/movie/${movie.id}`">
                <v-img :src="posterPath" alt="" class="" />
              </router-link>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="4">
          <!-- Conteúdo da segunda coluna -->
          <h1 class="mt-5">{{ this.movie.title }}</h1>
          <h4 class="subtitle-2" color="text">
            Título Original: {{ this.movie.original_title }}
          </h4>
          <h4 class="subtitle grey--text mt-5">
            <i>{{ this.movie.overview }}</i>
          </h4>
        </v-col>

        <v-col cols="12" sm="4">
          <!-- Conteúdo da terceira coluna -->
          <h1 class="mt-5">{{ this.movie.title }}</h1>
          <h4 class="subtitle-2 grey--text">
            Título Original: {{ this.movie.original_title }}
          </h4>
          <h4 class="subtitle grey--text mt-5">
            <i>{{ this.movie.overview }}</i>
          </h4>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-container
          :class="{
            'transparent-card': isDarkTheme,
            'transparent-card-light': !isDarkTheme,
          }"
        >
          <v-row>
            <v-col cols="12">
              <v-card-title>
                <span class="headline">{{ this.movie.title }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="">
                      <div class="iframe-container">
                        <img :src="mediaURL" v-if="!isVideo" />
                        <iframe
                          allowfullscreen
                          v-if="isVideo"
                          :src="mediaURL"
                        ></iframe>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
      },
      isVideo: false,
      mediaURL: "",
    };
  },
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      immediate: true,
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        `/movie/${movieId}?append_to_response=credits,videos,images&language=pt-BR`
      );
      this.movie = response.data;
      this.openYouTubeModel();
    },

    openYouTubeModel() {
      if (this.movie.videos && this.movie.videos.results.length > 0) {
        this.mediaURL =
          "https://www.youtube.com/embed/" + this.movie.videos.results[0].key;
        this.isVideo = true;
      } else {
        this.isVideo = false;
      }
    },
  },
};
</script>

<style>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.transparent-card {
  background: rgba(0, 0, 0, 0.5);
}
.transparent-card-light {
  background: rgba(255, 255, 255, 0.5);
}
</style>
