import axios from "axios";
import "moment-timezone";
//import React, { useState, useEffect } from "react";
var moment = require("moment");

var DB = null;
var TOKEN = null;
onmessage = ({ data: { token } }) => {
  //console.log('fffffffffffffffffffffffffffffff  onmessageonmessage f')
  //console.log(boards_ids)
  if (!indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return false;
  }
  let openRequest = indexedDB.open("boards3", 1);
  openRequest.onupgradeneeded = function (event) {
    let db = event.target.result;
    db.createObjectStore("board");
    db.createObjectStore("boardTimestamp");
    db.createObjectStore("boardStat");
    db.createObjectStore("oneBoardStat");
  };
  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
  };
  openRequest.onsuccess = function (event) {
    let db = openRequest.result;
    DB = db;
    TOKEN = token;
    PreStart();
  };
};
async function PreStart() {
  let timestamp = Math.round(Date.now() / 1000);
  let savedResult = await checkReadyResult();

  let check = await checkBoadsData();
  if (timestamp > check + 8640 || savedResult === undefined) {
    start();
  } else {
    let sortList = {};
    savedResult.forEach((data) => {
      sortList[data.id] = data;
    });
    sentData({ list: sortList });
  }
}

const sentData = (data) => {
  postMessage(data);
};

async function start() {
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
    let databoardStat = DB.transaction("board").objectStore("board").getAll();
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

  //console.log("datadatadatadatadatainsertBoardinsertBoardinsertBoard11");
  //console.log(boardData);

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
    //console.log("datadatadatadatadata");
    //console.log(data);
  });

  const boardsTimestamp = txn.objectStore("boardTimestamp");
  let timestamp = Math.round(Date.now() / 1000);
  boardsTimestamp.put(timestamp, 1);
  PreStart();
}
