const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
      },
      { path: "register", component: () => import("pages/Register.vue") },
      {
        path: "/profile/changeProfile",
        component: () => import("pages/ChangeProfile"),
      },
    ],
  },
  {
    path: "/home",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Homepage.vue"),
      },
      {
        path: "/profile",
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "/userManage",
        component: () => import("pages/UserManage.vue"),
      },
      {
        path: "/orderHanding",
        component: () => import("pages/OrderHanding.vue"),
      },
      {
        path: "/order",
        component: () => import("pages/CreateOrder.vue"),
      },
      {
        path: "/myOrder",
        component: () => import("pages/CheckOrder.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
