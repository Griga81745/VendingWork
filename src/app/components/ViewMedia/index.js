import React, { useState, useEffect } from "react";
import axios from "axios";
import { toAbsoluteUrl } from "app/utils/index";
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
  Dialog,
  DialogTitle,
  DialogActions,
  Hidden,
  Fade,
  Menu, TableSortLabel, Toolbar, InputBase, withWidth,
  Fab, IconButton, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, TablePagination,
  withStyles, AppBar, Tabs, Tab, DialogContent, Button, fade, Avatar, InputAdornment, LinearProgress
} from "@material-ui/core";
import { Link, useParams, withRouter } from "react-router-dom";
import AlbumViewTablet from "./AlbumViewTablet";
import AlbumViewDesktop from "./AlbumViewDesktop";
import AlbumViewMobile from "./AlbumViewMobile";
import ProgressLoader from "./ProgressLoader";
import AddIcon from '@material-ui/icons/Add';

import Pagination from "react-js-pagination";
import Select from "react-select";
import CloseIcon from "@material-ui/icons/Close";

import { dropdownStyles } from "../../utils";
import Swal from "sweetalert2";
import Moment from "react-moment";
import { FormattedMessage, injectIntl } from "react-intl";
import clsx from "clsx";
// import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
// import DeleteIcon from '@material-ui/icons/Delete';
import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";
import FsLightbox from "fslightbox-react";
import { connect } from "react-redux";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
    backgroundColor: '#EDF7FF !important',
    padding: '2px 5px 3px 20px',
    transition: 'all 1s ease-in',
    borderRadius: "4px"
  },
  helpSelect2: {
    position: 'fixed',
    backgroundColor: '#EDF7FF !important',
    padding: '4px 16px 4px',
    bottom: 0,
    left: 0
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
  { field: 'creator', label: "Владелец", sublabel: "Завершенность", width: 200, numeric: false, disablePadding: false, filter: false },
  { field: 'res', label: "Разрешение", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: true, filter: false },
  { field: 'mb', label: "Мб", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: false, filter: false },
  { field: 'camp', label: "Кампании", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: true, filter: false },
  { field: 'date', label: "Дата создания", sublabel: "Дата начала", width: 200, numeric: false, disablePadding: false, filter: false },
];

