import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles(theme => ({
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
          } else {
            props.updateData({
              ...props.filter,
              blockLength: data,
              showsAmount: showSummary
            });
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
          } else {
            let dataD =
              showSummary /
              `${(+hoursSummary * 60) / +props.filter.blockLength}`;
            props.updateData({
              ...props.filter,
              amountInBlock: dataD,
              showsAmount: showSummary
            });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSummary]);
  return (
    <Grid classes={{ root: classes.tabContainer }}>
      <Typography classes={{ root: classes.tabHeader }}>
        Настройка показов
      </Typography>

      <Grid container direction="row" justify="space-between">
        <Grid style={{ marginBottom: "2rem" }}>
          <Grid container direction="row">
            <Typography classes={{ root: classes.summary }}>
              {showSummary}
            </Typography>
            <Typography classes={{ root: classes.summaryText }}>
              Общее количество доступных показов
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="space-between">
          <Grid container xs={6}>
            <Grid container direction="column">
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                Длина блока
                <input
                  className="form-control"
                  placeholder="Длина блока"
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
                />
              </label>
            </Grid>

            <Grid container direction="column">
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                Количество выходов в блоке
                <input
                  className="form-control"
                  placeholder="Количество выходов в блоке"
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
                />
              </label>
            </Grid>
          </Grid>

          <Grid container xs={6} classes={{ root: classes.inputsContainer }}>
            <Grid container direction="column">
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                Показов
                <input
                  className="form-control"
                  placeholder="Количество показов"
                  value={props.filter.showsAmount}
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
                    showsLogic(resSh);
                  }}
                />
              </label>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column" style={{ marginBottom: "2rem" }}>
          <ExpansionPanel
            expanded={props.filter.isRestricted}
            classes={{ root: classes.rmvShadow }}
          >
            <ExpansionPanelSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <span className="kt-switch kt-switch--icon">
                <label>
                  <input
                    type="checkbox"
                    name="quick_panel_notifications_5"
                    checked={props.filter.isRestricted}
                    onChange={() =>
                      props.updateData({
                        ...props.filter,
                        isRestricted: !props.filter.isRestricted
                      })
                    }
                  />
                  <span />
                </label>
              </span>
              <Typography style={{ margin: "7px" }}>
                Ограничить количество показов в час
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column" justify="space-between">
                <label
                  className="single-select"
                  style={{ marginBottom: "2rem" }}
                >
                  Количество выходов в час, не более:
                  <input
                    className="form-control"
                    placeholder="Количество выходов в час, не более:"
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
                  />
                </label>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Divider classes={{ root: classes.divider }} />

        <Grid container direction="row" justify="space-between">
          <button
            className="btn btn-secondary btn-md btn-tall btn-wide kt-font-transform-u"
            onClick={props.setPrevTab}
          >
            <i
              className="la la-long-arrow-left"
              style={{ marginRight: "10px", fontSize: "1.5rem" }}
            />
            Назад
          </button>
          <label htmlFor="contained-button-file">
            <button
              className="btn btn-brand btn-md btn-tall btn-wide kt-font-transform-u"
              onClick={props.newCampaign}
            >
              Создать кампанию
              <i
                className="fa flaticon2-check-mark"
                style={{ marginRight: "10px", fontSize: "1.5rem" }}
              />
            </button>
          </label>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FourthTab;
