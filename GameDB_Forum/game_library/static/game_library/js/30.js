"use strict";(self.webpackChunkgame_library=self.webpackChunkgame_library||[]).push([[30],{30:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var l=a(6540),n=a(8239),c=a(4073),m=a(2848),r=a(2567),i=a(7059),s=a(6990),o=a(1083);function u(){const[e,t]=(0,l.useState)(""),[a,u]=(0,l.useState)(""),[E,d]=(0,l.useState)(""),[_,A]=(0,l.useState)(""),[h,y]=(0,l.useState)(""),[x,b]=(0,l.useState)("");return l.createElement(n.Ay,{container:!0},l.createElement(n.Ay,{item:!0,xs:6,id:"contact_content_box"},l.createElement(c.A,{variant:"h1",id:"contact_page_header"},"Contact Us!"),l.createElement(n.Ay,{item:!0,xs:12,id:"contact_info_box"},l.createElement(c.A,{id:"contact_info_header",variant:"h2"},"Contact Info"),l.createElement(n.Ay,{item:!0,xs:6,id:"contact_phonenumber_box"},l.createElement(c.A,{variant:"h4"},"Phone Number"),l.createElement(c.A,null,"+1 (624) 454-9861")),l.createElement(n.Ay,{item:!0,xs:6,id:"contact_email_address_box"},l.createElement(c.A,{variant:"h4"},"Email"),l.createElement(c.A,null,"FakeEmail@gmail.com")),l.createElement(n.Ay,{item:!0,xs:6,id:"contact_address_box"},l.createElement(c.A,{variant:"h4"},"Address"),l.createElement(c.A,null,"Apt. 330 7659 Emmaline Coves, Haneborough, IA 51911")),l.createElement(n.Ay,{item:!0,xs:6,id:"contact_hours_box"},l.createElement(c.A,{variant:"h4"},"Hours"),l.createElement("ul",{id:"contact_hours_list"},l.createElement("li",null,l.createElement(c.A,null,"Monday: 9am-5pm")),l.createElement("li",null,l.createElement(c.A,null,"Tuesday: 9am-5pm")),l.createElement("li",null,l.createElement(c.A,null,"Wednesday: 9am-5pm")),l.createElement("li",null,l.createElement(c.A,null,"Thursday: 9am-5pm")),l.createElement("li",null,l.createElement(c.A,null,"Friday: 9am-3pm")),l.createElement("li",null,l.createElement(c.A,null,"Saturday: Closed")),l.createElement("li",null,l.createElement(c.A,null,"Sunday: Closed"))))),l.createElement(n.Ay,{item:!0,xs:12,id:"contact_form_box"},l.createElement(c.A,{id:"contact_form_header",variant:"h2"},"Send us an Email!"),l.createElement(m.A,{id:"contact_success_message",in:""!==h},l.createElement(r.A,{severity:"success",onClose:()=>y("")},h)),l.createElement(m.A,{id:"contact_success_message",in:""!==x},l.createElement(r.A,{severity:"error",onClose:()=>b("")},x)),l.createElement(n.Ay,{item:!0,xs:11,id:"contact_name_box"},l.createElement(i.A,{id:"contact_name",placeholder:"Enter Full Name",size:"small",fullWidth:!0,value:e,onChange:e=>{t(e.target.value)}})),l.createElement(n.Ay,{item:!0,xs:11,id:"contact_email_box"},l.createElement(i.A,{id:"contact_email",placeholder:"Enter Email",size:"small",fullWidth:!0,value:a,onChange:e=>{u(e.target.value)}})),l.createElement(n.Ay,{item:!0,xs:11,id:"contact_subject_box"},l.createElement(i.A,{id:"contact_subject",placeholder:"Enter Subject",size:"small",fullWidth:!0,value:E,onChange:e=>{d(e.target.value)}})),l.createElement(n.Ay,{item:!0,xs:11,id:"contact_message_box"},l.createElement("textarea",{id:"contact_message",placeholder:"Enter Message",value:_,onChange:e=>{A(e.target.value)}})),l.createElement(n.Ay,{item:!0,xs:11,id:"send_email_box"},l.createElement(s.A,{id:"send_email_button",fullWidth:!0,onClick:async()=>{if(e&&a&&E&&_){try{await o.A.post("https://formsubmit.co/ajax/matthewhicks8070@gmail.com",{name:e,email:a,subject:E,message:_},{headers:{"Content-Type":"application/json",Accept:"application/json"}}),y("Email was sent successfully!")}catch(e){b("Email failed to send")}t(""),u(""),d(""),A("")}}},l.createElement(c.A,null,"Send Email"))))))}}}]);