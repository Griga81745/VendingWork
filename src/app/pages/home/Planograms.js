import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Checkbox,
    makeStyles,
    Box,
    Tooltip,
    Divider,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Hidden,
    withStyles,
    Card,
    CardContent,
    TablePagination,
    Toolbar,
    InputBase,
    TableSortLabel,
    withWidth,
    useTheme,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    AppBar,
    Tabs,
    Tab,
    fade,
    InputAdornment,
    LinearProgress,
    CircularProgress,
    FormControl,
    InputLabel,
    Select, MenuItem
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import { useQuery } from 'react-query';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Moment from "react-moment";
import { connect } from "react-redux";

import '../../../sass/planograms.css';
import moment from "moment/moment";
import {isStatus} from "../../utils";
import Skeleton from "@mui/material/Skeleton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Swal from "sweetalert2";
import {camp_list, camp_list_stat} from "../../crud/auth.crud";
import GetAppIcon from "@material-ui/icons/GetApp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import BackwardIcon from 'img/backward.svg';
import planogramDeviceImage from "img/planogramsDeviceIMG.svg"



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

    containerSearch: {
        marginTop: '16px',
    },

    search: {
        gap: '16px',
        borderRadius: '4px',
        background: '#EDF7FF',
        //position: 'relative',
        //borderRadius: theme.shape.borderRadius,
        //boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
        //backgroundColor: '#fff',
        //'&:hover': {
        //  backgroundColor: fade(theme.palette.common.white, 0.25),
        //},
        marginRight: 52,
        marginLeft: 0,
        padding: '5px 0 4px 0',
        //width: '100%',
        [theme.breakpoints.up('md')]: {
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
    },

    buttonCreate: {
        width: '200px',
    },
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
    },
    buttonSelectionContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    }
}));

