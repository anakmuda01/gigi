<template>
  <div>
    <v-card>
        <v-toolbar
        color="indigo darken-3"
        dark
        card
        >
            <v-toolbar-title :class="{'subheading': $vuetify.breakpoint.xs}">
                <v-layout>
                    <v-icon class="mr-2">flag</v-icon>
                    <div>
                        Daftar Kondisi Gigi
                    </div>
                </v-layout>
            </v-toolbar-title>
        </v-toolbar>
        <v-toolbar flat color="white" class="pb-2 pt-1">
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Cari Kondisi..."
        single-line
        hide-details
        clearable
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xs" persistent>
          <template v-slot:activator="{ on }">
              <v-btn fab small :disabled="loadingBtn" color="secondary" v-on="on">
                  <v-icon
                  medium
                  >
                      flag
                  </v-icon>
              </v-btn>
          </template>
          <v-card height="100%">
            <v-layout column fill-height>
              <v-card-actions class="indigo darken-2">
                  <v-layout wrap row class="headline white--text ml-2">
                    <v-icon dark medium class="mr-2">flag</v-icon>
                    <div>{{ formTitle }}</div>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
              </v-card-actions>

              <v-form
              ref="form"
              lazy-validation
              >
                <v-card-text class="pa-0">
                    <v-container class="px-4 pt-3 pb-5" grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                              <v-text-field 
                              v-model="editedItem.nama_kondisi" 
                              label="Nama Kondisi"
                              maxlength="15"
                              counter
                              prepend-icon="flag"
                              :rules="[rules.required]"
                              clearable
                              :disabled="loadingBtn"
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
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
      :headers="headers"
      :items="kondisis"
      item-key="id"
      :search="search"
      :loading="loadingTB"
      disable-initial-sort
      >
          <template v-slot:items="props">
              <tr>
                <td class="text-xs-center caption">
                  {{props.index+1}}
                </td>
                <td class="text-xs-left text-no-wrap"> 
                  {{ props.item.nama_kondisi | ucWords }}
                </td>
                <td class="justify-center align-center layout px-0">
                  <v-btn
                  :disabled="loadingBtn" 
                  @click="editItem(props.item)" icon small class="mr-1" color="primary"
                  >
                    <v-icon
                      small
                    >
                      edit
                    </v-icon>
                  </v-btn>
                  <v-btn @click="deleteItem(props.item)" icon small color="error"
                    :disabled="loadingBtn"
                  >
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
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Errors from "../../Errors.js";
import _ from 'lodash';

  export default {
    data: () => ({
      dialog: false,
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [
        { text: '#', align: 'left', sortable: false, width: '1%' },
        { text: 'Nama Kondisi', align: 'left', sortable: true, value: 'nama_kondisi' },
        { text: 'Aksi', value: 'name', sortable: false, align: 'center', width: '1%' }
      ],
      errors: new Errors(),
      editedIndex: -1,
      editedItem: {
        nama_kondisi: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
      }
    }),

    computed: {
      ...mapState([
        'kondisis',
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Kondisi' : 'Edit Kondisi'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mounted() {
      this.$store.dispatch('fetchKondisi')
    },

    methods: {

      initialize () {
        this.$store.dispatch('fetchKondisi')
      },

      editItem (item) {
        this.editedIndex = this.kondisis.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.loadingTB = true
        this.loadingBtn = true
        swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <span class="red--text font-weight-bold">'+item.nama_kondisi+'</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
        }).then((response) => {
              if (response.value) {
                    this.$Progress.start();
                    axios.delete('api/kondisi/'+item.id).then(()=>{
                      swal.fire(
                      'Deleted!',
                      'Data dari <span class="green--text font-weight-bold">'+item.nama_kondisi+'</span>  telah terhapus!!.',
                      'success'
                      )
                      setTimeout(()=>{
                        this.initialize()
                        this.loadingTB = false
                        this.loadingBtn = false
                        this.$Progress.finish();
                      }, 3000)
                    }).catch(()=> {
                        this.loadingTB = false
                        this.loadingBtn = false
                        swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                        this.$Progress.finish();
                    });
              }else{
                this.loadingTB = false
                this.loadingBtn = false
                this.$Progress.finish();
              }
        })
      },

      close () {
        this.editedIndex = -1
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.errors = new Errors()
        this.editedItem = {
          nama_kondisi : ''
        }
        this.loadingBtn = false
        this.loadingTB = false
        this.dialog = false
      },

      save () {
        this.loadingTB = true
        this.loadingBtn = true
        if (this.editedIndex > -1) {
          this.$Progress.start();
          if (this.$refs.form.validate()){
            axios.put('api/kondisi/'+this.editedItem.id, this.editedItem).then((response) => {
                setTimeout(()=>{
                  toast.fire({
                    type: 'success',
                    title: 'Data Kondisi berhasil diupdate~'
                  })
                  this.initialize()
                  this.$Progress.finish();
                  this.close()
                },1000)
            }).catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, '+error.response.data.errors.nama_kondisi
              })
              setTimeout(() => {
                this.$Progress.finish();
                this.close()
              }, 3000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.loadingBtn = false
              this.loadingTB = false
            }, 3000)
          }
        } else {
          this.$Progress.start()
          if(this.$refs.form.validate()){
            axios.post('api/kondisi', this.editedItem).then((response)=>{
              setTimeout(()=>{
                toast.fire({
                  type: 'success',
                  title: 'Kondisi berhasil ditambahkan~'
                })
                this.initialize()
                this.$Progress.finish();
                this.close()
              },1000)
            })
            .catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, '+error.response.data.errors.nama_kondisi
              })
              this.errors.record(error.response.data)
              setTimeout(() => {
                this.$Progress.finish();
                this.close()
              }, 3000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.loadingBtn = false
              this.loadingTB = false
            }, 3000)
          }
        }
      },
    },
  }
</script>