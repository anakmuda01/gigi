<template>
    <div class="pa-0">
        <v-layout class="grey lighten-5" column px-0 pt-2>
            <v-flex xs12 sm12 md12 py-2>
                <v-layout column>
                    <v-flex xs12 class="text-xs-center" py-2>
                        <v-layout column justify-center align-center>
                            <v-flex>
                                <span class="font-weight-bold subheading">REGION GIGI</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs6>
                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg1 : reg1.slice().reverse()">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('1'+i)" 
                                    :color="cekGigi('1'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        1{{i}}
                                    </v-btn>
                                    <v-tooltip v-else top :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click.stop="!modeGigi ? chooseGigi('1'+i) : ''" icon small>
                                                <v-icon color="red" v-if="cekGigi('1'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else >mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>1{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                            <v-divider vertical></v-divider>
                            <v-flex xs6>
                                <template v-for="i in reg1">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('2'+i)" 
                                    :color="cekGigi('2'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        2{{i}}
                                    </v-btn>
                                    <v-tooltip v-else top :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('2'+i)" icon small>
                                                <v-icon color="red" v-if="cekGigi('2'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>2{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs6>
                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg1 : reg1.slice().reverse()">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('4'+i)" 
                                    :color="cekGigi('4'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        4{{i}}
                                    </v-btn>
                                    <v-tooltip v-else bottom :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('4'+i)" icon small>
                                                <v-icon color="red" v-if="cekGigi('4'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>4{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                            <v-divider vertical></v-divider>
                            <v-flex xs6>
                                <template v-for="i in reg1">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('3'+i)" 
                                    :color="cekGigi('3'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        3{{i}}
                                    </v-btn>
                                    <v-tooltip v-else bottom :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('3'+i)" icon small>
                                                <v-icon color="red" v-if="cekGigi('3'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>3{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md12 py-2>
                <v-layout column>
                    <v-flex xs12 class="text-xs-center">
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs6>
                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg2 : reg2.slice().reverse()">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('5'+i)" 
                                    :color="cekGigi('5'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        5{{i}}
                                    </v-btn>
                                    <v-tooltip v-else top :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('5'+i)" icon small>
                                                <v-icon color="orange accent-3" v-if="cekGigi('5'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>5{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                            <v-divider vertical></v-divider>
                            <v-flex xs6>
                                <template v-for="i in reg2">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('6'+i)" 
                                    :color="cekGigi('6'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        6{{i}}
                                    </v-btn>
                                    <v-tooltip v-else top :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('6'+i)" icon small>
                                                <v-icon color="orange accent-3" v-if="cekGigi('6'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>6{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs6>
                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg2 : reg2.slice().reverse()">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('8'+i)" 
                                    :color="cekGigi('8'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        8{{i}}
                                    </v-btn>
                                    <v-tooltip v-else bottom :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('8'+i)" icon small>
                                                <v-icon color="orange accent-3" v-if="cekGigi('8'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>8{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                            <v-divider vertical></v-divider>
                            <v-flex xs6>
                                <template v-for="i in reg2">
                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="chooseGigi('7'+i)" 
                                    :color="cekGigi('7'+i) ? 'red' : 'secondary'" small icon :key="i">
                                        7{{i}}
                                    </v-btn>
                                    <v-tooltip v-else bottom :key="i">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-on="on"  @click="chooseGigi('7'+i)" icon small>
                                                <v-icon color="orange accent-3" v-if="cekGigi('7'+i)">mdi-tooth</v-icon>
                                                <v-icon v-else color="green darken-4">mdi-tooth-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>7{{i}}</span>
                                    </v-tooltip>
                                </template>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout :class="{'px-3 grey lighten-4' : !$vuetify.breakpoint.xs}" py-1>
            <v-flex>
                <v-card flat>
                    <v-toolbar flat color="white">              
                        <v-dialog scrollable fullscreen v-model="dialog" max-width="800px" persistent>
                            <v-card>
                            <v-card-title class="py-2 indigo darken-2">
                                <v-layout align-center justify-start>
                                    <div>
                                        <v-layout v-if="formTitle === 'Data Gigi Baru'" wrap row class="headline white--text ml-2">
                                            <v-icon dark medium class="mr-2">mdi-tooth</v-icon>
                                            <div>{{ formTitle }}</div>
                                        </v-layout>
                                        <span class="headline white--text" v-else>
                                            <v-layout wrap row>
                                            <v-icon dark medium class="mr-2">edit</v-icon>
                                            <div>{{formTitle}} :</div>
                                            <v-icon dark class="ml-3 mr-1">mdi-tooth</v-icon>
                                            <div>{{editedItem.no_gigi}}</div>
                                            </v-layout>
                                        </span>
                                    </div>
                                </v-layout>
                                <v-spacer></v-spacer>
                                <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
                            </v-card-title>

                            <v-card-text class="px-1 pt-0">
                                <v-stepper v-model="e1">
                                    <v-stepper-header>
                                    <v-stepper-step :complete="e1 > 1" step="1">Pilih Gigi</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :complete="e1 > 2" step="2" :editable="editedIndex > -1">Pemeriksaan Kondisi Gigi</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :complete="e1 > 3" step="3" :editable="editedIndex > -1">Diagnosa</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step step="4" :editable="editedIndex > -1">Tindakan</v-stepper-step>
                                    </v-stepper-header>

                                    <v-stepper-items>
                                    <v-stepper-content step="1">
                                        <v-card
                                        class="mb-3"
                                        color="grey lighten-5"
                                        min-height="350px"
                                        >
                                            <v-card-text v-if="modeBanyak">
                                                <v-layout justify-center align-center>
                                                    <v-flex xs12 class="text-xs-center">
                                                        <v-divider></v-divider>
                                                        <v-layout row align-center>
                                                            <v-flex xs1 class="toggleIcon" @click="toggleOne()">
                                                                <v-layout row wrap justify-center align-center>
                                                                    <v-icon class="my-2" :class="{'mr-2': !$vuetify.breakpoint.xs}">{{toggleOneIcon ? 'mdi-checkbox-marked' : 'mdi-minus-box'}}</v-icon>
                                                                    <span>Rahang 1</span>
                                                                </v-layout>
                                                            </v-flex>
                                                            <v-flex xs5>
                                                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg1 : reg1.slice().reverse()">
                                                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pushGigi('1'+i)" 
                                                                    :color="cekGM('1'+i) ? 'red' : 'secondary'" small icon :key="i">
                                                                        1{{i}}
                                                                    </v-btn>
                                                                    <v-tooltip v-else top :key="i">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn v-on="on"  @click.stop="!modeGigi ? pushGigi('1'+i) : ''" icon small>
                                                                                <v-icon color="red" v-if="cekGM('1'+i)">mdi-tooth</v-icon>
                                                                                <v-icon v-else >mdi-tooth-outline</v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <span>1{{i}}</span>
                                                                    </v-tooltip>
                                                                </template>
                                                            </v-flex>
                                                            <v-divider vertical></v-divider>
                                                            <v-flex xs5>
                                                                <template v-for="i in reg1">
                                                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pushGigi('2'+i)" 
                                                                    :color="cekGM('2'+i) ? 'red' : 'secondary'" small icon :key="i">
                                                                        2{{i}}
                                                                    </v-btn>
                                                                    <v-tooltip v-else top :key="i">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn v-on="on"  @click="pushGigi('2'+i)" icon small>
                                                                                <v-icon color="red" v-if="cekGM('2'+i)">mdi-tooth</v-icon>
                                                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <span>2{{i}}</span>
                                                                    </v-tooltip>
                                                                </template>
                                                            </v-flex>
                                                            <v-flex xs1 class="toggleIcon" @click="toggleTwo()">
                                                                <v-layout row wrap justify-center align-center>
                                                                    <span>Rahang 2</span>
                                                                    <v-icon class="my-2" :class="{'ml-2': !$vuetify.breakpoint.xs}">{{toggleTwoIcon ? 'mdi-checkbox-marked' : 'mdi-minus-box'}}</v-icon>
                                                                </v-layout>
                                                            </v-flex>
                                                        </v-layout>
                                                        <v-divider></v-divider>
                                                        <v-layout row align-center>
                                                            <v-flex xs1 class="toggleIcon" @click="toggleFour()">
                                                                <v-layout row wrap justify-center align-center>
                                                                    <v-icon class="my-2" :class="{'mr-2': !$vuetify.breakpoint.xs}">{{toggleFourIcon ? 'mdi-checkbox-marked' : 'mdi-minus-box'}}</v-icon>
                                                                    <span>Rahang 4</span>
                                                                </v-layout>
                                                            </v-flex>
                                                            <v-flex xs5>
                                                                <template v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? reg1 : reg1.slice().reverse()">
                                                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pushGigi('4'+i)" 
                                                                    :color="cekGM('4'+i) ? 'red' : 'secondary'" small icon :key="i">
                                                                        4{{i}}
                                                                    </v-btn>
                                                                    <v-tooltip v-else bottom :key="i">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn v-on="on"  @click="pushGigi('4'+i)" icon small>
                                                                                <v-icon color="red" v-if="cekGM('4'+i)">mdi-tooth</v-icon>
                                                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <span>4{{i}}</span>
                                                                    </v-tooltip>
                                                                </template>
                                                            </v-flex>
                                                            <v-divider vertical></v-divider>
                                                            <v-flex xs5>
                                                                <template v-for="i in reg1">
                                                                    <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="white--text" @click="pushGigi('3'+i)" 
                                                                    :color="cekGM('3'+i) ? 'red' : 'secondary'" small icon :key="i">
                                                                        3{{i}}
                                                                    </v-btn>
                                                                    <v-tooltip v-else bottom :key="i">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn v-on="on"  @click="pushGigi('3'+i)" icon small>
                                                                                <v-icon color="red" v-if="cekGM('3'+i)">mdi-tooth</v-icon>
                                                                                <v-icon v-else>mdi-tooth-outline</v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <span>3{{i}}</span>
                                                                    </v-tooltip>
                                                                </template>
                                                            </v-flex>
                                                            <v-flex xs1 class="toggleIcon" @click="toggleThree()">
                                                                <v-layout row wrap justify-center align-center>
                                                                    <span>Rahang 3</span>
                                                                    <v-icon class="my-2" :class="{'ml-2': !$vuetify.breakpoint.xs}">{{toggleThreeIcon ? 'mdi-checkbox-marked' : 'mdi-minus-box'}}</v-icon>
                                                                </v-layout>
                                                            </v-flex>
                                                        </v-layout>
                                                        <v-divider></v-divider>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-text>
                                            <v-card-text v-else>
                                                <v-layout :class="[$vuetify.breakpoint.xs ? 'norgiMob' : 'norgiPC']" row align-center justify-center>
                                                    <v-icon 
                                                    x-large 
                                                    class="mr-2 gigi-ganal">
                                                    mdi-tooth
                                                    </v-icon>
                                                    <div class="font-weight-bold display-4">
                                                        {{editedItem.no_gigi}}
                                                    </div>                                             
                                                </v-layout>
                                            </v-card-text>
                                        </v-card>

                                        <v-btn
                                        :loading="loadingBtn"
                                        :disabled="loadingBtn"
                                        color="primary"
                                        @click="pilihGigi"
                                        >
                                        Continue
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>
                                    </v-stepper-content>

                                    <v-stepper-content step="2">
                                        <v-card
                                        class="mb-3"
                                        color="grey lighten-5"
                                        min-height="350px"
                                        >
                                            <v-layout wrap row px-3 pb-4 pt-1>
                                                <v-flex xs6 sm6 md6
                                                v-for="v in setKon" :key="v.name"
                                                >
                                                    <v-checkbox
                                                        hide-details
                                                        color="primary"
                                                        v-model="checked[v.id]"
                                                        :label="v.nama_kondisi"
                                                    >
                                                    </v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-card>

                                        <v-btn
                                        :loading="loadingBtn"
                                        :disabled="loadingBtn"
                                        color="primary"
                                        @click="pilihKondisi"
                                        >
                                        Continue
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>

                                    </v-stepper-content>

                                    <v-stepper-content step="3">
                                        <v-card
                                        class="mb-3"
                                        color="grey lighten-5"
                                        min-height="350px"
                                        >
                                            <v-layout px-3 py-4>
                                                <v-flex xs12 sm12 md12>
                                                    <v-autocomplete
                                                    v-model="selectedDiags"
                                                    :items="diags"
                                                    label="Pilih Diagnosa"
                                                    multiple
                                                    prepend-icon="mdi-prescription"
                                                    clearable
                                                    persistent-hint
                                                    chips
                                                    item-text="nama_diagnosa"
                                                    item-value="id"
                                                    hint="Jika Diagnosa tidak ditemukan, silahkan daftarkan diagnosa tersebut terlebih dahulu."
                                                    >
                                                    </v-autocomplete>
                                                </v-flex>
                                            </v-layout>
                                        </v-card>

                                        <v-btn
                                        :loading="loadingBtn"
                                        :disabled="loadingBtn"
                                        color="primary"
                                        @click="pilihDiags"
                                        >
                                        Continue
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>

                                        <v-btn 
                                        flat
                                        :disabled="loadingBtn" 
                                        @click="back(2)">Kembali</v-btn>

                                    </v-stepper-content>

                                    <v-stepper-content step="4">
                                        <v-card
                                        class="mb-3"
                                        color="grey lighten-5"
                                        min-height="350px"
                                        >
                                            <v-layout px-3 py-4>
                                                <v-flex xs12 sm12 md12>
                                                    <v-autocomplete
                                                    v-model="selectedTindaks"
                                                    :items="tindaksL"
                                                    label="Pilih Tindakan"
                                                    multiple
                                                    prepend-icon="mdi-needle"
                                                    clearable
                                                    persistent-hint
                                                    chips
                                                    item-text="nama_tindakan"
                                                    item-value="id"
                                                    hint="Jika Tindakan tidak ditemukan, silahkan daftarkan tindakan tersebut terlebih dahulu."
                                                    >
                                                    </v-autocomplete>
                                                </v-flex>
                                            </v-layout>
                                        </v-card>

                                        <v-btn
                                        :loading="loadingBtn"
                                        :disabled="loadingBtn"
                                        color="primary"
                                        @click="pilihTindaks"
                                        >
                                        Done
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>

                                        <v-btn 
                                        flat
                                        :disabled="loadingBtn" 
                                        @click="back(3)">Kembali</v-btn>

                                    </v-stepper-content>
                                    </v-stepper-items>
                                </v-stepper>
                            </v-card-text>

                            </v-card>
                        </v-dialog>


                        <v-btn color="secondary" @click="chooseBanyak">
                            <v-icon small class="mr-1">print</v-icon>
                            Pilih Gigi Banyak
                        </v-btn>
                        <v-spacer></v-spacer>
                        <!-- tombol show-sujuk -->
                        <v-btn color="secondary" @click="cetakSujuk">
                            <v-icon small class="mr-1">print</v-icon>
                            Cetak Surat Rujukan
                        </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-data-table
                    :headers="headers"
                    :items="gigis"
                    item-key="no_gigi"
                    class="elevation-1"
                    hide-actions
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
                        <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">{{ props.item.no_gigi }} </td>
                        <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                            <template v-for="(val,index) in props.item.diags"> 
                                <span v-if="index != props.item.diags.length-1"  :key="index">{{val.nama_diagnosa}}, </span>
                                <span v-else :key="index">{{val.nama_diagnosa}}</span>
                            </template>
                        </td>
                        <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">
                            <template v-for="(val,index) in props.item.tindaks">
                                <span v-if="index != props.item.tindaks.length-1" :key="index">{{val.nama_tindakan}}, </span>
                                <span v-else :key="index">{{val.nama_tindakan}}</span>
                            </template>
                        </td>
                        <td @click.stop="" :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-center">
                            <v-btn :loading="loadingBtn" v-if="props.item.rujuk" small icon color="warning" @click="hapusRujuk(props.item)">
                                <v-icon small>check_circle</v-icon>
                            </v-btn>
                            <v-icon v-else color="success">mdi-close-circle</v-icon>
                        </td>
                        <td @click.stop="" class="justify-center align-center layout px-0">
                            <v-btn 
                            :disabled="loadingBtn" 
                            @click="makeRujuk(props.item)" icon small class="mr-1" color="warning">
                                <v-icon
                                    small
                                >
                                    mdi-file-document-edit
                                </v-icon>
                            </v-btn>
                            <v-btn 
                            :disabled="loadingBtn" 
                            @click="editItem(props.item)" icon small class="mr-1" color="primary">
                                <v-icon
                                    small
                                >
                                    edit
                                </v-icon>
                            </v-btn>
                            <v-btn
                            :disabled="loadingBtn"  
                            @click="deleteItem(props.item)" icon small color="error">
                                <v-icon
                                    small
                                >
                                    delete
                                </v-icon>
                            </v-btn>
                        </td>
                        </tr>
                    </template>
                    <template v-slot:expand="props">
                        <v-card flat>
                            <v-layout wrap column class="pa-0">
                                <v-flex xs12 sm12 md12 lg12>
                                    <v-layout wrap row>
                                        <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Detail Pemeriksaan N.G: <span class="green--text text--darken-3">[ {{props.item.no_gigi}} ]</span></h4>
                                        </v-card-title>
                                    </v-layout>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-layout wrap row class="px-0 py-2 grey lighten-4">
                                    <v-flex xs4 sm4 md2 lg2 class="mx-1 mb-1"
                                    v-for="item in range(props.item.kondisis.length)" :key="item"
                                    >
                                        <v-card>
                                            <v-list dense>
                                                <v-list-tile
                                                v-for="v in props.item.kondisis.slice((item-1)*5, (item-1)*5+5)" :key="v.name"
                                                >
                                                    <v-list-tile-content class="font-weight-bold caption">{{v.nama_kondisi}}</v-list-tile-content>
                                                    <v-list-tile-content class="align-end pr-1"><v-icon :color="v.pivot.value ? 'red' : 'green'" small>{{v.pivot.value ? 'add_box' : 'indeterminate_check_box'}}</v-icon></v-list-tile-content>
                                                </v-list-tile>                                                                                        
                                            </v-list>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-card>
                    </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- surat rujukan -->
        <v-dialog v-model="modalRujuk" max-width="500px" persistent scrollable :fullscreen="$vuetify.breakpoint.xs">
          <v-card height="100%">
            <v-layout column fill-height>
              <v-card-actions class="indigo darken-2">
                  <v-layout wrap row class="headline white--text ml-2">
                    <v-icon dark medium class="mr-2">mdi-tooth</v-icon>
                    <div>{{ rujukItem.ng }} Rujukan</div>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-btn icon dark class="orange darken-2" flat @click="closeRujuk"><v-icon>close</v-icon></v-btn>
              </v-card-actions>

              <v-form
              ref="formRujukan"
              lazy-validation
              >
                <v-card-text class="pa-0">
                    <v-container class="px-4 pt-3 pb-5" grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12 py-2>
                                <v-text-field 
                                prepend-icon="mdi-clipboard-pulse-outline"
                                label="Keterangan Klinis"
                                v-model="rujukItem.klinis"
                                :rules="[rules.required]"
                                counter
                                maxlength="70"
                                clearable
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12 py-2>
                                <v-layout column>
                                    <v-flex xs12 class="text-xs-left" py-2>
                                        <span class="font-weight-bold title">Bantuan Untuk :</span>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-select 
                                        v-model="rujukItem.foto" 
                                        :items="arrFoto"
                                        label="Foto"
                                        clearable
                                        >
                                        </v-select>
                                    </v-flex>
                                    <v-flex x12>
                                        <v-select 
                                        v-model="rujukItem.protesa" 
                                        :items="arrProtesa"
                                        label="Protesa"
                                        clearable
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
              </v-form>
              <v-spacer></v-spacer>
              <v-card-actions class="indigo darken-2">
                  <v-spacer></v-spacer>
                  <v-btn dark class="green darken-2" 
                  flat 
                  @click="saveRujuk"
                  :loading="loadingBtn"
                  :disabled="loadingBtn"
                  >
                    <v-icon class="mr-2">save</v-icon>
                    SIMPAN
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
        </v-dialog>

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
                <v-btn icon dark class="orange darken-2" flat @click="closePrint"><v-icon>close</v-icon></v-btn>
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

    </div>    
