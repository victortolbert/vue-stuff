import {
  camel,
  clearErrors,
  clone,
  cloneAny,
  compile,
  createClasses,
  createConfig$1,
  createIconHandler,
  createMessage,
  createNode,
  createThemePlugin,
  empty,
  eq,
  error,
  errorHandler,
  except,
  extend,
  generateClassList,
  getNode$1,
  has,
  isComponent,
  isConditional,
  isDOM,
  isNode,
  isObject,
  isPojo,
  kebab,
  nodeProps,
  oncePerTick,
  only,
  regexForFormat,
  reset,
  resetCount,
  setErrors,
  shallowClone,
  slugify,
  submitForm,
  sugar,
  token,
  undefine,
  warn,
  warningHandler,
  watchRegistry
} from "./chunk-QQB7AWUZ.js";
import {
  computed,
  createTextVNode,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  isReactive,
  isRef,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  resolveComponent,
  toRef,
  triggerRef,
  watch,
  watchEffect
} from "./chunk-OX6HOUGK.js";
import {
  __export
} from "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/@formkit+inputs@0.19.0-ea7e008/node_modules/@formkit/inputs/dist/index.mjs
function createLibraryPlugin(...libraries) {
  const library = libraries.reduce((merged, lib) => extend(merged, lib), {});
  const plugin2 = () => {
  };
  plugin2.library = function(node) {
    const type = camel(node.props.type);
    if (has(library, type)) {
      node.define(library[type]);
    }
  };
  return plugin2;
}
function normalizeOptions(options2) {
  let i = 1;
  if (Array.isArray(options2)) {
    return options2.map((option2) => {
      if (typeof option2 === "string" || typeof option2 === "number") {
        return {
          label: String(option2),
          value: String(option2)
        };
      }
      if (typeof option2 == "object") {
        if ("value" in option2 && typeof option2.value !== "string") {
          Object.assign(option2, {
            value: `__mask_${i++}`,
            __original: option2.value
          });
        }
      }
      return option2;
    });
  }
  return Object.keys(options2).map((value) => {
    return {
      label: options2[value],
      value
    };
  });
}
function optionValue(options2, value) {
  if (Array.isArray(options2)) {
    for (const option2 of options2) {
      if (value == option2.value) {
        return "__original" in option2 ? option2.__original : option2.value;
      }
    }
  }
  return value;
}
function shouldSelect(valueA, valueB) {
  if (valueA === null && valueB === void 0 || valueA === void 0 && valueB === null)
    return false;
  if (valueA == valueB)
    return true;
  if (isPojo(valueA) && isPojo(valueB))
    return eq(valueA, valueB);
  return false;
}
function options(node) {
  node.hook.prop((prop, next) => {
    if (prop.prop === "options") {
      if (typeof prop.value === "function") {
        node.props.optionsLoader = prop.value;
        prop.value = [];
      } else {
        prop.value = normalizeOptions(prop.value);
      }
    }
    return next(prop);
  });
}
function createSection(section, el2, fragment2 = false) {
  return (...children) => {
    const extendable = (extensions) => {
      const node = !el2 || typeof el2 === "string" ? { $el: el2 } : el2();
      if (isDOM(node) || isComponent(node)) {
        if (!node.meta) {
          node.meta = { section };
        }
        if (children.length && !node.children) {
          node.children = [
            ...children.map((child) => typeof child === "string" ? child : child(extensions))
          ];
        }
        if (isDOM(node)) {
          node.attrs = {
            class: `$classes.${section}`,
            ...node.attrs || {}
          };
        }
      }
      return {
        if: `$slots.${section}`,
        then: `$slots.${section}`,
        else: section in extensions ? extendSchema(node, extensions[section]) : node
      };
    };
    extendable._s = section;
    return fragment2 ? createRoot(extendable) : extendable;
  };
}
function createRoot(rootSection) {
  return (extensions) => {
    return [rootSection(extensions)];
  };
}
function isSchemaObject(schema) {
  return typeof schema === "object" && ("$el" in schema || "$cmp" in schema || "$formkit" in schema);
}
function extendSchema(schema, extension = {}) {
  if (typeof schema === "string") {
    return isSchemaObject(extension) || typeof extension === "string" ? extension : schema;
  } else if (Array.isArray(schema)) {
    return isSchemaObject(extension) ? extension : schema;
  }
  return extend(schema, extension);
}
var outer = createSection("outer", () => ({
  $el: "div",
  attrs: {
    key: "$id",
    "data-family": "$family || undefined",
    "data-type": "$type",
    "data-multiple": '$attrs.multiple || ($type != "select" && $options != undefined) || undefined',
    "data-disabled": '$: ($disabled !== "false" && $disabled) || undefined',
    "data-empty": "$state.empty || undefined",
    "data-complete": "$state.complete || undefined",
    "data-invalid": "$state.valid === false && $state.validationVisible || undefined",
    "data-errors": "$state.errors || undefined",
    "data-submitted": "$state.submitted || undefined",
    "data-prefix-icon": "$_rawPrefixIcon !== undefined || undefined",
    "data-suffix-icon": "$_rawSuffixIcon !== undefined || undefined",
    "data-prefix-icon-click": "$onPrefixIconClick !== undefined || undefined",
    "data-suffix-icon-click": "$onSuffixIconClick !== undefined || undefined"
  }
}));
var inner = createSection("inner", "div");
var wrapper = createSection("wrapper", "div");
var label = createSection("label", () => ({
  $el: "label",
  if: "$label",
  attrs: {
    for: "$id"
  }
}));
var messages = createSection("messages", () => ({
  $el: "ul",
  if: "$defaultMessagePlacement && $fns.length($messages)"
}));
var message = createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
var prefix = createSection("prefix", null);
var suffix = createSection("suffix", null);
var help = createSection("help", () => ({
  $el: "div",
  if: "$help",
  attrs: {
    id: '$: "help-" + $id'
  }
}));
var fieldset = createSection("fieldset", () => ({
  $el: "fieldset",
  attrs: {
    id: "$id",
    "aria-describedby": {
      if: "$help",
      then: '$: "help-" + $id',
      else: void 0
    }
  }
}));
var decorator = createSection("decorator", () => ({
  $el: "span",
  attrs: {
    "aria-hidden": "true"
  }
}));
var box = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    name: "$node.props.altName || $node.name",
    disabled: "$option.attrs.disabled || $disabled",
    onInput: "$handlers.toggleChecked",
    checked: "$fns.eq($_value, $onValue)",
    onBlur: "$handlers.blur",
    value: "$: true",
    id: "$id",
    "aria-describedby": {
      if: "$options.length",
      then: {
        if: "$option.help",
        then: '$: "help-" + $option.attrs.id',
        else: void 0
      },
      else: {
        if: "$help",
        then: '$: "help-" + $id',
        else: void 0
      }
    }
  }
}));
var legend = createSection("legend", () => ({
  $el: "legend",
  if: "$label"
}));
var boxOption = createSection("option", () => ({
  $el: "li",
  for: ["option", "$options"],
  attrs: {
    "data-disabled": "$option.attrs.disabled || $disabled"
  }
}));
var boxOptions = createSection("options", "ul");
var boxWrapper = createSection("wrapper", () => ({
  $el: "label",
  attrs: {
    "data-disabled": {
      if: "$options.length",
      then: void 0,
      else: "$disabled || undefined"
    },
    "data-checked": {
      if: "$options == undefined",
      then: "$fns.eq($_value, $onValue) || undefined",
      else: "$fns.isChecked($option.value) || undefined"
    }
  }
}));
var boxHelp = createSection("optionHelp", () => ({
  $el: "div",
  if: "$option.help",
  attrs: {
    id: '$: "help-" + $option.attrs.id'
  }
}));
var boxLabel = createSection("label", "span");
var buttonInput = createSection("input", () => ({
  $el: "button",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    id: "$id"
  }
}));
var buttonLabel = createSection("default", null);
var fileInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "file",
    disabled: "$disabled",
    name: "$node.name",
    onChange: "$handlers.files",
    onBlur: "$handlers.blur",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
