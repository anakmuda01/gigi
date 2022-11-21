(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Errors.js */ "./resources/js/Errors.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.min.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf-autotable */ "./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_img_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../core/img.js */ "./resources/js/components/core/img.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns/locale/id */ "./node_modules/date-fns/locale/id/index.js");
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6__);
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
      today: now,
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      dialog: false,
      modal: false,
      loadingTB: false,
      loadingBtn: false,
      search: null,
      selected: null,
      headers: [{
        text: '#',
        align: 'center',
        sortable: false,
        value: 'anggota.no_rm',
        width: '1%'
      }, {
        text: 'Nama Pasien',
        value: 'anggota.nama_pasien',
        sortable: false
      }, {
        text: 'Kunjungan',
        value: 'tgl_indo',
        sortable: true
      }, {
        text: 'Status',
        value: 'status',
        sortable: true
      }, {
        text: 'Pembayaran',
        value: 'status_bayar',
        sortable: true
      }, {
        text: 'Aksi',
        align: 'center',
        sortable: false,
        width: '1%'
      }],
      errors: null,
      editedIndex: -1,
      editedItem: {
        anggota: null,
        keluhan: null,
        tgl_kunjungan: null,
        tgl_indo: null,
        status: null
      },
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        },
        min: function min(v) {
          return v && v.length >= 3 || 'Min 3 karakter';
        }
      },
      live: null
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(['keluargas', 'anggotas', 'kunjungans']), {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Tambah Kunjungan' : 'Edit Data Kunjungan';
    },
    tglTerformat: function tglTerformat() {
      return this.editedItem.tgl_kunjungan ? date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(this.editedItem.tgl_kunjungan, 'DD MMMM YYYY', {
        locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
      }) : '';
    }
  }),
  watch: {
    dialog: function dialog(val) {
      val || this.close();
    }
  },
  mounted: function mounted() {
    this.$store.dispatch('fetchAnggota');
    this.$store.dispatch('fetchKunjungan');
  },
  methods: {
    initialize: function initialize() {
      this.$store.dispatch('fetchAnggota');
      this.$store.dispatch('fetchKunjungan');
    },
    customFilter: function customFilter(item, queryText, itemText) {
      var textOne = item.no_rm.toLowerCase();
      var textTwo = item.nama_pasien.toLowerCase();
      var searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    },
    editItem: function editItem(item) {
      this.editedIndex = this.kunjungans.indexOf(item);
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
      var _this = this;

      this.loading();
      swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <span class="red--text font-weight-bold">[' + item.anggota.no_rm + '] ' + item.anggota.nama_pasien + ' </span> <br> Kunjungan : <span class="indigo--text font-weight-bold">' + date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(item.tgl_kunjungan, 'DD MMMM YYYY', {
          locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
        }) + ' </span> <br>Data yang sudah dihapus tidak bisa dikembalikan lagi !',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
      }).then(function (response) {
        if (response.value) {
          _this.$Progress.start();

          axios["delete"]('api/kunjungan/' + item.id).then(function () {
            swal.fire('Deleted!', 'Data dari <span class="green--text font-weight-bold">[' + item.anggota.no_rm + '] ' + item.anggota.nama_pasien + '</span> <br> Kunjungan : <span class="indigo--text font-weight-bold">' + date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(item.tgl_kunjungan, 'DD MMMM YYYY', {
              locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
            }) + '</span> <br> telah terhapus!!.', 'success');
            setTimeout(function () {
              _this.initialize();

              _this.ready();

              _this.$Progress.finish();
            }, 1500);
          })["catch"](function () {
            swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");

            _this.ready();

            _this.$Progress.finish();
          });
        } else {
          _this.ready();

          _this.$Progress.finish();
        }
      });
    },
    close: function close() {
      this.editedIndex = -1;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.errors = new _Errors_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.editedItem = {
        anggota: null,
        keluhan: null,
        tgl_kunjungan: null,
        tgl_indo: null,
        status: null
      };
      this.ready();
      this.dialog = false;
    },
    save: function save() {
      var _this2 = this;

      this.loading();
      this.editedItem.tgl_indo = date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(this.editedItem.tgl_kunjungan, 'DD MMMM YYYY', {
        locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
      });

      if (this.editedIndex > -1) {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.put('api/kunjungan/' + this.editedItem.id, this.editedItem).then(function (response) {
            _this2.initialize();

            setTimeout(function () {
              _this2.$Progress.finish();

              toast.fire({
                type: 'success',
                title: 'Data Kunjungan berhasil diupdate~'
              });

              _this2.close();
            }, 1500);
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });
            setTimeout(function () {
              _this2.$Progress.finish();

              _this2.close();
            }, 5000);
          });
        } else {
          setTimeout(function () {
            _this2.$Progress.finish();

            _this2.ready();
          }, 2000);
        }
      } else {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.post('api/kunjungan', this.editedItem).then(function (response) {
            if (response.data.msg !== 'exist') {
              _this2.initialize();

              setTimeout(function () {
                _this2.$Progress.finish();

                toast.fire({
                  type: 'success',
                  title: 'Kunjungan berhasil ditambahkan~'
                });

                _this2.close();
              }, 1500);
            } else {
              setTimeout(function () {
                toast.fire({
                  type: 'warning',
                  title: 'Tanggal Kunjungan  <span class="red--text font-weight-bold ml-1 mr-1">[' + response.data.no_rm + '] ' + response.data.nama_pasien + '</span> telah ada sebelumnya.'
                });

                _this2.ready();

                _this2.$Progress.finish();
              }, 2000);
            }
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });

            _this2.errors.record(error.response.data);

            setTimeout(function () {
              _this2.ready();

              _this2.$Progress.finish();
            }, 2000);
          });
        } else {
          setTimeout(function () {
            _this2.$Progress.finish();

            _this2.ready();
          }, 2000);
        }
      }
    },
    closePrint: function closePrint() {
      this.modalPrint = false;
      this.sumberPDF = null;
    },
    print: function print() {
      var _this3 = this;

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

      var doc = new jspdf__WEBPACK_IMPORTED_MODULE_2___default.a("p", "mm", "a4");
      var totalPagesExp = "{total_pages_count_string}";
      var item = this.kunjungans;
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.myText("PRAKTIK DOKTER GIGI MANDIRI", {
        align: "center"
      }, 0, 12);
      doc.setFontSize(18);
      doc.addImage(_core_img_js__WEBPACK_IMPORTED_MODULE_4__["default"], 'JPEG', 10, 5, 20, 25);
      doc.myText("APOTEK SALMA BANJARBARU", {
        align: "center"
      }, 0, 18);
      doc.setFontSize(11);
      doc.setFontStyle('normal');
      doc.myText("drg. Agus Dwi Karyanto, MPH", {
        align: "center"
      }, 0, 23);
      doc.setFontSize(9);
      doc.setFontStyle('italic');
      doc.myText("Jl. Hercules No.1 Landasan Ulin Telp. 0852 4539 6161", {
        align: "center"
      }, 0, 27);
      doc.line(10, 28, doc.internal.pageSize.width - 10, 28);
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.myText("RIWAYAT KUNJUNGAN PASIEN", {
        align: "center"
      }, 0, 34);
      doc.setFontSize(13);
      var body = [];

      for (var i = 0; i < item.length; i++) {
        body.push({
          index: i + 1,
          tgl: item[i].tgl_indo,
          pasien: '[ ' + item[i].anggota.no_rm + ' ] ' + item[i].anggota.nama_pasien
        });
      }

      doc.autoTable({
        startY: 45,
        body: body,
        columns: [{
          header: 'No.',
          dataKey: 'index'
        }, {
          header: 'Tanggal',
          dataKey: 'tgl'
        }, {
          header: 'Pasien',
          dataKey: 'pasien'
        }],
        didDrawPage: function didDrawPage(data) {
          var str = "Page " + doc.internal.getNumberOfPages(); // Total page number plugin only available in jspdf v1.0+

          if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
          }

          doc.setFontSize(10); // jsPDF 1.4+ uses getWidth, <1.4 uses .width

          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: {
          top: 5,
          left: 10,
          right: 10
        }
      }); // doc.setFontSize(10);
      // doc.setFontStyle('normal');
      // doc.text(140,doc.autoTable.previous.finalY+30, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
      // doc.text(140,doc.autoTable.previous.finalY+35, 'TTD')
      // doc.text(140,doc.autoTable.previous.finalY+50, 'drg. Agus Dwi Karyanto, MPH')

      doc.setFontSize(10);
      doc.setFontStyle('normal');

      if (doc.autoTable.previous.finalY + 50 > doc.internal.pageSize.height - 10) {
        doc.addPage();
        doc.text(140, 15, 'Banjarbaru, ' + date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(now, 'DD MMMM YYYY', {
          locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
        }));
        doc.text(140, 40, 'drg. Agus Dwi Karyanto, MPH');
      } else {
        doc.text(140, doc.autoTable.previous.finalY + 30, 'Banjarbaru, ' + date_fns_format__WEBPACK_IMPORTED_MODULE_5___default()(now, 'DD MMMM YYYY', {
          locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_6___default.a
        }));
        doc.text(140, doc.autoTable.previous.finalY + 35, 'TTD');
        doc.text(140, doc.autoTable.previous.finalY + 50, 'drg. Agus Dwi Karyanto, MPH');
      }

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

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
        _this3.sumberPDF = string;
        _this3.loadingBtn = false;
        _this3.readyPDF = true;
      })["catch"](function () {
        setTimeout(function () {
          _this3.errorPDF = true;
          _this3.loadingBtn = false;
        }, 1000);
      });
    }
  },
  created: function created() {
    var _this4 = this;

    this.live = setInterval(function () {
      if (_this4.kunjungans.length > 4) {
        _this4.initialize();
      }
    }, 5000);
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.live);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "daftar-antrian" } },
    [
      _c(
        "v-toolbar",
        { staticClass: "mb-2", attrs: { flat: "", color: "white" } },
        [
          _c("v-text-field", {
            attrs: {
              "append-icon": "search",
              label: "Cari Kunjungan....",
              "single-line": "",
              "hide-details": ""
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
                persistent: "",
                "max-width": "600px"
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
                              "\n                  assignment_ind\n              "
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            fab: "",
                            small: "",
                            loading: _vm.loadingBtn,
                            color: "yellow"
                          },
                          on: { click: _vm.print }
                        },
                        [
                          _c("v-icon", [
                            _vm._v("\n                print\n              ")
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
                { attrs: { height: "100%" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { column: "", "fill-height": "" } },
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
                                [_vm._v("assignment_ind")]
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
                                          _vm.formTitle === "Tambah Kunjungan"
                                            ? _c("v-autocomplete", {
                                                attrs: {
                                                  hint:
                                                    "Jika pasien tidak ditemukan, silahkan daftarkan pasien tersebut terlebih dahulu.",
                                                  items: _vm.anggotas,
                                                  label: "Pilih Pasien",
                                                  "persistent-hint": "",
                                                  "prepend-icon":
                                                    "account_circle",
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
                                                                    .breakpoint
                                                                    .xs
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  data.item
                                                                    .no_rm
                                                                ) +
                                                                  " - " +
                                                                  _vm._s(
                                                                    data.item
                                                                      .nama_pasien
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
                                                            "\n                            " +
                                                              _vm._s(
                                                                data.item.no_rm
                                                              ) +
                                                              " - " +
                                                              _vm._s(
                                                                data.item
                                                                  .nama_pasien
                                                              ) +
                                                              "\n                        "
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  false,
                                                  16180019
                                                ),
                                                model: {
                                                  value: _vm.editedItem.anggota,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editedItem,
                                                      "anggota",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editedItem.anggota"
                                                }
                                              })
                                            : _c("v-text-field", {
                                                attrs: {
                                                  label: "Pasien Terpilih",
                                                  "prepend-icon": "person_pin",
                                                  disabled: "",
                                                  hint:
                                                    "Edit hanya untuk data keluhan...",
                                                  value:
                                                    _vm.editedItem.anggota
                                                      .no_rm +
                                                    " - " +
                                                    _vm.editedItem.anggota
                                                      .nama_pasien
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
                                            lg12: ""
                                          }
                                        },
                                        [
                                          _c("v-textarea", {
                                            attrs: {
                                              label:
                                                "Keluhan / Permintaan Pasien",
                                              maxlength: "80",
                                              counter: "",
                                              clearable: "",
                                              "prepend-icon":
                                                "record_voice_over",
                                              rows: "1",
                                              "auto-grow": "",
                                              rules: [_vm.rules.required]
                                            },
                                            model: {
                                              value: _vm.editedItem.keluhan,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedItem,
                                                  "keluhan",
                                                  $$v
                                                )
                                              },
                                              expression: "editedItem.keluhan"
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
                                            lg12: ""
                                          }
                                        },
                                        [
                                          _c(
                                            "v-dialog",
                                            {
                                              ref: "dialog",
                                              attrs: {
                                                "return-value":
                                                  _vm.editedItem.tgl_kunjungan,
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
                                                    "tgl_kunjungan",
                                                    $event
                                                  )
                                                },
                                                "update:return-value": function(
                                                  $event
                                                ) {
                                                  return _vm.$set(
                                                    _vm.editedItem,
                                                    "tgl_kunjungan",
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
                                                                "Tanggal Kunjungan",
                                                              "prepend-icon":
                                                                "event",
                                                              readonly: "",
                                                              disabled:
                                                                _vm.editedIndex >
                                                                -1,
                                                              rules: [
                                                                _vm.rules
                                                                  .required
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
                                                  attrs: {
                                                    locale: "id",
                                                    min: _vm.today,
                                                    scrollable: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editedItem
                                                        .tgl_kunjungan,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "tgl_kunjungan",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.tgl_kunjungan"
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
                                                        click: function(
                                                          $event
                                                        ) {
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
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.$refs.dialog.save(
                                                            _vm.editedItem
                                                              .tgl_kunjungan
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
                      _c("v-spacer"),
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
                                          _c(
                                            "v-icon",
                                            { attrs: { light: "" } },
                                            [_vm._v("cached")]
                                          )
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
                              _vm._v(
                                "\n                    SIMPAN\n                    "
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
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c("v-data-table", {
        attrs: {
          headers: _vm.headers,
          items: _vm.kunjungans,
          "item-key": "id",
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
                        staticClass: "text-xs-left text-no-wrap",
                        class: { caption: _vm.$vuetify.breakpoint.xs }
                      },
                      [
                        _vm._v(
                          "\n              " +
                            _vm._s(props.item.anggota.nama_pasien) +
                            "\n            "
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
                          "\n              " +
                            _vm._s(props.item.tgl_indo) +
                            "\n            "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left",
                        class: {
                          caption: _vm.$vuetify.breakpoint.xs,
                          "red--text": props.item.status === "Pending",
                          "green--text": props.item.status === "Selesai"
                        }
                      },
                      [
                        _vm._v(
                          "\n              " +
                            _vm._s(props.item.status) +
                            "\n            "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left",
                        class: {
                          caption: _vm.$vuetify.breakpoint.xs,
                          "red--text": props.item.status_bayar === "Belum",
                          "green--text": props.item.status_bayar === "Lunas"
                        }
                      },
                      [
                        _vm._v(
                          "\n              " +
                            _vm._s(props.item.status_bayar) +
                            "\n            "
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
                              _vm._v(
                                "\n                  edit\n                "
                              )
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
                              _vm._v(
                                "\n                  delete\n                "
                              )
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
                                      "v-layout",
                                      { attrs: { row: "", wrap: "" } },
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
                                                          props.item.anggota
                                                            .no_rm
                                                        ) +
                                                        " ]"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-light"
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
                                        ),
                                        _vm._v(" "),
                                        _c("v-spacer"),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: {
                                              disabled: _vm.loadingBtn,
                                              color: "secondary",
                                              icon: "",
                                              small: "",
                                              to:
                                                "/rekam-medik/" +
                                                props.item.anggota.no_rm
                                            }
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { small: "" } },
                                              [_vm._v("assignment")]
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
                          "*Klik cell untuk melihat detail keluhan/permintaan dari pasein."
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

/***/ "./resources/js/components/loket/antrian/DaftarKunjungan.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/loket/antrian/DaftarKunjungan.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DaftarKunjungan.vue?vue&type=template&id=c385eebc& */ "./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc&");
/* harmony import */ var _DaftarKunjungan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DaftarKunjungan.vue?vue&type=script&lang=js& */ "./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DaftarKunjungan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/loket/antrian/DaftarKunjungan.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DaftarKunjungan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DaftarKunjungan.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DaftarKunjungan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DaftarKunjungan.vue?vue&type=template&id=c385eebc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/antrian/DaftarKunjungan.vue?vue&type=template&id=c385eebc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DaftarKunjungan_vue_vue_type_template_id_c385eebc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);