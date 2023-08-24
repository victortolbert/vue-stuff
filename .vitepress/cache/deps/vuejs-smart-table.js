import {
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch
} from "./chunk-OX6HOUGK.js";
import "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/vue-demi@0.7.5_vue@3.3.4/node_modules/vue-demi/lib/index.esm.js
var isVue2 = false;
function install() {
}

// node_modules/.pnpm/vuejs-smart-table@1.0.0-beta.6_vue@3.3.4/node_modules/vuejs-smart-table/dist/vuejs-smart-table.es.js
var t;
var e;
var s = Object.defineProperty;
var a = Object.prototype.hasOwnProperty;
var r = Object.getOwnPropertySymbols;
var l = Object.prototype.propertyIsEnumerable;
var o = (t2, e2, a2) => e2 in t2 ? s(t2, e2, { enumerable: true, configurable: true, writable: true, value: a2 }) : t2[e2] = a2;
var i = (t2, e2) => {
  for (var s2 in e2 || (e2 = {}))
    a.call(e2, s2) && o(t2, s2, e2[s2]);
  if (r)
    for (var s2 of r(e2))
      l.call(e2, s2) && o(t2, s2, e2[s2]);
  return t2;
};
function m(t2, e2) {
  const s2 = (e2 = (e2 = e2.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split(".");
  let a2 = t2;
  for (const r2 of s2) {
    if (!(r2 in a2))
      return;
    a2 = a2[r2];
  }
  return a2;
}
function b(t2) {
  return !Array.isArray(t2) && !isNaN(parseFloat(t2)) && isFinite(t2);
}
function C(t2, e2) {
  if (function(t3) {
    return t3 && "function" == typeof t3.custom;
  }(e2) && !e2.custom(e2.value, t2))
    return false;
  if (!function(t3) {
    return Array.isArray(t3.keys);
  }(e2) || null === e2.value || void 0 === e2.value || 0 === e2.value.length)
    return true;
  for (const s2 of e2.keys) {
    const a2 = m(t2, s2);
    if (null != a2) {
      const t3 = Array.isArray(e2.value) ? e2.value : [e2.value];
      for (const s3 of t3)
        if (e2.exact) {
          if (a2.toString() === s3.toString())
            return true;
        } else if (a2.toString().toLowerCase().includes(s3.toString().toLowerCase()))
          return true;
    }
  }
  return false;
}
(e = t || (t = {}))[e.DESC = -1] = "DESC", e[e.NONE = 0] = "NONE", e[e.ASC = 1] = "ASC";
var R = class {
  constructor(e2) {
    this.state = reactive({ data: [], filters: {}, selectedRows: [], selectionMode: "single", selectOnClick: true, selectedClass: "", hideSortIcons: false, sortId: null, sortKey: null, customSort: null, sortOrder: t.NONE, currentPage: 0, pageSize: void 0, sortIconPosition: "after", sortHeaderClass: "" }), this.emit = e2, this.filteredData = computed(() => 0 === this.state.data.length ? [] : 0 === Object.keys(this.state.filters).length ? this.state.data : function(t2, e3) {
      const s3 = [];
      for (const a2 of t2) {
        let t3 = true;
        for (const s4 of Object.keys(e3))
          if (!C(a2, e3[s4])) {
            t3 = false;
            break;
          }
        t3 && s3.push(a2);
      }
      return s3;
    }(this.state.data, this.state.filters)), this.sortedData = computed(() => {
      return (this.state.sortKey || this.state.customSort) && 0 !== this.state.sortOrder ? (t2 = this.filteredData.value, e3 = this.state.sortKey, s3 = this.state.customSort, a2 = this.state.sortOrder, [...t2].sort((t3, r2) => {
        if ("function" == typeof s3)
          return s3(t3, r2, a2);
        let l2, o2;
        if (e3 ? "function" == typeof e3 ? (l2 = e3(t3, a2), o2 = e3(r2, a2)) : (l2 = m(t3, e3), o2 = m(r2, e3)) : (l2 = null, o2 = null), null == l2 && (l2 = ""), null == o2 && (o2 = ""), b(l2) && b(o2))
          return (l2 - o2) * a2;
        const i2 = l2.toString(), n = o2.toString();
        return i2.localeCompare(n) * a2;
      })) : this.filteredData.value;
      var t2, e3, s3, a2;
    }), this.totalItems = computed(() => this.filteredData.value.length), this.totalPages = computed(() => {
      return this.state.pageSize ? (t2 = this.totalItems.value, e3 = this.state.pageSize, t2 <= e3 ? 1 : Math.ceil(t2 / e3)) : 0;
      var t2, e3;
    }), watch(this.totalPages, (t2) => {
      this.emit("totalPagesChanged", t2);
    }, { immediate: true }), this.paginationEnabled = computed(() => this.state.pageSize);
    const s2 = computed(() => this.paginationEnabled.value && this.state.currentPage > this.totalPages.value);
    watch(s2, (t2) => {
      t2 && this.paginationEnabled.value && (this.state.currentPage = 1, this.emit("update:currentPage", this.state.currentPage));
    }), this.displayData = computed(() => this.paginationEnabled.value ? function(t2, e3, s3) {
      if (t2.length <= e3 || e3 <= 0 || s3 <= 0)
        return t2;
      const a2 = (s3 - 1) * e3, r2 = a2 + e3;
      return [...t2].slice(a2, r2);
    }(this.sortedData.value, this.state.pageSize, this.state.currentPage) : this.sortedData.value), watch(this.displayData, (t2) => {
      this.emit("totalItemsChanged", t2.length);
    }), this.tableState = computed(() => ({ rows: this.displayData.value, rowsPrePagination: this.sortedData.value, selectedRows: this.state.selectedRows })), watch(this.tableState, (t2) => {
      this.emit("stateChanged", t2);
    }, { immediate: true, deep: true });
  }
  revealItem(t2) {
    if (!this.paginationEnabled.value)
      return false;
    let e2;
    return e2 = "function" == typeof t2 ? this.sortedData.value.findIndex(t2) : this.sortedData.value.indexOf(t2), -1 !== e2 && (this.emit("update:currentPage", Math.ceil((e2 + 1) / this.state.pageSize)), true);
  }
  selectRow(t2) {
    "single" !== this.state.selectionMode ? this.state.selectedRows.includes(t2) || this.state.selectedRows.push(t2) : this.state.selectedRows = [t2];
  }
  selectRows(t2) {
    for (const e2 of t2)
      this.selectRow(e2);
  }
  deselectRow(t2) {
    const e2 = this.state.selectedRows.indexOf(t2);
    e2 > -1 && this.state.selectedRows.splice(e2, 1);
  }
  deselectRows(t2) {
    for (const e2 of t2)
      this.deselectRow(e2);
  }
  selectAll() {
    "single" !== this.state.selectionMode && (this.state.selectedRows = [...this.state.data]);
  }
  deselectAll() {
    this.state.selectedRows = [];
  }
  setSort({ sortKey: t2, customSort: e2, sortOrder: s2, sortId: a2 }) {
    this.state.sortKey = t2, this.state.customSort = e2, this.state.sortOrder = s2, this.state.sortId = a2;
  }
  syncProp(t2, e2, s2 = false) {
    watch(e2, () => {
      this.state[t2] = e2.value;
    }, { immediate: true, deep: s2 });
  }
};
var O = Symbol("store-key");
var k = defineComponent({ name: "VTable", props: { data: { type: Array, required: true }, filters: { type: Object, required: false, default: () => ({}) }, currentPage: { type: Number, required: false, default: void 0 }, pageSize: { type: Number, required: false, default: void 0 }, selectionMode: { type: String, required: false, default: "single", validator: (t2) => ["single", "multiple"].includes(t2) }, selectedClass: { required: false, type: String, default: "vt-selected" }, selectOnClick: { required: false, type: Boolean, default: true }, hideSortIcons: { required: false, type: Boolean, default: false }, sortIconPosition: { required: false, type: String, default: "after" }, sortHeaderClass: { type: String, required: false, default: "" } }, emits: { stateChanged: (t2) => true, totalPagesChanged: (t2) => true, totalItemsChanged: (t2) => true }, setup(t2, e2) {
  const s2 = new R(e2.emit);
  provide(O, s2), s2.syncProp("data", toRef(t2, "data")), s2.syncProp("filters", toRef(t2, "filters"), true), s2.syncProp("currentPage", toRef(t2, "currentPage")), s2.syncProp("pageSize", toRef(t2, "pageSize")), s2.syncProp("selectionMode", toRef(t2, "selectionMode")), s2.syncProp("selectedClass", toRef(t2, "selectedClass")), s2.syncProp("selectOnClick", toRef(t2, "selectOnClick")), s2.syncProp("hideSortIcons", toRef(t2, "hideSortIcons")), s2.syncProp("sortIconPosition", toRef(t2, "sortIconPosition")), s2.syncProp("sortHeaderClass", toRef(t2, "sortHeaderClass"));
  const a2 = computed(() => s2.state.selectedRows.length === s2.state.data.length);
  return { store: s2, tableState: s2.tableState, allRowsSelected: a2, toggleAllRows: () => a2.value ? s2.deselectAll() : s2.selectAll(), selectAll: () => s2.selectAll(), deselectAll: () => s2.deselectAll(), selectRows: (t3) => s2.selectRows(t3), selectRow: (t3) => s2.selectRow(t3), deselectRows: (t3) => s2.deselectRows(t3), deselectRow: (t3) => s2.deselectRow(t3), revealItem: (t3) => s2.revealItem(t3), slots: e2.slots };
}, render() {
  return h("table", { class: "v-table" }, [h("thead", this.slots.head ? this.slots.head({ rows: this.tableState.rows, selectedRows: this.tableState.selectedRows, toggleAllRows: this.toggleAllRows, selectAll: this.selectAll, deselectAll: this.deselectAll, allRowsSelected: this.allRowsSelected }) : void 0), h("tbody", this.slots.body ? this.slots.body({ rows: this.tableState.rows, selectedRows: this.tableState.selectedRows, selectRow: this.selectRow, deselectRow: this.deselectRow }) : void 0)]);
} });
function L(t2) {
  var e2;
  const s2 = { width: 16, height: 16, xmlns: "http://www.w3.org/2000/svg", viewBox: `0 0 ${t2.vbWidth} ${t2.vbHeight}` }, a2 = { fill: "currentColor", d: t2.d, opacity: null != (e2 = t2.opacity) ? e2 : 1 };
  return h("svg", i(i({ attrs: s2 }, s2), { style: i({}, t2.disabled ? { color: "#9CA3AF" } : {}) }), [h("path", i({ attrs: a2 }, a2))]);
}
var I = defineComponent({ name: "VTh", props: { sortKey: { type: [String, Function], required: false, default: null }, customSort: { type: [Function, Object], required: false, default: null }, defaultSort: { type: String, required: false, validator: (t2) => ["asc", "desc", null].includes(t2), default: null } }, emits: ["defaultSort", "sortChanged"], setup(e2, { emit: s2, slots: a2 }) {
  const r2 = inject(O);
  if (!e2.sortKey && !e2.customSort)
    throw new Error("Must provide the Sort Key value or a Custom Sort function.");
  const l2 = "_" + Math.random().toString(36).substr(2, 9), o2 = ref(t.NONE);
  onMounted(() => {
    e2.defaultSort && (o2.value = "desc" === e2.defaultSort ? t.DESC : t.ASC, r2.setSort({ sortOrder: o2.value, sortKey: e2.sortKey, customSort: e2.customSort, sortId: l2 }), nextTick(() => {
      s2("defaultSort"), s2("sortChanged", { sortOrder: o2.value });
    }));
  });
  const n = computed(() => {
    if (!r2.state.hideSortIcons)
      return function(e3) {
        const s3 = { width: 16, height: 16, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, a3 = () => ({ fill: "currentColor", opacity: e3 === t.NONE || e3 === t.ASC ? 0.4 : 1, d: "M41.05 288.05h238c21.4 0 32.1 25.9 17 41l-119 119a23.9 23.9 0 0 1-33.8.1l-.1-.1-119.1-119c-15.05-15.05-4.4-41 17-41z" }), r3 = () => ({ fill: "currentColor", opacity: e3 === t.NONE || e3 === t.DESC ? 0.4 : 1, d: "M24.05 183.05l119.1-119A23.9 23.9 0 0 1 177 64a.94.94 0 0 1 .1.1l119 119c15.1 15.1 4.4 41-17 41h-238c-21.45-.05-32.1-25.95-17.05-41.05z" });
        return h("svg", i({ attrs: s3 }, s3), [h("g", [h("path", i({ attrs: a3() }, a3())), h("path", i({ attrs: r3() }, r3()))])]);
      }(o2.value);
  });
  watch(() => r2.state.sortId, () => {
    r2.state.sortId !== l2 && 0 !== o2.value && (o2.value = 0);
  });
  const d = () => {
    [t.DESC, t.NONE].includes(o2.value) ? o2.value = t.ASC : o2.value = t.DESC, r2.setSort({ sortOrder: o2.value, sortKey: e2.sortKey, customSort: e2.customSort, sortId: l2 }), s2("sortChanged", { sortOrder: o2.value });
  }, h2 = computed(() => {
    const t2 = [];
    return "before" !== r2.state.sortIconPosition || r2.state.hideSortIcons || t2.push(n.value), a2.default && t2.push(h("span", [a2.default({ sortOrder: o2.value })])), "after" !== r2.state.sortIconPosition || r2.state.hideSortIcons || t2.push(n.value), t2;
  });
  return () => h("th", i({ class: "v-th" }, isVue2 ? { on: { click: d } } : { onClick: d }), [h("div", { class: r2.state.sortHeaderClass }, h2.value)]);
} });
var A = defineComponent({ name: "VTr", props: { row: { type: Object, required: true } }, setup(t2, { slots: e2 }) {
  const s2 = inject(O), a2 = computed(() => s2.state.selectedRows.find((e3) => e3 === t2.row)), r2 = computed(() => a2.value ? s2.state.selectedClass : ""), l2 = computed(() => i({}, s2.state.selectOnClick ? { cursor: "pointer" } : {})), o2 = (e3) => {
    const r3 = e3.target;
    r3 && "td" === r3.tagName.toLowerCase() && (a2.value ? s2.deselectRow(t2.row) : s2.selectRow(t2.row));
  };
  return () => h("tr", i(i({ class: r2.value, style: l2.value }, s2.state.selectOnClick ? { onClick: o2 } : {}), { on: i({}, s2.state.selectOnClick ? { click: o2 } : {}) }), e2.default ? e2.default({ isSelected: a2.value, toggle: () => a2.value ? s2.deselectRow(t2.row) : s2.selectRow(t2.row) }) : []);
} });
var N = defineComponent({ name: "VTPagination", props: { currentPage: { type: Number, required: true }, totalPages: { type: Number, required: true }, hideSinglePage: { required: false, type: Boolean, default: true }, maxPageLinks: { required: false, type: Number, default: NaN }, boundaryLinks: { required: false, type: Boolean, default: false }, directionLinks: { required: false, type: Boolean, default: true } }, setup(t2, { slots: e2, emit: s2 }) {
  const a2 = computed(() => isNaN(t2.maxPageLinks) || t2.maxPageLinks <= 0 ? (() => {
    const e3 = [];
    for (let s3 = 1; s3 <= t2.totalPages; s3++)
      e3.push({ title: s3.toString(), value: s3 });
    return e3;
  })() : (() => {
    const e3 = [], s3 = Math.ceil(t2.totalPages / t2.maxPageLinks), a3 = Math.ceil((t2.currentPage || 1) / t2.maxPageLinks);
    let r3 = (a3 - 1) * t2.maxPageLinks + 1;
    const l3 = Math.min(r3 + t2.maxPageLinks - 1, t2.totalPages), o3 = l3 - r3 + 1, i2 = t2.maxPageLinks - o3;
    a3 === s3 && a3 > 1 && i2 > 0 && (r3 -= i2), a3 > 1 && e3.push({ title: "...", value: r3 - 1 });
    for (let n2 = r3; n2 <= l3 && !(n2 > t2.totalPages); n2++)
      e3.push({ title: n2.toString(), value: n2 });
    return a3 < s3 && e3.push({ title: "...", value: l3 + 1 }), e3;
  })()), r2 = (e3) => {
    e3 < 1 || e3 > t2.totalPages || e3 === t2.currentPage || s2("update:currentPage", e3);
  }, l2 = () => {
    t2.currentPage ? t2.currentPage < t2.totalPages && s2("update:currentPage", t2.currentPage + 1) : s2("update:currentPage", 1);
  }, o2 = () => {
    t2.currentPage ? t2.currentPage > 1 && s2("update:currentPage", t2.currentPage - 1) : s2("update:currentPage", 1);
  }, n = () => {
    s2("update:currentPage", 1);
  }, u = () => {
    s2("update:currentPage", t2.totalPages);
  }, d = (t3, e3, s3, a3 = false) => h("li", { class: ["page-item", { disabled: s3, active: a3 }] }, [h("a", i(i({ class: "page-link", style: i({}, s3 ? { cursor: "not-allowed" } : {}), attrs: { href: "javascript:void(0)" }, href: "javascript:void(0)" }, s3 ? {} : { onClick: e3 }), { on: i({}, s3 ? {} : { click: e3 }) }), [t3])]);
  return () => {
    var s3, i2, c, h2, g, f, v, P;
    if (t2.hideSinglePage && 1 === t2.totalPages)
      return h("");
    const y = [];
    if (t2.boundaryLinks) {
      const a3 = L({ vbWidth: 512, vbHeight: 512, d: "M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.7c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.3-9.4-9.3-24.6 0-34zm192 34l194.3 194.3c9.4 9.4 24.6 9.4 33.9 0l22.7-22.7c9.4-9.4 9.4-24.5 0-33.9L323.5 256l154-154.7c9.3-9.4 9.3-24.5 0-33.9l-22.7-22.7c-9.4-9.4-24.6-9.4-33.9 0L226.5 239c-9.3 9.4-9.3 24.6 0 34z" }), r3 = 1 === t2.currentPage, l3 = null != (i2 = null == (s3 = e2.firstPage) ? void 0 : s3.call(e2, { disabled: r3 })) ? i2 : a3;
      y.push(d(l3, n, r3));
    }
    if (t2.directionLinks) {
      const s4 = L({ vbWidth: 320, vbHeight: 512, d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" }), a3 = 1 === t2.currentPage, r3 = null != (h2 = null == (c = e2.previous) ? void 0 : c.call(e2, { disabled: a3 })) ? h2 : s4;
      y.push(d(r3, o2, a3));
    }
    for (const e3 of a2.value)
      y.push(d(e3.title, () => r2(e3.value), false, e3.value === t2.currentPage));
    if (t2.directionLinks) {
      const s4 = L({ vbWidth: 320, vbHeight: 512, d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }), a3 = t2.currentPage === t2.totalPages, r3 = null != (f = null == (g = e2.next) ? void 0 : g.call(e2, { disabled: a3 })) ? f : s4;
      y.push(d(r3, l2, a3));
    }
    if (t2.boundaryLinks) {
      const s4 = L({ vbWidth: 512, vbHeight: 512, d: "M477.5 273L283.1 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9l154-154.7-154-154.7c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0L477.5 239c9.3 9.4 9.3 24.6 0 34zm-192-34L91.1 44.7c-9.4-9.4-24.6-9.4-33.9 0L34.5 67.4c-9.4 9.4-9.4 24.5 0 33.9l154 154.7-154 154.7c-9.3 9.4-9.3 24.5 0 33.9l22.7 22.7c9.4 9.4 24.6 9.4 33.9 0L285.5 273c9.3-9.4 9.3-24.6 0-34z" }), a3 = t2.currentPage === t2.totalPages, r3 = null != (P = null == (v = e2.lastPage) ? void 0 : v.call(e2, { disabled: a3 })) ? P : s4;
      y.push(d(r3, u, a3));
    }
    return h("nav", { class: "vt-pagination" }, [h("ul", { class: "pagination" }, [y])]);
  };
} });
install();
var E = { install(t2, e2 = {}) {
  ["hideSortIcons", "sortIconPosition", "sortHeaderClass"].forEach((t3) => {
    e2.hasOwnProperty(t3) && (k.props[t3].default = e2[t3]);
  }), t2.component("VTable", k), t2.component("VTh", I), t2.component("VTr", A), t2.component("VTPagination", N);
} };
var vuejs_smart_table_es_default = E;
export {
  vuejs_smart_table_es_default as default
};
//# sourceMappingURL=vuejs-smart-table.js.map
