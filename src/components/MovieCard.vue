<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mx-auto"
      max-width="270"
      outlined
    >
      <v-img :src="podtPath" max-height="250px" />
      <v-card-title>
        <div class="headline">{{ movie.title }}</div>
        <div class="body-2">{{ Math.round(movie.vote_average * 10) }}%</div>
      </v-card-title>
      <v-card-subtitle>
        <div class="body-2">{{ movie.release_date }}</div>
      </v-card-subtitle>
      <v-card-text>
        <div class="body-2">
          {{
            movie.genre_ids
              ? movie.genre_ids.map((geraId, index) =>
                  genretypeName(geraId, index)
                )
              : ""
          }}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      required: true,
    },
    genres: {
      required: false,
    },
  },
  computed: {
    podtPath() {
      return "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    },
  },
  methods: {
    genretypeName(geraId, index) {
      if (Array.isArray(this.genres)) {
        for (const item of this.genres) {
          if (item.id === geraId) {
            if (this.genres.length - 1 === index) {
              return item.name;
            } else {
              return item.name + ", ";
            }
          }
        }
      }
      return "";
    },
  },
};
</script>
