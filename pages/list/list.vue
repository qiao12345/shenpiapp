<template>
	<view class="content">
		<text class="q_title">待审批信息</text>
		<uni-list>
		    <uni-list-item v-for="(item,index) in itemList" :key="index" :title="item.visitorname" @click="goList(item)" thumb="../../static/img/xinxi.png" :note="'访问事由：'+item.visitreason"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import { encryptCBC, decryptCBC } from '../../des/des.js'
	export default {
		data() {
			return {
				nowMonthTime: '',
				showImg: false,
				itemList: []
			}
		},
		components: {
			uniList,
			uniListItem
		},
		onLoad() {
			this.getTime();
			this.bindLogin();
            this.showImg = true;
		},
		methods: {
			getTime() {
				var d = new Date();
				var e = new Date(d.setHours(d.getHours()+8));
				this.nowMonthTime = e.toJSON().substr(0, 19).replace('T', ' ');
			},
			bindLogin() {
				var sintxt = "A003" + "0001" + "0001" + "123" + this.nowMonthTime;
				var signInVal = encryptCBC(sintxt,12345678);
				var param = {"IN":[{"TradeID":"A003","UnitID":"0001","DevID":"0001","DevPsw":"123","HappenTime":this.nowMonthTime,"SignIn":signInVal}]};
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
			goList: function(e) {
				let detail = {
					id: e.id,
					visitorid: e.visitorid,
					visitorname: e.visitorname,
					visitorgender: e.visitorgender,
					visitorphone: e.visitorphone,
					visitoradd: e.visitoradd,
					visitreason: e.visitreason,
					visitdate_st: e.visitdate_st,
					visitdate_en: e.visitdate_en,
					visitobjectname: e.visitobjectname,
					visitobjectphone: e.visitobjectphone,
					orderdatetime: e.orderdatetime,
				};
				uni.navigateTo({
					url: '../listItem/listItem?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}
		},
	}
</script>

<style>
</style>
