<template>
  <div>
    <v-dialog v-model="dialog" fullscreen persistent>
        <v-card>
          <v-card-actions class="indigo darken-2 mb-2">
              <v-layout wrap row class="headline white--text ml-2">
                <v-icon dark medium class="mr-2">mdi-camera</v-icon>
                <div>Kamera Gigi</div>
              </v-layout>
              <v-spacer></v-spacer>
              <v-btn icon dark class="orange darken-2" flat @click="close"><v-icon>close</v-icon></v-btn>
          </v-card-actions>
          <v-layout mb-2 row justify-center>
            <v-flex>
              <vue-web-cam ref="webcam"
              :device-id="deviceId"
              width="100%"
              @started="onStarted" 
              @stopped="onStopped" 
              @error="onError"
              @cameras="onCameras"
              @camera-change="onCameraChange" />
            </v-flex>
            <v-flex>
              <v-layout column px-5>
                <v-card>
                  <v-card-text>
                    <v-switch
                      v-model="auto"
                      color="primary"
                      label="Nama Otomatis"
                      hide-details
                      class="mb-2"
                    ></v-switch>
                    <v-form ref="form">
                      <v-text-field 
                      v-model="nama_photo" 
                      label="Nama Photo"
                      maxlength="20"
                      counter
                      prepend-icon="mdi-image"
                      :rules="[rules.required]"
                      clearable
                      :disabled="auto"
                      :loading="loadingBtn"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :disabled="loadingBtn" @click="showData">Lihat List Photo</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn dark class="green darken-2" 
                    @click="onCapture"
                    :loading="loadingBtn"
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
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-actions class="px-5">
            <v-select v-model="camera" :items="devices" prepend-icon="camera" item-text="label" item-value="deviceId">
              <template slot="selection" slot-scope="data">
                <span :class="{'caption': $vuetify.breakpoint.xs}">{{data.item.label}}</span>
              </template>
              <template slot="item" slot-scope="data">
                {{data.item.label}}
              </template>
            </v-select>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import format from 'date-fns/format';
import id from 'date-fns/locale/id';

export default {
  props: ['id','onCam','photos'],
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      dialog: false,
      loadingBtn: false,
      img: null,
      camera: null,
      deviceId: null,
      auto: true,
      devices: [],
      nama_photo: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 2) || 'Min 3 karakter',
      }
    };
  },
  computed: {
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
    auto: function(e){
      if(e){
        const h = new Date().toLocaleString('en-GB',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
        const a = h.substr(0,10).split('/');
        const b = h.substr(12,8).split(':').join('');
        this.nama_photo = a[2]+''+a[1]+''+a[0]+'_'+b;
      }else{
        this.nama_photo = ''
      }
    }
  },
  methods: {
    onCapture() {
      if(this.$refs.form.validate()){
        this.img = this.$refs.webcam.capture();
        axios.post('/api/add-photo/'+this.id, {photo: this.img, nama: this.nama_photo}).then((response) => {
          this.loadingBtn = true
          setTimeout(()=>{
            toast.fire({
              type: 'success',
              title: 'Photo berhasil ditambahkan~'
            })
            this.loadingBtn = false
            this.$emit('init')
            this.cekAuto()
            this.$Progress.finish();
          },2000)
        }).catch((error) => {
          toast.fire({
            type: 'warning',
            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
          })
          setTimeout(() => {
            this.loadingBtn = false
            this.cekAuto()
            this.$Progress.finish();
          }, 2000)
        })
      }else{
        setTimeout(() => {
          this.$Progress.finish();
          this.cekAuto()
          this.loadingBtn = false
        }, 2000)
      }
    },
    onStarted(stream) {
      // console.log("On Started Event", stream);
    },
    onStopped(stream) {
      // console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
      this.$emit('matikan', false)
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      // console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      // console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      // console.log("On Camera Change Event", deviceId);
    },
    close(){
      this.loadingBtn = false 
      this.$refs.webcam.stop();
      this.$emit('matikan', false)
      this.dialog = false
    },
    showData(){
      this.$emit('cekGambar', true)
    },
    cekAuto(){
      if(this.auto){
        const h = new Date().toLocaleString('en-GB',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
        const a = h.substr(0,10).split('/');
        const b = h.substr(12,8).split(':').join('');
        this.nama_photo = a[2]+''+a[1]+''+a[0]+'_'+b;
      }else{
        this.nama_photo = ''
      }
    }
  },
  created(){
    this.dialog = this.onCam
    const h = new Date().toLocaleString('en-GB',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
    const a = h.substr(0,10).split('/');
    const b = h.substr(12,8).split(':').join('');
    const now = a[2]+''+a[1]+''+a[0]+'_'+b;
    this.nama_photo = now
  },
  beforeDestroy(){
    this.onStop();
  }
}
</script>

