<template>
	<view class="invoice">
		<uni-nav-bar left-icon="left"  :title="$t('user.trade.title4.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="menu">
			<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="goSubPage(item)">
				<view class="left">
					<image :src="item.icon"></image>
					<view class="menu-text">{{item.title}}</view>
				</view>
				<!-- <view class="right">
					<view v-if="item.type==1" class="logo">
						<img :src="lang.icon"/>
						<view class="title">{{lang.name}}</view>
					</view>
					<uni-icons type="right" color="rgb(185,185,185)"></uni-icons>
				</view> -->
			</view>
		</view>
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus:[
					{title:this.$t('invoice.menu1.text'),icon:'../../static/images/user/invoice1.png',path:'./inrecord'},
					{title:this.$t('invoice.menu2.text'),icon:'../../static/images/user/invoice2.png',path:'./outrecord'},
					{title:this.$t('invoice.menu3.text'),icon:'../../static/images/user/invoice3.png',path:'./balanceRecord'},
					{title:this.$t('invoice.menu4.text'),icon:'../../static/images/user/invoice4.png',path:'/pages/invest/record'}
				],
				 
			}
		},
		onLoad() {
			
		},
		methods: {
			
			goSubPage(item){
				uni.navigateTo({
					url:item.path
				})
			},
			
			goBack(){
				uni.switchTab({
					url:'/pages/user/user'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.invoice{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.menu{
		color: rgb(185,185,185);
		margin-top: 80upx;
		.menu-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 76upx;
			background-color: #17171F;
			border-radius: 10upx;
			margin-top: 10upx;
			margin-bottom: 20upx;
			padding-left: 20upx;
			.left{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.menu-text{
					margin-left: 20upx;
					font-size: 24upx;
					text-transform: lowercase;
				}
				image{
					width: 48upx;
					height: 48upx;
				}
			}
			.right{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.logo{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					img{
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}
					.title{
						margin-right:20upx;
						margin-left: 20upx;
						font-size: 24upx;
					}
				}
			}
		}
	}
	.logout{
		background-color: $fontColor;
		color: #fff;
		font-size: 28upx;
		text-align: center;
		width: 670upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20upx;
		position: absolute;
		bottom: 100upx;
	}
	.popup-form{
		width: 600upx!important;
		padding: 40upx;
		border-radius: 20upx;
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
		.popup-tip{
			color: $fontColor;
			text-align: center;
			font-size: 40upx;
			margin-bottom: 80upx;
		}
		.prop-btn{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 600upx;
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
