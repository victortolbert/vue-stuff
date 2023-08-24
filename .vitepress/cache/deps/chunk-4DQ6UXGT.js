import {
  getCurrentInstance,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  unref,
  version,
  watch,
  watchEffect
} from "./chunk-OX6HOUGK.js";

// node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
var defaultTask = { run: (function_) => function_() };
var _createTask = () => defaultTask;
var createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}
var Hookable = class {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
};
function createHooks() {
  return new Hookable();
}

// node_modules/.pnpm/@unhead+shared@1.3.4/node_modules/@unhead/shared/dist/index.mjs
function asArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
var TagsWithInnerContent = ["title", "script", "style", "noscript"];
var HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var ValidHeadTags = [
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"];
var TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent"];
var IsBrowser = typeof window !== "undefined";
var composableNames = [
  "getActiveHead",
  "useHead",
  "useSeoMeta",
  "useHeadSafe",
  "useServerHead",
  "useServerSeoMeta",
  "useServerHeadSafe"
];
function defineHeadPlugin(plugin) {
  return plugin;
}
function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  return tag._h || hashCode(tag._d ? tag._d : `${tag.tag}:${tag.textContent || tag.innerHTML || ""}:${Object.entries(tag.props).map(([key, value]) => `${key}:${String(value)}`).join(",")}`);
}
function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}
function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}
function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (resolved)
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}
var MetaPackingSchema = {
  robots: {
    unpack: {
      keyValueSeparator: ":"
    }
  },
  // Pragma directives
  contentSecurityPolicy: {
    unpack: {
      keyValueSeparator: " ",
      entrySeparator: "; "
    },
    metaKey: "http-equiv"
  },
  fbAppId: {
    keyValue: "fb:app_id",
    metaKey: "property"
  },
  ogSiteName: {
    keyValue: "og:site_name"
  },
  msapplicationTileImage: {
    keyValue: "msapplication-TileImage"
  },
  /**
   * Tile colour for windows
   */
  msapplicationTileColor: {
    keyValue: "msapplication-TileColor"
  },
  /**
   * URL of a config for windows tile.
   */
  msapplicationConfig: {
    keyValue: "msapplication-Config"
  },
  charset: {
    metaKey: "charset"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  },
  refresh: {
    metaKey: "http-equiv"
  }
};
var ColonPrefixKeys = /^(og|twitter|fb)/;
var PropertyPrefixKeys = /^(og|fb)/;
function resolveMetaKeyType(key) {
  var _a;
  return PropertyPrefixKeys.test(key) ? "property" : ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.metaKey) || "name";
}
function resolveMetaKeyValue(key) {
  var _a;
  return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.keyValue) || fixKeyCase(key);
}
function fixKeyCase(key) {
  key = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  if (ColonPrefixKeys.test(key)) {
    key = key.replace("secure-url", "secure_url").replace(/-/g, ":");
  }
  return key;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry) => changeKeyCasingDeep(entry));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const [key, value] of Object.entries(input))
    output[fixKeyCase(key)] = changeKeyCasingDeep(value);
  return output;
}
function resolvePackedMetaObjectValue(value, key) {
  const definition = MetaPackingSchema[key];
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(
    changeKeyCasingDeep(value),
    {
      entrySeparator: ", ",
      keyValueSeparator: "=",
      resolve({ value: value2, key: key2 }) {
        if (value2 === null)
          return "";
        if (typeof value2 === "boolean")
          return `${key2}`;
      },
      ...definition == null ? void 0 : definition.unpack
    }
  );
}
var OpenGraphInputs = ["og:Image", "og:Video", "og:Audio", "twitter:Image"];
var SimpleArrayUnpackMetas = ["themeColor"];
function unpackMeta(input) {
  const extras = [];
  OpenGraphInputs.forEach((key) => {
    const propKey = key.toLowerCase();
    const inputKey = `${key.replace(":", "")}`;
    const val = input[inputKey];
    if (typeof val === "object") {
      (Array.isArray(val) ? val : [val]).forEach((entry) => {
        if (!entry)
          return;
        const unpackedEntry = unpackToArray(entry, {
          key: key.startsWith("og") ? "property" : "name",
          value: "content",
          resolveKeyData({ key: key2 }) {
            return fixKeyCase(`${propKey}${key2 !== "url" ? `:${key2}` : ""}`);
          },
          resolveValueData({ value }) {
            return typeof value === "number" ? value.toString() : value;
          }
        });
        extras.push(
          ...unpackedEntry.sort((a, b) => a.property === propKey ? -1 : b.property === propKey ? 1 : 0)
        );
      });
      delete input[inputKey];
    }
  });
  SimpleArrayUnpackMetas.forEach((meta2) => {
    if (input[meta2] && typeof input[meta2] !== "string") {
      const val = Array.isArray(input[meta2]) ? input[meta2] : [input[meta2]];
      delete input[meta2];
      val.forEach((entry) => {
        extras.push({
          name: fixKeyCase(meta2),
          ...entry
        });
      });
    }
  });
  const meta = unpackToArray(input, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      return resolveMetaKeyValue(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object")
        return resolvePackedMetaObjectValue(value, key);
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].filter((v) => typeof v.content === "undefined" || v.content !== "_null");
}
var WhitelistAttributes = {
  htmlAttrs: ["id", "class", "lang", "dir"],
  bodyAttrs: ["id", "class"],
  meta: ["id", "name", "property", "charset", "content"],
  noscript: ["id", "textContent"],
  script: ["id", "type", "textContent"],
  link: ["id", "color", "crossorigin", "fetchpriority", "href", "hreflang", "imagesrcset", "imagesizes", "integrity", "media", "referrerpolicy", "rel", "sizes", "type"]
};
function whitelistSafeInput(input) {
  const filtered = {};
  Object.keys(input).forEach((key) => {
    const tagValue = input[key];
    if (!tagValue)
      return;
    switch (key) {
      case "title":
      case "titleTemplate":
      case "templateParams":
        filtered[key] = tagValue;
        break;
      case "htmlAttrs":
      case "bodyAttrs":
        filtered[key] = {};
        WhitelistAttributes[key].forEach((a) => {
          if (tagValue[a])
            filtered[key][a] = tagValue[a];
        });
        Object.keys(tagValue || {}).filter((a) => a.startsWith("data-")).forEach((a) => {
          filtered[key][a] = tagValue[a];
        });
        break;
      case "meta":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const safeMeta = {};
            WhitelistAttributes.meta.forEach((key2) => {
              if (meta[key2] || key2.startsWith("data-"))
                safeMeta[key2] = meta[key2];
            });
            return safeMeta;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "link":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const link = {};
            WhitelistAttributes.link.forEach((key2) => {
              const val = meta[key2];
              if (key2 === "rel" && ["stylesheet", "canonical", "modulepreload", "prerender", "preload", "prefetch"].includes(val))
                return;
              if (key2 === "href") {
                if (val.includes("javascript:") || val.includes("data:"))
                  return;
                link[key2] = val;
              } else if (val || key2.startsWith("data-")) {
                link[key2] = val;
              }
            });
            return link;
          }).filter((link) => Object.keys(link).length > 1 && !!link.rel);
        }
        break;
      case "noscript":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const noscript = {};
            WhitelistAttributes.noscript.forEach((key2) => {
              if (meta[key2] || key2.startsWith("data-"))
                noscript[key2] = meta[key2];
            });
            return noscript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "script":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((script) => {
            const safeScript = {};
            WhitelistAttributes.script.forEach((s) => {
              if (script[s] || s.startsWith("data-")) {
                if (s === "textContent") {
                  try {
                    const jsonVal = typeof script[s] === "string" ? JSON.parse(script[s]) : script[s];
                    safeScript[s] = JSON.stringify(jsonVal, null, 0);
                  } catch (e) {
                  }
                } else {
                  safeScript[s] = script[s];
                }
              }
            });
            return safeScript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
    }
  });
  return filtered;
}
async function normaliseTag(tagName, input, e) {
  const tag = { tag: tagName, props: {} };
  if (input instanceof Promise)
    input = await input;
  if (tagName === "templateParams") {
    tag.props = input;
    return tag;
  }
  if (["title", "titleTemplate"].includes(tagName)) {
    if (input && typeof input === "object") {
      tag.textContent = input.textContent;
      if (input.tagPriority)
        tag.tagPriority = input.tagPriority;
    } else {
      tag.textContent = input;
    }
    return tag;
  }
  if (typeof input === "string") {
    if (!["script", "noscript", "style"].includes(tagName))
      return false;
    if (tagName === "script" && (/^(https?:)?\/\//.test(input) || input.startsWith("/")))
      tag.props.src = input;
    else
      tag.innerHTML = input;
    return tag;
  }
  if (input.body) {
    input.tagPosition = "bodyClose";
    delete input.body;
  }
  if (input.children) {
    input.innerHTML = input.children;
    delete input.children;
  }
  tag.props = await normaliseProps({ ...input });
  Object.keys(tag.props).filter((k) => TagConfigKeys.includes(k)).forEach((k) => {
    if (!["innerHTML", "textContent"].includes(k) || TagsWithInnerContent.includes(tag.tag)) {
      tag[k] = tag.props[k];
    }
    delete tag.props[k];
  });
  TagConfigKeys.forEach((k) => {
    if (!tag[k] && e[k]) {
      tag[k] = e[k];
    }
  });
  ["innerHTML", "textContent"].forEach((k) => {
    if (tag.tag === "script" && typeof tag[k] === "string" && ["application/ld+json", "application/json"].includes(tag.props.type)) {
      try {
        tag[k] = JSON.parse(tag[k]);
      } catch (e2) {
        tag[k] = "";
      }
    }
    if (typeof tag[k] === "object")
      tag[k] = JSON.stringify(tag[k]);
  });
  if (tag.props.class)
    tag.props.class = normaliseClassProp(tag.props.class);
  if (tag.props.content && Array.isArray(tag.props.content))
    return tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } }));
  return tag;
}
function normaliseClassProp(v) {
  if (typeof v === "object" && !Array.isArray(v)) {
    v = Object.keys(v).filter((k) => v[k]);
  }
  return (Array.isArray(v) ? v.join(" ") : v).split(" ").filter((c) => c.trim()).filter(Boolean).join(" ");
}
async function normaliseProps(props) {
  for (const k of Object.keys(props)) {
    const isDataKey = k.startsWith("data-");
    if (props[k] instanceof Promise) {
      props[k] = await props[k];
    }
    if (String(props[k]) === "true") {
      props[k] = isDataKey ? "true" : "";
    } else if (String(props[k]) === "false") {
      if (isDataKey) {
        props[k] = "false";
      } else {
        delete props[k];
      }
    }
  }
  return props;
}
var TagEntityBits = 10;
async function normaliseEntryTags(e) {
  const tagPromises = [];
  Object.entries(e.resolvedInput).filter(([k, v]) => typeof v !== "undefined" && ValidHeadTags.includes(k)).forEach(([k, value]) => {
    const v = asArray$1(value);
    tagPromises.push(...v.map((props) => normaliseTag(k, props, e)).flat());
  });
  return (await Promise.all(tagPromises)).flat().filter(Boolean).map((t, i) => {
    t._e = e._i;
    e.mode && (t._m = e.mode);
    t._p = (e._i << TagEntityBits) + i;
    return t;
  });
}
var TAG_WEIGHTS = {
  // tags
  base: -1,
  title: 1
};
var TAG_ALIASES = {
  // relative scores to their default values
  critical: -8,
  high: -1,
  low: 2
};
function tagWeight(tag) {
  let weight = 10;
  const priority = tag.tagPriority;
  if (typeof priority === "number")
    return priority;
  if (tag.tag === "meta") {
    if (tag.props.charset)
      weight = -2;
    if (tag.props["http-equiv"] === "content-security-policy")
      weight = 0;
  } else if (tag.tag === "link" && tag.props.rel === "preconnect") {
    weight = 2;
  } else if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  }
  if (typeof priority === "string" && priority in TAG_ALIASES) {
    return weight + TAG_ALIASES[priority];
  }
  return weight;
}
var SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
function processTemplateParams(s, p) {
  if (typeof s !== "string")
    return s;
  function sub(token) {
    if (["s", "pageTitle"].includes(token))
      return p.pageTitle;
    let val;
    if (token.includes(".")) {
      val = token.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, p);
    } else {
      val = p[token];
    }
    return typeof val !== "undefined" ? val || "" : false;
  }
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token) => {
    const re = sub(token.slice(1));
    if (typeof re === "string") {
      s = s.replace(new RegExp(`\\${token}(\\W|$)`, "g"), (_, args) => `${re}${args}`).trim();
    }
  });
  const sep = p.separator;
  if (s.includes(sep)) {
    if (s.endsWith(sep))
      s = s.slice(0, -sep.length).trim();
    if (s.startsWith(sep))
      s = s.slice(sep.length).trim();
    s = s.replace(new RegExp(`\\${sep}\\s*\\${sep}`, "g"), sep);
  }
  return s;
}

