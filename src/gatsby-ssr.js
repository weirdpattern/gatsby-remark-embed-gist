import React from "react";

const defaultCssUrl =
  "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css";

/**
 * @typedef {object} PluginOptions
 * @property {string} username the default gist user.
 * @property {boolean} includeDefaultCss a flag indicating the default css should be included
 * @property {OverridePluginOptions} overrides an object with overrides
 */

/**
 * @typedef {object} OverridePluginOptions
 * @property {string} gistUrl the base gist url.
 * @property {string} gistCssUrl the gist css url.
 */

/**
 * Adds a link to the Github Gist default css.
 * @param {{ setHeadComponents }} setHeadComponents adds components to <head>.
 * @param {PluginOptions} options the options of the plugin.
 * @returns {*} rendered body.
 */
export function onRenderBody({ setHeadComponents }, options = {}) {
  // ensure overrides are created
  options.overrides = options.overrides || {};

  // check if default css should be included
  if (options.includeDefaultCss !== false) {
    const url = options.overrides.gistCssUrl || defaultCssUrl;

    return setHeadComponents([
      <link key="gist-embedded-css-key" rel="stylesheet" href={url} />
    ]);
  }

  return null;
}
