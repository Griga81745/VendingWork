import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import objectPath from 'object-path';
//import HMenuItem from './HMenuItem';
import * as builder from '../../../ducks/builder';
import { toAbsoluteUrl } from '../../../../app/utils/';
import KTMenu from '../../../_assets/js/menu';
import KTOffcanvas from '../../../_assets/js/offcanvas';
//import MenuIcon from '@material-ui/icons/Menu';
//import {IconButton} from '@material-ui/core';
//import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Box } from "@material-ui/core";
import planogramsLogo from "img/planogramsLogo.svg";
const offcanvasOptions = {
  overlay: true,
  baseClass: 'kt-header-menu-wrapper',
  closeBy: 'kt_header_menu_mobile_close_btn',
  toggleBy: {
    target: 'kt_header_mobile_toggler',
    state: 'kt-header-mobile__toolbar-toggler--active',
  },
};

class HMenu extends React.Component {
  offCanvasCommonRef = React.createRef();
  ktMenuCommonRef = React.createRef();
  //offCanvasCommonRefClose = React.createRef();
  toggler = null;

  getHeaderLogo() {
    let result = 'logo-light.png';
    if (this.props.headerSelfSkin && this.props.headerSelfSkin !== 'dark') {
      result = 'logo-dark.png';
    }
    return toAbsoluteUrl(`/media/logos/${result}`);
  }

  get currentUrl() {
    return this.props.location.pathname.split(/[?#]/)[0];
  }

  componentDidMount() {
    // Canvas
    this.initOffCanvas();
    // Menu
    //this.initKTMenu();
  }

  initOffCanvas = () => {
    // eslint-disable-next-line no-undef
    this.toggler = new KTOffcanvas(this.offCanvasCommonRef.current, offcanvasOptions);
  };

  initKTMenu = () => {
    let menuOptions = {
      submenu: {
        desktop: 'dropdown',
        tablet: 'accordion',
        mobile: 'accordion',
      },
      accordion: {
        slideSpeed: 200, // accordion toggle slide speed in milliseconds
        expandAll: false, // allow having multiple expanded accordions in the menu
      },
      dropdown: {
        timeout: 50,
      },
    };

    let menuDesktopMode = 'accordion';
    if (this.ktMenuCommonRef.current.getAttribute('data-ktmenu-dropdown') === '1') {
      menuDesktopMode = 'dropdown';
    }

    if (typeof objectPath.get(menuOptions, 'submenu.desktop') === 'object') {
      menuOptions.submenu.desktop = {
        default: menuDesktopMode,
      };
    }

    // eslint-disable-next-line no-undef
    new KTMenu(this.ktMenuCommonRef.current, menuOptions);
  };

  render() {
    const {
      user,
      disabledAsideSelfDisplay,
      ktMenuClasses,
      ulClasses,
      rootArrowEnabled,
      currentUser,
    } = this.props;
    const items = this.props.menuConfig.header.items;
    //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
      <>
        <button
          className="kt-header-menu-wrapper-close"
          id="kt_header_menu_mobile_close_btn"
          ref={this.offCanvasCommonRefClose}>
          <i className="la la-close" />
        </button>
        <div
          className={`kt-header-menu-wrapper ${this.props.openLeftM ? "openM" : ""}`}
          id="kt_header_menu_wrapper"
          ref={this.offCanvasCommonRef}
        >

          <img alt="logo" src={toAbsoluteUrl("/media/logos/logo38.png")} style={{ width: 38, height: 38, margin: '11px 0px 17px 17px' }} />

          <div className={'lbutton ff ml-4'}>
            {this.currentUrl == "/campaign" && <div className={"lbIn"}></div>}
            <Link to={"/campaign"} className={`align-items-center d-flex h-100 ${this.currentUrl == "/campaign" ? "lbuttonA" : ""}`} >
              <Box fontSize={16} className={"mt-1"}>Кампании</Box>
            </Link>
          </div>

          <div className={'lbutton ml-4 ff'}>
            {this.currentUrl == "/md" && <div className={"lbIn"}></div>}
            <Link to={"/md"} className={`align-items-center d-flex h-100 ${this.currentUrl == "/md" ? "lbuttonA" : ""}`} >
              <Box fontSize={16} className={"mt-1"} >Файлы</Box>
            </Link>
          </div>

          <div className={'lbutton ml-4 ff'}>
            {this.currentUrl == "/myboards" && <div className={"lbIn"}></div>}
            <Link to={"/myboards"} className={`align-items-center d-flex h-100 ${this.currentUrl == "/myboards" ? "lbuttonA" : ""}`} >
              <Box fontSize={16} className={"mt-1"} >Устройства</Box>
            </Link>
          </div>

          <div className={'lbutton ml-4 ff'}>
            {this.currentUrl == "/goods" && <div className={"lbIn"}></div>}
            <Link to={"/planograms"} className={`align-items-center d-flex h-100 ${this.currentUrl == "/goods" ? "lbuttonA" : ""}`} >
              <Box fontSize={16} className={"mt-1"} ><img src={planogramsLogo} alt="Planograms"/></Box>
            </Link>
          </div>

          {this.currentUrl == "/campaign/new-create" && window.location.hash != "#checkUp" &&
            <h4 className="header-title">Новая рекламная кампания</h4>
          }
          {this.currentUrl == "/campaign/new-create" && window.location.hash == "#checkUp" &&
            <h4 className="header-title">Проверка рекламной кампании</h4>
          }

        </div>
      </>
    );
  }
}

//const mapStateToProps1 = ({ auth: { user } }) => ({
//  user
//});

const mapStateToProps = (store) => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser,
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  ktMenuClasses: builder.selectors.getClasses(store, {
    path: 'header_menu',
    toString: true,
  }),
  rootArrowEnabled: builder.selectors.getConfig(store, 'header.menu.self.root-arrow'),
  headerSelfSkin: builder.selectors.getConfig(store, 'header.self.skin'),
  ulClasses: builder.selectors.getClasses(store, {
    path: 'header_menu_nav',
    toString: true,
  }),
  disabledAsideSelfDisplay:
    objectPath.get(store.builder.layoutConfig, 'aside.self.display') === false,
});

export default withRouter(connect(mapStateToProps)(HMenu));
