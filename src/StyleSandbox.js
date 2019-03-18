import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/core";
import createSandboxPlugin from "./createSandboxPlugin";

const propTypes = {
  children: PropTypes.node.isRequired,
  elementId: PropTypes.string.isRequired,
};

function StyleSandbox({ children, elementId }) {
  const styleCache = useMemo(() => createSandboxPlugin(`#${elementId}`), [elementId]);

  return (
    <CacheProvider value={styleCache}>
      <div id={elementId}>
        {children}
      </div>
    </CacheProvider>
  );
}

StyleSandbox.propTypes = propTypes;

export default StyleSandbox;
