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
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import FsLightbox from "fslightbox-react";
import Menu from "./menu";
import { connect } from "react-redux";
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeTwoTone";
//import TimerIcon from '@material-ui/icons/Timer';
import CloseIcon from '@material-ui/icons/Close';

import CheckIcon from "@material-ui/icons/Check";
import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";

const SlideModerated = props => {
  const {
    classes,
    album,
    currentUser,
    scheduleBoardCreatives,
    type,
    data,
    board_id
  } = props;
  const [toggler, setToggler] = useState(false);
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${album.group_id}/${album.link}`;
  //let status = props.screen.scheduleBoardCreatives.split(',').includes(album.id) ? 'running' : 'pending';
  let md_count = 8;

  //if (!!type && type == "myboards" &&
  // props.screen.status != "finished" &&
  ///  data.all_data.status != "finished"
  // ) {
  //  md_count = md_count - 1;
  //}
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
      <Grid container classes={{ root: classes.row }} >
        <Grid
          item
          md={md_count}
          onClick={() => setToggler(!toggler)}
          className=" d-flex"
        >
          {type == "moder" && (
            <div>
              <LightTooltip
                placement="bottom-end"
                title={
                  <FormattedMessage
                    id={`STATUS.${scheduleBoardCreatives["status"] == "moder"
                        ? "moder"
                        : "moder_ok"
                      }`}
                  />
                }
              >
                <IconButton style={{ fill: "rgb(233, 85, 91)" }}>
                  {scheduleBoardCreatives["status"] == "moder" ? (
                    <AccessTimeTwoToneIcon
                      fontSize="large"
                      style={{ fill: "rgb(233, 85, 91)" }}
                    />
                  ) : (
                    scheduleBoardCreatives["status"] == "reject" ? (
                      <CloseIcon
                        fontSize="large"
                        style={{ fill: "rgb(233, 85, 91)" }}
                      />
                    ) : (
                      <CheckIcon
                        fontSize="large"
                        style={{ fill: "rgb(29, 201, 183)" }}
                      />
                    )
                  )}
                </IconButton>
              </LightTooltip>
            </div>
          )}

          <Grid container direction="row" className="align-items-center">
            <Avatar
              variant="rounded"
              src={
                process.env.REACT_APP_MY_HOST_CREATIVE +
                `/creative/${album.group_id}/thumb${album.link.split(".")[0]}.${album.link.split(".")[1] == "jpeg" ? "jpeg" : "jpg"}`
              }
              className="mr-2 cursor-pointer"
            />
            <Typography className={`${classes.TableCellNameA}`} >{album.title}</Typography>
          </Grid>
        </Grid>

        {!!type && props.screen.status != "finished" && data.all_data.status != "finished" && (
          <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Box
              className="kt-badge kt-badge--inline kt-badge--success mR10"
              style={{ background: props.isStatus(active), fontSize: '10px' }}
            >
              <FormattedMessage id={"STATUS." + active} />
            </Box>
          </Grid>
        )}

        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.screenData }}>
            {album.filesize !== 0
              ? (album.filesize / 1024 / 1024).toFixed(2)
              : "-"}
          </Typography>
          <Typography classes={{ root: classes.screenTitle }}>mB</Typography>
        </Grid>
        <Grid item md={1} classes={{ root: classes.screenData }}>
          <Moment format="DD/MM/YYYY">
            {album.created_at !== 0 ? album.created_at : "-"}
          </Moment>
          <Typography classes={{ root: classes.screenTitle }}>Создан</Typography>
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
                board_id={props.board_id}
                screen={props.screen}
                camp={data.all_data}
                status={scheduleBoardCreatives.status}
                active={scheduleBoardCreatives.active}
              />
            </Grid>
          )}
      </Grid>
      <FsLightbox
        toggler={toggler}
        sources={[file_path]}
        type={
          ["jpeg", "jpg", "gif"].includes(album.link.split(".")[1]) ? "image" : "video"
        }
      />
    </>
  );
};
const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});


export default withRouter(connect(mapStateToProps)(SlideModerated));
