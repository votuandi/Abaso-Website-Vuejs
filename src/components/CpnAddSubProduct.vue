<template>
  <div class="add-subproduct">
    <ul class="form">
      <h2 class="form-title">Thêm sản phẩm con</h2>
      <li class="field">
        <p>Mã code</p>
        <input type="text" v-model="newData.code" />
      </li>

      <li class="field">
        <p>Tên sản phẩm con <small>*Không được để trống</small></p>
        <input type="text" v-model="newData.name" />
      </li>

      <li class="field pick-img">
        <p>Hình ảnh <small>*Không được để trống</small></p>
        <div class="pick-img">
          <button class="btnAddImage" @click="onChooseFile">
            <font-awesome-icon clas="icon-add" icon="file" />
            <p>Thêm ảnh</p>
          </button>
          <input
            type="file"
            accept="image/*"
            ref="refUploadImage"
            v-show="false"
            @change="pickImageFile($event)"
          />
          <img class="img-preview" :src="imgUrl" alt="" />
        </div>
      </li>

      <li class="field">
        <div class="intro-title">
          <p>Giới thiệu</p>
          <button class="btnAdd" @click="addIntro">
            <font-awesome-icon class="icon-add" icon="plus" />
            <p>Thêm giới thiệu</p>
          </button>
        </div>
        <ul class="list-intro">
          <li class="intro" v-for="(property, ind) in newData.intro" :key="ind">
            <input
              type="text"
              placeholder="Nhập nội dung giới thiệu"
              v-model="newData.intro[ind]"
            />
            <button class="btnRemove" @click="removeIntro(ind)">
              <font-awesome-icon class="icon-add" icon="trash" />
              <p>Xóa</p>
            </button>
          </li>
        </ul>
      </li>

      <li class="field">
        <div class="prop-title">
          <p>Các thuộc tính <small>*Không được để trống</small></p>
        </div>
        <ul class="list-properties">
          <li
            class="property"
            v-for="(property, ind) in propertyNames"
            :key="ind"
          >
            <p class="property-label">{{ propertyNames[ind] }}</p>
            <input
              type="text"
              placeholder="Nhập tên thuộc tính"
              v-model="newData.properties[ind]"
            />
          </li>
        </ul>
      </li>

      <li class="field">
        <div class="info-title">
          <p>Thông tin</p>
          <button class="btnAdd" @click="addInfo">
            <font-awesome-icon class="icon-add" icon="plus" />
            <p>Thêm thông tin</p>
          </button>
        </div>
        <ul class="list-info">
          <li class="info" v-for="(info, ind) in newData.info" :key="ind">
            <input
              type="text"
              placeholder="Nhập nội dung giới thiệu"
              v-model="newData.info[ind]"
            />
            <button class="btnRemove" @click="removeInfo(ind)">
              <font-awesome-icon class="icon-add" icon="trash" />
              <p>Xóa</p>
            </button>
          </li>
        </ul>
      </li>

      <li class="field">
        <div class="prices">
          <p>Giá sản phẩm <small>*Không được để trống</small></p>
          <input
            type="text"
            placeholder="Giá gốc"
            v-model="newData.price.origin"
          />
          <input
            type="text"
            placeholder="Giá bán"
            v-model="newData.price.final"
          />
        </div>
      </li>

      <li class="form-action">
        <button class="btn-cancel" @click="cancelAddProduct">Hủy</button>
        <button class="btn-back" v-if="productId == null" @click="onBackStep">
          Quay lại
        </button>
        <button class="btn-finish" @click="onFinishStep">Hoàn thành</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebaseUtils from "@/utilities/firebase";
