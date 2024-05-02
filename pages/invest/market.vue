<template>
	<view class="market">
		<view class="top">
			<view class="top-title">{{$t('market.page.title')}}</view>
			<view class="top-sub-title">
				<view>{{$t('market.page.subtitle')}}</view>
				<view class="cur-time">{{curTime}}</view>
			</view>
		</view>
		<view class="content">
			<view class="project-item">
				<view class="row1">
					<view class="left">项目名称</view>
					<view class="right">
						<view class="money">8989.235 usdt</view>
						<view class="bottom">{{$t('market.total.return')}}</view>
					</view>
				</view>
				<view class="row2">
					<view class="left">
						<view class="day-item">
							<view class="day-num">7{{$t('market.day.unit')}}</view>
							<view class="bottom">1%</view>
						</view>
					</view>
					<view class="right">
						<view class="bay-btn" @click="showDetail">{{$t('market.bay.btn')}}</view>
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
				curTime:'',
				records:[]
			}
		},
		onShow() {
			this.getCurTime()
		},
		methods: {
			showDetail(item){
				uni.navigateTo({
					url:'./marketDetail'
				})
			},
			getCurTime(){
				//as of 4:00 PM ET 04/20/2024
				const date = new Date();
				const year = date.getFullYear();
				const month = ("0" + (date.getMonth() + 1)).slice(-2);
				const day = ("0" + date.getDate()).slice(-2);
				let hours = date.getHours();
				const minutes = ("0" + date.getMinutes()).slice(-2);
				const seconds = ("0" + date.getSeconds()).slice(-2);
				let flag = 'AM'
				if(hours > 12){
					hours = hours - 12
					flag = 'PM'
				}
				this.curTime = `as of ${hours}:${minutes} ${flag} ET ${year}/${month}/${day}`;
				
			}
		}
	}
</script>

<style scoped lang="scss">
.market{
	width: 750upx;
	min-height: 100vh;
	.top{
		width: 750upx;
		height: 750upx;
		background-image: url('../../static/images/invest/marketbg.webp');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding-left: 40upx;
		.top-title{
		  font-size: 86upx;
		  font-weight: 500;
		  letter-spacing: normal;
		  color: #fff;
		  padding-top: 230upx;
		}
		.top-sub-title{
			  font-size: 32upx;
			  font-weight: 500;
			  color: #fff;
			  display: flex;
			  align-items: center;
			  .cur-time{
				  font-size: 24upx;
				  color: #00d4d4;
				  margin-left: 20upx;
			  }
		}
	}
	.content{
		margin-top: -300upx;
		.project-item{
			margin-bottom: 20upx;
			.row1{
				padding: 30upx 40upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #17171f;
				border-bottom: 2px solid #000;
				.left{
					  font-size: 28upx;
					  font-weight: 500;
					  color: #fff;
				}
				.right{
					color:#05ff00;
					.money{
						font-size: 24upx;
						 font-weight: 600;
						 text-align: right;
					}
					.bottom{
						font-size: 24upx;
						text-align: right;
					}
					
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #17171f;
				padding: 20upx 40upx;
				.left{
					display: flex;
					color: #fff;
					.day-item{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						font-size: 24upx;
						.day-num{
							opacity: 0.5;
							letter-spacing: 1upx;
						}
						.bottom{
							font-weight: 500;
							margin-top: 20upx;
						}
					}
				}
				.right{
					.bay-btn{
						 width: 106upx;
						height: 52upx;
						line-height: 52upx;
						font-size: 26upx;
						font-weight: 600;
						text-align: center;
						color: #fff;
						background-color: #00d4d4;
						border-radius: 4upx;
						text-transform: uppercase;
					}
				}
			}
		}
	}
}
</style>
