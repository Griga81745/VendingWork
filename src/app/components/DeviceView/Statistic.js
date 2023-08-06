import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Popover,
  List, ListItem, ListItemIcon, ListItemText,
  withStyles, Fab,
  Accordion as ExpansionPanel, CircularProgress,
  AccordionSummary as ExpansionPanelSummary,
  AccordionDetails as ExpansionPanelDetails, Checkbox, IconButton, Toolbar, InputBase,
  Button, Hidden, InputAdornment, Dialog, DialogActions, TablePagination, TableSortLabel, FormControlLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
// import { addDays } from 'date-fns';

import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ViewStatisticModal from "./ViewStatisticModal";
import { ViewBoardStatContext } from "../../../app/context/DataCampContext";
//import ExpansionPanel from "@material-ui/core/ExpansionPanel";
//import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Moment from "react-moment";
// import Pagination from "react-js-pagination";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "moment/locale/ru";
import { Link, withRouter, useParams } from "react-router-dom";
import clsx from "clsx";;

// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import deLocale from "date-fns/locale/ru";
// import DateFnsUtils from "@date-io/date-fns";



var moment = require("moment");

const useStyles = makeStyles(theme => ({
  mainGrid: {
    fontSize: 13,
    fontWeight: 500
  },
  mainGrid2: {
    fontSize: 12,
    fontWeight: 500
  },
  mainGridHeader: {
    fontSize: 13,
    fontWeight: 500,
    padding: "5px 8px"
  },
  dataBlock: {
    textAlign: "center",
    wordWrap: "break-word"
  },
  dataFirstBlock: {
    padding: "0 20px !important"
  },
  table: {
    minWidth: 1100
  },
  TableCellNameA: {
    fontSize: '13px',
    color: '#0075FF',
    fontWeight: 500
  },
  TableRowBody: {
    height: "48px"
  },
  TableRowBodyS: {
    backgroundColor: '#FAFAFA!important'
  },
  headCellSubLabel: {
    fontSize: '11px',
    color: "#687C8F"
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
  TableHead: {
    height: 48,
    backgroundColor: "#F7F9FA"
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
}));
const worker = new Worker(new URL('../../webworkers/oneboard.worker.js', import.meta.url))

const Statistic = props => {
  const useViewBoardStatContext = useContext(ViewBoardStatContext);
  const classes = useStyles();
  const { boardId, workHoursCount, token } = props;
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  //const [usersDataV, setUsersDataV] = useState([]);
  //const [dataShows, setDataShows] = useState([]);
  const [statistic, setStatistic] = useState(false);


  const [daysStat, setDaysStat] = useState(false);
  useEffect(() => {
    enumerateDaysBetweenDates(useViewBoardStatContext.selectedDate, useViewBoardStatContext.selectedDateEnd)
    getTableStatParni();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setData({});
  };
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [dataShowsReserved, setDataShowsReserved] = useState(false);
  useEffect(() => {
    worker.onmessage = ({ data: { count } }) => {

      //console.log("statGcountcountcountcountcount ");
      //console.log(count);

      setDataShowsReserved(count)
    };
  }, []);
  function enumerateDaysBetweenDates(startDate, endDate) {
    let days = []
    for (var t = moment(startDate); t.isBefore(endDate); t.add(1, "day")) {
      let thisDay = t.format('YYYY-MM-DD')
      days.push(thisDay)
    }
    setDaysStat(days)

    worker.postMessage({
      token: token,
      id: +id,
      start: startDate.unix(),
      finished: endDate.unix()
    })
  }


  const getTableStatParni = async () => {

    let resStat = await axios.get(`https://parni.de4.ru/getData?board_id=${boardId}&start=${useViewBoardStatContext.selectedDate.unix()}000&end=${useViewBoardStatContext.selectedDateEnd.unix()}999`);
    let statD = new Array();

    if (!!resStat.data && resStat.data.length) {
      resStat.data.forEach(statData => {
        if (typeof statD[statData._id.date] === 'undefined') {
          statD[statData._id.date] = [];
          statD[statData._id.date]['total'] = 0;
        }
        statD[statData._id.date][statData._id.camp] = statData.total;
        statD[statData._id.date]['total'] += statData.total;
      });
    }

    //setStatistic(statD);
    getTableStat(statD);
  }

  const getTableStat = async statD => {

    let resStat = await axios.get(`https://ru.de4.ru/getData?board_id=${boardId}`);
    if (!!resStat.data && resStat.data.length) {
      resStat.data.forEach(statData => {
        if (statD[statData["_id"].date] === undefined) {
          statD[statData["_id"].date] = []
          statD[statData["_id"].date]['total'] = 0
        }
        statD[statData["_id"].date][statData["_id"].camp] = statData.total
        statD[statData["_id"].date]['total'] += statData.total
      });
    }

    console.log("statGogetT  getTableStatParnigetTableStatParnigetTableSt2222");
    console.log(statD);

    setStatistic(statD);
  }

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);
  const [setting, setSetting] = useState({
    filterName: "",
    page: 0,
    filterStatuses: 0,
    mobSortStatus: 0
  });
  let countAllworkSec = workHoursCount * 3600


  const [dateStart, setDateStart] = useState();
  //const [dateStartMin, setDateStartMin] = useState(moment(props.options.minDate).subtract(1, 'days'));
  //const [dateStartMin, setDateStartMin] = useState(moment().add(1, "days"));
  //const [dateStartMax, setDateStartMax] = useState(moment().add(30, "days"));

  const [focusedInEnd, setFocusedInEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState(false);

  const setDateStartAll = date => {
    setDateStart(date);

    let newDate = moment(date).format("YYYY/MM/DD");
    props.updateData({ ...props.filter, companyStartDate: newDate });
  };
  const setDateEndAll = date => {
    setDateEnd(date);

    let newDate = moment(date).format("YYYY/MM/DD");
    props.updateData({ ...props.filter, companyEndDate: newDate });
  };

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
      const newSelecteds = data.campaign.map((n) => n.id);
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
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, (!!data.campaign ? data.campaign.length : 0) - setting.page * rowsPerPage);

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
    {
      field: 'data',
      label: "Дата",
      minwidth: 370,
      width: "370px",
      padding: "0 0 0 46px",
      align: 'left',
      disablePadding: true,
      filter: false
    },
    { field: 'profit', label: "Заработано", minwidth: 150, width: "10%", align: 'right', disablePadding: true, filter: false },
    { field: 'reserShows', label: "Забронированно показов", minwidth: 120, width: "14%", align: 'right', disablePadding: true, filter: false },
    { field: 'shows', label: "Сделано показов", minwidth: 120, width: "14%", align: 'right', disablePadding: true, filter: false },
    { field: 'camps', label: "Кол-во участвующих кампаний", minwidth: 235, width: "13%", align: 'right', disablePadding: true, filter: false },
    { field: 'freesec', label: "% свободного эфира", minwidth: 120, width: "10%", align: 'right', disablePadding: true, filter: false },
    { field: 'reservedsec', label: "% забронированного эфира", minwidth: 220, width: "15%", align: 'right', disablePadding: true, filter: false },

  ];

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

  const [stateDD, setStateDD] = useState([
    {
      startDate: useViewBoardStatContext.selectedDate.toDate(),
      endDate: useViewBoardStatContext.selectedDateEnd.toDate(),
      key: 'selection'
    }
  ]);

  const [anchorElDD, setAnchorElDD] = React.useState(null);
  const handlePopoverOpenDD = (event) => {
    setOpenDD(true)
    setAnchorElDD(event.currentTarget);
  };
  const handlePopoverCloseDD = () => {
    // setAnchorElDD(null);
    setOpenDD(false);
    props.handleDateChange(moment(stateDD[0].startDate))
    props.handleDateChangeEnd(moment(stateDD[0].endDate));

  };
  const [openDD, setOpenDD] = React.useState(false);
  return (
    <>
      <div className="px-0">
        <div className={'d-flex px-1 px-md-4 flex-column flex-md-row'}>
          <div className={'fS20 c1C1D21 mr-auto d-none d-md-block'}>Общая статистика</div>
          <div className={'d-flex align-items-center mt-3 mt-md-0'}>
            <Popover
              //id={idDate}
              open={openDD}
              anchorEl={anchorElDD}
              onClose={handlePopoverCloseDD}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={item => {
                  setStateDD([item.selection])
                }}
                moveRangeOnFirstSelection={false}
                ranges={stateDD}
              //minDate={}
              />
            </Popover>


            <div className={'c5E6366 mr-1'} style={{ width: 84 }}>
              <TextField
                label=""
                className={'cursor-pointer fS15'}
                id="standard-size-small"
                defaultValue="Small"
                size="small"
                //ref={ref}
                value={useViewBoardStatContext.selectedDate.format("DD-MM-YYYY")}
                variant="standard"
                onClick={handlePopoverOpenDD}
              />
            </div>
            <div>-</div>
            <div className={'c5E6366 fS15 ml-2'} style={{ width: 84 }}>
              <TextField
                label=""
                className={'cursor-pointer fS15'}
                id="standard-size-small"
                defaultValue="Small"
                size="small"
                //ref={ref}
                value={useViewBoardStatContext.selectedDateEnd.format("DD-MM-YYYY")}
                variant="standard"
                onClick={handlePopoverOpenDD}
              />
            </div>

            {/*
                <Button size="medium" className={`mr-1 ${classes.twoButton} fontGR`}>
                  День
                </Button>
                <Button size="medium" className={`mr-1 ${classes.twoButton} fontGR`}>
                  Неделя
                </Button>
                <Button size="medium" className={`mr-1 ${classes.twoButton} fontGR`}>
                  Месяц
                </Button>
                */}
          </div>
        </div>



        <TableContainer className={"bgcfff mt-3 fontGR"}>
          <Table className={'tableStat'}>
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
              headCells={headCells}
            />
            <TableBody>
              {!!daysStat && daysStat.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                //console.log(' boardsboardsboards yyyyyyyyyyyyyyyyyyyyyyyyy')
                //console.log(row)
                //if (!!dataShowsReserved[row]) {
                return <Row row={row} key={row + "statRow"} index={index} isItemSelected={isItemSelected} statistic={statistic}
                  countAllworkSec={countAllworkSec} checkedList={checkedList} setData={setData} setOpenDialog={setOpen}
                  dataShowsReserved={dataShowsReserved}
                />
                //}

              })}
            </TableBody>
          </Table>
        </TableContainer>


        <ViewStatisticModal open={open} handleClose={handleClose} data={data} boardId={boardId} campHours={statistic.campHours} />

        <div style={{ paddingBottom: 60 }}></div>

        <Dialog maxWidth="md" open={openDialog} onClose={handleCloseDialog}  >
          <div className={'Wdialog'}>

            <div className={'d-flex'}>
              <div>
                <div className={'fS18 c212121'}>Общая статистика</div>
                <div className={'fS14 c546E7A mt-2 w-75'}>Показатель</div>
              </div>
              <div className={'fS14 c455A64 cursor-pointer ml-auto'} onClick={() => setCheckedList(checkedList.length > 1 ? [] : ['grp', 'ots'])}>{checkedList.length > 1 ? "Отменить всё" : "Выбрать всё"}</div>
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
            <Button className={`btn tTraN mr-auto ml-auto ${classes.startButton} `} onClick={handleCloseDialog} >
              <Box fontSize={14} fontWeight={500} className={'text-center'}>Применить</Box>
            </Button>
          </DialogActions>

        </Dialog>

      </div>
    </>
  );
};

