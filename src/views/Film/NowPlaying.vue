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
      cityId: 0,
    };
  },
  async mounted() {
    let ret = await nowPlayingListData(this.pageNum);
    this.list = ret.data.data.films;
    this.cityId = this.$store.state.cityId;
  },
  components: {
    FilmList,
  },
  methods: {
    getLocation() {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 5000,
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        //城市编码
        geolocation.getCityInfo((status, result) => {
          console.log(result);
        });

        // data是具体的定位信息
        function onComplete(data) {
          console.log("具体的定位信息", data);
          let val = data.addressComponent.province;
          val = val.split("市").join("");
          localStorage.setItem("nowcity", JSON.stringify(val));
          _this.$store.commit("setCity", val);
        }
        function onError(data) {
          // 失败 启用 ip定位
          AMap.plugin("AMap.CitySearch", function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
              if (status === "complete" && result.info === "OK") {
                // 查询成功，result即为当前所在城市信息
                console.log("通过ip获取当前城市：", result);
                let val = result.city;
                val = val.split("市").join("");
                localStorage.setItem("nowcity", JSON.stringify(val));
                _this.$store.commit("setCity", val);
                67;
              }
            });
          });
        }
      });
    },
  },
  created() {
    //定位获取
    let lSc = localStorage.getItem("city");
    let lSnc = localStorage.getItem("nowcity");
    if (lSc == null || lSnc == null) {
      this.getLocation();
    }
  },
};
</script>