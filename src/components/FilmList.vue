<template>
  <div class="list">
    <Loading v-if="loading"></Loading>
    <!-- 展示数据 -->
    <div
      class="item"
      v-for="item in list"
      :key="item.filmId"
      @click="goDetail(item.filmId)"
    >
      <div class="left">
        <img :src="item.poster" />
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
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import moment from "moment/min/moment-with-locales";
export default {
  data() {
    return {
      loading: true,
    };
  },
  props: ["list", "type"],
  components: {
    Loading,
  },
  created() {
    //判断数据是否获取到,如果获取到就去除loading组件
    if (this.list.length > 0) {
      this.loading = false;
    }
  },
  filters: {
    //处理演员的数据,将主演的数据从数组传唤为字符串形式输出
    parseActor: function (val) {
      let actors = "";
      val.forEach((element) => {
        actors += element.name + " ";
      });
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
  },
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
</style>
