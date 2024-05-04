<template>
	<view class="marketDetail">
		<uni-nav-bar left-icon="left"  :title="project.name" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="projec-title-box">
			<view class="project-title">{{$t('market.total.return')}}</view>
			<view class="project-money">{{divide(project.moneyCurrent)}}</view>
			<view class="project-income">$+{{divide(project.moneyIncome)}}</view>
		</view>
		
		<view class="project-rate">
			<view class="title-box">{{$t('market.investment.days')}}</view>
			<view class="project-days">
				<view class="day-item" v-for="(item,index) in project.rateConfig" :key="index">
					<view class="day-num">{{item.days}} {{$t('market.day.unit')}}</view>
					<view class="day-rate">{{item.rate}}%</view>
				</view> 
			</view>
		</view>
		<view class="project-info">
			<view class="title-box">{{$t('market.company.profile')}}</view>
			<view class="company-info">
				{{project.description}}
			</view>
		</view>
		
		<view class="buy-btn" @click="goInvest">
			<!-- <image src="../../static/images/invest/Subtract.webp" mode="scaleToFill"></image> -->
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
	width: 670upx;
	padding-left: 40upx;
	padding-right: 40upx;
	.projec-title-box{
		padding-top: 40upx;
		padding-bottom: 40upx;
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
		font-size: 36upx;
		font-weight: 600;
		color: #fff;
	}
	.project-rate{
		background-color: #17171f;
		border-radius: 40upx ;
		padding: 20upx 40upx;
		.project-days{
			background-color: #17171f;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			width: 590upx;
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
	}
	.project-info{
		padding: 40upx;
		.company-info{
			margin-top: 40upx;
			font-size: 24upx;
			color: #1accca;
			line-height: 1.8;
			max-height: 50vh;
			overflow: auto;
		}
	}
	.buy-btn{
		position: fixed;
		bottom: 60upx;
		width:670upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #00d4d4;
		border-radius: 50upx;
		text-align: center;
		.btn-text{
		  font-size: 40upx;
		  font-weight: 600;
		  color: #fff;
		}
	}
}
</style>
