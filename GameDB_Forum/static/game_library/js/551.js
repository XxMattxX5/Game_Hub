"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[551],{2567:(e,t,r)=>{r.d(t,{A:()=>W});var o=r(8587),a=r(8168),n=r(6540),l=r(4164),s=r(4111),i=r(771),c=r(4409);var d=r(1848),p=r(4871),m=r(5489),u=r(3551),A=r(4856);const g=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],v=["component","slots","slotProps"],h=["component"];function f(e,t){const{className:r,elementType:n,ownerState:l,externalForwardedProps:s,getSlotOwnerState:i,internalForwardedProps:c}=t,d=(0,o.A)(t,g),{component:f,slots:y={[e]:void 0},slotProps:x={[e]:void 0}}=s,S=(0,o.A)(s,v),w=y[e]||n,C=(0,m.Y)(x[e],l),E=(0,u.p)((0,a.A)({className:r},d,{externalForwardedProps:"root"===e?S:void 0,externalSlotProps:C})),{props:{component:M},internalRef:j}=E,b=(0,o.A)(E.props,h),P=(0,p.A)(j,null==C?void 0:C.ref,t.ref),$=i?i(b):{},_=(0,a.A)({},l,$),k="root"===e?M||f:M,z=(0,A.X)(w,(0,a.A)({},"root"===e&&!f&&!y[e]&&c,"root"!==e&&!y[e]&&c,b,k&&{as:k},{ref:P}),_);return Object.keys($).forEach((e=>{delete z[e]})),[w,z]}var y=r(8466),x=r(538),S=r(7553),w=r(7245);function C(e){return(0,w.Ay)("MuiAlert",e)}const E=(0,S.A)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var M=r(1641),j=r(5003),b=r(4848);const P=(0,j.A)((0,b.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),$=(0,j.A)((0,b.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),_=(0,j.A)((0,b.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),k=(0,j.A)((0,b.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),z=(0,j.A)((0,b.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),L=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],I=c.A,R=(0,d.Ay)(x.A,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`${r.variant}${(0,y.A)(r.color||r.severity)}`]]}})((({theme:e})=>{const t="light"===e.palette.mode?i.e$:i.a,r="light"===e.palette.mode?i.a:i.e$;return(0,a.A)({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([o])=>({props:{colorSeverity:o,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${o}Color`]:t(e.palette[o].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${o}StandardBg`]:r(e.palette[o].light,.9),[`& .${E.icon}`]:e.vars?{color:e.vars.palette.Alert[`${o}IconColor`]}:{color:e.palette[o].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([r])=>({props:{colorSeverity:r,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),border:`1px solid ${(e.vars||e).palette[r].light}`,[`& .${E.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.dark)).map((([t])=>({props:{colorSeverity:t,variant:"filled"},style:(0,a.A)({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:"dark"===e.palette.mode?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)})})))]})})),F=(0,d.Ay)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),N=(0,d.Ay)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),O=(0,d.Ay)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),T={success:(0,b.jsx)(P,{fontSize:"inherit"}),warning:(0,b.jsx)($,{fontSize:"inherit"}),error:(0,b.jsx)(_,{fontSize:"inherit"}),info:(0,b.jsx)(k,{fontSize:"inherit"})},W=n.forwardRef((function(e,t){const r=I({props:e,name:"MuiAlert"}),{action:n,children:i,className:c,closeText:d="Close",color:p,components:m={},componentsProps:u={},icon:A,iconMapping:g=T,onClose:v,role:h="alert",severity:x="success",slotProps:S={},slots:w={},variant:E="standard"}=r,j=(0,o.A)(r,L),P=(0,a.A)({},r,{color:p,severity:x,variant:E,colorSeverity:p||x}),$=(e=>{const{variant:t,color:r,severity:o,classes:a}=e,n={root:["root",`color${(0,y.A)(r||o)}`,`${t}${(0,y.A)(r||o)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return(0,s.A)(n,C,a)})(P),_={slots:(0,a.A)({closeButton:m.CloseButton,closeIcon:m.CloseIcon},w),slotProps:(0,a.A)({},u,S)},[k,W]=f("closeButton",{elementType:M.A,externalForwardedProps:_,ownerState:P}),[B,H]=f("closeIcon",{elementType:z,externalForwardedProps:_,ownerState:P});return(0,b.jsxs)(R,(0,a.A)({role:h,elevation:0,ownerState:P,className:(0,l.A)($.root,c),ref:t},j,{children:[!1!==A?(0,b.jsx)(F,{ownerState:P,className:$.icon,children:A||g[x]||T[x]}):null,(0,b.jsx)(N,{ownerState:P,className:$.message,children:i}),null!=n?(0,b.jsx)(O,{ownerState:P,className:$.action,children:n}):null,null==n&&v?(0,b.jsx)(O,{ownerState:P,className:$.action,children:(0,b.jsx)(k,(0,a.A)({size:"small","aria-label":d,title:d,color:"inherit",onClick:v},W,{children:(0,b.jsx)(B,(0,a.A)({fontSize:"small"},H))}))}):null]}))}))},8551:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p});var o=r(6540),a=r(7767),n=r(4976),l=r(8239),s=r(4073),i=r(2567),c=r(6990),d=r(4147);function p(e){const{loginUser:t}=(0,d.A)(),r=(0,a.zy)(),[p,m]=(0,o.useState)(""),[u,A]=(0,o.useState)(""),[g,v]=(0,o.useState)(""),[h,f]=(0,o.useState)(!1);(0,o.useEffect)((()=>{new URLSearchParams(r.search).get("created")&&f(!0)}),[]);return o.createElement(l.Ay,{container:!0,alignContent:"center",justifyContent:"center"},o.createElement(l.Ay,{item:!0,xs:3,id:"login_block"},o.createElement(l.Ay,{item:!0,xs:12},o.createElement(s.A,{variant:"h2",id:"login_header"},"Login")),h?o.createElement(i.A,{id:"account_created_alert",severity:"success",onClose:()=>{f(!1)}},"Account was created successfully"):null,o.createElement(l.Ay,{item:!0,xs:12},o.createElement("label",{htmlFor:"login_username",align:"left"},"Username:"),o.createElement("input",{type:"text",id:"login_username",name:"login_username",placeholder:"Enter username",value:p,onChange:e=>{m(e.target.value)}})),o.createElement(l.Ay,{item:!0,xs:12},o.createElement("label",{htmlFor:"login_password"},"Password:"),o.createElement("input",{type:"password",id:"login_password",name:"login_password",placeholder:"Enter password",value:u,onChange:e=>{A(e.target.value)},autoComplete:"new-password"})),g?o.createElement(s.A,{color:"red"},g):null,o.createElement(l.Ay,{item:!0,xs:12},o.createElement(c.A,{id:"login_submit",onClick:async()=>{const e=await t(p,u);e&&v(e)}},"Login")),o.createElement(l.Ay,{item:!0,xs:12},o.createElement(l.Ay,{item:!0,id:"login_register",xs:7},o.createElement(s.A,null,"Don't have an account:"),o.createElement(n.N_,{id:"login_register_link",to:"/register/"},"Register")))))}}}]);