<template>
  <v-app>
    <v-containar class="hero">
      <nav-bar></nav-bar>
    </v-containar>
  </v-app>
</template>
<script>
import NavBar from "./components/Navbar.vue";
export default {
  name: "DescriptionMovie",
  components: {
    NavBar,
  },
  data: () => ({
    //
  }),
};
</script>
