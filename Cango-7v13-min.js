var Cobj,LinearGradient,RadialGradient,DrawCmd,svgToCgoRHC,svgToCgoSVG,cgoRHCtoSVG,shapeDefs,Cango=function(){"use strict"
function t(t,s,i){return t.attachEvent?t.attachEvent("on"+s,i):t.addEventListener(s,i,!0)}function s(t){var i,e=Array.isArray(t)?[]:{}
for(i in t)t[i]&&"object"==typeof t[i]?e[i]=s(t[i]):e[i]=t[i]
return e}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function e(t){return i(t)?t.reduce(function(t,s){var r=[].concat(s).some(i)
return t.concat(r?e(s):s)},[]):[t]}function r(t){this.type="PATH",this.drawCmds=d(t),this.dwgOrg={x:0,y:0},this.dragNdrop=null,this.iso=!1,this.border=!1,this.strokeCol=null,this.lineWidth=1,this.lineCap=null,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000",this.dashed=null,this.dashOffset=0}function a(t){r.call(this,t),this.type="SHAPE",this.iso=!0}function o(t){this.type="IMG",this.drawCmds=t,this.imgBuf=new Image,this.bBoxCmds=[],this.dwgOrg={x:0,y:0},this.width=0,this.height=0,this.imgX=0,this.imgY=0,this.imgLorgX=0,this.imgLorgY=0,this.imgXscale=1,this.imgYscale=1,this.imgDegs=0,this.lorg=1,this.dragNdrop=null,this.border=!1,this.strokeCol=null,this.lineWidth=1,this.lineCap=null,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000",this.imgBuf.src=t}function h(t){this.type="TEXT",this.drawCmds=t,this.bBoxCmds=[],this.dwgOrg={x:0,y:0},this.imgX=0,this.imgY=0,this.imgLorgX=0,this.imgLorgY=0,this.imgXscale=1,this.imgYscale=1,this.imgDegs=0,this.lorg=1,this.dragNdrop=null,this.border=!1,this.fillCol=null,this.fontSize=null,this.fontWeight=null,this.fontFamily=null,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000"}function n(t,s){this.id=t,this.cElem=s,this.dragObjects=[]}var c,d,l=0
return c=function(){function t(t,s,i){return 0===i&&"string"!=typeof s&&t.push("M"),"string"==typeof s&&(f.hasOwnProperty(s.toUpperCase())||(console.log("unknown command string '"+s+"'"),t.badCmdFound=!0,t.length=0)),t.badCmdFound||t.push(s),t}function s(t,s,i,e){var r
if(0===i&&(t.nextCmdPos=0),"string"==typeof s){if(i<t.nextCmdPos)return console.log("bad number of parameters for '"+s+"' at index "+i),t.badParameter=!0,t.push(0),t
t.currCmd=s.toUpperCase(),t.uc=s.toUpperCase()===s,t.nextCmdPos=i+f[t.currCmd].parmCount+1,t.push(s)}else i<t.nextCmdPos?t.push(s):(t.currCmd=f[t.currCmd].extCmd,r=t.uc?t.currCmd:t.currCmd.toLowerCase(),t.push(r,s),t.nextCmdPos=i+f[t.currCmd].parmCount)
return i===e.length-1&&t.badParameter&&(t.length=0),t}function e(t,s){return"string"==typeof s&&t.push([]),t[t.length-1].push(s),t}function r(t,s,i){var e,r
return void 0===t.px&&(t.px=0,t.py=0),e=f[s[0].toUpperCase()],r=e.toAbs(t,s,i),t.push(r),t}function a(t,s,i){var e=s[0],r=f[e]
return r.toCangoVersion(t,s,i),t}function o(t){var s=t[0],i=t.slice(1)
return new DrawCmd(f[s].canvasMethod,i)}function h(t,s){var i,e,r=s[0]
return t.push(r),i=s.slice(1),e=i.match(/\S+/g),e&&e.forEach(function(s){var i=parseFloat(s)
isNaN(i)||t.push(i)}),t}function n(t){var s=t[0],i=f[s]
return i.invertCoords(t)}function c(t){var s=t[0],i=f[s],e=this.xOfs||0,r=this.yOfs||0
return i.addXYoffset(t,e,r)}function d(t,s){return t.concat(s)}var l=function(t,s,i,e,r,a,o,h){var n=h*r,c=-o*a,d=o*r,l=h*a,p=.5*(e-i),f=8/3*Math.sin(.5*p)*Math.sin(.5*p)/Math.sin(p),g=t+Math.cos(i)-f*Math.sin(i),u=s+Math.sin(i)+f*Math.cos(i),m=t+Math.cos(e),C=s+Math.sin(e),x=m+f*Math.sin(e),v=C-f*Math.cos(e)
return[n*g+c*u,d*g+l*u,n*x+c*v,d*x+l*v,n*m+c*C,d*m+l*C]},p=function(t,s,i,e,r,a,o,h,n){function c(t){return Math.abs(t)<1e-5?0:t}var d,p,f,g,u,m,C,x,v,y,w,b,O,k,X,P,W,Y,M,S,H,T,L=r*(Math.PI/180),A=Math.sin(L),B=Math.cos(L),E=Math.abs(i),N=Math.abs(e),D=B*(t-h)*.5+A*(s-n)*.5,I=B*(s-n)*.5-A*(t-h)*.5,j=D*D/(E*E)+I*I/(N*N),G=[]
for(j>1&&(j=Math.sqrt(j),E*=j,N*=j),d=B/E,p=A/E,f=-A/N,g=B/N,u=d*t+p*s,m=f*t+g*s,C=d*h+p*n,x=f*h+g*n,v=(C-u)*(C-u)+(x-m)*(x-m),y=1/v-.25,0>y&&(y=0),w=Math.sqrt(y),o===a&&(w=-w),b=.5*(u+C)-w*(x-m),O=.5*(m+x)+w*(C-u),k=Math.atan2(m-O,u-b),X=Math.atan2(x-O,C-b),P=X-k,0>P&&1===o?P+=2*Math.PI:P>0&&0===o&&(P-=2*Math.PI),W=Math.ceil(Math.abs(P/(.5*Math.PI+.001))),S=0;W>S;S++)H=k+S*P/W,T=k+(S+1)*P/W,Y=l(b,O,H,T,E,N,A,B),M=Y.map(c),G.push(M)
return G},f={M:{canvasMethod:"moveTo",parmCount:2,extCmd:"L",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2]
return e!==s[0]&&(r+=t.px,a+=t.py),i=[e,r,a],t.px=r,t.py=a,i},toCangoVersion:function(t,s){var i=s[1],e=s[2]
t.px=i,t.py=e,t.push(s)},addXYoffset:function(t,s,i){var e=t[1],r=t[2]
return e+=s,r+=i,["M",e,r]},invertCoords:function(t){var s=t[1],i=t[2]
return["M",s,-i]}},L:{canvasMethod:"lineTo",parmCount:2,extCmd:"L",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2]
return e!==s[0]&&(r+=t.px,a+=t.py),i=[e,r,a],t.px=r,t.py=a,i},toCangoVersion:function(t,s){var i=s[1],e=s[2]
t.px=i,t.py=e,t.push(s)},addXYoffset:function(t,s,i){var e=t[1],r=t[2]
return e+=s,r+=i,["L",e,r]},invertCoords:function(t){var s=t[1],i=t[2]
return["L",s,-i]}},H:{parmCount:1,extCmd:"H",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1]
return e!==s[0]&&(r+=t.px),i=[e,r],t.px=r,i},toCangoVersion:function(t,s){var i=s[1],e=t.py,r=["L",i,e]
t.px=i,t.push(r)},addXYoffset:function(t,s){var i=t[1]
return i+=s,["H",i]},invertCoords:function(t){var s=t[1]
return["H",s]}},V:{parmCount:1,extCmd:"V",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1]
return e!==s[0]&&(r+=t.py),i=[e,r],t.py=r,i},toCangoVersion:function(t,s){var i=t.px,e=s[1],r=["L",i,e]
t.py=e,t.push(r)},addXYoffset:function(t,s,i){var e=t[1]
return e+=i,["V",e]},invertCoords:function(t){var s=t[1]
return["V",-s]}},C:{canvasMethod:"bezierCurveTo",parmCount:6,extCmd:"C",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2],o=s[3],h=s[4],n=s[5],c=s[6]
return e!==s[0]&&(r+=t.px,a+=t.py,o+=t.px,h+=t.py,n+=t.px,c+=t.py),i=[e,r,a,o,h,n,c],t.px=n,t.py=c,i},toCangoVersion:function(t,s){var i=s[5],e=s[6]
t.px=i,t.py=e,t.push(s)},addXYoffset:function(t,s,i){var e=t[1],r=t[2],a=t[3],o=t[4],h=t[5],n=t[6]
return e+=s,r+=i,a+=s,o+=i,h+=s,n+=i,["C",e,r,a,o,h,n]},invertCoords:function(t){var s=t[1],i=t[2],e=t[3],r=t[4],a=t[5],o=t[6]
return["C",s,-i,e,-r,a,-o]}},S:{parmCount:4,extCmd:"S",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2],o=s[3],h=s[4]
return e!==s[0]&&(r+=t.px,a+=t.py,o+=t.px,h+=t.py),i=[e,r,a,o,h],t.px=o,t.py=h,i},toCangoVersion:function(t,s,i){var e,r=0,a=0,o=s[1],h=s[2],n=s[3],c=s[4],d=t[i-1]
"C"===d[0]&&(r=t.px-d[d.length-4],a=t.py-d[d.length-3]),r+=t.px,a+=t.py,e=["C",r,a,o,h,n,c],t.px=n,t.py=c,t.push(e)},addXYoffset:function(t,s,i){var e=t[1],r=t[2],a=t[3],o=t[4]
return e+=s,r+=i,a+=s,o+=i,["S",e,r,a,o]},invertCoords:function(t){var s=t[1],i=t[2],e=t[3],r=t[4]
return["S",s,-i,e,-r]}},Q:{canvasMethod:"quadraticCurveTo",parmCount:4,extCmd:"Q",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2],o=s[3],h=s[4]
return e!==s[0]&&(r+=t.px,a+=t.py,o+=t.px,h+=t.py),i=[e,r,a,o,h],t.px=o,t.py=h,i},toCangoVersion:function(t,s){var i=s[3],e=s[4]
t.px=i,t.py=e,t.push(s)},addXYoffset:function(t,s,i){var e=t[1],r=t[2],a=t[3],o=t[4]
return e+=s,r+=i,a+=s,o+=i,["Q",e,r,a,o]},invertCoords:function(t){var s=t[1],i=t[2],e=t[3],r=t[4]
return["Q",s,-i,e,-r]}},T:{parmCount:2,extCmd:"T",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2]
return e!==s[0]&&(r+=t.px,a+=t.py),i=[e,r,a],t.px=r,t.py=a,i},toCangoVersion:function(t,s,i){var e,r=0,a=0,o=s[1],h=s[2],n=t[i-1]
"Q"===n[0]&&(r=t.px-n[n.length-4],a=t.py-n[n.length-3]),r+=t.px,a+=t.py,e=["Q",r,a,o,h],t.px=o,t.py=h,t.push(e)},addXYoffset:function(t,s,i){var e=t[1],r=t[2]
return e+=s,r+=i,["T",e,r]},invertCoords:function(t){var s=t[1],i=t[2]
return["T",s,-i]}},A:{parmCount:7,extCmd:"A",toAbs:function(t,s){var i,e=s[0].toUpperCase(),r=s[1],a=s[2],o=s[3],h=s[4],n=s[5],c=s[6],d=s[7]
return e!==s[0]&&(c+=t.px,d+=t.py),i=[e,r,a,o,h,n,c,d],t.px=c,t.py=d,i},toCangoVersion:function(t,s){var i,e=s[1],r=s[2],a=s[3],o=s[4],h=s[5],n=s[6],c=s[7]
i=p(t.px,t.py,e,r,a,o,h,n,c),i.forEach(function(s){t.push(["C"].concat(s))}),t.px=n,t.py=c},addXYoffset:function(t,s,i){var e=t[1],r=t[2],a=t[3],o=t[4],h=t[5],n=t[6],c=t[7]
return n+=s,c+=i,["A",e,r,a,o,h,n,c]},invertCoords:function(t){var s=t[1],i=t[2],e=t[3],r=t[4],a=t[5],o=t[6],h=t[7]
return["A",s,i,-e,r,1-a,o,-h]}},Z:{canvasMethod:"closePath",parmCount:0,toAbs:function(t,s){var i=s[0].toUpperCase(),e=[i]
return e},toCangoVersion:function(t,s){t.push(s)},addXYoffset:function(){return["Z"]},invertCoords:function(){return["Z"]}}}
return{svg2cartesian:function(i,a,o){var l,p,f=a||0,g=o||0
return"string"!=typeof i||0===i.length?[]:(l=i.replace(RegExp(",","g")," "),p=l.split(/(?=[a-df-z])/i),p.reduce(h,[]).reduce(t,[]).reduce(s,[]).reduce(e,[]).reduce(r,[]).map(c,{xOfs:f,yOfs:g}).map(n).reduce(d,[]))},svg2cgosvg:function(i,a,o){var n,l,p=a||0,f=o||0
return"string"!=typeof i||0===i.length?[]:(n=i.replace(RegExp(",","g")," "),l=n.split(/(?=[a-df-z])/i),l.reduce(h,[]).reduce(t,[]).reduce(s,[]).reduce(e,[]).reduce(r,[]).map(c,{xOfs:p,yOfs:f}).reduce(d,[]))},cartesian2svg:function(t){return""+t.reduce(s,[]).reduce(e,[]).reduce(r,[]).map(n).reduce(d,[])},cgo2drawcmds:function(h){return i(h)&&0!==h.length?h.reduce(t,[]).reduce(s,[]).reduce(e,[]).reduce(r,[]).reduce(a,[]).map(o):[]}}}(),svgToCgoRHC=c.svg2cartesian,svgToCgoSVG=c.svg2cgosvg,cgoRHCtoSVG=c.cartesian2svg,d=c.cgo2drawcmds,void 0===shapeDefs&&(shapeDefs={circle:function(t){var s=t||1
return["m",-.5*s,0,"c",0,-.27614*s,.22386*s,-.5*s,.5*s,-.5*s,"c",.27614*s,0,.5*s,.22386*s,.5*s,.5*s,"c",0,.27614*s,-.22386*s,.5*s,-.5*s,.5*s,"c",-.27614*s,0,-.5*s,-.22386*s,-.5*s,-.5*s]},ellipse:function(t,s){var i=t||1,e=i
return"number"==typeof s&&s>0&&(e=s),["m",-.5*i,0,"c",0,-.27614*e,.22386*i,-.5*e,.5*i,-.5*e,"c",.27614*i,0,.5*i,.22386*e,.5*i,.5*e,"c",0,.27614*e,-.22386*i,.5*e,-.5*i,.5*e,"c",-.27614*i,0,-.5*i,-.22386*e,-.5*i,-.5*e]},square:function(t){var s=t||1
return["m",.5*s,-.5*s,"l",0,s,-s,0,0,-s,"z"]},rectangle:function(t,s,i){var e,r=.55228475
return void 0===i||0>=i?["m",-t/2,-s/2,"l",t,0,0,s,-t,0,"z"]:(e=Math.min(t/2,s/2,i),["m",-t/2+e,-s/2,"l",t-2*e,0,"c",r*e,0,e,(1-r)*e,e,e,"l",0,s-2*e,"c",0,r*e,(r-1)*e,e,-e,e,"l",-t+2*e,0,"c",-r*e,0,-e,(r-1)*e,-e,-e,"l",0,-s+2*e,"c",0,-r*e,(1-r)*e,-e,e,-e])},triangle:function(t){var s=t||1
return["m",.5*s,-.289*s,"l",-.5*s,.866*s,-.5*s,-.866*s,"z"]},cross:function(t){var s=t||1
return["m",-.5*s,0,"l",s,0,"m",-.5*s,-.5*s,"l",0,s]},ex:function(t){var s=t||1
return["m",-.3535*s,-.3535*s,"l",.707*s,.707*s,"m",-.707*s,0,"l",.707*s,-.707*s]}}),LinearGradient=function(t,s,i,e){this.grad=[t,s,i,e],this.colorStops=[],this.addColorStop=function(){this.colorStops.push(arguments)}},RadialGradient=function(t,s,i,e,r,a){this.grad=[t,s,i,e,r,a],this.colorStops=[],this.addColorStop=function(){this.colorStops.push(arguments)}},DrawCmd=function(t,s){var i
for(this.drawFn=t,this.parms=[],i=0;i<s.length;i+=2)this.parms.push(s.slice(i,i+2))
this.parmsPx=[]},r.prototype.translate=function(t,s){this.drawCmds.forEach(function(i){i.parms=i.parms.map(function(i){return[i[0]+t,i[1]+s]})})},r.prototype.rotate=function(t){var s=Math.PI*t/180,i=Math.sin(s),e=Math.cos(s)
this.drawCmds.forEach(function(t){t.parms=t.parms.map(function(t){return[t[0]*e-t[1]*i,t[0]*i+t[1]*e]})})},r.prototype.scale=function(t,s,i){var e=t||1,r=s||e,a=i||1
this.drawCmds.forEach(function(t){t.parms=t.parms.map(function(t){return[t[0]*e,t[1]*r]})}),a>0&&(this.lineWidth*=a)},r.prototype.appendPath=function(t,i){var e=s(t.drawCmds)
i?this.drawCmds=this.drawCmds.concat(e.slice(1)):this.drawCmds=this.drawCmds.concat(e)},r.prototype.revWinding=function(){function t(t){return t.reduceRight(function(t,s){return t.push(s[0],s[1]),t},[])}var s,i,e,r,a,o=null,h=[]
for("closePath"===this.drawCmds[this.drawCmds.length-1].drawFn?(s=this.drawCmds.slice(0,-1),o=this.drawCmds.slice(-1)):s=this.drawCmds.slice(0),i=s.length-1,e=s[i].parms.length,a=new DrawCmd("moveTo",s[i].parms[e-1]),h.push(a),s[i].parms=s[i].parms.slice(0,-1);i>0;)r=t(s[i].parms),e=s[i-1].parms.length,r=r.concat(s[i-1].parms[e-1]),a=new DrawCmd(s[i].drawFn,r),h.push(a),s[i-1].parms=s[i-1].parms.slice(0,-1),i--
o&&h.push(o),this.drawCmds=h},a.prototype=new r,o.prototype.translate=function(t,s){this.imgX+=t,this.imgY+=s},o.prototype.rotate=function(t){this.imgDegs+=t},o.prototype.scale=function(t,s){var i=t||1,e=s||i
this.imgXscale*=i,this.imgYscale*=e,this.imgX*=i,this.imgY*=e},o.prototype.formatImg=function(){var t,s,i,e,r,a,o,h,n,c,d,l,p,f=0,g=0
this.imgBuf.width||console.log("in image onload handler yet image NOT loaded!"),this.width&&this.height?(t=this.width,s=this.height):this.width&&!this.height?(t=this.width,s=this.height||t*this.imgBuf.height/this.imgBuf.width):this.height&&!this.width?(s=this.height,t=this.width||s*this.imgBuf.width/this.imgBuf.height):(t=this.imgBuf.width,s=this.imgBuf.height),i=t/2,e=s/2,p=[0,[0,0],[i,0],[t,0],[0,e],[i,e],[t,e],[0,s],[i,s],[t,s]],void 0!==p[this.lorg]&&(f=-p[this.lorg][0],g=-p[this.lorg][1]),this.imgLorgX=f,this.imgLorgY=g,this.width=t,this.height=s,r=this.imgX+f,a=this.imgY+g,o=this.imgX+f,h=this.imgY+g+s,n=this.imgX+f+t,c=this.imgY+g+s,d=this.imgX+f+t,l=this.imgY+g,this.bBoxCmds[0]=new DrawCmd("moveTo",[r,-a]),this.bBoxCmds[1]=new DrawCmd("lineTo",[o,-h]),this.bBoxCmds[2]=new DrawCmd("lineTo",[n,-c]),this.bBoxCmds[3]=new DrawCmd("lineTo",[d,-l]),this.bBoxCmds[4]=new DrawCmd("closePath",[])},h.prototype.translate=function(t,s){this.imgX+=t,this.imgY+=s},h.prototype.rotate=function(t){this.imgDegs+=t},h.prototype.scale=function(t,s){var i=t||1,e=s||i
this.imgXscale*=i,this.imgYscale*=e,this.imgX*=i,this.imgY*=e},h.prototype.formatText=function(t){var s,i,e,r,a,o,h,n,c,d,l,p,f,g=this.fontSize||t.fontSize,u=this.fontFamily||t.fontFamily,m=this.lorg||1,C=0,x=0
t.ctx.save(),t.ctx.font=g+"px "+u,s=t.ctx.measureText(this.drawCmds).width,t.ctx.restore(),i=g,s/=t.xscl,i/=t.xscl,e=s/2,r=i/2,a=[0,[0,i],[e,i],[s,i],[0,r],[e,r],[s,r],[0,0],[e,0],[s,0]],void 0!==a[m]&&(C=-a[m][0],x=-a[m][1]),this.imgLorgX=C,this.imgLorgY=x+.25*i,this.width=s,this.height=i,o=this.imgX+C,h=this.imgY-x,n=this.imgX+C,c=this.imgY-x-i,d=this.imgX+C+s,l=this.imgY-x-i,p=this.imgX+C+s,f=this.imgY-x,this.bBoxCmds[0]=new DrawCmd("moveTo",[o,-h]),this.bBoxCmds[1]=new DrawCmd("lineTo",[n,-c]),this.bBoxCmds[2]=new DrawCmd("lineTo",[d,-l]),this.bBoxCmds[3]=new DrawCmd("lineTo",[p,-f]),this.bBoxCmds[4]=new DrawCmd("closePath",[])},Cobj=function(t,s,i){var e,n,c,d=r
switch(s){case"PATH":d=r
break
case"SHAPE":d=a
break
case"IMG":d=o
break
case"TEXT":d=h}d.call(this,t),e=new d
for(c in e)"function"==typeof e[c]&&(this[c]=e[c])
n="object"==typeof i?i:{}
for(c in n)n.hasOwnProperty(c)&&this.setProperty(c,n[c])},Cobj.prototype.setProperty=function(t,s){if("string"==typeof t&&void 0!==s)switch(t.toLowerCase()){case"fillcolor":this.fillCol=s
break
case"strokecolor":this.strokeCol=s
break
case"linewidth":case"strokewidth":this.lineWidth=Math.abs(s)
break
case"linecap":if("string"!=typeof s)return;("butt"===s||"round"===s||"square"===s)&&(this.lineCap=s)
break
case"iso":case"isotropic":1==s||"iso"===s||"isotropic"===s?this.iso=!0:this.iso=!1
break
case"dashed":i(s)&&s[0]?this.dashed=s:this.dashed=null
break
case"dashoffset":this.dashOffset=s||0
break
case"border":1==s&&(this.border=!0),0==s&&(this.border=!1)
break
case"fontsize":this.fontSize=Math.abs(s)
break
case"fontweight":("string"==typeof s||"number"==typeof s&&s>=100&&900>=s)&&(this.fontWeight=s)
break
case"fontfamily":"string"==typeof s&&(this.fontFamily=s)
break
case"imgwidth":this.width=Math.abs(s)
break
case"imgheight":this.height=Math.abs(s)
break
case"lorg":[1,2,3,4,5,6,7,8,9].indexOf(s)>-1&&(this.lorg=s)
break
case"shadowoffsetx":this.shadowOffsetX=s||0
break
case"shadowoffsety":this.shadowOffsetY=s||0
break
case"shadowblur":this.shadowBlur=s||0
break
case"shadowcolor":this.shadowColor=s
break
default:return}},Cobj.prototype.dup=function(){var t=new Cobj
return t.type=this.type,t.drawCmds=s(this.drawCmds),t.imgBuf=this.imgBuf,t.bBoxCmds=s(this.bBoxCmds),t.dwgOrg=s(this.dwgOrg),t.iso=this.iso,t.border=this.border,t.strokeCol=this.strokeCol,t.fillCol=this.fillCol,t.lineWidth=this.lineWidth,t.lineCap=this.lineCap,t.width=this.width,t.height=this.height,t.imgX=this.imgX,t.imgY=this.imgY,t.imgLorgX=this.imgLorgX,t.imgLorgY=this.imgLorgY,t.imgXscale=this.imgXscale,t.imgYscale=this.imgYscale,t.imgDegs=this.imgDegs,t.lorg=this.lorg,t.dragNdrop=null,t.fontSize=this.fontSize,t.fontWeight=this.fontWeight,t.fontFamily=this.fontFamily,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY,t.shadowBlur=this.shadowBlur,t.shadowColor=this.shadowColor,t.dashed=this.dashed,t.dashOffset=this.dashOffset,t},Cango=function(s){function i(){var t,s,i=a.bkgCanvas.offsetTop+a.bkgCanvas.clientTop,e=a.bkgCanvas.offsetLeft+a.bkgCanvas.clientLeft,r=a.bkgCanvas.offsetWidth,o=a.bkgCanvas.offsetHeight
if(a.rawWidth=r,a.rawHeight=o,a.aRatio=r/o,a.bkgCanvas===a.cnvs)for(a.cnvs.setAttribute("width",r),a.cnvs.setAttribute("height",o),a.buffered&&(a.cnvs.buf.setAttribute("width",r),a.cnvs.buf.setAttribute("height",o)),t=1;t<a.bkgCanvas.layers.length;t++)s=a.bkgCanvas.layers[t].cElem,s&&(s.style.top=i+"px",s.style.left=e+"px",s.style.width=r+"px",s.style.height=o+"px",s.setAttribute("width",r),s.setAttribute("height",o),s.buf&&(s.buf.setAttribute("width",r),s.buf.setAttribute("height",o)))}var e,r,a=this
return this.cId=s,this.cnvs=document.getElementById(s),null===this.cnvs?void alert("can't find canvas "+s):(this.bkgCanvas=this.cnvs,-1!==s.indexOf("_ovl_")&&(e=s.slice(0,s.indexOf("_ovl_")),this.bkgCanvas=document.getElementById(e)),this.rawWidth=this.cnvs.offsetWidth,this.rawHeight=this.cnvs.offsetHeight,this.aRatio=this.rawWidth/this.rawHeight,this.widthPW=100,this.heightPW=this.widthPW/this.aRatio,this.bkgCanvas.hasOwnProperty("layers")||(this.bkgCanvas.layers=[],r=new n(this.cId,this.cnvs),this.bkgCanvas.layers[0]=r),"undefined"==typeof Timeline||this.bkgCanvas.hasOwnProperty("timeline")||(this.bkgCanvas.timeline=new Timeline),this.cnvs.hasOwnProperty("resized")||(this.cnvs.setAttribute("width",this.rawWidth),this.cnvs.setAttribute("height",this.rawHeight),this.cnvs.resized=!0),this.buffered&&(this.cnvs.buf=document.createElement("canvas"),this.cnvs.buf.setAttribute("width",this.rawWidth),this.cnvs.buf.setAttribute("height",this.rawHeight),this.bufCtx=this.cnvs.buf.getContext("2d")),this.ctx=this.cnvs.getContext("2d"),this.yDown=!1,this.vpW=this.rawWidth,this.vpH=this.rawHeight,this.vpOrgX=0,this.vpOrgY=this.rawHeight,this.xscl=1,this.yscl=-1,this.xoffset=0,this.yoffset=0,this.savWC={xscl:this.xscl,yscl:this.yscl,xoffset:this.xoffset,yoffset:this.yoffset},this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",this.penCol="rgba(0, 0, 0, 1.0)",this.penWid=1,this.lineCap="butt",this.paintCol="rgba(128,128,128,1.0)",this.fontSize=12,this.fontWeight=400,this.fontFamily="Consolas, Monaco, 'Andale Mono', monospace",this.getUnique=function(){return l+=1},this.initModules(),void t(window,"resize",i))},Cango.prototype.initModules=function(){},Cango.prototype.getHostLayer=function(){var t,s=this.bkgCanvas.layers[0]
for(t=1;t<this.bkgCanvas.layers.length;t++)if(this.bkgCanvas.layers[t].id===this.cId){s=this.bkgCanvas.layers[t]
break}return s},Cango.prototype.toPixelCoords=function(t,s){var i=this.vpOrgX+this.xoffset+t*this.xscl,e=this.vpOrgY+this.yoffset+s*this.yscl
return{x:i,y:e}},Cango.prototype.toWorldCoords=function(t,s){var i=(t-this.vpOrgX-this.xoffset)/this.xscl,e=(s-this.vpOrgY-this.yoffset)/this.yscl
return{x:i,y:e}},Cango.prototype.getCursorPosWC=function(t){var s=t||window.event,i=this.cnvs.getBoundingClientRect(),e=(s.clientX-i.left-this.vpOrgX-this.xoffset)/this.xscl,r=(s.clientY-i.top-this.vpOrgY-this.yoffset)/this.yscl
return{x:e,y:r}},Cango.prototype.clearCanvas=function(t){function s(t){var s=r.toPixelCoords(t.grad[0],t.grad[1]),i=r.toPixelCoords(t.grad[2],t.grad[3]),e=r.ctx.createLinearGradient(s.x,s.y,i.x,i.y)
return t.colorStops.forEach(function(t){e.addColorStop(t[0],t[1])}),e}function i(t){var s=r.toPixelCoords(t.grad[0],t.grad[1]),i=t.grad[2]*r.xscl,e=r.toPixelCoords(t.grad[3],t.grad[4]),a=t.grad[5]*r.xscl,o=r.ctx.createRadialGradient(s.x,s.y,i,e.x,e.y,a)
return t.colorStops.forEach(function(t){o.addColorStop(t[0],t[1])}),o}var e,r=this
t?(this.ctx.save(),t instanceof LinearGradient?this.ctx.fillStyle=s(t):t instanceof RadialGradient?this.ctx.fillStyle=i(t):this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.rawWidth,this.rawHeight),this.ctx.restore()):this.ctx.clearRect(0,0,this.rawWidth,this.rawHeight),e=this.getHostLayer(),e.dragObjects.length=0,this.cnvs.alphaOvl&&this.cnvs.alphaOvl.parentNode&&this.cnvs.alphaOvl.parentNode.removeChild(this.cnvs.alphaOvl)},Cango.prototype.setGridboxRHC=function(t,s,i,e){e&&i&&e>0&&i>0?(this.vpW=i*this.rawWidth/100,this.vpH=e*this.rawWidth/100,this.vpOrgX=t*this.rawWidth/100,this.vpOrgY=this.rawHeight-s*this.rawWidth/100):(this.vpW=this.rawWidth,this.vpH=this.rawHeight,this.vpOrgX=0,this.vpOrgY=this.rawHeight),this.yDown=!1,this.setWorldCoords()},Cango.prototype.setGridboxSVG=function(t,s,i,e){e&&i&&e>0&&i>0?(this.vpW=i*this.rawWidth/100,this.vpH=e*this.rawWidth/100,this.vpOrgX=t*this.rawWidth/100,this.vpOrgY=(this.heightPW-s)*this.rawWidth/100):(this.vpW=this.rawWidth,this.vpH=this.rawHeight,this.vpOrgX=0,this.vpOrgY=0),this.yDown=!0,this.setWorldCoords()},Cango.prototype.fillGridbox=function(t){function s(t){var s=e.toPixelCoords(t.grad[0],t.grad[1]),i=e.toPixelCoords(t.grad[2],t.grad[3]),r=e.ctx.createLinearGradient(s.x,s.y,i.x,i.y)
return t.colorStops.forEach(function(t){r.addColorStop(t[0],t[1])}),r}function i(t){var s=e.toPixelCoords(t.grad[0],t.grad[1]),i=t.grad[2]*e.xscl,r=e.toPixelCoords(t.grad[3],t.grad[4]),a=t.grad[5]*e.xscl,o=e.ctx.createRadialGradient(s.x,s.y,i,r.x,r.y,a)
return t.colorStops.forEach(function(t){o.addColorStop(t[0],t[1])}),o}var e=this,r=t||this.paintCol,a=this.yscl>0?this.vpOrgY:this.vpOrgY-this.vpH
this.ctx.save(),r instanceof LinearGradient?this.ctx.fillStyle=s(r):r instanceof RadialGradient?this.ctx.fillStyle=i(r):this.ctx.fillStyle=r,this.ctx.fillRect(this.vpOrgX,a,this.vpW,this.vpH),this.ctx.restore()},Cango.prototype.setWorldCoords=function(t,s,i,e){var r=t||0,a=s||0
i&&i>0?this.xscl=this.vpW/i:this.xscl=1,e&&e>0?this.yscl=this.yDown?this.vpH/e:-this.vpH/e:this.yscl=this.yDown?this.xscl:-this.xscl,this.xoffset=-r*this.xscl,this.yoffset=-a*this.yscl,this.savWC={xscl:this.xscl,yscl:this.yscl,xoffset:this.xoffset,yoffset:this.yoffset}},Cango.prototype.setPropertyDefault=function(t,s){if("string"==typeof t&&void 0!==s&&null!==s)switch(t.toLowerCase()){case"fillcolor":("string"==typeof s||"object"==typeof s)&&(this.paintCol=s)
break
case"strokecolor":("string"==typeof s||"object"==typeof s)&&(this.penCol=s)
break
case"linewidth":case"strokewidth":this.penWid=s
break
case"linecap":"string"!=typeof s||"butt"!==s&&"round"!==s&&"square"!==s||(this.lineCap=s)
break
case"fontfamily":"string"==typeof s&&(this.fontFamily=s)
break
case"fontsize":this.fontSize=s
break
case"fontweight":("string"==typeof s||s>=100&&900>=s)&&(this.fontWeight=s)
break
case"steptime":s>=15&&500>=s&&(this.stepTime=s)
break
default:return}},Cango.prototype.dropShadow=function(t,s){var i=t.shadowOffsetX||0,e=t.shadowOffsetY||0,r=t.shadowBlur||0,a=t.shadowColor||"#000000",o=s||1,h=s||1
void 0!==this.ctx.shadowOffsetX&&("SHAPE"===t.type||"PATH"===t.type&&!t.iso?(o*=this.xscl,h*=this.yscl):(o*=this.xscl,h*=-this.xscl),this.ctx.shadowOffsetX=i*o,this.ctx.shadowOffsetY=e*h,this.ctx.shadowBlur=r*o,this.ctx.shadowColor=a)},Cango.prototype.render=function(s,r,a,o,h){function n(s){function i(){s.formatImg(),c.paintImg(s,r,a,o,h)}"IMG"===s.type?s.imgBuf.complete?i():t(s.imgBuf,"load",i):"TEXT"===s.type?(s.formatText(c),c.paintText(s,r,a,o,h)):c.paintPath(s,r,a,o,h)}var c=this
i(s)?e(s).forEach(n):s&&n(s)},Cango.prototype.paintImg=function(t,s,i,e,r){function a(t){return[t[0]*n-t[1]*h,t[0]*h+t[1]*n]}var o,h,n,c,d,l=this,p=t.imgBuf,f=s||0,g=i||0,u=e||1,m=u*t.imgXscale,C=r||0
this.ctx.save(),this.dropShadow(t,u),this.ctx.translate(this.vpOrgX+this.xoffset+f*this.xscl,this.vpOrgY+this.yoffset+g*this.yscl),C+=t.imgDegs,C&&(o=this.yscl>0?-C*Math.PI/180:C*Math.PI/180,h=Math.sin(o),n=Math.cos(o),this.ctx.rotate(-o)),this.ctx.drawImage(p,this.xscl*m*(t.imgX+t.imgLorgX),this.xscl*m*(t.imgY+t.imgLorgY),this.xscl*m*t.width,this.xscl*m*t.height),this.ctx.restore(),t.bBoxCmds.forEach(function(t){var s,i
t.parms.length&&(s=C?a(t.parms[0]):[t.parms[0][0],t.parms[0][1]],s[0]*=m*l.xscl,s[1]*=-m*l.xscl,i=l.toPixelCoords(f,g),t.parmsPx[0]=s[0]+i.x,t.parmsPx[1]=s[1]+i.y)}),t.border&&(this.ctx.save(),this.ctx.beginPath(),t.bBoxCmds.forEach(function(t){l.ctx[t.drawFn].apply(l.ctx,t.parmsPx)}),this.ctx.strokeStyle=t.strokeCol||this.penCol,this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.stroke(),this.ctx.restore()),t.dwgOrg.x=f,t.dwgOrg.y=g,null!==t.dragNdrop&&(c=this.getHostLayer(),c!==t.dragNdrop.layer&&t.dragNdrop.layer&&(d=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==d&&t.dragNdrop.layer.dragObjects.splice(d,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=c,-1===t.dragNdrop.layer.dragObjects.indexOf(t)&&t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.paintPath=function(t,s,i,e,r){function a(t,s){var i,e=t.grad[0],r=t.grad[1],a=t.grad[2],o=t.grad[3],h=m.xscl,n=m.yscl
return s&&(n=m.yscl>0?m.xscl:-m.xscl),i=m.ctx.createLinearGradient(h*e,n*r,h*a,n*o),t.colorStops.forEach(function(t){i.addColorStop(t[0],t[1])}),i}function o(t,s){var i,e=t.grad[0],r=t.grad[1],a=t.grad[2],o=t.grad[3],h=t.grad[4],n=t.grad[5],c=m.xscl,d=m.yscl
return s&&(d=m.yscl>0?m.xscl:-m.xscl),i=m.ctx.createRadialGradient(c*e,d*r,c*a,c*o,d*h,c*n),t.colorStops.forEach(function(t){i.addColorStop(t[0],t[1])}),i}function h(t){return[t[0]*d-t[1]*c,t[0]*c+t[1]*d]}var n,c,d,l,p,f,g,u,m=this,C=s||0,x=i||0,v=e||1,y=r||0,w=this.vpOrgX+this.xoffset+C*this.xscl,b=this.vpOrgY+this.yoffset+x*this.yscl,O=this.xscl,k=this.yscl
t.iso&&(k=this.yscl>0?this.xscl:-this.xscl),y&&(n=this.yscl>0?-y*Math.PI/180:y*Math.PI/180,c=Math.sin(n),d=Math.cos(n)),this.ctx.save(),this.dropShadow(t,v),this.ctx.translate(w,b),this.ctx.scale(v,v),this.ctx.beginPath(),t.drawCmds.forEach(function(t){t.parmsPx=[],t.parms.forEach(function(s){var i
i=y?h(s):[s[0],s[1]],i[0]*=O,i[1]*=k,t.parmsPx.push(i[0],i[1])}),m.ctx[t.drawFn].apply(m.ctx,t.parmsPx)}),"SHAPE"===t.type&&(p=t.fillCol||this.paintCol,p instanceof LinearGradient?(f=a(p,t.iso),this.ctx.fillStyle=f):p instanceof RadialGradient?(f=o(p,t.iso),this.ctx.fillStyle=f):this.ctx.fillStyle=p,this.ctx.fill(),this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0,this.ctx.shadowBlur=0),("PATH"===t.type||t.border)&&(t.dashed&&(this.ctx.setLineDash(t.dashed),this.ctx.lineDashOffset=t.dashOffset),this.ctx.strokeStyle=t.strokeCol||this.penCol,this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.stroke()),this.ctx.restore(),t.drawCmds.forEach(function(t){for(l=0;l<t.parms.length;l++)t.parmsPx[2*l]=t.parmsPx[2*l]*v+w,t.parmsPx[2*l+1]=t.parmsPx[2*l+1]*v+b}),t.dwgOrg.x=C,t.dwgOrg.y=x,null!==t.dragNdrop&&(g=this.getHostLayer(),g!==t.dragNdrop.layer&&t.dragNdrop.layer&&(u=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==u&&t.dragNdrop.layer.dragObjects.splice(u,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=g,-1===t.dragNdrop.layer.dragObjects.indexOf(t)&&t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.paintText=function(t,s,i,e,r){function a(t){return[t[0]*h-t[1]*o,t[0]*o+t[1]*h]}var o,h,n,c,d,l,p,f=this,g=0,u=s||0,m=i||0,C=e||1,x=C*t.imgXscale,v=r||0
this.ctx.save(),this.dropShadow(t,x),this.ctx.translate(this.vpOrgX+this.xoffset+u*this.xscl,this.vpOrgY+this.yoffset+m*this.yscl),this.ctx.scale(x,x),v+=t.imgDegs,v&&(g=this.yscl>0?-v*Math.PI/180:v*Math.PI/180,o=Math.sin(g),h=Math.cos(g),this.ctx.rotate(-g)),n=t.fontWeight||this.fontWeight,c=t.fontSize||this.fontSize,d=t.fontFamily||this.fontFamily,this.ctx.font=n+" "+c+"px "+d,this.ctx.fillStyle=t.fillCol||this.paintCol,this.ctx.fillText(t.drawCmds,this.xscl*(t.imgX+t.imgLorgX),-this.xscl*(t.imgY+t.imgLorgY)),t.border&&(this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0,this.ctx.shadowBlur=0,this.ctx.strokeStyle=t.strokeCol||this.penCol,this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.strokeText(t.drawCmds,this.xscl*(t.imgX+t.imgLorgX),-this.xscl*(t.imgY+t.imgLorgY))),this.ctx.restore(),t.bBoxCmds.forEach(function(t){var s,i
t.parms.length&&(s=v?a(t.parms[0]):[t.parms[0][0],t.parms[0][1]],s[0]*=x*f.xscl,s[1]*=-x*f.xscl,i=f.toPixelCoords(u,m),t.parmsPx[0]=s[0]+i.x,t.parmsPx[1]=s[1]+i.y)}),t.dwgOrg.x=u,t.dwgOrg.y=m,null!==t.dragNdrop&&(l=this.getHostLayer(),l!==t.dragNdrop.layer&&t.dragNdrop.layer&&(p=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==p&&t.dragNdrop.layer.dragObjects.splice(p,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=l,-1===t.dragNdrop.layer.dragObjects.indexOf(t)&&t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.drawPath=function(t,s,i,e){var r=new Cobj(t,"PATH",e)
return this.render(r,s,i),r},Cango.prototype.drawShape=function(t,s,i,e){var r=new Cobj(t,"SHAPE",e)
return this.render(r,s,i),r},Cango.prototype.drawText=function(t,s,i,e){var r=new Cobj(t,"TEXT",e)
return this.render(r,s,i),r},Cango.prototype.drawImg=function(t,s,i,e){var r=new Cobj(t,"IMG",e)
return this.render(r,s,i),r},Cango.prototype.clipPath=function(t){var s,i,e=this
"IMG"!==t.type&&"TEXT"!==t.type&&(s=this.xscl,i=this.yscl,t.iso&&(i=this.yscl>0?this.xscl:-this.xscl),this.ctx.save(),this.ctx.beginPath(),t.drawCmds.forEach(function(t){var r,a,o=[]
t.parms.forEach(function(t){r=e.vpOrgX+e.xoffset+s*t[0],a=e.vpOrgY+e.yoffset+i*t[1],o.push(r,a)}),e.ctx[t.drawFn].apply(e.ctx,o)}),this.ctx.clip())},Cango.prototype.resetClip=function(){this.ctx.restore()},Cango.prototype.createLayer=function(){var t,s,i,e,r,a,o=this.rawWidth,h=this.rawHeight,c=this.bkgCanvas.layers.length
return-1!==this.cId.indexOf("_ovl_")?(console.log("canvas layers can't create layers"),""):(i=this.getUnique(),e=this.cId+"_ovl_"+i,t="<canvas id='"+e+"' style='position:absolute' width='"+o+"' height='"+h+"'></canvas>",a=this.bkgCanvas.layers[c-1].cElem,a.insertAdjacentHTML("afterend",t),s=document.getElementById(e),s.style.backgroundColor="transparent",s.style.left=this.bkgCanvas.offsetLeft+this.bkgCanvas.clientLeft+"px",s.style.top=this.bkgCanvas.offsetTop+this.bkgCanvas.clientTop+"px",s.style.width=this.bkgCanvas.offsetWidth+"px",s.style.height=this.bkgCanvas.offsetHeight+"px",r=new n(e,s),this.bkgCanvas.layers.push(r),e)},Cango.prototype.deleteLayer=function(t){var s,i
for(i=1;i<this.bkgCanvas.layers.length;i++)this.bkgCanvas.layers[i].id===t&&(s=this.bkgCanvas.layers[i].cElem,s&&(s.alphaOvl&&s.alphaOvl.parentNode&&s.alphaOvl.parentNode.removeChild(s.alphaOvl),s.parentNode.removeChild(s)),this.bkgCanvas.layers.splice(i,1))},Cango.prototype.deleteAllLayers=function(){var t,s
for(t=this.bkgCanvas.layers.length-1;t>0;t--)s=this.bkgCanvas.layers[t].cElem,s&&(s.alphaOvl&&s.alphaOvl.parentNode&&s.alphaOvl.parentNode.removeChild(s.alphaOvl),s.parentNode.removeChild(s)),this.bkgCanvas.layers.splice(t,1)},Cango.prototype.dupCtx=function(t){this.vpW=t.vpW,this.vpH=t.vpH,this.vpOrgX=t.vpOrgX,this.vpOrgY=t.vpOrgY,this.xscl=t.xscl,this.yscl=t.yscl,this.xoffset=t.xoffset,this.yoffset=t.yoffset,this.savWC=s(t.savWC),this.penCol=t.penCol.slice(0),this.penWid=t.penWid,this.lineCap=t.lineCap.slice(0),this.paintCol=t.paintCol.slice(0),this.fontFamily=t.fontFamily.slice(0),this.fontSize=t.fontSize,this.fontWeight=t.fontWeight},Cango.prototype.toImgObj=function(t){var s,i,e,r,a,o,h,n,c,d,l,p,f=this.xscl,g=this.yscl,u=new Cobj("","IMG")
if("PATH"!==t.type&&"SHAPE"!==t.type)return null
for(t.iso&&(g=this.yscl>0?this.xscl:-this.xscl),r=i=t.drawCmds[0].parms[0][0],e=s=t.drawCmds[0].parms[0][1],l=1;l<t.drawCmds.length;l++)for(p=0;p<t.drawCmds[l].parms.length;p++)t.drawCmds[l].parms[p][0]>i&&(i=t.drawCmds[l].parms[p][0]),t.drawCmds[l].parms[p][0]<r&&(r=t.drawCmds[l].parms[p][0]),t.drawCmds[l].parms[p][1]>s&&(s=t.drawCmds[l].parms[p][1]),t.drawCmds[l].parms[p][1]<e&&(e=t.drawCmds[l].parms[p][1])
return a=r*f-2,o=this.yscl>0?e*g-2:e*g+2,h=(i-r)*f+4,n=this.yscl>0?(s-e)*g+4:(e-s)*g+4,c=document.createElement("canvas"),c.setAttribute("width",h),c.setAttribute("height",n),d=new Cango(this.cId),d.dupCtx(this),d.cnvs=c,d.cId="_sprite_",d.ctx=d.cnvs.getContext("2d"),d.rawWidth=h,d.rawHeight=n,d.vpW=d.rawWidth,d.vpH=d.rawHeight,d.vpOrgX=0,d.vpOrgY=this.yscl>0?0:d.rawHeight,d.xoffset=-a,d.yoffset=-o,this.paintPath.call(d,t),u.imgXscale=1/this.xscl,u.imgBuf.src=d.cnvs.toDataURL(),u},Cango}()