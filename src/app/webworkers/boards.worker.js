import axios from "axios";
import "moment-timezone";
import { fullHours, fullDays } from "../../app/utils/index";
//import React, { useState, useEffect } from "react";
var moment = require("moment");

var DB = null;
var TOKEN = null;
var CAMP_ID = null;
var BOARDS_IDs = null;
var START = null;
var FINISHED = null;
onmessage = ({ data: { token, id, boards_ids, start, finished } }) => {
  //console.log('fffffffffffffffffffffffffffffff  onmessageonmessage f')
  //console.log(boards_ids)
  if (!indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return;
  } else {
    console.log(`window.indexedDB OKKKKKK`);
  }
  CAMP_ID = id;
  BOARDS_IDs = boards_ids;
  START = start;
  FINISHED = finished;
  let openRequest = indexedDB.open("boards3", 1);
  openRequest.onupgradeneeded = function (event) {
    console.log("gggggggg---onupgradeneeded");
    let db = event.target.result;

    // create the Contacts object store
    // with auto-increment id
    //// let store = db.createObjectStore('board', {
    //     autoIncrement: true
    // });
    db.createObjectStore("board");
    db.createObjectStore("boardTimestamp");
    db.createObjectStore("boardStat");
    db.createObjectStore("oneBoardStat");
    // create an index on the email property
    // let index = store.createIndex('email', 'email', {
    //     unique: true
    ///  });
  };
  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
  };
  openRequest.onsuccess = function (event) {
    console.log("gggggggg---onsuccess");
    let db = openRequest.result;
    DB = db;
    TOKEN = token;
    PreStart();
  };
};

async function countAndUploadOverCamp() {
  let campData = await getDataCamps();

  //console.log(BOARDS_IDs)

  let bardsDB_data = {};
  await get(DB.transaction("board").objectStore("board"), BOARDS_IDs).then(
    (dataR) => {
      bardsDB_data = dataR;
    }
  );

  console.log("gggggggggggggggggggggggggggggggggg");
  console.log(bardsDB_data);

  let allPosibleShows = 0;
  let tStart = moment.unix(START).tz("Europe/Moscow");
  var tEnd = moment.unix(FINISHED).tz("Europe/Moscow");
  let allPosibleShows_onThisBoard = 0;
  BOARDS_IDs.forEach((boardID) => {
    for (var t = moment(tStart); t.isBefore(tEnd); t.add(60, "minutes")) {
      let thisUnix = t.unix();
      let thisWeekDay = t.format("ddd").toLowerCase();
      let thisHour = +t.format("HH").toString();
      console.log("ggggggID");
      console.log(boardID);
      console.log(bardsDB_data[boardID]);
      if (
        !bardsDB_data[boardID] ||
        bardsDB_data[boardID]["days"].indexOf(thisWeekDay) === -1 ||
        bardsDB_data[boardID]["hours"].indexOf(thisHour) === -1
      ) {
        continue;
      }

      let allPosibleShows_InThisHour = 0;

      for (var i = 0; i < campData.length; i++) {
        let campDataSingle = campData[i];

        // if (CAMP_ID == 19379) {
        //     console.log('HoursssssssssssssssssscampDataSingle')
        //     console.log(campData)
        //     console.log(campDataSingle)
        // }

        // if (CAMP_ID == 19369) {
        //     console.log('Starttttt111')
        // }

        if (
          campDataSingle.boards.indexOf(boardID) === -1 ||
          campDataSingle.days.indexOf(thisWeekDay) === -1 ||
          campDataSingle.hours.indexOf(thisHour) === -1 ||
          campDataSingle.start >= thisUnix + 3600 ||
          campDataSingle.finished <= thisUnix ||
          checkScheduleActiveBoard(campDataSingle.schedule, boardID)
        ) {
          continue;
        }

        //if (CAMP_ID == 19369) {
        //    console.log('ffffcacampDataSingle')
        //    console.log(campDataSingle.id)

        //    console.log('campData.lengthhhhhhhhhhhh')
        //     console.log(CAMP_ID)

        //}

        let amountInHour =
          (60 / campDataSingle["blength"]) * campDataSingle["amountInBlock"];
        let durThisCamp = amountInHour * campDataSingle["creativeDuration"];
        if (allPosibleShows_InThisHour < 3600) {
          if (allPosibleShows_InThisHour + durThisCamp > 3600) {
            if (campDataSingle["id"] != CAMP_ID) {
              break;
            } else {
              let Residue = 3600 - allPosibleShows_InThisHour;
              let ResidueShows = Residue / campDataSingle["creativeDuration"];

              //console.log("adddddddddddddddddddddddddddddd")
              //console.log(ResidueShows)
              allPosibleShows_onThisBoard += ResidueShows;
              break;
            }
          } else {
            if (campDataSingle["id"] === CAMP_ID) {
              // console.log("adddddddddddddddddddddddddddddd22222")
              //console.log(campDataSingle["amountInHour"])
              allPosibleShows_onThisBoard += amountInHour;
              break;
            }
          }

          allPosibleShows_InThisHour += durThisCamp;

          // if (CAMP_ID == 19379) {
          //     console.log('allPosibleShows_InThisHourdddddd')
          //     console.log(campDataSingle.id)
          //     console.log(allPosibleShows_InThisHour)
          // }
        } else {
          break;
        }
      }
    }
  });

  console.log(" allPosibleShows_onThisBoardallPosibleShows_onThisBoard ");
  console.log(allPosibleShows_onThisBoard);
  console.log(CAMP_ID);

  //save worker result
  const txn = DB.transaction(["boardStat"], "readwrite");
  let boardStat = txn.objectStore("boardStat");
  let timestamp = Math.round(Date.now() / 1000);
  boardStat.put([allPosibleShows_onThisBoard, timestamp], CAMP_ID);

  //DB.close();
  sentData({ id: CAMP_ID, count: allPosibleShows_onThisBoard });
}
function checkScheduleActiveBoard(schedule, boardID) {
  let arrSchedule = Object.values(schedule);
  for (var i = 0; i < arrSchedule.length; i++) {
    if (
      arrSchedule[i]["boards"][boardID] !== undefined &&
      arrSchedule[i]["boards"][boardID]["status"] === "finished"
    ) {
      return true;
      break;
    }
  }
  return false;
}
const sentData = (data) => {
  postMessage(data);
};
async function PreStart() {
  console.log(" PreStartPreStartPreStart ");
  let timestamp = Math.round(Date.now() / 1000);
  let savedResult = await checkReadyResult();
  if (savedResult !== undefined && timestamp < savedResult[1] + 8640) {
    sentData({ id: CAMP_ID, count: savedResult[0] });
    return;
  }
  let check = await checkBoadsData();

  console.log(" PreStartPreStartPreStart1111 ");
  if (timestamp > check + 8640) {
    console.log(" PreStartPreStartPreStart2222 ");
    start();
  } else {
    console.log(" PreStartPreStartPreStart33333 ");
    countAndUploadOverCamp();
  }
}
async function start() {
  console.log(" startstartstartstart111 ");
  let boardData = await getDataBoards();
  insertBoard(boardData);
}

