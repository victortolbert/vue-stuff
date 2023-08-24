import "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/v-wave@1.5.1_vue@3.3.4/node_modules/v-wave/dist/es/index.js
var DEFAULT_PLUGIN_OPTIONS = {
  directive: "wave",
  color: "currentColor",
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  duration: 0.4,
  dissolveDuration: 0.15,
  easing: "ease-out",
  cancellationPeriod: 75,
  trigger: "auto",
  tagName: "div"
};
var isVue3 = (app) => "config" in app && "globalProperties" in app.config;
var getHooks = (app) => {
  let vue3;
  if (app === "vue2")
    vue3 = false;
  else if (app === "vue3")
    vue3 = true;
  else
    vue3 = isVue3(app);
  return vue3 ? {
    mounted: "mounted",
    updated: "updated"
  } : {
    mounted: "inserted",
    updated: "componentUpdated"
  };
};
var triggerIsID = (trigger) => typeof trigger === "string" && trigger !== "auto";
var markWaveBoundary = (el, trigger) => {
  el.dataset.vWaveBoundary = triggerIsID(trigger) ? trigger : "true";
};
var createContainer = ({ borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius }, tagName) => {
  const waveContainer = document.createElement(tagName);
  waveContainer.style.top = "0";
  waveContainer.style.left = "0";
  waveContainer.style.width = "100%";
  waveContainer.style.height = "100%";
  waveContainer.style.display = "block";
  waveContainer.style.position = "absolute";
  waveContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`;
  waveContainer.style.overflow = "hidden";
  waveContainer.style.pointerEvents = "none";
  waveContainer.style.webkitMaskImage = "-webkit-radial-gradient(white, black)";
  return waveContainer;
};
var createWaveElement = (x, y, size, options) => {
  const waveElement = document.createElement("div");
  waveElement.style.position = "absolute";
  waveElement.style.width = `${size}px`;
  waveElement.style.height = `${size}px`;
  waveElement.style.top = `${y}px`;
  waveElement.style.left = `${x}px`;
  waveElement.style.background = options.color;
  waveElement.style.borderRadius = "50%";
  waveElement.style.opacity = `${options.initialOpacity}`;
  waveElement.style.transform = `translate(-50%,-50%) scale(0)`;
  waveElement.style.transition = `transform ${options.duration}s ${options.easing}, opacity ${options.duration}s ${options.easing}`;
  return waveElement;
};
function magnitude(x1, y1, x2, y2) {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
function getDistanceToFurthestCorner(x, y, { width, height }) {
  const topLeft = magnitude(x, y, 0, 0);
  const topRight = magnitude(x, y, width, 0);
  const bottomLeft = magnitude(x, y, 0, height);
  const bottomRight = magnitude(x, y, width, height);
  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
}
var getRelativePointer = ({ x, y }, { top, left }) => ({
  x: x - left,
  y: y - top
});
var WAVE_COUNT = "vWaveCountInternal";
function incrementWaveCount(el) {
  const count = getWaveCount(el);
  setWaveCount(el, count + 1);
}
function decrementWaveCount(el) {
  const count = getWaveCount(el);
  setWaveCount(el, count - 1);
}
function setWaveCount(el, count) {
  el.dataset[WAVE_COUNT] = count.toString();
}
function getWaveCount(el) {
  var _a;
  return parseInt((_a = el.dataset[WAVE_COUNT]) !== null && _a !== void 0 ? _a : "0", 10);
}
function deleteWaveCount(el) {
  delete el.dataset[WAVE_COUNT];
}
var wave = (event, el, options) => {
  const rect = el.getBoundingClientRect();
  const computedStyles = window.getComputedStyle(el);
  const { x, y } = getRelativePointer(event, rect);
  const size = 2.05 * getDistanceToFurthestCorner(x, y, rect);
  const waveContainer = createContainer(computedStyles, options.tagName);
  const waveEl = createWaveElement(x, y, size, options);
  incrementWaveCount(el);
  let originalPositionValue = "";
  if (computedStyles.position === "static") {
    if (el.style.position)
      originalPositionValue = el.style.position;
    el.style.position = "relative";
  }
  waveContainer.appendChild(waveEl);
  el.appendChild(waveContainer);
  let shouldDissolveWave = false;
  const releaseWave = (e) => {
    if (typeof e !== "undefined") {
      document.removeEventListener("pointerup", releaseWave);
      document.removeEventListener("pointercancel", releaseWave);
    }
    if (shouldDissolveWave)
      dissolveWave();
    else
      shouldDissolveWave = true;
  };
  const dissolveWave = () => {
    waveEl.style.transition = `opacity ${options.dissolveDuration}s linear`;
    waveEl.style.opacity = "0";
    setTimeout(() => {
      waveContainer.remove();
      decrementWaveCount(el);
      if (getWaveCount(el) === 0) {
        deleteWaveCount(el);
        el.style.position = originalPositionValue;
      }
    }, options.dissolveDuration * 1e3);
  };
  document.addEventListener("pointerup", releaseWave);
  document.addEventListener("pointercancel", releaseWave);
  const token = setTimeout(() => {
    document.removeEventListener("pointercancel", cancelWave);
    requestAnimationFrame(() => {
      waveEl.style.transform = `translate(-50%,-50%) scale(1)`;
      waveEl.style.opacity = `${options.finalOpacity}`;
      setTimeout(() => releaseWave(), options.duration * 1e3);
    });
  }, options.cancellationPeriod);
  const cancelWave = () => {
    clearTimeout(token);
    waveContainer.remove();
    document.removeEventListener("pointerup", releaseWave);
    document.removeEventListener("pointercancel", releaseWave);
    document.removeEventListener("pointercancel", cancelWave);
  };
  document.addEventListener("pointercancel", cancelWave);
};
var optionMap = /* @__PURE__ */ new WeakMap();
var createDirective = (globalUserOptions = {}, app = "vue3") => {
  const globalOptions = Object.assign(Object.assign({}, DEFAULT_PLUGIN_OPTIONS), globalUserOptions);
  const hooks = getHooks(app);
  const handleTrigger = (event) => {
    const trigger = event.currentTarget.dataset.vWaveTrigger;
    const associatedElements = document.querySelectorAll(`[data-v-wave-boundary="${trigger}"]`);
    associatedElements.forEach((el) => wave(event, el, Object.assign(Object.assign({}, globalOptions), optionMap.get(el))));
  };
  const waveDirective = {
    [hooks.mounted](el, { value = {} }) {
      var _a;
      optionMap.set(el, value);
      markWaveBoundary(el, (_a = value && value.trigger) !== null && _a !== void 0 ? _a : globalOptions.trigger);
      el.addEventListener("pointerdown", (event) => {
        if (optionMap.get(el) === false)
          return;
        const options = Object.assign(Object.assign({}, globalOptions), optionMap.get(el));
        if (options.trigger === false)
          return wave(event, el, options);
        if (triggerIsID(options.trigger))
          return;
        const trigger = el.querySelector('[data-v-wave-trigger="true"]');
        if (!trigger && options.trigger === true)
          return;
        if (trigger && !event.composedPath().includes(trigger))
          return;
        wave(event, el, options);
      });
    },
    [hooks.updated](el, { value = {} }) {
      var _a;
      optionMap.set(el, value);
      markWaveBoundary(el, (_a = value && value.trigger) !== null && _a !== void 0 ? _a : globalOptions.trigger);
    }
  };
  const triggerDirective = {
    [hooks.mounted](el, { arg: trigger = "true" }) {
      el.dataset.vWaveTrigger = trigger;
      if (trigger !== "true")
        el.addEventListener("pointerdown", handleTrigger);
    },
    [hooks.updated](el, { arg: trigger = "true" }) {
      el.dataset.vWaveTrigger = trigger;
      if (trigger === "true")
        el.removeEventListener("pointerdown", handleTrigger);
      else
        el.addEventListener("pointerdown", handleTrigger);
    }
  };
  return {
    wave: waveDirective,
    vWave: waveDirective,
    waveTrigger: triggerDirective,
    vWaveTrigger: triggerDirective
  };
};
var VWave = {
  install(app, globalUserOptions = {}) {
    if (this.installed)
      return;
    this.installed = true;
    const globalOptions = Object.assign(Object.assign({}, DEFAULT_PLUGIN_OPTIONS), globalUserOptions);
    const { vWave, vWaveTrigger } = createDirective(globalOptions, app);
    app.directive(globalOptions.directive, vWave);
    app.directive(`${globalOptions.directive}-trigger`, vWaveTrigger);
  },
  installed: false,
  createLocalWaveDirective: createDirective
};
export {
  VWave as default
};
//# sourceMappingURL=v-wave.js.map
