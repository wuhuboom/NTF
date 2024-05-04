<template>
	<view class="marketDetail">
		<uni-nav-bar left-icon="left"  :title="project.name" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="projec-title-box">
			<view class="project-title">{{$t('market.total.return')}}</view>
			<view class="project-money">{{divide(project.moneyCurrent)}}</view>
			<view class="project-income">$+{{divide(project.moneyIncome)}}</view>
		</view>
		<view class="title-box">{{$t('market.investment.days')}}</view>
		<view class="project-days">
			<view class="day-item" v-for="(item,index) in project.rateConfig" :key="index">
				<view class="day-num">{{item.days}} {{$t('market.day.unit')}}</view>
				<view class="day-rate">{{item.rate}}%</view>
			</view> 
		</view>
		<view class="title-box">{{$t('market.company.profile')}}</view>
		<view class="company-info">
			{{project.description}}
		</view>
		<view class="buy-btn" @click="goInvest">
			<image src="../../static/images/invest/Subtract.webp" mode="scaleToFill"></image>
			<view class="btn-text">{{$t('market.submit.btn')}}</view>
		</view>
	</view>
</template>

<script>
	import {divide100} from '@/utils/util.js'
	export default {
		data() {
			return {
				divide:divide100,
				project:{
					id:'',
					name:'',
					rateConfig:[]
				},
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.loadMarkets()
		},
		methods: {
			loadMarkets(){
				this.$http.post('/player/invest/plans',{},res=>{
					if(res.code == 200){
						let datas = res.data || []
						this.project = datas.find(item=>item.id==this.id)
						this.project.rateConfig = JSON.parse(this.project.rateConfig)
					}
				})
			},
			goInvest(){
				uni.reLaunch({
					url:'./invest?id=' + this.project.id
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
		background-image: url('../../static/images/invest/dbg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.project-title{
		  font-size: 28upx;
		  color: #fff;
		  margin-bottom: 10upx;
		  text-transform: capitalize;
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
		max-height: 35vh;
		overflow: auto;
	}
	.buy-btn{
		position: fixed;
		bottom: 10upx;
		margin-left: 40upx;
		width:670upx;
		height: 100upx;
		background-color: #00d4d4;
		border-radius: 50upx;
		display: flex;
		align-items: center;
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
