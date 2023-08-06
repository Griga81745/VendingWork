import axios from "axios";
import 'moment-timezone';
import { fullHours, fullDays } from "../../app/utils/index";
//import React, { useState, useEffect } from "react";
var moment = require("moment");

var DB = null
var TOKEN = null
var BOARDS_ID = null
var START = null
var FINISHED = null
onmessage = ({ data: { token, id, start, finished } }) => {
    //console.log('fffffffffffffffffffffffffffffff  onmessageonmessage f')
    //console.log(boards_ids)
    if (!indexedDB) {
        console.log(`Your browser doesn't support IndexedDB`);
        return;
    } else {
        console.log(`window.indexedDB OKKKKKK`);
    }
    BOARDS_ID = id
    START = start
    FINISHED = finished
    let openRequest = indexedDB.open("boards3", 1);
    openRequest.onupgradeneeded = function (event) {

        let db = event.target.result;

        // create the Contacts object store
        // with auto-increment id
        //// let store = db.createObjectStore('board', {
        //     autoIncrement: true
        // });
        db.createObjectStore('board');
        db.createObjectStore('boardTimestamp');
        db.createObjectStore('boardStat');
        db.createObjectStore('oneBoardStat');
        // create an index on the email property
        // let index = store.createIndex('email', 'email', {
        //     unique: true
        ///  });
    };
    openRequest.onerror = function () {
        console.error("Error", openRequest.error);
    };
    openRequest.onsuccess = function (event) {

        let db = openRequest.result;
        DB = db
        TOKEN = token
        PreStart()
    };
}

async function countAndUploadOverCamp() {

    let campData = await getDataCamps()

    console.log("campDatacampDatacampDatacampData")
    console.log(campData)

    let bardsDB_data = {}
    await get(DB.transaction("board").objectStore("board"), [BOARDS_ID]).then((dataR) => {
        bardsDB_data = dataR
    });


    console.log("gggggggggggggggggggggggggggggggggg")
    console.log(bardsDB_data)


    //let allPosibleShows = 0;
    let tStart = moment.unix(START).tz('Europe/Moscow')
    var tEnd = moment.unix(FINISHED).tz('Europe/Moscow')
    let allPosibleShows_onThisBoard = 0;
    let showsMap = [];

    for (var t = moment(tStart); t.isBefore(tEnd); t.add(60, "minutes")) {

        let thisUnix = t.unix()
        let thisWeekDay = t.format('ddd').toLowerCase()
        let thisHour = +t.format("HH").toString()
        if (
            bardsDB_data[BOARDS_ID]["days"].indexOf(thisWeekDay) === -1 ||
            bardsDB_data[BOARDS_ID]["hours"].indexOf(thisHour) === -1
        ) {
            continue
        }

        let allPosibleShows_InThisHour = 0;
        //campData.data.forEach(campDataSingle => {
        for (var i = 0; i < campData.length; i++) {

            let campDataSingle = campData[i]


            if (
                campDataSingle.days.indexOf(thisWeekDay) === -1 ||
                campDataSingle.hours.indexOf(thisHour) === -1 ||
                campDataSingle.start >= thisUnix + 3600 ||
                campDataSingle.finished <= thisUnix ||
                checkScheduleActiveBoard(campDataSingle.schedule, BOARDS_ID)
            ) {
                continue
            }

            let thisDay = t.format('YYYY-MM-DD')
            if (showsMap[thisDay] === undefined) {
                showsMap[thisDay] = {
                    total: 0,
                    totalSec: 0,
                    camps: {}
                }
            }
            if (showsMap[thisDay].camps[campDataSingle.id] === undefined) {
                showsMap[thisDay].camps[campDataSingle.id] = {
                    total: 0,
                    title: campDataSingle.title
                }
            }
            //  if (CAMP_ID == 18763) {
            //    console.log('HoursssssssssssssssssscampDataSingle')
            //     console.log(i)
            //    console.log(campData)
            //}

            // if (CAMP_ID == 18763) {
            //    console.log('ffffcacampDataSingle')
            //    console.log(campDataSingle.id)
            //}
            //console.log('campData.lengthhhhhhhhhhhh')
            let amountInHour = 60 / campDataSingle['blength'] * campDataSingle['amountInBlock']
            let durThisCamp = amountInHour * campDataSingle["creativeDuration"]
            if (campDataSingle.type === 3) {
                showsMap[thisDay].camps[campDataSingle.id].total += amountInHour
                showsMap[thisDay].camps[campDataSingle.id][thisHour] = amountInHour
            } else {
                if (allPosibleShows_InThisHour + durThisCamp > 3600) {

                    let Residue = 3600 - allPosibleShows_InThisHour;

                    // console.log("ResidueResidueResidueResidue")
                    // console.log(Residue)

                    if (Residue > 0) {
                        let ResidueShows = Residue / campDataSingle["creativeDuration"]


                        //console.log("adddddddddddddddddddddddddddddd")
                        //console.log(campDataSingle.id)
                        // console.log(ResidueShows)
                        allPosibleShows_onThisBoard += ResidueShows
                        showsMap[thisDay]['total'] += ResidueShows
                        showsMap[thisDay]['totalSec'] += Residue
                        showsMap[thisDay].camps[campDataSingle.id]['total'] += ResidueShows
                        showsMap[thisDay].camps[campDataSingle.id][thisHour] = ResidueShows
                        //showsMap[thisDay].camps[campDataSingle.id].totalSec += durThisCamp
                    } else {

                    }


                } else {

                    //console.log("adddddddddddddddddddddddddddddd")
                    //console.log(campDataSingle["amountInHour"])
                    //allPosibleShows_onThisBoard += campDataSingle["amountInHour"]
                    showsMap[thisDay]['total'] += amountInHour
                    showsMap[thisDay]['totalSec'] += durThisCamp
                    showsMap[thisDay].camps[campDataSingle.id]['total'] += amountInHour
                    showsMap[thisDay].camps[campDataSingle.id][thisHour] = amountInHour
                    //showsMap[thisDay].camps[campDataSingle.id].totalSec += durThisCamp

                }
                allPosibleShows_InThisHour += durThisCamp
            }
        }
    }


    console.log(" allPosibleShows_onThisBoardallPosibleShows_onThisBoard ");
    console.log(showsMap);
    console.log(BOARDS_ID);

    //save worker result 
    //const txn = DB.transaction(['boardStat'], 'readwrite');
    // let boardStat = txn.objectStore('boardStat');
    //let timestamp = Math.round(Date.now() / 1000);
    //boardStat.put([allPosibleShows_onThisBoard, timestamp], BOARDS_ID);

    //DB.close();
    sentData({ count: showsMap });
}
function checkScheduleActiveBoard(schedule, boardID) {
    let arrSchedule = Object.values(schedule)
    for (var i = 0; i < arrSchedule.length; i++) {
        if (arrSchedule[i]['boards'][boardID] !== undefined && arrSchedule[i]['boards'][boardID]['status'] === "finished") {
            return true
            break
        }
    }
    return false
}
const sentData = (data) => {
    postMessage(data)
}
async function PreStart() {
    let timestamp = Math.round(Date.now() / 1000);
    //let savedResult = await checkReadyResult()
    // if (savedResult !== undefined && timestamp < savedResult[1] + 8640) {
    //    sentData({ id: CAMP_ID, count: savedResult[0] });
    //    return
    // }

    let check = await checkBoadsData()
    if (timestamp > check + 8640) {
        start()
    } else {
        countAndUploadOverCamp();
    }
}
async function start() {
    let boardData = await getDataBoards()
    insertBoard(boardData)
}

