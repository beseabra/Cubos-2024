<template>
  <v-app>
    <v-containar class="hero">
      <nav-bar></nav-bar>
      <v-main>
        <Home />
      </v-main>
      <Footer />
    </v-containar>
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Home from "./views/Home.vue";

export default {
  name: "App",

  components: {
    Footer,
    NavBar,
    Home,
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
