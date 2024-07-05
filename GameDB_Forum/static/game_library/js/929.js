"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[929],{6929:(e,t,a)=>{a.r(t),a.d(t,{default:()=>A});var r=a(6540),l=a(8267),s=a(2567),i=a(8239),n=a(2848),c=a(4073),m=a(6990),g=a(5780),o=a(8363),f=a(4977),u=a(9386),_=a.n(u),d=(a(596),a(7767)),h=a(4976),E=a(6973),p=a(1105),y=a(1083);function A(){const e=(0,d.zy)(),t=(0,d.Zp)();let a=new URLSearchParams(e.search);const u=a.get("search")?a.get("search"):"";let A=a.get("page")?a.get("page"):1;const v=a.get("sort")?a.get("sort"):"sort_by";let b={filter1:a.get("filter1")?a.get("filter1"):null,filter2:a.get("filter2")?a.get("filter2"):null,filter3:a.get("filter3")?a.get("filter3"):"genre",filter4:a.get("filter4")?a.get("filter4"):""};const[k,C]=(0,r.useState)(""),[N,w]=(0,r.useState)([]),[$,x]=(0,r.useState)([]),[S,M]=(0,r.useState)([]);(0,r.useEffect)((()=>{Y(u,A,v,b)}),[e.search]),(0,r.useEffect)((()=>{window.scrollTo(0,0)}),[N]);const z=(e=u,a=A,r=v,l=b)=>{let s=`/games/?page=${a}`;e&&(s+=`&search=${e}`),r&&"sort_by"!=r&&(s+=`&sort=${r}`),l.filter1&&(s+=`&filter1=${l.filter1}`),l.filter2&&(s+=`&filter2=${l.filter2}`),l.filter3&&"genre"!=l.filter3&&(s+=`&filter3=${l.filter3}`),l.filter4&&(s+=`&filter4=${l.filter4}`),t(s)},Y=async(e,t,a,r)=>{try{const l=await y.A.get(`/igdb/get_games?search=${e}&page=${t}&filter1=${r.filter1}&filter2=${r.filter2}&filter3=${r.filter3}&filter4=${r.filter4}&sort=${a}`);w(l.data.data),x(l.data.pages),M(l.data.genres)}catch(e){C(e.response.data.error)}},T=e=>{e>0&&e<=$[$.length-1]&&z(void 0,e,void 0,void 0)},B=(e,t)=>{if(("filter1"==t||"filter2"==t)&&null!=e){let t=new Date(e);e=String(t.getMonth()+1)+"/"+String(t.getDate())+"/"+String(t.getFullYear())}"filter3"!=t&&"filter4"!=t||(e=e.target.value),"filter1"==t?b.filter1=e:"filter2"==t?b.filter2=e:"filter3"==t?b.filter3=e:"filter4"==t&&(b.filter4=e),A=1,z()};return r.createElement(i.Ay,{container:!0,spacing:2},r.createElement(i.Ay,{item:!0,xs:12},r.createElement(l.A,{searchMessage:"Search For Games",sortCallBack:e=>{z(void 0,void 0,e,void 0)},searchClickCallBack:e=>{z(e,1,"sort_by",{filter1:null,filter2:null,filter3:"genre",filter4:""})},sortOpts:[{value:"sort_by",text:"Sort By"},{value:"name",text:"Name"},{value:"first_released",text:"Release"}]}),r.createElement(n.A,{id:"search_error",in:""!=k},(()=>{if(""!=k)return r.createElement(s.A,{severity:"error",onClose:()=>{C("")}},k)})()),r.createElement(i.Ay,{item:!0,id:"games_content"},r.createElement(i.Ay,{item:!0,xs:2,id:"games_filter_container",align:"center"},r.createElement(c.A,{variant:"h4",id:"filters_header"},"Filters"),r.createElement(i.Ay,{item:!0,className:"filters"},r.createElement(c.A,{className:"filter_labels",id:"filter1_label"},"Release Before"),r.createElement(i.Ay,{item:!0,className:"filter_input_box"},r.createElement(_(),{placeholderText:"MM/DD/YYYY",isClearable:!0,id:"filter1",value:b.filter1,onChange:e=>B(e,"filter1")}),b.filter1&&r.createElement(m.A,{className:"filter_clear_button",onClick:()=>{B(null,"filter1")}},r.createElement(p.y1J,null)))),r.createElement(i.Ay,{item:!0,className:"filters"},r.createElement(c.A,{className:"filter_labels",id:"filter2_label"},"Release After"),r.createElement(i.Ay,{item:!0,className:"filter_input_box"},r.createElement(_(),{placeholderText:"MM/DD/YYYY",isClearable:!0,id:"filter2",value:b.filter2,onChange:e=>B(e,"filter2")}),b.filter2&&r.createElement(m.A,{className:"filter_clear_button",onClick:()=>{B(null,"filter2")}},r.createElement(p.y1J,null)))),r.createElement(i.Ay,{item:!0,className:"filters",overflow:"hidden"},r.createElement(c.A,{className:"filter_labels",id:"filter3_label"},"Genre"),r.createElement(g.A,{value:b.filter3,id:"filter3",sx:{height:23,minHeight:10,fontSize:14,width:155,overflow:"hidden"},onChange:e=>B(e,"filter3")},r.createElement(o.A,{value:"genre"},"Select Genre"),S.map((e=>r.createElement(o.A,{value:e.name,key:e.name},e.name)))))),r.createElement(i.Ay,{item:!0,id:"games_container"},N.map((e=>r.createElement(h.N_,{key:e.game_id,to:`/game/${e.game_id}`,className:"search_game_link"},r.createElement(f.A,{className:"game_card"},r.createElement("img",{className:"search_game_image",src:e.cover_url?e.cover_url:"/static/game_library/images/no_image_found.webp"}),r.createElement(c.A,{variant:"h6",className:"search_game_name"},e.name),e.genres?e.genres.map((e=>r.createElement(c.A,{key:e.name,variant:"p",className:"search_game_genres"},e.name+" "))):null)))),r.createElement(i.Ay,{item:!0,id:"page_buttons"},r.createElement(m.A,{onClick:()=>{T(parseInt(A)-1)}},r.createElement(E.szp,{size:30})),$.map((e=>r.createElement(m.A,{onClick:()=>{T(e)},key:e,className:parseInt(e)==parseInt(a.get("page")?a.get("page"):1)?"current_page":null},e))),r.createElement(m.A,{onClick:()=>{T(parseInt(A)+1)}},r.createElement(E.VC6,{size:30})))))))}},8267:(e,t,a)=>{a.d(t,{A:()=>_});var r=a(6540),l=a(7767),s=a(4976),i=a(8239),n=a(4073),c=a(7059),m=a(5780),g=a(8363),o=a(1641),f=a(4745),u=a(1083);function _(e){const t=(0,l.zy)();let a=new URLSearchParams(t.search);const[_,d]=(0,r.useState)(""),h=e.suggestionType?"generalposts"==e.suggestionType?"general":"games":"game",[E,p]=(0,r.useState)(a.get("sort")?a.get("sort"):"sort_by"),y=e.sortOpts?e.sortOpts:{},A=e.searchMessage?e.searchMessage:"",[v,b]=(0,r.useState)([]);(0,r.useEffect)((()=>{k()}),[_,t.pathname]);const k=async()=>{if(!_)return void b([]);let e;e="games"==h||"general"==h?`/api/get_suggestions/${_}?type=${h}`:`/igdb/get_suggestions/${_}`;try{const t=await u.A.get(e);b(t.data)}catch(e){throw new Error("Failed to fetch suggestions")}};return r.createElement(i.Ay,{container:!0,id:"search_bar"},r.createElement(i.Ay,{item:!0,xs:3,id:"search_message_box"},r.createElement(n.A,{variant:"h4",id:"search_message"},A)),r.createElement(i.Ay,{item:!0,xs:8,id:"search_box"},r.createElement(i.Ay,{item:!0,xs:7,id:"search_input",sx:{"&:hover #suggestion_dropdown":{display:"block"}}},r.createElement(c.A,{fullWidth:!0,sx:{"& .MuiInputBase-input":{height:10},"&:focus-within + #suggestion_dropdown":{display:"block"}},placeholder:e.searchMessage?e.searchMessage:"",onChange:e=>{setTimeout((()=>(e=>{d(e.target.value)})(e)),500)}}),r.createElement(i.Ay,{item:!0,id:"suggestion_dropdown",zIndex:1},v.map((t=>r.createElement(i.Ay,{item:!0,key:"general"==h||"games"==h?t.id:t.game_id,className:"suggestion"},r.createElement(s.N_,{className:"suggestion_link",to:"general"==h||"games"==h?`/forum/general/post/${t.id}`:`/game/${t.game_id}`},e.suggestionType?null:r.createElement("img",{className:"suggestion_image",src:t.cover_url?t.cover_url:"/static/game_library/images/no_image_found.webp"}),r.createElement(n.A,{className:"suggestion_name"},e.suggestionType?t.title:t.name))))))),r.createElement(i.Ay,{item:!0,id:"search_button"},r.createElement(o.A,{size:"small",id:"search_button_icon",onClick:()=>{e.searchClickCallBack(_)}},r.createElement(f.A,null))),r.createElement(i.Ay,{item:!0,id:"sort_by"},r.createElement(m.A,{size:"small",fullWidth:!0,value:E,onChange:t=>{p(t.target.value),e.sortCallBack(t.target.value)}},y.map((e=>r.createElement(g.A,{key:e.value,value:e.value},e.text)))))))}}}]);