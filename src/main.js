import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import jsPlumb from 'jsplumb';
import './styles/main.less'

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
