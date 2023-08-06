import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  selectButton: {
    margin: `${theme.spacing(4)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  }
}));

const ViewTabMoney = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div class="kt-portlet__body" style={{ marginTop: "-20px" }}>
      <div class="tab-content">
        <div class="tab-pane active" id="media" role="tabpanel">
          sfd55555555555555555555555555 55 5555
        </div>
      </div>
    </div>
  );
};

export default ViewTabMoney;
