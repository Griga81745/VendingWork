import React, { useEffect, useState } from "react";
import {
  Grid, TableRow, TableCell, TableSortLabel, TableContainer, Table,
  makeStyles, useTheme, TableBody, Collapse,
  Box, Divider, Button, AppBar, Tabs, Tab as TabM, TableHead
} from "@material-ui/core";


import SwipeableViews from 'react-swipeable-views';

//import CardMedia from "@material-ui/core/CardMedia";
import DevicesMap from "./map";
//import Calendar from "../common/Calendar";

import CheckUpSelectedBoards from "./CheckUpSelectedBoards";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
//import Swal from "sweetalert2";

// import IconButton from '@material-ui/core/IconButton';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
import ThirdTab from "./ThirdTab";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import PinDropIcon from '@material-ui/icons/PinDrop';
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import { injectIntl } from "react-intl";
import TimelineIcon from '@material-ui/icons/Timeline';
import LockIcon from '@material-ui/icons/Lock';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { onUpdateWeek } from "app/utils/index";
//import { Line } from 'react-chartjs-2';

import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

//import Checkbox from "@material-ui/core/Checkbox";
//import { isStatus } from "../../../_metronic/utils/utils";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import deLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
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
    fontSize: '28px!important',
    lineHeight: '2.5rem',
    fontWeight: 600
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
    backgroundColor: '#FAFAFA',
    boxShadow: 'none',
    zIndex: 64
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
  AccordionSummary: {
    minHeight: '64px',
    padding: 0
  },
  Graph: {
    height: "380px",
    border: "1px solid #F0F0F3",
    borderRadius: 4,
    marginBottom: 10
  }
}));
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const DisplayCheckUp = props => {
  const { setting, filter, updateSetting, updateCompanyData, choosedBoards,
    showSummary, showsLogic, splitEquile, intl, setChoosedCreatives
  } = props;
  const [usersDataV, setUsersDataV] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const { id } = useParams();
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
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const [dataShows, setDataShows] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [totalShows, setTotalShows] = useState(0);
  const getStatInfo = async data => {
    updateBackdrop(true);
    try {
      let stat = await axios
        .get(
          `/myboards/view-stat?id=${id}&subuser=${JSON.parse(localStorage.getItem("currentUser")).id
          }&page=2`
        )
        .then(res => {
          updateBackdrop(false);


          if (!!res.data.stat) {
            Object.keys(res.data.stat).map(key => {
              //res.data.stat[key].slides_showed = (!!data.statGoLang[key].shows ? data.statGoLang[key].shows : 0);
              let cc = 0
              if (typeof data.statGoLang[key] !== 'undefined') {
                cc = !!data.statGoLang[key].shows ? data.statGoLang[key].shows : 0;
                Object.keys(res.data.stat[key].camp).map(keyCamp => {
                  let ccCamp = 0
                  if (typeof data.statGoLang[key].camp_shows[keyCamp] !== 'undefined') {
                    ccCamp = !!data.statGoLang[key].camp_shows[keyCamp] ? data.statGoLang[key].camp_shows[keyCamp] : 0;
                    res.data.stat[key].camp[keyCamp].slides_showed = ccCamp;
                  }


                  if (Object.keys(data.statGoLangYandex).length && typeof data.statGoLangYandex[key] !== 'undefined') {
                    res.data.stat[key].camp["yandex"] = { slides_showed: data.statGoLangYandex[key] }
                  }

                  if (Object.keys(data.statGoLangParni).length &&
                    typeof data.statGoLangParni[key] !== 'undefined' &&
                    typeof data.statGoLangParni[key][keyCamp] !== 'undefined'
                  ) {
                    console.log("ffffffffffffffffffffffffff111");
                    console.log(key);
                    console.log(keyCamp);
                    console.log(data.statGoLangParni[key]);
                    console.log(data.statGoLangParni[key][keyCamp]);
                    console.log("ffffffffffffffffffffffffff222");

                    res.data.stat[key].camp[keyCamp].slides_showed = data.statGoLangParni[key][keyCamp];
                  }

                })
              }
              //console.log(cc);
              res.data.stat[key].slides_showed = cc;
            });
          }

          setDeviceStat(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const getMediaInfo = async () => {
    try {
      let res = await axios.get(
        `/myboards/view-mediaplan?id=${id}&subuser=${JSON.parse(localStorage.getItem("currentUser")).id
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
        `/myboards/view-camp?id=${id}&subuser=${JSON.parse(localStorage.getItem("currentUser")).id
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

  useEffect(() => {
    let countAllShows = 0;
    Object.values(choosedBoards).forEach(val => {


      console.log('handleChange111 Math.floor val.idval.id ')
      console.log(val.id)
      console.log(props.freeShowsAllboards[val.id])
      if (!!props.freeShowsAllboards[val.id]) {
        countAllShows += Math.floor(props.freeShowsAllboards[val.id] / props.filter.duration)
      }

    })

    console.log('handleChange111 Math.floor ')
    console.log(countAllShows)

    setTotalShows(countAllShows)
  }, []);

  const [expanded, setExpanded] = React.useState(['panel0', 'panel1', 'panel2', 'panel3', 'panel4']);
  const handleChange = panel => (event, isExpanded) => {

    //console.log('handleChange111')
    //  console.log(isExpanded)
    ///console.log(panel)
    let ar = [...expanded];
    if (ar.indexOf(panel) == -1) {
      ar.push(panel);
    } else {
      let arrr = ar.filter(item => item != panel);
      ar = arrr;
    }
    setExpanded(ar);
  };

  const [tabNumb, setTabNumb] = useState(0);
  // const handleChangeTab = (event, newValue) => {
  //   setTabNumb(newValue);
  // };
  // const handleChangeIndex = (index) => {
  //   setTabNumb(index);
  // };

  const formatHours = () => {

    let hoursString = "";
    let index2 = 0;
    let cursor = 0;
    console.log('formatHoursformatHoursformatHours')
    console.log(filter.hours)
    filter.hours.map((value, index) => {
      console.log(index2)
      if (index2 == 0) {
        hoursString += value + '&-';
      } if (index == filter.hours.length - 1) {
        hoursString += '-' + value;
      } else if (index == +value) {

      } else if (cursor != +value) {
        hoursString += (+filter.hours[index - 1] + 1) + ' ';
        index2 = -1;
        cursor = +value;
      }
      cursor++;
      index2++;
    })
    console.log(hoursString)
    return hoursString;
  }

  const formatWeekD = () => {
    let daysWeekString = [];
    filter.daysOfWeek.map((value, index) => {
      daysWeekString.push(intl.formatMessage({
        id: "DAYS." + value.toUpperCase()
      }))
    })
    console.log(daysWeekString)
    return daysWeekString.join(', ');

  }

  const [value, setValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange1 = () => {
    setChecked((prev) => !prev);
  };

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    let data = stabilizedThis.map((el) => el[0]);
    //console.log('stableSort')
    //console.log(data)
    return data;
  }
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const [selectedDate, handleDateChange] = useState(null);
  const [selectedDateEnd, handleDateChangeEnd] = useState(null);

  return (
    <>

      <div className={`py-0 pt-4 d-flex ${classes.headerBlock} flex-column flex-md-row`}>
        <div className={'mb-1'}>
          {!!filter.nameClient &&
            <Box fontSize={10} className={'d-block text-uppercase'}>{filter.nameClient}</Box>
          }
          <h3 className={`${classes.headTitle} m-0 c0277BD`}>
            {filter.title}
          </h3>
          <Grid container direction="row" alignItems="center" className={'mb-2 c5E6366 fS16'}>
            {setting.typeShows == "1" ? <LockIcon fontSize="small" /> : <TimelineIcon fontSize="small" />}
            <div className={'ml-2 fontGR'}>{setting.typeShows == 3 ? "Динамическая" : "Фиксированная"}</div>
          </Grid>

          <Box fontSize={13} fontWeight={400} className={`d-block c5E6366`} >
            <Moment format="DD MMM YYYY" >
              {filter.companyStartDate}
            </Moment> -  <Moment format="DD MMM YYYY" >
              {filter.companyEndDate}
            </Moment>
          </Box>

          <div onClick={handleChange1} className={'mt-2 c448AFF fS13 cursor-pointer'} >
            {!checked ? "Технические настройки" : "Скрыть настройки"}
          </div>
          <Collapse in={checked} collapsedSize={40}>
            <Grid className={`kt-widget kt-widget--user-profile-3 ${classes.dataBoard}`} >
              <Divider className={'my-3'} />
              <Grid className=" mt-0 border-0  px-0 container">

                <div className={'row'}>
                  {!!filter.daysOfWeek &&
                    <div className={'pb-0 col-md-6 col-12 padding12'}>
                      <Tab
                        icon={"flaticon-calendar-with-a-clock-time-tools"}
                        name={"Время работы"}
                        data={onUpdateWeek(filter.daysOfWeek)}
                      />
                    </div>
                  }
                  {!!filter.blockLength &&
                    <div className={'pb-0 col-md-6 col-12 padding12'}>
                      <Tab
                        icon={"flaticon-user-ok"}
                        name={`Длина блока`}
                        nameDop={filter.blockLength + " мин"}
                      />
                    </div>
                  }
                  {!!filter.amountInBlock &&
                    <div className={'pb-0 col-md-6 col-12 padding12'}>
                      <Tab
                        icon={"flaticon-internet"}
                        name={"Кол-во выходов в блоке"}
                        nameDop={filter.amountInBlock}
                      />
                    </div>
                  }
                </div>

              </Grid>
            </Grid>
          </Collapse>

        </div>

        <div className={`ml-sm-auto mt-3 mt-md-0`}>
          <div className={'c78909C fontGR text-sm-right mb-2'}>Кампания не запущена</div>
          <div style={{ width: 266 }}>
            <Button startIcon={<PlayArrowIcon />} className={`btn tTraN shareB `} onClick={props.newCampaign} >
              <Box fontSize={14} fontWeight={500} className={'text-center'}>Запустить</Box>
            </Button>
            <Button to="#" component={Link} className={`ml-2 btn tTraN shareP `} >
              <CreateIcon fontSize="small" />
            </Button>
            <Button component={Link} to={`#`} className={`ml-2 btn tTraN sharePAdd`} >
              <GroupAddIcon fontSize="small" />
            </Button>
          </div>
        </div>
      </div>


      <AppBar position="static" color="default" className={`AppBar mt-3 fontGR px-0 px-md-4`}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          className={"tabsMenu"}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="full width tabs example"
        >
          <TabM className={'fS16'} label="Прогнозные значения" {...a11yProps(0)} />
          <TabM className={'fS16'} label="Креативы" {...a11yProps(1)} />
          <TabM className={'fS16'} label="Уcтройства" {...a11yProps(2)} />
        </Tabs>
        <Divider />
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={'bgcfff'}
        disabled={true}
      >
        <TabPanel value={value} index={0} dir={theme.direction} className={'px-2 px-md-4 bgcfff pt-3'} >
          <div className={classes.Graph}>

            <div className={'d-flex align-items-center px-4 pt-4'}>
              <div className={'d-flex align-items-center mr-auto'}>
                <div className={'fS20 c1C1D21 mr-4'}>Общий прогноз</div>
                <Button variant="outlined" className={'graphButton mr-1 fontGM act'}>
                  Показы
                </Button>
                <Button variant="outlined" className={'graphButton mr-1 fontGM'}>
                  OTS
                </Button>
                <Button variant="outlined" className={'graphButton mr-1 fontGM'}>
                  GRP
                </Button>
              </div>
              <div className={'d-flex align-items-center'}>
                <div className={'c5E6366 fS16 fontGR mr-2'}>Период</div>
                <div className={'c5E6366 fS16 mr-2'} style={{ width: 84 }}>
                  <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      value={selectedDate == null ? moment(props.filter.companyStartDate).toDate() : selectedDate}
                      format="dd.MM.yyyy"
                      minDate={moment(props.filter.companyStartDate).toDate()}
                      onChange={handleDateChange}
                    //onChange={(e)=>{
                    //console.log("ffffffffffffffffffffff")
                    //console.log(moment(props.filter.companyStartDate).toDate())
                    //console.log(moment(props.filter.companyStartDate).format('YYYY/MM/DD'))
                    //console.log(e)
                    //}}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className={'c5E6366 fS16 mr-4'} style={{ width: 84 }}>
                  <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      value={selectedDateEnd == null ? moment(props.filter.companyEndDate).toDate() : selectedDateEnd}
                      format="dd.MM.yyyy"
                      minDate={moment(props.filter.companyEndDate).toDate()}
                      onChange={handleDateChangeEnd}
                    //onChange={(e)=>{
                    //console.log("ffffffffffffffffffffff")
                    //console.log(moment(props.filter.companyStartDate).toDate())
                    //console.log(moment(props.filter.companyStartDate).format('YYYY/MM/DD'))
                    //console.log(e)
                    //}}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <Button size="medium" className={`mr-1 graphButton fontGM act`}>
                  День
                </Button>
                <Button size="medium" className={`mr-1 graphButton fontGM`}>
                  Неделя
                </Button>
                <Button size="medium" className={`mr-1 graphButton fontGM`}>
                  Месяц
                </Button>
              </div>
            </div>

            <div>
              <LineChart data={{
                "2021-07-01": 2,
                "2021-07-02": 15,
                "2021-07-03": 25,
                "2021-07-04": 115,
                "2021-07-05": 445,
                "2021-07-06": 235,
                "2021-07-07": 25,
                "2021-07-08": 75,
                "2021-07-09": 15,
                "2021-07-10": 95,
                "2021-07-11": 75,
                "2021-07-12": 157,
                "2021-07-13": 15,
                "2021-07-14": 15,
                "2021-07-15": 159,
                "2021-07-16": 15,
                "2021-07-17": 959,
                "2021-07-18": 15,
                "2021-07-19": 154,
                "2021-07-20": 15,
                "2021-07-21": 15,
                "2021-07-22": 15,
                "2021-07-23": 15,
                "2021-07-24": 11,
                "2021-07-25": 155,
              }} />
            </div>
          </div>

          <TableContainer style={{ marginBottom: 100 }} >
            <Table>
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                rowCount={10}
              />
              <TableBody>
                <TableRow hover >
                  <TableCell style={{ maxWidth: 100 }}>
                    {filter.title}
                  </TableCell>
                  <TableCell component="th" scope="row" > </TableCell>
                  <TableCell component="th" scope="row" > </TableCell>
                  <TableCell component="th" scope="row">{totalShows}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction} className={'px-2 px-md-4 bgcfff pt-3'} >
          <ThirdTab
            type={'table'}
            choosedBoards={choosedBoards}
            uploadedFiles={props.uploadedFiles}
            // choosedRadio={props.choosedRadio}
            setPictures={props.setPictures}
            // selectedFiles={props.selectedFiles}
            //setSelectedFiles={props.setSelectedFiles}
            filter={filter}
            duration={filter.duration}
            durationRadio={filter.durationRadio}
            key={"ThirdTabCheckUp"}
            checkUp={'checkUp'}
            setting={setting}
            choosedCreatives={props.choosedCreatives}
            addFileToCamp={props.addFileToCamp}
            updateSetting={updateSetting}
            setChoosedCreatives={setChoosedCreatives}
            freeShowsAllboards={props.freeShowsAllboards}
          />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction} className={'px-2 px-md-4 bgcfff pt-3'} >
          <CheckUpSelectedBoards choosedBoards={choosedBoards} setValue={setValue} />
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <DevicesMap boards={choosedBoards} setStyle={{ minHeight: '500px', maxHeight: 500 }} />
        </TabPanel>
      </SwipeableViews>

    </>
  )
};

const Tab = props => {
  let ff = !!props.font ? props.font : "20px";
  let lh = !!props.lineHeight ? props.lineHeight : "2rem";

  return (
    <Grid className="greyField" item>
      <Grid className="greyField2 p-0">
        <div className="greyFSmall fontGR c546E7A">{props.name}{!!props.nameDop && <Box component="span" className={'fontGM'}>{" "}{props.nameDop}</Box>}</div>
        {!!props.data && <Box className="greyFBig c455A64 fS14" lineHeight={lh} >{props.data}{" "}</Box>}
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
export default injectIntl(DisplayCheckUp);


const headCells = [
  {
    field: 'name',
    label: "Название кампании",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'budget',
    label: "Бюджет",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'MaxBet',
    label: "Max ставка",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'allshows',
    label: "Всего показов",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  }
];
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort, handleClickOpenDialog, checkedList } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead classes={{ root: classes.TableHead }}>
      <TableRow className={'TableRow40'}>
        {headCells.map((headCell) => {
          return <TableCell
            style={{ padding: !!headCell.padding ? headCell.padding : "" }}
            key={headCell.field + 'cam'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={'py-0 px-3'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={'headCellLabel'}>{headCell.label}</div>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        })}
      </TableRow>
    </TableHead>
  );
}
