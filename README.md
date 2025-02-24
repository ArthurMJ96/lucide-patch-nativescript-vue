# @amj7/lucide-patch-nativescript-vue

Patches `lucide-vue-next` to be used in NativeScript Vue 3 via `@nativescript-community/ui-svg` and `@vue/server-renderer`.

This package addresses compatibility issues between `lucide-vue-next` and NativeScript Vue 3 by:

- Applying a patch (`lucide-vue-next+0.475.0.patch`) to your project during the `postinstall` script.
- Providing a `nativescript.webpack.js` in the plugin that overrides imports of "vue" within `@vue/server-renderer` to point to your project's Vue instance.
- Enabling tree-shaking for `lucide-vue-next` icons in your NativeScript Vue 3 application.

## Installation

1.  **Install Peer Dependencies:**

    ```bash
    npm install @nativescript-community/ui-canvas @nativescript-community/ui-svg @vue/server-renderer
    ```

2.  **Install this Package:**

    ```bash
    npm install @amj7/lucide-patch-nativescript-vue
    ```

    The `postinstall` script will automatically apply the patch to your `lucide-vue-next` dependency (version `^0.475.0`).

3.  **Register SVGView:**

    In your `app.js` (or equivalent entry point):

    ```ts
    import { registerElement } from "nativescript-vue";

    registerElement(
      "SVGView",
      () => require("@nativescript-community/ui-svg").SVGView
    );
    ```

## Usage

Refer to the [Lucide Vue Next documentation](https://lucide.dev/guide/packages/lucide-vue-next) for general usage instructions. This package ensures compatibility with NativeScript Vue 3.

```vue
<script setup>
import { Camera } from "lucide-vue-next";
</script>

<template>
  <Camera color="red" :size="32" />
</template>
```

### Props

| Prop                    | Type      | Default        |
| ----------------------- | --------- | -------------- |
| `size`                  | `number`  | `24`           |
| `color`                 | `string`  | `currentColor` |
| `stroke-width`          | `number`  | `2`            |
| `absolute-stroke-width` | `boolean` | `false`        |
| `default-class`         | `string`  | `lucide-icon`  |

---

---

---

## Troubleshooting

- **Verifying the Patch:** Check if `node_modules/lucide-vue-next/dist/esm/createLucideIcon.js` has been modified. You should see a `defineComponent` call within the file. If the patch hasn't been applied, try running `npm install` again.

- **`TypeError: Vue.initDirectivesForSSR is not a function`:** This error indicates that the `nativescript.webpack.js` plugin was not applied correctly.

  - **Manual Configuration:** Add the webpack rule directly to your `webpack.config.js` file.

    ```ts
    // webpack.config.js
    const webpack = require("@nativescript/webpack");
    const path = require("path");

    module.exports = (env) => {
      webpack.init(env);

      webpack.chainWebpack((config) => {
        // Create a new rule for files coming from the specific package.
        config.module
          .rule("override-vue-for-server-renderer")
          .test(/\.(js|vue)$/)
          .include.add(
            path.resolve(__dirname, "node_modules", "@vue", "server-renderer")
          )
          .end()
          // Override the resolution so that any import of "vue" in @vue/server-renderer files points to the original Vue package
          .resolve.alias.set(
            "vue",
            path.resolve(__dirname, "node_modules/vue")
          );
      });

      return webpack.resolveConfig();
    };
    ```

---

<a href="https://buymeacoffee.com/amj7" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
