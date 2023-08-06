import React, { useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Button,
  Dialog,
  Box
} from "@material-ui/core";
import { Modal } from "react-bootstrap";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(theme => ({
  dialogContainer: {
    padding: "5px",
    maxWidth: "600px"
  },
  headingBlock: {
    display: "flex"
  },
  clearIcoBlock: {
    textAlign: "end"
  },
  mainGrid: {
    padding: "4px"
  },
  heading: {
    display: "flex",
    fontSize: "24px",
    margin: "30px auto 20px"
  },
  title: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gridColumnGap: "10px",
    borderBottom: "1px #e1e1e1 solid",
    backgroundColor: "#f7f7f7",
    color: "#888888",
    padding: "3% 15px",
    fontSize: 13
  },
  dataBlock: {
    textAlign: "center"
  },
  data: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gridColumnGap: "10px",
    padding: "3% 15px",
    borderBottom: "1px #e1e1e1 solid",
    color: "#222",
    fontSize: 14
  },
  CircularProgress: {
    margin: "20px 0",
    textAlign: "center"
  }
}));

const ViewStatisticModal = props => {
  const classes = useStyles();
  const { boardId, data } = props;

  const [dataTable, setDataTable] = useState(false);
  const isFirstRun = React.useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setDataTable(false);
    getDataCampDay()
  }, [data]);

  const getDataCampDay = async () => {
    //console.log("statGogetT  getTableStatParnigetTableStatParnigetTableStatParni ");
    //console.log(stat);
    let resStat = await axios.get(`https://ru.de4.ru/getDataCampByBoard?board_id=${boardId}&camp_id=${data.campId}&date=${data.date}`);
    let statD = new Array();

    if (!!resStat.data && resStat.data.length) {
      resStat.data.forEach(statData => {
        if (typeof statD[statData._id.date_h] === 'undefined') {
          statD[statData._id.date_h] = [];
          statD[statData._id.date_h]['total'] = 0;
        }
        statD[statData._id.date_h] = statData.total;
        //statD[statData._id.date_h]['total'] += statData.total;
      });

      //console.log("ffffffffffffffffffffffgetDataCampDaygetDataCampDayf");
      //console.log(statD);
      //  console.log(Object.keys(statD).length);

      setDataTable(statD);
    }
  }
  function addZero(numb) {
    if (numb.length === 1) {
      return "0" + numb
    }
    return numb
  }
  return (
    <Modal show={props.open} onHide={props.handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title className="fS18 c212121">Статистика по часам</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Grid
          container
          justifyContent="space-between"
          classes={{ root: classes.title }}
        >
          <Grid>Часы</Grid>
          <Grid>Заказано</Grid>
          <Grid>Показано</Grid>
          <Grid>Стоимость</Grid>
        </Grid>
        {!!data.campData && Object.entries(data.campData).map(([key, val]) => {

          //console.log("ffffffffffffffffffffffgetDataCampDaygetDataCampDayf");
          //console.log(statD);

          if (key === 'total' || key === 'title') {
            return
          }
          //if(key != "all_shows" && key != "all_showed" && key != "all_cost"){
          return <Grid
            key={key + "insideStat"}
            container
            justifyContent="space-between"
            classes={{ root: classes.data }}
          >
            <Grid item classes={{ root: classes.dataFirstBlock }}>
              {data.date + "/ " + key}
            </Grid>
            <Grid item classes={{ root: classes.dataBlock }}>
              {val}
            </Grid>
            <Grid item classes={{ root: classes.dataBlock }}>
              {!!dataTable ?
                !!dataTable[data.date + " " + addZero(key)] ? dataTable[data.date + " " + addZero(key)] : "0"
                : <CircularProgress style={{ "height": 14, "width": 14 }} />}
            </Grid>
          </Grid>
          //}
        })}
      </Modal.Body>
    </Modal>
  );
};
export default ViewStatisticModal;