// node_modules/.pnpm/@unhead+dom@1.3.4/node_modules/@unhead/dom/dist/index.mjs
function elementToTag($el) {
  const tag = {
    tag: $el.tagName.toLowerCase(),
    props: $el.getAttributeNames().reduce((props, name) => ({ ...props, [name]: $el.getAttribute(name) }), {}),
    innerHTML: $el.innerHTML
  };
  tag._d = tagDedupeKey(tag);
  return tag;
}
async function renderDOMHead(head, options = {}) {
  var _a;
  const dom = options.document || head.resolvedOptions.document;
  if (!dom)
    return;
  const tags = (await head.resolveTags()).map((tag) => ({
    tag,
    id: HasElementTags.includes(tag.tag) ? hashTag(tag) : tag.tag,
    shouldRender: true
  }));
  const beforeRenderCtx = { shouldRender: true, tags };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  let state = head._dom;
  if (!state) {
    state = {
      elMap: { htmlAttrs: dom.documentElement, bodyAttrs: dom.body }
    };
    for (const key of ["body", "head"]) {
      const children = (_a = dom == null ? void 0 : dom[key]) == null ? void 0 : _a.children;
      for (const c of [...children].filter((c2) => HasElementTags.includes(c2.tagName.toLowerCase())))
        state.elMap[c.getAttribute("data-hid") || hashTag(elementToTag(c))] = c;
    }
  }
  state.pendingSideEffects = { ...state.sideEffects || {} };
  state.sideEffects = {};
  function track(id, scope, fn) {
    const k = `${id}:${scope}`;
    state.sideEffects[k] = fn;
    delete state.pendingSideEffects[k];
  }
  function trackCtx({ id, $el, tag }) {
    const isAttrTag = tag.tag.endsWith("Attrs");
    state.elMap[id] = $el;
    if (!isAttrTag) {
      ["textContent", "innerHTML"].forEach((k) => {
        tag[k] && tag[k] !== $el[k] && ($el[k] = tag[k]);
      });
      track(id, "el", () => {
        state.elMap[id].remove();
        delete state.elMap[id];
      });
    }
    Object.entries(tag.props).forEach(([k, value]) => {
      value = String(value);
      const ck = `attr:${k}`;
      if (k === "class") {
        for (const c of (value || "").split(" ").filter(Boolean)) {
          isAttrTag && track(id, `${ck}:${c}`, () => $el.classList.remove(c));
          !$el.classList.contains(c) && $el.classList.add(c);
        }
      } else {
        $el.getAttribute(k) !== value && $el.setAttribute(k, value);
        isAttrTag && track(id, ck, () => $el.removeAttribute(k));
      }
    });
  }
  const pending = [];
  const frag = {
    bodyClose: void 0,
    bodyOpen: void 0,
    head: void 0
  };
  for (const ctx of tags) {
    const { tag, shouldRender, id } = ctx;
    if (!shouldRender)
      continue;
    if (tag.tag === "title") {
      dom.title = tag.textContent;
      continue;
    }
    ctx.$el = ctx.$el || state.elMap[id];
    if (ctx.$el)
      trackCtx(ctx);
    else
      HasElementTags.includes(tag.tag) && pending.push(ctx);
  }
  for (const ctx of pending) {
    const pos = ctx.tag.tagPosition || "head";
    ctx.$el = dom.createElement(ctx.tag.tag);
    trackCtx(ctx);
    frag[pos] = frag[pos] || dom.createDocumentFragment();
    frag[pos].appendChild(ctx.$el);
  }
  for (const ctx of tags)
    await head.hooks.callHook("dom:renderTag", ctx, dom, track);
  frag.head && dom.head.appendChild(frag.head);
  frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
  frag.bodyClose && dom.body.appendChild(frag.bodyClose);
  Object.values(state.pendingSideEffects).forEach((fn) => fn());
  head._dom = state;
  await head.hooks.callHook("dom:rendered", { renders: tags });
}
async function debouncedRenderDOMHead(head, options = {}) {
  const fn = options.delayFn || ((fn2) => setTimeout(fn2, 10));
  return head._domUpdatePromise = head._domUpdatePromise || new Promise((resolve) => fn(async () => {
    await renderDOMHead(head, options);
    delete head._domUpdatePromise;
    resolve();
  }));
}
function DomPlugin(options) {
  return defineHeadPlugin((head) => {
    var _a, _b;
    const initialPayload = ((_b = (_a = head.resolvedOptions.document) == null ? void 0 : _a.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : _b.innerHTML) || false;
    initialPayload && head.push(JSON.parse(initialPayload));
    return {
      mode: "client",
      hooks: {
        "entries:updated": function(head2) {
          debouncedRenderDOMHead(head2, options);
        }
      }
    };
  });
}

// node_modules/.pnpm/unhead@1.3.4/node_modules/unhead/dist/index.mjs
var UsesMergeStrategy = ["templateParams", "htmlAttrs", "bodyAttrs"];
var DedupePlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": function({ tag }) {
      ["hid", "vmid", "key"].forEach((key) => {
        if (tag.props[key]) {
          tag.key = tag.props[key];
          delete tag.props[key];
        }
      });
      const generatedKey = tagDedupeKey(tag);
      const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
      if (dedupe)
        tag._d = dedupe;
    },
    "tags:resolve": function(ctx) {
      const deduping = {};
      ctx.tags.forEach((tag) => {
        const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || tag._p;
        const dupedTag = deduping[dedupeKey];
        if (dupedTag) {
          let strategy = tag == null ? void 0 : tag.tagDuplicateStrategy;
          if (!strategy && UsesMergeStrategy.includes(tag.tag))
            strategy = "merge";
          if (strategy === "merge") {
            const oldProps = dupedTag.props;
            ["class", "style"].forEach((key) => {
              if (tag.props[key] && oldProps[key]) {
                if (key === "style" && !oldProps[key].endsWith(";"))
                  oldProps[key] += ";";
                tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
              }
            });
            deduping[dedupeKey].props = {
              ...oldProps,
              ...tag.props
            };
            return;
          } else if (tag._e === dupedTag._e) {
            dupedTag._duped = dupedTag._duped || [];
            tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
            dupedTag._duped.push(tag);
            return;
          } else if (tagWeight(tag) > tagWeight(dupedTag)) {
            return;
          }
        }
        const propCount = Object.keys(tag.props).length + (tag.innerHTML ? 1 : 0) + (tag.textContent ? 1 : 0);
        if (HasElementTags.includes(tag.tag) && propCount === 0) {
          delete deduping[dedupeKey];
          return;
        }
        deduping[dedupeKey] = tag;
      });
      const newTags = [];
      Object.values(deduping).forEach((tag) => {
        const dupes = tag._duped;
        delete tag._duped;
        newTags.push(tag);
        if (dupes)
          newTags.push(...dupes);
      });
      ctx.tags = newTags;
    }
  }
});
var PayloadPlugin = defineHeadPlugin((head) => ({
  mode: "server",
  hooks: {
    "tags:resolve": function(ctx) {
      const csrPayload = {};
      ctx.tags.filter((tag) => ["titleTemplate", "templateParams"].includes(tag.tag) && tag._m === "server").forEach((tag) => {
        csrPayload[tag.tag] = tag.tag === "titleTemplate" ? tag.textContent : tag.props;
      });
      Object.keys(csrPayload).length && ctx.tags.push({
        tag: "script",
        innerHTML: JSON.stringify(csrPayload),
        props: { type: "text/javascript", id: "unhead:payload" }
      });
    }
  }
}));
var ValidEventTags = ["script", "link", "bodyAttrs"];
function stripEventHandlers(tag) {
  const props = {};
  const eventHandlers = {};
  Object.entries(tag.props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function")
      eventHandlers[key] = value;
    else
      props[key] = value;
  });
  return { props, eventHandlers };
}
var EventHandlersPlugin = defineHeadPlugin({
  hooks: {
    "ssr:render": function(ctx) {
      ctx.tags = ctx.tags.map((tag) => {
        if (!ValidEventTags.includes(tag.tag))
          return tag;
        if (!Object.entries(tag.props).find(([key, value]) => key.startsWith("on") && typeof value === "function"))
          return tag;
        tag.props = stripEventHandlers(tag).props;
        return tag;
      });
    },
    "tags:resolve": function(ctx) {
      ctx.tags = ctx.tags.map((tag) => {
        if (!ValidEventTags.includes(tag.tag))
          return tag;
        const { props, eventHandlers } = stripEventHandlers(tag);
        if (Object.keys(eventHandlers).length) {
          tag.props = props;
          tag._eventHandlers = eventHandlers;
        }
        return tag;
      });
    },
    "dom:renderTag": function(ctx, dom, track) {
      if (!ctx.tag._eventHandlers)
        return;
      const $eventListenerTarget = ctx.tag.tag === "bodyAttrs" ? dom.defaultView : ctx.$el;
      Object.entries(ctx.tag._eventHandlers).forEach(([k, value]) => {
        const sdeKey = `${ctx.tag._d || ctx.tag._p}:${k}`;
        const eventName = k.slice(2).toLowerCase();
        const eventDedupeKey = `data-h-${eventName}`;
        track(ctx.id, sdeKey, () => {
        });
        if (ctx.$el.hasAttribute(eventDedupeKey))
          return;
        const handler = value;
        ctx.$el.setAttribute(eventDedupeKey, "");
        $eventListenerTarget.addEventListener(eventName, handler);
        if (ctx.entry) {
          track(ctx.id, sdeKey, () => {
            $eventListenerTarget.removeEventListener(eventName, handler);
            ctx.$el.removeAttribute(eventDedupeKey);
          });
        }
      });
    }
  }
});
var DupeableTags = ["link", "style", "script", "noscript"];
var HashKeyedPlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.key && DupeableTags.includes(tag.tag)) {
        tag.props["data-hid"] = tag._h = hashCode(tag.key);
      }
    }
  }
});
var SortPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const tagPositionForKey = (key) => {
        var _a;
        return (_a = ctx.tags.find((tag) => tag._d === key)) == null ? void 0 : _a._p;
      };
      for (const { prefix, offset } of SortModifiers) {
        for (const tag of ctx.tags.filter((tag2) => typeof tag2.tagPriority === "string" && tag2.tagPriority.startsWith(prefix))) {
          const position = tagPositionForKey(
            tag.tagPriority.replace(prefix, "")
          );
          if (typeof position !== "undefined")
            tag._p = position + offset;
        }
      }
      ctx.tags.sort((a, b) => a._p - b._p).sort((a, b) => tagWeight(a) - tagWeight(b));
    }
  }
});
var TemplateParamsPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      var _a;
      const { tags } = ctx;
      const title = (_a = tags.find((tag) => tag.tag === "title")) == null ? void 0 : _a.textContent;
      const idx = tags.findIndex((tag) => tag.tag === "templateParams");
      const params = idx !== -1 ? tags[idx].props : {};
      params.separator = params.separator || "|";
      params.pageTitle = processTemplateParams(params.pageTitle || title || "", params);
      for (const tag of tags) {
        if (["titleTemplate", "title"].includes(tag.tag) && typeof tag.textContent === "string") {
          tag.textContent = processTemplateParams(tag.textContent, params);
        } else if (tag.tag === "meta" && typeof tag.props.content === "string") {
          tag.props.content = processTemplateParams(tag.props.content, params);
        } else if (tag.tag === "link" && typeof tag.props.href === "string") {
          tag.props.href = processTemplateParams(tag.props.href, params);
        } else if (tag.tag === "script" && ["application/json", "application/ld+json"].includes(tag.props.type) && typeof tag.innerHTML === "string") {
          try {
            tag.innerHTML = JSON.stringify(JSON.parse(tag.innerHTML), (key, val) => {
              if (typeof val === "string")
                return processTemplateParams(val, params);
              return val;
            });
          } catch {
          }
        }
      }
      ctx.tags = tags.filter((tag) => tag.tag !== "templateParams");
    }
  }
});
var TitleTemplatePlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let titleTemplateIdx = tags.findIndex((i) => i.tag === "titleTemplate");
      const titleIdx = tags.findIndex((i) => i.tag === "title");
      if (titleIdx !== -1 && titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent,
          tags[titleIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleIdx].textContent = newTitle || tags[titleIdx].textContent;
        } else {
          delete tags[titleIdx];
        }
      } else if (titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleTemplateIdx].textContent = newTitle;
          tags[titleTemplateIdx].tag = "title";
          titleTemplateIdx = -1;
        }
      }
      if (titleTemplateIdx !== -1) {
        delete tags[titleTemplateIdx];
      }
      ctx.tags = tags.filter(Boolean);
    }
  }
});
var activeHead;
function createHead(options = {}) {
  const head = createHeadCore(options);
  head.use(DomPlugin());
  return activeHead = head;
}
function createServerHead(options = {}) {
  return activeHead = createHeadCore(options);
}
function filterMode(mode, ssr) {
  return !mode || mode === "server" && ssr || mode === "client" && !ssr;
}
function createHeadCore(options = {}) {
  const hooks = createHooks();
  hooks.addHooks(options.hooks || {});
  options.document = options.document || (IsBrowser ? document : void 0);
  const ssr = !options.document;
  options.plugins = [
    DedupePlugin,
    PayloadPlugin,
    EventHandlersPlugin,
    HashKeyedPlugin,
    SortPlugin,
    TemplateParamsPlugin,
    TitleTemplatePlugin,
    ...(options == null ? void 0 : options.plugins) || []
  ];
  const updated = () => hooks.callHook("entries:updated", head);
  let entryCount = 0;
  let entries = [];
  const head = {
    resolvedOptions: options,
    hooks,
    headEntries() {
      return entries;
    },
    use(p) {
      const plugin = typeof p === "function" ? p(head) : p;
      filterMode(plugin.mode, ssr) && hooks.addHooks(plugin.hooks || {});
    },
    push(input, entryOptions) {
      const entry = {
        _i: entryCount++,
        input,
        ...entryOptions
      };
      if (filterMode(entry.mode, ssr)) {
        entries.push(entry);
        updated();
      }
      return {
        dispose() {
          entries = entries.filter((e) => e._i !== entry._i);
          hooks.callHook("entries:updated", head);
          updated();
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          entries = entries.map((e) => {
            if (e._i === entry._i) {
              e.input = entry.input = input2;
            }
            return e;
          });
          updated();
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        const resolved = entry.resolvedInput || entry.input;
        entry.resolvedInput = await (entry.transform ? entry.transform(resolved) : resolved);
        if (entry.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry)) {
            const tagCtx = { tag, entry, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:beforeResolve", resolveCtx);
      await hooks.callHook("tags:resolve", resolveCtx);
      return resolveCtx.tags;
    },
    ssr
  };
  options.plugins.forEach((p) => head.use(p));
  head.hooks.callHook("init", head);
  return head;
}
function HashHydrationPlugin() {
  let prevHash = false;
  let dirty = false;
  let head;
  return defineHeadPlugin({
    hooks: {
      "init": function(_head) {
        var _a, _b;
        head = _head;
        if (!head.ssr)
          prevHash = ((_b = (_a = head.resolvedOptions.document) == null ? void 0 : _a.head.querySelector('meta[name="unhead:ssr"]')) == null ? void 0 : _b.getAttribute("content")) || false;
        if (!prevHash)
          dirty = true;
      },
      "tags:resolve": function({ tags }) {
        const nonServerTags = tags.filter((tag) => tag._m !== "server");
        const hash = !nonServerTags.length ? false : hashCode(
          nonServerTags.map((tag) => hashTag(tag)).join("")
        );
        if (prevHash !== hash && prevHash !== false)
          dirty = true;
        else
          prevHash = hash;
      },
      "dom:beforeRender": function(ctx) {
        ctx.shouldRender = dirty;
        dirty = false;
      },
      "ssr:render": function({ tags }) {
        prevHash && tags.push({ tag: "meta", props: { name: "unhead:ssr", content: String(prevHash) } });
      }
    }
  });
}
var importRe = /@import/;
function CapoPlugin(options) {
  return defineHeadPlugin({
    hooks: {
      "tags:beforeResolve": function({ tags }) {
        var _a;
        for (const tag of tags) {
          if (tag.tagPriority || tag.tagPosition && tag.tagPosition !== "head")
            continue;
          const isTruthy = (val) => val === "";
          const isScript = tag.tag === "script";
          const isLink = tag.tag === "link";
          if (isScript && isTruthy(tag.props.async)) {
            tag.tagPriority = 3;
          } else if (tag.tag === "style" && tag.innerHTML && importRe.test(tag.innerHTML)) {
            tag.tagPriority = 4;
          } else if (isScript && tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && tag.props.type !== "module" && !((_a = tag.props.type) == null ? void 0 : _a.endsWith("json"))) {
            tag.tagPriority = 5;
          } else if (isLink && tag.props.rel === "stylesheet" || tag.tag === "style") {
            tag.tagPriority = 6;
          } else if (isLink && ["preload", "modulepreload"].includes(tag.props.rel)) {
            tag.tagPriority = 7;
          } else if (isScript && isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async)) {
            tag.tagPriority = 8;
          } else if (isLink && ["prefetch", "dns-prefetch", "prerender"].includes(tag.props.rel)) {
            tag.tagPriority = 9;
          }
        }
        (options == null ? void 0 : options.track) && tags.push({
          tag: "htmlAttrs",
          props: {
            "data-capo": ""
          }
        });
      }
    }
  });
}
function getActiveHead() {
  return activeHead;
}

// node_modules/.pnpm/@unhead+vue@1.3.4_vue@3.3.4/node_modules/@unhead/vue/dist/shared/vue.e6972f28.mjs
var Vue3 = version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
var VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
var headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead2(options = {}) {
  const head = createServerHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
function createHead2(options = {}) {
  options.domDelayFn = options.domDelayFn || ((fn) => nextTick(() => fn()));
  const head = createHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function useHead(input, options = {}) {
  const head = injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

// node_modules/.pnpm/@unhead+vue@1.3.4_vue@3.3.4/node_modules/@unhead/vue/dist/index.mjs
var VueHeadMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance)
      return;
    const options = instance.type;
    if (!options || !("head" in options))
      return;
    const source = typeof options.head === "function" ? () => options.head.call(instance.proxy) : options.head;
    useHead(source);
  }
};
var Vue2ProvideUnheadPlugin = function(_Vue, head) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      const origProvide = options.provide;
      options.provide = function() {
        let origProvideResult;
        if (typeof origProvide === "function")
          origProvideResult = origProvide.call(this);
        else
          origProvideResult = origProvide || {};
        return {
          ...origProvideResult,
          [headSymbol]: head
        };
      };
    }
  });
};
var coreComposableNames = [
  "injectHead"
];
var unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...composableNames]
};
function useHeadSafe(input, options = {}) {
  return useHead(input, { ...options, transform: whitelistSafeInput });
}
function useSeoMeta(input, options) {
  const headInput = ref({});
  watchEffect(() => {
    const resolvedMeta = resolveUnrefHeadInput(input);
    const { title, titleTemplate, ...meta } = resolvedMeta;
    headInput.value = {
      title,
      titleTemplate,
      meta: unpackMeta(meta)
    };
  });
  return useHead(headInput, options);
}
function useServerHead(input, options = {}) {
  const head = injectHead();
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
function useServerHeadSafe(input, options = {}) {
  return useHeadSafe(input, { ...options, mode: "server" });
}
function useServerSeoMeta(input, options) {
  return useSeoMeta(input, { ...options || {}, mode: "server" });
}

export {
  createHeadCore,
  HashHydrationPlugin,
  CapoPlugin,
  createServerHead2 as createServerHead,
  createHead2 as createHead,
  injectHead,
  useHead,
  VueHeadMixin,
  Vue2ProvideUnheadPlugin,
  unheadVueComposablesImports,
  useHeadSafe,
  useSeoMeta,
  useServerHead,
  useServerHeadSafe,
  useServerSeoMeta
};
//# sourceMappingURL=chunk-4DQ6UXGT.js.map
