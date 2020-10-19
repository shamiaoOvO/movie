<template>
  <div class="cinemas">
    <van-tabs v-model="activeName" @click="handleClick($event)">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
      <!-- header -->
      <div class="filter">
        <div class="tab">
          <div class="district">
            全城
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
              style="display: none"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
            />
          </div>
          <div class="specify">
            最近去过
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
              style="display: none"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
              width="6px"
              height="3px"
            />
          </div>
        </div>
      </div>
      <!-- 循环日期 -->
      <van-tab
        :title="item.showDate | turntime"
        v-for="(item, index) in cinemasList"
        :key="index"
      >
        <!-- 电影券列表 -->
        <div class="cinema-banner-wrap" v-if="hastickets">
          <ul class="cinema-list">
            <li
              class="cinema-banner-item"
              v-for="item in ticketlist"
              :key="item.bannerId"
            >
              <div class="name">
                <span class="title">
                  {{ item.masterTitle }}
                </span>
                <span class="icon">影院券</span>
              </div>
              <div class="type">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>

        <!-- 电影院列表 -->
        <div class="cinema-list-wrap">
          <ul class="cinema-list">
            <li
              class="cinema-list-item"
              v-for="(val, key) in cinemasarr"
              :key="key"
            >
              <a
                href="#"
                class="cinema-item-wrap"
                data-enter-time="1602501987"
                data-click-fun="track_f_967919"
              >
                <div class="cinema-info-lf cinema-info">
                  <span class="cinema-name">{{ val.name }}</span>
                  <span class="cinema-address">
                    {{ val.address }}
                  </span>
                </div>
                <div class="cinema-info-rt cinema-info">
                  <div>
                    <span class="cinema-lowPrice price-fmt">
                      <i>￥</i>
                      <span class="interge" style="font-size: 15px">{{
                        val.lowPrice / 100
                      }}</span>
                    </span>
                    <span class="upon">起</span>
                  </div>
                  <span class="cinema-gpsAddress">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA1CAMAAAD1YwKXAAABblBMVEX////s7O7NztHFx8r+/v7AwsbHycy+wMS/wcXCxMje3+H5+frt7e/09PXT1df39/fV1tnz8/T8/Pz6+vv9/f3j5ObGyMv7+/vO0NPBw8ff4OLLzdDBwsbz9PT6+vro6er39/jY2dz29vf4+Pnx8vPs7e7n6OnGyMzJy87P0dTt7u/l5uji4+Xh4uTGx8vExsrNz9L09fXMztHR0tXHyMzT1NfIys3y8/TX2Nvd3uDCw8f4+fnq6+zu7/Dn6Orl5uf6+/vDxMj9/v77+/zX2Nrn5+ns7O3Iys7m5+nx8fLi4+TDxcj19vbk5efS09bKzM/AwcXv7/DQ0tTp6evb3N7c3d/3+PjZ2tzt7e7Dxcnb3N/U1tjQ0tXFx8vR09by8vPj5OXX2dv4+Pj5+fn19fbU1djY2dvS1NbJys7ExcnMzdH5+vrg4ePw8fLLzND+///7/PzP0NPr7O3a293W19rQ0dTk5ebW2Nr8/f3R09WCbK1KAAACgklEQVRIx52UV1vbQBREx7bks7LBNBeMDab3DoGEhJBACr0kpPfee//3eZCFZZDsfJmn3auR9s7s6Ep+tJV+fbnq5OPTqfEZheHT+qyhgsnDvkDaYJxjsHu6T7DORgHsa5mD7dZ098b1S1MAduYYbfkNENtp9ZU+7AK8yvlpJQPFifSxl/vbgSFfl8s2ZBcDek4YWGjzdjMOvO0KFDeQh4LXzR5k34WYNWDgibscg3ynV29MRGN2LJpo9ApjYDYkqXUKJsrFptSReammcu0FfJSkCZhcdUsNjs9lp8EtPi3CdUmzsF6mGTDNkaSVjDQbMGViAnalPrBdQU0OxFvKp7XEwXGP7gN7TT9hzn2UgnhbJTpxSLnLWbis77DjKgXT4nOkxYCrehN69AMOvDaaq6xrhoQkaRTmNAzbkqQoRKp4EYi69wV7ugiujBgkq3hJiEmSPsOWimBJkmxv4cEC21sUlYULdb7XBlkVoLdOf71Q0Jz3OFzvFfijb9BRx78OONRXuFbnPkYgotZ99nM177fLYP+WpmGlZl4y0O4G9qpq5M8agvOSVqfgXI08D0LWkqT38NoK/T/Sk+BOhZwD46HT6QzEygNgBZa6Q2j9ptKVojASTEsvwKmjXacJO/kSOM8q2w6wHwXQLgMlf6Ed4msnaItFuFU9Ju/Aw+O0riwUqrOrK3i5qeS5HS52B/hkBqoqPWBGT/Z8H5xe3z4DPA7QlpuH4cqAbjBwOtCrzrzP0+cOTFvB5pcqWi7EYagr7M5vgIl4UpcaQ7OhkbKWl94LIcjNw3BaGWBTtdCZh3ujoVIrOA/YELXq8NQD8CBZjyarAHa/6uPmFoP6F9y+q//HXzl1QJFrg6y6AAAAAElFTkSuQmCC"
                      alt="距离"
                      style="display: none"
                    />
                    <strong>距离未知</strong></span
                  >
                </div>
              </a>
            </li>
          </ul>
        </div>
      </van-tab>
      <!-- </el-tabs> -->
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
moment.locale("zh-cn");
import { Tab, Tabs } from "vant";
import "vant/lib/index.css";
Vue.use(Tab);
Vue.use(Tabs);
import {
  ticketListData,
  showCinemaListData,
  showCinemasDayListData,
} from "@/api/api";

