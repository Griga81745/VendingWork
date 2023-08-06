import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
// import { useSelector } from "react-redux";
import clsx from 'clsx';
import md5 from 'md5';
import {
  Paper,
  lighten,
  makeStyles, fade,
  Box,
  Grid,
  Typography,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Hidden,
  MenuItem,
  Menu,
  Fade,
  withStyles,
  Tabs, AppBar, Tab, Badge, LinearProgress, InputAdornment, FormControl, InputLabel, Select, Button,
  InputBase, IconButton, Toolbar, CircularProgress
} from "@material-ui/core";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isStatus } from "app/utils/index";
import { FormattedMessage } from "react-intl";
import { camp_list, camp_list_stat } from "../../../app/crud/auth.crud";
//import CampaignTablet from "../../components/Campaign/CampaignTablet";
//import CampaignDesktop from "../../components/Campaign/CampaignDesktop";
//import CampaignMobile from "../../components/Campaign/CampaignMobile";
import { Link, withRouter } from "react-router-dom";
import { Link as LinkAway } from '@mui/material';
import { connect } from "react-redux";
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Moment from "react-moment";
import 'react-circular-progressbar/dist/styles.css';
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import Skeleton from '@mui/material/Skeleton';
import {
  useQuery,
} from 'react-query';

var moment = require("moment");
const worker = new Worker(new URL('../../webworkers/boards.worker.js', import.meta.url));

const useStyles = makeStyles({
  rootEmpty: {
    textAlign: 'center',
    marginTop: '160px'
  },
  Circular: {
    width: '12px',
    margin: '0 5px 0 0'
  },
  CheckboxChecked: {
    color: '#0075FF!important'
  },
  TableHead: {
  },
  table: {
    minWidth: 1100
  },
  text: {
    fontSize: '13px',
    fontWeight: 400
  },
  text2: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#42556B'
  },
  TableCellNameA: {
    fontSize: '13px',
    color: '#0075FF',
    fontWeight: 500
  },
  TableRowBody: {
    padding: "0 25px",
  },
  TableRowBodyS: {
    backgroundColor: '#FAFAFA!important'
  },
  headCellSubLabel: {
    fontSize: '11px',
    color: "#687C8F"
  },
  menuItem: {
    fontWeight: 500,
    fontSize: "12px",
    minHeight: "auto"
  },
  row: {
    position: "relative",
    padding: "1px 0"
  },
  companyName: {
    color: "#222",
    fontSize: 13,
    fontWeight: 500
  },
  companyDates: {
    fontSize: 12,
    color: "#888"
  },
  companyInfo: {
    paddingLeft: "1rem",
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center"
  },
  companyInfoMobile: {
    paddingLeft: "20px",
    backgroundColor: "transparent",
    zIndex: 2
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  dataHeader: {
    fontSize: 12,
    marginTop: "auto",
    color: "#888888"
  },
  summaryData: {
    fontSize: "25px"
  },
  data: {
    fontSize: "1rem",
    color: "#222",
    fontWeight: 500
  },
  tooltip: {
    margin: 0,
    padding: "13px 0",
    backgroundColor: "white",
    boxShadow: "1px 1px 12px 6px rgba(56, 56, 56, 0.16)"
  },
  filterModal: { width: "100%", maxWidth: 600, overflowY: "initial" },
  selectedBoard: {
    fontSize: 18,
    borderRadius: "4px",
    margin: "9px 0 0 8px",
    padding: "0 10px",
    color: "#555",
    lineHeight: "1.3333",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc"
  },
  select: {
    width: "100%"
  },
  summary: {
    marginBottom: "20px",
    padding: "26px 13px"
  },
  greyPla: {
    backgroundColor: "#FAFAFA",
    height: "56px",
    borderTop: '1px solid #DDE7F0',
    borderBottom: '1px solid #DDE7F0',
    height: '58px'
  },
  input: {
    marginLeft: '1px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rowPadding: {
    paddingTop: '2px',
    paddingBottom: 3
  },
  anchorOriginTopRightRectangle: {
    top: -1,
    right: -9
  },
  rootTabModer: {
    overflow: 'unset'
  },
  loader: {
    position: 'absolute',
    width: '100%',
    top: 0
  }
});

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