var fileItem = createSection("fileItem", () => ({
  $el: "li",
  for: ["file", "$value"]
}));
var fileList = createSection("fileList", () => ({
  $el: "ul",
  if: "$value.length",
  attrs: {
    "data-has-multiple": {
      if: "$value.length > 1",
      then: "true"
    }
  }
}));
var fileName = createSection("fileName", () => ({
  $el: "span",
  attrs: {
    class: "$classes.fileName"
  }
}));
var fileRemove = createSection("fileRemove", () => ({
  $el: "button",
  attrs: {
    onClick: "$handlers.resetFiles"
  }
}));
var noFiles = createSection("noFiles", () => ({
  $el: "span",
  if: "$value.length == 0"
}));
var formInput = createSection("form", () => ({
  $el: "form",
  bind: "$attrs",
  attrs: {
    id: "$id",
    name: "$node.name",
    onSubmit: "$handlers.submit",
    "data-loading": "$state.loading || undefined"
  }
}));
var actions = createSection("actions", () => ({
  $el: "div",
  if: "$actions"
}));
var submitInput = createSection("submit", () => ({
  $cmp: "FormKit",
  bind: "$submitAttrs",
  props: {
    type: "submit",
    disabled: "$disabled",
    label: "$submitLabel"
  }
}));
var textInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
var fragment = createSection("wrapper", null, true);
var selectInput$1 = createSection("input", () => ({
  $el: "select",
  bind: "$attrs",
  attrs: {
    id: "$id",
    "data-placeholder": "$fns.showPlaceholder($_value, $placeholder)",
    disabled: "$disabled",
    class: "$classes.input",
    name: "$node.name",
    onChange: "$handlers.onChange",
    onInput: "$handlers.selectInput",
    onBlur: "$handlers.blur",
    "aria-describedby": "$describedBy"
  }
}));
var option = createSection("option", () => ({
  $el: "option",
  for: ["option", "$options"],
  bind: "$option.attrs",
  attrs: {
    class: "$classes.option",
    value: "$option.value",
    selected: "$fns.isSelected($option)"
  }
}));
var optionSlot = () => ({
  $el: null,
  if: "$options.length",
  for: ["option", "$options"],
  children: "$slots.option"
});
var textareaInput = createSection("input", () => ({
  $el: "textarea",
  bind: "$attrs",
  attrs: {
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  },
  children: "$initialValue"
}));
var icon = (sectionKey, el2) => {
  return createSection(`${sectionKey}Icon`, () => {
    const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Icon`;
    return {
      if: `$${sectionKey}Icon && $${rawIconProp}`,
      $el: `${el2 ? el2 : "span"}`,
      attrs: {
        class: `$classes.${sectionKey}Icon + " " + $classes.icon`,
        innerHTML: `$${rawIconProp}`,
        onClick: `$handlers.iconClick(${sectionKey})`,
        for: {
          if: `${el2 === "label"}`,
          then: "$id"
        }
      }
    };
  })();
};
function normalizeBoxes(node) {
  return function(prop, next) {
    if (prop.prop === "options" && Array.isArray(prop.value)) {
      prop.value = prop.value.map((option2) => {
        var _a;
        if (!((_a = option2.attrs) === null || _a === void 0 ? void 0 : _a.id)) {
          return extend(option2, {
            attrs: {
              id: `${node.name}-option-${slugify(String(option2.value))}`
            }
          });
        }
        return option2;
      });
      if (node.props.type === "checkbox" && !Array.isArray(node.value)) {
        if (node.isCreated) {
          node.input([], false);
        } else {
          node.on("created", () => {
            if (!Array.isArray(node.value)) {
              node.input([], false);
            }
          });
        }
      }
    }
    return next(prop);
  };
}
function toggleChecked$1(node, e) {
  const el2 = e.target;
  if (el2 instanceof HTMLInputElement) {
    const value = Array.isArray(node.props.options) ? optionValue(node.props.options, el2.value) : el2.value;
    if (Array.isArray(node.props.options) && node.props.options.length) {
      if (!Array.isArray(node._value)) {
        node.input([value]);
      } else if (!node._value.some((existingValue) => shouldSelect(value, existingValue))) {
        node.input([...node._value, value]);
      } else {
        node.input(node._value.filter((existingValue) => !shouldSelect(value, existingValue)));
      }
    } else {
      if (el2.checked) {
        node.input(node.props.onValue);
      } else {
        node.input(node.props.offValue);
      }
    }
  }
}
function isChecked$1(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  if (Array.isArray(node._value)) {
    return node._value.some((existingValue) => shouldSelect(optionValue(node.props.options, value), existingValue));
  }
  return false;
}
function checkboxes(node) {
  node.on("created", () => {
    var _a, _b;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked$1.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked$1.bind(null, node);
    }
    if (!has(node.props, "onValue"))
      node.props.onValue = true;
    if (!has(node.props, "offValue"))
      node.props.offValue = false;
  });
  node.hook.prop(normalizeBoxes(node));
}
function disables(node) {
  node.on("created", () => {
    if ("disabled" in node.props) {
      node.props.disabled = undefine(node.props.disabled);
      node.config.disabled = undefine(node.props.disabled);
    }
  });
  node.hook.prop(({ prop, value }, next) => {
    value = prop === "disabled" ? undefine(value) : value;
    return next({ prop, value });
  });
  node.on("prop:disabled", ({ payload: value }) => {
    node.config.disabled = undefine(value);
  });
}
function localize(key, value) {
  return (node) => {
    node.store.set(createMessage({
      key,
      type: "ui",
      value: value || key,
      meta: {
        localize: true,
        i18nArgs: [node]
      }
    }));
  };
}
var isBrowser = typeof window !== "undefined";
function removeHover(e) {
  if (e.target instanceof HTMLElement && e.target.hasAttribute("data-file-hover")) {
    e.target.removeAttribute("data-file-hover");
  }
}
function preventStrayDrop(type, e) {
  if (!(e.target instanceof HTMLInputElement)) {
    e.preventDefault();
  } else if (type === "dragover") {
    e.target.setAttribute("data-file-hover", "true");
  }
  if (type === "drop") {
    removeHover(e);
  }
}
function files(node) {
  localize("noFiles", "Select file")(node);
  localize("removeAll", "Remove all")(node);
  localize("remove")(node);
  if (isBrowser) {
    if (!window._FormKit_File_Drop) {
      window.addEventListener("dragover", preventStrayDrop.bind(null, "dragover"));
      window.addEventListener("drop", preventStrayDrop.bind(null, "drop"));
      window.addEventListener("dragleave", removeHover);
      window._FormKit_File_Drop = true;
    }
  }
  node.hook.input((value, next) => next(Array.isArray(value) ? value : []));
  node.on("reset", () => {
    if (node.props.id && isBrowser) {
      const el2 = document.getElementById(node.props.id);
      if (el2)
        el2.value = "";
    }
  });
  node.on("created", () => {
    if (!Array.isArray(node.value))
      node.input([], false);
    if (!node.context)
      return;
    node.context.handlers.resetFiles = (e) => {
      e.preventDefault();
      node.input([]);
      if (node.props.id && isBrowser) {
        const el2 = document.getElementById(node.props.id);
        if (el2)
          el2.value = "";
      }
    };
    node.context.handlers.files = (e) => {
      var _a, _b;
      const files2 = [];
      if (e.target instanceof HTMLInputElement && e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) {
          let file2;
          if (file2 = e.target.files.item(i)) {
            files2.push({ name: file2.name, file: file2 });
          }
        }
        node.input(files2);
      }
      if (node.context)
        node.context.files = files2;
      if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
        (_b = node.props.attrs) === null || _b === void 0 ? void 0 : _b.onChange(e);
      }
    };
  });
}
var loading = createMessage({
  key: "loading",
  value: true,
  visible: false
});
async function handleSubmit(node, submitEvent) {
  const submitNonce = Math.random();
  node.props._submitNonce = submitNonce;
  submitEvent.preventDefault();
  await node.settled;
  if (node.ledger.value("validating")) {
    node.store.set(loading);
    await node.ledger.settled("validating");
    node.store.remove("loading");
    if (node.props._submitNonce !== submitNonce)
      return;
  }
  const setSubmitted = (n) => n.store.set(createMessage({
    key: "submitted",
    value: true,
    visible: false
  }));
  node.walk(setSubmitted);
  setSubmitted(node);
  if (typeof node.props.onSubmitRaw === "function") {
    node.props.onSubmitRaw(submitEvent, node);
  }
  if (node.ledger.value("blocking")) {
    if (typeof node.props.onSubmitInvalid === "function") {
      node.props.onSubmitInvalid(node);
    }
    if (node.props.incompleteMessage !== false) {
      node.store.set(createMessage({
        blocking: false,
        key: `incomplete`,
        meta: {
          localize: node.props.incompleteMessage === void 0,
          i18nArgs: [{ node }],
          showAsMessage: true
        },
        type: "ui",
        value: node.props.incompleteMessage || "Form incomplete."
      }));
    }
  } else {
    if (typeof node.props.onSubmit === "function") {
      const retVal = node.props.onSubmit(node.hook.submit.dispatch(clone(node.value)), node);
      if (retVal instanceof Promise) {
        const autoDisable = node.props.disabled === void 0 && node.props.submitBehavior !== "live";
        if (autoDisable)
          node.props.disabled = true;
        node.store.set(loading);
        await retVal;
        if (autoDisable)
          node.props.disabled = false;
        node.store.remove("loading");
      }
    } else {
      if (submitEvent.target instanceof HTMLFormElement) {
        submitEvent.target.submit();
      }
    }
  }
}
function form$1(node) {
  node.props.isForm = true;
  node.ledger.count("validating", (m) => m.key === "validating");
  node.on("created", () => {
    var _a;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.submit = handleSubmit.bind(null, node);
    }
    if (!has(node.props, "actions")) {
      node.props.actions = true;
    }
  });
  node.on("settled:blocking", () => node.store.remove("incomplete"));
}
function ignore(node) {
  if (node.props.ignore === void 0) {
    node.props.ignore = true;
    node.parent = null;
  }
}
function initialValue(node) {
  node.on("created", () => {
    if (node.context) {
      node.context.initialValue = node.value || "";
    }
  });
}
function toggleChecked(node, event) {
  if (event.target instanceof HTMLInputElement) {
    node.input(optionValue(node.props.options, event.target.value));
  }
}
function isChecked(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  return shouldSelect(optionValue(node.props.options, value), node._value);
}
function radios(node) {
  node.on("created", () => {
    var _a, _b;
    if (!Array.isArray(node.props.options)) {
      warn(350, {
        node,
        inputType: "radio"
      });
    }
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked.bind(null, node);
    }
  });
  node.hook.prop(normalizeBoxes(node));
}
function isSelected(node, option2) {
  node.context && node.context.value;
  const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
  function hasNoNullOption() {
    return !node.props.options.some((option3) => ("__original" in option3 ? option3.__original : option3.value) === null);
  }
  return Array.isArray(node._value) ? node._value.some((optionA) => shouldSelect(optionA, optionValue2)) : (node._value === void 0 || node._value === null && hasNoNullOption()) && option2.attrs && option2.attrs["data-is-placeholder"] ? true : shouldSelect(optionValue2, node._value);
}
async function deferChange(node, e) {
  var _a;
  if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
    await new Promise((r) => setTimeout(r, 0));
    await node.settled;
    node.props.attrs.onChange(e);
  }
}
function selectInput(node, e) {
  const target = e.target;
  const value = target.hasAttribute("multiple") ? Array.from(target.selectedOptions).map((o) => optionValue(node.props.options, o.value)) : optionValue(node.props.options, target.value);
  node.input(value);
}
function applyPlaceholder(options2, placeholder) {
  if (!options2.some((option2) => option2.attrs && option2.attrs["data-is-placeholder"])) {
    return [
      {
        label: placeholder,
        value: "",
        attrs: {
          hidden: true,
          disabled: true,
          "data-is-placeholder": "true"
        }
      },
      ...options2
    ];
  }
  return options2;
}
function select$1(node) {
  node.on("created", () => {
    var _a, _b, _c;
    const isMultiple = undefine((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.multiple);
    if (!isMultiple && node.props.placeholder && Array.isArray(node.props.options)) {
      node.hook.prop(({ prop, value }, next) => {
        if (prop === "options") {
          value = applyPlaceholder(value, node.props.placeholder);
        }
        return next({ prop, value });
      });
      node.props.options = applyPlaceholder(node.props.options, node.props.placeholder);
    }
    if (isMultiple) {
      if (node.value === void 0) {
        node.input([], false);
      }
    } else if (node.context && !node.context.options) {
      node.props.attrs = Object.assign({}, node.props.attrs, {
        value: node._value
      });
      node.on("input", ({ payload }) => {
        node.props.attrs = Object.assign({}, node.props.attrs, {
          value: payload
        });
      });
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.handlers) {
      node.context.handlers.selectInput = selectInput.bind(null, node);
      node.context.handlers.onChange = deferChange.bind(null, node);
    }
    if ((_c = node.context) === null || _c === void 0 ? void 0 : _c.fns) {
      node.context.fns.isSelected = isSelected.bind(null, node);
      node.context.fns.showPlaceholder = (value, placeholder) => {
        if (!Array.isArray(node.props.options))
          return false;
        const hasMatchingValue = node.props.options.some((option2) => {
          if (option2.attrs && "data-is-placeholder" in option2.attrs)
            return false;
          const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
          return eq(value, optionValue2);
        });
        return placeholder && !hasMatchingValue ? true : void 0;
      };
    }
  });
  node.hook.input((value, next) => {
    var _a, _b, _c;
    if (!node.props.placeholder && value === void 0 && Array.isArray((_a = node.props) === null || _a === void 0 ? void 0 : _a.options) && node.props.options.length && !undefine((_c = (_b = node.props) === null || _b === void 0 ? void 0 : _b.attrs) === null || _c === void 0 ? void 0 : _c.multiple)) {
      value = "__original" in node.props.options[0] ? node.props.options[0].__original : node.props.options[0].value;
    }
    return next(value);
  });
}
function defaultIcon(sectionKey, defaultIcon2) {
  return (node) => {
    if (node.props[`${sectionKey}Icon`] === void 0) {
      node.props[`${sectionKey}Icon`] = defaultIcon2.startsWith("<svg") ? defaultIcon2 : `default:${defaultIcon2}`;
    }
  };
}
function isSlotCondition(node) {
  if (isConditional(node) && node.if && node.if.startsWith("$slots.") && typeof node.then === "string" && node.then.startsWith("$slots.") && "else" in node) {
    return true;
  }
  return false;
}
function useSchema(inputSection) {
  return outer(wrapper(label("$label"), inner(prefix(), inputSection(), suffix())), help("$help"), messages(message("$message.value")));
}
function $if(condition, then, otherwise) {
  const extendable = (extensions) => {
    const node = then(extensions);
    if (otherwise || isSchemaObject(node) && "if" in node || isSlotCondition(node)) {
      const conditionalNode = {
        if: condition,
        then: node
      };
      if (otherwise) {
        conditionalNode.else = otherwise(extensions);
      }
      return conditionalNode;
    } else if (isSlotCondition(node)) {
      Object.assign(node.else, { if: condition });
    } else if (isSchemaObject(node)) {
      Object.assign(node, { if: condition });
    }
    return node;
  };
  extendable._s = token();
  return extendable;
}
function $extend(section, extendWith) {
  const extendable = (extensions) => {
    const node = section({});
    if (isSlotCondition(node)) {
      if (Array.isArray(node.else))
        return node;
      node.else = extendSchema(extendSchema(node.else, extendWith), section._s ? extensions[section._s] : {});
      return node;
    }
    return extendSchema(extendSchema(node, extendWith), section._s ? extensions[section._s] : {});
  };
  extendable._s = section._s;
  return extendable;
}
var runtimeProps = [
  "classes",
  "config",
  "delay",
  "errors",
  "id",
  "index",
  "inputErrors",
  "modelValue",
  "onUpdate:modelValue",
  "name",
  "parent",
  "plugins",
  "sectionsSchema",
  "type",
  "validation",
  "validationLabel",
  "validationMessages",
  "validationRules",
  // Runtime event props:
  "onInput",
  "onInputRaw",
  "onUpdate:modelValue",
  "onNode",
  "onSubmit",
  "onSubmitInvalid",
  "onSubmitRaw"
];
var button = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(messages(message("$message.value")), wrapper(buttonInput(icon("prefix"), prefix(), buttonLabel("$label || $ui.submit.value"), suffix(), icon("suffix"))), help("$help")),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "button",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [localize("submit"), ignore],
  /**
   * A key to use for memoizing the schema. This is used to prevent the schema
   * from needing to be stringified when performing a memo lookup.
   */
  schemaMemoKey: "h6st4epl3j8"
};
var checkbox = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single checkbox structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $extend(boxLabel("$label"), {
        if: "$label"
      })),
      /**
       * Multi checkbox structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $extend(boxLabel("$option.label"), {
        if: "$option.label"
      })), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options == undefined && $help", help("$help")),
    messages(message("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [
    options,
    checkboxes,
    defaultIcon("decorator", "checkboxDecorator")
  ],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "qje02tb3gu8"
};
var file = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), fileInput(), fileList(fileItem(icon("fileItem"), fileName("$file.name"), $if("$value.length === 1", fileRemove(icon("fileRemove"), "$ui.remove.value")))), $if("$value.length > 1", fileRemove("$ui.removeAll.value")), noFiles(icon("noFiles"), "$ui.noFiles.value"), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [
    files,
    defaultIcon("fileItem", "fileItem"),
    defaultIcon("fileRemove", "fileRemove"),
    defaultIcon("noFiles", "noFiles")
  ],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "9kqc4852fv8"
};
var form = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: formInput("$slots.default", messages(message("$message.value")), actions(submitInput())),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    "actions",
    "submit",
    "submitLabel",
    "submitAttrs",
    "submitBehavior",
    "incompleteMessage"
  ],
  /**
   * Additional features that should be added to your input
   */
  features: [form$1, disables],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "5bg016redjo"
};
var group = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
var hidden = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: textInput(),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
};
var list = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "list",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["sync", "dynamic"],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
var radio = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single radio structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $extend(boxLabel("$label"), {
        if: "$label"
      })),
      /**
       * Multi radio structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $extend(boxLabel("$option.label"), {
        if: "$option.label"
      })), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options == undefined && $help", help("$help")),
    messages(message("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [options, radios, defaultIcon("decorator", "radioDecorator")],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "qje02tb3gu8"
};
var select = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix"), prefix(), selectInput$1($if("$slots.default", () => "$slots.default", $if("$slots.option", optionSlot, option("$option.label")))), $if("$attrs.multiple !== undefined", () => "", icon("select")), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "placeholder", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [options, select$1, defaultIcon("select", "select")],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "cb119h43krg"
};
var textarea = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textareaInput(), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [initialValue],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "b1n0td79m9g"
};
var text = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textInput(), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: "c3cc4kflsg"
};
var index = Object.freeze({
  __proto__: null,
  button,
  checkbox,
  color: text,
  date: text,
  datetimeLocal: text,
  email: text,
  file,
  form,
  group,
  hidden,
  list,
  month: text,
  number: text,
  password: text,
  radio,
  range: text,
  search: text,
  select,
  submit: button,
  tel: text,
  text,
  textarea,
  time: text,
  url: text,
  week: text
});

// node_modules/.pnpm/@formkit+rules@0.19.0-ea7e008/node_modules/@formkit/rules/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  accepted: () => accepted,
  alpha: () => alpha,
  alpha_spaces: () => alpha_spaces,
  alphanumeric: () => alphanumeric,
  between: () => between,
  confirm: () => confirm,
  contains_alpha: () => contains_alpha,
  contains_alpha_spaces: () => contains_alpha_spaces,
  contains_alphanumeric: () => contains_alphanumeric,
  contains_lowercase: () => contains_lowercase,
  contains_numeric: () => contains_numeric,
  contains_symbol: () => contains_symbol,
  contains_uppercase: () => contains_uppercase,
  date_after: () => date_after,
  date_before: () => date_before,
  date_between: () => date_between,
  date_format: () => date_format,
  email: () => email,
  ends_with: () => ends_with,
  is: () => is,
  length: () => length,
  lowercase: () => lowercase,
  matches: () => matches,
  max: () => max,
  min: () => min,
  not: () => not,
  number: () => number2,
  require_one: () => require_one,
  required: () => required,
  starts_with: () => starts_with,
  symbol: () => symbol,
  uppercase: () => uppercase,
  url: () => url
});
var accepted = function accepted2({ value }) {
  return ["yes", "on", "1", 1, true, "true"].includes(value);
};
accepted.skipEmpty = false;
var date_after = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue > timestamp;
};
var alpha = function({ value }, set = "default") {
  const sets = {
    default: /^[\p{Lu}\p{L}]+$/u,
    latin: /^[a-zA-Z]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var alpha_spaces = function({ value }, set = "default") {
  const sets = {
    default: /^[\p{Lu}\p{L} ]+$/u,
    latin: /^[a-zA-Z ]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var alphanumeric = function({ value }, set = "default") {
  const sets = {
    default: /^[0-9[\p{Lu}\p{L}]+$/u,
    latin: /^[0-9\p{Latin}]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var date_before = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue < timestamp;
};
var between = function between2({ value }, from, to) {
  if (!isNaN(value) && !isNaN(from) && !isNaN(to)) {
    const val = 1 * value;
    from = Number(from);
    to = Number(to);
    const [a, b] = from <= to ? [from, to] : [to, from];
    return val >= 1 * a && val <= 1 * b;
  }
  return false;
};
var hasConfirm = /(_confirm(?:ed)?)$/;
var confirm = function confirm2(node, address, comparison = "loose") {
  var _a;
  if (!address) {
    address = hasConfirm.test(node.name) ? node.name.replace(hasConfirm, "") : `${node.name}_confirm`;
  }
  const foreignValue = (_a = node.at(address)) === null || _a === void 0 ? void 0 : _a.value;
  return comparison === "strict" ? node.value === foreignValue : node.value == foreignValue;
};
var contains_alpha = function({ value }, set = "default") {
  const sets = {
    default: /[\p{Lu}\p{L}]/u,
    latin: /[a-zA-Z]/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var contains_alpha_spaces = function({ value }, set = "default") {
  const sets = {
    default: /[\p{Lu}\p{L} ]/u,
    latin: /[a-zA-Z ]/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var contains_alphanumeric = function({ value }, set = "default") {
  const sets = {
    default: /[0-9[\p{Lu}\p{L}]/u,
    latin: /[0-9\p{Latin}]/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var contains_lowercase = function({ value }, set = "default") {
  const sets = {
    default: /[\p{Ll}]/u,
    latin: /[a-z]/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var contains_numeric = function number({ value }) {
  return /[0-9]/.test(String(value));
};
var contains_symbol = function({ value }) {
  return /[!-/:-@[-`{-~]/.test(String(value));
};
var contains_uppercase = function({ value }, set = "default") {
  const sets = {
    default: /[\p{Lu}]/u,
    latin: /[A-Z]/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var date_between = function date_between2({ value }, dateA, dateB) {
  dateA = dateA instanceof Date ? dateA.getTime() : Date.parse(dateA);
  dateB = dateB instanceof Date ? dateB.getTime() : Date.parse(dateB);
  const compareTo = value instanceof Date ? value.getTime() : Date.parse(String(value));
  if (dateA && !dateB) {
    dateB = dateA;
    dateA = Date.now();
  } else if (!dateA || !compareTo) {
    return false;
  }
  return compareTo >= dateA && compareTo <= dateB;
};
var date_format = function date({ value }, format) {
  if (format && typeof format === "string") {
    return regexForFormat(format).test(String(value));
  }
  return !isNaN(Date.parse(String(value)));
};
var email = function email2({ value }) {
  const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return isEmail.test(String(value));
};
var ends_with = function ends_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.endsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
var is = function is2({ value }, ...stack) {
  return stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item == value;
  });
};
var length = function length2({ value }, first = 0, second = Infinity) {
  first = parseInt(first);
  second = isNaN(parseInt(second)) ? Infinity : parseInt(second);
  const min3 = first <= second ? first : second;
  const max3 = second >= first ? second : first;
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length >= min3 && value.length <= max3;
  } else if (value && typeof value === "object") {
    const length3 = Object.keys(value).length;
    return length3 >= min3 && length3 <= max3;
  }
  return false;
};
var lowercase = function({ value }, set = "default") {
  const sets = {
    default: /^[\p{Ll}]+$/u,
    latin: /^[a-z]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var matches = function matches2({ value }, ...stack) {
  return stack.some((pattern) => {
    if (typeof pattern === "string" && pattern.substr(0, 1) === "/" && pattern.substr(-1) === "/") {
      pattern = new RegExp(pattern.substr(1, pattern.length - 2));
    }
    if (pattern instanceof RegExp) {
      return pattern.test(String(value));
    }
    return pattern === value;
  });
};
var max = function max2({ value }, maximum = 10) {
  if (Array.isArray(value)) {
    return value.length <= maximum;
  }
  return Number(value) <= Number(maximum);
};
var min = function min2({ value }, minimum = 1) {
  if (Array.isArray(value)) {
    return value.length >= minimum;
  }
  return Number(value) >= Number(minimum);
};
var not = function not2({ value }, ...stack) {
  return !stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item === value;
  });
};
var number2 = function number3({ value }) {
  return !isNaN(value);
};
var require_one = function(node, ...inputNames) {
  if (!empty(node.value))
    return true;
  const values = inputNames.map((name) => {
    var _a;
    return (_a = node.at(name)) === null || _a === void 0 ? void 0 : _a.value;
  });
  return values.some((value) => !empty(value));
};
require_one.skipEmpty = false;
var required = function required2({ value }, action = "default") {
  return action === "trim" && typeof value === "string" ? !empty(value.trim()) : !empty(value);
};
required.skipEmpty = false;
var starts_with = function starts_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.startsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
var symbol = function({ value }) {
  return /^[!-/:-@[-`{-~]+$/.test(String(value));
};
var uppercase = function({ value }, set = "default") {
  const sets = {
    default: /^[\p{Lu}]+$/u,
    latin: /^[A-Z]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var url = function url2({ value }, ...stack) {
  try {
    const protocols = stack.length ? stack : ["http:", "https:"];
    const url3 = new URL(String(value));
    return protocols.includes(url3.protocol);
  } catch {
    return false;
  }
};

// node_modules/.pnpm/@formkit+observer@0.19.0-ea7e008/node_modules/@formkit/observer/dist/index.mjs
var revokedObservers = /* @__PURE__ */ new WeakSet();
function createObserver(node, dependencies) {
  const deps = dependencies || Object.assign(/* @__PURE__ */ new Map(), { active: false });
  const receipts = /* @__PURE__ */ new Map();
  const addDependency = function(event) {
    var _a;
    if (!deps.active)
      return;
    if (!deps.has(node))
      deps.set(node, /* @__PURE__ */ new Set());
    (_a = deps.get(node)) === null || _a === void 0 ? void 0 : _a.add(event);
  };
  const observeProps = function(props) {
    return new Proxy(props, {
      get(...args) {
        typeof args[1] === "string" && addDependency(`prop:${args[1]}`);
        return Reflect.get(...args);
      }
    });
  };
  const observeLedger = function(ledger) {
    return new Proxy(ledger, {
      get(...args) {
        if (args[1] === "value") {
          return (key) => {
            addDependency(`count:${key}`);
            return ledger.value(key);
          };
        }
        return Reflect.get(...args);
      }
    });
  };
  const observe = function(value, property) {
    if (isNode(value)) {
      return createObserver(value, deps);
    }
    if (property === "value")
      addDependency("commit");
    if (property === "_value")
      addDependency("input");
    if (property === "props")
      return observeProps(value);
    if (property === "ledger")
      return observeLedger(value);
    return value;
  };
  const { proxy: observed, revoke } = Proxy.revocable(node, {
    get(...args) {
      switch (args[1]) {
        case "_node":
          return node;
        case "deps":
          return deps;
        case "watch":
          return (block, after) => watch2(observed, block, after);
        case "observe":
          return () => {
            const old = new Map(deps);
            deps.clear();
            deps.active = true;
            return old;
          };
        case "stopObserve":
          return () => {
            const newDeps = new Map(deps);
            deps.active = false;
            return newDeps;
          };
        case "receipts":
          return receipts;
        case "kill":
          return () => {
            removeListeners(receipts);
            revokedObservers.add(args[2]);
            revoke();
            return void 0;
          };
      }
      const value = Reflect.get(...args);
      if (typeof value === "function") {
        return (...subArgs) => {
          const subValue = value(...subArgs);
          return observe(subValue, args[1]);
        };
      }
      return observe(value, args[1]);
    }
  });
  return observed;
}
function applyListeners(node, [toAdd, toRemove], callback) {
  toAdd.forEach((events, depNode) => {
    events.forEach((event) => {
      var _a;
      node.receipts.has(depNode) || node.receipts.set(depNode, {});
      node.receipts.set(depNode, Object.assign((_a = node.receipts.get(depNode)) !== null && _a !== void 0 ? _a : {}, {
        [event]: depNode.on(event, callback)
      }));
    });
  });
  toRemove.forEach((events, depNode) => {
    events.forEach((event) => {
      if (node.receipts.has(depNode)) {
        const nodeReceipts = node.receipts.get(depNode);
        if (nodeReceipts && has(nodeReceipts, event)) {
          depNode.off(nodeReceipts[event]);
          delete nodeReceipts[event];
          node.receipts.set(depNode, nodeReceipts);
        }
      }
    });
  });
}
function removeListeners(receipts) {
  receipts.forEach((events, node) => {
    for (const event in events) {
      node.off(events[event]);
    }
  });
}
function watch2(node, block, after) {
  const doAfterObservation = (res2) => {
    const newDeps = node.stopObserve();
    applyListeners(node, diffDeps(oldDeps, newDeps), () => watch2(node, block, after));
    if (after)
      after(res2);
  };
  const oldDeps = new Map(node.deps);
  node.observe();
  const res = block(node);
  if (res instanceof Promise)
    res.then((val) => doAfterObservation(val));
  else
    doAfterObservation(res);
}
function diffDeps(previous, current) {
  const toAdd = /* @__PURE__ */ new Map();
  const toRemove = /* @__PURE__ */ new Map();
  current.forEach((events, node) => {
    if (!previous.has(node)) {
      toAdd.set(node, events);
    } else {
      const eventsToAdd = /* @__PURE__ */ new Set();
      const previousEvents = previous.get(node);
      events.forEach((event) => !(previousEvents === null || previousEvents === void 0 ? void 0 : previousEvents.has(event)) && eventsToAdd.add(event));
      toAdd.set(node, eventsToAdd);
    }
  });
  previous.forEach((events, node) => {
    if (!current.has(node)) {
      toRemove.set(node, events);
    } else {
      const eventsToRemove = /* @__PURE__ */ new Set();
      const newEvents = current.get(node);
      events.forEach((event) => !(newEvents === null || newEvents === void 0 ? void 0 : newEvents.has(event)) && eventsToRemove.add(event));
      toRemove.set(node, eventsToRemove);
    }
  });
  return [toAdd, toRemove];
}
function isKilled(node) {
  return revokedObservers.has(node);
}

// node_modules/.pnpm/@formkit+validation@0.19.0-ea7e008/node_modules/@formkit/validation/dist/index.mjs
var validatingMessage = createMessage({
  type: "state",
  blocking: true,
  visible: false,
  value: true,
  key: "validating"
});
function createValidationPlugin(baseRules = {}) {
  return function validationPlugin(node) {
    let propRules = cloneAny(node.props.validationRules || {});
    let availableRules = { ...baseRules, ...propRules };
    let observedNode = createObserver(node);
    const state = { input: token(), rerun: null, isPassing: true };
    let validation2 = cloneAny(node.props.validation);
    node.on("prop:validation", ({ payload }) => reboot(payload, propRules));
    node.on("prop:validationRules", ({ payload }) => reboot(validation2, payload));
    function reboot(newValidation, newRules) {
      var _a;
      if (eq(Object.keys(propRules || {}), Object.keys(newRules || {})) && eq(validation2, newValidation))
        return;
      propRules = cloneAny(newRules);
      validation2 = cloneAny(newValidation);
      availableRules = { ...baseRules, ...propRules };
      removeListeners(observedNode.receipts);
      (_a = node.props.parsedRules) === null || _a === void 0 ? void 0 : _a.forEach((validation3) => {
        var _a2;
        validation3.messageObserver = (_a2 = validation3.messageObserver) === null || _a2 === void 0 ? void 0 : _a2.kill();
      });
      node.store.filter(() => false, "validation");
      node.props.parsedRules = parseRules(newValidation, availableRules);
      observedNode.kill();
      observedNode = createObserver(node);
      validate(observedNode, node.props.parsedRules, state);
    }
    node.props.parsedRules = parseRules(validation2, availableRules);
    validate(observedNode, node.props.parsedRules, state);
  };
}
function validate(node, validations, state) {
  if (isKilled(node))
    return;
  state.input = token();
  state.isPassing = true;
  node.store.filter((message3) => !message3.meta.removeImmediately, "validation");
  validations.forEach((validation2) => validation2.debounce && clearTimeout(validation2.timer));
  if (validations.length) {
    node.store.set(validatingMessage);
    run(0, validations, node, state, false, () => {
      node.store.remove(validatingMessage.key);
    });
  }
}
function run(current, validations, node, state, removeImmediately, complete) {
  const validation2 = validations[current];
  if (!validation2)
    return complete();
  const currentRun = state.input;
  validation2.state = null;
  function next(async, result) {
    state.isPassing = state.isPassing && !!result;
    validation2.queued = false;
    const newDeps = node.stopObserve();
    applyListeners(node, diffDeps(validation2.deps, newDeps), () => {
      try {
        node.store.set(validatingMessage);
      } catch (e) {
      }
      validation2.queued = true;
      if (state.rerun)
        clearTimeout(state.rerun);
      state.rerun = setTimeout(validate, 0, node, validations, state);
    });
    validation2.deps = newDeps;
    if (state.input === currentRun) {
      validation2.state = result;
      if (result === false) {
        createFailedMessage(node, validation2, removeImmediately || async);
      } else {
        removeMessage(node, validation2);
      }
      if (validations.length > current + 1) {
        run(current + 1, validations, node, state, removeImmediately || async, complete);
      } else {
        complete();
      }
    }
  }
  if ((!empty(node.value) || !validation2.skipEmpty) && (state.isPassing || validation2.force)) {
    if (validation2.queued) {
      runRule(validation2, node, (result) => {
        result instanceof Promise ? result.then((r) => next(true, r)) : next(false, result);
      });
    } else {
      run(current + 1, validations, node, state, removeImmediately, complete);
    }
  } else {
    if (empty(node.value) && validation2.skipEmpty && state.isPassing) {
      node.observe();
      node.value;
      next(false, state.isPassing);
    } else {
      next(false, null);
    }
  }
}
function runRule(validation2, node, after) {
  if (validation2.debounce) {
    validation2.timer = setTimeout(() => {
      node.observe();
      after(validation2.rule(node, ...validation2.args));
    }, validation2.debounce);
  } else {
    node.observe();
    after(validation2.rule(node, ...validation2.args));
  }
}
function removeMessage(node, validation2) {
  const key = `rule_${validation2.name}`;
  if (validation2.messageObserver) {
    validation2.messageObserver = validation2.messageObserver.kill();
  }
  if (has(node.store, key)) {
    node.store.remove(key);
  }
}
function createFailedMessage(node, validation2, removeImmediately) {
  if (isKilled(node))
    return;
  if (!validation2.messageObserver) {
    validation2.messageObserver = createObserver(node._node);
  }
  validation2.messageObserver.watch((node2) => {
    const i18nArgs = createI18nArgs(node2, validation2);
    return i18nArgs;
  }, (i18nArgs) => {
    const customMessage = createCustomMessage(node, validation2, i18nArgs);
    const message3 = createMessage({
      blocking: validation2.blocking,
      key: `rule_${validation2.name}`,
      meta: {
        /**
         * Use this key instead of the message root key to produce i18n validation
         * messages.
         */
        messageKey: validation2.name,
        /**
         * For messages that were created *by or after* a debounced or async
         * validation rule — we make note of it so we can immediately remove them
         * as soon as the next commit happens.
         */
        removeImmediately,
        /**
         * Determines if this message should be passed to localization.
         */
        localize: !customMessage,
        /**
         * The arguments that will be passed to the validation rules
         */
        i18nArgs
      },
      type: "validation",
      value: customMessage || "This field is not valid."
    });
    node.store.set(message3);
  });
}
function createCustomMessage(node, validation2, i18nArgs) {
  const customMessage = node.props.validationMessages && has(node.props.validationMessages, validation2.name) ? node.props.validationMessages[validation2.name] : void 0;
  if (typeof customMessage === "function") {
    return customMessage(...i18nArgs);
  }
  return customMessage;
}
function createI18nArgs(node, validation2) {
  return [
    {
      node,
      name: createMessageName(node),
      args: validation2.args
    }
  ];
}
function createMessageName(node) {
  if (typeof node.props.validationLabel === "function") {
    return node.props.validationLabel(node);
  }
  return node.props.validationLabel || node.props.label || node.props.name || String(node.name);
}
var hintPattern = "(?:[\\*+?()0-9]+)";
var rulePattern = "[a-zA-Z][a-zA-Z0-9_]+";
var ruleExtractor = new RegExp(`^(${hintPattern}?${rulePattern})(?:\\:(.*)+)?$`, "i");
var hintExtractor = new RegExp(`^(${hintPattern})(${rulePattern})$`, "i");
var debounceExtractor = /([\*+?]+)?(\(\d+\))([\*+?]+)?/;
var hasDebounce = /\(\d+\)/;
var defaultHints = {
  blocking: true,
  debounce: 0,
  force: false,
  skipEmpty: true,
  name: ""
};
function parseRules(validation2, rules) {
  if (!validation2)
    return [];
  const intents = typeof validation2 === "string" ? extractRules(validation2) : clone(validation2);
  return intents.reduce((validations, args) => {
    let rule = args.shift();
    const hints = {};
    if (typeof rule === "string") {
      const [ruleName, parsedHints] = parseHints(rule);
      if (has(rules, ruleName)) {
        rule = rules[ruleName];
        Object.assign(hints, parsedHints);
      }
    }
    if (typeof rule === "function") {
      validations.push({
        rule,
        args,
        timer: 0,
        state: null,
        queued: true,
        deps: /* @__PURE__ */ new Map(),
        ...defaultHints,
        ...fnHints(hints, rule)
      });
    }
    return validations;
  }, []);
}
function extractRules(validation2) {
  return validation2.split("|").reduce((rules, rule) => {
    const parsedRule = parseRule(rule);
    if (parsedRule) {
      rules.push(parsedRule);
    }
    return rules;
  }, []);
}
function parseRule(rule) {
  const trimmed = rule.trim();
  if (trimmed) {
    const matches3 = trimmed.match(ruleExtractor);
    if (matches3 && typeof matches3[1] === "string") {
      const ruleName = matches3[1].trim();
      const args = matches3[2] && typeof matches3[2] === "string" ? matches3[2].split(",").map((s) => s.trim()) : [];
      return [ruleName, ...args];
    }
  }
  return false;
}
function parseHints(ruleName) {
  const matches3 = ruleName.match(hintExtractor);
  if (!matches3) {
    return [ruleName, { name: ruleName }];
  }
  const map = {
    "*": { force: true },
    "+": { skipEmpty: false },
    "?": { blocking: false }
  };
  const [, hints, rule] = matches3;
  const hintGroups = hasDebounce.test(hints) ? hints.match(debounceExtractor) || [] : [, hints];
  return [
    rule,
    [hintGroups[1], hintGroups[2], hintGroups[3]].reduce((hints2, group2) => {
      if (!group2)
        return hints2;
      if (hasDebounce.test(group2)) {
        hints2.debounce = parseInt(group2.substr(1, group2.length - 1));
      } else {
        group2.split("").forEach((hint) => has(map, hint) && Object.assign(hints2, map[hint]));
      }
      return hints2;
    }, { name: rule })
  ];
}
function fnHints(existingHints, rule) {
  if (!existingHints.name) {
    existingHints.name = rule.ruleName || rule.name;
  }
  return ["skipEmpty", "force", "debounce", "blocking"].reduce((hints, hint) => {
    if (has(rule, hint) && !has(hints, hint)) {
      Object.assign(hints, {
        [hint]: rule[hint]
      });
    }
    return hints;
  }, existingHints);
}

// node_modules/.pnpm/@formkit+i18n@0.19.0-ea7e008/node_modules/@formkit/i18n/dist/index.mjs
function sentence(str) {
  return str[0].toUpperCase() + str.substr(1);
}
function list2(items, conjunction = "or") {
  return items.reduce((oxford, item, index2) => {
    oxford += item;
    if (index2 <= items.length - 2 && items.length > 2) {
      oxford += ", ";
    }
    if (index2 === items.length - 2) {
      oxford += `${items.length === 2 ? " " : ""}${conjunction} `;
    }
    return oxford;
  }, "");
}
function date2(date3) {
  const dateTime = typeof date3 === "string" ? new Date(Date.parse(date3)) : date3;
  if (!(dateTime instanceof Date)) {
    return "(unknown)";
  }
  return new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium",
    timeZone: "UTC"
  }).format(dateTime);
}
function order(first, second) {
  return Number(first) >= Number(second) ? [second, first] : [first, second];
}
var ui$G = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "إضافة",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "إزالة",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "إزالة الكل",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "عذرا، لم يتم تعبئة جميع الحقول بشكل صحيح.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "إرسال",
  /**
   * Shown when no files are selected.
   */
  noFiles: "لا يوجد ملف مختار",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "تحرك لأعلى",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "انتقل لأسفل",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "يتم الآن التحميل...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "تحميل المزيد",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "التالي",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "السابق",
  /**
   * Shown when transferring items between lists.
   */
  addAllValues: "أضف جميع القيم",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "إضافة قيم محددة",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "قم بإزالة جميع القيم",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "إزالة القيم المحددة",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "اختر التاريخ",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "تاريخ التغيير",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "التاريخ المحدد غير صالح."
};
var validation$G = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `الرجاء قبول ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `يجب أن يكون ${sentence(name)} بعد ${date2(args[0])}.`;
    }
    return `يجب أن يكون ${sentence(name)} في المستقبل.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف أبجدية فقط.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف وأرقام فقط.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `يمكن أن تحتوي ${sentence(name)} على أحرف ومسافات فقط.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أحرف أبجدية.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أحرف أو أرقام.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أحرف أو مسافات.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على رمز.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أحرف كبيرة.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أحرف صغيرة.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `يجب أن يحتوي ${sentence(name)} على أرقام.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `يجب أن يكون ${sentence(name)} رمزًا.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف كبيرة فقط.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف صغيرة فقط.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `يجب أن يكون ${sentence(name)} قبل ${date2(args[0])}.`;
    }
    return `يجب أن يكون ${sentence(name)} في الماضي.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `تمت تهيئة هذا الحقل بشكل غير صحيح ولا يمكن إرساله.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `يجب أن يكون ${sentence(name)} ما بين ${a} و ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} غير متطابق.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ليس تاريخًا صالحًا ، يرجى استخدام التنسيق ${args[0]}`;
    }
    return "تمت تهيئة هذا الحقل بشكل غير صحيح ولا يمكن إرساله";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `يجب أن يكون ${sentence(name)} بين ${date2(args[0])} و ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "الرجاء أدخال بريد إليكتروني صالح.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `لا ينتهي ${sentence(name)} بـ ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ليست قيمة مسموح بها.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `يجب أن يكون ${sentence(name)} حرفًا واحدًا على الأقل.`;
    }
    if (min3 == 0 && max3) {
      return `يجب أن يكون ${sentence(name)} أقل من أو يساوي ${max3} حرفًا.`;
    }
    if (min3 === max3) {
      return `يجب أن يتكون ${sentence(name)} من الأحرف ${max3}.`;
    }
    if (min3 && max3 === Infinity) {
      return `يجب أن يكون ${sentence(name)} أكبر من أو يساوي ${min3} حرفًا.`;
    }
    return `يجب أن يكون ${sentence(name)} بين ${min3} و ${max3} حرفًا.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ليست قيمة مسموح بها.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `لا يمكن أن يكون أكثر من ${args[0]} ${name}.`;
    }
    return `يجب أن يكون ${sentence(name)} أقل من أو يساوي ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "لا يسمح بتنسيقات الملفات.";
    }
    return `يجب أن يكون ${sentence(name)} من النوع: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `لا يمكن أن يكون أقل من ${args[0]} ${name}.`;
    }
    return `يجب أن يكون ${sentence(name)} على الأقل ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ليس ${name} مسموحًا به.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} يجب ان يكون رقماً`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" أو ")} مطلوب.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} مطلوب.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `لا يبدأ ${sentence(name)} بـ ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `يرجى إدخال عنوان URL صالح.`;
  }
};
var ar = Object.freeze({
  __proto__: null,
  ui: ui$G,
  validation: validation$G
});
var ui$F = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "əlavə edin",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "çıxarmaq",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hamısını silin",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Üzr istəyirik, bütün sahələr düzgün doldurulmayıb.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Təqdim et",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Heç bir fayl seçilməyib",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "yuxarı hərəkət",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Aşağı hərəkət",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yükləmə...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Daha çox yüklə",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Növbəti",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Əvvəlki",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Bütün dəyərləri əlavə edin",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Seçilmiş dəyərləri əlavə edin",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Bütün dəyərləri sil",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Seçilmiş dəyərləri sil",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Tarixi seçin",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Tarixi dəyişdirin",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Seçilmiş tarix etibarsızdır."
};
var validation$F = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} qəbul edin.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} sonra olmalıdır.`;
    }
    return `${sentence(name)} gələcəkdə olmalıdır.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} yalnız əlifba sırası simvollarından ibarət ola bilər.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} yalnız hərf və rəqəmlərdən ibarət ola bilər.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} yalnız hərflərdən və boşluqlardan ibarət ola bilər.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} əlifba sırası simvolları ehtiva etməlidir.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} hərfləri və ya nömrələri ehtiva etməlidir.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} hərfləri və ya boşluqları ehtiva etməlidir.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} simvolu ehtiva etməlidir.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} böyük olmalıdır.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} kiçik olmalıdır.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} nömrələri ehtiva etməlidir.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} simvol olmalıdır.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} yalnız böyük hərfləri ehtiva edə bilər.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} yalnız kiçik hərfləri ehtiva edə bilər.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} əvvəl olmalıdır.`;
    }
    return `${sentence(name)} keçmişdə olmalıdır.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Bu sahə səhv konfiqurasiya edilib və onu təqdim etmək mümkün deyil.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} və ${b} arasında olmalıdır.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} uyğun gəlmir.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} etibarlı tarix deyil, ${args[0]} formatından istifadə edin`;
    }
    return "Bu sahə səhv konfiqurasiya edilib və onu təqdim etmək mümkün deyil";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])} və ${date2(args[1])} arasında olmalıdır`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Etibarlı e-poçt ünvanı daxil edin.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ilə bitmir.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} icazə verilən dəyər deyil.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} ən azı bir simvol olmalıdır.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3} simvoldan kiçik və ya ona bərabər olmalıdır.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} simvol uzunluğunda olmalıdır.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} simvoldan böyük və ya ona bərabər olmalıdır.`;
    }
    return `${sentence(name)} ${min3} və ${max3} simvol arasında olmalıdır.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} icazə verilən dəyər deyil.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}-dən çox ola bilməz.`;
    }
    return `${sentence(name)} ${args[0]} dəyərindən kiçik və ya ona bərabər olmalıdır.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Fayl formatlarına icazə verilmir.";
    }
    return `${sentence(name)} aşağıdakı tipdə olmalıdır: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}-dən az ola bilməz.`;
    }
    return `${sentence(name)} ən azı ${args[0]} olmalıdır.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” icazə verilən ${name} deyil.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} rəqəm olmalıdır.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" və ya ")} tələb olunur.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} tələb olunur.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ilə başlamır.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Xahiş edirik, düzgün URL daxil edin.`;
  }
};
var az = Object.freeze({
  __proto__: null,
  ui: ui$F,
  validation: validation$F
});
var ui$E = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Добави",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Премахни",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Премахни всички",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Извинете, не всички полета са попълнени правилно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Изпрати",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Няма избран файл",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Преместване нагоре",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Преместете се надолу",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Зареждане...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Заредете повече",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Следващ",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Предишен",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Добавете всички стойности",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Добавяне на избрани стойности",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Премахнете всички стойности",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Премахване на избраните стойности",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Избери дата",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Промяна на датата",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Избраната дата е невалидна."
};
var validation$E = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Моля приемете ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} трябва да е след ${date2(args[0])}.`;
    }
    return `${sentence(name)} трябва да бъде в бъдещето.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} може да съдържа само букви.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} може да съдържа само букви и цифри.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} може да съдържа само букви и интервали.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} трябва да съдържа азбучни знаци.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} трябва да съдържа букви или цифри.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} трябва да съдържа букви или интервали.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} трябва да съдържа символ.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} трябва да съдържа главни букви.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} трябва да съдържа малки букви.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} трябва да съдържа числа.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} трябва да бъде символ.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} може да съдържа само главни букви.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} може да съдържа само малки букви.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} трябва да е преди ${date2(args[0])}.`;
    }
    return `${sentence(name)} трябва да бъде в миналото.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Това поле е конфигурирано неправилно и не може да бъде изпратено`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} трябва да бъде между ${a} и ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} не съвпада.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} е невалидна дата. Моля, използвайте формата ${args[0]}`;
    }
    return "Това поле е конфигурирано неправилно и не може да бъде изпратено";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} трябва да бъде между ${date2(args[0])} и ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Моля, въведете валиден имейл адрес.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} не завършва на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} е неразрешена стойност.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} трябва да има поне един символ.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} трябва да бъде по-малко или равно на ${max3} символа.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} трябва да бъде ${max3} символи дълго.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} трябва да бъде по-голямо или равно на ${min3} символа.`;
    }
    return `${sentence(name)} трябва да бъде между ${min3} и ${max3} символа.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} е неразрешена стойност.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може да има повече от ${args[0]} ${name}.`;
    }
    return `${sentence(name)} трябва да бъде по-малко или равно на ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не са разрешени никакви файлови формати.";
    }
    return `${sentence(name)} трябва да бъде от тип: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може да има по-малко от ${args[0]} ${name}.`;
    }
    return `${sentence(name)} трябва да бъде поне ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” е неразрешен ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} трябва да бъде число.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" или ")} изисква се.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} е задължително.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} не започва с ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Моля, въведете валиден URL адрес.`;
  }
};
var bg = Object.freeze({
  __proto__: null,
  ui: ui$E,
  validation: validation$E
});
var ui$D = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Afegir",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Eliminar",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Eliminar tot",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Disculpi, no tots els camps estan omplerts correctament.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Enviar",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Cap fitxer triat",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Moure amunt",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Moure avall",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Carregant...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Carregar més",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Següent",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Anterior",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Afegir tots els valors",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Afegeix els valors seleccionats",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Eliminar tots els valors",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Elimina els valors seleccionats",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Trieu la data",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Canviar data",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "La data seleccionada no és vàlida."
};
var validation$D = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Si us plau accepti ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ha de ser posterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} ha de succeïr al futur.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} només pot contenir caràcters alfabètics.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} només pot contenir lletres i números.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} només pot contenir lletres i espais.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} ha de contenir caràcters alfabètics.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} ha de contenir lletres o números.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} ha de contenir lletres o espais.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} ha de contenir símbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} ha de contenir majúscules.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} ha de contenir minúscules.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} ha de contenir números.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} ha de ser un símbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} només pot contenir lletres majúscules.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} només pot contenir lletres minúscules.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ha de ser anterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} ha d'estar al passat.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Aquest camp està configurat incorrectament i no pot ésser enviat.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ha d'estar entre ${a} i ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} no concorda.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} no és una data vàlida, si us plau empri el format ${args[0]}`;
    }
    return "Aquest camp està configurat incorrectament i no pot ésser enviat";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ha d'estar entre ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: `Si us plau, entri una adreça d'e-mail vàlida.`,
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} no acaba amb ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} no és un valor acceptat.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} ha de tenir com a mínim un caràcter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ha de ser inferior o igual a ${max3} caràcters.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ha de tenir una longitud de ${max3} caràcters.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ha de ser major que o igual a ${min3} caràcters.`;
    }
    return `${sentence(name)} ha d'estar entre ${min3} i ${max3} caràcters.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} no és un valor permès.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No pot tenir més de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} ha de ser menys que o igual a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No hi ha cap format de fitxer acceptat.";
    }
    return `${sentence(name)} ha de ser del tipus: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No pot tenir menys de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} ha de ser com a mínim ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” no s'accepta com a ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} ha de ser un número.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" o ")} es requereix.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} és obligatori.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} no comença amb ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Si us plau inclogui una url vàlida.`;
  }
};
var ca = Object.freeze({
  __proto__: null,
  ui: ui$D,
  validation: validation$D
});
var ui$C = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Přidat",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odebrat",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odebrat vše",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pardon, ale ne všechna pole jsou vyplněna správně.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Odeslat",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Žádný soubor nebyl vybrán",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pohyb nahoru",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Posunout dolů",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Načítání...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Načíst více",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Další",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Předchozí",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Přidat všechny hodnoty",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Přidání vybraných hodnot",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Odstraňte všechny hodnoty",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Odstranění vybraných hodnot",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Zvolte datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Změnit datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Vybrané datum je neplatné."
};
var validation$C = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosím, zaškrtněte ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí být po ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí být v budoucnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} může obsahovat pouze písmena.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} může obsahovat pouze písmena a čísla.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} musí obsahovat abecední znaky.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} musí obsahovat písmena nebo číslice.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} musí obsahovat písmena nebo mezery.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} musí obsahovat symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} musí obsahovat velká písmena.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} musí obsahovat malá písmena.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} musí obsahovat čísla.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} musí být symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} může obsahovat pouze velká písmena.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} může obsahovat pouze malá písmena.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí být před ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí být v minulosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Toto pole bylo špatně nakonfigurováno a nemůže být odesláno.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} musí být mezi ${a} a ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nejsou shodná.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} není platné datum, prosím, použijte formát ${args[0]}`;
    }
    return "Toto pole bylo špatně nakonfigurováno a nemůže být odesláno.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} musí být mezi ${date2(args[0])} a ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Prosím, zadejte platnou e-mailovou adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nekončí na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} není povolená hodnota.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} musí mít nejméně jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} může mít maximálně ${max3} znaků.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} by mělo být ${max3} znaků dlouhé.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} musí obsahovat minimálně ${min3} znaků.`;
    }
    return `${sentence(name)} musí být dlouhé ${min3} až ${max3} znaků.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} není povolená hodnota.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nelze použít více než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí mít menší nebo rovno než ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nejsou nakonfigurovány povolené typy souborů.";
    }
    return `${sentence(name)} musí být typu: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nelze mít méně než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí být minimálně ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” není dovolená hodnota pro ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musí být číslo.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" nebo ")} je vyžadován.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je povinné.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nezačíná na ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Zadejte prosím platnou adresu URL.`;
  }
};
var cs = Object.freeze({
  __proto__: null,
  ui: ui$C,
  validation: validation$C
});
var ui$B = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Tilføj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Fjern",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Fjern alle",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Alle felter er ikke korrekt udfyldt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Send",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen filer valgt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flyt op",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flyt ned",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Indlæser...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Indlæs mere",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Næste",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Forrige",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Tilføj alle værdier",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Tilføj valgte værdier",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Fjern alle værdier",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Fjern valgte værdier",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Vælg dato",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Skift dato",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Den valgte dato er ugyldig."
};
var validation$B = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Accepter venligst ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} skal være senere end ${date2(args[0])}.`;
    }
    return `${sentence(name)} skal være i fremtiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver og tal.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver og mellemrum.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} skal indeholde alfabetiske tegn.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} skal indeholde bogstaver eller tal.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} skal indeholde bogstaver eller mellemrum.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} skal indeholde symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} skal indeholde store bogstaver.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} skal indeholde små bogstaver.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} skal indeholde tal.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} skal være et symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} kan kun indeholde store bogstaver.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} kan kun indeholde små bogstaver.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} skal være før ${date2(args[0])}.`;
    }
    return `${sentence(name)} skal være før i dag.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dette felt er ikke konfigureret korrekt og kan derfor ikke blive sendt.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} skal være mellem ${a} og ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} matcher ikke.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} er ikke gyldig, brug venligst formatet ${args[0]}`;
    }
    return "Dette felt er ikke konfigureret korrekt og kan derfor ikke blive sendt.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} skal være mellem ${date2(args[0])} og ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Indtast venligst en gyldig email-adresse.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutter ikke med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} er ikke en gyldig værdi.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} skal være på mindst ét tegn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} skal være på højst ${max3} tegn.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} skal være ${max3} tegn lange.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} skal være på mindst ${min3} tegn.`;
    }
    return `${sentence(name)} skal være på mindst ${min3} og højst ${max3} tegn.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} er ikke en gyldig værdi.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke have flere end ${args[0]} ${name}.`;
    }
    return `${sentence(name)} skal være mindre eller lig med ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ingen filformater tilladt.";
    }
    return `${sentence(name)} skal være af filtypen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke have mindre end ${args[0]} ${name}.`;
    }
    return `${sentence(name)} skal være mindst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” er ikke en tilladt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} skal være et tal.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" eller ")} er påkrævet.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} er påkrævet.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} starter ikke med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Indtast en gyldig URL.`;
  }
};
var da = Object.freeze({
  __proto__: null,
  ui: ui$B,
  validation: validation$B
});
var ui$A = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Hinzufügen",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Entfernen",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Alles entfernen",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Entschuldigung, nicht alle Felder wurden korrekt ausgefüllt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Senden",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Keine Datei ausgewählt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Gehe nach oben",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Gehen Sie nach unten",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Wird geladen...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Mehr laden",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Weiter",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Voriges",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Alle Werte hinzufügen",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Ausgewählte Werte hinzufügen",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Alle Werte entfernen",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Ausgewählte Werte entfernen",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Datum wählen",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Datum ändern",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Das gewählte Datum ist ungültig."
};
var validation$A = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Bitte ${name} akzeptieren.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss nach dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Zukunft liegen.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} darf nur Buchstaben enthalten.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} darf nur Buchstaben und Zahlen enthalten.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} dürfen nur Buchstaben und Leerzeichen enthalten.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} muss alphabetische Zeichen enthalten.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} muss Buchstaben oder Zahlen enthalten.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} muss Buchstaben oder Leerzeichen enthalten.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} muss ein Symbol enthalten.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} muss Großbuchstaben enthalten.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} muss Kleinbuchstaben enthalten.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} muss Zahlen enthalten.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} muss ein Symbol sein.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} kann nur Großbuchstaben enthalten.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} kann nur Kleinbuchstaben enthalten.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss vor dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Vergangenheit liegen.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.`;
    }
    return `${sentence(name)} muss zwischen ${args[0]} und ${args[1]} sein.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} stimmt nicht überein.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ist kein gültiges Datum im Format ${args[0]}.`;
    }
    return "Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} muss zwischen ${date2(args[0])} und ${date2(args[1])} liegen.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "E-Mail Adresse ist ungültig.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} endet nicht mit ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ein Zeichen enthalten.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} darf maximal ${max3} Zeichen enthalten.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} sollte ${max3} Zeichen lang sein.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ${min3} Zeichen enthalten.`;
    }
    return `${sentence(name)} muss zwischen ${min3} und ${max3} Zeichen enthalten.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Darf maximal ${args[0]} ${name} haben.`;
    }
    return `${sentence(name)} darf maximal ${args[0]} sein.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Keine Dateiformate konfiguriert.";
    }
    return `${sentence(name)} muss vom Typ ${args[0]} sein.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mindestens ${args[0]} ${name} erforderlich.`;
    }
    return `${sentence(name)} muss mindestens ${args[0]} sein.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ist kein gültiger Wert für ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} muss eine Zahl sein.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" oder ")} ist erforderlich.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} ist erforderlich.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} beginnt nicht mit ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Bitte geben Sie eine gültige URL ein.`;
  }
};
var de = Object.freeze({
  __proto__: null,
  ui: ui$A,
  validation: validation$A
});
var ui$z = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Προσθήκη",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Αφαίρεση",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Αφαίρεση όλων",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Λυπούμαστε, υπάρχουν πεδία που δεν έχουν συμπληρωθεί σωστά.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Υποβολή",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Κανένα αρχείο δεν έχει επιλεγεί",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Προς τα επάνω",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Προς τα κάτω",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Φορτώνει...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Φόρτωση περισσότερων",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Επόμενη",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Προηγούμενο",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Προσθήκη όλων των τιμών",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Προσθήκη επιλεγμένων τιμών",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Κατάργηση όλων των τιμών",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Αφαίρεση επιλεγμένων τιμών",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Επιλέξτε ημερομηνία",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Αλλαγή ημερομηνίας",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Η επιλεγμένη ημερομηνία δεν είναι έγκυρη."
};
var validation$z = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Παρακαλώ αποδεχτείτε το ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} πρέπει να είναι μετά της ${date2(args[0])}.`;
    }
    return `${sentence(name)} πρέπει να είναι στο μέλλον.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο αλφαβητικούς χαρακτήρες.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο γράμματα και αριθμούς.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο γράμματα και κενά.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει αλφαβητικούς χαρακτήρες.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει γράμματα ή αριθμούς.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} πρέπει να περιέχει γράμματα ή κενά.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει το σύμβολο.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει κεφαλαία γράμματα.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει πεζά γράμματα.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `Το ${sentence(name)} πρέπει να περιέχει αριθμούς.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `Το ${sentence(name)} πρέπει να είναι ένα σύμβολο.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `Το ${sentence(name)} μπορεί να περιέχει μόνο κεφαλαία γράμματα.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `Το ${sentence(name)} μπορεί να περιέχει μόνο πεζά γράμματα.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} πρέπει να είναι πριν της ${date2(args[0])}.`;
    }
    return `${sentence(name)} πρέπει να είναι στο παρελθόν.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Αυτό το πεδίο έχει ρυθμιστεί λανθασμένα και δεν μπορεί να υποβληθεί.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} πρέπει να είναι μεταξύ ${a} και ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} δεν ταιριάζει.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} δεν είναι έγυρη ημερομηνία, παρακαλώ ακολουθήστε την διαμόρφωση ${args[0]}`;
    }
    return "Αυτό το πεδίο έχει ρυθμιστεί λανθασμένα και δεν μπορεί να υποβληθεί";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} πρέπει να είναι μεταξύ ${date2(args[0])} και ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Παρακαλώ πληκτρολογήστε μια έγκυρη email διεύθυνση. ",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} δεν καταλήγει με ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} δεν είναι μια επιτρεπτή τιμή.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} πρέπει να είναι τουλάχιστον ενός χαρακτήρα.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} πρέπει να είναι λιγότεροι ή ίσοι με ${max3} χαρακτήρες.`;
    }
    if (min3 === max3) {
      return `Το ${sentence(name)} θα πρέπει να έχει μήκος ${max3} χαρακτήρες.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} πρέπει να είναι περισσότεροι ή ίσοι με ${min3} χαρακτήρες.`;
    }
    return `${sentence(name)} πρέπει να είναι μεταξύ ${min3} και ${max3} χαρακτήρες.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} δεν είναι μια επιτρεπτή τιμή.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Δεν μπορεί να έχει παραπάνω από ${args[0]} ${name}.`;
    }
    return `${sentence(name)} πρέπει αν είναι λιγότερο ή ίσο με το ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Δεν επιτρέπονται αρχεία.";
    }
    return `${sentence(name)} πρέπει να είναι τύπου: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Δεν μπορεί να είναι λιγότερο από ${args[0]} ${name}.`;
    }
    return `${sentence(name)} πρέπει να είναι τουλάχιστον ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” δεν είναι μια επιτρεπτή ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} πρέπει να είναι αριθμός.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ή ")} απαιτείται.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} είναι υποχρεωτικό.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} δεν αρχίζει με ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Παρακαλώ εισάγετε ένα έγκυρο URL.`;
  }
};
var el = Object.freeze({
  __proto__: null,
  ui: ui$z,
  validation: validation$z
});
var ui$y = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Add",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Remove",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Remove all",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, not all fields are filled out correctly.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Submit",
  /**
   * Shown when no files are selected.
   */
  noFiles: "No file chosen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Move up",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Move down",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Loading...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Load more",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Next",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Previous",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Add all values",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Add selected values",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Remove all values",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Remove selected values",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Choose date",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Change date",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "The selected date is invalid."
};
var validation$y = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Please accept the ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be after ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the future.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} can only contain alphabetical characters.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} can only contain letters and numbers.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} can only contain letters and spaces.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} must contain alphabetical characters.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} must contain letters or numbers.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} must contain letters or spaces.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} must contain a symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} must contain an uppercase letter.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} must contain a lowercase letter.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} must contain numbers.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} must be a symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} can only contain uppercase letters.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} can only contain lowercase letters.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be before ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the past.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `This field was configured incorrectly and can’t be submitted.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} must be between ${a} and ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} does not match.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is not a valid date, please use the format ${args[0]}`;
    }
    return "This field was configured incorrectly and can’t be submitted";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} must be between ${date2(args[0])} and ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Please enter a valid email address.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} doesn’t end with ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} must be at least one character.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} must be less than or equal to ${max3} characters.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} should be ${max3} characters long.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} must be greater than or equal to ${min3} characters.`;
    }
    return `${sentence(name)} must be between ${min3} and ${max3} characters.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have more than ${args[0]} ${name}.`;
    }
    return `${sentence(name)} must be less than or equal to ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No file formats allowed.";
    }
    return `${sentence(name)} must be of the type: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have fewer than ${args[0]} ${name}.`;
    }
    return `Must be at least ${args[0]} ${name} .`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” is not an allowed ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} must be a number.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" or ")} is required.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is required.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} doesn’t start with ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Please enter a valid URL.`;
  }
};
var en = Object.freeze({
  __proto__: null,
  ui: ui$y,
  validation: validation$y
});
var ui$x = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Añadir",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Quitar",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Quitar todos",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Discúlpe, los campos no fueron completados correctamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Enviar",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Archivo no seleccionado",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Moverse hacia arriba",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Moverse hacia abajo",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Cargando...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Cargar más",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Próximo",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Anterior",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Añadir todos los valores",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Añadir valores seleccionados",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Eliminar todos los valores",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Eliminar los valores seleccionados",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Elige fecha",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Cambiar fecha",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "La fecha seleccionada no es válida."
};
var validation$x = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Acepte el ${name} por favor.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} debe ser posterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} debe ser una fecha futura.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} debe contener solo caractéres alfabéticos.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} debe ser alfanumérico.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} espacios alfa solo pueden contener letras y espacios.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} debe contener caracteres alfabéticos.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} debe contener letras o números.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} debe contener letras o espacios.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} debe contener un símbolo.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} debe estar en mayúsculas.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} debe contener minúsculas.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} debe contener números.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} debe ser un símbolo.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} solo puede contener letras mayúsculas.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} solo puede contener letras minúsculas.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} debe ser anterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} debe ser una fecha pasada.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `El campo no fue completado correctamente y no puede ser enviado.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} debe estar entre ${a} y ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} no coincide.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} no es una fecha válida, por favor utilice el formato ${args[0]}`;
    }
    return "El campo no fue completado correctamente y no puede ser enviado.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} debe estar entre ${date2(args[0])} y ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Ingrese una dirección de correo electrónico válida por favor.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} no termina con ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} no es un valor permitido.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} debe tener al menos una letra.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} debe tener como máximo ${max3} caractéres.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} debe tener ${max3} caracteres.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} debe tener como mínimo ${min3} caractéres.`;
    }
    return `${sentence(name)} debe tener entre ${min3} y ${max3} caractéres.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} no es un valor permitido.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No puede tener más de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} debe ser menor o igual a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No existen formatos de archivos permitidos.";
    }
    return `${sentence(name)} debe ser del tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No puede tener menos de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} debe ser de al menos ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” no es un valor permitido de ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} debe ser un número.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" o ")} se requiere estar.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} es requerido.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} debe comenzar con ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Introduce una URL válida.`;
  }
};
var es = Object.freeze({
  __proto__: null,
  ui: ui$x,
  validation: validation$x
});
var ui$w = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "افزودن",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "حذف",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "همه را حذف کنید",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "همه فیلدها به‌درستی پر نشده‌اند",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "ثبت",
  /**
   * Shown when no files are selected.
   */
  noFiles: "هیچ فایلی انتخاب نشده است",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "حرکت به بالا",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "حرکت به پایین",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "در حال بارگذاری...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "بارگذاری بیشتر",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "بعدی",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "قبلی",
  /**
   * Shown when adding all values.
   */
  addAllValues: "تمام مقادیر را اضافه کنید",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "مقادیر انتخاب شده را اضافه کنید",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "تمام مقادیر را حذف کنید",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "حذف مقادیر انتخاب شده",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "تاریخ را انتخاب کنید",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "تغییر تاریخ",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "تاریخ انتخاب شده نامعتبر است"
};
var validation$w = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `لطفاً ${name} را بپذیرید.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} باید بعد از تاریخ ${date2(args[0])} باشد.`;
    }
    return `${sentence(name)} باید مربوط به آینده باشد.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} فقط میتواند شامل حروف الفبا باشد.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} فقط میتواند شامل حروف و اعداد باشد.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} فقط می تواند شامل حروف و فاصله باشد.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} باید حاوی حروف الفبا باشد.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} باید حاوی حروف یا اعداد باشد.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} باید حاوی حروف یا فاصله باشد.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} باید حاوی نماد باشد.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} باید دارای حروف بزرگ باشد.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} باید حاوی حروف کوچک باشد.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} باید حاوی اعداد باشد.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} باید یک نماد باشد.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} تنها می‌تواند شامل حروف بزرگ باشد.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} تنها می‌تواند شامل حروف کوچک باشد.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} باید قبل از تاریخ ${date2(args[0])} باشد.`;
    }
    return `${sentence(name)} باید مربوط به گذشته باشد.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `این فیلد به اشتباه پیکربندی شده است و قابل ارسال نیست`;
    }
    return `${sentence(name)} باید بین ${args[0]} و ${args[1]} باشد.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} مطابقت ندارد.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} تاریخ معتبری نیست، لطفاً از قالب ${args[0]} استفاده کنید
`;
    }
    return "این فیلد به اشتباه پیکربندی شده است و قابل ارسال نیست";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} باید بین ${date2(args[0])} و ${date2(args[1])} باشد.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "لطفا آدرس ایمیل معتبر وارد کنید.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} باید به ${list2(args)} ختم شود.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} مجاز نیست.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} باید حداقل یک کاراکتر باشد.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} باید کمتر یا برابر با ${max3} کاراکتر باشد.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} باید ${max3} کاراکتر طولانی باشد.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} باید بزرگتر یا برابر با ${min3} کاراکتر باشد.`;
    }
    return `${sentence(name)} باید بین ${min3} و ${max3} کاراکتر باشد.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} مجاز نیست.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} نمی تواند بیش از ${args[0]} باشد.`;
    }
    return `${sentence(name)} باید کمتر یا برابر با ${args[0]} باشد.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "فرمت فایل مجاز نیست.";
    }
    return `${sentence(name)} باید از این نوع باشد: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} نمی تواند کمتر از ${args[0]} باشد.
