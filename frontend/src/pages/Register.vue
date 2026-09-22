<template>
  <q-page class="flex flex-center">
    <!-- content -->
    <q-card square style="width: 400px; padding: 50px">
      <q-card-section class="row">
        <div class="row text-h6 text-primary no-wrap text-bold">注册新账号</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model.trim="data.data.name"
          type="text"
          autofocus
          label="昵称"
        />
        <q-input v-model.trim="data.data.account" label="账号" />
        <q-input
          v-model.trim="data.data.password"
          :type="isPwd ? 'password' : 'text'"
          label="密码"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model.trim="data.data.password_confirmation"
          :type="isPwd ? 'password' : 'text'"
          label="重复输入密码"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="row no-wrap" align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn color="primary" icon="save" @click="register"> 注册 </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn color="warning" icon-right="cancel" to="/"> 取消 </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
  <q-dialog
    v-model="messageDialog"
    transition-show="scale"
    transition-hide="scale"
    persistent
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
export default {
  name: "",
  components: {},
  data() {
    return {
      isPwd: true,
      data: {
        data: {
          name: "",
          account: "",
          password: "",
          password_confirmation: "",
        },
      },
      loading: false,
      messageDialog: false,
      message: "",
      target: "",
    };
  },
  methods: {
    register() {
      if (
        this.data.data.name == "" ||
        this.data.data.account == "" ||
        this.data.data.password == ""
      ) {
        this.messageDialog = true;
        this.message = "请完成表单";
      } else {
        if (this.data.data.password == this.data.data.password_confirmation) {
          this.loading = true;
          this.$api.post("user/register", this.data.data).then((res) => {
            this.loading = false;
            if (res.data.code == 200) {
              this.messageDialog = true;
              this.message = "完成注册";
              this.target = "/";
            } else {
              this.messageDialog = true;
              this.message = res.data.message;
            }
          });
        } else {
          this.messageDialog = true;
          this.message = "两次密码不同";
        }
      }
    },
  },
};
</script>
