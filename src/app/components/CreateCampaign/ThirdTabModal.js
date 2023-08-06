import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Button,
  Dialog,
  BottomNavigation,
  BottomNavigationAction,
  Divider
} from "@material-ui/core";
import ThirdTabExpansionPanel from "./ThirdTabExpansionPanel";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import equal from "deep-equal";
import Pagination from "react-js-pagination";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    width: "100%"
  },
  mainGrid: {
    width: "700px",
    margin: "10px"
  },
  selectButton: {
    margin: `0 0 0 ${theme.spacing(5)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  },
  numberButton: {
    color: "#222",
    border: "none",
    marginRight: "5px",
    backgroundColor: "lightgrey"
  }
}));

const ThirdTabModal = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [filesForSefected, setFilesForSefected] = useState([]);

  useEffect(() => setFilesForSefected(props.selectedFiles), [
    props.selectedFiles
  ]);

  const selectFile = file => {
    if (!filesForSefected.find(item => equal(item, file))) {
      setFilesForSefected([...filesForSefected, file]);
    } else {
      let exclude = filesForSefected.filter(item => !equal(item, file));
      setFilesForSefected(exclude);
    }
  };
  const setSelectedFiles = () => {
    props.setFiles(filesForSefected);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      maxWidth="lg"
      scroll="body"
      onBackdropClick={props.handleClose}
    >
      <Grid
        container
        direction="column"
        justify="space-between"
        classes={{ root: classes.mainGrid }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          classes={{ root: classes.dialogTitle }}
        >
          <Typography style={{ margin: "5px" }}>Альбомы</Typography>
          <Button
            variant="outlined"
            component="span"
            style={{ border: "none" }}
            onClick={props.handleClose}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Медиа" />
            <BottomNavigationAction label="Загрузить" />
          </BottomNavigation>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Grid>
            <Typography style={{ margin: "2px" }}>0 фотоальбомов</Typography>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              component="span"
              classes={{ root: classes.selectButton }}
              onClick={setSelectedFiles}
            >
              Добавить выбранные файлы
            </Button>
            <Button
              variant="outlined"
              component="span"
              style={{ border: "none", right: "0" }}
            >
              <SearchIcon fontSize="small" />
            </Button>
          </Grid>
        </Grid>
        <Box
          container
          direction="row"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          {props.approveGetData && (
            <ThirdTabExpansionPanel
              albums={props.albums.creative}
              selectFile={selectFile}
              filesForSefected={filesForSefected}
              resolutions={props.resolutions}
            />
          )}
        </Box>
        <Pagination
          activePage={props.currentPage}
          itemsCountPerPage={10}
          totalItemsCount={!!props.albums.meta && props.albums.meta.total}
          pageRangeDisplayed={5}
          prevPageText="<"
          nextPageText=">"
          onChange={newPage => props.setCurrentPage(newPage)}
        />

        <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />
        <Grid
          container
          direction="row"
          justify="flex-end"
          style={{ marginBottom: "30px" }}
        >
          <Button
            variant="outlined"
            component="span"
            textAlign="right"
            classes={{ root: classes.selectButton }}
          >
            Добавить выбранные файлы
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ThirdTabModal;