`;
    }
    return `${sentence(name)} باید حداقل ${args[0]} باشد.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" یک ${name} مجاز نیست.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} باید عدد باشد.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" یا ")} مورد نیاز است.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `پر کردن ${sentence(name)} اجباری است.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} باید با ${list2(args)} شروع شود.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `لطفا یک URL معتبر وارد کنید.`;
  }
};
var fa = Object.freeze({
  __proto__: null,
  ui: ui$w,
  validation: validation$w
});
var ui$v = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Lisää",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Poista",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Poista kaikki",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Kaikkia kenttiä ei ole täytetty oikein.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Tallenna",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ei valittuja tiedostoja",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Siirrä ylös",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Siirrä alas",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Ladataan...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Lataa lisää",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Seuraava",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Edellinen",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Lisää kaikki arvot",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Lisää valitut arvot",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Poista kaikki arvot",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Poista valitut arvot",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Valitse päivämäärä",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Vaihda päivämäärä",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Valittu päivämäärä on virheellinen."
};
var validation$v = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Ole hyvä ja hyväksy ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} tulee olla ${date2(args[0])} jälkeen.`;
    }
    return `${sentence(name)} on oltava tulevaisuudessa.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} saa sisältää vain kirjaimia.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} saa sisältää vain kirjaimia ja numeroita.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} voivat sisältää vain kirjaimia ja välilyöntejä.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} on sisällettävä aakkoselliset merkit.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} täytyy sisältää kirjaimia tai numeroita.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} täytyy sisältää kirjaimia tai välilyöntejä.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} täytyy sisältää symboli.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} täytyy sisältää isoja kirjaimia.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} täytyy sisältää pieniä kirjaimia.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} täytyy sisältää numeroita.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} on oltava symboli.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} voi sisältää vain isoja kirjaimia.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} voi sisältää vain pieniä kirjaimia.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} tulee olla ennen: ${date2(args[0])}.`;
    }
    return `${sentence(name)} on oltava menneisyydessä.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Tämä kenttä on täytetty virheellisesti joten sitä ei voitu lähettää.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} on oltava välillä ${a} - ${b} `;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ei täsmää.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ei ole validi päivämäärä, ole hyvä ja syötä muodossa: ${args[0]}`;
    }
    return "Tämä kenttä on täytetty virheellisesti joten sitä ei voitu lähettää.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} on oltava välillä ${date2(args[0])} - ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Syötä validi sähköpostiosoite.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} tulee päättyä ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ei ole sallittu vaihtoehto.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} on oltava vähintään yksi merkki.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} on oltava ${max3} tai alle merkkiä.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} pitäisi olla ${max3} merkkiä pitkä.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} on oltava vähintään ${min3} merkkiä.`;
    }
    return `${sentence(name)} on oltava vähintään ${min3}, enintään ${max3} merkkiä.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ei ole sallittu arvo.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Valitse enintään ${args[0]} ${name} vaihtoehtoa.`;
    }
    return `${sentence(name)} on oltava ${args[0]} tai alle.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Tiedostoja ei sallita.";
    }
    return `${sentence(name)} tulee olla ${args[0]}-tiedostotyyppiä.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Valitse vähintään ${args[0]} ${name} vaihtoehtoa.`;
    }
    return `${sentence(name)} tulee olla ${args[0]} tai suurempi.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ei ole sallittu ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Kentän ${sentence(name)} tulee olla numero.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" tai ")} vaaditaan.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} vaaditaan.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} on alettava ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Anna kelvollinen URL-osoite.`;
  }
};
var fi = Object.freeze({
  __proto__: null,
  ui: ui$v,
  validation: validation$v
});
var ui$u = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Ajouter",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Supprimer",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Enlever tout",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Désolé, tous les champs ne sont pas remplis correctement.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Valider",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Aucun fichier choisi",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Déplacez-vous",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Déplacez-vous",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Chargement...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Chargez plus",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Suivant",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Précédent",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Ajouter toutes les valeurs",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Ajouter les valeurs sélectionnées",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Supprimer toutes les valeurs",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Supprimer les valeurs sélectionnées",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Choisissez la date",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Modifier la date",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: `La date sélectionnée n'est pas valide.`
};
var validation$u = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Veuillez accepter le ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} doit être postérieure au ${date2(args[0])}.`;
    }
    return `${sentence(name)} doit être dans le futur.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} ne peut contenir que des caractères alphabétiques.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} ne peut contenir que des lettres et des chiffres.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} ne peuvent contenir que des lettres et des espaces.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} doit contenir des caractères alphabétiques.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} doit contenir au moins un lettre ou nombre.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} doit contenir des lettres ou des espaces.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} doit contenir un symbole.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} doit contenir au moins une majuscule.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} doit contenir au moins une minuscule.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} doit contenir des chiffres.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} doit être un symbole.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} ne peuvent contenir que des majuscules.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} ne peut contenir que des lettres minuscules.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} doit être antérieure au ${date2(args[0])}.`;
    }
    return `${sentence(name)} doit être dans le passé.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ce champ a été configuré de manière incorrecte et ne peut pas être soumis.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} doit être comprise entre ${a} et ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ne correspond pas.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} n'est pas une date valide, veuillez utiliser le format ${args[0]}`;
    }
    return "Ce champ a été configuré de manière incorrecte et ne peut pas être soumis.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} doit être comprise entre ${date2(args[0])} et ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Veuillez saisir une adresse email valide.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ne se termine pas par ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} n'est pas une valeur autorisée.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} doit comporter au moins un caractère.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} doit être inférieur ou égal à ${max3} caractères.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} doit contenir ${max3} caractères.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} doit être supérieur ou égal à ${min3} caractères.`;
    }
    return `${sentence(name)} doit être comprise entre ${min3} et ${max3} caractères.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} n'est pas une valeur autorisée.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne peut pas avoir plus de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} doit être inférieur ou égal à ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Aucun format de fichier n’est autorisé";
    }
    return `${sentence(name)} doit être du type: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne peut pas avoir moins de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} doit être au moins de ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” n'est pas un ${name} autorisé.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} doit être un nombre.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ou ")} est requis.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} est requis.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne commence pas par ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Entrez une URL valide.`;
  }
};
var fr = Object.freeze({
  __proto__: null,
  ui: ui$u,
  validation: validation$u
});
var ui$t = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Foeg ta",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ferwider",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ferwider alles",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, net alle fjilden binne korrekt ynfolle.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Ferstjoere",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Gjin bestân keazen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Gean omheech",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Nei ûnderen",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Lade…",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Mear lade",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Folgende",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Foarige",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Foegje alle wearden ta",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Foegje selektearre wearden ta",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Fuortsmite alle wearden",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Fuortsmite selektearre wearden",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Kies datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Feroarje datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "De selektearre datum is ûnjildich."
};
var validation$t = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Akseptearje de ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moat nei ${date2(args[0])} wêze.`;
    }
    return `${sentence(name)} moat yn de takomst lizze.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mei allinne alfabetyske tekens befetsje.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mei allinne letters en sifers befetsje.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mei allinne letters en spaasjes befetsje.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} must contain alphabetical characters.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} must contain letters and numbers.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} must contain letters and spaces.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} must contain symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} must contain uppercase.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} must contain lowercase.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} must contain number.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} can only contain symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} can only contain uppercase.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} can only contain lowercase.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moat foar ${date2(args[0])} falle.`;
    }
    return `${sentence(name)} moat yn it ferline wêze.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dit fjild is ferkeard konfigurearre en kin net ferstjoerd wurde.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} moat tusken ${a} en ${b} lizze.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} komt net oerien.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is gjin jildige datum, brûk de notaasje ${args[0]}`;
    }
    return "Dit fjild is ferkeard konfigurearre en kin net ferstjoerd wurde";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} moat tusken ${date2(args[0])} en ${date2(args[1])} lizze`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Folje in jildich e-mailadres yn.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} einiget net mei ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is gjin tastiene wearde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} moat minimaal ien teken wêze.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} moat lytser wêze as of gelyk wêze oan ${max3} tekens.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} moat ${max3} tekens lang wêze.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} moat grutter wêze as of gelyk wêze oan ${min3} tekens.`;
    }
    return `${sentence(name)} moat tusken de ${min3} en ${max3} tekens befetsje.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is gjin tastiene wearde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mei net mear as ${args[0]} ${name} hawwe.`;
    }
    return `${sentence(name)} moat lytser wêze as of gelyk wêze oan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Gjin bestânsnotaasjes tastien.";
    }
    return `${sentence(name)} moat fan it type: ${args[0]} wêze`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mei net minder as ${args[0]} ${name} hawwe.`;
    }
    return `${sentence(name)} moat minimaal ${args[0]} wêze.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" is gjin tastiene ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} moat in getal wêze.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" of ")} is ferplichte.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is ferplicht.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} begjint net mei ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Doch der in jildige url by.`;
  }
};
var fy = Object.freeze({
  __proto__: null,
  ui: ui$t,
  validation: validation$t
});
var ui$s = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "הוסף",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "מחק",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "מחק הכל",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "שים לב, לא כל השדות מלאים כראוי.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "שלח",
  /**
   * Shown when no files are selected.
   */
  noFiles: "לא נבחר קובץ..",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "הזז למעלה",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "הזז למטה",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "טוען...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "טען יותר",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "הבא",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "הקודם",
  /**
   * Shown when adding all values.
   */
  addAllValues: "הוסף את כל הערכים",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "הוספת ערכים נבחרים",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "הסר את כל הערכים",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "הסר ערכים נבחרים",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "בחר תאריך",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "שינוי תאריך",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "התאריך שנבחר אינו חוקי."
};
var validation$s = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `אנא אשר את ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} חייב להיות אחרי ${date2(args[0])}.`;
    }
    return `${sentence(name)} חייב להיות בעתיד.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} חייב להכיל אותיות אלפבת.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} יכול להכיל רק מספרים ואותיות.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} יכול להכיל רק אותיות ורווחים.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} חייב להכיל תווים אלפביתיים.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} חייב להכיל אותיות או מספרים.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} חייב להכיל אותיות או רווחים.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} חייב להכיל סמל.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} חייב להכיל אותיות רישיות.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} חייב להכיל אותיות קטנות.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} חייב להכיל מספרים.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} חייב להיות סמל.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} יכול להכיל אותיות רישיות בלבד.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} יכול להכיל רק אותיות קטנות.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} חייב להיות לפני ${date2(args[0])}.`;
    }
    return `${sentence(name)} חייב להיות בעבר`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `שדה זה לא הוגדר כראוי ולא יכול להישלח.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} חייב להיות בין ${a} ו- ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} לא מתאים.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} הוא לא תאריך תקין, אנא השתמש בפורמט ${args[0]}`;
    }
    return "שדה זה לא הוגדר כראוי ולא יכול להישלח.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} חייב להיות בין ${date2(args[0])} ו- ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "אנא הקלד אימייל תקין.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} לא מסתיים ב- ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} הוא לא ערך מורשה.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} חייב להיות לפחות תו אחד.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} חייב להיות פחות או שווה ל- ${max3} תווים.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} צריך להיות ${max3} תווים ארוכים.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} חייב להיות גדול או שווה ל- ${min3} תווים.`;
    }
    return `${sentence(name)} חייב להיות בין ${min3} ו- ${max3} תווים.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} הוא לא ערך תקין.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} לא יכול להיות עם יותר מ- ${args[0]}.`;
    }
    return `${sentence(name)} חייב להיות פחות או שווה ל- ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "פורמט הקובץ לא מורשה.";
    }
    return `${sentence(name)} חייב להיות מסוג: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} לא יכול להיות עם פחות מ- ${args[0]}.`;
    }
    return `${sentence(name)} חייב להיות לפחות ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” לא מתאים ל- ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} חייב להיות מספר.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" או ")} נדרש.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} הינו חובה.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} לא מתחיל ב- ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `הזן כתובת URL חוקית.`;
  }
};
var he = Object.freeze({
  __proto__: null,
  ui: ui$s,
  validation: validation$s
});
var ui$r = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ukloni",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pojedina polja nisu ispravno ispunjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Predaj",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pomaknite se gore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pomakni se dolje",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Učitavanje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Učitaj više",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Sljedeći",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "prijašnji",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Dodajte sve vrijednosti",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Dodavanje odabranih vrijednosti",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Ukloni sve vrijednosti",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Ukloni odabrane vrijednosti",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Odaberite datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Promijeni datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Odabrani datum je nevažeći."
};
var validation$r = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Potrebno je potvrditi ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti u periodu poslije ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u budućnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mora sadržavati samo slova.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mora sadržavati slova i brojeve.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mogu sadržavati samo slova i razmake..`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} mora sadržavati abecedne znakove.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} mora sadržavati slova ili brojeve.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} mora sadržavati slova ili razmake.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} mora sadržavati simbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} mora sadržavati velika slova.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} mora sadržavati mala slova.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} mora sadržavati brojeve.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} mora biti simbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} može sadržavati samo velika slova.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} može sadržavati samo mala slova.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti prije ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u prošlosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Format sadržaja nije ispravan i ne može biti predan.`;
    }
    return `${sentence(name)} mora biti između ${args[0]} i ${args[1]}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ne odgovara zadanoj vrijednosti.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nije ispravan format datuma. Molimo koristite sljedeći format: ${args[0]}`;
    }
    return "Ovo polje nije ispravno postavljeno i ne može biti predano.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti vrijednost između ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Molimo upišite ispravnu email adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ne završava s ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nije dopuštena vrijednost.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora sadržavati barem jedan znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora imati ${max3} ili manje znakova.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} trebao bi biti dugačak ${max3} znakova.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora imati barem ${min3} znakova.`;
    }
    return `Broj znakova za polje ${sentence(name)} mora biti između ${min3} i ${max3}.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nije dozvoljena vrijednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne smije imati više od ${args[0]} ${name} polja.`;
    }
    return `${sentence(name)} mora imati vrijednost manju ili jednaku ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Format datoteke nije dozvoljen.";
    }
    return `Format datoteke na polju ${sentence(name)} mora odgovarati: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Broj upisanih vrijednosti na polju ${name} mora biti barem ${args[0]}.`;
    }
    return `${sentence(name)} mora biti barem ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nije dozvoljena vrijednost na polju ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti broj.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ili ")} je potreban.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je obavezno.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne počinje s ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Unesite valjanu URL adresu.`;
  }
};
var hr = Object.freeze({
  __proto__: null,
  ui: ui$r,
  validation: validation$r
});
var ui$q = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Hozzáadás",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Eltávolítás",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Összes eltávolítása",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sajnáljuk, nem minden mező lett helyesen kitöltve.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Beküldés",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nincs fájl kiválasztva",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mozgás felfelé",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mozgás lefelé",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Betöltés...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Töltsön be többet",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Következő",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Előző",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Adja hozzá az összes értéket",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Kiválasztott értékek hozzáadása",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Távolítsa el az összes értéket",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "A kiválasztott értékek eltávolítása",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Válassza ki a dátumot",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Dátum módosítása",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "A kiválasztott dátum érvénytelen."
};
var validation$q = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Fogadja el a ${name} mezőt.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mezőnek ${date2(args[0])} után kell lennie.`;
    }
    return `${sentence(name)} mezőnek a jövőben kell lennie.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} csak alfanumerikus karaktereket tartalmazhat.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} csak betűket és számokat tartalmazhat.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} csak betűket és szóközöket tartalmazhat.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `A ${sentence(name)} betűrendes karaktereket kell tartalmaznia.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `A ${sentence(name)} betűket vagy számokat kell tartalmaznia.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `A ${sentence(name)} betűket vagy szóközöket kell tartalmaznia.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `A ${sentence(name)} szimbólumot kell tartalmaznia.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `A ${sentence(name)} nagybetűt kell tartalmaznia.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `A ${sentence(name)} kisbetűt kell tartalmaznia.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `A ${sentence(name)} számot kell tartalmaznia.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `A ${sentence(name)} szimbólumnak kell lennie.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `A ${sentence(name)} csak nagybetűket tartalmazhat.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `A ${sentence(name)} csak kisbetűket tartalmazhat.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mezőnek ${date2(args[0])} előtt kell lennie.`;
    }
    return `${sentence(name)} mezőnek a múltban kell lennie.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ez a mező hibásan lett konfigurálva, így nem lehet beküldeni.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `A ${sentence(name)} mezőnek ${a} és ${b} között kell lennie.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nem egyezik.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nem érvényes dátum, ${args[0]} formátumot használj`;
    }
    return "Ez a mező hibásan lett konfigurálva, így nem lehet beküldeni.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mezőnek ${date2(args[0])} és ${args[1]} között kell lennie`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Kérjük, érvényes email címet adjon meg.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} mező nem a kijelölt (${list2(args)}) módon ér véget.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nem engedélyezett érték.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mezőnek legalább egy karakteresnek kell lennie.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mezőnek maximum ${max3} karakteresnek kell lennie.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} karakter hosszúnak kell lennie.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mezőnek minimum ${min3} karakteresnek kell lennie.`;
    }
    return `${sentence(name)} mezőnek ${min3} és ${max3} karakter között kell lennie.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nem engedélyezett érték.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nem lehet több mint ${args[0]} ${name}.`;
    }
    return `${sentence(name)} nem lehet nagyobb, mint ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nincsenek támogatott fájlformátumok.";
    }
    return `${sentence(name)}-nak/nek a következőnek kell lennie: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nem lehet kevesebb, mint ${args[0]} ${name}.`;
    }
    return `${sentence(name)}-nak/nek minimum ${args[0]}-nak/nek kell lennie.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" nem engedélyezett ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mezőnek számnak kell lennie.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" vagy ")} szükséges.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} mező kötelező.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nem a következővel kezdődik: ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Kérjük, adjon meg egy érvényes URL-t.`;
  }
};
var hu = Object.freeze({
  __proto__: null,
  ui: ui$q,
  validation: validation$q
});
var ui$p = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Tambah",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Hapus",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hapus semua",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Maaf, tidak semua bidang formulir terisi dengan benar",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Kirim",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Tidak ada file yang dipilih",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pindah ke atas",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pindah ke bawah",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Memuat...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Muat lebih",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Berikutnya",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Sebelumnya",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Tambahkan semua nilai",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Tambahkan nilai yang dipilih",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Hapus semua nilai",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Hapus nilai yang dipilih",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Pilih tanggal",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Ubah tanggal",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Tanggal yang dipilih tidak valid."
};
var validation$p = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Tolong terima kolom ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nilainya harus lebih dari waktu ${date2(args[0])}.`;
    }
    return `${sentence(name)} harus berisi waktu di masa depan.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} hanya bisa diisi huruf alfabet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} hanya bisa diisi huruf dan angka.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} hanya boleh berisi huruf dan spasi..`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} harus berisi karakter abjad.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} harus mengandung huruf atau angka.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} harus berisi huruf atau spasi.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} harus berisi simbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} harus berisi huruf besar.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} harus berisi huruf kecil.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} harus berisi angka.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} harus berupa simbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} hanya dapat berisi huruf besar.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} hanya dapat berisi huruf kecil.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nilainya harus kurang dari waktu ${date2(args[0])}.`;
    }
    return `${sentence(name)} harus berisi waktu yang sudah lampau.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Kolom ini tidak diisi dengan benar sehingga tidak bisa dikirim`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} harus bernilai diantara ${a} dan ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nilainya tidak cocok.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} waktu tidak cocok, mohon gunakan format waktu ${args[0]}`;
    }
    return "Kolom ini tidak diisi dengan benar sehingga tidak bisa dikirim";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} harus diantara waktu ${date2(args[0])} dan waktu ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Tolong tulis alamat email yang benar.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nilainya tidak berakhiran dengan ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} adalah nilai yang tidak diizinkan.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} nilainya setidaknya berisi satu karakter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} jumlah karakternya harus kurang dari atau sama dengan ${max3} karakter.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} harus ${max3} karakter panjang.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} jumlah karakternya harus lebih dari atau sama dengan ${min3} karakter.`;
    }
    return `${sentence(name)} jumlah karakternya hanya bisa antara ${min3} dan ${max3} karakter.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nilainya tidak diizinkan.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Tidak bisa memiliki lebih dari ${args[0]} ${name}.`;
    }
    return `${sentence(name)} harus lebih kecil atau sama dengan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Format file tidak diizinkan";
    }
    return `${sentence(name)} hanya bisa bertipe: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Tidak boleh kurang dari ${args[0]} ${name}.`;
    }
    return `${sentence(name)} setidaknya harus berisi ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” adalah nilai yang tidak diperbolehkan untuk ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} harus berupa angka.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" atau ")} diperlukan`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} harus diisi.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} tidak dimulai dengan ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Harap masukkan URL yang valid.`;
  }
};
var id = Object.freeze({
  __proto__: null,
  ui: ui$p,
  validation: validation$p
});
var ui$o = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Bæta við",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Fjarlægja",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Fjarlægja allt",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Því miður, það er ekki búið að fylla rétt inn í alla reiti.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Senda",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Engin skrá valin",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Færa upp",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Færa niður",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Hleðsla...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Sækja meira",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Áfram",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Til baka",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Bæta við öllum gildum",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Bæta við völdum gildum",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Fjarlægja öll gildi",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Fjarlægja valin gildi",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Velja dagsetningu",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Breyta dagsetningu",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Valin dagsetning er ógild"
};
var validation$o = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Vinsamlegast samþykktu ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} þarf að vera eftir ${date2(args[0])}.`;
    }
    return `${sentence(name)} þarf að vera í framtíðinni.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} má einungis innihalda bókstafi.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} má einungis innihalda bókstafi og tölur.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} má einungis innihalda bókstafi og bil.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} verður að innihalda bókstafi.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} verður að innihalda bókstafi eða tölur.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} verður að innihalda bókstafi eða bil.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} verður að innihalda tákn.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} verður að innihalda hástaf.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} verður að innihalda lágstaf.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} verður að innihalda tölur.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} verður að vera tákn.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} má einungis innihalda hástafi.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} má einungis innihalda lágstafi.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} þarf að vera á undan ${date2(args[0])}.`;
    }
    return `${sentence(name)} þarf að vera liðin.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Þessi reitur var ekki rétt stilltur.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} þarf að vera á milli ${a} og ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} passar ekki.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} er ekki gild dagsetning, vinsamlegast hafið dagsetninguna í formi ${args[0]}`;
    }
    return "Þessi reitur var ekki rétt stilltur";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} þarf að vera á milli ${date2(args[0])} og ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Vinsamlegast sláðu inn gilt netfang.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} endar ekki á ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} er ekki leyfilegt gildi.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} þarf að vera að minnsta kosti einn stafur.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} þarf að vera færri en eða nákvæmlega ${max3} stafir.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} þarf að vera ${max3} stafir að lengd.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} þarf að vera fleiri en eða nákvæmlega ${min3} stafir.`;
    }
    return `${sentence(name)} þarf að vera á milli ${min3} og ${max3} stafir.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} er ekki leyfilegt gildi.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ekki hægt að hafa fleiri en ${args[0]} ${name}.`;
    }
    return `${sentence(name)} þarf að vera minna en eða nákvæmlega ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ekki leyfileg tegund skráar.";
    }
    return `${sentence(name)} þarf að vera af tegundinni: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ekki hægt að hafa færri en ${args[0]} ${name}.`;
    }
    return `Þarf að vera að minnsta kosti ${args[0]} ${name}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” er ekki leyfilegt fyrir ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} þarf að vera tala.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" or ")} is required.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} er skilyrt.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} byrjar ekki á ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Vinsamlegast sláðu inn gilda slóð.`;
  }
};
var is3 = Object.freeze({
  __proto__: null,
  ui: ui$o,
  validation: validation$o
});
var ui$n = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Inserisci",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Rimuovi",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Rimuovi tutti",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Ci dispiace, non tutti i campi sono compilati correttamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Invia",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nessun file selezionato",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Sposta in alto",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Sposta giù",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Caricamento...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Carica altro",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Prossimo",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Precedente",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Aggiungi tutti i valori",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Aggiungi valori selezionati",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Rimuovi tutti i valori",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Rimuovi i valori selezionati",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Scegli la data",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Cambia data",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "La data selezionata non è valida."
};
var validation$n = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Si prega di accettare ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `la data ${sentence(name)} deve essere successiva ${date2(args[0])}.`;
    }
    return `la data ${sentence(name)} deve essere nel futuro.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} può contenere solo caratteri alfanumerici.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} può contenere solo lettere e numeri.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} può contenere solo lettere e spazi.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} deve contenere caratteri alfabetici.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} deve contenere lettere o numeri.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} deve contenere lettere o spazi.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} deve contenere un simbolo.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} must contain uppercase.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} deve contenere lettere minuscole.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} deve contenere numeri.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} deve essere un simbolo.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} può contenere solo lettere maiuscole.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} può contenere solo lettere minuscole.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `la data ${sentence(name)} deve essere antecedente ${date2(args[0])}.`;
    }
    return `${sentence(name)} deve essere nel passato.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Questo campo è stato configurato male e non può essere inviato.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} deve essere tra ${a} e ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} non corrisponde.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} non è una data valida, per favore usa il formato ${args[0]}`;
    }
    return "Questo campo è stato configurato in modo errato e non può essere inviato.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} deve essere tra ${date2(args[0])} e ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Per favore inserire un indirizzo email valido.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} non termina con ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} non è un valore consentito.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} deve contenere almeno un carattere.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} deve essere minore o uguale a ${max3} caratteri.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} deve contenere ${max3} caratteri.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} deve essere maggiore o uguale a ${min3} caratteri.`;
    }
    return `${sentence(name)} deve essere tra ${min3} e ${max3} caratteri.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} non è un valore consentito.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Non può avere più di ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve essere minore o uguale a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Formato file non consentito.";
    }
    return `${sentence(name)} deve essere di tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Non può avere meno di ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve essere almeno ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" non è un ${name} consentito.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} deve essere un numero.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" o ")} è richiesto.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} è richiesto.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} non inizia con ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Inserisci un URL valido.`;
  }
};
var it = Object.freeze({
  __proto__: null,
  ui: ui$n,
  validation: validation$n
});
var ui$m = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "追加",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "削除",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "全て削除",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "項目が正しく入力されていません。",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "送信",
  /**
   * Shown when no files are selected.
   */
  noFiles: "ファイルが選択されていません",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "上に移動",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "下へ移動",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "読み込み中...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "さらに読み込む",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "[次へ]",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "前へ",
  /**
   * Shown when adding all values.
   */
  addAllValues: "すべての値を追加",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "選択した値を追加",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "すべての値を削除",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "選択した値を削除",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "日付を選択",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "日付を変更",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "選択した日付は無効です。"
};
var validation$m = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name}の同意が必要です。`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は${date2(args[0])}より後の日付である必要があります。`;
    }
    return `${sentence(name)}は将来の日付でなければなりません。`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)}には英字のみを含めることができます。`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)}には、文字と数字のみを含めることができます。`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)}には、文字とスペースのみを含めることができます。`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} にはアルファベット文字が含まれている必要があります。`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} には文字または数字を含める必要があります。`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} には文字またはスペースを含める必要があります。`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} には記号が含まれている必要があります。`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} には大文字を含める必要があります。`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} には小文字を含める必要があります。`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} には数字が含まれている必要があります。`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} はシンボルでなければなりません。`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} には大文字しか使用できません`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} には小文字しか使用できません。`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は${date2(args[0])}より前の日付である必要があります。`;
    }
    return `${sentence(name)}は過去の日付である必要があります。`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `このフィールドは正しく構成されていないため、送信できません。`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)}は${a}と${b}の間にある必要があります。`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)}が一致しません。`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は有効な日付ではありません。${args[0]}の形式を使用してください。`;
    }
    return "このフィールドは正しく構成されておらず、送信できません。";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}は${date2(args[0])}と${date2(args[1])}の間にある必要があります。`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "有効なメールアドレスを入力してください。",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)}は${list2(args)}で終わっていません。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)}は許可された値ではありません。`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)}は少なくとも1文字である必要があります。`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)}は${max3}文字以下である必要があります。`;
    }
    if (min3 === max3) {
      return `${sentence(name)} の長さは ${max3} 文字でなければなりません。`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)}は${min3}文字以上である必要があります。`;
    }
    return `${sentence(name)}は${min3}から${max3}文字の間でなければなりません。`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)}は許可された値ではありません。`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}は${args[0]}を超えることはできません。`;
    }
    return `${sentence(name)}は${args[0]}以下である必要があります。`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "ファイル形式は許可されていません。";
    }
    return `${sentence(name)}は${args[0]}である必要があります。`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}は${args[0]}未満にすることはできません。`;
    }
    return `${sentence(name)}は少なくとも${args[0]}である必要があります。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}”は許可された${name}ではありません。`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)}は数値でなければなりません。`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join("または")}${labels}が必要です。`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)}は必須です。`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)}は${list2(args)}で始まっていません。`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `有効な URL を入力してください。`;
  }
};
var ja = Object.freeze({
  __proto__: null,
  ui: ui$m,
  validation: validation$m
});
var ui$l = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "қосу",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Жою",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Барлығын жою",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Кешіріңіз, барлық өрістер дұрыс толтырылмаған.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Жіберу",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ешбір файл таңдалмады",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Жоғары жылжу",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Төмен жылжытыңыз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Жүктеу...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Көбірек жүктеңіз",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Келесі",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Алдыңғы",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Барлық мәндерді қосыңыз",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Таңдалған мәндерді қосыңыз",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Барлық мәндерді алып тастаңыз",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Таңдалған мәндерді алып тастаңыз",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Күнді таңдаңыз",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Өзгерту күні",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Таңдалған күн жарамсыз."
};
var validation$l = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `қабылдаңыз ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} кейін болуы керек ${date2(args[0])}.`;
    }
    return `${sentence(name)} болашақта болуы керек.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} тек алфавиттік таңбаларды қамтуы мүмкін.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} тек әріптер мен сандардан тұруы мүмкін.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} тек әріптер мен бос орындар болуы мүмкін.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} алфавиттік таңбалардан тұруы керек.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} құрамында әріптер немесе сандар болуы керек.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} құрамында әріптер немесе бос орындар болуы керек.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} символы болуы керек.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} құрамында бас әріптер болуы керек.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} кіші әріп болуы керек.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} сандардан тұруы керек.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} символы болуы керек.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} тек бас әріптерден тұруы мүмкін.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} құрамында тек кіші әріптер болуы мүмкін.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бұрын болуы керек ${date2(args[0])}.`;
    }
    return `${sentence(name)} өткенде болуы керек.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Бұл өріс қате конфигурацияланған және оны жіберу мүмкін емес.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} арасында болуы керек ${a} және ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} сәйкес келмейді.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} жарамды күн емес, пішімді пайдаланыңыз ${args[0]}`;
    }
    return "Бұл өріс қате конфигурацияланған және оны жіберу мүмкін емес";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} арасында болуы керек ${date2(args[0])} және ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Өтінеміз қолданыстағы электронды пошта адресін енгізіңіз.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} -мен бітпейді ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} рұқсат етілген мән емес.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} кем дегенде бір таңба болуы керек.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} кем немесе тең болуы керек ${max3} кейіпкерлер.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} таңбалары болуы керек.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} артық немесе тең болуы керек ${min3} кейіпкерлер.`;
    }
    return `${sentence(name)} арасында болуы керек ${min3} және ${max3} кейіпкерлер.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} рұқсат етілген мән емес.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `артық болуы мүмкін емес ${args[0]} ${name}.`;
    }
    return `${sentence(name)} кем немесе тең болуы керек ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Файл пішімдері рұқсат етілмейді.";
    }
    return `${sentence(name)} типте болуы керек: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `кем болуы мүмкін емес ${args[0]} ${name}.`;
    }
    return `${sentence(name)} кем дегенде болуы керек ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” рұқсат етілмейді ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} сан болуы керек.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" не ")} қажет.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} талап етіледі.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} -ден басталмайды ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Жарамды URL мекенжайын енгізіңіз.`;
  }
};
var kk = Object.freeze({
  __proto__: null,
  ui: ui$l,
  validation: validation$l
});
var ui$k = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "추가",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "제거",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "모두 제거",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "모든 값을 채워주세요",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "제출하기",
  /**
   * Shown when no files are selected.
   */
  noFiles: "선택된 파일이 없습니다",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "위로 이동",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "아래로 이동",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "로드 중...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "더 불러오기",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "다음",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "이전",
  /**
   * Shown when adding all values.
   */
  addAllValues: "모든 값 추가",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "선택한 값 추가",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "모든 값 제거",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "선택한 값 제거",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "날짜 선택",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "날짜 변경",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "선택한 날짜가 잘못되었습니다."
};
var validation$k = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} 올바른 값을 선택 해주세요`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} 이후여야 합니다`;
    }
    return `${sentence(name)} 미래의 날짜여야합니다`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} 알파벳 문자만 포함할 수 있습니다`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} 문자와 숫자만 포함될 수 있습니다`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} 문자와 공백만 포함할 수 있습니다.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} 에는 알파벳 문자가 포함되어야 합니다.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} 에는 문자나 숫자가 포함되어야 합니다.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} 에는 문자나 공백이 포함되어야 합니다.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} 에는 기호를 포함해야 합니다.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} 는 대문자를 포함해야 합니다.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} 는 소문자를 포함해야 합니다.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} 에는 숫자가 포함되어야 합니다.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} 는 기호여야 합니다.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} 는 대문자만 포함할 수 있습니다.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} 는 소문자만 포함할 수 있습니다.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} 이전여야 합니다`;
    }
    return `${sentence(name)} 과거의 날짜여야합니다`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `잘못된 구성으로 제출할 수 없습니다`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a}와 ${b} 사이여야 합니다`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} 일치하지 않습니다`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} 유효한 날짜가 아닙니다. ${args[0]}과 같은 형식을 사용해주세요`;
    }
    return "잘못된 구성으로 제출할 수 없습니다";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])}에서 ${date2(args[1])} 사이여야 합니다`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "올바른 이메일 주소를 입력해주세요",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)}로 끝나지 않습니다`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} 허용되는 값이 아닙니다`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} 하나 이상의 문자여야 합니다`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3}자 이하여야 합니다`;
    }
    if (min3 === max3) {
      return `${sentence(name)} 는 ${max3} 자 길이여야 합니다.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} 문자보다 크거나 같아야 합니다`;
    }
    return `${sentence(name)} ${min3}에서 ${max3}자 사이여야 합니다`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} 허용되는 값이 아닙니다`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} 초과할 수 없습니다`;
    }
    return `${sentence(name)} ${args[0]}보다 작거나 같아야 합니다`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "파일 형식이 허용되지 않습니다";
    }
    return `${sentence(name)} ${args[0]} 유형이어야 합니다`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}보다 작을 수 없습니다`;
    }
    return `${sentence(name)} ${args[0]} 이상이어야 합니다`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `${value}" 허용되지 않는 ${name}입니다`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} 숫자여야 합니다`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" 또는 ")}가 필요합니다.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} 필수 값입니다`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)}로 시작하지 않습니다`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `유효한 URL을 입력하십시오.`;
  }
};
var ko = Object.freeze({
  __proto__: null,
  ui: ui$k,
  validation: validation$k
});
function getByQuantity(quantity, vienetas, vienetai, vienetu) {
  const lastTwoDigits = quantity.toString().slice(-2);
  const parsedQuantity = parseInt(lastTwoDigits);
  if (parsedQuantity > 10 && parsedQuantity < 20 || parsedQuantity % 10 === 0) {
    return vienetu;
  }
  if (parsedQuantity === 1 || parsedQuantity % 10 === 1) {
    return vienetas;
  }
  return vienetai;
}
var ui$j = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Pridėti",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Pašalinti",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Pašalinti visus",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Atsiprašome, ne visi laukai užpildyti teisingai.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Pateikti",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nepasirinktas joks failas",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Aukštyn",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Žemyn",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Kraunama...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Daugiau",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Kitas",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Ankstesnis",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Pridėti visas reikšmes",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Pridėti pasirinktas reikšmes",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Pašalinti visas reikšmes",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Pašalinti pasirinktas reikšmes",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Pasirinkti datą",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Pakeisti datą",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Pasirinkta data yra netinkama."
};
var validation$j = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prašome priimti ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} turi būti po ${date2(args[0])}.`;
    }
    return `${sentence(name)} turi būti ateityje.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} gali būti tik abėcėlės simboliai.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} gali būti tik raidės ir skaičiai.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} gali būti tik raidės ir tarpai.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} turi būti abėcėlės simbolių.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} turi būti raidžių arba skaičių.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} turi būti raidžių arba tarpų.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} turi būti simbolių.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} turi būti didžioji raidė.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} turi būti mažoji raidė.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} turi būti skaičių.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} turi būti simbolis.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} turi būti tik didžiosios raidės.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} turi būti tik mažosios raidės.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} turi būti prieš ${date2(args[0])}.`;
    }
    return `${sentence(name)} turi būti praeityje.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Šis laukas buvo sukonfigūruotas neteisingai ir jo negalima pateikti.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} turi būti tarp ${a} ir ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nesutampa.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nėra tinkama data, naudokite formatą ${args[0]}`;
    }
    return "Šis laukas buvo sukonfigūruotas neteisingai ir jo negalima pateikti";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} turi būti tarp ${date2(args[0])} ir ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Įveskite teisingą el. pašto adresą.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nesibaigia su ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nėra leistina reikšmė.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} turi būti bent vienas simbolis.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} turi būti mažiau arba lygiai ${max3} ${getByQuantity(max3, "simbolis", "simboliai", "simbolių")}.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} turi būti iš ${max3} ${getByQuantity(max3, "simbolio", "simbolių", "simbolių")}.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} turi būti daugiau arba lygiai ${min3} ${getByQuantity(min3, "simbolis", "simboliai", "simbolių")}.`;
    }
    return `${sentence(name)} turi būti tarp ${min3} ir ${max3} simbolių.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nėra leistina reikšmė.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Negali turėti daugiau nei ${args[0]} ${name}.`;
    }
    return `${sentence(name)} turi būti mažiau arba lygiai ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Neleidžiami jokie failų formatai.";
    }
    return `${sentence(name)} turi būti tokio tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Negali turėti mažiau nei ${args[0]} ${name}.`;
    }
    return `Turi būti bent ${args[0]} ${name} .`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nėra leidžiamas ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} turi būti skaičius.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" arba ")} yra privaloma.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} yra privaloma.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} neprasideda su ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Įveskite teisingą URL.`;
  }
};
var lt = Object.freeze({
  __proto__: null,
  ui: ui$j,
  validation: validation$j
});
var ui$i = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Нэмэх",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Хасах",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Бүгдийг хасах",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Уучлраарай, зарим нүдэн дахь өгөгдөл дутуу байна.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Илгээх",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Файл сонгоогүй байна",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Дээшээ",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Доошоо",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Ачааллаж байна...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Нэмж ачааллах",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Дараагийн",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Өмнөх",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Бүх утгуудыг нэмэх",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Сонгогдсон утгуудыг нэмэх",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Бүх утгуудыг устгах",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Сонгогдсон утгуудыг хасах",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Огноо сонгох",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Огноо өөрчлөх",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Сонгосон огноо буруу байна."
};
var validation$i = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} утгыг зөвшөөрнө үү.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} нь ${date2(args[0])}-ны дараа орох ёстой.`;
    }
    return `${sentence(name)} утга ирээдүйг заах ёстой.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} зөвхөн үсэг агуулах ёстой.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} зөвхөн үсэг болон тоог агуулах ёстой.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} зөвхөн үсэг болон зай агуулах ёстой.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} нь ${date2(args[0])}-ны өмнө байх ёстой.`;
    }
    return `${sentence(name)} өнгөрсөн огноо байх ёстой.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Энэ нүдэн дэхь өгөгдөл буруу учраас илгээх боломжгүй.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} нь заавал ${a}, ${b} хоёрын дунд байх ёстой.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} таарахгүй байна.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} нь хүчинтэй огноо биш тул ${args[0]} гэсэн огноог ашиглаарай.`;
    }
    return "Энэхүү нүд буруу тул цааш илгээх боломжгүй.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} нь заавал ${date2(args[0])}, ${date2(args[1])} хоёр огноон дунд байх ёстой.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Та хүчинтэй имейл хаягаа оруулна уу.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} нь ${list2(args)} гэсэн утгаар төгсөөгүй байна.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} нь зөвшөөрөгдөх утга биш.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} дээр хаяж нэг үсэг байх ёстой`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)}-н урт нь ${max3}-ээс ихгүй байх ёстой.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} нь ${max3} урт байвал зүгээр.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)}-н урт нь ${min3}-ээс их буюу тэнцүү байж болно.`;
    }
    return `${sentence(name)}-н урт нь ${min3}, ${max3} хоёрын дунд байх ёстой.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} нь зөвшөөрөгдөх утга биш.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} нь ${args[0]}-аас их байж болохгүй.`;
    }
    return `${sentence(name)} нь ${args[0]}-тай тэнцүү эсвэл бага байх ёстой.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Файлын формат буруу.";
    }
    return `${sentence(name)} төрөл нь ${args[0]} байх ёстой.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} нь ${args[0]}-аас их байж болохгүй.`;
    }
    return `${name} нь дор хаяж ${args[0]}-тай тэнцүү байх ёстой.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” бол зөвшөөрөгдөх ${name} гэсэн утга биш.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} зөвхөн тоо байх ёстой.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} байх ёстой.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} нь ${list2(args)}-ээр эхлээгүй байна.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Хүчннтай URL оруулна уу.`;
  }
};
var mn = Object.freeze({
  __proto__: null,
  ui: ui$i,
  validation: validation$i
});
var ui$h = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Legg til",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Fjern",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Fjern alle",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Beklager, noen felter er ikke fylt ut korrekt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Send inn",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen fil valgt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flytt opp",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flytt ned",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Laster...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Last mer",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Neste",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Forrige",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Legg til alle verdier",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Legg til valgte verdier",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Fjern alle verdier",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Fjern valgte verdier",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Velg dato",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Endre dato",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Den valgte datoen er ugyldig."
};
var validation$h = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Vennligst aksepter ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} må være senere enn ${date2(args[0])}.`;
    }
    return `${sentence(name)} må være i fremtiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan bare inneholde alfabetiske tegn.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan bare inneholde bokstaver og tall.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan bare inneholde bokstaver og mellomrom.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} must contain alphabetical characters.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} must contain letters and numbers.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} must contain letters and spaces.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} must contain symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} must contain uppercase.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} must contain lowercase.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} must contain number.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} can only contain symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} can only contain uppercase.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} can only contain lowercase.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} må være tidligere enn ${date2(args[0])}.`;
    }
    return `${sentence(name)} må være i fortiden.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dette feltet er feilkonfigurert og kan ikke innsendes.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} må være mellom ${a} og ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} stemmer ikke overens.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} er ikke en gyldig dato, vennligst bruk formatet ${args[0]}`;
    }
    return "Dette feltet er feilkonfigurert og kan ikke innsendes.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} må være mellom ${date2(args[0])} og ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Vennligst oppgi en gyldig epostadresse.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutter ikke med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} er ikke en tillatt verdi.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} må ha minst ett tegn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} må ha mindre enn eller nøyaktig ${max3} tegn.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} skal være ${max3} tegn langt.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} må ha mer enn eller nøyaktig ${min3} tegn.`;
    }
    return `${sentence(name)} må ha mellom ${min3} og ${max3} tegn.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} er ikke en tillatt verdi.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke ha mer enn ${args[0]} ${name}.`;
    }
    return `${sentence(name)} må være mindre enn eller nøyaktig ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ingen tillatte filformater.";
    }
    return `${sentence(name)} må være av typen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke ha mindre enn ${args[0]} ${name}.`;
    }
    return `${sentence(name)} må være minst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” er ikke en tillatt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} må være et tall.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" eller ")} er nødvendig.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} er påkrevd.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} starter ikke med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Vennligst inkluder en gyldig url.`;
  }
};
var nb = Object.freeze({
  __proto__: null,
  ui: ui$h,
  validation: validation$h
});
var ui$g = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Toevoegen",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Verwijderen",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Alles verwijderen",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, niet alle velden zijn correct ingevuld.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Versturen",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Geen bestand gekozen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Naar boven gaan",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Naar beneden verplaatsen",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Aan het laden...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Meer laden",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Vervolgens",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Voorgaand",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Alle waarden toevoegen",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Geselecteerde waarden toevoegen",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Alle waarden verwijderen",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Geselecteerde waarden verwijderen",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Kies een datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Datum wijzigen",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "De geselecteerde datum is ongeldig."
};
var validation$g = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Accepteer de ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moet na ${date2(args[0])} zijn.`;
    }
    return `${sentence(name)} moet in de toekomst liggen.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mag alleen alfabetische tekens bevatten.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mag alleen letters en cijfers bevatten.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mag alleen letters en spaties bevatten.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} moet alfabetische tekens bevatten.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} moet letters of cijfers bevatten.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} moet letters of spaties bevatten.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} moet een symbool bevatten.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} moet hoofdletters bevatten.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} moet kleine letters bevatten.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} moet cijfers bevatten.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} moet een symbool zijn.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} mag alleen hoofdletters bevatten.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} mag alleen kleine letters bevatten.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moet vóór ${date2(args[0])} vallen.`;
    }
    return `${sentence(name)} moet in het verleden liggen.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dit veld is onjuist geconfigureerd en kan niet worden verzonden.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} moet tussen ${a} en ${b} liggen.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} komt niet overeen.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is geen geldige datum, gebruik de notatie ${args[0]}`;
    }
    return "Dit veld is onjuist geconfigureerd en kan niet worden verzonden";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} moet tussen ${date2(args[0])} en ${date2(args[1])} liggen`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Vul een geldig e-mailadres in.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} eindigt niet met ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is geen toegestane waarde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} moet minimaal één teken zijn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} moet kleiner zijn dan of gelijk zijn aan ${max3} tekens.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} moet ${max3} tekens lang zijn.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} moet groter zijn dan of gelijk zijn aan ${min3} tekens.`;
    }
    return `${sentence(name)} moet tussen de ${min3} en ${max3} tekens bevatten.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is geen toegestane waarde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mag niet meer dan ${args[0]} ${name} hebben.`;
    }
    return `${sentence(name)} moet kleiner zijn dan of gelijk zijn aan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Geen bestandsformaten toegestaan.";
    }
    return `${sentence(name)} moet van het type: ${args[0]} zijn`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mag niet minder dan ${args[0]} ${name} hebben.`;
    }
    return `${sentence(name)} moet minimaal ${args[0]} zijn.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" is geen toegestane ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} moet een getal zijn.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" of ")} is vereist.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is verplicht.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} begint niet met ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Voer een geldige URL in.`;
  }
};
var nl = Object.freeze({
  __proto__: null,
  ui: ui$g,
  validation: validation$g
});
var ui$f = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Usuń",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Usuń wszystko",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Nie wszystkie pola zostały wypełnione poprawnie.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Wyślij",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nie wybrano pliku",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Przesuń w górę",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Przesuń w dół",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Ładowanie...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Załaduj więcej",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Kolejny",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Poprzednia",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Dodaj wszystkie wartości",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Dodaj wybrane wartości",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Usuń wszystkie wartości",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Usuń wybrane wartości",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Wybierz datę",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Zmień datę",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Wybrana data jest nieprawidłowa."
};
var validation$f = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Proszę zaakceptować ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musi być po ${date2(args[0])}.`;
    }
    return `${sentence(name)} musi być w przyszłości.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Pole ${sentence(name)} może zawierać tylko znaki alfabetyczne.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Pole ${sentence(name)} może zawierać tylko znaki alfanumeryczne.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `Pole ${sentence(name)} mogą zawierać tylko litery i spacje.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} musi zawierać znaki alfabetyczne.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} musi zawierać litery lub cyfry.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} musi zawierać litery lub spacje.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} musi zawierać symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} musi zawierać wielkie litery.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} musi zawierać małe litery.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} musi zawierać liczby.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} musi być symbolem.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} może zawierać tylko wielkie litery.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} może zawierać tylko małe litery.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musi być przed ${date2(args[0])}.`;
    }
    return `${sentence(name)} musi być w przeszłości.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Pole zostało wypełnione niepoprawnie i nie może zostać wysłane.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Wartość pola ${sentence(name)} musi być pomiędzy ${a} i ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nie pokrywa się.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Wartość pola ${sentence(name)} nie jest poprawną datą, proszę użyć formatu ${args[0]}`;
    }
    return "To pole zostało wypełnione niepoprawnie i nie może zostać wysłane";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Data w polu ${sentence(name)} musi być pomiędzy ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Proszę wpisać poprawny adres email.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Pole ${sentence(name)} nie kończy się na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Pole ${sentence(name)} nie jest dozwoloną wartością.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Pole ${sentence(name)} musi posiadać minimum jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `Pole ${sentence(name)} musi zawierać ${max3} lub mniej znaków.`;
    }
    if (min3 && max3 === Infinity) {
      return `Pole ${sentence(name)} musi zawierać ${min3} lub więcej znaków.`;
    }
    if (min3 === max3) {
      return `Pole ${sentence(name)} musi mieć ${min3} znaków.`;
    }
    return `Pole ${sentence(name)} musi mieć ${min3}-${max3} znaków.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Pole ${sentence(name)} zawiera niedozwolone znaki.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nie można mieć więcej niż ${args[0]} ${name}.`;
    }
    return `Wartość pola ${sentence(name)} musi być mniejsza lub równa ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nie podano dozwolonych typów plików.";
    }
    return `${sentence(name)} musi być typem: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Musisz podać więcej niż ${args[0]} ${name}.`;
    }
    return ` Musisz podać conajmniej ${args[0]} ${sentence(name)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name }) {
    return `Wartość pola ${name} jest niedozwolona.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musi być numerem.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" lub ")} wymagany jest.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Pole ${sentence(name)} jest wymagane.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Wartośc pola ${sentence(name)} nie zaczyna się od ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Wprowadź prawidłowy adres URL.`;
  }
};
var pl = Object.freeze({
  __proto__: null,
  ui: ui$f,
  validation: validation$f
});
var ui$e = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Incluir",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Remover",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Remover todos",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Desculpe, alguns campos não foram preenchidos corretamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Enviar",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nenhum arquivo selecionado.",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mover para cima",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mover para baixo",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Carregando...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Carregar mais",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Próximo",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Anterior",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Adicione todos os valores",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Adicionar valores selecionados",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Remover todos os valores",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Remover valores selecionados",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Escolha a data",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Data da alteração",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "A data selecionada é inválida."
};
var validation$e = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Por favor aceite o ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} precisa ser depois de ${date2(args[0])}.`;
    }
    return `${sentence(name)} precisa ser no futuro.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} precisa conter apenas letras.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} pode conter apenas letras e números.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} pode conter apenas números e espaços.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} deve conter caracteres alfabéticos.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} deve conter letras ou números.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} deve conter letras ou espaços.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} deve conter um símbolo.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} deve conter letras maiúsculas.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} deve conter letras minúsculas.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} deve conter números.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} deve ser um símbolo.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} só pode conter letras maiúsculas.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} só pode conter letras minúsculas.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} precisa ser antes de ${date2(args[0])}.`;
    }
    return `${sentence(name)} precisa ser no passado.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Este campo não foi configurado corretamente e não pode ser submetido.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} precisa ser entre ${a} e ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} não é igual.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} não é uma data válida, por favor use este formato ${args[0]}`;
    }
    return "Este campo não foi configurado corretamente e não pode ser submetido.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} precisa ser entre ${date2(args[0])} e ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Por favor, insira um endereço de email válido.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} não termina com ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} não é um valor permitido.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} precisa conter ao menos um caractere.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} precisa ser menor ou igual a ${max3} caracteres.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} precisa conter ${max3} caracteres.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} precisa ser maior ou igual a ${min3} caracteres.`;
    }
    return `${sentence(name)} precisa ter entre ${min3} e ${max3} caracteres.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} não é um valor permitido.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Não pode ter mais de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} precisa ser menor ou igual a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Não há formatos de arquivos permitidos.";
    }
    return `${sentence(name)} precisa ser do tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Não pode ter menos de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} precisa ser pelo menos ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” não é um(a) ${name} permitido(a).`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} precisa ser um número.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ou ")} é necessário.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} é obrigatório.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} não começa com ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Por favor, insira uma url válida.`;
  }
};
var pt = Object.freeze({
  __proto__: null,
  ui: ui$e,
  validation: validation$e
});
var ui$d = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Adăugare",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Elimină",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Elimină tot",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pare rău, unele câmpuri nu sunt corect completate.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Trimite",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nu este selectat nici un fișier",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mutare în sus",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mutare în jos",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Se încarcă...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Încărcați mai mult",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Urmatorul",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Precedent",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Adăugați toate valorile",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Adăugarea valorilor selectate",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Eliminați toate valorile",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Eliminați valorile selectate",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Alege data",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Modificați data",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Data selectată este nevalidă."
};
var validation$d = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Te rog acceptă ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} trebuie să fie după ${date2(args[0])}.`;
    }
    return `${sentence(name)} trebuie sa fie în viitor.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} poate conține doar caractere alafetice.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} poate conține doar litere și numere.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} poate conține doar litere și spații.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} trebuie să conțină caractere alfabetice.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} trebuie să conțină litere sau numere.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} trebuie să conțină litere sau spații.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} trebuie să conțină simbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} trebuie să conțină majuscule.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} trebuie să conțină litere mici.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} trebuie să conțină numere.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} trebuie să fie un simbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} poate conține doar litere mari.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} poate conține doar litere mici.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} trebuie să preceadă ${date2(args[0])}.`;
    }
    return `${sentence(name)} trebuie să fie în trecut.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Câmpul a fost configurat incorect și nu poate fi trimis.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} trebuie să fie între ${a} și ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nu se potrivește.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nu este validă, te rog foloște formatul ${args[0]}`;
    }
    return "Câmpul a fost incorect configurat și nu poate fi trimis.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} trebuie să fie între ${date2(args[0])} și ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Te rog folosește o adresă de email validă.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nu se termină cu ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nu este o valoare acceptată.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} trebuie sa conțină cel puțin un caracter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} trebuie sa aibă cel mult ${max3} caractere.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ar trebui să aibă ${max3} caractere lungi.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} trebuie să aibă cel puțin ${min3} caractere.`;
    }
    return `${sentence(name)} trebuie să aibă între ${min3} și ${max3} caractere.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nu este o valoare acceptată.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nu poate avea mai mult decat ${args[0]} ${name}.`;
    }
    return `${sentence(name)} trebuie să fie cel mult egal cu ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Tipul de fișier neacceptat.";
    }
    return `${sentence(name)} trebuie să fie de tipul: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nu poate avea mai puțin decât ${args[0]} ${name}.`;
    }
    return `${sentence(name)} trebuie să fie cel puțin ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nu este o valoare acceptă pentru ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} trebuie să fie un număr.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" sau ")} este necesar.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} este necesar.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nu începe cu ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Introduceți o adresă URL validă.`;
  }
};
var ro = Object.freeze({
  __proto__: null,
  ui: ui$d,
  validation: validation$d
});
var ui$c = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Добавить",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Удалить",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Убрать все",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Извините, не все поля заполнены верно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Отправить",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Файл не выбран",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Переместить вверх",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Переместить вниз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Загрузка...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Загрузить больше",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Следующий",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Предыдущий",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Добавить все значения",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Добавить выбранные значения",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Удалить все значения",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Удалить выбранные значения",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Выберите дату",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Изменить дату",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Выбранная дата недействительна."
};
var validation$c = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Пожалуйста, примите ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} должна быть позже ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} должна быть в будущем.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Поле ${sentence(name)} может содержать только буквы.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Поле ${sentence(name)} может содержать только буквы и цифры.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} могут содержать только буквы и пробелы.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} должен содержать алфавитные символы.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} должен содержать буквы или цифры.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} должно содержать буквы или пробелы.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} должен содержать символ.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} должно содержать прописные буквы.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} должно содержать строчные буквы.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} должен содержать числа.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} должен быть символом.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} может содержать только прописные буквы.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} может содержать только буквы нижнего регистра.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} должна быть раньше ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} должна быть в прошлом.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Это поле заполнено неверно и не может быть отправлено.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Поле ${sentence(name)} должно быть между ${a} и ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `Поле ${sentence(name)} не совпадает.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Поле ${sentence(name)} имеет неверную дату. Пожалуйста, используйте формат ${args[0]}`;
    }
    return "Это поле заполнено неверно и не может быть отправлено.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Дата ${sentence(name)} должна быть между ${date2(args[0])} и ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Пожалуйста, введите действительный электронный адрес.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Поле ${sentence(name)} не должно заканчиваться на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Поле ${sentence(name)} имеет неподустимое значение.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Поле ${sentence(name)} должно содержать минимум один символ.`;
    }
    if (min3 == 0 && max3) {
      return `Длина поля ${sentence(name)} должна быть меньше или равна ${max3} символам.`;
    }
    if (min3 === max3) {
      return `Длина ${sentence(name)} должна составлять ${max3} символов.`;
    }
    if (min3 && max3 === Infinity) {
      return `Длина поля ${sentence(name)} должна быть больше или равна ${min3} символам.`;
    }
    return `Длина поля ${sentence(name)} должна быть между ${min3} и ${max3} символами.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Поле ${sentence(name)} имеет недопустимое значение.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не может быть выбрано больше, чем ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} должно быть меньше или равно ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не указаны поддержиавемые форматы файла.";
    }
    return `Формат файла в поле ${sentence(name)} должен быть: ${args[0]}.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не может быть выбрано меньше, чем ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} должно быть не менее, чем ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” не поддерживается в поле ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Поле ${sentence(name)} должно быть числом.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" или ")} требуется.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Поле ${sentence(name)} обязательно для заполнения.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Поле ${sentence(name)} должно начинаться с ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Пожалуйста, введите действительный URL-адрес.`;
  }
};
var ru = Object.freeze({
  __proto__: null,
  ui: ui$c,
  validation: validation$c
});
var ui$b = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Pridať",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odstrániť",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odstrániť všetko",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Prepáčte, ale nie všetky polia sú vyplnené správne.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Odoslať",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nebol vybraný žiadny súbor",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Posunúť hore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Posunúť dole",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Načítavanie...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Načítať viac",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Ďalšie",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Predošlý",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Pridajte všetky hodnoty",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Pridajte vybrané hodnoty",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Odstrániť všetky hodnoty",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Odstrániť vybrané hodnoty",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Vyberte dátum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Zmena dátumu",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Vybraný dátum je neplatný."
};
var validation$b = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosím zaškrtnite ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí byť za ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí byť v budúcnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená a čísla.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená a medzery.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} musí obsahovať abecedné znaky.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} musí obsahovať písmená alebo číslice.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} musí obsahovať písmená alebo medzery.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} musí obsahovať symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} musí obsahovať veľké písmená.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} musí obsahovať malé písmená.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} musí obsahovať čísla.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} musí byť symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} môže obsahovať iba veľké písmená.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} môže obsahovať len malé písmená.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí byť pred ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí byť v minulosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Toto pole bolo nesprávne nakonfigurované a nemôže byť odoslané.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} musí byť medzi ${a} and ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} does not match.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nie je platným dátumom, prosím, použite formát ${args[0]}`;
    }
    return "Toto pole bolo nesprávne nakonfigurované a nemôže byť odoslané.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} musí byť medzi ${date2(args[0])} a ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Prosím, zadajte platnú emailovú adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nekončí na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nie je povolená hodnota.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} musí mať najmenej jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} musí byť menšie alebo rovné ako ${max3} znakov.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} by mala mať dĺžku ${max3} znakov.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} musí byť väčšie alebo rovné ako ${min3} znakov.`;
    }
    return `${sentence(name)} musí byť medzi ${min3} až ${max3} znakov.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nie je povolená hodnota.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nie je možné použiť viac než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí byť menšie alebo rovné ako ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nie sú povolené formáty súborov.";
    }
    return `${sentence(name)} musí byť typu: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nemôže byť menej než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí byť minimálne ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nie je povolené hodnota pre ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musí byť číslo.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" alebo ")} je potrebný.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je povinné.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nezačíná s ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Zadajte platnú adresu URL.`;
  }
};
var sk = Object.freeze({
  __proto__: null,
  ui: ui$b,
  validation: validation$b
});
var ui$a = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odstrani",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odstrani vse",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Nekatera polja niso pravilno izpolnjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Pošlji",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nobena datoteka ni izbrana",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Premakni se navzgor",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Premakni se navzdol",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Nalaganje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Naloži več",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Naslednji",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Prejšnji",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Dodajte vse vrednosti",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Dodajanje izbranih vrednosti",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Odstranite vse vrednosti",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Odstrani izbrane vrednosti",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Izberite datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Spremeni datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Izbrani datum je neveljaven."
};
var validation$a = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosimo popravite ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti po ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti v prihodnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} lahko vsebuje samo znake abecede.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} lahko vsebuje samo črke in številke.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} lahko vsebuje samo črke in presledke.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} mora vsebovati abecedne znake.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} mora vsebovati črke ali številke.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} mora vsebovati črke ali presledke.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} mora vsebovati simbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} mora vsebovati velike črke.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} mora vsebovati male črke.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} mora vsebovati številke.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} mora biti simbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} lahko vsebuje le velike črke.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} lahko vsebuje le male črke.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti pred ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti v preteklosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `To polje je narobe nastavljeno in ne mora biti izpolnjeno.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} mora biti med ${a} in ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} se ne ujema.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ni pravilen datum, prosimo uporabite format ${args[0]}`;
    }
    return "To polje je narobe nastavljeno in ne mora biti izpolnjeno.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti med ${date2(args[0])} in ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Vnesite veljaven e-poštni naslov.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} se mora kočati z ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ni dovoljena vrednost.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora vsebovati vsaj en znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora vsebovati največ ${max3} znakov.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} mora biti dolg ${max3} znakov.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora vsebovati vsaj ${min3} znakov.`;
    }
    return `${sentence(name)} mora vsebovati med ${min3} in ${max3} znakov.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ni dovoljena vrednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Največ je ${args[0]} ${name}.`;
    }
    return `${sentence(name)} je lahko največ ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nobena vrsta datoteke ni dovoljena.";
    }
    return `${sentence(name)} mora biti tipa: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Najmanj ${args[0]} ${name} je dovoljenih.`;
    }
    return `${sentence(name)} mora biti vsaj ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ni dovoljen(a/o) ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti številka.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ali ")} zahtevan je.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je zahtevan(o/a).`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} se mora začeti z ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Vnesite veljaven URL.`;
  }
};
var sl = Object.freeze({
  __proto__: null,
  ui: ui$a,
  validation: validation$a
});
var ui$9 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ukloni",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ukloni sve",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pojedina polja nisu ispravno ispunjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Pošalji",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Fajl nije odabran",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pomerite se gore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pomeri se dole",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Učitavanje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Učitaj više",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Sledeća",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Prethodna",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Dodajte sve vrednosti",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Dodajte izabrane vrednosti",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Uklonite sve vrednosti",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Uklonite izabrane vrednosti",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Izaberite datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Promenite datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Izabrani datum je nevažeći."
};
var validation$9 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Molimo prihvatite ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti posle ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u budućnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} može da sadrži samo abecedne znakove.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} može da sadrži samo slova i brojeve.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} može da sadrži samo slova i razmake.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} mora da sadrži abecedne znakove.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} mora da sadrži slova ili brojeve.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} mora da sadrži slova ili razmake.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} mora da sadrži simbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} mora da sadrži velika slova.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} mora da sadrži mala slova.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} mora da sadrži brojeve.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} mora biti simbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} može da sadrži samo velika slova.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} može da sadrži samo mala slova.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti pre ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u prošlosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ovo polje je pogrešno konfigurisano i ne može se poslati.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} mora biti između ${a} i ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} se ne podudara.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nije važeći datum, molimo Vas koristite format ${args[0]}`;
    }
    return "Ovo polje je pogrešno konfigurisano i ne može se poslati";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti između ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Unesite ispravnu e-mail adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} se ne završava sa ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nije dozvoljena vrednost`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora biti najmanje jedan karakter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora biti manji ili jednaki od ${max3} karaktera.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} treba da bude ${max3} znakova dugačak.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora biti veći ili jednaki od ${min3} karaktera.`;
    }
    return `${sentence(name)} mora biti između ${min3} i ${max3} karaktera.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nije dozvoljena vrednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne može imati više od ${args[0]} ${name}.`;
    }
    return `${sentence(name)} mora biti manji ili jednaki od ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nisu dozvoljeni formati datoteka.";
    }
    return `${sentence(name)} mora biti tipa: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne može imati manje od ${args[0]} ${name}.`;
    }
    return `${sentence(name)} mora da ima najmanje ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nije dozvoljeno ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti broj.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" или ")} потребан је.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je obavezno polje.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne počinje sa ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Unesite važeću URL adresu.`;
  }
};
var sr = Object.freeze({
  __proto__: null,
  ui: ui$9,
  validation: validation$9
});
var ui$8 = {
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ta bort",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ta bort alla",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Tyvärr är inte alla fält korrekt ifyllda",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Skicka",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen fil vald",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flytta upp",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flytta ner",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Laddar...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Ladda mer",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Nästa",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Föregående",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Lägg till alla värden",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Lägg till valda värden",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Ta bort alla värden",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Ta bort valda värden",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Välj datum",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Ändra datum",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Det valda datumet är ogiltigt."
};
var validation$8 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Var god acceptera ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} måste vara efter ${date2(args[0])}.`;
    }
    return `${sentence(name)} måste vara framåt i tiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan enbart innehålla bokstäver i alfabetet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan bara innehålla bokstäver och siffror.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan bara innehålla bokstäver och blanksteg.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} måste innehålla alfabetiska tecken.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} måste innehålla bokstäver eller siffror.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} måste innehålla bokstäver eller mellanslag.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} måste innehålla symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} måste innehålla versaler.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} måste innehålla gemener.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} måste innehålla siffror.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} måste vara en symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} kan bara innehålla versaler.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} kan bara innehålla små bokstäver.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} måste vara före ${date2(args[0])}.`;
    }
    return `${sentence(name)} måste vara bakåt i tiden.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Det här fältet ställdes inte in korrekt och kan inte användas.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} måste vara mellan ${a} och ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} matchar inte.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} är inte ett giltigt datum, var god använd formatet ${args[0]}`;
    }
    return "Det här fältet ställdes inte in korrekt och kan inte användas";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} måste vara mellan ${date2(args[0])} och ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Var god fyll i en giltig e-postadress.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutar inte med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} är inte ett godkänt värde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} måste ha minst ett tecken.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} måste vara ${max3} tecken eller färre.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} bör vara ${max3} tecken långa.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} måste vara ${min3} tecken eller fler.`;
    }
    return `${sentence(name)} måste vara mellan ${min3} och ${max3} tecken.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} är inte ett godkänt värde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan inte ha mer än ${args[0]} ${name}.`;
    }
    return `${sentence(name)} måste vara ${args[0]} eller mindre.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Inga filtyper tillåtna.";
    }
    return `${sentence(name)} måste vara av filtypen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan inte ha mindre än ${args[0]} ${name}.`;
    }
    return `${sentence(name)} måste vara minst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” är inte ett godkänt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} måste vara en siffra.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" eller ")} krävs.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} är obligatoriskt.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} börjar inte med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Ange en giltig URL.`;
  }
};
var sv = Object.freeze({
  __proto__: null,
  ui: ui$8,
  validation: validation$8
});
var ui$7 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Илова кардан",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Хориҷ кардан",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ҳамаро хориҷ кунед",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Бубахшед, на ҳама майдонҳо дуруст пур карда шудаанд.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Пешниҳод кунед",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ягон файл интихоб нашудааст",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Ба боло ҳаракат кунед",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Ба поён ҳаракат кунед",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Дар ҳоли боргузорӣ",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Бештар бор кунед",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Баъдӣ",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Гузашта",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Ҳама арзишҳоро илова кунед",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Илова кардани арзишҳои интихобшуда",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Ҳама арзишҳоро хориҷ кунед",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Арзишҳои интихобшударо хориҷ кунед",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Сана интихоб кунед",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Тағйир додани сана",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Санаи интихобшуда нодуруст аст."
};
var validation$7 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Лутфан ${name}-ро қабул кунед`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бояд пас аз ${date2(args[0])} бошад.`;
    }
    return `${sentence(name)} бояд дар оянда бошад.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} метавонад танҳо аломатҳои алифборо дар бар гирад.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} метавонад танҳо ҳарфҳо ва рақамҳоро дар бар гирад.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} метавонад танҳо ҳарфҳо ва фосилаҳоро дар бар гирад.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} must contain alphabetical characters.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} must contain letters and numbers.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} must contain letters and spaces.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} must contain symbol.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} must contain uppercase.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} must contain lowercase.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} must contain number.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} can only contain symbol.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} can only contain uppercase.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} can only contain lowercase.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бояд пеш аз ${date2(args[0])} бошад.`;
    }
    return `${sentence(name)} бояд дар гузашта бошад.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ин майдон нодуруст танзим шудааст ва онро пешниҳод кардан ғайриимкон аст.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} бояд дар байни ${a} ва ${b} бошад.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} мувофиқат намекунад.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} санаи дуруст нест, лутфан формати ${args[0]}-ро истифода баред`;
    }
    return "Ин майдон нодуруст танзим шудааст ва онро пешниҳод кардан ғайриимкон аст";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} бояд дар байни ${date2(args[0])} ва ${date2(args[1])} бошад`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Лутфан нишонаи имейли амалкунандаро ворид намоед.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} бо ${list2(args)} ба охир намерасад.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} арзиши иҷозатдодашуда нест.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} бояд ҳадди аққал як аломат бошад.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} бояд аз ${max3} аломат камтар ё баробар бошад.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} бояд ${max3} аломат бошад.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} бояд аз ${min3} аломат зиёд ё баробар бошад.`;
    }
    return `${sentence(name)} бояд дар байни ${min3} ва ${max3} аломат бошад.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} арзиши иҷозатдодашуда нест.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Зиёда аз ${args[0]} ${name} дошта наметавонад.`;
    }
    return `${sentence(name)} бояд аз ${args[0]} камтар ё баробар бошад.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ягон формати файл иҷозат дода намешавад.";
    }
    return `${sentence(name)} бояд чунин намуд бошад: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Камтар аз ${args[0]} ${name} дошта наметавонад.`;
    }
    return `${sentence(name)} бояд ҳадди аққал ${args[0]} бошад.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" ${name} иҷозат дода намешавад.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} бояд рақам бошад.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" ё ")} зарур а`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} лозим аст.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} бо ${list2(args)} оғоз намешавад.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Лутфан URL-и дурустро дохил кунед.`;
  }
};
var tg = Object.freeze({
  __proto__: null,
  ui: ui$7,
  validation: validation$7
});
var ui$6 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "เพิ่ม",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "เอาออก",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "เอาออกทั้งหมด",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "ขออภัย ข้อมูลบางช่องที่กรอกไม่ถูกต้อง",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "ส่ง",
  /**
   * Shown when no files are selected.
   */
  noFiles: "ยังไม่ได้เลือกไฟล์",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "เลื่อนขึ้น",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "เลื่อนลง",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "กำลังโหลด...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "โหลดเพิ่มเติม",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "ถัดไป",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "ก่อนหน้า",
  /**
   * Shown when adding all values.
   */
  addAllValues: "เพิ่มค่าทั้งหมด",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "เพิ่มค่าที่เลือก",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "ลบค่าทั้งหมด",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "ลบค่าที่เลือก",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "เลือกวันที่",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "เปลี่ยนวันที่",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "วันที่ที่เลือกไม่ถูกต้อง"
};
var validation$6 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `กรุณายอมรับ ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} จะต้องเป็นวันที่หลังจาก ${date2(args[0])}`;
    }
    return `${sentence(name)} จะต้องเป็นวันที่ที่ยังไม่มาถึง`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรเท่านั้น`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรและตัวเลขเท่านั้น`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรและเว้นวรรคเท่านั้น`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} ต้องมีตัวอักษรตัวอักษร`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} ต้องมีตัวอักษรหรือตัวเลข`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} ต้องมีตัวอักษรหรือช่องว่าง`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} ต้องมีสัญลักษณ์`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} ต้องมีตัวพิมพ์ใหญ่`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} ต้องมีตัวพิมพ์เล็ก`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} ต้องมีตัวเลข`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} จะต้องเป็นสัญลักษณ์`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} เท่านั้นที่สามารถมีตัวอักษรตัวพิมพ์ใหญ่`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} เท่านั้นที่สามารถมีตัวอักษรตัวพิมพ์เล็ก`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} จะต้องเป็นวันที่ที่มาก่อน ${date2(args[0])}`;
    }
    return `${sentence(name)} จะต้องเป็นวันที่ที่ผ่านมาแล้ว`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `ช่องนี้ถูกตั้งค่าอย่างไม่ถูกต้อง และจะไม่สามารถส่งข้อมูลได้`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} จะต้องเป็นค่าระหว่าง ${a} และ ${b}`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ไม่ตรงกัน`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ไม่อยู่ในรูปแบบวันที่ที่ถูกต้อง กรุณากรอกตามรูปแบบ ${args[0]}`;
    }
    return "ช่องนี้ถูกตั้งค่าอย่างไม่ถูกต้อง และจะไม่สามารถส่งข้อมูลได้";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} จะต้องเป็นวันที่ระหว่าง ${date2(args[0])} และ ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "กรุณากรอกที่อยู่อีเมลทีถูกต้อง",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} จะต้องลงท้ายด้วย ${list2(args)}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ไม่ใช่ค่าที่อนุญาตให้กรอก`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} จะต้องมีความยาวอย่างน้อยหนึ่งตัวอักษร`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} จะต้องมีความยาวไม่เกิน ${max3} ตัวอักษร`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ควรจะเป็น ${max3} ตัวอักษรยาว`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} จะต้องมีความยาว ${min3} ตัวอักษรขึ้นไป`;
    }
    return `${sentence(name)} จะต้องมีความยาวระหว่าง ${min3} และ ${max3} ตัวอักษร`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ไม่ใช่ค่าที่อนุญาตให้กรอก`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `ไม่สามารถเลือกมากกว่า ${args[0]} ${name} ได้`;
    }
    return `${sentence(name)} จะต้องมีค่าไม่เกิน ${args[0]}`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "ไม่มีประเภทของไฟล์ที่อนุญาต";
    }
    return `${sentence(name)} จะต้องเป็นไฟล์ประเภท ${args[0]} เท่านั้น`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `ไม่สามารถเลือกน้อยกว่า ${args[0]} ${name} ได้`;
    }
    return `${sentence(name)} จะต้องมีค่าอย่างน้อย ${args[0]}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ไม่ใช่ค่า ${name} ที่อนุญาตให้กรอก`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} จะต้องเป็นตัวเลขเท่านั้น`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" หรือ ")} ต้องการ.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `กรุณากรอก ${sentence(name)}`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} จะต้องเริ่มต้นด้วย ${list2(args)}`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `กรุณาระบุที่อยู่ลิงก์ให้ถูกต้อง`;
  }
};
var th = Object.freeze({
  __proto__: null,
  ui: ui$6,
  validation: validation$6
});
var ui$5 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Ekle",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Kaldır",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hepsini kaldır",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Maalesef, tüm alanlar doğru doldurulmadı.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Gönder",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Dosya yok",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Yukarı Taşı",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Aşağı taşı",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yükleniyor...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Daha fazla yükle",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Sonraki",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Önceki",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Tüm değerleri ekle",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Seçili değerleri ekle",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Tüm değerleri kaldır",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Seçili değerleri kaldır",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Tarih seçin",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Tarihi değiştir",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Seçilen tarih geçersiz."
};
var validation$5 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Lütfen ${name}'yi kabul edin.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])}'den sonra olmalıdır.`;
    }
    return `${sentence(name)} gelecekte bir zaman olmalıdır.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} sadece alfabetik karakterler içerebilir.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} sadece alfabetik karakterler ve sayı içerebilir.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} yalnızca harf ve boşluk içerebilir.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} alfabetik karakterler içermelidir.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} harf veya rakamı içermelidir.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} harf veya boşluk içermelidir.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} sembol içermelidir.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} büyük harf içermelidir.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} küçük harf içermelidir.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} sayı içermelidir.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} bir sembol olmalıdır.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} yalnızca büyük harfler içerebilir.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} yalnızca küçük harfler içerebilir.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} tarihinden önce olmalı.`;
    }
    return `${sentence(name)} geçmişte olmalı.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Alan yanlış yapılandırılmış ve gönderilemez.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} ve ${b} aralığında olmalı.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} eşleşmiyor.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} geçerli bir tarih değil, lütfen ${args[0]} biçimini kullanın.`;
    }
    return "Alan yanlış yapılandırılmış ve gönderilemez.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}, ${date2(args[0])} ve ${date2(args[1])} aralığında olmalı.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Lütfen geçerli bir e-mail adresi girin.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ile bitmiyor.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} izin verilen bir değer değil.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} en azından bir karakter uzunluğunda olmalı.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3}'e eşit veya daha küçük olmalı.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} karakter uzunluğunda olmalıdır.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3}'e eşit veya daha büyük olmalı.`;
    }
    return `${sentence(name)}, ${min3} ve ${max3} karakter uzunluğu aralığında olmalı.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} izin verilen bir değer değil.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}'in uzunluğu ${args[0]}'dan daha uzun olamaz.`;
    }
    return `${sentence(name)} en azından ${args[0]} uzunluğunda veya ona eşit olmalı.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Hiçbir dosya türüne izin verilmez.";
    }
    return `${sentence(name)} şu tiplerden biri olmalı: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}'in uzunluğu ${args[0]}'dan daha kısa olamaz.`;
    }
    return `${sentence(name)} en azından ${args[0]} uzunluğunda olmalı.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ${name} olamaz.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} sayı olmalı.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" veya ")} gereklidir.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} gerekli.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ile başlamıyor.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Lütfen geçerli bir URL girin.`;
  }
};
var tr = Object.freeze({
  __proto__: null,
  ui: ui$5,
  validation: validation$5
});
var ui$4 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Додати",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Видалити",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Видалити все",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Вибачте, не всі поля заповнені правильно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Відправити",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Файл не вибрано",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Рухатися вгору",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Пересунути вниз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Завантаження...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Завантажте більше",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Наступний",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Попередній",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Додати всі значення",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Додати вибрані значення",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Вилучити всі значення",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Вилучити вибрані значення",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Виберіть дату",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Змінити дату",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Вибрана дата недійсна."
};
var validation$4 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Будь ласка, прийміть ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} повинна бути пізніше за ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} має бути в майбутньому.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Поле ${sentence(name)} може містити лише літери.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Поле ${sentence(name)} може містити лише літери та цифри.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `Поле ${sentence(name)} може містити лише літери та пробіли.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} повинен містити алфавітні символи.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} повинен містити букви або цифри.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} повинен містити літери або пробіли.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} повинен містити символ.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} повинен містити великі регістри.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} повинен містити малі регістри.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} повинен містити цифри.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} має бути символом.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} може містити лише великі літери.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} може містити лише малі літери.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} повинна бути раніше за ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} повинна бути в минулому.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Це поле заповнено неправильно і не може бути надіслано.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Поле ${sentence(name)} повинно бути між ${a} та ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `Поле ${sentence(name)} не збігається.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Поле ${sentence(name)} має неправильну дату. Будь ласка, використовуйте формат ${args[0]}.`;
    }
    return "Це поле заповнено неправильно і не може бути надіслано.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Дата ${sentence(name)} повинна бути між ${date2(args[0])} та ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Будь ласка, введіть дійсну електронну адресу.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Поле ${sentence(name)} не повинно закінчуватися на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Поле ${sentence(name)} має неприпустиме значення.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Поле ${sentence(name)} має містити щонайменше один символ.`;
    }
    if (min3 == 0 && max3) {
      return `Довжина поля ${sentence(name)} повинна бути меншою або дорівнювати ${max3} символам.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} має бути довжиною ${max3} символів.`;
    }
    if (min3 && max3 === Infinity) {
      return `Довжина поля ${sentence(name)} повинна бути більшою або дорівнювати ${min3} символам.`;
    }
    return `Довжина поля ${sentence(name)} повинна бути між ${min3} та ${max3} символами.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Поле ${sentence(name)} має неприпустиме значення.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може бути вибрано більше ніж ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} має бути менше або дорівнювати ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не вказано дозволені типи файлів.";
    }
    return `Тип файлу в полі ${sentence(name)} має бути: ${args[0]}.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може бути вибрано менше ніж ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} має бути не менше ніж ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” не дозволено в полі ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Поле ${sentence(name)} має бути числом.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" або ")} потрібно.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Поле ${sentence(name)} є обов'язковим.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Поле ${sentence(name)} має починатися з ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Будь ласка, введіть коректну URL-адресу.`;
  }
};
var uk = Object.freeze({
  __proto__: null,
  ui: ui$4,
  validation: validation$4
});
var ui$3 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Qo'shish",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "O'chirish",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hammasini o'chirish",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Kechirasiz, barcha maydonlar to'g'ri to'ldirilmagan.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Yuborish",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Hech qanday fayl tanlanmagan",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Yuqoriga ko’taring",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pastga siljish",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yuklanmoqda...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Ko’proq yuklang",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Keyingi",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Oldingi",
  /**
   * Shown when adding all values.
   */
  addAllValues: `Barcha qiymatlarni qo'shish`,
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: `Tanlangan qiymatlarni qoʻshish`,
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Barcha qiymatlarni olib tashlang",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Tanlangan qiymatlarni olib tashlash",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Sanani tanlang",
  /**
   * Shown when there is a date to change.
   */
  changeDate: `O'zgartirish sanasi`,
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Tanlangan sana yaroqsiz."
};
var validation$3 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} ni qabul qiling.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} dan keyin bo'lishi kerak.`;
    }
    return `${sentence(name)} kelajakda bo'lishi kerak.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} faqat alifbo tartibidagi belgilardan iborat bo'lishi mumkin.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} faqat harflar va raqamlardan iborat bo'lishi mumkin.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} faqat harf va bo'shliqlardan iborat bo'lishi mumkin.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} alfavit belgilarini o'z ichiga olishi kerak.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} harflar yoki raqamlarni o'z ichiga olishi kerak.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} harflar yoki bo'shliqlar bo'lishi kerak.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} belgisi bo'lishi kerak.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} katta harfni o'z ichiga olishi kerak.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} kichik harflarni o'z ichiga olishi kerak.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} raqamlarini o'z ichiga olishi kerak.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} belgisi bo'lishi kerak.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} faqat katta harflarni o'z ichiga olishi mumkin.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} faqat kichik harflarni o'z ichiga olishi mumkin.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} dan oldin bo'lishi kerak`;
    }
    return `${sentence(name)} o'tmishda bo'lishi kerak.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Bu maydon noto'g'ri sozlangan va uni yuborib bo'lmaydi.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} va ${b} orasida bo'lishi kerak.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} mos emas.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} haqiqiy sana emas, iltimos ${args[0]} formatidan foydalaning`;
    }
    return "Bu maydon noto'g'ri sozlangan va uni yuborib bo'lmaydi";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])} va ${date2(args[1])} oralig'ida bo'lishi kerak`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Iltimos amaldagi e-mail manzilingizni kiriting.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} bilan tugamaydi.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ruxsat etilgan qiymat emas.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} kamida bitta belgidan iborat bo'lishi kerak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3} ta belgidan kam yoki teng bo'lishi kerak.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} bo'lishi kerak ${max3} belgilar uzun.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} ta belgidan ko'p yoki teng bo'lishi kerak.`;
    }
    return `${sentence(name)} ${min3} va ${max3} gacha belgilardan iborat bo'lishi kerak.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ruxsat etilgan qiymat emas.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} dan ortiq bo'lishi mumkin emas.`;
    }
    return `${sentence(name)} ${args[0]} dan kichik yoki teng bo'lishi kerak.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Fayl formatlariga ruxsat berilmagan.";
    }
    return `${sentence(name)} quyidagi turdagi bo'lishi kerak: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} dan kam bo'lmasligi kerak.`;
    }
    return `${sentence(name)} kamida ${args[0]} bo'lishi kerak.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" ruxsat berilmagan ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} raqam bo'lishi kerak.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" yoki ")} kerak.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} talab qilinadi.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} bilan boshlanmaydi.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Iltimos, tegishli URL manzilini kiriting.`;
  }
};
var uz = Object.freeze({
  __proto__: null,
  ui: ui$3,
  validation: validation$3
});
var ui$2 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Thêm",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Xoá",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Xoá tất cả",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Xin lỗi, không phải tất cả các trường đều được nhập đúng.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Gửi",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Chưa chọn file",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Di chuyển lên",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Di chuyển xuống",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Đang tải...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Tải thêm",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Tiếp",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Trước",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Thêm tất cả các giá trị",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Thêm các giá trị đã chọn",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Loại bỏ tất cả các giá trị",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Loại bỏ các giá trị đã chọn",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Chọn ngày",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Thay đổi ngày",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Ngày đã chọn không hợp lệ."
};
var validation$2 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Hãy đồng ý với ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} phải sau ${date2(args[0])}.`;
    }
    return `${sentence(name)} phải trong tương lai.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} có thể chỉ bao gồm các chữ cái alphabet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} có thể chỉ bao gồm các chữ cái và chữ số.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} chỉ có thể chứa các chữ cái và khoảng trắng.`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} phải chứa các ký tự chữ cái.`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} phải chứa chữ cái hoặc số.`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} phải chứa chữ cái hoặc dấu cách.`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} phải chứa ký hiệu.`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} phải chứa chữ hoa.`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} phải chứa chữ thường.`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} phải chứa số.`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} phải là một ký hiệu.`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} chỉ có thể chứa chữ hoa.`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} chỉ có thể chứa chữ thường.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} phải trước ${date2(args[0])}.`;
    }
    return `${sentence(name)} phải trong quá khứ.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Trường này đã được thiết lập sai và không thể gửi.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} phải ở giữa ${a} và ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} không khớp.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} không phải ngày hợp lệ, hãy sử dụng định dạng ${args[0]}`;
    }
    return "Trường này đã được thiết lập sai và không thể gửi.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} phải ở giữa khoảng từ ${date2(args[0])} đến ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Hãy nhập một địa chỉ email hợp lệ.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} không kết thúc với ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} không phải một giá trị được cho phép.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} phải có độ dài tối thiểu một ký tự.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} phải có độ dài tối đa ${max3} ký tự.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} nên dài ${max3} ký tự.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} phải có độ dài tối thiểu ${min3} ký tự.`;
    }
    return `${sentence(name)} phải có độ dài tối đa trong khoảng từ ${min3} đến ${max3} ký tự.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} không phải một giá trị được cho phép.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} không thể lớn hơn ${args[0]}.`;
    }
    return `${sentence(name)} phải tối đa bằng ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Định dạng tệp tin này không được phép.";
    }
    return `${sentence(name)} phải là một trong các dạng: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} không thể nhỏ hơn ${args[0]}.`;
    }
    return `${sentence(name)} phải tối thiểu bằng ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" không phải giá trị ${name} được phép.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} phải là một số.`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join(" hoặc ")} cần có.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} là bắt buộc.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} không bắt đầu với ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Vui lòng nhập một URL hợp lệ.`;
  }
};
var vi = Object.freeze({
  __proto__: null,
  ui: ui$2,
  validation: validation$2
});
var ui$1 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "添加",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "移除",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "移除全部",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "抱歉，部分字段未被正确填写。",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "提交",
  /**
   * Shown when no files are selected.
   */
  noFiles: "未选择文件",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "上移",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "下移",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "加载中...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "加载更多",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "下一步",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "上一步",
  /**
   * Shown when adding all values.
   */
  addAllValues: "添加所有值",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "添加所选值",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "移除所有值",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "移除所选值",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "选择日期",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "更改日期",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "所选日期无效。"
};
var validation$1 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `请接受${name}。`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}必须晚于${date2(args[0])}。`;
    }
    return `${sentence(name)}必须是未来的日期。`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)}只能包含英文字母。`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)}只能包含字母和数字。`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)}只能包含字母和空格。`;
  },
  /**
   * The value have no letter.
   * @see {@link https://formkit.com/essentials/validation#contains_alpha}
   */
  contains_alpha({ name }) {
    return `${sentence(name)} 必须包含字母字符`;
  },
  /**
   * The value have no alphanumeric
   * @see {@link https://formkit.com/essentials/validation#contains_alphanumeric}
   */
  contains_alphanumeric({ name }) {
    return `${sentence(name)} 必须包含字母或数字。`;
  },
  /**
   * The value have no letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#contains_alpha-spaces}
   */
  contains_alpha_spaces({ name }) {
    return `${sentence(name)} 必须包含字母或空格。`;
  },
  /**
   * The value have no symbol
   * @see {@link https://formkit.com/essentials/validation#contains_symbol}
   */
  contains_symbol({ name }) {
    return `${sentence(name)} 必须包含符号。`;
  },
  /**
   * The value have no uppercase
   * @see {@link https://formkit.com/essentials/validation#contains_uppercase}
   */
  contains_uppercase({ name }) {
    return `${sentence(name)} 必须包含大写字母。`;
  },
  /**
   * The value have no lowercase
   * @see {@link https://formkit.com/essentials/validation#contains_lowercase}
   */
  contains_lowercase({ name }) {
    return `${sentence(name)} 必须包含小写字母。`;
  },
  /**
   *  The value have no numeric
   * @see {@link https://formkit.com/essentials/validation#contains_numeric}
   */
  contains_numeric({ name }) {
    return `${sentence(name)} 必须包含数字。`;
  },
  /**
   * The value is not symbol
   * @see {@link https://formkit.com/essentials/validation#symbol}
   */
  symbol({ name }) {
    return `${sentence(name)} 必须是符号。`;
  },
  /**
   * The value is not uppercase
   * @see {@link https://formkit.com/essentials/validation#uppercase}
   */
  uppercase({ name }) {
    return `${sentence(name)} 只能包含大写字母。`;
  },
  /**
   * The value is not lowercase
   * @see {@link https://formkit.com/essentials/validation#lowercase}
   */
  lowercase({ name }) {
    return `${sentence(name)} 只能包含小写字母。`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}必须早于${date2(args[0])}。`;
    }
    return `${sentence(name)}必须是过去的日期。`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `该字段未被正确设置而无法提交。`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)}必须在${a}和${b}之间。`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)}不匹配。`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}不是合法日期，请使用 ${args[0]} 格式`;
    }
    return "该字段未被正确设置而无法提交";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}必须在${date2(args[0])}和${date2(args[1])}之间`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "请输入合法的电子邮件地址。",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)}必须以${list2(args)}结尾。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)}是不允许的。`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)}至少要有一个字符。`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)}必须少于或等于${max3}个字符。`;
    }
    if (min3 === max3) {
      return `${sentence(name)}必须包含${max3}个字符。`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)}必须多于或等于${min3}个字符。`;
    }
    return `${sentence(name)}必须介于${min3}和${max3}个字符之间。`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)}是不允许的。`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}不得多于${args[0]}个值。`;
    }
    return `${name}不得大于${args[0]}。`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "没有允许的文件格式。";
    }
    return `${sentence(name)}的类型必须为：${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}不得少于${args[0]}个值。`;
    }
    return `${sentence(name)}不得小于${args[0]}。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}"不是一个合法的${name}。`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)}必须为数字。`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join("或")}${labels}需要。`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)}不得留空。`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)}必须以${list2(args)}开头。`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `请输入有效的 URL。`;
  }
};
var zh = Object.freeze({
  __proto__: null,
  ui: ui$1,
  validation: validation$1
});
var ui = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "新增",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "移除",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "移除全部",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "很抱歉，部分欄位填寫錯誤",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "提交",
  /**
   * Shown when no files are selected.
   */
  noFiles: "尚未選取檔案",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "上移",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "下移",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "載入中...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "載入更多",
  /**
   * Show on buttons that navigate state forward
   */
  next: "下一個",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "上一個",
  /**
   * Shown when adding all values.
   */
  addAllValues: "加入全部的值",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "加入選取的值",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "移除全部的值",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "移除選取的值",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "選擇日期",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "變更日期",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "選取的日期無效"
};
var validation = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `請接受 ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} 必須晚於 ${date2(args[0])}`;
    }
    return `${sentence(name)} 必須晚於今日`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} 欄位儘能填寫英文字母`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} 欄位僅能填寫英文字母與數字`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} 欄位儘能填寫英文字母與空白`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} 必須早於 ${date2(args[0])}.`;
    }
    return `${sentence(name)} 必須早於今日`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `欄位值錯誤，無法提交`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} 必須介於 ${a} 和 ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} 與目標不一致`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} 不是有效的日期，請使用 ${args[0]} 格式`;
    }
    return "欄位值錯誤，無法提交";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} 必須介於 ${date2(args[0])} 和 ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "請輸入有效的 email",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} 的結尾必須是 ${list2(args)}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} 欄位的值不合規則`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} 欄位必須至少包含一個字`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} 的字數必須小於等於 ${max3}`;
    }
    if (min3 === max3) {
      return `${sentence(name)} 的字數必須為 ${max3}`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} 的字數必須大於等於 ${min3}`;
    }
    return `${sentence(name)} 的字數必須介於 ${min3} 和 ${max3}`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} 欄位的值無效`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `不能超過 ${args[0]} 個 ${name}.`;
    }
    return `${sentence(name)} 必須小於等於 ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "非有效的檔案格式";
    }
    return `${sentence(name)} 可接受的檔案格式為: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `不可少於 ${args[0]} 個 ${name}`;
    }
    return `${name} 必須大於等於 ${args[0]}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” 不是 ${name} 欄位可接受的值`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} 欄位必須是數字`;
  },
  /**
   * Require one field.
   * @see {@link https://formkit.com/essentials/validation#require-one}
   */
  require_one: ({ name, node, args: inputNames }) => {
    const labels = inputNames.map((name2) => {
      const dependentNode = node.at(name2);
      if (dependentNode) {
        return createMessageName(dependentNode);
      }
      return false;
    }).filter((name2) => !!name2);
    labels.unshift(name);
    return `${labels.join("或")}${labels}需要。`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} 是必要欄位`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} 的開頭必須是 ${list2(args)}`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `請輸入有效的 url`;
  }
};
var zhTW = Object.freeze({
  __proto__: null,
  ui,
  validation
});
function createI18nPlugin(registry) {
  return function i18nPlugin(node) {
    let localeKey = parseLocale(node.config.locale, registry);
    let locale = localeKey ? registry[localeKey] : {};
    node.on("prop:locale", ({ payload: lang }) => {
      localeKey = parseLocale(lang, registry);
      locale = localeKey ? registry[localeKey] : {};
      node.store.touch();
    });
    node.on("prop:label", () => node.store.touch());
    node.on("prop:validationLabel", () => node.store.touch());
    node.hook.text((fragment2, next) => {
      var _a, _b;
      const key = ((_a = fragment2.meta) === null || _a === void 0 ? void 0 : _a.messageKey) || fragment2.key;
      if (has(locale, fragment2.type) && has(locale[fragment2.type], key)) {
        const t = locale[fragment2.type][key];
        if (typeof t === "function") {
          fragment2.value = Array.isArray((_b = fragment2.meta) === null || _b === void 0 ? void 0 : _b.i18nArgs) ? t(...fragment2.meta.i18nArgs) : t(fragment2);
        } else {
          fragment2.value = t;
        }
      }
      return next(fragment2);
    });
  };
}
function parseLocale(locale, availableLocales) {
  if (has(availableLocales, locale)) {
    return locale;
  }
  const [lang] = locale.split("-");
  if (has(availableLocales, lang)) {
    return lang;
  }
  for (const locale2 in availableLocales) {
    return locale2;
  }
  return false;
}

