<template>
  <div>
    <div class="header">
      <div class="left">
        <!-- 替换字体图标 -->
        <i class="iconfont icon-tubiaoguifan2 closethis" @click="goBack"> X </i>
      </div>
      <div class="title">当前城市 - {{ city | cleaner }}</div>
    </div>
    <div class="search-city-input">
      <div class="input-wrap">
        <!-- 替换字体图标 -->
        <i
          class="search-icon iconfont icon-sousuo-sousuofangdajing"
          style="font-size: 20px"
        ></i>
        <input
          type="text"
          placeholder="输入城市名或拼音"
          class="search-input"
        />
        <div class="clean-icon">
          <!-- 替换字体图标 -->

          <i
            class="iconfont icon-chongzhi-qingchu"
            style="font-size: 20px; display: none"
          ></i>
        </div>
      </div>
      <!---->
    </div>
    <div class="scrollbar">
      <div class="recommend-city">
        <div class="gprs-city">
          <div class="city-index-title">GPS定位你所在城市</div>
          <ul class="city-index-detail cleanfix">
            <li class="city-item-detail city-item-detail-gprs">
              <div class="city-item-text">{{ city | cleaner }}</div>
            </li>
          </ul>
        </div>
        <div class="hot-city">
          <div class="city-index-title">热门城市</div>
          <ul class="city-index-detail cleanfix">
            <li
              class="city-item-detail"
              v-for="item in hotList"
              :key="item.cityId"
              @click="chooseCity(item.name, item.cityId)"
            >
              <div class="city-item-text">{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <van-index-bar
        :index-list="indexList"
        class="citybar"
        :sticky-offset-top="92"
      >
        <!-- 城市循环 -->
        <template v-for="(item, index) in dataList">
          <van-index-anchor
            :index="item.index"
            :key="index"
            style="background: rgb(247, 248, 250)"
          />
          <van-cell
            @click="chooseCity(val.name, val.cityId)"
            v-for="(val, key) in item.data"
            :title="val.name"
            :key="key"
          />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import "vant/lib/index.css";
import { cityListData } from "@/api/api";
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      dataList: [],
      indexList: [],
      hotList: [],
      city: "定位失败",
    };
  },
  methods: {
    chooseCity(cityName, cityId) {
      this.$store.commit("setCity", cityName);
      this.$store.commit("setCityId", cityId);
      this.$router.go(-1);
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
  created() {
    this.eventBus.$emit("footernav", false);
  },
  async mounted() {
    let ret = await cityListData();
    this.dataList = ret[0];
    this.indexList = ret[1];
    this.hotList = ret[2];

    if (localStorage.getItem("nowcity")) {
      this.city = localStorage.getItem("nowcity");
    }
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
  filters: {
    cleaner(val) {
      return val.split('"').join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-family: iconfont !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 300;
  background-color: #fff;
  div {
    float: left;
    height: 44px;
  }
  i {
    display: block;
    font-size: 19px;
    color: #191a1b;
  }
  .left {
    width: 14%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    i {
      margin-left: 10px;
    }
    .closethis {
      margin-left: 15px;
      font-size: 21px;
      font-weight: 100;
      color: rgb(151, 150, 150);
      transform: scaleX(1.6);
    }
  }
  .title {
    width: 72%;
    text-align: center;
    font-size: 17px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #191a1b;
  }
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    -webkit-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.search-city-input {
  z-index: 2000;
  height: 49px;
  width: 100vw;
  padding: 9.5px 15px;
  background-color: #f4f4f4;
  position: fixed;
  top: 44px;
  box-sizing: border-box;
  .input-wrap {
    background-color: #fff;
    position: relative;
    display: inline-block;
    border-radius: 3px;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    .search-icon {
      position: absolute;
      left: 7px;
      top: 0;
      line-height: 30px;
      font-size: 21px;
      color: #797d82;
    }
    .search-input {
      position: absolute;
      left: 33.5px;
      top: 0;
      height: 30px;
      width: calc(100% - 65px);
      border: 0;
      font: 12px/1.5 Tahoma, Helvetica, Arial, sans-serif;
      font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
      color: #2c3e50;
    }
    .clean-icon {
      position: absolute;
      right: 7px;
      top: 0;
      line-height: 30px;
      font-size: 21px;
      color: #bdc0c5;
    }
  }
  .cancel-btn {
    width: 43px;
    position: absolute;
    display: inline-block;
    text-align: right;
    font-size: 14px;
    line-height: 30px;
  }
}
.scrollbar {
  overflow-x: hidden;
}
.recommend-city {
  padding-top: 110px;
  background-color: #fff;
  padding-left: 15px;
  .city-index-title {
    font-size: 13px;
    color: #797d82;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .city-index-detail {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-line-pack: center;
    align-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .city-item-detail {
    width: calc((100vw - 33px) / 3);
    text-align: center;
    padding-bottom: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    .city-item-text {
      height: 30px;
      background-color: #f4f4f4;
      line-height: 30px;
      border-radius: 3px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0 7.5px;
      font-size: 14px;
      color: #191a1b;
    }
  }
}
</style>