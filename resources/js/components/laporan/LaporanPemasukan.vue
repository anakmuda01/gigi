<template>
    <v-card>
        <v-toolbar card color="indigo darken-3" dark>
          <v-layout align-center justify-center row fill-height>
              <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
                  Laporan Pemasukan
              </v-toolbar-title>
          </v-layout>
        </v-toolbar>
        <v-divider></v-divider>
        <v-layout column pt-2 px-4>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex>
                <v-select v-model="mode" label="Cari Berdasarkan" :items="['Perbulan','Pertahun','Detail']"></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-form ref="formDetail">
            <v-flex xs12 v-if="mode === 'Detail'">
              <v-layout row wrap>
                <v-flex xs12 sm12 md4 mr-1>
                  <v-menu
                    ref="menuFrom"
                    v-model="menuFrom"
                    :close-on-content-click="false"
                    :nudge-right="1"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="tglYesterDay"
                        label="Dari Tanggal"
                        prepend-icon="mdi-calendar-today"
                        readonly
                        v-on="on"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="id" v-model="fromDate" @input="menuFrom = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md4>
                  <v-menu
                    ref="menuTo"
                    v-model="menuTo"
                    :close-on-content-click="false"
                    :nudge-right="1"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="tglToday"
                        label="Sampai Tanggal"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="id" v-model="toDate" @input="menuTo = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-form>
          <v-form ref="formPerbulan">
            <v-flex xs12 v-if="mode === 'Perbulan'">
              <v-layout row wrap :justify-space-between="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
                <v-flex xs5 sm5 md4 mr-2>
                  <v-select v-model="bulan" :rules="[rules.required]" label="Bulan" :items="months"></v-select>
                </v-flex>
                <v-flex xs5 sm5 md4>
                  <v-select v-model="tahun" :rules="[rules.required]" label="Tahun" :items="years"></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-form>
          <v-form ref="formPertahun">
            <v-flex xs12 v-if="mode === 'Pertahun'">
              <v-layout row wrap>
                <v-flex xs5 sm5 md4>
                  <v-select v-model="pertahun" :rules="[rules.required]" label="Tahun" :items="years"></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-form>
          <v-flex xs12 mb-2>
            <v-layout pt-3>
              <v-btn :disabled="loadingBtn" :loading="loadingBtn" @click="CariHistory" color="secondary" class="ml-0 mr-1">
                <v-icon class="mr-1">
                  search
                </v-icon>
                Cari
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="tableShow" :disabled="loadingBtn" :loading="loadingBtn" @click="Print" color="warning" class="mr-0">
                <v-icon class="mr-1">
                  print
                </v-icon>
                Print
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="history"
          item-key="id"
          hide-actions
          :loading="loadingTB"
          v-if="tableShow"
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-center caption">
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
                  {{props.item.tgl_indo}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.nama_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.bayar.no_nota ? props.item.bayar.no_nota : 'Belum Bayar'}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.bayar.biaya*1 + props.item.bayar.biaya_konsul*1 - props.item.bayar.diskon*1 | duit}}
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
                    <v-layout column>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Detail Pembayaran: <span class="green--text text--darken-3">[ {{props.item.anggota.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.anggota.nama_pasien }}</span></h4>
                        </v-card-title>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-layout column justify-center py-1 px-3>
                          <v-flex>
                            <v-layout row py-2>
                              <v-flex xs8 sm8 md3 lg3>
                                Biaya Terapi/Tindakan+Konsultasi Dokter
                              </v-flex>
                              <v-flex xs4 sm4>
                                : &nbsp; {{props.item.bayar.biaya*1+props.item.bayar.biaya_konsul*1 | duit}}
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-layout row py-2>
                              <v-flex xs8 md3 lg3>
                                <i class="red--text">Diskon {{props.item.bayar.diskon ? props.item.bayar.diskon : 0 | persenDiskon(props.item.bayar.biaya,props.item.bayar.biaya_konsul)}}%</i>
                              </v-flex>
                              <v-flex xs4>
                               : <i class="red--text"> - {{props.item.bayar.diskon ? props.item.bayar.diskon : 0 | duit}}</i>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-layout row py-2>
                              <v-flex xs8 sm8 md3 lg3>
                                <b>Total yang harus dibayar</b>
                              </v-flex>
                              <v-flex xs4 sm4>
                                <b>: &nbsp; {{props.item.bayar.biaya*1+props.item.bayar.biaya_konsul*1-props.item.bayar.diskon*1 | duit}}</b>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </template>
            <template v-slot:footer>
              <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length">
                <v-layout row wrap align-center>
                  <v-flex xs12 sm12 md6 lg6 class="text-xs-left">
                    <span class="font-weight-bold font-italic">*Klik cell untuk melihat detail pembayaran.</span>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="text-xs-right pr-1">
                    <span class="font-weight-bold font-italic headline">Total : {{history | totalHistory}}</span>
                  </v-flex>
                </v-layout>
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
          </v-card>
        </v-dialog>
      </div>
    </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import imgApotek from './../core/img.js';

const h = new Date();
const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];
const y = h.setDate(h.getDate() - 1);
const z = new Date(y).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const yest = z[2]+'-'+z[0]+'-'+z[1];

