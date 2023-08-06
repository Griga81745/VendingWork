import React, { useState } from "react";
import {
  Table,
  TableBody, TableContainer, TableHead, TableSortLabel,
  makeStyles,
  Box,
  IconButton, TableCell, TableRow, Hidden
} from "@material-ui/core";



//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import Datetime from "react-datetime";
//import $ from "jquery";
//import ionRangeSlider from "ion-rangeslider";
import "../../../_metronic/_assets/scss/datetime.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
//import Select from "react-select";
import { FormattedMessage, injectIntl } from "react-intl";

import TvIcon from '@material-ui/icons/Tv';
import "react-dates/initialize";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   isInclusivelyBeforeDay,
//   isInclusivelyAfterDay
// } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ru";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//import Chip from '@material-ui/core/Chip';
//import DoneIcon from '@material-ui/icons/Done';
//import FsLightbox from "fslightbox-react";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//var moment = require("moment");
const useStyles = makeStyles(theme => ({
  tabContainer: {
    backgroundColor: "#fafafa",
    width: 476,
    position: 'absolute',
    top: 0
  },
  elevation: {
    boxShadow: 'none!important',
    border: "1px solid #DDE7F0",
    backgroundColor: "#fafafa",
    margin: "0 0 10px 0",
  },
  tabHeader: {
    margin: "1.75rem 0",
    fontSize: "1.1rem",
    color: "#48465b"
  },
  twoItemsRowItem: {
    width: "100%"
  },
  iconContainer: {
    padding: "7px 1rem",
    border: "1px solid #e2e5ec",
    borderRadius: "0 4px 4px 0",
    fontSize: "1.4rem",
    backgroundColor: "#f7f8fa"
  },
  spacer: {
    marginBottom: "16px"
  },
  typographyTitle: {
    color: "#000E40",
    fontWeight: 500,
    fontSize: "15px"
  },
  nextButton: {
    marginTop: "26px",
    padding: "12px 30px",
    backgroundColor: "#22b9ff",
    "&:hover": {
      backgroundColor: "#00abfb"
    }
  },
  showPhoto: {
    width: '56px',
    height: '56px',
    borderRadius: 3,
    [theme.breakpoints.down('md')]: {
      width: '56px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '56px',
      height: '56px',
    }
  },
  showPhotoEmpty: {
    width: '56px',
    height: '56px',
    backgroundColor: '#ECECEC',
    borderRadius: 3
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  expansionStyle: {
    margin: "0 !important",
    boxShadow: "none !important",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "0 !important",
    borderRadius: "0 !important"
  },
  conteiner: {
    padding: '20px 20px 0 18px'
  },

  inputCity: {
    padding: '10px 0 20px 0',

  },
  changePositionBlock: {
    maxWidth: "200px",
    minWidth: "200px",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  rightMar40: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 40
    }
  }
}));


