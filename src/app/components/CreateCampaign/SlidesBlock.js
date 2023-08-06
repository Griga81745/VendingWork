import React, { useEffect, useState } from "react";
import { Box, TableRow, TableCell, makeStyles, Typography } from "@material-ui/core";


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
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center",
    cursor: "pointer"
  },
  tabHeader: {
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(0,0,0,.87)'
  },
  dataContainer: {
    borderTop: 'thin solid rgba(0,0,0,.12)',
  },
  row: {
    position: "relative",
    padding: "9px 0 9px",
    minHeight: "70px"
    // "&:hover": {
    //     backgroundColor: '#efefef'
    // }
  },
  rootTableRow: {
    borderTop: "1px solid #E3E5E5",
    height: 40
  }
}));

const SlidesBlock = props => {
  const classes = useStyles();
  const countCre = Object.keys(props.choosedCreatives).filter(creId => {
    let creative = props.uploadedFiles[creId]

    console.log('countCre = Object.keys(props.cho')
    console.log(props.choosedCreatives)
    console.log(creId)
    console.log(props.uploadedFiles)
    console.log(creative)
    if (creative.mime === "text/html") {
      return true
    }
    return props.resolutions == `${creative.resw}x${creative.resh}`
  });

  const boardCount = Object.values(props.choosedBoards).filter(board => board.resolution == props.resolutions);

  return (
    <>
      {props.type == 'table' && (<TableRow className={classes.rootTableRow}>
        <TableCell align={"left"} className={'c263238 fontGR py-2'} >{props.resolutions}</TableCell>
        <TableCell align={"left"} className={'c263238 fontGR py-2'} >{countCre.length}</TableCell>
        <TableCell align={"left"} className={'c263238 fontGR py-2'} >{boardCount.length}</TableCell>
      </TableRow>)}

      {props.type == 'list' && (<div className={`row ${classes.dataContainer} no-gutters`}>
        <div className="col">
          <Typography classes={{ root: classes.tabHeader }} style={{ 'padding': '5px 16px 5px 0' }}>
            <Box component="span" className={`d-inline fontGR ${!!countCre.length ? 'ok' : ""}`}>{props.resolutions}</Box>
          </Typography>
        </div>
        <div className="col">
          <Typography className={`fontGR`} classes={{ root: classes.tabHeader }} style={{ 'padding': '5px 16px 5px 0' }}>{countCre.length}</Typography>
        </div>
        <div className="col">
          <Typography className={`fontGR`} classes={{ root: classes.tabHeader }} style={{ 'padding': '5px 16px 5px 0' }}>{boardCount.length}</Typography>
        </div>
      </div>)}
    </>
  );
};

export default SlidesBlock;
