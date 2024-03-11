import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from "vue-i18n"; // v8.x
// 国际化 json 文件,
import messages from "./i18n/index";
import Req from './http'
import global from './utils/global'
import './uni.promisify.adaptor'


Vue.config.productionTip = false
var http = Req.http;
Vue.prototype.$http = http
Vue.prototype.$global = global // 挂载全局配置模块

// i18国际化
let i18nConfig = {
	locale: uni.getLocale(), // 获取已设置的语言
	messages,
};
Vue.use(VueI18n);
const i18n = new VueI18n(i18nConfig);


App.mpType = 'app'
const app = new Vue({
	i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif