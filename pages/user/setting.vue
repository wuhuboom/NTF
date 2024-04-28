<template>
	<view class="settings">
		<uni-nav-bar left-icon="left"  :title="$t('user.menu.title4.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="menu">
			<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="goSubPage(item)">
				<view class="left">
					<uni-icons :type="item.icon" color="rgb(185,185,185)" :size="24"></uni-icons>
					<view class="menu-text">{{item.title}}</view>
				</view>
				<view class="right">
					<view v-if="item.type==1" class="logo">
						<img :src="lang.icon"/>
						<view class="title">{{lang.name}}</view>
					</view>
					<uni-icons type="right" color="rgb(185,185,185)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="logout" @click="openPopup">
			{{$t('btn.logout.text')}}
		</view>
		<uni-popup ref="popup" type="center" background-color="rgb(0, 20, 19)">
			<view class="popup-form">
				<view class="popup-tip">{{$t('setting.logout.tip.text')}}</view>
				<view class="prop-btn">
					<button class="cancle-btn btn" @click="closeProp">{{$t('btn.caancle.text')}}</button>
					<button class="sub-btn btn" @click="logout">{{$t('btn.continue.text')}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus:[
					{title:this.$t('setting.menu1.text'),icon:'chatboxes',path:'./settingLanguage',type:1},
					{title:this.$t('setting.menu2.text'),icon:'person',path:'./settingAboutUs'}
				],
				languages:[
					{value:'en',text:'EN',name:'English',icon:'../../static/images/login/EN.webp'},
					{value:'zh',text:'ZH',name:'中文',icon:'../../static/images/login/ZH.webp'}
				],
				lang:{}
			}
		},
		onLoad() {
			this.loadLocal()
		},
		methods: {
			loadLocal(){
				const local = uni.getLocale()
				const temp = this.languages.filter(item => {
					return item.value == local
				})
				this.lang = temp[0]
				console.log(this.lang)
			},
			goSubPage(item){
				uni.navigateTo({
					url:item.path
				})
			},
			logout(){
				uni.removeStorageSync("user")
				uni.removeStorageSync('accountInfo')
				uni.removeStorageSync("token")
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			goBack(){
				uni.switchTab({
					url:'/pages/user/user'
				})
			},
			closeProp(){
				this.$refs.popup.close()
			},
			openPopup(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped lang="scss">
.settings{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.menu{
		color: rgb(185,185,185);
		.menu-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			border-bottom: 1px solid #494747;
			.left{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.menu-text{
					margin-left: 20upx;
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
