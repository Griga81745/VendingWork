import React, { useState, useEffect } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  makeStyles,
  withStyles,
  Box,
  Button,
  Drawer,
  Switch,
  TextField,
  MenuItem,
  Hidden,
  Divider, IconButton,
  FormControlLabel, Accordion, AccordionSummary, AccordionDetails
} from "@material-ui/core";
import axios from "axios";
import { toAbsoluteUrl } from "app/utils/index";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AccordionHead from "../../CreateCampaign/Accordion/AccordionHead";
import TitleTab from "../../CreateDevice/TitleTab";
import ThirdTab from "../../CreateDevice/ThirdTab";
import FourthTab from "../../CreateDevice/FourthTab";
import DevicesMap from "../../CreateDevice/map";
import "../../../../_metronic/_assets/scss/default.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../../../store/ducks/auth.duck";
import "../../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { Formik } from "formik";
import clsx from "clsx";
import { device_info, save_device_edit_add } from "../../../crud/auth.crud";
import ScheduleSelector from "../../ScheduleSelector";

import AlbumViewTablet from "../../CreateDevice/AlbumViewTablet";
import AlbumViewDesktop from "../../CreateDevice/AlbumViewDesktop";
import AlbumViewMobile from "../../CreateDevice/AlbumViewMobile";

import ProgressLoader from "../../ViewMedia/ProgressLoader";
import { connect } from "react-redux";
const useStyles = theme => ({
  subHeading: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: '.0125em!important'
  },
  AccordionSummary: {
    minHeight: '64px',
    padding: 0
  },
  root: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5) !important"
  },
  rootTree: {
    flexGrow: 1,
    maxWidth: 400,
  },
  tabsContainer: {
    borderRight: "1px solid #eeeef4",
    padding: "4.5rem 1.3rem 4.5rem 1.5rem"
  },
  tab: {
    maxWidth: "100%",
    padding: ".75rem 1.5rem",
    marginRight: "15px",
    overflow: "visible",
    borderRadius: ".5rem",
    display: "flex",
    justifyContent: "left",
    "& .MuiTab-wrapper": {
      width: "auto"
    }
  },
  activeTab: {
    backgroundColor: "#f4f6f9",
    "&::before": {
      content: "''",
      display: "block",
      width: 20,
      height: 20,
      backgroundColor: "#f4f6f9",
      position: "absolute",
      right: "-10px",
      transform: "rotate(45deg)"
    }
  },
  tabItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerS: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '24px',
    color: '#000E40'
  },
  typographyBlock: {
    textAlign: "left",
    textTransform: "none"
  },
  typographyTitle: {
    // color: "#50566a",
    color: "#000000",
    fontWeight: 500,
    fontSize: "1.1rem"
  },
  typographyDeswcription: {
    color: "#959cb6"
  },
  mapButton: {
    backgroundColor: "#1dc9b7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#18a899"
    }
  },
  headerText: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#434349"
  },
  drawerContentContainer: {
    padding: "32.5px"
  },
  drawerHeader: {
    marginBottom: "39px"
  },
  drawerHeaderText: {
    fontSize: "1.4rem",
    fontWeight: 500,
    color: "#48465b"
  },
  drawerHeaderButton: {
    color: "#5867dd",
    "&:hover": {
      color: "#2739c1",
      cursor: "pointer"
    }
  },
  AppBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    zIndex: 64
  },
  AccordionDetails: {
    padding: '0 0 12px 0'
  },
  helperText: {
    color: "#ff5252"
  },
  startButton: {
    borderRadius: 28,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  MapWidget: {
    position: "absolute",
    right: '20px',
    zIndex: 99
  },
  MapWidgetH: {
    height: 44,
    minWidth: 150
  }
})

const settingData = {
  unit: [
    { label: "Литр", value: "liter" },
    { label: "Килограмм", value: "kilogram" },
    { label: "Миллилитр", value: "milliliter" },
  ],
  currency: [
    { label: "Рубли", value: "rub" },
    { label: "USD", value: "usd" },
    { label: "Euro", value: "euro" },
  ],
  countShelf: [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
  ],
  countShelfValue: [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
  ]

}


