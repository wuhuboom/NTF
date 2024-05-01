<template>
	<view class="income">
		<uni-nav-bar left-icon="left"  :title="$t('user.trade.title3.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="tabs">
			<view class="tab-item" :class="tabIndex==item.value?'active':''" v-for="(item,index) in tabs" :key="index" @click="changeTab(item)">
				{{item.label}}
			</view>
		</view>
		<view class="team-container" v-if="tabIndex==1">
			<view class="user-money">
				<view class="user-money-item">
					<view class="item-name">{{$t('income.team.count')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="user-money-item">
					<view class="item-name">{{$t('income.team.cur')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="user-money-item">
					<view class="item-name">{{$t('income.team.people')}}</view>
					<view class="item-num">$0.00</view>
				</view>
			</view>
			<view class="user-level level1">
				<view class="col1">23</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.count')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.cur')}}</view>
					<view class="item-num">$0.00</view>
				</view>
			</view>
			<view class="user-level level2">
				<view class="col1">23</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.count')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.cur')}}</view>
					<view class="item-num">$0.00</view>
				</view>
			</view>
			<view class="user-level level3">
				<view class="col1">23</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.count')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="col">
					<view class="item-name">{{$t('income.team.level.cur')}}</view>
					<view class="item-num">$0.00</view>
				</view>
			</view>
		</view>
		<view class="container" v-if="tabIndex==2">
			
			<view class="user-money">
				<view class="user-money-item">
					<view class="item-name">{{$t('income.team.level.count')}}</view>
					<view class="item-num">$0.00</view>
				</view>
				<view class="user-money-item">
					<view class="item-name">{{$t('income.team.level.cur')}}</view>
					<view class="item-num">$0.00</view>
				</view>
			</view>
			<view class="coin-box">
				<view class="coin-item" :class="cid==item.cid?'active':''" v-for="(item,index) in usdts" :key="index" @click="choose(item.cid)">{{item.currency.name}}</view>
			</view>
			<echarts ref="echarts" :option="option" canvasId="echarts" style="width: 100%;height: 100%;"></echarts>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts-uniapp/echarts-uniapp.vue'
	import {formatDate} from '@/utils/util.js'
	export default {
		components:{
			echarts
		},
		data() {
			return {
				usdts:'',
				cid:'',
				formatDate:formatDate,
				option : {
						backgroundColor: "transparent",
						tooltip:{
							trigger:'axis',
							textStyle:{
								color:'#fff'
							},
							backgroundColor:'rgb(41,41,55)'
						},
						 xAxis: {
						    type: 'category',
						    boundaryGap: false,
						    data: []
						  },
						  yAxis: {
						    type: 'value'
						  },
						  series: [
						    {
						      data: [],
						      type: 'line',
							  itemStyle:{
								color:'#04D3D5'
							  },
							  lineStyle:{
								color:'#04D3D5'  
							  },
						      areaStyle: {
								  color:'#04D3D5'
							  }
						    }
						  ]	
				},
				tabs:[
					{value:1,label:'团队'},
					{value:2,label:'个人'}
				],
				tabIndex:1
			}
		},
		onReady() {
			// this.getCurrency()
		},
		 
		methods: {
			changeTab(item){
				this.tabIndex = item.value
				if(this.tabIndex==2){
					this.getCurrency()
				}
			},
			initChar(){
				this.$refs['echarts'].initChart(this.option)
			},
			choose(cid){
				this.cid = cid
				this.loadData()
			},
			getCurrency(){
				this.$http.get('/player/currency/list',res=>{
					if(res.code == 200){
						this.usdts = res.data.list || []
						this.cid = this.usdts[0].cid
						this.loadData()
					}
				})
			},
			loadData(){
				let para = {
					id:this.cid
				}
				this.$http.post('/player/invest/my/statis',para,res => {
					if(res.code ==200){
						let times = res.data.times || []
						times = times.map(item=>{
							return formatDate(item,2)
						})
						this.option.xAxis.data = times
						this.option.series[0].data = res.data.values || []
						this.initChar(this.option)
					}
				})
			},
			goBack(){
				uni.switchTab({
					url:'/pages/user/user'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.income{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	background-image: url('../../static/images/user/incomebg.webp');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.tabs{
		width: 100%;
		display: flex;
		justify-content: space-between;
		.tab-item{
			width: 50%;
			text-align: center;
			color: #fff;
			font-size: 30upx;
			font-weight: 500;
			letter-spacing: 0.15px;
		}
		.active{
			 color: #1accca;
		}
	}
	.user-money{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
		background-color: #0c0c0c;
		padding-top: 40upx;
		padding-bottom: 40upx;
		.user-money-item{
			width: 220upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.item-name{
			   font-size: 24upx;
			   color: #fff;
			   margin-bottom: 20upx;
			}
			.item-num{
				 font-size: 44upx;
				  font-weight: bold;
				  color: #fff;
			}
		}
	}
	.team-container{
		.user-level{
			background-size: 100% 100%;
			height: 200upx;
			color: #fff;
			display: flex;
			justify-content: flex-end;
			margin-bottom: 50upx;
			position: relative;
			.col1{
				position: absolute;
				bottom: 20upx;
				left: 50upx;
				font-size: 24upx;
			}
			.col{
				padding-top: 70upx;
				margin-right: 100upx;
				.item-name{
				   font-size: 28upx;
				   color: #1accca;
				   margin-bottom: 20upx;
				}
				.item-num{
					 font-size: 44upx;
					  font-weight: bold;
					  color: #fff;
				}
			}
		}
		.level1{
			background-image: url('../../static/images/user/level1.webp');
		}
		.level2{
			background-image: url('../../static/images/user/level2.webp');
		}
		.level3{
			background-image: url('../../static/images/user/level3.webp');
		}
	}
	.container{
		width: 670upx;
		height: 500upx;
		margin: 0 auto;
		.coin-box{
			display: flex;
			align-items: center;
			height: 80upx;
			color: #fff;
			.coin-item{
				width: 150upx;
				text-align: center;
				border-bottom: 1px solid #717171;
				padding-bottom: 20upx;
			}
			.active{
				color: $fontColor;
				border-bottom: 2px solid $fontColor;
			}
		}
		
	}
}
</style>
