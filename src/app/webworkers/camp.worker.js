import axios from "axios";
import 'moment-timezone';
import { fullHours, fullDays } from "../../app/utils/index";
//import React, { useState, useEffect } from "react";
var moment = require("moment");

var DB = null
var TOKEN = null
var CAMP_ID = null
var BOARDS_IDs = null
var START = null
var FINISHED = null
onmessage = ({ data: { token, id, boards_ids, start, finished } }) => {

    if (!indexedDB) {
        console.log(`Your browser doesn't support IndexedDB`);
        return;
    } else {
        console.log(`window.indexedDB OKKKKKK`);
    }
    CAMP_ID = id
    BOARDS_IDs = boards_ids
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
    console.log('ffffcampData111111')
    //console.log(campData)
    console.log(BOARDS_IDs)

    let bardsDB_data = {}
    await get(DB.transaction("board").objectStore("board"), BOARDS_IDs).then((dataR) => {
        bardsDB_data = dataR
    });

    let showsMap = [];
    let tStart = moment.unix(START).tz('UTC')
    var tEnd = moment.unix(FINISHED).tz('UTC');
    let allPosibleShows_onThisBoard = 0;
    BOARDS_IDs.forEach(boardID => {

        for (var t = moment(tStart); t.isBefore(tEnd); t.add(60, "minutes")) {

            let thisUnix = t.unix()
            let thisDay = t.format('YYYY-MM-DD')

            console.log('HoursssssssssssssssRRRRRRR')
            console.log(thisUnix)
            console.log(t.format('YYYY-MM-DD HH'))


            if (showsMap[thisDay] === undefined) {
                showsMap[thisDay] = {
                    total: 0,
                    boards: {}
                }
            }
            if (showsMap[thisDay].boards[boardID] === undefined) {
                showsMap[thisDay].boards[boardID] = {
                    total: 0
                }
            }


            let thisWeekDay = t.format('ddd').toLowerCase()
            let thisHour = +t.format("HH").toString()
            if (
                bardsDB_data[boardID]["days"].indexOf(thisWeekDay) === -1 ||
                bardsDB_data[boardID]["hours"].indexOf(thisHour) === -1
            ) {
                continue
            }


            //console.log('Hoursssssssssssssssssssssssssssssssssss')
            //console.log(t.format("YYYY-MM-DD HH"))
            //console.log(campData)

            let allPosibleShows_InThisHour = 0;
            for (var i = 0; i < campData.length; i++) {
                let campDataSingle = campData[i]

                //console.log('thisUnix --- thisUnix ')
                // console.log(thisUnix)
                // console.log(campDataSingle.start)
                // console.log(thisUnix + 3600)
                // console.log(campDataSingle.finished)

                if (
                    campDataSingle.boards.indexOf(boardID) === -1 ||
                    campDataSingle.days.indexOf(thisWeekDay) === -1 ||
                    campDataSingle.hours.indexOf(thisHour) === -1 ||
                    campDataSingle.start >= thisUnix + 3600 ||
                    campDataSingle.finished <= thisUnix ||
                    checkScheduleActiveBoard(campDataSingle.schedule, boardID)
                ) {
                    continue
                }

                console.log('Hoursssssssssssssssssssssssssssssssssss2222')
                console.log(t.format("YYYY-MM-DD HH"))

                let amountInHour = 60 / campDataSingle['blength'] * campDataSingle['amountInBlock']
                let durThisCamp = amountInHour * campDataSingle["creativeDuration"]
                if (allPosibleShows_InThisHour < 3600) {


                    if (allPosibleShows_InThisHour + durThisCamp > 3600) {
                        if (campDataSingle["id"] != CAMP_ID) {
                            break
                        } else {
                            let Residue = 3600 - allPosibleShows_InThisHour;
                            let ResidueShows = Residue / campDataSingle["creativeDuration"]


                            console.log("adddddddddddddddddddddddddddddd 3600")
                            console.log(boardID)
                            console.log(ResidueShows)

                            allPosibleShows_onThisBoard += ResidueShows
                            showsMap[thisDay]["total"] += ResidueShows
                            showsMap[thisDay]["boards"][boardID]["total"] += ResidueShows
                            showsMap[thisDay]["boards"][boardID][thisHour] = ResidueShows
                            break
                        }
                    } else {
                        if (campDataSingle["id"] === CAMP_ID) {

                            console.log("adddddddddddddddddddddddddddddd")
                            console.log(boardID)
                            console.log(campDataSingle["amountInHour"])

                            allPosibleShows_onThisBoard += amountInHour
                            showsMap[thisDay]["total"] += amountInHour
                            showsMap[thisDay]["boards"][boardID]["total"] += amountInHour
                            showsMap[thisDay]["boards"][boardID][thisHour] = amountInHour
                            break
                        }
                    }
                    allPosibleShows_InThisHour += durThisCamp

                    console.log("addddddddddd----dallPosibleShows_InThisHour")
                    console.log(campDataSingle["id"])
                    console.log(thisDay)
                    console.log(thisHour)
                    console.log(boardID)
                    console.log(allPosibleShows_InThisHour)

                } else {
                    break
                }
            }
        }
    })

    console.log(" allPosibleShows_onThisBoardallPCAMPPPPshowsMap ");
    console.log(showsMap);
    console.log(allPosibleShows_onThisBoard);
    //console.log(CAMP_ID);
    //return;
    //DB.close();
    sentData({ id: CAMP_ID, count: showsMap });
}
const sentData = (data) => {
    postMessage(data)
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
async function PreStart() {
    let check = await checkBoadsData()

    let timestamp = Math.round(Date.now() / 1000);
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
    console.log(" allPosCAMP_IDCAMP_IDCAMP_IDCAMP_ID ");
    console.log(CAMP_ID);
    let res = await axios.get(`https://ru.de4.ru/getCamByDate?id=` + CAMP_ID, {
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
        keys.reduce((result, key, index) => ((result[key] = values[index]), result), {})
    );
