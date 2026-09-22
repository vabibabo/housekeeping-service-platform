<template>
  <q-page class="flex flex-center">
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding: 50px"
    >
      <q-card-section>
        <div class="row text-h6 text-primary text-weight-bold no-wrap">
          <q-icon name="stop" class="text-secondary" style="font-size: 32px" />
          登录
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="account"
          v-model.trim="data.data.account"
          required
          autofocus
          label="账号"
        />
        <q-input
          id="password"
          v-model="data.data.password"
          required
          :type="isPwd ? 'password' : 'text'"
          label="密码"
        >
          <template v-slot:append>
            <q-icon
              color="accent"
              class="cursor-pointer"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="q-ml-ma row" style="padding-right: 10px">
          <q-checkbox id="rememberMe" v-model="rememberMe" label="记住" />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          type="submit"
          color="secondary"
          icon-right="input"
          @click="login"
        >
          登录&nbsp;&nbsp;
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <q-btn color="warning" icon-right="how_to_reg" to="register">
          &nbsp;&nbsp;注册 &nbsp;&nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="secondary" />
      </q-inner-loading>
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
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { setStorage, getStorage } from "src/utils/localStorage";
export default {
  name: "",
  components: {},
  data() {
    return {
      isPwd: true,
      data: {
        data: {
          account: "",
          password: "",
        },
      },
      rememberMe: false,
      loading: false,
      messageDialog: false,
      message: "",
    };
  },
  created() {
    // 加入初始记住的用户信息
    if (getStorage("rememberMe") === "true") {
      this.$router.push("/home");
    }
  },
  methods: {
    login() {
      this.loading = true;
      if (this.data.data.account && this.data.data.password) {
        this.$api.post("user/login", this.data.data).then((res) => {
          this.loading = false;
          if (res.data.code == 200) {
            setStorage("rememberMe", this.rememberMe);
            setStorage("id", res.data.datas.id);
            setStorage("nickname", res.data.datas.name);
            setStorage("authorityid", res.data.datas.authorityId);
            this.$router.push("/home");
          } else {
            this.messageDialog = true;
            this.message = res.data.message;
          }
        });
      } else {
        this.messageDialog = true;
        this.message = "请输入账号和密码";
        this.loading = false;
      }
    },
  },
};
</script>
