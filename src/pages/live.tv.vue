<template>
    <div class="flex flex-center" style="flex-direction: column;" v-if="!loaded">
        <q-spinner
          color="primary"
          size="3em"
        />
        <p>Cargando videos...</p>
    </div>
    <div id="videoContainer" v-else>
      <div v-if="loaded">
            <video controls autoplay>
                <source v-bind:src="ip + data.url" type="application/x-mpegurl">
            </video>
      </div>
      <div v-else>
          <q-page class="flex flex-center">
              <h3>Error</h3>
          </q-page>
      </div>
    </div>

</template>

<script>
import { logged } from 'src/components/logged';
import { defineComponent } from 'vue';
import configs from "../configs";
export default defineComponent({
  name: 'PageIndex',
  props: ["name"],
  methods:{
    async fetchdata(){
      let r = await fetch("http://" + configs.ip.server + "/api/tv/" + this.name,{
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
  },

  data(){
    return{
      data:{},
      direction: "",
      ip: "http://" + configs.ip.server,
      loaded: false,
      petition: false,
      innerHeight: `${window.innerHeight - 120}px`
    }
  }
  
})
</script>

<style>
video{
  max-width: 100%;
  width: 100%;
  max-height: v-bind(innerHeight);
  height: 100%;
}
</style>
