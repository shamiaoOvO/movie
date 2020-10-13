<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  data() {
    return {
      n1: 0,
      n2: 1,
    };
  },
  props: ["num", "num2"],
  mounted() {
    //当前异步操作全部操作完成之后再去做里面的内容
    if (this.n1 == 0) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          slidesPerView: 4,
        });
      });
    }
    if (this.n2 == 1) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          slidesPerView: 2.5,
        });
      });
    }
  },
};
</script>