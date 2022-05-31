import { createStore } from "vuex";
import { auth } from "./modules/auth/auth";
import { common } from "./modules/common/common";
import { borrower } from "./modules/borrower/borrower";
// eslint-disable-next-line no-unused-vars

export default createStore({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    common: common,
    borrower: borrower,
  },
});
