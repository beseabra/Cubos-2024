<template>
  <v-col class="mb-5" cols="12">
    <v-row style="padding-left: 60px; padding-right: 60px; margin-top: 10px">
      <v-text-field
        v-model="inputValue"
        placeholder="Pesquise por filmes"
        append-icon="mdi-magnify"
        outlined
        dense
      ></v-text-field>

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

    <PopularMovie />
  </v-col>
</template>

<script>
import PopularMovie from "../components/PopularMovie.vue";
export default {
  name: "HomeMovies",
  components: {
    PopularMovie,
  },
  methods: {
    clearSelections() {
      this.items.forEach((item) => {
        item.selected = false;
      });
      this.selectedItems = [];
    },
  },
  data: () => ({
    inputValue: "",
    items: [
      { title: "Click Me", selected: false },
      { title: "Click Me", selected: false },
      { title: "Click Me", selected: false },
      { title: "Click Me 2", selected: false },
    ],
    selectedItems: [],
  }),
};
</script>
