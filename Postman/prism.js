/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+j+java+javadoc+javadoclike+javastacktrace+jolie+jq+jsdoc+js-extras+js-templates+json+jsonp+json5+python&plugins=autolinker+toolbar+copy-to-clipboard+download-button */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof _
              ? new _(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a,
              n,
              l = C.util.type(e);
            switch (((r = r || {}), l)) {
              case "Object":
                if (((n = C.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = C.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
        },
        languages: {
          extend: function (e, n) {
            var t = C.util.clone(C.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || C.languages)[t],
              l = {};
            for (var i in a)
              if (a.hasOwnProperty(i)) {
                if (i == e)
                  for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o]);
                n.hasOwnProperty(i) || (l[i] = a[i]);
              }
            var s = r[t];
            return (
              (r[t] = l),
              C.languages.DFS(C.languages, function (e, n) {
                n === s && e != t && (this[e] = l);
              }),
              l
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var l = C.util.objId;
            for (var i in n)
              if (n.hasOwnProperty(i)) {
                t.call(n, i, n[i], r || i);
                var o = n[i],
                  s = C.util.type(o);
                "Object" !== s || a[l(o)]
                  ? "Array" !== s || a[l(o)] || ((a[l(o)] = !0), e(o, t, i, a))
                  : ((a[l(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          C.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          C.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            C.hooks.run("before-all-elements-highlight", r);
          for (var a, l = 0; (a = r.elements[l++]); )
            C.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = C.util.getLanguage(e),
            a = C.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var l = e.parentNode;
          l &&
            "pre" === l.nodeName.toLowerCase() &&
            (l.className =
              l.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var i = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (i.highlightedCode = e),
              C.hooks.run("before-insert", i),
              (i.element.innerHTML = i.highlightedCode),
              C.hooks.run("after-highlight", i),
              C.hooks.run("complete", i),
              t && t.call(i.element);
          }
          if ((C.hooks.run("before-sanity-check", i), !i.code))
            return C.hooks.run("complete", i), void (t && t.call(i.element));
          if ((C.hooks.run("before-highlight", i), i.grammar))
            if (n && u.Worker) {
              var s = new Worker(C.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: i.language,
                    code: i.code,
                    immediateClose: !0,
                  })
                );
            } else o(C.highlight(i.code, i.grammar, i.language));
          else o(C.util.encode(i.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            C.hooks.run("before-tokenize", r),
            (r.tokens = C.tokenize(r.code, r.grammar)),
            C.hooks.run("after-tokenize", r),
            _.stringify(C.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new l();
          return (
            M(a, a.head, e),
            (function e(n, t, r, a, l, i, o) {
              for (var s in r)
                if (r.hasOwnProperty(s) && r[s]) {
                  var u = r[s];
                  u = Array.isArray(u) ? u : [u];
                  for (var c = 0; c < u.length; ++c) {
                    if (o && o == s + "," + c) return;
                    var g = u[c],
                      f = g.inside,
                      h = !!g.lookbehind,
                      d = !!g.greedy,
                      v = 0,
                      p = g.alias;
                    if (d && !g.pattern.global) {
                      var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                      g.pattern = RegExp(g.pattern.source, m + "g");
                    }
                    g = g.pattern || g;
                    for (
                      var y = a.next, k = l;
                      y !== t.tail;
                      k += y.value.length, y = y.next
                    ) {
                      var b = y.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof _)) {
                        var x = 1;
                        if (d && y != t.tail.prev) {
                          g.lastIndex = k;
                          var w = g.exec(n);
                          if (!w) break;
                          var A = w.index + (h && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k;
                          for (S += y.value.length; S <= A; )
                            (y = y.next), (S += y.value.length);
                          if (
                            ((S -= y.value.length),
                            (k = S),
                            y.value instanceof _)
                          )
                            continue;
                          for (
                            var O = y;
                            O !== t.tail &&
                            (S < P ||
                              ("string" == typeof O.value &&
                                !O.prev.value.greedy));
                            O = O.next
                          )
                            x++, (S += O.value.length);
                          x--, (b = n.slice(k, S)), (w.index -= k);
                        } else {
                          g.lastIndex = 0;
                          var w = g.exec(b);
                        }
                        if (w) {
                          h && (v = w[1] ? w[1].length : 0);
                          var A = w.index + v,
                            w = w[0].slice(v),
                            P = A + w.length,
                            E = b.slice(0, A),
                            N = b.slice(P),
                            j = y.prev;
                          E && ((j = M(t, j, E)), (k += E.length)), W(t, j, x);
                          var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d);
                          if (
                            ((y = M(t, j, L)),
                            N && M(t, y, N),
                            1 < x && e(n, t, r, y.prev, k, !0, s + "," + c),
                            i)
                          )
                            break;
                        } else if (i) break;
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = C.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = C.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: _,
      };
    function _(e, n, t, r, a) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length),
        (this.greedy = !!a);
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function M(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function W(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = C),
      (_.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          l = e.alias;
        l &&
          (Array.isArray(l)
            ? Array.prototype.push.apply(a.classes, l)
            : a.classes.push(l)),
          C.hooks.run("wrap", a);
        var i = "";
        for (var o in a.attributes)
          i +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          i +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (C.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(C.highlight(r, C.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        C
      );
    var e = C.util.currentScript();
    function t() {
      C.manual || C.highlightAll();
    }
    if (
      (e &&
        ((C.filename = e.src),
        e.hasAttribute("data-manual") && (C.manual = !0)),
      !C.manual)
    ) {
      var r = document.readyState;
      "loading" === r || ("interactive" === r && e && e.defer)
        ? document.addEventListener("DOMContentLoaded", t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16);
    }
    return C;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var n = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      n["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var t = {};
      (t[a] = {
        pattern: RegExp(
          "(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        Prism.languages.insertBefore("markup", "cdata", t);
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
      },
    },
    url: {
      pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
      greedy: !0,
      inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t &&
    (t.tag.addInlined("style", "css"),
    s.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: s.languages.css },
          },
          alias: "language-css",
        },
      },
      t.tag
    ));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
  (Prism.languages.javascript[
    "class-name"
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined("script", "javascript"),
  (Prism.languages.js = Prism.languages.javascript);
Prism.languages.j = {
  comment: /\bNB\..*/,
  string: { pattern: /'(?:''|[^'\r\n])*'/, greedy: !0 },
  keyword: /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
  verb: {
    pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
    alias: "keyword",
  },
  number: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_(?!\.))/,
  adverb: { pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/, alias: "builtin" },
  operator: /[=a][.:]|_\./,
  conjunction: {
    pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
    alias: "variable",
  },
  punctuation: /[()]/,
};
!(function (e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    a = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
  (e.languages.java = e.languages.extend("clike", {
    "class-name": [a, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
    keyword: t,
    function: [
      e.languages.clike.function,
      { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 },
    ],
    number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0,
    },
  })),
    e.languages.insertBefore("java", "string", {
      "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: "string",
      },
    }),
    e.languages.insertBefore("java", "class-name", {
      annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0,
      },
      namespace: {
        pattern: RegExp(
          "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      generics: {
        pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
        inside: {
          "class-name": a,
          keyword: t,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/,
        },
      },
    });
})(Prism);
!(function (p) {
  var a = (p.languages.javadoclike = {
    parameter: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: !0,
    },
    punctuation: /[{}]/,
  });
  Object.defineProperty(a, "addSupport", {
    value: function (a, e) {
      "string" == typeof a && (a = [a]),
        a.forEach(function (a) {
          !(function (a, e) {
            var n = "doc-comment",
              t = p.languages[a];
            if (t) {
              var r = t[n];
              if (!r) {
                var o = {
                  "doc-comment": {
                    pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                    lookbehind: !0,
                    alias: "comment",
                  },
                };
                r = (t = p.languages.insertBefore(a, "comment", o))[n];
              }
              if (
                (r instanceof RegExp && (r = t[n] = { pattern: r }),
                Array.isArray(r))
              )
                for (var i = 0, s = r.length; i < s; i++)
                  r[i] instanceof RegExp && (r[i] = { pattern: r[i] }), e(r[i]);
              else e(r);
            }
          })(a, function (a) {
            a.inside || (a.inside = {}), (a.inside.rest = e);
          });
        });
    },
  }),
    a.addSupport(["java", "javascript", "php"], a);
})(Prism);
!(function (a) {
  var e = {
    code: {
      pattern: /(^(?:\s*(?:\*\s*)*)).*[^*\s].+$/m,
      lookbehind: !0,
      inside: a.languages.java,
      alias: "language-java",
    },
  };
  (a.languages.javadoc = a.languages.extend("javadoclike", {})),
    a.languages.insertBefore("javadoc", "keyword", {
      "class-name": [
        {
          pattern: /(@(?:exception|throws|see|link|linkplain|value)\s+(?:[a-z\d]+\.)*)[A-Z](?:\w*[a-z]\w*)?(?:\.[A-Z](?:\w*[a-z]\w*)?)*/,
          lookbehind: !0,
          inside: { punctuation: /\./ },
        },
        {
          pattern: /(@param\s+)<[A-Z]\w*>/,
          lookbehind: !0,
          inside: { punctuation: /[.<>]/ },
        },
      ],
      namespace: {
        pattern: /(@(?:exception|throws|see|link|linkplain)\s+)(?:[a-z\d]+\.)+/,
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      "code-section": [
        {
          pattern: /(\{@code\s+)(?:[^{}]|\{[^{}]*\})+?(?=\s*\})/,
          lookbehind: !0,
          inside: e,
        },
        {
          pattern: /(<(code|tt)>\s*)[\s\S]+?(?=\s*<\/\2>)/,
          lookbehind: !0,
          inside: e,
        },
      ],
      tag: a.languages.markup.tag,
    }),
    a.languages.javadoclike.addSupport("java", a.languages.javadoc);
})(Prism);
Prism.languages.javastacktrace = {
  summary: {
    pattern: /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?:\:.*)?$/m,
    inside: {
      keyword: {
        pattern: /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m,
        lookbehind: !0,
      },
      string: { pattern: /^(\s*)"[^"]*"/, lookbehind: !0 },
      exceptions: {
        pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
        lookbehind: !0,
        inside: {
          "class-name": /[\w$]+(?=$|:)/,
          namespace: /[a-z]\w*/,
          punctuation: /[.:]/,
        },
      },
      message: { pattern: /(:\s*)\S.*/, lookbehind: !0, alias: "string" },
      punctuation: /[:]/,
    },
  },
  "stack-frame": {
    pattern: /^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m,
    inside: {
      keyword: { pattern: /^(\s*)at/, lookbehind: !0 },
      source: [
        {
          pattern: /(\()\w+.\w+:\d+(?=\))/,
          lookbehind: !0,
          inside: {
            file: /^\w+\.\w+/,
            punctuation: /:/,
            "line-number": { pattern: /\d+/, alias: "number" },
          },
        },
        {
          pattern: /(\()[^()]*(?=\))/,
          lookbehind: !0,
          inside: { keyword: /^(?:Unknown Source|Native Method)$/ },
        },
      ],
      "class-name": /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
      function: /(?:<init>|[\w$]+)(?=\()/,
      namespace: /[a-z]\w*/,
      punctuation: /[.()]/,
    },
  },
  more: {
    pattern: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
    inside: {
      punctuation: /\.{3}/,
      number: /\d+/,
      keyword: /\b[a-z]+(?: [a-z]+)*\b/,
    },
  },
};
(Prism.languages.jolie = Prism.languages.extend("clike", {
  keyword: /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/,
  builtin: /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
  number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?l?/i,
  operator: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/,
  symbol: /[|;@]/,
  punctuation: /[,.]/,
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
})),
  delete Prism.languages.jolie["class-name"],
  Prism.languages.insertBefore("jolie", "keyword", {
    function: {
      pattern: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/,
      lookbehind: !0,
    },
    aggregates: {
      pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
      lookbehind: !0,
      inside: {
        "with-extension": {
          pattern: /\bwith\s+\w+/,
          inside: { keyword: /\bwith\b/ },
        },
        function: { pattern: /\w+/ },
        punctuation: { pattern: /,/ },
      },
    },
    redirects: {
      pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
      lookbehind: !0,
      inside: {
        punctuation: { pattern: /,/ },
        function: { pattern: /\w+/ },
        symbol: { pattern: /=>/ },
      },
    },
  });
!(function (e) {
  var n = "\\\\\\((?:[^()]|\\([^()]*\\))*\\)",
    t = RegExp(
      '"(?:[^"\r\n\\\\]|\\\\[^\r\n(]|__)*"'.replace(/__/g, function () {
        return n;
      })
    ),
    i = {
      interpolation: {
        pattern: RegExp("((?:^|[^\\\\])(?:\\\\{2})*)" + n),
        lookbehind: !0,
        inside: {
          content: {
            pattern: /^(\\\()[\s\S]+(?=\)$)/,
            lookbehind: !0,
            inside: null,
          },
          punctuation: /^\\\(|\)$/,
        },
      },
    },
    a = (e.languages.jq = {
      comment: /#.*/,
      property: {
        pattern: RegExp(t.source + "(?=\\s*:(?!:))"),
        greedy: !0,
        inside: i,
      },
      string: { pattern: t, greedy: !0, inside: i },
      function: { pattern: /(\bdef\s+)[a-z_]\w+/i, lookbehind: !0 },
      variable: /\B\$\w+/,
      "property-literal": {
        pattern: /[a-z_]\w*(?=\s*:(?!:))/i,
        alias: "property",
      },
      keyword: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
      boolean: /\b(?:true|false)\b/,
      number: /(?:\b\d+\.|\B\.)?\d+(?:[eE][+-]?\d+)?\b/,
      operator: [
        { pattern: /\|=?/, alias: "pipe" },
        /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|or|not)\b/,
      ],
      "c-style-function": {
        pattern: /\b[a-z_]\w*(?=\s*\()/i,
        alias: "function",
      },
      punctuation: /::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/,
      dot: { pattern: /\./, alias: "important" },
    });
  i.interpolation.inside.content.inside = a;
})(Prism);
!(function (a) {
  var e = a.languages.javascript,
    n = "{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}",
    s = "(@(?:param|arg|argument|property)\\s+(?:" + n + "\\s+)?)";
  (a.languages.jsdoc = a.languages.extend("javadoclike", {
    parameter: {
      pattern: RegExp(s + "[$\\w\\xA0-\\uFFFF.]+(?=\\s|$)"),
      lookbehind: !0,
      inside: { punctuation: /\./ },
    },
  })),
    a.languages.insertBefore("jsdoc", "keyword", {
      "optional-parameter": {
        pattern: RegExp(
          s + "\\[[$\\w\\xA0-\\uFFFF.]+(?:=[^[\\]]+)?\\](?=\\s|$)"
        ),
        lookbehind: !0,
        inside: {
          parameter: {
            pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
            lookbehind: !0,
            inside: { punctuation: /\./ },
          },
          code: {
            pattern: /(=)[\s\S]*(?=\]$)/,
            lookbehind: !0,
            inside: e,
            alias: "language-javascript",
          },
          punctuation: /[=[\]]/,
        },
      },
      "class-name": [
        {
          pattern: RegExp("(@[a-z]+\\s+)" + n),
          lookbehind: !0,
          inside: { punctuation: /[.,:?=<>|{}()[\]]/ },
        },
        {
          pattern: /(@(?:augments|extends|class|interface|memberof!?|this)\s+)[A-Z]\w*(?:\.[A-Z]\w*)*/,
          lookbehind: !0,
          inside: { punctuation: /\./ },
        },
      ],
      example: {
        pattern: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
        lookbehind: !0,
        inside: {
          code: {
            pattern: /^(\s*(?:\*\s*)?).+$/m,
            lookbehind: !0,
            inside: e,
            alias: "language-javascript",
          },
        },
      },
    }),
    a.languages.javadoclike.addSupport("javascript", a.languages.jsdoc);
})(Prism);
!(function (a) {
  a.languages.insertBefore("javascript", "function-variable", {
    "method-variable": {
      pattern: RegExp(
        "(\\.\\s*)" + a.languages.javascript["function-variable"].pattern.source
      ),
      lookbehind: !0,
      alias: ["function-variable", "method", "function", "property-access"],
    },
  }),
    a.languages.insertBefore("javascript", "function", {
      method: {
        pattern: RegExp("(\\.\\s*)" + a.languages.javascript.function.source),
        lookbehind: !0,
        alias: ["function", "property-access"],
      },
    }),
    a.languages.insertBefore("javascript", "constant", {
      "known-class-name": [
        {
          pattern: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
          alias: "class-name",
        },
        { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" },
      ],
    }),
    a.languages.javascript.keyword.unshift(
      { pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" },
      { pattern: /\bnull\b/, alias: ["null", "nil"] },
      { pattern: /\bundefined\b/, alias: "nil" }
    ),
    a.languages.insertBefore("javascript", "operator", {
      spread: { pattern: /\.{3}/, alias: "operator" },
      arrow: { pattern: /=>/, alias: "operator" },
    }),
    a.languages.insertBefore("javascript", "punctuation", {
      "property-access": {
        pattern: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
        lookbehind: !0,
      },
      "maybe-class-name": {
        pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
        lookbehind: !0,
      },
      dom: {
        pattern: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
        alias: "variable",
      },
      console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" },
    });
  for (
    var e = [
        "function",
        "function-variable",
        "method",
        "method-variable",
        "property-access",
      ],
      t = 0;
    t < e.length;
    t++
  ) {
    var n = e[t],
      r = a.languages.javascript[n];
    "RegExp" === a.util.type(r) &&
      (r = a.languages.javascript[n] = { pattern: r });
    var s = r.inside || {};
    (r.inside = s)["maybe-class-name"] = /^[A-Z][\s\S]*/;
  }
})(Prism);
!(function (u) {
  var e = u.languages.javascript["template-string"],
    n = e.pattern.source,
    a = e.inside.interpolation,
    i = a.inside["interpolation-punctuation"],
    r = a.pattern.source;
  function t(e, t) {
    if (u.languages[e])
      return {
        pattern: RegExp("((?:" + t + ")\\s*)" + n),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          "embedded-code": { pattern: /[\s\S]+/, alias: e },
        },
      };
  }
  function o(e, t, n) {
    var r = { code: e, grammar: t, language: n };
    return (
      u.hooks.run("before-tokenize", r),
      (r.tokens = u.tokenize(r.code, r.grammar)),
      u.hooks.run("after-tokenize", r),
      r.tokens
    );
  }
  function d(e) {
    var t = {};
    t["interpolation-punctuation"] = i;
    var n = u.tokenize(e, t);
    if (3 === n.length) {
      var r = [1, 1];
      r.push.apply(r, o(n[1], u.languages.javascript, "javascript")),
        n.splice.apply(n, r);
    }
    return new u.Token("interpolation", n, a.alias, e);
  }
  function c(a, e, i) {
    var t = u.tokenize(a, {
        interpolation: { pattern: RegExp(r), lookbehind: !0 },
      }),
      f = 0,
      y = {},
      n = o(
        t
          .map(function (e) {
            if ("string" == typeof e) return e;
            for (
              var t, n = e.content;
              -1 !==
              a.indexOf(
                ((r = f++), (t = "___" + i.toUpperCase() + "_" + r + "___"))
              );

            );
            return (y[t] = n), t;
            var r;
          })
          .join(""),
        e,
        i
      ),
      v = Object.keys(y);
    return (
      (f = 0),
      (function e(t) {
        for (var n = 0; n < t.length; n++) {
          if (f >= v.length) return;
          var r = t[n];
          if ("string" == typeof r || "string" == typeof r.content) {
            var a = v[f],
              i = "string" == typeof r ? r : r.content,
              o = i.indexOf(a);
            if (-1 !== o) {
              ++f;
              var s = i.substring(0, o),
                p = d(y[a]),
                l = i.substring(o + a.length),
                g = [];
              if ((s && g.push(s), g.push(p), l)) {
                var u = [l];
                e(u), g.push.apply(g, u);
              }
              "string" == typeof r
                ? (t.splice.apply(t, [n, 1].concat(g)), (n += g.length - 1))
                : (r.content = g);
            }
          } else {
            var c = r.content;
            Array.isArray(c) ? e(c) : e([c]);
          }
        }
      })(n),
      new u.Token(i, n, "language-" + i, a)
    );
  }
  u.languages.javascript["template-string"] = [
    t(
      "css",
      "\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)"
    ),
    t("html", "\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),
    t("svg", "\\bsvg"),
    t("markdown", "\\b(?:md|markdown)"),
    t("graphql", "\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"),
    e,
  ].filter(Boolean);
  var s = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 };
  function f(e) {
    return "string" == typeof e
      ? e
      : Array.isArray(e)
      ? e.map(f).join("")
      : f(e.content);
  }
  u.hooks.add("after-tokenize", function (e) {
    e.language in s &&
      !(function e(t) {
        for (var n = 0, r = t.length; n < r; n++) {
          var a = t[n];
          if ("string" != typeof a) {
            var i = a.content;
            if (Array.isArray(i))
              if ("template-string" === a.type) {
                var o = i[1];
                if (
                  3 === i.length &&
                  "string" != typeof o &&
                  "embedded-code" === o.type
                ) {
                  var s = f(o),
                    p = o.alias,
                    l = Array.isArray(p) ? p[0] : p,
                    g = u.languages[l];
                  if (!g) continue;
                  i[1] = c(s, g, l);
                }
              } else e(i);
            else "string" != typeof i && e([i]);
          }
        }
      })(e.tokens);
  });
})(Prism);
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
};
(Prism.languages.jsonp = Prism.languages.extend("json", {
  punctuation: /[{}[\]();,.]/,
})),
  Prism.languages.insertBefore("jsonp", "punctuation", {
    function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/,
  });
!(function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  n.languages.json5 = n.languages.extend("json", {
    property: [
      { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
      {
        pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/,
        alias: "unquoted",
      },
    ],
    string: { pattern: e, greedy: !0 },
    number: /[+-]?(?:NaN|Infinity|0x[a-fA-F\d]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/,
  });
})(Prism);
(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "string-interpolation": {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
          },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string",
  },
  string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python[
    "string-interpolation"
  ].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python);
!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var t = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
      r = /\b\S+@[\w.]+[a-z]{2}/,
      a = /\[([^\]]+)]\(([^)]+)\)/,
      l = ["comment", "url", "attr-value", "string"];
    (Prism.plugins.autolinker = {
      processGrammar: function (i) {
        i &&
          !i["url-link"] &&
          (Prism.languages.DFS(i, function (i, n, e) {
            -1 < l.indexOf(e) &&
              !Array.isArray(n) &&
              (n.pattern || (n = this[i] = { pattern: n }),
              (n.inside = n.inside || {}),
              "comment" == e && (n.inside["md-link"] = a),
              "attr-value" == e
                ? Prism.languages.insertBefore(
                    "inside",
                    "punctuation",
                    { "url-link": t },
                    n
                  )
                : (n.inside["url-link"] = t),
              (n.inside["email-link"] = r));
          }),
          (i["url-link"] = t),
          (i["email-link"] = r));
      },
    }),
      Prism.hooks.add("before-highlight", function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar);
      }),
      Prism.hooks.add("wrap", function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a";
          var n = i.content;
          if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
            n = "mailto:" + n;
          else if ("md-link" == i.type) {
            var e = i.content.match(a);
            (n = e[2]), (i.content = e[1]);
          }
          i.attributes.href = n;
          try {
            i.content = decodeURIComponent(i.content);
          } catch (i) {}
        }
      });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var i = [],
      l = {},
      c = function () {};
    Prism.plugins.toolbar = {};
    var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
        var t;
        (t =
          "function" == typeof n
            ? n
            : function (e) {
                var t;
                return (
                  "function" == typeof n.onClick
                    ? (((t = document.createElement("button")).type = "button"),
                      t.addEventListener("click", function () {
                        n.onClick.call(this, e);
                      }))
                    : "string" == typeof n.url
                    ? ((t = document.createElement("a")).href = n.url)
                    : (t = document.createElement("span")),
                  n.className && t.classList.add(n.className),
                  (t.textContent = n.text),
                  t
                );
              }),
          e in l
            ? console.warn(
                'There is a button with the key "' + e + '" registered already.'
              )
            : i.push((l[e] = t));
      }),
      t = (Prism.plugins.toolbar.hook = function (a) {
        var e = a.element.parentNode;
        if (
          e &&
          /pre/i.test(e.nodeName) &&
          !e.parentNode.classList.contains("code-toolbar")
        ) {
          var t = document.createElement("div");
          t.classList.add("code-toolbar"),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e);
          var r = document.createElement("div");
          r.classList.add("toolbar");
          var n = i,
            o = (function (e) {
              for (; e; ) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t)
                  return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement;
              }
            })(a.element);
          o &&
            (n = o.map(function (e) {
              return l[e] || c;
            })),
            n.forEach(function (e) {
              var t = e(a);
              if (t) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(t),
                  r.appendChild(n);
              }
            }),
            t.appendChild(r);
        }
      });
    e("label", function (e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n,
          a,
          r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r);
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute("data-url")
                ? ((n = document.createElement("a")).href = t.getAttribute(
                    "data-url"
                  ))
                : (n = document.createElement("span")),
              (n.textContent = r)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", t);
  }
})();
// !(function () {
//   if ("undefined" != typeof self && self.Prism && self.document)
//     if (Prism.plugins.toolbar) {
//       var r = window.ClipboardJS || void 0;
//       r || "function" != typeof require || (r = require("clipboard"));
//       var i = [];
//       if (!r) {
//         var o = document.createElement("script"),
//           e = document.querySelector("head");
//         (o.onload = function () {
//           if ((r = window.ClipboardJS)) for (; i.length; ) i.pop()();
//         }),
//           (o.src =
//             "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"),
//           e.appendChild(o);
//       }
//       Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (e) {
//         var t = document.createElement("button");
//         return (t.textContent = "Copy"), r ? o() : i.push(o), t;
//         function o() {
//           var o = new r(t, {
//             text: function () {
//               return e.code;
//             },
//           });
//           o.on("success", function () {
//             (t.textContent = "Copied!"), n();
//           }),
//             o.on("error", function () {
//               (t.textContent = "Press Ctrl+C to copy"), n();
//             });
//         }
//         function n() {
//           setTimeout(function () {
//             t.textContent = "Copy";
//           }, 5e3);
//         }
//       });
//     } else
//       console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");
// })();
// "undefined" != typeof self &&
//   self.Prism &&
//   self.document &&
//   document.querySelector &&
//   Prism.plugins.toolbar.registerButton("download-file", function (t) {
//     var e = t.element.parentNode;
//     if (
//       e &&
//       /pre/i.test(e.nodeName) &&
//       e.hasAttribute("data-src") &&
//       e.hasAttribute("data-download-link")
//     ) {
//       var a = e.getAttribute("data-src"),
//         n = document.createElement("a");
//       return (
//         (n.textContent =
//           e.getAttribute("data-download-link-label") || "Download"),
//         n.setAttribute("download", ""),
//         (n.href = a),
//         n
//       );
//     }
//   });
