import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { avatar } from "../../../crud/auth.crud";
import { getUser } from "../../../crud/local.storage";

const ViewTabSetting = props => {
  const path_ava =
    process.env.REACT_APP_MY_HOST_CREATIVE + `/avatar/${getUser().id}/thumb`;
  const [imgUrl, setImgUrl] = useState(
    process.env.REACT_APP_MY_HOST_CREATIVE + `/avatar/boy-256.png`
  );

  useEffect(() => {
    let av = getUser().pic;
    if (!!av && av !== null) {
      setImgUrl(path_ava + av);
    }
  }, []);

  const getError = data => {
    Swal.fire({
      title: data.title,
      text: data.desc
    });
  };

  const uploadNewAvatar = file => {
    let formData = new FormData();
    formData.append("path", file);
    avatar(formData)
      .then(res => {
        if (res.data.status === "fail") {
          getError({ title: "Ошибка!", desc: "Загрузка файла не удалась" });
        } else {
          setImgUrl(path_ava + res.data.path);
        }
      })
      .catch(error => {
        console.log(error);
        getError({ title: "Ошибка!", desc: "Загрузка файла не удалась!" });
      });
  };

  const handleChangeFile = file => {
    // let file = event.target.files[0]
    console.log(file.type);
    if (
      file.type == "image/jpeg" ||
      file.type == "image/jpg" ||
      file.type == "images/png" ||
      file.type == "images/gif"
    ) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width < 700 && image.height < 700) {
          uploadNewAvatar(file);
          setImgUrl(image.src);
        } else {
          getError({ title: "Ошибка!", desc: "Неверный размер" });
        }
        // console.log(image.width, image.height, resolution)
      };
    } else {
      getError({ title: "Ошибка!", desc: "Неверный тип файла" });
    }
  };

  return (
    <>
      <form className="container-fluid">
            <div className="row">
              <div className="col-12 mt-4">
                <div
                  className={`kt-avatar kt-avatar--outline ${
                    imgUrl !== "" ? "kt-avatar--changed" : ""
                  }`}
                >
                  <div
                    className="kt-avatar__holder"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                  ></div>
                  <label className="kt-avatar__upload">
                    <i className="fa fa-pen"></i>
                    <input
                      type="file"
                      name="profile_avatar"
                      accept=".mp4, .jpg, .jpeg"
                      onChange={e => handleChangeFile(e.target.files[0])}
                    />
                  </label>
                  <span className="kt-avatar__cancel">
                    <i className="fa fa-times"></i>
                  </span>
                </div>
                <span className="form-text text-muted fS14">
                  Разрешены типы файлов: png, jpg, jpeg.
                </span>
                <span className="form-text text-muted fS14">
                  Максимальный размер файла 700px на 700px.
                </span>
              </div>
            </div>
      </form>
    </>
  );
};

export default ViewTabSetting;
