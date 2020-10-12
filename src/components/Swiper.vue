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
  props: ["num", "num2"],
  mounted() {
    if (this.$slots.length) {
      console.log(this.$slots);
    }
    console.log(this.$slots);
    // console.log(this.num, this.num2);
    //当前异步操作全部操作完成之后再去做里面的内容
    if (this.num == 0) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          slidesPerView: 4,
        });
      });
    }
    if (this.num2 == 1) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          slidesPerView: 2.5,
        });
      });
    }
  },
};
</script>