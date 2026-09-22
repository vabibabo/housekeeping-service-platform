<template>
  <q-page class="flex flex-center">
    <q-card bordered class="bg-primary text-white">
      <q-card-section>
        <div class="text-h6">我的订单</div>
      </q-card-section>
      <q-card-section>
        <q-table
          hide-bottom
          :rows="data"
          dense
          row-key="id"
          grid
          :rows-per-page-options="[0]"
        >
        </q-table>
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
      authorityid: getStorage("authorityid"),
      target: "",
      messageDialog: false,
      message: "",
      data: [],
    };
  },
  created() {
    this.$api.post("/order/myOrder").then((res) => {
      if (res.data.code == 200) {
        this.data = res.data.datas;
      }
    });
  },
  methods: {},
});
</script>
