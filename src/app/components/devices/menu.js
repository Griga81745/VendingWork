import React, { useState } from "react";
import {
  Divider,
  makeStyles,
  Fade,
  MenuItem,
  Menu as MenuD,
  withStyles,
  Tooltip
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
  //const [isOpened, openHandler] = useState(true);

  // Example 7
  const [anchorEl7, setAnchorEl7] = React.useState(null);
  const open7 = Boolean(anchorEl7);

  function handleClick7(event) {
    setAnchorEl7(event.currentTarget);
  }

  function handleClose7() {
    setAnchorEl7(null);
  }

  const preDelete = props => {
    console.error(props);
    handleClose7();
    askCancel(props);
  };
  const askCancel = props => {
    Swal.fire({
      title: `Остановка кампании!`,
      icon: "warning",
      html: `Вы уверены, что хотите остановить кампанию?  \n <strong>${props.name}</strong>`,
      showCancelButton: true,
      confirmButtonColor: "#e9555b",
      cancelButtonColor: "#7ac774",
      confirmButtonText: "Остановить",
      cancelButtonText: "Отмена",
      preConfirm: () => {
        deleteCompany(props.id);
      }
    });
  };

  const campDeleted = () => {
    Swal.fire({
      title: "Остановлено!",
      icon: "success",
      timer: 8000,
      text: "Кампания успешно остановлена",
      confirmButtonColor: "#7ac774"
    });
  };

  const alertError = err => {
    Swal.fire({
      title: "Ошибка!",
      icon: "warning",
      text: err,
      confirmButtonColor: "#7ac774"
    });
  };
  const globalError = () => {
    alertError("Мы знаем об ошибке и скоро её исправим!");
  };
  const classes = useStyles();
  const deleteCompany = async id => {
    handleClose7();
    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(`/campaign/delete?campaign_id=${id}`);
      if (res.data.status === "fail") {
        if (res.data.error === "id_error" || res.data.error === "no_camp") {
          alertError("Кампании не существует!");
        } else if (res.data.error === "no_remove") {
          alertError("Не удалось остановить кампанию");
        } else {
          globalError();
        }
      } else {
        campDeleted();
        props.refreshTable();
      }
    } catch (err) {
      globalError();
      console.error(err);
    }
  };
  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  return (
    <>
      <button
        className="btn btn-icon btn-sm btn-icon-md"
        onClick={handleClick7}
      >
        <LightTooltip title="Меню настроек">
          <i className="flaticon-more"></i>
        </LightTooltip>
      </button>

      <MenuD
        id="fade-menu"
        anchorEl={anchorEl7}
        keepMounted
        open={open7}
        onClose={handleClose7}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem
          component={Link}
          to={`/myboards/view/${props.id}`}
          classes={{ root: classes.menuItem }}
        >
          Статистика
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/myboards/add/${props.id}`}
          classes={{ root: classes.menuItem }}
        >
          Настройки
        </MenuItem>
      </MenuD>
    </>
  );
};

export default Menu;
