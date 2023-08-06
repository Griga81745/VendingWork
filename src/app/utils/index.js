import React from "react";
import { ClickAwayListener } from '@material-ui/core';
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@material-ui/core";

export const dropdownStyles = {
  dropdownIndicator: proposal => ({ ...proposal, display: "none" }),
  menu: proposal => ({
    ...proposal,
    marginTop: 0,
    borderRadius: 0,
    border: "2px solid #22b9ff",
    borderTop: "none",
    zIndex: 100
  }),
  option: proposal => ({
    ...proposal,
    backgroundColor: "transparent",
    color: "black",
    ":active": { backgroundColor: "#337ab7", color: "white" },
    ":hover": { backgroundColor: "#337ab7", color: "white" },
    ":focus": { backgroundColor: "#337ab7", color: "white" }
  })
};
export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
export const fullHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
export const fullDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]


export function removeCSSClass(ele, cls) {
  const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;

export function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const state = store.getState();
      if (state.auth.authTokenG) {
        config.headers.Authorization = `Bearer ${state.auth.authTokenG}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );
}


/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeLoginData() {
  try {
    indexedDB.deleteDatabase('boards3')
    localStorage.setItem('currentUser', "");
    localStorage.setItem('users', "");
  } catch (e) {
    console.log("removeLoginData: ");
    return false;
  }
  return true;
}
export function removeStorage(key) {
  try {

    localStorage.setItem(key, "");
    localStorage.setItem(key + "_expiresIn", "");
  } catch (e) {
    console.log(
      "removeStorage: Error removing key [" +
      key +
      "] from localStorage: " +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
export function getStorage(key) {
  const now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn = localStorage.getItem(key + "_expiresIn");
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  expiresIn = Math.abs(expiresIn);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (e) {
      console.log(
        "getStorage: Error reading key [" +
        key +
        "] from localStorage: " +
        JSON.stringify(e)
      );
      return null;
    }
  }
}
/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key, value, expires) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60; // default: seconds for 1 day
  }

  const now = Date.now(); //millisecs since epoch time, lets deal only with integer
  const schedule = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + "_expiresIn", schedule);
  } catch (e) {
    console.log(
      "setStorage: Error setting key [" +
      key +
      "] in localStorage: " +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}

export function isStatus(status) {
  if (status == "not_active") {
    return "#e9555b";
  } else if (status == "pending") {
    return "#e9555b";
  } else if (status == "draft") {
    return "#888";
  } else if (status == "moder") {
    return "#755878";
  } else if (status == "reject") {
    return "#CB5B6F";
  } else if (status == "finished") {
    return "#000";
  } else {
    return "#227F8B";
  }
};

export function isActive(active) {
  if (active == 0) {
    return "#e9555b";
  } else {
    return "#227F8B";
  }
};

const weekDevice = [
  { label: "Пнд", value: "mon" },
  { label: "Втр", value: "tue" },
  { label: "Срд", value: "wed" },
  { label: "Чтв", value: "thu" },
  { label: "Птн", value: "fri" },
  { label: "Сбт", value: "sat" },
  { label: "Вск", value: "sun" }
];
export function onUpdateWeek(e) {
  const wee = [];
  weekDevice.map((item, j) => {
    if (e.includes(item.value)) {
      wee.push(item.label)
    }
  });
  return wee.join(', ');
};

export const LightBoxVideo = props => {
  const { setSetting, setting } = props;
  const handleClickAway = () => {
    setSetting({
      ...setting,
      togglerLightBox: false,
    })
  };
  let fileSplit = setting.file_path.split(".");
  return <div className="fslightbox-container fslightbox-full-dimension fslightbox-fade-in-strong">
    <div className={"fslightbox-nav"}>
      <div className="fslightbox-toolbar">
        <div className="fslightbox-toolbar-button fslightbox-flex-centered" title="Close" onClick={handleClickAway} >
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path className="fslightbox-svg-path"
              d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div className="fslightbox-absoluted fslightbox-full-dimension">
      <div className="fslightbox-absoluted fslightbox-full-dimension fslightbox-flex-centered" style={{ transform: "translateX(0px)" }} >
        <div className="fslightbox-source-inner fslightbox-fade-in-strong">
          <ClickAwayListener onClickAway={handleClickAway}>
            {(fileSplit[fileSplit.length - 1] === "jpg" || fileSplit[fileSplit.length - 1] === "jpeg") ?
              (
                <img className="fslightbox-opacity-1 fslightbox-source" src={setting.file_path} />
              ) :
              (
                <video className="fslightbox-source fslightbox-video fslightbox-opacity-1" controls autoplay
                  muted>
                  <source src={setting.file_path} />
                </video>
              )
            }
          </ClickAwayListener>
        </div>
      </div>
    </div>
  </div>
};