const worker = new Worker(new URL('../../webworkers/boards.worker.js', import.meta.url));
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
    { field: 'id', label: "Код устройства", sublabel: "Название рекламной кампании", minwidth: 80, width: "7%", numeric: false, disablePadding: true, filter: false },
    { field: 'owner', label: "Изображение", sublabel: "Название рекламной кампании", minwidth: 50, width: "5%", numeric: false, disablePadding: true, filter: false },
    { field: 'name', label: "Название планограммы", sublabel: "Название рекламной кампании", minwidth: 400, width: "35%", numeric: false, disablePadding: true, filter: false },
    { field: 'budget', label: "Адрес", sublabel: "Завершенность", minwidth: 120, width: "14%", numeric: false, disablePadding: true, filter: false },
    { field: 'shows', label: "Вид устройства", sublabel: "Завершенность", minwidth: 120, width: "14%", numeric: false, disablePadding: true, filter: false },
    { field: 'start', label: "Ширина", sublabel: "Дата начала", minwidth: 120, width: "10%", numeric: false, disablePadding: true, filter: false },
    { field: 'end', label: "Высота", sublabel: "Дата окончания", minwidth: 120, width: "10%", numeric: false, disablePadding: true, filter: false },
    { field: 'end', label: "Последние изменения", sublabel: "Дата окончания", minwidth: 120, width: "10%", numeric: false, disablePadding: true, filter: false },
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
function Planograms(props) {
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
                        props.history.replace({ pathname: `/goods` })
                    })
                } else {
                    Swal.fire({
                        title: 'Возникла ошибка при подключении!',
                        text: res.data.error,
                        icon: 'error',
                        showConfirmButton: false,
                    }).then((result) => {
                        props.history.replace({ pathname: `/goods` })
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
        <div className={'containerGoods'}>
            <div className={'containerGoods_style'}>
                <div className={'containerGoods_header'}>
                    <div className={'containerGoods_header-title1'}>
                        <p>Планограмма</p>
                    </div>
                    <div className={'containerGoods_header-title2'}>
                        <p>Товары</p>
                    </div>
                </div>
                <div className={`${classes.containerSearch}`}>
                    <div className={`${classes.search}`}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Поиск по коду или названию"
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
                    <Tooltip title="Создать" className={`buttonCreate`}>
                        <Link to="#" onClick={() => { setOpen(true); }}>
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                                <p>Создать</p>
                            </Fab>
                        </Link>
                    </Tooltip>
                </div>
                <>
                    <Hidden only={["xs", "sm"]}>
                        <div className={`fontGR helpSelect align-items-center mt-3 c274C77 fS14 d-flex`}>
                            <div style={{ marginRight: 120 }}>
                                Выбрано <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
                            </div>
                            <div className={`${classes.buttonSelectionContainer}`}>
                                <div className={`${selected.length > 0 ? "":"disabledButtons"}`}>
                                    <Button
                                        className={`helpButton c455A64 fontGR`}
                                        variant="outlined" color="secondary"
                                        startIcon={<FileCopyIcon />}
                                    >
                                        Скопировать
                                    </Button>
                                    <Button
                                        className={`helpButton c274C77`}
                                        variant="outlined" color="secondary"
                                        startIcon={<GetAppIcon />}
                                    >
                                        Импортировать
                                    </Button>
                                    <Button
                                        className={`helpButton c455A64 fontGR`}
                                        variant="outlined" color="secondary"
                                        startIcon={<DeleteOutlineIcon />}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
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
                    <Hidden only={["xs"]}>

                        <TableContainer className={"bgcfff"}>
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
                                    <TableRow
                                        hover
                                        //
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={"row"}
                                        classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}
                                        style={{width: 500}}

                                    >
                                        <TableCell padding="checkbox" className={classes.rowPadding} style={{ padding: '6px 0 5px 0', width: 100}} >
                                            <Checkbox
                                                classes={{ checked: classes.CheckboxChecked }}
                                                onChange={event => handleClick(event,)}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c448AFF'}>
                                            <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                                  to={`/planograms/view/test`}>
                                                {"01-045674"}
                                            </Link>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c455A64'} style={{display: "flex"}}>
                                            <img className="marginZA" src={planogramDeviceImage} alt="Image"/>
                                        </TableCell>
                                        <TableCell style={{ maxWidth: 100 }} padding="none">
                                            {/*Закончено*/}
                                            <Box className="fontGM text-nowrap" style={{ color: isStatus() }} >
                                                {/*<FormattedMessage id={"STATUS." + row.status} />*/}
                                                <span className={"tableNamePlano"}>Спар холодильник 4</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <span>Ул.Пискунова 41</span>
                                        </TableCell>
                                        <TableCell align="left" className={classes.text2} padding="none">
                                            <span>Холодильник</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none">
                                            <span>950 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>1900 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>15.05.2023  Воробьев</span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        hover
                                        //
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={"row"}
                                        classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}
                                        style={{width: 500}}

                                    >
                                        <TableCell padding="checkbox" className={classes.rowPadding} style={{ padding: '6px 0 5px 0', width: 100}} >
                                            <Checkbox
                                                classes={{ checked: classes.CheckboxChecked }}
                                                onChange={event => handleClick(event,)}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c448AFF'}>
                                            <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                                  to={`/planograms/view/test`}>
                                                {"01-045674"}
                                            </Link>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c455A64'} style={{display: "flex"}}>
                                            <img className="marginZA" src={planogramDeviceImage} alt="Image"/>
                                        </TableCell>
                                        <TableCell style={{ maxWidth: 100 }} padding="none">
                                            {/*Закончено*/}
                                            <Box className="fontGM text-nowrap" style={{ color: isStatus() }} >
                                                {/*<FormattedMessage id={"STATUS." + row.status} />*/}
                                                <span className={"tableNamePlano"}>Спар холодильник 4</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <span>Ул.Пискунова 41</span>
                                        </TableCell>
                                        <TableCell align="left" className={classes.text2} padding="none">
                                            <span>Холодильник</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none">
                                            <span>950 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>1900 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>15.05.2023  Воробьев</span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        hover
                                        //
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={"row"}
                                        classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}
                                        style={{width: 500}}

                                    >
                                        <TableCell padding="checkbox" className={classes.rowPadding} style={{ padding: '6px 0 5px 0', width: 100}} >
                                            <Checkbox
                                                classes={{ checked: classes.CheckboxChecked }}
                                                onChange={event => handleClick(event,)}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c448AFF'}>
                                            <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                                  to={`/planograms/view/test`}>
                                                {"01-045674"}
                                            </Link>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={'c455A64'} style={{display: "flex"}}>
                                            <img className="marginZA" src={planogramDeviceImage} alt="Image"/>
                                        </TableCell>
                                        <TableCell style={{ maxWidth: 100 }} padding="none">
                                            {/*Закончено*/}
                                            <Box className="fontGM text-nowrap" style={{ color: isStatus() }} >
                                                {/*<FormattedMessage id={"STATUS." + row.status} />*/}
                                                <span className={"tableNamePlano"}>Спар холодильник 4</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <span>Ул.Пискунова 41</span>
                                        </TableCell>
                                        <TableCell align="left" className={classes.text2} padding="none">
                                            <span>Холодильник</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none">
                                            <span>950 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>1900 мм</span>
                                        </TableCell>
                                        <TableCell align="left" className={`${classes.text} c455A64`} padding="none" >
                                            <span>15.05.2023  Воробьев</span>
                                        </TableCell>
                                    </TableRow>

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
                    <Hidden only={["xs", "sm"]}>
                        <div className={`fontGR helpSelect align-items-center c274C77 fS14 d-flex`} style={{position: "relative", bottom: 1}}>
                            <div className={`d-flex`}>
                                <span style={{marginRight: 24, whiteSpace: "nowrap"}}>Всего устройств</span> <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
                            </div>
                            <div className={`${classes.buttonSelectionContainer}`}>
                                <div className={`${selected.length > 0 ? "":"disabledButtons"}`}>
                                    <button
                                        className={` c274C77 buttonArrow`}
                                        variant="outlined" color="secondary"
                                        style={{width: 24, marginRight: 8}}
                                    >
                                        <img src={BackwardIcon} alt="arrow"/>
                                    </button>
                                    <button
                                        className={` c455A64 fontGR buttonArrow`}
                                        variant="outlined" color="secondary"
                                        style={{width: 24}}
                                    >
                                        <img className={"rotateIMG"} src={BackwardIcon} alt="arrow"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Hidden>
                </>
            </div>
        </div>
    );
}

export default Planograms;

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, handleClickOpenDialog, checkedList } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <>
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
        </>
    );
}
