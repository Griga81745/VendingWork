import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser } from "../../../crud/local.storage";
import { profile } from "../../../crud/auth.crud";
import * as auth from "../../../store/ducks/auth.duck";

import { Link } from "react-router-dom";
import clsx from "clsx";
import { Formik } from "formik";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  loadingWin: {
    marginBottom: "2rem"
  },
  cards: {
    margin: "10px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center"
  },
  plus: {
    width: "34px",
    height: "34px",
    border: "0.8px solid lightgrey",
    lineHeight: "34px",
    borderRadius: "17px",
    margin: "auto",
    marginTop: "25px"
  },
  add: {
    marginTop: "7px",
    fontSize: "10px !important"
  },
  inputfile: {
    opacity: "0"
  },
  loadButton: {
    width: "150px",
    height: "150px",
    textAlign: "center",
    marginLeft: "10px",
    border: "0.8px solid lightgrey",
    padding: "0 !important"
  },
  loadingWindows: {
    width: "100px"
  }
}));

function ViewTabPassword(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };
  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const [data, setData] = useState({
    email: "",
    newpassword: "",
    password: ""
  });
  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
      text: "Разрешение файла не соответствует выбранным экранам!"
    });
  };
  const saveData = data => {
    let formData = new FormData();
  };
  useEffect(() => {
    setData(getUser());
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        validate={values => {
          const errors = {};

          if (!values.password) {
            errors.password = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            });
          }

          if (!values.email) {
            // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
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

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          enableLoading();
          setTimeout(() => {
            profile(values.email, values.password)
              .then(({ data: { accessToken, status } }) => {
                if (status === "fail") {
                  disableLoading();
                  setSubmitting(false);
                  setStatus("Ошибка, не сохранено");
                } else {
                  disableLoading();
                }
              })
              .catch(err => {
                disableLoading();
                setSubmitting(false);
                setStatus("Ошибка");
              });
          }, 1000);
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
          <form
            noValidate={true}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {status ? (
              <div role="alert" className="alert alert-danger">
                <div className="alert-text">{status}</div>
              </div>
            ) : (
              ""
            )}

            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-8 px-md-0 mt-3">
                    <TextField
                      className="form-control"
                      type="text"
                      fullWidth
                      value={values.newpassword}
                      onBlur={handleBlur}
                      name="newpassword"
                      label="Новый Пароль"
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.newpassword && errors.newpassword}
                      error={Boolean(touched.newpassword && errors.newpassword)}
                    />
                  </div>

                <div className="col-12 col-md-8 px-md-0 mt-4">
                    <TextField
                      className="form-control"
                      type="text"
                      fullWidth
                      onBlur={handleBlur}
                      name="email"
                      defaultValue={values.email}
                      value={values.email}
                      label="Email"
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                <div className="col-12 col-md-8 px-md-0 mt-4">
                    <TextField
                      className="form-control"
                      type="text"
                      fullWidth
                      value={values.password}
                      onBlur={handleBlur}
                      name="password"
                      label="Пароль"
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="col-12 px-0 mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`startButton`}
                      >Сохранить</button>
                  </div>

                </div>
              </div>
          </form>
        )}
      </Formik>
    </>
  );
}
export default injectIntl(connect(null, auth.actions)(ViewTabPassword));
