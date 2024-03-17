<template>
	<view class="income-invest">
		<uni-nav-bar left-icon="left"  :title="$t('myfriends.rank.team.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="content">
			<view class="row border">
				<view class="row-item">
					<view class="title">
						{{$t('myfriends.team.title1.text')}}
					</view>
					<view class="num">
						0USDT
					</view>
				</view>
				<view class="row-item">
					<view class="title align-r">
						{{$t('myfriends.team.title2.text')}}
					</view>
					<view class="num align-r">
						0USDT
					</view>
				</view>
			</view>
			<view class="row">
				<view class="row-item">
					<view class="title">
						{{$t('myfriends.team.title3.text')}}
					</view>
					<view class="num">
						0USDT
					</view>
				</view>
				<view class="row-item">
					<view class="title align-r">
						{{$t('myfriends.team.title4.text')}}
					</view>
					<view class="num align-r">
						0USDT
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[]
			}
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
.income-invest{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.content{
		box-shadow: inset 0 0 16upx 0upx $fontColor;
		border-radius: 20upx;
		color: #fff;
		padding: 30upx;
		.border{
			border-bottom: 1px solid $fontColor;
		}
		.row{
			padding-top: 20upx;
			padding-bottom: 20upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.row-item{
				width: 45%;
				.title{
					margin-top: 10upx;
					margin-bottom: 10upx;
					font-size: 26upx;
				}
				.num{
					font-size: 32upx;
				}
				.align-r{
					text-align: right;
				}
			}
		}
	}
}
</style>
