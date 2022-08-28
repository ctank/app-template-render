"use strict";(self.webpackChunkapp_template_builder=self.webpackChunkapp_template_builder||[]).push([[605],{23454:function(t,e,n){n.d(e,{s:function(){return a}});n(77950),n(85940),n(39529),n(31235);var i=n(48488),o=n(27875),a={name:"ViewComponentBase",components:{},inject:["onChange","onGetValue","onEvent"],props:{id:{type:String,default:function(){return""}},type:{type:String,default:function(){return""}},extras:{type:Object,default:function(){return{}}},showTitle:{type:Boolean,default:function(){return!1}},title:{type:String,default:function(){return""}},dataPath:{type:String,default:function(){return""}},componentMap:{type:Object,default:function(){return{}}},viewData:{type:Object,default:function(){return{}}},permissions:{type:Array,default:function(){return["*"]}}},data:function(){return{}},computed:{value:{get:function(){var t="";return this.viewData&&this.dataPath&&(t=(0,i.g)(this.viewData,this.dataPath)),t},set:function(t){this.$emit("change",t,this.id)}},validProp:function(){return this.fieldPath.replace(/\//g,".")},isAdmin:function(){return!(this.permissions&&(!Array.isArray(this.permissions)||"*"!==this.permissions[0]))}},watch:{},methods:{checkPermission:function(t){return!(t&&!this.permissions.includes(t))}},render:function(t,e,n,i,a,r){return(0,o.wg)(),(0,o.iD)("div")}}},90605:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});n(18178),n(77950),n(21850),n(85940),n(32501),n(68995),n(16781),n(49228),n(58188);var i=n(27875),o=n(50349),a=n(23454),r=n(48488),l={name:"Tag",props:{color:{type:String,default:function(){return"#000000"}},hit:{type:Boolean,default:function(){return!1}}},computed:{style:function(){return"color:".concat(this.color,";background-color:").concat(this.hex2Rgba(this.color,.1),";")}},methods:{hex2Rgba:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(t)){var n=t.toLowerCase().replace(/\#/g,""),i=n.length;if(3==i){for(var o="",a=0;a<i;a++)o+=n.slice(a,a+1).concat(n.slice(a,a+1));n=o}var r=[];for(a=0;a<6;a+=2){var l=n.slice(a,a+2);r.push(parseInt("0x"+l))}return"rgba(".concat(r.join(","),",").concat(e,")")}}},render:function(t,e,n,a,r,l){return(0,i.wg)(),(0,i.iD)("span",{class:"atp-tag",style:(0,o.normalizeStyle)(l.style)},[(0,i.WI)(t.$slots,"default")],4)}},u=n(28879),c=(0,i.aZ)({name:"ColumnContent",components:{Tag:l},props:{row:{type:Object,default:function(){return null}},column:{type:Object,default:function(){return null}}},computed:{config:function(){var t=this.row[this.column.fieldPath]||"",e={content:"",isTag:!1,color:""};if("text"===this.column.fieldType)e.content=t;else if("datetime"===this.column.fieldType)e.content=u(t).format(this.column.format||"YYYY-MM-DD HH:mm:ss");else if("option"===this.column.fieldType){var n=(this.column.options||[]).find((function(e){return e.value===t}));n&&(e.content=n.label,n.color&&(e.isTag=!0,e.color=n.color))}return e}}}),s={class:"atp-listview__column"},p={key:0};c.render=function(t,e,n,a,r,l){var u=(0,i.up)("tag");return(0,i.wg)(),(0,i.iD)("div",s,[t.config.isTag?((0,i.wg)(),(0,i.j4)(u,{key:1,color:t.config.color},{default:(0,i.w5)((function(){return[(0,i.Uk)((0,o.toDisplayString)(t.config.content),1)]})),_:1},8,["color"])):((0,i.wg)(),(0,i.iD)("span",p,(0,o.toDisplayString)(t.config.content),1))])};var f=(0,i.aZ)({name:"ListView",extends:a.s,components:{ColumnContent:c},data:function(){return{}},computed:{tableStyle:function(){var t={border:!1,stripe:!1};switch(this.extras.tableStyle){case"borderNoStripe":t.border=!0,t.stripe=!1;break;case"borderStripe":t.border=!0,t.stripe=!0;break;case"noBorderNoStripe":t.border=!1,t.stripe=!1;break;case"noBorderStripe":t.border=!1,t.stripe=!0}return t},pagination:function(){return this.viewData.pagination?this.viewData.pagination:{total:0,pageSize:10,currentPage:1}}},methods:{getComponentDisplay:function(t,e){return(0,r.k)(e.showConfig,t)},handleBtnClick:function(t){var e={};if(this.extras.checkBox){var n=this.$refs.listViewTable;e.selections=n.getSelectionRows()||[]}this.onEvent(t,e)},handleColBtnClick:function(t,e){this.onEvent(t,e)},handlePaginationCurrentChange:function(t){this.onEvent("currentChange",t)},handlePaginationSizeChange:function(t){this.onEvent("sizeChange",t)}}}),g={class:"atp-listview"},d={class:"atp-listview__action"},h={key:0,class:"atp-listview__title"};f.render=function(t,e,n,a,r,l){var u=(0,i.up)("el-button"),c=(0,i.up)("el-table-column"),s=(0,i.up)("column-content"),p=(0,i.up)("el-table"),f=(0,i.up)("el-pagination");return(0,i.wg)(),(0,i.iD)("div",g,[(0,i._)("div",d,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.extras.operations,(function(e){return(0,i.wg)(),(0,i.iD)(i.HY,null,[t.isAdmin||t.checkPermission(e.permission)?((0,i.wg)(),(0,i.j4)(u,{key:e.buttonEvent,type:e.buttonType,onClick:function(n){return t.handleBtnClick(e.buttonEvent)}},{default:(0,i.w5)((function(){return[(0,i.Uk)((0,o.toDisplayString)(e.buttonName),1)]})),_:2},1032,["type","onClick"])):(0,i.kq)("",!0)],64)})),256))]),t.showTitle?((0,i.wg)(),(0,i.iD)("div",h,(0,o.toDisplayString)(t.title),1)):(0,i.kq)("",!0),(0,i.Wm)(p,{data:t.viewData[t.dataPath],style:{width:"100%"},border:t.tableStyle.border,stripe:t.tableStyle.stripe,ref:"listViewTable"},{default:(0,i.w5)((function(){return[t.extras.checkBox?((0,i.wg)(),(0,i.j4)(c,{key:0,type:"selection",fixed:"left",width:40,align:"center"})):(0,i.kq)("",!0),t.extras.showNum?((0,i.wg)(),(0,i.j4)(c,{key:1,label:"序号",fixed:"left",width:60,align:"center"},{default:(0,i.w5)((function(t){var e=t.$index;return[(0,i.Uk)((0,o.toDisplayString)(e+1),1)]})),_:1})):(0,i.kq)("",!0),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.extras.columns,(function(e,n){return(0,i.wg)(),(0,i.iD)(i.HY,null,["field"===e.type?((0,i.wg)(),(0,i.j4)(c,{key:"field-".concat(n),label:e.label,width:e.width||"",align:e.align||"left"},{default:(0,i.w5)((function(t){var n=t.row;t.$index;return[(0,i.Wm)(s,{row:n,column:e},null,8,["row","column"])]})),_:2},1032,["label","width","align"])):((0,i.wg)(),(0,i.j4)(c,{fixed:"right",key:"button-".concat(n),label:e.label,width:e.width||"",align:e.align||"left"},{default:(0,i.w5)((function(n){var a=n.row;n.$index;return[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.actionConfig,(function(e){return(0,i.wg)(),(0,i.iD)(i.HY,null,[t.getComponentDisplay(a,e)&&(t.isAdmin||t.checkPermission(e.permission))?((0,i.wg)(),(0,i.j4)(u,{key:e.buttonEvent,type:e.buttonType,link:"",onClick:function(n){return t.handleColBtnClick(e.buttonEvent,a)}},{default:(0,i.w5)((function(){return[(0,i.Uk)((0,o.toDisplayString)(e.buttonName),1)]})),_:2},1032,["type","onClick"])):(0,i.kq)("",!0)],64)})),256))]})),_:2},1032,["label","width","align"]))],64)})),256))]})),_:1},8,["data","border","stripe"]),t.extras.showPagination?((0,i.wg)(),(0,i.j4)(f,{key:1,small:"",background:"",class:"atp-listview__pagination","page-sizes":t.extras.pageSize,layout:"sizes, prev, pager, next",total:t.pagination.total,currentPage:t.pagination.currentPage,"onUpdate:currentPage":e[0]||(e[0]=function(e){return t.pagination.currentPage=e}),pageSize:t.pagination.pageSize,"onUpdate:pageSize":e[1]||(e[1]=function(e){return t.pagination.pageSize=e}),onSizeChange:t.handlePaginationSizeChange,onCurrentChange:t.handlePaginationCurrentChange},null,8,["page-sizes","total","currentPage","pageSize","onSizeChange","onCurrentChange"])):(0,i.kq)("",!0)])}},16781:function(t,e,n){var i=n(23103),o=n(65968),a=n(9337),r=n(10905),l=n(96038),u=o([].join),c=a!=Object,s=l("join",",");i({target:"Array",proto:!0,forced:c||!s},{join:function(t){return u(r(this),void 0===t?",":t)}})}}]);