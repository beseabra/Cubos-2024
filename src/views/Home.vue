<template>
  <v-col class="mb-5 mt-2" cols="12">
    <v-row class="d-flex justify-center align-center">
      <v-text-field
        v-model="inputValue"
        placeholder="Pesquise por filmes"
        append-icon="mdi-magnify"
        :style="{ background: getBackgroundColor }"
        class="search-field"
        outlined
        dense
      />

      <v-btn
        icon
        v-on="on"
        :class="cardButtonClasses"
        @click="toggleCheckboxes"
      >
        <v-icon>mdi mdi-tune-vertical</v-icon>
      </v-btn>
    </v-row>

    <v-row class="justify-center">
      <v-list
        class="d-flex mt-5"
        v-if="showCheckboxes"
        style="max-width: 500px; justify-content: center"
      >
        <v-col>
          <v-list-item-group v-model="selectedItems" class="d-flex">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-checkbox v-model="item.selected"></v-checkbox>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-row class="justify-center mt-3">
            <v-btn
              icon
              class="rounded"
              style="min-width: 200px"
              :class="cardButtonClasses"
              @click="clearSelections"
            >
              Limpar Seleções
            </v-btn>
          </v-row>
        </v-col>
      </v-list>
    </v-row>

    <v-col :class="cardClasses" style="margin-top: 20px">
      <template v-if="inputValue.trim() !== ''">
        <SearchMovie :searchResults="results" />
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="totalPages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="updateResults"
          ></v-pagination>
        </div>
      </template>
      <template v-else>
        <PopularMovie />
      </template>
    </v-col>
  </v-col>
</template>

<script>
import PopularMovie from "../components/PopularMovie.vue";
import SearchMovie from "../components/SearchMovie.vue";

export default {
  name: "HomeMovies",
  components: {
    PopularMovie,
    SearchMovie,
  },
  computed: {
    getBackgroundColor() {
      return this.$vuetify.theme.dark
        ? this.$vuetify.theme.themes.dark.backgroundInput
        : this.$vuetify.theme.themes.light.backgroundInput;
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
    cardButtonClasses() {
      return {
        "transparent-button": this.isDarkTheme,
        "transparent-button-light": !this.isDarkTheme,
      };
    },
    includeAdultParam() {
      return this.items.some((item) => item.selected && item.value === true);
    },
    yearParam() {
      const selectedYears = this.items
        .filter((item) => item.selected && item.value)
        .map((item) => item.value);

      return selectedYears.length > 0 ? selectedYears.join(",") : null;
    },
  },
  methods: {
    toggleCheckboxes() {
      this.showCheckboxes = !this.showCheckboxes;
    },
    searchMovies(page, initialValue) {
      const query = this.inputValue.trim();
      if (!query) {
        this.results = [];
        return;
      }

      const apiUrl = `/search/movie?query=${query}&include_adult=${
        this.includeAdultParam
      }&language=pt-BR&page=${page}${
        this.yearParam ? `&year=${this.yearParam}` : ""
      }`;

      this.$http
        .get(apiUrl)
        .then((response) => {
          this.results = response.data.results.slice(
            initialValue,
            10 + initialValue
          );

          this.totalPages = Math.ceil(response.data.total_results / 5);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    },
    clearSelections() {
      this.items.forEach((item) => {
        item.selected = false;
      });
      this.selectedItems = [];
    },
    updateResults() {
      const itemsPerPage = 10;
      const division = (this.page * itemsPerPage) / 20;
      const apiPage = Math.ceil(division);
      const initialValue = division === apiPage ? 10 : 0;
      this.searchMovies(apiPage, initialValue);
      window.scrollTo(0, 0);
    },
  },
  data() {
    return {
      inputValue: "",
      page: 1,
      genres: [],
      showCheckboxes: false,
      items: [
        { title: "Filmes +18", selected: false, value: true },
        { title: "2022", selected: false, value: "2023" },
        { title: "2023", selected: false, value: "2022" },
      ],
      selectedItems: [],
      results: [],
      totalPages: 1,
    };
  },
  watch: {
    inputValue() {
      if (this.debouncedSearch) {
        clearTimeout(this.debouncedSearch);
      }
      this.debouncedSearch = setTimeout(() => {
        this.page = 1;
        this.updateResults();
      }, 300);
    },
    page: "updateResults",
  },
};
</script>

<style scoped>
.search-field {
  height: 40px;
  max-width: 60%;
}

.transparent-card {
  background: rgba(0, 0, 0, 0.5);
}

.transparent-card-light {
  background: rgba(255, 255, 255, 0.5);
}

.transparent-button {
  background: rgba(128, 0, 128, 0.5);
  margin-left: 1rem;
}

.transparent-button-light {
  background: rgba(172, 148, 226, 0.5);
  margin-left: 1rem;
}
</style>
