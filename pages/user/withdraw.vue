<template>
	<view class="withdraw">
		<uni-nav-bar left-icon="left"  :title="$t('property.subpage.title2')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="title">
			<view class="left">
				{{$t('withdraw.payway.title')}}
			</view>
			<view class="right" @click="goAddress">
				<image src="../../static/images/user/edit.webp" mode="scaleToFill"></image>
				<view class="address">{{$t('withdraw.payway.address.text')}}</view>
			</view>
		</view>
		
		<view class="payways" v-if="usdts.length > 0">
			 <view class="way-item" v-for="(item,index) in payways" :key="index" @click="chooseItem(item,index)">
			 	<image :src="item.img" mode="scaleToFill"></image>
			 	<view class="way-item-text">{{item.currencySymbol}}</view>
				<view class="active" v-if="selIndex == index"></view>
			 </view>
			 
		</view>
		<view v-else class="payways">
			<view class="way-item" @click="openPopup"> 
				<image src="../../static/images/user/coin.webp" mode="scaleToFill"></image>
				<view class="way-item-text">{{$t('withdraw.noway.cidadd.text')}}</view>
			</view>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top">
				<uni-forms-item :label="$t('withdraw.usdt.text')" name="usdtId" v-if="usdts.length > 0">
					<view class="choose-usdt-box">
						<view class="choose-usdt-item" @click="usdtShow=!usdtShow">
							<view class="left">
								<image :src="usdtItem.img" mode="scaleToFill"></image>
								<view>{{usdtItem.addr}}</view>
							</view>
							<uni-icons :type="usdtShow?'up':'down'" color="#fff" size="22"></uni-icons>
						</view>
						<view class="choose-usdt-select" v-show="usdtShow">
							<view class="choose-usdt-item" v-for="(item,index) in usdts" :key="index" @click.stop="chooseUsdt(item)">
								<image :src="item.img" mode="scaleToFill"></image>
								<view>{{item.addr}}</view>
							</view>
						</view>
					</view>
				</uni-forms-item>
				
				<uni-forms-item :label="$t('withdraw.money.text')" name="money">
					<uni-easyinput type="number" v-model="formData.money" :placeholder="$t('ruls.xxx.please',{name:$t('withdraw.money.text')})" >
						<template #right>
							<view class="all-btn" @click="chooseAll">{{$t('backapi.self.safe.bill.data.choose.type.all.text')}}</view>
						</template>
					</uni-easyinput>
				</uni-forms-item>
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
				<uni-forms-item :label="$t('withdraw.password.text')" name="payPwd">
					<uni-easyinput type="password" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('withdraw.password.text')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.continue.text')}}</button>
		</view>
		<view class="tip_mod_container">
		    <view class="tip_mod">
		        <view class="tip_title">{{ $t("recharge.tip.title.text") }}</view>
		        <view class="tip_item">
		            1、{{ $t('withdraw.desc.list1') }} {{ sectItem.everydayWithdrawFree }}
		        </view>
		        <view class="tip_item">
		            2、{{ $t('withdraw.desc.list2') }} {{ sectItem.everydayWithdrawTimes }}
		        </view>
		        <view class="tip_item">
		            3、{{ $t('withdraw.desc.list3') }} {{ sectItem.withdrawalRate }}%
		        </view>
		        <view class="tip_item">
		            4、{{ $t('withdraw.desc.list4') }} {{ sectItem.withdrawMax }},{{ $t('withdraw.desc.list5') }} {{sectItem.withdrawMin }}
		        </view>
		        <view class="tip_item">
		            5、{{ $t('withdraw.desc.list6') }} {{ sectItem.withdrawalToday }}
		        </view>
		        <view class="tip_item">
		            6、{{ $t('withdraw.desc.list7') }} {{ sectItem.withdrawalRateMin }},{{ $t('withdraw.desc.list8') }}
		            {{sectItem.withdrawalRateMax }}
		        </view>
		        <view class="tip_item">
		            7、{{ $t('withdraw.desc.list9') }} {{ sectItem.usdtWithdrawPer }}
		        </view>
		    </view>
		</view>
		<uni-popup ref="popup" type="bottom" backgroundColor="#081f1f" border-radius="40upx,40upx,0upx,0upx" :mask-click="false">
			<view class="add-form">
				<view class="add-form-title">
					<view class="left">{{$t('withdraw.payway.addressAdd.text')}}</view>
					<view class="right" @click="closePopup">
						<image src="../../static/images/user/close.webp" mode="scaleToFill"></image>
					</view>
				</view>
				<uni-forms ref="addForm" :modelValue="addFormData" :rules="addRules" label-position="top" :label-width="300">
					<uni-forms-item name="addr">
						<uni-easyinput type="text " prefixIcon="wallet" v-model="addFormData.addr" :placeholder="$t('backapi.self.whitdraw.type.ewallet.form.wallet.addr.text')" />
					</uni-forms-item>
					<uni-forms-item name="payPwd">
						<uni-easyinput type="password" prefixIcon="locked" v-model="addFormData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
					</uni-forms-item>
					<uni-forms-item name="code">
						<uni-easyinput type="text" v-model="addFormData.code" :placeholder="$t('ruls.xxx.please',{name:$t('register.code.text')})" >
							<template #right>
									<view v-if="!isSendCode" @click="sendCode" class="sendCode">{{$t('register.sendCode.text')}}</view>
									<view v-else class="sendCode"> {{countTime}} s</view>
								</template>
						</uni-easyinput>
					</uni-forms-item>
				</uni-forms>
				<button class="btn" @click="submitAdd">{{$t('btn.save.text')}}</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { divide100 } from '../../utils/util'
	export default {
		data() {
			return {
				isShow: false,
				selIndex:0,
				formData:{
					money:0,
					type:'',
					payPwd:''
				},
				rules: {
					money: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('recharge.money.text')})}
						]
					},
					payPwd: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('withdraw.password.text')})}
						]
					}
				},
				addFormData:{
					type:'usdt',
					subType:'1',
					addr:'',
					payPwd:'',
					code:''
				},
				addRules: {
					addr: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('backapi.self.whitdraw.type.ewallet.form.wallet.addr.text')})}
						]
					},
					payPwd: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('security.update.fundpwd.label')})}
						]
					},
					code: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('register.code.text')})}
						]
					}
				},
				isSendCode:false,
				countTime:60,
				payways:[],
				sectItem:{},
				usdts:[
					{
					 img: "../../static/images/user/coin.webp",
					 addr : "asfadwerw23423423sdfsdfs",
					},
					{
					 img: "../../static/images/user/coin.webp",
					 addr : "aseeeeeeeeeeeeeesdfsdfs",
					}
				],
				usdtItem:{},
				usdtShow:false,
				actualMount:0,
				user:{}
			}
		},
		onLoad() {
			this.getUserinfo()
			this.loadPayWays()
			this.sectItem = this.payways[0] || {}
			this.getUsdtList()
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
			chooseAll(){
				this.formData.money = divide100(this.user.balance)
			},
			chooseUsdt(item){
				this.usdtItem = item
				this.usdtShow = false
			},
			chooseItem(item,index){
				this.selIndex = index
				this.sectItem = item
				if(item.currencySymbol == 'USDT'){
					this.getUsdtList()
				}
			},
			getUsdtList(){
				this.$http.post('/player/virtual_currency_list',{},res=>{
					this.usdts = res.data
					this.usdtItem = this.usdts[0] || {}
				})
			},
			submitAdd(){
				this.$refs.addForm.validate().then(res=>{
					const para = Object.assign({},this.addFormData)
					this.$http.post('/player/virtual_currency_add',para,(res=>{
						if(res.code ==200){
							this.getUsdtList()
							this.closePopup()
							 uni.showToast({
							 	title:this.$t('oper.tip.success.text'),
								icon:'success'
							 })
						}
					}))
				}).catch(err =>{
					console.log(err);
				})
			},
			submit(){
				if(!this.usdtItem.id){
					this.openPopup()
					return
				}
				this.$refs.form.validate().then(res=>{
					const para = {
						money : this.formData.money,
						payPwd: this.formData.payPwd,
						usdtId:this.usdtItem.id,
						type : this.sectItem.type
					}
					this.$http.post('/player/withdrawal',para,(res=>{
						if(res.code ==200){
							this.formData.money = 0
							this.formData.payPwd = ''
							uni.showToast({
								title:this.$t('oper.tip.success.text'),
								icon:'success'
							})
						}
					}))
				}).catch(err =>{
					console.log(err);
				})
			},
			loadPayWays(){
				this.$http.get('/player/withdrawal_pre',res => {
					if(res.code==200){
						this.payways = res.data
					}
					this.sectItem = this.payways[0] || {}
				})
			},
			changeWay(item){
				this.sectItem = item
				this.isShow = ! this.isShow
			},
			goAddress(){
				uni.navigateTo({
					url:'./addressManage'
				})
			},
			goRecord(){
				uni.navigateTo({
					url:'./outrecord'
				})
			},
			goBack(){
				uni.reLaunch({
					url:'./user'
				})
			},
			openPopup(){
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			},
			sendCode(){ 
				this.$http.get('/player/mail/code',(res)=>{
					if(res.code == 200){
						uni.showToast({
							title:this.$t('register.sendCode.success'),
							duration:2000
						})
						this.isSendCode = true
						this.startCount()
					}
				})
			},
			startCount(){
				if(this.countTime <= 0){
					this.countTime = 60
					this.isSendCode = false
				}else{
					this.countTime--
					setTimeout(this.startCount,1000)
				}
			},
			getUserinfo(){
				this.$http.get('/player/player_info',res =>{
					if(res.code == 200){
						this.user = res.data
						uni.setStorageSync('user',res.data)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.withdraw{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.title{
		color: #fff;
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;
		.left{
			font-size: 26upx;
		}
		.right{
			display: flex;
			align-items: center;
			font-size: 24upx;
			image{
				width: 46upx;
				height: 46upx;
			}
		}
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
		::v-deep .uni-forms-item__label{
			width: 300upx!important;
		}
		.all-btn{
			width: 100upx;
			height: 42upx;
			background-color: $fontColor;
			color: #fff;
			font-size: 26upx;
			text-align: center;
			line-height: 42upx;
			border-radius: 10upx;
			margin-right: 20upx;
			text-transform: capitalize;
		}
		.choose-usdt-box{
			position: relative;
			background-color: rgb(41,41,55);
			.choose-usdt-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10upx 20upx;
				.left{
					display: flex;
					align-items: center;
					color: #fff;
					max-width: 580upx;
					overflow: hidden;
					image{
						width: 60upx;
						height: 60upx;
						margin-right: 20upx;
					}
				}
			}
			.choose-usdt-select{
				position: absolute;
				background-color: rgb(41,41,55);
				z-index: 99;
				width: 670upx;
				.choose-usdt-item{
					display: flex;
					align-items: center;
					color: #fff;
					image{
						width: 60upx;
						height: 60upx;
					}
				}
			}
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
	.add-form{
		padding: 40upx;
		.add-form-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 60upx;
			.left{
				font-size: 32upx;
				font-weight: 500;
				color: #fff;
			}
			.right{
				width: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 48upx;
					height: 48upx;
				}
			}
		}
		.sendCode{
			color: $fontColor;
			margin-right: 20upx;
		}
		.btn{
			background-color: $fontColor;
			color: #fff;
		}
		::v-deep .uni-forms-item__label{
			color: #fff;
		}
		::v-deep .uni-easyinput__content{
			background-color: #0e3636!important;
			border-color: #0e3636!important;
			color: rgb(255,255,255)!important;
			height: 100upx;
		}
		::v-deep .uni-forms-item__label{
			display: none;
		}
	}
	.tip_mod_container{
		margin-top: 40upx;
		width: 670upx;
		background-color: rgb(41,41,55);
		border-radius: 10upx;
		.tip_mod {
		    min-height: 300rpx;
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
}
</style>
