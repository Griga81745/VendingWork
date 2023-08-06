/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import { withRouter, Link } from "react-router-dom";
import { QuickActions } from "./components/QuickActions";
import * as builder from "../../ducks/builder";
import { LayoutContextConsumer } from "../LayoutContext";
import BreadCrumbs from "./components/BreadCrumbs";

class SubHeader extends React.Component {
  render() {
    const {
      subheaderCssClasses,
      subheaderContainerCssClasses,
      subheaderMobileToggle
    } = this.props;
    const today = new Date();
    const short_months = dt => {
      Date.shortMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return Date.shortMonths[dt.getMonth()];
    };

    return (
      <LayoutContextConsumer>
        {({ subheader: { title } }) =>
          !!title && (
            <div
              id="kt_subheader"
              className={`kt-subheader ${subheaderCssClasses} kt-grid__item`}
            >
              <div className={`kt-container ${subheaderContainerCssClasses}`}>
                <div className="kt-subheader__main">
                  {subheaderMobileToggle && (
                    <button
                      className="kt-subheader__mobile-toggle kt-subheader__mobile-toggle--left"
                      id="kt_subheader_mobile_toggle"
                    >
                      <span />
                    </button>
                  )}

                  <LayoutContextConsumer>
                    {/*{({ subheader: { title, breadcrumb } }) => (*/}
                    {({ subheader: { title, subtitle } }) => (
                      <>
                        <h3 className="kt-subheader__title">{title}</h3>
                        {subtitle && (
                          <>
                            <span className="kt-subheader__separator kt-subheader__separator--v" />
                            <span className="kt-subheader__desc">
                              {subtitle}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </LayoutContextConsumer>

                  <span className="kt-subheader__separator kt-subheader__separator--v" />
                  <LayoutContextConsumer>
                    {({ subheader: { title } }) =>
                      title === "Устройства" ? (
                        <Link className="btn btn-brand" to="#">
                          <i className="flaticon2-plus" /> Добавить экран
                        </Link>
                      ) : (
                        <Link
                          className="btn btn-brand"
                          to="/campaign/new-create"
                        >
                          <i className="flaticon2-plus" /> Создать кампанию
                        </Link>
                      )
                    }
                  </LayoutContextConsumer>
                </div>
              </div>
            </div>
          )
        }
      </LayoutContextConsumer>
    );
  }
}

const mapStateToProps = store => ({
  subheaderCssClasses: builder.selectors.getClasses(store, {
    path: "subheader",
    toString: true
  }),
  subheaderContainerCssClasses: builder.selectors.getClasses(store, {
    path: "subheader_container",
    toString: true
  }),
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  subheaderMobileToggle: objectPath.get(
    store.builder.layoutConfig,
    "subheader.mobile-toggle"
  )
});

export default withRouter(connect(mapStateToProps)(SubHeader));
