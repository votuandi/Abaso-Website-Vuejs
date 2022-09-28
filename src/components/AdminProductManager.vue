<template>
  <div class="product-manager">
    <div class="header">
      <div class="nav" v-if="nav == 0">
        <h1 class="title">Product Manager</h1>
        <button class="btnAdd" @click="onShowAddView">
          <font-awesome-icon class="icon-more" icon="plus" />
          <p>Add Product</p>
        </button>
      </div>
      <div class="nav" v-if="nav == 1">
        <button class="btnBack" @click="onBackEdit">
          <font-awesome-icon class="icon-more" icon="arrow-left" />
          <p>Back</p>
        </button>
        <h1>Edit Product</h1>
      </div>
    </div>
    <AddProduct
      v-if="haveAddProductView[0]"
      v-show="showAddProductView[0]"
      v-on:onCancelAddProduct="cancelAddProduct"
      v-on:onNextAddProduct="nextAddProduct"
    />
    <AddSubProduct
      v-if="haveAddProductView[1]"
      v-show="showAddProductView[1]"
      :propertyNames="newProduct.property_names"
      v-on:onCancelAddProduct="cancelAddProduct"
      v-on:onBackAddProduct="backAddProduct"
      v-on:onFinishAddProduct="fisishAddProduct"
    />
    <EditProduct
      v-if="nav == 1"
      :currentProduct="listProduct[currentProductId]"
      v-on:onCancelEdit="onBackEdit"
    />

    <CpnLoader v-if="isLoading" />
    <div
      class="list-product"
      v-if="nav == 0"
      v-on:hideList="onHideList"
      refs="ref-listproduct"
    >
      <div class="list-products">
        <div class="container">
          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-prd">Product</div>
              <div class="col col-ver">Version</div>
              <div class="col col-int">Intro</div>
              <div class="col col-prp">Detail</div>
              <div class="col col-det">Additional Information</div>
              <div class="col col-sub">Sub-Product</div>
              <div class="col col-act">Action</div>
            </li>
            <div></div>
            <li class="table-row" v-for="(pd, ind) in listProduct" :key="ind">
              <div class="col col-prd">{{ pd.name }}</div>
              <div class="col col-ver">{{ pd.version }}</div>
              <div class="col col-int">{{ pd.intro }}</div>
              <div class="col col-det">{{ pd.details.text }}</div>
              <ul class="col col-ai">
                <li
                  v-for="(_key, _val) in pd.additional_information"
                  :key="_key"
                >
                  {{ ` ${_val} : ${_key}` }}
                </li>
              </ul>
              <div class="col col-sub">{{ pd.sub.length }}</div>
              <div class="col col-act">
                <button class="btnEdit" @click="onShowEditProductView(ind)">
                  <font-awesome-icon class="icon-more" icon="pencil" />
                  <p>Sửa</p>
                </button>
                <button class="btnRemove" @click="removeProduct(pd.id)">
                  <font-awesome-icon class="icon-more" icon="trash" />
                  <p>Xóa</p>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pagination"></div>
    </div>
  </div>
</template>

<script>
import AddProduct from "./CpnAddProduct.vue";
import AddSubProduct from "./CpnAddSubProduct.vue";
import backendUrl from "@/configs/backendUrl";
import axios from "axios";
import firebaseUtils from "@/utilities/firebase";
import EditProduct from "./CpnEditProduct.vue";
import CpnLoader from "./CpnLoader.vue";

