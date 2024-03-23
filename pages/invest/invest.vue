<template>
	<view class="invest">
		<view class="invest-tab">
			<view class="tab-bar" :class="tabIndex==1?'tab-active':''" @click="changeTab(1)">{{$t('invest.menu1.text')}}
			</view>
			<view class="tab-bar" :class="tabIndex==2?'tab-active':''" >{{$t('invest.menu2.text')}}
			</view>
			<view class="tab-bar" :class="tabIndex==3?'tab-active':''" @click="changeTab(3)">{{$t('invest.menu3.text')}}
			</view>
		</view>
		<view class="balance">
			<view class="title">
				{{$t('invest.balance.text')}}
				<uni-icons :type="isShow?'eye':'eye-slash'" color="#fff" :size="24"  @click="showBalance"></uni-icons>
			</view>
			<view class="money" v-if="isShow">${{user.balance}}USD</view>
			<view class="money" v-else>${{gethideNum(user.balance)}} **</view>
		</view>
		<view class="algorithm" v-if="tabIndex==1">
			<view class="algorithm-item" :class="type==0?'algorithm-active':''" @click="getData(0)">{{$t('invest.algorithm1.text')}}</view>
			<view class="algorithm-item" :class="type==1?'algorithm-active':''" @click="getData(1)">{{$t('invest.algorithm2.text')}}</view>
			<view class="algorithm-item" :class="type==2?'algorithm-active':''" @click="getData(2)">{{$t('invest.algorithm3.text')}}</view>
		</view>
		<view class="form" v-if="tabIndex==1">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" :label-width="300">
				<uni-forms-item :label="$t('invest.money.text')" name="money">
					<view class="form-item">
						<view class="left">
							<uni-easyinput type="text " prefixIcon="locked" v-model="formData.money " :placeholder="$t('invest.money.placehoder')" />
						</view>
						<view class="right" @click="showSelect =!showSelect">
							<image :src="selItem.headerImg" mode="scaleToFill"></image>
							<view class="playername">{{selItem.playerName}}</view>
							<uni-icons :type="showSelect?'up':'down'" color="#fff"></uni-icons>
						</view>
						<view class="choose" v-if="showSelect">
							<view class="choose-item" v-for="(item,index) in recordList" :key="index" @click="chooseItem(item)">
								<view class="row">
									<image :src="item.headerImg" mode="scaleToFill"></image>
									<view class="choose-name">{{item.playerName}}</view>
								</view>
								<view class="row">
									<view class="tips">{{$t('invest.days.text')}}:{{selItem.days}}</view>
									<view class="tips">{{$t('invest.rate.text')}}:{{selItem.rate_conf}}</view>
								</view>
							</view>
						</view>
						
					</view>
					<view class="form-tips">
						<view class="tips-left">{{$t('invest.days.text')}}:{{selItem.days}}</view>
						<view class="tips-right">{{$t('invest.rate.text')}}:{{selItem.rate_conf}}</view>
					</view>
				</uni-forms-item>
				<uni-forms-item :label="$t('security.update.fundpwd.label')" name="payPwd">
					<uni-easyinput type="password " prefixIcon="locked" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.invest.text')}}</button>
		</view>
		
		<view class="invest-history" v-if="tabIndex==1">
			<view class="left">{{$t('invest.history.text')}}</view>
			<view class="right" @click="showRecord">
			{{$t('invest.more.text')}} 
			<uni-icons type="right" color="rgb(185,185,185)" :size="20"></uni-icons>
			</view>
		</view>
		
		<view class="form" v-if="tabIndex==3">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" :label-width="300">
				<uni-forms-item :label="$t('invest.money.text')" name="money">
					<uni-easyinput type="text " prefixIcon="locked" v-model="formData.money "  />
				</uni-forms-item>
				<uni-forms-item :label="$t('security.update.fundpwd.label')" name="payPwd">
					<uni-easyinput type="password " prefixIcon="locked" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="submit">{{$t('btn.invest.text')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSelect:false,
				isShow:true,
				tabIndex:1,
				type:0,//投资类型:0.利差算法套利,1.高频占位套利,2.市场联动套利,
				user:{},
				formData:{
					planId:'',
					money :'',
					payPwd :''
				},
				rules: {
					 money: {
					 	rules: [
					 		{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('invest.money.text')})}
					 	]
					 },
					payPwd: {
						rules: [
							{required: true,errorMessage: this.$t('ruls.xxx.empty',{name:this.$t('security.update.fundpwd.label')})}
						]
					}
				},
				selItem:{},
				recordList:[
					// {
					// 	"id": 18,
					// 	"playerName": "AAA",
					// 	"headerImg": '../../static/images/invest/10004.png',
					// 	"days": 7,
					// 	"minMax": "投资额度范围",
					// 	"rate_conf": '3%-7%',
					// 	"type": '投资类型:0.利差算法套利,1.高频占位套利,2.市场联动套利',
					// },
					// {
					// 	"id": 19,
					// 	"playerName": "BBB",
					// 	"headerImg": '../../static/images/invest/10004.png',
					// 	"days": 7,
					// 	"minMax": "投资额度范围",
					// 	"rate_conf": '2%-6%',
					// 	"type": '投资类型:0.利差算法套利,1.高频占位套利,2.市场联动套利',
					// }
				]
			}
		},
		onLoad(){
			this.getUserinfo()
			this.loadData()
		},
		methods: {
			submit(){
				this.$refs.form.validate().then(res=>{
					const para = Object.assign({},this.formData)
					para.planId = this.selItem.id
					this.$http.post('/player/deposit',para,(res=>{
						if(res.code ==200){
							uni.showToast({
								title:this.$t('oper.tip.success.text'),
								icon:'none',
								success() {
									setTimeout(()=>{
										window.location.reload()
									},2000)
								}
							})
						}
					}))
				}).catch(err =>{
					console.log( err);
				})
			},
			loadData(){
				// this.recordList = []
				let para = {
					type:this.type
				}
				this.$http.post('/player/deposit/plans',para,res=>{
					console.log(res)
					if(res.code == 200){
						//this.recordList = res.data
						this.selItem = this.recordList[0] || {}
					}
				})
			},
			getData(type){
				this.type = type
				this.loadData()
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
				this.loadData()
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
				this.showSelect = false
			},
			showRecord(){
				uni.navigateTo({
					url:'./record'
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
		justify-content: space-around;
		align-items: center;
		color: #fff;
		font-size: 26upx;
		.algorithm-item{
			width: 33%;
			height: 90upx;
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
		margin-top: 30upx;
		width: 670upx;
		::v-deep .uni-forms-item__label{
			color: #fff;
		}
		::v-deep .uni-easyinput__content{
			background-color: rgb(24, 24, 34)!important;
			border-color: rgb(24, 24, 34)!important;
			color: rgb(255,255,255)!important;
		}
		::v-deep .uni-icons{
			color: $fontColor!important;
		}
		.form-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			background-color: rgb(24, 24, 34)!important;
			.left{
				width: 550upx;
			}
			.right{
				display: flex;
				width: 200upx;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				image{
					width: 60upx;
					height: 60upx;
				}
			}
			.choose{
				background-color: rgb(24, 24, 34)!important;
				width: 670upx;
				position: absolute;
				top: 80upx;
				z-index: 99;
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
			margin-top: 10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24upx;
			color: rgb(185,185,185);
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
		}
		.right{
			display: flex;
			align-items: center;
		}
	}
	
}
</style>
