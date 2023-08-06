import React, { useState } from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Topbar from "./Topbar";
import HMenu from "./HMenu/HMenu";
import AnimateLoading from "../../../app/partials/layout/AnimateLoading";
import KTHeader from "../../_assets/js/header";
import * as builder from "../../ducks/builder";
//import { FormControl } from "react-bootstrap";
//import { InputAdornment, OutlinedInput, Box } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
//import { toAbsoluteUrl } from "../..";
//import { IconButton } from "@material-ui/core";
//import MenuOpenIcon from '@material-ui/icons/MenuOpen';
//import AirplayIcon from '@material-ui/icons/Airplay';

//import { ReactComponent as CampV } from '../../../img/campV.svg';
//import { ReactComponent as AlbumV } from '../../../img/albumV.svg';
//import { ReactComponent as DeviceV } from '../../../img/deviceV.svg';

class Header extends React.Component {
  headerCommonRef = React.createRef();

  componentDidMount() {
    let options = {};
    if (
      this.headerCommonRef.current.getAttribute("data-ktheader-minimize") ===
      "1"
    ) {
      options["minimize.desktop.on"] = "kt-header--minimize";
      options["offset.desktop"] = 130;
    }

    // eslint-disable-next-line no-undef
    new KTHeader(this.headerCommonRef.current, options);
  }

  get currentUrl() {
    return this.props.location.pathname.split(/[?#]/)[0];
  }

  render() {
    const {
      menuHeaderDisplay,
      headerAttributes,
      headerClasses,
      innerRef
    } = this.props;
    return (
      <>
        <div
          className={`kt-header kt-grid__item ${headerClasses}`}
          id="kt_header"
          ref={this.headerCommonRef}
          {...headerAttributes}
        >
          <AnimateLoading />
          {/* <!-- begin: Header Menu --> */}
          {menuHeaderDisplay && <HMenu setOpenLeftM={this.props.setOpenLeftM} openLeftM={this.props.openLeftM} />}
          {/* <!-- end: Header Menu --> */}
          {/* <!-- begin:: Header Topbar --> */}
          {/* <!-- empty div to fix topbar to stay on the right when menu-horizontal is hidden --> */}
          {!menuHeaderDisplay && <div />}
          <Topbar setOpen={this.props.setOpen} open={this.props.open} showDropdown={this.props.showDropdown} setShowDropdown={this.props.setShowDropdown} />
          {/* <!-- end:: Header Topbar --> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  headerAttributes: builder.selectors.getAttributes(store, { path: "header" }),
  headerClasses: builder.selectors.getClasses(store, {
    path: "header",
    toString: true
  }),
  menuHeaderDisplay: objectPath.get(
    store.builder.layoutConfig,
    "header.menu.self.display"
  ),
  fluid:
    objectPath.get(store.builder.layoutConfig, "header.self.width") === "fluid"
});

export default withRouter(connect(mapStateToProps)(Header));
