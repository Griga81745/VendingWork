import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Box,
  TextField,
  MenuItem,
  Hidden,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
// import {
//   isInclusivelyAfterDay,
//   isInclusivelyBeforeDay,
//   SingleDatePicker
// } from "react-dates";

// import AccordionB from "react-bootstrap/Accordion";
// import Card from "react-bootstrap/Card";
// import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  companyName: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500
  },
  data: {
    fontSize: 14,
    color: "#222",
    fontWeight: 500
  },
  row: {
    position: "relative",
    padding: "5px 0"
  },
  screenDataText: {
    color: "black",
    fontSize: 15,
    justifyContent: "space-between"
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  companyInfo: {
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center"
  },
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  tabHeader: {
    margin: "1.75rem 0",
    fontSize: "1.4rem",
    fontWeight: 500,
    color: "#48465b"
  },
  inputsContainer: {
    padding: `0 0 0 ${theme.spacing(4)}px`
  },
  createButton: {
    boxShadow: "none !important",
    backgroundColor: "#1dc9b7",
    color: "#ffffff"
  },
  divider: {
    width: "100%",
    height: "1px",
    marginBottom: "20px"
  },
  rmvShadow: {
    boxShadow: "none !important"
  },
  summary: {
    fontSize: "4.5rem",
    fontWeight: 500,
    color: "#595d6e"
  },
  summaryText: {
    paddingLeft: "1.1rem",
    paddingBottom: "20px",
    fontSize: "1.1rem",
    fontWeight: 300,
    color: "#74788d",
    alignSelf: "flex-end"
  }
}));

