import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  Menu,
  Fade,
  MenuItem,
  withStyles
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Moment from "react-moment";
import Pagination from "react-js-pagination";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "moment/locale/ru";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay,
  SingleDatePicker
} from "react-dates";

var moment = require("moment");

const useStyles = makeStyles(theme => ({
  mainGrid: {
    fontSize: 13,
    fontWeight: 500
  },
  mainGrid2: {
    fontSize: 12,
    fontWeight: 500
  },
  mainGridHeader: {
    fontSize: 12,
    fontWeight: 500,
    margin: "0 0 10px 0"
  },
  dataBlock: {
    textAlign: "center",
    wordWrap: "break-word"
  },
  dataFirstBlock: {
    textAling: "start"
  },
  expansionStyle: {
    margin: "0 !important",
    boxShadow: "none !important",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "0 !important",
    borderRadius: "0 !important"
  },
  container: {
    padding: "0 25px",
    backgroundColor: "white",
    marginTop: "-20px"
  },
  expansionPanelStyle: {
    padding: "0"
  },
  details: {
    padding: "0px 0 15px 0",
    "&:hover": {
      cursor: "pointer"
    }
  },
  pag: {
    margin: "10px 0 0 0"
  }
}));

const RadioShows = props => {
  const classes = useStyles();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleClose = () => {
    setOpen(false);
    setData({});
  };
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  const [dateStartMin, setDateStartMin] = useState(moment().add(1, "days"));
  const [dateStartMax, setDateStartMax] = useState(moment().add(30, "days"));

  const [focusedInEnd, setFocusedInEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState(false);

  const [dataShows, setDataShows] = useState({});
  const [dataShowsCount, setDataShowsCount] = useState([]);
  function getShows(data) {
    if (!!data && !!data.availableShows) {
      var Shows = [];
      var ShowsCount = [];
      for (let i = 0; i < data.availableShows.length; i++) {
        let det = JSON.parse(data.availableShows[i].details);
        Shows[data.availableShows[i]["hour"]] = det;
        ShowsCount[data.availableShows[i]["hour"]] =
          data.availableShows[i].shows;
      }
      setDataShows(Shows);
      setDataShowsCount(ShowsCount);
    }
  }
  useEffect(() => {
    getRadioShows();
  }, [dateButton]);

  const [date, setDate] = useState();
  const [dateButton, setDateButton] = useState(1);
  const [focusedInStart, setFocusedInStart] = useState(false);
  const getRadioShows = async () => {
    try {
      let res = await axios.get(
        `/myboards/get-radio-shows?id=${id}&subuser=${
          JSON.parse(localStorage.getItem("currentUser")).id
        }${!!date ? `&day=${moment(date).format("YYYY-MM-DD")}` : ""}`
      );
      if (!!res.data.day) {
        setDate(moment(res.data.day));
        setDateButton(moment(res.data.day).format("DD.MM.YYYY"));
      }
      getShows(res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadEmployeeData = () => {
    axios.get(`/myboards/csv?id=${id}`).then(response => {
      let url = window.URL.createObjectURL(new Blob([response.data]));
      //let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "radio.csv";
      a.click();
    });
  };

  return (
    <>
      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              Расписание рекламных выходов
            </h3>
          </div>
          <div className="kt-portlet__head-toolbar">
            <button
              onClick={() => {
                setDateButton(dateButton + 1);
              }}
            >
              Count: {dateButton}
            </button>

            {!!dateButton && (
              <button
                className="btn btn-secondary btn-sm btn-bold btn-font-md mr-2"
                onClick={() => {
                  setFocusedInStart(!focusedInStart);
                }}
              >
                {dateButton}
              </button>
            )}

            <div className="d-none">
              <SingleDatePicker
                //startDate={companyStartDate} // momentPropTypes.momentObj or null,
                // startDateId='startDate' // PropTypes.string.isRequired,
                //endDate={companyEndDate} // momentPropTypes.momentObj or null,
                // endDateId='endDate' // PropTypes.string.isRequired,
                id="date_start"
                //placeholder={moment(props.options.minDate).format('DD.MM.YYYY')}
                date={date}
                keepOpenOnDateSelect={false}
                //reopenPickerOnClearDates={true}
                //showClearDates={true}
                withPortal={true}
                numberOfMonths={1}
                isOutsideRange={day =>
                  isInclusivelyBeforeDay(day, dateStartMin) ||
                  isInclusivelyAfterDay(day, dateStartMax)
                }
                onDateChange={date => {
                  setDate(date);
                  setDateButton(moment(date).format("DD.MM.YYYY"));
                }}
                focused={focusedInStart}
                onFocusChange={focusedInput => {
                  setFocusedInStart(!focusedInStart);
                }}
              />
            </div>

            <button
              className="btn btn-secondary btn-sm btn-bold btn-font-md"
              onClick={downloadEmployeeData}
            >
              <i className="flaticon2-edit" /> Скачать CSV
            </button>
          </div>
        </div>
        {!!data && !!data.blocks && !!Object.keys(data.blocks).length && (
          <div className="kt-portlet__body">
            <Grid
              container
              justify="space-between"
              classes={{ root: classes.mainGridHeader }}
            >
              <Grid
                item
                xs={12}
                md={9}
                classes={{ root: classes.dataFirstBlock }}
              >
                Время
              </Grid>
              <Grid item xs={2} md={1} classes={{ root: classes.dataBlock }}>
                Длина блока
              </Grid>
              <Grid item xs={2} md={1} classes={{ root: classes.dataBlock }}>
                Цена блока
              </Grid>
              <Grid item xs={2} md={1} classes={{ root: classes.dataBlock }}>
                Заказано выходов
              </Grid>
            </Grid>
            {!!data.blocks &&
              Object.keys(data.blocks).map(key => (
                <ExpansionPanel
                  classes={{ root: classes.expansionStyle }}
                  expanded={expanded === `panel${key}`}
                  onChange={handleChange(`panel${key}`)}
                >
                  <ExpansionPanelSummary
                    classes={{ root: classes.expansionPanelStyle }}
                  >
                    <Grid
                      container
                      justify="space-between"
                      classes={{ root: classes.mainGrid }}
                    >
                      <Grid
                        item
                        md={9}
                        classes={{ root: classes.dataFirstBlock }}
                      >
                        {data.blocks[key].time}
                      </Grid>
                      <Grid item md={1} classes={{ root: classes.dataBlock }}>
                        {data.blocks[key].length}
                      </Grid>
                      <Grid item md={1} classes={{ root: classes.dataBlock }}>
                        {data.blocks[key].cost}
                      </Grid>
                      <Grid item md={1} classes={{ root: classes.dataBlock }}>
                        {!!dataShowsCount[data.blocks[key].hour]
                          ? dataShowsCount[data.blocks[key].hour]
                          : 0}
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  {!!dataShows[data.blocks[key].hour] &&
                    Object.keys(dataShows[data.blocks[key].hour]).map(key2 => (
                      <ExpansionPanelDetails
                        onClick={() => {
                          //setData(props.data.stat[item].data.data_board[key].hour);
                          setOpen(!open);
                        }}
                        classes={{ root: classes.details }}
                      >
                        <Grid
                          container
                          justify="space-between"
                          classes={{ root: classes.mainGrid2 }}
                        >
                          <Grid
                            item
                            md={9}
                            classes={{ root: classes.dataFirstBlock }}
                            style={{ padding: "0 0 0 10px" }}
                          >
                            {
                              data.campaigns[
                                dataShows[data.blocks[key].hour][key2][
                                  "campaign_id"
                                ]
                              ].name
                            }
                          </Grid>
                          <Grid
                            item
                            md={1}
                            classes={{ root: classes.dataBlock }}
                          >
                            {dataShows[data.blocks[key].hour][key2]["dur"]}
                          </Grid>
                          <Grid
                            item
                            md={1}
                            classes={{ root: classes.dataBlock }}
                          >
                            -
                          </Grid>
                          <Grid
                            item
                            md={1}
                            classes={{ root: classes.dataBlock }}
                          >
                            {
                              dataShows[data.blocks[key].hour][key2][
                                "shows_requested"
                              ]
                            }
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    ))}
                </ExpansionPanel>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
export default RadioShows;
