<template>
  <v-app-bar app color="primary" :dark="$vuetify.theme.dark">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo-cubos-white.svg"
        transition="scale-transition"
        width="150"
      />
      <router-link to="/" tag="span" style="color: white">Movies</router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      icon
      class="rounded"
      style="margin-right: 1rem"
      :class="cardButtonClasses"
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
    >
      <v-icon>mdi-white-balance-sunny</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
    cardButtonClasses() {
      return {
        " transparent-button ": this.isDarkTheme,
        "transparent-button-light": !this.isDarkTheme,
      };
    },
  },
};
</script>

<style scoped>
.transparent-button {
  background: rgba(128, 0, 128, 0.5);
}
.transparent-button-light {
  background: rgb(227, 226, 231);
}
</style>
