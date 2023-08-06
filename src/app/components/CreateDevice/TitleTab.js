import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Box,
  Divider,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";
import Datetime from "react-datetime";
import $ from "jquery";
import ionRangeSlider from "ion-rangeslider";
import "./datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import ScheduleSelector from "../../components/ScheduleSelector";
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
  }
});

const TitleTab = props => {
  const classes = useStyles();
  const slider = useRef(null);

  //useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    if (!!props.options && Object.keys(props.options).length > 0) {
      const sliderOptions = {
        grid: true,
        values: Object.keys(props.options.during),
        onChange: e => {
          props.setDuration(e.from_value);
        }
      };
      $(slider.current).ionRangeSlider(sliderOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  const hoursData = [
    { label: "0-1", value: "0" },
    { label: "1-2", value: "1" },
    { label: "2-3", value: "2" },
    { label: "3-4", value: "3" },
    { label: "4-5", value: "4" },
    { label: "5-6", value: "5" },
    { label: "6-7", value: "6" },
    { label: "7-8", value: "7" },
    { label: "8-9", value: "8" },
    { label: "9-10", value: "9" },
    { label: "10-11", value: "10" },
    { label: "11-12", value: "11" },
    { label: "12-13", value: "12" },
    { label: "13-14", value: "13" },
    { label: "14-15", value: "14" },
    { label: "15-16", value: "15" },
    { label: "16-17", value: "16" },
    { label: "17-18", value: "17" },
    { label: "18-19", value: "18" },
    { label: "19-20", value: "19" },
    { label: "20-21", value: "20" },
    { label: "21-22", value: "21" },
    { label: "22-23", value: "22" },
    { label: "23-24", value: "23" }
  ];

  const typeDevice = [
    { label: "Приставка", value: "player" },
    { label: "Телевизор", value: "tv" },
    { label: "Остановка", value: "bus_stop" }
  ];

  const vendorDevice = [
    { label: "Samsung", value: "samsung" },
    { label: "SpinetiX", value: "SpinetiX" },
    { label: "BrightSign", value: "brightsign" },
    { label: "Rostelecom", value: "rostelecom" },
    { label: "Iadea", value: "iadea" }
  ];

  const weekDevice = [
    { label: "Пнд", value: "Mon" },
    { label: "Втр", value: "Tue" },
    { label: "Срд", value: "Wed" },
    { label: "Чтв", value: "Thu" },
    { label: "Птн", value: "Fri" },
    { label: "Сбт", value: "Sat" },
    { label: "Вск", value: "Sun" }
  ];
  const [days, setDays] = useState([]);

  return (
    <Grid className="kt-form">
      <div
        className="kt-wizard-v2__content"
        data-ktwizard-type="step-content"
        data-ktwizard-state="current"
      >
        <div className="kt-form__section kt-form__section--first">
          <div className={`${classes.root} kt-wizard-v2__form`}>
            <div className="form-group">
              <TextField
                className="form-control form-control-lg"
                label="Название"
                size="small"
                variant="outlined"
                value={props.filter.title}
                onChange={e =>
                  props.updateData({ ...props.filter, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <TextField
                label="Описание"
                multiline
                size="small"
                rows={4}
                variant="outlined"
              />
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="Ширина в см"
                    size="small"
                    variant="outlined"
                    value={props.filter.width}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="Высота в см"
                    size="small"
                    variant="outlined"
                    value={props.filter.height}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="Разрешение по ширине (px)"
                    size="small"
                    variant="outlined"
                    value={props.filter.resolutionX}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="Разрешение по высоте (px)"
                    size="small"
                    variant="outlined"
                    value={props.filter.resolutionY}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Тип устройства"
                    value={props.filter.type}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                    variant="outlined"
                  >
                    {typeDevice.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Производитель"
                    value={props.filter.vendor}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                    variant="outlined"
                  >
                    {vendorDevice.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="Модель"
                    size="small"
                    variant="outlined"
                    value={props.filter.model}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <TextField
                    className="form-control form-control-lg"
                    label="IP"
                    size="small"
                    variant="outlined"
                    value={props.filter.ip}
                    onChange={e =>
                      props.updateData({
                        ...props.filter,
                        title: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <ScheduleSelector
                selection={weekDevice}
                onChange={daysE => {
                  setDays(daysE);
                }}
              />
            </div>

            <div className="form-group">
              <ScheduleSelector
                selection={hoursData}
                onChange={daysE => {
                  setDays(daysE);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Grid>
        {!!props.filter.title && props.filter.title.length > 2 ? (
          <Grid>
            <Grid container justify="flex-end">
              <button
                className="btn btn-brand btn-md btn-tall btn-wide kt-font-transform-u"
                onClick={props.setNextTab}
              >
                Далее
              </button>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TitleTab;
