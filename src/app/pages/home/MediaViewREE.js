import React, { useState, useEffect } from "react";
import axios from "axios";
import { toAbsoluteUrl } from "../../../_metronic/utils/utils";

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
  Grid,
  TableFooter,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions, AppBar, Tabs, Tab, DialogContent, Button, Hidden
} from "@material-ui/core";

import Pagination from "react-js-pagination";
import Select from "react-select";

import Menu from "./menu";
import DevicesMap from "./map";
import { dropdownStyles } from "../../utils";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Moment from "react-moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {FormattedMessage} from "react-intl";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  AppBar:{
    backgroundColor: '#FAFAFA',
    boxShadow: 'none'
  },
  rootEmpty:{
    textAlign: 'center',
    marginTop: '160px'
  },
  Circular:{
    width:'12px',
    margin:'0 5px 0 0'
  },
  CheckboxChecked:{
    color: '#0075FF!important'
  },
  headCellLabel: {
    color: '#000E40',
    fontSize: '13px',
  },
  TableHead:{
  },
  TableRow:{
    height: '58px',
  },
  text:{
    fontSize: '13px',
    fontWeight: 500
  },
  text2:{
    fontSize: '13px',
    fontWeight: 500,
    color: '#42556B'
  },
  TableCellNameA:{
    fontSize: '13px',
    color: '#0075FF',
    fontWeight: 500
  },
  TableRowBody:{
    padding:"0 25px"
  },
  TableRowBodyS:{
    backgroundColor: '#FAFAFA!important'
  },
  headCellSubLabel:{
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
  greyPla:{
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
  paper:{
    backgroundColor: 'unset',
    boxShadow: 'none!important'
  },
  helpSelect:{
    position:'absolute',
    backgroundColor: '#405465 !important',
    width: '100%',
    color: '#fff',
    padding: '0 20px',
    [theme.breakpoints.down("xs")]: {
      position: 'fixed',
      bottom: 0
    }
  },
  filterIcon:{
    position:'absolute',
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
  rootCard:{
    padding: '4px 12px',
    margin: 12
  },
  rootCardContent:{
    padding:0
  },
  cityMob:{
    fontSize: 10,
    textTransform: 'uppercase!important'
  }
}));
const headCells = [
  { field: 'name', label: "Название", sublabel:"Название рекламной кампании", width: 400, minW: 220, numeric: false, disablePadding: true, filter:false },
  { field: 'creator', label: "Владелец", sublabel:"Завершенность", width: 200, numeric: false, disablePadding: false, filter:false  },
  { field: 'date', label: "Дата создания", sublabel:"Дата начала", width: 200, numeric: false, disablePadding: false, filter:false},
  { field: 'count', label: "Загружено файлов", sublabel:"Дата начала", width: 200, numeric: false, disablePadding: false, filter:false},
];

