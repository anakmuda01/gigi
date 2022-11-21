<template>
  <div class="pa-0">
    <v-toolbar flat color="white">
      <v-layout align-center justify-center row fill-height>
          <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
              {{tglTerformat}}
          </v-toolbar-title>
      </v-layout>
    </v-toolbar>

    <v-dialog v-model="dialog" max-width="500px" persistent :fullscreen="$vuetify.breakpoint.xs">
      <v-card height="100%">
        <v-layout column fill-height>
          <v-card-actions class="indigo darken-2">
              <v-layout wrap row class="headline white--text ml-2">
                <v-icon dark medium class="mr-2">mdi-sale</v-icon>
                <div>Tambah Diskon</div>
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
                          :value="totin | duit" 
                          label="Total Biaya Konsultasi + Tindakan/Terapi"
                          prepend-icon="mdi-needle"
                          readonly
                          hide-details
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 md12>
                          <v-text-field
                          prefix="Rp. " 
                          v-model="diskon" 
                          label="Diskon"
                          prepend-icon="mdi-sale"
                          clearable
                          :suffix="persen+'%'"
                          :rules="[rules.num]"
                          type="number"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 md12>
                          <v-text-field
                          :value="mustPay | duit" 
                          label="Total Yang Harus Dibayar"
                          prepend-icon="mdi-cash"
                          readonly
                          hide-details
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
              @click="saveDiskon"
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

    <v-divider></v-divider>
    <v-card flat>
      <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Cari Pembayaran...."
              single-line
              hide-details
          ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="bayars"
      :search="search"
      item-key="id"
      hide-actions
      disable-initial-sort
      :loading="loadingTB"
      >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td @click.stop="" class="text-xs-center caption">
                <v-icon medium v-if="props.item.status_bayar == 'Lunas'" color="green">check_circle</v-icon>
                <v-layout v-else class="px-0" align-center warp>
                  <div class="px-0">
                      <v-icon small>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  </div>
                  <div class="px-0">
                      <span class="px-2">{{props.index+1}}</span>
                  </div>
                </v-layout>
              </td>
              <td class="text-xs-left">{{ props.item.anggota.nama_pasien }}</td>
              <td class="text-xs-left">{{ props.item.anggota.no_rm }}</td>
              <td class="text-xs-left text-no-wrap">{{ props.item.bayar.no_nota ? props.item.bayar.no_nota : 'Belum Bayar' }}</td>
              <td class="text-xs-left text-no-wrap">{{props.item.gigis | withDiskon(biayaKonsul,props.item.bayar.diskon)}}</td>
              <td class="justify-center layout px-0" @click.stop="">
                <v-btn 
                :disabled="loadingBtn"
                @click="pay(props.item)" icon small class="mr-1" color="primary"
                >
                  <v-icon
                    small
                  >
                    mdi-sale
                  </v-icon>
                </v-btn>
                <v-btn 
                :disabled="loadingBtn"
                @click="printBayar(props.item)" icon small class="mr-1" color="secondary"
                >
                  <v-icon
                    small
                  >
                    print
                  </v-icon>
                </v-btn>
                <v-btn class="ml-2"
                :disabled="loadingBtn"
                color="info"
                @click="send(props.item)"
                icon
                small
                >
                    <v-icon>mdi-telegram</v-icon>
                </v-btn>
                <v-btn class="ml-3"
                :disabled="loadingBtn"
                color="warning"
                @click="kontrol(props.item)"
                icon
                small
                >
                    <v-icon>mdi-controller-classic</v-icon>
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
                  <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Pembayaran: <span class="green--text text--darken-3">[ {{props.item.anggota.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.anggota.nama_pasien }}</span></h4>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                  :headers="Hdetails"
                  :items="props.item.gigis"
                  hide-actions
                  >
                    <template v-slot:items="props">
                      <tr>
                        <td class="justify-center" v-if="!$vuetify.breakpoint.xs">
                          <v-chip text-color="white" color="blue-grey">
                            <v-avatar>
                              <v-icon>mdi-tooth</v-icon>
                            </v-avatar>
                            <span>
                              {{props.item.no_gigi}}
                            </span>
                          </v-chip>
                        </td>
                        <td v-else class="caption text-xs-center">
                          {{props.item.no_gigi}}
                        </td>
                        <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                          <template v-for="(tindak,indexT) in props.item.tindaks">
                            <v-layout row wrap :key="indexT">
                              <v-flex xs12 sm12 md8 lg8 py-2>
                                <span :class="{'caption': $vuetify.breakpoint.xs}">{{tindak.nama_tindakan | ucWords}}</span>
                              </v-flex>
                              <v-flex py-2>
                                <span :class="{'caption': $vuetify.breakpoint.xs}">{{tindak.biaya | duit}}</span>
                              </v-flex>
                            </v-layout>
                          </template>
                        </td>
                        <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                            {{props.item.tindaks | sumTindakanPergigi }}
                        </td>
                      </tr>
                    </template>
                    <template v-slot:footer>
                      <td :class="{'caption py-0': $vuetify.breakpoint.xs}" :colspan="headers.length">
                        <v-layout column>
                          <v-flex>
                            <v-layout row wrap py-2>
                              <v-flex md3 lg3>
                                Sub Total Tindakan
                              </v-flex>
                              <v-flex>
                                : &nbsp; {{props.item.gigis | sumTindak}}
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-layout row wrap py-2>
                              <v-flex md3 lg3>
                                Konsultasi Dokter
                              </v-flex>
                              <v-flex>
                                : &nbsp; {{biayaKonsul | duit}}
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-layout row wrap py-2>
                              <v-flex md3 lg3>
                                <i class="red--text">Diskon {{props.item.gigis | formatDiskon(biayaKonsul,props.item.bayar.diskon)}}%</i>
                              </v-flex>
                              <v-flex>
                               : <i class="red--text"> - {{props.item.bayar.diskon | duit}}</i>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-layout row wrap py-2>
                              <v-flex md3 lg3>
                                <b>Total yang harus dibayar</b>
                              </v-flex>
                              <v-flex>
                                <b>: &nbsp; {{props.item.gigis | withDiskon(biayaKonsul,props.item.bayar.diskon)}}</b>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </td>
                    </template>
                    <template v-slot:no-data>
                      <v-layout justify-center align-center>
                        <v-flex class="font-weight-bold">
                          Belum ada data tindakan gigi..
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
          <template v-slot:footer>
            <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length" class="text-xs-left">
              <span class="font-weight-bold font-italic">*Klik cell untuk melihat detail pembayaran</span>
            </td>
          </template>
      </v-data-table>
    </v-card>
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
                <v-btn icon dark class="orange darken-2" flat @click="closePrintBiaya"><v-icon>close</v-icon></v-btn>
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
            
            <!-- <iframe id="pdf_preview" type="application/pdf" :src="sumberPDF" width="100%" height="91%"></iframe> -->
        </v-card>
      </v-dialog>
    </div>
    <!-- modal kontrol -->
    <div>
      <v-dialog v-model="modalKontrol" max-width="500px" persistent :fullscreen="$vuetify.breakpoint.xs">
        <v-card height="100%">
          <v-layout column fill-height>
            <v-card-actions class="indigo darken-2">
                <v-layout wrap row class="headline white--text ml-2">
                  <v-icon dark medium class="mr-2">mdi-controller-classic</v-icon>
                  <div>Kontrol</div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon dark class="orange darken-2" flat @click="closeKontrol"><v-icon>close</v-icon></v-btn>
            </v-card-actions>

            <v-form
            ref="formKontrol"
            lazy-validation
            >
              <v-card-text class="pa-0">
                  <v-container class="px-4 pt-3 pb-5" grid-list-md>
                      <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field 
                            v-model="kontrolItem.pasien" 
                            label="Pasien"
                            prepend-icon="person"
                            readonly
                            hide-details
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm12 md12 lg12>
                            <v-dialog
                            ref="dKontrol"
                            v-model="dTrol"
                            :return-value.sync="kontrolItem.tgl_kontrol"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            prepend-icon="date_range"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  :value="tglKontrol"
                                  label="Tanggal Kontrol"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                  :rules="[rules.required]"
                                ></v-text-field>
                              </template>
                              <v-date-picker locale="id" :min="tomorrow" v-model="kontrolItem.tgl_kontrol" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="dTrol = false">Batal</v-btn>
                                <v-btn flat color="primary" @click="$refs.dKontrol.save(kontrolItem.tgl_kontrol)">Oke</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>

                          <v-flex xs12 sm12 md12>
                            <v-textarea
                            v-model="kontrolItem.note"
                            label="Catatan Dokter Gigi"
                            prepend-icon="mdi-file-document-edit-outline"
                            maxlength="95"
                            counter
                            auto-grow
                            clearable
                            rows="3"
                            ></v-textarea>
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
                @click="saveKontrol"
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
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations } from 'vuex';
import jsPDF from 'jspdf';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import myfont from './../../core/myfont.js';

