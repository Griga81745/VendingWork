import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";

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

const ViewTabPassword = props => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState([]);

  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
      text: "Разрешение файла не соответствует выбранным экранам!"
    });
  };

  const uploadNewAvatar = file => {
    let formData = new FormData();
    formData.append("file", file);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    axios
      .post(
        `http://okta.ru/creative/upload-creative-all-group?subuser=${currentUser.id}`,
        formData
      )
      .then(res => {
        //setAvatar(res.data.file);
      })
      .catch(console.error);
  };

  const handleChangeFile = (file, resolution) => {
    // let file = event.target.files[0]
    if (
      file.type == "video/jpg" ||
      file.type == "video/png" ||
      file.type == "video/gif"
    ) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (`${image.width}x${image.height}` === resolution) {
          // props.setFiles(file)
          props.uploadNewAlbum(file);
          setImgUrl([...imgUrl, image.src]);
        } else {
          getError();
        }
        // console.log(image.width, image.height, resolution)
      };
    } else {
      getError();
    }
  };

  return (
    <>
      <div className="kt-portlet__head">
        <div className="kt-portlet__head-label">
          <h3 className="kt-portlet__head-title">Доход аккаунта</h3>
        </div>
      </div>
      <form className="kt-form kt-form--label-right">
        <div className="kt-portlet__body">
          <div className="kt-section kt-section--first">
            <div className="kt-section__body">
              <div
                className="alert alert-solid-danger alert-bold fade show kt-margin-t-20 kt-margin-b-40"
                role="alert"
              >
                <div className="alert-icon">
                  <i className="fa fa-exclamation-triangle"></i>
                </div>
                <div className="alert-text">
                  Configure user passwords to expire periodically. Users will
                  need warning that their passwords are going to expire, <br />
                  or they might inadvertently get locked out of the system!
                </div>
                <div className="alert-close">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <i className="la la-close"></i>
                    </span>
                  </button>
                </div>
              </div>

              <div className="row">
                <label className="col-xl-3"></label>
                <div className="col-lg-9 col-xl-6">
                  <h3 className="kt-section__title kt-section__title-sm">
                    Поменяйте или восстановите Ваш пароль:
                  </h3>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Current Password
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="password"
                    className="form-control"
                    value=""
                    placeholder="Current password"
                  />
                  <a
                    href="#"
                    className="kt-link kt-font-sm kt-font-bold kt-margin-t-5"
                  >
                    Forgot password ?
                  </a>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  New Password
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="password"
                    className="form-control"
                    value=""
                    placeholder="New password"
                  />
                </div>
              </div>
              <div className="form-group form-group-last row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Verify Password
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="password"
                    className="form-control"
                    value=""
                    placeholder="Verify password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kt-portlet__foot">
          <div className="kt-form__actions">
            <div className="row">
              <div className="col-lg-3 col-xl-3"></div>
              <div className="col-lg-9 col-xl-9">
                <button type="reset" className="btn btn-success">
                  Submit
                </button>
                &nbsp;
                <button type="reset" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewTabPassword;
