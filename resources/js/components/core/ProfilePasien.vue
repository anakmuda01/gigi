<template>
    <div>
        <v-dialog v-model="showProfile" max-width="500px" persistent :fullscreen="$vuetify.breakpoint.xs">
          <v-card>
            <v-layout column fill-height>
              <v-card-actions class="indigo darken-2">
                  <v-layout wrap row class="headline white--text ml-2">
                    <v-icon dark medium class="mr-2">mdi-account</v-icon>
                    <div :class="{'caption': $vuetify.breakpoint.xs}">[ {{dataProfile.no_rm}} ] {{dataProfile.nama_pasien}}</div>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
              </v-card-actions>
              <v-card-text>
                <v-layout column px-2>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>Umur</v-flex>
                      <v-flex xs8 class="font-weight-bold">: {{dataProfile.tanggal_lahir | umur}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>Jenis Kelamin</v-flex>
                      <v-flex xs8 class="font-weight-bold">: {{dataProfile.jenis_kelamin | gender}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>Jenis Pasien</v-flex>
                      <v-flex xs8 class="font-weight-bold">: {{dataProfile.jenis_pasien}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>No. Telpon</v-flex>
                      <v-flex xs8 class="font-weight-bold">: {{dataProfile.no_hp}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>Pekerjaan</v-flex>
                      <v-flex xs8 class="font-weight-bold">: {{dataProfile.pekerjaan}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout row>
                      <v-flex xs4>Alamat</v-flex>
                      <v-flex xs8 class="font-weight-bold" v-if="dataProfile.alamat && dataProfile.alamat.length > 35">
                        <v-layout>
                          <v-flex>: &nbsp;</v-flex>
                          <v-flex>
                            {{dataProfile.alamat}}
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex class="font-weight-bold" xs8 v-else>
                        : {{dataProfile.alamat}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
      props: ['dataProfile','showProfile'],
      methods: {
        close(){
          this.$emit('unShow', false)
        },
      },
    }
</script>