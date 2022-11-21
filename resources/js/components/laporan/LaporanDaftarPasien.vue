<template>
    <v-card>
        <v-toolbar card color="indigo darken-3" dark>
          <v-layout align-center justify-center row fill-height>
              <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
                  Laporan Daftar Pasien
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
            label="Cari Pasien..."
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
          v-if="tableShow"
          disable-initial-sort
          >
            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded" :class="props.expanded ? 'grey lighten-3' : ''">
                <td class="text-xs-center caption">
                    {{props.index+1}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.no_rm}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.nama_pasien}}
                </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                  {{props.item.jenis_pasien}}
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-layout justify-center class="grey lighten-4 text-xs-left" pa-1>
                <v-flex
                  xs12
                  sm12
                  md8
                  lg8
                >
                  <v-card :width="$vuetify.breakpoint.xs ? '75%' : '100%'">
                    <v-layout wrap column class="pa-1">
                      <v-flex xs12 sm12 md12 lg12>
                        <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Data Lengkap: <span class="green--text text--darken-3">[ {{props.item.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.nama_pasien }}</span></h4>
                        </v-card-title>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-list dense>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">KK/No. Keluarga</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.keluarga.nama_kepala}} / {{ props.item.keluarga.no_keluarga}}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">TTL</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{props.item.tempat_lahir}}, {{ props.item.tanggal_lahir | tgLahir }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">Umur</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.tanggal_lahir | umur }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">Jenis Kelamin</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.jenis_kelamin | gender}}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">Telepon</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.no_hp }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">ID Telegram</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.id_telegram ? props.item.id_telegram : 'Belum Diisi' }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content class="font-weight-bold">Pekerjaan</v-list-tile-content>
                            <v-list-tile-content class="align-end pr-1">{{ props.item.pekerjaan }}</v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12 sm12 md12 lg12>
                        <v-card-text class="font-weight-bold py-2">Alamat</v-card-text>
                        <v-card-text class="pt-0">{{props.item.alamat}}</v-card-text>
                      </v-flex>
                    </v-layout>
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
import Person from './../../Person.js';

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
        { text: 'No RM', value: 'no_rm', sortable: true },
        { text: 'Nama Pasien', value: 'nama_pasien', sortable: true },
        { text: 'Jenis Pasien', value: 'jenis_pasien', sortable: true },
      ],
      mode: 'Perbulan',
      jenis: 'Semua',
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
            axios.get('api/laporan-daftar-pasien/'+mod+'/'+this.fromDate+'/'+this.toDate+'/'+this.jenis).then((response)=>{
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
            axios.get('api/laporan-daftar-pasien/'+mod+'/'+this.bulan+'/'+this.tahun+'/'+this.jenis).then((response)=>{
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
            axios.get('api/laporan-daftar-pasien/'+mod+'/pertahun/'+this.pertahun+'/'+this.jenis).then((response)=>{
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

          var son = new Person();

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
          doc.myText("PASIEN TERDAFTAR",{align: "center"},0,34);
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
            body.push({
              no: i+1,
              pasien: his[i].nama_pasien,
              no_rm: his[i].no_rm,
              jk: his[i].jenis_kelamin,
              usia: son.umurMini(his[i].tanggal_lahir),
              jp: his[i].jenis_pasien,
              pekerjaan: his[i].pekerjaan,
              no_hp: his[i].no_hp,
              alamat: his[i].alamat,
            })
          }

          doc.autoTable({
            startY: 45,
            body: body,
            theme: 'grid',
            columns: [ {header: '#', dataKey: 'no'},{header: 'Nama Pasien', dataKey: 'pasien'},
              {header: 'No. RM', dataKey: 'no_rm'}, {header: 'J.K', dataKey:'jk'},
              {header: 'Umur', dataKey:'usia'}, {header: 'Pekerjaan', dataKey: 'pekerjaan'},
              {header: 'Jenis Pasien', dataKey: 'jp'}, {header: 'No. HP', dataKey: 'no_hp'}, {header: 'Alamat', dataKey: 'alamat'}
            ],
            bodyStyles: {valign: 'top'},
            headStyles: {fillColor: [48,63,159]},
            styles: {cellWidth: 'wrap', rowPageBreak: 'auto'},
            columnStyles: {usia: {cellWidth: 25, halign:'left'},alamat: {cellWidth: 'auto', halign: 'justify'}},
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
            doc.text(11, 18, 'Total Pasien : '+this.history.length)
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(200,15, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(200,20, this.setItem.jabatan)
            doc.text(200,40, this.setItem.atas_nama)
            doc.text(200,45, 'SIP. NO. '+this.setItem.no_sip)
          }else{
            doc.setFontSize(10);
            doc.setFontStyle('bold');
            doc.text(11, doc.autoTable.previous.finalY+18, 'Total Pasien : '+this.history.length)
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(200,doc.autoTable.previous.finalY+30, this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(200,doc.autoTable.previous.finalY+35, this.setItem.jabatan)
            doc.text(200,doc.autoTable.previous.finalY+50, this.setItem.atas_nama)
            doc.text(200,doc.autoTable.previous.finalY+55, 'SIP. NO. '+this.setItem.no_sip)
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