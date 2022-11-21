<template>
<div>
  <v-tabs
    color="indigo darken-3"
    dark
    icons-and-text
    value="antrian_today"
    fixed-tabs
    centered
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab href="#antrian_today" @click="reset">
      Antrian Hari Ini
      <v-icon>supervised_user_circle</v-icon>
    </v-tab>

    <v-tab href="#daftar_kunjungan" @click="reset">
      Daftar Kunjungan
      <v-icon>account_circle</v-icon>
    </v-tab>

    <v-tabs-items touchless>
      <v-tab-item
      :value="'antrian_today'"
      lazy
      >
        <v-card
        >
          <antrian-today></antrian-today>
        </v-card>
      </v-tab-item>

      <v-tab-item
      :value="'daftar_kunjungan'"
      lazy
      >
        <v-card>
          <daftar-kunjungan></daftar-kunjungan>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-tabs>
</div>
</template>

<script>
  import AntrianToday from './antrian/AntrianToday.vue';
  import DaftarKunjungan from './antrian/DaftarKunjungan.vue';
  import _ from 'lodash';

  export default {
    components: {
      AntrianToday,
      DaftarKunjungan
    },
    data () {
      return {
        msg: 'Loading...',
        val: false,
        ready: true,
      }
    },

    methods: {
      reset : _.debounce(function () { 
        this.$store.dispatch('fetchAnggota')
        this.$store.dispatch('fetchKunjungan')
        this.$store.dispatch('fetchAntrian')
      }, 3000),
    },

    // created () {
    //   window.addEventListener('scroll', this.reset);
    // },
    // destroyed () {
    //   window.removeEventListener('scroll', this.reset);
    // }
  }
</script>