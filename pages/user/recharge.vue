<template>
	<view class="recharge">
		<uni-nav-bar left-icon="left"  :title="$t('property.subpage.title1')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="title">{{$t('recharge.payway.title')}}</view>
		
		<view class="payways">
			<view class="show-box" @click="isShow = !isShow">
				<view class="way-item">
					<view class="left">
						<img :src="sectItem.img"/>
					</view>
					<view class="right">
							<view class="way-name">{{sectItem.name}} - {{sectItem.currencySymbol}}</view>
							<view class="way-minMax">{{sectItem.minMax}}</view>
					</view>
					<uni-icons :type="isShow?'up':'down'" color="#fff" size="24"></uni-icons>
				</view>
			</view>
			<view class="hide-box" v-if="isShow">
				<view class="way-item" v-for="(item,index) in payways" :key="index" @click="changeWay(item)">
					<view class="left">
						<img :src="item.img"/>
					</view>
					<view class="right">
						<view class="way-name">{{item.name}} - {{item.currencySymbol}}</view>
						<view class="way-minMax">{{item.minMax}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top">
				<uni-forms-item :label="$t('recharge.money.text')" name="money">
					<uni-easyinput type="text" v-model="formData.money" :placeholder="$t('ruls.xxx.please',{name:$t('recharge.money.text')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.continue.text')}}</button>
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
					  {
					    "img": "https://img.sgodown.cc/bankCharge.png",
					    "fast": "200",
					    "unholdMsg": "invalid",
					    "def": 0,
					    "rate": "1",
					    "name": "INPAY",
					    "minMax": "100-99999",
					    "currencySymbol": "USDT",
					    "id": 6,
					    "sort": 0,
					    "type": 64,
					    "unhold": 0
					  },
					  {
					    "img": null,
					    "fast": "200-300",
					    "unholdMsg": "invalid",
					    "def": 0,
					    "rate": "1",
					    "name": "JYPAY",
					    "minMax": "100-999999",
					    "currencySymbol": "Rp",
					    "id": 9,
					    "sort": 0,
					    "type": 68,
					    "unhold": 0
					  },
					  {
					    "img": "https://img.sgodown.cc/bankCharge.png",
					    "fast": "200-500-1000-3000-5000-10000-15000",
					    "unholdMsg": "invalid",
					    "def": 0,
					    "rate": "1",
					    "name": "Boypay",
					    "minMax": "100-99999",
					    "currencySymbol": "EGP",
					    "id": 7,
					    "sort": 0,
					    "type": 65,
					    "unhold": 0
					  },
					  {
					    "img": "https://img.sgodown.cc/bankCharge.png",
					    "fast": "1000",
					    "unholdMsg": "invalid",
					    "def": 0,
					    "rate": "1",
					    "name": "污渍",
					    "minMax": null,
					    "currencySymbol": "UZS",
					    "id": 8,
					    "sort": 0,
					    "type": 66,
					    "unhold": 0
					  },
					  {
					    "img": "https://img.sgodown.cc/virtual.png",
					    "fast": "5-10-15-30-50-100-300-500-1000-3000-5000-10000",
					    "unholdMsg": "invalid",
					    "def": 0,
					    "rate": "100",
					    "name": "USDT",
					    "minMax": "5-9999999",
					    "currencySymbol": "USDT",
					    "id": 3,
					    "sort": 0,
					    "type": 1,
					    "unhold": 0
					  }
				],
				sectItem:{}
			}
		},
		onLoad() {
			this.loadPayWays()
			
			this.sectItem = this.payways[0] || {}
		},
		methods: {
			submit(){
				this.$refs.form.validate().then(res=>{
					const para = {
						money : this.formData.money,
						payId : this.sectItem.id
					}
					this.$http.post('/player/recharge',para,(res=>{
						if(res.code ==200){
							res = res.data
							if (res?.UrlAddress) {
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
					console.log(res,'------------')
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
				uni.navigateTo({
					url:'./property'
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
		font-size: 36upx;
		margin-top: 20upx;
	}
	.payways{
		margin-top: 20upx;
		background-color: rgb(41,41,55);
		border-radius: 10upx;
		.show-box{
			position: relative;
		}
		.hide-box{
			position: absolute;
			width: 670upx;
			background-color: rgba(41,41,55,.8);
			z-index: 99;
		}
		.way-item{
			height: 80upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			padding-left: 30upx;
			padding-right: 30upx;
			.left{
				width: 20%;
				img{
					width: 80upx;
					height: auto;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				.way-minMax{
					font-size: 24upx;
					color: rgb(185,185,185);
				}
			}
		}
		.hide-box .right{
			width: 40%;
		}
		.show-box .right{
			width: 70%;
		}
	}
	.form{
		width: 670upx;
		margin-top: 20upx;
		::v-deep .uni-forms-item__label{
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
		.btn{
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
	
}
</style>
