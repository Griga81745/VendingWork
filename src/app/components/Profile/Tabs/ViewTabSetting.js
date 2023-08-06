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

function ViewTabSetting(props) {
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
    lastname: "",
    firstname: "",
    company: "",
    phone: ""
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
    //let currentUser = JSON.parse(localStorage.getItem("persist:okta"));
    //currentUser = JSON.parse(currentUser['user']);
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh44');
    //console.log(currentUser);
    setData(getUser());
    //getTableData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        validate={values => {
          const errors = {};

          if (!values.lastname) {
            errors.lastname = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            });
          }

          if (!values.firstname) {
            errors.firstname = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            });
          }

          if (!values.company) {
            errors.company = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            });
          }
          if (!values.phone) {
            errors.phone = intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            });
          }

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          enableLoading();
          setTimeout(() => {
            profile(
              values.lastname,
              values.firstname,
              values.company,
              values.phone
            )
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
            //className="kt-form kt-portlet__body"
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
                <div className="col-12 col-md-8 px-md-0 mt-4">
                      <TextField
                        className="form-control"
                        type="text"
                        fullWidth
                        value={values.lastname}
                        onBlur={handleBlur}
                        name="lastname"
                        label="Фамилия"
                        className={'minHeight70'}
                        variant="outlined"
                        onChange={handleChange}
                        helperText={touched.lastname && errors.lastname}
                        error={Boolean(touched.lastname && errors.lastname)}
                      />
                  </div>
                <div className="col-12 col-md-8 px-md-0">
                      <TextField
                        className="form-control"
                        type="text"
                        fullWidth
                        value={values.firstname}
                        onBlur={handleBlur}
                        name="firstname"
                        label="Имя"
                        variant="outlined"
                        className={'minHeight70'}
                        onChange={handleChange}
                        helperText={touched.firstname && errors.firstname}
                        error={Boolean(touched.firstname && errors.firstname)}
                      />
                  </div>

                <div className="col-12 col-md-8 px-md-0">
                      <TextField
                        className="form-control"
                        type="text"
                        fullWidth
                        value={values.company}
                        onBlur={handleBlur}
                        name="company"
                        label="Компания"
                        className={'minHeight70'}
                        variant="outlined"
                        onChange={handleChange}
                        helperText={touched.company && errors.company}
                        error={Boolean(touched.company && errors.company)}
                      />
                  </div>

                  <div className="col-12 col-md-8 px-md-0">
                      <TextField
                          className="form-control"
                          type="text"
                          fullWidth
                          value={values.phone}
                          onBlur={handleBlur}
                          name="phone"
                          label="Телефон"
                          variant="outlined"
                          className={'minHeight70'}
                          onChange={handleChange}
                          helperText={touched.phone && errors.phone}
                          error={Boolean(touched.phone && errors.phone)}
                      />
                  </div>

                  <div className="col-12 px-0">
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
export default injectIntl(connect(null, auth.actions)(ViewTabSetting));