const CheckUpSelectedBoards = props => {
  const { choosedBoards: boards, setValue } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [file_path, setFile_path] = useState([]);
  const [togglerBoarbId, setTogglerBoarbId] = useState('productdetail00000');
  const [toggler, setToggler] = useState(false);

  function create_file_paths(board) {
    let photos = [];
    // let board = boards.filter( e => e.id == id)[0];

    if (!!board.photo) {
      board.photo.forEach(e => {
        photos.push(e.path_url + e.link);
      })

      setFile_path(photos);
      setTogglerBoarbId('productdetail' + board.id);
      setTimeout((e) => setToggler(!toggler), 500);
    }
  }
  const [setting, setSetting] = useState({
    pageBoardList: 1,
  })

  return (
    <>
      <div className={`align-items-center c274C77 fS14 fontGR helpSelect mt-1 mb-2 ${Object.keys(boards).length > 0 ? "d-flex" : "d-none"}`} style={{ padding: "12px 16px" }} >

        <Hidden only={["md", "lg", "xl"]}>
          <div>
            <div className={'w-50'}>
              Выбрано уст-тв <Box component="span" fontWeight={600} className={'fontGM'}>{Object.keys(boards).length}</Box>
            </div>

            {Object.keys(boards).length > 20 &&
              <div style={{ marginTop: '-3px' }} className={'w-50 d-flex align-items-center'}>
                <div>
                  {setting.pageBoardList} из {Math.ceil(Object.keys(boards).length / 10)}
                </div>
                <div className={'ml-2 d-flex align-items-center'}>
                  <IconButton
                    onClick={() => {
                      let page = setting.pageBoardList - 1;
                      if (page < 1) {
                        page = 1;
                      }
                      setSetting({ ...setting, pageBoardList: page });
                    }}>
                    <ArrowBackIosIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      let page = setting.pageBoardList + 1;
                      let pages = Math.ceil(Object.keys(boards).length / 10);
                      if (page > pages) {
                        page = pages;
                      }
                      setSetting({ ...setting, pageBoardList: page });
                    }}>
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            }
            <div className={'c448AFF w-100 cursor-pointer'} onClick={() => setValue(3)}>Показать все конструкции на карте</div>
          </div>
        </Hidden>
        <Hidden only={["xs", "sm"]}>
          <div className={classes.rightMar40}>
            Выбрано устройств <Box component="span" fontWeight={600} className={'fontGM'}>{Object.keys(boards).length}</Box>
          </div>
          <div className={'c448AFF cursor-pointer'} onClick={() => setValue(3)} >Показать все конструкции на карте</div>
          {Object.keys(boards).length > 20 &&
            <div style={{ marginTop: '-3px' }} className={'d-flex align-items-center ml-auto'}>
              <div>
                {setting.pageBoardList} из {Math.ceil(Object.keys(boards).length / 10)}
              </div>
              <div className={'ml-2 d-flex align-items-center'}>
                <IconButton
                  onClick={() => {
                    let page = setting.pageBoardList - 1;
                    if (page < 1) {
                      page = 1;
                    }
                    setSetting({ ...setting, pageBoardList: page });
                  }}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    let page = setting.pageBoardList + 1;
                    let pages = Math.ceil(Object.keys(boards).length / 10);
                    if (page > pages) {
                      page = pages;
                    }
                    setSetting({ ...setting, pageBoardList: page });
                  }}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          }
        </Hidden>

      </div>

      <TableContainer>
        <Table style={{ "minWidth": "650px" }}>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            rowCount={10}
          />
          <TableBody>
            {Object.keys(boards).map(key => {
              return (
                <TableRow
                  hover
                  //
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={key + 'creativeFornewBoards'}
                  style={{ height: 64 }}
                >
                  <TableCell component="th" scope="row" align={'left'} padding="none" className={`${classes.changePositionBlock} pr-1 pr-md-2`} >
                    <div className={'d-flex align-items-center pl-3'}>
                      {(!!boards[key] && !!boards[key].board_files && !!boards[key].board_files.photo) ?
                        (<img
                          //onClick={() => create_file_paths(boardData.id)}
                          //variant="rounded"
                          className={`${classes.showPhoto}`}
                          src={`https://st.de4.ru/boards/${boards[key].id}/thumb${boards[key].board_files.photo[0].link.replace(
                            /(\.[m][p][4])/g,
                            ".jpg"
                          )}`
                          }
                        />) :
                        (<div className={`${classes.showPhotoEmpty} d-flex justify-content-center align-items-center`}><TvIcon style={{ color: '#c7c7c7', width: '30px', height: '30px' }} /></div>)}
                      <div className={'fontGR ml-3'}>{boards[key].title}</div>
                    </div>
                  </TableCell>
                  <TableCell padding="none" align={'left'} className={'fontGR py-1 px-1 px-md-2'}>
                    ---
                  </TableCell>

                  <TableCell padding="none" align={'left'} className={'fontGR px-1 px-md-2'}>
                    {boards[key].address}
                  </TableCell>

                  <TableCell padding="none" align={'left'} className={'fontGR c448AFF px-1 px-md-2'}>
                    Показать на карте
                  </TableCell>
                  <TableCell padding="none" align={'left'} className={'fontGR c448AFF px-1 px-md-2'}>
                    Показать подробности
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: 60 }}></div>
    </>
  );
};


const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(CheckUpSelectedBoards)));

const headCells = [
  { field: 'name', label: "Название", minwidth: 140, width: "9%", align: 'left', padding: "0 0 0 16px", disablePadding: true, filter: false },
  { field: 'location', label: "Местоположение", minwidth: 150, width: "10%", align: 'left', disablePadding: true, filter: false },
  { field: 'address', label: "Адрес", minwidth: 120, width: "14%", align: 'left', disablePadding: true, filter: false },
  { field: 'map', label: "Карта", minwidth: 120, width: "14%", align: 'left', disablePadding: true, filter: false },
  { field: 'description', label: "Подробности", minwidth: 235, width: "13%", align: 'left', disablePadding: true, filter: false }
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
            // width={'33%'}
            //style={{minWidth:headCell.minwidth, padding: !!headCell.padding ? headCell.padding : "" }}
            style={{ padding: !!headCell.padding ? headCell.padding : "" }}
            key={headCell.field + 'cam'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={'py-0 px-1 px-md-3'}
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
