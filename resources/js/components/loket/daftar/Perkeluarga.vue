<template>
  <div>
    <v-toolbar flat color="white" class="pb-2 pt-1">
      <v-text-field
      v-model="search"
      append-icon="search"
      label="Cari Keluarga..."
      single-line
      hide-details
      clearable
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xs" persistent>
        <template v-slot:activator="{ on }">
            <v-btn fab small :disabled="loadingBtn" color="secondary" v-on="on">
                <v-icon
                medium
                >
                    group_add
                </v-icon>
            </v-btn>
        </template>
        <v-card height="100%">
          <v-layout column fill-height>
            <v-card-actions class="indigo darken-2">
                <v-layout wrap row class="headline white--text ml-2">
                  <v-icon dark medium class="mr-2">group</v-icon>
                  <div>{{ formTitle }}</div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
            </v-card-actions>

            <v-form
            ref="form"
            lazy-validation
            >
              <v-card-text class="pa-0">
                  <v-container class="px-4 pt-3 pb-5" grid-list-md>
                      <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field 
                            readonly
                            :disabled="editedIndex > -1"
                            v-model="editedItem.no_keluarga" 
                            label="No Keluarga"
                            append-icon="settings"
                            @click:append="random"
                            hint="click icon gear untuk mengisi no keluarga."
                            :persistent-hint="editedIndex == -1"
                            prepend-icon="supervised_user_circle"
                            :rules="[rules.required]"
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field 
                            v-model="editedItem.nama_kepala" 
                            label="Kepala Keluarga"
                            maxlength="25"
                            counter
                            clearable
                            prepend-icon="group_work"
                            :rules="[rules.required, rules.min]"
                            ></v-text-field>
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
    :items="keluargas"
    item-key="no_keluarga"
    :search="search"
    :loading="loadingTB"
    disable-initial-sort
    >
        <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded" :class="props.expanded ? 'grey lighten-3' : ''">
              <td class="text-xs-left px-1 caption">
                <div>
                  <v-icon small>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  {{props.index+1}}
                </div>
              </td>
              <td class="text-xs-left" :class="{'font-weight-bold': props.expanded}"> 
                {{ props.item.no_keluarga }}
              </td>
              <td class="text-xs-left text-no-wrap">{{ props.item.nama_kepala | ucWords }}</td>
              <td @click.stop="" class="justify-center align-center layout px-0">
                <v-btn
                :disabled="loadingBtn" 
                @click="editItem(props.item)" icon small color="primary"
                >
                  <v-icon
                    small
                  >
                    edit
                  </v-icon>
                </v-btn>
                <v-btn @click="print(props.item)" icon small color="secondary"
                  :disabled="loadingBtn"
                >
                  <v-icon
                    small
                  >
                    print
                  </v-icon>
                </v-btn>
                <v-btn @click="deleteItem(props.item)" icon small color="error"
                  :disabled="loadingBtn"
                >
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
          <v-layout class="grey lighten-4 text-xs-left" pa-2>
            <v-flex
            xs12
            sm12
            md12
            lg12
            >
              <v-card>
                <v-card-title class="pa-1"><h4><v-icon small>layers</v-icon> Daftar Keluarga: <span class="font-italic">{{ props.item.nama_kepala }}</span></h4></v-card-title>
                <v-divider></v-divider>
                <v-data-table
                  :headers="subheaders"
                  :items="props.item.anggotas"
                  hide-actions
                  >
                    <template v-slot:items="props">
                      <tr>
                        <td class="text-xs-left">{{props.item.no_rm}}</td>
                        <td class="text-xs-left text-no-wrap">{{props.item.nama_pasien}}</td>
                        <td class="text-xs-left">{{props.item.status}}</td>
                      </tr>
                    </template>
                  </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
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
import _ from 'lodash';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import imgApotek from './../../core/img.js';
import Person from "./../../../Person.js";

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
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [
        { text: '#', align: 'left', sortable: false, width: '1%' },
        { text: 'No. KG', align: 'left', sortable: true, value: 'no_keluarga', width: '1%'},
        { text: 'Nama Kepala', align: 'left', sortable: true, value: 'nama_kepala' },
        { text: 'Aksi', value: 'name', sortable: false, align: 'center', width: '1%' }
      ],
      subheaders: [
        { text: 'No. RM', align: 'left', sortable: true, value: 'no_rm', width: '1%' },
        { text: 'Nama Anggota', align: 'left', sortable: true, value: 'nama_pasien' },
        { text: 'Status', align: 'left', sortable: false, value: 'status' },
      ],
      errors: new Errors(),
      editedIndex: -1,
      editedItem: {
        no_keluarga: null,
        nama_kepala: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
      }
    }),

    computed: {
      ...mapState([
        'keluargas',
        'anggotas',
        'setItem'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Keluarga' : 'Edit Keluarga'
      },
    },

    mounted() {
      this.$store.dispatch('fetchSet');
      const hadang = ms => new Promise(resolve => setTimeout(resolve, ms));
      hadang(1000).then(() => {
        this.initialize()
      }).then(()=>{
        setTimeout(()=>{
          this.loadingTB = false
        }, 500)
      }).catch(()=>{
        toast.fire({
          type: 'warning',
          title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
        })
        this.$router.push('bantuan')
      });
    },

    methods: {
      random(){
        let bar = this.today.split('-')
        let foo = bar[0].slice(2,4)+bar[1]+bar[2]
        let dom = foo+Math.floor(Math.random()*(999-100+1)+100)
        let c = this.keluargas.find(f => f.no_keluarga === dom)
        if(!c){
          return this.editedItem.no_keluarga = dom
        }
      },

      initialize () {
        this.$store.dispatch('fetchKeluarga')
        this.$store.dispatch('fetchAnggota')
      },

      editItem (item) {
        this.editedIndex = this.keluargas.indexOf(item)
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
        html: 'Hapus data dari <span class="red--text font-weight-bold">['+item.no_keluarga+'] '+item.nama_kepala+'</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
        }).then((response) => {
              if (response.value) {
                    this.$Progress.start();
                    axios.delete('api/keluarga/'+item.id).then((respon)=>{
                      if(respon.data.msg === 'exist'){
                        swal.fire("Gagal!", "Untuk menghapus data Keluarga silahkan Hapus Semua Anggota terlebih dahulu!", "error");
                        setTimeout(()=>{
                          this.initialize()
                          this.ready()
                          this.$Progress.finish();
                        }, 2000)
                      }else{
                        setTimeout(()=>{
                          this.initialize()
                          swal.fire(
                            'Deleted!',
                            'Data dari <span class="green--text font-weight-bold">['+item.no_keluarga+'] '+item.nama_kepala+'</span>  telah terhapus!!.',
                            'success'
                          )
                          this.ready()
                          this.$Progress.finish();
                        }, 2000)
                      }
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
          no_keluarga: null,
          nama_kepala: ''
        }
        this.ready()
        this.dialog = false
      },

      save () {
        this.loading()
        if (this.editedIndex > -1) {
          this.$Progress.start();
          if (this.$refs.form.validate()){
            axios.put('api/keluarga/'+this.editedItem.id, this.editedItem).then((response) => {
                toast.fire({
                  type: 'success',
                  title: 'Data Keluarga berhasil diupdate~'
                })
                setTimeout(()=>{
                  this.initialize()
                  this.close()
                  this.$Progress.finish();
                },1000)
            }).catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              setTimeout(() => {
                this.$Progress.finish();
                this.close()
              }, 3000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 1000)
          }
        } else {
          this.$Progress.start()
          if(this.$refs.form.validate()){
            axios.post('api/keluarga', this.editedItem).then((response)=>{
              toast.fire({
                type: 'success',
                title: 'Keluarga berhasil ditambahkan~'
              })
              setTimeout(()=>{
                this.initialize()
                this.close()
                this.$Progress.finish();
              },1000)
            })
            .catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              this.errors.record(error.response.data)
              setTimeout(() => {
                this.close()
                this.$Progress.finish();
              }, 3000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 1000)
          }
        }
      },

      print(item){
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

        var doc = new jsPDF('l')
        var totalPagesExp = "{total_pages_count_string}";
        var son = new Person()

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

        doc.setFontSize(14);
        doc.setFontStyle('bold');
        doc.myText("Data Keluarga "+item.no_keluarga,{align: "center"},0,36);
        doc.myText(item.nama_kepala,{align: "center"},0,41);

        let body = []
        for(let i=0; i<item.anggotas.length; i++){
          body.push({
            index : i+1,
            nama_anggota : item.anggotas[i].nama_pasien,
            ttl : item.anggotas[i].tempat_lahir+', '+son.tglIndo(item.anggotas[i].tanggal_lahir),
            status: item.anggotas[i].status,
            pekerjaan : item.anggotas[i].pekerjaan,
            alamat : item.anggotas[i].alamat,
          })
        }

        let body2 = []
        for(let i=0; i<item.anggotas.length; i++){
          body2.push({
            index : i+1,
            no_rm : item.anggotas[i].no_rm,
            nama_anggota : item.anggotas[i].nama_pasien,
            jk : son.kelamin(item.anggotas[i].jenis_kelamin),
            umur : son.umur(item.anggotas[i].tanggal_lahir),
            no_hp : item.anggotas[i].no_hp,
            telegram : item.anggotas[i].id_telegram ? item.anggotas[i].id_telegram : 'Belum diisi',
          })
        }

        doc.setFontSize(11);
        doc.setFontStyle('normal');

        doc.autoTable({
          startY: 48,
          body: body,
          columns: [
            {header: 'No.', dataKey: 'index' }, 
            {header: 'Nama Anggota Keluarga', dataKey: 'nama_anggota'},
            {header: 'Tempat, Tanggal Lahir', dataKey: 'ttl'}, 
            {header: 'Status', dataKey: 'status'}, 
            {header: 'Pekerjaan', dataKey: 'pekerjaan'}, 
            {header: 'Alamat', dataKey: 'alamat'}, 
            ],
          theme: 'grid',
          styles: {
            cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left', valign: 'middle'
          },
          headStyles: {halign: 'center', fillColor: [48,63,159]},
          columnStyles: {
            index: {CellWidth: 3, cellWidth: 'auto', halign: 'center'},
            nama_anggota: {CellWidth: 'auto', valign: 'top'},
            ttl: {CellWidth: 'auto', valign: 'top'},
            status: {cellWidth: 'auto', halign: 'center'},
            pekerjaan: {CellWidth: 'auto', valign: 'top'},
            Alamat: {valign: 'top'},
          },
          margin: {top:5, left:10, right:10}
        });

        doc.setFontSize(14);
        doc.setFontStyle('bold');
        doc.myText("Detail Anggota/Pasien",{align: "center"},0,doc.autoTable.previous.finalY+15);

        doc.autoTable({
          startY: doc.autoTable.previous.finalY+22,
          body: body2,
          columns: [
            {header: 'No.', dataKey: 'index' }, 
            {header: 'No. RM', dataKey: 'no_rm'},
            {header: 'Nama Anggota/Pasien', dataKey: 'nama_anggota'}, 
            {header: 'J.K', dataKey: 'jk'}, 
            {header: 'Umur', dataKey: 'umur'}, 
            {header: 'No HP', dataKey: 'no_hp'}, 
            {header: 'ID Telegram', dataKey: 'telegram'}, 
            ],
          theme: 'grid',
          styles: {
            cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left', valign: 'middle'
          },
          headStyles: {halign: 'center', fillColor: [48,63,159]},
          columnStyles: {
            index: {CellWidth: 3, cellWidth: 'auto', halign: 'center'},
            no_rm: {CellWidth: 10, valign: 'top', halign: 'center'},
            nama_anggota: {CellWidth: 'auto', valign: 'top'},
            umur: {cellWidth: 'auto', halign: 'center'},
            jk: {cellWidth: 'auto', halign: 'center'},
            no_hp: {cellWidth: 'auto', halign: 'center'},
            telegram: {cellWidth: 'auto', halign: 'center'},
          },
          didDrawPage: function (data) {
          // Header
          // doc.setFontSize(20);
          // doc.setTextColor(40);
          // doc.setFontStyle('normal');
          // doc.text("Report", data.settings.margin.left + 15, 22);

          // Footer
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
          margin: {top:5, left:10, right:10}
        });


        doc.setFontSize(10);
        doc.setFontStyle('normal');
        doc.text(210,doc.autoTable.previous.finalY+18, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
        doc.text(210,doc.autoTable.previous.finalY+23, this.setItem.jabatan)
        doc.text(210,doc.autoTable.previous.finalY+38, this.setItem.atas_nama)
        doc.text(210,doc.autoTable.previous.finalY+43, 'SIP. NO. '+this.setItem.no_sip)

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
      },

      closePrint(){
        this.modalPrint = false
        this.sumberPDF = null
      },
    }
  }
</script>