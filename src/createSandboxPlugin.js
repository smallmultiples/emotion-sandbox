import createCache from "@emotion/cache";

function createSandboxPlugin(selector) {
  return createCache({
    stylisPlugins: [
      (context, content) => {
        if (context === -2) {
          return `${selector} ${content}`;
        }

        return content;
      },
    ],
  });
}

export default createSandboxPlugin;
