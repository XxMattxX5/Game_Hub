"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[945],{945:(e,r,t)=>{t.r(r),t.d(r,{default:()=>m});var a=t(6540),s=t(7767),n=t(8239),l=t(4073),i=t(6990),o=t(4147);function m(e){const{register:r}=(0,o.A)(),t=(0,s.zy)(),m=(0,s.Zp)(),[c,u]=(0,a.useState)(""),[g,p]=(0,a.useState)(""),[d,E]=(0,a.useState)(""),[_,h]=(0,a.useState)(""),[w,f]=(0,a.useState)(!1),[y,A]=(0,a.useState)({error1:"",error2:"",error3:"",error4:"",error5:""});(0,a.useEffect)((()=>{w&&m("/login?created=true")})),(0,a.useEffect)((()=>{const r=new URLSearchParams(t.search).get("redirectTo");e.isAuth&&m(null==r?"/":r)}),[e.isAuth]);return a.createElement(n.Ay,{container:!0,alignContent:"center",justifyContent:"center"},a.createElement(n.Ay,{item:!0,xs:3,id:"login_block"},a.createElement(n.Ay,{item:!0,xs:12},a.createElement(l.A,{variant:"h2",id:"login_header"},"Register")),a.createElement(n.Ay,{item:!0,xs:12},a.createElement("label",{htmlFor:"register_username",align:"left"},"Username:"),a.createElement("input",{className:"register_inputs",type:"text",id:"register_username",name:"register_username",placeholder:"Enter username",value:c,onChange:function(e){u(e.target.value)}}),a.createElement(l.A,{variant:"span",className:"register_errors"},y.error1)),a.createElement(n.Ay,{item:!0,xs:12},a.createElement("label",{htmlFor:"register_email",align:"left"},"Email:"),a.createElement("input",{className:"register_inputs",type:"email",id:"register_email",name:"register_email",placeholder:"Enter email",value:g,onChange:function(e){p(e.target.value)}})),a.createElement(l.A,{variant:"span",className:"register_errors"},y.error2),a.createElement(n.Ay,{item:!0,xs:12},a.createElement("label",{htmlFor:"register_password1"},"Password:"),a.createElement("input",{className:"register_inputs",type:"password",id:"register_password1",name:"register_password1",placeholder:"Enter password",value:d,onChange:function(e){E(e.target.value)},autoComplete:"new-password"})),a.createElement(l.A,{variant:"span",className:"register_errors"},y.error3),a.createElement(n.Ay,{item:!0,xs:12},a.createElement("label",{htmlFor:"register_password2"},"Confirm Password:"),a.createElement("input",{className:"register_inputs",type:"password",id:"register_password2",name:"register_password2",placeholder:"Confirm Password",value:_,onChange:function(e){h(e.target.value)},autoComplete:"new-password"})),a.createElement(l.A,{variant:"span",className:"register_errors"},y.error4),a.createElement(n.Ay,{item:!0,xs:12},a.createElement(i.A,{id:"register_submit",onClick:async()=>{const e=await r(c,g,d,_);"Success"==e?f(!0):A((r=>({...r,error1:e.error1,error2:e.error2,error3:e.error3,error4:e.error4,error5:e.error5})))}},"Register"))))}}}]);