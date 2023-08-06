import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Grid, CircularProgress
} from "@material-ui/core";
import {
  useQuery,
} from 'react-query';
import { Modal } from "react-bootstrap";
import { ViewCampContext } from "../../../../app/context/DataCampContext";
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
    textAlign: "right"
  },
  dataBlockLeft: {
    textAlign: "left"
  },
  data: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gridColumnGap: "10px",
    padding: "3% 15px",
    borderBottom: "1px #e1e1e1 solid",
    color: "#222",
    fontSize: 14
  }
}));



const ViewStatisticModal = props => {
  const classes = useStyles();
  const useViewCampContext = useContext(ViewCampContext); //, data: { row, keyB, keyyy }
  const { dataStat: { row, keyB, keyyy } } = props;
  const [dataShowsStat, setDataShowsStat] = useState(false);
  const { data: fetchCampaignDataHour, error: fetchCampaignError, isLoading: fetchCampaignloading, refetch, status } = useQuery([
    "camp_data", keyyy, keyB, useViewCampContext.data.all_data.id],
    () => {
      return axios.get(`https://ru.de4.ru/getDataCampByBoard?board_id=${keyB}&camp_id=${useViewCampContext.data.all_data.id}&date=${keyyy}`);
    },
    {
      enabled: !!keyB && !!keyyy,
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
    }
  );
  useEffect(() => {
    if (!!fetchCampaignDataHour) {

      console.log(' fetchCampaignDataHourticModal')
      console.log(fetchCampaignDataHour)

      if (fetchCampaignDataHour.data.error !== "no_shows") {
        let statD = new Array();
        fetchCampaignDataHour.data.forEach(statData => {
          if (typeof statD[statData._id.date_h] === 'undefined') {
            statD[statData._id.date_h] = [];
            statD[statData._id.date_h]['total'] = 0;
          }
          statD[statData._id.date_h] = statData.total;
        });

        console.log(' ViewStatisticModal wwwww ViewStatisticModal')
        console.log(statD)

        setDataShowsStat(statD);
      }
    }
  }, [fetchCampaignDataHour]);
  function addZero(numb) {
    if (numb.length === 1) {
      return "0" + numb
    }
    return numb
  }


  //console.log(dataStat)
  //console.log(props.dataStat)
  return (
    <Modal show={props.open} onHide={props.handleClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title className="fS17">Статистика по часам</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0" >
        <Grid
          container
          justifyContent="space-between"
          classes={{ root: classes.title }}
        >
          <Grid item classes={{ root: classes.dataFirstBlock }}>Часы</Grid>
          <Grid item classes={{ root: classes.dataBlock }}>Заказано</Grid>
          <Grid item classes={{ root: classes.dataBlock }}>Показано</Grid>
          <Grid item classes={{ root: classes.dataBlock }}>Стоимость</Grid>
        </Grid>
        {!!row && !!row["boards"][keyB] &&
          Object.entries(row["boards"][keyB]).map(([key, value]) => {
            if (key == "total") {
              return
            }
            let dayPlusHour = keyyy + "/ " + key
            let dayPlusHourZero = keyyy + " " + addZero(key)
            return <Grid
              key={key + "inside" + keyB}
              container
              justifyContent="space-between"
              classes={{ root: classes.data }}
            >
              <Grid item classes={{ root: classes.dataFirstBlock }}>
                {dayPlusHour}
              </Grid>
              <Grid item classes={{ root: classes.dataBlock }}>
                {value}
              </Grid>
              <Grid item classes={{ root: classes.dataBlock }}>
                {!fetchCampaignloading ?
                  !!dataShowsStat[dayPlusHourZero] ? dataShowsStat[dayPlusHourZero] : "0"
                  : <CircularProgress style={{ "height": 14, "width": 14 }} />}
              </Grid>
              <Grid item classes={{ root: classes.dataBlock }}>
                0
              </Grid>
            </Grid>
            //}
          })}
      </Modal.Body>
    </Modal>
  );
};
export default ViewStatisticModal;
