import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Hidden, makeStyles, IconButton } from "@material-ui/core";

import SlideItemDesktopRadio from "./SlideItemDesktopRadio";
import ProgressLoader from "../ViewMedia/ProgressLoader";

import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";
const useStyles = makeStyles(theme => ({
  companyName: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500
  },
  data: {
    fontSize: 12,
    color: "#222",
    fontWeight: 500
  },
  dataHeader: {
    fontSize: 12,
    color: "#888888"
  },
  companyInfo: {
    paddingLeft: "3rem",
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center",
    cursor: "pointer"
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  row: {
    position: "relative",
    padding: "9px 0 9px",
    minHeight: "70px"
    // "&:hover": {
    //     backgroundColor: '#efefef'
    // }
  }
}));

const SlidesBlockRadio = props => {
  const classes = useStyles();
  const uniqueRes = new Set(props.resolutions);
  let fileInput = null;

  return (
    <div className="alert alert-secondary flex-column" role="alert">
      <div className="d-flex">
        <div className="alert-icon">
          <AudiotrackTwoToneIcon fontSize="large" />
        </div>
        <div className="alert-text">
          <span className="form-text text-muted">Типы файлов .mp3, .ogg</span>
          <span className="form-text text-muted">
            Продолжительность аудио-ролика {props.duration}сек.
          </span>
          <span className="form-text text-muted">
            Максимальный размер файла 30MB
          </span>
          <span className="form-text text-muted">Максимум 15 файлов</span>
        </div>
        <div className="d-flex flex-column">
          <button
            className="btn btn-secondary btn-sm btn-bold btn-font-md"
            onClick={() => fileInput.click()}
          >
            <i className="flaticon2-plus"></i>
            Добавить файлы
          </button>
          <button
            className="btn btn-secondary btn-sm btn-bold btn-font-md mt-2"
            onClick={() => props.openAlbum(true)}
          >
            <i className="flaticon2-plus"></i>
            Добавить из Медиа
          </button>

          <input
            style={{ opacity: "0", width: "0.5px", height: "0.5px" }}
            type="file"
            ref={input => (fileInput = input)}
            accept=".mp3, .ogg"
            // onClick={e => props.uploadNewAlbum(e)}
            onChange={e =>
              props.handleChangeFile(e.target.files[0], props.resolutions)
            }
          />
        </div>
      </div>
      {!!props.uploadGo && props.uploadGo == "radio" && (
        <>
          <Grid container className="justify-content-center">
            <Grid item md={7} classes={{ root: classes.dataContainer }}>
              <ProgressLoader progress={props.uploadProgress} />
            </Grid>
          </Grid>
          <Divider />
        </>
      )}
      <div>
        <Grid>
          {!!props.selectedFiles &&
            !!props.selectedFiles.length &&
            props.selectedFiles.map((item, index) => {
              if (!item.resw && !item.resh) {
                return (
                  <Box key={item.id}>
                    <Hidden only={["xs", "sm"]}>
                      <SlideItemDesktopRadio
                        key={item.id}
                        amount={props.selectedFiles.length}
                        data={item}
                        classes={classes}
                        remooveFile={props.remooveFile}
                        //changeActiveFile={props.changeActiveFile}
                        replaceFiles={props.replaceFiles}
                        position={index}
                        page={!!props.page && props.page}
                      />
                    </Hidden>
                  </Box>
                );
              }
            })}
        </Grid>
      </div>
    </div>
  );
};

export default SlidesBlockRadio;
