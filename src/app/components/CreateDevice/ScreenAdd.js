import React, { useState, useEffect } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  makeStyles,
  Box,
  Button,
  Drawer,
  Switch,
  TextField,
  MenuItem,
  Hidden,
  Divider,
  FormControlLabel
} from "@material-ui/core";
import axios from "axios";
//import { createCampaing } from "../../utils/API";

import TitleTab from "./TitleTab";
import ThirdTab from "./ThirdTab";
import FourthTab from "./FourthTab";
import DevicesMap from "./map";
import "./default.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { Formik } from "formik";
import clsx from "clsx";
import { device_info, save_device_edit_add } from "../../crud/auth.crud";
import ScheduleSelector from "../../components/ScheduleSelector";

import AlbumViewTablet from "./AlbumViewTablet";
import AlbumViewDesktop from "./AlbumViewDesktop";
import AlbumViewMobile from "./AlbumViewMobile";

import ProgressLoader from "../ViewMedia/ProgressLoader";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
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
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  row: {
    position: "relative",
    padding: "9px 0 9px",
    minHeight: "70px",
    "&:hover": {
      backgroundColor: "#efefef"
    }
  },
  companyInfo: {
    paddingLeft: "3rem",
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center",
    cursor: "pointer"
  },
  companyName: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500
  },
  dataHeader: {
    fontSize: 12,
    color: "#888888"
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  }
}));

