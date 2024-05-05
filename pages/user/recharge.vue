<template>
	<view class="recharge">
		<uni-nav-bar left-icon="left"  :title="$t('property.subpage.title1')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="title">{{$t('recharge.payway.title')}}</view>
		
		<view class="payways">
			 <view class="way-item" v-for="(item,index) in payways" :key="index" @click="chooseItem(item,index)">
			 	<image :src="item.img" mode="scaleToFill"></image>
			 	<view class="way-item-text">{{item.currencySymbol}}</view>
				<view class="active" v-if="selIndex == index"></view>
			 </view>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top">
				<uni-forms-item :label="$t('recharge.money.text')" name="money">
					<uni-easyinput type="text" v-model="formData.money" :placeholder="$t('ruls.xxx.please',{name:$t('recharge.money.text')}) + ' ' + sectItem.minMax" />
				</uni-forms-item>
			</uni-forms>
			<view class="tips">
				<view class="tips-row">
					<view class="left">{{$t('recharge.actual.text')}}</view>
					<view class="right">{{actualMount}} {{sectItem.currencySymbol}}</view>
				</view>
				<view class="tips-row">
					<view class="left">{{$t('recharge.rate.text')}}</view>
					<view class="right">{{sectItem.rate}}</view>
				</view>
			</view>
			<view class="fast-box">
				<view class="fast-item" v-for="(item,index) in sectItem.fast" :key="index" @click="chooseNum(item)">{{item}}</view>
			</view>
			<button class="btn" @click="submit">{{$t('btn.continue.text')}}</button>
		</view>
		<view class="tip_mod">
		    <view class="tip_title">{{ $t("recharge.tip.title.text") }}</view>
		    <view class="tip_item" v-for="(item, index) in rechargeTipLists" :key="index">
		        {{ item }}
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				formData:{
					money:'',
					payId:''
				},
				rules: {
					money: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('recharge.money.text')})}
						]
					}
				},
				payways:[
					  // {
					  //   "img": "https://img.sgodown.cc/bankCharge.png",
					  //   "fast": "200",
					  //   "unholdMsg": "invalid",
					  //   "def": 0,
					  //   "rate": "1",
					  //   "name": "INPAY",
					  //   "minMax": "100-99999",
					  //   "currencySymbol": "USDT",
					  //   "id": 6,
					  //   "sort": 0,
					  //   "type": 64,
					  //   "unhold": 0
					  // }
				],
				sectItem:{},
				selIndex:0,
				actualMount:0,
				rechargeTipLists: [
				    this.$t('backapi.self.recharge.tip.content1.text'),
				    this.$t('backapi.self.recharge.tip.content2.text'),
				    this.$t('backapi.self.recharge.tip.content3.text')
				]
			}
		},
		onLoad() {
			this.loadPayWays()
			this.sectItem = this.payways[0] || {}
		},
		watch:{
			'formData.money':function(val){
				if(val > 0){
					this.actualMount = val * this.sectItem.rate
				}else{
					this.actualMount = 0
				}
			}
		},
		methods: {
			chooseNum(num){
				this.formData.money = num
			},
			chooseItem(item,index){
				this.selIndex = index
				this.sectItem = item
			},
			submit(){
				this.$refs.form.validate().then(res=>{
					const para = {
						money : this.formData.money,
						payId : this.sectItem.id
					}
					this.$http.post('/player/recharge',para,(res=>{
						if(res.code ==200){
							res = res.data
							if (res.UrlAddress) {
								location.href = res?.UrlAddress
							}
						}
					}))
				}).catch(err =>{
					console.log(err);
				})
			},
			loadPayWays(){
				this.$http.get('/player/recharge_pre',res => {
					if(res.code==200){
						this.payways = res.data || []
						this.payways.forEach(item=>{
							item.fast = item.fast.split('-')
						})
					}
					this.sectItem = this.payways[0] || {}
				})
			},
			changeWay(item){
				this.sectItem = item
				this.isShow = ! this.isShow
			},
			goRecord(){
				uni.navigateTo({
					url:'./inrecord'
				})
			},
			goBack(){
				uni.reLaunch({
					url:'./user'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.recharge{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.title{
		color: #fff;
		font-size: 26upx;
		margin-top: 20upx;
	}
	.payways{
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.way-item{
			 display: flex;
			 flex-direction: column;
			 align-items: center;
			 justify-content: center;
			 height: 170upx;
			 width: 320upx;
			 border-radius: 30upx;
			 border: 1px solid $fontColor;
			 background-color: #002c2c;
			 margin-bottom: 20upx;
			 position: relative;
			 image{
				 width: 60upx;
				 height: 60upx;
			 }
			 .way-item-text{
				 font-size: 32upx;
				 color: #fff;
				 margin-top: 20upx;
			 }
			 .active{
				 background-image: url('../../static/images/user/check.webp');
				 background-size: 100% 100%;
				 width: 50upx;
				 height: 40upx;
				 position: absolute;
				 top: 0upx;
				 right: 0upx;
			 }
		}
	}
	.form{
		width: 670upx;
		margin-top: 20upx;
		::v-deep .uni-forms-item__label{
			width: 300upx!important;
			color: #fff;
		}
		::v-deep .uni-easyinput__content{
			background-color: rgb(41,41,55)!important;
			border-color: rgb(41,41,55)!important;
			color: rgb(255,255,255)!important;
		}
		::v-deep .uni-icons{
			color: $fontColor!important;
		}
		.tips{
			background-color: rgb(41,41,55);
			border-radius: 10upx;
			.tips-row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10upx;
				color: #999;
				font-size: 26upx;
			}
		}
		.fast-box{
			display: flex;
			flex-wrap: wrap;
			.fast-item{
				background-color: rgb(41,41,55);
				width: 100upx;
				margin-right: 20upx;
				margin-top: 20upx;
				border-radius: 10upx;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				color: #999;
			}
		}
		.btn{
			margin-top: 40upx;
			background-color: $fontColor;
			color: #fff;
		}
		.forget-box{
			display: flex;
			justify-content: end;
			color: #fff;
			margin-bottom: 40upx;
			.reset{
				color: $fontColor;
			}
		}
	}
	.tip_mod {
	    width: 670;
	    min-height: 300rpx;
	    background-color: rgb(41,41,55);
	    padding: 16rpx 32rpx;
	    margin-bottom: 48rpx;
		margin-top: 40upx;
	    .tip_title {
	        margin-bottom: 24rpx;
	        color: $fontColor;
			font-size: 28upx;
	    }
	
	    .tip_item {
	        margin-bottom: 16rpx;
	         color: rgba(255, 255, 255, 0.6);
			 font-size: 24upx;
	    }
	}
	
}
</style>
