import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import equal from "deep-equal";
import React, { useEffect, useState } from "react";
//import { createCampaing } from "../../utils/API";
import axios from "axios";

import SlideItem from "../common/SlideItem";
import ThirdTabLoadingWindow from "./ThirdTabLoadingWindow";
import ThirdTabModal from "./ThirdTabModal";

const useStyles = makeStyles(theme => ({
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  tabHeader: {
    margin: "1.75rem 0",
    fontSize: "1.4rem",
    fontWeight: 500,
    color: "#48465b"
  },
  inputsContainer: {
    padding: `0 0 0 ${theme.spacing(4)}px`
  },
  selectButton: {
    margin: `0 0 0 ${theme.spacing(5)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  },
  divider: {
    width: "100%",
    height: "1px",
    marginBottom: "20px"
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
}));

const ThirdTab = props => {
  const { selectedFiles, setSelectedFiles } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resolutions, setResolutions] = useState([]);
  const [errorModal, setOpenErrorModal] = useState(true);
  const [approveGetData, setApproveGetData] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => () => setApproveGetData(false), []);
  //useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    getAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    if (!!props.choosedBoards.length) {
      getAlbums();
      setApproveGetData(true);
      setResolutions(props.choosedBoards.map(i => i.resolution));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.choosedBoards]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const getAlbums = async () => {
    try {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let albums = await axios.get(
        `/creative-group?page=${currentPage}&subuser=${currentUser.id}`
      );
      setAlbums(albums.data);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadNewAlbum = file => {
    let formData = new FormData();
    formData.append("file", file);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    axios
      .post(
        `/creative/upload-creative-all-group?subuser=${currentUser.id}`,
        formData
      )
      .then(res => {
        props.setPictures(res.data.file);
        uploadNewFile(res.data.file);
      })
      .catch(console.error);
  };

  const uploadNewFile = file => setSelectedFiles([...selectedFiles, file]);

  const setFiles = files => {
    files.forEach(file => props.setPictures(file));
    setSelectedFiles(files);
  };

  const remooveFile = file => {
    let exclude = selectedFiles.filter(item => !equal(item, file));
    exclude.forEach(file => props.setPictures(file));
    setSelectedFiles(exclude);
  };

  const replaceFiles = (file, action) => {
    const fileIndex = selectedFiles.indexOf(file);
    const swap = (a, b) => {
      const newArray = [...selectedFiles];
      newArray[a] = newArray.splice(b, 1, newArray[a])[0];
      return newArray;
    };

    switch (action) {
      case "increment": {
        if (fileIndex !== 0) {
          setSelectedFiles(swap(fileIndex, fileIndex - 1));
        }

        break;
      }
      case "decrement": {
        if (fileIndex !== selectedFiles.length - 1) {
          setSelectedFiles(swap(fileIndex, fileIndex + 1));
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <Grid className="kt-form">
      <Typography classes={{ root: classes.tabHeader }}>
        Загрузка файлов
      </Typography>
      <Grid style={{ marginBottom: "2rem" }}>
        <Typography>
          Открыть альбом
          <Button
            variant="outlined"
            component="span"
            classes={{ root: classes.selectButton }}
            onClick={handleClickOpen}
          >
            Выбрать альбом
          </Button>
        </Typography>
      </Grid>
      <ThirdTabModal
        open={open}
        handleClose={handleClose}
        albums={albums}
        setFiles={setFiles}
        selectedFiles={selectedFiles}
        approveGetData={approveGetData}
        resolutions={resolutions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ThirdTabLoadingWindow
        replaceFiles={replaceFiles}
        remooveFile={remooveFile}
        uploadNewAlbum={uploadNewAlbum}
        resolutions={resolutions}
        setFiles={setFiles}
        selectedFiles={props.selectedFiles}
      />
      {/* <Grid>
        {!!selectedFiles.length &&
          selectedFiles.map((item, ndx) => {
            return <SlideItem key={ndx} data={item}   position={ndx} />;
          })}
      </Grid> */}
      <Grid>
        <Grid container justify="space-between">
          <button
            className="btn btn-secondary btn-md btn-tall btn-wide kt-font-transform-u"
            onClick={props.setPrevTab}
          >
            <Typography classes={{ root: classes.prevButtonText }}>
              <i
                className="la la-long-arrow-left"
                style={{ marginRight: "10px", fontSize: "1.5rem" }}
              />
              Назад
            </Typography>
          </button>
          <button
            className="btn btn-brand btn-md btn-tall btn-wide kt-font-transform-u"
            onClick={() => {
              if (props.selectedFiles.length > 0) {
                props.setNextTab();
              }
            }}
          >
            <Typography classes={{ root: classes.nextButtonText }}>
              Далее
              <i
                className="la la-long-arrow-right"
                style={{ marginLeft: "10px", fontSize: "1.5rem" }}
              />
            </Typography>
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThirdTab;
