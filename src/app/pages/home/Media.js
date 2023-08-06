import React, { useState, useEffect } from "react";
import axios from "axios";
//import { toAbsoluteUrl } from "app/utils/index";
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
    withStyles, Card, CardContent, TablePagination, Toolbar, InputBase, TableSortLabel, withWidth,
    useTheme, Fab, IconButton, List, ListItem, ListItemIcon, ListItemText,
    useMediaQuery, AppBar, Tabs, Tab, fade, InputAdornment, LinearProgress
} from "@material-ui/core";

//import AlbumTablet from "../../components/album/AlbumTablet";
//import AlbumDesktop from "../../components/album/AlbumDesktop";
//import AlbumMobile from "../../components/album/AlbumMobile";
import AddIcon from '@material-ui/icons/Add';

//import Pagination from "react-js-pagination";
//import Select from "react-select";

//import { dropdownStyles } from "../../utils";
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import { getCurrentUser } from "../../crud/local.storage";

import { Link, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import clsx from "clsx";
//import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from "@material-ui/icons/Close";

import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Moment from "react-moment";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    AppBar: {
        backgroundColor: '#FAFAFA',
        boxShadow: 'none',
        position: 'relative',
        zIndex: 60
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
    headCellLabel: {
        color: '#000E40',
        fontSize: '13px',
    },
    TableHead: {
    },
    TableRow: {
        height: '48px',
    },
    text: {
        fontSize: '13px',
        fontWeight: 500
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
        left: '210px'
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
    loader: {
        position: 'absolute',
        width: '100%',
        top: "-3px"
    }
}));

const headCells = [
    { field: 'name', label: "Название", sublabel: "Название рекламной кампании", width: 400, minW: 220, numeric: false, disablePadding: true, filter: false },
    { field: 'creator', label: "Владелец", sublabel: "Завершенность", width: 200, numeric: false, disablePadding: true, filter: false },
    { field: 'date', label: "Дата создания", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: true, filter: false },
    { field: 'count', label: "Загружено файлов", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: true, filter: false },
];

