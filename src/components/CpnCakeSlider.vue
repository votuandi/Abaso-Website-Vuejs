<template>
  <div class="cake-silder">
    <splide class="splider" :options="options">
      <splide-slide v-for="(photoPath, ind) in getListPhotoPaths()" :key="ind">
        <img :src="photoPath" alt="" />
      </splide-slide>
    </splide>
    <div class="text-over-silde">
      <divt class="texts">
        <h3>Với Abaso...</h3>
        <p>
          Chúng tôi với hi vọng mang đến các giải pháp hữu ích giúp quý khách
          hàng là yêu thích công việc làm bánh có thể dễ dàng tiếp cận công việc
          kinh doanh cửa hàng bánh một cách dễ dàng và ít tốn sức lực nhất.
        </p>
      </divt>
    </div>
  </div>
</template>

<script>
export default {
  name: "CakeSlider",
  beforeMount() {
    console.log(this.photoNames);
  },
  props: {
    photoNames: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      options: {
        rewind: true,
        width: "100vw",
        gap: "1rem",
        loop: true,
        autoplay: true,
        arrows: false,
        // pagination: false,
        paginationDirection: "ttb",
        padding: 0,
        // role: "tab",
      },
    };
  },
  methods: {
    getListPhotoPaths() {
      let listPath = [];
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 900) {
        this.photoNames.forEach((photoName) => {
          let _photoName = photoName.split(".");
          _photoName[0] += "_16x9";
          photoName = _photoName.join(".");
          let path = require(`@/assets/img/CakeWeb/${photoName}`);
          listPath.push(path);
        });
      } else {
        this.photoNames.forEach((photoName) => {
          let path = require(`@/assets/img/CakeWeb/${photoName}`);
          listPath.push(path);
        });
      }
      return listPath;
    },
  },
};
</script>

<style lang="scss" scoped>
.cake-silder {
  position: relative;

  .splider {
    padding: 0;
  }

  .text-over-silde {
    position: absolute;
    display: flex;
    width: 360px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.8);
    top: 3%;
    right: 8%;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .texts {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 10px;
      border: 2px solid #000;
      width: 310px;
      height: 200px;
      align-content: center;
      justify-content: space-evenly;
      text-align: center;

      h3 {
        font-family: Georgia, serif;
        font-size: 24px;
        font-weight: 500;
      }

      p {
        font-family: Garamond, serif;
        text-align: justify;
      }
    }

    @media (max-width: 900px) {
      width: 160px;
      height: 90px;

      .texts {
        width: 150px;
        height: 80px;
        padding: 5px;

        h3 {
          font-size: 10px;
        }

        p {
          font-size: 6px;
        }
      }
    }
  }

  img {
    width: 100vw;
  }
}
</style>