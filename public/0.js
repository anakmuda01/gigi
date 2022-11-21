(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Errors.js */ "./resources/js/Errors.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.min.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jspdf-autotable */ "./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _core_img_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../core/img.js */ "./resources/js/components/core/img.js");
/* harmony import */ var _Person_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../Person.js */ "./resources/js/Person.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns/locale/id */ "./node_modules/date-fns/locale/id/index.js");
/* harmony import */ var date_fns_locale_id__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_id__WEBPACK_IMPORTED_MODULE_8__);
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
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [{
        text: '#',
        align: 'left',
        sortable: false,
        width: '1%'
      }, {
        text: 'No. KG',
        align: 'left',
        sortable: true,
        value: 'no_keluarga',
        width: '1%'
      }, {
        text: 'Nama Kepala',
        align: 'left',
        sortable: true,
        value: 'nama_kepala'
      }, {
        text: 'Aksi',
        value: 'name',
        sortable: false,
        align: 'center',
        width: '1%'
      }],
      subheaders: [{
        text: 'No. RM',
        align: 'left',
        sortable: true,
        value: 'no_rm',
        width: '1%'
      }, {
        text: 'Nama Anggota',
        align: 'left',
        sortable: true,
        value: 'nama_pasien'
      }, {
        text: 'Status',
        align: 'left',
        sortable: false,
        value: 'status'
      }],
      errors: new _Errors_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      editedIndex: -1,
      editedItem: {
        no_keluarga: null,
        nama_kepala: ''
      },
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        },
        min: function min(v) {
          return v && v.length >= 3 || 'Min 3 karakter';
        }
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(['keluargas', 'anggotas', 'setItem']), {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'New Keluarga' : 'Edit Keluarga';
    }
  }),
  mounted: function mounted() {
    var _this = this;

    this.$store.dispatch('fetchSet');

    var hadang = function hadang(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    };

    hadang(1000).then(function () {
      _this.initialize();
    }).then(function () {
      setTimeout(function () {
        _this.loadingTB = false;
      }, 500);
    })["catch"](function () {
      toast.fire({
        type: 'warning',
        title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
      });

      _this.$router.push('bantuan');
    });
  },
  methods: {
    random: function random() {
      var bar = this.today.split('-');
      var foo = bar[0].slice(2, 4) + bar[1] + bar[2];
      var dom = foo + Math.floor(Math.random() * (999 - 100 + 1) + 100);
      var c = this.keluargas.find(function (f) {
        return f.no_keluarga === dom;
      });

      if (!c) {
        return this.editedItem.no_keluarga = dom;
      }
    },
    initialize: function initialize() {
      this.$store.dispatch('fetchKeluarga');
      this.$store.dispatch('fetchAnggota');
    },
    editItem: function editItem(item) {
      this.editedIndex = this.keluargas.indexOf(item);
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
        html: 'Hapus data dari <span class="red--text font-weight-bold">[' + item.no_keluarga + '] ' + item.nama_kepala + '</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
      }).then(function (response) {
        if (response.value) {
          _this2.$Progress.start();

          axios["delete"]('api/keluarga/' + item.id).then(function (respon) {
            if (respon.data.msg === 'exist') {
              swal.fire("Gagal!", "Untuk menghapus data Keluarga silahkan Hapus Semua Anggota terlebih dahulu!", "error");
              setTimeout(function () {
                _this2.initialize();

                _this2.ready();

                _this2.$Progress.finish();
              }, 2000);
            } else {
              setTimeout(function () {
                _this2.initialize();

                swal.fire('Deleted!', 'Data dari <span class="green--text font-weight-bold">[' + item.no_keluarga + '] ' + item.nama_kepala + '</span>  telah terhapus!!.', 'success');

                _this2.ready();

                _this2.$Progress.finish();
              }, 2000);
            }
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
      this.editedIndex = -1;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.errors = new _Errors_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.editedItem = {
        no_keluarga: null,
        nama_kepala: ''
      };
      this.ready();
      this.dialog = false;
    },
    save: function save() {
      var _this3 = this;

      this.loading();

      if (this.editedIndex > -1) {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.put('api/keluarga/' + this.editedItem.id, this.editedItem).then(function (response) {
            toast.fire({
              type: 'success',
              title: 'Data Keluarga berhasil diupdate~'
            });
            setTimeout(function () {
              _this3.initialize();

              _this3.close();

              _this3.$Progress.finish();
            }, 1000);
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });
            setTimeout(function () {
              _this3.$Progress.finish();

              _this3.close();
            }, 3000);
          });
        } else {
          setTimeout(function () {
            _this3.$Progress.finish();

            _this3.ready();
          }, 1000);
        }
      } else {
        this.$Progress.start();

        if (this.$refs.form.validate()) {
          axios.post('api/keluarga', this.editedItem).then(function (response) {
            toast.fire({
              type: 'success',
              title: 'Keluarga berhasil ditambahkan~'
            });
            setTimeout(function () {
              _this3.initialize();

              _this3.close();

              _this3.$Progress.finish();
            }, 1000);
          })["catch"](function (error) {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            });

            _this3.errors.record(error.response.data);

            setTimeout(function () {
              _this3.close();

              _this3.$Progress.finish();
            }, 3000);
          });
        } else {
          setTimeout(function () {
            _this3.$Progress.finish();

            _this3.ready();
          }, 1000);
        }
      }
    },
    print: function print(item) {
      var _this4 = this;

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
      })(jspdf__WEBPACK_IMPORTED_MODULE_3___default.a.API);

      var doc = new jspdf__WEBPACK_IMPORTED_MODULE_3___default.a('l');
      var totalPagesExp = "{total_pages_count_string}";
      var son = new _Person_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.myText(this.setItem.InkjetA, {
        align: "center"
      }, 0, 12);
      doc.setFontSize(18);
      doc.addImage(_core_img_js__WEBPACK_IMPORTED_MODULE_5__["default"], 'JPEG', 10, 5, 20, 25);
      doc.myText(this.setItem.InkjetB, {
        align: "center"
      }, 0, 18);
      doc.setFontSize(11);
      doc.setFontStyle('normal');
      doc.myText(this.setItem.InkjetC, {
        align: "center"
      }, 0, 23);
      doc.setFontSize(9);
      doc.setFontStyle('italic');
      doc.myText(this.setItem.InkjetD, {
        align: "center"
      }, 0, 27);
      doc.line(10, 28, doc.internal.pageSize.width - 10, 28);
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      doc.myText("Data Keluarga " + item.no_keluarga, {
        align: "center"
      }, 0, 36);
      doc.myText(item.nama_kepala, {
        align: "center"
      }, 0, 41);
      var body = [];

      for (var i = 0; i < item.anggotas.length; i++) {
        body.push({
          index: i + 1,
          nama_anggota: item.anggotas[i].nama_pasien,
          ttl: item.anggotas[i].tempat_lahir + ', ' + son.tglIndo(item.anggotas[i].tanggal_lahir),
          status: item.anggotas[i].status,
          pekerjaan: item.anggotas[i].pekerjaan,
          alamat: item.anggotas[i].alamat
        });
      }

      var body2 = [];

      for (var _i = 0; _i < item.anggotas.length; _i++) {
        body2.push({
          index: _i + 1,
          no_rm: item.anggotas[_i].no_rm,
          nama_anggota: item.anggotas[_i].nama_pasien,
          jk: son.kelamin(item.anggotas[_i].jenis_kelamin),
          umur: son.umur(item.anggotas[_i].tanggal_lahir),
          no_hp: item.anggotas[_i].no_hp,
          telegram: item.anggotas[_i].id_telegram ? item.anggotas[_i].id_telegram : 'Belum diisi'
        });
      }

      doc.setFontSize(11);
      doc.setFontStyle('normal');
      doc.autoTable({
        startY: 48,
        body: body,
        columns: [{
          header: 'No.',
          dataKey: 'index'
        }, {
          header: 'Nama Anggota Keluarga',
          dataKey: 'nama_anggota'
        }, {
          header: 'Tempat, Tanggal Lahir',
          dataKey: 'ttl'
        }, {
          header: 'Status',
          dataKey: 'status'
        }, {
          header: 'Pekerjaan',
          dataKey: 'pekerjaan'
        }, {
          header: 'Alamat',
          dataKey: 'alamat'
        }],
        theme: 'grid',
        styles: {
          cellWidth: 'wrap',
          rowPageBreak: 'auto',
          halign: 'left',
          valign: 'middle'
        },
        headStyles: {
          halign: 'center',
          fillColor: [48, 63, 159]
        },
        columnStyles: {
          index: {
            CellWidth: 3,
            cellWidth: 'auto',
            halign: 'center'
          },
          nama_anggota: {
            CellWidth: 'auto',
            valign: 'top'
          },
          ttl: {
            CellWidth: 'auto',
            valign: 'top'
          },
          status: {
            cellWidth: 'auto',
            halign: 'center'
          },
          pekerjaan: {
            CellWidth: 'auto',
            valign: 'top'
          },
          Alamat: {
            valign: 'top'
          }
        },
        margin: {
          top: 5,
          left: 10,
          right: 10
        }
      });
      doc.setFontSize(14);
      doc.setFontStyle('bold');
      doc.myText("Detail Anggota/Pasien", {
        align: "center"
      }, 0, doc.autoTable.previous.finalY + 15);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 22,
        body: body2,
        columns: [{
          header: 'No.',
          dataKey: 'index'
        }, {
          header: 'No. RM',
          dataKey: 'no_rm'
        }, {
          header: 'Nama Anggota/Pasien',
          dataKey: 'nama_anggota'
        }, {
          header: 'J.K',
          dataKey: 'jk'
        }, {
          header: 'Umur',
          dataKey: 'umur'
        }, {
          header: 'No HP',
          dataKey: 'no_hp'
        }, {
          header: 'ID Telegram',
          dataKey: 'telegram'
        }],
        theme: 'grid',
        styles: {
          cellWidth: 'wrap',
          rowPageBreak: 'auto',
          halign: 'left',
          valign: 'middle'
        },
        headStyles: {
          halign: 'center',
          fillColor: [48, 63, 159]
        },
        columnStyles: {
          index: {
            CellWidth: 3,
            cellWidth: 'auto',
            halign: 'center'
          },
          no_rm: {
            CellWidth: 10,
            valign: 'top',
            halign: 'center'
          },
          nama_anggota: {
            CellWidth: 'auto',
            valign: 'top'
          },
          umur: {
            cellWidth: 'auto',
            halign: 'center'
          },
          jk: {
            cellWidth: 'auto',
            halign: 'center'
          },
          no_hp: {
            cellWidth: 'auto',
            halign: 'center'
          },
          telegram: {
            cellWidth: 'auto',
            halign: 'center'
          }
        },
        didDrawPage: function didDrawPage(data) {
          // Header
          // doc.setFontSize(20);
          // doc.setTextColor(40);
          // doc.setFontStyle('normal');
          // doc.text("Report", data.settings.margin.left + 15, 22);
          // Footer
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
      });
      doc.setFontSize(10);
      doc.setFontStyle('normal');
      doc.text(210, doc.autoTable.previous.finalY + 18, this.setItem.kota + ', ' + date_fns_format__WEBPACK_IMPORTED_MODULE_7___default()(now, 'DD MMMM YYYY', {
        locale: date_fns_locale_id__WEBPACK_IMPORTED_MODULE_8___default.a
      }));
      doc.text(210, doc.autoTable.previous.finalY + 23, this.setItem.jabatan);
      doc.text(210, doc.autoTable.previous.finalY + 38, this.setItem.atas_nama);
      doc.text(210, doc.autoTable.previous.finalY + 43, 'SIP. NO. ' + this.setItem.no_sip);

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
        _this4.sumberPDF = string;
        _this4.loadingBtn = false;
        _this4.readyPDF = true;
      })["catch"](function () {
        setTimeout(function () {
          _this4.errorPDF = true;
          _this4.loadingBtn = false;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
              label: "Cari Keluarga...",
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
                "max-width": "500px",
                fullscreen: _vm.$vuetify.breakpoint.xs,
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
                              "\n                  group_add\n              "
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
                                [_vm._v("group")]
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
                        { ref: "form", attrs: { "lazy-validation": "" } },
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
                                    { attrs: { wrap: "" } },
                                    [
                                      _c(
                                        "v-flex",
                                        {
                                          attrs: {
                                            xs12: "",
                                            sm12: "",
                                            md12: ""
                                          }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              readonly: "",
                                              disabled: _vm.editedIndex > -1,
                                              label: "No Keluarga",
                                              "append-icon": "settings",
                                              hint:
                                                "click icon gear untuk mengisi no keluarga.",
                                              "persistent-hint":
                                                _vm.editedIndex == -1,
                                              "prepend-icon":
                                                "supervised_user_circle",
                                              rules: [_vm.rules.required]
                                            },
                                            on: { "click:append": _vm.random },
                                            model: {
                                              value: _vm.editedItem.no_keluarga,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedItem,
                                                  "no_keluarga",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "editedItem.no_keluarga"
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
                                            md12: ""
                                          }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Kepala Keluarga",
                                              maxlength: "25",
                                              counter: "",
                                              clearable: "",
                                              "prepend-icon": "group_work",
                                              rules: [
                                                _vm.rules.required,
                                                _vm.rules.min
                                              ]
                                            },
                                            model: {
                                              value: _vm.editedItem.nama_kepala,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editedItem,
                                                  "nama_kepala",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "editedItem.nama_kepala"
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
                                "\n                SIMPAN\n                "
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
          items: _vm.keluargas,
          "item-key": "no_keluarga",
          search: _vm.search,
          loading: _vm.loadingTB,
          "disable-initial-sort": ""
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
                    _c("td", { staticClass: "text-xs-left px-1 caption" }, [
                      _c(
                        "div",
                        [
                          _c("v-icon", { attrs: { small: "" } }, [
                            _vm._v(
                              _vm._s(
                                props.expanded
                                  ? "keyboard_arrow_down"
                                  : "keyboard_arrow_up"
                              )
                            )
                          ]),
                          _vm._v(
                            "\n                " +
                              _vm._s(props.index + 1) +
                              "\n              "
                          )
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "text-xs-left",
                        class: { "font-weight-bold": props.expanded }
                      },
                      [
                        _vm._v(
                          " \n              " +
                            _vm._s(props.item.no_keluarga) +
                            "\n            "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("td", { staticClass: "text-xs-left text-no-wrap" }, [
                      _vm._v(_vm._s(_vm._f("ucWords")(props.item.nama_kepala)))
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
                              icon: "",
                              small: "",
                              color: "secondary",
                              disabled: _vm.loadingBtn
                            },
                            on: {
                              click: function($event) {
                                return _vm.print(props.item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { small: "" } }, [
                              _vm._v(
                                "\n                  print\n                "
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
                              icon: "",
                              small: "",
                              color: "error",
                              disabled: _vm.loadingBtn
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
                    attrs: { "pa-2": "" }
                  },
                  [
                    _c(
                      "v-flex",
                      { attrs: { xs12: "", sm12: "", md12: "", lg12: "" } },
                      [
                        _c(
                          "v-card",
                          [
                            _c("v-card-title", { staticClass: "pa-1" }, [
                              _c(
                                "h4",
                                [
                                  _c("v-icon", { attrs: { small: "" } }, [
                                    _vm._v("layers")
                                  ]),
                                  _vm._v(" Daftar Keluarga: "),
                                  _c("span", { staticClass: "font-italic" }, [
                                    _vm._v(_vm._s(props.item.nama_kepala))
                                  ])
                                ],
                                1
                              )
                            ]),
                            _vm._v(" "),
                            _c("v-divider"),
                            _vm._v(" "),
                            _c("v-data-table", {
                              attrs: {
                                headers: _vm.subheaders,
                                items: props.item.anggotas,
                                "hide-actions": ""
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "items",
                                    fn: function(props) {
                                      return [
                                        _c("tr", [
                                          _c(
                                            "td",
                                            { staticClass: "text-xs-left" },
                                            [_vm._v(_vm._s(props.item.no_rm))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "td",
                                            {
                                              staticClass:
                                                "text-xs-left text-no-wrap"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(props.item.nama_pasien)
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "td",
                                            { staticClass: "text-xs-left" },
                                            [_vm._v(_vm._s(props.item.status))]
                                          )
                                        ])
                                      ]
                                    }
                                  }
                                ],
                                null,
                                true
                              )
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

/***/ "./resources/js/components/loket/daftar/Perkeluarga.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perkeluarga.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Perkeluarga.vue?vue&type=template&id=57a3180a& */ "./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a&");
/* harmony import */ var _Perkeluarga_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Perkeluarga.vue?vue&type=script&lang=js& */ "./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Perkeluarga_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/loket/daftar/Perkeluarga.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Perkeluarga_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Perkeluarga.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Perkeluarga_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Perkeluarga.vue?vue&type=template&id=57a3180a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/loket/daftar/Perkeluarga.vue?vue&type=template&id=57a3180a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Perkeluarga_vue_vue_type_template_id_57a3180a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);