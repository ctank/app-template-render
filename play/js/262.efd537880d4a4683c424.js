"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[262],{20964:function(t,n,e){e.d(n,{s:function(){return a}});e(77950),e(85940);var o=e(23316),r=e(27875),a={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}},disabled:{type:Boolean,default:function(){return!1}}},data:function(){return{}},computed:{value:{get:function(){var t="";return this.formData&&this.fieldPath&&(t=(0,o.a)(this.formData,this.fieldPath)),t},set:function(t){this.onChange(t,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}},render:function(t,n,e,o,a,u){return(0,r.wg)(),(0,r.iD)("div")}}},64262:function(t,n,e){e.r(n),e.d(n,{default:function(){return u}});e(39529),e(31235),e(58188);var o=e(27875),r=e(23316),a=e(20964),u=(0,o.aZ)({name:"Row",extends:a.s,props:{children:{type:Array,default:function(){return[]}}},methods:{getComponentDisplay:function(t){var n=!0;return t&&!r.L.includes(t.type)&&((n=(0,r.g)(t.extras.showConfig,this.formData,this.componentMap))||this.components.some((function(n){return n.fieldPath===t.fieldPath}))||(0,r.s)(this.formData,t.fieldPath,"")),n},getComponentDisabled:function(t){var n=!1;return t&&!r.L.includes(t.type)&&(n=(0,r.g)(t.extras.readonlyConfig,this.formData,this.componentMap,n)),n}}});u.render=function(t,n,e,r,a,u){var i=(0,o.up)("form-component-render"),p=(0,o.up)("el-col"),c=(0,o.up)("el-row");return(0,o.wg)(),(0,o.j4)(c,{gutter:10},{default:(0,o.w5)((function(){return[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.children,(function(n,e){return(0,o.wg)(),(0,o.j4)(p,{key:"col-".concat(e),span:24/t.extras.size},{default:(0,o.w5)((function(){return[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.children,(function(n,e){return(0,o.wg)(),(0,o.iD)(o.HY,null,[t.getComponentDisplay(t.componentMap[n.id])?((0,o.wg)(),(0,o.j4)(i,{key:"col-item-".concat(e),formData:t.formData,component:t.componentMap[n.id],componentMap:t.componentMap,disabled:t.getComponentDisabled(t.componentMap[n.id])},null,8,["formData","component","componentMap","disabled"])):(0,o.kq)("",!0)],64)})),256))]})),_:2},1032,["span"])})),128))]})),_:1})}}}]);