(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/locale/id */ "./node_modules/date-fns/locale/id/index.js");
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_id__WEBPACK_IMPORTED_MODULE_2__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var h = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Brunei',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).substr(0, 10);
var a = h.split('/');
var now = a[2] + '-' + a[0] + '-' + a[1];
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      expand: false,
      headers: [{
        text: 'No/Stat',
        align: 'left',
        sortable: false,
        value: 'no_rm',
        width: '1%'
      }, {
        text: 'Nama Pasien',
        value: 'anggota.nama_pasien',
        sortable: false
      }, {
        text: 'Jenis',
        align: 'left',
        value: 'anggota.jenis_pasien',
        sortable: false,
        width: '1%'
      }, {
        text: 'Aksi',
        align: 'center',
        sortable: false,
        width: '1%'
      }],
      today: now,
      live: null,
      loadingTB: false
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(['antrian']), {
    tglTerformat: function tglTerformat() {
      return this.today ? date_fns_format__WEBPACK_IMPORTED_MODULE_1___default()(this.today, 'DD MMMM YYYY', {
        locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_2___default.a
      }) : '';
    }
  }),
  mounted: function mounted() {
    this.initialize();
  },
  methods: {
    initialize: function initialize() {
      this.$store.dispatch('fetchAntrian');
    }
  },
  created: function created() {
    var _this = this;

    this.live = setInterval(function () {
      _this.$store.dispatch('fetchAntrian');
    }, 5000);
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.live);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-toolbar",
        { attrs: { flat: "", color: "white" } },
        [
          _c(
            "v-layout",
            {
              attrs: {
                "align-center": "",
                "justify-center": "",
                row: "",
                "fill-height": ""
              }
            },
            [
              _c(
                "v-toolbar-title",
                { class: { subheading: _vm.$vuetify.breakpoint.xs } },
                [
                  _vm._v(
                    "\n            " + _vm._s(_vm.tglTerformat) + "\n        "
                  )
                ]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c("v-data-table", {
        attrs: {
          headers: _vm.headers,
          items: _vm.antrian,
          "item-key": "id",
          "hide-actions": "",
          loading: _vm.loadingTB
        },
        scopedSlots: _vm._u([
          {
            key: "items",
            fn: function(props) {
              return [
                _c(
                  "tr",
                  {
                    on: {
                      click: function($event) {
                        props.expanded = !props.expanded
                      }
                    }
                  },
                  [
                    _c(
                      "td",
                      { staticClass: "text-xs-center caption" },
                      [
                        _c(
                          "v-layout",
                          {
                            staticClass: "px-0",
                            attrs: { "align-center": "", warp: "" }
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "px-0" },
                              [
                                _c("v-icon", { attrs: { small: "" } }, [
                                  _vm._v(
                                    _vm._s(
                                      props.expanded
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_up"
                                    )
                                  )
                                ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "px-0" },
                              [
                                props.item.status == "Selesai" &&
                                props.item.status_bayar == "Lunas"
                                  ? _c(
                                      "v-icon",
                                      { attrs: { color: "green" } },
                                      [_vm._v("check_circle")]
                                    )
                                  : _c("span", { staticClass: "px-2" }, [
                                      _vm._v(_vm._s(props.index + 1))
                                    ])
                              ],
                              1
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left text-no-wrap",
                        class: { caption: _vm.$vuetify.breakpoint.xs }
                      },
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(props.item.anggota.nama_pasien) +
                            "\n          "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left",
                        class: { caption: _vm.$vuetify.breakpoint.xs }
                      },
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(props.item.anggota.jenis_pasien) +
                            "\n          "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "justify-center align-center layout px-0",
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                          }
                        }
                      },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              color: "secondary",
                              icon: "",
                              small: "",
                              to: "/rekam-medik/" + props.item.anggota.no_rm
                            }
                          },
                          [
                            _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v("assignment")
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                )
              ]
            }
          },
          {
            key: "expand",
            fn: function(props) {
              return [
                _c(
                  "v-layout",
                  {
                    staticClass: "grey lighten-4 text-xs-left",
                    attrs: { "justify-center": "", "pa-1": "" }
                  },
                  [
                    _c(
                      "v-flex",
                      { attrs: { xs12: "", sm12: "", md12: "", lg12: "" } },
                      [
                        _c(
                          "v-card",
                          [
                            _c(
                              "v-layout",
                              {
                                staticClass: "pa-1",
                                attrs: { wrap: "", column: "" }
                              },
                              [
                                _c(
                                  "v-flex",
                                  {
                                    attrs: {
                                      xs12: "",
                                      sm12: "",
                                      md12: "",
                                      lg12: ""
                                    }
                                  },
                                  [
                                    _c(
                                      "v-card-title",
                                      { staticClass: "py-1 px-3" },
                                      [
                                        _c(
                                          "h4",
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { small: "" } },
                                              [_vm._v("layers")]
                                            ),
                                            _vm._v(" Keluhan/Permintaan: "),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "green--text text--darken-3"
                                              },
                                              [
                                                _vm._v(
                                                  "[ " +
                                                    _vm._s(
                                                      props.item.anggota.no_rm
                                                    ) +
                                                    " ]"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass: "font-weight-light"
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    props.item.anggota
                                                      .nama_pasien
                                                  )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("v-divider"),
                                _vm._v(" "),
                                _c(
                                  "v-flex",
                                  {
                                    attrs: {
                                      xs12: "",
                                      sm12: "",
                                      md12: "",
                                      lg12: ""
                                    }
                                  },
                                  [
                                    _c("v-card-text", { staticClass: "py-2" }, [
                                      _vm._v(_vm._s(props.item.keluhan))
                                    ])
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            }
          },
          {
            key: "footer",
            fn: function() {
              return [
                _c(
                  "td",
                  {
                    staticClass: "text-xs-left",
                    class: { caption: _vm.$vuetify.breakpoint.xs },
                    attrs: { colspan: _vm.headers.length }
                  },
                  [
                    _c(
                      "span",
                      { staticClass: "font-weight-bold font-italic" },
                      [
                        _vm._v(
                          "*Klik cell untuk melihat keluhan/permintaan dari pasien."
                        )
                      ]
                    )
                  ]
                )
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/loket/antrian/AntrianToday.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/loket/antrian/AntrianToday.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AntrianToday.vue?vue&type=template&id=d65c1386& */ "./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386&");
/* harmony import */ var _AntrianToday_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AntrianToday.vue?vue&type=script&lang=js& */ "./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AntrianToday_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/loket/antrian/AntrianToday.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AntrianToday_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AntrianToday.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AntrianToday_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AntrianToday.vue?vue&type=template&id=d65c1386& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/AntrianToday.vue?vue&type=template&id=d65c1386&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AntrianToday_vue_vue_type_template_id_d65c1386___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);