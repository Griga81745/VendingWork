import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles, useTheme,
  Typography,
  Box, Divider,
  Button, AppBar, Tabs, Paper, Tab as TabM, Collapse
} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';

import Goods from "./GoodsTabs/Goods";
import Media from "./Media";
import Screens from "./Screens";
import Statistic from "./Statistic";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
// import Swal from "sweetalert2";
import SlideItemDesktop from "./SlideItemDesktop";
import LockIcon from '@material-ui/icons/Lock';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import CreateIcon from '@material-ui/icons/Create';
// import Fab from "@material-ui/core/Fab";
import { onUpdateWeek } from "app/utils/index";

import "moment/locale/ru";
var moment = require("moment");

const useStyles = makeStyles((theme) => ({
  headContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 54,
    alignItems: "center",
    marginBottom: 25,
    padding: "0 25px",
    background: "linear-gradient(180deg, #f7f6f8, #ffffff)",
    marginTop: "-80px"
  },
  headTitle: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#434349",
    paddingRight: "12px",
    marginRight: "12px",
    borderRight: "1px solid #e7e8ef"
  },
  headData: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#959cb6"
  },
  infoContainerWraper: {
    backgroundColor: "white",
    padding: "0 20px",
    borderRadius: 4,
    marginBottom: 20
  },
  infoContainer: {
    backgroundColor: "white",
    padding: "13px 0",
    borderBottom: "1px solid #e7e8ef"
  },
  infoBlock: {
    display: "grid",
    gridTemplateColumns: "35px max-content",
    gridTemplateRows: "22px 22px",
    gridTemplateAreas: "'img title''img item'",
    gridColumnGap: "12px",
    padding: "13px 10px",
    overflow: "hidden"
  },
  infoBlockPhotoItem: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 35px)",
    gridTemplateRows: 35,
    gridColumnGap: "12px",
    padding: "13px 10px",
    alignItems: "baseline"
  },
  infoTitle: {
    gridArea: "title",
    color: "#595d6e",
    fontWeight: 600
  },
  infoItem: {
    gridArea: "item",
    color: "#48465b",
    fontWeight: 600,
    fontSize: "1.2rem"
  },
  infoBlockPhoto: {
    width: 35,
    height: 35
  },
  infoImg: {
    gridArea: "img",
    display: "block",
    color: "#a2a5b9"
  },
  photo: {
    width: "100%",
    height: "auto"
  },
  map: {
    maxWidth: "100%",
    height: "100%"
  },
  tableHeadBlock: {
    display: "flex",
    borderBottom: "1px solid #e7e8ef",
    backgroundColor: "white",
    padding: "0 20px",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  tableHeadTitle: {
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    marginRight: 15,
    color: "#595d6e",
    padding: "14px 0 12px",
    paddingLeft: 5,
    transition: ".3s",
    borderBottom: "2px solid white",
    textAlign: "center",
    "&:hover": {
      color: "#22b9ff",
      borderBottom: "2px solid #22b9ff",
      transition: ".3s"
    },
    "&:active": {
      color: "#22b9ff",
      borderBottom: "2px solid #22b9ff"
    }
  },
  tableHeading: {
    fontSize: 24,
    color: "#222",
    marginLeft: 15,
    fontWeight: 300
  },
  tableRow: {
    height: 50,
    display: "grid",
    gridTemplateColumns: "1fr repeat(5, 85px)",
    borderBottom: "1px solid #e7e8ef",
    textAlign: "center",
    alignItems: "center",
    padding: "0 10px",
    color: "#222",
    fontSize: "15px",
    fontWeight: 300
  },
  headTitle: {
    fontSize: '28px!important',
    lineHeight: '2.5rem',
    fontWeight: 600
  },
  buttonS: {
    backgroundColor: '#fff',
    color: '#004fff !important',
    padding: '6px 16px 4px 16px',
    "&:hover": {
      backgroundColor: '#f5f5f5'
    }
  },
  margin30: { marginBottom: "30px!important" },
  heading: {
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: '.0125em!important'
  },
  AppBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    position: 'relative',
    zIndex: 60
  },
  twoButton: {
    width: "80px",
    height: "40px",
    textTransform: "none",
    color: "#448AFF",
    "&.act": {
      backgroundColor: '#E1F5FE'
    }
  },
  paddingSM: {
    [theme.breakpoints.down('xs')]: {
      padding: '4px',
      boxSizing: 'inherit'
    },
  },
  headerBlock: {
    margin: "0 90px",
    [theme.breakpoints.down('sm')]: {
      margin: "0 20px"
    }
  },
  header: {
    fontSize: "20px",
    fontWeight: 500,
    padding: '0px 3px',
  },
  tabHeader: {
    fontSize: "12px",
    fontWeight: 700,
    color: 'rgba(0,0,0,.6)',
    padding: '5px 16px 5px 0'
  },
  dataBoard: {
    maxWidth: '550px'
  }
}));



