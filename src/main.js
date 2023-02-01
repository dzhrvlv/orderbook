import Vue from 'vue'
import App from './App.vue'
import myCore from './plugins/myCore'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

Vue.use(myCore)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
