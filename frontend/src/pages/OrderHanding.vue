<template>
  <q-page class="flex flex-center">
    <q-table
      title="订单管理"
      hide-bottom
      :rows="data"
      row-key="id"
      dense
      :selection="this.authorityid >= 2 ? 'single' : 'none'"
      v-model:selected="selected"
      :rows-per-page-options="[0]"
    >
      <template v-slot:bottom-row>
        <q-btn-group spread>
          <q-btn
            v-if="this.authorityid == 3"
            @click="fenpeiScreen"
            color="yellow"
            no-wrap
            label="分配订单"
            icon="timeline"
          />
          <q-btn
            v-if="this.authorityid == 2"
            @click="finishOrder()"
            color="primary"
            no-wrap
            label="完成订单"
            icon="upload"
          />
          <q-btn
            v-if="this.authorityid == 3"
            @click="delateOrder()"
            color="red"
            no-wrap
            label="删除订单"
            icon="delete"
          />
        </q-btn-group>
      </template>
    </q-table>
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
  <q-dialog v-model="fenpei" transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal text-white">
      <q-card-section>
        <div class="text-h6">选择员工进行该订单</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          hide-bottom
          :rows="fenpeidata"
          row-key="id"
          dense
          selection="single"
          v-model:selected="selectPlea"
          :rows-per-page-options="[0]"
        >
        </q-table>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn @click="fenpeiOrder" flat label="确定" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { getStorage, setStorage } from "src/utils/localStorage";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  created() {
    if (this.authorityid == 2) {
      this.$api.post("/order/workerOrder").then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.datas;
        }
      });
    } else if (this.authorityid == 3) {
      this.$api.post("/order/allOrder").then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.datas;
        }
      });
      this.$api.post("/user/plea").then((res) => {
        this.fenpeidata = res.data.datas;
      });
    } else {
      this.$router.push("/home");
    }
  },
  data() {
    return {
      authorityid: getStorage("authorityid"),
      data: [],
      selected: [],
      target: "",
      messageDialog: false,
      message: "",
      fenpeidata: [],
      fenpei: false,
      selectPlea: [],
    };
  },
  methods: {
    delateOrder() {
      if (this.selected.length == 0) {
        this.messageDialog = true;
        this.message = "请选择一条订单进行操作";
        return;
      }
      this.$api.post("/order/delete/" + this.selected[0].id).then((res) => {
        if (res.data.datas == 1) {
          this.messageDialog = true;
          this.message = "删除成功";
          if (this.authorityid == 2) {
            this.$api.post("/order/workerOrder").then((res) => {
              if (res.data.code == 200) {
                this.data = res.data.datas;
              }
            });
          } else if (this.authorityid == 3) {
            this.$api.post("/order/allOrder").then((res) => {
              if (res.data.code == 200) {
                this.data = res.data.datas;
              }
            });
          } else {
            this.$router.push("/home");
          }
        } else {
          this.messageDialog = true;
          this.message = "删除失败";
        }
      });
    },
    fenpeiOrder() {
      if (this.selectPlea.length == 0) {
        this.messageDialog = true;
        this.message = "请选择一名员工进行操作";
        return;
      }
      this.$api
        .post(
          "/order/orderUser/" +
            this.selected[0].id +
            "/" +
            this.selectPlea[0].userid
        )
        .then((res) => {
          if (res.data.datas == 1) {
            if (this.authorityid == 2) {
              this.$api.post("/order/workerOrder").then((res) => {
                if (res.data.code == 200) {
                  this.data = res.data.datas;
                }
              });
            } else if (this.authorityid == 3) {
              this.$api.post("/order/allOrder").then((res) => {
                if (res.data.code == 200) {
                  this.data = res.data.datas;
                }
              });
              this.$api.post("/user/plea").then((res) => {
                this.fenpeidata = res.data.datas;
              });
            } else {
              this.$router.push("/home");
            }
            this.messageDialog = true;
            this.message = "分配成功";
          }
        });
    },
    finishOrder() {
      if (this.selected.length == 0) {
        this.messageDialog = true;
        this.message = "请选择一条订单进行操作";
        return;
      } else if (this.selected[0].situ == "完成") {
        this.messageDialog = true;
        this.message = "该订单已完成,请勿重复操作";
        return;
      }
      this.$api
        .post("/order/finishOrder/" + this.selected[0].id)
        .then((res) => {
          if (res.data.datas == 1) {
            this.selected[0].situ = "完成";
            this.messageDialog = true;
            this.message = "成功完成订单";
          } else {
            this.messageDialog = true;
            this.message = "完成失败";
          }
        });
    },
    fenpeiScreen() {
      if (this.selected.length == 0) {
        this.messageDialog = true;
        this.message = "请先选择一个订单";
        return;
      } else if (this.selected[0].situ == "完成") {
        this.messageDialog = true;
        this.message = "该订单已完成，无需分配员工";
        return;
      }
      this.fenpei = !this.fenpei;
    },
  },
});
</script>
