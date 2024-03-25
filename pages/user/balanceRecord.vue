<template>
	<view class="balance-record">
		<uni-nav-bar left-icon="left"  :title="$t('property.navbar.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
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
			<!-- <uni-load-more class="loadmore" :status="status" :contentText="loadText" @clickLoadMore="loadData()"></uni-load-more> -->
		</scroll-view>
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
					pageNo:1,
					pageSize:10
				},
				status:'',
				totalPage:1,
				refresherTriggered:false,
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
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
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.record-item{
		color: #fff;
		margin-bottom: 20upx;
		border-radius: 5px;
		background-color: #2a2937;
		height: 150upx;
		display: flex;
		flex-direction: column;
		.row1,.row2{
			display: flex;
			justify-content: space-between;
			padding: 20upx 20upx;
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
</style>
