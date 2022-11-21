<template>
  <div>
    <v-layout :class="{'px-3 grey lighten-5' : !$vuetify.breakpoint.xs}" py-1>
        <v-flex>
            <v-card>
              <v-card-actions class="yellow lighten-4">
                <v-layout wrap column px-3 py-2>
                  <v-form ref="form" lazy-validation>
                    <v-flex xs12 sm12 md12 lg12 mb-2>
                        <v-autocomplete
                        v-model="editedItem.id_obat"
                        hint="Jika nama obat tidak ditemukan, silahkan daftarkan data obat tersebut terlebih dahulu."
                        :items="obats"
                        label="Pilih Obat"
                        persistent-hint
                        prepend-icon="mdi-pill"
                        clearable
                        item-text="nama_obat"
                        item-value="id"
                        :disabled="loadingBtn"
                        :rules="[rules.required]"
                        chips
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.selected"
                            >
                              <v-avatar color="primary">
                                <v-icon color="white">mdi-atom</v-icon>
                              </v-avatar>
                              {{data.item.nama_obat}}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 mb-2>
                        <v-text-field 
                        v-model="editedItem.jumlah" 
                        label="Jumlah"
                        prepend-icon="mdi-calculator"
                        clearable
                        :disabled="loadingBtn"
                        :rules="[rules.required, rules.numberOnly]"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 mb-3>
                        <v-autocomplete
                          v-model="caraMinum"
                          :disabled="loadingBtn"
                          :items="nginums"
                          chips
                          prepend-icon="mdi-pill"
                          label="Cara Minum Obat"
                          item-text="id"
                          item-value="id"
                          multiple
                          :rules="[rules.reqSelect]"
                          :filter="customFilter"
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.selected"
                              close
                              class="chip--select-multi"
                              @input="remove(data.item)"
                              :disabled="loadingBtn"
                            >
                              <v-avatar color="primary">
                                <span class="white--text">{{ data.item.kode }}</span>
                              </v-avatar>
                              {{data.item.cara}}
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <v-list-tile-avatar :color="caraMinum.find(e => e == data.item.id) ? 'primary' : 'secondary'">
                              <span class="white--text">{{ data.item.kode }}</span>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.cara"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </v-autocomplete>
                    </v-flex>
                  </v-form>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-layout justify-space-between>
                      <v-flex xs2 sm2 md2 lg2>
                        <v-btn class="mx-0"
                        :loading="loadingBtn"
                        :disabled="loadingBtn"
                        color="primary"
                        @click="save"
                        >
                            <v-icon class="mr-2">mdi-cart-arrow-down</v-icon>
                            Tambahkan
                            <template v-slot:loader>
                                <span class="custom-loader">
                                <v-icon light>cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                      </v-flex>
                      <v-flex xs9 sm9 md9 lg9>
                        <v-layout wrap row justify-end>
                          <v-btn class="mr-2"
                          :loading="loadingBtn"
                          :disabled="loadingBtn"
                          color="secondary"
                          fab
                          small
                          @click="printPdf"
                          >
                              <v-icon>print</v-icon>

                              <template v-slot:loader>
                                  <span class="custom-loader">
                                  <v-icon light>cached</v-icon>
                                  </span>
                              </template>
                          </v-btn>
                          <v-btn class="ml-2"
                          :loading="loadingBtn"
                          :disabled="loadingBtn"
                          color="info"
                          @click="send(obatRM)"
                          fab
                          small
                          >
                              <v-icon>mdi-telegram</v-icon>
                              <template v-slot:loader>
                                  <span class="custom-loader">
                                  <v-icon light>cached</v-icon>
                                  </span>
                              </template>
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
              <v-card-text id="printMe">
                <v-data-table
                :headers="headers"
                :items="obatRM.obats"
                item-key="id_obat"
                class="elevation-1"
                hide-actions
                disable-initial-sort
                :loading="loadingTB"
                >
                    <template v-slot:items="props">
                        <tr>
                        <td class="text-xs-left caption">
                            {{props.index+1}}
                        </td>
                        <td class="text-xs-left text-no-wrap"> 
                            {{ props.item.nama_obat }}
                        </td>
                        <td class="text-xs-left">{{ props.item.pivot.jumlah}}</td>
                        <td class="text-xs-left">{{ props.item.pivot.cara_minum}}</td>
                        <td @click.stop="" class="justify-center align-center layout px-0">
                            <v-btn
                            :disabled="loadingBtn" 
                            @click="deleteItem(props.item)" icon small color="error"
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
              </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
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
                <v-btn icon dark class="orange darken-2" flat @click="closeResep"><v-icon>close</v-icon></v-btn>
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
            <!-- <iframe id="pdf_preview" type="application/pdf" :src="sumberPDF" width="100%" height="91%"></iframe> -->
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import jsPDF from 'jspdf';
  import format from 'date-fns/format';
  import id from 'date-fns/locale/id';
  import myfont from './../../core/myfont.js';
  
  const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
  const a = h.split('/');
  const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
    props: ['id'],
    data: () => ({
      today: now,
      loadingTB: false,
      loadingBtn: false,
      modalPrint: false,
      sumberPDF: null,
      readyPDF: false,
      errorPDF: false,
      caraMinum: [],
      headers: [
        { text: '#', align: 'left', sortable: false, value: 'id', width: '1%' },
        { text: 'Nama Obat', align: 'left', sortable: true, value: 'nama_obat', width: '1%'},
        { text: 'Jumlah', align: 'left', sortable: true, value: 'jumlah' },
        { text: 'Cara Minum', align: 'left', sortable: true, value: 'cara_minum' },
        { text: 'Aksi', value: 'name', sortable: false, align: 'center', width: '1%' }
      ],
      rules: {
        reqSelect : v => v.length > 0 || 'Required.',
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 3) || 'Min 3 karakter',
        numberOnly: v => !isNaN(v) || 'Hanya Nomor yang diperbolehkan...'
      },
      editedIndex: -1,
      editedItem: {
        id_obat: '',
        jumlah : ''
      },
    }),

    computed: {
      ...mapState([
          'obatRM',
          'obats',
          'nginums',
          'setItem'
      ]),
    }, 

    methods: {
      initialize () {
          this.$store.dispatch('fetchObatRM', {
              no_rm: this.$route.params.id
          })
      },

      remove (item) {
        const index = this.caraMinum.indexOf(item.id)
        if (index >= 0) this.caraMinum.splice(index, 1)
      },

      customFilter (item, queryText, itemText) {
        const textOne = item.kode.toLowerCase()
        const textTwo = item.cara.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      

      deleteItem (item) {
          swal.fire({
          title: 'Anda yakin?',
          html: 'Hapus data dari Resep Obat : <div class="red--text font-weight-bold headline"> <i class="mdi mdi-pill"></i>'+item.nama_obat+'</div> Data yang sudah dihapus tidak bisa dikembalikan lagi',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, hapus!'
          }).then((response) => {
              if (response.value) {
                      this.$Progress.start();
                      this.loadingBtn = true
                      this.loadingTB = true
                      axios.post('/api/hapus-resep/'+item.id, {no_rm: this.id}).then(()=>{
                      swal.fire(
                      'Deleted!',
                      'Data dari <div class="green--text font-weight-bold headline"> <i class="mdi mdi-pill"></i>'+item.nama_obat+'</div>  telah terhapus!!.',
                      'success'
                      )
                      setTimeout(()=>{
                          this.initialize()
                          this.loadingBtn = false
                          this.loadingTB = false
                          this.$Progress.finish()
                      }, 1000)
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

      close () {
          this.editedIndex = -1
          this.$refs.form.reset()
          this.caraMinum = []
          this.loadingBtn = false
          this.loadingTB = false
      },

      closeResep(){
        this.modalPrint = false
        this.sumberPDF = null
      },

      save () {
        this.$Progress.start()
        this.loadingTB = true
        this.loadingBtn = true
        if(this.$refs.form.validate()){
          axios.post('/api/tambah-resep/'+this.id, {obat: this.editedItem, how: this.caraMinum}).then((response)=>{
            if(response.data.msg !== 'exist'){
              setTimeout(()=>{
                toast.fire({
                  type: 'success',
                  title: 'Obat berhasil ditambahkan ke list Resep~'
                })
                this.initialize()
                this.close()
                this.$Progress.finish();
              },1000)
            }else{
              setTimeout(()=>{
                toast.fire({
                  type: 'info',
                  title: 'Jumlah Obat <span class="info--text font-weight-bold ml-1 mr-1">'+response.data.obat+'</span> berhasil di update~'
                })
                this.initialize()
                this.close()
                this.$Progress.finish();
              },1000)
            }
          })
          .catch( (error) => {
            toast.fire({
              type: 'warning',
              title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
            })
            this.errors.record(error.response.data)
            setTimeout(() => {
              this.$Progress.finish();
              this.close()
            }, 5000)
          })
        }else{
          setTimeout(() => {
            this.$Progress.finish();
            this.loadingTB = false
            this.loadingBtn = false
          }, 1000)
        }
      },

      printPdf(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
          var docMobile = new jsPDF({
            unit: 'mm',
            format: [58, 297]
          })

          docMobile.setFontSize(8);
          docMobile.text(0,2, this.setItem.posA)
          docMobile.setFontSize(8);
          docMobile.text(0,4, this.setItem.posB)
          docMobile.text(0,7,this.setItem.posC)
          docMobile.setFontSize(7);
          docMobile.text(0,9,this.setItem.posD)
          docMobile.text(0,11,this.setItem.posE)
          docMobile.setFontSize(6);
          docMobile.text(0,13,'==============================')
          docMobile.setFontSize(8);
          docMobile.text(0,14,'No.RM           : '+this.obatRM.anggota.no_rm)
          docMobile.text(0,16.4,'Nama Pasien')
          let nama = this.obatRM.anggota.nama_pasien.split(' ');
          if(nama.length > 1){
            if(nama[0].length >= 3){
              docMobile.text(11,16.4,': '+nama[0])
            }else{
              docMobile.text(11,16.4,': '+nama[1])
            }
          }else{
            docMobile.text(11,16.4,': '+this.obatRM.anggota.nama_pasien)
          }
          docMobile.text(0,18,'Tgl Kunjungan   : '+format(this.obatRM.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          docMobile.setFontSize(6);
          docMobile.text(0,19,'==============================')

          docMobile.setFontSize(4);
          docMobile.setFontStyle("normal");
          docMobile.text(0,20.5,'Resep Obat :')
          let obats = this.obatRM.obats
          for(var i=0; i<obats.length; i++){
            docMobile.setFontStyle("normal");
            docMobile.text(0,22.5+i*5,i+1+'. '+obats[i].nama_obat)
            docMobile.setFontStyle("normal");
            let car = docMobile.splitTextToSize(obats[i].pivot.cara_minum, 20)
            if(car.length > 1){
              docMobile.text(1.5,23.9+i*5,''+car[0])
              docMobile.text(1.5,25.3+i*5,''+car[1])
            }else{
              docMobile.text(1.5,23.9+i*5,''+car[0])
            }
            docMobile.setFontStyle("bold");
            docMobile.text(17.4,22.5+i*5,obats[i].pivot.jumlah.toString())
            docMobile.setFontStyle("normal");
            docMobile.text(19.3,22.5+i*5,obats[i].satuan)
            docMobile.setFontStyle("normal");
          }
          
          docMobile.setFontSize(3);
          docMobile.text(7,31,' ')
          docMobile.text(7,32,' ')
          docMobile.text(7,35,this.setItem.jabatan)
          docMobile.text(7,36,' ')
          docMobile.text(7,37,' ')
          docMobile.text(7,38,this.setItem.atas_nama)
          docMobile.text(0,39,'--------------------------------')
          docMobile.text(7,40,'SIP. NO. '+this.setItem.no_sip)
          docMobile.text(7,41,' ')
          docMobile.text(2,42,'* '+this.setItem.slogan+' *')

          let pasien = this.obatRM.anggota.no_rm+'_'+this.obatRM.anggota.nama_pasien+'_'+this.obatRM.tgl_kunjungan
          docMobile.save('RO_'+pasien+'.pdf')

        }else{
          var doc = new jsPDF({
            unit: 'mm',
            format: [68, 297]
          })

          doc.addFileToVFS('dejavu.ttf', myfont)
          doc.addFont('dejavu.ttf', 'dejavu', 'normal');
          doc.setFont('dejavu', 'normal');
          doc.setFontSize(6.5);
          doc.text(0,2,this.setItem.posA)
          doc.setFontSize(6.5);
          doc.text(0,4.4,this.setItem.posB)
          doc.text(0,6.5,this.setItem.posC)
          doc.setFontSize(5);
          doc.text(0,8.8,this.setItem.posD)
          doc.text(0,10.5,this.setItem.posE)
          doc.setFontSize(4);
          doc.text(0,12,'==========================================')
          doc.setFontSize(6.5);
          doc.text(0,14,'No.RM')
          doc.text(11,14,': '+this.obatRM.anggota.no_rm)
          doc.text(0,16.4,'Nama Pasien')
          let nama = this.obatRM.anggota.nama_pasien.split(' ');
          if(nama.length > 1){
            if(nama[0].length >= 3){
              doc.text(11,16.4,': '+nama[0])
            }else{
              doc.text(11,16.4,': '+nama[1])
            }
          }else{
            doc.text(11,16.4,': '+this.obatRM.anggota.nama_pasien)
          }
          doc.text(0,18.8,'Tgl Kunjungan')
          doc.text(11,18.8,': '+format(this.obatRM.tgl_kunjungan, 'DD-MM-YYYY', {locale: id}))
          doc.setFontSize(4);
          doc.text(0,20.4,'==========================================')

          doc.text(0,22.5,'Resep Obat :')
          let obats = this.obatRM.obats
          for(var i=0; i<obats.length; i++){
            doc.setFont('dejavu','normal');
            doc.setFontSize(5.5);
            doc.text(0,25+i*5,'@ '+obats[i].nama_obat)
            doc.setFontSize(4);
            let car = doc.splitTextToSize(obats[i].pivot.cara_minum, 20)
            if(car.length > 1){
              doc.text(1.5,27+i*5,''+car[0])
              doc.text(1.5,29.4+i*5,''+car[1])
            }else{
              doc.text(1.5,27+i*5,''+car[0])
            }
            doc.setFont('helvetica','normal');
            doc.setFontSize(4);
            doc.text(18.7,25+i*5,obats[i].pivot.jumlah.toString())
            doc.setFontSize(2.8);
            doc.text(20.5,25+i*5,obats[i].satuan)
          }

          doc.setFont('dejavu','normal');
          doc.setFontSize(4.7);
          doc.text(5,45,this.setItem.jabatan)
          doc.text(5,48,this.setItem.atas_nama)
          doc.text(0,49.3,'--------------------------------------------------------------------')
          doc.text(5,50.6,'SIP. NO. '+this.setItem.no_sip)
          doc.text(1.8,53.8,'** '+this.setItem.slogan+' **')

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

        }
      },
      send(item){
        if(item.anggota.id_telegram){
          this.$Progress.start()
          this.loadingBtn = true
          var token = "806484516:AAFUhZ4yAO8wGMwbM5GYFl78TES6LciDizQ";
          var url = "https://api.telegram.org/bot" + token;
          var path = "https://photos.app.goo.gl/xc5sZ2ZC8dCKmsKh7";
          var output = []
          var result = item.obats
          for (var i in result ) {
            output.push("<i>@"+result[i].nama_obat+"</i>");
            output.push(" = <b>"+result[i].pivot.jumlah);
            output.push(" "+result[i].satuan+"</b>\n");
            output.push("-Cara Minum : \n");
            output.push(""+result[i].pivot.cara_minum+"\n");
            output.push("-----------------------------------------------------------------\n");
          }
          var text = output.join('');

          var tgl = format(this.today, 'DD MMMM YYYY', {locale: id})

          var uri = "["+this.obatRM.anggota.no_rm+"] "+this.obatRM.anggota.nama_pasien+"\n<b>Resep Obat - "+tgl+" : </b>\n====================================\n";
          var res = encodeURI(uri+text);

          var r = url + "/sendPhoto?chat_id="+item.anggota.id_telegram+"&photo="+path+"&caption="+res+"&parse_mode=html";
          fetch(r).then((response) => {
            if(response.ok){
              setTimeout(()=>{
                swal.fire({
                  type: 'success',
                  title: 'Resep Obat berhasil dirikim~ :)'
                })
                this.loadingBtn = false
                this.$Progress.finish();
              },1000)
            }else{
              setTimeout(()=>{
              swal.fire({
                type: 'error',
                title: 'Gagal Mengirim~ ID Telegram yang dimasukkan Sudah Benar??'
              })
              this.loadingBtn = false
              this.$Progress.finish();
            },1000)
            }
          }).catch((error)=>{
            swal.fire({
              type: 'error',
              title: 'No Internet Connection~ :('
            })
            this.loadingBtn = false
            this.$Progress.finish();
          });
        }else{
          swal.fire({
            type: 'warning',
            title: 'ID Telegram pasien belum diisi~ :)'
          })
        }
      }
    },
    mounted(){
      this.initialize()
      this.$store.dispatch('fetchObats')
      this.$store.dispatch('fetchNginums')
      this.$store.dispatch('fetchSet')
    }
  }
</script>