const h = new Date();
const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];
const y = h.setDate(h.getDate() + 1);
const z = new Date(y).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const tom = z[2]+'-'+z[0]+'-'+z[1];

  export default {
    data: () => ({
      modalKontrol: false,
      dTrol: false,
      live: null,
      today: now,
      tomorrow: tom,
      search: '',
      dialog: false,
      loadingBtn: false,
      loadingTB: false,
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      totin: 0,
      diskon: null,
      mustPay: 0,
      persen: 0,
      headers: [
        {
          text: 'No.',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '1%'
        },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: false },
        { text: 'No RM', value: 'anggota.no_rm', sortable: false, width: '1%' },
        { text: 'No. Nota', value: 'bayar.no_nota',sortable: true, width: '1%' },
        { text: 'Total Bayar', sortable: false, width: '1%' },
        { text: 'Aksi', align: 'center', value: 'name', sortable: false, width: '1%' }
      ],
      Hdetails: [
        {
          text: 'N.G',
          align: 'center',
          sortable: true,
          value: 'no_gigi',
          width: '1%'
        },
        { text: 'Terapi/Tindakan', value: 'gigis.tindaks', sortable: false},
        { text: 'Sub Total', sortable: false },
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
        num: v => /\d+/g.test(v)  || 'Angka Only'
      },
      editedItem: {
      },
      kontrolItem: {
        pasien : '',
        id_kontrol : '',
        tgl_kontrol: tom,
        note: ''
      }
    }),

    computed: {
      ...mapState([
        'bayars',
        'biayaKonsul',
        'setItem'
      ]),
      tglTerformat () {
        return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
      },
      tglKontrol() {
        return this.kontrolItem.tgl_kontrol ? format(this.kontrolItem.tgl_kontrol, 'DD MMMM YYYY', {locale: id}) : ''
      }
    },

    watch: {
      diskon(v){
        if(v){
          let p = (v/this.totin)*100
          this.persen = p.toFixed(2)
        }
        this.mustPay = this.totin-v
      }
    },

    mounted () {
      this.initialize()
      this.$store.dispatch('fetchSet');
    },

    methods: {
      initialize () {
        this.$store.dispatch('fetchBayars');
        this.$store.dispatch('fetchKonsul');
      },

      loading(){
        this.loadingTB = true
        this.loadingBtn = true
      },

      ready(){
        this.loadingTB = false
        this.loadingBtn = false
      },

      close () {
        this.dialog = false
        this.totin = 0
        this.diskon = null
        this.persen = 0
        this.mustPay = 0
        this.editedItem = {}
        this.diskon = null
        this.ready()
      },

      saveDiskon () {
        this.loading()
        if(this.$refs.form.validate()){
          this.$Progress.start();
          axios.put('api/diskon/'+this.editedItem.id, {disc: this.diskon}).then((response)=>{
            setTimeout(()=>{
              toast.fire({
                type: 'success',
                title: 'Diskon Berhasil disimpan~'
              })
              this.initialize()
              this.$Progress.finish();
              this.close()
            },1500)
          })
          .catch( (error) => {
            toast.fire({
              type: 'warning',
              title: 'Maaf, Ada Kesalahan :('
            })
            setTimeout(() => {
              this.$Progress.finish();
              this.close()
            }, 5000)
          })
        }else{
          setTimeout(()=>{
            this.ready()
          },500);
        }
      },

      closePrintBiaya(){
        this.modalPrint = false
        this.sumberPDF = null
      },

      formatDuit(duit){
          let val = (duit/1).toFixed(2).replace('.', ',')
          return 'Rp. '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },


      pay(item){
        this.editedItem = Object.assign({}, item)

        this.diskon = this.editedItem.bayar.diskon
 
        let subTotal = 0
        for(let i=0; i<item.gigis.length; i++){
          for(let j=0; j<item.gigis[i].tindaks.length; j++){
            subTotal += parseInt(item.gigis[i].tindaks[j].biaya,10)
          }
        }

        let withKonsul = subTotal+this.biayaKonsul

        this.totin = withKonsul
        this.mustPay = withKonsul

        this.dialog = true
      },

      cetakNow(item){

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          var docMobile = new jsPDF({
            unit: 'mm',
            format: [58, 297]
          })

          let pasien = item.anggota.no_rm+'_'+item.anggota.nama_pasien+'_'+item.tgl_kunjungan

          docMobile.setFontSize(5);
          docMobile.text(0,2,this.setItem.posA)
          docMobile.setFontSize(5);
          docMobile.text(0,4,this.setItem.posB)
          docMobile.text(0,7,this.setItem.posC)
          docMobile.setFontSize(4);
          docMobile.text(0,9,this.setItem.posD)
          docMobile.text(0,11,this.setItem.posE)
          docMobile.setFontSize(3);
          docMobile.text(0,13,'==============================')
          docMobile.setFontSize(4);
          docMobile.text(0,14,'No.RM           : '+item.anggota.no_rm)
          docMobile.text(0,16,'Nama Pasien     : '+item.anggota.nama_pasien)
          docMobile.text(0,18,'Tgl Kunjungan   : '+format(item.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          docMobile.setFontSize(3);
          docMobile.text(0,19,'==============================')
          docMobile.setFontSize(4);
          docMobile.text(0,21,'No. Nota        : '+item.bayar.no_nota)
          docMobile.setFontSize(3);
          docMobile.text(0,23,'--------------------------------')
          let gigis = item.gigis
          let total = 0
          for(let i=0; i<gigis.length; i++){
            for(let j=0; j<gigis[i].tindaks.length; j++) {
              total += parseInt(gigis[i].tindaks[j].biaya, 10)
            }
          }
          docMobile.setFontSize(4);
          docMobile.text(0,24,'Tindakan    :  '+this.formatDuit(total+this.biayaKonsul))
          docMobile.text(0,26,'Konsultasi  :  '+this.formatDuit(this.biayaKonsul))
          let sen = item.bayar.diskon*100/(total+this.biayaKonsul)
          docMobile.text(0,28,'Diskon      : -'+this.formatDuit(item.bayar.diskon))
          docMobile.setFontSize(3);
          docMobile.text(0,29,'--------------------------------')
          docMobile.setFontSize(4);
          docMobile.text(0,30,'Total       :  '+this.formatDuit(total+this.biayaKonsul-item.bayar.diskon))
          
          docMobile.setFontSize(3);
          docMobile.text(7,31,' ')
          docMobile.text(7,32,' ')
          docMobile.text(7,35,this.setItem.jabatan)
          docMobile.text(7,36,' ')
          docMobile.text(7,37,' ')
          docMobile.text(7,38,this.setItem.atas_nama)
          docMobile.text(0,39,'--------------------------------')
          docMobile.text(7,40,'SIP. NO. '+this.setItem.no_sip)
          docMobile.text(7,41,' ')
          docMobile.text(2,42,'* '+this.setItem.slogan+' *')

          docMobile.save('KT_'+pasien+'.pdf')
        }else{
          var doc = new jsPDF({
            unit: 'mm',
            format: [68, 297]
          })

          doc.addFileToVFS('dejavu.ttf', myfont)
          doc.addFont('dejavu.ttf', 'dejavu', 'normal');
          doc.setFont('dejavu', 'normal');
          doc.setFontSize(6.5);
          doc.text(0,2,this.setItem.posA)
          doc.setFontSize(6.5);
          doc.text(0,4.4,this.setItem.posB)
          doc.text(0,6.5,this.setItem.posC)
          doc.setFontSize(5);
          doc.text(0,8.8,this.setItem.posD)
          doc.text(0,10.5,this.setItem.posE)
          doc.setFontSize(4);
          doc.text(0,12,'============================================')
          doc.setFontSize(6.5);
          doc.text(0,14,'No.RM')
          doc.text(11,14,': ')
          doc.text(12,14,item.anggota.no_rm)
          doc.text(0,16.4,'Nama Pasien')
          let nama = item.anggota.nama_pasien.split(' ');
          if(nama.length > 1){
            if(nama[0].length >= 3){
              doc.text(11,16.4,': '+nama[0])
            }else{
              doc.text(11,16.4,': '+nama[1])
            }
          }else{
            doc.text(11,16.4,': '+item.anggota.nama_pasien)
          }
          doc.text(0,18.8,'Tgl Kunjungan')
          doc.text(11,18.8,': '+format(item.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          doc.setFontSize(4);
          doc.text(0,20.4,'============================================')
          
          doc.setFontSize(5);
          doc.text(0,22,'No. Nota')
          doc.text(11,22,': ')
          doc.text(12.5,22, ''+item.bayar.no_nota)
          doc.setFontSize(3);
          doc.text(0,23.3,'-------------------------------------------------------------')
          let gigis = item.gigis
          let total = 0
          for(let i=0; i<gigis.length; i++){
            for(let j=0; j<gigis[i].tindaks.length; j++) {
              total += parseInt(gigis[i].tindaks[j].biaya, 10)
            }
          }
          doc.setFontSize(5);
          doc.text(0,25,'Terapi/Tindakan')
          doc.text(11,25,':    '+this.formatDuit(total))
          doc.text(0,27,'Konsultasi')
          doc.text(11,27,':    '+this.formatDuit(this.biayaKonsul))
          let sen = item.bayar.diskon*100/(total+this.biayaKonsul)
          doc.text(0,29,'Diskon '+sen.toFixed(2)+'%')
          doc.text(11,29,': - '+this.formatDuit(item.bayar.diskon))
          doc.setFontSize(3);
          doc.text(0,30.3,'-------------------------------------------------------------')
          doc.setFontSize(5);
          doc.text(0,32.5,'Total')
          doc.setFontStyle("normal");
          doc.text(11,32.5,':    '+this.formatDuit(total+this.biayaKonsul-item.bayar.diskon))
          

          doc.setFont('dejavu','normal');
          doc.setFontSize(4.7);
          doc.text(5,38,this.setItem.jabatan)
          doc.text(5,41.5,this.setItem.atas_nama)
          doc.text(0,42.7,'-------------------------------------------------------------')
          doc.text(5,43.6,'SIP. NO. '+this.setItem.no_sip)
          doc.text(1.8,45.8,'** '+this.setItem.slogan+' **')

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
      
      printBayar(item){
        let final = this.formatDuit(parseInt(item.bayar.biaya-item.bayar.diskon)+this.biayaKonsul)
        if(!item.bayar.no_nota){
          swal.fire({
          title: 'Telah dibayarkan dan Cetak Kuitansi Sekarang?',
          html: 'Pembayaran : <span class="font-weight-bold purple--text">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+' </span> <br> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+' </span> <br>Total yang harus dibayar : <span class="font-weight-bold brown--text">'+final+'</span',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Lunas!'
          }).then((response) => {
            if (response.value) {
              setTimeout(()=>{
                this.$Progress.start();
                axios.put('api/lunas/'+item.id, {lunas: 'Lunas', nextNota: this.nextNumber() }).then((response)=>{
                  this.loadingTB = true
                  this.loadingBtn = true
                  swal.fire(
                    'LUNAS!',
                    'Pembayaran <span class="font-weight-bold purple--text">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+'</span> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+'</span><br>Total yang harus dibayar : <span class="font-weight-bold brown--text">'+final+'</span> <br> Telah Dibayarkan~ :)',
                    'success'
                  ).then(() => {
                    setTimeout(()=>{
                      this.initialize()
                      item.bayar.no_nota = response.data.bayar.no_nota
                      this.cetakNow(item)
                      this.ready()
                      this.$Progress.finish();
                    },1000)
                  })
                }).catch(()=> {
                    swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                    this.ready()
                    this.$Progress.finish();
                });
              },300)
            }else{
              this.ready()
              this.$Progress.finish();
            }
          })
        }else{
          this.cetakNow(item)
        }
      },

      telegram(item){

        var token = "806484516:AAFUhZ4yAO8wGMwbM5GYFl78TES6LciDizQ";
        var url = "https://api.telegram.org/bot" + token;
        var path = "https://photos.app.goo.gl/xc5sZ2ZC8dCKmsKh7";
 
        var output = []
        var result = item.bayar
        var tot = result.biaya*1+result.biaya_konsul*1-result.diskon*1

        output.push("<i>No. Nota</i>");
        output.push(" :  <b>"+result.no_nota+"</b>\n");
        output.push("Tindakan dan Konsul     "+this.formatDuit(result.biaya*1+result.biaya_konsul*1));
        output.push("         \n");
        output.push("Diskon                             - "+this.formatDuit(result.diskon));
        output.push("             \n");
        output.push("Total Bayar                       <b>"+this.formatDuit(tot)+"</b>");
        output.push("          \n");
        output.push("\n");
        output.push("\n");
        output.push("*** GIGI SEHAT REZEKI LANCAR ***\n");

        var text = output.join('');

        var tgl = format(this.today, 'DD MMMM YYYY', {locale: id})

        var uri = "["+item.anggota.no_rm+"] "+item.anggota.nama_pasien+"\n<b>Kuitansi - "+tgl+" : </b>\n====================================\n";
        var res = encodeURI(uri+text);

        var r = url + "/sendPhoto?chat_id="+item.anggota.id_telegram+"&photo="+path+"&caption="+res+"&parse_mode=html";
        fetch(r).then((response) => {
          if(response.ok){
          setTimeout(()=>{
            swal.fire({
              type: 'success',
              title: 'Kuitansi berhasil dirikim~ :)'
            })
            this.loadingBtn = false
            this.$Progress.finish();
          },500)
          }else{
            setTimeout(()=>{
            swal.fire({
              type: 'error',
              title: 'Gagal Mengirim~ ID Telegram yang dimasukkan Sudah Benar??'
            })
            this.loadingBtn = false
            this.$Progress.finish();
          },2000)
          }
        }).catch((error)=>{
          swal.fire({
            type: 'error',
            title: 'No Internet Connection~ :('
          })
          this.loadingBtn = false
          this.$Progress.finish();
        });
      },

      send(item){
        this.loadingBtn = true
        if(item.anggota.id_telegram){
          let final = this.formatDuit(parseInt(item.bayar.biaya-item.bayar.diskon)+this.biayaKonsul)
          if(!item.bayar.no_nota){
            swal.fire({
            title: 'Telah dibayarkan dan Kirim Kuitansi Sekarang?',
            html: 'Pembayaran : <span class="font-weight-bold purple--text">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+' </span> <br> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+' </span> <br>Total yang harus dibayar : <span class="font-weight-bold brown--text">'+final+'</span',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Lunas!'
            }).then((response) => {
              if (response.value) {
                setTimeout(()=>{
                  this.$Progress.start();
                  axios.put('api/lunas/'+item.id, {lunas: 'Lunas', nextNota: this.nextNumber() }).then((response)=>{
                    this.loadingTB = true
                    this.loadingBtn = true
                    swal.fire(
                      'LUNAS!',
                      'Pembayaran <span class="font-weight-bold purple--text">['+item.anggota.no_rm+'] '+item.anggota.nama_pasien+'</span> Kunjungan : <span class="indigo--text font-weight-bold">'+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id})+'</span><br>Total yang harus dibayar : <span class="font-weight-bold brown--text">'+final+'</span> <br> Telah Dibayarkan~ :)',
                      'success'
                    ).then(()=>{
                      setTimeout(()=>{
                        this.initialize()
                        item.bayar.no_nota = response.data.bayar.no_nota
                        item.bayar.biaya = response.data.bayar.biaya
                        item.bayar.biaya_konsul = response.data.bayar.biaya_konsul
                        console.log(item)
                        this.telegram(item)
                        this.ready()
                        this.$Progress.finish();
                      },500)
                    })
                  }).catch(()=> {
                      swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                      this.ready()
                      this.$Progress.finish();
                  });
                },300)
              }else{
                this.ready()
                this.$Progress.finish();
              }
            })
          }else{
            this.telegram(item)
          }
        }else{
          swal.fire({
            type: 'warning',
            title: 'ID Telegram pasien belum diisi~ :)'
          }).then(()=>{
            setTimeout(()=>{
              this.ready()
            }, 500)
          })
        }
      },

      reset : _.debounce(function () { 
        this.initialize()
      }, 3000),

      nextNumber(){
        let note = []
        for(let i=0;i<this.bayars.length;i++){
          if(this.bayars[i].bayar.no_nota){
            note.push(parseInt(this.bayars[i].bayar.no_nota.slice(6,9)))
          }
        }
        return Math.max.apply(Math, note)
      },

      kontrol(item){
        if(item.kontrol){
          this.kontrolItem.pasien = '[ '+item.anggota.no_rm+' ] '+item.anggota.nama_pasien
          this.kontrolItem.id_kontrol = item.id
          this.kontrolItem.tgl_kontrol = item.kontrol.tgl_kontrol
          this.kontrolItem.note = item.kontrol.note
        }else{
          this.kontrolItem.pasien = '[ '+item.anggota.no_rm+' ] '+item.anggota.nama_pasien
          this.kontrolItem.id_kontrol = item.id
        }
        this.modalKontrol = true
      },

      closeKontrol () {
        this.kontrolItem.pasien = ''
        this.kontrolItem.id_kontrol = ''
        this.kontrolItem.tgl_kontrol = tom
        this.kontrolItem.note = ''
        this.modalKontrol = false
        this.ready()
      },

      saveKontrol(){
        this.loading()
        if(this.$refs.formKontrol.validate()){
          this.$Progress.start();
          axios.post('/api/kontrol', this.kontrolItem).then((response)=>{
            setTimeout(()=>{
              toast.fire({
                type: 'success',
                title: 'Kontrol berhasil disimpan~'
              })
              this.initialize()
              this.cetakKontrol(response.data.rekam)
              this.$Progress.finish();
              this.closeKontrol()
            },1300)
          })
          .catch( (error) => {
            toast.fire({
              type: 'warning',
              title: 'Maaf, Ada Kesalahan :('
            })
            setTimeout(() => {
              this.$Progress.finish();
              this.close()
            }, 5000)
          })
        }
      },

      cetakKontrol(item){
        console.log(item)
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          var docMobile = new jsPDF({
            unit: 'mm',
            format: [58, 297]
          })

          let pasien = item.anggota.no_rm+'_'+item.anggota.nama_pasien+'_'+item.tgl_kunjungan

          docMobile.setFontSize(3);
          docMobile.text(0,2,this.setItem.posA)
          docMobile.setFontSize(3);
          docMobile.text(0,4,this.setItem.posB)
          docMobile.text(0,7,this.setItem.posC)
          docMobile.setFontSize(3);
          docMobile.text(0,9,this.setItem.posD)
          docMobile.text(0,11,this.setItem.posE)
          docMobile.setFontSize(3);
          docMobile.text(0,13,'==============================')
          docMobile.setFontSize(3);
          docMobile.text(0,14,'No.RM           : '+item.anggota.no_rm)
          docMobile.text(0,16,'Nama Pasien     : '+item.anggota.nama_pasien)
          docMobile.text(0,18,'Tgl Kunjungan   : '+format(item.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          docMobile.setFontSize(3);
          docMobile.text(0,19,'==============================')

          docMobile.setFontSize(3);
          docMobile.text(0,25,'+ Kontrol Kembali Tgl :')
          docMobile.setFontSize(3);
          docMobile.text(1,27,format(item.kontrol.tgl_kontrol, 'DD MMMM YYYY', {locale: id}))
          docMobile.setFontSize(3);
          docMobile.text(0,30,'+ Catatan      :')
          if(item.kontrol.note){
            let not =  docMobile.splitTextToSize(item.kontrol.note, 23)
            for(let i=0;i<not.length;i++){
              docMobile.text(1,32+i*2,not[i])
            }
            let nl = not.length
            
            docMobile.setFont('dejavu','normal');
            docMobile.setFontSize(3);
            docMobile.text(5,38+nl*2,'')
            docMobile.text(5,40+nl*2,'')
            docMobile.text(5,42+nl*2,'')
            docMobile.text(5,44+nl*2,this.setItem.jabatan)
            docMobile.text(5,47.5+nl*2,this.setItem.atas_nama)
            docMobile.text(0,48.7+nl*2,'--------------------------------')
            docMobile.text(5,49.6+nl*2,'SIP. NO. '+this.setItem.no_sip)
            docMobile.text(1.8,51.8+nl*2,'** '+this.setItem.slogan+' **')
          }else{
            docMobile.text(1,32,'Tidak ada catatan')

            docMobile.setFont('dejavu','normal');
            docMobile.setFontSize(3);
            docMobile.text(5,38,'')
            docMobile.text(5,40,'')
            docMobile.text(5,42,'')
            docMobile.text(5,44,this.setItem.jabatan)
            docMobile.text(5,47.5,this.setItem.atas_nama)
            docMobile.text(0,48.7,'--------------------------------')
            docMobile.text(5,49.6,'SIP. NO. '+this.setItem.no_sip)
            docMobile.text(1.8,51.8,'** '+this.setItem.slogan+' **')
          }

          docMobile.save('Kontrol_'+pasien+'.pdf')
        }else{
          var doc = new jsPDF({
            unit: 'mm',
            format: [68, 297]
          })

          doc.addFileToVFS('dejavu.ttf', myfont)
          doc.addFont('dejavu.ttf', 'dejavu', 'normal');
          doc.setFont('dejavu', 'normal');
          doc.setFontSize(6.5);
          doc.text(0,2,this.setItem.posA)
          doc.setFontSize(6.5);
          doc.text(0,4.4,this.setItem.posB)
          doc.text(0,6.5,this.setItem.posC)
          doc.setFontSize(5);
          doc.text(0,8.8,this.setItem.posD)
          doc.text(0,10.5,this.setItem.posE)
          doc.setFontSize(4);
          doc.text(0,12,'============================================')
          doc.setFontSize(6.5);
          doc.text(0,14,'No.RM')
          doc.text(11,14,': ')
          doc.text(12,14,item.anggota.no_rm)
          doc.text(0,16.4,'Nama Pasien')
          let nama = item.anggota.nama_pasien.split(' ');
          if(nama.length > 1){
            if(nama[0].length >= 3){
              doc.text(11,16.4,': '+nama[0])
            }else{
              doc.text(11,16.4,': '+nama[1])
            }
          }else{
            doc.text(11,16.4,': '+item.anggota.nama_pasien)
          }
          doc.text(0,18.8,'Tgl Kunjungan')
          doc.text(11,18.8,': '+format(item.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          doc.setFontSize(4);
          doc.text(0,20.4,'============================================')
          
          doc.setFontSize(5);
          doc.text(0,25,'+ Kontrol Kembali Tgl :')
          doc.setFontSize(6.5);
          doc.text(1,27,format(item.kontrol.tgl_kontrol, 'DD MMMM YYYY', {locale: id}))
          doc.setFontSize(5);
          doc.text(0,30,'+ Catatan      :')
          if(item.kontrol.note){
            doc.setFontSize(5);
            let not =  doc.splitTextToSize(item.kontrol.note, 23)
            for(let i=0;i<not.length;i++){
              doc.text(1,32+i*2,not[i])
            }
            let nl = not.length
            doc.setFont('dejavu','normal');
            doc.setFontSize(4.7);
            doc.text(5,38+nl*2,this.setItem.jabatan)
            doc.text(5,41.5+nl*2,this.setItem.atas_nama)
            doc.text(0,42.7+nl*2,'-------------------------------------------------------------')
            doc.text(5,43.6+nl*2,'SIP. NO. '+this.setItem.no_sip)
            doc.text(1.8,45.8+nl*2,'** '+this.setItem.slogan+' **')
          }else{
            doc.setFontSize(6.5);
            doc.text(1,32,'Tidak ada catatan')

            doc.setFont('dejavu','normal');
            doc.setFontSize(4.7);
            doc.text(5,38,this.setItem.jabatan)
            doc.text(5,41.5,this.setItem.atas_nama)
            doc.text(0,42.7,'-------------------------------------------------------------')
            doc.text(5,43.6,'SIP. NO. '+this.setItem.no_sip)
            doc.text(1.8,45.8,'** '+this.setItem.slogan+' **')
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
      }

    },

    created () {
      window.addEventListener('scroll', this.reset);
      this.live = setInterval(()=>{
        this.initialize()
      },5000)
    },
    destroyed () {
      window.removeEventListener('scroll', this.reset);
      clearInterval(this.live);
    }

  }
</script>

