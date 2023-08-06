import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import ViewTableStatistic from "./ViewTableStatistic";
import ViewTableScreens from "./ViewTableScreens";
import ViewTableModerated from "./ViewTableModerated";
import ViewTableMyDevices from "./ViewTableMyDevices";
//import ViewTableMedia from "./ViewTableMedia";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useLocation, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const ViewTable = props => {
  const { currentUser, setCurrentTab, currentTab } = props;


  const [metaData, setMetaData] = useState({});
  const [boards, setBoards] = useState([]);
  const [isDrawerOpened, setDrawerState] = useState(false);
  const [duration, setDuration] = useState(5);
  const [filter, setFilterData] = useState({
    activeCustomer: false,
    perPage: "10",
    companyStartDate: "",
    companyStartTime: "0:00",
    companyEndDate: "",
    companyEndTime: "0:00",
    cities: [],
    daysOfWeek: [],
    hours: [],
    resolution: [],
    m2: [],
    title: "",
    blockLength: "0",
    amountInBlock: "0",
    showsAmount: "0",
    isRestricted: false,
    restrictedShows: "0"
  });

  const [moderated, setModerated] = useState([]);
  const [myBoards, setMyBoards] = useState([]);

  useEffect(() => {

    let moderated_v = {};
    let myBoards_v = {};

    Object.keys(props.data.all_data["schedule"]).forEach(schedule_user_id => {

      Object.keys(props.data.all_data["schedule"][schedule_user_id]["boards"]).forEach(boards_id => {
        props.data.all_data["schedule"][schedule_user_id]["boards"][boards_id]["schedule_id"] = +schedule_user_id;
      });

      if (props.data.all_data["user_id"] != currentUser.id || schedule_user_id != currentUser.id) {
        Object.keys(props.data.all_data["schedule"][schedule_user_id]["boards"]).forEach(boards_id => {
          Object.values(props.data.all_data["schedule"][schedule_user_id]["boards"][boards_id]['creatives']).forEach(creativesData => {
            if (typeof moderated_v[creativesData.id] == 'undefined') {
              moderated_v[creativesData.id] = { ["B" + boards_id]: creativesData, status: creativesData.status, boards: [boards_id] }
            } else {
              moderated_v[creativesData.id].boards.push(boards_id)
              moderated_v[creativesData.id]["B" + boards_id] = creativesData
              if (moderated_v[creativesData.id].status != creativesData.status && moderated_v[creativesData.id].status != "Смешанный") {
                moderated_v[creativesData.id].status = "Смешанный"
              }
            }
          })
        })
      } else {
        // myBoards_v = Object.assign(myBoards_v, props.data.all_data["schedule"][schedule_user_id]["boards"]);
        Object.keys(props.data.all_data["schedule"][schedule_user_id]["boards"]).forEach(boards_id => {
          Object.values(props.data.all_data["schedule"][schedule_user_id]["boards"][boards_id]['creatives']).forEach(creativesData => {
            if (typeof myBoards_v[creativesData.id] == 'undefined') {
              myBoards_v[creativesData.id] = { ["B" + boards_id]: creativesData, active: creativesData.active, boards: [boards_id] }
            } else {
              myBoards_v[creativesData.id].boards.push(boards_id)
              myBoards_v[creativesData.id]["B" + boards_id] = creativesData
              // active == 2 - это смешанный статус. не активно и не отключено
              if (myBoards_v[creativesData.id].active != creativesData.active && myBoards_v[creativesData.id].active != "2") {
                myBoards_v[creativesData.id].active = "2"
              }
            }
          });
        });
      }
    });

    setModerated(moderated_v);
    setMyBoards(myBoards_v);

    if (Object.keys(moderated_v).length > 0 && Object.keys(myBoards_v).length > 0) {
      props.setTabStatOrModer(3);
    } else if (Object.keys(moderated_v).length > 0) {
      props.setTabStatOrModer(2);
    } else if (Object.keys(myBoards_v).length > 0) {
      props.setTabStatOrModer(1);
    }

  }, [props.data]);

  const [player, setPlayer] = useState(false);
  const [playerSRC, setPlayerSRC] = useState(false);
  return (
    <>

      {currentTab === 2 && (
        <ViewTableModerated
          setting={props.setting}
          setSetting={props.setSetting}
          title={"Модерация"}
          type={"moder"}
          data={props.data}
          boards={moderated}
          boardsShows={props.boardsShows}
          getTableData={props.getTableData}
          id={props.id}
          setAddFile={props.setAddFile}
          addFile={props.addFile}
          setCurrentPage={props.setCurrentPageModer}
          currentPage={props.currentPageModer}
        />
      )}

      {currentTab === 1 && (
        <ViewTableMyDevices
          setting={props.setting}
          setSetting={props.setSetting}
          title={"Мои устройства"}
          type={"myboards"}
          setPlayer={setPlayer}
          setPlayerSRC={setPlayerSRC}
          data={props.data}
          boards={myBoards}
          boardsShows={props.boardsShows}
          getTableData={props.getTableData}
          id={props.id}
          setAddFile={props.setAddFile}
          addFile={props.addFile}
        />
      )}

      {currentTab === 0 && !!props.data.all_data && (
        <ViewTableStatistic
          data={props.data}
          boards={props.boards}
          setCurrentPage={props.setCurrentPage}
          currentPage={props.currentPage}
          boardsShows={props.boardsShows}
          dataStat={props.dataStat}
        />
      )}
    </>
  );
};
const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});


export default withRouter(connect(mapStateToProps)(ViewTable));
