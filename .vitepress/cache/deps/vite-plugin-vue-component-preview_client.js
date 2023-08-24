import {
  defineAsyncComponent,
  h
} from "./chunk-OX6HOUGK.js";
import "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/vite-plugin-vue-component-preview@1.1.6_rollup@2.79.1_vite@4.4.9_vue@3.3.4/node_modules/vite-plugin-vue-component-preview/client/index.js
function client_default(app) {
  const location = globalThis.location;
  if (location && location.pathname.includes("/__preview/")) {
    let fireHash = function() {
      var _a;
      try {
        (_a = import.meta.hot) == null ? void 0 : _a.send("vue-component-preview:hash", {
          file: importPath,
          text: location.hash ? atob(location.hash.substring(1)) : ""
        });
      } catch {
      }
    };
    const importPath = location.pathname.replace("/__preview", "");
    const Component = defineAsyncComponent(() => import(
      /* @vite-ignore */
      importPath
    ));
    const Layout = defineAsyncComponent(() => import(
      /* @vite-ignore */
      importPath + "__preview.vue"
    ));
    if (import.meta.hot) {
      fireHash();
      window.addEventListener("hashchange", fireHash);
    }
    app._component.setup = () => {
      return () => h(Layout, void 0, {
        default: (props) => h(Component, props)
      });
    };
  }
}
export {
  client_default as default
};
//# sourceMappingURL=vite-plugin-vue-component-preview_client.js.map
