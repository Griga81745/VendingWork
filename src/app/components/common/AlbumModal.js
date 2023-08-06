import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Divider, ListItem, ListItemAvatar, ListItemText
} from "@material-ui/core";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';

// import SearchIcon from "@material-ui/icons/Search";
// import { Modal } from "react-bootstrap";
// import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import ExpansionPanel from "../common/ExpansionPanel";
// import equal from "deep-equal";
// //import Pagination from "react-js-pagination";
// import Pagination from '@material-ui/lab/Pagination';
// import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  clearIcoBlock: {
    textAlign: "end"
  },
  heading: {
    border: "1px solid #E0E0E0"
  },
  heading2: {
    backgroundColor: "#F5F5F5",
    padding: "10px 10px 9px 54px"
  },
  link: {
    fontSize: 18,
    height: "40px",
    margin: "0px 20px 0 20px",
    display: "inline-block",
    "&:hover": {
      color: "#2739c1 !important",
      borderBottom: "2px solid #7ac774"
    },
    "&:active": {
      borderBottom: "2px solid #7ac774"
    }
  },
  selectBlockBtn: {
    padding: "20px 35px",
    borderBottom: "1px solid #efeff5",
    alignItems: "center"
  },
  ico: {
    marginLeft: "20px"
  },
  title: {
    fontSize: "18px",
    fontWeight: "500"
  },
  dataBlockBtn: {
    width: "100%",
    alignItems: "center",
    cursor: "pointer"
  },
  paginateBlock: {
    padding: "10px 20px 60px"
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const AlbumModal = props => {
  const classes = useStyles();
  //const [value, setValue] = useState(0);
  const [filesForSefected, setFilesForSefected] = useState({});

  //useEffect(() => setFilesForSefected(props.selectedFiles), [
  //  props.selectedFiles
  //]);

  const selectFile = fileId => {

    console.log(" selectFileselectFilewww ")
    console.log(fileId)
    console.log(filesForSefected)


    if (!filesForSefected[fileId]) {
      setFilesForSefected({ ...filesForSefected, [fileId]: 1 });
    } else {
      //let exclude = filesForSefected.filter(item => !equal(item, file));
      let excludeList = { ...filesForSefected }
      delete excludeList[fileId];
      setFilesForSefected(excludeList);
    }
  };
  const setSelectedFiles = () => {
    props.addFileToCamp(Object.keys(filesForSefected));
  };

  const [openAl, setOpenAl] = React.useState(0);
  const handleChange = (event, value) => {
    props.setCurrentPage(value);
  };

  return (
    <>
      <Divider />
      <ListItem className={"p-0 c5E6366 fS19 mt-3"}>
        <ListItemAvatar style={{ "minWidth": "unset" }} >
          <FolderOpenIcon style={{ "color": "#448AFF" }} />
        </ListItemAvatar>
        <ListItemText primary="Альбомы" className={`fS19 c5E6366 m-0 ml-2`} style={{ "flex": "unset" }} />
        {openAl === 1 && <ListItemText primary=" / Мои креативы" className={`fS19 c5E6366 m-0 ml-2`} />}
      </ListItem>

      <div className={`d-flex flex-column fS14 mt-2 ${classes.heading}`}>
        <div className={` ${openAl === 0 && "pl-3"} fS14 c78909C ${classes.heading2}`}>
          <div>Название</div>
        </div>
        {(props.approveGetData || props.fromViewTable) && (
          <ExpansionPanel
            openAl={openAl}
            setOpenAl={setOpenAl}
            albumsList={props.albumsList}
            selectFile={selectFile}
            filesForSefected={filesForSefected} /// список выбранных ID
            resolutions={props.resolutions}
            uploadedFiles={props.uploadedFiles}
            setUploadedFiles={props.setUploadedFiles}
            filter={props.filter}
            addFileToCamp={props.addFileToCamp}
            choosedCreatives={props.choosedCreatives}
          />
        )}
      </div>
      <div className={`mt-2 d-flex`} >
        {openAl === 1 &&
          <Button disableRipple variant="outlined" size="medium" color="primary"
            className={`c448AFF fontGR mb-0 mr-1 tTraN ${classes.margin} ${classes.button1}`}
            onClick={() => setOpenAl(0)}>
            Назад
          </Button>
        }
        {openAl === 1 &&
          <Button disableRipple variant="outlined" size="medium" color="primary"
            className={`c448AFF fontGR mb-0 mr-auto tTraN ${classes.margin} ${classes.button1}`}
            onClick={() => props.setOpenAlbum(false)}>
            Закрыть
          </Button>
        }
        {/*
        <Button disableRipple variant="outlined" size="medium" color="primary" className={`c448AFF fontGR mb-0 tTraN ${classes.margin} ${classes.button1}`}
          onClick={() => {
            setSelectedFiles();
            props.setOpenAlbum(false);
          }}>
          Добавить выбранные
        </Button>
        */}
      </div>

      {/*<Pagination className={"mb-4"} count={10} size="large" page={props.currentPage} onChange={handleChange} />*/}

    </>
  );
};

export default AlbumModal;
