import React, { useEffect, useRef, useState } from "react";
import {
  makeStyles,
  Divider,
  // Button,
  // TextField,
  // MenuItem,
  // Slider,
  // FormGroup,
  // FormControlLabel,
  // Switch,
  // CardHeader,
  //   Avatar,
  // IconButton,
  // ButtonGroup,
  // Drawer
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Datetime from "react-datetime";
//import $ from "jquery";
import ionRangeSlider from "ion-rangeslider";
import "./datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import {FormattedMessage, injectIntl} from "react-intl";
import Swal from "sweetalert2";

// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';


// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import Collapse from "@material-ui/core/Collapse";

import "react-dates/initialize";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   isInclusivelyBeforeDay,
//   isInclusivelyAfterDay
// } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ru";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
var moment = require("moment");
const useStyles = makeStyles({
  tabContainer: {
    backgroundColor: "#fafafa",
    width: 476,
    position: 'absolute',
    top: 0
  },
  elevation: {
    boxShadow: 'none!important',
    border: "1px solid #DDE7F0",
    backgroundColor: "#fafafa",
    margin: "0 0 10px 0",
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
  typographyTitle: {
    color: "#000E40",
    fontWeight: 500,
    fontSize: "15px"
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
  },
  conteiner:{
    padding: '20px 20px 0 18px'
  },
  headerS:{
    fontSize: 13,
    fontWeight:500,
    lineHeight: '24px',
    color: '#000E40'
  },
  headerS3:{
    fontSize: 11,
    fontWeight:400,
    color: '#42556B'
  },
  inputCity:{
    padding: '10px 0 20px 0',

  }
});

const FirstTab3to1 = props => {
  const { user, updateSetting, setting } = props;
  const classes = useStyles();
  const slider = useRef(null);
  const difrentTime = 4;
  useEffect(() => {
    //window.scrollTo(0, 0);
    if (props.filter.daysOfWeek.length > 0 || props.filter.hours.length > 0) {
      setCheckedB(true);
    }
  }, []);
  useEffect(() => {
    if (props.filter.companyStartDate == "") {
      props.updateData({
        ...props.filter,
        companyStartDate: moment(props.options.minDate).format("YYYY/MM/DD")
      });
    }
    //}
  }, [props.options]);

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

  return (
    <div className={classes.conteiner}>
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form" >
              <div className={classes.headerS}  style={{'padding': "0 0 12px 0"}}>Габариты экранов Outdoor</div>
              <div>
                {["12x4","6x3", "18x6", "7,2x6"].map(board => {
                 return <button onClick={() => {
                    let ar = setting.outdoorSize
                    if(ar.includes(board)){
                      ar = ar.filter(item => item !== board)
                    }else{
                      ar.push(board)
                    }
                    updateSetting({...setting, outdoorSize: [...new Set(ar)]})
                  }}
                          className={`button1 text ${setting.outdoorSize.includes(board) ? 'button1active' : ""} btn`}>{board}</button>
                })}
              </div>
              <div className={classes.headerS3}  style={{'padding': "20px 0 12px 0"}}>Доступные разрешения экранов</div>
            {["2880x1620","1920x1080", "1080x1920", "640x320"].map(board => {
              return <button onClick={() => {
                let ar = setting.outdoorResolution
                if(ar.includes(board)){
                  ar = ar.filter(item => item !== board)
                }else{
                  ar.push(board)
                }
                updateSetting({...setting, outdoorResolution: [...new Set(ar)]})
              }}
                             className={`button1 text ${setting.outdoorResolution.includes(board) ? 'button1active' : ""} btn`}>{board}</button>
            })}

            <Divider  style={{'margin': "20px 0 20px 0"}} />

              <div className={classes.headerS} style={{'padding': "0 0 12px 0"}}>Габариты экранов Indoor</div>
            {["2880x1620","1920x1080", "1080x1920", "640x320"].map(board => {
              return <button onClick={() => {
                let ar = setting.indoorSize
                if(ar.includes(board)){
                  ar = ar.filter(item => item !== board)
                }else{
                  ar.push(board)
                }
                updateSetting({...setting, indoorSize: [...new Set(ar)]})
              }}
                             className={`button1 text ${setting.indoorSize.includes(board) ? 'button1active' : ""} btn`}>{board}</button>
            })}

            <div className={classes.headerS3} style={{'padding': "20px 0 12px 0"}}>Доступные разрешения экранов</div>
            {["2880x1620","1920x1080", "1080x1920", "640x320"].map(board => {
              return <button onClick={() => {
                let ar = setting.indoorResolution
                if(ar.includes(board)){
                  ar = ar.filter(item => item !== board)
                }else{
                  ar.push(board)
                }
                updateSetting({...setting, indoorResolution: [...new Set(ar)]})
              }}
                             className={`button1 text ${setting.indoorResolution.includes(board) ? 'button1active' : ""} btn`}>{board}</button>
            })}

          </div>
        </div>
      </div>

    </div>
  );
};


const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab3to1)));