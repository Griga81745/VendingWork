import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Checkbox, Avatar
} from "@material-ui/core";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { FormattedMessage, injectIntl } from "react-intl";
import DevicesMap from "./map";
///import objectPath from "object-path";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import FsLightbox from "fslightbox-react";

const useStyles = makeStyles({
  tableTd: {
    overflow: 'hidden',
    width: '400px',
    whiteSpace: 'nowrap',
  },
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  headerText: {
    fontSize: "1rem",
    fontWeight: 888,
    color: "#595d6e"
  },
  headerText2: {
    paddingLeft: "2px",
    width: "300px"
  },
  tabHeader: {
    margin: "1.75rem 0",
    fontSize: "1.4rem",
    fontWeight: 500,
    color: "#48465b"
  },
  cell: {
    padding: "10px"
  },
  cellText: {
    color: "#595d6e",
    fontSize: "1rem",
    fontWeight: 300
  },
  nextButton: {
    marginTop: "26px",
    padding: "12px 30px",
    backgroundColor: "#22b9ff",
    "&:hover": {
      backgroundColor: "#00abfb"
    }
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  prevButton: {
    marginTop: "26px",
    padding: "12px 30px",
    border: "1px solid #e2e5ec",
    "&:hover": {
      backgroundColor: "#f4f5f8"
    }
  },
  prevButtonText: {
    color: "#595d6e",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  }
});

const SecondTab = props => {
  const { boards, allboards, user, intl, radio } = props;

  const [file_path, setFile_path] = useState([]);
  function create_file_paths(id){
    let photos = [];
    let board = boards.filter( e => e.id == id)[0];

    if(!!board.photo){
      board.photo.forEach(e => {
        photos.push(e.path_url+e.link);
      })

      setFile_path(photos);
      setTogglerBoarbId('productdetail' + id);
      setTimeout((e) => setToggler(!toggler), 500);
    }
  }
  const [toggler, setToggler] = useState(false);
  const [togglerBoarbId, setTogglerBoarbId] = useState('productdetail00000');


  const [resolutionData, setResolutionData] = useState({});
  const [cityData, setCityData] = useState({});

  const classes = useStyles();

  useEffect(() => {
    props.getBoards();
    //window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    preSetResolutionData(props.allboards);
    preSetCityData(props.allboards);
    //preSetSizeData( props.allboards );
  }, [props.allboards]);

  const preSetCityData = data => {
    if (!!data) {
      var unique = [];
      var distinct = [];
      for (let i = 0; i < data.length; i++) {
        if (!unique[data[i].city]) {
          distinct.push({
            value: data[i].city,
            label: intl.formatMessage({
              id: "CITY_" + data[i].city
            })
          });
          unique[data[i].city] = 1;
        }
      }
      setCityData(distinct);
    }
  };

  const preSetSizeData = data => {
    if (!!data) {
      var unique = [];
      var distinct = [];
      for (let i = 0; i < data.length; i++) {
        if (!unique[data[i].city]) {
          distinct.push({
            value: data[i].city,
            label: intl.formatMessage({
              id: "CITY_" + data[i].city
            })
          });
          unique[data[i].city] = 1;
        }
      }
      distinct.sort(function(a, b) {
        return a.value.split("x")[0] - b.value.split("x")[0];
      });
      setCityData(distinct);
    }
  };

  const preSetResolutionData = data => {
    if (!!data) {
      var unique = [];
      var distinct = [];
      for (let i = 0; i < data.length; i++) {
        if (!unique[data[i].resolution] && !!data[i].width) {
          distinct.push({
            value: data[i].resolution,
            label: data[i].resolution
          });
          unique[data[i].resolution] = 1;
        }
      }
      distinct.sort(function(a, b) {
        return a.value.split("x")[0] - b.value.split("x")[0];
      });
      //console.log("distinct");
      //console.log(distinct);
      setResolutionData(distinct);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("100");
  function setData(pages) {
    setValue(pages);
    setOpen(false);
  }
  const [isDrawerOpened, setDrawerState] = useState(true);

  const nextStep = () => {
    if (!props.choosedBoards.length) {
      Swal.fire("Выберите необходимые экраны!", "", "info");
      return;
    }

    props.setNextTab();
  };
  const isSelected = id => !!props.choosedBoards.find(item => item.id === id);
  return (
    <Grid className="kt-form">
      <Grid className="kt-heading kt-heading--md">Выберите экраны</Grid>

      <div>
        <Typography
          className="close-map"
          onClick={setDrawerState.bind(null, false)}
        >
          <i className="flaticon2-delete" />
        </Typography>
        <DevicesMap boards={allboards} />
      </div>
      <Grid container spacing={2} style={{ marginTop: "15px" }}>
        {cityData.length >= 2 && (
          <Grid item md={6} xs={12}>
            <Typography classes={{ root: classes.spacer }}>
              {!!props.options && (
                <Select
                  isMulti
                  value={props.filter.city}
                  options={cityData}
                  onChange={e => {
                    if (!!e && !!e.length) {
                      props.updateData({ ...props.filter, city: e });
                    } else {
                      props.updateData({ ...props.filter, city: [] });
                    }
                  }}
                  placeholder="Все города"
                  theme={customSelectTheme}
                  styles={customSelectStyles}
                  menuPlacement="auto"
                  maxMenuHeight={150}
                />
              )}
            </Typography>
          </Grid>
        )}
        {resolutionData.length >= 2 && (
          <Grid item md={6} xs={12}>
            <Typography classes={{ root: classes.spacer }}>
              {!!props.options && (
                <Select
                  isMulti
                  value={props.filter.resolution}
                  options={resolutionData}
                  onChange={e => {
                    if (!!e && !!e.length) {
                      props.updateData({ ...props.filter, resolution: e });
                    } else {
                      props.updateData({ ...props.filter, resolution: [] });
                    }
                  }}
                  placeholder="Разрешения экранов"
                  theme={customSelectTheme}
                  styles={customSelectStyles}
                  menuPlacement="auto"
                  maxMenuHeight={150}
                />
              )}
            </Typography>
          </Grid>
        )}
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  //indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={props.choosedBoards.length === boards.length}
                  onChange={e => {
                    if (e.target.checked) {
                      props.updateChoosedBoards(0, "addAll");
                    } else {
                      props.updateChoosedBoards(0, "removeAll");
                    }
                  }}
                  //inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              <TableCell classes={{ root: classes.headerText2 }}>
                <Typography classes={{ root: classes.headerText }}>
                  Название
                </Typography>
              </TableCell>
              <TableCell>
                <Typography classes={{ root: classes.headerText }}>
                  Разрешение
                </Typography>
              </TableCell>
              <TableCell>
                <Typography classes={{ root: classes.headerText }}>
                  Доступно показов
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(boards).map(key => {
              const isItemSelected = isSelected(boards[key].id);
              return (
                <TableRow
                  key={boards[key].id}
                  className="cursor-pointer"
                  hover
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      //indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={
                        !!props.choosedBoards.find(
                          item => item.id === boards[key].id
                        )
                      }
                      onChange={e => {
                        if (e.target.checked) {
                          props.updateChoosedBoards(boards[key].id, "add");
                        } else {
                          props.updateChoosedBoards(boards[key].id, "remove");
                        }
                      }}
                      //inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} className={`d-flex ${classes.tableTd}`}>
                    {!!boards[key].photo &&
                      <Avatar
                          onClick={() => create_file_paths(boards[key].id)}
                          variant="rounded"
                          src={`${boards[key].photo[0].path_url}/thumb${boards[key].photo[0].link.replace(
                              /(\.[m][p][4])/g,
                              ".jpg"
                          )}`
                          }
                          className="mr-2"
                      />
                    }
                    <div>
                      <Typography className="tableDheader">
                        {boards[key].title}
                      </Typography>
                      <Typography classes={{ root: classes.cellText }}>
                        <FormattedMessage id={"CITY_" + boards[key].city} />
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }}>
                    <Typography classes={{ root: classes.cellText }}>
                      {boards[key].resolution}
                    </Typography>
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }}>
                    <Typography classes={{ root: classes.cellText }}>
                      {!!boards[key].availableShows &&
                        boards[key].availableShows}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid className="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded">
        <Grid className="kt-datatable__pager kt-datatable--paging-loaded px-0">
          {!!props.metaData && props.metaData.pages > 1 && (
            <Pagination
              activePage={props.filter.currentPage}
              itemsCountPerPage={10}
              totalItemsCount={!!props.metaData && props.metaData.total}
              pageRangeDisplayed={4}
              prevPageText="<"
              nextPageText=">"
              onChange={newPage =>
                props.updateData({ ...props.filter, currentPage: newPage })
              }
            />
          )}
        </Grid>
      </Grid>

      <Grid>
        <Grid container>
          <button
            className="btn btn-bold btn-secondary btn-wide"
            onClick={props.setPrevTab}
          >
            <i className="fa fa-arrow-left ml-1" />
            Назад
          </button>
          <button
            className="btn btn-bold btn-label-brand btn-wide ml-2"
            onClick={nextStep}
          >
            Далее
            <i className="fa fa-arrow-right ml-1" />
          </button>
        </Grid>
      </Grid>
      {!!file_path.length &&
        <FsLightbox
            toggler={toggler}
            sources={file_path}
            type={"image"}
            key={ togglerBoarbId }
        />
      }
    </Grid>
  );
};

const customSelectStyles = {
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    borderRadius: state.placement === "top" ? "5px 5px 0 0" : "0 0 5px 5px"
  }),
  option: provided => ({
    ...provided,
    paddingLeft: 20
  }),
  groupHeading: provided => ({
    ...provided,
    color: "#000000",
    fontWeight: 600,
    fontSize: 12
  }),
  dropdownIndicator: provided => ({
    ...provided,
    display: "none"
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: "none"
  })
};
const customSelectTheme = theme => ({
  ...theme,
  borderWidth: 1,
  colors: {
    ...theme.colors,
    primary: "#5fccff",
    primary50: "rgba(95,204,255,0.50)",
    primary25: "#f7f8fa"
  }
});
const mapStateToProps = store => ({
  user: store.auth.user
});
export default injectIntl(withRouter(connect(mapStateToProps)(SecondTab)));
