import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

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

const InputFileComponent = props => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState([]);

  const handleChangeFile = (file, resolution) => {
    // let file = event.target.files[0]
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (`${image.width}x${image.height}` === resolution) {
          // props.setFiles(file)
          props.uploadNewAlbum(file);
          setImgUrl([...imgUrl, image.src]);
        } else {
          props.getError();
        }
        // console.log(image.width, image.height, resolution)
      };
    } else {
      props.uploadNewAlbum(file);
    }
  };

  return (
    <Grid>
      <Grid container classes={{ root: classes.cards }} spacing={2}>
        <Grid item></Grid>
        <Grid item classes={{ root: classes.loadButton }}>
          <label style={{ width: "150px", height: "143px" }}>
            <input
              style={{ opacity: "0", width: "0.5px", height: "0.5px" }}
              type="file"
              accept=".mp4, .jpg, .jpeg"
              // onClick={e => props.uploadNewAlbum(e)}
              onChange={e => handleChangeFile(e.target.files[0], props.i)}
            />
            <Grid>
              <Grid classes={{ root: classes.plus }}>+</Grid>
              <Typography classes={{ root: classes.add }}>Добавить</Typography>
            </Grid>
          </label>
        </Grid>
      </Grid>
      {/*{!!imgUrl.length && imgUrl.map((item, ndx) => <img src={item} style={{ width: "200px", height: "100%", marginTop: "20px", display: "block"}}/>)}*/}
    </Grid>
  );
};

export default InputFileComponent;
