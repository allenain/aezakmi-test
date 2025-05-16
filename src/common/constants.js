export const BASE_PATH = "/aezakmi-test";

const appConstants = {
  routes: {
    index: `${BASE_PATH}/`,
    auth: `${BASE_PATH}/auth`,
    currency: `${BASE_PATH}/currency`,
    video: `${BASE_PATH}/video`,
    timer: `${BASE_PATH}/timer`,
  },

  storage: {
    accessTokenKey: "access_token",
    tokenCreatedAtKey: "token_created_at",
  },

  API_KEY: "fca_live_RX49YwIZ651VAEtUoV9mLOPskPcEtYP86pFr8140",

  token: {
    ttlMs: 60 * 60 * 1000,
  },

  currency: {
    SELL_MARKUP: 0.02,
    BUY_DISCOUNT: 0.015,
  },
};

export default appConstants;
