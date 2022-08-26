"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[623],{15517:function(e,t,r){r.d(t,{s:function(){return u}});r(77950),r(48319),r(85940);var n,a,i=r(83522),l=r(27875);(n=self.document)&&!n.getElementById("livereloadscript")&&((a=n.createElement("script")).async=1,a.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",a.id="livereloadscript",n.getElementsByTagName("head")[0].appendChild(a));var u={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{value:{get:function(){var e="";return this.formData&&this.fieldPath&&(e=(0,i.g)(this.formData,this.fieldPath)),e},set:function(e){this.onChange(e,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}}};u.render=function(e,t,r,n,a,i){return(0,l.wg)(),(0,l.iD)("div")},u.__file="src/components/form/base.vue"},17623:function(e,t,r){r.r(t),r.d(t,{default:function(){return o}});r(77950),r(48319),r(68995),r(18178);var n,a,i=r(27875),l=r(50349),u=r(15517),s=r(83522);(n=self.document)&&!n.getElementById("livereloadscript")&&((a=n.createElement("script")).async=1,a.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",a.id="livereloadscript",n.getElementsByTagName("head")[0].appendChild(a));var o=(0,i.aZ)({name:"TextBox",extends:u.s,props:{title:{type:String,default:function(){return""}},required:{type:Boolean,default:function(){return!1}},placeholder:{type:String,default:function(){return""}}},data:function(){return{input:""}},created:function(){this.setDefaultValue(),this.setRules()},methods:{setRules:function(){if(this.rules){var e=this.title;if(this.required&&this.rules.push({required:!0,message:"".concat(e,"不能为空"),trigger:"blur"}),this.extras){switch(this.extras.validType){case"english":this.rules.push({validator:function(e,t,r){(0,s.d)(t)?r():r(new Error("请输入英文"))},trigger:"change"});break;case"numberEnglish":this.rules.push({validator:function(e,t,r){(0,s.c)(t)?r():r(new Error("请输入数字或英文"))},trigger:"change"});break;case"email":this.rules.push({validator:function(e,t,r){(0,s.b)(t)?r():r(new Error("请输入正确的邮箱"))},trigger:"blur"});break;case"idcard":this.rules.push({validator:function(e,t,r){(0,s.a)(t)?r():r(new Error("请输入身份证号码"))},trigger:"blur"});break;case"phone":this.rules.push({validator:function(e,t,r){(0,s.v)(t)?r():r(new Error("请输入正确的手机号码"))},trigger:"blur"})}var t=parseInt(this.extras.minLength),r=parseInt(this.extras.maxLength);isNaN(t)||isNaN(r)?isNaN(t)?isNaN(r)||this.rules.push({validator:function(e,t,n){"string"==typeof t&&t.length&&t.length>r?n(new Error("最多可输入".concat(r,"个字符"))):n()},trigger:"blur"}):this.rules.push({validator:function(e,r,n){"string"==typeof r&&r.length&&r.length<t?n(new Error("至少输入".concat(t,"个字符"))):n()},trigger:"blur"}):this.rules.push({validator:function(e,n,a){"string"==typeof n&&n.length&&(n.length<t||n.length>r)?a(new Error("字符长度必须在".concat(t,"和").concat(r,"之间"))):a()},trigger:"blur"}),this.rules.push({validator:function(t,r,n){"string"==typeof r&&r.length&&r.length>128?n(new Error("".concat(e,"的长度不能大于128"))):n()},trigger:"change"})}}},setDefaultValue:function(){this.extras.defaultValue&&!this.value&&this.$emit("change",this.extras.defaultValue,this.id)}}});o.render=function(e,t,r,n,a,u){var s=(0,i.up)("el-input"),o=(0,i.up)("el-form-item");return(0,i.wg)(),(0,i.j4)(o,{label:e.title,class:(0,l.normalizeClass)(e.required?"is-required":""),prop:e.validProp,rules:e.rules},{default:(0,i.w5)((function(){return[(0,i.Wm)(s,{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.value=t}),placeholder:e.placeholder,clearable:""},null,8,["modelValue","placeholder"])]})),_:1},8,["label","class","prop","rules"])},o.__file="src/components/form/textBox/index.vue"}}]);