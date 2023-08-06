import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Hidden,
  Divider,
  Box
} from "@material-ui/core";

import SlideItemDesktop from "./SlideItemDesktop";
import Swal from "sweetalert2";

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
    minHeight: "70px",
    "&:hover": {
      backgroundColor: "#efefef"
    }
  }
}));

const SlidesBlock = props => {
  const classes = useStyles();
  //const uniqueRes = new Set(props.resolutions);

  return (
    <>
      <Grid>
        {!!props.selectedFiles &&
          !!props.selectedFiles.length &&
          props.selectedFiles.map((item, index) => {
            // console.log('iiiiiiiiii');

            if (props.resolutions == `${item.resw}x${item.resh}`) {
              return (
                <Box key={item.id}>
                  <Hidden only={["xs", "sm"]}>
                    <SlideItemDesktop
                      key={item.id}
                      amount={props.selectedFiles.length}
                      data={item}
                      classes={classes}
                      remooveFile={props.remooveFile}
                      changeActiveFile={props.changeActiveFile}
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
    </>
  );
};

export default SlidesBlock;
