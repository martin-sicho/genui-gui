/**
* @license smilesDrawer Copyright (c) 2017 GDB / Reymond Research Group.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

(function d(g,e,t){function a(i,r){if(!e[i]){if(!g[i]){var o="function"==typeof require&&require;if(!r&&o)return o(i,!0);if(n)return n(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var h=e[i]={exports:{}};g[i][0].call(h.exports,function(t){var e=g[i][1][t];return a(e?e:t)},h,h.exports,d,g,e,t)}return e[i].exports}for(var n="function"==typeof require&&require,i=0;i<t.length;i++)a(t[i]);return a})({1:[function(e){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}var n=Math.min,i=Math.max,a=e("./src/Drawer"),r=t(a),o=e("./src/Parser"),l=t(o);window.SmilesDrawer={Version:"1.0.0"},window.SmilesDrawer.Drawer=r.default,window.SmilesDrawer.Parser=l.default,window.SmilesDrawer.clean=function(e){return e.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g,"")},window.SmilesDrawer.apply=function(e){for(var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"canvas[data-smiles]",n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"light",a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null,o=new r.default(e),l=document.querySelectorAll(t),s=function(){var e=l[d];SmilesDrawer.parse(e.getAttribute("data-smiles"),function(t){o.draw(t,e,n,!1)},function(e){a&&a(e)})},d=0;d<l.length;d++)s()},window.SmilesDrawer.parse=function(e,t,n){try{t&&t(l.default.parse(e))}catch(e){n&&n(e)}},Array.prototype.fill||Object.defineProperty(Array.prototype,"fill",{value:function(e){if(null==this)throw new TypeError("this is null or not defined");for(var t=Object(this),a=t.length>>>0,r=arguments[1],o=r>>0,l=0>o?i(a+o,0):n(o,a),s=arguments[2],d=void 0===s?a:s>>0,g=0>d?i(a+d,0):n(d,a);l<g;)t[l]=e,l++;return t}})},{"./src/Drawer":5,"./src/Parser":10}],2:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){i(this,e)}return r(e,null,[{key:"clone",value:function(t){var n=Array.isArray(t)?[]:{};for(var i in t){var r=t[i];n[i]="function"==typeof r.clone?r.clone():"object"===("undefined"==typeof r?"undefined":a(r))?e.clone(r):r}return n}},{key:"equals",value:function(e,t){if(e.length!==t.length)return!1;for(var n=e.slice().sort(),a=t.slice().sort(),r=0;r<n.length;r++)if(n[r]!==a[r])return!1;return!0}},{key:"print",value:function(e){if(0==e.length)return"";for(var t="(",n=0;n<e.length;n++)t+=e[n].id?e[n].id+", ":e[n]+", ";return t=t.substring(0,t.length-2),t+")"}},{key:"each",value:function(e,t){for(var n=0;n<e.length;n++)t(e[n])}},{key:"get",value:function(e,t,n){for(var a=0;a<e.length;a++)if(e[a][t]==n)return e[a]}},{key:"contains",value:function(e,t){if(!t.property&&!t.func){for(var n=0;n<e.length;n++)if(e[n]==t.value)return!0;}else if(t.func){for(var i=0;i<e.length;i++)if(t.func(e[i]))return!0;}else for(var a=0;a<e.length;a++)if(e[a][t.property]==t.value)return!0;return!1}},{key:"intersection",value:function(e,t){for(var n=[],a=0;a<e.length;a++)for(var i=0;i<t.length;i++)e[a]===t[i]&&n.push(e[a]);return n}},{key:"unique",value:function(e){var t={};return e.filter(function(e){return void 0===t[e]&&(t[e]=!0)})}},{key:"count",value:function(e,t){for(var n=0,a=0;a<e.length;a++)e[a]===t&&n++;return n}},{key:"toggle",value:function(e,t){for(var n=[],a=!1,r=0;r<e.length;r++)e[r]===t?a=!0:n.push(e[r]);return a||n.push(t),n}},{key:"remove",value:function(e,t){for(var n=[],a=0;a<e.length;a++)e[a]!==t&&n.push(e[a]);return n}},{key:"removeUnique",value:function(e,t){var n=e.indexOf(t);return-1<n&&e.splice(n,1),e}},{key:"removeAll",value:function(e,t){return e.filter(function(e){return-1===t.indexOf(e)})}},{key:"merge",value:function(e,t){for(var n=Array(e.length+t.length),a=0;a<e.length;a++)n[a]=e[a];for(var i=0;i<t.length;i++)n[e.length+i]=t[i];return n}},{key:"containsAll",value:function(e,t){for(var n=0,a=0;a<e.length;a++)for(var i=0;i<t.length;i++)e[a]===t[i]&&n++;return n===t.length}},{key:"sortByAtomicNumberDesc",value:function(t){var e=t.map(function(t,e){return{index:e,value:t.atomicNumber.split(".").map(Number)}});return e.sort(function(e,t){for(var n=Math.min(t.value.length,e.value.length),a=0;a<n&&t.value[a]===e.value[a];)a++;return a===n?t.value.length-e.value.length:t.value[a]-e.value[a]}),e.map(function(n){return t[n.index]})}},{key:"deepCopy",value:function(t){for(var n=[],a=0,i;a<t.length;a++)i=t[a],n[a]=i instanceof Array?e.deepCopy(i):i;return n}}]),e}();n.default=o},{}],3:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./ArrayHelper"),l=i(o),s=e("./Vertex"),d=i(s),g=e("./Ring"),u=i(g),h=function(){function e(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"-";a(this,e),this.element=1===t.length?t.toUpperCase():t,this.drawExplicit=!1,this.ringbonds=[],this.rings=[],this.bondType=n,this.branchBond=null,this.isBridge=!1,this.isBridgeNode=!1,this.originalRings=[],this.bridgedRing=null,this.anchoredRings=[],this.bracket=null,this.plane=0,this.attachedPseudoElements={},this.hasAttachedPseudoElements=!1,this.isDrawn=!0,this.isConnectedToRing=!1,this.neighbouringElements=[],this.isPartOfAromaticRing=t!==this.element,this.bondCount=0,this.chirality="",this.isStereoCenter=!1,this.priority=0,this.mainChain=!1,this.hydrogenDirection="down",this.subtreeDepth=1,this.hasHydrogen=!1}return r(e,[{key:"addNeighbouringElement",value:function(e){this.neighbouringElements.push(e)}},{key:"attachPseudoElement",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:0;null===n&&(n=0),null===i&&(i=0);var a=n+e+i;this.attachedPseudoElements[a]?this.attachedPseudoElements[a].count+=1:this.attachedPseudoElements[a]={element:e,count:1,hydrogenCount:n,previousElement:t,charge:i},this.hasAttachedPseudoElements=!0}},{key:"getAttachedPseudoElements",value:function(){var e={},t=this;return Object.keys(this.attachedPseudoElements).sort().forEach(function(n){e[n]=t.attachedPseudoElements[n]}),e}},{key:"getAttachedPseudoElementsCount",value:function(){return Object.keys(this.attachedPseudoElements).length}},{key:"isHeteroAtom",value:function(){return"C"!==this.element&&"H"!==this.element}},{key:"addAnchoredRing",value:function(e){l.default.contains(this.anchoredRings,{value:e})||this.anchoredRings.push(e)}},{key:"getRingbondCount",value:function(){return this.ringbonds.length}},{key:"backupRings",value:function(){this.originalRings=Array(this.rings.length);for(var e=0;e<this.rings.length;e++)this.originalRings[e]=this.rings[e]}},{key:"restoreRings",value:function(){this.rings=Array(this.originalRings.length);for(var e=0;e<this.originalRings.length;e++)this.rings[e]=this.originalRings[e]}},{key:"haveCommonRingbond",value:function(e,t){for(var n=0;n<e.ringbonds.length;n++)for(var i=0;i<t.ringbonds.length;i++)if(e.ringbonds[n].id==t.ringbonds[i].id)return!0;return!1}},{key:"neighbouringElementsEqual",value:function(e){if(e.length!==this.neighbouringElements.length)return!1;e.sort(),this.neighbouringElements.sort();for(var t=0;t<this.neighbouringElements.length;t++)if(e[t]!==this.neighbouringElements[t])return!1;return!0}},{key:"getAtomicNumber",value:function(){return e.atomicNumbers[this.element]}},{key:"getMaxBonds",value:function(){return e.maxBonds[this.element]}}],[{key:"maxBonds",get:function(){return{C:4,N:3,O:2,P:3,S:2,B:3,F:1,I:1,Cl:1,Br:1}}},{key:"atomicNumbers",get:function(){return{H:1,He:2,Li:3,Be:4,B:5,b:5,C:6,c:6,N:7,n:7,O:8,o:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,p:15,S:16,s:16,Cl:17,Ar:18,K:19,Ca:20,Sc:21,Ti:22,V:23,Cr:24,Mn:25,Fe:26,Co:27,Ni:28,Cu:29,Zn:30,Ga:31,Ge:32,As:33,Se:34,Br:35,Kr:36,Rb:37,Sr:38,Y:39,Zr:40,Nb:41,Mo:42,Tc:43,Ru:44,Rh:45,Pd:46,Ag:47,Cd:48,In:49,Sn:50,Sb:51,Te:52,I:53,Xe:54,Cs:55,Ba:56,La:57,Ce:58,Pr:59,Nd:60,Pm:61,Sm:62,Eu:63,Gd:64,Tb:65,Dy:66,Ho:67,Er:68,Tm:69,Yb:70,Lu:71,Hf:72,Ta:73,W:74,Re:75,Os:76,Ir:77,Pt:78,Au:79,Hg:80,Tl:81,Pb:82,Bi:83,Po:84,At:85,Rn:86,Fr:87,Ra:88,Ac:89,Th:90,Pa:91,U:92,Np:93,Pu:94,Am:95,Cm:96,Bk:97,Cf:98,Es:99,Fm:100,Md:101,No:102,Lr:103,Rf:104,Db:105,Sg:106,Bh:107,Hs:108,Mt:109,Ds:110,Rg:111,Cn:112,Uut:113,Uuq:114,Uup:115,Uuh:116,Uus:117,Uuo:118}}},{key:"mass",get:function(){return{H:1,He:2,Li:3,Be:4,B:5,b:5,C:6,c:6,N:7,n:7,O:8,o:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,p:15,S:16,s:16,Cl:17,Ar:18,K:19,Ca:20,Sc:21,Ti:22,V:23,Cr:24,Mn:25,Fe:26,Co:27,Ni:28,Cu:29,Zn:30,Ga:31,Ge:32,As:33,Se:34,Br:35,Kr:36,Rb:37,Sr:38,Y:39,Zr:40,Nb:41,Mo:42,Tc:43,Ru:44,Rh:45,Pd:46,Ag:47,Cd:48,In:49,Sn:50,Sb:51,Te:52,I:53,Xe:54,Cs:55,Ba:56,La:57,Ce:58,Pr:59,Nd:60,Pm:61,Sm:62,Eu:63,Gd:64,Tb:65,Dy:66,Ho:67,Er:68,Tm:69,Yb:70,Lu:71,Hf:72,Ta:73,W:74,Re:75,Os:76,Ir:77,Pt:78,Au:79,Hg:80,Tl:81,Pb:82,Bi:83,Po:84,At:85,Rn:86,Fr:87,Ra:88,Ac:89,Th:90,Pa:91,U:92,Np:93,Pu:94,Am:95,Cm:96,Bk:97,Cf:98,Es:99,Fm:100,Md:101,No:102,Lr:103,Rf:104,Db:105,Sg:106,Bh:107,Hs:108,Mt:109,Ds:110,Rg:111,Cn:112,Uut:113,Uuq:114,Uup:115,Uuh:116,Uus:117,Uuo:118}}}]),e}();n.default=h},{"./ArrayHelper":2,"./Ring":11,"./Vertex":15}],4:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=Number.MAX_VALUE;Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=e("./MathHelper"),s=i(l),d=e("./Vector2"),g=i(d),u=e("./Line"),h=i(u),c=e("./Vertex"),p=i(c),v=e("./Ring"),f=i(v),y=function(){function e(t,n,i){a(this,e),this.canvas="string"==typeof t||t instanceof String?document.getElementById(t):t,this.ctx=this.canvas.getContext("2d"),this.colors=n,this.opts=i,this.drawingWidth=0,this.drawingHeight=0,this.offsetX=0,this.offsetY=0,this.fontLarge=this.opts.fontSizeLarge+"pt Helvetica, Arial, sans-serif",this.fontSmall=this.opts.fontSizeSmall+"pt Helvetica, Arial, sans-serif",this.updateSize(this.opts.width,this.opts.height),this.ctx.font=this.fontLarge,this.hydrogenWidth=this.ctx.measureText("H").width,this.halfHydrogenWidth=this.hydrogenWidth/2,this.halfBondThickness=this.opts.bondThickness/2}return o(e,[{key:"updateSize",value:function(e,t){this.devicePixelRatio=window.devicePixelRatio||1,this.backingStoreRatio=this.ctx.webkitBackingStorePixelRatio||this.ctx.mozBackingStorePixelRatio||this.ctx.msBackingStorePixelRatio||this.ctx.oBackingStorePixelRatio||this.ctx.backingStorePixelRatio||1,this.ratio=this.devicePixelRatio/this.backingStoreRatio,1===this.ratio?(this.canvas.width=e*this.ratio,this.canvas.height=t*this.ratio):(this.canvas.width=e*this.ratio,this.canvas.height=t*this.ratio,this.canvas.style.width=e+"px",this.canvas.style.height=t+"px",this.ctx.setTransform(this.ratio,0,0,this.ratio,0,0))}},{key:"setTheme",value:function(e){this.colors=e}},{key:"scale",value:function(e){for(var t=-r,n=-r,a=r,o=r,l=0;l<e.length;l++)if(e[l].value.isDrawn){var i=e[l].position;t<i.x&&(t=i.x),n<i.y&&(n=i.y),a>i.x&&(a=i.x),o>i.y&&(o=i.y)}var s=20;t+=s,n+=s,a-=s,o-=s,this.drawingWidth=t-a,this.drawingHeight=n-o;var d=this.canvas.offsetWidth/this.drawingWidth,g=this.canvas.offsetHeight/this.drawingHeight,u=d<g?d:g;this.ctx.scale(u,u),this.offsetX=-a,this.offsetY=-o,d<g?this.offsetY+=this.canvas.offsetHeight/(2*u)-this.drawingHeight/2:this.offsetX+=this.canvas.offsetWidth/(2*u)-this.drawingWidth/2}},{key:"reset",value:function(){this.ctx.setTransform(1,0,0,1,0,0)}},{key:"getColor",value:function(e){return e=e.toUpperCase(),e in this.colors?this.colors[e]:this.colors.C}},{key:"drawCircle",value:function(e,t,n,i){var a=4<arguments.length&&void 0!==arguments[4]?arguments[4]:!0,r=5<arguments.length&&void 0!==arguments[5]&&arguments[5],o=6<arguments.length&&void 0!==arguments[6]?arguments[6]:"",l=this.ctx,d=this.offsetX,g=this.offsetY;l.save(),l.lineWidth=1.5,l.beginPath(),l.arc(e+d,t+g,n,0,s.default.twoPI,!0),l.closePath(),r?(a?(l.fillStyle="#f00",l.fill()):(l.strokeStyle="#f00",l.stroke()),this.drawDebugText(e,t,o)):a?(l.fillStyle=i,l.fill()):(l.strokeStyle=i,l.stroke()),l.restore()}},{key:"drawLine",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,i=this.ctx,a=this.offsetX,o=this.offsetY,s=e.clone().shorten(4),d=s.getLeftVector().clone(),l=s.getRightVector().clone();d.x+=a,d.y+=o,l.x+=a,l.y+=o,t||(i.save(),i.globalCompositeOperation="destination-out",i.beginPath(),i.moveTo(d.x,d.y),i.lineTo(l.x,l.y),i.lineCap="round",i.lineWidth=this.opts.bondThickness+1.2,i.strokeStyle=this.getColor("BACKGROUND"),i.stroke(),i.globalCompositeOperation="source-over",i.restore()),d=e.getLeftVector().clone(),l=e.getRightVector().clone(),d.x+=a,d.y+=o,l.x+=a,l.y+=o,i.save(),i.beginPath(),i.moveTo(d.x,d.y),i.lineTo(l.x,l.y),i.lineCap="round",i.lineWidth=this.opts.bondThickness;var r=this.ctx.createLinearGradient(d.x,d.y,l.x,l.y);r.addColorStop(0.4,this.getColor(e.getLeftElement())||this.getColor("C")),r.addColorStop(0.6,this.getColor(e.getRightElement())||this.getColor("C")),t&&(i.setLineDash([1,1]),i.lineWidth=this.opts.bondThickness),1>n&&(i.globalAlpha=n),i.strokeStyle=r,i.stroke(),i.restore()}},{key:"drawWedge",value:function(e){1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;if(!(isNaN(e.from.x)||isNaN(e.from.y)||isNaN(e.to.x)||isNaN(e.to.y))){var n=this.ctx,i=this.offsetX,a=this.offsetY,o=e.clone().shorten(5),s=o.getLeftVector().clone(),l=o.getRightVector().clone();s.x+=i,s.y+=a,l.x+=i,l.y+=a,s=e.getLeftVector().clone(),l=e.getRightVector().clone(),s.x+=i,s.y+=a,l.x+=i,l.y+=a,n.save();var r=g.default.normals(s,l);r[0].normalize(),r[1].normalize();var d=e.getRightChiral(),h=s,c=l;d&&(h=l,c=s);var p=g.default.add(h,g.default.multiplyScalar(r[0],this.halfBondThickness)),t=g.default.add(c,g.default.multiplyScalar(r[0],1.5+this.halfBondThickness)),u=g.default.add(c,g.default.multiplyScalar(r[1],1.5+this.halfBondThickness)),v=g.default.add(h,g.default.multiplyScalar(r[1],this.halfBondThickness));n.beginPath(),n.moveTo(p.x,p.y),n.lineTo(t.x,t.y),n.lineTo(u.x,u.y),n.lineTo(v.x,v.y);var f=this.ctx.createRadialGradient(l.x,l.y,this.opts.bondLength,l.x,l.y,0);f.addColorStop(0.4,this.getColor(e.getLeftElement())||this.getColor("C")),f.addColorStop(0.6,this.getColor(e.getRightElement())||this.getColor("C")),n.fillStyle=f,n.fill(),n.restore()}}},{key:"drawDashedWedge",value:function(e){if(!(isNaN(e.from.x)||isNaN(e.from.y)||isNaN(e.to.x)||isNaN(e.to.y))){var n=this.ctx,i=this.offsetX,a=this.offsetY,o=e.getLeftVector().clone(),l=e.getRightVector().clone();o.x+=i,o.y+=a,l.x+=i,l.y+=a,n.save();var r=g.default.normals(o,l);r[0].normalize(),r[1].normalize();var s=e.getRightChiral(),d=e.clone(),u,h,c,p;s?(u=l,h=o,d.shortenRight(1),c=d.getRightVector().clone(),p=d.getLeftVector().clone()):(u=o,h=l,d.shortenLeft(1),c=d.getLeftVector().clone(),p=d.getRightVector().clone()),c.x+=i,c.y+=a,p.x+=i,p.y+=a;var v=g.default.subtract(h,u).normalize();n.strokeStyle=this.getColor("C"),n.lineCap="round",n.lineWidth=this.opts.bondThickness,n.beginPath();for(var f=e.getLength(),y=1.25/(f/(3*this.opts.bondThickness)),m=!1,b=0;1>b;b+=y){var t=g.default.multiplyScalar(v,b*f),k=g.default.add(u,t),x=1.5*b,C=g.default.multiplyScalar(r[0],x);!m&&0.5<b&&(n.stroke(),n.beginPath(),n.strokeStyle=this.getColor(e.getRightElement())||this.getColor("C"),m=!0),k.subtract(C),n.moveTo(k.x,k.y),k.add(g.default.multiplyScalar(C,2)),n.lineTo(k.x,k.y)}n.stroke(),n.restore()}}},{key:"drawDebugText",value:function(e,t,n){var i=this.ctx;i.save(),i.font="5px Droid Sans, sans-serif",i.textAlign="start",i.textBaseline="top",i.fillStyle="#ff0000",i.fillText(n,e+this.offsetX,t+this.offsetY),i.restore()}},{key:"drawBall",value:function(e,t,n){var i=this.ctx;i.save(),i.beginPath(),i.arc(e+this.offsetX,t+this.offsetY,this.opts.bondLength/4.5,0,s.default.twoPI,!1),i.fillStyle=this.getColor(n),i.fill(),i.restore()}},{key:"drawPoint",value:function(e,t,n){var i=this.ctx,a=this.offsetX,r=this.offsetY;i.save(),i.globalCompositeOperation="destination-out",i.beginPath(),i.arc(e+a,t+r,1.5,0,s.default.twoPI,!0),i.closePath(),i.fill(),i.globalCompositeOperation="source-over",i.beginPath(),i.arc(e+this.offsetX,t+this.offsetY,0.75,0,s.default.twoPI,!1),i.fillStyle=this.getColor(n),i.fill(),i.restore()}},{key:"drawText",value:function(e,t,n,i,a,o,l,d){var g=8<arguments.length&&void 0!==arguments[8]?arguments[8]:{},u=this.ctx,h=this.offsetX,c=this.offsetY;u.save(),u.textAlign="start",u.textBaseline="alphabetic";var p="",v=0;l&&(p=this.getChargeText(l),u.font=this.fontSmall,v=u.measureText(p).width);var f="0",y=0;0<d&&(f=d.toString(),u.font=this.fontSmall,y=u.measureText(f).width),1===l&&"N"===n&&g.hasOwnProperty("0O")&&g.hasOwnProperty("0O-1")&&(g={"0O":{element:"O",count:2,hydrogenCount:0,previousElement:"C",charge:""}},l=0),u.font=this.fontLarge,u.fillStyle=this.getColor("BACKGROUND");var m=u.measureText(n);m.totalWidth=m.width+v,m.height=parseInt(this.fontLarge,10);var b=m.width>this.opts.fontSizeLarge?m.width:this.opts.fontSizeLarge;b/=1.5,u.globalCompositeOperation="destination-out",u.beginPath(),u.arc(e+h,t+c,b,0,s.default.twoPI,!0),u.closePath(),u.fill(),u.globalCompositeOperation="source-over";var r=-m.width/2,k=-m.width/2;u.fillStyle=this.getColor(n),u.fillText(n,e+h+r,t+this.opts.halfFontSizeLarge+c),r+=m.width,l&&(u.font=this.fontSmall,u.fillText(p,e+h+r,t-this.opts.fifthFontSizeSmall+c),r+=v),0<d&&(u.font=this.fontSmall,u.fillText(f,e+h+k-y,t-this.opts.fifthFontSizeSmall+c),k-=y),u.font=this.fontLarge;var x=0,C=0;if(1===i){var S=e+h,R=t+c+this.opts.halfFontSizeLarge;x=this.hydrogenWidth,k-=x,"left"===a?S+=k:"right"===a?S+=r:"up"===a&&o?S+=r:"down"===a&&o?S+=r:"up"!==a||o?"down"===a&&!o&&(R+=this.opts.fontSizeLarge+this.opts.quarterFontSizeLarge,S-=this.halfHydrogenWidth):(R-=this.opts.fontSizeLarge+this.opts.quarterFontSizeLarge,S-=this.halfHydrogenWidth),u.fillText("H",S,R),r+=x}else if(1<i){var A=e+h,j=t+c+this.opts.halfFontSizeLarge;x=this.hydrogenWidth,u.font=this.fontSmall,C=u.measureText(i).width,k-=x+C,"left"===a?A+=k:"right"===a?A+=r:"up"===a&&o?A+=r:"down"===a&&o?A+=r:"up"!==a||o?"down"===a&&!o&&(j+=this.opts.fontSizeLarge+this.opts.quarterFontSizeLarge,A-=this.halfHydrogenWidth):(j-=this.opts.fontSizeLarge+this.opts.quarterFontSizeLarge,A-=this.halfHydrogenWidth),u.font=this.fontLarge,u.fillText("H",A,j),u.font=this.fontSmall,u.fillText(i,A+this.halfHydrogenWidth+C,j+this.opts.fifthFontSizeSmall),r+=x+this.halfHydrogenWidth+C}for(var T in g)if(g.hasOwnProperty(T)){var w=0,P=0,I=g[T].element,B=g[T].count,L=g[T].hydrogenCount,E=g[T].charge;u.font=this.fontLarge,1<B&&0<L&&(w=u.measureText("(").width,P=u.measureText(")").width);var D=u.measureText(I).width,N=0,_="",O=0;x=0,0<L&&(x=this.hydrogenWidth),u.font=this.fontSmall,1<B&&(N=u.measureText(B).width),0!==E&&(_=this.getChargeText(E),O=u.measureText(_).width),C=0,1<L&&(C=u.measureText(L).width),u.font=this.fontLarge;var V=e+h,z=t+c+this.opts.halfFontSizeLarge;u.fillStyle=this.getColor(I),0<B&&(k-=N),1<B&&0<L&&("left"===a?(k-=P,u.fillText(")",V+k,z)):(u.fillText("(",V+r,z),r+=w)),"left"===a?(k-=D,u.fillText(I,V+k,z)):(u.fillText(I,V+r,z),r+=D),0<L&&("left"===a?(k-=x+C,u.fillText("H",V+k,z),1<L&&(u.font=this.fontSmall,u.fillText(L,V+k+x,z+this.opts.fifthFontSizeSmall))):(u.fillText("H",V+r,z),r+=x,1<L&&(u.font=this.fontSmall,u.fillText(L,V+r,z+this.opts.fifthFontSizeSmall),r+=C))),u.font=this.fontLarge,1<B&&0<L&&("left"===a?(k-=w,u.fillText("(",V+k,z)):(u.fillText(")",V+r,z),r+=P)),u.font=this.fontSmall,1<B&&("left"===a?u.fillText(B,V+k+w+P+x+C+D,z+this.opts.fifthFontSizeSmall):(u.fillText(B,V+r,z+this.opts.fifthFontSizeSmall),r+=N)),0!==E&&("left"===a?u.fillText(_,V+k+w+P+x+C+D,t-this.opts.fifthFontSizeSmall+c):(u.fillText(_,V+r,t-this.opts.fifthFontSizeSmall+c),r+=O))}u.restore()}},{key:"getChargeText",value:function(e){return 1===e?"+":2===e?"2+":-1===e?"-":-2===e?"2-":""}},{key:"drawDebugPoint",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"#f00";this.drawCircle(e,t,2,i,!0,!0,n)}},{key:"drawAromaticityRing",value:function(e){var t=this.ctx,n=s.default.apothemFromSideLength(this.opts.bondLength,e.getSize());t.save(),t.strokeStyle=this.getColor("C"),t.lineWidth=this.opts.bondThickness,t.beginPath(),t.arc(e.center.x+this.offsetX,e.center.y+this.offsetY,n-this.opts.bondSpacing,0,2*Math.PI,!0),t.closePath(),t.stroke(),t.restore()}},{key:"clear",value:function(){this.ctx.clearRect(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight)}}]),e}();n.default=y},{"./Line":8,"./MathHelper":9,"./Ring":11,"./Vector2":14,"./Vertex":15}],5:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=Math.PI,l=Math.min;Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=e("./MathHelper"),g=i(d),u=e("./ArrayHelper"),h=i(u),c=e("./Vector2"),p=i(c),v=e("./Line"),f=i(v),y=e("./Vertex"),m=i(y),b=e("./Edge"),k=i(b),x=e("./Atom"),C=i(x),S=e("./Ring"),R=i(S),A=e("./RingConnection"),T=i(A),j=e("./CanvasWrapper"),w=i(j),P=e("./Graph"),I=i(P),B=e("./SSSR"),L=i(B),E=function(){function e(t){r(this,e),this.graph=null,this.doubleBondConfigCount=0,this.doubleBondConfig=null,this.ringIdCounter=0,this.ringConnectionIdCounter=0,this.canvasWrapper=null,this.totalOverlapScore=0,this.defaultOptions={width:500,height:500,bondThickness:0.6,bondLength:15,shortBondLength:0.85,bondSpacing:0.18*14.4,atomVisualization:"default",isomeric:!0,debug:!1,terminalCarbons:!1,explicitHydrogens:!1,overlapSensitivity:0.42,overlapResolutionIterations:1,compactDrawing:!0,fontSizeLarge:5,fontSizeSmall:3,themes:{dark:{C:"#fff",O:"#e74c3c",N:"#3498db",F:"#27ae60",CL:"#16a085",BR:"#d35400",I:"#8e44ad",P:"#d35400",S:"#f1c40f",B:"#e67e22",SI:"#e67e22",H:"#fff",BACKGROUND:"#141414"},light:{C:"#222",O:"#e74c3c",N:"#3498db",F:"#27ae60",CL:"#16a085",BR:"#d35400",I:"#8e44ad",P:"#d35400",S:"#f1c40f",B:"#e67e22",SI:"#e67e22",H:"#222",BACKGROUND:"#fff"}}},this.opts=this.extend(!0,this.defaultOptions,t),this.opts.halfBondSpacing=this.opts.bondSpacing/2,this.opts.bondLengthSq=this.opts.bondLength*this.opts.bondLength,this.opts.halfFontSizeLarge=this.opts.fontSizeLarge/2,this.opts.quarterFontSizeLarge=this.opts.fontSizeLarge/4,this.opts.fifthFontSizeSmall=this.opts.fontSizeSmall/5,this.theme=this.opts.themes.dark}return s(e,[{key:"extend",value:function(){var e=this,t={},n=!1,a=0,i=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(n=arguments[0],a++);for(var r=function(i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=n&&"[object Object]"===Object.prototype.toString.call(i[a])?e.extend(!0,t[a],i[a]):i[a])},o;a<i;a++)o=arguments[a],r(o);return t}},{key:"draw",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"light",r=3<arguments.length&&void 0!==arguments[3]&&arguments[3];if(this.data=e,this.canvasWrapper=new w.default(t,this.opts.themes[n],this.opts),this.infoOnly=r,this.ringIdCounter=0,this.ringConnectionIdCounter=0,this.graph=new I.default(e,this.opts.isomeric),this.rings=[],this.ringConnections=[],this.originalRings=[],this.originalRingConnections=[],this.bridgedRing=!1,this.doubleBondConfigCount=null,this.doubleBondConfig=null,this.initRings(),this.initHydrogens(),!this.infoOnly){this.position(),this.restoreRingInformation(),this.resolvePrimaryOverlaps();var l=this.getOverlapScore();this.totalOverlapScore=this.getOverlapScore().total;for(var s=0;s<this.opts.overlapResolutionIterations;s++)for(var o=0,i;o<this.graph.edges.length;o++)if(i=this.graph.edges[o],this.isEdgeRotatable(i)){var d=this.graph.getTreeDepth(i.sourceId,i.targetId),u=this.graph.getTreeDepth(i.targetId,i.sourceId),h=i.targetId,a=i.sourceId;d>u&&(h=i.sourceId,a=i.targetId);var c=this.getSubtreeOverlapScore(a,h,l.vertexScores);if(c.value>this.opts.overlapSensitivity){var p=this.graph.vertices[h],v=this.graph.vertices[a],f=v.getNeighbours(h);if(1===f.length){var y=this.graph.vertices[f[0]],m=y.position.getRotateAwayFromAngle(p.position,v.position,g.default.toRad(120));this.rotateSubtree(y.id,v.id,m,v.position);var b=this.getOverlapScore().total;b>this.totalOverlapScore?this.rotateSubtree(y.id,v.id,-m,v.position):this.totalOverlapScore=b}else if(2===f.length){if(0!==v.value.rings.length&&0!==p.value.rings.length)continue;var k=this.graph.vertices[f[0]],x=this.graph.vertices[f[1]];if(1===k.value.rings.length&&1===x.value.rings.length){if(k.value.rings[0]!==x.value.rings[0])continue;}else if(0!==k.value.rings.length||0!==x.value.rings.length)continue;else{var C=k.position.getRotateAwayFromAngle(p.position,v.position,g.default.toRad(120)),S=x.position.getRotateAwayFromAngle(p.position,v.position,g.default.toRad(120));this.rotateSubtree(k.id,v.id,C,v.position),this.rotateSubtree(x.id,v.id,S,v.position);var R=this.getOverlapScore().total;R>this.totalOverlapScore?(this.rotateSubtree(k.id,v.id,-C,v.position),this.rotateSubtree(x.id,v.id,-S,v.position)):this.totalOverlapScore=R}}l=this.getOverlapScore()}}this.resolveSecondaryOverlaps(l.scores),this.opts.isomeric&&this.annotateStereochemistry(),this.opts.compactDrawing&&"default"===this.opts.atomVisualization&&this.initPseudoElements(),this.rotateDrawing(),this.canvasWrapper.scale(this.graph.vertices),this.drawEdges(this.opts.debug),this.drawVertices(this.opts.debug),this.canvasWrapper.reset()}}},{key:"edgeRingCount",value:function(e){var t=this.graph.edges[e],n=this.graph.vertices[t.sourceId],i=this.graph.vertices[t.targetId];return l(n.value.rings.length,i.value.rings.length)}},{key:"getBridgedRings",value:function(){for(var e=[],t=0;t<this.rings.length;t++)this.rings[t].isBridged&&e.push(this.rings[t]);return e}},{key:"getFusedRings",value:function(){for(var e=[],t=0;t<this.rings.length;t++)this.rings[t].isFused&&e.push(this.rings[t]);return e}},{key:"getSpiros",value:function(){for(var e=[],t=0;t<this.rings.length;t++)this.rings[t].isSpiro&&e.push(this.rings[t]);return e}},{key:"printRingInfo",value:function(){for(var e="",t=0,n;t<this.rings.length;t++)n=this.rings[t],e+=n.id+";",e+=n.members.length+";",e+=n.neighbours.length+";",e+=n.isSpiro?"true;":"false;",e+=n.isFused?"true;":"false;",e+=n.isBridged?"true;":"false;",e+=n.rings.length+";",e+="\n";return e}},{key:"rotateDrawing",value:function(){for(var e=0,t=0,n=0,a=0,i;a<this.graph.vertices.length;a++)if(i=this.graph.vertices[a],!!i.value.isDrawn)for(var r=a+1,o;r<this.graph.vertices.length;r++)if(o=this.graph.vertices[r],!!o.value.isDrawn){var l=i.position.distanceSq(o.position);l>n&&(n=l,e=a,t=r)}var s=-p.default.subtract(this.graph.vertices[e].position,this.graph.vertices[t].position).angle();if(!isNaN(s)){var d=s%0.523599;0.2617995>d?s-=d:s+=0.523599-d;for(var a=0;a<this.graph.vertices.length;a++)a!==t&&this.graph.vertices[a].position.rotateAround(s,this.graph.vertices[t].position);for(var a=0;a<this.rings.length;a++)this.rings[a].center.rotateAround(s,this.graph.vertices[t].position)}}},{key:"getTotalOverlapScore",value:function(){return this.totalOverlapScore}},{key:"getRingCount",value:function(){return this.rings.length}},{key:"hasBridgedRing",value:function(){return this.bridgedRing}},{key:"getHeavyAtomCount",value:function(){for(var e=0,t=0;t<this.graph.vertices.length;t++)"H"!==this.graph.vertices[t].value.element&&e++;return e}},{key:"getRingbondType",value:function(e,t){if(1>e.value.getRingbondCount()||1>t.value.getRingbondCount())return null;for(var n=0;n<e.value.ringbonds.length;n++)for(var i=0;i<t.value.ringbonds.length;i++)if(e.value.ringbonds[n].id===t.value.ringbonds[i].id)return"-"===e.value.ringbonds[n].bondType?t.value.ringbonds[i].bond:e.value.ringbonds[n].bond;return null}},{key:"initRings",value:function(){for(var e=new Map,t=this.graph.vertices.length-1,n;0<=t;t--)if(n=this.graph.vertices[t],0!==n.value.ringbonds.length)for(var i=0,r;i<n.value.ringbonds.length;i++)if(r=n.value.ringbonds[i].id,!e.has(r))e.set(r,n.id);else{var o=n.id,l=e.get(r),s=this.graph.addEdge(new k.default(o,l,1)),d=this.graph.vertices[l];n.addRingbondChild(l,i),n.value.addNeighbouringElement(d.value.element),d.addRingbondChild(o,i),d.value.addNeighbouringElement(n.value.element),n.edges.push(s),d.edges.push(s),e.delete(r)}var g=L.default.getRings(this.graph);if(null!==g){for(var t=0;t<g.length;t++)for(var u=[].concat(a(g[t])),h=this.addRing(new R.default(u)),i=0;i<u.length;i++)this.graph.vertices[u[i]].value.rings.push(h);for(var t=0;t<this.rings.length-1;t++)for(var i=t+1;i<this.rings.length;i++){var c=this.rings[t],p=this.rings[i],v=new T.default(c,p);0<v.vertices.size&&this.addRingConnection(v)}for(var t=0,f;t<this.rings.length;t++)f=this.rings[t],f.neighbours=T.default.getNeighbours(this.ringConnections,f.id);for(var t=0,y;t<this.rings.length;t++)y=this.rings[t],this.graph.vertices[y.members[0]].value.addAnchoredRing(y.id);for(this.backupRingInformation();0<this.rings.length;){for(var m=-1,t=0,b;t<this.rings.length;t++)b=this.rings[t],this.isPartOfBridgedRing(b.id)&&!b.isBridged&&(m=b.id);if(-1===m)break;var x=this.getRing(m),C=this.getBridgedRingRings(x.id);this.bridgedRing=!0,this.createBridgedRing(C,x.members[0]);for(var t=0;t<C.length;t++)this.removeRing(C[t])}}}},{key:"initHydrogens",value:function(){if(!this.opts.explicitHydrogens)for(var e=0,t;e<this.graph.vertices.length;e++)if(t=this.graph.vertices[e],"H"===t.value.element){var n=this.graph.vertices[t.neighbours[0]];n.value.hasHydrogen=!0,(!n.value.isStereoCenter||2>n.value.rings.length&&!n.value.bridgedRing||n.value.bridgedRing&&2>n.value.originalRings.length)&&(t.value.isDrawn=!1)}}},{key:"getBridgedRingRings",value:function(e){var t=[],a=this;return function e(o){var r=a.getRing(o);t.push(o);for(var l=0,i;l<r.neighbours.length;l++)i=r.neighbours[l],-1===t.indexOf(i)&&i!==o&&T.default.isBridge(a.ringConnections,a.graph.vertices,o,i)&&e(i)}(e),h.default.unique(t)}},{key:"isPartOfBridgedRing",value:function(e){for(var t=0;t<this.ringConnections.length;t++)if(this.ringConnections[t].containsRing(e)&&this.ringConnections[t].isBridge(this.graph.vertices))return!0;return!1}},{key:"createBridgedRing",value:function(e){for(var t=new Set,n=new Set,r=new Set,o=0,i;o<e.length;o++){i=this.getRing(e[o]),i.isPartOfBridged=!0;for(var l=0;l<i.members.length;l++)n.add(i.members[l]);for(var l=0,s;l<i.neighbours.length;l++)s=i.neighbours[l],-1===e.indexOf(s)&&r.add(i.neighbours[l])}var d=new Set,g=!0,u=!1,c;try{for(var p=n[Symbol.iterator](),v;!(g=(v=p.next()).done);g=!0){var f=v.value,y=this.graph.vertices[f],m=h.default.intersection(e,y.value.rings);1===y.value.rings.length||1===m.length?t.add(y.id):d.add(y.id)}}catch(e){u=!0,c=e}finally{try{!g&&p.return&&p.return()}finally{if(u)throw c}}var b=[],k=!0,x=!1,C;try{for(var S=d[Symbol.iterator](),A;!(k=(A=S.next()).done);k=!0){for(var j=A.value,T=this.graph.vertices[j],w=!1,P=0;P<T.edges.length;P++)1===this.edgeRingCount(T.edges[P])&&(w=!0);w?(T.value.isBridgeNode=!0,t.add(T.id)):(T.value.isBridge=!0,t.add(T.id))}}catch(e){x=!0,C=e}finally{try{!k&&S.return&&S.return()}finally{if(x)throw C}}var I=new R.default([].concat(a(t)));I.isBridged=!0,I.neighbours=[].concat(a(r));for(var o=0;o<e.length;o++)I.rings.push(this.getRing(e[o]).clone());this.addRing(I);for(var o=0;o<I.members.length;o++)this.graph.vertices[I.members[o]].value.bridgedRing=I.id;for(var o=0,B;o<b.length;o++)B=this.graph.vertices[b[o]],B.value.rings=[];var L=!0,E=!1,D;try{for(var N=t[Symbol.iterator](),_;!(L=(_=N.next()).done);L=!0){var O=_.value,V=this.graph.vertices[O];V.value.rings=h.default.removeAll(V.value.rings,e),V.value.rings.push(I.id)}}catch(e){E=!0,D=e}finally{try{!L&&N.return&&N.return()}finally{if(E)throw D}}for(var o=0;o<e.length;o++)for(var l=o+1;l<e.length;l++)this.removeRingConnectionsBetween(e[o],e[l]);var z=!0,H=!1,F;try{for(var W=r[Symbol.iterator](),M;!(z=(M=W.next()).done);z=!0){for(var q=M.value,U=this.getRingConnections(q,e),l=0;l<U.length;l++)this.getRingConnection(U[l]).updateOther(I.id,q);this.getRing(q).neighbours.push(I.id)}}catch(e){H=!0,F=e}finally{try{!z&&W.return&&W.return()}finally{if(H)throw F}}return I}},{key:"areVerticesInSameRing",value:function(e,t){for(var n=0;n<e.value.rings.length;n++)for(var i=0;i<t.value.rings.length;i++)if(e.value.rings[n]===t.value.rings[i])return!0;return!1}},{key:"getCommonRings",value:function(e,t){for(var n=[],a=0;a<e.value.rings.length;a++)for(var i=0;i<t.value.rings.length;i++)e.value.rings[a]==t.value.rings[i]&&n.push(e.value.rings[a]);return n}},{key:"getLargestOrAromaticCommonRing",value:function(e,t){for(var n=this.getCommonRings(e,t),a=0,r=null,o=0;o<n.length;o++){var i=this.getRing(n[o]),l=i.getSize();if(i.isBenzeneLike(this.graph.vertices))return i;l>a&&(a=l,r=i)}return r}},{key:"getVerticesAt",value:function(e,t,n){for(var a=[],r=0,i;r<this.graph.vertices.length;r++)if(i=this.graph.vertices[r],i.id!==n&&i.positioned){var o=e.distanceSq(i.position);o<=t*t&&a.push(i.id)}return a}},{key:"getClosestVertex",value:function(e){for(var t=99999,n=null,a=0,i;a<this.graph.vertices.length;a++)if(i=this.graph.vertices[a],i.id!==e.id){var r=e.position.distanceSq(i.position);r<t&&(t=r,n=i)}return n}},{key:"addRing",value:function(e){return e.id=this.ringIdCounter++,this.rings.push(e),e.id}},{key:"removeRing",value:function(e){this.rings=this.rings.filter(function(t){return t.id!==e}),this.ringConnections=this.ringConnections.filter(function(t){return t.firstRingId!==e&&t.secondRingId!==e});for(var t=0,n;t<this.rings.length;t++)n=this.rings[t],n.neighbours=n.neighbours.filter(function(t){return t!==e})}},{key:"getRing",value:function(e){for(var t=0;t<this.rings.length;t++)if(this.rings[t].id==e)return this.rings[t]}},{key:"addRingConnection",value:function(e){return e.id=this.ringConnectionIdCounter++,this.ringConnections.push(e),e.id}},{key:"removeRingConnection",value:function(e){this.ringConnections=this.ringConnections.filter(function(t){return t.id!==e})}},{key:"removeRingConnectionsBetween",value:function(e,t){for(var n=[],a=0,i;a<this.ringConnections.length;a++)i=this.ringConnections[a],(i.firstRingId===e&&i.secondRingId===t||i.firstRingId===t&&i.secondRingId===e)&&n.push(i.id);for(var a=0;a<n.length;a++)this.removeRingConnection(n[a])}},{key:"getRingConnection",value:function(e){for(var t=0;t<this.ringConnections.length;t++)if(this.ringConnections[t].id==e)return this.ringConnections[t]}},{key:"getRingConnections",value:function(e,t){for(var n=[],a=0,i;a<this.ringConnections.length;a++){i=this.ringConnections[a];for(var r=0,o;r<t.length;r++)o=t[r],(i.firstRingId===e&&i.secondRingId===o||i.firstRingId===o&&i.secondRingId===e)&&n.push(i.id)}return n}},{key:"getOverlapScore",value:function(){for(var e=0,t=new Float32Array(this.graph.vertices.length),n=0;n<this.graph.vertices.length;n++)t[n]=0;for(var n=0,r;n<this.graph.vertices.length;n++)for(r=this.graph.vertices.length;--r>n;){var o=this.graph.vertices[n],a=this.graph.vertices[r];if(o.value.isDrawn&&a.value.isDrawn){var l=p.default.subtract(o.position,a.position).lengthSq();if(l<this.opts.bondLengthSq){var s=(this.opts.bondLength-Math.sqrt(l))/this.opts.bondLength;e+=s,t[n]+=s,t[r]+=s}}}for(var d=[],n=0;n<this.graph.vertices.length;n++)d.push({id:n,score:t[n]});return d.sort(function(e,t){return t.score-e.score}),{total:e,scores:d,vertexScores:t}}},{key:"chooseSide",value:function(e,t,n){for(var a=e.getNeighbours(t.id),r=t.getNeighbours(e.id),o=a.length,l=r.length,s=h.default.merge(a,r),d=[0,0],g=0,i;g<s.length;g++)i=this.graph.vertices[s[g]].position,i.sameSideAs(e.position,t.position,n[0])?d[0]++:d[1]++;for(var u=[0,0],g=0,c;g<this.graph.vertices.length;g++)c=this.graph.vertices[g].position,c.sameSideAs(e.position,t.position,n[0])?u[0]++:u[1]++;return{totalSideCount:u,totalPosition:u[0]>u[1]?0:1,sideCount:d,position:d[0]>d[1]?0:1,anCount:o,bnCount:l}}},{key:"setRingCenter",value:function(e){for(var t=e.getSize(),n=new p.default(0,0),a=0;a<t;a++)n.add(this.graph.vertices[e.members[a]].position);e.center=n.divide(t)}},{key:"getSubringCenter",value:function(e,t){for(var n=t.value.originalRings,a=e.center,r=Number.MAX_VALUE,o=0;o<n.length;o++)for(var i=0;i<e.rings.length;i++)n[o]===e.rings[i].id&&e.rings[i].getSize()<r&&(a=e.rings[i].center,r=e.rings[i].getSize());return a}},{key:"drawEdges",value:function(e){var t=this,n=Array(this.graph.edges.length);if(n.fill(!1),this.graph.traverseBF(0,function(a){for(var r=t.graph.getEdges(a.id),o=0,i;o<r.length;o++)i=r[o],n[i]||(n[i]=!0,t.drawEdge(i,e))}),!this.bridgedRing)for(var a=0,i;a<this.rings.length;a++)i=this.rings[a],this.isRingAromatic(i)&&this.canvasWrapper.drawAromaticityRing(i)}},{key:"drawEdge",value:function(e,t){var n=this,i=this.graph.edges[e],r=this.graph.vertices[i.sourceId],o=this.graph.vertices[i.targetId],l=r.value.element,d=o.value.element;if(r.value.isDrawn&&o.value.isDrawn||"default"!==this.opts.atomVisualization){var g=r.position,a=o.position,u=this.getEdgeNormals(i),c=h.default.clone(u);if(c[0].multiplyScalar(10).add(g),c[1].multiplyScalar(10).add(g),"="===i.bondType||"="===this.getRingbondType(r,o)||i.isPartOfAromaticRing&&this.bridgedRing){var v=this.areVerticesInSameRing(r,o),y=this.chooseSide(r,o,c);if(v){var s=this.getLargestOrAromaticCommonRing(r,o),m=s.center;u[0].multiplyScalar(n.opts.bondSpacing),u[1].multiplyScalar(n.opts.bondSpacing);var b=null;b=m.sameSideAs(r.position,o.position,p.default.add(g,u[0]))?new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d):new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d),b.shorten(this.opts.bondLength-this.opts.shortBondLength*this.opts.bondLength),i.isPartOfAromaticRing?this.canvasWrapper.drawLine(b,!0):this.canvasWrapper.drawLine(b),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else if(i.center||r.isTerminal()&&o.isTerminal()){u[0].multiplyScalar(n.opts.halfBondSpacing),u[1].multiplyScalar(n.opts.halfBondSpacing);var k=new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d),x=new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d);this.canvasWrapper.drawLine(k),this.canvasWrapper.drawLine(x)}else if(0==y.anCount&&1<y.bnCount||0==y.bnCount&&1<y.anCount){u[0].multiplyScalar(n.opts.halfBondSpacing),u[1].multiplyScalar(n.opts.halfBondSpacing);var C=new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d),S=new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d);this.canvasWrapper.drawLine(C),this.canvasWrapper.drawLine(S)}else if(y.sideCount[0]>y.sideCount[1]){u[0].multiplyScalar(n.opts.bondSpacing),u[1].multiplyScalar(n.opts.bondSpacing);var R=new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d);R.shorten(this.opts.bondLength-this.opts.shortBondLength*this.opts.bondLength),this.canvasWrapper.drawLine(R),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else if(y.sideCount[0]<y.sideCount[1]){u[0].multiplyScalar(n.opts.bondSpacing),u[1].multiplyScalar(n.opts.bondSpacing);var A=new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d);A.shorten(this.opts.bondLength-this.opts.shortBondLength*this.opts.bondLength),this.canvasWrapper.drawLine(A),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else if(y.totalSideCount[0]>y.totalSideCount[1]){u[0].multiplyScalar(n.opts.bondSpacing),u[1].multiplyScalar(n.opts.bondSpacing);var j=new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d);j.shorten(this.opts.bondLength-this.opts.shortBondLength*this.opts.bondLength),this.canvasWrapper.drawLine(j),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else if(y.totalSideCount[0]<=y.totalSideCount[1]){u[0].multiplyScalar(n.opts.bondSpacing),u[1].multiplyScalar(n.opts.bondSpacing);var T=new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d);T.shorten(this.opts.bondLength-this.opts.shortBondLength*this.opts.bondLength),this.canvasWrapper.drawLine(T),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else;}else if("#"===i.bondType){u[0].multiplyScalar(n.opts.bondSpacing/1.5),u[1].multiplyScalar(n.opts.bondSpacing/1.5);var w=new f.default(p.default.add(g,u[0]),p.default.add(a,u[0]),l,d),P=new f.default(p.default.add(g,u[1]),p.default.add(a,u[1]),l,d);this.canvasWrapper.drawLine(w),this.canvasWrapper.drawLine(P),this.canvasWrapper.drawLine(new f.default(g,a,l,d))}else if("."===i.bondType);else{var I=r.value.isStereoCenter,B=o.value.isStereoCenter;"up"===i.wedge?this.canvasWrapper.drawWedge(new f.default(g,a,l,d,I,B)):"down"===i.wedge?this.canvasWrapper.drawDashedWedge(new f.default(g,a,l,d,I,B)):this.canvasWrapper.drawLine(new f.default(g,a,l,d,I,B))}if(t){var L=p.default.midpoint(g,a);this.canvasWrapper.drawDebugText(L.x,L.y,"e: "+e)}}}},{key:"drawVertices",value:function(e){for(var t=this.graph.vertices.length,t=0;t<this.graph.vertices.length;t++){var n=this.graph.vertices[t],i=n.value,r=0,l=0,s=this.getBondCount(n),d=i.element,g=C.default.maxBonds[d]-s,u=n.getTextDirection(this.graph.vertices),c=(this.opts.terminalCarbons||"C"!==d||i.hasAttachedPseudoElements)&&n.isTerminal(),v="C"===i.element;if(i.bracket&&(g=i.bracket.hcount,r=i.bracket.charge,l=i.bracket.isotope),"allballs"===this.opts.atomVisualization)this.canvasWrapper.drawBall(n.position.x,n.position.y,d);else if(i.isDrawn&&(!v||i.drawExplicit||c||i.hasAttachedPseudoElements)||1===this.graph.vertices.length)"default"===this.opts.atomVisualization?this.canvasWrapper.drawText(n.position.x,n.position.y,d,g,u,c,r,l,i.getAttachedPseudoElements()):"balls"===this.opts.atomVisualization&&this.canvasWrapper.drawBall(n.position.x,n.position.y,d);else if(2===n.getNeighbourCount()&&!0==n.forcePositioned){var f=this.graph.vertices[n.neighbours[0]].position,a=this.graph.vertices[n.neighbours[1]].position,y=p.default.threePointangle(n.position,f,a);0.1>Math.abs(o-y)&&this.canvasWrapper.drawPoint(n.position.x,n.position.y,d)}if(e){var m="v: "+n.id+" "+h.default.print(i.ringbonds);this.canvasWrapper.drawDebugText(n.position.x,n.position.y,m)}else;}if(this.opts.debug)for(var t=0,b;t<this.rings.length;t++)b=this.rings[t].center,this.canvasWrapper.drawDebugPoint(b.x,b.y,"r: "+this.rings[t].id)}},{key:"position",value:function(){for(var e=null,t=0;t<this.graph.vertices.length;t++)if(null!==this.graph.vertices[t].value.bridgedRing){e=this.graph.vertices[t];break}for(var t=0;t<this.rings.length;t++)this.rings[t].isBridged&&(e=this.graph.vertices[this.rings[t].members[0]]);0<this.rings.length&&null===e&&(e=this.graph.vertices[this.rings[0].members[0]]),null===e&&(e=this.graph.vertices[0]),this.createNextBond(e,null,0)}},{key:"backupRingInformation",value:function(){this.originalRings=[],this.originalRingConnections=[];for(var e=0;e<this.rings.length;e++)this.originalRings.push(this.rings[e]);for(var e=0;e<this.ringConnections.length;e++)this.originalRingConnections.push(this.ringConnections[e]);for(var e=0;e<this.graph.vertices.length;e++)this.graph.vertices[e].value.backupRings()}},{key:"restoreRingInformation",value:function(){var e=this.getBridgedRings();this.rings=[],this.ringConnections=[];for(var t=0,n;t<e.length;t++){n=e[t];for(var i=0,a;i<n.rings.length;i++)a=n.rings[i],this.originalRings[a.id].center=a.center}for(var t=0;t<this.originalRings.length;t++)this.rings.push(this.originalRings[t]);for(var t=0;t<this.originalRingConnections.length;t++)this.ringConnections.push(this.originalRingConnections[t]);for(var t=0;t<this.graph.vertices.length;t++)this.graph.vertices[t].value.restoreRings()}},{key:"createRing",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;if(!e.positioned){t=t?t:new p.default(0,0);var l=e.getOrderedNeighbours(this.ringConnections),s=n?p.default.subtract(n.position,t).angle():0,d=g.default.polyCircumradius(this.opts.bondLength,e.getSize()),u=g.default.centralAngle(e.getSize());e.centralAngle=u;var h=s,a=this,c=n?n.id:null;if(-1===e.members.indexOf(c)&&(n&&(n.positioned=!1),c=e.members[0]),e.isBridged){this.graph.kkLayout(e.members.slice(),t,n.id,e,this.opts.bondLength),e.positioned=!0,this.setRingCenter(e),t=e.center;for(var f=0;f<e.rings.length;f++)this.setRingCenter(e.rings[f])}else e.eachMember(this.graph.vertices,function(n){var i=a.graph.vertices[n];i.positioned||i.setPosition(t.x+Math.cos(h)*d,t.y+Math.sin(h)*d),h+=u,(!e.isBridged||3>e.rings.length)&&(i.angle=h,i.positioned=!0)},c,o?o.id:null);e.positioned=!0,e.center=t;for(var f=0,i;f<l.length;f++)if(i=this.getRing(l[f].neighbour),!i.positioned){var y=T.default.getVertices(this.ringConnections,e.id,i.id);if(2===y.length){e.isFused=!0,i.isFused=!0;var m=this.graph.vertices[y[0]],b=this.graph.vertices[y[1]],k=p.default.midpoint(m.position,b.position),x=p.default.normals(m.position,b.position);x[0].normalize(),x[1].normalize();var C=g.default.polyCircumradius(this.opts.bondLength,i.getSize()),r=g.default.apothem(C,i.getSize());x[0].multiplyScalar(r).add(k),x[1].multiplyScalar(r).add(k);var S=x[0];p.default.subtract(t,x[1]).lengthSq()>p.default.subtract(t,x[0]).lengthSq()&&(S=x[1]);var R=p.default.subtract(m.position,S),A=p.default.subtract(b.position,S);-1===R.clockwise(A)?!i.positioned&&this.createRing(i,S,m,b):!i.positioned&&this.createRing(i,S,b,m)}else if(1===y.length){e.isSpiro=!0,i.isSpiro=!0;var w=this.graph.vertices[y[0]],P=p.default.subtract(t,w.position);P.invert(),P.normalize();var I=g.default.polyCircumradius(this.opts.bondLength,i.getSize());P.multiplyScalar(I),P.add(w.position),i.positioned||this.createRing(i,P,w)}}for(var f=0;f<e.members.length;f++)for(var B=this.graph.vertices[e.members[f]],L=B.neighbours,E=0,j;E<L.length;E++)(j=this.graph.vertices[L[E]],!j.positioned)&&(j.value.isConnectedToRing=!0,this.createNextBond(j,B,0))}}},{key:"rotateSubtree",value:function(e,t,n,a){var r=this;this.graph.traverseTree(e,t,function(e){e.position.rotateAround(n,a);for(var t=0,i;t<e.value.anchoredRings.length;t++)i=r.rings[e.value.anchoredRings[t]],i&&i.center.rotateAround(n,a)})}},{key:"getSubtreeOverlapScore",value:function(e,t,n){var i=this,a=0,r=new p.default(0,0),o=0;return this.graph.traverseTree(e,t,function(e){if(e.value.isDrawn){var t=n[e.id];t>i.opts.overlapSensitivity&&(a+=t,o++);var l=i.graph.vertices[e.id].position.clone();l.multiplyScalar(t),r.add(l)}}),r.divide(a),{value:a/o,center:r}}},{key:"getCurrentCenterOfMass",value:function(){for(var e=new p.default(0,0),t=0,n=0,i;n<this.graph.vertices.length;n++)i=this.graph.vertices[n],i.positioned&&(e.add(i.position),t++);return e.divide(t)}},{key:"getCurrentCenterOfMassInNeigbourhood",value:function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:2*this.opts.bondLength,n=new p.default(0,0),a=0,r=0,i;r<this.graph.vertices.length;r++)i=this.graph.vertices[r],i.positioned&&e.distanceSq(i.position)<t*t&&(n.add(i.position),a++);return n.divide(a)}},{key:"resolvePrimaryOverlaps",value:function(){for(var e=[],t=Array(this.graph.vertices.length),n=0,i;n<this.rings.length;n++){i=this.rings[n];for(var r=0,l;r<i.members.length;r++)if(l=this.graph.vertices[i.members[r]],!t[l.id]){t[l.id]=!0;var s=this.getNonRingNeighbours(l.id);if(1<s.length){for(var d=[],g=0;g<l.value.rings.length;g++)d.push(l.value.rings[g]);e.push({common:l,rings:d,vertices:s})}else if(1===s.length&&2===l.value.rings.length){for(var u=[],g=0;g<l.value.rings.length;g++)u.push(l.value.rings[g]);e.push({common:l,rings:u,vertices:s})}}}for(var n=0,h;n<e.length;n++)if(h=e[n],2===h.vertices.length){var c=h.vertices[0],a=h.vertices[1];if(!c.value.isDrawn||!a.value.isDrawn)continue;var p=(2*o-this.getRing(h.rings[0]).getAngle())/6;this.rotateSubtree(c.id,h.common.id,p,h.common.position),this.rotateSubtree(a.id,h.common.id,-p,h.common.position);var v=this.getOverlapScore(),f=this.getSubtreeOverlapScore(c.id,h.common.id,v.vertexScores),y=this.getSubtreeOverlapScore(a.id,h.common.id,v.vertexScores),m=f.value+y.value;this.rotateSubtree(c.id,h.common.id,-2*p,h.common.position),this.rotateSubtree(a.id,h.common.id,2*p,h.common.position),v=this.getOverlapScore(),f=this.getSubtreeOverlapScore(c.id,h.common.id,v.vertexScores),y=this.getSubtreeOverlapScore(a.id,h.common.id,v.vertexScores),f.value+y.value>m&&(this.rotateSubtree(c.id,h.common.id,2*p,h.common.position),this.rotateSubtree(a.id,h.common.id,-2*p,h.common.position))}else 1!==h.vertices.length||2!==h.rings.length}},{key:"resolveSecondaryOverlaps",value:function(e){for(var t=0;t<e.length;t++)if(e[t].score>this.opts.overlapSensitivity){var n=this.graph.vertices[e[t].id];if(n.isTerminal()){var i=this.getClosestVertex(n);if(i){var a=null;a=i.isTerminal()?0===i.id?this.graph.vertices[1].position:i.previousPosition:0===i.id?this.graph.vertices[1].position:i.position;var r=0===n.id?this.graph.vertices[1].position:n.previousPosition;n.position.rotateAwayFrom(a,r,g.default.toRad(20))}}}}},{key:"getLastVertexWithAngle",value:function(e){for(var t=0,n=null;!t&&e;)n=this.graph.vertices[e],t=n.angle,e=n.parentVertexId;return n}},{key:"createNextBond",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=3<arguments.length&&void 0!==arguments[3]&&arguments[3],d=4<arguments.length&&void 0!==arguments[4]&&arguments[4];if(!e.positioned||d){var u=!1;if(t){var c=this.graph.getEdge(e.id,t.id);("/"===c.bondType||"\\"===c.bondType)&&1==++this.doubleBondConfigCount%2&&null===this.doubleBondConfig&&(this.doubleBondConfig=c.bondType,u=!0,null===t.parentVertexId&&e.value.branchBond&&("/"===this.doubleBondConfig?this.doubleBondConfig="\\":"\\"===this.doubleBondConfig&&(this.doubleBondConfig="/")))}if(!d)if(!t){var f=new p.default(this.opts.bondLength,0);f.rotate(g.default.toRad(-60)),e.previousPosition=f,e.setPosition(this.opts.bondLength,0),e.angle=g.default.toRad(-60),null===e.value.bridgedRing&&(e.positioned=!0)}else if(0<t.value.rings.length){var m=t.neighbours,b=null,k=new p.default(0,0);if(null===t.value.bridgedRing&&1<t.value.rings.length)for(var C=0,i;C<m.length;C++)if(i=this.graph.vertices[m[C]],h.default.containsAll(i.value.rings,t.value.rings)){b=i;break}if(null===b){for(var C=0,S;C<m.length;C++)S=this.graph.vertices[m[C]],S.positioned&&this.areVerticesInSameRing(S,t)&&k.add(p.default.subtract(S.position,t.position));k.invert().normalize().multiplyScalar(this.opts.bondLength).add(t.position)}else k=b.position.clone().rotateAround(Math.PI,t.position);e.previousPosition=t.position,e.setPositionFromVector(k),e.positioned=!0}else{var v=new p.default(this.opts.bondLength,0);v.rotate(n),v.add(t.position),e.setPositionFromVector(v),e.previousPosition=t.position,e.positioned=!0}if(null!==e.value.bridgedRing){var R=this.getRing(e.value.bridgedRing);if(!R.positioned){var A=p.default.subtract(e.previousPosition,e.position);A.invert(),A.normalize();var j=g.default.polyCircumradius(this.opts.bondLength,R.members.length);A.multiplyScalar(j),A.add(e.position),this.createRing(R,A,e)}}else if(0<e.value.rings.length){var r=this.getRing(e.value.rings[0]);if(!r.positioned){var T=p.default.subtract(e.previousPosition,e.position);T.invert(),T.normalize();var P=g.default.polyCircumradius(this.opts.bondLength,r.getSize());T.multiplyScalar(P),T.add(e.position),this.createRing(r,T,e)}}else{for(var I=e.value.isStereoCenter,B=e.getNeighbours(),L=[],C=0;C<B.length;C++)this.graph.vertices[B[C]].value.isDrawn&&L.push(B[C]);t&&(L=h.default.remove(L,t.id));var E=e.getAngle();if(1===L.length){var D=this.graph.vertices[L[0]];if("#"===e.value.bondType||t&&"#"===t.value.bondType||"="===e.value.bondType&&t&&0===t.value.rings.length&&"="===t.value.bondType&&"-"!==e.value.branchBond){if(e.value.drawExplicit=!1,t){var N=this.graph.getEdge(e.id,t.id);N.center=!0}var _=this.graph.getEdge(e.id,D.id);_.center=!0,("#"===e.value.bondType||t&&"#"===t.value.bondType)&&(D.angle=0),D.drawExplicit=!0,this.createNextBond(D,e,E+D.angle)}else if(t&&0<t.value.rings.length){var O=g.default.toRad(60),V=-O,H=new p.default(this.opts.bondLength,0),F=new p.default(this.opts.bondLength,0);H.rotate(O).add(e.position),F.rotate(V).add(e.position);var W=this.getCurrentCenterOfMass(),M=H.distanceSq(W),q=F.distanceSq(W);D.angle=M<q?V:O,this.createNextBond(D,e,E+D.angle)}else{var U=e.angle;if(t&&3<t.neighbours.length)U=0<U?l(1.0472,U):0>U?Math.max(-1.0472,U):1.0472;else if(!U){var G=this.getLastVertexWithAngle(e.id);U=G.angle,U||(U=1.0472)}if(t&&!u){var X=this.graph.getEdge(e.id,D.id).bondType;"/"===X?("/"===this.doubleBondConfig||"\\"===this.doubleBondConfig&&(U=-U),this.doubleBondConfig=null):"\\"===X&&("/"===this.doubleBondConfig?U=-U:"\\"===this.doubleBondConfig,this.doubleBondConfig=null)}D.angle=o?U:-U,this.createNextBond(D,e,E+D.angle)}}else if(2===L.length){var Y=e.angle;Y||(Y=1.0472);var K=this.graph.getTreeDepth(L[0],e.id),Z=this.graph.getTreeDepth(L[1],e.id),$=this.graph.vertices[L[0]],Q=this.graph.vertices[L[1]];$.value.subtreeDepth=K,Q.value.subtreeDepth=Z;var J=this.graph.getTreeDepth(t?t.id:null,e.id);t&&(t.value.subtreeDepth=J);var ee=0,te=1;"C"===Q.value.element&&"C"!==$.value.element&&1<Z&&5>K?(ee=1,te=0):"C"!==Q.value.element&&"C"===$.value.element&&1<K&&5>Z?(ee=0,te=1):Z>K&&(ee=1,te=0);var ne=this.graph.vertices[L[ee]],ie=this.graph.vertices[L[te]],ae=this.graph.getEdge(e.id,ne.id),re=this.graph.getEdge(e.id,ie.id),oe=!1;J<K&&J<Z&&(oe=!0),ie.angle=Y,ne.angle=-Y,"\\"===this.doubleBondConfig?"\\"===ie.value.branchBond&&(ie.angle=-Y,ne.angle=Y):"/"===this.doubleBondConfig&&"/"===ie.value.branchBond&&(ie.angle=-Y,ne.angle=Y),this.createNextBond(ie,e,E+ie.angle,oe),this.createNextBond(ne,e,E+ne.angle,oe)}else if(3===L.length){var le=this.graph.getTreeDepth(L[0],e.id),se=this.graph.getTreeDepth(L[1],e.id),de=this.graph.getTreeDepth(L[2],e.id),ge=this.graph.vertices[L[0]],s=this.graph.vertices[L[1]],ue=this.graph.vertices[L[2]];ge.value.subtreeDepth=le,s.value.subtreeDepth=se,ue.value.subtreeDepth=de,se>le&&se>de?(ge=this.graph.vertices[L[1]],s=this.graph.vertices[L[0]],ue=this.graph.vertices[L[2]]):de>le&&de>se&&(ge=this.graph.vertices[L[2]],s=this.graph.vertices[L[0]],ue=this.graph.vertices[L[1]]),t&&1>t.value.rings.length&&1>ge.value.rings.length&&1>s.value.rings.length&&1>ue.value.rings.length&&1===this.graph.getTreeDepth(s.id,e.id)&&1===this.graph.getTreeDepth(ue.id,e.id)&&1<this.graph.getTreeDepth(ge.id,e.id)?(ge.angle=-e.angle,0<=e.angle?(s.angle=g.default.toRad(30),ue.angle=g.default.toRad(90)):(s.angle=-g.default.toRad(30),ue.angle=-g.default.toRad(90)),this.createNextBond(ge,e,E+ge.angle),this.createNextBond(s,e,E+s.angle),this.createNextBond(ue,e,E+ue.angle)):(ge.angle=0,s.angle=g.default.toRad(90),ue.angle=-g.default.toRad(90),this.createNextBond(ge,e,E+ge.angle),this.createNextBond(s,e,E+s.angle),this.createNextBond(ue,e,E+ue.angle))}else if(4===L.length){var he=this.graph.getTreeDepth(L[0],e.id),ce=this.graph.getTreeDepth(L[1],e.id),pe=this.graph.getTreeDepth(L[2],e.id),ve=this.graph.getTreeDepth(L[3],e.id),fe=this.graph.vertices[L[0]],w=this.graph.vertices[L[1]],x=this.graph.vertices[L[2]],y=this.graph.vertices[L[3]];fe.value.subtreeDepth=he,w.value.subtreeDepth=ce,x.value.subtreeDepth=pe,y.value.subtreeDepth=ve,ce>he&&ce>pe&&ce>ve?(fe=this.graph.vertices[L[1]],w=this.graph.vertices[L[0]],x=this.graph.vertices[L[2]],y=this.graph.vertices[L[3]]):pe>he&&pe>ce&&pe>ve?(fe=this.graph.vertices[L[2]],w=this.graph.vertices[L[0]],x=this.graph.vertices[L[1]],y=this.graph.vertices[L[3]]):ve>he&&ve>ce&&ve>pe&&(fe=this.graph.vertices[L[3]],w=this.graph.vertices[L[0]],x=this.graph.vertices[L[1]],y=this.graph.vertices[L[2]]),fe.angle=-g.default.toRad(36),w.angle=g.default.toRad(36),x.angle=-g.default.toRad(108),y.angle=g.default.toRad(108),this.createNextBond(fe,e,E+fe.angle),this.createNextBond(w,e,E+w.angle),this.createNextBond(x,e,E+x.angle),this.createNextBond(y,e,E+y.angle)}}}}},{key:"getCommonRingbondNeighbour",value:function(e){for(var t=e.neighbours,n=0,i;n<t.length;n++)if(i=this.graph.vertices[t[n]],h.default.containsAll(i.value.rings,e.value.rings))return i;return null}},{key:"isPointInRing",value:function(e){for(var t=0,n;t<this.rings.length;t++)if(n=this.rings[t],!!n.positioned){var i=g.default.polyCircumradius(this.opts.bondLength,n.getSize());if(e.distanceSq(n.center)<i*i)return!0}return!1}},{key:"isEdgeInRing",value:function(e){var t=this.graph.vertices[e.sourceId],n=this.graph.vertices[e.targetId];return this.areVerticesInSameRing(t,n)}},{key:"isEdgeRotatable",value:function(e){var t=this.graph.vertices[e.sourceId],n=this.graph.vertices[e.targetId];return"-"===e.bondType&&(t.isTerminal()||n.isTerminal()?!1:0<t.value.rings.length&&0<n.value.rings.length&&this.areVerticesInSameRing(t,n)?!1:!0)}},{key:"isRingAromatic",value:function(e){for(var t=0,n;t<e.members.length;t++)if(n=this.graph.vertices[e.members[t]],!n.value.isPartOfAromaticRing)return!1;return!0}},{key:"getEdgeNormals",value:function(e){var t=this.graph.vertices[e.sourceId].position,n=this.graph.vertices[e.targetId].position,i=p.default.units(t,n);return i}},{key:"getBondCount",value:function(e){for(var t=0,n=0;n<e.edges.length;n++)t+=this.graph.edges[e.edges[n]].weight;return t}},{key:"getNonRingNeighbours",value:function(e){for(var t=[],n=this.graph.vertices[e],a=n.neighbours,r=0;r<a.length;r++){var i=this.graph.vertices[a[r]],o=h.default.intersection(n.value.rings,i.value.rings).length;0===o&&!1==i.value.isBridge&&t.push(i)}return t}},{key:"annotateStereochemistry",value:function(){for(var e=0,t;e<this.graph.vertices.length;e++)if(t=this.graph.vertices[e],!!t.value.isStereoCenter){for(var n=t.getNeighbours(),i=n.length,a=Array(i),r=0;r<i;r++){var o=new Uint8Array(this.graph.vertices.length),s=[[]];o[t.id]=1,this.visitStereochemistry(n[r],t.id,o,s,10,0);for(var d=0;d<s.length;d++)s[d].sort(function(e,t){return t-e});a[r]=[r,s]}for(var u=0,h=0,r=0;r<a.length;r++){a[r][1].length>u&&(u=a[r][1].length);for(var d=0;d<a[r][1].length;d++)a[r][1][d].length>h&&(h=a[r][1][d].length)}for(var r=0,c;r<a.length;r++){c=u-a[r][1].length;for(var d=0;d<c;d++)a[r][1].push([]);a[r][1].push([n[r]]);for(var d=0,p;d<a[r][1].length;d++){p=h-a[r][1][d].length;for(var v=0;v<p;v++)a[r][1][d].push(0)}}a.sort(function(e,t){for(var n=0;n<e[1].length;n++)for(var i=0;i<e[1][n].length;i++){if(e[1][n][i]>t[1][n][i])return-1;if(e[1][n][i]<t[1][n][i])return 1}return 0});for(var l=new Uint8Array(i),r=0;r<i;r++)l[r]=a[r][0],t.value.priority=r;var f=this.graph.vertices[n[l[0]]].position,y=this.graph.vertices[n[l[1]]].position,m=this.graph.vertices[n[l[2]]].position,b=f.relativeClockwise(y,t.position),k=f.relativeClockwise(m,t.position),x=-1===b,C="@"===t.value.bracket.chirality?-1:1,S=1==g.default.parityOfPermutation(l)*C?"R":"S",R="down",A="up";(x&&"R"!=S||!x&&"S"!=S)&&(t.value.hydrogenDirection="up",R="up",A="down"),t.value.hasHydrogen&&(this.graph.getEdge(t.id,n[l[l.length-1]]).wedge=R);for(var j=Array(n.length-1),T=1<t.value.rings.length&&t.value.hasHydrogen,w=t.value.hasHydrogen?1:0,r=0;r<l.length-w;r++){j[r]=new Uint32Array(2);var P=this.graph.vertices[n[l[r]]];j[r][0]+=P.value.isStereoCenter?0:1e5,j[r][0]+=this.areVerticesInSameRing(P,t)?0:1e4,j[r][0]+=P.value.isHeteroAtom()?1e3:0,j[r][0]-=0===P.value.subtreeDepth?1e3:0,j[r][0]+=1e3-P.value.subtreeDepth,j[r][1]=n[l[r]]}if(j.sort(function(e,t){return e[0]>t[0]?-1:e[0]<t[0]?1:0}),!T){var I=j[0][1];if(t.value.hasHydrogen)this.graph.getEdge(t.id,I).wedge=A;else{for(var B=A,r=l.length-1;0<=r&&(B=B==R?A:R,n[l[r]]!==I);r--);this.graph.getEdge(t.id,I).wedge=B}}t.value.chirality=S}}},{key:"visitStereochemistry",value:function(e,t,n,a,r,o){var l=6<arguments.length&&void 0!==arguments[6]?arguments[6]:0;n[e]=1;var s=this.graph.vertices[e],d=s.value.getAtomicNumber();a.length<=o&&a.push([]);for(var g=0;g<this.graph.getEdge(e,t).weight;g++)a[o].push(1e3*l+d);for(var i=this.graph.vertices[e].neighbours,g=0;g<i.length;g++)1!==n[i[g]]&&o<r-1&&this.visitStereochemistry(i[g],e,n.slice(),a,r,o+1,d);if(o<r-1){for(var u=0,g=0;g<i.length;g++)u+=this.graph.getEdge(e,i[g]).weight;for(var g=0;g<s.value.getMaxBonds()-u;g++)a.length<=o+1&&a.push([]),a[o+1].push(1e3*d+1)}}},{key:"initPseudoElements",value:function(){for(var e=0;e<this.graph.vertices.length;e++){for(var t=this.graph.vertices[e],n=t.neighbours,i=Array(n.length),a=0;a<n.length;a++)i[a]=this.graph.vertices[n[a]];if(!(3>t.getNeighbourCount()||0<t.value.rings.length)&&"P"!==t.value.element&&("C"!==t.value.element||3!==i.length||"N"!==i[0].value.element||"N"!==i[1].value.element||"N"!==i[2].value.element)){for(var r=0,o=0,a=0;a<i.length;a++){var l=i[a],s=l.value.element,d=l.getNeighbourCount();"C"!==s&&"H"!==s&&1===d&&r++,1<d&&o++}if(!(1<o||2>r)){for(var g=null,a=0,u;a<i.length;a++)u=i[a],1<u.getNeighbourCount()&&(g=u);for(var a=0,h;a<i.length;a++)if(h=i[a],!(1<h.getNeighbourCount())){h.value.isDrawn=!1;var c=C.default.maxBonds[h.value.element]-this.getBondCount(h),p="";h.value.bracket&&(c=h.value.bracket.hcount,p=h.value.bracket.charge||0),t.value.attachPseudoElement(h.value.element,g?g.value.element:null,c,p)}}}}for(var e=0;e<this.graph.vertices.length;e++){var v=this.graph.vertices[e],f=v.value,y=f.element;if("C"!==y&&"H"!==y&&f.isDrawn){for(var m=v.neighbours,b=Array(m.length),a=0;a<m.length;a++)b[a]=this.graph.vertices[m[a]];for(var a=0,k;a<b.length;a++)if(k=b[a].value,k.hasAttachedPseudoElements&&2===k.getAttachedPseudoElementsCount()){var x=k.getAttachedPseudoElements();x.hasOwnProperty("0O")&&x.hasOwnProperty("3C")&&(k.isDrawn=!1,v.value.attachPseudoElement("Ac","",0))}}}}}]),e}();n.default=E},{"./ArrayHelper":2,"./Atom":3,"./CanvasWrapper":4,"./Edge":6,"./Graph":7,"./Line":8,"./MathHelper":9,"./Ring":11,"./RingConnection":12,"./SSSR":13,"./Vector2":14,"./Vertex":15}],6:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(t,n){var a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;i(this,e),this.id=null,this.sourceId=t,this.targetId=n,this.weight=a,this.bondType="-",this.isPartOfAromaticRing=!1,this.center=!1,this.wedge=""}return a(e,[{key:"setBondType",value:function(t){this.bondType=t,this.weight=e.bonds[t]}}],[{key:"bonds",get:function(){return{"-":1,"/":1,"\\":1,"=":2,"#":3,$:4}}}]),e}();n.default=r},{}],7:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=Math.pow,o=Math.sqrt,l=Math.min;Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){var n=[],i=!0,a=!1,r;try{for(var o=e[Symbol.iterator](),l;!(i=(l=o.next()).done)&&(n.push(l.value),!(t&&n.length===t));i=!0);}catch(e){a=!0,r=e}finally{try{!i&&o["return"]&&o["return"]()}finally{if(a)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),d=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),g=e("./MathHelper"),u=i(g),h=e("./Vector2"),c=i(h),p=e("./Vertex"),v=i(p),f=e("./Edge"),y=i(f),m=e("./Ring"),b=i(m),k=e("./Atom"),x=i(k),C=function(){function e(t){var n=1<arguments.length&&void 0!==arguments[1]&&arguments[1];a(this,e),this.vertices=[],this.edges=[],this.vertexIdsToEdgeId={},this.elementCount={},this.isomeric=n,this._time=0,this._init(t),this._initInfos()}return d(e,[{key:"_init",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,a=3<arguments.length&&void 0!==arguments[3]&&arguments[3],r=new x.default(e.atom.element?e.atom.element:e.atom,e.bond);r.branchBond=e.branchBond,r.ringbonds=e.ringbonds,r.bracket=e.atom.element?e.atom:null;var o=new v.default(r),l=this.vertices[n];if(this.addVertex(o),null!==n){o.setParentVertexId(n),o.value.addNeighbouringElement(l.value.element),l.addChild(o.id),l.value.addNeighbouringElement(r.element),l.spanningTreeChildren.push(o.id);var s=new y.default(n,o.id,1),d=null;a?(s.setBondType(o.value.branchBond||"-"),d=o.id):(s.setBondType(l.value.bondType||"-"),d=l.id);var g=this.addEdge(s);o.edges.push(g),l.edges.push(g)}var u=e.ringbondCount+1;r.bracket&&(u+=r.bracket.hcount);var h=0;if(r.bracket&&r.bracket.chirality){r.isStereoCenter=!0,h=r.bracket.hcount;for(var c=0;c<h;c++)this._init({atom:"H",isBracket:"false",branches:[],branchCount:0,ringbonds:[],ringbondCount:!1,next:null,hasNext:!1,bond:"-"},c,o.id,!0)}for(var c=0;c<e.branchCount;c++)this._init(e.branches[c],c+u,o.id,!0);e.hasNext&&this._init(e.next,e.branchCount+u,o.id)}},{key:"_initInfos",value:function(){for(var e=0,t;e<this.vertices.length;e++)t=this.vertices[e].value,"undefined"==typeof this.elementCount[t.element]?this.elementCount[t.element]=0:this.elementCount[t.element]+=1}},{key:"clear",value:function(){this.vertices=[],this.edges=[],this.vertexIdsToEdgeId={}}},{key:"addVertex",value:function(e){return e.id=this.vertices.length,this.vertices.push(e),e.id}},{key:"addEdge",value:function(e){return e.id=this.edges.length,this.edges.push(e),this.vertexIdsToEdgeId[e.sourceId+"_"+e.targetId]=e.id,this.vertexIdsToEdgeId[e.targetId+"_"+e.sourceId]=e.id,e.isPartOfAromaticRing=this.vertices[e.sourceId].value.isPartOfAromaticRing&&this.vertices[e.targetId].value.isPartOfAromaticRing,e.id}},{key:"getEdge",value:function(e,t){var n=this.vertexIdsToEdgeId[e+"_"+t];return void 0===n?null:this.edges[n]}},{key:"getEdges",value:function(e){for(var t=[],n=this.vertices[e],a=0;a<n.neighbours.length;a++)t.push(this.vertexIdsToEdgeId[e+"_"+n.neighbours[a]]);return t}},{key:"hasEdge",value:function(e,t){return void 0!==this.vertexIdsToEdgeId[e+"_"+t]}},{key:"getVertexList",value:function(){for(var e=[this.vertices.length],t=0;t<this.vertices.length;t++)e[t]=this.vertices[t].id;return e}},{key:"getEdgeList",value:function(){for(var e=Array(this.edges.length),t=0;t<this.edges.length;t++)e[t]=[this.edges[t].sourceId,this.edges[t].targetId];return e}},{key:"getAdjacencyMatrix",value:function(){for(var e=this.vertices.length,t=Array(e),n=0;n<e;n++)t[n]=Array(e),t[n].fill(0);for(var n=0,i;n<this.edges.length;n++)i=this.edges[n],t[i.sourceId][i.targetId]=1,t[i.targetId][i.sourceId]=1;return t}},{key:"getComponentsAdjacencyMatrix",value:function(){for(var e=this.vertices.length,t=Array(e),n=this.getBridges(),a=0;a<e;a++)t[a]=Array(e),t[a].fill(0);for(var a=0,i;a<this.edges.length;a++)i=this.edges[a],t[i.sourceId][i.targetId]=1,t[i.targetId][i.sourceId]=1;for(var a=0;a<n.length;a++)t[n[a][0]][n[a][1]]=0,t[n[a][1]][n[a][0]]=0;return t}},{key:"getSubgraphAdjacencyMatrix",value:function(e){for(var t=e.length,n=Array(t),a=0;a<t;a++){n[a]=Array(t),n[a].fill(0);for(var i=0;i<t;i++)a!==i&&this.hasEdge(e[a],e[i])&&(n[a][i]=1)}return n}},{key:"getDistanceMatrix",value:function(){for(var e=this.vertices.length,t=this.getAdjacencyMatrix(),n=Array(e),a=0;a<e;a++)n[a]=Array(e),n[a].fill(Infinity);for(var a=0;a<e;a++)for(var i=0;i<e;i++)1===t[a][i]&&(n[a][i]=1);for(var r=0;r<e;r++)for(var a=0;a<e;a++)for(var i=0;i<e;i++)n[a][i]>n[a][r]+n[r][i]&&(n[a][i]=n[a][r]+n[r][i]);return n}},{key:"getSubgraphDistanceMatrix",value:function(e){for(var t=e.length,n=this.getSubgraphAdjacencyMatrix(e),a=Array(t),r=0;r<t;r++)a[r]=Array(t),a[r].fill(Infinity);for(var r=0;r<t;r++)for(var i=0;i<t;i++)1===n[r][i]&&(a[r][i]=1);for(var o=0;o<t;o++)for(var r=0;r<t;r++)for(var i=0;i<t;i++)a[r][i]>a[r][o]+a[o][i]&&(a[r][i]=a[r][o]+a[o][i]);return a}},{key:"getAdjacencyList",value:function(){for(var e=this.vertices.length,t=Array(e),n=0;n<e;n++){t[n]=[];for(var i=0;i<e;i++)n!==i&&this.hasEdge(this.vertices[n].id,this.vertices[i].id)&&t[n].push(i)}return t}},{key:"getSubgraphAdjacencyList",value:function(e){for(var t=e.length,n=Array(t),a=0;a<t;a++){n[a]=[];for(var i=0;i<t;i++)a!==i&&this.hasEdge(e[a],e[i])&&n[a].push(i)}return n}},{key:"getBridges",value:function(){var e=this.vertices.length,t=Array(e),n=Array(e),a=Array(e),r=Array(e),o=this.getAdjacencyList(),l=[];t.fill(!1),r.fill(null),this._time=0;for(var s=0;s<e;s++)t[s]||this._bridgeDfs(s,t,n,a,r,o,l);return l}},{key:"traverseBF",value:function(e,t){var n=this.vertices.length,a=Array(n);a.fill(!1);for(var r=[e];0<r.length;){var o=r.shift(),l=this.vertices[o];t(l);for(var s=0,i;s<l.neighbours.length;s++)i=l.neighbours[s],a[i]||(a[i]=!0,r.push(i))}}},{key:"getTreeDepth",value:function(e,t){if(null===e||null===t)return 0;for(var n=this.vertices[e].getSpanningTreeNeighbours(t),a=0,r=0;r<n.length;r++){var i=n[r],o=this.getTreeDepth(i,e);o>a&&(a=o)}return a+1}},{key:"traverseTree",value:function(e,t,n){var a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:Number.MAX_SAFE_INTEGER,r=4<arguments.length&&void 0!==arguments[4]&&arguments[4],o=5<arguments.length&&void 0!==arguments[5]?arguments[5]:1,l=6<arguments.length&&void 0!==arguments[6]?arguments[6]:null;if(null===l&&(l=new Uint8Array(this.vertices.length)),!(o>a+1||1===l[e])){l[e]=1;var s=this.vertices[e],d=s.getNeighbours(t);(!r||1<o)&&n(s);for(var g=0;g<d.length;g++)this.traverseTree(d[g],e,n,a,r,o+1,l)}}},{key:"kkLayout",value:function(e,t,n,l,d){for(var g=d,h=e.length;h--;)var i=this.vertices[e[h]],c=i.neighbours.length;var p=this.getSubgraphDistanceMatrix(e),v=e.length,f=u.default.polyCircumradius(500,v),y=u.default.centralAngle(v),m=0,a=new Float32Array(v),b=new Float32Array(v),k=Array(v);for(h=v;h--;){var x=this.vertices[e[h]];x.positioned?(a[h]=x.position.x,b[h]=x.position.y):(a[h]=t.x+Math.cos(m)*f,b[h]=t.y+Math.sin(m)*f),k[h]=x.positioned,m+=y}var C=Array(v);for(h=v;h--;){C[h]=Array(v);for(var c=v;c--;)C[h][c]=d*p[h][c]}var S=Array(v);for(h=v;h--;){S[h]=Array(v);for(var c=v;c--;)S[h][c]=g*r(p[h][c],-2)}var R=Array(v),A=new Float32Array(v),j=new Float32Array(v);for(h=v;h--;)R[h]=Array(v);h=v;for(var T,w,P,I,B,L,E;h--;){T=a[h],w=b[h],P=0,I=0;for(var D=v;D--;)h!==D&&(B=a[D],L=b[D],E=1/o((T-B)*(T-B)+(w-L)*(w-L)),R[h][D]=[S[h][D]*(T-B-C[h][D]*(T-B)*E),S[h][D]*(w-L-C[h][D]*(w-L)*E)],R[D][h]=R[h][D],P+=R[h][D][0],I+=R[h][D][1]);A[h]=P,j[h]=I}for(var N=function(e){return[A[e]*A[e]+j[e]*j[e],A[e],j[e]]},_=function(){var e=0,t=0,n=0,i=0;for(h=v;h--;){var a=N(h),r=s(a,3),o=r[0],l=r[1],d=r[2];o>e&&!1===k[h]&&(e=o,t=h,n=l,i=d)}return[t,e,n,i]},O=function(e,t,n){var i=0,s=0,d=0,g=a[e],u=b[e],c=C[e],p=S[e];for(h=v;h--;)if(h!==e){var f=a[h],y=b[h],x=c[h],l=p[h],k=(g-f)*(g-f),m=1/r(k+(u-y)*(u-y),1.5);i+=l*(1-x*(u-y)*(u-y)*m),s+=l*(1-x*k*m),d+=l*(x*(g-f)*(u-y)*m)}0==i&&(i=0.1),0==s&&(s=0.1),0==d&&(d=0.1);var T=t/i+n/d;T/=d/i-s/d;var w=-(d*T+t)/i;a[e]+=w,b[e]+=T;var P=R[e];t=0,n=0,g=a[e],u=b[e];var I,B,L,E,D;for(h=v;h--;)e!==h&&(I=a[h],B=b[h],L=P[h][0],E=P[h][1],D=1/o((g-I)*(g-I)+(u-B)*(u-B)),w=p[h]*(g-I-c[h]*(g-I)*D),T=p[h]*(u-B-c[h]*(u-B)*D),P[h]=[w,T],t+=w,n+=T,A[h]+=w-L,j[h]+=T-E);A[e]=t,j[e]=n},V=1e9,z=0,H=0,F=0,W=0,M=0,q=0;V>0.1&&2e3>M;){M++;var U=_(),G=s(U,4);for(z=G[0],V=G[1],H=G[2],F=G[3],W=V,q=0;W>0.1&&50>q;){q++,O(z,H,F);var X=N(z),Y=s(X,3);W=Y[0],H=Y[1],F=Y[2]}}for(h=v;h--;){var K=e[h],Z=this.vertices[K];Z.position.x=a[h],Z.position.y=b[h],Z.positioned=!0,Z.forcePositioned=!0}}},{key:"_bridgeDfs",value:function(e,t,n,a,r,o,s){t[e]=!0,n[e]=a[e]=++this._time;for(var d=0,i;d<o[e].length;d++)i=o[e][d],t[i]?i!==r[e]&&(a[e]=l(a[e],n[i])):(r[i]=e,this._bridgeDfs(i,t,n,a,r,o,s),a[e]=l(a[e],a[i]),a[i]>n[e]&&s.push([e,i]))}}],[{key:"getConnectedComponents",value:function(t){var n=t.length,i=Array(n),a=[],r=0;i.fill(!1);for(var o=0;o<n;o++)if(!i[o]){var l=[];i[o]=!0,l.push(o),r++,e._ccGetDfs(o,i,t,l),1<l.length&&a.push(l)}return a}},{key:"getConnectedComponentCount",value:function(t){var n=t.length,i=Array(n),a=0;i.fill(!1);for(var r=0;r<n;r++)i[r]||(i[r]=!0,a++,e._ccCountDfs(r,i,t));return a}},{key:"_ccCountDfs",value:function(t,n,i){for(var a=0,r;a<i[t].length;a++)(r=i[t][a],r&&!n[a]&&t!==a)&&(n[a]=!0,e._ccCountDfs(a,n,i))}},{key:"_ccGetDfs",value:function(t,n,i,a){for(var r=0,o;r<i[t].length;r++)(o=i[t][r],o&&!n[r]&&t!==r)&&(n[r]=!0,a.push(r),e._ccGetDfs(r,n,i,a))}}]),e}();n.default=C},{"./Atom":3,"./Edge":6,"./MathHelper":9,"./Ring":11,"./Vector2":14,"./Vertex":15}],8:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=Math.pow;Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./Vector2"),l=function(e){return e&&e.__esModule?e:{default:e}}(o),s=function(){function e(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new l.default(0,0),n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new l.default(0,0),a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,o=4<arguments.length&&void 0!==arguments[4]&&arguments[4],s=5<arguments.length&&void 0!==arguments[5]&&arguments[5];i(this,e),this.from=t,this.to=n,this.elementFrom=a,this.elementTo=r,this.chiralFrom=o,this.chiralTo=s}return r(e,[{key:"clone",value:function(){return new e(this.from.clone(),this.to.clone(),this.elementFrom,this.elementTo)}},{key:"getLength",value:function(){return Math.sqrt(a(this.to.x-this.from.x,2)+a(this.to.y-this.from.y,2))}},{key:"getAngle",value:function(){var e=l.default.subtract(this.getRightVector(),this.getLeftVector());return e.angle()}},{key:"getRightVector",value:function(){return this.from.x<this.to.x?this.to:this.from}},{key:"getLeftVector",value:function(){return this.from.x<this.to.x?this.from:this.to}},{key:"getRightElement",value:function(){return this.from.x<this.to.x?this.elementTo:this.elementFrom}},{key:"getLeftElement",value:function(){return this.from.x<this.to.x?this.elementFrom:this.elementTo}},{key:"getRightChiral",value:function(){return this.from.x<this.to.x?this.chiralTo:this.chiralFrom}},{key:"getLeftChiral",value:function(){return this.from.x<this.to.x?this.chiralFrom:this.chiralTo}},{key:"setRightVector",value:function(e,t){return this.from.x<this.to.x?(this.to.x=e,this.to.y=t):(this.from.x=e,this.from.y=t),this}},{key:"setLeftVector",value:function(e,t){return this.from.x<this.to.x?(this.from.x=e,this.from.y=t):(this.to.x=e,this.to.y=t),this}},{key:"rotateToXAxis",value:function(){var e=this.getLeftVector();return this.setRightVector(e.x+this.getLength(),e.y),this}},{key:"rotate",value:function(e){var t=this.getLeftVector(),n=this.getRightVector(),i=Math.sin(e),a=Math.cos(e),r=a*(n.x-t.x)-i*(n.y-t.y)+t.x,o=i*(n.x-t.x)-a*(n.y-t.y)+t.y;return this.setRightVector(r,o),this}},{key:"shortenFrom",value:function(e){var t=l.default.subtract(this.to,this.from);return t.normalize(),t.multiplyScalar(e),this.from.add(t),this}},{key:"shortenTo",value:function(e){var t=l.default.subtract(this.from,this.to);return t.normalize(),t.multiplyScalar(e),this.to.add(t),this}},{key:"shortenRight",value:function(e){return this.from.x<this.to.x?this.shortenTo(e):this.shortenFrom(e),this}},{key:"shortenLeft",value:function(e){return this.from.x<this.to.x?this.shortenFrom(e):this.shortenTo(e),this}},{key:"shorten",value:function(e){var t=l.default.subtract(this.from,this.to);return t.normalize(),t.multiplyScalar(e/2),this.to.add(t),this.from.subtract(t),this}}]),e}();n.default=s},{"./Vector2":14}],9:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=Math.sin,o=Math.cos,l=Math.PI;Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(){i(this,e)}return r(e,null,[{key:"round",value:function(e,t){return t=t?t:1,+(Math.round(e+"e"+t)+"e-"+t)}},{key:"meanAngle",value:function(e){for(var t=0,n=0,r=0;r<e.length;r++)t+=a(e[r]),n+=o(e[r]);return Math.atan2(t/e.length,n/e.length)}},{key:"innerAngle",value:function(t){return e.toRad(180*(t-2)/t)}},{key:"polyCircumradius",value:function(e,t){return e/(2*a(l/t))}},{key:"apothem",value:function(e,t){return e*o(l/t)}},{key:"apothemFromSideLength",value:function(t,i){var n=e.polyCircumradius(t,i);return e.apothem(n,i)}},{key:"centralAngle",value:function(t){return e.toRad(360/t)}},{key:"toDeg",value:function(t){return t*e.degFactor}},{key:"toRad",value:function(t){return t*e.radFactor}},{key:"parityOfPermutation",value:function(e){for(var t=new Uint8Array(e.length),n=0,a=function n(a){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return 1===t[a]?i:(i++,t[a]=1,n(e[a],i))},r=0;r<e.length;r++)if(1!==t[r]){var i=a(r);n+=1-i%2}return n%2?-1:1}},{key:"radFactor",get:function(){return l/180}},{key:"degFactor",get:function(){return 180/l}},{key:"twoPI",get:function(){return 2*l}}]),e}();n.default=s},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){function e(t,n,i,a){this.message=t,this.expected=n,this.found=i,this.location=a,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}return function(e,t){function n(){this.constructor=e}n.prototype=t.prototype,e.prototype=new n}(e,Error),{SyntaxError:e,parse:function(t){function n(e){var n=tt[e],i,a;if(n)return n;for(i=e-1;!tt[i];)i--;for(n=tt[i],n={line:n.line,column:n.column,seenCR:n.seenCR};i<e;)a=t.charAt(i),"\n"===a?(!n.seenCR&&n.line++,n.column=1,n.seenCR=!1):"\r"===a||"\u2028"===a||"\u2029"===a?(n.line++,n.column=1,n.seenCR=!0):(n.column++,n.seenCR=!1),i++;return tt[e]=n,n}function i(e,t){var i=n(e),a=n(t);return{start:{offset:e,line:i.line,column:i.column},end:{offset:t,line:a.line,column:a.column}}}function a(e){Je<nt||(Je>nt&&(nt=Je,it=[]),it.push(e))}function r(){var e,t,n,i,a,d,g,u,h,c;if(e=Je,t=Je,n=l(),n!==R){for(i=[],a=o();a!==R;)i.push(a),a=o();if(i!==R){for(a=[],d=Je,g=s(),g===R&&(g=null),g===R?(Je=d,d=R):(u=p(),u===R?(Je=d,d=R):(g=[g,u],d=g));d!==R;)a.push(d),d=Je,g=s(),g===R&&(g=null),g===R?(Je=d,d=R):(u=p(),u===R?(Je=d,d=R):(g=[g,u],d=g));if(a!==R){for(d=[],g=o();g!==R;)d.push(g),g=o();if(d===R)Je=t,t=R;else if(g=s(),g===R&&(g=null),g===R)Je=t,t=R;else if(u=r(),u===R&&(u=null),u!==R){for(h=[],c=o();c!==R;)h.push(c),c=o();h===R?(Je=t,t=R):(n=[n,i,a,d,g,u,h],t=n)}else Je=t,t=R}else Je=t,t=R}else Je=t,t=R}else Je=t,t=R;return t!==R&&(et=e,t=T(t)),e=t,e}function o(){var e,n,i,o,l,d;return e=Je,n=Je,40===t.charCodeAt(Je)?(i=w,Je++):(i=R,a(P)),i===R?(Je=n,n=R):(o=s(),o===R&&(o=null),o===R?(Je=n,n=R):(l=r(),l===R?(Je=n,n=R):(41===t.charCodeAt(Je)?(d=I,Je++):(d=R,a(B)),d===R?(Je=n,n=R):(i=[i,o,l,d],n=i)))),n!==R&&(et=e,n=L(n)),e=n,e}function l(){var e,t;return e=Je,t=g(),t===R&&(t=u(),t===R&&(t=d(),t===R&&(t=h()))),t!==R&&(et=e,t=E(t)),e=t,e}function s(){var e,n;return e=Je,D.test(t.charAt(Je))?(n=t.charAt(Je),Je++):(n=R,a(N)),n!==R&&(et=e,n=_(n)),e=n,e}function d(){var e,n,i,r,o,l,s,d,g,p;return e=Je,n=Je,91===t.charCodeAt(Je)?(i=O,Je++):(i=R,a(V)),i===R?(Je=n,n=R):(r=x(),r===R&&(r=null),r===R?(Je=n,n=R):(t.substr(Je,2)===z?(o=z,Je+=2):(o=R,a(H)),o===R&&(t.substr(Je,2)===F?(o=F,Je+=2):(o=R,a(W)),o===R&&(o=u(),o===R&&(o=c(),o===R&&(o=h())))),o===R?(Je=n,n=R):(l=v(),l===R&&(l=null),l===R?(Je=n,n=R):(s=b(),s===R&&(s=null),s===R?(Je=n,n=R):(d=f(),d===R&&(d=null),d===R?(Je=n,n=R):(g=k(),g===R&&(g=null),g===R?(Je=n,n=R):(93===t.charCodeAt(Je)?(p=M,Je++):(p=R,a(q)),p===R?(Je=n,n=R):(i=[i,r,o,l,s,d,g,p],n=i)))))))),n!==R&&(et=e,n=U(n)),e=n,e}function g(){var e,n,i,r;return e=Je,n=Je,66===t.charCodeAt(Je)?(i=G,Je++):(i=R,a(X)),i===R?(Je=n,n=R):(114===t.charCodeAt(Je)?(r=Y,Je++):(r=R,a(K)),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n===R&&(n=Je,67===t.charCodeAt(Je)?(i=Z,Je++):(i=R,a($)),i===R?(Je=n,n=R):(108===t.charCodeAt(Je)?(r=Q,Je++):(r=R,a(J)),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n===R&&(ee.test(t.charAt(Je))?(n=t.charAt(Je),Je++):(n=R,a(te)))),n!==R&&(et=e,n=ne(n)),e=n,e}function u(){var e,n;return e=Je,ie.test(t.charAt(Je))?(n=t.charAt(Je),Je++):(n=R,a(ae)),n!==R&&(et=e,n=E(n)),e=n,e}function h(){var e,n;return e=Je,42===t.charCodeAt(Je)?(n=re,Je++):(n=R,a(oe)),n!==R&&(et=e,n=le(n)),e=n,e}function c(){var e,n,i,r;return e=Je,n=Je,se.test(t.charAt(Je))?(i=t.charAt(Je),Je++):(i=R,a(de)),i===R?(Je=n,n=R):(ge.test(t.charAt(Je))?(r=t.charAt(Je),Je++):(r=R,a(ue)),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n!==R&&(et=e,n=he(n)),e=n,e}function p(){var e,n,i,r,o;return e=Je,n=Je,37===t.charCodeAt(Je)?(i=ce,Je++):(i=R,a(pe)),i===R?(Je=n,n=R):(ve.test(t.charAt(Je))?(r=t.charAt(Je),Je++):(r=R,a(fe)),r===R?(Je=n,n=R):(ye.test(t.charAt(Je))?(o=t.charAt(Je),Je++):(o=R,a(me)),o===R?(Je=n,n=R):(i=[i,r,o],n=i))),n===R&&(ye.test(t.charAt(Je))?(n=t.charAt(Je),Je++):(n=R,a(me))),n!==R&&(et=e,n=be(n)),e=n,e}function v(){var e,n,i,r,o,l,s;return e=Je,n=Je,64===t.charCodeAt(Je)?(i=ke,Je++):(i=R,a(xe)),i===R?(Je=n,n=R):(64===t.charCodeAt(Je)?(r=ke,Je++):(r=R,a(xe)),r===R&&(r=Je,t.substr(Je,2)===Ce?(o=Ce,Je+=2):(o=R,a(Se)),o===R?(Je=r,r=R):(Re.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(Ae)),l===R?(Je=r,r=R):(o=[o,l],r=o)),r===R&&(r=Je,t.substr(Je,2)===je?(o=je,Je+=2):(o=R,a(Te)),o===R?(Je=r,r=R):(Re.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(Ae)),l===R?(Je=r,r=R):(o=[o,l],r=o)),r===R&&(r=Je,t.substr(Je,2)===we?(o=we,Je+=2):(o=R,a(Pe)),o===R?(Je=r,r=R):(Ie.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(Be)),l===R?(Je=r,r=R):(o=[o,l],r=o)),r===R&&(r=Je,t.substr(Je,2)===Le?(o=Le,Je+=2):(o=R,a(Ee)),o===R?(Je=r,r=R):(ve.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(fe)),l===R?(Je=r,r=R):(ye.test(t.charAt(Je))?(s=t.charAt(Je),Je++):(s=R,a(me)),s===R&&(s=null),s===R?(Je=r,r=R):(o=[o,l,s],r=o))),r===R&&(r=Je,t.substr(Je,2)===De?(o=De,Je+=2):(o=R,a(Ne)),o===R?(Je=r,r=R):(ve.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(fe)),l===R?(Je=r,r=R):(ye.test(t.charAt(Je))?(s=t.charAt(Je),Je++):(s=R,a(me)),s===R&&(s=null),s===R?(Je=r,r=R):(o=[o,l,s],r=o)))))))),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n!==R&&(et=e,n=_e(n)),e=n,e}function f(){var e,t;return e=Je,t=y(),t===R&&(t=m()),t!==R&&(et=e,t=Oe(t)),e=t,e}function y(){var e,n,i,r,o,l;return e=Je,n=Je,43===t.charCodeAt(Je)?(i=Ve,Je++):(i=R,a(ze)),i===R?(Je=n,n=R):(43===t.charCodeAt(Je)?(r=Ve,Je++):(r=R,a(ze)),r===R&&(r=Je,ve.test(t.charAt(Je))?(o=t.charAt(Je),Je++):(o=R,a(fe)),o===R?(Je=r,r=R):(ye.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(me)),l===R&&(l=null),l===R?(Je=r,r=R):(o=[o,l],r=o))),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n!==R&&(et=e,n=He(n)),e=n,e}function m(){var e,n,i,r,o,l;return e=Je,n=Je,45===t.charCodeAt(Je)?(i=Fe,Je++):(i=R,a(We)),i===R?(Je=n,n=R):(45===t.charCodeAt(Je)?(r=Fe,Je++):(r=R,a(We)),r===R&&(r=Je,ve.test(t.charAt(Je))?(o=t.charAt(Je),Je++):(o=R,a(fe)),o===R?(Je=r,r=R):(ye.test(t.charAt(Je))?(l=t.charAt(Je),Je++):(l=R,a(me)),l===R&&(l=null),l===R?(Je=r,r=R):(o=[o,l],r=o))),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n!==R&&(et=e,n=Me(n)),e=n,e}function b(){var e,n,i,r;return e=Je,n=Je,72===t.charCodeAt(Je)?(i=qe,Je++):(i=R,a(Ue)),i===R?(Je=n,n=R):(ye.test(t.charAt(Je))?(r=t.charAt(Je),Je++):(r=R,a(me)),r===R&&(r=null),r===R?(Je=n,n=R):(i=[i,r],n=i)),n!==R&&(et=e,n=Ge(n)),e=n,e}function k(){var e,n,i,r,o,l,s;if(e=Je,n=Je,58===t.charCodeAt(Je)?(i=Xe,Je++):(i=R,a(Ye)),i!==R){if(r=Je,ve.test(t.charAt(Je))?(o=t.charAt(Je),Je++):(o=R,a(fe)),o!==R){for(l=[],ye.test(t.charAt(Je))?(s=t.charAt(Je),Je++):(s=R,a(me));s!==R;)l.push(s),ye.test(t.charAt(Je))?(s=t.charAt(Je),Je++):(s=R,a(me));l===R?(Je=r,r=R):(o=[o,l],r=o)}else Je=r,r=R;r===R&&(Ke.test(t.charAt(Je))?(r=t.charAt(Je),Je++):(r=R,a(Ze))),r===R?(Je=n,n=R):(i=[i,r],n=i)}else Je=n,n=R;return n!==R&&(et=e,n=$e(n)),e=n,e}function x(){var e,n,i,r,o;return e=Je,n=Je,ve.test(t.charAt(Je))?(i=t.charAt(Je),Je++):(i=R,a(fe)),i===R?(Je=n,n=R):(ye.test(t.charAt(Je))?(r=t.charAt(Je),Je++):(r=R,a(me)),r===R&&(r=null),r===R?(Je=n,n=R):(ye.test(t.charAt(Je))?(o=t.charAt(Je),Je++):(o=R,a(me)),o===R&&(o=null),o===R?(Je=n,n=R):(i=[i,r,o],n=i))),n!==R&&(et=e,n=Qe(n)),e=n,e}var C=1<arguments.length?arguments[1]:{},S=this,R={},A={chain:r},j=r,T=function(e){for(var t=[],n=[],a=0;a<e[1].length;a++)t.push(e[1][a]);for(var a=0,i;a<e[2].length;a++)i=e[2][a][0]?e[2][a][0]:"-",n.push({bond:i,id:e[2][a][1]});for(var a=0;a<e[3].length;a++)t.push(e[3][a]);for(var a=0;a<e[6].length;a++)t.push(e[6][a]);return{atom:e[0],isBracket:!!e[0].element,branches:t,branchCount:t.length,ringbonds:n,ringbondCount:n.length,bond:e[4]?e[4]:"-",next:e[5],hasNext:!!e[5]}},w="(",P={type:"literal",value:"(",description:"\"(\""},I=")",B={type:"literal",value:")",description:"\")\""},L=function(e){var t=e[1]?e[1]:"-";return e[2].branchBond=t,e[2]},E=function(e){return e},D=/^[\-=#$:\/\\.]/,N={type:"class",value:"[-=#$:/\\\\.]",description:"[-=#$:/\\\\.]"},_=function(e){return e},O="[",V={type:"literal",value:"[",description:"\"[\""},z="se",H={type:"literal",value:"se",description:"\"se\""},F="as",W={type:"literal",value:"as",description:"\"as\""},M="]",q={type:"literal",value:"]",description:"\"]\""},U=function(e){return{isotope:e[1],element:e[2],chirality:e[3],hcount:e[4],charge:e[5],class:e[6]}},G="B",X={type:"literal",value:"B",description:"\"B\""},Y="r",K={type:"literal",value:"r",description:"\"r\""},Z="C",$={type:"literal",value:"C",description:"\"C\""},Q="l",J={type:"literal",value:"l",description:"\"l\""},ee=/^[NOPSFI]/,te={type:"class",value:"[NOPSFI]",description:"[NOPSFI]"},ne=function(e){return 1<e.length?e.join(""):e},ie=/^[bcnops]/,ae={type:"class",value:"[bcnops]",description:"[bcnops]"},re="*",oe={type:"literal",value:"*",description:"\"*\""},le=function(e){return e},se=/^[A-Z]/,de={type:"class",value:"[A-Z]",description:"[A-Z]"},ge=/^[a-z]/,ue={type:"class",value:"[a-z]",description:"[a-z]"},he=function(t){return t.join("")},ce="%",pe={type:"literal",value:"%",description:"\"%\""},ve=/^[1-9]/,fe={type:"class",value:"[1-9]",description:"[1-9]"},ye=/^[0-9]/,me={type:"class",value:"[0-9]",description:"[0-9]"},be=function(e){return 1==e.length?+e:+e.join("").replace("%","")},ke="@",xe={type:"literal",value:"@",description:"\"@\""},Ce="TH",Se={type:"literal",value:"TH",description:"\"TH\""},Re=/^[12]/,Ae={type:"class",value:"[12]",description:"[12]"},je="AL",Te={type:"literal",value:"AL",description:"\"AL\""},we="SP",Pe={type:"literal",value:"SP",description:"\"SP\""},Ie=/^[1-3]/,Be={type:"class",value:"[1-3]",description:"[1-3]"},Le="TB",Ee={type:"literal",value:"TB",description:"\"TB\""},De="OH",Ne={type:"literal",value:"OH",description:"\"OH\""},_e=function(e){return e[1]?"@"==e[1]?"@@":e[1].join("").replace(",",""):"@"},Oe=function(e){return e},Ve="+",ze={type:"literal",value:"+",description:"\"+\""},He=function(e){return e[1]?"+"==e[1]?2:+e[1].join(""):1},Fe="-",We={type:"literal",value:"-",description:"\"-\""},Me=function(e){return e[1]?"-"==e[1]?-2:-+e[1].join(""):-1},qe="H",Ue={type:"literal",value:"H",description:"\"H\""},Ge=function(e){return e[1]?+e[1]:1},Xe=":",Ye={type:"literal",value:":",description:"\":\""},Ke=/^[0]/,Ze={type:"class",value:"[0]",description:"[0]"},$e=function(e){return+(e[1][0]+e[1][1].join(""))},Qe=function(e){return+e.join("")},Je=0,et=0,tt=[{line:1,column:1,seenCR:!1}],nt=0,it=[],at;if("startRule"in C){if(!(C.startRule in A))throw new Error("Can't start parsing from rule \""+C.startRule+"\".");j=A[C.startRule]}if(at=j(),at!==R&&Je===t.length)return at;throw at!==R&&Je<t.length&&a({type:"end",description:"end of input"}),function(t,n,i,a){return null!==n&&function(e){var t=1;for(e.sort(function(e,t){return e.description<t.description?-1:e.description>t.description?1:0});t<e.length;)e[t-1]===e[t]?e.splice(t,1):t++}(n),new e(null===t?function(e,t){var n=Array(e.length),a,r,o;for(o=0;o<e.length;o++)n[o]=e[o].description;return a=1<e.length?n.slice(0,-1).join(", ")+" or "+n[e.length-1]:n[0],r=t?"\""+function(e){function t(e){return e.charCodeAt(0).toString(16).toUpperCase()}return e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"").replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(e){return"\\x0"+t(e)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(e){return"\\x"+t(e)}).replace(/[\u0100-\u0FFF]/g,function(e){return"\\u0"+t(e)}).replace(/[\u1000-\uFFFF]/g,function(e){return"\\u"+t(e)})}(t)+"\"":"end of input","Expected "+a+" but "+r+" found."}(n,i):t,n,i,a)}(null,it,nt<t.length?t.charAt(nt):null,nt<t.length?i(nt,nt+1):i(nt,nt))}}}()},{}],11:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./ArrayHelper"),l=i(o),s=e("./Vector2"),d=i(s),g=e("./Vertex"),u=i(g),h=e("./RingConnection"),c=i(h),p=function(){function e(t){a(this,e),this.id=null,this.members=t,this.edges=[],this.insiders=[],this.neighbours=[],this.positioned=!1,this.center=new d.default(0,0),this.rings=[],this.isBridged=!1,this.isPartOfBridged=!1,this.isSpiro=!1,this.isFused=!1,this.centralAngle=0,this.canFlip=!0}return r(e,[{key:"clone",value:function(){var t=new e(this.members);return t.id=this.id,t.insiders=l.default.clone(this.insiders),t.neighbours=l.default.clone(this.neighbours),t.positioned=this.positioned,t.center=this.center.clone(),t.rings=l.default.clone(this.rings),t.isBridged=this.isBridged,t.isPartOfBridged=this.isPartOfBridged,t.isSpiro=this.isSpiro,t.isFused=this.isFused,t.centralAngle=this.centralAngle,t.canFlip=this.canFlip,t}},{key:"getSize",value:function(){return this.members.length}},{key:"getPolygon",value:function(e){for(var t=[],n=0;n<this.members.length;n++)t.push(e[this.members[n]].position);return t}},{key:"getAngle",value:function(){return Math.PI-this.centralAngle}},{key:"eachMember",value:function(e,t,n,i){n=n||0===n?n:this.members[0];for(var a=n,r=0,o;null!=a&&100>r;)o=a,t(o),a=e[a].getNextInRing(e,this.id,i),i=o,a==n&&(a=null),r++}},{key:"getOrderedNeighbours",value:function(e){for(var t=Array(this.neighbours.length),n=0,i;n<this.neighbours.length;n++)i=c.default.getVertices(e,this.id,this.neighbours[n]),t[n]={n:i.length,neighbour:this.neighbours[n]};return t.sort(function(e,t){return t.n-e.n}),t}},{key:"isBenzeneLike",value:function(e){var t=this.getDoubleBondCount(e),n=this.members.length;return 3===t&&6===n||2===t&&5===n}},{key:"getDoubleBondCount",value:function(e){for(var t=0,n=0,i;n<this.members.length;n++)i=e[this.members[n]].value,("="===i.bondType||"="===i.branchBond)&&t++;return t}},{key:"contains",value:function(e){for(var t=0;t<this.members.length;t++)if(this.members[t]==e)return!0;return!1}}]),e}();n.default=p},{"./ArrayHelper":2,"./RingConnection":12,"./Vector2":14,"./Vertex":15}],12:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=e("./Vertex"),s=i(l),d=e("./Ring"),g=i(d),u=function(){function e(t,i){r(this,e),this.id=null,this.firstRingId=t.id,this.secondRingId=i.id,this.vertices=new Set;for(var a=0,o;a<t.members.length;a++){o=t.members[a];for(var l=0,n;l<i.members.length;l++)n=i.members[l],o===n&&this.addVertex(o)}}return o(e,[{key:"addVertex",value:function(e){this.vertices.add(e)}},{key:"updateOther",value:function(e,t){this.firstRingId===t?this.secondRingId=e:this.firstRingId=e}},{key:"containsRing",value:function(e){return this.firstRingId===e||this.secondRingId===e}},{key:"isBridge",value:function(e){if(2<this.vertices.size)return!0;var t=!0,n=!1,i;try{for(var a=this.vertices[Symbol.iterator](),r,o;!(t=(r=a.next()).done);t=!0)if(o=r.value,2<e[o].value.rings.length)return!0}catch(e){n=!0,i=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw i}}return!1}}],[{key:"isBridge",value:function(e,t,n,a){for(var r=null,o=0;o<e.length;o++)if(r=e[o],r.firstRingId===n&&r.secondRingId===a||r.firstRingId===a&&r.secondRingId===n)return r.isBridge(t);return!1}},{key:"getNeighbours",value:function(e,t){for(var n=[],a=0,i;a<e.length;a++)i=e[a],i.firstRingId===t?n.push(i.secondRingId):i.secondRingId===t&&n.push(i.firstRingId);return n}},{key:"getVertices",value:function(e,t,n){for(var r=0,i;r<e.length;r++)if(i=e[r],i.firstRingId===t&&i.secondRingId===n||i.firstRingId===n&&i.secondRingId===t)return[].concat(a(i.vertices))}}]),e}();n.default=u},{"./Ring":11,"./Vertex":15}],13:[function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./Graph"),l=function(e){return e&&e.__esModule?e:{default:e}}(o),s=function(){function e(){i(this,e)}return r(e,null,[{key:"getRings",value:function(t){var n=t.getComponentsAdjacencyMatrix();if(0===n.length)return null;for(var r=l.default.getConnectedComponents(n),o=[],s=0;s<r.length;s++){for(var i=r[s],g=t.getSubgraphAdjacencyMatrix([].concat(a(i))),u=new Uint16Array(g.length),h=new Uint16Array(g.length),p=0;p<g.length;p++){h[p]=0,u[p]=0;for(var v=0;v<g[p].length;v++)u[p]+=g[p][v]}for(var f=0,p=0;p<g.length;p++)for(var v=p+1;v<g.length;v++)f+=g[p][v];for(var y=f-g.length+1,m=!0,p=0;p<u.length;p++)3!==u[p]&&(m=!1);if(m&&(y=2+f-g.length),1==y){o.push([].concat(a(i)));continue}for(var b=e.getPathIncludedDistanceMatrices(g),k=b.d,d=b.pe,x=b.pe_prime,C=e.getRingCandidates(k,d,x),c=e.getSSSR(C,k,g,d,x,u,h,y),p=0;p<c.length;p++){var S=Array(c[p].size),R=0,A=!0,j=!1,T=void 0;try{for(var w=c[p][Symbol.iterator](),P,I;!(A=(P=w.next()).done);A=!0)I=P.value,S[R++]=i[I]}catch(e){j=!0,T=e}finally{try{!A&&w.return&&w.return()}finally{if(j)throw T}}o.push(S)}}return o}},{key:"matrixToString",value:function(e){for(var t="",n=0;n<e.length;n++){for(var i=0;i<e[n].length;i++)t+=e[n][i]+" ";t+="\n"}return t}},{key:"getPathIncludedDistanceMatrices",value:function(e){for(var t=e.length,a=Array(t),r=Array(t),o=Array(t),s=0,l=0,g=0,n=t;n--;){a[n]=Array(t),r[n]=Array(t),o[n]=Array(t);for(var i=t;i--;)a[n][i]=n===i||1===e[n][i]?e[n][i]:Number.POSITIVE_INFINITY,r[n][i]=1===a[n][i]?[[[n,i]]]:[],o[n][i]=[]}for(var u=t,i;u--;)for(n=t;n--;)for(i=t;i--;){var h=a[n][i],c=a[n][u]+a[u][i];if(h>c){var s,l,g;if(h===c+1)for(o[n][i]=[r[n][i].length],s=r[n][i].length;s--;)for(o[n][i][s]=[r[n][i][s].length],l=r[n][i][s].length;l--;)for(o[n][i][s][l]=[r[n][i][s][l].length],g=r[n][i][s][l].length;g--;)o[n][i][s][l][g]=[r[n][i][s][l][0],r[n][i][s][l][1]];else o[n][i]=[];for(a[n][i]=c,r[n][i]=[[]],s=r[n][u][0].length;s--;)r[n][i][0].push(r[n][u][0][s]);for(s=r[u][i][0].length;s--;)r[n][i][0].push(r[u][i][0][s])}else if(h===c){if(r[n][u].length&&r[u][i].length){var s;if(r[n][i].length){var p=[];for(s=r[n][u][0].length;s--;)p.push(r[n][u][0][s]);for(s=r[u][i][0].length;s--;)p.push(r[u][i][0][s]);r[n][i].push(p)}else{var v=[];for(s=r[n][u][0].length;s--;)v.push(r[n][u][0][s]);for(s=r[u][i][0].length;s--;)v.push(r[u][i][0][s]);r[n][i][0]=v}}}else if(h===c-1){var s;if(o[n][i].length){var f=[];for(s=r[n][u][0].length;s--;)f.push(r[n][u][0][s]);for(s=r[u][i][0].length;s--;)f.push(r[u][i][0][s]);o[n][i].push(f)}else{var y=[];for(s=r[n][u][0].length;s--;)y.push(r[n][u][0][s]);for(s=r[u][i][0].length;s--;)y.push(r[u][i][0][s]);o[n][i][0]=y}}}return{d:a,pe:r,pe_prime:o}}},{key:"getRingCandidates",value:function(e,t,n){for(var a=e.length,r=[],o=0,l=0;l<a;l++)for(var i=0;i<a;i++)if(0===e[l][i]||1===t[l][i].length&&0===n[l][i])continue;else o=0===n[l][i].length?2*e[l][i]:2*(e[l][i]+0.5),o!=Infinity&&r.push([o,t[l][i],n[l][i]]);return r.sort(function(e,t){return e[0]-t[0]}),r}},{key:"getSSSR",value:function(t,n,a,r,o,l,s,d){for(var g=[],u=[],h=0;h<t.length;h++)if(0!=t[h][0]%2)for(var i=0,c;i<t[h][2].length;i++){c=t[h][1][0].concat(t[h][2][i]);for(var p=0;p<c.length;p++)c[p][0].constructor===Array&&(c[p]=c[p][0]);var v=e.bondsToAtoms(c);if(e.getBondCount(v,a)!==v.size||e.pathSetsContain(g,v,c,u,l,s)||(g.push(v),u=u.concat(c)),g.length>d)return g}else for(var f=0,y;f<t[h][1].length-1;f++){y=t[h][1][f].concat(t[h][1][f+1]);for(var p=0;p<y.length;p++)y[p][0].constructor===Array&&(y[p]=y[p][0]);var m=e.bondsToAtoms(y);if(e.getBondCount(m,a)!==m.size||e.pathSetsContain(g,m,y,u,l,s)||(g.push(m),u=u.concat(y)),g.length>d)return g}return g}},{key:"getEdgeCount",value:function(e){for(var t=0,n=e.length,a=n-1;a--;)for(var i=n;i--;)1===e[a][i]&&t++;return t}},{key:"getEdgeList",value:function(e){for(var t=e.length,n=[],a=t-1;a--;)for(var i=t;i--;)1===e[a][i]&&n.push([a,i]);return n}},{key:"bondsToAtoms",value:function(e){for(var t=new Set,n=e.length;n--;)t.add(e[n][0]),t.add(e[n][1]);return t}},{key:"getBondCount",value:function(e,t){var n=0,i=!0,a=!1,r;try{for(var o=e[Symbol.iterator](),l;!(i=(l=o.next()).done);i=!0){var s=l.value,d=!0,g=!1,u=void 0;try{for(var h=e[Symbol.iterator](),c,p;!(d=(c=h.next()).done);d=!0)(p=c.value,s!==p)&&(n+=t[s][p])}catch(e){g=!0,u=e}finally{try{!d&&h.return&&h.return()}finally{if(g)throw u}}}}catch(e){a=!0,r=e}finally{try{!i&&o.return&&o.return()}finally{if(a)throw r}}return n/2}},{key:"pathSetsContain",value:function(t,n,a,r,o,l){for(var s=t.length;s--;){if(e.isSupersetOf(n,t[s]))return!0;if(t[s].size===n.size&&e.areSetsEqual(t[s],n))return!0}var i=0,d=!1;for(s=a.length;s--;)for(var g=r.length;g--;)(a[s][0]===r[g][0]&&a[s][1]===r[g][1]||a[s][1]===r[g][0]&&a[s][0]===r[g][1])&&i++,i===a.length&&(d=!0);var u=!1;if(d){var h=!0,c=!1,p;try{for(var v=n[Symbol.iterator](),f,y;!(h=(f=v.next()).done);h=!0)if(y=f.value,l[y]<o[y]){u=!0;break}}catch(e){c=!0,p=e}finally{try{!h&&v.return&&v.return()}finally{if(c)throw p}}}if(d&&!u)return!0;var m=!0,b=!1,k;try{for(var x=n[Symbol.iterator](),C,S;!(m=(C=x.next()).done);m=!0)S=C.value,l[S]++}catch(e){b=!0,k=e}finally{try{!m&&x.return&&x.return()}finally{if(b)throw k}}return!1}},{key:"areSetsEqual",value:function(e,t){if(e.size!==t.size)return!1;var n=!0,i=!1,a;try{for(var r=e[Symbol.iterator](),o,l;!(n=(o=r.next()).done);n=!0)if(l=o.value,!t.has(l))return!1}catch(e){i=!0,a=e}finally{try{!n&&r.return&&r.return()}finally{if(i)throw a}}return!0}},{key:"isSupersetOf",value:function(e,t){var n=!0,i=!1,a;try{for(var r=t[Symbol.iterator](),o,l;!(n=(o=r.next()).done);n=!0)if(l=o.value,!e.has(l))return!1}catch(e){i=!0,a=e}finally{try{!n&&r.return&&r.return()}finally{if(i)throw a}}return!0}}]),e}();n.default=s},{"./Graph":7}],14:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=Math.sin,r=Math.cos,o=Math.sqrt;Object.defineProperty(n,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(t,n){i(this,e),0==arguments.length?(this.x=0,this.y=0):1==arguments.length?(this.x=t.x,this.y=t.y):(this.x=t,this.y=n)}var t=Math.acos;return l(e,[{key:"clone",value:function(){return new e(this.x,this.y)}},{key:"toString",value:function(){return"("+this.x+","+this.y+")"}},{key:"add",value:function(e){return this.x+=e.x,this.y+=e.y,this}},{key:"subtract",value:function(e){return this.x-=e.x,this.y-=e.y,this}},{key:"divide",value:function(e){return this.x/=e,this.y/=e,this}},{key:"multiply",value:function(e){return this.x*=e.x,this.y*=e.y,this}},{key:"multiplyScalar",value:function(e){return this.x*=e,this.y*=e,this}},{key:"invert",value:function(){return this.x=-this.x,this.y=-this.y,this}},{key:"angle",value:function(){return Math.atan2(this.y,this.x)}},{key:"distance",value:function(e){return o((e.x-this.x)*(e.x-this.x)+(e.y-this.y)*(e.y-this.y))}},{key:"distanceSq",value:function(e){return(e.x-this.x)*(e.x-this.x)+(e.y-this.y)*(e.y-this.y)}},{key:"clockwise",value:function(e){var t=this.y*e.x,n=this.x*e.y;return t>n?-1:t==n?0:1}},{key:"relativeClockwise",value:function(e,t){var n=(this.y-e.y)*(t.x-e.x),i=(this.x-e.x)*(t.y-e.y);return n>i?-1:n==i?0:1}},{key:"rotate",value:function(t){var n=new e(0,0),i=r(t),o=a(t);return n.x=this.x*i-this.y*o,n.y=this.x*o+this.y*i,this.x=n.x,this.y=n.y,this}},{key:"rotateAround",value:function(e,t){var n=a(e),i=r(e);this.x-=t.x,this.y-=t.y;var o=this.x*i-this.y*n,l=this.x*n+this.y*i;return this.x=o+t.x,this.y=l+t.y,this}},{key:"rotateTo",value:function(t,n){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;this.x+=1e-3,this.y-=1e-3;var r=e.subtract(this,n),a=e.subtract(t,n),o=e.angle(a,r);return this.rotateAround(o+i,n),this}},{key:"rotateAwayFrom",value:function(e,t,n){this.rotateAround(n,t);var i=this.distanceSq(e);this.rotateAround(-2*n,t);var a=this.distanceSq(e);a<i&&this.rotateAround(2*n,t)}},{key:"getRotateAwayFromAngle",value:function(e,t,n){var i=this.clone();i.rotateAround(n,t);var a=i.distanceSq(e);i.rotateAround(-2*n,t);var r=i.distanceSq(e);return r<a?n:-n}},{key:"getRotateTowardsAngle",value:function(e,t,n){var i=this.clone();i.rotateAround(n,t);var a=i.distanceSq(e);i.rotateAround(-2*n,t);var r=i.distanceSq(e);return r>a?n:-n}},{key:"getRotateToAngle",value:function(t,n){var i=e.subtract(this,n),a=e.subtract(t,n),r=e.angle(a,i);return Number.isNaN(r)?0:r}},{key:"isInPolygon",value:function(e){for(var t=!1,n=0,i=e.length-1;n<e.length;i=n++)e[n].y>this.y!=e[i].y>this.y&&this.x<(e[i].x-e[n].x)*(this.y-e[n].y)/(e[i].y-e[n].y)+e[n].x&&(t=!t);return t}},{key:"length",value:function(){return o(this.x*this.x+this.y*this.y)}},{key:"lengthSq",value:function(){return this.x*this.x+this.y*this.y}},{key:"normalize",value:function(){return this.divide(this.length()),this}},{key:"normalized",value:function(){return e.divideScalar(this,this.length())}},{key:"whichSide",value:function(e,t){return(this.x-e.x)*(t.y-e.y)-(this.y-e.y)*(t.x-e.x)}},{key:"sameSideAs",value:function(e,t,n){var i=this.whichSide(e,t),a=n.whichSide(e,t);return 0>i&&0>a||0==i&&0==a||0<i&&0<a}}],[{key:"add",value:function(t,n){return new e(t.x+n.x,t.y+n.y)}},{key:"subtract",value:function(t,n){return new e(t.x-n.x,t.y-n.y)}},{key:"multiply",value:function(t,n){return new e(t.x*n.x,t.y*n.y)}},{key:"multiplyScalar",value:function(t,n){return new e(t.x,t.y).multiplyScalar(n)}},{key:"midpoint",value:function(t,n){return new e((t.x+n.x)/2,(t.y+n.y)/2)}},{key:"normals",value:function(t,n){var i=e.subtract(n,t);return[new e(-i.y,i.x),new e(i.y,-i.x)]}},{key:"units",value:function(t,n){var i=e.subtract(n,t);return[new e(-i.y,i.x).normalize(),new e(i.y,-i.x).normalize()]}},{key:"divide",value:function(t,n){return new e(t.x/n.x,t.y/n.y)}},{key:"divideScalar",value:function(t,n){return new e(t.x/n,t.y/n)}},{key:"dot",value:function(e,t){return e.x*t.x+e.y*t.y}},{key:"angle",value:function(n,i){var a=e.dot(n,i);return t(a/(n.length()*i.length()))}},{key:"threePointangle",value:function(n,i,a){var r=e.subtract(i,n),o=e.subtract(a,i),l=n.distance(i),s=i.distance(a);return t(e.dot(r,o)/(l*s))}},{key:"scalarProjection",value:function(t,n){var i=n.normalized();return e.dot(t,i)}},{key:"averageDirection",value:function(t){for(var n=new e(0,0),a=0,i;a<t.length;a++)i=t[a],n.add(i);return n.normalize()}}]),e}();n.default=s},{}],15:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=Math.round;Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0,i;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=e("./MathHelper"),s=i(l),d=e("./ArrayHelper"),g=i(d),u=e("./Vector2"),h=i(u),c=e("./Atom"),p=i(c),v=function(){function e(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;a(this,e),this.id=null,this.value=t,this.position=new h.default(n?n:0,i?i:0),this.previousPosition=new h.default(0,0),this.parentVertexId=null,this.children=[],this.spanningTreeChildren=[],this.edges=[],this.positioned=!1,this.angle=null,this.dir=1,this.neighbourCount=0,this.neighbours=[],this.neighbouringElements=[],this.forcePositioned=!1}return o(e,[{key:"setPosition",value:function(e,t){this.position.x=e,this.position.y=t}},{key:"setPositionFromVector",value:function(e){this.position.x=e.x,this.position.y=e.y}},{key:"addChild",value:function(e){this.children.push(e),this.neighbours.push(e),this.neighbourCount++,this.value.bondCount++}},{key:"addRingbondChild",value:function(e,t){if(this.children.push(e),this.value.bracket){var n=1;0===this.id&&0===this.value.bracket.hcount&&(n=0),1===this.value.bracket.hcount&&0===t&&(n=2),1===this.value.bracket.hcount&&1===t&&(3>this.neighbours.length?n=2:n=3),null===this.value.bracket.hcount&&0===t&&(n=1),null===this.value.bracket.hcount&&1===t&&(3>this.neighbours.length?n=1:n=2),this.neighbours.splice(n,0,e)}else this.neighbours.push(e);this.neighbourCount++,this.value.bondCount++}},{key:"setParentVertexId",value:function(e){this.neighbourCount++,this.parentVertexId=e,this.neighbours.push(e),this.value.bondCount++}},{key:"isTerminal",value:function(){return!!this.value.hasAttachedPseudoElements||null===this.parentVertexId&&2>this.children.length||0===this.children.length}},{key:"clone",value:function(){var t=new e(this.value,this.position.x,this.position.y);return t.id=this.id,t.previousPosition=new h.default(this.previousPosition.x,this.previousPosition.y),t.parentVertexId=this.parentVertexId,t.children=g.default.clone(this.children),t.spanningTreeChildren=g.default.clone(this.spanningTreeChildren),t.edges=g.default.clone(this.edges),t.positioned=this.positioned,t.angle=this.angle,t.forcePositioned=this.forcePositioned,t}},{key:"equals",value:function(e){return this.id===e.id}},{key:"getAngle",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=null;return n=e?h.default.subtract(this.position,e):h.default.subtract(this.position,this.previousPosition),t?s.default.toDeg(n.angle()):n.angle()}},{key:"getTextDirection",value:function(e){for(var t=this.getDrawnNeighbours(e),n=[],a=0;a<t.length;a++)n.push(this.getAngle(e[t[a]].position));var i=s.default.meanAngle(n),o=Math.PI/2;return i=r(r(i/o)*o),2===i?"down":-2===i?"up":0===i||-0===i?"right":3===i||-3===i?"left":"down"}},{key:"getNeighbours",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;if(null===e)return this.neighbours.slice();for(var t=[],n=0;n<this.neighbours.length;n++)this.neighbours[n]!==e&&t.push(this.neighbours[n]);return t}},{key:"getDrawnNeighbours",value:function(e){for(var t=[],n=0;n<this.neighbours.length;n++)e[this.neighbours[n]].value.isDrawn&&t.push(this.neighbours[n]);return t}},{key:"getNeighbourCount",value:function(){return this.neighbourCount}},{key:"getSpanningTreeNeighbours",value:function(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,t=[],n=0;n<this.spanningTreeChildren.length;n++)(void 0===e||e!=this.spanningTreeChildren[n])&&t.push(this.spanningTreeChildren[n]);return null!=this.parentVertexId&&(void 0===e||e!=this.parentVertexId)&&t.push(this.parentVertexId),t}},{key:"getNextInRing",value:function(e,t,n){for(var a=this.getNeighbours(),r=0;r<a.length;r++)if(g.default.contains(e[a[r]].value.rings,{value:t})&&a[r]!=n)return a[r];return null}}]),e}();n.default=v},{"./ArrayHelper":2,"./Atom":3,"./MathHelper":9,"./Vector2":14}]},{},[1]);

/**
* ChemSpace.js is an easy-to-use versatile tool for the 2D visualization
* of compound sets within a web page.
* Source code, tutorial, documentation, and example
* data are freely available from ChemSpace.js website <a
* href="http://openscreen.cz/software/ChemSpace"
* target=blank>http://openscreen.cz/software/ChemSpace</a>. At the
* website, you can also find a Python script <a
* href="http://openscreen.cz/software/chemspace/chemspacepy"
* target=blank>chemspace.py</a> which process and prepares <a href="http://openscreen.cz/software/ChemSpace/input_format"
* target=blank>input data for ChemSpace.js</a>.
*
* @author <a href="mailto:ctibor.skuta@img.cas.cz">Ctibor Škuta</a>
* @author <a href="mailto:petr.bartunek@img.cas.cz">Petr Bartůněk</a>
* @author <a href="mailto:svozild@vscht.cz">Daniel Svozil</a>
* @version 0.2.0
* @category 1
* @license ChemSpace.js http://openscreen.cz/software/ChemSpace Copyright 2015, Ctibor Škuta, Petr Bartůněk, Daniel Svozil Licensed under the MIT license.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* @requires <a href='https://code.jquery.com/jquery-3.3.1.min.js'>jQuery Core 3.3.1</a>
* @dependency <script language="JavaScript" type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
*
* @requires <a href='http://konvajs.github.io'>KonvaJS 1.7.6</a>
* @dependency <script language="JavaScript" type="text/javascript" src="https://cdn.rawgit.com/konvajs/konva/1.7.6/konva.min.js"></script>
*
* @param {Object} options An object with the options for the ChemSpace.js component.
*
* @option {string} target
*   identifier of the DIV tag where the component should be displayed
*/