export default {
  data() {
    return {
      activeName: 0,
      ticketlist: [],
      hastickets: true,
      cinemasList: [],
      cinemasstr: "",
      cinemasarr: [],
    };
  },
  async mounted() {
    let rel = await ticketListData();
    this.ticketlist = rel.data.data;
    //电影院数据
    let ret = await showCinemaListData(this.$route.params.filmId);
    this.cinemasList = ret.data.data.showCinemas;

    //判断电影券列表是否显示
    if (this.ticketlist.length == 0) {
      this.hastickets = false;
    }
    //按照时间戳排序
    this.cinemasList.sort(this.sortFun("showDate"));

    //请求下标为0的数据
    this.cinemasstr = this.cinemasList[0].cinemaList.join(",");
    let result = await showCinemasDayListData(this.cinemasstr);
    this.cinemasarr = result.data.data.cinemas;
  },
  methods: {
    async handleClick(event) {
      this.cinemasstr = this.cinemasList[event].cinemaList.join(",");
      let result = await showCinemasDayListData(this.cinemasstr);
      this.cinemasarr = result.data.data.cinemas;
    },
    sortFun: function (attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    },
  },
  filters: {
    turntime: function (val) {
      return moment(val * 1000).format("dddMM月DD日");
    },
  },
};
</script>

<style lang="scss" >
.cinemas {
  margin-top: 44px;
}

.el-tabs__nav-scroll {
  overflow-y: hidden !important;
  overflow-x: auto !important;
}
.filter {
  .tab {
    height: 20px;
    width: 100%;
    padding: 15px 0;
    position: relative;
    z-index: 2999;
    background-color: #fff;
    border: 1px solid rgb(248, 248, 248);
    img {
      vertical-align: middle;
      padding-left: 2px;
    }
    .district {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #191a1b;
      float: left;
      width: 50%;
    }
    .specify {
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #191a1b;
      float: left;
      width: 50%;
    }
  }
}

.cinema-list-tag {
  position: fixed;
  height: 50px;
  width: 100%;
  top: 44px;
  right: 0;
  text-align: center;
  background-color: #fff;
  z-index: 2000;
  border-bottom: 1px solid rgb(246, 246, 246);
  .cinema-list-tag-name {
    position: relative;
    label {
      float: left;
      width: 33.3%;
      line-height: 49px;
      font-size: 14px;
      color: #191a1b;
      letter-spacing: -0.2px;
    }
  }
}
.cinema-list {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 15px;
    position: relative;
    background-color: #fff;
    .name {
      font-size: 15px;
      color: #18191a;
      position: relative;
      .icon {
        color: #ffb245;
        margin-left: 7px;
        font-size: 10px;
        padding: 0 6px;
        text-align: center;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        &::after {
          content: " ";
          -webkit-transform: scale(0.5);
          -ms-transform: scale(0.5);
          transform: scale(0.5);
          position: absolute;
          border: 1px solid #ffb245;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
        }
      }
    }
    .type {
      margin-top: 5px;
      font-size: 13px;
      color: #797d82;
    }
  }
}
.cinema-list-wrap {
  padding-bottom: 49px;
  //   z-index: 1;
  .cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
    .cinema-list-item {
      position: relative;
      background-color: #fff;
      padding: 15px;
      border-top: 1px solid rgb(246, 246, 246);
      .cinema-item-wrap {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        outline: none;
        color: #333;
        text-decoration: none;
        .cinema-info-lf {
          width: calc(100% - 65px);
          text-align: left;
          padding-right: 5px;
          float: left;
          span {
            display: block;
            max-width: 80%;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cinema-name {
            color: #191a1b;
            font-size: 15px;
          }
          .cinema-address {
            color: #797d82;
            font-size: 12px;
            margin-top: 5px;
          }
        }
        .cinema-info-rt {
          width: 70px;
          text-align: center;
          float: right;
          margin-right: -5px;
          .price-fmt {
            font-size: 15px;
            color: #ff5f16;
            height: 0 !important;
            display: inline-table !important;
            span {
              float: none !important;
            }
            i {
              font-size: 11px;
              font-style: normal;
            }
          }
          .upon {
            color: #ff5f16;
            font-size: 10px;
          }
          .cinema-gpsAddress {
            display: block;
            font-size: 11px;
            color: #797d82;
            margin-top: 5px;
            img {
              display: block;
              width: 13px;
              height: 17.5px;
              margin: 0 auto;
              margin-top: -30px;
            }
            strong {
              font-weight: 400;
              display: block;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>