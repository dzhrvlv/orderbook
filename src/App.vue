<template>
  <v-app app class="overflow-hidden">
    <MyHeader :drawer="drawer" @switchDrawer="drawer => (this.drawer = drawer)">{{ currentComponent }}</MyHeader>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="selectedComponent" color="primary">
          <v-list-item v-for="component in components" :key="component">
            <v-list-item-title>{{ component }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from "./components/MyHeader.vue"

export default {
  name: 'App',
  data: () => ({
    components: ["DepthState", "DiffList"],
    selectedComponent: 0,
    drawer: false

  }),
  computed: {
    currentComponent() {
      return this.components[this.selectedComponent];
    }
  },
  components: {
    MyHeader,
    DepthState: () => import('./components/DepthState.vue'),
    DiffList: () => import('./components/DiffList.vue'),
  },
  watch: {
    selectedComponent() {
      this.drawer = false
    }
  }
};
</script>

<style>
html {
  overflow: hidden;
  height: 100vh;
}

.v-application--wrap {
  max-height: 100vh !important;
  overflow: hidden;
}

.v-main {
  max-height: 100vh;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #64B5F6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1976D2;
}
</style>
