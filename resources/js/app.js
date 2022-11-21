require('./bootstrap');

window.Vue = require('vue');

Vue.config.productionTip = true
Vue.config.devtools = true
Vue.config.debug = true
Vue.config.silent = false

import WebCam from "vue-web-cam";
Vue.use(WebCam);

import Vuetify from 'vuetify';
import Indo from 'vuetify/es5/locale/id';
import VueProgressBar from 'vue-progressbar';
import VueRouter from 'vue-router';
import swal from 'sweetalert2';
import Vuex from 'vuex';
// import StoreData from './store';
import Vuebar from 'vuebar';

import Users from './components/Users.vue';
import NotFound from './components/NotFound.vue';
import Bantuan from './components/Bantuan.vue';
import Dashboard from './components/Dashboard.vue';
import Pembayaran from './components/loket/Pembayaran.vue';
import KunjunganPasien from './components/loket/KunjunganPasien.vue';
import DaftarPasien from './components/loket/DaftarPasien.vue';
import RekamMedik from './components/RekamMedik.vue';
import AksiDokterGigi from './components/dokter/AksiDokterGigi.vue';
import InputRekamMedik from './components/dokter/InputRekamMedik.vue';
import CameraProject from './components/CameraProject.vue';
import KondisiData from './components/manajemen/KondisiData.vue';
import DiagnosaData from './components/manajemen/DiagnosaData.vue';
import TindakanData from './components/manajemen/TindakanData.vue';
import ObatData from './components/manajemen/ObatData.vue';
import CaraMinumData from './components/manajemen/CaraMinum.vue';
import SuratRujukan from './components/surat/SuratRujukan.vue';
import SuratKeterangan from './components/surat/SuratKeterangan.vue';
import LaporanKunjungan from './components/laporan/LaporanKunjungan.vue';
import LaporanDaftarPasien from './components/laporan/LaporanDaftarPasien.vue';
import LaporanRekamMedik from './components/laporan/LaporanRekamMedik.vue';
import LaporanDiagnosaTerbanyak from './components/laporan/LaporanDiagnosaTerbanyak.vue';
import LaporanTindakanTerbanyak from './components/laporan/LaporanTindakanTerbanyak.vue';
import LaporanBiayaPelayanan from './components/laporan/LaporanBiayaPelayanan.vue';
import LaporanPemasukan from './components/laporan/LaporanPemasukan.vue';
import LaporanSuket from './components/laporan/LaporanSuket.vue';
import Pengaturan from './components/Set.vue';
import About from './components/About.vue';

import Person from "../js/Person";

window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000
});

window.toast = toast;

Vue.use(Vuetify, {
    iconfont: 'md' || 'mdi',
    // lang: {
    //     locales: { Indo },
    //     current: 'Indo'
    // }
});

Vue.use(Vuebar);

Vue.use(VueProgressBar, {
    color: 'orange',
    failedColor: 'red',
    thickness: '5px',
});

Vue.use(VueRouter);

