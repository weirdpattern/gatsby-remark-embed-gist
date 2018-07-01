"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _asyncUnistUtilVisit = require("async-unist-util-visit");

var _asyncUnistUtilVisit2 = _interopRequireDefault(_asyncUnistUtilVisit);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

// default base url
var baseUrl = "https://gist.github.com";

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
  var _value$split = value.split("#"),
    _value$split2 = _slicedToArray(_value$split, 2),
    gist = _value$split2[0],
    file = _value$split2[1];

  var _ref = gist.indexOf("/") > 0 ? gist.split("/") : [null, gist],
    _ref2 = _slicedToArray(_ref, 2),
    inlineUsername = _ref2[0],
    id = _ref2[1];

  // username can come from inline code or options

  var username = inlineUsername || options.username;

  // checks for a valid username
  if (username == null || username.trim().length === 0) {
    throw new Error("Missing username information");
  }

  // checks for a valid id
  if (id == null || id.trim().length === 0) {
    throw new Error("Missing gist id information");
  }

  var url = baseUrl + "/" + username + "/" + id + ".json";
  if (file != null) {
    url += "?file=" + file;
  }

  return url;
}

/**
 * Handles the markdown AST.
 * @param {{ markdownAST }} markdownAST the markdown abstract syntax tree.
 * @param {PluginOptions} optiosn the options of the plugin.
 */

exports.default = (function() {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_ref3) {
      var markdownAST = _ref3.markdownAST;
      var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return (0, _asyncUnistUtilVisit2.default)(
                  markdownAST,
                  (function() {
                    var _ref5 = _asyncToGenerator(
                      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
                        node
                      ) {
                        var url, body, content;
                        return regeneratorRuntime.wrap(
                          function _callee$(_context) {
                            while (1) {
                              switch ((_context.prev = _context.next)) {
                                case 0:
                                  if (
                                    !(
                                      node.type !== "inlineCode" ||
                                      !node.value.startsWith("gist:")
                                    )
                                  ) {
                                    _context.next = 2;
                                    break;
                                  }

                                  return _context.abrupt("return");

                                case 2:
                                  // build the url.
                                  url = buildUrl(
                                    node.value.substring(5),
                                    options
                                  );

                                  // call the gist and update the node type and value.

                                  _context.next = 5;
                                  return (0, _requestPromise2.default)(url);

                                case 5:
                                  body = _context.sent;
                                  content = JSON.parse(body);

                                  node.type = "html";
                                  node.value = content.div;

                                  return _context.abrupt("return", markdownAST);

                                case 10:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          },
                          _callee,
                          undefined
                        );
                      })
                    );

                    return function(_x3) {
                      return _ref5.apply(this, arguments);
                    };
                  })()
                );

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        },
        _callee2,
        undefined
      );
    })
  );

  return function(_x2) {
    return _ref4.apply(this, arguments);
  };
})();
