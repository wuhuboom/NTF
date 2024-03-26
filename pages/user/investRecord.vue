<template>
	<view class="inrecord">
		<uni-nav-bar left-icon="left"  :title="$t('recharge.record.page.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 100%;"
                @refresherrefresh="getRefresherrefresh" :refresher-enabled="true" :refresher-triggered="refresherTriggered"
                refresher-background="transparent">
			<view class="record-item" v-for="(item,index) in records" :key="index">
				<view class="row1">
					<view class="left">
						{{item.name}}
					</view>
					<view class="right">
						<view v-if="item.money > 0">+</view>{{item.money}}
					</view>
				</view>
				<view class="row2">
					<view class="left">
						{{item.createdAt}}
					</view>
					<view class="right" :style="item.status === 2 || item.status === 3 ? 'color:#00ff65' : item.status === 4 ? 'color:red' : 'color:#fff'">
						    {{ getType2(item.status) }}
					</view>
				</view>
			</view>
			<!-- <uni-load-more class="loadmore" :status="status" :contentText="loadText" @clickLoadMore="loadData()"></uni-load-more> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records:[
					{createdAt:'2024-03-10 10:10:10',money:'100',type:'1',status:'2',name:'USDT'}
				],
				search:{
					status:'',// 0未结束 1已结束
					type:'',//0定投 1托管
					pageNo:1,
					pageSize:10
				},
				status:'',
				totalPage:1,
				refresherTriggered:false,
				typeOptions: [
				    {
				        label: this.$t("invest.record.status0.text"),
				        value: 0
				    },
				    {
				        label: this.$t("invest.record.status1.text"),
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
				loadText: {
				    loadmore: this.$t("load.more.text"),
				    loading: this.$t("load.loading.text"),
				    nomore: this.$t("load.no.more.text"),
				},
				status: 'more',
			}
		},
		methods: {
			scrolltolower() {
			    // if (this.status == 'more') {
			        
			    // }
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
				this.$http.post("/player/invest/my",this.search,res => {
					if(res.code == 200){
						this.records = [...this.records,...res.data.results]
						this.totalPage = res.data.totalPage;
						if (this.search.pageNo >= res.data.totalPage) {
						    this.search.pageNo = res.data.totalPage + 1;
						    this.status = "noMore";
						} else {
						    this.search.pageNo = this.search.pageNo + 1
						    this.status = 'more';
						}
					}
					this.refresherTriggered = false
				})
			},
			getType() {
			    return (value) => {
			        if (value) {
			            let res = this.typeOptions.find(item => item.value === value)
			            return res.label;
			        }
			
			    }
			},
			getType2(value) {
				let res = this.typeOptions2.find(item => item.value == value)
				return res.label;
			},
			goBack(){
				uni.navigateTo({
					url:'./investment'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.inrecord{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.record-item{
		padding: 20upx;
		color: #fff;
		border-bottom: 1px solid $fontColor;
		.row1,.row2{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.row1 .right{
			display: flex;
			color: #ff0000;
		}
		.row2{
			font-size: 23upx;
			color: rgb(185,185,185);
		}
		
	}
}
</style>
