import request from "../utils/request";

export function forgetPassword(data) {
  return request({
    url: "/api/password/email",
    method: "post",
    data,
  });
}
export function loginByEmail(data) {
  return request({
    url: "/api/login/by/email",
    method: "post",
    data,
  });
}
export function loginByPhone(data) {
  return request({
    url: "/api/login/by/phoneFirebase",
    method: "post",
    data,
  });
}
export function verifyByEmail(data) {
  return request({
    url: `/api/email/verify/${data.userId}?expires=${data.expires}0&signature=${data.signature}`,
    method: "post",
    data,
  });
}

export function resendEmailVerification(data) {
  return request({
    url: "/api/email/resend",
    method: "post",
    data,
  });
}

export function updatePasswordByEmail(data) {
  return request({
    url: `/api/password/email/new`,
    method: "put",
    data,
  });
}

export function updatePasswordByPhone(data) {
  return request({
    url: `/api/password/phone/new`,
    method: "put",
    data,
  });
}

export function registerByEmail(data) {
  return request({
    url: "/api/register/by/email",
    method: "post",
    data,
  });
}

export function registerByPhone(data) {
  return request({
    url: "/api/register/by/phoneFirebase",
    method: "post",
    data,
  });
}

export function phoneNotExist(data) {
  return request({
    url: "/api/register/by/phoneNotExist",
    method: "post",
    data
  });
}

export function logout(data) {
  return request({
    url: "/api/logout",
    method: "post",
    data,
  });
}
