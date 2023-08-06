import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  withStyles,
  Tooltip, IconButton
} from "@material-ui/core";
import Moment from "react-moment";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Menu from "./menu";
import { connect } from "react-redux";
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import CheckIcon from "@material-ui/icons/Check";
import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";

const SlideModeratedRadio = props => {
  const {
    classes,
    album,
    currentUser,
    scheduleBoardCreatives,
    type,
    data,
    setPlayerSRC,
    setPlayer
  } = props;
  const [toggler, setToggler] = useState(false);
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${album.group_id}/${album.link}`;
  //let status = props.screen.scheduleBoardCreatives.split(',').includes(album.id) ? 'running' : 'pending';
  let md_count =
    (currentUser.id != +scheduleBoardCreatives.owner &&
      scheduleBoardCreatives.owner != scheduleBoardCreatives.creator_id) ||
      (currentUser.id == +scheduleBoardCreatives.owner &&
        scheduleBoardCreatives.owner != scheduleBoardCreatives.creator_id)
      ? 9
      : 9;

  if (
    ((!!type && type == "rek") || !type) &&
    props.screen.status != "finished" &&
    data.all_data.status != "finished"
  ) {
    md_count = md_count - 1;
  }
  if (props.screen.status == "finished" || data.all_data.status == "finished") {
    md_count = md_count + 1;
  }
  let active = scheduleBoardCreatives.active == 1 ? "active" : "not_active";

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid
          item
          md={md_count}
          onClick={() => setToggler(!toggler)}
          className=" d-flex"
        >
          {((currentUser.id != +scheduleBoardCreatives.owner &&
            scheduleBoardCreatives.owner !=
            scheduleBoardCreatives.creator_id) ||
            (currentUser.id == +scheduleBoardCreatives.owner &&
              scheduleBoardCreatives.owner !=
              scheduleBoardCreatives.creator_id)) &&
            props.screen.status != "finished" &&
            data.all_data.status != "finished" && (
              <div>
                <LightTooltip
                  placement="bottom-end"
                  title={
                    <FormattedMessage
                      id={`STATUS.${scheduleBoardCreatives.status == "pending"
                        ? "moder"
                        : "moder_ok"
                        }`}
                    />
                  }
                >
                  <IconButton style={{ fill: "rgb(233, 85, 91)" }}>
                    {scheduleBoardCreatives.status == "pending" ? (
                      <AccessTimeTwoToneIcon
                        fontSize="large"
                        style={{ fill: "rgb(233, 85, 91)" }}
                      />
                    ) : (
                      <CheckIcon
                        fontSize="large"
                        style={{ fill: "rgb(29, 201, 183)" }}
                      />
                    )}
                  </IconButton>
                </LightTooltip>
              </div>
            )}

          <Grid container direction="row" className="align-items-center">
            <IconButton
              style={{ fill: "rgb(233, 85, 91)" }}
              onClick={() => {
                setPlayerSRC(file_path);
                setPlayer(true);
              }}
            >
              <AudiotrackTwoToneIcon
                fontSize="large"
                style={{ fill: "rgb(233, 85, 91)" }}
              />
            </IconButton>
            <Typography>{album.title}</Typography>
          </Grid>
        </Grid>

        {((!!type && type == "rek") || !type) &&
          props.screen.status != "finished" &&
          data.all_data.status != "finished" && (
            <Grid item md={1} classes={{ root: classes.dataContainer }}>
              <Box
                className="kt-badge kt-badge--inline kt-badge--success mR10"
                style={{ background: props.isStatus(active) }}
              >
                <FormattedMessage id={"STATUS." + active} />
              </Box>
            </Grid>
          )}

        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {album.filesize !== 0
              ? (album.filesize / 1024 / 1024).toFixed(2)
              : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>mB</Typography>
        </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            <Moment format="DD/MM/YYYY">
              {album.created_at !== 0 ? album.created_at : "-"}
            </Moment>
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
        </Grid>
        {props.screen.status != "finished" &&
          data.all_data.status != "finished" && (
            <Grid album md={1} classes={{ root: classes.dataContainer }}>
              <Menu
                item={album}
                moderation={props.moderation}
                setToggler={setToggler}
                getTableData={props.getTableData}
                id={props.id}
                type={type}
                screen={props.screen}
                status={scheduleBoardCreatives.status}
                active={scheduleBoardCreatives.active}
              />
            </Grid>
          )}
      </Grid>
    </>
  );
};
const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: JSON.parse(localStorage.getItem("currentUser"))
});

export default withRouter(connect(mapStateToProps)(SlideModeratedRadio));
