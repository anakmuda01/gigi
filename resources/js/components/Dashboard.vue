<template>
  <v-container pt-3 :px-1="!$vuetify.breakpoint.xs" :px-0="$vuetify.breakpoint.xs">
    <v-layout row wrap justify-space-between>
        <v-flex xs12 :px-3="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <v-layout>
                <v-card width="100%" class="mb-3">
                    <v-card-text class="title font-weight-bold">
                        {{tglTerformatDua}}
                    </v-card-text>
                </v-card> 
            </v-layout>
        </v-flex>
        <v-flex xs12 :px-3="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" mb-3>
            <v-layout row wrap justify-space-between>
                <v-flex xs4>
                    <v-card>
                        <div 
                        :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" 
                        class="font-weight-bold pt-2">
                        <!-- {{ dataDash.ktd?dataDash.ktd }} : '0'}} -->
                        <animated-number :number="dataDash.ktd?dataDash.ktd:0"></animated-number>
                        </div>
                        <div
                        :class="{'caption' : $vuetify.breakpoint.xs}" class="font-weight-bold pb-2 grey--text text--darken-1"
                        >Kunjungan Hari ini</div>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <div 
                        :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" 
                        class="font-weight-bold pt-2">
                        <!-- {{ dataDash.kbtd?dataDash.kbtd }} : '0'}} -->
                        <animated-number :number="dataDash.kbtd?dataDash.kbtd:0"></animated-number>
                        </div>
                        <div
                        :class="{'caption' : $vuetify.breakpoint.xs}" class="font-weight-bold pb-2 grey--text text--darken-1"
                        >Belum dilayani</div>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <div 
                        :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" 
                        class="font-weight-bold pt-2">
                        <!-- {{ dataDash.kstd?dataDash.kstd:'0' }} -->
                        <animated-number :number="dataDash.kstd?dataDash.kstd:0"></animated-number>
                        </div>
                        <div
                        :class="{'caption' : $vuetify.breakpoint.xs}" class="font-weight-bold pb-2 grey--text text--darken-1"
                        >Sudah dilayani</div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md3 :pl-3="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <v-layout column :pr-5="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
                <v-flex pb-2>
                    <v-card>
                        <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                            <!-- {{ dataDash.kel?dataDash.kel:'0' }} -->
                            <animated-number :number="dataDash.kel?dataDash.kel:0"></animated-number>
                        </div>
                        <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                            Keluarga
                        </div>
                    </v-card>
                </v-flex>
                <v-flex py-2>
                    <v-card>
                        <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                            <!-- {{ dataDash.agt?dataDash.agt : '0'}} -->
                            <animated-number :number="dataDash.agt?dataDash.agt:0"></animated-number>
                        </div>
                        <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                            Pasien
                        </div>
                    </v-card>
                </v-flex>
                <v-flex py-2>
                    <v-card>
                        <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                            <!-- {{  dataDash.kunj ? dataDash.kunj : '0' }} -->
                            <animated-number :number="dataDash.kunj ? dataDash.kunj : 0"></animated-number>
                        </div>
                        <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                            Total Kunjungan
                        </div>
                    </v-card>
                </v-flex>
                <v-flex pt-2 :mb-3="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
                    <v-card>
                        <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                            <!-- {{ dataDash.ctoday?dataDash.ctoday  : '0'}} -->
                            <animated-number :number="dataDash.ctoday?dataDash.ctoday:0"></animated-number>
                        </div>
                        <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                            Pasien Baru
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md9 mb-3 :pr-3="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <v-layout column fill-height :pl-2="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
                <v-flex>
                    <v-layout row wrap justify-space-between>
                        <v-flex xs12 md5 :mb-3="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
                            <v-card class="py-3">
                                <chart-usia v-if="loaded" :dataPie="dataDash.pie" id="pie1" style="height:324px"></chart-usia>
                            </v-card> 
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-card style="height:355px">
                                <v-list subheader>
                                        <v-subheader><span class="grey--text text--darken-3">Diagnosa Terbanyak</span></v-subheader>

                                        <v-list-tile
                                            v-for="(item,index) in dataDash.diag"
                                            :key="item.title"
                                            avatar
                                        >
                                            <v-list-tile-avatar>
                                                <v-icon :class="{'amber darken-4': index+1 === 1,
                                                'blue-grey lighten-1' : index+1 ===2,
                                                'brown lighten-1': index+1 === 3,
                                                'green darken-1': index+1 === 4,
                                                 'cyan darken-1': index+1 === 5
                                                }"
                                                class="white--text">mdi-numeric-{{index+1}}</v-icon>
                                            </v-list-tile-avatar>

                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ item.gigis_count > 0 ? item.nama_diagnosa : 'Belum Ada' }}</v-list-tile-title>
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-btn icon ripple>
                                                    {{ item.gigis_count }}
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>                    
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md12 mb-3 :px-3="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-layout justify-center>
                        <v-card width="100%" class="mb-3 px-2">
                            <chart-ka-ha v-if="loaded" :dataKH="dataDash.kh" id="chart2" style="height:358px" ></chart-ka-ha>
                        </v-card> 
                    </v-layout>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                    <v-layout justify-center>
                        <v-card width="100%" class="mb-3 px-2">
                            <chart-ka-pe v-if="loaded" :dataKP="dataDash.kp" id="chart1" style="height:358px"></chart-ka-pe>
                        </v-card>
                    </v-layout> 
                </v-flex>
                <v-flex xs12 class="text-xs-center" v-if="$gate.isDokter()">
                    <v-layout justify-center>
                        <v-card width="100%" class="mb-3 px-2">
                            <chart-duit v-if="loaded" :dataDuit="dataDash.duit" id="chart3" style="height:358px"></chart-duit>
                        </v-card>
                    </v-layout> 
                </v-flex>
            </v-layout>
        </v-flex>

    </v-layout>
    <div v-if="cekDevice">
        <v-btn @click="cetak" color="secondary">
            <v-icon class="mr-2">
                mdi-fullscreen
            </v-icon>
            Fullscreen
        </v-btn>
    </div>
    <div>
        <v-dialog v-model="tampil" fullscreen>
            <v-card>
               <v-card-actions class="indigo darken-2">
                    <v-layout wrap row class="headline white--text ml-2">
                    <v-icon dark medium class="mr-2">mdi-chart-areaspline</v-icon>
                    <div>Laporan Statistik</div>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
                </v-card-actions>
                <v-layout column id="me" pt-3 pb-2>
                    <v-flex px-5 mb-3>
                        <v-layout row wrap justify-space-between>
                            <v-flex xs12 md2>
                                <v-card>
                                    <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                                        {{dataDash.kel ? dataDash.kel : '0'}}
                                    </div>
                                    <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                                        Keluarga
                                    </div>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-card>
                                    <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                                        {{dataDash.agt ? dataDash.agt : '0'}}
                                    </div>
                                    <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                                        Pasien
                                    </div>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-card>
                                    <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                                        {{dataDash.kunj ? dataDash.kunj : '0'}}
                                    </div>
                                    <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                                        Total Kunjungan
                                    </div>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-card>
                                    <div :class="{'display-1' : !$vuetify.breakpoint.xs, 'body-1' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pt-2">
                                        {{dataDash.ctoday ? dataDash.ctoday : '0'}}
                                    </div>
                                    <div :class="{'caption' : $vuetify.breakpoint.xs}" class="text-xs-center font-weight-bold pb-2 grey--text text--darken-1">
                                        Pasien Baru
                                    </div>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex px-5 mb-3>
                        <v-layout row wrap justify-space-between>
                            <v-flex xs12 md5>
                                <v-card class="py-3">
                                    <chart-usia v-if="loaded" :dataPie="dataDash.pie" id="pie1" style="height:324px"></chart-usia>
                                </v-card> 
                            </v-flex>
                            <v-flex xs12 md5>
                                <v-card style="height:355px">
                                    <v-list subheader>
                                        <v-subheader><span class="grey--text text--darken-3">Diagnosa Terbanyak</span></v-subheader>

                                        <v-list-tile
                                            v-for="(item,index) in dataDash.diag"
                                            :key="item.title"
                                            avatar
                                        >
                                            <v-list-tile-avatar>
                                                <v-icon :class="{'amber darken-4': index+1 === 1,
                                                'blue-grey lighten-1' : index+1 ===2,
                                                'brown lighten-1': index+1 === 3,
                                                'green darken-1': index+1 === 4,
                                                 'cyan darken-1': index+1 === 5
                                                }"
                                                class="white--text">mdi-numeric-{{index+1}}</v-icon>
                                            </v-list-tile-avatar>

                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ item.gigis_count > 0 ? item.nama_diagnosa : 'Belum Ada' }}</v-list-tile-title>
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-btn icon ripple>
                                                    {{item.gigis_count}}
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex px-5>
                        <v-card>
                            <div>
                                <div class="mb-3">
                                    <chart-ka-ha v-if="loaded" :dataKH="dataDash.kh" id="chart1" style="height:358px"></chart-ka-ha>
                                </div>
                                <div>
                                    <chart-ka-pe v-if="loaded" :dataKP="dataDash.kp" id="chart2" style="height:358px"></chart-ka-pe>
                                </div>
                                <div v-if="$gate.isDokter()">
                                    <chart-duit v-if="loaded" :dataDuit="dataDash.duit" id="chart3" style="height:358px"></chart-duit>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-card-text class="text-xs-center">
                    <v-btn :loading="loadingBtn" @click="print" color="secondary">
                        <v-icon class="mr-2">
                            mdi-file-pdf-outline
                        </v-icon>
                        Download
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
    <!-- <div>
        <v-btn @click="cek">
            Cek
        </v-btn>
    </div> -->
    <loading-vue :value="val" :message="msg"></loading-vue>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'jspdf/node_modules/html2canvas';
