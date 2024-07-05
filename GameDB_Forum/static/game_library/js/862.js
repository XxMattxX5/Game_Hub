"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[862],{862:(e,t,a)=>{a.r(t),a.d(t,{default:()=>y});var n=a(6540),r=a(2567),s=a(8239),o=a(4073),l=a(2848),i=a(7059),m=a(6990),c=a(7767),g=a(4976),_=a(1105),u=a(8027),p=a(4147),d=a(1083),E=a(8987);function y(){const{logoutUser:e}=(0,p.A)(),t=(0,c.g)(),a=(0,c.Zp)(),[y,h]=(0,n.useState)(""),[w,A]=(0,n.useState)(""),[x,b]=(0,n.useState)(null),[f,k]=(0,n.useState)(""),[C,v]=(0,n.useState)([]),[S,T]=(0,n.useState)("");(0,n.useEffect)((()=>{N()}),[f]);const N=async()=>{if(f)try{const e=await d.A.get(`/igdb/get_suggestions/${f}`,{});v(e.data)}catch(e){console.error(e),console.error("Failed to fetch suggestions")}else v([])};return n.createElement(s.Ay,{container:!0,align:"center"},n.createElement(s.Ay,{item:!0,xs:6,id:"new_post_box"},n.createElement(g.N_,{to:`/forum/${t.type}`,id:"go_back_link"},n.createElement(u.Tsg,{size:50,color:"#1976D2"}),n.createElement(o.A,{marginLeft:"10px",color:"#1976d2"},"Go Back")),n.createElement(o.A,{variant:"h2",id:"create_post_header"},"Create a New Post"),n.createElement(l.A,{id:"search_error",in:""!=S},(()=>{if(""!=S)return n.createElement(r.A,{id:"create_post_alert",severity:"error",onClose:()=>{T("")}},S)})()),n.createElement(s.Ay,{item:!0,xs:12,margin:"0 auto"},n.createElement("label",{htmlFor:"new_post_title"},"Enter Title:"),n.createElement("input",{onChange:e=>{h(e.target.value)},maxLength:80,type:"text",name:"new_post_title",id:"new_post_title",placeholder:"Title"})),n.createElement(s.Ay,{item:!0,xs:12,margin:"20px auto"},"games"==t.type?x?n.createElement(s.Ay,{item:!0,className:"new_post_selected_game",backgroundColor:"white"},n.createElement("img",{className:"suggestion_image",src:x.cover_url?x.cover_url:"/static/game_library/images/no_image_found.webp"}),n.createElement(o.A,{className:"suggestion_name"},x.name),n.createElement(_.jkL,{size:30,style:{marginLeft:"auto",marginRight:"30px"},onClick:()=>{b(""),v([])},cursor:"pointer"})):n.createElement(s.Ay,{item:!0,sx:{"&:hover #new_post_game_suggestions":{display:"block"}}},n.createElement("label",{htmlFor:"new_post_game"},"Select a Game:"),n.createElement(i.A,{name:"new_post_game",id:"new_post_game",placeholder:"Look for Game",fullWidth:!0,sx:{backgroundColor:"white",borderRadius:"4px","& .MuiInputBase-input":{fontSize:18,height:12,padding:1},"&:focus-within + #new_post_game_suggestions":{display:"block"}},onChange:e=>{setTimeout((()=>(e=>{k(e.target.value)})(e)),500)}}),n.createElement(s.Ay,{id:"new_post_game_suggestions",backgroundColor:"white"},C.map((e=>n.createElement(s.Ay,{item:!0,key:e.game_id,onClick:()=>{b(e)},display:"flex",className:"new_post_suggestion"},n.createElement("img",{className:"suggestion_image",src:e.cover_url?e.cover_url:"/static/game_library/images/no_image_found.webp"}),n.createElement(o.A,{className:"suggestion_name"},e.name)))))):null),n.createElement(s.Ay,{item:!0,xs:12,margin:"0 auto"},n.createElement("label",{htmlFor:"new_post_text"},"Enter Text:"),n.createElement("textarea",{onChange:e=>{A(e.target.value)},id:"new_post_text",name:"new_post_text",placeholder:"Text"})),n.createElement(s.Ay,{item:!0,xs:12,margin:"0 auto"},n.createElement(m.A,{onClick:async()=>{try{await d.A.post("/api/post/",{postType:t.type,title:y,game:x?x.game_id:"",text:w},{headers:{"Content-Type":"application/json","X-CSRFToken":E.A.get("csrftoken")}});a(`/forum/${t.type}/`)}catch(t){401===t.response.status?e():(console.log(t.response),T(t.response.data.error))}},id:"create_post_button"},n.createElement(o.A,null,"Create Post")))))}}}]);