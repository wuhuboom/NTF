<template>
	<view class="game-tools">
		<uni-nav-bar left-icon="left"  :title="$t('withdraw.payway.address.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				games:[]
			}
		},
		methods: {
			goBack(){
				uni.navigateTo({
					url:'./withdraw'
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
