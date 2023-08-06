import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    makeStyles,
    Box,
    Tooltip,
    Grid, ListItemSecondaryAction, ListItemText, Toolbar,
    Divider, ListItemIcon, List, ListItem,
    Dialog, InputBase, TableHead, TableSortLabel, Button,
    DialogTitle, TextField, DialogContentText,
    DialogActions, IconButton, TableContainer, Table, Card, CardActions, CardContent,
    Hidden, Fab, TableBody, TableRow, TableCell, Checkbox, TablePagination,
    withStyles, Typography, Paper, AppBar, Tabs, Tab, fade, LinearProgress, InputAdornment, withWidth, isWidthUp
} from "@material-ui/core";
// import Pagination from "react-js-pagination";
// import Select from "react-select";

// import RadioDesktop from "../../components/devices/RadioDesktop";
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
// import DevicesDesktop from "../../components/devices/DevicesDesktop";
// import DevicesTablet from "../../components/devices/DevicesTablet";
// import DevicesMobile from "../../components/devices/DevicesMobile";
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import Menu from "../../components/devices/menu";
// import DevicesMap from "./map";
// import {dropdownStyles} from "../../utils";
import { Link, withRouter } from "react-router-dom";
// import {Modal} from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
//import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
// import Moment from "react-moment";
import AddIcon from '@material-ui/icons/Add';
// import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
// import DeleteIcon from '@material-ui/icons/Delete';

import SearchIcon from '@material-ui/icons/Search';


import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import deLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
var moment = require("moment");

const useStyles = makeStyles((theme) => ({
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
    headCellLabel: {
        color: '#000E40',
        fontSize: '13px',
    },
    TableHead: {},
    TableRow: {
        height: '58px',
    },
    text: {
        fontSize: '13px',
        fontWeight: 500,
        paddingLeft: 6,
        paddingRight: 6
    },
    text2: {
        fontSize: '13px',
        fontWeight: 500,
        color: '#42556B',
        paddingLeft: 6,
        paddingRight: 6
    },
    TableCellNameA: {
        fontSize: '13px',
        color: '#0075FF',
        fontWeight: 500
    },
    TableRowBody: {
        padding: "0 25px"
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
    paper: {
        backgroundColor: 'unset',
        boxShadow: 'none!important'
    },
    helpSelect: {
        position: 'absolute',
        backgroundColor: '#405465 !important',
        width: '100%',
        color: '#fff',
        padding: '0 20px',
        [theme.breakpoints.down("xs")]: {
            position: 'fixed',
            bottom: 0
        }
    },
    filterIcon: {
        position: 'absolute',
        left: '330px'
    },
    rootList: {
        width: '100%',
        maxWidth: 760,
        minWidth: 360,
    },
    DialogContent: {
        padding: 0
    },
    rootCard: {
        padding: '4px 12px',
        margin: 12
    },
    rootCardContent: {
        padding: 0
    },
    cityMob: {
        fontSize: 10,
        textTransform: 'uppercase!important'
    },
    startButton: {
        color: '#fff',
        fontSize: "14px",
        backgroundColor: "#0277BD",
        borderRadius: "4px",
        width: "129px",
        border: "1px solid #0277BD",
        padding: "7px 0 7px 0",
        "&:hover": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.8) !important",
        },
        "&:active": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.95) !important",
        }
    },
    loader: {
        position: 'absolute',
        width: '100%',
        top: 0
    },
    date: {
        height: 35
    }
}));

