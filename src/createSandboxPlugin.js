import createCache from "@emotion/cache";

function createSandboxPlugin(selector) {
  return createCache({
    stylisPlugins: [
      (context, content) => {
        if (context === -2) {
          const newContent = content
            .replace(/,/g, `, ${selector} `)
            .replace(/}/g, `} ${selector} `);
          return `${selector} ${newContent}`;
        }

        return content;
      },
    ],
  });
}

export default createSandboxPlugin;
