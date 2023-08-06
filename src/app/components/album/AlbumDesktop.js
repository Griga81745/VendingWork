import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const AlbumDesktop = props => {
  const { classes, album } = props;

  return (
    <Grid container classes={{ root: classes.row }}>
      <Grid item md={8} classes={{ root: classes.companyInfo }}>
        <Grid container direction="row" className="align-items-center">
          <i className={`fa pr-2 flaticon-folder ${classes.iconF}`}></i>
          <Link
            to={`/md/view/${album.id}`}
            className={`C-NameHover ${classes.companyName}`}
          >
            {album.name}
          </Link>
        </Grid>
      </Grid>
      <Grid item md={2} classes={{ root: classes.dataContainer }}>
        <Typography classes={{ root: classes.data }}>
          {album.username !== 0 ? album.username : "-"}
        </Typography>
        <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
      </Grid>
      <Grid item md={1} classes={{ root: classes.dataContainer }}>
        <Typography classes={{ root: classes.data }}>
          <Moment format="DD/MM/YYYY">
            {album.created_at !== 0 ? album.created_at : "-"}
          </Moment>
        </Typography>
        <Typography classes={{ root: classes.dataHeader }}>Создан</Typography>
      </Grid>
      <Grid item md={1} classes={{ root: classes.dataContainer }}>
        <Typography classes={{ root: classes.data }}>
          {album.count !== 0 ? album.count : "0"}
        </Typography>
        <Typography classes={{ root: classes.dataHeader }}>
          Загружено
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AlbumDesktop;
