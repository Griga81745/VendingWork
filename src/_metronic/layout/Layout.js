import React, { useState } from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import { withRouter } from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
// import AsideLeft from './aside/AsideLeft';
// import StickyToolbar from '../../app/partials/layout/StickyToolbar';
import Footer from "./footer/Footer";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import KtContent from "./KtContent";
import QuickPanel from "../../app/partials/layout/QuickPanel";
import "./assets/Base.scss";
import { Hidden } from "@material-ui/core";

const htmlClassService = new HTMLClassService();

function Layout({
  children,
  asideDisplay,
  subheaderDisplay,
  selfLayout,
  layoutConfig
}) {
  htmlClassService.setConfig(layoutConfig);

  // scroll to top after location changes
  //window.scrollTo(0, 0);
  const [open, setOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openLeftM, setOpenLeftM] = useState(false);
  const contentCssClasses = htmlClassService.classes.content.join(" ");

  return <LayoutInitializer
    styles={[]}
    menuConfig={MenuConfig}
    layoutConfig={LayoutConfig}
    htmlClassService={htmlClassService}
  >
    {/* <!-- begin:: Header Mobile --> */}
    <Hidden only={["lg", "xl"]}>
      <HeaderMobile setOpen={setOpen} open={open} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
    </Hidden>

    <Hidden only={["xs"]}>
      <Header openLeftM={openLeftM} setOpenLeftM={setOpenLeftM} setOpen={setOpen} open={open} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
    </Hidden>

    <KtContent openLeftM={openLeftM} setOpenLeftM={setOpenLeftM}>{children}</KtContent>

  </LayoutInitializer>
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display")
});

export default withRouter(connect(mapStateToProps)(Layout));
