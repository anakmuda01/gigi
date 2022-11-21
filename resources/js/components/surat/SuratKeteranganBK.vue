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
                                        <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_rm}} - {{data.item.nama_pasien}}</span>
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{data.item.no_rm}} - {{data.item.nama_pasien}}
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
                            SIMPAN DAN CETAK
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
            label="Cari Tindakan..."
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
        >
            <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.no_rm }}
                    </td>
                    <td class="text-xs-left text-no-wrap"> 
                        {{ props.item.nama_pasien }}
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
                        <v-card-title class="pa-1"><h4><v-icon small>layers</v-icon> Daftar Suket: <span class="green--text text--darken-3">[ {{props.item.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.nama_pasien }}</span></h4></v-card-title>
                        <v-divider></v-divider>
                        <v-data-table
                        :headers="subheaders"
                        :items="props.item.sukets"
                        item-key="id"
                        :search="search"
                        :loading="loadingx.val"
                        disable-initial-sort
                        >
                            <template v-slot:items="props">
                                <tr>
                                    <td class="text-xs-left">{{props.index+1}}</td>
                                    <td class="text-xs-left">{{props.item.no_suket}}</td>
                                    <td class="text-xs-left text-no-wrap">{{props.item.from | tgIndo}}</td>
                                    <td class="text-xs-left">{{props.item.to | tgIndo}}</td>
                                    <td class="text-xs-left">{{props.item.kontrol | tgIndo}}</td>
                                    <td class="justify-center layout px-0">
                                        <v-btn
                                        :disabled="loadingBtn" 
                                        @click="printSuket(props.item)" icon small class="mr-1" color="secondary"
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
                        </v-data-table>
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
                                <v-icon dark medium class="mr-2">mdi-image</v-icon>
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
        <div>
            <v-btn @click="AutoNomorSuket">
                tes
            </v-btn>
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

const h = new Date();
const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];
const tom = h.setDate(h.getDate() + 1);
const z = new Date(tom).toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const isuk = z[2]+'-'+z[0]+'-'+z[1];
const kon = h.setDate(new Date(tom).getDate() + 1);
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
                    fromDate: now,
                    toDate: isuk,
                    koDate: kontrol,
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => (v && v.length >= 3) || 'Min 3 karakter',
                },
                headers: [
                    { text: 'No RM', align: 'left', sortable: true, value: 'no_rm' },
                    { text: 'Nama Pasien', align: 'left', sortable: true, value: 'nama_pasien' },
                ],
                subheaders: [
                    { text: '#', align: 'left', sortable: false, width: '1%' },
                    { text: 'No Suket', align: 'left', sortable: true, value: 'no_suket' },
                    { text: 'Dari Tgl', align: 'left', sortable: true, value: 'from' },
                    { text: 'Sampai Tgl', align: 'left', sortable: true, value: 'to' },
                    { text: 'Tgl Kontrol', align: 'left', sortable: true, value: 'kontrol' },
                    { text: 'Aksi', sortable: false, align: 'center', width: '1%' }
                ],
            }
        },
        computed: {
            ...mapState([
                'anggotas',
                'sukets',
                'loadingx'
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
            findOrangnya(id){
               var orang = this.sukets.find(x => x.id === id )
               return orang
            },
            printSuket(item){
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

                var doc = new jsPDF()
                var son = new Person()
                var sianu = this.findOrangnya(item.anggota_id);
                doc.setFontSize(16);
                doc.setFontStyle('bold');
                doc.myText("PRAKTIK DOKTER GIGI MANDIRI",{align: "center"},0,12);
                doc.setFontSize(18);
                doc.addImage(imgApotek, 'JPEG', 15, 5, 20, 25)
                doc.myText("APOTEK SALMA BANJARBARU",{align: "center"},0,18);
                doc.setFontSize(11);
                doc.setFontStyle('normal');
                doc.myText("drg. Agus Dwi Karyanto, MPH",{align: "center"},0,23);
                doc.setFontSize(9);
                doc.setFontStyle('italic');
                doc.myText("Jl. Hercules No.1 Landasan Ulin Telp. 0852 4539 6161",{align: "center"},0,27);
                doc.line(10,28,doc.internal.pageSize.width-10,28);

                doc.setFontSize(16);
                doc.setFontStyle('bold');
                doc.myText("SURAT KETERANGAN SAKIT",{align: "center"},0,36);
                doc.setFontSize(13);
                doc.setFontStyle('normal');

                doc.text(15,55, 'Yang bertanda tangan dibawah ini menerangkan,')
                doc.text(15,60, 'Bahwa :')

                doc.setFontStyle('normal');
                doc.text(15,70, 'Nama Pasien ')
                doc.text(55,70, ': '+sianu.nama_pasien)
                doc.text(15,75, 'Umur ')
                doc.text(55,75, ': '+son.umur(sianu.tanggal_lahir))
                doc.text(15,80, 'Jenis Kelamin ')
                doc.text(55,80, ': '+son.kelamin(sianu.jenis_kelamin))
                doc.text(15,85, 'Pekerjaan ')
                doc.text(55,85, ': '+sianu.pekerjaan)
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
                doc.text(130,180, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
                doc.text(130,185, 'Hormat Kami,')
                doc.text(130,210, 'drg. Agus Dwi Karyanto, MPH')


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

            AutoNomorSuket(){
                const h = new Date().toLocaleString('en-GB',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
                const a = h.substr(0,10).split('/');
                const b = h.substr(12,8).split(':').join('');
                this.editedItem.no_suket = a[2].substr(2,4)+'/'+a[1]+''+a[0]+'/SK-'+b;
                // alert(this.editedItem.no_suket)
            },
            close () {
                this.$refs.formSuket.reset()
                this.$refs.formSuket.resetValidation()
                this.editedItem.pasien = null 
                this.editedItem.no_suket = null
                this.loadingBtn = false
                this.loadingTB = false
                this.dialog = false
            },
            saveSuket(){
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
                        },2000)
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
                title: 'Pian yakin?',
                html: 'Hapus data dari <span class="red--text font-weight-bold">'+item.nama_tindakan+'</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, hapus ja!'
                }).then((response) => {
                    if (response.value) {
                            this.$Progress.start();
                            axios.delete('api/tindakan/'+item.id).then(()=>{
                            swal.fire(
                            'Deleted!',
                            'Data dari <span class="green--text font-weight-bold">'+item.nama_tindakan+'</span>  telah terhapus!!.',
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
                            });
                    }else{
                        this.loadingTB = false
                        this.loadingBtn = false
                        this.$Progress.finish();
                    }
                })
            },
        },
        mounted() {
            this.$store.dispatch('fetchAnggota')
            this.initialize()
        }
    }
</script>