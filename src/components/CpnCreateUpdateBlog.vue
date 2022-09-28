<template>
  <div class="main">
    <div class="container">
      <div class="form">
        <div class="title">
          <h1 v-if="faqId == null">Tạo blog mới</h1>
          <h1 v-if="faqId != null">Chỉnh sửa blog</h1>
        </div>

        <ul class="fields">
          <li>
            <p>Tiêu đề</p>
            <textarea rows="3" v-model="newData.title" />
          </li>
          <li>
            <p>Trích dẫn</p>
            <textarea rows="12" v-model="newData.sapo" />
          </li>
          <li class="file-container">
            <div class="pick-file-container">
              <div class="choose-file">
                <p>Chọn file blog</p>
                <button class="btnAdd" @click="onChoosePdfFile">
                  <font-awesome-icon class="icon-add" icon="file" />
                  <p>Chọn file</p>
                </button>
                <input
                  type="file"
                  accept="application/pdf"
                  ref="refPickPdfFile"
                  v-show="false"
                  @change="pickPdfFile($event)"
                  multiple
                />
              </div>
              <div class="choose-file">
                <p>Chọn Ảnh đại diện</p>
                <button class="btnAdd" @click="onChooseImgFile">
                  <font-awesome-icon class="icon-add" icon="file" />
                  <p>Chọn file</p>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref="refPickImgFile"
                  v-show="false"
                  @change="pickImgFile($event)"
                  multiple
                />
              </div>
            </div>

            <img class="img-preview" :src="media.imgUrl" alt="" />
          </li>
        </ul>
      </div>

      <div class="preview">
        <p v-if="media.pdfFile == null && media.pdfUrl == null">Preview</p>
        <embed
          v-if="media.pdfFile != null || media.pdfUrl != null"
          :src="getPdfUrl()"
        />
      </div>
    </div>

    <div class="actions">
      <button class="cancel" @click="onCancel">Hủy</button>
      <button class="finish" @click="onFinish">Hoàn tất</button>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
import firebaseUtils from "@/utilities/firebase";
export default {
  name: "CreateUpdateBlog",
  props: {
    blogId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      newData: {
        title: "",
        sapo: "",
        pdf: null,
        img: null,
      },
      media: {
        pdfFile: null,
        pdfUrl: null,
        imgFile: null,
        imgUrl: null,
      },
    };
  },
  async beforeMount() {
    if (this.blogId != null) {
      await axios
        .get(
          backendUrl.urls.GET_BLOG_BY_BID_FULL_PATH.replace(
            "<$bid>",
            this.blogId
          )
        )
        .then((res) => {
          this.newData = res.data;
          console.log(this.newData);
        })
        .catch((r) => {
          console.log(r);
        });
      this.media.pdfUrl = await firebaseUtils.getFriebaseFileUrl(
        this.newData.pdf
      );
      this.media.imgUrl = await firebaseUtils.getFriebaseFileUrl(
        this.newData.img
      );
    }
    // console.log(this.pdfUrl);
  },
  methods: {
    onChooseImgFile() {
      this.$refs.refPickImgFile.click();
    },

    pickImgFile(event) {
      this.media.imgFile = event.target.files[0];
      this.media.imgUrl = URL.createObjectURL(this.media.imgFile);
    },

    onChoosePdfFile() {
      this.$refs.refPickPdfFile.click();
    },

    pickPdfFile(event) {
      this.media.pdfFile = event.target.files[0];
      this.media.pdfUrl = URL.createObjectURL(this.media.pdfFile);
    },

    getPdfUrl() {
      return `${this.media.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;
    },

    onCancel() {
      if (confirm("Bạn thật sự muốn hủy?")) {
        this.$emit("onCancel");
      }
    },

    async onFinish() {
      if (this.newData.title.length == 0 || this.newData.sapo.length == 0) {
        alert("Tiêu đề và trích dẫn không được để trống");
      } else if (this.newData.pdf == null && this.media.pdfFile == null) {
        alert("Bạn chưa chọn file Pdf.");
      } else {
        let txtNotify =
          this.faqId == null ? "Tạo blog mới này?" : "Xác nhận chỉnh sửa?";
        if (confirm(txtNotify)) {
          if (this.media.pdfFile != null) {
            this.newData.pdf = await firebaseUtils.uploadFileToFirebase(
              this.media.pdfFile
            );
            this.newData.img = await firebaseUtils.uploadFileToFirebase(
              this.media.imgFile
            );
          }
          this.$emit("onFinish", { ...this.newData, id: this.blogId });
        }
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
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

.title-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 5px 0;

  button {
    @extend .btn;
  }
}

.main {
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 80vh;
  background-color: #fff;
  border: 1px solid #666;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-items: center;
  justify-content: space-evenly;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .form {
      overflow-y: auto;
      justify-content: space-evenly;
      display: flex;
      flex-direction: column;
      display: flex;

      .title {
        text-align: center;
      }

      .fields {
        list-style: none;

        li {
          padding: 0.5rem;
          width: 100%;

          p {
            text-align: left;
            padding: 0 0 0.25rem 0;
          }

          textarea {
            resize: none;
            padding: 10px;
            border: 1px solid #666;
            border-radius: 5px;
            width: 40vw;
            min-width: 15rem;
          }
        }

        .file-container {
          display: flex;
          flex-direction: row;

          .pick-file-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .choose-file {
              @extend .title-container;
              padding: 0 !important;
            }
          }
          .img-preview {
            height: 64px;
            width: auto;
            margin-left: 2rem;
            border: 0px;
            border-radius: 5px;
          }
        }
      }
    }

    .preview {
      display: flex;
      height: 60vh;
      width: 32vw;
      margin-left: 3rem;
      background-color: rgba(0, 0, 0, 0.1);
      align-items: center;
      justify-content: center;

      p {
        color: #727272;
      }

      embed {
        height: 60vh;
        width: 32vw;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: row;

    button {
      @extend .btn;
      margin: 0 0.75rem;
    }

    .cancel {
      color: #666;
      border-color: #666;

      &:hover {
        background-color: #666;
        border-color: #666;
        color: #ffffff;
        cursor: pointer;

        p {
          display: block;
        }
      }
    }
  }
}
</style>