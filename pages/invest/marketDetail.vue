<template>
	<view class="marketDetail">
		<uni-nav-bar left-icon="left"  title="项目名称" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="projec-title-box">
			<view class="project-title">{{$t('market.total.return')}}</view>
			<view class="project-money">8865.22</view>
			<view class="project-income">$+1152</view>
		</view>
		<view class="title-box">{{$t('market.investment.days')}}</view>
		<view class="project-days">
			<view class="day-item">
				<view class="day-num">7{{$t('market.day.unit')}}</view>
				<view class="day-rate">1%</view>
			</view>
			<view class="day-item">
				<view class="day-num">7{{$t('market.day.unit')}}</view>
				<view class="day-rate">1%</view>
			</view>
			<view class="day-item">
				<view class="day-num">7{{$t('market.day.unit')}}</view>
				<view class="day-rate">1%</view>
			</view>
		</view>
		<view class="title-box">{{$t('market.company.profile')}}</view>
		<view class="company-info">
			Apple Inc. (Apple) designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories and sells a range of related services.
			The Company's products include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch and accessories. The Company operates various platforms, including the App Store, which allows customers to discover and download applications and digital content, such as books, music, video, games and podcasts. Apple offers digital content through subscription-based services, including Apple Arcade, Apple Music, Apple News+, Apple TV+ and Apple Fitness+. Apple also offers a range of other services, such as AppleCare, iCloud, Apple Card and Apple Pay. Apple sells its products and resells third-party products in a range of markets, including directly to consumers, small and mid-sized businesses, and education, enterprise and government customers through its retail and online stores and its direct sales force.
		</view>
		<view class="buy-btn" @click="goInvest">
			<image src="../../static/images/invest/Subtract.webp" mode="scaleToFill"></image>
			<view class="btn-text">{{$t('market.submit.btn')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project:{}
			}
		},
		onLoad(option) {
			
		},
		methods: {
			goInvest(){
				uni.reLaunch({
					url:'./invest'
				})
			},
			goBack(){
				uni.switchTab({
					url:'./market'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.marketDetail{
	.projec-title-box{
		padding: 40upx;
		margin-top: 20upx;
		.project-title{
		  font-size: 28upx;
		  color: #fff;
		  margin-bottom: 10upx;
		}
		.project-money{
			font-size: 60upx;
			  font-weight: 500;
			  letter-spacing: 0.3px;
			  color: #fff;
			   margin-bottom: 10upx;
		}
		.project-income{
			font-size: 28upx;
			color: #05ff00;
			 margin-bottom: 10upx;
		}
	}
	.title-box{
		background-color: #17171f;
		padding: 40upx 40upx 20upx 40upx;
		font-size: 36upx;
		font-weight: 600;
		color: #fff;
		
	}
	.project-days{
		background-color: #17171f;
		border-bottom: 2px solid #000;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		width: 670upx;
		padding: 20upx 40upx;
		.day-item{
			padding-top: 20upx;
			width: 45%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.day-num{
				  font-size: 24upx;
				  font-weight: 500;
				  color: #1accca;
			}
			.day-rate{
				  font-size: 28upx;
				  font-weight: 600;
				  color: #fff;
			}
		}
	}
	.company-info{
		font-size: 24upx;
		color: #1accca;
		background-color: #17171f;
		padding:20upx 40upx;
		line-height: 1.8;
	}
	.buy-btn{
		width:670upx;
		height: 100upx;
		margin: 0 auto;
		background-color: #00d4d4;
		border-radius: 50upx;
		display: flex;
		align-items: center;
		margin-top: 40upx;
		image{
			width: 80upx;
			height: 80upx;
			margin-left: 20upx;
		}
		.btn-text{
			  font-size: 40upx;
			  font-weight: 600;
			  color: #fff;
			  margin-left: 130upx;
		}
	}
}
</style>
