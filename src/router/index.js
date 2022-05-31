import { createRouter, createWebHistory } from "vue-router";
// function guardRoute (to, from, next) {
//   {
//     let isAuthenticated= false;
//     if(this.$store.state.auth.user.Logged_in === true)
//       isAuthenticated = true;
//     else
//       isAuthenticated= false;
//     if(isAuthenticated) {
//       next(); // allow to enter route
//     } else{
//       next("/auth"); // go to '/login';
//     }
//   }
// }

const routes = [
  {
    path: "/",
    name: "registration",
    meta: { title: "registration" },
    component: () => import("../pages/Registration/RegistrationForm"),
  },
  {
    path: "/registration/phone",
    name: "RegistrationPhone",
    meta: { title: "RegistrationPhone" },
    component: () =>
      import("../pages/Registration/RegistrationPhone/RegistrationPhoneForm"),
  },
  {
    path: "/registration/email",
    name: "RegistrationEmail",
    meta: { title: "RegistrationEmail" },
    component: () =>
      import("../pages/Registration/RegistrationEmail/StepEmail"),
  },
  {
    path: "/registration/account/verificationPhone",
    name: "PhoneCheckedVerification",
    meta: { title: "PhoneCheckedVerification" },
    component: () => import("../pages/Registration/VerificationPhonePage"),
  },
  {
    path: "/registration/account/verificationEmail",
    name: "EmailCheckedVerification",
    meta: { title: "EmailCheckedVerification" },
    component: () => import("../pages/Registration/VerificationCheckedPage"),
  },
  {
    path: "/",
    name: "Login",
    meta: { title: "Login" },
    component: () => import("../pages/Home"),
  },
  {
    path: "/auth/password",
    name: "ForgetPassword",
    meta: { title: "ForgetPassword" },
    component: () => import("../pages/Registration/ForgetPassword"),
  },
  {
    path: "/auth/password/reset",
    name: "ResetPassword",
    meta: { title: "ResetPassword" },
    component: () => import("../pages/Authorization/PasswordRecovery"),
  },
  {
    path: `/auth/password/new/:email`,
    name: "RestorePassword",
    meta: { title: "RestorePassword" },
    component: () => import("../pages/Authorization/RestorePassword"),
  },
  {
    path: `/auth/password/new/phone`,
    name: "RestorePasswordPhone",
    meta: { title: "RestorePasswordPhone" },
    component: () => import("../pages/Authorization/RestorePasswordPhone"),
  },
  {
    path: `/verification/:method/:userId`,
    name: "VerificationEmail",
    meta: { title: "VerificationEmail" },
    component: () => import("../pages/Registration/VerificationEmail"),
  },
  {
    path: "/registrationBorrower",
    name: "RegistrationBorrower",
    // beforeEnter: guardRoute,
    meta: { title: "RegistrationBorrower" },
    component: () =>
      import("../pages/RegistrationLoanerForm/RegistrationLoanerForm.vue"),
  },
  {
    path: "/registrationInvestor",
    name: "RegistrationInvestor",
    // beforeEnter: guardRoute,
    meta: { title: "RegistrationInvestor" },
    component: () =>
      import("../pages/RegistrationFormInvestor/RegistrationInvestorForm"),
  },
  // test routes
  {
    path: "/logo",
    name: "logo",
    meta: { title: "logo" },
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/logo.vue"),
  },
  {
    path: "/email/verification/test",
    name: "verificationTest",
    meta: { title: "verificationTest" },
    component: () => import("../pages/Registration/VerificationCheckedPage"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step2.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step3.vue"),
  },
  {
    path: "/test3",
    name: "test3",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/CreateLeader.vue"),
  },
  {
    path: "/test33",
    name: "test33",
    component: () =>
      import("../pages/RegistrationFormInvestor/StepsLoaner/Step3.vue"),
  },
  {
    path: "/test4",
    name: "test4",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step5.vue"),
  },
  {
    path: "/test5",
    name: "test5",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step6.vue"),
  },
  {
    path: "/test6",
    name: "test6",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step7.vue"),
  },
  {
    path: "/test7",
    name: "test7",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step8.vue"),
  },
  {
    path: "/test8",
    name: "test8",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/Step9.vue"),
  },
  {
    path: "/test62",
    name: "test62",
    component: () =>
      import("../pages/RegistrationLoanerForm/StepsLoaner/UploadFilesLeader"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
