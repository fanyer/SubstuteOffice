// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// (c) 2010-2013 Thomas Fuchs

// Zepto.js may be freely distributed under the MIT license.

/*!
 * ZRender, a high performance canvas library.
 *  
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 * 
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */

define("zrender/dep/excanvas", ["require"], function(e) {
	return document.createElement("canvas").getContext ? G_vmlCanvasManager = !1 : function() {
		function f() {
			return this.context_ || (this.context_ = new I(this))
		}

		function c(e, t, n) {
			var r = l.call(arguments, 2);
			return function() {
				return e.apply(t, r.concat(l.call(arguments)))
			}
		}

		function h(e) {
			return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
		}

		function p(e, t, n) {
			e.namespaces[t] || e.namespaces.add(t, n, "#default#VML")
		}

		function d(e) {
			p(e, "g_vml_", "urn:schemas-microsoft-com:vml"), p(e, "g_o_", "urn:schemas-microsoft-com:office:office");
			if (!e.styleSheets.ex_canvas_) {
				var t = e.createStyleSheet();
				t.owningElement.id = "ex_canvas_", t.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
			}
		}

		function m(e) {
			var t = e.srcElement;
			switch (e.propertyName) {
				case "width":
					t.getContext().clearRect(), t.style.width = t.attributes.width.nodeValue + "px", t.firstChild.style.width = t.clientWidth + "px";
					break;
				case "height":
					t.getContext().clearRect(), t.style.height = t.attributes.height.nodeValue + "px", t.firstChild.style.height = t.clientHeight + "px"
			}
		}

		function g(e) {
			var t = e.srcElement;
			t.firstChild && (t.firstChild.style.width = t.clientWidth + "px", t.firstChild.style.height = t.clientHeight + "px")
		}

		function E() {
			return [
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1]
			]
		}

		function S(e, t) {
			var n = E();
			for (var r = 0; r < 3; r++)
				for (var i = 0; i < 3; i++) {
					var s = 0;
					for (var o = 0; o < 3; o++) s += e[r][o] * t[o][i];
					n[r][i] = s
				}
			return n
		}

		function x(e, t) {
			t.fillStyle = e.fillStyle, t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.lineWidth = e.lineWidth, t.miterLimit = e.miterLimit, t.shadowBlur = e.shadowBlur, t.shadowColor = e.shadowColor, t.shadowOffsetX = e.shadowOffsetX, t.shadowOffsetY = e.shadowOffsetY, t.strokeStyle = e.strokeStyle, t.globalAlpha = e.globalAlpha, t.font = e.font, t.textAlign = e.textAlign, t.textBaseline = e.textBaseline, t.scaleX_ = e.scaleX_, t.scaleY_ = e.scaleY_, t.lineScale_ = e.lineScale_
		}

		function N(e) {
			var t = e.indexOf("(", 3),
				n = e.indexOf(")", t + 1),
				r = e.substring(t + 1, n).split(",");
			if (r.length != 4 || e.charAt(3) != "a") r[3] = 1;
			return r
		}

		function C(e) {
			return parseFloat(e) / 100
		}

		function k(e, t, n) {
			return Math.min(n, Math.max(t, e))
		}

		function L(e) {
			var t, n, r, i, s, o;
			i = parseFloat(e[0]) / 360 % 360, i < 0 && i++, s = k(C(e[1]), 0, 1), o = k(C(e[2]), 0, 1);
			if (s == 0) t = n = r = o;
			else {
				var u = o < .5 ? o * (1 + s) : o + s - o * s,
					a = 2 * o - u;
				t = A(a, u, i + 1 / 3), n = A(a, u, i), r = A(a, u, i - 1 / 3)
			}
			return "#" + y[Math.floor(t * 255)] + y[Math.floor(n * 255)] + y[Math.floor(r * 255)]
		}

		function A(e, t, n) {
			return n < 0 && n++, n > 1 && n--, 6 * n < 1 ? e + (t - e) * 6 * n : 2 * n < 1 ? t : 3 * n < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
		}

		function M(e) {
			if (e in O) return O[e];
			var t, n = 1;
			e = String(e);
			if (e.charAt(0) == "#") t = e;
			else if (/^rgb/.test(e)) {
				var r = N(e),
					t = "#",
					i;
				for (var s = 0; s < 3; s++) r[s].indexOf("%") != -1 ? i = Math.floor(C(r[s]) * 255) : i = +r[s], t += y[k(i, 0, 255)];
				n = +r[3]
			} else if (/^hsl/.test(e)) {
				var r = N(e);
				t = L(r), n = r[3]
			} else t = T[e] || e;
			return O[e] = {
				color: t,
				alpha: n
			}
		}

		function P(e) {
			if (D[e]) return D[e];
			var t = document.createElement("div"),
				n = t.style,
				r;
			try {
				n.font = e, r = n.fontFamily.split(",")[0]
			} catch (i) {}
			return D[e] = {
				style: n.fontStyle || _.style,
				variant: n.fontVariant || _.variant,
				weight: n.fontWeight || _.weight,
				size: n.fontSize || _.size,
				family: r || _.family
			}
		}

		function H(e, t) {
			var n = {};
			for (var r in e) n[r] = e[r];
			var i = parseFloat(t.currentStyle.fontSize),
				s = parseFloat(e.size);
			return typeof e.size == "number" ? n.size = e.size : e.size.indexOf("px") != -1 ? n.size = s : e.size.indexOf("em") != -1 ? n.size = i * s : e.size.indexOf("%") != -1 ? n.size = i / 100 * s : e.size.indexOf("pt") != -1 ? n.size = s / .75 : n.size = i, n
		}

		function B(e) {
			return e.style + " " + e.variant + " " + e.weight + " " + e.size + "px '" + e.family + "'"
		}

		function F(e) {
			return j[e] || "square"
		}

		function I(e) {
			this.m_ = E(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = o * 1, this.globalAlpha = 1, this.font = "12px 微软雅黑", this.textAlign = "left", this.textBaseline = "alphabetic", this.canvas = e;
			var t = "width:" + e.clientWidth + "px;height:" + e.clientHeight + "px;overflow:hidden;position:absolute",
				n = e.ownerDocument.createElement("div");
			n.style.cssText = t, e.appendChild(n);
			var r = n.cloneNode(!1);
			r.style.backgroundColor = "#fff", r.style.filter = "alpha(opacity=0)", e.appendChild(r), this.element_ = n, this.scaleX_ = 1, this.scaleY_ = 1, this.lineScale_ = 1
		}

		function R(e, t, n, r) {
			e.currentPath_.push({
				type: "bezierCurveTo",
				cp1x: t.x,
				cp1y: t.y,
				cp2x: n.x,
				cp2y: n.y,
				x: r.x,
				y: r.y
			}), e.currentX_ = r.x, e.currentY_ = r.y
		}

		function U(e, t) {
			var n = M(e.strokeStyle),
				r = n.color,
				i = n.alpha * e.globalAlpha,
				s = e.lineScale_ * e.lineWidth;
			s < 1 && (i *= s), t.push("<g_vml_:stroke", ' opacity="', i, '"', ' joinstyle="', e.lineJoin, '"', ' miterlimit="', e.miterLimit, '"', ' endcap="', F(e.lineCap), '"', ' weight="', s, 'px"', ' color="', r, '" />')
		}

		function z(t, n, r, i) {
			var s = t.fillStyle,
				u = t.scaleX_,
				a = t.scaleY_,
				f = i.x - r.x,
				l = i.y - r.y;
			if (s instanceof $) {
				var c = 0,
					h = {
						x: 0,
						y: 0
					},
					p = 0,
					d = 1;
				if (s.type_ == "gradient") {
					var v = s.x0_ / u,
						m = s.y0_ / a,
						g = s.x1_ / u,
						y = s.y1_ / a,
						b = W(t, v, m),
						w = W(t, g, y),
						E = w.x - b.x,
						S = w.y - b.y;
					c = Math.atan2(E, S) * 180 / Math.PI, c < 0 && (c += 360), c < 1e-6 && (c = 0)
				} else {
					var b = W(t, s.x0_, s.y0_);
					h = {
						x: (b.x - r.x) / f,
						y: (b.y - r.y) / l
					}, f /= u * o, l /= a * o;
					var x = e.max(f, l);
					p = 2 * s.r0_ / x, d = 2 * s.r1_ / x - p
				}
				var T = s.colors_;
				T.sort(function(e, t) {
					return e.offset - t.offset
				});
				var N = T.length,
					C = T[0].color,
					k = T[N - 1].color,
					L = T[0].alpha * t.globalAlpha,
					A = T[N - 1].alpha * t.globalAlpha,
					O = [];
				for (var _ = 0; _ < N; _++) {
					var D = T[_];
					O.push(D.offset * d + p + " " + D.color)
				}
				n.push('<g_vml_:fill type="', s.type_, '"', ' method="none" focus="100%"', ' color="', C, '"', ' color2="', k, '"', ' colors="', O.join(","), '"', ' opacity="', A, '"', ' g_o_:opacity2="', L, '"', ' angle="', c, '"', ' focusposition="', h.x, ",", h.y, '" />')
			} else if (s instanceof J) {
				if (f && l) {
					var P = -r.x,
						H = -r.y;
					n.push("<g_vml_:fill", ' position="', P / f * u * u, ",", H / l * a * a, '"', ' type="tile"', ' src="', s.src_, '" />')
				}
			} else {
				var B = M(t.fillStyle),
					j = B.color,
					F = B.alpha * t.globalAlpha;
				n.push('<g_vml_:fill color="', j, '" opacity="', F, '" />')
			}
		}

		function W(e, t, n) {
			var r = e.m_;
			return {
				x: o * (t * r[0][0] + n * r[1][0] + r[2][0]) - u,
				y: o * (t * r[0][1] + n * r[1][1] + r[2][1]) - u
			}
		}

		function X(e) {
			return isFinite(e[0][0]) && isFinite(e[0][1]) && isFinite(e[1][0]) && isFinite(e[1][1]) && isFinite(e[2][0]) && isFinite(e[2][1])
		}

		function V(e, t, n) {
			if (!X(t)) return;
			e.m_ = t, e.scaleX_ = Math.sqrt(t[0][0] * t[0][0] + t[0][1] * t[0][1]), e.scaleY_ = Math.sqrt(t[1][0] * t[1][0] + t[1][1] * t[1][1]);
			if (n) {
				var r = t[0][0] * t[1][1] - t[0][1] * t[1][0];
				e.lineScale_ = s(i(r))
			}
		}

		function $(e) {
			this.type_ = e, this.x0_ = 0, this.y0_ = 0, this.r0_ = 0, this.x1_ = 0, this.y1_ = 0, this.r1_ = 0, this.colors_ = []
		}

		function J(e, t) {
			Q(e);
			switch (t) {
				case "repeat":
				case null:
				case "":
					this.repetition_ = "repeat";
					break;
				case "repeat-x":
				case "repeat-y":
				case "no-repeat":
					this.repetition_ = t;
					break;
				default:
					K("SYNTAX_ERR")
			}
			this.src_ = e.src, this.width_ = e.width, this.height_ = e.height
		}

		function K(e) {
			throw new G(e)
		}

		function Q(e) {
			(!e || e.nodeType != 1 || e.tagName != "IMG") && K("TYPE_MISMATCH_ERR"), e.readyState != "complete" && K("INVALID_STATE_ERR")
		}

		function G(e) {
			this.code = this[e], this.message = e + ": DOM Exception " + this.code
		}
		var e = Math,
			t = e.round,
			n = e.sin,
			r = e.cos,
			i = e.abs,
			s = e.sqrt,
			o = 10,
			u = o / 2,
			a = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1],
			l = Array.prototype.slice;
		d(document);
		var v = {
			init: function(e) {
				var t = e || document;
				t.createElement("canvas"), t.attachEvent("onreadystatechange", c(this.init_, this, t))
			},
			init_: function(e) {
				var t = e.getElementsByTagName("canvas");
				for (var n = 0; n < t.length; n++) this.initElement(t[n])
			},
			initElement: function(e) {
				if (!e.getContext) {
					e.getContext = f, d(e.ownerDocument), e.innerHTML = "", e.attachEvent("onpropertychange", m), e.attachEvent("onresize", g);
					var t = e.attributes;
					t.width && t.width.specified ? e.style.width = t.width.nodeValue + "px" : e.width = e.clientWidth, t.height && t.height.specified ? e.style.height = t.height.nodeValue + "px" : e.height = e.clientHeight
				}
				return e
			}
		};
		v.init();
		var y = [];
		for (var b = 0; b < 16; b++)
			for (var w = 0; w < 16; w++) y[b * 16 + w] = b.toString(16) + w.toString(16);
		var T = {
				aliceblue: "#F0F8FF",
				antiquewhite: "#FAEBD7",
				aquamarine: "#7FFFD4",
				azure: "#F0FFFF",
				beige: "#F5F5DC",
				bisque: "#FFE4C4",
				black: "#000000",
				blanchedalmond: "#FFEBCD",
				blueviolet: "#8A2BE2",
				brown: "#A52A2A",
				burlywood: "#DEB887",
				cadetblue: "#5F9EA0",
				chartreuse: "#7FFF00",
				chocolate: "#D2691E",
				coral: "#FF7F50",
				cornflowerblue: "#6495ED",
				cornsilk: "#FFF8DC",
				crimson: "#DC143C",
				cyan: "#00FFFF",
				darkblue: "#00008B",
				darkcyan: "#008B8B",
				darkgoldenrod: "#B8860B",
				darkgray: "#A9A9A9",
				darkgreen: "#006400",
				darkgrey: "#A9A9A9",
				darkkhaki: "#BDB76B",
				darkmagenta: "#8B008B",
				darkolivegreen: "#556B2F",
				darkorange: "#FF8C00",
				darkorchid: "#9932CC",
				darkred: "#8B0000",
				darksalmon: "#E9967A",
				darkseagreen: "#8FBC8F",
				darkslateblue: "#483D8B",
				darkslategray: "#2F4F4F",
				darkslategrey: "#2F4F4F",
				darkturquoise: "#00CED1",
				darkviolet: "#9400D3",
				deeppink: "#FF1493",
				deepskyblue: "#00BFFF",
				dimgray: "#696969",
				dimgrey: "#696969",
				dodgerblue: "#1E90FF",
				firebrick: "#B22222",
				floralwhite: "#FFFAF0",
				forestgreen: "#228B22",
				gainsboro: "#DCDCDC",
				ghostwhite: "#F8F8FF",
				gold: "#FFD700",
				goldenrod: "#DAA520",
				grey: "#808080",
				greenyellow: "#ADFF2F",
				honeydew: "#F0FFF0",
				hotpink: "#FF69B4",
				indianred: "#CD5C5C",
				indigo: "#4B0082",
				ivory: "#FFFFF0",
				khaki: "#F0E68C",
				lavender: "#E6E6FA",
				lavenderblush: "#FFF0F5",
				lawngreen: "#7CFC00",
				lemonchiffon: "#FFFACD",
				lightblue: "#ADD8E6",
				lightcoral: "#F08080",
				lightcyan: "#E0FFFF",
				lightgoldenrodyellow: "#FAFAD2",
				lightgreen: "#90EE90",
				lightgrey: "#D3D3D3",
				lightpink: "#FFB6C1",
				lightsalmon: "#FFA07A",
				lightseagreen: "#20B2AA",
				lightskyblue: "#87CEFA",
				lightslategray: "#778899",
				lightslategrey: "#778899",
				lightsteelblue: "#B0C4DE",
				lightyellow: "#FFFFE0",
				limegreen: "#32CD32",
				linen: "#FAF0E6",
				magenta: "#FF00FF",
				mediumaquamarine: "#66CDAA",
				mediumblue: "#0000CD",
				mediumorchid: "#BA55D3",
				mediumpurple: "#9370DB",
				mediumseagreen: "#3CB371",
				mediumslateblue: "#7B68EE",
				mediumspringgreen: "#00FA9A",
				mediumturquoise: "#48D1CC",
				mediumvioletred: "#C71585",
				midnightblue: "#191970",
				mintcream: "#F5FFFA",
				mistyrose: "#FFE4E1",
				moccasin: "#FFE4B5",
				navajowhite: "#FFDEAD",
				oldlace: "#FDF5E6",
				olivedrab: "#6B8E23",
				orange: "#FFA500",
				orangered: "#FF4500",
				orchid: "#DA70D6",
				palegoldenrod: "#EEE8AA",
				palegreen: "#98FB98",
				paleturquoise: "#AFEEEE",
				palevioletred: "#DB7093",
				papayawhip: "#FFEFD5",
				peachpuff: "#FFDAB9",
				peru: "#CD853F",
				pink: "#FFC0CB",
				plum: "#DDA0DD",
				powderblue: "#B0E0E6",
				rosybrown: "#BC8F8F",
				royalblue: "#4169E1",
				saddlebrown: "#8B4513",
				salmon: "#FA8072",
				sandybrown: "#F4A460",
				seagreen: "#2E8B57",
				seashell: "#FFF5EE",
				sienna: "#A0522D",
				skyblue: "#87CEEB",
				slateblue: "#6A5ACD",
				slategray: "#708090",
				slategrey: "#708090",
				snow: "#FFFAFA",
				springgreen: "#00FF7F",
				steelblue: "#4682B4",
				tan: "#D2B48C",
				thistle: "#D8BFD8",
				tomato: "#FF6347",
				turquoise: "#40E0D0",
				violet: "#EE82EE",
				wheat: "#F5DEB3",
				whitesmoke: "#F5F5F5",
				yellowgreen: "#9ACD32"
			},
			O = {},
			_ = {
				style: "normal",
				variant: "normal",
				weight: "normal",
				size: 12,
				family: "微软雅黑"
			},
			D = {},
			j = {
				butt: "flat",
				round: "round"
			},
			q = I.prototype;
		q.clearRect = function() {
			this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null), this.element_.innerHTML = ""
		}, q.beginPath = function() {
			this.currentPath_ = []
		}, q.moveTo = function(e, t) {
			var n = W(this, e, t);
			this.currentPath_.push({
				type: "moveTo",
				x: n.x,
				y: n.y
			}), this.currentX_ = n.x, this.currentY_ = n.y
		}, q.lineTo = function(e, t) {
			var n = W(this, e, t);
			this.currentPath_.push({
				type: "lineTo",
				x: n.x,
				y: n.y
			}), this.currentX_ = n.x, this.currentY_ = n.y
		}, q.bezierCurveTo = function(e, t, n, r, i, s) {
			var o = W(this, i, s),
				u = W(this, e, t),
				a = W(this, n, r);
			R(this, u, a, o)
		}, q.quadraticCurveTo = function(e, t, n, r) {
			var i = W(this, e, t),
				s = W(this, n, r),
				o = {
					x: this.currentX_ + 2 / 3 * (i.x - this.currentX_),
					y: this.currentY_ + 2 / 3 * (i.y - this.currentY_)
				},
				u = {
					x: o.x + (s.x - this.currentX_) / 3,
					y: o.y + (s.y - this.currentY_) / 3
				};
			R(this, o, u, s)
		}, q.arc = function(e, t, i, s, a, f) {
			i *= o;
			var l = f ? "at" : "wa",
				c = e + r(s) * i - u,
				h = t + n(s) * i - u,
				p = e + r(a) * i - u,
				d = t + n(a) * i - u;
			c == p && !f && (c += .125);
			var v = W(this, e, t),
				m = W(this, c, h),
				g = W(this, p, d);
			this.currentPath_.push({
				type: l,
				x: v.x,
				y: v.y,
				radius: i,
				xStart: m.x,
				yStart: m.y,
				xEnd: g.x,
				yEnd: g.y
			})
		}, q.rect = function(e, t, n, r) {
			this.moveTo(e, t), this.lineTo(e + n, t), this.lineTo(e + n, t + r), this.lineTo(e, t + r), this.closePath()
		}, q.strokeRect = function(e, t, n, r) {
			var i = this.currentPath_;
			this.beginPath(), this.moveTo(e, t), this.lineTo(e + n, t), this.lineTo(e + n, t + r), this.lineTo(e, t + r), this.closePath(), this.stroke(), this.currentPath_ = i
		}, q.fillRect = function(e, t, n, r) {
			var i = this.currentPath_;
			this.beginPath(), this.moveTo(e, t), this.lineTo(e + n, t), this.lineTo(e + n, t + r), this.lineTo(e, t + r), this.closePath(), this.fill(), this.currentPath_ = i
		}, q.createLinearGradient = function(e, t, n, r) {
			var i = new $("gradient");
			return i.x0_ = e, i.y0_ = t, i.x1_ = n, i.y1_ = r, i
		}, q.createRadialGradient = function(e, t, n, r, i, s) {
			var o = new $("gradientradial");
			return o.x0_ = e, o.y0_ = t, o.r0_ = n, o.x1_ = r, o.y1_ = i, o.r1_ = s, o
		}, q.drawImage = function(n, r) {
			var i, s, u, a, f, l, c, h, p = n.runtimeStyle.width,
				d = n.runtimeStyle.height;
			n.runtimeStyle.width = "auto", n.runtimeStyle.height = "auto";
			var v = n.width,
				m = n.height;
			n.runtimeStyle.width = p, n.runtimeStyle.height = d;
			if (arguments.length == 3) i = arguments[1], s = arguments[2], f = l = 0, c = u = v, h = a = m;
			else if (arguments.length == 5) i = arguments[1], s = arguments[2], u = arguments[3], a = arguments[4], f = l = 0, c = v, h = m;
			else {
				if (arguments.length != 9) throw Error("Invalid number of arguments");
				f = arguments[1], l = arguments[2], c = arguments[3], h = arguments[4], i = arguments[5], s = arguments[6], u = arguments[7], a = arguments[8]
			}
			var g = W(this, i, s),
				y = c / 2,
				b = h / 2,
				w = [],
				E = 10,
				S = 10,
				x = N = 1;
			w.push(" <g_vml_:group", ' coordsize="', o * E, ",", o * S, '"', ' coordorigin="0,0"', ' style="width:', E, "px;height:", S, "px;position:absolute;");
			if (this.m_[0][0] != 1 || this.m_[0][1] || this.m_[1][1] != 1 || this.m_[1][0]) {
				var T = [],
					x = this.scaleX_,
					N = this.scaleY_;
				T.push("M11=", this.m_[0][0] / x, ",", "M12=", this.m_[1][0] / N, ",", "M21=", this.m_[0][1] / x, ",", "M22=", this.m_[1][1] / N, ",", "Dx=", t(g.x / o), ",", "Dy=", t(g.y / o), "");
				var C = g,
					k = W(this, i + u, s),
					L = W(this, i, s + a),
					A = W(this, i + u, s + a);
				C.x = e.max(C.x, k.x, L.x, A.x), C.y = e.max(C.y, k.y, L.y, A.y), w.push("padding:0 ", t(C.x / o), "px ", t(C.y / o), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", T.join(""), ", SizingMethod='clip');")
			} else w.push("top:", t(g.y / o), "px;left:", t(g.x / o), "px;");
			w.push(' ">'), (f || l) && w.push('<div style="overflow: hidden; width:', Math.ceil((u + f * u / c) * x), "px;", " height:", Math.ceil((a + l * a / h) * N), "px;", " filter:progid:DxImageTransform.Microsoft.Matrix(Dx=", -f * u / c * x, ",Dy=", -l * a / h * N, ');">'), w.push('<div style="width:', Math.round(x * v * u / c), "px;", " height:", Math.round(N * m * a / h), "px;", " filter:"), this.globalAlpha < 1 && w.push(" progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.globalAlpha * 100 + ")"), w.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", n.src, ',sizingMethod=scale)">'), (f || l) && w.push("</div>"), w.push("</div></div>"), this.element_.insertAdjacentHTML("BeforeEnd", w.join(""))
		}, q.stroke = function(e) {
			var n = [],
				r = !1,
				i = 10,
				s = 10;
			n.push("<g_vml_:shape", ' filled="', !!e, '"', ' style="position:absolute;width:', i, "px;height:", s, 'px;"', ' coordorigin="0,0"', ' coordsize="', o * i, ",", o * s, '"', ' stroked="', !e, '"', ' path="');
			var u = !1,
				a = {
					x: null,
					y: null
				},
				f = {
					x: null,
					y: null
				};
			for (var l = 0; l < this.currentPath_.length; l++) {
				var c = this.currentPath_[l],
					h;
				switch (c.type) {
					case "moveTo":
						h = c, n.push(" m ", t(c.x), ",", t(c.y));
						break;
					case "lineTo":
						n.push(" l ", t(c.x), ",", t(c.y));
						break;
					case "close":
						n.push(" x "), c = null;
						break;
					case "bezierCurveTo":
						n.push(" c ", t(c.cp1x), ",", t(c.cp1y), ",", t(c.cp2x), ",", t(c.cp2y), ",", t(c.x), ",", t(c.y));
						break;
					case "at":
					case "wa":
						n.push(" ", c.type, " ", t(c.x - this.scaleX_ * c.radius), ",", t(c.y - this.scaleY_ * c.radius), " ", t(c.x + this.scaleX_ * c.radius), ",", t(c.y + this.scaleY_ * c.radius), " ", t(c.xStart), ",", t(c.yStart), " ", t(c.xEnd), ",", t(c.yEnd))
				}
				if (c) {
					if (a.x == null || c.x < a.x) a.x = c.x;
					if (f.x == null || c.x > f.x) f.x = c.x;
					if (a.y == null || c.y < a.y) a.y = c.y;
					if (f.y == null || c.y > f.y) f.y = c.y
				}
			}
			n.push(' ">'), e ? z(this, n, a, f) : U(this, n), n.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", n.join(""))
		}, q.fill = function() {
			this.stroke(!0)
		}, q.closePath = function() {
			this.currentPath_.push({
				type: "close"
			})
		}, q.save = function() {
			var e = {};
			x(this, e), this.aStack_.push(e), this.mStack_.push(this.m_), this.m_ = S(E(), this.m_)
		}, q.restore = function() {
			this.aStack_.length && (x(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
		}, q.translate = function(e, t) {
			var n = [
				[1, 0, 0],
				[0, 1, 0],
				[e, t, 1]
			];
			V(this, S(n, this.m_), !1)
		}, q.rotate = function(e) {
			var t = r(e),
				i = n(e),
				s = [
					[t, i, 0],
					[-i, t, 0],
					[0, 0, 1]
				];
			V(this, S(s, this.m_), !1)
		}, q.scale = function(e, t) {
			var n = [
				[e, 0, 0],
				[0, t, 0],
				[0, 0, 1]
			];
			V(this, S(n, this.m_), !0)
		}, q.transform = function(e, t, n, r, i, s) {
			var o = [
				[e, t, 0],
				[n, r, 0],
				[i, s, 1]
			];
			V(this, S(o, this.m_), !0)
		}, q.setTransform = function(e, t, n, r, i, s) {
			var o = [
				[e, t, 0],
				[n, r, 0],
				[i, s, 1]
			];
			V(this, o, !0)
		}, q.drawText_ = function(e, n, r, i, s) {
			var u = this.m_,
				a = 1e3,
				f = 0,
				l = a,
				c = {
					x: 0,
					y: 0
				},
				p = [],
				d = H(P(this.font), this.element_),
				v = B(d),
				m = this.element_.currentStyle,
				g = this.textAlign.toLowerCase();
			switch (g) {
				case "left":
				case "center":
				case "right":
					break;
				case "end":
					g = m.direction == "ltr" ? "right" : "left";
					break;
				case "start":
					g = m.direction == "rtl" ? "right" : "left";
					break;
				default:
					g = "left"
			}
			switch (this.textBaseline) {
				case "hanging":
				case "top":
					c.y = d.size / 1.75;
					break;
				case "middle":
					break;
				default:
				case null:
				case "alphabetic":
				case "ideographic":
				case "bottom":
					c.y = -d.size / 2.25
			}
			switch (g) {
				case "right":
					f = a, l = .05;
					break;
				case "center":
					f = l = a / 2
			}
			var y = W(this, n + c.x, r + c.y);
			p.push('<g_vml_:line from="', -f, ' 0" to="', l, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !s, '" stroked="', !!s, '" style="position:absolute;width:1px;height:1px;">'), s ? U(this, p) : z(this, p, {
				x: -f,
				y: 0
			}, {
				x: l,
				y: d.size
			});
			var b = u[0][0].toFixed(3) + "," + u[1][0].toFixed(3) + "," + u[0][1].toFixed(3) + "," + u[1][1].toFixed(3) + ",0,0",
				w = t(y.x / o) + "," + t(y.y / o);
			p.push('<g_vml_:skew on="t" matrix="', b, '" ', ' offset="', w, '" origin="', f, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', h(e), '" style="v-text-align:', g, ";font:", h(v), '" /></g_vml_:line>'), this.element_.insertAdjacentHTML("beforeEnd", p.join(""))
		}, q.fillText = function(e, t, n, r) {
			this.drawText_(e, t, n, r, !1)
		}, q.strokeText = function(e, t, n, r) {
			this.drawText_(e, t, n, r, !0)
		}, q.measureText = function(e) {
			if (!this.textMeasureEl_) {
				var t = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
				this.element_.insertAdjacentHTML("beforeEnd", t), this.textMeasureEl_ = this.element_.lastChild
			}
			var n = this.element_.ownerDocument;
			this.textMeasureEl_.innerHTML = "";
			try {
				this.textMeasureEl_.style.font = this.font
			} catch (r) {}
			return this.textMeasureEl_.appendChild(n.createTextNode(e)), {
				width: this.textMeasureEl_.offsetWidth
			}
		}, q.clip = function() {}, q.arcTo = function() {}, q.createPattern = function(e, t) {
			return new J(e, t)
		}, $.prototype.addColorStop = function(e, t) {
			t = M(t), this.colors_.push({
				offset: e,
				color: t.color,
				alpha: t.alpha
			})
		};
		var Y = G.prototype = new Error;
		Y.INDEX_SIZE_ERR = 1, Y.DOMSTRING_SIZE_ERR = 2, Y.HIERARCHY_REQUEST_ERR = 3, Y.WRONG_DOCUMENT_ERR = 4, Y.INVALID_CHARACTER_ERR = 5, Y.NO_DATA_ALLOWED_ERR = 6, Y.NO_MODIFICATION_ALLOWED_ERR = 7, Y.NOT_FOUND_ERR = 8, Y.NOT_SUPPORTED_ERR = 9, Y.INUSE_ATTRIBUTE_ERR = 10, Y.INVALID_STATE_ERR = 11, Y.SYNTAX_ERR = 12, Y.INVALID_MODIFICATION_ERR = 13, Y.NAMESPACE_ERR = 14, Y.INVALID_ACCESS_ERR = 15, Y.VALIDATION_ERR = 16, Y.TYPE_MISMATCH_ERR = 17, G_vmlCanvasManager = v, CanvasRenderingContext2D = I, CanvasGradient = $, CanvasPattern = J, DOMException = G
	}(), G_vmlCanvasManager
}), define("zrender/tool/util", ["require", "../dep/excanvas"], function(e) {
	function r(e) {
		return e && e.nodeType === 1 && typeof e.nodeName == "string"
	}

	function i(e) {
		if (typeof e == "object" && e !== null) {
			var s = e;
			if (e instanceof Array) {
				s = [];
				for (var o = 0, u = e.length; o < u; o++) s[o] = i(e[o])
			} else if (!t[n.call(e)] && !r(e)) {
				s = {};
				for (var a in e) e.hasOwnProperty(a) && (s[a] = i(e[a]))
			}
			return s
		}
		return e
	}

	function s(e, i, s, u) {
		if (i.hasOwnProperty(s)) {
			var a = e[s];
			if (typeof a == "object" && !t[n.call(a)] && !r(a)) o(e[s], i[s], u);
			else if (u || !(s in e)) e[s] = i[s]
		}
	}

	function o(e, t, n) {
		for (var r in t) s(e, t, r, n);
		return e
	}

	function a() {
		if (!u) {
			e("../dep/excanvas");
			if (window.G_vmlCanvasManager) {
				var t = document.createElement("div");
				t.style.position = "absolute", t.style.top = "-1000px", document.body.appendChild(t), u = G_vmlCanvasManager.initElement(t).getContext("2d")
			} else u = document.createElement("canvas").getContext("2d")
		}
		return u
	}

	function v() {
		return l || (f = document.createElement("canvas"), c = f.width, h = f.height, l = f.getContext("2d")), l
	}

	function m(e, t) {
		var n = 100,
			r;
		e + p > c && (c = e + p + n, f.width = c, r = !0), t + d > h && (h = t + d + n, f.height = h, r = !0), e < -p && (p = Math.ceil(-e / n) * n, c += p, f.width = c, r = !0), t < -d && (d = Math.ceil(-t / n) * n, h += d, f.height = h, r = !0), r && l.translate(p, d)
	}

	function g() {
		return {
			x: p,
			y: d
		}
	}

	function y(e, t) {
		if (e.indexOf) return e.indexOf(t);
		for (var n = 0, r = e.length; n < r; n++)
			if (e[n] === t) return n;
		return -1
	}

	function b(e, t) {
		function r() {}
		var n = e.prototype;
		r.prototype = t.prototype, e.prototype = new r;
		for (var i in n) e.prototype[i] = n[i];
		e.constructor = e
	}
	var t = {
			"[object Function]": 1,
			"[object RegExp]": 1,
			"[object Date]": 1,
			"[object Error]": 1,
			"[object CanvasGradient]": 1
		},
		n = Object.prototype.toString,
		u, f, l, c, h, p = 0,
		d = 0;
	return {
		inherits: b,
		clone: i,
		merge: o,
		getContext: a,
		getPixelContext: v,
		getPixelOffset: g,
		adjustCanvasSize: m,
		indexOf: y
	}
}), define("zrender/config", [], function() {
	var e = {
		EVENT: {
			RESIZE: "resize",
			CLICK: "click",
			DBLCLICK: "dblclick",
			MOUSEWHEEL: "mousewheel",
			MOUSEMOVE: "mousemove",
			MOUSEOVER: "mouseover",
			MOUSEOUT: "mouseout",
			MOUSEDOWN: "mousedown",
			MOUSEUP: "mouseup",
			GLOBALOUT: "globalout",
			DRAGSTART: "dragstart",
			DRAGEND: "dragend",
			DRAGENTER: "dragenter",
			DRAGOVER: "dragover",
			DRAGLEAVE: "dragleave",
			DROP: "drop",
			touchClickDelay: 300
		},
		catchBrushException: !1,
		debugMode: 0,
		devicePixelRatio: Math.max(window.devicePixelRatio || 1, 1)
	};
	return e
}), define("zrender/tool/log", ["require", "../config"], function(e) {
	var t = e("../config");
	return function() {
		if (t.debugMode === 0) return;
		if (t.debugMode == 1)
			for (var e in arguments) throw new Error(arguments[e]);
		else if (t.debugMode > 1)
			for (var e in arguments) console.log(arguments[e])
	}
}), define("zrender/tool/guid", [], function() {
	var e = 2311;
	return function() {
		return "zrender__" + e++
	}
}), define("zrender/tool/env", [], function() {
	function e(e) {
		var t = this.os = {},
			n = this.browser = {},
			r = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
			i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
			s = e.match(/(iPad).*OS\s([\d_]+)/),
			o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
			u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
			a = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			f = a && e.match(/TouchPad/),
			l = e.match(/Kindle\/([\d.]+)/),
			c = e.match(/Silk\/([\d._]+)/),
			h = e.match(/(BlackBerry).*Version\/([\d.]+)/),
			p = e.match(/(BB10).*Version\/([\d.]+)/),
			d = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			v = e.match(/PlayBook/),
			m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
			g = e.match(/Firefox\/([\d.]+)/),
			y = e.match(/MSIE ([\d.]+)/),
			b = r && e.match(/Mobile\//) && !m,
			w = e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m,
			y = e.match(/MSIE\s([\d.]+)/);
		if (n.webkit = !!r) n.version = r[1];
		return i && (t.android = !0, t.version = i[2]), u && !o && (t.ios = t.iphone = !0, t.version = u[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), o && (t.ios = t.ipod = !0, t.version = o[3] ? o[3].replace(/_/g, ".") : null), a && (t.webos = !0, t.version = a[2]), f && (t.touchpad = !0), h && (t.blackberry = !0, t.version = h[2]), p && (t.bb10 = !0, t.version = p[2]), d && (t.rimtabletos = !0, t.version = d[2]), v && (n.playbook = !0), l && (t.kindle = !0, t.version = l[1]), c && (n.silk = !0, n.version = c[1]), !c && t.android && e.match(/Kindle Fire/) && (n.silk = !0), m && (n.chrome = !0, n.version = m[1]), g && (n.firefox = !0, n.version = g[1]), y && (n.ie = !0, n.version = y[1]), b && (e.match(/Safari/) || !!t.ios) && (n.safari = !0), w && (n.webview = !0), y && (n.ie = !0, n.version = y[1]), t.tablet = !!(s || v || i && !e.match(/Mobile/) || g && e.match(/Tablet/) || y && !e.match(/Phone/) && e.match(/Touch/)), t.phone = !!(!t.tablet && !t.ipod && (i || u || a || h || p || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/) || y && e.match(/Touch/))), {
			browser: n,
			os: t,
			canvasSupported: document.createElement("canvas").getContext ? !0 : !1
		}
	}
	return e(navigator.userAgent)
}), define("zrender/mixin/Eventful", ["require"], function(e) {
	var t = function() {
		this._handlers = {}
	};
	return t.prototype.one = function(e, t, n) {
		var r = this._handlers;
		return !t || !e ? this : (r[e] || (r[e] = []), r[e].push({
			h: t,
			one: !0,
			ctx: n || this
		}), this)
	}, t.prototype.bind = function(e, t, n) {
		var r = this._handlers;
		return !t || !e ? this : (r[e] || (r[e] = []), r[e].push({
			h: t,
			one: !1,
			ctx: n || this
		}), this)
	}, t.prototype.unbind = function(e, t) {
		var n = this._handlers;
		if (!e) return this._handlers = {}, this;
		if (t) {
			if (n[e]) {
				var r = [];
				for (var i = 0, s = n[e].length; i < s; i++) n[e][i]["h"] != t && r.push(n[e][i]);
				n[e] = r
			}
			n[e] && n[e].length === 0 && delete n[e]
		} else delete n[e];
		return this
	}, t.prototype.dispatch = function(e) {
		if (this._handlers[e]) {
			var t = arguments,
				n = t.length;
			n > 3 && (t = Array.prototype.slice.call(t, 1));
			var r = this._handlers[e],
				i = r.length;
			for (var s = 0; s < i;) {
				switch (n) {
					case 1:
						r[s].h.call(r[s].ctx);
						break;
					case 2:
						r[s].h.call(r[s].ctx, t[1]);
						break;
					case 3:
						r[s].h.call(r[s].ctx, t[1], t[2]);
						break;
					default:
						r[s].h.apply(r[s].ctx, t)
				}
				r[s].one ? (r.splice(s, 1), i--) : s++
			}
		}
		return this
	}, t.prototype.dispatchWithContext = function(e) {
		if (this._handlers[e]) {
			var t = arguments,
				n = t.length;
			n > 4 && (t = Array.prototype.slice.call(t, 1, t.length - 1));
			var r = t[t.length - 1],
				i = this._handlers[e],
				s = i.length;
			for (var o = 0; o < s;) {
				switch (n) {
					case 1:
						i[o].h.call(r);
						break;
					case 2:
						i[o].h.call(r, t[1]);
						break;
					case 3:
						i[o].h.call(r, t[1], t[2]);
						break;
					default:
						i[o].h.apply(r, t)
				}
				i[o].one ? (i.splice(o, 1), s--) : o++
			}
		}
		return this
	}, t
}), define("zrender/tool/event", ["require", "../mixin/Eventful"], function(e) {
	function n(e) {
		return typeof e.zrenderX != "undefined" && e.zrenderX || typeof e.offsetX != "undefined" && e.offsetX || typeof e.layerX != "undefined" && e.layerX || typeof e.clientX != "undefined" && e.clientX
	}

	function r(e) {
		return typeof e.zrenderY != "undefined" && e.zrenderY || typeof e.offsetY != "undefined" && e.offsetY || typeof e.layerY != "undefined" && e.layerY || typeof e.clientY != "undefined" && e.clientY
	}

	function i(e) {
		return typeof e.zrenderDelta != "undefined" && e.zrenderDelta || typeof e.wheelDelta != "undefined" && e.wheelDelta || typeof e.detail != "undefined" && -e.detail
	}
	var t = e("../mixin/Eventful"),
		s = typeof window.addEventListener == "function" ? function(e) {
			e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0
		} : function(e) {
			e.returnValue = !1, e.cancelBubble = !0
		};
	return {
		getX: n,
		getY: r,
		getDelta: i,
		stop: s,
		Dispatcher: t
	}
}), define("zrender/tool/vector", [], function() {
	var e = typeof Float32Array == "undefined" ? Array : Float32Array,
		t = {
			create: function(t, n) {
				var r = new e(2);
				return r[0] = t || 0, r[1] = n || 0, r
			},
			copy: function(e, t) {
				return e[0] = t[0], e[1] = t[1], e
			},
			set: function(e, t, n) {
				return e[0] = t, e[1] = n, e
			},
			add: function(e, t, n) {
				return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e
			},
			scaleAndAdd: function(e, t, n, r) {
				return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e
			},
			sub: function(e, t, n) {
				return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e
			},
			len: function(e) {
				return Math.sqrt(this.lenSquare(e))
			},
			lenSquare: function(e) {
				return e[0] * e[0] + e[1] * e[1]
			},
			mul: function(e, t, n) {
				return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e
			},
			div: function(e, t, n) {
				return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e
			},
			dot: function(e, t) {
				return e[0] * t[0] + e[1] * t[1]
			},
			scale: function(e, t, n) {
				return e[0] = t[0] * n, e[1] = t[1] * n, e
			},
			normalize: function(e, n) {
				var r = t.len(n);
				return r === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = n[0] / r, e[1] = n[1] / r), e
			},
			distance: function(e, t) {
				return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]))
			},
			distanceSquare: function(e, t) {
				return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1])
			},
			negate: function(e, t) {
				return e[0] = -t[0], e[1] = -t[1], e
			},
			lerp: function(e, t, n, r) {
				return e[0] = t[0] + r * (n[0] - t[0]), e[1] = t[1] + r * (n[1] - t[1]), e
			},
			applyTransform: function(e, t, n) {
				var r = t[0],
					i = t[1];
				return e[0] = n[0] * r + n[2] * i + n[4], e[1] = n[1] * r + n[3] * i + n[5], e
			},
			min: function(e, t, n) {
				return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e
			},
			max: function(e, t, n) {
				return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e
			}
		};
	return t.length = t.len, t.lengthSquare = t.lenSquare, t.dist = t.distance, t.distSquare = t.distanceSquare, t
}), define("zrender/tool/matrix", [], function() {
	var e = typeof Float32Array == "undefined" ? Array : Float32Array,
		t = {
			create: function() {
				var n = new e(6);
				return t.identity(n), n
			},
			identity: function(e) {
				return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
			},
			copy: function(e, t) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
			},
			mul: function(e, t, n) {
				return e[0] = t[0] * n[0] + t[2] * n[1], e[1] = t[1] * n[0] + t[3] * n[1], e[2] = t[0] * n[2] + t[2] * n[3], e[3] = t[1] * n[2] + t[3] * n[3], e[4] = t[0] * n[4] + t[2] * n[5] + t[4], e[5] = t[1] * n[4] + t[3] * n[5] + t[5], e
			},
			translate: function(e, t, n) {
				return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + n[0], e[5] = t[5] + n[1], e
			},
			rotate: function(e, t, n) {
				var r = t[0],
					i = t[2],
					s = t[4],
					o = t[1],
					u = t[3],
					a = t[5],
					f = Math.sin(n),
					l = Math.cos(n);
				return e[0] = r * l + o * f, e[1] = -r * f + o * l, e[2] = i * l + u * f, e[3] = -i * f + l * u, e[4] = l * s + f * a, e[5] = l * a - f * s, e
			},
			scale: function(e, t, n) {
				var r = n[0],
					i = n[1];
				return e[0] = t[0] * r, e[1] = t[1] * i, e[2] = t[2] * r, e[3] = t[3] * i, e[4] = t[4] * r, e[5] = t[5] * i, e
			},
			invert: function(e, t) {
				var n = t[0],
					r = t[2],
					i = t[4],
					s = t[1],
					o = t[3],
					u = t[5],
					a = n * o - s * r;
				return a ? (a = 1 / a, e[0] = o * a, e[1] = -s * a, e[2] = -r * a, e[3] = n * a, e[4] = (r * u - o * i) * a, e[5] = (s * i - n * u) * a, e) : null
			},
			mulVector: function(e, t, n) {
				var r = t[0],
					i = t[2],
					s = t[4],
					o = t[1],
					u = t[3],
					a = t[5];
				return e[0] = n[0] * r + n[1] * i + s, e[1] = n[0] * o + n[1] * u + a, e
			}
		};
	return t
}), define("zrender/Handler", ["require", "./config", "./tool/env", "./tool/event", "./tool/util", "./tool/vector", "./tool/matrix", "./mixin/Eventful"], function(e) {
	function c(e, t) {
		return function(n) {
			return e.call(t, n)
		}
	}

	function h(e, t) {
		return function(n, r, i) {
			return e.call(t, n, r, i)
		}
	}

	function p(e) {
		var t = f.length;
		while (t--) {
			var n = f[t];
			e["_" + n + "Handler"] = c(l[n], e)
		}
	}

	function m(e, t, n) {
		if (this._draggingTarget && this._draggingTarget.id == e.id || e.isSilent()) return !1;
		var r = this._event;
		if (e.isCover(t, n)) {
			e.hoverable && this.storage.addHover(e);
			var i = e.parent;
			while (i) {
				if (i.clipShape && !i.clipShape.isCover(this._mouseX, this._mouseY)) return !1;
				i = i.parent
			}
			return this._lastHover != e && (this._processOutShape(r), this._processDragLeave(r), this._lastHover = e, this._processDragEnter(r)), this._processOverShape(r), this._processDragOver(r), this._hasfound = 1, !0
		}
		return !1
	}
	var t = e("./config"),
		n = e("./tool/env"),
		r = e("./tool/event"),
		i = e("./tool/util"),
		s = e("./tool/vector"),
		o = e("./tool/matrix"),
		u = t.EVENT,
		a = e("./mixin/Eventful"),
		f = ["resize", "click", "dblclick", "mousewheel", "mousemove", "mouseout", "mouseup", "mousedown", "touchstart", "touchend", "touchmove"],
		l = {
			resize: function(e) {
				e = e || window.event, this._lastHover = null, this._isMouseDown = 0, this.dispatch(u.RESIZE, e)
			},
			click: function(e) {
				e = this._zrenderEventFixed(e);
				var t = this._lastHover;
				(t && t.clickable || !t) && this._clickThreshold < 5 && this._dispatchAgency(t, u.CLICK, e), this._mousemoveHandler(e)
			},
			dblclick: function(e) {
				e = e || window.event, e = this._zrenderEventFixed(e);
				var t = this._lastHover;
				(t && t.clickable || !t) && this._clickThreshold < 5 && this._dispatchAgency(t, u.DBLCLICK, e), this._mousemoveHandler(e)
			},
			mousewheel: function(e) {
				e = this._zrenderEventFixed(e);
				var t = e.wheelDelta || -e.detail,
					n = t > 0 ? 1.1 : 1 / 1.1,
					i = !1,
					s = this._mouseX,
					o = this._mouseY;
				this.painter.eachBuildinLayer(function(t) {
					var u = t.position;
					if (t.zoomable) {
						t.__zoom = t.__zoom || 1;
						var a = t.__zoom;
						a *= n, a = Math.max(Math.min(t.maxZoom, a), t.minZoom), n = a / t.__zoom, t.__zoom = a, u[0] -= (s - u[0]) * (n - 1), u[1] -= (o - u[1]) * (n - 1), t.scale[0] *= n, t.scale[1] *= n, t.dirty = !0, i = !0, r.stop(e)
					}
				}), i && this.painter.refresh(), this._dispatchAgency(this._lastHover, u.MOUSEWHEEL, e), this._mousemoveHandler(e)
			},
			mousemove: function(e) {
				if (this.painter.isLoading()) return;
				e = this._zrenderEventFixed(e), this._lastX = this._mouseX, this._lastY = this._mouseY, this._mouseX = r.getX(e), this._mouseY = r.getY(e);
				var t = this._mouseX - this._lastX,
					n = this._mouseY - this._lastY;
				this._processDragStart(e), this._hasfound = 0, this._event = e, this._iterateAndFindHover();
				if (!this._hasfound) {
					if (!this._draggingTarget || this._lastHover && this._lastHover != this._draggingTarget) this._processOutShape(e), this._processDragLeave(e);
					this._lastHover = null, this.storage.delHover(), this.painter.clearHover()
				}
				var i = "default";
				if (this._draggingTarget) this.storage.drift(this._draggingTarget.id, t, n), this._draggingTarget.modSelf(), this.storage.addHover(this._draggingTarget), this._clickThreshold++;
				else if (this._isMouseDown) {
					var s = !1;
					this.painter.eachBuildinLayer(function(e) {
						e.panable && (i = "move", e.position[0] += t, e.position[1] += n, s = !0, e.dirty = !0)
					}), s && this.painter.refresh()
				}
				this._draggingTarget || this._hasfound && this._lastHover.draggable ? i = "move" : this._hasfound && this._lastHover.clickable && (i = "pointer"), this.root.style.cursor = i, this._dispatchAgency(this._lastHover, u.MOUSEMOVE, e), (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) && this.painter.refreshHover()
			},
			mouseout: function(e) {
				e = this._zrenderEventFixed(e);
				var t = e.toElement || e.relatedTarget;
				if (t != this.root)
					while (t && t.nodeType != 9) {
						if (t == this.root) {
							this._mousemoveHandler(e);
							return
						}
						t = t.parentNode
					}
				e.zrenderX = this._lastX, e.zrenderY = this._lastY, this.root.style.cursor = "default", this._isMouseDown = 0, this._processOutShape(e), this._processDrop(e), this._processDragEnd(e), this.painter.isLoading() || this.painter.refreshHover(), this.dispatch(u.GLOBALOUT, e)
			},
			mousedown: function(e) {
				this._clickThreshold = 0;
				if (this._lastDownButton == 2) {
					this._lastDownButton = e.button, this._mouseDownTarget = null;
					return
				}
				this._lastMouseDownMoment = new Date, e = this._zrenderEventFixed(e), this._isMouseDown = 1, this._mouseDownTarget = this._lastHover, this._dispatchAgency(this._lastHover, u.MOUSEDOWN, e), this._lastDownButton = e.button
			},
			mouseup: function(e) {
				e = this._zrenderEventFixed(e), this.root.style.cursor = "default", this._isMouseDown = 0, this._mouseDownTarget = null, this._dispatchAgency(this._lastHover, u.MOUSEUP, e), this._processDrop(e), this._processDragEnd(e)
			},
			touchstart: function(e) {
				e = this._zrenderEventFixed(e, !0), this._lastTouchMoment = new Date, this._mobileFindFixed(e), this._mousedownHandler(e)
			},
			touchmove: function(e) {
				e = this._zrenderEventFixed(e, !0), this._mousemoveHandler(e), this._isDragging && r.stop(e)
			},
			touchend: function(e) {
				e = this._zrenderEventFixed(e, !0), this._mouseupHandler(e);
				var t = new Date;
				t - this._lastTouchMoment < u.touchClickDelay && (this._mobileFindFixed(e), this._clickHandler(e), t - this._lastClickMoment < u.touchClickDelay / 2 && (this._dblclickHandler(e), this._lastHover && this._lastHover.clickable && r.stop(e)), this._lastClickMoment = t), this.painter.clearHover()
			}
		},
		d = function(e, t, r) {
			a.call(this), this.root = e, this.storage = t, this.painter = r, this._lastX = this._lastY = this._mouseX = this._mouseY = 0, this._findHover = h(m, this), this._domHover = r.getDomHover(), p(this), window.addEventListener ? (window.addEventListener("resize", this._resizeHandler), n.os.tablet || n.os.phone ? (e.addEventListener("touchstart", this._touchstartHandler), e.addEventListener("touchmove", this._touchmoveHandler), e.addEventListener("touchend", this._touchendHandler)) : (e.addEventListener("click", this._clickHandler), e.addEventListener("dblclick", this._dblclickHandler), e.addEventListener("mousewheel", this._mousewheelHandler), e.addEventListener("mousemove", this._mousemoveHandler), e.addEventListener("mousedown", this._mousedownHandler), e.addEventListener("mouseup", this._mouseupHandler)), e.addEventListener("DOMMouseScroll", this._mousewheelHandler), e.addEventListener("mouseout", this._mouseoutHandler)) : (window.attachEvent("onresize", this._resizeHandler), e.attachEvent("onclick", this._clickHandler), e.ondblclick = this._dblclickHandler, e.attachEvent("onmousewheel", this._mousewheelHandler), e.attachEvent("onmousemove", this._mousemoveHandler), e.attachEvent("onmouseout", this._mouseoutHandler), e.attachEvent("onmousedown", this._mousedownHandler), e.attachEvent("onmouseup", this._mouseupHandler))
		};
	d.prototype.on = function(e, t, n) {
		return this.bind(e, t, n), this
	}, d.prototype.un = function(e, t) {
		return this.unbind(e, t), this
	}, d.prototype.trigger = function(e, t) {
		switch (e) {
			case u.RESIZE:
			case u.CLICK:
			case u.DBLCLICK:
			case u.MOUSEWHEEL:
			case u.MOUSEMOVE:
			case u.MOUSEDOWN:
			case u.MOUSEUP:
			case u.MOUSEOUT:
				this["_" + e + "Handler"](t)
		}
	}, d.prototype.dispose = function() {
		var e = this.root;
		window.removeEventListener ? (window.removeEventListener("resize", this._resizeHandler), n.os.tablet || n.os.phone ? (e.removeEventListener("touchstart", this._touchstartHandler), e.removeEventListener("touchmove", this._touchmoveHandler), e.removeEventListener("touchend", this._touchendHandler)) : (e.removeEventListener("click", this._clickHandler), e.removeEventListener("dblclick", this._dblclickHandler), e.removeEventListener("mousewheel", this._mousewheelHandler), e.removeEventListener("mousemove", this._mousemoveHandler), e.removeEventListener("mousedown", this._mousedownHandler), e.removeEventListener("mouseup", this._mouseupHandler)), e.removeEventListener("DOMMouseScroll", this._mousewheelHandler), e.removeEventListener("mouseout", this._mouseoutHandler)) : (window.detachEvent("onresize", this._resizeHandler), e.detachEvent("onclick", this._clickHandler), e.detachEvent("dblclick", this._dblclickHandler), e.detachEvent("onmousewheel", this._mousewheelHandler), e.detachEvent("onmousemove", this._mousemoveHandler), e.detachEvent("onmouseout", this._mouseoutHandler), e.detachEvent("onmousedown", this._mousedownHandler), e.detachEvent("onmouseup", this._mouseupHandler)), this.root = this._domHover = this.storage = this.painter = null, this.un()
	}, d.prototype._processDragStart = function(e) {
		var t = this._lastHover;
		if (this._isMouseDown && t && t.draggable && !this._draggingTarget && this._mouseDownTarget == t) {
			if (t.dragEnableTime && new Date - this._lastMouseDownMoment < t.dragEnableTime) return;
			var n = t;
			this._draggingTarget = n, this._isDragging = 1, n.invisible = !0, this.storage.mod(n.id), this._dispatchAgency(n, u.DRAGSTART, e), this.painter.refresh()
		}
	}, d.prototype._processDragEnter = function(e) {
		this._draggingTarget && this._dispatchAgency(this._lastHover, u.DRAGENTER, e, this._draggingTarget)
	}, d.prototype._processDragOver = function(e) {
		this._draggingTarget && this._dispatchAgency(this._lastHover, u.DRAGOVER, e, this._draggingTarget)
	}, d.prototype._processDragLeave = function(e) {
		this._draggingTarget && this._dispatchAgency(this._lastHover, u.DRAGLEAVE, e, this._draggingTarget)
	}, d.prototype._processDrop = function(e) {
		this._draggingTarget && (this._draggingTarget.invisible = !1, this.storage.mod(this._draggingTarget.id), this.painter.refresh(), this._dispatchAgency(this._lastHover, u.DROP, e, this._draggingTarget))
	}, d.prototype._processDragEnd = function(e) {
		this._draggingTarget && (this._dispatchAgency(this._draggingTarget, u.DRAGEND, e), this._lastHover = null), this._isDragging = 0, this._draggingTarget = null
	}, d.prototype._processOverShape = function(e) {
		this._dispatchAgency(this._lastHover, u.MOUSEOVER, e)
	}, d.prototype._processOutShape = function(e) {
		this._dispatchAgency(this._lastHover, u.MOUSEOUT, e)
	}, d.prototype._dispatchAgency = function(e, t, n, r) {
		var i = "on" + t,
			s = {
				type: t,
				event: n,
				target: e,
				cancelBubble: !1
			},
			o = e;
		r && (s.dragged = r);
		while (o) {
			o[i] && (s.cancelBubble = o[i](s)), o.dispatch(t, s), o = o.parent;
			if (s.cancelBubble) break
		}
		if (e) s.cancelBubble || this.dispatch(t, s);
		else if (!r) {
			var u = {
				type: t,
				event: n
			};
			this.dispatch(t, u), this.painter.eachOtherLayer(function(e) {
				typeof e[i] == "function" && e[i](u), e.dispatch && e.dispatch(t, u)
			})
		}
	}, d.prototype._iterateAndFindHover = function() {
		var e = o.create();
		return function() {
			var t = this.storage.getShapeList(),
				n, r, i = [0, 0];
			for (var u = t.length - 1; u >= 0; u--) {
				var a = t[u];
				n !== a.zlevel && (r = this.painter.getLayer(a.zlevel, r), i[0] = this._mouseX, i[1] = this._mouseY, r.needTransform && (o.invert(e, r.transform), s.applyTransform(i, i, e)));
				if (this._findHover(a, i[0], i[1])) break
			}
		}
	}();
	var v = [{
		x: 10
	}, {
		x: -20
	}, {
		x: 10,
		y: 10
	}, {
		y: -20
	}];
	return d.prototype._mobileFindFixed = function(e) {
		this._lastHover = null, this._mouseX = e.zrenderX, this._mouseY = e.zrenderY, this._event = e, this._iterateAndFindHover();
		for (var t = 0; !this._lastHover && t < v.length; t++) {
			var n = v[t];
			n.x && (this._mouseX += n.x), n.y && (this._mouseY += n.y), this._iterateAndFindHover()
		}
		this._lastHover && (e.zrenderX = this._mouseX, e.zrenderY = this._mouseY)
	}, d.prototype._zrenderEventFixed = function(e, t) {
		if (e.zrenderFixed) return e;
		if (!t) {
			e = e || window.event;
			var n = e.toElement || e.relatedTarget || e.srcElement || e.target;
			n && n != this._domHover && (e.zrenderX = (typeof e.offsetX != "undefined" ? e.offsetX : e.layerX) + n.offsetLeft, e.zrenderY = (typeof e.offsetY != "undefined" ? e.offsetY : e.layerY) + n.offsetTop)
		} else {
			var r = e.type != "touchend" ? e.targetTouches[0] : e.changedTouches[0];
			if (r) {
				var i = this.painter._domRoot.getBoundingClientRect();
				e.zrenderX = r.clientX - i.left, e.zrenderY = r.clientY - i.top
			}
		}
		return e.zrenderFixed = 1, e
	}, i.merge(d.prototype, a.prototype, !0), d
}), define("zrender/tool/curve", ["require", "./vector"], function(e) {
	function a(e) {
		return e > -n && e < n
	}

	function f(e) {
		return e > n || e < -n
	}

	function l(e, t, n, r, i) {
		var s = 1 - i;
		return s * s * (s * e + 3 * i * t) + i * i * (i * r + 3 * s * n)
	}

	function c(e, t, n, r, i) {
		var s = 1 - i;
		return 3 * (((t - e) * s + 2 * (n - t) * i) * s + (r - n) * i * i)
	}

	function h(e, t, n, s, o, u) {
		var f = s + 3 * (t - n) - e,
			l = 3 * (n - t * 2 + e),
			c = 3 * (t - e),
			h = e - o,
			p = l * l - 3 * f * c,
			d = l * c - 9 * f * h,
			v = c * c - 3 * l * h,
			m = 0;
		if (a(p) && a(d))
			if (a(l)) u[0] = 0;
			else {
				var g = -c / l;
				g >= 0 && g <= 1 && (u[m++] = g)
			} else {
			var y = d * d - 4 * p * v;
			if (a(y)) {
				var b = d / p,
					g = -l / f + b,
					w = -b / 2;
				g >= 0 && g <= 1 && (u[m++] = g), w >= 0 && w <= 1 && (u[m++] = w)
			} else if (y > 0) {
				var E = Math.sqrt(y),
					S = p * l + 1.5 * f * (-d + E),
					x = p * l + 1.5 * f * (-d - E);
				S < 0 ? S = -Math.pow(-S, i) : S = Math.pow(S, i), x < 0 ? x = -Math.pow(-x, i) : x = Math.pow(x, i);
				var g = (-l - (S + x)) / (3 * f);
				g >= 0 && g <= 1 && (u[m++] = g)
			} else {
				var T = (2 * p * l - 3 * f * d) / (2 * Math.sqrt(p * p * p)),
					N = Math.acos(T) / 3,
					C = Math.sqrt(p),
					k = Math.cos(N),
					g = (-l - 2 * C * k) / (3 * f),
					w = (-l + C * (k + r * Math.sin(N))) / (3 * f),
					L = (-l + C * (k - r * Math.sin(N))) / (3 * f);
				g >= 0 && g <= 1 && (u[m++] = g), w >= 0 && w <= 1 && (u[m++] = w), L >= 0 && L <= 1 && (u[m++] = L)
			}
		}
		return m
	}

	function p(e, t, n, r, i) {
		var s = 6 * n - 12 * t + 6 * e,
			o = 9 * t + 3 * r - 3 * e - 9 * n,
			u = 3 * t - 3 * e,
			l = 0;
		if (a(o)) {
			if (f(s)) {
				var c = -u / s;
				c >= 0 && c <= 1 && (i[l++] = c)
			}
		} else {
			var h = s * s - 4 * o * u;
			if (a(h)) i[0] = -s / (2 * o);
			else if (h > 0) {
				var p = Math.sqrt(h),
					c = (-s + p) / (2 * o),
					d = (-s - p) / (2 * o);
				c >= 0 && c <= 1 && (i[l++] = c), d >= 0 && d <= 1 && (i[l++] = d)
			}
		}
		return l
	}

	function d(e, t, n, r, i, s) {
		var o = (t - e) * i + e,
			u = (n - t) * i + t,
			a = (r - n) * i + n,
			f = (u - o) * i + o,
			l = (a - u) * i + u,
			c = (l - f) * i + f;
		s[0] = e, s[1] = o, s[2] = f, s[3] = c, s[4] = c, s[5] = l, s[6] = a, s[7] = r
	}

	function v(e, r, i, a, f, c, h, p, d, v, m) {
		var g, y = .005,
			b = Infinity;
		s[0] = d, s[1] = v;
		for (var w = 0; w < 1; w += .05) {
			o[0] = l(e, i, f, h, w), o[1] = l(r, a, c, p, w);
			var E = t.distSquare(s, o);
			E < b && (g = w, b = E)
		}
		b = Infinity;
		for (var S = 0; S < 32; S++) {
			if (y < n) break;
			var x = g - y,
				T = g + y;
			o[0] = l(e, i, f, h, x), o[1] = l(r, a, c, p, x);
			var E = t.distSquare(o, s);
			if (x >= 0 && E < b) g = x, b = E;
			else {
				u[0] = l(e, i, f, h, T), u[1] = l(r, a, c, p, T);
				var N = t.distSquare(u, s);
				T <= 1 && N < b ? (g = T, b = N) : y *= .5
			}
		}
		return m && (m[0] = l(e, i, f, h, g), m[1] = l(r, a, c, p, g)), Math.sqrt(b)
	}

	function m(e, t, n, r) {
		var i = 1 - r;
		return i * (i * e + 2 * r * t) + r * r * n
	}

	function g(e, t, n, r) {
		return 2 * ((1 - r) * (t - e) + r * (n - t))
	}

	function y(e, t, n, r, i) {
		var s = e - 2 * t + n,
			o = 2 * (t - e),
			u = e - r,
			l = 0;
		if (a(s)) {
			if (f(o)) {
				var c = -u / o;
				c >= 0 && c <= 1 && (i[l++] = c)
			}
		} else {
			var h = o * o - 4 * s * u;
			if (a(h)) {
				var c = -o / (2 * s);
				c >= 0 && c <= 1 && (i[l++] = c)
			} else if (h > 0) {
				var p = Math.sqrt(h),
					c = (-o + p) / (2 * s),
					d = (-o - p) / (2 * s);
				c >= 0 && c <= 1 && (i[l++] = c), d >= 0 && d <= 1 && (i[l++] = d)
			}
		}
		return l
	}

	function b(e, t, n) {
		var r = e + n - 2 * t;
		return r === 0 ? .5 : (e - t) / r
	}

	function w(e, r, i, a, f, l, c, h, p) {
		var d, v = .005,
			g = Infinity;
		s[0] = c, s[1] = h;
		for (var y = 0; y < 1; y += .05) {
			o[0] = m(e, i, f, y), o[1] = m(r, a, l, y);
			var b = t.distSquare(s, o);
			b < g && (d = y, g = b)
		}
		g = Infinity;
		for (var w = 0; w < 32; w++) {
			if (v < n) break;
			var E = d - v,
				S = d + v;
			o[0] = m(e, i, f, E), o[1] = m(r, a, l, E);
			var b = t.distSquare(o, s);
			if (E >= 0 && b < g) d = E, g = b;
			else {
				u[0] = m(e, i, f, S), u[1] = m(r, a, l, S);
				var x = t.distSquare(u, s);
				S <= 1 && x < g ? (d = S, g = x) : v *= .5
			}
		}
		return p && (p[0] = m(e, i, f, d), p[1] = m(r, a, l, d)), Math.sqrt(g)
	}
	var t = e("./vector"),
		n = 1e-4,
		r = Math.sqrt(3),
		i = 1 / 3,
		s = t.create(),
		o = t.create(),
		u = t.create();
	return {
		cubicAt: l,
		cubicDerivativeAt: c,
		cubicRootAt: h,
		cubicExtrema: p,
		cubicSubdivide: d,
		cubicProjectPoint: v,
		quadraticAt: m,
		quadraticDerivativeAt: g,
		quadraticRootAt: y,
		quadraticExtremum: b,
		quadraticProjectPoint: w
	}
}), define("zrender/tool/area", ["require", "./util", "./curve"], function(e) {
	function l(e) {
		return e %= f, e < 0 && (e += f), e
	}

	function c(e, n, i, s) {
		if (!n || !e) return !1;
		var o = e.type;
		r = r || t.getContext();
		var u = h(e, n, i, s);
		if (typeof u != "undefined") return u;
		if (e.buildPath && r.isPointInPath) return p(e, r, n, i, s);
		switch (o) {
			case "ellipse":
				return !0;
			case "trochoid":
				var a = n.location == "out" ? n.r1 + n.r2 + n.d : n.r1 - n.r2 + n.d;
				return S(n, i, s, a);
			case "rose":
				return S(n, i, s, n.maxr);
			default:
				return !1
		}
	}

	function h(e, t, n, r) {
		var i = e.type;
		switch (i) {
			case "bezier-curve":
				if (typeof t.cpX2 == "undefined") return g(t.xStart, t.yStart, t.cpX1, t.cpY1, t.xEnd, t.yEnd, t.lineWidth, n, r);
				return m(t.xStart, t.yStart, t.cpX1, t.cpY1, t.cpX2, t.cpY2, t.xEnd, t.yEnd, t.lineWidth, n, r);
			case "line":
				return v(t.xStart, t.yStart, t.xEnd, t.yEnd, t.lineWidth, n, r);
			case "polyline":
				return b(t.pointList, t.lineWidth, n, r);
			case "ring":
				return w(t.x, t.y, t.r0, t.r, n, r);
			case "circle":
				return S(t.x, t.y, t.r, n, r);
			case "sector":
				var s = t.startAngle * Math.PI / 180,
					o = t.endAngle * Math.PI / 180;
				return t.clockWise || (s = -s, o = -o), x(t.x, t.y, t.r0, t.r, s, o, !t.clockWise, n, r);
			case "path":
				return t.pathArray && _(t.pathArray, Math.max(t.lineWidth, 5), t.brushType, n, r);
			case "polygon":
			case "star":
			case "isogon":
				return T(t.pointList, n, r);
			case "text":
				var u = t.__rect || e.getRect(t);
				return E(u.x, u.y, u.width, u.height, n, r);
			case "rectangle":
			case "image":
				return E(t.x, t.y, t.width, t.height, n, r)
		}
	}

	function p(e, t, n, r, i) {
		return t.beginPath(), e.buildPath(t, n), t.closePath(), t.isPointInPath(r, i)
	}

	function d(e, t, n, r) {
		return !c(e, t, n, r)
	}

	function v(e, t, n, r, i, s, o) {
		if (i === 0) return !1;
		var u = Math.max(i, 5),
			a = 0,
			f = e;
		if (o > t + u && o > r + u || o < t - u && o < r - u || s > e + u && s > n + u || s < e - u && s < n - u) return !1;
		if (e === n) return Math.abs(s - e) <= u / 2;
		a = (t - r) / (e - n), f = (e * r - n * t) / (e - n);
		var l = a * s - o + f,
			c = l * l / (a * a + 1);
		return c <= u / 2 * u / 2
	}

	function m(e, t, r, i, s, o, u, a, f, l, c) {
		if (f === 0) return !1;
		var h = Math.max(f, 5);
		if (c > t + h && c > i + h && c > o + h && c > a + h || c < t - h && c < i - h && c < o - h && c < a - h || l > e + h && l > r + h && l > s + h && l > u + h || l < e - h && l < r - h && l < s - h && l < u - h) return !1;
		var p = n.cubicProjectPoint(e, t, r, i, s, o, u, a, l, c, null);
		return p <= h / 2
	}

	function g(e, t, r, i, s, o, u, a, f) {
		if (u === 0) return !1;
		var l = Math.max(u, 5);
		if (f > t + l && f > i + l && f > o + l || f < t - l && f < i - l && f < o - l || a > e + l && a > r + l && a > s + l || a < e - l && a < r - l && a < s - l) return !1;
		var c = n.quadraticProjectPoint(e, t, r, i, s, o, a, f, null);
		return c <= l / 2
	}

	function y(e, t, n, r, i, s, o, u, a) {
		if (o === 0) return !1;
		var c = Math.max(o, 5);
		u -= e, a -= t;
		var h = Math.sqrt(u * u + a * a);
		if (h - c > n || h + c < n) return !1;
		if (Math.abs(r - i) >= f) return !0;
		if (s) {
			var p = r;
			r = l(i), i = l(p)
		} else r = l(r), i = l(i);
		r > i && (i += f);
		var d = Math.atan2(a, u);
		return d < 0 && (d += f), d >= r && d <= i || d + f >= r && d + f <= i
	}

	function b(e, t, n, r) {
		var t = Math.max(t, 10);
		for (var i = 0, s = e.length - 1; i < s; i++) {
			var o = e[i][0],
				u = e[i][1],
				a = e[i + 1][0],
				f = e[i + 1][1];
			if (v(o, u, a, f, t, n, r)) return !0
		}
		return !1
	}

	function w(e, t, n, r, i, s) {
		var o = (i - e) * (i - e) + (s - t) * (s - t);
		return o < r * r && o > n * n
	}

	function E(e, t, n, r, i, s) {
		return i >= e && i <= e + n && s >= t && s <= t + r
	}

	function S(e, t, n, r, i) {
		return (r - e) * (r - e) + (i - t) * (i - t) < n * n
	}

	function x(e, t, n, r, i, s, o, u, a) {
		return y(e, t, (n + r) / 2, i, s, o, r - n, u, a)
	}

	function T(e, t, n) {
		var r = e.length,
			i = 0;
		for (var s = 0, o = r - 1; s < r; s++) {
			var u = e[o][0],
				a = e[o][1],
				f = e[s][0],
				l = e[s][1];
			i += N(u, a, f, l, t, n), o = s
		}
		return i !== 0
	}

	function N(e, t, n, r, i, s) {
		if (s > t && s > r || s < t && s < r) return 0;
		if (r == t) return 0;
		var o = r < t ? 1 : -1,
			u = (s - t) / (r - t),
			a = u * (n - e) + e;
		return a > i ? o : 0
	}

	function L() {
		var e = k[0];
		k[0] = k[1], k[1] = e
	}

	function A(e, t, r, i, s, o, u, a, f, l) {
		if (l > t && l > i && l > o && l > a || l < t && l < i && l < o && l < a) return 0;
		var c = n.cubicRootAt(t, i, o, a, l, C);
		if (c === 0) return 0;
		var h = 0,
			p = -1,
			d, v;
		for (var m = 0; m < c; m++) {
			var g = C[m],
				y = n.cubicAt(e, r, s, u, g);
			if (y < f) continue;
			p < 0 && (p = n.cubicExtrema(t, i, o, a, k), k[1] < k[0] && p > 1 && L(), d = n.cubicAt(t, i, o, a, k[0]), p > 1 && (v = n.cubicAt(t, i, o, a, k[1]))), p == 2 ? g < k[0] ? h += d < t ? 1 : -1 : g < k[1] ? h += v < d ? 1 : -1 : h += a < v ? 1 : -1 : g < k[0] ? h += d < t ? 1 : -1 : h += a < d ? 1 : -1
		}
		return h
	}

	function O(e, t, r, i, s, o, u, a) {
		if (a > t && a > i && a > o || a < t && a < i && a < o) return 0;
		var f = n.quadraticRootAt(t, i, o, a, C);
		if (f === 0) return 0;
		var l = n.quadraticExtremum(t, i, o);
		if (l >= 0 && l <= 1) {
			var c = 0,
				h = n.quadraticAt(t, i, o, l);
			for (var p = 0; p < f; p++) {
				var d = n.quadraticAt(e, r, s, C[p]);
				if (d > u) continue;
				C[p] < l ? c += h < t ? 1 : -1 : c += o < h ? 1 : -1
			}
			return c
		}
		var d = n.quadraticAt(e, r, s, C[0]);
		return d > u ? 0 : o < t ? 1 : -1
	}

	function M(e, t, n, r, i, s, o, u) {
		u -= t;
		if (u > n || u < -n) return 0;
		var a = Math.sqrt(n * n - u * u);
		C[0] = -a, C[1] = a;
		if (Math.abs(r - i) >= f) {
			r = 0, i = f;
			var c = s ? 1 : -1;
			return o >= C[0] + e && o <= C[1] + e ? c : 0
		}
		if (s) {
			var a = r;
			r = l(i), i = l(a)
		} else r = l(r), i = l(i);
		r > i && (i += f);
		var h = 0;
		for (var p = 0; p < 2; p++) {
			var d = C[p];
			if (d + e > o) {
				var v = Math.atan2(u, d),
					c = s ? 1 : -1;
				v < 0 && (v = f + v);
				if (v >= r && v <= i || v + f >= r && v + f <= i) v > Math.PI / 2 && v < Math.PI * 1.5 && (c = -c), h += c
			}
		}
		return h
	}

	function _(e, t, n, r, i) {
		var s = 0,
			o = 0,
			u = 0,
			a = 0,
			f = 0,
			l = !0,
			c = !0;
		n = n || "fill";
		var h = n === "stroke" || n === "both",
			p = n === "fill" || n === "both";
		for (var d = 0; d < e.length; d++) {
			var b = e[d],
				w = b.points;
			if (l || b.command === "M") {
				if (d > 0) {
					p && (s += N(o, u, a, f, r, i));
					if (s !== 0) return !0
				}
				a = w[w.length - 2], f = w[w.length - 1], l = !1, c && b.command !== "A" && (c = !1, o = a, u = f)
			}
			switch (b.command) {
				case "M":
					o = w[0], u = w[1];
					break;
				case "L":
					if (h && v(o, u, w[0], w[1], t, r, i)) return !0;
					p && (s += N(o, u, w[0], w[1], r, i)), o = w[0], u = w[1];
					break;
				case "C":
					if (h && m(o, u, w[0], w[1], w[2], w[3], w[4], w[5], t, r, i)) return !0;
					p && (s += A(o, u, w[0], w[1], w[2], w[3], w[4], w[5], r, i)), o = w[4], u = w[5];
					break;
				case "Q":
					if (h && g(o, u, w[0], w[1], w[2], w[3], t, r, i)) return !0;
					p && (s += O(o, u, w[0], w[1], w[2], w[3], r, i)), o = w[2], u = w[3];
					break;
				case "A":
					var E = w[0],
						S = w[1],
						x = w[2],
						T = w[3],
						C = w[4],
						k = w[5],
						L = Math.cos(C) * x + E,
						_ = Math.sin(C) * T + S;
					c ? (c = !1, a = L, f = _) : s += N(o, u, L, _);
					var D = (r - E) * T / x + E;
					if (h && y(E, S, T, C, C + k, 1 - w[7], t, D, i)) return !0;
					p && (s += M(E, S, T, C, C + k, 1 - w[7], D, i)), o = Math.cos(C + k) * x + E, u = Math.sin(C + k) * T + S;
					break;
				case "z":
					if (h && v(o, u, a, f, t, r, i)) return !0;
					l = !0
			}
		}
		return p && (s += N(o, u, a, f, r, i)), s !== 0
	}

	function D(e, n) {
		var s = e + ":" + n;
		if (i[s]) return i[s];
		r = r || t.getContext(), r.save(), n && (r.font = n), e = (e + "").split("\n");
		var u = 0;
		for (var f = 0, l = e.length; f < l; f++) u = Math.max(r.measureText(e[f]).width, u);
		return r.restore(), i[s] = u, ++o > a && (o = 0, i = {}), u
	}

	function P(e, n) {
		var i = e + ":" + n;
		if (s[i]) return s[i];
		r = r || t.getContext(), r.save(), n && (r.font = n), e = (e + "").split("\n");
		var o = (r.measureText("国").width + 2) * e.length;
		return r.restore(), s[i] = o, ++u > a && (u = 0, s = {}), o
	}
	var t = e("./util"),
		n = e("./curve"),
		r, i = {},
		s = {},
		o = 0,
		u = 0,
		a = 5e3,
		f = Math.PI * 2,
		C = [-1, -1, -1],
		k = [-1, -1];
	return {
		isInside: c,
		isOutside: d,
		getTextWidth: D,
		getTextHeight: P,
		isInsidePath: _,
		isInsidePolygon: T,
		isInsideSector: x,
		isInsideCircle: S,
		isInsideLine: v,
		isInsideRect: E,
		isInsidePolyline: b,
		isInsideCubicStroke: m,
		isInsideQuadraticStroke: g
	}
}), define("zrender/mixin/Transformable", ["require", "../tool/matrix", "../tool/vector"], function(e) {
	function s(e) {
		return e > -i && e < i
	}

	function o(e) {
		return e > i || e < -i
	}
	var t = e("../tool/matrix"),
		n = e("../tool/vector"),
		r = [0, 0],
		i = 5e-5,
		u = function() {
			this.position || (this.position = [0, 0]), typeof this.rotation == "undefined" && (this.rotation = [0, 0, 0]), this.scale || (this.scale = [1, 1, 0, 0]), this.needLocalTransform = !1, this.needTransform = !1
		};
	return u.prototype = {
		constructor: u,
		updateNeedTransform: function() {
			this.needLocalTransform = o(this.rotation[0]) || o(this.position[0]) || o(this.position[1]) || o(this.scale[0] - 1) || o(this.scale[1] - 1)
		},
		updateTransform: function() {
			this.updateNeedTransform(), this.parent ? this.needTransform = this.needLocalTransform || this.parent.needTransform : this.needTransform = this.needLocalTransform;
			if (!this.needTransform) return;
			var e = this.transform || t.create();
			t.identity(e);
			if (this.needLocalTransform) {
				if (o(this.scale[0]) || o(this.scale[1])) {
					r[0] = -this.scale[2] || 0, r[1] = -this.scale[3] || 0;
					var n = o(r[0]) || o(r[1]);
					n && t.translate(e, e, r), t.scale(e, e, this.scale), n && (r[0] = -r[0], r[1] = -r[1], t.translate(e, e, r))
				}
				if (this.rotation instanceof Array) {
					if (this.rotation[0] !== 0) {
						r[0] = -this.rotation[1] || 0, r[1] = -this.rotation[2] || 0;
						var n = o(r[0]) || o(r[1]);
						n && t.translate(e, e, r), t.rotate(e, e, this.rotation[0]), n && (r[0] = -r[0], r[1] = -r[1], t.translate(e, e, r))
					}
				} else this.rotation !== 0 && t.rotate(e, e, this.rotation);
				(o(this.position[0]) || o(this.position[1])) && t.translate(e, e, this.position)
			}
			this.transform = e, this.parent && this.parent.needTransform && (this.needLocalTransform ? t.mul(this.transform, this.parent.transform, this.transform) : t.copy(this.transform, this.parent.transform))
		},
		setTransform: function(e) {
			if (this.needTransform) {
				var t = this.transform;
				e.transform(t[0], t[1], t[2], t[3], t[4], t[5])
			}
		},
		lookAt: function() {
			var e = n.create();
			return function(r) {
				this.transform || (this.transform = t.create());
				var i = this.transform;
				n.sub(e, r, this.position);
				if (s(e[0]) && s(e[1])) return;
				n.normalize(e, e), i[2] = e[0] * this.scale[1], i[3] = e[1] * this.scale[1], i[0] = e[1] * this.scale[0], i[1] = -e[0] * this.scale[0], i[4] = this.position[0], i[5] = this.position[1], this.decomposeTransform()
			}
		}(),
		decomposeTransform: function() {
			if (!this.transform) return;
			var e = this.transform,
				t = e[0] * e[0] + e[1] * e[1],
				n = this.position,
				r = this.scale,
				i = this.rotation;
			o(t - 1) && (t = Math.sqrt(t));
			var s = e[2] * e[2] + e[3] * e[3];
			o(s - 1) && (s = Math.sqrt(s)), n[0] = e[4], n[1] = e[5], r[0] = t, r[1] = s, r[2] = r[3] = 0, i[0] = Math.atan2(-e[1] / s, e[0] / t), i[1] = i[2] = 0
		}
	}, u
}), define("zrender/tool/color", ["require", "../tool/util"], function(e) {
	function f(e) {
		r = e
	}

	function l() {
		r = i
	}

	function c(e, t) {
		return e |= 0, t = t || r, t[e % t.length]
	}

	function h(e) {
		s = e
	}

	function p() {
		o = s
	}

	function d() {
		return s
	}

	function v(e, r, i, s, o, u, a) {
		n || (n = t.getContext());
		var f = n.createRadialGradient(e, r, i, s, o, u);
		for (var l = 0, c = a.length; l < c; l++) f.addColorStop(a[l][0], a[l][1]);
		return f.__nonRecursion = !0, f
	}

	function m(e, r, i, s, o) {
		n || (n = t.getContext());
		var u = n.createLinearGradient(e, r, i, s);
		for (var a = 0, f = o.length; a < f; a++) u.addColorStop(o[a][0], o[a][1]);
		return u.__nonRecursion = !0, u
	}

	function g(e, t, n) {
		e = S(e), t = S(t), e = F(e), t = F(t);
		var r = [],
			i = (t[0] - e[0]) / n,
			s = (t[1] - e[1]) / n,
			o = (t[2] - e[2]) / n,
			u = (t[3] - e[3]) / n;
		for (var a = 0, f = e[0], l = e[1], c = e[2], h = e[3]; a < n; a++) r[a] = b([R(Math.floor(f), [0, 255]), R(Math.floor(l), [0, 255]), R(Math.floor(c), [0, 255]), h.toFixed(4) - 0], "rgba"), f += i, l += s, c += o, h += u;
		return f = t[0], l = t[1], c = t[2], h = t[3], r[a] = b([f, l, c, h], "rgba"), r
	}

	function y(e, t) {
		var n = [],
			r = e.length;
		t === undefined && (t = 20);
		if (r === 1) n = g(e[0], e[0], t);
		else if (r > 1)
			for (var i = 0, s = r - 1; i < s; i++) {
				var o = g(e[i], e[i + 1], t);
				i < s - 1 && o.pop(), n = n.concat(o)
			}
		return n
	}

	function b(e, t) {
		t = t || "rgb";
		if (e && (e.length === 3 || e.length === 4)) {
			e = q(e, function(e) {
				return e > 1 ? Math.ceil(e) : e
			});
			if (t.indexOf("hex") > -1) return "#" + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1);
			if (t.indexOf("hs") > -1) {
				var n = q(e.slice(1, 3), function(e) {
					return e + "%"
				});
				e[1] = n[0], e[2] = n[1]
			}
			return t.indexOf("a") > -1 ? (e.length === 3 && e.push(1), e[3] = R(e[3], [0, 1]), t + "(" + e.slice(0, 4).join(",") + ")") : t + "(" + e.slice(0, 3).join(",") + ")"
		}
	}

	function w(e) {
		e = _(e), e.indexOf("rgba") < 0 && (e = S(e));
		var t = [],
			n = 0;
		return e.replace(/[\d.]+/g, function(e) {
			n < 3 ? e |= 0 : e = +e, t[n++] = e
		}), t
	}

	function E(e, t) {
		if (!U(e)) return e;
		var n = F(e),
			r = n[3];
		return typeof r == "undefined" && (r = 1), e.indexOf("hsb") > -1 ? n = z(n) : e.indexOf("hsl") > -1 && (n = W(n)), t.indexOf("hsb") > -1 || t.indexOf("hsv") > -1 ? n = V(n) : t.indexOf("hsl") > -1 && (n = $(n)), n[3] = r, b(n, t)
	}

	function S(e) {
		return E(e, "rgba")
	}

	function x(e) {
		return E(e, "rgb")
	}

	function T(e) {
		return E(e, "hex")
	}

	function N(e) {
		return E(e, "hsva")
	}

	function C(e) {
		return E(e, "hsv")
	}

	function k(e) {
		return E(e, "hsba")
	}

	function L(e) {
		return E(e, "hsb")
	}

	function A(e) {
		return E(e, "hsla")
	}

	function O(e) {
		return E(e, "hsl")
	}

	function M(e) {
		for (var t in a)
			if (T(a[t]) === T(e)) return t;
		return null
	}

	function _(e) {
		return String(e).replace(/\s+/g, "")
	}

	function D(e) {
		a[e] && (e = a[e]), e = _(e), e = e.replace(/hsv/i, "hsb");
		if (/^#[\da-f]{3}$/i.test(e)) {
			e = parseInt(e.slice(1), 16);
			var t = (e & 3840) << 8,
				n = (e & 240) << 4,
				r = e & 15;
			e = "#" + ((1 << 24) + (t << 4) + t + (n << 4) + n + (r << 4) + r).toString(16).slice(1)
		}
		return e
	}

	function P(e, t) {
		if (!U(e)) return e;
		var n = t > 0 ? 1 : -1;
		typeof t == "undefined" && (t = 0), t = Math.abs(t) > 1 ? 1 : Math.abs(t), e = x(e);
		var r = F(e);
		for (var i = 0; i < 3; i++) n === 1 ? r[i] = r[i] * (1 - t) | 0 : r[i] = (255 - r[i]) * t + r[i] | 0;
		return "rgb(" + r.join(",") + ")"
	}

	function H(e) {
		if (!U(e)) return e;
		var t = F(S(e));
		return t = q(t, function(e) {
			return 255 - e
		}), b(t, "rgb")
	}

	function B(e, t, n) {
		if (!U(e) || !U(t)) return e;
		typeof n == "undefined" && (n = .5), n = 1 - R(n, [0, 1]);
		var r = n * 2 - 1,
			i = F(S(e)),
			s = F(S(t)),
			o = i[3] - s[3],
			u = ((r * o === -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
			a = 1 - u,
			f = [];
		for (var l = 0; l < 3; l++) f[l] = i[l] * u + s[l] * a;
		var c = i[3] * n + s[3] * (1 - n);
		return c = Math.max(0, Math.min(1, c)), i[3] === 1 && s[3] === 1 ? b(f, "rgb") : (f[3] = c, b(f, "rgba"))
	}

	function j() {
		return "#" + (Math.random().toString(16) + "0000").slice(2, 8)
	}

	function F(e) {
		e = D(e);
		var t = e.match(u);
		if (t === null) throw new Error("The color format error");
		var n, r, i = [],
			s;
		if (t[2]) n = t[2].replace("#", "").split(""), s = [n[0] + n[1], n[2] + n[3], n[4] + n[5]], i = q(s, function(e) {
			return R(parseInt(e, 16), [0, 255])
		});
		else if (t[4]) {
			var o = t[4].split(",");
			r = o[3], s = o.slice(0, 3), i = q(s, function(e) {
				return e = Math.floor(e.indexOf("%") > 0 ? parseInt(e, 0) * 2.55 : e), R(e, [0, 255])
			}), typeof r != "undefined" && i.push(R(parseFloat(r), [0, 1]))
		} else if (t[5] || t[6]) {
			var a = (t[5] || t[6]).split(","),
				f = parseInt(a[0], 0) / 360,
				l = a[1],
				c = a[2];
			r = a[3], i = q([l, c], function(e) {
				return R(parseFloat(e) / 100, [0, 1])
			}), i.unshift(f), typeof r != "undefined" && i.push(R(parseFloat(r), [0, 1]))
		}
		return i
	}

	function I(e, t) {
		if (!U(e)) return e;
		t === null && (t = 1);
		var n = F(S(e));
		return n[3] = R(Number(t).toFixed(4), [0, 1]), b(n, "rgba")
	}

	function q(e, t) {
		if (typeof t != "function") throw new TypeError;
		var n = e ? e.length : 0;
		for (var r = 0; r < n; r++) e[r] = t(e[r]);
		return e
	}

	function R(e, t) {
		return e <= t[0] ? e = t[0] : e >= t[1] && (e = t[1]), e
	}

	function U(e) {
		return e instanceof Array || typeof e == "string"
	}

	function z(e) {
		var t = e[0],
			n = e[1],
			r = e[2],
			i, s, o;
		if (n === 0) i = r * 255, s = r * 255, o = r * 255;
		else {
			var u = t * 6;
			u === 6 && (u = 0);
			var a = u | 0,
				f = r * (1 - n),
				l = r * (1 - n * (u - a)),
				c = r * (1 - n * (1 - (u - a))),
				h = 0,
				p = 0,
				d = 0;
			a === 0 ? (h = r, p = c, d = f) : a === 1 ? (h = l, p = r, d = f) : a === 2 ? (h = f, p = r, d = c) : a === 3 ? (h = f, p = l, d = r) : a === 4 ? (h = c, p = f, d = r) : (h = r, p = f, d = l), i = h * 255, s = p * 255, o = d * 255
		}
		return [i, s, o]
	}

	function W(e) {
		var t = e[0],
			n = e[1],
			r = e[2],
			i, s, o;
		if (n === 0) i = r * 255, s = r * 255, o = r * 255;
		else {
			var u;
			r < .5 ? u = r * (1 + n) : u = r + n - n * r;
			var a = 2 * r - u;
			i = 255 * X(a, u, t + 1 / 3), s = 255 * X(a, u, t), o = 255 * X(a, u, t - 1 / 3)
		}
		return [i, s, o]
	}

	function X(e, t, n) {
		return n < 0 && (n += 1), n > 1 && (n -= 1), 6 * n < 1 ? e + (t - e) * 6 * n : 2 * n < 1 ? t : 3 * n < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
	}

	function V(e) {
		var t = e[0] / 255,
			n = e[1] / 255,
			r = e[2] / 255,
			i = Math.min(t, n, r),
			s = Math.max(t, n, r),
			o = s - i,
			u = s,
			a, f;
		if (o === 0) a = 0, f = 0;
		else {
			f = o / s;
			var l = ((s - t) / 6 + o / 2) / o,
				c = ((s - n) / 6 + o / 2) / o,
				h = ((s - r) / 6 + o / 2) / o;
			t === s ? a = h - c : n === s ? a = 1 / 3 + l - h : r === s && (a = 2 / 3 + c - l), a < 0 && (a += 1), a > 1 && (a -= 1)
		}
		return a *= 360, f *= 100, u *= 100, [a, f, u]
	}

	function $(e) {
		var t = e[0] / 255,
			n = e[1] / 255,
			r = e[2] / 255,
			i = Math.min(t, n, r),
			s = Math.max(t, n, r),
			o = s - i,
			u = (s + i) / 2,
			a, f;
		if (o === 0) a = 0, f = 0;
		else {
			u < .5 ? f = o / (s + i) : f = o / (2 - s - i);
			var l = ((s - t) / 6 + o / 2) / o,
				c = ((s - n) / 6 + o / 2) / o,
				h = ((s - r) / 6 + o / 2) / o;
			t === s ? a = h - c : n === s ? a = 1 / 3 + l - h : r === s && (a = 2 / 3 + c - l), a < 0 && (a += 1), a > 1 && (a -= 1)
		}
		return a *= 360, f *= 100, u *= 100, [a, f, u]
	}
	var t = e("../tool/util"),
		n, r = ["#ff9277", " #dddd00", " #ffc877", " #bbe3ff", " #d5ffbb", "#bbbbff", " #ddb000", " #b0dd00", " #e2bbff", " #ffbbe3", "#ff7777", " #ff9900", " #83dd00", " #77e3ff", " #778fff", "#c877ff", " #ff77ab", " #ff6600", " #aa8800", " #77c7ff", "#ad77ff", " #ff77ff", " #dd0083", " #777700", " #00aa00", "#0088aa", " #8400dd", " #aa0088", " #dd0000", " #772e00"],
		i = r,
		s = "rgba(255,255,0,0.5)",
		o = s,
		u = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
		a = {
			aliceblue: "#f0f8ff",
			antiquewhite: "#faebd7",
			aqua: "#0ff",
			aquamarine: "#7fffd4",
			azure: "#f0ffff",
			beige: "#f5f5dc",
			bisque: "#ffe4c4",
			black: "#000",
			blanchedalmond: "#ffebcd",
			blue: "#00f",
			blueviolet: "#8a2be2",
			brown: "#a52a2a",
			burlywood: "#deb887",
			cadetblue: "#5f9ea0",
			chartreuse: "#7fff00",
			chocolate: "#d2691e",
			coral: "#ff7f50",
			cornflowerblue: "#6495ed",
			cornsilk: "#fff8dc",
			crimson: "#dc143c",
			cyan: "#0ff",
			darkblue: "#00008b",
			darkcyan: "#008b8b",
			darkgoldenrod: "#b8860b",
			darkgray: "#a9a9a9",
			darkgrey: "#a9a9a9",
			darkgreen: "#006400",
			darkkhaki: "#bdb76b",
			darkmagenta: "#8b008b",
			darkolivegreen: "#556b2f",
			darkorange: "#ff8c00",
			darkorchid: "#9932cc",
			darkred: "#8b0000",
			darksalmon: "#e9967a",
			darkseagreen: "#8fbc8f",
			darkslateblue: "#483d8b",
			darkslategray: "#2f4f4f",
			darkslategrey: "#2f4f4f",
			darkturquoise: "#00ced1",
			darkviolet: "#9400d3",
			deeppink: "#ff1493",
			deepskyblue: "#00bfff",
			dimgray: "#696969",
			dimgrey: "#696969",
			dodgerblue: "#1e90ff",
			firebrick: "#b22222",
			floralwhite: "#fffaf0",
			forestgreen: "#228b22",
			fuchsia: "#f0f",
			gainsboro: "#dcdcdc",
			ghostwhite: "#f8f8ff",
			gold: "#ffd700",
			goldenrod: "#daa520",
			gray: "#808080",
			grey: "#808080",
			green: "#008000",
			greenyellow: "#adff2f",
			honeydew: "#f0fff0",
			hotpink: "#ff69b4",
			indianred: "#cd5c5c",
			indigo: "#4b0082",
			ivory: "#fffff0",
			khaki: "#f0e68c",
			lavender: "#e6e6fa",
			lavenderblush: "#fff0f5",
			lawngreen: "#7cfc00",
			lemonchiffon: "#fffacd",
			lightblue: "#add8e6",
			lightcoral: "#f08080",
			lightcyan: "#e0ffff",
			lightgoldenrodyellow: "#fafad2",
			lightgray: "#d3d3d3",
			lightgrey: "#d3d3d3",
			lightgreen: "#90ee90",
			lightpink: "#ffb6c1",
			lightsalmon: "#ffa07a",
			lightseagreen: "#20b2aa",
			lightskyblue: "#87cefa",
			lightslategray: "#789",
			lightslategrey: "#789",
			lightsteelblue: "#b0c4de",
			lightyellow: "#ffffe0",
			lime: "#0f0",
			limegreen: "#32cd32",
			linen: "#faf0e6",
			magenta: "#f0f",
			maroon: "#800000",
			mediumaquamarine: "#66cdaa",
			mediumblue: "#0000cd",
			mediumorchid: "#ba55d3",
			mediumpurple: "#9370d8",
			mediumseagreen: "#3cb371",
			mediumslateblue: "#7b68ee",
			mediumspringgreen: "#00fa9a",
			mediumturquoise: "#48d1cc",
			mediumvioletred: "#c71585",
			midnightblue: "#191970",
			mintcream: "#f5fffa",
			mistyrose: "#ffe4e1",
			moccasin: "#ffe4b5",
			navajowhite: "#ffdead",
			navy: "#000080",
			oldlace: "#fdf5e6",
			olive: "#808000",
			olivedrab: "#6b8e23",
			orange: "#ffa500",
			orangered: "#ff4500",
			orchid: "#da70d6",
			palegoldenrod: "#eee8aa",
			palegreen: "#98fb98",
			paleturquoise: "#afeeee",
			palevioletred: "#d87093",
			papayawhip: "#ffefd5",
			peachpuff: "#ffdab9",
			peru: "#cd853f",
			pink: "#ffc0cb",
			plum: "#dda0dd",
			powderblue: "#b0e0e6",
			purple: "#800080",
			red: "#f00",
			rosybrown: "#bc8f8f",
			royalblue: "#4169e1",
			saddlebrown: "#8b4513",
			salmon: "#fa8072",
			sandybrown: "#f4a460",
			seagreen: "#2e8b57",
			seashell: "#fff5ee",
			sienna: "#a0522d",
			silver: "#c0c0c0",
			skyblue: "#87ceeb",
			slateblue: "#6a5acd",
			slategray: "#708090",
			slategrey: "#708090",
			snow: "#fffafa",
			springgreen: "#00ff7f",
			steelblue: "#4682b4",
			tan: "#d2b48c",
			teal: "#008080",
			thistle: "#d8bfd8",
			tomato: "#ff6347",
			turquoise: "#40e0d0",
			violet: "#ee82ee",
			wheat: "#f5deb3",
			white: "#fff",
			whitesmoke: "#f5f5f5",
			yellow: "#ff0",
			yellowgreen: "#9acd32"
		};
	return {
		customPalette: f,
		resetPalette: l,
		getColor: c,
		getHighlightColor: d,
		customHighlight: h,
		resetHighlight: p,
		getRadialGradient: v,
		getLinearGradient: m,
		getGradientColors: y,
		getStepColors: g,
		reverse: H,
		mix: B,
		lift: P,
		trim: _,
		random: j,
		toRGB: x,
		toRGBA: S,
		toHex: T,
		toHSL: O,
		toHSLA: A,
		toHSB: L,
		toHSBA: k,
		toHSV: C,
		toHSVA: N,
		toName: M,
		toColor: b,
		toArray: w,
		alpha: I,
		getData: F
	}
}), define("zrender/shape/Base", ["require", "../tool/matrix", "../tool/guid", "../tool/util", "../tool/log", "../mixin/Transformable", "../mixin/Eventful", "../tool/area", "../tool/area", "../tool/color", "../tool/area"], function(e) {
	function a(t, n, r, i, s, o, u) {
		s && (t.font = s), t.textAlign = o, t.textBaseline = u;
		var a = f(n, r, i, s, o, u);
		n = (n + "").split("\n");
		var l = e("../tool/area").getTextHeight("国", s);
		switch (u) {
			case "top":
				i = a.y;
				break;
			case "bottom":
				i = a.y + l;
				break;
			default:
				i = a.y + l / 2
		}
		for (var c = 0, h = n.length; c < h; c++) t.fillText(n[c], r, i), i += l
	}

	function f(t, n, r, i, s, o) {
		var u = e("../tool/area"),
			a = u.getTextWidth(t, i),
			f = u.getTextHeight("国", i);
		t = (t + "").split("\n");
		switch (s) {
			case "end":
			case "right":
				n -= a;
				break;
			case "center":
				n -= a / 2
		}
		switch (o) {
			case "top":
				break;
			case "bottom":
				r -= f * t.length;
				break;
			default:
				r -= f * t.length / 2
		}
		return {
			x: n,
			y: r,
			width: a,
			height: f * t.length
		}
	}
	var t = window.G_vmlCanvasManager,
		n = e("../tool/matrix"),
		r = e("../tool/guid"),
		i = e("../tool/util"),
		s = e("../tool/log"),
		o = e("../mixin/Transformable"),
		u = e("../mixin/Eventful"),
		l = function(e) {
			e = e || {}, this.id = e.id || r();
			for (var t in e) this[t] = e[t];
			this.style = this.style || {}, this.highlightStyle = this.highlightStyle || null, this.parent = null, this.__dirty = !0, this.__clipShapes = [], o.call(this), u.call(this)
		};
	l.prototype.invisible = !1, l.prototype.ignore = !1, l.prototype.zlevel = 0, l.prototype.draggable = !1, l.prototype.clickable = !1, l.prototype.hoverable = !0, l.prototype.z = 0, l.prototype.brush = function(e, t) {
		var n = this.beforeBrush(e, t);
		e.beginPath(), this.buildPath(e, n);
		switch (n.brushType) {
			case "both":
				e.fill();
			case "stroke":
				n.lineWidth > 0 && e.stroke();
				break;
			default:
				e.fill()
		}
		this.drawText(e, n, this.style), this.afterBrush(e)
	}, l.prototype.beforeBrush = function(e, t) {
		var n = this.style;
		return this.brushTypeOnly && (n.brushType = this.brushTypeOnly), t && (n = this.getHighlightStyle(n, this.highlightStyle || {}, this.brushTypeOnly)), this.brushTypeOnly == "stroke" && (n.strokeColor = n.strokeColor || n.color), e.save(), this.doClip(e), this.setContext(e, n), this.setTransform(e), n
	}, l.prototype.afterBrush = function(e) {
		e.restore()
	};
	var c = [
		["color", "fillStyle"],
		["strokeColor", "strokeStyle"],
		["opacity", "globalAlpha"],
		["lineCap", "lineCap"],
		["lineJoin", "lineJoin"],
		["miterLimit", "miterLimit"],
		["lineWidth", "lineWidth"],
		["shadowBlur", "shadowBlur"],
		["shadowColor", "shadowColor"],
		["shadowOffsetX", "shadowOffsetX"],
		["shadowOffsetY", "shadowOffsetY"]
	];
	l.prototype.setContext = function(e, t) {
		for (var n = 0, r = c.length; n < r; n++) {
			var i = c[n][0],
				s = t[i],
				o = c[n][1];
			typeof s != "undefined" && (e[o] = s)
		}
	};
	var h = n.create();
	return l.prototype.doClip = function(e) {
		if (this.__clipShapes && !t)
			for (var r = 0; r < this.__clipShapes.length; r++) {
				var i = this.__clipShapes[r];
				if (i.needTransform) {
					var s = i.transform;
					n.invert(h, s), e.transform(s[0], s[1], s[2], s[3], s[4], s[5])
				}
				e.beginPath(), i.buildPath(e, i.style), e.clip();
				if (i.needTransform) {
					var s = h;
					e.transform(s[0], s[1], s[2], s[3], s[4], s[5])
				}
			}
	}, l.prototype.getHighlightStyle = function(t, n, r) {
		var i = {};
		for (var s in t) i[s] = t[s];
		var o = e("../tool/color"),
			u = o.getHighlightColor();
		t.brushType != "stroke" ? (i.strokeColor = u, i.lineWidth = (t.lineWidth || 1) + this.getHighlightZoom(), i.brushType = "both") : r != "stroke" ? (i.strokeColor = u, i.lineWidth = (t.lineWidth || 1) + this.getHighlightZoom()) : i.strokeColor = n.strokeColor || o.mix(t.strokeColor, o.toRGB(u));
		for (var s in n) typeof n[s] != "undefined" && (i[s] = n[s]);
		return i
	}, l.prototype.getHighlightZoom = function() {
		return this.type != "text" ? 6 : 2
	}, l.prototype.drift = function(e, t) {
		this.position[0] += e, this.position[1] += t
	}, l.prototype.getTansform = function() {
		var e = [];
		return function(t, r) {
			var i = [t, r];
			return this.needTransform && this.transform && (n.invert(e, this.transform), n.mulVector(i, e, [t, r, 1]), t == i[0] && r == i[1] && this.updateNeedTransform()), i
		}
	}(), l.prototype.buildPath = function(e, t) {
		s("buildPath not implemented in " + this.type)
	}, l.prototype.getRect = function(e) {
		s("getRect not implemented in " + this.type)
	}, l.prototype.isCover = function(t, n) {
		var r = this.getTansform(t, n);
		t = r[0], n = r[1];
		var i = this.style.__rect;
		return i || (i = this.style.__rect = this.getRect(this.style)), t >= i.x && t <= i.x + i.width && n >= i.y && n <= i.y + i.height ? e("../tool/area").isInside(this, this.style, t, n) : !1
	}, l.prototype.drawText = function(e, t, n) {
		if (typeof t.text == "undefined" || t.text === !1) return;
		var r = t.textColor || t.color || t.strokeColor;
		e.fillStyle = r;
		var i = 10,
			s, o, u, f, l = t.textPosition || this.textPosition || "top";
		switch (l) {
			case "inside":
			case "top":
			case "bottom":
			case "left":
			case "right":
				if (this.getRect) {
					var c = (n || t).__rect || this.getRect(n || t);
					switch (l) {
						case "inside":
							u = c.x + c.width / 2, f = c.y + c.height / 2, s = "center", o = "middle", t.brushType != "stroke" && r == t.color && (e.fillStyle = "#fff");
							break;
						case "left":
							u = c.x - i, f = c.y + c.height / 2, s = "end", o = "middle";
							break;
						case "right":
							u = c.x + c.width + i, f = c.y + c.height / 2, s = "start", o = "middle";
							break;
						case "top":
							u = c.x + c.width / 2, f = c.y - i, s = "center", o = "bottom";
							break;
						case "bottom":
							u = c.x + c.width / 2, f = c.y + c.height + i, s = "center", o = "top"
					}
				}
				break;
			case "start":
			case "end":
				var h = t.pointList || [
						[t.xStart || 0, t.yStart || 0],
						[t.xEnd || 0, t.yEnd || 0]
					],
					p = h.length;
				if (p < 2) return;
				var d, v, m, g;
				switch (l) {
					case "start":
						d = h[1][0], v = h[0][0], m = h[1][1], g = h[0][1];
						break;
					case "end":
						d = h[p - 2][0], v = h[p - 1][0], m = h[p - 2][1], g = h[p - 1][1]
				}
				u = v, f = g;
				var y = Math.atan((m - g) / (v - d)) / Math.PI * 180;
				v - d < 0 ? y += 180 : m - g < 0 && (y += 360), i = 5, y >= 30 && y <= 150 ? (s = "center", o = "bottom", f -= i) : y > 150 && y < 210 ? (s = "right", o = "middle", u -= i) : y >= 210 && y <= 330 ? (s = "center", o = "top", f += i) : (s = "left", o = "middle", u += i);
				break;
			case "specific":
				u = t.textX || 0, f = t.textY || 0, s = "start", o = "middle"
		}
		u != null && f != null && a(e, t.text, u, f, t.textFont, t.textAlign || s, t.textBaseline || o)
	}, l.prototype.modSelf = function() {
		this.__dirty = !0, this.style && (this.style.__rect = null), this.highlightStyle && (this.highlightStyle.__rect = null)
	}, l.prototype.isSilent = function() {
		return !(this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop)
	}, i.merge(l.prototype, o.prototype, !0), i.merge(l.prototype, u.prototype, !0), l
}), define("zrender/shape/Text", ["require", "../tool/area", "./Base", "../tool/util"], function(e) {
	var t = e("../tool/area"),
		n = e("./Base"),
		r = function(e) {
			n.call(this, e)
		};
	return r.prototype = {
		type: "text",
		brush: function(e, n) {
			var r = this.style;
			n && (r = this.getHighlightStyle(r, this.highlightStyle || {}));
			if (typeof r.text == "undefined" || r.text === !1) return;
			e.save(), this.doClip(e), this.setContext(e, r), this.setTransform(e), r.textFont && (e.font = r.textFont), e.textAlign = r.textAlign || "start", e.textBaseline = r.textBaseline || "middle";
			var i = (r.text + "").split("\n"),
				s = t.getTextHeight("国", r.textFont),
				o = this.getRect(r),
				u = r.x,
				a;
			r.textBaseline == "top" ? a = o.y : r.textBaseline == "bottom" ? a = o.y + s : a = o.y + s / 2;
			for (var f = 0, l = i.length; f < l; f++) {
				if (r.maxWidth) switch (r.brushType) {
					case "fill":
						e.fillText(i[f], u, a, r.maxWidth);
						break;
					case "stroke":
						e.strokeText(i[f], u, a, r.maxWidth);
						break;
					case "both":
						e.fillText(i[f], u, a, r.maxWidth), e.strokeText(i[f], u, a, r.maxWidth);
						break;
					default:
						e.fillText(i[f], u, a, r.maxWidth)
				} else switch (r.brushType) {
					case "fill":
						e.fillText(i[f], u, a);
						break;
					case "stroke":
						e.strokeText(i[f], u, a);
						break;
					case "both":
						e.fillText(i[f], u, a), e.strokeText(i[f], u, a);
						break;
					default:
						e.fillText(i[f], u, a)
				}
				a += s
			}
			e.restore();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var n = t.getTextWidth(e.text, e.textFont),
				r = t.getTextHeight(e.text, e.textFont),
				i = e.x;
			e.textAlign == "end" || e.textAlign == "right" ? i -= n : e.textAlign == "center" && (i -= n / 2);
			var s;
			return e.textBaseline == "top" ? s = e.y : e.textBaseline == "bottom" ? s = e.y - r : s = e.y - r / 2, e.__rect = {
				x: i,
				y: s,
				width: n,
				height: r
			}, e.__rect
		}
	}, e("../tool/util").inherits(r, n), r
}), define("zrender/shape/Rectangle", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			t.call(this, e)
		};
	return n.prototype = {
		type: "rectangle",
		_buildRadiusPath: function(e, t) {
			var n = t.x,
				r = t.y,
				i = t.width,
				s = t.height,
				o = t.radius,
				u, a, f, l;
			typeof o == "number" ? u = a = f = l = o : o instanceof Array ? o.length === 1 ? u = a = f = l = o[0] : o.length === 2 ? (u = f = o[0], a = l = o[1]) : o.length === 3 ? (u = o[0], a = l = o[1], f = o[2]) : (u = o[0], a = o[1], f = o[2], l = o[3]) : u = a = f = l = 0;
			var c;
			u + a > i && (c = u + a, u *= i / c, a *= i / c), f + l > i && (c = f + l, f *= i / c, l *= i / c), a + f > s && (c = a + f, a *= s / c, f *= s / c), u + l > s && (c = u + l, u *= s / c, l *= s / c), e.moveTo(n + u, r), e.lineTo(n + i - a, r), a !== 0 && e.quadraticCurveTo(n + i, r, n + i, r + a), e.lineTo(n + i, r + s - f), f !== 0 && e.quadraticCurveTo(n + i, r + s, n + i - f, r + s), e.lineTo(n + l, r + s), l !== 0 && e.quadraticCurveTo(n, r + s, n, r + s - l), e.lineTo(n, r + u), u !== 0 && e.quadraticCurveTo(n, r, n + u, r)
		},
		buildPath: function(e, t) {
			t.radius ? this._buildRadiusPath(e, t) : (e.moveTo(t.x, t.y), e.lineTo(t.x + t.width, t.y), e.lineTo(t.x + t.width, t.y + t.height), e.lineTo(t.x, t.y + t.height), e.lineTo(t.x, t.y)), e.closePath();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - t / 2),
				y: Math.round(e.y - t / 2),
				width: e.width + t,
				height: e.height + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/loadingEffect/Base", ["require", "../tool/util", "../shape/Text", "../shape/Rectangle"], function(e) {
	function o(e) {
		this.setOptions(e)
	}
	var t = e("../tool/util"),
		n = e("../shape/Text"),
		r = e("../shape/Rectangle"),
		i = "Loading...",
		s = "normal 16px Arial";
	return o.prototype.createTextShape = function(e) {
		return new n({
			highlightStyle: t.merge({
				x: this.canvasWidth / 2,
				y: this.canvasHeight / 2,
				text: i,
				textAlign: "center",
				textBaseline: "middle",
				textFont: s,
				color: "#333",
				brushType: "fill"
			}, e, !0)
		})
	}, o.prototype.createBackgroundShape = function(e) {
		return new r({
			highlightStyle: {
				x: 0,
				y: 0,
				width: this.canvasWidth,
				height: this.canvasHeight,
				brushType: "fill",
				color: e
			}
		})
	}, o.prototype.start = function(e) {
		function t(t) {
			e.storage.addHover(t)
		}

		function n() {
			e.refreshHover()
		}
		this.canvasWidth = e._width, this.canvasHeight = e._height, this.loadingTimer = this._start(t, n)
	}, o.prototype._start = function() {
		return setInterval(function() {}, 1e4)
	}, o.prototype.stop = function() {
		clearInterval(this.loadingTimer)
	}, o.prototype.setOptions = function(e) {
		this.options = e || {}
	}, o.prototype.adjust = function(e, t) {
		return e <= t[0] ? e = t[0] : e >= t[1] && (e = t[1]), e
	}, o.prototype.getLocation = function(e, t, n) {
		var r = e.x != null ? e.x : "center";
		switch (r) {
			case "center":
				r = Math.floor((this.canvasWidth - t) / 2);
				break;
			case "left":
				r = 0;
				break;
			case "right":
				r = this.canvasWidth - t
		}
		var i = e.y != null ? e.y : "center";
		switch (i) {
			case "center":
				i = Math.floor((this.canvasHeight - n) / 2);
				break;
			case "top":
				i = 0;
				break;
			case "bottom":
				i = this.canvasHeight - n
		}
		return {
			x: r,
			y: i,
			width: t,
			height: n
		}
	}, o
}), define("zrender/Layer", ["require", "./mixin/Transformable", "./tool/util", "./config"], function(e) {
	function s() {
		return !1
	}

	function o(e, t, n) {
		var r = document.createElement(t),
			s = n.getWidth(),
			o = n.getHeight();
		return r.style.position = "absolute", r.style.left = 0, r.style.top = 0, r.style.width = s + "px", r.style.height = o + "px", r.width = s * i.devicePixelRatio, r.height = o * i.devicePixelRatio, r.setAttribute("data-zr-dom-id", e), r
	}
	var t = e("./mixin/Transformable"),
		n = e("./tool/util"),
		r = window.G_vmlCanvasManager,
		i = e("./config"),
		u = function(e, n) {
			this.id = e, this.dom = o(e, "canvas", n), this.dom.onselectstart = s, this.dom.style["-webkit-user-select"] = "none", this.dom.style["user-select"] = "none", this.dom.style["-webkit-touch-callout"] = "none", this.dom.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r && r.initElement(this.dom), this.domBack = null, this.ctxBack = null, this.painter = n, this.unusedCount = 0, this.config = null, this.dirty = !0, this.elCount = 0, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.zoomable = !1, this.panable = !1, this.maxZoom = Infinity, this.minZoom = 0, t.call(this)
		};
	return u.prototype.initContext = function() {
		this.ctx = this.dom.getContext("2d");
		var e = i.devicePixelRatio;
		e != 1 && this.ctx.scale(e, e)
	}, u.prototype.createBackBuffer = function() {
		if (r) return;
		this.domBack = o("back-" + this.id, "canvas", this.painter), this.ctxBack = this.domBack.getContext("2d");
		var e = i.devicePixelRatio;
		e != 1 && this.ctxBack.scale(e, e)
	}, u.prototype.resize = function(e, t) {
		var n = i.devicePixelRatio;
		this.dom.style.width = e + "px", this.dom.style.height = t + "px", this.dom.setAttribute("width", e * n), this.dom.setAttribute("height", t * n), n != 1 && this.ctx.scale(n, n), this.domBack && (this.domBack.setAttribute("width", e * n), this.domBack.setAttribute("height", t * n), n != 1 && this.ctxBack.scale(n, n))
	}, u.prototype.clear = function() {
		var e = this.dom,
			t = this.ctx,
			n = e.width,
			s = e.height,
			o = this.clearColor && !r,
			u = this.motionBlur && !r,
			a = this.lastFrameAlpha,
			f = i.devicePixelRatio;
		u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(e, 0, 0, n / f, s / f)), t.clearRect(0, 0, n / f, s / f), o && (t.save(), t.fillStyle = this.clearColor, t.fillRect(0, 0, n / f, s / f), t.restore());
		if (u) {
			var l = this.domBack;
			t.save(), t.globalAlpha = a, t.drawImage(l, 0, 0, n / f, s / f), t.restore()
		}
	}, n.merge(u.prototype, t.prototype), u
}), define("zrender/shape/Image", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			t.call(this, e)
		};
	return n.prototype = {
		type: "image",
		brush: function(e, t, n) {
			var r = this.style || {};
			t && (r = this.getHighlightStyle(r, this.highlightStyle || {}));
			var i = r.image,
				s = this;
			this._imageCache || (this._imageCache = {});
			if (typeof i == "string") {
				var o = i;
				this._imageCache[o] ? i = this._imageCache[o] : (i = new Image, i.onload = function() {
					i.onload = null, s.modSelf(), n()
				}, i.src = o, this._imageCache[o] = i)
			}
			if (i) {
				if (i.nodeName.toUpperCase() == "IMG")
					if (window.ActiveXObject) {
						if (i.readyState != "complete") return
					} else if (!i.complete) return;
				var u = r.width || i.width,
					a = r.height || i.height,
					f = r.x,
					l = r.y;
				if (!i.width || !i.height) return;
				e.save(), this.doClip(e), this.setContext(e, r), this.setTransform(e);
				if (r.sWidth && r.sHeight) {
					var c = r.sx || 0,
						h = r.sy || 0;
					e.drawImage(i, c, h, r.sWidth, r.sHeight, f, l, u, a)
				} else if (r.sx && r.sy) {
					var c = r.sx,
						h = r.sy,
						p = u - c,
						d = a - h;
					e.drawImage(i, c, h, p, d, f, l, u, a)
				} else e.drawImage(i, f, l, u, a);
				r.width || (r.width = u), r.height || (r.height = a), this.style.width || (this.style.width = u), this.style.height || (this.style.height = a), this.drawText(e, r, this.style), e.restore()
			}
		},
		getRect: function(e) {
			return {
				x: e.x,
				y: e.y,
				width: e.width,
				height: e.height
			}
		},
		clearCache: function() {
			this._imageCache = {}
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/Painter", ["require", "./config", "./tool/util", "./tool/log", "./loadingEffect/Base", "./Layer", "./shape/Image"], function(e) {
	function o() {
		return !1
	}

	function u() {}

	function a(e) {
		return e ? e.isBuildin ? !0 : typeof e.resize != "function" || typeof e.refresh != "function" ? !1 : !0 : !1
	}
	var t = e("./config"),
		n = e("./tool/util"),
		r = e("./tool/log"),
		i = e("./loadingEffect/Base"),
		s = e("./Layer"),
		f = function(e, t) {
			this.root = e, e.style["-webkit-tap-highlight-color"] = "transparent", e.style["-webkit-user-select"] = "none", e.style["user-select"] = "none", e.style["-webkit-touch-callout"] = "none", this.storage = t, e.innerHTML = "", this._width = this._getWidth(), this._height = this._getHeight();
			var n = document.createElement("div");
			this._domRoot = n, n.style.position = "relative", n.style.overflow = "hidden", n.style.width = this._width + "px", n.style.height = this._height + "px", e.appendChild(n), this._layers = {}, this._zlevelList = [], this._layerConfig = {}, this._loadingEffect = new i({}), this.shapeToImage = this._createShapeToImageProcessor(), this._bgDom = document.createElement("div"), this._bgDom.style.cssText = ["position:absolute;left:0px;top:0px;width:", this._width, "px;height:", this._height + "px;", "-webkit-user-select:none;user-select;none;", "-webkit-touch-callout:none;"].join(""), this._bgDom.setAttribute("data-zr-dom-id", "bg"), n.appendChild(this._bgDom), this._bgDom.onselectstart = o;
			var r = new s("_zrender_hover_", this);
			this._layers.hover = r, n.appendChild(r.dom), r.initContext(), r.dom.onselectstart = o, r.dom.style["-webkit-user-select"] = "none", r.dom.style["user-select"] = "none", r.dom.style["-webkit-touch-callout"] = "none", this.refreshNextFrame = null
		};
	return f.prototype.render = function(e) {
		return this.isLoading() && this.hideLoading(), this.refresh(e, !0), this
	}, f.prototype.refresh = function(e, t) {
		var n = this.storage.getShapeList(!0);
		this._paintList(n, t);
		for (var r = 0; r < this._zlevelList.length; r++) {
			var i = this._zlevelList[r],
				s = this._layers[i];
			!s.isBuildin && s.refresh && s.refresh()
		}
		return typeof e == "function" && e(), this
	}, f.prototype._preProcessLayer = function(e) {
		e.unusedCount++, e.updateTransform()
	}, f.prototype._postProcessLayer = function(e) {
		e.dirty = !1, e.unusedCount == 1 && e.clear()
	}, f.prototype._paintList = function(e, n) {
		typeof n == "undefined" && (n = !1), this._updateLayerStatus(e);
		var i, s, o;
		this.eachBuildinLayer(this._preProcessLayer);
		for (var u = 0, a = e.length; u < a; u++) {
			var f = e[u];
			s !== f.zlevel && (i && (i.needTransform && o.restore(), o.flush && o.flush()), s = f.zlevel, i = this.getLayer(s), i.isBuildin || r("ZLevel " + s + " has been used by unkown layer " + i.id), o = i.ctx, i.unusedCount = 0, (i.dirty || n) && i.clear(), i.needTransform && (o.save(), i.setTransform(o)));
			if ((i.dirty || n) && !f.invisible)
				if (!f.onbrush || f.onbrush && !f.onbrush(o, !1))
					if (t.catchBrushException) try {
						f.brush(o, !1, this.refreshNextFrame)
					} catch (l) {
						r(l, "brush error of " + f.type, f)
					} else f.brush(o, !1, this.refreshNextFrame);
			f.__dirty = !1
		}
		i && (i.needTransform && o.restore(), o.flush && o.flush()), this.eachBuildinLayer(this._postProcessLayer)
	}, f.prototype.getLayer = function(e) {
		var t = this._layers[e];
		return t || (t = new s(e, this), t.isBuildin = !0, this._layerConfig[e] && n.merge(t, this._layerConfig[e], !0), t.updateTransform(), this.insertLayer(e, t), t.initContext()), t
	}, f.prototype.insertLayer = function(e, t) {
		if (this._layers[e]) {
			r("ZLevel " + e + " has been used already");
			return
		}
		if (!a(t)) {
			r("Layer of zlevel " + e + " is not valid");
			return
		}
		var n = this._zlevelList.length,
			i = null,
			s = -1;
		if (n > 0 && e > this._zlevelList[0]) {
			for (s = 0; s < n - 1; s++)
				if (this._zlevelList[s] < e && this._zlevelList[s + 1] > e) break;
			i = this._layers[this._zlevelList[s]]
		}
		this._zlevelList.splice(s + 1, 0, e);
		var o = i ? i.dom : this._bgDom;
		o.nextSibling ? o.parentNode.insertBefore(t.dom, o.nextSibling) : o.parentNode.appendChild(t.dom), this._layers[e] = t
	}, f.prototype.eachLayer = function(e, t) {
		for (var n = 0; n < this._zlevelList.length; n++) {
			var r = this._zlevelList[n];
			e.call(t, this._layers[r], r)
		}
	}, f.prototype.eachBuildinLayer = function(e, t) {
		for (var n = 0; n < this._zlevelList.length; n++) {
			var r = this._zlevelList[n],
				i = this._layers[r];
			i.isBuildin && e.call(t, i, r)
		}
	}, f.prototype.eachOtherLayer = function(e, t) {
		for (var n = 0; n < this._zlevelList.length; n++) {
			var r = this._zlevelList[n],
				i = this._layers[r];
			i.isBuildin || e.call(t, i, r)
		}
	}, f.prototype.getLayers = function() {
		return this._layers
	}, f.prototype._updateLayerStatus = function(e) {
		var t = this._layers,
			n = {};
		this.eachBuildinLayer(function(e, t) {
			n[t] = e.elCount, e.elCount = 0
		});
		for (var r = 0, i = e.length; r < i; r++) {
			var s = e[r],
				o = s.zlevel,
				u = t[o];
			if (u) {
				u.elCount++;
				if (u.dirty) continue;
				u.dirty = s.__dirty
			}
		}
		this.eachBuildinLayer(function(e, t) {
			n[t] !== e.elCount && (e.dirty = !0)
		})
	}, f.prototype.refreshShapes = function(e, t) {
		for (var n = 0, r = e.length; n < r; n++) {
			var i = e[n];
			i.modSelf()
		}
		return this.refresh(t), this
	}, f.prototype.setLoadingEffect = function(e) {
		return this._loadingEffect = e, this
	}, f.prototype.clear = function() {
		return this.eachBuildinLayer(this._clearLayer), this
	}, f.prototype._clearLayer = function(e) {
		e.clear()
	}, f.prototype.modLayer = function(e, t) {
		if (t) {
			this._layerConfig[e] ? n.merge(this._layerConfig[e], t, !0) : this._layerConfig[e] = t;
			var r = this._layers[e];
			r && n.merge(r, this._layerConfig[e], !0)
		}
	}, f.prototype.delLayer = function(e) {
		var t = this._layers[e];
		if (!t) return;
		this.modLayer(e, {
			position: t.position,
			rotation: t.rotation,
			scale: t.scale
		}), t.dom.parentNode.removeChild(t.dom), delete this._layers[e], this._zlevelList.splice(n.indexOf(this._zlevelList, e), 1)
	}, f.prototype.refreshHover = function() {
		this.clearHover();
		var e = this.storage.getHoverShapes(!0);
		for (var t = 0, n = e.length; t < n; t++) this._brushHover(e[t]);
		var r = this._layers.hover.ctx;
		return r.flush && r.flush(), this.storage.delHover(), this
	}, f.prototype.clearHover = function() {
		var e = this._layers.hover;
		return e && e.clear(), this
	}, f.prototype.showLoading = function(e) {
		return this._loadingEffect && this._loadingEffect.stop(), e && this.setLoadingEffect(e), this._loadingEffect.start(this), this.loading = !0, this
	}, f.prototype.hideLoading = function() {
		return this._loadingEffect.stop(), this.clearHover(), this.loading = !1, this
	}, f.prototype.isLoading = function() {
		return this.loading
	}, f.prototype.resize = function() {
		var e = this._domRoot;
		e.style.display = "none";
		var t = this._getWidth(),
			n = this._getHeight();
		e.style.display = "";
		if (this._width != t || n != this._height) {
			this._width = t, this._height = n, e.style.width = t + "px", e.style.height = n + "px";
			for (var r in this._layers) this._layers[r].resize(t, n);
			this.refresh(null, !0)
		}
		return this
	}, f.prototype.clearLayer = function(e) {
		var t = this._layers[e];
		t && t.clear()
	}, f.prototype.dispose = function() {
		this.isLoading() && this.hideLoading(), this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
	}, f.prototype.getDomHover = function() {
		return this._layers.hover.dom
	}, f.prototype.toDataURL = function(e, n, i) {
		if (window.G_vmlCanvasManager) return null;
		var o = new s("image", this);
		this._bgDom.appendChild(o.dom), o.initContext();
		var u = o.ctx;
		o.clearColor = n || "#fff", o.clear();
		var a = this;
		this.storage.iterShape(function(e) {
			if (!e.invisible)
				if (!e.onbrush || e.onbrush && !e.onbrush(u, !1))
					if (t.catchBrushException) try {
						e.brush(u, !1, a.refreshNextFrame)
					} catch (n) {
						r(n, "brush error of " + e.type, e)
					} else e.brush(u, !1, a.refreshNextFrame)
		}, {
			normal: "up",
			update: !0
		});
		var f = o.dom.toDataURL(e, i);
		return u = null, this._bgDom.removeChild(o.dom), f
	}, f.prototype.getWidth = function() {
		return this._width
	}, f.prototype.getHeight = function() {
		return this._height
	}, f.prototype._getWidth = function() {
		var e = this.root,
			t = e.currentStyle || document.defaultView.getComputedStyle(e);
		return ((e.clientWidth || parseInt(t.width, 10)) - parseInt(t.paddingLeft, 10) - parseInt(t.paddingRight, 10)).toFixed(0) - 0
	}, f.prototype._getHeight = function() {
		var e = this.root,
			t = e.currentStyle || document.defaultView.getComputedStyle(e);
		return ((e.clientHeight || parseInt(t.height, 10)) - parseInt(t.paddingTop, 10) - parseInt(t.paddingBottom, 10)).toFixed(0) - 0
	}, f.prototype._brushHover = function(e) {
		var n = this._layers.hover.ctx;
		if (!e.onbrush || e.onbrush && !e.onbrush(n, !0)) {
			var i = this.getLayer(e.zlevel);
			i.needTransform && (n.save(), i.setTransform(n));
			if (t.catchBrushException) try {
				e.brush(n, !0, this.refreshNextFrame)
			} catch (s) {
				r(s, "hoverBrush error of " + e.type, e)
			} else e.brush(n, !0, this.refreshNextFrame);
			i.needTransform && n.restore()
		}
	}, f.prototype._shapeToImage = function(t, n, r, i, s) {
		var o = document.createElement("canvas"),
			u = o.getContext("2d");
		o.style.width = r + "px", o.style.height = i + "px", o.setAttribute("width", r * s), o.setAttribute("height", i * s), u.clearRect(0, 0, r * s, i * s);
		var a = {
			position: n.position,
			rotation: n.rotation,
			scale: n.scale
		};
		n.position = [0, 0, 0], n.rotation = 0, n.scale = [1, 1], n && n.brush(u, !1);
		var f = e("./shape/Image"),
			l = new f({
				id: t,
				style: {
					x: 0,
					y: 0,
					image: o
				}
			});
		return a.position != null && (l.position = n.position = a.position), a.rotation != null && (l.rotation = n.rotation = a.rotation), a.scale != null && (l.scale = n.scale = a.scale), l
	}, f.prototype._createShapeToImageProcessor = function() {
		if (window.G_vmlCanvasManager) return u;
		var e = this;
		return function(n, r, i, s) {
			return e._shapeToImage(n, r, i, s, t.devicePixelRatio)
		}
	}, f
}), define("zrender/Group", ["require", "./tool/guid", "./tool/util", "./mixin/Transformable", "./mixin/Eventful"], function(e) {
	var t = e("./tool/guid"),
		n = e("./tool/util"),
		r = e("./mixin/Transformable"),
		i = e("./mixin/Eventful"),
		s = function(e) {
			e = e || {}, this.id = e.id || t();
			for (var n in e) this[n] = e[n];
			this.type = "group", this.clipShape = null, this._children = [], this._storage = null, this.__dirty = !0, r.call(this), i.call(this)
		};
	return s.prototype.ignore = !1, s.prototype.children = function() {
		return this._children.slice()
	}, s.prototype.childAt = function(e) {
		return this._children[e]
	}, s.prototype.addChild = function(e) {
		if (e == this) return;
		if (e.parent == this) return;
		e.parent && e.parent.removeChild(e), this._children.push(e), e.parent = this, this._storage && this._storage !== e._storage && (this._storage.addToMap(e), e instanceof s && e.addChildrenToStorage(this._storage))
	}, s.prototype.removeChild = function(e) {
		var t = n.indexOf(this._children, e);
		this._children.splice(t, 1), e.parent = null, this._storage && (this._storage.delFromMap(e.id), e instanceof s && e.delChildrenFromStorage(this._storage))
	}, s.prototype.clearChildren = function() {
		for (var e = 0; e < this._children.length; e++) {
			var t = this._children[e];
			this._storage && (this._storage.delFromMap(t.id), t instanceof s && t.delChildrenFromStorage(this._storage))
		}
		this._children.length = 0
	}, s.prototype.eachChild = function(e, t) {
		var n = !!t;
		for (var r = 0; r < this._children.length; r++) {
			var i = this._children[r];
			n ? e.call(t, i) : e(i)
		}
	}, s.prototype.traverse = function(e, t) {
		var n = !!t;
		for (var r = 0; r < this._children.length; r++) {
			var i = this._children[r];
			n ? e.call(t, i) : e(i), i.type === "group" && i.traverse(e, t)
		}
	}, s.prototype.addChildrenToStorage = function(e) {
		for (var t = 0; t < this._children.length; t++) {
			var n = this._children[t];
			e.addToMap(n), n instanceof s && n.addChildrenToStorage(e)
		}
	}, s.prototype.delChildrenFromStorage = function(e) {
		for (var t = 0; t < this._children.length; t++) {
			var n = this._children[t];
			e.delFromMap(n.id), n instanceof s && n.delChildrenFromStorage(e)
		}
	}, s.prototype.modSelf = function() {
		this.__dirty = !0
	}, n.merge(s.prototype, r.prototype, !0), n.merge(s.prototype, i.prototype, !0), s
}), define("zrender/Storage", ["require", "./tool/util", "./Group"], function(e) {
	function i(e, t) {
		return e.zlevel == t.zlevel ? e.z == t.z ? e.__renderidx - t.__renderidx : e.z - t.z : e.zlevel - t.zlevel
	}
	var t = e("./tool/util"),
		n = e("./Group"),
		r = {
			hover: !1,
			normal: "down",
			update: !1
		},
		s = function() {
			this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], this._shapeListOffset = 0
		};
	return s.prototype.iterShape = function(e, t) {
		t || (t = r);
		if (t.hover)
			for (var n = 0, i = this._hoverElements.length; n < i; n++) {
				var s = this._hoverElements[n];
				s.updateTransform();
				if (e(s)) return this
			}
		t.update && this.updateShapeList();
		switch (t.normal) {
			case "down":
				var i = this._shapeList.length;
				while (i--)
					if (e(this._shapeList[i])) return this;
				break;
			default:
				for (var n = 0, i = this._shapeList.length; n < i; n++)
					if (e(this._shapeList[n])) return this
		}
		return this
	}, s.prototype.getHoverShapes = function(e) {
		var t = [];
		for (var n = 0, r = this._hoverElements.length; n < r; n++) {
			t.push(this._hoverElements[n]);
			var s = this._hoverElements[n].hoverConnect;
			if (s) {
				var o;
				s = s instanceof Array ? s : [s];
				for (var u = 0, a = s.length; u < a; u++) o = s[u].id ? s[u] : this.get(s[u]), o && t.push(o)
			}
		}
		t.sort(i);
		if (e)
			for (var n = 0, r = t.length; n < r; n++) t[n].updateTransform();
		return t
	}, s.prototype.getShapeList = function(e) {
		return e && this.updateShapeList(), this._shapeList
	}, s.prototype.updateShapeList = function() {
		this._shapeListOffset = 0;
		for (var e = 0, t = this._roots.length; e < t; e++) {
			var n = this._roots[e];
			this._updateAndAddShape(n)
		}
		this._shapeList.length = this._shapeListOffset;
		for (var e = 0, t = this._shapeList.length; e < t; e++) this._shapeList[e].__renderidx = e;
		this._shapeList.sort(i)
	}, s.prototype._updateAndAddShape = function(e, t) {
		if (e.ignore) return;
		e.updateTransform();
		if (e.type == "group") {
			e.clipShape && (e.clipShape.parent = e, e.clipShape.updateTransform(), t ? (t = t.slice(), t.push(e.clipShape)) : t = [e.clipShape]);
			for (var n = 0; n < e._children.length; n++) {
				var r = e._children[n];
				r.__dirty = e.__dirty || r.__dirty, this._updateAndAddShape(r, t)
			}
			e.__dirty = !1
		} else e.__clipShapes = t, this._shapeList[this._shapeListOffset++] = e
	}, s.prototype.mod = function(e, n) {
		var r = this._elements[e];
		if (r) {
			r.modSelf();
			if (n)
				if (n.parent || n._storage || n.__clipShapes) {
					var i = {};
					for (var s in n) {
						if (s === "parent" || s === "_storage" || s === "__clipShapes") continue;
						n.hasOwnProperty(s) && (i[s] = n[s])
					}
					t.merge(r, i, !0)
				} else t.merge(r, n, !0)
		}
		return this
	}, s.prototype.drift = function(e, t, n) {
		var r = this._elements[e];
		return r && (r.needTransform = !0, r.draggable === "horizontal" ? n = 0 : r.draggable === "vertical" && (t = 0), (!r.ondrift || r.ondrift && !r.ondrift(t, n)) && r.drift(t, n)), this
	}, s.prototype.addHover = function(e) {
		return e.updateNeedTransform(), this._hoverElements.push(e), this
	}, s.prototype.delHover = function() {
		return this._hoverElements = [], this
	}, s.prototype.hasHoverShape = function() {
		return this._hoverElements.length > 0
	}, s.prototype.addRoot = function(e) {
		e instanceof n && e.addChildrenToStorage(this), this.addToMap(e), this._roots.push(e)
	}, s.prototype.delRoot = function(e) {
		if (typeof e == "undefined") {
			for (var r = 0; r < this._roots.length; r++) {
				var i = this._roots[r];
				i instanceof n && i.delChildrenFromStorage(this)
			}
			this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], this._shapeListOffset = 0;
			return
		}
		if (e instanceof Array) {
			for (var r = 0, s = e.length; r < s; r++) this.delRoot(e[r]);
			return
		}
		var o;
		typeof e == "string" ? o = this._elements[e] : o = e;
		var u = t.indexOf(this._roots, o);
		u >= 0 && (this.delFromMap(o.id), this._roots.splice(u, 1), o instanceof n && o.delChildrenFromStorage(this))
	}, s.prototype.addToMap = function(e) {
		return e instanceof n && (e._storage = this), e.modSelf(), this._elements[e.id] = e, this
	}, s.prototype.get = function(e) {
		return this._elements[e]
	}, s.prototype.delFromMap = function(e) {
		var t = this._elements[e];
		return t && (delete this._elements[e], t instanceof n && (t._storage = null)), this
	}, s.prototype.dispose = function() {
		this._elements = this._renderList = this._roots = this._hoverElements = null
	}, s
}), define("zrender/animation/easing", [], function() {
	var e = {
		Linear: function(e) {
			return e
		},
		QuadraticIn: function(e) {
			return e * e
		},
		QuadraticOut: function(e) {
			return e * (2 - e)
		},
		QuadraticInOut: function(e) {
			return (e *= 2) < 1 ? .5 * e * e : -0.5 * (--e * (e - 2) - 1)
		},
		CubicIn: function(e) {
			return e * e * e
		},
		CubicOut: function(e) {
			return --e * e * e + 1
		},
		CubicInOut: function(e) {
			return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
		},
		QuarticIn: function(e) {
			return e * e * e * e
		},
		QuarticOut: function(e) {
			return 1 - --e * e * e * e
		},
		QuarticInOut: function(e) {
			return (e *= 2) < 1 ? .5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2)
		},
		QuinticIn: function(e) {
			return e * e * e * e * e
		},
		QuinticOut: function(e) {
			return --e * e * e * e * e + 1
		},
		QuinticInOut: function(e) {
			return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
		},
		SinusoidalIn: function(e) {
			return 1 - Math.cos(e * Math.PI / 2)
		},
		SinusoidalOut: function(e) {
			return Math.sin(e * Math.PI / 2)
		},
		SinusoidalInOut: function(e) {
			return .5 * (1 - Math.cos(Math.PI * e))
		},
		ExponentialIn: function(e) {
			return e === 0 ? 0 : Math.pow(1024, e - 1)
		},
		ExponentialOut: function(e) {
			return e === 1 ? 1 : 1 - Math.pow(2, -10 * e)
		},
		ExponentialInOut: function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
		},
		CircularIn: function(e) {
			return 1 - Math.sqrt(1 - e * e)
		},
		CircularOut: function(e) {
			return Math.sqrt(1 - --e * e)
		},
		CircularInOut: function(e) {
			return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
		},
		ElasticIn: function(e) {
			var t, n = .1,
				r = .4;
			return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r)))
		},
		ElasticOut: function(e) {
			var t, n = .1,
				r = .4;
			return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * e) * Math.sin((e - t) * 2 * Math.PI / r) + 1)
		},
		ElasticInOut: function(e) {
			var t, n = .1,
				r = .4;
			return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), (e *= 2) < 1 ? -0.5 * n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / r) * .5 + 1)
		},
		BackIn: function(e) {
			var t = 1.70158;
			return e * e * ((t + 1) * e - t)
		},
		BackOut: function(e) {
			var t = 1.70158;
			return --e * e * ((t + 1) * e + t) + 1
		},
		BackInOut: function(e) {
			var t = 2.5949095;
			return (e *= 2) < 1 ? .5 * e * e * ((t + 1) * e - t) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
		},
		BounceIn: function(t) {
			return 1 - e.BounceOut(1 - t)
		},
		BounceOut: function(e) {
			return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
		},
		BounceInOut: function(t) {
			return t < .5 ? e.BounceIn(t * 2) * .5 : e.BounceOut(t * 2 - 1) * .5 + .5
		}
	};
	return e
}), define("zrender/animation/Clip", ["require", "./easing"], function(e) {
	function n(e) {
		this._targetPool = e.target || {}, this._targetPool instanceof Array || (this._targetPool = [this._targetPool]), this._life = e.life || 1e3, this._delay = e.delay || 0, this._startTime = (new Date).getTime() + this._delay, this._endTime = this._startTime + this._life * 1e3, this.loop = typeof e.loop == "undefined" ? !1 : e.loop, this.gap = e.gap || 0, this.easing = e.easing || "Linear", this.onframe = e.onframe, this.ondestroy = e.ondestroy, this.onrestart = e.onrestart
	}
	var t = e("./easing");
	return n.prototype = {
		step: function(e) {
			var n = (e - this._startTime) / this._life;
			if (n < 0) return;
			n = Math.min(n, 1);
			var r = typeof this.easing == "string" ? t[this.easing] : this.easing,
				i = typeof r == "function" ? r(n) : n;
			return this.fire("frame", i), n == 1 ? this.loop ? (this.restart(), "restart") : (this._needsRemove = !0, "destroy") : null
		},
		restart: function() {
			var e = (new Date).getTime(),
				t = (e - this._startTime) % this._life;
			this._startTime = (new Date).getTime() - t + this.gap, this._needsRemove = !1
		},
		fire: function(e, t) {
			for (var n = 0, r = this._targetPool.length; n < r; n++) this["on" + e] && this["on" + e](this._targetPool[n], t)
		},
		constructor: n
	}, n
}), define("zrender/animation/Animation", ["require", "./Clip", "../tool/color", "../tool/util", "../tool/event"], function(e) {
	function a(e, t) {
		return e[t]
	}

	function f(e, t, n) {
		e[t] = n
	}

	function l(e, t, n) {
		return (t - e) * n + e
	}

	function c(e, t, n, r, i) {
		var s = e.length;
		if (i == 1)
			for (var o = 0; o < s; o++) r[o] = l(e[o], t[o], n);
		else {
			var u = e[0].length;
			for (var o = 0; o < s; o++)
				for (var a = 0; a < u; a++) r[o][a] = l(e[o][a], t[o][a], n)
		}
	}

	function h(e) {
		switch (typeof e) {
			case "undefined":
			case "string":
				return !1
		}
		return typeof e.length != "undefined"
	}

	function p(e, t, n, r, i, s, o, u, a) {
		var f = e.length;
		if (a == 1)
			for (var l = 0; l < f; l++) u[l] = d(e[l], t[l], n[l], r[l], i, s, o);
		else {
			var c = e[0].length;
			for (var l = 0; l < f; l++)
				for (var h = 0; h < c; h++) u[l][h] = d(e[l][h], t[l][h], n[l][h], r[l][h], i, s, o)
		}
	}

	function d(e, t, n, r, i, s, o) {
		var u = (n - e) * .5,
			a = (r - t) * .5;
		return (2 * (t - n) + u + a) * o + (-3 * (t - n) - 2 * u - a) * s + u * i + t
	}

	function v(e) {
		if (h(e)) {
			var t = e.length;
			if (h(e[0])) {
				var n = [];
				for (var r = 0; r < t; r++) n.push(o.call(e[r]));
				return n
			}
			return o.call(e)
		}
		return e
	}

	function m(e) {
		return e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.floor(e[2]), "rgba(" + e.join(",") + ")"
	}
	var t = e("./Clip"),
		n = e("../tool/color"),
		r = e("../tool/util"),
		i = e("../tool/event").Dispatcher,
		s = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
			setTimeout(e, 16)
		},
		o = Array.prototype.slice,
		u = function(e) {
			e = e || {}, this.stage = e.stage || {}, this.onframe = e.onframe || function() {}, this._clips = [], this._running = !1, this._time = 0, i.call(this)
		};
	u.prototype = {
		add: function(e) {
			this._clips.push(e)
		},
		remove: function(e) {
			var t = r.indexOf(this._clips, e);
			t >= 0 && this._clips.splice(t, 1)
		},
		_update: function() {
			var e = (new Date).getTime(),
				t = e - this._time,
				n = this._clips,
				r = n.length,
				i = [],
				s = [];
			for (var o = 0; o < r; o++) {
				var u = n[o],
					a = u.step(e);
				a && (i.push(a), s.push(u))
			}
			for (var o = 0; o < r;) n[o]._needsRemove ? (n[o] = n[r - 1], n.pop(), r--) : o++;
			r = i.length;
			for (var o = 0; o < r; o++) s[o].fire(i[o]);
			this._time = e, this.onframe(t), this.dispatch("frame", t), this.stage.update && this.stage.update()
		},
		start: function() {
			function t() {
				e._running && (e._update(), s(t))
			}
			var e = this;
			this._running = !0, this._time = (new Date).getTime(), s(t)
		},
		stop: function() {
			this._running = !1
		},
		clear: function() {
			this._clips = []
		},
		animate: function(e, t) {
			t = t || {};
			var n = new g(e, t.loop, t.getter, t.setter);
			return n.animation = this, n
		},
		constructor: u
	}, r.merge(u.prototype, i.prototype, !0);
	var g = function(e, t, n, r) {
		this._tracks = {}, this._target = e, this._loop = t || !1, this._getter = n || a, this._setter = r || f, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
	};
	return g.prototype = {
		when: function(e, t) {
			for (var n in t) this._tracks[n] || (this._tracks[n] = [], e !== 0 && this._tracks[n].push({
				time: 0,
				value: v(this._getter(this._target, n))
			})), this._tracks[n].push({
				time: parseInt(e, 10),
				value: t[n]
			});
			return this
		},
		during: function(e) {
			return this._onframeList.push(e), this
		},
		start: function(e) {
			var r = this,
				i = this._setter,
				s = this._getter,
				o = e === "spline",
				u = function() {
					r._clipCount--;
					if (r._clipCount === 0) {
						r._tracks = {};
						var e = r._doneList.length;
						for (var t = 0; t < e; t++) r._doneList[t].call(r)
					}
				},
				a = function(a, f) {
					var v = a.length;
					if (!v) return;
					var g = a[0].value,
						y = h(g),
						b = !1,
						w = y && h(g[0]) ? 2 : 1;
					a.sort(function(e, t) {
						return e.time - t.time
					});
					var E;
					if (!v) return;
					E = a[v - 1].time;
					var S = [],
						x = [];
					for (var T = 0; T < v; T++) {
						S.push(a[T].time / E);
						var N = a[T].value;
						typeof N == "string" && (N = n.toArray(N), N.length === 0 && (N[0] = N[1] = N[2] = 0, N[3] = 1), b = !0), x.push(N)
					}
					var C = 0,
						k = 0,
						L, T, A, O, M, _, D;
					if (b) var P = [0, 0, 0, 0];
					var H = function(e, t) {
							if (t < k) {
								L = Math.min(C + 1, v - 1);
								for (T = L; T >= 0; T--)
									if (S[T] <= t) break;
								T = Math.min(T, v - 2)
							} else {
								for (T = C; T < v; T++)
									if (S[T] > t) break;
								T = Math.min(T - 1, v - 2)
							}
							C = T, k = t;
							var n = S[T + 1] - S[T];
							if (n === 0) return;
							A = (t - S[T]) / n;
							if (o) {
								M = x[T], O = x[T === 0 ? T : T - 1], _ = x[T > v - 2 ? v - 1 : T + 1], D = x[T > v - 3 ? v - 1 : T + 2];
								if (y) p(O, M, _, D, A, A * A, A * A * A, s(e, f), w);
								else {
									var u;
									b ? (u = p(O, M, _, D, A, A * A, A * A * A, P, 1), u = m(P)) : u = d(O, M, _, D, A, A * A, A * A * A), i(e, f, u)
								}
							} else if (y) c(x[T], x[T + 1], A, s(e, f), w);
							else {
								var u;
								b ? (c(x[T], x[T + 1], A, P, 1), u = m(P)) : u = l(x[T], x[T + 1], A), i(e, f, u)
							}
							for (T = 0; T < r._onframeList.length; T++) r._onframeList[T](e, t)
						},
						B = new t({
							target: r._target,
							life: E,
							loop: r._loop,
							delay: r._delay,
							onframe: H,
							ondestroy: u
						});
					e && e !== "spline" && (B.easing = e), r._clipList.push(B), r._clipCount++, r.animation.add(B)
				};
			for (var f in this._tracks) a(this._tracks[f], f);
			return this
		},
		stop: function() {
			for (var e = 0; e < this._clipList.length; e++) {
				var t = this._clipList[e];
				this.animation.remove(t)
			}
			this._clipList = []
		},
		delay: function(e) {
			return this._delay = e, this
		},
		done: function(e) {
			return e && this._doneList.push(e), this
		}
	}, u
}), define("zrender/zrender", ["require", "./dep/excanvas", "./tool/util", "./tool/log", "./tool/guid", "./Handler", "./Painter", "./Storage", "./animation/Animation", "./tool/env"], function(e) {
	function l(e) {
		return function() {
			var t = e.animatingElements;
			for (var n = 0, r = t.length; n < r; n++) e.storage.mod(t[n].id);
			(t.length || e._needsRefreshNextFrame) && e.refresh()
		}
	}
	e("./dep/excanvas");
	var t = e("./tool/util"),
		n = e("./tool/log"),
		r = e("./tool/guid"),
		i = e("./Handler"),
		s = e("./Painter"),
		o = e("./Storage"),
		u = e("./animation/Animation"),
		a = {},
		f = {};
	f.version = "2.0.7", f.init = function(e) {
		var t = new c(r(), e);
		return a[t.id] = t, t
	}, f.dispose = function(e) {
		if (e) e.dispose();
		else {
			for (var t in a) a[t].dispose();
			a = {}
		}
		return f
	}, f.getInstance = function(e) {
		return a[e]
	}, f.delInstance = function(e) {
		return delete a[e], f
	};
	var c = function(t, n) {
		this.id = t, this.env = e("./tool/env"), this.storage = new o, this.painter = new s(n, this.storage), this.handler = new i(n, this.storage, this.painter), this.animatingElements = [], this.animation = new u({
			stage: {
				update: l(this)
			}
		}), this.animation.start();
		var r = this;
		this.painter.refreshNextFrame = function() {
			r.refreshNextFrame()
		}, this._needsRefreshNextFrame = !1
	};
	return c.prototype.getId = function() {
		return this.id
	}, c.prototype.addShape = function(e) {
		return this.storage.addRoot(e), this
	}, c.prototype.addGroup = function(e) {
		return this.storage.addRoot(e), this
	}, c.prototype.delShape = function(e) {
		return this.storage.delRoot(e), this
	}, c.prototype.delGroup = function(e) {
		return this.storage.delRoot(e), this
	}, c.prototype.modShape = function(e, t) {
		return this.storage.mod(e, t), this
	}, c.prototype.modGroup = function(e, t) {
		return this.storage.mod(e, t), this
	}, c.prototype.modLayer = function(e, t) {
		return this.painter.modLayer(e, t), this
	}, c.prototype.addHoverShape = function(e) {
		return this.storage.addHover(e), this
	}, c.prototype.render = function(e) {
		return this.painter.render(e), this._needsRefreshNextFrame = !1, this
	}, c.prototype.refresh = function(e) {
		return this.painter.refresh(e), this._needsRefreshNextFrame = !1, this
	}, c.prototype.refreshNextFrame = function() {
		return this._needsRefreshNextFrame = !0, this
	}, c.prototype.refreshHover = function(e) {
		return this.painter.refreshHover(e), this
	}, c.prototype.refreshShapes = function(e, t) {
		return this.painter.refreshShapes(e, t), this
	}, c.prototype.resize = function() {
		return this.painter.resize(), this
	}, c.prototype.animate = function(e, r, i) {
		typeof e == "string" && (e = this.storage.get(e));
		if (e) {
			var s;
			if (r) {
				var o = r.split("."),
					u = e;
				for (var a = 0, f = o.length; a < f; a++) {
					if (!u) continue;
					u = u[o[a]]
				}
				u && (s = u)
			} else s = e;
			if (!s) {
				n('Property "' + r + '" is not existed in element ' + e.id);
				return
			}
			var l = this.animatingElements;
			return typeof e.__aniCount == "undefined" && (e.__aniCount = 0), e.__aniCount === 0 && l.push(e), e.__aniCount++, this.animation.animate(s, {
				loop: i
			}).done(function() {
				e.__aniCount--;
				if (e.__aniCount === 0) {
					var n = t.indexOf(l, e);
					l.splice(n, 1)
				}
			})
		}
		n("Element not existed")
	}, c.prototype.clearAnimation = function() {
		this.animation.clear()
	}, c.prototype.showLoading = function(e) {
		return this.painter.showLoading(e), this
	}, c.prototype.hideLoading = function() {
		return this.painter.hideLoading(), this
	}, c.prototype.getWidth = function() {
		return this.painter.getWidth()
	}, c.prototype.getHeight = function() {
		return this.painter.getHeight()
	}, c.prototype.toDataURL = function(e, t, n) {
		return this.painter.toDataURL(e, t, n)
	}, c.prototype.shapeToImage = function(e, t, n) {
		var i = r();
		return this.painter.shapeToImage(i, e, t, n)
	}, c.prototype.on = function(e, t, n) {
		return this.handler.on(e, t, n), this
	}, c.prototype.un = function(e, t) {
		return this.handler.un(e, t), this
	}, c.prototype.trigger = function(e, t) {
		return this.handler.trigger(e, t), this
	}, c.prototype.clear = function() {
		return this.storage.delRoot(), this.painter.clear(), this
	}, c.prototype.dispose = function() {
		this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.animatingElements = this.storage = this.painter = this.handler = null, f.delInstance(this.id)
	}, f
}), define("zrender", ["zrender/zrender"], function(e) {
	return e
}), define("zrender/tool/math", [], function() {
	function t(t, n) {
		return Math.sin(n ? t * e : t)
	}

	function n(t, n) {
		return Math.cos(n ? t * e : t)
	}

	function r(t) {
		return t * e
	}

	function i(t) {
		return t / e
	}
	var e = Math.PI / 180;
	return {
		sin: t,
		cos: n,
		degreeToRadian: r,
		radianToDegree: i
	}
}), define("zrender/shape/Rose", ["require", "./Base", "../tool/math", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			this.brushTypeOnly = "stroke", t.call(this, e)
		};
	return n.prototype = {
		type: "rose",
		buildPath: function(t, n) {
			var r, i, s = n.r,
				o, u = n.k,
				a = n.n || 1,
				f = n.x,
				l = n.y,
				c = e("../tool/math");
			t.moveTo(f, l);
			for (var h = 0, p = s.length; h < p; h++) {
				o = s[h];
				for (var d = 0; d <= 360 * a; d++) r = o * c.sin(u / a * d % 360, !0) * c.cos(d, !0) + f, i = o * c.sin(u / a * d % 360, !0) * c.sin(d, !0) + l, t.lineTo(r, i)
			}
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t = e.r,
				n = e.x,
				r = e.y,
				i = 0;
			for (var s = 0, o = t.length; s < o; s++) t[s] > i && (i = t[s]);
			e.maxr = i;
			var u;
			return e.brushType == "stroke" || e.brushType == "fill" ? u = e.lineWidth || 1 : u = 0, e.__rect = {
				x: -i - u + n,
				y: -i - u + r,
				width: 2 * i + 3 * u,
				height: 2 * i + 3 * u
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/Trochoid", ["require", "./Base", "../tool/math", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			this.brushTypeOnly = "stroke", t.call(this, e)
		};
	return n.prototype = {
		type: "trochoid",
		buildPath: function(t, n) {
			var r, i, s, o, u = n.r,
				a = n.r0,
				f = n.d,
				l = n.x,
				c = n.y,
				h = n.location == "out" ? 1 : -1,
				p = e("../tool/math");
			if (n.location && u <= a) {
				alert("参数错误");
				return
			}
			var d = 0,
				v = 1,
				m;
			r = (u + h * a) * p.cos(0) - h * f * p.cos(0) + l, i = (u + h * a) * p.sin(0) - f * p.sin(0) + c, t.moveTo(r, i);
			do d++; while (a * d % (u + h * a) !== 0);
			do m = Math.PI / 180 * v, s = (u + h * a) * p.cos(m) - h * f * p.cos((u / a + h) * m) + l, o = (u + h * a) * p.sin(m) - f * p.sin((u / a + h) * m) + c, t.lineTo(s, o), v++; while (v <= a * d / (u + h * a) * 360)
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t = e.r,
				n = e.r0,
				r = e.d,
				i = e.location == "out" ? 1 : -1,
				s = t + r + i * n,
				o = e.x,
				u = e.y,
				a;
			return e.brushType == "stroke" || e.brushType == "fill" ? a = e.lineWidth || 1 : a = 0, e.__rect = {
				x: -s - a + o,
				y: -s - a + u,
				width: 2 * s + 2 * a,
				height: 2 * s + 2 * a
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/Circle", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			t.call(this, e)
		};
	return n.prototype = {
		type: "circle",
		buildPath: function(e, t) {
			e.arc(t.x, t.y, t.r, 0, Math.PI * 2, !0);
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - e.r - t / 2),
				y: Math.round(e.y - e.r - t / 2),
				width: e.r * 2 + t,
				height: e.r * 2 + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/tool/computeBoundingBox", ["require", "./vector", "./curve"], function(e) {
	function r(e, t, n) {
		if (e.length === 0) return;
		var r = e[0][0],
			i = e[0][0],
			s = e[0][1],
			o = e[0][1];
		for (var u = 1; u < e.length; u++) {
			var a = e[u];
			a[0] < r && (r = a[0]), a[0] > i && (i = a[0]), a[1] < s && (s = a[1]), a[1] > o && (o = a[1])
		}
		t[0] = r, t[1] = s, n[0] = i, n[1] = o
	}

	function i(e, t, r, i, s, o) {
		var u = [];
		n.cubicExtrema(e[0], t[0], r[0], i[0], u);
		for (var a = 0; a < u.length; a++) u[a] = n.cubicAt(e[0], t[0], r[0], i[0], u[a]);
		var f = [];
		n.cubicExtrema(e[1], t[1], r[1], i[1], f);
		for (var a = 0; a < f.length; a++) f[a] = n.cubicAt(e[1], t[1], r[1], i[1], f[a]);
		u.push(e[0], i[0]), f.push(e[1], i[1]);
		var l = Math.min.apply(null, u),
			c = Math.max.apply(null, u),
			h = Math.min.apply(null, f),
			p = Math.max.apply(null, f);
		s[0] = l, s[1] = h, o[0] = c, o[1] = p
	}

	function s(e, t, r, i, s) {
		var o = n.quadraticExtremum(e[0], t[0], r[0]),
			u = n.quadraticExtremum(e[1], t[1], r[1]);
		o = Math.max(Math.min(o, 1), 0), u = Math.max(Math.min(u, 1), 0);
		var a = 1 - o,
			f = 1 - u,
			l = a * a * e[0] + 2 * a * o * t[0] + o * o * r[0],
			c = a * a * e[1] + 2 * a * o * t[1] + o * o * r[1],
			h = f * f * e[0] + 2 * f * u * t[0] + u * u * r[0],
			p = f * f * e[1] + 2 * f * u * t[1] + u * u * r[1];
		i[0] = Math.min(e[0], r[0], l, h), i[1] = Math.min(e[1], r[1], c, p), s[0] = Math.max(e[0], r[0], l, h), s[1] = Math.max(e[1], r[1], c, p)
	}
	var t = e("./vector"),
		n = e("./curve"),
		o = t.create(),
		u = t.create(),
		a = t.create(),
		f = function(e, n, r, i, s, f, l, c) {
			if (Math.abs(i - s) >= Math.PI * 2) {
				l[0] = e - r, l[1] = n - r, c[0] = e + r, c[1] = n + r;
				return
			}
			o[0] = Math.cos(i) * r + e, o[1] = Math.sin(i) * r + n, u[0] = Math.cos(s) * r + e, u[1] = Math.sin(s) * r + n, t.min(l, o, u), t.max(c, o, u), i %= Math.PI * 2, i < 0 && (i += Math.PI * 2), s %= Math.PI * 2, s < 0 && (s += Math.PI * 2), i > s && !f ? s += Math.PI * 2 : i < s && f && (i += Math.PI * 2);
			if (f) {
				var h = s;
				s = i, i = h
			}
			for (var p = 0; p < s; p += Math.PI / 2) p > i && (a[0] = Math.cos(p) * r + e, a[1] = Math.sin(p) * r + n, t.min(l, a, l), t.max(c, a, c))
		};
	return r.cubeBezier = i, r.quadraticBezier = s, r.arc = f, r
}), define("zrender/shape/Sector", ["require", "../tool/math", "../tool/computeBoundingBox", "../tool/vector", "./Base", "../tool/util"], function(e) {
	var t = e("../tool/math"),
		n = e("../tool/computeBoundingBox"),
		r = e("../tool/vector"),
		i = e("./Base"),
		s = r.create(),
		o = r.create(),
		u = r.create(),
		a = r.create(),
		f = function(e) {
			i.call(this, e)
		};
	return f.prototype = {
		type: "sector",
		buildPath: function(e, n) {
			var r = n.x,
				i = n.y,
				s = n.r0 || 0,
				o = n.r,
				u = n.startAngle,
				a = n.endAngle,
				f = n.clockWise || !1;
			u = t.degreeToRadian(u), a = t.degreeToRadian(a), f || (u = -u, a = -a);
			var l = t.cos(u),
				c = t.sin(u);
			e.moveTo(l * s + r, c * s + i), e.lineTo(l * o + r, c * o + i), e.arc(r, i, o, u, a, !f), e.lineTo(t.cos(a) * s + r, t.sin(a) * s + i), s !== 0 && e.arc(r, i, s, a, u, f), e.closePath();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var i = e.x,
				f = e.y,
				l = e.r0 || 0,
				c = e.r,
				h = t.degreeToRadian(e.startAngle),
				p = t.degreeToRadian(e.endAngle),
				d = e.clockWise;
			return d || (h = -h, p = -p), l > 1 ? n.arc(i, f, l, h, p, !d, s, u) : (s[0] = u[0] = i, s[1] = u[1] = f), n.arc(i, f, c, h, p, !d, o, a), r.min(s, s, o), r.max(u, u, a), e.__rect = {
				x: s[0],
				y: s[1],
				width: u[0] - s[0],
				height: u[1] - s[1]
			}, e.__rect
		}
	}, e("../tool/util").inherits(f, i), f
}), define("zrender/shape/Ring", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			t.call(this, e)
		};
	return n.prototype = {
		type: "ring",
		buildPath: function(e, t) {
			e.arc(t.x, t.y, t.r, 0, Math.PI * 2, !1), e.moveTo(t.x + t.r0, t.y), e.arc(t.x, t.y, t.r0, 0, Math.PI * 2, !0);
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - e.r - t / 2),
				y: Math.round(e.y - e.r - t / 2),
				width: e.r * 2 + t,
				height: e.r * 2 + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/Ellipse", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			t.call(this, e)
		};
	return n.prototype = {
		type: "ellipse",
		buildPath: function(e, t) {
			var n = .5522848,
				r = t.x,
				i = t.y,
				s = t.a,
				o = t.b,
				u = s * n,
				a = o * n;
			e.moveTo(r - s, i), e.bezierCurveTo(r - s, i - a, r - u, i - o, r, i - o), e.bezierCurveTo(r + u, i - o, r + s, i - a, r + s, i), e.bezierCurveTo(r + s, i + a, r + u, i + o, r, i + o), e.bezierCurveTo(r - u, i + o, r - s, i + a, r - s, i), e.closePath()
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - e.a - t / 2),
				y: Math.round(e.y - e.b - t / 2),
				width: e.a * 2 + t,
				height: e.b * 2 + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/util/PathProxy", ["require", "../../tool/vector"], function(e) {
	var t = e("../../tool/vector"),
		n = function(e, t) {
			this.command = e, this.points = t || null
		},
		r = function() {
			this.pathCommands = [], this._ctx = null, this._min = [], this._max = []
		};
	return r.prototype.fastBoundingRect = function() {
		var e = this._min,
			n = this._max;
		e[0] = e[1] = Infinity, n[0] = n[1] = -Infinity;
		for (var r = 0; r < this.pathCommands.length; r++) {
			var i = this.pathCommands[r],
				s = i.points;
			switch (i.command) {
				case "M":
					t.min(e, e, s), t.max(n, n, s);
					break;
				case "L":
					t.min(e, e, s), t.max(n, n, s);
					break;
				case "C":
					for (var o = 0; o < 6; o += 2) e[0] = Math.min(e[0], e[0], s[o]), e[1] = Math.min(e[1], e[1], s[o + 1]), n[0] = Math.max(n[0], n[0], s[o]), n[1] = Math.max(n[1], n[1], s[o + 1]);
					break;
				case "Q":
					for (var o = 0; o < 4; o += 2) e[0] = Math.min(e[0], e[0], s[o]), e[1] = Math.min(e[1], e[1], s[o + 1]), n[0] = Math.max(n[0], n[0], s[o]), n[1] = Math.max(n[1], n[1], s[o + 1]);
					break;
				case "A":
					var u = s[0],
						a = s[1],
						f = s[2],
						l = s[3];
					e[0] = Math.min(e[0], e[0], u - f), e[1] = Math.min(e[1], e[1], a - l), n[0] = Math.max(n[0], n[0], u + f), n[1] = Math.max(n[1], n[1], a + l)
			}
		}
		return {
			x: e[0],
			y: e[1],
			width: n[0] - e[0],
			height: n[1] - e[1]
		}
	}, r.prototype.begin = function(e) {
		return this._ctx = e || null, this.pathCommands.length = 0, this
	}, r.prototype.moveTo = function(e, t) {
		return this.pathCommands.push(new n("M", [e, t])), this._ctx && this._ctx.moveTo(e, t), this
	}, r.prototype.lineTo = function(e, t) {
		return this.pathCommands.push(new n("L", [e, t])), this._ctx && this._ctx.lineTo(e, t), this
	}, r.prototype.bezierCurveTo = function(e, t, r, i, s, o) {
		return this.pathCommands.push(new n("C", [e, t, r, i, s, o])), this._ctx && this._ctx.bezierCurveTo(e, t, r, i, s, o), this
	}, r.prototype.quadraticCurveTo = function(e, t, r, i) {
		return this.pathCommands.push(new n("Q", [e, t, r, i])), this._ctx && this._ctx.quadraticCurveTo(e, t, r, i), this
	}, r.prototype.arc = function(e, t, r, i, s, o) {
		return this.pathCommands.push(new n("A", [e, t, r, r, i, s - i, 0, o ? 0 : 1])), this._ctx && this._ctx.arc(e, t, r, i, s, o), this
	}, r.prototype.arcTo = function(e, t, n, r, i) {
		return this._ctx && this._ctx.arcTo(e, t, n, r, i), this
	}, r.prototype.rect = function(e, t, n, r) {
		return this._ctx && this._ctx.rect(e, t, n, r), this
	}, r.prototype.closePath = function() {
		return this.pathCommands.push(new n("z")), this._ctx && this._ctx.closePath(), this
	}, r.prototype.isEmpty = function() {
		return this.pathCommands.length === 0
	}, r.PathSegment = n, r
}), define("zrender/shape/Heart", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/PathProxy"),
		r = e("../tool/area"),
		i = function(e) {
			t.call(this, e), this._pathProxy = new n
		};
	return i.prototype = {
		type: "heart",
		buildPath: function(e, t) {
			var r = this._pathProxy || new n;
			r.begin(e), r.moveTo(t.x, t.y), r.bezierCurveTo(t.x + t.a / 2, t.y - t.b * 2 / 3, t.x + t.a * 2, t.y + t.b / 3, t.x, t.y + t.b), r.bezierCurveTo(t.x - t.a * 2, t.y + t.b / 3, t.x - t.a / 2, t.y - t.b * 2 / 3, t.x, t.y), r.closePath();
			return
		},
		getRect: function(e) {
			return e.__rect ? e.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, e), this._pathProxy.fastBoundingRect())
		},
		isCover: function(e, t) {
			var n = this.getTansform(e, t);
			e = n[0], t = n[1];
			var i = this.getRect(this.style);
			if (e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height) return r.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, e, t)
		}
	}, e("../tool/util").inherits(i, t), i
}), define("zrender/shape/Droplet", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/PathProxy"),
		r = e("../tool/area"),
		i = function(e) {
			t.call(this, e), this._pathProxy = new n
		};
	return i.prototype = {
		type: "droplet",
		buildPath: function(e, t) {
			var r = this._pathProxy || new n;
			r.begin(e), r.moveTo(t.x, t.y + t.a), r.bezierCurveTo(t.x + t.a, t.y + t.a, t.x + t.a * 3 / 2, t.y - t.a / 3, t.x, t.y - t.b), r.bezierCurveTo(t.x - t.a * 3 / 2, t.y - t.a / 3, t.x - t.a, t.y + t.a, t.x, t.y + t.a), r.closePath()
		},
		getRect: function(e) {
			return e.__rect ? e.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, e), this._pathProxy.fastBoundingRect())
		},
		isCover: function(e, t) {
			var n = this.getTansform(e, t);
			e = n[0], t = n[1];
			var i = this.getRect(this.style);
			if (e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height) return r.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, e, t)
		}
	}, e("../tool/util").inherits(i, t), i
}), define("zrender/shape/util/dashedLineTo", [], function() {
	var e = [5, 5];
	return function(t, n, r, i, s, o) {
		if (t.setLineDash) {
			e[0] = e[1] = o, t.setLineDash(e), t.moveTo(n, r), t.lineTo(i, s);
			return
		}
		o = typeof o != "number" ? 5 : o;
		var u = i - n,
			a = s - r,
			f = Math.floor(Math.sqrt(u * u + a * a) / o);
		u /= f, a /= f;
		var l = !0;
		for (var c = 0; c < f; ++c) l ? t.moveTo(n, r) : t.lineTo(n, r), l = !l, n += u, r += a;
		t.lineTo(i, s)
	}
}), define("zrender/shape/Line", ["require", "./Base", "./util/dashedLineTo", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/dashedLineTo"),
		r = function(e) {
			this.brushTypeOnly = "stroke", this.textPosition = "end", t.call(this, e)
		};
	return r.prototype = {
		type: "line",
		buildPath: function(e, t) {
			if (!t.lineType || t.lineType == "solid") e.moveTo(t.xStart, t.yStart), e.lineTo(t.xEnd, t.yEnd);
			else if (t.lineType == "dashed" || t.lineType == "dotted") {
				var r = (t.lineWidth || 1) * (t.lineType == "dashed" ? 5 : 1);
				n(e, t.xStart, t.yStart, t.xEnd, t.yEnd, r)
			}
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t = e.lineWidth || 1;
			return e.__rect = {
				x: Math.min(e.xStart, e.xEnd) - t,
				y: Math.min(e.yStart, e.yEnd) - t,
				width: Math.abs(e.xStart - e.xEnd) + t,
				height: Math.abs(e.yStart - e.yEnd) + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(r, t), r
}), define("zrender/shape/Star", ["require", "../tool/math", "./Base", "../tool/util"], function(e) {
	var t = e("../tool/math"),
		n = t.sin,
		r = t.cos,
		i = Math.PI,
		s = e("./Base"),
		o = function(e) {
			s.call(this, e)
		};
	return o.prototype = {
		type: "star",
		buildPath: function(e, t) {
			var s = t.n;
			if (!s || s < 2) return;
			var o = t.x,
				u = t.y,
				a = t.r,
				f = t.r0;
			f == null && (f = s > 4 ? a * r(2 * i / s) / r(i / s) : a / 3);
			var l = i / s,
				c = -i / 2,
				h = o + a * r(c),
				p = u + a * n(c);
			c += l;
			var d = t.pointList = [];
			d.push([h, p]);
			for (var v = 0, m = s * 2 - 1, g; v < m; v++) g = v % 2 === 0 ? f : a, d.push([o + g * r(c), u + g * n(c)]), c += l;
			d.push([h, p]), e.moveTo(d[0][0], d[0][1]);
			for (var v = 0; v < d.length; v++) e.lineTo(d[v][0], d[v][1]);
			e.closePath();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - e.r - t / 2),
				y: Math.round(e.y - e.r - t / 2),
				width: e.r * 2 + t,
				height: e.r * 2 + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(o, s), o
}), define("zrender/shape/Isogon", ["require", "../tool/math", "./Base", "../tool/util"], function(e) {
	function o(e) {
		s.call(this, e)
	}
	var t = e("../tool/math"),
		n = t.sin,
		r = t.cos,
		i = Math.PI,
		s = e("./Base");
	return o.prototype = {
		type: "isogon",
		buildPath: function(e, t) {
			var s = t.n;
			if (!s || s < 2) return;
			var o = t.x,
				u = t.y,
				a = t.r,
				f = 2 * i / s,
				l = -i / 2,
				c = o + a * r(l),
				h = u + a * n(l);
			l += f;
			var p = t.pointList = [];
			p.push([c, h]);
			for (var d = 0, v = s - 1; d < v; d++) p.push([o + a * r(l), u + a * n(l)]), l += f;
			p.push([c, h]), e.moveTo(p[0][0], p[0][1]);
			for (var d = 0; d < p.length; d++) e.lineTo(p[d][0], p[d][1]);
			e.closePath();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			return e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0, e.__rect = {
				x: Math.round(e.x - e.r - t / 2),
				y: Math.round(e.y - e.r - t / 2),
				width: e.r * 2 + t,
				height: e.r * 2 + t
			}, e.__rect
		}
	}, e("../tool/util").inherits(o, s), o
}), define("zrender/shape/BezierCurve", ["require", "./Base", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = function(e) {
			this.brushTypeOnly = "stroke", this.textPosition = "end", t.call(this, e)
		};
	return n.prototype = {
		type: "bezier-curve",
		buildPath: function(e, t) {
			e.moveTo(t.xStart, t.yStart), typeof t.cpX2 != "undefined" && typeof t.cpY2 != "undefined" ? e.bezierCurveTo(t.cpX1, t.cpY1, t.cpX2, t.cpY2, t.xEnd, t.yEnd) : e.quadraticCurveTo(t.cpX1, t.cpY1, t.xEnd, t.yEnd)
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t = Math.min(e.xStart, e.xEnd, e.cpX1),
				n = Math.min(e.yStart, e.yEnd, e.cpY1),
				r = Math.max(e.xStart, e.xEnd, e.cpX1),
				i = Math.max(e.yStart, e.yEnd, e.cpY1),
				s = e.cpX2,
				o = e.cpY2;
			typeof s != "undefined" && typeof o != "undefined" && (t = Math.min(t, s), n = Math.min(n, o), r = Math.max(r, s), i = Math.max(i, o));
			var u = e.lineWidth || 1;
			return e.__rect = {
				x: t - u,
				y: n - u,
				width: r - t + u,
				height: i - n + u
			}, e.__rect
		}
	}, e("../tool/util").inherits(n, t), n
}), define("zrender/shape/util/smoothSpline", ["require", "../../tool/vector"], function(e) {
	function n(e, t, n, r, i, s, o) {
		var u = (n - e) * .5,
			a = (r - t) * .5;
		return (2 * (t - n) + u + a) * o + (-3 * (t - n) - 2 * u - a) * s + u * i + t
	}
	var t = e("../../tool/vector");
	return function(e, r, i) {
		var s = e.length,
			o = [],
			u = 0;
		for (var a = 1; a < s; a++) u += t.distance(e[a - 1], e[a]);
		var f = u / 5;
		f = f < s ? s : f;
		for (var a = 0; a < f; a++) {
			var l = a / (f - 1) * (r ? s : s - 1),
				c = Math.floor(l),
				h = l - c,
				p, d = e[c % s],
				v, m;
			r ? (p = e[(c - 1 + s) % s], v = e[(c + 1) % s], m = e[(c + 2) % s]) : (p = e[c === 0 ? c : c - 1], v = e[c > s - 2 ? s - 1 : c + 1], m = e[c > s - 3 ? s - 1 : c + 2]);
			var g = h * h,
				y = h * g;
			o.push([n(p[0], d[0], v[0], m[0], h, g, y), n(p[1], d[1], v[1], m[1], h, g, y)])
		}
		return o
	}
}), define("zrender/shape/util/smoothBezier", ["require", "../../tool/vector"], function(e) {
	var t = e("../../tool/vector");
	return function(e, n, r, i) {
		var s = [],
			o = [],
			u = [],
			a = [],
			f, l, c = !!i,
			h, p;
		if (c) {
			h = [Infinity, Infinity], p = [-Infinity, -Infinity];
			for (var d = 0, v = e.length; d < v; d++) t.min(h, h, e[d]), t.max(p, p, e[d]);
			t.min(h, h, i[0]), t.max(p, p, i[1])
		}
		for (var d = 0, v = e.length; d < v; d++) {
			var m = e[d],
				f, l;
			if (r) f = e[d ? d - 1 : v - 1], l = e[(d + 1) % v];
			else {
				if (d === 0 || d === v - 1) {
					s.push(e[d]);
					continue
				}
				f = e[d - 1], l = e[d + 1]
			}
			t.sub(o, l, f), t.scale(o, o, n);
			var g = t.distance(m, f),
				y = t.distance(m, l),
				b = g + y;
			b !== 0 && (g /= b, y /= b), t.scale(u, o, -g), t.scale(a, o, y);
			var w = t.add([], m, u),
				E = t.add([], m, a);
			c && (t.max(w, w, h), t.min(w, w, p), t.max(E, E, h), t.min(E, E, p)), s.push(w), s.push(E)
		}
		return r && s.push(s.shift()), s
	}
}), define("zrender/shape/Polygon", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/smoothSpline"),
		r = e("./util/smoothBezier"),
		i = e("./util/dashedLineTo"),
		s = function(e) {
			t.call(this, e)
		};
	return s.prototype = {
		type: "polygon",
		buildPath: function(e, t) {
			var s = t.pointList;
			if (s.length < 2) return;
			if (t.smooth && t.smooth !== "spline") {
				var o = r(s, t.smooth, !0, t.smoothConstraint);
				e.moveTo(s[0][0], s[0][1]);
				var u, a, f, l = s.length;
				for (var c = 0; c < l; c++) u = o[c * 2], a = o[c * 2 + 1], f = s[(c + 1) % l], e.bezierCurveTo(u[0], u[1], a[0], a[1], f[0], f[1])
			} else {
				t.smooth === "spline" && (s = n(s, !0));
				if (!t.lineType || t.lineType == "solid") {
					e.moveTo(s[0][0], s[0][1]);
					for (var c = 1, h = s.length; c < h; c++) e.lineTo(s[c][0], s[c][1]);
					e.lineTo(s[0][0], s[0][1])
				} else if (t.lineType == "dashed" || t.lineType == "dotted") {
					var p = t._dashLength || (t.lineWidth || 1) * (t.lineType == "dashed" ? 5 : 1);
					t._dashLength = p, e.moveTo(s[0][0], s[0][1]);
					for (var c = 1, h = s.length; c < h; c++) i(e, s[c - 1][0], s[c - 1][1], s[c][0], s[c][1], p);
					i(e, s[s.length - 1][0], s[s.length - 1][1], s[0][0], s[0][1], p)
				}
			}
			e.closePath();
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t = Number.MAX_VALUE,
				n = Number.MIN_VALUE,
				r = Number.MAX_VALUE,
				i = Number.MIN_VALUE,
				s = e.pointList;
			for (var o = 0, u = s.length; o < u; o++) s[o][0] < t && (t = s[o][0]), s[o][0] > n && (n = s[o][0]), s[o][1] < r && (r = s[o][1]), s[o][1] > i && (i = s[o][1]);
			var a;
			return e.brushType == "stroke" || e.brushType == "fill" ? a = e.lineWidth || 1 : a = 0, e.__rect = {
				x: Math.round(t - a / 2),
				y: Math.round(r - a / 2),
				width: n - t + a,
				height: i - r + a
			}, e.__rect
		}
	}, e("../tool/util").inherits(s, t), s
}), define("zrender/shape/Polyline", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "./Polygon", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/smoothSpline"),
		r = e("./util/smoothBezier"),
		i = e("./util/dashedLineTo"),
		s = function(e) {
			this.brushTypeOnly = "stroke", this.textPosition = "end", t.call(this, e)
		};
	return s.prototype = {
		type: "polyline",
		buildPath: function(e, t) {
			var s = t.pointList;
			if (s.length < 2) return;
			var o = Math.min(t.pointList.length, Math.round(t.pointListLength || t.pointList.length));
			if (t.smooth && t.smooth !== "spline") {
				var u = r(s, t.smooth, !1, t.smoothConstraint);
				e.moveTo(s[0][0], s[0][1]);
				var a, f, l;
				for (var c = 0; c < o - 1; c++) a = u[c * 2], f = u[c * 2 + 1], l = s[c + 1], e.bezierCurveTo(a[0], a[1], f[0], f[1], l[0], l[1])
			} else {
				t.smooth === "spline" && (s = n(s), o = s.length);
				if (!t.lineType || t.lineType == "solid") {
					e.moveTo(s[0][0], s[0][1]);
					for (var c = 1; c < o; c++) e.lineTo(s[c][0], s[c][1])
				} else if (t.lineType == "dashed" || t.lineType == "dotted") {
					var h = (t.lineWidth || 1) * (t.lineType == "dashed" ? 5 : 1);
					e.moveTo(s[0][0], s[0][1]);
					for (var c = 1; c < o; c++) i(e, s[c - 1][0], s[c - 1][1], s[c][0], s[c][1], h)
				}
			}
			return
		},
		getRect: function(t) {
			return e("./Polygon").prototype.getRect(t)
		}
	}, e("../tool/util").inherits(s, t), s
}), define("zrender/shape/Path", ["require", "./Base", "./util/PathProxy", "../tool/util"], function(e) {
	var t = e("./Base"),
		n = e("./util/PathProxy"),
		r = n.PathSegment,
		i = function(e) {
			return Math.sqrt(e[0] * e[0] + e[1] * e[1])
		},
		s = function(e, t) {
			return (e[0] * t[0] + e[1] * t[1]) / (i(e) * i(t))
		},
		o = function(e, t) {
			return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(s(e, t))
		},
		u = function(e) {
			t.call(this, e)
		};
	return u.prototype = {
		type: "path",
		buildPathArray: function(e, t, n) {
			if (!e) return [];
			t = t || 0, n = n || 0;
			var i = e,
				s = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
			i = i.replace(/-/g, " -"), i = i.replace(/  /g, " "), i = i.replace(/ /g, ","), i = i.replace(/,,/g, ",");
			var o;
			for (o = 0; o < s.length; o++) i = i.replace(new RegExp(s[o], "g"), "|" + s[o]);
			var u = i.split("|"),
				a = [],
				f = 0,
				l = 0;
			for (o = 1; o < u.length; o++) {
				var c = u[o],
					h = c.charAt(0);
				c = c.slice(1), c = c.replace(new RegExp("e,-", "g"), "e-");
				var p = c.split(",");
				p.length > 0 && p[0] === "" && p.shift();
				for (var d = 0; d < p.length; d++) p[d] = parseFloat(p[d]);
				while (p.length > 0) {
					if (isNaN(p[0])) break;
					var v = null,
						m = [],
						g, y, b, w, E, S, x, T, N = f,
						C = l;
					switch (h) {
						case "l":
							f += p.shift(), l += p.shift(), v = "L", m.push(f, l);
							break;
						case "L":
							f = p.shift(), l = p.shift(), m.push(f, l);
							break;
						case "m":
							f += p.shift(), l += p.shift(), v = "M", m.push(f, l), h = "l";
							break;
						case "M":
							f = p.shift(), l = p.shift(), v = "M", m.push(f, l), h = "L";
							break;
						case "h":
							f += p.shift(), v = "L", m.push(f, l);
							break;
						case "H":
							f = p.shift(), v = "L", m.push(f, l);
							break;
						case "v":
							l += p.shift(), v = "L", m.push(f, l);
							break;
						case "V":
							l = p.shift(), v = "L", m.push(f, l);
							break;
						case "C":
							m.push(p.shift(), p.shift(), p.shift(), p.shift()), f = p.shift(), l = p.shift(), m.push(f, l);
							break;
						case "c":
							m.push(f + p.shift(), l + p.shift(), f + p.shift(), l + p.shift()), f += p.shift(), l += p.shift(), v = "C", m.push(f, l);
							break;
						case "S":
							g = f, y = l, b = a[a.length - 1], b.command === "C" && (g = f + (f - b.points[2]), y = l + (l - b.points[3])), m.push(g, y, p.shift(), p.shift()), f = p.shift(), l = p.shift(), v = "C", m.push(f, l);
							break;
						case "s":
							g = f, y = l, b = a[a.length - 1], b.command === "C" && (g = f + (f - b.points[2]), y = l + (l - b.points[3])), m.push(g, y, f + p.shift(), l + p.shift()), f += p.shift(), l += p.shift(), v = "C", m.push(f, l);
							break;
						case "Q":
							m.push(p.shift(), p.shift()), f = p.shift(), l = p.shift(), m.push(f, l);
							break;
						case "q":
							m.push(f + p.shift(), l + p.shift()), f += p.shift(), l += p.shift(), v = "Q", m.push(f, l);
							break;
						case "T":
							g = f, y = l, b = a[a.length - 1], b.command === "Q" && (g = f + (f - b.points[0]), y = l + (l - b.points[1])), f = p.shift(), l = p.shift(), v = "Q", m.push(g, y, f, l);
							break;
						case "t":
							g = f, y = l, b = a[a.length - 1], b.command === "Q" && (g = f + (f - b.points[0]), y = l + (l - b.points[1])), f += p.shift(), l += p.shift(), v = "Q", m.push(g, y, f, l);
							break;
						case "A":
							w = p.shift(), E = p.shift(), S = p.shift(), x = p.shift(), T = p.shift(), N = f, C = l, f = p.shift(), l = p.shift(), v = "A", m = this._convertPoint(N, C, f, l, x, T, w, E, S);
							break;
						case "a":
							w = p.shift(), E = p.shift(), S = p.shift(), x = p.shift(), T = p.shift(), N = f, C = l, f += p.shift(), l += p.shift(), v = "A", m = this._convertPoint(N, C, f, l, x, T, w, E, S)
					}
					for (var k = 0, L = m.length; k < L; k += 2) m[k] += t, m[k + 1] += n;
					a.push(new r(v || h, m))
				}(h === "z" || h === "Z") && a.push(new r("z", []))
			}
			return a
		},
		_convertPoint: function(e, t, n, r, i, u, a, f, l) {
			var c = l * (Math.PI / 180),
				h = Math.cos(c) * (e - n) / 2 + Math.sin(c) * (t - r) / 2,
				p = -1 * Math.sin(c) * (e - n) / 2 + Math.cos(c) * (t - r) / 2,
				d = h * h / (a * a) + p * p / (f * f);
			d > 1 && (a *= Math.sqrt(d), f *= Math.sqrt(d));
			var v = Math.sqrt((a * a * f * f - a * a * p * p - f * f * h * h) / (a * a * p * p + f * f * h * h));
			i === u && (v *= -1), isNaN(v) && (v = 0);
			var m = v * a * p / f,
				g = v * -f * h / a,
				y = (e + n) / 2 + Math.cos(c) * m - Math.sin(c) * g,
				b = (t + r) / 2 + Math.sin(c) * m + Math.cos(c) * g,
				w = o([1, 0], [(h - m) / a, (p - g) / f]),
				E = [(h - m) / a, (p - g) / f],
				S = [(-1 * h - m) / a, (-1 * p - g) / f],
				x = o(E, S);
			return s(E, S) <= -1 && (x = Math.PI), s(E, S) >= 1 && (x = 0), u === 0 && x > 0 && (x -= 2 * Math.PI), u === 1 && x < 0 && (x += 2 * Math.PI), [y, b, a, f, w, x, c, u]
		},
		buildPath: function(e, t) {
			var n = t.path,
				r = t.x || 0,
				i = t.y || 0;
			t.pathArray = t.pathArray || this.buildPathArray(n, r, i);
			var s = t.pathArray,
				o = t.pointList = [],
				u = [];
			for (var a = 0, f = s.length; a < f; a++) {
				s[a].command.toUpperCase() == "M" && (u.length > 0 && o.push(u), u = []);
				var l = s[a].points;
				for (var c = 0, h = l.length; c < h; c += 2) u.push([l[c], l[c + 1]])
			}
			u.length > 0 && o.push(u);
			for (var a = 0, f = s.length; a < f; a++) {
				var p = s[a].command,
					l = s[a].points;
				switch (p) {
					case "L":
						e.lineTo(l[0], l[1]);
						break;
					case "M":
						e.moveTo(l[0], l[1]);
						break;
					case "C":
						e.bezierCurveTo(l[0], l[1], l[2], l[3], l[4], l[5]);
						break;
					case "Q":
						e.quadraticCurveTo(l[0], l[1], l[2], l[3]);
						break;
					case "A":
						var d = l[0],
							v = l[1],
							m = l[2],
							g = l[3],
							y = l[4],
							b = l[5],
							w = l[6],
							E = l[7],
							S = m > g ? m : g,
							x = m > g ? 1 : m / g,
							T = m > g ? g / m : 1;
						e.translate(d, v), e.rotate(w), e.scale(x, T), e.arc(0, 0, S, y, y + b, 1 - E), e.scale(1 / x, 1 / T), e.rotate(-w), e.translate(-d, -v);
						break;
					case "z":
						e.closePath()
				}
			}
			return
		},
		getRect: function(e) {
			if (e.__rect) return e.__rect;
			var t;
			e.brushType == "stroke" || e.brushType == "fill" ? t = e.lineWidth || 1 : t = 0;
			var n = Number.MAX_VALUE,
				r = Number.MIN_VALUE,
				i = Number.MAX_VALUE,
				s = Number.MIN_VALUE,
				o = e.x || 0,
				u = e.y || 0,
				a = e.pathArray || this.buildPathArray(e.path);
			for (var f = 0; f < a.length; f++) {
				var l = a[f].points;
				for (var c = 0; c < l.length; c++) c % 2 === 0 ? (l[c] + o < n && (n = l[c]), l[c] + o > r && (r = l[c])) : (l[c] + u < i && (i = l[c]), l[c] + u > s && (s = l[c]))
			}
			var h;
			return n === Number.MAX_VALUE || r === Number.MIN_VALUE || i === Number.MAX_VALUE || s === Number.MIN_VALUE ? h = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			} : h = {
				x: Math.round(n - t / 2),
				y: Math.round(i - t / 2),
				width: r - n + t,
				height: s - i + t
			}, e.__rect = h, h
		}
	}, e("../tool/util").inherits(u, t), u
}), define("zrender/loadingEffect/Bar", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Rectangle"], function(e) {
	function s(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/color"),
		i = e("../shape/Rectangle");
	return n.inherits(s, t), s.prototype._start = function(e, t) {
		var s = n.merge(this.options, {
				textStyle: {
					color: "#888"
				},
				backgroundColor: "rgba(250, 250, 250, 0.8)",
				effectOption: {
					x: 0,
					y: this.canvasHeight / 2 - 30,
					width: this.canvasWidth,
					height: 5,
					brushType: "fill",
					timeInterval: 100
				}
			}),
			o = this.createTextShape(s.textStyle),
			u = this.createBackgroundShape(s.backgroundColor),
			a = s.effectOption,
			f = new i({
				highlightStyle: n.clone(a)
			});
		f.highlightStyle.color = a.color || r.getLinearGradient(a.x, a.y, a.x + a.width, a.y + a.height, [
			[0, "#ff6400"],
			[.5, "#ffe100"],
			[1, "#b1ff00"]
		]);
		if (s.progress != null) {
			e(u), f.highlightStyle.width = this.adjust(s.progress, [0, 1]) * s.effectOption.width, e(f), e(o), t();
			return
		}
		return f.highlightStyle.width = 0, setInterval(function() {
			e(u), f.highlightStyle.width < a.width ? f.highlightStyle.width += 8 : f.highlightStyle.width = 0, e(f), e(o), t()
		}, a.timeInterval)
	}, s
}), define("zrender/loadingEffect/Bubble", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Circle"], function(e) {
	function s(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/color"),
		i = e("../shape/Circle");
	return n.inherits(s, t), s.prototype._start = function(e, t) {
		var s = n.merge(this.options, {
				textStyle: {
					color: "#888"
				},
				backgroundColor: "rgba(250, 250, 250, 0.8)",
				effect: {
					n: 50,
					lineWidth: 2,
					brushType: "stroke",
					color: "random",
					timeInterval: 100
				}
			}),
			o = this.createTextShape(s.textStyle),
			u = this.createBackgroundShape(s.backgroundColor),
			a = s.effect,
			f = a.n,
			l = a.brushType,
			c = a.lineWidth,
			h = [],
			p = this.canvasWidth,
			d = this.canvasHeight;
		for (var v = 0; v < f; v++) {
			var m = a.color == "random" ? r.alpha(r.random(), .3) : a.color;
			h[v] = new i({
				highlightStyle: {
					x: Math.ceil(Math.random() * p),
					y: Math.ceil(Math.random() * d),
					r: Math.ceil(Math.random() * 40),
					brushType: l,
					color: m,
					strokeColor: m,
					lineWidth: c
				},
				animationY: Math.ceil(Math.random() * 20)
			})
		}
		return setInterval(function() {
			e(u);
			for (var n = 0; n < f; n++) {
				var r = h[n].highlightStyle;
				r.y - h[n].animationY + r.r <= 0 && (h[n].highlightStyle.y = d + r.r, h[n].highlightStyle.x = Math.ceil(Math.random() * p)), h[n].highlightStyle.y -= h[n].animationY, e(h[n])
			}
			e(o), t()
		}, a.timeInterval)
	}, s
}), define("zrender/loadingEffect/DynamicLine", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Line"], function(e) {
	function s(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/color"),
		i = e("../shape/Line");
	return n.inherits(s, t), s.prototype._start = function(e, t) {
		var s = n.merge(this.options, {
				textStyle: {
					color: "#fff"
				},
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				effectOption: {
					n: 30,
					lineWidth: 1,
					color: "random",
					timeInterval: 100
				}
			}),
			o = this.createTextShape(s.textStyle),
			u = this.createBackgroundShape(s.backgroundColor),
			a = s.effectOption,
			f = a.n,
			l = a.lineWidth,
			c = [],
			h = this.canvasWidth,
			p = this.canvasHeight;
		for (var d = 0; d < f; d++) {
			var v = -Math.ceil(Math.random() * 1e3),
				m = Math.ceil(Math.random() * 400),
				g = Math.ceil(Math.random() * p),
				y = a.color == "random" ? r.random() : a.color;
			c[d] = new i({
				highlightStyle: {
					xStart: v,
					yStart: g,
					xEnd: v + m,
					yEnd: g,
					strokeColor: y,
					lineWidth: l
				},
				animationX: Math.ceil(Math.random() * 100),
				len: m
			})
		}
		return setInterval(function() {
			e(u);
			for (var n = 0; n < f; n++) {
				var r = c[n].highlightStyle;
				r.xStart >= h && (c[n].len = Math.ceil(Math.random() * 400), r.xStart = -400, r.xEnd = -400 + c[n].len, r.yStart = Math.ceil(Math.random() * p), r.yEnd = r.yStart), r.xStart += c[n].animationX, r.xEnd += c[n].animationX, e(c[n])
			}
			e(o), t()
		}, a.timeInterval)
	}, s
}), define("zrender/loadingEffect/Ring", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Ring", "../shape/Sector"], function(e) {
	function o(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/color"),
		i = e("../shape/Ring"),
		s = e("../shape/Sector");
	return n.inherits(o, t), o.prototype._start = function(e, t) {
		var o = n.merge(this.options, {
				textStyle: {
					color: "#07a"
				},
				backgroundColor: "rgba(250, 250, 250, 0.8)",
				effect: {
					x: this.canvasWidth / 2,
					y: this.canvasHeight / 2,
					r0: 60,
					r: 100,
					color: "#bbdcff",
					brushType: "fill",
					textPosition: "inside",
					textFont: "normal 30px verdana",
					textColor: "rgba(30, 144, 255, 0.6)",
					timeInterval: 100
				}
			}),
			u = o.effect,
			a = o.textStyle;
		a.x == null && (a.x = u.x), a.y == null && (a.y = u.y + (u.r0 + u.r) / 2 - 5);
		var f = this.createTextShape(o.textStyle),
			l = this.createBackgroundShape(o.backgroundColor),
			c = u.x,
			h = u.y,
			p = u.r0 + 6,
			d = u.r - 6,
			v = u.color,
			m = r.lift(v, .1),
			g = new i({
				highlightStyle: n.clone(u)
			}),
			y = [],
			b = r.getGradientColors(["#ff6400", "#ffe100", "#97ff00"], 25),
			w = 15,
			E = 240;
		for (var S = 0; S < 16; S++) y.push(new s({
			highlightStyle: {
				x: c,
				y: h,
				r0: p,
				r: d,
				startAngle: E - w,
				endAngle: E,
				brushType: "fill",
				color: m
			},
			_color: r.getLinearGradient(c + p * Math.cos(E, !0), h - p * Math.sin(E, !0), c + p * Math.cos(E - w, !0), h - p * Math.sin(E - w, !0), [
				[0, b[S * 2]],
				[1, b[S * 2 + 1]]
			])
		})), E -= w;
		E = 360;
		for (var S = 0; S < 4; S++) y.push(new s({
			highlightStyle: {
				x: c,
				y: h,
				r0: p,
				r: d,
				startAngle: E - w,
				endAngle: E,
				brushType: "fill",
				color: m
			},
			_color: r.getLinearGradient(c + p * Math.cos(E, !0), h - p * Math.sin(E, !0), c + p * Math.cos(E - w, !0), h - p * Math.sin(E - w, !0), [
				[0, b[S * 2 + 32]],
				[1, b[S * 2 + 33]]
			])
		})), E -= w;
		var x = 0;
		if (o.progress != null) {
			e(l), x = this.adjust(o.progress, [0, 1]).toFixed(2) * 100 / 5, g.highlightStyle.text = x * 5 + "%", e(g);
			for (var S = 0; S < 20; S++) y[S].highlightStyle.color = S < x ? y[S]._color : m, e(y[S]);
			e(f), t();
			return
		}
		return setInterval(function() {
			e(l), x += x >= 20 ? -20 : 1, e(g);
			for (var n = 0; n < 20; n++) y[n].highlightStyle.color = n < x ? y[n]._color : m, e(y[n]);
			e(f), t()
		}, u.timeInterval)
	}, o
}), define("zrender/loadingEffect/Spin", ["require", "./Base", "../tool/util", "../tool/color", "../tool/area", "../shape/Sector"], function(e) {
	function o(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/color"),
		i = e("../tool/area"),
		s = e("../shape/Sector");
	return n.inherits(o, t), o.prototype._start = function(e, t) {
		var o = n.merge(this.options, {
				textStyle: {
					color: "#fff",
					textAlign: "start"
				},
				backgroundColor: "rgba(0, 0, 0, 0.8)"
			}),
			u = this.createTextShape(o.textStyle),
			a = 10,
			f = i.getTextWidth(u.highlightStyle.text, u.highlightStyle.textFont),
			l = i.getTextHeight(u.highlightStyle.text, u.highlightStyle.textFont),
			c = n.merge(this.options.effect || {}, {
				r0: 9,
				r: 15,
				n: 18,
				color: "#fff",
				timeInterval: 100
			}),
			h = this.getLocation(this.options.textStyle, f + a + c.r * 2, Math.max(c.r * 2, l));
		c.x = h.x + c.r, c.y = u.highlightStyle.y = h.y + h.height / 2, u.highlightStyle.x = c.x + c.r + a;
		var p = this.createBackgroundShape(o.backgroundColor),
			d = c.n,
			v = c.x,
			m = c.y,
			g = c.r0,
			y = c.r,
			b = c.color,
			w = [],
			E = Math.round(180 / d);
		for (var S = 0; S < d; S++) w[S] = new s({
			highlightStyle: {
				x: v,
				y: m,
				r0: g,
				r: y,
				startAngle: E * S * 2,
				endAngle: E * S * 2 + E,
				color: r.alpha(b, (S + 1) / d),
				brushType: "fill"
			}
		});
		var x = [0, v, m];
		return setInterval(function() {
			e(p), x[0] -= .3;
			for (var n = 0; n < d; n++) w[n].rotation = x, e(w[n]);
			e(u), t()
		}, c.timeInterval)
	}, o
}), define("zrender/loadingEffect/Whirling", ["require", "./Base", "../tool/util", "../tool/area", "../shape/Ring", "../shape/Droplet", "../shape/Circle"], function(e) {
	function u(e) {
		t.call(this, e)
	}
	var t = e("./Base"),
		n = e("../tool/util"),
		r = e("../tool/area"),
		i = e("../shape/Ring"),
		s = e("../shape/Droplet"),
		o = e("../shape/Circle");
	return n.inherits(u, t), u.prototype._start = function(e, t) {
		var u = n.merge(this.options, {
				textStyle: {
					color: "#888",
					textAlign: "start"
				},
				backgroundColor: "rgba(250, 250, 250, 0.8)"
			}),
			a = this.createTextShape(u.textStyle),
			f = 10,
			l = r.getTextWidth(a.highlightStyle.text, a.highlightStyle.textFont),
			c = r.getTextHeight(a.highlightStyle.text, a.highlightStyle.textFont),
			h = n.merge(this.options.effect || {}, {
				r: 18,
				colorIn: "#fff",
				colorOut: "#555",
				colorWhirl: "#6cf",
				timeInterval: 50
			}),
			p = this.getLocation(this.options.textStyle, l + f + h.r * 2, Math.max(h.r * 2, c));
		h.x = p.x + h.r, h.y = a.highlightStyle.y = p.y + p.height / 2, a.highlightStyle.x = h.x + h.r + f;
		var d = this.createBackgroundShape(u.backgroundColor),
			v = new s({
				highlightStyle: {
					a: Math.round(h.r / 2),
					b: Math.round(h.r - h.r / 6),
					brushType: "fill",
					color: h.colorWhirl
				}
			}),
			m = new o({
				highlightStyle: {
					r: Math.round(h.r / 6),
					brushType: "fill",
					color: h.colorIn
				}
			}),
			g = new i({
				highlightStyle: {
					r0: Math.round(h.r - h.r / 3),
					r: h.r,
					brushType: "fill",
					color: h.colorOut
				}
			}),
			y = [0, h.x, h.y];
		return v.highlightStyle.x = m.highlightStyle.x = g.highlightStyle.x = y[1], v.highlightStyle.y = m.highlightStyle.y = g.highlightStyle.y = y[2], setInterval(function() {
			e(d), e(g), y[0] -= .3, v.rotation = y, e(v), e(m), e(a), t()
		}, h.timeInterval)
	}, u
});