export default {
  async beforeMount() {
    await this.getListProduct();
  },
  name: "ProductManager",
  components: { AddProduct, AddSubProduct, EditProduct, CpnLoader },
  data() {
    return {
      showAddProductView: [false, false],
      haveAddProductView: [false, false],
      step: 0,
      newProduct: {
        property_names: null,
      },
      listProduct: [],
      currentProductId: 0,
      nav: 0,
      isLoading: false,
    };
  },
  methods: {
    async getListProduct() {
      await axios
        .get(backendUrl.urls.GET_ALL_PRODUCTS_PATH_FULL)
        .then((res) => {
          this.listProduct = res.data;
        });
    },
    onShowAddView() {
      if (this.haveAddProductView[0] | (this.haveAddProductView[1] == 0)) {
        this.haveAddProductView = [true, false];
      }
      if (this.showAddProductView[0] | (this.showAddProductView[1] == 1)) {
        this.showAddProductView = [false, false];
      } else {
        this.showAddProductView[this.step] = true;
      }
    },
    cancelAddProduct() {
      if (confirm("Bạn chắc chắn hủy Tạo Sản Phẩm?")) {
        this.step = 0;
        this.showAddProductView = [false, false];
      }
    },
    backAddProduct() {
      this.step = 0;
      this.showAddProductView = [true, false];
    },

    nextAddProduct(_newProduct) {
      if (_newProduct.additional_information.length > 0) {
        let _additional_information = {};
        _newProduct.additional_information.forEach((info) => {
          _additional_information[info[0]] = info[1];
        });
        _newProduct.additional_information = _additional_information;
      }
      this.newProduct = { ..._newProduct, sub: null };
      this.step = 1;
      this.haveAddProductView[1] = true;
      this.showAddProductView = [false, true];
    },

    async fisishAddProduct(_newSubProduct) {
      this.isLoading = true;
      //PREPARING
      this.newProduct["sub"] = _newSubProduct;
      console.log(this.newProduct);

      console.log("uploading...");

      //UPLOADING MEDIA
      //uploading product detail videos
      await this.uploadFiles();

      //INSERT NEW PRODUCT INRO DATABASE
      await this.postCreateProduct();
      this.getListProduct();
      this.isLoading = false;
    },

    async uploadFiles() {
      //uploading product detail videos
      this.newProduct.detail.videos = await firebaseUtils.uploadFilesToFirebase(
        this.newProduct.mediaFiles.videoFiles
      );

      //uploading product detail images
      this.newProduct.detail.images = await firebaseUtils.uploadFilesToFirebase(
        this.newProduct.mediaFiles.imageFiles
      );

      //uploading subproduct image
      this.newProduct.sub.src = await firebaseUtils.uploadFileToFirebase(
        this.newProduct.sub.imgFile
      );
    },

    async postCreateProduct() {
      // console.log(this.newProduct);
      await axios
        .post(backendUrl.urls.CREATE_PRODUCT_FULL_PATH, {
          newProduct: this.newProduct,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // getListProduct(_products) {
    //   this.listProduct = _products;
    // },

    onShowEditProductView(ind) {
      // console.log(ind);
      if (
        this.showAddProductView[0] | (this.showAddProductView[1] == 1) &&
        this.haveAddProductView[0] | (this.haveAddProductView[1] == 1)
      ) {
        if (!confirm("Bạn chắc chắn hủy Tạo Sản Phẩm?")) {
          return;
        }
      }
      this.currentProductId = ind;
      this.step = 0;
      this.haveAddProductView = [false, false];
      this.showAddProductView = [false, false];
      this.nav = 1;
    },

    onBackEdit() {
      if (confirm("Bạn chắc chắn muốn Hủy chỉnh sửa?")) {
        this.nav = 0;
      }
    },

    async removeProduct(_pid) {
      await axios
        .delete(
          backendUrl.urls.DELETE_PRODUCT_BY_PID_FULL_PATH.replace(
            "<$pid>",
            _pid
          ),
          {
            body: this.newData,
            headers: backendUrl.headers,
          }
        )
        .then((res) => {
          console.log(res);
          alert("Xóa sản phẩm thành công");
        })
        .catch((err) => {
          console.log(err);
          alert("Xảy ra lỗi khi xóa sản phẩm");
        });
      await axios
        .get(backendUrl.urls.GET_ALL_PRODUCTS_PATH_FULL)
        .then((res) => {
          this.getListProduct(res.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-height: 2rem;
  min-width: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  font-size: 12px;
  color: #26787c;
  border: 2px solid #26787c;
  border-radius: 15px;
  margin-left: 5px;

  p {
    display: none;
    margin-left: 5px;
    transition: all 0.4s ease-in 0.2s;
  }

  &:hover {
    background-color: #65bcb6;
    border-color: #65bcb6;
    color: #ffffff;
    cursor: pointer;

    p {
      display: block;
    }
  }

  &:active {
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
      inset 2px 2px 3px rgba(0, 0, 0, 0.6);
  }
}

.product-manager {
  padding: 10px 50px;
  .header {
    .nav {
      padding: 0 100px;
      display: flex;
      flex-direction: row;
      margin: 30px 0;
      .title {
        margin-right: 20px;
      }

      button {
        @extend .btn;
        padding: 5px;
        font-size: 14px;
      }

      .btnBack {
        margin: 0 30px 0 0;
      }
    }
  }

  .list-products {
    margin: 20px 0;

    .container {
      max-width: 100vw;
      margin-left: auto;
      margin-right: auto;
      padding-left: 10px;
      padding-right: 10px;

      .responsive-table {
        li {
          border-radius: 3px;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .table-header {
          background-color: #65bcb6;
          color: #ffffff;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .table-row {
          background-color: #ffffff;
          box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
        }
        .col-prd {
          flex-basis: 15%;
        }
        .col-ver {
          flex-basis: 10%;
        }
        .col-int {
          flex-basis: 20%;
        }
        .col-det {
          flex-basis: 15%;
        }
        .col-ai {
          flex-basis: 20%;

          li {
            padding: 0;
          }
        }
        .col-sub {
          flex-basis: 10%;
        }
        .col-act {
          flex-basis: 10%;
          display: flex;
          flex-direction: row;

          button {
            @extend .btn;
            height: 2rem;
          }

          .btnRemove {
            color: red;
            border-color: red;
            margin: 0 10px;

            &:hover {
              background-color: red;
              color: #ffffff;
              border-color: red;
            }
          }
        }

        @media all and (max-width: 767px) {
          .table-header {
            display: none;
          }
          // .table-row {
          // }
          li {
            display: block;
          }
          .col {
            flex-basis: 100%;
          }
          .col {
            display: flex;
            padding: 10px 0;
            &:before {
              color: #6c7a89;
              padding-right: 10px;
              content: attr(data-label);
              flex-basis: 50%;
              text-align: right;
            }
          }
        }
      }
    }
  }

  h2 {
    font-size: 26px;
    margin: 20px 0;
    text-align: center;
    small {
      font-size: 0.5em;
    }
  }
}
</style>