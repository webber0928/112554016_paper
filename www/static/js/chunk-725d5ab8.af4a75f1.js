(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-725d5ab8"],{"0619":function(t,e,r){},"13d5":function(t,e,r){"use strict";var n=r("23e7"),a=r("d58f").left,o=r("a640"),i=r("ae40"),s=o("reduce"),c=i("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(t){return a(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"14c3":function(t,e,r){var n=r("c6b6"),a=r("9263");t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var o=r.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"21ed":function(t,e,r){"use strict";r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"f",(function(){return i})),r.d(e,"a",(function(){return s})),r.d(e,"e",(function(){return c})),r.d(e,"d",(function(){return u}));var n=r("b775");function a(t){return Object(n["a"])({url:"/story/list",method:"get",params:t})}function o(t){return Object(n["a"])({url:"/story/".concat(t),method:"get"})}function i(t,e){return Object(n["a"])({url:"/story/".concat(t),method:"put",data:e})}function s(t){return Object(n["a"])({url:"/story/",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/trigger/play/".concat(t.word),method:"put",data:t})}function u(t){return Object(n["a"])({url:"/trigger/open/".concat(t.word),method:"put",data:t})}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),a=r("825a"),o=r("d039"),i=r("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=s;(l||d)&&n(RegExp.prototype,s,(function(){var t=a(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in c)?i.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"2c3e":function(t,e,r){var n=r("83ab"),a=r("9f7f").UNSUPPORTED_Y,o=r("9bf2").f,i=r("69f3").get,s=RegExp.prototype;n&&a&&o(RegExp.prototype,"sticky",{configurable:!0,get:function(){if(this!==s){if(this instanceof RegExp)return!!i(this).sticky;throw TypeError("Incompatible receiver, RegExp required")}}})},"4d63":function(t,e,r){var n=r("83ab"),a=r("da84"),o=r("94ca"),i=r("7156"),s=r("9bf2").f,c=r("241c").f,u=r("44e7"),l=r("ad6d"),d=r("9f7f"),f=r("6eeb"),p=r("d039"),h=r("69f3").set,m=r("2626"),g=r("b622"),v=g("match"),b=a.RegExp,y=b.prototype,x=/a/g,w=/a/g,E=new b(x)!==x,_=d.UNSUPPORTED_Y,O=n&&o("RegExp",!E||_||p((function(){return w[v]=!1,b(x)!=x||b(w)==w||"/a/i"!=b(x,"i")})));if(O){var k=function(t,e){var r,n=this instanceof k,a=u(t),o=void 0===e;if(!n&&a&&t.constructor===k&&o)return t;E?a&&!o&&(t=t.source):t instanceof k&&(o&&(e=l.call(t)),t=t.source),_&&(r=!!e&&e.indexOf("y")>-1,r&&(e=e.replace(/y/g,"")));var s=i(E?new b(t,e):b(t,e),n?this:y,k);return _&&r&&h(s,{sticky:r}),s},j=function(t){t in k||s(k,t,{configurable:!0,get:function(){return b[t]},set:function(e){b[t]=e}})},C=c(b),S=0;while(C.length>S)j(C[S++]);y.constructor=k,k.prototype=y,f(a,"RegExp",k)}m("RegExp")},"4e82":function(t,e,r){"use strict";var n=r("23e7"),a=r("1c0b"),o=r("7b0b"),i=r("d039"),s=r("a640"),c=[],u=c.sort,l=i((function(){c.sort(void 0)})),d=i((function(){c.sort(null)})),f=s("sort"),p=l||!d||!f;n({target:"Array",proto:!0,forced:p},{sort:function(t){return void 0===t?u.call(o(this)):u.call(o(this),a(t))}})},5319:function(t,e,r){"use strict";var n=r("d784"),a=r("825a"),o=r("7b0b"),i=r("50c4"),s=r("a691"),c=r("1d80"),u=r("8aa5"),l=r("14c3"),d=Math.max,f=Math.min,p=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,m=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var v=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,b=n.REPLACE_KEEPS_$0,y=v?"$":"$0";return[function(r,n){var a=c(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,a,n):e.call(String(a),r,n)},function(t,n){if(!v&&b||"string"===typeof n&&-1===n.indexOf(y)){var o=r(e,t,this,n);if(o.done)return o.value}var c=a(t),p=String(this),h="function"===typeof n;h||(n=String(n));var m=c.global;if(m){var w=c.unicode;c.lastIndex=0}var E=[];while(1){var _=l(c,p);if(null===_)break;if(E.push(_),!m)break;var O=String(_[0]);""===O&&(c.lastIndex=u(p,i(c.lastIndex),w))}for(var k="",j=0,C=0;C<E.length;C++){_=E[C];for(var S=String(_[0]),$=d(f(s(_.index),p.length),0),R=[],T=1;T<_.length;T++)R.push(g(_[T]));var I=_.groups;if(h){var P=[S].concat(R,$,p);void 0!==I&&P.push(I);var D=String(n.apply(void 0,P))}else D=x(S,p,$,R,I,n);$>=j&&(k+=p.slice(j,$)+D,j=$+S.length)}return k+p.slice(j)}];function x(t,r,n,a,i,s){var c=n+t.length,u=a.length,l=m;return void 0!==i&&(i=o(i),l=h),e.call(s,l,(function(e,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(c);case"<":s=i[o.slice(1,-1)];break;default:var l=+o;if(0===l)return e;if(l>u){var d=p(l/10);return 0===d?e:d<=u?void 0===a[d-1]?o.charAt(1):a[d-1]+o.charAt(1):e}s=a[l-1]}return void 0===s?"":s}))}}))},"8aa5":function(t,e,r){"use strict";var n=r("6547").charAt;t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},9413:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"chatroom-text"},[r("el-container",[r("el-header",[r("div",[r("el-button",{attrs:{type:"text",plain:""},on:{click:function(e){return t.$router.push("/story")}}},[t._v("< 返回")]),r("div",[t._v("[ 學號: "+t._s(t.username)+" ]")])],1)]),r("el-container",[r("el-main",[r("el-row",[r("el-col",{attrs:{xs:24,sm:24,md:24,xl:24}},[r("div",{staticClass:"my-story"},[r("el-card",{staticStyle:{"background-color":"#fdf6ec"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("故事標題: "),r("b",[t._v(t._s(t.myStoryTitle))])])]),r("div",{ref:"myStory",staticClass:"story-content"},[t.myStory?r("div",{staticClass:"text item",domProps:{innerHTML:t._s(t.myStory)}}):r("div",{staticClass:"text item"},[r("el-skeleton",{attrs:{rows:6}})],1),r("audio",{ref:"audio",staticStyle:{display:"none"},attrs:{id:"tts-audio",controls:"",src:"https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=apple"}})])])],1)]),r("el-col",{attrs:{xs:24,sm:24,md:24,xl:24}},[r("div",{staticClass:"my-room grid-content bg-purple-light"},[r("div",{staticClass:"my-chat bg-purple-dark"},[r("el-card",{staticClass:"box-card"},[r("div",{ref:"chatBox",staticClass:"chat-message-list"},t._l(t.historyItems,(function(e,n){return r("div",{key:n,staticClass:"chat-message",class:("user"===e.role?"user":"model")+"-role"},[r("div",{staticClass:"message-avatar"},["user"!==e.role?r("img",{attrs:{src:"https://webzz-production.s3-ap-northeast-1.amazonaws.com/users/avatars/F42B1Z9EV4WEFLY7GGYY.png"}}):r("img",{attrs:{src:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"}})]),r("div",{staticClass:"message-content"},[t._v(t._s(t._f("replacedText")(e.content)))])])})),0),r("div",{staticClass:"form-container"},[r("hr"),r("div",{staticClass:"chat-bottom"},[r("div",{staticClass:"bottom-row"},[r("div",{staticClass:"leave"},[r("el-button",{attrs:{type:"danger",plain:""},on:{click:t.exitChat}},[t._v("結束對話")])],1),r("div",{staticClass:"send-input"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.prompt,expression:"form.prompt"}],staticClass:"el-input__inner",attrs:{type:"text",placeholder:"輸入對話"},domProps:{value:t.form.prompt},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit(e)},input:function(e){e.target.composing||t.$set(t.form,"prompt",e.target.value)}}})]),r("div",{staticClass:"send-btn"},[r("el-button",{attrs:{type:"primary",plain:""},on:{click:t.onSubmit}},[t._v("送出")])],1)])])])])],1)])])],1)],1)],1)],1)],1)},a=[],o=r("c7eb"),i=r("1da1"),s=r("5530"),c=(r("99af"),r("13d5"),r("4e82"),r("d3b7"),r("4d63"),r("ac1f"),r("2c3e"),r("25f0"),r("5319"),r("498a"),r("159b"),r("2f62")),u=r("bd5f"),l=r("21ed"),d=r("c443"),f=r("5c96"),p={name:"Chatroom",filters:{replacedText:function(t){return console.log(t),t.replace(/\((.*?)\)/g,"").replace(/\s+/g," ").trim()}},data:function(){return{items:"",itemObj:"",story:"",form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",prompt:""},historyItems:[],initData:[],myStory:null,myStoryTitle:null,wordObj:{},selectWords:"",promptPart:"",windowHeight:window.innerHeight,keyboardHeight:0,isComposing:!1,conversation_id:""}},computed:Object(s["a"])({},Object(c["b"])(["name","username"])),mounted:function(){var t=this;this.$refs.myStory.addEventListener("copy",(function(t){t.preventDefault(),alert("不可以壞壞")})),this.$refs.myStory.addEventListener("click",(function(e){"BUTTON"===e.target.tagName&&t.handleClick(e.target.textContent)})),window.addEventListener("resize",this.handleResize)},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},created:function(){this.initGptData(this.$route.params.id)},methods:{handleResize:function(){var t=window.innerHeight;t<this.windowHeight?this.keyboardHeight=this.windowHeight-t:this.keyboardHeight=0,this.windowHeight=t},scrollToBottom:function(){var t=this.$refs.chatBox;setTimeout((function(){t.scrollTop=t.scrollHeight}),150)},initGptData:function(t){var e=this;return Object(i["a"])(Object(o["a"])().mark((function r(){var n,a,i,s;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,n=f["Loading"].service({fullscreen:!0}),r.next=4,Object(l["c"])(t);case 4:return a=r.sent,r.next=7,Object(d["b"])({user_no:e.username,story_id:t});case 7:if(i=r.sent,n.close(),e.itemObj=a.data,e.myStoryTitle=a.data.title,e.promptPart=a.data.prompt_part,e.myStory=e.textFormat(a.data.content,a.data.words||[]),e.initData={role:"assistant",content:a.data.content},!(i&&i.data&&i.data.length)){r.next=19;break}e.historyItems=i.data.reduce((function(t,e){return"system"===e.type||t.push(e.message),t}),[]),e.conversation_id=i.data[0].conversation_id,r.next=24;break;case 19:return r.next=21,Object(d["g"])({user_no:e.username,story_id:t});case 21:s=r.sent,e.conversation_id=s.data.id,e.initGptData2(e.initData);case 24:r.next=29;break;case 26:r.prev=26,r.t0=r["catch"](0),e.$message(r.t0);case 29:case"end":return r.stop()}}),r,null,[[0,26]])})))()},initGptData2:function(t){var e=this;return Object(i["a"])(Object(o["a"])().mark((function r(){var n,a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,n=f["Loading"].service({fullscreen:!0}),r.next=4,Object(u["c"])({message:t,username:e.username,storyId:e.$route.params.id,promptPart:e.promptPart,conversationId:e.conversation_id});case 4:a=r.sent,n.close(),e.story=a.data,e.historyItems.push({role:a.data.choices[0].message.role,content:a.data.choices[0].message.content}),e.$message({type:"success",message:"學生已登入成功！"}),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](0),e.$message(r.t0);case 14:case"end":return r.stop()}}),r,null,[[0,11]])})))()},textFormat:function(t,e){var r=this;return e=e.sort((function(t,e){return t.length-e.length})),e.forEach((function(e){var n=e.split(" ")[0],a=e.split(" ")[1];r.wordObj[n]=a;var o=new RegExp(" "+n,"g");t=t.replace(o," <button class='el-button el-button--text' @click=\"handleClick\">".concat(n,"</button>"))})),t=t.replace(/\n/g,"<br>"),t},onSubmit:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function e(){var r,n,a,i;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.form.prompt,r){e.next=3;break}return e.abrupt("return");case 3:return t.historyItems.push({role:"user",content:r}),t.scrollToBottom(),e.prev=5,t.$message({type:"info",message:"訊息已發送"}),t.form.prompt="",n=[t.initData].concat(t.historyItems),e.next=11,Object(u["d"])({messages:n,username:t.username,storyId:t.$route.params.id,conversation_id:t.conversation_id});case 11:a=e.sent,i=a.data.choices[0].message.content,t.historyItems.push({role:a.data.choices[0].message.role,content:i}),t.scrollToBottom(),e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](5),t.$message(e.t0);case 20:case"end":return e.stop()}}),e,null,[[5,17]])})))()},onCancel:function(){this.$message({message:"cancel!",type:"warning"})},handleClick:function(t){var e=this;this.selectWords=t,this.$alert("\n        <h2>".concat(t,": ").concat(this.wordObj[t],'</h2>\n        <button id="playButton">播放</button>\n        '),"單字卡",{dangerouslyUseHTMLString:!0,callback:function(){document.getElementById("playButton").removeEventListener("click",e.playClick)}}),Object(l["d"])({word:t,user_no:this.username,story_id:this.$route.params.id}),this.$nextTick((function(){document.getElementById("playButton").addEventListener("click",e.playClick)}))},playClick:function(){var t=this.$refs.audio;t.src="https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=".concat(this.selectWords),console.log(t.src),t.playbackRate=.8,t.volume=1,t.play(),Object(l["e"])({word:this.selectWords,user_no:this.username,story_id:this.$route.params.id})},exitChat:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["f"])({user_no:t.username,story_id:t.$route.params.id,id:t.conversation_id});case 2:t.$router.push("/story");case 3:case"end":return e.stop()}}),e)})))()}}},h=p,m=(r("afd6"),r("2877")),g=Object(m["a"])(h,n,a,!1,null,"756e920f",null);e["default"]=g.exports},afd6:function(t,e,r){"use strict";r("0619")},bd5f:function(t,e,r){"use strict";r.d(e,"d",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return s}));var n=r("b775");function a(t){return Object(n["a"])({url:"/gpt-message",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/gpt-init2",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/prompt/edit",method:"put",data:t})}function s(){return Object(n["a"])({url:"/prompt",method:"get"})}},c443:function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return i})),r.d(e,"e",(function(){return s})),r.d(e,"b",(function(){return c})),r.d(e,"g",(function(){return u})),r.d(e,"f",(function(){return l}));var n=r("b775");function a(){return Object(n["a"])({url:"/dashboard/message/user/list",method:"get"})}function o(t){return Object(n["a"])({url:"/dashboard/message/user/"+t,method:"get"})}function i(){return Object(n["a"])({url:"/dashboard/message/userGroup/list",method:"get"})}function s(t){return Object(n["a"])({url:"/dashboard/message/userGroup/"+t,method:"get"})}function c(t){return Object(n["a"])({url:"/gpt-history",method:"get",params:t})}function u(t){return Object(n["a"])({url:"/gpt-history",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/gpt-endMessage",method:"post",data:t})}},d58f:function(t,e,r){var n=r("1c0b"),a=r("7b0b"),o=r("44ad"),i=r("50c4"),s=function(t){return function(e,r,s,c){n(r);var u=a(e),l=o(u),d=i(u.length),f=t?d-1:0,p=t?-1:1;if(s<2)while(1){if(f in l){c=l[f],f+=p;break}if(f+=p,t?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:d>f;f+=p)f in l&&(c=r(c,l[f],f,u));return c}};t.exports={left:s(!1),right:s(!0)}},d784:function(t,e,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),o=r("b622"),i=r("9263"),s=r("9112"),c=o("species"),u=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!a((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,d){var h=o(t),m=!a((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),g=m&&!a((function(){var e=!1,r=/a/;return"split"===t&&(r={},r.constructor={},r.constructor[c]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return e=!0,null},r[h](""),!e}));if(!m||!g||"replace"===t&&(!u||!l||f)||"split"===t&&!p){var v=/./[h],b=r(h,""[t],(function(t,e,r,n,a){return e.exec===i?m&&!a?{done:!0,value:v.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=b[0],x=b[1];n(String.prototype,t,y),n(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}d&&s(RegExp.prototype[h],"sham",!0)}}}]);