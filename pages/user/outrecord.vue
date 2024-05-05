<template>
	<view class="balance-record">
		<view class="choose-box">
		<uni-nav-bar left-icon="left"  :title="$t('invoice.menu2.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
			<view class="choose-search">
				<view class="choose-time">
					<view class="choose-time-item" :class="search.time==1?'active':''" @click="chooseTime(1)">{{$t('property.record.search.time1.text')}}</view>
					<view class="choose-time-item" :class="search.time==2?'active':''" @click="chooseTime(2)">{{$t('property.record.search.time2.text')}}</view>
					<view class="choose-time-item" :class="search.time==3?'active':''" @click="chooseTime(3)">{{$t('property.record.search.time3.text')}}</view>
				</view>
			</view>
			<view class="choose-status-filter">
				<view class="choose-status-search" @click="isShow=!isShow">
					<view class="choose-item-name">{{selectItem.label}}</view>
					<uni-icons :type="isShow?'up':'down'" color="#9da4b4" :size="20"></uni-icons>
				</view>
				<view class="choose-select" v-if="isShow">
					<view class="choose-item-name" :class="selectItem.index==index?'active':''" v-for="(item,index) in statusList" :key="index" @click="chooseItem(item,index)">{{item.label}}</view>
				</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 1400upx"
			        @refresherrefresh="getRefresherrefresh" :refresher-enabled="false" :refresher-triggered="refresherTriggered"
			        refresher-background="transparent">
				<view class="record-item" v-for="(item,index) in records" :key="index">
					<view class="row1">
						<view class="left">
							{{getType(item.type)}}
						</view>
						<view class="right">
							<view >{{divide(item.money)}}</view>
						</view>
					</view>
					<view class="row2">
						<view class="left">
							{{formatDate(item.createdAt)}}
						</view>
						<view class="right">
							{{$t('fundsRecords.commission.text')}}: {{divide(item.commission)}}
						</view>
					</view>
					<view class="row2">
						<view class="left">
							 {{ $t('fundsRecords.orderNo.text')}}:{{ item.orderNo }}
						</view>
						<view class="right" :style="{ color: statusList[item.status-1].color }">
							{{ getStatus(item.status)}}
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
					time:'1',//1.今日,2.昨日,3.近7日
					status:'',
					pageNo:1,
					pageSize:10
				},
				status:'',
				totalPage:1,
				refresherTriggered:false,
				typeOptions:[
					{
						label: this.$t('withdraw.record.center.show.detail.type.bank.text'),
						value: 1
					}, {
						label: this.$t('withdraw.record.center.show.detail.usdt.bank.text'),
						value: 2
					}, {
						label: this.$t('backapi.self.whitdraw.type.ewallet.form.wallet.addr.text'),
						value: 4
					}	
				],
				statusList: [
					{
					    label: this.$t("order.search.all.text"),
					    color: '#9F9F9F'
					},{
						label: this.$t('withdraw.record.status.need.audit.text'),
						color: '#9F9F9F'
					}, {
						label: this.$t('withdraw.record.status.already.audit.text'),
						color: '#9F9F9F'
					}, {
						label: this.$t('withdraw.record.status.fail.text'),
						color: '#B5DB1C'
					}, {
						label: this.$t('withdraw.record.status.withdraw.success.text'),
						color: '#FF0000'
					}, {
						label: this.$t('withdraw.record.status.paid.in.text'),
						color: '#FF0000'
					}
					// , {
					// 	label: this.$t('backapi.self.pay.failed.text'),
					// 	color:'#fff'
					// }, {
					// 	label: this.$t('withdraw.record.status.operation.in.text'),
					// 	color:'#fff'
					// }, {
					// 	label: this.$t('withdraw.record.status.redo.in.text'),
					// 	color:'#fff'
					// }, {
					// 	label: this.$t('backapi.self.pay.failed.text'),
					// 	color:'#fff'
					// }
				],
				isShow:false,
				selectItem:{
					index:'',
					label:this.$t('record.filter.text')
				}
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			chooseItem(item,index){
				this.isShow = false
				this.selectItem = {
					index:index,
					label:item.label
				}
				if(this.selectItem.index > 0){
					this.search.status = this.selectItem.index
				}else{
					this.search.status = ''
				}
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
			getType(value) {
			   let res = this.typeOptions.find(item => item.value === value)
			   return res.label;
			},
			getStatus(index) {
			   let res = this.statusList[index - 1].label || ''	
			   return res;
			},
			 scrolltolower() {
				  if(this.search.pageNo >= this.totalPage) return
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
			 	this.$http.post("/player/withdrawal_log",this.search,res => {
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
				let pages = getCurrentPages()
				if(pages && pages.length > 1){
					let path = pages[pages.length - 2].route
					if(!path.startsWith('/')){
						path = '/' + path
					}
					uni.reLaunch({
						url:path
					})
				}else{
					history.go(-1)
				}
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
			.choose-time::-webkit-scrollbar {
			  width: 0; /* 宽度为0，隐藏水平滚动条 */
			  height: 0; /* 高度为0，隐藏垂直滚动条 */
			}
			.choose-time{
				display: flex;
				align-items: center;
				color: #9da4b4;
				font-size: 28upx;
				width: 100%;
				overflow: auto;
				scrollbar-width: none; /* 隐藏水平滚动条 */
				  -ms-overflow-style: none; /* 隐藏Internet Explorer和Edge的滚动条 */
				   scrollbar-color: transparent transparent; /* 隐藏垂直滚动条 */
				.choose-time-item{
					min-width: 100upx;
					text-align: center;
					height: 50upx;
					line-height: 50upx;
					margin-right: 20upx;
					flex-basis:180upx;
					flex-shrink: 0;
					background-color: #2a2937;
					font-size: 26upx;
					border-radius: 10upx;
				}
				.active{
					background-color: #01cecf;
					color: #fff;
					border-radius: 20upx;
				}
			}
		}
		.choose-status-filter{
			position: relative;
			color: #acaebe;
			font-size: 26upx;
			.choose-status-search{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #2a2937;
				height: 60upx;
				border-radius: 10upx;
				.choose-item-name{
					margin-right: 20upx;
				}
			}
			.choose-select{
				position: absolute;
				background-color: #2a2937;
				top: 70upx;
				width: 670upx;
				z-index: 99;
				.choose-item-name{
					line-height: 60upx;
					padding-left: 20upx;
				}
				.active{
					color: #01cecf;
				}
			}
		}
		.record-item{
				color: #fff;
				margin-bottom: 20upx;
				border-radius: 5px;
				background-color: #2a2937;
				height: 180upx;
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