<template>
  <v-app-bar app color="primary" :dark="$vuetify.theme.dark">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo-cubos-white.svg"
        transition="scale-transition"
        width="100"
      />
      <v-text style="color: white">Movies</v-text>
    </div>

    <v-spacer></v-spacer>

    <v-btn target="_blank" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>mdi-white-balance-sunny</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
