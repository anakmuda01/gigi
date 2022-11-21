<template>
  <v-tabs
    centered
    color="indigo darken-3"
    dark
    icons-and-text
    value="perpasien"
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab href="#profile" @click="reset">
      Profile
      <v-icon>supervised_user_circle</v-icon>
    </v-tab>

    <v-tab href="#inkjet" @click="reset">
      Printer A4
      <v-icon>account_circle</v-icon>
    </v-tab>

    <v-tab href="#pos" @click="reset">
      Printer POS-58
      <v-icon>account_circle</v-icon>
    </v-tab>

    <v-tabs-items touchless>
      <v-tab-item
      :value="'profile'"
      lazy
      >
        <transition name="slide-fade">
            <profile></profile>
        </transition>
      </v-tab-item>

      <v-tab-item
      :value="'inkjet'"
      lazy
      >
        <v-card>
          <transition name="slide-fade">
            <inkjet></inkjet>
          </transition>
        </v-card>
      </v-tab-item>

    <v-tab-item
      :value="'pos'"
      lazy
      >
        <v-card>
          <transition name="slide-fade">
            <pos></pos>
          </transition>
        </v-card>
      </v-tab-item>

    </v-tabs-items>
  </v-tabs>
</template>

<script>
    import Profile from './pengaturan/Profile.vue';
    import Inkjet from './pengaturan/Inkjet.vue';
    import Pos from './pengaturan/Pos.vue';

    export default {
        components: {
            Profile, Inkjet, Pos
        },
        methods: {
            reset(){

            }
        }
    }
</script>