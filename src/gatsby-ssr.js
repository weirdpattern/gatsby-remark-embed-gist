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
export function onRenderBody(
  { setHeadComponents },
  options = {
    gistCssPreload: false,
    gistCssUrlAddress:
      "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
  }
) {
  let includeCss = true;
  if (options.gistDefaultCssInclude != null) {
    includeCss = options.gistDefaultCssInclude;
  } else if (options.includeDefaultCss != null) {
    includeCss = options.includeDefaultCss;
  }

  const key = "gist-embed-b3b573358bfc66d89e1e95dbf8319c09";

  if (includeCss) {
    setHeadComponents(
      options.gistCssPreload
        ? [
            <link
              id={key}
              as="style"
              href={options.gistCssUrlAddress}
              key={key}
              rel="preload"
            />,
            <noscript key={"noscript-" + key}>
              <link href={options.gistCssUrlAddress} rel="stylesheet" />
            </noscript>,
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  var link = document.querySelector("#${key}");
                  link.addEventListener("load", function() {
                    this.rel = "stylesheet"
                  });
                `
              }}
            ></script>
          ]
        : [<link href={options.gistCssUrlAddress} rel="stylesheet" />]
    );
  }
}
