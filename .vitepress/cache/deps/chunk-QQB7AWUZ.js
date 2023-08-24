// node_modules/.pnpm/@formkit+utils@0.19.0-ea7e008/node_modules/@formkit/utils/dist/index.mjs
var explicitKeys = [
  "__key",
  "__init",
  "__shim",
  "__original",
  "__index",
  "__prevKey"
];
function token() {
  return Math.random().toString(36).substring(2, 15);
}
function dedupe(arr1, arr2) {
  const original = arr1 instanceof Set ? arr1 : new Set(arr1);
  if (arr2)
    arr2.forEach((item) => original.add(item));
  return [...original];
}
function has(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
function eq(valA, valB, deep = true, explicit = ["__key"]) {
  if (valA === valB)
    return true;
  if (typeof valB === "object" && typeof valA === "object") {
    if (valA instanceof Map)
      return false;
    if (valA instanceof Set)
      return false;
    if (valA instanceof Date && valB instanceof Date)
      return valA.getTime() === valB.getTime();
    if (valA instanceof RegExp && valB instanceof RegExp)
      return eqRegExp(valA, valB);
    if (valA === null || valB === null)
      return false;
    if (Object.keys(valA).length !== Object.keys(valB).length)
      return false;
    for (const k of explicit) {
      if ((k in valA || k in valB) && valA[k] !== valB[k])
        return false;
    }
    for (const key in valA) {
      if (!(key in valB))
        return false;
      if (valA[key] !== valB[key] && !deep)
        return false;
      if (deep && !eq(valA[key], valB[key], deep, explicit))
        return false;
    }
    return true;
  }
  return false;
}
function eqRegExp(x, y) {
  return x.source === y.source && x.flags.split("").sort().join("") === y.flags.split("").sort().join("");
}
function empty(value) {
  const type = typeof value;
  if (type === "number")
    return false;
  if (value === void 0)
    return true;
  if (type === "string") {
    return value === "";
  }
  if (type === "object") {
    if (value === null)
      return true;
    for (const _i in value)
      return false;
    if (value instanceof RegExp)
      return false;
    if (value instanceof Date)
      return false;
    return true;
  }
  return false;
}
function escapeExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function regexForFormat(format) {
  const escaped = `^${escapeExp(format)}$`;
  const formats = {
    MM: "(0[1-9]|1[012])",
    M: "([1-9]|1[012])",
    DD: "([012][0-9]|3[01])",
    D: "([012]?[0-9]|3[01])",
    YYYY: "\\d{4}",
    YY: "\\d{2}"
  };
  const tokens = Object.keys(formats);
  return new RegExp(tokens.reduce((regex, format2) => {
    return regex.replace(format2, formats[format2]);
  }, escaped));
}
function isRecord(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isObject(o) {
  return isRecord(o) || Array.isArray(o);
}
function isPojo(o) {
  if (isRecord(o) === false)
    return false;
  if (o.__FKNode__ || o.__POJO__ === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isRecord(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function extend(original, additional, extendArrays = false, ignoreUndefined = false) {
  if (additional === null)
    return null;
  const merged = {};
  if (typeof additional === "string")
    return additional;
  for (const key in original) {
    if (has(additional, key) && (additional[key] !== void 0 || !ignoreUndefined)) {
      if (extendArrays && Array.isArray(original[key]) && Array.isArray(additional[key])) {
        merged[key] = original[key].concat(additional[key]);
        continue;
      }
      if (additional[key] === void 0) {
        continue;
      }
      if (isPojo(original[key]) && isPojo(additional[key])) {
        merged[key] = extend(original[key], additional[key], extendArrays, ignoreUndefined);
      } else {
        merged[key] = additional[key];
      }
    } else {
      merged[key] = original[key];
    }
  }
  for (const key in additional) {
    if (!has(merged, key) && additional[key] !== void 0) {
      merged[key] = additional[key];
    }
  }
  return merged;
}
function isQuotedString(str) {
  if (str[0] !== '"' && str[0] !== "'")
    return false;
  if (str[0] !== str[str.length - 1])
    return false;
  const quoteType = str[0];
  for (let p = 1; p < str.length; p++) {
    if (str[p] === quoteType && (p === 1 || str[p - 1] !== "\\") && p !== str.length - 1) {
      return false;
    }
  }
  return true;
}
function rmEscapes(str) {
  if (!str.length)
    return "";
  let clean = "";
  let lastChar = "";
  for (let p = 0; p < str.length; p++) {
    const char = str.charAt(p);
    if (char !== "\\" || lastChar === "\\") {
      clean += char;
    }
    lastChar = char;
  }
  return clean;
}
function nodeProps(...sets) {
  return sets.reduce((valid, props) => {
    const { value, name, modelValue, config, plugins, ...validProps } = props;
    return Object.assign(valid, validProps);
  }, {});
}
function parseArgs(str) {
  const args = [];
  let arg = "";
  let depth = 0;
  let quote = "";
  let lastChar = "";
  for (let p = 0; p < str.length; p++) {
    const char = str.charAt(p);
    if (char === quote && lastChar !== "\\") {
      quote = "";
    } else if ((char === "'" || char === '"') && !quote && lastChar !== "\\") {
      quote = char;
    } else if (char === "(" && !quote) {
      depth++;
    } else if (char === ")" && !quote) {
      depth--;
    }
    if (char === "," && !quote && depth === 0) {
      args.push(arg);
      arg = "";
    } else if (char !== " " || quote) {
      arg += char;
    }
    lastChar = char;
  }
  if (arg) {
    args.push(arg);
  }
  return args;
}
function except(obj, toRemove) {
  const clean = {};
  const exps = toRemove.filter((n) => n instanceof RegExp);
  const keysToRemove = new Set(toRemove);
  for (const key in obj) {
    if (!keysToRemove.has(key) && !exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  }
  return clean;
}
function only(obj, include) {
  const clean = {};
  const exps = include.filter((n) => n instanceof RegExp);
  include.forEach((key) => {
    if (!(key instanceof RegExp)) {
      clean[key] = obj[key];
    }
  });
  Object.keys(obj).forEach((key) => {
    if (exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  });
  return clean;
}
function camel(str) {
  return str.replace(/-([a-z0-9])/gi, (_s, g) => g.toUpperCase());
}
function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, (_s, trail, cap) => trail + "-" + cap.toLowerCase()).replace(" ", "-").toLowerCase();
}
function shallowClone(obj, explicit = explicitKeys) {
  if (obj !== null && typeof obj === "object") {
    let returnObject;
    if (Array.isArray(obj))
      returnObject = [...obj];
    else if (isPojo(obj))
      returnObject = { ...obj };
    if (returnObject) {
      applyExplicit(obj, returnObject, explicit);
      return returnObject;
    }
  }
  return obj;
}
function clone(obj, explicit = explicitKeys) {
  if (obj === null || obj instanceof RegExp || obj instanceof Date || obj instanceof Map || obj instanceof Set || typeof File === "function" && obj instanceof File)
    return obj;
  let returnObject;
  if (Array.isArray(obj)) {
    returnObject = obj.map((value) => {
      if (typeof value === "object")
        return clone(value, explicit);
      return value;
    });
  } else {
    returnObject = Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = typeof obj[key] === "object" ? clone(obj[key], explicit) : obj[key];
      return newObj;
    }, {});
  }
  for (const key of explicit) {
    if (key in obj) {
      Object.defineProperty(returnObject, key, {
        enumerable: false,
        value: obj[key]
      });
    }
  }
  return returnObject;
}
function cloneAny(obj) {
  return typeof obj === "object" ? clone(obj) : obj;
}
function getAt(obj, addr) {
  if (!obj || typeof obj !== "object")
    return null;
  const segments = addr.split(".");
  let o = obj;
  for (const i in segments) {
    const segment = segments[i];
    if (has(o, segment)) {
      o = o[segment];
    }
    if (+i === segments.length - 1)
      return o;
    if (!o || typeof o !== "object")
      return null;
  }
  return null;
}
function undefine(value) {
  return value !== void 0 && value !== "false" && value !== false ? true : void 0;
}
function init(obj) {
  return !Object.isFrozen(obj) ? Object.defineProperty(obj, "__init", {
    enumerable: false,
    value: true
  }) : obj;
}
function slugify(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, "-");
}
function applyExplicit(original, obj, explicit) {
  for (const key of explicit) {
    if (key in original) {
      Object.defineProperty(obj, key, {
        enumerable: false,
        value: original[key]
      });
    }
  }
  return obj;
}
function oncePerTick(fn) {
  let called = false;
  return (...args) => {
    if (called)
      return;
    called = true;
    queueMicrotask(() => called = false);
    return fn(...args);
  };
}

// node_modules/.pnpm/@formkit+core@0.19.0-ea7e008/node_modules/@formkit/core/dist/index.mjs
function createDispatcher() {
  const middleware = [];
  let currentIndex = 0;
  const use2 = (dispatchable) => middleware.push(dispatchable);
  const dispatch = (payload) => {
    const current = middleware[currentIndex];
    if (typeof current === "function") {
      return current(payload, (explicitPayload) => {
        currentIndex++;
        return dispatch(explicitPayload === void 0 ? payload : explicitPayload);
      });
    }
    currentIndex = 0;
    return payload;
  };
  use2.dispatch = dispatch;
  use2.unshift = (dispatchable) => middleware.unshift(dispatchable);
  use2.remove = (dispatchable) => {
    const index = middleware.indexOf(dispatchable);
    if (index > -1)
      middleware.splice(index, 1);
  };
  return use2;
}
function createEmitter() {
  const listeners = /* @__PURE__ */ new Map();
  const receipts2 = /* @__PURE__ */ new Map();
  let buffer = void 0;
  const emitter = (node, event) => {
    if (buffer) {
      buffer.set(event.name, [node, event]);
      return;
    }
    if (listeners.has(event.name)) {
      listeners.get(event.name).forEach((wrapper) => {
        if (event.origin === node || wrapper.modifiers.includes("deep")) {
          wrapper.listener(event);
        }
      });
    }
    if (event.bubble) {
      node.bubble(event);
    }
  };
  emitter.flush = () => {
    listeners.clear();
    receipts2.clear();
    buffer === null || buffer === void 0 ? void 0 : buffer.clear();
  };
  emitter.on = (eventName, listener) => {
    const [event, ...modifiers] = eventName.split(".");
    const receipt = listener.receipt || token();
    const wrapper = {
      modifiers,
      event,
      listener,
      receipt
    };
    listeners.has(event) ? listeners.get(event).push(wrapper) : listeners.set(event, [wrapper]);
    receipts2.has(receipt) ? receipts2.get(receipt).push(event) : receipts2.set(receipt, [event]);
    return receipt;
  };
  emitter.off = (receipt) => {
    var _a;
    if (receipts2.has(receipt)) {
      (_a = receipts2.get(receipt)) === null || _a === void 0 ? void 0 : _a.forEach((event) => {
        const eventListeners = listeners.get(event);
        if (Array.isArray(eventListeners)) {
          listeners.set(event, eventListeners.filter((wrapper) => wrapper.receipt !== receipt));
        }
      });
      receipts2.delete(receipt);
    }
  };
  emitter.pause = (node) => {
    if (!buffer)
      buffer = /* @__PURE__ */ new Map();
    if (node) {
      node.walk((child) => child._e.pause());
    }
  };
  emitter.play = (node) => {
    if (!buffer)
      return;
    const events = buffer;
    buffer = void 0;
    events.forEach(([node2, event]) => emitter(node2, event));
    if (node) {
      node.walk((child) => child._e.play());
    }
  };
  return emitter;
}
function emit$1(node, context, name, payload, bubble2 = true, meta) {
  context._e(node, {
    payload,
    name,
    bubble: bubble2,
    origin: node,
    meta
  });
  return node;
}
function bubble(node, _context, event) {
  if (isNode(node.parent)) {
    node.parent._e(node.parent, event);
  }
  return node;
}
function on(_node, context, name, listener) {
  return context._e.on(name, listener);
}
function off(node, context, receipt) {
  context._e.off(receipt);
  return node;
}
var errorHandler = createDispatcher();
errorHandler((error2, next) => {
  if (!error2.message)
    error2.message = String(`E${error2.code}`);
  return next(error2);
});
var warningHandler = createDispatcher();
warningHandler((warning, next) => {
  if (!warning.message)
    warning.message = String(`W${warning.code}`);
  const result = next(warning);
  if (console && typeof console.warn === "function")
    console.warn(result.message);
  return result;
});
function warn(code, data = {}) {
  warningHandler.dispatch({ code, data });
}
function error(code, data = {}) {
  throw Error(errorHandler.dispatch({ code, data }).message);
}
function createMessage(conf, node) {
  const m = {
    blocking: false,
    key: token(),
    meta: {},
    type: "state",
    visible: true,
    ...conf
  };
  if (node && m.value && m.meta.localize !== false) {
    m.value = node.t(m);
    m.meta.locale = node.config.locale;
  }
  return m;
}
var storeTraps = {
  apply: applyMessages,
  set: setMessage,
  remove: removeMessage,
  filter: filterMessages,
  reduce: reduceMessages,
  release: releaseBuffer,
  touch: touchMessages
};
function createStore(_buffer = false) {
  const messages = {};
  let node;
  let buffer = _buffer;
  let _b = [];
  const _m = /* @__PURE__ */ new Map();
  let _r = void 0;
  const store = new Proxy(messages, {
    get(...args) {
      const [_target, property] = args;
      if (property === "buffer")
        return buffer;
      if (property === "_b")
        return _b;
      if (property === "_m")
        return _m;
      if (property === "_r")
        return _r;
      if (has(storeTraps, property)) {
        return storeTraps[property].bind(null, messages, store, node);
      }
      return Reflect.get(...args);
    },
    set(_t, prop, value) {
      if (prop === "_n") {
        node = value;
        if (_r === "__n")
          releaseMissed(node, store);
        return true;
      } else if (prop === "_b") {
        _b = value;
        return true;
      } else if (prop === "buffer") {
        buffer = value;
        return true;
      } else if (prop === "_r") {
        _r = value;
        return true;
      }
      error(101, node);
      return false;
    }
  });
  return store;
}
function setMessage(messageStore, store, node, message) {
  if (store.buffer) {
    store._b.push([[message]]);
    return store;
  }
  if (messageStore[message.key] !== message) {
    if (typeof message.value === "string" && message.meta.localize !== false) {
      const previous = message.value;
      message.value = node.t(message);
      if (message.value !== previous) {
        message.meta.locale = node.props.locale;
      }
    }
    const e = `message-${has(messageStore, message.key) ? "updated" : "added"}`;
    messageStore[message.key] = Object.freeze(node.hook.message.dispatch(message));
    node.emit(e, message);
  }
  return store;
}
function touchMessages(messageStore, store) {
  for (const key in messageStore) {
    const message = { ...messageStore[key] };
    store.set(message);
  }
}
function removeMessage(messageStore, store, node, key) {
  if (has(messageStore, key)) {
    const message = messageStore[key];
    delete messageStore[key];
    node.emit("message-removed", message);
  }
  if (store.buffer === true) {
    store._b = store._b.filter((buffered) => {
      buffered[0] = buffered[0].filter((m) => m.key !== key);
      return buffered[1] || buffered[0].length;
    });
  }
  return store;
}
function filterMessages(messageStore, store, node, callback, type) {
  for (const key in messageStore) {
    const message = messageStore[key];
    if ((!type || message.type === type) && !callback(message)) {
      removeMessage(messageStore, store, node, key);
    }
  }
}
function reduceMessages(messageStore, _store, _node, reducer, accumulator) {
  for (const key in messageStore) {
    const message = messageStore[key];
    accumulator = reducer(accumulator, message);
  }
  return accumulator;
}
function applyMessages(_messageStore, store, node, messages, clear) {
  if (Array.isArray(messages)) {
    if (store.buffer) {
      store._b.push([messages, clear]);
      return;
    }
    const applied = new Set(messages.map((message) => {
      store.set(message);
      return message.key;
    }));
    if (typeof clear === "string") {
      store.filter((message) => message.type !== clear || applied.has(message.key));
    } else if (typeof clear === "function") {
      store.filter((message) => !clear(message) || applied.has(message.key));
    }
  } else {
    for (const address in messages) {
      const child = node.at(address);
      if (child) {
        child.store.apply(messages[address], clear);
      } else {
        missed(node, store, address, messages[address], clear);
      }
    }
  }
}
function createMessages(node, ...errors) {
  const sourceKey = `${node.name}-set`;
  const make = (error2) => createMessage({
    key: slugify(error2),
    type: "error",
    value: error2,
    meta: { source: sourceKey, autoClear: true }
  });
  return errors.filter((m) => !!m).map((errorSet) => {
    if (typeof errorSet === "string")
      errorSet = [errorSet];
    if (Array.isArray(errorSet)) {
      return errorSet.map((error2) => make(error2));
    } else {
      const errors2 = {};
      for (const key in errorSet) {
        if (Array.isArray(errorSet[key])) {
          errors2[key] = errorSet[key].map((error2) => make(error2));
        } else {
          errors2[key] = [make(errorSet[key])];
        }
      }
      return errors2;
    }
  });
}
function missed(node, store, address, messages, clear) {
  var _a;
  const misses = store._m;
  if (!misses.has(address))
    misses.set(address, []);
  if (!store._r)
    store._r = releaseMissed(node, store);
  (_a = misses.get(address)) === null || _a === void 0 ? void 0 : _a.push([messages, clear]);
}
function releaseMissed(node, store) {
  return node.on("child.deep", ({ payload: child }) => {
    store._m.forEach((misses, address) => {
      if (node.at(address) === child) {
        misses.forEach(([messages, clear]) => {
          child.store.apply(messages, clear);
        });
        store._m.delete(address);
      }
    });
    if (store._m.size === 0 && store._r) {
      node.off(store._r);
      store._r = void 0;
    }
  });
}
function releaseBuffer(_messageStore, store) {
  store.buffer = false;
  store._b.forEach(([messages, clear]) => store.apply(messages, clear));
  store._b = [];
}
function createLedger() {
  const ledger = {};
  let n;
  return {
    count: (...args) => createCounter(n, ledger, ...args),
    init(node) {
      n = node;
      node.on("message-added.deep", add(ledger, 1));
      node.on("message-removed.deep", add(ledger, -1));
    },
    merge: (child) => merge(n, ledger, child),
    settled(counterName) {
      return has(ledger, counterName) ? ledger[counterName].promise : Promise.resolve();
    },
    unmerge: (child) => merge(n, ledger, child, true),
    value(counterName) {
      return has(ledger, counterName) ? ledger[counterName].count : 0;
    }
  };
}
function createCounter(node, ledger, counterName, condition, increment = 0) {
  condition = parseCondition(condition || counterName);
  if (!has(ledger, counterName)) {
    const counter = {
      condition,
      count: 0,
      name: counterName,
      node,
      promise: Promise.resolve(),
      resolve: () => {
      }
      // eslint-disable-line @typescript-eslint/no-empty-function
    };
    ledger[counterName] = counter;
    increment = node.store.reduce((sum, m) => sum + counter.condition(m) * 1, increment);
    node.each((child) => {
      child.ledger.count(counter.name, counter.condition);
      increment += child.ledger.value(counter.name);
    });
  }
  return count(ledger[counterName], increment).promise;
}
function parseCondition(condition) {
  if (typeof condition === "function") {
    return condition;
  }
  return (m) => m.type === condition;
}
function count(counter, increment) {
  const initial = counter.count;
  const post = counter.count + increment;
  counter.count = post;
  if (initial === 0 && post !== 0) {
    counter.node.emit(`unsettled:${counter.name}`, counter.count, false);
    counter.promise = new Promise((r) => counter.resolve = r);
  } else if (initial !== 0 && post === 0) {
    counter.node.emit(`settled:${counter.name}`, counter.count, false);
    counter.resolve();
  }
  counter.node.emit(`count:${counter.name}`, counter.count, false);
  return counter;
}
function add(ledger, delta) {
  return (e) => {
    for (const name in ledger) {
      const counter = ledger[name];
      if (counter.condition(e.payload)) {
        count(counter, delta);
      }
    }
  };
}
function merge(parent, ledger, child, remove = false) {
  for (const key in ledger) {
    const condition = ledger[key].condition;
    if (!remove)
      child.ledger.count(key, condition);
    const increment = child.ledger.value(key) * (remove ? -1 : 1);
    if (!parent)
      continue;
    do {
      parent.ledger.count(key, condition, increment);
      parent = parent.parent;
    } while (parent);
  }
}
var registry = /* @__PURE__ */ new Map();
var reflected = /* @__PURE__ */ new Map();
var emit = createEmitter();
var receipts = [];
function register(node) {
  if (node.props.id) {
    registry.set(node.props.id, node);
    reflected.set(node, node.props.id);
    emit(node, {
      payload: node,
      name: node.props.id,
      bubble: false,
      origin: node
    });
  }
}
function deregister(node) {
  if (reflected.has(node)) {
    const id = reflected.get(node);
    reflected.delete(node);
    registry.delete(id);
    emit(node, {
      payload: null,
      name: id,
      bubble: false,
      origin: node
    });
  }
}
function getNode$1(id) {
  return registry.get(id);
}
function watchRegistry(id, callback) {
  receipts.push(emit.on(id, callback));
}
function configChange(node, prop, value) {
  let usingFallback = true;
  !(prop in node.config._t) ? node.emit(`config:${prop}`, value, false) : usingFallback = false;
  if (!(prop in node.props)) {
    node.emit("prop", { prop, value });
    node.emit(`prop:${prop}`, value);
  }
  return usingFallback;
}
function createConfig$1(options = {}) {
  const nodes = /* @__PURE__ */ new Set();
  const target = {
    ...options,
    ...{
      _add: (node) => nodes.add(node),
      _rm: (node) => nodes.delete(node)
    }
  };
  const rootConfig = new Proxy(target, {
    set(t, prop, value, r) {
      if (typeof prop === "string") {
        nodes.forEach((node) => configChange(node, prop, value));
      }
      return Reflect.set(t, prop, value, r);
    }
  });
  return rootConfig;
}
function submitForm(id) {
  const formElement = document.getElementById(id);
  if (formElement instanceof HTMLFormElement) {
    const event = new Event("submit", { cancelable: true, bubbles: true });
    formElement.dispatchEvent(event);
    return;
  }
  warn(151, id);
}
function clearState(node) {
  const clear = (n) => {
    for (const key in n.store) {
      const message = n.store[key];
      if (message.type === "error" || message.type === "ui" && key === "incomplete") {
        n.store.remove(key);
      } else if (message.type === "state") {
        n.store.set({ ...message, value: false });
      }
    }
  };
  clear(node);
  node.walk(clear);
}
function reset(id, resetTo) {
  const node = typeof id === "string" ? getNode$1(id) : id;
  if (node) {
    const initial = (n) => cloneAny(n.props.initial) || (n.type === "group" ? {} : n.type === "list" ? [] : void 0);
    node._e.pause(node);
    const resetValue2 = cloneAny(resetTo);
    if (resetTo && !empty(resetTo)) {
      node.props.initial = isObject(resetValue2) ? init(resetValue2) : resetValue2;
      node.props._init = node.props.initial;
    }
    node.input(initial(node), false);
    node.walk((child) => child.input(initial(child), false));
    node.input(empty(resetValue2) && resetValue2 ? resetValue2 : initial(node), false);
    const isDeepReset = node.type !== "input" && resetTo && !empty(resetTo) && isObject(resetTo);
    if (isDeepReset) {
      node.walk((child) => {
        child.props.initial = isObject(child.value) ? init(child.value) : child.value;
        child.props._init = node.props.initial;
      });
    }
    node._e.play(node);
    clearState(node);
    node.emit("reset", node);
    return node;
  }
  warn(152, id);
  return;
}
var defaultConfig = {
  delimiter: ".",
  delay: 0,
  locale: "en",
  rootClasses: (key) => ({ [`formkit-${kebab(key)}`]: true })
};
var useIndex = Symbol("index");
var valueRemoved = Symbol("removed");
var valueMoved = Symbol("moved");
var valueInserted = Symbol("inserted");
function isList(arg) {
  return arg.type === "list" && Array.isArray(arg._value);
}
function isNode(node) {
  return node && typeof node === "object" && node.__FKNode__ === true;
}
var invalidSetter = (node, _context, property) => {
  error(102, [node, property]);
};
var traps = {
  _c: trap(getContext, invalidSetter, false),
  add: trap(addChild),
  addProps: trap(addProps),
  address: trap(getAddress, invalidSetter, false),
  at: trap(getNode),
  bubble: trap(bubble),
  clearErrors: trap(clearErrors$1),
  calm: trap(calm),
  config: trap(false),
  define: trap(define),
  disturb: trap(disturb),
  destroy: trap(destroy),
  extend: trap(extend2),
  hydrate: trap(hydrate),
  index: trap(getIndex, setIndex, false),
  input: trap(input),
  each: trap(eachChild),
  emit: trap(emit$1),
  find: trap(find),
  on: trap(on),
  off: trap(off),
  parent: trap(false, setParent),
  plugins: trap(false),
  remove: trap(removeChild),
  root: trap(getRoot, invalidSetter, false),
  reset: trap(resetValue),
  resetConfig: trap(resetConfig),
  setErrors: trap(setErrors$1),
  submit: trap(submit),
  t: trap(text),
  use: trap(use),
  name: trap(getName, false, false),
  walk: trap(walkTree)
};
function createTraps() {
  return new Map(Object.entries(traps));
}
function trap(getter, setter, curryGetter = true) {
  return {
    get: getter ? (node, context) => curryGetter ? (...args) => getter(node, context, ...args) : getter(node, context) : false,
    set: setter !== void 0 ? setter : invalidSetter.bind(null)
  };
}
function createHooks() {
  const hooks = /* @__PURE__ */ new Map();
  return new Proxy(hooks, {
    get(_, property) {
      if (!hooks.has(property)) {
        hooks.set(property, createDispatcher());
      }
      return hooks.get(property);
    }
  });
}
var nameCount = 0;
var idCount = 0;
function resetCount() {
  nameCount = 0;
  idCount = 0;
}
function createName(options) {
  var _a, _b;
  if (((_a = options.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return useIndex;
  return options.name || `${((_b = options.props) === null || _b === void 0 ? void 0 : _b.type) || "input"}_${++nameCount}`;
}
function createValue(options) {
  if (options.type === "group") {
    return init(options.value && typeof options.value === "object" && !Array.isArray(options.value) ? options.value : {});
  } else if (options.type === "list") {
    return init(Array.isArray(options.value) ? options.value : []);
  }
  return options.value;
}
function input(node, context, value, async = true) {
  context._value = validateInput(node, node.hook.input.dispatch(value));
  node.emit("input", context._value);
  if (node.isCreated && node.type === "input" && eq(context._value, context.value)) {
    node.emit("commitRaw", context.value);
    return context.settled;
  }
  if (context.isSettled)
    node.disturb();
  if (async) {
    if (context._tmo)
      clearTimeout(context._tmo);
    context._tmo = setTimeout(commit, node.props.delay, node, context);
  } else {
    commit(node, context);
  }
  return context.settled;
}
function validateInput(node, value) {
  switch (node.type) {
    case "input":
      break;
    case "group":
      if (!value || typeof value !== "object")
        error(107, [node, value]);
      break;
    case "list":
      if (!Array.isArray(value))
        error(108, [node, value]);
      break;
  }
  return value;
}
function commit(node, context, calm2 = true, hydrate2 = true) {
  context._value = context.value = node.hook.commit.dispatch(context._value);
  if (node.type !== "input" && hydrate2)
    node.hydrate();
  node.emit("commitRaw", context.value);
  node.emit("commit", context.value);
  if (calm2)
    node.calm();
}
function partial(context, { name, value, from }) {
  if (Object.isFrozen(context._value))
    return;
  if (isList(context)) {
    const insert = value === valueRemoved ? [] : value === valueMoved && typeof from === "number" ? context._value.splice(from, 1) : [value];
    context._value.splice(name, value === valueMoved || from === valueInserted ? 0 : 1, ...insert);
    return;
  }
  if (value !== valueRemoved) {
    context._value[name] = value;
  } else {
    delete context._value[name];
  }
}
function hydrate(node, context) {
  const _value = context._value;
  if (node.type === "list" && node.sync)
    syncListNodes(node, context);
  context.children.forEach((child) => {
    if (typeof _value !== "object")
      return;
    if (child.name in _value) {
      const childValue = child.type !== "input" || _value[child.name] && typeof _value[child.name] === "object" ? init(_value[child.name]) : _value[child.name];
      if (!child.isSettled || !isObject(childValue) && eq(childValue, child._value))
        return;
      child.input(childValue, false);
    } else {
      if (node.type !== "list" || typeof child.name === "number") {
        partial(context, { name: child.name, value: child.value });
      }
      if (!_value.__init) {
        if (child.type === "group")
          child.input({}, false);
        else if (child.type === "list")
          child.input([], false);
        else
          child.input(void 0, false);
      }
    }
  });
  return node;
}
function syncListNodes(node, context) {
  const _value = node._value;
  if (!Array.isArray(_value))
    return;
  const newChildren = [];
  const unused = new Set(context.children);
  const placeholderValues = /* @__PURE__ */ new Map();
  _value.forEach((value, i) => {
    if (context.children[i] && context.children[i]._value === value) {
      newChildren.push(context.children[i]);
      unused.delete(context.children[i]);
    } else {
      newChildren.push(null);
      const indexes = placeholderValues.get(value) || [];
      indexes.push(i);
      placeholderValues.set(value, indexes);
    }
  });
  if (unused.size && placeholderValues.size) {
    unused.forEach((child) => {
      if (placeholderValues.has(child._value)) {
        const indexes = placeholderValues.get(child._value);
        const index = indexes.shift();
        newChildren[index] = child;
        unused.delete(child);
        if (!indexes.length)
          placeholderValues.delete(child._value);
      }
    });
  }
  const emptyIndexes = [];
  placeholderValues.forEach((indexes) => {
    emptyIndexes.push(...indexes);
  });
  while (unused.size && emptyIndexes.length) {
    const child = unused.values().next().value;
    const index = emptyIndexes.shift();
    if (index === void 0)
      break;
    newChildren[index] = child;
    unused.delete(child);
  }
  emptyIndexes.forEach((index, value) => {
    newChildren[index] = createPlaceholder({ value });
  });
  if (unused.size) {
    unused.forEach((child) => {
      if (!("__FKP" in child)) {
        const parent = child._c.parent;
        if (!parent || isPlaceholder(parent))
          return;
        parent.ledger.unmerge(child);
        child._c.parent = null;
        child.destroy();
      }
    });
  }
  context.children = newChildren;
}
function disturb(node, context) {
  var _a;
  if (context._d <= 0) {
    context.isSettled = false;
    node.emit("settled", false, false);
    context.settled = new Promise((resolve) => {
      context._resolve = resolve;
    });
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.disturb();
  }
  context._d++;
  return node;
}
function calm(node, context, value) {
  var _a;
  if (value !== void 0 && node.type !== "input") {
    partial(context, value);
    return commit(node, context, true, false);
  }
  if (context._d > 0)
    context._d--;
  if (context._d === 0) {
    context.isSettled = true;
    node.emit("settled", true, false);
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.calm({ name: node.name, value: context.value });
    if (context._resolve)
      context._resolve(context.value);
  }
}
function destroy(node, context) {
  node.emit("destroying", node);
  node.store.filter(() => false);
  if (node.parent) {
    node.parent.emit("childRemoved", node);
    node.parent.remove(node);
  }
  deregister(node);
  node.emit("destroyed", node);
  context._e.flush();
  context._value = context.value = void 0;
  for (const property in context.context) {
    delete context.context[property];
  }
  context.plugins.clear();
  context.context = null;
}
function define(node, context, definition) {
  context.type = definition.type;
  context.props.definition = clone(definition);
  context.value = context._value = createValue({
    type: node.type,
    value: context.value
  });
  if (definition.forceTypeProp) {
    if (node.props.type)
      node.props.originalType = node.props.type;
    context.props.type = definition.forceTypeProp;
  }
  if (definition.family) {
    context.props.family = definition.family;
  }
  if (definition.features) {
    definition.features.forEach((feature) => feature(node));
  }
  if (definition.props) {
    node.addProps(definition.props);
  }
  node.emit("defined", definition);
}
function addProps(node, context, props) {
  var _a;
  if (node.props.attrs) {
    const attrs = { ...node.props.attrs };
    node.props._emit = false;
    for (const attr in attrs) {
      const camelName = camel(attr);
      if (props.includes(camelName)) {
        node.props[camelName] = attrs[attr];
        delete attrs[attr];
      }
    }
    const initial = cloneAny(context._value);
    node.props.initial = node.type !== "input" ? init(initial) : initial;
    node.props._emit = true;
    node.props.attrs = attrs;
    if (node.props.definition) {
      node.props.definition.props = [
        ...((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.props) || [],
        ...props
      ];
    }
  }
  node.emit("added-props", props);
  return node;
}
function addChild(parent, parentContext, child, listIndex) {
  if (parent.type === "input")
    error(100, parent);
  if (child.parent && child.parent !== parent) {
    child.parent.remove(child);
  }
  if (!parentContext.children.includes(child)) {
    if (listIndex !== void 0 && parent.type === "list") {
      const existingNode = parentContext.children[listIndex];
      if (existingNode && "__FKP" in existingNode) {
        child._c.uid = existingNode.uid;
        parentContext.children.splice(listIndex, 1, child);
      } else {
        parentContext.children.splice(listIndex, 0, child);
      }
      if (Array.isArray(parent.value) && parent.value.length < parentContext.children.length) {
        parent.disturb().calm({
          name: listIndex,
          value: child.value,
          from: valueInserted
        });
      }
    } else {
      parentContext.children.push(child);
    }
    if (!child.isSettled)
      parent.disturb();
  }
  if (child.parent !== parent) {
    child.parent = parent;
    if (child.parent !== parent) {
      parent.remove(child);
      child.parent.add(child);
      return parent;
    }
  } else {
    child.use(parent.plugins);
  }
  commit(parent, parentContext, false);
  parent.ledger.merge(child);
  parent.emit("child", child);
  return parent;
}
function setParent(child, context, _property, parent) {
  if (isNode(parent)) {
    if (child.parent && child.parent !== parent) {
      child.parent.remove(child);
    }
    context.parent = parent;
    child.resetConfig();
    !parent.children.includes(child) ? parent.add(child) : child.use(parent.plugins);
    return true;
  }
  if (parent === null) {
    context.parent = null;
    return true;
  }
  return false;
}
function removeChild(node, context, child) {
  const childIndex = context.children.indexOf(child);
  if (childIndex !== -1) {
    if (child.isSettled)
      node.disturb();
    context.children.splice(childIndex, 1);
    let preserve = undefine(child.props.preserve);
    let parent = child.parent;
    while (preserve === void 0 && parent) {
      preserve = undefine(parent.props.preserve);
      parent = parent.parent;
    }
    if (!preserve) {
      node.calm({
        name: node.type === "list" ? childIndex : child.name,
        value: valueRemoved
      });
    } else {
      node.calm();
    }
    child.parent = null;
    child.config._rmn = child;
  }
  node.ledger.unmerge(child);
  return node;
}
function eachChild(_node, context, callback) {
  context.children.forEach((child) => !("__FKP" in child) && callback(child));
}
function walkTree(_node, context, callback, stopIfFalse = false, skipSubtreeOnFalse = false) {
  context.children.some((child) => {
    if ("__FKP" in child)
      return false;
    const val = callback(child);
    if (stopIfFalse && val === false)
      return true;
    if (skipSubtreeOnFalse && val === false)
      return false;
    return child.walk(callback, stopIfFalse, skipSubtreeOnFalse);
  });
}
function resetConfig(node, context) {
  const parent = node.parent || void 0;
  context.config = createConfig(node.config._t, parent);
  node.walk((n) => n.resetConfig());
}
function use(node, context, plugin, run = true, library = true) {
  if (Array.isArray(plugin) || plugin instanceof Set) {
    plugin.forEach((p) => use(node, context, p));
    return node;
  }
  if (!context.plugins.has(plugin)) {
    if (library && typeof plugin.library === "function")
      plugin.library(node);
    if (run && plugin(node) !== false) {
      context.plugins.add(plugin);
      node.children.forEach((child) => child.use(plugin));
    }
  }
  return node;
}
function setIndex(node, _context, _property, setIndex2) {
  if (isNode(node.parent)) {
    const children = node.parent.children;
    const index = setIndex2 >= children.length ? children.length - 1 : setIndex2 < 0 ? 0 : setIndex2;
    const oldIndex = children.indexOf(node);
    if (oldIndex === -1)
      return false;
    children.splice(oldIndex, 1);
    children.splice(index, 0, node);
    node.parent.children = children;
    if (node.parent.type === "list")
      node.parent.disturb().calm({ name: index, value: valueMoved, from: oldIndex });
    return true;
  }
  return false;
}
function getIndex(node) {
  if (node.parent) {
    const index = [...node.parent.children].indexOf(node);
    return index === -1 ? node.parent.children.length : index;
  }
  return -1;
}
function getContext(_node, context) {
  return context;
}
function getName(node, context) {
  var _a;
  if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return node.index;
  return context.name !== useIndex ? context.name : node.index;
}
function getAddress(node, context) {
  return context.parent ? context.parent.address.concat([node.name]) : [node.name];
}
function getNode(node, _context, locator) {
  const address = typeof locator === "string" ? locator.split(node.config.delimiter) : locator;
  if (!address.length)
    return void 0;
  const first = address[0];
  let pointer = node.parent;
  if (!pointer) {
    if (String(address[0]) === String(node.name))
      address.shift();
    pointer = node;
  }
  if (first === "$parent")
    address.shift();
  while (pointer && address.length) {
    const name = address.shift();
    switch (name) {
      case "$root":
        pointer = node.root;
        break;
      case "$parent":
        pointer = pointer.parent;
        break;
      case "$self":
        pointer = node;
        break;
      default:
        pointer = pointer.children.find((c) => !("__FKP" in c) && String(c.name) === String(name)) || select(pointer, name);
    }
  }
  return pointer || void 0;
}
function select(node, selector) {
  const matches = String(selector).match(/^(find)\((.*)\)$/);
  if (matches) {
    const [, action, argStr] = matches;
    const args = argStr.split(",").map((arg) => arg.trim());
    switch (action) {
      case "find":
        return node.find(args[0], args[1]);
      default:
        return void 0;
    }
  }
  return void 0;
}
function find(node, _context, searchTerm, searcher) {
  return bfs(node, searchTerm, searcher);
}
function bfs(tree, searchValue, searchGoal = "name") {
  const search = typeof searchGoal === "string" ? (n) => n[searchGoal] == searchValue : searchGoal;
  const stack = [tree];
  while (stack.length) {
    const node = stack.shift();
    if ("__FKP" in node)
      continue;
    if (search(node, searchValue))
      return node;
    stack.push(...node.children);
  }
  return void 0;
}
function getRoot(n) {
  let node = n;
  while (node.parent) {
    node = node.parent;
  }
  return node;
}
function createConfig(target = {}, parent) {
  let node = void 0;
  return new Proxy(target, {
    get(...args) {
      const prop = args[1];
      if (prop === "_t")
        return target;
      const localValue = Reflect.get(...args);
      if (localValue !== void 0)
        return localValue;
      if (parent) {
        const parentVal = parent.config[prop];
        if (parentVal !== void 0)
          return parentVal;
      }
      if (target.rootConfig && typeof prop === "string") {
        const rootValue = target.rootConfig[prop];
        if (rootValue !== void 0)
          return rootValue;
      }
      if (prop === "delay" && (node === null || node === void 0 ? void 0 : node.type) === "input")
        return 20;
      return defaultConfig[prop];
    },
    set(...args) {
      const prop = args[1];
      const value = args[2];
      if (prop === "_n") {
        node = value;
        if (target.rootConfig)
          target.rootConfig._add(node);
        return true;
      }
      if (prop === "_rmn") {
        if (target.rootConfig)
          target.rootConfig._rm(node);
        node = void 0;
        return true;
      }
      if (!eq(target[prop], value, false)) {
        const didSet = Reflect.set(...args);
        if (node) {
          node.emit(`config:${prop}`, value, false);
          configChange(node, prop, value);
          node.walk((n) => configChange(n, prop, value), false, true);
        }
        return didSet;
      }
      return true;
    }
  });
}
function text(node, _context, key, type = "ui") {
  const fragment = typeof key === "string" ? { key, value: key, type } : key;
  const value = node.hook.text.dispatch(fragment);
  node.emit("text", value, false);
  return value.value;
}
function submit(node) {
  const name = node.name;
  do {
    if (node.props.isForm === true)
      break;
    if (!node.parent)
      error(106, name);
    node = node.parent;
  } while (node);
  if (node.props.id) {
    submitForm(node.props.id);
  }
}
function resetValue(node, _context, value) {
  return reset(node, value);
}
function setErrors$1(node, _context, localErrors, childErrors) {
  const sourceKey = `${node.name}-set`;
  const errors = node.hook.setErrors.dispatch({ localErrors, childErrors });
  createMessages(node, errors.localErrors, errors.childErrors).forEach((errors2) => {
    node.store.apply(errors2, (message) => message.meta.source === sourceKey);
  });
  return node;
}
function clearErrors$1(node, context, clearChildErrors = true, sourceKey) {
  setErrors$1(node, context, []);
  if (clearChildErrors) {
    sourceKey = sourceKey || `${node.name}-set`;
    node.walk((child) => {
      child.store.filter((message) => {
        return !(message.type === "error" && message.meta && message.meta.source === sourceKey);
      });
    });
  }
  return node;
}
function defaultProps(node) {
  if (!has(node.props, "id"))
    node.props.id = `input_${idCount++}`;
  return node;
}
function createProps(initial) {
  const props = {
    initial: typeof initial === "object" ? cloneAny(initial) : initial
  };
  let node;
  let isEmitting = true;
  return new Proxy(props, {
    get(...args) {
      const [_t, prop] = args;
      if (has(props, prop))
        return Reflect.get(...args);
      if (node && typeof prop === "string" && node.config[prop] !== void 0)
        return node.config[prop];
      return void 0;
    },
    set(target, property, originalValue, receiver) {
      if (property === "_n") {
        node = originalValue;
        return true;
      }
      if (property === "_emit") {
        isEmitting = originalValue;
        return true;
      }
      const { prop, value } = node.hook.prop.dispatch({
        prop: property,
        value: originalValue
      });
      if (!eq(props[prop], value, false) || typeof value === "object") {
        const didSet = Reflect.set(target, prop, value, receiver);
        if (isEmitting) {
          node.emit("prop", { prop, value });
          if (typeof prop === "string")
            node.emit(`prop:${prop}`, value);
        }
        return didSet;
      }
      return true;
    }
  });
}
function extend2(node, context, property, trap2) {
  context.traps.set(property, trap2);
  return node;
}
function findDefinition(node, plugins) {
  if (node.props.definition)
    return node.define(node.props.definition);
  for (const plugin of plugins) {
    if (node.props.definition)
      return;
    if (typeof plugin.library === "function") {
      plugin.library(node);
    }
  }
}
function createContext(options) {
  const value = createValue(options);
  const config = createConfig(options.config || {}, options.parent);
  return {
    _d: 0,
    _e: createEmitter(),
    uid: Symbol(),
    _resolve: false,
    _tmo: false,
    _value: value,
    children: dedupe(options.children || []),
    config,
    hook: createHooks(),
    isCreated: false,
    isSettled: true,
    ledger: createLedger(),
    name: createName(options),
    parent: options.parent || null,
    plugins: /* @__PURE__ */ new Set(),
    props: createProps(value),
    settled: Promise.resolve(value),
    store: createStore(true),
    sync: options.sync || false,
    traps: createTraps(),
    type: options.type || "input",
    value
  };
}
function nodeInit(node, options) {
  var _a;
  node.ledger.init(node.store._n = node.props._n = node.config._n = node);
  node.props._emit = false;
  if (options.props)
    Object.assign(node.props, options.props);
  node.props._emit = true;
  findDefinition(node, /* @__PURE__ */ new Set([
    ...options.plugins || [],
    ...node.parent ? node.parent.plugins : []
  ]));
  if (options.plugins) {
    for (const plugin of options.plugins) {
      use(node, node._c, plugin, true, false);
    }
  }
  defaultProps(node);
  node.each((child) => node.add(child));
  if (node.parent)
    node.parent.add(node, options.index);
  if (node.type === "input" && node.children.length)
    error(100, node);
  input(node, node._c, node._value, false);
  node.store.release();
  if ((_a = options.props) === null || _a === void 0 ? void 0 : _a.id)
    register(node);
  node.emit("created", node);
  node.isCreated = true;
  return node;
}
function createPlaceholder(options) {
  var _a, _b, _f, _g;
  return {
    __FKP: true,
    uid: Symbol(),
    name: (_a = options === null || options === void 0 ? void 0 : options.name) !== null && _a !== void 0 ? _a : `p_${nameCount++}`,
    value: (_b = options === null || options === void 0 ? void 0 : options.value) !== null && _b !== void 0 ? _b : null,
    _value: (_f = options === null || options === void 0 ? void 0 : options.value) !== null && _f !== void 0 ? _f : null,
    type: (_g = options === null || options === void 0 ? void 0 : options.type) !== null && _g !== void 0 ? _g : "input",
    use: () => {
    },
    input(value) {
      this._value = value;
      this.value = value;
      return Promise.resolve();
    },
    isSettled: true
  };
}
function isPlaceholder(node) {
  return "__FKP" in node;
}
function createNode(options) {
  const ops = options || {};
  const context = createContext(ops);
  const node = new Proxy(context, {
    get(...args) {
      const [, property] = args;
      if (property === "__FKNode__")
        return true;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.get)
        return trap2.get(node, context);
      return Reflect.get(...args);
    },
    set(...args) {
      const [, property, value] = args;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.set)
        return trap2.set(node, context, property, value);
      return Reflect.set(...args);
    }
  });
  return nodeInit(node, ops);
}
function isDOM(node) {
  return typeof node !== "string" && has(node, "$el");
}
function isComponent(node) {
  return typeof node !== "string" && has(node, "$cmp");
}
function isConditional(node) {
  if (!node || typeof node === "string")
    return false;
  return has(node, "if") && has(node, "then");
}
function isSugar(node) {
  return typeof node !== "string" && "$formkit" in node;
}
function sugar(node) {
  if (typeof node === "string") {
    return {
      $el: "text",
      children: node
    };
  }
  if (isSugar(node)) {
    const { $formkit: type, for: iterator, if: condition, children, bind, ...props } = node;
    return Object.assign({
      $cmp: "FormKit",
      props: { ...props, type }
    }, condition ? { if: condition } : {}, iterator ? { for: iterator } : {}, children ? { children } : {}, bind ? { bind } : {});
  }
  return node;
}
function compile(expr) {
  let provideTokens;
  const requirements = /* @__PURE__ */ new Set();
  const x = function expand(operand, tokens) {
    return typeof operand === "function" ? operand(tokens) : operand;
  };
  const operatorRegistry = [
    {
      "&&": (l, r, t) => x(l, t) && x(r, t),
      "||": (l, r, t) => x(l, t) || x(r, t)
    },
    {
      "===": (l, r, t) => !!(x(l, t) === x(r, t)),
      "!==": (l, r, t) => !!(x(l, t) !== x(r, t)),
      "==": (l, r, t) => !!(x(l, t) == x(r, t)),
      "!=": (l, r, t) => !!(x(l, t) != x(r, t)),
      ">=": (l, r, t) => !!(x(l, t) >= x(r, t)),
      "<=": (l, r, t) => !!(x(l, t) <= x(r, t)),
      ">": (l, r, t) => !!(x(l, t) > x(r, t)),
      "<": (l, r, t) => !!(x(l, t) < x(r, t))
    },
    {
      "+": (l, r, t) => x(l, t) + x(r, t),
      "-": (l, r, t) => x(l, t) - x(r, t)
    },
    {
      "*": (l, r, t) => x(l, t) * x(r, t),
      "/": (l, r, t) => x(l, t) / x(r, t),
      "%": (l, r, t) => x(l, t) % x(r, t)
    }
  ];
  const operatorSymbols = operatorRegistry.reduce((s, g) => {
    return s.concat(Object.keys(g));
  }, []);
  const operatorChars = new Set(operatorSymbols.map((key) => key.charAt(0)));
  function getOp(symbols, char, p, expression) {
    const candidates = symbols.filter((s) => s.startsWith(char));
    if (!candidates.length)
      return false;
    return candidates.find((symbol) => {
      if (expression.length >= p + symbol.length) {
        const nextChars = expression.substring(p, p + symbol.length);
        if (nextChars === symbol)
          return symbol;
      }
      return false;
    });
  }
  function getStep(p, expression, direction = 1) {
    let next = direction ? expression.substring(p + 1).trim() : expression.substring(0, p).trim();
    if (!next.length)
      return -1;
    if (!direction) {
      const reversed = next.split("").reverse();
      const start = reversed.findIndex((char2) => operatorChars.has(char2));
      next = reversed.slice(start).join("");
    }
    const char = next[0];
    return operatorRegistry.findIndex((operators) => {
      const symbols = Object.keys(operators);
      return !!getOp(symbols, char, 0, next);
    });
  }
  function getTail(pos, expression) {
    let tail = "";
    const length = expression.length;
    let depth = 0;
    for (let p = pos; p < length; p++) {
      const char = expression.charAt(p);
      if (char === "(") {
        depth++;
      } else if (char === ")") {
        depth--;
      } else if (depth === 0 && char === " ") {
        continue;
      }
      if (depth === 0 && getOp(operatorSymbols, char, p, expression)) {
        return [tail, p - 1];
      } else {
        tail += char;
      }
    }
    return [tail, expression.length - 1];
  }
  function parseLogicals(expression, step = 0) {
    const operators = operatorRegistry[step];
    const length = expression.length;
    const symbols = Object.keys(operators);
    let depth = 0;
    let quote = false;
    let op = null;
    let operand = "";
    let left = null;
    let operation;
    let lastChar = "";
    let char = "";
    let parenthetical = "";
    let parenQuote = "";
    let startP = 0;
    const addTo = (depth2, char2) => {
      depth2 ? parenthetical += char2 : operand += char2;
    };
    for (let p = 0; p < length; p++) {
      lastChar = char;
      char = expression.charAt(p);
      if ((char === "'" || char === '"') && lastChar !== "\\" && (depth === 0 && !quote || depth && !parenQuote)) {
        if (depth) {
          parenQuote = char;
        } else {
          quote = char;
        }
        addTo(depth, char);
        continue;
      } else if (quote && (char !== quote || lastChar === "\\") || parenQuote && (char !== parenQuote || lastChar === "\\")) {
        addTo(depth, char);
        continue;
      } else if (quote === char) {
        quote = false;
        addTo(depth, char);
        continue;
      } else if (parenQuote === char) {
        parenQuote = false;
        addTo(depth, char);
        continue;
      } else if (char === " ") {
        continue;
      } else if (char === "(") {
        if (depth === 0) {
          startP = p;
        } else {
          parenthetical += char;
        }
        depth++;
      } else if (char === ")") {
        depth--;
        if (depth === 0) {
          const fn = typeof operand === "string" && operand.startsWith("$") ? operand : void 0;
          const hasTail = fn && expression.charAt(p + 1) === ".";
          let tail = "";
          if (hasTail) {
            [tail, p] = getTail(p + 2, expression);
          }
          const lStep = op ? step : getStep(startP, expression, 0);
          const rStep = getStep(p, expression);
          if (lStep === -1 && rStep === -1) {
            operand = evaluate(parenthetical, -1, fn, tail);
            if (typeof operand === "string")
              operand = parenthetical;
          } else if (op && (lStep >= rStep || rStep === -1) && step === lStep) {
            left = op.bind(null, evaluate(parenthetical, -1, fn, tail));
            op = null;
            operand = "";
          } else if (rStep > lStep && step === rStep) {
            operand = evaluate(parenthetical, -1, fn, tail);
          } else {
            operand += `(${parenthetical})${hasTail ? `.${tail}` : ""}`;
          }
          parenthetical = "";
        } else {
          parenthetical += char;
        }
      } else if (depth === 0 && (operation = getOp(symbols, char, p, expression))) {
        if (p === 0) {
          error(103, [operation, expression]);
        }
        p += operation.length - 1;
        if (p === expression.length - 1) {
          error(104, [operation, expression]);
        }
        if (!op) {
          if (left) {
            op = operators[operation].bind(null, evaluate(left, step));
            left = null;
          } else {
            op = operators[operation].bind(null, evaluate(operand, step));
            operand = "";
          }
        } else if (operand) {
          left = op.bind(null, evaluate(operand, step));
          op = operators[operation].bind(null, left);
          operand = "";
        }
        continue;
      } else {
        addTo(depth, char);
      }
    }
    if (operand && op) {
      op = op.bind(null, evaluate(operand, step));
    }
    op = !op && left ? left : op;
    if (!op && operand) {
      op = (v, t) => {
        return typeof v === "function" ? v(t) : v;
      };
      op = op.bind(null, evaluate(operand, step));
    }
    if (!op && !operand) {
      error(105, expression);
    }
    return op;
  }
  function evaluate(operand, step, fnToken, tail) {
    if (fnToken) {
      const fn = evaluate(fnToken, operatorRegistry.length);
      let userFuncReturn;
      let tailCall = tail ? compile(`$${tail}`) : false;
      if (typeof fn === "function") {
        const args = parseArgs(String(operand)).map((arg) => evaluate(arg, -1));
        return (tokens) => {
          const userFunc = fn(tokens);
          if (typeof userFunc !== "function") {
            warn(150, fnToken);
            return userFunc;
          }
          userFuncReturn = userFunc(...args.map((arg) => typeof arg === "function" ? arg(tokens) : arg));
          if (tailCall) {
            tailCall = tailCall.provide((subTokens) => {
              const rootTokens = provideTokens(subTokens);
              const t = subTokens.reduce((tokenSet, token2) => {
                const isTail = token2 === tail || (tail === null || tail === void 0 ? void 0 : tail.startsWith(`${token2}(`));
                if (isTail) {
                  const value = getAt(userFuncReturn, token2);
                  tokenSet[token2] = () => value;
                } else {
                  tokenSet[token2] = rootTokens[token2];
                }
                return tokenSet;
              }, {});
              return t;
            });
          }
          return tailCall ? tailCall() : userFuncReturn;
        };
      }
    } else if (typeof operand === "string") {
      if (operand === "true")
        return true;
      if (operand === "false")
        return false;
      if (operand === "undefined")
        return void 0;
      if (isQuotedString(operand))
        return rmEscapes(operand.substring(1, operand.length - 1));
      if (!isNaN(+operand))
        return Number(operand);
      if (step < operatorRegistry.length - 1) {
        return parseLogicals(operand, step + 1);
      } else {
        if (operand.startsWith("$")) {
          const cleaned = operand.substring(1);
          requirements.add(cleaned);
          return function getToken(tokens) {
            return cleaned in tokens ? tokens[cleaned]() : void 0;
          };
        }
        return operand;
      }
    }
    return operand;
  }
  const compiled = parseLogicals(expr.startsWith("$:") ? expr.substring(2) : expr);
  const reqs = Array.from(requirements);
  function provide(callback) {
    provideTokens = callback;
    return Object.assign(
      // @ts-ignore - @rollup/plugin-typescript doesn't like this
      compiled.bind(null, callback(reqs)),
      { provide }
    );
  }
  return Object.assign(compiled, {
    provide
  });
}
function createClasses(propertyKey, node, sectionClassList) {
  if (!sectionClassList)
    return {};
  if (typeof sectionClassList === "string") {
    const classKeys = sectionClassList.split(" ");
    return classKeys.reduce((obj, key) => Object.assign(obj, { [key]: true }), {});
  } else if (typeof sectionClassList === "function") {
    return createClasses(propertyKey, node, sectionClassList(node, propertyKey));
  }
  return sectionClassList;
}
function generateClassList(node, property, ...args) {
  const combinedClassList = args.reduce((finalClassList, currentClassList) => {
    if (!currentClassList)
      return handleNegativeClasses(finalClassList);
    const { $reset, ...classList } = currentClassList;
    if ($reset) {
      return handleNegativeClasses(classList);
    }
    return handleNegativeClasses(Object.assign(finalClassList, classList));
  }, {});
  return Object.keys(node.hook.classes.dispatch({ property, classes: combinedClassList }).classes).filter((key) => combinedClassList[key]).join(" ") || null;
}
function handleNegativeClasses(classList) {
  const removalToken = "$remove:";
  let hasNegativeClassValue = false;
  const applicableClasses = Object.keys(classList).filter((className) => {
    if (classList[className] && className.startsWith(removalToken)) {
      hasNegativeClassValue = true;
    }
    return classList[className];
  });
  if (applicableClasses.length > 1 && hasNegativeClassValue) {
    const negativeClasses = applicableClasses.filter((className) => className.startsWith(removalToken));
    negativeClasses.map((negativeClass) => {
      const targetClass = negativeClass.substring(removalToken.length);
      classList[targetClass] = false;
      classList[negativeClass] = false;
    });
  }
  return classList;
}
function setErrors(id, localErrors, childErrors) {
  const node = getNode$1(id);
  if (node) {
    node.setErrors(localErrors, childErrors);
  } else {
    warn(651, id);
  }
}
function clearErrors(id, clearChildren = true) {
  const node = getNode$1(id);
  if (node) {
    node.clearErrors(clearChildren);
  } else {
    warn(652, id);
  }
}
var FORMKIT_VERSION = "0.18.0";

// node_modules/.pnpm/@formkit+themes@0.19.0-ea7e008_tailwindcss@3.3.3_unocss@0.55.1/node_modules/@formkit/themes/dist/index.mjs
function generateClasses(classes) {
  const classesBySectionKey = {};
  Object.keys(classes).forEach((type) => {
    Object.keys(classes[type]).forEach((sectionKey) => {
      if (!classesBySectionKey[sectionKey]) {
        classesBySectionKey[sectionKey] = {
          [type]: classes[type][sectionKey]
        };
      } else {
        classesBySectionKey[sectionKey][type] = classes[type][sectionKey];
      }
    });
  });
  Object.keys(classesBySectionKey).forEach((sectionKey) => {
    const classesObject = classesBySectionKey[sectionKey];
    classesBySectionKey[sectionKey] = function(node, sectionKey2) {
      return addClassesBySection(node, sectionKey2, classesObject);
    };
  });
  return classesBySectionKey;
}
function addClassesBySection(node, _sectionKey, classesByType) {
  const type = node.props.type;
  const family = node.props.family;
  let classList = "";
  if (classesByType.global) {
    classList += classesByType.global + " ";
  }
  if (classesByType[`family:${family}`]) {
    classList += classesByType[`family:${family}`] + " ";
  }
  if (classesByType[type]) {
    classList += classesByType[type];
  }
  const listParts = classList.split("$reset");
  if (listParts.length > 1) {
    return `$reset ${listParts[listParts.length - 1].trim()}`;
  }
  return listParts[0].trim();
}
var documentStyles = void 0;
var documentThemeLinkTag = null;
var themeDidLoad;
var themeHasLoaded = false;
var themeWasRequested = false;
var themeLoaded = new Promise((res) => {
  themeDidLoad = () => {
    themeHasLoaded = true;
    res();
  };
});
var isClient = typeof window !== "undefined" && typeof fetch !== "undefined";
documentStyles = isClient ? getComputedStyle(document.documentElement) : void 0;
var iconRegistry = {};
var iconRequests = {};
function createThemePlugin(theme, icons, iconLoaderUrl, iconLoader) {
  if (icons) {
    Object.assign(iconRegistry, icons);
  }
  if (isClient && !themeWasRequested && (documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme"))) {
    themeDidLoad();
    themeWasRequested = true;
  } else if (theme && !themeWasRequested && isClient) {
    loadTheme(theme);
  } else if (!themeWasRequested && isClient) {
    themeDidLoad();
  }
  const themePlugin = function themePlugin2(node) {
    var _a, _b;
    node.addProps(["iconLoader", "iconLoaderUrl"]);
    node.props.iconHandler = createIconHandler(((_a = node.props) === null || _a === void 0 ? void 0 : _a.iconLoader) ? node.props.iconLoader : iconLoader, ((_b = node.props) === null || _b === void 0 ? void 0 : _b.iconLoaderUrl) ? node.props.iconLoaderUrl : iconLoaderUrl);
    loadIconPropIcons(node, node.props.iconHandler);
    node.on("created", () => {
      var _a2;
      if ((_a2 = node === null || node === void 0 ? void 0 : node.context) === null || _a2 === void 0 ? void 0 : _a2.handlers) {
        node.context.handlers.iconClick = (sectionKey) => {
          const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}IconClick`;
          const handlerFunction = node.props[clickHandlerProp];
          if (handlerFunction && typeof handlerFunction === "function") {
            return (e) => {
              return handlerFunction(node, e);
            };
          }
          return void 0;
        };
      }
    });
  };
  themePlugin.iconHandler = createIconHandler(iconLoader, iconLoaderUrl);
  return themePlugin;
}
function loadTheme(theme) {
  if (!theme || !isClient || typeof getComputedStyle !== "function") {
    return;
  }
  themeWasRequested = true;
  documentThemeLinkTag = document.getElementById("formkit-theme");
  if (theme && // if we have a window object
  isClient && // we don't have an existing theme OR the theme being set up is different
  (!(documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme")) && !documentThemeLinkTag || (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) && (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) !== theme)) {
    const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
    const themeUrl = `https://cdn.jsdelivr.net/npm/@formkit/themes@${formkitVersion}/dist/${theme}/theme.css`;
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "formkit-theme";
    link.setAttribute("data-theme", theme);
    link.onload = () => {
      documentStyles = getComputedStyle(document.documentElement);
      themeDidLoad();
    };
    document.head.appendChild(link);
    link.href = themeUrl;
    if (documentThemeLinkTag) {
      documentThemeLinkTag.remove();
    }
  }
}
function createIconHandler(iconLoader, iconLoaderUrl) {
  return (iconName) => {
    if (typeof iconName !== "string")
      return;
    if (iconName.startsWith("<svg")) {
      return iconName;
    }
    const isDefault = iconName.startsWith("default:");
    iconName = isDefault ? iconName.split(":")[1] : iconName;
    const iconWasAlreadyLoaded = iconName in iconRegistry;
    let loadedIcon = void 0;
    if (iconWasAlreadyLoaded) {
      return iconRegistry[iconName];
    } else if (!iconRequests[iconName]) {
      loadedIcon = getIconFromStylesheet(iconName);
      loadedIcon = isClient && typeof loadedIcon === "undefined" ? Promise.resolve(loadedIcon) : loadedIcon;
      if (loadedIcon instanceof Promise) {
        iconRequests[iconName] = loadedIcon.then((iconValue) => {
          if (!iconValue && typeof iconName === "string" && !isDefault) {
            return loadedIcon = typeof iconLoader === "function" ? iconLoader(iconName) : getRemoteIcon(iconName, iconLoaderUrl);
          }
          return iconValue;
        }).then((finalIcon) => {
          if (typeof iconName === "string") {
            iconRegistry[isDefault ? `default:${iconName}` : iconName] = finalIcon;
          }
          return finalIcon;
        });
      } else if (typeof loadedIcon === "string") {
        iconRegistry[isDefault ? `default:${iconName}` : iconName] = loadedIcon;
        return loadedIcon;
      }
    }
    return iconRequests[iconName];
  };
}
function getIconFromStylesheet(iconName) {
  if (!isClient)
    return;
  if (themeHasLoaded) {
    return loadStylesheetIcon(iconName);
  } else {
    return themeLoaded.then(() => {
      return loadStylesheetIcon(iconName);
    });
  }
}
function loadStylesheetIcon(iconName) {
  const cssVarIcon = documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue(`--fk-icon-${iconName}`);
  if (cssVarIcon) {
    const icon = atob(cssVarIcon);
    if (icon.startsWith("<svg")) {
      iconRegistry[iconName] = icon;
      return icon;
    }
  }
  return void 0;
}
function getRemoteIcon(iconName, iconLoaderUrl) {
  const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
  const fetchUrl = typeof iconLoaderUrl === "function" ? iconLoaderUrl(iconName) : `https://cdn.jsdelivr.net/npm/@formkit/icons@${formkitVersion}/dist/icons/${iconName}.svg`;
  if (!isClient)
    return void 0;
  return fetch(`${fetchUrl}`).then(async (r) => {
    const icon = await r.text();
    if (icon.startsWith("<svg")) {
      return icon;
    }
    return void 0;
  }).catch((e) => {
    console.error(e);
    return void 0;
  });
}
function loadIconPropIcons(node, iconHandler) {
  const iconRegex = /^[a-zA-Z-]+(?:-icon|Icon)$/;
  const iconProps = Object.keys(node.props).filter((prop) => {
    return iconRegex.test(prop);
  });
  iconProps.forEach((sectionKey) => {
    return loadPropIcon(node, iconHandler, sectionKey);
  });
}
function loadPropIcon(node, iconHandler, sectionKey) {
  const iconName = node.props[sectionKey];
  const loadedIcon = iconHandler(iconName);
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Click`;
  node.addProps([rawIconProp, clickHandlerProp]);
  node.on(`prop:${sectionKey}`, reloadIcon);
  if (loadedIcon instanceof Promise) {
    return loadedIcon.then((svg) => {
      node.props[rawIconProp] = svg;
    });
  } else {
    node.props[rawIconProp] = loadedIcon;
  }
  return;
}
function reloadIcon(event) {
  var _a;
  const node = event.origin;
  const iconName = event.payload;
  const iconHandler = (_a = node === null || node === void 0 ? void 0 : node.props) === null || _a === void 0 ? void 0 : _a.iconHandler;
  const sectionKey = event.name.split(":")[1];
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  if (iconHandler && typeof iconHandler === "function") {
    const loadedIcon = iconHandler(iconName);
    if (loadedIcon instanceof Promise) {
      return loadedIcon.then((svg) => {
        node.props[rawIconProp] = svg;
      });
    } else {
      node.props[rawIconProp] = loadedIcon;
    }
  }
}

export {
  token,
  has,
  eq,
  empty,
  regexForFormat,
  isObject,
  isPojo,
  extend,
  nodeProps,
  except,
  only,
  camel,
  kebab,
  shallowClone,
  clone,
  cloneAny,
  undefine,
  slugify,
  oncePerTick,
  errorHandler,
  warningHandler,
  warn,
  error,
  createMessage,
  getNode$1,
  watchRegistry,
  createConfig$1,
  submitForm,
  reset,
  isNode,
  resetCount,
  createNode,
  isDOM,
  isComponent,
  isConditional,
  sugar,
  compile,
  createClasses,
  generateClassList,
  setErrors,
  clearErrors,
  generateClasses,
  iconRegistry,
  createThemePlugin,
  createIconHandler
};
//# sourceMappingURL=chunk-QQB7AWUZ.js.map
