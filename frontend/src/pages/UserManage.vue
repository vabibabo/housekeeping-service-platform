<template>
  <q-page class="flex flex-center">
    <q-table
      title="用户管理"
      hide-bottom
      :rows="data"
      row-key="id"
      :selection="this.authorityid == 3 ? 'single' : 'none'"
      v-model:selected="selected"
      :rows-per-page-options="[0]"
    >
      <template v-slot:bottom-row>
        <q-btn-group spread>
          <q-btn
            v-if="this.authorityid == 3"
            @click="setManage()"
            color="primary"
            no-wrap
            label="更改权限"
            icon="upload"
          />
          <q-btn
            v-if="this.authorityid == 3"
            @click="delateUser()"
            color="red"
            no-wrap
            label="删除用户"
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
        <q-btn flat label="OK" v-close-popup />
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
      data: [],
      selected: [],
      authorityid: getStorage("authorityid"),
      messageDialog: false,
      message: "",
    };
  },
  created() {
    this.$api.post("/user/users").then((res) => {
      if (res.data.code == 200) {
        this.data = res.data.datas;
      }
    });
  },
  methods: {
    setManage() {
      if (this.selected[0].authorityId == 3) {
        this.messageDialog = true;
        this.message = "不能操作该用户";
        return;
      } else if (this.selected[0].authorityId == 1) {
        this.$api
          .post("/user/setManage/" + this.selected[0].id + "/" + 2)
          .then((res) => {
            if (res.data.datas.authorityId == 2) {
              this.selected[0].authorityId = 2;
            }
          });
      } else {
        this.$api
          .post("/user/setManage/" + this.selected[0].id + "/" + 1)
          .then((res) => {
            if (res.data.datas.authorityId == 1) {
              this.selected[0].authorityId = 1;
            }
          });
      }
    },
    delateUser() {
      if (this.selected[0].authorityId == 3) {
        this.messageDialog = true;
        this.message = "不能操作该用户";
        return;
      }
      this.$api.post("/user/delete/" + this.selected[0].id).then((res) => {
        console.log(res);
        if (!res.data.datas) {
          this.data = this.data.filter((res) => {
            return res.id != this.selected[0].id;
          });
        }
      });
    },
  },
});
</script>
