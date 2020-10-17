<template>
  <div
    class="list scroll"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    :style="{ height: height + 'px' }"
  >
    <Loadingthis v-if="loadingthis"></Loadingthis>

    <!-- 展示数据 -->
    <div
      class="item"
      v-for="item in data"
      :key="item.filmId"
      @click="goDetail(item.filmId)"
    >
      <div class="left">
        <img v-lazy="item.poster" />
      </div>
      <div class="middle">
        <div>
          <span>{{ item.name }}</span> <span>{{ item.filmType.name }}</span>
        </div>
        <div v-if="type == 1">
          <span>观众评分 </span>
          <span class="grade">{{ item.grade }}</span>
        </div>
        <div v-else>暂无评分</div>
        <div>主演：{{ item.actors | parseActor }}</div>
        <div v-if="type == 1">{{ item.nation }} | {{ item.runtime }}分钟</div>
        <div v-else>上映日期：{{ item.premiereAt | parsePremiereAt }}</div>
      </div>
      <div class="right" v-if="type == 1">购票</div>
      <div class="right" v-else>预购</div>
    </div>
    <div v-if="isloading" class="footer">
      <van-loading size="24px" class="footercontent">加载中...</van-loading>
    </div>
    <div v-if="isend" class="footer">加载完毕</div>
  </div>
</template>

<script>
import Loadingthis from "@/components/Loading";
import moment from "moment";
moment.locale("zh-cn");
import { nowPlayingListData, comingSoonListData } from "@/api/api";
import Vue from "vue";
import "vant/lib/index.css";
import { Loading } from "vant";
Vue.use(Loading);

export default {
  data() {
    return {
      loadingthis: true,
      height: 0,
      pageNum: 1,
      data: [], //拼接数据
      loading: false,
      num: 0,
      isloading: false,
      isend: false,
    };
  },
  props: ["list", "type"],
  components: {
    Loadingthis,
  },
  created() {
    //当进入页面后将父组件的数据转交给子组件的data
    this.data = this.list;
    //判断数据是否获取到,如果获取到就去除loading组件
    if (this.data.length > 0) {
      this.loadingthis = false;
    }
  },
  filters: {
    //处理演员的数据,将主演的数据从数组传唤为字符串形式输出
    parseActor: function (val) {
      let actors = "";
      if (val) {
        val.forEach((element) => {
          actors += element.name + " ";
        });
      }
      return actors;
    },
    parsePremiereAt: function (val) {
      return moment(val * 1000).format("dddd MM月DD日");
    },
  },
  methods: {
    goDetail: function (filmId) {
      this.$router.push({ name: "detail", params: { filmId } });
    },

    goData: async function () {
      this.pageNum++;
      if (this.type == 1) {
        // 正在热映
        var ret = await nowPlayingListData(this.pageNum);
      } else {
        // 即将上映
        var ret = await comingSoonListData(this.pageNum);
      }
      this.data = this.data.concat(ret.data.data.films);
      this.num = ret.data.data.total;
      //请求loading
      this.loading = false;
      //加载动画loading
      this.isloading = false;
    },
    loadMore() {
      this.loading = true;
      this.isloading = true;
      if (this.data.length == this.num) {
        this.isend = true;
        this.isloading = false;
        return;
      }
      this.goData();
    },
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 150;
  },
  updated() {},
};
</script>

<style lang="scss" scoped>
.list {
  margin-bottom: 50px;
  .item {
    height: 94px;
    padding: 15px 5px 15px 0;
    color: #797d82;
    font-size: 13px;
    border-bottom: 1px solid #ededed;
    overflow: hidden;

    .left {
      width: 77px;
      height: 100px;
      margin-left: 20px;
      float: left;
      img {
        width: 66px;
      }
    }

    .middle {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 55%;
      float: left;
      div {
        margin-top: 4px;
      }
      div:nth-of-type(1) {
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span:nth-of-type(1) {
          max-width: calc(100% - 25px);
          color: #191a1b;
          font-size: 16px;
          height: 22px;
          line-height: 22px;
          margin-right: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:nth-of-type(2) {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
        }
      }

      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .right {
      height: 25px;
      width: 50px;
      float: right;
      line-height: 25px;
      color: #ff5f16;
      font-size: 13px;
      text-align: center;
      border-radius: 2px;
      position: relative;
      top: calc(50% - 12.5px);
      right: 15px;
      z-index: -1;

      &::after {
        content: " ";
        -webkit-transform: scale(0.5);
        -ms-transform: scale(0.5);
        transform: scale(0.5);
        position: absolute;
        border: 1px solid #ff5f16;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border-radius: 4px;
      }
    }
    .grade {
      font-size: 14px;
      color: #ff5f16;
    }
  }
}
.scroll {
  overflow-x: hidden;
}

.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  .footercontent {
    width: 100px;
    margin: 0 auto;
  }
}
</style>
