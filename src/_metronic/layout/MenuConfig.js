export default {
  aside: {
    self: {},
    items: [
      {
        title: "Альбом",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "md/view",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      {
        title: "Новая кампания",
        root: true,
        icon: "flaticon2-expand",
        page: "campaign/new-create"
      },
      {
        title: "Кампания",
        root: true,
        icon: "flaticon2-expand",
        page: "campaign/view"
      },
      {
        title: "Экран",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "myboards/view",
        role: "owner"
      },
      {
        title: "Проверка кампании",
        root: true,
        icon: "flaticon2-expand",
        page: "wizard"
      },
      {
        title: "Профайл",
        root: true,
        bullet: "dot",
        icon: "flaticon2-digital-marketing",
        page: "profile"
      },
      {
        title: "Профайл",
        subtitle: "Расходы и Доходы",
        root: true,
        bullet: "dot",
        icon: "flaticon2-digital-marketing",
        page: "profile/finance"
      },
      {
        title: "Профайл",
        subtitle: "Загрузка Аватара",
        root: true,
        bullet: "dot",
        icon: "flaticon2-digital-marketing",
        page: "profile/avatar"
      },
      {
        title: "Профайл",
        subtitle: "Данные Пользователя",
        root: true,
        bullet: "dot",
        icon: "flaticon2-digital-marketing",
        page: "profile/password"
      },
      {
        title: "Профайл",
        subtitle: "Настройки Доступа",
        root: true,
        bullet: "dot",
        icon: "flaticon2-digital-marketing",
        page: "profile/members"
      },
      {
        title: "Error Pages",
        root: true,
        bullet: "dot",
        icon: "flaticon-danger",
        page: "/campaign/new-create",
        submenu: [
          {
            title: "Error Page - 1",
            page: "error/error-v1"
          },
          {
            title: "Error Page - 2",
            page: "error/error-v2"
          },
          {
            title: "Error Page - 3",
            page: "error/error-v3"
          },
          {
            title: "Error Page - 4",
            page: "error/error-v4"
          },
          {
            title: "Error Page - 5",
            page: "error/error-v5"
          },
          {
            title: "Error Page - 6",
            page: "error/error-v6"
          }
        ]
      }
    ]
  },
  header: {
    self: {},
    items: [
      {
        title: "Кампании",
        root: true,
        alignment: "left",
        page: "campaign",
        translate: "MENU.DASHBOARD",
        role: "all"
      },
      {
        title: "Устройства",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "myboards",
        role: "owner"
      },
      {
        title: "Файлы",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "md",
        role: "all"
      },
      {
        title: "Товары",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "md",
        role: "all"
      }
    ]
  }
};
