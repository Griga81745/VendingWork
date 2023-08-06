import React, { useState } from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import FsLightbox from "fslightbox-react";

const AlbumViewMobile = props => {
  const { classes, album } = props;
  const [toggler, setToggler] = useState(false);
  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${album.group_id}/${album.link}`;
  return (
    <>
      <Grid container classes={{ root: classes.row }}>
        <Grid container justify="space-between">
          <Grid
            item
            xs={12}
            classes={{ root: classes.companyInfo }}
            onClick={() => setToggler(!toggler)}
          >
            <Grid container direction="row" className="align-items-center">
              <Avatar
                variant="rounded"
                src={
                  process.env.REACT_APP_MY_HOST_CREATIVE +
                  `/creative/${album.group_id}/thumb${album.link}`
                }
                className="mr-2"
              />
              <Typography classes={{ root: classes.companyName }}>
                {album.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          classes={{ root: classes.companyInfo }}
          className="mt-2"
        >
          <Grid
            item
            xs={6}
            classes={{ root: classes.dataContainer }}
            className="mt-2"
          >
            <Typography classes={{ root: classes.data }}>
              {album.username !== 0 ? album.username : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Загружен
            </Typography>
          </Grid>
          <Grid item xs={6} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              {album.resw !== 0 ? album.resw : "-"}X
              {album.resh !== 0 ? album.resh : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Разрешение
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            classes={{ root: classes.dataContainer }}
            className="mt-2"
          >
            <Typography classes={{ root: classes.data }}>
              {album.filesize !== 0 ? album.filesize : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>mB</Typography>
          </Grid>
          <Grid item xs={6} classes={{ root: classes.dataContainer }}>
            <Typography classes={{ root: classes.data }}>
              {album.resw !== 0 ? album.resw : "-"}
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Кампании
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            classes={{ root: classes.dataContainer }}
            className="mt-2"
          >
            <Typography classes={{ root: classes.data }}>
              <Moment format="DD/MM/YYYY">
                {album.created_at !== 0 ? album.created_at : "-"}
              </Moment>
            </Typography>
            <Typography classes={{ root: classes.dataHeader }}>
              Создан
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <FsLightbox toggler={toggler} sources={[file_path]} type="image" />
    </>
  );
};

export default AlbumViewMobile;
