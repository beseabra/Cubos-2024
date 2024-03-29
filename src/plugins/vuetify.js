import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import api from "@/services/api";

Vue.use(Vuetify);
Vue.prototype.$http = api;

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#402060",
        logo: "#000000",
        backgroundInput: "#EAD5F9",
        text: "#000000",
        subtext: "#2f2f33",
      },
      dark: {
        primary: "#000000",
        logo: "#ffffff",
        backgroundInput: "#1a191b",
        text: "#B5B2BC",
        subtext: "#898989",
      },
    },
  },
});
