(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-badge/uni-badge"],{2771:function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}))},3766:function(t,e,n){"use strict";var u=n("e318"),i=n.n(u);i.a},7687:function(t,e,n){"use strict";n.r(e);var u=n("2771"),i=n("d0bf");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("3766");var r,c=n("f0c5"),o=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,"2a19a379",null,!1,u["a"],r);e["default"]=o.exports},"7b21":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},d0bf:function(t,e,n){"use strict";n.r(e);var u=n("7b21"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a},e318:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-badge/uni-badge-create-component',
    {
        'components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7687"))
        })
    },
    [['components/uni-badge/uni-badge-create-component']]
]);
