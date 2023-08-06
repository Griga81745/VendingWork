import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField
} from "@material-ui/core";
import Calendar from "../common/Calendar";
import axios from "axios";

const useStyles = makeStyles({
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

const Screens = props => {
  const classes = useStyles();
  const { id, startDate, setStartDate } = props;
  const [calendar, openCalendar] = useState(false);

  useEffect(() => {
    if (props.screensInfo.length === 0) {
      props.getScreensInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    openCalendar(false);
  };

  return (
    <div className="kt-portlet">
      <div className="kt-portlet__head">
        <div className="kt-portlet__head-label">
          <h3 className="kt-portlet__head-title">Статистика</h3>
        </div>
        <div className="kt-portlet__head-toolbar">
          <Typography onClick={() => openCalendar(true)}>
            Период показа
          </Typography>
          <Calendar
            open={calendar}
            handleClose={handleClose}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
      </div>
      <div className="kt-portlet__body">
        <Box style={{ overflow: "auto" }}>
          <Box
            classes={{ root: classes.tableRow }}
            style={{ color: "#888", fontSize: 13, fontWeight: 500 }}
          >
            <Typography style={{ textAlign: "start" }}>Дата</Typography>
            <Typography>Кампаний</Typography>
            <Typography>Заказано сек.</Typography>
            <Typography>Показано слайдов</Typography>
            <Typography>Показано секунд</Typography>
            <Typography>Простаивает</Typography>
          </Box>
          {props.screensInfo.campaign &&
            Object.keys(props.screensInfo.campaign).map(key => (
              <Box classes={{ root: classes.tableRow }}>
                <Box style={{ textAlign: "start" }}>{key}</Box>
                <Box>{props.screensInfo.campaign[key].camp.length}</Box>
                <Box>{props.screensInfo.campaign[key].seconds_reserved}</Box>
                <Box>{props.screensInfo.campaign[key].slides_showed}</Box>
                <Box>{props.screensInfo.campaign[key].seconds_showed}</Box>
                <Box>{props.screensInfo.campaign[key].seconds_free}</Box>
              </Box>
            ))}
        </Box>
      </div>
    </div>
  );
};

export default Screens;