async function getDataBoards() {
  let res = await axios.get(`https://ru.de4.ru/myboards`, {
    headers: {
      authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
}
async function getDataCamps() {
  let res = await axios.get(`https://ru.de4.ru/getCamByDate?id=` + CAMP_ID, {
    headers: {
      authorization: "Bearer " + TOKEN,
    },
  });

  let newData = [];
  if (res.data.data !== null) {
    res.data.data.forEach((data, index) => {
      let campData = data;
      if (!!data.days) {
        campData.days = data.days;
      } else {
        campData.days = fullDays;
      }

      let hoursD = [];
      if (!!data.hours) {
        hoursD = data.hours;
      } else {
        hoursD = fullHours;
      }

      let hoursNew = [];
      for (let index = 0; index < hoursD.length; index++) {
        hoursNew.push(+hoursD[index]);
      }
      campData.hours = hoursNew;
      newData.push(campData);
    });
  }
  return newData;
}
async function checkBoadsData() {
  return new Promise((resolve, reject) => {
    let dataBoardTimestamp = DB.transaction("boardTimestamp")
      .objectStore("boardTimestamp")
      .get(1);
    dataBoardTimestamp.onsuccess = () => {
      //console.log('fffffdataBoardTimesta33333333333 ')
      //console.log(dataBoardTimestamp.result)
      let boardTimestamp = 0;
      if (dataBoardTimestamp.result !== undefined) {
        boardTimestamp = dataBoardTimestamp.result;
      }
      resolve(boardTimestamp);
    };
    dataBoardTimestamp.onerror = ({ target: { error } }) => {
      reject(error);
    };
  });
}
async function checkReadyResult() {
  return new Promise((resolve, reject) => {
    let databoardStat = DB.transaction("boardStat")
      .objectStore("boardStat")
      .get(CAMP_ID);
    databoardStat.onsuccess = () => {
      resolve(databoardStat.result);
    };
    databoardStat.onerror = ({ target: { error } }) => {
      reject(error);
    };
  });
}

function insertBoard(boardData) {
  // create a new transaction
  const txn = DB.transaction(["board", "boardTimestamp"], "readwrite");

  // get the Contacts object store
  const store = txn.objectStore("board");
  store.clear();

  //Object.values(boardData.data).forEach(data => {
  boardData.forEach((data) => {
    //txn.objectStore("boards").add(data, data.id);
    let hoursD = data.hours;
    let hoursNew = [];
    if (!!hoursD) {
      for (let index = 0; index < hoursD.length; index++) {
        hoursNew.push(+hoursD[index]);
      }
    }
    data.hours = hoursNew;
    store.put(data, data.id);
    //// console.log('datadatadatadatadata')
    //console.log(data)
  });

  const boardsTimestamp = txn.objectStore("boardTimestamp");
  let timestamp = Math.round(Date.now() / 1000);
  boardsTimestamp.put(timestamp, 1);

  PreStart();
  // handle success case
  //query.onsuccess = function (event) {
  //    console.log(event);
  //};

  // handle the error case
  //query.onerror = function (event) {
  //    console.log(event.target.errorCode);
  //}

  // close the database once the
  // transaction completes
}

const get = (store, keys) =>
  Promise.all(
    keys.map(
      (key) =>
        new Promise((resolve, reject) => {
          const request = store.get(key);
          request.onsuccess = ({ target: { result } }) => resolve(result);
          request.onerror = ({ target: { error } }) => reject(error);
        })
    )
  ).then((values) =>
    keys.reduce(
      (result, key, index) => ((result[key] = values[index]), result),
      {}
    )
  );
