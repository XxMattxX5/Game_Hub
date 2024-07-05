"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[809],{4745:(e,t,a)=>{var s=a(4994);t.A=void 0;var r=s(a(2032)),n=a(4848);t.A=(0,r.default)((0,n.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search")},2032:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s.createSvgIcon}});var s=a(4444)},8363:(e,t,a)=>{a.d(t,{A:()=>k});var s=a(8587),r=a(8168),n=a(6540),o=a(4164),i=a(4111),l=a(771),c=a(1848),m=a(9770),d=a(4409),p=a(2850),u=a(6606),g=a(2778),y=a(6852),v=a(7553);const h=(0,v.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);const A=(0,v.A)("MuiListItemIcon",["root","alignItemsFlexStart"]);const _=(0,v.A)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var b=a(7245);function f(e){return(0,b.Ay)("MuiMenuItem",e)}const E=(0,v.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var x=a(4848);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],$=(0,c.Ay)(u.A,{shouldForwardProp:e=>(0,m.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,r.A)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${E.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${E.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${E.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${E.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${E.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${h.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${h.inset}`]:{marginLeft:52},[`& .${_.root}`]:{marginTop:0,marginBottom:0},[`& .${_.inset}`]:{paddingLeft:36},[`& .${A.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,r.A)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${A.root} svg`]:{fontSize:"1.25rem"}})))),k=n.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:c="li",dense:m=!1,divider:u=!1,disableGutters:v=!1,focusVisibleClassName:h,role:A="menuitem",tabIndex:_,className:b}=a,E=(0,s.A)(a,C),k=n.useContext(p.A),w=n.useMemo((()=>({dense:m||k.dense||!1,disableGutters:v})),[k.dense,m,v]),N=n.useRef(null);(0,g.A)((()=>{l&&N.current&&N.current.focus()}),[l]);const S=(0,r.A)({},a,{dense:w.dense,divider:u,disableGutters:v}),I=(e=>{const{disabled:t,dense:a,divider:s,disableGutters:n,selected:o,classes:l}=e,c={root:["root",a&&"dense",t&&"disabled",!n&&"gutters",s&&"divider",o&&"selected"]},m=(0,i.A)(c,f,l);return(0,r.A)({},l,m)})(a),M=(0,y.A)(N,t);let O;return a.disabled||(O=void 0!==_?_:-1),(0,x.jsx)(p.A.Provider,{value:w,children:(0,x.jsx)($,(0,r.A)({ref:M,role:A,tabIndex:O,component:c,focusVisibleClassName:(0,o.A)(I.focusVisible,h),className:(0,o.A)(I.root,b)},E,{ownerState:S,classes:I}))})}))},4444:(e,t,a)=>{a.r(t),a.d(t,{capitalize:()=>r.A,createChainedFunction:()=>n,createSvgIcon:()=>o.A,debounce:()=>i.A,deprecatedPropType:()=>l,isMuiElement:()=>c.A,ownerDocument:()=>m.A,ownerWindow:()=>d.A,requirePropFactory:()=>p,setRef:()=>u,unstable_ClassNameGenerator:()=>f,unstable_useEnhancedEffect:()=>g.A,unstable_useId:()=>y,unsupportedProp:()=>v,useControlled:()=>h.A,useEventCallback:()=>A.A,useForkRef:()=>_.A,useIsFocusVisible:()=>b.A});var s=a(2067),r=a(8466);const n=a(9941).A;var o=a(5003),i=a(1935);const l=function(e,t){return()=>null};var c=a(5602),m=a(6248),d=a(3749);a(8168);const p=function(e,t){return()=>null};const u=a(3721).A;var g=a(2778);const y=a(4953).A;const v=function(e,t,a,s,r){return null};var h=a(7548),A=a(3034),_=a(6852),b=a(873);const f={configure:e=>{s.A.configure(e)}}},8267:(e,t,a)=>{a.d(t,{A:()=>g});var s=a(6540),r=a(7767),n=a(4976),o=a(8239),i=a(4073),l=a(7059),c=a(5780),m=a(8363),d=a(1641),p=a(4745),u=a(1083);function g(e){const t=(0,r.zy)();let a=new URLSearchParams(t.search);const[g,y]=(0,s.useState)(""),v=e.suggestionType?"generalposts"==e.suggestionType?"general":"games":"game",[h,A]=(0,s.useState)(a.get("sort")?a.get("sort"):"sort_by"),_=e.sortOpts?e.sortOpts:{},b=e.searchMessage?e.searchMessage:"",[f,E]=(0,s.useState)([]);(0,s.useEffect)((()=>{x()}),[g,t.pathname]);const x=async()=>{if(!g)return void E([]);let e;e="games"==v||"general"==v?`/api/get_suggestions/${g}?type=${v}`:`/igdb/get_suggestions/${g}`;try{const t=await u.A.get(e);E(t.data)}catch(e){throw new Error("Failed to fetch suggestions")}};return s.createElement(o.Ay,{container:!0,id:"search_bar"},s.createElement(o.Ay,{item:!0,xs:3,id:"search_message_box"},s.createElement(i.A,{variant:"h4",id:"search_message"},b)),s.createElement(o.Ay,{item:!0,xs:8,id:"search_box"},s.createElement(o.Ay,{item:!0,xs:7,id:"search_input",sx:{"&:hover #suggestion_dropdown":{display:"block"}}},s.createElement(l.A,{fullWidth:!0,sx:{"& .MuiInputBase-input":{height:10},"&:focus-within + #suggestion_dropdown":{display:"block"}},placeholder:e.searchMessage?e.searchMessage:"",onChange:e=>{setTimeout((()=>(e=>{y(e.target.value)})(e)),500)}}),s.createElement(o.Ay,{item:!0,id:"suggestion_dropdown",zIndex:1},f.map((t=>s.createElement(o.Ay,{item:!0,key:"general"==v||"games"==v?t.id:t.game_id,className:"suggestion"},s.createElement(n.N_,{className:"suggestion_link",to:"general"==v||"games"==v?`/forum/general/post/${t.id}`:`/game/${t.game_id}`},e.suggestionType?null:s.createElement("img",{className:"suggestion_image",src:t.cover_url?t.cover_url:"/static/game_library/images/no_image_found.webp"}),s.createElement(i.A,{className:"suggestion_name"},e.suggestionType?t.title:t.name))))))),s.createElement(o.Ay,{item:!0,id:"search_button"},s.createElement(d.A,{size:"small",id:"search_button_icon",onClick:()=>{e.searchClickCallBack(g)}},s.createElement(p.A,null))),s.createElement(o.Ay,{item:!0,id:"sort_by"},s.createElement(c.A,{size:"small",fullWidth:!0,value:h,onChange:t=>{A(t.target.value),e.sortCallBack(t.target.value)}},_.map((e=>s.createElement(m.A,{key:e.value,value:e.value},e.text)))))))}},5809:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var s=a(6540),r=a(7767),n=a(4976),o=a(8239),i=a(4073),l=a(6990),c=a(8267),m=a(6973),d=a(8027),p=a(6179),u=a(1083);function g(e){const t=(0,r.Zp)(),a=(0,r.zy)(),g=new URLSearchParams(a.search),y=g.get("search")?g.get("search"):"",v=g.get("page")?g.get("page"):1,h=g.get("sort")?g.get("sort"):"sort_by",[A,_]=(0,s.useState)([]),[b,f]=(0,s.useState)([]);(0,s.useEffect)((()=>{x(e.type),window.scrollTo(0,0)}),[a.search]);const E=(a=y,s=v,r=h)=>{let n=`/forum/${"general"==e.type?e.type:"games"}/?page=${s}`;a&&(n+=`&search=${a}`),r&&"sort_by"!=r&&(n+=`&sort=${r}`),t(n)},x=async e=>{try{const t=await u.A.get(`/api/get_posts?type=${e}&search=${y}&page=${v}&amount=10&sort=${h}`);f(t.data.pages),_(t.data.posts)}catch(e){throw new Error("Failed to fetch posts")}},C=e=>{e>0&&e<=parseInt(b[b.length-1])&&E(void 0,e,void 0)};return s.createElement(o.Ay,{container:!0},s.createElement(c.A,{searchMessage:"general"==e.type?"Search For General Posts":"Search For Game Posts",sortCallBack:e=>{E(void 0,void 0,e)},searchClickCallBack:e=>{E(e,1,"sort_by")},sortOpts:[{value:"sort_by",text:"Sort By"},{value:"title",text:"Title"},{value:"created_at",text:"Created"}],suggestionType:"general"==e.type?"generalposts":"gameposts"}),s.createElement(o.Ay,{item:!0,xs:6,margin:"0 auto",id:"post_list_box"},s.createElement(o.Ay,{item:!0,xs:12,id:"post_list_content_box"},s.createElement(n.N_,{to:"/forum/",id:"go_back_link"},s.createElement(d.Tsg,{size:50,color:"#1976D2"}),s.createElement(i.A,{marginLeft:"10px",color:"#1976d2"},"Go Back")),s.createElement(i.A,{variant:"h2",id:"post_list_header"},"game"==e.type?"Game Posts":"General Posts"),s.createElement(n.N_,{style:{textDecoration:"none"},to:"general"==e.type?"/forum/general/createpost":"/forum/games/createpost"},s.createElement(o.Ay,{item:!0,xs:12,id:"new_post_link"},s.createElement(i.A,{variant:"h4"},"Create New Post"))),A.map((t=>{return s.createElement(o.Ay,{item:!0,xs:12,key:t.id,className:"post"},s.createElement(o.Ay,{item:!0,xs:12,className:"post_head"},s.createElement(o.Ay,{item:!0,xs:12,className:"post_headers"},s.createElement(i.A,{className:"post_username"},t?t.author_username:""),t?s.createElement("span",{className:"post_header_divider"},"|"):null,s.createElement(i.A,{className:"post_created"},t.created_at?(a=t.created_at,"Posted "+(a=(0,p.B)(new Date(a),{addSuffix:!1}))+" ago"):""),t.game?s.createElement("span",{className:"post_header_divider"},"|"):null,s.createElement(o.Ay,{item:!0,className:"post_game"},"game"==e.type?s.createElement(i.A,{className:"post_game_name"},t.game?t.game.name:""):null,t.game?s.createElement(n.N_,{to:`/game/${t.game.game_id}`},s.createElement(o.Ay,{item:!0,display:"flex",className:"post_game_info"},s.createElement("img",{className:"post_game_image",src:t.game.cover_url?t.game.cover_url:"/static/game_library/images/no_image_found.webp"}),s.createElement(i.A,{className:"post_game_text"},(t.game.storyline?t.game.storyline:t.game.summary)?t.game.storyline?t.game.storyline:t.game.summary:"No Storyline/Summary"))):null,s.createElement(o.Ay,{item:!0}))),s.createElement(o.Ay,{item:!0,xs:12},s.createElement(i.A,{className:"post_title"},t?t.title:""))),s.createElement(o.Ay,{item:!0,xs:12,className:"post_text"},s.createElement(i.A,{variant:"p"},t?t.text:""),s.createElement(n.N_,{className:"post_links",to:"general"==e.type?`/forum/general/post/${t.id}`:`/forum/games/post/${t.id}`},"View Post")));var a})),s.createElement(o.Ay,{item:!0,align:"center",margin:"20px 0px"},s.createElement(l.A,{onClick:()=>{C(parseInt(v)-1)}},s.createElement(m.szp,{size:30})),b.map((e=>s.createElement(l.A,{key:e,onClick:()=>{C(e)},className:parseInt(e)==parseInt(v)?"current_page":null},e))),s.createElement(l.A,{onClick:()=>{C(parseInt(v)+1)}},s.createElement(m.VC6,{size:30}))))))}}}]);