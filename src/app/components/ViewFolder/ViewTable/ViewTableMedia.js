import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AlbumModal from "../../common/AlbumModal";
import SlidesBlock from "./SlidesBlock";
import InputFileComponent from "../../common/InputFileComponent";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  selectButton: {
    margin: `${theme.spacing(4)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  },
  mainArea: {
    margin: `${theme.spacing(4)}px`
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
  loadButton: {
    width: "150px",
    height: "150px",
    textAlign: "center",
    marginLeft: "10px",
    border: "0.8px solid lightgrey",
    padding: "0 !important"
  },
  block: {
    margin: `${theme.spacing(2)}px ${theme.spacing(12)}px ${theme.spacing(
      4
    )}px ${theme.spacing(6)}px`
  },
  saveBotton: {
    margin: `${theme.spacing(2)}px ${theme.spacing(12)}px ${theme.spacing(
      4
    )}px ${theme.spacing(6)}px`
  }
}));

const ViewTableMedia = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resolutions, setResolutions] = useState([]);
  const [errorModal, setOpenErrorModal] = useState(true);
  const [approveGetData, setApproveGetData] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [error, setError] = useState(true);
  // const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => () => setApproveGetData(false), []);

  useEffect(() => {
    //window.scrollTo(0, 0);

    let newFiles = Object.keys(props.creatives).map(
      key => props.creatives[key]
    );
    // console.log(newFiles);

    setSelectedFiles([...selectedFiles, ...newFiles]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!!props.choosedBoards.length) {
      getAlbums();
      setApproveGetData(true);
      setResolutions(props.choosedBoards.map(i => i.resolution));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.choosedBoards]);

  const uniqueRes = new Set(resolutions);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };
  const getAlbums = async () => {
    try {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let albums = await axios.get(
        `/creative-group?page=${currentPage}&subuser=${currentUser.id}`
      );
      setAlbums(albums.data);
    } catch (e) {
      console.error(e);
    }
  };
  const uploadNewAlbum = file => {
    let formData = new FormData();
    formData.append("file", file);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    axios
      .post(
        `/creative/upload-creative-all-group?subuser=${currentUser.id}`,
        formData
      )
      .then(res => {
        props.setPictures(res.data.file);
        uploadNewFile(res.data.file);
      })
      .catch(console.error);
  };
  const uploadNewFile = file =>
    setSelectedFiles([
      ...selectedFiles,
      {
        ...file,
        active: "0",
        position: selectedFiles.length + 1
      }
    ]);
  const setFiles = files => {
    files.forEach(file => props.setPictures(file));
    files[files.length - 1].active = "0";
    files[files.length - 1].position = `${files.length}`;
    setSelectedFiles(files);
  };
  const remooveFile = file => {
    let arrayCopy = [...selectedFiles];
    let active = 0;
    arrayCopy.find(item => {
      active += Number(item.active);
      return false;
    });
    arrayCopy.find(item => {
      if (item.id === file.id) {
        if (item.active === "1" && active > 1) {
          item.active = "0";
        } else {
          item.active = "1";
        }
        return true;
      }
      console.log(arrayCopy);
      return false;
    });
    setSelectedFiles(arrayCopy);
  };
  const changeActiveFile = file => {
    let arrayCopy = [...selectedFiles];
    let active = 0;
    arrayCopy.find(item => {
      active += Number(item.active);
      return false;
    });
    console.log(file);
    let changed = arrayCopy.find(item => {
      if (item.id === file.id) {
        if (item.active === "1" && active > 1) {
          item.active = "0";
          return true;
        } else if (item.active === "0") {
          item.active = "1";
          return true;
        } else {
          return false;
        }
      }
      return false;
    });
    if (changed) {
      setSelectedFiles(arrayCopy);
      saveCreativesChanges();
    } else {
      errorCreativeStatus();
    }
  };
  const errorCreativeStatus = () => {
    Swal.fire({
      title: "Ошибка!",
      icon: "error",
      text: "Нельзя изменить настройки креатива!"
    });
  };
  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
      text: "Разрешение файла не соответствует выбранным экранам!"
    });
  };

  const countScreens = (screens, currentElement) => {
    let counter = 0;
    screens.forEach(element => {
      if (element === currentElement) {
        counter += 1;
      }
    });
    return counter;
  };

  const replaceFiles = (file, action) => {
    const fileIndex = selectedFiles.indexOf(file);
    const swap = (a, b) => {
      const newArray = [...selectedFiles];
      newArray[a] = newArray.splice(b, 1, newArray[a])[0];
      return newArray;
    };

    switch (action) {
      case "increment": {
        if (fileIndex !== 0) {
          setSelectedFiles(swap(fileIndex, fileIndex - 1));
        }

        break;
      }
      case "decrement": {
        if (fileIndex !== selectedFiles.length - 1) {
          setSelectedFiles(swap(fileIndex, fileIndex + 1));
        }
        break;
      }
      default:
        break;
    }
  };
  const saveCreativesChanges = () => {
    let creatives = {};
    selectedFiles.forEach(item => {
      creatives[item.id] = {
        id: item.id,
        active: item.active,
        position: item.position
      };
    });
    let formData = new FormData();
    formData.append("creatives", JSON.stringify(creatives));
    axios.post(
      `/campaign/update-creative?id=${props.id}&subuser=${
        JSON.parse(localStorage.getItem("currentUser")).id
      }`,
      formData
    );
    props.getTableData(1);
  };
  const [imgUrl, setImgUrl] = useState([]);
  const handleChangeFile = (file, resolution) => {
    // let file = event.target.files[0]
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        console.log(`${image.width}x${image.height}`);
        if (`${image.width}x${image.height}` === resolution) {
          // props.setFiles(file)
          uploadNewAlbum(file);
          setImgUrl([...imgUrl, image.src]);
        } else {
          getError();
        }
        // console.log(image.width, image.height, resolution)
      };
    } else {
      uploadNewAlbum(file);
    }
  };
  let fileInput = null;

  return (
    <>
      {!!resolutions.length &&
        Array.from(uniqueRes).map((i, ndx) => {
          return (
            <div className="kt-portlet">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">Креативы {i}</h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                  <button
                    className="btn btn-secondary btn-sm btn-bold btn-font-md"
                    onClick={() => fileInput.click()}
                  >
                    <i className="flaticon2-plus"></i>
                    Добавить файлы
                  </button>
                  <input
                    style={{ opacity: "0", width: "0.5px", height: "0.5px" }}
                    type="file"
                    ref={input => (fileInput = input)}
                    accept=".mp4, .jpg, .jpeg"
                    // onClick={e => props.uploadNewAlbum(e)}
                    onChange={e => handleChangeFile(e.target.files[0], i)}
                  />
                </div>
              </div>
              <div className="kt-portlet__body kt-portlet__body--fit">
                <SlidesBlock
                  replaceFiles={replaceFiles}
                  remooveFile={remooveFile}
                  changeActiveFile={changeActiveFile}
                  uploadNewAlbum={uploadNewAlbum}
                  resolutions={i}
                  setFiles={setFiles}
                  selectedFiles={selectedFiles}
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ViewTableMedia;
