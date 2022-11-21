<template>
    <div>
        <v-toolbar card color="indigo darken-3" dark>
        <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Surat Rujukan</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">{{tglTerformat}}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-form ref="formRujukan">
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
                        <v-text-field 
                        prepend-icon="mdi-clipboard-pulse-outline"
                        label="Keterangan Klinis"
                        v-model="editedItem.klinis"
                        :rules="[rules.required]"
                        counter
                        maxlength="70"
                        clearable
                        >
                        </v-text-field>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-layout column>
                            <v-flex xs12 class="text-xs-center" py-2>
                                <span class="font-weight-bold subheading">REGION GIGI</span>
                            </v-flex>
                            <v-flex xs12>
                                <v-divider></v-divider>
                                <v-layout row>
                                    <v-flex xs6>
                                        <template v-for="i in reg1.slice().reverse()">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('1'+i)" :color="editedItem.ng === '1'+i ? 'red' : 'secondary'" small icon :key="i">
                                                1{{i}}
                                            </v-btn>
                                            <v-tooltip v-else top :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('1'+i)" icon small>
                                                        <v-icon color="red" v-if="editedItem.ng === '1'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else>mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>1{{i}}</span>
                                            </v-tooltip>
                                        </template> 
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex xs6>
                                        <template v-for="i in reg1">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('2'+i)" :color="editedItem.ng === '2'+i ? 'red' : 'secondary'" small icon :key="i">
                                                2{{i}}
                                            </v-btn>
                                            <v-tooltip v-else top :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('2'+i)" icon small>
                                                        <v-icon color="red" v-if="editedItem.ng === '2'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else>mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>2{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout row>
                                    <v-flex xs6>
                                        <template v-for="i in reg1.slice().reverse()">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('4'+i)" :color="editedItem.ng === '4'+i ? 'red' : 'secondary'" small icon :key="i">
                                                4{{i}}
                                            </v-btn>
                                            <v-tooltip v-else bottom :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('4'+i)" icon small>
                                                        <v-icon color="red" v-if="editedItem.ng === '4'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else>mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>4{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex xs6>
                                        <template v-for="i in reg1">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('3'+i)" :color="editedItem.ng === '3'+i ? 'red' : 'secondary'" small icon :key="i">
                                                3{{i}}
                                            </v-btn>
                                            <v-tooltip v-else bottom :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('3'+i)" icon small>
                                                        <v-icon color="red" v-if="editedItem.ng === '3'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else>mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>3{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-layout column>
                            <v-flex xs12>
                                <v-divider></v-divider>
                                <v-layout row>
                                    <v-flex xs6>
                                        <template v-for="i in reg2.slice().reverse()">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('5'+i)" :color="editedItem.ng === '5'+i ? 'red' : 'secondary'" small icon :key="i">
                                                5{{i}}
                                            </v-btn>
                                            <v-tooltip v-else top :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('5'+i)" icon small>
                                                        <v-icon color="orange accent-3" v-if="editedItem.ng === '5'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>5{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex xs6>
                                        <template v-for="i in reg2">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('6'+i)" :color="editedItem.ng === '6'+i ? 'red' : 'secondary'" small icon :key="i">
                                                6{{i}}
                                            </v-btn>
                                            <v-tooltip v-else top :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('6'+i)" icon small>
                                                        <v-icon color="orange accent-3" v-if="editedItem.ng === '6'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>6{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout row>
                                    <v-flex xs6>
                                        <template v-for="i in reg2.slice().reverse()">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('8'+i)" :color="editedItem.ng === '8'+i ? 'red' : 'secondary'" small icon :key="i">
                                                8{{i}}
                                            </v-btn>
                                            <v-tooltip v-else bottom :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('8'+i)" icon small>
                                                        <v-icon color="orange accent-3" v-if="editedItem.ng === '8'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>8{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                    <v-divider vertical></v-divider>
                                    <v-flex xs6>
                                        <template v-for="i in reg2">
                                            <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pilih('7'+i)" :color="editedItem.ng === '7'+i ? 'red' : 'secondary'" small icon :key="i">
                                                7{{i}}
                                            </v-btn>
                                            <v-tooltip v-else bottom :key="i">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on"  @click="pilih('7'+i)" icon small>
                                                        <v-icon color="orange accent-3" v-if="editedItem.ng === '7'+i">mdi-tooth</v-icon>
                                                        <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>7{{i}}</span>
                                            </v-tooltip>
                                        </template>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-layout column>
                            <v-flex xs12 class="text-xs-left" py-2>
                                <span class="font-weight-bold title">Bantuan Untuk :</span>
                            </v-flex>
                            <v-flex xs12>
                                <v-select 
                                v-model="editedItem.foto.nama" 
                                :items="['Peripikal (lokal)', 'Panoramic','Lainnya']"
                                label="Foto"
                                >
                                </v-select>
                                <v-text-field 
                                v-if="editedItem.foto.nama === 'Lainnya'" 
                                label="Ket. Foto Lainnya"
                                v-model="editedItem.foto.ket"
                                :rules="[editedItem.foto.nama === 'Lainnya' ? rules.required : '']"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex x12>
                                <v-select 
                                v-model="editedItem.protesa.nama" 
                                :items="['Denture Acrylic', 'Denture Valplast','Porcelain/Crown/Bridge','Lainnya']"
                                label="Protesa"
                                >
                                </v-select>
                                <v-text-field 
                                v-if="editedItem.protesa.nama === 'Lainnya'" 
                                label="Ket. Protesa Lainnya"
                                v-model="editedItem.protesa.ket"
                                :rules="[editedItem.protesa.nama === 'Lainnya' ? rules.required : '']"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-select :rules="[rules.required]" v-model="editedItem.mohon" label="Mohon" :items="['Hasil diserahkan penderita', 'Hasil diantar ke pengirim']"></v-select>
                    </v-flex>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-btn block color="success" @click="cetakRujukan">
                            <v-icon class="mr-2">print</v-icon>
                            Cetak
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
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
            </v-card>
            </v-dialog>
        </div>
        <div>
            <v-btn @click="tes">
                tes
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import Person from "./../../Person";
import imgApotek from './../core/img.js';
import formulir from './../core/formulir.js';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];
const angka1 = ['1','2','3','4','5','6','7','8'];
const angka2 = ['1','2','3','4','5'];

    export default {
        data(){
            return{
                modalPrint: false,
                sumberPDF: null,
                readyPDF: false,
                errorPDF: false,
                reg1: angka1,
                reg2: angka2,
                editedItem: {
                    ng: null,
                    pasien: '',
                    foto: {
                        nama : '',
                        ket : ''
                    },
                    protesa: {
                        nama : '',
                        ket : ''
                    },
                    klinis: '',
                    mohon: '',
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => (v && v.length >= 3) || 'Min 3 karakter',
                },
            }
        },
        computed: {
            ...mapState([
                'anggotas'
            ]),
            tglTerformat () {
                return now ? format(now, 'DD MMMM YYYY', {locale: id}) : ''
            }
        },
        methods: {
            customFilter (item, queryText, itemText) {
                const textOne = item.no_rm.toLowerCase()
                const textTwo = item.nama_pasien.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            cetakRujukan(){
                if(this.$refs.formRujukan.validate()){
                    if(this.editedItem.ng){
                        if(this.editedItem.foto.nama || this.editedItem.protesa.nama){
                            var item = this.editedItem
                            this.cetakPDF(item)
                        }else{
                            toast.fire({
                                type: 'warning',
                                title: 'Pilih Bantuan yang diperlukan !'
                            })
                        }
                    }else{
                        toast.fire({
                            type: 'warning',
                            title: 'Pilih Gigi !'
                        })
                    }
                }
            },
            pilih(i){
                this.editedItem.ng = i
            },
            closePrintBiaya(){
                this.modalPrint = false
                this.sumberPDF = null
            },
            cetakPDF(item){
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

                doc.setFontSize(16);
                doc.setFontStyle('bold');
                doc.myText("PRAKTIK DOKTER GIGI MANDIRI",{align: "center"},0,12);
                doc.setFontSize(18);
                doc.addImage(imgApotek, 'JPEG', 10, 5, 20, 25)
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
                doc.myText("SURAT RUJUKAN FOTO DAN PROTESA",{align: "center"},0,36);
                doc.setFontSize(13);
                doc.setFontStyle('normal');

                doc.text(11,50, 'Dengan Hormat,')
                doc.text(11,55, 'Mohon bantuan untuk pembuatan :')
                let photo = '';
                if(item.foto.nama === "Lainnya"){
                    photo = item.foto.ket
                }else{
                    photo = item.foto.nama
                }
                doc.text(11,62, '1. Foto ')
                doc.text(50,62, ': '+photo)
                let prot = '';
                if(item.protesa.nama === "Lainnya"){
                    prot = item.protesa.ket
                }else{
                    prot = item.protesa.nama
                }
                doc.text(11,68, '2. Protesa ')
                doc.text(50,68, ': '+prot)

                doc.text(11,79, 'Region :')

                var ar = angka1.slice().reverse()
                
                for(let i=0;i<ar.length;i++){
                    doc.text(33.3+i*9.09 ,90, '1'+ar[i])
                    if('1'+ar[i] === item.ng){
                        doc.circle(35.8+i*9.09, 88.5, 4)
                    }
                }
                doc.line(104.5,83,104.5,103)
                for(let i=0;i<angka1.length;i++){
                    doc.text(108+i*9 ,90, '2'+angka1[i])
                    if('2'+angka1[i] === item.ng){
                        doc.circle(110+i*9.09, 88.5, 4)
                    }
                }
                doc.line(30,93.5,180,93.5)
                for(let i=0;i<ar.length;i++){
                    doc.text(33.5+i*9.03 ,100, '4'+ar[i])
                    if('4'+ar[i] === item.ng){
                        doc.circle(35.8+i*9.09, 98.5, 4)
                    }
                }
                for(let i=0;i<angka1.length;i++){
                    doc.text(108+i*9 ,100, '3'+angka1[i])
                    if('3'+angka1[i] === item.ng){
                        doc.circle(110+i*9.09, 98.5, 4)
                    }
                }

                var ar2 = angka2.slice().reverse()

                for(let i=0;i<ar2.length;i++){
                    doc.text(60.3+i*9.09 ,115, '5'+ar2[i])
                    if('5'+ar2[i] === item.ng){
                        doc.circle(62.8+i*9.1, 113.5, 4)
                    }
                }
                doc.line(104.5,108,104.5,128)
                for(let i=0;i<angka2.length;i++){
                    doc.text(108+i*9 ,115, '6'+angka2[i])
                    if('6'+angka1[i] === item.ng){
                        doc.circle(110+i*9.1, 113.5, 4)
                    }
                }
                doc.line(30,118.5,180,118.5)
                for(let i=0;i<ar2.length;i++){
                    doc.text(60.5+i*9.03 ,125, '8'+ar2[i])
                    if('8'+ar2[i] === item.ng){
                        doc.circle(62.8+i*9.1, 123.5, 4)
                    }
                }
                for(let i=0;i<angka2.length;i++){
                    doc.text(108+i*9 ,125, '7'+angka2[i])
                    if('7'+angka1[i] === item.ng){
                        doc.circle(110+i*9.1, 123.5, 4)
                    }
                }
                doc.setFontStyle('bold');
                doc.text(11,160, 'Pada Penderita')
                doc.setFontStyle('normal');
                doc.text(15,165, 'Nama Pasien ')
                doc.text(55,165, ': '+item.pasien.nama_pasien)
                doc.text(15,170, 'Umur ')
                doc.text(55,170, ': '+son.umur(item.pasien.tanggal_lahir))
                doc.text(15,175, 'Jenis Kelamin ')
                doc.text(55,175, ': '+son.kelamin(item.pasien.jenis_kelamin))
                doc.text(15,180, 'No. HP ')
                doc.text(55,180, ': '+item.pasien.no_hp)
                doc.text(15,185, 'Alamat ')
                var sp = doc.splitTextToSize(item.pasien.alamat, 100)
                if(sp.length > 1){
                    doc.text(55,185, ': '+sp[0])   
                    doc.text(57.5,190, sp[1]) 
                }else{
                    doc.text(55,185, ': '+sp[0])   
                }
                
                doc.setFontStyle('italic');
                doc.text(15,198, 'Keterangan Klinis')
                var kn = doc.splitTextToSize(item.klinis, 100)
                if(kn.length > 1){
                    doc.text(55,198, ': '+kn[0])
                    doc.text(57.5,203, ''+kn[1]) 
                }else{
                    doc.text(55,198, ': '+kn[0])
                }

                doc.setFontSize(13);
                doc.setFontStyle('normal');
                doc.text(15,230, 'Mohon : ')
                doc.setFontStyle('italic');
                doc.text(35,230, item.mohon)

                doc.setFontSize(13);
                doc.setFontStyle('normal');
                doc.text(140,225, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
                doc.text(140,230, 'Hormat Kami,')
                doc.text(140,250, 'drg. Agus Dwi Karyanto, MPH')


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

            tes(){
                var doc = new jsPDF()

                doc.addImage(formulir, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height)
                doc.text('1 2 3 4 5 6 7', 10,30)
                doc.save('aaa.pdf')
                // doc.output('dataurlnewwindow');
            }
        },
        mounted() {
            this.$store.dispatch('fetchAnggota')
        }
    }
</script>