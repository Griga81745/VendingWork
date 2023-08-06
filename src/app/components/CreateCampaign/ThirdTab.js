import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  makeStyles, Collapse,
  Typography,
  useMediaQuery, useTheme, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel
} from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import SlideItem from "../common/SlideItem";
import ThirdTabLoadingWindow from "./ThirdTabLoadingWindow";
import ThirdTabLoadingRadio from "./ThirdTabLoadingRadio";
import AlbumModal from "../common/AlbumModal";


import Swal from "sweetalert2";
// import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import FormHelperText from "@material-ui/core/FormHelperText";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SlidesBlock from "./SlidesBlock";

const useStyles = makeStyles(theme => ({
  tabContainer: {
    padding: "52px 78px 78px 78px"
  },
  tabHeader: {
    fontSize: "13px",
    color: '#78909C',
    padding: '0px 16px 5px 0',
    fontFamily: "GilroyRegular,Ubuntu,Nunito,Roboto !important"
  },
  inputsContainer: {
    padding: `0 0 0 ${theme.spacing(4)}px`
  },
  rootTableRow: {
    height: '48px',
    '& > *': {
      borderBottom: 'unset',
    },
  },
  selectButton: {
    margin: `0 0 0 ${theme.spacing(5)}px`,
    border: "1px solid #1dc9b7",
    backgroundColor: "#ffffff",
    color: "#1dc9b7"
  },
  divider: {
    width: "100%",
    height: "1px",
    marginBottom: "20px"
  },
  nextButton: {
    marginTop: "26px",
    padding: "12px 30px",
    backgroundColor: "#22b9ff",
    "&:hover": {
      backgroundColor: "#00abfb"
    }
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  prevButton: {
    marginTop: "26px",
    padding: "12px 30px",
    border: "1px solid #e2e5ec",
    "&:hover": {
      backgroundColor: "#f4f5f8"
    }
  },
  prevButtonText: {
    color: "#595d6e",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  root: {
    background: "rgba(0,0,0,0.5)!important"
  },

}));
const headCells = [
  {
    field: 'resolution',
    label: "Необходимый формат",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'upload',
    label: "Загружено",
    align: "left",
    sublabel: "Завершенность",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'boards',
    label: "Экраны",
    align: "left",
    sublabel: "Дата начала",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  }
];

const ThirdTab = props => {
  const titleRef = useRef()
  const { choosedCreatives, filter, setting, currentUser, setChoosedCreatives, type } = props;
  const classes = useStyles();
  const [openAlbum, setOpenAlbum] = useState(false);
  //const [albums, setAlbums] = useState([]);
  const [albumsList, setAlbumsList] = useState({});
  const [albumsListPage, setAlbumsListPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resolutions, setResolutions] = useState([]);
  const [errorModal, setOpenErrorModal] = useState(true);
  const [approveGetData, setApproveGetData] = useState(false);
  const [uniqueRes, setUniqueRes] = useState([]);

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadingFiles2, setUploadingFiles2] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  useEffect(() => () => setApproveGetData(false), []);
  //useEffect(() => //window.scrollTo(0, 0), []);
  //useEffect(() => {
  //   getAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [currentPage]);
  useEffect(() => {

    console.log('props.freeShowsAllboardsdfsdsfdsf; ');
    console.log(props.choosedBoards);

    if (!!Object.keys(props.choosedBoards).length) {
      // getAlbums();
      setApproveGetData(true);
      let resSS = []

      //  console.log('props.freeShowsAllboardsdfsdsfdsf; ');
      //  console.log(props.freeShowsAllboards);

      Object.values(props.choosedBoards).map(i => {
        resSS.push(i.resolution)
      })

      // console.log('new Set(resSS)esSS); ');
      // console.log(new Set(resSS));

      setResolutions(resSS);
      setUniqueRes(new Set(resSS))

    }
  }, [props.choosedBoards, props.freeShowsAllboards]);


  const getAlbums = async () => {

    try {

      let albumsReq = await axios.get(
        `/creative-group?page=${currentPage}&subuser=${currentUser.id}`
      );

      setAlbumsList({ ...albumsList, ...albumsReq.data.creative })
      // console.log("appendArr  cc  useEffect 33333333 ");
      // console.log(albumsList);
      setOpenAlbum(true);
    } catch (e) {
      console.error(e);
    }
  };
  const [uploadGo, setUploadGo] = useState("");
  const [uploadProgress, updateUploadProgress] = useState(0);

  const uploadNewAlbum = (file, res) => {
    let formData = new FormData();
    formData.append("file", file);
    updateUploadProgress(0);
    setUploadGo(res);

    const options = {
      onUploadProgress: (ev) => {
        const progress = (ev.loaded / ev.total) * 100;
        setUploadingFiles([file.name, Math.round(progress)]);
      }
    };


    console.log("uploadNewAlbumuploadNewAlbumuploadNewAlbum11")

    axios
      .post(
        `/creative/upload-creative-all-group?camp_id=${filter.camp_id}&subuser=${currentUser.id}`,
        formData,
        options
      )
      .then(res => {
        if (res.data.status === "fail") {
          setError({ title: "Ошибка!", desc: "Неверное разрешение файла" });
          setOpenError(true);
        } else {
          props.setPictures([res.data.file]);
        }
        setUploadGo("");
      })
      .catch(() => {
        setError({ title: "Ошибка!", desc: "Мы исправляем её" });
        setOpenError(true);
        setUploadGo("");
      });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState({
    title: "Ошибка!",
    desc: "Мы исправляем её"
  });
  const [radio_find, setRadio_find] = useState(false);

  const nextStep = () => {
    //console.log(props.selectedFiles.map(item => item.resw+'x'+item.resh).filter((value, index, self) => self.indexOf(value) === index));

    if (
      !props.selectedFiles.length ||
      props.selectedFiles
        .map(item => item.resw + "x" + item.resh)
        .filter((value, index, self) => self.indexOf(value) === index).length <
      Array.from(new Set(resolutions)).length
    ) {
      Swal.fire("Загрузите необходимые файлы!", "", "info");
      return;
    }
    props.setNextTab();
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    return Object.keys(array).slice(props.currentPage * 20, props.currentPage * 20 + 20);
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  return (
    <>

      {type == "list" ? (
        <>
          <div className="row no-gutters">
            <div className="col">
              <Typography classes={{ root: classes.tabHeader }} className={'c78909C'}>Необходимый формат</Typography>
            </div>
            <div className="col">
              <Typography classes={{ root: classes.tabHeader }} className={'c78909C'} >Загружено</Typography>
            </div>
            <div className="col">
              <Typography classes={{ root: classes.tabHeader }} className={'c78909C'} >Экраны</Typography>
            </div>
          </div>
          {!!resolutions.length &&
            Array.from(uniqueRes).map((i, ndx) => {
              return (
                <SlidesBlock
                  type={'list'}
                  key={ndx}
                  uploadedFiles={props.uploadedFiles}
                  setUploadedFiles={props.setUploadedFiles}
                  choosedCreatives={props.choosedCreatives}
                  addFileToCamp={props.addFileToCamp}
                  resolutions={i}
                  albumsList={albumsList}
                  position={ndx}
                  duration={props.duration}
                  openAlbum={props.openAlbum}
                  choosedBoards={props.choosedBoards}
                  setting={setting}
                  setSetting={props.setSetting}
                />
              )
            })}
        </>
      ) : (
        <TableContainer>
          <Table style={{ minWidth: 380 }}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              rowCount={10}
            />

            <TableBody>
              {!!resolutions.length &&
                Array.from(uniqueRes).map((i, ndx) => {
                  return (
                    <SlidesBlock
                      type={'table'}
                      key={ndx}
                      choosedCreatives={props.choosedCreatives}
                      addFileToCamp={props.addFileToCamp}
                      resolutions={i}
                      position={ndx}
                      uploadedFiles={props.uploadedFiles}
                      setUploadedFiles={props.setUploadedFiles}
                      albumsList={albumsList}
                      duration={props.duration}
                      openAlbum={props.openAlbum}
                      choosedBoards={props.choosedBoards}
                      setting={setting}
                      setSetting={props.setSetting}
                    />
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Collapse in={openAlbum} >
        <AlbumModal
          openAlbum={openAlbum}
          setOpenAlbum={setOpenAlbum}
          title={"Альбомы"}
          albumsList={albumsList}
          uploadedFiles={props.uploadedFiles}
          setUploadedFiles={props.setUploadedFiles}
          approveGetData={approveGetData}
          resolutions={resolutions}
          radio_find={radio_find}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filter={filter}
          addFileToCamp={props.addFileToCamp}
          choosedCreatives={props.choosedCreatives}
        />
      </Collapse>

      <ThirdTabLoadingWindow
        //replaceFiles={replaceFiles}
        //remooveFile={remooveFile}
        uploadNewAlbum={uploadNewAlbum}
        resolutions={resolutions}
        // setFiles={setFiles}
        //selectedFiles={props.selectedFiles}
        uploadGo={uploadGo}
        uploadProgress={uploadProgress}
        uploadingFiles={uploadingFiles2}
        duration={props.duration}
        openAlbum={openV => {
          setTimeout(() => {
            titleRef.current.scrollIntoView({ behavior: 'smooth' })
          }, 500)

          console.log('fdsfsdssff 55555555555555555555')
          getAlbums();

        }}
        uploadedFiles={props.uploadedFiles}
        openAlbumV={openAlbum}
        setting={setting}
        updateSetting={props.updateSetting}
        addFileToCamp={props.addFileToCamp}
        choosedCreatives={props.choosedCreatives}
        checkUp={props.checkUp}
        setRadio_find={setRadio_find}
        choosedBoards={props.choosedBoards}
        albumsList={albumsList}
      />





      <div ref={titleRef} ></div>
      <Dialog
        fullScreen={fullScreen}
        open={openError}
        onClose={() => {
          setOpenError(false);
        }}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">{error.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error.desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenError(false);
            }}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});
export default withRouter(connect(mapStateToProps)(ThirdTab));


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort, handleClickOpenDialog, checkedList } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead classes={{ root: classes.TableHead }}>
      <TableRow className={'TableRow40'}>
        {headCells.map((headCell) => {
          return <TableCell
            width={'33%'}
            //style={{minWidth:headCell.minwidth, padding: !!headCell.padding ? headCell.padding : "" }}
            style={{ padding: !!headCell.padding ? headCell.padding : "" }}
            key={headCell.field + 'cam'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={'py-0 px-3'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={'headCellLabel'}>{headCell.label}</div>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        })}
      </TableRow>
    </TableHead>
  );
}
