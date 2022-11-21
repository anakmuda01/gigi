<template>
  <v-app id="users">
    <v-card v-if="$gate.isAdmin()">
      <v-toolbar
      color="indigo darken-3"
      dark
      card
      >
          <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
              <v-layout>
                  <v-icon class="mr-2">mdi-account-switch</v-icon>
                  <div>
                      Manajemen Users
                  </div>
              </v-layout>
          </v-toolbar-title>
      </v-toolbar>
      <v-toolbar card color="white" class="pb-2 pt-1">
          <v-text-field
          v-model="search"
          append-icon="search"
          label="Cari user...."
          single-line
          hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" persistent :fullscreen="$vuetify.breakpoint.xs">
              <template v-slot:activator="{ on }">
                  <v-btn fab small :disabled="loadingBtn" color="secondary" v-on="on">
                      <v-icon
                      medium
                      >
                          mdi-shield-account
                      </v-icon>
                  </v-btn>
              </template>
              <v-card height="100%">
                <v-layout column fill-height>
                  <v-card-actions class="indigo darken-2">
                      <v-layout v-if="formTitle === 'New User'" wrap row class="headline white--text ml-2">
                        <v-icon dark medium class="mr-2">mdi-shield-account</v-icon>
                        <div>{{ formTitle }}</div>
                      </v-layout>
                      <span class="headline white--text" v-else>
                        <v-layout wrap row>
                          <v-icon dark medium class="mr-2">mdi-shield-account</v-icon>
                          <div>{{formTitle}} :</div>
                          <v-icon dark class="ml-3 mr-1">mdi-email</v-icon>
                          <div>{{editedItem.email}}</div>
                        </v-layout>
                      </span>
                      <v-spacer></v-spacer>
                      <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
                  </v-card-actions>

                  <v-form 
                  ref="form"
                  lazy-validation
                  >
                      <v-card-text class="pa-0">
                        <v-container class="px-4 pt-3 pb-3" grid-list-md>
                            <v-layout wrap>
                                <!-- <v-flex xs12 sm12 md12 v-if="editedIndex == -1">
                                  <v-text-field 
                                  v-model="editedItem.email" 
                                  label="Email"
                                  maxlength="50"
                                  counter
                                  prepend-icon="mdi-email"
                                  :rules="[rules.required,rules.email]"
                                  :error-messages="errors.get('email')"
                                  append-icon="settings"
                                  @click:append="cekEmail"
                                  hint="Validasi Email dengan cara click icon gear.."
                                  :error="ev"
                                  :disabled="valid"
                                  ></v-text-field>
                                </v-flex> -->
                                <v-flex xs12 sm12 md12 v-if="editedIndex == -1">
                                  <v-text-field
                                  label="Username"
                                  v-model="editedItem.email"
                                  maxlength="50"
                                  counter
                                  :rules="[rules.required]"
                                  prepend-icon="mdi-email"
                                  @click:append="cekUsername"
                                  hint="Validasi username dengan cara click icon gear.."
                                  :error-messages="errors.get('email')"
                                  :error="ev"
                                  :disabled="valid"
                                  append-icon="settings"
                                  >

                                  </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-select
                                  v-if="editedItem.type !== 'admin'"
                                  :disabled="!valid"
                                  v-model="editedItem.type" 
                                  label="Type"
                                  :items="types"
                                  prepend-icon="mdi-shield-account"
                                  :rules="[rules.required]"
                                  :error-messages="errors.get('type')"
                                  >
                                  </v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                  :disabled="!valid" 
                                  v-model="editedItem.name" 
                                  label="Nama User"
                                  :rules="[rules.required]"
                                  :error-messages="errors.get('name')"
                                  maxlength="25"
                                  counter
                                  prepend-icon="mdi-shield-account"
                                  >
                                  </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <v-text-field
                                  :disabled="!valid" 
                                  v-model="editedItem.password" 
                                  label="Password"
                                  prepend-icon="mdi-shield-key"
                                  type="password"
                                  maxlength="20"
                                  counter
                                  :rules="[rules.required,rules.min]"
                                  :error-messages="errors.get('password')"
                                  ></v-text-field>
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
                      @click="save"
                      :loading="isLoading"
                      :disabled="isLoading"
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
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
      :headers="headers"
      :items="users"
      item-key="no_kg"
      :search="search"
      disable-initial-sort
      :loading="loadingTB"
      >
          <template v-slot:items="props">
              <tr>
                <td class="text-xs-left caption">
                    {{props.index+1}}
                </td>
                <td class="text-xs-left" :class="{'font-weight-bold': props.expanded}"> 
                  {{ props.item.name }}
                </td>
                <td class="text-xs-left text-no-wrap">{{ props.item.email }}</td>
                <td class="text-xs-left text-no-wrap">{{ props.item.type }}</td>
                <td @click.stop="" class="justify-center layout px-0">
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
                  v-if="props.item.type !== 'admin'"
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
      </v-data-table>
    </v-card>

    <v-card flat v-if="!$gate.isAdmin()" class="pa-0 ma-0">
      <not-found></not-found>
    </v-card>

  </v-app>
</template>

