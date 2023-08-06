import React, { Suspense, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import axios from "axios";
import Swal from "sweetalert2";
import { Link, Route, Switch } from "react-router-dom";

import ViewTabProfit from "./Tabs/ViewTabProfit";
import ViewTabExpense from "./Tabs/ViewTabExpense";

import { LayoutSplashScreen } from "../../../_metronic";

const useStyles = makeStyles({
  balance: {
    fontSize: "30px",
    color: "#222",
    lineHeight: "30px"
  },
  balanceWord: {
    fontSize: "10px",
    color: "#222"
  }
});

const FinanceTabs = props => {
  const classes = useStyles();
  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 col-md-12 px-md-0 mt-3">
            <ViewTabExpense />
          </div>
        </div>
      </div>

  );
};

export default FinanceTabs;
