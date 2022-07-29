<template>
  <div class="home">
    <!-- <video-background
      src="@/assets/machine-video.mp4"
      style="max-height: 400px; height: 100vh"
    >
      <h1 style="color: white">Hello welcome!</h1>
    </video-background> -->

    <div class="introduction-video">
      <video autoplay loop muted class="video">
        <source src="@/assets/machine-video.mp4" type="video/webm" />
        <source src="@/assets/machine-video.mp4" type="video/mp4" />
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

    <section class="hero">
      <div class="hero-text container">
        <h4>ABASO Website Building</h4>
        <hr />
        <h2>
          ...being <br />
          Developed
        </h2>
        <hr />
      </div>
    </section>
  </div>
</template>

<script>
import IntroductionPage from "./IntroductionPage.vue";
export default {
  name: "HomePage",
  components: {
    IntroductionPage,
  },
};
</script>

<style lang="scss" scoped>
.introduction-video {
  position: relative;
  text-align: center;
  color: white;
  .video {
    // left: 50%;
    width: 100vw;
    max-height: 100%;

    position: relative;
    top: 50%;
    // padding: 0px 16px 0 0;
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

.hero {
  background-image: url("../assets/hero-bg.png");
  background-attachment: fixed;
  position: relative;
  height: 100vh;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }

    h2 {
      font-size: 50px;
      @media (min-width: 550px) {
        font-size: 80px;
      }
    }

    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }
    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}
</style>