const headCells = [
  { field: 'id', label: "Статус", sublabel: "Название рекламной кампании", minwidth: 80, width: "7%", numeric: false, disablePadding: true, filter: false },
  { field: 'owner', label: "Рек.", sublabel: "Название рекламной кампании", minwidth: 50, width: "5%", numeric: false, disablePadding: true, filter: false },
  { field: 'name', label: "Кампания", sublabel: "Название рекламной кампании", minwidth: 400, width: "35%", numeric: false, disablePadding: true, filter: false },
  { field: 'budget', label: "Заказано", sublabel: "Завершенность", minwidth: 120, width: "14%", numeric: false, disablePadding: true, filter: false },
  { field: 'shows', label: "Показов", sublabel: "Завершенность", minwidth: 120, width: "14%", numeric: false, disablePadding: true, filter: false },
  { field: 'start', label: "Начало", sublabel: "Дата начала", minwidth: 120, width: "10%", numeric: false, disablePadding: true, filter: false },
  { field: 'end', label: "Окончание", sublabel: "Дата окончания", minwidth: 120, width: "10%", numeric: false, disablePadding: true, filter: false },
  {
    field: 'reserved',
    label: "Заказано",
    sublabel: "Заказано",
    minwidth: 120,
    width: "10%",
    numeric: false,
    disablePadding: true,
    filter: true
  },
  {
    field: 'device',
    label: "Устройства",
    sublabel: "Устройства",
    minwidth: 120,
    width: "10%",
    numeric: false,
    disablePadding: true,
    filter: true
  },
  {
    field: 'seconds',
    label: "Длина показа",
    sublabel: "Длина показа",
    minwidth: 120,
    width: "10%",
    numeric: false,
    disablePadding: true,
    filter: true
  },
  {
    field: 'blocklength',
    label: "Длина блока",
    sublabel: "Длина блока",
    minwidth: 120,
    width: "10%",
    numeric: false,
    disablePadding: true,
    filter: true
  },
  {
    field: 'blockshows',
    label: "Показов в блоке",
    sublabel: "Показов в блоке",
    minwidth: 145,
    width: "10%",
    numeric: false,
    disablePadding: true,
    filter: true
  },

];
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
let yandexDisk = 0
let nameYandexEx = ""
const queryParameters = new URLSearchParams(window.location.search)
if (!!queryParameters.get("code")) {
  yandexDisk = queryParameters.get("code")
}
if (!!queryParameters.get("ex")) {
  nameYandexEx = queryParameters.get("ex")
}

