import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import objectPath from "object-path";
import * as builder from "../../ducks/builder";
import KTToggle from "../../_assets/js/toggle";
import { toAbsoluteUrl } from "app/utils/index";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { IconButton, Avatar, SwipeableDrawer } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { ReactComponent as CampV } from '../../../img/campV.svg';
import { ReactComponent as AlbumV } from '../../../img/albumV.svg';
import { ReactComponent as DeviceV } from '../../../img/deviceV.svg';
import { ReactComponent as ExitV } from '../../../img/ExitV.svg';

class HeaderMobile extends React.Component {
  toggleButtonRef = React.createRef();
  headerMobileCssClasses = "";
  layoutConfig = this.props.layoutConfig;

  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }

  toggleDrawer = open => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, left: open });
  };

  componentDidMount() {
    new KTToggle(this.toggleButtonRef.current, this.props.toggleOptions);
  }
  get currentUrl() {
    return this.props.location.pathname.split(/[?#]/)[0];
  }
  render() {
    const { headerMobileCssClasses, headerMobileAttributes } = this.props;



    return (
      <div
        id="kt_header_mobile"
        className={`pl-0 kt-header-mobile ${headerMobileCssClasses}`}
        {...headerMobileAttributes}
      >
        <div className="kt-header-mobile__logo">
          <IconButton style={{ height: 50, width: 50, margin: "5px 0 0 5px" }} onClick={() => this.setState({ ...this.state, left: true })} >
            <MenuIcon />
          </IconButton>
        </div>

        {this.currentUrl == "/campaign/new-create" && window.location.hash != "#checkUp" &&
          <h4 className="header-title text-center" style={{ "fontSize": 14 }} >Новая рекламная кампания</h4>
        }
        {this.currentUrl == "/campaign/new-create" && window.location.hash == "#checkUp" &&
          <h4 className="header-title text-center" style={{ "fontSize": 14 }} >Проверка рекламной кампании</h4>
        }

        <div className="kt-header-mobile__toolbar">
          <AccountCircleIcon onClick={e => {
            this.props.setShowDropdown(!this.props.showDropdown);
            //this.props.setOpen(!this.props.open);
          }} />
        </div>

        <SwipeableDrawer
          anchor={"left"}
          open={this.state.left}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div className={'leftMobMenu'}>
            <div className={"align-items-center d-flex"}>
              <img alt="logo" src={toAbsoluteUrl("/media/logos/logo38.png")} style={{ 'width': '38px' }} />
              <h2 className="header-name mt-1p">Sendflips</h2>
              <IconButton className={"ml-auto mt-1p"} onClick={() => this.setState({ ...this.state, left: false })} >
                <MenuOpenIcon style={{ "color": "#757575" }} />
              </IconButton>
            </div>

            <div className={'lbutton mt-3'}>
              <Link to={"/campaign"}
                className={`align-items-center d-flex h-100 w-100 ml-2 ${this.currentUrl == "/campaign" ? "lbuttonA" : ""}`}
                onClick={() => this.setState({ ...this.state, left: false })}
              >
                <div><CampV /></div>
                <div className={"btText"}>Кампании</div>
              </Link>
            </div>

            <div className={'lbutton mt-3'}>
              <Link to={"/md"} className={`align-items-center d-flex h-100 w-100 ml-2 ${this.currentUrl == "/md" ? "lbuttonA" : ""}`}
                onClick={() => this.setState({ ...this.state, left: false })}
              >
                <div><AlbumV /></div>
                <div className={"btText"}>Файлы</div>
              </Link>
            </div>

            <div className={'lbutton mt-3'}>
              <Link to={"/myboards"} className={`align-items-center d-flex h-100 w-100 ml-2 ${this.currentUrl == "/myboards" ? "lbuttonA" : ""}`}
                onClick={() => this.setState({ ...this.state, left: false })}
              >
                <div><DeviceV /></div>
                <div className={"btText"}>Устройства</div>
              </Link>
            </div>

            <div className={'lbutton mt-3'}>
              <Link to={"/goods"} className={`align-items-center d-flex h-100 w-100 ml-2 ${this.currentUrl == "/myboards" ? "lbuttonA" : ""}`}
                onClick={() => this.setState({ ...this.state, left: false })}
              >
                <div><DeviceV /></div>
                <div className={"btText"}>Товары</div>
              </Link>
            </div>

            <div className={'mobMenuAvatar mt-3 ml-2'}>
              <div className={'align-items-center d-flex'}>
                <div><AccountCircleIcon className={'avatarM'} /></div>
                <div className={"btText"}>{!!this.props.user.lastname ? this.props.user.lastname : this.props.user.firstname}</div>
                <div>
                  <Link to={"/logout"}  >
                    <ExitV />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </SwipeableDrawer>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  headerMobileCssClasses: builder.selectors.getClasses(store, {
    path: "header_mobile",
    toString: true
  }),
  headerMobileAttributes: builder.selectors.getAttributes(store, {
    path: "header_mobile"
  }),
  asideDisplay: objectPath.get(
    store.builder.layoutConfig,
    "aside.self.display"
  ),
  toggleOptions: {
    target: "body",
    targetState: "kt-header__topbar--mobile-on",
    togglerState: "kt-header-mobile__toolbar-topbar-toggler--active"
  }
});

export default withRouter(connect(mapStateToProps)(HeaderMobile));
