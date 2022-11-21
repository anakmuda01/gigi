<template>
  <div>
    <v-toolbar flat color="white" class="pb-2 pt-1">
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Cari Pasien..."
        single-line
        hide-details
        clearable
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog :fullscreen="$vuetify.breakpoint.xs" v-model="dialog" max-width="840px" height="100%" persistent>
          <template v-slot:activator="{ on }">
            <v-btn fab small :disabled="loadingBtn" color="secondary" v-on="on">
                <v-icon
                medium
                >
                    person_add
                </v-icon>
            </v-btn>
          </template>
          <v-card> 
            <v-card-actions class="indigo darken-2">
                <v-layout wrap row class="headline white--text ml-2">
                  <v-icon dark medium class="mr-2">person</v-icon>
                  <div>{{ formTitle }}</div>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
            </v-card-actions>

            <v-form ref="form">
              <v-card-text class="pa-0">
                <v-container class="px-4 pt-3 pb-5" grid-list-md>
                    <v-layout justify-space-between wrap>
                      <v-flex xs12 sm12 md12 order-md1 order-xs1 v-if="editedIndex > -1">
                        <v-text-field
                        disabled
                        prepend-icon="supervised_user_circle"
                        label="Pilih Keluarga"
                        :value="editedItem.keluarga.no_keluarga +' - '+ editedItem.keluarga.nama_kepala"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12 order-md1 order-xs1 v-if="editedIndex == -1">
                        <v-autocomplete
                        v-model="editedItem.kepala"
                        hint="Jika keluarga tidak ditemukan, silahkan daftarkan keluarga tersebut terlebih dahulu."
                        :items="keluargas"
                        label="Pilih Keluarga"
                        persistent-hint
                        prepend-icon="supervised_user_circle"
                        :filter="customFilter"
                        clearable
                        :rules="[rules.required]"
                        >
                        <template slot="selection" slot-scope="data">
                          <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.no_keluarga}} - {{data.item.nama_kepala}}</span>
                        </template>
                        <template slot="item" slot-scope="data">
                          {{data.item.no_keluarga}} - {{data.item.nama_kepala}}
                        </template>
                        </v-autocomplete>
                      </v-flex>
                  
                      <v-flex xs12 sm12 md5 align-content-end order-md2 order-xs2>
                        <v-text-field
                        :disabled="editedIndex > -1" 
                        readonly
                        v-model="editedItem.no_rm" 
                        label="No Rekam Medik"
                        append-icon="settings"
                        @click:append="random"
                        hint="Click icon gear untuk mengisi no rekam medik."
                        prepend-icon="contacts"
                        clearable
                        :rules="[rules.required]"
                        >
                        </v-text-field>
                      </v-flex>
                  
                      <v-flex xs12 sm12 md5 order-md3 order-xs3>
                        <v-text-field 
                        v-model="editedItem.nama_pasien" 
                        label="Nama Pasien"
                        maxlength="25"
                        counter
                        prepend-icon="person_pin"
                        clearable
                        :rules="[rules.required, rules.min]"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md4 order-xs4>
                        <v-select
                        label="Jenis Pasien"
                        :items="jenis"
                        v-model="editedItem.jenis_pasien"
                        prepend-icon="stars"
                        :rules="[rules.required]"
                        >
                        </v-select>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md5 order-xs5>
                        <v-text-field 
                        v-model="editedItem.tempat_lahir" 
                        label="Tempat Lahir"
                        maxlength="25"
                        counter
                        prepend-icon="place"
                        clearable
                        :rules="[rules.required, rules.min]"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md6 order-xs9>
                        <v-text-field 
                        v-model="editedItem.pekerjaan" 
                        label="Pekerjaan"
                        maxlength="25"
                        counter
                        prepend-icon="work"
                        clearable
                        :rules="[rules.required]"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md7 order-xs6>
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="editedItem.tanggal_lahir"
                          persistent
                          lazy
                          full-width
                          width="290px"
                          prepend-icon="date_range"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              :value="tglTerformat"
                              label="Tanggal Lahir"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              :rules="[rules.required]"
                            ></v-text-field>
                          </template>
                          <v-date-picker ref="picker" min="1950-01-01" locale="id" v-model="editedItem.tanggal_lahir" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Batal</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.tanggal_lahir)">Oke</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md8 order-xs11>
                        <v-text-field 
                        v-model="editedItem.no_hp" 
                        label="No Telpon"
                        maxlength="12"
                        counter
                        prepend-icon="phone"
                        clearable
                        :rules="[rules.required, rules.numberOnly]"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md9 order-xs7>
                        <v-select
                        label="Jenis Kelamin"
                        :items="['L','P']"
                        v-model="editedItem.jenis_kelamin"
                        prepend-icon="wc"
                        :rules="[rules.required]"
                        >
                        </v-select>
                      </v-flex>

                      <v-flex xs12 sm12 md5 order-md10 order-xs10>
                        <v-text-field 
                        v-model="editedItem.id_telegram" 
                        label="ID Telgram (optional)"
                        maxlength="30"
                        counter
                        prepend-icon="mdi-telegram"
                        clearable
                        ></v-text-field>
                      </v-flex>
                      
                      <v-flex xs12 sm12 md5 order-md11 order-xs8>
                        <v-select
                        label="Status"
                        :items="stat"
                        v-model="editedItem.status"
                        prepend-icon="favorite"
                        :rules="[rules.required]"
                        >
                        </v-select>
                      </v-flex>

                      <v-flex xs12 sm12 md12 order-md12 order-xs12>
                        <v-textarea
                          v-model="editedItem.alamat"
                          label="Alamat"
                          maxlength="70"
                          counter
                          clearable
                          prepend-icon="home"
                          rows="1"
                          auto-grow
                          :rules="[rules.required]"
                        ></v-textarea>
                      </v-flex>

                    </v-layout>
                </v-container>
              </v-card-text>
            </v-form>

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
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
    :headers="headers"
    :items="anggotas"
    item-key="no_rm"
    :search="search"
    disable-initial-sort
    :loading="loadingTB"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded" :class="props.expanded ? 'grey lighten-3' : ''">
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
          <td class="text-xs-left" :class="{'font-weight-bold': props.expanded}"> 
            {{ props.item.no_rm }}
          </td>
          <td class="text-xs-left text-no-wrap">{{ props.item.nama_pasien | ucWords }}</td>
          <td class="text-xs-left text-no-wrap">{{ props.item.jenis_pasien }}</td>
          <td @click.stop="" class="justify-center align-center layout px-0">
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
          <v-layout justify-center class="grey lighten-4 text-xs-left" pa-1>
            <v-flex
              xs12
              sm12
              md8
              lg8
            >
              <v-card :width="$vuetify.breakpoint.xs ? '65%' : '100%'">
                <v-layout wrap column class="pa-1">
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card-title class="py-1 px-3"><h4><v-icon small>layers</v-icon> Data Lengkap: <span class="green--text text--darken-3">[ {{props.item.no_rm}} ]</span> <span class="font-weight-light">{{ props.item.nama_pasien }}</span></h4>
                    </v-card-title>
                  </v-flex>
                  <v-divider></v-divider>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">KK/No. Keluarga</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.keluarga.nama_kepala}} / {{ props.item.keluarga.no_keluarga}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">TTL</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{props.item.tempat_lahir}}, {{ props.item.tanggal_lahir | tgLahir }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">Umur</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.tanggal_lahir | umur }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">Jenis Kelamin</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.jenis_kelamin | gender}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">Telepon</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.no_hp }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">ID Telegram</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.id_telegram ? props.item.id_telegram : 'Belum Diisi' }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content class="font-weight-bold">Pekerjaan</v-list-tile-content>
                        <v-list-tile-content class="align-end pr-1">{{ props.item.pekerjaan }}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-divider></v-divider>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card-text class="font-weight-bold py-2">Alamat</v-card-text>
                    <v-card-text class="pt-0">{{props.item.alamat}}</v-card-text>
                  </v-flex>
                  <v-divider></v-divider>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card-actions class="py-3 px-3">
                      <v-btn color="warning" @click="printKartu(props.item)"><v-icon :class="{'mr-2': !$vuetify.breakpoint.xs}">print</v-icon> <span v-if="!$vuetify.breakpoint.xs">Cetak Kartu</span></v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" :to="'/rekam-medik/'+ props.item.no_rm"><v-icon :class="{'mr-2' : !$vuetify.breakpoint.xs}">assignment</v-icon> <span v-if="!$vuetify.breakpoint.xs">Rekam Medik</span></v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
    </v-data-table>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import Errors from "../../../Errors.js";