const MediaView = props => {
  const { currentUser } = props;
  const [albumData, setAlbumData] = useState({});
  const [albumDataWaiter, setAlbumDataWaiter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortTooltip, setSortState] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filterCity, setFilterCity] = useState([]);
  const [filterResolution, setFilterResolution] = useState([]);
  //const [filterName, setFilterName] = useState("");
  const [currentSort, setCurrentSort] = useState(null);
  const [albumCount, setAlbumCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [setting, setSetting] = useState({
    filterName: "",
    page: 0,
    uploadedPages: [],
    filterStatuses: 0
  });
  function setFilterNamePre(val) {
    //setAlbumData({...albumData, creative: []});

    //  console.log('Object.setFilterNamePresetFilterNamePresetFilterNamePre');
    //  console.log(val);


    //setAlbumDataWaiter(true);
    let newAlbumsData = { ...albumData, creative: {} };
    setAlbumData(newAlbumsData);
    setSetting({ ...setting, page: 0, uploadedPages: [], filterName: val });
    //setPage(0);
    // setFilterName(val);
  }
  const [loaderShow, setLoaderShow] = useState(false);

  const classes = useStyles();
  //useEffect(() => console.log(currentSort), [currentSort]);
  useEffect(() => {
    setLoaderShow(true)
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSort, setting]);

  // Example 7
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

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);
  let { id } = useParams();

  const getFiles = async () => {
    try {

      if (setting.uploadedPages.indexOf(setting.page) > -1) {
        setLoaderShow(false)
        return;
      }

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
        `/creative-group/view?id=${id}&page=${setting.page + 1}&subuser=${currentUser.id
        }${!!currentSort ? `&sort=${currentSort}` : ""}${!!filterCity.length ? `&city=${cityStr}` : ""
        }${!!filterResolution.length ? `&resolution=${resolutionStr}` : ""}${!!setting.filterName ? `&title=${setting.filterName}` : ""
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


      if (!!albumData.creative && !!Object.keys(albumData.creative).length && !albumDataWaiter) {
        /*   let newCrea = {...albumData};
           res.data.creative.map((value, key)=>{
             newCrea.creative[key] = value;
           })

           console.log('Object.keys(data).length');
           console.log(newCrea);
   */
        //  let newCrea = [...albumData.creative, ...Object.values(res.data.creative)];

        let newCrea = { ...albumData.creative };
        let urlParams = new URL("http://example.com" + res.config.url);
        newCrea[urlParams.searchParams.get('page') - 1] = Object.values(res.data.creative);


        let newAlbumsData = { ...albumData, creative: newCrea };
        console.log('Object.keys(data).length creative 1111');
        console.log(newAlbumsData);

        setAlbumData(newAlbumsData);
      } else {

        console.log('Object.keys(data).length11111111');
        let newFilesData = { ...res.data, creative: { 0: Object.values(res.data.creative) } };
        console.log(newFilesData);

        setAlbumData(newFilesData);
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
  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
      text: "Разрешение файла не соответствует выбранным экранам!"
    });
  };
  const fileOk = () => {
    Swal.fire({
      title: "Файл загружен!",
      icon: "success",
      timer: 3000,
      text: "Файл успешно загружен"
    });
  };

  const [uploadProgress, updateUploadProgress] = useState(0);
  const [uploadGo, setUploadGo] = useState(false);
  const uploadNewFile = file => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("group", id);

    setUploadGo(true);
    const options = {
      onUploadProgress: (ev) => {
        const progress = (ev.loaded / ev.total) * 100;
        updateUploadProgress(Math.round(progress));
      }
    };
    axios
      .post(
        `/creative/upload-creative?subuser=${currentUser.id}`,
        formData,
        options
      )
      .then(res => {
        setUploadGo(false);
        fileOk();
        setCurrentPage(1);
        //window.scrollTo(0, 0);
        getFiles();
        //props.setPictures(res.data.file);
        //addNewFile(res.data.file);
      })
      .catch(error => {
        setUploadGo(false);
        console.log(error);
      });
  };
  //const addNewFile = (file) => setSelectedFiles([...selectedFiles, {
  //  ...file,
  //  active: "0",
  //  position: selectedFiles.length + 1
  //}]);

  //const [imgUrl, setImgUrl] = useState([]);
  const handleChangeFile = file => {
    // let file = event.target.files[0]
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        uploadNewFile(file);
        //setImgUrl([...imgUrl, image.src]);
      };
    } else {
      uploadNewFile(file);
    }
  };
  let fileInput = null;
  const triggerInputFile = () => fileInput.click();



  const [filterStatuses, setFilterStatuses] = useState(0);
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
      const newSelecteds = albumData.creative.map((n) => n.id);
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
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, (!!albumData.creative ? albumData.creative.length : 0) - setting.page * rowsPerPage);

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

  const [toggler, setToggler] = useState(false);
  const [file_path, setFile_path] = useState({});

  //let file_path =
  //    process.env.REACT_APP_MY_HOST_CREATIVE +
  //    `/creative/${album.group_id}/${album.link}`;


  return (
    <>
      <input
        style={{ opacity: "0", width: "0.1px", height: "0.1px" }}
        type="file"
        ref={input => (fileInput = input)}
        className={'d-block'}
        accept=".mp4, .jpg, .jpeg"
        onChange={e => handleChangeFile(e.target.files[0])}
      />
      {!!albumData && !!albumData.creative && albumCount == 0 &&
        <div className={classes.rootEmpty}>
          <Typography style={{ marginBottom: 10 }}>Добавить файл</Typography>
          <Link to="#" onClick={triggerInputFile}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>

        </div>
      }

      {albumCount != 0 && (
        <>
          <EnhancedTableToolbar triggerInputFile={triggerInputFile}
            {...props} count={selected.length} setFilterName={setFilterNamePre} setOpen={setOpen} all_data={albumData.all_data} />
          <Paper className={'paper position-relative'}>

            <Divider />
            {!!albumData.creative && albumData.creative.length == 0 && !loaderShow &&
              <Box letterSpacing={'.0178571429em!important'} fontSize={14} color="text.secondary"
                className={'my-4 ml-auto mr-auto'}>Ни один файл не соответствует вашему поиску</Box>
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


            <Hidden only={["xs", "sm"]}>
              <div className={`fontGR mx-4 helpSelect align-items-center mt-3 c274C77 fS14 ${selected.length > 0 ? "d-flex" : "d-none"}`}>
                <div style={{ marginRight: 120 }}>
                  Файлов выбрано  <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
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
                  Файлов выбрано <Box component="span" fontWeight={600} className={'fontGM'}>{selected.length}</Box>
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
                  <IconButton size="small" className={'helpButton small c274C77 p-2'} onClick={() => setSelected([])} >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Hidden>

            {loaderShow === true && <LinearProgress className={classes.loader} />}

            <>

              {(!!albumData.creative || loaderShow) &&
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
                        rowCount={albumData.creative.length}
                        handleClickOpenDialog={handleClickOpenDialog}
                      />
                      {!!albumData.creative && !!albumData.creative[setting.page] &&
                        <TableBody>
                          {
                            //stableSort(albumData.creative, getComparator(order, orderBy))
                            // .slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                            //   .map((row, index) => {
                            albumData.creative[setting.page].map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              console.log(row)
                              console.log("dsfdsfsdfrowrowrowrowrow")
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                  classes={{ root: classes.TableRowBody, selected: classes.TableRowBodyS }}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      classes={{ checked: classes.CheckboxChecked }}
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                      onChange={(event) => handleClick(event, row.id)}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none" style={{ padding: '7px 0 6px 0', maxWidth: 300, overflow: "hidden", minWidth: 300 }}>
                                    {row.mime.split("/")[0] == "audio" ?
                                      (<Box className={'d-flex align-items-center'}> <IconButton
                                        style={{ fill: "rgb(233, 85, 91)" }}>
                                        <AudiotrackTwoToneIcon fontSize="large" />
                                      </IconButton>
                                        <Box>
                                          {row.title}
                                        </Box>
                                      </Box>) :
                                      (<Box className={'d-flex align-items-center'}>
                                        <Avatar
                                          onClick={() => {
                                            setFile_path(row);
                                            setToggler(!toggler);
                                          }}
                                          variant="rounded"
                                          src={
                                            process.env.REACT_APP_MY_HOST_CREATIVE +
                                            `/creative/${row.group_id}/thumb${row.link.split(".")[0]
                                            }.jpg`
                                          }
                                          className="mr-2 cursor-pointer"
                                        /><Box className={classes.text}>{row.title}</Box>
                                      </Box>)
                                    }
                                  </TableCell>

                                  <TableCell align="left" className={classes.text}>
                                    {row.username !== 0 ? row.username : "-"}
                                  </TableCell>

                                  <TableCell align="left" className={classes.text} padding="none">
                                    {row.resw !== 0 ? row.resw : "-"}X
                                    {row.resh !== 0 ? row.resh : "-"}
                                  </TableCell>

                                  <TableCell align="left" className={classes.text}>
                                    {row.filesize !== 0
                                      ? (row.filesize / 1024 / 1024).toFixed(2)
                                      : "-"}
                                  </TableCell>

                                  <TableCell align="left" className={classes.text} padding="none">
                                    0
                                  </TableCell>

                                  <TableCell align="left" className={classes.text}>
                                    <Moment format="DD.MM.YYYY">
                                      {row.created_at !== 0 ? row.created_at : "-"}
                                    </Moment>
                                  </TableCell>

                                  <TableCell align="left" className={classes.text}>
                                    {row.count !== 0 ? row.count : "0"}
                                  </TableCell>

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
                  //stableSort(albumData.creative, getComparator(order, orderBy))
                  //   .slice(setting.page * rowsPerPage, setting.page * rowsPerPage + rowsPerPage)
                  //  .map((row, index) => {
                  !!albumData.creative[setting.page] && albumData.creative[setting.page].map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    return <Card className={classes.rootCard} key={row.id + 'cardMediaView'}>
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

              {!!albumData.creative &&
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={albumData.meta.total}
                  rowsPerPage={10}
                  page={setting.page}
                  onChangePage={handleChangePage}
                //onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              }
            </>


          </Paper>
          <FsLightbox
            toggler={toggler}
            sources={[!!file_path.group_id ? (process.env.REACT_APP_MY_HOST_CREATIVE + `/creative/${file_path.group_id}/${file_path.link}`) : ""]}
            type={!!file_path.link ? (file_path.link.split(".")[1] === "jpg" ? "image" : "video") : "image"}
            key={!!file_path.link ? file_path.id : false}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});
export default withWidth()(injectIntl(withRouter(connect(mapStateToProps)(MediaView))));

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
        Файлы
      </div>
      <div className={`${classes.search}`}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Поиск файлов…"
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
      <Tooltip title="Добавить файл" className={`createBT`}>
        <Link to="#" onClick={props.triggerInputFile}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Tooltip>
    </Toolbar>
  );
};


