<template>
  <div>
    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide>
      <img class="w-100" src="../assets/images/banner1.jpeg">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/banner2.jpeg">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/banner3.jpeg">
    </swiper-slide>
    <div class="swiper-pagination pagination-home text-right px-3 pb-1"  slot="pagination"></div>
  </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination:{
          el: ".pagination-home"
        }
      }
    }
  },
}
</script>
<style lang="scss">
@import '../assets/scss/variables';

.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors,'white');
    &.swiper-pagination-bullet-active{
      background: map-get($colors,'info');
    }
  }
}
</style>