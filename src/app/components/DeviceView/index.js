import React, { useEffect, useState } from "react";
import {
  makeStyles
} from "@material-ui/core";

import Radio from "./Radio";
import Display from "./Display";

import axios from "axios";
import { Link, useParams, withRouter } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { ViewBoardStatContext } from "../../../app/context/DataCampContext";
import "moment/locale/ru";
var moment = require("moment");

const useStyles = makeStyles({
  headContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 54,
    alignItems: "center",
    marginBottom: 25,
    padding: "0 25px",
    background: "linear-gradient(180deg, #f7f6f8, #ffffff)",
    marginTop: "-80px"
  },
  headTitle: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#434349",
    paddingRight: "12px",
    marginRight: "12px",
    borderRight: "1px solid #e7e8ef"
  },
  headData: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#959cb6"
  },
  infoContainerWraper: {
    backgroundColor: "white",
    padding: "0 20px",
    borderRadius: 4,
    marginBottom: 20
  },
  infoContainer: {
    backgroundColor: "white",
    padding: "13px 0",
    borderBottom: "1px solid #e7e8ef"
  },
  infoBlock: {
    display: "grid",
    gridTemplateColumns: "35px max-content",
    gridTemplateRows: "22px 22px",
    gridTemplateAreas: "'img title''img item'",
    gridColumnGap: "12px",
    padding: "13px 10px",
    overflow: "hidden"
  },
  infoBlockPhotoItem: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 35px)",
    gridTemplateRows: 35,
    gridColumnGap: "12px",
    padding: "13px 10px",
    alignItems: "baseline"
  },
  infoTitle: {
    gridArea: "title",
    color: "#595d6e",
    fontWeight: 600
  },
  infoItem: {
    gridArea: "item",
    color: "#48465b",
    fontWeight: 600,
    fontSize: "1.2rem"
  },
  infoBlockPhoto: {
    width: 35,
    height: 35
  },
  infoImg: {
    gridArea: "img",
    display: "block",
    color: "#a2a5b9"
  },
  photo: {
    width: "100%",
    height: "auto"
  },
  map: {
    maxWidth: "100%",
    height: "100%"
  },
  tableHeadBlock: {
    display: "flex",
    borderBottom: "1px solid #e7e8ef",
    backgroundColor: "white",
    padding: "0 20px",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  tableHeadTitle: {
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    marginRight: 15,
    color: "#595d6e",
    padding: "14px 0 12px",
    paddingLeft: 5,
    transition: ".3s",
    borderBottom: "2px solid white",
    textAlign: "center",
    "&:hover": {
      color: "#22b9ff",
      borderBottom: "2px solid #22b9ff",
      transition: ".3s"
    },
    "&:active": {
      color: "#22b9ff",
      borderBottom: "2px solid #22b9ff"
    }
  },
  tableHeading: {
    fontSize: 24,
    color: "#222",
    marginLeft: 15,
    fontWeight: 300
  },
  tableRow: {
    height: 50,
    display: "grid",
    gridTemplateColumns: "1fr repeat(5, 85px)",
    borderBottom: "1px solid #e7e8ef",
    textAlign: "center",
    alignItems: "center",
    padding: "0 10px",
    color: "#222",
    fontSize: "15px",
    fontWeight: 300
  }
});

const DeviceView = props => {
  const [showMap, setShowMap] = useState(false);
  const { currentUser } = props;
  const { id } = useParams();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [deviceStat, setDeviceStat] = useState({});
  const [mediaInfo, setMediaInfo] = useState([]);
  const [screensInfo, setScreensInfo] = useState([]);
  const [mapInfo, setMapInfo] = useState([]);
  const [startDate, setStartDate] = useState("");


  const [selectedDate, handleDateChange] = useState(moment().startOf('month'));
  const [selectedDateEnd, handleDateChangeEnd] = useState(moment().endOf('month'));

  useEffect(() => {
    let startUnix = selectedDate.unix()
    let endUnix = selectedDateEnd.unix()
    if (endUnix > startUnix) {
      getBoardInfo(startUnix, endUnix);
    }
  }, [selectedDate, selectedDateEnd]);

  const getBoardInfo = async (startUnix, endUnix) => {
    try {
      let res = await axios.post(
        `https://ru.de4.ru/boardView?id=${id}&subuser=${currentUser.id}&start=${startUnix}&end=${endUnix}`, {}, { headers: { "Content-Type": "text/plain" } }
      );
      setDeviceInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const getMediaInfo = async () => {
    try {
      let res = await axios.get(
        `/myboards/view-mediaplan?id=${id}&subuser=${currentUser.id
        }&page=2`
      );
      setMediaInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getScreensInfo = async () => {
    try {
      let res = await axios.get(
        `/myboards/view-camp?id=${id}&subuser=${currentUser.id
        }&page=2`
      );
      setScreensInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      {!!deviceInfo.AllData && (
        <ViewBoardStatContext.Provider value={{
          data: deviceInfo,
          selectedDate: selectedDate,
          selectedDateEnd: selectedDateEnd
        }} >
          <Display
            data={deviceInfo}
            currentUser={currentUser}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            selectedDateEnd={selectedDateEnd}
            handleDateChangeEnd={handleDateChangeEnd}
          />
        </ViewBoardStatContext.Provider>
      )}
    </>
  );
};


const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(DeviceView));

