import React from "react";

/**
 * @typedef {object} PluginOptions
 * @property {string} username the default gist user.
 * @property {boolean} includeDefaultCss a flag indicating the default css should be included
 */

/**
 * Adds a link to the Github Gist default css.
 * @param {{ setHeadComponents }} setHeadComponents adds components to <head>.
 * @param {PluginOptions} options the options of the plugin.
 * @returns {*} rendered body.
 */
export function onRenderBody({ setHeadComponents }, options = {}) {
  if (options.includeDefaultCss !== false) {
    return setHeadComponents([
      <link
        as="style"
        href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
        key="gist-embeded-b3b573358bfc66d89e1e95dbf8319c09"
        onLoad="this.onload=null;this.rel='stylesheet'"
        rel="preload"
      />,
      <noscript key="gist-embeded-noscript-b3b573358bfc66d89e1e95dbf8319c09">
        <link
          href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
          key="gist-embeded-b3b573358bfc66d89e1e95dbf8319c09"
          rel="stylesheet"
        />
      </noscript>
    ]);
  }

  return null;
}
