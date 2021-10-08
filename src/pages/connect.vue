<template>
  <div v-if="logged == 0">
      <q-page padding class="flex flex-center">
      <div class="q-pa-md" style="max-width: 500px">
        <h3>Conectarse a un servidor</h3>
        <q-form 
          style="min-withd: 700px !important;"
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="server"
            label="Ip del servidor"
            hint="Ejemplo: 192.168.100.123"
            @change="onChange"
            lazy-rules
            :rules="[val => val && val.length !== 0 || 'Escribe una IP']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="orange" class="full-width"/>
          </div>
        </q-form>

    </div>
    </q-page>
  </div>
  <div v-if="logged === 1">
    <q-page padding class="flex flex-center" style="flex-direction: column;">
      <q-spinner
        color="orange"
        size="5em"
      />
      <p>Conectando a {{server}}</p>
      <p>{{error}}</p>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logged as log} from "../components/logged";
export default {
  name: 'Conectar a servidor',
  
  beforeMount(){
    const l = log(false);
    if(l){
      location.replace("/#/")
    }
  },

  setup(){
    let server = ref(null)
    let logged = ref(0)
    let error = ref("")
    return{
      server,
      logged,
      error,
      async onSubmit(e){
        e.preventDefault();
        console.log(server);
        logged.value = 1
        console.log(logged);

        let toSave = ""
        if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(server.value)){
          toSave = server.value + ":5000";
        }else{
          toSave = server.value
        }


        const s = await fetch("http://" + toSave + "/api/media",{
          method: "GET",
          mode:"cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*", 
          }
        })

        if(!s.ok){
          return error.value = "Un error ha oucrrido en el sistema. Error <b>" + s.status + "</b>"
        }

        localStorage.setItem("server", toSave);
        return location.replace("/#/")
      },
      onChange(e){
        console.log(e);
        server.value = e
      }
    }
  }
}
</script>
