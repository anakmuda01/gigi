<template>
    <v-card> 
        <v-toolbar card color="indigo darken-3" dark>
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Surat Keterangan Sakit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">{{tglTerformat}}</v-toolbar-title>
        </v-toolbar>
        <div>
            <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xs">
                <v-card height="100%">
                    <v-layout column fill-height>
                    <v-card-actions class="indigo darken-2">
                        <v-layout wrap row class="headline white--text ml-2">
                            <v-icon dark medium class="mr-2">mdi-contact-mail</v-icon>
                            <div>Buat Surat Keterangan Sakit</div>
                        </v-layout>
                        <v-spacer></v-spacer>
                        <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
                    </v-card-actions>

                    <v-form ref="formSuket">
                        <v-layout column :px-4="$vuetify.breakpoint.md || $vuetify.breakpoint.lg" :px-2="$vuetify.breakpoint.xs" pt-4>
                            <v-flex xs12 sm12 md12 py-2>
                                <v-autocomplete
                                v-model="editedItem.pasien"
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
                                        <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_rm}} - {{data.item.nama_pasien | ucWords}}</span>
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{data.item.no_rm}} - {{data.item.nama_pasien | ucWords}}
                                    </template>
                                </v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm12 md12 py-2>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md5 mr-1>
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
                                            :value="tglToday"
                                            label="Dari Tanggal"
                                            prepend-icon="mdi-calendar-today"
                                            readonly
                                            v-on="on"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker locale="id" v-model="editedItem.fromDate" @input="menuFrom = false"></v-date-picker>
                                    </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm12 md5>
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
                                            :value="tglIsuk"
                                            label="Sampai Tanggal"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker locale="id" v-model="editedItem.toDate" @input="menuTo = false"></v-date-picker>
                                    </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm12 md5>
                                    <v-menu
                                        ref="menuKontrol"
                                        v-model="menuKontrol"
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
                                            :value="tglKontrol"
                                            label="Kontrol Kembali"
                                            prepend-icon="mdi-calendar-check"
                                            readonly
                                            v-on="on"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker locale="id" v-model="editedItem.koDate" @input="menuKontrol = false"></v-date-picker>
                                    </v-menu>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-spacer></v-spacer>
                    <v-card-actions class="indigo darken-2">
                        <v-spacer></v-spacer>
                        <v-btn dark class="green darken-2" 
                        @click="saveSuket"
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
        <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Cari Surat Kererangan..."
            single-line
            hide-details
            clearable
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn fab small :disabled="loadingBtn" color="secondary" @click="newSuket">
                <v-icon>
                    mdi-contact-mail
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
        :headers="headers"
        :items="sukets"
        item-key="id"
        :loading="loadingx.val"
        disable-initial-sort
        :search="search"
        >
            <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.no_suket}}
                    </td>
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.agt.no_rm }}
                    </td>
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.agt.nama_pasien | ucWords }}
                    </td>
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.tgl_surat }}
                    </td>
                    <td @click.stop="" class="justify-center align-center layout px-0">
                        <v-btn :disabled="loadingBtn" color="secondary" class="mr-1" small icon @click="printSuket(props.item)">
                            <v-icon small>
                                print
                            </v-icon>
                        </v-btn>
                        <v-btn :disabled="loadingBtn" color="warning" class="mr-1" small icon @click="cetakSuketMini(props.item)">
                            <v-icon small>
                                print
                            </v-icon>
                        </v-btn>
                        <v-btn :disabled="loadingBtn" color="error" small icon @click="deleteItem(props.item)">
                            <v-icon small>
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
                    <v-layout column class="pa-1">
                        <v-card-title class="pa-1"><h4><v-icon small>layers</v-icon> Detail Surat Keterangan: <span class="green--text text--darken-3">[ {{props.item.no_suket}} ]</span></h4></v-card-title>
                        <v-divider></v-divider>
                        <v-flex px-4>
                            <v-layout row wrap>
                                <v-flex xs2>
                                    Dari Tanggal
                                </v-flex>
                                <v-flex xs9>
                                    : {{props.item.from | tgIndo}}
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex px-4>
                            <v-layout row wrap>
                                <v-flex xs2>
                                    Sampai Tanggal
                                </v-flex>
                                <v-flex xs9>
                                    : {{props.item.to | tgIndo}}
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex px-4>
                            <v-layout row wrap>
                                <v-flex xs2>
                                    Tanggal Kontrol
                                </v-flex>
                                <v-flex xs9>
                                    : {{props.item.kontrol | tgIndo}}
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </template>
            <template v-slot:footer>
              <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length" class="text-xs-left">
                <span class="font-weight-bold font-italic">*Klik cell untuk melihat daftar suket.</span>
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
import Person from "./../../Person";
import imgApotek from './../core/img.js';
import myfont from './../core/myfont.js';

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

