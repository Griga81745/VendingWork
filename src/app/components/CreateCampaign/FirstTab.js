import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Collapse,
  TextField,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import Datetime from "react-datetime";
//import $ from "jquery";
import ionRangeSlider from "ion-rangeslider";
import "./datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import {FormattedMessage, injectIntl} from "react-intl";
import Swal from "sweetalert2";

//import ExpansionPanel from "@material-ui/core/ExpansionPanel";
//import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ru";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
var moment = require("moment");
const useStyles = makeStyles({
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  tabHeader: {
    margin: "1.75rem 0",
    fontSize: "1.1rem",
    color: "#48465b"
  },
  twoItemsRowItem: {
    width: "100%"
  },
  iconContainer: {
    padding: "7px 1rem",
    border: "1px solid #e2e5ec",
    borderRadius: "0 4px 4px 0",
    fontSize: "1.4rem",
    backgroundColor: "#f7f8fa"
  },
  spacer: {
    marginBottom: "16px"
  },
  nextButton: {
    marginTop: "26px",
    padding: "12px 30px",
    backgroundColor: "#22b9ff",
    "&:hover": {
      backgroundColor: "#00abfb"
    }
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  expansionStyle: {
    margin: "0 !important",
    boxShadow: "none !important",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "0 !important",
    borderRadius: "0 !important"
  }
});

const FirstTab = props => {
  const { user } = props;
  const classes = useStyles();
  const slider = useRef(null);
  const difrentTime = 4;
  useEffect(() => {
    ////window.scrollTo(0, 0);
    if (props.filter.daysOfWeek.length > 0 || props.filter.hours.length > 0) {
      setCheckedB(true);
    }
  }, []);
  useEffect(() => {
    // if (!!props.options && Object.keys(props.options).length > 0) {
    //   const sliderOptions = {
    //      grid: true,
    //      values: Object.keys(props.options.during),
    //      onChange: e => {
    //          props.setDuration(e.from_value);
    ////      }
    //    };
    //    $(slider.current).ionRangeSlider(sliderOptions);
    if (props.filter.companyStartDate == "") {
      props.updateData({
        ...props.filter,
        companyStartDate: moment(props.options.minDate).format("YYYY/MM/DD")
      });
    }
    //}
  }, [props.options]);

  const hoursData = [
    { label: "00:00 - 01:00", value: "0" },
    { label: "01:00 - 02:00", value: "1" },
    { label: "02:00 - 03:00", value: "2" },
    { label: "03:00 - 04:00", value: "3" },
    { label: "04:00 - 05:00", value: "4" },
    { label: "05:00 - 06:00", value: "5" },
    { label: "06:00 - 07:00", value: "6" },
    { label: "07:00 - 08:00", value: "7" },
    { label: "08:00 - 09:00", value: "8" },
    { label: "09:00 - 10:00", value: "9" },
    { label: "10:00 - 11:00", value: "10" },
    { label: "11:00 - 12:00", value: "11" },
    { label: "12:00 - 13:00", value: "12" },
    { label: "13:00 - 14:00", value: "13" },
    { label: "14:00 - 15:00", value: "14" },
    { label: "15:00 - 16:00", value: "15" },
    { label: "16:00 - 17:00", value: "16" },
    { label: "17:00 - 18:00", value: "17" },
    { label: "18:00 - 19:00", value: "18" },
    { label: "19:00 - 20:00", value: "19" },
    { label: "20:00 - 21:00", value: "20" },
    { label: "21:00 - 22:00", value: "21" },
    { label: "22:00 - 23:00", value: "22" },
    { label: "23:00 - 24:00", value: "23" }
  ];
  const hoursTime = [
    { label: "00:00", value: "00" },
    { label: "01:00", value: "01" },
    { label: "02:00", value: "02" },
    { label: "03:00", value: "03" },
    { label: "04:00", value: "04" },
    { label: "05:00", value: "05" },
    { label: "06:00", value: "06" },
    { label: "07:00", value: "07" },
    { label: "08:00", value: "08" },
    { label: "09:00", value: "09" },
    { label: "10:00", value: "10" },
    { label: "11:00", value: "11" },
    { label: "12:00", value: "12" },
    { label: "13:00", value: "13" },
    { label: "14:00", value: "14" },
    { label: "15:00", value: "15" },
    { label: "16:00", value: "16" },
    { label: "17:00", value: "17" },
    { label: "18:00", value: "18" },
    { label: "19:00", value: "19" },
    { label: "20:00", value: "20" },
    { label: "21:00", value: "21" },
    { label: "22:00", value: "22" },
    { label: "23:00", value: "23" }
  ];

  const getNeedTime = dateS => {
    let time = [];
    hoursTime.forEach(tt => {
      if (
        moment(props.options.minDate).format("YYYY/MM/DD") !=
          moment(dateS).format("YYYY/MM/DD") ||
        (moment(props.options.minDate).format("YYYY/MM/DD") ==
          moment(dateS).format("YYYY/MM/DD") &&
          parseInt(tt.value) >= props.options.minHour)
      ) {
        time.push(tt);
      }
    });
    return time;
  };

  const getNeedTimeEnd = dateS => {
    let time = [];
    console.log(moment(props.options.minDate).format("YYYY/MM/DD"));
    console.log(moment(dateS).format("YYYY/MM/DD"));
    console.log("getNeedTimeEnd");

    let fromSt = 0;
    if (+props.filter.companyStartTime + difrentTime > 23) {
      fromSt = +props.filter.companyStartTime + difrentTime - 23;
    }

    console.log("--------");
    console.log(fromSt);
    console.log(props.filter.companyStartDate);
    console.log(moment(props.filter.companyStartDate).format("YYYY/MM/DD"));
    console.log(moment(dateS).format("YYYY/MM/DD"));
    console.log(moment(dateS).diff(props.filter.companyStartDate, "days"));

    console.log("--------1");
    hoursTime.forEach(tt => {
      if (
        moment(dateS).diff(props.filter.companyStartDate, "days") > 1 ||
        (moment(props.filter.companyStartDate).format("YYYY/MM/DD") !=
          moment(dateS).format("YYYY/MM/DD") &&
          +tt.value >= fromSt) ||
        (moment(props.filter.companyStartDate).format("YYYY/MM/DD") ==
          moment(dateS).format("YYYY/MM/DD") &&
          // parseInt(tt.value) >= props.options.minHour
          +tt.value >= +props.filter.companyStartTime + difrentTime) ||
        !dateEnd
      ) {
        time.push(tt);
      }
    });
    return time;
  };

  const [focusedInStart, setFocusedInStart] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateStartMin, setDateStartMin] = useState(
    moment(props.options.minDate).subtract(1, "days")
  );
  const [dateStartMax, setDateStartMax] = useState(moment().add(45, "days"));

  const [focusedInEnd, setFocusedInEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [timeStart, setTimeStart] = useState(0);

  const setTimeStartAll = time => {
    setTimeStart(time);

    if (!!dateEnd) {
      setDateEndAll(dateEnd, time);
    } else {
      console.log("111111111111111111111=-=-0000--1111");
      props.updateData({ ...props.filter, companyStartTime: time });
    }
  };

  const setTimeEndAll = time => {
    setTimeEnd(time);
    props.updateData({ ...props.filter, companyEndTime: time });
  };

  const setDateStartAll = date => {
    setDateStart(date);
    let newDate = moment(date).format("YYYY/MM/DD");
    props.updateData({ ...props.filter, companyStartDate: newDate });
  };

  const setDateEndAll = (date, ttt = null) => {
    let res = { ...props.filter };
    let newDate = moment(date).format("YYYY/MM/DD");
    if (ttt != null) {
      var endTime = +ttt + difrentTime;
      console.log("111111111111111111111=-=-11111");
      res.companyStartTime = ttt;
    } else {
      var endTime = +props.filter.companyStartTime + difrentTime;
    }

    if (
      !!props.filter.companyStartDate &&
      moment(props.filter.companyStartDate).format("YYYY/MM/DD") == newDate
    ) {
      if (endTime > 23) {
        endTime -= 23;
        newDate = moment(date)
          .add(1, "days")
          .format("YYYY/MM/DD");
      }
    } else if (
      !!props.filter.companyStartDate &&
      moment(props.filter.companyStartDate)
        .add(1, "days")
        .format("YYYY/MM/DD") == newDate &&
      endTime > 23
    ) {
      endTime -= 23;
    } else {
      endTime = 0;
    }
    //console.log('--------1');
    // console.log(endTime);
    // console.log('--------1');
    if (+props.filter.companyEndTime < endTime) {
      endTime = addZero(endTime);
      res.companyEndTime = endTime;
    }

    //console.log(res.companyEndTime);
    // console.log('res.companyStartTimeres.companyStartTimeres.companyStartTime')

    res.companyEndDate = newDate;
    setDateEnd(moment(newDate));
    setDateStartMax(moment(newDate).add(1, "days"));
    props.updateData(res);
  };

  function addZero(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }
  const marks2 = [
    {
      value: 5,
      label: "5"
    },
    {
      value: 10,
      label: "10"
    },
    {
      value: 15,
      label: "15"
    },
    {
      value: 20,
      label: "20"
    },
    {
      value: 25,
      label: "25"
    },
    {
      value: 30,
      label: "30"
    },
    {
      value: 35,
      label: "35"
    },
    {
      value: 40,
      label: "40"
    },
    {
      value: 45,
      label: "45"
    },
    {
      value: 50,
      label: "50"
    },
    {
      value: 55,
      label: "55"
    },
    {
      value: 60,
      label: "60"
    }
  ];
  const marks = [
    {
      value: 10,
      label: "10"
    },
    {
      value: 15,
      label: "15"
    },
    {
      value: 20,
      label: "20"
    },
    {
      value: 25,
      label: "25"
    },
    {
      value: 30,
      label: "30"
    },
    {
      value: 35,
      label: "35"
    },
    {
      value: 40,
      label: "40"
    },
    {
      value: 45,
      label: "45"
    }
  ];

  function valuetext(value) {
    return `${value}с`;
  }

  const nextStep = () => {
    let er = false;
    if (!props.filter.companyStartDate.length) {
      Swal.fire("Ошибка!", "Укажите начало кампании!", "info");
      er = true;
    } else if (!props.filter.companyEndDate.length) {
      Swal.fire("Ошибка!", "Укажите окончание кампании!", "info");
      er = true;
    } else if (!props.filter.title.length) {
      Swal.fire("Ошибка!", "Укажите Название кампании!", "info");
      er = true;
    } else if (props.filter.title.length < 3) {
      Swal.fire(
        "Ошибка!",
        "Название кампании должно быть не короче 3х символов!",
        "info"
      );
      er = true;
    }

    // {props.filter.companyStartDate.length > 0 &&
    // props.filter.companyEndDate.length > 0 &&
    // !!props.filter.title && props.filter.title.length > 2
    // ?(

    if (!er) {
      props.setNextTab();
    }
  };
  const [checkedB, setCheckedB] = React.useState(false);
  return (
    <div className="kt-form">
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form" style={{ maxWidth: "400px" }}>
            <div className="kt-heading kt-heading--sm">Данные кампании</div>
            <div className="form-group">
              <TextField
                className="form-control form-control-lg"
                label="Название кампании"
                size="small"
                variant="outlined"
                value={props.filter.title}
                style={{ maxWidth: "245px" }}
                onChange={e =>
                  props.updateData({ ...props.filter, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="mb-4">Начало кампании</label>
              <div className="d-flex align-items-center">
                <TextField
                  className="form-control text-dark data"
                  label="Дата"
                  size="small"
                  variant="outlined"
                  disabled
                  value={
                    props.filter.companyStartDate
                      ? moment(props.filter.companyStartDate).format(
                          "DD.MM.YYYY"
                        )
                      : moment(props.options.minDate).format("DD.MM.YYYY")
                  }
                  style={{ width: "130px" }}
                  onClick={() => {
                    setFocusedInStart(!focusedInStart);
                  }}
                />
                <div className="d-none">
                  <SingleDatePicker
                    //startDate={companyStartDate} // momentPropTypes.momentObj or null,
                    // startDateId='startDate' // PropTypes.string.isRequired,
                    //endDate={companyEndDate} // momentPropTypes.momentObj or null,
                    // endDateId='endDate' // PropTypes.string.isRequired,
                    id="date_start"
                    placeholder={moment(props.options.minDate).format(
                      "DD.MM.YYYY"
                    )}
                    date={dateStart}
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
                      setDateStartAll(date);
                    }}
                    focused={focusedInStart}
                    onFocusChange={focusedInput => {
                      setFocusedInStart(!focusedInStart);
                    }}
                  />
                </div>
                <i className="fa fa-arrow-right mx-3"></i>
                <TextField
                  id="start-time"
                  select
                  label="Время"
                  value={props.filter.companyStartTime}
                  defaultValue="00"
                  onChange={e => setTimeStartAll(e.target.value)}
                  variant="outlined"
                  size="small"
                >
                  {getNeedTime(dateStart).map(o => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <div className="form-group">
              <label className="mb-4">Окончание кампании</label>
              <div className="d-flex align-items-center">
                <TextField
                  className="form-control text-dark data"
                  label="Дата"
                  size="small"
                  variant="outlined"
                  disabled
                  value={
                    !!props.filter.companyEndDate
                      ? moment(props.filter.companyEndDate).format("DD.MM.YYYY")
                      : "дд.мм.гггг"
                  }
                  style={{ width: "130px" }}
                  onClick={() => {
                    setFocusedInEnd(!focusedInEnd);
                  }}
                />
                <div className="d-none">
                  <SingleDatePicker
                    //startDate={companyStartDate} // momentPropTypes.momentObj or null,
                    // startDateId='startDate' // PropTypes.string.isRequired,
                    //endDate={companyEndDate} // momentPropTypes.momentObj or null,
                    // endDateId='endDate' // PropTypes.string.isRequired,
                    id="date_end"
                    date={dateEnd}
                    keepOpenOnDateSelect={false}
                    //reopenPickerOnClearDates={true}
                    //showClearDates={true}
                    withPortal={true}
                    numberOfMonths={1}
                    isOutsideRange={day =>
                      isInclusivelyBeforeDay(
                        day,
                        moment(dateStart).subtract(1, "days")
                      ) ||
                      isInclusivelyAfterDay(
                        day,
                        moment(dateStart).add(45, "days")
                      )
                    }
                    onDateChange={date => {
                      //console.log("asdasdasdd11");
                      //console.log(date);
                      setDateEndAll(date);

                      //console.log("asdasdasdd11");
                      //console.log(startDate);
                      //console.log(startDate.format("YYYY-MM-DD HH:mm:ss"));
                      //console.log("asdasdasdd222");
                      //console.log(endDate);
                      //if (startDate) {
                      //   props.filter.companyStartDate = startDate.format("YYYY/MM/DD");
                      //     console.log("asdasdasdd11");
                      //    console.log(props.filter.companyStartDate);
                      //     console.log("asdasdasdd222");
                      // }
                    }}
                    focused={focusedInEnd}
                    onFocusChange={focusedInput => {
                      setFocusedInEnd(!focusedInEnd);
                    }}
                  />
                </div>
                <i className="fa fa-arrow-right mx-3"></i>
                <TextField
                  id="start-time"
                  select
                  label="Время"
                  value={props.filter.companyEndTime}
                  defaultValue="00"
                  onChange={e => setTimeEndAll(e.target.value)}
                  variant="outlined"
                  size="small"
                >
                  {getNeedTimeEnd(dateEnd).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkedB}
                    onChange={() => setCheckedB(!checkedB)}
                    value="checkedB"
                  />
                }
                label="Выберите дни и время показов"
              />
            </FormGroup>

            {!!user && user.role == "owner" && (
              <FormGroup>
                <FormControlLabel
                    control={
                      <Switch
                          checked={props.filter.activeCustomer}
                          onChange={() =>
                              props.updateData({
                                ...props.filter,
                                activeCustomer: !props.filter.activeCustomer
                              })
                          }
                          value="checkedB"
                      />
                    }
                    label="Только на собственных экранах"
                />
              </FormGroup>
            )}

            <Collapse in={checkedB}>
              <div className="row pb-3">
                <div className="col-6">
                  {!!props.options && (
                    <Select
                      isMulti
                      value={props.filter.daysOfWeek}
                      options={[
                        {
                          value: "Mon",
                          label: <FormattedMessage id={"DAYS.MON"} />
                        },
                        {
                          value: "Tue",
                          label: <FormattedMessage id={"DAYS.TUE"} />
                        },
                        {
                          value: "Wed",
                          label: <FormattedMessage id={"DAYS.WED"} />
                        },
                        {
                          value: "Thu",
                          label: <FormattedMessage id={"DAYS.THU"} />
                        },
                        {
                          value: "Fri",
                          label: <FormattedMessage id={"DAYS.FRI"} />
                        },
                        {
                          value: "Sat",
                          label: <FormattedMessage id={"DAYS.SAT"} />
                        },
                        {
                          value: "Sun",
                          label: <FormattedMessage id={"DAYS.SUN"} />
                        }
                      ]}
                      onChange={e => {
                        if (!!e && !!e.length) {
                          props.updateData({ ...props.filter, daysOfWeek: e });
                        } else {
                          props.updateData({ ...props.filter, daysOfWeek: [] });
                        }
                      }}
                      placeholder="Все дни недели"
                      theme={customSelectTheme}
                      styles={customSelectStyles}
                      menuPlacement="auto"
                      maxMenuHeight={150}
                    />
                  )}
                </div>
                <div className="col-6">
                  <Select
                    isMulti
                    value={props.filter.hours}
                    options={hoursData}
                    onChange={e => {
                      if (!!e && !!e.length) {
                        props.updateData({ ...props.filter, hours: e });
                      } else {
                        props.updateData({ ...props.filter, hours: [] });
                      }
                    }}
                    theme={customSelectTheme}
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    maxMenuHeight={150}
                    placeholder="Все часы"
                  />
                </div>
              </div>
            </Collapse>

            <div className="alert alert-secondary d-flex flex-column">
              <Box marginBottom="0.5rem">
                Длина рекламного ролика в секундах
              </Box>
              <Grid
                classes={{ root: classes.spacer }}
                style={{ marginTop: "10px" }}
              >
                <Slider
                  defaultValue={props.filter.duration}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-always"
                  step={5}
                  marks={marks2}
                  valueLabelDisplay="on"
                  min={5}
                  max={60}
                  valueLabelDisplay="auto"
                  onChange={(event, newValue) =>
                    props.updateData({
                      ...props.filter,
                      duration: newValue
                    })
                  }
                />
              </Grid>
            </div>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.filter.radioEnable}
                    onChange={() =>
                      props.updateData({
                        ...props.filter,
                        radioEnable: !props.filter.radioEnable
                      })
                    }
                    value="checkedA"
                  />
                }
                label="Добавить рекламу на радио"
              />
            </FormGroup>

            <Collapse in={props.filter.radioEnable}>
              <div className="alert alert-secondary d-flex flex-column">
                <Box>Длина радио-выхода в секундах</Box>
                <Grid style={{ marginTop: "10px" }}>
                  <Slider
                    defaultValue={props.filter.durationRadio}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={5}
                    marks={marks}
                    valueLabelDisplay="on"
                    min={10}
                    max={45}
                    valueLabelDisplay="auto"
                    onChange={(event, newValue) =>
                      props.updateData({
                        ...props.filter,
                        durationRadio: newValue
                      })
                    }
                  />
                </Grid>
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <Grid>
        <Grid>
          <Grid container>
            <button
              className="btn btn-bold btn-label-brand btn-wide"
              onClick={nextStep}
            >
              Далее
              <i className="fa fa-arrow-right ml-1" />
            </button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const customSelectStyles = {
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    borderRadius: state.placement === "top" ? "5px 5px 0 0" : "0 0 5px 5px"
  }),
  option: provided => ({
    ...provided,
    paddingLeft: 20
  }),
  groupHeading: provided => ({
    ...provided,
    color: "#000000",
    fontWeight: 600,
    fontSize: 12
  }),
  dropdownIndicator: provided => ({
    ...provided,
    display: "none"
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: "none"
  })
};
const customSelectTheme = theme => ({
  ...theme,
  borderWidth: 1,
  colors: {
    ...theme.colors,
    primary: "#5fccff",
    primary50: "rgba(95,204,255,0.50)",
    primary25: "#f7f8fa"
  }
});


const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab)));