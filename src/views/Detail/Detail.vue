<template>
  <div class="detail" v-cloak>
    <div class="film-header">
      <div class="goBack">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt=""
          @click="goBack"
        />
      </div>
      <div class="title">我和我的家乡</div>
      <!---->
    </div>
    <div class="img">
      <!-- <img :src="film.poster" /> -->
      <img v-lazy="film.poster" />
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{ film.name }}</span>
          <span class="item">{{ film.movieType }}</span>
        </div>
        <div class="film-grade" v-if="isGrade">
          <span class="grade">{{ film.grade }}</span>
          <span class="grade-text"> 分</span>
        </div>
      </div>
      <div class="grey-text">{{ film.category }}</div>
      <div class="grey-text">{{ film.premiereAt | parsePremiereAt }} 上映</div>
      <div class="grey-text">{{ film.nation }} | {{ film.runtime }} 分钟</div>
      <div class="grey-text film-synopsis" :class="{ hidde: isHidden }">
        {{ film.synopsis }}
      </div>
      <div v-if="isHidden" class="toggle" @click="toggle">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
          alt=""
          :class="{ upper: isupper }"
        />
      </div>

      <div v-else class="toggle" @click="toggle">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
          alt=""
          :class="{ upper: isupper }"
        />
      </div>
    </div>
    <!-- 演职员表 -->
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <Swiper :key="'actors_' + film.actors.length" :num="num">
        <!-- 循环输出图片信息 -->
        <div
          class="swiper-slide"
          v-for="(item, index) in film.actors"
          :key="index"
        >
          <div class="actors-img">
            <img v-lazy="item.avatarAddress" />
          </div>
          <span class="actors-name">{{ item.name }}</span>
          <span class="actors-role">{{ item.role }}</span>
        </div>
      </Swiper>
    </div>
    <!-- 剧照 -->
    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
      </div>
      <Swiper :key="'photos_' + film.photos.length" :num2="num2">
        <!-- 循环输出图片信息 -->
        <div
          class="swiper-slide"
          v-for="(item, index) in film.photos"
          :key="index"
        >
          <div class="photos-img">
            <img v-lazy="item" />
          </div>
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { movieDetailData } from "@/api/api";
import Swiper from "@/components/Swiper";
//引入moment
import moment from "moment";
export default {
  data() {
    return {
      film: { actors: [], photos: [] },
      isHidden: true,
      isupper: false,
      isGrade: true,
      num: 0,
      num2: 1,
    };
  },
  async mounted() {
    let ret = await movieDetailData(this.$route.params.filmId);
    this.film = ret.data.data.film;
    this.film.movieType = this.film.filmType.name;

    //判断是否有分数
    if (this.film.grade == undefined) {
      this.isGrade = false;
    }
  },
  filters: {
    parsePremiereAt: function (val) {
      //时间戳获得的单位为秒,需要调整为毫秒
      return moment(val * 1000).format("YYYY-MM-DD");
    },
  },
  methods: {
    toggle() {
      this.isHidden = !this.isHidden;
      this.isupper = !this.isupper;
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
  components: {
    Swiper,
  },
  created() {
    //发起通知,通知APP.vue需要移出底部菜单
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    //发起通知,恢复底部菜单
    this.eventBus.$emit("footernav", true);
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.detail {
  background-color: rgb(244, 244, 244);
  //   margin-bottom: 50px;
  overflow: hidden;
  .film-header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    color: transparent;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
    .goBack {
      height: 30px;
      position: absolute;
      top: 5px;
      left: 5px;
      img {
        width: 30px;
      }
    }
  }
  .img {
    width: 100%;
    height: 56vw;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .film-name {
        width: 256px;
        span {
          vertical-align: middle;
        }
        .name {
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade {
        width: calc(100% - 250px);
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .hidde {
      max-height: 36px !important;
    }
    .film-synopsis {
      max-height: 117px;
      overflow: hidden;
      transition: max-height 0.5s ease;
      margin-top: 12px;
    }
    .toggle {
      text-align: center;
      display: block;
      height: auto;
      margin: auto;
      line-height: normal;
      color: #797d82;
      font-size: 12px;
      img {
        width: 8px;
        margin: auto;
      }
      .upper {
        transform: rotate(180deg);
      }
    }
  }
  .actors {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px 0;

    .actors-title-text {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
      margin-left: 15px;
    }
    .actors-name {
      padding-top: 6px;
      font-size: 12px;
      color: #191a1b;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .actors-role {
      font-size: 10px;
      color: #797d82;
    }
    .swiper-slide {
      text-align: center;
      margin-top: 10px;
      .actors-img {
        height: 90px;
        overflow: hidden;
        position: relative;
        img {
          width: 85px;
          margin-top: 15px;
          position: relative;
          top: -20%;
        }
      }
    }
  }
  .photos {
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 15px 0 20px;

    .photos-title-text {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
      margin-left: 15px;
    }
    .photos-name {
      padding-top: 6px;
      font-size: 12px;
      color: #191a1b;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .photos-role {
      font-size: 10px;
      color: #797d82;
    }
    .swiper-slide {
      text-align: center;
      margin-top: 10px;
      .photos-img {
        height: 90px;
        overflow: hidden;
        position: relative;
        img {
          width: 150px;
        }
      }
    }
  }
}
</style>