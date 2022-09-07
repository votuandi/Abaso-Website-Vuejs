<template>
  <div class="product-detail-page">
    <div class="product">
      <div class="product-image">
        <div class="image">
          <img :src="getImgProductPath" alt="" />
        </div>
      </div>
      <div class="product-content">
        <h3 class="title">
          {{ `${product.name} ${product.version ? product.version : ""}` }}
        </h3>
        <ul class="pr-props">
          <li
            class="pr-prop"
            v-for="(prop, ind) in product.property_names"
            :key="ind"
          >
            {{ `${prop}: ${product.sub[selectSP].properties[ind]}` }}
          </li>
        </ul>

        <div class="wrapper-price">
          <div class="final-price">{{ formatPrices[1] }}</div>
          <div class="origin-price">{{ formatPrices[0] }}</div>
          <div class="sale-price">
            {{ `- ${getSale.toFixed(0).toString()} %` }}
          </div>
        </div>
        <div class="wrapper-sp">
          <div class="text">Chọn mẫu</div>
          <div class="list-sp">
            <p class="sp-text">{{ getSPTitle }}</p>
            <ul>
              <li
                v-for="(sp, index) in product.sub"
                :class="classActive(index)"
                :key="index"
                v-on:click="handleClickSP($event, index)"
              >
                <img :src="getImgSPPath(sp.src)" :key="index" />
              </li>
            </ul>
            <p class="sp-code">{{ `Mã: ${product.sub[selectSP].code}` }}</p>
          </div>
        </div>
        <ul class="sp-info">
          <li v-for="(info, ind) in product.sub[selectSP].info" :key="ind">
            {{ info }}
          </li>
        </ul>
      </div>
    </div>

    <div class="pd-info">
      <div class="additional-info">
        <p class="ai-title">Thông tin bổ sung</p>
        <ul class="list-ai">
          <table v-if="product.additional_information != null ? true : false">
            <tr
              v-for="(k, ind) in Object.keys(product.additional_information)"
              :key="ind"
            >
              <th>
                {{ k }}
              </th>
              <th>{{ product.additional_information[k] }}</th>
            </tr>
          </table>
          <p v-else>Chưa có thông tin</p>
        </ul>
      </div>
      <div class="pd-detail">
        <div class="dt-text" v-if="product.detail.text != null">text</div>
        <div class="dt-videos" v-if="product.detail.videos != null">
          <video
            v-for="(vd, ind) in getVideoProductPaths()"
            :key="ind"
            controls
            class="video"
          >
            <source :src="vd" type="video/mp4" />
          </video>
        </div>
        <div class="dt-images" v-if="product.detail.images != null">
          <img
            v-for="(img, ind) in getImageProductPaths()"
            :key="ind"
            :src="img"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonProducts from "@/assets/json/products.json";
export default {
  name: "ProductDetailPage",
  beforeMount() {},
  data() {
    return {
      productId: this.$route.params.productId,
      product: jsonProducts.filter(
        (p) => p.id.toString() === this.$route.params.productId
      )[0],
      selectSP: 0,
    };
  },
  methods: {
    handleClickSP(e, index) {
      this.selectSP = index;
    },
    classActive(index) {
      return {
        active: this.selectSP === index,
      };
    },
    getImgSPPath(src) {
      return require(`@/assets/img/${src}`);
    },
    getVideoProductPaths() {
      let videoPaths = [];
      if (this.product.detail.videos != null) {
        videoPaths = this.product.detail.videos.map((v) =>
          require(`@/assets/videos/${v}`)
        );
      }
      console.log("Flag");
      console.log(videoPaths);
      return videoPaths;
    },
    getImageProductPaths() {
      let imagePaths = [];
      if (this.product.detail.images != null) {
        imagePaths = this.product.detail.images.map((img) =>
          require(`@/assets/img/${img}`)
        );
      }
      return imagePaths;
    },
  },
  computed: {
    getImgProductPath() {
      return require(`@/assets/img/${this.product.sub[this.selectSP].src}`);
    },
    getSPTitle() {
      return this.product.sub[this.selectSP].name;
    },
    formatPrices() {
      let op = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.product.sub[this.selectSP].price.origin);
      let fp = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.product.sub[this.selectSP].price.final);
      return [op, fp];
    },
    getSale() {
      let prices = this.product.sub[this.selectSP].price;
      return (1 - prices.final / prices.origin) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-detail-page {
  background-color: #fff;
  height: 100%;
  width: 100vw;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .product {
    // background-color: #65bcb6;
    max-width: 80vw;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    position: relative;

    .product-image {
      height: 400px;
      width: 400px;
      padding-right: 30px;
      border-radius: 10px;

      img {
        height: 400px;
        width: 400px;
        border-radius: 10px;
      }
    }

    .product-content {
      // background-color: #f57224;
      display: flex;
      flex-direction: column;
      flex-basis: 60%;
      padding: 5px 50px;
      // margin-left: 20px;

      .title {
        margin-top: 0;
        color: #26787c;
        text-decoration: none;
        font-size: 40px;
        font-weight: 600;
      }

      .pr-props {
        display: flex;
        flex-direction: column;
        padding: 15px 0;
        line-height: 1.5;
        font-size: 18px;
      }

      .wrapper-price {
        .final-price {
          color: #f57224;
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 5px;
        }

        .origin-price,
        .sale-price {
          display: inline-block;
          font-size: 14px;
          color: #ccc;
          vertical-align: middle;
        }

        .sale-price {
          color: #333;
          margin-left: 5px;
          padding: 3px;
          font-size: 10px;
          border-radius: 5px;
          border: 1px solid #f57224;
        }
      }
      .wrapper-sp {
        display: flex;
        flex-direction: row;
        margin: 15px 0;
        padding: 15px 0;
        border-top: 1px solid #eee;

        .text {
          width: 100px;
          min-width: 100px;
        }

        .list-sp {
          display: flex;
          flex-direction: column;

          .sp-text {
            font-size: 20px;
            font-weight: 500;
            color: #65bcb6;
          }

          ul {
            list-style-type: none;
            display: flex;
            flex-direction: row;
            margin: 10px 0;
            padding: 0;

            li {
              width: 54px;
              height: 54px;
              display: flex;
              border: 1px solid #ccc;
              border-radius: 5px;
              margin-right: 20px;

              &:hover {
                border: 2px solid #65bcb6;
              }

              img {
                width: 50px;
                height: 50px;
                border-radius: 5px;
              }
            }
            .active {
              border: 2px solid #65bcb6;
            }
          }
          .sp-code {
            font-size: 12px;
            color: #666;
          }
        }
      }

      .sp-info {
        list-style: none;
        line-height: 1.6;
      }
    }
  }
  .pd-info {
    // background-color: #26787c;
    width: 100vw;
    margin-top: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 0 100px;

    .additional-info {
      width: 800px;
      padding: 10px 80px;
      text-align: left;

      .ai-title {
        background-color: #65bcb6;
        padding: 5px;
        font-weight: 700;
      }
      .list-ai {
        table {
          width: 100%;

          th {
            border-bottom: 0.5px solid rgba($color: #666, $alpha: 0.2);
            padding: 5px;
          }
        }

        p {
          padding: 10px 5px;
        }
      }
    }

    .pd-detail {
      position: relative;
      display: flex;
      flex-direction: column;

      div {
        padding: 10px 80px;
        width: 80vw;
        margin: 20px 0;
        position: relative;
        display: flex;
        flex-direction: column;

        video,
        img {
          width: 40vw;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>