<template>
  <div>
    <v-touch
      v-on:swipeleft="onSwipeLeft"
      v-on:swiperight="onSwipeRigth"
      :swipe-options="{ direction: 'horizontal' }"
    >
      <FilmList
        :list="list"
        :key="'film' + list.length"
        :type="type"
      ></FilmList>
    </v-touch>
  </div>
</template>

<script>
import { comingSoonListData } from "@/api/api";
import FilmList from "@/components/FilmList";
export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      type: 2,
    };
  },
  async mounted() {
    let ret = await comingSoonListData(this.pageNum);
    this.list = ret.data.data.films;
  },
  components: {
    FilmList,
  },
  methods: {
    onSwipeLeft: function () {
      this.$router.push({ path: "/cinema" });
    },
    onSwipeRigth: function () {
      this.$router.push({ path: "/film/nowplaying" });
    },
  },
};
</script>