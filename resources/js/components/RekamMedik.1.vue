<template>
  <div class="pa-0">
    <v-toolbar card color="indigo darken-3" dark>
      <v-btn :small="$vuetify.breakpoint.xs" class="mr-0" color="yellow" light @click="$router.go(-1)">Back</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title :class="{'caption': $vuetify.breakpoint.xs}">[{{$route.params.id}}] {{rekamPasien.pasien.nama_pasien}}</v-toolbar-title>
    </v-toolbar>
    <v-toolbar card>
        <v-text-field
        v-model="cari"
        append-icon="search"
        :label="'Cari Rekam Medik dari '+ $route.params.id + ' ...'"
        single-line
        hide-details
        class="mr-2"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="info" fab @click="openProfile = !openProfile">
            <v-icon small>
                mdi-account-question
            </v-icon>
        </v-btn>
        <v-btn small fab @click="printRM" color="yellow">
          <v-icon small>print</v-icon>
        </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="rekamPasien.rekam"
      item-key="tgl_kunjungan"
      class="elevation-1 pa-0"
      :search="cari"
      disable-initial-sort
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded" :class="props.expanded ? 'grey lighten-4' : ''">
          <td class="text-xs-center px-2 caption">
              <v-layout class="px-0" align-center warp>
                  <div class="px-0">
                      <v-icon small>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  </div>
                  <div class="px-0">
                      <span class="px-2">{{props.index+1}}</span>
                  </div>
              </v-layout>
          </td>
          <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">{{ props.item.tgl_indo }} </td>
          <td @click.stop="" class="justify-center align-center layout px-0">
            <v-icon medium v-if="props.item.status === 'Pending'" color="red">mdi-close-circle</v-icon>
            <v-icon medium v-else color="green">check_circle</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
          <v-layout class="grey lighten-4 text-xs-left" pa-1>
            <v-flex
              xs12
              sm12
              md12
              lg12
            >
            <v-card>
              <v-layout wrap column>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Rekam Medik : <span class="green--text text--darken-3"> {{props.item.tgl_indo}} </span></h4>
                    </v-card-title>
                  </v-flex>
              </v-layout>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>record_voice_over</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex xs11 sm11 md11 lg11 pl-1 style="border-left:1px solid #e1e1e1">
                      <v-layout wrap column>
                        <v-flex>
                          <div class="subheading mb-0 font-weight-bold">
                            Keluhan
                          </div>
                        </v-flex>
                        <v-flex>
                          <div>{{props.item.keluhan}}</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>accessibility_new</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex xs8 sm8 md3 lg3 pl-1 style="border-left:1px solid #e1e1e1">
                      <v-layout wrap column>
                        <v-flex>
                          <div class="subheading mb-0 font-weight-bold">
                            Vital Sign
                          </div>
                        </v-flex>
                        <v-flex>
                          <v-layout wrap row justify-space-between>
                            <v-flex>
                              <div>Tekanan Darah</div>
                              <div>Gula Darah </div>
                            </v-flex>
                            <v-flex>
                              <div :class="{'orange--text' : cekTD(props.index) }">: {{props.item.vitals.find(f => f.nama_vital === "Tekanan Darah").pivot.hasil ? props.item.vitals.find(f => f.nama_vital === "Tekanan Darah").pivot.hasil+' mmHg' : 'Tidak Diisi' }}</div>
                              <div :class="{'orange--text': cekGD(props.index)}">: {{props.item.vitals.find(f => f.nama_vital === "Gula Darah").pivot.hasil ? props.item.vitals.find(f => f.nama_vital === "Gula Darah").pivot.hasil+' mg/dL' : 'Tidak Diisi' }}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>mdi-stethoscope</v-icon>
                      </v-layout>
                    </v-flex>
                    
                    <v-flex xs11 sm11 md11 lg11 pl-1 style="border-left:1px solid #e1e1e1">
                      <v-layout wrap column>
                        <v-flex>
                          <div class="subheading mb-0 font-weight-bold">
                            Pemeriksaan, Diagnosa dan Tindakan
                          </div>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex>
                          <v-layout wrap column v-if="props.item.gigis.length > 0">
                            <template v-for="(val,index) in props.item.gigis">
                              <v-flex v-if="index != props.item.gigis.length-1" :key="index">
                                <v-layout align-center>
                                  <div>
                                    <v-chip text-color="white" color="blue-grey">
                                      <v-avatar>
                                        <v-icon>mdi-tooth</v-icon>
                                      </v-avatar>
                                      {{val.no_gigi}}
                                    </v-chip>
                                  </div>
                                  <div style="border-left:1px solid #e1e1e1" class="pl-1">
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="orange darken-3" text-color="white">
                                            <v-avatar color="orange lighten-1">
                                              <v-icon>flag</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Kondisi</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.kondisis.filter( f => f.pivot.value > 0).length > 0">
                                              <template v-for="(k,ik) in val.kondisis.filter( f => f.pivot.value > 0)">
                                                <span class="font-weight-bold secondary--text" v-if="ik != val.kondisis.filter( f => f.pivot.value > 0).length-1" :key="ik">
                                                  {{k.nama_kondisi+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="ik">
                                                  {{k.nama_kondisi+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="green--text text--darken-2 font-weight-bold">Tidak ada kondisi yang positif</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>
                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="cyan darken-2" text-color="white">
                                            <v-avatar color="cyan darken-4">
                                              <v-icon>mdi-prescription</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Diagnosa</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.diags.length > 0">
                                              <template v-for="(d,ig) in val.diags">
                                                <span class="font-weight-bold secondary--text" v-if="ig != val.diags.length-1" :key="ig">
                                                  {{d.nama_diagnosa+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="ig">
                                                  {{d.nama_diagnosa+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="red--text">Belum ada data</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>
                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="deep-purple lighten-2" text-color="white">
                                            <v-avatar color="deep-purple darken-4">
                                              <v-icon>mdi-needle</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Tindakan</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.tindaks.length > 0">
                                              <template v-for="(t,it) in val.tindaks">
                                                <span class="font-weight-bold secondary--text" v-if="it != val.tindaks.length-1" :key="it">
                                                  {{t.nama_tindakan+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="it">
                                                  {{t.nama_tindakan+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="red--text">Belum ada data</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>

                                  </div>
                                </v-layout> 
                                <v-divider></v-divider>                       
                              </v-flex>
                              <v-flex v-else :key="index">
                                <v-layout align-center>
                                  <div>
                                    <v-chip text-color="white" color="blue-grey">
                                      <v-avatar>
                                        <v-icon>mdi-tooth</v-icon>
                                      </v-avatar>
                                      {{val.no_gigi}}
                                    </v-chip>
                                  </div>
                                  <div style="border-left:1px solid #e1e1e1" class="pl-1">
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="orange darken-3" text-color="white">
                                            <v-avatar color="orange lighten-1">
                                              <v-icon>flag</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Kondisi</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.kondisis.filter( f => f.pivot.value > 0).length > 0">
                                              <template v-for="(k,ik) in val.kondisis.filter( f => f.pivot.value > 0)">
                                                <span class="font-weight-bold secondary--text" v-if="ik != val.kondisis.filter( f => f.pivot.value > 0).length-1" :key="ik">
                                                  {{k.nama_kondisi+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="ik">
                                                  {{k.nama_kondisi+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="green--text text--darken-2 font-weight-bold">Tidak ada kondisi yang positif</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>
                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="cyan darken-2" text-color="white">
                                            <v-avatar color="cyan darken-4">
                                              <v-icon>mdi-prescription</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Diagnosa</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.diags.length > 0">
                                              <template v-for="(d,ig) in val.diags">
                                                <span class="font-weight-bold secondary--text" v-if="ig != val.diags.length-1" :key="ig">
                                                  {{d.nama_diagnosa+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="ig">
                                                  {{d.nama_diagnosa+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="red--text">Belum ada data</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>
                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="deep-purple lighten-2" text-color="white">
                                            <v-avatar color="deep-purple darken-4">
                                              <v-icon>mdi-needle</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Tindakan</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.tindaks.length > 0">
                                              <template v-for="(t,it) in val.tindaks">
                                                <span class="font-weight-bold secondary--text" v-if="it != val.tindaks.length-1" :key="it">
                                                  {{t.nama_tindakan+','}}
                                                </span>
                                                <span class="font-weight-bold secondary--text" v-else :key="it">
                                                  {{t.nama_tindakan+'.'}}
                                                </span>
                                              </template>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="red--text">Belum ada data</span>
                                            </div>
                                          </v-layout>
                                        </div>
                                      </v-layout>
                                    </div>

                                  </div>
                                </v-layout> 
                    
                              </v-flex>
                            </template>
                          </v-layout>
                          <v-layout v-else>
                            <div class="red--text">Belum ada data</div>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>mdi-camera-outline</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex xs11 sm11 md11 lg11 style="border-left:1px solid #e1e1e1">
                      <v-container grid-list-xs pt-2 pb-0 px-2 v-if="props.item.photos.length > 0">
                        <v-layout row wrap>
                          <template v-for="foto in props.item.photos">
                            <v-flex :key="foto.id" xs2 mb-2>
                                  <v-img
                                  :src="'/img/photo_gigi/'+foto.path"
                                  aspect-ratio="1"
                                  class="grey lighten-2 img-gigi"
                                  :width="$vuetify.breakpoint.xs ? '50px' : '100px'"
                                  @click="openFull(foto)"
                                  >
                                  </v-img>
                            </v-flex>
                          </template>
                        </v-layout>
                      </v-container>
                      <v-layout v-else>
                        <v-flex pl-1>
                          <div class="subheading mb-0 font-weight-bold">
                            Foto Gigi
                          </div>
                          <div>
                            <div class="orange--text">Tidak ada Foto</div>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>mdi-note-text</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex xs11 sm11 md11 lg11 pl-1 style="border-left:1px solid #e1e1e1">
                      <v-layout column>
                        <v-flex>
                          <div class="subheading mb-0 font-weight-bold">
                            Resep Obat
                          </div>
                        </v-flex>
                        <v-flex v-if="props.item.obats.length > 0">
                          <v-layout v-for="obat in props.item.obats" row :key="obat.id" wrap>
                            <v-flex xs6 sm6 md3 lg3>
                              <div>{{obat.nama_obat}}</div>
                            </v-flex>
                            <v-flex xs1 sm1 md1 lg1>
                              <div>: <b>{{obat.pivot.jumlah}}</b></div>
                            </v-flex>
                            <v-flex xs1 sm1 md1 lg1> 
                              <div>{{obat.satuan}},</div>
                            </v-flex>
                            <v-flex>
                              <div><span class="orange--text font-italic">Dosis</span> : {{obat.pivot.cara_minum}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex v-else>
                          <div class="orange--text">Tidak ada Resep Obat</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-table>
    <div>
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
                              :src="'/img/photo_gigi/'+zoomFullPath"
                              contain
                              >
                              </v-img>
                          </v-flex>
                      </v-layout>
                  </v-container>
              </v-card-text>
          </v-card>
      </v-dialog>
    </div>
    <div>
      <v-dialog v-model="modalPrint" fullscreen>
        <v-card height="100%"> 
            <v-card-actions class="indigo darken-2">
                <v-layout wrap column class="headline white--text ml-2">
                    <v-flex xs12>
                        <v-layout wrap row>
                            <v-icon dark medium class="mr-2">print</v-icon>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon dark class="orange darken-2" flat @click="closePrintBiaya"><v-icon>close</v-icon></v-btn>
            </v-card-actions>

            <embed v-if="readyPDF" :src="sumberPDF" width="100%" height="91%" type="application/pdf">

            <v-card-text v-else height="100%">
              <span class="font-weight-bold red--text" v-if="errorPDF">Gagal Menampilkan Halaman Print :(</span>         
              <v-progress-circular
                v-else
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <profile-pasien :dataProfile="rekamPasien.pasien" :showProfile="openProfile" @unShow="offProfile"></profile-pasien>
    </div>
  </div>  
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import Person from "../Person.js";
import imgApotek from './core/img.js';
import ProfilePasien from './core/ProfilePasien.vue';

const h = new Date();
const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    components: {
      ProfilePasien
    },
    data: () => ({
      openProfile: false,
      cari: '',
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
          width: '1%'
        },
        { text: 'Tgl Kunjungan', value: 'tgl_indo', sortable: false },
        { text: 'Status', align: 'center', value: 'status', sortable: false, width: '1%' }
      ],
      loadingBtn: false,
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      modalFull: false,
      zoomFullPath: 'no_image.png',
      zoomFullTitle: '',
    }),

    computed: {
      ...mapState([
        'rekamPasien'
      ]),
    },

    methods: {

      openFull(e){
          this.modalFull = true
          this.zoomFullPath = e.path
          this.zoomFullTitle = e.nama_photo                
      },

      closeFull(){
          this.modalFull = false
      },

      offProfile(e){
          this.openProfile = e
      },

      cekTD(index){
        let td = this.rekamPasien.rekam[index].vitals.find( f => f.nama_vital === "Tekanan Darah").pivot.hasil
        return td ? false : true
      },
      cekGD(index){
        let gd = this.rekamPasien.rekam[index].vitals.find( f => f.nama_vital === "Gula Darah").pivot.hasil
        return gd ? false : true
      },

      closePrintBiaya(){
        this.modalPrint = false
        this.sumberPDF = null
      },

      printRM(){
        let rek = this.rekamPasien.rekam

        let body = []
          for (let i = 0; i < rek.length; i++) {
            if(rek[i].gigis.length > 0){
              var gigis = []
              for(let j = 0; j < rek[i].gigis.length; j++){
                let diags = []
                var nosa = rek[i].gigis[j].diags

                if(nosa.length > 0){
                  for(let x = 0; x < nosa.length; x++){
                    diags.push(nosa[x].nama_diagnosa)
                  }
                }else{
                  diags.push('Belum dikerjakan')
                }


                let terapis = []
                let daks = rek[i].gigis[j].tindaks

                if(daks.length > 0){
                  for(let p = 0; p < daks.length; p++){
                    terapis.push(daks[p].nama_tindakan)
                  }
                }else{
                  terapis.push('Belum dikerjakan')
                }

                body.push({
                  index: i+1,
                  tgl: rek[i].tgl_indo,
                  ng: rek[i].gigis[j].no_gigi,
                  diag: diags.join(','),
                  terapi: terapis.join(','),
                  jum: rek[i].gigis.length
                })
              }
            }else{
              body.push({
                index: i+1,
                tgl: rek[i].tgl_indo,
                ng: '00',
                diag: 'Belum dikerjakan',
                terapi: 'Belum dikerjakan',
                jum: 1
              })
            }
          }

        for (var i = 0; i < body.length; i++) {
          var row = body[i];
          row['index'] = {rowSpan: row.jum, content: row.index, styles: {halign: 'left'}};
          row['tgl'] = {rowSpan: row.jum, content: body[i].tgl, styles: {halign: 'center'}};
          row['ng'] = {content: row.ng, styles: {halign: 'center'}};
        }
        
        (function(API){
        API.myText = function(txt, options, x, y) {
        options = options ||{};
          if( options.align == "center" ){
              var fontSize = this.internal.getFontSize();
              var pageWidth = this.internal.pageSize.width;
              var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;
              x = ( pageWidth - txtWidth ) / 2;
          }
          this.text(txt,x,y);
          }
        })(jsPDF.API);

        var doc = new jsPDF()

        var son = new Person()

        var totalPagesExp = "{total_pages_count_string}";

        doc.setFontSize(16);
        doc.setFontStyle('bold');
        doc.myText("PRAKTIK DOKTER GIGI MANDIRI",{align: "center"},0,12);
        doc.setFontSize(18);
        doc.addImage(imgApotek, 'JPEG', 10, 5, 20, 25)
        doc.myText("APOTEK SALMA BANJARBARU",{align: "center"},0,18);
        doc.setFontSize(11);
        doc.setFontStyle('normal');
        doc.myText("drg. Agus Dwi Karyanto, MPH",{align: "center"},0,23);
        doc.setFontSize(9);
        doc.setFontStyle('italic');
        doc.myText("Jl. Hercules No.1 Landasan Ulin Telp. 0852 4539 6161",{align: "center"},0,27);
        doc.line(10,28,doc.internal.pageSize.width-10,28);

        doc.setFontStyle('normal');
        doc.text("Nomor RM",11,34);
        doc.text(': '+this.rekamPasien.pasien.no_rm,45,34);
        doc.text("Jenis Kelamin",105,34);
        doc.text(': '+son.kelamin(this.rekamPasien.pasien.jenis_kelamin),145,34);
        doc.text("Nama Pasien",11,39);
        doc.text(': '+this.rekamPasien.pasien.nama_pasien,45,39);
        doc.text("No. Telp/HP",105,39);
        doc.text(': '+this.rekamPasien.pasien.no_hp,145,39);
        var son = new Person()
        doc.text("Umur",11,44);
        doc.text(': '+son.umur(this.rekamPasien.pasien.tanggal_lahir),45,44);
        doc.text("Pekerjaan",105,44);
        doc.text(': '+this.rekamPasien.pasien.pekerjaan,145,44);
        doc.text("Jenis Pasien",11,49);
        doc.text(': '+this.rekamPasien.pasien.jenis_pasien,45,49);
        doc.text("Alamat",11,54);
        doc.text(': '+this.rekamPasien.pasien.alamat,45,54);
      
        doc.autoTable({
            // head: head,
            startY: 57,
            body: body,
            columns: [
              {header: '#', dataKey: 'index' }, 
              {header: 'Tgl Kunj.', dataKey: 'tgl' }, 
              {header: 'Gigi', dataKey: 'ng'},
              {header: 'Diagnosa', dataKey: 'diag'}, 
              {header: 'Terapi/Tindakan', dataKey: 'terapi'}, 
              ],
            theme: 'grid',
            styles: {
              cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left', valign: 'middle'
            },
            headStyles: {halign: 'center', fillColor: [48,63,159]},
            columnStyles: {
              tgl: {cellWidth: 'auto'},
              ng: {minCellWidth: 15, valign: 'top'},
              diag: {CellWidth: 'auto', valign: 'top'},
              terapi: {cellWidth: 'auto'}
            },
            didDrawPage: function (data) {
            // Header
            // doc.setFontSize(20);
            // doc.setTextColor(40);
            // doc.setFontStyle('normal');
            // doc.text("Report", data.settings.margin.left + 15, 22);

            // Footer
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
            },
          margin: {top:5, left:10, right:10}
        });

          if(doc.autoTable.previous.finalY+50 > doc.internal.pageSize.height-10){
            doc.addPage()
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(140,15, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(140,40, 'drg. Agus Dwi Karyanto, MPH')
          }else{
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(140,doc.autoTable.previous.finalY+30, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(140,doc.autoTable.previous.finalY+35, 'TTD')
            doc.text(140,doc.autoTable.previous.finalY+50, 'drg. Agus Dwi Karyanto, MPH')
          }

        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        
        this.readyPDF = false
        this.modalPrint = true
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        this.loadingBtn = true

        wait(1500).then(() => {
          doc.autoPrint();
          var string = doc.output('datauristring');
          this.sumberPDF = string
          this.loadingBtn = false
          this.readyPDF = true
        }).catch(()=>{
          setTimeout(()=>{
            this.errorPDF = true
            this.loadingBtn = false
          },1000)
        });
      },
    },
    mounted(){
      this.$store.dispatch('fetchRekamPasien', {
          no_rm: this.$route.params.id
      })
    }
  }
</script>