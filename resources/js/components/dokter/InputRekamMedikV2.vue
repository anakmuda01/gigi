<template>
    <div class="pa-0">
        <v-toolbar card color="indigo darken-3" dark>
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Input Rekam Medik Pasien</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">5 Mei 2019</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat color="indigo darken-3" dark>
            <v-btn :small="$vuetify.breakpoint.xs" class="mr-0" color="yellow" light to="/aksi_dokter_gigi">Pasien</v-btn>
            <v-icon :small="$vuetify.breakpoint.xs" class="px-2">chevron_right</v-icon>
            <span :class="{'caption': $vuetify.breakpoint.xs}" class="subheading yellow--text text--lighten-1"><b>[ {{$route.params.id}} ] Muhammad Sholihin Tampan</b></span>
            <v-spacer></v-spacer>
        </v-toolbar>
        <div>{{keluhan}}</div>
        <v-card flat>
            <v-expansion-panel
            v-model="panel"
            expand
            >
                <v-expansion-panel-content
                    expand-icon="arrow_drop_down"
                >
                    <template v-slot:header>
                    <v-card-actions class="pa-0"><v-icon class="mr-2">record_voice_over</v-icon>Keluhan / Permintaan</v-card-actions>
                    </template>
                    <v-card>
                        <v-card-text class="px-4 py-2 grey lighten-3">
                            <v-textarea
                            v-model="keluhan"
                            maxlength="80"
                            label="Keluhan / Permintaan Pasien"
                            counter
                            clearable
                            rows="1"
                            auto-grow
                            prepend-icon="record_voice_over"
                            ></v-textarea>
                            <v-btn class="mx-2"
                            :loading="loading1"
                            :disabled="loading1"
                            color="primary"
                            @click="loader = 'loading1'"
                            >
                                <v-icon class="mr-2">save</v-icon>
                                SIMPAN
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content
                    expand-icon="arrow_drop_down"
                >
                    <template v-slot:header>
                    <v-card-actions class="pa-0"><v-icon class="mr-2">accessibility_new</v-icon>Vital Sign</v-card-actions>
                    </template>
                    <v-card>
                        <v-card-text class="px-4 py-2 grey lighten-3">
                            <v-text-field
                            v-model="vital.td"
                            label="Tekanan Darah"
                            clearable
                            prepend-icon="mdi-heart-pulse"
                            suffix="mmHg"
                            ></v-text-field>
                            <v-text-field
                            v-model="vital.gd"
                            label="Gula Darah"
                            clearable
                            prepend-icon="opacity"
                            suffix="mg/dL"
                            ></v-text-field>
                            <v-btn class="mx-2"
                            :loading="loading2"
                            :disabled="loading2"
                            color="primary"
                            @click="loader = 'loading2'"
                            >
                                <v-icon class="mr-2">save</v-icon>
                                SIMPAN
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content
                    expand-icon="arrow_drop_down"
                >
                    <template v-slot:header>
                    <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-stethoscope</v-icon>Pemeriksaan dan Diagnosa</v-card-actions>
                    </template>
                    <v-card class="px-3 py-4 grey lighten-3">
                        <v-cointainer>
                            <v-layout wrap column grid-list>
                                <v-flex>
                                    <v-layout wrap row>
                                        <v-flex>
                                            <v-layout :justify-end="!$vuetify.breakpoint.xs">
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>18</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>17</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>16</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>15</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>14</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>13</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>12</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="tesGigi" v-on="on" icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>11</span>
                                                </v-tooltip>       
                                            </v-layout>                                                                                                                                                                                                                                                             
                                        </v-flex>
                                        <v-divider vertical></v-divider>
                                        <v-flex>
                                            <v-layout>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">21</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">22</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">23</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">24</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">25</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">26</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">27</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs1 sm1 md1 lg1>
                                                    <v-layout align-center justify-center column>
                                                        <div class="text-md-center">28</div>
                                                        <v-btn icon small>
                                                            <v-icon>mdi-tooth-outline</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-flex>       
                                            </v-layout>                                                                                                                                                                                                                                                             
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                               <v-flex>
                                    <v-layout wrap row>
                                        <v-flex>
                                            <v-layout :justify-end="!$vuetify.breakpoint.xs">
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>       
                                            </v-layout>                                                                                                                                                                                                                                                             
                                        </v-flex>
                                        <v-divider vertical></v-divider>
                                        <v-flex>
                                            <v-layout justify-start>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>
                                                <v-btn icon small>
                                                    <v-icon>mdi-tooth-outline</v-icon>
                                                </v-btn>       
                                            </v-layout>                                                                                                                                                                                                                                                             
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-cointainer>
                    </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content
                    expand-icon="arrow_drop_down"
                >
                    <template v-slot:header>
                    <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-needle</v-icon>Tindakan</v-card-actions>
                    </template>
                    <v-card>
                        <v-card-text class="px-4 grey lighten-3">
                            <v-text-field
                            v-model="keluhan"
                            append-outer-icon="save"
                            clearable
                            @click:append-outer="simpanKeluhan"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content
                    expand-icon="arrow_drop_down"
                >
                    <template v-slot:header>
                    <v-card-actions class="pa-0"><v-icon class="mr-2">mdi-pill</v-icon>Resep Obat</v-card-actions>
                    </template>
                    <v-card>
                        <v-card-text class="px-4 grey lighten-3">
                            <v-text-field
                            v-model="keluhan"
                            append-outer-icon="save"
                            clearable
                            @click:append-outer="simpanKeluhan"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        mounted() {
            console.log('Component mounted.')
        },
        data: () => ({
            items: [
                {
                text: 'Aksi Dokter',
                disabled: false,
                href: 'breadcrumbs_dashboard'
                },
                {
                text: '',
                disabled: false,
                href: 'breadcrumbs_link_1'
                }
            ],
            panel: [false,false,false,false,false],
            loader: null,
            loading1: false,
            loading2: false,
            keluhan: '',
            vital: {
                td: '120/80',
                gd: '80',
            }
        }),
        created(){
            this.items[1].text = this.$route.params.id
        },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
        },
        methods: {
            simpanKeluhan(){
                alert('simpan keluhan')
            },
            tesGigi(){
                alert('tes gigi')
            }
        }
    }
</script>

<style>
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
</style>