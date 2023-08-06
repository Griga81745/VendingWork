export function setStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getStorage(name) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function getUser() {
  let currentUser = JSON.parse(localStorage.getItem("persist:okta"));
  currentUser = JSON.parse(currentUser["user"]);
  return currentUser;
}