const headCells = [
    {
        field: 'name',
        label: "Название",
        sublabel: "Название рекламной кампании",
        width: 400,
        minW: 220,
        numeric: false,
        disablePadding: true,
        filter: false
    },
    {
        field: 'status',
        label: "Статус",
        sublabel: "Завершенность",
        width: 200,
        numeric: false,
        disablePadding: false,
        filter: false
    },
    {
        field: 'city',
        label: "Город",
        sublabel: "Дата начала",
        width: 200,
        numeric: false,
        disablePadding: true,
        filter: true
    },
    {
        field: 'id',
        label: "ID устройства",
        sublabel: "Дата начала",
        width: 200,
        numeric: false,
        disablePadding: false,
        filter: true
    },
    {
        field: 'address',
        label: "Адрес",
        sublabel: "Дата начала",
        width: 200,
        numeric: false,
        disablePadding: true,
        filter: true
    },
    {
        field: 'type',
        label: "Тип устройства",
        sublabel: "Дата начала",
        width: 200,
        numeric: false,
        disablePadding: false,
        filter: true
    },
    {
        field: 'ori',
        label: "Ориентация",
        sublabel: "Дата начала",
        width: 200,
        numeric: false,
        disablePadding: true,
        filter: true
    },
    {
        field: 'res',
        label: "Разрешение",
        sublabel: "Дата окончания",
        width: 200,
        numeric: false,
        disablePadding: false,
        filter: true
    },
    {
        field: 'size',
        label: "Габариты",
        sublabel: "Дата окончания",
        width: 200,
        numeric: false,
        disablePadding: true,
        filter: true
    },
    {
        field: 'time',
        label: "Часы работы",
        width: 200,
        numeric: false,
        disablePadding: false,
        filter: true
    },
    { field: 'profit', label: "Заработано", minwidth: 150, width: "10%", align: 'right', disablePadding: true, filter: true },
    { field: 'shows', label: "Сделано показов", minwidth: 120, width: "14%", align: 'right', disablePadding: true, filter: true },
    { field: 'reserShows', label: "Забронированно показов", minwidth: 120, width: "14%", align: 'right', disablePadding: true, filter: true },
    { field: 'camps', label: "Кол-во участвующих кампаний", minwidth: 235, width: "13%", align: 'right', disablePadding: true, filter: true },
    { field: 'freesec', label: "% свободного эфира", minwidth: 120, width: "10%", align: 'right', disablePadding: true, filter: true },
    { field: 'reservedsec', label: "% забронированного эфира", minwidth: 220, width: "15%", align: 'right', disablePadding: true, filter: true },
    { field: 'ots', label: "OTS", minwidth: 100, width: "10%", align: 'right', disablePadding: false, filter: true },
    { field: 'grp', label: "GRP", minwidth: 100, width: "10%", align: 'right', disablePadding: true, filter: true },
];

