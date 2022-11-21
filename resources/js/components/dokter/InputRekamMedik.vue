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
                <v-btn :small="$vuetify.breakpoint.xs" class="mr-0" color="yellow" light to="/aksi-dokter-gigi">Pasien</v-btn>
                <v-icon :small="$vuetify.breakpoint.xs" class="px-2">chevron_right</v-icon>
                <a v-if="ready" @click="$router.push({ name: 'rekam_medik', params: { id: $route.params.id } })" :class="{'caption': $vuetify.breakpoint.xs}" class="subheading yellow--text text--lighten-1">
                    <b>[ {{$route.params.id}} ] {{soloRM.anggota.nama_pasien}}</b>
                </a>
                <v-spacer></v-spacer>
                <v-btn small color="info" fab @click="openProfile = !openProfile">
                    <v-icon small>
                        mdi-account-question
                    </v-icon>
                </v-btn>
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
                                v-if="ready"
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
                                v-model="td"
                                label="Tekanan Darah"
                                clearable
                                prepend-icon="mdi-heart-pulse"
                                suffix="mmHg"
                                ></v-text-field>

                                <v-text-field
                                v-model="gd"
                                label="Gula Darah"
                                clearable
                                prepend-icon="opacity"
                                suffix="mg/dL"
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
                        <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-camera-outline</v-icon>Foto Gigi</v-card-actions>
                        </template>
                        <v-divider></v-divider>
                        <v-card flat :class="{'px-0' : !$vuetify.breakpoint.xs, 'px-2 grey lighten-5' : $vuetify.breakpoint.xs}">
                            <kamera-gigi @init="initFoto" :photos="photoRM" :onCam="openCamera" @matikan="offCam" @cekGambar="showGambar" v-if="openCamera" :id="$route.params.id"></kamera-gigi>
                            <v-dialog
                            v-model="modalPhoto"
                            width="780px"
                            persistent
                            >
                                <v-card>
                                    <v-card-actions class="indigo darken-2">
                                        <v-layout wrap column class="headline white--text ml-2">
                                            <v-flex xs12>
                                                <v-layout wrap row>
                                                    <v-icon dark medium class="mr-2">mdi-image</v-icon>
                                                    <div><b>[ {{$route.params.id}} ] {{soloRM.anggota.nama_pasien}}</b></div>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-layout wrap row>
                                                    <v-icon dark medium class="mr-2">mdi-calendar-star</v-icon>
                                                    <div>Kunjungan : {{tglTerformat}}</div>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                        <v-spacer></v-spacer>
                                        <v-btn icon dark class="orange darken-2" flat @click="closePhoto"><v-icon>close</v-icon></v-btn>
                                    </v-card-actions>
                                    <v-layout row wrap justify-space-between>
                                        <v-flex xs12 sm12 md4>
                                            <v-container grid-list-sm fluid>
                                                <v-layout row wrap>
                                                    <v-flex xs4 flat d-flex v-for="foto in photoRM" :key="foto.id">
                                                        <v-card flat tile class="d-flex">
                                                            <v-btn flat fab>
                                                                <v-avatar tile size="65">
                                                                    <v-img
                                                                    @click="zoomIn(foto)"
                                                                    :src="'/img/photo_gigi/'+foto.path"
                                                                    aspect-ratio="1"
                                                                    class="grey lighten-2"
                                                                    >
                                                                    </v-img>
                                                                </v-avatar>
                                                            </v-btn>
                                                        </v-card>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-flex>
                                        <v-flex xs12 sm12 md8 style="border-left:1px solid #e1e1e1">
                                            <v-layout column wrap align-center justify-center>
                                                <v-img
                                                :src="zoom !== null ? '/img/photo_gigi/'+zoom : '/img/no_image.png'" 
                                                aspect-ratio="1"
                                                class="grey lighten-2 mt-2 mb-2"
                                                width="380px"
                                                >
                                                </v-img>
                                                <div class="mb-3">
                                                    {{zoomTitle ? zoomTitle : 'No Zoom'}}
                                                </div>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="modalFull" full-width>
                                <v-card>
                                    <v-card-actions class="indigo darken-2">
                                        <v-layout wrap column class="headline white--text ml-2">
                                            <v-flex xs12>
                                                <v-layout wrap row>
                                                    <v-icon dark medium class="mr-2">mdi-image</v-icon>
                                                    <div><b>{{zoomFullTitle}}</b></div>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                        <v-spacer></v-spacer>
                                        <v-btn icon dark class="orange darken-2" flat @click="closeFull"><v-icon>close</v-icon></v-btn>
                                    </v-card-actions>
                                    <v-card-text>
                                        <v-container fluid>
                                            <v-layout>
                                                <v-flex>
                                                    <v-img
                                                    :src="zoomFullPath !== null ? '/img/photo_gigi/'+zoomFullPath : '/img/no_image.png'"
                                                    contain
                                                    >
                                                    </v-img>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-layout :class="{'px-3 grey lighten-5' : !$vuetify.breakpoint.xs}" py-1>
                                <v-flex>
                                    <v-card>
                                        <v-card-actions class="yellow lighten-4 py-3">
                                            <v-spacer></v-spacer>
                                            <v-btn color="secondary" @click="openCamera = !openCamera">
                                                <v-icon class="mr-2">
                                                    mdi-camera
                                                </v-icon>
                                                Input Foto Gigi
                                            </v-btn>
                                             <!-- <v-btn @click="modalPhoto = !modalPhoto">tes</v-btn> -->
                                        </v-card-actions>
                                        <v-card-text> 
                                            <v-data-table
                                            :headers="headers"
                                            :items="photoRM"
                                            item-key="id"
                                            :loading="loadingTB"
                                            class="elevation-1"
                                            disable-initial-sort
                                            >
                                                <template v-slot:items="props">
                                                    <tr>
                                                        <td class="text-xs-center caption">
                                                        {{props.index+1}}
                                                        </td>
                                                        <td class="text-xs-left text-no-wrap"> 
                                                        {{ props.item.nama_photo }}
                                                        </td>
                                                        <td class="text-xs-left text-no-wrap"> 
                                                            <v-img
                                                            @click="openFull(props.item)"
                                                            contain
                                                            :src="'/img/photo_gigi/'+props.item.path"
                                                            aspect-ratio="1"
                                                            width="180px"
                                                            class="img-gigi"
                                                            ></v-img>
                                                        </td>
                                                        <td class="text-xs-center px-0">
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
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>

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
                            <rx-dg :solo="soloRM" @siap="doSiap"></rx-dg>
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
        <div>
            <loading-vue :value="val" :message="msg"></loading-vue>
            <profile-pasien :dataProfile="soloRM.anggota" :showProfile="openProfile" @unShow="offProfile"></profile-pasien>
        </div>
    </div>
