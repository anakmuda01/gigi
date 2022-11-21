<template>
    <div class="vuebar-element" v-bar>
        <v-list dense>
            <v-list-tile
            to="/dashboard"
            >
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <template v-if="$gate.isAsisten()">
                <template v-for="item in items.loket">
                    <v-subheader v-if="item.header" :key="item.header">{{item.header}}</v-subheader>
                    <v-list-tile
                    v-else
                    v-for="(sub,i) in item.subitems"
                    :to="sub.path"
                    :key="i.title"
                    >
                        <v-list-tile-action>
                        <v-icon>{{sub.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </template>

            <template v-if="$gate.isDokter()">
                <template v-for="item in items.dokter">
                    <v-subheader v-if="item.header" :key="item.header">{{item.header}}</v-subheader>
                    <template v-for="sub in item.subitems">
                        <v-list-tile 
                        v-if="sub.title === 'Aksi Dokter Gigi'" 
                        :key="sub.title"
                        :to="sub.path"
                        >
                            <v-list-tile-action>
                                <v-icon>{{sub.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group v-if="!kecil && sub.title !== 'Aksi Dokter Gigi'" :key="sub.title" no-action class="mb-3">
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon>{{sub.icon}}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <v-list-tile
                            v-for="solo in sub.grups"
                            :to="solo.path"
                            :key="solo.title"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{solo.title}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                </template>
            </template>

            <template v-if="$gate.isDokter()">
                <template v-for="item in items.util">
                    <v-subheader v-if="item.header" :key="item.header">{{item.header}}</v-subheader>
                    <template v-for="sub in item.subitems">
                        <v-list-tile 
                        v-if="sub.title === 'Surat Keterangan Dokter'" 
                        :key="sub.title"
                        :to="sub.path"
                        >
                            <v-list-tile-action>
                                <v-icon>{{sub.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-group v-if="!kecil && sub.title !== 'Surat Keterangan Dokter'" :key="sub.title" no-action class="mb-3">
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon>{{sub.icon}}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <v-list-tile
                            v-for="solo in sub.grups"
                            :to="solo.path"
                            :key="solo.title"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{solo.title}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                </template>
            </template>


            <template v-if="$gate.isAdmin() && !kecil">
                <template v-for="item in items.admin">
                    <v-subheader v-if="item.header" :key="item.header">{{item.header}}</v-subheader>
                    <template v-for="sub in item.subitems">
                        <v-list-tile 
                        :key="sub.title"
                        :to="sub.path"
                        >
                            <v-list-tile-action>
                                <v-icon>{{sub.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </template>
            </template>

             <template  v-if="!$gate.isAdminOnly() && !kecil">
                <template v-for="item in items.report">
                    <v-subheader v-if="item.header" :key="item.header">{{item.header}}</v-subheader>
                    <template v-for="sub in item.subitems">
                        <v-list-group :key="sub.title" no-action class="mb-3">
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon>{{sub.icon}}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{sub.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <v-list-tile
                            v-for="solo in $gate.isDokter() ? sub.grups : arrayRemove(sub.grups, 'Laporan Pemasukan')"
                            :to="solo.path"
                            :key="solo.title"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{solo.title}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                </template>
            </template>

        </v-list>
    </div>
</template>

<script>
    import menus from './api/menus';
    export default {
        props: ['kecil'],
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return{
                items : menus
            }
        },
        methods: {
            arrayRemove(arr, value) {
                let someArray = arr;
                let noDokter = someArray.filter( el => el.title !== value ); 

                return noDokter;
            }
        }
    }
</script>

<style>
  .vuebar-element {
    height: 100%;
    width: 100%;
    max-width: 500px;
    background: #fafafa;
  }

  .vb > .vb-dragger {
      z-index: 5;
      width: 12px;
      right: 0;
  }
  
  .vb > .vb-dragger > .vb-dragger-styler {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transform: rotate3d(0,0,0,0);
      transform: rotate3d(0,0,0,0);
      -webkit-transition:
          background-color 100ms ease-out,
          margin 100ms ease-out,
          height 100ms ease-out;
      transition:
          background-color 100ms ease-out,
          margin 100ms ease-out,
          height 100ms ease-out;
      background-color: rgba(48, 121, 244,.1);
      margin: 5px 5px 5px 0;
      border-radius: 20px;
      height: calc(100% - 10px);
      display: block;
  }
  
  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.3);
  }
  
  .vb > .vb-dragger:hover > .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
      margin: 0px;
      height: 100%;
  }
  
  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
      margin: 0px;
      height: 100%;
  }
  
  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
  }
</style>