import axios from "axios";
import md5 from 'md5';
import {
  useQuery,
} from 'react-query';
axios.defaults.baseURL = "https://sm.de4.ru";
//yarn axios.defaults.baseURL = "http://okta1.ru";
export const LOGIN_URL = "https://ru.de4.ru";
export const REGISTER_URL = "https://ru.de4.ru/singup";
export const REGISTER_OWNER_URL = "/signupo";
export const REGISTER_RADIO_URL = "/radio";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "https://ru.de4.ru/me";
export const PROFILE_URL = "/user/default/profile";
export const SUBUSER_URL = "/user/default/sub-user";

export function login(email, password) {
  var headers = {
    "Content-Type": "text/plain"
  }
  return axios.post(LOGIN_URL, { email, "pass": password }, {
    headers: headers
  });
}

export function registerOwner(
  email,
  firstname,
  company,
  lastname,
  password,
  tel
) {
  return axios.post(REGISTER_OWNER_URL, {
    email,
    firstname,
    company,
    lastname,
    password,
    tel
  });
}


export function register(role, camp, tel) {
  return axios.post(REGISTER_URL, {
    role, camp, tel
  });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(ME_URL, {}, {
    headers: {
      'Content-Type': "text/plain"
    }
  });
}

export function requestNewAlbum(name) {
  return axios.post(REQUEST_PASSWORD_URL, { name });
}

export function profile(lastname, firstname, company, phone) {
  return axios.post(PROFILE_URL, { lastname, firstname, company, phone });
}

export function avatar(file) {
  return axios.post("/user/default/avatar", file);
}

export function device_info(id, currentUser) {
  return axios.get("/myboards/edit?id=" + id + "&subuser=" + currentUser.id);
}
export function save_device_edit_add(id, data, currentUser) {
  let idd = id !== undefined ? `&id=${id}` : "";
  return axios.post(`/myboards/save?subuser=${currentUser.id}` + idd, data);
}

//export function save_radio_edit_add(id, data) {
///  let idd = id !== undefined ? `?id=${id}` : "";
///  return axios.post("/myboards/save-radio" + idd, data);
//}

export function sub_users() {
  return axios.get(SUBUSER_URL);
}
export function camp_list(page, currentUserId, currentSort, filterName, statuses) {
  return axios.get(
    `/campaign?page=${page + 1}&subuser=${currentUserId}${!!currentSort ? `&sort=${currentSort}` : ""}${!!filterName ? `&title=${filterName}` : ""}${`&status=${statuses}`}`
  )

}
export function camp_list_stat(camp_list) {

  let hashString = ""
  let myCamp_v = {};
  if (!!camp_list) {


    console.log("camp_listcamp_listcamp_listcamp_listcamp_list")
    console.log(camp_list)

    let campIDs = []
    camp_list.forEach(camp => {
      campIDs.push(camp.id)
      camp.boards.forEach(boardC => {
        if (typeof myCamp_v[boardC] === 'undefined') {
          myCamp_v[boardC] = [+camp.id];
          hashString = hashString + boardC + camp.id
        } else {
          myCamp_v[boardC].push(+camp.id);
          hashString = hashString + camp.id
        }
      });
    });
  }

  return axios.post(`https://ru.de4.ru/getDataCamp?camp=true&hash=${md5(hashString)}`, myCamp_v);
}

export function fetchCampaign(id, currentPage, currentUserId) {
  return axios.get(`/campaign/view/${id}?page=${currentPage + 1}&subuser=${currentUserId}`);
}

export function useSingleCampData(id, currentPage, currentUserId) {

  const CampDataFetch = useQuery(["camp_data", id],
    () => fetchCampaign(id, currentPage, currentUserId),
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
    }
  );


  return {
    CampDataFetch,
  };
}