const Devices = props => {
    const { user, currentUser } = props;

    const [showMap, setShowMap] = useState(false);
    const [boardsData, setBoardsData] = useState({});
    //const [radioData,  setRadioData] = useState({});
    const [resolutionData, setResolutionData] = useState({});
    const [photoData, setPhotoData] = useState([]);

    // const [page, setPage] = React.useState(0);
    const [sortTooltip, setSortState] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [filterCity, setFilterCity] = useState([]);
    const [filterResolution, setFilterResolution] = useState([]);
    // const [filterName, setFilterName] = useState("");
    const [currentSort, setCurrentSort] = useState(null);
    const [boardCount, setBoardCount] = useState(0);
    const [loaderShow, setLoaderShow] = useState(true);
    //const [filterStatuses, setFilterStatuses] = useState(0);
    const [setting, setSetting] = useState({
        filterName: "",
        page: 0,
        filterStatuses: 0
    });

    function setFilterNamePre(val) {
        setBoardsData({})
        setSetting({ ...setting, page: 0, filterName: val });
        //setPage(0);
        // setFilterName(val);
    }

    const classes = useStyles();
    useEffect(() => {
        document.title = "Устройства / " + process.env.REACT_APP_COMPANY;
        //if (user.role == "radio") {
        //  getRadio();
        //} else {
        setLoaderShow(true);
        getBoards();
        //}
    }, [currentSort, setting]);

    const [anchorEl7, setAnchorEl7] = React.useState(null);
    const open7 = Boolean(anchorEl7);

    function handleClick7(event) {
        setAnchorEl7(event.currentTarget);
    }

    function handleClose7(type) {
        console.error(typeof type);
        if (typeof type == "string") {
            setCurrentSort(type);
        }
        setAnchorEl7(null);
    }

    const preSetResolutionData = data => {
        if (!!data && !!data.allBoards) {
            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.allBoards.length; i++) {
                if (!unique[data.allBoards[i].resolution]) {
                    distinct.push({
                        value: data.allBoards[i].resolution,
                        label: data.allBoards[i].resolution
                    });
                    unique[data.allBoards[i].resolution] = 1;
                }
            }
            distinct.sort(function (a, b) {
                return a.value.split("x")[0] - b.value.split("x")[0];
            });
            setResolutionData(distinct);
        }
    };
    const preSetPhotoData = data => {
        if (!!data && !!data.photo) {
            var photo = [];
            for (var key in data.photo) {
                photo[data.photo[key].board_id] = data.photo[key];
            }
            setPhotoData(photo);
        }
    };
    const LightTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[1],
            fontSize: 13
        }
    }))(Tooltip);

    const getRadio = async () => {
        try {
            let cityStr = "";
            let resolutionStr = "";

            let res = await axios.get(
                `/myboards/radio?page=${setting.page + 1}&subuser=${currentUser.id
                }${!!currentSort ? `&sort=${currentSort}` : ""}${!!filterCity.length ? `&city=${cityStr}` : ""
                }${!!setting.filterName ? `&title=${setting.filterName}` : ""}`
            );
            setBoardsData(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    const getBoards = async () => {
        try {
            let cityStr = "";
            let resolutionStr = "";
            if (!!filterCity.length) {
                filterCity.forEach((city, index) => {
                    if (index === 0) {
                        cityStr += `${city.value}`;
                    } else {
                        cityStr += `,${city.value}`;
                    }
                });
            }
            if (!!filterResolution.length) {
                filterResolution.forEach((resolution, index) => {
                    if (index === 0) {
                        resolutionStr += `${resolution.value}`;
                    } else {
                        resolutionStr += `,${resolution.value}`;
                    }
                });
            }
            let res = await axios.get(
                `/myboards?page=${setting.page + 1}&subuser=${currentUser.id
                }${!!currentSort ? `&sort=${currentSort}` : ""}${!!filterCity.length ? `&city=${cityStr}` : ""
                }${!!filterResolution.length ? `&resolution=${resolutionStr}` : ""}${!!setting.filterName ? `&title=${setting.filterName}` : ""
                }${`&status=${statuses[setting.filterStatuses]}`}`
            );


            if (setting.page > 0) {
                let boardN = [];
                res.data.boards.forEach((value, index) => {
                    boardN[setting.page * 10 + index] = value;
                })
                res.data.boards = boardN;
            }

            preSetPhotoData(res.data);
            preSetResolutionData(res.data);


            if (Object.keys(boardsData).length > 0) {
                let newB = { ...boardsData };
                res.data.boards.map((value, key) => {
                    newB.boards[key] = value;
                })

                console.log('Object.keys(data).length');
                console.log(newB);

                setBoardsData(newB);
            } else {

                console.log('Object.keys(data).length11111111');
                console.log(res.data);

                setBoardsData(res.data);
            }


            if (!!res.data && !!res.data.meta && !!res.data.meta.total && res.data.meta.total > 0) {
                if (boardCount == 0) {
                    setBoardCount(res.data.meta.total);
                }
            }


            setLoaderShow(false)

        } catch (err) {
            console.error(err);
        }
    };
    const statuses = ["all", "public", "private"];

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
            const newSelecteds = boardsData.boards.map((n) => n.id);
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
        setSetting({ ...setting, page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (!!boardsData.boards ? boardsData.boards.length : 0) - setting.page * rowsPerPage);


    const handleChange = (event, newValue) => {
        if (newValue != setting.filterStatuses && newValue != 3) {
            console.log('newValuenewValue')
            console.log(newValue)
            setBoardsData({})
            //setPage(0);
            // let filterStatus = statuses.filter(item => item.label == valueTab );
            //setFilterStatuses(newValue);
            setSetting({ ...setting, page: 0, filterStatuses: newValue });
            // setValueTab(newValue);
        }
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


    ///dialog
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    /// dialog List
    const [checkedList, setCheckedList] = React.useState(['city', 'res', 'size']);
    const handleToggleList = (value) => () => {
        const currentIndex = checkedList.indexOf(value);
        const newChecked = [...checkedList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedList(newChecked);
    };


    const [selectedDate, handleDateChange] = useState(null);
    const [selectedDateEnd, handleDateChangeEnd] = useState(null);
    const [filter, setFilterData] = useState({
        companyStartDate: "",
        companyEndDate: ""
    });

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <>
            {!!boardsData.boards && !Object.keys(boardsData.boards).length && boardCount == 0 &&
                <div className={classes.rootEmpty}>
                    <Typography style={{ 'margin-bottom': 10 }}>Добавить устройство</Typography>
                    <Link to="/myboards/add">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            }

            {boardCount != 0 && (
                <>
                    <EnhancedTableToolbar {...props} count={selected.length} setFilterName={setFilterNamePre} />
                    <Paper className={'paper'}>


                        <AppBar position="static" color="default" className={`AppBar mt-3`}>
                            <Tabs
                                value={setting.filterStatuses}
                                onChange={handleChange}
                                className={"tabsMenu ml-4"}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                            >
                                <Tab label="Все" />
                                <Tab label="Доступные" />
                                <Tab label="Приватные" />
                            </Tabs>
                            {loaderShow === true && <LinearProgress className={classes.loader} />}
                        </AppBar>
                        <div className={`d-flex align-items-end justify-content-end pr-4 ${classes.date}`}>
                            <div className={'c5E6366 fS16 fontGR mr-2'}>Период</div>
                            <div className={'c5E6366 fS16 mr-2'} style={{ width: 84 }}>
                                <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                                    <DatePicker
                                        disableToolbar
                                        variant="inline"
                                        value={selectedDate == null ? moment().toDate() : selectedDate}
                                        format="dd.MM.yyyy"
                                        minDate={moment().toDate()}
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
                                        value={selectedDateEnd == null ? moment().add(10, "days").toDate() : selectedDateEnd}
                                        format="dd.MM.yyyy"
                                        minDate={moment().add(10, "days").toDate()}
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
                                    <IconButton className={'helpButton c455A64 fontGR'} onClick={() => setSelected([])} className={'p-2'}>
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
                                    <IconButton size="small" className={'helpButton small c274C77'} onClick={() => setSelected([])} className={'p-2'}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Hidden>

                        <Hidden only={["xs"]}>
                            <TableContainer className={"px-4 bgcfff pt-4"}>

                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={'medium'}
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHead
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        checkedList={checkedList}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        handleClickOpenDialog={handleClickOpenDialog}
                                        rowCount={10}
                                    />
                                    {!!boardsData.boards && Object.keys(boardsData.boards).length > 0 &&
                                        <TableBody>
                                            {stableSort(boardsData.boards, getComparator(order, orderBy))
                                                .slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const isItemSelected = isSelected(row.id);
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row.id)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.id}
                                                            selected={isItemSelected}
                                                            classes={{
                                                                root: classes.TableRowBody,
                                                                selected: classes.TableRowBodyS
                                                            }}
                                                        >
                                                            <TableCell padding="checkbox" className={classes.rowPadding} style={{ padding: '6px 0 5px 4px' }} >
                                                                <Checkbox
                                                                    classes={{ checked: classes.CheckboxChecked }}
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row"
                                                                padding="none" style={{ padding: '7px 0 6px 0', maxWidth: 250, overflow: "hidden", minWidth: 250 }}>
                                                                <Link
                                                                    className={`C-NameHover ${classes.TableCellNameA}`}
                                                                    to={`/myboards/view/${row.id}`}>
                                                                    {row.title}
                                                                </Link>
                                                            </TableCell>

                                                            <TableCell align="left" className={classes.text2}>
                                                                <div className={'d-flex'}>
                                                                    {row.private == 0 || row.private == null ? "Приватный" : "Общий"}
                                                                </div>
                                                            </TableCell>

                                                            {checkedList.indexOf('city') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {!!row.city && (
                                                                        <FormattedMessage id={"CITY_" + row.city} />
                                                                    )}
                                                                </TableCell>
                                                            }
                                                            {checkedList.indexOf('id') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {row.id}
                                                                </TableCell>
                                                            }
                                                            {checkedList.indexOf('address') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {row.address}
                                                                </TableCell>
                                                            }
                                                            {checkedList.indexOf('type') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {row.type}
                                                                </TableCell>
                                                            }

                                                            {checkedList.indexOf('ori') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    Гор
                                                                </TableCell>
                                                            }

                                                            {checkedList.indexOf('res') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {row.resolution}
                                                                </TableCell>
                                                            }

                                                            {checkedList.indexOf('size') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>
                                                                    {" "}
                                                                    {parseFloat((row.width / 100).toFixed(2))}x
                                                                    {parseFloat((row.height / 100).toFixed(2))}
                                                                </TableCell>
                                                            }

                                                            {checkedList.indexOf('time') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{row.hours}</TableCell>
                                                            }

                                                            {checkedList.indexOf('profit') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(100, 30000)}₽</TableCell>
                                                            }

                                                            {checkedList.indexOf('shows') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(1000, 300000)}</TableCell>
                                                            }

                                                            {checkedList.indexOf('reserShows') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(1000, 300000)}</TableCell>
                                                            }

                                                            {checkedList.indexOf('camps') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(1, 30)}</TableCell>
                                                            }

                                                            {checkedList.indexOf('freesec') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(1, 100)}%</TableCell>
                                                            }

                                                            {checkedList.indexOf('reservedsec') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>{getRandomArbitrary(1, 100)}%</TableCell>
                                                            }

                                                            {checkedList.indexOf('ots') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>10</TableCell>
                                                            }

                                                            {checkedList.indexOf('grp') !== -1 &&
                                                                <TableCell align="left" className={classes.text}>20</TableCell>
                                                            }

                                                            <TableCell align="left" className={classes.text}> </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: (53 * emptyRows) }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    }
                                </Table>
                            </TableContainer>
                        </Hidden>

                        {!!boardsData.boards && Object.keys(boardsData.boards).length > 0 &&
                            <>
                                <Hidden only={["sm", "md", "lg", "xl"]}>
                                    {stableSort(boardsData.boards, getComparator(order, orderBy))
                                        .slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            return <Card className={classes.rootCard} key={index + "board"}>
                                                <CardContent classes={{ root: classes.rootCardContent }}>
                                                    <div className={'d-flex my-2 align-items-center row'}>
                                                        <div className={'col-2 px-0'}>
                                                            <Checkbox
                                                                classes={{ checked: classes.CheckboxChecked }}
                                                                checked={isItemSelected}
                                                                onChange={(event) => handleClick(event, row.id)}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`col-5 px-0 ${classes.text}`}>{row.private == 0 || row.private == null ? "Приватный" : "Общий"}</div>
                                                        <div className={`col-5 px-0 ${classes.text}`}></div>
                                                    </div>
                                                    <Typography className={classes.cityMob} color="textSecondary">
                                                        {!!row.city && (
                                                            <FormattedMessage id={"CITY_" + row.city} />
                                                        )}
                                                    </Typography>

                                                    <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                                        to={`/myboards/view/${row.id}`}>
                                                        <Typography variant="body2" component="p"
                                                            style={{ color: '#004fff' }}>
                                                            {row.title}
                                                        </Typography>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        })}
                                </Hidden>
                                {!!boardsData.meta && boardsData.meta.total > 10 &&
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={boardsData.meta.total}
                                        rowsPerPage={rowsPerPage}
                                        page={setting.page}
                                        onChangePage={handleChangePage}
                                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                }
                            </>
                        }

                    </Paper>
                </>
            )}

            <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog}  >
                <div className={'Wdialog'}>

                    <div className={'d-flex'}>
                        <div>
                            <div className={'fS18 c212121'}>Столбцы</div>
                            <div className={'fS14 c546E7A mt-2 w-75'}>Выберите, параметры, которые хотите отслеживать в таблице списка устройств</div>
                        </div>
                        <div className={'fS14 c455A64 cursor-pointer'} onClick={() => setCheckedList(checkedList.length > 12 ? [] : ['city', 'id', 'address', 'type', 'ori', 'res', 'size', 'time', 'reserved', 'device', 'seconds', 'blocklength', 'blockshows', 'profit', 'shows', 'reserShows', 'camps', 'freesec', 'reservedsec', 'ots', 'grp'])}>{checkedList.length > 12 ? "Отменить всё" : "Выбрать всё"}</div>
                    </div>

                    <List dense={true} className={`${classes.rootList} mt-4 d-flex flex-wrap`}>
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
                <DialogActions className={'mb-4'}>
                    <Button className={`btn tTraN mr-auto ml-auto ${classes.startButton} `} onClick={handleCloseDialog} >
                        <Box fontSize={14} fontWeight={500} className={'text-center'}>Применить</Box>
                    </Button>
                </DialogActions>
            </Dialog>

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
                <TableCell padding="checkbox">
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
                            //width={headCell.width}
                            //style={{minWidth:headCell.minwidth}}
                            key={headCell.field + 'cam'}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={'none'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            className={'px-2'}
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
    const { setFilterName, count, setOpen } = props;
    const [searchValue, setSearchValue] = useState("");
    const [timer, setTimer] = useState(null);
    const handleCheck = (val) => {
        clearTimeout(timer);
        let t = setTimeout(() => {
            setFilterName(val);
        }, 800);
        setTimer(t);
    }

    return (
        <Toolbar
            className={`${clsx(classes.root)} px-4`}
        >
            <div className={classes.pageHeader}>
                Устройства
            </div>
            <div className={`${classes.search}`}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск устройства"
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
                                <CloseIcon style={{ color: '#004fff' }} />
                            </InputAdornment>
                        }
                    }()}
                />
            </div>
            <Tooltip title="Добавить устройство" className={`createBT`}>
                <Link to="/myboards/add">
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
    currentUser: store.auth.currentUser
});

export default withWidth()(injectIntl(withRouter(connect(mapStateToProps)(Devices))));
