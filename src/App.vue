<template>
  <v-app>
    <v-containar class="hero">
      <nav-bar></nav-bar>
      <v-main class="transparent-card">
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
  computed: {},
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
.transparent-card {
  background: rgba(0, 0, 0);
}
.transparent-card-light {
  background: rgba(255, 255, 255);
}
</style>
