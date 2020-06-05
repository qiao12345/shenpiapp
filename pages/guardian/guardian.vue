<template>
	<view class="content">
		<text class="q_title">门禁列表</text>
        <view class="uni-list">
            <checkbox-group @change="changeList">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in itemList" :key="index">
                    <view class="uni-list-q">
                        <checkbox :value="JSON.stringify(item.DoorNo)" />{{item.Des}}
                    </view>
                </label>
            </checkbox-group>
        </view>
		<view class="btn-row">
			<button type="primary" @click="handleSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	import { encryptCBC, decryptCBC } from '../../des/des.js'
	export default {
		data() {
			return {
				itemList: [],
			}
		},
		onLoad(event) {
			this.id = event.id;
			this.getTime();
			this.getGuardian();
		},
		methods: {
			getTime() {
				var d = new Date();
				var e = new Date(d.setHours(d.getHours()+8));
				this.nowTime = e.toJSON().substr(0, 19).replace('T', ' ');
			},
			changeList: function(e) {
				this.checkLIst = e.detail.value;
				this.checkLIst = this.checkLIst.toString().replace(/\,/g,"*");;
			},
			getGuardian() {
				var sintxt = "A007" + "0001" + "0001" + "123" + this.nowTime;
				var signInVal = encryptCBC(sintxt,12345678);
				var param = {"IN":[{"TradeID":"A007","UnitID":"0001","DevID":"0001","DevPsw":"123","HappenTime":this.nowTime,"SignIn":signInVal}]};
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
							this.itemList = res.data.DATA
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.OUT[0].Msg
							})
						}
				    }
				});
			},
			handleSubmit(){
				var sintxt = "A005" + "0001" + "0001" + "123" + this.id + this.checkLIst + this.nowTime;
				var signInVal = encryptCBC(sintxt,12345678);
				var param = {"IN":[{"TradeID":"A005","UnitID":"0001","DevID":"0001","DevPsw":"123","id":this.id,"allow_open":this.checkLIst,"HappenTime":this.nowTime,"SignIn":signInVal}]};
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
							uni.showToast({
								icon: 'success',
								title: '提交成功!'
							});
							setTimeout(function(){
								uni.redirectTo({
									url:'../list/list'
								})
							},2000)
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
</script>

<style>
	.uni-list-q{
		background-color: #FFFFFF;
		padding: 5px 10px;
		
	}
</style>
