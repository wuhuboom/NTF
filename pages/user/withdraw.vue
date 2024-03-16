<template>
	<view class="recharge">
		<uni-nav-bar left-icon="left"  :title="$t('property.subpage.title2')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="title">{{$t('withdraw.payway.title')}}</view>
		
		<view class="payways">
			<view class="show-box" @click="isShow = !isShow">
				<view class="way-item">
					<view class="left">
						<img :src="sectItem.img"/>
					</view>
					<view class="right">
							<view class="way-name">{{sectItem.name}}</view>
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
						<view class="way-name">{{item.name}}</view>
						<view class="way-minMax">{{item.minMax}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top">
				<uni-forms-item :label="$t('withdraw.money.text')" name="money">
					<uni-easyinput type="text" v-model="formData.money" :placeholder="$t('ruls.xxx.please',{name:$t('recharge.money.text')})" />
				</uni-forms-item>
				<uni-forms-item :label="$t('withdraw.password.text')" name="password">
					<uni-easyinput type="password" v-model="formData.password" :placeholder="$t('ruls.xxx.please',{name:$t('withdraw.password.text')})" />
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
					type:'',
					password:''
				},
				rules: {
					money: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('recharge.money.text')})}
						]
					},
					password: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('withdraw.password.text')})}
						]
					}
				},
				payways:[
					  {
						"img": "https://img.sgodown.cc/bankCharge.png",
						"withdrawalRateMax": 100000,
						"withdrawalRate": 8,
						"currencySymbol": "USDT",
						"withdrawMax": 10000,
						"everydayWithdrawTimes": 30,
						"type": 1,
						"wiModelRe": 0,
						"wiModelRate": 0,
						"everydayWithdrawFree": 0,
						"withdrawalToday": 0,
						"withdrawalRateMin": 0,
						"wiModel": 0,
						"rate": "1",
						"withdrawMin": 150,
						"name": "Bank"
					  },
					  {
						"img": "https://sgo.uunn.org/USDT.png",
						"withdrawalRateMax": 1000,
						"withdrawalRate": 8,
						"currencySymbol": "USDT",
						"withdrawMax": 1000,
						"everydayWithdrawTimes": 30,
						"type": 2,
						"wiModelRe": 0,
						"wiModelRate": 0,
						"everydayWithdrawFree": 0,
						"withdrawalToday": 0,
						"withdrawalRateMin": 0,
						"wiModel": 0,
						"rate": "1",
						"withdrawMin": 10,
						"name": "USDT"
					  },
					  {
						"types": [
						  "Vodafone",
						  "Orange",
						  "Etisalat",
						  "We"
						],
						"img": "https://img.sgodown.cc/wallet.png",
						"withdrawalRateMax": 100000,
						"withdrawalRate": 8,
						"currencySymbol": "USDT",
						"withdrawMax": 10000,
						"everydayWithdrawTimes": 30,
						"type": 4,
						"wiModelRe": 0,
						"wiModelRate": 0,
						"everydayWithdrawFree": 0,
						"withdrawalToday": 0,
						"withdrawalRateMin": 0,
						"wiModel": 0,
						"rate": "1",
						"withdrawMin": 150,
						"name": "E-Wallet"
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
						password: this.formData.password,
						type : this.sectItem.type
					}
					this.$http.post('/player/withdrawal',para,(res=>{
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
				this.$http.get('/player/withdrawal_pre',res => {
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
					url:'./outrecord'
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
			height: 70upx;
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
