import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import InputFileComponent from "../common/InputFileComponent";
import SlideItem from "../common/SlideItem";
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
    // let file = event.target.files[0]
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      if (`${image.width}x${image.height}` === resolution) {
        props.uploadNewAlbum(file);
        // setImgUrl(image.src)
      } else {
        getError();
      }
      // console.log(image.width, image.height, resolution)
    };
  };

  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
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
    <Grid classes={{ root: classes.loadingWin }}>
      <Typography>Загрузить новые файлы</Typography>
      {!!props.resolutions.length &&
        Array.from(uniqueRes).map((i, ndx) => {
          return (
            <>
              <InputFileComponent
                i={i}
                ndx={ndx}
                countScreens={countScreens}
                resolutions={props.resolutions}
                getError={getError}
                uploadNewAlbum={props.uploadNewAlbum}
                setFiles={props.setFiles}
              />
              <Grid>
                {!!props.selectedFiles &&
                  !!props.selectedFiles.length &&
                  props.selectedFiles.map((item, ndx) => {
                    if (i.includes(`${item.resw}x${item.resh}`)) {
                      return (
                        <SlideItem
                          key={ndx}
                          data={item}
                          remooveFile={props.remooveFile}
                          replaceFiles={props.replaceFiles}
                          position={ndx}
                        />
                      );
                    }
                  })}
              </Grid>
            </>
          );
        })}
    </Grid>
  );
};

export default ThirdTabLoadingWindow;
