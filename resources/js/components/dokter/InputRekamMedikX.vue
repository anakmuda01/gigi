<template>
    <div class="pa-0">
        <div v-if="soloRM">
            <v-toolbar card color="indigo darken-3" dark>
                <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Input Rekam Medik Pasien</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">{{tglTerformat}}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-toolbar flat color="indigo darken-3" dark>
                <v-btn :small="$vuetify.breakpoint.xs" class="mr-0" color="yellow" light to="/aksi_dokter_gigi">Pasien</v-btn>
                <v-icon :small="$vuetify.breakpoint.xs" class="px-2">chevron_right</v-icon>
                <a @click="$router.push({ name: 'rekam_medik', params: { id: $route.params.id } })" :class="{'caption': $vuetify.breakpoint.xs}" class="subheading yellow--text text--lighten-1">
                    <b>[ {{$route.params.id}} ] {{soloRM.anggota.nama_pasien}}</b>
                </a>
            </v-toolbar>
            <v-card flat>
                <v-expansion-panel
                v-model="panel"
                expand
                >
                    <v-expansion-panel-content
                        expand-icon="arrow_drop_down"
                    >
                        <template v-slot:header>
                        <v-card-actions class="pa-0"><v-icon class="mr-2">record_voice_over</v-icon>Keluhan / Permintaan</v-card-actions>
                        </template>
                        <v-divider></v-divider>
                        <v-card flat class="px-4 py-2 grey lighten-5">

                            <v-form ref="form1" class="mb-3">
                                <v-textarea
                                v-model="keluhan"
                                maxlength="80"
                                counter
                                clearable
                                rows="1"
                                auto-grow
                                :rules=[rules.required]
                                ></v-textarea>
                            </v-form>

                            <v-btn class="mx-0"
                            :loading="loading1"
                            :disabled="loading1"
                            color="primary"
                            @click="UpKeluhan"
                            >
                                <v-icon class="mr-2">save</v-icon>
                                SIMPAN
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>

                        </v-card>

                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        expand-icon="arrow_drop_down"
                    >
                        <template v-slot:header>
                        <v-card-actions class="pa-0"><v-icon class="mr-2">accessibility_new</v-icon>Vital Sign</v-card-actions>
                        </template>
                        <v-divider></v-divider>
                        <v-card flat class="px-4 py-2 grey lighten-5">
                            <v-form ref="form2" class="mb-3">

                                <v-text-field
                                label="Tekanan Darah"
                                clearable
                                prepend-icon="mdi-heart-pulse"
                                suffix="mmHg"
                                :rules=[rules.required]
                                ></v-text-field>

                                <v-text-field
                                label="Gula Darah"
                                clearable
                                prepend-icon="opacity"
                                suffix="mg/dL"
                                :rules=[rules.required]
                                ></v-text-field>

                            </v-form>
                            <v-btn class="mx-0"
                            :loading="loading2"
                            :disabled="loading2"
                            color="primary"
                            @click="UpVitals"
                            >
                                <v-icon class="mr-2">save</v-icon>
                                SIMPAN
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        expand-icon="arrow_drop_down"
                    >
                        <template v-slot:header>
                        <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-stethoscope</v-icon>Pemeriksaan, Diagnosa dan Tindakan</v-card-actions>
                        </template>
                        <v-divider></v-divider>
                        <v-card flat :class="{'px-0' : !$vuetify.breakpoint.xs, 'px-2 grey lighten-5' : $vuetify.breakpoint.xs}">
                            <rx-dg :id="soloRM.id"></rx-dg>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        expand-icon="arrow_drop_down"
                    >
                        <template v-slot:header>
                        <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-camera-outline</v-icon>Foto Gigi</v-card-actions>
                        </template>
                        <v-divider></v-divider>
                        <v-card flat :class="{'px-0' : !$vuetify.breakpoint.xs, 'px-2 grey lighten-5' : $vuetify.breakpoint.xs}">
                            <v-btn @click="openCamera = !openCamera">Input Foto Gigi</v-btn>
                            <kamera-gigi :onCam="openCamera" @matikan="offCam" v-if="openCamera" :id="$route.params.id"></kamera-gigi>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        expand-icon="arrow_drop_down"
                    >
                        <template v-slot:header>
                        <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-note-text</v-icon>Resep Obat</v-card-actions>
                        </template>
                        <v-card flat :class="{'px-0' : !$vuetify.breakpoint.xs, 'px-2 grey lighten-5' : $vuetify.breakpoint.xs}">
                            <resep-obat :id="$route.params.id"></resep-obat>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </div>
        <v-card flat v-else class="pa-0 ma-0">
            <not-found></not-found>
        </v-card>
    </div>
</template>

<script>
    import KameraGigi from './komponen/KameraGigi.vue';
    import ResepObat from './komponen/ResepObat.vue';
    import RxDg from './komponen/PemeriksaanDiagnosa.vue';

    import format from 'date-fns/format';
    import id from 'date-fns/locale/id';

    import { mapState, mapActions, mapMutations } from 'vuex';

    const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
    const a = h.split('/');
    const now = a[2]+'-'+a[0]+'-'+a[1];

    export default {
        name: 'InputRekamMedik',
        components: {
            KameraGigi,RxDg,ResepObat
        },
        data: () => ({
            today: now,
            openCamera: false,
            loading1: false,
            loading2: false,
            panel: [false,false,false,false,false],
            rules: {
                required: value => !!value || 'Required.',
            },
            keluh : '',
            vital: {
                data : []
            },
        }),

        computed: {
            ...mapState([
                'soloRM',
            ]),
            keluhan : {
                get(){
                    return this.soloRM.keluhan
                },
                set(kel){
                    this.keluh = kel
                }
            },
            tglTerformat () {
                return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
            }
        },
        methods: {
            initialize(){
                this.$store.dispatch('fetchSoloRM', {
                    no_rm: this.$route.params.id
                })
            },
            offCam(e){
                this.openCamera = e
            },
            UpKeluhan(){
                this.loading1 = true
                if(this.$refs.form1.validate()){
                    this.$store.dispatch('fetchUpKeluhan', {
                        id: this.soloRM.id,
                        kel: this.keluh
                    }).then(() => {
                        setTimeout(() => (this.loading1 = false), 1000)
                    })
                }else if(!this.keluh){
                    toast.fire({
                        type: 'warning',
                        title: 'Tidak ada yang diupdate~'
                    })
                }
                setTimeout(() => (this.loading1 = false), 2000)
            },
            UpVitals(){
                this.loading2 = true
                if(this.$refs.form2.validate() && this.vital.data.length > 0){
                    axios.post('/api/store-vitals/'+this.soloRM.id, this.vital).then( (response) => {
                        toast.fire({
                            type: 'success',
                            title: 'Data Vital Sign berhasil diupdate~'
                        })
                        setTimeout(() => (this.loading2 = false), 1000)
                    }).catch((error) => {
                        toast.fire({
                            type: 'warning',
                            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                        })
                    });
                }else{
                    toast.fire({
                        type: 'warning',
                        title: 'Tidak ada yang diupdate~'
                    })
                    this.gd = 1000                    
                }
                setTimeout(() => (this.loading2 = false), 2000)
            },
        },
        mounted(){
            this.initialize()
        },
    }
</script>

<style>
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
</style>