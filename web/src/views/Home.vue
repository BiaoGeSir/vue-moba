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
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in 10" :key="item">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="caidan1" title="新闻资讯" :categories="newCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
      
    </m-list-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
    <m-card icon="caidan1" title="图文攻略"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newCats:[
        {
          name:"热门",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName:"热门",
            title:'6月2日全服不停机更新公告',
            date:'06/01'
          }))
        },
        {
          name:"新闻",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName:"新闻",
            title:'6月2日全服不停机更新公告',
            date:'06/01'
          }))
        },
        {
          name:"公告",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName:"公告",
            title:'6月2日全服不停机更新公告',
            date:'06/01'
          }))
        },
        {
          name:"活动",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName:"活动",
            title:'6月2日全服不停机更新公告',
            date:'06/01'
          }))
        },
        {
          name:"赛事",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName:"赛事",
            title:'6月2日全服不停机更新公告',
            date:'06/01'
          }))
        },
      ],
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

.nav-icons{
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
	.nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
  }
}
</style>