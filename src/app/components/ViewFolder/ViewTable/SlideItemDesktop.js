import {
  Box,
  makeStyles,
  Typography,
  Switch,
  Avatar,
  Grid,
  FormControlLabel
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";
import Moment from "react-moment";
import FsLightbox from "fslightbox-react";

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
  const { classes, amount } = props;
  const detele = () => {
    props.remooveFile(data);
  };

  const [state, setState] = React.useState(data.active);
  const [toggler, setToggler] = useState(false);
  const handleChange = event => {
    props.changeActiveFile(data);
    setState(event.target.checked);
  };
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${data.group_id}/${data.link}`;
  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid
          item
          md={6}
          classes={{ root: classes.companyInfo }}
          onClick={() => setToggler(!toggler)}
        >
          <Grid container direction="row" className="align-items-center">
            <Avatar
              variant="rounded"
              src={
                process.env.REACT_APP_MY_HOST_CREATIVE +
                `/creative/${data.group_id}/thumb${data.link.replace(
                  /(\.[m][p][4])/g,
                  ".jpg"
                )}`
              }
              className="mr-2"
            />
            <Grid>
              <Grid classes={{ root: classes.companyName }}>
                {data.title.substring(0, 20)}
              </Grid>
              <Grid classes={{ root: classes.dataHeader }}>{data.mime}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {data.resw !== 0 ? data.resw : "-"}X
            {data.resh !== 0 ? data.resh : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Разрешение
          </Typography>
        </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {data.filesize !== 0
              ? (data.filesize / 1024 / 1024).toFixed(2)
              : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>mB</Typography>
        </Grid>

        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Switch
            disabled={amount <= 1}
            checked={state}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Grid>
      </Grid>
      <FsLightbox
        toggler={toggler}
        sources={[file_path]}
        type={data.link.split(".")[1] === "jpg" ? "image" : "video"}
      />
    </>
  );
};

export default SlideItemDesktop;
