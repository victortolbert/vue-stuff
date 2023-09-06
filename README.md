# Vue Stuff -- View Prototyping Toolkit

design, prototype, and build your next great idea—fast.

## Features

- ✅ Dark mode support
- ✅ Bundled icons
- ✅ Fully typed
- ✅ Continuous Integration (CI) and Continuous Deployment (CD)
- ✅ Deploy previews
- ✅ Unit tests
- ✅ End-to-end tests

## Values

- Gratitude
- Wisdom
- Care
- Courage
- Grit
- Celebration

## Gratitude

"Gratitude expressed is joy multiplied."

Chris Carneal, Founder and CEO
Booster

## Courage

Courage to ask, listen, act.

We all have FEAR. If we don't have fear, we wouldn't have the opportunity to have courage.

Asking for input, truly listening, and ACTING on that requires courage.

Clint Demetriou, Chief People Officer

## Care

Care is empathy. Care is felt.

Chris Carneal, Founder and CEO
Booster

## Grit

"Tough things we don't want, when viewed through the right lenses, make us better."

Chris Carneal, Founder and CEO
Booster

## Celebration

We we celebrate we enthusiastically affirm other people, calling out their strengths and accomplishments.

- Render, View Renderer
- DOMPurify, sanitize HTML
- CMD K
- Data fetching ($fetch, useAsyncData, useFetch, fetch, axios)
- universal javascript unjs
- testing library
- sentry

https://nuxt.com/docs/api/composables/use-state
https://nuxt.com/docs/api/composables/use-async-data
https://nuxt.com/docs/api/composables/use-fetch
https://nuxt.com/docs/api/utils/dollarfetch
https://axios-http.com/docs/intro
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://nuxt.com/docs/getting-started/error-handling
https://vueuse.org/core/useLocalStorage/
https://vueuse.org/core/useAsyncState/
https://vueuse.org/core/useMediaControls/
https://vueuse.org/core/useMemory/
https://vueuse.org/core/useEyeDropper/
https://vuelidate-next.netlify.app/guide.html
https://vuejs.org/guide/built-ins/teleport.html
https://github.com/ant-design/ant-design-colors#readme
https://github.com/unjs/theme-colors#readme
https://dev.azure.com/hancockclaimsconsultants/Exemplar/_workitems/edit/2744
https://dev.azure.com/hancockclaimsconsultants/Exemplar/_workitems/edit/2607
https://dev.azure.com/hancockclaimsconsultants/Exemplar/_workitems/edit/2728
https://dev.azure.com/hancockclaimsconsultants/Exemplar/_workitems/edit/2672
https://dev.azure.com/hancockclaimsconsultants/Exemplar/_workitems/edit/2666

```vue
<script setup>
const store = useStore()
const { data } = await useAsyncData('user', () => store.fetchUser())
</script>
```
<!-- <script src="https://kit.fontawesome.com/945635a382.js" crossorigin="anonymous"></script> -->

# Vue Stuff

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
