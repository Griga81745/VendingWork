import { Box, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React from "react";

const makeStyle = makeStyles({
  itemContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  changePositionBlock: {
    border: "#dcdcdc 1px solid",
    borderRadius: "4px",
    marginLeft: "20px",
    overflow: "hidden"
  },
  changePositionArrowContainer: {
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#dcdcdc"
    }
  },
  changePositionArrow: {
    width: "20px",
    height: "20px",
    fill: "#888"
  },
  changePositionText: {
    textAlign: "center",
    margin: "10px 5px",
    fontSize: "10px"
  },
  changePositinNumber: {
    fontSize: "16px",
    width: "45px"
  },
  typographyBlock: {
    paddingLeft: "15px"
  },
  typography: {
    color: "#222",
    fontSize: "12px"
  },
  deleteSlideContainer: {
    display: "flex",
    cursor: "pointer",
    margin: "10px 0"
  },
  deleteIcon: {
    color: "#888"
  },
  deleteTypography: {
    color: "#888",
    fontWeight: "500",
    fontSize: "13px"
  }
});

const SlideItem = ({ data, ...props }) => {
  const styles = makeStyle();

  const detele = () => {
    props.remooveFile(data);
  };
  return (
    <Box style={{ marginTop: "40px" }}>
      <Box classes={{ root: styles.itemContainer }}>
        {!!data && (
          <img
            style={{ maxWidth: "300px" }}
            alt={data.group_id}
            src={
              process.env.REACT_APP_MY_HOST_CREATIVE +
              `/creative/${data.group_id}/thumb${data.link.replace(
                /(\.[m][p][4])/g,
                ".jpg"
              )}`
            }
          />
        )}
        <Box>
          <Box classes={{ root: styles.itemContainer }}>
            <Box classes={{ root: styles.changePositionBlock }}>
              <Box
                classes={{ root: styles.changePositionArrowContainer }}
                onClick={() => props.replaceFiles(data, "increment")}
              >
                <KeyboardArrowUpIcon
                  classes={{ root: styles.changePositionArrow }}
                />
              </Box>
              <Box classes={{ root: styles.changePositionText }}>
                <Typography classes={{ root: styles.changePositinNumber }}>
                  {props.position + 1}
                </Typography>
              </Box>
              <Box classes={{ root: styles.changePositionArrowContainer }}>
                <KeyboardArrowDownIcon
                  classes={{ root: styles.changePositionArrow }}
                  onClick={() => props.replaceFiles(data, "decrement")}
                />
              </Box>
            </Box>
            <Box classes={{ root: styles.typographyBlock }}>
              <Typography classes={{ root: styles.typography }}>
                {data.title.substring(0, 20)}
              </Typography>
              <Typography classes={{ root: styles.typography }}>
                {data.mime}
              </Typography>
              <Typography classes={{ root: styles.typography }}>
                {data.created_at}
              </Typography>

              <Box
                classes={{ root: styles.deleteSlideContainer }}
                onClick={detele}
              >
                <Typography classes={{ root: styles.deleteTypography }}>
                  <i className="fa flaticon2-delete"></i> Удалить слайд
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SlideItem;
