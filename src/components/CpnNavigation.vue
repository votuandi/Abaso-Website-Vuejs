<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>
      <div class="branding">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <!-- <li @mouseover="showProductsMenu" @mouseleave="hideProductsMenu"> -->
        <li>
          <router-link class="nav-link" :to="{ name: 'Products' }"
            >Products</router-link
          >
        </li>
        <li @mouseover="showServiecesMenu" @mouseleave="hideServiecesMenu">
          <router-link class="nav-link" :to="{ name: 'Services' }"
            >Services</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" :to="{ name: 'Blogs' }"
            >Blogs</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" :to="{ name: 'ContactUs' }"
            >Contact Us</router-link
          >
        </li>
      </ul>
      <div class="icon">
        <font-awesome-icon
          @click="toggleMobileNav"
          v-show="mobile"
          :class="{ 'icon-active': mobileNav }"
          icon="bars"
        />
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" :to="{ name: 'Products' }"
              >Products</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" :to="{ name: 'Services' }"
              >Services</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" :to="{ name: 'Blogs' }"
              >Blogs</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" :to="{ name: 'ContactUs' }"
              >Contact Us</router-link
            >
          </li>
        </ul>
      </transition>
    </nav>
    <products-menu
      @mouseover="showProductsMenu"
      @mouseleave="hideProductsMenu"
      class="dropdown-menu"
      v-show="productsMenu"
    >
    </products-menu>
    <services-menu
      @mouseover="showServiecesMenu"
      @mouseleave="hideServiecesMenu"
      class="dropdown-menu"
      v-show="servicesMenu"
    >
    </services-menu>
  </header>
</template>
 
<script>
import ProductsMenu from "./ProductsMenu.vue";
import ServicesMenu from "./ServicesMenu.vue";
export default {
  name: "CpnNavigation",
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScaroll);
  },
  components: {
    ServicesMenu,
    ProductsMenu,
  },
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      productsMenu: null,
      servicesMenu: null,
    };
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        this.productsMenu = false;
        this.servicesMenu = false;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    updateScaroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        this.scrollNav = true;
        return;
      }
      this.scrollNav = false;
    },
    showServiecesMenu() {
      this.servicesMenu = true;
      this.scrollNav = true;
    },
    hideServiecesMenu() {
      this.servicesMenu = false;
      this.scrollNav = false;
    },
    showProductsMenu() {
      this.productsMenu = true;
      this.scrollNav = true;
    },
    hideProductsMenu() {
      this.productsMenu = false;
      this.scrollNav = false;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #26787c;
  z-index: 999;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .nav-link {
      z-index: 3;
      font-weight: 500;
      color: #26787c;
      list-style: none;
      text-decoration: none;
    }

    li {
      z-index: 1;
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .nav-link {
      font-size: 14px;
      transition: 0.5 ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #65bcb6;
        border-color: #65bcb6;
        font-weight: 800;
        transition: 1s ease all;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        z-index: 100;
        width: 100px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      font-awesome-icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      z-index: 100;
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .nav-link {
          color: #26787c;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }

  .dropdown-menu {
    position: relative;
    top: -25px;
    z-index: 2;
    transition: 1s ease all;
  }
}

.scrolled-nav {
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    padding: 8px 0;

    .branding {
      ima {
        width: 80px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>