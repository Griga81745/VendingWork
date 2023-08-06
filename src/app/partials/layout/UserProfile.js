import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
//import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  DialogTitle,
  Dialog,
  Avatar,
  ListItemAvatar,
  Box,
} from "@material-ui/core";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import blue from "@material-ui/core/colors/blue";
//import {getUser} from "../../crud/local.storage";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import * as auth from "../../store/ducks/auth.duck";

import PersonIcon from "@material-ui/icons/Person";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
//import { injectIntl } from "react-intl";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const UserProfile = (props) => {
  const { user, showHi, showAvatar, showBadge, currentUser, auth } = props;

  const [subusersLength, setSubusersLength] = useState(0);
  //const [currentUser, setCurrentUsers] = useState({});
  let childRef = null;
  const path_ava = process.env.REACT_APP_MY_HOST_CREATIVE + `/avatar/`;
  const [imgUrl, setImgUrl] = useState(
    process.env.REACT_APP_MY_HOST_CREATIVE + `/avatar/boy-256.png`
  );

  useEffect(() => {
    //  let user = getUser();
    let pic = user.pic;
    if (!!pic && pic !== null) {
      setImgUrl(path_ava + user.id + "/thumb" + pic);
    }
    //setCurrentUsers(user);
  }, []);

  useEffect(() => {
    let users = localStorage.getItem("users");
    if (!!users) {
      setSubusersLength(Object.keys(JSON.parse(users)).length);
    }
    //setCurrentUsers(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  const handleClose = () => {
    props.setOpen(false);
  };
  const [showDropdown2, setShowDropdown2] = useState(false);
  const onToggleH = () => {
    setShowDropdown2(!showDropdown2);
  };
  const handleClickAway = () => {
    setShowDropdown2(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dropdown
        className="kt-header__topbar-item kt-header__topbar-item--user"
        drop="down"
        alignRight
        //show={!props.showDropdown}
        show={showDropdown2}
        //onToggle={() => {
        //console.log("onToggleHonToggleHonToggleHonTog3333333")
        //}}
        onClick={onToggleH}
      >
        <AccountDialog
          auth={auth}
          currentUser={currentUser}
          open={props.open}
          userMe={user}
          handleClose={handleClose}
        />
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-profile"
          ref={(childR) => (childRef = childR)}
        >
          <div className="kt-header__topbar-user">
            {showHi && (
              <span className="kt-hidden-mobile">
                <AccountCircleIcon style={{ width: 40, height: 40 }} />
              </span>
            )}

            {showAvatar && <img alt="Pic" src={imgUrl} />}

            {showBadge && (
              <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                {/* TODO: Should get from currentUser */}
                {user && !!user.fullname && user.fullname[0]}
              </span>
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
          <List
            component="nav"
            disablePadding={true}
            aria-label="main mailbox folders"
          >
            <ListItem className={"pb-0"}>
              <ListItemText
                primary={!!user.lastname ? user.lastname : user.firstname}
                secondary={
                  user.role == "owner"
                    ? "Владелец"
                    : user.role == "user"
                    ? "Клиент"
                    : "Биржа"
                }
              />
            </ListItem>
            <ListItem className={"pt-0"}>
              <ListItemText secondary={user.email} className={"mt-0"} />
            </ListItem>
          </List>
          <Divider />
          {!!currentUser && currentUser.email !== user.email && (
            <List
              component="nav"
              disablePadding={true}
              aria-label="main mailbox folders"
            >
              <ListItem className={"align-items-start d-flex flex-column"}>
                <Box
                  style={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.54)" }}
                >
                  Вы в аккаунте
                </Box>
                <ListItemText
                  className={"pt-0 mt-0"}
                  primary={currentUser.email}
                  secondary={
                    currentUser.role == "user" ? "рекламодатель" : "владелец"
                  }
                />
              </ListItem>
            </List>
          )}

          <Divider />
          <List
            component="nav"
            disablePadding={true}
            aria-label="main mailbox folders"
          >
            <ListItem
              button
              component={Link}
              to="/campaign"
              onClick={handleClickAway}
            >
              <ListItemIcon style={{ minWidth: "34px" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Кампании" />
            </ListItem>
          </List>
          {currentUser.role === "owner" && (
            <List
              component="nav"
              disablePadding={true}
              aria-label="main mailbox folders"
            >
              <ListItem
                button
                component={Link}
                to="/myboards"
                onClick={onToggleH}
              >
                <ListItemIcon style={{ minWidth: "34px" }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Устройства" />
              </ListItem>
            </List>
          )}
          <List
            component="nav"
            disablePadding={true}
            aria-label="main mailbox folders"
          >
            <ListItem button component={Link} to="/md" onClick={onToggleH}>
              <ListItemIcon style={{ minWidth: "34px" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Файлы" />
            </ListItem>
          </List>

          <Divider />
          <List
            component="nav"
            disablePadding={true}
            aria-label="main mailbox folders"
          >
            <ListItem button component={Link} to="/profile" onClick={onToggleH}>
              <ListItemIcon style={{ minWidth: "34px" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItem>
          </List>
          {!!subusersLength && subusersLength !== 0 && (
            <>
              <Divider />
              <List
                component="nav"
                disablePadding={true}
                aria-label="secondary mailbox folders"
              >
                <ListItem
                  button
                  onClick={() => {
                    props.setOpen(true);
                    onToggleH();
                  }}
                >
                  <ListItemIcon style={{ minWidth: "34px" }}>
                    <SwapHorizIcon />
                  </ListItemIcon>
                  <ListItemText primary="Сменить аккаунт" />
                </ListItem>
              </List>
            </>
          )}
          <Divider />
          <List
            component="nav"
            disablePadding={true}
            aria-label="secondary mailbox folders"
          >
            <ListItem button component={Link} to="/logout">
              <ListItemIcon style={{ minWidth: "34px" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Выход" />
            </ListItem>
          </List>
        </Dropdown.Menu>
      </Dropdown>
    </ClickAwayListener>
  );
};

const AccountDialog = (props) => {
  const classes = useStyles();
  const { currentUser, auth } = props;
  const [subusers, setSubusers] = useState({});
  //const [currentUser, setCurrentUsers] = useState({});
  // const { subusers
  //, currentUser
  // } = props;
  const getUserDataByID = (user) => {
    //return;
    let setUser = user == props.userMe.id ? props.userMe : subusers[user];

    /*    auth.fulfillCurrentUser({'currentUser': {
          email: setUser.email,
          id: setUser.id,
          role: setUser.role
        }});*/
    let savedUser = JSON.parse(localStorage.getItem("persist:okta"));
    savedUser.currentUser = {
      email: setUser.email,
      id: setUser.id,
      role: setUser.role,
    };

    savedUser.currentUser =
      '{"id":' +
      setUser.id +
      ',"email":"' +
      setUser.email +
      '","role":"' +
      setUser.email +
      '"}';
    // console.log(' savedUser.currentUser');
    //console.log(savedUser);
    // console.log(JSON.stringify(savedUser));

    localStorage.setItem("persist:okta", JSON.stringify(savedUser));
    window.location.replace("/");
  };

  useEffect(() => {
    //console.log('subuserssubusers44454544');
    //console.log(localStorage.getItem("users"));
    let users = localStorage.getItem("users");
    if (!!users) {
      setSubusers(JSON.parse(users));
    }

    //console.log(JSON.parse(localStorage.getItem("users")));

    //setCurrentUsers(JSON.parse(localStorage.getItem("currentUser")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log('subuserssubuserssubuserssubuserssubusers123234');
  //console.log(subusers);
  //console.log(currentUser);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xs"}
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Аккаунты</DialogTitle>
      <List className={"pt-0"}>
        {!!subusers &&
          Object.keys(subusers).map((user) => {
            let setUser =
              user == props.userMe.id ? props.userMe : subusers[user];
            if (subusers[user].email == currentUser.email) return;

            return (
              <ListItem
                button
                onClick={() => {
                  getUserDataByID(user);
                }}
                key={setUser.email}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={setUser.email}
                  secondary={setUser.firstname}
                />
              </ListItem>
            );
          })}
      </List>
    </Dialog>
  );
};
//export default injectIntl(connect(null, auth.actions)(Login));

const mapStateToProps = (store) => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser,
  auth: auth.actions,
});

export default connect(mapStateToProps)(UserProfile);
