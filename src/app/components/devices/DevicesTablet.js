import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";

import Menu from "./menu";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const DevicesTablet = props => {
  const { boxStyles, classes, board, getBoards } = props;
  return (
    <Grid container classes={{ root: classes.row }} className="py-2">
      <Grid container justify="space-between">
        <Grid item sm={10} classes={{ root: classes.companyInfo }}>
          <Grid container direction="row">
            <Typography classes={{ root: classes.companyName }}>
              <Link to={`/myboards/view/${board.id}`} className="C-NameHover">
                {board.title}
              </Link>
            </Typography>
          </Grid>
          <Grid>
            <Typography classes={{ root: classes.companyDates }}>
              <FormattedMessage id={"CITY_" + board.city} />
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={2} classes={{ root: classes.dataContainer }}>
          <Menu id={board.id} name={board.title} refreshTable={getBoards} />
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-around"
        classes={{ root: classes.companyInfo }}
        className="mt-2"
      >
        <Grid item sm={3} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {board.camp !== 0 ? board.camp : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Кампании
          </Typography>
        </Grid>
        <Grid item sm={3} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {board.showed !== 0 ? board.showed : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Показано
          </Typography>
        </Grid>
        <Grid item sm={2} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {board.reserved !== 0 ? board.reserved : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>Занято</Typography>
        </Grid>
        <Grid item sm={2} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {board.notused !== 0 ? board.notused : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Простаивает
          </Typography>
        </Grid>
        <Grid item sm={2} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {board.profit !== 0 ? board.profit : "0"}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>Доход</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DevicesTablet;
