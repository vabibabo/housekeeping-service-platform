<template>
  <q-page class="flex flex-center">
    <q-card bordered>
      <q-card-section>
        <div class="text-h6">个人信息</div>
      </q-card-section>
      <q-card-section>
        <q-list separator>
          <q-item>
            <q-input outlined v-model="data.name" label="姓名" />
          </q-item>
          <q-item>
            <q-input outlined v-model="data.sex" label="性别" />
          </q-item>
          <q-item>
            <q-input outlined v-model="data.age" label="年龄" />
          </q-item>
          <q-item>
            <q-input outlined v-model="data.address" label="地址" />
          </q-item>
          <q-item>
            <q-input outlined v-model="data.phone" label="电话" />
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
</template>

<script>
import { getStorage, setStorage } from "src/utils/localStorage";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChangeProfile",
  data() {
    return {
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
  methods: {
    submit() {
      this.$api.post("profile/updateMyProfile", this.data).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/profile");
        }
      });
    },
  },
});
</script>
