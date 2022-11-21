<template>
  <div>
    <v-tabs
    centered
    color="indigo darken-3"
    dark
    icons-and-text
    slider-color="yellow"
    value="PToday"
    >
      
      <v-tab href="#PToday" @click="reset">
        Pembayaran Hari Ini
        <v-icon>mdi-calendar-star</v-icon>
      </v-tab>

      <v-tab href="#HistoryPembayaran" @click="reset">
        History Pembayaran
        <v-icon>mdi-history</v-icon>
      </v-tab>

      <v-tabs-items touchless>
        <v-tab-item
        :value="'PToday'"
        lazy
        >
          <v-card>
            <p-today v-if="ready"></p-today>
          </v-card>
        </v-tab-item>

        <v-tab-item
        :value="'HistoryPembayaran'"
        lazy
        >
          <v-card>
            <history-pembayaran v-if="ready"></history-pembayaran>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import PToday from './payment/PembayaranToday.vue';
  import HistoryPembayaran from './payment/HistoryPembayaran.vue';
  import _ from 'lodash';

  export default {
    components: {
      PToday,
      HistoryPembayaran,
    },
    data () {
      return {
        msg: 'Loading...',
        val: false,
        ready: true
      }
    },
    methods: {
      reset : _.debounce(function () { 
        this.$store.dispatch('fetchYears')
        this.$store.dispatch('fetchKonsul')
      }, 1000),

    },
    created () {
      window.addEventListener('scroll', this.reset);
    },
    destroyed () {
      window.removeEventListener('scroll', this.reset);
    }
  }
</script>