const h = new Date();
const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];
const tom = h.setDate(h.getDate() + 1);

const z = new Date(tom).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const isuk = z[2]+'-'+z[0]+'-'+z[1];

const tomnya = h.setDate(new Date(tom).getDate() + 1);
const x = new Date(tomnya).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const isuknya = x[2]+'-'+x[0]+'-'+x[1];

const kon = h.setDate(new Date(tom).getDate() + 2);
const k = new Date(kon).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const kontrol = k[2]+'-'+k[0]+'-'+k[1];

    export default {
        data(){
            return{
                search: '',
                dialog: false,
                loadingBtn: false,
                loadingTB : false,
                modalPrint: false,
                sumberPDF: null,
                readyPDF: false,
                errorPDF: false,
                menuFrom: false,
                menuTo: false,
                menuKontrol: false,
                editedItem: {
                    pasien: null,
                    no_suket: '',
                    fromDate: isuk,
                    toDate: isuknya,
                    koDate: kontrol,
                    tgl_surat: '',
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => (v && v.length >= 3) || 'Min 3 karakter',
                },
                headers: [
                    { text: 'No. Suket', align: 'left', sortable: true, value: 'no_suket' },
                    { text: 'No RM', align: 'left', sortable: true, value: 'agt.no_rm' },
                    { text: 'Nama Pasien', align: 'left', sortable: true, value: 'agt.nama_pasien' },
                    { text: 'Tgl Surat', align: 'left', sortable: true, value: 'tgl_surat' },
                    { text: 'Aksi', align: 'center', sortable: false, width: '1%' },
                ],
            }
        },
        computed: {
            ...mapState([
                'anggotas',
                'sukets',
                'loadingx',
                'setItem'
            ]),
            tglTerformat () {
                return now ? format(now, 'DD MMMM YYYY', {locale: id}) : ''
            },
            tglToday () {
                return this.editedItem.fromDate ? format(this.editedItem.fromDate, 'DD MMMM YYYY', {locale: id}) : ''
            },
            tglIsuk () {
                return this.editedItem.toDate ? format(this.editedItem.toDate, 'DD MMMM YYYY', {locale: id}) : ''
            },
            tglKontrol () {
                return this.editedItem.koDate ? format(this.editedItem.koDate, 'DD MMMM YYYY', {locale: id}) : ''
            }
        },
        methods: {
            initialize(){
                this.$store.dispatch('fetchSuket');
            },
            customFilter (item, queryText, itemText) {
                const textOne = item.no_rm.toLowerCase()
                const textTwo = item.nama_pasien.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            pilih(i){
                this.editedItem.ng = i
            },
            closePrintBiaya(){
                this.modalPrint = false
                this.sumberPDF = null
            },
            newSuket(){
                this.dialog = true
            },

            printSuket(item){
                this.$Progress.start();
                var doc = new jsPDF()
                var son = new Person()

                doc.setFontSize(16);
                doc.setFontStyle('bold');
                doc.myText(this.setItem.InkjetA,{align: "center"},0,12);
                doc.setFontSize(18);
                doc.addImage(imgApotek, 'JPEG', 15, 5, 20, 25)
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
                doc.myText("SURAT KETERANGAN SAKIT",{align: "center"},0,36);
                doc.setFontSize(13);
                doc.setFontStyle('normal');
                doc.myText(item.no_suket,{align: "center"},0,42);

                doc.text(15,55, 'Yang bertanda tangan dibawah ini menerangkan,')
                doc.text(15,60, 'Bahwa :')

                doc.setFontStyle('normal');
                doc.text(15,70, 'Nama Pasien ')
                doc.text(55,70, ': '+item.agt.nama_pasien)
                doc.text(15,75, 'Umur ')
                doc.text(55,75, ': '+son.umur(item.agt.tanggal_lahir))
                doc.text(15,80, 'Jenis Kelamin ')
                doc.text(55,80, ': '+son.kelamin(item.agt.jenis_kelamin))
                doc.text(15,85, 'Pekerjaan ')
                doc.text(55,85, ': '+item.agt.pekerjaan)
                doc.text(15,95, 'Oleh karena sakit/perawatan kesehatan gigi sehingga memerlukan istirahat/kontrol :')
                doc.text(30,103, 'Selama') 
                doc.text(85,103, ': '+son.rangeDate(item.to,item.from))
                doc.text(30,108, 'Terhitung dari') 
                doc.text(85,108, ': '+son.tglIndo(item.from)+' s/d '+son.tglIndo(item.to))
                doc.text(30,113, 'Kontrol kembali tanggal') 
                doc.text(85,113, ': '+son.tglIndo(item.kontrol))
                doc.text(15,120, '*Harap yang berkepentingan maklum.')
                doc.text(15,125, ' Terima Kasih.')  
                doc.setFontSize(13);
                doc.setFontStyle('normal');
                doc.text(125,180, this.setItem.kota+', '+item.tgl_surat)
                doc.text(125,185, 'Hormat Kami,')
                doc.text(125,210, this.setItem.atas_nama)
                doc.text(125,215, 'SIP. NO. '+this.setItem.no_sip)


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
                    this.$Progress.finish();
                }).catch(()=>{
                    setTimeout(()=>{
                    this.errorPDF = true
                    this.loadingBtn = false
                    },1000)
                });
            },

            AutoNomorSuket(){
                const h = new Date().toLocaleString('en-GB',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
                const a = h.substr(0,10).split('/');
                const b = h.substr(12,8).split(':').join('');
                this.editedItem.no_suket = a[2].substr(2,4)+'/'+a[1]+''+a[0]+'/SK-'+b;
                this.editedItem.tgl_surat = format(now, 'DD MMMM YYYY', {locale: id})
                // alert(this.editedItem.no_suket)
            },
            close () {
                this.$refs.formSuket.resetValidation()
                this.editedItem.pasien = null 
                this.editedItem.no_suket = null
                this.loadingBtn = false
                this.loadingTB = false
                this.dialog = false
            },
            saveSuket(){
                this.$Progress.start();
                this.loadingBtn = true
                this.loadingTB = true
                this.AutoNomorSuket()
                if (this.$refs.formSuket.validate()){
                    axios.post('api/suket', this.editedItem).then((response) => {
                        setTimeout(()=>{
                        toast.fire({
                            type: 'success',
                            title: 'Data Surat Keterangan berhasil disimpan~'
                        })
                        this.initialize()
                        this.$Progress.finish();
                        this.close()
                        },1500)
                    }).catch( (error) => {
                        toast.fire({
                            type: 'warning',
                            title: 'Maaf, Ada Kesalahan~'
                        })
                        setTimeout(() => {
                            this.$Progress.finish();
                            this.close()
                            this.$router.push('bantuan')
                        }, 3000)
                    })
                }else{
                    setTimeout(() => {
                        this.$Progress.finish();
                        this.loadingBtn = false
                        this.loadingTB = false
                    }, 1000)
                }
            },

            deleteItem (item) {
                this.loadingTB = true
                this.loadingBtn = true
                swal.fire({
                title: 'Anda yakin?',
                html: 'Hapus data dari <span class="red--text font-weight-bold">'+item.no_suket+'</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, hapus!'
                }).then((response) => {
                    if (response.value) {
                            this.$Progress.start();
                            axios.delete('api/suket/'+item.id).then(()=>{
                                swal.fire(
                                'Deleted!',
                                'Data dari <span class="green--text font-weight-bold">'+item.no_suket+'</span>  telah terhapus!!.',
                                'success'
                                )
                                setTimeout(()=>{
                                    this.initialize()
                                    this.loadingTB = false
                                    this.loadingBtn = false
                                    this.$Progress.finish();
                                }, 2000)
                            }).catch(()=> {
                                swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                                this.loadingTB = false
                                this.loadingBtn = false
                                this.$Progress.finish();
                                this.$router.push('bantuan')
                            });
                    }else{
                        this.loadingTB = false
                        this.loadingBtn = false
                        this.$Progress.finish();
                    }
                })
            },

            cetakSuketMini(item){

                // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                // var docMobile = new jsPDF({
                //     unit: 'mm',
                //     format: [58, 297]
                // })

                // let pasien = item.anggota.no_rm+'_'+item.anggota.nama_pasien+'_'+item.tgl_kunjungan

                // docMobile.setFontSize(3);
                // docMobile.text(0,2,'Praktik Dokter Gigi Mandiri')
                // docMobile.setFontSize(3);
                // docMobile.text(0,4,'drg. Agus Dwi Karyanto, MPH')
                // docMobile.text(0,7,'SIP. NO. 055 TAHUN 2017')
                // docMobile.setFontSize(3);
                // docMobile.text(0,9,'Jl. Hercules No.1 Landasan Ulin')
                // docMobile.text(0,11,'Banjarbaru')
                // docMobile.setFontSize(3);
                // docMobile.text(0,13,'==============================')
                // docMobile.setFontSize(3);
                // docMobile.text(0,14,'No.RM           : '+item.anggota.no_rm)
                // docMobile.text(0,16,'Nama Pasien     : '+item.anggota.nama_pasien)
                // docMobile.text(0,18,'Tgl Kunjungan   : '+format(item.tgl_kunjungan, 'DD MMMM YYYY', {locale: id}))
                // docMobile.setFontSize(3);
                // docMobile.text(0,19,'==============================')

                // docMobile.setFontSize(3);
                // docMobile.text(0,25,'+ Kontrol Kembali Tgl :')
                // docMobile.setFontSize(3);
                // docMobile.text(1,27,format(item.kontrol.tgl_kontrol, 'DD MMMM YYYY', {locale: id}))
                // docMobile.setFontSize(3);
                // docMobile.text(0,30,'+ Catatan      :')
                // if(item.kontrol.note){
                //     let not =  docMobile.splitTextToSize(item.kontrol.note, 23)
                //     for(let i=0;i<not.length;i++){
                //     docMobile.text(1,32+i*2,not[i])
                //     }
                //     let nl = not.length
                    
                //     docMobile.setFont('dejavu','normal');
                //     docMobile.setFontSize(3);
                //     docMobile.text(5,38+nl*2,'')
                //     docMobile.text(5,40+nl*2,'')
                //     docMobile.text(5,42+nl*2,'')
                //     docMobile.text(5,44+nl*2,'TTD')
                //     docMobile.text(5,47.5+nl*2,'drg. Agus Dwi Karyanto, MPH')
                //     docMobile.text(0,48.7+nl*2,'--------------------------------')
                //     docMobile.text(5,49.6+nl*2,'Telp. 0852 4539 6161')
                //     docMobile.text(1.8,51.8+nl*2,'** GIGI SEHAT REZEKI LANCAR :) **')
                // }else{
                //     docMobile.text(1,32,'Tidak ada catatan')

                //     docMobile.setFont('dejavu','normal');
                //     docMobile.setFontSize(3);
                //     docMobile.text(5,38,'')
                //     docMobile.text(5,40,'')
                //     docMobile.text(5,42,'')
                //     docMobile.text(5,44,'TTD')
                //     docMobile.text(5,47.5,'drg. Agus Dwi Karyanto, MPH')
                //     docMobile.text(0,48.7,'--------------------------------')
                //     docMobile.text(5,49.6,'Telp. 0852 4539 6161')
                //     docMobile.text(1.8,51.8,'** GIGI SEHAT REZEKI LANCAR :) **')
                // }

                // docMobile.save('Kontrol_'+pasien+'.pdf')
                // }else{
                var doc = new jsPDF({
                    unit: 'mm',
                    format: [68, 297]
                })

                var son = new Person()

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
                doc.text(0,14,'Nama')
                doc.text(8.3 ,14,': ')
                let nama = item.agt.nama_pasien.split(' ');
                if(nama.length > 1){
                    if(nama[0].length >= 3){
                    doc.text(8.3,14,': '+nama[0])
                    }else{
                    doc.text(8.3,14,': '+nama[1])
                    }
                }else{
                    doc.text(8.3,14,': '+item.agt.nama_pasien)
                }
                doc.text(0,16.4,'Umur')
                doc.text(8.3 ,16.4,': '+son.umurMini(item.agt.tanggal_lahir))
                doc.text(0,18.8,'J.K')
                doc.text(8.3 ,18.8,': '+son.kelamin(item.agt.jenis_kelamin))
                doc.text(0,21,'Pekerjaan')
                doc.text(8.3,21,': '+item.agt.pekerjaan)

                doc.setFontSize(4);
                doc.text(0,22.4,'============================================')
                
                doc.setFontSize(5);
                doc.text(0,24,'Yang bertanda tangan dibawah ini,')
                doc.text(0,26,'menerangkan :')
                doc.text(0,30,'Oleh karena sakit/perawatan')
                doc.text(0,32,'kesehatan gigi sehingga memerlukan')
                doc.text(0,34,'istirahat/kontrol :')
                doc.text(0,36,'+ Selama :')
                doc.text(1,38, son.rangeDate(item.to,item.from))
                doc.text(0,40,'+ Terhitung dari :')
                doc.text(1,42, son.tglIndo(item.from)+' s/d '+son.tglIndo(item.to))
                doc.text(0,44,'+ Kontrol kembali :')
                doc.text(1,46, son.tglIndo(item.kontrol))
                doc.text(0,49,'*Harap yang berkepentingan maklum.')

                doc.setFont('dejavu','normal');
                doc.setFontSize(4.7);
                doc.text(3,56,this.setItem.kota+', '+item.tgl_surat)
                doc.text(3,59.5,this.setItem.atas_nama)
                doc.text(0,60.7,'-------------------------------------------------------------')
                doc.text(3,61.6,'SIP. NO. '+this.setItem.no_sip)
                doc.text(1.8,63.8,'** '+this.setItem.slogan+' **')

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
                // }
            }
        },
        mounted() {
            this.$store.dispatch('fetchAnggota')
            this.$store.dispatch('fetchSet')
            this.initialize()
        }
    }
</script>