import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import {
    Plugin
} from 'vue-responsive-video-background-player'

import {
    library
} from "@fortawesome/fontawesome-svg-core";

import {
    faBars
} from "@fortawesome/free-solid-svg-icons";

import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

library.add(faBars);






createApp(App).use(router).use(Plugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')