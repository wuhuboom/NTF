<template>
	<view class="property">
		<uni-nav-bar left-icon="left"  :title="$t('property.navbar.title')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		
		<view class="top">
			<view class="header">
				<view class="title">{{$t('property.header.title')}}</view>
				<uni-icons :type="isShow?'eye':'eye-slash'" color="#fff" :size="24"></uni-icons>
			</view>
			<view class="balance">$000</view>
		</view>
		
		<view class="sub-page">
			<view class="sub-item" v-for="(item,index) in subPages" :key="index">
				<image :src="item.icon" mode="scaleToFill"></image>
				<view class="sub-item-title">{{item.title}}</view>
			</view>
		</view>
		
		<view class="sub-title">{{$t('property.navbar.title')}}</view>
		
		<view class="balances">
			<view class="balance-item" v-for="(item,index) in balances" :key="index">
				<view class="left">
					<img :src="item.icon"/>
				</view>
				<view class="right">
					<view class="menu-text">{{item.name}}</view>
					<view class="menu-num">
						{{item.num}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				subPages:[
					{title:this.$t('property.subpage.title1'),icon:'../../static/images/user/10023.png',path:''},
					{title:this.$t('property.subpage.title2'),icon:'',path:''},
					{title:this.$t('property.subpage.title3'),icon:'',path:''}
				],
				balances:[
					{name:'USD',num:'100',icon:'../../static/images/user/10024.png',path:''},
					{name:'USDT',num:'100',icon:'../../static/images/user/10025.png',path:''},
					{name:'TFI',num:'0',icon:'../../static/images/user/10026.png',path:''}
				]
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.property{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.top{
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		.header{
			display: flex;
			align-items: center;
			.title{
				font-size: 40upx;
			}
		}
		.balance{
			font-size: 50upx;
			color: $fontColor;
		}
		
	}
	.sub-page{
		margin-top: 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.sub-item{
			width: 33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			color:#fff;
			image{
				width: 100upx;
				height: 100upx;
			}
			.sub-item-title{
				margin-top: 20upx;
			}
		}
	}
	.sub-title{
		height: 60upx;
		color: #fff;
		line-height: 60upx;
		font-size: 40upx;
		margin-top: 40upx;
	}
	.balances{
		.balance-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100upx;
			color: #fff;
			.left{
				width: 10%;
				img{
					width: 60upx;
					height: auto;
				}
			}
			.right{
				width: 88%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $fontColor;
				padding-bottom: 6upx;
			}
		}
	}
}
</style>