import ChartKaPe from './myChart/ChartKaPe.vue';
import ChartKaHa from './myChart/ChartKaHa.vue';
import ChartDuit from './myChart/ChartDuit.vue';
import ChartUsia from './myChart/ChartUsia.vue';
import imgApotek from './core/img.js';
import LoadingVue from './Loading.vue';
import AnimatedNumber from './core/AnimatedNumber.vue';

import format from 'date-fns/format';
import id from 'date-fns/locale/id';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

    export default {
        components: {
            LoadingVue,ChartKaPe,ChartKaHa,ChartUsia,ChartDuit,AnimatedNumber
        },
        data(){
            return{
                loadingBtn: false,
                val: true,
                msg: 'Loading...',
                today: now,
                loaded: false,
                tampil: false,
                dataDash: {},
                chartPieData: [],
            }
        },
        computed: {
            tglTerformat () {
                return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
            },
            tglTerformatDua () {
                return this.today ? format(this.today, 'dddd, DD MMMM YYYY', {locale: id}) : ''
            },
            cekDevice(){
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                    return false
                }else {
                    return true
                }
            }
        },
        methods: {
            cetak(){
                this.tampil = true
            },
            close(){
                this.tampil = false
            },
            print(){
                // var doc = new jsPDF()

                    // function cloneCanvas(oldCanvas) {

                    //     //create a new canvas
                    //     var newCanvas = document.createElement('canvas');
                    //     var context = newCanvas.getContext('2d');

                    //     //set dimensions
                    //     newCanvas.width = oldCanvas.width;
                    //     newCanvas.height = oldCanvas.height;

                    //     //apply the old canvas to the new one
                    //     context.drawImage(oldCanvas, 0, 0);

                    //     //return the new canvas
                    //     return newCanvas;
                    // }

                    // var ini1 = document.querySelector('#chart1 canvas')
                    // var ini2 = document.querySelector('#chart2 canvas')
                    // var can1 = cloneCanvas(ini1)
                    // var can2 = cloneCanvas(ini2)

                    // document.getElementById("printMe").appendChild(can1);
                    // document.getElementById("printMe").appendChild(can2);
                this.loadingBtn = true;
                html2canvas(document.querySelector('#me')).then((canvas) => {
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

                    var img = canvas.toDataURL('image/png');
                    var doc = new jsPDF();

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

                    doc.addImage(img, 'JPEG', 10, 30, 185, 0 );
                    doc.myText(this.tglTerformat,{align: "center"},0,doc.internal.pageSize.height-10, )
                    var tgl = this.tglTerformat.split(' ').join('_')
                    doc.save('laporan_statistik_'+tgl+'.pdf')
                    this.loadingBtn = false

                });

                    // var img1 = can1.toDataURL('image/png');
                    // var img2 = can2.toDataURL('image/png');
                    // var doc = new jsPDF();
                    // doc.addImage(img1, 'JPEG', 10, 10, 150, 80 );
                    // doc.addImage(img2, 'JPEG', 10, 150, 185, 80 );
                    // doc.save('tampan.pdf')

            },

            cek(){
                axios.get('api/d-dashboard').then((response) => {
                    this.dataDash = response.data
                    console.log(response.data)
                })
            }
        },
        async mounted () {
            this.loaded = false
            try {
                axios.get('api/d-dashboard').then((response) => {
                    this.dataDash = response.data
                    this.loaded = true
                    this.val = false
                }).catch((e)=>{
                    this.val = false
                    this.$router.push('bantuan')
                })
            } catch (e) {
                this.val = false
                this.$router.push('bantuan')
            }
        }
    }
</script>
