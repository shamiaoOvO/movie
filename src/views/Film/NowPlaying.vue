<template>
  <div>
    <FilmList :list="list" :type="type" :key="'film' + list.length"></FilmList>
  </div>
</template>

<script>
import { nowPlayingListData } from "@/api/api";
import FilmList from "@/components/FilmList";
import axios from "axios";

export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      type: 1, //当前传递的数据为正在热映的数据
    };
  },
  async mounted() {
    let ret = await nowPlayingListData(this.pageNum);
    this.list = ret.data.data.films;

    //定位获取
    var _this = this;
    let lSc = localStorage.getItem("city");
    let lSnc = localStorage.getItem("nowcity");
    if (lSc == null || lSc.length < 1 || lSnc.length < 1 || lSnc == null) {
      getLocation();
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("浏览器不支持地理定位。");
      }
    }
    function showPosition(position) {
      var lag = position.coords.longitude; //经度
      var lat = position.coords.latitude; //纬度
      axios
        .get(`https://api.i-lynn.cn/poi?location=${lag},${lat}`)
        .then((ret) => {
          let val = ret.data.regeocode.addressComponent.province;
          val = val.split("市").join("");
          localStorage.setItem("city", JSON.stringify(val));
          localStorage.setItem("nowcity", JSON.stringify(val));
          _this.$store.commit("setCity", val);
          //   _this.nowadd = _this.$store.state.city;
          //   _this.nowadd = val;
        });
    }
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("定位失败,用户拒绝请求地理定位");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("定位失败,位置信息是不可用");
          break;
        case error.TIMEOUT:
          alert("定位失败,请求获取用户位置超时");
          break;
        case error.UNKNOWN_ERROR:
          alert("定位失败,定位系统失效");
          break;
      }
    }
  },
  components: {
    FilmList,
  },
};
</script>