<template>
  <div class="cinema-schedule">
    <div class="header-left">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA2CAMAAACRK2tAAAAAkFBMVEVHcEwcHBwZGhsaGhwZHBwqKioZGhv///8bGxs/Pz8ZGhseHh4eHh4cHBwZGxsaGhsZGxsfHx8ZGhwZGhsZGhsdHR0ZGhsZGhsaGhwbGxsZGhsbGxsZGxseHh4ZGxsZGhsaGhskJCQZGxsaGhwZGxsZGhwaGhwZGhwZGhsZHh4fHx8aGhsZGhsZGhsZGhsZGhteFmxMAAAAL3RSTlMAEv1YdgzJAUsE+hkhP5WksQi+0/c08uWGStxnZirs3c0HsoeWo4W91DMp6+T28faGh4gAAADjSURBVDjLxZXZkoJADEUbVxBQlG1AYRZ3Z/T8/9/5gK9JqgZL83puVVd3TjrO/bumfjVVA3PwNf4BVAofAXvliA2QBDIfDuD4LXN/BpOxzOMMUk/meQF1KPOmhb9I5lEJvxeZhzXczjL3UrjGMh9PYKZ0YLmCwVDmQQJsFAEWwEgXgIMhwNwQYNFTgNXyfQK4Lygj1yeQF/CpHeHiDE6elrCuaT+Uc2vgJ3A9mtW1e2f9GGzVP8dSrpN2rSUs7e3B6UYvi7VEWEORa4mohLbREk37HD3Sl+iRPEGPqtdCsVfSo+6AByDPg79r1AAAAABJRU5ErkJggg=="
        width="11px"
        height="18px"
        @click="goBack"
      />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAQlBMVEVHcEwZGxsfHx8ZGhsZHh4ZGhsZHx////8aGhsZGhsbGxsaGhwcHBwYGRoZGhwaGhsaGh0aGh4bGxsZGhwZGhwZGhuZ90I0AAAAFXRSTlMAnRDlO/MoAZznQYY1+qvEVjpx0NGKQfLiAAAA8klEQVRIx+3WSQ6DMAwFUIbSUKAMbXP/q5apAoMdf0di1ywtniwF+0OS/M/F55XXDnpweHcZKeTelwi9Fd73pFJ7iE7wQXu6EqEzvB+KCGUhQgWoUxFqNADDNAhDVIEyVaFEAchTCHIUhGcKwyM1QEpNcE+NcKNm+KMRcKXPCLjSGDheztjRty4CFlNPLBHPs9pG0OVWsURkt8NMt/dopPsBMFE6OQZ6HDmYnmcVpNyQQ5TfDoBKa6VSeR8VGlrkmaYu4muVuFSkWnSIVM8cgSJhxdIBSrmF0toHC6uZVqTUgSk30YZUsj4Dl7dq/n/Jl58vF/caAGebDs0AAAAASUVORK5CYII="
        width="19px"
        height="19px"
        style="display: none"
      />
    </div>
    <div class="header-title" :class="{ showtitle: isfixed }">
      {{ moviemsg.name }}
    </div>
    <div class="cinema-wrap">
      <div class="cinema-info">
        <div class="tags">
          <div
            class="tag"
            v-for="(item, index) in moviemsg.services"
            :key="index"
          >
            {{ item.name }}
          </div>

          <i
            class="tag-more iconfont icon-quanju_liebiaojiantou"
            style="font-size: 10px"
          ></i>
        </div>
        <div class="address">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA+CAMAAABqWnnkAAACalBMVEVHcEyZmZl/f4p/f79/f4t5fYJ5foN5fYJ/f/95fYJ/f415fYKNjY2Li4uHh4d5fYN/f6p5fYJ5fYJ6foJ5foJ6foJ6fYR7foP///96fYN5fYJ5fYV7f4N5fYJ/f5l5fYJ5fYJ6f4R5fYJ5fYJ5fYN5fYJ5fYJ5fYJ/f4eJiYl5fYN6fYJ5fYJ7g4N7foN/f496fYKIiIh5fYJ5fYKGhoZ7f4N5foJ/f4eqqqp6fYR5fYJ5fYJ5fYORkZF5fYV5fYJ6f4J6foJ5fYJ5f4J5fYJ/f4h5foJ5fYJ6fYJ6fYN7f4N6fYR6f4R6fYJ5fYJ5f4V8goJ6fYJ5foJ5foJ5f4J5fYN5fYN6fYR6fYR5fYJ5fYN/f5F/f597g4N8goJ5fYJ5fYJ6foJ5fYN5fYJ7foN5fYJ5fYN5fYJ5foJ5f4J6foJ5fYJ5fYJ5f4J9fYZ5fYJ5hYV6foJ5foJ9fYJ5fYV8f4J5fYJ6fYN5fYJ5foJ8goJ6hIR5foJ7f4N/f4x6foJ5fYN5fYJ6fYJ6fYN8f4J6fYJ5foJ5fYN5fYJ/f5R6fYR5f4J5foJ6fYN5foJ5fYN5fYN5fYN5fYN5fYJ5f4V8goJ5fYN5fYJ5f4V8f4J6fYN5fYN8goJ5fYJ6fYJ/f4Z6fYR5f4J5fYN6fYN5fYV7foN5foJ5foJ5fYJ5hYV5fYJ6foJ7f4N7foN5fYJ6foJ5foN7g4N5foJ6fYR6f4R6eoR/f396f4J/f4Z/f4h5f4V8goJ5f4J5foJ6f4J7fYN9fYZ6fYJ6fYR7g4N5fYJ5fYJ6fYJ6foJ5foN5fYJ6foJ5fYN5fYJ5fYISY5pFAAAAzXRSTlMABRgEFuln/gLxEusJCxHOBvXhh43AS1kBrfo7Rt0KovA49vN8qPf8IA2xlPkjYRDqD+PZEzrIIgNP+8OfBz3fYIXlWM8csuzTozxsNmbFKi3oxrZW0IhoapnYDggdKe3ee6HyX81+77BUdeLkWjXmFcS0M0NK7qn9czEbcUQUfdTnnKVOlouz+AxwUG+nynqb0tbcKCWAxy5Mq3gv4NEmUVLajkFbrJfMF7d5SFegiWkhj1MwGwpeJB4sK1yVZHQ3mm4fv7mYwmvbg7W7mJkBagAAAz1JREFUGBmNwYNiIwsAhtG/bZJJatu2ja2xtm3b1rVt27bt751u2skkadQ9RwF+/aX/96kzpQV/VgyXZCu88atJ+Bn5vkShbRwuJdAbDQphbTNulROO/G8S47vmjf5xHbf69HgFGNiBW+enCfJy5hUZQKdNs9iWAI+uUoCTGcDgUvmxbQNuT1awtb1Q/JS8ovqgaqFCyndBQaIs66EqU2EsK4aVTpl2AfcprKcN2K4ZhUehXxE8AWXHNO1dSN2kCLJ3Q7rcYothSBGdhsqLkn6Ea0752/Le+69dlL/j8I+kPvhSPolpqUxLcsTIqwfGpCvn6E2U1/69WB5ZKkthJYxrCH6T1yUDiHunIqMScC2Q5V9w6Gc4L0uPAVsPd0tKGK6CuGp5/AVFOgGZ8khYDsejZTpihwl5nIL/lAQX5PEsuDbLci+wSKZv4ZquQ7Q8xmCxfCogXaZ2mFQuJMvUDqWF8jkFq2VyGhiyw9cyPQer5ScWtspkg2JNQZ5MHbBEfpKhXqaT8Lcq4AeZuiBVfhogVaYsmNAlOCtT1E54TD7rYKVMN6BcP8GkU6azcKe8mg6BQ6ZBuCynHY7INA8YkqUIJls04ysoG5BuwCfyyIHcPTGaduUZYKFM5ZAj6TQ0R8nU1AaMOS583FFuB+6XRxt8J6n7KPTIY3MSPkUDMpVAWYLcPoRaWQrTSjGNNMryJnygaS8anGuQ19sf7Uva1rljf7wsTWUwTzP2QZ0iOABvyZQHKbEKK+YgHJbHCihXWKNwMEYeL4E9QeHshgOyOF+B7QrjZdjZIi8H7E1USM4peFU+UQWQppCyICVafl6HlGiF0N0Ga+TP+QLUKYRGcMVqlkyor1aQqEHYowB9MF9B1kFcjQIsAKNEAVri4LyC5MAD2ZotHZ7fpCBdd0GjZnk8F0YVwhpYXiN/tfCkQrl7BO6Qn8tgLFJIWdC7TF7JG6BfYWTAimxZHgRXtMLYkguL5VGdAvcorDQ4Y5OpFh6OUVjxBXBTM24DI08R5AOZcqtphYcU0Xxo3SipDuyxiqi9GdZLHQZkaQ6rgPz4DXBCc8qBuAxwjWtOxw4xbZduwWetYFzVLXHaPv9Cwf4HsMulXDviYK8AAAAASUVORK5CYII="
            width="14px"
            height="21px"
            alt=""
          />
          <div
            class="address-des"
            data-enter-time="1603157706"
            data-click-fun="track_f_956586"
          >
            {{ moviemsg.address }}
          </div>
          <a
            class="tel-icon"
            data-enter-time="1603157706"
            data-click-fun="track_f_398343"
            ><img
              data-v-0134b84b=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA2CAMAAABdslGrAAACJVBMVEVHcEwhISEzMzMZHBwZMzMZGhsZGxsZGhsZGhv///8ZGxsbGxsfHx8kJCQaGh0bGxsZGhsZJiYqKioaGhwZHR0ZGhsZGhsZGxsZGhsaGh5VVVV/f38ZGhscHBwZGhsZGhsaGigZGhsZGhwZGhsZGhsaGh8ZGhsaGhsbGxsaGhsaGhsZHBwaGh0fHx8nJycZGhwZGxscHBwZGxsZGhscHBwbGxsZGxsaGhsaGhscHBwaGiAZGxsaGhsaGhwZHBwZGxsaGh4ZGhsZGhsZGhsZGxsZGhscHBwZGhsaGhwdHR0fHx8ZGhwZGxsZGhwkJCQaGiMZGhsZGhsbGxsdHR0ZGhsbGxsaGhsaGhsaGhsZGxscHBwbGxsZGxsZGhwZHx8ZGxsaGhseHh4aGh0cHBwbGxsZHh4bGxsaGhsZGhweHh4ZGxsZGxsZGhsZHh4ZGxsaGhseHh4cHBw/Pz8ZGhsfHx8ZGxsZGxsZGhsaGh0ZGxsZGhwcHBwaGhsaGhwbGxsZGhwZGhwZGxsZGhsZGhwZGxsaGhsiIiIZGhsZGhscHBwZHBwaGhwqKioZGhwZGhsaGh8ZIiIaGhseHh4ZGxsaGhwbGxsbGxsZGxsZGxsZGhsaGh8ZGhwaGh0ZGhsZGhsZGxsZGhwaGh0aGhwZHBwaGhwbGxsZGxsaGh0ZGxsbGxsfHx8eHh4ZGhsdHR0ZGhsbGxsZGhsZGhsZHR0ZGhsZGhwaGhwZGhuqFRxRAAAAtnRSTlMAFwVZCvqy/v0Bl2cQB2kl5RQGYT3M+NnKQwMC8iTq8BP7vfbtMO65QsOldk4gDceDPs75G16zkq4SJ52TiFtuTOfd5Kr3CfR/Iwi1oNoVHfPWcTS3L5u6nLtISWW/KHfrImg/SjNBxLQqlajUO8bXITUE6RiEje9Wiq029WpA45mx0qNvpBbByy1kYgyr5jkerxGMkS43eGbbMch78dWe0V+FbHxUgXJ5XCkZ4CvJOOj8RdOYkJ3guaYAAAJ3SURBVBgZvcEFcxNRAEbRr22S3dTd3XApLoVCi7u7u7u7u7u7u97fR5NNCkM2vGWY4Rz9m025DUH9jQHJmUC7Ennma7QIS5JXqT1o5c+EU/LoXDcgryg7qwZy5c04sJcEJR2Cy/KkzoYchSywsEfLiwAMk2MsNMqDtBqsMjmKYGSqzJbCV0U9goUyS4dvinoMLYkySofvisoeCoNltASS1eYe5MloGXxQm8oaWCqT1CrsCWqTDIdlNB9y1GaAhZ0hk5fQTz/1gd0yKYORYxTVqwOsktFkWKaInFIgSUaDYKAc6y2wO8nsBgyfoLDNwDx5cRdeyLEHugXlwXNYNEJhXYZDb3lQ3AzpcnSHC1fkwVMYX6Iw30EYG5SZrxZuyTHEglHy4BnUn5DjCdhzZZY2Ho7KUTIT6hfIrAhoL0flO/j0XmbHoSBNjuWlsKhORgk7oa8iPlZA/VSFrBjVOah4UoCzilheC5NeS4kzgHYJimct9LyoiOnlwLj+AUK2zlEcvh4wtJci3kwG9gErbbB2ZMvdpXIoHKEI30NCktU+E8jLkLsGP5zsqqjBpTCtWMrqA0zqLXcpQGF/RWX0W+NTSFM+0LGrXB2z4EiCYkzfCDTvlaszNhRMVAzfLMDfKSg3SVVQPlexdlUAsxPkpnM+WFcTFaPLBmBdqtzktgCFoxVjy3Yb9stVZQC4n1KsGB0gXXE05QMPhug3ddBzm+K5U0Cr+VP1q8RqGKj4xtysAKxhB4KKCnYEa7X+JOuan1a3X71V2OKZwBQZlJ0n5HNg3pc5KQE/MEhmp/vW8lNVd3mSllRtEWZVX5dnixfOmj1txpSJ+t9+AAZEC6aFGvT2AAAAAElFTkSuQmCC"
              width="17px"
              height="18px"
              alt=""
          /></a>
        </div>
      </div>
      <div class="schedule-wrap">
        <div class="film-bg">
          <div
            class="img"
            :style="{ backgroundImage: 'url(' + currentSrc + ')' }"
          ></div>
        </div>
        <div class="film-list">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in movies"
                :key="index"
              >
                <div class="film-item">
                  <div class="img-wrap">
                    <img :src="item.poster" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="triangle">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEVHcEz////////mcEUwAAAAAnRSTlMAgJsrThgAAABLSURBVAgdBcEBDQAACAMg/GYDAxnB/mkEUAuBPgjMQOAagtpaBM0hGAbB0Qi11BIajjAwhIMmaqFWNHBigBEHtNQCtWmAywBMDqAfx4oGipkmrUEAAAAASUVORK5CYII="
              width="20px"
              height="10px"
              alt=""
            />
          </div>
        </div>
        <div class="film-info">
          <div class="film-head">
            <span class="film-name">{{ nowMovie.name }}</span>
            <span class="film-score">{{ nowMovie.grade }} </span>
            <span class="film-score-unit"> 分</span>
          </div>
          <div class="film-desc">
            {{ nowMovie.category }} | {{ nowMovie.runtime }}分钟 |
            {{ nowMovie.director }} | {{ actors }}
          </div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAMAAAD57OxYAAAAZlBMVEVHcEwZGhseHh4aGh8zMzMZGhsZGhwZGhsfHx8ZGhsbGxsZGhsZGxsZGxsZGxsZGxsbGxsaGhsaGh0aGh0ZGhwbGxsZGhweHh4ZGhsaGh0ZGxsZGxsZGxsZGhsZGxsZGxsaGhwZGhtuA7MxAAAAIXRSTlMA6iE5Bda99xD+OOWenXh6VddWV9BxviLpe7x5jeSBgI/e7hU0AAAAeUlEQVQY023PyRqCMAyFUSilA2VGnBX/939JN01QP7O6Z5ObFGt6FjoPuCjuEBeBvYKvRKGG8iQyZ5iCqPFwtKIxQqsre2BQdV8F7rfgoJh2WAe+yWghjjkPQJ/zHKHLufLg8jmmhDp8vGD+LH1BnKU6wU3vXdOm+Q34ngmHHMc+eAAAAABJRU5ErkJggg=="
            width="4px"
            height="8px"
            alt=""
            class="film-more"
            @click="goDetail(nowMovie.filmId)"
          />
        </div>

        <van-tabs v-model="activeName" @click="handleClick($event)">
          <van-tab
            :title="item | turntime"
            v-for="(item, index) in showDate"
            :key="index"
            class="timelist"
          >
            <div class="schedule-list">
              <!-- 循环排片日期 -->
              <div
                class="schedule-cell"
                v-for="(val, key) in schedules"
                :key="key"
                :class="{ noplay: !val.isOnsell }"
              >
                <div class="schedule-item">
                  <div class="left">
                    <div class="start-at">{{ val.showAt | showtime }}</div>
                    <div class="end-at">{{ val.endAt | showtime }}散场</div>
                  </div>
                  <div class="middle">
                    <div class="language">
                      {{ val.filmLanguage }}{{ item.imagery }}
                    </div>
                    <div class="hall">{{ val.hallName }}</div>
                  </div>
                  <div class="right">
                    <div v-if="val.isOnsell" class="buy-ticket">购票</div>
                    <div v-else class="no-ticket">售完</div>
                    <div class="lowest-price">
                      <span class="price-icon">￥</span>
                      {{ val.salePrice / 100 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
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
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
import { cinemaData, moviesListData, scheduleData } from "@/api/api";
export default {
  data() {
    return {
      //title是否固定定位
      isfixed: false,
      //影片信息
      moviemsg: {},
      //电影列表
      movies: [],
      //电影ID初始化
      filmId: 0,
      //背景图片地址初始化
      currentSrc: "",
      //默认选中的电影
      num: 0,
      //现在选中的电影信息
      nowMovie: {},
      //演员字符串初始化
      actors: "",
      //选择的电影的索引
      choosemovienum: 0,
      //vantUI绑定的,默认显示下标
      activeName: 0,
      //排片日期数组初始化
      showDate: [],
      //选中日期的排片
      schedules: [],
    };
  },
  async mounted() {
    //发起通知,通知APP.vue需要移出底部菜单
    this.eventBus.$emit("footernav", false);

    //影院标题
    let ret = await cinemaData(this.$route.params.cinemaId);
    this.moviemsg = ret.data.data.cinema;

    //电影列表
    let res = await moviesListData(this.$route.params.cinemaId);
    this.movies = res.data.data.films;
    this.filmId = this.movies[0].filmId;

    if (this.$route.params.date) {
      //初始电影排片
      let result = await scheduleData(
        this.$route.params.filmId,
        this.$route.params.cinemaId,
        this.$route.params.date
      );
      this.schedules = result.data.data.schedules;
    } else {
      let result = await scheduleData(
        this.$route.params.filmId,
        this.$route.params.cinemaId,
        this.movies[0].showDate[0]
      );
      this.schedules = result.data.data.schedules;
    }

    //背景图片初始化
    this.currentSrc = this.movies[0].poster;

    //当前电影信息
    this.isMovie();

    //电影Id匹配
    this.movieNum();

    let _this = this;
    let demo = {};
    //swiper
    this.$nextTick(() => {
      demo = new Swiper(".swiper-container", {
        slidesPerView: 3.5,
        spaceBetween: 10,
        centeredSlides: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        // initialSlide: _this.choosemovienum,
        on: {
          slideChange: function (e) {
            _this.activeName = 0;
            _this.num = e.activeIndex;
            let num = e.activeIndex;
            _this.currentSrc = e.imagesToLoad[num].src;
            _this.isMovie();
            _this.handleClick(_this.activeName);
          },
        },
      });
      demo.slideTo(_this.choosemovienum, 2000, false);
    });
    //跳转到选中的日期
    this.showDate.forEach((val, key) => {
      if (val == this.$route.params.date) {
        this.activeName = key;
      }
    });

    //滚动条监听
    window.addEventListener(
      "scroll",
      (e) => {
        let top = document.documentElement.scrollTop;
        if (top > 44) {
          this.isfixed = true;
        } else {
          this.isfixed = false;
        }
      },
      true
    );
  },
  beforeDestroy() {
    //发起通知,恢复底部菜单
    this.eventBus.$emit("footernav", true);
  },
  methods: {
    isMovie() {
      let ret = [];
      this.nowMovie = this.movies[this.num];
      this.nowMovie.actors.forEach((val, key) => {
        ret.push(val.name);
      });
      this.actors = ret.join(" ");
      this.showDate = this.nowMovie.showDate;
    },
    movieNum() {
      this.movies.forEach((val, index) => {
        if (this.$route.params.filmId == val.filmId) {
          this.choosemovienum = index;
          return;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    //vant点击事件
    async handleClick(event) {
      let ret = await scheduleData(
        this.nowMovie.filmId,
        this.$route.params.cinemaId,
        this.showDate[event]
      );
      this.schedules = ret.data.data.schedules;
    },
    goDetail(filmId) {
      this.$router.push({ name: "detail", params: { filmId } });
    },
    /* async moviechange(event) {
      let obj = await scheduleData(
        this.nowMovie.filmId,
        this.$route.params.cinemaId,
        this.showDate[event]
      );
      this.schedules = obj.data.data.schedules;
    }, */
  },
  filters: {
    turntime: function (val) {
      return moment(val * 1000).format("dddMM月DD日");
    },
    showtime: function (val) {
      return moment(val * 1000).format("HH:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}

.timelist {
  border-top: 1px solid rgb(247, 247, 247);
}
.cinema-schedule {
  overflow-x: hidden;
  padding-top: 44px;
  background: #fff;
  min-height: 100vh;
  .header-left {
    position: fixed;
    top: 0;
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    z-index: 303;
  }
  .header-title {
    position: relative;
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    padding: 0 15px;
    background: #fff;
    top: 0;
    height: 44px;
    line-height: 44px;
    z-index: 302;
  }
  .showtitle {
    position: fixed;
  }
  .cinema-info {
    .tags {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 15px;
      color: #ffb232;
      overflow: hidden;
      position: relative;
      padding: 5px 0 15px;
      .tag {
        position: relative;
        padding: 0 6px;
        margin: 0 2.5px;
        font-size: 10px;
        &::after {
          content: " ";
          -webkit-transform: scale(0.5);
          -ms-transform: scale(0.5);
          transform: scale(0.5);
          position: absolute;
          border: 1px solid #ffb232;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
          border-radius: 1px;
        }
      }
    }
    .address {
      height: 50px;
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding-left: 17px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .address-des {
        font-size: 14px;
        height: 20px;
        padding: 0 12px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tel-icon {
        height: 18px;
        padding: 0 25px;
      }
    }
  }
  .schedule-wrap {
    position: relative;
    .film-bg {
      position: absolute;
      top: 0;
      height: 160px;
      width: 100%;
      padding: 15px 0;
      overflow: hidden;
      .img {
        height: 100%;
        width: 100%;
        filter: blur(30px);
        -webkit-filter: blur(30px);
      }
    }
    .triangle {
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    .film-list {
      height: 160px;
      padding: 15px 0;
      position: relative;
      .film-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding-top: 26px;
        -webkit-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
        .img-wrap {
          width: 72px;
          -webkit-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
          transition: all 0.5s ease;
          img {
            width: 100% !important;
            height: 100% !important;
          }
        }
      }
    }
  }
  .film-info {
    width: 100%;
    background: #fff;
    height: 80px;
    padding: 15px 0;
    position: relative;
    border-bottom: 1px solid rgb(247, 247, 247);
    .film-head {
      margin-bottom: 10px;
      text-align: center;
      line-height: 18px;
      .film-name {
        font-size: 15px;
        color: #191a1b;
        padding-right: 5px;
      }
      .film-score {
        font-size: 16px;
        font-style: italic;
        color: #ffb232;
      }
      .film-score-unit {
        font-size: 10px;
        color: #ffb232;
      }
    }
    .film-desc {
      text-align: center;
      height: 18px;
      color: #797d82;
      font-size: 13px;
      padding: 0 12%;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .film-more {
      position: absolute;
      right: 15px;
      top: 0;
      margin-top: 36px;
    }
  }
  @media (min-width: 375px) {
    .triangle {
      top: 6px;
    }
    .img-wrap {
      height: 104px;
    }
  }
  .swiper-slide-active .film-item {
    padding-top: 0 !important;
    -webkit-transition: all 0.5s ease !important;
    -o-transition: all 0.5s ease !important;
    transition: all 0.5s ease !important;
    .img-wrap {
      width: 90px !important;
      -webkit-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }
    .img-wrap {
      height: 130px !important;
    }
  }
}

.date-list {
  width: 100%;
  .tabs-bar-wrapper {
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    background: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .tabs-bar {
      height: 49px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      transition: -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      -o-transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1),
        -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      position: relative;
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
      .tabs-nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        width: 100%;
        li {
          flex-shrink: 0;
          -webkit-flex-shrink: 0;
          color: #191a1b;
          text-align: center;
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .active {
          color: #ff5f16;
        }
        .tab-ink-bar-wrapper {
          position: absolute;
          margin: auto;
          top: 30px;
          left: 0;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-transition: -webkit-transform 0.2s
            cubic-bezier(0.35, 0, 0.25, 1);
          transition: -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
          -o-transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
          transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
          transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1),
            -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
          .tab-ink-bar {
            border-bottom: 2px solid #ff5f16;
            border-radius: 20px;
            display: block;
            margin: auto;
          }
        }
      }
    }
  }
}
.schedule-list {
  min-height: calc(100vh - 44px);
  .schedule-cell {
    border-bottom: 1px solid rgb(247, 247, 247);
  }
  .noplay {
    cursor: not-allowed;
  }
  .schedule-item {
    height: 74px;
    padding: 15px;
    position: relative;
    background: #fff;
    .left {
      float: left;
      width: 100px;
      .start-at {
        font-size: 15px;
        color: #191a1b;
      }
      .end-at {
        font-size: 13px;
        color: #797d82;
        margin-top: 2px;
      }
    }
    .middle {
      float: left;
      width: calc(100% - 240px);
      .language {
        font-size: 15px;
        color: #191a1b;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .hall {
        font-size: 13px;
        color: #797d82;
        margin-top: 2px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      float: right;
      padding: 10px 0;
      line-height: 25px;
      color: #ff5f16;
      .no-ticket {
        float: right;
        height: 25px;
        width: 50px;
        border-radius: 2px;
        position: relative;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        color: #aaa9a9;

        &::after {
          content: " ";
          -webkit-transform: scale(0.5);
          -ms-transform: scale(0.5);
          transform: scale(0.5);
          position: absolute;
          border: 1px solid #aaa9a9;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
        }
      }
      .buy-ticket {
        float: right;
        height: 25px;
        width: 50px;
        border-radius: 2px;
        position: relative;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
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
      .lowest-price {
        float: right;
        padding-right: 20px;
        font-size: 15px;
        .price-icon {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
