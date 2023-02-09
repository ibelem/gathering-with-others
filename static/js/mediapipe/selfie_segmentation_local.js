(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';
    var C;

    function aa(a) {
        var c = 0;
        return function() {
            return c < a.length ? {
                done: !1,
                value: a[c++]
            } : {
                done: !0
            }
        }
    }
    var D = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[c] = b.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math) return b
        }
        throw Error("Cannot find global object");
    }
    var E = ba(this);

    function H(a, c) {
        if (c) a: {
            var b = E;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var g = a[d];
                if (!(g in b)) break a;
                b = b[g]
            }
            a = a[a.length - 1];d = b[a];c = c(d);c != d && null != c && D(b, a, {
                configurable: !0,
                writable: !0,
                value: c
            })
        }
    }
    H("Symbol", function(a) {
        function c(k) {
            if (this instanceof c) throw new TypeError("Symbol is not a constructor");
            return new b(d + (k || "") + "_" + g++, k)
        }

        function b(k, e) {
            this.g = k;
            D(this, "description", {
                configurable: !0,
                writable: !0,
                value: e
            })
        }
        if (a) return a;
        b.prototype.toString = function() {
            return this.g
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            g = 0;
        return c
    });
    H("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
            var d = E[c[b]];
            "function" === typeof d && "function" != typeof d.prototype[a] && D(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return da(aa(this))
                }
            })
        }
        return a
    });

    function da(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    }

    function J(a) {
        var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return c ? c.call(a) : {
            next: aa(a)
        }
    }

    function K(a) {
        if (!(a instanceof Array)) {
            a = J(a);
            for (var c, b = []; !(c = a.next()).done;) b.push(c.value);
            a = b
        }
        return a
    }
    var L;
    if ("function" == typeof Object.setPrototypeOf) L = Object.setPrototypeOf;
    else {
        var M;
        a: {
            var ea = {
                    a: !0
                },
                fa = {};
            try {
                fa.__proto__ = ea;
                M = fa.a;
                break a
            } catch (a) {}
            M = !1
        }
        L = M ? function(a, c) {
            a.__proto__ = c;
            if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ha = L;

    function P() {
        this.l = !1;
        this.i = null;
        this.h = void 0;
        this.g = 1;
        this.s = this.m = 0;
        this.j = null
    }

    function Q(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0
    }
    P.prototype.o = function(a) {
        this.h = a
    };

    function R(a, c) {
        a.j = {
            P: c,
            R: !0
        };
        a.g = a.m || a.s
    }
    P.prototype.return = function(a) {
        this.j = {
            return: a
        };
        this.g = this.s
    };

    function S(a, c, b) {
        a.g = b;
        return {
            value: c
        }
    }

    function ia(a) {
        this.g = new P;
        this.h = a
    }

    function ja(a, c) {
        Q(a.g);
        var b = a.g.i;
        if (b) return T(a, "return" in b ? b["return"] : function(d) {
            return {
                value: d,
                done: !0
            }
        }, c, a.g.return);
        a.g.return(c);
        return U(a)
    }

    function T(a, c, b, d) {
        try {
            var g = c.call(a.g.i, b);
            if (!(g instanceof Object)) throw new TypeError("Iterator result " + g + " is not an object");
            if (!g.done) return a.g.l = !1, g;
            var k = g.value
        } catch (e) {
            return a.g.i = null, R(a.g, e), U(a)
        }
        a.g.i = null;
        d.call(a.g, k);
        return U(a)
    }

    function U(a) {
        for (; a.g.g;) try {
            var c = a.h(a.g);
            if (c) return a.g.l = !1, {
                value: c.value,
                done: !1
            }
        } catch (b) {
            a.g.h = void 0, R(a.g, b)
        }
        a.g.l = !1;
        if (a.g.j) {
            c = a.g.j;
            a.g.j = null;
            if (c.R) throw c.P;
            return {
                value: c.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }

    function ka(a) {
        this.next = function(c) {
            Q(a.g);
            a.g.i ? c = T(a, a.g.i.next, c, a.g.o) : (a.g.o(c), c = U(a));
            return c
        };
        this.throw = function(c) {
            Q(a.g);
            a.g.i ? c = T(a, a.g.i["throw"], c, a.g.o) : (R(a.g, c), c = U(a));
            return c
        };
        this.return = function(c) {
            return ja(a, c)
        };
        this[Symbol.iterator] = function() {
            return this
        }
    }

    function V(a, c) {
        c = new ka(new ia(c));
        ha && a.prototype && ha(c, a.prototype);
        return c
    }
    var la = "function" == typeof Object.assign ? Object.assign : function(a, c) {
        for (var b = 1; b < arguments.length; b++) {
            var d = arguments[b];
            if (d)
                for (var g in d) Object.prototype.hasOwnProperty.call(d, g) && (a[g] = d[g])
        }
        return a
    };
    H("Object.assign", function(a) {
        return a || la
    });
    H("Promise", function(a) {
        function c(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var f = this.j();
            try {
                e(f.resolve, f.reject)
            } catch (h) {
                f.reject(h)
            }
        }

        function b() {
            this.g = null
        }

        function d(e) {
            return e instanceof c ? e : new c(function(f) {
                f(e)
            })
        }
        if (a) return a;
        b.prototype.h = function(e) {
            if (null == this.g) {
                this.g = [];
                var f = this;
                this.i(function() {
                    f.l()
                })
            }
            this.g.push(e)
        };
        var g = E.setTimeout;
        b.prototype.i = function(e) {
            g(e, 0)
        };
        b.prototype.l = function() {
            for (; this.g && this.g.length;) {
                var e = this.g;
                this.g = [];
                for (var f = 0; f < e.length; ++f) {
                    var h =
                        e[f];
                    e[f] = null;
                    try {
                        h()
                    } catch (l) {
                        this.j(l)
                    }
                }
            }
            this.g = null
        };
        b.prototype.j = function(e) {
            this.i(function() {
                throw e;
            })
        };
        c.prototype.j = function() {
            function e(l) {
                return function(m) {
                    h || (h = !0, l.call(f, m))
                }
            }
            var f = this,
                h = !1;
            return {
                resolve: e(this.A),
                reject: e(this.l)
            }
        };
        c.prototype.A = function(e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof c) this.C(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var f = null != e;
                        break a;
                    case "function":
                        f = !0;
                        break a;
                    default:
                        f = !1
                }
                f ? this.v(e) : this.m(e)
            }
        };
        c.prototype.v = function(e) {
            var f = void 0;
            try {
                f = e.then
            } catch (h) {
                this.l(h);
                return
            }
            "function" == typeof f ? this.H(f, e) : this.m(e)
        };
        c.prototype.l = function(e) {
            this.s(2, e)
        };
        c.prototype.m = function(e) {
            this.s(1, e)
        };
        c.prototype.s = function(e, f) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + f + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = f;
            2 === this.h && this.B();
            this.u()
        };
        c.prototype.B = function() {
            var e = this;
            g(function() {
                if (e.G()) {
                    var f = E.console;
                    "undefined" !== typeof f && f.error(e.i)
                }
            }, 1)
        };
        c.prototype.G =
            function() {
                if (this.o) return !1;
                var e = E.CustomEvent,
                    f = E.Event,
                    h = E.dispatchEvent;
                if ("undefined" === typeof h) return !0;
                "function" === typeof e ? e = new e("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof f ? e = new f("unhandledrejection", {
                    cancelable: !0
                }) : (e = E.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
                e.promise = this;
                e.reason = this.i;
                return h(e)
            };
        c.prototype.u = function() {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) k.h(this.g[e]);
                this.g = null
            }
        };
        var k = new b;
        c.prototype.C =
            function(e) {
                var f = this.j();
                e.I(f.resolve, f.reject)
            };
        c.prototype.H = function(e, f) {
            var h = this.j();
            try {
                e.call(f, h.resolve, h.reject)
            } catch (l) {
                h.reject(l)
            }
        };
        c.prototype.then = function(e, f) {
            function h(t, u) {
                return "function" == typeof t ? function(B) {
                    try {
                        l(t(B))
                    } catch (p) {
                        m(p)
                    }
                } : u
            }
            var l, m, y = new c(function(t, u) {
                l = t;
                m = u
            });
            this.I(h(e, l), h(f, m));
            return y
        };
        c.prototype.catch = function(e) {
            return this.then(void 0, e)
        };
        c.prototype.I = function(e, f) {
            function h() {
                switch (l.h) {
                    case 1:
                        e(l.i);
                        break;
                    case 2:
                        f(l.i);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            l.h);
                }
            }
            var l = this;
            null == this.g ? k.h(h) : this.g.push(h);
            this.o = !0
        };
        c.resolve = d;
        c.reject = function(e) {
            return new c(function(f, h) {
                h(e)
            })
        };
        c.race = function(e) {
            return new c(function(f, h) {
                for (var l = J(e), m = l.next(); !m.done; m = l.next()) d(m.value).I(f, h)
            })
        };
        c.all = function(e) {
            var f = J(e),
                h = f.next();
            return h.done ? d([]) : new c(function(l, m) {
                function y(B) {
                    return function(p) {
                        t[B] = p;
                        u--;
                        0 == u && l(t)
                    }
                }
                var t = [],
                    u = 0;
                do t.push(void 0), u++, d(h.value).I(y(t.length - 1), m), h = f.next(); while (!h.done)
            })
        };
        return c
    });

    function ma(a, c) {
        a instanceof String && (a += "");
        var b = 0,
            d = !1,
            g = {
                next: function() {
                    if (!d && b < a.length) {
                        var k = b++;
                        return {
                            value: c(k, a[k]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        g[Symbol.iterator] = function() {
            return g
        };
        return g
    }
    H("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ma(this, function(c) {
                return c
            })
        }
    });
    var na = this || self;

    function W(a, c) {
        a = a.split(".");
        var b = na;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === c ? b[d] && b[d] !== Object.prototype[d] ? b = b[d] : b = b[d] = {} : b[d] = c
    };

    function X(a, c) {
        var b = void 0;
        return new(b || (b = Promise))(function(d, g) {
            function k(h) {
                try {
                    f(c.next(h))
                } catch (l) {
                    g(l)
                }
            }

            function e(h) {
                try {
                    f(c["throw"](h))
                } catch (l) {
                    g(l)
                }
            }

            function f(h) {
                h.done ? d(h.value) : (new b(function(l) {
                    l(h.value)
                })).then(k, e)
            }
            f((c = c.apply(a, void 0)).next())
        })
    };
    var oa = [
            [61, 146],
            [146, 91],
            [91, 181],
            [181, 84],
            [84, 17],
            [17, 314],
            [314, 405],
            [405, 321],
            [321, 375],
            [375, 291],
            [61, 185],
            [185, 40],
            [40, 39],
            [39, 37],
            [37, 0],
            [0, 267],
            [267, 269],
            [269, 270],
            [270, 409],
            [409, 291],
            [78, 95],
            [95, 88],
            [88, 178],
            [178, 87],
            [87, 14],
            [14, 317],
            [317, 402],
            [402, 318],
            [318, 324],
            [324, 308],
            [78, 191],
            [191, 80],
            [80, 81],
            [81, 82],
            [82, 13],
            [13, 312],
            [312, 311],
            [311, 310],
            [310, 415],
            [415, 308]
        ],
        pa = [
            [263, 249],
            [249, 390],
            [390, 373],
            [373, 374],
            [374, 380],
            [380, 381],
            [381, 382],
            [382, 362],
            [263, 466],
            [466, 388],
            [388, 387],
            [387, 386],
            [386,
                385
            ],
            [385, 384],
            [384, 398],
            [398, 362]
        ],
        qa = [
            [276, 283],
            [283, 282],
            [282, 295],
            [295, 285],
            [300, 293],
            [293, 334],
            [334, 296],
            [296, 336]
        ],
        ra = [
            [33, 7],
            [7, 163],
            [163, 144],
            [144, 145],
            [145, 153],
            [153, 154],
            [154, 155],
            [155, 133],
            [33, 246],
            [246, 161],
            [161, 160],
            [160, 159],
            [159, 158],
            [158, 157],
            [157, 173],
            [173, 133]
        ],
        ua = [
            [46, 53],
            [53, 52],
            [52, 65],
            [65, 55],
            [70, 63],
            [63, 105],
            [105, 66],
            [66, 107]
        ],
        va = [
            [10, 338],
            [338, 297],
            [297, 332],
            [332, 284],
            [284, 251],
            [251, 389],
            [389, 356],
            [356, 454],
            [454, 323],
            [323, 361],
            [361, 288],
            [288, 397],
            [397, 365],
            [365, 379],
            [379, 378],
            [378, 400],
            [400, 377],
            [377, 152],
            [152, 148],
            [148, 176],
            [176, 149],
            [149, 150],
            [150, 136],
            [136, 172],
            [172, 58],
            [58, 132],
            [132, 93],
            [93, 234],
            [234, 127],
            [127, 162],
            [162, 21],
            [21, 54],
            [54, 103],
            [103, 67],
            [67, 109],
            [109, 10]
        ],
        wa = [].concat(K(oa), K(pa), K(qa), K(ra), K(ua), K(va));

    function xa(a, c, b) {
        b = a.createShader(0 === b ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
        a.shaderSource(b, c);
        a.compileShader(b);
        if (!a.getShaderParameter(b, a.COMPILE_STATUS)) throw Error("Could not compile WebGL shader.\n\n" + a.getShaderInfoLog(b));
        return b
    };

    function Y(a, c) {
        this.h = a;
        this.g = c;
        this.l = 0;
        this.canvas = document.createElement("canvas")
    }

    function ya(a) {
        if ("function" === typeof a.g.canvas.transferToImageBitmap) return Promise.resolve(a.g.canvas.transferToImageBitmap());
        if ("function" === typeof createImageBitmap) return createImageBitmap(a.g.canvas, {
            premultiplyAlpha: "premultiply",
            colorSpaceConversion: "none"
        });
        void 0 === a.j && (a.j = document.createElement("img"));
        return new Promise(function(c) {
            a.j.onload = function() {
                requestAnimationFrame(function() {
                    c(a.j)
                })
            };
            a.j.src = a.g.canvas.toDataURL()
        })
    }

    function za(a, c) {
        var b = a.g;
        if (void 0 === a.m) {
            var d = xa(b, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", 0),
                g = xa(b, "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }", 1),
                k = b.createProgram();
            b.attachShader(k, d);
            b.attachShader(k, g);
            b.linkProgram(k);
            if (!b.getProgramParameter(k, b.LINK_STATUS)) throw Error("Could not compile WebGL program.\n\n" +
                b.getProgramInfoLog(k));
            d = a.m = k;
            b.useProgram(d);
            g = b.getUniformLocation(d, "sampler0");
            a.i = {
                F: b.getAttribLocation(d, "aVertex"),
                D: b.getAttribLocation(d, "aTex"),
                T: g
            };
            a.s = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.s);
            b.enableVertexAttribArray(a.i.F);
            b.vertexAttribPointer(a.i.F, 2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            a.o = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.o);
            b.enableVertexAttribArray(a.i.D);
            b.vertexAttribPointer(a.i.D,
                2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            b.uniform1i(g, 0)
        }
        d = a.i;
        b.useProgram(a.m);
        b.canvas.width = c.width;
        b.canvas.height = c.height;
        b.viewport(0, 0, c.width, c.height);
        b.activeTexture(b.TEXTURE0);
        a.h.bindTexture2d(c.glName);
        b.enableVertexAttribArray(d.F);
        b.bindBuffer(b.ARRAY_BUFFER, a.s);
        b.vertexAttribPointer(d.F, 2, b.FLOAT, !1, 0, 0);
        b.enableVertexAttribArray(d.D);
        b.bindBuffer(b.ARRAY_BUFFER, a.o);
        b.vertexAttribPointer(d.D,
            2, b.FLOAT, !1, 0, 0);
        b.bindFramebuffer(b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER, null);
        b.clearColor(0, 0, 0, 0);
        b.clear(b.COLOR_BUFFER_BIT);
        b.colorMask(!0, !0, !0, !0);
        b.drawArrays(b.TRIANGLE_FAN, 0, 4);
        b.disableVertexAttribArray(d.F);
        b.disableVertexAttribArray(d.D);
        b.bindBuffer(b.ARRAY_BUFFER, null);
        a.h.bindTexture2d(0)
    }

    function Aa(a) {
        this.g = a
    };
    var Ba = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);

    function Ca(a, c) {
        return c + a
    }

    function Da(a, c) {
        window[a] = c
    }

    function Ea(a) {
        var c = document.createElement("script");
        c.setAttribute("src", a);
        c.setAttribute("crossorigin", "anonymous");
        document.body.appendChild(c);
        return new Promise(function(b) {
            c.addEventListener("load", function() {
                b()
            }, !1)
        })
    }

    function Fa(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var g = a.get(d);
            c.push({
                x: g.x,
                y: g.y,
                z: g.z,
                visibility: g.hasVisibility ? g.visibility : void 0
            })
        }
        return c
    }

    function Ga(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var g = a.get(d);
            c.push({
                index: g.index,
                score: g.score,
                label: g.hasLabel ? g.label : void 0,
                displayName: g.hasDisplayName ? g.displayName : void 0
            })
        }
        return c
    }

    function Ha() {
        return X(this, function c() {
            return V(c, function(b) {
                switch (b.g) {
                    case 1:
                        return b.m = 2, S(b, WebAssembly.instantiate(Ba), 4);
                    case 4:
                        b.g = 3;
                        b.m = 0;
                        break;
                    case 2:
                        return b.m = 0, b.j = null, b.return(!1);
                    case 3:
                        return b.return(!0)
                }
            })
        })
    }

    function Ia(a) {
        this.g = a;
        this.listeners = {};
        this.s = {};
        this.v = {};
        this.l = {};
        this.m = {};
        this.u = this.H = !0;
        this.C = Promise.resolve();
        this.o = {};
        this.locateFile = a && a.locateFile || Ca;
        if ("object" === typeof window) a = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
        else if ("undefined" !== typeof location) a = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
        else throw Error("solutions can only be loaded on a web page or in a web worker");
        this.N = a
    }
    C = Ia.prototype;
    C.close = function() {
        this.i && this.i.delete();
        return Promise.resolve()
    };

    function Ja(a, c) {
        return void 0 === a.g.files ? [] : "function" === typeof a.g.files ? a.g.files(c) : a.g.files
    }

    function Ka(a) {
        return X(a, function b() {
            var d = this,
                g, k, e, f, h, l, m, y, t, u, B, p, x, r, v, G, A;
            return V(b, function(q) {
                switch (q.g) {
                    case 1:
                        g = d;
                        if (!d.H) return q.return();
                        k = Ja(d, d.s);
                        return S(q, Ha(), 2);
                    case 2:
                        e = q.h;
                        if ("object" === typeof window) return Da("createMediapipeSolutionsWasm", {
                            locateFile: d.locateFile
                        }), Da("createMediapipeSolutionsPackedAssets", {
                            locateFile: d.locateFile
                        }), l = k.filter(function(n) {
                            return void 0 !== n.data
                        }), m = k.filter(function(n) {
                            return void 0 === n.data
                        }), y = Promise.all(l.map(function(n) {
                            return X(g,
                                function w() {
                                    var z = this;
                                    return V(w, function(I) {
                                        return S(I, Z(z, n.url), 0)
                                    })
                                })
                        })), t = Promise.all(m.map(function(n) {
                            return void 0 === n.simd || n.simd && e || !n.simd && !e ? Ea(g.locateFile(n.url, g.N)) : Promise.resolve()
                        })).then(function() {
                            return X(g, function F() {
                                var w, z, I = this;
                                return V(F, function(N) {
                                    if (1 == N.g) return w = window.createMediapipeSolutionsWasm, z = window.createMediapipeSolutionsPackedAssets, S(N, w(z), 2);
                                    I.h = N.h;
                                    N.g = 0
                                })
                            })
                        }), u = function() {
                            return X(g, function F() {
                                var w = this;
                                return V(F, function(z) {
                                    w.g.graph && w.g.graph.url ?
                                        z = S(z, Z(w, w.g.graph.url), 0) : (z.g = 0, z = void 0);
                                    return z
                                })
                            })
                        }(), S(q, Promise.all([t, y, u]), 7);
                        if ("function" !== typeof importScripts) throw Error("solutions can only be loaded on a web page or in a web worker");
                        f = k.filter(function(n) {
                            return void 0 === n.simd || n.simd && e || !n.simd && !e
                        }).map(function(n) {
                            return g.locateFile(n.url, g.N)
                        });
                        importScripts.apply(null, K(f));
                        return S(q, createMediapipeSolutionsWasm(Module), 6);
                    case 6:
                        d.h = q.h;
                        d.j = new OffscreenCanvas(1, 1);
                        d.h.canvas = d.j;
                        h = d.h.GL.createContext(d.j, {
                            antialias: !1,
                            alpha: !1,
                            S: "undefined" !== typeof WebGL2RenderingContext ? 2 : 1
                        });
                        d.h.GL.makeContextCurrent(h);
                        q.g = 4;
                        break;
                    case 7:
                        d.j = document.createElement("canvas"), d.j.getContext("webgl2"), d.h.canvas = d.j, d.h.createContext(d.j, !0, !0, {});
                    case 4:
                        d.i = new d.h.SolutionWasm;
                        if (!d.g.graph || !d.g.graph.url) {
                            q.g = 8;
                            break
                        }
                        return S(q, Z(d, d.g.graph.url), 9);
                    case 9:
                        B = q.h, d.i.loadGraph(B);
                    case 8:
                        p = J(Object.keys(d.o));
                        for (x = p.next(); !x.done; x = p.next()) r = x.value, d.i.overrideFile(r, d.o[r]);
                        d.o = {};
                        if (d.g.listeners)
                            for (v = J(d.g.listeners),
                                G = v.next(); !G.done; G = v.next()) A = G.value, La(d, A);
                        d.H = !1;
                        q.g = 0
                }
            })
        })
    }
    C.reset = function() {
        return X(this, function c() {
            var b = this;
            return V(c, function(d) {
                b.i && (b.i.reset(), b.l = {}, b.m = {});
                d.g = 0
            })
        })
    };
    C.setOptions = function(a) {
        var c = this;
        if (this.g.options) {
            for (var b = [], d = [], g = {}, k = J(Object.keys(a)), e = k.next(); !e.done; g = {
                    J: g.J,
                    K: g.K
                }, e = k.next()) {
                var f = e.value;
                !(f in this.s && this.s[f] === a[f]) && (this.s[f] = a[f], e = this.g.options[f]) && (e.onChange && (g.J = e.onChange, g.K = a[f], b.push(function(h) {
                    return function() {
                        return X(c, function m() {
                            var y, t = this;
                            return V(m, function(u) {
                                if (1 == u.g) return S(u, h.J(h.K), 2);
                                y = u.h;
                                !0 === y && (t.u = !0);
                                u.g = 0
                            })
                        })
                    }
                }(g))), e.graphOptionXref && (f = {
                    valueNumber: 0 === e.type ? a[f] : 0,
                    valueBoolean: 1 ===
                        e.type ? a[f] : !1
                }, e = Object.assign(Object.assign(Object.assign({}, {
                    calculatorName: "",
                    calculatorIndex: 0
                }), e.graphOptionXref), f), d.push(e)))
            }
            if (0 !== b.length || 0 !== d.length) this.u = !0, this.A = d, this.B = b
        }
    };

    function Ma(a) {
        return X(a, function b() {
            var d = this,
                g, k, e, f, h, l, m, y;
            return V(b, function(t) {
                switch (t.g) {
                    case 1:
                        if (!d.u) return t.return();
                        g = d.j.getContext("webgl2", {});
                        if (!g && (g = d.j.getContext("webgl", {}), !g)) return alert("Failed to create WebGL canvas context when passing video frame."), t.return();
                        d.G = g;
                        if (!d.B) {
                            t.g = 2;
                            break
                        }
                        k = J(d.B);
                        e = k.next();
                    case 3:
                        if (e.done) {
                            t.g = 5;
                            break
                        }
                        f = e.value;
                        return S(t, f(), 4);
                    case 4:
                        e = k.next();
                        t.g = 3;
                        break;
                    case 5:
                        d.B = void 0;
                    case 2:
                        if (d.A) {
                            h = new d.h.GraphOptionChangeRequestList;
                            l = J(d.A);
                            for (m = l.next(); !m.done; m = l.next()) y = m.value, h.push_back(y);
                            d.i.changeOptions(h);
                            h.delete();
                            d.A = void 0
                        }
                        d.u = !1;
                        t.g = 0
                }
            })
        })
    }
    C.initialize = function() {
        return X(this, function c() {
            var b = this;
            return V(c, function(d) {
                return 1 == d.g ? S(d, Ka(b), 2) : S(d, Ma(b), 0)
            })
        })
    };

    function Z(a, c) {
        return X(a, function d() {
            var g = this,
                k, e;
            return V(d, function(f) {
                if (c in g.v) return f.return(g.v[c]);
                k = g.locateFile(c, "");
                e = fetch(k).then(function(h) {
                    return h.arrayBuffer()
                });
                g.v[c] = e;
                return f.return(e)
            })
        })
    }
    C.overrideFile = function(a, c) {
        this.i ? this.i.overrideFile(a, c) : this.o[a] = c
    };
    C.clearOverriddenFiles = function() {
        this.o = {};
        this.i && this.i.clearOverriddenFiles()
    };
    C.send = function(a, c) {
        return X(this, function d() {
            var g = this,
                k, e, f, h, l, m, y, t, u;
            return V(d, function(B) {
                if (1 == B.g) {
                    if (!g.g.inputs) return B.return();
                    k = 1E3 * (void 0 === c || null === c ? performance.now() : c);
                    return S(B, g.C, 2)
                }
                if (3 != B.g) return S(B, g.initialize(), 3);
                e = new g.h.PacketDataList;
                f = J(Object.keys(a));
                for (h = f.next(); !h.done; h = f.next())
                    if (l = h.value, m = g.g.inputs[l]) {
                        a: {
                            var p = g;
                            var x = a[l];
                            switch (m.type) {
                                case "video":
                                    var r = p.l[m.stream];
                                    r || (r = new Y(p.h, p.G), p.l[m.stream] = r);
                                    p = r;
                                    0 === p.l && (p.l = p.h.createTexture());
                                    if ("undefined" !== typeof HTMLVideoElement && x instanceof HTMLVideoElement) {
                                        var v = x.videoWidth;
                                        r = x.videoHeight
                                    } else "undefined" !== typeof HTMLImageElement && x instanceof HTMLImageElement ? (v = x.naturalWidth, r = x.naturalHeight) : (v = x.width, r = x.height);
                                    r = {
                                        glName: p.l,
                                        width: v,
                                        height: r
                                    };
                                    v = p.g;
                                    v.canvas.width = r.width;
                                    v.canvas.height = r.height;
                                    v.activeTexture(v.TEXTURE0);
                                    p.h.bindTexture2d(p.l);
                                    v.texImage2D(v.TEXTURE_2D, 0, v.RGBA, v.RGBA, v.UNSIGNED_BYTE, x);
                                    p.h.bindTexture2d(0);
                                    p = r;
                                    break a;
                                case "detections":
                                    r = p.l[m.stream];
                                    r || (r = new Aa(p.h), p.l[m.stream] = r);
                                    p = r;
                                    p.data || (p.data = new p.g.DetectionListData);
                                    p.data.reset(x.length);
                                    for (r = 0; r < x.length; ++r) {
                                        v = x[r];
                                        p.data.setBoundingBox(r, v.O);
                                        if (v.M)
                                            for (var G = 0; G < v.M.length; ++G) {
                                                var A = v.M[G],
                                                    q = A.visibility ? !0 : !1;
                                                p.data.addNormalizedLandmark(r, Object.assign(Object.assign({}, A), {
                                                    hasVisibility: q,
                                                    visibility: q ? A.visibility : 0
                                                }))
                                            }
                                        if (v.L)
                                            for (G = 0; G < v.L.length; ++G) {
                                                A = v.L[G];
                                                q = A.index ? !0 : !1;
                                                var n = A.label ? !0 : !1,
                                                    F = A.displayName ? !0 : !1;
                                                p.data.addClassification(r, {
                                                    score: A.score,
                                                    hasIndex: q,
                                                    index: q ? A.index : -1,
                                                    hasLabel: n,
                                                    label: n ? A.label : "",
                                                    hasDisplayName: F,
                                                    displayName: F ? A.displayName : ""
                                                })
                                            }
                                    }
                                    p = p.data;
                                    break a;
                                default:
                                    p = {}
                            }
                        }
                        y = p;t = m.stream;
                        switch (m.type) {
                            case "video":
                                e.pushTexture2d(Object.assign(Object.assign({}, y), {
                                    stream: t,
                                    timestamp: k
                                }));
                                break;
                            case "detections":
                                u = y;
                                u.stream = t;
                                u.timestamp = k;
                                e.pushDetectionList(u);
                                break;
                            default:
                                throw Error("Unknown input config type: '" + m.type + "'");
                        }
                    } g.i.send(e);
                e.delete();
                B.g = 0
            })
        })
    };

    function Na(a, c, b) {
        return X(a, function g() {
            var k, e, f, h, l, m, y, t, u, B, p, x = this,
                r, v, G, A;
            return V(g, function(q) {
                switch (q.g) {
                    case 1:
                        if (!b) return q.return(c);
                        k = {};
                        e = J(Object.keys(b));
                        f = e.next();
                    case 2:
                        if (f.done) {
                            q.g = 4;
                            break
                        }
                        h = f.value;
                        l = b[h];
                        if ("string" === typeof l) return G = k, A = h, S(q, Oa(x, h, c[l]), 15);
                        m = c[l.stream];
                        if (void 0 === m) {
                            q.g = 3;
                            break
                        }
                        if ("detection_list" === l.type) {
                            var n = m.getRectList(),
                                F = m.getLandmarksList(),
                                w = m.getClassificationsList(),
                                z = [];
                            if (n)
                                for (var I = 0; I < n.size(); ++I) {
                                    var N = {
                                        O: n.get(I),
                                        M: Fa(F.get(I)),
                                        L: Ga(w.get(I))
                                    };
                                    z.push(N)
                                }
                            k[h] = z;
                            q.g = 7;
                            break
                        }
                        if ("landmarks" === l.type) {
                            y = m.getLandmarks();
                            k[h] = y ? Fa(y) : void 0;
                            q.g = 7;
                            break
                        }
                        if ("landmarks_list" === l.type) {
                            if (t = m.getLandmarksList())
                                for (n = [], F = t.size(), w = 0; w < F; ++w) z = t.get(w), n.push(Fa(z));
                            else n = void 0;
                            k[h] = n;
                            q.g = 7;
                            break
                        }
                        if ("rect_list" === l.type) {
                            if (u = m.getRectList())
                                for (n = [], F = u.size(), w = 0; w < F; ++w) z = u.get(w), n.push(z);
                            else n = void 0;
                            k[h] = n;
                            q.g = 7;
                            break
                        }
                        if ("classifications_list" === l.type) {
                            if (B = m.getClassificationsList())
                                for (n = [], F = B.size(), w = 0; w < F; ++w) z =
                                    B.get(w), n.push(Ga(z));
                            else n = void 0;
                            k[h] = n;
                            q.g = 7;
                            break
                        }
                        if ("object_detection_list" === l.type) {
                            if (p = m.getObjectDetectionList())
                                for (n = [], F = p.size(), w = 0; w < F; ++w) {
                                    z = p.get(w);
                                    I = n;
                                    N = I.push;
                                    for (var Ra = z.id, sa = z.keypoints, ta = [], Sa = sa.size(), ca = 0; ca < Sa; ++ca) {
                                        var O = sa.get(ca);
                                        ta.push({
                                            id: O.id,
                                            point3d: {
                                                x: O.point3d.x,
                                                y: O.point3d.y,
                                                z: O.point3d.z
                                            },
                                            point2d: {
                                                x: O.point2d.x,
                                                y: O.point2d.y,
                                                depth: O.point2d.depth
                                            }
                                        })
                                    }
                                    N.call(I, {
                                        id: Ra,
                                        keypoints: ta,
                                        visibility: z.visibility
                                    })
                                } else n = void 0;
                            k[h] = n;
                            q.g = 7;
                            break
                        }
                        if ("texture" !== l.type) throw Error("Unknown output config type: '" +
                            l.type + "'");
                        r = x.m[h];
                        r || (r = new Y(x.h, x.G), x.m[h] = r);
                        n = r;
                        F = m.getTexture2d();
                        za(n, F);
                        n = ya(n);
                        return S(q, n, 14);
                    case 14:
                        v = q.h, k[h] = v;
                    case 7:
                        l.transform && k[h] && (k[h] = l.transform(k[h]));
                        q.g = 3;
                        break;
                    case 15:
                        G[A] = q.h;
                    case 3:
                        f = e.next();
                        q.g = 2;
                        break;
                    case 4:
                        return q.return(k)
                }
            })
        })
    }

    function Oa(a, c, b) {
        return X(a, function g() {
            var k = this,
                e;
            return V(g, function(f) {
                if (b.isNumber()) return f.return(b.getNumber());
                if (b.isRect()) return f.return(b.getRect());
                if (b.isLandmarks()) return f.return(b.getLandmarks());
                if (b.isLandmarksList()) return f.return(b.getLandmarksList());
                if (b.isClassificationsList()) return f.return(b.getClassificationsList());
                if (b.isObjectDetectionList()) return f.return(b.getObjectDetectionList());
                if (b.isTexture2d()) {
                    e = k.m[c];
                    e || (e = new Y(k.h, k.G), k.m[c] = e);
                    var h = f.return;
                    var l = e;
                    var m = b.getTexture2d();
                    za(l, m);
                    l = ya(l);
                    return h.call(f, l)
                }
                return f.return(void 0)
            })
        })
    }

    function La(a, c) {
        for (var b = c.name || "$", d = [].concat(K(c.wants)), g = new a.h.StringList, k = J(c.wants), e = k.next(); !e.done; e = k.next()) g.push_back(e.value);
        k = a.h.PacketListener.implement({
            onResults: function(f) {
                return X(a, function l() {
                    var m = this,
                        y, t, u, B, p;
                    return V(l, function(x) {
                        y = m;
                        t = {};
                        for (u = 0; u < c.wants.length; ++u) t[d[u]] = f.get(u);
                        B = Na(m, t, c.outs);
                        if (p = m.listeners[b]) return x.return(m.C.then(function() {
                            return B
                        }).then(function(r) {
                            return X(y, function G() {
                                var A, q = this;
                                return V(G, function(n) {
                                    if (A = p(r)) return q.C =
                                        A, n.return(A);
                                    n.g = 0
                                })
                            })
                        }));
                        x.g = 0
                    })
                })
            }
        });
        a.i.attachMultiListener(g, k);
        g.delete()
    }
    C.onResults = function(a, c) {
        this.listeners[c || "$"] = a
    };
    W("Solution", Ia);
    W("OptionType", {
        NUMBER: 0,
        BOOL: 1,
        0: "NUMBER",
        1: "BOOL"
    });

    function Pa(a) {
        void 0 === a && (a = 0);
        switch (a) {
            case 1:
                return "selfie_segmentation_landscape.tflite";
            default:
                return "selfie_segmentation.tflite"
        }
    }

    function Qa(a) {
        var c = this;
        a = a || {};
        this.g = new Ia({
            locateFile: a.locateFile,
            files: function(b) {
                return [{
                    simd: !0,
                    url: "selfie_segmentation_solution_simd_wasm_bin.js"
                }, {
                    simd: !1,
                    url: "selfie_segmentation_solution_wasm_bin.js"
                }, {
                    data: !0,
                    url: Pa(b.modelSelection)
                }]
            },
            graph: {
                url: "selfie_segmentation.binarypb"
            },
            listeners: [{
                wants: ["segmentation_mask", "image_transformed"],
                outs: {
                    image: "image_transformed",
                    segmentationMask: "segmentation_mask"
                }
            }],
            inputs: {
                image: {
                    type: "video",
                    stream: "input_frames_gpu"
                }
            },
            options: {
                selfieMode: {
                    type: 1,
                    graphOptionXref: {
                        calculatorType: "GlScalerCalculator",
                        calculatorIndex: 1,
                        fieldName: "flip_horizontal"
                    }
                },
                modelSelection: {
                    type: 0,
                    graphOptionXref: {
                        calculatorType: "ConstantSidePacketCalculator",
                        calculatorName: "ConstantSidePacketCalculatorModelSelection",
                        fieldName: "int_value"
                    },
                    onChange: function(b) {
                        return X(c, function g() {
                            var k, e, f = this,
                                h;
                            return V(g, function(l) {
                                if (1 == l.g) return k = Pa(b), e = "third_party/mediapipe/modules/selfie_segmentation/" + k, S(l, Z(f.g, k), 2);
                                h = l.h;
                                f.g.overrideFile(e, h);
                                return l.return(!0)
                            })
                        })
                    }
                }
            }
        })
    }
    C = Qa.prototype;
    C.close = function() {
        this.g.close();
        return Promise.resolve()
    };
    C.onResults = function(a) {
        this.g.onResults(a)
    };
    C.initialize = function() {
        return X(this, function c() {
            var b = this;
            return V(c, function(d) {
                return S(d, b.g.initialize(), 0)
            })
        })
    };
    C.reset = function() {
        this.g.reset()
    };
    C.send = function(a) {
        return X(this, function b() {
            var d = this;
            return V(b, function(g) {
                return S(g, d.g.send(a), 0)
            })
        })
    };
    C.setOptions = function(a) {
        this.g.setOptions(a)
    };
    W("SelfieSegmentation", Qa);
    W("SELFIE_SEGMENTATION_LIPS", oa);
    W("SELFIE_SEGMENTATION_LEFT_EYE", pa);
    W("SELFIE_SEGMENTATION_LEFT_EYEBROW", qa);
    W("SELFIE_SEGMENTATION_RIGHT_EYE", ra);
    W("SELFIE_SEGMENTATION_RIGHT_EYEBROW", ua);
    W("SELFIE_SEGMENTATION_FACE_OVAL", va);
    W("SELFIE_SEGMENTATION_CONTOURS", wa);
    W("SELFIE_SEGMENTATION_TESSELATION", [
        [127, 34],
        [34, 139],
        [139, 127],
        [11, 0],
        [0, 37],
        [37, 11],
        [232, 231],
        [231, 120],
        [120, 232],
        [72, 37],
        [37, 39],
        [39, 72],
        [128, 121],
        [121, 47],
        [47, 128],
        [232, 121],
        [121, 128],
        [128, 232],
        [104, 69],
        [69, 67],
        [67, 104],
        [175, 171],
        [171, 148],
        [148, 175],
        [118, 50],
        [50, 101],
        [101, 118],
        [73, 39],
        [39, 40],
        [40, 73],
        [9, 151],
        [151, 108],
        [108, 9],
        [48, 115],
        [115, 131],
        [131, 48],
        [194, 204],
        [204, 211],
        [211, 194],
        [74, 40],
        [40, 185],
        [185, 74],
        [80, 42],
        [42, 183],
        [183, 80],
        [40, 92],
        [92, 186],
        [186, 40],
        [230, 229],
        [229, 118],
        [118, 230],
        [202,
            212
        ],
        [212, 214],
        [214, 202],
        [83, 18],
        [18, 17],
        [17, 83],
        [76, 61],
        [61, 146],
        [146, 76],
        [160, 29],
        [29, 30],
        [30, 160],
        [56, 157],
        [157, 173],
        [173, 56],
        [106, 204],
        [204, 194],
        [194, 106],
        [135, 214],
        [214, 192],
        [192, 135],
        [203, 165],
        [165, 98],
        [98, 203],
        [21, 71],
        [71, 68],
        [68, 21],
        [51, 45],
        [45, 4],
        [4, 51],
        [144, 24],
        [24, 23],
        [23, 144],
        [77, 146],
        [146, 91],
        [91, 77],
        [205, 50],
        [50, 187],
        [187, 205],
        [201, 200],
        [200, 18],
        [18, 201],
        [91, 106],
        [106, 182],
        [182, 91],
        [90, 91],
        [91, 181],
        [181, 90],
        [85, 84],
        [84, 17],
        [17, 85],
        [206, 203],
        [203, 36],
        [36, 206],
        [148, 171],
        [171, 140],
        [140,
            148
        ],
        [92, 40],
        [40, 39],
        [39, 92],
        [193, 189],
        [189, 244],
        [244, 193],
        [159, 158],
        [158, 28],
        [28, 159],
        [247, 246],
        [246, 161],
        [161, 247],
        [236, 3],
        [3, 196],
        [196, 236],
        [54, 68],
        [68, 104],
        [104, 54],
        [193, 168],
        [168, 8],
        [8, 193],
        [117, 228],
        [228, 31],
        [31, 117],
        [189, 193],
        [193, 55],
        [55, 189],
        [98, 97],
        [97, 99],
        [99, 98],
        [126, 47],
        [47, 100],
        [100, 126],
        [166, 79],
        [79, 218],
        [218, 166],
        [155, 154],
        [154, 26],
        [26, 155],
        [209, 49],
        [49, 131],
        [131, 209],
        [135, 136],
        [136, 150],
        [150, 135],
        [47, 126],
        [126, 217],
        [217, 47],
        [223, 52],
        [52, 53],
        [53, 223],
        [45, 51],
        [51, 134],
        [134, 45],
        [211,
            170
        ],
        [170, 140],
        [140, 211],
        [67, 69],
        [69, 108],
        [108, 67],
        [43, 106],
        [106, 91],
        [91, 43],
        [230, 119],
        [119, 120],
        [120, 230],
        [226, 130],
        [130, 247],
        [247, 226],
        [63, 53],
        [53, 52],
        [52, 63],
        [238, 20],
        [20, 242],
        [242, 238],
        [46, 70],
        [70, 156],
        [156, 46],
        [78, 62],
        [62, 96],
        [96, 78],
        [46, 53],
        [53, 63],
        [63, 46],
        [143, 34],
        [34, 227],
        [227, 143],
        [123, 117],
        [117, 111],
        [111, 123],
        [44, 125],
        [125, 19],
        [19, 44],
        [236, 134],
        [134, 51],
        [51, 236],
        [216, 206],
        [206, 205],
        [205, 216],
        [154, 153],
        [153, 22],
        [22, 154],
        [39, 37],
        [37, 167],
        [167, 39],
        [200, 201],
        [201, 208],
        [208, 200],
        [36, 142],
        [142,
            100
        ],
        [100, 36],
        [57, 212],
        [212, 202],
        [202, 57],
        [20, 60],
        [60, 99],
        [99, 20],
        [28, 158],
        [158, 157],
        [157, 28],
        [35, 226],
        [226, 113],
        [113, 35],
        [160, 159],
        [159, 27],
        [27, 160],
        [204, 202],
        [202, 210],
        [210, 204],
        [113, 225],
        [225, 46],
        [46, 113],
        [43, 202],
        [202, 204],
        [204, 43],
        [62, 76],
        [76, 77],
        [77, 62],
        [137, 123],
        [123, 116],
        [116, 137],
        [41, 38],
        [38, 72],
        [72, 41],
        [203, 129],
        [129, 142],
        [142, 203],
        [64, 98],
        [98, 240],
        [240, 64],
        [49, 102],
        [102, 64],
        [64, 49],
        [41, 73],
        [73, 74],
        [74, 41],
        [212, 216],
        [216, 207],
        [207, 212],
        [42, 74],
        [74, 184],
        [184, 42],
        [169, 170],
        [170, 211],
        [211,
            169
        ],
        [170, 149],
        [149, 176],
        [176, 170],
        [105, 66],
        [66, 69],
        [69, 105],
        [122, 6],
        [6, 168],
        [168, 122],
        [123, 147],
        [147, 187],
        [187, 123],
        [96, 77],
        [77, 90],
        [90, 96],
        [65, 55],
        [55, 107],
        [107, 65],
        [89, 90],
        [90, 180],
        [180, 89],
        [101, 100],
        [100, 120],
        [120, 101],
        [63, 105],
        [105, 104],
        [104, 63],
        [93, 137],
        [137, 227],
        [227, 93],
        [15, 86],
        [86, 85],
        [85, 15],
        [129, 102],
        [102, 49],
        [49, 129],
        [14, 87],
        [87, 86],
        [86, 14],
        [55, 8],
        [8, 9],
        [9, 55],
        [100, 47],
        [47, 121],
        [121, 100],
        [145, 23],
        [23, 22],
        [22, 145],
        [88, 89],
        [89, 179],
        [179, 88],
        [6, 122],
        [122, 196],
        [196, 6],
        [88, 95],
        [95, 96],
        [96,
            88
        ],
        [138, 172],
        [172, 136],
        [136, 138],
        [215, 58],
        [58, 172],
        [172, 215],
        [115, 48],
        [48, 219],
        [219, 115],
        [42, 80],
        [80, 81],
        [81, 42],
        [195, 3],
        [3, 51],
        [51, 195],
        [43, 146],
        [146, 61],
        [61, 43],
        [171, 175],
        [175, 199],
        [199, 171],
        [81, 82],
        [82, 38],
        [38, 81],
        [53, 46],
        [46, 225],
        [225, 53],
        [144, 163],
        [163, 110],
        [110, 144],
        [52, 65],
        [65, 66],
        [66, 52],
        [229, 228],
        [228, 117],
        [117, 229],
        [34, 127],
        [127, 234],
        [234, 34],
        [107, 108],
        [108, 69],
        [69, 107],
        [109, 108],
        [108, 151],
        [151, 109],
        [48, 64],
        [64, 235],
        [235, 48],
        [62, 78],
        [78, 191],
        [191, 62],
        [129, 209],
        [209, 126],
        [126, 129],
        [111,
            35
        ],
        [35, 143],
        [143, 111],
        [117, 123],
        [123, 50],
        [50, 117],
        [222, 65],
        [65, 52],
        [52, 222],
        [19, 125],
        [125, 141],
        [141, 19],
        [221, 55],
        [55, 65],
        [65, 221],
        [3, 195],
        [195, 197],
        [197, 3],
        [25, 7],
        [7, 33],
        [33, 25],
        [220, 237],
        [237, 44],
        [44, 220],
        [70, 71],
        [71, 139],
        [139, 70],
        [122, 193],
        [193, 245],
        [245, 122],
        [247, 130],
        [130, 33],
        [33, 247],
        [71, 21],
        [21, 162],
        [162, 71],
        [170, 169],
        [169, 150],
        [150, 170],
        [188, 174],
        [174, 196],
        [196, 188],
        [216, 186],
        [186, 92],
        [92, 216],
        [2, 97],
        [97, 167],
        [167, 2],
        [141, 125],
        [125, 241],
        [241, 141],
        [164, 167],
        [167, 37],
        [37, 164],
        [72, 38],
        [38, 12],
        [12, 72],
        [38, 82],
        [82, 13],
        [13, 38],
        [63, 68],
        [68, 71],
        [71, 63],
        [226, 35],
        [35, 111],
        [111, 226],
        [101, 50],
        [50, 205],
        [205, 101],
        [206, 92],
        [92, 165],
        [165, 206],
        [209, 198],
        [198, 217],
        [217, 209],
        [165, 167],
        [167, 97],
        [97, 165],
        [220, 115],
        [115, 218],
        [218, 220],
        [133, 112],
        [112, 243],
        [243, 133],
        [239, 238],
        [238, 241],
        [241, 239],
        [214, 135],
        [135, 169],
        [169, 214],
        [190, 173],
        [173, 133],
        [133, 190],
        [171, 208],
        [208, 32],
        [32, 171],
        [125, 44],
        [44, 237],
        [237, 125],
        [86, 87],
        [87, 178],
        [178, 86],
        [85, 86],
        [86, 179],
        [179, 85],
        [84, 85],
        [85, 180],
        [180, 84],
        [83, 84],
        [84, 181],
        [181,
            83
        ],
        [201, 83],
        [83, 182],
        [182, 201],
        [137, 93],
        [93, 132],
        [132, 137],
        [76, 62],
        [62, 183],
        [183, 76],
        [61, 76],
        [76, 184],
        [184, 61],
        [57, 61],
        [61, 185],
        [185, 57],
        [212, 57],
        [57, 186],
        [186, 212],
        [214, 207],
        [207, 187],
        [187, 214],
        [34, 143],
        [143, 156],
        [156, 34],
        [79, 239],
        [239, 237],
        [237, 79],
        [123, 137],
        [137, 177],
        [177, 123],
        [44, 1],
        [1, 4],
        [4, 44],
        [201, 194],
        [194, 32],
        [32, 201],
        [64, 102],
        [102, 129],
        [129, 64],
        [213, 215],
        [215, 138],
        [138, 213],
        [59, 166],
        [166, 219],
        [219, 59],
        [242, 99],
        [99, 97],
        [97, 242],
        [2, 94],
        [94, 141],
        [141, 2],
        [75, 59],
        [59, 235],
        [235, 75],
        [24, 110],
        [110, 228],
        [228, 24],
        [25, 130],
        [130, 226],
        [226, 25],
        [23, 24],
        [24, 229],
        [229, 23],
        [22, 23],
        [23, 230],
        [230, 22],
        [26, 22],
        [22, 231],
        [231, 26],
        [112, 26],
        [26, 232],
        [232, 112],
        [189, 190],
        [190, 243],
        [243, 189],
        [221, 56],
        [56, 190],
        [190, 221],
        [28, 56],
        [56, 221],
        [221, 28],
        [27, 28],
        [28, 222],
        [222, 27],
        [29, 27],
        [27, 223],
        [223, 29],
        [30, 29],
        [29, 224],
        [224, 30],
        [247, 30],
        [30, 225],
        [225, 247],
        [238, 79],
        [79, 20],
        [20, 238],
        [166, 59],
        [59, 75],
        [75, 166],
        [60, 75],
        [75, 240],
        [240, 60],
        [147, 177],
        [177, 215],
        [215, 147],
        [20, 79],
        [79, 166],
        [166, 20],
        [187, 147],
        [147, 213],
        [213,
            187
        ],
        [112, 233],
        [233, 244],
        [244, 112],
        [233, 128],
        [128, 245],
        [245, 233],
        [128, 114],
        [114, 188],
        [188, 128],
        [114, 217],
        [217, 174],
        [174, 114],
        [131, 115],
        [115, 220],
        [220, 131],
        [217, 198],
        [198, 236],
        [236, 217],
        [198, 131],
        [131, 134],
        [134, 198],
        [177, 132],
        [132, 58],
        [58, 177],
        [143, 35],
        [35, 124],
        [124, 143],
        [110, 163],
        [163, 7],
        [7, 110],
        [228, 110],
        [110, 25],
        [25, 228],
        [356, 389],
        [389, 368],
        [368, 356],
        [11, 302],
        [302, 267],
        [267, 11],
        [452, 350],
        [350, 349],
        [349, 452],
        [302, 303],
        [303, 269],
        [269, 302],
        [357, 343],
        [343, 277],
        [277, 357],
        [452, 453],
        [453, 357],
        [357, 452],
        [333, 332],
        [332, 297],
        [297, 333],
        [175, 152],
        [152, 377],
        [377, 175],
        [347, 348],
        [348, 330],
        [330, 347],
        [303, 304],
        [304, 270],
        [270, 303],
        [9, 336],
        [336, 337],
        [337, 9],
        [278, 279],
        [279, 360],
        [360, 278],
        [418, 262],
        [262, 431],
        [431, 418],
        [304, 408],
        [408, 409],
        [409, 304],
        [310, 415],
        [415, 407],
        [407, 310],
        [270, 409],
        [409, 410],
        [410, 270],
        [450, 348],
        [348, 347],
        [347, 450],
        [422, 430],
        [430, 434],
        [434, 422],
        [313, 314],
        [314, 17],
        [17, 313],
        [306, 307],
        [307, 375],
        [375, 306],
        [387, 388],
        [388, 260],
        [260, 387],
        [286, 414],
        [414, 398],
        [398, 286],
        [335, 406],
        [406, 418],
        [418, 335],
        [364, 367],
        [367, 416],
        [416, 364],
        [423, 358],
        [358, 327],
        [327, 423],
        [251, 284],
        [284, 298],
        [298, 251],
        [281, 5],
        [5, 4],
        [4, 281],
        [373, 374],
        [374, 253],
        [253, 373],
        [307, 320],
        [320, 321],
        [321, 307],
        [425, 427],
        [427, 411],
        [411, 425],
        [421, 313],
        [313, 18],
        [18, 421],
        [321, 405],
        [405, 406],
        [406, 321],
        [320, 404],
        [404, 405],
        [405, 320],
        [315, 16],
        [16, 17],
        [17, 315],
        [426, 425],
        [425, 266],
        [266, 426],
        [377, 400],
        [400, 369],
        [369, 377],
        [322, 391],
        [391, 269],
        [269, 322],
        [417, 465],
        [465, 464],
        [464, 417],
        [386, 257],
        [257, 258],
        [258, 386],
        [466, 260],
        [260, 388],
        [388, 466],
        [456,
            399
        ],
        [399, 419],
        [419, 456],
        [284, 332],
        [332, 333],
        [333, 284],
        [417, 285],
        [285, 8],
        [8, 417],
        [346, 340],
        [340, 261],
        [261, 346],
        [413, 441],
        [441, 285],
        [285, 413],
        [327, 460],
        [460, 328],
        [328, 327],
        [355, 371],
        [371, 329],
        [329, 355],
        [392, 439],
        [439, 438],
        [438, 392],
        [382, 341],
        [341, 256],
        [256, 382],
        [429, 420],
        [420, 360],
        [360, 429],
        [364, 394],
        [394, 379],
        [379, 364],
        [277, 343],
        [343, 437],
        [437, 277],
        [443, 444],
        [444, 283],
        [283, 443],
        [275, 440],
        [440, 363],
        [363, 275],
        [431, 262],
        [262, 369],
        [369, 431],
        [297, 338],
        [338, 337],
        [337, 297],
        [273, 375],
        [375, 321],
        [321, 273],
        [450, 451],
        [451, 349],
        [349, 450],
        [446, 342],
        [342, 467],
        [467, 446],
        [293, 334],
        [334, 282],
        [282, 293],
        [458, 461],
        [461, 462],
        [462, 458],
        [276, 353],
        [353, 383],
        [383, 276],
        [308, 324],
        [324, 325],
        [325, 308],
        [276, 300],
        [300, 293],
        [293, 276],
        [372, 345],
        [345, 447],
        [447, 372],
        [352, 345],
        [345, 340],
        [340, 352],
        [274, 1],
        [1, 19],
        [19, 274],
        [456, 248],
        [248, 281],
        [281, 456],
        [436, 427],
        [427, 425],
        [425, 436],
        [381, 256],
        [256, 252],
        [252, 381],
        [269, 391],
        [391, 393],
        [393, 269],
        [200, 199],
        [199, 428],
        [428, 200],
        [266, 330],
        [330, 329],
        [329, 266],
        [287, 273],
        [273, 422],
        [422, 287],
        [250, 462],
        [462, 328],
        [328, 250],
        [258, 286],
        [286, 384],
        [384, 258],
        [265, 353],
        [353, 342],
        [342, 265],
        [387, 259],
        [259, 257],
        [257, 387],
        [424, 431],
        [431, 430],
        [430, 424],
        [342, 353],
        [353, 276],
        [276, 342],
        [273, 335],
        [335, 424],
        [424, 273],
        [292, 325],
        [325, 307],
        [307, 292],
        [366, 447],
        [447, 345],
        [345, 366],
        [271, 303],
        [303, 302],
        [302, 271],
        [423, 266],
        [266, 371],
        [371, 423],
        [294, 455],
        [455, 460],
        [460, 294],
        [279, 278],
        [278, 294],
        [294, 279],
        [271, 272],
        [272, 304],
        [304, 271],
        [432, 434],
        [434, 427],
        [427, 432],
        [272, 407],
        [407, 408],
        [408, 272],
        [394, 430],
        [430, 431],
        [431,
            394
        ],
        [395, 369],
        [369, 400],
        [400, 395],
        [334, 333],
        [333, 299],
        [299, 334],
        [351, 417],
        [417, 168],
        [168, 351],
        [352, 280],
        [280, 411],
        [411, 352],
        [325, 319],
        [319, 320],
        [320, 325],
        [295, 296],
        [296, 336],
        [336, 295],
        [319, 403],
        [403, 404],
        [404, 319],
        [330, 348],
        [348, 349],
        [349, 330],
        [293, 298],
        [298, 333],
        [333, 293],
        [323, 454],
        [454, 447],
        [447, 323],
        [15, 16],
        [16, 315],
        [315, 15],
        [358, 429],
        [429, 279],
        [279, 358],
        [14, 15],
        [15, 316],
        [316, 14],
        [285, 336],
        [336, 9],
        [9, 285],
        [329, 349],
        [349, 350],
        [350, 329],
        [374, 380],
        [380, 252],
        [252, 374],
        [318, 402],
        [402, 403],
        [403, 318],
        [6, 197],
        [197, 419],
        [419, 6],
        [318, 319],
        [319, 325],
        [325, 318],
        [367, 364],
        [364, 365],
        [365, 367],
        [435, 367],
        [367, 397],
        [397, 435],
        [344, 438],
        [438, 439],
        [439, 344],
        [272, 271],
        [271, 311],
        [311, 272],
        [195, 5],
        [5, 281],
        [281, 195],
        [273, 287],
        [287, 291],
        [291, 273],
        [396, 428],
        [428, 199],
        [199, 396],
        [311, 271],
        [271, 268],
        [268, 311],
        [283, 444],
        [444, 445],
        [445, 283],
        [373, 254],
        [254, 339],
        [339, 373],
        [282, 334],
        [334, 296],
        [296, 282],
        [449, 347],
        [347, 346],
        [346, 449],
        [264, 447],
        [447, 454],
        [454, 264],
        [336, 296],
        [296, 299],
        [299, 336],
        [338, 10],
        [10, 151],
        [151, 338],
        [278,
            439
        ],
        [439, 455],
        [455, 278],
        [292, 407],
        [407, 415],
        [415, 292],
        [358, 371],
        [371, 355],
        [355, 358],
        [340, 345],
        [345, 372],
        [372, 340],
        [346, 347],
        [347, 280],
        [280, 346],
        [442, 443],
        [443, 282],
        [282, 442],
        [19, 94],
        [94, 370],
        [370, 19],
        [441, 442],
        [442, 295],
        [295, 441],
        [248, 419],
        [419, 197],
        [197, 248],
        [263, 255],
        [255, 359],
        [359, 263],
        [440, 275],
        [275, 274],
        [274, 440],
        [300, 383],
        [383, 368],
        [368, 300],
        [351, 412],
        [412, 465],
        [465, 351],
        [263, 467],
        [467, 466],
        [466, 263],
        [301, 368],
        [368, 389],
        [389, 301],
        [395, 378],
        [378, 379],
        [379, 395],
        [412, 351],
        [351, 419],
        [419, 412],
        [436, 426],
        [426, 322],
        [322, 436],
        [2, 164],
        [164, 393],
        [393, 2],
        [370, 462],
        [462, 461],
        [461, 370],
        [164, 0],
        [0, 267],
        [267, 164],
        [302, 11],
        [11, 12],
        [12, 302],
        [268, 12],
        [12, 13],
        [13, 268],
        [293, 300],
        [300, 301],
        [301, 293],
        [446, 261],
        [261, 340],
        [340, 446],
        [330, 266],
        [266, 425],
        [425, 330],
        [426, 423],
        [423, 391],
        [391, 426],
        [429, 355],
        [355, 437],
        [437, 429],
        [391, 327],
        [327, 326],
        [326, 391],
        [440, 457],
        [457, 438],
        [438, 440],
        [341, 382],
        [382, 362],
        [362, 341],
        [459, 457],
        [457, 461],
        [461, 459],
        [434, 430],
        [430, 394],
        [394, 434],
        [414, 463],
        [463, 362],
        [362, 414],
        [396, 369],
        [369, 262],
        [262, 396],
        [354, 461],
        [461, 457],
        [457, 354],
        [316, 403],
        [403, 402],
        [402, 316],
        [315, 404],
        [404, 403],
        [403, 315],
        [314, 405],
        [405, 404],
        [404, 314],
        [313, 406],
        [406, 405],
        [405, 313],
        [421, 418],
        [418, 406],
        [406, 421],
        [366, 401],
        [401, 361],
        [361, 366],
        [306, 408],
        [408, 407],
        [407, 306],
        [291, 409],
        [409, 408],
        [408, 291],
        [287, 410],
        [410, 409],
        [409, 287],
        [432, 436],
        [436, 410],
        [410, 432],
        [434, 416],
        [416, 411],
        [411, 434],
        [264, 368],
        [368, 383],
        [383, 264],
        [309, 438],
        [438, 457],
        [457, 309],
        [352, 376],
        [376, 401],
        [401, 352],
        [274, 275],
        [275, 4],
        [4, 274],
        [421,
            428
        ],
        [428, 262],
        [262, 421],
        [294, 327],
        [327, 358],
        [358, 294],
        [433, 416],
        [416, 367],
        [367, 433],
        [289, 455],
        [455, 439],
        [439, 289],
        [462, 370],
        [370, 326],
        [326, 462],
        [2, 326],
        [326, 370],
        [370, 2],
        [305, 460],
        [460, 455],
        [455, 305],
        [254, 449],
        [449, 448],
        [448, 254],
        [255, 261],
        [261, 446],
        [446, 255],
        [253, 450],
        [450, 449],
        [449, 253],
        [252, 451],
        [451, 450],
        [450, 252],
        [256, 452],
        [452, 451],
        [451, 256],
        [341, 453],
        [453, 452],
        [452, 341],
        [413, 464],
        [464, 463],
        [463, 413],
        [441, 413],
        [413, 414],
        [414, 441],
        [258, 442],
        [442, 441],
        [441, 258],
        [257, 443],
        [443, 442],
        [442, 257],
        [259, 444],
        [444, 443],
        [443, 259],
        [260, 445],
        [445, 444],
        [444, 260],
        [467, 342],
        [342, 445],
        [445, 467],
        [459, 458],
        [458, 250],
        [250, 459],
        [289, 392],
        [392, 290],
        [290, 289],
        [290, 328],
        [328, 460],
        [460, 290],
        [376, 433],
        [433, 435],
        [435, 376],
        [250, 290],
        [290, 392],
        [392, 250],
        [411, 416],
        [416, 433],
        [433, 411],
        [341, 463],
        [463, 464],
        [464, 341],
        [453, 464],
        [464, 465],
        [465, 453],
        [357, 465],
        [465, 412],
        [412, 357],
        [343, 412],
        [412, 399],
        [399, 343],
        [360, 363],
        [363, 440],
        [440, 360],
        [437, 399],
        [399, 456],
        [456, 437],
        [420, 456],
        [456, 363],
        [363, 420],
        [401, 435],
        [435, 288],
        [288,
            401
        ],
        [372, 383],
        [383, 353],
        [353, 372],
        [339, 255],
        [255, 249],
        [249, 339],
        [448, 261],
        [261, 255],
        [255, 448],
        [133, 243],
        [243, 190],
        [190, 133],
        [133, 155],
        [155, 112],
        [112, 133],
        [33, 246],
        [246, 247],
        [247, 33],
        [33, 130],
        [130, 25],
        [25, 33],
        [398, 384],
        [384, 286],
        [286, 398],
        [362, 398],
        [398, 414],
        [414, 362],
        [362, 463],
        [463, 341],
        [341, 362],
        [263, 359],
        [359, 467],
        [467, 263],
        [263, 249],
        [249, 255],
        [255, 263],
        [466, 467],
        [467, 260],
        [260, 466],
        [75, 60],
        [60, 166],
        [166, 75],
        [238, 239],
        [239, 79],
        [79, 238],
        [162, 127],
        [127, 139],
        [139, 162],
        [72, 11],
        [11, 37],
        [37, 72],
        [121,
            232
        ],
        [232, 120],
        [120, 121],
        [73, 72],
        [72, 39],
        [39, 73],
        [114, 128],
        [128, 47],
        [47, 114],
        [233, 232],
        [232, 128],
        [128, 233],
        [103, 104],
        [104, 67],
        [67, 103],
        [152, 175],
        [175, 148],
        [148, 152],
        [119, 118],
        [118, 101],
        [101, 119],
        [74, 73],
        [73, 40],
        [40, 74],
        [107, 9],
        [9, 108],
        [108, 107],
        [49, 48],
        [48, 131],
        [131, 49],
        [32, 194],
        [194, 211],
        [211, 32],
        [184, 74],
        [74, 185],
        [185, 184],
        [191, 80],
        [80, 183],
        [183, 191],
        [185, 40],
        [40, 186],
        [186, 185],
        [119, 230],
        [230, 118],
        [118, 119],
        [210, 202],
        [202, 214],
        [214, 210],
        [84, 83],
        [83, 17],
        [17, 84],
        [77, 76],
        [76, 146],
        [146, 77],
        [161, 160],
        [160, 30],
        [30, 161],
        [190, 56],
        [56, 173],
        [173, 190],
        [182, 106],
        [106, 194],
        [194, 182],
        [138, 135],
        [135, 192],
        [192, 138],
        [129, 203],
        [203, 98],
        [98, 129],
        [54, 21],
        [21, 68],
        [68, 54],
        [5, 51],
        [51, 4],
        [4, 5],
        [145, 144],
        [144, 23],
        [23, 145],
        [90, 77],
        [77, 91],
        [91, 90],
        [207, 205],
        [205, 187],
        [187, 207],
        [83, 201],
        [201, 18],
        [18, 83],
        [181, 91],
        [91, 182],
        [182, 181],
        [180, 90],
        [90, 181],
        [181, 180],
        [16, 85],
        [85, 17],
        [17, 16],
        [205, 206],
        [206, 36],
        [36, 205],
        [176, 148],
        [148, 140],
        [140, 176],
        [165, 92],
        [92, 39],
        [39, 165],
        [245, 193],
        [193, 244],
        [244, 245],
        [27, 159],
        [159, 28],
        [28,
            27
        ],
        [30, 247],
        [247, 161],
        [161, 30],
        [174, 236],
        [236, 196],
        [196, 174],
        [103, 54],
        [54, 104],
        [104, 103],
        [55, 193],
        [193, 8],
        [8, 55],
        [111, 117],
        [117, 31],
        [31, 111],
        [221, 189],
        [189, 55],
        [55, 221],
        [240, 98],
        [98, 99],
        [99, 240],
        [142, 126],
        [126, 100],
        [100, 142],
        [219, 166],
        [166, 218],
        [218, 219],
        [112, 155],
        [155, 26],
        [26, 112],
        [198, 209],
        [209, 131],
        [131, 198],
        [169, 135],
        [135, 150],
        [150, 169],
        [114, 47],
        [47, 217],
        [217, 114],
        [224, 223],
        [223, 53],
        [53, 224],
        [220, 45],
        [45, 134],
        [134, 220],
        [32, 211],
        [211, 140],
        [140, 32],
        [109, 67],
        [67, 108],
        [108, 109],
        [146, 43],
        [43, 91],
        [91, 146],
        [231, 230],
        [230, 120],
        [120, 231],
        [113, 226],
        [226, 247],
        [247, 113],
        [105, 63],
        [63, 52],
        [52, 105],
        [241, 238],
        [238, 242],
        [242, 241],
        [124, 46],
        [46, 156],
        [156, 124],
        [95, 78],
        [78, 96],
        [96, 95],
        [70, 46],
        [46, 63],
        [63, 70],
        [116, 143],
        [143, 227],
        [227, 116],
        [116, 123],
        [123, 111],
        [111, 116],
        [1, 44],
        [44, 19],
        [19, 1],
        [3, 236],
        [236, 51],
        [51, 3],
        [207, 216],
        [216, 205],
        [205, 207],
        [26, 154],
        [154, 22],
        [22, 26],
        [165, 39],
        [39, 167],
        [167, 165],
        [199, 200],
        [200, 208],
        [208, 199],
        [101, 36],
        [36, 100],
        [100, 101],
        [43, 57],
        [57, 202],
        [202, 43],
        [242, 20],
        [20, 99],
        [99, 242],
        [56, 28],
        [28, 157],
        [157, 56],
        [124, 35],
        [35, 113],
        [113, 124],
        [29, 160],
        [160, 27],
        [27, 29],
        [211, 204],
        [204, 210],
        [210, 211],
        [124, 113],
        [113, 46],
        [46, 124],
        [106, 43],
        [43, 204],
        [204, 106],
        [96, 62],
        [62, 77],
        [77, 96],
        [227, 137],
        [137, 116],
        [116, 227],
        [73, 41],
        [41, 72],
        [72, 73],
        [36, 203],
        [203, 142],
        [142, 36],
        [235, 64],
        [64, 240],
        [240, 235],
        [48, 49],
        [49, 64],
        [64, 48],
        [42, 41],
        [41, 74],
        [74, 42],
        [214, 212],
        [212, 207],
        [207, 214],
        [183, 42],
        [42, 184],
        [184, 183],
        [210, 169],
        [169, 211],
        [211, 210],
        [140, 170],
        [170, 176],
        [176, 140],
        [104, 105],
        [105, 69],
        [69, 104],
        [193, 122],
        [122, 168],
        [168, 193],
        [50, 123],
        [123, 187],
        [187, 50],
        [89, 96],
        [96, 90],
        [90, 89],
        [66, 65],
        [65, 107],
        [107, 66],
        [179, 89],
        [89, 180],
        [180, 179],
        [119, 101],
        [101, 120],
        [120, 119],
        [68, 63],
        [63, 104],
        [104, 68],
        [234, 93],
        [93, 227],
        [227, 234],
        [16, 15],
        [15, 85],
        [85, 16],
        [209, 129],
        [129, 49],
        [49, 209],
        [15, 14],
        [14, 86],
        [86, 15],
        [107, 55],
        [55, 9],
        [9, 107],
        [120, 100],
        [100, 121],
        [121, 120],
        [153, 145],
        [145, 22],
        [22, 153],
        [178, 88],
        [88, 179],
        [179, 178],
        [197, 6],
        [6, 196],
        [196, 197],
        [89, 88],
        [88, 96],
        [96, 89],
        [135, 138],
        [138, 136],
        [136, 135],
        [138, 215],
        [215, 172],
        [172,
            138
        ],
        [218, 115],
        [115, 219],
        [219, 218],
        [41, 42],
        [42, 81],
        [81, 41],
        [5, 195],
        [195, 51],
        [51, 5],
        [57, 43],
        [43, 61],
        [61, 57],
        [208, 171],
        [171, 199],
        [199, 208],
        [41, 81],
        [81, 38],
        [38, 41],
        [224, 53],
        [53, 225],
        [225, 224],
        [24, 144],
        [144, 110],
        [110, 24],
        [105, 52],
        [52, 66],
        [66, 105],
        [118, 229],
        [229, 117],
        [117, 118],
        [227, 34],
        [34, 234],
        [234, 227],
        [66, 107],
        [107, 69],
        [69, 66],
        [10, 109],
        [109, 151],
        [151, 10],
        [219, 48],
        [48, 235],
        [235, 219],
        [183, 62],
        [62, 191],
        [191, 183],
        [142, 129],
        [129, 126],
        [126, 142],
        [116, 111],
        [111, 143],
        [143, 116],
        [118, 117],
        [117, 50],
        [50, 118],
        [223,
            222
        ],
        [222, 52],
        [52, 223],
        [94, 19],
        [19, 141],
        [141, 94],
        [222, 221],
        [221, 65],
        [65, 222],
        [196, 3],
        [3, 197],
        [197, 196],
        [45, 220],
        [220, 44],
        [44, 45],
        [156, 70],
        [70, 139],
        [139, 156],
        [188, 122],
        [122, 245],
        [245, 188],
        [139, 71],
        [71, 162],
        [162, 139],
        [149, 170],
        [170, 150],
        [150, 149],
        [122, 188],
        [188, 196],
        [196, 122],
        [206, 216],
        [216, 92],
        [92, 206],
        [164, 2],
        [2, 167],
        [167, 164],
        [242, 141],
        [141, 241],
        [241, 242],
        [0, 164],
        [164, 37],
        [37, 0],
        [11, 72],
        [72, 12],
        [12, 11],
        [12, 38],
        [38, 13],
        [13, 12],
        [70, 63],
        [63, 71],
        [71, 70],
        [31, 226],
        [226, 111],
        [111, 31],
        [36, 101],
        [101, 205],
        [205, 36],
        [203, 206],
        [206, 165],
        [165, 203],
        [126, 209],
        [209, 217],
        [217, 126],
        [98, 165],
        [165, 97],
        [97, 98],
        [237, 220],
        [220, 218],
        [218, 237],
        [237, 239],
        [239, 241],
        [241, 237],
        [210, 214],
        [214, 169],
        [169, 210],
        [140, 171],
        [171, 32],
        [32, 140],
        [241, 125],
        [125, 237],
        [237, 241],
        [179, 86],
        [86, 178],
        [178, 179],
        [180, 85],
        [85, 179],
        [179, 180],
        [181, 84],
        [84, 180],
        [180, 181],
        [182, 83],
        [83, 181],
        [181, 182],
        [194, 201],
        [201, 182],
        [182, 194],
        [177, 137],
        [137, 132],
        [132, 177],
        [184, 76],
        [76, 183],
        [183, 184],
        [185, 61],
        [61, 184],
        [184, 185],
        [186, 57],
        [57, 185],
        [185, 186],
        [216,
            212
        ],
        [212, 186],
        [186, 216],
        [192, 214],
        [214, 187],
        [187, 192],
        [139, 34],
        [34, 156],
        [156, 139],
        [218, 79],
        [79, 237],
        [237, 218],
        [147, 123],
        [123, 177],
        [177, 147],
        [45, 44],
        [44, 4],
        [4, 45],
        [208, 201],
        [201, 32],
        [32, 208],
        [98, 64],
        [64, 129],
        [129, 98],
        [192, 213],
        [213, 138],
        [138, 192],
        [235, 59],
        [59, 219],
        [219, 235],
        [141, 242],
        [242, 97],
        [97, 141],
        [97, 2],
        [2, 141],
        [141, 97],
        [240, 75],
        [75, 235],
        [235, 240],
        [229, 24],
        [24, 228],
        [228, 229],
        [31, 25],
        [25, 226],
        [226, 31],
        [230, 23],
        [23, 229],
        [229, 230],
        [231, 22],
        [22, 230],
        [230, 231],
        [232, 26],
        [26, 231],
        [231, 232],
        [233, 112],
        [112, 232],
        [232, 233],
        [244, 189],
        [189, 243],
        [243, 244],
        [189, 221],
        [221, 190],
        [190, 189],
        [222, 28],
        [28, 221],
        [221, 222],
        [223, 27],
        [27, 222],
        [222, 223],
        [224, 29],
        [29, 223],
        [223, 224],
        [225, 30],
        [30, 224],
        [224, 225],
        [113, 247],
        [247, 225],
        [225, 113],
        [99, 60],
        [60, 240],
        [240, 99],
        [213, 147],
        [147, 215],
        [215, 213],
        [60, 20],
        [20, 166],
        [166, 60],
        [192, 187],
        [187, 213],
        [213, 192],
        [243, 112],
        [112, 244],
        [244, 243],
        [244, 233],
        [233, 245],
        [245, 244],
        [245, 128],
        [128, 188],
        [188, 245],
        [188, 114],
        [114, 174],
        [174, 188],
        [134, 131],
        [131, 220],
        [220, 134],
        [174, 217],
        [217, 236],
        [236, 174],
        [236, 198],
        [198, 134],
        [134, 236],
        [215, 177],
        [177, 58],
        [58, 215],
        [156, 143],
        [143, 124],
        [124, 156],
        [25, 110],
        [110, 7],
        [7, 25],
        [31, 228],
        [228, 25],
        [25, 31],
        [264, 356],
        [356, 368],
        [368, 264],
        [0, 11],
        [11, 267],
        [267, 0],
        [451, 452],
        [452, 349],
        [349, 451],
        [267, 302],
        [302, 269],
        [269, 267],
        [350, 357],
        [357, 277],
        [277, 350],
        [350, 452],
        [452, 357],
        [357, 350],
        [299, 333],
        [333, 297],
        [297, 299],
        [396, 175],
        [175, 377],
        [377, 396],
        [280, 347],
        [347, 330],
        [330, 280],
        [269, 303],
        [303, 270],
        [270, 269],
        [151, 9],
        [9, 337],
        [337, 151],
        [344, 278],
        [278, 360],
        [360, 344],
        [424,
            418
        ],
        [418, 431],
        [431, 424],
        [270, 304],
        [304, 409],
        [409, 270],
        [272, 310],
        [310, 407],
        [407, 272],
        [322, 270],
        [270, 410],
        [410, 322],
        [449, 450],
        [450, 347],
        [347, 449],
        [432, 422],
        [422, 434],
        [434, 432],
        [18, 313],
        [313, 17],
        [17, 18],
        [291, 306],
        [306, 375],
        [375, 291],
        [259, 387],
        [387, 260],
        [260, 259],
        [424, 335],
        [335, 418],
        [418, 424],
        [434, 364],
        [364, 416],
        [416, 434],
        [391, 423],
        [423, 327],
        [327, 391],
        [301, 251],
        [251, 298],
        [298, 301],
        [275, 281],
        [281, 4],
        [4, 275],
        [254, 373],
        [373, 253],
        [253, 254],
        [375, 307],
        [307, 321],
        [321, 375],
        [280, 425],
        [425, 411],
        [411, 280],
        [200,
            421
        ],
        [421, 18],
        [18, 200],
        [335, 321],
        [321, 406],
        [406, 335],
        [321, 320],
        [320, 405],
        [405, 321],
        [314, 315],
        [315, 17],
        [17, 314],
        [423, 426],
        [426, 266],
        [266, 423],
        [396, 377],
        [377, 369],
        [369, 396],
        [270, 322],
        [322, 269],
        [269, 270],
        [413, 417],
        [417, 464],
        [464, 413],
        [385, 386],
        [386, 258],
        [258, 385],
        [248, 456],
        [456, 419],
        [419, 248],
        [298, 284],
        [284, 333],
        [333, 298],
        [168, 417],
        [417, 8],
        [8, 168],
        [448, 346],
        [346, 261],
        [261, 448],
        [417, 413],
        [413, 285],
        [285, 417],
        [326, 327],
        [327, 328],
        [328, 326],
        [277, 355],
        [355, 329],
        [329, 277],
        [309, 392],
        [392, 438],
        [438, 309],
        [381,
            382
        ],
        [382, 256],
        [256, 381],
        [279, 429],
        [429, 360],
        [360, 279],
        [365, 364],
        [364, 379],
        [379, 365],
        [355, 277],
        [277, 437],
        [437, 355],
        [282, 443],
        [443, 283],
        [283, 282],
        [281, 275],
        [275, 363],
        [363, 281],
        [395, 431],
        [431, 369],
        [369, 395],
        [299, 297],
        [297, 337],
        [337, 299],
        [335, 273],
        [273, 321],
        [321, 335],
        [348, 450],
        [450, 349],
        [349, 348],
        [359, 446],
        [446, 467],
        [467, 359],
        [283, 293],
        [293, 282],
        [282, 283],
        [250, 458],
        [458, 462],
        [462, 250],
        [300, 276],
        [276, 383],
        [383, 300],
        [292, 308],
        [308, 325],
        [325, 292],
        [283, 276],
        [276, 293],
        [293, 283],
        [264, 372],
        [372, 447],
        [447, 264],
        [346, 352],
        [352, 340],
        [340, 346],
        [354, 274],
        [274, 19],
        [19, 354],
        [363, 456],
        [456, 281],
        [281, 363],
        [426, 436],
        [436, 425],
        [425, 426],
        [380, 381],
        [381, 252],
        [252, 380],
        [267, 269],
        [269, 393],
        [393, 267],
        [421, 200],
        [200, 428],
        [428, 421],
        [371, 266],
        [266, 329],
        [329, 371],
        [432, 287],
        [287, 422],
        [422, 432],
        [290, 250],
        [250, 328],
        [328, 290],
        [385, 258],
        [258, 384],
        [384, 385],
        [446, 265],
        [265, 342],
        [342, 446],
        [386, 387],
        [387, 257],
        [257, 386],
        [422, 424],
        [424, 430],
        [430, 422],
        [445, 342],
        [342, 276],
        [276, 445],
        [422, 273],
        [273, 424],
        [424, 422],
        [306, 292],
        [292, 307],
        [307,
            306
        ],
        [352, 366],
        [366, 345],
        [345, 352],
        [268, 271],
        [271, 302],
        [302, 268],
        [358, 423],
        [423, 371],
        [371, 358],
        [327, 294],
        [294, 460],
        [460, 327],
        [331, 279],
        [279, 294],
        [294, 331],
        [303, 271],
        [271, 304],
        [304, 303],
        [436, 432],
        [432, 427],
        [427, 436],
        [304, 272],
        [272, 408],
        [408, 304],
        [395, 394],
        [394, 431],
        [431, 395],
        [378, 395],
        [395, 400],
        [400, 378],
        [296, 334],
        [334, 299],
        [299, 296],
        [6, 351],
        [351, 168],
        [168, 6],
        [376, 352],
        [352, 411],
        [411, 376],
        [307, 325],
        [325, 320],
        [320, 307],
        [285, 295],
        [295, 336],
        [336, 285],
        [320, 319],
        [319, 404],
        [404, 320],
        [329, 330],
        [330, 349],
        [349, 329],
        [334, 293],
        [293, 333],
        [333, 334],
        [366, 323],
        [323, 447],
        [447, 366],
        [316, 15],
        [15, 315],
        [315, 316],
        [331, 358],
        [358, 279],
        [279, 331],
        [317, 14],
        [14, 316],
        [316, 317],
        [8, 285],
        [285, 9],
        [9, 8],
        [277, 329],
        [329, 350],
        [350, 277],
        [253, 374],
        [374, 252],
        [252, 253],
        [319, 318],
        [318, 403],
        [403, 319],
        [351, 6],
        [6, 419],
        [419, 351],
        [324, 318],
        [318, 325],
        [325, 324],
        [397, 367],
        [367, 365],
        [365, 397],
        [288, 435],
        [435, 397],
        [397, 288],
        [278, 344],
        [344, 439],
        [439, 278],
        [310, 272],
        [272, 311],
        [311, 310],
        [248, 195],
        [195, 281],
        [281, 248],
        [375, 273],
        [273, 291],
        [291, 375],
        [175, 396],
        [396, 199],
        [199, 175],
        [312, 311],
        [311, 268],
        [268, 312],
        [276, 283],
        [283, 445],
        [445, 276],
        [390, 373],
        [373, 339],
        [339, 390],
        [295, 282],
        [282, 296],
        [296, 295],
        [448, 449],
        [449, 346],
        [346, 448],
        [356, 264],
        [264, 454],
        [454, 356],
        [337, 336],
        [336, 299],
        [299, 337],
        [337, 338],
        [338, 151],
        [151, 337],
        [294, 278],
        [278, 455],
        [455, 294],
        [308, 292],
        [292, 415],
        [415, 308],
        [429, 358],
        [358, 355],
        [355, 429],
        [265, 340],
        [340, 372],
        [372, 265],
        [352, 346],
        [346, 280],
        [280, 352],
        [295, 442],
        [442, 282],
        [282, 295],
        [354, 19],
        [19, 370],
        [370, 354],
        [285, 441],
        [441, 295],
        [295,
            285
        ],
        [195, 248],
        [248, 197],
        [197, 195],
        [457, 440],
        [440, 274],
        [274, 457],
        [301, 300],
        [300, 368],
        [368, 301],
        [417, 351],
        [351, 465],
        [465, 417],
        [251, 301],
        [301, 389],
        [389, 251],
        [394, 395],
        [395, 379],
        [379, 394],
        [399, 412],
        [412, 419],
        [419, 399],
        [410, 436],
        [436, 322],
        [322, 410],
        [326, 2],
        [2, 393],
        [393, 326],
        [354, 370],
        [370, 461],
        [461, 354],
        [393, 164],
        [164, 267],
        [267, 393],
        [268, 302],
        [302, 12],
        [12, 268],
        [312, 268],
        [268, 13],
        [13, 312],
        [298, 293],
        [293, 301],
        [301, 298],
        [265, 446],
        [446, 340],
        [340, 265],
        [280, 330],
        [330, 425],
        [425, 280],
        [322, 426],
        [426, 391],
        [391,
            322
        ],
        [420, 429],
        [429, 437],
        [437, 420],
        [393, 391],
        [391, 326],
        [326, 393],
        [344, 440],
        [440, 438],
        [438, 344],
        [458, 459],
        [459, 461],
        [461, 458],
        [364, 434],
        [434, 394],
        [394, 364],
        [428, 396],
        [396, 262],
        [262, 428],
        [274, 354],
        [354, 457],
        [457, 274],
        [317, 316],
        [316, 402],
        [402, 317],
        [316, 315],
        [315, 403],
        [403, 316],
        [315, 314],
        [314, 404],
        [404, 315],
        [314, 313],
        [313, 405],
        [405, 314],
        [313, 421],
        [421, 406],
        [406, 313],
        [323, 366],
        [366, 361],
        [361, 323],
        [292, 306],
        [306, 407],
        [407, 292],
        [306, 291],
        [291, 408],
        [408, 306],
        [291, 287],
        [287, 409],
        [409, 291],
        [287, 432],
        [432, 410],
        [410, 287],
        [427, 434],
        [434, 411],
        [411, 427],
        [372, 264],
        [264, 383],
        [383, 372],
        [459, 309],
        [309, 457],
        [457, 459],
        [366, 352],
        [352, 401],
        [401, 366],
        [1, 274],
        [274, 4],
        [4, 1],
        [418, 421],
        [421, 262],
        [262, 418],
        [331, 294],
        [294, 358],
        [358, 331],
        [435, 433],
        [433, 367],
        [367, 435],
        [392, 289],
        [289, 439],
        [439, 392],
        [328, 462],
        [462, 326],
        [326, 328],
        [94, 2],
        [2, 370],
        [370, 94],
        [289, 305],
        [305, 455],
        [455, 289],
        [339, 254],
        [254, 448],
        [448, 339],
        [359, 255],
        [255, 446],
        [446, 359],
        [254, 253],
        [253, 449],
        [449, 254],
        [253, 252],
        [252, 450],
        [450, 253],
        [252, 256],
        [256, 451],
        [451,
            252
        ],
        [256, 341],
        [341, 452],
        [452, 256],
        [414, 413],
        [413, 463],
        [463, 414],
        [286, 441],
        [441, 414],
        [414, 286],
        [286, 258],
        [258, 441],
        [441, 286],
        [258, 257],
        [257, 442],
        [442, 258],
        [257, 259],
        [259, 443],
        [443, 257],
        [259, 260],
        [260, 444],
        [444, 259],
        [260, 467],
        [467, 445],
        [445, 260],
        [309, 459],
        [459, 250],
        [250, 309],
        [305, 289],
        [289, 290],
        [290, 305],
        [305, 290],
        [290, 460],
        [460, 305],
        [401, 376],
        [376, 435],
        [435, 401],
        [309, 250],
        [250, 392],
        [392, 309],
        [376, 411],
        [411, 433],
        [433, 376],
        [453, 341],
        [341, 464],
        [464, 453],
        [357, 453],
        [453, 465],
        [465, 357],
        [343, 357],
        [357, 412],
        [412, 343],
        [437, 343],
        [343, 399],
        [399, 437],
        [344, 360],
        [360, 440],
        [440, 344],
        [420, 437],
        [437, 456],
        [456, 420],
        [360, 420],
        [420, 363],
        [363, 360],
        [361, 401],
        [401, 288],
        [288, 361],
        [265, 372],
        [372, 353],
        [353, 265],
        [390, 339],
        [339, 249],
        [249, 390],
        [339, 448],
        [448, 255],
        [255, 339]
    ]);
}).call(this);