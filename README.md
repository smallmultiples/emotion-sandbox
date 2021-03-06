# emotion-sandbox

A React emotion plugin for high specificity CSS

## Quick use

Use the component at the top level of your react app. It must be the ancestor of any emotion component.

```
yarn add @smallmultiples/emotion-sandbox
```

```
import { StyleSandbox } from "@smallmultiples/emotion-sandbox";

const App = (
  <StyleSandbox elementId="myEmbed">
    {/* rest of application */}
  </StyleSandbox>
);
```

## What it does

It transforms CSS of the form:

```
.css-MyComponent123 {
  color: red;
  font-size: 16;
}
```

into

```
#myEmbed .css-MyComponent123 {
  color: red;
  font-size: 16;
}
```

It also takes care of the `<div id="myEmbed">` markup.

## Why it's useful

It's handy for embedding React applications inside larger websites. In such cases, default site styles often override low specificity styled components. By increasing the specifity of the output CSS, such issues can be avoided. It obviates the need to resort to dirty hacks like the `!important` operator.

## Advanced use

`StyleSandbox` is a wrapper around emotion's [CacheProvider](https://emotion.sh/docs/cache-provider).

If you need to configure `CacheProvider` separately, here's a more manual setup:

```
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";
import { createSandboxPlugin } from "@smallmultiples/emotion-sandbox";

const styleCache = createCache({
  stylisPlugins: [
    createSandboxPlugin('#myEmbed'), // must match div id below
    /* more plugins */
  ],
  /* more options */
});

const App = (
  <CacheProvider value={styleCache}>
    <div id="myEmbed">
      {/* rest of application */}
    </div>
  </CacheProvider>
);
```
