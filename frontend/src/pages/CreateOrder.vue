<template>
  <q-page class="flex flex-center">
    <q-card bordered>
      <q-card-section>
        <div class="text-h6">发布订单</div>
      </q-card-section>
      <q-card-section>
        <q-list separator>
          <q-item>
            <q-select
              outlined
              v-model="data.type"
              :options="type"
              label="种类"
            />
          </q-item>
          <q-item>
            <q-input outlined v-model="data.address" label="地址" />
          </q-item>
          <q-item>
            <q-input disable outlined v-model="data.price" label="价格" />
          </q-item>
          <q-item>
            <q-btn color="primary" label="确定" @click="submit" />
            <q-btn
              color="white"
              text-color="black"
              label="取消"
              to="/profile"
            />
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog
    v-model="messageDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">提示</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ this.message }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn :to="target" flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { getStorage, setStorage } from "src/utils/localStorage";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      type: [
        "职业保姆",
        "涉外保姆",
        "高级管家",
        "育婴早教",
        "钟点服务",
        "幼教保育",
        "家教外教",
      ],
      data: {
        type: "职业保姆",
        address: "",
        price: 50,
      },
      target: "",
      messageDialog: false,
      message: "",
    };
  },
  created() {},
  methods: {
    submit() {
      if (this.data.address == "") {
        this.messageDialog = true;
        this.message = "请输入地址";
        return;
      }
      this.$api.post("/order/create", this.data).then((res) => {
        if (res.data.datas == 1) {
          this.messageDialog = true;
          this.message = "发布成功";
          this.target = "/home";
          setStorage("active", "home");
        }
      });
    },
  },
});
</script>
