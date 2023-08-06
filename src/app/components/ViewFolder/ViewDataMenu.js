import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import Moment from "react-moment";

const ViewDataMenu = props => {
  return (
    <Grid className="kt-portlet">
      <Grid className="kt-portlet__body">
        <Grid className="kt-widget kt-widget--user-profile-3">
          <Grid container className="kt-widget__bottom mt-0 border-0">
            <TabData
              icon={"flaticon-download"}
              name={"Создана"}
              data={!!props.data.all_data && props.data.all_data.created_at}
            />
            <TabData
              icon={"flaticon-calendar-with-a-clock-time-tools"}
              name={"Начало"}
              data={`${!!props.data.all_data && props.data.all_data.start}`}
            />
            <TabData
              icon={"flaticon-calendar-with-a-clock-time-tools"}
              name={"Конец"}
              data={`${!!props.data.all_data && props.data.all_data.end}`}
            />
            <Tab
              icon={"flaticon-layers"}
              name={"Медиа"}
              data={!!props.data.all_data && props.data.all_data.creativesCount}
            />
            <Divider orientation="vertical" flexItem />
            <Tab
              icon={"flaticon-responsive"}
              name={"Экраны"}
              data={!!props.data.all_data && props.data.all_data.boards_count}
            />
            <Tab
              icon={"flaticon-clock-1"}
              name={"Длина ролика"}
              data={!!props.data.all_data && props.data.all_data.duration}
            />
            <Tab
              icon={"flaticon-layers"}
              name={"Заказано показов"}
              data={!!props.data.all_data && props.data.all_data.reserved}
            />

            {!!props.data.all_data && props.data.all_data.radio > 0 && (
              <>
                <Divider orientation="vertical" flexItem />
                <Tab
                  icon={"flaticon-responsive"}
                  name={"Радиостанции"}
                  data={props.data.all_data.radio}
                />
                <Tab
                  icon={"flaticon-clock-1"}
                  name={"Длина выхода"}
                  data={props.data.all_data.duration_radio}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const Tab = props => {
  return (
    <Grid className="kt-widget__item pt-0" item>
      <Grid className="kt-widget__icon">
        <i className={props.icon}></i>
      </Grid>
      <Grid className="kt-widget__details">
        <span className="kt-widget__value" style={{ fontSize: "1.1rem" }}>
          {props.data}{" "}
        </span>
        <span className="kt-widget__title">{props.name}</span>
      </Grid>
    </Grid>
  );
};

const TabData = props => {
  return (
    <Grid className="kt-widget__item pt-0" item>
      <Grid className="kt-widget__icon">
        <i className={props.icon}></i>
      </Grid>
      <Grid className="kt-widget__details">
        <span className="kt-widget__value">
          <Moment format="DD.MM.YYYY" style={{ fontSize: "1.1rem" }}>
            {props.data}
          </Moment>
        </span>
        <span className="kt-widget__title">{props.name}</span>
      </Grid>
    </Grid>
  );
};
export default ViewDataMenu;
