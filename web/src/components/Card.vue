<template>
    <div>
      <div class="card bg-white p-3 mt-3" :class="{'px-0':plain}">
        <div class="card-header d-flex ai-center"
				:class="{'border-bottom':!plain, 'pb-3':!plain}">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2" :class="{'font-bold':plain}">{{title}}</div>
            <i class="iconfont icon-caidan" v-if="!plain"></i>
        </div>
        <div class="card-body pt-3">
          <slot></slot>
        </div>
      </div> 
    </div>
</template>
<script>
export default{
  props:{
    title:{type:String,required:true},
    icon:{type:String,required:true},
    plain:{type:Boolean},
  }
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.card{
  border-bottom: 1px solid $border-color;
}
.font-bold{
	font-weight: bold;
}
</style>