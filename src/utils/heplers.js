import { helpers } from "@vuelidate/validators";

export const regexOnlyRus = helpers.regex(/^[а-яА-Я]*$/);