// node_modules/.pnpm/vue-demi@0.14.5_vue@3.3.4/node_modules/vue-demi/lib/index.mjs
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

export {
  isVue2,
  set,
  del
};
//# sourceMappingURL=chunk-XETVCMSK.js.map
