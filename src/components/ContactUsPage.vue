<template>
  <div class="contact-us-page">
    <img class="faqs-logo" src="@\assets\img\faqs-logo.png" alt="" />
    <div class="seach-bar">
      <input
        type="text"
        class="inp-search"
        placeholder="Bạn đang thắc mắc gì về Abaso?"
        v-model="inpSearchContent"
        @input="search()"
      />
      <button class="btn-search" v-on:click="search()">
        <font-awesome-icon class="icon-search" icon="search" color="#fff" />
      </button>
    </div>
    <div class="list-faqs" v-if="listFaqs.length > 0">
      <div class="faq" v-for="(faq, ind) in listFaqs" :key="ind">
        <div class="question">
          <img src="@/assets/img/question-icon.png" alt="" />
          <div class="text">
            <pre>{{ faq.question }}</pre>
          </div>
        </div>
        <div class="answer">
          <img src="@/assets/img/answer-icon.png" alt="" />
          <div class="text">
            <pre>{{ faq.answer }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "ContactUsPage",
  data() {
    return {
      listFaqs: [],
      inpSearchContent: "",
    };
  },
  async beforeMount() {
    await axios
      .get(backendUrl.urls.GET_ALL_FAQS_PATH_FULL)
      .then((res) => {
        this.listFaqs = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    async search() {
      await axios
        .get(
          backendUrl.urls.SEARCH_FAQS_PATH_FULL.replace(
            "<$keyword>",
            this.inpSearchContent
          )
        )
        .then((res) => {
          this.listFaqs = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-us-page {
  padding: 100px 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .faqs-logo {
    height: 15vh;
    width: auto;
  }

  .seach-bar {
    height: 36px;
    width: 36rem;
    background-color: #fff;
    border-radius: 36px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 0.1875rem;
    margin: 1rem;

    &:focus-within {
      background-color: #fff;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 4px 8px 0 rgba(0, 0, 0, 0.19);
    }

    .inp-search {
      font-size: 14px;
      width: 90%;
      padding-left: 10px;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: 20px;

      &:focus {
        outline: none !important;
        // background-color: rgba(0, 0, 0, 0.03);
      }
    }

    .btn-search {
      // background-color: #1e90ff;
      background-color: #fff;
      width: 36px;
      border: 1px solid #fff;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;

      .icon-search {
        color: rgba(0, 0, 0, 0.8);
      }

      &:hover {
        background-color: #97d18c;
        .icon-search {
          color: #fff;
        }
      }

      &:active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
          inset 2px 2px 3px rgba(0, 0, 0, 0.6);
      }
    }
  }

  .list-faqs {
    height: 100%;
    width: 80vw;
    max-height: 150vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .faq {
      display: flex;
      flex-direction: column;
      margin: 3rem 0 1rem 0;

      .question {
        display: flex;
        flex-direction: row;

        img {
          height: 48px;
        }

        .text {
          width: 100%;
          max-width: 60vw;
          height: 100%;
          background-color: #98d28e;
          border-radius: 20px;
          display: flex;
          align-items: center;
          padding: 1rem;
          margin: 0 0.5rem;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          text-shadow: -1px 1px 0 #3d862f;

          pre {
            white-space: pre-wrap; /* css-3 */
            white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
            white-space: -pre-wrap; /* Opera 4-6 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word; /* Internet Explorer 5.5+ */
          }
        }
      }

      .answer {
        display: flex;
        flex-direction: row;
        padding: 1rem 0 0 2.5rem;

        img {
          height: 48px;
        }

        .text {
          width: 100%;
          width: 65vw;
          border: 0.5px solid #0067a7;
          border-radius: 10px;
          padding: 1rem;
          margin: 0 0.5rem;
          font-size: 20px;
          display: flex;
          align-items: center;

          pre {
            white-space: pre-wrap; /* css-3 */
            white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
            white-space: -pre-wrap; /* Opera 4-6 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word; /* Internet Explorer 5.5+ */
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    .seach-bar {
      width: 90vw;
    }
    .list-faqs {
      width: 100vw;
      padding: 0 1rem;
    }
  }
}
</style>