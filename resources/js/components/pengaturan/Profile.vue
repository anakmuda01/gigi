<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-card>
            <v-card-text>
                <v-text-field
                v-model="jabatan"
                :counter="15"
                :rules="rules"
                label="Jabatan"
                required
                maxlength="15"
                ></v-text-field>

                <v-text-field
                v-model="atas_nama"
                :counter="29"
                :rules="rules"
                label="Atas Nama"
                maxlength="29"
                required
                ></v-text-field>

                <v-text-field
                v-model="no_sip"
                :counter="20"
                :rules="rules"
                label="No SIP"
                maxlength="20"
                required
                ></v-text-field>

                <v-text-field
                v-model="kota"
                :counter="14"
                :rules="rules"
                label="Kota"
                maxlength="14"
                required
                ></v-text-field>

                <v-text-field
                :counter="30"
                v-model="slogan"
                :rules="rules"
                label="Slogan"
                maxlength="30"
                required
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn class="ml-2"
                :loading="loadingBtn"
                :disabled="loadingBtn"
                color="primary"
                @click="simpanProfile"
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
        </v-card>

    </v-form> 
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex';
    export default {
        data(){
            return {
                valid : true,
                loadingBtn : false,
                editItem : {
                    jabatan : '',
                    atas_nama : '',
                    no_sip: '',
                    slogan : '',

                },
                rules: [
                    v => !!v || 'required',
                    v => (v && v.length >= 3) || 'min 3 karakter'
                ],
            }
        },

        computed: {
            ...mapState([
                'setItem',
            ]),
            jabatan : {
                get(){
                    this.editItem.jabatan = this.setItem.jabatan
                    return this.setItem.jabatan
                },
                set(val){
                    this.editItem.jabatan = val
                }
            },
            atas_nama : {
                get(){
                    this.editItem.atas_nama = this.setItem.atas_nama
                    return this.setItem.atas_nama
                },
                set(val){
                    this.editItem.atas_nama = val
                }
            },
            no_sip : {
                get(){
                    this.editItem.no_sip = this.setItem.no_sip
                    return this.setItem.no_sip
                },
                set(val){
                    this.editItem.no_sip = val
                }
            },
            kota : {
                get(){
                    this.editItem.kota = this.setItem.kota
                    return this.setItem.kota
                },
                set(val){
                    this.editItem.kota = val
                }
            },
            slogan : {
                get(){
                    this.editItem.slogan = this.setItem.slogan
                    return this.setItem.slogan
                },
                set(val){
                    this.editItem.slogan = val
                }
            },
        },

        methods : {
            initialize () {
                this.$store.dispatch('fetchSet')
            },
            simpanProfile(){
                this.$Progress.start();
                this.loadingBtn = true;
                if (this.$refs.form.validate()){
                    axios.post('api/store-profile', this.editItem).then((response) => {
                        this.initialize()
                        setTimeout(()=>{
                            this.$Progress.finish();
                            toast.fire({
                                type: 'success',
                                title: 'Data profile berhasil diupdate~'
                            })
                            this.loadingBtn = false
                        },1500)
                    }).catch( (error) => {
                        toast.fire({
                            type: 'warning',
                            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
                        })
                        setTimeout(() => {
                            this.$Progress.finish();
                            this.loadingBtn = false
                        }, 2000)
                    })
                }else{
                    setTimeout(() => {
                        this.$Progress.finish();
                        this.loadingBtn = false
                    }, 1500)
                }
            }
        },

        mounted() {
            this.$store.dispatch('fetchSet');
        },
    }
</script>