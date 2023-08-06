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

const ViewTabExpense = props => {
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
                <div className="alert-text">В разработке</div>
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewTabExpense;
