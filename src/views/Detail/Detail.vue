<template>
  <div class="detail" v-cloak>
    <div class="img">
      <img :src="film.poster" />
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
  </div>
</template>

<script>
import { movieDetailData } from "@/api/api";

//引入moment
import moment from "moment";
export default {
  data() {
    return {
      film: {},
      isHidden: true,
      isupper: false,
      isGrade: true,
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
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.detail {
  margin-bottom: 50px;
  .img {
    width: 100%;
    height: 56vw;
    overflow: hidden;
    img {
      width: 100%;
    }
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
</style>