import React, { useEffect, useRef, useState } from 'react';
import deLocale from 'date-fns/locale/ru';
import {
  Typography,
  makeStyles,
  MenuItem,
  FormControlLabel,
  Radio,
  Checkbox,
  RadioGroup, Select, Collapse, FormControl, InputLabel
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import "../../../_metronic/_assets/scss/datetime.scss"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import Swal from 'sweetalert2';

// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


// import { ReactComponent as ItunesSVG } from '../../../img/itunes.svg';
// import { ReactComponent as PhotosSVG } from '../../../img/photos.svg';
// import { ReactComponent as PodcastsSVG } from '../../../img/podcasts.svg';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import FormHelperText from '@material-ui/core/FormHelperText';

import 'react-dates/initialize';
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   isInclusivelyBeforeDay,
//   isInclusivelyAfterDay
// } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ru';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
var moment = require('moment');
const useStyles = makeStyles({
  tabContainer: {
    backgroundColor: '#fafafa',
    width: 476,
    position: 'absolute',
    top: 0,
  },
  elevation: {
    boxShadow: 'none!important',
    border: '1px solid #DDE7F0',
    backgroundColor: '#fafafa',
    margin: '0 0 10px 0',
  },
  tabHeader: {
    margin: '1.75rem 0',
    fontSize: '1.1rem',
    color: '#48465b',
  },
  header: {
    fontSize: 19,
    fontWeight: 500,
    lineHeight: '24px',
    padding: '20px 0 13px 0',
    color: '#000E40',
  },
  headerS: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '24px',
    color: '#000E40',
  },
  headerS2: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: '12px',
    color: '#42556B',
  },
  twoItemsRowItem: {
    width: '100%',
  },
  iconContainer: {
    padding: '7px 1rem',
    border: '1px solid #e2e5ec',
    borderRadius: '0 4px 4px 0',
    fontSize: '1.4rem',
    backgroundColor: '#f7f8fa',
  },
  spacer: {
    marginBottom: '16px',
  },
  typographyTitle: {
    color: '#000E40',
    fontWeight: 500,
    fontSize: '15px',
  },
  expansionStyle: {
    margin: '0 !important',
    boxShadow: 'none !important',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    padding: '0 !important',
    borderRadius: '0 !important',
  },
  dateBlock: {
    padding: '0 10px 30px 0',
    cursor: 'pointer',
  },
});

