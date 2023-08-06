import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { sub_users } from "../../../crud/auth.crud";

const useStyles = makeStyles(theme => ({
  selectButton: {
    margin: `${theme.spacing(4)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  }
}));

const ViewTabAccessGive = props => {
  const classes = useStyles();
  const [usersData, setSubUsers] = useState({});

  useEffect(() => {
    getSubUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSubUsers = async () => {
    try {
      let res = await sub_users();
      console.log(res.data);
      setSubUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="kt-portlet__body" style={{ marginTop: "-20px" }}>
      sfdfsdfsdfsdfsdf222 give
    </div>
  );
};

export default ViewTabAccessGive;
