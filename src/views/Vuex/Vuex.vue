<template>
  <div>
    {{ count }}
    {{ city }}
    <br />
    {{ getCount }}
    <br />
    <button @click="addthis">棒棒糖</button>
    <button @click="addthat">也是棒棒糖</button>
    <button @click="addwhat">异步棒棒糖</button>
    <button @click="addwhere">也是异步棒棒糖</button>
    <button @click="addnow">棒糖</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  mounted() {
    console.log(this.$store.state.city);
  },
  computed: {
    ...mapState(["count", "city"]),
    ...mapGetters(["getCount"]),
  },
  methods: {
    addthis() {
      this.$store.commit("add", 13);
    },
    ...mapMutations(["add"]),
    addthat() {
      this.add(20);
    },
    addwhat() {
      this.$store.dispatch("addAsync", 66);
    },
    ...mapActions(["addAsync"]),
    addwhere() {
      this.addAsync(99);
    },
    addnow() {
      console.log(this.$store.getters.getCount);
    },
  },
};
</script>