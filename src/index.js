import request from "request-promise";
import visit from "async-unist-util-visit";

// default base url
const baseUrl = "https://gist.github.com";

/**
 * @typedef {object} PluginOptions
 * @property {string} username the default gist user.
 * @property {boolean} includeDefaultCss a flag indicating the default css should be included
 */

/**
 * Builds the gist url.
 * @param {string} value the value of the inlineCode block
 * @param {PluginOptions} options the options of the plugin.
 */
function buildUrl(value, options) {
  const [gist, file] = value.split("#");

  const [inlineUsername, id] =
    gist.indexOf("/") > 0 ? gist.split("/") : [null, gist];

  // username can come from inline code or options
  const username = inlineUsername || options.username;

  // checks for a valid username
  if (username == null || username.trim().length === 0) {
    throw new Error("Missing username information");
  }

  // checks for a valid id
  if (id == null || id.trim().length === 0) {
    throw new Error("Missing gist id information");
  }

  let url = `${baseUrl}/${username}/${id}.json`;
  if (file != null) {
    url += `?file=${file}`;
  }

  return url;
}

/**
 * Handles the markdown AST.
 * @param {{ markdownAST }} markdownAST the markdown abstract syntax tree.
 * @param {PluginOptions} optiosn the options of the plugin.
 */
export default ({ markdownAST }, options = {}) => {
  // this returns a promise that will fulfill immediately for everything
  // that is not an inlineCode that starts with `gist:`.
  return visit(markdownAST, async node => {
    // validate pre-requisites.
    if (node.type !== "inlineCode" || !node.value.startsWith("gist:")) return;

    // build the url.
    const url = buildUrl(node.value.substring(5), options);

    // call the gist and update the node type and value.
    const body = await request(url);
    const content = JSON.parse(body);

    node.type = "html";
    node.value = content.div;

    return markdownAST;
  });
};