const ScreenAdd = props => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);
  const preSetCurrentTab = () => {
    if (id == undefined && currentTab + 1 == 3) {
      setCurrentTab(6);
    } else {
      setCurrentTab(currentTab + 1);
    }
  };
  const [hoursHelp, setHoursHelp] = useState(false);
  const [hoursHelp2, setHoursHelp2] = useState(1);

  const [boards, setBoards] = useState([]);
  const [isDrawerOpened, setDrawerState] = useState(false);
  const [duration, setDuration] = useState(5);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [options, setOptions] = useState(null);
  const [size, setSize] = useState([]);

  const [files, setFiles] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getBoardInfo();
  }, []);

  const preSetFiles = (files, board) => {
    const fil = Object.entries(files).map(([key, value]) => {
      if (files[key].length == 0) {
        if (key == "night_pause") {
          files[key][0] = {
            id: 0,
            title: "Файл по умолчанию",
            mime: "images/jpg",
            link:
              "pause" + board.resolutionX + "x" + board.resolutionY + ".jpg",
            path_url: "https://st.de4.ru/pauses/"
          };
        }
      }
    });
    setFiles(files);
    onUpdateWeek(board.days);
    onUpdateHours(board.hours);
  };
  const getBoardInfo = async () => {
    if (!id) return;
    try {
      let res = await device_info(id);
      setData(Object.assign(res.data.board, res.data.board_device));
      preSetFiles(res.data.board_files, res.data.board);
    } catch (err) {
      alert({ title: "Ошибка!", text: "Мы исправляем ошибку" });
      console.error(err);
    }
  };

  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };
  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const typeDevice = [
    { label: "Приставка", value: "player" },
    { label: "Телевизор", value: "tv" },
    { label: "Остановка", value: "bus_stop" }
  ];

  const vendorDevicePlayer = [
    { label: "SpinetiX", value: "SpinetiX" },
    { label: "BrightSign", value: "brightsign" },
    { label: "Iadea", value: "iadea" },
    { label: "Windows", value: "win" }
  ];
  const vendorDeviceTv = [
    { label: "Samsung", value: "samsung" },
    { label: "Lg", value: "lg" },
  ];
  const vendorDeviceBusStop = [
    { label: "Rostelecom", value: "rostelecom" }
  ];
  const regionDevice = [
    { label: "Нижегородская область", value: "NO" },
    { label: "Московская область", value: "MO" }
  ];
  const cityDevice = [
    { label: "Нижний Новгород", value: "NN" },
    { label: "Москва", value: "MSK" }
  ];
  const response_length_Device = [
    { label: "1", value: "1" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "60", value: "60" }
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
  const typeDisplay = [
    { label: "Билборд", value: "BB" },
    { label: "Суперсайт", value: "SS" },
    { label: "Ситиборд", value: "CB" },
    { label: "Скроллер", value: "SC" },
    { label: "Видеоэкран", value: "VS" }
  ];
  const sideDisplay = [
    { label: "A", value: "A" },
    { label: "B", value: "B" }
  ];
  const [week, setWeek] = useState(weekDevice);

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
  const [hours, setHours] = useState(hoursData);
  const onUpdateHours = e => {
    let hhh = e => {
      const hour = hours.map((item, j) => {
        if (e.includes(item.value)) {
          //if (item.value === e.target.value) {
          item.checked = !item.checked;
          return item;
        } else {
          return item;
        }
      });
      return hour;
    };
    setHours(hhh(e));
  };
  const onUpdateWeek = e => {
    let hhh = e => {
      const wee = week.map((item, j) => {
        if (e.includes(item.value)) {
          item.checked = !item.checked;
          return item;
        } else {
          return item;
        }
      });
      return wee;
    };
    setWeek(hhh(e));
  };
  const [data, setData] = useState({
    title: "",
    description: "",
    width: "",
    height: "",
    resolutionX: "",
    resolutionY: "",
    type: "",
    vendor: "",
    lat: "",
    lng: "",
    region: "",
    city: "",
    response_length: "",
    activeCustomer: 0,
    activeYandex: 0,
    model: "",
    ip: "",
    hour0_cost: "",
    hour1_cost: "",
    hour2_cost: "",
    hour3_cost: "",
    hour4_cost: "",
    hour5_cost: "",
    hour6_cost: "",
    hour7_cost: "",
    hour8_cost: "",
    hour9_cost: "",
    hour10_cost: "",
    hour11_cost: "",
    hour12_cost: "",
    hour13_cost: "",
    hour14_cost: "",
    hour15_cost: "",
    hour16_cost: "",
    hour17_cost: "",
    hour18_cost: "",
    hour19_cost: "",
    hour20_cost: "",
    hour21_cost: "",
    hour22_cost: "",
    hour23_cost: "",
    tvserial: "",
    typeD: "",
    side: "",
    address: ""
  });

  const alert = data => {
    Swal.fire({
      title: data.title,
      timer: 3000,
      text: data.text
    });
  };
  const [uploadProgress, updateUploadProgress] = useState(0);
  const [uploadGo, setUploadGo] = useState(false);

  let fileInput = null;
  const triggerInputFile = () => fileInput.click();

  let fileInput2 = null;
  const triggerInputFile2 = () => fileInput2.click();

  let fileInput3 = null;
  const triggerInputFile3 = () => fileInput3.click();

  const handleChangeFile = (file, type) => {
    // let file = event.target.files[0]
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        uploadNewFile(file, type);
        //setImgUrl([...imgUrl, image.src]);
      };
    } else {
      uploadNewFile(file, type);
    }
  };
  const uploadNewFile = (file, type) => {
    let formData = new FormData();
    formData.append("file", file);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    setUploadGo(true);
    const options = {
      onUploadProgress: (ev) => {
        const progress = (ev.loaded / ev.total) * 100;
        updateUploadProgress(Math.round(progress));
      }
    };
    axios
      .post(
        `/creative/upload-board-files?subuser=${currentUser.id}&board_id=${id}&type=${type}`,
        formData,
        options
      )
      .then(res => {
        setUploadGo(false);
        alert({ title: "Файл загружен!" });
        //window.scrollTo(0, 0);
        getBoardInfo();
        //props.setPictures(res.data.file);
        //addNewFile(res.data.file);
      })
      .catch(error => {
        setUploadGo(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Устройство</h3>
          </div>
        </div>
      </div>

      <Grid>
        <Paper>
          <Grid className="kt-grid kt-wizard-v2 kt-wizard-v2--white">
            <Grid className="kt-grid__item kt-wizard-v2__aside">
              <div className="kt-wizard-v2__nav">
                <div className="kt-wizard-v2__nav-items kt-wizard-v2__nav-items--clickable">
                  <div
                    className="kt-wizard-v2__nav-item"
                    data-ktwizard-state={currentTab === 1 ? "current" : ""}
                    onClick={setCurrentTab.bind(null, 1)}
                  >
                    <div className="kt-wizard-v2__nav-body">
                      <div className="kt-wizard-v2__nav-icon">
                        <i
                          className={`flaticon-list ${
                            currentTab === 1 ? `sidebarIconActive` : ""
                          }`}
                        ></i>
                      </div>
                      <div className="kt-wizard-v2__nav-label">
                        <div className="kt-wizard-v2__nav-label-title">
                          Общая информация
                        </div>
                        <div className="kt-wizard-v2__nav-label-desc">
                          Дата, Дни недели, Часы
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="kt-wizard-v2__nav-item"
                    data-ktwizard-state={currentTab === 2 ? "current" : ""}
                    onClick={() => setCurrentTab(2)}
                  >
                    <div className="kt-wizard-v2__nav-body">
                      <div className="kt-wizard-v2__nav-icon">
                        <i
                          className={`flaticon2-pin-1 ${
                            currentTab === 2 ? `sidebarIconActive` : ""
                          }`}
                        ></i>
                      </div>
                      <div className="kt-wizard-v2__nav-label">
                        <div className="kt-wizard-v2__nav-label-title">
                          Укажите локацию
                        </div>
                        <div className="kt-wizard-v2__nav-label-desc">
                          Координаты, Направление
                        </div>
                      </div>
                    </div>
                  </div>

                  {id !== undefined && (
                    <>
                      <div
                        className="kt-wizard-v2__nav-item"
                        data-ktwizard-state={currentTab === 3 ? "current" : ""}
                        onClick={() => setCurrentTab(3)}
                      >
                        <div className="kt-wizard-v2__nav-body">
                          <div className="kt-wizard-v2__nav-icon">
                            <i
                              className={`flaticon-photo-camera ${
                                currentTab === 3 ? `sidebarIconActive` : ""
                              }`}
                            ></i>
                          </div>
                          <div className="kt-wizard-v2__nav-label">
                            <div className="kt-wizard-v2__nav-label-title">
                              Фото экрана
                            </div>
                            <div className="kt-wizard-v2__nav-label-desc">
                              Фото, Изображение экрана
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="kt-wizard-v2__nav-item"
                        data-ktwizard-state={currentTab === 4 ? "current" : ""}
                        onClick={() => setCurrentTab(4)}
                      >
                        <div className="kt-wizard-v2__nav-body">
                          <div className="kt-wizard-v2__nav-icon">
                            <i
                              className={`fa fa-minus ${
                                currentTab === 4 ? `sidebarIconActive` : ""
                              }`}
                            ></i>
                          </div>
                          <div className="kt-wizard-v2__nav-label">
                            <div className="kt-wizard-v2__nav-label-title">
                              Файлы заглушек
                            </div>
                            <div className="kt-wizard-v2__nav-label-desc">
                              Фото, Видео
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="kt-wizard-v2__nav-item"
                        data-ktwizard-state={currentTab === 5 ? "current" : ""}
                        onClick={() => setCurrentTab(5)}
                      >
                        <div className="kt-wizard-v2__nav-body">
                          <div className="kt-wizard-v2__nav-icon">
                            <i
                              className={`fa fa-moon ${
                                currentTab === 5 ? `sidebarIconActive` : ""
                              }`}
                            ></i>
                          </div>
                          <div className="kt-wizard-v2__nav-label">
                            <div className="kt-wizard-v2__nav-label-title">
                              Файл ночной заглушек
                            </div>
                            <div className="kt-wizard-v2__nav-label-desc">
                              Фото, Видео
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className="kt-wizard-v2__nav-item"
                    data-ktwizard-state={currentTab === 6 ? "current" : ""}
                    onClick={() => setCurrentTab(6)}
                  >
                    <div className="kt-wizard-v2__nav-body">
                      <div className="kt-wizard-v2__nav-icon">
                        <i
                          className={`fa fa-credit-card ${
                            currentTab === 6 ? `sidebarIconActive` : ""
                          }`}
                        ></i>
                      </div>
                      <div className="kt-wizard-v2__nav-label">
                        <div className="kt-wizard-v2__nav-label-title">
                          Стоимость секунды эфира
                        </div>
                        <div className="kt-wizard-v2__nav-label-desc">
                          Стоимость секунды каждого часа
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="kt-wizard-v2__nav-item"
                    data-ktwizard-state={currentTab === 7 ? "current" : ""}
                    onClick={() => setCurrentTab(7)}
                  >
                    <div className="kt-wizard-v2__nav-body">
                      <div className="kt-wizard-v2__nav-icon">
                        <i
                          className={`fa fa-list ${
                            currentTab === 7 ? `sidebarIconActive` : ""
                          }`}
                        ></i>
                      </div>
                      <div className="kt-wizard-v2__nav-label">
                        <div className="kt-wizard-v2__nav-label-title">
                          Дополнительные настройки
                        </div>
                        <div className="kt-wizard-v2__nav-label-desc">
                          Яндекс, доступность, сервер
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid className="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper">
              <Formik
                validateOnChange={true}
                enableReinitialize={true}
                initialValues={{
                  title: data.title,
                  description: data.description,
                  width: data.width,
                  height: data.height,
                  resolutionX: data.resolutionX,
                  resolutionY: data.resolutionY,
                  type: data.type,
                  vendor: data.vendor,
                  model: data.model,
                  ip: data.ip,
                  lat: data.lat,
                  lng: data.lng,
                  days: [],
                  hours: [],
                  region: data.region,
                  city: data.city,
                  response_length: data.response_length,
                  activeCustomer: data.activeCustomer,
                  activeYandex: data.activeYandex,
                  yandex_page: data.yandex_page,
                  yandex_id: data.yandex_id,
                  hour0_cost: data.hour0_cost,
                  hour1_cost: data.hour1_cost,
                  hour2_cost: data.hour2_cost,
                  hour3_cost: data.hour3_cost,
                  hour4_cost: data.hour4_cost,
                  hour5_cost: data.hour5_cost,
                  hour6_cost: data.hour6_cost,
                  hour7_cost: data.hour7_cost,
                  hour8_cost: data.hour8_cost,
                  hour9_cost: data.hour9_cost,
                  hour10_cost: data.hour10_cost,
                  hour11_cost: data.hour11_cost,
                  hour12_cost: data.hour12_cost,
                  hour13_cost: data.hour13_cost,
                  hour14_cost: data.hour14_cost,
                  hour15_cost: data.hour15_cost,
                  hour16_cost: data.hour16_cost,
                  hour17_cost: data.hour17_cost,
                  hour18_cost: data.hour18_cost,
                  hour19_cost: data.hour19_cost,
                  hour20_cost: data.hour20_cost,
                  hour21_cost: data.hour21_cost,
                  hour22_cost: data.hour22_cost,
                  hour23_cost: data.hour23_cost,
                  tvserial: data.tvserial,
                  typeD: data.typeD,
                  side: data.side,
                  address: data.address
                }}
                validate={values => {
                  values.hours = [];
                  hours.map((item, j) => {
                    if (item.checked) {
                      values.hours.push(item.value);
                    }
                  });

                  values.days = [];
                  week.map((item, j) => {
                    if (item.checked) {
                      values.days.push(item.value);
                    }
                  });

                  let req = intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD"
                  });
                  const errors = {};

                  if (!values.title || values.title.length < 4) {
                    errors.title = `${req}, не менее 4 символов`;
                  }

                  if (
                    !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                      values.ip
                    )
                  ) {
                    errors.ip = "Неверный IP";
                  }
                  if (!values.ip) {
                    errors.ip = req;
                  }
                  if (!values.description) {
                    errors.description = req;
                  }
                  if (!values.width) {
                    errors.width = req;
                  }
                  if (!values.height) {
                    errors.height = req;
                  }
                  if (!values.resolutionX) {
                    errors.resolutionX = req;
                  }
                  if (!values.resolutionY) {
                    errors.resolutionY = req;
                  }
                  if (!values.model) {
                    errors.model = req;
                  }
                  if (!values.type) {
                    errors.type = req;
                  }
                  if (!values.vendor) {
                    errors.vendor = req;
                  }
                  if (!values.days.length) {
                    errors.days = "Укажите дни";
                  }
                  if (!values.hours.length) {
                    errors.hours = "Укажите часы";
                  }
                  return errors;
                }}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                  enableLoading();
                  setTimeout(() => {
                    save_device_edit_add(id, values)
                      .then(({ data: { status, error } }) => {
                        if (status === "fail") {
                          setSubmitting(false);
                          var error_data = "";
                          Object.entries(error).map(([key, value]) => {
                            error_data += value;
                          });
                          alert({
                            title: "Ошибка, не сохранено",
                            text: error_data
                          });
                        } else {
                          alert({ title: "Cохранено" });
                          setTimeout(() => {
                            props.history.push(`/myboards`);
                          }, 2000);
                        }
                        disableLoading();
                      })
                      .catch(err => {
                        disableLoading();
                        setSubmitting(false);
                        alert({ title: "Ошибка, не сохранено" });
                      });
                  }, 1000);
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
                  radio
                }) => (
                  <form
                    //noValidate={true}
                    autoComplete="off"
                    className="kt-form kt-portlet__body"
                    onSubmit={handleSubmit}
                  >
                    <div className="kt-section kt-section--first">
                      {currentTab === 1 && (
                        <div
                          className="kt-section__body"
                          style={{ maxWidth: "500px" }}
                        >
                          <div className="kt-heading kt-heading--sm">

                          </div>
                          <div className="form-group">
                            <TextField
                              className="form-control form-control-lg"
                              label="Название"
                              size="small"
                              variant="outlined"
                              value={values.title}
                              name="title"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={touched.title && errors.title}
                              error={Boolean(touched.title && errors.title)}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              className="w-100"
                              label="Описание"
                              multiline
                              size="small"
                              rows={3}
                              value={values.description}
                              variant="outlined"
                              name="description"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              helperText={
                                touched.description && errors.description
                              }
                              error={Boolean(
                                touched.description && errors.description
                              )}
                            />
                          </div>

                          <div className="row">
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                  className="form-control form-control-lg"
                                  label="Ширина в см1111"
                                  size="small"
                                  variant="outlined"
                                  value={values.width}
                                  name="width"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.width && errors.width}
                                  error={Boolean(touched.width && errors.width)}
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
                                  value={values.height}
                                  name="height"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.height && errors.height}
                                  error={Boolean(
                                    touched.height && errors.height
                                  )}
                                />
                              </div>
                            </div>
                          </div>


                          <div className="row">
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                    id="outlined-select-type"
                                    select
                                    label="Тип экрана"
                                    className="minHeight70"
                                    value={values.typeD}
                                    size="small"
                                    variant="outlined"
                                    name="typeD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={touched.typeD && errors.typeD}
                                    error={Boolean(touched.typeD && errors.typeD)}
                                >
                                  {typeDisplay.map(option => (
                                      <MenuItem
                                          key={option.value}
                                          value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                    id="outlined-select-vendor"
                                    select
                                    label="Сторона"
                                    className="w-100"
                                    value={values.side}
                                    size="small"
                                    variant="outlined"
                                    name="side"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={touched.side && errors.side}
                                    error={Boolean(
                                        touched.side && errors.side
                                    )}
                                >
                                  {sideDisplay.map(option => (
                                      <MenuItem
                                          key={option.value}
                                          value={option.value}
                                      >
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
                                  label="Разрешение по ширине (px)"
                                  size="small"
                                  variant="outlined"
                                  value={values.resolutionX}
                                  name="resolutionX"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={
                                    touched.resolutionX && errors.resolutionX
                                  }
                                  error={Boolean(
                                    touched.resolutionX && errors.resolutionX
                                  )}
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
                                  value={values.resolutionY}
                                  name="resolutionY"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={
                                    touched.resolutionY && errors.resolutionY
                                  }
                                  error={Boolean(
                                    touched.resolutionY && errors.resolutionY
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                  id="outlined-select-type"
                                  select
                                  label="Тип устройства"
                                  className=" w-100"
                                  value={values.type}
                                  size="small"
                                  variant="outlined"
                                  name="type"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.type && errors.type}
                                  error={Boolean(touched.type && errors.type)}
                                >
                                  {typeDevice.map(option => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                  id="outlined-select-vendor"
                                  select
                                  label="Производитель"
                                  className=" w-100"
                                  value={values.vendor}
                                  size="small"
                                  variant="outlined"
                                  name="vendor"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.vendor && errors.vendor}
                                  error={Boolean(
                                    touched.vendor && errors.vendor
                                  )}
                                >
                                  {vendorDevicePlayer.map(option => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
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
                                  value={values.model}
                                  name="model"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.model && errors.model}
                                  error={Boolean(touched.model && errors.model)}
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
                                  value={values.ip}
                                  name="ip"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={touched.ip && errors.ip}
                                  error={Boolean(touched.ip && errors.ip)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                  className="form-control form-control-lg"
                                  label="TV серийный номер"
                                  size="small"
                                  variant="outlined"
                                  value={values.tvserial}
                                  name="tvserial"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={
                                    touched.tvserial && errors.tvserial
                                  }
                                  error={Boolean(
                                    touched.tvserial && errors.tvserial
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <label className="mb-2">Рабочие дни</label>
                          <div className="form-group Mui-error">
                            <ScheduleSelector
                              selection={week}
                              error={errors.days}
                              onChange={e => onUpdateWeek([e.target.value])}
                            />
                          </div>
                          <label className="mb-2">Рабочие часы</label>
                          <div className="form-group">
                            <ScheduleSelector
                              selection={hours}
                              error={errors.hours}
                              onChange={e => onUpdateHours([e.target.value])}
                            />
                          </div>
                        </div>
                      )}
                      {currentTab === 2 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--sm">
                            Расположение экрана
                          </div>
                          <div className="form-group">
                            <DevicesMap setData={setData} data={values} />
                          </div>

                          <div className="row">
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                  className="form-control form-control-lg"
                                  label="Широта"
                                  size="small"
                                  variant="outlined"
                                  value={values.lat}
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
                                  label="Долгота"
                                  size="small"
                                  variant="outlined"
                                  value={values.lng}
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
                                    label="Регион"
                                    select
                                    size="small"
                                    variant="outlined"
                                    value={values.region}
                                    name="region"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={touched.region && errors.region}
                                    error={Boolean(
                                        touched.region && errors.region
                                    )}
                                >
                                  {regionDevice.map(option => (
                                      <MenuItem
                                          key={option.value}
                                          value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="form-group">
                                <TextField
                                    className="form-control form-control-lg"
                                    label="Город"
                                    select
                                    size="small"
                                    variant="outlined"
                                    value={values.city}
                                    name="city"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={touched.city && errors.city}
                                    error={Boolean(touched.city && errors.city)}
                                >
                                  {cityDevice.map(option => (
                                      <MenuItem
                                          key={option.value}
                                          value={option.value}
                                      >
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
                                    className="w-100"
                                    label="Адрес"
                                    multiline
                                    size="small"
                                    rows={3}
                                    value={values.address}
                                    variant="outlined"
                                    name="address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={
                                      touched.address && errors.address
                                    }
                                    error={Boolean(
                                        touched.address && errors.address
                                    )}
                                />
                              </div>
                            </div>1111
                          </div>

                        </div>
                      )}

                      {currentTab === 3 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--sm">
                            Загрузите фото экрана
                          </div>

                          <div className="alert alert-secondary" role="alert">
                            <div className="alert-icon">
                              <i className="flaticon-warning"></i>
                            </div>
                            <div className="alert-text font-weight-bold">
                              <span className="text-muted">
                                Максимальный размер файла 30MB
                              </span>
                              <span className="form-text text-muted">
                                Максимум 15 файлов
                              </span>
                            </div>
                            <div className="d-flex flex-column">
                              <a
                                    className="btn btn-secondary btn-sm btn-bold btn-font-md"
                                    onClick={triggerInputFile3}
                                >
                                <i className="flaticon2-plus"></i>
                                Загрузить фото
                              </a>
                              <input
                                  style={{
                                    opacity: "0",
                                    width: "0.5px",
                                    height: "0.5px"
                                  }}
                                  type="file"
                                  ref={input => (fileInput3 = input)}
                                  accept=".mp4, .jpg, .jpeg"
                                  onChange={e =>
                                      handleChangeFile(e.target.files[0], 2)
                                  }
                              />
                            </div>
                          </div>

                          {!!uploadGo && (
                            <>
                              <Grid
                                container
                                className="justify-content-center"
                              >
                                <Grid
                                  item
                                  md={7}
                                  classes={{ root: classes.dataContainer }}
                                >
                                  <ProgressLoader progress={uploadProgress} />
                                </Grid>
                              </Grid>
                              <Divider />
                            </>
                          )}

                          <div className="form-group">
                            {!!files &&
                              !!files.photo &&
                              files.photo.map(option => (
                                <Box>
                                  <Hidden only={["xs", "sm"]}>
                                    <AlbumViewDesktop
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "xs"]}>
                                    <AlbumViewTablet
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "sm"]}>
                                    <AlbumViewMobile
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Divider />
                                </Box>
                              ))}
                          </div>
                        </div>
                      )}

                      {currentTab === 4 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--sm">
                            Загрузите заглушки
                          </div>

                          <div className="form-group mb-0">
                            <a
                              className="dropzone-select btn btn-label-brand btn-bold dz-clickable"
                              onClick={triggerInputFile}
                            >
                              Загрузить файл
                            </a>
                          </div>
                          <input
                            style={{
                              opacity: "0",
                              width: "0.5px",
                              height: "0.5px"
                            }}
                            type="file"
                            ref={input => (fileInput = input)}
                            accept=".mp4, .jpg, .jpeg"
                            onChange={e =>
                              handleChangeFile(e.target.files[0], 3)
                            }
                          />
                          <div className="alert alert-secondary" role="alert">
                            <div className="alert-icon">
                              <i className="flaticon-warning"></i>
                            </div>
                            <div className="alert-text font-weight-bold">
                              <span className="text-muted">
                                Максимальный размер файла 30MB
                              </span>
                              <span className="form-text text-muted">
                                Максимум 15 файлов
                              </span>
                              <span className="form-text text-muted">
                                Разрешение {values.resolutionX}x
                                {values.resolutionY}
                              </span>
                            </div>
                          </div>

                          {!!uploadGo && (
                            <>
                              <Grid
                                container
                                className="justify-content-center"
                              >
                                <Grid
                                  item
                                  md={7}
                                  classes={{ root: classes.dataContainer }}
                                >
                                  <ProgressLoader progress={uploadProgress} />
                                </Grid>
                              </Grid>
                              <Divider />
                            </>
                          )}

                          <div className="form-group">
                            {!!files &&
                              !!files.pause &&
                              files.pause.map(option => (
                                <Box>
                                  <Hidden only={["xs", "sm"]}>
                                    <AlbumViewDesktop
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "xs"]}>
                                    <AlbumViewTablet
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "sm"]}>
                                    <AlbumViewMobile
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Divider />
                                </Box>
                              ))}
                          </div>
                        </div>
                      )}

                      {currentTab === 5 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--sm">
                            Загрузите ночную заглушку
                          </div>

                          <div className="form-group mb-0">
                            <a
                              className="btn btn-label-brand btn-bold"
                              onClick={triggerInputFile2}
                            >
                              Загрузить файл
                            </a>
                          </div>
                          <input
                            style={{
                              opacity: "0",
                              width: "0.5px",
                              height: "0.5px"
                            }}
                            type="file"
                            ref={input => (fileInput2 = input)}
                            accept=".mp4, .jpg, .jpeg"
                            onChange={e =>
                              handleChangeFile(e.target.files[0], 4)
                            }
                          />
                          <div className="alert alert-secondary" role="alert">
                            <div className="alert-icon">
                              <i className="flaticon-warning"></i>
                            </div>
                            <div className="alert-text font-weight-bold">
                              <span className="text-muted">
                                Максимальный размер файла 30MB
                              </span>
                              <span className="form-text text-muted">
                                Максимум 15 файлов
                              </span>
                              <span className="form-text text-muted">
                                Разрешение {values.resolutionX}x
                                {values.resolutionY}
                              </span>
                            </div>
                          </div>

                          {!!uploadGo && (
                            <>
                              <Grid
                                container
                                className="justify-content-center"
                              >
                                <Grid
                                  item
                                  md={7}
                                  classes={{ root: classes.dataContainer }}
                                >
                                  <ProgressLoader progress={uploadProgress} />
                                </Grid>
                              </Grid>
                              <Divider />
                            </>
                          )}

                          <div className="form-group">
                            {!!files &&
                              !!files.night_pause &&
                              files.night_pause.map(option => (
                                <Box>
                                  <Hidden only={["xs", "sm"]}>
                                    <AlbumViewDesktop
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "xs"]}>
                                    <AlbumViewTablet
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Hidden only={["md", "lg", "xl", "sm"]}>
                                    <AlbumViewMobile
                                      classes={classes}
                                      option={option}
                                      getBoardInfo={getBoardInfo}
                                    />
                                  </Hidden>
                                  <Divider />
                                </Box>
                              ))}
                          </div>
                        </div>
                      )}

                      {currentTab === 6 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--sm">
                            Установите стоимость секунды
                          </div>

                          <div className="row">
                            <div className="col-xl-12">
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={hoursHelp}
                                    onChange={() => setHoursHelp(!hoursHelp)}
                                    color="primary"
                                    inputProps={{
                                      "aria-label": "primary checkbox"
                                    }}
                                  />
                                }
                                label="Установить единую цену"
                                labelPlacement="end"
                              />
                            </div>
                            {!!hoursHelp && (
                              <div className="col-xl-3 mb-4">
                                <TextField
                                  className="form-control form-control-lg"
                                  label="Общая цена"
                                  size="small"
                                  variant="outlined"
                                  value={hoursHelp2}
                                  name="hour2_cost"
                                  onBlur={handleBlur}
                                  onChange={e => {
                                    let cc = e.target.value;
                                    setHoursHelp2(cc);
                                    //values.hour0_cost = cc;
                                   // data.hour1_cost = cc;
                                    setData({...data,
                                      hour0_cost: cc,
                                      hour1_cost: cc,
                                      hour2_cost: cc,
                                      hour3_cost: cc,
                                      hour4_cost: cc,
                                      hour5_cost: cc,
                                      hour6_cost: cc,
                                      hour7_cost: cc,
                                      hour8_cost: cc,
                                      hour9_cost: cc,
                                      hour10_cost: cc,
                                      hour11_cost: cc,
                                      hour12_cost: cc,
                                      hour13_cost: cc,
                                      hour14_cost: cc,
                                      hour15_cost: cc,
                                      hour16_cost: cc,
                                      hour17_cost: cc,
                                      hour18_cost: cc,
                                      hour19_cost: cc,
                                      hour20_cost: cc,
                                      hour21_cost: cc,
                                      hour22_cost: cc,
                                      hour23_cost: cc,
                                    })
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="row">
                            <div className="col-xl-3">
                              <TextField
                                className="form-control form-control-lg"
                                label="00-01"
                                size="small"
                                variant="outlined"
                                value={values.hour0_cost}
                                name="hour0_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour0_cost && errors.hour0_cost
                                }
                                error={Boolean(
                                  touched.hour0_cost && errors.hour0_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3">
                              <TextField
                                className="form-control form-control-lg"
                                label="01-02"
                                size="small"
                                variant="outlined"
                                value={values.hour1_cost}
                                name="hour1_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour1_cost && errors.hour1_cost
                                }
                                error={Boolean(
                                  touched.hour1_cost && errors.hour1_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3">
                              <TextField
                                className="form-control form-control-lg"
                                label="02-03"
                                size="small"
                                variant="outlined"
                                value={values.hour2_cost}
                                name="hour2_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour2_cost && errors.hour2_cost
                                }
                                error={Boolean(
                                  touched.hour2_cost && errors.hour2_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="03-04"
                                size="small"
                                variant="outlined"
                                value={values.hour3_cost}
                                name="hour3_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour3_cost && errors.hour3_cost
                                }
                                error={Boolean(
                                  touched.hour3_cost && errors.hour3_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="04-05"
                                size="small"
                                variant="outlined"
                                value={values.hour4_cost}
                                name="hour4_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour4_cost && errors.hour4_cost
                                }
                                error={Boolean(
                                  touched.hour4_cost && errors.hour4_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="05-06"
                                size="small"
                                variant="outlined"
                                value={values.hour5_cost}
                                name="hour5_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour5_cost && errors.hour5_cost
                                }
                                error={Boolean(
                                  touched.hour5_cost && errors.hour5_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="06-07"
                                size="small"
                                variant="outlined"
                                value={values.hour6_cost}
                                name="hour6_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour6_cost && errors.hour6_cost
                                }
                                error={Boolean(
                                  touched.hour6_cost && errors.hour6_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="07-08"
                                size="small"
                                variant="outlined"
                                value={values.hour7_cost}
                                name="hour7_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour7_cost && errors.hour7_cost
                                }
                                error={Boolean(
                                  touched.hour7_cost && errors.hour7_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="08-09"
                                size="small"
                                variant="outlined"
                                value={values.hour8_cost}
                                name="hour8_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour8_cost && errors.hour8_cost
                                }
                                error={Boolean(
                                  touched.hour8_cost && errors.hour8_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="09-10"
                                size="small"
                                variant="outlined"
                                value={values.hour9_cost}
                                name="hour9_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour9_cost && errors.hour9_cost
                                }
                                error={Boolean(
                                  touched.hour9_cost && errors.hour9_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="10-11"
                                size="small"
                                variant="outlined"
                                value={values.hour10_cost}
                                name="hour10_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour10_cost && errors.hour10_cost
                                }
                                error={Boolean(
                                  touched.hour10_cost && errors.hour10_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="11-12"
                                size="small"
                                variant="outlined"
                                value={values.hour11_cost}
                                name="hour11_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour11_cost && errors.hour11_cost
                                }
                                error={Boolean(
                                  touched.hour11_cost && errors.hour11_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="12-13"
                                size="small"
                                variant="outlined"
                                value={values.hour12_cost}
                                name="hour12_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour12_cost && errors.hour12_cost
                                }
                                error={Boolean(
                                  touched.hour12_cost && errors.hour12_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="13-14"
                                size="small"
                                variant="outlined"
                                value={values.hour13_cost}
                                name="hour13_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour13_cost && errors.hour13_cost
                                }
                                error={Boolean(
                                  touched.hour13_cost && errors.hour13_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="14-15"
                                size="small"
                                variant="outlined"
                                value={values.hour14_cost}
                                name="hour14_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour14_cost && errors.hour14_cost
                                }
                                error={Boolean(
                                  touched.hour14_cost && errors.hour14_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="15-16"
                                size="small"
                                variant="outlined"
                                value={values.hour15_cost}
                                name="hour15_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour15_cost && errors.hour15_cost
                                }
                                error={Boolean(
                                  touched.hour15_cost && errors.hour15_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="16-17"
                                size="small"
                                variant="outlined"
                                value={values.hour16_cost}
                                name="hour16_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour16_cost && errors.hour16_cost
                                }
                                error={Boolean(
                                  touched.hour16_cost && errors.hour16_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="17-18"
                                size="small"
                                variant="outlined"
                                value={values.hour17_cost}
                                name="hour17_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour17_cost && errors.hour17_cost
                                }
                                error={Boolean(
                                  touched.hour17_cost && errors.hour17_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="18-19"
                                size="small"
                                variant="outlined"
                                value={values.hour18_cost}
                                name="hour18_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour18_cost && errors.hour18_cost
                                }
                                error={Boolean(
                                  touched.hour18_cost && errors.hour18_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="19-20"
                                size="small"
                                variant="outlined"
                                value={values.hour19_cost}
                                name="hour19_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour19_cost && errors.hour19_cost
                                }
                                error={Boolean(
                                  touched.hour19_cost && errors.hour19_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="20-21"
                                size="small"
                                variant="outlined"
                                value={values.hour20_cost}
                                name="hour20_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour20_cost && errors.hour20_cost
                                }
                                error={Boolean(
                                  touched.hour20_cost && errors.hour20_cost
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="21-22"
                                size="small"
                                variant="outlined"
                                value={values.hour21_cost}
                                name="hour21_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour21_cost && errors.hour21_cost
                                }
                                error={Boolean(
                                  touched.hour21_cost && errors.hour21_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="22-23"
                                size="small"
                                variant="outlined"
                                value={values.hour22_cost}
                                name="hour22_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour22_cost && errors.hour22_cost
                                }
                                error={Boolean(
                                  touched.hour22_cost && errors.hour22_cost
                                )}
                              />
                            </div>
                            <div className="col-xl-3 mt-4">
                              <TextField
                                className="form-control form-control-lg"
                                label="23-24"
                                size="small"
                                variant="outlined"
                                value={values.hour23_cost}
                                name="hour23_cost"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={
                                  touched.hour23_cost && errors.hour23_cost
                                }
                                error={Boolean(
                                  touched.hour23_cost && errors.hour23_cost
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentTab === 7 && (
                        <div className="kt-section__body">
                          <div className="kt-heading kt-heading--xs">
                            Дополнительные настройки экрана
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <TextField
                                  id="outlined-select-type"
                                  select
                                  label="Длина медиаплана"
                                  className=" w-100"
                                  value={values.response_length}
                                  size="small"
                                  variant="outlined"
                                  name="response_length"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  helperText={
                                    touched.response_length &&
                                    errors.response_length
                                  }
                                  error={Boolean(
                                    touched.response_length &&
                                      errors.response_length
                                  )}
                                >
                                  {response_length_Device.map(option => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={values.activeCustomer}
                                      onChange={handleChange}
                                      color="primary"
                                      name="activeCustomer"
                                      inputProps={{
                                        "aria-label": "primary checkbox"
                                      }}
                                    />
                                  }
                                  label="Сделать видимым"
                                  labelPlacement="end"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={values.activeYandex}
                                      onChange={handleChange}
                                      color="primary"
                                      name="activeYandex"
                                      inputProps={{
                                        "aria-label": "primary checkbox"
                                      }}
                                    />
                                  }
                                  label="Yandex"
                                  labelPlacement="end"
                                />
                              </div>
                            </div>
                          </div>

                          {!!values.activeYandex && (
                            <div className="row">
                              <div className="col-md-3">
                                <div className="form-group">
                                  <TextField
                                    className="form-control form-control-lg"
                                    label="ID в системе Yandex"
                                    size="small"
                                    variant="outlined"
                                    value={values.yandex_id}
                                    name="yandex_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={
                                      touched.yandex_id && errors.yandex_id
                                    }
                                    error={Boolean(
                                      touched.yandex_id && errors.yandex_id
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <TextField
                                    className="form-control form-control-lg"
                                    label="Page ID в системе Yandex"
                                    size="small"
                                    variant="outlined"
                                    value={values.yandex_page}
                                    name="yandex_page"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={
                                      touched.yandex_page && errors.yandex_page
                                    }
                                    error={Boolean(
                                      touched.yandex_page && errors.yandex_page
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Grid>
                      {((!!values.title &&
                        values.title.length > 3 &&
                        currentTab === 1 &&
                        !!values.description &&
                        !!values.width &&
                        !!values.height &&
                        !!values.resolutionX &&
                        !!values.resolutionY &&
                        !!values.type &&
                        !!values.vendor &&
                        values.model &&
                        !!values.ip &&
                        week.length &&
                        hours.length) ||
                        (currentTab === 2 &&
                          !!values.lat &&
                          !!values.lng &&
                          !!values.region &&
                          !!values.city) ||
                        currentTab === 3 ||
                        currentTab === 4 ||
                        currentTab === 5 ||
                        (currentTab === 6 &&
                          !!values.hour0_cost &&
                          !!values.hour1_cost &&
                          !!values.hour2_cost &&
                          !!values.hour3_cost &&
                          !!values.hour4_cost &&
                          !!values.hour5_cost &&
                          !!values.hour6_cost &&
                          !!values.hour7_cost &&
                          !!values.hour8_cost &&
                          !!values.hour9_cost &&
                          !!values.hour10_cost &&
                          !!values.hour11_cost &&
                          !!values.hour12_cost &&
                          !!values.hour13_cost &&
                          !!values.hour14_cost &&
                          !!values.hour15_cost &&
                          !!values.hour16_cost &&
                          !!values.hour17_cost &&
                          !!values.hour18_cost &&
                          !!values.hour19_cost &&
                          !!values.hour20_cost &&
                          !!values.hour21_cost &&
                          !!values.hour22_cost &&
                          !!values.hour23_cost)) && (
                        <Grid>
                          <a
                            className="btn btn-bold btn-label-brand btn-wide"
                            onClick={() => preSetCurrentTab()}
                          >
                            Далее
                          </a>
                        </Grid>
                      )}
                    </Grid>

                    {currentTab === 7 && (
                      <button
                        type="submit"
                        className="btn btn-primary btn-elevate kt-login__btn-primary"
                      >
                        Сохранить
                      </button>
                    )}
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default injectIntl(connect(null, auth.actions)(ScreenAdd));
