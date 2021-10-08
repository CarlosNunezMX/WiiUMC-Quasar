<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'Cerrar Conexión',
  beforeMount(){
    localStorage.removeItem("server")
    location.replace("/#/connect")
  }
}
</script>
