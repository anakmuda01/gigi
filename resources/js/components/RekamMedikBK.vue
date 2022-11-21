<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>
                    <div>
                        <v-btn to="/rekam_medik/0427543">Fathurrahman Sholihin</v-btn>
                        <v-btn to="/rekam_medik/0427342">Sholehati</v-btn>
                    </div>
                    <div>
                    <v-autocomplete
                        v-model="ituloh"
                        hint="Jika pasien tidak ditemukan, silahkan daftarkan pasien tersebut terlebih dahulu."
                        :items="pas"
                        label="Pilih Pasien"
                        persistent-hint
                        prepend-icon="account_circle"
                        clearable
                        append-outer-icon="settings"
                        @change="cariPasien()"
                        :filter="customFilter"
                    >
                        <template slot="selection" slot-scope="data">
                        {{data.item.no_rm}} - {{data.item.nama_pasien}}
                        </template>
                        <template slot="item" slot-scope="data">
                        {{data.item.no_rm}} - {{data.item.nama_pasien}}
                        </template>
                    </v-autocomplete>
                    </div>
                    <br>
                    <div class="card-body">
                       Pasien :  {{ $route.params.id }}
                    </div>
                    <div>
                        {{cok}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pasiens from './tes';
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return{
                ituloh: '',
                konten: '',
                cok : '',
                pas : pasiens,
            }
        },
        created() {
            this.setData()
            this.getContent(this.$route.params.id)
        },
        methods: {
        customFilter (item, queryText, itemText) {
                const textOne = item.no_rm.toLowerCase()
                const textTwo = item.nama_pasien.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            setData(){
                let x = this.pas.findIndex( (x) => x.no_rm === this.$route.params.id )
                this.ituloh = this.pas[x]
            },
            getContent(id){
                let x = this.pas.findIndex( (x) => x.no_rm === id )
                return this.cok = this.pas[x]
            },
            cariPasien(){
                // let x = this.pas.findIndex( (x) => x.no_rm === this.ituloh.no_rm )
                if(this.ituloh) {
                    let x = this.ituloh.no_rm
                    this.$router.push({ path: `/rekam_medik/${x}` })
                }
            },
        },
        beforeRouteUpdate (to, from, next) {
            this.getContent(this.$route.params.id);
            next();
        },
        watch: {
            '$route' (to, from) {
                this.getContent(this.$route.params.id);
            },
            ituloh: function () {
                if(!this.ituloh){
                    let x = this.pas.findIndex( (x) => x.no_rm === this.$route.params.id )
                    this.ituloh = this.pas[x]
                }
            }
        }
    }
</script>