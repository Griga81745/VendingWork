import React, { useState } from "react";
import { Grid, Typography, makeStyles, Divider } from "@material-ui/core";
import SlidesBlockRadio from "./SlidesBlockRadio";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  loadingWin: {
    marginBottom: "2rem"
  },
  cards: {
    margin: "10px",
    marginTop: "20px"
  },
  plus: {
    width: "34px",
    height: "34px",
    border: "0.8px solid lightgrey",
    lineHeight: "34px",
    borderRadius: "17px",
    margin: "auto",
    marginTop: "25px"
  },
  add: {
    marginTop: "7px",
    fontSize: "10px !important"
  },
  inputfile: {
    opacity: "0"
  },
  loadButton: {
    width: "150px",
    height: "150px",
    textAlign: "center",
    marginLeft: "10px",
    border: "0.8px solid lightgrey",
    padding: "0 !important"
  },
  loadingWindows: {
    width: "100px"
  }
}));

const ThirdTabLoadingRadio = props => {
  const classes = useStyles();
  const uniqueRes = new Set(props.resolutions);
  const [size, setSize] = useState({});

  const handleChangeFile = file => {
    if (file.type == "audio/mpeg" || file.type == "audio/ogg") {
      const audio = new Audio();
      audio.addEventListener(
        "loadedmetadata",
        function() {
          let duration = Math.floor(parseInt(audio.duration));

          if (duration == props.duration) {
            props.uploadNewAlbum(file, "radio");
          } else {
            getErrorDur();
          }
        },
        false
      );
      audio.src = URL.createObjectURL(file);
    } else {
      getError();
    }
  };

  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      text: "Разрешение файла не .mp3, .ogg !"
    });
  };
  const getErrorDur = () => {
    Swal.fire({
      title: "Файл не подходит!",
      text: `Продолжительность файла не ${props.duration} сек.!`
    });
  };
  const countScreens = (screens, currentElement) => {
    let counter = 0;
    screens.forEach(element => {
      if (element === currentElement) {
        counter += 1;
      }
    });
    return counter;
  };

  return (
    <>
      <div>
        <div className="kt-heading kt-heading--sm">
          Загрузите файлы для радио
        </div>
      </div>
      <Grid classes={{ root: classes.loadingWin }}>
        <SlidesBlockRadio
          selectedFiles={props.selectedFiles}
          remooveFile={props.remooveFile}
          replaceFiles={props.replaceFiles}
          duration={props.duration}
          handleChangeFile={handleChangeFile}
          uploadGo={props.uploadGo}
          uploadProgress={props.uploadProgress}
          openAlbum={props.openAlbum}
        />
      </Grid>
    </>
  );
};

export default ThirdTabLoadingRadio;
