<template>
	<view class="record">
		<uni-nav-bar left-icon="left"  :title="$t('invest.record.page.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="content">
			<view class="row">
				<view class="title head">{{$t('invest.record.col1.text')}}</view>
				<view class="money head">{{item.totalMoney}}</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col2.text')}}</view>
				<view class="money">{{item.totalMoneyIncome}}</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col3.text')}}</view>
				<view class="money">{{item.totalMoneyLock}}</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col4.text')}}</view>
				<view class="money">0</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col5.text')}}</view>
				<view class="money">0</view>
			</view>
		</view>
		<view class="record">{{$t('invest.record.order.text')}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{
					"totalMoneyIncome": 522,
					"totalMoney": 11000,
					"totalMoneyLock": 200
				}
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$http.get('/player/deposit/logs',res=>{
					if(res.code==200){
						this.item = res.data
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.record{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.content{
		box-shadow: inset 0 0 16upx 0upx $fontColor;
		color: #fff;
		padding: 20upx;
		.row{
			line-height: 80upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			.head{
				font-size: 32upx;
			}
		}
	}
	.record{
		font-size: 36upx;
		color: #fff;
		font-weight: 600;
		margin-top: 20upx;
	}
}
</style>
