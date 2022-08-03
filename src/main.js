import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import {
    library
} from "@fortawesome/fontawesome-svg-core";

import {
    faBars
} from "@fortawesome/free-solid-svg-icons";

import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

import VueSplide from '@splidejs/vue-splide';

library.add(faBars);






createApp(App).use(router).use(VueSplide).component('font-awesome-icon', FontAwesomeIcon).mount('#app')