import React, { useState, useEffect, useContext } from "react";
import {
    Button, Dialog, DialogActions, makeStyles, Box,
    IconButton, Table, TableBody, TableCell, CircularProgress,
    TableContainer, TableHead, TableRow, Checkbox, TableSortLabel, List, ListItem, ListItemIcon, ListItemText
} from "@material-ui/core";
import ViewStatisticModal from "./ViewStatisticModal";
import { ViewCampContext } from "../../../../app/context/DataCampContext";
//import Moment from "react-moment";
//import Pagination from "react-js-pagination";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import { isInclusivelyAfterDay, isInclusivelyBeforeDay, SingleDatePicker } from "react-dates";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles(theme => ({
    mainGrid: {
        fontSize: 13,
        fontWeight: 500
    },
    mainGrid2: {
        fontSize: 12,
        fontWeight: 500
    },
    TableRow: {
        height: '48px',
    },
    headCellLabel: {
        color: '#000E40',
        fontSize: '13px',
    },
    mainGridHeader: {
        fontSize: 12,
        fontWeight: 500,
        margin: "0 0 10px 0"
    },
    dataBlock: {
        textAlign: "center",
        wordWrap: "break-word"
    },
    dataFirstBlock: {
        textAling: "start"
    },
    expansionStyle: {
        margin: "0 !important",
        boxShadow: "none !important",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        padding: "0 !important",
        borderRadius: "0 !important"
    },
    container: {
        padding: "0 25px",
        backgroundColor: "white",
        marginTop: "-20px"
    },
    expansionPanelStyle: {
        padding: "0"
    },
    details: {
        padding: "0px 0 15px 0",
        "&:hover": {
            cursor: "pointer"
        }
    },
    pag: {
        margin: "10px 0 0 0"
    },
    rootTableRow: {
        height: '48px',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    text: {
        fontSize: '13px',
        fontWeight: 400,
        paddingLeft: '1rem !important',
        paddingRight: '1rem !important'
    },
}));

