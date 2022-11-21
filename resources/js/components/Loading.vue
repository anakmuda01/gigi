<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="32" :width="4" :color="progressColor"></v-progress-circular>
          <!-- <h3 class="mt-2" v-if="message != null">{{message}}</h3> -->
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name: "Loading",
        data: function () {
            return {
            }
        },
        props: {
            value: {type: Boolean, default: false},
            message: {type: String, default: null},
            progressColor: {type: String, default: 'blue darken-3'},
        },
    }
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog
 {
    /* background: #282c2dad; */
    background: #ffffffb0;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>