const Campaign = props => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);
  const [dataReklamodatel, setDataReklamodatel] = useState({});
  const { currentUser, token } = props;

  //const currentUserRole = currentUser.role;
  //const currentUserRole = JSON.parse(localStorage.getItem("currentUser")).role;

  const [usersDataV, setUsersDataV] = useState([]);


  const [filterModal, setFilterModal] = useState(false);

  const [campIds_FotWebWorkerCount, setCampIds_FotWebWorkerCount] = useState(-1);
  const prevAmountCampIds_FotWebWorkerCount = usePrevious(campIds_FotWebWorkerCount);


  const [dataTable, setDataTable] = useState(false);
  const [dataShows, setDataShows] = useState([]);
  const [dataShowsReserved, setDataShowsReserved] = useState([]);
  const [campCount, setCampCount] = useState(0);

  useEffect(() => {
    console.log("moment().unix()moment().unix()moment().unix()moment().unix()");
    console.log(moment().unix());
    worker.onmessage = ({ data: { id, count } }) => {

      setDataShowsReserved(oldData => {
        let newData = { ...oldData }
        newData[id] = count
        return newData
      })

      setCampIds_FotWebWorkerCount(old => {
        if (old > -1) {
          return old + 1
        }
        return -1
      })
    };
    if (yandexDisk !== 0) {
      Swal.fire({
        title: 'Загружаются данные Yandex Диск!',
        icon: 'info',
        showConfirmButton: false,
      })
      let urlY = `https://ru.de4.ru/yandexdisk?code=` + yandexDisk
      if (nameYandexEx !== "") {
        urlY += `&ex=${nameYandexEx}`
      }
      axios.post(
          urlY
      ).then(res => {
        if (res.data.status === "ok") {
          Swal.fire({
            title: 'Yandex Диск подключен!',
            icon: 'success',
            showConfirmButton: false,
            //timer: 1500
          }).then((result) => {
            props.history.replace({ pathname: `/campaign` })
          })
        } else {
          Swal.fire({
            title: 'Возникла ошибка при подключении!',
            text: res.data.error,
            icon: 'error',
            showConfirmButton: false,
          }).then((result) => {
            props.history.replace({ pathname: `/campaign` })
          })
        }
        console.log("/yandexdisk/yandexdisk/yandexdisk");
        console.log(res.data);
      });
    }
  }, []);
  useEffect(() => {
    if (campIds_FotWebWorkerCount === -1 || prevAmountCampIds_FotWebWorkerCount == campIds_FotWebWorkerCount) {
      return
    }
    if (dataTable !== undefined && campIds_FotWebWorkerCount < dataTable.length) {
      if (dataShowsReserved[dataTable[campIds_FotWebWorkerCount].id] !== undefined) {
        setCampIds_FotWebWorkerCount(old => old + 1)
        return
      }
      countShowsFromWebWorker(dataTable[campIds_FotWebWorkerCount])
    }
  }, [campIds_FotWebWorkerCount, dataTable]);

  const countShowsFromWebWorker = campSingelData => {
    console.log("worker GOOOO")
    worker.postMessage({
      token: token,
      id: campSingelData.id,
      boards_ids: campSingelData.boards,
      start: campSingelData.start,
      finished: campSingelData.finished
    })
  }

  const [setting, setSetting] = useState({
    filterName: "",
    page: 0,
    filterStatuses: 0,
    mobSortStatus: 0
  });
  const [settingY, setSettingYandex] = useState({
    yandexDisk: false,
    yandexDiskGallary: false,
    yandexDiskGuys: false,
    yandexDiskOohDesk: false
  });
  function setFilterNamePre(val) {
    setSetting({ ...setting, page: 0, filterName: val });
  }
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentSort, setCurrentSort] = useState(null);

  // Example 7
  const [anchorEl7, setAnchorEl7] = React.useState(null);
  const open7 = Boolean(anchorEl7);

  function handleClick7(event) {
    setAnchorEl7(event.currentTarget);
  }
  function handleClose7(type) {
    if (typeof type == "string") {
      setCurrentSort(type);
    }
    setAnchorEl7(null);
  }
  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  useEffect(() => {
    if (window.location.hash == "#rek" && currentTab != 2) {
      setCurrentTab(2);
    }
  }, [window.location.hash]);


  const { data: fetchCampaignData, error: campaignDataError, isLoading: campaignDataIsLoading, refetch: campaignDataRefetch } = useQuery([
        "camp_data_list",
        setting.page,
        setting.filterStatuses, setting.filterName
      ], () =>
          camp_list(setting.page, currentUser.id, currentSort, setting.filterName, statuses[setting.filterStatuses]),
      {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
      }
  )
  const { data: fetchCampaignStat, error: campaignStatError, isLoading: campaignStatIsLoading, refetch: campaignStatRefetch } = useQuery(["camp_data_stat_list", setting.page], () =>
          camp_list_stat(fetchCampaignData.data.campaign),
      {
        enabled: !!fetchCampaignData && !campaignDataIsLoading,
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
      }
  )
  useEffect(() => {
    if (!!fetchCampaignData) {
      let dataF = fetchCampaignData.data
      setCampCount(dataF.meta.total);
      setDataTable(dataF.campaign);
    }
  }, [fetchCampaignData]);
  useEffect(() => {

    console.log("fetchCampaignStat11222", fetchCampaignStat)

    if (fetchCampaignStat !== undefined) {
      if (fetchCampaignStat.data !== undefined || fetchCampaignStat.data === null) {
        let statShowsByCamp = []
        if (fetchCampaignStat.data !== null) {
          fetchCampaignStat.data.forEach(statData => {
            statData.Data.forEach(campShow => {
              if (typeof statShowsByCamp[campShow._id.camp_id] === 'undefined') {
                statShowsByCamp[campShow._id.camp_id] = 0;
              }
              statShowsByCamp[campShow._id.camp_id] += campShow.total;
            })
          })
        } else {
          statShowsByCamp[0] = null
        }
        setDataShows(statShowsByCamp);
        setCampIds_FotWebWorkerCount(0)
      }
    }
  }, [fetchCampaignStat]);

  const statuses = ["all", "running", "moder", "pending", "finished"];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataTable.campaign.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
  const handleChangePage = (event, newPage) => {
    setDataTable(false)
    setSetting({ ...setting, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    //setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;


  const handleChange = (event, newValue) => {
    if (newValue != setting.filterStatuses) {
      setDataTable(false)
      setSetting({ ...setting, page: 0, filterStatuses: newValue });
    }
  };
  //const [loaderShow, setLoaderShow] = useState(false);
  useEffect(() => {
    document.title = "Кампании / " + process.env.REACT_APP_COMPANY;
    setCampIds_FotWebWorkerCount(old => -1)
  }, [currentSort, currentTab, setting]);


  ///dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  /// dialog List
  const [checkedList, setCheckedList] = useState([]);
  const handleToggleList = (value) => () => {
    const currentIndex = checkedList.indexOf(value);
    const newChecked = [...checkedList];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedList(newChecked);
  }

  const handleYandexDisk = value => () => {
    let url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=edbe0400223e4d9aa6aa75888e0d0f2a&redirect_uri=https%3A%2F%2Ftarget.sendflips.com%2Fcampaign`

    if (value === "hYandexDiskG") {
      url += "?ex=gallery"
    } else if (value === "hYandexDiskGuys") {
      url += "?ex=guys"
    } else if (value === "hYandexDiskOohDesk") {
      url += "?ex=oohdesk"
    }

    window.location.replace(url);
  }

  return (
      <>

        {currentTab === 1 ? (
            <>
              <EnhancedTableToolbar setFilterNamePre={setFilterNamePre} />
              <Paper className={'paper'}>

                <AppBar position="static" color="default" className={`AppBar mt-3`}>
                  <Tabs
                      value={setting.filterStatuses}
                      onChange={handleChange}
                      className={"tabsMenu ml-4"}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      //scrollButtons="auto"
                  >
                    <Tab label="Все" />
                    <Tab label="Запущенные" />
                    <Tab label="Модерация" />
                    <Tab label="Запланированные" />
                    <Tab label="Завершённые" />
                    {/*
                      <Tab classes={{root:classes.rootTabModer }} label={<Badge badgeContent={4} color="primary" classes={{anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle }}>
                        Модерация
                      </Badge>} />
                      */}
                  </Tabs>

                  {campaignDataIsLoading || campaignStatIsLoading ? <LinearProgress className={classes.loader} /> : null}
                </AppBar>

                <Hidden only={["xs", "sm"]}>
                  <div className={`fontGR mx-4 helpSelect align-items-center mt-3 c274C77 fS14 ${selected.length > 0 ? "d-flex" : "d-none"}`}>
                    <div style={{ marginRight: 120 }}>
                      Выбрано кампаний <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
                    </div>
                    <Button
                        className={'helpButton c274C77'}
                        variant="outlined" color="secondary"
                        startIcon={<GetAppIcon />}
                    >
                      Экспортировать
                    </Button>
                    <Button
                        className={'helpButton c455A64 fontGR'}
                        variant="outlined" color="secondary"
                        startIcon={<FileCopyIcon />}
                    >
                      Скопировать
                    </Button>
                    <Button
                        className={'helpButton c455A64 fontGR'}
                        variant="outlined" color="secondary"
                        startIcon={<DeleteOutlineIcon />}
                    >
                      Удалить
                    </Button>
                    <Tooltip title="Delete" className={'ml-auto'}>
                      <IconButton className={'helpButton c455A64 fontGR p-2'} onClick={() => setSelected([])} >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Hidden>
                <Hidden only={["md", "lg", "xl"]}>
                  <div className={`w-100 fontGR helpSelect2 align-items-center mt-3 c274C77 fS14 ${selected.length > 0 ? "d-flex" : "d-none"}`}>
                    <div className={'w-100'}>
                      Выбрано кампаний <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
                    </div>

                    <IconButton size="small" className={'helpButton small c274C77'}>
                      <GetAppIcon />
                    </IconButton>

                    <IconButton size="small" className={'helpButton small c274C77'}>
                      <FileCopyIcon />
                    </IconButton>

                    <IconButton size="small" className={'helpButton small c274C77'}>
                      <DeleteOutlineIcon />
                    </IconButton>

                    <Tooltip title="Delete" className={'ml-auto'}>
                      <IconButton size="small" className={'helpButton small c274C77 p-2'} onClick={() => setSelected([])}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Hidden>

                <>
                  <Hidden only={["xs"]}>

                    <TableContainer className={"px-4 bgcfff pt-4"}>
                      <Table
                          className={`${classes.table}`}
                          aria-labelledby="tableTitle"
                          size={'medium'}
                          aria-label="enhanced table"
                      >

                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={10}
                            handleClickOpenDialog={handleClickOpenDialog}
                            checkedList={checkedList}
                        />
                        <TableBody>
                          {!campaignDataIsLoading && !!dataTable ? stableSort(dataTable, getComparator(order, orderBy))
                              //.slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        //
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id + "row"}
                                        selected={isItemSelected}
                                        classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}

                                    >
                                      <TableCell padding="checkbox" className={classes.rowPadding} style={{ padding: '6px 0 5px 0' }} >
                                        <Checkbox
                                            classes={{ checked: classes.CheckboxChecked }}
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            onChange={event => handleClick(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell style={{ maxWidth: 100 }} padding="none">
                                        {(row.status === "running" && (moment().unix() + moment().utcOffset() * 60) < row.start) ?
                                            (<Box className="fontGM text-nowrap" style={{ color: isStatus("pending") }} >
                                              <FormattedMessage id={"STATUS.pending"} />
                                            </Box>) : (<Box className="fontGM text-nowrap" style={{ color: isStatus(row.status) }} >
                                              <FormattedMessage id={"STATUS." + row.status} />
                                            </Box>)}
                                      </TableCell>
                                      <TableCell component="th" scope="row" padding="none" className={'c455A64'}>
                                        {usersDataV[row.user_id]}
                                      </TableCell>
                                      <TableCell component="th" id={labelId} scope="row" padding="none" className={'c448AFF'}>
                                        <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                              to={`/campaign/view/${row.id}`}>
                                          {row.title}
                                        </Link>
                                      </TableCell>
                                      <TableCell component="th" scope="row" padding="none">
                                        {dataShowsReserved[row.id] !== undefined ? dataShowsReserved[row.id] : <CircularProgress style={{ "height": 20, "width": 20 }} />}
                                      </TableCell>
                                      <TableCell align="left" className={classes.text2} padding="none">
                                        {dataShows[row.id] !== undefined && !campaignStatIsLoading ?
                                            dataShows[row.id] :
                                            !!dataShows.length && !campaignStatIsLoading ? "0" : <CircularProgress style={{ "height": 20, "width": 20 }} />}
                                      </TableCell>
                                      <TableCell align="left" className={`${classes.text} c455A64`} padding="none">
                                        <Moment format="DD.MM.YYYY/HHч" tz="UTC" unix>
                                          {row.start}
                                        </Moment>
                                      </TableCell>
                                      <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                        <Moment format="DD.MM.YYYY/HHч" tz="UTC" unix>
                                          {row.end}
                                        </Moment>
                                      </TableCell>


                                      {checkedList.indexOf('reserved') !== -1 &&
                                          <TableCell align="left" className={classes.text}>{row.placed}</TableCell>
                                      }

                                      {checkedList.indexOf('device') !== -1 &&
                                          <TableCell align="left" className={classes.text}>{row.boards.length}</TableCell>
                                      }

                                      {checkedList.indexOf('seconds') !== -1 &&
                                          <TableCell align="left" className={classes.text}>{row.creativeDuration}</TableCell>
                                      }

                                      {checkedList.indexOf('blocklength') !== -1 &&
                                          <TableCell align="left" className={classes.text}>{row.blength}</TableCell>
                                      }

                                      {checkedList.indexOf('blockshows') !== -1 &&
                                          <TableCell align="left" className={classes.text}>{row.amountInBlock}</TableCell>
                                      }

                                      <TableCell align="right" padding="none">{row.protein}</TableCell>
                                    </TableRow>
                                );
                              }) : null}

                          {campaignDataIsLoading ? [...Array(10)].map((x, i) =>
                              <TableRow style={{ height: 54 }} key={"emptyrow" + i} >
                                <TableCell align="left" className={classes.text} padding="none" colSpan={100}>
                                  <Skeleton variant="rounded" width={"100%"} height={30} />
                                </TableCell>
                              </TableRow>
                          ) : null}

                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Hidden>
                  <Hidden only={["sm", "md", "lg", "xl"]}>
                    <div className={'px-3 bgcfff pt-3'}>
                      <div className={'d-flex align-items-center mb-4 mt-3 ml-3'}>
                        <Checkbox
                            classes={{ checked: classes.CheckboxChecked }}
                            //checked={isItemSelected}
                            //inputProps={{'aria-labelledby': labelId}}
                            className={'pl-0'}
                            //onChange={event => handleClick(event, row.id)}
                        />
                        <FormControl className={'w-100 minHeight40'} variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">Сортировать по</InputLabel>
                          <Select
                              id="demo-simple-select-helper"
                              label="Сортировать по"
                              value={setting.mobSortStatus}
                              onChange={(e) => setSetting({ ...setting, mobSortStatus: e.target.value })}
                          >
                            <MenuItem value={0}>Дате начала</MenuItem>
                            <MenuItem value={1}>Статусу</MenuItem>
                          </Select>
                        </FormControl>
                        <IconButton className={'p-2'}>
                          <ArrowUpwardIcon className={''} />
                        </IconButton>
                      </div>
                      {!!dataTable ? stableSort(dataTable, getComparator(order, orderBy))
                          .slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <div className={'campMobCart'}>

                                  <div className={'flex align-items-center item fS14 c455A64'}>
                                    <div className={'status d-flex align-items-center'}>
                                      <Checkbox
                                          classes={{ checked: classes.CheckboxChecked }}
                                          checked={isItemSelected}
                                          inputProps={{ 'aria-labelledby': labelId }}
                                          className={'pl-0'}
                                          onChange={event => handleClick(event, row.id)}
                                      />
                                      <div className={'item '}>{row.status}</div>
                                    </div>

                                    <div className={'mb-1 d-flex align-items-center item new-string w-100'}>
                                      <div className={'mr-auto'}>{usersDataV[row.user_id]}</div>
                                      <div>
                                        <Moment format="DD.MM.YYYY/HHч" tz="UTC" unix>
                                          {row.start}
                                        </Moment>
                                      </div>
                                    </div>

                                    <div className={'d-flex align-items-center item new-string w-100'}>
                                      <div className={'c448AFF mr-auto'}>
                                        <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                              to={`/campaign/view/${row.id}`}>
                                          {row.title}
                                        </Link>
                                      </div>
                                      <div>
                                        <Moment format="DD.MM.YYYY/HHч" tz="UTC" unix>
                                          {row.end}
                                        </Moment>
                                      </div>
                                    </div>

                                    <div className={'item new-string w-100 mt-4 mb-3'}>
                                      <div>45654646</div>
                                    </div>

                                    <div className={'d-flex align-items-center item new-string w-100'}>
                                      <div className={'c78909C fS13'}>Показы</div>
                                      <div className={'ml-2'}>{row.showedJS !== undefined ? row.showedJS : <CircularProgress style={{ "height": 20, "width": 20 }} />}</div>
                                    </div>
                                  </div>


                                </div>
                            )
                          }) : null}
                    </div>
                  </Hidden>
                </>
                {!!campCount && campCount > 10 ?
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={campCount}
                        rowsPerPage={10}
                        page={setting.page}
                        onPageChange={handleChangePage}
                        style={{ paddingBottom: 20 }}
                        //onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> : null
                }
              </Paper>
            </>
        ) : null}

        <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog} scroll={'body'} >
          <div className={'Wdialog'}>

            <div className={'d-flex'}>
              <div>
                <div className={'fS18 c212121'}>Столбцы</div>
                <div className={'fS14 c546E7A mt-2 w-75'}>Выберите, параметры, которые хотите отслеживать в таблице списка кампаний</div>
              </div>
              <div className={'fS14 c455A64 cursor-pointer'} onClick={() => setCheckedList(checkedList.length > 4 ? [] : ['reserved', 'device', 'seconds', 'blocklength', 'blockshows'])}>{checkedList.length > 4 ? "Отменить всё" : "Выбрать всё"}</div>
            </div>

            <List dense={true} className={`rootList mt-4 d-flex flex-wrap`}>
              {headCells.map((value) => {
                if (!value.filter) {
                  return;
                }
                const labelId = `checkbox-list-label-${value.field}`;
                return (
                    <ListItem key={value.field} role={undefined} dense button
                              disableGutters={true}
                              className={'w-50'}
                              onClick={handleToggleList(value.field)}>
                      <ListItemIcon style={{ minWidth: 'auto' }}>
                        <Checkbox
                            edge="start"
                            checked={checkedList.indexOf(value.field) !== -1}
                            tabIndex={-1}
                            disableRipple
                            color="primary"
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.label} />
                    </ListItem>
                );
              })}
            </List>
          </div>
          <DialogActions className={'mb-3'}>
            <Button className={`btn tTraN mr-auto ml-auto startButton `} onClick={handleCloseDialog} >
              <Box fontSize={14} fontWeight={500} className={'text-center'}>Применить</Box>
            </Button>
          </DialogActions>

          <div className={'Wdialog'}>
            <div>
              <div>
                <div className={'fS18 c212121'}>Yandex Disk</div>
                <div className={'fS14 c546E7A mt-2 w-75'}>Подключите Yandex Disk</div>
              </div>
            </div>
            <div className="rightSide_appBar mt-3" >

              <List dense={true} className={`rootList mt-4 d-flex flex-wrap`}>
                <ListItem key={"handleYandexDisk"} role={undefined} dense button
                          disableGutters={true}
                          className={'w-50'}
                          onClick={handleYandexDisk("hYandexDisk")}>
                  <ListItemIcon style={{ minWidth: 'auto' }}>
                    <Checkbox
                        edge="start"
                        checked={settingY.yandexDisk}
                        tabIndex={-1}
                        disableRipple
                        color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Yandex Disk"} />
                </ListItem>
                {currentUser.id === 4 ?
                    <ListItem key={"handleYandexDiskG"} role={undefined} dense button
                              disableGutters={true}
                              className={'w-50'}
                              onClick={handleYandexDisk("hYandexDiskG")}>
                      <ListItemIcon style={{ minWidth: 'auto' }}>
                        <Checkbox
                            edge="start"
                            checked={settingY.yandexDiskGallary}
                            tabIndex={-1}
                            disableRipple
                            color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText primary={"Yandex Disk Gallery"} />
                    </ListItem> : null
                }
                {currentUser.id === 4 ?
                    <ListItem key={"handleYandexDiskGuys"} role={undefined} dense button
                              disableGutters={true}
                              className={'w-50'}
                              onClick={handleYandexDisk("hYandexDiskGuys")}>
                      <ListItemIcon style={{ minWidth: 'auto' }}>
                        <Checkbox
                            edge="start"
                            checked={settingY.yandexDiskGuys}
                            tabIndex={-1}
                            disableRipple
                            color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText primary={"Yandex Disk Парни"} />
                    </ListItem> : null
                }
                {currentUser.id === 4 ?
                    <ListItem key={"handleYandexDiskOohDesk"} role={undefined} dense button
                              disableGutters={true}
                              className={'w-50'}
                              onClick={handleYandexDisk("hYandexDiskOohDesk")}>
                      <ListItemIcon style={{ minWidth: 'auto' }}>
                        <Checkbox
                            edge="start"
                            checked={settingY.yandexDiskOohDesk}
                            tabIndex={-1}
                            disableRipple
                            color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText primary={"Yandex Disk OohDesk"} />
                    </ListItem> : null
                }
              </List>
            </div>

          </div>

        </Dialog>

        {currentTab === 2 && (
            <Grid className="kt-portlet">
              <Grid className="kt-portlet__head">
                <Grid className="kt-portlet__head-toolbar">
                  <Grid style={{ alignSelf: "center" }}>
                    <button
                        className="btn btn-clean btn-md btn-icon btn-icon-md"
                        onClick={handleClick7}
                    >
                      <LightTooltip title="Отсортировать">
                        <i className="fa fa-sort-amount-up"></i>
                      </LightTooltip>
                    </button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl7}
                        keepMounted
                        open={open7}
                        onClose={handleClose7}
                        TransitionComponent={Fade}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                    >
                      <MenuItem
                          onClick={() => handleClose7("by_creation_date")}
                          classes={{ root: classes.menuItem }}
                      >
                        По дате создания
                      </MenuItem>
                      <MenuItem
                          onClick={() => handleClose7("by_budget")}
                          classes={{ root: classes.menuItem }}
                      >
                        По бюджету
                      </MenuItem>
                      <MenuItem
                          onClick={() => handleClose7("by_shows")}
                          classes={{ root: classes.menuItem }}
                      >
                        По показам
                      </MenuItem>
                      <MenuItem
                          onClick={() => handleClose7("by_status")}
                          classes={{ root: classes.menuItem }}
                      >
                        По статусу
                      </MenuItem>
                    </Menu>
                  </Grid>
                  <Grid style={{ alignSelf: "center" }}>
                    <LightTooltip title="Фильтр">
                      <button
                          className="btn btn-clean btn-md btn-icon btn-icon-md"
                          onClick={() => setFilterModal(true)}
                      >
                        <i className="flaticon-more-1" />
                      </button>
                    </LightTooltip>
                  </Grid>
                </Grid>
              </Grid>


              {!!dataReklamodatel.meta && dataReklamodatel.meta.pages > 1 && (
                  <Pagination
                      activePage={currentPage2}
                      itemsCountPerPage={dataReklamodatel.meta.perpage}
                      totalItemsCount={
                          !!dataReklamodatel.meta && dataReklamodatel.meta.total
                      }
                      pageRangeDisplayed={5}
                      prevPageText="<"
                      nextPageText=">"
                      onChange={newPage => setCurrentPage2(newPage)}
                  />
              )}

            </Grid>
        )}
      </>
  );
};


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, handleClickOpenDialog, checkedList } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
      <TableHead classes={{ root: classes.TableHead }}>
        <TableRow className={'TableRow'}>
          <TableCell padding="none">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => {
            if (checkedList.indexOf(headCell.field) !== -1 || !headCell.filter) {
              return <TableCell
                  width={headCell.width}
                  style={{ minWidth: headCell.minwidth }}
                  key={headCell.field + 'cam'}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                  <div className={'headCellLabel text-nowrap'}>{headCell.label}</div>
                  {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                    {order === 'desc' ? '' : ''}
                  </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            }
          })}

          <TableCell
              width={30}
              padding={'none'}
              align={'right'}
          >
            <IconButton className={'helpButton c0277BD noM'} onClick={handleClickOpenDialog} >
              <MoreVertIcon />
            </IconButton>
          </TableCell>

        </TableRow>
      </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginBottom: '4px',
    marginTop: '12px',
    [theme.breakpoints.down('sm')]: {
      display: "block"
    },
  },
  highlight: {
    color: "#fff",
    backgroundColor: "#000E40",
    margin: '0 25px',
    minHeight: '32px',
    borderRadius: '2px'
  },
  title2: {
    flex: '1 1 100%'
  },

  search: {
    borderBottom: "1px solid #E0E0E0",
    marginRight: 52,
    marginLeft: 0,
    padding: '5px 0 4px 0',
    [theme.breakpoints.up('md')]: {
      marginLeft: 33,
      width: "100%",
      marginRight: 25,
    },
  },
  searchIcon: {
    padding: "0px 16px 0 8px",
    marginTop: '6px',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#78909C"
  },
  inputRoot: {
    color: '#919699 !important',
    fontSize: "15px"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: 'calc(100% - 100px)',
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
  },
  pageHeader: {
    fontSize: "26px",
    color: "#454545",
    [theme.breakpoints.down('sm')]: {
      fontSize: "20px",
    },
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { setFilterNamePre } = props;
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState(null);
  const handleCheck = (val) => {
    clearTimeout(timer);
    let t = setTimeout(() => {
      setFilterNamePre(val);
    }, 800);
    setTimer(t);
  }
  return (
      <Toolbar
          className={`${clsx(classes.root)} px-4`}
      >
        <div className={classes.pageHeader}>
          Кампании
        </div>
        <div className={`${classes.search}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
              placeholder="Искать кампанию"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleCheck(e.target.value);
              }}
              className={'w-100'}
              endAdornment={function () {
                if (searchValue != '') {
                  return <InputAdornment position="end" className={'cursor-pointer'} onClick={() => {
                    setSearchValue('');
                    handleCheck('');
                  }}>
                    <CloseIcon style={{ color: '#448AFF' }} />
                  </InputAdornment>
                }
              }()}
          />
        </div>

        <Tooltip title="Создать кампанию" className={`createBT`}>
          <Link to="/campaign/new-create">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Toolbar>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser,
  token: store.auth.authTokenG,
});


export default withRouter(connect(mapStateToProps)(Campaign));

