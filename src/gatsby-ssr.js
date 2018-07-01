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
 */
export function onRenderBody({ setHeadComponents }, options = {}) {
  if (options.includeDefaultCss !== false) {
    return setHeadComponents([
      <link
        rel="stylesheet"
        href="https://assets-cdn.github.com/assets/gist-embed-87673c31a5b37b5e6556b63e1081ebbc.css"
      />
    ]);
  }

  return null;
}
