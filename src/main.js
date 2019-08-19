import Vue from "vue";
import VueRouter from "vue-router";
import App from "./components/App.vue";
import IndexPage from "./components/pages/IndexPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/", component: IndexPage },
  { path: "/detail/:id", component: DetailPage }
];

const router = new VueRouter({
  mode: "history",
  routes
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
