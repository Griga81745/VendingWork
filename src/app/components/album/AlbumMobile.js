import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const AlbumMobile = props => {
  const { classes, album } = props;
  return (
    <Grid container classes={{ root: classes.row }}>
      <Grid container justify="space-between">
        <Grid item xs={10} classes={{ root: classes.companyInfo }}>
          <Grid container direction="row">
            <i className={`fa pr-2 flaticon-folder ${classes.iconF}`}></i>
            <Typography classes={{ root: classes.companyName }}>
              <Link to={`/md/view/${album.id}`} className="C-NameHover">
                {album.name}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-around"
        classes={{ root: classes.companyInfo }}
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
          <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
        </Grid>
        <Grid item xs={6} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            <Moment format="DD/MM/YYYY">
              {album.created_at !== 0 ? album.created_at : "-"}
            </Moment>
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          classes={{ root: classes.dataContainer }}
          className="mt-2"
        >
          <Typography classes={{ root: classes.data }}>
            {album.count !== 0 ? album.count : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Загружено
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlbumMobile;
