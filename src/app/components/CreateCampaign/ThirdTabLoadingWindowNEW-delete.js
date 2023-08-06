import React, { useState } from "react";
import { Grid, Typography, makeStyles, Divider } from "@material-ui/core";
//import InputFileComponent from "./InputFileComponent";
import SlidesBlock from "./SlidesBlock";
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

const ThirdTabLoadingWindow = props => {
  const classes = useStyles();
  const uniqueRes = new Set(props.resolutions);
  const [size, setSize] = useState({});

  const handleChangeFile = (file, resolution) => {
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        //console.log('resolutionresolutionresolutionresolution');
        // console.log(resolution);
        //console.log(image.width);
        // console.log(image.height);
        if (resolution.includes(`${image.width}x${image.height}`)) {
          // if (`${image.width}x${image.height}` === resolution) {
          props.uploadNewAlbum(file, resolution);
        } else {
          getError();
        }
      };
    } else {
      props.uploadNewAlbum(file, resolution);
    }
  };

  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      text: "Разрешение файла не соответствует выбранным экранам!"
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
      <Grid classes={{ root: classes.loadingWin }}>
        {!!props.resolutions.length &&
          Array.from(uniqueRes).map((i, ndx) => {
            if(i == props.setting.tabMedia){
              return (
                  <SlidesBlock
                      key={ndx}
                      selectedFiles={props.selectedFiles}
                      remooveFile={props.remooveFile}
                      remooveFileByType={props.remooveFileByType}
                      replaceFiles={props.replaceFiles}
                      resolutions={i}
                      position={ndx}
                      duration={props.duration}
                      handleChangeFile={handleChangeFile}
                      uploadGo={props.uploadGo}
                      uploadProgress={props.uploadProgress}
                      openAlbum={props.openAlbum}
                  />
              )
            }
          })}
      </Grid>
    </>
  );
};

export default ThirdTabLoadingWindow;
