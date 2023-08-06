import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../../store/ducks/auth.duck";
import fire from "../../../fire";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

function Login(props) {
  const { history } = props;

  useEffect(() => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(function (idToken) {  // <------ Check this line
          props.login(user, idToken, history);
        });
      }
    })
  }, []);

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="mb-4 text-center">
            <h5>Вход / Регистрация</h5>
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
        </div>
      </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));