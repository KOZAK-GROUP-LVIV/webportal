webpackJsonp([2,4],{

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(533);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(566)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato:400,700);", ""]);

// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n.content-wrap{\n\twidth: 100%;\n}\n.content-wrap__nav{\n\tmargin-bottom: 50px;\n}\n\n.content-wrap__content{\n\tmargin: 0 auto;\n}\n*, *:before, *:after {\n  box-sizing: border-box;\n}\n\n\n\n.container.chat-contain {\n  margin: 0 auto;\n  margin-bottom: 100px;\n  width: 750px;\n  background: #444753;\n  border-radius: 5px;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.people-list {\n  width: 260px;\n  float: left;\n  overflow: hidden;\n\n}\n.people-list .search {\n  padding: 20px;\n  padding-bottom: 30px;\n}\n.people-list input {\n  border-radius: 3px;\n  border: none;\n  padding: 14px;\n  color: white;\n  background: #6A6C75;\n  width: 90%;\n  font-size: 14px;\n}\n.people-list .fa-search {\n  position: relative;\n  left: -25px;\n}\n.people-list ul {\n  padding: 20px;\n  overflow-y: auto;\n  height: 529px;\n}\n.people-list ul li {\n  padding-bottom: 20px;\n}\n.people-list img {\n  float: left;\n}\n.people-list .about {\n  float: left;\n  margin-top: 8px;\n}\n.people-list .about {\n  padding-left: 8px;\n}\n.people-list .status {\n  color: #92959E;\n}\n\n.chat {\n  width: 490px;\n  float: left;\n  overflow: hidden;\n  background: #F2F5F8;\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  color: #434651;\n}\n.chat .chat-header {\n  padding: 20px;\n  border-bottom: 2px solid white;\n}\n.chat .chat-header img {\n  float: left;\n}\n.chat .chat-header .chat-about {\n  float: left;\n  padding-left: 10px;\n  margin-top: 6px;\n}\n.chat .chat-header .chat-with {\n  font-weight: bold;\n  font-size: 16px;\n}\n.chat .chat-header .chat-num-messages {\n  color: #92959E;\n}\n.chat .chat-header .fa-star {\n  float: right;\n  color: #D8DADF;\n  font-size: 20px;\n  margin-top: 12px;\n}\n.chat .chat-history {\n  padding: 30px 30px 20px;\n  padding-right: 0;\n  border-bottom: 2px solid white;\n}\n.chat .chat-history ul{\noverflow-y: auto;\nheight: 325px;\n}\n.chat .chat-history .message-data {\n  margin-bottom: 15px;\n}\n.chat .chat-history .message-data-time {\n  color: #a8aab1;\n  padding-left: 6px;\n}\n.chat .chat-history .message {\n  color: white;\n  padding: 18px 20px;\n  line-height: 26px;\n  font-size: 16px;\n  border-radius: 7px;\n  margin-bottom: 30px;\n  width: 90%;\n  position: relative;\n}\n.chat .chat-history .message:after {\n  bottom: 100%;\n  left: 7%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-bottom-color: #86BB71;\n  border-width: 10px;\n  margin-left: -10px;\n}\n.chat .chat-history .my-message {\n  background: #86BB71;\n}\n.chat .chat-history .other-message {\n  background: #94C2ED;\n}\n.chat .chat-history .other-message:after {\n  border-bottom-color: #94C2ED;\n  left: 93%;\n}\n.chat .chat-message {\n  padding: 5px;\n}\n.chat .chat-message textarea {\n  width: 100%;\n  border: none;\n  padding: 10px 20px;\n  font: 14px/22px \"Lato\", Arial, sans-serif;\n  margin-bottom: 10px;\n  border-radius: 5px;\n  resize: none;\n}\n.chat .chat-message .fa-file-o, .chat .chat-message .fa-file-image-o {\n  font-size: 16px;\n  color: gray;\n  cursor: pointer;\n}\n.chat .chat-message button {\n  float: right;\n  color: #94C2ED;\n  font-size: 16px;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  font-weight: bold;\n  background: #F2F5F8;\n}\n.chat .chat-message button:hover {\n  color: #75b1e8;\n}\n\n.online, .offline, .me {\n  margin-right: 3px;\n  font-size: 10px;\n}\n\n.online {\n  color: #86BB71;\n}\n\n.offline {\n  color: #E38968;\n}\n\n.me {\n  color: #94C2ED;\n}\n\n.align-left {\n  text-align: left;\n}\n\n.align-right {\n  text-align: right;\n}\n\n.float-right {\n  float: right;\n}\n\n.clearfix:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 566:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(354);


/***/ })

},[570]);
//# sourceMappingURL=styles.bundle.js.map