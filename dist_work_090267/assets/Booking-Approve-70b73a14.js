import{_ as b,v as f,H as S,J as B,K as k,o as s,c as n,L as i,M as o,r as h,O as u,Q as F,P as r,N as V,R as p,S as C}from"./index-6978ad6a.js";import{x as y,y as L,z as D,B as T,V as $}from"./VSnackbar-80b7c556.js";const I={data:()=>({snackBar:{showSnackBar:!1,titleSnackBar:"",colorSnackBar:"",iconSnackBar:""},changeStatus:!1,dataID:[],columns:[{key:"name",title:"ชื่อ-นามสกุล",dataIndex:"name",align:"center"},{key:"phone",title:"เบอร์",dataIndex:"phone",align:"center"},{key:"where_lab",title:"ห้อง",dataIndex:"where_lab",align:"center"},{key:"timebook",title:"เวลาที่กดจอง",dataIndex:"timebook",align:"center"},{key:"start_date",title:"เริ่มใช้เวลา",dataIndex:"start_date",align:"center"},{key:"end_date",title:"ถึง",dataIndex:"end_date",align:"center"},{key:"appove_status",title:"สถานะ",dataIndex:"appove_status",align:"center"}],approveStatus_Value:0,approveStatus:[{name:"รออนุมัติ",value:0},{name:"อนุมัติ",value:1},{name:"ไม่อนุมัติ",value:2}]}),setup(){return{dataLoad:f([])}},mounted(){this.approveStatus[0].name=this.languageForShow.status.wait,this.approveStatus[1].name=this.languageForShow.status.allow,this.approveStatus[2].name=this.languageForShow.status.not_Allowed,this.$store.getters.userData==null||this.$store.getters.userData==""||this.$store.getters.userData==null?this.$router.push({name:"Login"}):this.getRoomLab()},methods:{alertShow(e,t,l,c){this.snackBar={showSnackBar:e,titleSnackBar:t,colorSnackBar:l,iconSnackBar:c}},formatdate(e){const t=e,l=new Date(t),_=["(Sun.)","(Mon.)","(Tue.)","(Wed.)","(Thu.)","(Fri.)","(Sat.)"][l.getDay()],g=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!0});return`${_} ${l.getDate()}/${l.getMonth()+1}/${l.getFullYear()} (${g})`},getStatusButtonStyle(e){switch(e){case 0:return{backgroundColor:"orange"};case 1:return{backgroundColor:"lightgreen"};case 2:return{backgroundColor:"lightcoral"};default:return{}}},getStatusLabel(e){switch(e){case 0:return this.languageForShow.status.wait;case 1:return this.languageForShow.status.allow;case 2:return this.languageForShow.status.not_Allowed;default:return""}},async getRoomLab(){const e=await y.getBookingLab();e.forEach(t=>{t.start_date=this.formatdate(t.start_date),t.end_date=this.formatdate(t.end_date),t.timebook=this.formatdate(t.timebook)}),this.dataLoad=e},selectRow(e){this.changeStatus=!0,this.dataID=e.id,this.approveStatus_Value=e.appove_status},async updateApproveStatus(){this.changeStatus=!1;const e=await y.updateApproveStatus(this.dataID,this.approveStatus_Value);setTimeout(async()=>{e.data.msg==="ok"?(S.success("save data is success"),this.getRoomLab()):S.error("error can not to save")},1500)}},computed:{...B(["formLanguge"]),languageForShowComputed(){return this.formLanguge||this.languageForShow}},watch:{languageForShowComputed:{handler(e){this.languageForShow=e},immediate:!0}}},A={class:"fontSarabun container text-center"},R={class:"text-bold mt-3 text-indigo-darken-4"},N={class:"table-responsive"},M={key:0},O={key:1},U={key:2},z={key:3},E={key:4},P={key:5},G={key:6},H={key:0,style:{color:"#3F51B5"}},J={key:1,style:{color:"#00BFA5"}},K={key:2,style:{color:"#F57C00"}},Q={key:3,style:{color:"#F57C00"}},W={class:"p-2 text-left"},Y={class:"text-center"};function q(e,t,l,c,_,g){const m=k("a-button"),v=k("a-table"),w=k("a-modal");return s(),n(F,null,[i("div",A,[i("div",null,[i("h1",R,o(e.languageForShow.nameApprove),1)]),h(L,null,{default:u(()=>[i("div",N,[h(v,{columns:e.columns,"data-source":c.dataLoad},{headerCell:u(({column:a})=>[a.key==="name"?(s(),n("span",M,o(e.languageForShow.headerTable.name),1)):r("",!0),a.key==="phone"?(s(),n("span",O,o(e.languageForShow.headerTable.tel),1)):r("",!0),a.key==="where_lab"?(s(),n("span",U,o(e.languageForShow.headerTable.room),1)):r("",!0),a.key==="timebook"?(s(),n("span",z,o(e.languageForShow.headerTable.sentTime),1)):r("",!0),a.key==="start_date"?(s(),n("span",E,o(e.languageForShow.headerTable.startTime),1)):r("",!0),a.key==="end_date"?(s(),n("span",P,o(e.languageForShow.headerTable.endTime),1)):r("",!0),a.key==="appove_status"?(s(),n("span",G,o(e.languageForShow.headerTable.status),1)):r("",!0)]),bodyCell:u(({column:a,record:d})=>[a.key==="name"?(s(),n("div",H,o(d.name),1)):r("",!0),a.key==="where_lab"?(s(),n("div",J,o(d.where_lab),1)):r("",!0),a.key==="start_date"?(s(),n("div",K,o(d.start_date),1)):r("",!0),a.key==="end_date"?(s(),n("div",Q,o(d.end_date),1)):r("",!0),a.key==="appove_status"?(s(),V(m,{key:4,class:"custom-button",onClick:X=>g.selectRow(d),style:C(g.getStatusButtonStyle(d.appove_status))},{default:u(()=>[p(o(g.getStatusLabel(d.appove_status)),1)]),_:2},1032,["onClick","style"])):r("",!0)]),_:1},8,["columns","data-source"])])]),_:1}),i("div",W,[h(m,{style:{"background-color":"lightcoral"},onClick:t[0]||(t[0]=a=>e.$router.push({name:"Mb_Lab"}))},{default:u(()=>[p(o(this.languageForShow.btn.backPage),1)]),_:1})])]),i("div",null,[h(w,{open:e.changeStatus,"onUpdate:open":t[2]||(t[2]=a=>e.changeStatus=a),title:"เปลี่ยนสถานะ",onCancel:t[3]||(t[3]=a=>e.changeStatus===!1),onOk:t[4]||(t[4]=a=>g.updateApproveStatus())},{default:u(()=>[h(T,{modelValue:e.approveStatus_Value,"onUpdate:modelValue":t[1]||(t[1]=a=>e.approveStatus_Value=a),items:e.approveStatus,"item-value":"value","item-title":"name",outlined:"","hide-details":"",dense:""},null,8,["modelValue","items"])]),_:1},8,["open"])]),h(D,{modelValue:e.snackBar.showSnackBar,"onUpdate:modelValue":t[5]||(t[5]=a=>e.snackBar.showSnackBar=a),timeout:3e3,top:""},{default:u(()=>[i("div",Y,[p(o(e.snackBar.titleSnackBar)+" ",1),h($,{large:"",class:"ml-1",color:e.snackBar.colorSnackBar},{default:u(()=>[p(o(e.snackBar.iconSnackBar),1)]),_:1},8,["color"])])]),_:1},8,["modelValue"])],64)}const j=b(I,[["render",q],["__scopeId","data-v-e828a038"]]);export{j as default};