const Media = props => {
    const { currentUser } = props;
    const [albumsData, setAlbumsData] = useState({});
    //  const [currentPage, setCurrentPage] = useState(1);
    //const [sortTooltip, setSortState] = useState(false);
    //const [filterModal, setFilterModal] = useState(false);
    const [albumDataWaiter, setAlbumDataWaiter] = useState(false);
    //const [filterResolution, setFilterResolution] = useState([]);
    const [search, setSearch] = useState("");
    const [currentSort, setCurrentSort] = useState(null);

    const [setting, setSetting] = useState({
        filterName: "",
        page: 0,
        uploadedPages: [],
        filterStatuses: 0
    });
    function setFilterNamePre(val) {
        let newAlbumsData = { ...albumsData, creative: {} };
        setAlbumsData(newAlbumsData);
        setSetting({ ...setting, page: 0, uploadedPages: [], filterName: val });
    }
    const [loaderShow, setLoaderShow] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoaderShow(true)
            getAlbums();
        }, 600);

        return () => clearTimeout(delayDebounceFn);
    }, [setting, currentSort]);

    const classes = useStyles();
    const [anchorEl7, setAnchorEl7] = React.useState(null);
    const open7 = Boolean(anchorEl7);


    const LightTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[1],
            fontSize: 13
        }
    }))(Tooltip);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    /// Dialog create album
    //const [openStatus, setOpenStatus] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [nameNewAlb, setNameNewAlb] = React.useState("");
    const [statusAlOk, setStatusAlOk] = useState(false);
    const [statusAlOk_text, setStatusAlOk_text] = useState("Альбом создан");
    const [albumCount, setAlbumCount] = useState(0);
    const createAlbum = () => {
        setOpen(false);
        if (!nameNewAlb || nameNewAlb === "") {
            return false;
        }
        let formData = new FormData();
        formData.append("name", nameNewAlb);
        axios
            .post(`/creative-group/create?subuser=${currentUser.id}`, formData)
            .then(res => {
                if (res.data.status === "ok") {
                    setStatusAlOk_text("Альбом создан");
                    getAlbums();
                } else {
                    setStatusAlOk_text("Ошибка, Попробуйте ещё раз");
                }
                setStatusAlOk(true);
            })
            .catch(error => {
                setStatusAlOk_text("Ошибка, Попробуйте ещё раз");
                setStatusAlOk(true);
            });
    };

    const getAlbums = async () => {
        try {

            if (setting.uploadedPages.indexOf(setting.page) > -1) {
                setLoaderShow(false)
                return;
            }
            let cityStr = "";
            let resolutionStr = "";
            let res = await axios.get(
                `/creative-group?page=${setting.page + 1}&subuser=${currentUser.id
                }${!!currentSort ? `&sort=${currentSort}` : ""}${!!search ? `&title=${search}` : ""
                }${!!setting.filterName ? `&title=${setting.filterName}` : ""
                }`
            );
            let upPages = [...setting.uploadedPages, setting.page];
            setSetting({ ...setting, uploadedPages: upPages });
            if (setting.page > 0) {
                let creativesN = [];
                Object.values(res.data.creative).forEach((value, index) => {
                    creativesN[setting.page * 10 + index] = value;
                })
                res.data.creative = creativesN;
            }
            if (!!albumsData.creative && !!Object.keys(albumsData.creative).length && !albumDataWaiter) {
                let newCrea = { ...albumsData.creative };
                let urlParams = new URL("http://example.com" + res.config.url);
                newCrea[urlParams.searchParams.get('page') - 1] = Object.values(res.data.creative);
                /*  Object.values(res.data.creative).forEach(value=>{
  
                      console.log(value.id);
                      console.log(value);
                      newCrea.push(value);
                  })*/
                let newAlbumsData = { meta: albumsData.meta, creative: newCrea };
                console.log('Object.keys(data).length');
                console.log(newCrea);

                setAlbumsData(newAlbumsData);
            } else {

                console.log('Object.keys(data).length11111111');
                let newAlbumsData = { meta: res.data.meta, creative: { 0: Object.values(res.data.creative) } };
                console.log(newAlbumsData);

                setAlbumsData(newAlbumsData);
                setLoaderShow(false)
            }
            setLoaderShow(false)

            if (!!res.data && !!res.data.meta && !!res.data.meta.total && res.data.meta.total > 0) {
                if (albumCount == 0) {
                    setAlbumCount(res.data.meta.total);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    const [filterStatuses, setFilterStatuses] = useState(0);
    // const [filterName, setFilterName] = useState("");
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    //const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = albumsData.creative.map((n) => n.id);
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
        //setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (!!albumsData.creative ? albumsData.creative.length : 0) - setting.page * rowsPerPage);

    const handleChange = (event, newValue) => {
        if (newValue != 3) {
            setFilterStatuses(newValue);
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
        console.log('stableSort1arrayarrayarray')
        console.log(array)


        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        let data = stabilizedThis.map((el) => el[0]);
        console.log('stableSort1114444444')
        console.log(setting.page)
        console.log(data)
        console.log(data.slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage))
        return data[setting.page];
        //  return data;
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
    return (
        <>

            {!!albumsData && !!albumsData.creative && albumCount == 0 &&
                <div className={classes.rootEmpty}>
                    <Typography style={{ marginBottom: 10 }}>Добавить альбом</Typography>
                    <Link to="#" onClick={() => {
                        setOpen(true);
                    }}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            }



            {albumCount != 0 && (
                <>
                    <EnhancedTableToolbar {...props} count={selected.length} setFilterName={setFilterNamePre} setOpen={setOpen} />
                    <Paper className={'paper position-relative'}>

                        <Divider />
                        {!!albumsData && !albumsData.creative && !loaderShow &&
                            <Box letterSpacing={'.0178571429em!important'} fontSize={14} color="text.secondary"
                                className={'my-4 ml-auto mr-auto'}>Ни один альбом не соответствует вашему поиску</Box>
                        }

                        <Dialog
                            maxWidth="xs"
                            open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Настройка данных</DialogTitle>
                            <DialogContent classes={{ root: classes.DialogContent }}>
                                <List dense={true} className={classes.rootList}>
                                    {headCells.map((value) => {
                                        if (!value.filter) {
                                            return;
                                        }
                                        const labelId = `checkbox-list-label-${value.field}`;
                                        return (
                                            <ListItem key={value.field} role={undefined} dense button onClick={handleToggleList(value.field)}>
                                                <ListItemIcon>
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">
                                    Установить
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {selected.length > 0 &&
                            <div className={`d-flex ${classes.helpSelect} align-items-center`}>
                                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                                    {selected.length} альбома выбрано
                                </Typography>
                                <Tooltip title="Delete" className={'ml-auto'}>
                                    <IconButton aria-label="delete" onClick={() => setSelected([])}>
                                        <DeleteIcon className={'text-white'} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        }
                        {loaderShow === true && <LinearProgress className={classes.loader} />}

                        <>
                            {(!!albumsData.creative || loaderShow) &&
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
                                                handleClickOpenDialog={handleClickOpenDialog}
                                                onSelectAllClick={handleSelectAllClick}
                                                onRequestSort={handleRequestSort}
                                                rowCount={albumsData.creative.length}
                                            />
                                            {!!albumsData.creative && !!albumsData.creative[setting.page] &&
                                                <TableBody>
                                                    {
                                                        //stableSort(albumsData.creative[setting.page], getComparator(order, orderBy))
                                                        //.slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                                                        //.map((row, index) => {
                                                        albumsData.creative[setting.page].map((row, index) => {
                                                            const isItemSelected = isSelected(row.id);
                                                            const labelId = `enhanced-table-checkbox-${index}`;
                                                            console.log("44444444rrrrrrrrrrrrrr")
                                                            console.log(row)
                                                            return (
                                                                <TableRow
                                                                    hover
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
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox
                                                                            onChange={(event) => handleClick(event, row.id)}
                                                                            classes={{ checked: classes.CheckboxChecked }}
                                                                            checked={isItemSelected}
                                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell component="th" id={labelId} scope="row"
                                                                        padding="none">
                                                                        <Link
                                                                            className={`C-NameHover ${classes.TableCellNameA}`}
                                                                            to={`/md/view/${row.id}`}>
                                                                            {row["name"]}
                                                                        </Link>
                                                                    </TableCell>

                                                                    <TableCell align="left" className={classes.text}>
                                                                        {row.username !== 0 ? row.username : "-"}
                                                                    </TableCell>

                                                                    <TableCell align="left" className={classes.text}>
                                                                        <Moment format="DD/MM/YYYY">
                                                                            {row.created_at !== 0 ? row.created_at : "-"}
                                                                        </Moment>
                                                                    </TableCell>

                                                                    <TableCell align="left" className={classes.text}>
                                                                        {row.count !== 0 ? row.count : "0"}
                                                                    </TableCell>

                                                                    <TableCell align="right">{row.protein}</TableCell>
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
                            }

                            <Hidden only={["sm", "md", "lg", "xl"]}>
                                {
                                    //stableSort(albumsData.creative[setting.page+1], getComparator(order, orderBy))
                                    //.slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                                    //.map((row, index) => {
                                    !!albumsData.creative[setting.page] && albumsData.creative[setting.page].map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        console.log("rowrowrowrow3423434")
                                        console.log(row)
                                        return <Card className={classes.rootCard} key={row.id + 'cardMedia'}>
                                            <CardContent classes={{ root: classes.rootCardContent }}>
                                                <div className={'d-flex my-2 align-items-center row'}>
                                                    <div className={'col-2 px-0'}>
                                                        <Checkbox
                                                            classes={{ checked: classes.CheckboxChecked }}
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, row.id)}
                                                        />
                                                    </div>
                                                    <div className={`col-5 px-0 ${classes.text}`}>{row.private == 0 || row.private == null ? "Приватный" : "Общий"}</div>
                                                    <div className={`col-5 px-0 ${classes.text}`}></div>
                                                </div>
                                                <Typography className={classes.cityMob} color="textSecondary">
                                                    {!!row.city && (
                                                        <FormattedMessage id={"CITY_" + row.city} />
                                                    )}
                                                </Typography>
                                                <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                                    to={`/myboards/view/${row.id}`} >
                                                    <Typography variant="body2" component="p" style={{ color: '#004fff' }}>
                                                        {row.title}
                                                    </Typography>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    })}
                            </Hidden>

                            {!!albumsData.creative && albumsData.meta.total > 10 &&
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={albumsData.meta.total}
                                    rowsPerPage={10}
                                    page={setting.page}
                                    onChangePage={handleChangePage}
                                // onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            }
                        </>


                    </Paper>
                </>
            )}


            <Dialog
                open={statusAlOk}
                onClose={() => {
                    setStatusAlOk(false);
                }}
                aria-labelledby="responsive-dialog-title"
                BackdropProps={{
                    classes: {
                        root: classes.root
                    }
                }}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    style={{ textAlign: "center" }}
                >
                    {statusAlOk_text}
                </DialogTitle>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            setStatusAlOk(false);
                        }}
                        color="primary"
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="form-dialog-title"
                BackdropProps={{
                    classes: {
                        root: classes.root
                    }
                }}
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">
                    Новый альбом
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        fullWidth
                        value={nameNewAlb}
                        onChange={e => {
                            setNameNewAlb(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button onClick={createAlbum} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


const mapStateToProps = store => ({
    user: store.auth.user,
    currentUser: store.auth.currentUser
});
export default withWidth()(injectIntl(withRouter(connect(mapStateToProps)(Media))));

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, checkedList, handleClickOpenDialog } = props;
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
                            //style={{minWidth: headCell.minW}}
                            key={headCell.field}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
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
        //position: 'relative',
        //borderRadius: theme.shape.borderRadius,
        //boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
        //backgroundColor: '#fff',
        //'&:hover': {
        //  backgroundColor: fade(theme.palette.common.white, 0.25),
        //},
        borderBottom: "1px solid #E0E0E0",
        marginRight: 52,
        marginLeft: 0,
        padding: '5px 0 4px 0',
        //width: '100%',
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
            className={`${clsx(classes.root)} px-4 mb-4`}
        >
            <div className={classes.pageHeader}>
                Альбомы
            </div>
            <div className={`${classes.search}`}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск альбома…"
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
            <Tooltip title="Добавить альбом" className={`createBT`}>
                <Link to="#" onClick={() => { setOpen(true); }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Tooltip>

        </Toolbar>
    );
};
