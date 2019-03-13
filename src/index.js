import querystring from "querystring";

import cheerio from "cheerio";
import rangeParser from "parse-numeric-range";
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
 * @typedef {object} GistQuery
 * @property {string} file the file name.
 * @property {string|Array<number>} highlights the numbers to be highlighted.
 */

/**
 * Validates the query object is valid.
 * @param {GistQuery} query the query to be validated.
 * @returns {boolean} true if the query is valid; false otherwise.
 */
function isValid(query) {
  if (query == null) return false;
  if (query.file == null && query.highlights == null) return false;

  // leaving this for future enhancements to the query object

  return true;
}

/**
 * Builds the query object.
 * This methods looks for anything that is after ? or # in the gist: directive.
 * ? is interpreted as a query string.
 * # is interpreted as a filename.
 * @param {string} value the value of the inlineCode block.
 * @returns {object} the query object.
 */
function getQuery(value) {
  const [, qs] = value.split(/[?#]/);

  // if there is no file, then return an empty object
  if (qs == null) return { highlights: [] };

  // if # is used, then force the query object
  const query = value.indexOf("#") > -1 ? { file: qs } : querystring.parse(qs);

  // validate the query
  if (!isValid(query)) {
    throw new Error("Malformed query. Check your 'gist:' imports");
  }

  // explode the highlights ranges, if any
  let highlights = [];
  if (typeof query.highlights === "string") {
    highlights = rangeParser.parse(query.highlights);
  } else if (Array.isArray(query.highlights)) {
    highlights = query.highlights;
  }

  query.highlights = highlights;

  return query;
}

/**
 * Builds the gist url.
 * @param {string} value the value of the inlineCode block.
 * @param {PluginOptions} options the options of the plugin.
 * @param {string} file the file to be loaded.
 * @returns {string} the gist url.
 */
function buildUrl(value, options, file) {
  const [gist] = value.split(/[?#]/);

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

  // builds the url and completes it with the file if any
  let url = `${baseUrl}/${username}/${id}.json`;
  if (file != null) {
    url += `?file=${file}`;
  }

  return url;
}

/**
 * Handles the markdown AST.
 * @param {{ markdownAST }} markdownAST the markdown abstract syntax tree.
 * @param {PluginOptions} options the options of the plugin.
 * @returns {*} the markdown ast.
 */
export default async ({ markdownAST }, options = {}) => {
  // this returns a promise that will fulfill immediately for everything
  // that is not an inlineCode that starts with `gist:`
  return await visit(markdownAST, "inlineCode", async node => {
    // validate pre-requisites.
    if (!node.value.startsWith("gist:")) return;

    // get the query string and build the url
    const query = getQuery(node.value.substring(5));
    const url = buildUrl(node.value.substring(5), options, query.file);

    // call the gist and update the node type and value
    const body = await request(url);
    const content = JSON.parse(body);

    // highlight the specify lines, if any
    let html = content.div;
    if (query.highlights.length > 0) {
      const $ = cheerio.load(content.div);
      const file = query.file.replace(/[^a-zA-Z0-9_]+/g, "-").toLowerCase();
      query.highlights.forEach(line => {
        $(`#file-${file}-LC${line}`).addClass("highlighted");
      });

      html = $.html();
    }

    node.type = "html";
    node.value = html.trim();

    return markdownAST;
  });
};
