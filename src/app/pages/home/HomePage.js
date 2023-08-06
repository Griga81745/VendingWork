import React, { Suspense, lazy, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Media from "./Media";
import Planograms from "./Planograms";
import MediaView from "../../components/ViewMedia/";
import * as auth from "../../store/ducks/auth.duck";
import Profile from "./Profile";
import View from "../../components/ViewFolder/";
import DeviceView from "../../components/DeviceView/";
import Wizard from "../../components/WizardFolder/";
import Campaign from "./Campaign";
import CreateCampaign from "../../components/CreateCampaign/";
import CreateDevice from "../../components/CreateDevice/";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import Devices from "./Devices";
import fire from "../../../fire";
import { connect } from "react-redux";
import PlanogramsSetting from "./PlanogramsSetting";

// const GoogleMaterialPage = lazy(() => import('./google-material/GoogleMaterialPage'));
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

var jwt = require('jsonwebtoken');

function HomePage(props) {


  useEffect(() => {
    const interval = setInterval(async () => {

      var decodedToken = jwt.decode(props.authTokenG, { complete: true });
      var dateNow = new Date();


      console.log("uuuusseeerrrrrrH decodedToken cgeckkk")
      console.log(decodedToken.payload.exp)
      console.log(Math.floor(dateNow.getTime() / 1000))

      if ((decodedToken.payload.exp + 120) < Math.floor(dateNow.getTime() / 1000)) {
        let user = fire.auth().currentUser;
        if (user) await user.getIdToken(true);
        console.log("uuuusseeerrrrrrH decodedTokendecodedTokendecodedToken -- iiii0000000")
      }
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return fire.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();

        user.getIdToken().then(function (idToken) {  // <------ Check this line
          console.log("uuuusseeerrrrr -- onIdTokenChanged")
          console.log(idToken)
          props.updateUid(idToken);

        });
      }
    });
  }, []);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/campaign" />
        }
        {/*<Route exact path="/planograms/view/:id" component={MediaView} />*/}
        <Route exact path="/planograms/view/test" component={PlanogramsSetting} />
        <Route path="/planograms" component={Planograms} />

        <Route exact path="/md/view/:id" component={MediaView} />
        <Route path="/md" component={Media} />

        <Route path="/profile" component={Profile} />

        <Route exact path="/campaign/new-create/:id?" component={CreateCampaign} />
        <Route exact path="/campaign/view/:id" component={View} />
        <Route exact path="/campaign" component={Campaign} />

        <Route exact path="/wizard/:id" component={Wizard} />

        <Route path="/myboards/add/:id?" component={CreateDevice} />
        <Route exact path="/myboards/view/:id" component={DeviceView} />
        <Route path="/myboards" component={Devices} />

        <Route path="/docs" component={DocsPage} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = store => ({
  authTokenG: store.auth.authTokenG,
});

export default connect(mapStateToProps, auth.actions)(HomePage);
