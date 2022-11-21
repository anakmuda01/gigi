<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-card>
                <v-card-text>
                    <v-text-field
                    v-model="barisA"
                    :counter="27"
                    :rules="rules"
                    label="Baris 1"
                    required
                    maxlength="27"
                    ></v-text-field>

                    <v-text-field
                    v-model="barisB"
                    :counter="27"
                    :rules="rules"
                    label="Baris 2"
                    maxlength="27"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="barisC"
                    :counter="27"
                    :rules="rules"
                    label="Baris 3"
                    maxlength="27"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="barisD"
                    :counter="33"
                    :rules="rules"
                    label="Baris 4"
                    maxlength="33"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="barisE"
                    :counter="33"
                    :rules="rules"
                    label="Baris 5"
                    maxlength="33"
                    required
                    ></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-btn class="ml-2"
                    :loading="loadingBtn"
                    :disabled="loadingBtn"
                    color="primary"
                    @click="simpanProfile"
                    >
                        <v-icon class="mr-2">save</v-icon>
                        SIMPAN
                        <template v-slot:loader>
                            <span class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </template>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="loadingBtn" :loading="loadingBtn" @click="PrintMini" color="warning" class="mr-0">
                        <v-icon class="mr-1">
                        print
                        </v-icon>
                        Preview
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-form>  

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

    import jsPDF from 'jspdf';
    import 'jspdf-autotable';
    import format from 'date-fns/format';
    import id from 'date-fns/locale/id';
    import imgApotek from './../core/img.js';
    import myfont from './../core/myfont.js';

    const h = new Date();
    const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
    const now = a[2]+'-'+a[0]+'-'+a[1];

    export default {
        data(){
            return {
                valid : true,
                loadingBtn : false,
                editItem : {
                    barisA : '',
                    barisB : '',
                    barisC : '',
                    barisD : '',
                    barisE : '',

                },
                rules: [
                    v => !!v || 'required',
                    v => (v && v.length >= 3) || 'min 3 karakter'
                ],
                modalPrint: false,
                sumberPDF: null,
                readyPDF: false,
                errorPDF: false,
            }
        },

        computed: {
            ...mapState([
                'setItem',
            ]),
            barisA : {
                get(){
                    this.editItem.barisA = this.setItem.posA
                    return this.setItem.posA
                },
                set(val){
                    this.editItem.barisA = val
                }
            },
            barisB : {
                get(){
                    this.editItem.barisB = this.setItem.posB
                    return this.setItem.posB
                },
                set(val){
                    this.editItem.barisB = val
                }
            },
            barisC : {
                get(){
                    this.editItem.barisC = this.setItem.posC
                    return this.setItem.posC
                },
                set(val){
                    this.editItem.barisC = val
                }
            },
            barisD : {
                get(){
                    this.editItem.barisD = this.setItem.posD
                    return this.setItem.posD
                },
                set(val){
                    this.editItem.barisD = val
                }
            },
            barisE : {
                get(){
                    this.editItem.barisE = this.setItem.posE
                    return this.setItem.posE
                },
                set(val){
                    this.editItem.barisE = val
                }
            },
        },

        methods : {
            initialize () {
                this.$store.dispatch('fetchSet')
            },
            simpanProfile(){
                this.$Progress.start();
                this.loadingBtn = true;
                if (this.$refs.form.validate()){
                    axios.post('api/store-pos', this.editItem).then((response) => {
                        this.initialize()
                        setTimeout(()=>{
                            this.$Progress.finish();
                            toast.fire({
                                type: 'success',
                                title: 'Data POS-58mm berhasil diupdate~'
                            })
                            this.loadingBtn = false
                        },1500)
                    }).catch( (error) => {
                        toast.fire({
                            type: 'warning',
                            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                        })
                        setTimeout(() => {
                            this.$Progress.finish();
                            this.loadingBtn = false
                        }, 2000)
                    })
                }else{
                    setTimeout(() => {
                        this.$Progress.finish();
                        this.loadingBtn = false
                    }, 1500)
                }
            },

            PrintMini(){

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

                doc.setFont('dejavu','normal');
                doc.setFontSize(4.7);
                doc.text(3,56,this.setItem.kota+', '+format(now, 'DD MMMM YYYY', {locale: id}))
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

            },

            ready(){
                this.loadingBtn = false
                this.loadingTB = false
            },

            closePrint(){
                this.modalPrint = false
                this.sumberPDF = null
            },
        },

        mounted() {
            this.$store.dispatch('fetchSet');
        },
    }
</script>