<template>
  <div class="edit-product">
    <ul class="form">
      <li class="field">
        <p>Tên sản phẩm <small>*Không được để trống</small></p>
        <input type="text" v-model="newData.name" />
      </li>

      <li class="field">
        <p>Version</p>
        <input type="text" v-model="newData.version" />
      </li>

      <li class="field">
        <p>Giới thiệu</p>
        <textarea rows="3" v-model="newData.intro" />
      </li>

      <li class="field">
        <div class="prop-title">
          <p>Các thuộc tính</p>
          <button class="btnAdd" @click="addProperty">
            <font-awesome-icon class="icon-add" icon="plus" />
            <p>Thêm thuộc tính</p>
          </button>
        </div>
        <ul class="list-properties">
          <li
            class="property"
            v-for="(property, ind) in newData.property_names"
            :key="ind"
          >
            <input
              type="text"
              placeholder="Nhập tên thuộc tính"
              v-model="newData.property_names[ind]"
            />
            <button class="btnRemove" @click="removeProperty(ind)">
              <font-awesome-icon class="icon-add" icon="trash" />
              <p>Xóa</p>
            </button>
          </li>
        </ul>
      </li>

      <li class="field">
        <p>Thông tin chi tiết</p>
        <ul class="details">
          <li>
            <div class="detail">
              <div class="detail-title">
                <p>Video</p>
                <button class="btnAdd" @click="onChooseVideos">
                  <font-awesome-icon class="icon-add" icon="file" />
                  <p>Thêm video</p>
                </button>
                <input
                  type="file"
                  accept="video/*"
                  ref="refUploadVideo"
                  v-show="false"
                  @change="pickVideoFiles($event)"
                  multiple
                />
              </div>

              <ul
                class="list-media-items"
                v-show="newData.details.videos.length > 0"
              >
                <li
                  class="media-item"
                  v-for="(filename, ind) in newData.details.videos"
                  :key="ind"
                >
                  <video
                    width="320"
                    height="240"
                    v-if="media.videos[ind]"
                    controls
                  >
                    <source
                      :src="media.videos[ind] ? media.videos[ind][0] : ''"
                      :type="media.videos[ind] ? media.videos[ind][1] : ''"
                    />
                  </video>
                  <!-- <p>{{ filename }}</p> -->
                  <button class="btnRemove" @click="removeCurrentVideo(ind)">
                    <font-awesome-icon class="icon-add" icon="trash" />
                    <p>Xóa</p>
                  </button>
                </li>
              </ul>

              <ul
                class="list-media-items"
                v-show="addedMedia.videos.length > 0"
              >
                <li
                  class="media-item"
                  v-for="(filename, ind) in addedMedia.videos"
                  :key="ind"
                >
                  <video width="320" height="240" controls>
                    <source
                      :src="getUrlFile(addedMedia.videos[ind])"
                      :type="addedMedia.videos[ind].type"
                    />
                  </video>
                  <!-- <p>{{ filename }}</p> -->
                  <button class="btnRemove" @click="removeAddedVideo(ind)">
                    <font-awesome-icon class="icon-add" icon="trash" />
                    <p>Xóa</p>
                  </button>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div class="detail">
              <div class="detail-title">
                <p>Ảnh</p>
                <button class="btnAdd" @click="onChooseImages">
                  <font-awesome-icon class="icon-add" icon="file" />
                  <p>Thêm ảnh</p>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref="refUploadImage"
                  v-show="false"
                  @change="pickImageFiles($event)"
                  multiple
                />
              </div>
              <ul
                class="list-media-items"
                v-show="newData.details.images.length > 0"
              >
                <li
                  class="media-item"
                  v-for="(filename, ind) in newData.details.images"
                  :key="ind"
                >
                  <img :src="media.images[ind]" alt="" />
                  <button class="btnRemove" @click="removeCurrentImage(ind)">
                    <font-awesome-icon class="icon-add" icon="trash" />
                    <p>Xóa</p>
                  </button>
                </li>
              </ul>

              <ul
                class="list-media-items"
                v-show="addedMedia.images.length > 0"
              >
                <li
                  class="media-item"
                  v-for="(filename, ind) in addedMedia.images"
                  :key="ind"
                >
                  <img :src="getUrlFile(addedMedia.images[ind])" alt="" />
                  <!-- <p>{{ filename }}</p> -->
                  <button class="btnRemove" @click="removeAddedImage(ind)">
                    <font-awesome-icon class="icon-add" icon="trash" />
                    <p>Xóa</p>
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <p>Nội dung</p>
            <textarea rows="8" v-model="newData.details.text" />
          </li>
        </ul>
      </li>

      <li class="field">
        <div class="additional-info-title">
          <p>Thông tin bổ sung</p>
          <button class="btnAdd" @click="addAdditionalInfo">
            <font-awesome-icon class="icon-add" icon="plus" />
            <p>Thêm thông tin</p>
          </button>
        </div>
        <ul class="list-additional-info">
          <li v-for="(info, ind) in editAdditionInformation[0]" :key="ind">
            <input
              type="text"
              placeholder="Tên thuộc tính"
              v-model="editAdditionInformation[0][ind]"
            />
            <input
              type="text"
              placeholder="Nội dung"
              v-model="editAdditionInformation[1][ind]"
            />
            <button class="btnRemove" @click="removeAdditionalInfo(ind)">
              <font-awesome-icon class="icon-add" icon="trash" />
              <p>Xóa</p>
            </button>
          </li>
        </ul>
      </li>

      <li class="form-action">
        <button class="btn-cancel" @click="onCancel">Hủy</button>
        <button class="btn-finish" @click="onFinish">Hoàn thành</button>
      </li>
    </ul>

    <div class="list-sub">
      <div class="title-list">
        <h1 class="title">Danh sách Sản phẩm con</h1>
        <button class="btnAdd" @click="onShowAddView">
          <font-awesome-icon class="icon-more" icon="plus" />
          <p>Thêm</p>
        </button>
      </div>
      <div class="container">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-nam">Sub-Product</div>
            <div class="col col-cod">Code</div>
            <div class="col col-int">Intro</div>
            <div class="col col-pri">Price</div>
            <div class="col col-act">Action</div>
          </li>
          <div></div>
          <li class="table-row" v-for="(sp, ind) in newData.sub" :key="ind">
            <div class="col col-nam">{{ sp.name }}</div>
            <div class="col col-cod">{{ sp.code }}</div>
            <div class="col col-int">
              <ul
                class="sub-intros"
                v-for="(intro, ind) in sp.intro"
                :key="ind"
              >
                <li>{{ intro }}</li>
              </ul>
            </div>
            <div class="col col-pri">{{ sp.price }}</div>
            <div class="col col-act">
              <button class="btnEdit" @click="onEditSub(ind)">
                <font-awesome-icon class="icon-more" icon="pencil" />
                <p>Sửa</p>
              </button>
              <button class="btnRemove" @click="removeSub(sp.id)">
                <font-awesome-icon class="icon-more" icon="trash" />
                <p>Xóa</p>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="popup-container" v-if="isAddSub">
      <div class="popup-form">
        <AddSubProduct
          v-on:onCancelAddSubProduct="onHideAddView"
          v-on:onFinishAddSubProduct="onFinishAddSub"
          :productId="currentProduct.id"
          :propertyNames="currentProduct.property_names"
        />
      </div>
    </div>

    <div class="popup-container" v-if="isEditSub">
      <div class="popup-form">
        <EditSubProduct
          v-on:onCancelEditSubProduct="onHideEditView"
          v-on:onFinishEditSubProduct="onFinishEditSub"
          :productId="currentProduct.id"
          :propertyNames="currentProduct.property_names"
          :currentSubProduct="this.currentSubProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddSubProduct from "./CpnAddSubProduct.vue";
