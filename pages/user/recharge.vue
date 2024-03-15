<template>
	<view class="income">
		<uni-nav-bar left-icon="left"  :title="$t('property.subpage.title1')" background-color="rgb(1,2,3)" color="#fff" :border="false" right-icon="icon-record" @clickLeft="goBack" @clickRight="goRecord">
			<view slot="right">
				<uni-icons custom-prefix="iconfont" type="icon-record" size="22" color="#fff"></uni-icons>
			</view>
		</uni-nav-bar>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payways:[]
			}
		},
		onLoad() {
			this.loadPayWays()
		},
		methods: {
			loadPayWays(){
				this.$http.get('/player/recharge_pre',res => {
					console.log(res,'------------')
				})
			},
			goRecord(){
				uni.navigateTo({
					url:'./inrecord'
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
.game-tools{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
}
</style>