</template>

<script>

const norgi = ['11','12','13','14','15','16','17','18','21','22','23','24','25','26','27','28','31','32','33','34','35','36','37','38','41','42','43','44','45','46','47','48','51','52','53','54','55','61','62','63','64','65','71','72','73','74','75','81','82','83','84','85']
const angka1 = ['1','2','3','4','5','6','7','8'];
const angka2 = ['1','2','3','4','5'];

const ral = ['11','12','13','14','15','16','17','18'];
const rar = ['21','22','23','24','25','26','27','28'];
const rbr = ['31','32','33','34','35','36','37','38'];
const rbl = ['41','42','43','44','45','46','47','48'];

import { mapState, mapActions, mapMutations } from 'vuex';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Person from "./../../../Person.js";
import imgApotek from './../../core/img.js';

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

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    props:['solo'],
    data () {
      return {
        gigiMulti: [],
        modeBanyak: false,
        modeGigi: false,
        modalRujuk: false,
        modalPrint: false,
        sumberPDF: null,
        readyPDF: false,
        errorPDF: false,
        e1: 0,
        cam: false,
        dialog: false,
        loadingTB: false,
        loadingBtn: false,
        reg1: angka1,
        reg2: angka2,
        arrFoto: ['Periapical', 'Panoramic','Occlusal', 'Bitewing', 'Digital'],
        arrProtesa: ['Denture Acrylic', 'Denture Valplast','Porcelain/Crown/Bridge','Denture Polycarbonate', 'Metal Frame'],
        headers: [
          {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'id',
            width: '1%'
          },
          { text: 'N.G', value: 'no_gigi', sortable: true, width: '1%' },
          { text: 'Diagnosa', value: 'diag', sortable: false },
          { text: 'Tindakan', value: 'tindakan', sortable: false },
          { text: 'Rujukan', sortable: false, align: 'center', width: '1%' },
          { text: 'Aksi', value: 'aksi', sortable: false, width: '1%' },
        ],
        editedIndex: -1,
        editRujuk : -1,
        editedItem: {
            id_gigi: null,
            no_gigi: null,
            diag: null,
            tindakan: null,
        },
        rujukItem: {
            id: null,
            ng: null,
            foto: '',
            protesa: '',
            klinis: '',
        },
        checked: {},
        selectedDiags: [],
        selectedTindaks: [],
        errors: null,
        rules: {
            required: value => !!value || 'Required.',
            min: v => (v && v.length >= 3) || 'Min 3 karakter',
        },
        toggleOneIcon: false,
        toggleTwoIcon: false,
        toggleThreeIcon: false,
        toggleFourIcon: false,
      }
    },
    computed: {
        ...mapState([
            'gigis',
            'kondisisT',
            'diags',
            'tindaksL'
        ]),
        formTitle () {
            return this.editedIndex === -1 ? 'Data Gigi Baru' : 'Edit Data '
        },
        setG(){
            let arr = []
            let len = this.gigis.length
            for(let i = 0; i < len; i++){
                arr.push(this.gigis[i].no_gigi)
            }
            return arr
        },
        setNG(){
            let arr = []
            let len = norgi.length
            for(let i = 0; i < len; i++){
                var foo = this.cekGigi(norgi[i])
                if(!foo){
                    arr.push(norgi[i])
                }
            }   
            return arr
        },
        setKon : {
            get(){
                return this.kondisisT
            }
        },

        setRahang(){
            let foo = []
            let len = this.gigis.length
            for(let i = 0; i < len; i++){
                if(this.gigis[i].no_gigi.length > 2){
                    foo.push(this.gigis[i].no_gigi)
                }
            }
            return foo.join(',').slice(',')
        },

    },

    methods: {
        initialize(){
            this.$store.dispatch('fetchGigis', {
                no_rm: this.$route.params.id
            })
        },

        back(n){
            setTimeout(()=>{
                this.e1 = n
            },500)
        },

        range(number){
            if(number % 5 ==  0){
                return number/5
            }else{
                return Math.floor(number/5)+1
            }
            
        },

        filterDiag (item, queryText, itemText) {
            const textOne = item.no_keluarga.toLowerCase()
            const textTwo = item.nama_kepala.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
            textTwo.indexOf(searchText) > -1
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = {
                id_gigi: null,
                no_gigi: null,
                diag:null,
                tindakan:null,
            },
            this.editedIndex = -1
            this.e1 = 1
            this.checked = {}
            this.selectedDiags = []
            this.selectedTindaks = []
            this.loadingTB = false
            this.loadingBtn = false
            this.gigiMulti = []
            this.modeBanyak = false
            this.toggleOneIcon = false
            this.toggleTwoIcon = false
            this.toggleThreeIcon = false
            this.toggleFourIcon = false
            }, 300)
        },

        editItem (item) {
            this.e1 = 2
            this.editedIndex = this.gigis.indexOf(item)
            this.editedItem.id_gigi = item.id
            this.editedItem.no_gigi = item.no_gigi


            let len = item.kondisis.length
            for(var i=0;i<len;i++){
                this.checked[item.kondisis[i].id] = item.kondisis[i].pivot.value > 0 ? true : false
            }

            let jang = item.diags.length
            for(var i=0;i<jang;i++){
                this.selectedDiags.push(item.diags[i].id)
            }

            let pai = item.tindaks.length
            for(var i=0;i<pai;i++){
                this.selectedTindaks.push(item.tindaks[i].id)
            }

            setTimeout(()=>{
                this.dialog = true
            },300)
        },

        deleteItem (item) {
            this.loadingBtn = true
            this.loadingTB = true
            swal.fire({
            title: 'Anda yakin?',
            html: 'Hapus data dari Nomor Gigi : <div class="red--text font-weight-bold display-2"> <i class="mdi mdi-tooth"></i>'+item.no_gigi+'</div> Data yang sudah dihapus tidak bisa dikembalikan lagi',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, hapus!'
            }).then((response) => {
                if (response.value) {
                        this.$Progress.start();
                        axios.delete('/api/batal-gigi/'+item.id).then(()=>{
                        swal.fire(
                            'Deleted!',
                            'Data dari <div class="green--text font-weight-bold display-2"> <i class="mdi mdi-tooth"></i>'+item.no_gigi+'</div>  telah terhapus!!.',
                            'success'
                        )
                        setTimeout(()=>{
                            this.initialize()
                            this.loadingBtn = false
                            this.loadingTB = false
                            this.$Progress.finish()
                        }, 1500)
                        }).catch(()=> {
                            swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                            this.loadingBtn = false
                            this.loadingTB = false
                            this.$Progress.finish();
                        });
                }else{
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish();
                }
            })
        },

        chooseGigi(nomor) {     
            let cek = this.cekGigi(nomor)
            if(cek){
                this.e1 = 2
                this.editedIndex = this.gigis.findIndex(x => x.no_gigi === nomor)
                let gis = this.gigis.find(x => x.no_gigi === nomor)
                this.editedItem.no_gigi = gis.no_gigi
                this.editedItem.id_gigi = gis.id
                let len = gis.kondisis.length

                for(var i=0;i<len;i++){
                    this.checked[gis.kondisis[i].id] = gis.kondisis[i].pivot.value > 0 ? true : false
                }

                let jang = gis.diags.length
                for(var i=0;i<jang;i++){
                    this.selectedDiags.push(gis.diags[i].id)
                }

                let pai = gis.tindaks.length
                for(var i=0;i<pai;i++){
                    this.selectedTindaks.push(gis.tindaks[i].id)
                }

            }else{
                this.editedItem.no_gigi = nomor
            }
            this.dialog = true
        },

        cekGigi(nomor){
            let gt = this.setG
            let inc = gt.includes(nomor)
            return inc
        },

        pilihGigi(){
            this.$Progress.start();
            this.loadingBtn = true
            this.loadingTB = true
            let numGigi = !this.modeBanyak ? this.editedItem.no_gigi : this.gigiMulti.sort().join(',')
            axios.post('/api/tambah-gigi/'+this.solo.id, {nomor: numGigi}).then((response) => {
                this.editedItem.id_gigi = response.data
                toast.fire({
                  type: 'success',
                  title: 'Gigi Terpilih berhasil ditambahkan~'
                })
                setTimeout(()=>{
                  this.initialize()
                  this.loadingBtn = false
                  this.loadingTB = false
                  this.e1 = 2
                  this.editedIndex = 1
                  this.$Progress.finish();
                },1000)
            }).catch((error) => {
                this.errors.record(error.response.data)
                toast.fire({
                    type: 'warning',
                    title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                })
                setTimeout(() => {
                    this.$Progress.finish();
                    this.close()
                }, 3000)
            })
        },
        pilihKondisi(){
            this.$Progress.start();
            this.loadingBtn = true
            this.loadingTB = true
            axios.post('/api/tambah-kondisi/'+this.editedItem.id_gigi, {kons: this.checked}).then((response) => {
                setTimeout(()=>{
                    toast.fire({
                    type: 'success',
                    title: 'Kondisi berhasil ditambahkan~'
                    })
                    this.initialize()
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish()
                    setTimeout(()=>{
                        this.e1 = 3
                    },500)
                }, 1500)
            }).catch((error) => {
                this.errors.record(error.response.data)
                toast.fire({
                    type: 'warning',
                    title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                })
                setTimeout(() => {
                    this.$Progress.finish();
                    this.close()
                }, 3000)
            })
        },
        pilihDiags(){
            this.$Progress.start();
            this.loadingBtn = true
            this.loadingTB = true
            if(this.selectedDiags.length > 0){
                axios.post('/api/tambah-diags/'+this.editedItem.id_gigi, {diags: this.selectedDiags}).then((response) => {
                    setTimeout(()=>{
                        toast.fire({
                        type: 'success',
                        title: 'Diagnosa berhasil ditambahkan~'
                        })
                        this.initialize()
                        this.loadingBtn = false
                        this.loadingTB = false
                        this.$Progress.finish()
                        setTimeout(()=>{
                            this.e1 = 4
                        },500)
                    }, 1500)
                }).catch((error) => {
                    this.errors.record(error.response.data)
                    toast.fire({
                        type: 'warning',
                        title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                    })
                    setTimeout(() => {
                        this.$Progress.finish();
                        this.close()
                    }, 3000)
                })
            }else{
                setTimeout(()=>{
                    toast.fire({
                    type: 'info',
                    title: 'Tidak ada diagnosa yang ditambahkan~'
                    })
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish()
                    setTimeout(()=>{
                        this.e1 = 4
                    },500)
                }, 500)
            }
        },
        pilihTindaks(){
            this.$Progress.start();
            this.loadingBtn = true
            this.loadingTB = true
            if(this.selectedTindaks.length > 0){
                axios.post('/api/tambah-tindaks/'+this.editedItem.id_gigi, {tindaks: this.selectedTindaks, rm: this.solo.id}).then((response) => {
                    setTimeout(()=>{
                        toast.fire({
                        type: 'success',
                        title: 'Tindakan berhasil ditambahkan~'
                        })
                        this.initialize()
                        this.loadingBtn = false
                        this.loadingTB = false
                        this.$Progress.finish()
                        setTimeout(()=>{
                            this.close()
                        },500)
                    }, 1500)
                }).catch((error) => {
                    this.errors.record(error.response.data)
                    toast.fire({
                        type: 'warning',
                        title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                    })
                    setTimeout(() => {
                        this.$Progress.finish();
                        this.close()
                    }, 3000)
                })
            }else{
                setTimeout(()=>{
                    toast.fire({
                    type: 'info',
                    title: 'Tidak ada tindakan yang ditambahkan~'
                    })
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish()
                    setTimeout(()=>{
                        this.e1 = 4
                    },500)
                }, 500)
            }
        },

        gagal(){
        toast.fire({
            type: 'warning',
            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            })
            this.$router.push('bantuan')
        },

        closeRujuk(){
            this.$refs.formRujukan.reset()
            this.$refs.formRujukan.resetValidation()
            this.rujukItem = {
                id : null,
                ng : null,
                klinis : '',
                foto : '',
                protesa : '',
            }
            this.modalRujuk = false
        },

        makeRujuk(item){
            if(item.rujuk){ 
                this.rujukItem = {
                    id : item.id,
                    ng : item.no_gigi,
                    klinis : item.rujuk.klinis,
                    foto : item.rujuk.foto,
                    protesa : item.rujuk.protesa
                }
            }else{
                this.rujukItem.ng = item.no_gigi
                this.rujukItem.id = item.id
            }
            this.modalRujuk = true
        },

        saveRujuk(){
            if(this.$refs.formRujukan.validate()){
                this.$Progress.start();
                this.loadingBtn = true
                this.loadingTB = true
                axios.post('/api/make-rujukan', this.rujukItem).then((response)=>{
                    if(response.data.msg === 'save'){
                        toast.fire({
                            type: 'success',
                            title: 'Rujukan gigi untuk berhasil ditambahkan~'
                        })
                    }else{
                        toast.fire({
                            type: 'success',
                            title: 'Data rujukan gigi untuk berhasil diupdate~'
                        })
                    }
                    this.initialize()
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish()
                    setTimeout(()=>{
                        this.closeRujuk()
                    },500)
                })
            }
        },

        cetakSujuk(){
            this.loadingCetak = true
            axios.get('/api/cek-rujuk/'+this.solo.id).then((response) => {

                if(response.data.jum > 0){

                    var sur = response.data.surat

                    var doc = new jsPDF()
                    var totalPagesExp = "{total_pages_count_string}";
                    var son = new Person()

                    let item = this.solo

                    let set = []
                    for(let i=0;i<this.gigis.length; i++){
                        if(this.gigis[i].rujuk){
                            set.push(this.gigis[i].no_gigi)
                        }
                    }

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
                    doc.myText('Nomor : '+sur.no_rujukan,{align: "center"},0,42);

                    doc.text(11,60, 'Dengan Hormat,')
                    doc.text(11,73, 'Mohon bantuan untuk pembuatan foto dan protesa :')

                    doc.text(11,79, 'Region :')

                    var ar = angka1.slice().reverse()
                    
                    for(let i=0;i<ar.length;i++){
                        doc.text(33.3+i*9.09 ,90, '1'+ar[i])
                        if(set.includes('1'+ar[i])){
                            doc.circle(35.8+i*9.09, 88.5, 4)
                        }
                    }
                    doc.line(104.5,83,104.5,103)
                    for(let i=0;i<angka1.length;i++){
                        doc.text(108+i*9 ,90, '2'+angka1[i])
                        if(set.includes('2'+angka1[i])){
                            doc.circle(110+i*9.09, 88.5, 4)
                        }
                    }
                    doc.line(30,93.5,180,93.5)
                    for(let i=0;i<ar.length;i++){
                        doc.text(33.5+i*9.03 ,100, '4'+ar[i])
                        if(set.includes('4'+ar[i])){
                            doc.circle(35.8+i*9.09, 98.5, 4)
                        }
                    }
                    for(let i=0;i<angka1.length;i++){
                        doc.text(108+i*9 ,100, '3'+angka1[i])
                        if(set.includes('3'+angka1[i])){
                            doc.circle(110+i*9.09, 98.5, 4)
                        }
                    }

                    var ar2 = angka2.slice().reverse()

                    for(let i=0;i<ar2.length;i++){
                        doc.text(60.3+i*9.09 ,115, '5'+ar2[i])
                        if(set.includes('5'+ar2[i])){
                            doc.circle(62.8+i*9.1, 113.5, 4)
                        }
                    }
                    doc.line(104.5,108,104.5,128)
                    for(let i=0;i<angka2.length;i++){
                        doc.text(108+i*9 ,115, '6'+angka2[i])
                        if(set.includes('6'+angka1[i])){
                            doc.circle(110+i*9.1, 113.5, 4)
                        }
                    }
                    doc.line(30,118.5,180,118.5)
                    for(let i=0;i<ar2.length;i++){
                        doc.text(60.5+i*9.03 ,125, '8'+ar2[i])
                        if(set.includes('8'+ar2[i])){
                            doc.circle(62.8+i*9.1, 123.5, 4)
                        }
                    }
                    for(let i=0;i<angka2.length;i++){
                        doc.text(108+i*9 ,125, '7'+angka2[i])
                        if(set.includes('7'+angka1[i])){
                            doc.circle(110+i*9.1, 123.5, 4)
                        }
                    }

                    let body = []
                    let gis = this.gigis
                    for(let i=0;i<gis.length;i++){
                        if(set.includes(gis[i].no_gigi)){
                            let nogi = gis[i].no_gigi
                            body.push({
                                index : i+1,
                                ng : nogi,
                                foto : gis[i].rujuk.foto,
                                protesa : gis[i].rujuk.protesa,
                                klinis : gis[i].rujuk.klinis
                            })
                        }
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
                        doc.text(130,doc.autoTable.previous.finalY+60, 'Banjarbaru, '+format(sur.tgl_rujukan, 'DD MMMM YYYY', {locale: id}))
                        doc.text(130,doc.autoTable.previous.finalY+65, 'Hormat Kami,')
                        doc.text(130,doc.autoTable.previous.finalY+85, 'drg. Agus Dwi Karyanto, MPH')
                    }

                    if (typeof doc.putTotalPages === 'function') {
                        doc.putTotalPages(totalPagesExp);
                    }

                    this.readyPDF = false
                    this.modalPrint = true
                    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

                    wait(1500).then(() => {
                        doc.autoPrint();
                        var string = doc.output('datauristring');
                        this.sumberPDF = string
                        this.loadingCetak = false
                        this.readyPDF = true
                    }).catch(()=>{
                        setTimeout(()=>{
                        this.errorPDF = true
                        this.loadingCetak = false
                        },1000)
                    });
                }else{
                    setTimeout(()=>{
                        toast.fire({
                            type: 'warning',
                            title: 'Maaf, tidak ada gigi yang dirujuk!'
                        })
                        this.loadingCetak = false
                    },500)
                }
            })
        },

        closePrint(){
            this.modalPrint = false
            this.sumberPDF = null
        },

        hapusRujuk(item) {
            this.loadingBtn = true
            this.loadingTB = true
            swal.fire({
            title: 'Anda yakin?',
            html: 'Keluarkan Nomor Gigi : <div class="red--text font-weight-bold display-2"> <i class="mdi mdi-tooth"></i>'+item.no_gigi+'</div> dari rujukan ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'secondary',
            confirmButtonText: 'Yes, keluarkan!'
            }).then((response) => {
                if (response.value) {
                        this.$Progress.start();
                        axios.delete('/api/hapus-rujukan/'+item.id).then(()=>{
                        toast.fire({
                            type: 'success',
                            title: 'Rujukan &nbsp;<div class="green--text font-weight-bold body-1"> <i class="mdi mdi-tooth"></i>'+item.no_gigi+' &nbsp;</div>  telah dikeluarkan!!.'
                        })
                        setTimeout(()=>{
                            this.initialize()
                            this.loadingBtn = false
                            this.loadingTB = false
                            this.$Progress.finish()
                        }, 1500)
                        }).catch(()=> {
                            swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                            this.loadingBtn = false
                            this.loadingTB = false
                            this.$Progress.finish();
                        });
                }else{
                    this.loadingBtn = false
                    this.loadingTB = false
                    this.$Progress.finish();
                }
            })
        },

        chooseBanyak(){
            this.modeBanyak = true
            this.dialog = true
        },

        pushGigi(g){
            var index = this.gigiMulti.indexOf(g);
                
            if (index > -1) {
                this.gigiMulti = _.without(this.gigiMulti, g)
                let one = _.difference(ral, this.gigiMulti).length !== 0;
                let two = _.difference(rar, this.gigiMulti).length !== 0;
                let three = _.difference(rbr, this.gigiMulti).length !== 0;
                let four = _.difference(rbl, this.gigiMulti).length !== 0;
                if(one){
                    this.toggleOneIcon = false
                }
                if(two){
                    this.toggleTwoIcon = false
                }
                if(three){
                    this.toggleThreeIcon = false
                }
                if(four){
                    this.toggleFourIcon = false
                }
            }else{
                this.gigiMulti.push(g)
                let one = _.difference(ral, this.gigiMulti).length === 0;
                let two = _.difference(rar, this.gigiMulti).length === 0;
                let three = _.difference(rbr, this.gigiMulti).length === 0;
                let four = _.difference(rbl, this.gigiMulti).length === 0;
                if(one){
                    this.toggleOneIcon = true
                }
                if(two){
                    this.toggleTwoIcon = true
                }
                if(three){
                    this.toggleThreeIcon = true
                }
                if(four){
                    this.toggleFourIcon = true
                }
            }
            
        },

        cekGM(g){
            let gm = this.gigiMulti
            let inc = gm.includes(g)
            return inc
        },

        cekRahang(gigi){
            let incRahang = this.setRahang.includes(gigi)

            return incRahang
        },

        toggleOne(){
            if(!this.toggleOneIcon){
                this.gigiMulti = _.union(this.gigiMulti, ral)
                this.toggleOneIcon = true
            }else{
                var arr = this.gigiMulti
                for(let i=0;i<ral.length;i++){
                    var index = arr.indexOf(ral[i]);
                
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
                this.toggleOneIcon = false
            }
        },
        toggleTwo(){
            if(!this.toggleTwoIcon){
                this.gigiMulti = _.union(this.gigiMulti, rar)
                this.toggleTwoIcon = true
            }else{
                var arr = this.gigiMulti
                for(let i=0;i<rar.length;i++){
                    var index = arr.indexOf(rar[i]);
                
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
                this.toggleTwoIcon = false
            }
        },

        toggleThree(){
            if(!this.toggleThreeIcon){
                this.gigiMulti = _.union(this.gigiMulti, rbr)
                this.toggleThreeIcon = true
            }else{
                var arr = this.gigiMulti
                for(let i=0;i<rbr.length;i++){
                    var index = arr.indexOf(rbr[i]);
                
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
                this.toggleThreeIcon = false
            }
        },

        toggleFour(){
            if(!this.toggleFourIcon){
                this.gigiMulti = _.union(this.gigiMulti, rbl)
                this.toggleFourIcon = true
            }else{
                var arr = this.gigiMulti
                for(let i=0;i<rbl.length;i++){
                    var index = arr.indexOf(rbl[i]);
                
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
                this.toggleFourIcon = false
            }
        },

    },
    mounted(){
        this.initialize()
        this.$store.dispatch('fetchKondisiT')
        this.$store.dispatch('fetchDiags')
        this.$store.dispatch('fetchTindakL')
    },

  }
</script>

<style>
    .gigi-ganal:before{
        font-size: 2em !important;
    }
    .norgiMob{
        height: 300px;
    }
    .norgiPC{
        height: 250px;
    }
    .toggleIcon{
        cursor: pointer;
    }
</style>