import jsPDF from 'jspdf';
import format from 'date-fns/format';
import id from 'date-fns/locale/id';
import Person from "./../../../Person.js";
import imgApotek from './../../core/img.js';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const now = a.join('-')

  export default {
    data: () => ({
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      cok: false,
      today: now,
      dialog: false,
      modal: false,
      loadingTB: false,
      loadingBtn: false,
      search: null,
      headers: [
        { text: '#', align: 'left', sortable: false, value: 'no_rm', width: '1%' },
        { text: 'No. RM', align: 'left', sortable: true, value: 'no_rm', width: '1%'},
        { text: 'Nama Pasien', align: 'left', sortable: true, value: 'nama_pasien' },
        { text: 'Jenis Pasien', align: 'left', sortable: true, value: 'jenis_pasien' },
        { text: 'Aksi', value: 'name', sortable: false, align: 'center', width: '1%' }
      ],
      jenis: ['Umum','Inhealth','AP','Lainnya'],
      stat: ['Suami','Istri','Anak','Lainnya'],
      errors: null,
      editedIndex: -1,
      editedItem: {
        kepala: null,
        no_rm: null,
        nama_pasien: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        no_hp:'',
        pekerjaan: '',
        id_telegram: '',
        jenis_pasien: '', 
        jenis_kelamin: '',
        status: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
        numberOnly: v => !isNaN(v) || 'Hanya Nomor yang diperbolehkan...'
      }
    }),

    computed: {
      ...mapState([
        'keluargas',
        'anggotas',
        'setItem'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Pasien' : 'Edit Data Pasien'
      },
      tglTerformat () {
        return this.editedItem.tanggal_lahir ? format(this.editedItem.tanggal_lahir, 'DD MMMM YYYY', {locale: id}) : ''
      }
    },

    watch: {
      modal (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },

    mounted() {
      this.initialize()
      this.$store.dispatch('fetchSet');
    },

    methods: {
      random(){
        let bar = this.today.split('-')
        let foo = bar[2].slice(2,4)+bar[0]+bar[1]
        let dom = foo+Math.floor(Math.random()*(999-100+1)+100)
        let c = this.anggotas.find(f => f.no_rm === dom)
        if(!c){
          return this.editedItem.no_rm = dom
        }
      },
      initialize () {
        this.$store.dispatch('fetchKeluarga')
        this.$store.dispatch('fetchAnggota')
      },

      customFilter (item, queryText, itemText) {
        const textOne = item.no_keluarga.toLowerCase()
        const textTwo = item.nama_kepala.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },

      editItem (item) {
        this.editedIndex = this.anggotas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      loading(){
        this.loadingTB = true
        this.loadingBtn = true
      },

      ready(){
        this.loadingTB = false
        this.loadingBtn = false
      },

      deleteItem (item) {
        this.loading()
        swal.fire({
        title: 'Anda yakin?',
        html: 'Hapus data dari <span class="red--text font-weight-bold">['+item.no_rm+'] '+item.nama_pasien+'</span> <br> Data yang sudah dihapus tidak bisa dikembalikan lagi',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, hapus!'
        }).then((response) => {
              if (response.value) {
                    this.$Progress.start();
                    axios.delete('api/anggota/'+item.id).then(()=>{
                      swal.fire(
                      'Deleted!',
                      'Data dari <span class="green--text font-weight-bold">['+item.no_rm+'] '+item.nama_pasien+'</span>  telah terhapus!!.',
                      'success'
                      )
                      setTimeout(()=>{
                        this.$Progress.finish();
                        this.initialize()
                        this.ready()
                      }, 2000)
                    }).catch(()=> {
                        swal.fire("Gagal!", "Ada sesuatu yang salah.", "warning");
                        this.ready()
                        this.$Progress.finish();
                    });
              }else{
                this.ready()
                this.$Progress.finish();
              }
        })
      },

      close () {
        this.ready()
        this.dialog = false
        setTimeout(()=>{
          this.editedIndex = -1
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          this.editedItem = {
            kepala: null,
            no_rm: null,
            nama_pasien: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            alamat: '',
            no_hp:'',
            pekerjaan: '',
            id_telegram: '',
            jenis_pasien: '', 
            jenis_kelamin: '',
            status: ''
          }
          this.errors = new Errors()
        },300)
      },

      save () {
        this.loading()
        if (this.editedIndex > -1) {
          this.$Progress.start();
          if (this.$refs.form.validate()){
            axios.put('api/anggota/'+this.editedItem.id, this.editedItem).then((response) => {
                this.initialize()
                setTimeout(()=>{
                  this.$Progress.finish();
                  toast.fire({
                    type: 'success',
                    title: 'Data Pasien berhasil diupdate~'
                  })
                  this.close()
                },1500)
            }).catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              setTimeout(() => {
                this.$Progress.finish();
                this.close()
              }, 5000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 1500)
          }
        } else {
          this.$Progress.start()
          if(this.$refs.form.validate()){
            axios.post('api/anggota', this.editedItem).then((response)=>{
              this.initialize()
              setTimeout(()=>{
                this.$Progress.finish();
                toast.fire({
                  type: 'success',
                  title: 'Pasien berhasil ditambahkan~'
                })
                this.close()
              },1500)
            })
            .catch( (error) => {
              toast.fire({
                type: 'warning',
                title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
              })
              this.errors.record(error.response.data)
              setTimeout(() => {
                this.close()
                this.$Progress.finish();
              }, 5000)
            })
          }else{
            setTimeout(() => {
              this.$Progress.finish();
              this.ready()
            }, 1500)
          }
        }
      },

      printKartu(item){
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

        var doc = new jsPDF('l','mm',[90, 55])

        var totalPagesExp = "{total_pages_count_string}";
        var son = new Person()

        doc.setFontSize(4);
        doc.setFontStyle('bold');
        doc.myText(this.setItem.InkjetA,{align: "center"},0,2);
        doc.setFontSize(4);
        doc.addImage(imgApotek, 'JPEG', 1, 1, 2, 3)
        doc.myText(this.setItem.InkjetB,{align: "center"},0,3.2);
        doc.setFontSize(3);
        doc.setFontStyle('normal');
        doc.myText(this.setItem.InkjetC,{align: "center"},0,4.5);
        doc.setFontSize(2);
        doc.setFontStyle('italic');
        doc.myText(this.setItem.InkjetD,{align: "center"},0,5.5);
        doc.line(1,6,doc.internal.pageSize.width-1,6);

        doc.setFontSize(4);
        doc.setFontStyle('bold');
        doc.myText("KARTU BEROBAT",{align: "center"},0,8);

        doc.setFontSize(4);
        doc.setFontStyle('normal');
        doc.text("No. RM",1,10);
        doc.setFontStyle('bold');
        doc.text(": "+item.no_rm,10,10);
        doc.setFontStyle('normal');
        doc.text("Nama",1,11.8);
        doc.text(": "+item.nama_pasien,10,11.8);
        doc.text("TTL",1,13.3);
        doc.setFontSize(3);
        doc.text(":  "+item.tempat_lahir+', '+son.tglIndo(item.tanggal_lahir),10,13.3);
        doc.setFontSize(4);
        doc.text("Jenis Kelamin",1,14.8);
        doc.text(": "+item.jenis_kelamin,10,14.8);

        doc.setFontSize(4);
        doc.setFontStyle('bold');
        doc.myText("** HARAP DIBAWA BILA BEROBAT **",{align: "center"},0,18.5);

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

      closePrint(){
        this.modalPrint = false
        this.sumberPDF = null
      },
    }
  }
</script>