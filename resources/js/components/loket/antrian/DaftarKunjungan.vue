<template>
    <div id="daftar-antrian">
        <v-toolbar flat color="white" class="mb-2">
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Cari Kunjungan...."
            single-line
            hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog :fullscreen="$vuetify.breakpoint.xs" v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn fab small :disabled="loadingBtn" color="secondary" v-on="on">
                  <v-icon
                  medium
                  >
                      assignment_ind
                  </v-icon>
                </v-btn>
                <v-btn @click="print" fab small :loading="loadingBtn" color="yellow">
                  <v-icon>
                    print
                  </v-icon>
                </v-btn>
              </template>
              <v-card height="100%">
                <v-layout column fill-height>
                  <v-card-actions class="indigo darken-2">
                      <v-layout wrap row class="headline white--text ml-2">
                        <v-icon dark medium class="mr-2">assignment_ind</v-icon>
                        <div>{{ formTitle }}</div>
                      </v-layout>
                      <v-spacer></v-spacer>
                      <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
                  </v-card-actions>

                  <v-form ref="form">
                    <v-card-text class="pa-0">
                      <v-container class="px-4 pt-3 pb-5" grid-list-md>
                        <v-layout justify-space-between wrap>
                          <v-flex xs12 sm12 md12 lg12>
                            <v-autocomplete
                            v-if="formTitle === 'Tambah Kunjungan'"
                            v-model="editedItem.anggota"
                            hint="Jika pasien tidak ditemukan, silahkan daftarkan pasien tersebut terlebih dahulu."
                            :items="anggotas"
                            label="Pilih Pasien"
                            persistent-hint
                            prepend-icon="account_circle"
                            :filter="customFilter"
                            clearable
                            :rules="[rules.required]"
                            >
                            <template slot="selection" slot-scope="data">
                                <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_rm}} - {{data.item.nama_pasien}}</span>
                            </template>
                            <template slot="item" slot-scope="data">
                                {{data.item.no_rm}} - {{data.item.nama_pasien}}
                            </template>
                            </v-autocomplete>
                            <v-text-field label="Pasien Terpilih" prepend-icon="person_pin" disabled hint="Edit hanya untuk data keluhan..." :value="editedItem.anggota.no_rm+' - '+editedItem.anggota.nama_pasien" v-else></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12>
                            <v-textarea
                              v-model="editedItem.keluhan"
                              label="Keluhan / Permintaan Pasien"
                              maxlength="80"
                              counter
                              clearable
                              prepend-icon="record_voice_over"
                              rows="1"
                              auto-grow
                              :rules="[rules.required]"
                            ></v-textarea>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12>
                            <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="editedItem.tgl_kunjungan"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            prepend-icon="date_range"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  :value="tglTerformat"
                                  label="Tanggal Kunjungan"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                  :disabled="editedIndex > -1"
                                  :rules="[rules.required]"
                                ></v-text-field>
                              </template>
                              <v-date-picker locale="id" :min="today" v-model="editedItem.tgl_kunjungan" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modal = false">Batal</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.tgl_kunjungan)">Oke</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-form>

                  <v-spacer></v-spacer>
                  <v-card-actions class="indigo darken-2">
                      <v-spacer></v-spacer>
                      <v-btn dark class="green darken-2" 
                      flat 
                      @click="save"
                      :loading="loadingBtn"
                      :disabled="loadingBtn"
                      >
                        <v-icon class="mr-2">save</v-icon>
                        SIMPAN
                        <template v-slot:loader>
                          <span class="custom-loader">
                            <v-icon light>cached</v-icon>
                          </span>
                        </template>
                      </v-btn>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="kunjungans"
          item-key="id"
          :search="search"
          disable-initial-sort
          :loading="loadingTB"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-center px-2 caption">
                    <v-layout class="px-0" align-center warp>
                        <div class="px-0">
                           <v-icon small>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </div>
                        <div class="px-0">
                            <span class="px-2">{{props.index+1}}</span>
                        </div>
                    </v-layout>
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.nama_pasien | ucWords}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.tgl_indo}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs, 'red--text': props.item.status === 'Pending', 'green--text': props.item.status === 'Selesai'}" class="text-xs-left">
                  {{props.item.status}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs, 'red--text': props.item.status_bayar === 'Belum', 'green--text': props.item.status_bayar === 'Lunas'}" class="text-xs-left">
                  {{props.item.status_bayar}}
                </td>
                <td @click.stop="" class="justify-center align-center layout px-0">
                  <v-btn 
                  :disabled="loadingBtn"
                  @click="editItem(props.item)" icon small class="mr-1" color="primary">
                    <v-icon
                      small
                    >
                      edit
                    </v-icon>
                  </v-btn>
                  <v-btn 
                  :disabled="loadingBtn"
                  @click="deleteItem(props.item)" icon small color="error">
                    <v-icon
                      small
                    >
                      delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-layout justify-center class="grey lighten-4 text-xs-left" pa-1>
                <v-flex
                  xs12
                  sm12
                  md12
                  lg12
                >
                  <v-card>
                    <v-layout wrap column class="pa-1">
                      <v-flex xs12 sm12 md12 lg12>
                        <v-layout row wrap>
                          <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Keluhan/Permintaan: <span class="green--text text--darken-3">[ {{props.item.anggota.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.anggota.nama_pasien }}</span></h4>
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-btn :disabled="loadingBtn" color="secondary" icon small :to="'/rekam-medik/'+ props.item.anggota.no_rm"><v-icon small>assignment</v-icon></v-btn>
                        </v-layout>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-card-text class="py-2">{{props.item.keluhan}}</v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </template>
            <template v-slot:footer>
              <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length" class="text-xs-left">
                <span class="font-weight-bold font-italic">*Klik cell untuk melihat detail keluhan/permintaan dari pasein.</span>
              </td>
            </template>
        </v-data-table>
      <div>
        <v-dialog v-model="modalPrint" fullscreen>
          <v-card height="100%"> 
              <v-card-actions class="indigo darken-2">
                  <v-layout wrap column class="headline white--text ml-2">
                      <v-flex xs12>
                          <v-layout wrap row>
                              <v-icon dark medium class="mr-2">print</v-icon>
                          </v-layout>
                      </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-btn icon dark class="orange darken-2" flat @click="closePrint"><v-icon>close</v-icon></v-btn>
              </v-card-actions>

              <embed v-if="readyPDF" :src="sumberPDF" width="100%" height="91%" type="application/pdf">

              <v-card-text v-else height="100%">
                <span class="font-weight-bold red--text" v-if="errorPDF">Gagal Menampilkan Halaman Print :(</span>         
                <v-progress-circular
                  v-else
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Errors from "../../../Errors.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import imgApotek from './../../core/img.js';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    data: () => ({
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
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'anggota.no_rm',
          width: '1%'
        },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: false },
        { text: 'Kunjungan', value: 'tgl_indo', sortable: true},
        { text: 'Status', value: 'status', sortable: true},
        { text: 'Pembayaran', value: 'status_bayar', sortable: true},
        { text: 'Aksi', align: 'center', sortable: false, width: '1%' }
      ],
      errors: null,
      editedIndex: -1,
      editedItem: {
        anggota: null,
        keluhan: null,
        tgl_kunjungan: null,
        tgl_indo: null,
        status: null,
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
      },
      live : null,
    }),

    computed: {
     ...mapState([
        'keluargas',
        'anggotas',
        'kunjungans',
        'setItem'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Kunjungan' : 'Edit Data Kunjungan'
      },
      tglTerformat () {
        return this.editedItem.tgl_kunjungan ? format(this.editedItem.tgl_kunjungan, 'DD MMMM YYYY', {locale: id}) : ''
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted() {
      this.$store.dispatch('fetchAnggota')
      this.$store.dispatch('fetchKunjungan')
      this.$store.dispatch('fetchSet');
    },

    methods: {
      initialize () {
        this.$store.dispatch('fetchAnggota')
        this.$store.dispatch('fetchKunjungan')
      },

      customFilter (item, queryText, itemText) {
        const textOne = item.no_rm.toLowerCase()
        const textTwo = item.nama_pasien.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },

      editItem (item) {
        this.editedIndex = this.kunjungans.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      loading(){
        this.loadingTB = true
        this.loadingBtn = true
      },

      ready(){
        this.loadingTB = false
        this.loadingBtn = false
      },

      deleteItem (item) {
        this.loading()
        swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <span class="red--text font-weight-bold">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+' </span> <br> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+' </span> <br>Data yang sudah dihapus tidak bisa dikembalikan lagi !',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
        }).then((response) => {
              if (response.value) {
                    this.$Progress.start();
                    axios.delete('api/kunjungan/'+item.id).then(()=>{
                      swal.fire(
                        'Deleted!',
                        'Data dari <span class="green--text font-weight-bold">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+'</span> <br> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+'</span> <br> telah terhapus!!.',
                        'success'
                      )
                      setTimeout(()=>{
                        this.initialize()
                        this.ready()
                        this.$Progress.finish();
                      }, 1500)
                    }).catch(()=> {
                        swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                        this.ready()
                        this.$Progress.finish();
                    });
              }else{
                this.ready()
                this.$Progress.finish();
              }
        })
      },

      close () {
        this.editedIndex = -1
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.errors = new Errors()
        this.editedItem = {
          anggota: null,
          keluhan: null,
          tgl_kunjungan: null,
          tgl_indo: null,
          status: null,
        }
        this.ready()
        this.dialog = false
      },

      save () {
        this.loading()
        this.editedItem.tgl_indo = format(this.editedItem.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})
        if (this.editedIndex > -1) {
          this.$Progress.start();
          if (this.$refs.form.validate()){
            axios.put('api/kunjungan/'+this.editedItem.id, this.editedItem).then((response) => {
              setTimeout(()=>{
                this.$Progress.finish();
                toast.fire({
                  type: 'success',
                  title: 'Data Kunjungan berhasil diupdate~'
                })
                this.close()
                this.initialize()
              },1500)
            }).catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              setTimeout(() => {
                this.$Progress.finish();
                this.close()
              }, 5000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 2000)
          }
        } else {
          this.$Progress.start()
          if(this.$refs.form.validate()){
            axios.post('api/kunjungan', this.editedItem).then((response)=>{
              if(response.data.msg !== 'exist'){
                setTimeout(()=>{
                  this.$Progress.finish();
                  toast.fire({
                    type: 'success',
                    title: 'Kunjungan berhasil ditambahkan~'
                  })
                  this.close()
                  this.initialize()
                },1500)
              }else{
                setTimeout(()=>{
                  toast.fire({
                    type: 'warning',
                    title: 'Tanggal Kunjungan  <span class="red--text font-weight-bold ml-1 mr-1">['+response.data.no_rm+'] '+response.data.nama_pasien+'</span> telah ada sebelumnya.'
                  })
                  this.ready()
                  this.$Progress.finish();
                },2000)
              }
            })
            .catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              this.errors.record(error.response.data)
              setTimeout(() => {
                this.ready()
                this.$Progress.finish();
              }, 2000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 2000)
          }
        }
      },

      closePrint(){
        this.modalPrint = false
        this.sumberPDF = null
      },

      print(){
        (function(API){
        API.myText = function(txt, options, x, y) {
        options = options ||{};
          if( options.align == "center" ){
              var fontSize = this.internal.getFontSize();
              var pageWidth = this.internal.pageSize.width;
              var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;
              x = ( pageWidth - txtWidth ) / 2;
          }
          this.text(txt,x,y);
          }
        })(jsPDF.API);

        var doc = new jsPDF("p", "mm", "a4");
        var totalPagesExp = "{total_pages_count_string}";
        var item = this.kunjungans

        doc.setFontSize(16);
        doc.setFontStyle('bold');
        doc.myText(this.setItem.InkjetA,{align: "center"},0,12);
        doc.setFontSize(18);
        doc.addImage(imgApotek, 'JPEG', 10, 5, 20, 25)
        doc.myText(this.setItem.InkjetB,{align: "center"},0,18);
        doc.setFontSize(11);
        doc.setFontStyle('normal');
        doc.myText(this.setItem.InkjetC,{align: "center"},0,23);
        doc.setFontSize(9);
        doc.setFontStyle('italic');
        doc.myText(this.setItem.InkjetD,{align: "center"},0,27);
        doc.line(10,28,doc.internal.pageSize.width-10,28);

        doc.setFontSize(16);
        doc.setFontStyle('bold');
        doc.myText("RIWAYAT KUNJUNGAN PASIEN",{align: "center"},0,34);
        doc.setFontSize(13);

        let body = []
        for(let i=0;i<item.length;i++){
          body.push({
            index: i+1,
            tgl: item[i].tgl_indo,
            pasien: '[ '+item[i].anggota.no_rm+' ] '+item[i].anggota.nama_pasien,
          })
        }

        doc.autoTable({
          startY: 45,
          body: body,
          columns: [{header: 'No.', dataKey: 'index'},{header: 'Tanggal', dataKey: 'tgl'}, {header: 'Pasien', dataKey: 'pasien'}
          ],
          didDrawPage: function (data) {
          var str = "Page " + doc.internal.getNumberOfPages()
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
              str = str + " of " + totalPagesExp;
          }
          doc.setFontSize(10);

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
          },
          margin: {top:5, left:10, right:10},
        })

        // doc.setFontSize(10);
        // doc.setFontStyle('normal');
        // doc.text(140,doc.autoTable.previous.finalY+30, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
        // doc.text(140,doc.autoTable.previous.finalY+35, 'TTD')
        // doc.text(140,doc.autoTable.previous.finalY+50, 'drg. Agus Dwi Karyanto, MPH')
          
          doc.setFontSize(10);
          doc.setFontStyle('normal');
          if(doc.autoTable.previous.finalY+50 > doc.internal.pageSize.height-10){
            doc.addPage()
            doc.text(140,15, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(140,20, this.setItem.jabatan)
            doc.text(140,40, this.setItem.atas_nama)
            doc.text(140,45, 'SIP. NO. '+this.setItem.no_sip)
          }else{
            doc.text(140,doc.autoTable.previous.finalY+30, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(140,doc.autoTable.previous.finalY+35, this.setItem.jabatan)
            doc.text(140,doc.autoTable.previous.finalY+50, this.setItem.atas_nama)
            doc.text(140,doc.autoTable.previous.finalY+55, 'SIP. NO. '+this.setItem.no_sip)
          }

        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }

        
        this.readyPDF = false
        this.modalPrint = true
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        this.loadingBtn = true

        wait(1500).then(() => {
          doc.autoPrint();
          var string = doc.output('datauristring');
          this.sumberPDF = string
          this.loadingBtn = false
          this.readyPDF = true
        }).catch(()=>{
          setTimeout(()=>{
            this.errorPDF = true
            this.loadingBtn = false
          },1000)
        });
      }
    },

    created(){
      this.live = setInterval(()=>{
        this.initialize()
      },5000)
    },
    beforeDestroy(){
      clearInterval(this.live);
    }
  }
</script>