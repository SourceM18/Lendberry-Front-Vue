export const common = {
  state: () => ({
    token: localStorage.getItem("SavedToken") || "",
    idToken: "",
    currentStep: 1,
    currentStepRegistration: 1,
  }),

  actions: {},

  mutations: {
    LOGIN_SUCCESS: (state, token) => {
      state.token = token;
    },
    SET_TOKEN_ID(state, idToken) {
      state.idToken = idToken;
    },
    incrementStep(state) {
      state.currentStep++;
    },
    decrementStep(state) {
      state.currentStep--;
    },
    incrementStepIp(state) {
      state.currentStep = 8;
    },
    decrementStepIp(state) {
      state.currentStep = 4;
    },

    incrementStepRegistration(state) {
      state.currentStepRegistration++;
    },
    decrementStepRegistration(state) {
      state.currentStepRegistration--;
    },
    GO_TO_CHOOSING_REGISTRATION_FORM(state) {
      state.currentStepRegistration = 3;
    },
    GO_TO_CHOOSING_PREV_REGISTRATION_FORM(state) {
      state.currentStepRegistration = 2;
    },
    goToStepTwo(state) {
      state.currentStep = 2;
    },
    goToStepThree(state) {
      state.currentStep = 4;
    },
    goToStepFour(state) {
      state.currentStep = 5;
    },
    goToStepFive(state) {
      state.currentStep = 6;
    },
    goToStepSix(state) {
      state.currentStep = 7;
    },
    goToStepSeven(state) {
      state.currentStep = 9;
    },
    goToStepFirstInvestor(state) {
      state.currentStep = 1;
    },
    goToStepThirdInvestor(state) {
      state.currentStep = 3;
    },
  },

  getters: {
    GET_TOKEN: (state) => {
      return state.token;
    },
    GET_ID_TOKEN: (state) => state.idToken,
  },
};
