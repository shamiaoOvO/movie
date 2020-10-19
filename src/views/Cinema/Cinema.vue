<template>
  <div>
    <v-touch
      v-on:swipeleft="onSwipeLeft"
      v-on:swiperight="onSwipeRigth"
      :swipe-options="{ direction: 'horizontal' }"
    >
      <MovieListTopNav></MovieListTopNav>
    </v-touch>
  </div>
</template>

<script>
import MovieListTopNav from "@/components/MovieListTopNav";
export default {
  components: {
    MovieListTopNav,
  },
  methods: {
    onSwipeLeft: function () {
      this.$router.push({ path: "/center" });
    },
    onSwipeRigth: function () {
      this.$router.push({ path: "/film/comingsoon" });
    },
  },
};
</script>