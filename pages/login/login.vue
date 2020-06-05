<template>
	<view class="content">
		<text class="login_title">用户登录</text>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { encryptCBC, decryptCBC } from '@/des/des.js'
	import mInput from '@/components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				nowMonthTime: '',      //当前时间
				username: '',
				password: '',
			}
		},
		onLoad() {
			this.getTime();
		},
		methods: {
			...mapMutations(['login']),
			getTime() {
				var d = new Date();
				var e = new Date(d.setHours(d.getHours()+8));
				this.nowMonthTime = e.toJSON().substr(0, 19).replace('T', ' ');
			},
			bindLogin() {
				var sintxt = "A002" + "0001" + "0001" + "123" + this.username + this.password + this.nowMonthTime;
				var signInVal = encryptCBC(sintxt,12345678);
				var param = {"IN":[{"TradeID":"A002","UnitID":"0001","DevID":"0001","DevPsw":"123","OpAccount":this.username,"OpPsw":this.password,"HappenTime":this.nowMonthTime,"SignIn":signInVal}]};
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
							    url: '../list/list'
							});
							this.login(this.username);
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.OUT[0].Msg
							})
						}
				    }
				});
			},
		},
	}
</script>

<style>
.login_title{
	text-align: center;
	font-weight: bold;
}
</style>
