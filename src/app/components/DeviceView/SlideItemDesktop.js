import {
  Box,
  makeStyles,
  Typography,
  Switch,
  Avatar,
  Grid,
  FormControlLabel, Tooltip, IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";
import Moment from "react-moment";

import DeleteIcon from '@material-ui/icons/Delete';
import { ReactComponent as EctorSVG } from '../../../img/ector.svg';

const makeStyle = makeStyles({
  itemContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  changePositionBlock: {
    border: "#dcdcdc 1px solid",
    borderRadius: "4px",
    marginLeft: "20px",
    overflow: "hidden"
  },
  changePositionArrowContainer: {
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#dcdcdc"
    }
  },
  changePositionArrow: {
    width: "20px",
    height: "20px",
    fill: "#888"
  },
  changePositionText: {
    textAlign: "center",
    margin: "10px 5px",
    fontSize: "10px"
  },
  changePositinNumber: {
    fontSize: "16px",
    width: "45px"
  },
  typographyBlock: {
    paddingLeft: "15px"
  },
  typography: {
    color: "#222",
    fontSize: "12px"
  },
  deleteSlideContainer: {
    display: "flex",
    cursor: "pointer",
    margin: "10px 0"
  },
  deleteIcon: {
    color: "#888"
  },
  deleteTypography: {
    color: "#888",
    fontWeight: "500",
    fontSize: "13px"
  }
});

const SlideItemDesktop = ({ data, ...props }) => {
  const styles = makeStyle();
  const { classes, amount, setting, indexCo, deviceInfo} = props;

  const [state, setState] = React.useState(data.active);
  const [toggler2, setToggler2] = useState(false);
  const handleChange = event => {
    props.changeActiveFile(data);
    setState(event.target.checked);
  };
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${data.group_id}/${data.link}`;
  return (
    <div className={'row'}>
      <div className={'container-fluid'}>
        <div className="row no-gutters slideLineBage">
          <div className="d-flex" style={{'width': 79}}>
            <Avatar
                variant="rounded"
                src={
                  process.env.REACT_APP_MY_HOST_CREATIVE +
                  `/boards/${deviceInfo.id}/thumb${data.link.replace(
                      /(\.[m][p][4])/g,
                      ".jpg"
                  )}`
                }
                onClick={() => {
                 // console.log('setToggler2setToggler2setToggler2setToggler2')
                 // console.log(!toggler2)
                      // props.updateSetting({...setting, lightboxOpen:indexCo})


                  //var mydiv = document.getElementsByClassName("lightBox");
                  //let mainContainer = React.createElement("div", { className: "contexCon" }, child);
                 // mydiv.appendChild(document.createTextNode("bar"));
                  ///setToggler2(!toggler2)
                }}
                className="imgCont cursor-pointer"
            />
          </div>

          <div className="align-self-center col d-flex flex-column">
                <Box fontSize={14} >{data.link}</Box>
                <div>
                      <div className={'fileArguments d-inline'}>
                        <span>
                          {data.filesize !== 0
                              ? (data.filesize / 1024 / 1024).toFixed(2)
                              : "-"}
                        </span>
                        <span className={'fileSm'}>Мб</span>
                      </div>
                </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SlideItemDesktop;
