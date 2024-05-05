<template>
	<view class="market">
		<view class="top">
			<view class="top-title">{{$t('market.page.title')}}</view>
			<view class="top-sub-title">
				<view>{{$t('market.page.subtitle')}}</view>
			</view>
		</view>
		<view class="content">
			<view class="project-item" v-for="(item,index) in records" :key="index">
				<view class="row1">
					<view class="left">{{item.name}}</view>
					<view class="right">
						<view class="money">{{divide(item.moneyCurrent)}} usdt</view>
						<view class="bottom">{{$t('market.total.return')}}</view>
					</view>
				</view>
				<view class="row2">
					<view class="left">
						<view class="day-item" v-for="(t,i) in item.rateConfig" :key="i">
							<view class="day-num">{{t.days}} {{$t('market.day.unit')}}</view>
							<view class="bottom">{{t.rate}}%</view>
						</view>
					</view>
					<view class="divider"></view>
					<view class="right">
						<view class="bay-btn" @click="showDetail(item)">{{$t('market.bay.btn')}}</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {divide100} from '@/utils/util.js'
	export default {
		data() {
			return {
				divide:divide100,
				curTime:'',
				records:[]
			}
		},
		onShow() {
			this.getCurTime()
			this.loadMarkets()
		},
		methods: {
			loadMarkets(){
				this.$http.post('/player/invest/plans',{},res=>{
					if(res.code == 200){
						let datas = res.data || []
						this.records = datas.map(item=>{
							if(typeof item.rateConfig =='string'){
								item.rateConfig = JSON.parse(item.rateConfig)
							}
							return item
						})
					}
				})
			},
			showDetail(item){
				uni.navigateTo({
					url:'./marketDetail?id='+item.id
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
		height: 400upx;
		background-image: url('../../static/images/invest/marketbg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding-left: 40upx;
		.top-title{
		  font-size: 86upx;
		  font-weight: 500;
		  letter-spacing: normal;
		  color: #fff;
		  padding-top: 130upx;
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
		margin-top: -80upx;
		.project-item{
			margin-bottom: 20upx;
			padding-left: 40upx;
			padding-right: 40upx;
			.row1{
				padding: 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #17171f;
				border-bottom: 2px solid #000;
				border-radius: 30upx 30upx 0upx 0upx;
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
						text-transform: capitalize;
					}
					
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #17171f;
				padding: 20upx 20upx 20upx 20upx;
				border-radius: 0upx 0upx 30upx 30upx ;
				.left::-webkit-scrollbar {
				  width: 0; /* 宽度为0，隐藏水平滚动条 */
				  height: 0; /* 高度为0，隐藏垂直滚动条 */
				}
				.left{
					display: flex;
					flex-wrap: nowrap;
					color: #fff;
					width: 500upx;
					overflow: auto;
					scrollbar-width: none; /* 隐藏水平滚动条 */
					  -ms-overflow-style: none; /* 隐藏Internet Explorer和Edge的滚动条 */
					   scrollbar-color: transparent transparent; /* 隐藏垂直滚动条 */
					.day-item{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						font-size: 24upx;
						width: 100upx;
						flex-basis:100upx;
						flex-shrink: 0;
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
				.divider{
					width: 4upx;
					height: 70upx;
					background-color: #fff;
					opacity: 0.2;
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
