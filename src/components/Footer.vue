<template>
  <v-footer color="primary" class="d-flex align-center justify-center" app>
    <span
      :class="[
        $vuetify.theme.dark ? 'white--text' : 'white--text',
        'text-center',
      ]"
    >
      2023 &copy; Todos os direitos reservados a <b>Cubos Movies</b>
    </span>
  </v-footer>
</template>

<script>
export default {
  name: "footerComponent",
};
</script>

<style></style>
