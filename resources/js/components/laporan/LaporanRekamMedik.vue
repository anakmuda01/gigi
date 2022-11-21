<template>
    <div>
        <v-toolbar card color="indigo darken-3" dark>
        <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">Rekam Medik</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-form ref="formRujukan">
                <v-layout column :px-4="$vuetify.breakpoint.md || $vuetify.breakpoint.lg" :px-2="$vuetify.breakpoint.xs" pt-4>
                    <v-flex xs12 sm12 md12 py-2>
                        <v-autocomplete
                        v-model="no_rm"
                        hint="Jika pasien tidak ditemukan, silahkan daftarkan pasien tersebut terlebih dahulu."
                        :items="anggotas"
                        label="Pilih Pasien"
                        persistent-hint
                        prepend-icon="account_circle"
                        :filter="customFilter"
                        clearable
                        :rules="[rules.required]"
                        item-value="no_rm"
                        >
                            <template slot="selection" slot-scope="data">
                                <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_rm}} - {{data.item.nama_pasien}}</span>
                            </template>
                            <template slot="item" slot-scope="data">
                                {{data.item.no_rm}} - {{data.item.nama_pasien}}
                            </template>
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs12 py-2>
                        <v-btn block @click="find" color="secondary">
                            <v-icon class="mr-2">
                               search
                            </v-icon>
                            Cari
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

    export default {
        data(){
            return{
                no_rm : '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => (v && v.length >= 3) || 'Min 3 karakter',
                },
            }
        },
        computed: {
            ...mapState([
                'anggotas'
            ]),
        },
        methods: {
            customFilter (item, queryText, itemText) {
                const textOne = item.no_rm.toLowerCase()
                const textTwo = item.nama_pasien.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            find(){
                if(this.no_rm){
                    this.$router.push({ path: `/rekam-medik/${this.no_rm}` })
                }else{
                    toast.fire({
                        type: 'warning',
                        title: 'Silahkan pilih pasien !'
                    })
                }
            }
        },
        mounted() {
            this.$store.dispatch('fetchSet');
            this.$store.dispatch('fetchAnggota')
        }
    }

</script>