"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[273],{15517:function(e,t,n){n.d(t,{s:function(){return s}});n(77950),n(48319),n(85940);var i,a,l=n(83522),r=n(27875);(i=self.document)&&!i.getElementById("livereloadscript")&&((a=i.createElement("script")).async=1,a.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",a.id="livereloadscript",i.getElementsByTagName("head")[0].appendChild(a));var s={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{value:{get:function(){var e="";return this.formData&&this.fieldPath&&(e=(0,l.g)(this.formData,this.fieldPath)),e},set:function(e){this.onChange(e,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}}};s.render=function(e,t,n,i,a,l){return(0,r.wg)(),(0,r.iD)("div")},s.__file="src/components/form/base.vue"},94273:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});n(77950),n(48319),n(68995),n(18178),n(39529),n(31235),n(95342),n(58188),n(74083),n(1939);var i,a,l=n(27875),r=n(50349),s=n(83522),o=n(15517);(i=self.document)&&!i.getElementById("livereloadscript")&&((a=i.createElement("script")).async=1,a.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",a.id="livereloadscript",i.getElementsByTagName("head")[0].appendChild(a));var u=(0,l.aZ)({name:"CheckBox",extends:o.s,props:{title:{type:String,default:function(){return""}},required:{type:Boolean,default:function(){return!1}}},data:function(){return{filterOptions:[],relateOptionFieldValue:"",checkAll:!1,isIndeterminate:!1}},computed:{relateValue:function(){var e="";if(this.extras.relateOptionField){var t=this.componentMap[this.extras.relateOptionField];e=(0,s.g)(this.formData,t.fieldPath)}return e}},watch:{relateValue:function(){this.setFilterOptions()},"extras.options":function(){this.setFilterOptions()}},created:function(){this.setDefaultValue(),this.setRules()},mounted:function(){this.init()},methods:{init:function(){this.setFilterOptions()},setRules:function(){if(this.rules){var e=this.title;if(this.required&&this.rules.push({required:!0,message:"".concat(e,"不能为空"),trigger:"blur"}),this.extras){var t=parseInt(this.extras.minLimit),n=parseInt(this.extras.maxLimit);isNaN(t)||isNaN(n)?isNaN(t)?isNaN(n)||this.rules.push({validator:function(e,t,i){t&&t instanceof Array&&t.length>n?i("最多可选择".concat(n,"个选项")):i()},trigger:"change"}):this.rules.push({validator:function(e,n,i){n&&n instanceof Array&&n.length<t?i("至少选择".concat(t,"个选项")):i()},trigger:"change"}):this.rules.push({validator:function(e,i,a){i&&i instanceof Array&&(i.length<t||i.length>n)?a("选择的数量必须在".concat(t,"和").concat(n,"之间")):a()},trigger:"change"})}}},setDefaultValue:function(){if(this.value)this.setCheckAll();else{for(var e=[],t=0;t<this.extras.options.length;t++)this.extras.options[t].isDefault&&e.push(this.extras.options[t].value);e&&e.length&&this.onChange(e,this.id)}},setCheckAll:function(){var e=!0;if(this.filterOptions.length)for(var t=0;t<this.filterOptions.length&&(e=this.value.includes(this.filterOptions[t].value));t++);else e=!1;this.checkAll=e},setFilterOptions:function(){var e=this,t=[];if("api"===this.extras.dataSource){this.relateOptionFieldValue!==this.relateValue&&(this.relateOptionFieldValue=this.relateValue);var n=this.fieldPath.split("/");this.onGetValue({id:this.id,field:n[n.length-1]||"",relateValue:this.relateOptionFieldValue},(function(t){Array.isArray(t)&&setTimeout((function(){e.filterOptions=t,e.setCheckAll()}),0)}))}else if(this.extras.relateOptionField){var i=this.extras.relateAvailableOptions[this.relateValue];i&&i.length&&(t=this.extras.options.filter((function(e){return i.indexOf(e.value)>=0})))}else t=this.extras.options;this.filterOptions=t},handleCheckAllChange:function(e){var t=[];this.filterOptions.forEach((function(e){t.push(e.value)})),this.value=e?t:[],this.isIndeterminate=!1},handleValueChange:function(e){var t=e.length,n=[];this.filterOptions.forEach((function(e){n.push(e.value)})),this.checkAll=t===n.length,this.isIndeterminate=t>0&&t<n.length}}}),c=(0,l.Uk)("全选");u.render=function(e,t,n,i,a,s){var o=(0,l.up)("el-checkbox"),u=(0,l.up)("el-checkbox-group"),h=(0,l.up)("el-form-item");return(0,l.wg)(),(0,l.j4)(h,{label:e.title,class:(0,r.normalizeClass)(e.required?"is-required":""),prop:e.validProp,rules:e.rules},{default:(0,l.w5)((function(){return[e.extras.checkAll?((0,l.wg)(),(0,l.j4)(o,{key:0,class:"atp-checkbox__all",modelValue:e.checkAll,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.checkAll=t}),indeterminate:e.isIndeterminate,onChange:e.handleCheckAllChange},{default:(0,l.w5)((function(){return[c]})),_:1},8,["modelValue","indeterminate","onChange"])):(0,l.kq)("v-if",!0),(0,l.Wm)(u,{modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.value=t}),onChange:e.handleValueChange},{default:(0,l.w5)((function(){return[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.filterOptions,(function(e,t){return(0,l.wg)(),(0,l.j4)(o,{label:e.value,key:"".concat(t,"-").concat(e.value)},{default:(0,l.w5)((function(){return[(0,l.Uk)((0,r.toDisplayString)(e.label),1)]})),_:2},1032,["label"])})),128))]})),_:1},8,["modelValue","onChange"])]})),_:1},8,["label","class","prop","rules"])},u.__file="src/components/form/checkBox/index.vue"},74083:function(e,t,n){var i=n(23103),a=n(65968),l=n(19540).indexOf,r=n(96038),s=a([].indexOf),o=!!s&&1/s([1],1,-0)<0,u=r("indexOf");i({target:"Array",proto:!0,forced:o||!u},{indexOf:function(e){var t=arguments.length>1?arguments[1]:void 0;return o?s(this,e,t)||0:l(this,e,t)}})}}]);