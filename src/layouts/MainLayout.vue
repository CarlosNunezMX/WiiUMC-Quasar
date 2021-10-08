<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background:orange;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          WiiUMC Beta
        </q-toolbar-title>

        <div>Versión {{ configs.frontend_v }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Servicios
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Videos',
    caption: 'WiiUMC Video Service',
    icon: 'play_arrow',
    link: '/#/'
  },
  {
    title: 'Imagenes',
    caption: 'Esta sección no esta terminada aún',
    icon: 'image',
    link: '/#/images'
  },
  {
    title: 'Music',
    caption: 'Esta sección no esta terminada aún',
    icon: 'music_note',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'LiveTV',
    caption: 'Ve Live TV desde tu navegador',
    icon: 'tv',
    link: '/#/tv'
  },
  {
    title: 'Screenshots',
    caption: 'Servicio de capturas de pantalla',
    icon: 'screenshot',
    link: '/#/screenshot'
  },
  {
    title: "Cerrar conexión",
    caption: "Cierra conexión con el servidor actual",
    icon:"logout",
    link: "/#/logout"
  }
];

import { defineComponent, ref } from 'vue'
import configs from "../configs";
export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      configs,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
