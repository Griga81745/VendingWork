import React, { useEffect, useState } from "react";
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
import {Link, withRouter} from "react-router-dom";
import $ from "jquery";
import {connect} from "react-redux";

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
    fontSize: 14,
    minHeight: "auto"
  }
});

const Menu = props => {
  const [anchorEl7, setAnchorEl7] = React.useState(null);
  const open7 = Boolean(anchorEl7);
  const {currentUser, camp} = props;
  function handleClick7(event) {
    setAnchorEl7(event.currentTarget);
  }

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13
    }
  }))(Tooltip);

  function handleClose7() {
    setAnchorEl7(null);
  }

  /*
        const preDelete = props => {
            //console.error(props);
            handleClose7();
            askCancel(props);
        }
        const askCancel = props => {
            Swal.fire({
                title: `Удалить файл?`,
                html: `Вы уверены, что хотите удалить файл?`,
                showCancelButton: true,
                confirmButtonColor: '#e9555b',
                cancelButtonColor: '#7ac774',
                confirmButtonText: 'Удалить',
                cancelButtonText: 'Отмена',
                preConfirm: () => {
                    deleteFile(props.item.id);
                }
            })
        };
    */
  const campDeleted = () => {
    Swal.fire({
      title: "Файл удалён!",
      icon: "success",
      timer: 8000,
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

  const approve = async status => {
    handleClose7();
    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(
        `/campaign/approve-creative?subuser=${currentUser.id}`,
        {
          creative: +props.item.id,
          status: status,
          camp: +props.id,
          board: +props.board_id
        }
      );
      if (res.data.status === "fail") {
        alertError("Ошибка3");
      } else {
        props.getTableData();
      }
    } catch (err) {
      alertError("Ошибка4");
      console.error(err);
    }
  };

  const active = async active => {
    handleClose7();
    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(
        `/campaign/active-creative?subuser=${currentUser.id}`,
        {
          creative: +props.item.id,
          active: active,
          camp: +props.id,
          board: +props.board_id
        }
      );
      if (res.data.status === "fail") {
        alertError("Ошибка2");
      } else {
        props.getTableData();
      }
    } catch (err) {
      alertError("Ошибка1");
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-icon btn-sm btn-icon-md"
        onClick={handleClick7}
      >
        <LightTooltip title="Настройки">
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
        {props.status != "running" && (props.type == "moder" && props.screen["schedule_id"] == currentUser.id ) && (
          <MenuItem
            onClick={props.setToggler}
            classes={{ root: classes.menuItem }}
            onClick={() => approve("running")}
          >
            Одобрить
          </MenuItem>
        )}
        {props.status != "moder" && (props.type == "moder" && props.screen["schedule_id"] == currentUser.id ) && (
          <MenuItem
            onClick={props.setToggler}
            classes={{ root: classes.menuItem }}
            onClick={() => approve("moder")}
          >
            Вернуть на модерацию
          </MenuItem>
        )}
        {props.status != "reject" && (props.type == "moder" && props.screen["schedule_id"] == currentUser.id ) && (
          <>
            <Divider />
            <MenuItem
              classes={{ root: classes.menuItem }}
              onClick={() => approve("reject")}
            >
              Отклонить
            </MenuItem>
          </>
        )}
        {props.active == "0" && (props.type == "myboards" || (props.type == "moder" && camp["user_id"] == currentUser.id )) && (
          <MenuItem
            onClick={props.setToggler}
            classes={{ root: classes.menuItem }}
            onClick={() => active(1)}
          >
            Включить
          </MenuItem>
        )}
        {props.active == "1" && (props.type == "myboards" || (props.type == "moder" && camp["user_id"] == currentUser.id )) && (
          <MenuItem
            onClick={props.setToggler}
            classes={{ root: classes.menuItem }}
            onClick={() => active(0)}
          >
            Выключить
          </MenuItem>
        )}
      </MenuD>
    </>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});
export default withRouter(connect(mapStateToProps)(Menu));

