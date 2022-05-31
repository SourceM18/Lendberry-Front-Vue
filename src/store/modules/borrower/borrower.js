export const borrower = {
  state: () => ({
    selected: "",
  }),
  actions: {},

  mutations: {
    SET_SELECTED(state, value) {
      state.selected = value;
    },
  },

  getters: {
    GET_SELECTED: (state) => {
      return state.selected;
    },
  },
};