const MediaViewREE = () => {
  const [albumsData, setAlbumsData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortTooltip, setSortState] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filterCity, setFilterCity] = useState([]);
  const [filterResolution, setFilterResolution] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [currentSort, setCurrentSort] = useState(null);

  const classes = useStyles();
  useEffect(() => console.log(currentSort), [currentSort]);
  useEffect(() => {
    getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentSort]);

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
          `http://okta1.ru/creative-group?page=${currentPage}&subuser=${JSON.parse(localStorage.getItem("currentUser")).id}${
              !!currentSort ? `&sort=${currentSort}` : ""
          }${!!filterCity.length ? `&city=${cityStr}` : ""}${!!filterResolution.length ? `&resolution=${resolutionStr}` : ""}${
              !!filterName ? `&title=${filterName}` : ""
          }`
      );
      setAlbumsData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
      <>

        {!!albumsData && !!albumsData.creative && albumCount == 0 &&
        <div className={classes.rootEmpty}>
          <Typography style={{'margin-bottom': 10}}>Добавить альбом</Typography>
          <Link to="/myboards/add">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
        }

        {((!!albumsData && !!albumsData.creative && albumsData.creative.length > 0 ) || albumCount != 0) && (
            <>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar {...props} count={selected.length} setFilterName={setSearch} setOpen={setOpen} />
                <AppBar position="static" color="default"  className={classes.AppBar}>
                  <Tabs
                      value={filterStatuses}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="full width tabs example"
                  >
                    <Tab label="Все" />
                    <Tab label="Доступные" disabled={true}/>
                  </Tabs>
                  <Divider />
                  {albumsData.creative.length == 0 &&
                  <Box letterSpacing={'.0178571429em!important'} fontSize={14} color="text.secondary"
                       className={'my-4 ml-auto mr-auto'}>Ни один альбом не соответствует вашему поиску</Box>
                  }
                  <Tooltip title="Настройка данных" className={classes.filterIcon}>
                    <IconButton aria-label="filter list" onClick={handleClickOpenDialog}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>

                  <Dialog
                      maxWidth="xs"
                      open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Настройка данных</DialogTitle>
                    <DialogContent classes={{root: classes.DialogContent}}>
                      <List dense={true} className={classes.rootList}>
                        {headCells.map((value) => {
                          if(!value.filter){
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
                      <IconButton aria-label="delete" onClick={()=>setSelected([])}>
                        <DeleteIcon className={'text-white'} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  }
                </AppBar>
                {!!albumsData.creative && albumsData.creative.length > 0 &&
                <>
                  <Hidden only={["xs"]}>
                    <TableContainer>
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
                            rowCount={albumsData.creative.length}
                        />
                        <TableBody>
                          {stableSort(albumsData.creative, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                        classes={{root: classes.TableRowBody, selected: classes.TableRowBodyS}}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                            classes={{checked: classes.CheckboxChecked}}
                                            checked={isItemSelected}
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                      </TableCell>
                                      <TableCell component="th" id={labelId} scope="row" padding="none">
                                        <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                              to={`/md/view/${row.id}`} >
                                          {row.name}
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
                              <TableRow style={{height: (53 * emptyRows)}}>
                                <TableCell colSpan={6}/>
                              </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Hidden>


                  <Hidden only={["sm", "md", "lg", "xl"]}>
                    {stableSort(albumsData.creative, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          return <Card className={classes.rootCard}>
                            <CardContent classes={{root: classes.rootCardContent}}>
                              <div className={'d-flex my-2 align-items-center row'}>
                                <div className={'col-2 px-0'}>
                                  <Checkbox
                                      classes={{checked: classes.CheckboxChecked}}
                                      checked={isItemSelected}
                                      onChange={(event) => handleClick(event, row.id)}
                                  />
                                </div>
                                <div className={`col-5 px-0 ${classes.text}`}>{row.private == 0 || row.private == null ? "Приватный" : "Общий"}</div>
                                <div className={`col-5 px-0 ${classes.text}`}></div>
                              </div>
                              <Typography className={classes.cityMob} color="textSecondary">
                                {!!row.city && (
                                    <FormattedMessage id={"CITY_" + row.city}/>
                                )}
                              </Typography>


                              <Link className={`C-NameHover ${classes.TableCellNameA}`}
                                    to={`/myboards/view/${row.id}`} >
                                <Typography variant="body2" component="p" style={{ color: '#004fff'}}>
                                  {row.title}
                                </Typography>
                              </Link>
                            </CardContent>
                          </Card>
                        })}
                  </Hidden>
                  <TablePagination
                      rowsPerPageOptions={[10, 25]}
                      component="div"
                      count={albumsData.creative.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </>
                }

              </Paper>
            </>
        )}


        <Paper>
          <Grid container style={{ padding: "0 25px", height: "60px" }} justify="space-between" direction="row">
            <Grid style={{ alignSelf: "center" }}>
              <Typography className="kt-portlet__head-title" style={{ paddingLeft: 0 }} classes={{ root: classes.title }}>
                Список альбомов
              </Typography>
            </Grid>
            <Grid style={{ width: "auto" }} container direction="row">
              <Grid style={{ alignSelf: "center" }}>
                <Tooltip
                    placement="bottom-end"
                    classes={{ tooltip: classes.tooltip }}
                    disableHoverListener
                    open={sortTooltip}
                    interactive
                    onClose={setSortState.bind(null, false)}
                    title={
                      <Grid container direction="column">
                        <button className="btn btn-clean btn-icon-md" onClick={setCurrentSort.bind(null, "by_creation_date")}>
                          <i className="kt-nav__link-icon flaticon2-drop" /> По дате создания
                        </button>
                        <button className="btn btn-clean btn-icon-md" onClick={setCurrentSort.bind(null, "by_budget")}>
                          <i className="kt-nav__link-icon flaticon2-drop" />
                          По бюджету
                        </button>
                        <button className="btn btn-clean btn-icon-md" onClick={setCurrentSort.bind(null, "by_shows")}>
                          <i className="kt-nav__link-icon flaticon2-drop" />
                          По показам
                        </button>
                        <button className="btn btn-clean btn-icon-md" onClick={setCurrentSort.bind(null, "by_type")}>
                          <i className="kt-nav__link-icon flaticon2-drop" />
                          По типу экрану
                        </button>
                        <button className="btn btn-clean btn-icon-md" onClick={setCurrentSort.bind(null, "by_status")}>
                          <i className="kt-nav__link-icon flaticon2-drop" />
                          По статусу
                        </button>
                      </Grid>
                    }
                >
                  <button
                      className={sortTooltip ? "btn btn-clean btn-icon-md btn-opened" : "btn btn-clean btn-icon-md"}
                      onClick={setSortState.bind(null, !sortTooltip)}
                  >
                    Сортировка
                  </button>
                </Tooltip>
              </Grid>
              <Grid style={{ alignSelf: "center" }}>
                <button className="btn btn-clean btn-sm btn-icon btn-icon-md" onClick={() => setFilterModal(true)}>
                  <i className="flaticon-more-1" />
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <TableContainer style={{ paddingTop: 20 }}>
            <Table>
              <TableBody>
                {!!albumsData.creative &&
                albumsData.creative.map(album => (
                    <TableRow>
                      <TableCell>
                        <div className="kt-demo-icon">
                          <div className="kt-demo-icon__preview">
                            <i className="fa fa-folder"></i>
                          </div>
                          <div className="kt-demo-icon__class">
                            <Typography classes={{ root: classes.infoHead }}>{album.name}</Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{album.camp !== 0 ? album.camp : "---"}</TableCell>
                      <TableCell>{album.showed !== 0 ? album.showed : "---"}</TableCell>
                      <TableCell>{album.reserved !== 0 ? album.reserved : "---"}</TableCell>
                      <TableCell>
                        <Box component="span" className="kt-badge kt-badge--inline kt-badge--brand">
                          new
                        </Box>
                      </TableCell>
                      <TableCell>{album.profit !== 0 ? album.profit : "---"}</TableCell>
                      <TableCell>
                        <Menu id={album.id} type="devices" />
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableFooter>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={!!albumsData.meta && albumsData.meta.total}
                pageRangeDisplayed={5}
                prevPageText="<"
                nextPageText=">"
                onChange={newPage => setCurrentPage(newPage)}
            />
          </TableFooter>
        </Paper>

        <Dialog open={filterModal} onClose={() => setFilterModal(false)} classes={{ paper: classes.filterModal }}>
          <DialogTitle>Фильтры</DialogTitle>
          {/* <Divider /> */}
          <DialogActions>
            <Grid container direction="column">
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                По городу
                <Select
                    styles={dropdownStyles}
                    options={!!albumsData.filter && albumsData.filter.city}
                    placeholder="Выберите город..."
                    value={filterCity}
                    isMulti
                    onChange={e => {
                      if (!!e) {
                        setFilterCity(e);
                      } else {
                        setFilterCity([]);
                      }
                    }}
                />
              </label>
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                По разрешению
                <Select
                    styles={dropdownStyles}
                    options={!!albumsData.filter && albumsData.filter.resolution}
                    isMulti
                    value={filterResolution}
                    placeholder="Выберите разрешение..."
                    onChange={e => {
                      if (!!e) {
                        setFilterResolution(e);
                      } else {
                        setFilterResolution([]);
                      }
                    }}
                />
              </label>
              <label className="single-select" style={{ marginBottom: "2rem" }}>
                По названию
                <input className="form-control" placeholder="По названию..." onChange={e => setFilterName(e.target.value)} value={filterName} />
              </label>
            </Grid>
          </DialogActions>
          {/* <Divider /> */}
          <Grid style={{ padding: "15px" }} container justify="center">
            {/* <button className="btn btn-secondary" onClick={setFilterModal.bind(null, false)}>
            Отмена
          </button> */}
            <button
                className="btP tUp btn btn-success mT20"
                onClick={() => {
                  getBoards();
                  setFilterModal(false);
                }}
                style={{ marginLeft: 5 }}
            >
              Отфильтровать
            </button>
          </Grid>
        </Dialog>
      </>
  );
};

export default MediaView;
