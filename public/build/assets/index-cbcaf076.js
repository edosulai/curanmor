var c={},l={get exports(){return c},set exports(e){c=e}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var f={}.hasOwnProperty;function s(){for(var n=[],o=0;o<arguments.length;o++){var t=arguments[o];if(t){var r=typeof t;if(r==="string"||r==="number")n.push(t);else if(Array.isArray(t)){if(t.length){var a=s.apply(null,t);a&&n.push(a)}}else if(r==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){n.push(t.toString());continue}for(var i in t)f.call(t,i)&&t[i]&&n.push(i)}}}return n.join(" ")}e.exports?(s.default=s,e.exports=s):window.classNames=s})()})(l);const u=c;export{c,u as r};
