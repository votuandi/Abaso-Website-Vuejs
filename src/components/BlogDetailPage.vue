<template>
  <div class="blog">
    <embed :src="getPdfUrl()" wmode="transparent" background-color="#fff" />
  </div>
</template>

<script>
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
import firebase from "@/utilities/firebase";
export default {
  name: "BlogCard",
  data() {
    return {
      blogId: this.$route.params.blogId,
      blogUrl: null,
    };
  },
  async beforeMount() {
    let url = backendUrl.urls.GET_BLOG_BY_BID_FULL_PATH.replace(
      "<$bid>",
      this.blogId
    );
    console.log(url);
    let pdf;
    await axios.get(url).then((res) => {
      pdf = res.data.pdf;
    });
    this.blogUrl = await firebase.getFriebaseFileUrl(pdf);
    console.log(this.blogUrl);
  },
  methods: {
    getPdfUrl() {
      return `${this.blogUrl}#toolbar=0&navpanes=0&scrollbar=0`;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  height: auto;
  width: 100vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;

  embed {
    width: 90vw;
    height: 100vh;
  }
}
</style>