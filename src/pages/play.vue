<template>
  <div v-if="!seeing">
    <div class="flex flex-center" style="flex-direction: column;" v-if="!loaded">
        <q-spinner
          color="primary"
          size="3em"
        />
        <p>Cargando videos...</p>
    </div>
    <div id="videoContainer" v-else>
      <div v-if="loaded">
          <q-page>
              <div>
                <h4>{{data.name}}</h4>
                <p>Video {{data.type}} - Desde <b>{{ip.split(":5000")[0]}}</b> </p>
                <q-btn @click="this.seeVideo" icon="play_arrow" color="orange">Ver ahora</q-btn>
              </div>
          </q-page>
      </div>
      <div v-else>
          <q-page class="flex flex-center">
              <h3>Error</h3>
          </q-page>
      </div>
    </div>
  </div>
  <div v-else>
    <video v-bind:src="ip + data.ubication" controls autoplay></video>
  </div>
</template>

<script>
import { logged } from 'src/components/logged';
import { defineComponent } from 'vue';
import configs from "../configs";
export default defineComponent({
  name: 'PageIndex',
  props: ["id"],
  methods:{
    async fetchdata(){
      let r = await fetch("http://" + configs.ip.server + "/api/video/" + this.id,{
        mode:"cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*", 
        }
      });
      let ok = r.ok
      console.log(ok);
      if(ok){
        r = await r.json()
      }
      this.loaded = true;
      return{
        data: ok == true ? r : null,
        ok: ok
      }
    },
    seeVideo(){
      console.log("Me han clicado");
      this.seeing = true
      console.log(this.seeing);
    }
  },
  async beforeMount(){
    logged(true)
    let data = await this.fetchdata();
    this.data = data.data;
    this.loaded = data.ok;    
    console.log(this.data);
    this.imageBg = "url('" + this.ip + this.data.thumb + "')"
  },

  data(){
    return{
      data:{},
      direction: "",
      ip: "http://" + configs.ip.server,
      loaded: false,
      petition: false,
      imageBg: "",
      seeing:false,
      innerHeight: `${window.innerHeight - 120}px`
    }
  }
  
})
</script>

<style>
.q-page{
  min-height: v-bind(innerHeight) !important;
}

#videoContainer::before {
  content: "";
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0,0,0,0.5);
}

#videoContainer{

  background-repeat: no-repeat;
  background-size: cover;
  position: relative; 
  padding: 35px;
  color: white;
  height: 100%;
  width: 100%;
  background-image: v-bind(imageBg);
}
video{
  max-width: 100%;
  width: 100%;
  max-height: v-bind(innerHeight);
  height: 100%;
}
#videoContainer > *{
  position: relative;
}

#videoContainer h4{
  margin: 0;
  padding-top: 10em;

}
</style>