const headCells = [
    {
        field: 'date',
        label: "Дата",
        align: "left",
        sublabel: "Название рекламной кампании",
        minwidth: 370,
        width: "370px",
        padding: "0 0 0 46px",
        numeric: false,
        disablePadding: true,
        filter: false
    },
    {
        field: 'order',
        label: "Заказано",
        align: "right",
        sublabel: "Завершенность",
        minwidth: 80,
        width: "150px",
        className: "px-2",
        numeric: false,
        disablePadding: true,
        filter: false
    },
    {
        field: 'shows',
        label: "Показано",
        align: "right",
        sublabel: "Дата начала",
        minwidth: 80,
        width: "150px",
        className: "px-2",
        numeric: false,
        disablePadding: true,
        filter: false
    },
    {
        field: 'price',
        label: "Цена",
        align: "right",
        sublabel: "Дата начала",
        minwidth: 80,
        width: "150px",
        className: "px-2",
        numeric: false,
        disablePadding: true,
        filter: true,
        padRight: 25
    }
];
var moment = require("moment");
const ViewTableStatistic = props => {
    const useViewCampContext = useContext(ViewCampContext);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
    }, [props.data]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        props.setCurrentPage(newPage)
        // setPage(newPage);
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

        console.log('array11111111array1111111array1111111array1111111')
        let objArr = Object.entries(array);
        console.log(objArr)


        // const stabilizedThis = array.map((el, index) => [el, index]);
        //stabilizedThis.sort((a, b) => {
        //    const order = comparator(a[0], b[0]);
        //    if (order !== 0) return order;
        //    return a[1] - b[1];
        //});
        // let data = stabilizedThis.map((el) => el[0]);
        //console.log('stableSort')
        //console.log(Object.fromEntries(
        //    Object.entries(array).slice(1, 3)
        //))
        //return Object.keys(array).slice(props.currentPage * 21, props.currentPage * 21 + 21);
        return objArr
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
    };


    return (
        <>
            <TableContainer className={"px-0 px-md-4 bgcfff pt-4"}>
                <Table className={'tableStat'}>
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        rowCount={10}
                        handleClickOpenDialog={handleClickOpenDialog}
                    />
                    <TableBody>
                        {!!props.data.all_data && !!useViewCampContext.dataShowsReserved &&
                            stableSort(useViewCampContext.dataShowsReserved, getComparator(order, orderBy)).map(([keyyy, val]) => {
                                return <Row
                                    key={keyyy + "rowS"}
                                    //boards={props.data.boards}
                                    //data={props.data}
                                    keyyy={keyyy}
                                    //dataStat={props.dataStat}
                                    row={val}
                                    setData={setData}
                                    setOpenDialog={setOpen}
                                />
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*!!props.data.meta && props.data.meta.total &&
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={!!props.data.meta ? props.data.meta.total : 0}
                    rowsPerPage={10}
                    page={props.currentPage}
                    onChangePage={handleChangePage}
                    //onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            */}
            <div style={{ paddingBottom: 60 }}></div>

            <ViewStatisticModal open={open} handleClose={handleClose} dataStat={data} />

            <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog}  >
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
                <DialogActions className={'mb-4'}>
                    <Button className={`btn tTraN mr-auto ml-auto startButton `} onClick={handleCloseDialog} >
                        <Box fontSize={14} fontWeight={500} className={'text-center'}>Применить</Box>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default ViewTableStatistic;


function Row(props) {
    const useViewCampContext = useContext(ViewCampContext);
    const { row, setData, setOpenDialog, keyyy } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    //let dataString = moment.unix(keyyy).format("YYYY-MM-DD");
    return (
        <React.Fragment>
            <TableRow className={classes.rootTableRow}>
                <TableCell component="th" scope="row" padding="none" >
                    <IconButton className={'mx-2'} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {keyyy}
                </TableCell>

                <TableCell align="right" padding="none" className={"px-2"} >{row["total"]}</TableCell>

                <TableCell align="right" padding="none" className={"px-2"} >{!!useViewCampContext.dataStat[keyyy] ? useViewCampContext.dataStat[keyyy]["all_showed"] : 0}</TableCell>
                <TableCell align="right" padding="none" className={"px-2"}>{!!useViewCampContext.dataStat[keyyy] ? useViewCampContext.dataStat[keyyy]["all_cost"] : 0}</TableCell>
                <TableCell padding="none" align="right" className={"px-2"}></TableCell>
            </TableRow>


            {Object.keys(row["boards"]).map(keyB => {
                // if(keyB != "all_shows" && keyB != "all_showed" && keyB != "all_cost"){

                //console.log(props.dataStat)
                //console.log(dataString)
                //console.log(keyB)
                let showedVar = 0;
                let costVar = 0;
                if (typeof useViewCampContext.dataStat[keyyy] != "undefined") {
                    if (typeof useViewCampContext.dataStat[keyyy]["data_board"][keyB] != "undefined") {
                        showedVar = useViewCampContext.dataStat[keyyy]["data_board"][keyB]["showed"]
                    }
                    if (typeof useViewCampContext.dataStat[keyyy]["data_board"][keyB] != "undefined") {
                        costVar = useViewCampContext.dataStat[keyyy]["data_board"][keyB]["cost"]
                    }
                }

                console.log(' onClickonClickonClick 12121212121boardsboardsboards')
                console.log(row)
                console.log(keyB)
                console.log(keyyy)

                return <TableRow
                    key={keyB + keyyy + " statRow"}
                    onClick={() => {
                        setData({ row, keyB, keyyy });
                        setOpenDialog(true);
                    }}
                    className={`cursor-pointer ${!!open ? "" : "d-none"}`}
                >
                    <TableCell component="th" scope="row" className={'dataa'} >{!!useViewCampContext.data.boards[keyB]["title"] ? useViewCampContext.data.boards[keyB]["title"] : useViewCampContext.data.boards[keyB]["address"]}</TableCell>
                    {<TableCell padding="none" align="right" className={"px-2"}>
                        {row["boards"][keyB]["total"]}
                        {/*!!row["boards"][keyB]["total"] ?
                            row["boards"][keyB]["total"] : <CircularProgress style={{ "height": 20, "width": 20 }} />*/}
                    </TableCell>}
                    <TableCell padding="none" align="right" className={"px-2"}>{showedVar}</TableCell>
                    <TableCell padding="none" align="right" className={"px-2"}>{costVar}</TableCell>
                    <TableCell padding="none" align="right" className={"px-2"}></TableCell>
                </TableRow>

                // }
            })}

        </React.Fragment>
    );
}


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort, handleClickOpenDialog, checkedList } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead classes={{ root: classes.TableHead }}>
            <TableRow className={'TableRow'}>
                {headCells.map((headCell) => {
                    return <TableCell
                        width={!!headCell.width ? headCell.width : ""}
                        //style={{minWidth:headCell.minwidth, padding: !!headCell.padding ? headCell.padding : "" }}
                        style={{ padding: !!headCell.padding ? headCell.padding : "", minWidth: !!headCell.minwidth ? headCell.minwidth : "" }}
                        key={headCell.field + 'cam'}
                        align={headCell.align}
                        className={!!headCell.className ? headCell.className : ""}
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
                })}

                <TableCell
                    //width={30}
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