import backendUrl from "@/configs/backendUrl";
import axios from "axios";
export default {
  name: "AddSubProduct",
  props: {
    productId: {
      type: Number,
      default: null,
    },
    propertyNames: {
      type: Object,
      default: null,
    },
  },
  beforeMount() {
    this.newData.properties = Array(this.propertyNames.length).fill("");
  },
  data() {
    return {
      newData: {
        code: "",
        name: "",
        src: null,
        intro: [],
        properties: null,
        info: [],
        price: {
          origin: null,
          final: null,
        },
        imgFile: null,
      },
      imgUrl: null,
    };
  },

  methods: {
    addIntro() {
      this.newData.intro.push("");
    },
    removeIntro(index) {
      this.newData.intro.splice(index, 1);
    },

    addInfo() {
      this.newData.info.push("");
    },
    removeInfo(index) {
      this.newData.info.splice(index, 1);
    },

    cancelAddProduct() {
      if (this.productId == null) {
        this.$emit("onCancelAddProduct");
      } else {
        if (confirm("Bạn chắc chắn muốn hủy?")) {
          this.$emit("onCancelAddSubProduct");
        }
      }
    },

    onBackStep() {
      this.$emit("onBackAddProduct");
    },

    async onFinishStep() {
      if (this.newData.name.length === 0) {
        alert("Vui lòng nhập Tên Sản Phẩm Con!");
        return;
      }
      if (this.newData.imgFile == null) {
        alert("Vui lòng chọn Hình ảnh cho Sản Phẩm Con!");
        return;
      }

      if (this.checkEmptyProperty()) {
        alert("Vui lòng nhập đầy đủ giá trị các Thuộc Tính!");
        return;
      }
      if (!(this.newData.price.origin > 0 && this.newData.price.final > 0)) {
        alert("Vui lòng nhập hợp lệ đầy đủ Giá sản phẩm!");
        return;
      }
      if (this.productId == null) {
        this.$emit("onFinishAddProduct", this.newData);
      } else {
        // this.$emit("onAddSubProduct", this.newData);
        await this.addNewSub();
      }
    },

    async addNewSub() {
      this.newData.productId = this.productId;
      await this.uploadSubImg();
      this.newData.imgFile = null;
      await this.postCreateSub();
    },

    async uploadSubImg() {
      let src = await firebaseUtils.uploadFileToFirebase(this.newData.imgFile);
      if (src != null) {
        this.newData.src = src;
      }
    },

    async postCreateSub() {
      console.log("create sub");
      console.log(this.newData);
      await axios
        .post(backendUrl.urls.CREATE_SUBPRODUCT_FULL_PATH, {
          newData: this.newData,
        })
        .then((res) => {
          console.log(res);
          alert("Tạo thành công!");
          this.$emit("onFinishAddSubProduct");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    checkEmptyProperty() {
      const isBelowThreshold = (currentValue) => currentValue.length > 0;
      if (this.propertyNames.length > 0) {
        return !this.newData.properties.every(isBelowThreshold);
      }
      return false;
    },

    onChooseFile() {
      this.$refs.refUploadImage.click();
    },

    pickImageFile(event) {
      this.newData.imgFile = event.target.files[0];
      this.imgUrl = URL.createObjectURL(event.target.files[0]);
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

  .btnAdd {
    @extend .btn;
  }
}

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

.add-subproduct {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 100px;

  .form {
    height: 80vh;
    background-color: #ffffff;
    width: 70vw;
    min-width: 20rem;
    align-items: flex-start;
    list-style: none;
    border: 1px solid #666;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 20px;
    overflow-y: auto;

    .form-title {
      margin: 0 0 10px 0;
      font-weight: 500;
    }

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

      .btnAddImage {
        color: #26787c;
        border: 2px solid #26787c;
        border-radius: 15px;
        padding: 3px;

        &:hover {
          color: #ffffff;
          background-color: #26787c;
        }

        &:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
            inset 2px 2px 3px rgba(0, 0, 0, 0.6);
        }
      }

      .intro-title,
      .prop-title,
      .info-title {
        @extend .title-container;
      }

      .list-intro,
      .list-properties,
      .list-info {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 5px 0;

        .intro,
        .property,
        .info {
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

      .pick-img {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .img-preview {
          height: 50px;
          margin: 0px 20px;
        }
      }

      .list-properties {
        li {
          align-items: baseline;
          p {
            margin: 0 10px;
            max-width: 20rem;
            min-width: 5rem;
          }
        }
      }

      .prices {
        input {
          margin: 10px 20px;
          max-width: 10rem;
        }
      }
    }

    .form-action {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      button {
        @extend .btn;

        &:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
            inset 2px 2px 3px rgba(0, 0, 0, 0.6);
        }
      }

      .btn-cancel {
        color: #666;
        border-color: #666;
        // transition: all 0.1s ease-in 0.2s;
        margin: 0 20px;

        &:hover {
          background-color: #666;
          color: #ffffff;
          border-color: #666;
        }
      }

      .btn-back {
        color: #65bcb6;
        border-color: #65bcb6;
        // transition: all 0.1s ease-in 0.2s;
        margin: 0 20px;

        &:hover {
          background-color: #65bcb6;
          color: #ffffff;
          border-color: #65bcb6;
        }
      }
    }
  }
}
</style>