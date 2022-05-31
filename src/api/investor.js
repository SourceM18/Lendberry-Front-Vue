import request from "../utils/request";

export function createInvestor(data) {
  return request({
    url: "/api/investor/createInvestor",
    method: "post",
    data,
  });
}

export function updateInvestor(data) {
  return request({
    url: "/api/investor/updateInvestor",
    method: "put",
    data,
  });
}

export function uploadInvestorFiles(data) {
  return request({
    url: "api/investor/upload-file",
    method: "post",
    data,
  });
}

export function getInvestor() {
  return request({
    url: "/api/investor",
    method: "get",
  });
}

export function getInvestorFiles() {
  return request({
    url: "/api/investor/files/getInvestorFiles",
    method: "get",
  });
}
