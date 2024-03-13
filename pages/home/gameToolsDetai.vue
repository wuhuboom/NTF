<template>
	<view>
		<uni-nav-bar left-icon="left"  :title="$t('home.game.tool.title.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="game-tools">
			<view class="img-bg">
				<img :src="item.path"/>
			</view>
			<view class="game-tools-title">{{item.title}}</view>
			<view class="game-tools-sub-title">{{$t('home.game.tool.model')}} </view>
			<view class="game-tools-sub-title">{{$t('home.game.tool.sun')}} </view>
			
			<view class="game-attr">
				<view class="attr-title">{{$t('home.game.tool.attr')}}</view>
				<view class="attr-info">
					<view class="attr-item">{{$t('home.game.tool.attr.kind')}}</view>
					<view class="attr-item">{{$t('home.game.tool.attr.type')}}</view>
					<view class="attr-item">{{$t('home.game.tool.attr.brand')}}</view>
					<view class="attr-item">{{$t('home.game.tool.attr.out')}}</view>
				</view>
				<view class="attr-content">
					{{item.detail}}
				</view>
			</view>
			
			
		</view>
		<view class="game-price">
			<view class="price">{{$t('home.game.tool.attr.price')}} ${{item.price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				item:{
					id:'1',
					title:'Shadow Draggers(*) | Damason sheel',
					price:'97',
					path:'../../static/images/home/10006.png',
					detail:'Dear TechFinger users, in view of the huge amount of userdata, Up to now, all the statisticshave not been completedresulting in the delavedechFinger2.0 upgrade, which was originally scheduled to be updated on July 10,2023. Please wait patiently and always pay attention to the APP announcement infommation. The TechFinger team apologizes for the inconvenience caused'
				}
			}
		},
		onLoad(option) {
			console.log(option)
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
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
	.img-bg{
		background-image: url('../../static/images/home/10048.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 640upx;
		height: 600upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -100upx;
		img{
			max-width: 300upx;
			height: auto;
		}
	}
	.game-tools-title{
		text-align: left;
		font-size: 32upx;
		height: 50upx;
		color: #fff;
		padding-bottom: 20upx;
		border-bottom: 1px solid rgb(30,32,31);
	}
	.game-tools-sub-title{
		text-align: left;
		font-size: 24upx;
		height: 50upx;
		color: #fff;
		padding-top: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px solid rgb(30,32,31);
		display: flex;
		align-items: center;
	}
	.game-attr{
		color: #fff;
		margin-top: 60upx;
		.attr-title{
			font-size: 32upx;
			height: 80upx;
			line-height: 80upx;
		}
		.attr-item{
			font-size: 24upx;
			height: 40upx;
			line-height: 40upx;
		}
		.attr-content{
			font-size: 26upx;
		}
	}
	
}
.game-price{
	position: absolute;
	width: 690upx;
	height: 100upx;
	bottom: 0upx;
	background-color: rgb(23,23,23);
	color: #fff;
	border-radius: 30upx 30upx 0upx 0upx;
	display: flex;
	align-items: center;
	padding-left: 60upx;
	box-shadow: 0px 30px 30px 20px $fontColor;
	
}
</style>