async function getDataBoards() {
    let res = await axios.get(`https://ru.de4.ru/myboards`, {
        headers: {
            authorization: 'Bearer ' + TOKEN
        }
    });
    return res.data;
}
async function getDataCamps() {
    let res = await axios.get(`https://ru.de4.ru/getCamByDateForStatBoard?id=${BOARDS_ID}&start=${START}&finished=${FINISHED}`, {
        headers: {
            authorization: 'Bearer ' + TOKEN
        }
    });

    let newData = []
    if (res.data.data !== null) {
        res.data.data.forEach((data, index) => {
            let campData = data
            if (!!data.days) {
                campData.days = data.days
            } else {
                campData.days = fullDays
            }

            let hoursD = []
            if (!!data.hours) {
                hoursD = data.hours
            } else {
                hoursD = fullHours
            }

            let hoursNew = []
            for (let index = 0; index < hoursD.length; index++) {
                hoursNew.push(+hoursD[index])
            }
            campData.hours = hoursNew
            newData.push(campData)
        })
    }
    return newData
}

async function checkReadyResult() {

    return new Promise((resolve, reject) => {
        let databoardStat = DB.transaction("boardStat").objectStore("boardStat").get(BOARDS_ID)
        databoardStat.onsuccess = () => {
            resolve(databoardStat.result)
        }
        databoardStat.onerror = ({ target: { error } }) => {
            reject(error)
        }
    })
}


function insertBoard(boardData) {
    // create a new transaction
    const txn = DB.transaction(['board', 'boardTimestamp'], 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('board');
    store.clear();

    //Object.values(boardData.data).forEach(data => {
    boardData.forEach(data => {
        //txn.objectStore("boards").add(data, data.id);
        let hoursD = data.hours
        let hoursNew = []
        if (!!hoursD) {
            for (let index = 0; index < hoursD.length; index++) {
                hoursNew.push(+hoursD[index])
            }
        }
        data.hours = hoursNew
        store.put(data, data.id);
        //// console.log('datadatadatadatadata')
        //console.log(data)
    })


    const boardsTimestamp = txn.objectStore('boardTimestamp');
    let timestamp = Math.round(Date.now() / 1000);
    boardsTimestamp.put(timestamp, 1);

    PreStart()
}
async function checkBoadsData() {

    return new Promise((resolve, reject) => {
        let dataBoardTimestamp = DB.transaction("boardTimestamp").objectStore("boardTimestamp").get(1)
        dataBoardTimestamp.onsuccess = () => {
            //console.log('fffffdataBoardTimesta33333333333 ')
            //console.log(dataBoardTimestamp.result)
            let boardTimestamp = 0
            if (dataBoardTimestamp.result !== undefined) {
                boardTimestamp = dataBoardTimestamp.result
            }
            resolve(boardTimestamp)
        }
        dataBoardTimestamp.onerror = ({ target: { error } }) => {
            reject(error)
        }
    })
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
        keys.reduce((result, key, index) => ((result[key] = values[index]), result), {})
    );
