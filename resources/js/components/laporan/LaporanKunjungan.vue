<template>
    <v-card>
        <v-toolbar card color="indigo darken-3" dark>
          <v-layout align-center justify-center row fill-height>
              <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
                  Laporan Kunjungan
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
          <v-flex>
             <v-select v-model="jenis" label="Jenis Pasien" :items="['Semua','Umum','Inhealth','AP','Lainnya']"></v-select>
          </v-flex>
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
          <v-flex xs12 py-2 v-if="tableShow">
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Cari Kunjungan..."
            single-line
            hide-details
            clearable
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="history"
          item-key="id"
          hide-actions
          :loading="loadingTB"
          v-if="tableShow && jenisTable !== 'AP'"
          disable-initial-sort
          >
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-center caption">
                    {{props.index+1}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.tgl_indo}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.jenis_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.nama_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.anggota.no_rm}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.tahun_k+' thn '+props.item.bulan_k+' bln '+props.item.hari_k+' hr'}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.keluhan}}
                </td>
              </tr>
            </template>
            <template v-slot:footer>
              <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length">
                <v-layout row wrap align-center>
                  <v-flex xs12 sm12 md6 lg6 class="text-xs-left">
                    <span class="font-weight-bold font-italic">*Klik cell untuk melihat detail pembayaran.</span>
                  </v-flex>
                </v-layout>
              </td>
            </template>
        </v-data-table>
        <!-- table AP -->
        <v-data-table
          :search="search"
          :headers="headersAP"
          :items="history"
          item-key="id"
          hide-actions
          :loading="loadingTB"
          v-if="tableShow && jenisTable === 'AP'"
          disable-initial-sort
          >
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-center caption">
                    {{props.index+1}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.tgl_indo}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.jenis_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.anggota.nama_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.anggota.no_rm}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.tahun_k+' thn '+props.item.bulan_k+' bln '+props.item.hari_k+' hr'}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.keluhan}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                  {{props.item.bayar.biaya*1+props.item.bayar.biaya_konsul*1-props.item.bayar.diskon*1 | duit}}
                </td>
              </tr>
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
    </v-card>
</template>

