import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import {
    library
} from "@fortawesome/fontawesome-svg-core";

import {
    faBars,
    faSearch,
    faPlus,
    faTrash,
    faFile,
    faPencil,
    faBackward,
    faArrowLeft,
    faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

import VueSplide from '@splidejs/vue-splide';

library.add(faBars, faSearch, faPlus, faTrash, faFile, faPencil, faBackward, faArrowLeft, faChevronLeft);






createApp(App).use(router).use(VueSplide).component('font-awesome-icon', FontAwesomeIcon).mount('#app')