class Goods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: ['panel1', 'panel2', 'panel3', 'panel4', 'panel5'],
      goods: []
    };
  }

  handleChange = panel => (event, isExpanded) => {
    let ar = [...this.state.expanded];
    if (ar.indexOf(panel) == -1) {
      ar.push(panel);
    } else {
      let arrr = ar.filter(item => item != panel);
      ar = arrr;
    }
    this.setState({ expanded: ar });
  }

  render() {

    const { classes } = this.props;
    return (
      <>
        <Formik
          key={'formikKey'}
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={{
            countShelf: 5,
            countShelfValue: 5,
          }}
          validate={values => {

            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            //enableLoading();
            // setSubmitting(true);
            setTimeout(() => {



            }, 500);
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty
          }) => (
            <form
              key={'formikKeyForm'}
              //noValidate={true}
              autoComplete="off"
              className="kt-form kt-portlet__body"
              onSubmit={handleSubmit}
            >
              <div className={'row nol mx-0'}>
                <div className={`tranz p-0 col-md-5 col-12`}>
                  <Accordion expanded={this.state.expanded.indexOf('panel1') > -1}
                    onChange={this.state.expanded.indexOf('panel1') == -1 ? this.handleChange('panel1') : ""}
                    className={''}
                    elevation={2}
                  >
                    <AccordionSummary expandIcon={
                      <IconButton className={'ExpandArrow'} onClick={this.handleChange('panel1')}>
                        <ExpandMoreIcon /></IconButton>
                    } >
                      <AccordionHead name={"Настройки полок"} numb={'2'} />
                    </AccordionSummary>
                    <AccordionDetails className={`flex-column px-0 pt-0`}>
                      <div className={'container-fluid'}>
                        <div className={'row'}>


                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              select
                              label="Кол-во полок"
                              variant="outlined"
                              className="minHeight70"
                              value={values.countShelf}
                              name="countShelf"
                              fullWidth
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.type && errors.type}
                              error={Boolean(touched.type && errors.type)}
                            >
                              {settingData.countShelf.map(option => (
                                <MenuItem
                                  key={option.value + "countShelf"}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              select
                              label="Кол-во секций на полке"
                              variant="outlined"
                              className="minHeight70"
                              value={values.countShelfValue}
                              name="countShelfValue"
                              fullWidth
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.type && errors.type}
                              error={Boolean(touched.type && errors.type)}
                            >
                              {settingData.countShelfValue.map(option => (
                                <MenuItem
                                  key={option.value + "countShelfValue"}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>




                        </div>
                      </div>

                    </AccordionDetails>
                  </Accordion>

                  <Accordion expanded={this.state.expanded.indexOf('panel2') > -1}
                    onChange={this.state.expanded.indexOf('panel2') == -1 ? this.handleChange('panel2') : ""}
                    className={''}
                    elevation={2}
                  >
                    <AccordionSummary expandIcon={
                      <IconButton className={'ExpandArrow'} onClick={this.handleChange('panel2')}>
                        <ExpandMoreIcon /></IconButton>
                    } >
                      <AccordionHead name={"Продукт/Ценник"} numb={'1'} />
                    </AccordionSummary>
                    <AccordionDetails className={`flex-column px-0 pt-0`}>
                      <div className={'container-fluid'}>
                        <div className={'row'}>
                          <div className="col-12 col-lg-9 col-xl-8 text-md-left px-0">
                            <TextField
                              variant="outlined"
                              label="Название продукта"
                              value={values.title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.title && errors.title}
                              error={Boolean(touched.title && errors.title)}
                              placeholder=""

                              name={'title'}
                              fullWidth
                              FormHelperTextProps={{ classes: { root: classes.helperText } }}
                              className={'minHeight70'}
                            />
                          </div>
                          <div className="col-12 pb-0 mt-1 mb-3 px-0">
                            <Typography className={`font-weight-bold ml-2 ml-md-0`}>Ценник продукта</Typography>
                          </div>

                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              variant="outlined"
                              label="Название продукта"
                              value={values.price}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.price && errors.price}
                              error={Boolean(touched.price && errors.price)}
                              name={'price'}
                              fullWidth
                              FormHelperTextProps={{ classes: { root: classes.helperText } }}
                              className={'minHeight70'}
                            />
                          </div>
                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              select
                              variant="outlined"
                              label="Валюта"
                              value={values.currency}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.currency && errors.currency}
                              error={Boolean(touched.currency && errors.currency)}
                              name={'currency'}
                              fullWidth
                              FormHelperTextProps={{ classes: { root: classes.helperText } }}
                              className={'minHeight70'}
                            >
                              {settingData.currency.map(option => (
                                <MenuItem
                                  key={option.value + "currency"}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>


                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              variant="outlined"
                              label="Объём"
                              value={values.volume}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.volume && errors.volume}
                              error={Boolean(touched.volume && errors.volume)}
                              name={'volume'}
                              fullWidth
                              FormHelperTextProps={{ classes: { root: classes.helperText } }}
                              className={'minHeight70'}
                            />
                          </div>
                          <div className="col-xl-6 px-0 pr-md-2">
                            <TextField
                              select
                              variant="outlined"
                              label="Единица измерения"
                              value={values.unit}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.unit && errors.unit}
                              error={Boolean(touched.unit && errors.unit)}
                              name={'unit'}
                              fullWidth
                              FormHelperTextProps={{ classes: { root: classes.helperText } }}
                              className={'minHeight70'}
                            >
                              {settingData.unit.map(option => (
                                <MenuItem
                                  key={option.value + "currency"}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>



                        </div>
                      </div>

                    </AccordionDetails>
                  </Accordion>

                </div>
                <div className={`tranz m-0 p-0 col-md-7 col-12`}>
                  <div className={'sticky-column'}>
                    {[...Array(values.countShelf)].map((x, i) => {
                      let proz = 100 / values.countShelf
                      proz = proz + "%"
                      return <div className="goodsShelfs">

                        {[...Array(values.countShelfValue)].map((x, i) =>
                          <div className="goods" style={{ "width": proz }}>
                            <div className="sticker"> <img src="/img/sticker.gif" /> </div>
                            <img src={toAbsoluteUrl("/img/EmptyGood.png")} />
                          </div>
                        )}

                      </div>
                    }

                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
}
export default injectIntl(connect(null, auth.actions)(withStyles(useStyles)(Goods)));


