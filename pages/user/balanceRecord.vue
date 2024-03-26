<template>
	<view class="balance-record">
		<uni-nav-bar left-icon="left"  :title="$t('property.navbar.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="choose-box">
			<view class="choose-item" @click="isShow=!isShow">
				<view class="choose-item-name">{{selectItem.currency.name}}</view>
				<uni-icons :type="isShow?'up':'down'" color="#fff" :size="20"></uni-icons>
			</view>
			<view class="choose-select" v-if="isShow">
				<view class="choose-item-name" :class="selectItem.cid==item.cid?'active':''" v-for="(item,index) in balance" :key="index" @click="chooseItem(item)">{{item.currency.name}}</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 1400upx"
			        @refresherrefresh="getRefresherrefresh" :refresher-enabled="true" :refresher-triggered="refresherTriggered"
			        refresher-background="transparent">
				<view class="record-item" v-for="(item,index) in records" :key="index">
					<view class="row1">
						<view class="left">
							USDT
						</view>
						<view class="right">
							{{divide(item.changeMoney)}}
						</view>
					</view>
					<view class="row2">
						<view class="left">
							{{formatDate(item.createdAt)}}
						</view>
						<view class="right">
							{{divide(item.initMoney)}}
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
					time:'',//1.今日,2.昨日,3.近7日
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
				isShow:false
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
			getCurrency(){
				this.$http.get('/player/currency/list',res=>{
					if(res.code == 200){
						this.balance = res.data.list
						if(this.balance && this.balance.length > 0){
							this.balance.forEach(item=>{
								if(item.currency.name=='USD'){
									this.selectItem = item
								}
							})
							this.loadData()
						}
						
					}
				})
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
		background-image: linear-gradient(to bottom, #252531, #000);
		position: relative;
		.choose-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			height: 120upx;
			border-bottom: 1px solid #9493ac;
		}
		.choose-select{
			position: absolute;
			color: #fff;
			background-image: linear-gradient(to bottom, #252531, #000);
			z-index: 999;
			width: 670upx;
			.choose-item-name{
				height: 80upx;
				line-height: 80upx;
			}
			.active{
				color: $fontColor;
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
				}
				.row2{
					font-size: 24upx;
					color:#acaebe;
				}
			}
		
	}
}
</style>