var ChemSpace;
var _date = new Date();

(function($){
  ChemSpace = function(settings){
      var self = this;
      self.user_settings = settings;
      self.target_element = $("#" + settings.target);
      var target_width = self.target_element.width();

      /**
      * Default values for the settings
      * @name ChemSpace#settings
      */

      self.settings = {
          "target" : "YourOwnDivId", //the ID of the target element
          "height" : 800, // the height of visualization
          "width" : target_width, // the width of visualization (default is the width of target element)
          "font": "Helvetica", // font
          "label_color": "gray", // the background color of icons label
          "shapes": { // default color and radius of points, the width of stroke
            "order": ["circle", "triangle", "square", "hexagon", "rhombus"],
            "default": {
              "radius": 4,
              "strokeWidth": 1,
              "fill": "#C2C2C2",
              "stroke": null,
              "shadowForStrokeEnabled": false
            },
            "circle":{
              "transformsEnabled": "position",
            },
            "square":{
              "sides": 4,
              "rotation": 45,
              "transformsEnabled": "all",
            },
            "hexagon":{
              "sides": 6,
              "transformsEnabled": "position",
            },
            "triangle":{
              "sides": 3,
              "transformsEnabled": "position",
            },
            "rhombus":{
              "sides": 4,
              "transformsEnabled": "position",
            },
          },
          "path": { // default color and radius of points, the width of stroke
            "strokeWidth": 1,
            "stroke": 'gray',
          },
          "links": { // default color and radius of points, the width of stroke
            "draw": true,
            "attrs": {
                "strokeWidth": 1.5,
                "stroke": '#777777',
            }
          },
          "color": { // color scale settings
            "scale": "RdLrGr", // color scale
            "value_type": "percentile", // color by percentile/value
            "index": 2, // feature index/category
            "params": {"min": 5, "max": 95, "middle": 50}
          },
          "point_size": { // color scale settings
            "scale": {"min": 2, "middle": 4, "max": 6},
            "value_type": "percentile", // color by percentile/value
            "index": 3, // feature index/category
            "params": {"min": 5, "max": 95, "middle": 50}
          },
          "coordinates": { // coordinates, x, y feature indexes
            "x": 0,
            "y": 1,
          },
          "highlight_color": "black",
          "navigation_toggle": { // show/hide navigation elements
            "axis_labels": true,
            "axis": true,
            "diagonal": true,
            "export_button": true,
            "color_scale": true,
            "point_size": true
          },
          "align_to_grid": false, // align points/molecules to grid
          "compounds": { // compound settings
            compound_url: null, // url on server to fetch molecules (optional)
            format: "chemspace",
            draw: true, // whether to draw compounds
            limit: 50, // maximum limit of drawn compounds
            size: 200, // default size of molecules
            tooltip_compound_size: 200, // size of compound in the tooltip
            smilesDrawer: {
              bondThickness: 1,
              fontSizeLarge: 7,
              fontSizeSmall: 4,
            }
          },
          "categories": {"order": false},
          "resolution": 1,
          "colors": ["#d62728", "#2ca02c", "#1f77b4", "#ff7f0e", "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#c5b0d5", "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5"]
      };

      for(var i = 0, len=self.settings.shapes.order.length; i<len; i++){
        var key = self.settings.shapes.order[i];
        self.settings.shapes[key] = $.extend(self.settings.shapes[key], self.settings.shapes.default);
      }

      self.update_settings(settings);
      self.target_element.css({"position": "relative", "font-family": self.settings.font});

      /**
      * Default function definitions for the ChemSpace events
      * @name ChemSpace#events
      */
      self.events = {
          /**
          * @name ChemSpace#point_click
          * @event
          * @param {function} function() callback function for click on a single point event
          * @eventData {string} string point ID
          * @eventData {object} event event object

          * @example
          * instance.events.point_click = (
          *    function(point_id, evt) {
          *       alert(point_id);
          *    }
          * );
          *
          */
          "point_click": function(point_id, evt){
            return;
          },

          /**
          * @name ChemSpace#path_click
          * @event
          * @param {function} function() callback function for click on a path event
          * @eventData {object} object path object representation
          * @eventData {object} event event object

          * @example
          * instance.events.path_click = (
          *    function(path, evt) {
          *       alert(path);
          *    }
          * );
          *
          */
          "path_click": function(path, evt){
            return;
          },

          /**
          * @name ChemSpace#link_click
          * @event
          * @param {function} function() callback function for click on a link event
          * @eventData {object} object point ids linked by the link
          * @eventData {object} event event object

          * @example
          * instance.events.link_click = (
          *    function(point_ids, evt) {
          *       alert(point_ids);
          *    }
          * );
          *
          */
          "link_click": function(point_ids, evt){
            return;
          },

          /**
          * @name ChemSpace#points_selection
          * @event
          * @param {function} function() callback function for selection of points event
          * @eventData {array} array array of point IDs
          * @eventData {object} event event object

          * @example
          * instance.events.points_selection = (
          *    function(point_ids) {
          *       alert(point_ids);
          *    }
          * );
          *
          */
          "points_selection": function(point_ids){
            return;
          },

          /**
          * @name ChemSpace#category_legend_click
          * @event
          * @param {function} function() callback function for click on a category legend event
          * @eventData {object} object category object representation
          * @eventData {object} event event object

          * @example
          * instance.events.category_legend_click = (
          *    function(category_object, evt) {
          *       alert(category_object);
          *    }
          * );
          *
          */
          "category_legend_click": function(category_object, evt){
            return;
          },

          /**
          * @name ChemSpace#refresh
          * @event
          * @param {function} function() callback function for click on a refresh icon
          * @eventData {array} point ids
          * @eventData {object} event event object

          * @example
          * instance.events.refresh = (
          *    function(ids, evt) {
          *       alert(ids.length);
          *    }
          * );
          *
          */
          "refresh": function(category_object, evt){
            return;
          },

          /**
          * @name ChemSpace#point_tooltip
          * @event
          * @param {function} function() callback function for point tooltip customization
          * @eventData {object} event event object

          * @example
          * instance.events.point_tooltip = (
          *    function(evt) {
          *       alert(evt);
          *    }
          * );
          *
          */
          "point_tooltip": function(point_id, color, evt){
            return self._get_point_tooltip(evt);
          },

      }

      /**
      * Default color scales
      * @name ChemSpace#colors
      */
      self.colors = {
        "RdYlBu": {"start": {"r":215, "g": 25, "b": 28}, "end": {"r": 44, "g": 123, "b": 182}, "middle": {"r":255, "g": 255, "b": 178}},
        "RdYlGr": {"start": {"r":215, "g": 25, "b": 28}, "end": {"r": 26, "g": 150, "b": 65}, "middle": {"r":255, "g": 255, "b": 178}},
        "BuWhRd": {"start": {"r": 33, "g": 113, "b": 181}, "middle": {"r": 255, "g": 255, "b": 255}, "end": {"r":215, "g": 25, "b": 28}},
        "RdLrBu": {"start": {"r":215, "g": 25, "b": 28}, "middle": {"r":254, "g": 229, "b": 217}, "end": {"r": 44, "g": 123, "b": 182}},
        "RdLrGr": {"start": {"r":215, "g": 25, "b": 28}, "middle": {"r":254, "g": 229, "b": 217}, "end": {"r": 35, "g": 139, "b": 69}},
        "RdBkGr": {"start": {"r":215, "g": 25, "b": 28}, "middle": {"r": 0, "g": 0, "b": 0}, "end": {"r": 35, "g": 139, "b": 69}},
        "GrBkRd": {"start": {"r": 35, "g": 139, "b": 69}, "middle": {"r": 0, "g": 0, "b": 0}, "end": {"r":215, "g": 25, "b": 28}},
        "OrRd": {"start": {"r":254, "g": 240, "b": 217}, "end": {"r": 215, "g": 48, "b": 31}},
        "Purples2": {"start": {"r":242, "g": 240, "b": 247}, "end": {"r": 106, "g": 81, "b": 163}},
        "Blues": {"start": {"r":239, "g": 243, "b": 255}, "end": {"r": 33, "g": 113, "b": 181}},
        "Greens": {"start": {"r":237, "g": 248, "b": 233}, "end": {"r": 35, "g": 139, "b": 69}},
        "Oranges": {"start": {"r":254, "g": 237, "b": 222}, "end": {"r": 217, "g": 71, "b": 1}},
        "Reds": {"start": {"r":254, "g": 229, "b": 217}, "end": {"r": 203, "g": 24, "b": 29}},
        "Greys": {"start": {"r":247, "g": 247, "b": 247}, "end": {"r": 82, "g": 82, "b": 82}},
      };

      /**
      * Default konvajs objects references
      * @name ChemSpace#objects_ref
      */
      self.objects_ref = {
          "path": new Konva.Line({
            stroke: 'gray',
            strokeWidth: self.settings.path.strokeWidth,
            lineCap: 'round',
            lineJoin: 'round',
            opacity: 0.7,
            class: "path"
          }),

          "link": new Konva.Line({
            stroke: self.settings.links.attrs.stroke,
            strokeWidth: self.settings.links.attrs.strokeWidth,
            lineCap: 'round',
            lineJoin: 'round',
            opacity: 0.7,
            class: "link"
          }),

          "selection_rect": new Konva.Rect({
            width: 0,
            height: 0,
            fill: "#D2D2D2",
            opacity: 0.3,
            listening: false,
          }),

          "icon": new Konva.Path({
            fill: "grey",
            class: "icon",
            listening: false
          }),

          "icon_overlay": new Konva.Rect({
            width: 32,
            height: 32,
            opacity: 0,
            class: "icon",
          }),

          "legend_text": new Konva.Text({
            fontFamily: self.settings.font,
            fontSize: 14,
            fill: '#333333',
            lineHeight: 1.2,
          }),

          "legend_circle": new Konva.Circle({
            radius: 6,
            strokeWidth: 3
          }),

          "hover_overlay_rect": new Konva.Rect({
            listening: false,
            opacity: 0.8,
            fill: "white",
            width: self.settings.width,
            x: self.left_margin,
          }),
          "tooltip_label": new Konva.Label({
            opacity: 1,
            listening: false,
          }),

          "tooltip_tag": new Konva.Tag({
            fill: self.settings.label_color,
            pointerWidth: 10,
            pointerHeight: 10,
            lineJoin: 'round',
            listening: false,
          }),

          "tooltip_text": new Konva.Text({
            fontFamily: self.settings.font,
            fontSize: 12,
            padding: 8,
            fill: 'white',
            fontStyle: "bold",
            listening: false,
            align: "center",
            lineHeight: 1.2,
          }),

          "arrow": new Konva.Arrow({
            pointerLength: 10,
            pointerWidth : 7,
            fill: '#B2B2B2',
            stroke: '#B2B2B2',
            listening: false
          }),

          "diagonal": new Konva.Line({
            stroke: "#B2B2B2",
            strokeWidth: 2,
            lineCap: "round",
            dash: [10,5],
            listening: false
          }),

          "border_line": new Konva.Line({
            stroke: "#B2B2B2",
            strokeWidth: 1,
            lineCap: "round",
            dash: [4,2],
            listening: false
          }),

          "rect_gradient": new Konva.Rect({
            x: 0,
            y: 80,
            height: 30,
            fillLinearGradientStartPoint: {x: 0, y: 80},
            stroke: "#D2D2D2",
            strokeWidth: "1px"
          }),

          "percentile_line": new Konva.Line({
            stroke: "#393939",
            strokeWidth: 0.5,
            lineCap: "round"
          }),

          "navigation_text": new Konva.Text({
            fill: "#333333",
            fontStyle: "bold",
            fontFamily: self.settings.font,
          }),
      };

      self.objects_ref.shapes = {};
      
      for(var i = 0, len=self.settings.shapes.order.length; i<len; i++){
        var key = self.settings.shapes.order[i];
        var shape_settings = $.extend(self.settings.shapes[key], {class: "point"});

        if(key === 'circle'){
          self.objects_ref.shapes[key] = new Konva.Circle(shape_settings);
        }
        else{
          self.objects_ref.shapes[key] = new Konva.RegularPolygon(shape_settings);
        }
      }

      self.shape_fnc = function(shape, point_id, point_ids, x, y, radius, color){
          return self.objects_ref.shapes[shape].clone({
              x: x,
              y: y,
              point_ids: point_ids,
              fill: color,
              radius: radius,
              id: point_id
          });
      };

      self.mol_objects_ref = {
          "single_bond": new Konva.Line({
            stroke: "#393939",
            strokeWidth: 0.5,
            lineCap: "round"
          }),

          "atom_circle": new Konva.Circle(),

          "atom_background": new Konva.Rect({
            fill: "#ffffff",
            cornerRadius: 2
          }),

          "atom_symbol": new Konva.Text({
            fontFamily: self.settings.font,
            fontStyle: "bold"
          }),
      };

      self.symbol2color = {
        "N": "#2a76b8", //blue
        "S": "#ec7f35", //orange
        "O": "#cf282b", //red
        "F": "#0ed7e7", //turqoise
        "Cl": "#399757", //green
        "Br": "#399757", //green
        "Si": "#6d6966" //darkgray
      };

      self.paths_ref = {
            "zoom_icon": "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z",
            "unzoom_icon": "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z",
            "options_icon": "M4.082,4.083v2.999h22.835V4.083H4.082zM4.082,20.306h22.835v-2.999H4.082V20.306zM4.082,13.694h22.835v-2.999H4.082V13.694zM4.082,26.917h22.835v-2.999H4.082V26.917z",
            "refresh_icon": "M24.083,15.5c-0.009,4.739-3.844,8.574-8.583,8.583c-4.741-0.009-8.577-3.844-8.585-8.583c0.008-4.741,3.844-8.577,8.585-8.585c1.913,0,3.665,0.629,5.09,1.686l-1.782,1.783l8.429,2.256l-2.26-8.427l-1.89,1.89c-2.072-1.677-4.717-2.688-7.587-2.688C8.826,3.418,3.418,8.826,3.416,15.5C3.418,22.175,8.826,27.583,15.5,27.583S27.583,22.175,27.583,15.5H24.083z",
            "export_icon": "M24.25,10.25H20.5v-1.5h-9.375v1.5h-3.75c-1.104,0-2,0.896-2,2v10.375c0,1.104,0.896,2,2,2H24.25c1.104,0,2-0.896,2-2V12.25C26.25,11.146,25.354,10.25,24.25,10.25zM15.812,23.499c-3.342,0-6.06-2.719-6.06-6.061c0-3.342,2.718-6.062,6.06-6.062s6.062,2.72,6.062,6.062C21.874,20.78,19.153,23.499,15.812,23.499zM15.812,13.375c-2.244,0-4.062,1.819-4.062,4.062c0,2.244,1.819,4.062,4.062,4.062c2.244,0,4.062-1.818,4.062-4.062C19.875,15.194,18.057,13.375,15.812,13.375z",
      };

      self.shape_events = {
        "mouseover":{
          "point": function(evt){self._point_mouseover(evt);},
          "path": function(evt){self._path_mouseover(evt);},
          "link": function(evt){self._link_mouseover(evt);},
          "Rect": function(evt){return},
          "category_legend": function(evt){self._category_legend_mouseover(evt);},
          "icon": function(evt){self._icon_mouseover(evt);},
        },
        "mouseout":{
          "point": function(evt){self._point_mouseout(evt);},
          "path": function(evt){self._point_mouseout(evt);},
          "link": function(evt){self._link_mouseout(evt);},
          "category_legend": function(evt){self._category_legend_mouseout(evt);},
          "icon": function(evt){self._icon_mouseout(evt);},
          "Rect": function(evt){return},
        },
        "click":{
          "point": function(evt){self._point_click(evt);},
          "path": function(evt){self._path_click(evt);},
          "link": function(evt){self._link_click(evt);},
          "category_legend": function(evt){self._category_legend_click(evt);},
          "icon": function(evt){self._icon_click(evt);},
          "Rect": function(evt){return},
        }
      };

      /*self.shape_events.touchstart = self.shape_events.mouseover;
      self.shape_events.touchend = self.shape_events.mouseout;*/

      self.html_ref = {
        "tooltip": $("<div class='point_tooltip'>\
            <div class='compound_img'><canvas id='tooltip_compound_img'></canvas></div>\
            <div class='point_id'></div>\
            <div class='dimensions'></div>\
          </div>")
          .css({
            "border": "solid #D2D2D2 3px",
            "padding": 10,
            "background-color": "white",
            "word-break": "break-all",
            "max-width": self.settings.compounds.tooltip_compound_size+20
          }),

        "redraw_button": $('<div class="redraw_button">Redraw</div>')
          .css({
            "padding": 5,
            "color": "white",
            "border": "solid #D2D2D2 1px",
            "margin": "5px 0px",
            "background-color": "#2171b5",
            "font-weight": "bold",
            "text-align": "center",
          }),

          "menu": $("<div></div>")
            .css({"position": "absolute",
              "border": "solid #D2D2D2 2px",
              "padding": "4px 10px",
              "font-size": "small",
              "background-color": "white",
              "z-index": 1000,
              "color": "#333333"
            }),

          "menu_subtitle": $("<div></div>").css({"font-weight": "bold", "padding": "5px 0px"}),
      }
      self.target_element.append(self.html_ref.tooltip);

      if(self.settings.compounds.draw){
        self.img_cache = $("<canvas id='chemspace_img_cache'></canvas>").css({"position": "fixed", "top": -1000});
        $("body").append(self.img_cache);

        var sd_space = $.extend({}, self.settings.compounds.smilesDrawer);
        sd_space.width = self.settings.compounds.size;
        sd_space.height = self.settings.compounds.size;
        self.smilesDrawer = new SmilesDrawer.Drawer(sd_space);

        var sd_tooltip = $.extend({}, self.settings.compounds.smilesDrawer);
        sd_tooltip.width = self.settings.compounds.tooltip_compound_size;
        sd_tooltip.height = self.settings.compounds.tooltip_compound_size;
        self.tooltipSmilesDrawer = new SmilesDrawer.Drawer(sd_tooltip);
      
      //   self.compound_img_stage = new Konva.Stage({
      //     container: self.target_element.find(".compound_img")[0],
      //     width: self.settings.compounds.tooltip_compound_size+10,
      //     height: self.settings.compounds.tooltip_compound_size+10
      //   });
      //   self.compound_img_layer = new Konva.Layer({"listening": false});
      //   self.compound_img_stage.add(self.compound_img_layer);
      }

      self._prop2settings = {
        "color": $.extend(true, {}, self.settings.color),
        "point_size": $.extend(true, {}, self.settings.point_size),
        "coordinates": $.extend(true, {}, self.settings.coordinates),
      };

      self._prop2settings.color.scale = "init";
      self._prop2settings.point_size.scale = "init";
      self._prop2settings.coordinates.x = -1;

      self._prop2fnc = {
        "color": {
          "category": function(category){
            return category.color;
          },
          "feature": function(value){
            return self._get_color_for_value(
                value,
                self._prop2settings.color.values.min,
                self._prop2settings.color.values.max,
                self._prop2settings.color.values.middle,
                self.settings.color.scale);
          }
        },
        "point_size":{
          "category": function(category){
            return category.radius;
          },
          "feature": function(value){
            return self._get_point_size(value, self._prop2settings.point_size.values, self.settings.point_size.scale);
          }
        }
      };
  }

  /**
    * Update ChemSpace settings.
    *
    * @param {Object} [settings] Settings object in the same format as for the initialization.
    *
    */
  ChemSpace.prototype.update_settings = function(settings){
    var self = this;

    var to_extend = [["shapes", ["circle"]], ["point_size", ["params", "scale"]], ["coordinates"], ["navigation_toggle"], ["compounds"], ["color", ["params", "scale"]], ["links", ["attrs"]]];
      for(var i = 0, len=to_extend.length; i<len; i++){
        if(settings[to_extend[i][0]] !== undefined){
          if(to_extend[i].length > 1){
            for(var j = 0, len_j=to_extend[i][1].length; j<len_j; j++){
              if(settings[to_extend[i][0]][to_extend[i][1][j]] !== undefined){
                $.extend(self.settings[to_extend[i][0]][to_extend[i][1][j]], settings[to_extend[i][0]][to_extend[i][1][j]]);
                delete settings[to_extend[i][0]][to_extend[i][1][j]];
              }
            }
          }
          $.extend(self.settings[to_extend[i][0]], settings[to_extend[i][0]]);
          delete settings[to_extend[i][0]];
        }
      }

      $.extend(self.settings, settings);
  }

  ChemSpace.prototype._shapes_init = function(){
    var self = this;
  }

  /**
    * Read data from JSON variable.
    *
    * @param {object} [variable] Chemical space in proper JSON format.
    */
  ChemSpace.prototype.read_data = function(json){
      var self = this;
      self.data = json;

      self.header_height = 140;
      self.footer_height = 40;
      self.left_margin = 30;
      self.right_margin = 40;
      self.point_ids = Object.keys(self.data.points);
      self.points_len = self.point_ids.length;
      self._process_categories(self.data.categories);
      self.id2categories = self._get_id2categories();

      self._get_links_feature();

      if(self.settings.compounds.draw){
        if(self.data.compounds === undefined && self.settings.compounds.compound_url !== ""){
          self.data.compounds = {};
        }
        else if(self.data.compounds === undefined){
          self.settings.compounds.draw = false;
        }
      }

      var point = self.data.points[self.point_ids[0]];
      var dims = point.features.length;

      if(self.data.feature_names === undefined){
        self.data.feature_names = [];
        for(var i = 0; i<dims; i++){
          self.data.feature_names.push("Feature " + (i+1));
        }
      }

      self.objects_ref.hover_overlay_rect.setAttrs({y: self.header_height, height: self.settings.height - self.header_height});
  }

  /**
    * Read data from JSON file.
    *
    * @param {string} [filename] Path to the JSON data file.
    *
    */
  ChemSpace.prototype.read_data_from_file = function(json){
    var self = this;
      $.ajax({
          type: 'GET',
          url: json,
          dataType: 'json',
          success: function(json_file){
            self.read_data(json_file);
          },
          async: false
      });
  }

  ChemSpace.prototype._add_prefix_to_data = function(data){
    var self = this;
    var id, prefixed_data = {};

    for(var i = 0, keys = Object.keys(data), len = keys.length; i < len; i++){
        id = [self.settings.target, keys[i]].join("#");
        prefixed_data[id] = data[keys[i]];
    }
    return prefixed_data;
  }

  ChemSpace.prototype._draw_stage_layer = function(){
    var self = this;
      self.stage_layer = new Konva.Layer();
      self.stage_rect = new Konva.Rect({
                                  x: 0,
                                  y: 0,
                                  width: self.settings.width,
                                  height: self.settings.height,
                                  opacity: 0,
                              });
      self.stage_layer.add(self.stage_rect);
      self.stage_rect.moveToBottom();
      self.stage.add(self.stage_layer);

      self.stage_rect.on("click", function(evt){
        if(self.selection_rect){
          self.selection_rect.destroy();
          self.zoom_icon.destroy();
          self.selection_layer.draw();
        }
      });
  }

  ChemSpace.prototype._destroy_children = function(layers){
    var self = this;
    for(var i = 0, len=layers.length; i<len; i++){
      layers[i].destroyChildren();
    }
  }

   /**
    * Add feature.
    *
    * @param {Object} [category] Category defined by label and points in format {label: string, "color": string, "points": [point_id, point_id ...]}.
    *
    */
  ChemSpace.prototype.add_feature = function(feature){
    var self = this;
    if(self.data.feature_names.indexOf(feature.name) > -1){
      alert("Feature '" + feature.name + "' already exists.");
    }
    else{
      for(var i = 0, len = self.points_len; i < len; i++){
        var point_id = self.point_ids[i];
        if(feature.point2value[point_id] !== undefined){
          self.data.points[point_id].features.push(feature.point2value[point_id]);
        }
        else{
          self.data.points[point_id].features.push(null);
        }
      }
      self.data.feature_names.push(feature.name);

      var selects = self.target_element.find(".navigation select");
      var feature_index = self.data.feature_names.length-1;
      for(var i = 0, len=selects.length; i<len; i++){
        $(selects[i]).append("<option value='" + feature_index + "''>" + feature.name + "</option>");
      }
    }
  }

   /**
    * Remove feature.
    *
    * @param {String} [name] Name of the feature to be removed.
    *
    */
  ChemSpace.prototype.remove_feature = function(name){
    var self = this;
    var f_index = self.data.feature_names.indexOf(name);
    if(f_index > -1){
      self.data.feature_names.splice(f_index, 1);

      for(var i = 0, len = self.points_len; i < len; i++){
        var point_id = self.point_ids[i];
        self.data.points[point_id].features.splice(f_index, 1);
      }

      self.target_element.find(".navigation select option[value='" + f_index + "']").remove();
    }

  }

   /**
    * Add category.
    *
    * @param {Object} [category] Category defined by label and points in format {label: string, "color": string, "points": [point_id, point_id ...]}.
    *
    */
  ChemSpace.prototype.add_category = function(category){
    var self = this;
    if(self.data.categories === undefined){
      self.data.categories = [];
    }
    self.categories = [];
    self.category2layer = {};
    self.data.categories.push(category);
    self._process_categories(self.data.categories);
    self.id2categories = self._get_id2categories();
    self._sort_layers();
  }

  /**
    * Update category.
    *
    * @param {Object} [category] Category defined by label and points in format {label: string, "color": string, "points": [point_id, point_id ...]}.
    *
    */
  ChemSpace.prototype.update_category = function(category, action){
    var self = this;
    if(action === undefined){
      var action = "update";
    }
    var update = false;

    self._prop2settings.color.scale = "init";
    self._prop2settings.point_size.scale = "init";
    self._prop2settings.coordinates.x = -1;

    if(self.data.categories !== undefined){
      var len = self.data.categories.length;

      for(var i = 0; i<len; i++){
        var c = self.data.categories[i];

        if(c.label === category.label){
          if(action === "update"){
            self.data.categories[i] = category;
          }
          else if(action === "remove"){
            self.data.categories.splice(i, 1);
          }
          update = true;
          break;
        }
      }

      if(update){

        self.categories = [];
        self.category2layer = {};
        self._process_categories(self.data.categories);
        self.id2categories = self._get_id2categories();
        self._sort_layers();
      }
      else{
        self.add_category(category);
      }
    }
    else{
      self.add_category(category);
    }
  }

  /**
    * Remove category.
    *
    * @param {String} [label] Remove category by label.
    *
    */
  ChemSpace.prototype.remove_category = function(label){
    var self = this;
    self.update_category({label: label}, "remove");
  }

   /**
    * Add path.
    *
    * @param {Object} [path] Path defined by points in format {label: string, "color": string, "points": [point_id, point_id ...]}.
    *
    */
  ChemSpace.prototype.add_path = function(path){
    var self = this;
    if(self.data.paths === undefined){
      self.data.paths = [];
    }
    self.data.paths.push(path);
    if(self.path_layer != undefined){
      self.path_layer.destroyChildren();
    }
    else{
      self.path_layer = new Konva.Layer();
      self.stage.add(self.path_layer);
    }
    self._draw_paths();
    self._sort_layers();
  }

  /**
    * Unhighlight points.
    * Unhighlights all highlighted points.
    *
    * @example
    * instance.unhighlight_points();
    */

  ChemSpace.prototype.unhighlight_points = function(){
    var self = this;
    self.highlight_layer.destroyChildren();
    self.highlight_layer.draw();
  }

  /**
    * Highlight points.
    * When the empty array is passed it unhighlights all highlighted points.
    *
    * @param {object} [point_ids] The array of point (object) IDs.
    *
    * @example
    * instance.highlight_rows(["id1", "id2"]);
    */

  ChemSpace.prototype.highlight_points = function(point_ids, color){
    var self = this;
    var len = point_ids.length;
    if(color !== undefined){
      self.settings.highlight_color = color;
    }

    if(self.highlight_layer === undefined){
      self.highlight_layer = new Konva.Layer();
      self.stage.add(self.highlight_layer);
    }
    else{
      self.highlight_layer.destroyChildren();
    }

    self.highlighted_points = point_ids;

    if(len > 0){
      for(var i = 0; i<len; i++){
        self.highlight_layer.add(self.stage.find("#"+self.point2id[self.highlighted_points[i]])[0].clone({"listening": false, "fill": self.settings.highlight_color}));
      }
      self.highlight_layer.draw();
    }
    else{
      self.unhighlight_points();
    }

  }

  /**
    * Redraw Chemspace.
    */
  ChemSpace.prototype.redraw = function(){
    var self = this;
    self.stage.destroy();
    self.stage = undefined;
    self.draw();
  }

  ChemSpace.prototype.redraw_points = function(point_ids){
    var self = this;

    if(self.path_layer !== undefined){
      self.path_layer.destroyChildren();
    }
    self._draw_points(point_ids);

    if(self.data.paths !== undefined){
      self._draw_paths();
    }
    self._sort_layers();
  }

  ChemSpace.prototype._prepare_canvas = function(){
    var self = this;
    self.current_selection = [];

    self.stage = new Konva.Stage({
        container: self.settings.target,
    });

    self.stage.setWidth(self.settings.width);
    self.stage.setHeight(self.settings.height);

    self._draw_stage_layer();
  }

  ChemSpace.prototype.draw = function(){
    var self = this;
    if(self.stage === undefined){
      self._prepare_canvas();
    }

    self.highlighted_points = [];
    self.fixed_compounds = [];
    self.selection_overlay_rect = new Konva.Rect({fill: "white", opacity: 0.9, x:self.left_margin, y: self.header_height, width: self.settings.width-self.right_margin-self.left_margin, height: self.settings.height-self.header_height-self.footer_height});
    self.current_selection = {
      "x": [self.left_margin, self.settings.width-self.right_margin-self.left_margin],
      "y": [self.header_height, self.settings.height-self.header_height-self.footer_height]
    }

    self.main_layer = new Konva.Layer();
    self.main_layer.add(self.selection_overlay_rect);
    self.link_layer = new Konva.Layer();
    self._draw_points();
    self._draw_menu();
    self._draw_legend();
    self.point2img = {};

    if(self.settings.compounds.draw && (self.data.compounds > 0 || self.settings.compounds.compound_url !== null)){
      self._draw_compounds();
    }

    self.hover_layer = new Konva.Layer({"listening": false});
    self.stage.add(self.link_layer, self.main_layer, self.hover_layer);

    if(self.data.paths !== undefined){
      self.path_layer = new Konva.Layer();
      self._draw_paths();
      self.stage.add(self.path_layer);
    }


    self._bind_hover_events_on_stage();

    self.selection_rect = false;
    self.down = false;

    self.selection_layer = new Konva.Layer();
    self.stage.add(self.selection_layer);
    self.selection_layer.moveToBottom();
    self.selection_background_rect = self.selection_overlay_rect.clone({opacity:0, listening: false});
    self.selection_layer.add(self.selection_background_rect);

    self.stage_layer.moveToBottom();
    self.stage.draw();
    self._sort_layers();

    self.main_layer.on("mousedown", function(evt) {
      self.selection_background_rect.listening(true);
      self.selection_layer.draw();

      if(self.selection_rect){
        self.selection_rect.destroy();
        self.selection_rect = false;
        self.zoom_icon.destroy();
      }

      self.down = true;
      self.selection_layer.moveToTop();
      self.selection_rect = self.objects_ref.selection_rect.clone({x: evt.evt.offsetX, y: evt.evt.offsetY});
      self.selection_layer.add(self.selection_rect);

      self.stage.off("mouseover");
      self.stage.off("mouseout");
      self.stage.off("click");

      $(document).one("mouseup", function(){
          self.selection_layer.fire("mouseup");
      });
    });

    self.selection_layer.on("mousemove", function(evt) {
        if (!self.down) return;
        var evt = evt.evt;
        var rect = self.selection_rect.attrs;
        var width = evt.layerX - rect.x;
        var height = evt.layerY - rect.y;

        if(width*height !== 0){
          self.stage_layer.off("click");
        }

        self.selection_rect.width(width);
        self.selection_rect.height(height);
        self.selection_layer.draw();
    });

    self.selection_layer.on("mouseup", function(evt) {
        if(!self.down){
          return;
        }

        self.selection_background_rect.listening(false);
        self.selection_layer.draw();
        self.down = false;

        var rect = self.selection_rect.attrs;
        if(rect === undefined){
          return;
        }

        self.selection_range = {x:[rect.x, rect.x+rect.width], y:[rect.y, rect.y+rect.height]};
        self.selection_range.x.sort(self._sort_number_ascending);
        self.selection_range.y.sort(self._sort_number_ascending);
        self.current_selection = self.get_points_by_range(self.selection_range);
        self._bind_hover_events_on_stage();

        if(rect.width === 0||self.current_selection.length === 0){
          self.selection_rect.destroy();
          self.selection_rect = false;
          self.selection_layer.draw();
          return;
        }

        var rect_width = self.selection_rect.width();
        rect_width = (rect_width > 0)?rect_width:0;
        var rect_height = self.selection_rect.height();
        rect_height = (rect_height < 0)?rect_height:0;
        var x = self.selection_rect.getAttr("x") + rect_width + 5;
        var y = self.selection_rect.getAttr("y") + rect_height + 5;

        self.zoom_icon = self._get_icon_group("zoom_icon", "Zoom in", x, y);
        self.zoom_icon.children[1].setAttrs({"fill": "white", "opacity": 0.7});
        self.zoom_icon.children[1].moveToBottom();
        self.selection_layer.add(self.zoom_icon);
        self.selection_layer.draw();

        self.events.points_selection(self.current_selection);

    });
  }

  ChemSpace.prototype._bind_hover_events_on_stage = function(){
    var self = this;

    self.stage.on("click", function(evt){
      if(evt.target.attrs.class !== undefined){
        self.shape_events[evt.type][evt.target.attrs.class](evt);
      }
    });

    self.stage.on("mouseover", function(evt){
      if(evt.target.attrs.class !== undefined){
        self.shape_events[evt.type][evt.target.attrs.class](evt);
      }
    });

    self.stage.on("mouseout", function(evt){
      if(evt.target.attrs.class !== undefined){
        self.shape_events[evt.type][evt.target.attrs.class](evt);
      }
    });
  }

  ChemSpace.prototype._draw_points = function(point_ids){
    console.time("DRAW POINTS");
    var self = this;
    var keys, key, category, point, color, radius, point_ids,
      point_id, category_id, color_value, radius_value, categories,
      x_keys, x_key, y_keys, y_key, obj, category2data, point_count;

    var point_count_index = self.data.feature_names.indexOf("Point count");
    if(point_count_index === -1){
      self.data.feature_names.push("Point count");
      point_count_index = self.data.feature_names.length-1;
    }

    var prop2cache = {
      coordinates: self._calculate_coordinates(point_ids),
      color: self._get_prop_settings("color"),
      point_size: self._get_prop_settings("point_size")
    };

    if(!prop2cache.coordinates || !prop2cache.point_size || !prop2cache.color){
      self._destroy_children(Object.values(self.category2layer));
      self._id2object = {};
      self.category2count = {};
      self.point2id = {};
      self.id2points = {};

      for(var i = 0, len=self.categories.length; i<len; i++){
        self.category2count[i] = 0;
      }

      x_keys = self._shuffle(Object.keys(self.point_index));
      var gen_id = 0;

      for(var i = 0, x_len=x_keys.length; i < x_len; i++){
        x_key = x_keys[i];
        y_keys = Object.keys(self.point_index[x_key]);

        for(var j = 0, y_len=y_keys.length; j < y_len; j++){
          y_key = y_keys[j];
          point_ids = self.point_index[x_key][y_key];
          point_count = point_ids.length;
          category2data = {};
          categories = [];

          for(var p = 0, p_len=point_count; p<p_len; p++){
            point_id = point_ids[p];
            self.data.points[point_id].features[point_count_index] = point_count;


            for(var c = 0, c_len=self.id2categories[point_id].length; c<c_len; c++){
              category_id = self.id2categories[point_id][c];

              if(category2data[category_id] === undefined){
                categories.push(category_id);
                category2data[category_id] = {
                  "color": ((self.settings.color.index != "category")?[]:category_id),
                  "radius": ((self.settings.point_size.index != "category")?[]:category_id),
                  "points": [],
                  "id": gen_id,
                }
                gen_id++;
              }

              category2data[category_id].points.push(point_id);
              self.point2id[point_id] = category2data[category_id].id;


              if(self.settings.color.index != "category"){
                category2data[category_id].color.push(self.data.points[point_id].features[self.settings.color.index]);
              }

              if(self.settings.point_size.index != "category"){
                category2data[category_id].radius.push(self.data.points[point_id].features[self.settings.point_size.index]);
              }
            }
          }

          for(var c = 0, c_len=categories.length; c<c_len; c++){
            var cid = categories[c];
            if(self.settings.color.index != "category"){
              color = self._prop2fnc.color.feature(self._get_average(category2data[cid].color));
            }
            else{
              color = self._prop2settings.color.v2v[cid];
            }

            if(self.settings.point_size.index != "category"){
              radius = self._prop2fnc.point_size.feature(self._get_average(category2data[cid].radius));
            }
            else{
              radius = self._prop2settings.point_size.v2v[cid];
            }
            var shape = (self.categories[cid].shape !== undefined)?self.categories[cid].shape:"circle";

            self.id2points[category2data[cid].id] = category2data[cid].points;
            point = self.shape_fnc(shape, category2data[cid].id, category2data[cid].points, x_key, y_key, radius, color);
            self._id2object[category2data[cid].id] = point;
            self.category2count[cid] = self.category2count[cid] + category2data[cid].points.length;
            self.category2layer[cid].add(point);
          }


            // for(var c = 0, c_len=self.id2categories[point_id].length; c<c_len; c++){
            //   category_id = self.id2categories[point_id][c];
            //   category = self.categories[category_id];
            //   color_value = (self.settings.color.index != "category")?self.data.points[point_id].features[self.settings.color.index]:category_id;
            //   color = self._prop2settings.color.v2v[color_value];
            //   radius_value = (self.settings.point_size.index != "category")?self.data.points[point_id].features[self.settings.point_size.index]:category_id;
            //   radius = self._prop2settings.point_size.v2v[radius_value];

            //   point = self.shape2fnc.circle(point_id, x_key, y_key, radius, color);
            //   self._id2object[[point_id, category_id].join("_")] = point;
            //   self.category2count[category_id]++;
            //   self.category2layer[category_id].add(point);
            //   counter++;
            // }
          // }
        }
      }

      for(var i = 0, len=self.categories.length; i<len; i++){
        self.stage.add(self.category2layer[i]);
      };

      self._destroy_children([self.link_layer]);
      self._draw_links();

    }
    // else{
    //   if(!prop2cache.color){
    //     keys = Object.keys(self._id2object);
    //     for(var i = 0, len=keys.length; i<len; i++){
    //       key = keys[i];
    //       obj = self._id2object[key];
    //       category_id = parseInt(key.split("_")[1]);
    //       color_value = (self.settings.color.index != "category")?self.data.points[obj.attrs.id].features[self.settings.color.index]:category_id;
    //       obj.fill(self._prop2settings.color.v2v[color_value]);
    //       obj.draw();
    //     }
    //   }
    // }

    if(!prop2cache.coordinates){
      /*self._destroy_children([self.link_layer]);
      self._draw_links();*/
    }

    self.highlight_points(self.highlighted_points);

    console.timeEnd("DRAW POINTS");
  }

  ChemSpace.prototype._draw_links = function(point_ids){
    var self = this;

    if(!self.settings.links.draw){
      return;
    }

    var link, links, coords, p1, p2;
    console.time("LINKS");

    if(point_ids === undefined){
      var point_ids = Object.keys(self.point2coord);
    }

    for(var i = 0, len = point_ids.length; i < len; i++){
      p1 = point_ids[i];
      links = self.data.points[p1].links;

      if(links !== undefined && links.length > 0){

        for(var l = 0, len_links = links.length; l<len_links; l++){
          p2 = links[l];
          coords = self.point2coord[p1];

          if(self.point2coord[p2] !== undefined){
            coords = coords.concat(self.point2coord[p2]);
            link = self.objects_ref.link.clone({"points": coords, "point_ids": [self.point2id[p1], self.point2id[p2]]});
            self.link_layer.add(link);
          }
        }
      }
    }

    self.link_layer.draw();
    console.timeEnd("LINKS");
  }

  ChemSpace.prototype._get_links_feature = function(){
    var self = this;
    console.time("LINK COUNT");
    var p1, p2, links, link, link_list;
    var point2count = {};
    var done = {};

    for(var i = 0, len = self.points_len; i < len; i++){
      p1 = self.point_ids[i];

      if(point2count[p1] === undefined){
        point2count[p1] = 0;
      }

      links = self.data.points[p1].links;

      if(links !== undefined && links.length > 0){

        for(var l = 0, len_links = links.length; l<len_links; l++){
          p2 = links[l];

          if(point2count[p2] === undefined){
            point2count[p2] = 0;
          }

          link = [p1,p2].sort().join("_");

          if(done[link] === undefined){
            done[link] = true;
            point2count[p1]++;
            point2count[p2]++;
          }
        }
      }
    }

    self.link_count = Object.keys(done).length;

    if(self.link_count > 0){
      for(var i = 0, len = self.points_len; i < len; i++){
        p1 = self.point_ids[i];
        self.data.points[p1].features.push(point2count[p1]);
      }
      self.data.feature_names.push("Link count");
    }
    console.timeEnd("LINK COUNT");
  }

  ChemSpace.prototype._get_point_size = function(value, min_max_middle, scale){
    var self = this, radius;

    if(value <= min_max_middle.min || value === null || value === undefined){
      return self.settings.point_size.scale.min;
    }

    if(value >= min_max_middle.max){
      return self.settings.point_size.scale.max;
    }
    if(value > min_max_middle.min && value <= min_max_middle.middle){
      radius = self._hack_round(scale.min + (value-min_max_middle.min)/(min_max_middle.middle-min_max_middle.min)*(scale.middle-scale.min));
    }
    else{
      radius = self._hack_round(scale.middle + (value-min_max_middle.middle)/(min_max_middle.max-min_max_middle.middle)*(scale.max-scale.middle));
    }
    return radius;

  }

  ChemSpace.prototype._draw_point_size_menu = function(){
      var self = this;
      if(!self.settings.navigation_toggle.point_size){
        return;
      }
      var settings = self.settings.point_size;
      var font_size = 12;
      var margin = 35;

      if(Number.isInteger(settings.index) && settings.index !== "category"){
        self.point_size_group = new Konva.Group();
        var value = self.objects_ref.navigation_text.clone({"listening": false, "fontSize": font_size, "y": self.header_height-15, x: self.left_margin, "fontStyle": "normal"});
        var y = self.header_height - margin;
        var x = self.settings.width - self.right_margin;
        var order = ["max", "middle","min"];
        var max_radius = settings.scale.max;
        var space = 10;

        for(var i=0, len=order.length; i<len; i++){
          var point = new Konva.Circle({
            "radius": settings.scale[order[i]],
            "y": y,
            "fill": "#D2D2D2",
            "stroke": "#333333",
            "strokeWidth": 1,
            "listening": false
          });

          var text_value = (settings.params[order[i]] === undefined||settings.value_type === "percentile")?self._prop2settings.point_size.values[order[i]]:settings.params[order[i]];
          if(!Number.isInteger(text_value)){
            text_value = self._hack_round_float(text_value, 3);
          }
          var value = value.clone({text: String(text_value), y:y-max_radius-font_size-3});
          var tw = value.width();
          var pw = point.width();
          var width = (tw > pw)?tw:pw;
          point.setAttr("x", x-width/2);
          value.setAttr("x", x-width/2-tw/2);
          self.point_size_group.add(point, value);
          x = x - width - space;
        }
        var point_size_desc = value.clone({
          text: self.data.feature_names[self.settings.point_size.index],
          y: self.header_height - 15,
        });
        point_size_desc.setAttr("x", self.settings.width - self.right_margin - point_size_desc.width())

        x = x + space;
        var background_rect = new Konva.Rect({
          "width": self.settings.width - self.right_margin - x,
          "height": max_radius+font_size+margin,
          "opacity": 0,
          "x": x,
          "y": y-max_radius-font_size - 3,
          "class": "icon",
          "label": "Point radius",
          "icon_name": "point_radius_icon"
        });
        self.point_size_group.add(background_rect, point_size_desc);
        self.navigation_layer.add(self.point_size_group);
      }
  }

  ChemSpace.prototype._point_radius_click = function(icon, evt){
    var self = this;
    var i, option, key, value;
    var order = ["min", "middle", "max"];
    var form = self.target_element.find(".point_radius_form");
    var overlay = self._draw_target_overlay();
    var settings = self.settings.point_size;

    if(form.length){
      form.fadeIn();
    }
    else{
      var form = self.html_ref.menu.clone().addClass("point_radius_form")
        .css({"top": self.header_height - 50, "right": self.right_margin + 100, "width": 160});
      self.target_element.append(form);

      overlay.click(function(){
        form.fadeOut();
        overlay.fadeOut();
      });

      form.append(self.html_ref.menu_subtitle.clone().text("Radius scale:"));
      var scale_div = self._min_max_middle_inputs(settings.scale, "scale").addClass("scale");
      form.append(scale_div);

      var value_type = $("<div></div>").css({"margin-bottom": 5});
      value_type.append(self.html_ref.menu_subtitle.clone().text("Radius by:"));

      var value_type_select = $("<select name='value_type'>\
        <option value='percentile' " + ((settings.value_type == "percentile")?"selected":"") + ">Percentiles</option>\
        <option value='value' " + ((settings.value_type == "value")?"selected":"") + ">Values</option>\
        </select>").css({"padding": 3, "background-color": "white"});
      value_type.append(value_type_select);
      form.append(value_type);

      var values_div = self._min_max_middle_inputs((settings.value_type == "percentile")?settings.params:self._prop2settings.point_size.values, "params")
        .addClass("values");
      form.append(values_div);

      var redraw_button = self.html_ref.redraw_button.clone();
      form.append(redraw_button);

      self._css_hover(redraw_button);

      form.delegate(".redraw_button", "click", function(evt){
        var settings = {};
        var settings_fieldset = $(this).parents(".point_radius_form").find("input, select");

        settings_fieldset.each(function(){
            option = $(this);
            key = option.attr("name");
            value = option.val();
            datatype = option.attr("data-type");

            if(key == 'value_type'){
              self.settings.point_size[key] = value;
            }
            else if(value != ""){
              self.settings.point_size[datatype][key] = parseFloat(value);
            }
        });

        if(self.settings.point_size.value_type == "percentile"){
          self._percentile_alert(self.settings.point_size.params);
        }

        self.redraw_points();
        self._update_point_radius_scale();
        self.navigation_layer.draw();
        overlay.trigger('click');
      })
    }
  }

  ChemSpace.prototype._update_point_radius_scale = function(){
    var self = this;
    if(self.point_size_group !== undefined){
      self.point_size_group.destroy();
    }
    self._draw_point_size_menu();
  }

  ChemSpace.prototype._draw_color_scale = function(){
      var self = this;
      if(!self.settings.navigation_toggle.color_scale){
        return;
      }
      var settings = self.settings.color.params;

      if(Number.isInteger(self.settings.color.index) && self.settings.color.index !== "category"){
        self.color_scale_group = new Konva.Group();

        var y = self.header_height - 55;

        var value = self.objects_ref.navigation_text.clone({"fontSize": 12, "y": self.header_height-15, x: self.left_margin, "fontStyle": "normal"});
        var color_desc = value.clone({text: self.data.feature_names[self.settings.color.index]});
        self.color_scale_group.add(color_desc);

        var min_value = (settings.min === undefined||self.settings.color.value_type === "percentile")?self._prop2settings.color.values["min"]:settings.min;
        var max_value = (settings.max === undefined||self.settings.color.value_type === "percentile")?self._prop2settings.color.values["max"]:settings.max;
        var middle_value = (settings.middle === undefined||self.settings.color.value_type === "percentile")?self._prop2settings.color.values["middle"]:settings.middle;

        if(!Number.isInteger(min_value)){
          min_value = self._hack_round_float(min_value, 3);
          max_value = self._hack_round_float(max_value, 3);
          middle_value = self._hack_round_float(middle_value, 3);
        }
        value = value.clone({"fontSize": 12});
        var min = value.clone({text: String(min_value), y:y - 15});
        var max = value.clone({text: String(max_value), y:y - 15});
        var middle = value.clone({text: String(middle_value), y:y - 15});
        var color_scale_width = (min.width() + max.width() + middle.width() < 180)?180: min.width() + max.width() + middle.width() + 20;

        max.setAttr("x", self.left_margin + color_scale_width - max.width());

        middle.setAttr("x", self.left_margin + color_scale_width/2 - middle.width()/2);
        self.color_scale_group.add(min, max, middle);

        var steps = [0, 0.5, 1];
        var color_steps = [steps[0], self._get_color_for_value(0, 0, 1, 0.5, self.settings.color.scale), steps[1], self._get_color_for_value(0.5, 0, 1, 0.5, self.settings.color.scale), steps[2], self._get_color_for_value(1, 0, 1, 0.5, self.settings.color.scale)];

        self.color_scale = self.objects_ref.rect_gradient.clone({
          "x": self.left_margin,
          "y": y,
          "width": color_scale_width,
          "fillLinearGradientColorStops": color_steps,
          "fillLinearGradientEndPoint": {x: color_scale_width, y: 80},
          "id": self.settings.target + "_color_scale",
        });

        var  background_rect = new Konva.Rect({
          "x": self.left_margin,
          "y": y-15,
          "width": color_scale_width,
          "height": 70,
          "opacity": 0,
          "label": "Color settings",
          "class": "icon",
          "icon_name": "color_scale_icon"
        });

        self.color_scale_group.add(self.color_scale, background_rect);
        self.navigation_layer.add(self.color_scale_group);
      }
  }

  ChemSpace.prototype._color_scale_click = function(icon, evt){
    var self = this;
    var target_id = self.settings.target;
    var i, option, key, value;
    var value_options = [["min", "Min"], ["middle", "Middle"], ["max", "Max"]];
    var color_scale_form = self.target_element.find(".color_scale_form");
    var overlay = self._draw_target_overlay();

    if(color_scale_form.length){
      color_scale_form.fadeIn();
    }
    else{
      color_scale_form = self.html_ref.menu.clone().addClass("color_scale_form")
        .css({"top": self.header_height - 50,
              "left": self.left_margin + self.color_scale.width() + 10,
              "width": 160,
        });

      var color_1 = self._get_color_for_value(0,0,1,0.5,self.settings.color.scale);
      var color_2 = self._get_color_for_value(0.5,0,1,0.5,self.settings.color.scale);
      var color_3 = self._get_color_for_value(1,0,1,0.5,self.settings.color.scale);

      var color_scale_div = $("<div></div>").css({"padding-bottom": 8, "border-bottom": "solid gray 1px"});
      color_scale_div.append($("<input type='text' class='color_scale' name='color_scale' value='"+ self.settings.color.scale + "'/>").css({"width": 80, "margin-right": 5}));
      color_scale_div.append($("<div class='color_button' style='background: linear-gradient(to right, " + color_1 + "," + color_2 + "," + color_3 + ")'></div>"));
      color_scale_form.append(self.html_ref.menu_subtitle.clone().text("Color scale:"), color_scale_div);

      var value_type = $("<div></div>");
      value_type.append(self.html_ref.menu_subtitle.clone().text("Color by:"));
      var value_type_select = $("<select name='value_type'>\
        <option value='percentile' " + ((self.settings.color.value_type == "percentile")?"selected":"") + ">Percentiles</option>\
        <option value='value' " + ((self.settings.color.value_type == "value")?"selected":"") + ">Values</option>\
        </select>").css({"padding": 3, "background-color": "white"});
      value_type.append(value_type_select);
      color_scale_form.append(value_type);

      if(self.settings.color.value_type == "percentile" && self.settings.color.params["max"] === undefined){
        self.settings.color.params = {"max": 100, "min": 0, "middle": 50};
      }

      var color_options = self._min_max_middle_inputs((self.settings.color.value_type == "percentile")?self.settings.color.params:self._prop2settings.color.values)
        .addClass("color_settings");
      color_scale_form.append(color_options);

      var redraw_button = self.html_ref.redraw_button.clone();
      color_scale_form.append(redraw_button);
      self._css_hover(redraw_button);
      self.target_element.append(color_scale_form);

      self.target_element.find(".color_scale_form .color_button").css({"border": "solid #D2D2D2 1px", "height": "15px", "width": "30px", "display": "inline-block"});

      overlay.click(function(){
        color_scale_form.fadeOut();
        overlay.fadeOut();
      });

      var color_buttons = color_scale_form.find(".color_button");
      self._css_hover(color_buttons);

      color_buttons.click(function(evt){
        self._draw_color_scales_select(this, evt);
      });

      color_scale_form.delegate(".redraw_button", "click", function(evt){
        var settings = {};
        var settings_fieldset = $(this).parents(".color_scale_form").find("input, select");

        settings_fieldset.each(function(){
            option = $(this);
            key = option.attr("name");
            value = option.val();

            if(value != ""){
              if(key == 'value_type'){
                self.settings.color[key] = value;
              }
              else{
                self.settings.color.params[key] = parseFloat(value);
              }
            }
        });

        if(self.settings.color.value_type == "percentile"){
          self._percentile_alert(self.settings.color.params);
        }

        self.redraw_points();
        self._update_color_scale();
        self.navigation_layer.draw();
        overlay.trigger('click');
      })
    }
  }

  ChemSpace.prototype._update_color_scale = function(){
    var self = this;
    if(self.color_scale_group !== undefined){
      self.color_scale_group.destroy();
    }
    if(self.legends_group !== undefined){
      self.legends_group.destroy();
    }
    self._draw_color_scale();
    self._draw_legend();
  }

  ChemSpace.prototype._draw_color_scales_select = function(element, evt){
    var self = this;
    var scales_div = self.target_element.find(".color_scales");
    var scale_divs;

    if(scales_div.length){
      scales_div.fadeIn();
      scale_divs = scales_div.find(".color_scale");
    }
    else{
      scales_div = $("<div class='color_scales'></div>");
      var scale, color_1, color_2, color_3, key;

      for(var i = 0, keys = Object.keys(self.colors), len = keys.length; i < len; i++){
        key = keys[i];
        color_1 = self._get_color_for_value(0,0,1,0.5,key);
        color_2 = self._get_color_for_value(0.5,0,1,0.5,key);
        color_3 = self._get_color_for_value(1,0,1,0.5,key);
        scale = "<div class='color_scale' data-scale_acronym='" + key + "' style='background: linear-gradient(to right, " + color_1 + "," + color_2 + "," + color_3 + ")'></div>";
        scales_div.append(scale);
      }

      self.target_element.append(scales_div);
      scales_div.css({"border": "solid #D2D2D2 2px",
                     "padding": "5px",
                     "position": "absolute",
                     "top": self.header_height - 50,
                     "left": self.color_scale.width() + self.target_element.find(".color_scale_form").width() + 70,
                     "background-color": "white"});

      var color_scale_input = self.target_element.find(".color_scale");
      color_scale_input.css({"margin-top": 3,
                      "width": 80,
                      "padding": 2,
                      "height": 20,
                      "border": "solid #D2D2D2 1px",});

      self._css_hover(color_scale_input);
      self.target_element.find(".target_overlay").click(function(){
        scales_div.fadeOut();
      });
    }

    color_scale_input.on("click", function(){
      var color = $(this).attr("data-scale_acronym");
      var input = $(element).prev("input:first").val(color);
      self.settings.color.scale = color;
      $(element).css({"background": "linear-gradient(to right, " + self._get_color_for_value(0,0,1,0.5,color) + "," + self._get_color_for_value(0.5,0,1,0.5,color) + "," + self._get_color_for_value(1,0,1,0.5,color) + ")"})
      scales_div.fadeOut();
      color_scale_input.off("click");
    });

  };

  ChemSpace.prototype._color_scale_mouseover = function(color_scale, layer){
    var self = this;
      var label = color_scale.getAttr("label");
      var x = color_scale.getAttr("x");
      var y = color_scale.getAttr("y");

      self.icon_tooltip = self.objects_ref.tooltip_label.clone({x: x,
          y: y + 25
      });

      self.icon_tooltip.add(self.objects_ref.tooltip_tag.clone());
      self.icon_tooltip.add(self.objects_ref.tooltip_text.clone({text: label}));

      layer.add(self.icon_tooltip);
      self.icon_tooltip.moveToTop();
      color_scale.setOpacity(0.7);
      layer.draw();
  }

  ChemSpace.prototype._color_scale_mouseout = function(color_scale, layer){
    var self = this;
      self.icon_tooltip.destroy();
      color_scale.setOpacity(1);
      layer.draw();
  }

  ChemSpace.prototype._draw_menu = function(){
    var self = this;
    self.navigation_layer = new Konva.Layer();
    var navigation_selects = [
      {"name": "x", "label":"X axis"},
      {"name": "y", "label": "Y axis"},
      {"name": "color", "label": "Color"},
      {"name": "point_size", "label": "Point size"}
    ];

    var x = self.left_margin;
    var y = 20;

    if(self.settings.navigation_toggle.color_scale){
      self._draw_color_scale();
    }

    if(self.settings.navigation_toggle.point_size){
      self._draw_point_size_menu();
    }

    var options_icon = self._get_icon_group("options_icon", "Options", x, y);
    self.navigation_layer.add(options_icon);

    x = x+40;

    if(self.settings.navigation_toggle.export_button){
      var export_icon = self._get_icon_group("export_icon", "Export\nin png format", x, y);
      self.navigation_layer.add(export_icon);
      x = x + 40;
    }

    self.refresh_icon = self._get_icon_group("refresh_icon", "Refresh", x, y);
    self.navigation_layer.add(self.refresh_icon);
    self.refresh_icon.hide();

    if(self.target_element.find(".navigation").length == 0){

      var main_element = self.html_ref.menu.clone().addClass("navigation")
        .css({"top": 10, "left": 60, "display": "none"});

      var menu = $("<div></div>")
      main_element.append(menu);
      self.target_element.append(main_element);

      // var checkbox = $("<div><input type='checkbox'" + ((self.settings.align_to_grid)?"checked":"") + "/></div>")
      //   .css({"border-bottom": "solid #D2D2D2 1px", "padding-bottom": 5});
      // checkbox.append($("<span>Align to grid</span>").css({"margin-left": 5}));
      // menu.append(checkbox);

      // checkbox.on("change", function(){
      //   self.settings.align_to_grid = !self.settings.align_to_grid;
      // });

      for(var i = 0, len=navigation_selects.length; i<len; i++){
        var current = navigation_selects[i];
        var label = self.html_ref.menu_subtitle.clone().text(current.label+":");
        var select = $("<select></select>").attr("data-name", current.name)
          .css({"padding": 3, "background-color": "white"});

        if(current.name === "point_size"){
          select.css("margin-bottom", 10);
        }

        for(var j = 0, len_2 = self.data.feature_names.length; j<len_2; j++){
          select.append($("<option value='" + j + "'>" + self.data.feature_names[j] + "</option>"));
        }

        if(current.name === "color" || current.name === "point_size"){
          select.append("<option value='category'>By category</option>");
          select.val((self.settings[current.name].index !== false)?self.settings[current.name].index:"category");
        }
        else{
          select.val(self.settings.coordinates[current.name]);
        }

        var div = $("<div></div>").css({"margin-bottom": 5});
        div.append(label, select);
        menu.append(div);
      }

      get_slider_val = function(value, slider){
        var target_id = $(slider).attr("id") + "_value";
        $("#" + target_id).text(value);
      }

      var slider_defs = [
        {"name": "resolution", "min": 1, "max": 50, "value": self.settings.resolution, "label": "Resolution", "type": "resolution", "step": 5},
      ];

      for(var i = 0, len=slider_defs.length; i<len; i++){
        var def = slider_defs[i];
        menu.append($("<div>\
          <label for=" + def.name + "_slider>" + def.label + ":</label>\
          <div id='" + self.settings.target + "_" + def.name + "_slider_value'>" + def.value + "</div>\
          </div>").css({"display": "flex", "justify-content": "space-between"}));

        menu.append($("<input oninput='get_slider_val(value, this)' type='range' class='slider' value="+ def.value +" min=" + def.min +" max=" + def.max + " data-type='" + def.type + "' id='" + self.settings.target + "_" + def.name + "_slider'/>")
          .css({"width": "100%", "padding": "5px 0px", "margin": 0}));
      }

      menu.append($("<div><input type='checkbox' name='links' checked/><div>Links</div></div>").css({"display": "flex", "align-items": "center", "margin-top": 5}));
      var name2layer = {
        "links": self.link_layer
      }

      menu.on("change", "input[type='checkbox']", function(){
        var state = $(this).prop("checked");
        var name = $(this).attr("name");
        var value = 1;
        self.settings[name].draw = state;

        if(!state){
          value = 0;
          $(this).attr("data-last_settings", [self.settings.coordinates.x, self.settings.coordinates.y].join("_"));
          $(name2layer[name].getCanvas()._canvas).hide();
        }
        else{
          $(name2layer[name].getCanvas()._canvas).show(); 
        }

        if(value == 1 && [self.settings.coordinates.x, self.settings.coordinates.y].join("_") != $(this).attr("data-last_settings")){
          self._destroy_children([self.link_layer]);
          self._draw_links();
        }

        
        self._sort_layers();
      });

      var redraw_button = self.html_ref.redraw_button.clone();
      self._css_hover(redraw_button);
      menu.append(redraw_button);

      main_element.find("label").css({"font-weight": "bold"});
      main_element.find("input[type='checkbox']").css({"margin-right": 5});

      $(".slider").on("change", function(){
        var slider_type = $(this).attr("data-type");
        var value = parseInt($(this).val());
        self.settings.resolution = value;
        self._prop2settings.coordinates.x = -1;
      });

      menu.on("change", "select", function(){
        var name = $(this).attr("data-name");
        var value = $(this).val();

        if(name === 'color' || name === 'point_size'){
          self.settings[name].index = (isNaN(parseInt(value)))?value:parseInt(value);
        }
        else{
          self.settings.coordinates[name] = (isNaN(parseInt(value)))?value:parseInt(value);
        }

        if(name === "color"){
            if(self.settings.color.value_type == "value"){
              self.settings.color.params = {};
              var color_settings = self.target_element.find(".color_settings");

              color_settings.find(".max").val(self._prop2settings.color.values.abs_max);
              color_settings.find(".min").val(self._prop2settings.color.values.abs_min);
              color_settings.find(".middle").val(self._prop2settings.color.values.middle);
            }
        }
      });

      redraw_button.on("click", function(){
        self.redraw_points();
        self._draw_legend();
        self._draw_axis_labels();
        self._update_color_scale();
        self._update_point_radius_scale();
        self.navigation_layer.draw();

        if(self.settings.compounds.draw){
          self._draw_compounds();
        }
        self.target_element.find(".target_overlay").trigger('click');
      });

    }

    if(self.settings.navigation_toggle.axis){
      self._draw_axis();
    }

    self._draw_axis_labels();
    self.stage.add(self.navigation_layer);

  }

  ChemSpace.prototype._draw_axis = function(){
    var self = this;
    var x = self.selection_overlay_rect.attrs.x;
    var y = self.selection_overlay_rect.attrs.y;
    var top = self.objects_ref.border_line.clone({points:[x, y, x + self.selection_overlay_rect.attrs.width, y]});
    var right = self.objects_ref.border_line.clone({points:[x + self.selection_overlay_rect.attrs.width, y, x + self.selection_overlay_rect.attrs.width, y + self.selection_overlay_rect.attrs.height]});
    var bottom = self.objects_ref.border_line.clone({points:[x, y + self.selection_overlay_rect.attrs.height, x + self.selection_overlay_rect.attrs.width, y + self.selection_overlay_rect.attrs.height]});
    var left = self.objects_ref.border_line.clone({points:[x, y + self.selection_overlay_rect.attrs.height, x, y]});
    self.navigation_layer.add(top, right, bottom, left);
  }

  ChemSpace.prototype._draw_axis_labels = function(){
    var self = this;

    if(self.settings.navigation_toggle.axis_labels == false){
      return;
    }

    if(self.x_axis_label_group !== undefined){
      self.x_axis_label_group.destroy();
      self.y_axis_label_group.destroy();
    }

    self.x_axis_label_group = new Konva.Group({listening: false});
    self.y_axis_label_group = self.x_axis_label_group.clone();

    var y = self.settings.height - self.footer_height + 5;
    var x_text, y_text, x_min, x_max, y_min, y_max;

    x_min = self.objects_ref.navigation_text.clone({
      x: self.left_margin + 5,
      y: y,
      text: self._hack_round_float(self.coordinate_ranges["x"][0], 2).toString(),
    });

    x_label = self.objects_ref.navigation_text.clone({
      y: y,
      text: self.data.feature_names[self.settings.coordinates.x].toString(),
      fontSize: 14,
      fontStyle: "italic"
    });

    x_label.setAttrs({
      x: self.settings.width/2 - x_label.width()/2,
    });

    x_max = self.objects_ref.navigation_text.clone({
      y: y,
      text: self._hack_round_float(self.coordinate_ranges["x"][1], 2).toString(),
      fontSize: 14,
    });

    x_max.setAttrs({
      x: self.settings.width - self.right_margin - x_max.width() - 5,
    });
    self.x_axis_label_group.add(x_label, x_min, x_max);

    y_min = self.objects_ref.navigation_text.clone({
      x: self.left_margin - 20,
      y: self.settings.height - self.footer_height - 10,
      text: self._hack_round_float(self.coordinate_ranges["y"][0], 2).toString(),
      fontSize: 14,
      rotation: -90,
    });

    y_label = self.objects_ref.navigation_text.clone({
      x: self.left_margin - 20,
      text: self.data.feature_names[self.settings.coordinates.y].toString(),
      fontSize: 14,
      rotation: -90,
      fontStyle: "italic"
    });

    y_label.setAttrs({
      y: (self.settings.height - self.footer_height - self.header_height)/2 + self.header_height + y_label.width()/2,
    });

    y_max = self.objects_ref.navigation_text.clone({
      x: self.left_margin - 20,
      text: self._hack_round_float(self.coordinate_ranges["y"][1], 2).toString(),
      fontSize: 14,
      rotation: -90,
    });

    y_max.setAttrs({
      y: self.header_height + y_max.width() + 5,
    });
    self.y_axis_label_group.add(y_label, y_min, y_max);

    self.navigation_layer.add(self.x_axis_label_group, self.y_axis_label_group);
  };

  ChemSpace.prototype._feature_switch = function(){
    var self = this;

    var feature_element = self.target_element.find(".navigation");
    if(feature_element.is(":visible")){
      feature_element.fadeOut();
    }
    else{
      var overlay = self._draw_target_overlay();
      feature_element.fadeIn();

      overlay.click(function(){
        feature_element.fadeOut();
        overlay.fadeOut();
      });
    }
  }

  ChemSpace.prototype._draw_legend = function(){
    var self = this;

    if(self.point_count !== undefined){
      self.point_count.destroy();
    }

    self.point_count = self.objects_ref.legend_text.clone({
      "text": Object.keys(self.point2coord).length + " / " + self.points_len,
      "fontSize": 12,
      "y": self.header_height - 15,
    });

    var x = self.left_margin + self.settings.width/2 - self.point_count.getWidth()/2;
    self.point_count.setAttr("x", x);
    self.navigation_layer.add(self.point_count);

    if(self.categories.length < 2){
      return;
    }

    if(self.legends_group !== undefined){
      self.legends_group.destroy();
    }

    var y = 20, width, max_width = 0, legend_circle, legend_group;
    var legends = [];
    self.legends_group = new Konva.Group();

    for(var i = 0, len=self.categories.length; i < len; i++){
      category = self.categories[i];
      var label = category.label + " (" + self.category2count[i] + "/" + category.points.length + ")";
      var color = (self.settings.color.index == "category")?category.color:self.settings.shapes.circle.fill;
      var fill_color = (category.status)?color:"white";
      var shape = (category.shape !== undefined)?category.shape:"circle";
      var category_shape = self.objects_ref.shapes[shape].clone({"stroke": color, "fill": fill_color, "radius": 6, "strokeWidth": 3, "y": y + 7, "class": "category_legend"});
      var category_legend = self.objects_ref.legend_text.clone({"text": label, "y": y, "class": "category_legend"});
      var category_background = new Konva.Rect({
          "height": 22,
          "opacity": 0,
          "y": y-4,
          "class": "category_legend"
      });

      legends.push([category_shape, category_legend, category_background]);
      y += 22;

      width = category_legend.width();
      if(width > max_width){
        max_width = width;
      }
    }

    var x = self.settings.width - max_width - self.right_margin;

    for(var i = 0, len = legends.length; i<len; i++){
      legend_group = new Konva.Group({"class": "category_legend", "category_index": i});
      legends[i][0].setAttr("x", x - 14);
      legends[i][1].setAttr("x", x);
      legends[i][2].setAttrs({"x": x-21, "width": max_width+21});
      legend_group.add(legends[i][0], legends[i][1], legends[i][2])
      self.legends_group.add(legend_group)
    }
    self.navigation_layer.add(self.legends_group);
  }

  ChemSpace.prototype._process_categories = function(categories){
    var self = this;
    self.category2layer = {};
    self.categories = [];
    var shape_index = 0;
    if(self.settings.categories.order !== false){
      for(var i = 0, len = categories.length; i<len; i++){
        var c = categories[i];
        var ci = self.settings.categories.order.indexOf(c.label);
        if(ci !== -1){
          categories[i].order = ci;
        }
      }
    }

    if(categories !== undefined){
      categories = categories.sort(function(a, b){return a.order > b.order});
      for(var i = 0, len = categories.length; i < len; i++){
        self.category2layer[i] = new Konva.Layer({"category_index": i, "id": self.settings.target + "_category_" + i, "label": categories[i].label});
        if(categories[i].color === undefined){
          categories[i].color = self.settings.colors[i];
        }

        if(categories[i]["shape"] === undefined){
          if(shape_index == self.settings.shapes.order.length){
            shape_index = 0;
          }


          categories[i].shape = self.settings.shapes.order[shape_index];
          shape_index++;

        }

        if(categories[i]["radius"] === undefined){
          categories[i].radius = self.settings.shapes.circle.radius;
        }

        categories[i].status = true;
        self.categories.push(categories[i]);
      }
    }

    if(self.categories.length > 2){
      self.header_height = self.header_height + (self.categories.length-2)*25;
    }
  }

  ChemSpace.prototype._calculate_coordinates = function(point_ids){
    var self = this;

    if(point_ids == undefined && [self._prop2settings.coordinates.x, self._prop2settings.coordinates.y].join("_") == [self.settings.coordinates.x, self.settings.coordinates.y].join("_")){
      console.log("COORDINATES CACHE");
      return true;
    }
    console.time("CALCULATING COORDINATES");
    self._prop2settings.coordinates = $.extend(true, {}, self.settings.coordinates);
    self.point2coord = {};
    self.id2data = {};
    var coord, key, data;

    if(point_ids === undefined){
      var point_ids = self.point_ids;
      data = self.data.points;
    }
    else{
      data = {};
      for(var i = 0, len = point_ids.length; i<len; i++){
        key = point_ids[i];
        data[key] = self.data.points[key];
      }
    }

    var coord, key, item, xs=[], ys=[], x_point_index, y_point_index;
    var x_index = self.settings.coordinates.x;
    var y_index = self.settings.coordinates.y;

    if(self.settings.align_to_grid){
      var coordinate_arrays = [];
      for(var i = 0, len=point_ids.length; i<len; i++){
        item_data = data[point_ids[i]].features;
        xs.push(item_data[x_index]);
        ys.push(item_data[y_index]);
        coordinate_arrays.push([point_ids[i], item_data[x_index], item_data[y_index]]);
      }
      coordinate_arrays.sort(self._sort_coordinates);
    }
    else{
      for(var i = 0, len=point_ids.length; i<len; i++){
        item_data = data[point_ids[i]].features;
        xs.push(item_data[x_index]);
        ys.push(item_data[y_index]);
      };
    }
    self.coordinate_ranges = {"x": self._get_min_max(xs), "y": self._get_min_max(ys)};

    var x_border = (self.coordinate_ranges["x"][1] - self.coordinate_ranges["x"][0])*0.01;
    var max_x = self.coordinate_ranges["x"][1]+x_border;
    var min_x = self.coordinate_ranges["x"][0]-x_border;

    var y_border = (self.coordinate_ranges["y"][1] - self.coordinate_ranges["y"][0])*0.01;
    var max_y = self.coordinate_ranges["y"][1]+y_border;
    var min_y = self.coordinate_ranges["y"][0]-y_border;

    if(self.settings.compounds.draw){
      self.compound_size = self.settings.compounds.size + (1 - point_ids.length/self.points_len)*(self.settings.compounds.size - self.settings.compounds.size);
      self.atom_size = self.settings.compounds.atom_size + (1 - point_ids.length/self.points_len)*(self.settings.compounds.atom_size - self.settings.compounds.atom_size);
    }

    var margin = ((self.settings.compounds.draw && point_ids.length <= self.settings.compounds.limit)?self.compound_size/2:(self.settings.point_size.scale.max/2)) + 15;
    var origin_x = self._hack_round(self.left_margin + margin);
    var origin_y = self._hack_round(self.header_height + margin);

    var width = self.settings.width - self.left_margin - self.right_margin - 2*margin;
    var height = self.settings.height - self.header_height - self.footer_height - 2*margin;
    var x_coord, y_coord;
    var x_part = self._hack_round(width/parseInt(width/self.settings.resolution));
    var y_part = self._hack_round(height/parseInt(height/self.settings.resolution));
    var x_shift = parseInt(x_part/2);
    var y_shift = parseInt(y_part/2);

    self.point_index = {};

    if(self.settings.align_to_grid){
      var wh_counts = self._get_grid_size(width, height, coordinate_arrays.length);
      var w_step = (wh_counts[0] > 1)?width/(wh_counts[0]-1):0;
      var h_step = (wh_counts[1] > 1)?height/(wh_counts[1]-1):0;
      var origin_y = (wh_counts[1] > 1)?(origin_y - height):(origin_y - height/2);

      for(var i = 0, len = coordinate_arrays.length; i < len; i++){
        x_coord = origin_x + i%wh_counts[0]*w_step;
        y_coord = origin_y + Math.floor(i/wh_counts[0])*h_step;
        // self.point2coord[coordinate_arrays[i][0]] = [x_coord, y_coord];
      }
    }
    else{
      for(var i = 0, len = point_ids.length; i < len; i++){
        key = point_ids[i];
        coord = data[key].features;

        x_coord = width*(coord[x_index]-min_x)/(max_x-min_x);
        x_point_index = origin_x + (x_coord/x_part << 0)*x_part+x_shift;

        y_coord = height*(coord[y_index]-min_y)/(max_y-min_y);
        y_point_index = origin_y + height - (y_coord/y_part << 0)*y_part - y_shift;

        self.point2coord[key] = [x_point_index, y_point_index];

        if(self.point_index[x_point_index] === undefined){
          self.point_index[x_point_index] = {};
        }

        if(self.point_index[x_point_index][y_point_index] === undefined){
          self.point_index[x_point_index][y_point_index] = [key];
        }
        else{
          self.point_index[x_point_index][y_point_index].push(key);
        }
      }
    }
    console.timeEnd("CALCULATING COORDINATES");;
    return false;
  }

  ChemSpace.prototype._get_grid_size = function(w, h, n){
    var self = this;
    var wh_ratio = w/h;
    var hc = 1;
    var wc = wh_ratio;
    var result = 0;

    while(result < n){
      result = hc*wc;
      hc++;
      wc = wc + wh_ratio;
    }
    wc = Math.floor(wc - wh_ratio);
    hc--;
    result = wc*hc;

    while(result > n){
      wc--;
      result = wc*hc;
    }
    wc++;
    return [wc, hc];
  }

  ChemSpace.prototype._sort_coordinates = function(a, b){
    var x1 = a[1];
    var x2 = b[1];
    var y1 = a[2];
    var y2 = b[2];

    if(y1 == y2)
    {
        return (x1 < x2) ? -1 : (x1 > x2) ? 1 : 0;
    }
    else
    {
        return (y1 > y2) ? -1 : 1;
    }
  }

  ChemSpace.prototype._draw_paths = function(){
    var self = this;
    var path;
    console.time("PATHS");

    for(var i = 0, len = self.data.paths.length; i < len; i++){
      var points = [];
      for(var p = 0, len_points = self.data.paths[i]["points"].length; p<len_points; p++){
        var point = self.point2coord[self.data.paths[i]["points"][p]];
        if(point !== undefined){
          points = points.concat(point);
        }
      }
      var color = self.data.paths[i].color;
      path = self.objects_ref.path.clone({"points": points, "id": self.data.paths[i]["label"], "path_index": i, "stroke": (color !== undefined)?color:self.settings.path.stroke});
      self.path_layer.add(path);
      // path.moveToBottom();
    }
    self.path_layer.draw();
    console.timeEnd("PATHS");
  }

  ChemSpace.prototype._get_id2categories = function(){
    var self = this;
    var id2categories = {}, key;
    var create_other_category = false;

    for(var i = 0, len=self.points_len; i<len; i++){
      id2categories[self.point_ids[i]] = [];
    }

    for(var i = 0, len=self.categories.length; i < len; i++){
      var category = self.categories[i];

      for(var j = 0, len_2=category.points.length; j < len_2; j++){
        if(id2categories[category.points[j]] !== undefined){
          id2categories[category.points[j]].push(i);
        }
      }
    }

    for(var i = 0, len=self.points_len; i<len; i++){
      if(id2categories[self.point_ids[i]].length == 0){
        create_other_category = true;
        break;
      }
    }

    if(create_other_category){
      self.category2layer[self.categories.length] = new Konva.Layer();
      self.categories.push({"status": true, "label": "other", "color": self.settings.shapes.circle.fill, "radius": self.settings.shapes.circle.radius, "points": []});
      var other_index = self.categories.length - 1;

      for(var i = 0, len=self.points_len; i<len; i++){
        key = self.point_ids[i];

        if(id2categories[key].length == 0){
          self.categories[other_index].points.push(key);
          id2categories[key].push(other_index);
        }
      }
    }
    return id2categories;
  }

  /************************************
    Event functions
  ************************************/

  ChemSpace.prototype._icon_click = function(evt){
    var self = this;
    var icon_name = evt.target.attrs.icon_name;

    if(icon_name === "zoom_icon"){
      self._zoom_icon_click();
    }
    else if(icon_name === "options_icon"){
      self._feature_switch();
    }
    else if(icon_name === "export_icon"){
      self._export_icon_click();
    }
    else if(icon_name === "refresh_icon"){
      self.refresh_icon.hide();
      self.redraw_points(self.point_ids);
      self._draw_legend();
      self._draw_axis_labels();
      self.navigation_layer.draw();
      if(self.settings.compounds.draw){
        self._draw_compounds();
      }
    }
    else if(icon_name === "color_scale_icon"){
      self._color_scale_click();
    }
    else if(icon_name === "point_radius_icon"){
      self._point_radius_click();
    }
  }

  ChemSpace.prototype._export_icon_click = function(){
    var self = this;
    var export_menu = self.target_element.find(".export_menu");
    var overlay = self._draw_target_overlay();

    if(export_menu.length){
      export_menu.fadeIn();
    }
    else{
      export_menu = $("<div class='export_menu'><div><button type='submit' data-action='open'>Show image</button></div><div><button type='submit' data-action='save'>Save image</button></div></div>");
      self.target_element.append(export_menu);
      export_menu.css({"position": "absolute",
                      "top": 45,
                      "left": 40,
                      "font-size": "12px",
                      "border": "solid #D2D2D2 1px",
                      "padding": "2px",
                      "background-color": "white"});

      var buttons = export_menu.find("button");
      buttons.css({"padding-top": "7px", "padding-bottom": "5px", "padding-right": "8px", "padding-left": "8px", "color": "white", "border": "solid #D2D2D2 1px", "width": "100%", "background-color": "#2171b5", "font-weight": "bold"});
      self._css_hover(buttons);

      overlay.click(function(){
        export_menu.fadeOut();
        overlay.fadeOut();
      });

      buttons.click(function(){
        var action = $(this).attr("data-action");
        self.export_image(action);
      });
    }

    // function _download_image(dataUrl){
    //   $('<a download="chemspace" href="'+ dataUrl + '"></a>')[0].click();
    // };

    // function _open_image(dataUrl){
    //   window.open(dataUrl, "_blank");
    // };
  };

  ChemSpace.prototype.export_image = function(action, filename){
    var self = this;
    if(action === undefined){
      var action = "save";
    }

    if(filename === undefined){
      var filename = "chemspace";
    }

    var zoom = self._hack_round_float(1500/self.stage.width(), 1);
    var width = self.stage.width();
    var height = self.stage.height();
    var loading_div = $("<h3 style='margin-top: 100px; margin-left: 100px; width: " + width + "px; height: " + height + "px;'>Loading...</h3>");
    self.target_element.after(loading_div);
    self.target_element.hide();
    // self.selection_overlay_rect.setAttr("opacity", 0);
    self.stage.width(width*zoom);
    self.stage.height(height*zoom);
    self.stage.scale({x: zoom, y:zoom});
    self.stage.draw();
    self.stage.toDataURL({
      quality: 1,
      callback: function(dataUrl){
        if(action === "open"){
          _open_image(dataUrl);
        }
        else{
          _download_image(dataUrl, filename);
        }
        self.stage.width(width);
        self.stage.height(height);
        self.stage.scale({x: 1, y:1});
        // self.selection_overlay_rect.setAttr("opacity", 0.9);
        self.stage.draw();
        loading_div.remove();
        self.target_element.show();
        self.navigation_layer.show();
        self.navigation_layer.draw();
        overlay.trigger("click");
      }
    });

    function _download_image(dataUrl, filename){
      $('<a download="' + filename + '" href="'+ dataUrl + '"></a>')[0].click();
    };

    function _open_image(dataUrl){
      window.open(dataUrl, "_blank");
    };

  }

  ChemSpace.prototype._zoom_icon_click = function(){
    var self = this;
    self.hover_layer.destroyChildren();
    self.hover_layer.draw();
    self.selection_rect.destroy();
    self.selection_rect = false;
    self.zoom_icon.destroy();
    self.selection_layer.draw();
    self.refresh_icon.show();

    self.redraw_points(self.current_selection);
    self._draw_legend();
    self.navigation_layer.draw();
    self._draw_axis_labels();
    self.navigation_layer.draw();
    if(self.settings.compounds.draw){
      self._draw_compounds();
    }
  }

  ChemSpace.prototype._point_click = function(evt) {
    var self = this;
    var point = evt.target;
    self.events.point_click(point.attrs.point_ids, evt);
  }

  ChemSpace.prototype._get_point_tooltip = function(evt){
    var self = this;
    var select, row;
    var point_ids = evt.target.attrs.point_ids;

    var coords = self.point2coord[point_ids[0]];
    var point_ids = self.point_index[coords[0]][coords[1]];
    var point_id = point_ids[0];
    var label = self.data.points[point_id].label;

    if(point_ids.length == 1){
      var point_data = self.data.points[point_id].features;
      label = $("<div>" + ((label === undefined)?point_id:label) + "</div>");
    }
    else{
      var point_data = [];
      var pids_len = point_ids.length;

      for(var i = 0; i<self.data.feature_names.length; i++){
        var values = [];

        for(var j = 0; j<pids_len; j++){
          values.push(self.data.points[point_ids[j]].features[i]);
        }
        values.sort(self._sort_number_ascending);
        point_data.push((values[0] !== null)?values[0] + " - " + values[pids_len-1]: "-");
      }

      label = $("<div>" + ((label === undefined)?point_id:label) + "</div>");
    }

    var color = evt.target.fill();
    var tooltip = self.html_ref.tooltip;

    tooltip.find(".point_id").html(label)
      .css({
        "font-weight": "bold",
        "border-bottom": "solid #d2d2d2 1px",
        "padding-bottom": 5,
        "display": "flex",
        "justify-content": "flex-start",
        "align-items": "center"
    });

    if(point_ids.length > 1){
      tooltip.find(".point_id")
        .append($("<div>+ " + (pids_len-1) + "</div>")
        .css({"border-radius": 5, "padding": "3px 8px", "background-color": "#65aa30", "color": "white", "margin-left": 8, "white-space": "nowrap"})
      );
    }
    tooltip.css({
      "border-color":color,
      "font-size": "small"
    });

    var dimensions = $("<div></div>");

    for(var i = 0, len=self.data.feature_names.length; i<len; i++){
        if (i > 8) {
            continue;
        }
      row = $("<div></div>")
        .css({"margin-top": 5});

      row.append($("<span>" + self.data.feature_names[i] + ": </span>: ").css({"color": "#333333", "margin-right": 5}));
      row.append("<span>" + ((point_data[i] !== null)?point_data[i]:"-") + "</span>");

      dimensions.append(row);
    }
    tooltip.find(".dimensions").html(dimensions);
    return tooltip;
  }

  ChemSpace.prototype._point_mouseover = function(evt) {
    var self = this;

    var tooltip_check = self.target_element.find(".point_tooltip");

    if(tooltip_check.length){
      tooltip_check.remove();
    }
    var tooltip_wrapper = $("<div class='point_tooltip'></div>")
      .css({
        "position": "fixed",
        "display": "none",
        "z-index": 100,
      });

    var point_ids = evt.target.attrs.point_ids;
    var coords = self.point2coord[point_ids[0]];
    point_ids = self.point_index[coords[0]][coords[1]];

    var color = evt.target.fill();
    var tooltip = self.events.point_tooltip(point_ids, color, evt);
    tooltip_wrapper.append(tooltip);
    self.target_element.append(tooltip_wrapper);

    var current_x = evt.evt.clientX;
    var current_y = evt.evt.clientY;
    var tooltip_height = tooltip_wrapper.height();
    var x = (coords[0] > self.settings.width/2)?(current_x - tooltip_wrapper.width() - 20):(current_x + 20);
    var y = current_y - tooltip_height/2;

    if(y < self.target_element[0].clientTop){
      y = self.target_element[0].clientTop;
    }

    if((y + tooltip_height) > (self.target_element[0].clientTop + self.settings.height)){
      y = self.target_element[0].clientTop + self.settings.height - tooltip_height;
    }

    tooltip_wrapper.css({
      "display": "block",
      "top": y,
      "left": x,
    });

    if(self.settings.compounds.draw){
      // self.compound_size = self.settings.compounds.tooltip_compound_size;
      // self.atom_size = self.settings.compounds.max_atom_size;
      // self.atom_size = self.settings.compounds.atom_size;
      self._draw_compound_in_tooltip(point_ids[0]);
    }
    
    if(evt.target.className === 'Circle'||evt.target.className === 'RegularPolygon'){
      var hover_obj = evt.target.clone({"listening": false, "radius": evt.target.attrs.radius + 3});
    }
    else if(evt.target.className === 'Rect'){
     var hover_obj = evt.target.clone({
        "listening": false,
        "width": evt.target.attrs.width + 6,
        "height": evt.target.attrs.width + 6,
        "x": evt.target.attrs.x - 3,
        "y": evt.target.attrs.y - 3,
      });
    }
    self.hover_layer.add(hover_obj);
    self.hover_layer.draw()
  }

  ChemSpace.prototype._point_mouseout = function(evt) {
    var self = this;
    self.target_element.find(".point_tooltip").remove();
    self.hover_layer.destroyChildren();
    self.hover_layer.draw();
  }

  ChemSpace.prototype._path_mouseout = function(evt) {
    var self = this;
    self.hover_layer.destroyChildren();
    self.hover_layer.draw();
  }

  ChemSpace.prototype._path_mouseover = function(evt) {
    var self = this;
    var path = self.stage.find("#" + evt.target.attrs.id)[0];
    self.hover_layer.add(path.clone({"opacity": 1}))
    self.hover_layer.draw()
  }

  ChemSpace.prototype._path_click = function(evt) {
    var self = this;
    var path = self.data.paths[evt.target.attrs.path_index];
    self.events.path_click(path, evt);
  }

  ChemSpace.prototype._link_mouseout = function(evt) {
    var self = this;
    self.hover_layer.destroyChildren();
    self.hover_layer.draw();
  }

  ChemSpace.prototype._link_mouseover = function(evt) {
    var self = this;
    var point_ids = evt.target.attrs.point_ids;
    var p1 = self.stage.find("#"+point_ids[0])[0];
    var p2 = self.stage.find("#"+point_ids[1])[0];
    console.log(point_ids)
    var point_1 = p1.clone({"listening": false, "radius": p1.attrs.radius + 2});
    var point_2 = p2.clone({"listening": false, "radius": p2.attrs.radius + 2});
    var link = evt.target.clone({"listening": false, "strokeWidth": evt.target.attrs.strokeWidth + 2});
    self.hover_layer.add(link, point_1, point_2);
    self.hover_layer.draw()
  }

  ChemSpace.prototype._link_click = function(evt) {
    var self = this;
    var point_ids = evt.target.attrs.point_ids;
    self.events.link_click([self.id2points[point_ids[0]], self.id2points[point_ids[1]]], evt);
  }

  ChemSpace.prototype._sort_layers = function(){
    var self = this;
    self.main_layer.moveToTop();
    if(self.path_layer !== undefined){
      self.path_layer.moveToTop();
    }

    if(self.link_layer !== undefined && self.settings.links.draw){
      self.link_layer.moveToTop();
    }

    if(self.categories[self.categories.length-1].label == "other" && self.categories[self.categories.length-1].status){
      self.category2layer[self.categories.length-1].moveToTop();
    }
    for(var i = self.categories.length-1; i>=0; i--){
      if(self.categories[i].status){
        if(self.categories[i].label != "other"){
          self.category2layer[i].moveToTop();
        }
      }
    }

    if(self.highlight_layer !== undefined){
      self.highlight_layer.moveToTop();
    }

    self.hover_layer.moveToTop();
    self.selection_layer.moveToTop();
  }

  ChemSpace.prototype._category_legend_click = function(evt) {
    var self = this;
    var category = self.categories[evt.target.parent.getAttr("category_index")];
    if(category.status){
      evt.target.parent.children[0].setAttrs({fill: "white"});
      category.status = false;
    }
    else{
      evt.target.parent.children[0].setAttrs({fill: evt.target.parent.children[0].getAttr("stroke")});
      category.status = true;
    }
    self.events.category_legend_click(category, evt);
    self.navigation_layer.draw();
    self._sort_layers();

  }

  ChemSpace.prototype._category_legend_mouseover = function(evt) {
    var self = this;
    var ci = evt.target.parent.getAttr("category_index");
    evt.target.parent.setAttr("opacity", 0.7);
    self.navigation_layer.draw();
    self.main_layer.moveToTop();
    self.category2layer[ci].moveToTop();
  }

  ChemSpace.prototype._category_legend_mouseout = function(evt) {
    var self = this;
    evt.target.parent.setAttr("opacity", 1);
    self.navigation_layer.draw();
    self._sort_layers();
  }

  ChemSpace.prototype._icon_mouseover = function(evt){
    var self = this;
    var target = evt.target;
    var label = target.getAttr("label");
    var x = target.getAttr("x");
    var y = target.getAttr("y");
    var width = target.getWidth();
    var height = target.getHeight();

    var icon_tooltip = self.objects_ref.tooltip_label.clone({x: x,
        y: y+1.2*height
    });

    icon_tooltip.add(self.objects_ref.tooltip_tag.clone());
    icon_tooltip.add(self.objects_ref.tooltip_text.clone({text: label}));
    icon_overlay = evt.target.clone({fill: "white", opacity:0.2});

    self.hover_layer.add(icon_tooltip, icon_overlay);
    self.hover_layer.draw();
  }

  ChemSpace.prototype._icon_mouseout = function(evt){
      var self = this;
      self.hover_layer.destroyChildren();
      self.hover_layer.draw();
  }

  ChemSpace.prototype._get_min_max_middle = function(data, percentiles){
    var self = this;
    var i, len;
    var min_max_middle = {};

    if(percentiles == undefined){
      var percentiles = {"min": 0, "max": 100, "middle": 50};
    }

    var len = data.length - 1;
    data.sort(self._sort_number_ascending);

    min_max_middle["min"] = (percentiles.min > 0)?data[self._hack_round((len-1)*percentiles.min/100)]:Math.min.apply(null, data);
    min_max_middle["max"] = (percentiles.max < 100)?data[self._hack_round((len-1)*percentiles.max/100)]:Math.max.apply(null, data);
    min_max_middle["middle"] = (percentiles.middle != 50)?data[self._hack_round((len-1)*percentiles.middle/100)]:data[self._hack_round((len-1)/2)];

    min_max_middle["median"] = data[self._hack_round((len-1)/2)];
    min_max_middle["abs_min"] = Math.min.apply(null, data);
    min_max_middle["abs_max"] = Math.max.apply(null, data);

    return min_max_middle;
  }

  ChemSpace.prototype._get_prop_settings = function(prop){
    var self = this;
    var i, len;
    var settings = self.settings[prop];
    var cs = self._prop2settings[prop];
    var current_scale = (typeof(cs.scale) != "object")?cs.scale:[cs.scale.min, cs.scale.middle, cs.scale.max, cs.resolution].join("_");
    var new_scale = (typeof(settings.scale) != "object")?settings.scale:[settings.scale.min, settings.scale.middle, settings.scale.max, settings.resolution].join("_");

    if([current_scale, cs.value_type, cs.index, cs.params.min, cs.params.middle, cs.params.max].join("_") != [new_scale, settings.value_type, settings.index, settings.params.min, settings.params.middle, settings.params.max].join("_")){
      var prop2null = {
        "color": "#D2D2D2",
        "point_size": self.settings.point_size.scale.min
      };

      console.log(prop, "CALCULATION");
      self._prop2settings[prop] = $.extend(true, {}, settings);
      self._prop2settings[prop].resolution = self.settings.resolution;
      var v2v = {};

      if(self._prop2settings[prop].index == 'category'){
        for(var i = 0, len=self.categories.length; i<len; i++){
          v2v[i] = self._prop2fnc[prop].category(self.categories[i]);
        }
      }
      else{
        var keys = self.point_ids;
        var data = [];
        var prop_index = self.settings[prop].index;

        for(var i = 0, len=keys.length; i<len; i++){
          var value = self.data.points[keys[i]].features[prop_index];
          if(value !== null && value !== undefined){
            data.push(value);
            v2v[value] = null;
          }
        }

        var len = data.length;
        data.sort(self._sort_number_ascending);
        var min_max_middle = self._get_min_max_middle(data, self.settings[prop].params);

        if(self.settings[prop].value_type === "value"){
          min_max_middle["min"] = (settings.params.min !== undefined)?settings.params.min:min_max_middle["abs_min"];
          min_max_middle["max"] = (settings.params.max !== undefined)?settings.params.max:min_max_middle["abs_max"];
          min_max_middle["middle"] = (settings.params.middle !== undefined)?settings.params.middle:data[self._hack_round((len-1)/2)];
        }
        self._prop2settings[prop].values = min_max_middle;

        var values = Object.keys(v2v);
        for(var i = 0, len=values.length; i<len; i++){
          var value = values[i];
          v2v[value] = self._prop2fnc[prop].feature(parseFloat(value));
        }
        v2v[null] = prop2null[prop];
      }
      self._prop2settings[prop].v2v = v2v;
      return false;
    }
    else{
      console.log(prop, "CACHE");
      return true;
    }
  }

  ChemSpace.prototype._get_min_max = function(data){
    var self = this;
    var i, len;
    var min_max = [];

    var len = data.length;
    data.sort(self._sort_number_ascending);
    min_max.push(data[0]);
    min_max.push(data[data.length-1]);
    return min_max;
  }

  ChemSpace.prototype._get_color_for_value = function(value, min, max, middle, color_scale){
    var self = this;
    if(value === null || value === undefined){
      return self.settings.shapes.circle.fill;
    }
    var color = self.colors[color_scale];
    var c1 = color["start"];
    var c2 = color["end"];

    if(value > max){
      // return 0x000000 + (c2.r << 16) + (c2.g << 8) + c2.b;
      return 'rgb('+c2.r+','+c2.g+','+c2.b+')';
    }

    if(min == max || value < min){
      // return 0x000000 + (c1.r << 16) + (c1.g << 8) + c1.b;
      return 'rgb('+c1.r+','+c1.g+','+c1.b+')';
    }

    if(color["middle"] !== undefined){
        if(value >= middle){
            min = middle;
            c1 = color["middle"];
            c2 = color["end"];
        }
        else{
            max = middle;
            c1 = color["start"];
            c2 = color["middle"];
        }
    }

    var position = (value-min)/(max-min);
    var r = self._hack_round(c1.r+(position*(c2.r-c1.r)));
    var g = self._hack_round(c1.g+(position*(c2.g-c1.g)));
    var b = self._hack_round(c1.b+(position*(c2.b-c1.b)));
    // return 0x000000 + (r << 16) + (g << 8) + b;
    return 'rgb('+r+','+g+','+b+')';
  }

  ChemSpace.prototype._hack_round = function(value){
    var self = this;
      return (0.5 + value) >> 0;
  }

  ChemSpace.prototype._hack_round_float = function(num, dec) { // round number to specified number of decimal places
      var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
      return result;
  }

  ChemSpace.prototype._sort_number_ascending = function(a, b){
    var self = this;
    return a - b;
  }

  ChemSpace.prototype._sort_number_descending = function(a, b){
    var self = this;
    return b - a;
  }

  ChemSpace.prototype.get_points_by_range = function(range){
    var self = this;
    var key, coords, selected = [];

    for(var i = 0, keys = Object.keys(self.point2coord), len = keys.length; i<len; i++){
      key = keys[i];
      coords = self.point2coord[key];

      if(coords[0] >= range.x[0] && coords[0] <= range.x[1] && coords[1] >= range.y[0] && coords[1] <= range.y[1]){
        selected.push(key);
      }
    }

    return selected;
  }

  ChemSpace.prototype._get_icon_group = function(icon_name, icon_label, x, y){
    var self = this;
    var icon_group = new Konva.Group({class: "icon"});
    var icon = self.objects_ref.icon.clone({
            data: self.paths_ref[icon_name],
            x: x,
            y: y,
            icon_name: icon_name
    });

    var icon_overlay = self.objects_ref.icon_overlay.clone({x: x, y: y, label: icon_label, icon_name: icon_name});
    icon_group.add(icon, icon_overlay);
    return icon_group;
  }

  /************************************
  Compound drawing
  ************************************/
  
  ChemSpace.prototype.draw_compounds = function(point_ids, append){
    var self = this;
    if(append !== undefined && append){
      self.fixed_compounds = self.fixed_compounds.concat(point_ids);
    }
    else{
      self.fixed_compounds = point_ids;
    }
    self._draw_compounds();
  }

  ChemSpace.prototype.erase_compounds = function(){
    var self = this;
    self.fixed_compounds = [];
    self._draw_compounds();
  }

  ChemSpace.prototype._draw_compounds = function(point_ids){
    var self = this;
    var key;

    if(point_ids === undefined){
      var point_ids = Object.keys(self.point2coord);
      if(point_ids.length > self.settings.compounds.limit){
        if(self.fixed_compounds.length == 0){
          point_ids = [];
        }
        else{
          point_ids = self.fixed_compounds;
        }
      }
    }

    for(var i = 0, keys=Object.keys(self.point2img), len=keys.length; i<len; i++){
      key = keys[i];

      if(self.point2coord[key] === undefined || point_ids.indexOf(key) === -1){
        self.point2img[key].hide();
      }
      else{
        self.point2img[key].show(); 
      }
    }

    self._get_compound_structures(point_ids)
      .then(function(compounds){
        self._draw_compound_structures(point_ids);
      })
      .catch(function(err){
        console.log(err);
      });
  }

  ChemSpace.prototype._get_compound_structures = function(point_ids){
    var self = this;
    var key;
    var to_get = [];
    var done = [];
    var compounds = {};
    
    if(point_ids === undefined){
      var point_ids = Object.keys(self.point2coord);
    }

    var parser = new Promise(function(resolve, reject){
      try {

        for(var i = 0, len=point_ids.length; i<len; i++){
          var key = point_ids[i];
          if(self.data.compounds[key] === undefined){
            to_get.push(key);
          }
          else{
            compounds[key] = self.data.compounds[key];
          }
        }
        if(to_get.length > 0){
          if(self.settings.compounds.compound_url !== ""){

            for(var i = 0, len=to_get.length; i<len; i++){
              var key = to_get[i];

              $.ajax({
                  url: self.settings.compounds.compound_url,
                  type: 'GET',
                  dataType: "json",
                  data: {compound_id: key},
                  success: function(data) {
	                  self.data.compounds[data.compound_id] = {structure: data.structure};
	                  compounds[data.compound_id] = {structure: data.structure};
	                  done.push(data.compound_id);

	                  if(to_get.length === done.length){
	                    resolve(compounds);
	                  }
                  }
              });
            }
          }
        }

        else{
          resolve(compounds);
        }
      }
      catch(err){
        reject(err);
      }
    });

    return parser;
  }

  ChemSpace.prototype._draw_compound_structures = function(point_ids){
    var self = this;
    var structure, key, origin, img;
    var to_get = [];
    var shift = self.settings.compounds.size/2;
    var done = 0;

    for(var i = 0, keys=point_ids, len=keys.length; i<len; i++){
      key = keys[i];

      if(self.data.compounds[key] !== undefined && self.point2coord[key] !== undefined){
        if(self.point2img[key] === undefined){
          to_get.push(key);
        }
        else{
          self.point2img[key].setAttrs({x: self.point2coord[key][0] - shift, y:self.point2coord[key][1] - shift});
          self.category2layer[self.id2categories[key][0]].add(self.point2img[key]);
          self.point2img[key].moveToBottom();
          done++;
        }
      }
    }
    
    function _draw(){
      for(var i = 0, len=self.categories.length; i<len; i++){
        self.category2layer[i].draw();
      }
    }

    if(done < to_get.length){
      for(var i = 0, len=to_get.length; i<len; i++){
        var key = to_get[i];
        SmilesDrawer.parse(self.data.compounds[key].smiles, function (tree) {
          if(self.data.compounds[key].color === undefined){
            self.smilesDrawer.draw(tree, 'chemspace_img_cache', 'light', false);
          }
          else{
            var sd_space = $.extend({}, self.settings.compounds.smilesDrawer);
            sd_space.color = self.data.compounds[key].color;
            sd_space.width = self.settings.compounds.size;
            sd_space.height = self.settings.compounds.size;
            current_smilesDrawer = new SmilesDrawer.Drawer(sd_space);
            current_smilesDrawer.draw(tree, 'chemspace_img_cache', 'light', false);
          }
          var canvas = document.getElementById("chemspace_img_cache");
          var img = new Image();
          img.key = key;
          
          img.onload = function() {
            var image = new Konva.Image({
              image: img,
              width: self.settings.compounds.size,
              height: self.settings.compounds.size,
              listening: false
            });
            self.point2img[this.key] = image.clone();
            self.point2img[this.key].setAttrs({x: self.point2coord[this.key][0] - shift, y:self.point2coord[this.key][1] - shift});
            self.category2layer[self.id2categories[this.key][0]].add(self.point2img[this.key]);
            self.point2img[this.key].moveToBottom();

            done++;

            if(done == to_get.length){
              _draw();
            }
          };

          img.src = canvas.toDataURL();

        }, function (err) {
            console.log(err);
            done++;

            if(done == to_get.length){
              _draw();
            }
        });
      }
    }
    else{
      _draw();
    }

  }

  ChemSpace.prototype._get_compound_structure = function(point_id){
    var self = this;
    return self.data.compounds[point_id];
  }
  
  ChemSpace.prototype._draw_compound_in_tooltip = function(point_id){
    var self = this;
    
    SmilesDrawer.parse(self.data.compounds[point_id].smiles, function (tree) {
        self.tooltipSmilesDrawer.draw(tree, 'tooltip_compound_img', 'light', false);
    }, function (err) {
        console.log(err);
    });
  };

  ChemSpace.prototype._draw_target_overlay = function(){
    var self = this;
    var overlay = self.target_element.find(".target_overlay");

    if(overlay.length){
      overlay.fadeIn();
    }
    else{
      overlay = $("<div class='target_overlay'></div>");
      overlay.css({"background-color": "white",
                      "position": "absolute",
                      "top": 0,
                      "left": 0,
                      "right": 0,
                      "bottom": 0,
                      "opacity": 0.5
          });
      self.target_element.append(overlay);
    }

    return overlay;
  }

  ChemSpace.prototype._get_average = function(values){
    var sum = 0;
    if(values.length == 1){
      var avg = values[0];
    }
    else{
      for(var i = 0, len=values.length; i<len; i++){
          sum += values[i];
      }
      var avg = sum/values.length;
    }
    return avg;
  };

  ChemSpace.prototype._css_hover = function(elms){
    elms.hover(
      function(){$(this).css({"cursor": "pointer", "opacity": 0.7})},
      function(){$(this).css({"opacity": 1})}
    )
  };

  ChemSpace.prototype._percentile_alert = function(values){
    var warning = false;
    if(values.max > 100 || values.max < 0){
      warning = "The maximum percentile must be a number between 0 and 100.";
    }
    else if(values.middle > 100 || values.middle < 0){
      warning = "The middle percentile must be a number between 0 and 100.";
    }
    else if(values.min > 100 || values.min < 0){
      warning = "The minimum percentile must be a number between 0 and 100.";
    }

    if(warning !== false){
      alert(warning);
      return false;
    }
  }

  ChemSpace.prototype._min_max_middle_inputs = function(values_dict, datatype){
    var self = this;
    var order = ["min", "middle", "max"];
    var result = $("<div></div>")
      .css({"display": "flex", "justify-content": "space-between", "padding": "8px 0px", "border-bottom": "solid gray 1px", "margin-bottom": 5});

    for(var i = 0, len=order.length; i<len; i++){
      var value = values_dict[order[i]];

      var option = $("<div></div>").css({"width": "30%", "text-align": "center"});
      option.append($("<div>" + self._capitalize(order[i]) + "</div>").css({"font-size": "small", "color": "gray"}));

      var input = $("<div></div>").css({"width": "100%"});
      input.append($("<input data-type='" + datatype + "' class='option' name='" + order[i] + "' type='text' value='" + value + "'>")
        .css({"width": "90%", "text-align": "center"})
      );
      option.append(input);
      result.append(option);
    }
    return result;
  }

  ChemSpace.prototype._capitalize = function(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ChemSpace.prototype._shuffle = function(arr){
    var newArr = [];
    console.time("SHUFFLE");
    while (arr.length) {

       var randomIndex = Math.floor(Math.random() * arr.length),
           element = arr.splice(randomIndex, 1)

       newArr.push(element[0]);

    }
    console.timeEnd("SHUFFLE");

    return newArr;
  }

}(jQuery));