// node_modules/.pnpm/@formkit+dev@0.19.0-ea7e008/node_modules/@formkit/dev/dist/index.mjs
var registered = false;
var errors = {
  /**
   * FormKit errors:
   */
  100: ({ data: node }) => `Only groups, lists, and forms can have children (${node.name}).`,
  101: ({ data: node }) => `You cannot directly modify the store (${node.name}). See: https://formkit.com/advanced/core#message-store`,
  102: ({ data: [node, property] }) => `You cannot directly assign node.${property} (${node.name})`,
  103: ({ data: [operator] }) => `Schema expressions cannot start with an operator (${operator})`,
  104: ({ data: [operator, expression] }) => `Schema expressions cannot end with an operator (${operator} in "${expression}")`,
  105: ({ data: expression }) => `Invalid schema expression: ${expression}`,
  106: ({ data: name }) => `Cannot submit because (${name}) is not in a form.`,
  107: ({ data: [node, value] }) => `Cannot set ${node.name} to non object value: ${value}`,
  108: ({ data: [node, value] }) => `Cannot set ${node.name} to non array value: ${value}`,
  /**
   * Input specific errors:
   */
  300: ({ data: [node] }) => `Cannot set behavior prop to overscroll (on ${node.name} input) when options prop is a function.`,
  /**
   * FormKit vue errors:
   */
  600: ({ data: node }) => `Unknown input type${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} ("${node.name}")`,
  601: ({ data: node }) => `Input definition${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} is missing a schema or component property (${node.name}).`
};
var warnings = {
  /**
   * Core warnings:
   */
  150: ({ data: fn }) => `Schema function "${fn}()" is not a valid function.`,
  151: ({ data: id2 }) => `No form element with id: ${id2}`,
  152: ({ data: id2 }) => `No input element with id: ${id2}`,
  /**
   * Input specific warnings:
   */
  350: ({ data: { node, inputType } }) => `Invalid options prop for ${node.name} input (${inputType}). See https://formkit.com/inputs/${inputType}`,
  /**
   * Vue warnings:
   */
  650: 'Schema "$get()" must use the id of an input to access.',
  651: ({ data: id2 }) => `Cannot setErrors() on "${id2}" because no such id exists.`,
  652: ({ data: id2 }) => `Cannot clearErrors() on "${id2}" because no such id exists.`,
  /**
   * Deprecation warnings:
   */
  800: ({ data: name }) => `${name} is deprecated.`
};
var decodeErrors = (error2, next) => {
  if (error2.code in errors) {
    const err = errors[error2.code];
    error2.message = typeof err === "function" ? err(error2) : err;
  }
  return next(error2);
};
if (!registered)
  errorHandler(decodeErrors);
