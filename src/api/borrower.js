import request from "../utils/request";

export function createAccountant(data) {
  return request({
    url: "/api/borrower/accountant/createAccountant",
    method: "post",
    data,
  });
}
export function updateAccountant(data) {
  return request({
    url: "/api/borrower/accountant/updateAccountant",
    method: "put",
    data,
  });
}

export function getAccountants() {
  return request({
    url: "/api/borrower/accountant/getAccountants",
    method: "get",
  });
}

export function createBorrower(data) {
  return request({
    url: "/api/borrower/createBorrower",
    method: "post",
    data,
  });
}

export function updateBorrower(data) {
  return request({
    url: "/api/borrower/updateBorrower",
    method: "put",
    data,
  });
}

export function getBorrower() {
  return request({
    url: "/api/borrower",
    method: "get",
  });
}

export function getBorrowerFiles() {
  return request({
    url: "/api/borrower/files/getBorrowerFiles",
    method: "get",
  });
}

export function createFinancialData(data) {
  return request({
    url: "/api/borrower/financialData/createFinancialData",
    method: "post",
    data,
  });
}

export function updateFinancialData(data) {
  return request({
    url: "/api/borrower/financialData/updateFinancialData",
    method: "put",
    data,
  });
}

export function getFinancialData() {
  return request({
    url: "/api/borrower/financialData/getFinancialData",
    method: "get",
  });
}

export function createFounder(data) {
  return request({
    url: "/api/borrower/founder/createFounder",
    method: "post",
    data,
  });
}

export function updateFounder(data) {
  return request({
    url: "/api/borrower/founder/updateFounder",
    method: "put",
    data,
  });
}

export function getFounders() {
  return request({
    url: "/api/borrower/founder/getFounders",
    method: "get",
  });
}

export function deleteFounder() {
  return request({
    url: "/api/borrower/founder/removeFounderById",
    method: "delete",
  });
}

export function createLeader(data) {
  return request({
    url: "/api/borrower/leader/createLeader",
    method: "post",
    data,
  });
}

export function updateLeader(data) {
  return request({
    url: "/api/borrower/leader/updateLeader",
    method: "put",
    data,
  });
}

export function getLeaders() {
  return request({
    url: "/api/borrower/leader/getLeaders",
    method: "get",
  });
}

export function deleteLeader() {
  return request({
    url: "/api/borrower/leader/removeLeaderById",
    method: "delete",
  });
}

export function createBorrowerReferenceSphere(data) {
  return request({
    url: "/api/borrower/ReferenceSphere/createBorrowerReferenceSphere",
    method: "post",
    data,
  });
}

export function updateBorrowerReferenceSphere(data) {
  return request({
    url: "/api/borrower/ReferenceSphere/updateBorrowerReferenceSphere",
    method: "put",
    data,
  });
}

export function getBorrowerReferenceSphere() {
  return request({
    url: "/api/borrower/ReferenceSphere/getBorrowerReferenceSphere",
    method: "get",
  });
}

export function removeBorrowerReferenceSphere() {
  return request({
    url: "/api/borrower/ReferenceSphere/removeBorrowerReferenceSphere",
    method: "delete",
  });
}

export function uploadImage(data) {
  return request({
    url: "api/borrower/upload-file",
    method: "post",
    data,
  });
}

export function uploadBorrowerPassportFiles(data) {
  console.log("data passport", data);
  return request({
    url: "api/borrower/leader/uploadLeaderFile",
    method: "post",
    data,
  });
}

export function uploadBeneficialPassportFiles(data) {
  console.log("data passport", data);
  return request({
    url: "api/borrower/beneficiary/uploadBeneficiaryFile",
    method: "post",
    data,
  });
}

export function createBeneficial(data) {
  return request({
    url: "api/borrower/beneficiary/createBeneficiary",
    method: "post",
    data,
  });
}