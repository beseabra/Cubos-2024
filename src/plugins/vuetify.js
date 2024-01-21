import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import api from "@/services/api";

Vue.use(Vuetify);
Vue.prototype.$http = api;

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#2c3e50",
        logo: "#000000",
        backgroundInput: "#e5e5e5",
      },
      dark: {
        primary: "#0000000",
        logo: "#ffffff",
        backgroundInput: "#1a191b",
      },
    },
  },
});
