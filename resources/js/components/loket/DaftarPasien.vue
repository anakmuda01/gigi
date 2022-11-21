<template>
  <v-tabs
    centered
    color="indigo darken-3"
    dark
    icons-and-text
    value="perpasien"
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab href="#perkeluarga" @click="reset">
      Perkeluarga
      <v-icon>supervised_user_circle</v-icon>
    </v-tab>

    <v-tab href="#perpasien" @click="reset">
      Perpasien
      <v-icon>account_circle</v-icon>
    </v-tab>

    <v-tabs-items touchless>
      <v-tab-item
      :value="'perkeluarga'"
      lazy
      >
      <v-card>
          <transition name="slide-fade">
            <perkeluarga v-if="ready"></perkeluarga>
          </transition>
      </v-card>
      </v-tab-item>

      <v-tab-item
      :value="'perpasien'"
      lazy
      >
        <v-card>
          <transition name="slide-fade">
            <perpasien v-if="ready"></perpasien>
          </transition>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  import _ from 'lodash';

  export default {
    components: {
      Perkeluarga : () => import('./daftar/Perkeluarga.vue'),
      Perpasien : () => import('./daftar/Perpasien.vue'),
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
        this.$store.dispatch('fetchKeluarga')
        this.$store.dispatch('fetchAnggota')
      }, 3000),

    },
    created () {
      window.addEventListener('scroll', this.reset);
    },
    destroyed () {
      window.removeEventListener('scroll', this.reset);
    },
  }
</script>