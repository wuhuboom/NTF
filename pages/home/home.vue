<template>
	<view class="home">
		<view class="swiper">
			<uni-swiper-dot :info="swipers" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in swipers" :key="index">
						<view class="swiper-item">
							<image :src="item.path" model="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="notice">
			<uni-notice-bar scrollable single showIcon showGetMore :text="notice.content" :speed="50" background-color="" color="#fff" @getmore="getNotice"></uni-notice-bar>
		</view>
		<view class="game-tools">
			<view class="title">{{$t('home.game.tool.title.text')}}</view>
			<view class="more">
				<view>{{$t('home.game.tool.more.text')}}</view>
				<uni-icons type="right" color="#fff"></uni-icons>
			</view>
		</view>
		<view class="game">
			<swiper class="swiper-game" @change="change" :display-multiple-items="2">
				<swiper-item v-for="(item ,index) in gameTools" :key="index" >
					<view class="swiper-item">
						<view class="img-bg">
							<!-- <image :src="item.path" model="aspectFill"></image> -->
							<img :src="item.path"/>
						</view>
						<view class="game-tools-title">{{item.title}}</view>
						<view class="game-tools-money">${{item.money}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		 
		<view class="game-zhi">
			
		</view>
		<view class="game-down">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers:[
					{id:'1',name:'',path:'../../static/images/home/10001.jpg'},
					{id:'2',name:'',path:'../../static/images/home/10002.jpg'},
					{id:'3',name:'',path:'../../static/images/home/10003.jpg'}
				],
				current: 0,
				mode: 'round',
				notice:{
					content:'[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏'
				},
				gameTools:[
					{title:'Shadow Draggers(*) | Damason sheel',money:'97',path:'../../static/images/home/10006.png'},
					{title:'Eahsl Eosdfsqq of the Ciwer Where',money:'560.16',path:'../../static/images/home/10007.png'},
					{title:'sdfsrwer sdfsd dsfsdfsd',money:'15',path:'../../static/images/home/10008.png'},
					{title:'Huasdas garara swerw cxcgwer',money:'108',path:'../../static/images/home/10009.png'}
				]
			}
		},
		methods: {
			loadSwiper(){
				this.$http.get('/player/home/slider',(res)=>{
					
				})
			},
			loadNotice(){
				this.$http.get('/player/home/notice',(res)=>{
					
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
			getNotice(){
				uni.navigateTo({
					url:'./notice'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.home{
	width: 670upx;
	min-height: 100vh;
	padding: 40upx;
	background-image: url('../../static/images/home/10046.png');
	background-size: 100% 100&;
	background-repeat: no-repeat;
	.swiper{
		height: 20vh;
		::v-deep .uni-swiper__warp,.swiper-box{
			height: 100%;
		}
		.swiper-item{
			width: 670upx;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.notice{
		margin-top: 20upx;
		::v-deep .uni-noticebar{
			border: 1px solid $fontColor;
			box-shadow: inset 0 0 16upx 0upx $fontColor;
		}
		::v-deep .uniui-sound{
			color: $fontColor!important;
		}
	}
	.game-tools{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		.title{
			font-size: 40upx;
			font-weight: 600;
		}
		.more{
			display: flex;
			align-items: center;
			color: #fff;
			font-size: 26upx;
		}
	}
	.game{
		width: 100%;
		height: 25vh;
		margin-top: 40upx;
		.swiper-game{
			width: 100%;
			height: 100%;
			::v-deep .uni-swiper__warp,.swiper-box{
				height: 100%;
			}
			.swiper-item{
				padding:40upx;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
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
}
</style>
