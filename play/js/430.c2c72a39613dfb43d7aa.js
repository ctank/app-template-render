"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[430],{44061:function(e,t,n){n.d(t,{s:function(){return a}});n(77950),n(85940);var r=n(48488),u=n(27875),a={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{value:{get:function(){var e="";return this.formData&&this.fieldPath&&(e=(0,r.g)(this.formData,this.fieldPath)),e},set:function(e){this.onChange(e,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}},render:function(e,t,n,r,a,i){return(0,u.wg)(),(0,u.iD)("div")}}},63430:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var r=n(27875),u=n(50349),a=n(48488),i=n(44061),l=(0,r.aZ)({name:"Cascader",extends:i.s,props:{title:{type:String,default:function(){return""}},required:{type:Boolean,default:function(){return!1}}},data:function(){return{provinceAndCityData:a.p}},computed:{},watch:{},created:function(){this.setRules()},mounted:function(){},methods:{setRules:function(){if(this.rules){var e=this.title;this.required&&this.rules.push({required:!0,message:"".concat(e,"不能为空"),trigger:"blur"})}}}});l.render=function(e,t,n,a,i,l){var o=(0,r.up)("el-cascader"),c=(0,r.up)("el-form-item");return(0,r.wg)(),(0,r.j4)(c,{label:e.title,class:(0,u.normalizeClass)(e.required?"is-required":""),prop:e.validProp,rules:e.rules},{default:(0,r.w5)((function(){return[(0,r.Wm)(o,{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.value=t}),options:e.provinceAndCityData,placeholder:e.placeholder,clearable:""},null,8,["modelValue","options","placeholder"])]})),_:1},8,["label","class","prop","rules"])}}}]);