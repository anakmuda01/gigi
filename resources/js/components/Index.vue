<template>
  <v-app id="inspire">
    <transition name="fade-pro" mode="out-in">
      <pre-load v-if="loading"></pre-load>
    </transition>
    
    <v-navigation-drawer
      fixed
      v-model="drawer"
      :mini-variant="mini"
      app
      :floating="floating"
      class="grey lighten-5"
      width="260"
      v-show="!dialog"
    >
      <v-layout
      fill-height
      column
      >
        <v-img :src="gambar" max-height="20%">
          <v-layout align-center py-3 justify-center fill-height column>
            <div>
              <v-avatar
              size="70"
              >
                <img src="/img/dokter.png" alt="avatar">
              </v-avatar>
            </div>
            <v-spacer></v-spacer>
            <div v-show="!mini" class="title font-weight-bold mt-3"><span class="user-name white--text">{{user_name}}</span></div>
          </v-layout>
        </v-img>
        
        <menu-app :kecil="mini"></menu-app>

        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile to="/about">
            <v-list-tile-action>
              <v-icon>mdi-information</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar v-show="!dialog" color="indigo darken-2" dark fixed app>
      <v-toolbar-side-icon v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs" @click.stop="mini = !mini"></v-toolbar-side-icon>
      <v-toolbar-side-icon v-else @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title :class="{'subheading' : $vuetify.breakpoint.xs}">Aplikasi Praktik Dokter Gigi Mandiri</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="yellow" light fab small @click="logout">
        <v-icon color="red">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content v-show="!dialog">
      <v-container fluid fill-height pt-2 >
        <v-layout
          justify-center
          pt-0
        >
          <!-- <loading-vue v-if="loading"></loading-vue> -->
          <v-flex text-xs-center>
            <transition name="fade" mode="out-in">
                <router-view v-if="ready && !hariX"></router-view>
                <div v-else class="pt-5">
                  <div>
                    Masa Aktif Berakhir~
                  </div>
                  <div>
                    Silahkan Hub. Developer untuk memperbaharui masa aktif aplikasi~
                  </div>
                </div>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer v-show="!dialog" height="48.5px" color="indigo darken-2" app inset>
      <span class="white--text pa-3">&copy;2019 — <strong>Fathurrahman Sholihin 15630674</strong></span>
      <v-spacer></v-spacer>
      <span class="white--text pa-3" v-if="haha > 0">Sisa Masa Aktif : <strong>{{ haha+' hari lagi.' }}</strong></span>
      <span class="white--text pa-3" v-else><strong>Masa Aktif Telah Berakhir</strong></span>
    </v-footer>
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import LoadingVue from './Loading.vue';
  import PreLoad from './PreLoad.vue';
  import MenuApp from './core/Menu.vue';

  import format from 'date-fns/format';
  import id from 'date-fns/locale/id';
  import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

  import Tampan from './core/tampan';
  var xTampan = new Tampan();

  const h = new Date();
  const a = h.toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10).split('/');
  const now = a[2]+'-'+a[0]+'-'+a[1];

  export default {
      props: ['title', 'user_name'],
      components: {
        MenuApp,
        LoadingVue,PreLoad
      },
      data () {
        return {
          csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          gambar: "/img/bgD.png",
          dialog: true,
          drawer: null,
          mini: false,
          floating:false,
          loading: true,
          ready:false,
        }
      },

      computed: {
        ...mapState([
          'support'
        ]),
        hariX () {
          var sup = this.support.code.split('-');
          var t = xTampan.berani(sup[0])+xTampan.berani(sup[1])+xTampan.berani(sup[2])+xTampan.berani(sup[3]);
          var b = xTampan.berani(sup[4])+xTampan.berani(sup[5]);
          var h = xTampan.berani(sup[6])+xTampan.berani(sup[7]);
          var result = differenceInCalendarDays(
            new Date(t+'-'+b+'-'+h),
            new Date(), {locale: id}
          );
          return result <= 0 ? true : false;
        },
        haha(){
          var sup = this.support.code.split('-');
          var t = xTampan.berani(sup[0])+xTampan.berani(sup[1])+xTampan.berani(sup[2])+xTampan.berani(sup[3]);
          var b = xTampan.berani(sup[4])+xTampan.berani(sup[5]);
          var h = xTampan.berani(sup[6])+xTampan.berani(sup[7]);
          var result = differenceInCalendarDays(
            new Date(t+'-'+b+'-'+h),
            new Date(), {locale: id}
          );

          return result;
        }
      },

      methods: {
        logout(){
          swal.fire({
            title: 'Anda Yakin Ingin Log Out?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log Out!',
            cancelButtonText: 'Batal',
          }).then((result) => {
            if (result.value) {
              axios.post('logout').then((response) => {
                if (response.status === 302 || 401) {
                  console.log('logout');
                  window.location.href = "/";
                }
                else {
                  toast.fire({
                    type: 'warning',
                    title: 'Tidak terkoneksi dengan server...'
                  })
                  this.$router.push('bantuan')
                }
              }).catch(error => {
                toast.fire({
                  type: 'warning',
                  title: 'Tidak terkoneksi dengan server...'
                })
                window.location.href = "/";
                // this.$router.push('bantuan')
              });
            }
          })
        },
        cekOnline(){
          if (navigator.onLine) {
              console.log('online');
            } else {
              window.location.href = "/";
            }
        },
      },
      mounted(){
        this.$store.dispatch('fetchSupport');
        const hadang = ms => new Promise(resolve => setTimeout(resolve, ms));
        hadang(500).then(() => {
          this.loading = false
          this.$Progress.finish()
        }).then(()=>{
          setTimeout(()=>{
            this.dialog = false
            this.ready = true
          },500)
        }).catch(()=>{
          toast.fire({
            type: 'warning',
            title: 'Maaf, ada kesalahan silahkan kontak admin/developer aplikasi!'
          })
          this.$router.push('bantuan')
        });
      },
      created () {
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start()
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
          //  does the page we want to go to have a meta.progress object
          if (to.meta.progress !== undefined) {
            let meta = to.meta.progress
            // parse meta tags
            this.$Progress.parseMeta(meta)
          }
          //  start the progress bar
          this.$Progress.start()
          //  continue to next page
          next()
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
          //  finish the progress bar
          this.$Progress.finish()
        })

      }
  }
</script>

<style type="text/css">
.v-content {
  background-color: #fafafa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-pro-enter-active,
.fade-pro-leave-active {
  transition: opacity 1s;
}
.fade-pro-enter,
.fade-pro-leave-to {
  opacity: 0;
}


.user-name{
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/* .loading:after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
} */
</style>