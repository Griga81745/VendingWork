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
  Checkbox
} from "@material-ui/core";
import Pagination from "react-js-pagination";
//import Select from "react-select";
import { FormattedMessage, injectIntl } from "react-intl";
//import DevicesMap from "./map";
//import objectPath from "object-path";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import axios from "axios";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import RadioBlock from "./RadioBlock";

const useStyles = makeStyles({
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  headerText: {
    fontSize: "1rem",
    fontWeight: 888,
    color: "#595d6e"
  },
  headerText2: {
    paddingLeft: "2px"
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

const SecondTabRadio = props => {
  const { boards, allboards, user, intl, radio, updateChoosedRadio } = props;

  const [resolutionData, setResolutionData] = useState({});
  const [cityData, setCityData] = useState({});

  const classes = useStyles();
  useEffect(() => {
    props.getBoards();
    //window.scrollTo(0, 0);
    preSetResolutionData(props.allboards);
    preSetCityData(props.allboards);
    //preSetSizeData( props.allboards );
  }, []);

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

  //const [radio_block, setRadio_block] = useState([]);
  // const get_radio_block = async id => {
  //     try {
  //         let res = await axios.get(
  //             `/myboards/get-radio-block?subuser=${JSON.parse(localStorage.getItem("currentUser")).id}&id=${id}`
  //         );
  //         let blocksV = [];
  //         blocksV[id] = res.data.blocks;
  //         blocksV.push(radio_block);
  //         setRadio_block(blocksV);
  //
  //         console.error('66666666666666');
  //         console.error(blocksV);
  //
  //     } catch (err) {
  //         console.error(err);
  //     }
  // }

  return (
    <Grid className="kt-form">
      <Grid className="kt-heading kt-heading--md">Выберите радиостанции</Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  //indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={props.choosedRadio.length === boards.length}
                  onChange={e => {
                    if (e.target.checked) {
                      props.updateChoosedRadio(0, "addAll");
                    } else {
                      props.updateChoosedRadio(0, "removeAll");
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
                  Город
                </Typography>
              </TableCell>
              <TableCell>
                <Typography classes={{ root: classes.headerText }}>
                  Доступно выходов
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(radio).map(key => (
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    //indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={
                      !!props.choosedRadio.find(
                        item => item.id === radio[key].id
                      )
                    }
                    onChange={e => {
                      if (e.target.checked) {
                        props.updateChoosedRadio(radio[key].id, "add");
                        // get_radio_block(radio[key].id);
                      } else {
                        props.updateChoosedRadio(radio[key].id, "remove");
                      }
                    }}
                    //inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                <TableCell classes={{ root: classes.cell }}>
                  <Typography classes={{ root: classes.cellText }}>
                    {radio[key].title}
                  </Typography>
                </TableCell>
                <TableCell classes={{ root: classes.cell }}>
                  <Typography classes={{ root: classes.cellText }}>
                    <FormattedMessage id={"CITY_" + radio[key].city} />
                  </Typography>
                </TableCell>
                <TableCell classes={{ root: classes.cell }}>
                  <Typography classes={{ root: classes.cellText }}>
                    {!!radio[key].availableShows && radio[key].availableShows}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid className="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded">
        <Grid className="kt-datatable__pager kt-datatable--paging-loaded">
          {!!props.metaDataRadio && props.metaDataRadio.pages > 1 && (
            <Pagination
              activePage={props.filter.currentPageRadio}
              itemsCountPerPage={10}
              totalItemsCount={
                !!props.metaDataRadio && props.metaDataRadio.total
              }
              pageRangeDisplayed={5}
              prevPageText="<"
              nextPageText=">"
              onChange={newPage =>
                props.updateData({ ...props.filter, currentPageRadio: newPage })
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
            onClick={() => {
              if (props.choosedBoards.length > 0) {
                props.setNextTab();
              }
            }}
          >
            Далее
            <i className="fa fa-arrow-right ml-1" />
          </button>
        </Grid>
      </Grid>
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

export default injectIntl(withRouter(connect(mapStateToProps)(SecondTabRadio)));
