<template>
  <div class="home">
    <div class="introduction-video">
      <video autoplay loop muted class="video">
        <source src="@/assets/videos/machine-video.mp4" type="video/mp4" />
      </video>

      <div class="text-over-video">
        <h1>3D Cake Printer<br />Abaso</h1>
        <h2>
          Make your cake fantastic with text and pattern made by 3D cake printer
        </h2>
        <p>Buy Now</p>
      </div>
    </div>

    <introduction-page class="introduction"> </introduction-page>

    <div class="cake-slider">
      <CpnCakeSlider :photoNames="listCakePaths" />
    </div>

    <ul class="product-carts-container">
      <div class="break"></div>
      <li v-for="products in listProducts.splice(0, 2)" :key="products.id">
        <div class="cards-info">
          <h1>Các phiên bản {{ products.name }}</h1>
          <p>{{ products.intro }}</p>
        </div>
        <div class="product-cards">
          <CpnProductCard
            class="product-card"
            v-for="card in products.sub"
            :key="card.id"
            :cardData="card"
          />
        </div>
      </li>
      <li></li>
    </ul>

    <div class="blogs-container">
      <div class="break"></div>
      <div class="blogs">
        <div class="blogs-logo">
          <img src="@/assets/img/logo_small_1.png" alt="" />
          <h3>Tin tức</h3>
          <p class="blogs-slogan">
            Cùng Abaso cập nhật xu thế công nghệ <br />
            hiện đại trong làm bánh
          </p>
        </div>
        <ul class="blogs-cards">
          <li class="blogs-card" v-for="blog in listBlogs" :key="blog.id">
            <div class="blog-img">
              <img :src="getBlogScr(blog.src)" alt="" />
            </div>
            <div class="blog-texts">
              <h3 class="title">{{ blog.title }}</h3>
              <p class="time">{{ blog.date }}</p>
              <p class="cut-content">{{ blog.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import IntroductionPage from "./IntroductionPage.vue";
import CpnProductCard from "./CpnProductCard.vue";
// import jsonProductData from "@/assets/json/products.json";
import jsonBlogs from "@/assets/json/blogs.json";
import CpnCakeSlider from "./CpnCakeSlider.vue";
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "HomePage",
  components: {
    IntroductionPage,
    CpnProductCard,
    CpnCakeSlider,
  },
  async beforeMount() {
    await axios.get(backendUrl.urls.GET_ALL_PRODUCTS_PATH_FULL).then((res) => {
      this.listProducts = res.data;
    });
  },
  data() {
    return {
      listProducts: [],
      listBlogs: jsonBlogs,
      listCakePaths: [
        "WebCake01.png",
        "WebCake02.png",
        "WebCake03.png",
        "WebCake04.png",
        "WebCake05.png",
      ],
    };
  },
  methods: {
    getBlogScr(imgName) {
      return require(`@/assets/img/${imgName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.introduction-video {
  position: relative;
  text-align: center;
  color: white;
  .video {
    width: 100vw;
    max-height: 100%;
    position: relative;
    top: 50%;
  }

  .text-over-video {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;

    h1 {
      font-family: Georgia, serif;
      font-size: 20px;
      @media (min-width: 600px) {
        font-size: 40px;
      }
      @media (min-width: 1000px) {
        font-size: 80px;
      }
      -webkit-animation-name: slideInUp;
      animation-name: slideInUp;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @-webkit-keyframes slideInUp {
      0% {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
        visibility: visible;
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes slideInUp {
      0% {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
        visibility: visible;
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }

    h2 {
      font-size: 10px;
      @media (min-width: 600px) {
        font-size: 12px;
      }
      @media (min-width: 1000px) {
        font-size: 24px;
      }
      font-family: "Courier New", monospace;
      -webkit-animation-name: slideInUp;
      animation-name: slideInUp;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @-webkit-keyframes slideInUp {
      0% {
        -webkit-transform: translateY(80%);
        transform: translateY(80%);
        visibility: visible;
      }
      80% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes slideInUp {
      0% {
        -webkit-transform: translateY(80%);
        transform: translateY(80%);
        visibility: visible;
      }
      80% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }

    p {
      font-size: 10px;
      margin-top: 10px;
      @media (min-width: 600px) {
        font-size: 12px;
        margin-top: 12px;
      }
      @media (min-width: 1000px) {
        font-size: 24px;
        margin-top: 20px;
      }
      border: 2px solid #fff;
      width: fit-content;
      padding: 5px 10px;
      -webkit-animation-name: bounceIn;
      animation-name: bounceIn;
      -webkit-animation-duration: 0.75s;
      animation-duration: 0.75s;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @-webkit-keyframes bounceIn {
      0%,
      20%,
      40%,
      60%,
      80%,
      100% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
      }
      20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
      }
      40% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
      }
      60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
      }
      80% {
        -webkit-transform: scale3d(0.97, 0.97, 0.97);
        transform: scale3d(0.97, 0.97, 0.97);
      }
      100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
    @keyframes bounceIn {
      0%,
      20%,
      40%,
      60%,
      80%,
      100% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
      }
      20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
      }
      40% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
      }
      60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
      }
      80% {
        -webkit-transform: scale3d(0.97, 0.97, 0.97);
        transform: scale3d(0.97, 0.97, 0.97);
      }
      100% {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
  }
}

.break {
  height: 10vh;
  border-top: 5px solid rgba(0, 0, 0, 0.8);
  margin: 50px 0;

  @media (max-width: 900px) {
    margin-bottom: 30px;
  }
}

.product-carts-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #fff;
  padding: 60px 0;

  li {
    width: 100%;
    display: flex;
    flex-direction: column;

    .cards-info {
      width: 100%;
      text-align: center;
      padding: 40px 0;

      h1 {
        font-size: 40px;
        font-weight: 500;
        padding: 20px;
      }

      p {
        font-size: 20px;
        font-weight: lighter;
      }
    }

    .product-cards {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 50px;
      justify-content: space-evenly;

      .product-card {
        position: relative;
        height: 100%;

        &:hover {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
      }

      @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .product-card {
          margin: 10px 0;
        }
      }
    }
  }
}

.blogs-container {
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: center;

  .blogs {
    // background-color: aquamarine;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .blogs-logo {
      // background-color: cornsilk;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-right: 100px;

      img {
        width: 160px;
      }

      h3 {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }

    .blogs-cards {
      // background-color: aqua;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 5px;

      li {
        // background-color: coral;
        height: 210px;
        width: 680px;
        display: flex;
        flex-direction: row;
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.19);
        border-radius: 10px;
        padding: 5px;
        margin: 15px 0;

        &:hover {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05),
            0 6px 20px 0 rgba(0, 0, 0, 0.05);
        }

        .blog-img {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            height: 200px;
            width: 200px;
          }
        }

        .blog-texts {
          // background-color: blueviolet;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 5px 10px;

          h3 {
            font-size: 24px;
            font-weight: 900;
          }

          p.time {
            color: #666;
            font-size: 10;
            font-weight: 500;
          }

          p.cut-content {
            font-size: 14px;
            text-align: justify;
            padding-top: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  @media (max-width: 900px) {
    .blogs {
      flex-direction: column;
      .blogs-logo {
        padding: 20px 0;
      }
      .blogs-cards {
        // background-color: aquamarine;
        .blogs-card {
          width: 360px;
          height: 420px;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>