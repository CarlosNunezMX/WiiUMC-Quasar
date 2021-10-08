<template>
  <div class="flex flex-center" style="flex-direction: column;" v-if="!loaded">
      <q-spinner
        color="primary"
        size="3em"
      />
      <p>Cargando videos...</p>
  </div>
  <div v-else>
      <div v-if="remoteVideos.length > 0">
      <q-page>
        <ul class="grid row q-col-gutter-sm wrap" style="list-style: none; padding: 15px;">
          <li class="col-xl-4 col-sm-12 col-md-2 col-xs-2" v-for="(video) in remoteVideos" :key="video.id">
          <q-card class="my-card">
            <q-img v-bind:src="video.tvg.logo">
              <div class="absolute-bottom">
                <div class="text-h6">{{video.name}}</div>
              </div>
            </q-img>

            <q-card-actions>
              <q-btn v-bind:to="'/tv/see/' + video.name" flat icon="play_arrow" color="green">Ver</q-btn>
            </q-card-actions>
          </q-card>
      </li>
        </ul>
    </q-page>
    </div>
    <div v-else>
      <q-page class="flex flex-center">
        <h3>No hay videos!</h3>
      </q-page>
    </div>
  </div>
</template>

<script>
import { logged } from 'src/components/logged';
import { defineComponent } from 'vue';
import configs from "../configs";
export default defineComponent({
  name: 'Live TV',
  methods:{
    async fetchdata(){
      let r = await fetch("http://" + configs.ip.server + "/api/tv",{
        mode:"cors",  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*", 
        }
      });
      r = await r.json()
      console.log(r);
      console.log("a");
      this.loaded = true;
      return{
        remoteVideos: r.list,
      }
    }
  },
  async beforeMount(){
    logged(true)
    let data = await this.fetchdata();
    this.remoteVideos = data.remoteVideos;
  },

  data(){
    return{
      remoteVideos: [],
      ip: "http://" + configs.ip.server,
      loaded: false
    }
  }
  
})
</script>
