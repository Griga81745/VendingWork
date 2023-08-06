import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles, useTheme
} from "@material-ui/core";

import { Modal } from "react-bootstrap";

import * as auth from "../../store/ducks/auth.duck";
import { registerOwner } from "../../crud/auth.crud";
const useStyles = makeStyles({
  root: {
    background: "rgba(0,0,0,0.5)!important"
  }
});

function RegistrationOwner(props) {
  const { intl } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //const handleClickOpen = () => {
  //   setOpen(true);
  //};
  //const handleClose = () => {
  //  setOpen(false);
  //};
  const [openSL, setOpenSL] = React.useState(false);

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title mb-0">
          <h3>
            <FormattedMessage id="AUTH.REGISTER.OWNER" />
          </h3>
        </div>

        <Formik
          initialValues={{
            email: "",
            company: "",
            firstname: "",
            lastname: "",
            password: "",
            tel: "",
            acceptTerms: true,
            confirmPassword: ""
          }}
          validate={values => {
            const errors = {};

            if (!values.email) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_FIELD"
              });
            }

            if (!values.firstname) {
              errors.firstname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.lastname) {
              errors.lastname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.company) {
              errors.company = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }
            if (!values.tel) {
              errors.tel = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.password) {
              errors.password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
            registerOwner(
              values.email,
              values.firstname,
              values.company,
              values.lastname,
              values.password,
              values.tel
            )
              .then(({ data: { accessToken, status, response, error } }) => {
                if (status == "fail") {
                  if (error.email == "email_used") {
                    setStatus("Неверный Email");
                  }
                } else if (status == "ok") {
                  resetForm();
                  if (response == "wait_activated") {
                    setOpen(true);
                  } else if (response == "start_login") {
                    setOpenSL(true);
                  }
                } else {
                  props.register(accessToken);
                }
              })
              .catch(() => {
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN"
                  })
                );
              });
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label=<FormattedMessage id="AUTH.INPUT.SURNAME" />
                  className="kt-width-full"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  helperText={touched.lastname && errors.lastname}
                  error={Boolean(touched.lastname && errors.lastname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label=<FormattedMessage id="AUTH.INPUT.NAME" />
                  className="kt-width-full"
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  helperText={touched.firstname && errors.firstname}
                  error={Boolean(touched.firstname && errors.firstname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label=<FormattedMessage id="AUTH.GENERAL.CAMP" />
                  className="kt-width-full"
                  name="company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company}
                  helperText={touched.company && errors.company}
                  error={Boolean(touched.company && errors.company)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label=<FormattedMessage id="AUTH.GENERAL.TEL" />
                  className="kt-width-full"
                  name="tel"
                  type="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tel}
                  helperText={touched.tel && errors.tel}
                  error={Boolean(touched.tel && errors.tel)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  label="Email"
                  margin="normal"
                  className="kt-width-full"
                  name="email"
                  autoComplete="new-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  type="password"
                  margin="normal"
                  label=<FormattedMessage id="AUTH.INPUT.PASSWORD" />
                  className="kt-width-full"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                />
              </div>

              <div className="form-group">
                <TextField
                  type="password"
                  margin="normal"
                  label=<FormattedMessage id="AUTH.INPUT.CONFIRM_PASSWORD" />
                  className="kt-width-full"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                />
              </div>

              <div className="form-group mb-0">
                <FormControlLabel
                  label={
                    <>
                      Я принимаю{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Условия использования.
                      </Link>
                    </>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      name="acceptTerms"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.acceptTerms}
                    />
                  }
                />
              </div>

              <div className="kt-login__actions">
                <Link to="/auth">
                  <button
                    type="button"
                    className="btn btn-secondary btn-elevate kt-login__btn-secondary"
                  >
                    <FormattedMessage id="AUTH.GENERAL.BACK_BUTTON" />
                  </button>
                </Link>

                <button
                  disabled={isSubmitting || !values.acceptTerms}
                  className="btn btn-primary btn-elevate kt-login__btn-primary"
                >
                  <FormattedMessage id="AUTH.GENERAL.SUBMIT_SIGN_UP" />
                </button>
              </div>
            </form>
          )}
        </Formik>

        <div className="kt-login__divider">
          <div className="kt-divider">
            <span />
            <span>
              <FormattedMessage id="AUTH.GENERAL.OR" />
            </span>
            <span />
          </div>

          <div className="text-center kt-login__head">
            <Link to="/auth/login" className="kt-link mt-4 d-block">
              У меня есть аккаунт, войти
            </Link>
            <Link to="/auth/registration" className="kt-link mt-4 d-block">
              Зарегистрироваться рекламодателем
            </Link>
            <Link to="/auth/radio" className="kt-link mt-4">
              Зарегистрировать радио
            </Link>
          </div>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="responsive-dialog-title"
          BackdropProps={{
            classes: {
              root: classes.root
            }
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Вы успешно зарегестрировались"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Пожалуйста подождите, мы должны активировать Ваш аккаунт
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
            >
              Понял
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          open={openSL}
          onClose={() => {
            setOpenSL(false);
          }}
          aria-labelledby="responsive-dialog-title"
          BackdropProps={{
            classes: {
              root: classes.root
            }
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Вы успешно зарегистрировались"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cейчас Вы автоматически залогинитесь и попадёте на сайт
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenSL(false);
              }}
              color="primary"
              autoFocus
            >
              Понял
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(RegistrationOwner));
