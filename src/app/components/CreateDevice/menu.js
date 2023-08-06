import React, { useEffect, useState } from "react";
import {
  Divider,
  makeStyles,
  Fade,
  MenuItem,
  Menu as MenuD,
  withStyles,
  Tooltip, IconButton
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  tooltip: {
    margin: 0,
    padding: "13px 0",
    backgroundColor: "white",
    boxShadow: "1px 1px 12px 6px rgba(56, 56, 56, 0.16)"
  },
  popper: {
    zIndex: 1
  },
  menuItem: {
    fontWeight: 500,
    fontSize: "12px",
    minHeight: "auto"
  }
});

const Menu = props => {
  const { id } = useParams();
  const { currentUser } = props;
  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  const preDelete = props => {
    askCancel(props);
  };
  const askCancel = props => {
    Swal.fire({
      title: `Удалить файл?`,
      //html: `Удалить файл?`,
      showCancelButton: true,
      confirmButtonColor: "#f64e60",
      cancelButtonColor: "#22b9ff",
      confirmButtonText: "Да",
      cancelButtonText: "Нет",
      preConfirm: () => {
        deleteCreative(props);
      }
    });
  };

  const alertError = data => {
    Swal.fire({
      title: data.title,
      text: data.text,
      confirmButtonColor: "#22b9ff"
    });
  };

  const classes = useStyles();
  const deleteCreative = async () => {

    //console.log('currentUsercurrentUsercurrentUsercurrentUser111')
    //console.log(currentUser)

    // try {
    let res = await axios.post(
      `https://ru.de4.ru/deleteBF?id=${id}&name=${props.item.link}&type=${props.type}&subuser=${currentUser.id}`);
    if (res.data.status === "fail") {
      alertError({ title: "Не удалось удалить файл!" });
    } else {
      alertError({ title: "Файл удалён" });
      props.getBoardInfo("files");
    }
    // } catch (err) {
    //  alertError({ title: "Мы знаем об ошибке и скоро её исправим!", text: err });
    // }
  };

  return (


    <div className="align-self-center d-flex" style={{ 'width': 68 }}>
      <Tooltip title="Удалить креатив">
        <IconButton aria-label="delete" onClick={() => preDelete(props)} className={classes.margin}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>

  );
};

export default Menu;
