import VueLoaderPlugin from 'vue-loader/lib/plugin'
import Vue from 'Vue'
import App from './app.vue'

new Vue({
    el: "#app",
    render: h => h(App)
})