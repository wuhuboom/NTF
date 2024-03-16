<template>
	<view class="settings">
		<uni-nav-bar left-icon="left"  :title="$t('user.menu.title4.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
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
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.settings{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
}
</style>
