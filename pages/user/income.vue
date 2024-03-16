<template>
	<view class="income">
		<uni-nav-bar left-icon="left"  :title="$t('user.trade.title3.text')" background-color="rgb(1,2,3)" color="#fff" :border="false" @clickLeft="goBack"></uni-nav-bar>
		<view class="container">
			<echarts ref="echarts" :option="option" canvasId="echarts"></echarts>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts-uniapp/echarts-uniapp.vue'
	export default {
		components:{
			echarts
		},
		data() {
			return {
				option : {}
			}
		},
		onReady() {
			this.option = {
				backgroundColor: "transparent",
				tooltip:{
					trigger:'axis',
					textStyle:{
						color:'#fff'
					},
					backgroundColor:'rgb(41,41,55)'
				},
				 xAxis: {
				    type: 'category',
				    boundaryGap: false,
				    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				  },
				  yAxis: {
				    type: 'value'
				  },
				  series: [
				    {
				      data: [820, 932, 901, 934, 1290, 1330, 1320],
				      type: 'line',
					  itemStyle:{
						color:'#04D3D5'
					  },
					  lineStyle:{
						color:'#04D3D5'  
					  },
				      areaStyle: {
						  color:'#04D3D5'
					  }
				    }
				  ]	
			}
		},
		methods: {
			loadData(){
				this.$http.post('/player/invest/my/statis',para,res => {
					
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
.income{
	width: 670upx;
	min-height: 100vh;
	padding: 0upx 40upx;
	.container{
		width: 500upx;
		height: 500upx;
		margin: 0 auto;
		
	}
}
</style>
