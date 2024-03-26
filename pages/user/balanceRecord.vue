<template>
	<view class="balance-record">
		<uni-nav-bar left-icon="left"  :title="$t('property.record.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="choose-box">
			<view class="choose-search">
				<view class="choose-time">
					<view class="choose-time-item" :class="search.time==1?'active':''" @click="chooseTime(1)">{{$t('property.record.search.time1.text')}}</view>
					<view class="choose-time-item" :class="search.time==2?'active':''" @click="chooseTime(2)">{{$t('property.record.search.time2.text')}}</view>
					<view class="choose-time-item" :class="search.time==3?'active':''" @click="chooseTime(3)">{{$t('property.record.search.time3.text')}}</view>
				</view>
				<view class="choose-item" @click="isShow=!isShow">
					<view class="choose-item-name">{{selectItem.currency.name}}</view>
					<uni-icons :type="isShow?'up':'down'" color="#fff" :size="20"></uni-icons>
					<view class="choose-select" v-if="isShow">
						<view class="choose-item-name" :class="selectItem.cid==item.cid?'active':''" v-for="(item,index) in balance" :key="index" @click.stop="chooseItem(item)">{{item.currency.name}}</view>
					</view>
				</view>
			</view>
			
			<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 1400upx"
			        @refresherrefresh="getRefresherrefresh" :refresher-enabled="true" :refresher-triggered="refresherTriggered"
			        refresher-background="transparent">
				<view class="record-item" v-for="(item,index) in records" :key="index">
					<view class="row1">
						<view class="left">
							{{getType(item.accountType)}}
						</view>
						<view class="right">
							<view v-if="item.changeMoney > 0" class="money">+{{divide(item.changeMoney)}}</view>
							<view v-else>{{divide(item.changeMoney)}}</view>
						</view>
					</view>
					<view class="row2">
						<view class="left">
							{{formatDate(item.createdAt)}}
						</view>
						<view class="right">
							{{$t('backapi.self.safe.balance.text')}}: {{divide(item.initMoney)}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import {divide100,formatDate} from '@/utils/util.js'
	export default {
		data() {
			return {
				divide:divide100,
				formatDate:formatDate,
				records:[],
				search:{
					type:'',//0定投 1托管
					typeb:'',//1.收入,2.支出
					time:'1',//1.今日,2.昨日,3.近7日
					cid:'',
					pageNo:1,
					pageSize:10
				},
				status:'',
				totalPage:1,
				refresherTriggered:false,
				balance:[],
				selectItem:{
					currency:{}
				},
				isShow:false,
				typeOptions:[
					{label:this.$t('property.record.type1.text'),value:1},
					{label:this.$t('property.record.type2.text'),value:2},
					{label:this.$t('property.record.type3.text'),value:3},
					{label:this.$t('property.record.type4.text'),value:4}
				]
			}
		},
		onLoad() {
			this.getCurrency()
			// this.loadData()
		},
		methods: {
			chooseItem(item){
				this.isShow =false
				this.selectItem = item
				this.search.pageNo = 1
				this.totalPage = 1
				this.records = []
				this.loadData()
			},
			chooseTime(time){
				this.search.time = time
				this.search.pageNo = 1
				this.totalPage = 1
				this.records = []
				this.loadData()
			},
			getCurrency(){
				this.$http.get('/player/currency/list',res=>{
					if(res.code == 200){
						this.balance = res.data.list
						if(this.balance && this.balance.length > 0){
							this.balance.forEach(item=>{
								if(item.currency.name=='USDT'){
									this.selectItem = item
								}
							})
							this.loadData()
						}
						
					}
				})
			},
			getType(value) {
			   let res = this.typeOptions.find(item => item.value === value)
			   return res.label;
			},
			 scrolltolower() {
			 	this.loadData()
			 },
			 //下拉刷新
			 getRefresherrefresh(){
			 	this.refresherTriggered = true
			 	this.search.pageNo = 1
			 	this.totalPage = 1
			 	this.records = []
			 	this.loadData()
			 },
			 loadData(){
				 const cid = this.selectItem.cid
				 if(cid){
					 this.search.cid = cid
				 }
			 	this.$http.post("/player/balance_change",this.search,res => {
			 		if(res.code == 200){
			 			this.records = [...this.records,...res.data.results]
			 			this.totalPage = res.data.totalPage;
			 			if (this.search.pageNo >= res.data.totalPage) {
			 			    this.search.pageNo = res.data.totalPage + 1;
			 			} else {
			 			    this.search.pageNo = this.search.pageNo + 1
			 			}
			 		}
			 		this.refresherTriggered = false
			 	})
			 },
			goBack(){
				uni.navigateTo({
					url:'./property'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.balance-record{
	min-height: 100vh;
	.choose-box{
		width: 670upx;
		padding: 0 40upx;
		background-color: #030408;
		
		.choose-search{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			margin-bottom: 40upx;
			.choose-time{
				display: flex;
				align-items: center;
				color: #9da4b4;
				font-size: 28upx;
				.choose-time-item{
					min-width: 100upx;
					text-align: center;
					height: 50upx;
					line-height: 50upx;
				}
				.active{
					background-color: #01cecf;
					color: #fff;
					border-radius: 20upx;
				}
			}
			.choose-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				border-radius: 16upx;
				width: 180upx;
				height: 60upx;
				background-color: #343248;
				padding-left: 20upx;
				padding-right: 20upx;
				position: relative;
				.choose-select{
					position: absolute;
					top: 60upx;
					right: 0upx;
					color: #fff;
					border-top: 1px solid #717171;
					background-color: #343248;
					z-index: 999;
					width: 220upx;
					.choose-item-name{
						padding-left: 20upx;
						height: 60upx;
						line-height: 60upx;
					}
					.active{
						color: $fontColor;
					}
				}
			}
			
		}
		.record-item{
				color: #fff;
				margin-bottom: 20upx;
				border-radius: 5px;
				background-color: #2a2937;
				height: 130upx;
				display: flex;
				flex-direction: column;
				.row1,.row2{
					display: flex;
					justify-content: space-between;
					padding: 15upx 20upx;
					.right{
						display: flex;
					}
				}
				.row1{
					font-size: 28upx;
					.money{
						color: $fontColor;
					}
				}
				.row2{
					font-size: 24upx;
					color:#acaebe;
				}
			}
		
	}
}
</style>
