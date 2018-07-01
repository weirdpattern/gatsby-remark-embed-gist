"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRenderBody = onRenderBody;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @typedef {object} PluginOptions
 * @property {string} username the default gist user.
 * @property {boolean} includeDefaultCss a flag indicating the default css should be included
 */

/**
 * Adds a link to the Github Gist default css.
 * @param {{ setHeadComponent }} setHeadComponent adds components to <head>.
 * @param {PluginOptions} options the options of the plugin.
 */
function onRenderBody(_ref) {
  var setHeadComponent = _ref.setHeadComponent;
  var options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.includeDefaultCss !== false) {
    return setHeadComponent([
      _react2.default.createElement("link", {
        rel: "stylesheet",
        href:
          "https://assets-cdn.github.com/assets/gist-embed-87673c31a5b37b5e6556b63e1081ebbc.css"
      })
    ]);
  }

  return null;
}
