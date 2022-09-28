<template>
  <div class="qa-manager">
    <div class="header">
      <div class="nav">
        <h1 class="title">FAQs Manager</h1>
        <button class="btnAdd" @click="showAddView">
          <font-awesome-icon class="icon-more" icon="plus" />
          <p>Add FAQ</p>
        </button>
      </div>
    </div>

    <div class="list-faq">
      <div class="container">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-fid">Id</div>
            <div class="col col-que">Câu hỏi</div>
            <div class="col col-ans">Câu trả lời</div>
            <div class="col col-act">Action</div>
          </li>
          <div></div>
          <li class="table-row" v-for="(faq, ind) in listFaq" :key="ind">
            <div class="col col-fid">{{ ind + 1 }}</div>
            <div class="col col-que">{{ faq.question }}</div>
            <div class="col col-ans">
              <pre>{{ faq.answer }}</pre>
            </div>
            <div class="col col-act">
              <button class="btnEdit" @click="showEdittView(faq.id)">
                <font-awesome-icon class="icon-more" icon="pencil" />
                <p>Sửa</p>
              </button>
              <button class="btnRemove" @click="removeFaq(faq.id)">
                <font-awesome-icon class="icon-more" icon="trash" />
                <p>Xóa</p>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="popup" v-if="showPopup">
      <div class="form">
        <CreateUpdateFaq
          :faqId="editFaqId"
          v-on:onCancel="onCancel"
          v-on:onFinish="onFinish"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CreateUpdateFaq from "./CpnCreateUpdateFaq.vue";
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "QAManager",
  components: { CreateUpdateFaq },
  data() {
    return {
      showPopup: false,
      listFaq: null,
      editFaqId: null,
    };
  },
  async beforeMount() {
    await this.getListFaqs();
  },
  methods: {
    async getListFaqs() {
      await axios.get(backendUrl.urls.GET_ALL_FAQS_PATH_FULL).then((res) => {
        this.listFaq = res.data;
        console.log(this.listFaq);
      });
    },
    showAddView() {
      this.editFaqId = null;
      this.showPopup = true;
    },
    onCancel() {
      this.showPopup = false;
    },
    async onFinish(newFaq) {
      console.log(newFaq);
      if (newFaq.id == null) {
        await axios
          .post(backendUrl.urls.CREATE_FAQ_FULL_PATH, {
            ...newFaq,
            headers: backendUrl.header,
          })
          .then((res) => {
            console.log(res);
            alert("Tạo câu hỏi thành công");
            this.showPopup = false;
          })
          .catch((e) => {
            console.log(e);
            alert("Tạo câu hỏi không thành công");
            this.showPopup = false;
          });
      } else {
        await axios
          .put(backendUrl.urls.EDIT_FAQ_FULL_PATH, {
            ...newFaq,
          })
          .then((res) => {
            console.log(res);
            alert("Chỉnh sửa thành công");
            this.getListFaqs();
            this.showPopup = false;
          })
          .catch((e) => {
            console.log(e);
            alert("Chỉnh sửa không thành công");
            this.getListFaqs();
            this.showPopup = false;
          });
      }
    },
    showEdittView(fid) {
      this.editFaqId = fid;
      this.showPopup = true;
    },
    async removeFaq(fid) {
      if (confirm("Bạn muốn xóa Faq này?")) {
        await axios
          .delete(
            backendUrl.urls.DELETE_FAQ_BY_FID_FULL_PATH.replace("<$fid>", fid),
            {
              headers: backendUrl.header,
            }
          )
          .then((res) => {
            console.log(res);
            alert("Xóa Faq thành công");
          })
          .catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi khi xóa Faq");
          });
        await this.getListFaqs();
      }
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

.qa-manager {
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

  .list-faq {
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
        .col {
          padding: 0 1rem;
        }
        .col-fid {
          flex-basis: 10%;
        }
        .col-que {
          flex-basis: 30%;
        }
        .col-ans {
          flex-basis: 50%;
          height: auto;
          pre {
            overflow-x: auto;
            white-space: pre-wrap;
            white-space: -moz-pre-wrap;
            white-space: -pre-wrap;
            white-space: -o-pre-wrap;
            word-wrap: break-word;
          }
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

  .popup {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: #25222290;
    z-index: 50;
    overflow: hidden;

    .form {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>