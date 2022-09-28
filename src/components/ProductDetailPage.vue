<template>
  <div class="product-detail-page">
    <div class="product-container" v-if="product != null">
      <div class="product">
        <div class="product-image">
          <div class="image">
            <img :src="product.sub[selectSP].src" alt="" />
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
                  <img :src="sp.src" :key="index" />
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
    </div>

    <div class="pd-info" v-if="product != null">
      <div class="additional-info">
        <p class="ai-title">Thông tin bổ sung</p>
        <ul class="list-ai">
          <table v-if="product.additional_information != null">
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
        <div class="dt-text" v-if="media.text != null">text</div>
        <div class="dt-videos" v-if="media.videos.length > 0">
          <video
            v-for="(vd, ind) in media.videos"
            :key="ind"
            controls
            class="video"
          >
            <source
              :src="media.videos[ind] ? media.videos[ind][0] : ''"
              :type="media.videos[ind] ? media.videos[ind][1] : ''"
            />
          </video>
        </div>
        <div class="dt-images" v-if="media.images.length > 0">
          <img
            v-for="(img, ind) in media.images"
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
import backendUrl from "@/configs/backendUrl";
import axios from "axios";
import firebaseUtils from "@/utilities/firebase";
export default {
  name: "ProductDetailPage",
  async beforeMount() {
    let _product;
    let url = backendUrl.urls.GET_PRODUCT_BY_ID_PATH_FULL.replace(
      "<$pid>",
      this.productId
    );

    await axios.get(url).then((res) => {
      // console.log(res.data);
      _product = res.data;
    });

    for (let sub of _product.sub) {
      sub.src = await firebaseUtils.getFriebaseFileUrl(sub.src);
    }

    this.product = _product;
    document.title = this.product.name;
    await this.loadMedia();

    // console.log(this.product);
  },
  data() {
    return {
      productId: this.$route.params.productId,
      product: null,
      selectSP: 0,
      media: {
        images: [],
        videos: [],
      },
    };
  },
  methods: {
    async loadMedia() {
      for (let src of this.product.details.videos) {
        let video = await firebaseUtils.getFriebaseFile(src);
        this.media.videos.push(video);
      }

      for (let src of this.product.details.images) {
        let image = await firebaseUtils.getFriebaseFileUrl(src);
        this.media.images.push(image);
      }
    },

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
    // getImgProductPath() {
    //   return this.product.sub[this.selectSP].src;
    // },
    getSPTitle() {
      return this.product.sub[this.selectSP].name;
    },
    formatPrices() {
      let op = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.product.sub[this.selectSP].origin_price);
      let fp = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.product.sub[this.selectSP].final_price);
      return [op, fp];
    },
    getSale() {
      let sub = this.product.sub[this.selectSP];
      return (1 - sub.final_price / sub.origin_price) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-detail-page {
  background-color: #fff;
  height: 100%;
  width: 100vw;
  padding: 36px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .product-container {
    // background-color: yellow;
    width: 100vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .product {
      // background-color: red;
      width: 70vw;
      padding: 0 50px;
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
  }

  .pd-info {
    // background-color: #26787c;
    width: 100vw;
    margin-top: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding: 0 100px;

    .additional-info {
      width: 60vw;
      padding: 10px 80px;
      text-align: left;

      .ai-title {
        padding: 5px;
        font-weight: 700;
      }
      .list-ai {
        table {
          width: 60vw;
          th {
            border-bottom: 0.5px solid rgba($color: #666, $alpha: 0.2);
            padding: 5px;
            text-align: left;
          }
        }

        p {
          padding: 10px 5px;
        }
      }
    }

    .pd-detail {
      // background-color: #f57224;
      position: relative;
      display: flex;

      div {
        padding: 10px 80px;
        margin: 20px 0;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        video,
        img {
          width: 40vw;
          margin: 10px 0;
        }
      }
    }
  }
  @media (max-width: 750px) {
    padding: 36px 0 0 0;
    margin: 0;
    .product-container {
      // background-color: #f57224;
      width: 100vw;
      .product {
        width: 100vw;
        flex-direction: column;
        padding: 0;
        .product-image {
          height: auto;
          width: 100vw;
          padding: 0;
          border-radius: 0px;

          img {
            height: auto;
            width: 100vw;
            padding: 0;
            border-radius: 0px;
          }
        }
        .product-content {
          width: 100vw;
          // padding: 0 20px;
          .title {
            font-size: 2 rem;
          }

          .wrapper-sp {
            flex-direction: column;
            max-width: 80vw;
          }
        }
      }
    }
    .pd-info {
      // background-color: violet;
      width: 100vw;
      .additional-info {
        width: 100vw;
        padding: 0 20px;
        .list-ai {
          align-items: center;
          table {
            width: 80vw;
          }
        }
      }
      .pd-detail {
        div {
          video,
          img {
            width: 80vw;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>