<script>
import _ from 'lodash';
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
      search: '',
      headers: [
        {
          text: '# No',
          align: 'left',
          sortable: false,
          width: '1%'
        },
        { text: 'Tgl Kunjungan', value: 'tgl_indo', sortable: true },
        { text: 'J.P', value: 'anggota.jenis_pasien', sortable: true },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: true },
        { text: 'No RM', value: 'anggota.no_rm', sortable: true },
        { text: 'Usia Saat Berkunjung', value: 'anggota.no_rm', sortable: true },
        { text: 'Keluhan', value: 'keluhan', sortable: true },
      ],
      headersAP: [
        {
          text: '# No',
          align: 'left',
          sortable: false,
          width: '1%'
        },
        { text: 'Tgl Kunjungan', value: 'tgl_indo', sortable: true },
        { text: 'J.P', value: 'anggota.jenis_pasien', sortable: true },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: true },
        { text: 'No RM', value: 'anggota.no_rm', sortable: true },
        { text: 'Usia Saat Berkunjung', value: 'anggota.no_rm', sortable: true },
        { text: 'Keluhan', value: 'keluhan', sortable: true },
        { text: 'Tagihan', value: 'tagihan', sortable: true },
      ],
      mode: 'Perbulan',
      jenis: 'Semua',
      jenisTable: 'Semua',
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
            axios.get('api/laporan-kunjungan/'+mod+'/'+this.fromDate+'/'+this.toDate+'/'+this.jenis).then((response)=>{
              this.jenisTable = this.jenis
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
            axios.get('api/laporan-kunjungan/'+mod+'/'+this.bulan+'/'+this.tahun+'/'+this.jenis).then((response)=>{
              this.jenisTable = this.jenis
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
            axios.get('api/laporan-kunjungan/'+mod+'/pertahun/'+this.pertahun+'/'+this.jenis).then((response)=>{
              this.jenisTable = this.jenis
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

      closePrint(){
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

          var doc = new jsPDF("l", "mm", "a4");
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
          doc.myText("LAPORAN KUNJUNGAN",{align: "center"},0,34);
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
          for(let i=0;i<his.length;i++){
            if(this.jenis !== 'AP'){
              body.push({
                index: i+1,
                tgl: his[i].tgl_indo,
                jp: his[i].anggota.jenis_pasien,
                pasien: his[i].anggota.nama_pasien,
                no_rm: his[i].anggota.no_rm,
                usia: his[i].tahun_k+' Thn '+his[i].bulan_k+' bln '+his[i].hari_k+' hr',
                keluhan: his[i].keluhan,
              })
            }else{
              body.push({
                index: i+1,
                tgl: his[i].tgl_indo,
                jp: his[i].anggota.jenis_pasien,
                pasien: his[i].anggota.nama_pasien,
                no_rm: his[i].anggota.no_rm,
                usia: his[i].tahun_k+' Thn '+his[i].bulan_k+' bln '+his[i].hari_k+' hr',
                keluhan: his[i].keluhan,
                tagihan: this.formatDuit(his[i].bayar.biaya*1+his[i].bayar.biaya_konsul*1-his[i].bayar.diskon*1),
              })
            }
          }

          if(this.jenis !== 'AP'){
            doc.autoTable({
              startY: 45,
              body: body,
              theme: 'grid',
              columns: [{header: '#', dataKey: 'index'},{header: 'Tanggal', dataKey: 'tgl'}, 
                {header: 'J.P', dataKey: 'jp'}, {header: 'Nama Pasien', dataKey: 'pasien'},
                {header: 'No. RM', dataKey: 'no_rm'}, {header: 'Usia Saat Berkunjung', dataKey:'usia'},
                {header: 'Keluhan', dataKey:'keluhan'}
              ],
              bodyStyles: {valign: 'top'},
              styles: {cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left'},
              headStyles: {fillColor: [48,63,159]},
              columnStyles: { usia: {cellWidth: 25 }, keluhan: {cellWidth: 'auto'}},
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
            // console.log(doc.autoTable.previous.finalY+50)
            // console.log(doc.internal.pageSize.height-10)
            if(doc.autoTable.previous.finalY+50 > doc.internal.pageSize.height-10){
              doc.addPage()
              doc.setFontSize(10);
              doc.setFontStyle('bold');
              doc.text(11, 15, 'Total Kunjungan : '+this.history.length)
              doc.setFontSize(10);
              doc.setFontStyle('normal');
              doc.text(200,15, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
              doc.text(200,20, this.setItem.jabatan)
              doc.text(200,40, this.setItem.atas_nama)
              doc.text(200,45, 'SIP. NO. '+this.setItem.no_sip)
            }else{
            doc.setFontSize(10);
              doc.setFontStyle('bold');
              doc.text(11, doc.autoTable.previous.finalY+15, 'Total Kunjungan : '+this.history.length)
              doc.setFontSize(10);
              doc.setFontStyle('normal');
              doc.text(200,doc.autoTable.previous.finalY+30, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
              doc.text(200,doc.autoTable.previous.finalY+35, this.setItem.jabatan)
              doc.text(200,doc.autoTable.previous.finalY+50, this.setItem.atas_nama)
              doc.text(200,doc.autoTable.previous.finalY+55, 'SIP. NO. '+this.setItem.no_sip)
            }
          }else{

            doc.autoTable({
              startY: 45,
              body: body,
              theme: 'grid',
              columns: [{header: '#', dataKey: 'index'},{header: 'Tanggal', dataKey: 'tgl'}, 
                {header: 'J.P', dataKey: 'jp'}, {header: 'Nama Pasien', dataKey: 'pasien'},
                {header: 'No. RM', dataKey: 'no_rm'}, {header: 'Usia Saat Berkunjung', dataKey:'usia'},
                {header: 'Keluhan', dataKey:'keluhan'},{header: 'Tagihan', dataKey:'tagihan'}
              ],
              bodyStyles: {valign: 'top'},
              styles: {cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left'},
              headStyles: {fillColor: [48,63,159]},
              columnStyles: { usia: {cellWidth: 25 }, keluhan: {cellWidth: 'auto'}},
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
            // console.log(doc.autoTable.previous.finalY+50)
            // console.log(doc.internal.pageSize.height-10)
            if(doc.autoTable.previous.finalY+50 > doc.internal.pageSize.height-10){
              doc.addPage()
              doc.setFontSize(10);
              doc.setFontStyle('bold');
              doc.text(11, 15, 'Total Kunjungan : '+this.history.length)
              doc.setFontSize(10);
              doc.setFontStyle('normal');
              doc.text(200,15, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
              doc.text(200,20, this.setItem.jabatan)
              doc.text(200,40, this.setItem.atas_nama)
              doc.text(200,45, 'SIP. NO. '+this.setItem.no_sip)
            }else{
            doc.setFontSize(10);
              doc.setFontStyle('bold');
              doc.text(11, doc.autoTable.previous.finalY+15, 'Total Kunjungan : '+this.history.length)
              doc.setFontSize(10);
              doc.setFontStyle('normal');
              doc.text(200,doc.autoTable.previous.finalY+30, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
              doc.text(200,doc.autoTable.previous.finalY+35, this.setItem.jabatan)
              doc.text(200,doc.autoTable.previous.finalY+50, this.setItem.atas_nama)
              doc.text(200,doc.autoTable.previous.finalY+55, 'SIP. NO. '+this.setItem.no_sip)
            }
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
      },

    }
  }
</script>