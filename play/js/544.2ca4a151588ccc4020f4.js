"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[544],{7399:function(e,t,n){n.d(t,{s:function(){return r}});n(77950),n(85940);var a=n(81850),u=n(27875),r={name:"FormComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},placeholder:{type:String,default:function(){return"请输入"}},rules:{type:Array,default:function(){return[]}},fieldPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},subFormComponents:{type:Array,default:function(){return[]}},formData:{type:Object,default:function(){return{}}},disabled:{type:Boolean,default:function(){return!1}},tempVal:{type:Boolean,default:function(){return!1}}},data:function(){return{}},computed:{value:{get:function(){var e="";return this.formData&&this.fieldPath&&(e=(0,a.a)(this.formData,this.fieldPath)),e},set:function(e){this.tempVal?this.$emit("tempChange",e,this.id):this.onChange(e,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")}},render:function(e,t,n,a,r,i){return(0,u.wg)(),(0,u.iD)("div")}}},53544:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});n(71245),n(77208),n(77950),n(48319),n(58188),n(88233),n(85940),n(74083),n(21850),n(49228),n(68995),n(18178);var a=n(27875),u=n(50349),r=n(7399),i=n(81850),l=n(1634),s=(0,a.aZ)({name:"Amount",props:{type:{type:String,default:"money"},step:{type:Number,default:1},max:{type:Number,default:Number.POSITIVE_INFINITY},min:{type:Number,default:Number.NEGATIVE_INFINITY},showText:{type:Boolean,default:!1},modelValue:{type:Number},precision:{type:Number,validator:function(e){return e>=0&&e===Number.parseInt("".concat(e),10)}},disabled:{type:Boolean,default:function(){return!1}}},data:function(){return{isFocus:!1}},computed:{inputValue:{get:function(){return this.isFocus?this.modelValue:"percent"===this.type?this.modelValue+"%":this.showText?this.formatText(this.modelValue):this.formatThousandSeparator(this.modelValue)},set:function(e){this.handleValueInput(e)}}},methods:{formatThousandSeparator:function(e){return e||0===e?l(e).format({thousandSeparated:!0,mantissa:2}):""},formatText:function(e){if(e.toString().split(".")[0].length>12)return"位数超过限制，无法显示大写";var t=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],n=[["圆","万","亿"],["","拾","佰","仟"]],a=Math.abs(+e),u="";if(isNaN(a))return"";["角","分"].forEach((function(e,n){u+=(t[Math.floor(10*a*Math.pow(10,n))%10]+e).replace(/零./,"")})),u=u||"整",a=Math.floor(a);for(var r=0;r<n[0].length&&a>0;r+=1){for(var i="",l=0;l<n[1].length&&a>0;l+=1)i=t[a%10]+n[1][l]+i,a=Math.floor(a/10);u=i.replace(/(零.)*零$/,"").replace(/^$/,"零")+n[0][r]+u}return u.replace(/(零.)*零圆/,"圆").replace(/(零.)+/g,"零").replace(/^整$/,"零圆整")},validKeyCode:function(e){var t=String.fromCharCode(e.keyCode);return!("."===t&&(this.modelValue+"").indexOf(".")>=0)&&/[\d.]/.test(t)},handleInputFocus:function(){this.isFocus=!0},handleInputBlur:function(){this.isFocus=!1},handleValueChange:function(e){var t=this,n=null,a=!1,u=function(){var n=e.path.find((function(e){return e.dataset.type})),a=t.modelValue;"decrease"===n.dataset.type?--a<0&&(a=0):"increase"===n.dataset.type&&a++,t.handleValueInput(a)};0===e.button&&(document.addEventListener("mouseup",(function(){clearInterval(n),n=null,a||u(),a=!1}),{once:!0}),clearInterval(n),n=setInterval((function(){a=!0,u()}),100))},handleValueInput:function(e){var t=0;(e+"").indexOf(".")>=0&&(t=e.substr(e.indexOf(".")+1).length),!(0,i.f)(this.precision)&&t>this.precision&&(e=l(e).format({mantissa:this.precision})),this.max&&Number(e)>this.max?e=this.max:this.min&&Number(e)<this.min&&(e=this.min),t>0&&0!==Number(e)&&(e=Number(e),isNaN(e)&&(e="")),this.$emit("update:modelValue",e)},handleValueCopy:function(e){var t=this;(0,i.h)(e,(function(e){if(e){var n=t.__$app.config.globalProperties.$message;n?n({showClose:!0,message:"复制成功",type:"success"}):alert("复制成功")}}))}}}),o={class:"atr-number-amount el-input-number"};s.render=function(e,t,n,r,i,l){var s=(0,a.up)("Minus"),d=(0,a.up)("el-icon"),p=(0,a.up)("Plus"),c=(0,a.up)("CopyDocument"),f=(0,a.up)("el-input");return(0,a.wg)(),(0,a.iD)("div",o,[e.disabled?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("span",{key:0,role:"button","data-type":"decrease",class:(0,u.normalizeClass)(["el-input-number__decrease",{"is-disabled":e.modelValue<=e.min||e.disabled}]),onMousedown:t[0]||(t[0]=function(){return e.handleValueChange&&e.handleValueChange.apply(e,arguments)})},[(0,a.Wm)(d,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(s)]})),_:1})],34)),e.disabled?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("span",{key:1,role:"button","data-type":"increase",class:(0,u.normalizeClass)(["el-input-number__increase",{"is-disabled":e.modelValue>=e.max||e.disabled}]),onMousedown:t[1]||(t[1]=function(){return e.handleValueChange&&e.handleValueChange.apply(e,arguments)})},[(0,a.Wm)(d,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(p)]})),_:1})],34)),(0,a.Wm)(f,{modelValue:e.inputValue,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.inputValue=t}),class:"input-with-select",disabled:e.disabled,onFocus:e.handleInputFocus,onBlur:e.handleInputBlur,onInput:e.handleValueInput,onKeypress:e.validKeyCode},(0,a.Nv)({_:2},[e.disabled?void 0:{name:"suffix",fn:(0,a.w5)((function(){return[(0,a.Wm)(d,{class:"el-input-amount__copy",onClick:t[2]||(t[2]=function(t){return e.handleValueCopy(e.inputValue)})},{default:(0,a.w5)((function(){return[(0,a.Wm)(c)]})),_:1})]}))}]),1032,["modelValue","disabled","onFocus","onBlur","onInput","onKeypress"]),e.disabled?((0,a.wg)(),(0,a.iD)("span",{key:2,class:"el-input-amount__button",onClick:t[4]||(t[4]=function(t){return e.handleValueCopy(e.inputValue)})},[(0,a.Wm)(d,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(c)]})),_:1})])):(0,a.kq)("",!0)])};var d=(0,a.aZ)({name:"Number",extends:r.s,components:{TextInput:s},props:{title:{type:String,default:function(){return""}},required:{type:Boolean,default:function(){return!1}},placeholder:{type:String,default:function(){return""}}},data:function(){return{input:""}},computed:{isInputNumber:function(){var e=!1;return"int"!==this.extras.validType&&"float"!==this.extras.validType||(e=!0),e}},created:function(){this.setDefaultValue(),this.setRules()},methods:{setRules:function(){if(this.rules){var e=this.title;if(this.required&&this.rules.push({required:!0,message:"".concat(e,"不能为空"),trigger:"blur"}),this.extras){var t=parseInt(this.extras.minLength),n=parseInt(this.extras.maxLength);isNaN(t)||isNaN(n)?isNaN(t)?isNaN(n)||this.rules.push({validator:function(e,t,a){"string"==typeof t&&t.length&&t.length>n?a(new Error("最多可输入".concat(n,"个字符"))):a()},trigger:"blur"}):this.rules.push({validator:function(e,n,a){"string"==typeof n&&n.length&&n.length<t?a(new Error("至少输入".concat(t,"个字符"))):a()},trigger:"blur"}):this.rules.push({validator:function(e,a,u){"string"==typeof a&&a.length&&(a.length<t||a.length>n)?u(new Error("字符长度必须在".concat(t,"和").concat(n,"之间"))):u()},trigger:"blur"}),this.rules.push({validator:function(t,n,a){"string"==typeof n&&n.length&&n.length>128?a(new Error("".concat(e,"的长度不能大于128"))):a()},trigger:"change"})}}},setDefaultValue:function(){this.value||this.$emit("change",this.extras.defaultValue||0,this.id)}}});d.render=function(e,t,n,r,i,l){var s=(0,a.up)("el-input-number"),o=(0,a.up)("text-input"),d=(0,a.up)("el-form-item");return(0,a.wg)(),(0,a.j4)(d,{label:e.title,class:(0,u.normalizeClass)(e.required?"is-required":""),prop:e.validProp,rules:e.rules},{default:(0,a.w5)((function(){return[e.isInputNumber?((0,a.wg)(),(0,a.j4)(s,{key:0,modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.value=t}),min:e.extras.min||Number.NEGATIVE_INFINITY,max:e.extras.max||Number.POSITIVE_INFINITY,precision:e.extras.precision,step:e.extras.step,disabled:e.disabled},null,8,["modelValue","min","max","precision","step","disabled"])):((0,a.wg)(),(0,a.j4)(o,{key:1,modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.value=t}),type:e.extras.validType,min:e.extras.min||Number.NEGATIVE_INFINITY,max:e.extras.max||Number.POSITIVE_INFINITY,precision:e.extras.precision,step:e.extras.step,showText:e.extras.showText,disabled:e.disabled},null,8,["modelValue","type","min","max","precision","step","showText","disabled"]))]})),_:1},8,["label","class","prop","rules"])}}}]);