<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">个人信息</div>
      </q-card-section>
      <q-card-section>
        <div rounded class="bg-grey-3" style="width: 600px">
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>昵称</q-item-label>
                <q-item-label caption>{{ nickname }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>姓名</q-item-label>
                <q-item-label caption>{{ data.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>性别</q-item-label>
                <q-item-label caption>{{ data.sex }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>年龄</q-item-label>
                <q-item-label caption>{{ data.age }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>地址</q-item-label>
                <q-item-label caption>{{ data.address }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>电话号码</q-item-label>
                <q-item-label caption>{{ data.phone }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item clickable v-ripple to="profile/changeProfile">
              <q-item-section>
                <q-item-label>修改个人信息</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { getStorage, setStorage } from "src/utils/localStorage";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      nickname: getStorage("nickname"),
      data: {
        name: "",
        sex: "",
        age: "",
        address: "",
        phone: "",
      },
    };
  },
  created() {
    this.$api.post("profile/getMyProfile").then((res) => {
      if (res.data.code == 200 && res.data.datas != null) {
        this.data = res.data.datas;
      }
    });
  },
  methods: {},
});
</script>
