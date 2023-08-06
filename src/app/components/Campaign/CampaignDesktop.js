import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "./menu";
import { FormattedMessage } from "react-intl";
import Moment from "react-moment";

const CampaignDesktop = props => {
  const { boxStyles, classes, getTableData, reklamodatel, dataShows, dataCampaign } = props;

  return (
      <>
          <Grid className={`row ${classes.greyPla}`}>
              <div className={'col-5'}>
                  <div >Кампания</div>
                  <div>Название рекламной кампании</div>
              </div>
              <div className={'col-5'}>
                  <div >Кампания</div>
                  <div>Название рекламной кампании</div>
              </div>
          </Grid>

          {!!dataCampaign && dataCampaign.map(item => (
                <Grid container classes={{ root: classes.row }}>
              <Box
                {...boxStyles.rowFill}
                style={{ backgroundColor: "#f1f9f1", transition: "2s" }}
                width={
                  parseInt(item.impr) !== 0
                    ? `${Math.round(+(!!dataShows[item.id] ? dataShows[item.id] : 0) / (+item.requested / 100))}%`
                    : "0%"
                }
              >
                <Box {...boxStyles.rowFillPercents}>
                  {parseInt(item.impr) !== 0
                    ? `${Math.round(+(!!dataShows[item.id] ? dataShows[item.id] : 0) / (+item.requested / 100))}%`
                    : "0%"}
                </Box>
              </Box>
              <Grid item md={5} classes={{ root: classes.companyInfo }}>
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
                    {(item.status === "running" || item.status === "pending") && (
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
              </Grid>

              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.companyDates }}>
                  <Moment format="DD.MM.YYYY HH" unix>
                    {item.start}
                  </Moment>
                </Typography>
                <Typography classes={{ root: classes.dataHeader }}>Старт</Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.companyDates }}>
                  <Moment format="DD.MM.YYYY HH" unix>
                    {item.end}
                  </Moment>
                </Typography>
                <Typography classes={{ root: classes.dataHeader }}>Конец</Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.data }}>
                  {Math.round(item.cost / item.requested) * 1000}
                </Typography>
                <Typography classes={{ root: classes.dataHeader }}>CPM</Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.data }}>{item.cost}</Typography>
                <Typography classes={{ root: classes.dataHeader }}>
                  Стоимость
                </Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.data }}>
                  {item.requested}
                </Typography>
                <Typography classes={{ root: classes.dataHeader }}>Заказано</Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Typography classes={{ root: classes.data }}>{!!dataShows[item.id] ? dataShows[item.id] : 0}</Typography>
                <Typography classes={{ root: classes.dataHeader }}>Показано</Typography>
              </Grid>
              <Grid item md={1} classes={{ root: classes.dataContainer }}>
                <Menu
                  item={item}
                  refreshTable={getTableData}
                  reklamodatel={reklamodatel}
                />
              </Grid>
            </Grid>
          ))}
      </>
  );
};

export default CampaignDesktop;