<script>
import Errors from "../Errors";

  export default {
    data: () => ({
      dialog: false,
      valid: false,
      ev: false,
      isLoading: false,
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [
        { text: '#', align: 'left', sortable: false, width: '1%' },
        { text: 'Nama User', align: 'left', sortable: true, value: 'name'},
        { text: 'Username', align: 'left', sortable: true, value: 'email' },
        { text: 'type', align: 'left', sortable: true, value: 'type' },
        { text: 'Aksi', sortable: false, align: 'center', width: '1%' }
      ],
      types: ['dokter', 'asisten'],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        type: ''
      },
      errors : new Errors(),
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 6) || 'Min 6 karakter',
        email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Masukkan alamat Email dengan benar.'
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get('/api/user').then((response) => {
          this.users = response.data
        }).catch(error => {})
      },

      editItem (item) {
        if(!this.valid){
          this.valid = true 
        }
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem['password'] = ''
        this.dialog = true
      },

      deleteItem (item) {
        swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <i style="color:red">'+item.email+'</i> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
        }).then((response) => {
              if (response.value) {
                    axios.delete('api/user/'+item.id).then(()=>{
                      this.$Progress.start();
                      this.loadingTB = true
                      this.loadingBtn = true
                      swal.fire(
                      'Deleted!',
                      'Data dari <i style="color:red"> '+item.email+'</i>  telah terhapus!!.',
                      'success'
                      )
                      setTimeout(()=>{
                        this.loadingTB = false
                        this.loadingBtn = false
                        this.$Progress.finish()
                      }, 2000)
                      this.initialize()
                    }).catch(()=> {
                        swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                        this.$Progress.finish();
                    });
              }else{
                this.$Progress.finish();
              }
        })
      },

      close () {
        this.editedIndex = -1
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.errors = new Errors()
        this.valid = false
        this.ev = false
        this.editedItem = {
          name: '',
          email: '',
          password: '',
          type: ''
        }
        this.isLoading = false
        this.dialog = false
      },

      cekEmail(){
        if(this.rules.email(this.editedItem.email) == true){
          let c = this.users.find(f => f.email === this.editedItem.email)
          if(this.editedItem.email === 'admin@admin.com' || this.editedItem.email === 'master@master.com'){
            toast.fire({
                type: 'warning',
                title: 'Maaf, Username tidak dapat digunakan!'
                })
            this.ev = true
            this.valid = false
          }else if(!c){
            toast.fire({
                type: 'success',
                title: 'Selamat Username dapat digunakan~'
                })
            this.ev = false
            this.valid = true
          }else{
            toast.fire({
                type: 'warning',
                title: 'Maaf, Username telah digunakan!'
                })
            this.ev = true
            this.valid = false
          }
        }else{
          toast.fire({
              type: 'warning',
              title: 'Maaf, Username required!'
              })
          this.ev = true
          this.valid = false
        }
      },

      cekUsername(){
        if(this.rules.required(this.editedItem.email) == true){
          let c = this.users.find(f => f.email === this.editedItem.email)
          if(this.editedItem.email === 'admin@admin.com' || this.editedItem.email === 'master@master.com'){
            toast.fire({
                type: 'warning',
                title: 'Maaf, Username tidak dapat digunakan!'
                })
            this.ev = true
            this.valid = false
          }else if(!c){
            toast.fire({
                type: 'success',
                title: 'Selamat Username dapat digunakan~'
                })
            this.ev = false
            this.valid = true
          }else{
            toast.fire({
                type: 'warning',
                title: 'Maaf, Username telah digunakan!'
                })
            this.ev = true
            this.valid = false
          }
        }else{
          toast.fire({
              type: 'warning',
              title: 'Maaf, Username required!'
              })
          this.ev = true
          this.valid = false
        }
      },

      save () {
        this.isLoading = true
        if (this.editedIndex > -1) {
          this.$Progress.start();
          if (this.$refs.form.validate()){
            this.valid = true
            this.ev = false
            axios.put('api/user/'+this.editedItem.id, this.editedItem).then((response) => {
                this.loadingTB = true
                this.loadingBtn = true
                this.close()
                toast.fire({
                  type: 'success',
                  title: 'Data User berhasil diupdate~'
                })
                setTimeout(()=>{
                  this.initialize()
                  this.loadingTB = false
                  this.loadingBtn = false
                  this.$Progress.finish();
                },1000)
            }).catch( (error) => {
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
            setTimeout(() => {
              this.$Progress.finish();
              this.isLoading = false
            }, 1000)
          }
        }else{
          this.$Progress.start();
          if (this.$refs.form.validate() && this.valid) {
            axios.post('api/user', this.editedItem)
            .then((response)=>{
                this.loadingTB = true
                this.loadingBtn = true
                this.close()
                toast.fire({
                  type: 'success',
                  title: 'Data User berhasil ditambahkan~'
                })
                setTimeout(()=>{
                  this.initialize()
                  this.loadingTB = false
                  this.loadingBtn = false
                  this.$Progress.finish();
                },1000)
            })
            .catch( (error) => {
              this.errors.record(error.response.data)
              setTimeout(() => {
                this.$Progress.finish();
              }, 1000)
            })
          }else if(!this.valid){
            toast.fire({
              type: 'warning',
              title: 'Maaf, Silahkan validasi username telebih dahulu dengan cara click icon gear!'
            })
          }else{
            if(this.valid){
              this.valid = true
              this.ev = false
            }else{
              this.valid = false
              this.ev = true
            }
            setTimeout(() => {
              this.$Progress.finish();
            }, 1000)
          }
          setTimeout(() => {
            this.$Progress.finish();
            this.isLoading = false
          }, 1000)
        }
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