var decodeWarnings = (warning, next) => {
  if (warning.code in warnings) {
    const warn2 = warnings[warning.code];
    warning.message = typeof warn2 === "function" ? warn2(warning) : warn2;
  }
  return next(warning);
};
if (!registered)
  warningHandler(decodeWarnings);
registered = true;

// node_modules/.pnpm/@formkit+vue@0.19.0-ea7e008_tailwindcss@3.3.3_unocss@0.55.1/node_modules/@formkit/vue/dist/index.mjs
var isServer$2 = typeof window === "undefined";
var ssrCompleteRegistry = /* @__PURE__ */ new Map();
function ssrComplete(app) {
  if (!isServer$2)
    return;
  const callbacks = ssrCompleteRegistry.get(app);
  if (!callbacks)
    return;
  for (const callback of callbacks) {
    callback();
  }
  callbacks.clear();
  ssrCompleteRegistry.delete(app);
}
function onSSRComplete(app, callback) {
  var _a;
  if (!isServer$2 || !app)
    return;
  if (!ssrCompleteRegistry.has(app))
    ssrCompleteRegistry.set(app, /* @__PURE__ */ new Set());
  (_a = ssrCompleteRegistry.get(app)) === null || _a === void 0 ? void 0 : _a.add(callback);
}
var isServer$1 = typeof window === "undefined";
var memo = {};
var memoKeys = {};
var instanceKey;
var instanceScopes = /* @__PURE__ */ new WeakMap();
var raw = "__raw__";
var isClassProp = /[a-zA-Z0-9\-][cC]lass$/;
function getRef(token2, data) {
  const value = ref(null);
  if (token2 === "get") {
    const nodeRefs = {};
    value.value = get.bind(null, nodeRefs);
    return value;
  }
  const path = token2.split(".");
  watchEffect(() => {
    value.value = getValue(isRef(data) ? data.value : data, path);
  });
  return value;
}
function getValue(set, path) {
  if (Array.isArray(set)) {
    for (const subset of set) {
      const value = subset !== false && getValue(subset, path);
      if (value !== void 0)
        return value;
    }
    return void 0;
  }
  let foundValue = void 0;
  let obj = set;
  for (const i in path) {
    const key = path[i];
    if (typeof obj !== "object" || obj === null) {
      foundValue = void 0;
      break;
    }
    const currentValue = obj[key];
    if (Number(i) === path.length - 1 && currentValue !== void 0) {
      foundValue = typeof currentValue === "function" ? currentValue.bind(obj) : currentValue;
      break;
    }
    obj = currentValue;
  }
  return foundValue;
}
function get(nodeRefs, id2) {
  if (typeof id2 !== "string")
    return warn(650);
  if (!(id2 in nodeRefs))
    nodeRefs[id2] = ref(void 0);
  if (nodeRefs[id2].value === void 0) {
    nodeRefs[id2].value = null;
    const root = getNode$1(id2);
    if (root)
      nodeRefs[id2].value = root.context;
    watchRegistry(id2, ({ payload: node }) => {
      nodeRefs[id2].value = isNode(node) ? node.context : node;
    });
  }
  return nodeRefs[id2].value;
}
function parseSchema(library, schema, memoKey) {
  function parseCondition(library2, node) {
    const condition = provider(compile(node.if), { if: true });
    const children = createElements(library2, node.then);
    const alternate = node.else ? createElements(library2, node.else) : null;
    return [condition, children, alternate];
  }
  function parseConditionAttr(attr, _default) {
    var _a, _b;
    const condition = provider(compile(attr.if));
    let b = () => _default;
    let a = () => _default;
    if (typeof attr.then === "object") {
      a = parseAttrs(attr.then, void 0);
    } else if (typeof attr.then === "string" && ((_a = attr.then) === null || _a === void 0 ? void 0 : _a.startsWith("$"))) {
      a = provider(compile(attr.then));
    } else {
      a = () => attr.then;
    }
    if (has(attr, "else")) {
      if (typeof attr.else === "object") {
        b = parseAttrs(attr.else);
      } else if (typeof attr.else === "string" && ((_b = attr.else) === null || _b === void 0 ? void 0 : _b.startsWith("$"))) {
        b = provider(compile(attr.else));
      } else {
        b = () => attr.else;
      }
    }
    return () => condition() ? a() : b();
  }
  function parseAttrs(unparsedAttrs, bindExp, _default = {}) {
    const explicitAttrs = new Set(Object.keys(unparsedAttrs || {}));
    const boundAttrs = bindExp ? provider(compile(bindExp)) : () => ({});
    const setters = [
      (attrs) => {
        const bound = boundAttrs();
        for (const attr in bound) {
          if (!explicitAttrs.has(attr)) {
            attrs[attr] = bound[attr];
          }
        }
      }
    ];
    if (unparsedAttrs) {
      if (isConditional(unparsedAttrs)) {
        const condition = parseConditionAttr(unparsedAttrs, _default);
        return condition;
      }
      for (let attr in unparsedAttrs) {
        const value = unparsedAttrs[attr];
        let getValue2;
        const isStr = typeof value === "string";
        if (attr.startsWith(raw)) {
          attr = attr.substring(7);
          getValue2 = () => value;
        } else if (isStr && value.startsWith("$") && value.length > 1 && !(value.startsWith("$reset") && isClassProp.test(attr))) {
          getValue2 = provider(compile(value));
        } else if (typeof value === "object" && isConditional(value)) {
          getValue2 = parseConditionAttr(value, void 0);
        } else if (typeof value === "object" && isPojo(value)) {
          getValue2 = parseAttrs(value);
        } else {
          getValue2 = () => value;
        }
        setters.push((attrs) => {
          attrs[attr] = getValue2();
        });
      }
    }
    return () => {
      const attrs = Array.isArray(unparsedAttrs) ? [] : {};
      setters.forEach((setter) => setter(attrs));
      return attrs;
    };
  }
  function parseNode(library2, _node) {
    let element = null;
    let attrs = () => null;
    let condition = false;
    let children = null;
    let alternate = null;
    let iterator = null;
    let resolve = false;
    const node = sugar(_node);
    if (isDOM(node)) {
      element = node.$el;
      attrs = node.$el !== "text" ? parseAttrs(node.attrs, node.bind) : () => null;
    } else if (isComponent(node)) {
      if (typeof node.$cmp === "string") {
        if (has(library2, node.$cmp)) {
          element = library2[node.$cmp];
        } else {
          element = node.$cmp;
          resolve = true;
        }
      } else {
        element = node.$cmp;
      }
      attrs = parseAttrs(node.props, node.bind);
    } else if (isConditional(node)) {
      [condition, children, alternate] = parseCondition(library2, node);
    }
    if (!isConditional(node) && "if" in node) {
      condition = provider(compile(node.if));
    } else if (!isConditional(node) && element === null) {
      condition = () => true;
    }
    if ("children" in node && node.children) {
      if (typeof node.children === "string") {
        if (node.children.startsWith("$slots.")) {
          element = element === "text" ? "slot" : element;
          children = provider(compile(node.children));
        } else if (node.children.startsWith("$") && node.children.length > 1) {
          const value = provider(compile(node.children));
          children = () => String(value());
        } else {
          children = () => String(node.children);
        }
      } else if (Array.isArray(node.children)) {
        children = createElements(library2, node.children);
      } else {
        const [childCondition, c, a] = parseCondition(library2, node.children);
        children = (iterationData) => childCondition && childCondition() ? c && c(iterationData) : a && a(iterationData);
      }
    }
    if (isComponent(node)) {
      if (children) {
        const produceChildren = children;
        children = (iterationData) => {
          return {
            default(slotData2, key) {
              var _a, _b, _c, _d;
              const currentKey = instanceKey;
              if (key)
                instanceKey = key;
              if (slotData2)
                (_a = instanceScopes.get(instanceKey)) === null || _a === void 0 ? void 0 : _a.unshift(slotData2);
              if (iterationData)
                (_b = instanceScopes.get(instanceKey)) === null || _b === void 0 ? void 0 : _b.unshift(iterationData);
              const c = produceChildren(iterationData);
              if (slotData2)
                (_c = instanceScopes.get(instanceKey)) === null || _c === void 0 ? void 0 : _c.shift();
              if (iterationData)
                (_d = instanceScopes.get(instanceKey)) === null || _d === void 0 ? void 0 : _d.shift();
              instanceKey = currentKey;
              return c;
            }
          };
        };
        children.slot = true;
      } else {
        children = () => ({});
      }
    }
    if ("for" in node && node.for) {
      const values = node.for.length === 3 ? node.for[2] : node.for[1];
      const getValues = typeof values === "string" && values.startsWith("$") ? provider(compile(values)) : () => values;
      iterator = [
        getValues,
        node.for[0],
        node.for.length === 3 ? String(node.for[1]) : null
      ];
    }
    return [condition, element, attrs, children, alternate, iterator, resolve];
  }
  function createSlots(children, iterationData) {
    const slots = children(iterationData);
    const currentKey = instanceKey;
    return Object.keys(slots).reduce((allSlots, slotName) => {
      const slotFn = slots && slots[slotName];
      allSlots[slotName] = (data) => {
        return slotFn && slotFn(data, currentKey) || null;
      };
      return allSlots;
    }, {});
  }
  function createElement(library2, node) {
    const [condition, element, attrs, children, alternate, iterator, resolve] = parseNode(library2, node);
    let createNodes = (iterationData) => {
      if (condition && element === null && children) {
        return condition() ? children(iterationData) : alternate && alternate(iterationData);
      }
      if (element && (!condition || condition())) {
        if (element === "text" && children) {
          return createTextVNode(String(children()));
        }
        if (element === "slot" && children)
          return children(iterationData);
        const el2 = resolve ? resolveComponent(element) : element;
        const slots = (children === null || children === void 0 ? void 0 : children.slot) ? createSlots(children, iterationData) : null;
        return h(el2, attrs(), slots || (children ? children(iterationData) : []));
      }
      return typeof alternate === "function" ? alternate(iterationData) : alternate;
    };
    if (iterator) {
      const repeatedNode = createNodes;
      const [getValues, valueName, keyName] = iterator;
      createNodes = () => {
        const _v = getValues();
        const values = Number.isFinite(_v) ? Array(Number(_v)).fill(0).map((_, i) => i) : _v;
        const fragment2 = [];
        if (typeof values !== "object")
          return null;
        const instanceScope = instanceScopes.get(instanceKey) || [];
        const isArray = Array.isArray(values);
        for (const key in values) {
          if (isArray && key in Array.prototype)
            continue;
          const iterationData = Object.defineProperty({
            ...instanceScope.reduce((previousIterationData, scopedData) => {
              if (previousIterationData.__idata) {
                return { ...previousIterationData, ...scopedData };
              }
              return scopedData;
            }, {}),
            [valueName]: values[key],
            ...keyName !== null ? { [keyName]: isArray ? Number(key) : key } : {}
          }, "__idata", { enumerable: false, value: true });
          instanceScope.unshift(iterationData);
          fragment2.push(repeatedNode.bind(null, iterationData)());
          instanceScope.shift();
        }
        return fragment2;
      };
    }
    return createNodes;
  }
  function createElements(library2, schema2) {
    if (Array.isArray(schema2)) {
      const els = schema2.map(createElement.bind(null, library2));
      return (iterationData) => els.map((element2) => element2(iterationData));
    }
    const element = createElement(library2, schema2);
    return (iterationData) => element(iterationData);
  }
  const providers = [];
  function provider(compiled, hints = {}) {
    const compiledFns = /* @__PURE__ */ new WeakMap();
    providers.push((callback, key) => {
      compiledFns.set(key, compiled.provide((tokens) => callback(tokens, hints)));
    });
    return () => compiledFns.get(instanceKey)();
  }
  function createInstance(providerCallback, key) {
    var _a;
    memoKey !== null && memoKey !== void 0 ? memoKey : memoKey = JSON.stringify(schema);
    const [render, compiledProviders] = has(memo, memoKey) ? memo[memoKey] : [createElements(library, schema), providers];
    if (!isServer$1) {
      (_a = memoKeys[memoKey]) !== null && _a !== void 0 ? _a : memoKeys[memoKey] = 0;
      memoKeys[memoKey]++;
      memo[memoKey] = [render, compiledProviders];
    }
    compiledProviders.forEach((compiledProvider) => {
      compiledProvider(providerCallback, key);
    });
    return () => {
      instanceKey = key;
      return render();
    };
  }
  return createInstance;
}
function useScope(token2, defaultValue) {
  const scopedData = instanceScopes.get(instanceKey) || [];
  let scopedValue = void 0;
  if (scopedData.length) {
    scopedValue = getValue(scopedData, token2.split("."));
  }
  return scopedValue === void 0 ? defaultValue : scopedValue;
}
function slotData(data, key) {
  return new Proxy(data, {
    get(...args) {
      let data2 = void 0;
      const property = args[1];
      if (typeof property === "string") {
        const prevKey = instanceKey;
        instanceKey = key;
        data2 = useScope(property, void 0);
        instanceKey = prevKey;
      }
      return data2 !== void 0 ? data2 : Reflect.get(...args);
    }
  });
}
function createRenderFn(instanceCreator, data, instanceKey2) {
  return instanceCreator((requirements, hints = {}) => {
    return requirements.reduce((tokens, token2) => {
      if (token2.startsWith("slots.")) {
        const slot = token2.substring(6);
        const hasSlot = () => data.slots && has(data.slots, slot) && typeof data.slots[slot] === "function";
        if (hints.if) {
          tokens[token2] = hasSlot;
        } else if (data.slots) {
          const scopedData = slotData(data, instanceKey2);
          tokens[token2] = () => hasSlot() ? data.slots[slot](scopedData) : null;
        }
      } else {
        const value = getRef(token2, data);
        tokens[token2] = () => useScope(token2, value.value);
      }
      return tokens;
    }, {});
  }, instanceKey2);
}
function clean(schema, memoKey, instanceKey2) {
  memoKey !== null && memoKey !== void 0 ? memoKey : memoKey = JSON.stringify(schema);
  memoKeys[memoKey]--;
  if (memoKeys[memoKey] === 0) {
    delete memoKeys[memoKey];
    const [, providers] = memo[memoKey];
    delete memo[memoKey];
    providers.length = 0;
  }
  instanceScopes.delete(instanceKey2);
}
var FormKitSchema = defineComponent({
  name: "FormKitSchema",
  props: {
    schema: {
      type: [Array, Object],
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    library: {
      type: Object,
      default: () => ({})
    },
    memoKey: {
      type: String,
      required: false
    }
  },
  setup(props, context) {
    var _a;
    const instance = getCurrentInstance();
    let instanceKey2 = {};
    instanceScopes.set(instanceKey2, []);
    let provider = parseSchema(props.library, props.schema, props.memoKey);
    let render;
    let data;
    if (!isServer$1) {
      watch(() => props.schema, (newSchema, oldSchema) => {
        var _a2;
        const oldKey = instanceKey2;
        instanceKey2 = {};
        provider = parseSchema(props.library, props.schema, props.memoKey);
        render = createRenderFn(provider, data, instanceKey2);
        if (newSchema === oldSchema) {
          ((_a2 = instance === null || instance === void 0 ? void 0 : instance.proxy) === null || _a2 === void 0 ? void 0 : _a2.$forceUpdate)();
        }
        clean(props.schema, props.memoKey, oldKey);
      }, { deep: true });
    }
    watchEffect(() => {
      var _a2;
      data = Object.assign(reactive((_a2 = props.data) !== null && _a2 !== void 0 ? _a2 : {}), {
        slots: context.slots
      });
      context.slots;
      render = createRenderFn(provider, data, instanceKey2);
    });
    function cleanUp() {
      clean(props.schema, props.memoKey, instanceKey2);
      if (data.node)
        data.node.destroy();
      data.slots = null;
      data = null;
      render = null;
    }
    onUnmounted(cleanUp);
    onSSRComplete((_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.appContext.app, cleanUp);
    return () => render ? render() : null;
  }
});
var isServer = typeof window === "undefined";
var parentSymbol = Symbol("FormKitParent");
var currentSchemaNode = null;
var getCurrentSchemaNode = () => currentSchemaNode;
function setup(props, context) {
  const node = useInput(props, context);
  if (!node.props.definition)
    error(600, node);
  if (node.props.definition.component) {
    return () => {
      var _a;
      return h((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.component, {
        context: node.context
      }, { ...context.slots });
    };
  }
  const schema = ref([]);
  let memoKey = node.props.definition.schemaMemoKey;
  const generateSchema = () => {
    var _a, _b;
    const schemaDefinition = (_b = (_a = node.props) === null || _a === void 0 ? void 0 : _a.definition) === null || _b === void 0 ? void 0 : _b.schema;
    if (!schemaDefinition)
      error(601, node);
    if (typeof schemaDefinition === "function") {
      currentSchemaNode = node;
      schema.value = schemaDefinition({ ...props.sectionsSchema });
      currentSchemaNode = null;
      if (memoKey && props.sectionsSchema || "memoKey" in schemaDefinition && typeof schemaDefinition.memoKey === "string") {
        memoKey = (memoKey !== null && memoKey !== void 0 ? memoKey : schemaDefinition === null || schemaDefinition === void 0 ? void 0 : schemaDefinition.memoKey) + JSON.stringify(props.sectionsSchema);
      }
    } else {
      schema.value = schemaDefinition;
    }
  };
  generateSchema();
  if (!isServer) {
    node.on("schema", () => {
      memoKey += "♻️";
      generateSchema();
    });
  }
  context.emit("node", node);
  const library = node.props.definition.library;
  context.expose({ node });
  return () => h(FormKitSchema, { schema: schema.value, data: node.context, library, memoKey }, { ...context.slots });
}
var formkitComponent = defineComponent(setup, {
  props: runtimeProps,
  inheritAttrs: false
});
var rootSymbol = Symbol();
var FormKitRoot = defineComponent((_p, context) => {
  const boundary = ref(null);
  const showBody = ref(false);
  const shadowRoot = ref(void 0);
  const stopWatch = watch(boundary, (el2) => {
    let parent = el2;
    let root = null;
    while (parent = parent === null || parent === void 0 ? void 0 : parent.parentNode) {
      root = parent;
      if (root instanceof ShadowRoot || root instanceof Document) {
        foundRoot(root);
        break;
      }
    }
    stopWatch();
    showBody.value = true;
  });
  provide(rootSymbol, shadowRoot);
  function foundRoot(root) {
    shadowRoot.value = root;
  }
  return () => showBody.value && context.slots.default ? context.slots.default() : h("template", { ref: boundary });
});
function createPlugin(app, options2) {
  app.component(options2.alias || "FormKit", formkitComponent).component(options2.schemaAlias || "FormKitSchema", FormKitSchema);
  return {
    get: getNode$1,
    setLocale: (locale) => {
      var _a;
      if ((_a = options2.config) === null || _a === void 0 ? void 0 : _a.rootConfig) {
        options2.config.rootConfig.locale = locale;
      }
    },
    clearErrors,
    setErrors,
    submit: submitForm,
    reset
  };
}
var optionsSymbol = Symbol.for("FormKitOptions");
var configSymbol = Symbol.for("FormKitConfig");
var plugin = {
  install(app, _options) {
    const options2 = Object.assign({
      alias: "FormKit",
      schemaAlias: "FormKitSchema"
    }, typeof _options === "function" ? _options() : _options);
    const rootConfig = createConfig$1(options2.config || {});
    options2.config = { rootConfig };
    app.config.globalProperties.$formkit = createPlugin(app, options2);
    app.provide(optionsSymbol, options2);
    app.provide(configSymbol, rootConfig);
  }
};
var isBrowser2 = typeof window !== "undefined";
var pseudoProps = [
  "help",
  "label",
  "ignore",
  "disabled",
  "preserve",
  /^preserve(-e|E)rrors/,
  /^[a-z]+(?:-visibility|Visibility|-behavior|Behavior)$/,
  /^[a-zA-Z-]+(?:-class|Class)$/,
  "prefixIcon",
  "suffixIcon",
  /^[a-zA-Z-]+(?:-icon|Icon)$/
];
function classesToNodeProps(node, props) {
  if (props.classes) {
    Object.keys(props.classes).forEach((key) => {
      if (typeof key === "string") {
        node.props[`_${key}Class`] = props.classes[key];
        if (isObject(props.classes[key]) && key === "inner")
          Object.values(props.classes[key]);
      }
    });
  }
}
function onlyListeners(props) {
  if (!props)
    return {};
  const knownListeners = ["Submit", "SubmitRaw", "SubmitInvalid"].reduce((listeners, listener) => {
    const name = `on${listener}`;
    if (name in props) {
      if (typeof props[name] === "function") {
        listeners[name] = props[name];
      }
    }
    return listeners;
  }, {});
  return knownListeners;
}
function useInput(props, context, options2 = {}) {
  var _a;
  const config = Object.assign({}, inject(optionsSymbol) || {}, options2);
  const __root = inject(rootSymbol, ref(isBrowser2 ? document : void 0));
  const instance = getCurrentInstance();
  const listeners = onlyListeners(instance === null || instance === void 0 ? void 0 : instance.vnode.props);
  const isVModeled = ["modelValue", "model-value"].some((prop) => {
    var _a2;
    return prop in ((_a2 = instance === null || instance === void 0 ? void 0 : instance.vnode.props) !== null && _a2 !== void 0 ? _a2 : {});
  });
  let isMounted = false;
  onMounted(() => {
    isMounted = true;
  });
  const value = props.modelValue !== void 0 ? props.modelValue : cloneAny(context.attrs.value);
  function createInitialProps() {
    var _a2;
    const initialProps2 = {
      ...nodeProps(props),
      ...listeners,
      type: (_a2 = props.type) !== null && _a2 !== void 0 ? _a2 : "text",
      __root: __root.value,
      __slots: context.slots
    };
    const attrs = except(nodeProps(context.attrs), pseudoProps);
    if (!attrs.key)
      attrs.key = token();
    initialProps2.attrs = attrs;
    const propValues = only(nodeProps(context.attrs), pseudoProps);
    for (const propName in propValues) {
      initialProps2[camel(propName)] = propValues[propName];
    }
    const classesProps = { props: {} };
    classesToNodeProps(classesProps, props);
    Object.assign(initialProps2, classesProps.props);
    if (typeof initialProps2.type !== "string") {
      initialProps2.definition = initialProps2.type;
      delete initialProps2.type;
    }
    return initialProps2;
  }
  const initialProps = createInitialProps();
  const parent = initialProps.ignore ? null : props.parent || inject(parentSymbol, null);
  const node = createNode(extend(config || {}, {
    name: props.name || void 0,
    value,
    parent,
    plugins: (config.plugins || []).concat((_a = props.plugins) !== null && _a !== void 0 ? _a : []),
    config: props.config || {},
    props: initialProps,
    index: props.index,
    sync: !!undefine(context.attrs.sync || context.attrs.dynamic)
  }, false, true));
  if (!node.props.definition)
    error(600, node);
  const lateBoundProps = ref(new Set(node.props.definition.props || []));
  node.on("added-props", ({ payload: lateProps }) => {
    if (Array.isArray(lateProps))
      lateProps.forEach((newProp) => lateBoundProps.value.add(newProp));
  });
  const pseudoPropNames = computed(() => pseudoProps.concat([...lateBoundProps.value]).reduce((names, prop) => {
    if (typeof prop === "string") {
      names.push(camel(prop));
      names.push(kebab(prop));
    } else {
      names.push(prop);
    }
    return names;
  }, []));
  watchEffect(() => classesToNodeProps(node, props));
  const passThrough = nodeProps(props);
  for (const prop in passThrough) {
    watch(() => props[prop], () => {
      if (props[prop] !== void 0) {
        node.props[prop] = props[prop];
      }
    });
  }
  watchEffect(() => {
    node.props.__root = __root.value;
  });
  const attributeWatchers = /* @__PURE__ */ new Set();
  const possibleProps = nodeProps(context.attrs);
  watchEffect(() => {
    watchAttributes(only(possibleProps, pseudoPropNames.value));
  });
  function watchAttributes(attrProps) {
    attributeWatchers.forEach((stop) => {
      stop();
      attributeWatchers.delete(stop);
    });
    for (const prop in attrProps) {
      const camelName = camel(prop);
      attributeWatchers.add(watch(() => context.attrs[prop], () => {
        node.props[camelName] = context.attrs[prop];
      }));
    }
  }
  watchEffect(() => {
    const attrs = except(nodeProps(context.attrs), pseudoPropNames.value);
    if ("multiple" in attrs)
      attrs.multiple = undefine(attrs.multiple);
    if (typeof attrs.onBlur === "function") {
      attrs.onBlur = oncePerTick(attrs.onBlur);
    }
    node.props.attrs = Object.assign({}, node.props.attrs || {}, attrs);
  });
  watchEffect(() => {
    var _a2;
    const messages3 = ((_a2 = props.errors) !== null && _a2 !== void 0 ? _a2 : []).map((error2) => createMessage({
      key: slugify(error2),
      type: "error",
      value: error2,
      meta: { source: "prop" }
    }));
    node.store.apply(messages3, (message3) => message3.type === "error" && message3.meta.source === "prop");
  });
  if (node.type !== "input") {
    const sourceKey = `${node.name}-prop`;
    watchEffect(() => {
      var _a2;
      const inputErrors = (_a2 = props.inputErrors) !== null && _a2 !== void 0 ? _a2 : {};
      const keys = Object.keys(inputErrors);
      if (!keys.length)
        node.clearErrors(true, sourceKey);
      const messages3 = keys.reduce((messages4, key) => {
        let value2 = inputErrors[key];
        if (typeof value2 === "string")
          value2 = [value2];
        if (Array.isArray(value2)) {
          messages4[key] = value2.map((error2) => createMessage({
            key: error2,
            type: "error",
            value: error2,
            meta: { source: sourceKey }
          }));
        }
        return messages4;
      }, {});
      node.store.apply(messages3, (message3) => message3.type === "error" && message3.meta.source === sourceKey);
    });
  }
  watchEffect(() => Object.assign(node.config, props.config));
  if (node.type !== "input") {
    provide(parentSymbol, node);
  }
  let clonedValueBeforeVmodel = void 0;
  node.on("modelUpdated", () => {
    var _a2, _b;
    context.emit("inputRaw", (_a2 = node.context) === null || _a2 === void 0 ? void 0 : _a2.value, node);
    if (isMounted) {
      context.emit("input", (_b = node.context) === null || _b === void 0 ? void 0 : _b.value, node);
    }
    if (isVModeled && node.context) {
      clonedValueBeforeVmodel = cloneAny(node.value);
      context.emit("update:modelValue", shallowClone(node.value));
    }
  });
  if (isVModeled) {
    watch(toRef(props, "modelValue"), (value2) => {
      if (!eq(clonedValueBeforeVmodel, value2)) {
        node.input(value2, false);
      }
    }, { deep: true });
    if (node.value !== value) {
      node.emit("modelUpdated");
    }
  }
  onBeforeUnmount(() => node.destroy());
  return node;
}
var totalCreated = 1;
function isComponent2(obj) {
  return typeof obj === "function" && obj.length === 2 || typeof obj === "object" && !Array.isArray(obj) && !("$el" in obj) && !("$cmp" in obj) && !("if" in obj);
}
function createInput(schemaOrComponent, definitionOptions = {}) {
  const definition2 = {
    type: "input",
    ...definitionOptions
  };
  let schema;
  if (isComponent2(schemaOrComponent)) {
    const cmpName = `SchemaComponent${totalCreated++}`;
    schema = createSection("input", () => ({
      $cmp: cmpName,
      props: {
        context: "$node.context"
      }
    }));
    definition2.library = { [cmpName]: markRaw(schemaOrComponent) };
  } else if (typeof schemaOrComponent === "function") {
    schema = schemaOrComponent;
  } else {
    schema = createSection("input", () => cloneAny(schemaOrComponent));
  }
  definition2.schema = useSchema(schema || "Schema undefined");
  if (!definition2.schemaMemoKey) {
    definition2.schemaMemoKey = `${Math.random()}`;
  }
  return definition2;
}
function defineFormKitConfig(config) {
  return () => typeof config === "function" ? config() : config;
}
var messages2 = createSection("messages", () => ({
  $el: "ul",
  if: "$fns.length($messages)"
}));
var message2 = createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
var definition = messages2(message2("$message.value"));
var FormKitMessages = defineComponent({
  props: {
    node: {
      type: Object,
      required: false
    },
    sectionsSchema: {
      type: Object,
      default: {}
    },
    defaultPosition: {
      type: [String, Boolean],
      default: false
    }
  },
  setup(props, context) {
    const node = computed(() => {
      return props.node || inject(parentSymbol, void 0);
    });
    watch(node, () => {
      var _a;
      if (((_a = node.value) === null || _a === void 0 ? void 0 : _a.context) && !undefine(props.defaultPosition)) {
        node.value.context.defaultMessagePlacement = false;
      }
    }, { immediate: true });
    const schema = definition(props.sectionsSchema || {});
    const data = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return {
        messages: ((_b = (_a = node.value) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.messages) || {},
        fns: ((_d = (_c = node.value) === null || _c === void 0 ? void 0 : _c.context) === null || _d === void 0 ? void 0 : _d.fns) || {},
        classes: ((_f = (_e = node.value) === null || _e === void 0 ? void 0 : _e.context) === null || _f === void 0 ? void 0 : _f.classes) || {}
      };
    });
    return () => {
      var _a;
      return ((_a = node.value) === null || _a === void 0 ? void 0 : _a.context) ? h(FormKitSchema, { schema, data: data.value }, { ...context.slots }) : null;
    };
  }
});
var vueBindings = function vueBindings2(node) {
  node.ledger.count("blocking", (m) => m.blocking);
  const isValid = ref(!node.ledger.value("blocking"));
  node.ledger.count("errors", (m) => m.type === "error");
  const hasErrors = ref(!!node.ledger.value("errors"));
  let hasTicked = false;
  nextTick(() => {
    hasTicked = true;
  });
  const availableMessages = reactive(node.store.reduce((store, message3) => {
    if (message3.visible) {
      store[message3.key] = message3;
    }
    return store;
  }, {}));
  const validationVisibility = ref(node.props.validationVisibility || (node.props.type === "checkbox" ? "dirty" : "blur"));
  node.on("prop:validationVisibility", ({ payload }) => {
    validationVisibility.value = payload;
  });
  const hasShownErrors = ref(validationVisibility.value === "live");
  const items = ref(node.children.map((child) => child.uid));
  const validationVisible = computed(() => {
    if (context.state.submitted)
      return true;
    if (!hasShownErrors.value && !context.state.settled) {
      return false;
    }
    switch (validationVisibility.value) {
      case "live":
        return true;
      case "blur":
        return context.state.blurred;
      case "dirty":
        return context.state.dirty;
      default:
        return false;
    }
  });
  const isComplete = computed(() => {
    return hasValidation.value ? isValid.value && !hasErrors.value : context.state.dirty && !empty(context.value);
  });
  const hasValidation = ref(Array.isArray(node.props.parsedRules) && node.props.parsedRules.length > 0);
  node.on("prop:parsedRules", ({ payload: rules }) => {
    hasValidation.value = Array.isArray(rules) && rules.length > 0;
  });
  const messages3 = computed(() => {
    const visibleMessages = {};
    for (const key in availableMessages) {
      const message3 = availableMessages[key];
      if (message3.type !== "validation" || validationVisible.value) {
        visibleMessages[key] = message3;
      }
    }
    return visibleMessages;
  });
  const ui2 = reactive(node.store.reduce((messages4, message3) => {
    if (message3.type === "ui" && message3.visible)
      messages4[message3.key] = message3;
    return messages4;
  }, {}));
  const cachedClasses = reactive({});
  const classes = new Proxy(cachedClasses, {
    get(...args) {
      const [target, property] = args;
      let className = Reflect.get(...args);
      if (!className && typeof property === "string") {
        if (!has(target, property) && !property.startsWith("__v")) {
          const observedNode = createObserver(node);
          observedNode.watch((node2) => {
            const rootClasses = typeof node2.config.rootClasses === "function" ? node2.config.rootClasses(property, node2) : {};
            const globalConfigClasses = node2.config.classes ? createClasses(property, node2, node2.config.classes[property]) : {};
            const classesPropClasses = createClasses(property, node2, node2.props[`_${property}Class`]);
            const sectionPropClasses = createClasses(property, node2, node2.props[`${property}Class`]);
            className = generateClassList(node2, property, rootClasses, globalConfigClasses, classesPropClasses, sectionPropClasses);
            target[property] = className !== null && className !== void 0 ? className : "";
          });
        }
      }
      return className;
    }
  });
  const describedBy = computed(() => {
    const describers = [];
    if (context.help) {
      describers.push(`help-${node.props.id}`);
    }
    for (const key in messages3.value) {
      describers.push(`${node.props.id}-${key}`);
    }
    return describers.length ? describers.join(" ") : void 0;
  });
  const value = ref(node.value);
  const _value = ref(node.value);
  const context = reactive({
    _value,
    attrs: node.props.attrs,
    disabled: node.props.disabled,
    describedBy,
    fns: {
      length: (obj) => Object.keys(obj).length,
      number: (value2) => Number(value2),
      string: (value2) => String(value2),
      json: (value2) => JSON.stringify(value2),
      eq
    },
    handlers: {
      blur: (e) => {
        if (!node)
          return;
        node.store.set(createMessage({ key: "blurred", visible: false, value: true }));
        if (typeof node.props.attrs.onBlur === "function") {
          node.props.attrs.onBlur(e);
        }
      },
      touch: () => {
        var _a;
        const doCompare = context.dirtyBehavior === "compare";
        if (((_a = node.store.dirty) === null || _a === void 0 ? void 0 : _a.value) && !doCompare)
          return;
        const isDirty = !eq(node.props._init, node._value);
        if (!isDirty && !doCompare)
          return;
        node.store.set(createMessage({ key: "dirty", visible: false, value: isDirty }));
      },
      DOMInput: (e) => {
        node.input(e.target.value);
        node.emit("dom-input-event", e);
      }
    },
    help: node.props.help,
    id: node.props.id,
    items,
    label: node.props.label,
    messages: messages3,
    node: markRaw(node),
    options: node.props.options,
    defaultMessagePlacement: true,
    slots: node.props.__slots,
    state: {
      blurred: false,
      complete: isComplete,
      dirty: false,
      empty: empty(value),
      submitted: false,
      settled: node.isSettled,
      valid: isValid,
      errors: hasErrors,
      rules: hasValidation,
      validationVisible
    },
    type: node.props.type,
    family: node.props.family,
    ui: ui2,
    value,
    classes
  });
  node.on("created", () => {
    if (!eq(context.value, node.value)) {
      _value.value = node.value;
      value.value = node.value;
      triggerRef(value);
      triggerRef(_value);
    }
    (async () => {
      await node.settled;
      if (node)
        node.props._init = cloneAny(node.value);
    })();
  });
  node.on("settled", ({ payload: isSettled }) => {
    context.state.settled = isSettled;
  });
  function observeProps(observe) {
    observe.forEach((prop) => {
      prop = camel(prop);
      if (!has(context, prop) && has(node.props, prop)) {
        context[prop] = node.props[prop];
      }
      node.on(`prop:${prop}`, ({ payload }) => {
        context[prop] = payload;
      });
    });
  }
  const rootProps = () => {
    const props = [
      "__root",
      "help",
      "label",
      "disabled",
      "options",
      "type",
      "attrs",
      "preserve",
      "preserveErrors",
      "id",
      "dirtyBehavior"
    ];
    const iconPattern = /^[a-zA-Z-]+(?:-icon|Icon)$/;
    const matchingProps = Object.keys(node.props).filter((prop) => {
      return iconPattern.test(prop);
    });
    return props.concat(matchingProps);
  };
  observeProps(rootProps());
  function definedAs(definition2) {
    if (definition2.props)
      observeProps(definition2.props);
  }
  node.props.definition && definedAs(node.props.definition);
  node.on("added-props", ({ payload }) => observeProps(payload));
  node.on("input", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      _value.value = shallowClone(payload);
    } else {
      _value.value = payload;
      triggerRef(_value);
    }
  });
  node.on("commitRaw", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      value.value = _value.value = shallowClone(payload);
    } else {
      value.value = _value.value = payload;
      triggerRef(value);
    }
    node.emit("modelUpdated");
  });
  node.on("commit", ({ payload }) => {
    if ((!context.state.dirty || context.dirtyBehavior === "compare") && node.isCreated && hasTicked) {
      context.handlers.touch();
    }
    if (isComplete && node.type === "input" && hasErrors.value && !undefine(node.props.preserveErrors)) {
      node.store.filter((message3) => {
        var _a;
        return !(message3.type === "error" && ((_a = message3.meta) === null || _a === void 0 ? void 0 : _a.autoClear) === true);
      });
    }
    if (node.type === "list" && node.sync) {
      items.value = node.children.map((child) => child.uid);
    }
    context.state.empty = empty(payload);
  });
  const updateState = async (message3) => {
    if (message3.type === "ui" && message3.visible && !message3.meta.showAsMessage) {
      ui2[message3.key] = message3;
    } else if (message3.visible) {
      availableMessages[message3.key] = message3;
    } else if (message3.type === "state") {
      context.state[message3.key] = !!message3.value;
    }
  };
  node.on("message-added", (e) => updateState(e.payload));
  node.on("message-updated", (e) => updateState(e.payload));
  node.on("message-removed", ({ payload: message3 }) => {
    delete ui2[message3.key];
    delete availableMessages[message3.key];
    delete context.state[message3.key];
  });
  node.on("settled:blocking", () => {
    isValid.value = true;
  });
  node.on("unsettled:blocking", () => {
    isValid.value = false;
  });
  node.on("settled:errors", () => {
    hasErrors.value = false;
  });
  node.on("unsettled:errors", () => {
    hasErrors.value = true;
  });
  watch(validationVisible, (value2) => {
    if (value2) {
      hasShownErrors.value = true;
    }
  });
  node.context = context;
  node.emit("context", node, false);
  node.on("destroyed", () => {
    node.context = void 0;
    node = null;
  });
};
var defaultConfig = (options2 = {}) => {
  const { rules = {}, locales = {}, inputs: inputs$1 = {}, messages: messages3 = {}, locale = void 0, theme = void 0, iconLoaderUrl = void 0, iconLoader = void 0, icons = {}, ...nodeOptions } = options2;
  const validation2 = createValidationPlugin({
    ...dist_exports,
    ...rules || {}
  });
  const i18n = createI18nPlugin(extend({ en, ...locales || {} }, messages3));
  const library = createLibraryPlugin(index, inputs$1);
  const themePlugin = createThemePlugin(theme, icons, iconLoaderUrl, iconLoader);
  return extend({
    plugins: [library, themePlugin, vueBindings, i18n, validation2],
    ...!locale ? {} : { config: { locale } }
  }, nodeOptions || {}, true);
};
var FormKitIcon = defineComponent({
  name: "FormKitIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    iconLoader: {
      type: Function,
      default: null
    },
    iconLoaderUrl: {
      type: Function,
      default: null
    }
  },
  setup(props) {
    var _a, _b;
    const icon2 = ref(void 0);
    const config = inject(optionsSymbol, {});
    const parent = inject(parentSymbol, null);
    let iconHandler = void 0;
    function loadIcon() {
      if (!iconHandler || typeof iconHandler !== "function")
        return;
      const iconOrPromise = iconHandler(props.icon);
      if (iconOrPromise instanceof Promise) {
        iconOrPromise.then((iconValue) => {
          icon2.value = iconValue;
        });
      } else {
        icon2.value = iconOrPromise;
      }
    }
    if (props.iconLoader && typeof props.iconLoader === "function") {
      iconHandler = createIconHandler(props.iconLoader);
    } else if (parent && ((_a = parent.props) === null || _a === void 0 ? void 0 : _a.iconLoader)) {
      iconHandler = createIconHandler(parent.props.iconLoader);
    } else if (props.iconLoaderUrl && typeof props.iconLoaderUrl === "function") {
      iconHandler = createIconHandler(iconHandler, props.iconLoaderUrl);
    } else {
      const iconPlugin = (_b = config === null || config === void 0 ? void 0 : config.plugins) === null || _b === void 0 ? void 0 : _b.find((plugin2) => {
        return typeof plugin2.iconHandler === "function";
      });
      if (iconPlugin) {
        iconHandler = iconPlugin.iconHandler;
      }
    }
    watch(() => props.icon, () => {
      loadIcon();
    }, { immediate: true });
    return () => {
      if (props.icon && icon2.value) {
        return h("span", {
          class: "formkit-icon",
          innerHTML: icon2.value
        });
      }
      return null;
    };
  }
});
export {
  formkitComponent as FormKit,
  FormKitIcon,
  FormKitMessages,
  FormKitRoot,
  FormKitSchema,
  vueBindings as bindings,
  clearErrors,
  configSymbol,
  createInput,
  defaultConfig,
  defineFormKitConfig,
  errorHandler,
  getCurrentSchemaNode,
  onSSRComplete,
  optionsSymbol,
  parentSymbol,
  plugin,
  reset,
  resetCount,
  rootSymbol,
  setErrors,
  ssrComplete,
  submitForm,
  useInput
};
//# sourceMappingURL=@formkit_vue.js.map
