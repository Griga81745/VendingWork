import React, { Suspense, useEffect, useState } from "react";
// import { Grid } from "@material-ui/core";

// import axios from "axios";
// import Swal from "sweetalert2";
// import { Link, Route, Switch, useLocation } from "react-router-dom";

import ViewTabSetting from "./Tabs/ViewTabSetting";
import ViewTabAvatar from "./Tabs/ViewTabAvatar";
import ViewTabPassword from "./Tabs/ViewTabPassword";

import { LayoutSplashScreen } from "../../../_metronic";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, AppBar, Tabs, Tab } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));
const ProfileTabs = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default" className={`AppBar`}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label="Основные" {...a11yProps(0)} />
          <Tab label="Пароль/Email" {...a11yProps(1)} />
          <Tab label="Аватар" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ViewTabSetting />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ViewTabPassword />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ViewTabAvatar />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default ProfileTabs;
