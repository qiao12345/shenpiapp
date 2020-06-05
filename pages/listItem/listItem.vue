<template>
	<view class="content">
		<text class="q_title">访客详细信息</text>
		<view class="q_list">
			<text class="q_text1">访客身份证号:</text>
			<text class="q_text2">{{movieList.visitorid}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客姓名:</text>
			<text class="q_text2">{{movieList.visitorname}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客性别:</text>
			<text class="q_text2">{{movieList.visitorgender}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客联系电话:</text>
			<text class="q_text2">{{movieList.visitorphone}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客联系地址:</text>
			<text class="q_text2">{{movieList.visitoradd}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客来访原因:</text>
			<text class="q_text2">{{movieList.visitreason}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客来访开始日期:</text>
			<text class="q_text2">{{movieList.visitdate_st}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客来访结束日期:</text>
			<text class="q_text2">{{movieList.visitdate_en}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访问单位联系人姓名:</text>
			<text class="q_text2">{{movieList.visitobjectname}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访访问单位联系人电话:</text>
			<text class="q_text2">{{movieList.visitobjectphone}}</text>
		</view>
		<view class="q_list">
			<text class="q_text1">访客预约访问时间:</text>
			<text class="q_text2">{{movieList.orderdatetime}}</text>
		</view>
		<view class="btn-row">
			<button type="primary" plain @click="handleSubmit('0')">待审批</button>
		</view>
		<view class="btn-row">
			<button type="primary" @click="handleSubmit('1')">审批通过</button>
		</view>
		<view class="btn-row">
			<button type="warn" @click="handleSubmit('2')">审批拒绝</button>
		</view>
	</view>
</template>

<script>
	import { encryptCBC, decryptCBC } from '../../des/des.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				nowTime: '',
			}
		},
		computed: mapState(['userName']),
		onLoad(event) {
			this.movieList = JSON.parse(decodeURIComponent(event.detailDate));
			this.id = this.movieList.id;
			this.getTime();
		},
		methods: {
			getTime() {
				var d = new Date();
				var e = new Date(d.setHours(d.getHours()+8));
				this.nowTime = e.toJSON().substr(0, 19).replace('T', ' ');
			},
			handleSubmit: function(e) {
				if(e == '0'){
					uni.redirectTo({
						url:'../list/list'
					})
				}
				if(e == '1'){
					var sintxt = "A004" + "0001" + "0001" + "123" + this.id + e + this.userName + this.nowTime + this.nowTime;
					var signInVal = encryptCBC(sintxt,12345678);
					var param = {"IN":[{"TradeID":"A004","UnitID":"0001","DevID":"0001","DevPsw":"123","id":this.id,"checkresult":e,"examiner":this.userName,"checkdatetime":this.nowTime,"HappenTime":this.nowTime,"SignIn":signInVal}]};
					uni.request({
					    url: 'http://192.168.254.97:8011/visitinferfaceSrv.asmx/VisiteInterface', //仅为示例，并非真实接口地址。
					    data: JSON.stringify(param),
					    method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
					    dataType: 'json',
					    success: (res) => {
					        if(res.data.OUT[0].RetCode == '0'){
								uni.redirectTo({
									url:'../guardian/guardian?id='+this.id
								})
							}else{
								uni.showToast({
									icon: 'none',
									title: res.data.OUT[0].Msg
								})
							}
					    }
					});
				}
				if(e == '2'){
					var sintxt = "A004" + "0001" + "0001" + "123" + this.id + e + this.userName + this.nowTime + this.nowTime;
					var signInVal = encryptCBC(sintxt,12345678);
					var param = {"IN":[{"TradeID":"A004","UnitID":"0001","DevID":"0001","DevPsw":"123","id":this.id,"checkresult":e,"examiner":this.userName,"checkdatetime":this.nowTime,"HappenTime":this.nowTime,"SignIn":signInVal}]};
					uni.request({
					    url: 'http://192.168.254.97:8011/visitinferfaceSrv.asmx/VisiteInterface', //仅为示例，并非真实接口地址。
					    data: JSON.stringify(param),
					    method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
					    dataType: 'json',
					    success: (res) => {
					        if(res.data.OUT[0].RetCode == '0'){
								uni.redirectTo({
									url:'../list/list'
								})
							}else{
								uni.showToast({
									icon: 'none',
									title: res.data.OUT[0].Msg
								})
							}
					    }
					});
				}
			}
		}
	}
</script>

<style>
.q_list{
	padding: 10px;
	background-color: #FFFFFF;
	border-bottom: solid 1px #c9c9c9;
	display: flex;
	justify-content: space-between;
	font-size: 14px;
}
.q_text1{
	font-weight: bold;
}
.q_text2{
	color: #807f82;
}
</style>
