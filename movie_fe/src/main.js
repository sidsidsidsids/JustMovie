import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
window.addEventListener('beforeunload', () => {
  localStorage.setItem('storeState', JSON.stringify(store.state));
});

// 애플리케이션 로드 시 로컬 스토리지에서 상태를 가져와 저장소에 복원
window.addEventListener('load', () => {
  const storeState = localStorage.getItem('storeState');
  if (storeState) {
    store.replaceState(JSON.parse(storeState));
  }
});
// Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
