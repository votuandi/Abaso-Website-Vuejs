<template>
  <div class="container">
    <div class="title">
      <h1 v-if="faqId == null">Tạo câu hỏi mới</h1>
      <h1 v-if="faqId != null">Chỉnh sửa câu hỏi</h1>
    </div>

    <ul class="form">
      <li>
        <p>Câu hỏi</p>
        <textarea rows="3" v-model="newData.question" />
      </li>
      <li>
        <p>Câu trả lời</p>
        <textarea rows="5" v-model="newData.answer" />
      </li>
    </ul>

    <div class="actions">
      <button class="cancel" @click="onCancel">Hủy</button>
      <button class="finish" @click="onFinish">Hoàn tất</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "CreateUpdateFaq",
  props: {
    faqId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      newData: {
        question: "",
        answer: "",
      },
    };
  },
  async beforeMount() {
    if (this.faqId != null) {
      await axios
        .get(
          backendUrl.urls.GET_FAQ_BY_FID_FULL_PATH.replace("<$fid>", this.faqId)
        )
        .then((res) => {
          this.newData = res.data;
          console.log(this.newData);
        });
    }
  },
  methods: {
    onCancel() {
      if (confirm("Bạn thật sự muốn hủy?")) {
        this.$emit("onCancel");
      }
    },
    onFinish() {
      if (
        this.newData.question.length == 0 ||
        this.newData.answer.length == 0
      ) {
        alert("Câu hỏi và câu trả lời không được để trống");
      } else {
        let txtNotify =
          this.faqId == null ? "Tạo câu hỏi mới này?" : "Xác nhận chỉnh sửa?";
        if (confirm(txtNotify)) {
          this.$emit("onFinish", { ...this.newData, id: this.faqId });
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

.container {
  display: flex;
  flex-direction: column;
  width: 72vw;
  height: 54vh;
  background-color: #fff;
  border: 1px solid #666;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-y: auto;
  justify-content: space-evenly;
  align-items: center;

  .title {
  }

  .form {
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
        width: 60vw;
        min-width: 15rem;
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