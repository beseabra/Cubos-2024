<template>
  <v-col class="mb-5" cols="12">
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

    <template v-if="inputValue.trim() !== ''">
      <SearchMovie :searchResults="results" />
    </template>
    <template v-else>
      <PopularMovie />
    </template>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
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
  },
  methods: {
    searchMovies() {
      const query = this.inputValue.trim();
      if (!query) {
        this.results = [];
        return;
      }

      this.$http
        .get(
          `/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`
        )
        .then((response) => {
          console.log("Dados recebidos:", response.data);
          this.results = response.data.results;
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
  },
  data: () => ({
    inputValue: "",
    page: 1,
    items: [
      { title: "Click Me", selected: false },
      { title: "Click Me", selected: false },
      { title: "Click Me", selected: false },
      { title: "Click Me 2", selected: false },
    ],
    selectedItems: [],
    results: [],
  }),
  watch: {
    inputValue: function () {
      if (this.debouncedSearch) {
        clearTimeout(this.debouncedSearch);
      }
      this.debouncedSearch = setTimeout(() => {
        this.searchMovies();
      }, 300);
    },
  },
};
</script>
