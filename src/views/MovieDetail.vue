<template>
  <div>
    <v-container>
      <v-row :class="cardClasses" class="mt-1">
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <router-link :to="`/movie/${movie.id}`">
                <v-img :src="posterPath" alt="" class="" />
              </router-link>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          sm="4"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div>
            <h1
              class="mt-5"
              :style="{
                color: isDarkTheme
                  ? $vuetify.theme.themes.dark.text
                  : $vuetify.theme.themes.light.text,
              }"
            >
              {{ movie.title }}
            </h1>
            <h4
              class="subtitle-2"
              :style="{
                color: isDarkTheme
                  ? $vuetify.theme.themes.dark.subtext
                  : $vuetify.theme.themes.light.subtext,
              }"
            >
              Título Original: {{ movie.original_title }}
            </h4>
            <div :class="cardClasses" class="mb-5 mt-5 pt-4 pb-5 pl-2 pr-5">
              <h3
                class="pl-1 mb-2 mt-5"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                SINOPSE
              </h3>
              <span
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                <i>{{ movie.overview }}</i>
              </span>
            </div>
          </div>
          <div
            class="subtitle-2 mb-5 mt-5 pt-5 pb-5 pl-2 pr-5"
            style="
              white-space: nowrap;
              display: inline-block;
              max-width: fit-content;
            "
            :class="cardClasses"
          >
            <h3 class="pl-1 mb-2" color=" subtext">Gêneros:</h3>
            <span
              v-for="(item, index) in movie.genres"
              :key="index"
              class="ml-1"
              style="
                background-color: rgba(193, 80, 255, 0.18);
                padding: 5px;
                white-space: nowrap;
                display: inline-block;
              "
            >
              {{ item.name }}
              <span v-if="movie.genres.length - 1 !== index" />
            </span>
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <v-row class="align-right">
            <div
              class="subtitle-2 mb-5 mt-5 pt-1 pb-1 pl-2 pr-2"
              style="
                white-space: nowrap;
                display: inline-block;
                max-width: fit-content;
              "
              :class="cardClasses"
            >
              <h3 class="pl-1" color=" subtext">POPULARIDADE</h3>
              <span class="pl-1">
                {{ movie.popularity }}
              </span>
            </div>
            <div
              class="subtitle-2 mb-5 mt-5 pt-1 pb-1 pl-2 pr-5"
              style="
                white-space: nowrap;
                display: inline-block;
                max-width: fit-content;
              "
              :class="cardClasses"
            >
              <h3 class="pl-1 mb-2" color=" subtext">VOTOS</h3>
              <span class="pl-1">
                {{ movie.vote_count }}
              </span>
            </div>
            <v-progress-circular
              :value="Math.round(movie.vote_average * 10)"
              :size="116"
              :width="12"
              :color="isDarkTheme ? 'lime' : 'primary'"
              class="progress-circle"
            >
              <div class="inner-circle">
                <div class="percentage-text">
                  {{ Math.round(movie.vote_average * 10) }}%
                </div>
              </div>
            </v-progress-circular>
          </v-row>

          <v-row class="alignItens d-flex">
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                LANÇAMENTO
              </h3>
              <span style="padding: 5px">
                {{ formatDate(movie.release_date) }}
              </span>
            </div>
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                DURAÇÃO
              </h3>
              <span style="padding: 5px">
                {{ formatDuration(movie.runtime) }}
              </span>
            </div>
          </v-row>
          <v-row class="alignItens d-flex">
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                SITUAÇÃO
              </h3>
              <span style="padding: 5px">
                {{ translateStatus(movie.status) }}
              </span>
            </div>
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                IDIOMA
              </h3>
              <span style="padding: 5px">
                {{ translateLanguage(movie.original_language) }}
              </span>
            </div>
          </v-row>
          <v-row class="alignItens d-flex">
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                ORÇAMENTO
              </h3>
              <span style="padding: 5px">
                ${{ formatCurrencyAbbr(movie.budget) }}
              </span>
            </div>
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                RECEITA
              </h3>
              <span style="padding: 5px">
                ${{ formatCurrencyAbbr(movie.revenue) }}
              </span>
            </div>
            <div
              class="subtitle-2 pt-1 pb-1 pl-2 pr-5 flex"
              :class="cardClasses"
            >
              <h3
                class="pl-1"
                :style="{
                  color: isDarkTheme
                    ? $vuetify.theme.themes.dark.subtext
                    : $vuetify.theme.themes.light.subtext,
                }"
              >
                LUCRO
              </h3>
              <span style="padding: 5px">
                ${{ formatCurrencyAbbr(movie.revenue - movie.budget) }}
              </span>
            </div>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-container :class="cardClasses">
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
    cardClasses() {
      return {
        "transparent-card": this.isDarkTheme,
        "transparent-card-light": !this.isDarkTheme,
      };
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
    formatDate(dateString) {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "pt-BR",
        options
      );
      return formattedDate;
    },
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    },
    formatCurrency(value) {
      return value
        ? value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "";
    },
    formatCurrencyAbbr(value) {
      const trillion = 1e12;
      const billion = 1e9;
      const million = 1e6;
      const thousand = 1e3;

      if (Math.abs(value) >= trillion) {
        return (
          (value / trillion).toLocaleString("en-US", {
            maximumFractionDigits: 1,
          }) + "T"
        );
      } else if (Math.abs(value) >= billion) {
        return (
          (value / billion).toLocaleString("en-US", {
            maximumFractionDigits: 1,
          }) + "B"
        );
      } else if (Math.abs(value) >= million) {
        return (
          (value / million).toLocaleString("en-US", {
            maximumFractionDigits: 1,
          }) + "M"
        );
      } else if (Math.abs(value) >= thousand) {
        return (
          (value / thousand).toLocaleString("en-US", {
            maximumFractionDigits: 1,
          }) + "K"
        );
      } else {
        return this.formatCurrency(value);
      }
    },
    translateLanguage(languageCode) {
      const languageTranslations = {
        en: "Inglês",
        pt: "Português",
        jp: "Japonês",
        fr: "Francês",
        de: "Alemão",
        it: "Italiano",
        ru: "Russo",
        es: "Espanhol",
        zh: "Chinês",
        ko: "Coreano",
        hi: "Hindi",
        ar: "Árabe",
        tr: "Turco",
        sv: "Sueco",
        nl: "Holandês",
        fa: "Persa",
        da: "Dinamarquês",
        he: "Hebraico",
        pl: "Polonês",
        th: "Tailandês",
        cs: "Tcheco",
        el: "Grego",
        hu: "Húngaro",
      };
      return languageTranslations[languageCode] || languageCode;
    },
    translateStatus(status) {
      const statusTranslations = {
        Released: "Lançado",
        Rumored: "Rumor",
        PostProduction: "Pós-produção",
        Planned: "Planejado",
        InProduction: "Em produção",
        Canceled: "Cancelado",
        "": "Desconhecido",
      };
      return statusTranslations[status] || status;
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
.align-right {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
}
.alignItens {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
  margin-bottom: 0.1rem;
}
</style>
