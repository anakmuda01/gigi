<template>
    <v-card>
        <v-card-text class="pt-0">
            <canvas id="tesChart"></canvas>
        </v-card-text>
        <div>
            <v-btn @click="print">tes</v-btn>
        </div>
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
                    
                    <!-- <iframe id="pdf_preview" type="application/pdf" :src="sumberPDF" width="100%" height="91%"></iframe> -->
                </v-card>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import LoadingVue from './Loading.vue';
import jsPDF from 'jspdf';
import html2canvas from 'jspdf/node_modules/html2canvas';
import Chart from 'chart.js';
    export default {
        components: {
            LoadingVue
        },
        data(){
            return {
                val: false,
                msg: 'coba coba',
                modalPrint: false,
                sumberPDF: null,
                readyPDF: false,
                errorPDF: false,
                labels: [
                    '12am',
                    '3am',
                    '6am',
                    '9am',
                    '12pm',
                    '3pm',
                    '6pm',
                    '9pm'
                ],
                value: [
                    200,
                    675,
                    410,
                    390,
                    310,
                    460,
                    250,
                    240
                ]
            }
        },
        methods: {
            closePrint(){
                this.modalPrint = false
                this.sumberPDF = null
            },
            print(){
                var doc = new jsPDF()

                html2canvas(document.getElementById('me')).then((canvas) => {
                    var img = canvas.toDataURL('image/png');
                    var doc = new jsPDF();
                    doc.addImage(img, 'JPEG', 0, 1);
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
                });

            }
        },
        mounted(){

        }
    }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>