const bulans = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  export default {
    data: () => ({
      headers: [
        {
          text: '# No',
          align: 'left',
          sortable: false,
          width: '1%'
        },
        { text: 'Tgl Kunjungan', value: 'tgl_indo', sortable: true },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: true },
        { text: 'No Nota', value: 'bayar.no_nota', sortable: true },
        { text: 'Total Bayar', sortable: false }
      ],
      mode: 'Perbulan',
      live: null,
      tableShow: false,
      loadingBtn: false,
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      loadingTB: false,
      menuFrom: false,
      menuTo: false,
      history: [],
      fromDate: yest,
      toDate: now,
      months: bulans,
      rules: {
        required: v => !!v || 'Required.'
      },
      bulan: format(now, 'MMMM', {locale: id}),
      tahun: format(now, 'YYYY', {locale: id}),
      pertahun: format(now, 'YYYY', {locale: id}),
      total: 0,
    }),

    computed: {
      ...mapState([
        'years',
        'setItem'
      ]),
      tglYesterDay () {
        return this.fromDate ? format(this.fromDate, 'DD MMMM YYYY', {locale: id}) : ''
      },
      tglToday () {
        return this.toDate ? format(this.toDate, 'DD MMMM YYYY', {locale: id}) : ''
      }
    },

    mounted () {
      this.$store.dispatch('fetchSet');
      const hadang = ms => new Promise(resolve => setTimeout(resolve, ms));
      hadang(500).then(() => {
        this.$store.dispatch('fetchKonsul');
        this.$store.dispatch('fetchYears');
      }).catch(()=>{
        toast.fire({
          type: 'warning',
          title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
        })
        this.$router.push('bantuan')
      });
    },

    methods: {
      ready(){
        this.loadingBtn = false
        this.loadingTB = false
      },
      CariHistory(){
        this.$Progress.start()
        var mod = this.mode.toLowerCase();
        this.loadingBtn = true
        this.loadingTB = true
        if(this.mode === 'Detail'){
          if(this.$refs.formDetail.validate()){
            axios.get('api/history-pembayaran/'+mod+'/'+this.fromDate+'/'+this.toDate).then((response)=>{
              this.history = response.data
              this.tableShow = true
              this.ready()
              this.$Progress.finish()
            }).catch(()=>{
            toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
            this.ready()
            this.$Progress.finish()
            this.$router.push('bantuan')
            })
          }else{
            this.ready()
            this.$Progress.finish()
          }
        }else if(this.mode === 'Perbulan'){
          if(this.$refs.formPerbulan.validate()){
            this.loadingTB = true
            axios.get('api/history-pembayaran/'+mod+'/'+this.bulan+'/'+this.tahun).then((response)=>{
              this.history = response.data
              this.tableShow = true
              this.ready()
              this.$Progress.finish()
            }).catch(()=>{
            toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
            this.ready()
            this.$Progress.finish()
            this.$router.push('bantuan')
            })
          }else{
            this.ready()
            this.$Progress.finish()
          }
        }else if(this.mode === 'Pertahun'){
          if(this.$refs.formPertahun.validate()){
            this.loadingTB = true
            axios.get('api/history-pembayaran/'+mod+'/pertahun/'+this.pertahun).then((response)=>{
              this.history = response.data
              this.tableShow = true
              this.ready()
              this.$Progress.finish()
            }).catch(()=>{
            toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
            this.ready()
            this.$Progress.finish()
            this.$router.push('bantuan')
            })
          }else{
            this.ready()
            this.$Progress.finish()
          }
        }
      },

      formatDuit(duit){
          let val = (duit/1).toFixed(2).replace('.', ',')
          return 'Rp. '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },

      closePrintBiaya(){
        this.modalPrint = false
        this.sumberPDF = null
      },

      Print(){
        if(this.history.length > 0){
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
          doc.myText("LAPORAN PEMASUKAN",{align: "center"},0,34);
          doc.setFontSize(13);
          if(this.mode === "Detail"){
            doc.myText(format(this.fromDate, 'DD MMMM YYYY', {locale: id})+' - '+format(this.toDate, 'DD MMMM YYYY', {locale: id})
            ,{align: "center"},0,40);
          }else if(this.mode === "Perbulan"){
            doc.myText(this.bulan+' '+this.tahun,{align: "center"},0,40);
          }else if(this.mode === "Pertahun"){
            doc.myText(this.pertahun,{align: "center"},0,40);
          }
          var his = this.history

          let body = []
          let tot = 0
          for(let i=0;i<his.length;i++){
            body.push({
              index: i+1,
              tgl: his[i].tgl_indo,
              pasien: '[ '+his[i].anggota.no_rm+' ] '+his[i].anggota.nama_pasien,
              nota: his[i].bayar.no_nota,
              pay: this.formatDuit(his[i].bayar.biaya*1+his[i].bayar.biaya_konsul*1-his[i].bayar.diskon*1),
            })
            tot += his[i].bayar.biaya*1+his[i].bayar.biaya_konsul*1-his[i].bayar.diskon*1
          }

          doc.autoTable({
            startY: 45,
            body: body,
            theme: 'grid',
            headStyles: {fillColor: [48,63,159]},
            columns: [{header: '#', dataKey: 'index'},{header: 'Tanggal', dataKey: 'tgl'}, {header: 'Pasien', dataKey: 'pasien'},
              {header: 'Nota', dataKey: 'nota'}, {header: 'Bayar', dataKey:'pay'}
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

          if(doc.autoTable.previous.finalY+50 > doc.internal.pageSize.height-10){
            doc.addPage()
            doc.setFontSize(10);
            doc.setFontStyle('bold');
            doc.text(11, 15, 'Total Keseluruhan : '+this.formatDuit(tot))
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(140,15, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(140,20, this.setItem.jabatan)
            doc.text(140,40, this.setItem.atas_nama)
            doc.text(140,45, 'SIP. NO. '+this.setItem.no_sip)
          }else{
            doc.setFontSize(10);
            doc.setFontStyle('bold');
            doc.text(11, doc.autoTable.previous.finalY+18, 'Total Keseluruhan : '+this.formatDuit(tot))
            doc.setFontSize(10);
            doc.setFontStyle('normal');
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

        }else{
          toast.fire({
            type: 'warning',
            title: 'Maaf, tidak ada data yang diprint'
          })
        }
      }

    },
  }
</script>