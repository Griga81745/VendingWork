async function getDataBoards() {
    let res = await axios.get(`https://ru.de4.ru/myboards`, {
        headers: {
            authorization: 'Bearer ' + TOKEN
        }
    });
    return res.data;
}

function insertBoard(boardData) {
    // create a new transaction
    const txn = DB.transaction(['board', 'boardTimestamp'], 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('board');


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