import EditSubProduct from "./CpnEditSubProduct.vue";
import firebaseUtils from "@/utilities/firebase";
import backendUrl from "@/configs/backendUrl";
import axios from "axios";

export default {
  name: "EditProduct",
  components: {
    AddSubProduct,
    EditSubProduct,
  },
  props: {
    currentProduct: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newData: {
        name: "",
        version: "",
        intro: "",
        property_names: [],
        details: {
          videos: null,
          images: null,
          text: null,
        },
        additional_information: [],
        sub: [],
      },
      media: { videos: [], images: [] },
      addedMedia: { videos: [], images: [] },
      removedMedia: { videos: [], images: [] },
      editAdditionInformation: [],
      isAddSub: false,
      isEditSub: false,
      currentSubProduct: null,
    };
  },
  async beforeMount() {
    this.newData = { ...this.currentProduct };

    for (let i = 0; i < this.newData.details.videos.length; i++) {
      let url = await firebaseUtils.getFriebaseFile(
        this.newData.details.videos[i]
      );
      this.media.videos.push(url);
    }

    for (let i = 0; i < this.newData.details.images.length; i++) {
      let url = await firebaseUtils.getFriebaseFileUrl(
        this.newData.details.images[i]
      );
      this.media.images.push(url);
    }
    // console.log(this.media);
    this.editAdditionInformation = [
      [...Object.keys(this.newData.additional_information)],
      [...Object.values(this.newData.additional_information)],
    ];
  },
  methods: {
    getMedia(ind) {
      return this.media.videos[ind] ? this.media.videos[ind] : ["", ""];
    },

    addProperty() {
      this.newData.property_names.push("");
    },
    removeProperty(index) {
      this.newData.property_names.splice(index, 1);
    },

    addAdditionalInfo() {
      this.newData.additional_information.push(["", ""]);
    },
    removeAdditionalInfo(index) {
      this.newData.additional_information.splice(index, 1);
    },

    onChooseVideos() {
      this.$refs.refUploadVideo.click();
    },

    pickVideoFiles(event) {
      this.addedMedia.videos = [
        ...this.addedMedia.videos,
        ...event.target.files,
      ];
    },

    removeCurrentVideo(index) {
      this.removedMedia.videos.push(this.newData.details.videos[index]);
      this.newData.details.videos.splice(index, 1);
      this.media.videos.splice(index, 1);
    },

    removeAddedVideo(index) {
      this.addedMedia.videos.splice(index, 1);
    },

    onChooseImages() {
      this.$refs.refUploadImage.click();
    },

    pickImageFiles(event) {
      this.addedMedia.images = [
        ...this.addedMedia.images,
        ...event.target.files,
      ];
    },

    removeCurrentImage(index) {
      this.removedMedia.images.push(this.newData.details.images[index]);
      this.newData.details.images.splice(index, 1);
      this.media.images.splice(index, 1);
    },

    removeAddedImage(index) {
      this.addedMedia.images.splice(index, 1);
    },

    getListFilename(listFiles) {
      if (listFiles.length === 0) {
        return [];
      }
      return Array.from(listFiles).map((v) => v.name);
    },

    cancelAddProduct() {
      this.$emit("onCancelAddProduct");
    },

    onNextStep() {
      if (this.newData.name.length === 0) {
        alert("Vui lòng nhập Tên Sản Phẩm!");
      } else {
        this.$emit("onNextAddProduct", this.newData);
      }
    },

    getUrlFile(file) {
      return URL.createObjectURL(file);
    },

    onCancel() {
      this.$emit("onCancelEdit");
    },

    async onFinish() {
      await this.uploadFiles();
      console.log("uploading files successfully");
      await this.putEditProduct();
      console.log("edit product successfully");
      alert("Edit product successfully");
      this.$router.go(0);
    },

    async uploadFiles() {
      //uploading new product detail videos
      let newProductDetailVideos = await firebaseUtils.uploadFilesToFirebase(
        this.addedMedia.videos
      );
      this.newData.details.videos = [
        ...this.newData.details.videos,
        ...newProductDetailVideos,
      ];

      //uploading new product detail images
      let newProductDetailImages = await firebaseUtils.uploadFilesToFirebase(
        this.addedMedia.images
      );
      this.newData.details.images = [
        ...this.newData.details.images,
        ...newProductDetailImages,
      ];
    },

    async putEditProduct() {
      await axios
        .put(backendUrl.urls.EDIT_PRODUCT_FULL_PATH, {
          body: this.newData,
          headers: backendUrl.headers,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    onShowAddView() {
      this.isAddSub = true;
    },

    onShowEditView() {
      this.isEditSub = true;
    },

    onHideAddView() {
      this.isAddSub = false;
    },

    onHideEditView() {
      this.isEditSub = false;
    },

    async onFinishAddSub() {
      this.onHideAddView();
      await this.updateListSub();
    },

    async updateListSub() {
      await axios
        .get(
          backendUrl.urls.GET_ALL_SUB_BY_PID_FULL_PATH.replace(
            "<$pid>",
            this.currentProduct.id
          ),
          {
            body: this.newData,
            headers: backendUrl.headers,
          }
        )
        .then((res) => {
          console.log(res);
          this.newData.sub = res.data;
        });
    },

    onEditSub(ind) {
      this.currentSubProduct = this.newData.sub[ind];
      this.onShowEditView();
    },

    async onFinishEditSub() {
      console.log("hide");
      this.onHideEditView();
      await this.updateListSub();
    },

    async removeSub(_sid) {
      await axios
        .delete(
          backendUrl.urls.DELETE_SUBPRODUCT_BY_SID_FULL_PATH.replace(
            "<$sid>",
            _sid
          ),
          {
            body: this.newData,
            headers: backendUrl.headers,
          }
        )
        .then((res) => {
          console.log(res);
          alert("Xóa sản phẩm con thành công");
        })
        .catch((err) => {
          console.log(err);
          alert("Xảy ra lỗi khi xóa sản phẩm con");
        });
      await this.updateListSub();
    },
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 5px 0;

  button {
    @extend .btn;
  }
}

.btn {
  height: 2rem;
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

.edit-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 100px 0 20px;

  .form {
    width: 70vw;
    min-width: 20rem;
    align-items: flex-start;
    list-style: none;
    // border: 1px solid #666;
    // border-radius: 10px;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 0 20px;

    .field {
      p {
        padding: 5px 0;
      }

      small {
        color: red;
      }

      input {
        padding: 10px;
        border: 1px solid #666;
        border-radius: 5px;
        width: 30vw;
        min-width: 15rem;
      }

      textarea {
        resize: none;
        padding: 10px;
        border: 1px solid #666;
        border-radius: 5px;
        width: 60vw;
        min-width: 15rem;
      }

      .prop-title {
        @extend .title-container;
      }

      .list-properties {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 5px 0;

        .property {
          display: flex;
          flex-direction: row;
          margin: 3px 0;

          .btnRemove {
            @extend .btn;
            color: red;
            border-color: red;
            margin: 0 20px;

            &:hover {
              background-color: red;
              color: #ffffff;
              border-color: red;
            }
          }
        }
      }

      .details {
        padding: 5px 20px;
        list-style: none;

        li {
          font-size: 14px;
          padding: 5px 0;

          .detail-title {
            @extend .title-container;
            padding: 0 !important;
          }

          .list-media-items {
            display: flex;
            flex-direction: row;
            flex-flow: wrap;

            .media-item {
              //   background-color: rgba(255, 228, 196, 0.3);
              //   border-radius: 0.5rem;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 1rem;
              max-width: 420px;
              max-height: 250px;

              video {
                // background-color: #65bcb6;
              }

              img {
                width: 5rem;
              }

              .btnRemove {
                @extend .btn;
                color: red;
                border-color: red;
                margin: 0 20px;
                height: 2.2rem;

                &:hover {
                  background-color: red;
                  color: #ffffff;
                  border-color: red;
                }
              }
            }
          }
        }
      }

      .additional-info-title {
        @extend .title-container;
      }

      .list-additional-info {
        list-style: none;

        li {
          display: flex;
          flex-direction: row;
          align-items: baseline;

          input {
            margin: 5px 10px;
          }

          .btnRemove {
            @extend .btn;
            color: red;
            border-color: red;
            margin: 0 20px;
            height: 2.2rem;

            &:hover {
              background-color: red;
              color: #ffffff;
              border-color: red;
            }
          }
        }
      }
    }

    .form-action {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 30px 0;

      button {
        @extend .btn;
      }

      .btn-cancel {
        color: #666;
        border-color: #666;
        // transition: all 0.1s ease-in 0.2s;
        margin: 0 20px;
      }
    }
  }
}

.list-sub {
  margin: 20px 0;

  .title-list {
    padding: 0 100px;
    display: flex;
    flex-direction: row;
    margin: 30px 0;
    align-items: baseline;
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

  .container {
    width: 80vw;
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
      .col-nam {
        flex-basis: 20%;
      }
      .col-cod {
        flex-basis: 15%;
      }
      .col-int {
        flex-basis: 35%;

        .sub-intros {
          li {
            margin: 0;
            padding: 0 0.5rem 0.5rem 0;
          }
        }
      }
      .col-pri {
        flex-basis: 20%;
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

.popup-container {
  // position: absolute;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #25222290;
  z-index: 50;
  overflow: hidden;

  .popup-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>