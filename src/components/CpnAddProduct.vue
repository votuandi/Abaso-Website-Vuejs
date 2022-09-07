<template>
  <div class="add-product">
    <ul class="form">
      <h2 class="form-title">Thêm sản phẩm</h2>
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
                class="list-filenames"
                v-show="newData.mediaFiles.videoFiles.length > 0"
              >
                <li
                  class="filename"
                  v-for="(filename, ind) in getListFilename(
                    newData.mediaFiles.videoFiles
                  )"
                  :key="ind"
                >
                  <p>{{ filename }}</p>
                  <button class="btnRemove" @click="removePickedVideo(ind)">
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
                class="list-filenames"
                v-show="newData.mediaFiles.imageFiles.length > 0"
              >
                <li
                  class="filename"
                  v-for="(filename, ind) in getListFilename(
                    newData.mediaFiles.imageFiles
                  )"
                  :key="ind"
                >
                  <p>{{ filename }}</p>
                  <button class="btnRemove" @click="removePickedImage(ind)">
                    <font-awesome-icon class="icon-add" icon="trash" />
                    <p>Xóa</p>
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <p>Nội dung</p>
            <textarea rows="8" v-model="newData.detail.text" />
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
          <li v-for="(info, ind) in newData.additional_information" :key="ind">
            <input
              type="text"
              placeholder="Tên thuộc tính"
              v-model="newData.additional_information[ind][0]"
            />
            <input
              type="text"
              placeholder="Nội dung"
              v-model="newData.additional_information[ind][1]"
            />
            <button class="btnRemove" @click="removeAdditionalInfo(ind)">
              <font-awesome-icon class="icon-add" icon="trash" />
              <p>Xóa</p>
            </button>
          </li>
        </ul>
      </li>

      <li class="form-action">
        <button class="btn-cancel" @click="cancelAddProduct">Hủy</button>
        <button class="btn-next" @click="onNextStep">Tiếp theo</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      newData: {
        name: "",
        version: "",
        intro: "",
        property_names: [],
        detail: {
          videos: null,
          images: null,
          text: null,
        },
        additional_information: [],
        mediaFiles: {
          videoFiles: [],
          imageFiles: [],
        },
      },
    };
  },
  methods: {
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
      this.newData.mediaFiles.videoFiles = [
        ...this.newData.mediaFiles.videoFiles,
        ...event.target.files,
      ];
    },

    removePickedVideo(index) {
      this.newData.mediaFiles.videoFiles.splice(index, 1);
    },

    onChooseImages() {
      this.$refs.refUploadImage.click();
    },

    pickImageFiles(event) {
      this.newData.mediaFiles.imageFiles = [
        ...this.newData.mediaFiles.imageFiles,
        ...event.target.files,
      ];
    },

    removePickedImage(index) {
      this.newData.mediaFiles.imageFiles.splice(index, 1);
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

.add-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 100px;

  .form {
    width: 70vw;
    min-width: 20rem;
    align-items: flex-start;
    list-style: none;
    border: 1px solid #666;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 20px;

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

          .list-filenames {
            display: flex;
            flex-direction: column;

            .filename {
              display: flex;
              flex-direction: row;

              .btnRemove {
                @extend .btn;
                color: red;
                border-color: red;
                margin: 0 20px;
                min-height: 1rem;
                min-width: 2.5rem;
                padding: 2px 2px !important;

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
      padding: 15px 0;

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
</style>