function Row(props) {
  const { row, isItemSelected, statistic, countAllworkSec, index, checkedList, setData, setOpenDialog, dataShowsReserved } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  //let dataString = moment.unix(keyyy).format("YYYY-MM-DD");
  function loader() {
    if (!!dataShowsReserved) {
      return "0"
    } else {
      return <CircularProgress style={{ "height": 20, "width": 20 }} />
    }

  }
  return (
    <React.Fragment>
      <TableRow
        hover
        //
        // onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        //key={index + "daterow"}
        selected={isItemSelected}
        classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}

      >
        <TableCell component="th" scope="row" align={'left'} padding="none" style={{ height: 54 }} >
          <IconButton className={'mx-2'} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row}
        </TableCell>
        <TableCell padding="none" align={'right'} className={"px-2"}>
          ---
        </TableCell>
        <TableCell padding="none" align={'right'} className={"px-2"}>
          {!!dataShowsReserved[row] ? dataShowsReserved[row]['total'] : loader()}
        </TableCell>
        <TableCell className={`${classes.text2} px-2`} padding="none" align={'right'} >
          {!!statistic ?
            !!statistic[row] ? statistic[row]['total'] : "0"
            : <CircularProgress style={{ "height": 20, "width": 20 }} />}
        </TableCell>
        <TableCell padding="none" align={'right'} className={"px-2"}>
          {!!dataShowsReserved[row] ? Object.keys(dataShowsReserved[row].camps).length : loader()}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align={'right'} className={"px-2"}>
          {!!dataShowsReserved[row] ? (Math.round((countAllworkSec - dataShowsReserved[row].totalSec) / (countAllworkSec / 100))) + "%" : loader()}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align={'right'} className={"px-2"}>
          {!!dataShowsReserved[row] ? (Math.round(dataShowsReserved[row].totalSec / (countAllworkSec / 100))) + "%" : loader()}
        </TableCell>

        {checkedList.indexOf('ots') !== -1 &&
          <TableCell className={classes.text} align={'right'}>--</TableCell>
        }

        {checkedList.indexOf('grp') !== -1 &&
          <TableCell padding="none" className={classes.text} align={'right'}>--</TableCell>
        }
        <TableCell align="right" padding="none"></TableCell>
      </TableRow>

      {!!dataShowsReserved[row] ? Object.entries(dataShowsReserved[row].camps).map(([keyB, valueCamp]) => {
        // if(keyB != "all_shows" && keyB != "all_showed" && keyB != "all_cost"){
        //console.log(' boardsboardsboards yyyyyyyyyyyyyyyyyyyyyyyyy')
        // console.log( props.dataStat )
        // console.log( dataString )
        //console.log( keyB )
        let showedVar = 0;
        let costVar = 0;
        /*if(typeof props.dataStat[dataString] != "undefined"){
          if(typeof props.dataStat[dataString]["data_board"][keyB] != "undefined"){
            showedVar = props.dataStat[dataString]["data_board"][keyB]["showed"]
          }
          if(typeof props.dataStat[dataString]["data_board"][keyB] != "undefined"){
            costVar = props.dataStat[dataString]["data_board"][keyB]["cost"]
          }
        }*/

        return <TableRow
          key={row + keyB + "dopStatCamp"}
          onClick={() => {
            setData({ campData: valueCamp, date: row, campId: keyB });
            setOpenDialog(true);
          }}
          className={`cursor-pointer ${!!open ? "" : "d-none"}`}
        >
          <TableCell component="th" scope="row" className={'dataa'} >{valueCamp.title}</TableCell>
          <TableCell padding="none" align="right" className={"px-2"}>---</TableCell>
          <TableCell padding="none" align="right" className={"px-2 fS13"}>{valueCamp.total}</TableCell>
          <TableCell padding="none" align="right" className={"px-2 fS13"}>{!!statistic ?
            !!statistic[row] ? statistic[row][keyB] : "0"
            : <CircularProgress style={{ "height": 20, "width": 20 }} />}</TableCell>
        </TableRow>

      }) : null}


    </React.Fragment>
  );
}


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort, handleClickOpenDialog, checkedList, headCells } = props;
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
  createBT: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: "29px",
      right: "10px",
    },
    "& button": {
      width: 44,
      height: 44,
      borderRadius: 4,
      backgroundColor: "#66BB6A"
    }
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

      <Tooltip title="Создать кампанию" className={`${classes.createBT}`}>
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
  token: store.auth.authTokenG
});
export default withRouter(connect(mapStateToProps)(Statistic))