</template>

<script>
    import KameraGigi from './komponen/KameraGigi.vue';
    import ResepObat from './komponen/ResepObat.vue';
    import RxDg from './komponen/PemeriksaanDiagnosa.vue';
    import LoadingVue from '../Loading.vue';
    import ProfilePasien from './../core/ProfilePasien.vue';

    import format from 'date-fns/format';
    import id from 'date-fns/locale/id';

    import { mapState, mapActions, mapMutations } from 'vuex';

    const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
    const a = h.split('/');
    const now = a[2]+'-'+a[0]+'-'+a[1];

    export default {
        name: 'InputRekamMedik',
        components: {
            KameraGigi,RxDg,ResepObat,LoadingVue,
            ProfilePasien
        },
        data: () => ({
            val: true,
            msg: 'Loading...',
            ready: false,
            today: now,
            openCamera: false,
            openProfile: false,
            modalPhoto: false,
            modalFull: false,
            loading1: false,
            loading2: false,
            loadingTB: false,
            loadingBtn: false,
            panel: [true,false,false,false,false],
            zoom: null,
            zoomTitle: '',
            zoomFullPath: null,
            zoomFullTitle: '',
            rules: {
                required: value => !!value || 'Required.',
            },
            keluh : '',
            vital: {
                data : []
            },
            headers: [
                { text: '#', align: 'left', sortable: false, width: '1%' },
                { text: 'Nama Foto', align: 'left', sortable: true, value: 'nama_photo',width: '50%' },
                { text: 'Foto', align: 'left', sortable: true, value: 'path' },
                { text: 'Aksi', value: 'name', sortable: false, align: 'center', width: '1%' }
            ],
        }),

        computed: {
            ...mapState([
                'soloRM',
                'photoRM',
                'loadingx'
            ]),
            keluhan : {
                get(){
                    return this.soloRM.keluhan
                },
                set(kel){
                    this.keluh = kel
                }
            },
            td : {
                get(){
                    let temu = this.soloRM.vitals
                    let tm = ''
                    if(temu){
                        tm = temu.find(f => f.nama_vital === "Tekanan Darah")
                    }
                    return tm ? tm.pivot.hasil : ''
                },
                set(newVal){
                    let temu = this.soloRM.vitals.find(f => f.nama_vital === "Tekanan Darah")
                    if(temu){
                        this.vital.data[0] = {
                            id : temu.id,
                            nama_vital : temu.nama_vital,
                            hasil: newVal
                        }
                    }
                }
            },
            gd : {
                get(){
                    let temu = this.soloRM.vitals
                    let tm = ''
                    if(temu){
                        tm = temu.find(f => f.nama_vital === "Gula Darah")
                    }
                    return tm ? tm.pivot.hasil : ''
                },
                set(newVal){
                    let temu = this.soloRM.vitals.find(f => f.nama_vital === "Gula Darah")
                    if(temu){
                        this.vital.data[1] = {
                            id : temu.id,
                            nama_vital : temu.nama_vital,
                            hasil: newVal
                        }
                    }
                }    
            },
            tglTerformat () {
                return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
            }
        },
        methods: {
            doSiap(e){
                this.panel[0] = e
                console.log(e)
                console.log(this.panel[0])
            },
            initialize(){
                this.$store.dispatch('fetchPhotoRM', {
                    no_rm: this.$route.params.id
                })
            },
            offCam(e){
                this.openCamera = e
            },
            offProfile(e){
                this.openProfile = e
            },
            showGambar(e){
                this.modalPhoto = e
            },
            initFoto(){
                this.initialize()
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
                if(this.vital.data.length > 0){
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
                }
                setTimeout(() => (this.loading2 = false), 2000)
            },
            closePhoto(){
                this.modalPhoto = false
                setTimeout(()=>{
                    this.zoomTitle = ''
                    this.zoom = null
                }, 500)
            },
            closeFull(){
                this.modalFull = false
                setTimeout(()=>{
                    this.zoomFullTitle = ''
                    this.zoomFullPath = null
                }, 500)
            },
            zoomIn(e){
                this.zoom = e.path
                this.zoomTitle = e.nama_photo
            },
            openFull(e){
                this.modalFull = true
                this.zoomFullPath = e.path
                this.zoomFullTitle = e.nama_photo                
            },
            deleteItem (item) {
                this.loadingTB = true
                this.loadingBtn = true
                swal.fire({
                title: 'Anda yakin?',
                html: 'Hapus Foto <span class="red--text font-weight-bold">'+item.nama_photo+'</span> ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, hapus!'
                }).then((response) => {
                    if (response.value) {
                            this.$Progress.start();
                            axios.delete('/api/hapus-photo/'+item.id).then(()=>{
                            setTimeout(()=>{
                                swal.fire(
                                'Deleted!',
                                'Foto <span class="green--text font-weight-bold">'+item.nama_photo+'</span>  telah terhapus!!.',
                                'success'
                                )
                                this.loadingTB = false
                                this.loadingBtn = false
                                this.initialize()
                                this.$Progress.finish();
                            }, 2000)
                            }).catch(()=> {
                                swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
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
        mounted(){
            this.$store.dispatch('fetchSoloRM', {
                no_rm: this.$route.params.id
            }).then(()=>{
                this.initialize()
                this.val = this.loadingx.val
                this.ready = !this.loadingx.val
            })
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
    .img-gigi{
        cursor: pointer;
    }
</style>