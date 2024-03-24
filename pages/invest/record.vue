<template>
	<view class="record">
		<uni-nav-bar left-icon="left"  :title="$t('invest.record.page.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="content">
			<view class="row">
				<view class="title head">{{$t('invest.record.col1.text')}}</view>
				<view class="money head">{{divide(item.totalMoney)}}</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col2.text')}}</view>
				<view class="money">{{divide(item.totalMoneyIncome)}}</view>
			</view>
			<view class="row">
				<view class="title">{{$t('invest.record.col3.text')}}</view>
				<view class="money">{{divide(item.totalMoneyLock)}}</view>
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
		<view class="invest-record">{{$t('invest.record.order.text')}}</view>
		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 100%;"
		        @refresherrefresh="getRefresherrefresh" :refresher-enabled="true" :refresher-triggered="refresherTriggered"
		        refresher-background="transparent">
			<view class="record-list">
				<view class="row header">
					<view class="col col1">{{$t('invest.record.table.col1.text')}}</view>
					<view class="col col2">{{$t('invest.record.table.col2.text')}}</view>
					<view class="col col3">{{$t('invest.record.table.col3.text')}}</view>
					<view class="col col4">{{$t('invest.record.table.col4.text')}}</view>
				</view>
				<view class="row" v-for="(item,index) in records" :key="index">
					<view class="col col1">{{divide(item.money)}}</view>
					<view class="col col2">{{formatDate(item.finishTime * 1000,1)}}</view>
					<view class="col col3">{{getType(item.planType)}}</view>
					<view class="col col4">{{count(item)}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {divide,formatDate} from '@/utils/util.js'
	export default {
		data() {
			return {
				item:{
					"totalMoneyIncome": 522,
					"totalMoney": 11000,
					"totalMoneyLock": 200
				},
				divide:divide,
				formatDate:formatDate,
				records:[],
				search:{
					status:'',// 0未结束 1已结束
					type:'1',//0定投 1托管
					pageNo:1,
					pageSize:10
				},
				totalPage:1,
				refresherTriggered:false,
				typeOptions: [
				    {
				        label: this.$t("iinvest.menu4.text"),
				        value: 0
				    },
				    {
				        label: this.$t("invest.menu1.text"),
				        value: 1
				    }
				],
				typeOptions2: [
				    {
				        label: this.$t("invest.menu4.text"),
				        value: 0
				    },
				    {
				        label: this.$t("invest.menu1.text"),
				        value: 1
				    }
				],
			}
		},
		onLoad() {
			this.loadData()
			this.loadRecord()
		},
		methods: {
			scrolltolower() {
				this.loadRecord()
			},
			//下拉刷新
			getRefresherrefresh(){
				this.refresherTriggered = true
				this.search.pageNo = 1
				this.totalPage = 1
				this.records = []
				this.loadRecord()
			},
			loadRecord(){
				this.$http.post("/player/invest/my",this.search,res => {
					console.log(res,'--------2222----------')
					this.records = [...this.records,...res.results]
					this.totalPage = res.totalPage;
					if (this.search.pageNo >= res.totalPage) {
						this.search.pageNo = res.totalPage + 1;
					} else {
						this.search.pageNo = this.search.pageNo + 1
					}
						
					this.refresherTriggered = false
				})
			},
			count(item){
				return (item.money * item.days * item.rateConf / 10000).toFixed(2)
			},
			getType(value) {
			   let res = this.typeOptions.find(item => item.value === value)
			   return res.label;
			},
			getType2(value) {
				let res = this.typeOptions2.find(item => item.value == value)
				return res.label;
			},
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
	.invest-record{
		font-size: 36upx;
		color: #fff;
		font-weight: 600;
		margin-top: 20upx;
	}
	.record-list{
		.header{
			border-bottom: 1px solid $fontColor!important;
		}
		.row{
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			padding-top: 10upx;
			padding-bottom: 10upx;
			border-bottom: 1px solid rgb(23,26,29);
			.col{
				text-align: center;
				font-size: 26upx;
			}
			.col1{
				width: 120upx;
			}
			.col2{
				width: 100upx;
				image{
					width: 80upx;
					height: 50upx;
				}
			}
			.col3{
				width: 150upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.col4{
				width: 130upx;
			}
			.col4_1{
				width: 130upx;
				color: green;
			}
			.col5{
				width: 150upx;
			}
			.col6{
				width: 150upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.address{
					width: 70upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
