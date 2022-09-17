"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[101],{20964:function(t,e,i){i.d(e,{s:function(){return a}});i(77950),i(85940);var r=i(23316),n=i(27875),a={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}},disabled:{type:Boolean,default:function(){return!1}}},data:function(){return{}},computed:{value:{get:function(){var t="";return this.formData&&this.fieldPath&&(t=(0,r.a)(this.formData,this.fieldPath)),t},set:function(t){this.onChange(t,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}},render:function(t,e,i,r,a,l){return(0,n.wg)(),(0,n.iD)("div")}}},6101:function(t,e,i){i.r(e),i.d(e,{default:function(){return s}});i(68995),i(18178),i(95342),i(58188),i(74083),i(77950),i(48319);var r=i(27875),n=i(50349),a=i(23316),l=i(20964),s=(0,r.aZ)({name:"Select",extends:l.s,props:{title:{type:String,default:function(){return""}},required:{type:Boolean,default:function(){return!1}}},data:function(){return{filterOptions:[],relateOptionFieldValue:"",loading:!1}},computed:{relateValue:function(){var t="";if(this.extras.relateOptionField){var e=this.componentMap[this.extras.relateOptionField];t=(0,a.a)(this.formData,e.fieldPath)}return t},multipleLimit:function(){var t=0;return this.extras.multiple&&(this.extras.minLimit||this.extras.maxLimit)&&(t=this.extras.maxLimit||0),t},filterOption:function(){var t={filterable:!1,remote:!1};return this.extras.filterable&&(t.filterable=!0,"api"===this.extras.dataSource&&(t.remote=!0,t.remoteMethod=this.remoteFilter)),t}},watch:{relateValue:function(){this.setFilterOptions()},"extras.options":function(){this.setFilterOptions()}},created:function(){this.setDefaultValue(),this.setRules()},mounted:function(){this.init()},methods:{init:function(){this.setFilterOptions()},setRules:function(){if(this.rules){var t=this.title;if(this.required&&this.rules.push({required:!0,message:"".concat(t,"不能为空"),trigger:"blur"}),this.extras){var e=parseInt(this.extras.minLimit),i=parseInt(this.extras.maxLimit);isNaN(e)||isNaN(i)?isNaN(e)?isNaN(i)||this.rules.push({validator:function(t,e,r){e&&e instanceof Array&&e.length>i?r("最多可选择".concat(i,"个选项")):r()},trigger:"change"}):this.rules.push({validator:function(t,i,r){i&&i instanceof Array&&i.length<e?r("至少选择".concat(e,"个选项")):r()},trigger:"change"}):this.rules.push({validator:function(t,r,n){r&&r instanceof Array&&(r.length<e||r.length>i)?n("选择的数量必须在".concat(e,"和").concat(i,"之间")):n()},trigger:"change"})}}},setDefaultValue:function(){if(!this.value||!this.value.length){var t="";if(this.extras.minLimit||this.extras.maxLimit){t=[];for(var e=0;e<this.extras.options.length;e++)this.extras.options[e].isDefault&&t.push(this.extras.options[e].value)}else for(var i=0;i<this.extras.options.length;i++)if(this.extras.options[i].isDefault){t=this.extras.options[i].value;break}t&&t.length&&this.onChange(t,this.id)}},setFilterOptions:function(){var t=this,e=[];if("api"!==this.extras.dataSource||this.extras.filterable)if(this.extras.relateOptionField){var i=this.extras.relateAvailableOptions[this.relateValue];i&&i.length&&(e=this.extras.options.filter((function(t){return i.indexOf(t.value)>=0})))}else e=this.extras.options;else{this.relateOptionFieldValue!==this.relateValue&&(this.relateOptionFieldValue=this.relateValue);var r=this.fieldPath.split("/");this.onGetValue({id:this.id,field:r[r.length-1]||"",relateValue:this.relateOptionFieldValue},(function(e){Array.isArray(e)&&setTimeout((function(){t.filterOptions=e}),0)}))}this.filterOptions=e},remoteFilter:function(t){var e=this;if(t){this.loading=!0;var i=this,r=this.fieldPath.split("/");this.onGetValue({id:this.id,field:r[r.length-1]||"",relateValue:t},(function(t){e.loading=!1,Array.isArray(t)&&setTimeout((function(){i.filterOptions=t}),0)}))}else this.filterOptions=[]}}});s.render=function(t,e,i,a,l,s){var o=(0,r.up)("el-option"),u=(0,r.up)("el-select"),f=(0,r.up)("el-form-item");return(0,r.wg)(),(0,r.j4)(f,{label:t.title,class:(0,n.normalizeClass)(t.required?"is-required":""),prop:t.validProp,rules:t.rules},{default:(0,r.w5)((function(){return[(0,r.Wm)(u,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=function(e){return t.value=e}),placeholder:t.placeholder,multiple:t.extras.multiple,"multiple-limit":t.multipleLimit,disabled:t.disabled,filterable:t.filterOption.filterable,remote:t.filterOption.remote,remoteMethod:t.filterOption.remoteMethod,loading:t.loading,clearable:""},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.filterOptions,(function(t,e){return(0,r.wg)(),(0,r.j4)(o,{key:"".concat(e,"-").concat(t.value),label:t.label,value:t.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder","multiple","multiple-limit","disabled","filterable","remote","remoteMethod","loading"])]})),_:1},8,["label","class","prop","rules"])}},74083:function(t,e,i){var r=i(23103),n=i(65968),a=i(19540).indexOf,l=i(96038),s=n([].indexOf),o=!!s&&1/s([1],1,-0)<0,u=l("indexOf");r({target:"Array",proto:!0,forced:o||!u},{indexOf:function(t){var e=arguments.length>1?arguments[1]:void 0;return o?s(this,t,e)||0:a(this,t,e)}})}}]);