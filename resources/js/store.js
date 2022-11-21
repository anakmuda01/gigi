export default {
  state: {
    kondisis: [],
    kondisisT: [],
    diags: [],
    tindaks: [],
    tindaksL: [],
    obats:[],
    keluargas : [],
    anggotas : [],
    kunjungans : [],
    antrian : [],
    queDoks: [],
    soloRM: {
      keluhan : '',
      anggota : {},
      vitals : [
        {
          pivot: {
            hasil : ''
          }
        }
      ]
    },
    gigis: []
  },
  getters: {
    countItems : state => {
      return state.keluargas.length
    }
  },
  mutations: {
    FILL_KELUARGA: (state, keluargas) => {
      state.keluargas = keluargas
    },
    FILL_ANGGOTA: (state, anggotas) => {
      state.anggotas = anggotas
    },
    FILL_KUNJUNGAN: (state, kunjungans) => {
      state.kunjungans = kunjungans
    },
    FILL_ANTRIAN:(state, atr) => {
      state.antrian = atr
    },
    FILL_ANTRIAN_DOKTER:(state, dok) => {
      state.queDoks = dok
    },
    FILL_SOLORM: (state, solo) => {
      state.soloRM = solo
    },
    FILL_KONDISI: (state, kon) => {
      state.kondisis = kon
    },
    FILL_KONDISIT: (state, kont) => {
      state.kondisisT = kont
    },
    FILL_TINDAK: (state, tin) => {
      state.tindaks= tin
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
    FILL_GIGIS: (state, gg) => {
      state.gigis = gg
    },
    UP_KELUHAN: (state, data) => {
      state.soloRM.keluhan = data.keluhan
    },
  },
  actions: {
    fetchKondisi({ commit }) {
      return axios.get('/api/kondisi')
      .then(response => commit('FILL_KONDISI', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchKondisiT({ commit }) {
      return axios.get('/api/kondisi-terorder')
      .then(response => commit('FILL_KONDISIT', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchDiags({ commit }) {
      return axios.get('/api/diagnosa')
      .then(response => commit('FILL_DIAGS', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchTindak({ commit }) {
      return axios.get('/api/tindakan')
      .then(response => commit('FILL_TINDAK', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchTindakL({ commit }) {
      return axios.get('/api/tindakan-terorder')
      .then(response => commit('FILL_TINDAKL', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchObats({ commit }) {
      return axios.get('/api/obat')
      .then(response => commit('FILL_OBATS', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchKeluarga({ commit }) {
      return axios.get('/api/keluarga')
      .then(response => commit('FILL_KELUARGA', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchAnggota({ commit }) {
      return axios.get('/api/anggota')
      .then(response => commit('FILL_ANGGOTA', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchKunjungan({ commit }) {
      return axios.get('/api/kunjungan')
      .then(response => commit('FILL_KUNJUNGAN', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchAntrian({ commit }) {
      return axios.get('/api/antrian')
      .then(response => commit('FILL_ANTRIAN', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
        router.push('dashboard')
      });
    },
    fetchAntrianDokter({ commit }) {
      return axios.get('/api/antrian-dokter')
      .then(response => commit('FILL_ANTRIAN_DOKTER', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchSoloRM({ commit }, {no_rm}) {
      return axios.get('/api/rekam/'+no_rm)
      .then(response => commit('FILL_SOLORM', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchUpKeluhan({ commit }, payload) {
      return axios.put('/api/keluhan/'+payload.id, payload)
      .then(response => {
        if(response.data.no_update){
          toast.fire({
            type: 'warning',
            title: 'Tidak ada yang diupdate~'
          })
        }else{
          commit('FILL_SOLORM', response.data)
          toast.fire({
            type: 'success',
            title: 'Data Keluhan berhasil diupdate~'
          })
        }
      })
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
    fetchGigis({ commit }, {no_rm}) {
      return axios.get('/api/gigis/'+no_rm)
      .then(response => commit('FILL_GIGIS', response.data))
      .catch(() => {
        swal.fire("Gagal!", "Gagal menampilkan data terbaru, Silahkan Refresh/F5 browser anda !", "warning");
      });
    },
  }
};