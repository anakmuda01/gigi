<template>
  <div class="pa-0">
    <v-toolbar card color="indigo darken-3" dark>
      <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Pasien Hari Ini</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">{{tglTerformat}}</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="queDoks"
      item-key="id"
      class="elevation-1 pa-0"
      hide-actions
      disable-initial-sort
      :loading="loadingTB"
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
          <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">{{ props.item.anggota.nama_pasien }} </td>
          <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">{{ props.item.anggota.no_rm }}</td>
          <td @click.stop="" class="justify-center align-center layout px-0">
            <v-btn
              :to="'/input-rekam-medik/'+ props.item.anggota.no_rm "
              small
              icon
              color="primary"
              v-if="props.item.status === 'Pending'"
            >
              <v-icon
              small
              >
                edit
              </v-icon>
            </v-btn>
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
                    <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> RM Hari Ini: <span class="green--text text--darken-3">[ {{props.item.anggota.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.anggota.nama_pasien }}</span></h4>
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
                              <div :class="{'red--text' : cekTD(props.index) }">: {{props.item.vitals.find(f => f.nama_vital === "Tekanan Darah").pivot.hasil ? props.item.vitals.find(f => f.nama_vital === "Tekanan Darah").pivot.hasil+' mmHg' : 'Belum Diisi' }}</div>
                              <div :class="{'red--text': cekGD(props.index)}">: {{props.item.vitals.find(f => f.nama_vital === "Gula Darah").pivot.hasil ? props.item.vitals.find(f => f.nama_vital === "Gula Darah").pivot.hasil+' mg/dL' : 'Belum Diisi' }}</div>
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
                                    <template v-if="val.no_gigi.length > 2">
                                      <div v-for="gi in hancurKan(val.no_gigi)" :key="gi">
                                        <v-chip text-color="white" color="blue-grey">
                                          <v-avatar>
                                            <v-icon>mdi-tooth</v-icon>
                                          </v-avatar>
                                          {{gi}}
                                        </v-chip>
                                      </div>
                                    </template>
                                    <v-chip v-else text-color="white" color="blue-grey">
                                      <v-avatar>
                                        <v-icon>mdi-tooth</v-icon>
                                      </v-avatar>
                                      {{val.no_gigi}}
                                    </v-chip>
                                  </div>
                                  <div style="border-left:1px solid #e1e1e1" :style="[val.no_gigi.length > 5 ? {height: 53*hancurKan(val.no_gigi).length + 'px'} : '']" class="pl-1 layout column justify-center">
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
                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="blue lighten-1" text-color="white">
                                            <v-avatar color="blue darken-5">
                                              <v-icon>mdi-information-outline</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Ket</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.ket">
                                              <span v-if="val.ket.isi_ket !== null" class="font-weight-bold secondary--text">
                                                {{ val.ket.isi_ket }}
                                              </span>
                                              <span v-else class="green--text">Tidak ada keterangan</span>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="green--text">Tidak ada keterangan</span>
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
                                    <template v-if="val.no_gigi.length > 2">
                                      <div v-for="gi in hancurKan(val.no_gigi)" :key="gi">
                                        <v-chip text-color="white" color="blue-grey">
                                          <v-avatar>
                                            <v-icon>mdi-tooth</v-icon>
                                          </v-avatar>
                                          {{gi}}
                                        </v-chip>
                                      </div>
                                    </template>
                                    <v-chip v-else text-color="white" color="blue-grey">
                                      <v-avatar>
                                        <v-icon>mdi-tooth</v-icon>
                                      </v-avatar>
                                      {{val.no_gigi}}
                                    </v-chip>
                                  </div>
                                  <div style="border-left:1px solid #e1e1e1" :style="[val.no_gigi.length > 5 ? {height: 53*hancurKan(val.no_gigi).length + 'px'} : '']" class="pl-1 layout column justify-center">
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

                                    <v-divider v-if="$vuetify.breakpoint.xs"></v-divider>
                                    <div :class="{'pb-2': $vuetify.breakpoint.xs}">
                                      <v-layout :align-center="!$vuetify.breakpoint.xs" :column="$vuetify.breakpoint.xs">
                                        <div>
                                          <v-chip color="blue lighten-1" text-color="white">
                                            <v-avatar color="blue darken-5">
                                              <v-icon>mdi-information-outline</v-icon>
                                            </v-avatar>
                                            <b style="min-width:55px">Ket</b>
                                          </v-chip>
                                        </div>
                                        <div class="pl-1">
                                          <v-layout align-center>
                                            <div v-if="!$vuetify.breakpoint.xs"><b class="mr-1">:</b></div>
                                            <div class="pl-2" v-if="val.ket">
                                              <span v-if="val.ket.isi_ket !== null" class="font-weight-bold secondary--text">
                                                {{ val.ket.isi_ket }}
                                              </span>
                                              <span v-else class="green--text">Tidak ada keterangan</span>
                                            </div>
                                            <div class="pl-2" v-else>
                                              <span class="green--text">Tidak ada keterangan</span>
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
                            <div class="orange--text">Belum ada foto</div>
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
            <v-divider></v-divider>
            <v-card>
              <v-card-title class="px-1 py-1">
                  <v-layout align-center row wrap>
                    <v-flex xs1 sm1 md1 lg1>
                      <v-layout align-center justify-center>
                        <v-icon>mdi-email-search</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex xs11 sm11 md11 lg11 pl-1 style="border-left:1px solid #e1e1e1">
                      <v-layout column>
                        <v-flex>
                          <div class="subheading mb-0 font-weight-bold">
                            Surat Rujukan
                          </div>
                        </v-flex>
                        <v-flex v-if="props.item.sujuk">
                          <v-btn color="primary" @click="unduhCok(props.item)">download .pdf</v-btn>
                        </v-flex>
                        <v-flex v-else>
                          <div class="orange--text">Tidak ada surat rujukan/belum pernah dicetak</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-card>
              <v-card-actions class="py-3 px-3">
                <v-btn :loading="loadingBtn" v-if="props.item.status === 'Pending'" 
                  @click="terlayani(props.item.id)" dark color="success">
                  <v-icon class="mr-2">check_circle</v-icon>Selesai
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                </v-btn>
                <v-btn v-else :loading="loadingBtn"
                  @click="unlock(props.item.id)" dark color="error">
                  <v-icon class="mr-2">mdi-lock-open</v-icon>Buka
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark class="blue-grey" :to="'/rekam-medik/'+ props.item.anggota.no_rm"><v-icon class="mr-2">assignment</v-icon> Rekam Medik</v-btn>
              </v-card-actions>
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
  </div>  
</template>

<script>
const norgi = ['11','12','13','14','15','16','17','18','21','22','23','24','25','26','27','28','31','32','33','34','35','36','37','38','41','42','43','44','45','46','47','48','51','52','53','54','55','61','62','63','64','65','71','72','73','74','75','81','82','83','84','85']
const angka1 = ['1','2','3','4','5','6','7','8'];
const angka2 = ['1','2','3','4','5'];

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Person from "./../../Person.js";
import imgApotek from './../core/img.js';

import { mapState, mapActions, mapMutations } from 'vuex';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    data: () => ({
      loadingTB: false,
      loadingBtn: false,
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '1%'
        },
        { text: 'Nama Pasien', value: 'anggota.nama_pasien', sortable: false },
        { text: 'No RM', value: 'anggota.no_rm', sortable: false, width: '1%'},
        { text: 'Aksi', align: 'center', value: 'name', sortable: false, width: '1%' }
      ],
      today: now,
      modalFull: false,
      zoomFullPath: 'no_image.png',
      zoomFullTitle: '',
      live: null,
      loadingTB: false
    }),

    computed: {
      ...mapState([
        'queDoks',
      ]),
      tglTerformat () {
        return this.today ? format(this.today, 'DD MMMM YYYY', {locale: id}) : ''
      },
    },

    methods: {
      initialize () {
        this.$store.dispatch('fetchAntrianDokter')
      },

      openFull(e){
          this.modalFull = true
          this.zoomFullPath = e.path
          this.zoomFullTitle = e.nama_photo                
      },

      closeFull(){
          this.modalFull = false
      },

      cekTD(index){
        let td = this.queDoks[index].vitals.find( f => f.nama_vital === "Tekanan Darah").pivot.hasil
        return td ? false : true
      },
      cekGD(index){
        let gd = this.queDoks[index].vitals.find( f => f.nama_vital === "Gula Darah").pivot.hasil
        return gd ? false : true
      },

      loading(){
        this.loadingTB = true
        this.loadingBtn = true
      },
      ready(){
        this.loadingTB = false
        this.loadingBtn = false
      },

      terlayani(id){
        this.loading()
        var stat = {'aksi' : 'Selesai'};
        axios.put('api/terlayani/'+id, stat).then((response) => {
          toast.fire({
            type: 'success',
            title: 'Data Aksi Dokter telah diselesaikan~'
          })
          setTimeout(()=>{
            this.initialize()
            this.ready()
          },1000)
        }).catch((error) => {
          toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
          })
          setTimeout(()=>{
            this.ready()
          },1000)
        })
      },

      unlock(id){
        this.loading()
        var stat = {'aksi' : 'Pending'};
        axios.put('api/terlayani/'+id, stat).then((response) => {
          toast.fire({
            type: 'warning',
            title: 'Data Aksi Dokter berhasil dibuka~'
          })
          setTimeout(()=>{
            this.initialize()
            this.ready()
          },1000)
        }).catch((error) => {
          toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
          })
          setTimeout(()=>{
            this.ready()
          },1000)
        })
      },
      unduhCok(item){

        var doc = new jsPDF()
        var totalPagesExp = "{total_pages_count_string}";
        var son = new Person()

        let set = []
        for(let i=0;i<item.gigis.length; i++){
            if(item.gigis[i].rujuk){
                set.push(item.gigis[i].no_gigi.split(','))
            }
        }

        let cok = []
        for(let j=0; j<set.length; j++){
            cok = cok.concat(set[j])
        }

        let nyok = _.uniq(cok)

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

        doc.setFontSize(16);
        doc.setFontStyle('bold');
        doc.myText("SURAT RUJUKAN FOTO DAN PROTESA",{align: "center"},0,36);
        doc.setFontSize(13);
        doc.setFontStyle('normal');
        doc.myText('Nomor : '+item.sujuk.no_rujukan,{align: "center"},0,42);

        doc.text(11,60, 'Dengan Hormat,')
        doc.text(11,73, 'Mohon bantuan untuk pembuatan foto dan protesa :')

        doc.text(11,79, 'Region :')

        var ar = angka1.slice().reverse()

        for(let i=0;i<ar.length;i++){
            doc.text(33.3+i*9.09 ,90, '1'+ar[i])
            if(nyok.includes('1'+ar[i])){
                doc.circle(35.8+i*9.09, 88.5, 4)
            }
        }
        doc.line(104.5,83,104.5,103)
        for(let i=0;i<angka1.length;i++){
            doc.text(108+i*9 ,90, '2'+angka1[i])
            if(nyok.includes('2'+angka1[i])){
                doc.circle(110+i*9.09, 88.5, 4)
            }
        }
        doc.line(30,93.5,180,93.5)
        for(let i=0;i<ar.length;i++){
            doc.text(33.5+i*9.03 ,100, '4'+ar[i])
            if(nyok.includes('4'+ar[i])){
                doc.circle(35.8+i*9.09, 98.5, 4)
            }
        }
        for(let i=0;i<angka1.length;i++){
            doc.text(108+i*9 ,100, '3'+angka1[i])
            if(nyok.includes('3'+angka1[i])){
                doc.circle(110+i*9.09, 98.5, 4)
            }
        }

        var ar2 = angka2.slice().reverse()

        for(let i=0;i<ar2.length;i++){
            doc.text(60.3+i*9.09 ,115, '5'+ar2[i])
            if(nyok.includes('5'+ar2[i])){
                doc.circle(62.8+i*9.1, 113.5, 4)
            }
        }
        doc.line(104.5,108,104.5,128)
        for(let i=0;i<angka2.length;i++){
            doc.text(108+i*9 ,115, '6'+angka2[i])
            if(nyok.includes('6'+angka1[i])){
                doc.circle(110+i*9.1, 113.5, 4)
            }
        }
        doc.line(30,118.5,180,118.5)
        for(let i=0;i<ar2.length;i++){
            doc.text(60.5+i*9.03 ,125, '8'+ar2[i])
            if(nyok.includes('8'+ar2[i])){
                doc.circle(62.8+i*9.1, 123.5, 4)
            }
        }
        for(let i=0;i<angka2.length;i++){
            doc.text(108+i*9 ,125, '7'+angka2[i])
            if(nyok.includes('7'+angka1[i])){
                doc.circle(110+i*9.1, 123.5, 4)
            }
        }

        let rotoy = []
        for(let i=0;i<item.gigis.length; i++){
            if(item.gigis[i].rujuk){
                rotoy.push(item.gigis[i])
            }
        }

        let body = []
        for(let k=0;k<rotoy.length; k++){
            let nogi = rotoy[k].no_gigi
            body.push({
                index : k+1,
                ng : nogi,
                foto : rotoy[k].rujuk.foto,
                protesa : rotoy[k].rujuk.protesa,
                klinis : rotoy[k].rujuk.klinis
            })
        }



        doc.autoTable({
            startY: 138,
            body: body,
            columns: [
                {header: '#', dataKey: 'index' },
                {header: 'No Gigi', dataKey: 'ng' }, 
                {header: 'Foto', dataKey: 'foto'},
                {header: 'Protesa', dataKey: 'protesa'}, 
                {header: 'Ket. Klinis', dataKey: 'klinis'},
            ],
            theme: 'grid',
            styles: {
            cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'left', valign: 'top'
            },
            headStyles: {halign: 'center', fillColor: [48,63,159]},
            columnStyles: {
                index: {halign: 'center'},
                ng: {cellWidth: 10, halign: 'center'},
                klinis: {CellWidth: 'auto'}
            },
            didDrawPage: function (data) {
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

        doc.setFontStyle('bold');
        doc.text(11,doc.autoTable.previous.finalY+15, 'Pada Penderita')
        doc.setFontStyle('normal');
        doc.text(15,doc.autoTable.previous.finalY+20, 'Nama Pasien ')
        doc.text(55,doc.autoTable.previous.finalY+20, ': '+item.anggota.nama_pasien)
        doc.text(15,doc.autoTable.previous.finalY+25, 'Umur ')
        doc.text(55,doc.autoTable.previous.finalY+25, ': '+son.umur(item.anggota.tanggal_lahir))
        doc.text(15,doc.autoTable.previous.finalY+30, 'Jenis Kelamin ')
        doc.text(55,doc.autoTable.previous.finalY+30, ': '+son.kelamin(item.anggota.jenis_kelamin))
        doc.text(15,doc.autoTable.previous.finalY+35, 'No. HP ')
        doc.text(55,doc.autoTable.previous.finalY+35, ': '+item.anggota.no_hp)
        doc.text(15,doc.autoTable.previous.finalY+40, 'Alamat ')
        var sp = doc.splitTextToSize(item.anggota.alamat, 100)
        if(sp.length > 1){
            doc.text(55,doc.autoTable.previous.finalY+40, ': '+sp[0])   
            doc.text(57.5,doc.autoTable.previous.finalY+45, sp[1]) 
        }else{
            doc.text(55,doc.autoTable.previous.finalY+40, ': '+sp[0])   
        }

        if(doc.autoTable.previous.finalY+90 > doc.internal.pageSize.height-10){
            doc.addPage()
            doc.setFontSize(13);
            doc.setFontStyle('normal');
            doc.text(15,35, 'Mohon : ')
            doc.setFontStyle('italic');
            doc.text(20,40, 'Hasil diserahkan penderita')
            doc.setFontStyle('normal');
            doc.setDrawColor(0, 0, 0);
            doc.line(20,41.5,doc.internal.pageSize.width-130,41.5)
            doc.setFontStyle('italic');
            doc.text(20,46, 'Hasil diserahkan ke pengirim')
            doc.setFontStyle('normal');
            doc.text(130,30, 'Banjarbaru, '+format(now, 'DD MMMM YYYY', {locale: id}))
            doc.text(130,35, 'Hormat Kami,')
            doc.text(130,50, 'drg. Agus Dwi Karyanto, MPH')
        }else{
            doc.setFontSize(13);
            doc.setFontStyle('normal');
            doc.text(15,doc.autoTable.previous.finalY+65, 'Mohon : ')
            doc.setFontStyle('italic');
            doc.text(20,doc.autoTable.previous.finalY+75, 'Hasil diserahkan penderita')
            doc.setFontStyle('normal');
            doc.setDrawColor(0, 0, 0);
            doc.line(20,doc.autoTable.previous.finalY+76.5,doc.internal.pageSize.width-130,doc.autoTable.previous.finalY+76.5)
            doc.setFontStyle('italic');
            doc.text(20,doc.autoTable.previous.finalY+81, 'Hasil diserahkan ke pengirim')
            doc.setFontStyle('normal');
            doc.text(130,doc.autoTable.previous.finalY+60, 'Banjarbaru, '+format(item.sujuk.tgl_rujukan, 'DD MMMM YYYY', {locale: id}))
            doc.text(130,doc.autoTable.previous.finalY+65, 'Hormat Kami,')
            doc.text(130,doc.autoTable.previous.finalY+85, 'drg. Agus Dwi Karyanto, MPH')
        }

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save(item.sujuk.no_rujukan);

      },

      hancurKan(gigi){
        let cur = gigi.split(',')
        return cur
      }

    },
    mounted(){
      this.initialize()
    },
    created(){
      this.live = setInterval(()=>{
        this.$store.dispatch('fetchAntrianDokter')
      },5000)
    },
    beforeDestroy(){
      clearInterval(this.live);
    },
  
  }
</script>

<style>
    .img-gigi{
        cursor: pointer;
    }
</style>

