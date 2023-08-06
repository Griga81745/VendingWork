import React, { useState, useContext } from "react";
import {
  makeStyles, Divider, Button,
  MenuItem, DialogTitle, TextField, ListItem, Avatar, ListItemAvatar, ListItemText, Menu,
  TableCell, TableRow, Tooltip, IconButton, Fade,
  Collapse, FormControl, Table, TableBody, TableContainer, TableHead, TableSortLabel
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
//import InputFileComponent from "./InputFileComponent";
import { toAbsoluteUrl } from "app/utils/index";
import Swal from "sweetalert2";
// import SlideItemDesktop from "./SlideItemDesktop";
import Iframe from 'react-iframe'
// import Zoom from "@material-ui/core/Zoom/Zoom";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { CreateCamp } from "../../../app/context/DataCampContext";

const useStyles = makeStyles(theme => ({
  loadingWin: {
    marginBottom: "2rem"
  },
  changePositionBlock: {
    maxWidth: "200px",
    minWidth: "200px",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  cards: {
    margin: "10px",
    marginTop: "20px"
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
  },
  margin: {
    margin: '16px 0 16px 0',
    padding: '9px 0',
    textTransform: 'none'
  },
  header: {
    fontSize: "20px",
    fontWeight: 500,
    padding: '0px 14px',
  },
  tabHeader: {
    fontSize: "12px",
    fontWeight: 700,
    color: 'rgba(0,0,0,.6)',
    padding: '5px 16px 5px 0'
  },
  button1: {
    color: '#fff',
    width: "204px",
    height: "44px",
    border: "none",
    borderRadius: "4px",
    background: "#448AFF",
    "&:hover": {
      opacity: "80%",
      background: "#448AFF",
      border: "none",
      borderColor: "rgba(0, 79, 255, .8)"
    },
  },
  button2: {
    color: '#448AFF',
    borderRadius: "4px",
    border: "1px solid #448AFF",
    width: "204px",
    height: "44px",
    "&:hover": {
      background: "#FFF",
      borderColor: "rgba(0, 79, 255, .8)"
    },
  },
  heading: {
    border: "1px solid #E0E0E0",
    overflowX: "scroll"
  },
  heading2: {
    backgroundColor: "#F5F5F5",
    padding: "10px 10px 9px 54px",
    minWidth: "560px"
  }
}));

const headCells = [
  { field: 'name', label: "Название", minwidth: 140, width: "9%", align: 'left', padding: "0 0 0 54px", disablePadding: true, filter: false },
  { field: 'type', label: "Тип", minwidth: 150, width: "10%", align: 'left', disablePadding: false, filter: false },
  { field: 'ext', label: "Формат файла", minwidth: 120, width: "14%", align: 'left', disablePadding: true, filter: false },
  { field: 'bite', label: "Размер, мб", minwidth: 120, width: "14%", align: 'left', disablePadding: true, filter: false },
  { field: 'date', label: "Дата создания", minwidth: 235, width: "13%", align: 'left', disablePadding: true, filter: false }
];

const ThirdTabLoadingWindow = props => {
  const classes = useStyles();
  const useCreateCamp = useContext(CreateCamp);
  const { setting, uploadingFiles } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const handleChangeFile = (file, resolution) => {
    if (file.type !== "video/mp4" && file.type !== "text/html") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (resolution.includes(`${image.width}x${image.height}`)) {
          props.uploadNewAlbum(file, resolution);
        } else {
          getError();
        }
      };
    } else {
      props.uploadNewAlbum(file, resolution);
    }
  };

  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
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
  const [showIframe, setShowIframe] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let fileInput = null;
  let files = [];

  return (
    <>
      {props.checkUp != 'checkUp' &&
        <div className={"d-flex justify-content-center mt-2 mb-3"}>
          <Button startIcon={<VerticalAlignBottomIcon />} disableRipple variant="outlined" size="medium" color="primary" className={`fontGR mr-2 mb-0 ${classes.margin} ${classes.button1}`}
            onClick={() => fileInput.click()}>
            Загрузить файлы
          </Button>
          <Button startIcon={<AttachFileIcon />}
            disableRipple variant="outlined" size="medium" color="primary" className={`fontGR ml-2 mb-0 ${classes.margin} ${classes.button2}`}
            onClick={() => props.openAlbum(true)}>
            Добавить из медиа
          </Button>
        </div>
      }

      {((!!props.choosedCreatives && !!Object.keys(props.choosedCreatives).length) || !!Object.keys(uploadingFiles).length) &&

        <>

          {props.checkUp != 'checkUp' && <Divider className={"mt-4"} />}

          <ListItem className={"p-0 c5E6366 fS19 mt-3"}>
            <ListItemAvatar style={{ "minWidth": "unset" }} >
              <AttachFileIcon style={{ "color": "#448AFF" }} />
            </ListItemAvatar>
            <ListItemText primary="Добавленные креативы" className={`fS19 c5E6366 m-0 ml-2`} />
          </ListItem>

          <div className={`d-flex flex-column fS14 mt-2 ${classes.heading} w-100`}>
            <TableContainer style={{ "minWidth": "560px" }}>
              <Table>
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  rowCount={10}
                />
                <TableBody>
                  {!!props.choosedCreatives &&
                    !!Object.keys(props.choosedCreatives).length &&
                    Object.keys(props.choosedCreatives).map((id, index) => {
                      let fileItem = props.uploadedFiles[id];
                      if (props.resolutions.indexOf(`${fileItem.resw}x${fileItem.resh}`) > -1 || fileItem.mime == "text/html") {
                        //files.push({
                        //  url: process.env.REACT_APP_MY_HOST_CREATIVE + `/creative/${fileItem.group_id}/${fileItem.link}`,
                        //  type: fileItem.link.split(".")[1] === "jpg" || fileItem.link.split(".")[1] === "jpeg" ? "photo" : "video"
                        //})
                        //if(index == Object.keys(props.albumsList).length-1 && !filesShowed){
                        //  setFilesShowed(true)
                        //  props.updateSetting({...setting, lightboxFiles: files})
                        //}
                        let avatarImgPath = process.env.REACT_APP_MY_HOST_CREATIVE + `/creative/${fileItem.group_id}/thumb${fileItem.link.replace(/(\.[m][p][4])/g, ".jpg")}`
                        if (fileItem.mime == "text/html") {
                          avatarImgPath = toAbsoluteUrl("/media/files/html.svg")
                        }

                        console.log("avatarImgPathavatarImgPathavatarImgPath22")
                        console.log(avatarImgPath)

                        return (
                          <TableRow
                            hover
                            //
                            // onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            tabIndex={-1}
                            key={index + 'creativeFornewC'}
                            style={{ height: props.checkUp != 'checkUp' ? 40 : 52 }}
                          >
                            <TableCell component="th" scope="row" align={'left'} padding="none" className={`${classes.changePositionBlock}`} >
                              <div className={'d-flex align-items-center'}>
                                <div className="align-self-center d-flex" style={{ 'minWidth': 54 }}>
                                  <Tooltip title="Удалить креатив">
                                    <IconButton className="p-0 m-auto" onClick={() => {
                                      props.addFileToCamp([id])
                                    }} >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <Avatar
                                  variant="square"
                                  src={avatarImgPath}
                                  onClick={() => {
                                    props.updateSetting({ ...setting, lightboxOpen: index })
                                    //var mydiv = document.getElementsByClassName("lightBox");
                                    //let mainContainer = React.createElement("div", { className: "contexCon" }, child);
                                    //mydiv.appendChild(document.createTextNode("bar"));
                                    ///setToggler2(!toggler2)
                                  }}
                                  className="mr-2"
                                  style={{ width: props.checkUp != 'checkUp' ? 32 : 44, height: props.checkUp != 'checkUp' ? 32 : 44 }}
                                />
                                <div className={'fontGR'}>{fileItem.title}</div>
                              </div>
                            </TableCell>
                            <TableCell padding="default" align={'left'} className={'fontGR py-1'}>
                              {fileItem.mime}
                            </TableCell>

                            <TableCell padding="none" align={'left'} className={'fontGR'}>
                              {fileItem.resw}x{fileItem.resh}
                            </TableCell>

                            <TableCell padding="none" align={'left'} className={'fontGR'}>
                              {fileItem.filesize !== 0
                                ? (fileItem.filesize / 1024 / 1024).toFixed(2)
                                : "-"}
                            </TableCell>
                            <TableCell padding="none" align={'left'} className={'fontGR'}>
                              {fileItem.created_at.split(' ')[0]}
                            </TableCell>
                          </TableRow>
                        )
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Divider className={"mt-4"} />
          <ListItem className={"p-0 c5E6366 fS19 mt-3"}>
            <ListItemAvatar style={{ "minWidth": "unset" }} >
              <AddAPhotoIcon style={{ "color": "#448AFF" }} />
            </ListItemAvatar>
            <ListItemText primary="Настройки фотоотчёта" className={`fS19 c5E6366 m-0 ml-2`} />
          </ListItem>

          <FormControl className={'w-100 mt-3'} >
            <TextField
              variant="outlined"
              className="minHeight70"
              label={"Email для фотоочёта"}
              helperText=""
              value={useCreateCamp.setting.emailphoto}
              //size="small"
              onChange={e => {
                //let resSh = e.target.value.replace(/[^0-9]/g, "");
                //resSh = resSh.replace(/^0+/, "");
                useCreateCamp.setSetting({ ...useCreateCamp.setting, emailphoto: e.target.value })
              }}
            />
          </FormControl>

        </>
      }


      <input
        style={{ opacity: "0", width: "0.5px", height: "0.5px" }}
        type="file"
        ref={input => (fileInput = input)}
        accept=".mp4, .jpg, .jpeg, .html"
        onChange={e => {
          if (!!e.target.files[0]) {
            handleChangeFile(e.target.files[0], props.resolutions)
          }
        }
        }
      />
      {showIframe === true &&
        <Iframe url="https://app.bannerboo.com/?sid=idexa&creative_id=111&email=owner@example.com&salt="
          id="myIdF"
          className="iframeBoo"
        />
      }
      <Menu
        elevation={2}
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          handleClose()
          //setAnchorEl(null);
          fileInput.click()
        }}
          className={'c448AFF'}
        >Загрузить файлы</MenuItem>
        <MenuItem onClick={() => {

          //setAnchorEl(null);
          // setTimeout(()=>{
          props.openAlbum(true);
          handleClose()
          //  },3500)

        }}
          className={'c448AFF'}
        >Добавить из медиа</MenuItem>
        {/*
            <MenuItem onClick={()=>{
              handleClose();
              setShowIframe(!showIframe);
            }}>Создать в конструкторе</MenuItem>
            */}
      </Menu>
    </>
  );
};
export default ThirdTabLoadingWindow;


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
            // width={'33%'}
            //style={{minWidth:headCell.minwidth, padding: !!headCell.padding ? headCell.padding : "" }}
            style={{ padding: !!headCell.padding ? headCell.padding : "" }}
            key={headCell.field + 'cam'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={'py-0'}
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
