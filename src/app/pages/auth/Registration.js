import React, { useEffect, useState } from "react";
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
  makeStyles, MenuItem, useTheme, Select, FormControl, InputLabel
} from "@material-ui/core";
//import { } from "@material-ui/core/styles";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";
const useStyles = makeStyles({
  root: {
    background: "rgba(0,0,0,0.5)!important"
  }
});

function Registration(props) {
  const { intl, history } = props;
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [openSL, setOpenSL] = React.useState(false);
  const [akkType, setAkkType] = React.useState('');

  useEffect(() => {
    console.log("uuuusseeerrrrr--Registration ")
  }, []);

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title mb-0">
          <h5>Регистрация</h5>
        </div>

        <Formik
          initialValues={{
            role: "",
            camp: "",
            tel: "",
            acceptTerms: true,
          }}
          validate={values => {
            const errors = {};

            console.log('validate --- 113333')
            console.log(values)

            if (!values.role) {
              errors.role = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.camp) {
              errors.camp = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.tel) {
              errors.tel = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
            register(
              values.role,
              values.camp,
              values.tel
            )
              .then(({ data: { accessToken, status, response, error } }) => {
                if (status == "fail") {
                  if (error.email == "email_used") {
                    setStatus("Ошибка");
                  }
                } else if (status == "ok") {
                  resetForm();
                  history.push("/campaign");
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

              <div className={"form-group mb-0"}>
                <FormControl className={'w-100'}>
                  <InputLabel id="demo-simple-select-label">Тип аккаунта</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    name="role"
                    type="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    helperText={touched.role && errors.role}
                    error={Boolean(touched.role && errors.role)}
                  >
                    <MenuItem value={"user"}>Рекламодатель</MenuItem>
                    <MenuItem value={"owner"}>Собственник</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label=<FormattedMessage id="AUTH.GENERAL.CAMP" />
                  className="kt-width-full"
                  name="camp"
                  type="camp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.camp}
                  helperText={touched.camp && errors.camp}
                  error={Boolean(touched.camp && errors.camp)}
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


              <div className="form-group mb-0 mt-2">
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
                <Link to="/logout">
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
              Ok
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
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
