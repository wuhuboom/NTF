<template>
	<view class="invest-detail">
		<uni-nav-bar left-icon="left"  :title="$t('invest.detail.page.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="content">
			 <view class="top">
				 <img src="../../static/images/user/10019.png"/>
			 </view>
			 
			 <view class="detail">
				 <view class="title">{{detail.cid}}</view>
				 <view class="sub-title">
					 <view class="left">{{$t('invest.detail.nian.text')}} <text></text> </view>
					<view class="right">{{$t('invest.detail.rate.text')}} <text></text> </view>
				 </view>
				 <view class="dtqx">
					 <view class="tilte">
						 {{$t('invest.detail.qixian.text')}}
					 </view>
					 <view class="day" :class="index==dayIndex?'active':''" v-for="(item,index) in detail.rateConfig" :key="index" @click="chooseDay(item,index)">
						 {{item.days}}
					 </view>
				 </view>
				 <view class="form">
					 <uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" :label-width="300">
					 	<uni-forms-item :label="$t('invest.detail.num.text')" name="money">
					 		<view class="form-item">
					 			<view class="left">
					 				<uni-easyinput type="text" v-model="formData.money " :placeholder="$t('invest.detail.enternum.text')" />
					 			</view>
					 			<view class="right">
					 				<view class="playername">{{detail.cid}}</view>
					 				<view class="max" @click="">{{$t('invest.detail.enter.max.text')}}</view>
					 			</view>
					 		</view>
					 		<view class="form-tips">
					 			<view class="tips-left">{{$t('invest.detail.enable.text')}}</view>
					 		</view>
							<view class="form-tips">
								<view class="tips-left">
									<view></view>
									<view>{{$t('invest.detail.dt.num.text')}}</view>
								</view>
								<view class="tips-right">
									<view></view>
									<view>{{$t('invest.detail.dt.edu.text')}}</view>
								</view>
							</view>
					 	</uni-forms-item>
					 	<uni-forms-item :label="$t('security.update.fundpwd.label')" name="payPwd">
					 		<uni-easyinput type="password " prefixIcon="locked" v-model="formData.payPwd" :placeholder="$t('ruls.xxx.please',{name:$t('security.update.fundpwd.label')})" />
					 	</uni-forms-item>
					 </uni-forms>
					 <button class="btn" @click="submit">{{$t('btn.join.text')}}</button>
				 </view>
			 </view>
			 <!--定投详情-->
			 <view class="title">{{$t('invest.detail.page.text')}}</view>
			 
			 <!--规则-->
			  <view class="title">{{$t('invest.detail.dt.rule.text')}}</view>
			  
			  <!--介绍-->
			   <view class="title">{{$t('invest.detail.dt.info.text')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{
					id: 3,
					cid: '关联货币ID',
					name: '项目名称',
					imgUrl: '图标',
					incomeType: 0, //结算方式 0.每日结算 1.到期结算,
					periodical: 1,//是否定期 0否 1是,
					currency: {
						id: 1,
						name: "货币名称",
						imgUrl: "货币图标",
					},
					rateConfig: [{days:'投资天数',rate:'日利率',min:'起投',max:'止投'}]
				},
				dayIndex:0,
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
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				this.$http.post('/player/invest/plans',{},res => {
					if(res.code == 200){
						 
					}
				})
			},
			goRecord(){
				uni.navigateTo({
					url:''
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
.invest-detail{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
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
}
</style>
