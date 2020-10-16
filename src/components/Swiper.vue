<template>
  <div>
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
  props: ["preview", "myClassName"],
  mounted() {
    //当前异步操作全部操作完成之后再去做里面的内容
    new Swiper("." + this.myClassName, {
      slidesPerView: this.preview,
      spaceBetween: this.myClassName == "photoSwiper" ? 10 : 0,
    });
  },
};
</script>