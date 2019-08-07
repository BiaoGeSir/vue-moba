<template>
  <div class="page-hero" v-if="model">
		<div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
		  <img src="../assets/logo.png" height="30">
		  <div class="px-2 flex-1">
		    <span>王者荣耀</span>
				<span class="ml-2">攻略站</span>
		  </div>
		  <router-link to="/" tag="div">更多英雄 &gt;</router-link>
		</div>
		<!-- 英雄详情top -->
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
			<div class="info text-white p-3 d-flex flex-column jc-end h-100">
				<div class="fs-sm">{{model.title}}</div>
				<h2 class="my-2">{{model.name}}</h2>
				<div class="fs-sm">{{model.categories.map(v => v.name).join("/")}}</div>
				<div class="d-flex ai-center jc-between pt-2">
					<div class="scores" v-if="model.scores">
						<span>难度</span>
						<span class="badge bg-primary">{{model.scores.difficult}}</span>
						<span>技能</span>
						<span class="badge bg-blue-1">{{model.scores.skills}}</span>
						<span>攻击</span>
						<span class="badge bg-danger">{{model.scores.attack}}</span>
						<span>生存</span>
						<span class="badge bg-dark">{{model.scores.survive}}</span>
					</div>
					<router-link to="/" tag="span" class="text-grey fs-sm">皮肤: 2 &gt;</router-link>
				</div>
			</div>
		</div>
		<!-- end of top -->
		<div>
			<div class="bg-white px-3">
				<div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
					<!-- 点击分类，切换swiper -->
					<div class="nav-item" 
					v-for="(hero, i) in heroSwiper"
					:key="i"
					:class="{active: active === i}" 
					@click="$refs.hero.swiper.slideTo(i)">{{hero}}</div>
				</div>
				<!-- swiper滑动左右切换 -->
				<swiper ref="hero"
				@slide-change="() => active = $refs.hero.swiper.realIndex">
					<swiper-slide>
						<div class="pb-4">
							<div class="p-3 bg-white border-bottom">
								<div class="d-flex">
									<router-link tag="button" to="/" class="btn btn-lg flex-1">
										<i class="iconfont icon-caidan1"></i>
										英雄介绍视频
									</router-link>
									<router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
										<i class="iconfont icon-caidan1"></i>
										一图识英雄
									</router-link>
								</div>
								<!-- skills -->
								<div class="skills bg-white mt-4">
									<div class="d-flex jc-around">
										<img 
										class="icon"
										@click="currentSkillIndex = i"
										:class="{active:currentSkillIndex === i}"
										:src="item.icon" 
										v-for="(item, i) in model.skills"
										:key="i"
										>
									</div>
									<div v-if="currentSkill">
										<div class="d-flex pt-4 pb-3">
											<h3 class="m-0">{{currentSkill.name}}</h3>
											<span class="text-grey-1 ml-4">(冷却值: {{currentSkill.delay}} 消耗: {{currentSkill.cost}})</span>
										</div>
										<p>{{currentSkill.description}}</p>
										<div class="border-bottom"></div>
										<p class="text-grey-1">小提示: {{currentSkill.tips}}</p>
									</div>
								</div>
							</div>
							<!-- 卡片 -->
							<m-card plain icon="caidan1" title="出装推荐" class="hero-items">
								<div class="fs-xl">顺风出装</div>
								<div class="d-flex jc-around text-center mt-3">
									<div
									v-for="item in model.items1" :key="item.name">
										<img :src="item.icon" class="icon">
										<div class="fs-xs">{{item.name}}</div>
									</div>
								</div>
								<div class="border-bottom mt-3"></div>
								<div class="fs-xl mt-3">逆风出装</div>
								<div class="d-flex jc-around text-center mt-3">
									<div
									v-for="item in model.items1" :key="item.name">
										<img :src="item.icon" class="icon">
										<div class="fs-xs">{{item.name}}</div>
									</div>
								</div>
							</m-card>
							<!-- 卡片 -->
							<m-card plain icon="caidan1" title="使用技巧">
								<p class="m-0">{{model.usageTips}}</p>
							</m-card>
							<!-- 卡片 -->
							<m-card plain icon="caidan1" title="对抗技巧">
								<p class="m-0">{{model.battleTips}}</p>
							</m-card>
							<!-- 卡片 -->
							<m-card plain icon="caidan1" title="团战思路">
								<p class="m-0">{{model.teamTips}}</p>
							</m-card>
							<!-- 卡片 -->
							<m-card plain icon="caidan1" title="英雄关系">
								<div class="fs-xl">最佳搭档</div>
								<div v-for="item in model.partners" :key="item.name" class="d-flex pt-4">
									<img :src="item.hero.avatar" height="50">
									<div class="flex-1 m-0 ml-3">{{item.description}}</div>
								</div>
							</m-card>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="text-center mt-3">暂未制作</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	props:{
		id: {required:true}
	},
	data(){
		return {
			active:0,
			heroSwiper:['英雄初识','进阶攻略'],
			model: null,
			currentSkillIndex:0,  // 当前技能高亮位置 默认值:0
		}
	},
	computed:{
		currentSkill(){
			//从skills数组里找出当前技能的所有数据
			return this.model.skills[this.currentSkillIndex];
		}
	},
	methods:{
		async fetch(){
			const res = await this.$http.get(`/heroes/${this.id}`);
			this.model = res.data;
		}
	},
	created(){
		this.fetch();
	}
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero{
	.top{
		height: 50vw;
		background: #fff no-repeat top center;
		-webkit-background-size: auto 100%;
		background-size: auto 100%;
	}
	.info{
		background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
		.scores{
			.badge{
				margin: 0 0.25rem;
				display: inline-block;
				width: 1rem;
				height: 1rem;
				line-height: 1rem;
				text-align: center;
				border-radius: 50%;
				font-size: 0.6rem;
				border: 1px solid rgba(255,255,255,0.2);
			}
		}
	}
	.skills{
		img.icon{
			width: 4.0625rem;
			height: 4.0625rem;
			border: 3px solid transparent;
			&.active{
				border-color:map-get($colors, 'primary');
			}
			border-radius: 50%;
		}
	}
	.hero-items{
		img.icon{
			width: 3.4615rem;
			height: 3.4615rem;
			border-radius: 50%;
		}
	}
}
</style>
