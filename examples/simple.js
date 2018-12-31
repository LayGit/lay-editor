webpackJsonp([2],{

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(581);


/***/ }),

/***/ 581:
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
      html: '',
      content: ''
    }, _this.onHtmlToValue = function () {
      var html = '<p>html value</p>';
      _this.setState({
        value: Object(__WEBPACK_IMPORTED_MODULE_5__src_index__["c" /* htmlToValue */])(html)
      });
    }, _this.onContentToValue = function () {
      var content = '{"blocks":[{"key":"bk33u","text":"raw content","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
      _this.setState({
        value: Object(__WEBPACK_IMPORTED_MODULE_5__src_index__["b" /* contentToValue */])(JSON.parse(content))
      });
    }, _this.onValueToHtml = function () {
      _this.setState({ html: Object(__WEBPACK_IMPORTED_MODULE_5__src_index__["e" /* valueToHtml */])(_this.state.value) });
    }, _this.onValueToContent = function () {
      _this.setState({ content: JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_5__src_index__["d" /* valueToContent */])(_this.state.value)) });
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
    }, _temp), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  Test.prototype.render = function render() {
    var _state = this.state,
        value = _state.value,
        html = _state.html,
        content = _state.content;

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      { style: { padding: 20 } },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__src_index__["a" /* LayEditor */], {
        value: value,
        onChange: this.onChange,
        height: 200,
        placeholder: 'write something...' }),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'p',
        null,
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onHtmlToValue },
          'html to value'
        ),
        '\xA0\xA0',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onContentToValue },
          'content to value'
        ),
        '\xA0\xA0',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onValueToHtml },
          'value to html'
        ),
        '\xA0\xA0',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
          'button',
          { onClick: this.onValueToContent },
          'value to content'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'p',
        null,
        'convert value to html',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('textarea', {
          readOnly: true,
          style: { width: '100%' },
          rows: 5,
          value: html })
      ),
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'p',
        null,
        'convert value to raw object',
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('textarea', {
          readOnly: true,
          style: { width: '100%' },
          rows: 5,
          value: content })
      )
    );
  };

  return Test;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_4_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Test, null), document.getElementById('__react-content'));

/***/ })

},[580]);
//# sourceMappingURL=simple.js.map