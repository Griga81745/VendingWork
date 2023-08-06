import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import DevicesMap from "./map";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
  screenTable: {
    border: "1px solid #e6e7ee",
    borderTop: "none",
    width: "150px",
    marginLeft: "40px"
  },
  colorBlock: {
    width: 4,
    height: 26,
    backgroundColor: "#2786fb",
    margin: "0 20px"
  },
  numberScreensBlock: {
    display: "flex",
    alignItems: "center",
    padding: "25px 20px 20px 50px"
  },
  screenDataBlock: {
    borderBottom: "1px solid #e6e7ee",
    padding: "10px 0 0"
  },
  screenData: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500,
    paddingBottom: 10,
    padding: "0 5px"
  },
  screenTitle: {
    color: "#888888",
    fontSize: 12
  }
}));

const ViewTableScreens = props => {
  const { data, screens } = props;
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleScreens, setVisibleScreens] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [value, setValue] = useState("100");
  const [hide, setHide] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getScreens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const setData = pages => {
    setValue(pages);
    setOpen(false);
  };
  const getScreens = () => {
    let firstLine = (currentPage - 1) * 10;
    let lastLine = currentPage * 10 - 1;
    let newArray = [];
    for (let i = 0; i < screens.length; i++) {
      if (firstLine <= i && i <= lastLine) {
        newArray.push(screens[i]);
      }
    }
    setVisibleScreens(newArray);
    let mapData = newArray.map(item => item.board);
    setMapData(mapData);
  };

  return (
    <>
      <div className="kt-portlet kt-portlet--tabs">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Устройства</h3>
          </div>

          <div className="kt-portlet__head-toolbar">
            <ul
              className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-brand"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#map"
                  onClick={() => setShowMap(!showMap)}
                >
                  <i className="fa fa-map-marker-alt"></i>
                  На карте
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="kt-portlet__body">
          {visibleScreens.map(screen => (
            <>
              <Grid
                container
                alignItems={"flex-end"}
                classes={{ root: classes.screenDataBlock }}
                onClick={() => setHide(!hide)}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  lg={7}
                  classes={{ root: classes.screenData }}
                >
                  {screen.board.title}
                  <Typography classes={{ root: classes.screenTitle }}>
                    Название
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sm={6}
                  md={3}
                  lg={2}
                  classes={{ root: classes.screenData }}
                >
                  {!!screen.board.city ? (
                    <FormattedMessage id={"CITY_" + screen.board.city} />
                  ) : (
                    "Не указан"
                  )}
                  <Typography classes={{ root: classes.screenTitle }}>
                    Город
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={2}
                  md={2}
                  lg={1}
                  classes={{ root: classes.screenData }}
                >
                  {screen.board.resolution}
                  <Typography classes={{ root: classes.screenTitle }}>
                    Разрешение
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sm={2}
                  md={1}
                  lg={1}
                  classes={{ root: classes.screenData }}
                >
                  {screen.requested}
                  <Typography classes={{ root: classes.screenTitle }}>
                    Заказано
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={2}
                  md={1}
                  lg={1}
                  classes={{ root: classes.screenData }}
                >
                  {screen.placed}
                  <Typography classes={{ root: classes.screenTitle }}>
                    Показано
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}

          {/*/////////////////////////////////////////         */}

          {!!screens.meta && screens.meta.pages > 1 && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={screens.meta.perpage}
              totalItemsCount={!!screens && screens.length}
              pageRangeDisplayed={5}
              prevPageText="<"
              nextPageText=">"
              onChange={newPage => setCurrentPage(newPage)}
            />
          )}
          {showMap && (
            <Grid style={{ padding: "20px" }}>
              <DevicesMap boards={mapData} />
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};
export default ViewTableScreens;
