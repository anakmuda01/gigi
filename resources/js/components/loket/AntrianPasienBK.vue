<template>
  <div class="pa-0">

    <v-tabs
    centered
    color="indigo darken-3"
    dark
    icons-and-text
    slider-color="yellow"
    value="antrian_hari_ini"
    >

      <v-tab href="#antrian_hari_ini">
        Antrian Hari Ini
        <v-icon>supervised_user_circle</v-icon>
      </v-tab>

      <v-tab href="#daftar_antrian">
        Daftar Antrian
        <v-icon>account_circle</v-icon>
      </v-tab>

      <v-tabs-items touchless>
        <v-tab-item
        :value="'antrian_hari_ini'"
        >
          <v-data-table
          :headers="headers"
          :items="pasiens"
          class="elevation-1 pa-0"
          hide-actions
          >
            <template v-slot:items="props">
              <tr>
                <td @click="terlayani(props.item)" class="text-xs-center caption"><v-icon medium v-if="props.item.status == 'sudah'" color="green">check_circle</v-icon><v-btn color="grey lighten-3" icon small v-else>{{props.index+1}}</v-btn></td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left text-no-wrap">{{ props.item.nama_pasien }} </td>
                <td :class="{'caption': $vuetify.breakpoint.xs}" class="text-xs-left">{{ props.item.no_rm }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    @click="deleteItem(props.item)"
                    color="red"
                  >
                    delete
                  </v-icon>
                </td>
              </tr>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item
        :value="'daftar_antrian'"
        >
          <v-card flat>
            <v-toolbar flat color="indigo darken-3" dark>
              <v-toolbar-title>26 April 2019</v-toolbar-title>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="grey darken-2" class="mb-2" v-on="on"><v-icon class="mr-2">assignment_ind</v-icon>Antrian</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container py-0 px-0>
                      <v-autocomplete
                        v-model="editedItem"
                        hint="Jika pasien tidak ditemukan, silahkan daftarkan pasien tersebut terlebih dahulu."
                        :items="pasiens"
                        label="Pilih Pasien"
                        persistent-hint
                        prepend-icon="account_circle"
                        :filter="customFilter"
                        clearable
                      >
                        <template slot="selection" slot-scope="data">
                          <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_rm}} - {{data.item.nama_pasien}}</span>
                        </template>
                        <template slot="item" slot-scope="data">
                          {{data.item.no_rm}} - {{data.item.nama_pasien}}
                        </template>
                      </v-autocomplete>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-card>
          
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      isEditing: true,
      headers: [
        {
          text: 'No.',
          align: 'center',
          sortable: false,
          value: 'name',
          width: '1%'
        },
        { text: 'Nama Pasien', value: 'nama_pasien', sortable: false },
        { text: 'No RM', value: 'no_rm', sortable: false},
        { text: 'Actions', align: 'center', value: 'name', sortable: false, width: '1%' }
      ],
      pasiens: [],
      editedIndex: -1,
      editedItem: {
        no_rm: '' ,
        nama_pasien: '',
        status: 'belum',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Antrian' : 'Edit Item'
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
        this.pasiens = [
          {
            no_rm: '08872' ,
            nama_pasien: 'Udin Seudin',
            status: 'sudah',
          },
          {
            no_rm: '08873' ,
            nama_pasien: 'Alex Sealax',
            status: 'belum',
          },
          {
            no_rm: '08874' ,
            nama_pasien: 'Aluh Sealuh',
            status: 'belum',
          },
          {
            no_rm: '08875' ,
            nama_pasien: 'Muha Semuha',
            status: 'belum',
          },
          {
            no_rm: '08876' ,
            nama_pasien: 'Joko Sejoko',
            status: 'belum',
          },
          {
            no_rm: '08877' ,
            nama_pasien: 'Ani Seani',
            status: 'belum',
          },
          {
            no_rm: '08878' ,
            nama_pasien: 'Acil Seacil',
            status: 'belum',
          },
          {
            no_rm: '08879' ,
            nama_pasien: 'Ijum Seijum',
            status: 'belum',
          },
          {
            no_rm: '08880' ,
            nama_pasien: 'Tono Seotno',
            status: 'belum',
          },
          {
            no_rm: '08881' ,
            nama_pasien: 'Anang Seangan',
            status: 'belum',
          },
          {
            no_rm: '0427864' ,
            nama_pasien: 'Muhammad Sholihin Tampan',
            status: 'belum',
          },
        ]
      },

      customFilter (item, queryText, itemText) {
        const textOne = item.no_rm.toLowerCase()
        const textTwo = item.nama_pasien.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },

      resetTerpilih(){

      },

      editItem (item) {
        this.editedIndex = this.pasiens.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.pasiens.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.pasiens.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.pasiens[this.editedIndex], this.editedItem)
        } else {
          this.pasiens.push(this.editedItem)
        }
        this.close()
      },
      
      terlayani(item){
        const index = this.pasiens.indexOf(item)
        Object.assign(this.pasiens[index], this.pasiens[index].status = 'sudah')
      }
    }
  }
</script>

