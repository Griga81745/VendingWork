import React, { useState } from "react";
import { Grid, IconButton, Typography, Avatar } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import FsLightbox from "fslightbox-react";
import Menu from "./menu";
import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";

const AlbumViewDesktop = props => {
  const { classes, album } = props;
  const [toggler, setToggler] = useState(false);
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${album.group_id}/${album.link}`;

  if (album.mime.split("/")[0] == "audio") {
    return (
      <>
        <Grid container classes={{ root: classes.row }}>
          <Grid
            item
            md={5}
            classes={{ root: classes.companyInfo }}
            onClick={() => setToggler(!toggler)}
          >
            <Grid container direction="row" className="align-items-center">
              <IconButton style={{ fill: "rgb(233, 85, 91)" }}>
                <AudiotrackTwoToneIcon fontSize="large" />
              </IconButton>
              <Grid>
                <Typography classes={{ root: classes.companyName }}>
                  {album.title}
                </Typography>
                <Typography classes={{ root: classes.dataHeader }}>
                  {album.mime}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              {album.username !== 0 ? album.username : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Загружен
            </Typography>
          </Grid>
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
              {album.resw !== 0 ? album.resw : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Кампании
            </Typography>
          </Grid>
          <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              <Moment format="DD/MM/YYYY">
                {album.created_at !== 0 ? album.created_at : "-"}
              </Moment>
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Создан
            </Typography>
          </Grid>
          <Grid album md={1} classes={{ root: classes.dataContainer }}>
            <Menu
              item={album}
              refreshTable={props.getFiles}
              setToggler={setToggler}
            />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid
          item
          md={5}
          classes={{ root: classes.companyInfo }}
          onClick={() => setToggler(!toggler)}
        >
          <Grid container direction="row" className="align-items-center">
            <Avatar
              variant="rounded"
              src={
                process.env.REACT_APP_MY_HOST_CREATIVE +
                `/creative/${album.group_id}/thumb${album.link.split(".")[0]
                }.jpg`
              }
              className="mr-2"
            />
            <Grid>
              <Typography classes={{ root: classes.companyName }}>
                {album.title}
              </Typography>
              <Typography classes={{ root: classes.dataHeader }}>
                {album.mime}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {album.username !== 0 ? album.username : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Загружен
          </Typography>
        </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {album.resw !== 0 ? album.resw : "-"}X
            {album.resh !== 0 ? album.resh : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Разрешение
          </Typography>
        </Grid>
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
            {album.resw !== 0 ? album.resw : "-"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Кампании
          </Typography>
        </Grid>
        <Grid item md={1} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            <Moment format="DD/MM/YYYY">
              {album.created_at !== 0 ? album.created_at : "-"}
            </Moment>
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
        </Grid>
        <Grid album md={1} classes={{ root: classes.dataContainer }}>
          <Menu
            item={album}
            refreshTable={props.getFiles}
            setToggler={setToggler}
          />
        </Grid>
      </Grid>
      <FsLightbox
        toggler={toggler}
        sources={[file_path]}
        type={album.link.split(".")[1] === "jpg" ? "image" : "video"}
      />
    </>
  );
};

export default AlbumViewDesktop;
