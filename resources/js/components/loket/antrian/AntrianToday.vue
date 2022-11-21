<template>
  <div>
    <v-layout column fill-height>
      <v-toolbar flat color="white">
        <v-layout align-center justify-center row fill-height>
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
                {{tglTerformat}}
            </v-toolbar-title>
        </v-layout>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="antrian"
        item-key="id"
        :expand="expand"
        hide-actions
        :loading="loadingTB"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-center caption">
                  <v-layout class="px-0" align-center warp>
                      <div class="px-0">
                          <v-icon small>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                      </div>
                      <div class="px-0">
                          <v-icon v-if="props.item.status == 'Selesai' && props.item.status_bayar == 'Lunas'" color="green">check_circle</v-icon>
                          <span class="px-2" v-else>{{props.index+1}}</span>
                      </div>
                  </v-layout>
              </td>
              <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">
                {{props.item.anggota.nama_pasien | ucWords}}
              </td>
              <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                {{props.item.anggota.jenis_pasien}}
              </td>
              <td @click.stop="" class="justify-center align-center layout px-0">
                <v-btn  
                color="secondary" 
                icon small 
                :to="'/rekam-medik/'+ props.item.anggota.no_rm">
                  <v-icon small>assignment</v-icon>
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
                  <v-layout wrap column class="pa-1">
                    <v-flex xs12 sm12 md12 lg12>
                      <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Keluhan/Permintaan: <span class="green--text text--darken-3">[ {{props.item.anggota.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.anggota.nama_pasien }}</span></h4>
                      </v-card-title>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-card-text class="py-2">{{props.item.keluhan}}</v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
          <template v-slot:footer>
            <td :class="{'caption': $vuetify.breakpoint.xs}" :colspan="headers.length" class="text-xs-left">
              <span class="font-weight-bold font-italic">*Klik cell untuk melihat keluhan/permintaan dari pasien.</span>
            </td>
          </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    data: () => ({
      expand : false,
      headers: [
        {
          text: 'No/Stat',
          align: 'left',
          sortable: false,
          value: 'no_rm',
          width: '1%'
        },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: false },
        { text: 'Jenis', align: 'left', value: 'anggota.jenis_pasien', sortable: false, width: '1%'},
        { text: 'Aksi', align: 'center', sortable: false, width: '1%' }
      ],
      today: now,
      live: null,
      loadingTB: false
    }),

    computed: {
        ...mapState([
        'antrian'
      ]),
      tglTerformat () {
        return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
      }
    },

    mounted() {
      const hadang = ms => new Promise(resolve => setTimeout(resolve, ms));
      hadang(1000).then(() => {
        this.initialize()
      }).catch(()=>{

      });
    },

    methods: {
      initialize () {
        this.$store.dispatch('fetchAntrian')
      }
    },
    created(){
      this.live = setInterval(()=>{
        this.$store.dispatch('fetchAntrian')
      },5000)
    },
    beforeDestroy(){
      clearInterval(this.live);
    }
  }
</script>