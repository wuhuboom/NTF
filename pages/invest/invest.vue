<template>
	<view class="invest">
		<uni-nav-bar left-icon="left" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>

		<view class="balance">
			<view class="title">
				{{$t('invest.balance.text')}}
				<uni-icons :type="isShow?'eye':'eye-slash'" color="#fff" :size="24"  @click="showBalance"></uni-icons>
			</view>
			<view class="money" v-if="isShow">${{divide(user.balance)}}USDT</view>
			<view class="money" v-else>${{gethideNum(divide(user.balance))}} **</view>
		</view>
		<!-- <view class="algorithm" v-if="tabIndex==1">
			<view class="algorithm-item" :class="type==0?'algorithm-active':''" >{{$t('invest.algorithm1.text')}}</view>
			 <view class="algorithm-item" :class="type==1?'algorithm-active':''" @click="getData(1)">{{$t('invest.algorithm2.text')}}</view>
			<view class="algorithm-item" :class="type==2?'algorithm-active':''" @click="getData(2)">{{$t('invest.algorithm3.text')}}</view> 
		</view> -->
		<view class="form" v-if="tabIndex==1">
			<view class="rate-box">
				<view class="rate-item" :class="selItem.days==item.days?'active':''" v-for="(item,index) in project.rateConfig" :key="index" @click="chooseItem(item)">
					{{item.rate}}%
				</view>
			</view>
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" :label-width="300">
				<uni-forms-item  name="money">
					<view class="form-title">
						<view class="form-label">{{$t('invest.money.text')}}</view>
						<view class="form-earning">{{$t('invest.earnings.text')}}: <text style="color: #00cece;margin-left: 10upx;">{{earnings}}</text></view>
					</view>
					<view class="form-item">
						<uni-easyinput type="text" prefixIcon="wallet" v-model="formData.money " :placeholder="$t('invest.money.placehoder',{min:selItem.min})" >
							<template #right>
								<view class="playername">{{selItem.days}} {{$t('market.day.unit')}}</view>
							</template>
						</uni-easyinput>
					</view>
				</uni-forms-item>
				<view class="form-tips">
					<view class="tips-radio">
						<view class="radio" :class="formData.autoInvest==1?'active':''" @click="choseIncomeType"></view>
						<view class="radio-text">{{$t('invest.return,type1')}}</view>
					</view>
				</view>
				<uni-forms-item name="payPwd">
					<view class="form-title">
						<view class="form-label">{{$t('security.update.fundpwd.label')}}</view>
					</view>
					<uni-easyinput type="password" prefixIcon="locked" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.invest.text')}}</button>
		</view>
		
		<!-- <view class="invest-history" v-if="tabIndex==1">
			<view class="left">{{$t('invest.history.text')}}</view>
			<view class="right" @click="showRecord">
			{{$t('invest.more.text')}} 
			<uni-icons type="right" color="rgb(185,185,185)" :size="20"></uni-icons>
			</view>
		</view> -->
		
		<view class="form" v-if="tabIndex==3">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" :label-width="300">
				<uni-forms-item :label="$t('invest.money.text')" name="money">
					<uni-easyinput type="text " prefixIcon="wallet" v-model="formData.money"  />
				</uni-forms-item>
				<uni-forms-item :label="$t('security.update.fundpwd.label')" name="payPwd">
					<uni-easyinput type="password" prefixIcon="locked" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.invest.text')}}</button>
		</view>
		<view class="record-list" v-if="tabIndex==1">
			 <view class="record-item" v-for="(item,index) in records" :key="index">
				 <view class="record-item-head">
					 <view class="left">
						 <view class="top">{{$t('invest.record.table.col3.text')}}</view>
						 <view class="down">{{getType(item.planType)}}</view>
					 </view>
					 <view class="right" v-if="item.status==0">
						 <view class="cal-btn" @click="calInvest(item)">{{$t('btn.caancle.text')}}</view>
					 </view>
				 </view>
				 <view class="record-item-content">
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col5.text')}}</view>
						 <view class="right" :style="{'color':item.status ==0?'#05ff00':item.status=='1'?'#ff0000':'#8B8989'}">{{getType2(item.status)}}</view>
					 </view>
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col1.text')}}</view>
						 <view class="right">{{divide(item.money)}}</view>
					 </view>
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col4.text')}}</view>
						 <view class="right"><text>{{count(item)}}</text></view>
					 </view>
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col6.text')}}</view>
						 <view class="right">{{item.rate}}%</view>
					 </view>
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col7.text')}}</view>
						 <view class="right">{{item.orderNo}}</view>
					 </view>
					 <view class="row">
						 <view class="left">{{$t('invest.record.table.col2.text')}}</view>
						 <view class="right">{{formatDate(item.finishTime)}}</view>
					 </view>
				 </view>
			 </view>
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#181822" borderRadius="10px,10px,0px,0px" :is-mask-click="false">
			<view class="popup-form">
				<uni-forms ref="calForm" :modelValue="calFormData" :rules="calRules" label-position="top" :label-width="300">
					<uni-forms-item :label="$t('security.update.fundpwd.label')" name="payPwd">
						<uni-easyinput type="password" prefixIcon="locked" v-model="calFormData.payPwd " :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
					</uni-forms-item>
				</uni-forms>
				<view class="prop-btn">
					<button class="cancle-btn btn" @click="closeProp">{{$t('btn.caancle.text')}}</button>
					<button class="sub-btn btn" @click="submitCal">{{$t('btn.continue.text')}}</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="calPopup" type="center" background-color="#181822" borderRadius="20px,20px,20px,20px" :is-mask-click="false">
			<view class="popup-tips">
				 <view class="popup-info">
					 <view class="popup-title">{{$t('invest.caldialog.title')}}</view>
					 <view class="popup-content">{{$t('invest.caldialog.content')}}</view>
				 </view>
				<view class="prop-btn">
					<button class="cancle-btn btn" @click="closeCalPopup">{{$t('btn.caancle.text')}}</button>
					<button class="sub-btn btn" @click="openPopup">{{$t('btn.continue.text')}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {divide100,formatDate} from '@/utils/util.js'
	export default {
		data() {
			return {
				divide:divide100,
				formatDate:formatDate,
				showSelect:false,
				isShow:true,
				tabIndex:1,
				type:0,//投资类型:0.利差算法套利,1.高频占位套利,2.市场联动套利,
				user:{},
				formData:{
					planId:'',
					money:'',
					days :'',
					payPwd:'',
					autoInvest:0
				},
				rules: {
					 money: {
					 	rules: [
					 		{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('invest.money.text')})},
							{
								validateFunction:(rule,value,data,callback)=>{
									if (value < this.selItem.min) {
										callback(this.$t('invest.check.minmoney.error',{min:this.selItem.min}))
									}
									return true
								}
							}
					 	]
					 },
					payPwd: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('security.update.fundpwd.label')})}
						]
					}
				},
				selItem:{},
				records:[],
				search:{
					status:'',// 0未结束 1已结束
					// type:'1',//0定投 1托管
					pageNo:1,
					pageSize:10
				},
				typeOptions: [
				    {
				        label: this.$t("invest.menu4.text"),
				        value: 0
				    },
				    {
				        label: this.$t("invest.menu1.text"),
				        value: 1
				    }
				],
				typeOptions2: [
				    {
				        label: this.$t("invest.record.status0.text"),
				        value: 0
				    },
				    {
				        label: this.$t("invest.record.status1.text"),
				        value: 1
				    },
					{
					    label: this.$t("invest.record.status2.text"),
					    value: 2
					}
				],
				usdtBalance:{},
				calFormData:{
					payPwd:'',
					id:''
				},
				calRules: {
					payPwd: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('security.update.fundpwd.label')})}
						]
					}
				},
				project:{},
				earnings:0
			}
		},
		watch:{
			'formData.money':function(val){
				if(val > 0){
					this.earnings =  (val * this.selItem.rate / 10000).toFixed(2)
				}else{
					this.earnings =  0;
				}
			}
		},
		onLoad(option) {
			this.formData.planId = option.id
			this.getUserinfo()
			// this.loadData()
			// this.loadRecord()
			this.loadMarkets()
			// this.getUserBalance()
		},
		onShow(){
			
		},
		methods: {
			choseIncomeType(){
				this.formData.autoInvest = this.formData.autoInvest == 0 ? 1 : 0
			},
			loadMarkets(){
				this.$http.post('/player/invest/plans',{},res=>{
					if(res.code == 200){
						let datas = res.data || []
						this.project = datas.find(item=>item.id==this.formData.planId)
						this.project.rateConfig = JSON.parse(this.project.rateConfig) || []
						if(this.project.rateConfig.length > 0){
							this.selItem = this.project.rateConfig[0]
						}
					}
				})
			},
			submit(){
				this.$refs.form.validate().then(res=>{
					const para = Object.assign({},this.formData)
					para.days = this.selItem.days
					this.$http.post('/player/invest',para,(res=>{
						if(res.code ==200){
							// this.formData.planId = ''
							this.formData.money = ''
							this.formData.payPwd = ''
							this.formData.days = ''
							// this.loadData()
							this.records = []
							// this.loadRecord()
							// this.getUserBalance()
							uni.showToast({
								title:this.$t('oper.tip.success.text'),
								icon:'success',
							})
						}
					}))
				}).catch(err =>{
					console.log( err);
				})
			},
			loadData(){
				this.recordList = []
				let para = {
					type:this.type
				}
				this.$http.post('/player/deposit/plans',para,res=>{
					if(res.code == 200){
						this.recordList = res.data
						this.selItem = this.recordList[0] || {}
					}
				})
			},
			getData(type){
				this.type = type
				// this.loadData()
			},
			calInvest(item){
				this.calFormData.id = item.id
				this.$refs.calPopup.open()
			},
			getUserBalance(){
				this.$http.get('/player/currency/list',res=>{
					let datas = res.data.list || []
					this.usdtBalance = datas.find(item => item.currency.name=='USDT') || {}
				})
			},
			getUserinfo(){
				this.$http.get('/player/player_info',res =>{
					if(res.code == 200){
						this.user = res.data
						uni.setStorageSync('user',res.data)
					}else{
						uni.showToast({
							type:'error',
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			changeTab(index) {
				this.tabIndex = index
				// this.loadData()
				if(index==1){
					this.records = []
					// this.loadRecord()
				}
			},
			showBalance(){
				this.isShow = !this.isShow
			},
			gethideNum(num){
				let val = "*"
				for(var i = 0;i<num.length ;i++){
					val +'*'
				}
				return val
			},
			chooseItem(item){
				this.selItem = item
				// this.showSelect = false
			},
			showRecord(){
				uni.navigateTo({
					url:'./record?id='+this.formData.planId
				})
			},
			loadRecord(){
				this.records=[]
				this.$http.post("/player/invest/my",this.search,res => {
					this.records = [...this.records,...res.data.results]
				})
			},
			count(item){
				let rate = item.rate
				if(rate.toString().indexOf('-')>-1){
					rate = rate.split('-')[1]
				}
				return (item.money * rate / 10000).toFixed(2)
			},
			getType(value) {
			   let res = this.typeOptions.find(item => item.value === value) || {}
			   // return res.label;
			   return this.typeOptions[0].label
			},
			getType2(value) {
				let res = this.typeOptions2.find(item => item.value == value)
				return res.label;
			},
			submitCal(){
				this.$refs.calForm.validate().then(res=>{
					const para = Object.assign({},this.calFormData)
					this.$http.post('/player/invest/my/stop',para,(res=>{
						if(res.code ==200){
							this.search.pageNo = 1
							this.totalPage = 1
							this.records = []
							this.loadRecord()
							this.closeProp()
							uni.showToast({
								title:this.$t('oper.tip.success.text'),
								icon:'success'
							})
						}
					}))
				}).catch(err =>{
					console.log( err);
				})
			},
			closeCalPopup(){
				this.$refs.calPopup.close()
			},
			openPopup(){
				this.$refs.calPopup.close()
				this.$refs.popup.open()
			},
			closeProp(){
				this.calFormData.id= ''
				this.calFormData.payPwd = ''
				this.$refs.popup.close()
			},
			goBack(){
				 uni.navigateTo({
				 	url:'/pages/invest/marketDetail?id=' + this.formData.planId
				 })
			}
		}
	}
</script>

<style scoped lang="scss">
.invest{
	width: 670upx;
	padding: 40upx;
	min-height: 100vh;
	background-image: url('../../static/images/home/10046.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.invest-tab {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: rgb(183, 186, 188);
 		.tab-bar {
			width: 33%;
			height: 100upx;
			text-align: center;
			font-size: 32upx;
			margin-top: 40upx;
	
		}
		.tab-active {
			line-height: 40upx;
			color: #fff;
			font-size: 42upx;
			font-weight: 600;
			background-image: url('../../static/images/home/10049.png');
			background-size: 100% 100%;
		}
	}
	.balance{
		width: 100%;
		height: 150upx;
		background-image: url('../../static/images/invest/10002.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-top: 20upx;
		color: #fff;
		font-size: 32upx;
		font-weight: 600;
		.title{
			margin-left: 60upx;
			display: flex;
			align-items: center;
		}
		.money{
			margin-right: 60upx;
		}
	}
	.algorithm{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #fff;
		font-size: 26upx;
		.algorithm-item{
			// width: 33%;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			border-bottom: 4upx solid #fff;
			padding-bottom: 10upx;
		}
		.algorithm-active{
			color: $fontColor;
			border-bottom: 4upx solid $fontColor;
		}
	}
	.form{
		margin-top: -30upx;
		width: 670upx;
		::v-deep .uni-forms-item__label{
			color: #fff;
			display: none;
		}
		::v-deep .uni-easyinput__content{
			background-color: rgb(24, 24, 34)!important;
			border-color: rgb(24, 24, 34)!important;
			color: rgb(255,255,255)!important;
		}
		::v-deep .uni-icons{
			color: $fontColor!important;
		}
		.rate-box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			margin-bottom: 40upx;
			.rate-item{
				width: 120upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 4px;
				background-color: #17171f;
				color: #fff;
				margin-left: 16upx;
				margin-top: 16upx;
			}
			.active{
				background-color: #00d4d4;
				color:#343434
			}
		}
		.form-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			height: 72upx;
			line-height: 72upx;
			margin-bottom: 20upx;
			.form-label{
				text-transform: capitalize;
				font-size: 30upx;
				font-weight: 500;
			}
			.form-earning{
				font-size: 24upx;
				color: rgb(185,185,185);
			}
		}
		.form-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			background-color: rgb(24, 24, 34)!important;
			.playername{
				 font-size: 26upx;
				  letter-spacing: -0.12px;
				  color: #00cece;
				  margin-right: 20upx;
			}
			.choose{
				background-color: rgb(24, 24, 34)!important;
				width: 670upx;
				position: absolute;
				top: 80upx;
				z-index: 99;
				height: 400upx;
				overflow: auto;
				.choose-item{
					color: #fff;
					padding: 20upx;
					border-bottom: 1upx solid rgb(1,2,3);
					.row{
						display: flex;
						width: 630upx;
						justify-content: space-between;
						align-items: center;
						image{
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
						.tips{
							font-size: 24upx;
							color: rgb(185,185,185);
						}
					}
				}
			}
			
		}
		.form-tips{
			margin-top: 20upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 24upx;
			color: rgb(185,185,185);
			.tips-radio{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.radio{
					width: 28upx;
					height: 28upx;
					border-radius: 50%;
					border: 1px solid #fff;
					margin-right: 20upx;
				}
				.active{
					background-image: url('../../static/images/invest/check.webp');
					background-size: 100% 100%;
					border:1px solid #00cece;
				}
			}
		}
		.btn{
			background-color: $fontColor;
			color: #fff;
		}
		.sendCode{
			color: $fontColor;
			padding-right: 30upx;
		}
		.cancelBtn{
			margin-top: 40upx;
			color: $fontColor;
			text-align: center;
		}
	}
	.invest-history{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		margin-top: 20upx;
		.left{
			font-size: 32upx;
			font-weight: 600;
			text-transform: capitalize;
		}
		.right{
			display: flex;
			align-items: center;
		}
	}
	.record-list{
		 .record-item{
			 margin-top: 20upx;
			 color: #fff;
			 padding: 40upx;
			 background-color: #181822;
			 .record-item-head{
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 .left{
					 display: flex;
					 flex-direction: column;
					 align-items: center;
					 .top{
						 font-size: 32upx;
						 font-weight: 600;
					 }
					 .down{
						 color: $fontColor;
						 font-size: 28upx;
						 margin-top: 10upx;
					 }
				 }
				.right{
					width: 150upx;
					height: 60upx;
					line-height: 60upx;
					background-color: $fontColor;
					border-radius: 16upx;
					text-align: center;
				}
			 }
			 .record-item-content{
				 margin-top: 20upx;
				 .row{
					 display: flex;
					 justify-content: space-between;
					 align-items: center;
					 font-size: 28upx;
					 .right{
						 text{
							 color:#05ff00
						 }
					 }
				 }
			 }
		 }
	}	 
	.popup-form{
		width: 670upx;
		padding: 40upx;
		margin-bottom: 100upx;
		::v-deep .uni-forms-item__label{
			color: #fff;
		}
		::v-deep .uni-easyinput__content{
			background-color: rgb(40, 44, 52)!important;
			border-color: rgb(40, 44, 52)!important;
			color: rgb(255,255,255)!important;
		}
		::v-deep .uni-icons{
			color: $fontColor!important;
		}
		.prop-btn{
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn{
				width: 40%;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				font-size: 28upx;
			}
			.cancle-btn{
				border: 1px solid $fontColor;
				background-color: transparent;
				color: #fff;
			}
			.sub-btn{
				background-color: $fontColor;
				color: #fff;
			}
		}
		 
	}
	.popup-tips{
		width: 600upx;
		padding: 40upx;
		.popup-info{
			display: flex;
			flex-direction: column;
			align-items: center;
			color:#fff;
			.popup-title{
				  font-size: 34upx;
				  font-weight: 600;
				  line-height: 1.53;
				  color: rgba(255, 255, 255, 0.9);
				  margin-bottom: 40upx;
			}
			.popup-content{
				font-size: 32upx;
				  line-height: 1.5;
				  color: rgba(255, 255, 255, 0.65);
			}
		}
		.prop-btn{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 40upx;
			.btn{
				width: 40%;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				font-size: 28upx;
			}
			.cancle-btn{
				border: 1px solid $fontColor;
				background-color: transparent;
				color: #fff;
			}
			.sub-btn{
				background-color: $fontColor;
				color: #fff;
			}
		}
	}
}
</style>
