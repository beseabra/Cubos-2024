<template>
  <v-app>
    <v-containar class="hero">
      <nav-bar></nav-bar>
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </v-containar>
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    Footer,
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.hero {
  background-image: url("./assets/background.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
