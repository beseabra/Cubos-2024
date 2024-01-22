<template>
  <v-col class="mb-5 m-1" cols="12">
    <v-row style="padding-left: 60px; padding-right: 60px; margin-top: 10px">
      <v-text-field
        v-model="inputValue"
        placeholder="Pesquise por filmes"
        append-icon="mdi-magnify"
        :style="{ background: getBackgroundColor }"
        style="height: 40px"
        outlined
        dense
      />

      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group v-model="selectedItems">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-action>
                <v-checkbox v-model="item.selected"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn @click="clearSelections">Limpar Seleções</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-col
      :class="{
        'transparent-card': isDarkTheme,
        'transparent-card-light': !isDarkTheme,
      }"
      style="margin-top: 20px"
    >
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
  },
  methods: {
    searchMovies(page, initialValue) {
      const query = this.inputValue.trim();
      if (!query) {
        this.results = [];
        return;
      }

      const apiUrl = `/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${page}`;

      this.$http
        .get(apiUrl)
        .then((response) => {
          console.log("Dados recebidos:", response.data);
          this.results = response.data.results.slice(
            initialValue,
            10 + initialValue
          );

          // Atualiza o total de páginas após receber os resultados
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
    },
  },

  data() {
    return {
      inputValue: "",
      page: 1,
      genres: [],
      items: [
        { title: "Click Me", selected: false },
        { title: "Click Me", selected: false },
        { title: "Click Me", selected: false },
        { title: "Click Me 2", selected: false },
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

<style>
.transparent-card {
  background: rgba(0, 0, 0, 0.5);
}
.transparent-card-light {
  background: rgba(255, 255, 255, 0.5);
}
</style>
