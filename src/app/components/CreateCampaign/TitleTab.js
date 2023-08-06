import React, { useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Box,
  Divider,
  Button,
  TextField
} from "@material-ui/core";
import Datetime from "react-datetime";
import $ from "jquery";
import ionRangeSlider from "ion-rangeslider";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import { FormattedMessage } from "react-intl";

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

  return (
    <div className="kt-form">
      <div className="kt-wizard-v2__content">
        <div className="kt-form__section kt-form__section--first">
          <div className="kt-wizard-v2__form">
            <div className="form-group">
              <TextField
                className="form-control form-control-lg"
                label="Название кампании"
                id="outlined-size-normal"
                value={props.filter.title}
                onChange={e =>
                  props.updateData({ ...props.filter, title: e.target.value })
                }
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

export default TitleTab;
