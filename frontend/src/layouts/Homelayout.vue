<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> 家政服务平台 </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list bordered padding class="rounded-borders">
        <q-item
          :active="active === 'home'"
          @click="setActive('home')"
          clickable
          v-ripple
          to="/home"
        >
          <q-item-section> 首页 </q-item-section>
        </q-item>

        <q-item
          :active="active === 'profile'"
          @click="setActive('profile')"
          clickable
          v-ripple
          to="profile"
        >
          <q-item-section> 个人信息 </q-item-section>
        </q-item>

        <q-item
          v-if="authorityid > 1"
          :active="active === 'user'"
          @click="setActive('user')"
          clickable
          v-ripple
          to="userManage"
        >
          <q-item-section> 用户管理 </q-item-section>
        </q-item>

        <q-item
          v-if="authorityid > 1"
          :active="active === 'orderHanding'"
          @click="setActive('orderHanding')"
          clickable
          v-ripple
          to="orderHanding"
        >
          <q-item-section> 订单处理 </q-item-section>
        </q-item>

        <q-item
          :active="active === 'order'"
          @click="setActive('order')"
          clickable
          v-ripple
          to="order"
        >
          <q-item-section> 发布订单 </q-item-section>
        </q-item>

        <q-item
          :active="active === 'myOrder'"
          @click="setActive('myOrder')"
          clickable
          v-ripple
          to="myOrder"
        >
          <q-item-section> 我的订单 </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section> 登出 </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import router from "src/router";
import { getStorage, setStorage } from "src/utils/localStorage";
import { defineComponent } from "vue";
export default defineComponent({
  name: "HomeLayout",
  data() {
    return {
      authorityid: getStorage("authorityid"),
      active: getStorage("active") ? getStorage("active") : "home",
      rightDrawerOpen: false,
    };
  },
  created() {
    if (!this.authorityid || this.authorityid == "") {
      this.$router.push("/");
    }
  },
  methods: {
    setActive(option) {
      setStorage("active", option);
      this.active = getStorage("active");
    },
    logout() {
      this.$api.get("/user/logout").then((res) => {
        if (res.data.code == 200) {
          setStorage("rememberMe", "false");
          setStorage("id", "");
          setStorage("active", "");
          setStorage("authorityid", "");
          this.$router.push("/");
        }
      });
    },
  },
});
</script>
