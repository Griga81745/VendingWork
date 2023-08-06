import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";

import Menu from "./menu";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CampaignTablet = props => {
  const { boxStyles, classes, item, getTableData } = props;
  return (
    <Grid container classes={{ root: classes.row }}>
      <Box
        {...boxStyles.rowFill}
        style={{ backgroundColor: "#f1f9f1", transition: "2s" }}
        width={
          parseInt(item.impr) !== 0
            ? `${Math.round(+item.impr / (+item.requested / 100))}%`
            : "0%"
        }
      >
        <Box {...boxStyles.rowFillPercents}>
          {parseInt(item.impr) !== 0
            ? `${Math.round(+item.impr / (+item.requested / 100))}%`
            : "0%"}
        </Box>
      </Box>
      <Grid container justify="space-between">
        <Grid item sm={10} classes={{ root: classes.companyInfo }}>
          <Grid container direction="row" style={{ paddingBottom: "5px" }}>
            <Box
              className="kt-badge kt-badge--inline kt-badge--success mR10"
              style={{ background: props.isStatus(item.status) }}
              marginRight="10px"
            >
              <FormattedMessage id={"STATUS." + item.status} />
            </Box>
            <Typography classes={{ root: classes.companyName }}>
              {item.status === "draft" && (
                <Link className="C-NameHover" to={`/wizard/${item.id}`}>
                  {item.name}
                </Link>
              )}
              {item.status === "running" && (
                <Link className="C-NameHover" to={`/campaign/view/${item.id}`}>
                  {item.name}
                </Link>
              )}
              {item.status === "finished" && (
                <Link className="C-NameHover" to={`/campaign/view/${item.id}`}>
                  {item.name}
                </Link>
              )}
            </Typography>
          </Grid>
          <Grid>
            <Moment format="DD.MM.YYYY HH" unix>
              {item.start}
            </Moment>{" "}
            -{" "}
            <Moment format="DD.MM.YYYY HH" unix>
              {item.end}
            </Moment>
          </Grid>
        </Grid>
        <Grid item sm={2} classes={{ root: classes.dataContainer }}>
          <Menu item={item} refreshTable={getTableData} />
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
            {Math.round(item.cost / item.requested) * 1000}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>CPM</Typography>
        </Grid>
        <Grid item sm={3} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>{item.cost}</Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Стоимость
          </Typography>
        </Grid>
        <Grid item sm={3} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>
            {item.requested}
          </Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Заказано
          </Typography>
        </Grid>
        <Grid item sm={3} classes={{ root: classes.dataContainer }}>
          <Typography classes={{ root: classes.data }}>{item.impr}</Typography>
          <Typography classes={{ root: classes.dataHeader }}>
            Показано
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampaignTablet;