Vue.component('home-awal', require('./components/Index.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('konfigurasi-menu', require('./components/KonfigurasiMenu.vue').default);
Vue.component('not-found', require('./components/NotFound.vue').default);

const routes = [
    { title: 'Dashboard', name: 'dashboard', path: '/dashboard', component: Dashboard },
    { title: 'Kunjungan Pasien', name: 'kunjungan_pasien', path: '/kunjungan-pasien', component: KunjunganPasien },
    { title: 'Pembayaran', name: 'pembayaran', path: '/pembayaran', component: Pembayaran },
    { title: 'Daftar Pasien', name: 'daftar_pasien', path: '/pendaftaran-pasien', component: DaftarPasien },
    { title: 'Rekam Medik', name: 'rekam_medik', path: '/rekam-medik/:id', component: RekamMedik },
    //dokter
    { title: 'Aksi Dokter Gigi', name: 'aksi_dokter_gigi', path: '/aksi-dokter-gigi', component: AksiDokterGigi },
    { title: 'Input Rekam Medik', name: 'input_rekam_medik', path: '/input-rekam-medik/:id', component: InputRekamMedik },
    { title: 'Input Photo', name: 'input_photo', path: '/camera', component: CameraProject },
    //admin
    { title: 'Manajemen User', name: 'manajemen user', path: '/manajemen-user', component: Users },
    { title: 'Kondisi Data', name: 'kondisi_data', path: '/kondisi-data', component: KondisiData },
    { title: 'Diagnosa Data', name: 'diagnosa_data', path: '/diagnosa-data', component: DiagnosaData },
    { title: 'Tindakan Data', name: 'tindakan_data', path: '/tindakan-data', component: TindakanData },
    { title: 'Obat Data', name: 'obat_data', path: '/obat-data', component: ObatData },
    { title: 'Cara Minum', name: 'cara_minum_data', path: '/cara-minum-data', component: CaraMinumData },
    //surat
    { title: 'Surat Rujukan', name: 'surat_rujukan', path: '/surat-rujukan', component: SuratRujukan },
    { title: 'Surat Keterangan Dokter', name: 'surat_keterangan', path: '/surat-keterangan', component: SuratKeterangan },
    //lainnya
    { title: 'Not Found', name: 'not_found', path: '*', component: NotFound },
    { title: 'Bantuan', name: 'bantuan', path: '/bantuan', component: Bantuan },
    //laporan
    { title: 'Laporan Kunjungan', name: 'laporan_kunjungan', path: '/laporan-kunjungan', component: LaporanKunjungan },
    { title: 'Laporan Daftar Pasien', name: 'laporan_daftar_pasien', path: '/laporan-daftar-pasien', component: LaporanDaftarPasien },
    { title: 'Laporan Rekam Medik', name: 'laporan_rekam_medik', path: '/laporan-rekam-medik-pasien', component: LaporanRekamMedik },
    { title: 'Laporan Diagnosa Terbanyak', name: 'laporan_diagnosa_terbanyak', path: '/laporan-diagnosa-terbanyak', component: LaporanDiagnosaTerbanyak },
    { title: 'Laporan Tindakan Terbanyak', name: 'laporan_tindakan_terbanyak', path: '/laporan-tindakan-terbanyak', component: LaporanTindakanTerbanyak },
    { title: 'Laporan Biaya Pelayanan', name: 'laporan_biaya_pelayanan', path: '/laporan-biaya-pelayanan', component: LaporanBiayaPelayanan },
    { title: 'Laporan Pemasukan', name: 'laporan_pemasukan', path: '/laporan-pemasukan', component: LaporanPemasukan },
    { title: 'Laporan Suket', name: 'laporan_suket', path: '/laporan-suket', component: LaporanSuket },
    //set
    { title: 'Pengaturan', name: 'pengaturan', path: '/pengaturan', component: Pengaturan },
    //about
    { title: 'About', name: 'about', path: '/about', component: About },
]

Vue.use(Vuex);


const storage = {
    state: {
        support: {
            code: '',
            stat: '',
        },
        loadingx: {
            val: false,
            msg: 'Loading...'
        },
        setItem: [],
        kondisis: [],
        kondisisT: [],
        diags: [],
        tindaks: [],
        tindaksL: [],
        obats: [],
        keluargas: [],
        anggotas: [],
        kunjungans: [],
        antrian: [],
        queDoks: [],
        rekamPasien: {
            pasien: {},
            rekam: []
        },
        soloRM: {
            keluhan: '',
            anggota: {},
            vitals: [{
                pivot: {
                    hasil: ''
                }
            }]
        },
        photoRM: [],
        obatRM: [],
        nginums: [],
        gigis: [],
        bayars: [],
        biayaKonsul: 0,
        years: [],
        sukets: [],
    },
    getters: {
        countItems: state => {
            return state.keluargas.length
        }
    },
    mutations: {
        LOADING_STATUS: (state, load) => {
            state.loadingx.val = load.val
        },
        FILL_SUPPORT: (state, sup) => {
            state.support = sup
        },
        FILL_SET: (state, set) => {
            state.setItem = set
        },
        FILL_TAHUN: (state, years) => {
            state.years = years
        },
        FILL_KELUARGA: (state, keluargas) => {
            state.keluargas = keluargas
        },
        FILL_ANGGOTA: (state, anggotas) => {
            state.anggotas = anggotas
        },
        FILL_KUNJUNGAN: (state, kunjungans) => {
            state.kunjungans = kunjungans
        },
        FILL_ANTRIAN: (state, atr) => {
            state.antrian = atr
        },
        FILL_ANTRIAN_DOKTER: (state, dok) => {
            state.queDoks = dok
        },
        FILL_SOLORM: (state, solo) => {
            state.soloRM = solo
        },
        FILL_PHOTORM: (state, photo) => {
            state.photoRM = photo
        },
        FILL_KONDISI: (state, kon) => {
            state.kondisis = kon
        },
        FILL_KONDISIT: (state, kont) => {
            state.kondisisT = kont
        },
        FILL_TINDAK: (state, tin) => {
            state.tindaks = tin
        },
        FILL_TINDAKL: (state, tinL) => {
            state.tindaksL = tinL
        },
        FILL_DIAGS: (state, dgs) => {
            state.diags = dgs
        },
        FILL_OBATS: (state, obs) => {
            state.obats = obs
        },
        FILL_OBATRM: (state, obsr) => {
            state.obatRM = obsr
        },
        FILL_NGINUMS: (state, mgs) => {
            state.nginums = mgs
        },
        FILL_GIGIS: (state, gg) => {
            state.gigis = gg
        },
        FILL_BAYARS: (state, bayar) => {
            state.bayars = bayar
        },
        FILL_KONSUL: (state, konsul) => {
            state.biayaKonsul = konsul
        },
        FILL_REKAMPASIEN: (state, rp) => {
            state.rekamPasien = rp
        },
        UP_KELUHAN: (state, data) => {
            state.soloRM.keluhan = data.keluhan
        },
        FILL_SUKET: (state, data) => {
            state.sukets = data
        },
    },
    actions: {
        fetchSupport({ commit }) {
            return axios.get('/api/get-support')
                .then(response => commit('FILL_SUPPORT', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchSet({ commit }) {
            return axios.get('/api/get-set')
                .then(response => commit('FILL_SET', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchYears({ commit }) {
            return axios.get('/api/get-tahun')
                .then(response => commit('FILL_TAHUN', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchKondisi({ commit }) {
            return axios.get('/api/kondisi')
                .then(response => commit('FILL_KONDISI', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchKondisiT({ commit }) {
            return axios.get('/api/kondisi-terorder')
                .then(response => commit('FILL_KONDISIT', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchDiags({ commit }) {
            return axios.get('/api/diagnosa')
                .then(response => commit('FILL_DIAGS', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchTindak({ commit }) {
            return axios.get('/api/tindakan')
                .then(response => commit('FILL_TINDAK', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchTindakL({ commit }) {
            return axios.get('/api/tindakan-terorder')
                .then(response => commit('FILL_TINDAKL', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchObats({ commit }) {
            return axios.get('/api/obat')
                .then(response => commit('FILL_OBATS', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchObatRM({ commit }, { no_rm }) {
            return axios.get('/api/obat-rm/' + no_rm)
                .then(response => commit('FILL_OBATRM', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchNginums({ commit }) {
            return axios.get('/api/minum-obat')
                .then(response => commit('FILL_NGINUMS', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchKeluarga({ commit }) {
            return axios.get('/api/keluarga')
                .then(response => commit('FILL_KELUARGA', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchAnggota({ commit }) {
            return axios.get('/api/anggota')
                .then(response => {
                    commit('FILL_ANGGOTA', response.data)
                })
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchKunjungan({ commit }) {
            return axios.get('/api/kunjungan')
                .then(response => commit('FILL_KUNJUNGAN', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchAntrian({ commit }) {
            return axios.get('/api/antrian')
                .then(response => commit('FILL_ANTRIAN', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchAntrianDokter({ commit }) {
            return axios.get('/api/antrian-dokter')
                .then(response => commit('FILL_ANTRIAN_DOKTER', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchSoloRM({ commit }, { no_rm }) {
            commit('LOADING_STATUS', { val: true })
            return axios.get('/api/rekam/' + no_rm)
                .then(response => {
                    commit('FILL_SOLORM', response.data)
                    commit('LOADING_STATUS', { val: false })
                })
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchPhotoRM({ commit }, { no_rm }) {
            return axios.get('/api/photo-rm/' + no_rm)
                .then(response => commit('FILL_PHOTORM', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchUpKeluhan({ commit }, payload) {
            return axios.put('/api/keluhan/' + payload.id, payload)
                .then(response => {
                    if (response.data.no_update) {
                        toast.fire({
                            type: 'warning',
                            title: 'Tidak ada yang diupdate~'
                        })
                    } else {
                        commit('FILL_SOLORM', response.data)
                        toast.fire({
                            type: 'success',
                            title: 'Data Keluhan berhasil diupdate~'
                        })
                    }
                })
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchGigis({ commit }, { no_rm }) {
            return axios.get('/api/gigis/' + no_rm)
                .then(response => commit('FILL_GIGIS', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchRekamPasien({ commit }, { no_rm }) {
            return axios.get('/api/rekam-pasien/' + no_rm)
                .then(response => commit('FILL_REKAMPASIEN', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchBayars({ commit }) {
            return axios.get('/api/bayar')
                .then(response => commit('FILL_BAYARS', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchKonsul({ commit }) {
            return axios.get('/api/biaya-konsul')
                .then(response => commit('FILL_KONSUL', response.data))
                .catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
        fetchSuket({ commit }) {
            commit('LOADING_STATUS', { val: true })
            return axios.get('/api/suket')
                .then(response => {
                    commit('FILL_SUKET', response.data)
                    commit('LOADING_STATUS', { val: false })
                }).catch(() => {
                    swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
                    router.push('bantuan')
                });
        },
    }
};

const store = new Vuex.Store(storage);

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);


Vue.filter('umur', function(age) {
    var x = new Person()

    return x.umur(age)
});

Vue.filter('umurMini', function(age) {
    var x = new Person()

    return x.umurMini(age)
});

Vue.filter('tgLahir', function(age) {
    var x = new Person()

    return x.tglIndo(age)
});

Vue.filter('tgIndo', function(date) {
    var x = new Person()

    return x.tglIndo(date)
});

Vue.filter('gender', function(k) {
    if (k == "L") {
        return "Laki-laki"
    } else {
        return "Perempuan"
    }
});

Vue.filter('duit', function(d) {
    let val = (d / 1).toFixed(2).replace('.', ',')
    return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

Vue.filter('sumTindak', function(gigis) {
    let subTotal = 0
    for (let i = 0; i < gigis.length; i++) {
        for (let j = 0; j < gigis[i].tindaks.length; j++) {
            subTotal += parseInt(gigis[i].tindaks[j].biaya, 10)
        }
    }

    let withKonsul = subTotal

    let val = (withKonsul / 1).toFixed(2).replace('.', ',')
    return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

Vue.filter('withDiskon', function(gigis, konsul, diskon) {
    let subTotal = 0
    for (let i = 0; i < gigis.length; i++) {
        for (let j = 0; j < gigis[i].tindaks.length; j++) {
            subTotal += parseInt(gigis[i].tindaks[j].biaya, 10)
        }
    }

    let withKonDis = subTotal + konsul - diskon

    let val = (withKonDis / 1).toFixed(2).replace('.', ',')
    return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});


Vue.filter('sumTindakanPergigi', function(arr) {
    let sumBT = 0
    for (let i = 0; i < arr.length; i++) {
        sumBT += parseInt(arr[i].biaya, 10)
    }

    let val = (sumBT / 1).toFixed(2).replace('.', ',')
    return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

Vue.filter('formatDiskon', function(gigis, konsul, diskon) {
    let subTotal = 0
    for (let i = 0; i < gigis.length; i++) {
        for (let j = 0; j < gigis[i].tindaks.length; j++) {
            subTotal += parseInt(gigis[i].tindaks[j].biaya, 10)
        }
    }

    let withKon = subTotal + konsul
    let sen = diskon * 100 / withKon
    return sen.toFixed(2)
});

Vue.filter('persenDiskon', function(diskon, biaya, konsul) {

    let sen = diskon * 100 / (parseInt(biaya) + parseInt(konsul))
    if (!isNaN(sen)) {
        return sen.toFixed(2)
    } else {
        return 0
    }

});

Vue.filter('totalHistory', function(history) {
    let totHis = 0
    for (let i = 0; i < history.length; i++) {
        totHis += history[i].bayar.biaya * 1 + history[i].bayar.biaya_konsul * 1 - history[i].bayar.diskon * 1
    }
    let val = (totHis / 1).toFixed(2).replace('.', ',')
    return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

Vue.filter('reverse', function(value) {
    // slice to make a copy of array, then reverse the copy
    return value.slice().reverse();
});

Vue.filter('ucWords', function(str) {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    return str;
});

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    linkActiveClass: 'active',
})

const app = new Vue({
    el: '#app',
    router,
    store
});