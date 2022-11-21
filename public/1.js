(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Errors.js */ "./resources/js/Errors.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.min.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/locale/id */ "./node_modules/date-fns/locale/id/index.js");
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_id__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Person_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../Person.js */ "./resources/js/Person.js");
/* harmony import */ var _core_img_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../core/img.js */ "./resources/js/components/core/img.js");
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
var now = a.join('-');
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      cok: false,
      today: now,
      dialog: false,
      modal: false,
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [{
        text: '#',
        align: 'left',
        sortable: false,
        value: 'no_rm',
        width: '1%'
      }, {
        text: 'No. RM',
        align: 'left',
        sortable: true,
        value: 'no_rm',
        width: '1%'
      }, {
        text: 'Nama Pasien',
        align: 'left',
        sortable: true,
        value: 'nama_pasien'
      }, {
        text: 'Jenis Pasien',
        align: 'left',
        sortable: true,
        value: 'jenis_pasien'
      }, {
        text: 'Aksi',
        value: 'name',
        sortable: false,
        align: 'center',
        width: '1%'
      }],
      jenis: ['Umum', 'Inhealth', 'AP', 'Lainnya'],
      stat: ['Suami', 'Istri', 'Anak', 'Lainnya'],
      errors: null,
      editedIndex: -1,
      editedItem: {
        kepala: null,
        no_rm: null,
        nama_pasien: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        no_hp: '',
        pekerjaan: '',
        id_telegram: '',
        jenis_pasien: '',
        jenis_kelamin: '',
        status: ''
      },
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        },
        min: function min(v) {
          return v && v.length >= 3 || 'Min 3 karakter';
        },
        numberOnly: function numberOnly(v) {
          return !isNaN(v) || 'Hanya Nomor yang diperbolehkan...';
        }
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(['keluargas', 'anggotas', 'setItem']), {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Tambah Pasien' : 'Edit Data Pasien';
    },
    tglTerformat: function tglTerformat() {
      return this.editedItem.tanggal_lahir ? date_fns_format__WEBPACK_IMPORTED_MODULE_3___default()(this.editedItem.tanggal_lahir, 'DD MMMM YYYY', {
        locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_4___default.a
      }) : '';
    }
  }),
  watch: {
    modal: function modal(val) {
      var _this = this;

      val && setTimeout(function () {
        return _this.$refs.picker.activePicker = 'YEAR';
      });
    }
  },
  mounted: function mounted() {
    this.initialize();
    this.$store.dispatch('fetchSet');
  },
  methods: {
    random: function random() {
      var bar = this.today.split('-');
      var foo = bar[2].slice(2, 4) + bar[0] + bar[1];
      var dom = foo + Math.floor(Math.random() * (999 - 100 + 1) + 100);
      var c = this.anggotas.find(function (f) {
        return f.no_rm === dom;
      });

      if (!c) {
        return this.editedItem.no_rm = dom;
      }
    },
    initialize: function initialize() {
      this.$store.dispatch('fetchKeluarga');
      this.$store.dispatch('fetchAnggota');
    },
    customFilter: function customFilter(item, queryText, itemText) {
      var textOne = item.no_keluarga.toLowerCase();
      var textTwo = item.nama_kepala.toLowerCase();
      var searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    },
    editItem: function editItem(item) {
      this.editedIndex = this.anggotas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    loading: function loading() {
      this.loadingTB = true;
      this.loadingBtn = true;
    },
    ready: function ready() {
      this.loadingTB = false;
      this.loadingBtn = false;
    },
    deleteItem: function deleteItem(item) {
      var _this2 = this;

      this.loading();
      swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <span class="red--text font-weight-bold">[' + item.no_rm + '] ' + item.nama_pasien + '</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
      }).then(function (response) {
        if (response.value) {
          _this2.$Progress.start();

          axios["delete"]('api/anggota/' + item.id).then(function () {
            swal.fire('Deleted!', 'Data dari <span class="green--text font-weight-bold">[' + item.no_rm + '] ' + item.nama_pasien + '</span>  telah terhapus!!.', 'success');
            setTimeout(function () {
              _this2.$Progress.finish();

              _this2.initialize();

              _this2.ready();
            }, 2000);
          })["catch"](function () {
            swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");

            _this2.ready();

            _this2.$Progress.finish();
          });
        } else {
          _this2.ready();

          _this2.$Progress.finish();
        }
      });
    },
    close: function close() {
      var _this3 = this;

      this.ready();
      this.dialog = false;
      setTimeout(function () {
        _this3.editedIndex = -1;

        _this3.$refs.form.reset();

        _this3.$refs.form.resetValidation();

        _this3.editedItem = {
          kepala: null,
          no_rm: null,
          nama_pasien: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          alamat: '',
          no_hp: '',
          pekerjaan: '',
          id_telegram: '',
          jenis_pasien: '',
          jenis_kelamin: '',
          status: ''
        };
        _this3.errors = new _Errors_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      }, 300);
    },
    save: function save() {
      var _this4 = this;

      this.loading();

      if (this.editedIndex > -1) {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.put('api/anggota/' + this.editedItem.id, this.editedItem).then(function (response) {
            _this4.initialize();

            setTimeout(function () {
              _this4.$Progress.finish();

              toast.fire({
                type: 'success',
                title: 'Data Pasien berhasil diupdate~'
              });

              _this4.close();
            }, 1500);
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });
            setTimeout(function () {
              _this4.$Progress.finish();

              _this4.close();
            }, 5000);
          });
        } else {
          setTimeout(function () {
            _this4.$Progress.finish();

            _this4.ready();
          }, 1500);
        }
      } else {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.post('api/anggota', this.editedItem).then(function (response) {
            _this4.initialize();

            setTimeout(function () {
              _this4.$Progress.finish();

              toast.fire({
                type: 'success',
                title: 'Pasien berhasil ditambahkan~'
              });

              _this4.close();
            }, 1500);
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });

            _this4.errors.record(error.response.data);

            setTimeout(function () {
              _this4.close();

              _this4.$Progress.finish();
            }, 5000);
          });
        } else {
          setTimeout(function () {
            _this4.$Progress.finish();

            _this4.ready();
          }, 1500);
        }
      }
    },
    printKartu: function printKartu(item) {
      var _this5 = this;

      (function (API) {
        API.myText = function (txt, options, x, y) {
          options = options || {};

          if (options.align == "center") {
            var fontSize = this.internal.getFontSize();
            var pageWidth = this.internal.pageSize.width;
            var txtWidth = this.getStringUnitWidth(txt) * fontSize / this.internal.scaleFactor;
            x = (pageWidth - txtWidth) / 2;
          }

          this.text(txt, x, y);
        };
      })(jspdf__WEBPACK_IMPORTED_MODULE_2___default.a.API);

      var doc = new jspdf__WEBPACK_IMPORTED_MODULE_2___default.a('l', 'mm', [90, 55]);
      var totalPagesExp = "{total_pages_count_string}";
      var son = new _Person_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
      doc.setFontSize(4);
      doc.setFontStyle('bold');
      doc.myText(this.setItem.InkjetA, {
        align: "center"
      }, 0, 2);
      doc.setFontSize(4);
      doc.addImage(_core_img_js__WEBPACK_IMPORTED_MODULE_6__["default"], 'JPEG', 1, 1, 2, 3);
      doc.myText(this.setItem.InkjetB, {
        align: "center"
      }, 0, 3.2);
      doc.setFontSize(3);
      doc.setFontStyle('normal');
      doc.myText(this.setItem.InkjetC, {
        align: "center"
      }, 0, 4.5);
      doc.setFontSize(2);
      doc.setFontStyle('italic');
      doc.myText(this.setItem.InkjetD, {
        align: "center"
      }, 0, 5.5);
      doc.line(1, 6, doc.internal.pageSize.width - 1, 6);
      doc.setFontSize(4);
      doc.setFontStyle('bold');
      doc.myText("KARTU BEROBAT", {
        align: "center"
      }, 0, 8);
      doc.setFontSize(4);
      doc.setFontStyle('normal');
      doc.text("No. RM", 1, 10);
      doc.setFontStyle('bold');
      doc.text(": " + item.no_rm, 10, 10);
      doc.setFontStyle('normal');
      doc.text("Nama", 1, 11.8);
      doc.text(": " + item.nama_pasien, 10, 11.8);
      doc.text("TTL", 1, 13.3);
      doc.setFontSize(3);
      doc.text(":  " + item.tempat_lahir + ', ' + son.tglIndo(item.tanggal_lahir), 10, 13.3);
      doc.setFontSize(4);
      doc.text("Jenis Kelamin", 1, 14.8);
      doc.text(": " + item.jenis_kelamin, 10, 14.8);
      doc.setFontSize(4);
      doc.setFontStyle('bold');
      doc.myText("** HARAP DIBAWA BILA BEROBAT **", {
        align: "center"
      }, 0, 18.5);
      this.readyPDF = false;
      this.modalPrint = true;

      var wait = function wait(ms) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, ms);
        });
      };

      this.loadingBtn = true;
      wait(1500).then(function () {
        doc.autoPrint();
        var string = doc.output('datauristring');
        _this5.sumberPDF = string;
        _this5.loadingBtn = false;
        _this5.readyPDF = true;
      })["catch"](function () {
        setTimeout(function () {
          _this5.errorPDF = true;
          _this5.loadingBtn = false;
        }, 1000);
      });
    },
    closePrint: function closePrint() {
      this.modalPrint = false;
      this.sumberPDF = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
        { staticClass: "pb-2 pt-1", attrs: { flat: "", color: "white" } },
        [
          _c("v-text-field", {
            attrs: {
              "append-icon": "search",
              label: "Cari Pasien...",
              "single-line": "",
              "hide-details": "",
              clearable: ""
            },
            model: {
              value: _vm.search,
              callback: function($$v) {
                _vm.search = $$v
              },
              expression: "search"
            }
          }),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: {
                fullscreen: _vm.$vuetify.breakpoint.xs,
                "max-width": "840px",
                height: "100%",
                persistent: ""
              },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(ref) {
                    var on = ref.on
                    return [
                      _c(
                        "v-btn",
                        _vm._g(
                          {
                            attrs: {
                              fab: "",
                              small: "",
                              disabled: _vm.loadingBtn,
                              color: "secondary"
                            }
                          },
                          on
                        ),
                        [
                          _c("v-icon", { attrs: { medium: "" } }, [
                            _vm._v(
                              "\n                  person_add\n              "
                            )
                          ])
                        ],
                        1
                      )
                    ]
                  }
                }
              ]),
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _vm._v(" "),
              _c(
                "v-card",
                [
                  _c(
                    "v-card-actions",
                    { staticClass: "indigo darken-2" },
                    [
                      _c(
                        "v-layout",
                        {
                          staticClass: "headline white--text ml-2",
                          attrs: { wrap: "", row: "" }
                        },
                        [
                          _c(
                            "v-icon",
                            {
                              staticClass: "mr-2",
                              attrs: { dark: "", medium: "" }
                            },
                            [_vm._v("person")]
                          ),
                          _vm._v(" "),
                          _c("div", [_vm._v(_vm._s(_vm.formTitle))])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "orange darken-2",
                          attrs: { icon: "", dark: "", flat: "" },
                          on: { click: _vm.close }
                        },
                        [_c("v-icon", [_vm._v("close")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-form",
                    { ref: "form" },
                    [
                      _c(
                        "v-card-text",
                        { staticClass: "pa-0" },
                        [
                          _c(
                            "v-container",
                            {
                              staticClass: "px-4 pt-3 pb-5",
                              attrs: { "grid-list-md": "" }
                            },
                            [
                              _c(
                                "v-layout",
                                {
                                  attrs: {
                                    "justify-space-between": "",
                                    wrap: ""
                                  }
                                },
                                [
                                  _vm.editedIndex > -1
                                    ? _c(
                                        "v-flex",
                                        {
                                          attrs: {
                                            xs12: "",
                                            sm12: "",
                                            md12: "",
                                            "order-md1": "",
                                            "order-xs1": ""
                                          }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              disabled: "",
                                              "prepend-icon":
                                                "supervised_user_circle",
                                              label: "Pilih Keluarga",
                                              value:
                                                _vm.editedItem.keluarga
                                                  .no_keluarga +
                                                " - " +
                                                _vm.editedItem.keluarga
                                                  .nama_kepala
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.editedIndex == -1
                                    ? _c(
                                        "v-flex",
                                        {
                                          attrs: {
                                            xs12: "",
                                            sm12: "",
                                            md12: "",
                                            "order-md1": "",
                                            "order-xs1": ""
                                          }
                                        },
                                        [
                                          _c("v-autocomplete", {
                                            attrs: {
                                              hint:
                                                "Jika keluarga tidak ditemukan, silahkan daftarkan keluarga tersebut terlebih dahulu.",
                                              items: _vm.keluargas,
                                              label: "Pilih Keluarga",
                                              "persistent-hint": "",
                                              "prepend-icon":
                                                "supervised_user_circle",
                                              filter: _vm.customFilter,
                                              clearable: "",
                                              rules: [_vm.rules.required]
                                            },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "selection",
                                                  fn: function(data) {
                                                    return [
                                                      _c(
                                                        "span",
                                                        {
                                                          class: {
                                                            caption:
                                                              _vm.$vuetify
                                                                .breakpoint.xs
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              data.item
                                                                .no_keluarga
                                                            ) +
                                                              " - " +
                                                              _vm._s(
                                                                data.item
                                                                  .nama_kepala
                                                              )
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  }
                                                },
                                                {
                                                  key: "item",
                                                  fn: function(data) {
                                                    return [
                                                      _vm._v(
                                                        "\n                        " +
                                                          _vm._s(
                                                            data.item
                                                              .no_keluarga
                                                          ) +
                                                          " - " +
                                                          _vm._s(
                                                            data.item
                                                              .nama_kepala
                                                          ) +
                                                          "\n                      "
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              false,
                                              1265186739
                                            ),
                                            model: {
                                              value: _vm.editedItem.kepala,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedItem,
                                                  "kepala",
                                                  $$v
                                                )
                                              },
                                              expression: "editedItem.kepala"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "align-content-end": "",
                                        "order-md2": "",
                                        "order-xs2": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          disabled: _vm.editedIndex > -1,
                                          readonly: "",
                                          label: "No Rekam Medik",
                                          "append-icon": "settings",
                                          hint:
                                            "Click icon gear untuk mengisi no rekam medik.",
                                          "prepend-icon": "contacts",
                                          clearable: "",
                                          rules: [_vm.rules.required]
                                        },
                                        on: { "click:append": _vm.random },
                                        model: {
                                          value: _vm.editedItem.no_rm,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "no_rm",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.no_rm"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md3": "",
                                        "order-xs3": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "Nama Pasien",
                                          maxlength: "25",
                                          counter: "",
                                          "prepend-icon": "person_pin",
                                          clearable: "",
                                          rules: [
                                            _vm.rules.required,
                                            _vm.rules.min
                                          ]
                                        },
                                        model: {
                                          value: _vm.editedItem.nama_pasien,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "nama_pasien",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.nama_pasien"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md4": "",
                                        "order-xs4": ""
                                      }
                                    },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          label: "Jenis Pasien",
                                          items: _vm.jenis,
                                          "prepend-icon": "stars",
                                          rules: [_vm.rules.required]
                                        },
                                        model: {
                                          value: _vm.editedItem.jenis_pasien,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "jenis_pasien",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.jenis_pasien"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md5": "",
                                        "order-xs5": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "Tempat Lahir",
                                          maxlength: "25",
                                          counter: "",
                                          "prepend-icon": "place",
                                          clearable: "",
                                          rules: [
                                            _vm.rules.required,
                                            _vm.rules.min
                                          ]
                                        },
                                        model: {
                                          value: _vm.editedItem.tempat_lahir,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "tempat_lahir",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.tempat_lahir"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md6": "",
                                        "order-xs9": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "Pekerjaan",
                                          maxlength: "25",
                                          counter: "",
                                          "prepend-icon": "work",
                                          clearable: "",
                                          rules: [_vm.rules.required]
                                        },
                                        model: {
                                          value: _vm.editedItem.pekerjaan,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "pekerjaan",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.pekerjaan"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md7": "",
                                        "order-xs6": ""
                                      }
                                    },
                                    [
                                      _c(
                                        "v-dialog",
                                        {
                                          ref: "dialog",
                                          attrs: {
                                            "return-value":
                                              _vm.editedItem.tanggal_lahir,
                                            persistent: "",
                                            lazy: "",
                                            "full-width": "",
                                            width: "290px",
                                            "prepend-icon": "date_range"
                                          },
                                          on: {
                                            "update:returnValue": function(
                                              $event
                                            ) {
                                              return _vm.$set(
                                                _vm.editedItem,
                                                "tanggal_lahir",
                                                $event
                                              )
                                            },
                                            "update:return-value": function(
                                              $event
                                            ) {
                                              return _vm.$set(
                                                _vm.editedItem,
                                                "tanggal_lahir",
                                                $event
                                              )
                                            }
                                          },
                                          scopedSlots: _vm._u([
                                            {
                                              key: "activator",
                                              fn: function(ref) {
                                                var on = ref.on
                                                return [
                                                  _c(
                                                    "v-text-field",
                                                    _vm._g(
                                                      {
                                                        attrs: {
                                                          value:
                                                            _vm.tglTerformat,
                                                          label:
                                                            "Tanggal Lahir",
                                                          "prepend-icon":
                                                            "event",
                                                          readonly: "",
                                                          rules: [
                                                            _vm.rules.required
                                                          ]
                                                        }
                                                      },
                                                      on
                                                    )
                                                  )
                                                ]
                                              }
                                            }
                                          ]),
                                          model: {
                                            value: _vm.modal,
                                            callback: function($$v) {
                                              _vm.modal = $$v
                                            },
                                            expression: "modal"
                                          }
                                        },
                                        [
                                          _vm._v(" "),
                                          _c(
                                            "v-date-picker",
                                            {
                                              ref: "picker",
                                              attrs: {
                                                min: "1950-01-01",
                                                locale: "id",
                                                scrollable: ""
                                              },
                                              model: {
                                                value:
                                                  _vm.editedItem.tanggal_lahir,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.editedItem,
                                                    "tanggal_lahir",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "editedItem.tanggal_lahir"
                                              }
                                            },
                                            [
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    flat: "",
                                                    color: "primary"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      _vm.modal = false
                                                    }
                                                  }
                                                },
                                                [_vm._v("Batal")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    flat: "",
                                                    color: "primary"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.$refs.dialog.save(
                                                        _vm.editedItem
                                                          .tanggal_lahir
                                                      )
                                                    }
                                                  }
                                                },
                                                [_vm._v("Oke")]
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md8": "",
                                        "order-xs11": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "No Telpon",
                                          maxlength: "12",
                                          counter: "",
                                          "prepend-icon": "phone",
                                          clearable: "",
                                          rules: [
                                            _vm.rules.required,
                                            _vm.rules.numberOnly
                                          ]
                                        },
                                        model: {
                                          value: _vm.editedItem.no_hp,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "no_hp",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.no_hp"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md9": "",
                                        "order-xs7": ""
                                      }
                                    },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          label: "Jenis Kelamin",
                                          items: ["L", "P"],
                                          "prepend-icon": "wc",
                                          rules: [_vm.rules.required]
                                        },
                                        model: {
                                          value: _vm.editedItem.jenis_kelamin,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "jenis_kelamin",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.jenis_kelamin"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md10": "",
                                        "order-xs10": ""
                                      }
                                    },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "ID Telgram (optional)",
                                          maxlength: "30",
                                          counter: "",
                                          "prepend-icon": "mdi-telegram",
                                          clearable: ""
                                        },
                                        model: {
                                          value: _vm.editedItem.id_telegram,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "id_telegram",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.id_telegram"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md5: "",
                                        "order-md11": "",
                                        "order-xs8": ""
                                      }
                                    },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          label: "Status",
                                          items: _vm.stat,
                                          "prepend-icon": "favorite",
                                          rules: [_vm.rules.required]
                                        },
                                        model: {
                                          value: _vm.editedItem.status,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "status",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.status"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: {
                                        xs12: "",
                                        sm12: "",
                                        md12: "",
                                        "order-md12": "",
                                        "order-xs12": ""
                                      }
                                    },
                                    [
                                      _c("v-textarea", {
                                        attrs: {
                                          label: "Alamat",
                                          maxlength: "70",
                                          counter: "",
                                          clearable: "",
                                          "prepend-icon": "home",
                                          rows: "1",
                                          "auto-grow": "",
                                          rules: [_vm.rules.required]
                                        },
                                        model: {
                                          value: _vm.editedItem.alamat,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editedItem,
                                              "alamat",
                                              $$v
                                            )
                                          },
                                          expression: "editedItem.alamat"
                                        }
                                      })
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
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    { staticClass: "indigo darken-2" },
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "green darken-2",
                          attrs: {
                            dark: "",
                            flat: "",
                            loading: _vm.loadingBtn,
                            disabled: _vm.loadingBtn
                          },
                          on: { click: _vm.save },
                          scopedSlots: _vm._u([
                            {
                              key: "loader",
                              fn: function() {
                                return [
                                  _c(
                                    "span",
                                    { staticClass: "custom-loader" },
                                    [
                                      _c("v-icon", { attrs: { light: "" } }, [
                                        _vm._v("cached")
                                      ])
                                    ],
                                    1
                                  )
                                ]
                              },
                              proxy: true
                            }
                          ])
                        },
                        [
                          _c("v-icon", { staticClass: "mr-2" }, [
                            _vm._v("save")
                          ]),
                          _vm._v("\n                SIMPAN\n                ")
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
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c("v-data-table", {
        attrs: {
          headers: _vm.headers,
          items: _vm.anggotas,
          "item-key": "no_rm",
          search: _vm.search,
          "disable-initial-sort": "",
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
                    class: props.expanded ? "grey lighten-3" : "",
                    on: {
                      click: function($event) {
                        props.expanded = !props.expanded
                      }
                    }
                  },
                  [
                    _c(
                      "td",
                      { staticClass: "text-xs-center px-2 caption" },
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
                            _c("div", { staticClass: "px-0" }, [
                              _c("span", { staticClass: "px-2" }, [
                                _vm._v(_vm._s(props.index + 1))
                              ])
                            ])
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left",
                        class: { "font-weight-bold": props.expanded }
                      },
                      [
                        _vm._v(
                          " \n          " +
                            _vm._s(props.item.no_rm) +
                            "\n        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-xs-left text-no-wrap" }, [
                      _vm._v(_vm._s(_vm._f("ucWords")(props.item.nama_pasien)))
                    ]),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-xs-left text-no-wrap" }, [
                      _vm._v(_vm._s(props.item.jenis_pasien))
                    ]),
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
                            staticClass: "mr-1",
                            attrs: {
                              disabled: _vm.loadingBtn,
                              icon: "",
                              small: "",
                              color: "primary"
                            },
                            on: {
                              click: function($event) {
                                return _vm.editItem(props.item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v("\n              edit\n            ")
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              disabled: _vm.loadingBtn,
                              icon: "",
                              small: "",
                              color: "error"
                            },
                            on: {
                              click: function($event) {
                                return _vm.deleteItem(props.item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v("\n              delete\n            ")
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
                      { attrs: { xs12: "", sm12: "", md8: "", lg8: "" } },
                      [
                        _c(
                          "v-card",
                          {
                            attrs: {
                              width: _vm.$vuetify.breakpoint.xs ? "65%" : "100%"
                            }
                          },
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
                                            _vm._v(" Data Lengkap: "),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "green--text text--darken-3"
                                              },
                                              [
                                                _vm._v(
                                                  "[ " +
                                                    _vm._s(props.item.no_rm) +
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
                                                  _vm._s(props.item.nama_pasien)
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
                                    _c(
                                      "v-list",
                                      { attrs: { dense: "" } },
                                      [
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("KK/No. Keluarga")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    props.item.keluarga
                                                      .nama_kepala
                                                  ) +
                                                    " / " +
                                                    _vm._s(
                                                      props.item.keluarga
                                                        .no_keluarga
                                                    )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("TTL")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    props.item.tempat_lahir
                                                  ) +
                                                    ", " +
                                                    _vm._s(
                                                      _vm._f("tgLahir")(
                                                        props.item.tanggal_lahir
                                                      )
                                                    )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("Umur")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm._f("umur")(
                                                      props.item.tanggal_lahir
                                                    )
                                                  )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("Jenis Kelamin")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm._f("gender")(
                                                      props.item.jenis_kelamin
                                                    )
                                                  )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("Telepon")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [_vm._v(_vm._s(props.item.no_hp))]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("ID Telegram")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    props.item.id_telegram
                                                      ? props.item.id_telegram
                                                      : "Belum Diisi"
                                                  )
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile",
                                          [
                                            _c(
                                              "v-list-tile-content",
                                              {
                                                staticClass: "font-weight-bold"
                                              },
                                              [_vm._v("Pekerjaan")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-tile-content",
                                              { staticClass: "align-end pr-1" },
                                              [
                                                _vm._v(
                                                  _vm._s(props.item.pekerjaan)
                                                )
                                              ]
                                            )
                                          ],
                                          1
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
                                      "v-card-text",
                                      { staticClass: "font-weight-bold py-2" },
                                      [_vm._v("Alamat")]
                                    ),
                                    _vm._v(" "),
                                    _c("v-card-text", { staticClass: "pt-0" }, [
                                      _vm._v(_vm._s(props.item.alamat))
                                    ])
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
                                    _c(
                                      "v-card-actions",
                                      { staticClass: "py-3 px-3" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: { color: "warning" },
                                            on: {
                                              click: function($event) {
                                                return _vm.printKartu(
                                                  props.item
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              {
                                                class: {
                                                  "mr-2": !_vm.$vuetify
                                                    .breakpoint.xs
                                                }
                                              },
                                              [_vm._v("print")]
                                            ),
                                            _vm._v(" "),
                                            !_vm.$vuetify.breakpoint.xs
                                              ? _c("span", [
                                                  _vm._v("Cetak Kartu")
                                                ])
                                              : _vm._e()
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("v-spacer"),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: {
                                              color: "secondary",
                                              to:
                                                "/rekam-medik/" +
                                                props.item.no_rm
                                            }
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              {
                                                class: {
                                                  "mr-2": !_vm.$vuetify
                                                    .breakpoint.xs
                                                }
                                              },
                                              [_vm._v("assignment")]
                                            ),
                                            _vm._v(" "),
                                            !_vm.$vuetify.breakpoint.xs
                                              ? _c("span", [
                                                  _vm._v("Rekam Medik")
                                                ])
                                              : _vm._e()
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
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "div",
        [
          _c(
            "v-dialog",
            {
              attrs: { fullscreen: "" },
              model: {
                value: _vm.modalPrint,
                callback: function($$v) {
                  _vm.modalPrint = $$v
                },
                expression: "modalPrint"
              }
            },
            [
              _c(
                "v-card",
                { attrs: { height: "100%" } },
                [
                  _c(
                    "v-card-actions",
                    { staticClass: "indigo darken-2" },
                    [
                      _c(
                        "v-layout",
                        {
                          staticClass: "headline white--text ml-2",
                          attrs: { wrap: "", column: "" }
                        },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "" } },
                            [
                              _c(
                                "v-layout",
                                { attrs: { wrap: "", row: "" } },
                                [
                                  _c(
                                    "v-icon",
                                    {
                                      staticClass: "mr-2",
                                      attrs: { dark: "", medium: "" }
                                    },
                                    [_vm._v("print")]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "orange darken-2",
                          attrs: { icon: "", dark: "", flat: "" },
                          on: { click: _vm.closePrint }
                        },
                        [_c("v-icon", [_vm._v("close")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.readyPDF
                    ? _c("embed", {
                        attrs: {
                          src: _vm.sumberPDF,
                          width: "100%",
                          height: "91%",
                          type: "application/pdf"
                        }
                      })
                    : _c(
                        "v-card-text",
                        { attrs: { height: "100%" } },
                        [
                          _vm.errorPDF
                            ? _c(
                                "span",
                                { staticClass: "font-weight-bold red--text" },
                                [_vm._v("Gagal Menampilkan Halaman Print :(")]
                              )
                            : _c("v-progress-circular", {
                                attrs: { indeterminate: "", color: "primary" }
                              })
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/loket/daftar/Perpasien.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perpasien.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Perpasien.vue?vue&type=template&id=b7e9b906& */ "./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906&");
/* harmony import */ var _Perpasien_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Perpasien.vue?vue&type=script&lang=js& */ "./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Perpasien_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/loket/daftar/Perpasien.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Perpasien_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Perpasien.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Perpasien_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Perpasien.vue?vue&type=template&id=b7e9b906& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perpasien.vue?vue&type=template&id=b7e9b906&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perpasien_vue_vue_type_template_id_b7e9b906___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);