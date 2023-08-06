import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField,
  Dialog,
  Button
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";

const useStyles = makeStyles({
  clearIcoBlock: {
    textAlign: "end"
  },
  mainGrid: {
    maxWidth: "500px",
    width: "100%",
    padding: "4px"
  },
  basicMargin: {
    margin: "auto",
    marginBottom: "20px"
  },
  subTitle: {
    textAlign: "center",
    marginBottom: "20px"
  },
  hide: {
    display: "none"
  }
});

const Calendar = props => {
  const classes = useStyles();
  const { open, handleClose, startDate, setStartDate } = props;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <Grid style={{ width: "500px", maxHeight: "410px" }}>
        <Grid classes={{ root: classes.clearIcoBlock }}>
          <Button
            variant="outlined"
            component="span"
            style={{ border: "none" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-between"
          classes={{ root: classes.mainGrid }}
        >
          <h4 style={{ textAlign: "center" }}>Выбор периода</h4>
          <Typography classes={{ root: classes.subTitle }}>
            Выберите даты начала и конца кампании
          </Typography>
          <Grid classes={{ root: classes.basicMargin }}>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              monthsShown={2}
              inline
            />
          </Grid>
          <Grid
            classes={
              startDate ? { root: classes.basicMargin } : { root: classes.hide }
            }
          >
            <button className="btP2 btn btn-success f10 tUp">
              Установить интервал
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Calendar;