const FirstTab2 = (props) => {
  const { setting, updateSetting } = props;

  const classes = useStyles();
  const slider = useRef(null);
  const difrentTime = 4;

  useEffect(() => {
    if (props.filter.daysOfWeek.length > 0 || props.filter.hours.length > 0) {
      setCheckedB(true);
    }
  }, [props.filter.daysOfWeek.length, props.filter.hours.length]);

  useEffect(() => {
    if (props.filter.companyStartDate == '') {
      props.updateData({
        ...props.filter,
        companyStartDate: props.filter.minDate,
      });
    }
  }, [props, props.options]);

  const [focusedInStart, setFocusedInStart] = useState(false);
  const [dateStart, setDateStart] = useState(props.filter.minDate);
  //const [dateStartMin, setDateStartMin] = useState(
  //  moment(props.filter.minDate).subtract(1, 'days'),
  //);
  const [dateStartMax, setDateStartMax] = useState(moment().add(45, 'days'));
  const [focusedInEnd, setFocusedInEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [timeStart, setTimeStart] = useState(0);
  const setTimeStartAll = (time) => {
    setTimeStart(time);
    if (!!dateEnd) {
      setDateEndAll(dateEnd, time);
    } else {
      props.updateData({ ...props.filter, companyStartTime: time });
    }
  };

  const setTimeEndAll = (time) => {
    setTimeEnd(time);
    props.updateData({ ...props.filter, companyEndTime: time });
  };

  const setDateStartAll = (date) => {

    console.log('setDateStartAllsetDateStartAllsetDateStartAll');
    console.log(date);

    setDateStart(date);
    let newDate = moment(date).format('YYYY/MM/DD');
    props.updateData({ ...props.filter, companyStartDate: newDate });

    if (moment(props.filter.companyEndDate, 'DD/MM/YYYY').unix() < moment(props.filter.companyStartDate, 'DD/MM/YYYY').unix()) {
      console.log('44444444444444444');
    }
  };

  const setDateEndAll = (date, ttt = null) => {
    let res = { ...props.filter };
    let newDate = moment(date).format('YYYY/MM/DD');
    if (ttt != null) {
      var endTime = +ttt + difrentTime;
      res.companyStartTime = ttt;
    } else {
      var endTime = +props.filter.companyStartTime + difrentTime;
    }

    if (
      !!props.filter.companyStartDate &&
      moment(props.filter.companyStartDate).format('YYYY/MM/DD') == newDate
    ) {
      if (endTime > 23) {
        endTime -= 23;
        newDate = moment(date)
          .add(1, 'days')
          .format('YYYY/MM/DD');
      }
    } else if (
      !!props.filter.companyStartDate &&
      moment(props.filter.companyStartDate)
        .add(1, 'days')
        .format('YYYY/MM/DD') == newDate &&
      endTime > 23
    ) {
      endTime -= 23;
    } else {
      endTime = 0;
    }

    if (+props.filter.companyEndTime < endTime) {
      endTime = addZero(endTime);
      res.companyEndTime = endTime;
    }

    res.companyEndDate = newDate;
    setDateEnd(moment(newDate));
    setDateStartMax(moment(newDate).add(1, 'days'));
    props.updateData(res);
  };

  function addZero(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }
  /*
    const marks2 = [
      {
        value: 5,
        label: '5',
      },
      {
        value: 10,
        label: '10',
      },
      {
        value: 15,
        label: '15',
      },
      {
        value: 20,
        label: '20',
      },
      {
        value: 25,
        label: '25',
      },
      {
        value: 30,
        label: '30',
      },
      {
        value: 35,
        label: '35',
      },
      {
        value: 40,
        label: '40',
      },
      {
        value: 45,
        label: '45',
      },
      {
        value: 50,
        label: '50',
      },
      {
        value: 55,
        label: '55',
      },
      {
        value: 60,
        label: '60',
      },
    ];
    const marks = [
      {
        value: 10,
        label: '10',
      },
      {
        value: 15,
        label: '15',
      },
      {
        value: 20,
        label: '20',
      },
      {
        value: 25,
        label: '25',
      },
      {
        value: 30,
        label: '30',
      },
      {
        value: 35,
        label: '35',
      },
      {
        value: 40,
        label: '40',
      },
      {
        value: 45,
        label: '45',
      },
    ];
    */
  const weekDays = [
    {
      value: 'mon',
      label: <FormattedMessage id={'DAYS.MON'} />,
      short: 'Пн',
    },
    {
      value: 'tue',
      label: <FormattedMessage id={'DAYS.TUE'} />,
      short: 'Вт',
    },
    {
      value: 'wed',
      label: <FormattedMessage id={'DAYS.WED'} />,
      short: 'Ср',
    },
    {
      value: 'thu',
      label: <FormattedMessage id={'DAYS.THU'} />,
      short: 'Чт',
    },
    {
      value: 'fri',
      label: <FormattedMessage id={'DAYS.FRI'} />,
      short: 'Пт',
    },
    {
      value: 'sat',
      label: <FormattedMessage id={'DAYS.SAT'} />,
      short: 'Сб',
    },
    {
      value: 'sun',
      label: <FormattedMessage id={'DAYS.SUN'} />,
      short: 'Вс',
    },
  ];
  const hoursData = [
    { label: '00:00 - 01:00', value: 0 },
    { label: '01:00 - 02:00', value: 1 },
    { label: '02:00 - 03:00', value: 2 },
    { label: '03:00 - 04:00', value: 3 },
    { label: '04:00 - 05:00', value: 4 },
    { label: '05:00 - 06:00', value: 5 },
    { label: '06:00 - 07:00', value: 6 },
    { label: '07:00 - 08:00', value: 7 },
    { label: '08:00 - 09:00', value: 8 },
    { label: '09:00 - 10:00', value: 9 },
    { label: '10:00 - 11:00', value: 10 },
    { label: '11:00 - 12:00', value: 11 },
    { label: '12:00 - 13:00', value: 12 },
    { label: '13:00 - 14:00', value: 13 },
    { label: '14:00 - 15:00', value: 14 },
    { label: '15:00 - 16:00', value: 15 },
    { label: '16:00 - 17:00', value: 16 },
    { label: '17:00 - 18:00', value: 17 },
    { label: '18:00 - 19:00', value: 18 },
    { label: '19:00 - 20:00', value: 19 },
    { label: '20:00 - 21:00', value: 20 },
    { label: '21:00 - 22:00', value: 21 },
    { label: '22:00 - 23:00', value: 22 },
    { label: '23:00 - 24:00', value: 23 },
  ];
  const hoursTime = [
    { label: '00:00', value: '00' },
    { label: '01:00', value: '01' },
    { label: '02:00', value: '02' },
    { label: '03:00', value: '03' },
    { label: '04:00', value: '04' },
    { label: '05:00', value: '05' },
    { label: '06:00', value: '06' },
    { label: '07:00', value: '07' },
    { label: '08:00', value: '08' },
    { label: '09:00', value: '09' },
    { label: '10:00', value: '10' },
    { label: '11:00', value: '11' },
    { label: '12:00', value: '12' },
    { label: '13:00', value: '13' },
    { label: '14:00', value: '14' },
    { label: '15:00', value: '15' },
    { label: '16:00', value: '16' },
    { label: '17:00', value: '17' },
    { label: '18:00', value: '18' },
    { label: '19:00', value: '19' },
    { label: '20:00', value: '20' },
    { label: '21:00', value: '21' },
    { label: '22:00', value: '22' },
    { label: '23:00', value: '23' },
  ];
  function valuetext(value) {
    return `${value}с`;
  }
  const nextStep = () => {
    console.log('props.filter.typeCountOts');
    console.log(props.filter.typeCountOts);
    console.log(setting.typeShows);

    if ((setting.typeShows == 2 || setting.typeShows == 3) && props.filter.typeCountOts == 0) {
      console.log('props.filter.typeCountOts111');
      updateSetting({ ...setting, typeShowsOTSerror: true });
      return;
    }
    if ((setting.typeShows == 1 || setting.typeShows == 3) && props.filter.typeCountShows == 0) {
      console.log('props.filter.typeCountShows');
      updateSetting({ ...setting, typeShowsShowsError: true });
      return;
    }

    let er = false;
    if (!props.filter.companyStartDate.length) {
      Swal.fire('Ошибка!', 'Укажите начало кампании!', 'info');
      er = true;
    } else if (!props.filter.companyEndDate.length) {
      Swal.fire('Ошибка!', 'Укажите окончание кампании!', 'info');
      er = true;
    } else if (!props.filter.title.length) {
      Swal.fire('Ошибка!', 'Укажите Название кампании!', 'info');
      er = true;
    } else if (props.filter.title.length < 3) {
      Swal.fire('Ошибка!', 'Название кампании должно быть не короче 3х символов!', 'info');
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

  const getNeedTime = (dateS) => {
    let time = [];
    hoursTime.forEach((tt) => {
      console.log("getNeedTimegetNeedTimegetNeedTimegetNeedTimegetNeedTime")
      console.log(props.filter.minDate)
      console.log(dateS)
      console.log(parseInt(tt.value))
      console.log(props.filter.minHour)

      if (
        props.filter.minDate != moment(dateS).format('YYYY/MM/DD') ||
        (props.filter.minDate == moment(dateS).format('YYYY/MM/DD') &&
          parseInt(tt.value) >= +props.filter.minHour)
      ) {
        time.push(tt);
      }
    });

    return time;
  };

  const workingDaysCheck = (val) => {
    let status = 0;
    props.filter.daysOfWeek.forEach((value) => {
      if (['mon', 'tue', 'wed', 'thu', 'fri'].includes(value)) {
        status++;
      }
    });
    if (status === 5) {
      return true;
    }
    return false;
  };

  const hollyDaysCheck = (val) => {
    let status = 0;
    props.filter.daysOfWeek.forEach((value) => {
      if (['sat', 'sun'].includes(value)) {
        status++;
      }
    });
    if (status === 2) {
      return true;
    }
    return false;
  };

  const morningCheck = (val) => {
    let status = 0;
    props.filter.hours.forEach((value) => {
      if ([6, 7, 8, 9, 10].includes(value)) {
        status++;
      }
    });
    if (status === 5) {
      return true;
    }
    return false;
  };

  const dayCheck = (val) => {
    let status = 0;
    props.filter.hours.forEach((value) => {
      if ([11, 12, 13, 14, 15, 16, 17].includes(value)) {
        status++;
      }
    });
    if (status === 7) {
      return true;
    }
    return false;
  };

  const eveningCheck = (val) => {
    let status = 0;
    props.filter.hours.forEach((value) => {
      if ([18, 19, 20, 21, 22, 23].includes(value)) {
        status++;
      }
    });
    if (status === 6) {
      return true;
    }
    return false;
  };

  const nightCheck = (val) => {
    let status = 0;
    props.filter.hours.forEach((value) => {
      if ([0, 1, 2, 3, 4, 5].includes(value)) {
        status++;
      }
    });
    if (status === 6) {
      return true;
    }
    return false;
  };

  const getNeedTimeEnd = (dateS) => {
    let time = [];
    console.log(props.filter.minDate);
    console.log(moment(dateS).format('YYYY/MM/DD'));
    console.log('getNeedTimeEnd');

    let fromSt = 0;
    if (+props.filter.companyStartTime + difrentTime > 23) {
      fromSt = +props.filter.companyStartTime + difrentTime - 23;
    }

    console.log('--------');
    console.log(fromSt);
    console.log(props.filter.companyStartDate);
    console.log(moment(props.filter.companyStartDate).format('YYYY/MM/DD'));
    console.log(moment(dateS).format('YYYY/MM/DD'));
    console.log(moment(dateS).diff(props.filter.companyStartDate, 'days'));

    console.log('--------1');
    hoursTime.forEach((tt) => {
      if (
        moment(dateS).diff(props.filter.companyStartDate, 'days') > 1 ||
        (moment(props.filter.companyStartDate).format('YYYY/MM/DD') !=
          moment(dateS).format('YYYY/MM/DD') &&
          +tt.value >= fromSt) ||
        (moment(props.filter.companyStartDate).format('YYYY/MM/DD') ==
          moment(dateS).format('YYYY/MM/DD') &&
          +tt.value >= +props.filter.companyStartTime + difrentTime) ||
        !dateEnd
      ) {
        time.push(tt);
      }
    });
    return time;
  };

  const [selectedDate, handleDateChange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <div className="py-0">
        <div className="pb-0 mt-1 mb-3">
          <Typography className={`font-weight-bold ml-2 ml-md-0`}>Период кампании</Typography>
        </div>
        <div className="text-md-left">
          <div className={`row m-0 px-0 no-gutters w-100 flex-nowrap d-flex flex-column flex-sm-row`}>
            <div className={`w-100 mr-3 w-51`}>
              <MuiPickersUtilsProvider
                locale={deLocale}
                utils={DateFnsUtils}
                className={`col-xl-7`}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant="inline"
                  inputVariant="outlined"
                  format="dd.MM.yyyy"
                  margin="normal"
                  id="date-start"
                  label={`Дата начала`}
                  className={`my-0 dateBlock minHeight70 cursor-pointer`}
                  minDate={props.filter.minDate}
                  keyboardIcon={
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.4375 2.0013H14.1042C14.281 2.0013 14.4505 2.07154 14.5756 2.19656C14.7006 2.32159 14.7708 2.49116 14.7708 2.66797V13.3346C14.7708 13.5114 14.7006 13.681 14.5756 13.806C14.4505 13.9311 14.281 14.0013 14.1042 14.0013H2.10417C1.92736 14.0013 1.75779 13.9311 1.63276 13.806C1.50774 13.681 1.4375 13.5114 1.4375 13.3346V2.66797C1.4375 2.49116 1.50774 2.32159 1.63276 2.19656C1.75779 2.07154 1.92736 2.0013 2.10417 2.0013H4.77083V0.667969H6.10417V2.0013H10.1042V0.667969H11.4375V2.0013ZM10.1042 3.33464H6.10417V4.66797H4.77083V3.33464H2.77083V6.0013H13.4375V3.33464H11.4375V4.66797H10.1042V3.33464ZM13.4375 7.33463H2.77083V12.668H13.4375V7.33463Z"
                        fill="#448AFF"
                      />
                    </svg>
                  }
                  //maxDate={moment(props.filter.companyEndDate).format('YYYY/MM/DD')}
                  value={props.filter.companyStartDate}
                  //  function(){
                  //    return props.filter.companyStartDate
                  //        ? moment(props.filter.companyStartDate).format("YYYY/MM/DD")
                  //        : moment(props.options.minDate).format("YYYY/MM/DD")
                  //  }()
                  // }
                  onChange={(date) => {
                    setDateStartAll(date);
                    setIsOpen(false);
                  }}
                  open={isOpen}
                  // KeyboardButtonProps={{
                  //   onFocus: e => {
                  ///     setIsOpen(true);
                  //   }
                  // }}
                  //keyboardIcon={false}
                  KeyboardButtonProps={{
                    onFocus: () => {
                      setIsOpen(true);
                    },
                  }}
                  PopoverProps={{
                    disableRestoreFocus: true,
                    onClose: () => {
                      setIsOpen(false);
                    },
                  }}
                  InputProps={{
                    onFocus: () => {
                      setIsOpen(true);
                    },
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={`w-100`}>
              <FormControl className={'w-100 minHeight70'} variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Время начала</InputLabel>
                <Select
                  id="demo-simple-select-helper"
                  label="Время начала"
                  value={props.filter.companyStartTime}
                  onChange={(e) => setTimeStartAll(e.target.value)}>
                  {
                    getNeedTime(dateStart).map((o) => (
                      <MenuItem key={o.value} value={o.value}>
                        {o.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={`row m-0 px-0 no-gutters w-100 flex-nowrap d-flex flex-column flex-sm-row`}>
            <div className={`w-100 mr-3`}>
              <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant="inline"
                  inputVariant="outlined"
                  format="dd.MM.yyyy"
                  margin="normal"
                  id="date-end"
                  label="Дата окончания"
                  //defaultValue="дд.мм.гггг"
                  className={`my-0 dateBlock minHeight70`}
                  keyboardIcon={
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.4375 2.0013H14.1042C14.281 2.0013 14.4505 2.07154 14.5756 2.19656C14.7006 2.32159 14.7708 2.49116 14.7708 2.66797V13.3346C14.7708 13.5114 14.7006 13.681 14.5756 13.806C14.4505 13.9311 14.281 14.0013 14.1042 14.0013H2.10417C1.92736 14.0013 1.75779 13.9311 1.63276 13.806C1.50774 13.681 1.4375 13.5114 1.4375 13.3346V2.66797C1.4375 2.49116 1.50774 2.32159 1.63276 2.19656C1.75779 2.07154 1.92736 2.0013 2.10417 2.0013H4.77083V0.667969H6.10417V2.0013H10.1042V0.667969H11.4375V2.0013ZM10.1042 3.33464H6.10417V4.66797H4.77083V3.33464H2.77083V6.0013H13.4375V3.33464H11.4375V4.66797H10.1042V3.33464ZM13.4375 7.33463H2.77083V12.668H13.4375V7.33463Z"
                        fill="#448AFF"
                      />
                    </svg>
                  }
                  minDate={(function () {
                    let data;
                    if (!!props.filter.companyStartDate) {
                      data = props.filter.companyStartDate;
                    } else {
                      data = props.filter.minDate;
                    }
                    return moment(data).format('YYYY/MM/DD');
                  })()}
                  value={props.filter.companyEndDate}
                  onChange={(date) => {
                    setDateEndAll(date);
                    setIsOpen2(false);
                  }}
                  open={isOpen2}
                  //KeyboardButtonProps={{
                  //  onFocus: e => {
                  //    setIsOpen2(true);
                  //  }
                  //}}
                  KeyboardButtonProps={{
                    onFocus: () => {
                      setIsOpen2(true);
                    },
                  }}
                  PopoverProps={{
                    disableRestoreFocus: true,
                    onClose: () => {
                      setIsOpen2(false);
                    },
                  }}
                  InputProps={{
                    onFocus: () => {
                      setIsOpen2(true);
                    },
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={`w-100`}>
              <FormControl className={'w-100 minHeight70'} variant="outlined">
                <InputLabel id="demo-simple-select-helper-label">Время окончания</InputLabel>
                <Select
                  label="Время окончания"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={props.filter.companyEndTime}
                  onChange={(e) => setTimeEndAll(e.target.value)}>
                  {getNeedTimeEnd(dateEnd).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="py-0">
        <div className="pb-0 mt-1 mb-3">
          <Typography className={`font-weight-bold ml-2 ml-md-0`}>Расписание показов</Typography>
        </div>
        <div className="w-100">
          <RadioGroup
            className="d-flex flex-nowrap flex-lg-row mb-1"
            aria-label="gender"
            value={setting.tabDayT}
            onChange={(event) => updateSetting({ ...setting, tabDayT: event.target.value })}>
            <FormControlLabel
              value="one"
              control={<Radio className={'py-0 pl-0'} color="primary" />}
              label="Показы в любое время"
              className={'c455A64 col fS14 '}
            />
            <FormControlLabel
              value="two"
              control={<Radio className={'py-0 pl-0'} color="primary" />}
              label="Показы по расписанию"
              className={'c455A64 col fS14'}
            />
          </RadioGroup>
          <Collapse in={props.setting.tabDayT === 'two'}>
            <div className="pb-0 mt-1 mb-3">
              <Typography className={`ml-2 ml-md-0 fS13`}>Дни недели</Typography>
            </div>
            <div className={'d-flex mb-3'}>
              {weekDays.map((option, index) => (
                <div
                  key={'weekDays' + option.short}
                  className={`c274C77 fS13 ${index + 1 < weekDays.length ? "mr-2" : ""} noselect fontGR dayBt ${props.filter.daysOfWeek.indexOf(option.value) > -1 ? '' : 'noU'
                    }`}
                  onClick={(e) => {
                    let options = [...props.filter.daysOfWeek];
                    if (props.filter.daysOfWeek.indexOf(option.value) === -1) {
                      options.push(option.value);
                    } else {
                      if (props.filter.daysOfWeek.length <= 1) {
                        return;
                      }
                      let index = options.indexOf(option.value);
                      options.splice(index, 1);
                    }
                    props.updateData({ ...props.filter, daysOfWeek: options });
                  }}>
                  {option.short}
                </div>
              ))}
            </div>
            <div className={'d-flex mb-3'}>
              <div className={''}>
                <FormControlLabel
                  value={true}
                  control={
                    <Checkbox
                      color="primary"
                      className={'py-0 pr-1'}
                      checked={props.filter.daysOfWeek.length === 7}
                      onChange={(e) => {
                        let options = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                        if (!e.target.checked) {
                          options = [];
                        }
                        props.updateData({ ...props.filter, daysOfWeek: options });
                      }}
                    />
                  }
                  label={'Все дни'}
                  labelPlacement="end"
                  className={'fS13 fontGR m-0'}
                />
              </div>
              <div className={'m-auto'}>
                <FormControlLabel
                  value={true}
                  control={
                    <Checkbox
                      color="primary"
                      className={'py-0 pr-1'}
                      checked={workingDaysCheck()}
                      onChange={(e) => {
                        let options = ['mon', 'tue', 'wed', 'thu', 'fri'];
                        if (e.target.checked) {
                          options = [
                            ...new Set([
                              ...props.filter.daysOfWeek,
                              ...['mon', 'tue', 'wed', 'thu', 'fri'],
                            ]),
                          ];
                        } else {
                          options = props.filter.daysOfWeek.filter(
                            (hour) => !['mon', 'tue', 'wed', 'thu', 'fri'].includes(hour),
                          );
                        }
                        props.updateData({ ...props.filter, daysOfWeek: options });
                      }}
                    />
                  }
                  label={'Будние дни'}
                  labelPlacement="end"
                  className={'fS13 fontGR m-0'}
                />
              </div>
              <div className={''}>
                <FormControlLabel
                  value={true}
                  control={
                    <Checkbox
                      color="primary"
                      className={'py-0 pr-1'}
                      checked={hollyDaysCheck()}
                      onChange={(e) => {
                        let options = ['sat', 'sun'];
                        if (e.target.checked) {
                          options = [...new Set([...props.filter.daysOfWeek, ...['sat', 'sun']])];
                        } else {
                          options = props.filter.daysOfWeek.filter(
                            (hour) => !['sat', 'sun'].includes(hour),
                          );
                        }
                        props.updateData({ ...props.filter, daysOfWeek: options });
                      }}
                    />
                  }
                  label={'Выходные'}
                  labelPlacement="end"
                  className={'fS13 fontGR m-0'}
                />
              </div>
            </div>
            <div className="pb-0 mb-3">
              <Typography className={`ml-2 ml-md-0 fS13`}>Время</Typography>
            </div>
            <div className={'d-flex mb-3 flex-wrap'}>
              {hoursData.map((option) => (
                <div
                  key={'hoursData' + option.label}
                  className={`c274C77 fS13 mb-2 noselect fontGR hourBt ${props.filter.hours.indexOf(option.value) > -1 ? '' : 'noU'
                    } `}
                  onClick={(e) => {
                    let options = [...props.filter.hours];
                    if (props.filter.hours.indexOf(option.value) === -1) {
                      options.push(option.value);
                    } else {
                      let index = options.indexOf(option.value);
                      options.splice(index, 1);
                    }
                    props.updateData({ ...props.filter, hours: options });
                  }}>
                  {option.label}
                </div>
              ))}
            </div>
            <div className={'d-flex mb-2'}>
              <div className={'mr-auto'}>
                <FormControlLabel
                  value={true}
                  control={
                    <Checkbox
                      color="primary"
                      className={'py-0'}
                      checked={props.filter.hours.length === 24}
                      onChange={(e) => {
                        let options = [
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                          6,
                          7,
                          8,
                          9,
                          10,
                          11,
                          12,
                          13,
                          14,
                          15,
                          16,
                          17,
                          18,
                          19,
                          20,
                          21,
                          22,
                          23,
                        ];
                        if (!e.target.checked) {
                          options = [];
                        }
                        props.updateData({ ...props.filter, hours: options });
                      }}
                    />
                  }
                  label={'Круглосуточно'}
                  labelPlacement="end"
                  className={'fS13 fontGR'}
                />
              </div>

              <div className={'d-flex flex-wrap justify-content-end'}>
                <div style={{ width: 80 }}>
                  <FormControlLabel
                    value={true}
                    control={
                      <Checkbox
                        color="primary"
                        className={'py-0'}
                        checked={morningCheck()}
                        onChange={(e) => {
                          let options = [6, 7, 8, 9, 10];
                          if (e.target.checked) {
                            options = [
                              ...new Set([...props.filter.hours, ...[6, 7, 8, 9, 10]]),
                            ];
                          } else {
                            options = props.filter.hours.filter(
                              (hour) => ![6, 7, 8, 9, 10].includes(hour),
                            );
                          }
                          props.updateData({ ...props.filter, hours: options });
                        }}
                      />
                    }
                    label={'Утро'}
                    labelPlacement="end"
                    className={'fS13 fontGR'}
                  />
                </div>
                <div style={{ width: 80 }}>
                  <FormControlLabel
                    value={true}
                    control={
                      <Checkbox
                        color="primary"
                        className={'py-0'}
                        checked={dayCheck()}
                        onChange={(e) => {
                          let options = [11, 12, 13, 14, 15, 16, 17];
                          if (e.target.checked) {
                            options = [
                              ...new Set([
                                ...props.filter.hours,
                                ...[11, 12, 13, 14, 15, 16, 17],
                              ]),
                            ];
                          } else {
                            options = props.filter.hours.filter(
                              (hour) => ![11, 12, 13, 14, 15, 16, 17].includes(hour),
                            );
                          }
                          props.updateData({ ...props.filter, hours: options });
                        }}
                      />
                    }
                    label={'День'}
                    labelPlacement="end"
                    className={'fS13 fontGR'}
                  />
                </div>
                <div style={{ width: 80 }}>
                  <FormControlLabel
                    value={true}
                    control={
                      <Checkbox
                        color="primary"
                        className={'py-0'}
                        checked={eveningCheck()}
                        onChange={(e) => {
                          let options = [18, 19, 20, 21, 22, 23];
                          if (e.target.checked) {
                            options = [
                              ...new Set([
                                ...props.filter.hours,
                                ...[18, 19, 20, 21, 22, 23],
                              ]),
                            ];
                          } else {
                            options = props.filter.hours.filter(
                              (hour) => ![18, 19, 20, 21, 22, 23].includes(hour),
                            );
                          }
                          props.updateData({ ...props.filter, hours: options });
                        }}
                      />
                    }
                    label={'Вечер'}
                    labelPlacement="end"
                    className={'fS13 fontGR'}
                  />
                </div>
                <div style={{ width: 80 }}>
                  <FormControlLabel
                    value={true}
                    control={
                      <Checkbox
                        color="primary"
                        className={'py-0'}
                        checked={nightCheck()}
                        onChange={(e) => {
                          let options = [0, 1, 2, 3, 4, 5];
                          if (e.target.checked) {
                            options = [
                              ...new Set([
                                ...props.filter.hours,
                                ...[0, 1, 2, 3, 4, 5],
                              ]),
                            ];
                          } else {
                            options = props.filter.hours.filter(
                              (hour) => ![0, 1, 2, 3, 4, 5].includes(hour),
                            );
                          }
                          props.updateData({ ...props.filter, hours: options });
                        }}
                      />
                    }
                    label={'Ночь'}
                    labelPlacement="end"
                    className={'fS13 fontGR'}
                  />
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => ({
  user: store.auth.user,
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab2)));
