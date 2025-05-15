const appConstants = {
  routes: {
    index: "/",
    auth: "/auth",
    currency: "/currency",
    video: "/video",
    timer: "/timer",
  },

  storage: {
    accessTokenKey: "access_token",
    tokenCreatedAtKey: "token_created_at",
  },

  API_KEY: "fca_live_RX49YwIZ651VAEtUoV9mLOPskPcEtYP86pFr8140",

  token: {
    ttlMs: 60 * 60 * 1000,
  },

  pages: {
    titles: {
      currency: "Курс валют",
      video: "Видео",
      timer: "Таймер",
    },
  },

  search: {
    types: {
      post: "post",
      user: "user",
    },
  },
};

export default appConstants;
