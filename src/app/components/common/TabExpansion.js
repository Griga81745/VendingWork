/* eslint-disable no-restricted-imports */
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Avatar,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { createCampaing } from '../../utils/API';
import equal from "deep-equal";
import IconButton from "@material-ui/core/IconButton";
import AudiotrackTwoToneIcon from "@material-ui/icons/AudiotrackTwoTone";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  headerText: {
    margin: "1px 0 0 5px"
  },
  rmvShadow: {
    boxShadow: "none !important",
    margin: "0 !important"
  },
  loader: {
    display: "block",
    margin: "0 auto 20px auto"
  },
  checkB: {
    width: "54px",
    textAlign: "center"
  }
}));
const TabExpansion = props => {
  const classes = useStyles();
  // const [files, setFiles] = useState({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //const [data, setData] = useState({});
  const { currentUser } = props;

  useEffect(() => {
    // if (props.expanded === props.data.id) {
    const boardResolutions = new Set(props.resolutions);
    getAlbumData(Array.from(boardResolutions));
    //  }
  }, [props.data.id, props.resolutions, page]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAlbumData = async resolutions => {

    console.log('etFiles(album.data.creative getAlbumData');

    try {
      let album = await axios.get(
        `/creative-group/view?id=${props.data.id}&resolution=${resolutions}&duration&subuser=${currentUser.id}&page=${page + 1}`
      );
      //setFiles(album.data.creative);

      //let obj = album.data.creative;
      let obj = { ...props.uploadedFiles, ...album.data.creative };
      //console.log('etFiles(album.data.creative11111');
      //console.log(obj);

      props.setUploadedFiles(obj);



      //setData(album.data)
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };


  let file_path =
    process.env.REACT_APP_MY_HOST_CREATIVE +
    `/creative/${props.data.group_id}/${props.data.link}`;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Table>
        <TableBody>
          {!isLoading ? (
            !!Object.keys(props.uploadedFiles).length ? (
              Object.values(props.uploadedFiles).map((itemFile, ndx) => {
                if (props.data.id != itemFile.group_id) {
                  return
                }
                return (

                  <TableRow key={'albumeCreaRow' + ndx} hover>
                    <TableCell key={'albumeCreaRowCell' + ndx} padding="none" className={classes.checkB}>
                      {props.data.link}
                      <Checkbox
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                        onChange={e => props.addFileToCamp([itemFile.id])}
                        //onChange={e => props.selectFile(itemFile.id)}
                        checked={!!props.choosedCreatives[itemFile.id]}
                        style={{ "padding": "8px" }}
                      />
                    </TableCell>
                    <TableCell
                      padding="none"
                      style={{ width: "40px" }}
                    >
                      {!!itemFile.resw ? (
                        <Avatar
                          variant="square"
                          src={
                            process.env.REACT_APP_MY_HOST_CREATIVE +
                            `/creative/${itemFile.group_id
                            }/thumb${itemFile.link.replace(
                              /(\.[m][p][4])/g,
                              ".jpg"
                            )}`
                          }
                          className="mr-2"
                          style={{ "width": "32px", "height": "32px" }}
                        />
                      ) : (
                        <IconButton style={{ fill: "rgb(233, 85, 91)" }}>
                          <AudiotrackTwoToneIcon fontSize="large" />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell padding="none">{itemFile.title}</TableCell>
                    <TableCell style={{ width: "100px" }} padding="none" className={"fontGR text-center"}>{itemFile.mime}</TableCell>
                    {!!itemFile.resw && (
                      <TableCell style={{ width: "120px" }} padding="none" className={"fontGR text-center"}>
                        {itemFile.resw}x{itemFile.resh}
                      </TableCell>
                    )}
                  </TableRow>

                );
              })
            ) : (
              <Typography style={{ textAlign: "center" }}>
                Нет подходящих файлов
              </Typography>
            )
          ) : (
            <TableRow>
              <TableCell padding="none"><CircularProgress classes={{ root: classes.loader }} /></TableCell>
            </TableRow>
          )}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      {/*!!data && !!data.meta && data.meta.total > 10 &&
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={data.meta.total}
                rowsPerPage={10}
                page={page}
                onChangePage={handleChangePage}
                //onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          */}
    </>
  );
};


const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(TabExpansion));

