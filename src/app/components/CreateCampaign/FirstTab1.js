import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  Button,
  TextField,
  CardHeader,
  ButtonGroup
} from "@material-ui/core";


import "./datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import {FormattedMessage, injectIntl} from "react-intl";
import Swal from "sweetalert2";

import { ReactComponent as ItunesSVG } from '../../../img/itunes.svg';
import { ReactComponent as CalculatorSVG } from '../../../img/calculator.svg';
import { ReactComponent as HomeSVG } from '../../../img/home.svg';
import { ReactComponent as FindMySVG } from '../../../img/find-my.svg';
import { ReactComponent as MyShortcutsSVG } from '../../../img/my-shortcuts.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ru";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
var moment = require("moment");
const useStyles = makeStyles({
  tabContainer: {
    padding: "52px 78px 78px 78px"
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
  header:{
    fontSize: 19,
    fontWeight:500,
    lineHeight: '24px',
    padding:"20px 0 13px 0",
    color: '#000E40'
  },
  spacer: {
    marginBottom: "16px"
  },
  typographyTitle: {
    color: "#000E40",
    fontWeight: 500,
    fontSize: "15px"
  },


  expansionStyle: {
    margin: "0 !important",
    boxShadow: "none !important",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "0 !important",
    borderRadius: "0 !important"
  },
  buttonTwoG: {
    width: "100%",
    margin:"0 0 19px 0",
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
    "&:hover": {
      backgroundColor: "#546B81",
      color: "#fff",
    }
  }
});


const FirstTab1 = props => {
  const { setting, updateSetting, FirstTab1Valid} = props;
  const classes = useStyles();

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

const [dateEnd, setDateEnd] = useState();

function addZero(num) {
if (num < 10) {
  num = "0" + num;
}
return num;
}

function valuetext(value) {
    return `${value}с`;
}


const nextStep = () => {
    let title = FirstTab1Valid();
    if(!title){
        return;
    }



    if(title == "noTitle"){
      //  props.updateData({
       //     ...props.filter,
       //     title: "Пожалуйста, назовите кампанию"
      //  });
        updateSetting({ ...setting, titleError: true, titleErrorText: "Пожалуйста, назовите кампанию" });
        return;
    }
    if(title == "shortTitle"){
        //props.updateData({
        //    ...props.filter,
        //    title: "Название может содержать минимум 3 символа"
        //});
        updateSetting({ ...setting, titleError: true, titleErrorText: "Название может содержать минимум 3 символа" });
        return;
    }
    if(title == "noTypeFirstTab"){
        Swal.fire("Ошибка!", "Выберите тип настройки!", "info");
        return;
    }


    let er = false;
    if (!props.filter.title.length) {
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

    if (!er) {
      props.setNextTab();
    }
};
const [checkedB, setCheckedB] = React.useState(false);


  return (
    <div className="kt-form">
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form">
            <div className={classes.header} >Данные кампании</div>
                <TextField
                  className={`w-100 inputCity `}
                  label=""
                  helperText={setting.titleErrorText}
                  size="small"
                  error={setting.titleError ? true : false}
                  variant="outlined"
                  value={props.filter.title}
                  style={{ padding: "0 0 19px 0" }}
                  placeholder="Введите название кампании (не менее трех символов)"
                  onChange={e => {
                      props.updateData({...props.filter, title: e.target.value});
                      updateSetting({ ...setting, titleError: false, titleErrorText: "" });
                    }
                  }
                />
          </div>
        </div>
      </div>

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.buttonTwoG}>
        <Button className={`${classes.buttonTwo} ${setting.devicesFirstTab == 1 ? 'active': ''}`} onClick={()=>updateSetting({ ...setting, devicesFirstTab: 1 })}>Все конструкции</Button>
        <Button className={`${classes.buttonTwo} ${setting.devicesFirstTab == 2 ? 'active': ''}`} onClick={()=>updateSetting({ ...setting, devicesFirstTab: 2 })}>Только собственные</Button>
      </ButtonGroup>

      <Card  classes={{root: classes.elevation}}  className={`сardHeader avatarUp ${setting.typeFirstTab == 1 ? 'active': ''}`}  onClick={()=>updateSetting({ ...setting, typeFirstTab: 1 })} >
        <CardHeader
            avatar={
              <CalculatorSVG />
            }
            action={
              <ArrowForwardIosIcon />
            }
            title={<Typography classes={{ root: classes.typographyTitle }}>
              Outdoor
            </Typography>}
            subheader="А так же ключевые особенности проекта"
        />
      </Card>

      <Card  classes={{root: classes.elevation}}  className={`сardHeader avatarUp ${setting.typeFirstTab == 2 ? 'active': ''}`}  onClick={()=>updateSetting({ ...setting, typeFirstTab: 2 })} >
        <CardHeader
            avatar={
              <ItunesSVG />
            }
            action={
              <ArrowForwardIosIcon />
            }
            title={<Typography classes={{ root: classes.typographyTitle }}>
             Radio
            </Typography>}
            subheader="А так же ключевые особенности проекта"
        />
      </Card>
      <Card  classes={{root: classes.elevation}}  className={`сardHeader avatarUp ${setting.typeFirstTab == 3 ? 'active': ''}`}  onClick={()=>updateSetting({ ...setting, typeFirstTab: 3 })} >
        <CardHeader
            avatar={
              <HomeSVG />
            }
            action={
              <ArrowForwardIosIcon className={'align-self-center'} />
            }
            title={<Typography classes={{ root: classes.typographyTitle }}>
              Outdoor + Radio
            </Typography>}
            subheader="А так же ключевые особенности проекта"
        />
      </Card>
      <Card  classes={{root: classes.elevation}}  className={`сardHeader avatarUp ${setting.typeFirstTab == 4 ? 'active': ''}`}  onClick={()=>updateSetting({ ...setting, typeFirstTab: 4 })} >
        <CardHeader
            avatar={
              <FindMySVG />
            }
            action={
              <ArrowForwardIosIcon />
            }
            title={<Typography classes={{ root: classes.typographyTitle }}>
              Outdoor + Internet
            </Typography>}
            subheader="А так же ключевые особенности проекта"
        />
      </Card>

      <Card  classes={{root: classes.elevation}}  className={`сardHeader avatarUp ${setting.typeFirstTab == 5 ? 'active': ''}`}  onClick={()=>updateSetting({ ...setting, typeFirstTab: 5 })} >
        <CardHeader
            avatar={
              <MyShortcutsSVG />
            }
            action={
              <ArrowForwardIosIcon />
            }
            title={<Typography classes={{ root: classes.typographyTitle }}>
              Outdoor + Radio + Internet
            </Typography>}
            subheader="А так же ключевые особенности проекта"
        />
      </Card>

      <Grid style={{'text-align':'right'}} >
            <button className={`nextButton btn fw500`}
              onClick={nextStep}
            >
              Далее
            </button>
      </Grid>
    </div>
  );
};



const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(FirstTab1)));