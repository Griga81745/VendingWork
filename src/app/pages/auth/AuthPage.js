import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Registration from "./Registration";
import RegistrationOwner from "./RegistrationOwner";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
//import { Helmet } from "react-helmet";
//import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/login/login-1.scss";

export default function AuthPage(props) {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          id="kt_login"
          className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1"
        >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">


            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/registration" component={Registration} />
                <Route
                  path="/auth/registrationo"
                  component={RegistrationOwner}
                />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
