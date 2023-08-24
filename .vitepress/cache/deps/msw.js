import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/headers-polyfill@3.1.2/node_modules/headers-polyfill/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/headers-polyfill@3.1.2/node_modules/headers-polyfill/lib/index.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      Headers: () => HeadersPolyfill,
      flattenHeadersList: () => flattenHeadersList,
      flattenHeadersObject: () => flattenHeadersObject,
      headersToList: () => headersToList,
      headersToObject: () => headersToObject,
      headersToString: () => headersToString,
      listToHeaders: () => listToHeaders,
      objectToHeaders: () => objectToHeaders,
      reduceHeadersObject: () => reduceHeadersObject,
      stringToHeaders: () => stringToHeaders
    });
    module.exports = __toCommonJS2(src_exports);
    var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
    function normalizeHeaderName(name) {
      if (typeof name !== "string") {
        name = String(name);
      }
      if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
        throw new TypeError("Invalid character in header field name");
      }
      return name.toLowerCase();
    }
    function normalizeHeaderValue(value) {
      if (typeof value !== "string") {
        value = String(value);
      }
      return value;
    }
    var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
    var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
    var _a;
    var _b;
    var HeadersPolyfill = class {
      constructor(init) {
        this[_a] = {};
        this[_b] = /* @__PURE__ */ new Map();
        if (["Headers", "HeadersPolyfill"].includes(init == null ? void 0 : init.constructor.name) || init instanceof HeadersPolyfill) {
          const initialHeaders = init;
          initialHeaders.forEach((value, name) => {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(init)) {
          init.forEach(([name, value]) => {
            this.append(name, Array.isArray(value) ? value.join(", ") : value);
          });
        } else if (init) {
          Object.getOwnPropertyNames(init).forEach((name) => {
            const value = init[name];
            this.append(name, Array.isArray(value) ? value.join(", ") : value);
          });
        }
      }
      [(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, Symbol.iterator)]() {
        return this.entries();
      }
      *keys() {
        for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
          yield name;
        }
      }
      *values() {
        for (const value of Object.values(this[NORMALIZED_HEADERS])) {
          yield value;
        }
      }
      *entries() {
        for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
          yield [name, this.get(name)];
        }
      }
      get(name) {
        return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] || null;
      }
      set(name, value) {
        const normalizedName = normalizeHeaderName(name);
        this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(value);
        this[RAW_HEADER_NAMES].set(normalizedName, name);
      }
      append(name, value) {
        const normalizedName = normalizeHeaderName(name);
        let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;
        this.set(name, resolvedValue);
      }
      delete(name) {
        if (!this.has(name)) {
          return;
        }
        const normalizedName = normalizeHeaderName(name);
        delete this[NORMALIZED_HEADERS][normalizedName];
        this[RAW_HEADER_NAMES].delete(normalizedName);
      }
      all() {
        return this[NORMALIZED_HEADERS];
      }
      raw() {
        const rawHeaders = {};
        for (const [name, value] of this.entries()) {
          rawHeaders[this[RAW_HEADER_NAMES].get(name)] = value;
        }
        return rawHeaders;
      }
      has(name) {
        return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
      }
      forEach(callback, thisArg) {
        for (const name in this[NORMALIZED_HEADERS]) {
          if (this[NORMALIZED_HEADERS].hasOwnProperty(name)) {
            callback.call(thisArg, this[NORMALIZED_HEADERS][name], name, this);
          }
        }
      }
    };
    function headersToList(headers) {
      const headersList = [];
      headers.forEach((value, name) => {
        const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
        headersList.push([name, resolvedValue]);
      });
      return headersList;
    }
    function headersToString(headers) {
      const list = headersToList(headers);
      const lines = list.map(([name, value]) => {
        const values = [].concat(value);
        return `${name}: ${values.join(", ")}`;
      });
      return lines.join("\r\n");
    }
    var singleValueHeaders = ["user-agent"];
    function headersToObject(headers) {
      const headersObject = {};
      headers.forEach((value, name) => {
        const isMultiValue = !singleValueHeaders.includes(name.toLowerCase()) && value.includes(",");
        headersObject[name] = isMultiValue ? value.split(",").map((s) => s.trim()) : value;
      });
      return headersObject;
    }
    function stringToHeaders(str) {
      const lines = str.trim().split(/[\r\n]+/);
      return lines.reduce((headers, line) => {
        if (line.trim() === "") {
          return headers;
        }
        const parts = line.split(": ");
        const name = parts.shift();
        const value = parts.join(": ");
        headers.append(name, value);
        return headers;
      }, new HeadersPolyfill());
    }
    function listToHeaders(list) {
      const headers = new HeadersPolyfill();
      list.forEach(([name, value]) => {
        const values = [].concat(value);
        values.forEach((value2) => {
          headers.append(name, value2);
        });
      });
      return headers;
    }
    function reduceHeadersObject(headers, reducer, initialState) {
      return Object.keys(headers).reduce((nextHeaders, name) => {
        return reducer(nextHeaders, name, headers[name]);
      }, initialState);
    }
    function objectToHeaders(headersObject) {
      return reduceHeadersObject(
        headersObject,
        (headers, name, value) => {
          const values = [].concat(value).filter(Boolean);
          values.forEach((value2) => {
            headers.append(name, value2);
          });
          return headers;
        },
        new HeadersPolyfill()
      );
    }
    function flattenHeadersList(list) {
      return list.map(([name, values]) => {
        return [name, [].concat(values).join(", ")];
      });
    }
    function flattenHeadersObject(headersObject) {
      return reduceHeadersObject(
        headersObject,
        (headers, name, value) => {
          headers[name] = [].concat(value).join(", ");
          return headers;
        },
        {}
      );
    }
  }
});

// node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(";");
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf("=");
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/.pnpm/is-node-process@1.2.0/node_modules/is-node-process/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/is-node-process@1.2.0/node_modules/is-node-process/lib/index.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      isNodeProcess: () => isNodeProcess
    });
    module.exports = __toCommonJS2(src_exports);
    function isNodeProcess() {
      if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        return true;
      }
      if (typeof process !== "undefined") {
        const type = process.type;
        if (type === "renderer" || type === "worker") {
          return false;
        }
        return !!(process.versions && process.versions.node);
      }
      return false;
    }
  }
});

// node_modules/.pnpm/node-fetch@2.6.12/node_modules/node-fetch/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/node-fetch@2.6.12/node_modules/node-fetch/browser.js"(exports, module) {
    "use strict";
    var getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    var globalObject = getGlobal();
    module.exports = exports = globalObject.fetch;
    if (globalObject.fetch) {
      exports.default = globalObject.fetch.bind(globalObject);
    }
    exports.Headers = globalObject.Headers;
    exports.Request = globalObject.Request;
    exports.Response = globalObject.Response;
  }
});

// node_modules/.pnpm/outvariant@1.4.0/node_modules/outvariant/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/outvariant@1.4.0/node_modules/outvariant/lib/index.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      InvariantError: () => InvariantError,
      format: () => format,
      invariant: () => invariant2
    });
    module.exports = __toCommonJS2(src_exports);
    var POSITIONALS_EXP = /(%?)(%([sdjo]))/g;
    function serializePositional(positional, flag) {
      switch (flag) {
        case "s":
          return positional;
        case "d":
        case "i":
          return Number(positional);
        case "j":
          return JSON.stringify(positional);
        case "o": {
          if (typeof positional === "string") {
            return positional;
          }
          const json = JSON.stringify(positional);
          if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
            return positional;
          }
          return json;
        }
      }
    }
    function format(message, ...positionals) {
      if (positionals.length === 0) {
        return message;
      }
      let positionalIndex = 0;
      let formattedMessage = message.replace(
        POSITIONALS_EXP,
        (match2, isEscaped, _, flag) => {
          const positional = positionals[positionalIndex];
          const value = serializePositional(positional, flag);
          if (!isEscaped) {
            positionalIndex++;
            return value;
          }
          return match2;
        }
      );
      if (positionalIndex < positionals.length) {
        formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
      }
      formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
      return formattedMessage;
    }
    var STACK_FRAMES_TO_IGNORE = 2;
    function cleanErrorStack(error) {
      if (!error.stack) {
        return;
      }
      const nextStack = error.stack.split("\n");
      nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
      error.stack = nextStack.join("\n");
    }
    var InvariantError = class extends Error {
      constructor(message, ...positionals) {
        super(message);
        this.message = message;
        this.name = "Invariant Violation";
        this.message = format(message, ...positionals);
        cleanErrorStack(this);
      }
    };
    var invariant2 = (predicate, message, ...positionals) => {
      if (!predicate) {
        throw new InvariantError(message, ...positionals);
      }
    };
    invariant2.as = (ErrorConstructor, predicate, message, ...positionals) => {
      if (!predicate) {
        const isConstructor = ErrorConstructor.prototype.name != null;
        const error = isConstructor ? new ErrorConstructor(format(message, positionals)) : ErrorConstructor(format(message, positionals));
        throw error;
      }
    };
  }
});

// node_modules/.pnpm/@open-draft+until@1.0.3/node_modules/@open-draft/until/lib/until.js
var require_until = __commonJS({
  "node_modules/.pnpm/@open-draft+until@1.0.3/node_modules/@open-draft/until/lib/until.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.until = async (promise) => {
      try {
        const data = await promise().catch((error) => {
          throw error;
        });
        return [null, data];
      } catch (error) {
        return [error, null];
      }
    };
  }
});

// node_modules/.pnpm/@open-draft+until@1.0.3/node_modules/@open-draft/until/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/@open-draft+until@1.0.3/node_modules/@open-draft/until/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var until_1 = require_until();
    exports.until = until_1.until;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/glossary.js
var require_glossary = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/glossary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IS_PATCHED_MODULE = void 0;
    exports.IS_PATCHED_MODULE = Symbol("isPatchedModule");
  }
});

// node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse3(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse3(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.4_supports-color@8.1.1/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.4_supports-color@8.1.1/node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
            if (match2 === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match2 = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match2;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.4_supports-color@8.1.1/node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/.pnpm/debug@4.3.4_supports-color@8.1.1/node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match2) => {
        if (match2 === "%%") {
          return;
        }
        index++;
        if (match2 === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/events@3.3.0/node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/.pnpm/events@3.3.0/node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags2) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags2);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags2) {
      if (typeof emitter.on === "function") {
        if (flags2.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags2.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/.pnpm/strict-event-emitter@0.2.8/node_modules/strict-event-emitter/lib/StrictEventEmitter.js
var require_StrictEventEmitter = __commonJS({
  "node_modules/.pnpm/strict-event-emitter@0.2.8/node_modules/strict-event-emitter/lib/StrictEventEmitter.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    exports.__esModule = true;
    exports.StrictEventEmitter = void 0;
    var events_1 = require_events();
    var StrictEventEmitter = (
      /** @class */
      function(_super) {
        __extends(StrictEventEmitter2, _super);
        function StrictEventEmitter2() {
          return _super.call(this) || this;
        }
        StrictEventEmitter2.prototype.on = function(event, listener) {
          return _super.prototype.on.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.once = function(event, listener) {
          return _super.prototype.once.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.off = function(event, listener) {
          return _super.prototype.off.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.emit = function(event) {
          var data = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
          }
          return _super.prototype.emit.apply(this, __spreadArrays([event.toString()], data));
        };
        StrictEventEmitter2.prototype.addListener = function(event, listener) {
          return _super.prototype.addListener.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.prependListener = function(event, listener) {
          return _super.prototype.prependListener.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.prependOnceListener = function(event, listener) {
          return _super.prototype.prependOnceListener.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.removeListener = function(event, listener) {
          return _super.prototype.removeListener.call(this, event.toString(), listener);
        };
        StrictEventEmitter2.prototype.removeAllListeners = function(event) {
          if (event) {
            return _super.prototype.removeAllListeners.call(this, event.toString());
          }
          return _super.prototype.removeAllListeners.call(this);
        };
        StrictEventEmitter2.prototype.eventNames = function() {
          return _super.prototype.eventNames.call(this);
        };
        StrictEventEmitter2.prototype.listeners = function(event) {
          return _super.prototype.listeners.call(this, event.toString());
        };
        StrictEventEmitter2.prototype.rawListeners = function(event) {
          return _super.prototype.rawListeners.call(this, event.toString());
        };
        StrictEventEmitter2.prototype.listenerCount = function(event) {
          return _super.prototype.listenerCount.call(this, event.toString());
        };
        return StrictEventEmitter2;
      }(events_1.EventEmitter)
    );
    exports.StrictEventEmitter = StrictEventEmitter;
  }
});

// node_modules/.pnpm/strict-event-emitter@0.2.8/node_modules/strict-event-emitter/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/.pnpm/strict-event-emitter@0.2.8/node_modules/strict-event-emitter/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    exports.__esModule = true;
    __exportStar(require_StrictEventEmitter(), exports);
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/nextTick.js
var require_nextTick = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/nextTick.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nextTickAsync = exports.nextTick = void 0;
    function nextTick(callback) {
      setTimeout(callback, 0);
    }
    exports.nextTick = nextTick;
    function nextTickAsync(callback) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(callback());
        }, 0);
      });
    }
    exports.nextTickAsync = nextTickAsync;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/AsyncEventEmitter.js
var require_AsyncEventEmitter = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/AsyncEventEmitter.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncEventEmitter = exports.AsyncEventEmitterReadyState = void 0;
    var debug_1 = require_browser2();
    var strict_event_emitter_1 = require_lib5();
    var nextTick_1 = require_nextTick();
    var AsyncEventEmitterReadyState;
    (function(AsyncEventEmitterReadyState2) {
      AsyncEventEmitterReadyState2["ACTIVE"] = "ACTIVE";
      AsyncEventEmitterReadyState2["DEACTIVATED"] = "DEACTIVATED";
    })(AsyncEventEmitterReadyState = exports.AsyncEventEmitterReadyState || (exports.AsyncEventEmitterReadyState = {}));
    var AsyncEventEmitter = (
      /** @class */
      function(_super) {
        __extends(AsyncEventEmitter2, _super);
        function AsyncEventEmitter2() {
          var _this = _super.call(this) || this;
          _this.log = debug_1.debug("async-event-emitter");
          _this.queue = /* @__PURE__ */ new Map();
          _this.readyState = AsyncEventEmitterReadyState.ACTIVE;
          return _this;
        }
        AsyncEventEmitter2.prototype.on = function(event, listener) {
          var _this = this;
          var log = this.log.extend("on");
          log('adding "%s" listener...', event);
          if (this.readyState === AsyncEventEmitterReadyState.DEACTIVATED) {
            log("the emitter is destroyed, skipping!");
            return this;
          }
          return _super.prototype.on.call(this, event, function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function() {
              var queue;
              var _this2 = this;
              return __generator(this, function(_a) {
                queue = this.openListenerQueue(event);
                log('awaiting the "%s" listener...', event);
                queue.push({
                  args,
                  done: new Promise(function(resolve, reject) {
                    return __awaiter(_this2, void 0, void 0, function() {
                      var error_1;
                      return __generator(this, function(_a2) {
                        switch (_a2.label) {
                          case 0:
                            _a2.trys.push([0, 2, , 3]);
                            return [4, listener.apply(void 0, __spreadArray([], __read(args)))];
                          case 1:
                            _a2.sent();
                            resolve();
                            log('"%s" listener has resolved!', event);
                            return [3, 3];
                          case 2:
                            error_1 = _a2.sent();
                            log('"%s" listener has rejected!', error_1);
                            reject(error_1);
                            return [3, 3];
                          case 3:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  })
                });
                return [
                  2
                  /*return*/
                ];
              });
            });
          });
        };
        AsyncEventEmitter2.prototype.emit = function(event) {
          var _this = this;
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }
          var log = this.log.extend("emit");
          log('emitting "%s" event...', event);
          if (this.readyState === AsyncEventEmitterReadyState.DEACTIVATED) {
            log("the emitter is destroyed, skipping!");
            return false;
          }
          this.openListenerQueue(event);
          log('appending a one-time cleanup "%s" listener...', event);
          this.once(event, function() {
            nextTick_1.nextTick(function() {
              _this.queue.delete(event);
              log('cleaned up "%s" listeners queue!', event);
            });
          });
          return _super.prototype.emit.apply(this, __spreadArray([event], __read(args)));
        };
        AsyncEventEmitter2.prototype.untilIdle = function(event, filter) {
          if (filter === void 0) {
            filter = function() {
              return true;
            };
          }
          return __awaiter(this, void 0, void 0, function() {
            var listenersQueue;
            var _this = this;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  listenersQueue = this.queue.get(event) || [];
                  return [4, Promise.all(listenersQueue.filter(filter).map(function(_a2) {
                    var done = _a2.done;
                    return done;
                  })).finally(function() {
                    _this.queue.delete(event);
                  })];
                case 1:
                  _a.sent();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        AsyncEventEmitter2.prototype.openListenerQueue = function(event) {
          var log = this.log.extend("openListenerQueue");
          log('opening "%s" listeners queue...', event);
          var queue = this.queue.get(event);
          if (!queue) {
            log("no queue found, creating one...");
            this.queue.set(event, []);
            return [];
          }
          log("returning an exising queue:", queue);
          return queue;
        };
        AsyncEventEmitter2.prototype.removeAllListeners = function(event) {
          var log = this.log.extend("removeAllListeners");
          log("event:", event);
          if (event) {
            this.queue.delete(event);
            log('cleared the "%s" listeners queue!', event, this.queue.get(event));
          } else {
            this.queue.clear();
            log("cleared the listeners queue!", this.queue);
          }
          return _super.prototype.removeAllListeners.call(this, event);
        };
        AsyncEventEmitter2.prototype.activate = function() {
          var log = this.log.extend("activate");
          this.readyState = AsyncEventEmitterReadyState.ACTIVE;
          log("set state to:", this.readyState);
        };
        AsyncEventEmitter2.prototype.deactivate = function() {
          var log = this.log.extend("deactivate");
          log("removing all listeners...");
          this.removeAllListeners();
          this.readyState = AsyncEventEmitterReadyState.DEACTIVATED;
          log("set state to:", this.readyState);
        };
        return AsyncEventEmitter2;
      }(strict_event_emitter_1.StrictEventEmitter)
    );
    exports.AsyncEventEmitter = AsyncEventEmitter;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/Interceptor.js
var require_Interceptor = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/Interceptor.js"(exports) {
    "use strict";
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Interceptor = exports.InterceptorReadyState = exports.deleteGlobalSymbol = exports.getGlobalSymbol = void 0;
    var debug_1 = require_browser2();
    var AsyncEventEmitter_1 = require_AsyncEventEmitter();
    var nextTick_1 = require_nextTick();
    function getGlobalSymbol(symbol) {
      return (
        // @ts-ignore https://github.com/Microsoft/TypeScript/issues/24587
        globalThis[symbol] || void 0
      );
    }
    exports.getGlobalSymbol = getGlobalSymbol;
    function setGlobalSymbol(symbol, value) {
      globalThis[symbol] = value;
    }
    function deleteGlobalSymbol(symbol) {
      delete globalThis[symbol];
    }
    exports.deleteGlobalSymbol = deleteGlobalSymbol;
    var InterceptorReadyState;
    (function(InterceptorReadyState2) {
      InterceptorReadyState2["IDLE"] = "IDLE";
      InterceptorReadyState2["APPLYING"] = "APPLYING";
      InterceptorReadyState2["APPLIED"] = "APPLIED";
      InterceptorReadyState2["DISPOSING"] = "DISPOSING";
      InterceptorReadyState2["DISPOSED"] = "DISPOSED";
    })(InterceptorReadyState = exports.InterceptorReadyState || (exports.InterceptorReadyState = {}));
    var Interceptor = (
      /** @class */
      function() {
        function Interceptor2(symbol) {
          this.symbol = symbol;
          this.readyState = InterceptorReadyState.IDLE;
          this.emitter = new AsyncEventEmitter_1.AsyncEventEmitter();
          this.subscriptions = [];
          this.log = debug_1.debug(symbol.description);
          this.emitter.setMaxListeners(0);
          this.log("constructing the interceptor...");
        }
        Interceptor2.prototype.checkEnvironment = function() {
          return true;
        };
        Interceptor2.prototype.apply = function() {
          var _this = this;
          var log = this.log.extend("apply");
          log("applying the interceptor...");
          if (this.readyState === InterceptorReadyState.APPLIED) {
            log("intercepted already applied!");
            return;
          }
          var shouldApply = this.checkEnvironment();
          if (!shouldApply) {
            log("the interceptor cannot be applied in this environment!");
            return;
          }
          this.readyState = InterceptorReadyState.APPLYING;
          this.emitter.activate();
          log("activated the emiter!", this.emitter.readyState);
          var runningInstance = this.getInstance();
          if (runningInstance) {
            log("found a running instance, reusing...");
            this.on = function(event, listener) {
              log('proxying the "%s" listener', event);
              runningInstance.emitter.addListener(event, listener);
              _this.subscriptions.push(function() {
                runningInstance.emitter.removeListener(event, listener);
                log('removed proxied "%s" listener!', event);
              });
            };
            nextTick_1.nextTick(function() {
              _this.readyState = InterceptorReadyState.APPLIED;
            });
            return;
          }
          log("no running instance found, setting up a new instance...");
          this.setup();
          this.setInstance();
          nextTick_1.nextTick(function() {
            _this.readyState = InterceptorReadyState.APPLIED;
          });
        };
        Interceptor2.prototype.setup = function() {
        };
        Interceptor2.prototype.on = function(event, listener) {
          var log = this.log.extend("on");
          if (this.readyState === InterceptorReadyState.DISPOSING || this.readyState === InterceptorReadyState.DISPOSED) {
            log("cannot listen to events, already disposed!");
            return;
          }
          log('adding "%s" event listener:', event, listener.name);
          this.emitter.on(event, listener);
        };
        Interceptor2.prototype.dispose = function() {
          var e_1, _a;
          var _this = this;
          var log = this.log.extend("dispose");
          if (this.readyState === InterceptorReadyState.DISPOSED) {
            log("cannot dispose, already disposed!");
            return;
          }
          log("disposing the interceptor...");
          this.readyState = InterceptorReadyState.DISPOSING;
          if (!this.getInstance()) {
            log("no interceptors running, skipping dispose...");
            return;
          }
          this.clearInstance();
          log("global symbol deleted:", getGlobalSymbol(this.symbol));
          if (this.subscriptions.length > 0) {
            log("disposing of %d subscriptions...", this.subscriptions.length);
            try {
              for (var _b = __values(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dispose = _c.value;
                dispose();
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_c && !_c.done && (_a = _b.return))
                  _a.call(_b);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
            this.subscriptions = [];
            log("disposed of all subscriptions!", this.subscriptions.length);
          }
          this.emitter.deactivate();
          log("destroyed the listener!");
          nextTick_1.nextTick(function() {
            _this.readyState = InterceptorReadyState.DISPOSED;
          });
        };
        Interceptor2.prototype.getInstance = function() {
          var _a;
          var instance = getGlobalSymbol(this.symbol);
          this.log("retrieved global instance:", (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.name);
          return instance;
        };
        Interceptor2.prototype.setInstance = function() {
          setGlobalSymbol(this.symbol, this);
          this.log("set global instance!", this.symbol.description);
        };
        Interceptor2.prototype.clearInstance = function() {
          deleteGlobalSymbol(this.symbol);
          this.log("cleared global instance!", this.symbol.description);
        };
        return Interceptor2;
      }()
    );
    exports.Interceptor = Interceptor;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/BatchInterceptor.js
var require_BatchInterceptor = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/BatchInterceptor.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchInterceptor = void 0;
    var Interceptor_1 = require_Interceptor();
    var BatchInterceptor = (
      /** @class */
      function(_super) {
        __extends(BatchInterceptor2, _super);
        function BatchInterceptor2(options) {
          var _this = this;
          BatchInterceptor2.symbol = Symbol(options.name);
          _this = _super.call(this, BatchInterceptor2.symbol) || this;
          _this.interceptors = options.interceptors;
          return _this;
        }
        BatchInterceptor2.prototype.setup = function() {
          var e_1, _a;
          var log = this.log.extend("setup");
          log("applying all %d interceptors...", this.interceptors.length);
          var _loop_1 = function(interceptor2) {
            log('applying "%s" interceptor...', interceptor2.constructor.name);
            interceptor2.apply();
            log("adding interceptor dispose subscription");
            this_1.subscriptions.push(function() {
              return interceptor2.dispose();
            });
          };
          var this_1 = this;
          try {
            for (var _b = __values(this.interceptors), _c = _b.next(); !_c.done; _c = _b.next()) {
              var interceptor = _c.value;
              _loop_1(interceptor);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        };
        BatchInterceptor2.prototype.on = function(event, listener) {
          this.interceptors.forEach(function(interceptor) {
            interceptor.on(event, listener);
          });
        };
        return BatchInterceptor2;
      }(Interceptor_1.Interceptor)
    );
    exports.BatchInterceptor = BatchInterceptor;
  }
});

// node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/.pnpm/has-tostringtag@1.0.0/node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/.pnpm/has-tostringtag@1.0.0/node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/.pnpm/has-symbols@1.0.3/node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/.pnpm/has-proto@1.0.1/node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/.pnpm/has-proto@1.0.1/node_modules/has-proto/index.js"(exports, module) {
    "use strict";
    var test = {
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  }
});

// node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/.pnpm/get-intrinsic@1.2.1/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/.pnpm/get-intrinsic@1.2.1/node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match2, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match2;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/.pnpm/is-arguments@1.1.1/node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/.pnpm/is-arguments@1.1.1/node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    var hasToStringTag = require_shams2()();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/.pnpm/is-generator-function@1.0.10/node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/.pnpm/is-generator-function@1.0.10/node_modules/is-generator-function/index.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = require_shams2()();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var GeneratorFunction;
    module.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn) === GeneratorFunction;
    };
  }
});

// node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js
var require_for_each = __commonJS({
  "node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js"(exports, module) {
    "use strict";
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty2.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty2.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    var forEach = function forEach2(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
    module.exports = forEach;
  }
});

// node_modules/.pnpm/available-typed-arrays@1.0.5/node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/.pnpm/available-typed-arrays@1.0.5/node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? global : globalThis;
    module.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// node_modules/.pnpm/gopd@1.0.1/node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/.pnpm/gopd@1.0.1/node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/.pnpm/which-typed-array@1.1.11/node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/.pnpm/which-typed-array@1.1.11/node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBind = require_call_bind();
    var callBound = require_callBound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? global : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var getPrototypeOf = Object.getPrototypeOf;
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          cache["$" + typedArray] = callBind(descriptor.get);
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        cache["$" + typedArray] = callBind(arr.slice);
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var found = false;
      forEach(cache, function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      });
      return found;
    };
    var trySlices = function tryAllSlices(value) {
      var found = false;
      forEach(cache, function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = $slice(name, 1);
          } catch (e) {
          }
        }
      });
      return found;
    };
    module.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
          return tag;
        }
        if (tag !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/.pnpm/is-typed-array@1.1.12/node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/.pnpm/is-typed-array@1.1.12/node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    var whichTypedArray = require_which_typed_array();
    module.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js
var require_types = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js"(exports) {
    "use strict";
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise2(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise2;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js"(exports, module) {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/util.js"(exports) {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect2(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect2(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process.env.NODE_DEBUG) {
      debugEnv = process.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect2(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue2(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect2;
    inspect2.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect2.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect2.styles[styleType];
      if (style) {
        return "\x1B[" + inspect2.colors[style][0] + "m" + str + "\x1B[" + inspect2.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue2(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue2(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError2(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError2(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError2(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray2(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError2(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray2(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty2(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty2(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue2(ctx, desc.value, null);
          } else {
            str = formatValue2(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = require_types();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty2(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  }
});

// node_modules/.pnpm/web-encoding@1.1.5/node_modules/web-encoding/src/lib.js
var require_lib6 = __commonJS({
  "node_modules/.pnpm/web-encoding@1.1.5/node_modules/web-encoding/src/lib.js"(exports) {
    "use strict";
    exports.TextEncoder = typeof TextEncoder !== "undefined" ? TextEncoder : require_util().TextEncoder;
    exports.TextDecoder = typeof TextDecoder !== "undefined" ? TextDecoder : require_util().TextDecoder;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/bufferUtils.js
var require_bufferUtils = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/bufferUtils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getArrayBuffer = exports.decodeBuffer = exports.encodeBuffer = void 0;
    var web_encoding_1 = require_lib6();
    function encodeBuffer(text) {
      var encoder = new web_encoding_1.TextEncoder();
      var encoded = encoder.encode(text);
      return getArrayBuffer(encoded);
    }
    exports.encodeBuffer = encodeBuffer;
    function decodeBuffer(buffer, encoding) {
      var decoder = new web_encoding_1.TextDecoder(encoding);
      return decoder.decode(buffer);
    }
    exports.decodeBuffer = decodeBuffer;
    function getArrayBuffer(array) {
      return array.buffer.slice(array.byteOffset, array.byteOffset + array.byteLength);
    }
    exports.getArrayBuffer = getArrayBuffer;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/uuid.js
var require_uuid = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/uuid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uuidv4 = void 0;
    function uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
    exports.uuidv4 = uuidv4;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/IsomorphicRequest.js
var require_IsomorphicRequest = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/IsomorphicRequest.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsomorphicRequest = void 0;
    var headers_polyfill_1 = require_lib();
    var outvariant_1 = require_lib3();
    var bufferUtils_1 = require_bufferUtils();
    var uuid_1 = require_uuid();
    var IsomorphicRequest = (
      /** @class */
      function() {
        function IsomorphicRequest2(input, init) {
          if (init === void 0) {
            init = {};
          }
          var defaultBody = new ArrayBuffer(0);
          this._bodyUsed = false;
          if (input instanceof IsomorphicRequest2) {
            this.id = input.id;
            this.url = input.url;
            this.method = input.method;
            this.headers = input.headers;
            this.credentials = input.credentials;
            this._body = input._body || defaultBody;
            return;
          }
          this.id = uuid_1.uuidv4();
          this.url = input;
          this.method = init.method || "GET";
          this.headers = new headers_polyfill_1.Headers(init.headers);
          this.credentials = init.credentials || "same-origin";
          this._body = init.body || defaultBody;
        }
        Object.defineProperty(IsomorphicRequest2.prototype, "bodyUsed", {
          get: function() {
            return this._bodyUsed;
          },
          enumerable: false,
          configurable: true
        });
        IsomorphicRequest2.prototype.text = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              outvariant_1.invariant(!this.bodyUsed, 'Failed to execute "text" on "IsomorphicRequest": body buffer already read');
              this._bodyUsed = true;
              return [2, bufferUtils_1.decodeBuffer(this._body)];
            });
          });
        };
        IsomorphicRequest2.prototype.json = function() {
          return __awaiter(this, void 0, void 0, function() {
            var text;
            return __generator(this, function(_a) {
              outvariant_1.invariant(!this.bodyUsed, 'Failed to execute "json" on "IsomorphicRequest": body buffer already read');
              this._bodyUsed = true;
              text = bufferUtils_1.decodeBuffer(this._body);
              return [2, JSON.parse(text)];
            });
          });
        };
        IsomorphicRequest2.prototype.arrayBuffer = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              outvariant_1.invariant(!this.bodyUsed, 'Failed to execute "arrayBuffer" on "IsomorphicRequest": body buffer already read');
              this._bodyUsed = true;
              return [2, this._body];
            });
          });
        };
        IsomorphicRequest2.prototype.clone = function() {
          return new IsomorphicRequest2(this);
        };
        return IsomorphicRequest2;
      }()
    );
    exports.IsomorphicRequest = IsomorphicRequest;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/createLazyCallback.js
var require_createLazyCallback = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/createLazyCallback.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createLazyCallback = void 0;
    function createLazyCallback(options) {
      var _this = this;
      if (options === void 0) {
        options = {};
      }
      var calledTimes = 0;
      var autoResolveTimeout;
      var remoteResolve;
      var callPromise = new Promise(function(resolve) {
        remoteResolve = resolve;
      }).finally(function() {
        clearTimeout(autoResolveTimeout);
      });
      var fn = function() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (options.maxCalls && calledTimes >= options.maxCalls) {
          (_a = options.maxCallsCallback) === null || _a === void 0 ? void 0 : _a.call(options);
        }
        remoteResolve(args);
        calledTimes++;
      };
      fn.invoked = function() {
        return __awaiter(_this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            autoResolveTimeout = setTimeout(function() {
              remoteResolve([]);
            }, 0);
            return [2, callPromise];
          });
        });
      };
      return fn;
    }
    exports.createLazyCallback = createLazyCallback;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/InteractiveIsomorphicRequest.js
var require_InteractiveIsomorphicRequest = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/InteractiveIsomorphicRequest.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InteractiveIsomorphicRequest = void 0;
    var outvariant_1 = require_lib3();
    var IsomorphicRequest_1 = require_IsomorphicRequest();
    var createLazyCallback_1 = require_createLazyCallback();
    var InteractiveIsomorphicRequest = (
      /** @class */
      function(_super) {
        __extends(InteractiveIsomorphicRequest2, _super);
        function InteractiveIsomorphicRequest2(request) {
          var _this = _super.call(this, request) || this;
          _this.respondWith = createLazyCallback_1.createLazyCallback({
            maxCalls: 1,
            maxCallsCallback: function() {
              outvariant_1.invariant(false, 'Failed to respond to "%s %s" request: the "request" event has already been responded to.', _this.method, _this.url.href);
            }
          });
          return _this;
        }
        return InteractiveIsomorphicRequest2;
      }(IsomorphicRequest_1.IsomorphicRequest)
    );
    exports.InteractiveIsomorphicRequest = InteractiveIsomorphicRequest;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/getCleanUrl.js
var require_getCleanUrl = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/getCleanUrl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCleanUrl = void 0;
    function getCleanUrl(url, isAbsolute) {
      if (isAbsolute === void 0) {
        isAbsolute = true;
      }
      return [isAbsolute && url.origin, url.pathname].filter(Boolean).join("");
    }
    exports.getCleanUrl = getCleanUrl;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/index.js
var require_lib7 = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeBuffer = exports.encodeBuffer = exports.getCleanUrl = void 0;
    __exportStar(require_glossary(), exports);
    __exportStar(require_Interceptor(), exports);
    __exportStar(require_BatchInterceptor(), exports);
    __exportStar(require_IsomorphicRequest(), exports);
    __exportStar(require_InteractiveIsomorphicRequest(), exports);
    var getCleanUrl_1 = require_getCleanUrl();
    Object.defineProperty(exports, "getCleanUrl", { enumerable: true, get: function() {
      return getCleanUrl_1.getCleanUrl;
    } });
    var bufferUtils_1 = require_bufferUtils();
    Object.defineProperty(exports, "encodeBuffer", { enumerable: true, get: function() {
      return bufferUtils_1.encodeBuffer;
    } });
    Object.defineProperty(exports, "decodeBuffer", { enumerable: true, get: function() {
      return bufferUtils_1.decodeBuffer;
    } });
  }
});

// node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key === "expires") {
          cookie.expires = new Date(value2);
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === "secure") {
          cookie.secure = true;
        } else if (key === "httponly") {
          cookie.httpOnly = true;
        } else if (key === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString;
  }
});

// node_modules/.pnpm/@mswjs+cookies@0.2.2/node_modules/@mswjs/cookies/lib/store.js
var require_store = __commonJS({
  "node_modules/.pnpm/@mswjs+cookies@0.2.2/node_modules/@mswjs/cookies/lib/store.js"(exports) {
    "use strict";
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.store = exports.PERSISTENCY_KEY = void 0;
    var set_cookie_parser_1 = require_set_cookie();
    exports.PERSISTENCY_KEY = "MSW_COOKIE_STORE";
    function supportsLocalStorage() {
      try {
        if (localStorage == null) {
          return false;
        }
        const testKey = exports.PERSISTENCY_KEY + "_test";
        localStorage.setItem(testKey, "test");
        localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    }
    var CookieStore = class {
      constructor() {
        this.store = /* @__PURE__ */ new Map();
      }
      /**
       * Sets the given request cookies into the store.
       * Respects the `request.credentials` policy.
       */
      add(request, response) {
        if (request.credentials === "omit") {
          return;
        }
        const requestUrl = new URL(request.url);
        const responseCookies = response.headers.get("set-cookie");
        if (!responseCookies) {
          return;
        }
        const now = Date.now();
        const parsedResponseCookies = set_cookie_parser_1.parse(responseCookies).map((_a) => {
          var { maxAge } = _a, cookie = __rest(_a, ["maxAge"]);
          return Object.assign(Object.assign({}, cookie), { expires: maxAge === void 0 ? cookie.expires : new Date(now + maxAge * 1e3), maxAge });
        });
        const prevCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
        parsedResponseCookies.forEach((cookie) => {
          this.store.set(requestUrl.origin, prevCookies.set(cookie.name, cookie));
        });
      }
      /**
       * Returns cookies relevant to the given request
       * and its `request.credentials` policy.
       */
      get(request) {
        this.deleteExpiredCookies();
        const requestUrl = new URL(request.url);
        const originCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
        switch (request.credentials) {
          case "include": {
            if (typeof document === "undefined") {
              return originCookies;
            }
            const documentCookies = set_cookie_parser_1.parse(document.cookie);
            documentCookies.forEach((cookie) => {
              originCookies.set(cookie.name, cookie);
            });
            return originCookies;
          }
          case "same-origin": {
            return originCookies;
          }
          default:
            return /* @__PURE__ */ new Map();
        }
      }
      /**
       * Returns a collection of all stored cookies.
       */
      getAll() {
        this.deleteExpiredCookies();
        return this.store;
      }
      /**
       * Deletes all cookies associated with the given request.
       */
      deleteAll(request) {
        const requestUrl = new URL(request.url);
        this.store.delete(requestUrl.origin);
      }
      /**
       * Clears the entire cookie store.
       */
      clear() {
        this.store.clear();
      }
      /**
       * Hydrates the virtual cookie store from the `localStorage` if defined.
       */
      hydrate() {
        if (!supportsLocalStorage()) {
          return;
        }
        const persistedCookies = localStorage.getItem(exports.PERSISTENCY_KEY);
        if (!persistedCookies) {
          return;
        }
        try {
          const parsedCookies = JSON.parse(persistedCookies);
          parsedCookies.forEach(([origin, cookies]) => {
            this.store.set(origin, new Map(cookies.map((_a) => {
              var [token, _b] = _a, { expires } = _b, cookie = __rest(_b, ["expires"]);
              return [
                token,
                expires === void 0 ? cookie : Object.assign(Object.assign({}, cookie), { expires: new Date(expires) })
              ];
            })));
          });
        } catch (error) {
          console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${exports.PERSISTENCY_KEY}").

Stored value:
${localStorage.getItem(exports.PERSISTENCY_KEY)}

Thrown exception:
${error}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`);
          localStorage.removeItem(exports.PERSISTENCY_KEY);
        }
      }
      /**
       * Persists the current virtual cookies into the `localStorage` if defined,
       * so they are available on the next page load.
       */
      persist() {
        if (!supportsLocalStorage()) {
          return;
        }
        const serializedCookies = Array.from(this.store.entries()).map(([origin, cookies]) => {
          return [origin, Array.from(cookies.entries())];
        });
        localStorage.setItem(exports.PERSISTENCY_KEY, JSON.stringify(serializedCookies));
      }
      deleteExpiredCookies() {
        const now = Date.now();
        this.store.forEach((originCookies, origin) => {
          originCookies.forEach(({ expires, name }) => {
            if (expires !== void 0 && expires.getTime() <= now) {
              originCookies.delete(name);
            }
          });
          if (originCookies.size === 0) {
            this.store.delete(origin);
          }
        });
      }
    };
    exports.store = new CookieStore();
  }
});

// node_modules/.pnpm/@mswjs+cookies@0.2.2/node_modules/@mswjs/cookies/lib/index.js
var require_lib8 = __commonJS({
  "node_modules/.pnpm/@mswjs+cookies@0.2.2/node_modules/@mswjs/cookies/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_store(), exports);
  }
});

// node_modules/.pnpm/js-levenshtein@1.1.6/node_modules/js-levenshtein/index.js
var require_js_levenshtein = __commonJS({
  "node_modules/.pnpm/js-levenshtein@1.1.6/node_modules/js-levenshtein/index.js"(exports, module) {
    "use strict";
    module.exports = function() {
      function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1 ? d0 > d2 ? d2 + 1 : d0 + 1 : bx === ay ? d1 : d1 + 1;
      }
      return function(a, b) {
        if (a === b) {
          return 0;
        }
        if (a.length > b.length) {
          var tmp = a;
          a = b;
          b = tmp;
        }
        var la = a.length;
        var lb = b.length;
        while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
          la--;
          lb--;
        }
        var offset = 0;
        while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
          offset++;
        }
        la -= offset;
        lb -= offset;
        if (la === 0 || lb < 3) {
          return lb;
        }
        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;
        var vector = [];
        for (y = 0; y < la; y++) {
          vector.push(y + 1);
          vector.push(a.charCodeAt(offset + y));
        }
        var len = vector.length - 1;
        for (; x < lb - 3; ) {
          bx0 = b.charCodeAt(offset + (d0 = x));
          bx1 = b.charCodeAt(offset + (d1 = x + 1));
          bx2 = b.charCodeAt(offset + (d2 = x + 2));
          bx3 = b.charCodeAt(offset + (d3 = x + 3));
          dd = x += 4;
          for (y = 0; y < len; y += 2) {
            dy = vector[y];
            ay = vector[y + 1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd = _min(d2, d3, dd, bx3, ay);
            vector[y] = dd;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
          }
        }
        for (; x < lb; ) {
          bx0 = b.charCodeAt(offset + (d0 = x));
          dd = ++x;
          for (y = 0; y < len; y += 2) {
            dy = vector[y];
            vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
            d0 = dy;
          }
        }
        return dd;
      };
    }();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/version.mjs
var version, versionInfo;
var init_version = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/version.mjs"() {
    version = "16.8.0";
    versionInfo = Object.freeze({
      major: 16,
      minor: 8,
      patch: 0,
      preReleaseTag: null
    });
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
var init_devAssert = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/devAssert.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isPromise.mjs
function isPromise(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.then) === "function";
}
var init_isPromise = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isPromise.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}
var init_isObjectLike = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isObjectLike.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}
var init_invariant = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/invariant.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/location.mjs
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match2 of source.body.matchAll(LineRegExp)) {
    typeof match2.index === "number" || invariant(false);
    if (match2.index >= position) {
      break;
    }
    lastLineStart = match2.index + match2[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}
var LineRegExp;
var init_location = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/location.mjs"() {
    init_invariant();
    LineRegExp = /\r\n|[\n\r]/g;
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printLocation.mjs
function printLocation(location2) {
  return printSourceLocation(
    location2.source,
    getLocation(location2.source, location2.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
}
var init_printLocation = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printLocation.mjs"() {
    init_location();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error) {
  return error.toString();
}
function formatError(error) {
  return error.toJSON();
}
var GraphQLError;
var init_GraphQLError = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/GraphQLError.mjs"() {
    init_isObjectLike();
    init_location();
    init_printLocation();
    GraphQLError = class _GraphQLError extends Error {
      /**
       * An array of `{ line, column }` locations within the source GraphQL document
       * which correspond to this error.
       *
       * Errors during validation often contain multiple locations, for example to
       * point out two things with the same name. Errors during execution include a
       * single location, the field which produced the error.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array describing the JSON-path into the execution response which
       * corresponds to this error. Only included for errors during execution.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array of GraphQL AST Nodes corresponding to this error.
       */
      /**
       * The source GraphQL document for the first location of this error.
       *
       * Note that if this Error represents more than one node, the source may not
       * represent nodes after the first node.
       */
      /**
       * An array of character offsets within the source GraphQL document
       * which correspond to this error.
       */
      /**
       * The original error thrown from a field resolver during execution.
       */
      /**
       * Extension fields to add to the formatted error.
       */
      /**
       * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
       */
      constructor(message, ...rawArgs) {
        var _this$nodes, _nodeLocations$, _ref;
        const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
        super(message);
        this.name = "GraphQLError";
        this.path = path !== null && path !== void 0 ? path : void 0;
        this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
        this.nodes = undefinedIfEmpty(
          Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
        );
        const nodeLocations = undefinedIfEmpty(
          (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
        );
        this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
        this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
        this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
        const originalExtensions = isObjectLike(
          originalError === null || originalError === void 0 ? void 0 : originalError.extensions
        ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
        this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
        Object.defineProperties(this, {
          message: {
            writable: true,
            enumerable: true
          },
          name: {
            enumerable: false
          },
          nodes: {
            enumerable: false
          },
          source: {
            enumerable: false
          },
          positions: {
            enumerable: false
          },
          originalError: {
            enumerable: false
          }
        });
        if (originalError !== null && originalError !== void 0 && originalError.stack) {
          Object.defineProperty(this, "stack", {
            value: originalError.stack,
            writable: true,
            configurable: true
          });
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _GraphQLError);
        } else {
          Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: true,
            configurable: true
          });
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLError";
      }
      toString() {
        let output = this.message;
        if (this.nodes) {
          for (const node of this.nodes) {
            if (node.loc) {
              output += "\n\n" + printLocation(node.loc);
            }
          }
        } else if (this.source && this.locations) {
          for (const location2 of this.locations) {
            output += "\n\n" + printSourceLocation(this.source, location2);
          }
        }
        return output;
      }
      toJSON() {
        const formattedError = {
          message: this.message
        };
        if (this.locations != null) {
          formattedError.locations = this.locations;
        }
        if (this.path != null) {
          formattedError.path = this.path;
        }
        if (this.extensions != null && Object.keys(this.extensions).length > 0) {
          formattedError.extensions = this.extensions;
        }
        return formattedError;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}
var init_syntaxError = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/syntaxError.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/ast.mjs
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var Location, Token, QueryDocumentKeys, kindValues, OperationTypeNode;
var init_ast = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/ast.mjs"() {
    Location = class {
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The Token at which this Node begins.
       */
      /**
       * The Token at which this Node ends.
       */
      /**
       * The Source document the AST represents.
       */
      constructor(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }
      get [Symbol.toStringTag]() {
        return "Location";
      }
      toJSON() {
        return {
          start: this.start,
          end: this.end
        };
      }
    };
    Token = class {
      /**
       * The kind of Token.
       */
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The 1-indexed line number on which this Token appears.
       */
      /**
       * The 1-indexed column number at which this Token begins.
       */
      /**
       * For non-punctuation tokens, represents the interpreted value of the token.
       *
       * Note: is undefined for punctuation tokens, but typed as string for
       * convenience in the parser.
       */
      /**
       * Tokens exist as nodes in a double-linked-list amongst all tokens
       * including ignored tokens. <SOF> is always the first node and <EOF>
       * the last.
       */
      constructor(kind, start, end, line, column, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = null;
        this.next = null;
      }
      get [Symbol.toStringTag]() {
        return "Token";
      }
      toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      }
    };
    QueryDocumentKeys = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: [
        "name",
        "variableDefinitions",
        "directives",
        "selectionSet"
      ],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        // Note: fragment variable definitions are deprecated and will removed in v17.0.0
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet"
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      FieldDefinition: ["description", "name", "arguments", "type", "directives"],
      InputValueDefinition: [
        "description",
        "name",
        "type",
        "defaultValue",
        "directives"
      ],
      InterfaceTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"]
    };
    kindValues = new Set(Object.keys(QueryDocumentKeys));
    (function(OperationTypeNode2) {
      OperationTypeNode2["QUERY"] = "query";
      OperationTypeNode2["MUTATION"] = "mutation";
      OperationTypeNode2["SUBSCRIPTION"] = "subscription";
    })(OperationTypeNode || (OperationTypeNode = {}));
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
var init_directiveLocation = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/directiveLocation.mjs"() {
    (function(DirectiveLocation2) {
      DirectiveLocation2["QUERY"] = "QUERY";
      DirectiveLocation2["MUTATION"] = "MUTATION";
      DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
      DirectiveLocation2["FIELD"] = "FIELD";
      DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
      DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
      DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
      DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
      DirectiveLocation2["SCHEMA"] = "SCHEMA";
      DirectiveLocation2["SCALAR"] = "SCALAR";
      DirectiveLocation2["OBJECT"] = "OBJECT";
      DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
      DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
      DirectiveLocation2["INTERFACE"] = "INTERFACE";
      DirectiveLocation2["UNION"] = "UNION";
      DirectiveLocation2["ENUM"] = "ENUM";
      DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
      DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
      DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
    })(DirectiveLocation || (DirectiveLocation = {}));
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/kinds.mjs
var Kind;
var init_kinds = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/kinds.mjs"() {
    (function(Kind2) {
      Kind2["NAME"] = "Name";
      Kind2["DOCUMENT"] = "Document";
      Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
      Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
      Kind2["SELECTION_SET"] = "SelectionSet";
      Kind2["FIELD"] = "Field";
      Kind2["ARGUMENT"] = "Argument";
      Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
      Kind2["INLINE_FRAGMENT"] = "InlineFragment";
      Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
      Kind2["VARIABLE"] = "Variable";
      Kind2["INT"] = "IntValue";
      Kind2["FLOAT"] = "FloatValue";
      Kind2["STRING"] = "StringValue";
      Kind2["BOOLEAN"] = "BooleanValue";
      Kind2["NULL"] = "NullValue";
      Kind2["ENUM"] = "EnumValue";
      Kind2["LIST"] = "ListValue";
      Kind2["OBJECT"] = "ObjectValue";
      Kind2["OBJECT_FIELD"] = "ObjectField";
      Kind2["DIRECTIVE"] = "Directive";
      Kind2["NAMED_TYPE"] = "NamedType";
      Kind2["LIST_TYPE"] = "ListType";
      Kind2["NON_NULL_TYPE"] = "NonNullType";
      Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
      Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
      Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
      Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
      Kind2["FIELD_DEFINITION"] = "FieldDefinition";
      Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
      Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
      Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
      Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
      Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
      Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
      Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
      Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
      Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
      Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
      Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
      Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
      Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
      Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    })(Kind || (Kind = {}));
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || // A-Z
  code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}
var init_characterClasses = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/characterClasses.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent2 < commonIndent) {
      commonIndent = indent2;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function isPrintableAsBlockString(value) {
  if (value === "") {
    return true;
  }
  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;
  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 11:
      case 12:
      case 14:
      case 15:
        return false;
      case 13:
        return false;
      case 10:
        if (isEmptyLine && !seenNonEmptyLine) {
          return false;
        }
        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;
      case 9:
      case 32:
        hasIndent || (hasIndent = isEmptyLine);
        break;
      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }
  if (isEmptyLine) {
    return false;
  }
  if (hasCommonIndent && seenNonEmptyLine) {
    return false;
  }
  return true;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
  (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result += "\n";
  }
  result += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result += "\n";
  }
  return '"""' + result + '"""';
}
var init_blockString = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/blockString.mjs"() {
    init_characterClasses();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/tokenKind.mjs
var TokenKind;
var init_tokenKind = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/tokenKind.mjs"() {
    (function(TokenKind2) {
      TokenKind2["SOF"] = "<SOF>";
      TokenKind2["EOF"] = "<EOF>";
      TokenKind2["BANG"] = "!";
      TokenKind2["DOLLAR"] = "$";
      TokenKind2["AMP"] = "&";
      TokenKind2["PAREN_L"] = "(";
      TokenKind2["PAREN_R"] = ")";
      TokenKind2["SPREAD"] = "...";
      TokenKind2["COLON"] = ":";
      TokenKind2["EQUALS"] = "=";
      TokenKind2["AT"] = "@";
      TokenKind2["BRACKET_L"] = "[";
      TokenKind2["BRACKET_R"] = "]";
      TokenKind2["BRACE_L"] = "{";
      TokenKind2["PIPE"] = "|";
      TokenKind2["BRACE_R"] = "}";
      TokenKind2["NAME"] = "Name";
      TokenKind2["INT"] = "Int";
      TokenKind2["FLOAT"] = "Float";
      TokenKind2["STRING"] = "String";
      TokenKind2["BLOCK_STRING"] = "BlockString";
      TokenKind2["COMMENT"] = "Comment";
    })(TokenKind || (TokenKind = {}));
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/lexer.mjs
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location2) {
  return isLeadingSurrogate(body.charCodeAt(location2)) && isTrailingSurrogate(body.charCodeAt(location2 + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer2, location2) {
  const code = lexer2.source.body.codePointAt(location2);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer2, kind, start, end, value) {
  const line = lexer2.line;
  const col = 1 + start - lexer2.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer2, start) {
  const body = lexer2.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++position;
        continue;
      case 10:
        ++position;
        ++lexer2.line;
        lexer2.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer2.line;
        lexer2.lineStart = position;
        continue;
      case 35:
        return readComment(lexer2, position);
      case 33:
        return createToken(lexer2, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer2, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer2, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer2, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer2, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer2, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer2, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer2, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer2, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer2, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer2, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer2, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer2, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer2, TokenKind.BRACE_R, position, position + 1);
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer2, position);
        }
        return readString(lexer2, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer2, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer2, position);
    }
    throw syntaxError(
      lexer2.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer2, position)}.` : `Invalid character: ${printCodePointAt(lexer2, position)}.`
    );
  }
  return createToken(lexer2, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer2, start) {
  const body = lexer2.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer2,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer2, start, firstCode) {
  const body = lexer2.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer2.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer2,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer2, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer2, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer2, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer2.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer2,
        position
      )}.`
    );
  }
  return createToken(
    lexer2,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer2, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer2.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer2,
        start
      )}.`
    );
  }
  const body = lexer2.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer2, start) {
  const body = lexer2.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer2, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer2, position) : readEscapedUnicodeFixedWidth(lexer2, position) : readEscapedCharacter(lexer2, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer2.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer2,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer2.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer2, position) {
  const body = lexer2.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer2.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer2, position) {
  const body = lexer2.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer2.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer2, position) {
  const body = lexer2.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer2.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer2, start) {
  const body = lexer2.source.body;
  const bodyLength = body.length;
  let lineStart = lexer2.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer2,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer2.line += blockLines.length - 1;
      lexer2.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer2.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer2,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer2.source, position, "Unterminated string.");
}
function readName(lexer2, start) {
  const body = lexer2.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer2,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}
var Lexer;
var init_lexer = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/lexer.mjs"() {
    init_syntaxError();
    init_ast();
    init_blockString();
    init_characterClasses();
    init_tokenKind();
    Lexer = class {
      /**
       * The previously focused non-ignored token.
       */
      /**
       * The currently focused non-ignored token.
       */
      /**
       * The (1-indexed) line containing the current token.
       */
      /**
       * The character offset at which the current line begins.
       */
      constructor(source) {
        const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
      }
      get [Symbol.toStringTag]() {
        return "Lexer";
      }
      /**
       * Advances the token stream to the next non-ignored token.
       */
      advance() {
        this.lastToken = this.token;
        const token = this.token = this.lookahead();
        return token;
      }
      /**
       * Looks ahead and returns the next non-ignored token, but does not change
       * the state of Lexer.
       */
      lookahead() {
        let token = this.token;
        if (token.kind !== TokenKind.EOF) {
          do {
            if (token.next) {
              token = token.next;
            } else {
              const nextToken = readNextToken(this, token.end);
              token.next = nextToken;
              nextToken.prev = token;
              token = nextToken;
            }
          } while (token.kind === TokenKind.COMMENT);
        }
        return token;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/inspect.mjs
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
var MAX_ARRAY_LENGTH, MAX_RECURSIVE_DEPTH;
var init_inspect = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/inspect.mjs"() {
    MAX_ARRAY_LENGTH = 10;
    MAX_RECURSIVE_DEPTH = 2;
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/instanceOf.mjs
var instanceOf;
var init_instanceOf = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/instanceOf.mjs"() {
    init_inspect();
    instanceOf = /* c8 ignore next 6 */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317
    globalThis.process && globalThis.process.env.NODE_ENV === "production" ? function instanceOf2(value, constructor) {
      return value instanceof constructor;
    } : function instanceOf3(value, constructor) {
      if (value instanceof constructor) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        var _value$constructor;
        const className = constructor.prototype[Symbol.toStringTag];
        const valueClassName = (
          // We still need to support constructor's name to detect conflicts with older versions of this library.
          Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
        );
        if (className === valueClassName) {
          const stringifiedValue = inspect(value);
          throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
      }
      return false;
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/source.mjs
function isSource(source) {
  return instanceOf(source, Source);
}
var Source;
var init_source = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/source.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    Source = class {
      constructor(body, name = "GraphQL request", locationOffset = {
        line: 1,
        column: 1
      }) {
        typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 || devAssert(
          false,
          "line in locationOffset is 1-indexed and must be positive."
        );
        this.locationOffset.column > 0 || devAssert(
          false,
          "column in locationOffset is 1-indexed and must be positive."
        );
      }
      get [Symbol.toStringTag]() {
        return "Source";
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(TokenKind.EOF);
  return value;
}
function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(TokenKind.EOF);
  return value;
}
function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(TokenKind.EOF);
  return type;
}
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}
var Parser;
var init_parser = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/parser.mjs"() {
    init_syntaxError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_lexer();
    init_source();
    init_tokenKind();
    Parser = class {
      constructor(source, options = {}) {
        const sourceObj = isSource(source) ? source : new Source(source);
        this._lexer = new Lexer(sourceObj);
        this._options = options;
        this._tokenCounter = 0;
      }
      /**
       * Converts a name lex token into a name parse node.
       */
      parseName() {
        const token = this.expectToken(TokenKind.NAME);
        return this.node(token, {
          kind: Kind.NAME,
          value: token.value
        });
      }
      // Implements the parsing rules in the Document section.
      /**
       * Document : Definition+
       */
      parseDocument() {
        return this.node(this._lexer.token, {
          kind: Kind.DOCUMENT,
          definitions: this.many(
            TokenKind.SOF,
            this.parseDefinition,
            TokenKind.EOF
          )
        });
      }
      /**
       * Definition :
       *   - ExecutableDefinition
       *   - TypeSystemDefinition
       *   - TypeSystemExtension
       *
       * ExecutableDefinition :
       *   - OperationDefinition
       *   - FragmentDefinition
       *
       * TypeSystemDefinition :
       *   - SchemaDefinition
       *   - TypeDefinition
       *   - DirectiveDefinition
       *
       * TypeDefinition :
       *   - ScalarTypeDefinition
       *   - ObjectTypeDefinition
       *   - InterfaceTypeDefinition
       *   - UnionTypeDefinition
       *   - EnumTypeDefinition
       *   - InputObjectTypeDefinition
       */
      parseDefinition() {
        if (this.peek(TokenKind.BRACE_L)) {
          return this.parseOperationDefinition();
        }
        const hasDescription = this.peekDescription();
        const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaDefinition();
            case "scalar":
              return this.parseScalarTypeDefinition();
            case "type":
              return this.parseObjectTypeDefinition();
            case "interface":
              return this.parseInterfaceTypeDefinition();
            case "union":
              return this.parseUnionTypeDefinition();
            case "enum":
              return this.parseEnumTypeDefinition();
            case "input":
              return this.parseInputObjectTypeDefinition();
            case "directive":
              return this.parseDirectiveDefinition();
          }
          if (hasDescription) {
            throw syntaxError(
              this._lexer.source,
              this._lexer.token.start,
              "Unexpected description, descriptions are supported only on type definitions."
            );
          }
          switch (keywordToken.value) {
            case "query":
            case "mutation":
            case "subscription":
              return this.parseOperationDefinition();
            case "fragment":
              return this.parseFragmentDefinition();
            case "extend":
              return this.parseTypeSystemExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      // Implements the parsing rules in the Operations section.
      /**
       * OperationDefinition :
       *  - SelectionSet
       *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
       */
      parseOperationDefinition() {
        const start = this._lexer.token;
        if (this.peek(TokenKind.BRACE_L)) {
          return this.node(start, {
            kind: Kind.OPERATION_DEFINITION,
            operation: OperationTypeNode.QUERY,
            name: void 0,
            variableDefinitions: [],
            directives: [],
            selectionSet: this.parseSelectionSet()
          });
        }
        const operation = this.parseOperationType();
        let name;
        if (this.peek(TokenKind.NAME)) {
          name = this.parseName();
        }
        return this.node(start, {
          kind: Kind.OPERATION_DEFINITION,
          operation,
          name,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * OperationType : one of query mutation subscription
       */
      parseOperationType() {
        const operationToken = this.expectToken(TokenKind.NAME);
        switch (operationToken.value) {
          case "query":
            return OperationTypeNode.QUERY;
          case "mutation":
            return OperationTypeNode.MUTATION;
          case "subscription":
            return OperationTypeNode.SUBSCRIPTION;
        }
        throw this.unexpected(operationToken);
      }
      /**
       * VariableDefinitions : ( VariableDefinition+ )
       */
      parseVariableDefinitions() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseVariableDefinition,
          TokenKind.PAREN_R
        );
      }
      /**
       * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
       */
      parseVariableDefinition() {
        return this.node(this._lexer.token, {
          kind: Kind.VARIABLE_DEFINITION,
          variable: this.parseVariable(),
          type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
          defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
          directives: this.parseConstDirectives()
        });
      }
      /**
       * Variable : $ Name
       */
      parseVariable() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.DOLLAR);
        return this.node(start, {
          kind: Kind.VARIABLE,
          name: this.parseName()
        });
      }
      /**
       * ```
       * SelectionSet : { Selection+ }
       * ```
       */
      parseSelectionSet() {
        return this.node(this._lexer.token, {
          kind: Kind.SELECTION_SET,
          selections: this.many(
            TokenKind.BRACE_L,
            this.parseSelection,
            TokenKind.BRACE_R
          )
        });
      }
      /**
       * Selection :
       *   - Field
       *   - FragmentSpread
       *   - InlineFragment
       */
      parseSelection() {
        return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
      }
      /**
       * Field : Alias? Name Arguments? Directives? SelectionSet?
       *
       * Alias : Name :
       */
      parseField() {
        const start = this._lexer.token;
        const nameOrAlias = this.parseName();
        let alias;
        let name;
        if (this.expectOptionalToken(TokenKind.COLON)) {
          alias = nameOrAlias;
          name = this.parseName();
        } else {
          name = nameOrAlias;
        }
        return this.node(start, {
          kind: Kind.FIELD,
          alias,
          name,
          arguments: this.parseArguments(false),
          directives: this.parseDirectives(false),
          selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
        });
      }
      /**
       * Arguments[Const] : ( Argument[?Const]+ )
       */
      parseArguments(isConst) {
        const item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
      }
      /**
       * Argument[Const] : Name : Value[?Const]
       */
      parseArgument(isConst = false) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.ARGUMENT,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      parseConstArgument() {
        return this.parseArgument(true);
      }
      // Implements the parsing rules in the Fragments section.
      /**
       * Corresponds to both FragmentSpread and InlineFragment in the spec.
       *
       * FragmentSpread : ... FragmentName Directives?
       *
       * InlineFragment : ... TypeCondition? Directives? SelectionSet
       */
      parseFragment() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.SPREAD);
        const hasTypeCondition = this.expectOptionalKeyword("on");
        if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
          return this.node(start, {
            kind: Kind.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(false)
          });
        }
        return this.node(start, {
          kind: Kind.INLINE_FRAGMENT,
          typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentDefinition :
       *   - fragment FragmentName on TypeCondition Directives? SelectionSet
       *
       * TypeCondition : NamedType
       */
      parseFragmentDefinition() {
        const start = this._lexer.token;
        this.expectKeyword("fragment");
        if (this._options.allowLegacyFragmentVariables === true) {
          return this.node(start, {
            kind: Kind.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
          });
        }
        return this.node(start, {
          kind: Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentName : Name but not `on`
       */
      parseFragmentName() {
        if (this._lexer.token.value === "on") {
          throw this.unexpected();
        }
        return this.parseName();
      }
      // Implements the parsing rules in the Values section.
      /**
       * Value[Const] :
       *   - [~Const] Variable
       *   - IntValue
       *   - FloatValue
       *   - StringValue
       *   - BooleanValue
       *   - NullValue
       *   - EnumValue
       *   - ListValue[?Const]
       *   - ObjectValue[?Const]
       *
       * BooleanValue : one of `true` `false`
       *
       * NullValue : `null`
       *
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseValueLiteral(isConst) {
        const token = this._lexer.token;
        switch (token.kind) {
          case TokenKind.BRACKET_L:
            return this.parseList(isConst);
          case TokenKind.BRACE_L:
            return this.parseObject(isConst);
          case TokenKind.INT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.INT,
              value: token.value
            });
          case TokenKind.FLOAT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.FLOAT,
              value: token.value
            });
          case TokenKind.STRING:
          case TokenKind.BLOCK_STRING:
            return this.parseStringLiteral();
          case TokenKind.NAME:
            this.advanceLexer();
            switch (token.value) {
              case "true":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: true
                });
              case "false":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: false
                });
              case "null":
                return this.node(token, {
                  kind: Kind.NULL
                });
              default:
                return this.node(token, {
                  kind: Kind.ENUM,
                  value: token.value
                });
            }
          case TokenKind.DOLLAR:
            if (isConst) {
              this.expectToken(TokenKind.DOLLAR);
              if (this._lexer.token.kind === TokenKind.NAME) {
                const varName = this._lexer.token.value;
                throw syntaxError(
                  this._lexer.source,
                  token.start,
                  `Unexpected variable "$${varName}" in constant value.`
                );
              } else {
                throw this.unexpected(token);
              }
            }
            return this.parseVariable();
          default:
            throw this.unexpected();
        }
      }
      parseConstValueLiteral() {
        return this.parseValueLiteral(true);
      }
      parseStringLiteral() {
        const token = this._lexer.token;
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.STRING,
          value: token.value,
          block: token.kind === TokenKind.BLOCK_STRING
        });
      }
      /**
       * ListValue[Const] :
       *   - [ ]
       *   - [ Value[?Const]+ ]
       */
      parseList(isConst) {
        const item = () => this.parseValueLiteral(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.LIST,
          values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
        });
      }
      /**
       * ```
       * ObjectValue[Const] :
       *   - { }
       *   - { ObjectField[?Const]+ }
       * ```
       */
      parseObject(isConst) {
        const item = () => this.parseObjectField(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.OBJECT,
          fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
        });
      }
      /**
       * ObjectField[Const] : Name : Value[?Const]
       */
      parseObjectField(isConst) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.OBJECT_FIELD,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      // Implements the parsing rules in the Directives section.
      /**
       * Directives[Const] : Directive[?Const]+
       */
      parseDirectives(isConst) {
        const directives = [];
        while (this.peek(TokenKind.AT)) {
          directives.push(this.parseDirective(isConst));
        }
        return directives;
      }
      parseConstDirectives() {
        return this.parseDirectives(true);
      }
      /**
       * ```
       * Directive[Const] : @ Name Arguments[?Const]?
       * ```
       */
      parseDirective(isConst) {
        const start = this._lexer.token;
        this.expectToken(TokenKind.AT);
        return this.node(start, {
          kind: Kind.DIRECTIVE,
          name: this.parseName(),
          arguments: this.parseArguments(isConst)
        });
      }
      // Implements the parsing rules in the Types section.
      /**
       * Type :
       *   - NamedType
       *   - ListType
       *   - NonNullType
       */
      parseTypeReference() {
        const start = this._lexer.token;
        let type;
        if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
          const innerType = this.parseTypeReference();
          this.expectToken(TokenKind.BRACKET_R);
          type = this.node(start, {
            kind: Kind.LIST_TYPE,
            type: innerType
          });
        } else {
          type = this.parseNamedType();
        }
        if (this.expectOptionalToken(TokenKind.BANG)) {
          return this.node(start, {
            kind: Kind.NON_NULL_TYPE,
            type
          });
        }
        return type;
      }
      /**
       * NamedType : Name
       */
      parseNamedType() {
        return this.node(this._lexer.token, {
          kind: Kind.NAMED_TYPE,
          name: this.parseName()
        });
      }
      // Implements the parsing rules in the Type Definition section.
      peekDescription() {
        return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
      }
      /**
       * Description : StringValue
       */
      parseDescription() {
        if (this.peekDescription()) {
          return this.parseStringLiteral();
        }
      }
      /**
       * ```
       * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
       * ```
       */
      parseSchemaDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.many(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        return this.node(start, {
          kind: Kind.SCHEMA_DEFINITION,
          description,
          directives,
          operationTypes
        });
      }
      /**
       * OperationTypeDefinition : OperationType : NamedType
       */
      parseOperationTypeDefinition() {
        const start = this._lexer.token;
        const operation = this.parseOperationType();
        this.expectToken(TokenKind.COLON);
        const type = this.parseNamedType();
        return this.node(start, {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation,
          type
        });
      }
      /**
       * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
       */
      parseScalarTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * ObjectTypeDefinition :
       *   Description?
       *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
       */
      parseObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * ImplementsInterfaces :
       *   - implements `&`? NamedType
       *   - ImplementsInterfaces & NamedType
       */
      parseImplementsInterfaces() {
        return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
      }
      /**
       * ```
       * FieldsDefinition : { FieldDefinition+ }
       * ```
       */
      parseFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseFieldDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * FieldDefinition :
       *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
       */
      parseFieldDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.FIELD_DEFINITION,
          description,
          name,
          arguments: args,
          type,
          directives
        });
      }
      /**
       * ArgumentsDefinition : ( InputValueDefinition+ )
       */
      parseArgumentDefs() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseInputValueDef,
          TokenKind.PAREN_R
        );
      }
      /**
       * InputValueDefinition :
       *   - Description? Name : Type DefaultValue? Directives[Const]?
       */
      parseInputValueDef() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        let defaultValue;
        if (this.expectOptionalToken(TokenKind.EQUALS)) {
          defaultValue = this.parseConstValueLiteral();
        }
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description,
          name,
          type,
          defaultValue,
          directives
        });
      }
      /**
       * InterfaceTypeDefinition :
       *   - Description? interface Name Directives[Const]? FieldsDefinition?
       */
      parseInterfaceTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeDefinition :
       *   - Description? union Name Directives[Const]? UnionMemberTypes?
       */
      parseUnionTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        return this.node(start, {
          kind: Kind.UNION_TYPE_DEFINITION,
          description,
          name,
          directives,
          types
        });
      }
      /**
       * UnionMemberTypes :
       *   - = `|`? NamedType
       *   - UnionMemberTypes | NamedType
       */
      parseUnionMemberTypes() {
        return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
      }
      /**
       * EnumTypeDefinition :
       *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
       */
      parseEnumTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        return this.node(start, {
          kind: Kind.ENUM_TYPE_DEFINITION,
          description,
          name,
          directives,
          values
        });
      }
      /**
       * ```
       * EnumValuesDefinition : { EnumValueDefinition+ }
       * ```
       */
      parseEnumValuesDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseEnumValueDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * EnumValueDefinition : Description? EnumValue Directives[Const]?
       */
      parseEnumValueDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseEnumValueName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseEnumValueName() {
        if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
          throw syntaxError(
            this._lexer.source,
            this._lexer.token.start,
            `${getTokenDesc(
              this._lexer.token
            )} is reserved and cannot be used for an enum value.`
          );
        }
        return this.parseName();
      }
      /**
       * InputObjectTypeDefinition :
       *   - Description? input Name Directives[Const]? InputFieldsDefinition?
       */
      parseInputObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
          description,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * InputFieldsDefinition : { InputValueDefinition+ }
       * ```
       */
      parseInputFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseInputValueDef,
          TokenKind.BRACE_R
        );
      }
      /**
       * TypeSystemExtension :
       *   - SchemaExtension
       *   - TypeExtension
       *
       * TypeExtension :
       *   - ScalarTypeExtension
       *   - ObjectTypeExtension
       *   - InterfaceTypeExtension
       *   - UnionTypeExtension
       *   - EnumTypeExtension
       *   - InputObjectTypeDefinition
       */
      parseTypeSystemExtension() {
        const keywordToken = this._lexer.lookahead();
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaExtension();
            case "scalar":
              return this.parseScalarTypeExtension();
            case "type":
              return this.parseObjectTypeExtension();
            case "interface":
              return this.parseInterfaceTypeExtension();
            case "union":
              return this.parseUnionTypeExtension();
            case "enum":
              return this.parseEnumTypeExtension();
            case "input":
              return this.parseInputObjectTypeExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      /**
       * ```
       * SchemaExtension :
       *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
       *  - extend schema Directives[Const]
       * ```
       */
      parseSchemaExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.optionalMany(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        if (directives.length === 0 && operationTypes.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCHEMA_EXTENSION,
          directives,
          operationTypes
        });
      }
      /**
       * ScalarTypeExtension :
       *   - extend scalar Name Directives[Const]
       */
      parseScalarTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        if (directives.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_EXTENSION,
          name,
          directives
        });
      }
      /**
       * ObjectTypeExtension :
       *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend type Name ImplementsInterfaces? Directives[Const]
       *  - extend type Name ImplementsInterfaces
       */
      parseObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * InterfaceTypeExtension :
       *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend interface Name ImplementsInterfaces? Directives[Const]
       *  - extend interface Name ImplementsInterfaces
       */
      parseInterfaceTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeExtension :
       *   - extend union Name Directives[Const]? UnionMemberTypes
       *   - extend union Name Directives[Const]
       */
      parseUnionTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        if (directives.length === 0 && types.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.UNION_TYPE_EXTENSION,
          name,
          directives,
          types
        });
      }
      /**
       * EnumTypeExtension :
       *   - extend enum Name Directives[Const]? EnumValuesDefinition
       *   - extend enum Name Directives[Const]
       */
      parseEnumTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        if (directives.length === 0 && values.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.ENUM_TYPE_EXTENSION,
          name,
          directives,
          values
        });
      }
      /**
       * InputObjectTypeExtension :
       *   - extend input Name Directives[Const]? InputFieldsDefinition
       *   - extend input Name Directives[Const]
       */
      parseInputObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        if (directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * DirectiveDefinition :
       *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
       * ```
       */
      parseDirectiveDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("directive");
        this.expectToken(TokenKind.AT);
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        const repeatable = this.expectOptionalKeyword("repeatable");
        this.expectKeyword("on");
        const locations = this.parseDirectiveLocations();
        return this.node(start, {
          kind: Kind.DIRECTIVE_DEFINITION,
          description,
          name,
          arguments: args,
          repeatable,
          locations
        });
      }
      /**
       * DirectiveLocations :
       *   - `|`? DirectiveLocation
       *   - DirectiveLocations | DirectiveLocation
       */
      parseDirectiveLocations() {
        return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
      }
      /*
       * DirectiveLocation :
       *   - ExecutableDirectiveLocation
       *   - TypeSystemDirectiveLocation
       *
       * ExecutableDirectiveLocation : one of
       *   `QUERY`
       *   `MUTATION`
       *   `SUBSCRIPTION`
       *   `FIELD`
       *   `FRAGMENT_DEFINITION`
       *   `FRAGMENT_SPREAD`
       *   `INLINE_FRAGMENT`
       *
       * TypeSystemDirectiveLocation : one of
       *   `SCHEMA`
       *   `SCALAR`
       *   `OBJECT`
       *   `FIELD_DEFINITION`
       *   `ARGUMENT_DEFINITION`
       *   `INTERFACE`
       *   `UNION`
       *   `ENUM`
       *   `ENUM_VALUE`
       *   `INPUT_OBJECT`
       *   `INPUT_FIELD_DEFINITION`
       */
      parseDirectiveLocation() {
        const start = this._lexer.token;
        const name = this.parseName();
        if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
          return name;
        }
        throw this.unexpected(start);
      }
      // Core parsing utility functions
      /**
       * Returns a node that, if configured to do so, sets a "loc" field as a
       * location object, used to identify the place in the source that created a
       * given parsed object.
       */
      node(startToken, node) {
        if (this._options.noLocation !== true) {
          node.loc = new Location(
            startToken,
            this._lexer.lastToken,
            this._lexer.source
          );
        }
        return node;
      }
      /**
       * Determines if the next token is of a given kind
       */
      peek(kind) {
        return this._lexer.token.kind === kind;
      }
      /**
       * If the next token is of the given kind, return that token after advancing the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return token;
        }
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
        );
      }
      /**
       * If the next token is of the given kind, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * If the next token is a given keyword, advance the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
        } else {
          throw syntaxError(
            this._lexer.source,
            token.start,
            `Expected "${value}", found ${getTokenDesc(token)}.`
          );
        }
      }
      /**
       * If the next token is a given keyword, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * Helper function for creating an error when an unexpected lexed token is encountered.
       */
      unexpected(atToken) {
        const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return syntaxError(
          this._lexer.source,
          token.start,
          `Unexpected ${getTokenDesc(token)}.`
        );
      }
      /**
       * Returns a possibly empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        while (!this.expectOptionalToken(closeKind)) {
          nodes.push(parseFn.call(this));
        }
        return nodes;
      }
      /**
       * Returns a list of parse nodes, determined by the parseFn.
       * It can be empty only if open token is missing otherwise it will always return non-empty list
       * that begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
          const nodes = [];
          do {
            nodes.push(parseFn.call(this));
          } while (!this.expectOptionalToken(closeKind));
          return nodes;
        }
        return [];
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));
        return nodes;
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
       * Advances the parser to the next lex token after last item in the list.
       */
      delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (this.expectOptionalToken(delimiterKind));
        return nodes;
      }
      advanceLexer() {
        const { maxTokens } = this._options;
        const token = this._lexer.advance();
        if (maxTokens !== void 0 && token.kind !== TokenKind.EOF) {
          ++this._tokenCounter;
          if (this._tokenCounter > maxTokens) {
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Document contains more that ${maxTokens} tokens. Parsing aborted.`
            );
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/didYouMean.mjs
function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg ? [firstArg, secondArg] : [void 0, firstArg];
  let message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  const suggestions = suggestionsArg.map((x) => `"${x}"`);
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}
var MAX_SUGGESTIONS;
var init_didYouMean = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/didYouMean.mjs"() {
    MAX_SUGGESTIONS = 5;
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/identityFunc.mjs
function identityFunc(x) {
  return x;
}
var init_identityFunc = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/identityFunc.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/keyMap.mjs
function keyMap(list, keyFn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result[keyFn(item)] = item;
  }
  return result;
}
var init_keyMap = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/keyMap.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/keyValMap.mjs
function keyValMap(list, keyFn, valFn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result[keyFn(item)] = valFn(item);
  }
  return result;
}
var init_keyValMap = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/keyValMap.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/mapValue.mjs
function mapValue(map, fn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map)) {
    result[key] = fn(map[key], key);
  }
  return result;
}
var init_mapValue = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/mapValue.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/naturalCompare.mjs
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);
    if (isDigit2(aChar) && isDigit2(bChar)) {
      let aNum = 0;
      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit2(aChar) && aNum > 0);
      let bNum = 0;
      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit2(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIndex;
      ++bIndex;
    }
  }
  return aStr.length - bStr.length;
}
function isDigit2(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}
var DIGIT_0, DIGIT_9;
var init_naturalCompare = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/naturalCompare.mjs"() {
    DIGIT_0 = 48;
    DIGIT_9 = 57;
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/suggestionList.mjs
function suggestionList(input, options) {
  const optionsByDistance = /* @__PURE__ */ Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;
  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);
  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}
var LexicalDistance;
var init_suggestionList = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/suggestionList.mjs"() {
    init_naturalCompare();
    LexicalDistance = class {
      constructor(input) {
        this._input = input;
        this._inputLowerCase = input.toLowerCase();
        this._inputArray = stringToArray(this._inputLowerCase);
        this._rows = [
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0)
        ];
      }
      measure(option, threshold) {
        if (this._input === option) {
          return 0;
        }
        const optionLowerCase = option.toLowerCase();
        if (this._inputLowerCase === optionLowerCase) {
          return 1;
        }
        let a = stringToArray(optionLowerCase);
        let b = this._inputArray;
        if (a.length < b.length) {
          const tmp = a;
          a = b;
          b = tmp;
        }
        const aLength = a.length;
        const bLength = b.length;
        if (aLength - bLength > threshold) {
          return void 0;
        }
        const rows = this._rows;
        for (let j = 0; j <= bLength; j++) {
          rows[0][j] = j;
        }
        for (let i = 1; i <= aLength; i++) {
          const upRow = rows[(i - 1) % 3];
          const currentRow = rows[i % 3];
          let smallestCell = currentRow[0] = i;
          for (let j = 1; j <= bLength; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            let currentCell = Math.min(
              upRow[j] + 1,
              // delete
              currentRow[j - 1] + 1,
              // insert
              upRow[j - 1] + cost
              // substitute
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
              const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
              currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
            }
            if (currentCell < smallestCell) {
              smallestCell = currentCell;
            }
            currentRow[j] = currentCell;
          }
          if (smallestCell > threshold) {
            return void 0;
          }
        }
        const distance = rows[aLength % 3][bLength];
        return distance <= threshold ? distance : void 0;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/toObjMap.mjs
function toObjMap(obj) {
  if (obj == null) {
    return /* @__PURE__ */ Object.create(null);
  }
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  const map = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of Object.entries(obj)) {
    map[key] = value;
  }
  return map;
}
var init_toObjMap = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/toObjMap.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapedRegExp, escapeSequences;
var init_printString = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printString.mjs"() {
    escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
    escapeSequences = [
      "\\u0000",
      "\\u0001",
      "\\u0002",
      "\\u0003",
      "\\u0004",
      "\\u0005",
      "\\u0006",
      "\\u0007",
      "\\b",
      "\\t",
      "\\n",
      "\\u000B",
      "\\f",
      "\\r",
      "\\u000E",
      "\\u000F",
      "\\u0010",
      "\\u0011",
      "\\u0012",
      "\\u0013",
      "\\u0014",
      "\\u0015",
      "\\u0016",
      "\\u0017",
      "\\u0018",
      "\\u0019",
      "\\u001A",
      "\\u001B",
      "\\u001C",
      "\\u001D",
      "\\u001E",
      "\\u001F",
      "",
      "",
      '\\"',
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 2F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 3F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 4F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
      "",
      "",
      "",
      // 5F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 6F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\u007F",
      "\\u0080",
      "\\u0081",
      "\\u0082",
      "\\u0083",
      "\\u0084",
      "\\u0085",
      "\\u0086",
      "\\u0087",
      "\\u0088",
      "\\u0089",
      "\\u008A",
      "\\u008B",
      "\\u008C",
      "\\u008D",
      "\\u008E",
      "\\u008F",
      "\\u0090",
      "\\u0091",
      "\\u0092",
      "\\u0093",
      "\\u0094",
      "\\u0095",
      "\\u0096",
      "\\u0097",
      "\\u0098",
      "\\u0099",
      "\\u009A",
      "\\u009B",
      "\\u009C",
      "\\u009D",
      "\\u009E",
      "\\u009F"
    ];
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/visitor.mjs
function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = void 0;
  let parent = void 0;
  const path = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node)
          );
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path.push(key);
    }
    let result;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);
      if (result === BREAK) {
        break;
      }
      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== void 0) {
        edits.push([key, result]);
        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root;
}
function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = /* @__PURE__ */ Object.create(null);
  for (const kind of Object.values(Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(void 0);
    const leaveList = new Array(visitors.length).fill(void 0);
    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }
    if (!hasVisitor) {
      continue;
    }
    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;
            const result = (_enterList$i = enterList[i]) === null || _enterList$i === void 0 ? void 0 : _enterList$i.apply(visitors[i], args);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0) {
              return result;
            }
          }
        }
      },
      leave(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;
            const result = (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0 ? void 0 : _leaveList$i.apply(visitors[i], args);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0 && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      }
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }
  return mergedVisitor;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}
function getVisitFn(visitor, kind, isLeaving) {
  const { enter, leave } = getEnterLeaveForKind(visitor, kind);
  return isLeaving ? leave : enter;
}
var BREAK;
var init_visitor = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/visitor.mjs"() {
    init_devAssert();
    init_inspect();
    init_ast();
    init_kinds();
    BREAK = Object.freeze({});
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}
var MAX_LINE_LENGTH, printDocASTReducer;
var init_printer = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/printer.mjs"() {
    init_blockString();
    init_printString();
    init_visitor();
    MAX_LINE_LENGTH = 80;
    printDocASTReducer = {
      Name: {
        leave: (node) => node.value
      },
      Variable: {
        leave: (node) => "$" + node.name
      },
      // Document
      Document: {
        leave: (node) => join(node.definitions, "\n\n")
      },
      OperationDefinition: {
        leave(node) {
          const varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
          const prefix = join(
            [
              node.operation,
              join([node.name, varDefs]),
              join(node.directives, " ")
            ],
            " "
          );
          return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
        }
      },
      VariableDefinition: {
        leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
      },
      SelectionSet: {
        leave: ({ selections }) => block(selections)
      },
      Field: {
        leave({ alias, name, arguments: args, directives, selectionSet }) {
          const prefix = wrap("", alias, ": ") + name;
          let argsLine = prefix + wrap("(", join(args, ", "), ")");
          if (argsLine.length > MAX_LINE_LENGTH) {
            argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
          }
          return join([argsLine, join(directives, " "), selectionSet], " ");
        }
      },
      Argument: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Fragments
      FragmentSpread: {
        leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
      },
      InlineFragment: {
        leave: ({ typeCondition, directives, selectionSet }) => join(
          [
            "...",
            wrap("on ", typeCondition),
            join(directives, " "),
            selectionSet
          ],
          " "
        )
      },
      FragmentDefinition: {
        leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => (
          // or removed in the future.
          `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
        )
      },
      // Value
      IntValue: {
        leave: ({ value }) => value
      },
      FloatValue: {
        leave: ({ value }) => value
      },
      StringValue: {
        leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
      },
      BooleanValue: {
        leave: ({ value }) => value ? "true" : "false"
      },
      NullValue: {
        leave: () => "null"
      },
      EnumValue: {
        leave: ({ value }) => value
      },
      ListValue: {
        leave: ({ values }) => "[" + join(values, ", ") + "]"
      },
      ObjectValue: {
        leave: ({ fields }) => "{" + join(fields, ", ") + "}"
      },
      ObjectField: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Directive
      Directive: {
        leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
      },
      // Type
      NamedType: {
        leave: ({ name }) => name
      },
      ListType: {
        leave: ({ type }) => "[" + type + "]"
      },
      NonNullType: {
        leave: ({ type }) => type + "!"
      },
      // Type System Definitions
      SchemaDefinition: {
        leave: ({ description, directives, operationTypes }) => wrap("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
      },
      OperationTypeDefinition: {
        leave: ({ operation, type }) => operation + ": " + type
      },
      ScalarTypeDefinition: {
        leave: ({ description, name, directives }) => wrap("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
          [
            "type",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      FieldDefinition: {
        leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, "\n") + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
      },
      InputValueDefinition: {
        leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, "\n") + join(
          [name + ": " + type, wrap("= ", defaultValue), join(directives, " ")],
          " "
        )
      },
      InterfaceTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
          [
            "interface",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeDefinition: {
        leave: ({ description, name, directives, types }) => wrap("", description, "\n") + join(
          ["union", name, join(directives, " "), wrap("= ", join(types, " | "))],
          " "
        )
      },
      EnumTypeDefinition: {
        leave: ({ description, name, directives, values }) => wrap("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
      },
      EnumValueDefinition: {
        leave: ({ description, name, directives }) => wrap("", description, "\n") + join([name, join(directives, " ")], " ")
      },
      InputObjectTypeDefinition: {
        leave: ({ description, name, directives, fields }) => wrap("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
      },
      DirectiveDefinition: {
        leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
      },
      SchemaExtension: {
        leave: ({ directives, operationTypes }) => join(
          ["extend schema", join(directives, " "), block(operationTypes)],
          " "
        )
      },
      ScalarTypeExtension: {
        leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend type",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      InterfaceTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend interface",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeExtension: {
        leave: ({ name, directives, types }) => join(
          [
            "extend union",
            name,
            join(directives, " "),
            wrap("= ", join(types, " | "))
          ],
          " "
        )
      },
      EnumTypeExtension: {
        leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
      },
      InputObjectTypeExtension: {
        leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/valueFromASTUntyped.mjs
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(
        (node) => valueFromASTUntyped(node, variables)
      );
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
}
var init_valueFromASTUntyped = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/valueFromASTUntyped.mjs"() {
    init_keyValMap();
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/assertName.mjs
function assertName(name) {
  name != null || devAssert(false, "Must provide name.");
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.length === 0) {
    throw new GraphQLError("Expected name to be a non-empty string.");
  }
  for (let i = 1; i < name.length; ++i) {
    if (!isNameContinue(name.charCodeAt(i))) {
      throw new GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`
      );
    }
  }
  if (!isNameStart(name.charCodeAt(0))) {
    throw new GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`
    );
  }
  return name;
}
function assertEnumValueName(name) {
  if (name === "true" || name === "false" || name === "null") {
    throw new GraphQLError(`Enum values cannot be named: ${name}`);
  }
  return assertName(name);
}
var init_assertName = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/assertName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_characterClasses();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/definition.mjs
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function assertType(type) {
  if (!isType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL type.`);
  }
  return type;
}
function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function assertScalarType(type) {
  if (!isScalarType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Scalar type.`);
  }
  return type;
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function assertObjectType(type) {
  if (!isObjectType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Object type.`);
  }
  return type;
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function assertInterfaceType(type) {
  if (!isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL Interface type.`
    );
  }
  return type;
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function assertUnionType(type) {
  if (!isUnionType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Union type.`);
  }
  return type;
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function assertEnumType(type) {
  if (!isEnumType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Enum type.`);
  }
  return type;
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function assertInputObjectType(type) {
  if (!isInputObjectType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL Input Object type.`
    );
  }
  return type;
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function assertListType(type) {
  if (!isListType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL List type.`);
  }
  return type;
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
function assertNonNullType(type) {
  if (!isNonNullType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Non-Null type.`);
  }
  return type;
}
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function assertInputType(type) {
  if (!isInputType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL input type.`);
  }
  return type;
}
function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}
function assertOutputType(type) {
  if (!isOutputType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL output type.`);
  }
  return type;
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function assertLeafType(type) {
  if (!isLeafType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL leaf type.`);
  }
  return type;
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function assertCompositeType(type) {
  if (!isCompositeType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL composite type.`
    );
  }
  return type;
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function assertAbstractType(type) {
  if (!isAbstractType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL abstract type.`);
  }
  return type;
}
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function assertWrappingType(type) {
  if (!isWrappingType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL wrapping type.`);
  }
  return type;
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function assertNullableType(type) {
  if (!isNullableType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL nullable type.`);
  }
  return type;
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function isNamedType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
}
function assertNamedType(type) {
  if (!isNamedType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL named type.`);
  }
  return type;
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function defineInterfaces(config) {
  var _config$interfaces;
  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null && _config$interfaces !== void 0 ? _config$interfaces : []
  );
  Array.isArray(interfaces) || devAssert(
    false,
    `${config.name} interfaces must be an Array or a function which returns an Array.`
  );
  return interfaces;
}
function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field config must be an object.`
    );
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(
      false,
      `${config.name}.${fieldName} field resolver must be a function if provided, but got: ${inspect(fieldConfig.resolve)}.`
    );
    const argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(
      false,
      `${config.name}.${fieldName} args must be an object with argument names as keys.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: assertName(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: toObjMap(argConfig.extensions),
    astNode: argConfig.astNode
  }));
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields) {
  return mapValue(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode
  }));
}
function argsToArgsConfig(args) {
  return keyValMap(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    })
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
}
function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) || devAssert(
    false,
    `Must provide Array of types or a function which returns such an array for Union ${config.name}.`
  );
  return types;
}
function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(
    false,
    `${typeName} values must be an object with value names as keys.`
  );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) || devAssert(
      false,
      `${typeName}.${valueName} must refer to an object with a "value" key representing an internal value but got: ${inspect(valueConfig)}.`
    );
    return {
      name: assertEnumValueName(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    !("resolve" in fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}
var GraphQLList, GraphQLNonNull, GraphQLScalarType, GraphQLObjectType, GraphQLInterfaceType, GraphQLUnionType, GraphQLEnumType, GraphQLInputObjectType;
var init_definition = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/definition.mjs"() {
    init_devAssert();
    init_didYouMean();
    init_identityFunc();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_keyMap();
    init_keyValMap();
    init_mapValue();
    init_suggestionList();
    init_toObjMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_valueFromASTUntyped();
    init_assertName();
    GraphQLList = class {
      constructor(ofType) {
        isType(ofType) || devAssert(false, `Expected ${inspect(ofType)} to be a GraphQL type.`);
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLList";
      }
      toString() {
        return "[" + String(this.ofType) + "]";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLNonNull = class {
      constructor(ofType) {
        isNullableType(ofType) || devAssert(
          false,
          `Expected ${inspect(ofType)} to be a GraphQL nullable type.`
        );
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLNonNull";
      }
      toString() {
        return String(this.ofType) + "!";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLScalarType = class {
      constructor(config) {
        var _config$parseValue, _config$serialize, _config$parseLiteral, _config$extensionASTN;
        const parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
        this.name = assertName(config.name);
        this.description = config.description;
        this.specifiedByURL = config.specifiedByURL;
        this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
        this.parseValue = parseValue2;
        this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : (node, variables) => parseValue2(valueFromASTUntyped(node, variables));
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        config.specifiedByURL == null || typeof config.specifiedByURL === "string" || devAssert(
          false,
          `${this.name} must provide "specifiedByURL" as a string, but got: ${inspect(config.specifiedByURL)}.`
        );
        config.serialize == null || typeof config.serialize === "function" || devAssert(
          false,
          `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`
        );
        if (config.parseLiteral) {
          typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(
            false,
            `${this.name} must provide both "parseValue" and "parseLiteral" functions.`
          );
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLScalarType";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          specifiedByURL: this.specifiedByURL,
          serialize: this.serialize,
          parseValue: this.parseValue,
          parseLiteral: this.parseLiteral,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLObjectType = class {
      constructor(config) {
        var _config$extensionASTN2;
        this.name = assertName(config.name);
        this.description = config.description;
        this.isTypeOf = config.isTypeOf;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN2 = config.extensionASTNodes) !== null && _config$extensionASTN2 !== void 0 ? _config$extensionASTN2 : [];
        this._fields = () => defineFieldMap(config);
        this._interfaces = () => defineInterfaces(config);
        config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(
          false,
          `${this.name} must provide "isTypeOf" as a function, but got: ${inspect(config.isTypeOf)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          isTypeOf: this.isTypeOf,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInterfaceType = class {
      constructor(config) {
        var _config$extensionASTN3;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN3 = config.extensionASTNodes) !== null && _config$extensionASTN3 !== void 0 ? _config$extensionASTN3 : [];
        this._fields = defineFieldMap.bind(void 0, config);
        this._interfaces = defineInterfaces.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInterfaceType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLUnionType = class {
      constructor(config) {
        var _config$extensionASTN4;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN4 = config.extensionASTNodes) !== null && _config$extensionASTN4 !== void 0 ? _config$extensionASTN4 : [];
        this._types = defineTypes.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLUnionType";
      }
      getTypes() {
        if (typeof this._types === "function") {
          this._types = this._types();
        }
        return this._types;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          types: this.getTypes(),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLEnumType = class {
      /* <T> */
      constructor(config) {
        var _config$extensionASTN5;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN5 = config.extensionASTNodes) !== null && _config$extensionASTN5 !== void 0 ? _config$extensionASTN5 : [];
        this._values = defineEnumValues(this.name, config.values);
        this._valueLookup = new Map(
          this._values.map((enumValue) => [enumValue.value, enumValue])
        );
        this._nameLookup = keyMap(this._values, (value) => value.name);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLEnumType";
      }
      getValues() {
        return this._values;
      }
      getValue(name) {
        return this._nameLookup[name];
      }
      serialize(outputValue) {
        const enumValue = this._valueLookup.get(outputValue);
        if (enumValue === void 0) {
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent value: ${inspect(outputValue)}`
          );
        }
        return enumValue.name;
      }
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          const valueStr = inspect(inputValue);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr)
          );
        }
        const enumValue = this.getValue(inputValue);
        if (enumValue == null) {
          throw new GraphQLError(
            `Value "${inputValue}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, inputValue)
          );
        }
        return enumValue.value;
      }
      parseLiteral(valueNode, _variables) {
        if (valueNode.kind !== Kind.ENUM) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        const enumValue = this.getValue(valueNode.value);
        if (enumValue == null) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Value "${valueStr}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        return enumValue.value;
      }
      toConfig() {
        const values = keyValMap(
          this.getValues(),
          (value) => value.name,
          (value) => ({
            description: value.description,
            value: value.value,
            deprecationReason: value.deprecationReason,
            extensions: value.extensions,
            astNode: value.astNode
          })
        );
        return {
          name: this.name,
          description: this.description,
          values,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInputObjectType = class {
      constructor(config) {
        var _config$extensionASTN6;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN6 = config.extensionASTNodes) !== null && _config$extensionASTN6 !== void 0 ? _config$extensionASTN6 : [];
        this._fields = defineInputFieldMap.bind(void 0, config);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInputObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      toConfig() {
        const fields = mapValue(this.getFields(), (field) => ({
          description: field.description,
          type: field.type,
          defaultValue: field.defaultValue,
          deprecationReason: field.deprecationReason,
          extensions: field.extensions,
          astNode: field.astNode
        }));
        return {
          name: this.name,
          description: this.description,
          fields,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/typeComparators.mjs
function isEqualType(typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isNonNullType(typeA) && isNonNullType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  if (isListType(typeA) && isListType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  return false;
}
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some((type) => schema.isSubType(typeB, type));
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}
var init_typeComparators = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/typeComparators.mjs"() {
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/scalars.mjs
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
}
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
var GRAPHQL_MAX_INT, GRAPHQL_MIN_INT, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean, GraphQLID, specifiedScalarTypes;
var init_scalars = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/scalars.mjs"() {
    init_inspect();
    init_isObjectLike();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    GRAPHQL_MAX_INT = 2147483647;
    GRAPHQL_MIN_INT = -2147483648;
    GraphQLInt = new GraphQLScalarType({
      name: "Int",
      description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isInteger(num)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(coercedValue)}`
          );
        }
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            "Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue)
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isInteger(inputValue)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(inputValue)}`
          );
        }
        if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${inputValue}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        const num = parseInt(valueNode.value, 10);
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
            {
              nodes: valueNode
            }
          );
        }
        return num;
      }
    });
    GraphQLFloat = new GraphQLScalarType({
      name: "Float",
      description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isFinite(num)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(coercedValue)}`
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isFinite(inputValue)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${print(valueNode)}`,
            valueNode
          );
        }
        return parseFloat(valueNode.value);
      }
    });
    GraphQLString = new GraphQLScalarType({
      name: "String",
      description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (typeof coercedValue === "boolean") {
          return coercedValue ? "true" : "false";
        }
        if (typeof coercedValue === "number" && Number.isFinite(coercedValue)) {
          return coercedValue.toString();
        }
        throw new GraphQLError(
          `String cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          throw new GraphQLError(
            `String cannot represent a non string value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING) {
          throw new GraphQLError(
            `String cannot represent a non string value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLBoolean = new GraphQLScalarType({
      name: "Boolean",
      description: "The `Boolean` scalar type represents `true` or `false`.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue;
        }
        if (Number.isFinite(coercedValue)) {
          return coercedValue !== 0;
        }
        throw new GraphQLError(
          `Boolean cannot represent a non boolean value: ${inspect(coercedValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "boolean") {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.BOOLEAN) {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLID = new GraphQLScalarType({
      name: "ID",
      description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (Number.isInteger(coercedValue)) {
          return String(coercedValue);
        }
        throw new GraphQLError(
          `ID cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue === "string") {
          return inputValue;
        }
        if (typeof inputValue === "number" && Number.isInteger(inputValue)) {
          return inputValue.toString();
        }
        throw new GraphQLError(`ID cannot represent value: ${inspect(inputValue)}`);
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            "ID cannot represent a non-string and non-integer value: " + print(valueNode),
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    specifiedScalarTypes = Object.freeze([
      GraphQLString,
      GraphQLInt,
      GraphQLFloat,
      GraphQLBoolean,
      GraphQLID
    ]);
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/directives.mjs
function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
function assertDirective(directive) {
  if (!isDirective(directive)) {
    throw new Error(
      `Expected ${inspect(directive)} to be a GraphQL directive.`
    );
  }
  return directive;
}
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(({ name }) => name === directive.name);
}
var GraphQLDirective, GraphQLIncludeDirective, GraphQLSkipDirective, DEFAULT_DEPRECATION_REASON, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective, specifiedDirectives;
var init_directives = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/directives.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_directiveLocation();
    init_assertName();
    init_definition();
    init_scalars();
    GraphQLDirective = class {
      constructor(config) {
        var _config$isRepeatable, _config$args;
        this.name = assertName(config.name);
        this.description = config.description;
        this.locations = config.locations;
        this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        Array.isArray(config.locations) || devAssert(false, `@${config.name} locations must be an Array.`);
        const args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
        isObjectLike(args) && !Array.isArray(args) || devAssert(
          false,
          `@${config.name} args must be an object with argument names as keys.`
        );
        this.args = defineArguments(args);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLDirective";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          locations: this.locations,
          args: argsToArgsConfig(this.args),
          isRepeatable: this.isRepeatable,
          extensions: this.extensions,
          astNode: this.astNode
        };
      }
      toString() {
        return "@" + this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLIncludeDirective = new GraphQLDirective({
      name: "include",
      description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Included when true."
        }
      }
    });
    GraphQLSkipDirective = new GraphQLDirective({
      name: "skip",
      description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Skipped when true."
        }
      }
    });
    DEFAULT_DEPRECATION_REASON = "No longer supported";
    GraphQLDeprecatedDirective = new GraphQLDirective({
      name: "deprecated",
      description: "Marks an element of a GraphQL schema as no longer supported.",
      locations: [
        DirectiveLocation.FIELD_DEFINITION,
        DirectiveLocation.ARGUMENT_DEFINITION,
        DirectiveLocation.INPUT_FIELD_DEFINITION,
        DirectiveLocation.ENUM_VALUE
      ],
      args: {
        reason: {
          type: GraphQLString,
          description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
          defaultValue: DEFAULT_DEPRECATION_REASON
        }
      }
    });
    GraphQLSpecifiedByDirective = new GraphQLDirective({
      name: "specifiedBy",
      description: "Exposes a URL that specifies the behavior of this scalar.",
      locations: [DirectiveLocation.SCALAR],
      args: {
        url: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The URL that specifies the behavior of this scalar."
        }
      }
    });
    specifiedDirectives = Object.freeze([
      GraphQLIncludeDirective,
      GraphQLSkipDirective,
      GraphQLDeprecatedDirective,
      GraphQLSpecifiedByDirective
    ]);
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isIterableObject.mjs
function isIterableObject(maybeIterable) {
  return typeof maybeIterable === "object" && typeof (maybeIterable === null || maybeIterable === void 0 ? void 0 : maybeIterable[Symbol.iterator]) === "function";
}
var init_isIterableObject = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isIterableObject.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/astFromValue.mjs
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    const astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(value)) {
      const valuesNodes = [];
      for (const item of value) {
        const itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    const fieldNodes = [];
    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    const serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError(`Cannot convert value to AST: ${inspect(serialized)}.`);
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp;
var init_astFromValue = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/astFromValue.mjs"() {
    init_inspect();
    init_invariant();
    init_isIterableObject();
    init_isObjectLike();
    init_kinds();
    init_definition();
    init_scalars();
    integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/introspection.mjs
function isIntrospectionType(type) {
  return introspectionTypes.some(({ name }) => type.name === name);
}
var __Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, TypeKind, __TypeKind, SchemaMetaFieldDef, TypeMetaFieldDef, TypeNameMetaFieldDef, introspectionTypes;
var init_introspection = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/introspection.mjs"() {
    init_inspect();
    init_invariant();
    init_directiveLocation();
    init_printer();
    init_astFromValue();
    init_definition();
    init_scalars();
    __Schema = new GraphQLObjectType({
      name: "__Schema",
      description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
      fields: () => ({
        description: {
          type: GraphQLString,
          resolve: (schema) => schema.description
        },
        types: {
          description: "A list of all types supported by this server.",
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
          resolve(schema) {
            return Object.values(schema.getTypeMap());
          }
        },
        queryType: {
          description: "The type that query operations will be rooted at.",
          type: new GraphQLNonNull(__Type),
          resolve: (schema) => schema.getQueryType()
        },
        mutationType: {
          description: "If this server supports mutation, the type that mutation operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getMutationType()
        },
        subscriptionType: {
          description: "If this server support subscription, the type that subscription operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getSubscriptionType()
        },
        directives: {
          description: "A list of all directives supported by this server.",
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__Directive))
          ),
          resolve: (schema) => schema.getDirectives()
        }
      })
    });
    __Directive = new GraphQLObjectType({
      name: "__Directive",
      description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (directive) => directive.name
        },
        description: {
          type: GraphQLString,
          resolve: (directive) => directive.description
        },
        isRepeatable: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (directive) => directive.isRepeatable
        },
        locations: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__DirectiveLocation))
          ),
          resolve: (directive) => directive.locations
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        }
      })
    });
    __DirectiveLocation = new GraphQLEnumType({
      name: "__DirectiveLocation",
      description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
      values: {
        QUERY: {
          value: DirectiveLocation.QUERY,
          description: "Location adjacent to a query operation."
        },
        MUTATION: {
          value: DirectiveLocation.MUTATION,
          description: "Location adjacent to a mutation operation."
        },
        SUBSCRIPTION: {
          value: DirectiveLocation.SUBSCRIPTION,
          description: "Location adjacent to a subscription operation."
        },
        FIELD: {
          value: DirectiveLocation.FIELD,
          description: "Location adjacent to a field."
        },
        FRAGMENT_DEFINITION: {
          value: DirectiveLocation.FRAGMENT_DEFINITION,
          description: "Location adjacent to a fragment definition."
        },
        FRAGMENT_SPREAD: {
          value: DirectiveLocation.FRAGMENT_SPREAD,
          description: "Location adjacent to a fragment spread."
        },
        INLINE_FRAGMENT: {
          value: DirectiveLocation.INLINE_FRAGMENT,
          description: "Location adjacent to an inline fragment."
        },
        VARIABLE_DEFINITION: {
          value: DirectiveLocation.VARIABLE_DEFINITION,
          description: "Location adjacent to a variable definition."
        },
        SCHEMA: {
          value: DirectiveLocation.SCHEMA,
          description: "Location adjacent to a schema definition."
        },
        SCALAR: {
          value: DirectiveLocation.SCALAR,
          description: "Location adjacent to a scalar definition."
        },
        OBJECT: {
          value: DirectiveLocation.OBJECT,
          description: "Location adjacent to an object type definition."
        },
        FIELD_DEFINITION: {
          value: DirectiveLocation.FIELD_DEFINITION,
          description: "Location adjacent to a field definition."
        },
        ARGUMENT_DEFINITION: {
          value: DirectiveLocation.ARGUMENT_DEFINITION,
          description: "Location adjacent to an argument definition."
        },
        INTERFACE: {
          value: DirectiveLocation.INTERFACE,
          description: "Location adjacent to an interface definition."
        },
        UNION: {
          value: DirectiveLocation.UNION,
          description: "Location adjacent to a union definition."
        },
        ENUM: {
          value: DirectiveLocation.ENUM,
          description: "Location adjacent to an enum definition."
        },
        ENUM_VALUE: {
          value: DirectiveLocation.ENUM_VALUE,
          description: "Location adjacent to an enum value definition."
        },
        INPUT_OBJECT: {
          value: DirectiveLocation.INPUT_OBJECT,
          description: "Location adjacent to an input object type definition."
        },
        INPUT_FIELD_DEFINITION: {
          value: DirectiveLocation.INPUT_FIELD_DEFINITION,
          description: "Location adjacent to an input object field definition."
        }
      }
    });
    __Type = new GraphQLObjectType({
      name: "__Type",
      description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
      fields: () => ({
        kind: {
          type: new GraphQLNonNull(__TypeKind),
          resolve(type) {
            if (isScalarType(type)) {
              return TypeKind.SCALAR;
            }
            if (isObjectType(type)) {
              return TypeKind.OBJECT;
            }
            if (isInterfaceType(type)) {
              return TypeKind.INTERFACE;
            }
            if (isUnionType(type)) {
              return TypeKind.UNION;
            }
            if (isEnumType(type)) {
              return TypeKind.ENUM;
            }
            if (isInputObjectType(type)) {
              return TypeKind.INPUT_OBJECT;
            }
            if (isListType(type)) {
              return TypeKind.LIST;
            }
            if (isNonNullType(type)) {
              return TypeKind.NON_NULL;
            }
            invariant(false, `Unexpected type: "${inspect(type)}".`);
          }
        },
        name: {
          type: GraphQLString,
          resolve: (type) => "name" in type ? type.name : void 0
        },
        description: {
          type: GraphQLString,
          resolve: (type) => (
            /* c8 ignore next */
            "description" in type ? type.description : void 0
          )
        },
        specifiedByURL: {
          type: GraphQLString,
          resolve: (obj) => "specifiedByURL" in obj ? obj.specifiedByURL : void 0
        },
        fields: {
          type: new GraphQLList(new GraphQLNonNull(__Field)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isObjectType(type) || isInterfaceType(type)) {
              const fields = Object.values(type.getFields());
              return includeDeprecated ? fields : fields.filter((field) => field.deprecationReason == null);
            }
          }
        },
        interfaces: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type) {
            if (isObjectType(type) || isInterfaceType(type)) {
              return type.getInterfaces();
            }
          }
        },
        possibleTypes: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type, _args, _context, { schema }) {
            if (isAbstractType(type)) {
              return schema.getPossibleTypes(type);
            }
          }
        },
        enumValues: {
          type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isEnumType(type)) {
              const values = type.getValues();
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        inputFields: {
          type: new GraphQLList(new GraphQLNonNull(__InputValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isInputObjectType(type)) {
              const values = Object.values(type.getFields());
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        ofType: {
          type: __Type,
          resolve: (type) => "ofType" in type ? type.ofType : void 0
        }
      })
    });
    __Field = new GraphQLObjectType({
      name: "__Field",
      description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (field) => field.name
        },
        description: {
          type: GraphQLString,
          resolve: (field) => field.description
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (field) => field.type
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (field) => field.deprecationReason
        }
      })
    });
    __InputValue = new GraphQLObjectType({
      name: "__InputValue",
      description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (inputValue) => inputValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (inputValue) => inputValue.description
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (inputValue) => inputValue.type
        },
        defaultValue: {
          type: GraphQLString,
          description: "A GraphQL-formatted string representing the default value for this input value.",
          resolve(inputValue) {
            const { type, defaultValue } = inputValue;
            const valueAST = astFromValue(defaultValue, type);
            return valueAST ? print(valueAST) : null;
          }
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (obj) => obj.deprecationReason
        }
      })
    });
    __EnumValue = new GraphQLObjectType({
      name: "__EnumValue",
      description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (enumValue) => enumValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.description
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (enumValue) => enumValue.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.deprecationReason
        }
      })
    });
    (function(TypeKind2) {
      TypeKind2["SCALAR"] = "SCALAR";
      TypeKind2["OBJECT"] = "OBJECT";
      TypeKind2["INTERFACE"] = "INTERFACE";
      TypeKind2["UNION"] = "UNION";
      TypeKind2["ENUM"] = "ENUM";
      TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
      TypeKind2["LIST"] = "LIST";
      TypeKind2["NON_NULL"] = "NON_NULL";
    })(TypeKind || (TypeKind = {}));
    __TypeKind = new GraphQLEnumType({
      name: "__TypeKind",
      description: "An enum describing what kind of type a given `__Type` is.",
      values: {
        SCALAR: {
          value: TypeKind.SCALAR,
          description: "Indicates this type is a scalar."
        },
        OBJECT: {
          value: TypeKind.OBJECT,
          description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
        },
        INTERFACE: {
          value: TypeKind.INTERFACE,
          description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
        },
        UNION: {
          value: TypeKind.UNION,
          description: "Indicates this type is a union. `possibleTypes` is a valid field."
        },
        ENUM: {
          value: TypeKind.ENUM,
          description: "Indicates this type is an enum. `enumValues` is a valid field."
        },
        INPUT_OBJECT: {
          value: TypeKind.INPUT_OBJECT,
          description: "Indicates this type is an input object. `inputFields` is a valid field."
        },
        LIST: {
          value: TypeKind.LIST,
          description: "Indicates this type is a list. `ofType` is a valid field."
        },
        NON_NULL: {
          value: TypeKind.NON_NULL,
          description: "Indicates this type is a non-null. `ofType` is a valid field."
        }
      }
    });
    SchemaMetaFieldDef = {
      name: "__schema",
      type: new GraphQLNonNull(__Schema),
      description: "Access the current type schema of this server.",
      args: [],
      resolve: (_source, _args, _context, { schema }) => schema,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeMetaFieldDef = {
      name: "__type",
      type: __Type,
      description: "Request the type information of a single type.",
      args: [
        {
          name: "name",
          description: void 0,
          type: new GraphQLNonNull(GraphQLString),
          defaultValue: void 0,
          deprecationReason: void 0,
          extensions: /* @__PURE__ */ Object.create(null),
          astNode: void 0
        }
      ],
      resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeNameMetaFieldDef = {
      name: "__typename",
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the current Object type at runtime.",
      args: [],
      resolve: (_source, _args, _context, { parentType }) => parentType.name,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    introspectionTypes = Object.freeze([
      __Schema,
      __Directive,
      __DirectiveLocation,
      __Type,
      __Field,
      __InputValue,
      __EnumValue,
      __TypeKind
    ]);
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/schema.mjs
function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error(`Expected ${inspect(schema)} to be a GraphQL schema.`);
  }
  return schema;
}
function collectReferencedTypes(type, typeSet) {
  const namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }
  return typeSet;
}
var GraphQLSchema;
var init_schema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/schema.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_ast();
    init_definition();
    init_directives();
    init_introspection();
    GraphQLSchema = class {
      // Used as a cache for validateSchema().
      constructor(config) {
        var _config$extensionASTN, _config$directives;
        this.__validationErrors = config.assumeValid === true ? [] : void 0;
        isObjectLike(config) || devAssert(false, "Must provide configuration object.");
        !config.types || Array.isArray(config.types) || devAssert(
          false,
          `"types" must be Array if provided but got: ${inspect(config.types)}.`
        );
        !config.directives || Array.isArray(config.directives) || devAssert(
          false,
          `"directives" must be Array if provided but got: ${inspect(config.directives)}.`
        );
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        this._queryType = config.query;
        this._mutationType = config.mutation;
        this._subscriptionType = config.subscription;
        this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
        const allReferencedTypes = new Set(config.types);
        if (config.types != null) {
          for (const type of config.types) {
            allReferencedTypes.delete(type);
            collectReferencedTypes(type, allReferencedTypes);
          }
        }
        if (this._queryType != null) {
          collectReferencedTypes(this._queryType, allReferencedTypes);
        }
        if (this._mutationType != null) {
          collectReferencedTypes(this._mutationType, allReferencedTypes);
        }
        if (this._subscriptionType != null) {
          collectReferencedTypes(this._subscriptionType, allReferencedTypes);
        }
        for (const directive of this._directives) {
          if (isDirective(directive)) {
            for (const arg of directive.args) {
              collectReferencedTypes(arg.type, allReferencedTypes);
            }
          }
        }
        collectReferencedTypes(__Schema, allReferencedTypes);
        this._typeMap = /* @__PURE__ */ Object.create(null);
        this._subTypeMap = /* @__PURE__ */ Object.create(null);
        this._implementationsMap = /* @__PURE__ */ Object.create(null);
        for (const namedType of allReferencedTypes) {
          if (namedType == null) {
            continue;
          }
          const typeName = namedType.name;
          typeName || devAssert(
            false,
            "One of the provided types for building the Schema is missing a name."
          );
          if (this._typeMap[typeName] !== void 0) {
            throw new Error(
              `Schema must contain uniquely named types but contains multiple types named "${typeName}".`
            );
          }
          this._typeMap[typeName] = namedType;
          if (isInterfaceType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.interfaces.push(namedType);
              }
            }
          } else if (isObjectType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.objects.push(namedType);
              }
            }
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLSchema";
      }
      getQueryType() {
        return this._queryType;
      }
      getMutationType() {
        return this._mutationType;
      }
      getSubscriptionType() {
        return this._subscriptionType;
      }
      getRootType(operation) {
        switch (operation) {
          case OperationTypeNode.QUERY:
            return this.getQueryType();
          case OperationTypeNode.MUTATION:
            return this.getMutationType();
          case OperationTypeNode.SUBSCRIPTION:
            return this.getSubscriptionType();
        }
      }
      getTypeMap() {
        return this._typeMap;
      }
      getType(name) {
        return this.getTypeMap()[name];
      }
      getPossibleTypes(abstractType) {
        return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
      }
      getImplementations(interfaceType) {
        const implementations = this._implementationsMap[interfaceType.name];
        return implementations !== null && implementations !== void 0 ? implementations : {
          objects: [],
          interfaces: []
        };
      }
      isSubType(abstractType, maybeSubType) {
        let map = this._subTypeMap[abstractType.name];
        if (map === void 0) {
          map = /* @__PURE__ */ Object.create(null);
          if (isUnionType(abstractType)) {
            for (const type of abstractType.getTypes()) {
              map[type.name] = true;
            }
          } else {
            const implementations = this.getImplementations(abstractType);
            for (const type of implementations.objects) {
              map[type.name] = true;
            }
            for (const type of implementations.interfaces) {
              map[type.name] = true;
            }
          }
          this._subTypeMap[abstractType.name] = map;
        }
        return map[maybeSubType.name] !== void 0;
      }
      getDirectives() {
        return this._directives;
      }
      getDirective(name) {
        return this.getDirectives().find((directive) => directive.name === name);
      }
      toConfig() {
        return {
          description: this.description,
          query: this.getQueryType(),
          mutation: this.getMutationType(),
          subscription: this.getSubscriptionType(),
          types: Object.values(this.getTypeMap()),
          directives: this.getDirectives(),
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes,
          assumeValid: this.__validationErrors !== void 0
        };
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/validate.mjs
function validateSchema(schema) {
  assertSchema(schema);
  if (schema.__validationErrors) {
    return schema.__validationErrors;
  }
  const context2 = new SchemaValidationContext(schema);
  validateRootTypes(context2);
  validateDirectives(context2);
  validateTypes(context2);
  const errors = context2.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
function assertValidSchema(schema) {
  const errors = validateSchema(schema);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
function validateRootTypes(context2) {
  const schema = context2.schema;
  const queryType = schema.getQueryType();
  if (!queryType) {
    context2.reportError("Query root type must be provided.", schema.astNode);
  } else if (!isObjectType(queryType)) {
    var _getOperationTypeNode;
    context2.reportError(
      `Query root type must be Object type, it cannot be ${inspect(
        queryType
      )}.`,
      (_getOperationTypeNode = getOperationTypeNode(
        schema,
        OperationTypeNode.QUERY
      )) !== null && _getOperationTypeNode !== void 0 ? _getOperationTypeNode : queryType.astNode
    );
  }
  const mutationType = schema.getMutationType();
  if (mutationType && !isObjectType(mutationType)) {
    var _getOperationTypeNode2;
    context2.reportError(
      `Mutation root type must be Object type if provided, it cannot be ${inspect(mutationType)}.`,
      (_getOperationTypeNode2 = getOperationTypeNode(
        schema,
        OperationTypeNode.MUTATION
      )) !== null && _getOperationTypeNode2 !== void 0 ? _getOperationTypeNode2 : mutationType.astNode
    );
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && !isObjectType(subscriptionType)) {
    var _getOperationTypeNode3;
    context2.reportError(
      `Subscription root type must be Object type if provided, it cannot be ${inspect(subscriptionType)}.`,
      (_getOperationTypeNode3 = getOperationTypeNode(
        schema,
        OperationTypeNode.SUBSCRIPTION
      )) !== null && _getOperationTypeNode3 !== void 0 ? _getOperationTypeNode3 : subscriptionType.astNode
    );
  }
}
function getOperationTypeNode(schema, operation) {
  var _flatMap$find;
  return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes].flatMap(
    // FIXME: https://github.com/graphql/graphql-js/issues/2203
    (schemaNode) => {
      var _schemaNode$operation;
      return (
        /* c8 ignore next */
        (_schemaNode$operation = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.operationTypes) !== null && _schemaNode$operation !== void 0 ? _schemaNode$operation : []
      );
    }
  ).find((operationNode) => operationNode.operation === operation)) === null || _flatMap$find === void 0 ? void 0 : _flatMap$find.type;
}
function validateDirectives(context2) {
  for (const directive of context2.schema.getDirectives()) {
    if (!isDirective(directive)) {
      context2.reportError(
        `Expected directive but got: ${inspect(directive)}.`,
        directive === null || directive === void 0 ? void 0 : directive.astNode
      );
      continue;
    }
    validateName(context2, directive);
    for (const arg of directive.args) {
      validateName(context2, arg);
      if (!isInputType(arg.type)) {
        context2.reportError(
          `The type of @${directive.name}(${arg.name}:) must be Input Type but got: ${inspect(arg.type)}.`,
          arg.astNode
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode;
        context2.reportError(
          `Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0 ? void 0 : _arg$astNode.type
          ]
        );
      }
    }
  }
}
function validateName(context2, node) {
  if (node.name.startsWith("__")) {
    context2.reportError(
      `Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`,
      node.astNode
    );
  }
}
function validateTypes(context2) {
  const validateInputObjectCircularRefs = createInputObjectCircularRefsValidator(context2);
  const typeMap = context2.schema.getTypeMap();
  for (const type of Object.values(typeMap)) {
    if (!isNamedType(type)) {
      context2.reportError(
        `Expected GraphQL named type but got: ${inspect(type)}.`,
        type.astNode
      );
      continue;
    }
    if (!isIntrospectionType(type)) {
      validateName(context2, type);
    }
    if (isObjectType(type)) {
      validateFields(context2, type);
      validateInterfaces(context2, type);
    } else if (isInterfaceType(type)) {
      validateFields(context2, type);
      validateInterfaces(context2, type);
    } else if (isUnionType(type)) {
      validateUnionMembers(context2, type);
    } else if (isEnumType(type)) {
      validateEnumValues(context2, type);
    } else if (isInputObjectType(type)) {
      validateInputFields(context2, type);
      validateInputObjectCircularRefs(type);
    }
  }
}
function validateFields(context2, type) {
  const fields = Object.values(type.getFields());
  if (fields.length === 0) {
    context2.reportError(`Type ${type.name} must define one or more fields.`, [
      type.astNode,
      ...type.extensionASTNodes
    ]);
  }
  for (const field of fields) {
    validateName(context2, field);
    if (!isOutputType(field.type)) {
      var _field$astNode;
      context2.reportError(
        `The type of ${type.name}.${field.name} must be Output Type but got: ${inspect(field.type)}.`,
        (_field$astNode = field.astNode) === null || _field$astNode === void 0 ? void 0 : _field$astNode.type
      );
    }
    for (const arg of field.args) {
      const argName = arg.name;
      validateName(context2, arg);
      if (!isInputType(arg.type)) {
        var _arg$astNode2;
        context2.reportError(
          `The type of ${type.name}.${field.name}(${argName}:) must be Input Type but got: ${inspect(arg.type)}.`,
          (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0 ? void 0 : _arg$astNode2.type
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;
        context2.reportError(
          `Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0 ? void 0 : _arg$astNode3.type
          ]
        );
      }
    }
  }
}
function validateInterfaces(context2, type) {
  const ifaceTypeNames = /* @__PURE__ */ Object.create(null);
  for (const iface of type.getInterfaces()) {
    if (!isInterfaceType(iface)) {
      context2.reportError(
        `Type ${inspect(type)} must only implement Interface types, it cannot implement ${inspect(iface)}.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (type === iface) {
      context2.reportError(
        `Type ${type.name} cannot implement itself because it would create a circular reference.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (ifaceTypeNames[iface.name]) {
      context2.reportError(
        `Type ${type.name} can only implement ${iface.name} once.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context2, type, iface);
    validateTypeImplementsInterface(context2, type, iface);
  }
}
function validateTypeImplementsInterface(context2, type, iface) {
  const typeFieldMap = type.getFields();
  for (const ifaceField of Object.values(iface.getFields())) {
    const fieldName = ifaceField.name;
    const typeField = typeFieldMap[fieldName];
    if (!typeField) {
      context2.reportError(
        `Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`,
        [ifaceField.astNode, type.astNode, ...type.extensionASTNodes]
      );
      continue;
    }
    if (!isTypeSubTypeOf(context2.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;
      context2.reportError(
        `Interface field ${iface.name}.${fieldName} expects type ${inspect(ifaceField.type)} but ${type.name}.${fieldName} is type ${inspect(typeField.type)}.`,
        [
          (_ifaceField$astNode = ifaceField.astNode) === null || _ifaceField$astNode === void 0 ? void 0 : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null || _typeField$astNode === void 0 ? void 0 : _typeField$astNode.type
        ]
      );
    }
    for (const ifaceArg of ifaceField.args) {
      const argName = ifaceArg.name;
      const typeArg = typeField.args.find((arg) => arg.name === argName);
      if (!typeArg) {
        context2.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`,
          [ifaceArg.astNode, typeField.astNode]
        );
        continue;
      }
      if (!isEqualType(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;
        context2.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expects type ${inspect(ifaceArg.type)} but ${type.name}.${fieldName}(${argName}:) is type ${inspect(typeArg.type)}.`,
          [
            (_ifaceArg$astNode = ifaceArg.astNode) === null || _ifaceArg$astNode === void 0 ? void 0 : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null || _typeArg$astNode === void 0 ? void 0 : _typeArg$astNode.type
          ]
        );
      }
    }
    for (const typeArg of typeField.args) {
      const argName = typeArg.name;
      const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);
      if (!ifaceArg && isRequiredArgument(typeArg)) {
        context2.reportError(
          `Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`,
          [typeArg.astNode, ifaceField.astNode]
        );
      }
    }
  }
}
function validateTypeImplementsAncestors(context2, type, iface) {
  const ifaceInterfaces = type.getInterfaces();
  for (const transitive of iface.getInterfaces()) {
    if (!ifaceInterfaces.includes(transitive)) {
      context2.reportError(
        transitive === type ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.` : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`,
        [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface)
        ]
      );
    }
  }
}
function validateUnionMembers(context2, union) {
  const memberTypes = union.getTypes();
  if (memberTypes.length === 0) {
    context2.reportError(
      `Union type ${union.name} must define one or more member types.`,
      [union.astNode, ...union.extensionASTNodes]
    );
  }
  const includedTypeNames = /* @__PURE__ */ Object.create(null);
  for (const memberType of memberTypes) {
    if (includedTypeNames[memberType.name]) {
      context2.reportError(
        `Union type ${union.name} can only include type ${memberType.name} once.`,
        getUnionMemberTypeNodes(union, memberType.name)
      );
      continue;
    }
    includedTypeNames[memberType.name] = true;
    if (!isObjectType(memberType)) {
      context2.reportError(
        `Union type ${union.name} can only include Object types, it cannot include ${inspect(memberType)}.`,
        getUnionMemberTypeNodes(union, String(memberType))
      );
    }
  }
}
function validateEnumValues(context2, enumType) {
  const enumValues = enumType.getValues();
  if (enumValues.length === 0) {
    context2.reportError(
      `Enum type ${enumType.name} must define one or more values.`,
      [enumType.astNode, ...enumType.extensionASTNodes]
    );
  }
  for (const enumValue of enumValues) {
    validateName(context2, enumValue);
  }
}
function validateInputFields(context2, inputObj) {
  const fields = Object.values(inputObj.getFields());
  if (fields.length === 0) {
    context2.reportError(
      `Input Object type ${inputObj.name} must define one or more fields.`,
      [inputObj.astNode, ...inputObj.extensionASTNodes]
    );
  }
  for (const field of fields) {
    validateName(context2, field);
    if (!isInputType(field.type)) {
      var _field$astNode2;
      context2.reportError(
        `The type of ${inputObj.name}.${field.name} must be Input Type but got: ${inspect(field.type)}.`,
        (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0 ? void 0 : _field$astNode2.type
      );
    }
    if (isRequiredInputField(field) && field.deprecationReason != null) {
      var _field$astNode3;
      context2.reportError(
        `Required input field ${inputObj.name}.${field.name} cannot be deprecated.`,
        [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null || _field$astNode3 === void 0 ? void 0 : _field$astNode3.type
        ]
      );
    }
  }
}
function createInputObjectCircularRefsValidator(context2) {
  const visitedTypes = /* @__PURE__ */ Object.create(null);
  const fieldPath = [];
  const fieldPathIndexByTypeName = /* @__PURE__ */ Object.create(null);
  return detectCycleRecursive;
  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }
    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    const fields = Object.values(inputObj.getFields());
    for (const field of fields) {
      if (isNonNullType(field.type) && isInputObjectType(field.type.ofType)) {
        const fieldType = field.type.ofType;
        const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);
        if (cycleIndex === void 0) {
          detectCycleRecursive(fieldType);
        } else {
          const cyclePath = fieldPath.slice(cycleIndex);
          const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join(".");
          context2.reportError(
            `Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`,
            cyclePath.map((fieldObj) => fieldObj.astNode)
          );
        }
        fieldPath.pop();
      }
    }
    fieldPathIndexByTypeName[inputObj.name] = void 0;
  }
}
function getAllImplementsInterfaceNodes(type, iface) {
  const { astNode, extensionASTNodes } = type;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((typeNode) => {
    var _typeNode$interfaces;
    return (
      /* c8 ignore next */
      (_typeNode$interfaces = typeNode.interfaces) !== null && _typeNode$interfaces !== void 0 ? _typeNode$interfaces : []
    );
  }).filter((ifaceNode) => ifaceNode.name.value === iface.name);
}
function getUnionMemberTypeNodes(union, typeName) {
  const { astNode, extensionASTNodes } = union;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((unionNode) => {
    var _unionNode$types;
    return (
      /* c8 ignore next */
      (_unionNode$types = unionNode.types) !== null && _unionNode$types !== void 0 ? _unionNode$types : []
    );
  }).filter((typeNode) => typeNode.name.value === typeName);
}
function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;
  return definitionNode === null || definitionNode === void 0 ? void 0 : (_definitionNode$direc = definitionNode.directives) === null || _definitionNode$direc === void 0 ? void 0 : _definitionNode$direc.find(
    (node) => node.name.value === GraphQLDeprecatedDirective.name
  );
}
var SchemaValidationContext;
var init_validate = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/validate.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_ast();
    init_typeComparators();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
    SchemaValidationContext = class {
      constructor(schema) {
        this._errors = [];
        this.schema = schema;
      }
      reportError(message, nodes) {
        const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;
        this._errors.push(
          new GraphQLError(message, {
            nodes: _nodes
          })
        );
      }
      getErrors() {
        return this._errors;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/typeFromAST.mjs
function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLList(innerType);
    }
    case Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLNonNull(innerType);
    }
    case Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}
var init_typeFromAST = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/typeFromAST.mjs"() {
    init_kinds();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/TypeInfo.mjs
function getFieldDef(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;
  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  }
  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }
  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }
  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = getEnterLeaveForKind(visitor, node.kind).enter;
      if (fn) {
        const result = fn.apply(visitor, args);
        if (result !== void 0) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave(...args) {
      const node = args[0];
      const fn = getEnterLeaveForKind(visitor, node.kind).leave;
      let result;
      if (fn) {
        result = fn.apply(visitor, args);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}
var TypeInfo;
var init_TypeInfo = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/TypeInfo.mjs"() {
    init_ast();
    init_kinds();
    init_visitor();
    init_definition();
    init_introspection();
    init_typeFromAST();
    TypeInfo = class {
      constructor(schema, initialType, getFieldDefFn) {
        this._schema = schema;
        this._typeStack = [];
        this._parentTypeStack = [];
        this._inputTypeStack = [];
        this._fieldDefStack = [];
        this._defaultValueStack = [];
        this._directive = null;
        this._argument = null;
        this._enumValue = null;
        this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== void 0 ? getFieldDefFn : getFieldDef;
        if (initialType) {
          if (isInputType(initialType)) {
            this._inputTypeStack.push(initialType);
          }
          if (isCompositeType(initialType)) {
            this._parentTypeStack.push(initialType);
          }
          if (isOutputType(initialType)) {
            this._typeStack.push(initialType);
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "TypeInfo";
      }
      getType() {
        if (this._typeStack.length > 0) {
          return this._typeStack[this._typeStack.length - 1];
        }
      }
      getParentType() {
        if (this._parentTypeStack.length > 0) {
          return this._parentTypeStack[this._parentTypeStack.length - 1];
        }
      }
      getInputType() {
        if (this._inputTypeStack.length > 0) {
          return this._inputTypeStack[this._inputTypeStack.length - 1];
        }
      }
      getParentInputType() {
        if (this._inputTypeStack.length > 1) {
          return this._inputTypeStack[this._inputTypeStack.length - 2];
        }
      }
      getFieldDef() {
        if (this._fieldDefStack.length > 0) {
          return this._fieldDefStack[this._fieldDefStack.length - 1];
        }
      }
      getDefaultValue() {
        if (this._defaultValueStack.length > 0) {
          return this._defaultValueStack[this._defaultValueStack.length - 1];
        }
      }
      getDirective() {
        return this._directive;
      }
      getArgument() {
        return this._argument;
      }
      getEnumValue() {
        return this._enumValue;
      }
      enter(node) {
        const schema = this._schema;
        switch (node.kind) {
          case Kind.SELECTION_SET: {
            const namedType = getNamedType(this.getType());
            this._parentTypeStack.push(
              isCompositeType(namedType) ? namedType : void 0
            );
            break;
          }
          case Kind.FIELD: {
            const parentType = this.getParentType();
            let fieldDef;
            let fieldType;
            if (parentType) {
              fieldDef = this._getFieldDef(schema, parentType, node);
              if (fieldDef) {
                fieldType = fieldDef.type;
              }
            }
            this._fieldDefStack.push(fieldDef);
            this._typeStack.push(isOutputType(fieldType) ? fieldType : void 0);
            break;
          }
          case Kind.DIRECTIVE:
            this._directive = schema.getDirective(node.name.value);
            break;
          case Kind.OPERATION_DEFINITION: {
            const rootType = schema.getRootType(node.operation);
            this._typeStack.push(isObjectType(rootType) ? rootType : void 0);
            break;
          }
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION: {
            const typeConditionAST = node.typeCondition;
            const outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());
            this._typeStack.push(isOutputType(outputType) ? outputType : void 0);
            break;
          }
          case Kind.VARIABLE_DEFINITION: {
            const inputType = typeFromAST(schema, node.type);
            this._inputTypeStack.push(
              isInputType(inputType) ? inputType : void 0
            );
            break;
          }
          case Kind.ARGUMENT: {
            var _this$getDirective;
            let argDef;
            let argType;
            const fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== void 0 ? _this$getDirective : this.getFieldDef();
            if (fieldOrDirective) {
              argDef = fieldOrDirective.args.find(
                (arg) => arg.name === node.name.value
              );
              if (argDef) {
                argType = argDef.type;
              }
            }
            this._argument = argDef;
            this._defaultValueStack.push(argDef ? argDef.defaultValue : void 0);
            this._inputTypeStack.push(isInputType(argType) ? argType : void 0);
            break;
          }
          case Kind.LIST: {
            const listType = getNullableType(this.getInputType());
            const itemType = isListType(listType) ? listType.ofType : listType;
            this._defaultValueStack.push(void 0);
            this._inputTypeStack.push(isInputType(itemType) ? itemType : void 0);
            break;
          }
          case Kind.OBJECT_FIELD: {
            const objectType = getNamedType(this.getInputType());
            let inputFieldType;
            let inputField;
            if (isInputObjectType(objectType)) {
              inputField = objectType.getFields()[node.name.value];
              if (inputField) {
                inputFieldType = inputField.type;
              }
            }
            this._defaultValueStack.push(
              inputField ? inputField.defaultValue : void 0
            );
            this._inputTypeStack.push(
              isInputType(inputFieldType) ? inputFieldType : void 0
            );
            break;
          }
          case Kind.ENUM: {
            const enumType = getNamedType(this.getInputType());
            let enumValue;
            if (isEnumType(enumType)) {
              enumValue = enumType.getValue(node.value);
            }
            this._enumValue = enumValue;
            break;
          }
          default:
        }
      }
      leave(node) {
        switch (node.kind) {
          case Kind.SELECTION_SET:
            this._parentTypeStack.pop();
            break;
          case Kind.FIELD:
            this._fieldDefStack.pop();
            this._typeStack.pop();
            break;
          case Kind.DIRECTIVE:
            this._directive = null;
            break;
          case Kind.OPERATION_DEFINITION:
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION:
            this._typeStack.pop();
            break;
          case Kind.VARIABLE_DEFINITION:
            this._inputTypeStack.pop();
            break;
          case Kind.ARGUMENT:
            this._argument = null;
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.LIST:
          case Kind.OBJECT_FIELD:
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.ENUM:
            this._enumValue = null;
            break;
          default:
        }
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/predicates.mjs
function isDefinitionNode(node) {
  return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
}
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isSelectionNode(node) {
  return node.kind === Kind.FIELD || node.kind === Kind.FRAGMENT_SPREAD || node.kind === Kind.INLINE_FRAGMENT;
}
function isValueNode(node) {
  return node.kind === Kind.VARIABLE || node.kind === Kind.INT || node.kind === Kind.FLOAT || node.kind === Kind.STRING || node.kind === Kind.BOOLEAN || node.kind === Kind.NULL || node.kind === Kind.ENUM || node.kind === Kind.LIST || node.kind === Kind.OBJECT;
}
function isConstValueNode(node) {
  return isValueNode(node) && (node.kind === Kind.LIST ? node.values.some(isConstValueNode) : node.kind === Kind.OBJECT ? node.fields.some((field) => isConstValueNode(field.value)) : node.kind !== Kind.VARIABLE);
}
function isTypeNode(node) {
  return node.kind === Kind.NAMED_TYPE || node.kind === Kind.LIST_TYPE || node.kind === Kind.NON_NULL_TYPE;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
var init_predicates = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/predicates.mjs"() {
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
function ExecutableDefinitionsRule(context2) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          const defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context2.reportError(
            new GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition
            })
          );
        }
      }
      return false;
    }
  };
}
var init_ExecutableDefinitionsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
function FieldsOnCorrectTypeRule(context2) {
  return {
    Field(node) {
      const type = context2.getParentType();
      if (type) {
        const fieldDef = context2.getFieldDef();
        if (!fieldDef) {
          const schema = context2.getSchema();
          const fieldName = node.name.value;
          let suggestion = didYouMean(
            "to use an inline fragment on",
            getSuggestedTypeNames(schema, type, fieldName)
          );
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context2.reportError(
            new GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` + suggestion,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  const suggestedTypes = /* @__PURE__ */ new Set();
  const usageCount = /* @__PURE__ */ Object.create(null);
  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return [...suggestedTypes].sort((typeA, typeB) => {
    const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map((x) => x.name);
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}
var init_FieldsOnCorrectTypeRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_naturalCompare();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
function FragmentsOnCompositeTypesRule(context2) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;
      if (typeCondition) {
        const type = typeFromAST(context2.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          const typeStr = print(typeCondition);
          context2.reportError(
            new GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              {
                nodes: typeCondition
              }
            )
          );
        }
      }
    },
    FragmentDefinition(node) {
      const type = typeFromAST(context2.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        const typeStr = print(node.typeCondition);
        context2.reportError(
          new GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            {
              nodes: node.typeCondition
            }
          )
        );
      }
    }
  };
}
var init_FragmentsOnCompositeTypesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
function KnownArgumentNamesRule(context2) {
  return {
    // eslint-disable-next-line new-cap
    ...KnownArgumentNamesOnDirectivesRule(context2),
    Argument(argNode) {
      const argDef = context2.getArgument();
      const fieldDef = context2.getFieldDef();
      const parentType = context2.getParentType();
      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = suggestionList(argName, knownArgsNames);
        context2.reportError(
          new GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` + didYouMean(suggestions),
            {
              nodes: argNode
            }
          )
        );
      }
    }
  };
}
function KnownArgumentNamesOnDirectivesRule(context2) {
  const directiveArgs = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }
  const astDefinitions = context2.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }
  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;
          if (!knownArgs.includes(argName)) {
            const suggestions = suggestionList(argName, knownArgs);
            context2.reportError(
              new GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` + didYouMean(suggestions),
                {
                  nodes: argNode
                }
              )
            );
          }
        }
      }
      return false;
    }
  };
}
var init_KnownArgumentNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_directives();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
function KnownDirectivesRule(context2) {
  const locationsMap = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }
  const astDefinitions = context2.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }
  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];
      if (!locations) {
        context2.reportError(
          new GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node
          })
        );
        return;
      }
      const candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && !locations.includes(candidateLocation)) {
        context2.reportError(
          new GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  "kind" in appliedTo || invariant(false);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      "kind" in parentNode || invariant(false);
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
    default:
      invariant(false, "Unexpected kind: " + inspect(appliedTo.kind));
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case OperationTypeNode.QUERY:
      return DirectiveLocation.QUERY;
    case OperationTypeNode.MUTATION:
      return DirectiveLocation.MUTATION;
    case OperationTypeNode.SUBSCRIPTION:
      return DirectiveLocation.SUBSCRIPTION;
  }
}
var init_KnownDirectivesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownDirectivesRule.mjs"() {
    init_inspect();
    init_invariant();
    init_GraphQLError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_directives();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
function KnownFragmentNamesRule(context2) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context2.getFragment(fragmentName);
      if (!fragment) {
        context2.reportError(
          new GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name
          })
        );
      }
    }
  };
}
var init_KnownFragmentNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
function KnownTypeNamesRule(context2) {
  const schema = context2.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context2.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes)
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        const definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }
        const suggestedTypes = suggestionList(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames
        );
        context2.reportError(
          new GraphQLError(
            `Unknown type "${typeName}".` + didYouMean(suggestedTypes),
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function isSDLNode(value) {
  return "kind" in value && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}
var standardTypeNames;
var init_KnownTypeNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_predicates();
    init_introspection();
    init_scalars();
    standardTypeNames = [...specifiedScalarTypes, ...introspectionTypes].map(
      (type) => type.name
    );
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
function LoneAnonymousOperationRule(context2) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION
      ).length;
    },
    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context2.reportError(
          new GraphQLError(
            "This anonymous operation must be the only defined operation.",
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_LoneAnonymousOperationRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
function LoneSchemaDefinitionRule(context2) {
  var _ref, _ref2, _oldSchema$astNode;
  const oldSchema = context2.getSchema();
  const alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context2.reportError(
          new GraphQLError(
            "Cannot define a new schema within a schema extension.",
            {
              nodes: node
            }
          )
        );
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context2.reportError(
          new GraphQLError("Must provide only one schema definition.", {
            nodes: node
          })
        );
      }
      ++schemaDefinitionsCount;
    }
  };
}
var init_LoneSchemaDefinitionRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
function NoFragmentCyclesRule(context2) {
  const visitedFrags = /* @__PURE__ */ Object.create(null);
  const spreadPath = [];
  const spreadPathIndexByName = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context2.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        const spreadFragment = context2.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath.slice(0, -1).map((s) => '"' + s.name.value + '"').join(", ");
        context2.reportError(
          new GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` + (viaPath !== "" ? ` via ${viaPath}.` : "."),
            {
              nodes: cyclePath
            }
          )
        );
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}
var init_NoFragmentCyclesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
function NoUndefinedVariablesRule(context2) {
  let variableNameDefined = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context2.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          const varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context2.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".` : `Variable "$${varName}" is not defined.`,
                {
                  nodes: [node, operation]
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}
var init_NoUndefinedVariablesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
function NoUnusedFragmentsRule(context2) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave() {
        const fragmentNameUsed = /* @__PURE__ */ Object.create(null);
        for (const operation of operationDefs) {
          for (const fragment of context2.getRecursivelyReferencedFragments(
            operation
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context2.reportError(
              new GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef
              })
            );
          }
        }
      }
    }
  };
}
var init_NoUnusedFragmentsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
function NoUnusedVariablesRule(context2) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },
      leave(operation) {
        const variableNameUsed = /* @__PURE__ */ Object.create(null);
        const usages = context2.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }
        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context2.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".` : `Variable "$${variableName}" is never used.`,
                {
                  nodes: variableDef
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(def) {
      variableDefs.push(def);
    }
  };
}
var init_NoUnusedVariablesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/sortValueNode.mjs
function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };
    case Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };
    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.NULL:
    case Kind.ENUM:
    case Kind.VARIABLE:
      return valueNode;
  }
}
function sortFields(fields) {
  return fields.map((fieldNode) => ({
    ...fieldNode,
    value: sortValueNode(fieldNode.value)
  })).sort(
    (fieldA, fieldB) => naturalCompare(fieldA.name.value, fieldB.name.value)
  );
}
var init_sortValueNode = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/sortValueNode.mjs"() {
    init_naturalCompare();
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(
      ([responseName, subReason]) => `subfields "${responseName}" conflict because ` + reasonMessage(subReason)
    ).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context2) {
  const comparedFragmentPairs = new PairSet();
  const cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context2,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        context2.getParentType(),
        selectionSet
      );
      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context2.reportError(
          new GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            {
              nodes: fields1.concat(fields2)
            }
          )
        );
      }
    }
  };
}
function findConflictsWithinSelectionSet(context2, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet
  );
  collectConflictsWithin(
    context2,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    fieldMap
  );
  if (fragmentNames.length !== 0) {
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context2,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i]
      );
      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context2,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j]
        );
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context2, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  const fragment = context2.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  const [fieldMap2, referencedFragmentNames] = getReferencedFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    fragment
  );
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(
    context2,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2
  );
  for (const referencedFragmentName of referencedFragmentNames) {
    if (comparedFragmentPairs.has(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive
    )) {
      continue;
    }
    comparedFragmentPairs.add(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive
    );
    collectConflictsBetweenFieldsAndFragment(
      context2,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName
    );
  }
}
function collectConflictsBetweenFragments(context2, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(
    fragmentName1,
    fragmentName2,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context2.getFragment(fragmentName1);
  const fragment2 = context2.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  const [fieldMap1, referencedFragmentNames1] = getReferencedFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    fragment1
  );
  const [fieldMap2, referencedFragmentNames2] = getReferencedFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    fragment2
  );
  collectConflictsBetween(
    context2,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context2,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2
    );
  }
  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context2,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2
    );
  }
}
function findConflictsBetweenSubSelectionSets(context2, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2
  );
  collectConflictsBetween(
    context2,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context2,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context2,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context2,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2
      );
    }
  }
  return conflicts;
}
function collectConflictsWithin(context2, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context2,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            false,
            // within one collection is never mutually exclusive
            responseName,
            fields[i],
            fields[j]
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context2, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];
    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context2,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context2, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2;
  const areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    const name1 = node1.name.value;
    const name2 = node2.name.value;
    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2]
      ];
    }
    if (stringifyArguments(node1) !== stringifyArguments(node2)) {
      return [
        [responseName, "they have differing arguments"],
        [node1],
        [node2]
      ];
    }
  }
  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${inspect(type1)}" and "${inspect(
          type2
        )}"`
      ],
      [node1],
      [node2]
    ];
  }
  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context2,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      getNamedType(type1),
      selectionSet1,
      getNamedType(type2),
      selectionSet2
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function stringifyArguments(fieldNode) {
  var _fieldNode$arguments;
  const args = (
    /* c8 ignore next */
    (_fieldNode$arguments = fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : []
  );
  const inputObjectWithArgs = {
    kind: Kind.OBJECT,
    fields: args.map((argNode) => ({
      kind: Kind.OBJECT_FIELD,
      name: argNode.name,
      value: argNode.value
    }))
  };
  return print(sortValueNode(inputObjectWithArgs));
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context2, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (cached) {
    return cached;
  }
  const nodeAndDefs = /* @__PURE__ */ Object.create(null);
  const fragmentNames = /* @__PURE__ */ Object.create(null);
  _collectFieldsAndFragmentNames(
    context2,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames
  );
  const result = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result);
  return result;
}
function getReferencedFieldsAndFragmentNames(context2, cachedFieldsAndFragmentNames, fragment) {
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  const fragmentType = typeFromAST(context2.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context2,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet
  );
}
function _collectFieldsAndFragmentNames(context2, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        const responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition ? typeFromAST(context2.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(
          context2,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames
        );
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()]
    ];
  }
}
var PairSet;
var init_OverlappingFieldsCanBeMergedRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_sortValueNode();
    init_typeFromAST();
    PairSet = class {
      constructor() {
        this._data = /* @__PURE__ */ new Map();
      }
      has(a, b, areMutuallyExclusive) {
        var _this$_data$get;
        const [key1, key2] = a < b ? [a, b] : [b, a];
        const result = (_this$_data$get = this._data.get(key1)) === null || _this$_data$get === void 0 ? void 0 : _this$_data$get.get(key2);
        if (result === void 0) {
          return false;
        }
        return areMutuallyExclusive ? true : areMutuallyExclusive === result;
      }
      add(a, b, areMutuallyExclusive) {
        const [key1, key2] = a < b ? [a, b] : [b, a];
        const map = this._data.get(key1);
        if (map === void 0) {
          this._data.set(key1, /* @__PURE__ */ new Map([[key2, areMutuallyExclusive]]));
        } else {
          map.set(key2, areMutuallyExclusive);
        }
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
function PossibleFragmentSpreadsRule(context2) {
  return {
    InlineFragment(node) {
      const fragType = context2.getType();
      const parentType = context2.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context2.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context2.reportError(
          new GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    },
    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context2, fragName);
      const parentType = context2.getParentType();
      if (fragType && parentType && !doTypesOverlap(context2.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context2.reportError(
          new GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getFragmentType(context2, name) {
  const frag = context2.getFragment(name);
  if (frag) {
    const type = typeFromAST(context2.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}
var init_PossibleFragmentSpreadsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
function PossibleTypeExtensionsRule(context2) {
  const schema = context2.getSchema();
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context2.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context2.reportError(
          new GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node
          })
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...schema === null || schema === void 0 ? void 0 : schema.getTypeMap()
      });
      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context2.reportError(
        new GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` + didYouMean(suggestedTypes),
          {
            nodes: node.name
          }
        )
      );
    }
  }
}
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant(false, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
    default:
      invariant(false, "Unexpected kind: " + inspect(kind));
  }
}
var defKindToExtKind;
var init_PossibleTypeExtensionsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_definition();
    defKindToExtKind = {
      [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
      [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
      [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
      [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
      [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
      [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
function ProvidedRequiredArgumentsRule(context2) {
  return {
    // eslint-disable-next-line new-cap
    ...ProvidedRequiredArgumentsOnDirectivesRule(context2),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        var _fieldNode$arguments;
        const fieldDef = context2.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        const providedArgs = new Set(
          // FIXME: https://github.com/graphql/graphql-js/issues/2203
          /* c8 ignore next */
          (_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === void 0 ? void 0 : _fieldNode$arguments.map((arg) => arg.name.value)
        );
        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && isRequiredArgument(argDef)) {
            const argTypeStr = inspect(argDef.type);
            context2.reportError(
              new GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                {
                  nodes: fieldNode
                }
              )
            );
          }
        }
      }
    }
  };
}
function ProvidedRequiredArgumentsOnDirectivesRule(context2) {
  var _schema$getDirectives;
  const requiredArgsMap = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  const definedDirectives = (_schema$getDirectives = schema === null || schema === void 0 ? void 0 : schema.getDirectives()) !== null && _schema$getDirectives !== void 0 ? _schema$getDirectives : specifiedDirectives;
  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      (arg) => arg.name
    );
  }
  const astDefinitions = context2.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value
      );
    }
  }
  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          const argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));
          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = isType(argDef.type) ? inspect(argDef.type) : print(argDef.type);
              context2.reportError(
                new GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  {
                    nodes: directiveNode
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
var init_ProvidedRequiredArgumentsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs"() {
    init_inspect();
    init_keyMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
function ScalarLeafsRule(context2) {
  return {
    Field(node) {
      const type = context2.getType();
      const selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = inspect(type);
            context2.reportError(
              new GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                {
                  nodes: selectionSet
                }
              )
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context2.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
var init_ScalarLeafsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ScalarLeafsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/printPathArray.mjs
function printPathArray(path) {
  return path.map(
    (key) => typeof key === "number" ? "[" + key.toString() + "]" : "." + key
  ).join("");
}
var init_printPathArray = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/printPathArray.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/Path.mjs
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename
  };
}
function pathToArray(path) {
  const flattened = [];
  let curr = path;
  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }
  return flattened.reverse();
}
var init_Path = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/Path.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/coerceInputValue.mjs
function coerceInputValue(inputValue, type, onError = defaultOnError) {
  return coerceInputValueImpl(inputValue, type, onError, void 0);
}
function defaultOnError(path, invalidValue, error) {
  let errorPrefix = "Invalid value " + inspect(invalidValue);
  if (path.length > 0) {
    errorPrefix += ` at "value${printPathArray(path)}"`;
  }
  error.message = errorPrefix + ": " + error.message;
  throw error;
}
function coerceInputValueImpl(inputValue, type, onError, path) {
  if (isNonNullType(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }
    onError(
      pathToArray(path),
      inputValue,
      new GraphQLError(
        `Expected non-nullable type "${inspect(type)}" not to be null.`
      )
    );
    return;
  }
  if (inputValue == null) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(inputValue)) {
      return Array.from(inputValue, (itemValue, index) => {
        const itemPath = addPath(path, index, void 0);
        return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
      });
    }
    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(inputValue)) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}" to be an object.`)
      );
      return;
    }
    const coercedValue = {};
    const fieldDefs = type.getFields();
    for (const field of Object.values(fieldDefs)) {
      const fieldValue = inputValue[field.name];
      if (fieldValue === void 0) {
        if (field.defaultValue !== void 0) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          const typeStr = inspect(field.type);
          onError(
            pathToArray(path),
            inputValue,
            new GraphQLError(
              `Field "${field.name}" of required type "${typeStr}" was not provided.`
            )
          );
        }
        continue;
      }
      coercedValue[field.name] = coerceInputValueImpl(
        fieldValue,
        field.type,
        onError,
        addPath(path, field.name, type.name)
      );
    }
    for (const fieldName of Object.keys(inputValue)) {
      if (!fieldDefs[fieldName]) {
        const suggestions = suggestionList(
          fieldName,
          Object.keys(type.getFields())
        );
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(
            `Field "${fieldName}" is not defined by type "${type.name}".` + didYouMean(suggestions)
          )
        );
      }
    }
    return coercedValue;
  }
  if (isLeafType(type)) {
    let parseResult;
    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof GraphQLError) {
        onError(pathToArray(path), inputValue, error);
      } else {
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(`Expected type "${type.name}". ` + error.message, {
            originalError: error
          })
        );
      }
      return;
    }
    if (parseResult === void 0) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}".`)
      );
    }
    return parseResult;
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}
var init_coerceInputValue = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/coerceInputValue.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant();
    init_isIterableObject();
    init_isObjectLike();
    init_Path();
    init_printPathArray();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/valueFromAST.mjs
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    const variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    const variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      const coercedValues = [];
      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    const coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    const coercedObj = /* @__PURE__ */ Object.create(null);
    const fieldNodes = keyMap(valueNode.fields, (field) => field.name.value);
    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    let result;
    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result === void 0) {
      return;
    }
    return result;
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}
var init_valueFromAST = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/valueFromAST.mjs"() {
    init_inspect();
    init_invariant();
    init_keyMap();
    init_kinds();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/values.mjs
function getVariableValues(schema, varDefNodes, inputs, options) {
  const errors = [];
  const maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors;
  try {
    const coerced = coerceVariableValues(
      schema,
      varDefNodes,
      inputs,
      (error) => {
        if (maxErrors != null && errors.length >= maxErrors) {
          throw new GraphQLError(
            "Too many errors processing variables, error limit reached. Execution aborted."
          );
        }
        errors.push(error);
      }
    );
    if (errors.length === 0) {
      return {
        coerced
      };
    }
  } catch (error) {
    errors.push(error);
  }
  return {
    errors
  };
}
function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  const coercedValues = {};
  for (const varDefNode of varDefNodes) {
    const varName = varDefNode.variable.name.value;
    const varType = typeFromAST(schema, varDefNode.type);
    if (!isInputType(varType)) {
      const varTypeStr = print(varDefNode.type);
      onError(
        new GraphQLError(
          `Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`,
          {
            nodes: varDefNode.type
          }
        )
      );
      continue;
    }
    if (!hasOwnProperty(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if (isNonNullType(varType)) {
        const varTypeStr = inspect(varType);
        onError(
          new GraphQLError(
            `Variable "$${varName}" of required type "${varTypeStr}" was not provided.`,
            {
              nodes: varDefNode
            }
          )
        );
      }
      continue;
    }
    const value = inputs[varName];
    if (value === null && isNonNullType(varType)) {
      const varTypeStr = inspect(varType);
      onError(
        new GraphQLError(
          `Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`,
          {
            nodes: varDefNode
          }
        )
      );
      continue;
    }
    coercedValues[varName] = coerceInputValue(
      value,
      varType,
      (path, invalidValue, error) => {
        let prefix = `Variable "$${varName}" got invalid value ` + inspect(invalidValue);
        if (path.length > 0) {
          prefix += ` at "${varName}${printPathArray(path)}"`;
        }
        onError(
          new GraphQLError(prefix + "; " + error.message, {
            nodes: varDefNode,
            originalError: error
          })
        );
      }
    );
  }
  return coercedValues;
}
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  const coercedValues = {};
  const argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  const argNodeMap = keyMap(argumentNodes, (arg) => arg.name.value);
  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" was not provided.`,
          {
            nodes: node
          }
        );
      }
      continue;
    }
    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError(
            `Argument "${name}" of required type "${inspect(argType)}" was provided the variable "$${variableName}" which was not provided a runtime value.`,
            {
              nodes: valueNode
            }
          );
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError(
        `Argument "${name}" of non-null type "${inspect(argType)}" must not be null.`,
        {
          nodes: valueNode
        }
      );
    }
    const coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError(
        `Argument "${name}" has invalid value ${print(valueNode)}.`,
        {
          nodes: valueNode
        }
      );
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;
  const directiveNode = (_node$directives = node.directives) === null || _node$directives === void 0 ? void 0 : _node$directives.find(
    (directive) => directive.name.value === directiveDef.name
  );
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var init_values = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/values.mjs"() {
    init_inspect();
    init_keyMap();
    init_printPathArray();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_coerceInputValue();
    init_typeFromAST();
    init_valueFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/collectFields.mjs
function collectFields(schema, fragments, variableValues, runtimeType, selectionSet) {
  const fields = /* @__PURE__ */ new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    /* @__PURE__ */ new Set()
  );
  return fields;
}
function collectSubfields(schema, fragments, variableValues, returnType, fieldNodes) {
  const subFieldNodes = /* @__PURE__ */ new Map();
  const visitedFragmentNames = /* @__PURE__ */ new Set();
  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames
      );
    }
  }
  return subFieldNodes;
}
function collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, visitedFragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);
        if (fieldList !== void 0) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }
        break;
      }
      case Kind.INLINE_FRAGMENT: {
        if (!shouldIncludeNode(variableValues, selection) || !doesFragmentConditionMatch(schema, selection, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
      case Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;
        if (visitedFragmentNames.has(fragName) || !shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];
        if (!fragment || !doesFragmentConditionMatch(schema, fragment, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
    }
  }
}
function shouldIncludeNode(variableValues, node) {
  const skip = getDirectiveValues(GraphQLSkipDirective, node, variableValues);
  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }
  const include = getDirectiveValues(
    GraphQLIncludeDirective,
    node,
    variableValues
  );
  if ((include === null || include === void 0 ? void 0 : include.if) === false) {
    return false;
  }
  return true;
}
function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;
  if (!typeConditionNode) {
    return true;
  }
  const conditionalType = typeFromAST(schema, typeConditionNode);
  if (conditionalType === type) {
    return true;
  }
  if (isAbstractType(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }
  return false;
}
function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}
var init_collectFields = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/collectFields.mjs"() {
    init_kinds();
    init_definition();
    init_directives();
    init_typeFromAST();
    init_values();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
function SingleFieldSubscriptionsRule(context2) {
  return {
    OperationDefinition(node) {
      if (node.operation === "subscription") {
        const schema = context2.getSchema();
        const subscriptionType = schema.getSubscriptionType();
        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = /* @__PURE__ */ Object.create(null);
          const document2 = context2.getDocument();
          const fragments = /* @__PURE__ */ Object.create(null);
          for (const definition of document2.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }
          const fields = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet
          );
          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context2.reportError(
              new GraphQLError(
                operationName != null ? `Subscription "${operationName}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.",
                {
                  nodes: extraFieldSelections
                }
              )
            );
          }
          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;
            if (fieldName.startsWith("__")) {
              context2.reportError(
                new GraphQLError(
                  operationName != null ? `Subscription "${operationName}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.",
                  {
                    nodes: fieldNodes
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
var init_SingleFieldSubscriptionsRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_collectFields();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/groupBy.mjs
function groupBy(list, keyFn) {
  const result = /* @__PURE__ */ new Map();
  for (const item of list) {
    const key = keyFn(item);
    const group = result.get(key);
    if (group === void 0) {
      result.set(key, [item]);
    } else {
      group.push(item);
    }
  }
  return result;
}
var init_groupBy = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/groupBy.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
function UniqueArgumentDefinitionNamesRule(context2) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;
      const argumentNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },
    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField
  };
  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;
    const typeName = typeNode.name.value;
    const fieldNodes = (_typeNode$fields = typeNode.fields) !== null && _typeNode$fields !== void 0 ? _typeNode$fields : [];
    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;
      const fieldName = fieldDef.name.value;
      const argumentNodes = (_fieldDef$arguments = fieldDef.arguments) !== null && _fieldDef$arguments !== void 0 ? _fieldDef$arguments : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }
    return false;
  }
  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context2.reportError(
          new GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
    return false;
  }
}
var init_UniqueArgumentDefinitionNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
function UniqueArgumentNamesRule(context2) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness
  };
  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;
    const argumentNodes = (_parentNode$arguments = parentNode.arguments) !== null && _parentNode$arguments !== void 0 ? _parentNode$arguments : [];
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context2.reportError(
          new GraphQLError(
            `There can be only one argument named "${argName}".`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
  }
}
var init_UniqueArgumentNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
function UniqueDirectiveNamesRule(context2) {
  const knownDirectiveNames = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context2.reportError(
          new GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            {
              nodes: node.name
            }
          )
        );
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context2.reportError(
          new GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            {
              nodes: [knownDirectiveNames[directiveName], node.name]
            }
          )
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueDirectiveNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
function UniqueDirectivesPerLocationRule(context2) {
  const uniqueDirectiveMap = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  const astDefinitions = context2.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  const schemaDirectives = /* @__PURE__ */ Object.create(null);
  const typeDirectivesMap = /* @__PURE__ */ Object.create(null);
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter(node) {
      if (!("directives" in node) || !node.directives) {
        return;
      }
      let seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = /* @__PURE__ */ Object.create(null);
        }
      } else {
        seenDirectives = /* @__PURE__ */ Object.create(null);
      }
      for (const directive of node.directives) {
        const directiveName = directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context2.reportError(
              new GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                {
                  nodes: [seenDirectives[directiveName], directive]
                }
              )
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    }
  };
}
var init_UniqueDirectivesPerLocationRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_directives();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
function UniqueEnumValueNamesRule(context2) {
  const schema = context2.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownValueNames = /* @__PURE__ */ Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    const typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    const valueNames = knownValueNames[typeName];
    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context2.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: valueDef.name
            }
          )
        );
      } else if (valueNames[valueName]) {
        context2.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            {
              nodes: [valueNames[valueName], valueDef.name]
            }
          )
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}
var init_UniqueEnumValueNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
function UniqueFieldDefinitionNamesRule(context2) {
  const schema = context2.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownFieldNames = /* @__PURE__ */ Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    const typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    const fieldNames = knownFieldNames[typeName];
    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context2.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: fieldDef.name
            }
          )
        );
      } else if (fieldNames[fieldName]) {
        context2.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            {
              nodes: [fieldNames[fieldName], fieldDef.name]
            }
          )
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}
var init_UniqueFieldDefinitionNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
function UniqueFragmentNamesRule(context2) {
  const knownFragmentNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      const fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context2.reportError(
          new GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            {
              nodes: [knownFragmentNames[fragmentName], node.name]
            }
          )
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueFragmentNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
function UniqueInputFieldNamesRule(context2) {
  const knownNameStack = [];
  let knownNames = /* @__PURE__ */ Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = /* @__PURE__ */ Object.create(null);
      },
      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || invariant(false);
        knownNames = prevKnownNames;
      }
    },
    ObjectField(node) {
      const fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context2.reportError(
          new GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            {
              nodes: [knownNames[fieldName], node.name]
            }
          )
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}
var init_UniqueInputFieldNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs"() {
    init_invariant();
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
function UniqueOperationNamesRule(context2) {
  const knownOperationNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context2.reportError(
            new GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              {
                nodes: [
                  knownOperationNames[operationName.value],
                  operationName
                ]
              }
            )
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: () => false
  };
}
var init_UniqueOperationNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
function UniqueOperationTypesRule(context2) {
  const schema = context2.getSchema();
  const definedOperationTypes = /* @__PURE__ */ Object.create(null);
  const existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context2.reportError(
          new GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            {
              nodes: operationType
            }
          )
        );
      } else if (alreadyDefinedOperationType) {
        context2.reportError(
          new GraphQLError(
            `There can be only one ${operation} type in schema.`,
            {
              nodes: [alreadyDefinedOperationType, operationType]
            }
          )
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}
var init_UniqueOperationTypesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
function UniqueTypeNamesRule(context2) {
  const knownTypeNames = /* @__PURE__ */ Object.create(null);
  const schema = context2.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    const typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context2.reportError(
        new GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          {
            nodes: node.name
          }
        )
      );
      return;
    }
    if (knownTypeNames[typeName]) {
      context2.reportError(
        new GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name]
        })
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}
var init_UniqueTypeNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
function UniqueVariableNamesRule(context2) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;
      const variableDefinitions = (_operationNode$variab = operationNode.variableDefinitions) !== null && _operationNode$variab !== void 0 ? _operationNode$variab : [];
      const seenVariableDefinitions = groupBy(
        variableDefinitions,
        (node) => node.variable.name.value
      );
      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context2.reportError(
            new GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              {
                nodes: variableNodes.map((node) => node.variable.name)
              }
            )
          );
        }
      }
    }
  };
}
var init_UniqueVariableNamesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
function ValuesOfCorrectTypeRule(context2) {
  return {
    ListValue(node) {
      const type = getNullableType(context2.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context2, node);
        return false;
      }
    },
    ObjectValue(node) {
      const type = getNamedType(context2.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context2, node);
        return false;
      }
      const fieldNodeMap = keyMap(node.fields, (field) => field.name.value);
      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect(fieldDef.type);
          context2.reportError(
            new GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    ObjectField(node) {
      const parentType = getNamedType(context2.getParentInputType());
      const fieldType = context2.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields())
        );
        context2.reportError(
          new GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` + didYouMean(suggestions),
            {
              nodes: node
            }
          )
        );
      }
    },
    NullValue(node) {
      const type = context2.getInputType();
      if (isNonNullType(type)) {
        context2.reportError(
          new GraphQLError(
            `Expected value of type "${inspect(type)}", found ${print(node)}.`,
            {
              nodes: node
            }
          )
        );
      }
    },
    EnumValue: (node) => isValidValueNode(context2, node),
    IntValue: (node) => isValidValueNode(context2, node),
    FloatValue: (node) => isValidValueNode(context2, node),
    StringValue: (node) => isValidValueNode(context2, node),
    BooleanValue: (node) => isValidValueNode(context2, node)
  };
}
function isValidValueNode(context2, node) {
  const locationType = context2.getInputType();
  if (!locationType) {
    return;
  }
  const type = getNamedType(locationType);
  if (!isLeafType(type)) {
    const typeStr = inspect(locationType);
    context2.reportError(
      new GraphQLError(
        `Expected value of type "${typeStr}", found ${print(node)}.`,
        {
          nodes: node
        }
      )
    );
    return;
  }
  try {
    const parseResult = type.parseLiteral(
      node,
      void 0
      /* variables */
    );
    if (parseResult === void 0) {
      const typeStr = inspect(locationType);
      context2.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}.`,
          {
            nodes: node
          }
        )
      );
    }
  } catch (error) {
    const typeStr = inspect(locationType);
    if (error instanceof GraphQLError) {
      context2.reportError(error);
    } else {
      context2.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}; ` + error.message,
          {
            nodes: node,
            originalError: error
          }
        )
      );
    }
  }
}
var init_ValuesOfCorrectTypeRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_keyMap();
    init_suggestionList();
    init_GraphQLError();
    init_printer();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
function VariablesAreInputTypesRule(context2) {
  return {
    VariableDefinition(node) {
      const type = typeFromAST(context2.getSchema(), node.type);
      if (type !== void 0 && !isInputType(type)) {
        const variableName = node.variable.name.value;
        const typeName = print(node.type);
        context2.reportError(
          new GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            {
              nodes: node.type
            }
          )
        );
      }
    }
  };
}
var init_VariablesAreInputTypesRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
function VariablesInAllowedPositionRule(context2) {
  let varDefMap = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context2.getRecursiveVariableUsages(operation);
        for (const { node, type, defaultValue } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];
          if (varDef && type) {
            const schema = context2.getSchema();
            const varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(
              schema,
              varType,
              varDef.defaultValue,
              type,
              defaultValue
            )) {
              const varTypeStr = inspect(varType);
              const typeStr = inspect(type);
              context2.reportError(
                new GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  {
                    nodes: [varDef, node]
                  }
                )
              );
            }
          }
        }
      }
    },
    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    const hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    const nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}
var init_VariablesInAllowedPositionRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/specifiedRules.mjs
var specifiedRules, specifiedSDLRules;
var init_specifiedRules = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/specifiedRules.mjs"() {
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_LoneSchemaDefinitionRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_PossibleTypeExtensionsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectiveNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    specifiedRules = Object.freeze([
      ExecutableDefinitionsRule,
      UniqueOperationNamesRule,
      LoneAnonymousOperationRule,
      SingleFieldSubscriptionsRule,
      KnownTypeNamesRule,
      FragmentsOnCompositeTypesRule,
      VariablesAreInputTypesRule,
      ScalarLeafsRule,
      FieldsOnCorrectTypeRule,
      UniqueFragmentNamesRule,
      KnownFragmentNamesRule,
      NoUnusedFragmentsRule,
      PossibleFragmentSpreadsRule,
      NoFragmentCyclesRule,
      UniqueVariableNamesRule,
      NoUndefinedVariablesRule,
      NoUnusedVariablesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      KnownArgumentNamesRule,
      UniqueArgumentNamesRule,
      ValuesOfCorrectTypeRule,
      ProvidedRequiredArgumentsRule,
      VariablesInAllowedPositionRule,
      OverlappingFieldsCanBeMergedRule,
      UniqueInputFieldNamesRule
    ]);
    specifiedSDLRules = Object.freeze([
      LoneSchemaDefinitionRule,
      UniqueOperationTypesRule,
      UniqueTypeNamesRule,
      UniqueEnumValueNamesRule,
      UniqueFieldDefinitionNamesRule,
      UniqueArgumentDefinitionNamesRule,
      UniqueDirectiveNamesRule,
      KnownTypeNamesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      PossibleTypeExtensionsRule,
      KnownArgumentNamesOnDirectivesRule,
      UniqueArgumentNamesRule,
      UniqueInputFieldNamesRule,
      ProvidedRequiredArgumentsOnDirectivesRule
    ]);
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/ValidationContext.mjs
var ASTValidationContext, SDLValidationContext, ValidationContext;
var init_ValidationContext = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/ValidationContext.mjs"() {
    init_kinds();
    init_visitor();
    init_TypeInfo();
    ASTValidationContext = class {
      constructor(ast, onError) {
        this._ast = ast;
        this._fragments = void 0;
        this._fragmentSpreads = /* @__PURE__ */ new Map();
        this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
        this._onError = onError;
      }
      get [Symbol.toStringTag]() {
        return "ASTValidationContext";
      }
      reportError(error) {
        this._onError(error);
      }
      getDocument() {
        return this._ast;
      }
      getFragment(name) {
        let fragments;
        if (this._fragments) {
          fragments = this._fragments;
        } else {
          fragments = /* @__PURE__ */ Object.create(null);
          for (const defNode of this.getDocument().definitions) {
            if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[defNode.name.value] = defNode;
            }
          }
          this._fragments = fragments;
        }
        return fragments[name];
      }
      getFragmentSpreads(node) {
        let spreads = this._fragmentSpreads.get(node);
        if (!spreads) {
          spreads = [];
          const setsToVisit = [node];
          let set;
          while (set = setsToVisit.pop()) {
            for (const selection of set.selections) {
              if (selection.kind === Kind.FRAGMENT_SPREAD) {
                spreads.push(selection);
              } else if (selection.selectionSet) {
                setsToVisit.push(selection.selectionSet);
              }
            }
          }
          this._fragmentSpreads.set(node, spreads);
        }
        return spreads;
      }
      getRecursivelyReferencedFragments(operation) {
        let fragments = this._recursivelyReferencedFragments.get(operation);
        if (!fragments) {
          fragments = [];
          const collectedNames = /* @__PURE__ */ Object.create(null);
          const nodesToVisit = [operation.selectionSet];
          let node;
          while (node = nodesToVisit.pop()) {
            for (const spread of this.getFragmentSpreads(node)) {
              const fragName = spread.name.value;
              if (collectedNames[fragName] !== true) {
                collectedNames[fragName] = true;
                const fragment = this.getFragment(fragName);
                if (fragment) {
                  fragments.push(fragment);
                  nodesToVisit.push(fragment.selectionSet);
                }
              }
            }
          }
          this._recursivelyReferencedFragments.set(operation, fragments);
        }
        return fragments;
      }
    };
    SDLValidationContext = class extends ASTValidationContext {
      constructor(ast, schema, onError) {
        super(ast, onError);
        this._schema = schema;
      }
      get [Symbol.toStringTag]() {
        return "SDLValidationContext";
      }
      getSchema() {
        return this._schema;
      }
    };
    ValidationContext = class extends ASTValidationContext {
      constructor(schema, ast, typeInfo, onError) {
        super(ast, onError);
        this._schema = schema;
        this._typeInfo = typeInfo;
        this._variableUsages = /* @__PURE__ */ new Map();
        this._recursiveVariableUsages = /* @__PURE__ */ new Map();
      }
      get [Symbol.toStringTag]() {
        return "ValidationContext";
      }
      getSchema() {
        return this._schema;
      }
      getVariableUsages(node) {
        let usages = this._variableUsages.get(node);
        if (!usages) {
          const newUsages = [];
          const typeInfo = new TypeInfo(this._schema);
          visit(
            node,
            visitWithTypeInfo(typeInfo, {
              VariableDefinition: () => false,
              Variable(variable) {
                newUsages.push({
                  node: variable,
                  type: typeInfo.getInputType(),
                  defaultValue: typeInfo.getDefaultValue()
                });
              }
            })
          );
          usages = newUsages;
          this._variableUsages.set(node, usages);
        }
        return usages;
      }
      getRecursiveVariableUsages(operation) {
        let usages = this._recursiveVariableUsages.get(operation);
        if (!usages) {
          usages = this.getVariableUsages(operation);
          for (const frag of this.getRecursivelyReferencedFragments(operation)) {
            usages = usages.concat(this.getVariableUsages(frag));
          }
          this._recursiveVariableUsages.set(operation, usages);
        }
        return usages;
      }
      getType() {
        return this._typeInfo.getType();
      }
      getParentType() {
        return this._typeInfo.getParentType();
      }
      getInputType() {
        return this._typeInfo.getInputType();
      }
      getParentInputType() {
        return this._typeInfo.getParentInputType();
      }
      getFieldDef() {
        return this._typeInfo.getFieldDef();
      }
      getDirective() {
        return this._typeInfo.getDirective();
      }
      getArgument() {
        return this._typeInfo.getArgument();
      }
      getEnumValue() {
        return this._typeInfo.getEnumValue();
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/validate.mjs
function validate(schema, documentAST, rules = specifiedRules, options, typeInfo = new TypeInfo(schema)) {
  var _options$maxErrors;
  const maxErrors = (_options$maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors) !== null && _options$maxErrors !== void 0 ? _options$maxErrors : 100;
  documentAST || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  const abortObj = Object.freeze({});
  const errors = [];
  const context2 = new ValidationContext(
    schema,
    documentAST,
    typeInfo,
    (error) => {
      if (errors.length >= maxErrors) {
        errors.push(
          new GraphQLError(
            "Too many validation errors, error limit reached. Validation aborted."
          )
        );
        throw abortObj;
      }
      errors.push(error);
    }
  );
  const visitor = visitInParallel(rules.map((rule) => rule(context2)));
  try {
    visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  } catch (e) {
    if (e !== abortObj) {
      throw e;
    }
  }
  return errors;
}
function validateSDL(documentAST, schemaToExtend, rules = specifiedSDLRules) {
  const errors = [];
  const context2 = new SDLValidationContext(
    documentAST,
    schemaToExtend,
    (error) => {
      errors.push(error);
    }
  );
  const visitors = rules.map((rule) => rule(context2));
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
function assertValidSDL(documentAST) {
  const errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
function assertValidSDLExtension(documentAST, schema) {
  const errors = validateSDL(documentAST, schema);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
var init_validate2 = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/validate.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_visitor();
    init_validate();
    init_TypeInfo();
    init_specifiedRules();
    init_ValidationContext();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/memoize3.mjs
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === void 0) {
      cache0 = /* @__PURE__ */ new WeakMap();
    }
    let cache1 = cache0.get(a1);
    if (cache1 === void 0) {
      cache1 = /* @__PURE__ */ new WeakMap();
      cache0.set(a1, cache1);
    }
    let cache2 = cache1.get(a2);
    if (cache2 === void 0) {
      cache2 = /* @__PURE__ */ new WeakMap();
      cache1.set(a2, cache2);
    }
    let fnResult = cache2.get(a3);
    if (fnResult === void 0) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }
    return fnResult;
  };
}
var init_memoize3 = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/memoize3.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/promiseForObject.mjs
function promiseForObject(object) {
  return Promise.all(Object.values(object)).then((resolvedValues) => {
    const resolvedObject = /* @__PURE__ */ Object.create(null);
    for (const [i, key] of Object.keys(object).entries()) {
      resolvedObject[key] = resolvedValues[i];
    }
    return resolvedObject;
  });
}
var init_promiseForObject = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/promiseForObject.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/promiseReduce.mjs
function promiseReduce(values, callbackFn, initialValue) {
  let accumulator = initialValue;
  for (const value of values) {
    accumulator = isPromise(accumulator) ? accumulator.then((resolved) => callbackFn(resolved, value)) : callbackFn(accumulator, value);
  }
  return accumulator;
}
var init_promiseReduce = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/promiseReduce.mjs"() {
    init_isPromise();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/toError.mjs
function toError(thrownValue) {
  return thrownValue instanceof Error ? thrownValue : new NonErrorThrown(thrownValue);
}
var NonErrorThrown;
var init_toError = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/toError.mjs"() {
    init_inspect();
    NonErrorThrown = class extends Error {
      constructor(thrownValue) {
        super("Unexpected error value: " + inspect(thrownValue));
        this.name = "NonErrorThrown";
        this.thrownValue = thrownValue;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/locatedError.mjs
function locatedError(rawOriginalError, nodes, path) {
  var _nodes;
  const originalError = toError(rawOriginalError);
  if (isLocatedGraphQLError(originalError)) {
    return originalError;
  }
  return new GraphQLError(originalError.message, {
    nodes: (_nodes = originalError.nodes) !== null && _nodes !== void 0 ? _nodes : nodes,
    source: originalError.source,
    positions: originalError.positions,
    path,
    originalError
  });
}
function isLocatedGraphQLError(error) {
  return Array.isArray(error.path);
}
var init_locatedError = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/locatedError.mjs"() {
    init_toError();
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/execute.mjs
function execute(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const { schema, document: document2, variableValues, rootValue } = args;
  assertValidExecutionArguments(schema, document2, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const { operation } = exeContext;
    const result = executeOperation(exeContext, operation, rootValue);
    if (isPromise(result)) {
      return result.then(
        (data) => buildResponse(data, exeContext.errors),
        (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        }
      );
    }
    return buildResponse(result, exeContext.errors);
  } catch (error) {
    exeContext.errors.push(error);
    return buildResponse(null, exeContext.errors);
  }
}
function executeSync(args) {
  const result = execute(args);
  if (isPromise(result)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result;
}
function buildResponse(data, errors) {
  return errors.length === 0 ? {
    data
  } : {
    errors,
    data
  };
}
function assertValidExecutionArguments(schema, document2, rawVariableValues) {
  document2 || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  rawVariableValues == null || isObjectLike(rawVariableValues) || devAssert(
    false,
    "Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided."
  );
}
function buildExecutionContext(args) {
  var _definition$name, _operation$variableDe;
  const {
    schema,
    document: document2,
    rootValue,
    contextValue,
    variableValues: rawVariableValues,
    operationName,
    fieldResolver,
    typeResolver,
    subscribeFieldResolver
  } = args;
  let operation;
  const fragments = /* @__PURE__ */ Object.create(null);
  for (const definition of document2.definitions) {
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== void 0) {
            return [
              new GraphQLError(
                "Must provide operation name if query contains multiple operations."
              )
            ];
          }
          operation = definition;
        } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
          operation = definition;
        }
        break;
      case Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
      default:
    }
  }
  if (!operation) {
    if (operationName != null) {
      return [new GraphQLError(`Unknown operation named "${operationName}".`)];
    }
    return [new GraphQLError("Must provide an operation.")];
  }
  const variableDefinitions = (_operation$variableDe = operation.variableDefinitions) !== null && _operation$variableDe !== void 0 ? _operation$variableDe : [];
  const coercedVariableValues = getVariableValues(
    schema,
    variableDefinitions,
    rawVariableValues !== null && rawVariableValues !== void 0 ? rawVariableValues : {},
    {
      maxErrors: 50
    }
  );
  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }
  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver: fieldResolver !== null && fieldResolver !== void 0 ? fieldResolver : defaultFieldResolver,
    typeResolver: typeResolver !== null && typeResolver !== void 0 ? typeResolver : defaultTypeResolver,
    subscribeFieldResolver: subscribeFieldResolver !== null && subscribeFieldResolver !== void 0 ? subscribeFieldResolver : defaultFieldResolver,
    errors: []
  };
}
function executeOperation(exeContext, operation, rootValue) {
  const rootType = exeContext.schema.getRootType(operation.operation);
  if (rootType == null) {
    throw new GraphQLError(
      `Schema is not configured to execute ${operation.operation} operation.`,
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    rootType,
    operation.selectionSet
  );
  const path = void 0;
  switch (operation.operation) {
    case OperationTypeNode.QUERY:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
    case OperationTypeNode.MUTATION:
      return executeFieldsSerially(
        exeContext,
        rootType,
        rootValue,
        path,
        rootFields
      );
    case OperationTypeNode.SUBSCRIPTION:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
  }
}
function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields) {
  return promiseReduce(
    fields.entries(),
    (results, [responseName, fieldNodes]) => {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath
      );
      if (result === void 0) {
        return results;
      }
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }
      results[responseName] = result;
      return results;
    },
    /* @__PURE__ */ Object.create(null)
  );
}
function executeFields(exeContext, parentType, sourceValue, path, fields) {
  const results = /* @__PURE__ */ Object.create(null);
  let containsPromise = false;
  try {
    for (const [responseName, fieldNodes] of fields.entries()) {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath
      );
      if (result !== void 0) {
        results[responseName] = result;
        if (isPromise(result)) {
          containsPromise = true;
        }
      }
    }
  } catch (error) {
    if (containsPromise) {
      return promiseForObject(results).finally(() => {
        throw error;
      });
    }
    throw error;
  }
  if (!containsPromise) {
    return results;
  }
  return promiseForObject(results);
}
function executeField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;
  const fieldDef = getFieldDef2(exeContext.schema, parentType, fieldNodes[0]);
  if (!fieldDef) {
    return;
  }
  const returnType = fieldDef.type;
  const resolveFn = (_fieldDef$resolve = fieldDef.resolve) !== null && _fieldDef$resolve !== void 0 ? _fieldDef$resolve : exeContext.fieldResolver;
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    parentType,
    path
  );
  try {
    const args = getArgumentValues(
      fieldDef,
      fieldNodes[0],
      exeContext.variableValues
    );
    const contextValue = exeContext.contextValue;
    const result = resolveFn(source, args, contextValue, info);
    let completed;
    if (isPromise(result)) {
      completed = result.then(
        (resolved) => completeValue(exeContext, returnType, fieldNodes, info, path, resolved)
      );
    } else {
      completed = completeValue(
        exeContext,
        returnType,
        fieldNodes,
        info,
        path,
        result
      );
    }
    if (isPromise(completed)) {
      return completed.then(void 0, (rawError) => {
        const error = locatedError(rawError, fieldNodes, pathToArray(path));
        return handleFieldError(error, returnType, exeContext);
      });
    }
    return completed;
  } catch (rawError) {
    const error = locatedError(rawError, fieldNodes, pathToArray(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues
  };
}
function handleFieldError(error, returnType, exeContext) {
  if (isNonNullType(returnType)) {
    throw error;
  }
  exeContext.errors.push(error);
  return null;
}
function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (result instanceof Error) {
    throw result;
  }
  if (isNonNullType(returnType)) {
    const completed = completeValue(
      exeContext,
      returnType.ofType,
      fieldNodes,
      info,
      path,
      result
    );
    if (completed === null) {
      throw new Error(
        `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`
      );
    }
    return completed;
  }
  if (result == null) {
    return null;
  }
  if (isListType(returnType)) {
    return completeListValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  if (isLeafType(returnType)) {
    return completeLeafValue(returnType, result);
  }
  if (isAbstractType(returnType)) {
    return completeAbstractValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  if (isObjectType(returnType)) {
    return completeObjectValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  invariant(
    false,
    "Cannot complete value of unexpected output type: " + inspect(returnType)
  );
}
function completeListValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (!isIterableObject(result)) {
    throw new GraphQLError(
      `Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`
    );
  }
  const itemType = returnType.ofType;
  let containsPromise = false;
  const completedResults = Array.from(result, (item, index) => {
    const itemPath = addPath(path, index, void 0);
    try {
      let completedItem;
      if (isPromise(item)) {
        completedItem = item.then(
          (resolved) => completeValue(
            exeContext,
            itemType,
            fieldNodes,
            info,
            itemPath,
            resolved
          )
        );
      } else {
        completedItem = completeValue(
          exeContext,
          itemType,
          fieldNodes,
          info,
          itemPath,
          item
        );
      }
      if (isPromise(completedItem)) {
        containsPromise = true;
        return completedItem.then(void 0, (rawError) => {
          const error = locatedError(
            rawError,
            fieldNodes,
            pathToArray(itemPath)
          );
          return handleFieldError(error, itemType, exeContext);
        });
      }
      return completedItem;
    } catch (rawError) {
      const error = locatedError(rawError, fieldNodes, pathToArray(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
function completeLeafValue(returnType, result) {
  const serializedResult = returnType.serialize(result);
  if (serializedResult == null) {
    throw new Error(
      `Expected \`${inspect(returnType)}.serialize(${inspect(result)})\` to return non-nullable value, returned: ${inspect(serializedResult)}`
    );
  }
  return serializedResult;
}
function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result) {
  var _returnType$resolveTy;
  const resolveTypeFn = (_returnType$resolveTy = returnType.resolveType) !== null && _returnType$resolveTy !== void 0 ? _returnType$resolveTy : exeContext.typeResolver;
  const contextValue = exeContext.contextValue;
  const runtimeType = resolveTypeFn(result, contextValue, info, returnType);
  if (isPromise(runtimeType)) {
    return runtimeType.then(
      (resolvedRuntimeType) => completeObjectValue(
        exeContext,
        ensureValidRuntimeType(
          resolvedRuntimeType,
          exeContext,
          returnType,
          fieldNodes,
          info,
          result
        ),
        fieldNodes,
        info,
        path,
        result
      )
    );
  }
  return completeObjectValue(
    exeContext,
    ensureValidRuntimeType(
      runtimeType,
      exeContext,
      returnType,
      fieldNodes,
      info,
      result
    ),
    fieldNodes,
    info,
    path,
    result
  );
}
function ensureValidRuntimeType(runtimeTypeName, exeContext, returnType, fieldNodes, info, result) {
  if (runtimeTypeName == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
      fieldNodes
    );
  }
  if (isObjectType(runtimeTypeName)) {
    throw new GraphQLError(
      "Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead."
    );
  }
  if (typeof runtimeTypeName !== "string") {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with value ${inspect(result)}, received "${inspect(runtimeTypeName)}".`
    );
  }
  const runtimeType = exeContext.schema.getType(runtimeTypeName);
  if (runtimeType == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!isObjectType(runtimeType)) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new GraphQLError(
      `Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  return runtimeType;
}
function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result) {
  const subFieldNodes = collectSubfields2(exeContext, returnType, fieldNodes);
  if (returnType.isTypeOf) {
    const isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);
    if (isPromise(isTypeOf)) {
      return isTypeOf.then((resolvedIsTypeOf) => {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }
        return executeFields(
          exeContext,
          returnType,
          result,
          path,
          subFieldNodes
        );
      });
    }
    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }
  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}
function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new GraphQLError(
    `Expected value of type "${returnType.name}" but got: ${inspect(result)}.`,
    {
      nodes: fieldNodes
    }
  );
}
function getFieldDef2(schema, parentType, fieldNode) {
  const fieldName = fieldNode.name.value;
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  } else if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  } else if (fieldName === TypeNameMetaFieldDef.name) {
    return TypeNameMetaFieldDef;
  }
  return parentType.getFields()[fieldName];
}
var collectSubfields2, defaultTypeResolver, defaultFieldResolver;
var init_execute = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/execute.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant();
    init_isIterableObject();
    init_isObjectLike();
    init_isPromise();
    init_memoize3();
    init_Path();
    init_promiseForObject();
    init_promiseReduce();
    init_GraphQLError();
    init_locatedError();
    init_ast();
    init_kinds();
    init_definition();
    init_introspection();
    init_validate();
    init_collectFields();
    init_values();
    collectSubfields2 = memoize3(
      (exeContext, returnType, fieldNodes) => collectSubfields(
        exeContext.schema,
        exeContext.fragments,
        exeContext.variableValues,
        returnType,
        fieldNodes
      )
    );
    defaultTypeResolver = function(value, contextValue, info, abstractType) {
      if (isObjectLike(value) && typeof value.__typename === "string") {
        return value.__typename;
      }
      const possibleTypes = info.schema.getPossibleTypes(abstractType);
      const promisedIsTypeOfResults = [];
      for (let i = 0; i < possibleTypes.length; i++) {
        const type = possibleTypes[i];
        if (type.isTypeOf) {
          const isTypeOfResult = type.isTypeOf(value, contextValue, info);
          if (isPromise(isTypeOfResult)) {
            promisedIsTypeOfResults[i] = isTypeOfResult;
          } else if (isTypeOfResult) {
            return type.name;
          }
        }
      }
      if (promisedIsTypeOfResults.length) {
        return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
          for (let i = 0; i < isTypeOfResults.length; i++) {
            if (isTypeOfResults[i]) {
              return possibleTypes[i].name;
            }
          }
        });
      }
    };
    defaultFieldResolver = function(source, args, contextValue, info) {
      if (isObjectLike(source) || typeof source === "function") {
        const property = source[info.fieldName];
        if (typeof property === "function") {
          return source[info.fieldName](args, contextValue, info);
        }
        return property;
      }
    };
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/graphql.mjs
function graphql(args) {
  return new Promise((resolve) => resolve(graphqlImpl(args)));
}
function graphqlSync(args) {
  const result = graphqlImpl(args);
  if (isPromise(result)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result;
}
function graphqlImpl(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const {
    schema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  } = args;
  const schemaValidationErrors = validateSchema(schema);
  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors
    };
  }
  let document2;
  try {
    document2 = parse(source);
  } catch (syntaxError2) {
    return {
      errors: [syntaxError2]
    };
  }
  const validationErrors = validate(schema, document2);
  if (validationErrors.length > 0) {
    return {
      errors: validationErrors
    };
  }
  return execute({
    schema,
    document: document2,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  });
}
var init_graphql = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/graphql.mjs"() {
    init_devAssert();
    init_isPromise();
    init_parser();
    init_validate();
    init_validate2();
    init_execute();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/index.mjs
var init_type = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/type/index.mjs"() {
    init_schema();
    init_definition();
    init_directives();
    init_scalars();
    init_introspection();
    init_validate();
    init_assertName();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/index.mjs
var init_language = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/language/index.mjs"() {
    init_source();
    init_location();
    init_printLocation();
    init_kinds();
    init_tokenKind();
    init_lexer();
    init_parser();
    init_printer();
    init_visitor();
    init_ast();
    init_predicates();
    init_directiveLocation();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isAsyncIterable.mjs
function isAsyncIterable(maybeAsyncIterable) {
  return typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0 ? void 0 : maybeAsyncIterable[Symbol.asyncIterator]) === "function";
}
var init_isAsyncIterable = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/jsutils/isAsyncIterable.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/mapAsyncIterator.mjs
function mapAsyncIterator(iterable, callback) {
  const iterator = iterable[Symbol.asyncIterator]();
  async function mapResult(result) {
    if (result.done) {
      return result;
    }
    try {
      return {
        value: await callback(result.value),
        done: false
      };
    } catch (error) {
      if (typeof iterator.return === "function") {
        try {
          await iterator.return();
        } catch (_e) {
        }
      }
      throw error;
    }
  }
  return {
    async next() {
      return mapResult(await iterator.next());
    },
    async return() {
      return typeof iterator.return === "function" ? mapResult(await iterator.return()) : {
        value: void 0,
        done: true
      };
    },
    async throw(error) {
      if (typeof iterator.throw === "function") {
        return mapResult(await iterator.throw(error));
      }
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
var init_mapAsyncIterator = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/mapAsyncIterator.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/subscribe.mjs
async function subscribe(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const resultOrStream = await createSourceEventStream(args);
  if (!isAsyncIterable(resultOrStream)) {
    return resultOrStream;
  }
  const mapSourceToResponse = (payload) => execute({ ...args, rootValue: payload });
  return mapAsyncIterator(resultOrStream, mapSourceToResponse);
}
function toNormalizedArgs(args) {
  const firstArg = args[0];
  if (firstArg && "document" in firstArg) {
    return firstArg;
  }
  return {
    schema: firstArg,
    // FIXME: when underlying TS bug fixed, see https://github.com/microsoft/TypeScript/issues/31613
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    subscribeFieldResolver: args[6]
  };
}
async function createSourceEventStream(...rawArgs) {
  const args = toNormalizedArgs(rawArgs);
  const { schema, document: document2, variableValues } = args;
  assertValidExecutionArguments(schema, document2, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const eventStream = await executeSubscription(exeContext);
    if (!isAsyncIterable(eventStream)) {
      throw new Error(
        `Subscription field must return Async Iterable. Received: ${inspect(eventStream)}.`
      );
    }
    return eventStream;
  } catch (error) {
    if (error instanceof GraphQLError) {
      return {
        errors: [error]
      };
    }
    throw error;
  }
}
async function executeSubscription(exeContext) {
  const { schema, fragments, operation, variableValues, rootValue } = exeContext;
  const rootType = schema.getSubscriptionType();
  if (rootType == null) {
    throw new GraphQLError(
      "Schema is not configured to execute subscription operation.",
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet
  );
  const [responseName, fieldNodes] = [...rootFields.entries()][0];
  const fieldDef = getFieldDef2(schema, rootType, fieldNodes[0]);
  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;
    throw new GraphQLError(
      `The subscription field "${fieldName}" is not defined.`,
      {
        nodes: fieldNodes
      }
    );
  }
  const path = addPath(void 0, responseName, rootType.name);
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    rootType,
    path
  );
  try {
    var _fieldDef$subscribe;
    const args = getArgumentValues(fieldDef, fieldNodes[0], variableValues);
    const contextValue = exeContext.contextValue;
    const resolveFn = (_fieldDef$subscribe = fieldDef.subscribe) !== null && _fieldDef$subscribe !== void 0 ? _fieldDef$subscribe : exeContext.subscribeFieldResolver;
    const eventStream = await resolveFn(rootValue, args, contextValue, info);
    if (eventStream instanceof Error) {
      throw eventStream;
    }
    return eventStream;
  } catch (error) {
    throw locatedError(error, fieldNodes, pathToArray(path));
  }
}
var init_subscribe = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/subscribe.mjs"() {
    init_devAssert();
    init_inspect();
    init_isAsyncIterable();
    init_Path();
    init_GraphQLError();
    init_locatedError();
    init_collectFields();
    init_execute();
    init_mapAsyncIterator();
    init_values();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/index.mjs
var init_execution = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/execution/index.mjs"() {
    init_Path();
    init_execute();
    init_subscribe();
    init_values();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs
function NoDeprecatedCustomRule(context2) {
  return {
    Field(node) {
      const fieldDef = context2.getFieldDef();
      const deprecationReason = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.deprecationReason;
      if (fieldDef && deprecationReason != null) {
        const parentType = context2.getParentType();
        parentType != null || invariant(false);
        context2.reportError(
          new GraphQLError(
            `The field ${parentType.name}.${fieldDef.name} is deprecated. ${deprecationReason}`,
            {
              nodes: node
            }
          )
        );
      }
    },
    Argument(node) {
      const argDef = context2.getArgument();
      const deprecationReason = argDef === null || argDef === void 0 ? void 0 : argDef.deprecationReason;
      if (argDef && deprecationReason != null) {
        const directiveDef = context2.getDirective();
        if (directiveDef != null) {
          context2.reportError(
            new GraphQLError(
              `Directive "@${directiveDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        } else {
          const parentType = context2.getParentType();
          const fieldDef = context2.getFieldDef();
          parentType != null && fieldDef != null || invariant(false);
          context2.reportError(
            new GraphQLError(
              `Field "${parentType.name}.${fieldDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    ObjectField(node) {
      const inputObjectDef = getNamedType(context2.getParentInputType());
      if (isInputObjectType(inputObjectDef)) {
        const inputFieldDef = inputObjectDef.getFields()[node.name.value];
        const deprecationReason = inputFieldDef === null || inputFieldDef === void 0 ? void 0 : inputFieldDef.deprecationReason;
        if (deprecationReason != null) {
          context2.reportError(
            new GraphQLError(
              `The input field ${inputObjectDef.name}.${inputFieldDef.name} is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    EnumValue(node) {
      const enumValueDef = context2.getEnumValue();
      const deprecationReason = enumValueDef === null || enumValueDef === void 0 ? void 0 : enumValueDef.deprecationReason;
      if (enumValueDef && deprecationReason != null) {
        const enumTypeDef = getNamedType(context2.getInputType());
        enumTypeDef != null || invariant(false);
        context2.reportError(
          new GraphQLError(
            `The enum value "${enumTypeDef.name}.${enumValueDef.name}" is deprecated. ${deprecationReason}`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_NoDeprecatedCustomRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs"() {
    init_invariant();
    init_GraphQLError();
    init_definition();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs
function NoSchemaIntrospectionCustomRule(context2) {
  return {
    Field(node) {
      const type = getNamedType(context2.getType());
      if (type && isIntrospectionType(type)) {
        context2.reportError(
          new GraphQLError(
            `GraphQL introspection has been disabled, but the requested query contained the field "${node.name.value}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_NoSchemaIntrospectionCustomRule = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs"() {
    init_GraphQLError();
    init_definition();
    init_introspection();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/index.mjs
var init_validation = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/validation/index.mjs"() {
    init_validate2();
    init_ValidationContext();
    init_specifiedRules();
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    init_LoneSchemaDefinitionRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueDirectiveNamesRule();
    init_PossibleTypeExtensionsRule();
    init_NoDeprecatedCustomRule();
    init_NoSchemaIntrospectionCustomRule();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/index.mjs
var init_error = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/error/index.mjs"() {
    init_GraphQLError();
    init_syntaxError();
    init_locatedError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getIntrospectionQuery.mjs
function getIntrospectionQuery(options) {
  const optionsWithDefault = {
    descriptions: true,
    specifiedByUrl: false,
    directiveIsRepeatable: false,
    schemaDescription: false,
    inputValueDeprecation: false,
    ...options
  };
  const descriptions = optionsWithDefault.descriptions ? "description" : "";
  const specifiedByUrl = optionsWithDefault.specifiedByUrl ? "specifiedByURL" : "";
  const directiveIsRepeatable = optionsWithDefault.directiveIsRepeatable ? "isRepeatable" : "";
  const schemaDescription = optionsWithDefault.schemaDescription ? descriptions : "";
  function inputDeprecation(str) {
    return optionsWithDefault.inputValueDeprecation ? str : "";
  }
  return `
    query IntrospectionQuery {
      __schema {
        ${schemaDescription}
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          ${descriptions}
          ${directiveIsRepeatable}
          locations
          args${inputDeprecation("(includeDeprecated: true)")} {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      ${descriptions}
      ${specifiedByUrl}
      fields(includeDeprecated: true) {
        name
        ${descriptions}
        args${inputDeprecation("(includeDeprecated: true)")} {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields${inputDeprecation("(includeDeprecated: true)")} {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        ${descriptions}
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      ${descriptions}
      type { ...TypeRef }
      defaultValue
      ${inputDeprecation("isDeprecated")}
      ${inputDeprecation("deprecationReason")}
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
var init_getIntrospectionQuery = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getIntrospectionQuery.mjs"() {
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getOperationAST.mjs
function getOperationAST(documentAST, operationName) {
  let operation = null;
  for (const definition of documentAST.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;
      if (operationName == null) {
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }
  return operation;
}
var init_getOperationAST = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getOperationAST.mjs"() {
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getOperationRootType.mjs
function getOperationRootType(schema, operation) {
  if (operation.operation === "query") {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new GraphQLError(
        "Schema does not define the required query root type.",
        {
          nodes: operation
        }
      );
    }
    return queryType;
  }
  if (operation.operation === "mutation") {
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      throw new GraphQLError("Schema is not configured for mutations.", {
        nodes: operation
      });
    }
    return mutationType;
  }
  if (operation.operation === "subscription") {
    const subscriptionType = schema.getSubscriptionType();
    if (!subscriptionType) {
      throw new GraphQLError("Schema is not configured for subscriptions.", {
        nodes: operation
      });
    }
    return subscriptionType;
  }
  throw new GraphQLError(
    "Can only have query, mutation and subscription operations.",
    {
      nodes: operation
    }
  );
}
var init_getOperationRootType = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/getOperationRootType.mjs"() {
    init_GraphQLError();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/introspectionFromSchema.mjs
function introspectionFromSchema(schema, options) {
  const optionsWithDefaults = {
    specifiedByUrl: true,
    directiveIsRepeatable: true,
    schemaDescription: true,
    inputValueDeprecation: true,
    ...options
  };
  const document2 = parse(getIntrospectionQuery(optionsWithDefaults));
  const result = executeSync({
    schema,
    document: document2
  });
  !result.errors && result.data || invariant(false);
  return result.data;
}
var init_introspectionFromSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/introspectionFromSchema.mjs"() {
    init_invariant();
    init_parser();
    init_execute();
    init_getIntrospectionQuery();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/buildClientSchema.mjs
function buildClientSchema(introspection, options) {
  isObjectLike(introspection) && isObjectLike(introspection.__schema) || devAssert(
    false,
    `Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ${inspect(
      introspection
    )}.`
  );
  const schemaIntrospection = introspection.__schema;
  const typeMap = keyValMap(
    schemaIntrospection.types,
    (typeIntrospection) => typeIntrospection.name,
    (typeIntrospection) => buildType(typeIntrospection)
  );
  for (const stdType of [...specifiedScalarTypes, ...introspectionTypes]) {
    if (typeMap[stdType.name]) {
      typeMap[stdType.name] = stdType;
    }
  }
  const queryType = schemaIntrospection.queryType ? getObjectType(schemaIntrospection.queryType) : null;
  const mutationType = schemaIntrospection.mutationType ? getObjectType(schemaIntrospection.mutationType) : null;
  const subscriptionType = schemaIntrospection.subscriptionType ? getObjectType(schemaIntrospection.subscriptionType) : null;
  const directives = schemaIntrospection.directives ? schemaIntrospection.directives.map(buildDirective) : [];
  return new GraphQLSchema({
    description: schemaIntrospection.description,
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: Object.values(typeMap),
    directives,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
  function getType(typeRef) {
    if (typeRef.kind === TypeKind.LIST) {
      const itemRef = typeRef.ofType;
      if (!itemRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      return new GraphQLList(getType(itemRef));
    }
    if (typeRef.kind === TypeKind.NON_NULL) {
      const nullableRef = typeRef.ofType;
      if (!nullableRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      const nullableType = getType(nullableRef);
      return new GraphQLNonNull(assertNullableType(nullableType));
    }
    return getNamedType2(typeRef);
  }
  function getNamedType2(typeRef) {
    const typeName = typeRef.name;
    if (!typeName) {
      throw new Error(`Unknown type reference: ${inspect(typeRef)}.`);
    }
    const type = typeMap[typeName];
    if (!type) {
      throw new Error(
        `Invalid or incomplete schema, unknown type: ${typeName}. Ensure that a full introspection query is used in order to build a client schema.`
      );
    }
    return type;
  }
  function getObjectType(typeRef) {
    return assertObjectType(getNamedType2(typeRef));
  }
  function getInterfaceType(typeRef) {
    return assertInterfaceType(getNamedType2(typeRef));
  }
  function buildType(type) {
    if (type != null && type.name != null && type.kind != null) {
      switch (type.kind) {
        case TypeKind.SCALAR:
          return buildScalarDef(type);
        case TypeKind.OBJECT:
          return buildObjectDef(type);
        case TypeKind.INTERFACE:
          return buildInterfaceDef(type);
        case TypeKind.UNION:
          return buildUnionDef(type);
        case TypeKind.ENUM:
          return buildEnumDef(type);
        case TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }
    const typeStr = inspect(type);
    throw new Error(
      `Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ${typeStr}.`
    );
  }
  function buildScalarDef(scalarIntrospection) {
    return new GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
      specifiedByURL: scalarIntrospection.specifiedByURL
    });
  }
  function buildImplementationsList(implementingIntrospection) {
    if (implementingIntrospection.interfaces === null && implementingIntrospection.kind === TypeKind.INTERFACE) {
      return [];
    }
    if (!implementingIntrospection.interfaces) {
      const implementingIntrospectionStr = inspect(implementingIntrospection);
      throw new Error(
        `Introspection result missing interfaces: ${implementingIntrospectionStr}.`
      );
    }
    return implementingIntrospection.interfaces.map(getInterfaceType);
  }
  function buildObjectDef(objectIntrospection) {
    return new GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: () => buildImplementationsList(objectIntrospection),
      fields: () => buildFieldDefMap(objectIntrospection)
    });
  }
  function buildInterfaceDef(interfaceIntrospection) {
    return new GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      interfaces: () => buildImplementationsList(interfaceIntrospection),
      fields: () => buildFieldDefMap(interfaceIntrospection)
    });
  }
  function buildUnionDef(unionIntrospection) {
    if (!unionIntrospection.possibleTypes) {
      const unionIntrospectionStr = inspect(unionIntrospection);
      throw new Error(
        `Introspection result missing possibleTypes: ${unionIntrospectionStr}.`
      );
    }
    return new GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: () => unionIntrospection.possibleTypes.map(getObjectType)
    });
  }
  function buildEnumDef(enumIntrospection) {
    if (!enumIntrospection.enumValues) {
      const enumIntrospectionStr = inspect(enumIntrospection);
      throw new Error(
        `Introspection result missing enumValues: ${enumIntrospectionStr}.`
      );
    }
    return new GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: keyValMap(
        enumIntrospection.enumValues,
        (valueIntrospection) => valueIntrospection.name,
        (valueIntrospection) => ({
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason
        })
      )
    });
  }
  function buildInputObjectDef(inputObjectIntrospection) {
    if (!inputObjectIntrospection.inputFields) {
      const inputObjectIntrospectionStr = inspect(inputObjectIntrospection);
      throw new Error(
        `Introspection result missing inputFields: ${inputObjectIntrospectionStr}.`
      );
    }
    return new GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: () => buildInputValueDefMap(inputObjectIntrospection.inputFields)
    });
  }
  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error(
        `Introspection result missing fields: ${inspect(typeIntrospection)}.`
      );
    }
    return keyValMap(
      typeIntrospection.fields,
      (fieldIntrospection) => fieldIntrospection.name,
      buildField
    );
  }
  function buildField(fieldIntrospection) {
    const type = getType(fieldIntrospection.type);
    if (!isOutputType(type)) {
      const typeStr = inspect(type);
      throw new Error(
        `Introspection must provide output type for fields, but received: ${typeStr}.`
      );
    }
    if (!fieldIntrospection.args) {
      const fieldIntrospectionStr = inspect(fieldIntrospection);
      throw new Error(
        `Introspection result missing field args: ${fieldIntrospectionStr}.`
      );
    }
    return {
      description: fieldIntrospection.description,
      deprecationReason: fieldIntrospection.deprecationReason,
      type,
      args: buildInputValueDefMap(fieldIntrospection.args)
    };
  }
  function buildInputValueDefMap(inputValueIntrospections) {
    return keyValMap(
      inputValueIntrospections,
      (inputValue) => inputValue.name,
      buildInputValue
    );
  }
  function buildInputValue(inputValueIntrospection) {
    const type = getType(inputValueIntrospection.type);
    if (!isInputType(type)) {
      const typeStr = inspect(type);
      throw new Error(
        `Introspection must provide input type for arguments, but received: ${typeStr}.`
      );
    }
    const defaultValue = inputValueIntrospection.defaultValue != null ? valueFromAST(parseValue(inputValueIntrospection.defaultValue), type) : void 0;
    return {
      description: inputValueIntrospection.description,
      type,
      defaultValue,
      deprecationReason: inputValueIntrospection.deprecationReason
    };
  }
  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      const directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive args: ${directiveIntrospectionStr}.`
      );
    }
    if (!directiveIntrospection.locations) {
      const directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive locations: ${directiveIntrospectionStr}.`
      );
    }
    return new GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      isRepeatable: directiveIntrospection.isRepeatable,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args)
    });
  }
}
var init_buildClientSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/buildClientSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_isObjectLike();
    init_keyValMap();
    init_parser();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_valueFromAST();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/extendSchema.mjs
function extendSchema(schema, documentAST, options) {
  assertSchema(schema);
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(false, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDLExtension(documentAST, schema);
  }
  const schemaConfig = schema.toConfig();
  const extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
  return schemaConfig === extendedConfig ? schema : new GraphQLSchema(extendedConfig);
}
function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
  const typeDefs = [];
  const typeExtensionsMap = /* @__PURE__ */ Object.create(null);
  const directiveDefs = [];
  let schemaDef;
  const schemaExtensions = [];
  for (const def of documentAST.definitions) {
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }
  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
    return schemaConfig;
  }
  const typeMap = /* @__PURE__ */ Object.create(null);
  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }
  for (const typeNode of typeDefs) {
    var _stdTypeMap$name;
    const name = typeNode.name.value;
    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
  }
  const operationTypes = {
    // Get the extended root operation types.
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
    // Then, incorporate schema definition and all schema extensions.
    ...schemaDef && getOperationTypes([schemaDef]),
    ...getOperationTypes(schemaExtensions)
  };
  return {
    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value,
    ...operationTypes,
    types: Object.values(typeMap),
    directives: [
      ...schemaConfig.directives.map(replaceDirective),
      ...directiveDefs.map(buildDirective)
    ],
    extensions: /* @__PURE__ */ Object.create(null),
    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
  };
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    }
    if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      args: mapValue(config.args, extendArg)
    });
  }
  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      return type;
    }
    if (isScalarType(type)) {
      return extendScalarType(type);
    }
    if (isObjectType(type)) {
      return extendObjectType(type);
    }
    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }
    if (isUnionType(type)) {
      return extendUnionType(type);
    }
    if (isEnumType(type)) {
      return extendEnumType(type);
    }
    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    invariant(false, "Unexpected type: " + inspect(type));
  }
  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
    return new GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, (field) => ({
          ...field,
          type: replaceType(field.type)
        })),
        ...buildInputFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendEnumType(type) {
    var _typeExtensionsMap$ty;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
    return new GraphQLEnumType({
      ...config,
      values: { ...config.values, ...buildEnumValueMap(extensions) },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendScalarType(type) {
    var _typeExtensionsMap$co2;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
    let specifiedByURL = config.specifiedByURL;
    for (const extensionNode of extensions) {
      var _getSpecifiedByURL;
      specifiedByURL = (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null && _getSpecifiedByURL !== void 0 ? _getSpecifiedByURL : specifiedByURL;
    }
    return new GraphQLScalarType({
      ...config,
      specifiedByURL,
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendObjectType(type) {
    var _typeExtensionsMap$co3;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
    return new GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
    return new GraphQLInterfaceType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendUnionType(type) {
    var _typeExtensionsMap$co5;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
    return new GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        ...buildUnionTypes(extensions)
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: field.args && mapValue(field.args, extendArg)
    };
  }
  function extendArg(arg) {
    return { ...arg, type: replaceType(arg.type) };
  }
  function getOperationTypes(nodes) {
    const opTypes = {};
    for (const node of nodes) {
      var _node$operationTypes;
      const operationTypesNodes = (
        /* c8 ignore next */
        (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : []
      );
      for (const operationType of operationTypesNodes) {
        opTypes[operationType.operation] = getNamedType2(operationType.type);
      }
    }
    return opTypes;
  }
  function getNamedType2(node) {
    var _stdTypeMap$name2;
    const name = node.name.value;
    const type = (_stdTypeMap$name2 = stdTypeMap[name]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name];
    if (type === void 0) {
      throw new Error(`Unknown type: "${name}".`);
    }
    return type;
  }
  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }
    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }
    return getNamedType2(node);
  }
  function buildDirective(node) {
    var _node$description;
    return new GraphQLDirective({
      name: node.name.value,
      description: (_node$description = node.description) === null || _node$description === void 0 ? void 0 : _node$description.value,
      // @ts-expect-error
      locations: node.locations.map(({ value }) => value),
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node
    });
  }
  function buildFieldMap(nodes) {
    const fieldConfigMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields;
      const nodeFields = (
        /* c8 ignore next */
        (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : []
      );
      for (const field of nodeFields) {
        var _field$description;
        fieldConfigMap[field.name.value] = {
          // Note: While this could make assertions to get the correctly typed
          // value, that would throw immediately while type system validation
          // with validateSchema() will produce more actionable results.
          type: getWrappedType(field.type),
          description: (_field$description = field.description) === null || _field$description === void 0 ? void 0 : _field$description.value,
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return fieldConfigMap;
  }
  function buildArgumentMap(args) {
    const argsNodes = (
      /* c8 ignore next */
      args !== null && args !== void 0 ? args : []
    );
    const argConfigMap = /* @__PURE__ */ Object.create(null);
    for (const arg of argsNodes) {
      var _arg$description;
      const type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description: (_arg$description = arg.description) === null || _arg$description === void 0 ? void 0 : _arg$description.value,
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg
      };
    }
    return argConfigMap;
  }
  function buildInputFieldMap(nodes) {
    const inputFieldMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields2;
      const fieldsNodes = (
        /* c8 ignore next */
        (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : []
      );
      for (const field of fieldsNodes) {
        var _field$description2;
        const type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description: (_field$description2 = field.description) === null || _field$description2 === void 0 ? void 0 : _field$description2.value,
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return inputFieldMap;
  }
  function buildEnumValueMap(nodes) {
    const enumValueMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$values;
      const valuesNodes = (
        /* c8 ignore next */
        (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : []
      );
      for (const value of valuesNodes) {
        var _value$description;
        enumValueMap[value.name.value] = {
          description: (_value$description = value.description) === null || _value$description === void 0 ? void 0 : _value$description.value,
          deprecationReason: getDeprecationReason(value),
          astNode: value
        };
      }
    }
    return enumValueMap;
  }
  function buildInterfaces(nodes) {
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$interfaces$map, _node$interfaces;
        return (
          /* c8 ignore next */
          (_node$interfaces$map = (_node$interfaces = node.interfaces) === null || _node$interfaces === void 0 ? void 0 : _node$interfaces.map(getNamedType2)) !== null && _node$interfaces$map !== void 0 ? _node$interfaces$map : []
        );
      }
    );
  }
  function buildUnionTypes(nodes) {
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$types$map, _node$types;
        return (
          /* c8 ignore next */
          (_node$types$map = (_node$types = node.types) === null || _node$types === void 0 ? void 0 : _node$types.map(getNamedType2)) !== null && _node$types$map !== void 0 ? _node$types$map : []
        );
      }
    );
  }
  function buildType(astNode) {
    var _typeExtensionsMap$na;
    const name = astNode.name.value;
    const extensionASTNodes = (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];
    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var _astNode$description;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLObjectType({
          name,
          description: (_astNode$description = astNode.description) === null || _astNode$description === void 0 ? void 0 : _astNode$description.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _astNode$description2;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInterfaceType({
          name,
          description: (_astNode$description2 = astNode.description) === null || _astNode$description2 === void 0 ? void 0 : _astNode$description2.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.ENUM_TYPE_DEFINITION: {
        var _astNode$description3;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLEnumType({
          name,
          description: (_astNode$description3 = astNode.description) === null || _astNode$description3 === void 0 ? void 0 : _astNode$description3.value,
          values: buildEnumValueMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.UNION_TYPE_DEFINITION: {
        var _astNode$description4;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLUnionType({
          name,
          description: (_astNode$description4 = astNode.description) === null || _astNode$description4 === void 0 ? void 0 : _astNode$description4.value,
          types: () => buildUnionTypes(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.SCALAR_TYPE_DEFINITION: {
        var _astNode$description5;
        return new GraphQLScalarType({
          name,
          description: (_astNode$description5 = astNode.description) === null || _astNode$description5 === void 0 ? void 0 : _astNode$description5.value,
          specifiedByURL: getSpecifiedByURL(astNode),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _astNode$description6;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInputObjectType({
          name,
          description: (_astNode$description6 = astNode.description) === null || _astNode$description6 === void 0 ? void 0 : _astNode$description6.value,
          fields: () => buildInputFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
    }
  }
}
function getDeprecationReason(node) {
  const deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
}
function getSpecifiedByURL(node) {
  const specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
}
var stdTypeMap;
var init_extendSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/extendSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant();
    init_keyMap();
    init_mapValue();
    init_kinds();
    init_predicates();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_validate2();
    init_values();
    init_valueFromAST();
    stdTypeMap = keyMap(
      [...specifiedScalarTypes, ...introspectionTypes],
      (type) => type.name
    );
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/buildASTSchema.mjs
function buildASTSchema(documentAST, options) {
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(false, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDL(documentAST);
  }
  const emptySchemaConfig = {
    description: void 0,
    types: [],
    directives: [],
    extensions: /* @__PURE__ */ Object.create(null),
    extensionASTNodes: [],
    assumeValid: false
  };
  const config = extendSchemaImpl(emptySchemaConfig, documentAST, options);
  if (config.astNode == null) {
    for (const type of config.types) {
      switch (type.name) {
        case "Query":
          config.query = type;
          break;
        case "Mutation":
          config.mutation = type;
          break;
        case "Subscription":
          config.subscription = type;
          break;
      }
    }
  }
  const directives = [
    ...config.directives,
    // If specified directives were not explicitly declared, add them.
    ...specifiedDirectives.filter(
      (stdDirective) => config.directives.every(
        (directive) => directive.name !== stdDirective.name
      )
    )
  ];
  return new GraphQLSchema({ ...config, directives });
}
function buildSchema(source, options) {
  const document2 = parse(source, {
    noLocation: options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacyFragmentVariables: options === null || options === void 0 ? void 0 : options.allowLegacyFragmentVariables
  });
  return buildASTSchema(document2, {
    assumeValidSDL: options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
}
var init_buildASTSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/buildASTSchema.mjs"() {
    init_devAssert();
    init_kinds();
    init_parser();
    init_directives();
    init_schema();
    init_validate2();
    init_extendSchema();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/lexicographicSortSchema.mjs
function lexicographicSortSchema(schema) {
  const schemaConfig = schema.toConfig();
  const typeMap = keyValMap(
    sortByName(schemaConfig.types),
    (type) => type.name,
    sortNamedType
  );
  return new GraphQLSchema({
    ...schemaConfig,
    types: Object.values(typeMap),
    directives: sortByName(schemaConfig.directives).map(sortDirective),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription)
  });
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    } else if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceMaybeType(maybeType) {
    return maybeType && replaceNamedType(maybeType);
  }
  function sortDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      locations: sortBy(config.locations, (x) => x),
      args: sortArgs(config.args)
    });
  }
  function sortArgs(args) {
    return sortObjMap(args, (arg) => ({ ...arg, type: replaceType(arg.type) }));
  }
  function sortFields2(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type),
      args: field.args && sortArgs(field.args)
    }));
  }
  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type)
    }));
  }
  function sortTypes(array) {
    return sortByName(array).map(replaceNamedType);
  }
  function sortNamedType(type) {
    if (isScalarType(type) || isIntrospectionType(type)) {
      return type;
    }
    if (isObjectType(type)) {
      const config = type.toConfig();
      return new GraphQLObjectType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields2(config.fields)
      });
    }
    if (isInterfaceType(type)) {
      const config = type.toConfig();
      return new GraphQLInterfaceType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields2(config.fields)
      });
    }
    if (isUnionType(type)) {
      const config = type.toConfig();
      return new GraphQLUnionType({
        ...config,
        types: () => sortTypes(config.types)
      });
    }
    if (isEnumType(type)) {
      const config = type.toConfig();
      return new GraphQLEnumType({
        ...config,
        values: sortObjMap(config.values, (value) => value)
      });
    }
    if (isInputObjectType(type)) {
      const config = type.toConfig();
      return new GraphQLInputObjectType({
        ...config,
        fields: () => sortInputFields(config.fields)
      });
    }
    invariant(false, "Unexpected type: " + inspect(type));
  }
}
function sortObjMap(map, sortValueFn) {
  const sortedMap = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map).sort(naturalCompare)) {
    sortedMap[key] = sortValueFn(map[key]);
  }
  return sortedMap;
}
function sortByName(array) {
  return sortBy(array, (obj) => obj.name);
}
function sortBy(array, mapToKey) {
  return array.slice().sort((obj1, obj2) => {
    const key1 = mapToKey(obj1);
    const key2 = mapToKey(obj2);
    return naturalCompare(key1, key2);
  });
}
var init_lexicographicSortSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/lexicographicSortSchema.mjs"() {
    init_inspect();
    init_invariant();
    init_keyValMap();
    init_naturalCompare();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/printSchema.mjs
function printSchema(schema) {
  return printFilteredSchema(
    schema,
    (n) => !isSpecifiedDirective(n),
    isDefinedType
  );
}
function printIntrospectionSchema(schema) {
  return printFilteredSchema(schema, isSpecifiedDirective, isIntrospectionType);
}
function isDefinedType(type) {
  return !isSpecifiedScalarType(type) && !isIntrospectionType(type);
}
function printFilteredSchema(schema, directiveFilter, typeFilter) {
  const directives = schema.getDirectives().filter(directiveFilter);
  const types = Object.values(schema.getTypeMap()).filter(typeFilter);
  return [
    printSchemaDefinition(schema),
    ...directives.map((directive) => printDirective(directive)),
    ...types.map((type) => printType(type))
  ].filter(Boolean).join("\n\n");
}
function printSchemaDefinition(schema) {
  if (schema.description == null && isSchemaOfCommonNames(schema)) {
    return;
  }
  const operationTypes = [];
  const queryType = schema.getQueryType();
  if (queryType) {
    operationTypes.push(`  query: ${queryType.name}`);
  }
  const mutationType = schema.getMutationType();
  if (mutationType) {
    operationTypes.push(`  mutation: ${mutationType.name}`);
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    operationTypes.push(`  subscription: ${subscriptionType.name}`);
  }
  return printDescription(schema) + `schema {
${operationTypes.join("\n")}
}`;
}
function isSchemaOfCommonNames(schema) {
  const queryType = schema.getQueryType();
  if (queryType && queryType.name !== "Query") {
    return false;
  }
  const mutationType = schema.getMutationType();
  if (mutationType && mutationType.name !== "Mutation") {
    return false;
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && subscriptionType.name !== "Subscription") {
    return false;
  }
  return true;
}
function printType(type) {
  if (isScalarType(type)) {
    return printScalar(type);
  }
  if (isObjectType(type)) {
    return printObject(type);
  }
  if (isInterfaceType(type)) {
    return printInterface(type);
  }
  if (isUnionType(type)) {
    return printUnion(type);
  }
  if (isEnumType(type)) {
    return printEnum(type);
  }
  if (isInputObjectType(type)) {
    return printInputObject(type);
  }
  invariant(false, "Unexpected type: " + inspect(type));
}
function printScalar(type) {
  return printDescription(type) + `scalar ${type.name}` + printSpecifiedByURL(type);
}
function printImplementedInterfaces(type) {
  const interfaces = type.getInterfaces();
  return interfaces.length ? " implements " + interfaces.map((i) => i.name).join(" & ") : "";
}
function printObject(type) {
  return printDescription(type) + `type ${type.name}` + printImplementedInterfaces(type) + printFields(type);
}
function printInterface(type) {
  return printDescription(type) + `interface ${type.name}` + printImplementedInterfaces(type) + printFields(type);
}
function printUnion(type) {
  const types = type.getTypes();
  const possibleTypes = types.length ? " = " + types.join(" | ") : "";
  return printDescription(type) + "union " + type.name + possibleTypes;
}
function printEnum(type) {
  const values = type.getValues().map(
    (value, i) => printDescription(value, "  ", !i) + "  " + value.name + printDeprecated(value.deprecationReason)
  );
  return printDescription(type) + `enum ${type.name}` + printBlock(values);
}
function printInputObject(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) => printDescription(f, "  ", !i) + "  " + printInputValue(f)
  );
  return printDescription(type) + `input ${type.name}` + printBlock(fields);
}
function printFields(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) => printDescription(f, "  ", !i) + "  " + f.name + printArgs(f.args, "  ") + ": " + String(f.type) + printDeprecated(f.deprecationReason)
  );
  return printBlock(fields);
}
function printBlock(items) {
  return items.length !== 0 ? " {\n" + items.join("\n") + "\n}" : "";
}
function printArgs(args, indentation = "") {
  if (args.length === 0) {
    return "";
  }
  if (args.every((arg) => !arg.description)) {
    return "(" + args.map(printInputValue).join(", ") + ")";
  }
  return "(\n" + args.map(
    (arg, i) => printDescription(arg, "  " + indentation, !i) + "  " + indentation + printInputValue(arg)
  ).join("\n") + "\n" + indentation + ")";
}
function printInputValue(arg) {
  const defaultAST = astFromValue(arg.defaultValue, arg.type);
  let argDecl = arg.name + ": " + String(arg.type);
  if (defaultAST) {
    argDecl += ` = ${print(defaultAST)}`;
  }
  return argDecl + printDeprecated(arg.deprecationReason);
}
function printDirective(directive) {
  return printDescription(directive) + "directive @" + directive.name + printArgs(directive.args) + (directive.isRepeatable ? " repeatable" : "") + " on " + directive.locations.join(" | ");
}
function printDeprecated(reason) {
  if (reason == null) {
    return "";
  }
  if (reason !== DEFAULT_DEPRECATION_REASON) {
    const astValue = print({
      kind: Kind.STRING,
      value: reason
    });
    return ` @deprecated(reason: ${astValue})`;
  }
  return " @deprecated";
}
function printSpecifiedByURL(scalar) {
  if (scalar.specifiedByURL == null) {
    return "";
  }
  const astValue = print({
    kind: Kind.STRING,
    value: scalar.specifiedByURL
  });
  return ` @specifiedBy(url: ${astValue})`;
}
function printDescription(def, indentation = "", firstInBlock = true) {
  const { description } = def;
  if (description == null) {
    return "";
  }
  const blockString = print({
    kind: Kind.STRING,
    value: description,
    block: isPrintableAsBlockString(description)
  });
  const prefix = indentation && !firstInBlock ? "\n" + indentation : indentation;
  return prefix + blockString.replace(/\n/g, "\n" + indentation) + "\n";
}
var init_printSchema = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/printSchema.mjs"() {
    init_inspect();
    init_invariant();
    init_blockString();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_astFromValue();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/concatAST.mjs
function concatAST(documents) {
  const definitions = [];
  for (const doc of documents) {
    definitions.push(...doc.definitions);
  }
  return {
    kind: Kind.DOCUMENT,
    definitions
  };
}
var init_concatAST = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/concatAST.mjs"() {
    init_kinds();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/separateOperations.mjs
function separateOperations(documentAST) {
  const operations = [];
  const depGraph = /* @__PURE__ */ Object.create(null);
  for (const definitionNode of documentAST.definitions) {
    switch (definitionNode.kind) {
      case Kind.OPERATION_DEFINITION:
        operations.push(definitionNode);
        break;
      case Kind.FRAGMENT_DEFINITION:
        depGraph[definitionNode.name.value] = collectDependencies(
          definitionNode.selectionSet
        );
        break;
      default:
    }
  }
  const separatedDocumentASTs = /* @__PURE__ */ Object.create(null);
  for (const operation of operations) {
    const dependencies = /* @__PURE__ */ new Set();
    for (const fragmentName of collectDependencies(operation.selectionSet)) {
      collectTransitiveDependencies(dependencies, depGraph, fragmentName);
    }
    const operationName = operation.name ? operation.name.value : "";
    separatedDocumentASTs[operationName] = {
      kind: Kind.DOCUMENT,
      definitions: documentAST.definitions.filter(
        (node) => node === operation || node.kind === Kind.FRAGMENT_DEFINITION && dependencies.has(node.name.value)
      )
    };
  }
  return separatedDocumentASTs;
}
function collectTransitiveDependencies(collected, depGraph, fromName) {
  if (!collected.has(fromName)) {
    collected.add(fromName);
    const immediateDeps = depGraph[fromName];
    if (immediateDeps !== void 0) {
      for (const toName of immediateDeps) {
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}
function collectDependencies(selectionSet) {
  const dependencies = [];
  visit(selectionSet, {
    FragmentSpread(node) {
      dependencies.push(node.name.value);
    }
  });
  return dependencies;
}
var init_separateOperations = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/separateOperations.mjs"() {
    init_kinds();
    init_visitor();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/stripIgnoredCharacters.mjs
function stripIgnoredCharacters(source) {
  const sourceObj = isSource(source) ? source : new Source(source);
  const body = sourceObj.body;
  const lexer2 = new Lexer(sourceObj);
  let strippedBody = "";
  let wasLastAddedTokenNonPunctuator = false;
  while (lexer2.advance().kind !== TokenKind.EOF) {
    const currentToken = lexer2.token;
    const tokenKind = currentToken.kind;
    const isNonPunctuator = !isPunctuatorTokenKind(currentToken.kind);
    if (wasLastAddedTokenNonPunctuator) {
      if (isNonPunctuator || currentToken.kind === TokenKind.SPREAD) {
        strippedBody += " ";
      }
    }
    const tokenBody = body.slice(currentToken.start, currentToken.end);
    if (tokenKind === TokenKind.BLOCK_STRING) {
      strippedBody += printBlockString(currentToken.value, {
        minimize: true
      });
    } else {
      strippedBody += tokenBody;
    }
    wasLastAddedTokenNonPunctuator = isNonPunctuator;
  }
  return strippedBody;
}
var init_stripIgnoredCharacters = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/stripIgnoredCharacters.mjs"() {
    init_blockString();
    init_lexer();
    init_source();
    init_tokenKind();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/assertValidName.mjs
function assertValidName(name) {
  const error = isValidNameError(name);
  if (error) {
    throw error;
  }
  return name;
}
function isValidNameError(name) {
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.startsWith("__")) {
    return new GraphQLError(
      `Name "${name}" must not begin with "__", which is reserved by GraphQL introspection.`
    );
  }
  try {
    assertName(name);
  } catch (error) {
    return error;
  }
}
var init_assertValidName = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/assertValidName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_assertName();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/findBreakingChanges.mjs
function findBreakingChanges(oldSchema, newSchema) {
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in BreakingChangeType
  );
}
function findDangerousChanges(oldSchema, newSchema) {
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in DangerousChangeType
  );
}
function findSchemaChanges(oldSchema, newSchema) {
  return [
    ...findTypeChanges(oldSchema, newSchema),
    ...findDirectiveChanges(oldSchema, newSchema)
  ];
}
function findDirectiveChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const directivesDiff = diff(
    oldSchema.getDirectives(),
    newSchema.getDirectives()
  );
  for (const oldDirective of directivesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.DIRECTIVE_REMOVED,
      description: `${oldDirective.name} was removed.`
    });
  }
  for (const [oldDirective, newDirective] of directivesDiff.persisted) {
    const argsDiff = diff(oldDirective.args, newDirective.args);
    for (const newArg of argsDiff.added) {
      if (isRequiredArgument(newArg)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
          description: `A required arg ${newArg.name} on directive ${oldDirective.name} was added.`
        });
      }
    }
    for (const oldArg of argsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
        description: `${oldArg.name} was removed from ${oldDirective.name}.`
      });
    }
    if (oldDirective.isRepeatable && !newDirective.isRepeatable) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_REPEATABLE_REMOVED,
        description: `Repeatable flag was removed from ${oldDirective.name}.`
      });
    }
    for (const location2 of oldDirective.locations) {
      if (!newDirective.locations.includes(location2)) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
          description: `${location2} was removed from ${oldDirective.name}.`
        });
      }
    }
  }
  return schemaChanges;
}
function findTypeChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const typesDiff = diff(
    Object.values(oldSchema.getTypeMap()),
    Object.values(newSchema.getTypeMap())
  );
  for (const oldType of typesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED,
      description: isSpecifiedScalarType(oldType) ? `Standard scalar ${oldType.name} was removed because it is not referenced anymore.` : `${oldType.name} was removed.`
    });
  }
  for (const [oldType, newType] of typesDiff.persisted) {
    if (isEnumType(oldType) && isEnumType(newType)) {
      schemaChanges.push(...findEnumTypeChanges(oldType, newType));
    } else if (isUnionType(oldType) && isUnionType(newType)) {
      schemaChanges.push(...findUnionTypeChanges(oldType, newType));
    } else if (isInputObjectType(oldType) && isInputObjectType(newType)) {
      schemaChanges.push(...findInputObjectTypeChanges(oldType, newType));
    } else if (isObjectType(oldType) && isObjectType(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType)
      );
    } else if (isInterfaceType(oldType) && isInterfaceType(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType)
      );
    } else if (oldType.constructor !== newType.constructor) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_CHANGED_KIND,
        description: `${oldType.name} changed from ${typeKindName(oldType)} to ${typeKindName(newType)}.`
      });
    }
  }
  return schemaChanges;
}
function findInputObjectTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields())
  );
  for (const newField of fieldsDiff.added) {
    if (isRequiredInputField(newField)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
        description: `A required field ${newField.name} on input type ${oldType.name} was added.`
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
        description: `An optional field ${newField.name} on input type ${oldType.name} was added.`
      });
    }
  }
  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`
    });
  }
  for (const [oldField, newField] of fieldsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldField.type,
      newField.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} changed type from ${String(oldField.type)} to ${String(newField.type)}.`
      });
    }
  }
  return schemaChanges;
}
function findUnionTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const possibleTypesDiff = diff(oldType.getTypes(), newType.getTypes());
  for (const newPossibleType of possibleTypesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.TYPE_ADDED_TO_UNION,
      description: `${newPossibleType.name} was added to union type ${oldType.name}.`
    });
  }
  for (const oldPossibleType of possibleTypesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
      description: `${oldPossibleType.name} was removed from union type ${oldType.name}.`
    });
  }
  return schemaChanges;
}
function findEnumTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const valuesDiff = diff(oldType.getValues(), newType.getValues());
  for (const newValue of valuesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
      description: `${newValue.name} was added to enum type ${oldType.name}.`
    });
  }
  for (const oldValue of valuesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
      description: `${oldValue.name} was removed from enum type ${oldType.name}.`
    });
  }
  return schemaChanges;
}
function findImplementedInterfacesChanges(oldType, newType) {
  const schemaChanges = [];
  const interfacesDiff = diff(oldType.getInterfaces(), newType.getInterfaces());
  for (const newInterface of interfacesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.IMPLEMENTED_INTERFACE_ADDED,
      description: `${newInterface.name} added to interfaces implemented by ${oldType.name}.`
    });
  }
  for (const oldInterface of interfacesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.IMPLEMENTED_INTERFACE_REMOVED,
      description: `${oldType.name} no longer implements interface ${oldInterface.name}.`
    });
  }
  return schemaChanges;
}
function findFieldChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields())
  );
  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`
    });
  }
  for (const [oldField, newField] of fieldsDiff.persisted) {
    schemaChanges.push(...findArgChanges(oldType, oldField, newField));
    const isSafe = isChangeSafeForObjectOrInterfaceField(
      oldField.type,
      newField.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} changed type from ${String(oldField.type)} to ${String(newField.type)}.`
      });
    }
  }
  return schemaChanges;
}
function findArgChanges(oldType, oldField, newField) {
  const schemaChanges = [];
  const argsDiff = diff(oldField.args, newField.args);
  for (const oldArg of argsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.ARG_REMOVED,
      description: `${oldType.name}.${oldField.name} arg ${oldArg.name} was removed.`
    });
  }
  for (const [oldArg, newArg] of argsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldArg.type,
      newArg.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.ARG_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed type from ${String(oldArg.type)} to ${String(newArg.type)}.`
      });
    } else if (oldArg.defaultValue !== void 0) {
      if (newArg.defaultValue === void 0) {
        schemaChanges.push({
          type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
          description: `${oldType.name}.${oldField.name} arg ${oldArg.name} defaultValue was removed.`
        });
      } else {
        const oldValueStr = stringifyValue(oldArg.defaultValue, oldArg.type);
        const newValueStr = stringifyValue(newArg.defaultValue, newArg.type);
        if (oldValueStr !== newValueStr) {
          schemaChanges.push({
            type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
            description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed defaultValue from ${oldValueStr} to ${newValueStr}.`
          });
        }
      }
    }
  }
  for (const newArg of argsDiff.added) {
    if (isRequiredArgument(newArg)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_ARG_ADDED,
        description: `A required arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_ARG_ADDED,
        description: `An optional arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
      });
    }
  }
  return schemaChanges;
}
function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
  if (isListType(oldType)) {
    return (
      // if they're both lists, make sure the underlying types are compatible
      isListType(newType) && isChangeSafeForObjectOrInterfaceField(
        oldType.ofType,
        newType.ofType
      ) || // moving from nullable to non-null of the same underlying type is safe
      isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
    );
  }
  if (isNonNullType(oldType)) {
    return isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType);
  }
  return (
    // if they're both named types, see if their names are equivalent
    isNamedType(newType) && oldType.name === newType.name || // moving from nullable to non-null of the same underlying type is safe
    isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
  );
}
function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
  if (isListType(oldType)) {
    return isListType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType);
  }
  if (isNonNullType(oldType)) {
    return (
      // if they're both non-null, make sure the underlying types are
      // compatible
      isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(
        oldType.ofType,
        newType.ofType
      ) || // moving from non-null to nullable of the same underlying type is safe
      !isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType)
    );
  }
  return isNamedType(newType) && oldType.name === newType.name;
}
function typeKindName(type) {
  if (isScalarType(type)) {
    return "a Scalar type";
  }
  if (isObjectType(type)) {
    return "an Object type";
  }
  if (isInterfaceType(type)) {
    return "an Interface type";
  }
  if (isUnionType(type)) {
    return "a Union type";
  }
  if (isEnumType(type)) {
    return "an Enum type";
  }
  if (isInputObjectType(type)) {
    return "an Input type";
  }
  invariant(false, "Unexpected type: " + inspect(type));
}
function stringifyValue(value, type) {
  const ast = astFromValue(value, type);
  ast != null || invariant(false);
  return print(sortValueNode(ast));
}
function diff(oldArray, newArray) {
  const added = [];
  const removed = [];
  const persisted = [];
  const oldMap = keyMap(oldArray, ({ name }) => name);
  const newMap = keyMap(newArray, ({ name }) => name);
  for (const oldItem of oldArray) {
    const newItem = newMap[oldItem.name];
    if (newItem === void 0) {
      removed.push(oldItem);
    } else {
      persisted.push([oldItem, newItem]);
    }
  }
  for (const newItem of newArray) {
    if (oldMap[newItem.name] === void 0) {
      added.push(newItem);
    }
  }
  return {
    added,
    persisted,
    removed
  };
}
var BreakingChangeType, DangerousChangeType;
var init_findBreakingChanges = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/findBreakingChanges.mjs"() {
    init_inspect();
    init_invariant();
    init_keyMap();
    init_printer();
    init_definition();
    init_scalars();
    init_astFromValue();
    init_sortValueNode();
    (function(BreakingChangeType2) {
      BreakingChangeType2["TYPE_REMOVED"] = "TYPE_REMOVED";
      BreakingChangeType2["TYPE_CHANGED_KIND"] = "TYPE_CHANGED_KIND";
      BreakingChangeType2["TYPE_REMOVED_FROM_UNION"] = "TYPE_REMOVED_FROM_UNION";
      BreakingChangeType2["VALUE_REMOVED_FROM_ENUM"] = "VALUE_REMOVED_FROM_ENUM";
      BreakingChangeType2["REQUIRED_INPUT_FIELD_ADDED"] = "REQUIRED_INPUT_FIELD_ADDED";
      BreakingChangeType2["IMPLEMENTED_INTERFACE_REMOVED"] = "IMPLEMENTED_INTERFACE_REMOVED";
      BreakingChangeType2["FIELD_REMOVED"] = "FIELD_REMOVED";
      BreakingChangeType2["FIELD_CHANGED_KIND"] = "FIELD_CHANGED_KIND";
      BreakingChangeType2["REQUIRED_ARG_ADDED"] = "REQUIRED_ARG_ADDED";
      BreakingChangeType2["ARG_REMOVED"] = "ARG_REMOVED";
      BreakingChangeType2["ARG_CHANGED_KIND"] = "ARG_CHANGED_KIND";
      BreakingChangeType2["DIRECTIVE_REMOVED"] = "DIRECTIVE_REMOVED";
      BreakingChangeType2["DIRECTIVE_ARG_REMOVED"] = "DIRECTIVE_ARG_REMOVED";
      BreakingChangeType2["REQUIRED_DIRECTIVE_ARG_ADDED"] = "REQUIRED_DIRECTIVE_ARG_ADDED";
      BreakingChangeType2["DIRECTIVE_REPEATABLE_REMOVED"] = "DIRECTIVE_REPEATABLE_REMOVED";
      BreakingChangeType2["DIRECTIVE_LOCATION_REMOVED"] = "DIRECTIVE_LOCATION_REMOVED";
    })(BreakingChangeType || (BreakingChangeType = {}));
    (function(DangerousChangeType2) {
      DangerousChangeType2["VALUE_ADDED_TO_ENUM"] = "VALUE_ADDED_TO_ENUM";
      DangerousChangeType2["TYPE_ADDED_TO_UNION"] = "TYPE_ADDED_TO_UNION";
      DangerousChangeType2["OPTIONAL_INPUT_FIELD_ADDED"] = "OPTIONAL_INPUT_FIELD_ADDED";
      DangerousChangeType2["OPTIONAL_ARG_ADDED"] = "OPTIONAL_ARG_ADDED";
      DangerousChangeType2["IMPLEMENTED_INTERFACE_ADDED"] = "IMPLEMENTED_INTERFACE_ADDED";
      DangerousChangeType2["ARG_DEFAULT_VALUE_CHANGE"] = "ARG_DEFAULT_VALUE_CHANGE";
    })(DangerousChangeType || (DangerousChangeType = {}));
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/index.mjs
var init_utilities = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/utilities/index.mjs"() {
    init_getIntrospectionQuery();
    init_getOperationAST();
    init_getOperationRootType();
    init_introspectionFromSchema();
    init_buildClientSchema();
    init_buildASTSchema();
    init_extendSchema();
    init_lexicographicSortSchema();
    init_printSchema();
    init_typeFromAST();
    init_valueFromAST();
    init_valueFromASTUntyped();
    init_astFromValue();
    init_TypeInfo();
    init_coerceInputValue();
    init_concatAST();
    init_separateOperations();
    init_stripIgnoredCharacters();
    init_typeComparators();
    init_assertValidName();
    init_findBreakingChanges();
  }
});

// node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/index.mjs
var graphql_exports = {};
__export(graphql_exports, {
  BREAK: () => BREAK,
  BreakingChangeType: () => BreakingChangeType,
  DEFAULT_DEPRECATION_REASON: () => DEFAULT_DEPRECATION_REASON,
  DangerousChangeType: () => DangerousChangeType,
  DirectiveLocation: () => DirectiveLocation,
  ExecutableDefinitionsRule: () => ExecutableDefinitionsRule,
  FieldsOnCorrectTypeRule: () => FieldsOnCorrectTypeRule,
  FragmentsOnCompositeTypesRule: () => FragmentsOnCompositeTypesRule,
  GRAPHQL_MAX_INT: () => GRAPHQL_MAX_INT,
  GRAPHQL_MIN_INT: () => GRAPHQL_MIN_INT,
  GraphQLBoolean: () => GraphQLBoolean,
  GraphQLDeprecatedDirective: () => GraphQLDeprecatedDirective,
  GraphQLDirective: () => GraphQLDirective,
  GraphQLEnumType: () => GraphQLEnumType,
  GraphQLError: () => GraphQLError,
  GraphQLFloat: () => GraphQLFloat,
  GraphQLID: () => GraphQLID,
  GraphQLIncludeDirective: () => GraphQLIncludeDirective,
  GraphQLInputObjectType: () => GraphQLInputObjectType,
  GraphQLInt: () => GraphQLInt,
  GraphQLInterfaceType: () => GraphQLInterfaceType,
  GraphQLList: () => GraphQLList,
  GraphQLNonNull: () => GraphQLNonNull,
  GraphQLObjectType: () => GraphQLObjectType,
  GraphQLScalarType: () => GraphQLScalarType,
  GraphQLSchema: () => GraphQLSchema,
  GraphQLSkipDirective: () => GraphQLSkipDirective,
  GraphQLSpecifiedByDirective: () => GraphQLSpecifiedByDirective,
  GraphQLString: () => GraphQLString,
  GraphQLUnionType: () => GraphQLUnionType,
  Kind: () => Kind,
  KnownArgumentNamesRule: () => KnownArgumentNamesRule,
  KnownDirectivesRule: () => KnownDirectivesRule,
  KnownFragmentNamesRule: () => KnownFragmentNamesRule,
  KnownTypeNamesRule: () => KnownTypeNamesRule,
  Lexer: () => Lexer,
  Location: () => Location,
  LoneAnonymousOperationRule: () => LoneAnonymousOperationRule,
  LoneSchemaDefinitionRule: () => LoneSchemaDefinitionRule,
  NoDeprecatedCustomRule: () => NoDeprecatedCustomRule,
  NoFragmentCyclesRule: () => NoFragmentCyclesRule,
  NoSchemaIntrospectionCustomRule: () => NoSchemaIntrospectionCustomRule,
  NoUndefinedVariablesRule: () => NoUndefinedVariablesRule,
  NoUnusedFragmentsRule: () => NoUnusedFragmentsRule,
  NoUnusedVariablesRule: () => NoUnusedVariablesRule,
  OperationTypeNode: () => OperationTypeNode,
  OverlappingFieldsCanBeMergedRule: () => OverlappingFieldsCanBeMergedRule,
  PossibleFragmentSpreadsRule: () => PossibleFragmentSpreadsRule,
  PossibleTypeExtensionsRule: () => PossibleTypeExtensionsRule,
  ProvidedRequiredArgumentsRule: () => ProvidedRequiredArgumentsRule,
  ScalarLeafsRule: () => ScalarLeafsRule,
  SchemaMetaFieldDef: () => SchemaMetaFieldDef,
  SingleFieldSubscriptionsRule: () => SingleFieldSubscriptionsRule,
  Source: () => Source,
  Token: () => Token,
  TokenKind: () => TokenKind,
  TypeInfo: () => TypeInfo,
  TypeKind: () => TypeKind,
  TypeMetaFieldDef: () => TypeMetaFieldDef,
  TypeNameMetaFieldDef: () => TypeNameMetaFieldDef,
  UniqueArgumentDefinitionNamesRule: () => UniqueArgumentDefinitionNamesRule,
  UniqueArgumentNamesRule: () => UniqueArgumentNamesRule,
  UniqueDirectiveNamesRule: () => UniqueDirectiveNamesRule,
  UniqueDirectivesPerLocationRule: () => UniqueDirectivesPerLocationRule,
  UniqueEnumValueNamesRule: () => UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule: () => UniqueFieldDefinitionNamesRule,
  UniqueFragmentNamesRule: () => UniqueFragmentNamesRule,
  UniqueInputFieldNamesRule: () => UniqueInputFieldNamesRule,
  UniqueOperationNamesRule: () => UniqueOperationNamesRule,
  UniqueOperationTypesRule: () => UniqueOperationTypesRule,
  UniqueTypeNamesRule: () => UniqueTypeNamesRule,
  UniqueVariableNamesRule: () => UniqueVariableNamesRule,
  ValidationContext: () => ValidationContext,
  ValuesOfCorrectTypeRule: () => ValuesOfCorrectTypeRule,
  VariablesAreInputTypesRule: () => VariablesAreInputTypesRule,
  VariablesInAllowedPositionRule: () => VariablesInAllowedPositionRule,
  __Directive: () => __Directive,
  __DirectiveLocation: () => __DirectiveLocation,
  __EnumValue: () => __EnumValue,
  __Field: () => __Field,
  __InputValue: () => __InputValue,
  __Schema: () => __Schema,
  __Type: () => __Type,
  __TypeKind: () => __TypeKind,
  assertAbstractType: () => assertAbstractType,
  assertCompositeType: () => assertCompositeType,
  assertDirective: () => assertDirective,
  assertEnumType: () => assertEnumType,
  assertEnumValueName: () => assertEnumValueName,
  assertInputObjectType: () => assertInputObjectType,
  assertInputType: () => assertInputType,
  assertInterfaceType: () => assertInterfaceType,
  assertLeafType: () => assertLeafType,
  assertListType: () => assertListType,
  assertName: () => assertName,
  assertNamedType: () => assertNamedType,
  assertNonNullType: () => assertNonNullType,
  assertNullableType: () => assertNullableType,
  assertObjectType: () => assertObjectType,
  assertOutputType: () => assertOutputType,
  assertScalarType: () => assertScalarType,
  assertSchema: () => assertSchema,
  assertType: () => assertType,
  assertUnionType: () => assertUnionType,
  assertValidName: () => assertValidName,
  assertValidSchema: () => assertValidSchema,
  assertWrappingType: () => assertWrappingType,
  astFromValue: () => astFromValue,
  buildASTSchema: () => buildASTSchema,
  buildClientSchema: () => buildClientSchema,
  buildSchema: () => buildSchema,
  coerceInputValue: () => coerceInputValue,
  concatAST: () => concatAST,
  createSourceEventStream: () => createSourceEventStream,
  defaultFieldResolver: () => defaultFieldResolver,
  defaultTypeResolver: () => defaultTypeResolver,
  doTypesOverlap: () => doTypesOverlap,
  execute: () => execute,
  executeSync: () => executeSync,
  extendSchema: () => extendSchema,
  findBreakingChanges: () => findBreakingChanges,
  findDangerousChanges: () => findDangerousChanges,
  formatError: () => formatError,
  getArgumentValues: () => getArgumentValues,
  getDirectiveValues: () => getDirectiveValues,
  getEnterLeaveForKind: () => getEnterLeaveForKind,
  getIntrospectionQuery: () => getIntrospectionQuery,
  getLocation: () => getLocation,
  getNamedType: () => getNamedType,
  getNullableType: () => getNullableType,
  getOperationAST: () => getOperationAST,
  getOperationRootType: () => getOperationRootType,
  getVariableValues: () => getVariableValues,
  getVisitFn: () => getVisitFn,
  graphql: () => graphql,
  graphqlSync: () => graphqlSync,
  introspectionFromSchema: () => introspectionFromSchema,
  introspectionTypes: () => introspectionTypes,
  isAbstractType: () => isAbstractType,
  isCompositeType: () => isCompositeType,
  isConstValueNode: () => isConstValueNode,
  isDefinitionNode: () => isDefinitionNode,
  isDirective: () => isDirective,
  isEnumType: () => isEnumType,
  isEqualType: () => isEqualType,
  isExecutableDefinitionNode: () => isExecutableDefinitionNode,
  isInputObjectType: () => isInputObjectType,
  isInputType: () => isInputType,
  isInterfaceType: () => isInterfaceType,
  isIntrospectionType: () => isIntrospectionType,
  isLeafType: () => isLeafType,
  isListType: () => isListType,
  isNamedType: () => isNamedType,
  isNonNullType: () => isNonNullType,
  isNullableType: () => isNullableType,
  isObjectType: () => isObjectType,
  isOutputType: () => isOutputType,
  isRequiredArgument: () => isRequiredArgument,
  isRequiredInputField: () => isRequiredInputField,
  isScalarType: () => isScalarType,
  isSchema: () => isSchema,
  isSelectionNode: () => isSelectionNode,
  isSpecifiedDirective: () => isSpecifiedDirective,
  isSpecifiedScalarType: () => isSpecifiedScalarType,
  isType: () => isType,
  isTypeDefinitionNode: () => isTypeDefinitionNode,
  isTypeExtensionNode: () => isTypeExtensionNode,
  isTypeNode: () => isTypeNode,
  isTypeSubTypeOf: () => isTypeSubTypeOf,
  isTypeSystemDefinitionNode: () => isTypeSystemDefinitionNode,
  isTypeSystemExtensionNode: () => isTypeSystemExtensionNode,
  isUnionType: () => isUnionType,
  isValidNameError: () => isValidNameError,
  isValueNode: () => isValueNode,
  isWrappingType: () => isWrappingType,
  lexicographicSortSchema: () => lexicographicSortSchema,
  locatedError: () => locatedError,
  parse: () => parse,
  parseConstValue: () => parseConstValue,
  parseType: () => parseType,
  parseValue: () => parseValue,
  print: () => print,
  printError: () => printError,
  printIntrospectionSchema: () => printIntrospectionSchema,
  printLocation: () => printLocation,
  printSchema: () => printSchema,
  printSourceLocation: () => printSourceLocation,
  printType: () => printType,
  resolveObjMapThunk: () => resolveObjMapThunk,
  resolveReadonlyArrayThunk: () => resolveReadonlyArrayThunk,
  responsePathAsArray: () => pathToArray,
  separateOperations: () => separateOperations,
  specifiedDirectives: () => specifiedDirectives,
  specifiedRules: () => specifiedRules,
  specifiedScalarTypes: () => specifiedScalarTypes,
  stripIgnoredCharacters: () => stripIgnoredCharacters,
  subscribe: () => subscribe,
  syntaxError: () => syntaxError,
  typeFromAST: () => typeFromAST,
  validate: () => validate,
  validateSchema: () => validateSchema,
  valueFromAST: () => valueFromAST,
  valueFromASTUntyped: () => valueFromASTUntyped,
  version: () => version,
  versionInfo: () => versionInfo,
  visit: () => visit,
  visitInParallel: () => visitInParallel,
  visitWithTypeInfo: () => visitWithTypeInfo
});
var init_graphql2 = __esm({
  "node_modules/.pnpm/graphql@16.8.0/node_modules/graphql/index.mjs"() {
    init_version();
    init_graphql();
    init_type();
    init_language();
    init_execution();
    init_validation();
    init_error();
    init_utilities();
  }
});

// node_modules/.pnpm/path-to-regexp@6.2.1/node_modules/path-to-regexp/dist.es2015/index.js
var dist_exports = {};
__export(dist_exports, {
  compile: () => compile,
  match: () => match,
  parse: () => parse2,
  pathToRegexp: () => pathToRegexp,
  regexpToFunction: () => regexpToFunction,
  tokensToFunction: () => tokensToFunction,
  tokensToRegexp: () => tokensToRegexp
});
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate2 = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate2 && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate2 && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse2(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
var init_dist = __esm({
  "node_modules/.pnpm/path-to-regexp@6.2.1/node_modules/path-to-regexp/dist.es2015/index.js"() {
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/toIsoResponse.js
var require_toIsoResponse = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/toIsoResponse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toIsoResponse = void 0;
    var headers_polyfill_1 = require_lib();
    function toIsoResponse(response) {
      var _a;
      return {
        status: (_a = response.status) !== null && _a !== void 0 ? _a : 200,
        statusText: response.statusText || "OK",
        headers: headers_polyfill_1.objectToHeaders(response.headers || {}),
        body: response.body
      };
    }
    exports.toIsoResponse = toIsoResponse;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/fetch/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchInterceptor = void 0;
    var headers_polyfill_1 = require_lib();
    var outvariant_1 = require_lib3();
    var until_1 = require_lib4();
    var IsomorphicRequest_1 = require_IsomorphicRequest();
    var glossary_1 = require_glossary();
    var Interceptor_1 = require_Interceptor();
    var toIsoResponse_1 = require_toIsoResponse();
    var InteractiveIsomorphicRequest_1 = require_InteractiveIsomorphicRequest();
    var FetchInterceptor = (
      /** @class */
      function(_super) {
        __extends(FetchInterceptor2, _super);
        function FetchInterceptor2() {
          return _super.call(this, FetchInterceptor2.symbol) || this;
        }
        FetchInterceptor2.prototype.checkEnvironment = function() {
          return typeof globalThis !== "undefined" && typeof globalThis.fetch !== "undefined";
        };
        FetchInterceptor2.prototype.setup = function() {
          var _this = this;
          var pureFetch = globalThis.fetch;
          outvariant_1.invariant(!pureFetch[glossary_1.IS_PATCHED_MODULE], 'Failed to patch the "fetch" module: already patched.');
          globalThis.fetch = function(input, init) {
            return __awaiter(_this, void 0, void 0, function() {
              var request, url, method, body, requestUrl, isomorphicRequest, interactiveIsomorphicRequest, _a, middlewareException, mockedResponse, error, isomorphicResponse, response;
              var _this2 = this;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    request = new Request(input, init);
                    url = typeof input === "string" ? input : input.url;
                    method = request.method;
                    this.log("[%s] %s", method, url);
                    return [4, request.clone().arrayBuffer()];
                  case 1:
                    body = _b.sent();
                    requestUrl = new URL(url, typeof location !== "undefined" ? location.origin : void 0);
                    isomorphicRequest = new IsomorphicRequest_1.IsomorphicRequest(requestUrl, {
                      body,
                      method,
                      headers: new headers_polyfill_1.Headers(request.headers),
                      credentials: request.credentials
                    });
                    interactiveIsomorphicRequest = new InteractiveIsomorphicRequest_1.InteractiveIsomorphicRequest(isomorphicRequest);
                    this.log("isomorphic request", interactiveIsomorphicRequest);
                    this.log('emitting the "request" event for %d listener(s)...', this.emitter.listenerCount("request"));
                    this.emitter.emit("request", interactiveIsomorphicRequest);
                    this.log("awaiting for the mocked response...");
                    return [4, until_1.until(function() {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var _a2, mockedResponse2;
                        return __generator(this, function(_b2) {
                          switch (_b2.label) {
                            case 0:
                              return [4, this.emitter.untilIdle("request", function(_a3) {
                                var _b3 = __read(_a3.args, 1), request2 = _b3[0];
                                return request2.id === interactiveIsomorphicRequest.id;
                              })];
                            case 1:
                              _b2.sent();
                              this.log("all request listeners have been resolved!");
                              return [4, interactiveIsomorphicRequest.respondWith.invoked()];
                            case 2:
                              _a2 = __read.apply(void 0, [_b2.sent(), 1]), mockedResponse2 = _a2[0];
                              this.log("event.respondWith called with:", mockedResponse2);
                              return [2, mockedResponse2];
                          }
                        });
                      });
                    })];
                  case 2:
                    _a = __read.apply(void 0, [_b.sent(), 2]), middlewareException = _a[0], mockedResponse = _a[1];
                    if (middlewareException) {
                      console.error(request.method + " " + request.url + " net::ERR_FAILED");
                      error = Object.assign(new TypeError("Failed to fetch"), {
                        cause: middlewareException
                      });
                      return [2, Promise.reject(error)];
                    }
                    if (mockedResponse) {
                      this.log("received mocked response:", mockedResponse);
                      isomorphicResponse = toIsoResponse_1.toIsoResponse(mockedResponse);
                      this.log("derived isomorphic response:", isomorphicResponse);
                      this.emitter.emit("response", interactiveIsomorphicRequest, isomorphicResponse);
                      response = new Response(mockedResponse.body, __assign(__assign({}, isomorphicResponse), {
                        // `Response.headers` cannot be instantiated with the `Headers` polyfill.
                        // Apparently, it halts if the `Headers` class contains unknown properties
                        // (i.e. the internal `Headers.map`).
                        headers: headers_polyfill_1.flattenHeadersObject(mockedResponse.headers || {})
                      }));
                      Object.defineProperty(response, "url", {
                        writable: false,
                        enumerable: true,
                        configurable: false,
                        value: interactiveIsomorphicRequest.url.href
                      });
                      return [2, response];
                    }
                    this.log("no mocked response received!");
                    return [2, pureFetch(request).then(function(response2) {
                      return __awaiter(_this2, void 0, void 0, function() {
                        var cloneResponse, _a2, _b2, _c;
                        return __generator(this, function(_d) {
                          switch (_d.label) {
                            case 0:
                              cloneResponse = response2.clone();
                              this.log("original fetch performed", cloneResponse);
                              _b2 = (_a2 = this.emitter).emit;
                              _c = [
                                "response",
                                interactiveIsomorphicRequest
                              ];
                              return [4, normalizeFetchResponse(cloneResponse)];
                            case 1:
                              _b2.apply(_a2, _c.concat([_d.sent()]));
                              return [2, response2];
                          }
                        });
                      });
                    })];
                }
              });
            });
          };
          Object.defineProperty(globalThis.fetch, glossary_1.IS_PATCHED_MODULE, {
            enumerable: true,
            configurable: true,
            value: true
          });
          this.subscriptions.push(function() {
            Object.defineProperty(globalThis.fetch, glossary_1.IS_PATCHED_MODULE, {
              value: void 0
            });
            globalThis.fetch = pureFetch;
            _this.log('restored native "globalThis.fetch"!', globalThis.fetch.name);
          });
        };
        FetchInterceptor2.symbol = Symbol("fetch");
        return FetchInterceptor2;
      }(Interceptor_1.Interceptor)
    );
    exports.FetchInterceptor = FetchInterceptor;
    function normalizeFetchResponse(response) {
      return __awaiter(this, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = {
                status: response.status,
                statusText: response.statusText,
                headers: headers_polyfill_1.objectToHeaders(headers_polyfill_1.headersToObject(response.headers))
              };
              return [4, response.text()];
            case 1:
              return [2, (_a.body = _b.sent(), _a)];
          }
        });
      });
    }
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function assign(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see DOMParser.SupportedType.isHTML
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * Helper method to check a mime type if it indicates an HTML document
       *
       * @param {string} [value]
       * @returns {boolean}
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/html`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * Checks if `uri` equals `NAMESPACE.HTML`.
       *
       * @param {string} [uri]
       *
       * @see NAMESPACE.HTML
       */
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign;
    exports.find = find;
    exports.freeze = freeze;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    var conventions = require_conventions();
    var find = conventions.find;
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input)
        return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
       * @standard level1
       */
      length: 0,
      /**
       * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
       * @standard level1
       * @param index  unsigned long
       *   Index into the collection.
       * @return Node
       * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      },
      /**
       * @private
       * @param {function (Node):boolean} predicate
       * @returns {Node[]}
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * @private
       * @param {Node} item
       * @returns {number}
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (Object.prototype.hasOwnProperty.call(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
      //for level2
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
       * The different implementations fairly diverged in what kind of features were reported.
       * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
       *
       * @deprecated It is deprecated and modern browsers return true in all cases.
       *
       * @param {string} feature
       * @param {string} [version]
       * @returns {boolean} always true
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       */
      hasFeature: function(feature, version2) {
        return true;
      },
      /**
       * Creates an XML Document object of the specified type with its document element.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
       * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string|null} namespaceURI
       * @param {string} qualifiedName
       * @param {DocumentType=null} doctype
       * @returns {Document}
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
       *
       * __This behavior is slightly different from the in the specs__:
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string} qualifiedName
       * @param {string} [publicId]
       * @param {string} [systemId]
       * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
       * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      // Modified in DOM Level 2:
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      // Modified in DOM Level 2:
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      // Introduced in DOM Level 2:
      isSupported: function(feature, version2) {
        return this.ownerDocument.implementation.hasFeature(feature, version2);
      },
      // Introduced in DOM Level 2:
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
       *
       * @param {string | null} namespaceURI
       * @returns {string | null}
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (Object.prototype.hasOwnProperty.call(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
      this.ownerDocument = this;
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
          delete cs[cs.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
      ) {
        throw new DOMException(
          HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild2 = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    function _appendSingleChild(parentNode, newChild) {
      if (newChild.parentNode) {
        newChild.parentNode.removeChild(newChild);
      }
      newChild.parentNode = parentNode;
      newChild.previousSibling = parentNode.lastChild;
      newChild.nextSibling = null;
      if (newChild.previousSibling) {
        newChild.previousSibling.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      //implementation : null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @readonly
       * @type DocumentType
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      // Introduced in DOM Level 2:
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * The `getElementsByClassName` method of `Document` interface returns an array-like object
       * of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
       *
       *
       * Warning: This is a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      //document factory method:
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      //four real opeartion method
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(
            node.data.replace(/[<&>]/g, _xmlEncoder)
          );
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        if (Object.prototype.hasOwnProperty.call(node, n)) {
          var v = node[n];
          if (typeof v != "object") {
            if (v != node2[n]) {
              node2[n] = v;
            }
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.DocumentType = DocumentType;
    exports.DOMException = DOMException;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Node = Node;
    exports.NodeList = NodeList;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: "\n",
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse3(
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          this.errorHandler
        );
        domBuilder.endDocument();
      }
    };
    function parse3(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (Object.hasOwnProperty.call(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                      domBuilder.endPrefixMapping(prefix);
                    }
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (Object.prototype.hasOwnProperty.call(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match2 = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match2) {
          var len = match2[0].length;
          domBuilder.processingInstruction(match2[1], match2[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    function split(source, start) {
      var match2;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match2 = reg.exec(source)) {
        buf.push(match2);
        if (match2[1])
          return buf;
      }
    }
    exports.XMLReader = XMLReader;
    exports.ParseError = ParseError;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var normalize = options.normalizeLineEndings || normalizeLineEndings;
      if (source && typeof source === "string") {
        sax2.parse(
          normalize(source),
          defaultNSMap,
          entityMap
        );
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn = errorImpl[key];
        if (!fn && isCallback) {
          fn = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn && function(msg) {
          fn("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      /**
       * @see org.xml.sax.ErrorHandler
       * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports.__DOMHandler = DOMHandler;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.DOMParser = DOMParser;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/index.js
var require_lib9 = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    var dom = require_dom();
    exports.DOMImplementation = dom.DOMImplementation;
    exports.XMLSerializer = dom.XMLSerializer;
    exports.DOMParser = require_dom_parser().DOMParser;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/parseJson.js
var require_parseJson = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/utils/parseJson.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseJson = void 0;
    function parseJson(data) {
      try {
        var json = JSON.parse(data);
        return json;
      } catch (_) {
        return null;
      }
    }
    exports.parseJson = parseJson;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/utils/bufferFrom.js
var require_bufferFrom = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/utils/bufferFrom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bufferFrom = void 0;
    function bufferFrom(init) {
      var encodedString = encodeURIComponent(init);
      var binaryString = encodedString.replace(/%([0-9A-F]{2})/g, function(_, char) {
        return String.fromCharCode("0x" + char);
      });
      var buffer = new Uint8Array(binaryString.length);
      Array.prototype.forEach.call(binaryString, function(char, index) {
        buffer[index] = char.charCodeAt(0);
      });
      return buffer;
    }
    exports.bufferFrom = bufferFrom;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/polyfills/EventPolyfill.js
var require_EventPolyfill = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/polyfills/EventPolyfill.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventPolyfill = void 0;
    var EventPolyfill = (
      /** @class */
      function() {
        function EventPolyfill2(type, options) {
          this.AT_TARGET = 0;
          this.BUBBLING_PHASE = 0;
          this.CAPTURING_PHASE = 0;
          this.NONE = 0;
          this.type = "";
          this.srcElement = null;
          this.currentTarget = null;
          this.eventPhase = 0;
          this.isTrusted = true;
          this.composed = false;
          this.cancelable = true;
          this.defaultPrevented = false;
          this.bubbles = true;
          this.lengthComputable = true;
          this.loaded = 0;
          this.total = 0;
          this.cancelBubble = false;
          this.returnValue = true;
          this.type = type;
          this.target = (options === null || options === void 0 ? void 0 : options.target) || null;
          this.currentTarget = (options === null || options === void 0 ? void 0 : options.currentTarget) || null;
          this.timeStamp = Date.now();
        }
        EventPolyfill2.prototype.composedPath = function() {
          return [];
        };
        EventPolyfill2.prototype.initEvent = function(type, bubbles, cancelable) {
          this.type = type;
          this.bubbles = !!bubbles;
          this.cancelable = !!cancelable;
        };
        EventPolyfill2.prototype.preventDefault = function() {
          this.defaultPrevented = true;
        };
        EventPolyfill2.prototype.stopPropagation = function() {
        };
        EventPolyfill2.prototype.stopImmediatePropagation = function() {
        };
        return EventPolyfill2;
      }()
    );
    exports.EventPolyfill = EventPolyfill;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/polyfills/ProgressEventPolyfill.js
var require_ProgressEventPolyfill = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/polyfills/ProgressEventPolyfill.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressEventPolyfill = void 0;
    var EventPolyfill_1 = require_EventPolyfill();
    var ProgressEventPolyfill = (
      /** @class */
      function(_super) {
        __extends(ProgressEventPolyfill2, _super);
        function ProgressEventPolyfill2(type, init) {
          var _this = _super.call(this, type) || this;
          _this.lengthComputable = (init === null || init === void 0 ? void 0 : init.lengthComputable) || false;
          _this.composed = (init === null || init === void 0 ? void 0 : init.composed) || false;
          _this.loaded = (init === null || init === void 0 ? void 0 : init.loaded) || 0;
          _this.total = (init === null || init === void 0 ? void 0 : init.total) || 0;
          return _this;
        }
        return ProgressEventPolyfill2;
      }(EventPolyfill_1.EventPolyfill)
    );
    exports.ProgressEventPolyfill = ProgressEventPolyfill;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/utils/createEvent.js
var require_createEvent = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/utils/createEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createEvent = void 0;
    var EventPolyfill_1 = require_EventPolyfill();
    var ProgressEventPolyfill_1 = require_ProgressEventPolyfill();
    var SUPPORTS_PROGRESS_EVENT = typeof ProgressEvent !== "undefined";
    function createEvent(target, type, init) {
      var progressEvents = [
        "error",
        "progress",
        "loadstart",
        "loadend",
        "load",
        "timeout",
        "abort"
      ];
      var ProgressEventClass = SUPPORTS_PROGRESS_EVENT ? ProgressEvent : ProgressEventPolyfill_1.ProgressEventPolyfill;
      var event = progressEvents.includes(type) ? new ProgressEventClass(type, {
        lengthComputable: true,
        loaded: (init === null || init === void 0 ? void 0 : init.loaded) || 0,
        total: (init === null || init === void 0 ? void 0 : init.total) || 0
      }) : new EventPolyfill_1.EventPolyfill(type, {
        target,
        currentTarget: target
      });
      return event;
    }
    exports.createEvent = createEvent;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/XMLHttpRequestOverride.js
var require_XMLHttpRequestOverride = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/XMLHttpRequestOverride.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __values = exports && exports.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = exports && exports.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createXMLHttpRequestOverride = void 0;
    var until_1 = require_lib4();
    var headers_polyfill_1 = require_lib();
    var xmldom_1 = require_lib9();
    var parseJson_1 = require_parseJson();
    var toIsoResponse_1 = require_toIsoResponse();
    var bufferFrom_1 = require_bufferFrom();
    var createEvent_1 = require_createEvent();
    var IsomorphicRequest_1 = require_IsomorphicRequest();
    var bufferUtils_1 = require_bufferUtils();
    var InteractiveIsomorphicRequest_1 = require_InteractiveIsomorphicRequest();
    var createXMLHttpRequestOverride = function(options) {
      var _a;
      var XMLHttpRequest = options.XMLHttpRequest, emitter = options.emitter, log = options.log;
      return _a = /** @class */
      function() {
        function XMLHttpRequestOverride() {
          this._events = [];
          this.log = log;
          this.UNSENT = 0;
          this.OPENED = 1;
          this.HEADERS_RECEIVED = 2;
          this.LOADING = 3;
          this.DONE = 4;
          this.onreadystatechange = null;
          this.onabort = null;
          this.onerror = null;
          this.onload = null;
          this.onloadend = null;
          this.onloadstart = null;
          this.onprogress = null;
          this.ontimeout = null;
          this.url = "";
          this.method = "GET";
          this.readyState = this.UNSENT;
          this.withCredentials = false;
          this.status = 200;
          this.statusText = "OK";
          this.response = "";
          this.responseType = "text";
          this.responseText = "";
          this.responseXML = null;
          this.responseURL = "";
          this.upload = {};
          this.timeout = 0;
          this._requestHeaders = new headers_polyfill_1.Headers();
          this._responseHeaders = new headers_polyfill_1.Headers();
        }
        XMLHttpRequestOverride.prototype.setReadyState = function(nextState) {
          if (nextState === this.readyState) {
            return;
          }
          this.log("readyState change %d -> %d", this.readyState, nextState);
          this.readyState = nextState;
          if (nextState !== this.UNSENT) {
            this.log("triggering readystate change...");
            this.trigger("readystatechange");
          }
        };
        XMLHttpRequestOverride.prototype.trigger = function(eventName, options2) {
          var e_1, _a2;
          this.log('trigger "%s" (%d)', eventName, this.readyState);
          this.log('resolve listener for event "%s"', eventName);
          var callback = this["on" + eventName];
          callback === null || callback === void 0 ? void 0 : callback.call(this, createEvent_1.createEvent(this, eventName, options2));
          try {
            for (var _b = __values(this._events), _c = _b.next(); !_c.done; _c = _b.next()) {
              var event_1 = _c.value;
              if (event_1.name === eventName) {
                log('calling mock event listener "%s" (%d)', eventName, this.readyState);
                event_1.listener.call(this, createEvent_1.createEvent(this, eventName, options2));
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b.return))
                _a2.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return this;
        };
        XMLHttpRequestOverride.prototype.reset = function() {
          this.log("reset");
          this.setReadyState(this.UNSENT);
          this.status = 200;
          this.statusText = "OK";
          this.response = null;
          this.responseText = null;
          this.responseXML = null;
          this._requestHeaders = new headers_polyfill_1.Headers();
          this._responseHeaders = new headers_polyfill_1.Headers();
        };
        XMLHttpRequestOverride.prototype.open = function(method, url, async, user, password) {
          if (async === void 0) {
            async = true;
          }
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a2) {
              this.log = this.log.extend("request " + method + " " + url);
              this.log("open", { method, url, async, user, password });
              this.reset();
              this.setReadyState(this.OPENED);
              if (typeof url === "undefined") {
                this.url = method;
                this.method = "GET";
              } else {
                this.url = url;
                this.method = method;
                this.async = async;
                this.user = user;
                this.password = password;
              }
              return [
                2
                /*return*/
              ];
            });
          });
        };
        XMLHttpRequestOverride.prototype.send = function(data) {
          var _this = this;
          this.log("send %s %s", this.method, this.url);
          var buffer;
          if (typeof data === "string") {
            buffer = bufferUtils_1.encodeBuffer(data);
          } else {
            buffer = data || new ArrayBuffer(0);
          }
          var url;
          try {
            url = new URL(this.url);
          } catch (error) {
            url = new URL(this.url, window.location.href);
          }
          this.log("request headers", this._requestHeaders);
          var isomorphicRequest = new IsomorphicRequest_1.IsomorphicRequest(url, {
            body: buffer,
            method: this.method,
            headers: this._requestHeaders,
            credentials: this.withCredentials ? "include" : "omit"
          });
          var interactiveIsomorphicRequest = new InteractiveIsomorphicRequest_1.InteractiveIsomorphicRequest(isomorphicRequest);
          this.log('emitting the "request" event for %d listener(s)...', emitter.listenerCount("request"));
          emitter.emit("request", interactiveIsomorphicRequest);
          this.log("awaiting mocked response...");
          Promise.resolve(until_1.until(function() {
            return __awaiter(_this, void 0, void 0, function() {
              var _a2, mockedResponse;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, emitter.untilIdle("request", function(_a3) {
                      var _b2 = __read(_a3.args, 1), request = _b2[0];
                      return request.id === interactiveIsomorphicRequest.id;
                    })];
                  case 1:
                    _b.sent();
                    this.log("all request listeners have been resolved!");
                    return [4, interactiveIsomorphicRequest.respondWith.invoked()];
                  case 2:
                    _a2 = __read.apply(void 0, [_b.sent(), 1]), mockedResponse = _a2[0];
                    this.log("event.respondWith called with:", mockedResponse);
                    return [2, mockedResponse];
                }
              });
            });
          })).then(function(_a2) {
            var _b, _c;
            var _d = __read(_a2, 2), middlewareException = _d[0], mockedResponse = _d[1];
            if (middlewareException) {
              _this.log("middleware function threw an exception!", middlewareException);
              _this.trigger("error");
              _this.abort();
              return;
            }
            if (mockedResponse) {
              _this.log("received mocked response", mockedResponse);
              _this.trigger("loadstart");
              _this.status = (_b = mockedResponse.status) !== null && _b !== void 0 ? _b : 200;
              _this.statusText = mockedResponse.statusText || "OK";
              _this._responseHeaders = mockedResponse.headers ? headers_polyfill_1.objectToHeaders(mockedResponse.headers) : new headers_polyfill_1.Headers();
              _this.log("set response status", _this.status, _this.statusText);
              _this.log("set response headers", _this._responseHeaders);
              _this.setReadyState(_this.HEADERS_RECEIVED);
              _this.log("response type", _this.responseType);
              _this.response = _this.getResponseBody(mockedResponse.body);
              _this.responseURL = _this.url;
              _this.responseText = mockedResponse.body || "";
              _this.responseXML = _this.getResponseXML();
              _this.log("set response body", _this.response);
              if (mockedResponse.body && _this.response) {
                _this.setReadyState(_this.LOADING);
                var bodyBuffer = bufferFrom_1.bufferFrom(mockedResponse.body);
                _this.trigger("progress", {
                  loaded: bodyBuffer.length,
                  total: bodyBuffer.length
                });
              }
              _this.setReadyState(_this.DONE);
              _this.trigger("load");
              _this.trigger("loadend");
              emitter.emit("response", isomorphicRequest, toIsoResponse_1.toIsoResponse(mockedResponse));
            } else {
              _this.log("no mocked response received!");
              var originalRequest_1 = new XMLHttpRequest();
              _this.log("opening an original request %s %s", _this.method, _this.url);
              originalRequest_1.open(_this.method, _this.url, (_c = _this.async) !== null && _c !== void 0 ? _c : true, _this.user, _this.password);
              originalRequest_1.addEventListener("load", function() {
                _this.log('original "onload"');
                _this.status = originalRequest_1.status;
                _this.statusText = originalRequest_1.statusText;
                _this.responseURL = originalRequest_1.responseURL;
                _this.responseType = originalRequest_1.responseType;
                _this.response = originalRequest_1.response;
                _this.responseText = originalRequest_1.responseText;
                _this.responseXML = originalRequest_1.responseXML;
                _this.log("set mock request readyState to DONE");
                _this.setReadyState(_this.DONE);
                _this.log("received original response", _this.status, _this.statusText);
                _this.log("original response body:", _this.response);
                var responseHeaders = originalRequest_1.getAllResponseHeaders();
                _this.log("original response headers:\n", responseHeaders);
                _this._responseHeaders = headers_polyfill_1.stringToHeaders(responseHeaders);
                _this.log("original response headers (normalized)", _this._responseHeaders);
                _this.log("original response finished");
                emitter.emit("response", isomorphicRequest, {
                  status: originalRequest_1.status,
                  statusText: originalRequest_1.statusText,
                  headers: _this._responseHeaders,
                  body: originalRequest_1.response
                });
              });
              _this.propagateCallbacks(originalRequest_1);
              _this.propagateListeners(originalRequest_1);
              _this.propagateHeaders(originalRequest_1, _this._requestHeaders);
              if (_this.async) {
                originalRequest_1.timeout = _this.timeout;
              }
              _this.log("send", data);
              originalRequest_1.send(data);
            }
          });
        };
        XMLHttpRequestOverride.prototype.abort = function() {
          this.log("abort");
          if (this.readyState > this.UNSENT && this.readyState < this.DONE) {
            this.setReadyState(this.UNSENT);
            this.trigger("abort");
          }
        };
        XMLHttpRequestOverride.prototype.dispatchEvent = function() {
          return false;
        };
        XMLHttpRequestOverride.prototype.setRequestHeader = function(name, value) {
          this.log('set request header "%s" to "%s"', name, value);
          this._requestHeaders.append(name, value);
        };
        XMLHttpRequestOverride.prototype.getResponseHeader = function(name) {
          this.log('get response header "%s"', name);
          if (this.readyState < this.HEADERS_RECEIVED) {
            this.log("cannot return a header: headers not received (state: %s)", this.readyState);
            return null;
          }
          var headerValue = this._responseHeaders.get(name);
          this.log('resolved response header "%s" to "%s"', name, headerValue, this._responseHeaders);
          return headerValue;
        };
        XMLHttpRequestOverride.prototype.getAllResponseHeaders = function() {
          this.log("get all response headers");
          if (this.readyState < this.HEADERS_RECEIVED) {
            this.log("cannot return headers: headers not received (state: %s)", this.readyState);
            return "";
          }
          return headers_polyfill_1.headersToString(this._responseHeaders);
        };
        XMLHttpRequestOverride.prototype.addEventListener = function(name, listener) {
          this.log("addEventListener", name, listener);
          this._events.push({
            name,
            listener
          });
        };
        XMLHttpRequestOverride.prototype.removeEventListener = function(name, listener) {
          this.log("removeEventListener", name, listener);
          this._events = this._events.filter(function(storedEvent) {
            return storedEvent.name !== name && storedEvent.listener !== listener;
          });
        };
        XMLHttpRequestOverride.prototype.overrideMimeType = function() {
        };
        XMLHttpRequestOverride.prototype.getResponseBody = function(body) {
          var textBody = body !== null && body !== void 0 ? body : "";
          this.log("coerced response body to", textBody);
          switch (this.responseType) {
            case "json": {
              this.log("resolving response body as JSON");
              return parseJson_1.parseJson(textBody);
            }
            case "blob": {
              var blobType = this.getResponseHeader("content-type") || "text/plain";
              this.log("resolving response body as Blob", { type: blobType });
              return new Blob([textBody], {
                type: blobType
              });
            }
            case "arraybuffer": {
              this.log("resolving response body as ArrayBuffer");
              var arrayBuffer = bufferFrom_1.bufferFrom(textBody);
              return arrayBuffer;
            }
            default:
              return textBody;
          }
        };
        XMLHttpRequestOverride.prototype.getResponseXML = function() {
          var contentType = this.getResponseHeader("Content-Type");
          if (contentType === "application/xml" || contentType === "text/xml") {
            return new xmldom_1.DOMParser().parseFromString(this.responseText, contentType);
          }
          return null;
        };
        XMLHttpRequestOverride.prototype.propagateCallbacks = function(request) {
          var e_2, _a2;
          this.log("propagating request callbacks to the original request");
          var callbackNames = [
            "abort",
            "onerror",
            "ontimeout",
            "onload",
            "onloadstart",
            "onloadend",
            "onprogress",
            "onreadystatechange"
          ];
          try {
            for (var callbackNames_1 = __values(callbackNames), callbackNames_1_1 = callbackNames_1.next(); !callbackNames_1_1.done; callbackNames_1_1 = callbackNames_1.next()) {
              var callbackName = callbackNames_1_1.value;
              var callback = this[callbackName];
              if (callback) {
                request[callbackName] = this[callbackName];
                this.log('propagated the "%s" callback', callbackName, callback);
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (callbackNames_1_1 && !callbackNames_1_1.done && (_a2 = callbackNames_1.return))
                _a2.call(callbackNames_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
          request.onabort = this.abort;
          request.onerror = this.onerror;
          request.ontimeout = this.ontimeout;
          request.onload = this.onload;
          request.onloadstart = this.onloadstart;
          request.onloadend = this.onloadend;
          request.onprogress = this.onprogress;
          request.onreadystatechange = this.onreadystatechange;
        };
        XMLHttpRequestOverride.prototype.propagateListeners = function(request) {
          this.log("propagating request listeners (%d) to the original request", this._events.length, this._events);
          this._events.forEach(function(_a2) {
            var name = _a2.name, listener = _a2.listener;
            request.addEventListener(name, listener);
          });
        };
        XMLHttpRequestOverride.prototype.propagateHeaders = function(request, headers) {
          var _this = this;
          this.log("propagating request headers to the original request", headers);
          Object.entries(headers.raw()).forEach(function(_a2) {
            var _b = __read(_a2, 2), name = _b[0], value = _b[1];
            _this.log('setting "%s" (%s) header on the original request', name, value);
            request.setRequestHeader(name, value);
          });
        };
        return XMLHttpRequestOverride;
      }(), /* Request state */
      _a.UNSENT = 0, _a.OPENED = 1, _a.HEADERS_RECEIVED = 2, _a.LOADING = 3, _a.DONE = 4, _a;
    };
    exports.createXMLHttpRequestOverride = createXMLHttpRequestOverride;
  }
});

// node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/index.js
var require_XMLHttpRequest = __commonJS({
  "node_modules/.pnpm/@mswjs+interceptors@0.17.9/node_modules/@mswjs/interceptors/lib/interceptors/XMLHttpRequest/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XMLHttpRequestInterceptor = void 0;
    var outvariant_1 = require_lib3();
    var glossary_1 = require_glossary();
    var Interceptor_1 = require_Interceptor();
    var XMLHttpRequestOverride_1 = require_XMLHttpRequestOverride();
    var XMLHttpRequestInterceptor = (
      /** @class */
      function(_super) {
        __extends(XMLHttpRequestInterceptor2, _super);
        function XMLHttpRequestInterceptor2() {
          return _super.call(this, XMLHttpRequestInterceptor2.symbol) || this;
        }
        XMLHttpRequestInterceptor2.prototype.checkEnvironment = function() {
          return typeof window !== "undefined" && typeof window.XMLHttpRequest !== "undefined";
        };
        XMLHttpRequestInterceptor2.prototype.setup = function() {
          var log = this.log.extend("setup");
          log('patching "XMLHttpRequest" module...');
          var PureXMLHttpRequest = window.XMLHttpRequest;
          outvariant_1.invariant(!PureXMLHttpRequest[glossary_1.IS_PATCHED_MODULE], 'Failed to patch the "XMLHttpRequest" module: already patched.');
          window.XMLHttpRequest = XMLHttpRequestOverride_1.createXMLHttpRequestOverride({
            XMLHttpRequest: PureXMLHttpRequest,
            emitter: this.emitter,
            log: this.log
          });
          log('native "XMLHttpRequest" module patched!', window.XMLHttpRequest.name);
          Object.defineProperty(window.XMLHttpRequest, glossary_1.IS_PATCHED_MODULE, {
            enumerable: true,
            configurable: true,
            value: true
          });
          this.subscriptions.push(function() {
            Object.defineProperty(window.XMLHttpRequest, glossary_1.IS_PATCHED_MODULE, {
              value: void 0
            });
            window.XMLHttpRequest = PureXMLHttpRequest;
            log('native "XMLHttpRequest" module restored!', window.XMLHttpRequest.name);
          });
        };
        XMLHttpRequestInterceptor2.symbol = Symbol("xhr");
        return XMLHttpRequestInterceptor2;
      }(Interceptor_1.Interceptor)
    );
    exports.XMLHttpRequestInterceptor = XMLHttpRequestInterceptor;
  }
});

// node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/MemoryLeakError.js
var require_MemoryLeakError = __commonJS({
  "node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/MemoryLeakError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MemoryLeakError = void 0;
    var MemoryLeakError = class extends Error {
      constructor(emitter, type, count) {
        super(`Possible EventEmitter memory leak detected. ${count} ${type.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`);
        this.emitter = emitter;
        this.type = type;
        this.count = count;
        this.name = "MaxListenersExceededWarning";
      }
    };
    exports.MemoryLeakError = MemoryLeakError;
  }
});

// node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/Emitter.js
var require_Emitter = __commonJS({
  "node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/Emitter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Emitter = void 0;
    var MemoryLeakError_1 = require_MemoryLeakError();
    var Emitter = class _Emitter {
      constructor() {
        this.events = /* @__PURE__ */ new Map();
        this.maxListeners = _Emitter.defaultMaxListeners;
        this.hasWarnedAboutPotentialMemoryLeak = false;
      }
      static listenerCount(emitter, eventName) {
        return emitter.listenerCount(eventName);
      }
      _emitInternalEvent(internalEventName, eventName, listener) {
        this.emit(
          internalEventName,
          ...[eventName, listener]
        );
      }
      _getListeners(eventName) {
        return this.events.get(eventName) || [];
      }
      _removeListener(listeners, listener) {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
        return [];
      }
      _wrapOnceListener(eventName, listener) {
        const onceListener = (...data) => {
          this.removeListener(eventName, onceListener);
          listener.apply(this, data);
        };
        return onceListener;
      }
      setMaxListeners(maxListeners) {
        this.maxListeners = maxListeners;
        return this;
      }
      /**
       * Returns the current max listener value for the `Emitter` which is
       * either set by `emitter.setMaxListeners(n)` or defaults to
       * `Emitter.defaultMaxListeners`.
       */
      getMaxListeners() {
        return this.maxListeners;
      }
      /**
       * Returns an array listing the events for which the emitter has registered listeners.
       * The values in the array will be strings or Symbols.
       */
      eventNames() {
        return Array.from(this.events.keys());
      }
      /**
       * Synchronously calls each of the listeners registered for the event named `eventName`,
       * in the order they were registered, passing the supplied arguments to each.
       * Returns `true` if the event has listeners, `false` otherwise.
       *
       * @example
       * const emitter = new Emitter<{ hello: [string] }>()
       * emitter.emit('hello', 'John')
       */
      emit(eventName, ...data) {
        const listeners = this._getListeners(eventName);
        listeners.forEach((listener) => {
          listener.apply(this, data);
        });
        return listeners.length > 0;
      }
      addListener(eventName, listener) {
        this._emitInternalEvent("newListener", eventName, listener);
        const nextListeners = this._getListeners(eventName).concat(listener);
        this.events.set(eventName, nextListeners);
        if (this.maxListeners > 0 && this.listenerCount(eventName) > this.maxListeners && !this.hasWarnedAboutPotentialMemoryLeak) {
          this.hasWarnedAboutPotentialMemoryLeak = true;
          const memoryLeakWarning = new MemoryLeakError_1.MemoryLeakError(this, eventName, this.listenerCount(eventName));
          console.warn(memoryLeakWarning);
        }
        return this;
      }
      on(eventName, listener) {
        return this.addListener(eventName, listener);
      }
      once(eventName, listener) {
        return this.addListener(eventName, this._wrapOnceListener(eventName, listener));
      }
      prependListener(eventName, listener) {
        const listeners = this._getListeners(eventName);
        if (listeners.length > 0) {
          const nextListeners = [listener].concat(listeners);
          this.events.set(eventName, nextListeners);
        } else {
          this.events.set(eventName, listeners.concat(listener));
        }
        return this;
      }
      prependOnceListener(eventName, listener) {
        return this.prependListener(eventName, this._wrapOnceListener(eventName, listener));
      }
      removeListener(eventName, listener) {
        const listeners = this._getListeners(eventName);
        if (listeners.length > 0) {
          this._removeListener(listeners, listener);
          this.events.set(eventName, listeners);
          this._emitInternalEvent("removeListener", eventName, listener);
        }
        return this;
      }
      /**
       * Alias for `emitter.removeListener()`.
       *
       * @example
       * emitter.off('hello', listener)
       */
      off(eventName, listener) {
        return this.removeListener(eventName, listener);
      }
      removeAllListeners(eventName) {
        if (eventName) {
          this.events.delete(eventName);
        } else {
          this.events.clear();
        }
        return this;
      }
      /**
       * Returns a copy of the array of listeners for the event named `eventName`.
       */
      listeners(eventName) {
        return Array.from(this._getListeners(eventName));
      }
      /**
       * Returns the number of listeners listening to the event named `eventName`.
       */
      listenerCount(eventName) {
        return this._getListeners(eventName).length;
      }
      rawListeners(eventName) {
        return this.listeners(eventName);
      }
    };
    exports.Emitter = Emitter;
    Emitter.defaultMaxListeners = 10;
  }
});

// node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/index.js
var require_lib10 = __commonJS({
  "node_modules/.pnpm/strict-event-emitter@0.4.6/node_modules/strict-event-emitter/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Emitter(), exports);
    __exportStar(require_MemoryLeakError(), exports);
  }
});

// node_modules/.pnpm/msw@1.2.3_typescript@5.1.6/node_modules/msw/lib/index.js
var require_lib11 = __commonJS({
  "node_modules/.pnpm/msw@1.2.3_typescript@5.1.6/node_modules/msw/lib/index.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      GraphQLHandler: () => GraphQLHandler,
      MockedRequest: () => MockedRequest,
      RESTMethods: () => RESTMethods,
      RequestHandler: () => RequestHandler,
      RestHandler: () => RestHandler,
      SetupApi: () => SetupApi,
      SetupWorkerApi: () => SetupWorkerApi,
      cleanUrl: () => cleanUrl,
      compose: () => compose,
      context: () => context_exports,
      createResponseComposition: () => createResponseComposition,
      defaultContext: () => defaultContext,
      defaultResponse: () => defaultResponse,
      graphql: () => graphql2,
      graphqlContext: () => graphqlContext,
      handleRequest: () => handleRequest,
      matchRequestUrl: () => matchRequestUrl,
      response: () => response,
      rest: () => rest,
      restContext: () => restContext,
      setupWorker: () => setupWorker
    });
    module.exports = __toCommonJS2(src_exports);
    var context_exports = {};
    __export2(context_exports, {
      body: () => body,
      cookie: () => cookie,
      data: () => data,
      delay: () => delay,
      errors: () => errors,
      extensions: () => extensions,
      fetch: () => fetch,
      json: () => json,
      set: () => set,
      status: () => status,
      text: () => text,
      xml: () => xml
    });
    var codes_default = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a Teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Too Early",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
    var status = (statusCode, statusText) => {
      return (res) => {
        res.status = statusCode;
        res.statusText = statusText || codes_default[String(statusCode)];
        return res;
      };
    };
    var import_headers_polyfill = require_lib();
    function set(...args) {
      return (res) => {
        const [name, value] = args;
        if (typeof name === "string") {
          res.headers.append(name, value);
        } else {
          const headers = (0, import_headers_polyfill.objectToHeaders)(name);
          headers.forEach((value2, name2) => {
            res.headers.append(name2, value2);
          });
        }
        return res;
      };
    }
    var cookieUtils = __toESM(require_cookie());
    var cookie = (name, value, options) => {
      return (res) => {
        const serializedCookie = cookieUtils.serialize(name, value, options);
        res.headers.append("Set-Cookie", serializedCookie);
        if (typeof document !== "undefined") {
          document.cookie = serializedCookie;
        }
        return res;
      };
    };
    var body = (value) => {
      return (res) => {
        res.body = value;
        return res;
      };
    };
    function jsonParse(value) {
      try {
        return JSON.parse(value);
      } catch (error2) {
        return void 0;
      }
    }
    function isObject(value) {
      return value != null && typeof value === "object" && !Array.isArray(value);
    }
    function mergeRight(left, right) {
      return Object.entries(right).reduce((result, [key, rightValue]) => {
        const leftValue = result[key];
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
          result[key] = leftValue.concat(rightValue);
          return result;
        }
        if (isObject(leftValue) && isObject(rightValue)) {
          result[key] = mergeRight(leftValue, rightValue);
          return result;
        }
        result[key] = rightValue;
        return result;
      }, Object.assign({}, left));
    }
    var json = (body2) => {
      return (res) => {
        res.headers.set("Content-Type", "application/json");
        res.body = JSON.stringify(body2);
        return res;
      };
    };
    var data = (payload) => {
      return (res) => {
        const prevBody = jsonParse(res.body) || {};
        const nextBody = mergeRight(prevBody, { data: payload });
        return json(nextBody)(res);
      };
    };
    var extensions = (payload) => {
      return (res) => {
        const prevBody = jsonParse(res.body) || {};
        const nextBody = mergeRight(prevBody, { extensions: payload });
        return json(nextBody)(res);
      };
    };
    var import_is_node_process = require_lib2();
    var SET_TIMEOUT_MAX_ALLOWED_INT = 2147483647;
    var MIN_SERVER_RESPONSE_TIME = 100;
    var MAX_SERVER_RESPONSE_TIME = 400;
    var NODE_SERVER_RESPONSE_TIME = 5;
    var getRandomServerResponseTime = () => {
      if ((0, import_is_node_process.isNodeProcess)()) {
        return NODE_SERVER_RESPONSE_TIME;
      }
      return Math.floor(
        Math.random() * (MAX_SERVER_RESPONSE_TIME - MIN_SERVER_RESPONSE_TIME) + MIN_SERVER_RESPONSE_TIME
      );
    };
    var delay = (durationOrMode) => {
      return (res) => {
        let delayTime;
        if (typeof durationOrMode === "string") {
          switch (durationOrMode) {
            case "infinite": {
              delayTime = SET_TIMEOUT_MAX_ALLOWED_INT;
              break;
            }
            case "real": {
              delayTime = getRandomServerResponseTime();
              break;
            }
            default: {
              throw new Error(
                `Failed to delay a response: unknown delay mode "${durationOrMode}". Please make sure you provide one of the supported modes ("real", "infinite") or a number to "ctx.delay".`
              );
            }
          }
        } else if (typeof durationOrMode === "undefined") {
          delayTime = getRandomServerResponseTime();
        } else {
          if (durationOrMode > SET_TIMEOUT_MAX_ALLOWED_INT) {
            throw new Error(
              `Failed to delay a response: provided delay duration (${durationOrMode}) exceeds the maximum allowed duration for "setTimeout" (${SET_TIMEOUT_MAX_ALLOWED_INT}). This will cause the response to be returned immediately. Please use a number within the allowed range to delay the response by exact duration, or consider the "infinite" delay mode to delay the response indefinitely.`
            );
          }
          delayTime = durationOrMode;
        }
        res.delay = delayTime;
        return res;
      };
    };
    var errors = (errorsList) => {
      return (res) => {
        if (errorsList == null) {
          return res;
        }
        const prevBody = jsonParse(res.body) || {};
        const nextBody = mergeRight(prevBody, { errors: errorsList });
        return json(nextBody)(res);
      };
    };
    var import_is_node_process2 = require_lib2();
    var import_headers_polyfill2 = require_lib();
    var useFetch = (0, import_is_node_process2.isNodeProcess)() ? (input, init) => Promise.resolve().then(() => __toESM(require_browser())).then(
      ({ default: nodeFetch }) => nodeFetch(input, init)
    ) : globalThis.fetch;
    var augmentRequestInit = (requestInit) => {
      const headers = new import_headers_polyfill2.Headers(requestInit.headers);
      headers.set("x-msw-bypass", "true");
      return {
        ...requestInit,
        headers: headers.all()
      };
    };
    var createFetchRequestParameters = (input) => {
      const { body: body2, method } = input;
      const requestParameters = {
        ...input,
        body: void 0
      };
      if (["GET", "HEAD"].includes(method)) {
        return requestParameters;
      }
      if (typeof body2 === "object" || typeof body2 === "number" || typeof body2 === "boolean") {
        requestParameters.body = JSON.stringify(body2);
      } else {
        requestParameters.body = body2;
      }
      return requestParameters;
    };
    var fetch = (input, requestInit = {}) => {
      if (typeof input === "string") {
        return useFetch(input, augmentRequestInit(requestInit));
      }
      const requestParameters = createFetchRequestParameters(input);
      const derivedRequestInit = augmentRequestInit(requestParameters);
      return useFetch(input.url.href, derivedRequestInit);
    };
    var text = (body2) => {
      return (res) => {
        res.headers.set("Content-Type", "text/plain");
        res.body = body2;
        return res;
      };
    };
    var xml = (body2) => {
      return (res) => {
        res.headers.set("Content-Type", "text/xml");
        res.body = body2;
        return res;
      };
    };
    var import_outvariant2 = require_lib3();
    var import_outvariant = require_lib3();
    var LIBRARY_PREFIX = "[MSW]";
    function formatMessage(message, ...positionals) {
      const interpolatedMessage = (0, import_outvariant.format)(message, ...positionals);
      return `${LIBRARY_PREFIX} ${interpolatedMessage}`;
    }
    function warn(message, ...positionals) {
      console.warn(formatMessage(message, ...positionals));
    }
    function error(message, ...positionals) {
      console.error(formatMessage(message, ...positionals));
    }
    var devUtils = {
      formatMessage,
      warn,
      error
    };
    function checkGlobals() {
      (0, import_outvariant2.invariant)(
        typeof URL !== "undefined",
        devUtils.formatMessage(
          `Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`
        )
      );
    }
    var import_outvariant5 = require_lib3();
    var import_is_node_process3 = require_lib2();
    var import_until4 = require_lib4();
    var import_until = require_lib4();
    function getWorkerByRegistration(registration, absoluteWorkerUrl, findWorker) {
      const allStates = [
        registration.active,
        registration.installing,
        registration.waiting
      ];
      const relevantStates = allStates.filter((state) => {
        return state != null;
      });
      const worker = relevantStates.find((worker2) => {
        return findWorker(worker2.scriptURL, absoluteWorkerUrl);
      });
      return worker || null;
    }
    function getAbsoluteWorkerUrl(workerUrl) {
      return new URL(workerUrl, location.href).href;
    }
    var getWorkerInstance = async (url, options = {}, findWorker) => {
      const absoluteWorkerUrl = getAbsoluteWorkerUrl(url);
      const mockRegistrations = await navigator.serviceWorker.getRegistrations().then(
        (registrations) => registrations.filter(
          (registration) => getWorkerByRegistration(registration, absoluteWorkerUrl, findWorker)
        )
      );
      if (!navigator.serviceWorker.controller && mockRegistrations.length > 0) {
        location.reload();
      }
      const [existingRegistration] = mockRegistrations;
      if (existingRegistration) {
        return existingRegistration.update().then(() => {
          return [
            getWorkerByRegistration(
              existingRegistration,
              absoluteWorkerUrl,
              findWorker
            ),
            existingRegistration
          ];
        });
      }
      const [error2, instance] = await (0, import_until.until)(
        async () => {
          const registration = await navigator.serviceWorker.register(url, options);
          return [
            getWorkerByRegistration(registration, absoluteWorkerUrl, findWorker),
            registration
          ];
        }
      );
      if (error2) {
        const isWorkerMissing = error2.message.includes("(404)");
        if (isWorkerMissing) {
          const scopeUrl = new URL((options == null ? void 0 : options.scope) || "/", location.href);
          throw new Error(
            devUtils.formatMessage(`Failed to register a Service Worker for scope ('${scopeUrl.href}') with script ('${absoluteWorkerUrl}'): Service Worker script does not exist at the given path.

Did you forget to run "npx msw init <PUBLIC_DIR>"?

Learn more about creating the Service Worker script: https://mswjs.io/docs/cli/init`)
          );
        }
        throw new Error(
          devUtils.formatMessage(
            "Failed to register the Service Worker:\n\n%s",
            error2.message
          )
        );
      }
      return instance;
    };
    function printStartMessage(args = {}) {
      if (args.quiet) {
        return;
      }
      const message = args.message || "Mocking enabled.";
      console.groupCollapsed(
        `%c${devUtils.formatMessage(message)}`,
        "color:orangered;font-weight:bold;"
      );
      console.log(
        "%cDocumentation: %chttps://mswjs.io/docs",
        "font-weight:bold",
        "font-weight:normal"
      );
      console.log("Found an issue? https://github.com/mswjs/msw/issues");
      if (args.workerUrl) {
        console.log("Worker script URL:", args.workerUrl);
      }
      if (args.workerScope) {
        console.log("Worker scope:", args.workerScope);
      }
      console.groupEnd();
    }
    async function enableMocking(context2, options) {
      var _a, _b;
      context2.workerChannel.send("MOCK_ACTIVATE");
      await context2.events.once("MOCKING_ENABLED");
      if (context2.isMockingEnabled) {
        devUtils.warn(
          `Found a redundant "worker.start()" call. Note that starting the worker while mocking is already enabled will have no effect. Consider removing this "worker.start()" call.`
        );
        return;
      }
      context2.isMockingEnabled = true;
      printStartMessage({
        quiet: options.quiet,
        workerScope: (_a = context2.registration) == null ? void 0 : _a.scope,
        workerUrl: (_b = context2.worker) == null ? void 0 : _b.scriptURL
      });
    }
    var WorkerChannel = class {
      constructor(port) {
        this.port = port;
      }
      postMessage(event, ...rest2) {
        const [data2, transfer] = rest2;
        this.port.postMessage({ type: event, data: data2 }, { transfer });
      }
    };
    var NetworkError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "NetworkError";
      }
    };
    var import_interceptors2 = require_lib7();
    var import_headers_polyfill5 = require_lib();
    var cookieUtils3 = __toESM(require_cookie());
    var import_cookies = require_lib8();
    var import_interceptors = require_lib7();
    var import_bufferUtils = require_bufferUtils();
    var import_headers_polyfill4 = require_lib();
    var cookieUtils2 = __toESM(require_cookie());
    function getAllCookies() {
      return cookieUtils2.parse(document.cookie);
    }
    function getRequestCookies(request) {
      if (typeof document === "undefined" || typeof location === "undefined") {
        return {};
      }
      switch (request.credentials) {
        case "same-origin": {
          return location.origin === request.url.origin ? getAllCookies() : {};
        }
        case "include": {
          return getAllCookies();
        }
        default: {
          return {};
        }
      }
    }
    var import_headers_polyfill3 = require_lib();
    function parseContentHeaders(headersString) {
      var _a, _b;
      const headers = (0, import_headers_polyfill3.stringToHeaders)(headersString);
      const contentType = headers.get("content-type") || "text/plain";
      const disposition = headers.get("content-disposition");
      if (!disposition) {
        throw new Error('"Content-Disposition" header is required.');
      }
      const directives = disposition.split(";").reduce((acc, chunk) => {
        const [name2, ...rest2] = chunk.trim().split("=");
        acc[name2] = rest2.join("=");
        return acc;
      }, {});
      const name = (_a = directives.name) == null ? void 0 : _a.slice(1, -1);
      const filename = (_b = directives.filename) == null ? void 0 : _b.slice(1, -1);
      return {
        name,
        filename,
        contentType
      };
    }
    function parseMultipartData(data2, headers) {
      const contentType = headers == null ? void 0 : headers.get("content-type");
      if (!contentType) {
        return void 0;
      }
      const [, ...directives] = contentType.split(/; */);
      const boundary = directives.filter((d) => d.startsWith("boundary=")).map((s) => s.replace(/^boundary=/, ""))[0];
      if (!boundary) {
        return void 0;
      }
      const boundaryRegExp = new RegExp(`--+${boundary}`);
      const fields = data2.split(boundaryRegExp).filter((chunk) => chunk.startsWith("\r\n") && chunk.endsWith("\r\n")).map((chunk) => chunk.trimStart().replace(/\r\n$/, ""));
      if (!fields.length) {
        return void 0;
      }
      const parsedBody = {};
      try {
        for (const field2 of fields) {
          const [contentHeaders, ...rest2] = field2.split("\r\n\r\n");
          const contentBody = rest2.join("\r\n\r\n");
          const { contentType: contentType2, filename, name } = parseContentHeaders(contentHeaders);
          const value = filename === void 0 ? contentBody : new File([contentBody], filename, { type: contentType2 });
          const parsedValue = parsedBody[name];
          if (parsedValue === void 0) {
            parsedBody[name] = value;
          } else if (Array.isArray(parsedValue)) {
            parsedBody[name] = [...parsedValue, value];
          } else {
            parsedBody[name] = [parsedValue, value];
          }
        }
        return parsedBody;
      } catch (error2) {
        return void 0;
      }
    }
    function parseBody(body2, headers) {
      var _a;
      if (!body2) {
        return body2;
      }
      const contentType = ((_a = headers == null ? void 0 : headers.get("content-type")) == null ? void 0 : _a.toLowerCase()) || "";
      const hasMultipartContent = contentType.startsWith("multipart/form-data");
      if (hasMultipartContent && typeof body2 !== "object") {
        return parseMultipartData(body2.toString(), headers) || body2;
      }
      const hasJsonContent = contentType.includes("json");
      if (hasJsonContent && typeof body2 !== "object") {
        return jsonParse(body2.toString()) || body2;
      }
      return body2;
    }
    function isStringEqual(actual, expected) {
      return actual.toLowerCase() === expected.toLowerCase();
    }
    var MockedRequest = class extends import_interceptors.IsomorphicRequest {
      constructor(url, init = {}) {
        super(url, init);
        if (init.id) {
          this.id = init.id;
        }
        this.cache = init.cache || "default";
        this.destination = init.destination || "";
        this.integrity = init.integrity || "";
        this.keepalive = init.keepalive || false;
        this.mode = init.mode || "cors";
        this.priority = init.priority || "auto";
        this.redirect = init.redirect || "follow";
        this.referrer = init.referrer || "";
        this.referrerPolicy = init.referrerPolicy || "no-referrer";
        this.cookies = init.cookies || this.getCookies();
      }
      get body() {
        const text2 = (0, import_bufferUtils.decodeBuffer)(this["_body"]);
        const body2 = parseBody(text2, this.headers);
        if (isStringEqual(this.method, "GET") && body2 === "") {
          return void 0;
        }
        return body2;
      }
      passthrough() {
        return {
          status: 101,
          statusText: "Continue",
          headers: new import_headers_polyfill4.Headers(),
          body: null,
          passthrough: true,
          once: false
        };
      }
      getCookies() {
        var _a;
        const requestCookiesString = this.headers.get("cookie");
        const ownCookies = requestCookiesString ? cookieUtils3.parse(requestCookiesString) : {};
        import_cookies.store.hydrate();
        const cookiesFromStore = Array.from(
          (_a = import_cookies.store.get({ ...this, url: this.url.href })) == null ? void 0 : _a.entries()
        ).reduce((cookies, [name, { value }]) => {
          return Object.assign(cookies, { [name.trim()]: value });
        }, {});
        const cookiesFromDocument = getRequestCookies(this);
        const forwardedCookies = {
          ...cookiesFromDocument,
          ...cookiesFromStore
        };
        for (const [name, value] of Object.entries(forwardedCookies)) {
          this.headers.append("cookie", `${name}=${value}`);
        }
        return {
          ...forwardedCookies,
          ...ownCookies
        };
      }
    };
    function parseWorkerRequest(rawRequest) {
      const url = new URL(rawRequest.url);
      const headers = new import_headers_polyfill5.Headers(rawRequest.headers);
      return new MockedRequest(url, {
        ...rawRequest,
        body: (0, import_interceptors2.encodeBuffer)(rawRequest.body || ""),
        headers
      });
    }
    var import_until2 = require_lib4();
    var getResponse = async (request, handlers, resolutionContext) => {
      const relevantHandlers = handlers.filter((handler) => {
        return handler.test(request, resolutionContext);
      });
      if (relevantHandlers.length === 0) {
        return {
          handler: void 0,
          response: void 0
        };
      }
      const result = await relevantHandlers.reduce(async (executionResult, handler) => {
        const previousResults = await executionResult;
        if (!!(previousResults == null ? void 0 : previousResults.response)) {
          return executionResult;
        }
        const result2 = await handler.run(request, resolutionContext);
        if (result2 === null || result2.handler.shouldSkip) {
          return null;
        }
        if (!result2.response) {
          return {
            request: result2.request,
            handler: result2.handler,
            response: void 0,
            parsedResult: result2.parsedResult
          };
        }
        if (result2.response.once) {
          handler.markAsSkipped(true);
        }
        return result2;
      }, Promise.resolve(null));
      if (!result) {
        return {
          handler: void 0,
          response: void 0
        };
      }
      return {
        handler: result.handler,
        publicRequest: result.request,
        parsedRequest: result.parsedResult,
        response: result.response
      };
    };
    var import_js_levenshtein = __toESM(require_js_levenshtein());
    var import_graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    var getPublicUrlFromRequest = (request) => {
      return request.referrer.startsWith(request.url.origin) ? request.url.pathname : new URL(
        request.url.pathname,
        `${request.url.protocol}//${request.url.host}`
      ).href;
    };
    function parseDocumentNode(node) {
      var _a;
      const operationDef = node.definitions.find((def) => {
        return def.kind === "OperationDefinition";
      });
      return {
        operationType: operationDef == null ? void 0 : operationDef.operation,
        operationName: (_a = operationDef == null ? void 0 : operationDef.name) == null ? void 0 : _a.value
      };
    }
    function parseQuery(query) {
      try {
        const ast = (0, import_graphql2.parse)(query);
        return parseDocumentNode(ast);
      } catch (error2) {
        return error2;
      }
    }
    function extractMultipartVariables(variables, map, files) {
      const operations = { variables };
      for (const [key, pathArray] of Object.entries(map)) {
        if (!(key in files)) {
          throw new Error(`Given files do not have a key '${key}' .`);
        }
        for (const dotPath of pathArray) {
          const [lastPath, ...reversedPaths] = dotPath.split(".").reverse();
          const paths = reversedPaths.reverse();
          let target = operations;
          for (const path of paths) {
            if (!(path in target)) {
              throw new Error(`Property '${paths}' is not in operations.`);
            }
            target = target[path];
          }
          target[lastPath] = files[key];
        }
      }
      return operations.variables;
    }
    function getGraphQLInput(request) {
      var _a, _b;
      switch (request.method) {
        case "GET": {
          const query = request.url.searchParams.get("query");
          const variables = request.url.searchParams.get("variables") || "";
          return {
            query,
            variables: jsonParse(variables)
          };
        }
        case "POST": {
          if ((_a = request.body) == null ? void 0 : _a.query) {
            const { query, variables } = request.body;
            return {
              query,
              variables
            };
          }
          if ((_b = request.body) == null ? void 0 : _b.operations) {
            const { operations, map, ...files } = request.body;
            const parsedOperations = jsonParse(
              operations
            ) || {};
            if (!parsedOperations.query) {
              return null;
            }
            const parsedMap = jsonParse(map || "") || {};
            const variables = parsedOperations.variables ? extractMultipartVariables(
              parsedOperations.variables,
              parsedMap,
              files
            ) : {};
            return {
              query: parsedOperations.query,
              variables
            };
          }
        }
        default:
          return null;
      }
    }
    function parseGraphQLRequest(request) {
      const input = getGraphQLInput(request);
      if (!input || !input.query) {
        return void 0;
      }
      const { query, variables } = input;
      const parsedResult = parseQuery(query);
      if (parsedResult instanceof Error) {
        const requestPublicUrl = getPublicUrlFromRequest(request);
        throw new Error(
          devUtils.formatMessage(
            'Failed to intercept a GraphQL request to "%s %s": cannot parse query. See the error message from the parser below.\n\n%s',
            request.method,
            requestPublicUrl,
            parsedResult.message
          )
        );
      }
      return {
        operationType: parsedResult.operationType,
        operationName: parsedResult.operationName,
        variables
      };
    }
    function getStatusCodeColor(status2) {
      if (status2 < 300) {
        return "#69AB32";
      }
      if (status2 < 400) {
        return "#F0BB4B";
      }
      return "#E95F5D";
    }
    function getTimestamp() {
      const now = /* @__PURE__ */ new Date();
      return [now.getHours(), now.getMinutes(), now.getSeconds()].map(String).map((chunk) => chunk.slice(0, 2)).map((chunk) => chunk.padStart(2, "0")).join(":");
    }
    function prepareRequest(request) {
      return {
        ...request,
        body: request.body,
        headers: request.headers.all()
      };
    }
    var import_headers_polyfill6 = require_lib();
    function prepareResponse(res) {
      const responseHeaders = (0, import_headers_polyfill6.objectToHeaders)(res.headers);
      const parsedBody = parseBody(res.body, responseHeaders);
      return {
        ...res,
        body: parsedBody
      };
    }
    var import_path_to_regexp = (init_dist(), __toCommonJS(dist_exports));
    var import_getCleanUrl = require_getCleanUrl();
    var REDUNDANT_CHARACTERS_EXP = /[\?|#].*$/g;
    function getSearchParams(path) {
      return new URL(`/${path}`, "http://localhost").searchParams;
    }
    function cleanUrl(path) {
      return path.replace(REDUNDANT_CHARACTERS_EXP, "");
    }
    function isAbsoluteUrl(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    }
    function getAbsoluteUrl(path, baseUrl) {
      if (isAbsoluteUrl(path)) {
        return path;
      }
      if (path.startsWith("*")) {
        return path;
      }
      const origin = baseUrl || typeof document !== "undefined" && document.baseURI;
      return origin ? decodeURI(new URL(encodeURI(path), origin).href) : path;
    }
    function normalizePath(path, baseUrl) {
      if (path instanceof RegExp) {
        return path;
      }
      const maybeAbsoluteUrl = getAbsoluteUrl(path, baseUrl);
      return cleanUrl(maybeAbsoluteUrl);
    }
    function coercePath(path) {
      return path.replace(
        /([:a-zA-Z_-]*)(\*{1,2})+/g,
        (_, parameterName, wildcard) => {
          const expression = "(.*)";
          if (!parameterName) {
            return expression;
          }
          return parameterName.startsWith(":") ? `${parameterName}${wildcard}` : `${parameterName}${expression}`;
        }
      ).replace(/([^\/])(:)(?=\d+)/, "$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/, "$1\\$2");
    }
    function matchRequestUrl(url, path, baseUrl) {
      const normalizedPath = normalizePath(path, baseUrl);
      const cleanPath = typeof normalizedPath === "string" ? coercePath(normalizedPath) : normalizedPath;
      const cleanUrl2 = (0, import_getCleanUrl.getCleanUrl)(url);
      const result = (0, import_path_to_regexp.match)(cleanPath, { decode: decodeURIComponent })(cleanUrl2);
      const params = result && result.params || {};
      return {
        matches: result !== false,
        params
      };
    }
    var import_headers_polyfill8 = require_lib();
    var import_headers_polyfill7 = require_lib();
    function compose(...fns) {
      return (...args) => {
        return fns.reduceRight((leftFn, rightFn) => {
          return leftFn instanceof Promise ? Promise.resolve(leftFn).then(rightFn) : rightFn(leftFn);
        }, args[0]);
      };
    }
    var defaultResponse = {
      status: 200,
      statusText: "OK",
      body: null,
      delay: 0,
      once: false,
      passthrough: false
    };
    var defaultResponseTransformers = [];
    function createResponseComposition(responseOverrides, defaultTransformers = defaultResponseTransformers) {
      return async (...transformers) => {
        const initialResponse = Object.assign(
          {},
          defaultResponse,
          {
            headers: new import_headers_polyfill7.Headers({
              "x-powered-by": "msw"
            })
          },
          responseOverrides
        );
        const resolvedTransformers = [
          ...defaultTransformers,
          ...transformers
        ].filter(Boolean);
        const resolvedResponse = resolvedTransformers.length > 0 ? compose(...resolvedTransformers)(initialResponse) : initialResponse;
        return resolvedResponse;
      };
    }
    var response = Object.assign(createResponseComposition(), {
      once: createResponseComposition({ once: true }),
      networkError(message) {
        throw new NetworkError(message);
      }
    });
    var SOURCE_FRAME = /[\/\\]msw[\/\\]src[\/\\](.+)/;
    var BUILD_FRAME = /(node_modules)?[\/\\]lib[\/\\](umd|esm|iief|cjs)[\/\\]|^[^\/\\]*$/;
    function getCallFrame(error2) {
      const stack = error2.stack;
      if (!stack) {
        return;
      }
      const frames = stack.split("\n").slice(1);
      const declarationFrame = frames.find((frame) => {
        return !(SOURCE_FRAME.test(frame) || BUILD_FRAME.test(frame));
      });
      if (!declarationFrame) {
        return;
      }
      const declarationPath = declarationFrame.replace(/\s*at [^()]*\(([^)]+)\)/, "$1").replace(/^@/, "");
      return declarationPath;
    }
    function isIterable(fn) {
      if (!fn) {
        return false;
      }
      return typeof fn[Symbol.iterator] == "function";
    }
    var defaultContext = {
      status,
      set,
      delay,
      fetch
    };
    var RequestHandler = class {
      constructor(options) {
        this.shouldSkip = false;
        this.ctx = options.ctx || defaultContext;
        this.resolver = options.resolver;
        const callFrame = getCallFrame(new Error());
        this.info = {
          ...options.info,
          callFrame
        };
      }
      parse(_request, _resolutionContext) {
        return null;
      }
      test(request, resolutionContext) {
        return this.predicate(
          request,
          this.parse(request, resolutionContext),
          resolutionContext
        );
      }
      getPublicRequest(request, _parsedResult) {
        return request;
      }
      markAsSkipped(shouldSkip = true) {
        this.shouldSkip = shouldSkip;
      }
      async run(request, resolutionContext) {
        if (this.shouldSkip) {
          return null;
        }
        const parsedResult = this.parse(request, resolutionContext);
        const shouldIntercept = this.predicate(
          request,
          parsedResult,
          resolutionContext
        );
        if (!shouldIntercept) {
          return null;
        }
        const publicRequest = this.getPublicRequest(request, parsedResult);
        const executeResolver = this.wrapResolver(this.resolver);
        const mockedResponse = await executeResolver(
          publicRequest,
          response,
          this.ctx
        );
        return this.createExecutionResult(
          parsedResult,
          publicRequest,
          mockedResponse
        );
      }
      wrapResolver(resolver) {
        return async (req, res, ctx) => {
          const result = this.resolverGenerator || await resolver(req, res, ctx);
          if (isIterable(result)) {
            const { value, done } = result[Symbol.iterator]().next();
            const nextResponse = await value;
            if (!nextResponse && done) {
              return this.resolverGeneratorResult;
            }
            if (!this.resolverGenerator) {
              this.resolverGenerator = result;
            }
            this.resolverGeneratorResult = nextResponse;
            return nextResponse;
          }
          return result;
        };
      }
      createExecutionResult(parsedResult, request, response2) {
        return {
          handler: this,
          parsedResult: parsedResult || null,
          request,
          response: response2 || null
        };
      }
    };
    var RESTMethods = ((RESTMethods2) => {
      RESTMethods2["HEAD"] = "HEAD";
      RESTMethods2["GET"] = "GET";
      RESTMethods2["POST"] = "POST";
      RESTMethods2["PUT"] = "PUT";
      RESTMethods2["PATCH"] = "PATCH";
      RESTMethods2["OPTIONS"] = "OPTIONS";
      RESTMethods2["DELETE"] = "DELETE";
      return RESTMethods2;
    })(RESTMethods || {});
    var restContext = {
      ...defaultContext,
      cookie,
      body,
      text,
      json,
      xml
    };
    var RestRequest = class extends MockedRequest {
      constructor(request, params) {
        super(request.url, {
          ...request,
          body: request["_body"]
        });
        this.params = params;
        this.id = request.id;
      }
    };
    var RestHandler = class extends RequestHandler {
      constructor(method, path, resolver) {
        super({
          info: {
            header: `${method} ${path}`,
            path,
            method
          },
          ctx: restContext,
          resolver
        });
        this.checkRedundantQueryParameters();
      }
      checkRedundantQueryParameters() {
        const { method, path } = this.info;
        if (path instanceof RegExp) {
          return;
        }
        const url = cleanUrl(path);
        if (url === path) {
          return;
        }
        const searchParams = getSearchParams(path);
        const queryParams = [];
        searchParams.forEach((_, paramName) => {
          queryParams.push(paramName);
        });
        devUtils.warn(
          `Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`
        );
      }
      parse(request, resolutionContext) {
        return matchRequestUrl(
          request.url,
          this.info.path,
          resolutionContext == null ? void 0 : resolutionContext.baseUrl
        );
      }
      getPublicRequest(request, parsedResult) {
        return new RestRequest(request, parsedResult.params || {});
      }
      predicate(request, parsedResult) {
        const matchesMethod = this.info.method instanceof RegExp ? this.info.method.test(request.method) : isStringEqual(this.info.method, request.method);
        return matchesMethod && parsedResult.matches;
      }
      log(request, response2) {
        const publicUrl = getPublicUrlFromRequest(request);
        const loggedRequest = prepareRequest(request);
        const loggedResponse = prepareResponse(response2);
        const statusColor = getStatusCodeColor(response2.status);
        console.groupCollapsed(
          devUtils.formatMessage("%s %s %s (%c%s%c)"),
          getTimestamp(),
          request.method,
          publicUrl,
          `color:${statusColor}`,
          `${response2.status} ${response2.statusText}`,
          "color:inherit"
        );
        console.log("Request", loggedRequest);
        console.log("Handler:", this);
        console.log("Response", loggedResponse);
        console.groupEnd();
      }
    };
    var import_outvariant3 = require_lib3();
    var field = (fieldName, fieldValue) => {
      return (res) => {
        validateFieldName(fieldName);
        const prevBody = jsonParse(res.body) || {};
        const nextBody = mergeRight(prevBody, { [fieldName]: fieldValue });
        return json(nextBody)(res);
      };
    };
    function validateFieldName(fieldName) {
      (0, import_outvariant3.invariant)(
        fieldName.trim() !== "",
        devUtils.formatMessage(
          "Failed to set a custom field on a GraphQL response: field name cannot be empty."
        )
      );
      (0, import_outvariant3.invariant)(
        fieldName !== "data",
        devUtils.formatMessage(
          'Failed to set a custom "%s" field on a mocked GraphQL response: forbidden field name. Did you mean to call "ctx.data()" instead?',
          fieldName
        )
      );
      (0, import_outvariant3.invariant)(
        fieldName !== "errors",
        devUtils.formatMessage(
          'Failed to set a custom "%s" field on a mocked GraphQL response: forbidden field name. Did you mean to call "ctx.errors()" instead?',
          fieldName
        )
      );
      (0, import_outvariant3.invariant)(
        fieldName !== "extensions",
        devUtils.formatMessage(
          'Failed to set a custom "%s" field on a mocked GraphQL response: forbidden field name. Did you mean to call "ctx.extensions()" instead?',
          fieldName
        )
      );
    }
    function tryCatch(fn, onException) {
      try {
        const result = fn();
        return result;
      } catch (error2) {
        onException == null ? void 0 : onException(error2);
      }
    }
    var graphqlContext = {
      ...defaultContext,
      data,
      extensions,
      errors,
      cookie,
      field
    };
    function isDocumentNode(value) {
      if (value == null) {
        return false;
      }
      return typeof value === "object" && "kind" in value && "definitions" in value;
    }
    var GraphQLRequest = class extends MockedRequest {
      constructor(request, variables, operationName) {
        super(request.url, {
          ...request,
          body: request["_body"]
        });
        this.variables = variables;
        this.operationName = operationName;
      }
    };
    var GraphQLHandler = class extends RequestHandler {
      constructor(operationType, operationName, endpoint, resolver) {
        let resolvedOperationName = operationName;
        if (isDocumentNode(operationName)) {
          const parsedNode = parseDocumentNode(operationName);
          if (parsedNode.operationType !== operationType) {
            throw new Error(
              `Failed to create a GraphQL handler: provided a DocumentNode with a mismatched operation type (expected "${operationType}", but got "${parsedNode.operationType}").`
            );
          }
          if (!parsedNode.operationName) {
            throw new Error(
              `Failed to create a GraphQL handler: provided a DocumentNode with no operation name.`
            );
          }
          resolvedOperationName = parsedNode.operationName;
        }
        const header = operationType === "all" ? `${operationType} (origin: ${endpoint.toString()})` : `${operationType} ${resolvedOperationName} (origin: ${endpoint.toString()})`;
        super({
          info: {
            header,
            operationType,
            operationName: resolvedOperationName
          },
          ctx: graphqlContext,
          resolver
        });
        this.endpoint = endpoint;
      }
      parse(request) {
        return tryCatch(
          () => parseGraphQLRequest(request),
          (error2) => console.error(error2.message)
        );
      }
      getPublicRequest(request, parsedResult) {
        var _a, _b;
        return new GraphQLRequest(
          request,
          (_a = parsedResult == null ? void 0 : parsedResult.variables) != null ? _a : {},
          (_b = parsedResult == null ? void 0 : parsedResult.operationName) != null ? _b : ""
        );
      }
      predicate(request, parsedResult) {
        if (!parsedResult) {
          return false;
        }
        if (!parsedResult.operationName && this.info.operationType !== "all") {
          const publicUrl = getPublicUrlFromRequest(request);
          devUtils.warn(`Failed to intercept a GraphQL request at "${request.method} ${publicUrl}": anonymous GraphQL operations are not supported.

Consider naming this operation or using "graphql.operation()" request handler to intercept GraphQL requests regardless of their operation name/type. Read more: https://mswjs.io/docs/api/graphql/operation      `);
          return false;
        }
        const hasMatchingUrl = matchRequestUrl(request.url, this.endpoint);
        const hasMatchingOperationType = this.info.operationType === "all" || parsedResult.operationType === this.info.operationType;
        const hasMatchingOperationName = this.info.operationName instanceof RegExp ? this.info.operationName.test(parsedResult.operationName || "") : parsedResult.operationName === this.info.operationName;
        return hasMatchingUrl.matches && hasMatchingOperationType && hasMatchingOperationName;
      }
      log(request, response2, parsedRequest) {
        const loggedRequest = prepareRequest(request);
        const loggedResponse = prepareResponse(response2);
        const statusColor = getStatusCodeColor(response2.status);
        const requestInfo = (parsedRequest == null ? void 0 : parsedRequest.operationName) ? `${parsedRequest == null ? void 0 : parsedRequest.operationType} ${parsedRequest == null ? void 0 : parsedRequest.operationName}` : `anonymous ${parsedRequest == null ? void 0 : parsedRequest.operationType}`;
        console.groupCollapsed(
          devUtils.formatMessage("%s %s (%c%s%c)"),
          getTimestamp(),
          `${requestInfo}`,
          `color:${statusColor}`,
          `${response2.status} ${response2.statusText}`,
          "color:inherit"
        );
        console.log("Request:", loggedRequest);
        console.log("Handler:", this);
        console.log("Response:", loggedResponse);
        console.groupEnd();
      }
    };
    var MAX_MATCH_SCORE = 3;
    var MAX_SUGGESTION_COUNT = 4;
    var TYPE_MATCH_DELTA = 0.5;
    function groupHandlersByType(handlers) {
      return handlers.reduce(
        (groups, handler) => {
          if (handler instanceof RestHandler) {
            groups.rest.push(handler);
          }
          if (handler instanceof GraphQLHandler) {
            groups.graphql.push(handler);
          }
          return groups;
        },
        {
          rest: [],
          graphql: []
        }
      );
    }
    function getRestHandlerScore() {
      return (request, handler) => {
        const { path, method } = handler.info;
        if (path instanceof RegExp || method instanceof RegExp) {
          return Infinity;
        }
        const hasSameMethod = isStringEqual(request.method, method);
        const methodScoreDelta = hasSameMethod ? TYPE_MATCH_DELTA : 0;
        const requestPublicUrl = getPublicUrlFromRequest(request);
        const score = (0, import_js_levenshtein.default)(requestPublicUrl, path);
        return score - methodScoreDelta;
      };
    }
    function getGraphQLHandlerScore(parsedQuery) {
      return (_, handler) => {
        if (typeof parsedQuery.operationName === "undefined") {
          return Infinity;
        }
        const { operationType, operationName } = handler.info;
        if (typeof operationName !== "string") {
          return Infinity;
        }
        const hasSameOperationType = parsedQuery.operationType === operationType;
        const operationTypeScoreDelta = hasSameOperationType ? TYPE_MATCH_DELTA : 0;
        const score = (0, import_js_levenshtein.default)(parsedQuery.operationName, operationName);
        return score - operationTypeScoreDelta;
      };
    }
    function getSuggestedHandler(request, handlers, getScore) {
      const suggestedHandlers = handlers.reduce((suggestions, handler) => {
        const score = getScore(request, handler);
        return suggestions.concat([[score, handler]]);
      }, []).sort(([leftScore], [rightScore]) => leftScore - rightScore).filter(([score]) => score <= MAX_MATCH_SCORE).slice(0, MAX_SUGGESTION_COUNT).map(([, handler]) => handler);
      return suggestedHandlers;
    }
    function getSuggestedHandlersMessage(handlers) {
      if (handlers.length > 1) {
        return `Did you mean to request one of the following resources instead?

${handlers.map((handler) => `  • ${handler.info.header}`).join("\n")}`;
      }
      return `Did you mean to request "${handlers[0].info.header}" instead?`;
    }
    function onUnhandledRequest(request, handlers, strategy = "warn") {
      const parsedGraphQLQuery = tryCatch(() => parseGraphQLRequest(request));
      function generateHandlerSuggestion() {
        const handlerGroups = groupHandlersByType(handlers);
        const relevantHandlers = parsedGraphQLQuery ? handlerGroups.graphql : handlerGroups.rest;
        const suggestedHandlers = getSuggestedHandler(
          request,
          relevantHandlers,
          parsedGraphQLQuery ? getGraphQLHandlerScore(parsedGraphQLQuery) : getRestHandlerScore()
        );
        return suggestedHandlers.length > 0 ? getSuggestedHandlersMessage(suggestedHandlers) : "";
      }
      function generateUnhandledRequestMessage() {
        const publicUrl = getPublicUrlFromRequest(request);
        const requestHeader = parsedGraphQLQuery ? `${parsedGraphQLQuery.operationType} ${parsedGraphQLQuery.operationName} (${request.method} ${publicUrl})` : `${request.method} ${publicUrl}`;
        const handlerSuggestion = generateHandlerSuggestion();
        const messageTemplate = [
          `captured a request without a matching request handler:`,
          `  • ${requestHeader}`,
          handlerSuggestion,
          `If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks`
        ].filter(Boolean);
        return messageTemplate.join("\n\n");
      }
      function applyStrategy(strategy2) {
        const message = generateUnhandledRequestMessage();
        switch (strategy2) {
          case "error": {
            devUtils.error("Error: %s", message);
            throw new Error(
              devUtils.formatMessage(
                'Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.'
              )
            );
          }
          case "warn": {
            devUtils.warn("Warning: %s", message);
            break;
          }
          case "bypass":
            break;
          default:
            throw new Error(
              devUtils.formatMessage(
                'Failed to react to an unhandled request: unknown strategy "%s". Please provide one of the supported strategies ("bypass", "warn", "error") or a custom callback function as the value of the "onUnhandledRequest" option.',
                strategy2
              )
            );
        }
      }
      if (typeof strategy === "function") {
        strategy(request, {
          warning: applyStrategy.bind(null, "warn"),
          error: applyStrategy.bind(null, "error")
        });
        return;
      }
      applyStrategy(strategy);
    }
    var import_cookies2 = require_lib8();
    function readResponseCookies(request, response2) {
      import_cookies2.store.add({ ...request, url: request.url.toString() }, response2);
      import_cookies2.store.persist();
    }
    async function handleRequest(request, handlers, options, emitter, handleRequestOptions) {
      var _a, _b, _c, _d, _e, _f;
      emitter.emit("request:start", request);
      if (request.headers.get("x-msw-bypass") === "true") {
        emitter.emit("request:end", request);
        (_a = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _a.call(handleRequestOptions, request);
        return;
      }
      const [lookupError, lookupResult] = await (0, import_until2.until)(() => {
        return getResponse(
          request,
          handlers,
          handleRequestOptions == null ? void 0 : handleRequestOptions.resolutionContext
        );
      });
      if (lookupError) {
        emitter.emit("unhandledException", lookupError, request);
        throw lookupError;
      }
      const { handler, response: response2 } = lookupResult;
      if (!handler) {
        onUnhandledRequest(request, handlers, options.onUnhandledRequest);
        emitter.emit("request:unhandled", request);
        emitter.emit("request:end", request);
        (_b = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _b.call(handleRequestOptions, request);
        return;
      }
      if (!response2) {
        devUtils.warn(
          `Expected response resolver to return a mocked response Object, but got %s. The original response is going to be used instead.

  • %s
    %s`,
          response2,
          handler.info.header,
          handler.info.callFrame
        );
        emitter.emit("request:end", request);
        (_c = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _c.call(handleRequestOptions, request);
        return;
      }
      if (response2.passthrough) {
        emitter.emit("request:end", request);
        (_d = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _d.call(handleRequestOptions, request);
        return;
      }
      readResponseCookies(request, response2);
      emitter.emit("request:match", request);
      const requiredLookupResult = lookupResult;
      const transformedResponse = ((_e = handleRequestOptions == null ? void 0 : handleRequestOptions.transformResponse) == null ? void 0 : _e.call(handleRequestOptions, response2)) || response2;
      (_f = handleRequestOptions == null ? void 0 : handleRequestOptions.onMockedResponse) == null ? void 0 : _f.call(
        handleRequestOptions,
        transformedResponse,
        requiredLookupResult
      );
      emitter.emit("request:end", request);
      return transformedResponse;
    }
    var import_headers_polyfill9 = require_lib();
    async function serializeResponse(response2) {
      return {
        status: response2.status,
        statusText: response2.statusText,
        headers: (0, import_headers_polyfill9.flattenHeadersObject)((0, import_headers_polyfill9.headersToObject)(response2.headers)),
        body: await response2.clone().text()
      };
    }
    var createRequestListener = (context2, options) => {
      return async (event, message) => {
        var _a;
        const messageChannel = new WorkerChannel(event.ports[0]);
        const request = parseWorkerRequest(message.payload);
        try {
          await handleRequest(
            request,
            context2.requestHandlers,
            options,
            context2.emitter,
            {
              transformResponse,
              onPassthroughResponse() {
                messageChannel.postMessage("NOT_FOUND");
              },
              async onMockedResponse(response2, { handler, publicRequest, parsedRequest }) {
                if (response2.body instanceof ReadableStream) {
                  throw new Error(
                    devUtils.formatMessage(
                      'Failed to construct a mocked response with a "ReadableStream" body: mocked streams are not supported. Follow https://github.com/mswjs/msw/issues/1336 for more details.'
                    )
                  );
                }
                const responseInstance = new Response(response2.body, response2);
                const responseForLogs = responseInstance.clone();
                const responseBodyBuffer = await responseInstance.arrayBuffer();
                const responseBody = response2.body == null ? null : responseBodyBuffer;
                messageChannel.postMessage(
                  "MOCK_RESPONSE",
                  {
                    ...response2,
                    body: responseBody
                  },
                  [responseBodyBuffer]
                );
                if (!options.quiet) {
                  context2.emitter.once("response:mocked", async () => {
                    handler.log(
                      publicRequest,
                      await serializeResponse(responseForLogs),
                      parsedRequest
                    );
                  });
                }
              }
            }
          );
        } catch (error2) {
          if (error2 instanceof NetworkError) {
            messageChannel.postMessage("NETWORK_ERROR", {
              name: error2.name,
              message: error2.message
            });
            return;
          }
          if (error2 instanceof Error) {
            devUtils.error(
              `Uncaught exception in the request handler for "%s %s":

%s

This exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error, as it indicates a mistake in your code. If you wish to mock an error response, please see this guide: https://mswjs.io/docs/recipes/mocking-error-responses`,
              request.method,
              request.url,
              (_a = error2.stack) != null ? _a : error2
            );
            messageChannel.postMessage("MOCK_RESPONSE", {
              status: 500,
              statusText: "Request Handler Error",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: error2.name,
                message: error2.message,
                stack: error2.stack
              })
            });
          }
        }
      };
    };
    function transformResponse(response2) {
      return {
        status: response2.status,
        statusText: response2.statusText,
        headers: response2.headers.all(),
        body: response2.body,
        delay: response2.delay
      };
    }
    async function requestIntegrityCheck(context2, serviceWorker) {
      context2.workerChannel.send("INTEGRITY_CHECK_REQUEST");
      const { payload: actualChecksum } = await context2.events.once(
        "INTEGRITY_CHECK_RESPONSE"
      );
      if (actualChecksum !== "3d6b9f06410d179a7f7404d4bf4c3c70") {
        throw new Error(
          `Currently active Service Worker (${actualChecksum}) is behind the latest published one (${"3d6b9f06410d179a7f7404d4bf4c3c70"}).`
        );
      }
      return serviceWorker;
    }
    var import_until3 = require_lib4();
    function deferNetworkRequestsUntil(predicatePromise) {
      const originalXhrSend = window.XMLHttpRequest.prototype.send;
      window.XMLHttpRequest.prototype.send = function(...args) {
        (0, import_until3.until)(() => predicatePromise).then(() => {
          window.XMLHttpRequest.prototype.send = originalXhrSend;
          this.send(...args);
        });
      };
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        await (0, import_until3.until)(() => predicatePromise);
        window.fetch = originalFetch;
        return window.fetch(...args);
      };
    }
    function createResponseListener(context2) {
      return (_, message) => {
        var _a;
        const { payload: responseJson } = message;
        if ((_a = responseJson.type) == null ? void 0 : _a.includes("opaque")) {
          return;
        }
        const response2 = new Response(responseJson.body || null, responseJson);
        const isMockedResponse = response2.headers.get("x-powered-by") === "msw";
        if (isMockedResponse) {
          context2.emitter.emit("response:mocked", response2, responseJson.requestId);
        } else {
          context2.emitter.emit("response:bypass", response2, responseJson.requestId);
        }
      };
    }
    function validateWorkerScope(registration, options) {
      if (!(options == null ? void 0 : options.quiet) && !location.href.startsWith(registration.scope)) {
        devUtils.warn(
          `Cannot intercept requests on this page because it's outside of the worker's scope ("${registration.scope}"). If you wish to mock API requests on this page, you must resolve this scope issue.

- (Recommended) Register the worker at the root level ("/") of your application.
- Set the "Service-Worker-Allowed" response header to allow out-of-scope workers.`
        );
      }
    }
    var createStartHandler = (context2) => {
      return function start(options, customOptions) {
        const startWorkerInstance = async () => {
          context2.events.removeAllListeners();
          context2.workerChannel.on(
            "REQUEST",
            createRequestListener(context2, options)
          );
          context2.workerChannel.on("RESPONSE", createResponseListener(context2));
          const instance = await getWorkerInstance(
            options.serviceWorker.url,
            options.serviceWorker.options,
            options.findWorker
          );
          const [worker, registration] = instance;
          if (!worker) {
            const missingWorkerMessage = (customOptions == null ? void 0 : customOptions.findWorker) ? devUtils.formatMessage(
              `Failed to locate the Service Worker registration using a custom "findWorker" predicate.

Please ensure that the custom predicate properly locates the Service Worker registration at "%s".
More details: https://mswjs.io/docs/api/setup-worker/start#findworker
`,
              options.serviceWorker.url
            ) : devUtils.formatMessage(
              `Failed to locate the Service Worker registration.

This most likely means that the worker script URL "%s" cannot resolve against the actual public hostname (%s). This may happen if your application runs behind a proxy, or has a dynamic hostname.

Please consider using a custom "serviceWorker.url" option to point to the actual worker script location, or a custom "findWorker" option to resolve the Service Worker registration manually. More details: https://mswjs.io/docs/api/setup-worker/start`,
              options.serviceWorker.url,
              location.host
            );
            throw new Error(missingWorkerMessage);
          }
          context2.worker = worker;
          context2.registration = registration;
          context2.events.addListener(window, "beforeunload", () => {
            if (worker.state !== "redundant") {
              context2.workerChannel.send("CLIENT_CLOSED");
            }
            window.clearInterval(context2.keepAliveInterval);
          });
          const [integrityError] = await (0, import_until4.until)(
            () => requestIntegrityCheck(context2, worker)
          );
          if (integrityError) {
            devUtils.error(`Detected outdated Service Worker: ${integrityError.message}

The mocking is still enabled, but it's highly recommended that you update your Service Worker by running:

$ npx msw init <PUBLIC_DIR>

This is necessary to ensure that the Service Worker is in sync with the library to guarantee its stability.
If this message still persists after updating, please report an issue: https://github.com/open-draft/msw/issues      `);
          }
          context2.keepAliveInterval = window.setInterval(
            () => context2.workerChannel.send("KEEPALIVE_REQUEST"),
            5e3
          );
          validateWorkerScope(registration, context2.startOptions);
          return registration;
        };
        const workerRegistration = startWorkerInstance().then(
          async (registration) => {
            const pendingInstance = registration.installing || registration.waiting;
            if (pendingInstance) {
              await new Promise((resolve) => {
                pendingInstance.addEventListener("statechange", () => {
                  if (pendingInstance.state === "activated") {
                    return resolve();
                  }
                });
              });
            }
            await enableMocking(context2, options).catch((error2) => {
              throw new Error(`Failed to enable mocking: ${error2 == null ? void 0 : error2.message}`);
            });
            return registration;
          }
        );
        if (options.waitUntilReady) {
          deferNetworkRequestsUntil(workerRegistration);
        }
        return workerRegistration;
      };
    };
    function printStopMessage(args = {}) {
      if (args.quiet) {
        return;
      }
      console.log(
        `%c${devUtils.formatMessage("Mocking disabled.")}`,
        "color:orangered;font-weight:bold;"
      );
    }
    var createStop = (context2) => {
      return function stop() {
        var _a;
        if (!context2.isMockingEnabled) {
          devUtils.warn(
            'Found a redundant "worker.stop()" call. Note that stopping the worker while mocking already stopped has no effect. Consider removing this "worker.stop()" call.'
          );
          return;
        }
        context2.workerChannel.send("MOCK_DEACTIVATE");
        context2.isMockingEnabled = false;
        window.clearInterval(context2.keepAliveInterval);
        printStopMessage({ quiet: (_a = context2.startOptions) == null ? void 0 : _a.quiet });
      };
    };
    var DEFAULT_START_OPTIONS = {
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: null
      },
      quiet: false,
      waitUntilReady: true,
      onUnhandledRequest: "warn",
      findWorker(scriptURL, mockServiceWorkerUrl) {
        return scriptURL === mockServiceWorkerUrl;
      }
    };
    var import_interceptors3 = require_lib7();
    var import_fetch3 = require_fetch();
    var import_XMLHttpRequest = require_XMLHttpRequest();
    function createResponseFromIsomorphicResponse(response2) {
      return new Response(response2.body, {
        status: response2.status,
        statusText: response2.statusText,
        headers: response2.headers
      });
    }
    function createFallbackRequestListener(context2, options) {
      const interceptor = new import_interceptors3.BatchInterceptor({
        name: "fallback",
        interceptors: [new import_fetch3.FetchInterceptor(), new import_XMLHttpRequest.XMLHttpRequestInterceptor()]
      });
      interceptor.on("request", async (request) => {
        const mockedRequest = new MockedRequest(request.url, {
          ...request,
          body: await request.arrayBuffer()
        });
        const response2 = await handleRequest(
          mockedRequest,
          context2.requestHandlers,
          options,
          context2.emitter,
          {
            transformResponse(response3) {
              return {
                status: response3.status,
                statusText: response3.statusText,
                headers: response3.headers.all(),
                body: response3.body,
                delay: response3.delay
              };
            },
            onMockedResponse(_, { handler, publicRequest, parsedRequest }) {
              if (!options.quiet) {
                context2.emitter.once("response:mocked", async (response3) => {
                  handler.log(
                    publicRequest,
                    await serializeResponse(response3),
                    parsedRequest
                  );
                });
              }
            }
          }
        );
        if (response2) {
          request.respondWith(response2);
        }
      });
      interceptor.on("response", (request, response2) => {
        if (!request.id) {
          return;
        }
        const browserResponse = createResponseFromIsomorphicResponse(response2);
        if (response2.headers.get("x-powered-by") === "msw") {
          context2.emitter.emit("response:mocked", browserResponse, request.id);
        } else {
          context2.emitter.emit("response:bypass", browserResponse, request.id);
        }
      });
      interceptor.apply();
      return interceptor;
    }
    function createFallbackStart(context2) {
      return async function start(options) {
        context2.fallbackInterceptor = createFallbackRequestListener(
          context2,
          options
        );
        printStartMessage({
          message: "Mocking enabled (fallback mode).",
          quiet: options.quiet
        });
        return void 0;
      };
    }
    function createFallbackStop(context2) {
      return function stop() {
        var _a, _b;
        (_a = context2.fallbackInterceptor) == null ? void 0 : _a.dispose();
        printStopMessage({ quiet: (_b = context2.startOptions) == null ? void 0 : _b.quiet });
      };
    }
    var import_outvariant4 = require_lib3();
    var import_strict_event_emitter = require_lib10();
    function pipeEvents(source, destination) {
      const rawEmit = source.emit;
      if (rawEmit._isPiped) {
        return;
      }
      source.emit = function(event, ...data2) {
        destination.emit(event, ...data2);
        return rawEmit.call(this, event, ...data2);
      };
      source.emit._isPiped = true;
    }
    function toReadonlyArray(source) {
      const clone = [...source];
      Object.freeze(clone);
      return clone;
    }
    var SetupApi = class {
      constructor(...initialHandlers) {
        this.validateHandlers(...initialHandlers);
        this.initialHandlers = toReadonlyArray(initialHandlers);
        this.currentHandlers = [...initialHandlers];
        this.emitter = new import_strict_event_emitter.Emitter();
        this.publicEmitter = new import_strict_event_emitter.Emitter();
        pipeEvents(this.emitter, this.publicEmitter);
        this.events = this.createLifeCycleEvents();
      }
      validateHandlers(...handlers) {
        for (const handler of handlers) {
          (0, import_outvariant4.invariant)(
            !Array.isArray(handler),
            devUtils.formatMessage(
              'Failed to construct "%s" given an Array of request handlers. Make sure you spread the request handlers when calling the respective setup function.'
            ),
            this.constructor.name
          );
        }
      }
      dispose() {
        this.emitter.removeAllListeners();
        this.publicEmitter.removeAllListeners();
      }
      use(...runtimeHandlers) {
        this.currentHandlers.unshift(...runtimeHandlers);
      }
      restoreHandlers() {
        this.currentHandlers.forEach((handler) => {
          handler.markAsSkipped(false);
        });
      }
      resetHandlers(...nextHandlers) {
        this.currentHandlers = nextHandlers.length > 0 ? [...nextHandlers] : [...this.initialHandlers];
      }
      listHandlers() {
        return toReadonlyArray(this.currentHandlers);
      }
      createLifeCycleEvents() {
        return {
          on: (...args) => {
            return this.publicEmitter.on(...args);
          },
          removeListener: (...args) => {
            return this.publicEmitter.removeListener(...args);
          },
          removeAllListeners: (...args) => {
            return this.publicEmitter.removeAllListeners(...args);
          }
        };
      }
    };
    var SetupWorkerApi = class extends SetupApi {
      constructor(...handlers) {
        super(...handlers);
        this.startHandler = null;
        this.stopHandler = null;
        (0, import_outvariant5.invariant)(
          !(0, import_is_node_process3.isNodeProcess)(),
          devUtils.formatMessage(
            "Failed to execute `setupWorker` in a non-browser environment. Consider using `setupServer` for Node.js environment instead."
          )
        );
        this.listeners = [];
        this.context = this.createWorkerContext();
      }
      createWorkerContext() {
        const context2 = {
          isMockingEnabled: false,
          startOptions: null,
          worker: null,
          registration: null,
          requestHandlers: this.currentHandlers,
          emitter: this.emitter,
          workerChannel: {
            on: (eventType, callback) => {
              this.context.events.addListener(
                navigator.serviceWorker,
                "message",
                (event) => {
                  if (event.source !== this.context.worker) {
                    return;
                  }
                  const message = event.data;
                  if (!message) {
                    return;
                  }
                  if (message.type === eventType) {
                    callback(event, message);
                  }
                }
              );
            },
            send: (type) => {
              var _a;
              (_a = this.context.worker) == null ? void 0 : _a.postMessage(type);
            }
          },
          events: {
            addListener: (target, eventType, callback) => {
              target.addEventListener(eventType, callback);
              this.listeners.push({ eventType, target, callback });
              return () => {
                target.removeEventListener(eventType, callback);
              };
            },
            removeAllListeners: () => {
              for (const { target, eventType, callback } of this.listeners) {
                target.removeEventListener(eventType, callback);
              }
              this.listeners = [];
            },
            once: (eventType) => {
              const bindings = [];
              return new Promise((resolve, reject) => {
                const handleIncomingMessage = (event) => {
                  try {
                    const message = event.data;
                    if (message.type === eventType) {
                      resolve(message);
                    }
                  } catch (error2) {
                    reject(error2);
                  }
                };
                bindings.push(
                  this.context.events.addListener(
                    navigator.serviceWorker,
                    "message",
                    handleIncomingMessage
                  ),
                  this.context.events.addListener(
                    navigator.serviceWorker,
                    "messageerror",
                    reject
                  )
                );
              }).finally(() => {
                bindings.forEach((unbind) => unbind());
              });
            }
          },
          useFallbackMode: !("serviceWorker" in navigator) || location.protocol === "file:"
        };
        Object.defineProperties(context2, {
          requestHandlers: {
            get: () => this.currentHandlers
          }
        });
        this.startHandler = context2.useFallbackMode ? createFallbackStart(context2) : createStartHandler(context2);
        this.stopHandler = context2.useFallbackMode ? createFallbackStop(context2) : createStop(context2);
        return context2;
      }
      async start(options = {}) {
        this.context.startOptions = mergeRight(
          DEFAULT_START_OPTIONS,
          options
        );
        return await this.startHandler(this.context.startOptions, options);
      }
      printHandlers() {
        const handlers = this.listHandlers();
        handlers.forEach((handler) => {
          const { header, callFrame } = handler.info;
          const pragma = handler.info.hasOwnProperty("operationType") ? "[graphql]" : "[rest]";
          console.groupCollapsed(`${pragma} ${header}`);
          if (callFrame) {
            console.log(`Declaration: ${callFrame}`);
          }
          console.log("Handler:", handler);
          console.groupEnd();
        });
      }
      stop() {
        super.dispose();
        this.context.events.removeAllListeners();
        this.context.emitter.removeAllListeners();
        this.stopHandler();
      }
    };
    function setupWorker(...handlers) {
      return new SetupWorkerApi(...handlers);
    }
    function createRestHandler(method) {
      return (path, resolver) => {
        return new RestHandler(method, path, resolver);
      };
    }
    var rest = {
      all: createRestHandler(/.+/),
      head: createRestHandler(
        "HEAD"
        /* HEAD */
      ),
      get: createRestHandler(
        "GET"
        /* GET */
      ),
      post: createRestHandler(
        "POST"
        /* POST */
      ),
      put: createRestHandler(
        "PUT"
        /* PUT */
      ),
      delete: createRestHandler(
        "DELETE"
        /* DELETE */
      ),
      patch: createRestHandler(
        "PATCH"
        /* PATCH */
      ),
      options: createRestHandler(
        "OPTIONS"
        /* OPTIONS */
      )
    };
    function createScopedGraphQLHandler(operationType, url) {
      return (operationName, resolver) => {
        return new GraphQLHandler(
          operationType,
          operationName,
          url,
          resolver
        );
      };
    }
    function createGraphQLOperationHandler(url) {
      return (resolver) => {
        return new GraphQLHandler(
          "all",
          new RegExp(".*"),
          url,
          resolver
        );
      };
    }
    var standardGraphQLHandlers = {
      operation: createGraphQLOperationHandler("*"),
      query: createScopedGraphQLHandler("query", "*"),
      mutation: createScopedGraphQLHandler("mutation", "*")
    };
    function createGraphQLLink(url) {
      return {
        operation: createGraphQLOperationHandler(url),
        query: createScopedGraphQLHandler("query", url),
        mutation: createScopedGraphQLHandler("mutation", url)
      };
    }
    var graphql2 = {
      ...standardGraphQLHandlers,
      link: createGraphQLLink
    };
    checkGlobals();
  }
});
export default require_lib11();
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=msw.js.map
