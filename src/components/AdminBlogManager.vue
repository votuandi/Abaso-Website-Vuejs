<template>
  <div class="blog-manager">
    <div class="header">
      <div class="nav">
        <h1 class="title">Blog Manager</h1>
        <button class="btnAdd" @click="showAddView">
          <font-awesome-icon class="icon-more" icon="plus" />
          <p>Add Blog</p>
        </button>
      </div>
    </div>

    <div class="list-faq">
      <div class="container">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-bid">Id</div>
            <div class="col col-tit">Tiêu đề</div>
            <div class="col col-sap">Phần mở đầu</div>
            <div class="col col-dat">Ngày update</div>
            <div class="col col-act">Action</div>
          </li>
          <div></div>
          <li class="table-row" v-for="(blog, ind) in listBlog" :key="ind">
            <div class="col col-bid">{{ ind + 1 }}</div>
            <div class="col col-tit">{{ blog.title }}</div>
            <div class="col col-sap">
              <pre>{{ blog.sapo }}</pre>
            </div>
            <div class="col col-dat">{{ getDate(blog.createDate) }}</div>
            <div class="col col-act">
              <button class="btnEdit" @click="showEdittView(blog.id)">
                <font-awesome-icon class="icon-more" icon="pencil" />
                <p>Sửa</p>
              </button>
              <button class="btnRemove" @click="removeBlog(blog.id)">
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
        <CreateUpdateBlog
          :blogId="editBlogId"
          v-on:onCancel="onCancel"
          v-on:onFinish="onFinish"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CreateUpdateBlog from "./CpnCreateUpdateBlog.vue";
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "BlogManager",
  components: { CreateUpdateBlog },
  data() {
    return {
      showPopup: false,
      listBlog: null,
      editBlogId: null,
    };
  },
  async beforeMount() {
    await this.getListBlogs();
  },
  methods: {
    async getListBlogs() {
      await axios.get(backendUrl.urls.GET_ALL_BLOGS_PATH_FULL).then((res) => {
        this.listBlog = res.data;
        console.log(this.listBlog);
      });
    },
    getDate(_date) {
      return _date.split("-").reverse().join("-");
    },
    showAddView() {
      this.editBlogId = null;
      this.showPopup = true;
    },
    onCancel() {
      this.showPopup = false;
    },
    async onFinish(newBlog) {
      console.log(newBlog);
      if (newBlog.id == null) {
        console.log(newBlog);
        await axios
          .post(backendUrl.urls.CREATE_BLOG_FULL_PATH, {
            ...newBlog,
          })
          .then((res) => {
            console.log(res);
            alert("Tạo blog thành công");
            this.showPopup = false;
          })
          .catch((e) => {
            console.log(e);
            alert("Tạo blog không thành công");
            this.showPopup = false;
          });
      } else {
        console.log("edit");
        console.log(newBlog);
        await axios
          .put(backendUrl.urls.EDIT_BLOG_FULL_PATH, {
            ...newBlog,
          })
          .then((res) => {
            console.log(res);
            alert("Chỉnh sửa thành công");
            this.getListBlogs();
            this.showPopup = false;
          })
          .catch((e) => {
            console.log(e);
            alert("Chỉnh sửa không thành công");
            this.getListBlogs();
            this.showPopup = false;
          });
      }
      await this.getListBlogs();
    },
    showEdittView(bid) {
      this.editBlogId = bid;
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

    async removeBlog(bid) {
      if (confirm("Bạn muốn xóa Blog này?")) {
        await axios
          .delete(
            backendUrl.urls.DELETE_BLOG_BY_BID_FULL_PATH.replace("<$bid>", bid)
          )
          .then((res) => {
            console.log(res);
            alert("Xóa Blog thành công");
          })
          .catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi khi xóa Blog");
          });
        await this.getListBlogs();
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

.blog-manager {
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
        .col-bid {
          flex-basis: 10%;
        }
        .col-tit {
          flex-basis: 30%;
        }
        .col-sap {
          flex-basis: 40%;
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
        .col-dat {
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