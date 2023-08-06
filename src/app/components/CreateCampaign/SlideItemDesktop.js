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
    maxWidth: "200px",
    minWidth: "200px",
    overflow: "hidden",
    whiteSpace: "nowrap"
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
  borderBottom: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    paddingBottom: "3px !important"
  }
});

const SlideItemDesktop = ({ data, ...props }) => {
  const styles = makeStyle();

  const { classes, amount, setting, indexCo } = props;
  const detele = () => {
    props.remooveFile(data);
  };

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
      <div className={`${styles.borderBottom} d-flex py-1`}>
        <div className="align-self-center d-flex" style={{'minWidth': 54}}>
          <Tooltip title="Удалить креатив">
            <IconButton className="p-0 m-auto" onClick={()=>detele()} >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{'minWidth': 40}} >
            <Avatar
                variant="square"
                src={process.env.REACT_APP_MY_HOST_CREATIVE + `/creative/${data.group_id}/thumb${data.link.replace(/(\.[m][p][4])/g, ".jpg")}`}
                onClick={() => {
                    props.updateSetting({...setting, lightboxOpen:indexCo})
                    //var mydiv = document.getElementsByClassName("lightBox");
                    //let mainContainer = React.createElement("div", { className: "contexCon" }, child);
                    //mydiv.appendChild(document.createTextNode("bar"));
                    ///setToggler2(!toggler2)
                }}
                className="mr-2"
                style={{"width": "32px", "height": "32px"}}
            />
        </div>

        <div className={`${styles.changePositionBlock} mr-2 align-self-center d-flex`}>
              <Box fontSize={14} >{data.link}</Box>
        </div>

        <div className={'fontGR align-self-center d-flex justify-content-center'} style={{'minWidth': 110}}>{data.mime}</div>
        <div className={'fontGR align-self-center d-flex justify-content-center'} style={{'minWidth': 110}}>{data.resw}x{data.resh}</div>

      </div>
  );
};

export default SlideItemDesktop;
