webpackJsonp([3],{

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(577);


/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_index__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_index_less__);








var Test = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Test, _Component);

  function Test() {
    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Test);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      // EditorState
      value: undefined,
      locale: 'en-US'
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
    }, _temp), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  Test.prototype.onChangeLocale = function onChangeLocale(locale) {
    this.setState({ locale: locale });
  };

  Test.prototype.render = function render() {
    var _state = this.state,
        value = _state.value,
        locale = _state.locale;


    var placeholder = {
      'zh-CN': '写点什么吧...',
      'en-US': 'write something...'
    };

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      { style: { padding: 20 } },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__src_index__["a" /* LayEditor */], {
        value: value,
        onChange: this.onChange,
        locale: locale,
        placeholder: placeholder[locale] }),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'p',
        null,
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onChangeLocale.bind(this, 'zh-CN') },
          '\u7B80\u4F53\u4E2D\u6587'
        ),
        '\xA0\xA0',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onChangeLocale.bind(this, 'en-US') },
          'English'
        )
      )
    );
  };

  return Test;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Test, null), document.getElementById('__react-content'));

/***/ })

},[576]);
//# sourceMappingURL=locale.js.map