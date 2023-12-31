import React from "react";
// import SearchDropdown from '../../../app/partials/layout/SearchDropdown';
// import UserNotifications from '../../../app/partials/layout/UserNotifications';
// import MyCart from '../../../app/partials/layout/MyCart';
// import QuickActionsPanel from '../../../app/partials/layout/QuickActionsPanel';
// import QuickPanelToggler from './QuickPanelToggle';
// import LanguageSelector from '../../../app/partials/layout/LanguageSelector';
// import { toAbsoluteUrl } from '../../utils/utils';
import UserProfile from "../../../app/partials/layout/UserProfile";

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">
        {/* <SearchDropdown icon="flaticon2-search-1" />

        <UserNotifications
          skin="light"
          iconType=""
          icon="flaticon2-bell-alarm-symbol"
          type="primary"
          dot="false"
        />

        <QuickActionsPanel
          bgImage={toAbsoluteUrl("/media/misc/bg-2.jpg")}
          skin="light"
          iconType=""
          gridNavSkin="light"
          icon="flaticon2-gear"
        />

        <MyCart
          iconType=""
          skin="light"
          icon="flaticon2-shopping-cart-1"
          bgImage={toAbsoluteUrl("/media/misc/bg-1.jpg")}
        />

        <LanguageSelector iconType="" /> */}

        <UserProfile
          showAvatar={false}
          showHi={true}
          setOpen={this.props.setOpen}
          open={this.props.open}
          showDropdown={this.props.showDropdown}
          setShowDropdown={this.props.setShowDropdown}
        />
      </div>
    );
  }
}
