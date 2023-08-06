import React, { useEffect, useRef, useState } from "react";
import {
  makeStyles,
  Divider,
  Button,
  TextField,
  MenuItem,
    Collapse,
  ButtonGroup,
  Checkbox
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

//import ExpansionPanel from "@material-ui/core/ExpansionPanel";
//import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


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
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
  typeBlock:{
    padding:"0 10px 0px 0"
  },
  headerS2:{
    fontSize: 11,
    fontWeight:400,
    lineHeight: '12px',
    color: '#42556B'
  },
  buttonTwoG: {
    width: "100%",
    border: "1px solid #546B81",
    boxShadow: 'none!important',
  },
  buttonTwo: {
    backgroundColor: "#FAFAFA",
    width: "50%",
    fontSize: "13px",
    color: "#546B81",
    textTransform: 'none',
    "&.active": {
      backgroundColor: "#546B81",
      color: "#fff",
    },
    "&.three": {
      width: "33%",
    },
    "&:hover": {
      backgroundColor: "#546B81",
      color: "#fff",
    }
  }
});

const FirstTab2to2 = props => {
  const { user } = props;
  const classes = useStyles();
  const slider = useRef(null);
  const difrentTime = 4;
  useEffect(() => {
   // //window.scrollTo(0, 0);
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
  const schedulehours = [
    {value: 0, label: "00"},
    {value: 1, label: "01"},
    {value: 2, label: "02"},
    {value: 3, label: "03"},
    {value: 4, label: "04"},
    {value: 5, label: "05"},
    {value: 6, label: "06"},
    {value: 7, label: "07"},
    {value: 8, label: "08"},
    {value: 9, label: "09"},
    {value: 10, label: "10"},
    {value: 11, label: "11"},
    {value: 12, label: "12"},
    {value: 13, label: "13"},
    {value: 14, label: "14"},
    {value: 15, label: "15"},
    {value: 16, label: "16"},
    {value: 17, label: "17"},
    {value: 18, label: "18"},
    {value: 19, label: "19"},
    {value: 20, label: "20"},
    {value: 21, label: "21"},
    {value: 22, label: "22"},
    {value: 23, label: "23"},
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

  const addHour = (val, status) => {

    if(status == 'add'){
      let ar = [...props.filter.daysOfWeek];
      let arrCheck = ar.filter(item => item == val);
      console.log('arrCheck')
      console.log(arrCheck)
      if(!!arrCheck.length){
        return;
      }

    }

    props.updateData({ ...props.filter, daysOfWeek: [] });
  }
  return (
    <div className={classes.conteiner}>
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form">
            <div className={classes.headerS}  style={{'padding': "0 0 9px 0"}}>Выберите тип рекламных конструкций</div>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.buttonTwoG}>
              <Button className={`${classes.buttonTwo} ${props.setting.typeRekKonstrukzii == 3 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeRekKonstrukzii: 3 })} >Outdoor + Indoor</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.typeRekKonstrukzii == 1 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeRekKonstrukzii: 1 })} >Outdoor</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.typeRekKonstrukzii == 2 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeRekKonstrukzii: 2 })} >Indoor</Button>
            </ButtonGroup>

            <Divider style={{'margin': "0 0 20px 0"}} />

            <div className={classes.headerS} >Укажите длину рекламного видеоролика</div>
            <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Длина видео в секундах</div>
            <TextField
                id="duration"
                select
                label=""
                className={'duration'}
                value={props.filter.duration}
                defaultValue={5}
                onChange={(event, newValue) => {

                      //console.log('newValuenewValuenewValue')
                     // console.log(newValue.props.value)

                      props.updateData({
                        ...props.filter,
                        duration: newValue.props.value
                      })
                  }

                }
                variant="outlined"
                size="small"
            >
              {marks2.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>

            <div className={classes.headerS} style={{'padding': "20px 0 9px 0"}}>Выберите тип показов</div>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.buttonTwoG}>
              <Button className={`${classes.buttonTwo} ${props.setting.typeShows == 1 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeShows: 1 })} >Показы</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.typeShows == 2 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeShows: 2 })} >OTS</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.typeShows == 3 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, typeShows: 3 })} >Показы + OTS</Button>
            </ButtonGroup>

            <Collapse in={props.setting.typeShows == 2 || props.setting.typeShows == 3}>
              <div className={classes.headerS} style={{'padding': "15px 0 0 0"}}>Укажите количество OTS</div>
              <div className={classes.headerS2}  style={{'padding': "0 0 10px 0"}}>Общее количество контактов целевой аудитории с  рекламным сообщением</div>
              <TextField
                  className="inputCity"
                  label=""
                  size="small"
                  error={props.setting.typeShowsOTSerror}
                  variant="outlined"
                  value={props.filter.typeCountOts}
                  helperText={props.setting.typeShowsOTSerror ? "Введите число" : ""}
                  style={{ maxWidth: "89px" }}
                  onChange={e => {
                    let val  =e.target.value;
                      if(val == ""){
                        val = 0;
                      }
                      props.updateData({ ...props.filter, typeCountOts: val })
                      props.updateSetting({ ...props.setting, typeShowsOTSerror: false})
                    }
                  }
              />
            </Collapse>

            <Collapse in={props.setting.typeShows == 1 || props.setting.typeShows == 3}>
              <div className={classes.headerS} style={{'padding': "18px 0 0px 0"}}>Укажите количество показов</div>
              <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Количество выводов в блоке</div>
              <TextField
                  className="inputCity"
                  label=""
                  size="small"
                  error={props.setting.typeShowsShowsError}
                  variant="outlined"
                  helperText={props.setting.typeShowsShowsError ? "Введите число" : ""}
                  value={props.filter.typeCountShows}
                  style={{ maxWidth: "89px" }}
                  onChange={e =>{
                      props.updateData({ ...props.filter, typeCountShows: e.target.value })
                      props.updateSetting({ ...props.setting, typeShowsShowsError: false})
                    }
                  }
              />
            </Collapse>

            <div className={classes.headerS}  style={{'padding': "30px 0 0px 0"}}>Ограничивать количество показов</div>
            <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Ограничение показов в рекламном блоке</div>

            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.buttonTwoG}>
              <Button className={`${classes.buttonTwo} ${props.setting.tabLimiter == 1 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, tabLimiter: 1 })} >Точное значение</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.tabLimiter == 2 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, tabLimiter: 2 })} >Максимальное значение</Button>
            </ButtonGroup>

            <Collapse in={props.setting.tabLimiter == 1}>
              <div className={`d-flex`} style={{'padding': "10px 0 0 0"}}>
                <div style={{'width': '105px'}}>
                  <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Длина блока</div>
                  <TextField
                      className="inputCity"
                      label=""
                      size="small"
                      variant="outlined"
                      value={props.filter.blockLength}
                      style={{ maxWidth: "89px" }}
                      onChange={e =>
                          props.updateData({ ...props.filter, blockLength: e.target.value })
                      }
                  />
                </div>
                <div style={{'width': '205px'}}>
                  <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Количество показов в блоке</div>
                  <TextField
                      className="inputCity"
                      label=""
                      size="small"
                      variant="outlined"
                      value={props.filter.amountInBlock}
                      style={{ maxWidth: "89px" }}
                      onChange={e =>
                          props.updateData({ ...props.filter, amountInBlock: e.target.value })
                      }
                  />
                </div>
              </div>
            </Collapse>

            <Divider style={{'margin': "20px 0 20px 0"}} />

            <div className={classes.headerS}>Выберите дни и время показов</div>
            <div className={classes.headerS2} style={{'padding': "0 0 10px 0"}}>Настроить предпочитаемые дни и часы показов</div>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.buttonTwoG} style={{'margin': "0 0 10px 0"}}>
              <Button className={`${classes.buttonTwo} ${props.setting.tabDayT == 1 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, tabDayT: 1 })} >Весь эфир</Button>
              <Button className={`${classes.buttonTwo} ${props.setting.tabDayT == 2 ? 'active': ''}`} onClick={()=>props.updateSetting({ ...props.setting, tabDayT: 2 })} >Свое расписание</Button>
            </ButtonGroup>

            <Collapse in={props.setting.tabDayT == 1}>
              <div className={'d-flex firstRow'}>
                {schedulehours.map((val, index)=>{
                  return <CheckBoxTop count={val.label}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Пн"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Вт"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Ср"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Чт"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Пт"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Сб"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
              <div className={'d-flex'}>
                <CheckBoxLeft count={"Вс"}  />
                {schedulehours.map((val, index)=>{
                  return <CheckBoxCenter active={true}/>
                })}
              </div>
            </Collapse>

          </div>
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab2to2)));

const CheckBoxTop = props => {
  return (
      <div className={'d-flex flex-column checkBoxT'}>
        <div>{props.count}</div>
        <div ><Checkbox
            defaultChecked
            color="primary"
            size="small"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></div>
      </div>
  )
}


const CheckBoxLeft = props => {
  return (
      <div className={'d-flex checkBoxT'} style={{'margin': "0 7px 0 0"}}>
        <div>{props.count}</div>
        <div ><Checkbox
            defaultChecked
            color="primary"
            size="small"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></div>
      </div>
  )
}

const CheckBoxCenter = props => {
  return (
      <div className={props.active ? 'activeCheck' : ""}></div>
  )
}
