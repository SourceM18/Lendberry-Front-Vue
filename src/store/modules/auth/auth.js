export const auth = {
  state: () => ({
    user: {
      phone: "",
      userId: "",
      type: "",
      Logged_in: false,
    },
  }),
  actions: {
    UPDATE_TYPES: (context, value) => {
      context.commit("UPDATE_TYPE", value);
    },
  },

  mutations: {
    UPDATE_TYPE(state, value) {
      state.user.type = value;
    },
    SET_LOGGGED_IN(state, value) {
      state.user.Logged_in = value;
    },
  },

  getters: {
    GET_TYPE: (state) => {
      return state.user.type;
    },
    LOGGED_IN: (state) => state.user.Logged_in,
  },
};
