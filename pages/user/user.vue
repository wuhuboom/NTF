<template>
	<view class="user">
		<language></language>
		<view class="top">
			<view class="left">
				<image :src="headerImg" mode="scaleToFill" ></image>
			</view>
			<view class="right">
				<view class="username">{{user.username}}</view>
				<view class="userid">
					ID:{{user.invitationCode}}
					<image src="../../static/images/user/copy.webp" mode="aspectFill" @click="copy(user.invitationCode)"></image>
				</view>
				<view class="username">{{currendDate}}</view>
			</view>
		</view>
		<view class="user-money">
			<view class="user-money-item">
				<view class="item-name">{{$t('user.money.available')}}</view>
				<view class="item-num">${{divide(user.balance)}}</view>
			</view>
			<view class="user-money-item">
				<view class="item-name">{{$t('user.money.purchased')}}</view>
				<view class="item-num">${{divide(user.frozenBet)}}</view>
			</view>
		</view>
		<!-- <view class="title">{{$t('user.welcome.text')}}</view>
		<view class="wel-img" @click="goInvite">
			<img :src="welImg"/>
		</view> -->
		<view class="title">{{$t('user.teade.text')}}</view>
		<view class="trade">
			<view class="trade-item" v-for="(item,index) in trades" :key="index" @click="goSubPage(item)">
				<img :src="item.icon"/>
				<view class="trade-title">{{item.title}}</view>
			</view>
		</view>
		<view class="title">{{$t('user.service.text')}}</view>
		<view class="menu">
			<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="goSubPage(item)">
				<view class="left">
					<img :src="item.icon" v-if="item.icon.endsWith('webp')"/>
					<uni-icons :type="item.icon" color="rgb(185,185,185)" :size="24" v-else></uni-icons>
					
					<view class="menu-text">{{item.title}}</view>
				</view>
				<view class="right" v-if="item.path">
					<uni-icons type="right" color="rgb(185,185,185)"></uni-icons>
				</view>
			</view>
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
	import language  from '@/components/language.vue'
	import {divide100,getCurrentDate} from '@/utils/util.js'
	export default {
		components:{
			language
		},
		data() {
			return {
				divide:divide100,
				headerImg:'../../static/images/user/10014.png',
				welImg:'../../static/images/user/10015.png',
				trades:[
					{title:this.$t('user.trade.title1.text'),icon:'../../static/images/user/10016.png',path:'./property'},
					{title:this.$t('user.trade.title2.text'),icon:'../../static/images/user/dingtou.png',path:'./investDetail'},
					{title:this.$t('user.trade.title3.text'),icon:'../../static/images/user/10017.png',path:'./income'}
				],
				menus:[
					{title:this.$t('user.menu.title1.text'),icon:'wallet',path:'./security'},
					{title:this.$t('user.menu.title2.text'),icon:'staff',path:'./myfriend'},
					{title:this.$t('user.menu.title3.text'),icon:'headphones',path:'./contract'},
					// {title:this.$t('user.menu.title4.text'),icon:'gear',path:'./setting'},
					{title:this.$t('user.menu.title5.text'),icon:'../../static/images/user/invite.webp',path:'./invite'},
					{title:this.$t('user.menu.title6.text'),icon:'../../static/images/user/app.webp',path:'',type:'down'},
					{title:this.$t('user.menu.title7.text'),icon:'../../static/images/user/exit.webp',path:'',type:'signOut'}
				],
				user:{},
				currendDate:''
			}
		},
		onShow() {
			this.currendDate = getCurrentDate()
			this.getUserinfo()
		},
		methods: {
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
			// 邀请
			goInvite(){
				uni.navigateTo({
					url:'./invite'
				})
			},
			goSrv(){
				this.$http.get('/player/home/serv',res => {
					if(res.code == 200){
						window.location.href = res.data.serviceAddr
					}
				})
			},
			goSubPage(item){
				if(item.path){
					if(item.path=='./contract'){
						this.goSrv()
					}else{
						uni.navigateTo({
							url:item.path
						})
					}
				}else{
					if(item.type == 'down'){
						this.down()
					}else if(item.type == 'signOut'){
						this.openPopup()
					}
				}
				
				
			},
			copy(val) {
			    if (val) {
			        uni.setClipboardData({
			            data: val.toString(),
			            showToast: true,
			            success: () => {
			                uni.showToast({
			                    icon: 'none',
			                    title: this.$t("invite.copy.success"),
			                    duration: 2000,
			                });
			            }
			        });
			    }
			},
			logout(){
				uni.removeStorageSync("user")
				uni.removeStorageSync('accountInfo')
				uni.removeStorageSync("token")
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			closeProp(){
				this.$refs.popup.close()
			},
			openPopup(){
				this.$refs.popup.open()
			},
			down(){
				let osType = 0
				let downObj = {}
				if (navigator.userAgent.indexOf('iPhone') !== -1) {
				    osType = 1
				} else if (navigator.userAgent.indexOf('Android') !== -1) {
				    osType = 0
				}
				this.$http.get('/player/home/app_url',res=>{
					res = res.data
					res.forEach(item => {
						if(item.appType==osType){
							downObj = item
						}
					});
					if(downObj.appUrl){
						setTimeout(() => {
							window.location.href = downObj.appUrl
						}, 1000)
					}
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
.user{
	width: 670upx;
	padding-left: 40upx;
	padding-right: 40upx;
	min-height: 100vh;
	background-image: url('../../static/images/home/10046.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	color: #fff;
	.top{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-top: 120upx;
		.left{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 128upx;
				height: 128upx;
			}
		}
		.right{
			color: #fff;
			margin-left: 20upx;
			.username{
			  font-size: 28upx;
			  color: #fff;
			  padding-bottom: 10upx;
			}
			.userid{
			  padding-bottom: 10upx;
			  font-size: 32upx;
			  font-weight: 500;
			  color: #fff;
			  display: flex;
			  image{
				  width: 40upx;
				  height: 40upx;
				  margin-left: 20upx;
			  }
			}
		}
		
	}
	.user-money{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
		background-color: transparent;
		padding-top: 40upx;
		padding-bottom: 40upx;
		.user-money-item{
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.item-name{
			   font-size: 24upx;
			   color: #fff;
			   margin-bottom: 20upx;
			}
			.item-num{
				 font-size: 44upx;
				  font-weight: bold;
				  color: #fff;
			}
		}
	}
	.title{
		font-size: 40upx;
		font-weight: 600;
		margin-top: 40upx;
	}
	.wel-img{
		width: 670upx;
		margin-top: 20upx;
		img{
			max-width: 100%;
			height: auto;
		}
	}
	.trade{
		width: 670upx;
		height: 200upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: inset 0 0 16upx 0upx $fontColor;
		margin-top: 40upx;
		.trade-item{
			width: 33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			img{
				width: 80upx;
				height: 80upx;
			}
			.trade-title{
				font-size: 24upx;
				color: rgb(185,185,185);
				height: 60upx;
				display: flex;
				align-items: flex-start
			}
		}
	}
	.menu{
		color: rgb(185,185,185);
		margin-bottom: 100upx;
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
				img{
					width: 40upx;
					height: auto;
				}
			}
		}
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