const TABS_LIST = [
  ["Статистика", 0],
  ["Заглушки", 1],
  ["Товар/ценник", 2],
  ["Стикеры", 3],
  ["Нативная реклама", 4],
]
const TABS_TYPE = {
  "player": [0, 1],
  "tv": [0, 1],
  "ref": [0, 2, 3, 4, 1]
}



const Display = props => {
  const [showMap, setShowMap] = useState(false);
  const { id } = useParams();
  const { currentUser } = props;
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [deviceStat, setDeviceStat] = useState({});
  const [mediaInfo, setMediaInfo] = useState([]);
  const [screensInfo, setScreensInfo] = useState([]);
  const [mapInfo, setMapInfo] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setDeviceInfo(props.data)
  }, [props.data]);


  const getMediaInfo = async () => {
    try {
      let res = await axios.get(
        `/myboards/view-mediaplan?id=${id}&subuser=${currentUser.id
        }&page=2`
      );
      setMediaInfo(res.data);
      console.log(mediaInfo);
    } catch (err) {
      console.error(err);
    }
  };
  const getScreensInfo = async () => {
    try {
      let res = await axios.get(
        `/myboards/view-camp?id=${id}&subuser=${currentUser.id
        }&page=2`
      );
      setScreensInfo(res.data);
      console.log(screensInfo);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBackdrop = status => {
    setOpenBackdrop(status);
  };
  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");

    if (openBackdrop) {
      splashScreen.classList.remove("hidden");
    } else {
      splashScreen.classList.add("hidden");
    }
  }, [openBackdrop]);


  const [expanded, setExpanded] = React.useState(['panel1', 'panel2', 'panel3', 'panel4', 'panel5']);
  const handleChange = panel => (event, isExpanded) => {
    let ar = [...expanded];
    if (ar.indexOf(panel) == -1) {
      ar.push(panel);
    } else {
      let arrr = ar.filter(item => item != panel);
      ar = arrr;
    }
    setExpanded(ar);
  }

  const [tabNumb, setTabNumb] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabNumb(newValue);
  };
  const handleChangeIndex = (index) => {
    setTabNumb(index);
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange1 = () => {
    setChecked((prev) => !prev);
  };





  return (
    <Box>

      {deviceInfo.AllData &&
        <>
          <div className={`py-0 pt-4 d-flex ${classes.headerBlock} flex-column flex-md-row`}>
            <div className={'mb-1'}>
              <h3 className={`${classes.headTitle} m-0 c0277BD`}>
                {deviceInfo.AllData && deviceInfo.AllData.title}
              </h3>
              <Grid container direction="row" alignItems="center" className={'mb-1 c5E6366 fS16'}>
                <LockIcon fontSize="small" />
                <div className={'ml-2'}>{deviceInfo.AllData.private == 0 || deviceInfo.AllData.private == null ? "Приватный" : "Общий"}</div>
              </Grid>
              <Grid container direction="row" alignItems="center" className={'mt-3 c448AFF fS13 cursor-pointer'}>
                <div className={'mr-2'}>Ссылка на медиаплан</div>
                <FileCopyIcon fontSize="small" />
              </Grid>
              <div onClick={handleChange1} className={'mt-2 c448AFF fS13 cursor-pointer'} >
                {!checked ? "Технические настройки" : "Скрыть настройки"}
              </div>

              <Collapse in={checked} collapsedSize={40}>
                <Grid className={`kt-widget kt-widget--user-profile-3 ${classes.dataBoard}`} >
                  <Divider className={'my-3'} />
                  <Grid className=" mt-0 border-0  px-0 container">

                    <div className={'row'}>
                      <div className={'pb-0 col-md-6 col-12 padding12'}>
                        <Tab
                          icon={"flaticon-calendar-with-a-clock-time-tools"}
                          name={"Дни работы"}
                          data={deviceInfo.AllData && onUpdateWeek(props.data.AllData.days)}
                        />
                      </div>
                      <div className={'pb-0 col-md-6 col-12 padding12'}>
                        <Tab
                          icon={"flaticon-calendar-with-a-clock-time-tools"}
                          name={"Время работы"}
                          data={deviceInfo.AllData && deviceInfo.AllData.hours.join(', ')}
                        />
                      </div>
                      {deviceInfo.AllData && deviceInfo.AllData.device_id &&
                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-user-ok"}
                            name={"Идентификатор"}
                            data={deviceInfo.AllData.device_id}
                          />
                        </div>
                      }

                      {deviceInfo.AllData && deviceInfo.AllData.ip &&
                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-internet"}
                            name={"IP адрес"}
                            data={deviceInfo.AllData.ip}
                          />
                        </div>
                      }

                      <div className={'pb-0 col-md-6 col-12 padding12'}>
                        <Tab
                          icon={"flaticon-arrows"}
                          name={"Разрешение"}
                          data={deviceInfo.AllData && deviceInfo.AllData.resolution}
                        />
                      </div>
                      {deviceInfo.AllData && deviceInfo.AllData.model &&
                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-chat-1"}
                            name={"Модель"}
                            data={deviceInfo.AllData.model}
                          />
                        </div>
                      }

                      {deviceInfo.AllData && deviceInfo.AllData.vendor && (
                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-user-add"}
                            name={"Производитель"}
                            data={deviceInfo.AllData.vendor}
                          />
                        </div>
                      )}
                      {deviceInfo.AllData && deviceInfo.AllData.tvserial && (
                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-user-add"}
                            name={"Серийный номер"}
                            data={deviceInfo.AllData.tvserial}
                          />
                        </div>
                      )}
                      {deviceInfo.AllData && deviceInfo.AllData.type && (
                        <div className={'pb-0 col-md-6 col-12 padding12'} >
                          <Tab
                            icon={"flaticon-user-settings"}
                            name={"Тип устройства"}
                            data={deviceInfo.AllData.type}
                          />
                        </div>
                      )}
                    </div>

                    {deviceInfo.AllData && deviceInfo.AllData.yandex_id && (
                      <div className={'row w-100'}>
                        <div className={'pb-0 col-md-7 col-12 padding12'}>
                          <Tab
                            icon={"flaticon-piggy-bank"}
                            name={"ID Yandex"}
                            data={deviceInfo.AllData && deviceInfo.AllData.yandex_id}
                          />
                        </div>
                        <div className={'pb-0 col-md-5 col-12 padding12'} > </div>
                      </div>
                    )}

                  </Grid>
                </Grid>
              </Collapse>
            </div>

            <div className={`ml-sm-auto mt-3 mt-md-0`}>
              <Button startIcon={<ShareIcon />} className={`btn tTraN shareB  `} >
                <Box fontSize={14} fontWeight={500} className={'text-center'}>Поделиться</Box>
              </Button>
              <Button component={Link} to={`/myboards/add/${id}`} className={`ml-2 btn tTraN shareP `} >
                <CreateIcon fontSize="small" />
              </Button>
            </div>
          </div>

          <Paper className={'pb-0 px-1 px-md-4 mt-4'}>
            <div className="row no-gutters">
              <div className={`${tabNumb == 0 ? 'pt-1 col-12 p-0' : "col-12"}`}>
                <AppBar position="static" color="default" className={classes.AppBar}>
                  <Tabs
                    value={tabNumb}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="full width tabs example"
                    variant="scrollable"
                  >
                    {TABS_TYPE[deviceInfo.AllData.type].map(option => (
                      <TabM label={TABS_LIST[option][0]} value={TABS_LIST[option][1]} className={'first'} />
                    ))}
                  </Tabs>
                </AppBar>
                <Divider />

                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={tabNumb}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={tabNumb} index={0} dir={theme.direction}>
                    <div>
                      <div className={'text-center mt-3 mb-4'}>
                        <Button size="medium" className={`mr-1 ${classes.twoButton} fontGR `}>
                          График
                        </Button>
                        <Button size="medium" className={`mr-1 ${classes.twoButton} fontGR act`}>
                          Таблица
                        </Button>
                      </div>

                      <Statistic
                        //selectedDate={props.selectedDate}
                        handleDateChange={props.handleDateChange}
                        //selectedDateEnd={props.selectedDateEnd}
                        handleDateChangeEnd={props.handleDateChangeEnd}
                        boardId={id}
                        // statistic={deviceStat}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        workHoursCount={props.data.AllData.hours.length}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel value={tabNumb} index={1} dir={theme.direction} component={'div'}>
                    {!!deviceInfo.AllData.board_files && !!deviceInfo.AllData.board_files.photo &&
                      <div>
                        <Grid classes={{ root: classes.loadingWin }} className={'container-fluid'}>
                          <Typography className={`w-100 mt-4 ${classes.header}`}>Фото устройства</Typography>
                          <div className="row"
                            style={{ padding: '10px 24px 10px 28px', borderBottom: 'thin solid rgba(0,0,0,.12)' }}>
                            <div className="" style={{ 'width': 95 }}>
                              <Typography classes={{ root: classes.tabHeader }}>Предпросмотр</Typography>
                            </div>
                            <div className="col">
                              <Typography classes={{ root: classes.tabHeader }}>Информация</Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid className={'container-fluid'}>
                          {deviceInfo.AllData.board_files.photo.map((item, index) => {
                            return (
                              <SlideItemDesktop
                                key={item.id}
                                data={item}
                                classes={classes}
                                remooveFile={props.remooveFile}
                                //changeActiveFile={props.changeActiveFile}
                                deviceInfo={deviceInfo.AllData}
                                setting={false}
                                updateSetting={props.updateSetting}
                                indexCo={index}
                              />
                            );
                          })}
                        </Grid>
                      </div>
                    }

                    {!!deviceInfo.AllData.board_files && !!deviceInfo.AllData.board_files.pause &&
                      <div>
                        <Grid classes={{ root: classes.loadingWin }} className={'container-fluid'}>
                          <Typography className={`w-100 mt-4 ${classes.header}`}>Файлы заглушек</Typography>
                          <div className="row"
                            style={{ padding: '10px 24px 10px 13px', borderBottom: 'thin solid rgba(0,0,0,.12)' }}>
                            <div className="" style={{ 'width': 95 }}>
                              <Typography classes={{ root: classes.tabHeader }}>Предпросмотр</Typography>
                            </div>
                            <div className="col">
                              <Typography classes={{ root: classes.tabHeader }}>Информация</Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid className={'container-fluid'}>
                          {deviceInfo.AllData.board_files.pause.map((item, index) => {
                            return (
                              <SlideItemDesktop
                                key={item.id}
                                data={item}
                                classes={classes}
                                remooveFile={props.remooveFile}
                                //changeActiveFile={props.changeActiveFile}
                                deviceInfo={deviceInfo.AllData}
                                setting={false}
                                updateSetting={props.updateSetting}
                                indexCo={index}
                              />
                            );
                          })}
                        </Grid>
                      </div>
                    }

                    {!!deviceInfo.AllData && !!deviceInfo.AllData.board_files && !!deviceInfo.AllData.board_files.night_pause &&
                      <div>
                        <Grid classes={{ root: classes.loadingWin }} className={'container-fluid'}>
                          <Typography className={`w-100 mt-4 ${classes.header}`}>Файлы ночных заглушек</Typography>
                          <div className="row"
                            style={{ padding: '10px 24px 10px 28px', borderBottom: 'thin solid rgba(0,0,0,.12)' }}>
                            <div className="" style={{ 'width': 95 }}>
                              <Typography classes={{ root: classes.tabHeader }}>Предпросмотр</Typography>
                            </div>
                            <div className="col">
                              <Typography classes={{ root: classes.tabHeader }}>Информация</Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid className={'container-fluid'}>
                          {deviceInfo.AllData.board_files.night_pause.map((item, index) => {
                            return (
                              <SlideItemDesktop
                                key={item.id}
                                data={item}
                                classes={classes}
                                remooveFile={props.remooveFile}
                                deviceInfo={deviceInfo.AllData}
                                setting={false}
                                updateSetting={props.updateSetting}
                                indexCo={index}
                              />
                            );
                          })}
                        </Grid>
                      </div>
                    }

                  </TabPanel>

                  <TabPanel value={tabNumb} index={2} >
                    <Goods

                    />
                  </TabPanel>


                </SwipeableViews>
              </div>
            </div>
          </Paper>
        </>
      }

      <Grid item xs={12}>

        {currentTab === 2 && (
          <Screens
            screensInfo={screensInfo}
            getScreensInfo={getScreensInfo}
            id={id}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        )}
        {currentTab === 3 && (
          <Media
            mediaInfo={mediaInfo}
            getMediaInfo={getMediaInfo}
            id={id}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        )}
      </Grid>
    </Box>
  );
};

const Tab = props => {
  let ff = !!props.font ? props.font : "20px";
  let lh = !!props.lineHeight ? props.lineHeight : "2rem";

  return (
    <Grid className="greyField" item>
      <Grid className="greyField2 p-0">
        <div className="greyFSmall fontGR c546E7A">{props.name}</div>
        <Box className="greyFBig c455A64" lineHeight={lh} >{props.data}{" "}</Box>
      </Grid>
    </Grid>
  );
};

const TabData = props => {
  return (
    <Grid className="kt-widget__item pt-0" item>
      <Grid className="kt-widget__icon">
        <i className={props.icon}></i>
      </Grid>
      <Grid className="kt-widget__details">
        <span className="kt-widget__value">
          <Moment format="DD.MM.YYYY" style={{ fontSize: "1.1rem" }}>
            {props.data}
          </Moment>
        </span>
        <span className="kt-widget__title">{props.name}</span>
      </Grid>
    </Grid>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >{children}</Box>
      )}
    </div>
  );
}

export default Display;
