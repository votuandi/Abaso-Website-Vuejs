<template>
  <div class="blogs-page">
    <h1 class="title">
      Cùng Abaso cập nhật xu thế công nghệ hiện đại trong làm bánh
    </h1>
    <div class="list-blogs">
      <ul class="blogs-cards">
        <li class="blogs-card" v-for="blog in listBlogs" :key="blog.id">
          <router-link
            class="nav-link"
            :to="{
              name: 'BlogDetailPage',
              params: { blogId: blog.id },
            }"
          >
            <div class="blog-img">
              <img :src="getBlogImgUrl(blog.id)" alt="" />
            </div>
            <div class="blog-texts">
              <h3 class="title">{{ blog.title }}</h3>
              <p class="time">{{ blog.createDate }}</p>
              <p class="cut-content">{{ blog.sapo }}</p>
            </div></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
import firebase from "@/utilities/firebase";
export default {
  name: "BlogsPage",
  data() {
    return {
      listBlogs: [],
    };
  },
  async beforeMount() {
    await axios.get(backendUrl.urls.GET_ALL_BLOGS_PATH_FULL).then((res) => {
      this.listBlogs = res.data;
    });

    for (let blog of this.listBlogs) {
      blog.imgUrl = await firebase.getFriebaseFileUrl(blog.img);
    }
  },
  methods: {
    getBlogImgUrl(id) {
      return this.listBlogs.filter((b) => b.id == id)[0].imgUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.blogs-page {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 100px;
  width: 100vw;
  height: 100%;
  align-items: center;
  justify-content: start;

  .title {
    text-align: center;
    color: #000;
  }

  .list-blogs {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100vw;

    .blogs-cards {
      // background-color: aqua;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 5px;

      li {
        // background-color: coral;
        height: 210px;
        width: 680px;
        display: flex;
        flex-direction: row;
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.19);
        border-radius: 10px;
        padding: 5px;
        margin: 15px 0;

        &:hover {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05),
            0 6px 20px 0 rgba(0, 0, 0, 0.05);
        }

        .blog-img {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            height: 200px;
            width: 200px;
            border-bottom: 0px;
            border-radius: 10px;
          }
        }

        .blog-texts {
          // background-color: blueviolet;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 5px 10px;

          h3 {
            font-size: 24px;
            font-weight: 900;
          }

          p.time {
            color: #666;
            font-size: 10;
            font-weight: 500;
          }

          p.cut-content {
            font-size: 14px;
            text-align: justify;
            padding-top: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>