const FourthTab = props => {
  const [showSummary, setShowsSummary] = useState(0);
  const [hoursSummary, setHoursSummary] = useState(0);
  //const [shows_radio_in_hour, setShows_radio_in_hour] = useState(1);

  const [showSummaryRadio, setShowsSummaryRadio] = useState(0);
  // const [showSummaryRadio_block, setShowsSummaryRadio_block] = useState(0);

  const classes = useStyles();
  //useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    let showsSum = 0;
    let hoursSum = 0;
    props.choosedBoards.forEach(board => {
      if (!!board.availableShows) {
        showsSum += board.availableShows;
      }
      if (!!board.availableHours) {
        hoursSum += board.availableHours;
      }
    });
    setShowsSummary(showsSum);
    setHoursSummary(hoursSum);
  }, [props.choosedBoards]);

  useEffect(() => {
    let showsSum = 0;
    let hoursSum = 0;
    props.choosedRadio.forEach(board => {
      if (!!board.availableShows) {
        showsSum += board.availableShows;
      }
    });
    setShowsSummaryRadio(showsSum);
    if (props.filter.showsAmountRadio > showsSum) {
      props.updateData({ ...props.filter, showsAmountRadio: showsSum });
      splitEquile(showsSum, "choosedRadio");
      splitEquile(showsSum);
    }
  }, [props.choosedRadio, props.radio]);

  // useEffect(() => {
  ///    console.log('dddddddddddddddddddddd')
  //    console.log(props.filter.showsAmount);
  //     splitEquile( props.filter.showsAmount );
  //    console.log('dddddddddddddddddddddd1111')
  //     console.log(props.filter.showsAmount);
  // }, [props.filter.showsAmount]);

  const showsLogic = data => {
    let log = "";
    if (data.length > 0) {
      if (+data > 0) {
        if (+data <= showSummary) {
          log = `${+data / (+hoursSummary * 60)}`;
          props.updateData({
            ...props.filter,
            blockLength: "1",
            amountInBlock: log,
            showsAmount: data
          });
        } else {
          log = `${+showSummary / (+hoursSummary * 60)}`;
          props.updateData({
            ...props.filter,
            blockLength: "1",
            amountInBlock: log,
            showsAmount: showSummary
          });
        }
      }
    } else {
      props.updateData({ ...props.filter, showsAmount: data });
    }
  };
  const calcShowsLogic = (data, type) => {
    switch (type) {
      case "length":
        if (+data > 0 && +props.filter.amountInBlock > 0) {
          let log = "";
          log = `${((+hoursSummary * 60) / +data) *
            +props.filter.amountInBlock}`;
          if (+log <= showSummary) {
            props.updateData({
              ...props.filter,
              blockLength: data,
              showsAmount: log
            });
            splitEquile(log);
          } else {
            props.updateData({
              ...props.filter,
              blockLength: data,
              showsAmount: showSummary
            });
            splitEquile(showSummary);
          }
        } else {
          props.updateData({ ...props.filter, blockLength: data });
        }
        break;
      case "amount":
        if (+data > 0 && +props.filter.blockLength > 0) {
          let log = "";
          log = `${((+hoursSummary * 60) / +props.filter.blockLength) * +data}`;
          if (+log <= showSummary) {
            props.updateData({
              ...props.filter,
              amountInBlock: data,
              showsAmount: log
            });
            splitEquile(log);
          } else {
            let dataD =
              showSummary /
              `${(+hoursSummary * 60) / +props.filter.blockLength}`;
            props.updateData({
              ...props.filter,
              amountInBlock: dataD,
              showsAmount: showSummary
            });
            splitEquile(showSummary);
          }
        } else {
          props.updateData({ ...props.filter, amountInBlock: data });
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (props.filter.showsAmount > showSummary) {
      props.updateData({ ...props.filter, showsAmount: showSummary });
    }
  }, [showSummary]);

  const [showsLengthBlock, setShowsLengthBlock] = useState(false);

  const changeValue = (value, id) => {
    var all_shows = 0;
    var data = props.choosedBoards;
    data.forEach(board => {
      if (board.id === id) {
        if (Number(value) > board.available || isNaN(Number(value))) {
          board.requested = board.available;
        } else {
          board.requested = Number(value);
        }
      }
      if (board.requested != undefined) {
        all_shows += board.requested;
      }
    });
    props.setChoosedBoards(data);
    props.updateData({ ...props.filter, showsAmount: all_shows });
  };

  const changeValue2 = (value, id) => {
    var all_shows = 0;
    var data = props.choosedRadio;
    data.forEach(board => {
      if (board.id === id) {
        if (Number(value) > board.available || isNaN(Number(value))) {
          board.requested = board.available;
        } else {
          board.requested = Number(value);
        }
      }
      if (board.requested != undefined) {
        all_shows += board.requested;
      }
    });
    props.setChoosedRadio(data);
    props.updateData({ ...props.filter, showsAmountRadio: all_shows });
  };

  const splitEquile = (val, Boards_or_Radio = "choosedBoards") => {
    var all_val = val;
    var data = props[Boards_or_Radio];

    data.forEach(board => {
      board.requested = 0;
    });

    var count_boards = data.length;
    var ii = 0;
    var val_val = Math.floor(all_val / count_boards);

    while (all_val > 0) {
      data.forEach(board => {
        if (all_val > 0 && board.availableShows > board.requested) {
          if (board.requested + val_val > board.availableShows) {
            all_val = all_val - (board.availableShows - board.requested);
            board.requested = board.availableShows;
          } else {
            all_val = all_val - val_val;
            board.requested += val_val;
          }
        }
      });

      if (all_val <= count_boards) {
        val_val = 1;
      } else {
        val_val = Math.floor(all_val / count_boards);
      }
    }
  };

  const count_in_radio = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ];

  // const [expanded, setExpanded] = React.useState(false);

  // const handleChangeAccordion = (panel) => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  //};
  const [checkedA, setCheckedA] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);

  return (
    <div className="kt-form">
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          {!!props.filter.radioEnable && props.filter.radioEnable == true && (
            <>
              <div className="kt-wizard-v2__form" style={{ width: "400px" }}>
                <div className="kt-heading kt-heading--sm">
                  Настройка выходов на радио
                </div>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedA}
                        onChange={() => setCheckedA(!checkedA)}
                        value="checkedA"
                      />
                    }
                    label="Ограничить количество рекламных выходов в час"
                  />
                </FormGroup>
                {checkedA == true && (
                  <div className="alert alert-secondary d-flex flex-column">
                    <TextField
                      className="form-control mt-2"
                      label="Максимум выходов в час"
                      size="small"
                      variant="outlined"
                      select
                      value={props.filter.shows_radio_in_hour}
                      style={{ width: "130px" }}
                      defaultValue="1"
                      onChange={event => {
                        props.updateData({
                          ...props.filter,
                          shows_radio_in_hour: event.target.value
                        });
                        //splitEquile(event.target.value * props.filter.showsAmountRadio);
                      }}
                    >
                      {count_in_radio.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                )}

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedB}
                        onChange={() => setCheckedB(!checkedB)}
                        value="checkedB"
                      />
                    }
                    label="Указать какое количество показов на экранах будет синхронизировано по времени с рекламными выходами на радио"
                  />
                </FormGroup>
                {checkedB == true && (
                  <div className="alert alert-secondary d-flex flex-column">
                    <TextField
                      className="form-control mt-2"
                      label="Показов в блоке на экране"
                      size="small"
                      variant="outlined"
                      select
                      value={props.filter.count_in_radioBlock}
                      style={{ width: "180px" }}
                      defaultValue="1"
                      onChange={event => {
                        ///количество показов на экранах
                        //let countt = event.target.value * props.filter.showsAmountRadio *props.choosedBoards.length;
                        props.updateData({
                          ...props.filter,
                          count_in_radioBlock: event.target.value
                          // showsAmount: countt
                        });
                        //splitEquile(countt);
                      }}
                    >
                      {count_in_radio.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                )}

                <div className="alert alert-secondary mt-2">
                  <div className="d-flex align-items-center">
                    <TextField
                      className="form-control text-dark"
                      label="Доступно выходов"
                      size="small"
                      variant="outlined"
                      type="number"
                      disabled
                      value={showSummaryRadio}
                      style={{ width: "130px" }}
                    />
                    <i className="fa fa-arrow-right mx-3"></i>
                    <TextField
                      id="all-shows"
                      className="form-control text-dark"
                      label="Необходимо всего выходов"
                      value={props.filter.showsAmountRadio}
                      onChange={e => {
                        let resSh = e.target.value.replace(/[^0-9]/g, "");
                        resSh = resSh.replace(/^0+/, "");
                        //resSh = parseInt(resSh, 10)
                        //if (resSh > 1 && resSh === "0") {
                        //    resSh = resSh.slice(1);
                        // }
                        //if (resSh === "") {
                        ///    resSh = "";
                        //}
                        if (resSh > showSummaryRadio) {
                          resSh = showSummaryRadio;
                        }
                        console.log(resSh);
                        //let countt = resSh * props.choosedBoards.length;
                        //console.log(countt);

                        props.updateData({
                          ...props.filter,
                          showsAmountRadio: resSh
                        });
                        splitEquile(resSh, "choosedRadio");
                        //splitEquile(countt);
                      }}
                      InputProps={{
                        inputProps: {
                          min: 0
                        }
                      }}
                      variant="outlined"
                      size="small"
                      type="number"
                      style={{ width: "210px" }}
                    />
                  </div>
                </div>
              </div>
              <Divider classes={{ root: classes.divider }} />
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ marginBottom: "65px" }}
              >
                {props.choosedRadio &&
                  props.choosedRadio.map(board => (
                    <Grid container classes={{ root: classes.row }}>
                      <Grid
                        item
                        md={2}
                        classes={{ root: classes.companyName }}
                        className="align-items-center d-flex"
                      >
                        {board.title}
                      </Grid>
                      <Grid
                        item
                        md={2}
                        classes={{ root: classes.dataContainer }}
                        className="align-items-center d-flex justify-content-between"
                        style={{ width: "130px" }}
                      >
                        <div className="d-flex flex-column">
                          <Typography classes={{ root: classes.data }}>
                            {board.availableShows}
                          </Typography>
                          <Typography className="dataHeader">
                            Доступно
                          </Typography>
                        </div>
                        <i className="fa fa-arrow-right mx-3"></i>
                      </Grid>
                      <Grid md={2}>
                        <TextField
                          id="outlined-number"
                          label="Необходимо"
                          size="small"
                          type="number"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={board.requested}
                          onChange={e => {
                            var val = e.target.value;
                            val = e.target.value.replace(/[^0-9]/g, "");
                            if (val > board.availableShows) {
                              val = board.availableShows;
                            }
                            if (val < 0) {
                              val = 0;
                            }
                            changeValue2(val, board.id);
                          }}
                          InputProps={{
                            inputProps: {
                              min: 0
                            }
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        classes={{ root: classes.dataContainer }}
                      >
                        <CloseIcon />
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </>
          )}

          <div className="kt-wizard-v2__form" style={{ width: "400px" }}>
            <div className="kt-heading kt-heading--sm">
              Настройка показов на экранах
            </div>

            <div className="form-group">
              <label className="mb-4">
                Общее количество выходов на всех экранах
              </label>
              <div className="d-flex align-items-center">
                <TextField
                  className="form-control text-dark data"
                  label="Доступно"
                  size="small"
                  variant="outlined"
                  disabled
                  value={showSummary}
                  style={{ width: "130px" }}
                />

                <i className="fa fa-arrow-right mx-3"></i>
                <TextField
                  id="all-shows"
                  label="Необходимо"
                  value={props.filter.showsAmount}
                  onChange={e => {
                    let resSh = e.target.value.replace(/[^0-9]/g, "");
                    resSh = resSh.replace(/^0+/, "");
                    //if (e.target.value.length > 1 && e.target.value[0] === "0") {
                    //    resSh = e.target.value.slice(1);
                    //}
                    if (e.target.value === "") {
                      resSh = "";
                    }
                    if (e.target.value > showSummary) {
                      resSh = showSummary;
                    }
                    showsLogic(resSh);
                    splitEquile(resSh);
                  }}
                  InputProps={{
                    inputProps: {
                      min: 0
                    }
                  }}
                  type="number"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            {props.filter.radioEnable == false && (
              <>
                <ExpansionPanel
                  expanded={showsLengthBlock}
                  classes={{ root: classes.rmvShadow }}
                >
                  <ExpansionPanelSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      onClick={() => setShowsLengthBlock(!showsLengthBlock)}
                    >
                      {" "}
                      + Длина блока/Количество выходов в блоке
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="column" justify="space-between">
                      <div className="form-group">
                        <label className="mb-4">Количество показов</label>
                        <div className="d-flex align-items-center">
                          <TextField
                            className="form-control text-dark data"
                            label="Длина блока"
                            size="small"
                            variant="outlined"
                            value={props.filter.blockLength}
                            onChange={e => {
                              let resSh = e.target.value.replace(/[^0-9]/g, "");
                              if (
                                e.target.value.length > 1 &&
                                e.target.value[0] === "0"
                              ) {
                                resSh = e.target.value.slice(1);
                              }
                              if (e.target.value === "") {
                                resSh = "";
                              }
                              if (+e.target.value > 10) {
                                resSh = "10";
                              }
                              calcShowsLogic(resSh, "length");
                            }}
                            style={{ width: "130px" }}
                          />
                          <i className="fa fa-arrow-right mx-3"></i>
                          <TextField
                            id="all-shows"
                            label="Выходов в блоке"
                            value={Math.ceil(props.filter.amountInBlock)}
                            onChange={e => {
                              let resSh = e.target.value.replace(/[^0-9]/g, "");
                              if (
                                e.target.value.length > 1 &&
                                e.target.value[0] === "0"
                              ) {
                                resSh = e.target.value.slice(1);
                              }
                              if (e.target.value === "") {
                                resSh = "";
                              }
                              calcShowsLogic(resSh, "amount");
                            }}
                            variant="outlined"
                            size="small"
                          />
                        </div>
                      </div>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={props.filter.isRestricted}
                  classes={{ root: classes.rmvShadow }}
                >
                  <ExpansionPanelSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      onClick={() =>
                        props.updateData({
                          ...props.filter,
                          isRestricted: !props.filter.isRestricted
                        })
                      }
                    >
                      {" "}
                      + Ограничить количество показов в час
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="column" justify="space-between">
                      <TextField
                        id="all-shows"
                        label="Выходов в час"
                        value={props.filter.restictedShows}
                        onChange={e => {
                          let resSh = e.target.value.replace(/[^0-9]/g, "");
                          if (e.target.value === "") {
                            resSh = "";
                          }
                          props.updateData({
                            ...props.filter,
                            restrictedShows: resSh
                          });
                        }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </>
            )}
          </div>
          <Divider classes={{ root: classes.divider }} />
          <Grid container direction="row" justify="space-between">
            {props.choosedBoards &&
              props.choosedBoards.map(board => (
                <Grid container classes={{ root: classes.row }}>
                  <Grid
                    item
                    md={2}
                    classes={{ root: classes.companyName }}
                    className="align-items-center d-flex"
                  >
                    {board.title}
                  </Grid>
                  <Grid
                    item
                    md={2}
                    classes={{ root: classes.dataContainer }}
                    className="align-items-center d-flex justify-content-between"
                    style={{ width: "130px" }}
                  >
                    <div className="d-flex flex-column">
                      <Typography classes={{ root: classes.data }}>
                        {board.availableShows}
                      </Typography>
                      <Typography className="dataHeader">Доступно</Typography>
                    </div>
                    <i className="fa fa-arrow-right mx-3"></i>
                  </Grid>

                  <Grid md={2}>
                    <TextField
                      id="outlined-number"
                      label="Необходимо"
                      size="small"
                      variant="outlined"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={board.requested}
                      onChange={e => {
                        var val = e.target.value;
                        if (e.target.value > board.availableShows) {
                          val = board.availableShows;
                        }
                        changeValue(val, board.id);
                      }}
                      InputProps={{
                        inputProps: {
                          min: 0
                        }
                      }}
                    />
                  </Grid>

                  <Grid item md={6} classes={{ root: classes.dataContainer }}>
                    <CloseIcon />
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>

      <Grid container direction="row">
        <button
          className="btn btn-bold btn-secondary btn-wide"
          onClick={props.setPrevTab}
        >
          <i className="fa fa-arrow-left ml-1" />
          Назад
        </button>
        <button
          className="btn btn-bold btn-label-brand btn-wide ml-2"
          onClick={props.newCampaign}
        >
          Создать кампанию
          <i className="fa fa-sign-out-alt ml-1" />
        </button>
      </Grid>
    </div>
  );
};

export default FourthTab;
