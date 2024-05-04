<template>
	<view class="game-tools">
		<uni-nav-bar left-icon="left"  :title="$t('home.game.tool.title.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 95vh;"
		        @refresherrefresh="getRefresherrefresh" :refresher-enabled="true" :refresher-triggered="refresherTriggered"
		        refresher-background="transparent">
			 <view class="game">
			 	<view class="swiper-item" v-for="(item ,index) in games" :key="index" @click="showDetail(item)">
			 		<view class="img-bg">
			 			<img :src="item.image"/>
			 		</view>
			 		<view class="game-tools-title">{{item.title}}</view>
			 		<view class="game-tools-money">{{divide(item.money)}}</view>
			 	</view>
			 </view>
		</scroll-view>
	</view>
</template>

<script>
	import {formatNum,divide100} from '@/utils/util.js'
	export default {
		data() {
			return {
				divide:divide100,
				games:[],
				search:{
					pageNo:1,
					pageSize:10
				},
				totalPage:1,
				refresherTriggered:false,
			}
		},
		onLoad() {
			this.loadGameTools()
		},
		methods: {
			scrolltolower() {
				if(this.search.pageNo >= this.totalPage) return
				this.loadGameTools()
			},
			loadGameTools(){
				this.$http.post('/player/information/deal',this.search,res=>{
					if(res.code==200){
						res = res.data
						this.games = [...this.games,...res.results]
						this.totalPage = res.totalPage;
						if (this.search.pageNo >= res.totalPage) {
							this.search.pageNo = res.totalPage + 1;
						} else {
							this.search.pageNo = this.search.pageNo + 1
						}
							
						this.refresherTriggered = false
					}
				})
			},
			//下拉刷新
			getRefresherrefresh(){
				this.refresherTriggered = true
				this.search.pageNo = 1
				this.totalPage = 1
				this.games = []
				this.loadGameTools()
			},
			goBack(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			},
			showDetail(item){
				uni.navigateTo({
					url:'/pages/home/gameToolsDetai?item=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.game-tools{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.game{
		width: 670upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.swiper-item{
				width: 45%;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 60upx;
				.img-bg{
					background-image: url('../../static/images/home/10048.png');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					width: 320upx;
					height: 18vh;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: -100upx;
					img{
						max-width: 150upx;
						height: auto;
					}
				}
				.game-tools-title{
					text-align: center;
					font-size: 24upx;
					height: 50upx;
				}
				.game-tools-money{
					height: 4vh;
					background-color: rgb(23, 23, 23);
					color: rgb(250, 217, 167);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 30upx;
					margin-top: 30upx;
					padding-left: 30upx;
					padding-right: 30upx;
					min-width: 100upx;
				}
			}
	} 
	
}
</style>
