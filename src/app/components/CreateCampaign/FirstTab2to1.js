import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  // Typography,
  makeStyles,
  // Box,
  //   Card,
  // Divider,
  // Button,
  TextField,
  // MenuItem,
  // Slider,
  // FormGroup,
  // FormControlLabel,
  // Switch,
  // CardHeader,
  //   Avatar,
  // IconButton,
  // ButtonGroup,
  Fab
} from "@material-ui/core";
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import Datetime from "react-datetime";
//import $ from "jquery";
//import ionRangeSlider from "ion-rangeslider";
import "./datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
//import Select from "react-select";
import { injectIntl } from "react-intl";
import Swal from "sweetalert2";


import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';

//import ExpansionPanel from "@material-ui/core/ExpansionPanel";
//import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CloseIcon from "@material-ui/icons/Close";

//import Collapse from "@material-ui/core/Collapse";
import "react-dates/initialize";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   isInclusivelyBeforeDay,
//   isInclusivelyAfterDay
// } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ru";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
var moment = require("moment");
const top100Films = [
  { title: 'Н.Новгород', value: 'NN' },
  { title: 'Москва', value: 'MSK' }
];
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
  conteiner: {
    padding: '20px 20px 0 18px'
  },
  headerS: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '24px',
    color: '#000E40'
  },
  inputCity: {
    padding: '10px 0 20px 0',

  }
});

const FirstTab2to1 = props => {
  const { user } = props;
  const classes = useStyles();
  const slider = useRef(null);
  const difrentTime = 4;

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

  const [city, setCity] = useState({});

  return (
    <div className={classes.conteiner}>
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form" >
            <div className={classes.headerS} >Укажите регион проведения рекламной кампании</div>
            <div className={'d-flex'}>
              <div>
                <Autocomplete
                  disablePortal
                  className="inputCity city"
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      return
                    }
                    console.log(newValue.value)
                    setCity(newValue);
                  }}
                  // value={!!Object.keys(city).length ? city.title : ""}
                  id="controllable-states-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  //options={top100Films.map((option) => option.title)}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
              <Fab className={'inputCityPlus'} aria-label="add" onClick={() => {
                if (!city) {
                  return;
                }
                let ar = [...props.filter.city];
                //console.log('newValue')
                //console.log(newValue)

                let arrCheck = ar.filter(item => item.value == city.value);
                console.log('arrCheck')
                console.log(arrCheck)
                if (!!arrCheck.length) {
                  return;
                }
                ar.push(city);
                // let arrayUniqueByKey = [...new Map(array.map(item =>
                //  [item['value'], item])).values()];


                props.updateData({ ...props.filter, city: ar });
                //setCity({})
              }}>
                <AddIcon style={{ 'color': '#0075FF' }} />
              </Fab>
            </div>
            <div style={{ 'padding': "20px 0 0 0" }}></div>
            {props.filter.city.map((city, index) => {
              return <div className={'slideLineBageC'}>
                <CloseIcon className={'fileSremove'} onClick={() => {
                  let arr = props.filter.city.filter(item => item.value !== city.value);
                  props.updateData({ ...props.filter, city: arr });
                }
                } />
                <div className={'slideLineBage d-flex noPointer'} >
                  <Grid container direction="row" className="align-items-center mr-auto">
                    <Grid className={'title city'}>
                      {city.title}
                    </Grid>
                  </Grid>
                </div>
              </div>
            }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab2to1)));