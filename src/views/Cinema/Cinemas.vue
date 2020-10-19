<template>
  <div>
    <header>
      <div class="left" @click="goback">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA2CAMAAACRK2tAAAAAkFBMVEVHcEwcHBwZGhsaGhwZHBwqKioZGhv///8bGxs/Pz8ZGhseHh4eHh4cHBwZGxsaGhsZGxsfHx8ZGhwZGhsZGhsdHR0ZGhsZGhsaGhwbGxsZGhsbGxsZGxseHh4ZGxsZGhsaGhskJCQZGxsaGhwZGxsZGhwaGhwZGhwZGhsZHh4fHx8aGhsZGhsZGhsZGhsZGhteFmxMAAAAL3RSTlMAEv1YdgzJAUsE+hkhP5WksQi+0/c08uWGStxnZirs3c0HsoeWo4W91DMp6+T28faGh4gAAADjSURBVDjLxZXZkoJADEUbVxBQlG1AYRZ3Z/T8/9/5gK9JqgZL83puVVd3TjrO/bumfjVVA3PwNf4BVAofAXvliA2QBDIfDuD4LXN/BpOxzOMMUk/meQF1KPOmhb9I5lEJvxeZhzXczjL3UrjGMh9PYKZ0YLmCwVDmQQJsFAEWwEgXgIMhwNwQYNFTgNXyfQK4Lygj1yeQF/CpHeHiDE6elrCuaT+Uc2vgJ3A9mtW1e2f9GGzVP8dSrpN2rSUs7e3B6UYvi7VEWEORa4mohLbREk37HD3Sl+iRPEGPqtdCsVfSo+6AByDPg79r1AAAAABJRU5ErkJggg=="
          width="11px"
          height="18px"
          alt=""
        />
      </div>

      <div class="title">
        <span>{{ film.name }}</span>
      </div>
      <div class="right">
        <div>
          <i
            class="iconfont icon-sousuo-sousuofangdajing"
            style="font-size: 26px"
          ></i>
        </div>
      </div>
    </header>
    <Cinemas></Cinemas>
  </div>
</template>

<script>
import { movieDetailData, ticketListData } from "@/api/api";
import Cinemas from "@/components/Cinemas";
export default {
  data() {
    return {
      film: {},
    };
  },
  components: {
    Cinemas,
  },
  methods: {
    goback: function () {
      this.$router.go(-1);
    },
  },
  async mounted() {
    //发起通知,通知APP.vue需要移出底部菜单
    this.eventBus.$emit("footernav", false);
    let ret = await movieDetailData(this.$route.params.filmId);
    this.film = ret.data.data.film;
  },
  beforeDestroy() {
    //发起通知,恢复底部菜单
    this.eventBus.$emit("footernav", true);
  },
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 3000;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  .left {
    min-width: 15%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 15px;
  }
  .title {
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {
    width: 15%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-right: 15px;
  }
}
</style>